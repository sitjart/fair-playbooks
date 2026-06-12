#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// session-to-decks.mjs
//
// ONE SOURCE → MANY EDITABLE OUTPUTS.
// Reads each module's `session:` front-matter and generates, via Pandoc:
//   • <id>.pptx                  — editable slides (PowerPoint / Google Slides)
//   • <id>-facilitator-guide.docx — editable script doc (Word / Google Docs)
// SVG images are rasterised (rsvg-convert) and embedded as real pictures.
// Speaker scripts go into the slides' notes pane and the guide body.
//
// Drop a branded scripts/reference.pptx / scripts/reference.docx to control
// the look (an institution can supply their own — "upload your template").
//
// Runs locally and in CI (GitHub Actions) — see .github/workflows/deploy.yml.
// ─────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

const ROOT = path.resolve('.');
const MODULES_DIR = path.join(ROOT, 'src/content/modules');
const PUBLIC = path.join(ROOT, 'public');
const SCRIPTS = path.join(ROOT, 'scripts');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'decks-'));

function has(cmd) {
  try { execFileSync('command', ['-v', cmd], { shell: '/bin/bash' }); return true; }
  catch { try { execFileSync(cmd, ['--version'], { stdio: 'ignore' }); return true; } catch { return false; } }
}
const HAS_RSVG = has('rsvg-convert');

// Strip the bit of inline HTML our points use, so it renders cleanly in Office.
function clean(s = '') {
  return s
    .replace(/<code>(.*?)<\/code>/g, '`$1`')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .trim();
}

// Resolve an image to an embeddable raster PNG path (rasterise SVG if needed).
function rasterImage(src, id) {
  const abs = path.join(PUBLIC, src.replace(/^\//, ''));
  if (!fs.existsSync(abs)) return null;
  if (!abs.endsWith('.svg')) return abs;          // png/jpg embed directly
  if (!HAS_RSVG) return null;                      // no rasteriser → skip in Office
  const out = path.join(tmp, `${id}-${path.basename(abs, '.svg')}.png`);
  execFileSync('rsvg-convert', ['-w', '1400', abs, '-o', out]);
  return out;
}

function frontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  return m ? yaml.load(m[1]) : null;
}

function slidesMarkdown(fm, id) {
  const lines = [`% ${fm.title}`, `% ELIXIR-UK RDM Club · FAIR-in-action`, ''];
  for (const step of fm.session) {
    const meta = [step.minutes && `${step.minutes} min`, ...(step.principles || [])].filter(Boolean).join(' · ');
    lines.push(`## ${clean(step.title)}${meta ? `  (${meta})` : ''}`, '');
    for (const p of step.points || []) lines.push(`- ${clean(p)}`);
    if (step.exercise) lines.push(`- **✏ Exercise:** ${clean(step.exercise)}`);
    lines.push('');
    const img = step.image && rasterImage(step.image.src, id);
    if (img) lines.push(`![${clean(step.image.alt || '')}](${img})`, '');
    if (step.script) lines.push('::: notes', clean(step.script), ':::', '');
  }
  return lines.join('\n');
}

// Wrap a block in a Pandoc fenced div that maps to a Word paragraph style
// (the coloured callout boxes / section bands defined in reference.docx).
function styled(name, text) {
  return [`::: {custom-style="${name}"}`, text, ':::', ''];
}

function guideMarkdown(fm, id) {
  const total = (fm.session.at(-1)?.minutes || '').split('–').at(-1);
  const lines = [
    `% ${fm.title} — Facilitator Guide`,
    `% ELIXIR-UK RDM Club · FAIR-in-action${total ? ` · ~${total} min` : ''}`, '',
    `*${fm.summary}*`, '',
  ];
  fm.session.forEach((step, i) => {
    lines.push(...styled('Section Band', `Section ${i + 1}:  ${clean(step.title)}${step.minutes ? `   ·   ${step.minutes} min` : ''}`));
    if (step.principles?.length) lines.push(`**Key FAIR principles:** ${step.principles.join(', ')}`, '');
    if (step.objectives?.length) {
      lines.push('**Learning objectives**', '');
      for (const o of step.objectives) lines.push(`- ${clean(o)}`);
      lines.push('');
    }
    if (step.script) lines.push(...styled('Facilitator Script', `🗣  ${clean(step.script)}`));
    for (const p of step.points || []) lines.push(`- ${clean(p)}`);
    if (step.points?.length) lines.push('');
    const img = step.image && rasterImage(step.image.src, id);
    if (img) lines.push(`![${clean(step.image.alt || '')}](${img})`, '');
    if (step.exercise) lines.push(...styled('Exercise', `✏  Exercise: ${clean(step.exercise)}`));
    if (step.tip) lines.push(...styled('Facilitator Tip', `💡  Tip: ${clean(step.tip)}`));
  });
  return lines.join('\n');
}

function pandoc(markdown, outFile, refDoc) {
  const args = ['-f', 'markdown', '-o', outFile, '--slide-level=2'];
  if (refDoc && fs.existsSync(refDoc)) args.push(`--reference-doc=${refDoc}`);
  execFileSync('pandoc', args, { input: markdown });
}

let count = 0;
for (const f of fs.readdirSync(MODULES_DIR)) {
  if (!f.endsWith('.md') || f.startsWith('_')) continue;
  const fm = frontmatter(path.join(MODULES_DIR, f));
  if (!fm?.session?.length) continue;
  const id = f.replace(/\.md$/, '');
  const outDir = path.join(PUBLIC, 'assets/modules', id.startsWith('p2-') ? id : id.slice(0, 2));
  fs.mkdirSync(outDir, { recursive: true });

  // The .pptx is produced by scripts/session_to_pptx.py (banded, python-pptx).
  // Pandoc here owns only the .docx facilitator guide.
  const docx = path.join(outDir, `${id}-facilitator-guide.docx`);
  pandoc(guideMarkdown(fm, id), docx, path.join(SCRIPTS, 'reference.docx'));
  console.log(`✓ ${id}: ${path.relative(ROOT, docx)}`);
  count++;
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(count ? `\nGenerated decks for ${count} module(s).` : 'No modules with a session: block found.');

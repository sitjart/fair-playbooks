#!/usr/bin/env node
// Build branded Pandoc reference templates (reference.pptx / reference.docx).
// Starts from Pandoc's defaults, then patches the OOXML:
//   • theme  — fonts + brand accent colours
//   • docx styles — coloured callout boxes (Script / Tip / Exercise) + section
//     bands, so the generated facilitator guide looks like a designed document.
//
// This is also the "upload your template" mechanism: an institution drops in
// their own reference.pptx / reference.docx and the generator uses it instead.
//
// Palette here mirrors the existing colleague guide (teal/green/blue/amber).
// Swap these hexes for official BioFAIR brand colours when available.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SCRIPTS = path.resolve('scripts');
// Slides can use brand fonts (substituted gracefully in present mode).
// The DOCX must use fonts that ship with Word, or it falls back to Times New Roman.
const FONTS_SLIDES = { major: 'Space Grotesk', minor: 'Inter' };
const FONTS_GUIDE  = { major: 'Calibri Light', minor: 'Calibri' };
// ELIXIR-UK brand: navy #023452 · orange #F47D20 · mid-blue #037EAB · slate #4A6577
const ACCENTS_SLIDES = { accent1: 'F47D20', accent2: '037EAB', accent3: '023452', accent4: '4A6577', accent5: '037EAB', accent6: 'F47D20' };
const ACCENTS_GUIDE  = { accent1: '023452', accent2: 'F47D20', accent3: '037EAB', accent4: '4A6577', accent5: '023452', accent6: 'F47D20' };

// Coloured callout + band paragraph styles injected into the docx.
// Pandoc maps `::: {custom-style="Facilitator Script"}` to the style by NAME.
// BioFAIR palette + looser spacing (w:line 1.12, more before/after).
const DOCX_STYLES = `
<w:style w:type="paragraph" w:styleId="SectionBand"><w:name w:val="Section Band"/><w:basedOn w:val="Normal"/><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="023452"/><w:spacing w:before="400" w:after="220" w:line="276" w:lineRule="auto"/><w:ind w:left="170" w:right="170"/></w:pPr><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="30"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="FacilitatorScript"><w:name w:val="Facilitator Script"/><w:basedOn w:val="Normal"/><w:pPr><w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="037EAB"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="E6F2F7"/><w:spacing w:before="160" w:after="160" w:line="276" w:lineRule="auto"/><w:ind w:left="260" w:right="200"/></w:pPr></w:style>
<w:style w:type="paragraph" w:styleId="FacilitatorTip"><w:name w:val="Facilitator Tip"/><w:basedOn w:val="Normal"/><w:pPr><w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="4A6577"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="EEF1F3"/><w:spacing w:before="160" w:after="160" w:line="276" w:lineRule="auto"/><w:ind w:left="260" w:right="200"/></w:pPr><w:rPr><w:i/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Exercise"><w:name w:val="Exercise"/><w:basedOn w:val="Normal"/><w:pPr><w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="F47D20"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="FDF0E4"/><w:spacing w:before="160" w:after="160" w:line="276" w:lineRule="auto"/><w:ind w:left="260" w:right="200"/></w:pPr></w:style>
`;

function writeDefault(name) {
  const out = fs.openSync(path.join(SCRIPTS, name), 'w');
  execFileSync('pandoc', ['--print-default-data-file', name], { cwd: SCRIPTS, stdio: ['ignore', out, 'inherit'] });
  fs.closeSync(out);
}

function editInZip(file, member, transform) {
  const abs = path.join(SCRIPTS, file);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ref-'));
  execFileSync('unzip', ['-oq', abs, member], { cwd: tmp });
  const mp = path.join(tmp, member);
  fs.writeFileSync(mp, transform(fs.readFileSync(mp, 'utf8')));
  execFileSync('zip', ['-q', abs, member], { cwd: tmp });
  fs.rmSync(tmp, { recursive: true, force: true });
}

function patchTheme(file, themePath, accents, fonts) {
  editInZip(file, themePath, (x) => {
    x = x.replace(/(<a:majorFont>\s*<a:latin typeface=")[^"]*/, `$1${fonts.major}`);
    x = x.replace(/(<a:minorFont>\s*<a:latin typeface=")[^"]*/, `$1${fonts.minor}`);
    for (const [k, v] of Object.entries(accents)) {
      x = x.replace(new RegExp(`(<a:${k}>\\s*<a:srgbClr val=")[0-9A-Fa-f]{6}`), `$1${v}`);
    }
    return x;
  });
  console.log(`✓ themed ${file}`);
}

function patchDocxStyles(file) {
  editInZip(file, 'word/styles.xml', (x) => x.replace('</w:styles>', `${DOCX_STYLES}</w:styles>`));
  console.log(`✓ styled ${file} (callout boxes + section bands)`);
}

writeDefault('reference.pptx');
writeDefault('reference.docx');
patchTheme('reference.pptx', 'ppt/theme/theme1.xml', ACCENTS_SLIDES, FONTS_SLIDES);
patchTheme('reference.docx', 'word/theme/theme1.xml', ACCENTS_GUIDE, FONTS_GUIDE);
patchDocxStyles('reference.docx');

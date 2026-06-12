import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─────────────────────────────────────────────────────────────────────
// Tag taxonomy — 5 axes used by the recommender wizard.
// Adding values? Update the matching wizard in src/pages/recommend.astro.
// ─────────────────────────────────────────────────────────────────────
const PLAYBOOKS = ['fairification', 'communicate-advocate'] as const;
const AUDIENCES = ['researcher', 'phd-student', 'postdoc', 'pi', 'decision-maker', 'rdm-peer'] as const;
const SCENARIOS = ['starting-project', 'mid-project', 'ending-project', 'legacy-data', 'advocating-internally', 'training-team'] as const;
const DATA_TYPES = ['sequencing', 'proteomics', 'imaging', 'spreadsheet', 'code', 'mixed', 'n-a'] as const;
const INTENTS = ['how-to', 'motivate', 'signpost', 'self-assess', 'hands-on-exercise'] as const;

const modules = defineCollection({
  // Files starting with underscore (e.g. _template.md) are ignored by the loader.
  // Use this to keep worked examples, drafts, or in-progress modules out of the build.
  // The negation needs both '!_*.md' (root) and '!**/_*.md' (subdirs) to be reliable.
  loader: glob({ pattern: ['**/*.md', '!_*.md', '!**/_*.md'], base: './src/content/modules' }),
  schema: z.object({
    title: z.string(),
    number: z.number(),
    summary: z.string(),

    // estimatedMinutes.long is required; .short is optional.
    // OMIT short when the module doesn't have a meaningful recap version
    // (e.g. reference checklists like the GitHub side-room, or signposting modules
    // like Module 1 where the value is in the depth, not a 2-minute intro).
    // When .short is absent, the version toggle disappears on the module page.
    estimatedMinutes: z.object({
      short: z.number().optional(),
      long: z.number(),
    }),
    prerequisites: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    // Use-case dimension — Module 4 (and possibly others) structures content
    // around these scenarios. Empty array means the module isn't use-case-driven.
    useCases: z.array(z.enum(['unpublished', 'published-not-fair', 'legacy'])).default([]),
    // Side rooms are parallel optional modules, not part of the main path.
    isSideRoom: z.boolean().default(false),
    // For Module 0: the canonical version is drawn from existing resources.
    drawnFromExistingResources: z.boolean().default(false),
    leadContributors: z.array(z.string()).default([]),

    // ── Facilitator-ready session — the single source for the activity ──
    // Authored once here; the module page RENDERS it (read on page), and the
    // same data drives present-mode and the PDF download. No separate deck to
    // keep in sync. Each step ≈ one slide / one section of the session.
    session: z.array(z.object({
      title: z.string(),
      minutes: z.string().optional(),          // e.g. "15–25"
      principles: z.array(z.string()).default([]), // e.g. ["F1", "F4"]
      objectives: z.array(z.string()).default([]), // learning objectives for the section
      tip: z.string().optional(),              // 💡 facilitator tip
      script: z.string().optional(),           // what the facilitator says
      points: z.array(z.string()).default([]), // on-slide bullet points (HTML ok)
      exercise: z.string().optional(),         // hands-on task
      // Image is a single source file (SVG/PNG under public/). The web renders it
      // directly; the deck generator rasterises SVG→PNG and embeds it in pptx/docx.
      image: z.object({ src: z.string(), alt: z.string().optional() }).optional(),
    })).default([]),

    // Which "local help" slots this activity surfaces. They fill live from the
    // institution profile (set up on /branding/). Authors tune this per activity
    // in front-matter — no code. Default trio suits most FAIRification activities.
    localHelp: z.array(z.enum(['dmp', 'repository', 'ethics', 'licensing', 'it', 'training'])).default(['repository', 'dmp', 'training']),

    // ── Provenance — what existing resource this activity is translated from ──
    // The project's whole premise is curation, not reinvention. Every activity
    // should name the established resource(s) it draws on (RDMkit, FAIR Cookbook,
    // Galaxy, GO FAIR, etc.) so the "translated, not reinvented" claim is evidenced.
    sources: z.array(z.object({
      name: z.string(),       // e.g. "RDMkit"
      url: z.string(),        // link to the specific page/resource
      note: z.string().optional(), // what we drew from it, e.g. "Data organisation guidance"
    })).default([]),

    // ── Tag taxonomy for the recommender ──
    // Most modules belong to ONE playbook. Foundational modules (e.g. "What is FAIR")
    // belong to both — they're prerequisites everyone needs.
    playbook: z.array(z.enum(PLAYBOOKS)).default(['fairification']),
    audience: z.array(z.enum(AUDIENCES)).default([]),
    scenario: z.array(z.enum(SCENARIOS)).default([]),
    dataType: z.array(z.enum(DATA_TYPES)).default([]),
    intent: z.array(z.enum(INTENTS)).default([]),

    // ── Workshop pack — downloadable facilitator materials ──
    // Each entry is a real file in public/assets/modules/<module-id>/.
    // Authors: drop the file there, then reference it here.
    // RPO forks override these files (or this list) to ship branded versions.
    workshopAssets: z.array(z.object({
      title: z.string(),
      type: z.enum(['facilitator-guide', 'slides', 'worksheet', 'template', 'transcript', 'video', 'other']),
      file: z.string(),                      // path under public/, e.g. /assets/modules/02/foo.pdf
      description: z.string().optional(),
      pages: z.number().optional(),          // for PDFs
      duration: z.string().optional(),       // for slide decks / videos / workshops
      author: z.string().optional(),
      editable: z.boolean().default(false),  // true for PPTX/DOCX/XLSX — easier to rebrand
    })).default([]),
  }),
});

const flashcards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/flashcards' }),
  schema: z.object({
    question: z.string(),
    category: z.enum(['findable', 'accessible', 'interoperable', 'reusable', 'general']),
    difficulty: z.number().min(1).max(3),
    relatedModule: z.string().optional(),
  }),
});

const journeys = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journeys' }),
  schema: z.object({
    title: z.string(),
    scenario: z.string(),
    audience: z.string(),
    path: z.array(z.object({
      module: z.string(),
      version: z.enum(['short', 'long']),
    })),
  }),
});

export const collections = { modules, flashcards, journeys };

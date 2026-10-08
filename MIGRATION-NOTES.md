# Astro → Jekyll (ELIXIR Toolkit Theme) migration notes

This directory is a **Jekyll** rebuild of the FAIR-in-action Playbook, migrated
from the Astro site that still lives at the repo root. The Astro site is
**untouched** — this is a parallel `jekyll/` tree for comparison and cutover.

Migrated by following the **ELIXIR Toolkit Theme (ETT)** model — the
community-maintained Jekyll theme behind RDMkit, the FAIR Cookbook and the
ELIXIR-UK handbook — with the ELIXIR-UK brand applied (navy `#023452`, orange
`#F47D20`, mid-blue `#037EAB`, Lato; BioFAIR as footer commissioner credit).

---

## Build status — GREEN (verified on this machine)

- `bundle exec jekyll build` succeeds (Ruby 3.3.10, Bundler 4.0.1, Jekyll 4.4.1,
  arm64-darwin).
- All 18 pages generate: home, recommend, modules index + 8 module pages,
  journeys index + 4 journey pages, flashcards, branding.
- `bundle exec jekyll serve` was run and every route returned HTTP 200
  (`/`, `/recommend/`, `/modules/`, `/modules/02-public-repos/`, `/journeys/`,
  `/journeys/new-postdoc/`, `/flashcards/`, `/branding/`, plus CSS/JS assets).
- A production build with `--baseurl /fair-playbooks` was verified: every
  internal link, asset, image, `window.__BASE__`, and the recommender's per-module
  URLs correctly carry the subpath.

## Preview it (one command)

```bash
cd jekyll && bundle install && bundle exec jekyll serve
# → http://127.0.0.1:4000/
```

To preview the GitHub project-page subpath locally:

```bash
cd jekyll && bundle exec jekyll serve --baseurl /fair-playbooks
# → http://127.0.0.1:4000/fair-playbooks/
```

---

## What's ported

| Area | Astro source | Jekyll target | Notes |
|---|---|---|---|
| **Modules** collection | `src/content/modules/*.md` | `_modules/*.md` | Front-matter copied **verbatim**, incl. the full `session:` array (title/minutes/principles/objectives/tip/script/points/exercise/image), `sources`, `useCases`, all 5 recommender tag axes. |
| **Journeys** collection | `src/content/journeys/*.md` | `_journeys/*.md` | See "Known gaps" re: the `path` → `journey_path` rename. |
| **Flashcards** collection | `src/content/flashcards/*.md` | `_flashcards/*.md` | `output: false`; rendered as a list on `/flashcards/`. |
| Module page | `pages/modules/[...slug].astro` | `_layouts/module.html` | On-page facilitator session (steps, bands, scripts, points, exercises, images), sources strip, workshop-pack downloads, hero with oversized number, prose fallback when no `session:`. Minutes-range math (`"40–50"` → `"10 min"`) reimplemented in Liquid. |
| Modules index | `pages/modules/index.astro` | `modules/index.html` | |
| Journeys index | `pages/journeys/index.astro` | `journeys/index.html` | |
| Journey page | `pages/journeys/[...slug].astro` | `_layouts/journey.html` | Resolves each step's module, sums total minutes, renders ordered path. |
| Flashcards page | `pages/flashcards/index.astro` + `components/Flashcard.astro` | `flashcards/index.html` + `assets/js/flashcards.js` | Reveal + local self-assessment. |
| Home | `pages/index.astro` | `index.html` | Hero, differentiator strip, journeys, modules grid, make-it-yours. Rendered as the **canonical** (non-forked) variant. |
| Nav / header / footer | `layouts/BaseLayout.astro` | `_layouts/default.html`, `_includes/header.html`, `_includes/footer.html` | ELIXIR-UK logo + BioFAIR footer credit. |
| Branding / design tokens | inline `<style>` in BaseLayout + per-page | `assets/css/site.css` | Ported verbatim to one static CSS file (no SCSS) so the build has zero theme-style dependencies. |
| **Recommender** | `pages/recommend.astro` | `recommend.html` + `assets/js/recommend.js` | Module tag data emitted as JSON via Liquid into `<script id="module-data">`; the client-side 5-question wizard + weighted scorer is the original logic, lifted verbatim. |
| **Runtime institution profile** | inline scripts in BaseLayout | `assets/js/profile.js` | Framework-agnostic JS lifted across: `localStorage` key `fair:profile`, `window.FairProfile`, live CSS-variable recolor, header logo swap, hydration of institutional-help / repo / team slots, "viewing as" banner. |
| Branding set-up form | `pages/branding.astro` | `branding.html` + `assets/js/branding.js` | Save/clear/demo/export/import a profile. |
| Static assets | `public/assets/**` | `assets/**` | Branding logos + module 02 image/pptx/docx copied over. |

### Base paths (the thing that hurt in Astro)

Done idiomatically: **every** internal reference uses Jekyll's `relative_url`
filter, and `site.baseurl` drives it. Verified to work both locally (root) and
under a project subpath (`--baseurl /fair-playbooks`). The recommender bakes each
module's `relative_url`-resolved URL into the JSON, so client-side links are
baseurl-correct too. `window.__BASE__` is set from `{{ '/' | relative_url }}` so
the profile JS resolves the logo path correctly under any baseurl.

---

## Verified vs unverified (interactive bits)

Beyond "it builds", the two client-side features were smoke-tested:

- **Recommender — VERIFIED (logic).** The built page emits valid JSON for all 8
  modules; `recommend.js` reads `#module-data` and applies `AXIS_WEIGHTS`.
  Running the exact scoring function over the emitted JSON in Node produced a
  correct ranked result (for audience=postdoc, scenario=ending-project,
  dataType=sequencing, intent=how-to → top match `02-public-repos`, score 8,
  with a sensible tail). The DOM wiring (button clicks, step advance) is the
  original Astro logic copied unchanged; **not** exercised in a real browser here.
- **Institution profile — VERIFIED (wiring).** `profile.js` loads on every page
  after `window.__BASE__` is set; the header `<img id="header-logo-img">` target
  exists; `applyBrand()` sets `--coral/--p2` from `brand.primary`, `--lime/--p1`
  from `brand.accent`, and swaps `logo.src`; the branding form saves those via
  `FairProfile.set`. A Node simulation of `applyBrand` confirmed the CSS-var
  overrides and the canonical-logo fallback. The code is byte-for-byte the same
  framework-agnostic script as Astro's, so runtime behaviour matches. **Not**
  click-tested in a real browser (no headless browser was run).

---

## Theme strategy — why ETT is vendored, not `remote_theme`

The intent was `remote_theme: ELIXIR-Belgium/elixir-toolkit-theme`. It **downloads
fine but fails to build**: ETT's own `_config.yml` declares a private plugin
`elixir-toolkit-theme-plugins` that is **not published as a gem**, so stock Jekyll
(and GitHub Pages via Actions) aborts with a `MissingDependencyException`.

Decision: **follow ETT's model (collections, layout/include structure, brand
tokens) with local, self-contained layouts/includes** instead of pulling the
theme at build time. Rationale:

- It **always builds** — no external theme fetch, no private-plugin dependency.
  This is the "picks what builds cleanly on GitHub Pages" requirement.
- This site's design is a bespoke ELIXIR-UK layout that overrides essentially all
  of ETT's presentation anyway, so we consume almost none of ETT's internals.

`jekyll-remote-theme` is still in the `Gemfile` and the `remote_theme:` line is
present-but-commented in `_config.yml`, so formally adopting ETT internals later
is a one-line change once ETT ships (or you vendor) its plugin gem.

---

## Deferred (with attachment plan)

Both were explicitly in-scope to defer. Neither blocks the core site.

1. **Present mode** (`pages/present/02-public-repos.astro`) — a standalone
   reveal.js deck generated from a module's `session:` data. **Not ported yet.**
   The module page already links to `/present/02-public-repos/` (button is live;
   the target 404s until built).
   *How it attaches:* add `present/02-public-repos.html` (a plain layout-less page
   that loads reveal.js from CDN) and generate its slides from
   `site.modules | where slug '02-public-repos'`'s `session:` array with Liquid —
   the same data the module page already renders. The reveal CSS/theme block from
   the Astro file ports across as-is; the repo/team `<span data-profile-*>` slots
   already hydrate via the shared `profile.js`.

2. **Deck-generation pipeline** (`scripts/session-to-decks.mjs`,
   `session_to_pptx.py`, `make-reference-templates.mjs`) — emits editable
   `.pptx`/`.docx` from `session:`. These are **framework-agnostic build scripts**
   and were intentionally left unchanged. The module page's download buttons point
   at `assets/modules/<id>/<id>.pptx` and `...-facilitator-guide.docx`; the
   **pre-built** module-02 outputs were copied into `assets/modules/02/`, so those
   two downloads work today. Other modules' buttons 404 until the scripts run.
   *How it attaches:* run the scripts in the deploy job with their output dir set
   to `jekyll/assets/modules/<id>/` (a commented `Generate editable decks` step is
   already in `deploy.yml.template`). Locally: run them and commit the outputs.

---

## Known gaps / caveats

- **`path:` → `journey_path:` (required rename).** Jekyll **reserves** `page.path`
  (it holds the source file path), which silently clobbered the journey step list.
  The `path:` front-matter key in `_journeys/*.md` was renamed to `journey_path:`
  and the layouts/index updated to match. Journey totals now compute correctly
  (verified: new-postdoc = 105 min, bespoke-data = 55 min). **If you later
  re-sync journey content from the Astro `src/`, re-apply this rename.**
- **HTML in `points:`/`script:` is rendered raw** (e.g. `<code>`,
  `<span class="repo-slot" data-profile-repo>`), matching Astro's `set:html`.
  Liquid does not auto-escape `{{ }}`, so this is intentional and content-trusted.
- **`present mode` link is live but 404s** until present mode is built (see above).
- **Non-module-02 deck download buttons 404** until the deck scripts run (above).
- Interactive features were verified by logic/wiring inspection + Node simulation,
  **not** in a headless browser (see "Verified vs unverified").
- `Gemfile.lock` is committed and already multi-platform (incl. linux), so CI
  installs deterministically.

---

## Recommended cutover path

1. Land/park the Astro site (keep it until the Jekyll site is signed off).
2. Build present mode + wire the deck scripts' output into `assets/modules/**`
   (the two deferred items) if those downloads are needed at launch.
3. Move the Jekyll site to the repo root: `git mv jekyll/* jekyll/.* .`
   (or move the Astro site into an `astro-legacy/` folder first). Keep
   `Gemfile`, `Gemfile.lock`, `_config.yml`, `_layouts/`, `_includes/`,
   `_modules/`, `_journeys/`, `_flashcards/`, `assets/`, and the top-level pages.
4. Replace `.github/workflows/deploy.yml` with the contents of
   `deploy.yml.template` (it builds with Jekyll + sets `--baseurl /fair-playbooks`
   for the project subpath). In Settings → Pages, keep Source = "GitHub Actions".
5. Delete the Astro-specific files (`astro.config.mjs`, `src/pages`, `src/layouts`,
   `package.json` Astro deps) once you're confident — the `scripts/` deck
   generators are framework-agnostic and stay.

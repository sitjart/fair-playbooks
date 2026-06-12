---
# ─────────────────────────────────────────────────────────────────────
# MODULE TEMPLATE
#
# Copy this file, rename it to NN-your-module-slug.md (e.g. 06-data-sharing.md),
# and edit. The leading underscore in this filename tells the loader to skip
# it — copies without the underscore will be picked up as real modules.
#
# Every field below has a comment explaining what it does, why it matters,
# and what to watch out for. Required fields are flagged. Tag taxonomies
# are enum-validated — typos fail the build with a clear error.
# ─────────────────────────────────────────────────────────────────────


# === REQUIRED ===

title: "Your module title"          # appears in cards, page headers, recommender results
number: 99                           # the giant number on the page hero (use 0–10 for P1, 11+ for P2)

# The summary appears on every card, in the recommender, and as a meta description.
# Aim for 2-3 sentences. Treat this as the one paragraph everyone reads — make it count.
summary: "One paragraph describing what this module is about, who it's for, and what someone will be able to do after engaging with it."

estimatedMinutes:
  long: 30                           # required: how long a facilitator can run the full module
  # short: 5                         # OPTIONAL — uncomment when this module has a meaningful
                                     # recap version. Omit when the module is a reference
                                     # checklist or doesn't recap meaningfully.


# === TAG TAXONOMY (drives the recommender) ===
# All four are arrays of enums. Build fails on typo.

# Which playbook(s) does this belong to?
# Most modules belong to ONE; foundational primers belong to BOTH.
playbook:
  - fairification                    # OR: communicate-advocate
  # - communicate-advocate

# Who would a facilitator use this with?
# Pick 1-4. Reflects the AUDIENCE the trainee is being supported with, not the facilitator.
audience:
  - researcher                       # generic researcher, any career stage
  # - phd-student
  # - postdoc
  # - pi
  # - decision-maker                 # heads of dept, deans, grant officers
  # - rdm-peer                       # another RDM professional being trained / advised

# What's the scenario this lands well in?
# Pick 1-3. This is the highest-weighted axis in the recommender.
scenario:
  - mid-project                      # OR:
  # - starting-project
  # - ending-project
  # - legacy-data
  # - advocating-internally          # talking to leadership/colleagues
  # - training-team

# What kind of data is this about?
# Pick 1-3. Use n-a for general/cultural modules.
dataType:
  - mixed                            # OR:
  # - sequencing
  # - proteomics
  # - imaging
  # - spreadsheet                    # bespoke data without a community repo
  # - code                           # github / pipelines / scripts
  # - n-a                            # general / cultural / not data-specific

# What does the module DO for the user?
# Pick 1-2. Drives "delivers the format you need" reasoning in the recommender.
intent:
  - how-to                           # OR:
  # - motivate                       # shifts attitude, removes shame, gives permission
  # - signpost                       # points to other resources in context
  # - self-assess                    # lets the learner check where they are
  # - hands-on-exercise              # the module IS an exercise


# === OPTIONAL — set only when relevant ===

# If this module structures its content around specific use cases (like Module 4 does),
# list them here. The page will show a "covers:" strip and surface institutional-help
# callouts in the long view. Omit if the module isn't use-case-driven.
useCases: []
# useCases:
#   - unpublished
#   - published-not-fair
#   - legacy

# Module IDs (filenames without .md) that should ideally be done before this one.
# Used for context only — not strictly enforced.
prerequisites: []
# prerequisites: ["00-what-is-fair"]

# Free-form keywords. Not used by the recommender — that's what the enum tags above are for.
# Use this for editorial notes, dataset names, or whatever helps maintainers.
tags: []

# Set true when this is a side room (parallel one-hour session, not on the main path).
isSideRoom: false

# Set true when the canonical version is drawn from external resources (RDMkit, GO FAIR, etc.)
# rather than written fresh by this project. Surfaces a coral banner explaining this.
drawnFromExistingResources: false

# Who led drafting? Used in the facilitator note at the bottom of long modules.
leadContributors: []
# leadContributors: ["Munazah Andrabi", "Robert Andrews"]
---

# The module body

Everything below the frontmatter is the **full module content**. This is what
appears under the "📖 Full module" toggle on the module page.

## Section conventions

Use `## headings` for sections — they get a `§` glyph prepended automatically.

Use `> blockquotes` for facilitator notes — they get a left-coral border.

Use `**bold**` for emphasis, `*italic* `for asides.

Code blocks (triple backtick) render in mono with dark background.

Tables work fine.

## What goes here vs. the summary?

- The `summary` field in frontmatter = the one-paragraph blurb on cards everywhere.
- This body = the actual content a facilitator delivers or reads.

When you eventually add proper short-version content (separate from summary), the
likely convention will be to use a `<!-- more -->` delimiter:

> Above the marker = short-version delivery content (5-10 min worth)
> Below the marker = additional long-version content (the rest of the workshop)

That's not implemented yet — the team should decide in a contentathon whether
short versions need their own content or whether the summary is enough.

---
title: "I'm late to the party"
number: 4
summary: "Targets researchers who already have or are producing data that isn't FAIR. The honest message: it's not too late. The spine is the data lifecycle and the points at which you can join it, with concrete actions framed by where you currently are — and explicit minimum-viable fallbacks for when the ideal isn't possible."
estimatedMinutes:
  short: 5
  long: 40
prerequisites: []
tags: [legacy-data, post-project, motivation, lifecycle]
useCases: [unpublished, published-not-fair, legacy]
leadContributors: ["Allyson Lister", "Nick Owen"]
playbook: [fairification]
audience: [postdoc, pi, researcher]
scenario: [ending-project, legacy-data]
dataType: [mixed]
intent: [motivate, how-to]
---

The most powerful message in any FAIR conversation is: **it's not too late.**

The most common reason researchers don't improve their data is the belief that the window has closed — *"the project's ended", "I didn't plan for this from the start", "it would take too much work now"*. This module exists to dismantle that belief, then give concrete actions framed by where you actually are.

This module is built around three use cases. The right starting point depends on which one fits your situation.

## The three use cases

### 1. Unpublished — "I'm being asked to make my data FAIR before I can submit"

The paper isn't out yet, but a journal, funder or institutional requirement has surfaced. You need to collect or create FAIR metadata. This is the easiest of the three because the PI and team are usually still available to fill in gaps.

### 2. Published but not FAIRly — "It's already out there, but it's a mess"

The paper is published, but the data is poorly curated. The goal is to *improve* FAIRness post-hoc — typically by adding metadata, choosing a clearer licence, linking the DOI properly, or moving data to a more appropriate repository. A FAIR-checker tool (e.g. [F-UJI](https://www.f-uji.net/?action=test)) can show you concretely where the dataset falls short.

### 3. Legacy — "I have orphan data that someone wants to keep"

Data from a finished project, perhaps a retired PI, perhaps a student who graduated. The realistic goal is *retention with enough metadata to make keeping it worthwhile*. If you can't get enough information about the data to make it interpretable, the honest answer may be to let it go.

## The data lifecycle and where you can join it

You can join the FAIRification process at any point in the data lifecycle. The earlier you join, the more you can do — but every entry point has *something* useful to offer.

| Lifecycle stage | What's hard to fix from here | What you can still do |
|---|---|---|
| **Planning** | Nothing — you're not late! | Write a DMP, pick standards, plan metadata |
| **Collecting** | Past samples without IDs | Standardise IDs now, check consent, prioritise key metadata |
| **Processing** | Original processing steps if undocumented | Document everything from here; ideally as code |
| **Analysing** | Reconstructing exactly what you did | Record analysis steps, prepare to share processed data |
| **Preserving** | Can't add metadata you never collected | Choose preservation format, write a README |
| **Sharing** | Contact for people who left, missing context | Make data Findable + Accessible at minimum |
| **Reusing** | You're dependent on what others FAIRified | Improve your *own* dataset if it's yours |

> Facilitator activity: hand out "cards" representing different research scenarios. Ask participants to place each card in the lifecycle stage where the researcher would join. Discuss what each could realistically do from that point forward.

## Before you start, ask

- Am I FAIRifying **metadata only**, or the data too?
- Do I understand the data and its context?
- What metadata do I already have? (Commercial NGS often comes with metadata; core facilities generate it.)
- Who can I contact? Who owns the data? What permissions exist?
- Are there restrictions (legal, ethical, commercial)?
- Should this be **open** or just **FAIR**? (FAIR doesn't mean open.)
- Where will I deposit it, and what are that repository's requirements?

## Minimum viable FAIR — when you can't do everything

Sometimes you don't have the information, time or resources to be perfectly FAIR. You can still make your data **FAIR enough**:

| Principle | The absolute minimum |
|---|---|
| **Findable** | A persistent ID (DOI) and deposit in a generalist or institutional repository |
| **Accessible** | Open, non-proprietary format where possible; respect legal/ethical restrictions |
| **Interoperable** | Standard terms if possible; otherwise, *define the terms you used* and units |
| **Reusable** | A README explaining what the data is and how it was prepared; an explicit licence |

This won't make a fully FAIR dataset. But it moves a dataset from "lost forever" to "discoverable, reusable, citeable" — and that's the lever.

## Why this module matters more than people think

This framing lands particularly well with:

- Senior researchers approaching retirement
- Postdocs wrapping up before moving on
- Anyone whose project ended without a clear data-handover plan

> Facilitator note (from Sarah Jones, repeated at many FAIR talks): this is often the most resonant module in FAIR conversations — because it removes the shame barrier. Lead with it if your audience seems defensive about past practice.

## Detailed walkthrough by FAIR principle

The full module breaks down each of the 15 FAIR sub-principles (F1, F2, F3, F4, A1, A1.1, A1.2, A2, I1, I2, I3, R1, R1.1, R1.2, R1.3) with use-case-specific guidance and a "what if I can't do this?" fallback for each. That walkthrough is the long version — too long to inline here. It's currently being co-drafted in the Contentathon working doc and will be imported once stable.

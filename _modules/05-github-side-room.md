---
title: "FAIRification of GitHub repositories"
number: 5
summary: "How to make code and analytical pipelines deposited on GitHub genuinely FAIR — beyond just being open. Covers the minimum-viable checklist (licence, README, citation, archived release) and the aspirational best-practice layer (containers, workflow standards, machine-readable metadata)."
estimatedMinutes:
  long: 60  # no short version — this is a reference checklist, doesn't recap meaningfully
prerequisites: []
tags: [github, code, reproducibility, side-room]
isSideRoom: true
leadContributors: ["Eva Caamaño Gutiérrez"]
playbook: [fairification]
audience: [researcher, postdoc, rdm-peer]
scenario: [mid-project, ending-project]
dataType: [code]
intent: [how-to, hands-on-exercise]
---

When the community deposits code on GitHub to share methodology, we're often good at *Open Science* but less good at *FAIR*. Repositories without licences, READMEs or DOIs make FAIRification effectively unattainable. The good news: small, well-targeted changes have outsized impact.

This module is a **side room** — a one-hour parallel session, not part of the main playbook path. Use it when you're working with researchers who share code as well as data.

## What is GitHub (in this context)?

GitHub is a web-based platform for hosting and collaboratively developing digital materials — most commonly code, but also documentation, workflows and data-management resources. Built around Git (a version-control system), it records every change with attribution and timestamp.

For research, GitHub supports reproducibility and transparency by giving teams a structured place to manage analysis code, documentation, and review of workflows. But **GitHub is not a data repository** — it should be used alongside trusted data repositories (Zenodo, Figshare) and persistent identifiers (DOIs) for the actual data.

## What researchers need when they reach for someone else's code

For code to be useful, it must be more than available — it must be understandable, executable, reproducible and reusable. That requires:

- Clear documentation (README +, where appropriate, vignettes)
- Version information and dependency management
- Example input and output data
- A licence (otherwise legal reuse is ambiguous)
- A citation
- Enough context for someone to judge whether the code suits their research question

A FAIR GitHub repository is **citable, versioned, licensed, documented, executable, tested, and connected to persistent scholarly infrastructure**.

## The practical checklist

Items marked **essential** are the minimum-viable baseline. Items marked *aspirational* improve reuse meaningfully but take longer.

### Findable

- **Essential:** clear repository name and description; meaningful topics/tags
- **Essential:** a strong `README.md` (purpose, scope, installation, inputs, outputs, example usage)
- **Essential:** archive releases in Zenodo to mint a DOI (GitHub alone is not the persistent scholarly record)
- *Aspirational:* `CITATION.cff` so GitHub displays a citation button
- *Aspirational:* semantic versioning (`v1.0.0`, `v1.1.0`, …) and ORCIDs for contributors
- *Aspirational:* link code → data → publication → workflow via DOIs

### Accessible

- **Essential:** add a `LICENSE` — without it, others have no legal permission to reuse
- **Essential:** installation instructions that work from a clean environment
- *Aspirational:* explicit dependency pinning (e.g. `renv` for R, `pyproject.toml` for Python)
- *Aspirational:* state what happens if the project becomes inactive

### Interoperable

- **Essential:** open standard input/output formats where possible (CSV, TSV, JSON, FASTQ, etc.)
- **Essential:** provide example input and output files
- **Essential:** avoid hard-coded local paths, institution-specific assumptions and hidden credentials
- *Aspirational:* document expected schema of input files
- *Aspirational:* containerise with Docker / Apptainer / Conda
- *Aspirational:* use workflow standards (Nextflow, Snakemake, CWL) where appropriate

### Reusable

- **Essential:** explain the scientific/analytical purpose
- **Essential:** include test data with a clearly delineated data folder
- **Essential:** pin dependencies
- **Essential:** document expected runtime, memory requirements, OS assumptions
- *Aspirational:* automated tests via GitHub Actions
- *Aspirational:* changelog, contribution guidance, provenance metadata

## A good README skeleton

```markdown
# Project title

## Overview
What this repository does and who it is for.

## Citation
How to cite the software and associated paper/preprint.

## Installation
Exact installation steps.

## Quick start
A minimal working example.

## Inputs
Required files, formats, metadata fields and assumptions.

## Outputs
What files are produced and how to interpret them.

## Reproducibility
Software versions, containers, seeds, workflow engine, CI status.

## Data availability
Where input/example/full datasets are stored.

## Licence
Reuse conditions.

## Contact
Maintainer and support route.
```

## Common anti-patterns

- No README — if you don't have a link, you don't know it exists
- No licence — well-intentioned but legally ambiguous
- README that doubles as a full vignette (table of contents help; better to split out vignettes)
- Hard-coded paths from one institution's filesystem
- Code that requires version-specific dependencies without saying which

## Where this overlaps with other modules

- Module 1 (tools and resources) — Zenodo and FAIRsharing are referenced throughout
- Module 2 (public repos) — code that processes a public-repo dataset belongs in a FAIR GitHub repo paired with that dataset

> Facilitator note: this module was developed in a single 1-hour parallel session at Contentathon #2 (May 2026). It's intentionally checklist-shaped rather than narrative — works well as a structured walkthrough exercise where participants score their own (or a chosen public) repo against the checklist.

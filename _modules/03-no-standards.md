---
title: "When there is no community standard or repository"
number: 3
summary: "What to do when researchers have data that doesn't fit a standard repository — bespoke spreadsheets, custom experimental data, mixed file types. Covers minimum-viable FAIR practices, GitHub as an interim home, and how to add structure where none exists."
estimatedMinutes:
  short: 10
  long: 50
prerequisites: ["00-what-is-fair", "01-how-to-do-fair"]
tags: [spreadsheets, github, custom-data]
playbook: [fairification]
audience: [researcher, phd-student, postdoc]
scenario: [starting-project, mid-project]
dataType: [spreadsheet, mixed]
intent: [how-to, hands-on-exercise]
---

This is the hard case — and the one researchers most often face. The "just deposit it in ENA" advice doesn't apply, but FAIR still does.

## Minimum viable FAIRification for non-standard data

1. **Pick a generic repository** — Zenodo, Figshare, or Dryad. They give you a DOI and stable hosting.
2. **Add a README** — describe what each file is, in plain language. This is your interoperability layer.
3. **Use open, sustainable formats** — CSV not XLSX, TSV not proprietary binary, PNG not custom image formats.
4. **Document your columns** — a data dictionary (even a simple one) transforms a spreadsheet from opaque to reusable.
5. **License explicitly** — CC-BY 4.0 for data is a safe default.

## The "before" and "after" view

Walk through a real example:

> **Before:** `experiment_final_v3_FINAL.xlsx` on a shared drive. Three sheets. Column headers like `Sample`, `Val1`, `Notes`. No license. No README.
>
> **After:** Zenodo deposit with DOI. CSV per sheet. README explaining the experiment. Data dictionary describing every column. CC-BY 4.0 license. The same researcher's data — but now actually reusable.

That contrast is what makes FAIR click for people.

## Side conversation: using GitHub repositories

GitHub is excellent for:

- Code that processed the data
- Analysis scripts
- Small reference datasets (<100MB)
- Documentation and protocols

GitHub is *not* a long-term data repository. Pair it with Zenodo (which mints DOIs from GitHub releases automatically) for the actual data.

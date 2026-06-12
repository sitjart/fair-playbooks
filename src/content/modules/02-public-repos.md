---
title: "When a public repository solves most of the problem"
number: 2
summary: "For many data types in life sciences (sequencing, proteomics, structures), depositing in the appropriate community repository handles 80% of FAIR automatically. This module covers how to recognise that situation and guide researchers to the right home."
estimatedMinutes:
  short: 10
  long: 40
prerequisites: ["00-what-is-fair"]
sources:
  - name: "Galaxy Training Network — RNAseq FAIR tutorial"
    url: "https://training.galaxyproject.org"
    note: "Hands-on submission workflow this activity is built around"
  - name: "RDMkit"
    url: "https://rdmkit.elixir-europe.org"
    note: "Repository-selection and metadata guidance"
  - name: "FAIRsharing"
    url: "https://fairsharing.org"
    note: "Finding the endorsed community repository for a data type"
  - name: "EMBL-EBI ArrayExpress"
    url: "https://www.ebi.ac.uk/biostudies/arrayexpress/studies/"
    note: "Worked example dataset (E-MTAB-9224) and MAGE-TAB standard"
tags: [repositories, sequencing, proteomics]
playbook: [fairification]
audience: [researcher, postdoc, phd-student]
scenario: [mid-project, ending-project]
dataType: [sequencing, proteomics]
intent: [how-to, hands-on-exercise]
session:
  - title: "Introduction & FAIR principles"
    minutes: "0–10"
    principles: ["F", "A", "I", "R"]
    objectives:
      - "Participants can name the four FAIR principles"
      - "Participants understand that FAIR has both infrastructure and content dimensions"
    tip: "If attendees haven't seen FAIR before, spend 2 extra minutes pointing to each letter and asking the group what they think it means before revealing the definition — this activates prior knowledge."
    script: "Welcome. We'll work through a real, published dataset and see the FAIR principles as actual files and metadata decisions — not theory. The key idea: a repository gives you F and A almost for free; the I and R are your job."
    points:
      - "FAIR = Findable, Accessible, Interoperable, Reusable (Wilkinson 2016)"
      - "The repository handles the plumbing; the researcher supplies the content"
  - title: "The dataset"
    minutes: "10–15"
    objectives:
      - "Participants know what RNA-seq data consists of and why batch effects matter"
      - "Participants can identify the three components of a repository submission"
    tip: "If the group includes non-bioinformaticians, draw the count matrix on a whiteboard (rows = genes, columns = samples, values = read counts). One minute here pays off for the rest of the session."
    script: "RNA-seq is a great worked example. Three things go into the repository: metadata, raw FASTQ, and the count matrix. Batch effects can swamp the biology — record them in metadata from day one."
    points:
      - "Worked dataset: Alivernini et al. 2020 · <code>E-MTAB-9224</code>"
      - "Same structure for scRNA-seq, proteomics (PRIDE), metabolomics (MetaboLights)"
    image:
      src: "/assets/modules/02/img/components.svg"
      alt: "Three components of an RNA-seq submission: metadata, raw FASTQ, count matrix"
  - title: "Finding the data"
    minutes: "15–25"
    principles: ["F1", "F4", "A1"]
    objectives:
      - "Participants can explain what a persistent identifier is and why it matters"
      - "Participants can locate a dataset in ArrayExpress by accession number"
      - "Participants understand that open HTTPS access satisfies A1 and A1.1"
    tip: "If attendees struggle to find the accession in the paper, point them to the Data Availability section at the end — a real-world lesson that accession numbers aren't always prominently placed."
    script: "F1 — the accession is a permanent, citable ID. F4 — indexed and keyword-searchable. One click downloads over HTTPS, no login: that's A1/A1.1. Then point them at your institution's preferred repository."
    points:
      - "Accession <code>E-MTAB-9224</code> is globally unique & persistent"
      - "Where your researchers deposit: <span class=\"repo-slot\" data-profile-repo>[ your institution's preferred repository ]</span>"
    exercise: "Exercise 1 (5 min): find the accession in the Alivernini paper, then locate it in ArrayExpress. What's visible before you download anything?"
  - title: "Metadata & community standards"
    minutes: "25–40"
    principles: ["F2", "F3", "R1.3", "I1"]
    objectives:
      - "Participants can describe what MAGE-TAB (IDF + SDRF) is and what each file contains"
      - "Participants can critically assess whether metadata is sufficient for reuse"
      - "Participants understand the role of ontologies in making metadata interoperable"
    tip: "Allow 2–3 minutes for pairs to discuss before opening up to the group. If time is short, skip the hands-on element and walk through a single SDRF row together, pointing out fields that are and aren't present."
    script: "This is where FAIR is won or lost. MAGE-TAB = IDF (study-level) + SDRF (per-sample + file links). Use ontology terms (EFO, OBI, UBERON), not free text, so machines can read it."
    points:
      - "F2 rich metadata · F3 SDRF links each sample to its FASTQ"
      - "R1.3 community standard (MAGE-TAB) · I1 controlled vocabularies"
    exercise: "Exercise 2 (8 min): open the SDRF for E-MTAB-9224. Clear variable names? Batch info recorded? Ontology URIs or free text? Could you reuse it without contacting the authors?"
  - title: "Building a FAIR metadata spreadsheet"
    minutes: "40–50"
    principles: ["F2", "R1", "R1.2"]
    objectives:
      - "Participants can complete a minimum-viable RNA-seq metadata spreadsheet"
      - "Participants understand that good FAIR practice begins at experimental design, not submission"
    tip: "The key insight: most metadata cannot be retrospectively retrieved — batch information in particular is often lost if not recorded at the bench. For advanced groups, ask them to look up the EFO term for 'rheumatoid arthritis' at ebi.ac.uk/ols4."
    script: "Everything we've discussed comes from a spreadsheet you fill in as you run the experiment — which becomes the SDRF. Annotare can't conjure information that was never recorded; batch info especially is lost if not captured at the bench."
    points:
      - "Compulsory: sample IDs, condition, replicates, platform, reference genome + version, protocol"
      - "Strongly recommended: batch (run/date/operator), RIN, QC, confounders, software versions"
  - title: "Licensing, provenance & wrap-up"
    minutes: "50–60"
    principles: ["R1.1", "R1.2"]
    objectives:
      - "Participants understand why a data licence is required and know the common options"
      - "Participants can articulate the most common failures in FAIR practice"
      - "Participants can map each FAIR principle to the correct lifecycle stage"
    tip: "The 'one specific change' prompt is a closing commitment device — people are more likely to act on a concrete, self-generated commitment than a general instruction. Signpost the Galaxy RNA-seq FAIR tutorial as follow-up."
    script: "No licence = others can't legally reuse it (CC0 or CC-BY). Provenance: genome build and software versions matter. Take-home: repositories do F/A, you supply I/R, and FAIR starts at experimental design. Ask everyone for one specific change they'll make."
    points:
      - "Repository handles F1, F3, F4, A1, A2 · you must provide F2, I1, R1"
      - "Local support: <span data-profile-team>[ set up your institution profile ]</span>"
workshopAssets:
  - title: "Facilitator's Workshop Guide"
    type: facilitator-guide
    file: "/assets/modules/02/FAIR_RNAseq_Facilitator_Guide.pdf"
    description: "45–60 min hands-on workshop for FAIRifying bulk RNAseq. Includes scripts, exercises with expected solutions, timing guidance, and a minimum-metadata checklist."
    pages: 12
    duration: "45–60 min"
  - title: "Workshop Slide Deck"
    type: slides
    file: "/assets/modules/02/FAIR_RNAseq_Workshop_Slides.pdf"
    description: "11 slides mirroring the facilitator guide section by section, designed to be presented alongside it."
    pages: 11
    duration: "45–60 min"
---

The single most underrated FAIR strategy: **deposit in the right repository, and you've already done most of the work**. The repository enforces metadata standards, assigns identifiers, ensures long-term access, and surfaces your data to search engines.

## Worked example: RNA-seq

A researcher comes to you with RNA-seq data they want to share alongside a paper.

- **Findable** → ENA/GEO assigns a stable accession (e.g. `GSE12345`, `PRJEB12345`)
- **Accessible** → public download via standard protocols (FTP, REST API)
- **Interoperable** → SRA/ENA metadata schema enforces consistent fields
- **Reusable** → community-recognised format (FASTQ), licensing handled by the repository's terms

The researcher's effort: prepare a good metadata sheet and upload. The repository does the rest.

## How to spot a "repository solves it" case

Ask three questions:

1. Is this a **standard data type** (sequencing, proteomics, structures, imaging, etc.)?
2. Is there an **endorsed community repository** (check FAIRsharing if unsure)?
3. Are there **no exceptional access restrictions** (patient data with consent constraints, etc.)?

If yes to all three: the answer is almost certainly "deposit there." Spend your conversation on metadata quality, not on bespoke FAIR strategies.

## When this *doesn't* apply

Move to Module 3 if:

- The data type has no community repository
- The data is heterogeneous (mixed types, custom assays)
- The data is bespoke spreadsheets, internal databases, etc.

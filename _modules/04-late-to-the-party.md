---
title: "I'm late to the party"
number: 4
summary: "For researchers who already have, or are producing, data that isn't FAIR. Participants place their dataset on the data lifecycle, triage what is realistic from there, and leave with one Minimum Viable FAIR action for their own data."
estimatedMinutes:
  short: 5
  long: 60
prerequisites: []
tags: [legacy-data, post-project, motivation, lifecycle, triage]
useCases: [unpublished, published-not-fair, legacy]
leadContributors: ["Allyson Lister", "Nick Owen"]
playbook: [fairification]
audience: [postdoc, pi, researcher]
scenario: [ending-project, legacy-data]
dataType: [mixed]
intent: [motivate, how-to]
slide_title: "It's not too late to make your data FAIR"
slide_subtitle: "What you can still do, from wherever you are"
benefit: "Leave with one thing you can do this week that makes your data findable, citable and usable by your future self."
sources:
  - name: "NFDI4BIOIMAGE data management illustrations by Henning Falk (2024)"
    url: "https://doi.org/10.5281/zenodo.14186100"
    note: "“Imaging Data Lifecycle” and “Datasets Anonymous”, CC-BY 4.0, used unchanged with attribution"
  - name: "RDMkit — Data life cycle"
    url: "https://rdmkit.elixir-europe.org/data_life_cycle"
    note: "Participant reference for the lifecycle stages"
  - name: "F-UJI FAIR assessment tool"
    url: "https://www.f-uji.net"
    note: "Shows where an already-published dataset falls short"
  - name: "FAIR Cookbook"
    url: "https://faircookbook.elixir-europe.org"
    note: "Recipes for the deeper-retrofit actions (identifiers, licences, metadata)"
session:
  - title: "It's not too late"
    minutes: "0–8"
    short: 5
    cut: "Skip the horror stories; keep the reassurance."
    script: "Welcome. If you're here, you probably have data that isn't as FAIR as you'd like, and that's exactly who this session is for. This isn't about how you should have started. It's about what is realistic from where you are now. Look at this lifecycle: imagine joining it at the very end, with everything gone wrong. Sound familiar? That was deliberately the worst case. You've probably already done some things right, a methods section or a key to your columns. Being late is normal."
    tip: "Deliver the reassurance as the point, not as a caveat, even when short of time. Run the poll for the use cases: ask for hands and click each option (or press its number) to count. The result tells you which examples to lean on later. Invite one or two horror stories, keep them light."
    slide:
      headline: "Late? So is everyone."
      poll:
        question: "Which one is you?"
        options: ["Unpublished", "Published, but messy", "Legacy"]
      image:
        src: "/assets/images/nfdi4bioimage/imaging-data-lifecycle.jpg"
        alt: "Cartoon of the imaging data lifecycle, with a researcher's excuse at each stage, captioned Been there, done that"
        credit: "“Imaging Data Lifecycle”, NFDI4BIOIMAGE Consortium (2024): NFDI4BIOIMAGE data management illustrations by Henning Falk, Zenodo, https://doi.org/10.5281/zenodo.14186100, CC-BY 4.0"
  - title: "Where are you on the lifecycle?"
    minutes: "8–18"
    short: 8
    cut: "Cover only the stages people in the room are at."
    principles: ["R1.2"]
    script: "Wherever you join the lifecycle, some things are still realistic and some are hard or impossible to recover. Let's go stage by stage. If you're at planning, you're not late at all. At collecting, the person who gathered the data can still explain it, so capture that now. If you share processed data or results without explaining what was done, share the raw data instead: an undocumented transformation is worse than none."
    tip: "Count hands for each stage first, then spend the time on the stages your room is actually at. Use the lifecycle reference table below as your lookup. Variant if you have time: each person starts from their own stage, goes back to Planning, and works forward through what they skipped, listing what they can still recover."
    slide:
      headline: "Where are you joining?"
      lines:
        - "The earlier you join, the more you can still recover"
      poll:
        question: "Where is your dataset now?"
        options: ["Planning", "Collecting", "Processing", "Analysing", "Preserving", "Sharing", "Reusing"]
  - title: "Before you start"
    minutes: "18–23"
    short: 0
    cut: "Set as take-home."
    script: "A few questions before deciding what to do. Work on your own dataset, or a realistic one if you don't have it to hand. Metadata only, or the data too? Could you describe it to someone else? What metadata already exists: sequencing providers and core facilities often supply some. Who owns it, and who can you still contact? Any legal or ethical limits? And where will it go?"
    tip: "Works as quiet individual work or in pairs, or as a take-home. FAIR is not the same as open: make sure that point lands. Before the session, check whether the project already has a data management plan (ask your research office or look in DMPonline): it often answers half of these questions. Point people to <a href='https://rdmkit.elixir-europe.org/data_management_plan'>RDMkit on data management plans</a> and the <a href='https://ds-wizard.org'>Data Stewardship Wizard</a>."
    slide:
      headline: "Know what you've got"
      lines:
        - "What metadata already exists?"
        - "Who can still explain it?"
        - "Open, or just FAIR?"
      prompt: "Answer for your own dataset"
      image:
        src: "/assets/images/nfdi4bioimage/datasets-anonymous.jpg"
        alt: "Cartoon of three datasets in a support group called Datasets Anonymous, unsure of their own acquisition date, channels and cell line"
        credit: "“Datasets Anonymous”, NFDI4BIOIMAGE Consortium (2024): NFDI4BIOIMAGE data management illustrations by Henning Falk, Zenodo, https://doi.org/10.5281/zenodo.14186100, CC-BY 4.0"
  - title: "Triage: quick wins vs deeper retrofit"
    minutes: "23–28"
    short: 5
    cut: "Never cut."
    principles: ["F1", "F2", "R1.1"]
    script: "With limited time, the most useful skill is triage: what gives the most FAIRness for the least effort? A few minutes buys a DOI from a generalist repository, keywords, a named licence and a list of what your abbreviations mean. Days of work buy a domain repository, a community metadata standard, ontology mapping and a full provenance chain. And remember that depositing in a repository does most of the work of making data findable and accessible for you: identifiers, indexing and download."
    tip: "This is the core of the session. Protect it even under severe time pressure."
    slide:
      headline: "Minutes, or days?"
      lines:
        - "<strong>Minutes:</strong> a DOI, keywords, a licence, your abbreviations written down"
        - "<strong>Days:</strong> a domain repository, a standard, ontology terms, full provenance"
        - "A repository does most of the finding and access work for you"
      prompt: "Start with the minutes"
  - title: "Minimum Viable FAIR"
    minutes: "28–33"
    short: 5
    cut: "Never cut."
    principles: ["F1", "A1.1", "I2", "R1.1"]
    script: "When you can't do full FAIR, here is an honest target. A persistent identifier from a repository. An open format, within legal and ethical limits. Standard terms, or at least your own terms clearly defined. Enough metadata to show where the data came from, plus a licence. It won't make a fully FAIR dataset, but it makes it FAIR enough. Then turn it round: if you were the one reusing this dataset, what would you need?"
    tip: "Let the room build the minimum from a reuser's point of view before you confirm the four actions. People argue themselves into it."
    slide:
      headline: "FAIR enough"
      lines:
        - "<strong>Findable:</strong> a persistent ID"
        - "<strong>Accessible:</strong> an open format"
        - "<strong>Interoperable:</strong> your terms, defined"
        - "<strong>Reusable:</strong> a README and a licence"
      prompt: "If you were reusing this dataset, what would you need?"
  - title: "Your priority worksheet"
    minutes: "33–48"
    short: 12
    cut: "Run the persistent-ID case as a whole-group discussion only."
    principles: ["F1", "R1.2"]
    script: "Take the four Minimum Viable FAIR actions and rate each for your own dataset: a priority, a quick win, or not possible. Let's do two together. A persistent ID is almost always possible: a generalist repository mints a DOI in minutes. Provenance for legacy data is the hard one: sometimes nothing can be recovered, and deciding not to share is an honest outcome, not a failure."
    tip: "After the pairs have compared, count hands for each person's top priority and talk through the winner. Group people by use case, or let them work alone on their own dataset. Use the FAIR mapping below to answer questions about specific principles; don't present it."
    slide:
      headline: "Rate your four"
      lines:
        - "Priority, quick win, or not possible?"
        - "Then compare with a neighbour"
      poll:
        question: "What's your top priority?"
        options: ["A persistent ID", "An open format", "Your terms, defined", "A README and a licence"]
  - title: "Who can help here"
    minutes: "48–53"
    short: 5
    cut: "Show the slide; don't discuss it."
    script: "You don't have to do this alone. Here is who to contact here for each kind of gap."
    tip: "Fill in your institution profile before the session so these lines show your own services."
    slide:
      headline: "You're not on your own"
      lines:
        - "Depositing: <span class='repo-slot' data-profile-repo>[ your institution's preferred repository ]</span>"
        - "Data management plans: <span class='repo-slot' data-profile-help='dmp'>[ DMP advice, usually the library ]</span>"
        - "Formats: <span class='repo-slot' data-profile-help='it'>[ IT or research computing ]</span>"
        - "Ethics and legal: <span class='repo-slot' data-profile-help='ethics'>[ ethics or legal office ]</span>"
        - "Everything else: <span class='repo-slot' data-profile-team>[ set up your institution profile ]</span>"
  - title: "Better, not perfect"
    minutes: "53–58"
    short: 2
    cut: "Skip discussion; keep the commitment."
    script: "Sometimes you won't have the time, information or resources to be perfectly FAIR, and that's fine. Nearly every principle has a minimum for exactly this situation. FAIR enough is better than unFAIR. Before you leave: one quick win you'll do this week."
    tip: "Say it as a statement of values, not a bullet list. Going round the room for commitments makes them more likely to happen."
    slide:
      headline: "FAIR enough beats unFAIR"
      prompt: "Your one quick win this week?"
---

## The situation

Run this module with researchers who already have data that isn't as FAIR as it should be, and feel it is too late to do anything about it. They usually fit one of three cases:

| Use case | What they say | Realistic goal |
|---|---|---|
| **Unpublished** | "The journal or funder wants FAIR data before I can submit." | Create enough FAIR metadata to deposit. Easiest case: the PI and team are still around to fill gaps. |
| **Published, not FAIRly** | "It's already out there, but it's a mess." | Improve it after the fact: link the DOI, add metadata, name a licence, move it to a better repository. |
| **Legacy** | "There's orphan data from a finished project and someone wants to keep it." | Keep it with enough metadata to make keeping it worthwhile, or decide honestly to let it go. |

Typical rooms: postdocs wrapping up, PhD students near submission, PIs with legacy data, data stewards inheriting other people's datasets. Mixed rooms are fine; see [What goes wrong](#what-goes-wrong).

This module does not explain what FAIR is. If your audience needs that first, run [What is FAIR?](../00-what-is-fair/) before it.

## The decision

Participants leave having **triaged their own dataset** and committed to **one Minimum Viable FAIR action** they can do this week.

One outcome must be presented as legitimate: for some legacy data nothing can be recovered, and the right decision is not to keep it.

## The session plan

The full version runs 58 minutes, leaving 2 minutes of slack. The short version runs 42. About 30–40 minutes of it is core content; the rest is activity and discussion. Everything below, the live slides and both downloads are built from the same steps. Slides show only each step's headline, a few short lines and a prompt for the room; the script and timings stay with you.

<div class="session-slot"></div>

### Lifecycle reference for step 2

| If you're at… | What's realistic from here | Watch out for | Who can help |
|---|---|---|---|
| **Planning** | You're not late. Write or find the DMP; plan metadata and standards. | A DMP may already exist that nobody told you about. | <span class="repo-slot" data-profile-help="dmp">[ DMP advice, usually the library ]</span> |
| **Collecting** | Record sample IDs, method and technique now, while the person who collected the data can explain it. | Consent forms may limit what can be shared. | <span class="repo-slot" data-profile-team>[ research data support ]</span> |
| **Processing** | Standardise IDs in batch, sooner rather than later. Anonymise now if needed. | Sharing processed data without saying what was done to it. If you can't explain it, share the raw data instead. | <span class="repo-slot" data-profile-team>[ research data support ]</span> |
| **Analysing** | The information you need to interpret results is the metadata you need. Record pipelines and run files. | Sharing derived results (clusters, annotations) without how they were produced. | <span class="repo-slot" data-profile-team>[ research data support ]</span> |
| **Preserving** | Convert to open, future-usable formats; write a README. | You can't add metadata you never collected. Work with what you have. | <span class="repo-slot" data-profile-help="it">[ IT or research computing ]</span> |
| **Sharing** | Choose a repository; contact people who have left; re-consent if needed. | Reusability depends on what was recorded earlier. | <span class="repo-slot" data-profile-repo>[ your repository team ]</span>; <span class="repo-slot" data-profile-help="ethics">[ ethics or legal office ]</span> |
| **Reusing** | If it's yours, you can still add metadata, a PID or a deposit. | If it's someone else's, contacting the author doesn't always work. | <span class="repo-slot" data-profile-repo>[ your repository team ]</span> |

## Participant materials

| Material | Source | Status |
|---|---|---|
| Lifecycle cartoon (step 1) and "Datasets Anonymous" (step 3) | [NFDI4BIOIMAGE illustrations by Henning Falk, 2024](https://doi.org/10.5281/zenodo.14186100), CC-BY 4.0 | **Reused unchanged**, embedded in the slides with the full citation |
| Lifecycle stages (step 2) | [RDMkit — Data life cycle](https://rdmkit.elixir-europe.org/data_life_cycle) | **Linked** for participants to follow up |
| FAIR check of a published dataset | [F-UJI](https://www.f-uji.net) | **Linked**, for the "published, not FAIRly" case |
| How-to for deeper retrofit | [FAIR Cookbook](https://faircookbook.elixir-europe.org) recipes on identifiers, licences and metadata | **Linked** |
| Planning help (step 3) | [RDMkit — Data management plan](https://rdmkit.elixir-europe.org/data_management_plan), [Data Stewardship Wizard](https://ds-wizard.org), [RDMkit — Preserving](https://rdmkit.elixir-europe.org/preserving) | **Linked** |
| Triage, Minimum Viable FAIR and the priority worksheet (steps 4–6) | Written at the Contentathon (Allyson Lister, Nick Owen and contributors) | **Declared gap.** We have not found an existing open resource that targets late-stage data. If you know one, tell us and we'll link it instead. |
| "Before you start" questions (step 3) | Written at the Contentathon (Allyson Lister, Nick Owen and contributors) | **Declared gap**, adapted from standard DMP prompts |

## What to adapt locally

Fill these in before you run the session. If you have set up your [institution profile](../../branding/), the highlighted lines fill in automatically here, on the live slides and in both downloads.

- **Preferred repository**: <span class="repo-slot" data-profile-repo>[ your institution's preferred repository ]</span>
- **DMP advice and checking**: <span class="repo-slot" data-profile-help="dmp">[ DMP advice, usually the library ]</span>
- **Formats and conversion**: <span class="repo-slot" data-profile-help="it">[ IT or research computing ]</span>
- **Consent, ethics, legal and export control**: <span class="repo-slot" data-profile-help="ethics">[ ethics or legal office ]</span>
- **Licences**: <span class="repo-slot" data-profile-help="licensing">[ library scholarly communications ]</span>
- **Research data support**: <span class="repo-slot" data-profile-team>[ set up your institution profile ]</span>
- **Retention policy for legacy data**: [ link to your records-retention policy ]
- **Where project DMPs are kept** (for example DMPonline or the research office), so you can find a project's plan before the session: [ link ]
- **How your institution mints identifiers for legacy data**, if it does: [ process or contact ]
- **Optional:** swap the imaging cartoons for ones closer to your audience's discipline, keeping a full attribution line.

## What goes wrong

**Someone is embarrassed about how messy their data is.** Go back to the reassurance from step 1: this is normal, and the target is a realistic minimum, not perfection. Share a horror story of your own first.

**A dataset is genuinely orphaned: no metadata, nobody to contact.** Say honestly that it may not be worth keeping. That is a legitimate outcome of triage, not a failure. Point them to the retention policy.

**The room has all three use cases.** Steps 1–5 apply to everyone. For the worksheet, group people by use case or let them work individually on their own dataset.

**You run out of time before the worksheet.** Don't drop it; it's where people apply the session to their own data. Run the persistent-ID case as a whole-group discussion instead.

**"None of this matters, nobody will reuse my data."** Don't argue in the abstract. The most likely re-user is their future self. Ask whether they've ever struggled to reuse their own old data. Funder and journal policies increasingly require FAIR data whatever the expected reuse.

**Someone asks about a specific FAIR principle.** Use the mapping below as a lookup rather than presenting it.

## FAIR mapping

<details markdown="1">
<summary><strong>For the facilitator:</strong> how this session covers the FAIR principles, and the minimum for each when time is short. Use as a lookup; don't present it.</summary>

| Principle | In plain language | Minimum when you can't do it fully | Who can help |
|---|---|---|---|
| **F1** persistent identifier | Make your data permanently findable, in case you or someone else needs it again. | Required. Deposit in a generalist or institutional repository for a DOI. If the institutional repository can't mint one, also deposit somewhere that can (e.g. Zenodo). | <span class="repo-slot" data-profile-repo>[ your repository team ]</span> |
| **F2** rich metadata | Describe your data so people looking for datasets like it can find it. | Keywords in the title and record; choose the topic or data type in the repository. | <span class="repo-slot" data-profile-repo>[ your repository team ]</span> |
| **F3** metadata names the data | Connect your metadata to your data so people can find both. | Required. Link metadata and data to each other. | <span class="repo-slot" data-profile-repo>[ your repository team ]</span> |
| **F4** searchable | Let people search for your data. | Required. If the data must sit somewhere unsearchable, add a metadata-only record in a searchable repository that points to it. | <span class="repo-slot" data-profile-repo>[ your repository team ]</span> |
| **A1.1** open protocol | Make sure people can see, and potentially reuse, your data. | If a proprietary format is unavoidable, share it anyway and make the metadata, or a sample, open. | <span class="repo-slot" data-profile-help="it">[ IT or research computing ]</span> |
| **A1.2** access control | If your data needs to be restricted, protect it. | Protect the data where law or ethics require it. If you can't, don't share it. | <span class="repo-slot" data-profile-help="ethics">[ ethics or legal office ]</span> |
| **A2** metadata outlives data | Make sure people know what you shared, even if they can't access it now. | Keep at least a minimal open description of what the dataset contained. | <span class="repo-slot" data-profile-repo>[ your repository team ]</span> |
| **I1** formal language | *Not yet defined by the module leads.* | *Not yet defined by the module leads.* | <span class="repo-slot" data-profile-team>[ research data support ]</span> |
| **I2** FAIR vocabularies | Make your data easier to understand, compare and combine with other datasets. | Define the terms you used, so others can map them to standard terms later. Batch-map with [Zooma](https://www.ebi.ac.uk/spot/zooma/) if time allows. | <span class="repo-slot" data-profile-team>[ research data support ]</span> |
| **I3** qualified references | Make sure people can find the related material they need to understand or use your data. | If you share several items, or they relate to existing resources, link them. | <span class="repo-slot" data-profile-team>[ research data support ]</span> |
| **R1.1** licence | Tell people when and how they may reuse your data. | Required. Choose one and name it. | <span class="repo-slot" data-profile-help="licensing">[ library scholarly communications ]</span> |
| **R1.2** provenance | Make your data understandable, including by your future self: how you made it and what it means. | The bare minimum: technique, sample type, how it was processed. If even that is unrecoverable, consider not sharing. | <span class="repo-slot" data-profile-team>[ research data support ]</span> |
| **R1.3** community standards | Make your data easier to understand and compatible with other datasets. | Define your terms. A full standard is rarely realistic late in a project; fill only the basic fields. | <span class="repo-slot" data-profile-team>[ research data support ]</span> |

**Use-case notes and links:**

- **F1.** Got five minutes? A generalist or institutional repository gives you a DOI. Got longer? A domain repository adds subject-specific metadata. Check which identifier schemes are globally unique, persistent and resolvable in [FAIRsharing](https://fairsharing.org/advancedsearch?operator=_and&fields=(operator=_and%26globallyUnique=true%26persistent=true%26resolvable=true)), and see the [FAIR Cookbook identifiers recipe](https://faircookbook.elixir-europe.org/content/recipes/findability/identifiers.html). *Legacy:* if enough is known, the institution can mint an identifier for the metadata. If the data is already FAIR elsewhere, the legacy copy may not need keeping.
- **F2.** *Unpublished:* work back from the paper to the raw data, with the PI involved. *Published, not FAIRly:* start from the raw data; if you can't describe it, stop there. *Legacy:* if the PI is around, work back from the end; if not, describe the raw data and build a file inventory.
- **F4.** Short on time: any quality repository is indexed by search engines. More time: package the data as an [RO-Crate](https://www.researchobject.org/ro-crate/) with a content description such as ISA-Tab.
- **A1.2.** Check what consent is in place and whether re-consent is possible. For personal data, see the ICO's [guidance on data protection impact assessments](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/) and [RDMkit on data protection](https://rdmkit.elixir-europe.org/data_protection).
- **A2.** *Legacy:* if data is deleted, record why, and keep the metadata.
- **I3.** Check that every source cited has a persistent identifier. Related links can be harvested from [OLS](https://www.ebi.ac.uk/ols4/) or [OpenAlex](https://openalex.org).
- **R1.1.** Plain-English licence summaries: [tl;drLegal](https://www.tldrlegal.com). Guidance: OpenAIRE's [How do I license my research data?](https://www.openaire.eu/how-do-i-license-my-research-data). Collaborators, industry partners and consent forms may limit which licences you can use.
- **R1.2.** *Published, not FAIRly:* the methods section often holds enough provenance. *Legacy:* contact the producer, or look for related theses, lab books or a lab technician who remembers.
- **R1.3.** Support one to three standards across the institution rather than many; [ARC](https://arc-rdm.org) and [BIDS](https://bids.neuroimaging.io) are examples some institutions use. Keep structural metadata (e.g. RO-Crate) separate from content.
- **Legacy, generally:** harvest embedded metadata with [ExifTool](https://exiftool.org) to build a file inventory. If an AI tool helps summarise it, validate the output and record its use as provenance.
- **All cases:** FAIR does not mean open. A closed dataset can still be FAIR.

</details>

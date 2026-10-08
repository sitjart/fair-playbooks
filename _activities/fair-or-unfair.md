---
title: "FAIR or Unfair?"
summary: "Show a data-sharing scenario, the whole room votes FAIR or Unfair, then you reveal why. Makes an abstract idea concrete in 90 seconds a card — and the 'obvious' answers are where the good arguments start."
barrier: "\"FAIR is abstract\" — I can't picture what it means"
audience_label: "Students, researchers, mixed — great for a lecture hall"
group_size: "Whole room (any size)"
time: "10–15 min"
prep: "Print or project the cards. Optional: a live poll (Slido/Menti) for the vote."
materials: "Scenario cards (below), a way to vote (hands, or a live poll)"
source: "Original to this playbook — the format is a common 'FAIR or not?' engagement pattern; scenarios written fresh."
licence: "CC-BY 4.0 — add your own scenarios"
playbook: [communicate-advocate]
tags: [activity, game, voting, auditorium, printable]
---

## How to run it (10–15 min)

1. **Set up (1 min).** *"I'll show you a data-sharing situation. You vote: is it FAIR, or unfair? Then we find out."* Voting is hands up, or a live poll if you have one.
2. **Play the cards (~90 sec each).** Read a scenario → **vote** → **reveal** the verdict and the one-line *why*. Keep it snappy.
3. **Mine the arguments.** The best moments are the split votes — ask a "FAIR" voter and an "Unfair" voter to say why *before* you reveal. That disagreement *is* the learning.
4. **Land it (1 min).** *"None of that was abstract — it's the difference between data someone can actually reuse and data that quietly dies on a hard drive."*

## Debrief questions

- Which one surprised you most?
- What's the pattern behind the "unfair" ones? (Usually: no persistent link, no licence, no metadata, or gate-kept.)
- Which mistake do you recognise from your own field?

## Facilitator tip

Put the **debatable** cards in the middle — the Trusted Research Environment, the DOI-with-no-metadata, the no-licence dataset. Those split the room and produce the real conversation. The clear-cut ones are just to warm up the voting.

## Make it yours

Add two or three scenarios from **your own** discipline or institution — a repository your researchers actually use, a real "available on request" horror story. Local scenarios land hardest.

<div class="print-sheet">
<div class="sheet-kicker">Scenario cards — project or print &amp; hold up</div>
<h3>FAIR or Unfair? 🗳️</h3>
<style>
  .vote-deck { display:grid; grid-template-columns:1fr 1fr; gap:0.7rem; }
  .vote-card { border:1.5px solid var(--border-strong); border-radius:10px; padding:0.8rem 0.9rem; }
  .vote-card b { display:block; font:600 0.72rem/1 var(--font-mono); color:var(--coral); margin-bottom:0.35rem; }
  .vote-card p { margin:0; font-size:0.92rem; }
</style>
<div class="vote-deck">
  <div class="vote-card"><b>Card 1</b><p>"I shared my data — I email the Excel file to anyone who asks."</p></div>
  <div class="vote-card"><b>Card 2</b><p>Deposited in a domain repository (e.g. ENA) with an accession number, standard metadata, openly downloadable.</p></div>
  <div class="vote-card"><b>Card 3</b><p>It's on Zenodo with a DOI — but it's a ZIP file with no description and no README.</p></div>
  <div class="vote-card"><b>Card 4</b><p>Sensitive health data in a Trusted Research Environment: the metadata is public and searchable; access is by application.</p></div>
  <div class="vote-card"><b>Card 5</b><p>A beautifully documented dataset — but no licence is stated anywhere.</p></div>
  <div class="vote-card"><b>Card 6</b><p>"Data available from the authors on request", mentioned in the paper's methods.</p></div>
  <div class="vote-card"><b>Card 7</b><p>A CSV with a README data dictionary, in the institutional repository with a persistent handle.</p></div>
  <div class="vote-card"><b>Card 8</b><p>Analysis code on GitHub with a README, an open licence, and a tagged Zenodo release (DOI).</p></div>
</div>
</div>

<div class="print-sheet">
<div class="sheet-kicker">Facilitator answer key — keep to yourself</div>
<h3>Verdicts &amp; the why</h3>
<ol>
<li><strong>UNFAIR.</strong> No persistent link, not findable, gate-kept, proprietary format. "I shared it" ≠ FAIR. <em>[F, A]</em></li>
<li><strong>FAIR.</strong> Persistent ID, community-standard metadata, indexed and openly retrievable. The good example. <em>[F, A, I, R]</em></li>
<li><strong>Not really.</strong> Findable (it has a DOI) — but no metadata, no README, no licence, so nobody can understand or reuse it. <strong>A DOI alone isn't FAIR.</strong> <em>[I, R]</em></li>
<li><strong>FAIR.</strong> The key one: <strong>FAIR ≠ Open.</strong> Metadata is findable and accessible; controlled access via application is completely fine (A1.2). <em>[F, A]</em></li>
<li><strong>UNFAIR.</strong> Without a licence, legally <em>no one</em> can reuse it — the R fails on a single missing line. <em>[R]</em></li>
<li><strong>UNFAIR.</strong> Not findable, not accessible — author-gatekept (they leave, they don't reply), no persistent identifier. <em>[F, A]</em></li>
<li><strong>FAIR.</strong> Open format, documented with a data dictionary, has a persistent handle. Simple, and it works. <em>[F, A, I, R]</em></li>
<li><strong>FAIR — yes, for code too.</strong> Persistent ID, open licence, documented, archived. FAIR isn't only for data. <em>[F, A, I, R]</em></li>
</ol>
</div>

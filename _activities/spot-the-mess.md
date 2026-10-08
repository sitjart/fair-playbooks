---
title: "Spot the Mess"
summary: "Hand people a deliberately awful dataset and let them find everything wrong with it. Makes 'not FAIR' vivid, concrete and a bit funny in ten minutes — no theory required."
barrier: "\"It's dry admin, not 'real' research\""
audience_label: "Students, PhDs, researchers — any size"
group_size: "Small groups of 2–5"
time: "15–20 min"
prep: "Print the handout (1 per group). Facilitator keeps the answer key."
materials: "Printed dataset handout, pens; answer key on your screen"
source: "In the spirit of the classic 'messy spreadsheet' exercises from Data Carpentry and EMBL-EBI / EuroBioimaging FAIR training. This dataset is original to this playbook."
source_url: "https://datacarpentry.org/spreadsheet-ecology-lesson/"
licence: "CC-BY 4.0 — swap the dataset for one from your own field"
playbook: [communicate-advocate]
tags: [activity, game, spreadsheet, hands-on, printable]
---

## How to run it (15–20 min)

1. **Set it up (2 min).** Give each small group the printed dataset. Frame it: *"A colleague sent you this dataset to reuse. Find everything wrong with it — anything that would slow you (or a computer) down."* No FAIR jargon yet.
2. **Hunt (7 min).** Groups mark up the sheet — circle, annotate, argue. The more the merrier.
3. **Share back (5 min).** Go round the room; each group names **one problem the others haven't said yet**. Tally on the board — you'll be surprised how long the list gets.
4. **Land it (3 min).** Ask: *which of these would stop a **machine** finding or using the data? Which would stop a **human**?* Map a handful onto **F‑A‑I‑R**. Then the one line that does the work: *"This is what 'not FAIR' actually looks like — it was never abstract."*

## Debrief questions

- If this landed in your inbox in two years, could you actually use it?
- What's the **single** change with the biggest payoff? (Usually: consistent naming + one date format + a README.)
- How much of this is *effort* vs just *habit*?

## Facilitator tip

Don't chase the complete list — the "aha" is that a boring little spreadsheet hides *this many* problems. If a group stalls, seed one (*"look at the dates…"*) and let them run.

## Make it yours

Swap in a messy example from **your own** domain or institution — imaging, sequencing metadata, survey exports. The messier and more real, the better the laughs and the sharper the point.

<div class="print-sheet">
<div class="sheet-kicker">Participant handout — print 1 per group</div>
<h3>Spot the mess 🔍</h3>
<p class="print-hint">A colleague sent you this dataset to reuse. Mark up <strong>everything</strong> that's wrong with it — anything that would slow down you, a collaborator, or a computer.</p>
<table>
<thead>
<tr><th>Sample</th><th>Organism</th><th>Tissue</th><th>Treatment</th><th>conc (mg/ml)</th><th>Date collected</th><th>Reading 1</th><th>notes</th></tr>
</thead>
<tbody>
<tr><td>S1</td><td>mouse</td><td>liver</td><td>control</td><td>0.5</td><td>03/04/2024</td><td>12.3</td><td>ok</td></tr>
<tr><td>sample_2</td><td>Mus musculus</td><td>Liver</td><td>Drug A 10uM</td><td>0.5</td><td>4 March 2024</td><td>11.8</td><td></td></tr>
<tr><td>3</td><td>mouse</td><td>liver + spleen</td><td>drugA</td><td>n/a</td><td>2024-03-05</td><td>high</td><td>recheck?? <em>(marked in red)</em></td></tr>
<tr><td>S4</td><td>human</td><td>Liver</td><td>DrugA_10</td><td>0,5</td><td>05/04/24</td><td>9.1</td><td>see comment</td></tr>
</tbody>
</table>
<p class="print-hint">Your list: ________________________________________________________________________________________</p>
</div>

<div class="print-sheet">
<div class="sheet-kicker">Facilitator answer key — keep to yourself</div>
<h3>What's wrong (and the fix)</h3>
<ol>
<li><strong>Sample IDs have no scheme</strong> — <code>S1 / sample_2 / 3 / S4</code>. Can't reliably reference or link them. → one consistent ID format. <em>[Findable, Reusable]</em></li>
<li><strong>Organism mixes common &amp; scientific names</strong> (mouse vs <em>Mus musculus</em>) — and a <em>human</em> row appears. Is this one dataset or several? → one column, scientific names, controlled vocabulary. <em>[Interoperable, Reusable]</em></li>
<li><strong>Tissue: inconsistent case</strong> (liver/Liver) and <strong>non-atomic</strong> ("liver + spleen" = two values in one cell). → one value per cell; consistent terms. <em>[Interoperable]</em></li>
<li><strong>Treatment written 4+ ways</strong> for what's likely the same thing: <code>control</code>, <code>Drug A 10uM</code>, <code>drugA</code>, <code>DrugA_10</code> — dose sometimes buried in the label. → controlled vocabulary + a separate dose column. <em>[Interoperable, Reusable]</em></li>
<li><strong>conc: "0,5" uses a comma decimal</strong> (breaks in most software); <strong>"n/a" vs blank</strong> — no defined missing-value convention. → dot decimals; one agreed code for missing (e.g. <code>NA</code>). <em>[Interoperable, Reusable]</em></li>
<li><strong>Dates in four formats</strong> (<code>03/04/2024</code>, <code>4 March 2024</code>, <code>2024-03-05</code>, <code>05/04/24</code>) — and DD/MM vs MM/DD is ambiguous. → ISO 8601 (<code>YYYY-MM-DD</code>). <em>[Interoperable]</em></li>
<li><strong>"Reading 1" mixes numbers with text</strong> ("high") and gives <strong>no units</strong>. → numeric only; put units in the header/metadata. <em>[Interoperable, Reusable]</em></li>
<li><strong>Flag hidden in a cell colour</strong> ("recheck??" in red) — invisible to machines, inaccessible, lost if printed in black &amp; white. → a real <code>QC</code> column with values, not colour. <em>[Accessible, Interoperable]</em></li>
<li><strong>Header quirks</strong> — spaces &amp; brackets (<code>conc (mg/ml)</code>, <code>Reading 1</code>), inconsistent case. → simple, consistent, code-friendly headers. <em>[Interoperable]</em></li>
<li><strong>No README / data dictionary</strong> — what <em>is</em> "Reading 1"? what does "ok" mean? → a short README tab defining every column. <em>[Reusable]</em></li>
</ol>
<p class="print-hint"><strong>Biggest payoff first:</strong> consistent IDs · one date format (ISO 8601) · a README. Three habits, most of the win.</p>
</div>

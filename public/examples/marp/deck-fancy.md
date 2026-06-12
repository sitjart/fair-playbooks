---
marp: true
paginate: true
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;600&family=JetBrains+Mono:wght@500&display=swap');

:root {
  --bg:#faf7f2; --ink:#0f0f12; --muted:#6b6b73; --coral:#ff6b4a; --lime:#d4ff4a;
  --p1:#1a5490; --p1b:#2f7fbf; --amber:#e9a23b; --slate:#3c4a5a;
}
section {
  font-family:'Inter',sans-serif; background:var(--bg); color:var(--ink);
  background-image: radial-gradient(circle at 1px 1px, rgba(15,15,18,0.05) 1px, transparent 0);
  background-size: 24px 24px;
  padding: 70px 80px;
}
h1, h2 { font-family:'Space Grotesk',sans-serif; letter-spacing:-0.03em; line-height:1.04; }
h1 { font-size: 2.0em; }
h2 { font-size: 1.45em; }
section.lead h1 { font-size: 2.6em; }
.eyebrow { font-family:'JetBrains Mono',monospace; font-size:0.5em; text-transform:uppercase; letter-spacing:0.18em; color:var(--coral); font-weight:600; }
.period { color: var(--coral); }
em { color: var(--coral); font-style: italic; }
code { font-family:'JetBrains Mono',monospace; background:#f3ede3; padding:0.05em 0.35em; border-radius:6px; }
section::after { font-family:'JetBrains Mono',monospace; color:var(--muted); }

.fair { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:18px; }
.fair > div { border-radius:18px; padding:18px 22px; color:#fff; box-shadow:8px 8px 0 var(--ink); }
.fair .L { font-family:'Space Grotesk'; font-weight:700; font-size:2em; line-height:1; }
.fair .W { font-family:'Space Grotesk'; font-weight:600; font-size:0.9em; }
.fair .D { font-size:0.6em; opacity:0.92; margin-top:4px; }
.f { background:var(--p1); } .a { background:var(--p1b); } .i { background:var(--amber); } .r { background:var(--slate); }

.pills span { display:inline-block; background:var(--ink); color:var(--lime); font-family:'Space Grotesk'; font-weight:700; font-size:0.6em; padding:6px 16px; border-radius:999px; margin:0 6px 6px 0; }
.repo { background:var(--lime); padding:4px 12px; border-radius:8px; font-weight:700; box-shadow:3px 3px 0 var(--ink); }
</style>

<!-- _class: lead -->

<div class="eyebrow">▦ workshop · module 02 · RNA-seq</div>

# FAIRification of<br>RNA-seq data<span class="period">.</span>

A hands-on workshop for RDM professionals · 45–60 min

`E-MTAB-9224` · Alivernini et al. 2020

<!-- Speaker note: Welcome. A real published dataset, FAIR as actual files and metadata decisions. -->

---

## The <em>FAIR</em> principles

<div class="fair">
<div class="f"><div class="L">F</div><div class="W">Findable</div><div class="D">Persistent IDs · rich, indexed metadata</div></div>
<div class="a"><div class="L">A</div><div class="W">Accessible</div><div class="D">Open, standard protocols (HTTPS)</div></div>
<div class="i"><div class="L">I</div><div class="W">Interoperable</div><div class="D">Shared vocabularies / ontologies</div></div>
<div class="r"><div class="L">R</div><div class="W">Reusable</div><div class="D">Licence · provenance · standards</div></div>
</div>

<!-- Speaker note: A repository gives F and A; the I and R are the researcher's job. -->

---

<div class="eyebrow">finding the data</div>

## F1 &amp; F4 — <em>findable</em>

<div class="pills"><span>F1 persistent ID</span><span>F4 indexed</span><span>A1 open access</span></div>

- The accession `E-MTAB-9224` is globally unique &amp; permanent
- Indexed in ArrayExpress · downloadable over HTTPS, no login

**Where your researchers deposit:** <span class="repo">[ your preferred repository ]</span>

<!-- Speaker note: F1 identifier, F4 discoverability. Point to YOUR repository. -->

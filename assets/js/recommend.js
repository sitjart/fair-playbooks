/* ═══════════════════════════════════════════════════════════════════════
   Recommender scorer — ported verbatim from src/pages/recommend.astro.
   moduleData comes from the #module-data JSON emitted by Liquid; each entry
   already carries its baseurl-aware `url`, so links work under any baseurl.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var moduleData = [];
  try {
    var el = document.getElementById('module-data');
    moduleData = JSON.parse(el.textContent);
  } catch (e) { moduleData = []; }

  // Tag axes and per-axis scoring weights.
  // Scenario weighted highest because it's the strongest signal of relevance.
  const AXIS_WEIGHTS = { audience: 2, scenario: 3, dataType: 1, intent: 2 };

  const answers = { audience: [], scenario: [], dataType: [], intent: [], time: [] };
  let currentStep = 1;
  const totalSteps = 5;

  function show(step) {
    document.querySelectorAll('.step').forEach((s) => { s.hidden = parseInt(s.dataset.step) !== step; });
    document.querySelector('.results').hidden = true;
    document.querySelectorAll('#progress-dots span').forEach((dot) => {
      const dotStep = parseInt(dot.dataset.step);
      dot.removeAttribute('data-active');
      dot.removeAttribute('data-done');
      if (dotStep < step) dot.setAttribute('data-done', 'true');
      else if (dotStep === step) dot.setAttribute('data-active', 'true');
    });
  }

  function advance() {
    if (currentStep < totalSteps) { currentStep++; show(currentStep); }
    else { computeAndShowResults(); }
  }

  document.querySelectorAll('.step').forEach((step) => {
    const axis = step.dataset.axis;
    const choicesEl = step.querySelector('.choices');
    const isMulti = choicesEl && choicesEl.dataset.multi !== undefined;
    const maxChoices = isMulti ? parseInt(choicesEl.dataset.multi) : 1;
    const nextBtn = step.querySelector('.next');

    step.querySelectorAll('.choice').forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        if (isMulti) {
          const selected = step.querySelectorAll('.choice[data-selected="true"]');
          if (btn.dataset.selected === 'true') { btn.removeAttribute('data-selected'); }
          else if (selected.length < maxChoices) { btn.setAttribute('data-selected', 'true'); }
          const currentSelected = Array.from(step.querySelectorAll('.choice[data-selected="true"]')).map((b) => b.dataset.value);
          answers[axis] = currentSelected;
          if (nextBtn) nextBtn.disabled = currentSelected.length === 0;
        } else {
          step.querySelectorAll('.choice').forEach((b) => b.removeAttribute('data-selected'));
          btn.setAttribute('data-selected', 'true');
          answers[axis] = [value];
          setTimeout(advance, 200);
        }
      });
    });

    if (nextBtn) nextBtn.addEventListener('click', advance);
  });

  function scoreModule(mod) {
    let score = 0;
    const matched = { audience: [], scenario: [], dataType: [], intent: [] };
    for (const axis of Object.keys(AXIS_WEIGHTS)) {
      const userTags = answers[axis] || [];
      const modTags = mod[axis] || [];
      const overlap = userTags.filter((t) => modTags.includes(t));
      matched[axis] = overlap;
      score += overlap.length * AXIS_WEIGHTS[axis];
    }
    return { score, matched };
  }

  function matchBand(score) {
    if (score >= 7) return { label: 'Strong match', tone: 'strong' };
    if (score >= 4) return { label: 'Good fit', tone: 'good' };
    if (score >= 1) return { label: 'Worth considering', tone: 'soft' };
    return { label: 'Weak match', tone: 'weak' };
  }

  const AXIS_PHRASES = {
    audience: { lead: "who you're supporting", conjunction: 'matches' },
    scenario: { lead: 'the scenario', conjunction: 'fits' },
    dataType: { lead: 'the data type', conjunction: 'covers' },
    intent: { lead: 'the format you need', conjunction: 'delivers' },
  };
  const VALUE_LABELS = {
    'phd-student': 'PhD student', 'postdoc': 'postdoc', 'pi': 'PI', 'decision-maker': 'decision-maker',
    'rdm-peer': 'fellow RDM professional', 'researcher': 'researcher',
    'starting-project': 'starting a project', 'mid-project': 'mid-project', 'ending-project': 'project ending',
    'legacy-data': 'legacy data', 'advocating-internally': 'internal advocacy', 'training-team': 'team training',
    'sequencing': 'sequencing', 'proteomics': 'proteomics', 'imaging': 'imaging',
    'spreadsheet': 'spreadsheet / bespoke data', 'code': 'code', 'mixed': 'mixed', 'n-a': 'general',
    'how-to': 'how-to teaching', 'motivate': 'motivation', 'signpost': 'signposting',
    'self-assess': 'self-assessment', 'hands-on-exercise': 'hands-on exercise',
  };

  function reasoningSentence(matched) {
    const parts = [];
    for (const axis of ['scenario', 'audience', 'intent', 'dataType']) {
      const overlap = matched[axis];
      if (overlap && overlap.length > 0) {
        const labels = overlap.map((v) => VALUE_LABELS[v] || v).join(' + ');
        parts.push('<strong>' + AXIS_PHRASES[axis].conjunction + '</strong> ' + AXIS_PHRASES[axis].lead + ' (' + labels + ')');
      }
    }
    if (parts.length === 0) return 'Indirect match based on related tags.';
    return parts.join(' · ');
  }

  function renderPrimary(item, preferShort) {
    const mod = item.mod, score = item.score, matched = item.matched;
    const band = matchBand(score);
    const hasShort = mod.short !== undefined && mod.short !== null;
    const useShort = preferShort && hasShort;
    const minutes = useShort ? mod.short : mod.long;
    const versionLabel = useShort ? 'Quick recap' : (preferShort && !hasShort ? 'Full module (no recap available)' : 'Full module');
    const pbBadges = mod.playbook.map((p) => '<span class="pb-badge" data-pb="' + p + '">' + (p === 'fairification' ? 'P1 · FAIRification' : 'P2 · Advocate') + '</span>').join(' ');
    return '' +
      '<div class="primary-card">' +
      '<div class="primary-tag">★ Your top match · ' + band.label + '</div>' +
      '<div class="primary-meta">' + pbBadges + '</div>' +
      '<h3 class="primary-title">' + mod.title + '</h3>' +
      '<p class="primary-summary">' + mod.summary + '</p>' +
      '<div class="primary-reason">' + reasoningSentence(matched) + '</div>' +
      '<div class="primary-foot">' +
      '<span class="primary-time">' + versionLabel + ' · ' + minutes + ' min</span>' +
      '<a href="' + mod.url + '#' + (useShort ? 'short' : 'long') + '" class="btn btn-primary">Open this module →</a>' +
      '</div></div>';
  }

  function renderSecondary(item, preferShort) {
    const mod = item.mod, score = item.score, matched = item.matched;
    const band = matchBand(score);
    const hasShort = mod.short !== undefined && mod.short !== null;
    const useShort = preferShort && hasShort;
    const minutes = useShort ? mod.short : mod.long;
    const versionLabel = useShort ? 'recap' : 'full';
    const pb = mod.playbook[0] === 'fairification' ? 'P1' : 'P2';
    return '' +
      '<a class="secondary-card" href="' + mod.url + '#' + (useShort ? 'short' : 'long') + '">' +
      '<div class="secondary-band" data-tone="' + band.tone + '">' + band.label + '</div>' +
      '<div class="secondary-body">' +
      '<div class="secondary-meta"><span class="pb-badge" data-pb="' + mod.playbook[0] + '">' + pb + '</span> <span class="secondary-time">' + versionLabel + ' ' + minutes + 'm</span></div>' +
      '<strong class="secondary-title">' + mod.title + '</strong>' +
      '<div class="secondary-reason">' + reasoningSentence(matched) + '</div>' +
      '</div>' +
      '<div class="secondary-arrow">→</div>' +
      '</a>';
  }

  function computeAndShowResults() {
    document.querySelectorAll('.step').forEach((s) => (s.hidden = true));
    document.querySelectorAll('#progress-dots span').forEach((dot) => {
      dot.removeAttribute('data-active');
      dot.setAttribute('data-done', 'true');
    });

    const scored = moduleData.map((mod) => Object.assign({ mod: mod }, scoreModule(mod)));
    scored.sort((a, b) => b.score - a.score);
    const matched = scored.filter((s) => s.score > 0);
    const preferShort = answers.time[0] === 'quick';

    const primary = document.getElementById('primary-result');
    const secondary = document.getElementById('secondary-results');
    const secondaryHeader = document.getElementById('secondary-header');
    const summary = document.getElementById('results-summary');
    primary.innerHTML = '';
    secondary.innerHTML = '';

    if (matched.length === 0) {
      document.querySelector('.results-title').textContent = 'Nothing matched strongly';
      primary.innerHTML = '<div class="primary-card"><div class="primary-reason">Your answers didn\'t strongly overlap with any module. Try changing the scenario or audience, or browse <a href="' + (window.__BASE__ || '/') + 'modules/">all modules</a>.</div></div>';
      summary.innerHTML = '';
      document.querySelector('.results').hidden = false;
      return;
    }

    document.querySelector('.results-title').textContent = 'Start here';
    primary.innerHTML = renderPrimary(matched[0], preferShort);

    const supporting = matched.slice(1, 5);
    if (supporting.length > 0) {
      secondaryHeader.hidden = false;
      secondary.innerHTML = supporting.map((s) => renderSecondary(s, preferShort)).join('');
    } else {
      secondaryHeader.hidden = true;
    }

    const p1 = matched.filter((s) => s.mod.playbook.includes('fairification')).length;
    const p2 = matched.filter((s) => s.mod.playbook.includes('communicate-advocate')).length;
    summary.innerHTML = '<span class="results-summary-mono">// ' + matched.length + ' match' + (matched.length === 1 ? '' : 'es') + ' · P1 FAIRification: ' + p1 + ' · P2 Advocate: ' + p2 + '</span>';
    document.querySelector('.results').hidden = false;
  }

  document.querySelector('.restart').addEventListener('click', () => {
    Object.keys(answers).forEach((k) => (answers[k] = []));
    document.querySelectorAll('.choice[data-selected="true"]').forEach((b) => b.removeAttribute('data-selected'));
    document.querySelectorAll('.next').forEach((b) => (b.disabled = true));
    currentStep = 1;
    show(1);
  });

  show(1);
})();

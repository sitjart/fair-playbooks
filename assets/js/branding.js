/* Institution profile set-up form — ported from src/pages/branding.astro.
   Reads/writes window.FairProfile (defined in profile.js). */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('brand-form');
  var status = document.getElementById('brand-status');
  var logoStatus = document.getElementById('brand-logo-status');
  var logoData = null;

  var logoInput = document.getElementById('brand-logo-file');
  if (logoInput) logoInput.addEventListener('change', function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      logoData = r.result;
      logoStatus.textContent = '✓ Logo loaded (' + Math.round(f.size / 1024) + ' KB) — Save to apply it across the site.';
      logoStatus.hidden = false;
    };
    r.readAsDataURL(f);
  });

  function fillForm(p) {
    if (!p) p = {};
    ['name', 'shortName', 'contactEmail', 'contactTeam', 'policiesUrl'].forEach(function (k) {
      var el = form.elements[k];
      if (el) el.value = p[k] || '';
    });
    document.querySelectorAll('.help-row').forEach(function (row) {
      var cat = row.getAttribute('data-cat');
      var entry = (p.help && p.help[cat]) || {};
      var c = row.querySelector('[data-field="contact"]');
      var u = row.querySelector('[data-field="url"]');
      if (c) c.value = entry.contact || '';
      if (u) u.value = entry.url || '';
    });
    var b = p.brand || {};
    if (form.elements['brandPrimary']) form.elements['brandPrimary'].value = b.primary || '';
    if (form.elements['brandAccent']) form.elements['brandAccent'].value = b.accent || '';
    logoData = b.logo || null;
    if (logoStatus) {
      logoStatus.hidden = !b.logo;
      if (b.logo) logoStatus.textContent = '✓ Custom logo set for this institution.';
    }
  }

  function readForm() {
    var p = {
      name: form.elements['name'].value.trim(),
      shortName: form.elements['shortName'].value.trim(),
      contactEmail: form.elements['contactEmail'].value.trim(),
      contactTeam: form.elements['contactTeam'].value.trim(),
      policiesUrl: form.elements['policiesUrl'].value.trim(),
      help: {}
    };
    if (!p.shortName) p.shortName = p.name;
    document.querySelectorAll('.help-row').forEach(function (row) {
      var cat = row.getAttribute('data-cat');
      var contact = row.querySelector('[data-field="contact"]').value.trim();
      var url = row.querySelector('[data-field="url"]').value.trim();
      if (contact || url) p.help[cat] = { contact: contact, url: url };
    });
    var primary = form.elements['brandPrimary'].value.trim();
    var accent = form.elements['brandAccent'].value.trim();
    if (primary || accent || logoData) p.brand = { primary: primary, accent: accent, logo: logoData || '' };
    return p;
  }

  function flash(msg) { status.textContent = msg; status.hidden = false; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var p = readForm();
    if (!p.name) { flash('Add at least an institution name.'); return; }
    window.FairProfile.set(p);
    flash('✓ Saved. Every activity now shows ' + p.name + '. Open a module to see the local-help boxes filled in.');
  });

  document.getElementById('brand-clear').addEventListener('click', function () {
    window.FairProfile.clear();
    fillForm(null);
    flash('Cleared. You\'re back to the canonical ELIXIR-UK kit.');
  });

  document.getElementById('brand-demo').addEventListener('click', function () {
    var demo = {
      name: 'University of Wessex',
      shortName: 'Wessex',
      contactEmail: 'researchdata@wessex.ac.uk',
      contactTeam: 'Wessex Research Data Service',
      policiesUrl: 'https://wessex.ac.uk/research-data-policy',
      help: {
        repository: { contact: 'Wessex Data Repository (DSpace) — library data team', url: 'https://data.wessex.ac.uk' },
        dmp: { contact: 'Research Office — DMP clinic, Tuesdays 2pm', url: 'https://wessex.ac.uk/dmp' },
        ethics: { contact: 'Faculty Research Ethics Committee', url: 'https://wessex.ac.uk/ethics' },
        licensing: { contact: 'Library scholarly communications team', url: '' },
        it: { contact: 'Research Computing — large-data transfer & conversion', url: 'https://wessex.ac.uk/research-computing' },
        training: { contact: 'Wessex Carpentries chapter — monthly RDM workshops', url: '' }
      },
      brand: { primary: '#1f6feb', accent: '#e9a23b', logo: '' }
    };
    fillForm(demo);
    window.FairProfile.set(demo);
    flash('✓ Loaded a demo institution. Browse to any module — the local-help boxes now say "Wessex". (Clear when done.)');
  });

  document.getElementById('brand-export').addEventListener('click', function () {
    var p = window.FairProfile.get() || readForm();
    var blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (p.shortName || 'institution') + '-fair-profile.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('brand-import').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var p = JSON.parse(reader.result);
        fillForm(p);
        window.FairProfile.set(p);
        flash('✓ Imported ' + (p.name || 'profile') + '. Applied across the kit.');
      } catch (err) { flash('That file was not a valid profile.'); }
    };
    reader.readAsText(file);
  });

  fillForm(window.FairProfile.get());
});

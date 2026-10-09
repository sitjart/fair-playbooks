/* ═══════════════════════════════════════════════════════════════════════
   Runtime institutional profile — lifted verbatim from the Astro BaseLayout.
   Framework-agnostic. Reads/writes localStorage key `fair:profile`, exposes
   window.FairProfile, live-recolours via CSS variables, swaps the header logo,
   and hydrates institutional-help / repo / team slots on every page.
   Expects window.__BASE__ to be set (baseurl-aware) before this runs.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var KEY = 'fair:profile';
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  window.FairProfile = {
    get: read,
    set: function (p) {
      localStorage.setItem(KEY, JSON.stringify(p));
      document.dispatchEvent(new CustomEvent('fair:profile-change', { detail: p }));
    },
    clear: function () {
      localStorage.removeItem(KEY);
      document.dispatchEvent(new CustomEvent('fair:profile-change', { detail: null }));
    }
  };
})();

(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
  }

  var BASE = window.__BASE__ || '/';

  // ── "Viewing as" indicator bar ──
  function renderIndicator() {
    var el = document.getElementById('profile-indicator');
    if (!el) return;
    var p = window.FairProfile.get();
    if (p && p.name) {
      el.dataset.active = 'true';
      el.innerHTML =
        '<span>Viewing as <strong>' + esc(p.name) + '</strong> — local details filled from your institution profile.</span> ' +
        '<a href="' + BASE + 'branding/">edit</a> &middot; <button type="button" id="profile-clear">view canonical</button>';
      var c = document.getElementById('profile-clear');
      if (c) c.addEventListener('click', function () { window.FairProfile.clear(); });
    } else {
      el.dataset.active = 'false';
      el.innerHTML =
        "You're viewing the <strong>canonical ELIXIR-UK kit</strong>. " +
        '<a href="' + BASE + 'branding/">Set up your institution &rarr;</a> ' +
        '<span class="indicator-sub">fills local details everywhere — no fork</span>';
    }
    el.hidden = false;
  }

  // ── Hydrate institutional-help slots from the profile ──
  function hydrateHelp() {
    var p = window.FairProfile.get();
    document.querySelectorAll('.inst-help').forEach(function (slot) {
      var cat = slot.getAttribute('data-help-category');
      var entry = p && p.help && p.help[cat];
      var flag = slot.querySelector('[data-flag]');
      var contact = slot.querySelector('.inst-help-contact');
      var urlWrap = slot.querySelector('.inst-help-url');
      if (entry && (entry.contact || entry.url)) {
        if (contact && entry.contact) contact.textContent = entry.contact;
        if (urlWrap) {
          urlWrap.innerHTML = entry.url
            ? ' &middot; <a href="' + esc(entry.url) + '">' + esc(entry.url) + '</a>'
            : '';
        }
        if (flag) {
          flag.textContent = '✓ ' + (p.shortName || p.name);
          flag.setAttribute('data-filled', 'true');
        }
      } else if (flag) {
        flag.textContent = 'placeholder';
        flag.removeAttribute('data-filled');
      }
    });
  }

  // ── Fill inline repository / team / help slots from the profile ──
  // Shared by pages, present mode and the generated downloads (decks.js),
  // so every output fills local details the same way. `root` may be a
  // DOMParser document; `p` defaults to the saved profile.
  function fillSlots(root, p) {
    if (p === undefined) p = window.FairProfile.get();
    var repo = p && p.help && p.help.repository && p.help.repository.contact;
    root.querySelectorAll('[data-profile-repo]').forEach(function (s) {
      if (repo) s.textContent = repo;
      else if (p && p.name) s.textContent = 'ask ' + (p.contactTeam || p.name);
      else s.textContent = "[ your institution's preferred repository ]";
    });
    root.querySelectorAll('[data-profile-team]').forEach(function (s) {
      if (p && p.name) s.textContent = (p.contactTeam || p.name) + (p.contactEmail ? ' · ' + p.contactEmail : '');
      else s.textContent = '[ set up your institution profile ]';
    });
    // <span data-profile-help="dmp">[ placeholder ]</span> — categories as on /branding/
    root.querySelectorAll('[data-profile-help]').forEach(function (s) {
      if (s.getAttribute('data-placeholder') === null) s.setAttribute('data-placeholder', s.textContent);
      var entry = p && p.help && p.help[s.getAttribute('data-profile-help')];
      s.textContent = (entry && entry.contact) ? entry.contact : s.getAttribute('data-placeholder');
    });
  }
  window.FairProfile.fillSlots = fillSlots;
  function hydrateSlots() { fillSlots(document); }

  // ── Accessible brand colours ──
  // The profile holds a DARK colour (brand.primary: backgrounds behind white
  // text, headings, body text) and an ACCENT (brand.accent: fills and
  // highlights only). From these we derive every other pairing so nothing
  // falls below WCAG AA (4.5:1 for text).
  var CANON = { dark: '#023452', accent: '#f47d20' };
  function rgb(h) {
    h = String(h || '').replace('#', '').trim();
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return [0, 2, 4].map(function (i) { return parseInt(h.slice(i, i + 2), 16); });
  }
  function hexOf(c) { return '#' + c.map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join(''); }
  function lum(h) {
    return rgb(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); })
      .reduce(function (a, v, i) { return a + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  // Mix towards black (or white) in small steps until the pair reaches `min`
  function shiftUntil(h, against, min, towards) {
    var c = rgb(h), t = towards === 'white' ? 255 : 0;
    for (var i = 0; i <= 20 && contrast(hexOf(c), against) < min; i++) c = c.map(function (v) { return v + (t - v) * 0.1; });
    return hexOf(c);
  }
  function colours(p) {
    var b = (p && p.brand) || {};
    var darkIn = rgb(b.primary) ? b.primary : CANON.dark;
    var accent = rgb(b.accent) ? b.accent : CANON.accent;
    // Dark must read as text on the palest tinted panel too (#e6f2f7), not just white
    var dark = shiftUntil(darkIn, '#e6f2f7', 4.5, 'black');
    var onAccent = contrast(dark, accent) >= 4.5 ? dark : (contrast('#ffffff', accent) >= 4.5 ? '#ffffff'
      : (contrast('#000000', accent) > contrast('#ffffff', accent) ? '#000000' : '#ffffff'));
    return {
      dark: dark,
      darkAdjusted: dark.toLowerCase() !== hexOf(rgb(darkIn)).toLowerCase(),
      accent: accent,
      accentText: shiftUntil(accent, '#f1f4f6', 4.5, 'black'),   // accent used as text on light backgrounds
      onAccent: onAccent,                                          // text placed on an accent fill
      inkOnLime: shiftUntil(dark, '#9bcbdd', 4.5, 'black'),
      limeOnDark: contrast('#9bcbdd', dark) >= 4.5 ? '#9bcbdd' : '#ffffff',
      accentOnDark: (function () { var t = contrast(accent, dark) >= 4.5 ? accent : shiftUntil(accent, dark, 4.5, 'white'); return contrast(t, dark) >= 4.5 ? t : '#ffffff'; })(),
      contrast: contrast
    };
  }
  window.FairProfile.colours = colours;

  // ── Apply the institution's brand (colours + logo) live, no fork ──
  function applyBrand() {
    var p = window.FairProfile.get();
    var b = (p && p.brand) || {};
    var root = document.documentElement;
    var vars = ['--text', '--coral', '--p2', '--coral-text', '--on-coral', '--coral-on-dark', '--ink-on-lime', '--lime-on-dark'];
    if (b.primary || b.accent) {
      var c = colours(p);
      root.style.setProperty('--text', c.dark);
      root.style.setProperty('--coral', c.accent);
      root.style.setProperty('--p2', c.accent);
      root.style.setProperty('--coral-text', c.accentText);
      root.style.setProperty('--on-coral', c.onAccent);
      root.style.setProperty('--coral-on-dark', c.accentOnDark);
      root.style.setProperty('--ink-on-lime', c.inkOnLime);
      root.style.setProperty('--lime-on-dark', c.limeOnDark);
    } else {
      vars.forEach(function (v) { root.style.removeProperty(v); });
    }
    var logo = document.getElementById('header-logo-img');
    if (logo) logo.src = b.logo || (BASE + 'assets/branding/elixir-uk-logo-negative.svg');
  }

  function refresh() { renderIndicator(); hydrateHelp(); hydrateSlots(); applyBrand(); }
  document.addEventListener('fair:profile-change', refresh);
  if (document.readyState !== 'loading') refresh();
  else document.addEventListener('DOMContentLoaded', refresh);
})();

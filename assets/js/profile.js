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

  // ── Apply the institution's brand (colours + logo) live, no fork ──
  function applyBrand() {
    var p = window.FairProfile.get();
    var b = (p && p.brand) || {};
    var root = document.documentElement;
    if (b.primary) { root.style.setProperty('--coral', b.primary); root.style.setProperty('--p2', b.primary); }
    else { root.style.removeProperty('--coral'); root.style.removeProperty('--p2'); }
    if (b.accent) { root.style.setProperty('--lime', b.accent); root.style.setProperty('--p1', b.accent); }
    else { root.style.removeProperty('--lime'); root.style.removeProperty('--p1'); }
    var logo = document.getElementById('header-logo-img');
    if (logo) logo.src = b.logo || (BASE + 'assets/branding/elixir-uk-logo-negative.svg');
  }

  function refresh() { renderIndicator(); hydrateHelp(); hydrateSlots(); applyBrand(); }
  document.addEventListener('fair:profile-change', refresh);
  if (document.readyState !== 'loading') refresh();
  else document.addEventListener('DOMContentLoaded', refresh);
})();

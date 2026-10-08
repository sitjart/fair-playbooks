/* ═══════════════════════════════════════════════════════════════════════
   decks.js — ONE SOURCE → branded, editable downloads, built in the browser.

   Reads the module data (#fair-module, see _includes/module-data.html) and the
   LIVE institution profile at the moment of the click, so every download
   carries the current branding, logo and local contacts. No build step, no
   stale files.

     <button data-download="pptx">  → editable slides (PowerPoint / Google Slides)
     <button data-download="docx">  → editable facilitator guide (Word / Google Docs)

   Libraries (assets/vendor/) load on the first click.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var BASE = window.__BASE__ || '/';
  var DEFAULT = { primary: '#023452', accent: '#F47D20', second: '#037EAB', ink: '0F2233', muted: '4A6577' };
  // Bundled with the site (MIT licences alongside) so downloads work on poor
  // workshop wifi and don't depend on a CDN.
  var LIBS = {
    pptx: BASE + 'assets/vendor/pptxgenjs-3.12.0.bundle.js',
    docx: BASE + 'assets/vendor/docx-8.5.0.umd.js'
  };
  var loading = {};

  function loadScript(src) {
    if (!loading[src]) {
      loading[src] = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = src; s.onload = resolve;
        s.onerror = function () {
          delete loading[src]; s.remove(); // let the next click retry
          reject(new Error('Could not load ' + src));
        };
        document.head.appendChild(s);
      });
    }
    return loading[src];
  }

  function moduleData() {
    var el = document.getElementById('fair-module');
    return el ? JSON.parse(el.textContent) : null;
  }
  function profile() { return window.FairProfile ? window.FairProfile.get() : null; }
  function hex(c) {
    c = String(c || '').replace('#', '').trim();
    if (c.length === 3) c = c.split('').map(function (x) { return x + x; }).join('');
    return /^[0-9a-f]{6}$/i.test(c) ? c.toUpperCase() : null;
  }
  function brand(p) {
    var b = (p && p.brand) || {};
    return {
      primary: hex(b.primary) || hex(DEFAULT.primary),
      accent: hex(b.accent) || hex(DEFAULT.accent),
      logo: b.logo || ''
    };
  }
  function orgName(p) { return (p && p.name) || 'ELIXIR-UK RDM Club'; }
  function pad2(n) { return ('0' + (n || 0)).slice(-2); }
  function assetUrl(src) { return /^(https?:|data:)/.test(src) ? src : BASE + String(src).replace(/^\//, ''); }

  // Parse an HTML fragment and fill institution slots, using the same logic as the page.
  function parse(html, p) {
    var doc = new DOMParser().parseFromString('<div id="root">' + (html || '') + '</div>', 'text/html');
    if (window.FairProfile && window.FairProfile.fillSlots) window.FairProfile.fillSlots(doc, p);
    return doc.getElementById('root');
  }
  function asText(html, p) { return parse(html, p).textContent.replace(/\s+/g, ' ').trim(); }

  // "8–18" → 10
  function minutesOf(m) {
    var n = String(m || '').match(/\d+/g);
    return n && n.length >= 2 ? (+n[1] - +n[0]) : (n ? +n[0] : null);
  }
  function totalMinutes(session) {
    var last = session[session.length - 1];
    var n = last && String(last.minutes || '').match(/\d+/g);
    return n ? n[n.length - 1] : '';
  }

  // What the ROOM sees for a step: its `slide:` block, falling back to
  // title / points / exercise for modules that don't have one yet.
  function slideOf(st) {
    var sl = st.slide || {};
    var lines = (sl.lines && sl.lines.length) ? sl.lines.slice() : (st.points || []).slice();
    var prompt = sl.prompt || st.exercise || '';
    // A hands-up poll becomes numbered options plus its question as the prompt
    if (sl.poll && sl.poll.options) {
      lines = lines.concat(sl.poll.options.map(function (o, i) { return (i + 1) + '.  ' + o; }));
      prompt = 'Hands up: ' + sl.poll.question;
    }
    return {
      headline: sl.headline || st.title,
      lines: lines,
      prompt: prompt,
      poll: !!sl.poll,
      image: sl.image || st.image || null
    };
  }

  // Rasterise any same-origin image (SVG included) to PNG so Office renders it everywhere.
  function toPng(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth || 1200, h = img.naturalHeight || 800;
        var scale = Math.min(1, 2000 / w);
        var c = document.createElement('canvas');
        c.width = Math.round(w * scale); c.height = Math.round(h * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        try { resolve({ data: c.toDataURL('image/png'), w: c.width, h: c.height }); }
        catch (e) { resolve(null); }
      };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }
  function fileName(d, p, suffix) {
    var who = p && (p.shortName || p.name);
    return (who ? who.replace(/[^\w-]+/g, '-') + '-' : '') + d.id + suffix;
  }

  // ─────────────────────────────── PowerPoint ───────────────────────────────
  function buildPptx(d, p) {
    var b = brand(p), org = orgName(p);
    var session = d.session || [];
    var pptx = new window.PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE'; // 13.33 × 7.5 in
    pptx.title = asText(d.title);
    pptx.company = org;
    var FONT = 'Lato';
    var footerText = org + ' · Module ' + pad2(d.number) + ' · ' + asText(d.title);
    function footer(s, color) {
      s.addText(footerText, { x: 0.5, y: 7.0, w: 12.3, h: 0.3, fontFace: FONT, fontSize: 10, color: color || DEFAULT.muted });
    }

    var logoSrc = b.logo || (BASE + 'assets/branding/elixir-uk-logo-negative.svg');
    function dots(s, onDark) {
      s.addShape(pptx.ShapeType.ellipse, { x: 10.6, y: -1.9, w: 4.4, h: 4.4, fill: { color: onDark ? hex(DEFAULT.second) : '9BCBDD', transparency: onDark ? 40 : 65 }, line: { type: 'none' } });
    }
    function smallDots(s) {
      s.addShape(pptx.ShapeType.ellipse, { x: 10.35, y: 1.55, w: 1.35, h: 1.35, fill: { color: b.accent }, line: { type: 'none' } });
      s.addShape(pptx.ShapeType.ellipse, { x: 11.95, y: 3.1, w: 0.42, h: 0.42, fill: { color: hex(DEFAULT.second) }, line: { type: 'none' } });
    }

    return toPng(logoSrc).then(function (logo) {
      // Title slide
      var s = pptx.addSlide();
      s.background = { color: b.primary };
      dots(s, true); smallDots(s);
      if (logo) s.addImage({ data: logo.data, x: 0.7, y: 0.7, h: 0.8, w: 0.8 * logo.w / logo.h });
      s.addText(asText(d.slideTitle || d.title), { x: 0.7, y: 2.4, w: 9.4, h: 2.4, fontFace: FONT, fontSize: 44, bold: true, color: 'FFFFFF', valign: 'top' });
      if (d.slideSubtitle) s.addText(asText(d.slideSubtitle), { x: 0.7, y: 4.9, w: 9, h: 1.4, fontFace: FONT, fontSize: 20, color: 'DDE3E7', valign: 'top' });
      footer(s, 'AEBCC6');

      // One slide per step (images load first so the order holds)
      return Promise.all(session.map(function (st) {
        var im = slideOf(st).image;
        return im ? toPng(assetUrl(im.src)) : Promise.resolve(null);
      }));
    }).then(function (images) {
      session.forEach(function (st, i) {
        var sl = slideOf(st), img = images[i];
        var s = pptx.addSlide();
        s.background = { color: 'FFFFFF' };
        dots(s, false); if (!img) smallDots(s);
        var textW = img ? 6.4 : 9.4;
        s.addText(asText(sl.headline, p), { x: 0.7, y: 0.6, w: textW, h: 1.9, fontFace: FONT, fontSize: 38, bold: true, color: b.primary, valign: 'bottom' });
        if (sl.lines.length) {
          s.addText(sl.lines.map(function (pt) {
            var t = asText(pt, p);
            return { text: t, options: /^\d+\.\s/.test(t) ? { breakLine: true } : { bullet: { indent: 22 }, breakLine: true } };
          }), { x: 0.7, y: 2.7, w: textW, h: sl.prompt ? 3.0 : 3.9, fontFace: FONT, fontSize: sl.lines.length > 4 ? 18 : 24,
            color: DEFAULT.ink, valign: 'top', paraSpaceAfter: 10 });
        }
        if (sl.prompt) {
          s.addText(asText(sl.prompt, p), { shape: pptx.ShapeType.roundRect, rectRadius: 0.35, x: 0.7, y: 5.95, w: textW, h: 0.7,
            fill: { color: b.primary }, line: { type: 'none' }, color: 'FFFFFF', fontFace: FONT, fontSize: 18, bold: true, valign: 'middle', margin: 12 });
        }
        if (img) {
          var boxX = 7.4, boxY = 1.0, boxW = 5.4, boxH = 5.2 - (sl.image.credit ? 0.45 : 0);
          var r = Math.min(boxW / img.w, boxH / img.h);
          var w = img.w * r, h = img.h * r;
          s.addImage({ data: img.data, x: boxX + (boxW - w) / 2, y: boxY, w: w, h: h });
          if (sl.image.credit) {
            s.addText(asText(sl.image.credit), { x: boxX, y: boxY + h + 0.05, w: boxW, h: 0.45, fontFace: FONT, fontSize: 9, color: DEFAULT.muted, valign: 'top' });
          }
        }
        footer(s);
        var notes = [];
        if (st.script) notes.push(asText(st.script, p));
        if (st.tip) notes.push('Tip: ' + asText(st.tip, p));
        if (notes.length) s.addNotes(notes.join('\n\n'));
      });

      // Credits — reused material keeps its attribution
      if (d.sources && d.sources.length) {
        var s = pptx.addSlide();
        s.background = { color: 'FFFFFF' };
        s.addText('Built from', { x: 0.5, y: 0.4, w: 12, h: 0.7, fontFace: FONT, fontSize: 28, bold: true, color: b.primary });
        s.addText(d.sources.map(function (src) {
          return { text: src.name + (src.note ? ' — ' + src.note : '') + (src.url ? '  ' + src.url : ''), options: { bullet: true, breakLine: true } };
        }), { x: 0.5, y: 1.3, w: 12.3, h: 5.4, fontFace: FONT, fontSize: 15, color: DEFAULT.ink, valign: 'top', paraSpaceAfter: 6 });
        footer(s);
      }
      return pptx.writeFile({ fileName: fileName(d, p, '.pptx') });
    });
  }

  // ─────────────────────────── Facilitator guide (.docx) ───────────────────────────
  function buildDocx(d, p) {
    var D = window.docx, b = brand(p), org = orgName(p);
    var session = d.session || [];
    var children = [];

    function heading(text, level) {
      return new D.Paragraph({
        heading: level,
        spacing: { before: 280, after: 120 },
        children: [new D.TextRun({ text: text, bold: true, color: b.primary })]
      });
    }
    function para(runs, opts) {
      return new D.Paragraph(Object.assign({ children: runs, spacing: { after: 120 } }, opts || {}));
    }
    function labelled(label, text) {
      return para([new D.TextRun({ text: label + ' ', bold: true, color: b.accent }), new D.TextRun({ text: text })]);
    }

    // Inline HTML → runs (bold / italic / code / links / line breaks)
    function runs(node, fmt) {
      fmt = fmt || {};
      var out = [];
      node.childNodes.forEach(function (n) {
        if (n.nodeType === 3) {
          var t = n.textContent.replace(/\s+/g, ' ');
          if (t) out.push(new D.TextRun({ text: t, bold: fmt.bold, italics: fmt.italics, font: fmt.code ? 'Courier New' : undefined }));
        } else if (n.nodeType === 1) {
          var tag = n.tagName;
          if (tag === 'BR') { out.push(new D.TextRun({ text: '', break: 1 })); return; }
          var f = Object.assign({}, fmt);
          if (tag === 'STRONG' || tag === 'B') f.bold = true;
          if (tag === 'EM' || tag === 'I') f.italics = true;
          if (tag === 'CODE') f.code = true;
          out = out.concat(runs(n, f));
          if (tag === 'A') {
            var href = n.getAttribute('href') || '';
            if (/^https?:/.test(href) && href !== n.textContent.trim()) out.push(new D.TextRun({ text: ' (' + href + ')', color: DEFAULT.muted }));
          }
        }
      });
      return out;
    }

    function cell(content, header) {
      var o = {
        children: [para(header ? [new D.TextRun({ text: content.textContent.trim(), bold: true, color: 'FFFFFF' })] : runs(content), { spacing: { after: 0 } })],
        margins: { top: 60, bottom: 60, left: 100, right: 100 }
      };
      if (header) o.shading = { fill: b.primary, type: D.ShadingType.CLEAR, color: 'auto' };
      return new D.TableCell(o);
    }
    function table(rows) {
      return new D.Table({
        width: { size: 100, type: D.WidthType.PERCENTAGE },
        rows: rows.map(function (r, i) {
          return new D.TableRow({ tableHeader: i === 0, children: r.cells.map(function (c) { return cell(c, r.header); }) });
        })
      });
    }

    // Block HTML → docx blocks
    function blocks(container) {
      var out = [];
      Array.prototype.forEach.call(container.children, function (el) {
        var tag = el.tagName;
        if (tag === 'H1' || tag === 'H2') out.push(heading(el.textContent.trim(), D.HeadingLevel.HEADING_1));
        else if (tag === 'H3' || tag === 'H4') out.push(heading(el.textContent.trim(), D.HeadingLevel.HEADING_2));
        else if (tag === 'P') out.push(para(runs(el)));
        else if (tag === 'UL' || tag === 'OL') {
          Array.prototype.forEach.call(el.children, function (li, i) {
            out.push(para((tag === 'OL' ? [new D.TextRun({ text: (i + 1) + '. ' })] : []).concat(runs(li)),
              tag === 'UL' ? { bullet: { level: 0 } } : { indent: { left: 360 } }));
          });
        } else if (tag === 'TABLE') {
          var rows = [];
          el.querySelectorAll('tr').forEach(function (tr) {
            rows.push({ header: !!tr.querySelector('th'), cells: Array.prototype.slice.call(tr.children) });
          });
          out.push(table(rows));
          out.push(para([]));
        } else if (tag === 'BLOCKQUOTE') {
          out.push(para(runs(el), { indent: { left: 480 } }));
        } else if (tag === 'DETAILS') {
          var sum = el.querySelector('summary');
          if (sum) out.push(para(runs(sum)));
          var rest = el.cloneNode(true);
          var rs = rest.querySelector('summary'); if (rs) rs.remove();
          out = out.concat(blocks(rest));
        } else if (tag === 'DIV' || tag === 'SECTION') {
          out = out.concat(blocks(el));
        }
      });
      return out;
    }

    var logoSrc = b.logo || (BASE + 'assets/branding/elixir-uk-logo.svg');
    return toPng(logoSrc).then(function (logo) {
      if (logo) {
        var bytes = Uint8Array.from(atob(logo.data.split(',')[1]), function (c) { return c.charCodeAt(0); });
        children.push(new D.Paragraph({ children: [new D.ImageRun({ data: bytes, transformation: { width: Math.round(48 * logo.w / logo.h), height: 48 } })] }));
      }
      children.push(para([new D.TextRun({ text: 'FACILITATOR GUIDE · MODULE ' + pad2(d.number), bold: true, color: b.accent })]));
      children.push(new D.Paragraph({ heading: D.HeadingLevel.TITLE, children: [new D.TextRun({ text: asText(d.title), bold: true, color: b.primary })] }));
      children.push(para([new D.TextRun({ text: asText(d.summary), italics: true })]));
      children.push(para([new D.TextRun({ text: 'Prepared for ' + org + '. Generated ' + new Date().toISOString().slice(0, 10) + ' from the live kit' + (d.url ? ' (' + location.origin + d.url + ')' : '') + '.', color: DEFAULT.muted })]));

      var body = parse(d.html, p);
      var slot = body.querySelector('.session-slot');
      var before = body, after = null;
      if (slot) {
        after = document.createElement('div');
        while (slot.nextSibling) after.appendChild(slot.nextSibling);
        slot.remove();
      }
      children = children.concat(blocks(before));

      if (session.length) {
        if (!slot) children.push(heading('The session plan', D.HeadingLevel.HEADING_1));
        var rows = [{ header: true, cells: ['Step', 'Full', 'Short', 'If you need to cut'].map(function (t) { var e = document.createElement('span'); e.textContent = t; return e; }) }];
        session.forEach(function (st, i) {
          var full = minutesOf(st.minutes);
          var short = st.short === undefined || st.short === null ? '' : (+st.short === 0 ? 'take-home' : st.short + ' min');
          rows.push({ header: false, cells: [(i + 1) + '. ' + asText(st.title), full ? full + ' min' : '', short, st.cut ? asText(st.cut, p) : ''].map(function (t) { var e = document.createElement('span'); e.textContent = t; return e; }) });
        });
        children.push(table(rows));
        children.push(heading('Running the session', D.HeadingLevel.HEADING_1));
        session.forEach(function (st, i) {
          var mins = minutesOf(st.minutes);
          children.push(heading((i + 1) + '. ' + asText(st.title) + (mins ? '  (' + mins + ' min)' : ''), D.HeadingLevel.HEADING_2));
          if (st.script) children.push(labelled('Say:', asText(st.script, p)));
          if (st.tip) children.push(labelled('Tip:', asText(st.tip, p)));
          var sl = slideOf(st);
          children.push(para([new D.TextRun({ text: 'On the slide: ', bold: true, color: b.accent }), new D.TextRun({ text: asText(sl.headline, p), bold: true })]));
          sl.lines.forEach(function (pt) { children.push(para(runs(parse(pt, p)), { bullet: { level: 0 } })); });
          if (sl.prompt) children.push(labelled('Prompt for the room:', asText(sl.prompt, p)));
          if (sl.image && sl.image.credit) children.push(labelled('Image:', asText(sl.image.credit)));
          if (st.principles && st.principles.length) children.push(labelled('FAIR principles:', st.principles.join(', ')));
        });
      }
      if (after) children = children.concat(blocks(after));

      if (d.sources && d.sources.length) {
        children.push(heading('Built from', D.HeadingLevel.HEADING_1));
        d.sources.forEach(function (src) {
          children.push(para([new D.TextRun({ text: src.name, bold: true }), new D.TextRun({ text: (src.note ? ' — ' + src.note : '') + (src.url ? ' (' + src.url + ')' : '') })], { bullet: { level: 0 } }));
        });
      }

      var doc = new D.Document({
        creator: org,
        title: asText(d.title) + ' — facilitator guide',
        styles: { default: { document: { run: { font: 'Lato', size: 22 } } } },
        sections: [{ children: children }]
      });
      return D.Packer.toBlob(doc);
    }).then(function (blob) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName(d, p, '-facilitator-guide.docx');
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    });
  }

  // ─────────────────────────────── Wiring ───────────────────────────────
  var BUILDERS = { pptx: buildPptx, docx: buildDocx };
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-download]');
    if (!btn) return;
    var kind = btn.getAttribute('data-download');
    var d = moduleData();
    if (!d || !BUILDERS[kind]) return;
    e.preventDefault();
    if (btn.getAttribute('aria-busy') === 'true') return;
    btn.setAttribute('aria-busy', 'true');
    var label = btn.querySelector('.pack-dl-label') || btn;
    var original = label.textContent;
    label.textContent = 'Building…';
    loadScript(LIBS[kind])
      .then(function () { return BUILDERS[kind](d, profile()); })
      .then(function () { label.textContent = original; })
      .catch(function (err) {
        console.error(err);
        label.textContent = 'Download failed — check your connection';
        setTimeout(function () { label.textContent = original; }, 4000);
      })
      .then(function () { btn.removeAttribute('aria-busy'); });
  });
})();

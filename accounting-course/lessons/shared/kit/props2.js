// props2.js — props, set pieces and icons for L8–L14. Loads after devices.js + books.js; extends window.KIT. See PROPS2.md.
// Same contract as cast.js / devices.js: build synchronously, then `method(tl, t, …)` adds tweens at ABSOLUTE time t and returns the rig.
// Every prop returns `{ g, body, enter, exit, pulse, … }`; `{hidden:true}` starts invisible. Deterministic (no Math.random / Date). Nothing idles.
(function () {
  const K = window.KIT; if (!K) return;
  const C = K.C, PI = Math.PI, O = "0 0";
  const { g, el, sh, paper, tex, ink, shadow, cutRect, cutEll, cutPoly, cutStroke, arc, pts2d } = K;

  // ---------------------------------------------------------------- helpers
  const hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const mix = (a, b, t) => { const A = hex(a), B = hex(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
  const shade = (c, t = 0.22) => mix(c, "#2b2233", t);
  const tint = (c, t = 0.25) => mix(c, "#ffffff", t);
  let UID = 0;
  const clip = (parent, d, attrs = {}) => {
    const id = "p2-clip-" + (UID++), cp = el("clipPath", { id }, parent);
    el("path", { d }, cp);
    return g(parent, { "clip-path": `url(#${id})`, ...attrs });
  };
  const rectD = (x, y, w, h) => pts2d([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
  const floor = (p, rx, ry = 12) => el("ellipse", { cx: 0, cy: 2, rx, ry, fill: "#3b2614", "fill-opacity": 0.2 }, p);
  // rig root: translate+scale wrapper -> body (enter/exit/pulse layer). `hold:{rig,side,rest}` builds INSIDE the person's hand anchor.
  function mk(parent, x, y, s, o = {}) {
    let host = parent;
    if (o.hold) { host = g(o.hold.rig.handAnchor(o.hold.side || "R"), {}); }
    const root = g(host, { transform: `translate(${x} ${y}) scale(${s})` + (o.rot ? ` rotate(${o.rot})` : "") });
    const body = g(root, {});
    if (o.hidden) hide(body);
    return { root, body, host };
  }
  function held(o, host) {   // keep the prop upright whatever the arm does (people only; Khata's arms carry it as-is)
    if (o.hold && o.hold.rig && K.holdProp && o.hold.rig.pose) K.holdProp(o.hold.rig, o.hold.side || "R", host, o.hold.rest || [20, 70]);
  }
  function life(rig, body, st = {}) {
    rig.body = body;
    rig.enter = (tl, t, oo = {}) => { if (!st.touched) { hide(body); st.touched = true; } K.dropIn(tl, body, t, oo); return rig; };
    rig.exit = (tl, t, oo = {}) => { st.touched = true; K.liftOff(tl, body, t, oo); return rig; };
    rig.pulse = rig.pulse || ((tl, t, k) => { K.pulseNode(tl, body, t, k); return rig; });
    return rig;
  }
  const T = (tl, target, vars, t, dur, o) => K.tw(tl, target, vars, t, dur, o);
  const TXT = (parent, x, y, t, o = {}) => { const e = K.text(parent, x, y, t, o); if (o.layer) e.setAttribute("data-layout-allow-overlap", "true"); return e; };   // layer:true = intentionally stacked text (flip sheets, swaps, covered labels)
  // reveal a group left->right through a clip rect (pencil writing / ink draw); returns the rect
  function wipe(parent, x, y, w, h) {
    const id = "p2-wipe-" + (UID++), cp = el("clipPath", { id }, parent);
    const r = el("rect", { x, y, width: w, height: h }, cp);
    return { rect: r, g: g(parent, { "clip-path": `url(#${id})` }), w, x };
  }
  const wipeOn = (tl, wp, t, dur) => { wp.rect.setAttribute("width", "0"); tl.to(wp.rect, { attr: { width: wp.w }, duration: dur, ease: K.stepEase(dur, "none", t) }, t); };
  // torn / crinkled horizontal edge points
  const torn = (x0, x1, y, seed, amp = 5, step = 14) => {
    const pts = [], n = Math.max(2, Math.round(Math.abs(x1 - x0) / step));
    for (let i = 0; i <= n; i++) pts.push([x0 + ((x1 - x0) * i) / n, y + sh(seed + i * 3.1) * amp]);
    return pts;
  };
  const strokeDraw = (path, tl, t, dur, ease = "power2.out") => {
    const L = path.getTotalLength ? path.getTotalLength() : 200;
    path.setAttribute("stroke-dasharray", L.toFixed(1)); path.setAttribute("stroke-dashoffset", L.toFixed(1));
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease }, t);
    return L;
  };
  const INK = C.ink, PENCIL = "#6d6a73";

  // ================================================================ 1. NAPKIN — torn slip with pencil lines (L9, L10)
  // origin = centre. opts: w(380) h(300) lines(array of strings or [text,value]) rot hidden
  function napkin(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = o.w || 380, H = o.h || 300, seed = o.seed || 11;
    const top = torn(-W / 2, W / 2, -H / 2, seed, 6), bot = torn(W / 2, -W / 2, H / 2, seed + 40, 6);
    const d = pts2d([...top, [W / 2 + sh(seed + 90) * 3, -H / 4], [W / 2, H / 4], ...bot, [-W / 2, H / 4], [-W / 2 + 3, -H / 4]]);
    tex(shadow(body, 2), d, "pat-paper");
    // soft embossed napkin pattern: a faint corner flower of four dots
    [[-W / 2 + 26, -H / 2 + 28], [W / 2 - 26, H / 2 - 28]].forEach(([fx, fy]) => { [[-7, 0], [7, 0], [0, -7], [0, 7]].forEach(([dx, dy]) => paper(body, cutEll(fx + dx, fy + dy, 4, 4, 0.3), "#e7dcc7")); });
    const list = o.lines || [null, null, null, null];
    const rowH = Math.min(58, (H - 80) / Math.max(list.length, 3)), y0 = -H / 2 + 58, rows = [];
    list.forEach((ln, i) => {
      const yy = y0 + i * rowH, row = g(body, {});
      ink(row, [[-W / 2 + 28, yy + rowH * 0.36], [W / 2 - 28, yy + rowH * 0.36 + sh(i + seed) * 1.5]], 2.2, PENCIL, { opacity: 0.35 });    // ruled pencil line (always there)
      const wp = wipe(row, -W / 2 + 20, yy - rowH * 0.55, W - 40, rowH);
      const txt = Array.isArray(ln) ? ln[0] : ln, val = Array.isArray(ln) ? ln[1] : undefined;
      const ts = Math.min(34, rowH * 0.62);
      if (txt) TXT(wp.g, -W / 2 + 34, yy, txt, { size: ts, font: "kalam", anchor: "start", color: "#46424d", weight: 700 });
      if (val !== undefined) TXT(wp.g, W / 2 - 34, yy, val, { size: ts, font: "kalam", anchor: "end", color: "#46424d", weight: 700 });
      else if (!txt) { ink(wp.g, [[-W / 2 + 34, yy + 2], [-W / 2 + 70, yy - 6], [-W / 2 + 100, yy + 4], [-W / 2 + 140, yy - 4], [-W / 2 + 170, yy + 2]], 3, "#46424d", { opacity: 0.8 }); }
      wp.rect.setAttribute("width", "0");
      rows.push({ g: row, wp, y: yy, h: rowH, w: W - 40 });
    });
    const strikes = [];
    const rig = {
      g: root, body, rows, W, H,
      // pencil writes line i (left → right), stepped
      write(tl, t, i, oo = {}) { const r = rows[i]; wipeOn(tl, r.wp, t, oo.dur ?? 0.7); return rig; },
      writeAll(tl, t, oo = {}) { rows.forEach((r, i) => rig.write(tl, t + i * (oo.gap ?? 0.5), i, oo)); return rig; },
      // pencil strike-through of line i
      strike(tl, t, i, oo = {}) {
        const r = rows[i], k = ink(body, [[-W / 2 + 24, r.y + 2], [W / 2 - 24, r.y - 3]], 4, oo.color || C.red); const w = wipe(body, -W / 2, r.y - 14, W, 28);
        w.g.appendChild(k); w.rect.setAttribute("width", "0"); tl.to(w.rect, { attr: { width: W }, duration: 0.3, ease: K.stepEase(0.3, "none", t) }, t); strikes.push(k); return rig;
      },
      // quick flutter-in from above (drop-and-place with a little tilt)
      slideIn(tl, t, oo = {}) { hide(body); tl.fromTo(body, { autoAlpha: 0, y: oo.from ?? -90, rotation: -5, svgOrigin: O }, { autoAlpha: 1, y: 0, rotation: 0, svgOrigin: O, duration: oo.dur ?? 0.5, ease: "power3.out", immediateRender: false }, t); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 2. CONFETTI — paper burst (L9, L10)
  // origin = burst centre. opts: n(30) spread(520) rise(340) fall(520) colors seed. `burst(tl,t,{dur})` — pieces fly out, tumble, fall, vanish. Smooth (30 fps). Hidden until the burst.
  function confetti(parent, x, y, s = 1, o = {}) {
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const n = o.n || 30, seed = o.seed || 5, spread = o.spread || 520, rise = o.rise || 340, fall = o.fall || 520;
    const cols = o.colors || [C.coral, C.saffron, C.sky, C.leaf, C.violet, C.gold, C.teal];
    const pcs = [];
    for (let i = 0; i < n; i++) {
      const pg = g(root, { opacity: 0 }), inner = g(pg, {});
      const w = 16 + (sh(seed + i * 7) + 1) * 11, h = 7 + (sh(seed + i * 5 + 2) + 1) * 8;
      paper(shadow(inner, 1), cutRect(-w / 2, -h / 2, w, h, 0.5, 20), cols[i % cols.length]);
      pcs.push({ pg, inner, vx: sh(seed + i * 13) * spread, up: rise * (0.45 + (sh(seed + i * 17 + 1) + 1) * 0.3), dn: fall * (0.8 + (sh(seed + i * 19 + 4) + 1) * 0.3), rot: 360 * (1 + (sh(seed + i * 23) + 1)) * (i % 2 ? 1 : -1), d: sh(seed + i * 29) * 0.06 });
    }
    const rig = {
      g: root, pieces: pcs,
      burst(tl, t, oo = {}) {
        const dur = oo.dur ?? 1.7, up = dur * 0.38;
        pcs.forEach((p) => {
          const t0 = t + p.d + 0.06;
          tl.fromTo(p.pg, { x: 0, y: 0, opacity: 0 }, { opacity: 1, duration: 0.01, immediateRender: false }, t0);
          tl.to(p.pg, { x: p.vx, duration: dur, ease: "power1.out" }, t0);
          tl.to(p.pg, { y: -p.up, duration: up, ease: "power2.out" }, t0);
          tl.to(p.pg, { y: p.dn - p.up, duration: dur - up, ease: "power2.in" }, t0 + up);
          tl.fromTo(p.inner, { rotation: 0, scaleY: 1, svgOrigin: O }, { rotation: p.rot, scaleY: 0.35, svgOrigin: O, duration: dur, ease: "none", immediateRender: false }, t0);
          tl.to(p.pg, { opacity: 0, duration: 0.3, ease: "power1.in" }, t0 + dur - 0.3);
        });
        return rig;
      },
    };
    return rig;
  }

  // ================================================================ 3. ENVELOPE — opens into a card (L10, L13)
  // origin = bottom centre. opts: label (text on the front) icon(mail) w(380) h(250) color(kraft cream) cardW cardH
  // enter/exit/pulse · drop(tl,t) falls in with a soft thud (envelope_drop) · open(tl,t) flap lifts, card slides up (card.area = content group at card centre, local) · close(tl,t)
  function envelope(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = o.w || 380, H = o.h || 250, col = o.color || C.cream, dark = shade(col, 0.16);
    floor(body, W * 0.55, 10);
    const mid = g(body, {});
    paper(shadow(mid, 2), cutRect(-W / 2, -H, W, H, 2, 22), dark);                       // back (inside)
    // flap in its OPEN pose (behind the card, pointing up) — hidden until the flap flips
    const openFlap = g(mid, { opacity: 0 });
    const ofl = g(openFlap, { transform: `translate(0 ${-H})` });
    const ofi = g(ofl, { transform: "scale(1 0)" });
    paper(ofi, cutPoly([[-W / 2, 0], [W / 2, 0], [0, -H * 0.5]], 1.4, 18), mix(col, "#e6d6b6", 0.5));
    // card (slides up out of the envelope)
    const cW = o.cardW || W - 50, cH = o.cardH || H - 40;
    const cardPos = g(mid, { transform: `translate(0 ${-H + 14 + cH / 2})` });
    const card = g(cardPos, { "data-layout-allow-overlap": "true" });
    tex(shadow(card, 1), cutRect(-cW / 2, -cH / 2, cW, cH, 1.6, 20), "pat-paper");
    paper(card, cutRect(-cW / 2 + 6, -cH / 2 + 6, cW - 12, 34, 1.2, 20), o.header || C.dr);
    const area = g(card, { transform: `translate(0 ${12})` });
    area.rect = { x: -cW / 2, y: -cH / 2 + 46, w: cW, h: cH - 52 };
    // front pocket (V fold)
    const front = shadow(g(mid, { "data-layout-allow-overlap": "true" }), 2);
    paper(front, cutPoly([[-W / 2, -H], [0, -H * 0.42], [W / 2, -H], [W / 2, 0], [-W / 2, 0]], 1.6, 20), col);
    paper(front, cutPoly([[-W / 2, 0], [-W / 2, -H], [-W * 0.08, -H * 0.5]], 1.2, 18), tint(col, 0.0), { opacity: 0.0 });
    ink(mid, [[-W / 2 + 4, -H + 4], [-W * 0.05, -H * 0.46]], 3, dark, { opacity: 0.55 });
    ink(mid, [[W / 2 - 4, -H + 4], [W * 0.05, -H * 0.46]], 3, dark, { opacity: 0.55 });
    ink(mid, [[-W / 2 + 4, -4], [-W * 0.08, -H * 0.5]], 3, dark, { opacity: 0.4 });
    ink(mid, [[W / 2 - 4, -4], [W * 0.08, -H * 0.5]], 3, dark, { opacity: 0.4 });
    if (o.label) TXT(mid, 0, -H * 0.22, o.label, { size: o.size || 46, weight: 800, layer: true });
    else K.icon(mid, o.icon || "mail", 0, -H * 0.24, 66, C.ink, 2.4);
    // closed flap (front, hinge at the top edge)
    const clFlap = g(mid, { transform: `translate(0 ${-H})` });
    const cfi = g(clFlap, {});
    const cf = shadow(cfi, 2);
    paper(cf, cutPoly([[-W / 2, 0], [W / 2, 0], [0, H * 0.58]], 1.4, 18), mix(col, "#ffffff", 0.0));
    ink(cfi, [[-W / 2 + 4, 3], [0, H * 0.56]], 3, dark, { opacity: 0.45 }); ink(cfi, [[W / 2 - 4, 3], [0, H * 0.56]], 3, dark, { opacity: 0.45 });
    paper(shadow(cfi, 1), cutEll(0, H * 0.5, 15, 15, 1), C.red);                           // wax seal
    let isOpen = false;
    const rig = {
      g: root, mid, card, area, W, H, cardW: cW, cardH: cH,
      // falls onto the counter from above and settles with one tiny squash
      drop(tl, t, oo = {}) {
        hide(body);
        tl.fromTo(body, { autoAlpha: 0, y: -(oo.from ?? 260), rotation: -4, svgOrigin: O }, { autoAlpha: 1, y: 0, rotation: 0, svgOrigin: O, duration: 0.28, ease: "power2.in", immediateRender: false }, t);
        tl.to(mid, { scaleY: 0.94, scaleX: 1.03, svgOrigin: "0 0", duration: 0.08, ease: "power1.out" }, t + 0.28);
        tl.to(mid, { scaleY: 1, scaleX: 1, svgOrigin: "0 0", duration: 0.16, ease: "power2.out" }, t + 0.36);
        return rig;
      },
      // flap flips up (scaleY via two halves), then the card slides up and settles
      open(tl, t, oo = {}) {
        const d = oo.dur ?? 0.55;
        tl.to(cfi, { scaleY: 0, svgOrigin: O, duration: d * 0.35, ease: K.stepEase(d * 0.35, "power1.in", t) }, t);
        tl.set(openFlap, { opacity: 1 }, t + d * 0.35); tl.set(clFlap, { opacity: 0 }, t + d * 0.35);
        tl.to(ofi, { scaleY: 1, svgOrigin: O, duration: d * 0.3, ease: K.stepEase(d * 0.3, "power1.out", t + d * 0.35) }, t + d * 0.35);
        tl.to(cardPos, { y: -H + 14 + cH / 2 - (oo.rise ?? H * 0.78), duration: d * 0.8, ease: K.stepEase(d * 0.8, "power2.out", t + d * 0.45) }, t + d * 0.45);
        isOpen = true; return rig;
      },
      close(tl, t, oo = {}) {
        const d = oo.dur ?? 0.4;
        tl.to(cardPos, { y: -H + 14 + cH / 2, duration: d * 0.6, ease: K.stepEase(d * 0.6, "power2.in", t) }, t);
        tl.to(ofi, { scaleY: 0, svgOrigin: O, duration: d * 0.2, ease: "none" }, t + d * 0.6);
        tl.set(openFlap, { opacity: 0 }, t + d * 0.8); tl.set(clFlap, { opacity: 1 }, t + d * 0.8);
        tl.to(cfi, { scaleY: 1, svgOrigin: O, duration: d * 0.2, ease: "none" }, t + d * 0.8);
        isOpen = false; return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 4. CALENDAR PAGE (L10, L13, L14) + DATE TILE
  // origin = centre. opts: month("April") day(5) w(300) h(330) hidden. `flip(tl,t,{month,day})` tears the top sheet up and away (fast
  // 2-step flip; page_flip sfx) to reveal the next one · `circle(tl,t,{color})` draws a ring round the date · `ghost` sheets stay behind.
  function calendarPage(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = o.w || 300, H = o.h || 330, hh = 78;
    paper(body, cutRect(-W / 2 + 6, -H / 2 + 8, W, H, 2, 24), "#d8cbb3");               // paper stack under the top sheet
    const stack = g(body, {});
    const sheetFor = (month, day, zInsertBefore) => {
      const sg = g(stack, { "data-layout-allow-overlap": "true" }); if (zInsertBefore) stack.insertBefore(sg, zInsertBefore);
      const pos = g(sg, { transform: `translate(0 ${-H / 2})` }), inner = g(pos, {});   // hinge = top edge
      const c = g(inner, { transform: `translate(0 ${H / 2})` });
      tex(shadow(c, 2), cutRect(-W / 2, -H / 2, W, H, 2, 24), "pat-paper");
      paper(c, cutRect(-W / 2, -H / 2, W, hh, 2, 24), C.red);
      [-W * 0.28, W * 0.28].forEach((rx) => paper(shadow(c, 1), cutEll(rx, -H / 2 + 12, 9, 9, 0.5), "#f4ead6"));   // punched rings
      TXT(c, 0, -H / 2 + hh / 2 + 6, month, { size: 50, weight: 800, color: "#fff4e2" , layer: true });
      const num = TXT(c, 0, 24, String(day), { size: Math.min(170, H * 0.5), weight: 800, color: INK , layer: true });
      return { g: sg, pos, inner, c, num, month, day };
    };
    const sheets = [sheetFor(o.month || "April", o.day ?? 5)];
    let cur = sheets[0], ring = null;
    const rig = {
      g: root, W, H, get cur() { return cur; },
      flip(tl, t, spec = {}) {
        const nx = sheetFor(spec.month ?? cur.month, spec.day ?? cur.day, cur.g); sheets.push(nx);
        const old = cur;
        tl.to(old.inner, { scaleY: 0.02, rotation: -4, svgOrigin: O, duration: 0.3, ease: K.stepEase(0.3, "power2.in", t) }, t);
        tl.set(old.g, { opacity: 0 }, t + 0.32);
        cur = nx; return rig;
      },
      // coral ring drawn round the big date
      circle(tl, t, oo = {}) {
        const r = ink(body, arc(0, 24, H * 0.27, -PI * 0.9, PI * 1.25, 28, H * 0.22), 7, oo.color || C.coral);
        r.setAttribute("opacity", "0"); tl.set(r, { opacity: 1 }, t);
        const w = wipe(body, -W / 2, -H / 2, W, H); w.g.appendChild(r); w.rect.setAttribute("width", "0");
        tl.to(w.rect, { attr: { width: W } , duration: 0.4, ease: K.stepEase(0.4, "none", t) }, t); ring = r; return rig;
      },
    };
    return life(rig, body);
  }
  // small date chip ("May 5"): saffron top band + big number. origin = centre. set(tl,t,"May","6") swaps with a stepped tick.
  function dateTile(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = o.w || 150, H = o.h || 150;
    body.setAttribute("data-layout-allow-overlap", "true");
    tex(shadow(body, 2), cutRect(-W / 2, -H / 2, W, H, 1.8, 22), "pat-paper");
    paper(body, cutRect(-W / 2, -H / 2, W, H * 0.34, 1.8, 22), o.color || C.coral);
    const mTxt = TXT(body, 0, -H / 2 + H * 0.17 + 2, o.month || "May", { size: H * 0.22, weight: 800, color: "#fff4e2" , layer: true });
    const dTxt = TXT(body, 0, H * 0.16, String(o.day ?? 5), { size: H * 0.46, weight: 800 , layer: true });
    const rig = {
      g: root, month: mTxt, day: dTxt,
      set(tl, t, month, day) { return rig._swap(tl, t, month, day); },
      _swap(tl, t, month, day) {
        const pair = (e, v, y, size) => { if (v === undefined) return e; const n = TXT(body, 0, y, String(v), { size, weight: 800, color: e.getAttribute("fill"), layer: true }); n.setAttribute("opacity", "0"); tl.set(e, { opacity: 0 }, t); tl.set(n, { opacity: 1 }, t); return n; };
        rig.month = pair(rig.month, month, -H / 2 + H * 0.17 + 2, H * 0.22); rig.day = pair(rig.day, day, H * 0.16, H * 0.46);
        K.pulseNode(tl, body, t, 1.06); return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 5. MONTH TILES STRIP (L10) — groups of 12 + year markers
  // origin = strip centre. opts: months(36) per(12) width(1700) gap(46, between groups) dashedLast(false → last group's marker is dashed "(4)") hidden
  // tiles[i] · markers[y] · reveal(tl,t,{from,to,per}) pops tiles in order · mark(tl,t,i,color) colours a tile · year(tl,t,y) pops a marker · light(tl,t,i)
  function monthTiles(parent, x, y, s = 1, o = {}) {
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const N = o.months || 36, per = o.per || 12, groups = Math.ceil(N / per), W = o.width || 1700, gg = o.gap ?? 46;
    const pitch = (W - (groups - 1) * gg) / (groups * per), tw = pitch - 6, th = Math.min(86, tw * 1.3);
    const tiles = [], markers = [];
    const names = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    for (let gi = 0; gi < groups; gi++) {
      const gx = -W / 2 + gi * (per * pitch + gg), cx = gx + (per * pitch) / 2 - 3;
      const mg = g(root, { opacity: o.markersShown === false ? 0 : 1 });
      const dashed = o.dashedLast && gi === groups - 1;
      ink(mg, [[gx, -th / 2 - 52], [gx + per * pitch - 6, -th / 2 - 52]], 3, dashed ? "#8a7f9a" : INK, { opacity: dashed ? 0.4 : 0.55 });
      const dg = g(mg, { transform: `translate(${cx} ${-th / 2 - 52})` });
      paper(shadow(dg, 1), cutEll(0, 0, 30, 30, 1.2), dashed ? C.cream : C.saffron, dashed ? { opacity: 0.9 } : {});
      if (dashed) { el("circle", { cx: 0, cy: 0, r: 27, fill: "none", stroke: "#8a7f9a", "stroke-width": 3, "stroke-dasharray": "7 6" }, dg); TXT(dg, 0, 2, "(" + (gi + 1) + ")", { size: 28, weight: 800, color: "#6b5f7a" }); }
      else TXT(dg, 0, 2, String(gi + 1), { size: 36, weight: 800 });
      markers.push(mg);
      for (let m = 0; m < per; m++) {
        const i = gi * per + m; if (i >= N) break;
        const tg = g(root, { transform: `translate(${gx + m * pitch + tw / 2} 0)`, opacity: o.hidden ? 0 : 1 });
        const inner = g(tg, {});
        tex(shadow(inner, 1), cutRect(-tw / 2, -th / 2, tw, th, 1.2, 16), "pat-paper");
        const fillG = g(inner, { opacity: 0 }); paper(fillG, cutRect(-tw / 2 + 3, -th / 2 + 3, tw - 6, th - 6, 0.8, 16), C.gold);
        if (tw >= 30) TXT(inner, 0, 2, names[m % 12], { size: Math.min(34, tw * 0.55), weight: 700, color: "#3d3447" });
        tiles.push({ g: tg, inner, fill: fillG, i });
      }
    }
    if (o.hidden) markers.forEach(hide);
    const rig = {
      g: root, tiles, markers, tw, th, pitch,
      reveal(tl, t, oo = {}) {
        const a = oo.from ?? 0, b = oo.to ?? tiles.length, gap = oo.per ?? 0.035;
        for (let i = a; i < b; i++) K.dropIn(tl, tiles[i].g, t + (i - a) * gap, { dur: 0.22, from: 1.12 });
        return rig;
      },
      year(tl, t, yi) { K.dropIn(tl, markers[yi], t, { dur: 0.3 }); return rig; },
      mark(tl, t, i, color) { const f = tiles[i].fill; if (color) f.firstChild.setAttribute("fill", color); tl.set(f, { opacity: 1 }, t); K.pulseNode(tl, tiles[i].inner, t, 1.18); return rig; },
      markRange(tl, t, a, b, oo = {}) { for (let i = a; i < b; i++) rig.mark(tl, t + (i - a) * (oo.per ?? 0.05), i, oo.color); return rig; },
    };
    return rig;
  }

  // ================================================================ 6. CLIPBOARD (L10 stock count)
  // origin = centre. opts: items(["Tea","Milk","Sugar"] or [text,qty]) w(300) h(400). tick(tl,t,i) draws an ink check · count(tl,t,i,qty) writes the qty
  function clipboard(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = o.w || 300, H = o.h || 400;
    paper(shadow(body, 2), cutRect(-W / 2, -H / 2, W, H, 2.4, 26), C.wood);
    tex(body, cutRect(-W / 2 + 20, -H / 2 + 44, W - 40, H - 70, 1.6, 22), "pat-paper");
    const clipG = shadow(body, 1);
    paper(clipG, cutRect(-62, -H / 2 - 10, 124, 52, 2, 16), grey());
    paper(clipG, cutEll(0, -H / 2 + 6, 20, 12, 0.8), "#6b6a72");
    function grey() { return "#a9a8b1"; }
    K.icon(body, "clipboard-list", W / 2 - 52, -H / 2 + 68, 40, C.teal, 2.4);
    const items = o.items || ["", "", ""], rowH = Math.min(78, (H - 190) / items.length), y0 = -H / 2 + 120, rows = [];
    items.forEach((it, i) => {
      const yy = y0 + i * rowH, txt = Array.isArray(it) ? it[0] : it, qty = Array.isArray(it) ? it[1] : undefined;
      ink(body, [[-W / 2 + 36, yy + rowH * 0.4], [W / 2 - 36, yy + rowH * 0.4]], 2.4, PENCIL, { opacity: 0.35 });
      paper(body, cutRect(-W / 2 + 36, yy - 14, 28, 28, 1, 10), "#efe6d3", { opacity: 0.9 });                // empty tick box
      if (txt) TXT(body, -W / 2 + 80, yy, txt, { size: 34, font: "kalam", anchor: "start", color: "#46424d" });
      const tickG = g(body, {}), wp = wipe(tickG, -W / 2 + 32, yy - 24, 40, 44);
      ink(wp.g, [[-W / 2 + 40, yy], [-W / 2 + 48, yy + 10], [-W / 2 + 62, yy - 12]], 6, INK);
      wp.rect.setAttribute("width", "0");
      const qg = g(body, {}), qw = wipe(qg, W / 2 - 112, yy - 24, 80, 44); qw.rect.setAttribute("width", "0");
      if (qty !== undefined) TXT(qw.g, W / 2 - 40, yy, String(qty), { size: 36, weight: 800, anchor: "end" });
      rows.push({ y: yy, wp, qw });
    });
    const rig = {
      g: root, rows,
      tick(tl, t, i) { wipeOn(tl, rows[i].wp, t, 0.2); return rig; },
      count(tl, t, i) { wipeOn(tl, rows[i].qw, t, 0.3); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 7. STOCK PACKETS (tea / milk / sugar) (L10)
  // K.packet(parent,x,y,s,{kind}) origin = bottom centre (≈ 110×150). K.packets(parent,x,y,s,{kinds:["tea","milk","sugar"], gap}) row; dropIn(tl,t,{step,from}) · fly(tl,t,i,dx,dy,{dur})
  const PK = { tea: [C.leafTea, "coffee", "#e9c88f"], milk: [C.sky, "milk", "#ffffff"], sugar: ["#f1ede4", null, "#b9b4ad"] };
  function packet(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const kind = o.kind || "tea", [col, ic, fg] = PK[kind] || PK.tea, W = 112, H = 150;
    floor(body, W * 0.5, 8);
    const pg = shadow(body, 1);
    const edgeT = [], edgeB = [];
    for (let i = 0; i <= 8; i++) { edgeT.push([-W / 2 + (W * i) / 8, -H + (i % 2 ? 6 : 0)]); edgeB.push([W / 2 - (W * i) / 8, (i % 2 ? -6 : 0)]); }
    paper(pg, pts2d([...edgeT, ...edgeB]), col);
    paper(body, cutRect(-W / 2 + 10, -H + 30, W - 20, 5, 0.5, 16), "#ffffff", { opacity: 0.35 });
    if (ic) K.icon(body, ic, 0, -H * 0.5, 54, kind === "milk" ? C.sky : fg, 2.4);
    else { [[-18, -H * 0.5 + 12], [14, -H * 0.5 + 16], [-4, -H * 0.5 - 14]].forEach(([cx, cy], i) => { paper(shadow(body, 1), cutRect(cx - 12, cy - 12, 24, 24, 0.6, 12), "#ffffff"); }); }
    return life({ g: root, body, W, H }, body);
  }
  function packets(parent, x, y, s = 1, o = {}) {
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const kinds = o.kinds || ["tea", "milk", "sugar"], gap = o.gap ?? 150, items = [];
    kinds.forEach((k, i) => items.push(packet(root, (i - (kinds.length - 1) / 2) * gap, 0, 1, { kind: k, hidden: true, rot: [-4, 3, -2][i % 3] })));
    const rig = {
      g: root, items,
      dropIn(tl, t, oo = {}) { items.forEach((p, i) => { tl.fromTo(p.body, { autoAlpha: 0, y: -(oo.from ?? 160), svgOrigin: O }, { autoAlpha: 1, y: 0, svgOrigin: O, duration: 0.28, ease: "power2.in", immediateRender: false }, t + i * (oo.step ?? 0.14)); }); return rig; },
      fly(tl, t, i, dx, dy, oo = {}) { tl.to(items[i].body, { x: dx, y: dy, rotation: oo.rot ?? 8, svgOrigin: O, duration: oo.dur ?? 0.5, ease: "power2.inOut" }, t); if (oo.hide !== false) tl.to(items[i].body, { autoAlpha: 0, duration: 0.12 }, t + (oo.dur ?? 0.5)); return rig; },
    };
    return rig;
  }

  // ================================================================ 8. PRICE TAG ON STRING (L10 cart) — "swing" is ONE damped swing, then still
  // origin = the hook (top of the string). opts: amount(36000) string(120) w(150) h(110) rot. swing(tl,t,{deg:10})
  function hangTag(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const L = o.string ?? 110, W = o.w || 150, H = o.h || 96;
    const sw = g(body, {});                                           // pivots at the hook (0,0)
    ink(sw, [[0, 0], [0, L]], 3.4, "#7a6b58");
    const tg = g(sw, { transform: `translate(0 ${L})` });
    paper(shadow(tg, 1), cutPoly([[0, 0], [-16, 16], [-W / 2, 16], [-W / 2, 16 + H], [W / 2, 16 + H], [W / 2, 16], [16, 16]], 1.4, 14), C.mustard);
    paper(tg, cutEll(0, 24, 5, 5, 0.3), "#fff4e2");
    if (o.amount !== undefined) TXT(tg, 0, 16 + H / 2 + 4, K.fmtINR ? K.fmtINR(o.amount) : "₹" + o.amount, { size: 36, weight: 800 });
    paper(shadow(body, 1), cutEll(0, 0, 8, 8, 0.4), "#6b6a72");
    const rig = {
      g: root, swing: null, tag: tg,
      swing(tl, t, oo = {}) {
        const a = oo.deg ?? 10, d = oo.dur ?? 1.1;
        [[a, 0.2], [-a * 0.6, 0.22], [a * 0.35, 0.22], [-a * 0.15, 0.22], [0, 0.24]].reduce((tt, [r, dd]) => { tl.to(sw, { rotation: r, svgOrigin: O, duration: dd * d / 1.1, ease: "sine.inOut" }, tt); return tt + dd * d / 1.1; }, t);
        return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 9. TISSUE + TISSUE BOX (L8)
  // K.tissue origin = centre (≈ 150×150): soft cream square, scribbled lines (Meera's note); flutter(tl,t0,t1) = stepped wind wobble, bounded to the span; blowTo(tl,t,dx,dy,{rot}) a gust carries it
  function tissue(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = o.w || 150, H = o.h || 150, wob = g(body, {});
    const pts = []; const n = 16;
    for (let i = 0; i < n; i++) { const a = (i / n) * PI * 2; const r = 1 + (i % 2 ? -0.045 : 0.03) + sh(i + 77) * 0.025; pts.push([Math.cos(a) * W * 0.5 * r * 1.05, Math.sin(a) * H * 0.5 * r * 1.05]); }
    paper(shadow(wob, 1), cutPoly([[-W / 2, -H / 2], [-W / 6, -H / 2 + 5], [W / 6, -H / 2 - 2], [W / 2, -H / 2], [W / 2 - 4, 0], [W / 2, H / 2], [W / 6, H / 2 - 4], [-W / 6, H / 2 + 3], [-W / 2, H / 2], [-W / 2 + 4, 0]], 2.2, 18), "#fbf3e4");
    paper(wob, cutPoly([[-W / 2 + 12, -H / 2 + 12], [W / 2 - 12, -H / 2 + 12], [W / 2 - 12, H / 2 - 12], [-W / 2 + 12, H / 2 - 12]], 2, 20), "#f2e8d3", { opacity: 0.55 });   // soft fold
    const scr = g(wob, {});
    if (o.text) TXT(scr, 0, 4, o.text, { size: o.size || 30, font: "kalam", color: "#46424d" });
    else [[-46, -28, 50], [-46, -2, 62], [-46, 24, 36]].forEach(([lx, ly, ln], i) => ink(scr, [[lx, ly], [lx + ln * 0.3, ly - 5], [lx + ln * 0.6, ly + 4], [lx + ln, ly - 2]], 3, "#6d6a73", { opacity: 0.8 }));
    const rig = {
      g: root, wob,
      flutter(tl, t0, t1, oo = {}) {
        const f = 15, i0 = Math.round(t0 * f), i1 = Math.round(t1 * f), amp = oo.amp ?? 9;
        for (let i = i0; i < i1; i++) tl.set(wob, { rotation: sh(401 + i * 7) * amp, skewX: sh(409 + i * 3) * 10, x: sh(433 + i * 5) * 5, y: sh(467 + i * 11) * 5, svgOrigin: O }, i / f);
        tl.set(wob, { rotation: 0, skewX: 0, x: 0, y: 0, svgOrigin: O }, i1 / f); return rig;
      },
      blowTo(tl, t, dx, dy, oo = {}) { tl.to(body, { x: dx, y: dy, rotation: oo.rot ?? 220, svgOrigin: O, duration: oo.dur ?? 1.0, ease: "power2.in" }, t); return rig; },
    };
    return life(rig, body);
  }
  // K.tissueBox origin = bottom centre (≈ 250×130 + the tissue peak). `tissue` is the peeking sheet · pull(tl,t) lifts it out and up
  function tissueBox(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = 250, H = 120, col = o.color || C.sky;
    floor(body, W * 0.55, 10);
    const sheet = g(body, {});
    const sg = g(sheet, {});
    // soft ruffled sheet: tall, wavy top, its foot hidden inside the slot
    const top = []; for (let i = 0; i <= 8; i++) top.push([-64 + i * 16, -H - 74 + (i % 2 ? 12 : -2) + sh(i + 31) * 5]);
    paper(shadow(sg, 1), cutPoly([[-64, -H + 140], ...top, [64, -H + 140]], 1.4, 14), "#fbf3e4");
    paper(sg, cutPoly([[-22, -H + 8], [-18, -H - 60], [8, -H - 62], [14, -H + 8]], 1, 12), "#efe3cc", { opacity: 0.6 });
    paper(shadow(body, 2), cutRect(-W / 2, -H, W, H, 2, 24), col);
    paper(body, cutEll(0, -H + 4, 78, 12, 1), shade(col, 0.5));
    paper(body, cutRect(-W / 2 + 12, -H + 40, W - 24, 6, 0.6, 20), "#ffffff", { opacity: 0.35 });
    const rig = {
      g: root, sheet,
      pull(tl, t, oo = {}) { tl.to(sheet, { y: -(oo.dy ?? 90), rotation: 6, svgOrigin: O, duration: oo.dur ?? 0.4, ease: K.stepEase(oo.dur ?? 0.4, "power2.out", t) }, t); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 10. WIND LINES (L8) — three paper streaks that sweep across
  // origin = left-centre of the sweep. opts: n(3) len(260) dir(1) gap(46). gust(tl,t,{dur:1.0, dist:700}) sweeps in, then fades. Hidden until the gust.
  function windLines(parent, x, y, s = 1, o = {}) {
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const n = o.n || 3, len = o.len || 260, gap = o.gap ?? 46, lines = [];
    for (let i = 0; i < n; i++) {
      const ln = len * (1 - i * 0.18 + (i === 1 ? 0.2 : 0)), pg = g(root, { opacity: 0 }), yy = (i - (n - 1) / 2) * gap;
      const f = g(pg, { transform: `translate(${(o.dir === -1 ? ln : 0)} ${yy}) scale(${o.dir === -1 ? -1 : 1} 1)` });
      const pts = [[0, 0], [ln * 0.35, -6], [ln * 0.7, 4], [ln * 0.92, -3]];
      paper(shadow(f, 1), cutStroke(pts, 12, 0.8), "#fff4e2");
      paper(f, cutStroke([[ln * 0.9, -3], [ln * 0.98, -16], [ln * 1.04, -9]], 10, 0.6), "#fff4e2");   // curl at the head
      lines.push({ pg, f, dy: yy });
    }
    const rig = {
      g: root, lines,
      gust(tl, t, oo = {}) {
        const dur = oo.dur ?? 1.0, dist = (oo.dist ?? 700) * (o.dir === -1 ? -1 : 1);
        lines.forEach((l, i) => {
          const t0 = t + i * 0.1;
          tl.fromTo(l.pg, { x: 0, opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power1.out", immediateRender: false }, t0);
          tl.to(l.pg, { x: dist, duration: dur, ease: "power1.inOut" }, t0);
          tl.to(l.pg, { opacity: 0, duration: 0.25, ease: "power1.in" }, t0 + dur - 0.25);
        });
        return rig;
      },
    };
    return rig;
  }

  // ================================================================ 11. PURSE (L8) — Meera's purse. origin = strap grip; the bag hangs ≈ 150 below.
  // opts: hold:{rig,side:"R"} to carry it in a hand (stays upright), color. open(tl,t)/close not needed; `swing(tl,t)` one damped sway.
  function purse(parent, x, y, s = 1, o = {}) {
    const { root, body, host } = mk(parent, x, y, s, o);
    const col = o.color || C.coral, sw = g(body, {});
    paper(shadow(sw, 1), cutStroke(arc(0, 70, 38, PI * 1.08, PI * 1.92, 10, 70), 8, 0.8), shade(col, 0.35));            // strap loop
    const bag = g(sw, { transform: "translate(0 70)" });
    paper(shadow(bag, 2), cutPoly([[-62, 0], [62, 0], [78, 82], [70, 112], [-70, 112], [-78, 82]], 2, 18), col);
    paper(bag, cutRect(-60, 14, 120, 8, 0.8, 18), shade(col, 0.28), { opacity: 0.8 });                                  // flap seam
    paper(bag, cutEll(0, 22, 9, 9, 0.5), C.gold);                                                                       // clasp
    K.icon(bag, o.icon || "shopping-bag", 0, 70, 46, shade(col, 0.45), 2.2);
    held(o, host);
    const rig = {
      g: root, bag,
      swing(tl, t, oo = {}) { [[8, 0.18], [-5, 0.2], [2.5, 0.2], [0, 0.22]].reduce((tt, [r, d]) => { tl.to(sw, { rotation: r, svgOrigin: O, duration: d, ease: "sine.inOut" }, tt); return tt + d; }, t); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 12. MAGNIFIER (L11) — hand prop. origin = grip; lens ≈ 150 up-left of the grip.
  // opts: hold:{rig,side,rest} (stays upright) · lens radius r(62). sweep(tl,t,[[dx,dy],…],{dur}) glides it over things · peek(tl,t) lens pops 1.12× · lensAt = {x,y} (local)
  function magnifier(parent, x, y, s = 1, o = {}) {
    const { root, body, host } = mk(parent, x, y, s, o);
    const r = o.r || 62, ang = -2.35, lx = Math.cos(ang) * (r + 66), ly = Math.sin(ang) * (r + 66), mv = g(body, {});
    paper(shadow(mv, 1), cutStroke([[0, 0], [lx * 0.62, ly * 0.62]], 17, 1), C.woodDark);
    paper(mv, cutStroke([[lx * 0.62, ly * 0.62], [lx * 0.95, ly * 0.95]], 10, 0.8), C.brass);
    const lens = g(mv, { transform: `translate(${lx} ${ly})` }), li = g(lens, {});
    paper(shadow(li, 2), cutEll(0, 0, r + 11, r + 11, 1.4), C.brass);
    paper(li, cutEll(0, 0, r, r, 1.2), C.glass, { opacity: 0.88 });
    paper(li, cutStroke(arc(0, 0, r * 0.72, PI * 1.15, PI * 1.55, 8), 8, 0.6), "#ffffff", { opacity: 0.8 });     // glint
    held(o, host);
    const rig = {
      g: root, lens: li, lensAt: { x: lx, y: ly }, mv,
      sweep(tl, t, path, oo = {}) {
        const d = oo.dur ?? 0.5; path.forEach(([dx, dy], i) => tl.to(mv, { x: dx, y: dy, duration: d, ease: K.stepEase(d, "power2.inOut", t + i * (d + (oo.hold ?? 0.2))) }, t + i * (d + (oo.hold ?? 0.2))));
        return rig;
      },
      peek(tl, t, oo = {}) { tl.to(li, { scale: oo.k ?? 1.14, svgOrigin: O, duration: 0.14, ease: "power2.out" }, t); tl.to(li, { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t + 0.14 + (oo.hold ?? 0.2)); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 13. BOOKSHELF (L9 account books, L13) — two tiers, origin = ground centre
  // opts: tiers(2) w(760) per(7) icons([...Lucide names]) n(14) style("covers" = K.smallBook fronts | "spines") colors hidden shown(true; false = books start off-shelf)
  // books[i] (group) · slots[i]={x,y} (shelf-local bottom centre) · put(tl,t,i) drops a book in · putAll(tl,t,{step}) · pull(tl,t,i,{dy}) lifts a book out & forward · push(tl,t,i)
  function bookshelf(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const tiers = o.tiers || 2, W = o.w || 760, per = o.per || 7, tierH = o.tierH || 250, n = o.n || (o.icons ? o.icons.length : per * tiers);
    const wood = C.wood, dark = C.woodDark, TH = tierH * tiers + 30;
    floor(body, W * 0.55, 12);
    paper(shadow(body, 2), cutRect(-W / 2, -TH, W, TH, 2, 30), shade(wood, 0.3));                    // back panel
    for (let t = 0; t < tiers; t++) paper(body, cutRect(-W / 2 + 22, -TH + 26 + t * tierH, W - 44, tierH - 14, 1.2, 28), mix(dark, "#000000", 0.18), { opacity: 0.35 });   // recess shading
    paper(shadow(body, 1), cutRect(-W / 2 - 10, -TH - 14, 22, TH + 14, 1.6, 30), wood);              // sides
    paper(shadow(body, 1), cutRect(W / 2 - 12, -TH - 14, 22, TH + 14, 1.6, 30), wood);
    paper(shadow(body, 1), cutRect(-W / 2 - 18, -TH - 30, W + 36, 26, 1.6, 30), dark);              // top cap
    const slots = [], books = [], pal = o.colors || [C.dr, C.cr, C.teal, C.coral, C.saffron, C.violet, C.leaf, C.navy];
    const style = o.style || (o.icons ? "covers" : "spines");
    for (let t = 0; t < tiers; t++) {
      const by = -TH + 26 + (t + 1) * tierH - 14;
      paper(shadow(body, 1), cutRect(-W / 2 + 6, by, W - 12, 22, 1.2, 30), wood);                      // shelf board (book bottoms sit at by)
    }
    const colW = (W - 80) / per;
    for (let i = 0; i < n; i++) {
      const t = Math.floor(i / per), c = i % per, bx = -W / 2 + 40 + colW * (c + 0.5), by = -TH + 26 + (t + 1) * tierH - 14;
      slots.push({ x: bx, y: by });
      const bg = g(g(body, { transform: `translate(${bx} ${by})` }), {});
      const inner = g(bg, {});
      if (style === "covers") K.smallBook(inner, 0, 0, Math.min(colW - 14, 78), 150 + (i % 3) * 10, o.icons ? o.icons[i] : undefined, 0);
      else {
        const w = 40 + (i % 3) * 8, h = 150 + ((i * 7) % 5) * 12, col = pal[i % pal.length];
        paper(shadow(inner, 1), cutRect(-w / 2, -h, w, h, 1.2, 18), col);
        paper(inner, cutRect(-w / 2, -h + 22, w, 8, 0.6, 14), C.gold); paper(inner, cutRect(-w / 2, -26, w, 8, 0.6, 14), C.gold);
        if (o.icons && o.icons[i]) K.icon(inner, o.icons[i], 0, -h / 2, w * 0.62, C.ink, 2.2);
      }
      if (o.shown === false) hide(bg);
      books.push(bg); bg._inner = inner;
    }
    const rig = {
      g: root, books, slots, W, H: TH,
      put(tl, t, i, oo = {}) { tl.fromTo(books[i], { autoAlpha: 0, y: -(oo.from ?? 120), svgOrigin: O }, { autoAlpha: 1, y: 0, svgOrigin: O, duration: 0.3, ease: "power2.out", immediateRender: false }, t); return rig; },
      putAll(tl, t, oo = {}) { books.forEach((b, i) => rig.put(tl, t + i * (oo.step ?? 0.08), i, oo)); return rig; },
      pull(tl, t, i, oo = {}) { tl.to(books[i]._inner, { y: -(oo.dy ?? 70), scale: oo.k ?? 1.12, svgOrigin: O, duration: 0.35, ease: K.stepEase(0.35, "power2.out", t) }, t); return rig; },
      push(tl, t, i) { tl.to(books[i]._inner, { y: 0, scale: 1, svgOrigin: O, duration: 0.3, ease: K.stepEase(0.3, "power2.inOut", t) }, t); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 14. CLOSING-TIME STALL (L13) — wraps K.stall (rig.js), does not edit it
  // origin = ground centre, same geometry as K.stall. opts = K.stall opts + { shutter:0..1 (start), steamOff:true }.
  // Returns the K.stall rig PLUS { shutter, down(tl,t,frac=.5,{dur}) · up(tl,t,{dur}) · sign(tl,t) hangs a "closed" clock tag from the awning }.
  function stallClosing(parent, x, y, s = 1, o = {}) {
    const st = K.stall(parent, x, y, s, o);
    if (o.steamOff !== false && st.steam) st.steam.setAttribute("opacity", "0");
    const AY = -530, BY = -300, X0 = -196, W = 392, H = BY - AY;           // opening: awning bottom → counter top
    const sg = g(st.g, {});
    const slatsAnim = g(sg, {}), barAnim = g(sg, {});
    const sl = g(slatsAnim, {}), n = 8, sh1 = H / n;
    for (let i = 0; i < n; i++) paper(i === 0 ? shadow(sl, 1) : sl, cutRect(X0, AY + i * sh1, W, sh1 + 1, 0.8, 40), i % 2 ? "#8d93a3" : "#9aa0b0");
    ink(sl, [[X0 + 10, AY + 4], [X0 + W - 10, AY + 4]], 3, "#6b7080", { opacity: 0.6 });
    paper(shadow(barAnim, 1), cutRect(X0 - 8, AY, W + 16, 22, 1.4, 30), "#5d6275");
    paper(barAnim, cutEll(0, AY + 11, 12, 6, 0.4), "#c9ced8");
    let cur = o.shutter ?? 0;
    const fy = (f) => ({ sy: Math.max(f, 0.001), by: H * f });
    const f0 = fy(cur);
    gsap.set(slatsAnim, { scaleY: f0.sy, svgOrigin: `0 ${AY}` }); gsap.set(barAnim, { y: f0.by });
    st.shutter = sg;
    st.down = (tl, t, frac = 0.5, oo = {}) => {
      const d = oo.dur ?? 0.8, f = fy(frac), e = K.stepEase(d, "power2.out", t);
      tl.to(slatsAnim, { scaleY: f.sy, svgOrigin: `0 ${AY}`, duration: d, ease: e }, t); tl.to(barAnim, { y: f.by, duration: d, ease: e }, t); cur = frac; return st;
    };
    st.up = (tl, t, oo = {}) => st.down(tl, t, 0, oo);
    st.sign = (tl, t) => {
      const sgn = g(st.g, { opacity: 0 }), pos = g(sgn, { transform: `translate(120 ${AY + 150})` }), tg = g(pos, {});
      ink(tg, [[0, -20], [0, 0]], 3, "#7a6b58");
      paper(shadow(tg, 1), cutRect(-46, 0, 92, 78, 1.4, 14), C.cream); K.icon(tg, "clock", 0, 40, 46, C.red, 2.4);
      K.dropIn(tl, sgn, t, { dur: 0.3 }); return st;
    };
    return st;
  }

  // ================================================================ 15. INSTANT CAMERA (L12, L13)
  // origin = body centre (≈ 300×210). opts: hold, color. shoot(tl,t) = button press + flash + print · flash(tl,t) · print(tl,t,{dur}) photo slides out of the top slot (polaroid_whirr) ·
  // develop(tl,t,{dur}) the photo's grey cover fades to the picture · photo = group, photo.area = {g,x,y,w,h} (photo-local picture rect; put a K.polaroid-style render or a prop in `photo.area.g`)
  function instantCamera(parent, x, y, s = 1, o = {}) {
    const { root, body, host } = mk(parent, x, y, s, o);
    const W = 300, H = 210, col = o.color || C.teal;
    const mv = g(body, {});
    // photo (behind the body, ejects upward)
    const PW = 170, PH = 200, REST = -H / 2 + 20 + PH - 14;
    const photoPos = g(mv, { transform: `translate(0 ${REST})` }), photo = g(photoPos, {});
    paper(shadow(photo, 1), cutRect(-PW / 2, -PH, PW, PH, 1.2, 20), "#fbf7ef");
    const area = { g: g(photo, { transform: `translate(0 ${-PH / 2 - 14})` }), x: -PW / 2 + 12, y: -PH + 12, w: PW - 24, h: PH - 52 };
    paper(area.g, cutRect(-area.w / 2, -area.h / 2, area.w, area.h, 0.8, 20), "#e7dfd0");
    area.cover = g(photo, { transform: `translate(0 ${-PH / 2 - 14})` });
    paper(area.cover, cutRect(-area.w / 2, -area.h / 2, area.w, area.h, 0.8, 20), "#6f7a73");
    // camera body
    const b = shadow(mv, 2);
    paper(b, cutRect(-W / 2, -H / 2 + 20, W, H - 20, 2.4, 26), "#f4e9d4");
    paper(b, cutRect(-W / 2, -H / 2 + 20, W, 62, 2.4, 26), col);                                       // top band
    paper(mv, cutRect(-W / 2 + 18, H / 2 - 52, W - 36, 8, 0.8, 22), col, { opacity: 0.7 });
    paper(shadow(mv, 1), cutRect(-W / 2 + 20, -H / 2 + 34, 62, 34, 1, 16), "#fff9e6");                  // flash window
    paper(shadow(mv, 1), cutEll(W / 2 - 52, -H / 2 + 52, 15, 15, 0.6), C.red);                           // shutter button
    const btn = mv.lastChild;
    paper(shadow(mv, 2), cutEll(0, 28, 76, 76, 1.5), "#2b2233");                                         // lens
    paper(mv, cutEll(0, 28, 58, 58, 1.2), C.brass); paper(mv, cutEll(0, 28, 44, 44, 1), "#1e3a5a"); paper(mv, cutEll(-14, 14, 11, 8, 0.5), "#ffffff", { opacity: 0.8 });
    // flash starburst (flat paper, 3-step pop)
    const fp = g(mv, { transform: `translate(${-W / 2 + 51} ${-H / 2 + 51})`, opacity: 0 }), fl = g(fp, {});
    { const pts = []; for (let i = 0; i < 16; i++) { const rr = i % 2 ? 40 : 150, a = (i / 16) * PI * 2; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); } paper(fl, pts2d(pts), "#ffffff"); }
    held(o, host);
    const rig = {
      g: root, photo, area, mv, W, H,
      flash(tl, t) {
        tl.set(fp, { opacity: 1 }, t); tl.fromTo(fl, { scale: 0.35, svgOrigin: O }, { scale: 1, svgOrigin: O, duration: 0.1, ease: "none", immediateRender: false }, t);
        tl.to(fl, { scale: 1.3, svgOrigin: O, duration: 0.07, ease: "none" }, t + 0.1); tl.set(fp, { opacity: 0 }, t + 0.18); return rig;
      },
      print(tl, t, oo = {}) {
        const d = oo.dur ?? 1.1; tl.to(photoPos, { y: REST - (oo.rise ?? 150), duration: d, ease: K.stepEase(d, "power1.inOut", t) }, t); return rig;
      },
      develop(tl, t, oo = {}) { tl.to(area.cover, { opacity: 0, duration: oo.dur ?? 1.4, ease: K.stepEase(oo.dur ?? 1.4, "none", t) }, t); return rig; },
      shoot(tl, t, oo = {}) {
        tl.to(btn, { y: 5, duration: 0.06, ease: "none" }, t); tl.to(btn, { y: 0, duration: 0.1 }, t + 0.1);
        tl.to(mv, { scaleY: 0.97, svgOrigin: "0 100", duration: 0.07, ease: "power1.out" }, t); tl.to(mv, { scaleY: 1, svgOrigin: "0 100", duration: 0.14, ease: "power2.out" }, t + 0.07);
        rig.flash(tl, t + 0.05); rig.print(tl, t + 0.4, oo); return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 16. CINEMA DOORWAY + VELVET ROPE (L12)
  // origin = ground centre. ≈ 640 wide × 700 tall. opts: color(navy) trim. lightUp(tl,t,{step}) marquee bulbs on, one by one · open(tl,t) double doors swing · unhook(tl,t,{side:"R"}) / hook(tl,t) the rope · `rope` group
  function cinemaDoor(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const col = o.color || C.navy, trim = C.gold;
    floor(body, 330, 14);
    paper(shadow(body, 2), cutRect(-230, -640, 460, 640, 2, 40), shade(col, 0.05));                      // façade
    paper(shadow(body, 2), cutRect(-250, -700, 500, 78, 2, 30), C.red);                                    // marquee box
    paper(body, cutRect(-238, -690, 476, 56, 1.4, 30), "#fff4e2");
    K.medallion(body, 0, -662, 24, "film", C.violet);
    const bulbs = [];
    for (let i = 0; i < 12; i++) { const bx = -214 + i * 38.9; [-704, -618].forEach((by, k) => { if (k === 1 && (i === 0 || i === 11)) return; paper(body, cutEll(bx, by + (k ? -8 : 4), 8, 8, 0.4), "#cfc3a8"); const on = g(body, { opacity: 0 }); paper(on, cutEll(bx, by + (k ? -8 : 4), 8, 8, 0.4), C.gold); bulbs.push(on); }); }
    // doorway (warm interior behind two doors)
    paper(body, cutRect(-130, -520, 260, 520, 1.6, 40), C.saffron);
    paper(body, cutPoly([[-130, -520], [130, -520], [130, -300], [-130, -300]], 0, 40), "#f7c778", { opacity: 0.55 });
    const dl = g(g(body, { transform: "translate(-130 0)" }), {}), dr = g(g(body, { transform: "translate(130 0)" }), {});
    paper(shadow(dl, 1), cutRect(0, -520, 130, 520, 1.4, 40), shade(col, 0.28)); paper(dl, cutRect(14, -490, 102, 210, 1, 30), shade(col, 0.1)); paper(dl, cutEll(112, -250, 8, 8, 0.4), trim);
    paper(shadow(dr, 1), cutRect(-130, -520, 130, 520, 1.4, 40), shade(col, 0.28)); paper(dr, cutRect(-116, -490, 102, 210, 1, 30), shade(col, 0.1)); paper(dr, cutEll(-112, -250, 8, 8, 0.4), trim);
    paper(shadow(body, 1), cutRect(-146, -540, 292, 24, 1.4, 30), trim);                                   // lintel
    // steps
    paper(shadow(body, 1), cutRect(-170, -14, 340, 14, 1.2, 40), C.grey); paper(shadow(body, 1), cutRect(-150, -28, 300, 14, 1.2, 40), mix(C.grey, "#ffffff", 0.25));
    // stanchions + rope (two halves meeting at the middle so one can drop)
    const post = (px) => { const pg = g(body, { transform: `translate(${px} 0)` }); paper(shadow(pg, 1), cutEll(0, -4, 34, 9, 0.6), C.brass); paper(pg, cutRect(-7, -178, 14, 176, 0.8, 30), C.brass); paper(shadow(pg, 1), cutEll(0, -186, 15, 15, 0.6), C.gold); return pg; };
    const PXL = -300, PXR = 300; post(PXL); post(PXR);
    const rope = g(body, {}), ropeL = g(g(rope, { transform: `translate(${PXL} -178)` }), {}), ropeR = g(g(rope, { transform: `translate(${PXR} -178)` }), {});
    const half = (grp, dir) => {   // draws a drooping half-rope from the post top (0,0) toward the centre (dir = +1 → right, −1 → left)
      const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([dir * 300 * u, Math.sin(u * PI * 0.5) * 40 + u * u * 10]); }
      paper(shadow(grp, 1), cutStroke(pts, 14, 0.8), C.red);
      paper(grp, cutStroke(pts.map(([a, b]) => [a, b - 3]), 3, 0.5), "#e8776b", { opacity: 0.6 });
    };
    half(ropeL, 1); half(ropeR, -1);
    let hooked = true;
    const rig = {
      g: root, rope, ropeL, ropeR, doors: { L: dl, R: dr }, bulbs,
      lightUp(tl, t, oo = {}) { bulbs.forEach((b, i) => tl.set(b, { opacity: 1 }, t + Math.floor(i / 2) * (oo.step ?? 0.1))); return rig; },
      open(tl, t, oo = {}) {
        const d = oo.dur ?? 0.6;
        tl.to(dl, { scaleX: 0.18, svgOrigin: O, duration: d, ease: K.stepEase(d, "power2.inOut", t) }, t);
        tl.to(dr, { scaleX: 0.18, svgOrigin: O, duration: d, ease: K.stepEase(d, "power2.inOut", t) }, t); return rig;
      },
      unhook(tl, t, oo = {}) {      // right half lets go and hangs from its post (the left stays); `side:"both"` drops both
        const sides = oo.side === "both" ? [ropeL, ropeR] : [ropeR]; 
        sides.forEach((h) => tl.to(h, { rotation: h === ropeR ? -88 : 88, svgOrigin: O, duration: 0.45, ease: K.stepEase(0.45, "power2.in", t) }, t)); hooked = false; return rig;
      },
      hook(tl, t) { [ropeL, ropeR].forEach((h) => tl.to(h, { rotation: 0, svgOrigin: O, duration: 0.4, ease: K.stepEase(0.4, "power2.out", t) }, t)); hooked = true; return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 17. USHER CAP + PAPER TORCH (L12 — Khata's handAnchor props)
  // K.usherCap origin = bottom-centre of the cap. On Khata: K.usherCap(k.body, 0, -372, 0.9). pop(tl,t) drops onto the cover with a tiny squash · tip(tl,t) tilts it and back.
  function usherCap(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const col = o.color || C.red, mv = g(body, {});
    paper(shadow(mv, 2), cutPoly([[-76, 0], [76, 0], [62, -78], [-62, -78]], 1.6, 18), col);
    paper(mv, cutRect(-77, -26, 154, 16, 1, 22), C.gold);                                                  // band
    paper(shadow(mv, 1), cutPoly([[-86, 2], [86, 2], [74, -10], [-74, -10]], 1, 18), shade(col, 0.3));     // brim
    paper(shadow(mv, 1), cutEll(0, -84, 10, 10, 0.4), C.gold);                                              // button
    const rig = {
      g: root, mv,
      pop(tl, t, oo = {}) {
        hide(body);
        tl.fromTo(body, { autoAlpha: 0, y: -(oo.from ?? 150), rotation: -10, svgOrigin: O }, { autoAlpha: 1, y: 0, rotation: 0, svgOrigin: O, duration: 0.3, ease: "power2.in", immediateRender: false }, t);
        tl.to(mv, { scaleY: 0.88, scaleX: 1.06, svgOrigin: O, duration: 0.07, ease: "power1.out" }, t + 0.3); tl.to(mv, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 0.16, ease: "power2.out" }, t + 0.37); return rig;
      },
      tip(tl, t) { tl.to(mv, { rotation: 12, x: 6, svgOrigin: O, duration: 0.18, ease: K.stepEase(0.18, "power2.out", t) }, t); tl.to(mv, { rotation: 0, x: 0, svgOrigin: O, duration: 0.3, ease: K.stepEase(0.3, "power2.inOut", t + 0.5) }, t + 0.5); return rig; },
    };
    return life(rig, body);
  }
  // K.paperTorch origin = grip (bottom of the handle); points up (rotate with `rot` or `aim`). hold:{rig:k, side:"R"} for Khata. on(tl,t) beam pops (flat cream wedge, no glow) · off(tl,t) · aim(tl,t,deg)
  function paperTorch(parent, x, y, s = 1, o = {}) {
    const { root, body, host } = mk(parent, x, y, s, o);
    const pv = g(body, {}), mv = g(pv, {});
    const beam = g(mv, { opacity: 0 }), bi = g(beam, { transform: "translate(0 -176)" }), bs = g(bi, {});
    paper(bs, cutPoly([[-26, 0], [26, 0], [140, -420], [-140, -420]], 0.8, 40), "#ffd978", { opacity: 0.55 });
    paper(shadow(mv, 1), cutRect(-14, -60, 28, 62, 1, 16), shade(C.navy, 0.1));
    paper(shadow(mv, 1), cutPoly([[-14, -60], [14, -60], [34, -150], [-34, -150]], 1.2, 14), C.brass);
    paper(shadow(mv, 1), cutEll(0, -152, 38, 10, 0.6), C.goldDark); paper(mv, cutEll(0, -152, 30, 7, 0.5), "#fff6d2");
    paper(mv, cutRect(-9, -42, 18, 8, 0.5, 10), C.red);
    held(o, host);
    const rig = {
      g: root, mv, beam,
      on(tl, t) { tl.set(beam, { opacity: 0.6 }, t); tl.set(beam, { opacity: 1 }, t + 1 / 15); tl.fromTo(bs, { scaleY: 0.3, svgOrigin: O }, { scaleY: 1, svgOrigin: O, duration: 0.13, ease: "none", immediateRender: false }, t); return rig; },
      off(tl, t) { tl.set(beam, { opacity: 0 }, t); return rig; },
      aim(tl, t, deg, oo = {}) { K.tw(tl, mv, { rotation: deg, svgOrigin: O }, t, oo.dur ?? 0.4, oo); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 18. TICKET STUB (L12)
  // origin = centre (≈ 280×120). tear(tl,t) — stub tears off and tumbles away (ticket_tear) · main · stub
  function ticketStub(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = 280, H = 124, PX = 60, col = o.color || C.coral;
    const main = g(body, {}), stub = g(body, { }), stubIn = g(stub, {});
    paper(shadow(main, 1), cutPoly([[-W / 2, -H / 2], [PX, -H / 2], [PX, H / 2], [-W / 2, H / 2]], 1.2, 20), col);
    paper(main, cutPoly([[-W / 2 + 10, -H / 2 + 10], [PX - 10, -H / 2 + 10], [PX - 10, H / 2 - 10], [-W / 2 + 10, H / 2 - 10]], 0.8, 20), tint(col, 0.18), { opacity: 0.8 });
    K.icon(main, "ticket", -30, 0, 58, C.ink, 2.4);
    paper(shadow(stubIn, 1), cutPoly([[PX, -H / 2], [W / 2, -H / 2], [W / 2, H / 2], [PX, H / 2]], 1.2, 20), shade(col, 0.1));
    for (let i = 0; i < 6; i++) paper(stubIn, cutEll(PX, -H / 2 + 12 + i * 20, 5, 5, 0.3), C.cream);              // perforation holes
    TXT(stubIn, (PX + W / 2) / 2, 2, o.no || "07", { size: 38, weight: 800, color: "#fff4e2", rot: 90 });
    const rig = {
      g: root, main, stub,
      tear(tl, t, oo = {}) {
        tl.to(stubIn, { x: 26, y: 34, rotation: 22, svgOrigin: `${PX} ${H / 2}`, duration: oo.dur ?? 0.3, ease: K.stepEase(oo.dur ?? 0.3, "power2.out", t) }, t);
        tl.to(main, { x: -8, rotation: -2, svgOrigin: O, duration: 0.2, ease: K.stepEase(0.2, "power2.out", t) }, t);
        if (oo.drop) tl.to(stubIn, { y: 300, rotation: 60, opacity: 0, duration: 0.6, ease: "power2.in" }, t + 0.35); return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 19. CLAIM STRINGS (L13) — twine drawn from a hand to props
  // K.claimString(parent, {from:[x,y] | {rig,side:"R"}, to:[x,y] | [[x,y],…], sag:46, color, w:3.4}) — coordinates in PARENT space (rig hands use the build pose).
  // draw(tl,t,{dur:.5, stagger:.12}) stroke-dash reveals every string · undraw(tl,t) · paths[] (retarget by drawing a new one)
  function claimString(parent, o = {}) {
    const root = g(parent, {});
    const from = Array.isArray(o.from) ? o.from : (o.from && o.from.rig ? ((o.from.side || "R") === "L" ? o.from.rig.handL : o.from.rig.handR) : [0, 0]);
    const tos = Array.isArray(o.to[0]) ? o.to : [o.to], paths = [];
    tos.forEach((to, i) => {
      const [x0, y0] = from, [x1, y1] = to, mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + (o.sag ?? Math.min(70, Math.hypot(x1 - x0, y1 - y0) * 0.14)) + i * 6;
      const p = el("path", { d: `M${x0},${y0} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1},${y1}`, fill: "none", stroke: o.color || "#7a6b58", "stroke-width": o.w ?? 3.4, "stroke-linecap": "round" }, root);
      const L = Math.ceil(p.getTotalLength ? p.getTotalLength() : 600) + 2;
      p.setAttribute("stroke-dasharray", L); p.setAttribute("stroke-dashoffset", L); paths.push({ p, L });
    });
    const rig = {
      g: root, paths,
      draw(tl, t, oo = {}) { paths.forEach(({ p }, i) => tl.to(p, { strokeDashoffset: 0, duration: oo.dur ?? 0.5, ease: "power2.out" }, t + i * (oo.stagger ?? 0.12))); return rig; },
      undraw(tl, t, oo = {}) { paths.forEach(({ p, L }, i) => tl.to(p, { strokeDashoffset: L, duration: oo.dur ?? 0.3, ease: "power2.in" }, t + i * (oo.stagger ?? 0.05))); return rig; },
    };
    return rig;
  }

  // ================================================================ 20. COIN STREAM (L14) — a burst of paper coins along a path (money in / out)
  // K.coinStream(parent, {path:[[x,y],…] (≥2 points; smoothed), n:10, r:18, spread:14, seed}) · run(tl,t,{dur:1.2, stagger:.08, travel:.6}) coins appear at the start, flow along the path, vanish at the end.
  // reverse the path for "out". Seek-safe (progress-driven). hidden otherwise.
  function coinStream(parent, o = {}) {
    const root = g(parent, {}), P = o.path, n = o.n || 10, r = o.r || 18, seed = o.seed || 3, spread = o.spread ?? 14;
    // Catmull-Rom → dense polyline
    const dense = [];
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
      for (let k = 0; k < 16; k++) { const u = k / 16, u2 = u * u, u3 = u2 * u; dense.push([0, 1].map((c) => 0.5 * ((2 * p1[c]) + (-p0[c] + p2[c]) * u + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * u2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * u3))); }
    }
    dense.push(P[P.length - 1]);
    const cum = [0]; for (let i = 1; i < dense.length; i++) cum.push(cum[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
    const total = cum[cum.length - 1];
    const at = (u) => { const d = u * total; let i = 1; while (i < cum.length - 1 && cum[i] < d) i++; const f = (d - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1); const a = dense[i - 1], b = dense[i]; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [a[0] + dx * f, a[1] + dy * f, -dy / l, dx / l]; };
    const coins = [];
    for (let i = 0; i < n; i++) { const cg = g(root, { opacity: 0, "data-layout-allow-overlap": "true" }); K.coin(cg, 0, 0, r, sh(seed + i) * 25); coins.push({ g: cg, off: sh(seed + i * 7 + 2) * spread, ph: i / n }); }
    const place = (c, u) => { const [px, py, nx, ny] = at(u); const wob = Math.sin(u * PI * 2 + c.ph * 6) * 0.35; c.g.setAttribute("transform", `translate(${(px + nx * c.off * (1 + wob)).toFixed(1)} ${(py + ny * c.off * (1 + wob)).toFixed(1)})`); };
    const rig = {
      g: root, coins, length: total,
      run(tl, t, oo = {}) {
        const dur = oo.dur ?? 1.2, gap = oo.stagger ?? 0.08, travel = oo.travel ?? Math.max(0.4, dur - gap * n);
        coins.forEach((c, i) => {
          const px = { u: 0 };
          tl.fromTo(px, { u: 0 }, { u: 1, duration: travel, ease: oo.ease || "power1.inOut", immediateRender: false, onUpdate() { const u = px.u; if (u <= 0 || u >= 1) c.g.setAttribute("opacity", "0"); else { c.g.setAttribute("opacity", "1"); place(c, u); } } }, t + i * gap);
        });
        return rig;
      },
    };
    return rig;
  }

  // ================================================================ 21. RIVER + PLANK BRIDGE (L14 scene 5) — side view
  // origin = bridge deck centre, top surface. opts: w(1500) gap(560) riverH(220) planks(9). `deckY(xLocal)` surface y · lay(tl,t,{step}) planks drop in one by one · water = river group · planks[]
  function riverBridge(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const W = o.w || 1500, gap = o.gap || 560, RH = o.riverH || 220, np = o.planks || 9, bankH = 130;
    const water = g(body, {});
    paper(shadow(water, 1), cutRect(-gap / 2 - 10, 20, gap + 20, RH, 1.6, 40), tint(C.sky, 0.28));
    [[-0.3, 60], [0.25, 110], [-0.1, 160], [0.35, 190]].forEach(([fx, fy], i) => {
      const cx = fx * gap, pts = []; for (let k = 0; k <= 8; k++) pts.push([cx - 80 + k * 20, fy + Math.sin(k * 1.6 + i) * 7]);
      ink(water, pts, 5, "#e6f4fb", { opacity: 0.9 });
    });
    const bankSlab = (sx) => { const bx = sx > 0 ? gap / 2 : -W / 2, bw = W / 2 - gap / 2; paper(shadow(body, 2), cutPoly([[bx, 14], [bx + bw, 14], [bx + bw, 20 + RH], [bx, 20 + RH]].map(([a, b], i) => [a, i < 2 ? b + (sx > 0 ? (i === 0 ? 22 : 0) : (i === 1 ? 22 : 0)) : b]), 2.6, 30), C.chai); paper(body, cutRect(bx, 8, bw, 22, 1.6, 30), shade(C.leaf, 0.0)); };
    bankSlab(-1); bankSlab(1);
    const deckY = (xl) => -Math.cos((xl / (gap / 2 + 40)) * PI / 2) * 34 + 0;
    const planks = [], pw = (gap + 80) / np;
    for (let i = 0; i < np; i++) {
      const xl = -gap / 2 - 40 + (i + 0.5) * pw, yy = deckY(xl), slope = (deckY(xl + 5) - deckY(xl - 5)) / 10;
      const pg = g(body, { transform: `translate(${xl} ${yy})` }), inner = g(pg, { opacity: o.hidePlanks ? 0 : 1 });
      paper(shadow(inner, 1), cutRect(-pw / 2 + 2, -4, pw - 4, 26, 0.8, 20), i % 2 ? C.wood : mix(C.wood, "#ffffff", 0.12));
      ink(inner, [[-pw / 2 + 8, 8], [pw / 2 - 8, 8]], 2, C.woodDark, { opacity: 0.5 });
      pg.setAttribute("transform", `translate(${xl} ${yy}) rotate(${(Math.atan(slope) * 180 / PI).toFixed(1)})`);
      planks.push(inner);
    }
    // rope rails
    [-1, 1].forEach((sd) => { const px = sd * (gap / 2 + 20); paper(shadow(body, 1), cutRect(px - 7, -84, 14, 88, 0.8, 20), C.woodDark); });
    const rail = []; for (let i = 0; i <= 12; i++) { const u = i / 12, xl = -gap / 2 - 20 + u * (gap + 40); rail.push([xl, -78 + deckY(xl) * 0.3 + Math.sin(u * PI) * 14]); }
    ink(body, rail, 6, "#a0764a");
    const rig = {
      g: root, water, planks, deckY: (xl) => deckY(xl),
      lay(tl, t, oo = {}) { planks.forEach((p, i) => tl.fromTo(p, { autoAlpha: 0, y: -(oo.from ?? 90), svgOrigin: O }, { autoAlpha: 1, y: 0, svgOrigin: O, duration: 0.22, ease: "power2.out", immediateRender: false }, t + i * (oo.step ?? 0.1))); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 22. COIN TOKEN WITH KHATA'S EYES (L14)
  // origin = centre, r 80. look(tl,t,dx,dy) · blink(tl,t) · expr(tl,t,"happy"|"worried"|"wow") · hop(tl,t,{height}) · roll(tl,t,dx,dur) rolls the plate along x (eyes stay upright) · moveTo(tl,t,dx,dy,dur)
  function coinToken(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o), r = o.r || 80;
    const mover = g(body, {}), lift = g(mover, {}), plate = g(lift, {});
    paper(shadow(plate, 2), cutEll(0, 0, r, r * 0.97, 1.4), C.goldDark);
    paper(plate, cutEll(-2, -2, r * 0.86, r * 0.83, 1), C.gold);
    el("circle", { cx: -2, cy: -2, r: r * 0.7, fill: "none", stroke: C.goldDark, "stroke-width": 3, "stroke-dasharray": "9 7", opacity: 0.55 }, plate);
    K.rupee(plate, 0, r * 0.38, r * 0.6, C.goldDark);
    const face = g(lift, {}), eyes = g(face, {});
    [-1, 1].forEach((sd) => paper(shadow(eyes, 1), cutEll(sd * r * 0.36, -r * 0.3, r * 0.2, r * 0.23, 0.8), C.white));
    const pupils = g(eyes, {});
    [-1, 1].forEach((sd) => paper(pupils, cutEll(sd * r * 0.36 + 3, -r * 0.27, r * 0.09, r * 0.1, 0.4), C.ink));
    const lids = g(face, { opacity: 0 }); [-1, 1].forEach((sd) => paper(lids, cutEll(sd * r * 0.36, -r * 0.3, r * 0.21, r * 0.24, 0.6), C.gold));
    const mouths = {};
    mouths.happy = g(face, {}); paper(mouths.happy, cutStroke(arc(0, -r * 0.02, r * 0.26, PI * 0.15, PI * 0.85, 8), 5, 0.4), C.ink);
    mouths.worried = g(face, { opacity: 0 }); paper(mouths.worried, cutStroke(arc(0, r * 0.12, r * 0.2, PI * 1.2, PI * 1.8, 8), 5, 0.4), C.ink);
    mouths.wow = g(face, { opacity: 0 }); paper(mouths.wow, cutEll(0, r * 0.04, r * 0.09, r * 0.11, 0.4), C.ink);
    const rig = {
      g: root, mover, lift, plate, face, eyes, pupils,
      look(tl, t, dx, dy, oo = {}) { K.tw(tl, pupils, { x: dx, y: dy }, t, 0.17, oo); return rig; },
      blink(tl, t) { tl.set(lids, { opacity: 1 }, t); tl.set(lids, { opacity: 0 }, t + 2 / 15); return rig; },
      expr(tl, t, name) { K.swapSet(tl, mouths, name, t + 1 / 15); tl.to(eyes, { scale: name === "wow" ? 1.12 : 1, svgOrigin: `0 ${-r * 0.3}`, duration: 0.15, ease: "none" }, t); return rig; },
      hop(tl, t, oo = {}) {
        const h = oo.height ?? 50;
        tl.to(lift, { scaleY: 0.9, scaleX: 1.06, svgOrigin: `0 ${r}`, duration: 0.1, ease: "power1.out" }, t);
        tl.to(lift, { y: -h, scaleY: 1.05, scaleX: 0.97, svgOrigin: `0 ${r}`, duration: 0.2, ease: "power2.out" }, t + 0.1);
        tl.to(lift, { y: 0, scaleY: 0.92, scaleX: 1.05, svgOrigin: `0 ${r}`, duration: 0.18, ease: "power2.in" }, t + 0.3);
        tl.to(lift, { scaleY: 1, scaleX: 1, svgOrigin: `0 ${r}`, duration: 0.14, ease: "power2.out" }, t + 0.48); return rig;
      },
      roll(tl, t, dx, dur = 1) { tl.to(mover, { x: dx, duration: dur, ease: K.stepEase(dur, "power1.inOut", t) }, t); tl.to(plate, { rotation: (dx / (PI * 2 * r)) * 360, svgOrigin: O, duration: dur, ease: K.stepEase(dur, "power1.inOut", t) }, t); return rig; },
      moveTo(tl, t, dx, dy, dur = 0.8) { tl.to(mover, { x: dx, y: dy, duration: dur, ease: K.stepEase(dur, "power2.inOut", t) }, t); return rig; },
    };
    return life(rig, body);
  }

  // ================================================================ 23. CYCLE LOOP (L14) — a loop track with station badges
  // origin = centre. opts: n(7) rx(700) ry(300) undrawn(false → track starts undrawn + badges hidden) icons([…Lucide names] | numbers) badgeR(50) start(-90°, clockwise). stations[i] = {g, x, y} (local) · draw(tl,t,{dur}) track strokes round · show(tl,t,i) / showAll(tl,t,{step}) badge pops ·
  // light(tl,t,i) gold ring · token(tl,t,from,to,{dur}) a gold dot travels the loop between stations (call repeatedly; returns rig) · `at(i)` = world {x,y} of a station
  function cycleLoop(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const n = o.n || 7, rx = o.rx || 700, ry = o.ry || 300, R = o.badgeR || 50, a0 = (o.start ?? -90) * PI / 180;
    const pt = (a) => [Math.cos(a) * rx, Math.sin(a) * ry];
    const d = (() => { const p = []; for (let i = 0; i <= 96; i++) { const q = pt(a0 + (i / 96) * PI * 2); p.push((i ? "L" : "M") + q[0].toFixed(1) + "," + q[1].toFixed(1)); } return p.join(" ") + " Z"; })();
    const trk = g(body, {});
    el("path", { d, fill: "none", stroke: "#8a5a32", "stroke-width": 40, "stroke-linejoin": "round", opacity: 0.9 }, trk);
    const track = el("path", { d, fill: "none", stroke: C.wood, "stroke-width": 34, "stroke-linejoin": "round" }, trk);
    const dash = el("path", { d, fill: "none", stroke: "#f4e9d4", "stroke-width": 4, "stroke-dasharray": "14 12", "stroke-linejoin": "round" }, trk);
    const Ltot = track.getTotalLength ? track.getTotalLength() : 4000;
    // draw: reveal via a clip-less stroke trick — a second mask path whose dash grows
    const maskId = "p2-loopmask-" + (UID++), mk2 = el("mask", { id: maskId, maskUnits: "userSpaceOnUse", x: -rx - 100, y: -ry - 100, width: 2 * rx + 200, height: 2 * ry + 200 }, body);
    const mp = el("path", { d, fill: "none", stroke: "#fff", "stroke-width": 80, "stroke-dasharray": Ltot + 4, "stroke-dashoffset": o.undrawn ? Ltot + 4 : 0 }, mk2);
    trk.setAttribute("mask", `url(#${maskId})`);
    for (let i = 0; i < n; i++) {   // clockwise chevrons midway between stations
      const a = a0 + ((i + 0.5) / n) * PI * 2, [qx, qy] = pt(a), ang = Math.atan2(Math.cos(a) * ry, -Math.sin(a) * rx) * 180 / PI;
      const cg = g(trk, { transform: `translate(${qx.toFixed(1)} ${qy.toFixed(1)}) rotate(${ang.toFixed(1)})` });
      paper(shadow(cg, 1), cutPoly([[16, 0], [-10, -17], [-4, 0], [-10, 17]], 0.5, 12), "#f4e9d4");
    }
    const stations = [];
    for (let i = 0; i < n; i++) {
      const a = a0 + (i / n) * PI * 2, [px, py] = pt(a), sg = g(body, { transform: `translate(${px.toFixed(1)} ${py.toFixed(1)})` }), inner = g(sg, { opacity: o.undrawn ? 0 : 1 });
      paper(shadow(inner, 2), cutEll(0, 0, R + 8, R + 8, 1.2), C.cream);
      const ic = o.icons && o.icons[i];
      if (ic && window.ICONS[ic]) K.medallion(inner, 0, 0, R - 4, ic);
      else { paper(inner, cutEll(0, 0, R - 4, R - 4, 1), C.saffron); TXT(inner, 0, 3, String(ic ?? i + 1), { size: R * 0.9, weight: 800 }); }
      const halo = el("circle", { cx: 0, cy: 0, r: R + 14, fill: "none", stroke: C.gold, "stroke-width": 8, opacity: 0 }, inner);
      stations.push({ g: inner, x: px, y: py, a, halo });
    }
    const tokenG = g(body, { opacity: 0 }); paper(shadow(tokenG, 1), cutEll(0, 0, 17, 17, 0.8), C.gold); paper(tokenG, cutEll(-2, -2, 11, 11, 0.5), "#fff0b8");
    let tcur = 0;
    const rig = {
      g: root, stations, token: tokenG, at: (i) => ({ x: x + stations[i].x * s, y: y + stations[i].y * s }),
      draw(tl, t, oo = {}) { const dd = oo.dur ?? 1.6; tl.to(mp, { strokeDashoffset: 0, duration: dd, ease: K.stepEase(dd, "power1.inOut", t) }, t); return rig; },
      show(tl, t, i) { K.dropIn(tl, stations[i].g, t, { dur: 0.28 }); return rig; },
      showAll(tl, t, oo = {}) { stations.forEach((st, i) => rig.show(tl, t + i * (oo.step ?? 0.15), i)); return rig; },
      light(tl, t, i, oo = {}) { const h = stations[i].halo; tl.fromTo(h, { opacity: 0 }, { opacity: 1, duration: 0.12, immediateRender: false }, t); tl.to(h, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + (oo.hold ?? 0.8)); return rig; },
      token(tl, t, from, to, oo = {}) {
        const dur = oo.dur ?? 1.0, a1 = a0 + (from / n) * PI * 2; let span = ((to - from + n) % n) / n * PI * 2; if (span === 0) span = PI * 2;
        const px = { a: a1 };
        tl.set(tokenG, { opacity: 1 }, t);
        tl.fromTo(px, { a: a1 }, { a: a1 + span, duration: dur, ease: K.stepEase(dur, "power1.inOut", t), immediateRender: false, onUpdate() { const q = pt(px.a); tokenG.setAttribute("transform", `translate(${q[0].toFixed(1)} ${q[1].toFixed(1)})`); } }, t);
        if (oo.hide) tl.set(tokenG, { opacity: 0 }, t + dur + 0.05); return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 24. OFFICE EVENT SET (L14, May 5 — Priya's office)
  // origin = ground centre (≈ 780 wide × 520). opts: tone (silhouette/wall tone-on-tone, default shaded sky) cloth(cream). tumblers(5). cheers(tl,t) the two silhouettes lean in, tumblers lift · silhouettes[0|1] · table · tray
  function officeEvent(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const tone = o.tone || shade(C.sky, 0.55);
    floor(body, 400, 14);
    const mkSil = (sx, flip, tumblerHand) => {
      const sg = g(body, { transform: `translate(${sx} 0) scale(${flip} 1)` }), inner = g(sg, {});
      paper(inner, cutRect(-46, -320, 92, 232, 3, 22), tone);                                                // torso
      paper(inner, cutEll(0, -372, 44, 48, 1.2), tone);                                                       // head
      paper(inner, cutRect(-34, -96, 26, 100, 1.4, 20), shade(tone, 0.2)); paper(inner, cutRect(8, -96, 26, 100, 1.4, 20), shade(tone, 0.2));   // legs
      paper(inner, cutStroke([[-44, -300], [-62, -214], [-30, -178]], 22, 1), tone);                          // arm (hand toward the table)
      if (tumblerHand) { const tg = g(inner, { transform: "translate(-26 -184)" }); K.tumbler(tg, 0, 0, 0.9); inner._tumbler = tg; }
      return inner;
    };
    const sil = [mkSil(-250, 1, true), mkSil(250, -1, true)];
    // table with cloth
    const tb = g(body, {});
    paper(shadow(tb, 2), cutRect(-310, -190, 620, 26, 2, 30), C.cream);
    paper(tb, cutPoly([[-300, -164], [300, -164], [320, 0], [-320, 0]], 1.6, 30), tint(C.coral, 0.45));
    for (let i = 0; i < 6; i++) ink(tb, [[-270 + i * 108, -150], [-282 + i * 112, -6]], 3, mix(C.coral, "#ffffff", 0.2), { opacity: 0.6 });
    const tray = g(tb, {}); paper(shadow(tray, 1), cutRect(-130, -204, 260, 16, 1.2, 20), C.grey);
    const tumblers = []; const nt = o.tumblers || 5;
    for (let i = 0; i < nt; i++) tumblers.push(K.tumbler(tray, -100 + i * (200 / Math.max(1, nt - 1)), -204, 1.0));
    const rig = {
      g: root, silhouettes: sil, table: tb, tray, tumblers,
      cheers(tl, t) {
        tl.to(sil[0], { rotation: 5, svgOrigin: "0 0", duration: 0.2, ease: K.stepEase(0.2, "power2.out", t) }, t); tl.to(sil[1], { rotation: 5, svgOrigin: "0 0", duration: 0.2, ease: K.stepEase(0.2, "power2.out", t) }, t);
        sil.forEach((sl) => sl._tumbler && tl.to(sl._tumbler, { y: -34, duration: 0.2, ease: K.stepEase(0.2, "power2.out", t) }, t));
        tl.to(sil, { rotation: 0, svgOrigin: "0 0", duration: 0.35, ease: K.stepEase(0.35, "power2.inOut", t + 0.8) }, t + 0.8); sil.forEach((sl) => sl._tumbler && tl.to(sl._tumbler, { y: 0, duration: 0.3, ease: "power2.inOut" }, t + 0.8)); return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 25. GOLD TICK STICKER (L14 finale)
  // origin = centre. stick(tl,t) slaps on: 1.3× → 1, rot −12° → −6°, power3.out 0.18 s, no wobble.
  function goldTick(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o), r = o.r || 58;
    const pts = []; for (let i = 0; i < 28; i++) { const rr = r * (i % 2 ? 0.9 : 1), a = (i / 28) * PI * 2; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
    const mv = g(body, {});
    paper(shadow(mv, 2), pts2d(pts), C.goldDark);
    paper(mv, cutEll(-1, -1, r * 0.84, r * 0.84, 1), C.gold);
    K.icon(mv, "check", 0, 0, r * 1.0, C.ink, 3.4);
    const rig = {
      g: root, mv,
      stick(tl, t) {
        hide(body); mv.setAttribute("opacity", "1");
        tl.fromTo(body, { autoAlpha: 0, scale: 1.3, rotation: -12, svgOrigin: O }, { autoAlpha: 1, scale: 1, rotation: -6, svgOrigin: O, duration: 0.18, ease: "power3.out", immediateRender: false }, t); return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 26. BANK BUILDING — columns for legs (L5, L6, L13, L14)
  // origin = ground centre (≈ 520 wide × 640 tall). opts: face(true) tone(stone) roof. expr(tl,t,"happy"|"wow"|"frown") · look(tl,t,dx,dy) · blink · hop(tl,t) · `hand` = group at the right edge (hold a passbook: K.passbook(bank.hand,0,0,0.5)) · door mouth
  function bank(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o);
    const stone = o.tone || "#d9d3c6", roof = o.roof || shade(C.navy, 0.0);
    floor(body, 300, 14);
    const lift = g(body, {}), mv = g(lift, {});
    // legs: four columns
    [-165, -55, 55, 165].forEach((cx) => {
      const cg = g(mv, {});
      paper(shadow(cg, 1), cutRect(cx - 24, -262, 48, 252, 1.2, 30), stone);
      [-18, -6, 6, 18].forEach((dx) => ink(cg, [[cx + dx, -250], [cx + dx, -22]], 2.5, "#bdb6a6", { opacity: 0.7 }));
      paper(cg, cutRect(cx - 32, -274, 64, 18, 1, 20), "#c9c2b2"); paper(cg, cutRect(cx - 32, -16, 64, 16, 1, 20), "#c9c2b2");
    });
    // steps
    paper(shadow(mv, 1), cutRect(-250, -12, 500, 12, 1, 40), "#c4bdae");
    // body (entablature) with the face
    paper(shadow(mv, 2), cutRect(-250, -380, 500, 110, 2.4, 40), stone);
    paper(mv, cutRect(-250, -300, 500, 12, 1, 40), "#c9c2b2");
    // pediment
    paper(shadow(mv, 2), cutPoly([[-270, -380], [270, -380], [0, -560]], 2, 40), roof);
    paper(mv, cutPoly([[-232, -392], [232, -392], [0, -540]], 1.4, 40), shade(roof, 0.0), { opacity: 0 });
    K.medallion(mv, 0, -462, 38, "landmark", C.sky);
    // door mouth between the middle columns
    const mouths = {};
    const mg = g(mv, {});
    mouths.happy = g(mg, {}); paper(mouths.happy, cutPoly([[-44, -80], [-44, -186], ...arc(0, -186, 44, PI, PI * 2, 10, 38), [44, -80]], 1, 16), "#3a2d3a");
    mouths.wow = g(mg, { opacity: 0 }); paper(mouths.wow, cutRect(-30, -200, 60, 110, 1.2, 20), "#3a2d3a");
    mouths.frown = g(mg, { opacity: 0 }); paper(mouths.frown, cutRect(-44, -170, 88, 70, 1.2, 20), "#3a2d3a");
    // eyes (dots in the frieze) + eyebrows on the pediment base
    const eyes = g(mv, {}), brows = g(mv, {});
    [-1, 1].forEach((sd) => paper(shadow(eyes, 1), cutEll(sd * 78, -326, 26, 28, 0.8), C.white));
    const pupils = g(eyes, {});
    [-1, 1].forEach((sd) => paper(pupils, cutEll(sd * 78 + 3, -322, 12, 13, 0.4), C.ink));
    const lids = g(mv, { opacity: 0 }); [-1, 1].forEach((sd) => paper(lids, cutEll(sd * 78, -326, 27, 29, 0.6), stone));
    const browG = {}; [-1, 1].forEach((sd) => { const bg = g(brows, { transform: `translate(${sd * 78} -366)` }); const bi = g(bg, {}); paper(shadow(bi, 1), cutRect(-30, -6, 60, 12, 0.8, 16), C.navy); browG[sd] = bi; });
    const handG = g(mv, { transform: "translate(250 -230)" });
    const rig = {
      g: root, lift, mv, eyes, pupils, hand: handG, mouths, brows: browG,
      expr(tl, t, name) {
        K.swapSet(tl, mouths, name, t + 1 / 15);
        tl.to(browG[-1], { rotation: name === "frown" ? 14 : name === "wow" ? -8 : 0, y: name === "wow" ? -14 : 0, svgOrigin: O, duration: 0.15, ease: "none" }, t);
        tl.to(browG[1], { rotation: name === "frown" ? -14 : name === "wow" ? 8 : 0, y: name === "wow" ? -14 : 0, svgOrigin: O, duration: 0.15, ease: "none" }, t); return rig;
      },
      look(tl, t, dx, dy, oo = {}) { K.tw(tl, pupils, { x: dx, y: dy }, t, 0.17, oo); return rig; },
      blink(tl, t) { tl.set(lids, { opacity: 1 }, t); tl.set(lids, { opacity: 0 }, t + 2 / 15); return rig; },
      hop(tl, t, oo = {}) {
        const h = oo.height ?? 40;
        tl.to(lift, { scaleY: 0.95, scaleX: 1.02, svgOrigin: O, duration: 0.12, ease: "power1.out" }, t);
        tl.to(lift, { y: -h, scaleY: 1.02, scaleX: 0.99, svgOrigin: O, duration: 0.22, ease: "power2.out" }, t + 0.12);
        tl.to(lift, { y: 0, duration: 0.2, ease: "power2.in" }, t + 0.34);
        tl.to(lift, { scaleY: 0.96, scaleX: 1.02, svgOrigin: O, duration: 0.07 }, t + 0.54); tl.to(lift, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 0.15, ease: "power2.out" }, t + 0.61); return rig;
      },
    };
    return life(rig, body);
  }

  // ================================================================ 27. PASSBOOK (L14; also the bank's own book)
  // origin = centre (≈ 190 × 250). opts: acct("A/c XX12") rows([[text, amount], …]). open(tl,t) cover swings away to show the first page · entry(tl,t,i) writes row i · close(tl,t)
  function passbook(parent, x, y, s = 1, o = {}) {
    const { root, body } = mk(parent, x, y, s, o), W = 190, H = 250;
    const page = g(body, {});
    tex(shadow(page, 2), cutRect(-W / 2, -H / 2, W, H, 1.8, 24), "pat-paper");
    paper(page, cutRect(-W / 2 + 8, -H / 2 + 8, W - 16, 30, 1, 20), C.dr);
    const rowsD = o.rows || [["", ""], ["", ""], ["", ""]], rows = [];
    rowsD.forEach(([a, v], i) => {
      const yy = -H / 2 + 74 + i * 42, rg = g(page, {}), wp = wipe(rg, -W / 2 + 8, yy - 18, W - 16, 38);
      ink(rg, [[-W / 2 + 14, yy + 18], [W / 2 - 14, yy + 18]], 2, PENCIL, { opacity: 0.35 });
      if (a) TXT(wp.g, -W / 2 + 16, yy, a, { size: 20, anchor: "start", weight: 700 });
      if (v) TXT(wp.g, W / 2 - 16, yy, v, { size: 22, anchor: "end", weight: 800 });
      if (!a && !v) ink(wp.g, [[-W / 2 + 18, yy], [-W / 2 + 60, yy - 5], [W / 2 - 18, yy + 2]], 3, "#46424d", { opacity: 0.8 });
      wp.rect.setAttribute("width", "0"); rows.push(wp);
    });
    const coverPos = g(body, { transform: `translate(${-W / 2} 0)` }), cover = g(coverPos, {}), cv = g(cover, { transform: `translate(${W / 2} 0)` });
    paper(shadow(cv, 2), cutRect(-W / 2, -H / 2, W, H, 2, 24), C.navy);
    paper(cv, cutRect(-W / 2, -H / 2, 16, H, 1, 24), shade(C.navy, 0.3));
    K.medallion(cv, 6, -34, 40, "landmark", C.sky);
    paper(cv, cutRect(-W / 2 + 28, 24, W - 56, 8, 0.6, 14), C.gold);
    TXT(cv, 6, 68, o.acct || "A/c XX12", { size: 24, weight: 700, color: "#fff4e2" });
    const rig = {
      g: root, page, cover, rows,
      open(tl, t, oo = {}) { const d = oo.dur ?? 0.45; tl.to(cover, { scaleX: 0.02, svgOrigin: O, duration: d, ease: K.stepEase(d, "power2.inOut", t) }, t); tl.set(coverPos, { opacity: 0 }, t + d + 0.02); return rig; },
      close(tl, t, oo = {}) { const d = oo.dur ?? 0.4; tl.set(coverPos, { opacity: 1 }, t); tl.to(cover, { scaleX: 1, svgOrigin: O, duration: d, ease: K.stepEase(d, "power2.inOut", t) }, t); return rig; },
      entry(tl, t, i, oo = {}) { wipeOn(tl, rows[i], t, oo.dur ?? 0.5); return rig; },
    };
    return life(rig, body);
  }

  Object.assign(K, {
    napkin, confetti, envelope, calendarPage, dateTile, monthTiles, clipboard, packet, packets, hangTag, tissue, tissueBox, windLines, purse, magnifier, bookshelf, stallClosing, instantCamera, cinemaDoor, usherCap, paperTorch, ticketStub, claimString, coinStream, riverBridge, coinToken, cycleLoop, officeEvent, goldTick, bank, passbook,
  });
})();

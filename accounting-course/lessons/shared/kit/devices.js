// Paper cut-out SHARED DEVICES — load after kit.js + rig.js. Extends window.KIT.
// Series Bible §5 (devices 1–14). Deterministic + synchronous: no Math.random, no Date.
// Every method has the shape  method(tl, t, …)  — it adds tweens to the passed PAUSED timeline at absolute
// time `t` and returns the rig (chainable). Motion lock (L01 review + research/paper-cutout-jitter.md):
//   · entrances = DROP-AND-PLACE  (appear at 1.07× lifted → settle to 1, power2.out, no overshoot)
//   · exits     = LIFT OFF        (1.05× + fade, power2.in)
//   · NO idle sway / jitter / boil on holds; level-return = power2.inOut with NO overshoot
//   · numbers always COUNT (tickers), Indian grouping ₹1,06,700
// Geometry that scales/rotates is drawn around its local (0,0) in a group WITHOUT a transform attribute and
// tweened with svgOrigin "0 0" (same convention as rig.js). See RIG.md → "Devices".
(function () {
  const K = window.KIT, C = K.C;
  const { g, el, paper, tex, ink, shadow, cutRect, cutEll, cutPoly, cutStroke, arc, text } = K;
  const O = "0 0";
  const FPS = K.FPS || 15, STEP = 1 / FPS;
  let UID = 1;

  // ======================================================================================
  // shared helpers
  // ======================================================================================
  const hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  // positioned wrapper (carries the transform attribute) + animatable inner group (no transform attribute)
  const at = (parent, x, y, s = 1) => {
    const pos = g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` });
    const inner = g(pos, {});
    inner._pos = pos;
    return inner;
  };
  // rig root: translate+scale wrapper → `body` (enter/exit/pulse layer)
  const wrap = (parent, x, y, s, o = {}) => {
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const body = g(root, {});
    if (o.hidden) hide(body);
    return { root, body };
  };
  // drop-and-place entrance / lift-off exit (the house motion)
  function dropIn(tl, node, t, o = {}) {
    tl.fromTo(node, { autoAlpha: 0, scale: o.from || 1.07, svgOrigin: O },
      { autoAlpha: 1, scale: 1, svgOrigin: O, duration: o.dur || 0.34, ease: "power2.out", immediateRender: false }, t);
    return node;
  }
  function liftOff(tl, node, t, o = {}) {
    tl.to(node, { autoAlpha: 0, scale: o.to || 1.05, svgOrigin: O, duration: o.dur || 0.2, ease: "power2.in" }, t);
    return node;
  }
  // soft "lift 1.05× and settle" pulse (no overshoot)
  function pulseNode(tl, node, t, k = 1.06) {
    tl.to(node, { scale: k, svgOrigin: O, duration: 0.16, ease: "power2.out" }, t);
    tl.to(node, { scale: 1, svgOrigin: O, duration: 0.32, ease: "power2.inOut" }, t + 0.16);
  }
  function life(rig, body, st = {}) {
    rig.enter = (tl, t, o = {}) => { if (!st.touched) { hide(body); st.touched = true; } dropIn(tl, body, t, o); return rig; };
    rig.exit = (tl, t, o = {}) => { st.touched = true; liftOff(tl, body, t, o); return rig; };
    rig.pulse = rig.pulse || ((tl, t, k) => { pulseNode(tl, body, t, k); return rig; });
    return rig;
  }
  // coloured "light" ring (a paper outline, never a glow) — flashes on, holds, off
  function ring(parent, d, color = C.gold, w = 9) {
    return el("path", { d, fill: "none", stroke: color, "stroke-width": w, "stroke-linejoin": "round", opacity: 0 }, parent);
  }
  function flashRing(tl, node, t, hold = 1.2) {
    tl.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t);
    tl.to(node, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + hold);
  }

  // ---------- Indian grouping ----------
  const fmtIN = (n) => {
    n = Math.round(Math.abs(n));
    let s = String(n);
    if (s.length > 3) { const last = s.slice(-3); let rest = s.slice(0, -3); rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ","); s = rest + "," + last; }
    return s;
  };
  const money = (n, prefix = "₹", signed = false) => (n < 0 ? "−" : signed && n > 0 ? "+" : "") + prefix + fmtIN(n);

  // ======================================================================================
  // 11. TICKER — counting number, Indian grouping
  // ======================================================================================
  function ticker(parent, x, y, s = 1, o = {}) {
    const size = o.size || 44, prefix = o.prefix === undefined ? "₹" : o.prefix, signed = !!o.signed;
    const { root, body } = wrap(parent, x, y, s, o);
    if (o.chip) {
      const w = o.w || size * 6, h = o.h || size * 1.55;
      tex(shadow(body, 1), cutRect(-w / 2, -h / 2, w, h, 1.6, 22), "pat-paper");
      if (o.edge) paper(body, cutRect(-w / 2 + 12, h / 2 - 10, w - 24, 7, 0.5, 14), o.edge);
    }
    const fmt = (v) => money(Math.round(v), prefix, signed) + (o.suffix || "");
    const st = { v: o.value || 0 };
    const txt = text(body, 0, size * 0.04, fmt(st.v), { size, weight: o.weight || 800, color: o.color || C.ink, anchor: o.anchor || "middle" });
    const rig = {
      g: root, body, text: txt, size, fmt,
      get value() { return st.v; },
      // count from the current value to `value` (author calls in time order)
      to(tl, t, value, dur = 0.6, oo = {}) {
        const from = st.v, p = { v: from };
        tl.fromTo(p, { v: from }, { v: value, duration: Math.max(dur, 0.001), ease: oo.ease || "power1.out", immediateRender: false,
          onUpdate: () => { txt.textContent = fmt(p.v); } }, t);
        st.v = value;
        return rig;
      },
      set(tl, t, value) { return rig.to(tl, t, value, STEP); },
      pulse(tl, t, k) { pulseNode(tl, body, t, k); return rig; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // small art: faces for tags, cart sticker
  // ======================================================================================
  // pictogram faces for claim tags (NOT cast rigs): "ravi"|"gopal"|"meera"|"infotech"|"customer"|"electricity"
  function faceArt(parent, who, r = 40) {
    const grp = g(parent, {});
    const id = "kfc" + UID++;
    el("circle", { cx: 0, cy: 0, r }, el("clipPath", { id }, grp));
    const disc = g(grp, { "clip-path": `url(#${id})` });
    const bg = { meera: "#f6d9a0", ravi: "#cfe3c4", gopal: "#d8ecf7", customer: "#f7d4cb", infotech: "#d6e8f5", electricity: C.saffron }[who] || C.cream;
    paper(disc, cutEll(0, 0, r + 2, r + 2, 0.5), bg);
    if (who === "infotech") {
      paper(disc, cutRect(-r * 0.42, -r * 0.78, r * 0.84, r * 1.7, 1, 14), C.sky);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) paper(disc, cutRect(-r * 0.3 + i * r * 0.22, -r * 0.62 + j * r * 0.26, r * 0.13, r * 0.14, 0.2, 8), C.cream);
      return grp;
    }
    if (who === "electricity") { K.icon(disc, "zap", 0, 0, r * 1.25, C.ink, 2.2); return grp; }
    const skin = { meera: C.skin, ravi: "#a96a45", gopal: "#b57a52", customer: "#c08560" }[who] || C.skin;
    const top = { meera: C.mustard, ravi: C.white, gopal: C.white, customer: C.coral }[who] || C.white;
    paper(disc, cutEll(0, r * 0.98, r * 0.8, r * 0.5, 0.7), top);
    paper(disc, cutEll(0, -r * 0.08, r * 0.5, r * 0.56, 0.7), skin);
    if (who === "meera") {
      paper(disc, cutEll(0, -r * 0.36, r * 0.52, r * 0.32, 0.6), C.hair);
      paper(disc, cutEll(r * 0.34, -r * 0.7, r * 0.2, r * 0.2, 0.4), C.hair);
    }
    if (who === "customer") paper(disc, cutEll(0, -r * 0.38, r * 0.5, r * 0.3, 0.6), C.hair);
    if (who === "ravi") {
      paper(disc, cutEll(-r * 0.5, -r * 0.08, r * 0.1, r * 0.2, 0.3), C.grey);
      paper(disc, cutEll(r * 0.5, -r * 0.08, r * 0.1, r * 0.2, 0.3), C.grey);
    }
    if (who === "gopal") paper(disc, cutPoly([[-r * 0.54, -r * 0.3], [r * 0.54, -r * 0.3], [r * 0.4, -r * 0.72], [-r * 0.4, -r * 0.72]], 0.5, 10), C.white);
    [-1, 1].forEach((sd) => paper(disc, cutEll(sd * r * 0.2, -r * 0.1, r * 0.06, r * 0.06, 0.1), C.ink));
    if (who === "ravi" || who === "gopal") paper(disc, cutPoly([[-r * 0.28, r * 0.12], [0, r * 0.06], [r * 0.28, r * 0.12], [r * 0.18, r * 0.2], [0, r * 0.14], [-r * 0.18, r * 0.2]], 0.3, 6), who === "ravi" ? C.grey : C.ink);
    else ink(disc, arc(0, r * 0.08, r * 0.14, Math.PI * 0.2, Math.PI * 0.8, 6), 2.6);
    return grp;
  }

  // paper cart sticker (equipment). Lucide `shopping-cart` is not in icons.js yet → drawn locally. Centre (0,0), ~110 × 92.
  function cartArt(parent) {
    const grp = g(parent, {});
    tex(shadow(grp, 1), cutRect(-60, -50, 120, 100, 2, 20), "pat-paper");   // die-cut cream tile
    const b = shadow(grp, 1);
    paper(b, cutRect(-40, -4, 80, 26, 1.2, 12), C.wood);                    // counter
    paper(b, cutPoly([[-44, -6], [44, -6], [38, -26], [-38, -26]], 0.8, 10), C.saffron); // awning
    [-22, 0, 22].forEach((ax, i) => paper(grp, cutPoly([[ax - 10, -26], [ax + 10, -26], [ax + 10 - (i === 1 ? 0 : 1), -8], [ax - 10, -8]], 0.3, 10), i === 1 ? C.cream : C.saffron, { opacity: 0.9 }));
    ink(grp, [[-34, -26], [-34, -42]], 4, C.woodDark); ink(grp, [[34, -26], [34, -42]], 4, C.woodDark);
    [-26, 26].forEach((wx) => { paper(shadow(grp, 1), cutEll(wx, 28, 11, 11, 0.8), "#3b2a20"); paper(grp, cutEll(wx, 28, 4, 4, 0.3), C.brass); });
    ink(grp, [[44, 4], [62, -6]], 4, C.woodDark);
    return grp;
  }

  // ======================================================================================
  // 3. CLAIM TAG — paper tag on a string (face + ₹). Origin = bottom centre.
  // ======================================================================================
  const TAG_W = 220, TAG_H = 176;
  function tagPoly(w, h, k = 1) {
    return [[-w / 2 * k, (-h + 44) * k], [-(w / 2 - 34) * k, -h * k], [(w / 2 - 34) * k, -h * k], [w / 2 * k, (-h + 44) * k], [w / 2 * k, 0], [-w / 2 * k, 0]];
  }
  const polyD = (pts) => "M" + pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L") + " Z";
  // shared tag artwork (used by claimTag, equityCard's folded state, priceTag)
  function tagArt(parent, o = {}) {
    const w = o.w || TAG_W, h = o.h || TAG_H, hy = -h + 26;
    const grp = g(parent, {});
    // twine loop through the hole
    el("path", { d: `M0,${hy} C-30,${hy - 62} 30,${hy - 62} 0,${hy}`, fill: "none", stroke: "#7a6b58", "stroke-width": 3.2, "stroke-linecap": "round" }, grp);
    tex(shadow(grp, 1), cutPoly(tagPoly(w, h), 1.4, 16), o.kraft ? "pat-kraft" : "pat-paper");
    paper(grp, cutEll(0, hy, 17, 17, 0.5), "#e8dcc4");
    paper(grp, cutEll(0, hy, 8.5, 8.5, 0.3), "#6f6150");
    let ticker_ = null;
    if (o.face) faceArt(grp, o.face, o.faceR || 40).setAttribute("transform", `translate(0 ${-h * 0.56})`);
    if (o.amount !== undefined) ticker_ = ticker(grp, 0, o.face ? -26 : -h * 0.4, 1, { value: o.amount, size: o.size || 36, weight: 800, prefix: o.prefix });
    return { g: grp, ticker: ticker_, hole: [0, hy], w, h };
  }

  function claimTag(parent, x, y, s = 1, o = {}) {
    const { root, body } = wrap(parent, x, y, s, o);
    const strG = g(root, {});                       // strings sit behind the tag
    const bg = g(body, o.rot ? { transform: `rotate(${o.rot})` } : {});
    const halo = ring(bg, polyD(tagPoly(TAG_W, TAG_H, 1.07)), C.gold, 9);
    const art = tagArt(bg, { face: o.face || "customer", amount: o.amount, size: o.size });
    const st = { strings: [] };
    const rig = {
      g: root, body, art, tick_: art.ticker, strings: st.strings, string: null,
      tick(tl, t, from, to, dur = 0.6) {
        if (art.ticker) { if (from !== undefined && from !== art.ticker.value) art.ticker.set(tl, t - STEP, from); art.ticker.to(tl, t, to, dur); }
        return rig;
      },
      // reveal a twine from the tag's hole to (tx, ty) in the PARENT's coordinates (stroke-dash draw)
      stringTo(tl, t, tx, ty, oo = {}) {
        if (tx === undefined && o.string) { tx = o.string.toX; ty = o.string.toY; }
        const lx = (tx - x) / s, ly = (ty - y) / s, x0 = art.hole[0], y0 = art.hole[1];
        const mx = (x0 + lx) / 2, my = (y0 + ly) / 2 + Math.min(46, Math.hypot(lx - x0, ly - y0) * 0.12);
        let L = 0, px = x0, py = y0;
        for (let i = 1; i <= 24; i++) { const u = i / 24, qx = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * lx, qy = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * ly; L += Math.hypot(qx - px, qy - py); px = qx; py = qy; }
        const p = el("path", { d: `M${x0},${y0} Q${mx.toFixed(1)},${my.toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)}`, fill: "none", stroke: "#7a6b58", "stroke-width": 3.4, "stroke-linecap": "round", "stroke-dasharray": L.toFixed(1), "stroke-dashoffset": L.toFixed(1) }, strG);
        tl.to(p, { strokeDashoffset: 0, duration: oo.dur ?? 0.5, ease: "power2.out" }, t);
        st.strings.push(p); rig.string = p;
        return rig;
      },
      light(tl, t, oo = {}) { if (oo.color) halo.setAttribute("stroke", oo.color); flashRing(tl, halo, t, oo.hold ?? 1.2); return rig; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 2. JAR RIG — asset jar, label ON the jar, amount ticker. Origin = bottom centre.
  // ======================================================================================
  function jarRig(parent, x, y, s = 1, o = {}) {
    const w = o.w || 160, h = o.h || 196, kind = o.contents || "coins";
    const { root, body } = wrap(parent, x, y, s, o);
    paper(shadow(body, 2), cutRect(-w / 2, -h, w, h, 2, 20), C.glass, { opacity: 0.92 });
    // contents = N layers revealed bottom → top by fill(); each layer is its own group
    const cg = g(body, {}), layers = [];
    const mkLayer = () => { const l = g(cg, {}); layers.push(l); return l; };
    if (kind === "coins") for (let r = 0; r < 4; r++) {
      const l = mkLayer();
      for (let c = 0; c < 3; c++) K.coin(l, -w / 3 + c * (w / 3) + (r % 2 ? 10 : -6), -26 - r * 38 + K.sh(r * 3 + c) * 3, Math.min(22, w / 7), K.sh(r * 5 + c + 9) * 20);
    }
    if (kind === "notes") for (let i = 0; i < 5; i++) K.note(mkLayer(), K.sh(i) * 10, -28 - i * 28, w * 0.72, 40, K.sh(i + 3) * 12);
    if (kind === "leaves") for (let i = 0; i < 4; i++) {
      const l = mkLayer(), ly = -(i + 1) * 36 + 4;
      paper(l, cutRect(-w / 2 + 8, ly, w - 16, 38, 2, 12), C.leafTea);
      for (let k = 0; k < 4; k++) paper(l, cutEll(-w / 2 + 26 + k * ((w - 52) / 3), ly + 12 + (k % 2) * 12, 9, 5, 0.6), C.leaf, { opacity: 0.9 });
    }
    if (kind === "cart") cartArt(g(mkLayer(), { transform: `translate(0 ${-h * 0.4})` }));
    if (kind === "sticker") { const l = mkLayer(); if (o.icon) { paper(shadow(l, 1), cutEll(0, -h * 0.64, 46, 46, 1), C.cream); K.icon(l, o.icon, 0, -h * 0.64, 60, C.ink, 2.4); } }
    const n = layers.length, one = kind === "cart" || kind === "sticker";
    const fill0 = o.fill ?? (one ? 1 : 0.6);
    let cur = Math.round(fill0 * n);
    layers.forEach((l, i) => { if (i >= cur) hide(l); });
    paper(body, cutRect(-w / 2 + 10, -h + 10, 14, h - 30, 1, 20), "#ffffff", { opacity: 0.55 });   // glass shine
    paper(shadow(body, 1), cutRect(-w / 2 - 6, -h - 26, w + 12, 30, 2, 18), C.woodDark);          // lid
    // label ON the jar (text and/or icon) — can be tied on later with tieLabel()
    const lab = g(body, {}), lw = w - 18, lh = 54, hasLab = !!o.label || (o.icon && kind !== "sticker");
    if (hasLab) {
      ink(lab, [[-w / 2 + 6, -h + 6], [w / 2 - 6, -h + 6]], 3, C.goldDark, { opacity: 0.7 });        // twine round the neck
      tex(shadow(lab, 1), cutRect(-lw / 2, -h * 0.74 - lh / 2, lw, lh, 1.4, 18), "pat-paper");
    }
    if (o.icon && kind !== "sticker") {
      K.icon(lab, o.icon, o.label ? -lw / 2 + 28 : 0, -h * 0.74, 40, C.ink, 2.4);
    }
    if (o.label) {
      const tx = o.icon && kind !== "sticker" ? 18 : 0, avail = lw - 16 - (tx ? 46 : 0);
      const size = Math.max(22, Math.min(36, Math.floor(avail / (o.label.length * 0.56))));
      text(lab, tx, -h * 0.74 + 2, o.label, { size, weight: 800 });
    }
    if (o.labelHidden) hide(lab);
    // amount ticker
    let tk = null;
    if (o.amount !== undefined) tk = ticker(body, 0, -h * 0.27, 1, { value: o.amount, size: 38, chip: true, w: w - 10, h: 56, edge: o.edge });
    const halo = ring(body, "M" + [[-w / 2 - 10, -h - 34], [w / 2 + 10, -h - 34], [w / 2 + 10, 6], [-w / 2 - 10, 6]].map((p) => p.join(",")).join(" L") + " Z", C.gold, 9);
    const rig = {
      g: root, body, layers, label: lab, ticker: tk, w, h,
      // reveal / hide contents to a fraction (layers drop in bottom → top, stagger 2 frames)
      fill(tl, t, frac, oo = {}) {
        const m = Math.max(0, Math.min(n, Math.round(frac * n)));
        for (let i = cur; i < m; i++) dropIn(tl, layers[i], t + (i - cur) * 2 * STEP, { dur: 0.3 });
        for (let i = cur - 1; i >= m; i--) liftOff(tl, layers[i], t + (cur - 1 - i) * 2 * STEP, { dur: 0.2 });
        cur = m;
        return rig;
      },
      tick(tl, t, from, to, dur = 0.6) {
        if (tk) { if (from !== undefined && from !== tk.value) tk.set(tl, t - STEP, from); tk.to(tl, t, to, dur); }
        return rig;
      },
      tieLabel(tl, t) { dropIn(tl, lab, t); return rig; },
      // flies the paper cart/sticker in from (dx,dy) (jar-local px), lands with drop-and-place
      landSticker(tl, t, oo = {}) {
        const l = layers[0], dx = oo.dx ?? 260, dy = oo.dy ?? -120, dur = oo.dur ?? 0.8;
        tl.fromTo(l, { autoAlpha: 0, x: dx, y: dy, scale: 1.07, svgOrigin: O }, { autoAlpha: 1, duration: 0.1, immediateRender: false }, t);
        tl.to(l, { x: 0, duration: dur, ease: "power1.inOut" }, t);
        tl.to(l, { y: dy - 90, duration: dur * 0.5, ease: "power2.out" }, t);
        tl.to(l, { y: 0, scale: 1, svgOrigin: O, duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5);
        cur = 1;
        return rig;
      },
      light(tl, t, oo = {}) { if (oo.color) halo.setAttribute("stroke", oo.color); flashRing(tl, halo, t, oo.hold ?? 1.2); return rig; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 5. WHICH TWO THINGS CHANGED?  (bible §5.3 — one constant, identical every time)
  // ======================================================================================
  const SLOT_W = 340, SLOT_H = 124, CHIP_W = 334, CHIP_H = 118;
  function drawChip(parent, spec, prefix) {
    const col = spec.side === "R" || spec.side === "cr" || spec.side === "right" ? C.cr : C.dr;
    const grp = g(parent, {});
    paper(shadow(grp, 1), cutRect(-CHIP_W / 2, -CHIP_H / 2, CHIP_W, CHIP_H, 2, 22), col);
    const d = spec.delta, up = typeof d === "number" ? d > 0 : undefined;
    if (up !== undefined) {   // paper triangle: up (more) / down (less)
      const ax = -CHIP_W / 2 + 36;
      paper(shadow(grp, 1), cutPoly(up ? [[ax, -22], [ax + 22, 14], [ax - 22, 14]] : [[ax, 22], [ax + 22, -14], [ax - 22, -14]], 0.6, 10), C.cream);
    }
    const tx = up !== undefined ? 22 : 0;
    text(grp, tx, -24, spec.label || "", { size: 34, weight: 700, color: K.onColor(col) });
    if (d !== undefined) text(grp, tx, 22, typeof d === "number" ? money(d, prefix, true) : d, { size: 46, weight: 800, color: K.onColor(col) });
    return grp;
  }
  function whichTwo(parent, o = {}) {
    const dev = g(parent, {});
    const W = o.W || 1920, HH = o.H || 1080, cx = o.x ?? 960, cy = o.y ?? 150, S = o.s ?? 1, prefix = o.prefix === undefined ? "₹" : o.prefix;
    const veil = o.veil === false ? null : el("rect", { x: -60, y: -60, width: W + 120, height: HH + 120, fill: C.cream, style: "opacity:0" }, dev);
    const state = { runs: [], last: null };
    const rig = {
      g: dev, veil, runs: state.runs,
      // freeze → veil 30 % → slots drop in top-centre → `gap` s (tick_tock) → chips fill (blue left / orange right) → ding.
      // fill: [{label, delta, side:"L"|"R", at?}] or {pending:true} for a `?` slot filled later by fillSlot().
      run(tl, t, r = {}) {
        const n = r.slots || 2, gap = r.gap ?? 2.0, useVeil = !!veil && r.veil !== false, fill = r.fill || [];
        const t0 = t + (useVeil ? 0.12 : 0);
        if (useVeil) tl.to(veil, { opacity: 0.3, duration: 0.2, ease: "none" }, t);
        const step = (SLOT_W + 40) * S, slots = [], run = { slots, chips: [], pend: [], rings: [], prefix, useVeil };
        for (let i = 0; i < n; i++) {
          const slot = at(dev, cx + (i - (n - 1) / 2) * step, cy, S); hide(slot);
          paper(shadow(slot, 1), cutRect(-SLOT_W / 2, -SLOT_H / 2, SLOT_W, SLOT_H, 2, 22), C.cream, { opacity: 0.55 });
          el("path", { d: cutRect(-SLOT_W / 2 + 8, -SLOT_H / 2 + 8, SLOT_W - 16, SLOT_H - 16, 1.2, 24), fill: "none", stroke: C.ink, "stroke-width": 4.5, "stroke-dasharray": "16 11", "stroke-linecap": "round", opacity: 0.8 }, slot);
          dropIn(tl, slot, t0 + i * 0.1);
          slots.push(slot);
        }
        const tLand = t0 + 0.1 * (n - 1) + 0.34, tFill = tLand + gap;
        fill.forEach((f, i) => { if (f) rig._fill(tl, f.at ?? tFill + i * 0.15, i, f, run); });
        slots.tTick = tLand;                 // tick_tock starts here, runs `gap` s
        slots.tFill = tFill;
        slots.tDing = tFill + 0.06;          // ding_yes — light the jars/tags here
        slots.tEnd = tFill + 0.15 * Math.max(0, n - 1) + 0.4;
        state.runs.push(run); state.last = run;
        return slots;
      },
      _fill(tl, t, i, f, run) {
        const slot = run.slots[i];
        if (f.pending) {
          const q = at(slot, 0, 4, 0.8); hide(q); K.qmark(q, 0, 4, 1, C.dr); dropIn(tl, q, t); run.pend[i] = q;
          return;
        }
        if (run.pend[i]) liftOff(tl, run.pend[i], t, { dur: 0.12 });
        const chip = at(slot, 0, 0); hide(chip); drawChip(chip, f, run.prefix); dropIn(tl, chip, t);
        run.chips[i] = chip;
        const rg = ring(slot, polyD([[-CHIP_W / 2 - 10, -CHIP_H / 2 - 10], [CHIP_W / 2 + 10, -CHIP_H / 2 - 10], [CHIP_W / 2 + 10, CHIP_H / 2 + 10], [-CHIP_W / 2 - 10, CHIP_H / 2 + 10]]), C.gold, 8);
        flashRing(tl, rg, t + 0.1, 0.7);     // the "ding" light
        run.rings[i] = rg;
      },
      // fill one slot later (e.g. Meera fills slot 1, the viewer names slot 2)
      fillSlot(tl, t, i, spec) { rig._fill(tl, t, i, spec, state.last); return rig; },
      // lift everything off, veil out
      clear(tl, t) {
        const run = state.last; if (!run) return rig;
        run.slots.forEach((sl, i) => liftOff(tl, sl, t + i * 0.05));
        run.chips.forEach((c, i) => c && liftOff(tl, c, t + i * 0.05));
        run.pend.forEach((q) => q && liftOff(tl, q, t));
        if (veil && run.useVeil) tl.to(veil, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, t);
        return rig;
      },
    };
    return rig;
  }

  // ======================================================================================
  // 4. EQUITY CARD — Meera's tag unfolds into a card with pockets. Origin = bottom centre.
  // ======================================================================================
  const PK_W = 210, PK_H = 200, PK_GAP = 16, CARD_H = 352;
  function equityCard(parent, x, y, s = 1, o = {}) {
    const n0 = o.pockets || 2, capital = o.capital ?? 50000;
    const { root, body } = wrap(parent, x, y, s, o);
    const W2 = 2 * PK_W + PK_GAP + 48, W3 = 3 * PK_W + 2 * PK_GAP + 48;
    // folded state: Meera's tag, bottom-centre footprint
    const tagG = g(body, {});
    tagArt(tagG, { face: "meera", amount: capital });
    // unfolded card
    const card = g(body, {}); hide(card);
    const mkBack = (W) => { const b = g(card, {}); tex(shadow(b, 2), cutRect(-W / 2, -CARD_H, W, CARD_H, 2, 24), "pat-paper"); return b; };
    const back2 = mkBack(W2), back3 = mkBack(W3);
    hide(n0 === 3 ? back2 : back3);
    const head = g(card, {});
    faceArt(head, "meera", 34).setAttribute("transform", `translate(-78 ${-CARD_H + 56})`);
    text(head, 28, -CARD_H + 58, "Equity", { size: 44, weight: 800 });
    const pk = {}, list = [];
    const posFor = (i, nShown) => (nShown === 3 ? [-(PK_W + PK_GAP), 0, PK_W + PK_GAP][i] : [-(PK_W + PK_GAP) / 2, (PK_W + PK_GAP) / 2][i]);
    const mkPocket = (name, i, nShown, opt = {}) => {
      const wrapG = g(card, {}), inner = g(wrapG, {});
      gsap.set(inner, { x: posFor(i, nShown) });
      const dashed = !!opt.dashed;
      const bk = g(inner, {}), slips = g(inner, {}), fr = g(inner, {});
      paper(shadow(bk, 1), cutRect(-PK_W / 2, -PK_H, PK_W, PK_H, 2, 20), dashed ? "#efe2c8" : "#cdb691");
      const frontPts = [[-PK_W / 2, -PK_H * 0.6], [0, -PK_H * 0.53], [PK_W / 2, -PK_H * 0.6], [PK_W / 2, 0], [-PK_W / 2, 0]];
      tex(shadow(fr, 1), cutPoly(frontPts, 1.2, 18), "pat-paper");
      if (!dashed) paper(fr, cutPoly(frontPts, 1.2, 18), opt.tone || "#f3dcae", { opacity: 0.55 });
      if (dashed) el("path", { d: cutRect(-PK_W / 2 + 7, -PK_H * 0.6 + 7, PK_W - 14, PK_H * 0.6 - 14, 1, 22), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", opacity: 0.75 }, fr);
      const lab = g(fr, {});
      const nm = text(lab, 0, -PK_H * 0.43, opt.unnamed ? "?" : name, { size: 34, weight: 800, color: dashed ? C.coralText : C.ink });
      let nm2 = null;
      if (opt.unnamed) { nm2 = text(lab, 0, -PK_H * 0.43, "", { size: 34, weight: 800 }); hide(nm2); }
      const amt = opt.amount;
      const tk = ticker(fr, 0, -PK_H * 0.2, 1, { value: amt || 0, size: 40, weight: 800, color: dashed ? C.coralText : C.ink });
      if (amt === undefined) hide(tk.body);
      const rg = ring(inner, polyD([[-PK_W / 2 - 8, -PK_H - 8], [PK_W / 2 + 8, -PK_H - 8], [PK_W / 2 + 8, 6], [-PK_W / 2 - 8, 6]]), C.gold, 8);
      const P = { name, i, wrap: wrapG, inner, back: bk, front: fr, slips, lab, nm, nm2, ticker: tk, ring: rg, total: amt || 0, shown: amt !== undefined, nslips: 0, dashed, unnamed: !!opt.unnamed };
      pk[name] = P; list.push(P);
      return P;
    };
    mkPocket("Capital", 0, n0, { amount: capital, tone: "#ecd19a" });
    mkPocket("Profit", 1, n0, { unnamed: !!o.unnamed, amount: o.profit, tone: "#fbeed3" });
    if (n0 === 3) mkPocket("Drawings", 2, 3, { dashed: true, amount: o.drawings });
    const state = { n: n0, unfolded: false };
    list.forEach((P) => hide(P.wrap));
    const get = (p) => (typeof p === "number" ? list[p] : pk[p] || list.find((q) => q.nm2 && q.nm2.textContent === p));
    const rig = {
      g: root, body, tag: tagG, card, pockets: pk, list,
      // tag → card: tag lifts off, the card opens from the tag's footprint, pockets drop in one by one
      unfold(tl, t, oo = {}) {
        const dur = oo.dur ?? 0.55;
        liftOff(tl, tagG, t, { dur: 0.22 });
        tl.fromTo(card, { autoAlpha: 0, scaleX: 0.4, scaleY: 0.5, svgOrigin: O }, { autoAlpha: 1, scaleX: 1, scaleY: 1, svgOrigin: O, duration: dur, ease: "power2.out", immediateRender: false }, t + 0.1);
        list.forEach((P, i) => { if (i < state.n) dropIn(tl, P.wrap, t + 0.1 + dur * 0.8 + i * 0.14); });
        state.unfolded = true;
        return rig;
      },
      fold(tl, t, oo = {}) {
        list.forEach((P) => liftOff(tl, P.wrap, t, { dur: 0.15 }));
        tl.to(card, { autoAlpha: 0, scaleX: 0.4, scaleY: 0.5, svgOrigin: O, duration: 0.35, ease: "power2.in" }, t + 0.1);
        tl.fromTo(tagG, { autoAlpha: 0, scale: 1.07, svgOrigin: O }, { autoAlpha: 1, scale: 1, svgOrigin: O, duration: 0.34, ease: "power2.out", immediateRender: false }, t + 0.3);
        return rig;
      },
      // drops a slip (paper chit with a signed amount) into a pocket; pocket total ticks (unless noTotal)
      slip(tl, t, pocket, amount, oo = {}) {
        const P = get(pocket), dur = oo.dur ?? 0.5;
        const k = P.nslips++, sx = (k % 2 ? 18 : -10), fy = -PK_H * 0.74 - (k > 1 ? 6 : 0);
        const sl = at(P.slips, sx, fy); hide(sl);
        const sw = oo.icon ? 196 : 160, sh_ = 84;
        const rot = k % 2 ? 4 : -3;
        const sg = g(sl, { transform: `rotate(${rot})` });
        tex(shadow(sg, 1), cutRect(-sw / 2, -sh_ / 2, sw, sh_, 1.4, 18), "pat-paper");
        if (oo.icon) { K.icon(sg, oo.icon, -sw / 2 + 30, 0, 36, C.ink, 2.4); }
        text(sg, oo.icon ? 22 : 0, 2, money(amount, "₹", true), { size: 34, weight: 800, color: amount < 0 ? C.coralText : C.ink });
        const fx = oo.from ? oo.from[0] : 0, fyy = oo.from ? oo.from[1] : -150;
        tl.fromTo(sl, { autoAlpha: 0, x: fx, y: fyy }, { autoAlpha: 1, duration: 0.12, immediateRender: false }, t);
        tl.to(sl, { x: 0, y: 0, duration: dur, ease: "power2.out" }, t);
        P.total += amount;
        if (!oo.noTotal && !(P.unnamed && !P.nameDone)) {
          if (!P.shown) { dropIn(tl, P.ticker.body, t + dur); P.shown = true; }
          P.ticker.to(tl, t + dur, P.total, 0.5);
        }
        return rig;
      },
      // direct ticker change of a pocket (Capital never moves — only call it for Profit / Drawings)
      pocketTick(tl, t, pocket, to, dur = 0.6) {
        const P = get(pocket);
        if (!P.shown) { dropIn(tl, P.ticker.body, t); P.shown = true; }
        P.ticker.to(tl, t, to, dur); P.total = to;
        return rig;
      },
      // the `?` label flips (fake scaleX) to its name; optional value counts up inside
      namePocket(tl, t, name, oo = {}) {
        const P = list.find((q) => q.unnamed && !q.nameDone) || list[1];
        P.nm2.textContent = name; P.name = name; pk[name] = P;
        tl.to(P.lab, { scaleX: 0.05, svgOrigin: `0 ${-PK_H * 0.43}`, duration: 0.17, ease: "power1.in" }, t);
        tl.set(P.nm, { opacity: 0 }, t + 0.17); tl.set(P.nm2, { opacity: 1 }, t + 0.17);
        tl.to(P.lab, { scaleX: 1, svgOrigin: `0 ${-PK_H * 0.43}`, duration: 0.18, ease: "power1.out" }, t + 0.17);
        P.nameDone = true;
        const v = oo.value ?? P.total;
        if (v !== undefined && v !== 0) { if (!P.shown) { dropIn(tl, P.ticker.body, t + 0.35); P.shown = true; } P.ticker.to(tl, t + 0.35, v, 0.6); P.total = v; }
        return rig;
      },
      // third pocket (dashed, negative): card widens, pockets re-centre
      addPocket(tl, t, name = "Drawings", oo = {}) {
        if (state.n === 3) return rig;
        const P = pk[name] || mkPocket(name, 2, 3, { dashed: true, amount: oo.amount });
        hide(P.wrap);
        liftOff(tl, back2, t, { dur: 0.18 });
        dropIn(tl, back3, t + 0.05);
        [0, 1].forEach((i) => tl.to(list[i].inner, { x: posFor(i, 3), duration: 0.45, ease: "power2.inOut" }, t));
        dropIn(tl, P.wrap, t + 0.35);
        state.n = 3;
        return rig;
      },
      light(tl, t, pocket, oo = {}) { const P = get(pocket); if (oo.color) P.ring.setAttribute("stroke", oo.color); flashRing(tl, P.ring, t, oo.hold ?? 1.2); return rig; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 1. SCALE RIG — taraazu (balance scale). Origin = bottom centre of the base.
  //    Local frame: beam pivot (0,-540), beam half-span 380, pan dish top y = -270 when level.
  // ======================================================================================
  const S_H = 380, S_BY = -540, S_PAN = 270, S_PW = 170, S_HX = 150;
  function scaleRig(parent, x, y, s = 1, o = {}) {
    const mini = !!o.mini, TH = mini ? 2.2 : 1;
    const outer = g(parent, {});                         // HUD layer (no transform attribute)
    const { root, body } = wrap(outer, x, y, s, o);
    const stand = shadow(body, 2);
    paper(stand, cutPoly([[-150, 0], [150, 0], [96, -46], [-96, -46]], 2, 20), C.brass);
    paper(stand, cutRect(-18 * (mini ? 1.5 : 1), S_BY, 36 * (mini ? 1.5 : 1), -S_BY - 46, 1.6, 30), C.brass);
    const beamPos = g(body, { transform: `translate(0 ${S_BY})` });
    const beam = g(beamPos, {});
    paper(shadow(beam, 2), cutStroke([[-S_H, 0], [S_H, 0]], 22 * (mini ? 1.7 : 1), 1.5), C.goldDark);
    [-1, 1].forEach((sd) => paper(beam, cutEll(sd * S_H, 0, 14 * (mini ? 1.5 : 1), 14 * (mini ? 1.5 : 1), 0.8), C.brass));
    const pans = {}, hangs = {};
    const dish = [[-S_PW, S_PAN], [S_PW, S_PAN], [S_PW - 46, S_PAN + 46], [-S_PW + 46, S_PAN + 46]];
    [-1, 1].forEach((sd) => {
      const key = sd < 0 ? "L" : "R";
      const hang = g(g(beam, { transform: `translate(${sd * S_H} 0)` }), {});
      ink(hang, [[0, 0], [-S_HX, S_PAN]], 3 * TH, C.goldDark);
      ink(hang, [[0, 0], [S_HX, S_PAN]], 3 * TH, C.goldDark);
      paper(shadow(hang, 2), cutPoly(dish, 1.6, 18), C.brass);
      const tintG = g(g(hang, { transform: `translate(0 ${S_PAN + 23})` }), {});
      paper(tintG, cutPoly(dish.map(([px, py]) => [px * 0.96, (py - S_PAN - 23) * 0.9]), 1.4, 18), sd < 0 ? C.dr : C.cr);
      if (!(o.tint === true || o.tint === "both" || o.tint === key)) hide(tintG);
      const pg = at(hang, 0, S_PAN);                     // pan content group: origin = pan top centre, content grows UP (−y)
      let tot = null, chipBoost = null;
      if (!mini && o.totals !== false) {
        chipBoost = g(g(hang, { transform: `translate(0 ${S_PAN + 100})` }), {});
        tot = ticker(chipBoost, 0, 0, 1, { value: o[key] || 0, size: 44, chip: true, w: 250, h: 70, edge: sd < 0 ? C.dr : C.cr });
      }
      const labels = g(hang, {});
      pans[key] = { key, g: pg, hang, tint: tintG, total: tot, chipBoost, labels: [], labelsG: labels };
      hangs[key] = hang;
    });
    // pivot disc on top of the hangers
    paper(shadow(beamPos, 2), cutEll(0, 0, 26 * (mini ? 1.4 : 1), 26 * (mini ? 1.4 : 1), 1), C.brass);
    paper(beamPos, cutEll(0, 0, 9, 9, 0.5), C.goldDark);
    // equation strip
    const eqW = o.eqW || 1040;
    const eqOuter = g(body, { transform: "translate(0 118)" }), eqG = g(eqOuter, {});
    if (!mini) { tex(shadow(eqG, 1), cutRect(-eqW / 2, -44, eqW, 88, 2, 24), "pat-paper"); if (!o.equation) hide(eqG); }
    // level line (flashes across the pans)
    const LW = S_H + S_PW + 50, LL = LW * 2;
    const lvl = el("path", { d: `M${-LW},${S_BY + S_PAN + 2} L${LW},${S_BY + S_PAN + 2}`, fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": LL, "stroke-dashoffset": LL, opacity: 0.85 }, body);
    // mini: pictogram slot + arrow pair
    let slot = null;
    if (mini) {
      const sg = at(body, 0, S_BY - 150);
      tex(shadow(sg, 1), cutEll(0, 0, 84, 84, 1.2), "pat-paper");
      el("circle", { cx: 0, cy: 0, r: 70, fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-dasharray": "14 10", opacity: 0.55 }, sg);
      slot = { g: sg };
    }
    const st = { deg: 0, eq: null, hud: false, arrows: [] };
    const clamp6 = (d) => Math.max(-6, Math.min(6, d));
    const rig = {
      g: outer, root, body, beam, pans, hangs, slot, holdUntil: 0, holds: [], eqG,
      x, y, s,
      // +deg = LEFT (assets) pan goes DOWN (left heavy); −deg = right heavy. ≤ 6°, smooth, pans counter-rotate to hang level.
      tilt(tl, t, deg, oo = {}) {
        deg = clamp6(deg);
        const dur = oo.dur ?? 0.8, ease = oo.ease || "power2.out";
        tl.to(beam, { rotation: -deg, svgOrigin: O, duration: dur, ease }, t);
        [hangs.L, hangs.R].forEach((h) => tl.to(h, { rotation: deg, svgOrigin: O, duration: dur, ease }, t));
        st.deg = deg;
        return rig;
      },
      // back to level: power2.inOut, NO overshoot, then a 1.5 s hold (rig.holdUntil / rig.holds)
      settle(tl, t, oo = {}) {
        const dur = oo.dur ?? 0.9;
        rig.tilt(tl, t, 0, { dur, ease: "power2.inOut" });
        rig.holdUntil = t + dur + (oo.hold ?? 1.5); rig.holds.push([t + dur, rig.holdUntil]);
        return rig;
      },
      levelFlash(tl, t) {
        tl.fromTo(lvl, { strokeDashoffset: LL, opacity: 0.85 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, t);
        tl.to(lvl, { opacity: 0, duration: 0.3, ease: "power1.in" }, t + 0.3 + 0.55);
        return rig;
      },
      setTotals(tl, t, L, R, oo = {}) {
        const dur = oo.dur ?? 0.7;
        if (L !== undefined && pans.L.total) pans.L.total.to(tl, t, L, dur);
        if (R !== undefined && pans.R.total) pans.R.total.to(tl, t, R, dur);
        return rig;
      },
      pulseTotal(tl, t, side = "both") { ["L", "R"].forEach((k) => { if ((side === "both" || side === k) && pans[k].total) pans[k].total.pulse(tl, t); }); return rig; },
      // blue / orange pan tint (drops onto the dish)
      tint(tl, t, side = "both", on = true) {
        ["L", "R"].forEach((k) => {
          if (side !== "both" && side !== k) return;
          if (on) tl.fromTo(pans[k].tint, { autoAlpha: 0, scale: 1.12, svgOrigin: O }, { autoAlpha: 1, scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.out", immediateRender: false }, t);
          else liftOff(tl, pans[k].tint, t, { dur: 0.2 });
        });
        return rig;
      },
      // label chips hanging under a pan; line = "Assets" or {text, value} (value → counting sub-total)
      labelPan(tl, t, side, lines, oo = {}) {
        const P = pans[side === "left" || side === "L" ? "L" : "R"], out = [];
        [].concat(lines).forEach((ln, i) => {
          const spec = typeof ln === "string" ? { text: ln } : ln, col = P.key === "L" ? C.dr : C.cr;
          const lab = at(P.labelsG, 0, S_PAN + 100 + 74 + P.labels.length * 62); hide(lab);
          const lw = 380, lh = 54;
          paper(shadow(lab, 1), cutRect(-lw / 2, -lh / 2, lw, lh, 1.6, 18), col);
          let sub = null;
          if (spec.value !== undefined) { text(lab, -lw / 2 + 18, 2, spec.text, { size: 34, weight: 800, color: K.onColor(col), anchor: "start" }); sub = ticker(lab, lw / 2 - 18, 2, 1, { value: spec.value, size: 34, anchor: "end", color: K.onColor(col), weight: 800 }); }
          else text(lab, 0, 2, spec.text, { size: 36, weight: 800, color: K.onColor(col) });
          dropIn(tl, lab, t + (oo.stagger ?? 0.14) * i + P.labels.length * 0);
          const item = { g: lab, ticker: sub }; P.labels.push(item); out.push(item);
        });
        return rig;
      },
      // equation strip under the scale — old text lifts off, new text drops (left = blue, right = orange)
      equation(tl, t, str, oo = {}) {
        const w = g(eqG, {}); hide(w);
        const tx = el("text", { x: 0, y: 3, "font-family": "'Baloo 2', sans-serif", "font-size": oo.size || 46, "font-weight": 800, "text-anchor": "middle", "dominant-baseline": "central", fill: C.ink }, w);
        const parts = str.split("=");
        if (parts.length === 2 && !oo.plain) {
          el("tspan", { fill: C.drText }, tx).textContent = parts[0].trim();
          el("tspan", { fill: C.ink }, tx).textContent = "  =  ";
          el("tspan", { fill: C.crText }, tx).textContent = parts[1].trim();
        } else tx.textContent = str;
        if (!st.eq && !o.equation) dropIn(tl, eqG, t);
        else if (st.eq) liftOff(tl, st.eq, t, { dur: 0.16 });
        dropIn(tl, w, t + (st.eq ? 0.1 : 0.05));
        st.eq = w;
        return rig;
      },
      eqPulse(tl, t) { pulseNode(tl, eqG, t, 1.05); return rig; },
      // corner HUD: shrinks the whole scale to ~k (0.28) at top-right and back. In HUD the pan totals become big chips,
      // labels + equation strip hide. Opts: k, right, top (px from frame edges), W (frame width), dur, text (chip text px).
      hud(tl, t, on = true, oo = {}) {
        const k = oo.k ?? 0.28, right = oo.right ?? 48, top = oo.top ?? 130, dur = oo.dur ?? 0.8, Wf = oo.W ?? 1920;
        const ease = "power2.inOut";
        if (on) {
          const dx = (Wf - right) - x - k * s * 640, dy = top - y + 600 * k * s;
          tl.to(outer, { x: dx, y: dy, scale: k, svgOrigin: `${x} ${y}`, duration: dur, ease }, t);
          const b = (oo.text ?? 30) / (44 * k * s);
          ["L", "R"].forEach((kk) => { const P = pans[kk]; if (P.chipBoost) tl.to(P.chipBoost, { scale: b, y: 62, svgOrigin: O, duration: dur, ease }, t); tl.to(P.labelsG, { autoAlpha: 0, duration: 0.2 }, t); });
          tl.to(eqOuter, { autoAlpha: 0, duration: 0.2 }, t);
        } else {
          tl.to(outer, { x: 0, y: 0, scale: 1, svgOrigin: `${x} ${y}`, duration: dur, ease }, t);
          ["L", "R"].forEach((kk) => { const P = pans[kk]; if (P.chipBoost) tl.to(P.chipBoost, { scale: 1, y: 0, svgOrigin: O, duration: dur, ease }, t); tl.to(P.labelsG, { autoAlpha: 1, duration: 0.25 }, t + dur * 0.6); });
          tl.to(eqOuter, { autoAlpha: 1, duration: 0.25 }, t + dur * 0.6);
        }
        st.hud = on;
        return rig;
      },
      // mini only: ↑↑ ↓↓ ⇄ ⇄ paper arrow pair under the pans. kind: "upup" | "downdown" | "swapL" | "swapR"
      arrows(tl, t, kind) {
        const mkArrow = (parent, ax, ay, dir, col) => { const a = g(parent, {}); K.arrowShape(a, ax, ay, 150, col, 1, dir === "up" ? 90 : dir === "down" ? -90 : dir === "right" ? 180 : 0, 40); return a; };
        const made = [];
        const put = (key, spec) => {
          const gp = at(pans[key].hang, 0, S_PAN + 140); hide(gp);
          const col = key === "L" ? C.dr : C.cr;
          spec.forEach(([dx, dy, d]) => mkArrow(gp, dx, dy, d, col));
          made.push(gp);
        };
        if (kind === "upup") { put("L", [[0, 0, "up"]]); put("R", [[0, 0, "up"]]); }
        if (kind === "downdown") { put("L", [[0, 0, "down"]]); put("R", [[0, 0, "down"]]); }
        if (kind === "swapL") put("L", [[0, -28, "right"], [0, 36, "left"]]);
        if (kind === "swapR") put("R", [[0, -28, "right"], [0, 36, "left"]]);
        made.forEach((m, i) => dropIn(tl, m, t + i * 0.1));
        st.arrows.push(made);
        return rig;
      },
      clearArrows(tl, t) { st.arrows.flat().forEach((m) => liftOff(tl, m, t)); st.arrows = []; return rig; },
    };
    life(rig, body);
    // enter/exit on the hud layer would fight the HUD tweens → they act on `body` only (above)
    return rig;
  }
  const miniScale = (parent, x, y, s = 0.32, o = {}) => scaleRig(parent, x, y, s, { ...o, mini: true });
  scaleRig.mini = miniScale;

  // ======================================================================================
  // 6. STAMP — red ✗ rubber stamp. 1.25 → 1.0 power3.out, NO shake, NO settle wobble.
  //    New signature  K.stamp(tl, parent, x, y, t, s)  — the old stills-kit  K.stamp(parent, x, y, r, rot)  still works.
  // ======================================================================================
  const stampStill = K.stamp;
  function stampRig(tl, parent, x, y, t, s = 1, o = {}) {
    const { root, body } = wrap(parent, x, y, s, { hidden: true });
    const art = g(body, { transform: `rotate(${o.rot ?? -8})`, opacity: 0.92 });
    const r = 70;
    ink(art, arc(0, 0, r, 0, Math.PI * 2, 28), 10, C.red);
    ink(art, arc(0, 0, r * 0.82, 0, Math.PI * 2, 24), 3, C.red, { opacity: 0.7 });
    ink(art, [[-r * 0.42, -r * 0.42], [r * 0.42, r * 0.42]], 15, C.red);
    ink(art, [[r * 0.42, -r * 0.42], [-r * 0.42, r * 0.42]], 15, C.red);
    tl.fromTo(body, { autoAlpha: 0, scale: 1.25, svgOrigin: O }, { autoAlpha: 1, scale: 1, svgOrigin: O, duration: 0.18, ease: "power3.out", immediateRender: false }, t);
    const rig = { g: root, body, lift(tl2, t2, oo) { liftOff(tl2, body, t2, oo); return rig; } };
    return rig;
  }
  function stamp(a, ...rest) { return a && typeof a.fromTo === "function" ? stampRig(a, ...rest) : stampStill(a, ...rest); }

  // ======================================================================================
  // 7. IMAGINE CARD — dashed border + thought-cloud corner (hypotheticals, not in the books)
  // ======================================================================================
  function imagineCard(parent, x, y, w, h, o = {}) {
    const root = g(parent, { transform: `translate(${x} ${y}) rotate(${o.rot || 0})` });
    const body = g(root, {});
    if (o.hidden) hide(body);
    tex(shadow(body, 2), cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    el("path", { d: cutRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 1.4, 26), fill: "none", stroke: C.ink, "stroke-width": 4.5, "stroke-dasharray": "18 12", "stroke-linecap": "round", opacity: 0.6 }, body);
    // thought-cloud corner (top-left, overlapping the corner) + two trailing bubbles
    const cl = g(body, {}), cx = -w / 2 + 6, cy = -h / 2 + 6;
    const cs = shadow(cl, 1);
    [[0, 0, 44, 36], [-40, 10, 30, 26], [38, 12, 30, 26], [-8, -22, 30, 24]].forEach(([dx, dy, rx, ry]) => tex(cs, cutEll(cx + dx, cy + dy, rx, ry, 1.5), "pat-paper"));
    tex(cs, cutEll(cx - 58, cy + 52, 11, 10, 0.8), "pat-paper"); tex(cs, cutEll(cx - 76, cy + 74, 7, 6, 0.6), "pat-paper");
    K.icon(cl, "lightbulb", cx, cy, 46, C.saffron, 2.4);
    const area = at(body, 0, 0);
    const rig = { g: root, body, area: { g: area, x: -w / 2, y: -h / 2, w, h } };
    return life(rig, body);
  }

  // ======================================================================================
  // 8. PAUSE MEDALLION + CHECKPOINT BANNER
  // ======================================================================================
  function pauseMedallion(parent, x, y, s = 1, o = {}) {
    const { root, body } = wrap(parent, x, y, s, o);
    const R = 130, RR = 168, CIRC = 2 * Math.PI * RR;
    paper(shadow(body, 2), cutEll(0, 0, R + 16, R + 16, 1.8), C.cream);        // cream rim so the disc reads on a saffron scene
    paper(body, cutEll(0, 0, R, R, 1.8), C.saffron);
    paper(body, cutEll(0, 0, R - 20, R - 20, 1.4), "#e69522", { opacity: 0.55 });
    const bars = g(body, {});
    [-1, 1].forEach((sd) => paper(shadow(bars, 1), cutRect(sd * 36 - 17, -52, 34, 104, 1.4, 14), C.cream));
    el("circle", { cx: 0, cy: 0, r: RR, fill: "none", stroke: C.cream, "stroke-width": 14, opacity: 0.3 }, body);
    const arcRing = el("circle", { cx: 0, cy: 0, r: RR, fill: "none", stroke: C.cream, "stroke-width": 14, "stroke-linecap": "round", "stroke-dasharray": CIRC.toFixed(1), "stroke-dashoffset": 0, transform: "rotate(-90)" }, body);
    const digits = [3, 2, 1].map((d) => { const dg = g(body, {}); hide(dg); text(dg, 0, 6, String(d), { size: 150, weight: 800, color: C.cream }); return dg; });
    const rig = {
      g: root, body, bars, ring: arcRing, digits,
      // 3-2-1 ring drains over 3.2 s (linear); digits swap on thirds
      countdown(tl, t, oo = {}) {
        const dur = oo.dur ?? 3.2;
        tl.fromTo(arcRing, { strokeDashoffset: 0 }, { strokeDashoffset: CIRC, duration: dur, ease: "none", immediateRender: false }, t);
        tl.to(bars, { autoAlpha: 0, duration: 0.12 }, t);
        digits.forEach((dg, i) => {
          const ti = t + (i * dur) / 3;
          dropIn(tl, dg, ti, { dur: 0.28 });
          if (i < 2) liftOff(tl, dg, ti + dur / 3 - 0.14, { dur: 0.14 });
        });
        return rig;
      },
    };
    return life(rig, body);
  }

  function checkpointBanner(parent, x, y, s = 1, n = 1, o = {}) {
    const { root, body } = wrap(parent, x, y, s, o);
    const BW = 780, BH = 150;
    // swallowtail tails behind, folds, ribbon
    const tails = shadow(body, 1);
    paper(tails, cutPoly([[-BW / 2 - 40, -BH / 2 + 22], [-BW / 2 + 30, -BH / 2 + 22], [-BW / 2 + 30, BH / 2 + 22], [-BW / 2 - 40, BH / 2 + 22], [-BW / 2 - 8, 22]], 1.4, 14), C.redDark);
    paper(tails, cutPoly([[BW / 2 + 40, -BH / 2 + 22], [BW / 2 - 30, -BH / 2 + 22], [BW / 2 - 30, BH / 2 + 22], [BW / 2 + 40, BH / 2 + 22], [BW / 2 + 8, 22]], 1.4, 14), C.redDark);
    paper(shadow(body, 2), cutRect(-BW / 2, -BH / 2, BW, BH, 2, 28), C.red);
    paper(body, cutRect(-BW / 2 + 12, -BH / 2 + 12, BW - 24, BH - 24, 1.2, 28), C.redShade || "#a32a22", { opacity: 0.35 });
    // paper flag (Lucide `flag` is not in icons.js yet → drawn locally)
    const fx = -BW / 2 + 70;
    ink(body, [[fx - 22, 46], [fx - 22, -48]], 7, C.cream);
    paper(shadow(body, 1), cutPoly([[fx - 22, -48], [fx + 34, -36], [fx + 6, -20], [fx + 34, -4], [fx - 22, -8]], 1, 10), C.saffron);
    const label = text(body, 44, 4, "Checkpoint " + n, { size: 78, weight: 800, color: C.cream });
    const rig = { g: root, body, label,
      // ribbon rolls open from its centre (scaleX) — an alternative to enter()
      unfurl(tl, t, oo = {}) {
        tl.fromTo(body, { autoAlpha: 0, scaleX: 0.15, scaleY: 1.04, svgOrigin: O }, { autoAlpha: 1, scaleX: 1, scaleY: 1, svgOrigin: O, duration: oo.dur ?? 0.5, ease: "power2.out", immediateRender: false }, t);
        return rig;
      } };
    return life(rig, body);
  }

  // ======================================================================================
  // 9. CALENDAR STRIP — April 1…30, highlighted date, forward-only ticks
  // ======================================================================================
  function calendarStrip(parent, x, y, s = 1, o = {}) {
    const days = o.days || 30, CW = 54, TAB = 150, PAD = 26, Wt = TAB + days * CW + PAD * 2;
    const { root, body } = wrap(parent, x, y, s, o);
    tex(shadow(body, 1), cutRect(-Wt / 2, -44, Wt, 88, 2, 24), "pat-paper");
    const cx = (d) => -Wt / 2 + TAB + PAD + CW * (d - 0.5);
    // month tab (small, swappable)
    const tab = g(body, {});
    paper(shadow(tab, 1), cutRect(-Wt / 2 + 10, -34, TAB - 16, 68, 1.6, 18), C.coral);
    const monthG = g(tab, {});
    text(monthG, -Wt / 2 + 10 + (TAB - 16) / 2, 3, o.month || "April", { size: 34, weight: 800, color: K.onColor(C.coral) });
    // highlighted date: saffron disc under the numbers
    const hl = g(body, {});
    paper(shadow(hl, 1), cutEll(0, 0, 27, 27, 1), C.saffron);
    let cur = o.highlight ?? 1;
    gsap.set(hl, { x: cx(cur) });
    for (let d = 1; d <= days; d++) text(body, cx(d), 3, String(d), { size: 34, weight: 700, color: C.ink });
    const rig = {
      g: root, body, hl, get cur() { return cur; }, cx,
      // forward only. ≤ 3 steps → one smooth slide ("a tick"); more → fast stepped flip (time-lapse), 1 step per ~2 frames+.
      tickTo(tl, t, n, oo = {}) {
        if (n < cur && !oo.allowBack) { if (typeof console !== "undefined") console.warn("calendarStrip.tickTo: forward only (pass {allowBack:true} for the L5 rewind exception)"); return rig; }
        if (n === cur) return rig;
        const steps = Math.abs(n - cur);
        if (steps <= 3 && !oo.stepped) {
          tl.to(hl, { x: cx(n), duration: oo.dur ?? 0.35, ease: "power2.inOut" }, t);
        } else {
          const dur = Math.max(oo.dur ?? 1.2, steps * STEP * 2), dir = n > cur ? 1 : -1;
          for (let i = 1; i <= steps; i++) tl.set(hl, { x: cx(cur + dir * i) }, t + Math.round((i * dur) / steps * FPS) / FPS);
        }
        cur = n;
        return rig;
      },
      // swap the small month label (old lifts off, new drops)
      setMonth(tl, t, name) {
        const mg = g(tab, {}); hide(mg);
        text(mg, -Wt / 2 + 10 + (TAB - 16) / 2, 3, name, { size: 34, weight: 800, color: K.onColor(C.coral) });
        liftOff(tl, rig._month || monthG, t, { dur: 0.16 }); dropIn(tl, mg, t + 0.1);
        rig._month = mg;
        return rig;
      },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 10. BAR PAIR — two paper bars from a baseline (blue left, orange stacked right with face tags) + level line
  // ======================================================================================
  function barPair(parent, x, y, s = 1, o = {}) {
    const REF = o.refH || 380, MAX = o.max || 100000, BW = 170, faces = o.faces || ["ravi", "meera", "gopal"];
    const { root, body } = wrap(parent, x, y, s, o);
    tex(shadow(body, 1), cutRect(-330, 0, 660, 22, 2, 24), "pat-kraft");
    const mkBar = (cxp, color, shade) => {
      const b = at(body, cxp, 0); gsap.set(b, { scaleY: 0.001, svgOrigin: O });
      paper(shadow(b, 1), cutRect(-BW / 2, -REF, BW, REF, 2.5, 24), color);
      if (shade) paper(b, cutRect(-BW / 2 + 10, -REF + 10, 14, REF - 20, 1, 24), "#ffffff", { opacity: 0.18 });
      return b;
    };
    const L = { bar: mkBar(-130, C.dr, true), v: 0, t0: null };
    const lt = at(body, -130, 0); L.tick = ticker(lt, 0, -44, 1, { value: 0, size: 40 }); L.tg = lt;
    hide(lt);
    const blocks = [], stk = { v: 0 };
    let lvl = null;
    const k = REF / MAX;
    const rig = {
      g: root, body, L, blocks,
      grow(tl, t, Lv, Rarr = [], oo = {}) {
        const dur = oo.dur ?? 0.9, ease = oo.ease || "power2.out";
        if (Lv !== undefined) {
          tl.to(L.bar, { scaleY: Lv / MAX, svgOrigin: O, duration: dur, ease }, t);
          tl.to(lt, { y: -Lv * k, duration: dur, ease }, t);
          if (!L.shown) { dropIn(tl, lt, t); L.shown = true; }
          L.tick.to(tl, t, Lv, dur); L.v = Lv;
        }
        let cum = 0;
        Rarr.forEach((v, i) => {
          if (!blocks[i]) {
            const bl = at(body, 130, 0); gsap.set(bl, { scaleY: 0.001, svgOrigin: O });
            paper(shadow(bl, 1), cutRect(-BW / 2, -REF, BW, REF, 2.5, 24), i % 2 ? "#f2a860" : C.cr);
            paper(bl, cutRect(-BW / 2, -REF, BW, 6, 1, 24), C.cream, { opacity: 0.8 });   // seam between stacked blocks
            const fb = at(body, 130, 0); hide(fb); tex(shadow(fb, 1), cutEll(0, 0, 40, 40, 0.8), "pat-paper"); faceArt(fb, faces[i % faces.length], 34);
            const vt = at(body, 250, 0); hide(vt);
            const tk = ticker(vt, 0, 0, 1, { value: 0, size: 36, anchor: "start" });
            blocks[i] = { bar: bl, face: fb, vtg: vt, tick: tk, v: 0, shown: false };
          }
          const B = blocks[i], t1 = t + i * 0.25;
          tl.to(B.bar, { scaleY: v / MAX, y: -cum * k, svgOrigin: O, duration: dur, ease }, t1);
          tl.to(B.face, { y: -(cum + v / 2) * k, duration: dur, ease }, t1);
          tl.to(B.vtg, { y: -(cum + v / 2) * k, duration: dur, ease }, t1);
          if (!B.shown) { dropIn(tl, B.face, t1 + 0.3); dropIn(tl, B.vtg, t1 + 0.3); B.shown = true; }
          B.tick.to(tl, t1, v, dur); B.v = v; cum += v;
        });
        stk.v = cum;
        return rig;
      },
      // dashed level line across both bars at the left bar's height
      level(tl, t, oo = {}) {
        const yy = -L.v * k, LW = 330, LL = LW * 2;
        lvl = el("path", { d: `M${-LW},${yy} L${LW},${yy}`, fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-dasharray": `${LL}`, "stroke-dashoffset": LL, opacity: 0.8, "stroke-linecap": "round" }, body);
        tl.to(lvl, { strokeDashoffset: 0, duration: oo.dur ?? 0.4, ease: "power2.out" }, t);
        if (oo.hold !== undefined) tl.to(lvl, { opacity: 0, duration: 0.3 }, t + (oo.dur ?? 0.4) + oo.hold);
        return rig;
      },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 12. SMALL PROPS — tumblerStack, priceTag, gasCylinder, cartSticker
  // ======================================================================================
  function tumblerStack(parent, x, y, s = 1, o = {}) {
    const n = o.n || 5, { root, body } = wrap(parent, x, y, s, o), items = [];
    for (let i = 0; i < n; i++) {
      const it = at(body, (i % 2 ? 6 : -6) * 0.5, -i * 22, 1.6); items.push(it);
      paper(shadow(it, 1), cutPoly([[-20, -54], [20, -54], [15, 0], [-15, 0]], 1, 12), C.glass, { opacity: 0.95 });
      paper(it, cutPoly([[-17, -30], [17, -30], [15, -2], [-15, -2]], 1, 12), C.chai);
      paper(it, cutRect(-17, -54, 5, 40, 0.6, 14), "#ffffff", { opacity: 0.5 });
      if (o.hidden) hide(it);
    }
    const rig = { g: root, body, items,
      // tumblers drop in one by one
      dropIn(tl, t, oo = {}) { items.forEach((it, i) => dropIn(tl, it, t + i * (oo.step ?? 0.15), { dur: 0.26 })); return rig; } };
    return life(rig, body);
  }

  // priceTag: kraft tag on a string with a counting ₹ price. Origin = bottom centre.
  function priceTag(parent, x, y, s = 1, o = {}) {
    const { root, body } = wrap(parent, x, y, s, o);
    const bg = g(body, o.rot ? { transform: `rotate(${o.rot})` } : {});
    const art = tagArt(bg, { w: o.w || 230, h: o.h || 130, kraft: true, amount: o.amount ?? 0, size: o.size || 40 });
    const rig = { g: root, body, ticker: art.ticker, tick(tl, t, from, to, dur = 0.6) { art.ticker.to(tl, t, to, dur); return rig; } };
    return life(rig, body);
  }

  function gasCylinder(parent, x, y, s = 1, o = {}) {
    const { root, body } = wrap(parent, x, y, s, o);
    const b = shadow(body, 2);
    paper(shadow(body, 1), cutRect(-26, -262, 52, 22, 1, 12), "#7e211b");                        // valve guard
    paper(b, cutRect(-14, -276, 28, 20, 1, 10), C.brass);                                          // valve
    paper(b, cutPoly([[-60, -170], [-44, -236], [44, -236], [60, -170]], 1.4, 14), C.red);        // shoulder
    paper(b, cutRect(-60, -184, 120, 184, 2, 22), C.red);                                          // body
    paper(body, cutRect(-60, -98, 120, 64, 1, 18), C.cream);                                       // label band
    paper(body, cutPoly([[0, -92], [18, -70], [12, -42], [0, -50], [-12, -42], [-18, -70]], 0.8, 8), C.saffron);   // paper flame
    paper(body, cutRect(-60, -184, 12, 184, 1, 22), "#ffffff", { opacity: 0.18 });
    paper(body, cutEll(0, 2, 62, 8, 0.8), "#7e211b");                                              // foot ring
    return life({ g: root, body }, body);
  }

  const cartSticker = (parent, x, y, s = 1, o = {}) => { const { root, body } = wrap(parent, x, y, s, o); cartArt(body); return life({ g: root, body }, body); };

  Object.assign(K, {
    dropIn, liftOff, pulseNode, fmtIN, fmtINR: money, faceArt, cartArt,
    ticker, claimTag, jarRig, whichTwo, equityCard, scaleRig, miniScale, stamp: stamp, stampStill,
    imagineCard, pauseMedallion, checkpointBanner, calendarStrip, barPair, tumblerStack, priceTag, gasCylinder, cartSticker,
  });
})();

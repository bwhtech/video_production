// s01 — Cold open: April 16. Priya's two-week tab; Meera writes the first bill — profit goes up, the galla does not move.
// Exit: the camera rushes into the shut galla's brass clasp (full-frame brass plate) → s01t (the L1–L4 seam shape).
//
// This file ALSO hosts the lesson-local helper kit `window.L5` (scene files load in order, so every later scene can use it):
//   L5.node/hide/stage/cal/drop/lift/allow/card/chip · L5.fly/coinHop · L5.gauge (animatable needle gauge — the kit has none)
//   L5.hud (Scale HUD, top-right, stage 0–5 = after T7…T12) · L5.bank (the friendly Bank building) · L5.tumblerRow · L5.cover
(function () {
  window.OWN_SEAM_IN.s01t = true;          // this scene owns the clasp rush into the title sting
  const O = "0 0";
  const L5 = (window.L5 = window.L5 || {});

  // ================================================================================================ basics
  // positioned wrapper (carries the transform attr) + animatable inner group drawn around local (0,0)
  L5.node = (K, parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L5.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L5.stage = (K, parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L5.cal = (K, parent, hl) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L5.drop = (tl, K, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L5.lift = (tl, K, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L5.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L5.card = (K, parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, o.shadow || 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    return grp;
  };
  // paper chip with text (account names / numbers only); hidden until dropped in
  L5.chip = (K, parent, x, y, text, o = {}) => {
    const n = L5.hide(L5.node(K, parent, x, y));
    K.label(n, 0, 0, text, { size: o.size || 40, bg: o.bg || "paper", rot: o.rot || 0, weight: 800, shadow: 1 });
    return n;
  };
  // scale-only camera push about a point (never mix x/y with scale+svgOrigin in one tween — GSAP quirk, see L4/project.md)
  L5.push = (tl, cam, t, dur, org, s0, s1, ease = "none") =>
    tl.fromTo(cam, { scale: s0, svgOrigin: org }, { scale: s1, svgOrigin: org, duration: dur, ease, immediateRender: false }, t);
  // two nested layers (translate > scale) so a camera move can scale about a point AND translate as ONE move (GSAP x/y+scale quirk)
  L5.layers = (K, parent) => { const tr = K.g(parent, {}), sc = K.g(tr, {}); return { tr, sc }; };
  L5.zoom = (tl, lay, t, dur, O2, s0, s1, T0 = [0, 0], T1 = [0, 0], ease = "power2.inOut") => {
    const org = `${O2[0]} ${O2[1]}`;
    tl.fromTo(lay.sc, { scale: s0, svgOrigin: org }, { scale: s1, svgOrigin: org, duration: dur, ease, immediateRender: false }, t);
    if (T0[0] !== T1[0] || T0[1] !== T1[1]) tl.fromTo(lay.tr, { x: T0[0], y: T0[1] }, { x: T1[0], y: T1[1], duration: dur, ease, immediateRender: false }, t);
  };
  // x/y flight of a bare node (no scale in the same tween): straight in x, arcing in y
  L5.fly = (tl, node, t, from, to, dur, o = {}) => {
    const lift = o.lift ?? 60, ease = o.ease || "power1.inOut";
    tl.fromTo(node, { x: from[0] }, { x: to[0], duration: dur, ease, immediateRender: false }, t);
    if (lift) {
      tl.fromTo(node, { y: from[1] }, { y: Math.min(from[1], to[1]) - lift, duration: dur * 0.5, ease: "power2.out", immediateRender: false }, t);
      tl.fromTo(node, { y: Math.min(from[1], to[1]) - lift }, { y: to[1], duration: dur * 0.5, ease: "power2.in", immediateRender: false }, t + dur * 0.5);
    } else tl.fromTo(node, { y: from[1] }, { y: to[1], duration: dur, ease, immediateRender: false }, t);
  };
  // a short run of paper coins hopping from p0 to p1 (parent = world group)
  L5.coinHop = (tl, K, parent, p0, p1, t, o = {}) => {
    const n = o.n ?? 3, dur = o.dur ?? 0.6;
    for (let i = 0; i < n; i++) {
      const c = L5.hide(L5.node(K, parent, 0, 0)); K.coin(c, 0, 0, o.r ?? 12);
      const ti = t + i * (o.step ?? 0.14);
      tl.set(c, { autoAlpha: 1, x: p0[0], y: p0[1] }, ti);
      L5.fly(tl, c, ti, p0, [p1[0] + (i - (n - 1) / 2) * 6, p1[1]], dur, { lift: o.lift ?? 60 });
      tl.set(c, { autoAlpha: 0 }, ti + dur + 0.02);
    }
  };
  // a row of chai tumblers; drink() empties them one by one (the glass stays)
  L5.tumblerRow = (K, parent, x, y, s = 1, n = 5, gap = 52) => {
    const C = K.C, root = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` }), chai = [];
    for (let i = 0; i < n; i++) {
      const tn = K.g(root, { transform: `translate(${(i - (n - 1) / 2) * gap} 0)` });
      K.paper(K.shadow(tn, 1), K.cutPoly([[-18, -52], [18, -52], [14, 0], [-14, 0]], 1, 12), C.glass, { opacity: 0.95 });
      const ch = K.g(tn, {}); K.paper(ch, K.cutPoly([[-16, -34], [16, -34], [14, -2], [-14, -2]], 1, 12), C.chai);
      chai.push(ch);
    }
    return { g: root, chai, drink(tl, t, step = 0.2) { chai.forEach((c, i) => tl.to(c, { scaleY: 0, svgOrigin: O, duration: 0.3, ease: "power2.in" }, t + i * step)); } };
  };
  // ledger cover (red cloth, gold number) — full frame; `outer` carries a transform-free wrapper for flights
  L5.cover = (K, parent, num) => {
    const C = K.C, outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, String(num), { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };

  // ================================================================================================ GAUGE
  // Half-dial with a rotatable needle (hub at the local origin), a ticker chip under it and optional sub-chips.
  //   o: label, icon, band (colour), max, value (initial reading), size (ticker px), sub:[{icon:"galla"|"landmark", value}], hidden
  //   read(tl,t,value,{dur}) — needle swings once (power3.out) with ONE small settle; the ticker counts with it.
  L5.gauge = (K, parent, x, y, s, o = {}) => {
    const C = K.C, R = 200, MAX = o.max || 60000;
    const root = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const body = K.g(root, {});
    if (o.hidden) L5.hide(body);
    const dial = K.g(body, {});
    K.tex(K.shadow(dial, 2), K.cutPoly([...K.arc(0, 0, R, Math.PI, Math.PI * 2, 24), [R, 52], [-R, 52]], 2, 24), "pat-paper");
    K.paper(dial, K.cutPoly([...K.arc(0, 0, R * 0.9, Math.PI * 1.03, Math.PI * 1.97, 18), ...K.arc(0, 0, R * 0.76, Math.PI * 1.97, Math.PI * 1.03, 18)], 0.8, 10), o.band || C.saffron, { opacity: 0.92 });
    for (let i = 0; i <= 10; i++) {
      const a = Math.PI + (i / 10) * Math.PI, r0 = R * (i % 5 === 0 ? 0.56 : 0.64), r1 = R * 0.72;
      K.ink(dial, [[Math.cos(a) * r0, Math.sin(a) * r0], [Math.cos(a) * r1, Math.sin(a) * r1]], i % 5 === 0 ? 7 : 4);
    }
    const halo = K.el("path", { d: K.cutPoly([...K.arc(0, 0, R + 14, Math.PI, Math.PI * 2, 22), [R + 14, 66], [-R - 14, 66]], 1, 26), fill: "none", stroke: C.gold, "stroke-width": 10, "stroke-linejoin": "round", opacity: 0 }, body);
    // needle (drawn pointing UP; rotation −90 = empty/left, +90 = full/right) + hub
    const needle = K.g(body, {});
    K.paper(K.shadow(needle, 1), K.cutPoly([[-10, 22], [-5, -R * 0.84], [0, -R * 0.9], [5, -R * 0.84], [10, 22]], 0.6, 18), C.red);
    K.paper(K.shadow(body, 1), K.cutEll(0, 0, 24, 24, 1), C.ink);
    K.paper(body, K.cutEll(-6, -6, 6, 6, 0.4), "#5b5066");
    const deg0 = ((Math.max(0, Math.min(1, (o.value || 0) / MAX))) - 0.5) * 180;
    gsap.set(needle, { rotation: deg0, svgOrigin: O });
    // name chip above the dial (icon + word)
    const labPos = K.g(body, { transform: `translate(0 ${-R - 62})` }), lab = K.g(labPos, {});
    if (o.label) {
      const lw = 168 + o.label.length * 24;
      K.tex(K.shadow(lab, 1), K.cutRect(-lw / 2, -40, lw, 80, 1.6, 20), "pat-paper");
      K.medallion(lab, -lw / 2 + 48, 0, 30, o.icon || "coins");
      K.text(lab, 32, 4, o.label, { size: 50, weight: 800 });
      if (o.labelHidden) L5.hide(lab);
    }
    // ticker chip under the hub
    const tkPos = K.g(body, { transform: "translate(0 122)" });
    const tk = K.ticker(tkPos, 0, 0, 1, { value: o.value || 0, size: o.size || 66, chip: true, w: 350, h: 96, edge: o.band || C.saffron, hidden: !!o.tickerHidden });
    // "=" tag (nothing changed)
    const eqPos = K.g(body, { transform: "translate(196 78)" }), eqTag = K.g(eqPos, {});
    K.tex(K.shadow(eqTag, 1), K.cutRect(-34, -34, 68, 68, 1.4, 16), "pat-paper");
    K.ink(eqTag, [[-17, -9], [17, -9]], 7); K.ink(eqTag, [[-17, 11], [17, 11]], 7);
    L5.hide(eqTag);
    // sub-chips (Cash = galla notes / Bank) under the ticker: icon + WORD + amount (the word keeps them distinct from the Money needle)
    const subs = (o.sub || []).map((sp, i, arr) => {
      const px = (i - (arr.length - 1) / 2) * 292, pos = K.g(body, { transform: `translate(${px} 262)` }), grp = K.g(pos, {});
      K.tex(K.shadow(grp, 1), K.cutRect(-136, -62, 272, 124, 1.6, 22), "pat-paper");
      if (sp.icon === "galla") { K.galla(grp, -92, 34, 0.26, {}); } else K.medallion(grp, -92, 0, 30, sp.icon);
      if (sp.label) K.text(grp, 40, -22, sp.label, { size: 46, weight: 800 });
      const stk = K.ticker(grp, 40, sp.label ? 24 : 3, 1, { value: sp.value || 0, size: sp.label ? 44 : 46 });
      if (sp.hidden) L5.hide(grp);
      return { g: grp, tk: stk };
    });
    const st = { deg: deg0 };
    const rig = {
      g: root, body, needle, ticker: tk, subs, lab, halo, x, y, s, R, hub: [x, y], settleT: null,
      enter(tl, t) { K.dropIn(tl, body, t); return rig; },
      tieLabel(tl, t) { K.dropIn(tl, lab, t); return rig; },
      showTicker(tl, t) { tk.enter(tl, t); return rig; },
      // swing the needle (smooth) to `value`; the ticker (and optional sub-chip tickers) count alongside
      read(tl, t, value, oo = {}) {
        const dur = oo.dur ?? 1.0, f = Math.max(0, Math.min(1, value / MAX)), deg = (f - 0.5) * 180;
        const dir = Math.sign(deg - st.deg) || 1, ov = oo.settle ?? 3.2;
        tl.fromTo(needle, { rotation: st.deg, svgOrigin: O }, { rotation: deg + dir * ov, svgOrigin: O, duration: dur * 0.75, ease: "power3.out", immediateRender: false }, t);
        tl.fromTo(needle, { rotation: deg + dir * ov, svgOrigin: O }, { rotation: deg, svgOrigin: O, duration: 0.3, ease: "power2.inOut", immediateRender: false }, t + dur * 0.75);
        if (oo.ticker !== false) tk.to(tl, t + 0.05, value, dur * 0.85);
        st.deg = deg; rig.settleT = t + dur * 0.75 + 0.15;
        return rig;
      },
      eq(tl, t) { K.dropIn(tl, eqTag, t); return rig; },
      eqOff(tl, t) { K.liftOff(tl, eqTag, t); return rig; },
      sub(tl, t, i, value, dur = 0.6) { subs[i].tk.to(tl, t, value, dur); return rig; },
      subEnter(tl, t, i) { K.dropIn(tl, subs[i].g, t); return rig; },
      flash(tl, t, hold = 0.7) {
        tl.fromTo(halo, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t);
        tl.to(halo, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + hold); return rig;
      },
      pulse(tl, t) { tk.pulse(tl, t); return rig; },
    };
    return rig;
  };

  // The Profit/Cash gauge STRIP (top-left, ≈ 50 %) used by every HUD scene (s04–s09). `stage` = transactions applied (0 = after T7 … 5 = after T12).
  L5.READ = { profit: [13000, 13000, 19000, 19000, 19000, 19000], galla: [51000, 36000, 36000, 31000, 35000, 35000], bank: [0, 15000, 15000, 15000, 15000, 19000] };
  L5.strip = (K, parent, o = {}) => {
    const C = K.C, st = o.stage ?? 0, GS = 0.5, R = L5.READ;
    const profit = L5.gauge(K, parent, 170, 272, GS, { label: "Profit", icon: "trending-up", band: C.saffron, max: 25000, value: R.profit[st] });
    const cash = L5.gauge(K, parent, 440, 272, GS, { label: "Money", icon: "coins", band: C.sky, max: 60000, value: R.galla[st] + R.bank[st],
      sub: [{ icon: "galla", label: "Cash", value: R.galla[st] }, { icon: "landmark", label: "Bank", value: R.bank[st] }] });
    return { profit, cash, GS };
  };

  // ================================================================================================ BANK building
  // friendly building, columns for legs; door swings; the pediment gives a tiny bow. (x, y) = ground centre.
  L5.bank = (K, parent, x, y, s = 1) => {
    const C = K.C, root = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` }), jit = K.g(root, {});
    const BW = 400, tone = "#f1e3c6", shade = "#d8c49a", col = "#fff4e2";
    K.paper(jit, K.cutEll(0, 8, 270, 14, 1.5), "#3b2614", { opacity: 0.2 });
    K.paper(K.shadow(jit, 1), K.cutRect(-BW / 2 - 24, -26, BW + 48, 26, 1.6, 22), "#d9cdb8");
    K.paper(K.shadow(jit, 1), K.cutRect(-BW / 2 - 6, -52, BW + 12, 26, 1.6, 22), "#e6dcc8");
    K.paper(K.shadow(jit, 2), K.cutRect(-BW / 2 + 12, -332, BW - 24, 282, 2, 26), tone);
    // door (hinge on the left edge, swings via scaleX)
    const door = K.g(jit, {});
    K.paper(K.shadow(door, 1), K.cutRect(-40, -218, 80, 168, 1.2, 18), "#6e4422");
    K.paper(door, K.cutRect(-30, -208, 60, 70, 0.8, 16), "#8a5a30"); K.paper(door, K.cutRect(-30, -128, 60, 70, 0.8, 16), "#8a5a30");
    K.paper(door, K.cutEll(26, -130, 5, 5, 0.3), C.brass);
    const dark = K.paper(jit, K.cutRect(-40, -218, 80, 168, 1, 18), "#3b2a20", { opacity: 0 });
    // columns (the legs)
    [-150, -50, 50, 150].forEach((cx) => {
      K.paper(K.shadow(jit, 1), K.cutRect(cx - 22, -318, 44, 268, 1.2, 28), col);
      K.paper(jit, K.cutRect(cx - 22, -318, 9, 268, 0.6, 28), shade, { opacity: 0.45 });
      K.paper(jit, K.cutRect(cx - 30, -330, 60, 14, 1, 14), "#f7ecd4"); K.paper(jit, K.cutRect(cx - 28, -62, 56, 12, 1, 14), "#f7ecd4");
    });
    // pediment (pivot = bottom centre) with a friendly face + the landmark sign
    const pedPos = K.g(jit, { transform: "translate(0 -332)" }), ped = K.g(pedPos, {});
    K.paper(K.shadow(ped, 2), K.cutPoly([[-BW / 2 - 14, 0], [BW / 2 + 14, 0], [0, -108]], 2, 24), "#e8d5a8");
    K.paper(ped, K.cutPoly([[-BW / 2 + 40, -8], [BW / 2 - 40, -8], [0, -92]], 1.4, 22), tone);
    [-1, 1].forEach((sd) => { K.paper(K.shadow(ped, 1), K.cutEll(sd * 44, -34, 18, 20, 0.8), C.white); K.paper(ped, K.cutEll(sd * 44 + 3, -30, 8, 8, 0.4), C.ink); });
    K.ink(ped, K.arc(0, -44, 26, Math.PI * 0.2, Math.PI * 0.8, 8), 5);
    K.medallion(ped, 0, -72, 20, "landmark", C.sky);
    return {
      g: root, jit, door, ped,
      // pediment bows (two steps down, two back) as it receives the bundle
      bow(tl, t) {
        tl.to(ped, { rotation: 3, svgOrigin: O, duration: 2 / 15, ease: K.stepEase(2 / 15, "power2.out", t) }, t);
        tl.to(ped, { rotation: 0, svgOrigin: O, duration: 3 / 15, ease: K.stepEase(3 / 15, "power2.inOut", t + 0.3) }, t + 0.3);
      },
      doorTo(tl, t, k = 0.25, dur = 0.4) { tl.to(door, { scaleX: k, svgOrigin: "-40 0", duration: dur, ease: "power2.inOut" }, t); tl.to(dark, { opacity: k < 0.6 ? 0.9 : 0, duration: dur }, t); },
    };
  };

  // ================================================================================================ SCALE HUD (top-right)
  const HUD_TOT = [101000, 101000, 107000, 102000, 106000, 106000];
  const HUD_FILL = { cash: [0.75, 0.5, 0.5, 0.4, 0.5, 0.5], stock: 0.8 };
  // The rig is built inside two nested layers (translate > scale) and put straight into its HUD state (L4's workaround for the GSAP
  // x/y + scale + svgOrigin quirk). `stage` = transactions already applied (0 = after T7 … 5 = after T12).
  L5.hud = (K, parent, tl, o = {}) => {
    const C = K.C, st0 = o.stage ?? 0, k = o.k ?? 0.5, right = o.right ?? 36, top = o.top ?? 122, BX = 960, BY = 890;
    const tr = K.g(parent, {}), sc = K.g(tr, {});
    const rig = K.scaleRig(sc, BX, BY, 1, { tint: true, L: HUD_TOT[st0], R: HUD_TOT[st0] });
    const Lg = rig.pans.L.g, Rg = rig.pans.R.g;
    const dx = 1920 - right - BX - k * 640, dy = top - BY + 600 * k, boost = 30 / (44 * k);
    tl.set(sc, { scale: k, svgOrigin: `${BX} ${BY}` }, 0);
    tl.set(tr, { x: dx, y: dy }, 0);
    ["L", "R"].forEach((kk) => { const P = rig.pans[kk]; if (P.chipBoost) tl.set(P.chipBoost, { scale: boost, y: 62, svgOrigin: O }, 0); tl.set(P.labelsG, { autoAlpha: 0 }, 0); });
    tl.set(rig.eqG.parentNode, { autoAlpha: 0 }, 0);
    const pt = (lx, ly) => [1920 - right - 640 * k + k * lx, top + 600 * k + k * ly];
    const panPt = (side, px, py) => pt((side === "L" ? -380 : 380) + px, -270 + py);

    // ---- left pan: jars (slot wrappers carry the x tweens; the jar roots keep their own transform attrs)
    const JS = 0.4, orderL = ["cash", "bank", "inf", "stock", "equip"];
    const defL = {
      cash: { contents: "coins", icon: "coins", fill: HUD_FILL.cash[st0] },
      bank: { contents: "coins", icon: "landmark", fill: st0 >= 5 ? 0.45 : 0.3 },
      inf: { contents: "coins", fill: st0 >= 5 ? 0.3 : 0.55 },
      stock: { contents: "leaves", icon: "leaf", fill: HUD_FILL.stock },
      equip: { contents: "cart", icon: "shopping-cart" },
    };
    const showL = new Set(["cash", "stock", "equip", ...(st0 >= 1 ? ["bank"] : []), ...(st0 >= 2 ? ["inf"] : [])]);
    const jars = {}, slotL = {}, xL = {};
    const layoutX = (ids, widthGap) => Object.fromEntries(ids.map((id, i) => [id, (i - (ids.length - 1) / 2) * widthGap]));
    const gapFor = (n) => (n >= 5 ? 70 : n === 4 ? 82 : 96);
    orderL.forEach((id) => {
      slotL[id] = K.g(Lg, {});
      jars[id] = K.jarRig(slotL[id], 0, 0, JS, { edge: C.dr, hidden: !showL.has(id), ...defL[id] });
      if (id === "inf") { const fa = K.faceArt(jars[id].body, "infotech", 40); fa.setAttribute("transform", `translate(0 ${-196 * 0.74})`); }
    });
    const curL = () => orderL.filter((id) => showL.has(id));
    Object.assign(xL, layoutX(curL(), gapFor(curL().length)));
    orderL.forEach((id) => gsap.set(slotL[id], { x: xL[id] ?? 0 }));

    // ---- right pan: Ravi's tag · Gopal's tag · Meera's equity card · (advance tag from T11)
    const orderR = ["ravi", "gopal", "card", "adv"], TS = 0.36, CS = 0.5, wR = { ravi: 80, gopal: 80, card: 250, adv: 80 };
    const showR = new Set(["ravi", "gopal", "card", ...(st0 >= 4 ? ["adv"] : [])]);
    const slotR = {}, xR = {};
    orderR.forEach((id) => { slotR[id] = K.g(Rg, {}); });
    const tags = {
      ravi: K.claimTag(slotR.ravi, 0, 0, TS, { face: "ravi" }),
      gopal: K.claimTag(slotR.gopal, 0, 0, TS, { face: "gopal" }),
      adv: K.claimTag(slotR.adv, 0, 0, TS, { face: "customer", hidden: !showR.has("adv") }),
    };
    const card = K.equityCard(slotR.card, 0, 0, CS, { pockets: 2, capital: 50000, profit: st0 >= 2 ? 19000 : 13000 });
    card.unfold(tl, 0, { dur: 0.05 });
    const layoutR = () => { const ids = orderR.filter((id) => showR.has(id)), gap = 16, tot = ids.reduce((a, id) => a + wR[id], 0) + gap * (ids.length - 1); let cx = -tot / 2; const r = {}; ids.forEach((id) => { r[id] = cx + wR[id] / 2; cx += wR[id] + gap; }); return r; };
    Object.assign(xR, layoutR());
    orderR.forEach((id) => gsap.set(slotR[id], { x: xR[id] ?? 0 }));

    const H = {
      rig, jars, tags, card, pt, panPt, k, right, top, lay: { tr, sc },
      // world point of a jar's centre (for coin hops / chips) and of a card pocket
      jarPt: (id, dy = -60) => panPt("L", xL[id] ?? 0, dy * 0.8),
      pocketPt: (name) => panPt("R", (xR.card ?? 0) + (name === "Profit" ? 113 : -113) * CS, -150 * CS),
      tagPt: (id) => panPt("R", xR[id] ?? 0, -90 * TS),
      // add an item (jar/tag) to its pan: the others glide to the new layout, the newcomer drops in
      add(tl, t, id, oo = {}) {
        if (orderL.includes(id)) {
          showL.add(id); const nx = layoutX(curL(), gapFor(curL().length));
          orderL.forEach((j) => { if (!showL.has(j) || j === id) return; tl.to(slotL[j], { x: nx[j], duration: 0.5, ease: "power2.inOut" }, t); });
          tl.set(slotL[id], { x: nx[id] }, t - 0.02); Object.assign(xL, nx);
          jars[id].enter(tl, t + 0.15);
        } else {
          showR.add(id); const nx = layoutR();
          orderR.forEach((j) => { if (!showR.has(j) || j === id) return; tl.to(slotR[j], { x: nx[j], duration: 0.5, ease: "power2.inOut" }, t); });
          tl.set(slotR[id], { x: nx[id] }, t - 0.02); Object.assign(xR, nx);
          tags[id].enter(tl, t + 0.15);
        }
        return H;
      },
    };
    return H;
  };

  // ================================================================================================ the scene
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, T0 = sc.start, GY = 1000;
    const cam = K.g(svg, {});
    L5.stage(K, cam, C.sky, 880);
    // tone-on-tone skyline (set dressing only)
    [[40, 470, 160, 420], [215, 560, 130, 330], [1150, 520, 150, 370]].forEach(([x, y, w, h], i) => {
      K.paper(cam, K.cutRect(x, y, w, h, 1.6, 24), i % 2 ? "#4390d4" : "#4a96d9");
      for (let r = 0; r < Math.floor(h / 110); r++) for (let c = 0; c < Math.floor(w / 62); c++)
        K.paper(cam, K.cutRect(x + 16 + c * 56, y + 26 + r * 92, 34, 52, 0.6, 14), "#6aaee6", { opacity: 0.7 });
    });
    const bld = K.infotechBuilding(cam, 1640, GY, 0.78, {});
    const SX = 330, SS = 0.95;
    const stall = K.stall(cam, SX, GY, SS, {});
    const CLASP = [SX - 10 * SS, GY - 350.2 * SS];
    const meera = K.meera(cam, 690, GY, 1.0, { expr: "happy" });
    const priya = K.priya(cam, 1050, GY, 1.0, { expr: "happy", flip: true });

    // ---- the tab slip on the counter: clock + three tally groups (5 · 5 · 4 = two weeks)
    const slip = L5.hide(L5.node(K, cam, 468, 700, 0.62));
    const sr = K.g(slip, { transform: "rotate(-4)" });
    K.tex(K.shadow(sr, 2), K.cutRect(-105, -135, 210, 270, 2, 20), "pat-paper");
    K.medallion(sr, 0, -88, 40, "clock", C.saffron, C.white);
    const groups = [[0, -20, 5], [0, 40, 5], [0, 100, 4]].map(([gx, gy, n]) => {
      const gg = K.g(sr, { opacity: 0.22 });
      for (let i = 0; i < Math.min(n, 4); i++) K.ink(gg, [[gx - 36 + i * 24, gy - 20], [gx - 36 + i * 24, gy + 20]], 7, C.ink);
      if (n === 5) K.ink(gg, [[gx - 52, gy + 14], [gx + 52, gy - 14]], 7, C.ink);
      return gg;
    });
    // ---- the bill slip (receipt + Infotech face + ₹6,000)
    const bill = L5.hide(L5.node(K, cam, 870, 790));
    const br = K.g(bill, { transform: "rotate(3)" });
    K.tex(K.shadow(br, 2), K.cutRect(-150, -92, 300, 184, 2, 22), "pat-paper");
    K.paper(br, K.cutRect(-142, -84, 284, 22, 1, 20), C.sky);
    K.icon(br, "receipt", -124, -73, 30, C.white, 2.4);
    K.faceArt(br, "infotech", 38).setAttribute("transform", "translate(-96 14)");
    const billTk = K.ticker(br, 40, 12, 1, { value: 0, size: 58 });
    // ---- the up-arrow medallion and the soft spotlight on the galla
    const up = L5.hide(L5.node(K, cam, 880, 380)); K.medallion(up, 0, 0, 52, "trending-up", C.cr);
    const spot = K.el("circle", { cx: CLASP[0], cy: CLASP[1] + 20, r: 130, fill: C.cream, opacity: 0 }, cam);
    // ---- memory inset (top-left, 1.5 s, then folds away)
    const inset = L5.hide(L5.node(K, svg, 250, 300, 1));
    K.tex(K.shadow(inset, 2), K.cutRect(-190, -118, 380, 236, 2, 24), "pat-paper");
    K.paper(inset, K.cutRect(-176, -104, 352, 208, 1.4, 22), "#5aa3e0");
    K.paper(inset, K.cutEll(-96, -18, 44, 44, 1), C.saffron); K.text(inset, -96, -14, "2", { size: 56, weight: 800 });
    const mWin = K.g(inset, {}); K.paper(mWin, K.cutRect(-16, -62, 70, 86, 0.8, 14), "#4390d4"); const mLit = K.g(mWin, { opacity: 0 }); K.paper(mLit, K.cutRect(-8, -54, 54, 70, 0.6, 14), "#ffe9ae");
    const mTum = K.g(inset, {}); K.tumbler(mTum, 120, 70, 1.5);
    const calG = K.g(svg, {});
    const cal = K.calendarStrip(calG, 960, 70, 1, { highlight: 16 });
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const brass = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.brass, opacity: 0 }, svg);

    // ======================================================================================= timeline
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.2, ease: "power1.out" }, T0);
    const tRush = segEnd("s01c") + 0.1;
    L5.push(tl, cam, T0, tRush - T0, `${CLASP[0]} ${CLASP[1]}`, 1, 1.06);
    meera.blinks(tl, T0 + 1.2, sc.end, 3.3); priya.blinks(tl, T0 + 1.6, sc.end, 3.7);
    stall.kettle && stall.kettle.steamLoop(tl, T0, tRush);
    // s01a "April sixteenth." — the calendar pulses
    cal.pulse(tl, cue("s01a", "@sixteenth"));
    // "Since the day the stall opened" — the memory inset: calendar `2`, Priya's window lights, a tumbler goes up
    const tSince = cue("s01a", "@since"), tStall = cue("s01a", "@opened");
    L5.drop(tl, K, inset, tSince - 0.05);
    tl.set(mLit, { opacity: 0.6 }, tSince + 0.5); tl.set(mLit, { opacity: 1 }, tSince + 0.5 + 2 / 15);
    tl.fromTo(mTum, { y: 14 }, { y: -10, duration: 0.7, ease: "power2.out", immediateRender: false }, tSince + 0.7);
    tl.to(inset, { scale: 0.05, autoAlpha: 0, svgOrigin: O, duration: 0.35, ease: "power2.in" }, tStall + 0.4);
    // "Priya from Infotech" — Priya nods in; the whole floor's windows light up on "whole floor"
    const tPriya = cue("s01a", "@priya");
    priya.look(tl, tPriya, -5, 0).headTilt(tl, tPriya, 4);
    bld.lightAll(tl, cue("s01a", "@whole") - 0.1, 0.11, [0, 2, 1, 5, 3, 4, 8, 6, 7, 9, 11, 10]);
    // "every day" — the tab slip drops on the counter; the tally groups light (stepped)
    const tDay = cue("s01a", "@every");
    L5.drop(tl, K, slip, tDay - 0.3);
    groups.forEach((gg, i) => { tl.set(gg, { opacity: 1 }, tDay + 0.15 + i * 0.28); });
    priya.arm(tl, tDay, "L", 38, 40, 0.3);
    // "On a tab. Pay later." — Priya taps the slip, shrugs happily
    priya.arm(tl, cue("s01a", "@tab"), "L", 70, 12, 0.25); priya.arm(tl, cue("s01a", "@tab") + 0.3, "L", 38, 40, 0.25);
    meera.look(tl, cue("s01a", "@pay"), 5, 2);

    // s01b "Today, Meera sends the first bill" — she writes (two steps), the bill tears off and drops
    const tFirst = cue("s01b", "@first"), tBill = cue("s01b", "@bill");
    meera.arm(tl, tFirst - 0.3, "R", 38, 80, 0.3); meera.look(tl, tFirst, 0, 6);
    meera.arm(tl, tBill - 0.1, "R", 30, 95, 0.12); meera.arm(tl, tBill + 0.15, "R", 38, 80, 0.12);
    L5.drop(tl, K, bill, tBill + 0.15, { dur: 0.4 });
    // "six thousand rupees" — the amount counts up on the slip
    const tSix = cue("s01b", "@six");
    billTk.to(tl, tSix, 6000, 0.9);
    // "Her profit goes up." — the orange arrow medallion pops beside the slip
    const tUp = cue("s01b", "@profit");
    L5.drop(tl, K, up, tUp, { dur: 0.4 });
    tl.fromTo(up, { y: 0 }, { y: -26, duration: 0.8, ease: "power2.out", immediateRender: false }, tUp);
    meera.expr(tl, tUp, "proud");
    // "Her galla doesn't move." — a soft spotlight on the shut galla; the stillness is the joke
    const tGalla = cue("s01b", "@galla");
    tl.to(spot, { opacity: 0.3, duration: 0.5, ease: "power1.out" }, tGalla - 0.2);
    meera.look(tl, tGalla, -9, 2); meera.expr(tl, cue("s01b", "@doesn't"), "puzzled");
    // Priya takes the bill and walks away happy (after it lands)
    priya.arm(tl, tSix + 1.0, "L", 72, 20, 0.35);
    // s01c "So did Meera make money, or not?" — Meera looks at the galla, the arrow, then at us
    const tMake = cue("s01c", "@make");
    meera.look(tl, tMake - 0.4, -9, 3); meera.headTilt(tl, tMake, -6);
    meera.look(tl, cue("s01c", "@money"), 8, -5);
    meera.look(tl, cue("s01c", "@or"), 0, 0); meera.expr(tl, cue("s01c", "@or"), "puzzled");
    // exit: the camera rushes into the clasp → brass plate → s01t
    tl.to(spot, { opacity: 0, duration: 0.3 }, tRush - 0.2);
    L5.push(tl, cam, tRush, sc.end - tRush, `${CLASP[0]} ${CLASP[1]}`, 1.06, 16, "power3.in");
    tl.to(calG, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, tRush);
    tl.to(brass, { opacity: 1, duration: 0.2, ease: "none" }, sc.end - 0.2);
    L5.allow(svg);
  };
})();

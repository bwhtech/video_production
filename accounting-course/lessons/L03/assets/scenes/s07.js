// s07 — Two effects, four patterns (dual aspect). A coin travels from a "from" tag to a "to" jar — both ends light → "Dual aspect".
// Then four mini scales (arrow pairs ↑↑ ↓↓ ⇄ ⇄) all end level; the fourth is hedged (Khata taps its beam: "you'll meet this one in May").
// The big scale is parked top-right as the HUD (level, 88,000) — L3.hudScale() is shared with s08/s09/s11.
(function () {
  // ---- shared: Meera's scale in its final L3 state, parked as the corner HUD
  L3.hudScale = (K, parent, tl, T0) => {
    const C = K.C, B = L3.BIG;
    const rig = K.scaleRig(parent, B.x, B.y, B.s, { tint: true, L: 88000, R: 88000, equation: true });
    rig.jars = {
      cash: L3.jar(K, rig, 0, 3, { label: "Cash", contents: "coins", amount: 38000, fill: 0.25 }),
      equip: L3.jar(K, rig, 1, 3, { label: "Equipment", contents: "cart", amount: 36000 }),
      stock: L3.jar(K, rig, 2, 3, { label: "Stock", contents: "leaves", amount: 14000, fill: 1 }),
    };
    ["meera", "ravi", "gopal"].forEach((f, i) => L3.tag(K, rig, i, 3, { face: f, amount: [50000, 30000, 8000][i] }));
    // (GSAP's svgOrigin needs the section visible to measure → pin the HUD at T0, hold the rig invisible for the first frames)
    rig.g.setAttribute("opacity", "0");
    rig.hud(tl, T0, true, { dur: 0.01 });
    tl.set(rig.g, { opacity: 1 }, T0 + 0.05);
    return rig;
  };
  // a plain paper tag (no face, no amount) — "one claim" in the abstract
  L3.plainTag = (K, parent, x, y, s, color) => {
    const n = L3.node(K, parent, x, y, s);
    const C = K.C;
    K.ink(n, [[0, -150], [-14, -176], [0, -190], [14, -176], [0, -150]], 3.2, "#7a6b58");
    const poly = [[-110, -132], [-76, -176], [76, -176], [110, -132], [110, 0], [-110, 0]];
    if (color) K.paper(K.shadow(n, 1), K.cutPoly(poly, 1.4, 16), color); else K.tex(K.shadow(n, 1), K.cutPoly(poly, 1.4, 16), "pat-paper");
    K.paper(n, K.cutEll(0, -150, 14, 14, 0.5), "#e8dcc4"); K.paper(n, K.cutEll(0, -150, 7, 7, 0.3), "#6f6150");
    return n;
  };

  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L3.stage(K, svg, C.leaf, 880);
    const cal = L3.cal(K, svg, 3);
    const hud = L3.hudScale(K, svg, tl, T0);

    // ---- part 1: from → to
    const FX = 640, TX = 1160, BY = 700;
    const dotL = L3.hide(L3.node(K, svg, FX, BY - 60)), dotR = L3.hide(L3.node(K, svg, TX, BY - 60));
    K.paper(K.shadow(dotL, 1), K.cutEll(0, 0, 34, 34, 1.4), C.dr); K.paper(K.shadow(dotR, 1), K.cutEll(0, 0, 34, 34, 1.4), C.cr);
    const src = K.claimTag(svg, FX, BY, 0.9, { face: "customer", amount: 1000, size: 54, hidden: true });
    const dst = K.jarRig(svg, TX, BY, 0.9, { contents: "coins", fill: 0.25, amount: 0, edge: C.dr, hidden: true });
    const trail = K.g(svg, {});
    const trailPts = [];
    for (let i = 0; i <= 20; i++) { const u = i / 20; trailPts.push([FX + (TX - FX) * u, BY - 150 - Math.sin(u * Math.PI) * 190]); }
    const trailDots = trailPts.filter((_, i) => i % 2 === 0).map(([x, y]) => L3.hide(K.paper(trail, K.cutEll(x, y, 7, 7, 0.5), C.cream)));
    const coin = L3.hide(L3.node(K, svg, FX, BY - 150)); K.coin(coin, 0, 0, 38);
    const dual = L3.hide(L3.node(K, svg, (FX + TX) / 2, BY + 110)); K.label(dual, 0, 0, "Dual aspect", { size: 58, bg: C.violet, rot: -2 });

    // ---- part 2: four mini scales (2 × 2) + Khata
    const MS = 0.4, GX = [520, 1170], GYs = [600, 990];
    const minis = [["upup", "handshake"], ["downdown", "receipt"], ["swapL", "shopping-cart"], ["swapR", null]].map(([kind, ic], i) => {
      const m = K.scaleRig.mini(svg, GX[i % 2], GYs[Math.floor(i / 2)], MS, { hidden: true });
      if (ic) K.icon(m.slot.g, ic, 0, 0, 74, C.ink, 2.4);
      return m;
    });
    const [m1, m2, m3, m4] = minis;
    const mJar = (m, o = {}) => K.jarRig(m.pans.L.g, o.x || 0, 0, o.s || 1.0, { contents: "coins", amount: undefined, edge: C.dr, ...o });
    // mini 1: both up — a coin jar on the left, Ravi's tag on the right, arriving together
    const j1 = mJar(m1, { fill: 0, hidden: true }); const t1 = K.claimTag(m1.pans.R.g, 0, 0, 0.95, { face: "ravi", hidden: true });
    // mini 2: both down — jar + tag present; a note leaves, the tag shrinks
    const j2 = mJar(m2, { fill: 1 }); const t2 = K.claimTag(m2.pans.R.g, 0, 0, 0.95, { face: "ravi" });
    // mini 3: swap on the left — a coin jar and an empty cart jar; a coin hops across
    const j3a = mJar(m3, { fill: 1, x: -92, s: 0.8 }); const j3b = K.jarRig(m3.pans.L.g, 92, 0, 0.8, { contents: "cart", fill: 0, edge: C.dr });
    const t3 = K.claimTag(m3.pans.R.g, 0, 0, 0.95, { face: "meera" });
    // mini 4: swap on the right — one plain tag is replaced by another (no faces, no amounts)
    const j4 = mJar(m4, { fill: 1 });
    const p1 = L3.plainTag(K, m4.pans.R.g, 0, 0, 0.8, null), p2 = L3.hide(L3.plainTag(K, m4.pans.R.g, 0, 0, 0.8, C.saffron));
    const khata = K.khataRig(svg, 1560, 1030, 0.55, { expr: "awake" });

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 11);
    // "So here's the big idea." — a lightbulb medallion drops in, lifts off as the dots arrive
    const bulb = L3.hide(L3.node(K, svg, 900, 480)); K.medallion(bulb, 0, 0, 96, "lightbulb");
    L3.drop(tl, K, bulb, cue("s07a", "@big") - 0.1); L3.lift(tl, K, bulb, cue("s07a", "@two") - 0.15);
    // s07a "Every transaction has two effects." — two paper dots light, left and right
    const tTwo = cue("s07a", "@two");
    L3.drop(tl, K, dotL, tTwo); L3.drop(tl, K, dotR, tTwo + 0.3);
    // "comes from somewhere, and goes somewhere" — a coin leaves a source tag and arcs into a jar on a dotted trail; both ends glow
    const tFrom = cue("s07a", "@from"), tGoes = cue("s07a", "@goes"), tSome = cue("s07a", "@somewhere", 2);
    src.enter(tl, tFrom - 0.2); dst.enter(tl, tFrom - 0.2);
    L3.lift(tl, K, dotL, tFrom - 0.2); L3.lift(tl, K, dotR, tFrom - 0.2);
    trailDots.forEach((d, i) => tl.fromTo(d, { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 0.01, immediateRender: false }, tFrom + 0.1 + i * 0.07));
    src.light(tl, tFrom + 0.2, { hold: 0.5 });
    L3.drop(tl, K, coin, tFrom + 0.2, { dur: 0.15 });
    const tArc = Math.max(0.9, tSome - tFrom - 0.2);
    tl.to(coin, { x: TX - FX, duration: tArc, ease: "power1.inOut" }, tFrom + 0.4);
    tl.to(coin, { y: -190, duration: tArc * 0.5, ease: "power2.out" }, tFrom + 0.4);
    tl.to(coin, { y: 40, duration: tArc * 0.5, ease: "power2.in" }, tFrom + 0.4 + tArc * 0.5);
    tl.to(coin, { autoAlpha: 0, duration: 0.1 }, tFrom + 0.4 + tArc);
    dst.fill(tl, tFrom + 0.4 + tArc, 0.5); dst.light(tl, tFrom + 0.4 + tArc, { hold: 0.9 });
    // "Accountants call this the dual aspect." — 0.5 s stillness, then the chip drops between them
    L3.drop(tl, K, dual, cue("s07a", "@dual") + 0.1);

    // s07b "four ways" — coin/chip lift off; the four mini scales drop-and-place, all level and empty
    const tWays = cue("s07b", "@ways");
    [src, dst].forEach((r) => r.exit(tl, tWays - 0.25)); L3.lift(tl, K, dual, tWays - 0.25); trailDots.forEach((d) => tl.to(d, { autoAlpha: 0, duration: 0.15 }, tWays - 0.25));
    minis.forEach((m, i) => m.enter(tl, tWays + 0.1 + i * 0.12));
    // "Both sides go up — like Ravi Mama's loan."
    const tUp = cue("s07b", "@up");
    j1.enter(tl, tUp); j1.fill(tl, tUp + 0.05, 0.75); t1.enter(tl, tUp + 0.08);
    m1.arrows(tl, tUp + 0.5, "upup");
    // "Both sides go down — like paying off a bill."
    const tDown = cue("s07b", "@down");
    j2.fill(tl, tDown, 0.25); tl.to(t2.body, { scale: 0.55, svgOrigin: O, duration: 0.45, ease: "power2.inOut" }, tDown + 0.1);
    m2.arrows(tl, tDown + 0.5, "downdown");
    // "A swap on the left — cash turns into a cart."
    const tSwapL = cue("s07b", "@swap");
    j3a.fill(tl, tSwapL + 0.1, 0.5); j3b.landSticker(tl, tSwapL + 0.15, { dx: -190, dy: -80, dur: 0.7 });
    m3.arrows(tl, tSwapL + 0.9, "swapL");
    // "Or a swap on the right — one claim turns into another." (one plain tag lifts off, a differently-coloured one lands in the same spot)
    const tSwapR = cue("s07b", "@swap", 2), tAnother = cue("s07b", "@another");
    L3.lift(tl, K, p1, tSwapR + 0.5, { dur: 0.25 });
    L3.drop(tl, K, p2, tAnother - 0.2);
    m4.arrows(tl, tAnother + 0.2, "swapR");
    // "You'll meet this one in May." — Khata taps the fourth mini's beam once and looks at us (gesture only)
    const tMay = cue("s07b", "@may");
    khata.arm(tl, tMay - 0.5, "L", 110, 0.3); khata.arm(tl, tMay - 0.15, "L", 70, 0.15); khata.arm(tl, tMay + 0.5, "L", 15, 0.4);
    khata.look(tl, tMay - 0.4, -8, -2); khata.look(tl, tMay + 0.3, 0, 0);
    // "In every case, the scale never stays tipped." — one level line across all four minis and the HUD; Khata cheers
    const tNever = cue("s07b", "@never");
    minis.forEach((m) => m.levelFlash(tl, tNever)); hud.levelFlash(tl, tNever);
    khata.expr(tl, tNever, "happy"); khata.arm(tl, tNever, "L", 160, 0.3); khata.arm(tl, tNever, "R", 160, 0.3);
    khata.arm(tl, tNever + 1.4, "L", 15, 0.4); khata.arm(tl, tNever + 1.4, "R", 15, 0.4);
  };
})();

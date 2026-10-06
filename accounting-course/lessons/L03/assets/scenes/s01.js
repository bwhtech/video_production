// s01 — Cold open: April 2, daylight. Meera finds the cart and pays ₹36,000 out of the galla. "Did she just lose it?"
// Exit: she snaps the galla shut and the camera rushes into its brass clasp (gold fills the frame) → s01t (the L1/L2 seam shape).
//
// This file ALSO hosts the lesson-local helper kit `window.L3` (the scene files load in order, so every later scene can use it).
(function () {
  // ----------------------------------------------------------------------------------------------- L3 helpers
  const L3 = (window.L3 = window.L3 || {});
  // positioned wrapper (carries the transform attr) + animatable inner group drawn around local (0,0)
  L3.node = (K, parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L3.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L3.stage = (K, parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  // calendar strip (bible §5.7) — full April strip, current date highlighted
  L3.cal = (K, parent, hl) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  // drop-and-place into view / lift off
  L3.drop = (tl, K, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L3.lift = (tl, K, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  // lint: mark every text inside `root` as intentionally layered (device chips: name + amount sit tight on purpose)
  L3.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  // Khata (closed, small) helper
  L3.khata = (K, parent, x, y, s, o = {}) => K.khataRig(parent, x, y, s, { expr: "awake", ...o });
  // a paper card (cream, with optional coloured header) — drawn around local (0,0)
  L3.card = (K, parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    return grp;
  };

  // lesson geometry shared by the scale scenes (s03–s06): base-bottom position + scale of the big taraazu
  L3.BIG = { x: 960, y: 895, s: 1.1 };                  // s04–s06 (device slots sit above the beam pivot)
  L3.BIG3 = { x: 960, y: 860, s: 1.2 };                 // s03: the scale is the hero, no device
  L3.JAR_S = [0, 0.8, 0.8, 0.66];                       // jar scale by number of jars on the left pan
  L3.TAG_S = [0, 0.6, 0.52, 0.44];                       // tag scale by number of tags on the right pan
  L3.slots = (n, step) => Array.from({ length: n }, (_, i) => (i - (n - 1) / 2) * step);
  // asset jar on the LEFT pan (slot i of n)
  L3.jar = (K, sc, i, n, o = {}) => {
    const xs = L3.slots(n, n === 3 ? 122 : n === 2 ? 150 : 0);
    return K.jarRig(sc.pans.L.g, xs[i], 0, L3.JAR_S[n] || 0.66, { edge: K.C.dr, ...o });
  };
  // claim tag on the RIGHT pan (slot i of n)
  L3.tag = (K, sc, i, n, o = {}) => {
    const xs = L3.slots(n, n === 3 ? 112 : n === 2 ? 136 : 0);
    return K.claimTag(sc.pans.R.g, xs[i], 0, L3.TAG_S[n] || 0.5, { size: 54, ...o });
  };

  // ----------------------------------------------------------------------------------------------- scene
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0";
    const GROUND = 985;
    const cam = K.g(svg, { id: "s01-cam" });
    L3.stage(K, cam, C.saffron, 860);
        // a sliver of street behind: two neighbour stalls (tone-on-tone)
    const GX = 255, GBASE = GROUND - 150, GS = 1.12;                      // galla on a crate
    const CLASP = [GX, GBASE - 81 * GS];

    // ---- cart (no galla, no props yet — they drop in on the VO)
    const stall = K.stall(cam, 1580, GROUND, 0.98, { galla: false, noProps: true });
    const propAt = (x, y) => L3.hide(L3.node(K, stall.jit, x, y));
    const kettle1 = propAt(130, -300), kettle2 = propAt(30, -300), glasses = propAt(-120, -300);
    K.kettle(kettle1, 0, 0, 1); K.kettle(kettle2, 0, 0, 0.92);
    const stack = K.tumblerStack(glasses, 0, 0, 1.0, { n: 5 });
    // price tag swinging from the awning's left corner
    const priceHang = L3.node(K, cam, 1380, 650);
    const price = K.priceTag(priceHang, 0, 0, 1.3, { amount: 0, rot: -3 });
    L3.hide(priceHang);

    // ---- cart-wala (left of the cart) and the galla crate
    const cw = K.cartWala(cam, 1120, GROUND, 1.0, { expr: "happy", flip: true });
    K.crate(cam, GX, GROUND, 270, 150);
    const galla = K.galla(cam, GX, GBASE, GS, { open: true, overflow: true });
    const bal = K.ticker(cam, GX, 540, 1, { value: 80000, size: 74, chip: true, w: 360, h: 112, edge: C.dr });

    // ---- Meera, hero
    const m = K.meera(cam, 650, GROUND, 1.05, { expr: "neutral", aL: [12, 8], aR: [12, 8] });
    // bundle in her right hand (rides the hand upright)
    const bundleP = K.g(m.handAnchor("R"), {});
    K.bundle(bundleP, 8, -8, 0.7, -8);
    K.holdProp(m, "R", bundleP, [12, 8]);
    L3.hide(bundleP);
    const bundleC = K.g(cw.handAnchor("L"), {});
    K.bundle(bundleC, -8, -8, 0.7, 8);
    K.holdProp(cw, "L", bundleC, [12, 8]);
    L3.hide(bundleC);
    // '?' above Meera
    const qPos = L3.node(K, cam, 700, 235);
    K.qmark(qPos, 0, 0, 1.7, C.coral); L3.hide(qPos);

    // calendar strip, `2` (the first trading day)
    const cal = L3.cal(K, svg, 2);
    // fade from black + gold plate for the clasp rush (both above the camera)
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const gold = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.brass, opacity: 0 }, svg);

    // ======================================================================================= timeline
    const T0 = sc.start;
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.2, ease: "power1.out" }, T0);
    const tGap = segEnd("s01a");
    const tRush = cue("s01b", "@rupees", 2) + 0.2, tShut = tRush - 0.3;
    // slow push toward the galla for the whole scene (7 %), then the clasp rush
    tl.fromTo(cam, { scale: 1, x: 0, y: 0, svgOrigin: `${CLASP[0]} ${CLASP[1]}` },
      { scale: 1.07, x: 0, y: 0, svgOrigin: `${CLASP[0]} ${CLASP[1]}`, duration: tRush - T0, ease: "none" }, T0);

    // "April the second." — calendar tab pulses once; Meera looks up and smiles
    m.expr(tl, cue("s01a", "@meera") - 0.15, "happy").look(tl, cue("s01a", "@meera") - 0.15, 4, -2);
    // "has found her cart" — points at it, proud
    const tFound = cue("s01a", "@found");
    m.point(tl, tFound - 0.1, "R", 76).look(tl, tFound, 8, -2);
    m.arm(tl, cue("s01a", "@price") - 0.25, "R", 12, 8, 0.35);            // relax
    stall.awning && tl.to(stall.awning, { y: -8, duration: 0.2, ease: K.stepEase(0.2, "power2.out", cue("s01a", "@cart")) }, cue("s01a", "@cart"));
    stall.awning && tl.to(stall.awning, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.out", cue("s01a", "@cart") + 0.2) }, cue("s01a", "@cart") + 0.2);
    // wheels / stove / kettles / glasses — each drops in on its word
    stall.wheels.forEach((w) => K.pulseNode(tl, w, cue("s01a", "@wheels"), 1.1));
    L3.drop(tl, K, kettle1, cue("s01a", "@stove"));
    L3.drop(tl, K, kettle2, cue("s01a", "@kettles"));
    stack.items.forEach((it) => L3.hide(it));
    tl.set(glasses, { opacity: 1 }, cue("s01a", "@stack") - 0.02);
    stack.dropIn(tl, cue("s01a", "@stack"), { step: 0.12 });
    // "The price?" — the tag swings once toward the camera and settles
    const tPrice = cue("s01a", "@price");
    L3.drop(tl, K, priceHang, tPrice, { from: 1.14, dur: 0.4 });
    tl.fromTo(price.g, { rotation: -9, svgOrigin: "0 -150" }, { rotation: 0, svgOrigin: "0 -150", duration: 0.5, ease: K.stepEase(0.5, "power2.out", tPrice) , immediateRender: false }, tPrice);
    price.tick(tl, cue("s01a", "@thirty-six"), 0, 36000, 0.9);
    m.look(tl, tPrice, 8, -3).expr(tl, cue("s01a", "@thirty-six"), "worried");

    // the gap: Meera counts notes into the cart-wala's hand, the galla thins, the ticker drops 80,000 → 44,000
    const flick = (t) => {
      m.arm(tl, t, "R", 62, 40, 0.2);
      cw.arm(tl, t + 0.1, "L", 52, 36, 0.2);
      m.arm(tl, t + 0.5, "R", 22, 70, 0.2);
    };
    m.arm(tl, tGap + 0.05, "R", 22, 70, 0.25);
    tl.set(bundleP, { opacity: 1 }, tGap + 0.15);
    [0.25, 0.7].forEach((d) => flick(tGap + d));
    tl.set(bundleP, { opacity: 0 }, tGap + 1.12); tl.set(bundleC, { opacity: 1 }, tGap + 1.12);
    cw.arm(tl, tGap + 1.15, "L", 12, 8, 0.3);
    tl.set(bundleC, { opacity: 0 }, tGap + 1.5);
    bal.to(tl, tGap + 0.4, 44000, 0.9);
    tl.to(galla.notes, { scale: 0.7, svgOrigin: "0 -120", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tGap + 0.5) }, tGap + 0.5);
    tl.to(galla.notes, { scale: 0.45, svgOrigin: "0 -120", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tGap + 1.0) }, tGap + 1.0);
    cw.expr(tl, tGap + 1.1, "grin");

    // s01b "out of the galla" — she looks into the near-empty galla, gulps (worried)
    const tOut = cue("s01b", "@galla");
    m.look(tl, tOut - 0.25, -9, 6).expr(tl, tOut - 0.2, "worried").headTilt(tl, tOut, 5);
    tl.to(m.lift, { y: 6, duration: 0.13, ease: K.stepEase(0.13, "power2.out", tOut) }, tOut);      // gulp: head dip, two steps
    tl.to(m.lift, { y: 0, duration: 0.13, ease: K.stepEase(0.13, "power2.out", tOut + 0.27) }, tOut + 0.27);
    // "So did Meera just lose…" — `?` pops above her; she turns to us, puzzled
    const tQ = cue("s01b", "@lose");
    m.look(tl, tQ - 0.1, 0, -6).expr(tl, tQ - 0.1, "puzzled").headTilt(tl, tQ, -7);
    L3.drop(tl, K, qPos, tQ + 0.15, { from: 1.2 });
    // exit: snap the galla shut, then rush into the clasp
    m.arm(tl, tGap + 1.55, "R", 12, 8, 0.3);
    m.arm(tl, tShut - 0.2, "L", 30, 78, 0.17);
    galla.shut(tl, tShut);
    tl.to(cam, { scale: 11, x: 960 - CLASP[0], y: 540 - CLASP[1], svgOrigin: `${CLASP[0]} ${CLASP[1]}`, duration: sc.end - tRush, ease: "power3.in" }, tRush);
    tl.to(gold, { opacity: 1, duration: 0.16, ease: "none" }, sc.end - 0.16);

    // acting texture
    m.blinks(tl, T0 + 1.8, sc.end, 3.3);
    cw.blinks(tl, T0 + 2.4, sc.end, 3.7);
    m.jitter(tl, T0, sc.end); cw.jitter(tl, T0, sc.end);
  };
})();

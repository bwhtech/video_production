// s11 — Next time: April 2, daylight. A shiny new cart with a ₹36,000 price tag; the cart-wala waits; Meera holds the notes over the galla.
// Freeze on "lose". The calendar ticks 1 → 2 (the only tick in this lesson). Out: Khata's "3" cover slams shut → s12 swings it open.
(function () {
  window.OWN_SEAM_IN.s12 = true;
  // full-frame red cloth ledger cover with a gold numeral (same art as L1's cover, Lesson 3)
  window.DH.cover = (parent, K, numeral = "3") => {
    const C = K.C, n = window.DH.node(parent, 0, 0);
    n.outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(n.inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(n.inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(n.inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(n.inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(n.inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(n.inner, 800, 545, numeral, { size: 300, weight: 800, color: C.gold });
    K.text(n.inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return n;
  };

  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", T0 = sc.start;
    const cam = K.g(svg, { id: "s11-cam" });
    K.wall(cam, C.saffron, 860);
    K.paper(cam, K.cutRect(-40, 440, 2000, 420, 0, 80), "#e49430", { opacity: 0.35 });    // street row
    window.skyline(cam, C.saffron, 860, 17, { minH: 110, maxH: 150, dark: 0.1 });   // tone-on-tone street skyline
    K.table(cam, 860);
    const cal = DH.calendar(cam, 1);
    // new cart (stall; its stove, glasses, tag arrive on the VO) + cart-wala
    const SX = 1290;
    const stall = K.stall(cam, SX, 985, 1.05, { noProps: true, face: false });
    const stove = K.g(cam, { opacity: 0 }); K.kettle(stove, SX + 120, 985 - 300 * 1.05, 1.05);
    const glasses = K.tumblerStack(cam, SX - 120, 985 - 300 * 1.05, 1.05, { n: 5 });
    glasses.items.forEach((it) => it.setAttribute("opacity", "0"));
    const ptag = K.priceTag(cam, SX - 250, 470, 1.6, { amount: 36000, rot: -4, hidden: true });
    const cw = K.cartWala(cam, 1760, 985, 1.0, { expr: "happy" });
    // Meera + the open galla on a crate, notes in hand
    K.crate(cam, 420, 975, 360, 200);
    const galla = K.galla(cam, 420, 775, 1.5, { open: true, overflow: true });
    const m = K.meera(cam, 800, 985, 1.0, { expr: "happy", aL: [12, 8], aR: [20, 70] });
    const hold = DH.node(m.handAnchor("R"), 0, 0); K.bundle(hold.inner, 10, -10, 0.9, -8);
    const qm = DH.node(cam, 790, 300); K.qmark(qm.inner, 0, 0, 2.2, C.cr); DH.hide(qm.inner);
    const cover = window.DH.cover(svg, K, "3");

    // ======================================================================== timeline
    cal.tickTo(tl, T0 + 0.3, 2, { dur: 0.45 });
    tl.fromTo(cam, { scale: 1, svgOrigin: "1000 600" }, { scale: 1.06, svgOrigin: "1000 600", duration: sc.end - T0 - 0.5, ease: "none", immediateRender: false }, T0);
    m.blinks(tl, T0 + 1, sc.end, 3.3); cw.blinks(tl, T0 + 2, sc.end, 3.7);
    tl.set(stove, { opacity: 0 }, 0);
    // "spends thirty-six thousand rupees" — the price tag; Meera lifts the notes over the galla
    DH.pop(tl, ptag.body, cue("s11", "@thirty-six"), { from: 1.1 });
    ptag.tick(tl, cue("s11", "@thirty-six"), 0, 36000, 0.8);
    m.arm(tl, cue("s11", "@spends"), "R", 60, 40, 0.3);
    // "a cart, a stove and a stack of glasses" — a small drop-and-place for each
    DH.pulse(tl, stall.jit, cue("s11", "@cart,"), 1.03);
    tl.fromTo(stove, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, cue("s11", "@stove"));
    glasses.dropIn(tl, cue("s11", "@glasses"), { step: 0.08 });
    cw.arm(tl, cue("s11", "@cart,"), "R", 40, 40, 0.3).arm(tl, cue("s11", "@glasses") + 0.6, "R", 12, 8, 0.3);
    // "did she just lose …" — worried, '?' pops, the push-in continues
    const tLose = cue("s11", "@lose");
    m.expr(tl, tLose - 0.2, "worried").look(tl, tLose, 0, -6);
    DH.pop(tl, qm.inner, tLose + 0.1, { from: 0.5 });
    // cover slams shut with a "3"
    const tLand = sc.end - 0.15;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "back.out(1.25)" }, tLand + 0.06);
    tl.set(cam, { autoAlpha: 0 }, sc.end); tl.set(cover.outer, { autoAlpha: 0 }, sc.end);
    m.jitter(tl, T0, sc.end); cw.jitter(tl, T0, sc.end);
  };
})();

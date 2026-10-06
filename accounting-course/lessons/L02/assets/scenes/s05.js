// s05 — Ravi Mama's ₹30,000 (liability). Settles from s04's whip pan; Ravi strides in, hands over ₹30,000 (galla → ₹80,000);
// Meera's tag will not stick to the new money, Ravi's does. Liability.
// Out: Meera's happy thought bubble swells to fill the frame (s06 owns the continuation).
(function () {
  window.OWN_SEAM_IN.s06 = true;
  window.S05_BUBBLE = { x: 1440, y: 232, color: "#fff4e2" };

  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", W = window.S_WHIP, T0 = sc.start;
    const GX = 360, GY = 770, GS = 2.3, BY = 395, PS = 1.0, TG = 1.3;
    // a proper furled umbrella (navy canopy, wooden crook, brass tip) — grip point at (0,0), tip ~330 px below at PS = 1
    const umbrella = (parent) => {
      const g = K.shadow(K.g(parent, { transform: "scale(1.12)" }), 1);
      K.ink(g, [[0, -4], [0, 40]], 12, "#6e4422");
      K.ink(g, K.arc(-17, -4, 17, 0, Math.PI, 10), 12, "#6e4422");
      K.paper(g, K.cutPoly([[0, 30], [24, 90], [27, 150], [12, 218], [0, 236], [-12, 218], [-27, 150], [-24, 90]], 1.4, 14), C.navy);
      K.ink(g, [[-6, 60], [-12, 200]], 4, "#4a5f86", { opacity: 0.8 });
      K.paper(g, K.cutRect(-27, 112, 54, 14, 1, 8), C.cream);
      K.paper(g, K.cutRect(-4, 232, 8, 14, 0.8, 6), C.brass);
      return g;
    };
    const cam = K.g(svg, { id: "s05-cam" });
    K.wall(cam, C.saffron, 860);
    K.paper(cam, K.cutRect(-1500, -40, 1500, 1000, 0, 80), C.saffron);                 // set continues left for the whip-pan settle
    window.skyline(cam, C.saffron, 860, 5, { x0: -1500, x1: 2100, minH: 110, maxH: 150, dark: 0.1 });
    K.table(cam, 860);
    K.paper(cam, K.cutRect(-1500, 856, 1500, 330, 0, 80), "#b7895a");
    K.crate(cam, GX, 960, 580, 200);
    const galla = K.galla(cam, GX, GY, GS, { open: true, overflow: true });
    const tick = K.ticker(cam, GX, 215, 1, { value: 50000, size: 84, chip: true, w: 470, h: 118, edge: C.dr });
    const cal = DH.calendar(cam, 1);

    // claim tags + strings live BEHIND the people
    const MX = 1290, RX = 1700, HM = [MX - PS * 235, 985 - PS * 365], HR = [RX - PS * 235, 985 - PS * 365];
    const ETX = 770, ETY = 735, RTX = 1010, RTY = 905;     // Meera's tag / Ravi's tag (bottom centres)
    const eq = K.equityCard(cam, ETX, ETY, TG, { pockets: 2, capital: 50000 });         // folded: Meera's face tag
    DH.string(tl, cam, 0, [ETX, ETY - 150 * TG], HM, 0.01, 30);
    const ravi = K.claimTag(cam, RTX, RTY, TG, { face: "ravi", amount: 30000, hidden: true });
    const secondM = K.claimTag(cam, GX + 330, 560, 1.1, { face: "meera", amount: 50000, hidden: true });

    [eq.g, secondM.g, ravi.g].forEach((e) => { e.setAttribute("data-layout-allow-overlap", "true"); e.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true")); });
    const m = K.meera(cam, MX, 985, PS, { expr: "happy", aL: [52, 60], aR: [12, 8] });
    const r = K.raviMama(cam, RX, 985, PS, { expr: "proud", aL: [12, 8], aR: [12, 8] });
    gsap.set(r.mover, { x: 600 });
    const um = K.g(r.handAnchor("R"), {}); umbrella(um); K.holdProp(r, "R", um, [12, 8]);

    // new money: the ₹30,000 bundle (flies from Ravi to the galla), its chip, the blank tag
    const bun = DH.node(cam, RX - 170, 700); K.bundle(bun.inner, 0, 0, 1.9, -8); DH.hide(bun.outer);
    const chip = DH.node(cam, 1590, 300); K.label(chip.inner, 0, 0, "₹30,000", { size: 64, bg: "paper", rot: -3, shadow: 2 }); DH.hide(chip.inner);
    const slip = DH.node(cam, MX + 80, 780); K.slip(slip.inner, 0, 0, 1.3, 6, "handshake"); DH.hide(slip.outer);
    const blank = DH.node(cam, GX + 200, BY + 40); DH.blankTag(K.g(blank.inner, { transform: `scale(${TG})` }), 190, 150); DH.hide(blank.outer);
    const liab = DH.node(cam, 1010, 345); K.label(liab.inner, 0, 0, "Liability", { size: 72, bg: C.cr, shadow: 2 }); DH.hide(liab.inner);
    // "give it back" arrow (revealed left → right by a clip)
    const clip = K.el("clipPath", { id: "s05-arrowclip" }, svg), clipR = K.el("rect", { x: 0, y: 180, width: 0, height: 340 }, clip);
    const back = K.g(cam, { "clip-path": "url(#s05-arrowclip)" });
    K.curveArrow(back, [[GX + 290, 430], [800, 290], [1150, 250], [1480, 300], [1640, 360]], C.cr, 16);
    // thought bubble (seam out): Meera's happy daydream
    const BB = window.S05_BUBBLE;
    const bub = DH.node(cam, BB.x, BB.y);
    [[-130, 150, 16], [-100, 118, 24], [-70, 84, 32]].forEach(([dx, dy, rr]) => K.tex(K.shadow(bub.inner, 1), K.cutEll(dx, dy, rr, rr * 0.9, 1), "pat-paper"));
    K.paper(K.shadow(bub.inner, 2), K.cutEll(0, 0, 230, 130, 3), BB.color);
    const bc = K.g(bub.inner, {}); K.medallion(bc, -118, 0, 44, "trending-up", C.leaf);
    K.text(bc, 40, 4, "₹80,000", { size: 56, weight: 800 });
    bub.outer.setAttribute("data-layout-allow-overlap", "true"); DH.hide(bub.inner);

    // ======================================================================== timeline
    tl.fromTo(cam, { x: W.dx, filter: `blur(${W.blur}px)` }, { x: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", immediateRender: true }, T0);
    tl.set(cam, { filter: "none" }, T0 + 0.62);
    tl.fromTo(cam, { scale: 1.0, svgOrigin: "960 640" }, { scale: 1.04, svgOrigin: "960 640", duration: sc.end - T0 - 0.6, ease: "none", immediateRender: false }, T0 + 0.6);
    m.blinks(tl, T0 + 1, sc.end, 3.3); r.blinks(tl, T0 + 2, sc.end, 3.7);

    // s05a — Ravi walks in: "Ravi Mama. Umbrella. Moustache. Very proud of his niece."
    const tRavi = cue("s05a", "@ravi");
    r.walkTo(tl, cue("s05a", "@someone"), RX, tRavi - cue("s05a", "@someone"));
    m.look(tl, cue("s05a", "@someone"), 7, 0);
    const tU = cue("s05a", "@umbrella");                                      // umbrella tap
    r.arm(tl, tU - 0.25, "R", 38, 8, 0.2); r.arm(tl, tU, "R", 12, 8, 0.12);
    r.expr(tl, cue("s05a", "@moustache"), "proud").headTilt(tl, cue("s05a", "@moustache"), 7);
    const tVery = cue("s05a", "@very");
    r.lean(tl, tVery, -2); r.arm(tl, tVery, "L", 24, 80, 0.3).headTilt(tl, tVery + 0.4, 0);
    m.expr(tl, cue("s05a", "@proud"), "grin");
    r.arm(tl, cue("s05a", "@he") - 0.2, "L", 52, 60, 0.3).lean(tl, cue("s05a", "@he"), 0);
    // "thirty thousand rupees — a loan": the bundle arcs into the galla; ticker 50,000 → 80,000
    const tThirty = cue("s05a", "@thirty");
    DH.pop(tl, chip.inner, tThirty - 0.1);
    tl.fromTo(bun.outer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05, immediateRender: false }, tThirty);
    DH.fly(tl, bun.outer, tThirty + 0.2, [RX - 170, 700], [GX, BY + 20], 1.1, 260);
    DH.out(tl, chip.inner, tThirty + 0.9, 0.25);
    const tLand = tThirty + 1.3;
    galla.open(tl, tLand - 0.2, { notes: false });
    tick.to(tl, tLand, 80000, 0.8);
    tl.to(galla.body, { y: -10, duration: 0.2, ease: K.stepEase(0.2, "power2.out", tLand) }, tLand);
    tl.to(galla.body, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.inOut", tLand + 0.2) }, tLand + 0.2);
    // "She'll pay it back" — Meera hands over a small IOU slip; he pockets it
    const tPay = cue("s05a", "@pay");
    m.arm(tl, tPay - 0.2, "R", 48, 40, 0.25);
    tl.fromTo(slip.outer, { autoAlpha: 0, x: MX + 80, y: 780 }, { autoAlpha: 1, duration: 0.1, immediateRender: false }, tPay);
    DH.fly(tl, slip.outer, tPay, [MX + 80, 780], [HR[0], HR[1] + 20], 0.7, 60);
    tl.to(slip.outer, { autoAlpha: 0, duration: 0.15 }, tPay + 0.75);
    m.arm(tl, tPay + 0.5, "R", 12, 8, 0.3);

    // s05b — "what tag goes on this new money?" a blank tag on the bundle; Meera's face tag slides off; Ravi's sticks
    const tTag = cue("s05b", "@tag");
    tick.pulse(tl, cue("s05b", "@eighty"), 1.06);
    tl.fromTo(blank.outer, { autoAlpha: 0, y: BY + 20 }, { autoAlpha: 1, y: BY + 40, duration: 0.3, ease: "power2.in", immediateRender: false }, tTag - 0.1);
    const tNot = cue("s05b", "@not");
    secondM.enter(tl, tNot - 0.1);
    m.expr(tl, tNot, "worried");
    tl.to(secondM.g, { x: 700, duration: 0.8, ease: "power2.in" }, tNot + 0.5);
    tl.to(secondM.body, { autoAlpha: 0, duration: 0.3 }, tNot + 0.9);
    // "It came from Ravi Mama" — the tag leaves the bundle, Ravi's face stamps on, its string runs to his hand
    const tCame = cue("s05b", "@came"), tMama = cue("s05b", "@mama,");
    tl.to(blank.outer, { x: RTX, duration: 0.8, ease: "power1.inOut" }, tCame);
    tl.to(blank.outer, { y: RTY - 150 * TG - 60, duration: 0.4, ease: "power2.out" }, tCame);
    tl.to(blank.outer, { y: RTY - 150 * TG, duration: 0.4, ease: "power2.in" }, tCame + 0.4);
    tl.to(blank.outer, { autoAlpha: 0, duration: 0.1 }, tMama);
    ravi.enter(tl, tMama);
    ravi.stringTo(tl, cue("s05b", "@and") + 0.1, HR[0], HR[1], { dur: 0.7 });
    m.expr(tl, tMama + 0.3, "happy"); r.expr(tl, tMama, "proud");
    // "the stall has to give it back" — an orange arrow draws once from galla to Ravi
    const tBack = cue("s05b", "@give");
    tl.to(clipR, { attr: { width: 1920 }, duration: 0.9, ease: "power1.inOut" }, tBack);
    tl.set(clipR, { attr: { width: 0 } }, 0);
    // "called a liability" — 0.5 s stillness, then the chip drops on Ravi's string
    const tLiab = cue("s05b", "@liability", 1);
    DH.pop(tl, liab.inner, tLiab, { from: 1.12 });
    ravi.pulse(tl, tLiab + 0.2, 1.04);

    // seam out: the thought bubble pops beside Meera's head and swells to fill the frame (s06 continues inside it)
    const tBub = cue("s05b", "@loan");
    DH.pop(tl, bub.inner, tBub - 0.2, { from: 0.4, dur: 0.4 });
    m.expr(tl, tBub, "joy");
    const tSw = sc.end - 1.3;
    tl.to(bub.inner, { scale: 13.5, svgOrigin: O, duration: 1.3, ease: "power3.in" }, tSw);
    tl.to(bub.outer, { x: 960, y: 560, duration: 1.3, ease: "power2.in" }, tSw);
    tl.to(bc, { autoAlpha: 0, duration: 0.25 }, tSw + 0.55);
    tl.set(cam, { autoAlpha: 0 }, sc.end);   // s06 sits on the lower track; reveal its contracting bubble at the cut
    m.jitter(tl, T0, sc.end); r.jitter(tl, T0, sc.end);
  };
})();

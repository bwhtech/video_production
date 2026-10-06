// s06 — Misconception: "Meera is ₹30,000 richer!" Inside Meera's daydream her own number jumps to ₹80,000 → red ✗ stamp (Khata) →
// the truth: cash +30,000, owes +30,000, her share still ₹50,000. A liability isn't bad: someone else's money, working for you.
// In : s05's thought bubble has filled the frame (cream); it contracts to a big bubble on a coral wall.
// Out: default torn-paper wipe (deviation: storyboard's "bubble shrinks into her head" is not hand-authored).
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", T0 = sc.start;
    const cam = K.g(svg, { id: "s06-cam" });
    K.wall(cam, C.coral, 1100);
    const cal = DH.calendar(cam, 1);
    const plate = K.g(cam, {});
    K.paper(K.shadow(plate, 2), K.cutEll(960, 565, 920, 505, 3, 60), "#fff4e2");
    plate.setAttribute("data-layout-allow-overlap", "true");
    const stuff = K.g(cam, {});            // everything inside the daydream
    // ground line inside the bubble
    K.paper(stuff, K.cutRect(330, 975, 1260, 14, 0.5, 60), "#e7d3b0");

    // galla (left) + its ticker; Meera (centre) + her own ticker
    const GX = 470;
    const galla = K.galla(stuff, GX, 880, 1.2, { open: true, overflow: true });
    const gt = K.ticker(stuff, GX, 330, 1, { value: 50000, size: 70, chip: true, w: 380, h: 100, edge: C.dr });
    const m = K.meera(stuff, 960, 985, 0.85, { expr: "joy", aL: [12, 8], aR: [12, 8] });
    const mt = K.ticker(stuff, 960, 380, 1, { value: 50000, size: 70, chip: true, w: 380, h: 100, edge: C.cr });
    const up = DH.node(stuff, 1170, 380); K.arrowShape(up.inner, 0, 0, 90, C.ink, -1, -90, 26); DH.hide(up.inner);   // ink ↑ (never red/green)
    const eqChip = DH.node(stuff, 960, 470); K.label(eqChip.inner, 0, 0, "Equity", { size: 50, bg: C.cr, shadow: 2 }); DH.hide(eqChip.inner);
    // the truth: two level chips
    const colL = DH.node(stuff, 560, 300), colR = DH.node(stuff, 1360, 300);
    K.label(colL.inner, 0, -80, "Cash", { size: 50, bg: C.dr, shadow: 2 });
    K.label(colR.inner, 0, -80, "Liability", { size: 50, bg: C.cr, shadow: 2 });
    DH.hide(colL.inner); DH.hide(colR.inner);
    const tL = K.ticker(colL.inner, 0, 10, 1, { value: 0, size: 64, signed: true, chip: true, w: 340, h: 96, edge: C.dr });
    const tR = K.ticker(colR.inner, 0, 10, 1, { value: 0, size: 64, signed: true, chip: true, w: 340, h: 96, edge: C.cr });
    // the Ravi-tagged bundle that grows arms and carries a kettle across (the "someone else's money, working" gag)
    const wk = DH.node(stuff, 400, 960); DH.hide(wk.outer);
    const wsc = K.g(wk.inner, { transform: "scale(1.6)" });
    const wb = K.g(wsc, {});
    K.bundle(wb, 0, -40, 1.1, 0);
    K.faceTag(wb, 8, -92, "ravi", 0.9, 0);
    const armL = K.g(wsc, {}), armR = K.g(wsc, {});
    K.ink(armL, [[-46, -50], [-82, -90], [-70, -128]], 11, C.skin); K.ink(armR, [[46, -50], [82, -90], [70, -128]], 11, C.skin);
    const kt = K.g(wsc, { transform: "translate(0 -150) scale(0.6)" }); K.kettle(kt, 0, 0, 1);
    // Khata (outside the bubble, bottom-left) — stamps
    const k = K.khataRig(cam, 130, 1055, 0.45, { expr: "awake" });

    // ======================================================================== timeline
    // the bubble contracts from "full frame" to its resting size; the daydream fades in
    tl.fromTo(plate, { scale: 3.4, svgOrigin: "960 565" }, { scale: 1, svgOrigin: "960 565", duration: 0.9, ease: "power2.inOut", immediateRender: true }, T0);
    tl.fromTo(stuff, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out", immediateRender: true }, T0 + 0.6);
    m.blinks(tl, T0 + 1, sc.end, 3.3);
    // s06a
    const tGal = cue("s06a", "@galla");
    m.look(tl, tGal, -8, -2);
    gt.to(tl, cue("s06a", "@eighty"), 80000, 0.8);
    gt.pulse(tl, cue("s06a", "@thousand", 2) + 0.7, 1.06);
    m.look(tl, cue("s06a", "@so"), 0, -6).expr(tl, cue("s06a", "@so"), "grin");
    const tR80 = cue("s06a", "@richer");
    mt.to(tl, tR80, 80000, 0.4);
    DH.pop(tl, up.inner, tR80);
    m.pose(tl, tR80 - 0.1, { aL: [160, 12], aR: [160, 12], dur: 0.3 }).expr(tl, tR80, "joy");
    m.hop(tl, tR80 + 0.25, { height: 24 });
    // the gap: Khata stamps the ✗ on her ticker
    const tStamp = segEnd("s06a") + 0.35;
    k.arm(tl, tStamp - 0.25, "R", 120, 0.2).arm(tl, tStamp, "R", 15, 0.2);
    const stamp = K.stamp(tl, stuff, 960, 380, tStamp, 1.5);
    m.pose(tl, tStamp + 0.2, { aL: [12, 8], aR: [12, 8], dur: 0.3 });
    // s06b
    const tNope = cue("s06b", "@nope");
    m.expr(tl, tNope, "worried").look(tl, tNope, 0, 2);
    // "the cash went up by thirty thousand … what the stall owes went up … too": the picture clears to two level columns
    const tCash = cue("s06b", "@cash");
    DH.out(tl, gt.body, tCash - 0.3, 0.25); DH.out(tl, galla.g, tCash - 0.3, 0.25);
    tl.to(mt.body, { autoAlpha: 0, duration: 0.2 }, tCash - 0.3); DH.out(tl, up.inner, tCash - 0.3, 0.2);
    stamp.lift(tl, tCash - 0.3);
    DH.pop(tl, colL.inner, tCash);
    tL.to(tl, tCash, 30000, 0.8);
    const tOwes = cue("s06b", "@owes");
    DH.pop(tl, colR.inner, tOwes);
    tR.to(tl, tOwes, 30000, 0.8);
    // "Meera's own share? Still fifty thousand. Not one rupee more."
    const tOwn = cue("s06b", "@own");
    DH.out(tl, colL.inner, tOwn - 0.4, 0.25); DH.out(tl, colR.inner, tOwn - 0.4, 0.25);
    tl.fromTo(mt.body, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, immediateRender: false }, tOwn);
    mt.to(tl, tOwn, 80000, 0.01); mt.to(tl, cue("s06b", "@still"), 50000, 0.7);
    DH.pop(tl, eqChip.inner, cue("s06b", "@still") + 0.4);
    const tMore = cue("s06b", "@more");
    m.expr(tl, tMore - 0.5, "sad").expr(tl, tMore + 0.5, "thinking");
    // "a liability isn't a bad thing … someone else's money, working for your business" — the bundle crosses carrying a kettle
    const tLiab = cue("s06b", "@liability"), tWork = cue("s06b", "@working");
    DH.out(tl, eqChip.inner, tLiab - 0.2, 0.2);
    tl.to(mt.body, { autoAlpha: 0, duration: 0.25 }, tLiab - 0.2);
    m.expr(tl, tLiab, "happy");
    const tCross = cue("s06b", "@someone");
    tl.fromTo(wk.outer, { autoAlpha: 0, x: 400 }, { autoAlpha: 1, duration: 0.2, immediateRender: false }, tCross - 0.1);
    const dur = tWork + 0.9 - tCross;
    tl.to(wk.outer, { x: 1480, duration: dur, ease: K.stepEase(dur, "none", tCross) }, tCross);
    const steps = Math.round(dur / 0.27);
    for (let i = 0; i < steps; i++) { const t = tCross + (i * dur) / steps; tl.set(wk.inner, { y: i % 2 ? 0 : -8 }, t); tl.set(armL, { rotation: i % 2 ? 14 : -14, svgOrigin: "-46 -50" }, t); tl.set(armR, { rotation: i % 2 ? -14 : 14, svgOrigin: "46 -50" }, t); }
    tl.set(wk.inner, { y: 0 }, tCross + dur);
    // "remember it isn't yours" — its string goes taut toward the right edge (Ravi, off-screen)
    DH.string(tl, stuff, cue("s06b", "@remember"), [1480, 860], [1900, 800], 0.7, 8);
    m.expr(tl, cue("s06b", "@remember"), "thinking").look(tl, cue("s06b", "@remember"), 9, 2);
    m.jitter(tl, T0, sc.end); k.jitter(tl, T0, sc.end);
  };
})();

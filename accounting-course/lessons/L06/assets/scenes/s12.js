// s12 — Next time (tease). Afternoon at the stall (saffron wall): Meera's CA friend walks in from the right with a fat file folder; two gold-edged rule cards
// (hand + `Dr`, hand + `Cr`) flick out of it and land in front of Meera; freeze (4 % push), Meera's eyes go wide; Khata's "7" cover slams shut over the frame.
// s13 owns the swing-open. In: default torn-paper wipe.
(function () {
  window.OWN_SEAM_IN.s13 = true;
  // a gold-edged rule card: hand-coins medallion + a direction arrow, and the Dr / Cr chip
  L6.goldCard = (K, parent, side) => {
    const C = K.C, n = K.g(parent, {}), col = side === "R" ? C.cr : C.dr;
    K.tex(K.shadow(n, 2), K.cutRect(-100, -110, 200, 220, 2, 22), "pat-paper");
    K.el("path", { d: K.cutRect(-95, -105, 190, 210, 1.2, 22), fill: "none", stroke: C.gold, "stroke-width": 10, "stroke-linejoin": "round" }, n);
    K.medallion(n, -22, -36, 50, "hand-coins");
    L6.arrow(K, n, 58, -36, side === "R" ? "up" : "down", col, 50, 18);
    K.paper(K.shadow(n, 1), K.cutRect(-62, 38, 124, 66, 1.2, 16), col);
    K.text(n, 0, 73, side === "R" ? "Cr" : "Dr", { size: 52, weight: 800, color: K.onColor(col) }).setAttribute("data-layout-allow-overlap", "true");
    return n;
  };

  window.SCENES.s12 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start, GY = 1000;
    const cam = K.g(svg, {});
    L6.stage(K, cam, C.saffron, 880);
    L6.cal(K, svg, 30);
    // the stall (no props — dressed by hand: tumblers + kettle), far right
    const SX = 1640, SS = 0.95;
    const stall = K.stall(cam, SX, GY, SS, { noProps: true });
    [-165, -125, -85].forEach((tx) => K.tumbler(stall.jit, tx, -300));
    K.kettle(stall.jit, 140, -300, 1);
    // cast
    const m = K.meera(cam, 520, GY, 1.0, { expr: "happy" });
    const ca = K.caFriend(cam, 2250, GY, 1.0, { expr: "happy", flip: true });
    // the two rule cards start at the folder, fly out and land in front of Meera
    const MX = [800, 990], MY = 640, FOLD = [1290, 700];
    const cardR = ["L", "R"].map((side, i) => {
      const r = L6.rig(K, cam, FOLD[0], FOLD[1]); L6.hide(r.inner); L6.goldCard(K, r.inner, side);
      gsap.set(r.sc, { scale: 0.5, svgOrigin: O, rotation: -14 + i * 12 });
      return r;
    });
    const cover = L6.cover(K, svg, 7);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, sc.end, 3.3);
    L6.push(tl, cam, T0, sc.end - 1.3 - T0, "960 560", 1, 1.04);
    // "Next time, Meera's CA friend drops by the stall" — she walks in from the right
    const tF = cue("s12", "@friend");
    ca.walkTo(tl, tF - 1.5, 1260, 2.0);
    m.expr(tl, tF, "happy").look(tl, tF, 8, -2);
    m.arm(tl, tF + 0.2, "R", 150, -20, 0.25); m.arm(tl, tF + 0.9, "R", 12, 8, 0.3);
    // "…with rules." — she lifts the folder, Meera tilts her head
    ca.arm(tl, cue("s12", "@rules") - 0.2, "L", 40, -70, 0.3);
    m.expr(tl, cue("s12", "@rules"), "puzzled").headTilt(tl, cue("s12", "@rules"), -5);
    // "Debit the receiver! Credit the giver!" — one gold card per shout, flicked out of the folder
    [cue("s12", "@debit"), cue("s12", "@credit")].forEach((t, i) => {
      const r = cardR[i];
      K.dropIn(tl, r.inner, t - 0.1, { dur: 0.25 });
      L6.mv(tl, r, t - 0.1, 0.55, { x: MX[i] - FOLD[0], y: MY - FOLD[1] }, "power2.out");
      L6.mv(tl, r, t - 0.1, 0.55, { scale: 1.0, rotation: i ? 5 : -5 }, "power2.out");
      ca.pose(tl, t - 0.25, { aR: [60, 10], dur: 0.25 }); ca.pose(tl, t + 0.5, { aR: [12, 8], dur: 0.3 });
    });
    // "Is that a whole new system to learn?" — Meera's eyes go wide, a freeze, then the "7" cover slams
    const tW = cue("s12", "@whole");
    m.expr(tl, tW, "amazed"); m.look(tl, tW, 6, 2); m.pose(tl, tW + 0.1, { aL: [155, 14], aR: [12, 8], dur: 0.3 });
    const tLand = sc.end - 0.2;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
    L6.allow(svg);
  };
})();

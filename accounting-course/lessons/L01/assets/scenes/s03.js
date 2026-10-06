// s03 · Meet Khata — the mascot wakes, opens, and plants "left page / right page".
// Choreography matches the approved motion tests (studio/index.html, motion-tests/papercut).
// Ends on: Khata open, both pages tinted, arrows up, happy face — s04 rebuilds this exact frame
// and peels the two pages off as its two question cards (s04 owns that seam).
(function () {
  // Hero placement shared with s04's replica frame.
  window.S03_KHATA = { x: 960, y: 950, s: 1.55 };
  window.S03_ARROWS = { y: 300, dx: 392 };

  // Paper stage: cream wall, kraft table, a strip of bunting. s04 rebuilds it too.
  window.S03_STAGE = (K, parent) => {
    const C = K.C;
    K.wall(parent, C.cream, 880);
    K.table(parent, 880);
    // bunting: a string with paper flags
    const bg = K.g(parent, {});
    const yAt = (x) => 34 + 70 * (1 - ((x - 960) / 1000) ** 2);
    const pts = Array.from({ length: 25 }, (_, i) => { const x = -20 + i * 82; return [x, yAt(x)]; });
    K.ink(bg, pts, 3, C.woodDark, { opacity: 0.6 });
    const cols = [C.coral, C.saffron, C.teal, C.sky, C.violet, C.leaf];
    for (let i = 1; i < 24; i += 1) {
      const x = -20 + i * 82, py = yAt(x), slope = (yAt(x + 1) - yAt(x - 1)) / 2, a = Math.atan(slope);
      const ux = Math.cos(a) * 28, uy = Math.sin(a) * 28;
      K.paper(K.shadow(bg, 1), K.cutPoly([[x - ux, py - uy], [x + ux, py + uy], [x - uy * 0.1, py + 56]], 1.2, 10), cols[i % cols.length]);
    }
    return bg;
  };

  SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, { x: KXp, y: KYp, s: KS } = window.S03_KHATA;
    const cam = K.g(svg, {});
    window.S03_STAGE(K, cam);

    const k = K.khataRig(cam, KXp, KYp, KS, { expr: "sleep", armL: 15, armR: 15 });

    // arrows over each page (pop in on "left" / "right")
    const mkArrow = (dir, color) => {
      const pos = K.g(cam, { transform: `translate(${KXp + dir * window.S03_ARROWS.dx} ${window.S03_ARROWS.y})` });
      const a = K.g(pos, {});
      K.arrowShape(a, 0, 0, 200, color, -dir, 0, 34);
      tl.set(a, { scale: 0, svgOrigin: "0 0" }, sc.start);
      return a;
    };
    const arrowL = mkArrow(-1, C.dr), arrowR = mkArrow(1, C.cr); // (arrowShape's head is at -x, so dir flips it)

    // ---- camera: one slow push across the scene (s04 starts from the same framing and pulls back)
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 640" }, { scale: 1.06, svgOrigin: "960 640", duration: sc.end - sc.start, ease: "none" }, sc.start);

    // ---- asleep: z's (a story beat that ends on the wake)
    const tMeet = cue("s03", "@meet");
    k.emote(tl, sc.start + 0.12, "z", Math.max(0.3, tMeet - sc.start - 0.95));

    // stretch-and-yawn just before "Meet", eyes pop open on it
    k.arm(tl, tMeet - 0.45, "L", 150, 0.3).arm(tl, tMeet - 0.45, "R", 150, 0.3);
    k.expr(tl, tMeet, "wow").emote(tl, tMeet + 0.05, "!", 0.8);
    k.arm(tl, tMeet + 0.15, "L", 40, 0.3).arm(tl, tMeet + 0.15, "R", 40, 0.3);

    // "Khata." — hop, land happy
    const tHop = cue("s03", "@khata");
    k.hop(tl, tHop, { height: 90 });
    k.arm(tl, tHop + 0.6, "L", 15, 0.3).arm(tl, tHop + 0.6, "R", 15, 0.3);
    k.expr(tl, tHop + 0.75, "awake", { noTake: true });

    // "ledger book" — proud wiggle
    [[-5, 0.14], [5, 0.2], [0, 0.26]].reduce((tt, [r, d]) => { tl.to(k.body, { rotation: r, svgOrigin: "0 0", duration: d, ease: "power2.inOut" }, tt); return tt + d; }, cue("s03", "@ledger"));   // proud tilt, no spring

    // "your guide" — wave at the viewer with the right arm
    const tWave = cue("s03", "@your");
    k.expr(tl, tWave, "happy", { noTake: true });
    k.arm(tl, tWave, "R", 135, 0.22);
    [0, 1, 2].forEach((i) => {
      k.arm(tl, tWave + 0.22 + i * 0.3, "R", 105, 0.15);
      k.arm(tl, tWave + 0.37 + i * 0.3, "R", 135, 0.15);
    });
    k.arm(tl, tWave + 1.15, "R", 15, 0.3);
    k.expr(tl, tWave + 1.2, "awake", { noTake: true });

    // "Notice something?" — looks up-left, question mark
    const tNotice = cue("s03", "@notice");
    k.look(tl, tNotice, -7, -7).emote(tl, tNotice + 0.18, "?", cue("s03", "@an") - tNotice - 0.25);
    k.look(tl, cue("s03", "@an") - 0.05, 0, 0);

    // "An open book has two sides." — pinch, then the pages fan out
    const tOpen = cue("s03", "@open");
    k.open(tl, tOpen - 0.1, 0.6);
    k.expr(tl, tOpen + 0.5, "happy", { noTake: true });
    k.arm(tl, tOpen + 0.3, "L", 70, 0.3).arm(tl, tOpen + 0.3, "R", 70, 0.3);
    k.arm(tl, tOpen + 0.75, "L", 20, 0.35).arm(tl, tOpen + 0.75, "R", 20, 0.35);
    k.expr(tl, cue("s03", "@sides") + 0.3, "awake", { noTake: true });

    // "A left page," — debit-blue sheet drops, arrow points left, eyes follow
    const tLeft = cue("s03", "@left");
    k.look(tl, tLeft - 0.12, -9, 0).pageTint(tl, tLeft, "left");
    tl.to(arrowL, { scale: 1, svgOrigin: "0 0", duration: 0.35, ease: "power2.out" }, tLeft);
    tl.fromTo(arrowL, { x: 30 }, { x: 0, duration: 0.35, ease: "power3.out" }, tLeft);
    k.arm(tl, tLeft, "L", 60, 0.25).arm(tl, tLeft + 0.9, "L", 20, 0.3);

    // "and a right page." — credit-orange sheet, arrow right
    const tRight = cue("s03", "@right");
    k.look(tl, tRight - 0.14, 9, 0).pageTint(tl, tRight, "right");
    tl.to(arrowR, { scale: 1, svgOrigin: "0 0", duration: 0.35, ease: "power2.out" }, tRight);
    tl.fromTo(arrowR, { x: -30 }, { x: 0, duration: 0.35, ease: "power3.out" }, tRight);
    k.arm(tl, tRight, "R", 60, 0.25).arm(tl, tRight + 0.9, "R", 20, 0.3);

    // "Remember that." — eyes back to camera, little forward lean (lift)
    const tRem = cue("s03", "@remember");
    k.look(tl, tRem, 0, 0);
    tl.to(k.lift, { y: -14, duration: 0.2, ease: K.q("power2.out", 0.2, tRem) }, tRem);
    tl.to(k.lift, { y: 0, duration: 0.35, ease: K.q("power2.out", 0.35, tRem + 0.35) }, tRem + 0.35);

    // stillness … then "think." — wink + sparkles
    const tThink = cue("s03", "@think");
    k.expr(tl, tThink, "wink").emote(tl, tThink + 0.05, "sparkle", 1.0);
    tl.to(k.lift, { y: -26, duration: 0.16, ease: K.q("power2.out", 0.16, tThink) }, tThink);
    tl.to(k.lift, { y: 0, duration: 0.3, ease: K.q("power2.out", 0.3, tThink + 0.16) }, tThink + 0.16);
    k.expr(tl, tThink + 0.65, "happy", { noTake: true });

    // paper wobble while on screen; stops (resets to 0) a beat before the seam so s04's replica matches
    k.jitter(tl, sc.start, sc.end - 0.25, { seed: 31 });
  };
})();

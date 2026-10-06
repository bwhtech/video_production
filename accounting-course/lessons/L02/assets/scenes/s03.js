// s03 — Assets: what the stall has. The galla (₹50,000) is the first jar; a jar is an account. Calendar strip arrives with `1`.
// In : the polaroid from s02 grows until its window is exactly #s03-first (static first frame, below).
// Out: camera pushes into the galla; a note lifts, flips (blank tag stapled on its back) and grows to fill the frame → s04 opens on it.
(function () {
  window.OWN_SEAM_IN.s03 = true;   // s02 owns the polaroid grow into s03
  window.OWN_SEAM_IN.s04 = true;   // this scene owns the note-flip hand-off into s04
  window.S03_NOTE = { w: 150, h: 80, ZOOM: 15, color: "#d9e6cc" };   // shared geometry for the s03→s04 match-cut (s04 redraws it)

  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", T0 = sc.start;
    const GX = 860, GY = 770, GS = 1.9;
    const cam = K.g(svg, { id: "s03-cam" });
    const first = K.g(cam, { id: "s03-first" });
    K.wall(first, C.teal, 860);
    K.table(first, 860);
    const ghost = K.cartGhost(first, 1700, 985, 0.72, { lineOpacity: 0.5 });
    K.crate(first, GX, 960, 540, 190);
    const galla = K.galla(first, GX, GY, GS, { open: true, overflow: true });

    // ticker above the galla (counts 0 → 50,000)
    const tick = K.ticker(cam, GX, 235, 1, { value: 0, size: 80, chip: true, w: 440, h: 112, edge: C.dr, hidden: true });
    // Cash label on the galla (ties on at "Cash.")
    const cashL = DH.node(cam, GX, GY - 30 * GS);
    const cashS = K.g(cashL.inner, {}); K.label(cashS, 0, 0, "Cash", { size: 64, bg: "paper", shadow: 2 });
    // use-cases: milk, rent, cart — each a medallion with a dotted line back to the galla
    const med = [
      { x: GX - 360, y: 540, ic: "milk", w: "@milk" },
      { x: GX + 360, y: 540, ic: "key", w: "@rent" },
      { x: GX, y: 400, ic: "cart", w: "@cart" },
    ].map((d) => {
      const n = DH.node(cam, d.x, d.y);
      const toward = [d.x < GX ? d.x + 170 : d.x > GX ? d.x - 170 : GX, d.y < 500 ? d.y + 100 : d.y + 80];
      DH.dots(n.inner, 0, 0, toward[0] - d.x, toward[1] - d.y, 6, 5);
      if (d.ic === "cart") K.cartArt(K.g(n.inner, { transform: "scale(1.2)" })); else K.medallion(n.inner, 0, 0, 64, d.ic);
      return { ...d, n };
    });
    // "Asset" chip on the crate front
    const assetChip = DH.node(cam, GX, 885); K.label(assetChip.inner, 0, 0, "Asset", { size: 76, bg: C.dr, shadow: 2 });
    // ghost jar of tea leaves + the glass jar outline that drops over the galla
    const jar = K.jarRig(cam, 1420, 960, 1.5, { contents: "leaves", label: "Stock", icon: "leaf", fill: 0.7, labelHidden: true, hidden: true });
    const outline = DH.node(cam, GX, 805);
    {
      const g = outline.inner;
      K.paper(g, K.cutRect(-245, -390, 490, 390, 2, 20), C.glass, { opacity: 0.34 });
      K.el("path", { d: K.cutRect(-245, -390, 490, 390, 2, 20), fill: "none", stroke: "#ffffff", "stroke-width": 7, opacity: 0.9, "stroke-linejoin": "round" }, g);
      K.paper(K.shadow(g, 1), K.cutRect(-262, -436, 524, 46, 2, 18), C.woodDark);
      K.paper(g, K.cutRect(-218, -350, 18, 320, 1, 20), "#ffffff", { opacity: 0.6 });
    }
    DH.hide(outline.inner);
    const accChip = DH.node(cam, 1085, 350); K.label(accChip.inner, 0, 0, "Account", { size: 66, bg: "paper", shadow: 2 });
    const cal = DH.calendar(cam, 1, { hidden: true });

    // note that flips at the seam (K.note face → blank-tag back)
    const NT = window.S03_NOTE;
    const note = DH.node(cam, GX - 20, 560);
    const nFace = K.g(note.inner, {}); K.note(nFace, 0, 0, NT.w, NT.h * 0.95, -6);
    const nBack = K.g(note.inner, {});
    K.paper(K.shadow(nBack, 1), K.cutRect(-NT.w / 2, -NT.h / 2, NT.w, NT.h, 1.8, 16), NT.color);
    DH.blankTag(K.g(nBack, { transform: "translate(0 -10) scale(0.3)" }), 150, 128);
    DH.hide(nBack); DH.hide(note.inner);

    // ======================================================================== timeline
    // calendar strip slides in on the scene's first beat (the seam frame itself has none)
    cal.enter(tl, T0 + 0.3);

    // "fifty thousand rupees in the galla. Cash."
    const tFifty = cue("s03", "@fifty");
    tick.enter(tl, tFifty - 0.15);
    tick.to(tl, tFifty, 50000, 0.95);
    DH.pop(tl, cashS, cue("s03", "@cash") - 0.05);

    // "buy milk … pay rent … buy a cart" — three medallions, one per phrase
    med.forEach((d) => DH.pop(tl, d.n.inner, cue("s03", d.w, 1)));
    const tCalled = cue("s03", "@called");
    med.forEach((d, i) => DH.out(tl, d.n.inner, tCalled - 0.45 + i * 0.06));

    // "called an asset" — 0.5 s stillness, then the blue chip lands on the crate
    const tAsset = cue("s03", "@asset", 1);
    DH.pop(tl, assetChip.inner, tAsset, { from: 1.12 });
    DH.pulse(tl, assetChip.inner, cue("s03", "@asset", 2) - 0.1, 1.05);

    // "Soon the cart will be an asset too, and so will the tea leaves" — ghosts, not bought yet
    ghost.fill(tl, cue("s03", "@cart", 2), 0.4, 0.5);
    const tTea = cue("s03", "@tea");
    tl.fromTo(jar.body, { autoAlpha: 0, scale: 1.07, svgOrigin: O }, { autoAlpha: 0.5, scale: 1, svgOrigin: O, duration: 0.4, ease: "power2.out", immediateRender: false }, tTea);

    // "every asset gets its own jar" — the ghost jar slides next to the galla; a glass jar outline drops over the galla and dissolves
    const tEvery = cue("s03", "@every");
    tl.to(jar.g, { x: 1260, duration: 0.7, ease: "power2.inOut" }, tEvery);
    const tGets = cue("s03", "@gets");
    tl.fromTo(outline.inner, { autoAlpha: 0, y: -150, scale: 1.07, svgOrigin: O }, { autoAlpha: 1, y: 0, scale: 1, svgOrigin: O, duration: 0.4, ease: "power2.in", immediateRender: false }, tGets);
    tl.to(outline.inner, { autoAlpha: 0, duration: 0.5, ease: "power1.in" }, tGets + 0.7);

    // "what accountants call an account" — chip + the jar's label strip
    const tAcc = cue("s03", "@account");
    DH.pop(tl, accChip.inner, tAcc, { from: 1.12 });
    jar.tieLabel(tl, tAcc + 0.05);
    DH.out(tl, accChip.inner, cue("s03", "@and", 3) - 0.1);
    DH.pulse(tl, assetChip.inner, tAcc + 0.1, 1.04);

    // "the cash jar — the cash account? That's the galla." — the Cash label swings once and settles
    const tThat = cue("s03", "@that's", 2);
    tl.to(cashL.inner, { rotation: -6, svgOrigin: "0 -34", duration: 0.25, ease: "power2.out" }, tThat);
    tl.to(cashL.inner, { rotation: 4, svgOrigin: "0 -34", duration: 0.35, ease: "power2.inOut" }, tThat + 0.25);
    tl.to(cashL.inner, { rotation: 0, svgOrigin: "0 -34", duration: 0.4, ease: "power2.out" }, tThat + 0.6);
    tick.pulse(tl, tThat + 0.1, 1.06);

    // ---- seam: push into the galla; one note lifts, flips (blank tag on its back), grows to fill the frame
    const tSeam = tThat - 0.2, tEnd = sc.end;
    const NZ = NT.ZOOM;
    tl.to(cam, { scale: 1.12, svgOrigin: `${GX} 560`, duration: tEnd - tSeam - 0.3, ease: "power1.inOut" }, tSeam);
    const tN = tSeam + 0.1;
    tl.fromTo(note.inner, { autoAlpha: 0, scale: 1.0, svgOrigin: O }, { autoAlpha: 1, scale: 1.0, svgOrigin: O, duration: 0.05, immediateRender: false }, tN);
    tl.to(note.outer, { y: 470, duration: 0.45, ease: "power2.out" }, tN);
    tl.to(note.inner, { scale: 3, svgOrigin: O, duration: 0.45, ease: "power2.out" }, tN);
    const tF = tN + 0.5;
    tl.to(note.inner, { scaleX: 0.03, svgOrigin: O, duration: 0.16, ease: "power1.in" }, tF);
    tl.set(nFace, { opacity: 0 }, tF + 0.16);
    tl.set(nBack, { opacity: 1 }, tF + 0.16);
    tl.to(note.inner, { scaleX: 3, svgOrigin: O, duration: 0.18, ease: "power1.out" }, tF + 0.16);
    tl.set(cam, { autoAlpha: 0 }, tEnd);   // later track than s04 → hide at the cut so s04's plate shrink is seen
    const tG = tF + 0.38;
    tl.to(note.outer, { x: 960, y: 540, duration: tEnd - tG, ease: "power2.in" }, tG);
    tl.to(note.inner, { scaleX: NZ, scaleY: NZ, svgOrigin: O, duration: tEnd - tG, ease: "power2.in" }, tG);
  };
})();

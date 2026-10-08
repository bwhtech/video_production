// s01 — Cold open: "I'm rich!" Meera has counted the galla (₹50,700) and the bank (₹11,000) → ₹61,700. Khata holds up April's P&L: net profit ₹24,700.
// Two numbers hang side by side; a "?" pops between them.
// Out: Meera snaps the note fan shut into a bundle; the camera rushes into its red paper band → red fills the frame → s01t (title sting).
(function () {
  window.OWN_SEAM_IN.s01t = true;                       // this scene owns the rush into the title sting
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start;
    const cam = K.g(svg, { id: "s01-cam" });
    L.stage(cam, C.saffron, 860);

    // ---- the counter crate + galla (left of centre) and the bank passbook (right of it)
    const GX = 1060, GROUND = 1000;
    K.crate(cam, GX, GROUND, 360, 160);
    const galla = K.galla(cam, GX, GROUND - 150, 1.55, { open: true, overflow: true });
    const book = L.node(cam, 1440, 925, 1.2);
    K.card(book, 0, -120, 250, 300, { header: C.sky, title: "Bank", titleSize: 40, headerH: 66 });
    K.medallion(book, 0, -90, 62, "landmark");
    L.hide(book);

    // ---- people
    const m = K.meera(cam, 480, 1010, 0.98, { expr: "happy", aL: [12, 8], aR: [12, 8] });
    const k = K.khataRig(cam, 1770, 985, 0.74, { expr: "awake" });
    tl.set(k.g, { autoAlpha: 0 }, 0);

    // ---- tickers: galla ₹50,700, bank ₹11,000 → merged ₹61,700 over Meera's head
    const hG = L.node(cam, 1060, 540), hB = L.node(cam, 1440, 540);
    const tkG = L.tick(hG, 0, 0, { size: 58, w: 300, h: 90, edge: C.saffron, hidden: true });
    const tkB = L.tick(hB, 0, 0, { size: 58, w: 270, h: 90, edge: C.sky, hidden: true });
    const tkT = L.tick(cam, 450, 200, { size: 88, w: 500, h: 132, edge: C.saffron, hidden: true });
    // P&L frame (film piece) carried by Khata
    const frame = L.node(cam, 1330, 215);
    L.filmFrame(frame, 0, 0, 560, 190);
    const frameIcon = L.node(frame, 0, 0); K.medallion(frameIcon, 0, 0, 62, "trending-up"); L.hide(frameIcon);
    const frameNum = L.node(frame, 0, 0);
    K.text(frameNum, -170, -42, "Net profit", { size: 36, weight: 800 }).setAttribute("data-layout-allow-overlap", "true");
    const tkP = L.tick(frameNum, 0, 28, { size: 80, w: 470, h: 100, chip: false, hidden: true });
    L.hide(frameNum);
    L.hide(frame);

    // fan of notes above Meera's raised hand → closes into a bundle with a red paper band
    const FX = 668, FY = 472;
    const fan = L.node(cam, FX, FY, 0.85);
    const notes = [-48, -24, 0, 24, 48].map((a) => {
      const holder = K.g(fan, {});
      const inner = K.g(holder, {});
      K.note(inner, 0, -90, 190, 90, 0);
      return { holder, a };
    });
    const band = K.g(fan, {});
    K.paper(K.shadow(band, 1), K.cutRect(-26, -150, 52, 150, 1, 14), C.red);
    L.hide(fan);
    const rush = K.el("rect", { x: FX - 22, y: FY - 70 - 64, width: 44, height: 128, fill: C.red, opacity: 0 }, svg);

    // "?" between the numbers
    const q = L.node(cam, 960, 215); L.hide(q);
    K.qmark(q, 0, 0, 1.7, C.coral);

    // ============================================================ timeline
    m.blinks(tl, T0 + 0.8, sc.end - 1, 3.2);
    m.look(tl, T0 + 0.5, 4, 3);

    // s01a
    const tFifty = cue("s01a", "@fifty"), tGalla = cue("s01a", "@galla"), tEleven = cue("s01a", "@eleven"), tSixty = cue("s01a", "@sixty-one"), tRich = cue("s01a", "@rich");
    tkG.enter(tl, tFifty - 0.1); tkG.to(tl, tFifty, 50700, 1.0);
    tl.to(galla.notes, { scale: 1.1, svgOrigin: "0 -120", duration: 0.17, ease: K.stepEase(0.17, "power2.out", tGalla) }, tGalla);
    tl.to(galla.notes, { scale: 1, svgOrigin: "0 -120", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tGalla + 0.17) }, tGalla + 0.17);
    L.drop(tl, book, tEleven - 0.3);
    tkB.enter(tl, tEleven - 0.1); tkB.to(tl, tEleven, 11000, 0.8);
    m.look(tl, tEleven, 8, 2);
    // merge: both chips slide to the middle (above Meera) and swap for the big total
    tl.to(hG, { x: -610, y: -340, duration: 0.55, ease: "power2.inOut" }, tSixty - 0.05);
    tl.to(hB, { x: -990, y: -340, duration: 0.55, ease: "power2.inOut" }, tSixty - 0.05);
    tl.to([tkG.body, tkB.body], { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, tSixty + 0.38);
    tkT.enter(tl, tSixty + 0.4); tkT.to(tl, tSixty + 0.45, 61700, 1.0);
    m.expr(tl, tSixty - 0.1, "joy").look(tl, tSixty, 0, -6);
    // she fans the notes (one stepped flourish)
    m.pose(tl, tSixty + 0.2, { aR: [150, -20], dur: 0.33 });
    L.drop(tl, fan, tSixty + 0.3);
    notes.forEach((n, i) => tl.fromTo(n.holder, { rotation: 0, svgOrigin: O }, { rotation: n.a, svgOrigin: O, duration: 0.4, ease: K.stepEase(0.4, "power2.out", tSixty + 0.3 + i * 0.04), immediateRender: false }, tSixty + 0.3 + i * 0.04));
    tl.set(band, { opacity: 0 }, 0);
    L.spark(cam, tl, 830, 360, tSixty + 0.75, 34);
    tl.to(galla.body, { y: -14, duration: 0.2, ease: K.stepEase(0.2, "power2.out", tRich) }, tRich);
    tl.to(galla.body, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tRich + 0.2) }, tRich + 0.2);

    // s01b — Khata hops in with the P&L frame
    const tKhata = cue("s01b", "@khata"), tTw = cue("s01b", "@twenty-four"), tBoth = cue("s01b", "@both"), tCome = cue("s01b", "@come"), tGo = cue("s01b", "@go");
    tl.set(k.g, { autoAlpha: 1 }, tKhata - 0.35);
    k.hop(tl, tKhata - 0.3, { height: 90 });
    k.expr(tl, tKhata, "happy");
    k.arm(tl, tKhata, "R", 150);
    L.drop(tl, frame, tKhata + 0.2);
    L.drop(tl, frameIcon, tKhata + 0.25);
    tl.to(frameIcon, { autoAlpha: 0, duration: 0.15 }, tTw - 0.25);
    L.drop(tl, frameNum, tTw - 0.2); tkP.enter(tl, tTw - 0.15); tkP.to(tl, tTw, 24700, 1.0);
    m.expr(tl, tBoth - 0.1, "puzzled").look(tl, tBoth, 6, -3);
    tl.to(cam, { scale: 1.05, svgOrigin: "960 300", duration: sc.end - tKhata, ease: "none" }, tKhata);
    // between the numbers: the "?" (twice as the question is asked)
    L.drop(tl, q, tCome);
    K.pulseNode(tl, q, tGo, 1.14);
    // rush: fan snaps shut, red band grows to fill the frame
    const tEnd = sc.end;
    const tShut = cueEnd("s01b", "@go") - 0.7;
    notes.forEach((n, i) => tl.to(n.holder, { rotation: 0, svgOrigin: O, duration: 0.25, ease: K.stepEase(0.25, "power3.in", tShut + i * 0.02) }, tShut + i * 0.02));
    tl.set(band, { opacity: 1 }, tShut + 0.28);
    // the band becomes the full-frame red plate (world-space rect grows from the band's footprint)
    tl.set(rush, { opacity: 1 }, tShut + 0.55);
    tl.set(fan, { autoAlpha: 0 }, tShut + 0.56);
    tl.to(rush, { attr: { x: -20, y: -20, width: 1960, height: 1120 }, duration: tEnd - tShut - 0.62, ease: "power3.in" }, tShut + 0.55);
    L.allow(cam);
  };
})();

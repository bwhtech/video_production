// s04 — Three families. Three trays wearing only their medallions (user / box / receipt). Pictures drop in on the spoken names;
// each family's LABEL lands only after its tray is full (picture before term). Quick game: Ravi Mama's IOU hovers (completely still), then
// drops into Personal; the kettle hovers, then drops into Real. The Bank is deliberately NOT sorted here (s07's trap).
// Out: each tray's contents lift off and the tray turns into a gold-edged rule card (s05 builds on it).
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    L7.stage(svg, C.teal, 880);
    const cal = L7.cal(svg, 25);
    const XS = [345, 960, 1575], TY = 720, TS = 1.2;
    const fams = ["personal", "real", "nominal"];
    const trays = fams.map((f, i) => L7.tray(svg, XS[i], TY, f, { w: 480, h: 140, s: TS }));
    const labels = fams.map((f, i) => {
      const n = L7.node(svg, XS[i], 900); L7.hide(n);
      K.label(n, 0, 0, L7.FAM[f].name, { size: 76, bg: L7.FAM[f].col, rot: i % 2 ? 1.5 : -1.5 });
      return n;
    });
    // ---- items (each hidden until its word)
    const item = (tray, dx, art) => { const n = L7.node(tray.items, dx, -112); L7.hide(n); art(n); return n; };
    const disc = (n, r = 56) => K.tex(K.shadow(n, 1), K.cutEll(0, 0, r + 6, r + 6, 0.8), "pat-paper");
    const items = [
      [item(trays[0], -150, (n) => { disc(n); K.faceArt(n, "ravi", 52); }), item(trays[0], 0, (n) => { disc(n); K.faceArt(n, "gopal", 52); }), item(trays[0], 150, (n) => { disc(n); K.faceArt(n, "infotech", 52); })],
      [item(trays[1], -150, (n) => { disc(n); K.medallion(n, 0, 0, 52, "banknote"); }), item(trays[1], 0, (n) => { K.cartArt(L7.node(n, 0, 0, 1.15)); }), item(trays[1], 150, (n) => { disc(n); K.medallion(n, 0, 0, 52, "leaf"); })],
      [item(trays[2], -150, (n) => { disc(n); K.medallion(n, 0, 0, 52, "coins"); }), item(trays[2], 0, (n) => { disc(n); K.medallion(n, 0, 0, 52, "key"); }), item(trays[2], 150, (n) => { disc(n); K.medallion(n, 0, 0, 52, "mail"); })],
    ];
    // ---- the quick game: Ravi Mama's IOU card + the kettle, hovering centre-top
    const iou = L7.node(svg, 960, 360); L7.hide(iou);
    L7.card(iou, 520, 300);
    K.faceArt(iou, "ravi", 76); iou.lastChild.setAttribute("transform", "translate(-160 -30)");
    K.ticker(iou, 70, -30, 1, { value: 30000, size: 76, anchor: "middle" });
    K.qmark(iou, 0, 100, 1.0, C.coral);
    const kett = L7.node(svg, 960, 520); L7.hide(kett);
    K.kettle(kett, 0, 0, 1.7);
    L7.allow(svg);

    // ======================================================================================= timeline
    // the three trays land (like the loops dropping from s03), medallions already on
    trays.forEach((t, i) => { tl.set(t.n, { opacity: 0 }, 0); L7.drop(tl, t.n, T0 + 0.05 + i * 0.14, { dur: 0.4 }); });
    const lab = (i, t) => { L7.drop(tl, labels[i], t, { dur: 0.3 }); K.pulseNode(tl, trays[i].med, t + 0.1, 1.1); };
    const wordsOf = [
      [["s04a", "@ravi"], ["s04a", "@gopal"], ["s04a", "@infotech"]],
      [["s04a", "@cash"], ["s04a", "@cart"], ["s04a", "@stock"]],
      [["s04a", "@sales"], ["s04a", "@rent"], ["s04a", "@salary"]],
    ];
    wordsOf.forEach((ws, i) => {
      ws.forEach(([seg, w], k) => L7.drop(tl, items[i][k], cue(seg, w) - 0.05, { dur: 0.32 }));
      lab(i, cue(...wordsOf[i][2]) + 0.45);
    });
    // game 1 — "Quick. Ravi Mama's loan?" : IOU hovers, dead still through the 1.6 s gap; "Personal." → it drops into tray 1
    L7.drop(tl, iou, cue("s04b", "@quick") - 0.1);
    const tP = cue("s04c", "@personal");
    tl.to(iou, { x: XS[0] - 960, duration: 0.55, ease: "power2.inOut" }, tP - 0.1);
    tl.to(iou, { y: TY - 360 - 60, duration: 0.55, ease: "power2.in" }, tP - 0.1);
    tl.to(iou, { scale: 0.4, svgOrigin: O, duration: 0.55, ease: "power2.in" }, tP - 0.1);
    tl.to(iou, { autoAlpha: 0, duration: 0.15 }, tP + 0.5);
    K.pulseNode(tl, trays[0].med, tP + 0.55, 1.12);
    // game 2 — "The kettle?" hovers; "Real." → drops into tray 2
    L7.drop(tl, kett, cue("s04c", "@kettle") - 0.1);
    const tR = cue("s04d", "@real");
    tl.to(kett, { y: TY - 520 - 40, scale: 0.4, svgOrigin: O, duration: 0.5, ease: "power2.in" }, tR - 0.1);
    tl.to(kett, { autoAlpha: 0, duration: 0.15 }, tR + 0.4);
    K.pulseNode(tl, trays[1].med, tR + 0.45, 1.12);
    // exit: contents lift off, trays flatten into gold-edged rule cards
    const tEx = sc.end - 1.0;
    items.flat().forEach((n, i) => L7.lift(tl, n, tEx + (i % 3) * 0.04));
    labels.forEach((n) => L7.lift(tl, n, tEx));
    trays.forEach((t, i) => {
      tl.to(t.body, { scaleY: 0.1, svgOrigin: "0 0", duration: 0.4, ease: "power2.in" }, tEx + 0.15);
      tl.to(t.body, { autoAlpha: 0, duration: 0.1 }, tEx + 0.5);
    });
  };
})();

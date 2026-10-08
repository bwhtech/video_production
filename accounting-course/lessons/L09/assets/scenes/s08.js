// s08 — Recap. Three paper tiles on --scene-leaf, each lifts as the VO names it: 1 · a little khata book with a `1` badge (the ledger — icon only) ·
// 2 · `Posting` (a strip flies to the left page, then the right page) · 3 · `Balance` (a levelled page, one number). Khata thumbs-up (book flap) at the end.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    L9.stage(svg, C.leaf, 880);
    const CX = [370, 960, 1550], CY = 470, W = 500, H = 640;
    const tiles = CX.map((x) => { const n = L9.node(svg, x, CY); L9.hide(n); L9.card(n, W, H); return n; });
    // tile 1 — one small khata book, `1` badge
    const book = K.g(tiles[0], { transform: "translate(0 40)" });
    K.smallBook(book, 0, 130, 150, 260, "coins");
    const badge = K.g(tiles[0], { transform: "translate(110 -110)" });
    K.paper(K.shadow(badge, 1), K.cutEll(0, 0, 54, 54, 1), C.saffron); K.text(badge, 0, 3, "1", { size: 68, weight: 800 });
    // tile 2 — an open book + `Posting`, a strip flies left then right
    const open2 = K.g(tiles[1], { transform: "translate(0 20) scale(1.5)" }); L9.miniOpen(open2, "L");
    const lab2 = K.g(tiles[1], { transform: `translate(0 ${H / 2 - 66})` }); K.label(lab2, 0, 0, "Posting", { size: 56, bg: C.cream });
    const strip = L9.node(tiles[1], -150, -190); L9.hide(strip);
    K.tex(K.shadow(strip, 1), K.cutRect(-70, -22, 140, 44, 1, 12), "pat-paper"); K.paper(strip, K.cutRect(-66, -18, 10, 36, 0.4, 8), C.dr);
    const strip2 = L9.node(tiles[1], 150, -190); L9.hide(strip2);
    K.tex(K.shadow(strip2, 1), K.cutRect(-70, -22, 140, 44, 1, 12), "pat-paper"); K.paper(strip2, K.cutRect(-66, -18, 10, 36, 0.4, 8), C.cr);
    // tile 3 — a levelled page with its balance
    const pg3 = K.g(tiles[2], { transform: "translate(0 -40) scale(1.5)" });
    K.tex(K.shadow(pg3, 1), K.cutRect(-118, -134, 236, 134, 2, 22), "pat-cover");
    [-1, 1].forEach((sd) => { K.tex(pg3, K.cutRect(sd < 0 ? -108 : 6, -124, 102, 114, 1.2, 18), "pat-paper"); K.paper(pg3, K.cutRect(sd < 0 ? -108 : 6, -124, 102, 16, 0.6, 12), sd < 0 ? C.dr : C.cr);
      K.ink(pg3, [[sd < 0 ? -98 : 16, -30], [sd < 0 ? -16 : 98, -30]], 4, C.ink); K.ink(pg3, [[sd < 0 ? -98 : 16, -24], [sd < 0 ? -16 : 98, -24]], 4, C.ink); });
    const bal = K.ticker(tiles[2], 0, 105, 1, { value: 0, size: 70, chip: true, w: 340, h: 108, edge: C.dr, hidden: true });
    const lab3 = K.g(tiles[2], { transform: `translate(0 ${H / 2 - 66})` }); K.label(lab3, 0, 0, "Balance", { size: 56, bg: C.cream });
    const khata = K.khataRig(svg, 960, 1045, 0.5, { expr: "awake" });
    L9.allow(svg);

    const tLed = cue("s08", "@ledger"), tPos = cue("s08", "@posting"), tDeb = cue("s08", "@debits"), tCr = cue("s08", "@credits"), tBal = cue("s08", "@balancing"), tNum = cue("s08", "@number");
    khata.blink(tl, T0 + 2).blink(tl, T0 + 9);
    L9.drop(tl, tiles[0], tLed - 0.3, { dur: 0.4 }); K.pulseNode(tl, badge, tLed + 0.3, 1.1);
    L9.drop(tl, tiles[1], tPos - 0.3, { dur: 0.4 });
    L9.drop(tl, strip, tDeb - 0.5, { dur: 0.3 });
    tl.to(strip, { x: -60, y: 90, duration: 0.7, ease: "power2.in" }, tDeb - 0.1); tl.to(strip, { autoAlpha: 0, duration: 0.1 }, tDeb + 0.6);
    L9.drop(tl, strip2, tCr - 0.5, { dur: 0.3 });
    tl.to(strip2, { x: 60, y: 90, duration: 0.7, ease: "power2.in" }, tCr - 0.1); tl.to(strip2, { autoAlpha: 0, duration: 0.1 }, tCr + 0.6);
    L9.drop(tl, tiles[2], tBal - 0.3, { dur: 0.4 });
    bal.enter(tl, tNum - 0.5); bal.to(tl, tNum - 0.3, 50700, 0.8);
    khata.expr(tl, tNum + 0.9, "happy").hop(tl, tNum + 0.9, { height: 40 });
    khata.arm(tl, tNum + 1.4, "R", 150, 0.3);
    // tiles squeeze away (flip) toward the question cards
    tiles.forEach((t, i) => tl.to(t, { scaleX: 0.02, svgOrigin: O, duration: 0.3, ease: "power2.in" }, sc.end - 0.45 + i * 0.05));
  };
})();

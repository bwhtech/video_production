// s09 — Recap. Three icon-first tiles: Meera's Equity card (two pockets, no label text) · Revenue ↑ / Expenses ↓ · ₹18,000 − ₹5,000 = ₹13,000
// with the Profit chip on cream paper. Tiles light in sync with the VO; Khata gives a thumbs-up. Exit: the tiles turn edge-on and s10's
// question cards flip open in the same spots (s10 owns that seam).
(function () {
  window.OWN_SEAM_IN.s10 = true;
  window.S910 = { tileX: [360, 960, 1560], tileY: 500, tileW: 520, tileH: 640, wall: "teal" };

  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0", L = window.S910;
    K.wall(svg, C[L.wall], 880); K.table(svg, 880);
    [[40, 330, 160, 560], [1750, 380, 150, 500]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#2a9a8e" : "#34aa9e"));

    const tiles = L.tileX.map((x) => {
      const n = L4.node(svg, x, L.tileY);
      const flip = K.g(n.inner, {});
      K.card(flip, 0, 0, L.tileW, L.tileH, { shadow: 2 });
      const ring = K.el("path", { d: K.cutRect(-L.tileW / 2 - 10, -L.tileH / 2 - 10, L.tileW + 20, L.tileH + 20, 1.2, 28), fill: "none", stroke: C.gold, "stroke-width": 10, opacity: 0 }, n.inner);
      n.outer.setAttribute("opacity", "0");
      return { n, flip, ring };
    });
    // tile 1 — the Equity card: Meera's face, two pockets (icons only)
    {
      const g = K.g(tiles[0].flip, {});
      K.tex(K.shadow(g, 1), K.cutRect(-210, -270, 420, 520, 2, 24), "pat-paper");
      K.faceArt(g, "meera", 62).setAttribute("transform", "translate(0 -190)");
      [[-100, "#ecd19a", "coins", C.dr], [100, "#fbeed3", "trending-up", C.cr]].forEach(([px, tone, ic, col]) => {
        K.paper(K.shadow(g, 1), K.cutRect(px - 88, -90, 176, 290, 2, 20), "#cdb691");
        K.tex(K.shadow(g, 1), K.cutPoly([[px - 88, 0], [px, 12], [px + 88, 0], [px + 88, 200], [px - 88, 200]], 1.2, 18), "pat-paper");
        K.paper(g, K.cutPoly([[px - 88, 0], [px, 12], [px + 88, 0], [px + 88, 200], [px - 88, 200]], 1.2, 18), tone, { opacity: 0.55 });
        K.medallion(g, px, 100, 52, ic, col, C.white);
      });
    }
    // tile 2 — Revenue ↑ / Expenses ↓
    {
      const g = K.g(tiles[1].flip, {});
      const row = (y, col, word, rot, icon) => {
        K.medallion(g, -150, y, 54, icon);
        K.arrowShape(g, -20, y, 110, col, 1, rot, 30);
        L4.chip(g, 130, y, word, { size: 44, bg: col, rot: 0 });
      };
      row(-130, C.cr, "Revenue", 90, "coins");
      row(130, C.coral, "Expenses", -90, "coins");
      K.ink(g, [[-220, 0], [220, 0]], 4, C.ink, { opacity: 0.25 });
    }
    // tile 3 — ₹18,000 − ₹5,000 = ₹13,000 and the Profit chip on neutral cream paper
    const t3 = { a: K.ticker(tiles[2].flip, 0, -170, 1, { value: 0, size: 76, color: C.crText }), b: K.ticker(tiles[2].flip, 0, -70, 1, { value: 0, size: 76, color: C.coralText }),
      c: K.ticker(tiles[2].flip, 0, 60, 1, { value: 0, size: 100, color: C.ink }) };
    K.ink(tiles[2].flip, [[-200, -10], [200, -10]], 6, C.ink, { opacity: 0.7 });
    K.text(tiles[2].flip, -215, -70, "−", { size: 70, weight: 800 });
    const profChip = L4.chip(tiles[2].flip, 0, 190, "Profit", { size: 60 });
    [t3.a.body, t3.b.body, t3.c.body, profChip.outer].forEach((e) => e.setAttribute("opacity", "0"));
    // Khata thumbs-up
    const khata = K.khataRig(svg, 960, 1012, 0.5, { expr: "awake" });
    const thumb = L4.node(svg, 1090, 905); K.medallion(thumb.inner, 0, 0, 50, "thumbs-up", C.leaf, C.white); thumb.outer.setAttribute("opacity", "0");

    // ================================================================================ timeline
    const t0 = sc.start;
    const tPockets = cue("s09", "@pockets"), tRev = cue("s09", "@revenue"), tExp = cue("s09", "@expenses"), tProf = cue("s09", "@profit", 2), tDiff = cue("s09", "@difference");
    const pop = (i, t) => { L4.show(tl, tiles[i].n.outer, t); K.dropIn(tl, tiles[i].n.inner, t, { dur: 0.38 }); };
    const light = (i, t) => { tl.fromTo(tiles[i].ring, { opacity: 0 }, { opacity: 1, duration: 0.12, immediateRender: false }, t); tl.to(tiles[i].ring, { opacity: 0, duration: 0.35 }, t + 1.0); K.pulseNode(tl, tiles[i].n.inner, t, 1.03); };
    pop(0, cue("s09", "@meera's") - 0.1); light(0, tPockets);
    pop(1, tRev - 0.35); light(1, tRev + 0.1); light(1, tExp);
    pop(2, tProf - 0.35);
    L4.show(tl, profChip.outer, tProf + 0.2); tl.set([t3.a.body, t3.b.body, t3.c.body], { opacity: 1 }, tProf + 0.15);
    t3.a.to(tl, tProf + 0.15, 18000, 0.4); t3.b.to(tl, tProf + 0.3, 5000, 0.4); t3.c.to(tl, tDiff - 0.2, 13000, 0.8);
    K.dropIn(tl, profChip.inner, tProf + 0.2, { dur: 0.3 }); light(2, tDiff);
    // Khata's thumbs-up at the end
    L4.show(tl, thumb.outer, tDiff + 0.9); K.dropIn(tl, thumb.inner, tDiff + 0.9, { dur: 0.3 });
    khata.expr(tl, tDiff + 0.8, "happy").arm(tl, tDiff + 0.8, "R", 110, 0.25).hop(tl, tDiff + 0.9, { height: 40 });
    khata.blink(tl, t0 + 3);
    // exit: tiles turn edge-on (s10's cards open in the same spots)
    tiles.forEach((t, i) => tl.to(t.flip, { scaleX: 0.03, svgOrigin: O, duration: 0.3, ease: "power2.in" }, sc.end - 0.38 + i * 0.03));
  };
})();

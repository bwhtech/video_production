// s10 — Recap. Three tiles that light as they are named: the three families · a gold rule card "=" a scale · two books, one identical entry.
// Khata gives a thumbs-up at the end. (--scene-teal; violet is for stings / end cards only.)
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    L7.stage(svg, C.teal, 880);
    const cal = L7.cal(svg, 25);
    const TX = [345, 960, 1575], TY = 520, TW = 520, TH = 640;
    const tiles = [0, 1, 2].map((i) => { const n = L7.node(svg, TX[i], TY); L7.hide(n); L7.card(n, TW, TH); return n; });
    const lit = tiles.map((t) => { const r = K.el("path", { d: K.cutRect(-TW / 2 + 4, -TH / 2 + 4, TW - 8, TH - 8, 1.4, 24), fill: "none", stroke: C.gold, "stroke-width": 11, "stroke-linejoin": "round", opacity: 0 }, t); return r; });

    // ---- tile 1: the three families (medallion + name, each lights on its word)
    const fams = ["personal", "real", "nominal"];
    const famRows = fams.map((f, i) => {
      const r = L7.node(tiles[0], 0, -190 + i * 190); L7.famMedallion(r, f, -150, 0, 62); K.label(r, 60, 0, L7.FAM[f].name, { size: 62, bg: L7.FAM[f].col });
      r.setAttribute("opacity", "0.45"); return r;
    });
    // ---- tile 2: a gold rule card "=" a scale
    const rc = L7.ruleCard(tiles[1], -140, -40, "into", "L", { w: 190, h: 220 });
    K.paper(K.shadow(tiles[1], 1), K.cutRect(-24, -62, 48, 12, 0.5, 8), C.ink); K.paper(K.shadow(tiles[1], 1), K.cutRect(-24, -28, 48, 12, 0.5, 8), C.ink);
    const ms = K.scaleRig.mini(tiles[1], 105, 95, 0.24);
    // ---- tile 3: two books, one identical entry
    const mkBook = (x, gold) => {
      const b = L7.node(tiles[2], x, -20);
      K.tex(K.shadow(b, 2), K.cutRect(-100, -150, 200, 300, 2, 22), gold ? "pat-paper" : "pat-paper");
      K.el("path", { d: K.cutRect(-96, -146, 192, 292, 1.2, 22), fill: "none", stroke: gold ? C.gold : C.navy, "stroke-width": 9, "stroke-linejoin": "round" }, b);
      K.paper(b, K.cutRect(-76, -90, 152, 62, 1, 14), C.dr); K.paper(b, K.cutRect(-76, -10, 152, 62, 1, 14), C.cr);
      K.paper(b, K.cutRect(-76, -90, 22, 62, 1, 8), K.mixColor(C.dr, C.ink, 0.2)); K.paper(b, K.cutRect(-76, -10, 22, 62, 1, 8), K.mixColor(C.cr, C.ink, 0.2));
      return b;
    };
    mkBook(-120, true); mkBook(120, false);
    K.paper(K.shadow(tiles[2], 1), K.cutRect(-24, -62, 48, 12, 0.5, 8), C.ink); K.paper(K.shadow(tiles[2], 1), K.cutRect(-24, -28, 48, 12, 0.5, 8), C.ink);
    const khata = K.khataRig(svg, 1830, 1045, 0.5, { expr: "awake" });
    L7.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 3);
    const litTile = (i, t) => { tl.to(lit[i], { opacity: 1, duration: 0.15 }, t); K.pulseNode(tl, tiles[i], t, 1.04); };
    L7.drop(tl, tiles[0], cue("s10", "@families") - 0.3, { dur: 0.4 });
    fams.forEach((f, i) => { const t = cue("s10", "@" + f); tl.to(famRows[i], { opacity: 1, duration: 0.2 }, t); K.pulseNode(tl, famRows[i], t, 1.08); });
    litTile(0, cue("s10", "@nominal") + 0.3);
    L7.drop(tl, tiles[1], cue("s10", "@rules") - 0.3, { dur: 0.4 }); litTile(1, cue("s10", "@scale") + 0.2);
    ms.tilt(tl, cue("s10", "@scale") + 0.1, 3, { dur: 0.5 }); ms.settle(tl, cue("s10", "@words"), { dur: 0.5, hold: 0.1 });
    L7.drop(tl, tiles[2], cue("s10", "@dialects") - 0.3, { dur: 0.4 }); litTile(2, cue("s10", "@entries"));
    // thumbs-up
    const tEnd = cue("s10", "@entries");
    khata.arm(tl, tEnd, "R", 150, 0.3).expr(tl, tEnd, "happy"); khata.hop(tl, tEnd + 0.2, { height: 36 });
  };
})();

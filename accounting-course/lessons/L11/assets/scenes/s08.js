// s08 — Recap (--scene-leaf). Three picture tiles that light as they are named:
//   1 · the two-column sheet with equal totals ("=") and the term chip `Trial balance` · 2 · a tipped mini-scale + the search icon + ₹5,000 (the clue; no word) · 3 · a level mini-scale + a red x (balanced ≠ correct).
// Khata gives a thumbs-up at the end. Out: default torn-paper wipe into s09.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.leaf, 880);
    const cal = L.cal(svg, 30);
    const TX = [345, 960, 1575], TY = 540, TW = 520, TH = 660;
    const tiles = TX.map((x) => { const n = L.node(svg, x, TY); L.hide(n); L.card(n, TW, TH); return n; });
    const lit = tiles.map((t) => L.ring(t, TW, TH, { sw: 11 }));

    // ---- tile 1: a mini sheet (Debit | Credit columns) + equal totals + the term chip
    const t1 = tiles[0];
    const col = (x, c, word) => {
      const g = K.g(t1, {});
      K.paper(g, K.cutRect(x - 100, -250, 200, 56, 1, 14), c); K.text(g, x, -222, word, { size: 36, weight: 800, color: "#fff" });
      for (let i = 0; i < 4; i++) { K.ink(g, [[x - 88, -150 + i * 62], [x + 88, -150 + i * 62]], 3, "#a39684"); K.paper(g, K.cutRect(x + 20, -176 + i * 62, 68, 26, 0.5, 10), c, { opacity: 0.45 }); }
      return g;
    };
    const cDr = col(-118, C.dr, "Debit"), cCr = col(118, C.cr, "Credit");
    const totDr = L.node(t1, -118, 120), totCr = L.node(t1, 118, 120);
    K.paper(K.shadow(totDr, 1), K.cutRect(-100, -30, 200, 60, 1, 14), C.dr, { opacity: 0.25 }); K.paper(K.shadow(totCr, 1), K.cutRect(-100, -30, 200, 60, 1, 14), C.cr, { opacity: 0.25 });
    const tkDr = K.ticker(totDr, 0, 2, 1, { value: 0, size: 36, color: C.drText }), tkCr = K.ticker(totCr, 0, 2, 1, { value: 0, size: 36, color: C.crText });
    const eq = L.node(t1, 0, 120); L.hide(eq); K.paper(K.shadow(eq, 2), K.cutEll(0, 0, 26, 26, 1), C.cream);
    K.paper(eq, K.cutRect(-13, -10, 26, 6, 0.3, 10), C.ink); K.paper(eq, K.cutRect(-13, 3, 26, 6, 0.3, 10), C.ink);
    const term = L.node(t1, 0, 238); L.hide(term);
    K.paper(K.shadow(term, 2), K.cutRect(-200, -36, 400, 72, 1.6, 20), C.navy); K.text(term, 0, 3, "Trial balance", { size: 44, weight: 800, color: C.white });
    [cDr, cCr].forEach((c) => c.setAttribute("opacity", "0.35"));

    // ---- tile 2: a tipped mini-scale + the search icon + ₹5,000
    const t2 = tiles[1];
    const ms2 = K.scaleRig.mini(t2, 0, 250, 0.44);
    K.medallion(ms2.slot.g, 0, 0, 44, "search");
    const chip2 = L.node(t2, 0, -200); L.hide(chip2);
    K.paper(K.shadow(chip2, 2), K.cutRect(-170, -48, 340, 96, 1.6, 22), C.coral);
    K.text(chip2, 0, 4, "₹5,000", { size: 64, weight: 800, color: C.white });

    // ---- tile 3: a level mini-scale + a red x
    const t3 = tiles[2];
    const ms3 = K.scaleRig.mini(t3, 0, 250, 0.44);
    const bad = L.cross(ms3.slot.g, 0, 0, 54); L.hide(bad);
    const khata = K.khataRig(svg, 1810, 1062, 0.45, { expr: "awake" });
    L.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 3); khata.blink(tl, T0 + 14); khata.jitter(tl, T0, sc.end);
    const litTile = (i, t) => { tl.to(lit[i], { opacity: 1, duration: 0.15 }, t); tl.to(lit[i], { opacity: 0, duration: 0.3 }, t + 1.6); K.pulseNode(tl, tiles[i], t, 1.04); };
    // 1 — a trial balance lists every account's balance; debits left, credits right; matching totals = two equal halves
    L.drop(tl, tiles[0], cue("s08", "@trial") - 0.3, { dur: 0.4 });
    L.drop(tl, term, cue("s08", "@balance") + 0.1, { dur: 0.35 });
    const lightCol = (c, t) => tl.to(c, { opacity: 1, duration: 0.25 }, t);
    lightCol(cDr, cue("s08", "@debits")); lightCol(cCr, cue("s08", "@credits"));
    const tM = cue("s08", "@match");
    tkDr.to(tl, tM - 0.2, 136000, 0.8); tkCr.to(tl, tM - 0.2, 136000, 0.8);
    L.drop(tl, eq, tM + 0.5, { dur: 0.3 });
    litTile(0, cue("s08", "@halves"));
    // 2 — if they don't match, the difference is the clue
    L.drop(tl, tiles[1], cue("s08", "@difference") - 0.3, { dur: 0.4 });
    ms2.tilt(tl, cue("s08", "@difference") + 0.1, -5, { dur: 0.7 });
    L.drop(tl, chip2, cue("s08", "@clue") - 0.4, { dur: 0.35 });
    litTile(1, cue("s08", "@clue"));
    // 3 — balanced doesn't always mean correct
    L.drop(tl, tiles[2], cue("s08", "@balanced") - 0.3, { dur: 0.4 });
    L.drop(tl, bad, cue("s08", "@correct") - 0.1, { dur: 0.3, from: 1.4 });
    litTile(2, cue("s08", "@correct") + 0.2);
    const tE = sc.end - 1.5;
    khata.arm(tl, tE, "R", 150, 0.3).expr(tl, tE, "happy"); khata.hop(tl, tE + 0.2, { height: 36 });
  };
})();

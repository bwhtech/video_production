// s10 — Recap. Three tiles that light as they are named: (1) the film strip with an April chip = a period · (2) the two-cut column: Gross, then Net · (3) Khata the usher at the rope = only earned / used up gets in.
// Khata gives a thumbs-up at the end.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    L.stage(svg, C.teal, 930);
    const TX = [345, 960, 1575], TY = 500, TW = 520, TH = 700;
    const tiles = [0, 1, 2].map((i) => { const n = L.node(svg, TX[i], TY); L.hide(n); L.card(n, TW, TH); return n; });
    const lit = tiles.map((t) => K.el("path", { d: K.cutRect(-TW / 2 + 4, -TH / 2 + 4, TW - 8, TH - 8, 1.4, 24), fill: "none", stroke: C.gold, "stroke-width": 11, "stroke-linejoin": "round", opacity: 0 }, t));
    // ---- tile 1: the film strip + April
    K.filmStrip(tiles[0], 0, -70, 440, 150, ["coins", "milk", "key", "user", "zap"], 0, { resultFrames: 2 });
    const ap = L.node(tiles[0], 0, 130); K.label(ap, 0, 0, "April", { size: 58, bg: C.saffron, weight: 800 });
    // ---- tile 2: the column with two cuts (Gross, Net)
    const colN = K.g(tiles[1], { transform: "translate(-110 0)" });
    for (let k = 0; k < 10; k++) { const b = K.shadow(colN, 1); K.paper(b, K.cutRect(-70, 250 - k * 56 - 44, 140, 44, 0.8, 24), k >= 8 ? C.wood : k >= 5 ? "#e8b968" : "#f6e2b3"); K.el("path", { d: K.cutRect(-70, 250 - k * 56 - 44, 140, 44, 0.8, 24), fill: "none", stroke: "#a39684", "stroke-width": 2 }, b); }
    const cut = (yy, label) => {
      const n = L.node(tiles[1], 0, 0); L.hide(n);
      K.ink(n, [[-190, yy], [210, yy]], 7, C.ink); K.label(n, 120, yy - 36, label, { size: 50, bg: C.cream, weight: 800 });
      return n;
    };
    const cutG = cut(-198, "Gross"), cutN = cut(-30, "Net");
    // ---- tile 3: Khata the usher at a rope
    const khata = K.khataRig(tiles[2], 0, 200, 0.58, { expr: "awake" });
    { const hat = K.g(khata.body, {}); K.paper(K.shadow(hat, 1), K.cutRect(-76, -430, 152, 46, 2, 16), C.navy); K.paper(hat, K.cutRect(-76, -398, 152, 12, 1, 16), C.gold); K.paper(K.shadow(hat, 1), K.cutRect(-96, -392, 192, 14, 1.4, 20), "#1d2840"); }
    [-170, 170].forEach((x) => { const p = K.shadow(tiles[2], 1); K.paper(p, K.cutRect(x - 8, 20, 16, 190, 1, 20), C.brass); K.paper(p, K.cutEll(x, 14, 15, 15, 0.8), C.goldDark); });
    K.paper(K.shadow(tiles[2], 1), K.cutStroke([[-170, 28], [-90, 74], [90, 74], [170, 28]], 12, 1), C.red);
    L.allow(svg);

    // ======================================================================================= timeline
    const litTile = (i, t) => { tl.to(lit[i], { opacity: 1, duration: 0.15 }, t); K.pulseNode(tl, tiles[i], t, 1.04); };
    khata.blink(tl, T0 + 3).blink(tl, T0 + 12);
    L.drop(tl, tiles[0], T0 + 0.8, { dur: 0.4 }); litTile(0, cue("s10", "@movie") + 0.3);
    L.drop(tl, tiles[1], cue("s10", "@supplies") - 0.8, { dur: 0.4 });
    L.drop(tl, cutG, cue("s10", "@profit", 2) - 0.2, { dur: 0.3 }); litTile(1, cue("s10", "@profit", 2));
    L.drop(tl, cutN, cue("s10", "@profit", 3) - 0.1, { dur: 0.3 }); K.pulseNode(tl, tiles[1], cue("s10", "@profit", 3) + 0.1, 1.04);
    L.drop(tl, tiles[2], cue("s10", "@earned") - 0.6, { dur: 0.4 }); litTile(2, cue("s10", "@used") + 0.3);
    const tEnd = cue("s10", "@used") + 0.5;
    khata.arm(tl, tEnd, "R", 150, 0.3).expr(tl, tEnd, "happy"); khata.hop(tl, tEnd + 0.2, { height: 36 });
  };
})();

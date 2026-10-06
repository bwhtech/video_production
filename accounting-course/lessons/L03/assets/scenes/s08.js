// s08 — Recap: three tiles — the scale (Assets | Liabilities + Equity), the two filled device slots, the four mini scales.
// Each tile lifts 1.05× and goes full colour as the VO names it; the others rest at 70 %. HUD scale stays top-right.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L3.stage(K, svg, C.leaf, 880);
    L3.cal(K, svg, 3);
    const hud = L3.hudScale(K, svg, tl, T0);

    const TY = 650, TX = [400, 960, 1520];
    const tiles = TX.map((x) => { const n = L3.node(K, svg, x, TY); L3.card(K, n, 500, 500); L3.hide(n); return n; });
    // tile 1: the scale, with its two sides named
    const m1 = K.scaleRig.mini(tiles[0], 0, 70, 0.36, { tint: true });
    K.jarRig(m1.pans.L.g, 0, 0, 1.0, { contents: "coins", fill: 1 }); K.claimTag(m1.pans.R.g, 0, 0, 0.95, { face: "meera" });
    K.label(tiles[0], 0, 140, "Assets", { size: 46, bg: C.dr });
    K.label(tiles[0], 0, 204, "Liabilities + Equity", { size: 42, bg: C.cr });
    // tile 2: the two filled device slots
    const w2 = K.whichTwo(tiles[1], { veil: false, x: 0, y: 0, s: 0.62, W: 0, H: 0 }); w2.g.setAttribute("data-layout-allow-overlap", "true");
    w2.run(tl, T0 - 0.8, { slots: 2, gap: 0, veil: false, fill: [{ label: "Stock", delta: 8000, side: "L", at: T0 - 0.5 }, { label: "Gopal Dairy", delta: 8000, side: "R", at: T0 - 0.45 }] });
    // tile 3: the four patterns
    [["upup", -122, -28], ["downdown", 122, -28], ["swapL", -122, 178], ["swapR", 122, 178]].forEach(([k, x, y]) => {
      const m = K.scaleRig.mini(tiles[2], x, y, 0.22);
      K.jarRig(m.pans.L.g, 0, 0, 1.0, { contents: "coins", fill: 1 }); K.claimTag(m.pans.R.g, 0, 0, 0.95, { face: "ravi" });
      m.arrows(tl, T0 - 0.4, k);
    });
    const khata = K.khataRig(svg, 170, 1035, 0.55, { expr: "awake" });

    // ======================================================================================= timeline
    tiles.forEach((n, i) => { L3.drop(tl, K, n, T0 + 0.15 + i * 0.12); tl.to(n, { opacity: 0.7, duration: 0.3 }, T0 + 0.7 + i * 0.1); });
    const lit = (i, t) => {
      tl.to(tiles[i], { scale: 1.05, opacity: 1, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t);
      if (i > 0) tl.to(tiles[i - 1], { scale: 1, opacity: 0.7, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t);
    };
    lit(0, cue("s08", "@scale"));
    lit(1, cue("s08", "@every"));
    lit(2, cue("s08", "@four"));
    khata.blink(tl, T0 + 2);
    const tEnd = cue("s08", "@level");
    khata.expr(tl, tEnd, "happy"); khata.hop(tl, tEnd, { height: 40 }); khata.arm(tl, tEnd + 0.1, "R", 150, 0.3); khata.arm(tl, tEnd + 1.6, "R", 15, 0.4);
    hud.levelFlash(tl, tEnd);
    L3.allow(w2.g);
  };
})();

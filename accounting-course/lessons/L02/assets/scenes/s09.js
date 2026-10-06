// s09 — Recap: three tiles light as named — the Cash jar (Asset), Ravi holding his claim tag (Liability), Meera's tag (Equity).
// Out: the tiles flip edge-on; s10's question cards flip open in the same spots (hand-authored, as L1 s08→s09).
(function () {
  window.OWN_SEAM_IN.s10 = true;
  window.S910 = { X: [380, 960, 1540], Y: 560, W: 480, H: 600 };

  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", T0 = sc.start, L = window.S910;
    const cam = K.g(svg, { id: "s09-cam" });
    K.wall(cam, C.teal, 860);
    K.table(cam, 880);
    const cal = DH.calendar(cam, 1);
    const defs = [["Asset", C.dr], ["Liability", C.cr], ["Equity", C.cr]];
    const tiles = defs.map(([name, col], i) => {
      const n = DH.node(cam, L.X[i], L.Y);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-L.W / 2, -L.H / 2, L.W, L.H, 2.4, 26), "pat-paper");
      K.paper(n.inner, K.cutRect(-L.W / 2 + 10, -L.H / 2 + 10, L.W - 20, 96, 1.6, 22), col);
      K.text(n.inner, 0, -L.H / 2 + 60, name, { size: 60, weight: 800, color: K.onColor(col) });
      n.art = K.g(n.inner, { transform: "translate(0 40)" });
      return n;
    });
    K.jarRig(tiles[0].art, 0, 230, 1.5, { contents: "coins", label: "Cash", fill: 0.75 });
    const rv = K.raviMama(tiles[1].art, -40, 260, 0.5, { expr: "proud", aL: [12, 8], aR: [12, 8] });
    K.claimTag(tiles[1].art, 100, 260, 0.8, { face: "ravi", amount: 30000 });
    K.claimTag(tiles[2].art, 0, 200, 1.35, { face: "meera", amount: 50000 });
    const k = K.khataRig(cam, 120, 1050, 0.5, { expr: "awake" });
    const thumb = DH.node(cam, 260, 930); K.medallion(thumb.inner, 0, 0, 46, "thumbs-up", C.leaf); DH.hide(thumb.inner);

    // ======================================================================== timeline
    tiles.forEach((n, i) => { DH.pop(tl, n.inner, T0 + 0.15 + i * 0.15); tl.to(n.outer, { opacity: 0.7, duration: 0.01 }, T0 + 0.1); });
    const light = (i, t) => { DH.pulse(tl, tiles[i].inner, t, 1.05); tiles.forEach((n, j) => tl.to(n.outer, { opacity: j === i ? 1 : 0.7, duration: 0.25 }, t)); };
    light(0, cue("s09", "@assets"));
    light(1, cue("s09", "@liabilities"));
    light(2, cue("s09", "@equity"));
    // "every rupee … belongs to someone" — strings draw from the Cash tile to the other two; all tiles light
    const tEvery = cue("s09", "@every");
    tiles.forEach((n) => tl.to(n.outer, { opacity: 1, duration: 0.3 }, tEvery - 0.1));
    DH.string(tl, cam, tEvery, [L.X[0] + 60, 905], [L.X[1], 905], 0.7, 36);
    DH.string(tl, cam, tEvery + 0.35, [L.X[1] + 60, 915], [L.X[2], 915], 0.7, 36);
    const tSome = cue("s09", "@someone");
    k.arm(tl, tSome - 0.3, "R", 150, 0.3).expr(tl, tSome - 0.2, "happy");
    DH.pop(tl, thumb.inner, tSome);
    k.blink(tl, T0 + 4).blink(tl, T0 + 9);
    rv.blinks(tl, T0 + 1, sc.end, 3.5);
    // seam: tiles flip edge-on → s10's cards flip open in the same spots
    tiles.forEach((n) => tl.to(n.inner, { scaleX: 0.02, svgOrigin: O, duration: 0.3, ease: "power2.in" }, sc.end - 0.35));
    tl.set(cam, { autoAlpha: 0 }, sc.end);
  };
})();

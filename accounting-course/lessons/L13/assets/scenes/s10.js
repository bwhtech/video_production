// s10 — Recap: three tiles light on their beats — (1) the photo of one moment (30 Apr) · (2) the level scale A = L + E · (3) the film frame ₹24,700 slides into the Profit pocket. Khata thumbs-up at the end.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    L13.stage(svg, C.teal, 880);
    const CX = [330, 960, 1590], CY = 470, CW = 520, CH = 600;
    const tiles = CX.map((x) => { const n = L13.node(svg, x, CY); L13.card(n, CW, CH, { stripe: C.saffron }); L13.hide(n); return { n, art: K.g(n, {}) }; });
    // 1 — the photo: a white print with a blue (assets) and an orange (liabilities + equity) column
    const a1 = tiles[0].art;
    const pr = L13.node(a1, 0, -10, 1);
    K.tex(K.shadow(pr, 2), K.cutRect(-190, -230, 380, 440, 2, 22), "pat-paper");
    K.paper(pr, K.cutRect(-168, -208, 164, 330, 1, 12), C.dr, { opacity: 0.9 }); K.paper(pr, K.cutRect(4, -208, 164, 330, 1, 12), C.cr, { opacity: 0.9 });
    [0, 1, 2, 3].forEach((i) => { K.ink(pr, [[-150, -150 + i * 70], [-22, -150 + i * 70]], 6, C.cream, { opacity: 0.8 }); K.ink(pr, [[22, -150 + i * 70], [150, -150 + i * 70]], 6, C.cream, { opacity: 0.8 }); });
    K.text(pr, 0, 168, "30 Apr", { size: 52, font: "kalam", weight: 400 });
    // 2 — the level scale + A = L + E
    const a2 = tiles[1].art;
    const ms = K.miniScale(a2, 0, 200, 0.42, { hidden: true });
    const eq = L13.node(a2, 0, 250); L13.hide(eq);
    K.text(eq, -118, 0, "A", { size: 64, weight: 800, color: C.drText }); K.text(eq, -58, 0, "=", { size: 56, weight: 800 });
    K.text(eq, 0, 0, "L", { size: 64, weight: 800, color: C.crText }); K.text(eq, 56, 0, "+", { size: 56, weight: 800 }); K.text(eq, 114, 0, "E", { size: 64, weight: 800, color: C.crText });
    // 3 — the film frame (₹24,700) → the Profit pocket
    const a3 = tiles[2].art;
    const pocket = L13.node(a3, 0, 150);
    K.paper(K.shadow(pocket, 1), K.cutRect(-120, -20, 240, 150, 2, 18), "#cdb691");
    K.tex(K.shadow(pocket, 1), K.cutPoly([[-120, 30], [0, 40], [120, 30], [120, 130], [-120, 130]], 1.2, 16), "pat-paper");
    K.text(pocket, 0, 82, "Profit", { size: 44, weight: 800 });
    const fr = L13.node(a3, 0, -150); L13.hide(fr);
    K.tex(K.shadow(fr, 2), K.cutRect(-110, -80, 220, 160, 1.4, 16), "pat-paper");
    K.paper(fr, K.cutRect(-96, -66, 192, 20, 0.8, 10), C.navy, { opacity: 0.9 });
    K.ink(fr, [[-96, 36], [96, 36]], 5, C.ink);
    K.text(fr, 0, -6, "₹24,700", { size: 46, weight: 800 });
    const khata = K.khataRig(svg, 960, 1034, 0.62, { expr: "awake" });
    L13.allow(svg);

    // ======================================================================== timeline
    khata.blink(tl, T0 + 2).blink(tl, T0 + 9);
    const lightTile = (i, t) => { K.pulseNode(tl, tiles[i].n, t, 1.04); };
    // 1 — "the Balance Sheet is a photo of one moment"
    L13.drop(tl, tiles[0].n, cue("s10", "@balance") - 0.2);
    lightTile(0, cue("s10", "@photo")); lightTile(0, cue("s10", "@moment"));
    // 2 — "assets on one side, liabilities and equity on the other, always equal"
    const tA = cue("s10", "@assets");
    L13.drop(tl, tiles[1].n, tA - 0.3); ms.enter(tl, tA + 0.1); L13.drop(tl, eq, tA + 0.4);
    ms.levelFlash(tl, cue("s10", "@equal") - 0.3); lightTile(1, cue("s10", "@equal"));
    // 3 — "the movie's profit flows into the owner's equity"
    const tP = cue("s10", "@profit");
    L13.drop(tl, tiles[2].n, tP - 0.3); L13.drop(tl, fr, tP + 0.1);
    tl.to(fr, { y: 175, duration: 0.8, ease: "power2.inOut" }, cue("s10", "@flows") - 0.6);
    tl.to(fr, { autoAlpha: 0, scale: 0.9, svgOrigin: O, duration: 0.2 }, cue("s10", "@flows") + 0.25);
    lightTile(2, cue("s10", "@flows") + 0.2);
    // Khata thumbs-up at the end
    khata.arm(tl, sc.end - 1.9, "R", 150); khata.expr(tl, sc.end - 1.9, "happy"); khata.hop(tl, sc.end - 1.8, { height: 40 });
  };
})();

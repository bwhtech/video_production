// s02 — Last time: three answer cards (L13's Your Turn). Each card drops on its number and lights as its answer is spoken.
//   1  Equity ₹71,700 vs Cash + Bank ₹61,700 — "is equity sitting in cash?" → No (stamp)
//   2  current assets: cash (galla), bank, stock, Infotech's tab — each lights on its word
//   3  profit film frame ₹24,700 slides into Meera's Equity box
// In: s01t pushes into a page showing #s02-first at 1/3 scale (identity camera). Initial hidden states are DOM attributes.
// Out: default torn-paper wipe into s03.
(function () {
  window.OWN_SEAM_IN.s02 = true;                         // s01t owns the page push into this scene
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start;
    const world = K.g(svg, { id: "s02-first" });
    L.stage(world, C.teal, 880);
    const cal = L.cal(world, 30);
    const CX = [330, 960, 1590], CY = 468, CW = 540, CH = 600;

    const mkCard = (i) => {
      const n = L.node(world, CX[i], CY);
      L.card(n, CW, CH);
      L.badge(n, -CW / 2 + 40, -CH / 2 + 40, i + 1);
      return { n, art: K.g(n, {}) };
    };
    const cards = [0, 1, 2].map(mkCard);
    cards.forEach((c) => L.hide(c.n));

    // ---- card 1: two bars from a kraft baseline — Equity (orange, right-of-equation claim) vs Cash + Bank (blue)
    const a1 = cards[0].art, BASE = 140, K1 = 250 / 71700;
    K.ink(a1, [[-200, BASE], [200, BASE]], 6, C.woodDark);
    const barE = L.node(a1, -95, BASE), barC = L.node(a1, 95, BASE);
    const mkBar = (n, h, col) => { K.paper(K.shadow(n, 1), K.cutRect(-62, -h, 124, h, 1.4, 22), col); };
    const gE = K.g(barE, {}), gC = K.g(barC, {});
    mkBar(gE, 71700 * K1, C.cr); mkBar(gC, 61700 * K1, C.dr);
    K.claimTag(barE, 0, -71700 * K1 + 2, 0.7, { face: "meera", size: 54 });
    K.medallion(gC, 0, -61700 * K1 + 66, 34, "coins");
    K.medallion(gC, 0, -61700 * K1 + 150, 34, "landmark");
    L.hide(barE); L.hide(barC);
    const tkE = L.tick(a1, -95, BASE + 56, { size: 40, w: 218, h: 66, edge: C.cr, hidden: true });
    const tkC = L.tick(a1, 95, BASE + 56, { size: 40, w: 218, h: 66, edge: C.dr, hidden: true });
    const ringE = L.ringRect(a1, -95 - 70, BASE - 71700 * K1 - 56, 140, 71700 * K1 + 62);
    const ringC = L.ringRect(a1, 95 - 70, BASE - 61700 * K1 - 8, 140, 61700 * K1 + 14);

    // ---- card 2: four current assets (item + label travel together; each lights on its word)
    const a2 = cards[1].art;
    const mk2 = (x, y, build, label) => {
      const h = L.node(a2, x, y);
      build(h);
      L.chip(h, 0, 92, label, { size: 36, bg: C.cream, hidden: false, h: 54, w: 190 });
      const rg = L.ringRect(h, -105, -78, 210, 200);
      L.hide(h);
      return { h, rg };
    };
    const i1 = mk2(-125, -125, (h) => K.galla(h, 0, 38, 0.6, { open: false }), "Cash");
    const i2 = mk2(125, -125, (h) => K.medallion(h, 0, 0, 52, "landmark"), "Bank");
    const i3 = mk2(-125, 120, (h) => K.jarRig(h, 0, 62, 0.62, { label: "", contents: "leaves", fill: 0.7, labelHidden: true }), "Stock");
    const i4 = mk2(125, 120, (h) => K.claimTag(h, 0, 58, 0.8, { face: "infotech", size: 54 }), "Infotech");

    // ---- card 3: film frame ₹24,700 → Equity box
    const a3 = cards[2].art;
    const box = L.node(a3, 0, 100);
    K.paper(K.shadow(box, 1), K.cutRect(-200, -120, 400, 250, 2, 24), C.cream);
    K.paper(box, K.cutRect(-200, -120, 400, 66, 1.4, 22), C.cr);
    K.text(box, 0, -86, "Equity", { size: 44, weight: 800, color: K.onColor(C.cr) });
    K.el("path", { d: K.cutRect(-170, -36, 340, 150, 1, 22), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", opacity: 0.55 }, box);
    K.claimTag(box, -118, 118, 0.62, { face: "meera", size: 54, hidden: false });
    const fr = L.node(a3, 0, -150);
    L.filmFrame(fr, 0, 0, 380, 150);
    const tkF = L.tick(fr, 0, 6, { size: 56, w: 300, h: 80, chip: false, hidden: true });
    const tkBox = L.tick(box, 40, 44, { size: 56, w: 280, h: 80, chip: false, hidden: true });
    L.hide(fr); L.hide(box);
    L.allow(a1); L.allow(a2); L.allow(a3);

    // ---- characters: Khata (left, bottom) + Meera (right, bottom) react
    const khata = K.khataRig(world, 150, 1040, 0.62, { expr: "awake" });
    const m = K.meera(world, 1790, 1060, 0.46, { expr: "thinking" });

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); khata.blink(tl, T0 + 2.5); khata.blink(tl, T0 + 14);
    // 1 — "एक।" card 1 drops, the two bars rise; "नहीं।" stamp; "claim" ring; "इकसठ" the cash+bank total counts
    const tOne = cue("s02", "@one"), tEq = cue("s02", "@equity"), tCash = cue("s02", "@cash"), tNo = cue("s02", "@no"), tClaim = cue("s02", "@claim"), t61 = cue("s02", "@sixty-one");
    L.drop(tl, cards[0].n, tOne - 0.15);
    L.drop(tl, barE, tEq - 0.1); tkE.enter(tl, tEq); tkE.to(tl, tEq + 0.1, 71700, 0.9);
    L.drop(tl, barC, tCash - 0.1); tkC.enter(tl, tCash); tkC.to(tl, tCash + 0.1, 61700, 0.9);
    m.look(tl, tOne, -6, -3);
    K.stamp(tl, a1, 95, BASE - 61700 * K1 / 2, tNo + 0.05, 0.9);
    m.expr(tl, tNo, "worried");
    ringE.flash(tl, tClaim, 1.1);
    K.pulseNode(tl, barE, tClaim + 0.05, 1.04);
    ringC.flash(tl, t61, 1.0);
    // 2 — "दो।" card 1 dims, card 2 drops; each asset appears & lights on its word
    const tTwo = cue("s02", "@two");
    tl.to(cards[0].n, { opacity: 0.55, duration: 0.4, ease: "power2.inOut" }, tTwo - 0.1);
    L.drop(tl, cards[1].n, tTwo - 0.1);
    m.expr(tl, tTwo, "thinking");
    const wc = cue("s02", "@cash", 3), wb = cue("s02", "@bank", 2), ws = cue("s02", "@stock"), wi = cue("s02", "@infotech");
    [[i1, wc], [i2, wb], [i3, ws], [i4, wi]].forEach(([it, t]) => { L.drop(tl, it.h, t - 0.1); it.rg.flash(tl, t + 0.1, 0.8); });
    // 3 — "तीन।" card 2 dims, card 3 drops; the film frame counts, then slides into the Equity box on "जा मिला"
    const tThree = cue("s02", "@three"), tProf = cue("s02", "@profit"), tFlow = cue("s02", "@flowed");
    tl.to(cards[1].n, { opacity: 0.55, duration: 0.4, ease: "power2.inOut" }, tThree - 0.1);
    L.drop(tl, cards[2].n, tThree - 0.1);
    L.drop(tl, box, tThree + 0.05);
    L.drop(tl, fr, tProf - 0.1); tkF.enter(tl, tProf); tkF.to(tl, tProf + 0.05, 24700, 0.9);
    m.expr(tl, tThree, "happy");
    tl.to(fr, { y: 150, scale: 0.78, svgOrigin: O, duration: 0.55, ease: "power2.inOut" }, tFlow - 0.1);
    tl.to(fr, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, tFlow + 0.5);
    tkBox.enter(tl, tFlow + 0.45); tkBox.to(tl, tFlow + 0.5, 24700, 0.7);
    K.pulseNode(tl, box, tFlow + 0.55, 1.05);
    khata.expr(tl, tFlow, "happy"); khata.hop(tl, tFlow + 0.1);
    m.expr(tl, tFlow + 0.2, "happy");
  };
})();

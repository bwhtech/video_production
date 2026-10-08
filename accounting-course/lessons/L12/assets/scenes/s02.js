// s02 — Last time: L11's three Your-Turn questions answered on three cards (numbers only — the VO carries the words).
//   1 · the trial-balance totals tick to ₹1,36,000 = ₹1,36,000 · 2 · a forgotten (dashed) transaction fades out of BOTH columns, the totals still match · 3 · Drawings ₹3,000 drops in the blue (debit) column beside Rent and Salary, Khata "!" and a red pushpin.
// In: s01t pushes into a page showing #s02-first at 1/3 scale (identity camera). Initial hidden states are DOM attributes.
(function () {
  window.OWN_SEAM_IN.s02 = true;   // s01t owns the page push into s02

  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    const world = K.g(svg, { id: "s02-first" });
    L.stage(world, C.teal, 880);
    const CX = [330, 960, 1590], CY = 520, CW = 560, CH = 800;

    const mkCard = (i, head) => {
      const n = L.node(world, CX[i], CY); L.hide(n);
      const body = K.g(n, {});
      K.card(body, 0, 0, CW, CH, { header: head, title: String(i + 1), titleSize: 46, headerH: 80 });
      const art = K.g(body, { transform: "translate(0 46)" });
      const shade = K.el("path", { d: K.cutRect(-CW / 2, -CH / 2, CW, CH, 2, 24), fill: C.ink, opacity: 0, "pointer-events": "none" }, body);
      return { n, body, art, shade };
    };
    const cards = [mkCard(0, C.saffron), mkCard(1, C.coral), mkCard(2, C.sky)];

    // mini trial-balance sheet (blue debit column | orange credit column)
    const miniSheet = (parent, y0) => {
      const g = K.g(parent, { transform: `translate(0 ${y0})` });
      K.paper(K.shadow(g, 1), K.cutRect(-250, -250, 500, 380, 1.6, 22), "#fffaf0");
      K.paper(g, K.cutRect(-244, -244, 242, 360, 0.8, 22), C.dr, { opacity: 0.16 });
      K.paper(g, K.cutRect(2, -244, 242, 360, 0.8, 22), C.cr, { opacity: 0.16 });
      for (let r = 0; r < 5; r++) { K.ink(g, [[-232, -190 + r * 54], [-14, -190 + r * 54]], 2.5, "#a39684"); K.ink(g, [[14, -190 + r * 54], [232, -190 + r * 54]], 2.5, "#a39684"); }
      K.paper(g, K.cutRect(-244, -244, 242, 32, 0.6, 14), C.dr); K.paper(g, K.cutRect(2, -244, 242, 32, 0.6, 14), C.cr);
      K.ink(g, [[-250, 130], [250, 130]], 4, C.ink);
      return g;
    };

    // ---- card 1: totals
    const sh1 = miniSheet(cards[0].art, -30);
    const t1L = K.ticker(cards[0].art, -128, 245, 1, { value: 0, size: 40, chip: true, w: 250, h: 72, edge: C.dr, hidden: true });
    const t1R = K.ticker(cards[0].art, 128, 245, 1, { value: 0, size: 40, chip: true, w: 250, h: 72, edge: C.cr, hidden: true });
    const eq1 = L.node(cards[0].art, 0, 245); L.hide(eq1);
    K.paper(K.shadow(eq1, 1), K.cutRect(-14, -20, 28, 8, 0.4, 8), C.ink); K.paper(K.shadow(eq1, 1), K.cutRect(-14, 6, 28, 8, 0.4, 8), C.ink);
    L.hide(sh1);

    // ---- card 2: a forgotten transaction
    const sh2 = miniSheet(cards[1].art, -30); L.hide(sh2);
    const ghost = L.node(cards[1].art, 0, -250); L.hide(ghost);
    K.paper(ghost, K.cutRect(-120, -48, 240, 96, 1.4, 18), C.cream, { opacity: 0.6 });
    K.el("path", { d: K.cutRect(-116, -44, 232, 88, 1, 18), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", "stroke-linecap": "round" }, ghost);
    K.medallion(ghost, 0, 0, 34, "receipt");
    const ghostBars = L.node(cards[1].art, 0, -30); L.hide(ghostBars);
    [[-125, C.dr], [125, C.cr]].forEach(([x, col]) => {
      K.paper(ghostBars, K.cutRect(x - 100, -110, 200, 46, 1, 14), col, { opacity: 0.4 });
      K.el("path", { d: K.cutRect(x - 100, -110, 200, 46, 1, 14), fill: "none", stroke: col, "stroke-width": 4, "stroke-dasharray": "12 8" }, ghostBars);
    });
    const t2L = K.ticker(cards[1].art, -128, 245, 1, { value: 136000, size: 40, chip: true, w: 250, h: 72, edge: C.dr, hidden: true });
    const t2R = K.ticker(cards[1].art, 128, 245, 1, { value: 136000, size: 40, chip: true, w: 250, h: 72, edge: C.cr, hidden: true });
    const palm = L.node(cards[1].art, 0, -40); L.hide(palm);
    K.paper(K.shadow(palm, 2), K.cutEll(0, 0, 78, 78, 1), C.cream);
    K.ruleGlyph(palm, "palm", 0, 2, 3.0, C.ink);

    // ---- card 3: Drawings sits in the DEBIT column beside the expenses
    const colL = L.node(cards[2].art, -150, 10), colR = L.node(cards[2].art, 150, 10); L.hide(colL); L.hide(colR);
    K.paper(K.shadow(colL, 1), K.cutRect(-134, -290, 268, 560, 1.4, 24), C.dr, { opacity: 0.2 });
    K.paper(K.shadow(colR, 1), K.cutRect(-134, -290, 268, 560, 1.4, 24), C.cr, { opacity: 0.2 });
    K.paper(colL, K.cutRect(-134, -290, 268, 46, 0.8, 14), C.dr); K.paper(colR, K.cutRect(-134, -290, 268, 46, 0.8, 14), C.cr);
    K.text(colL, 0, -266, "Debit", { size: 34, weight: 800, color: "#fff" }); K.text(colR, 0, -266, "Credit", { size: 34, weight: 800, color: "#fff" });
    const sl = [["key", 5000, -150, -170], ["user", 8000, -150, -70], ["wallet", 3000, -150, 40]].map(([ic, amt, x, y], i) =>
      L.expSlip(cards[2].art, x, y, ic, amt, { w: 250, face: i === 2 ? "meera" : undefined }));
    sl.forEach((s) => L.hide(s.n));
    const pin = L.node(cards[2].art, -258, 4); L.hide(pin); L.pin(pin, 0, 0, 1.3);

    // Khata (small, card corner) for the "!"
    const khata = K.khataRig(world, CX[2] + 160, CY + CH / 2 - 14, 0.42, { expr: "awake" }); L.hide(khata.g);

    // ======================================================================== timeline
    const dropCard = (i, t) => L.drop(tl, cards[i].n, t, { dur: 0.4 });
    // card 1 — "One: the trial balance totals? One lakh thirty-six thousand rupees, on each side."
    dropCard(0, cue("s02", "@one") - 0.1);
    L.drop(tl, sh1, cue("s02", "@totals") - 0.2, { dur: 0.35 });
    t1L.enter(tl, cue("s02", "@lakh") - 0.1); t1R.enter(tl, cue("s02", "@lakh") - 0.1);
    t1L.to(tl, cue("s02", "@lakh"), 136000, 1.0); t1R.to(tl, cue("s02", "@lakh"), 136000, 1.0);
    L.drop(tl, eq1, cue("s02", "@each") - 0.1, { dur: 0.25 });
    t1L.pulse(tl, cue("s02", "@each"), 1.06); t1R.pulse(tl, cue("s02", "@each"), 1.06);
    K.pulseNode(tl, cards[0].body, cue("s02", "@each") + 0.05, 1.04);
    // card 2 — "Two: can a trial balance catch a transaction you forgot completely? No. Both sides are missing it, so both sides still match."
    tl.to(cards[0].shade, { opacity: 0.2, duration: 0.4 }, cue("s02", "@two") - 0.2);
    dropCard(1, cue("s02", "@two") - 0.1);
    L.drop(tl, sh2, cue("s02", "@two") + 0.3, { dur: 0.3 });
    t2L.enter(tl, cue("s02", "@two") + 0.5); t2R.enter(tl, cue("s02", "@two") + 0.5);
    L.drop(tl, ghost, cue("s02", "@transaction"), { dur: 0.35 });
    L.drop(tl, ghostBars, cue("s02", "@transaction") + 0.4, { dur: 0.3 });
    // the forgotten transaction fades out of BOTH columns at once
    L.lift(tl, ghost, cue("s02", "@forgot") + 0.5, { dur: 0.3 }); L.lift(tl, ghostBars, cue("s02", "@forgot") + 0.5, { dur: 0.3 });
    L.drop(tl, palm, cue("s02", "@no") - 0.05, { dur: 0.3 });
    t2L.pulse(tl, cue("s02", "@missing"), 1.06); t2R.pulse(tl, cue("s02", "@missing"), 1.06);
    K.pulseNode(tl, cards[1].body, cue("s02", "@match") + 0.05, 1.04);
    // card 3 — "Three: which column does Drawings go in? The debit column — on the same side as the expenses. But drawings are not an expense."
    tl.to(cards[1].shade, { opacity: 0.2, duration: 0.4 }, cue("s02", "@three") - 0.2);
    dropCard(2, cue("s02", "@three") - 0.1);
    L.drop(tl, colL, cue("s02", "@three") + 0.3, { dur: 0.3 }); L.drop(tl, colR, cue("s02", "@three") + 0.4, { dur: 0.3 });
    L.drop(tl, sl[0].n, cue("s02", "@three") + 0.7, { dur: 0.3 }); L.drop(tl, sl[1].n, cue("s02", "@three") + 0.9, { dur: 0.3 });
    L.drop(tl, sl[2].n, cue("s02", "@drawings") + 0.9, { dur: 0.35 });
    K.pulseNode(tl, colL, cue("s02", "@debit"), 1.04);
    K.pulseNode(tl, sl[0].n, cue("s02", "@expenses"), 1.07); K.pulseNode(tl, sl[1].n, cue("s02", "@expenses") + 0.2, 1.07);
    // "not an expense" — Khata pops "!" and the Drawings slip gets a red pushpin (it comes back in s08)
    const tNot = cue("s02", "@expense");
    tl.set(khata.g, { opacity: 1 }, tNot - 0.2);
    khata.emote(tl, tNot - 0.05, "!", 1.4);
    L.drop(tl, pin, tNot + 0.15, { dur: 0.25 });
    khata.blink(tl, T0 + 5);
    L.allow(svg);
  };
})();

// s09 — Recap. Three tiles lit as named: the journal page (dates in order, 1 → 30) · the two sides match (3,300 = 3,300) · ✗ over the Expense receipt, with the
// percent tag (interest only) and the dashed wallet pocket (drawings) beside it. Icons and numbers only — the VO carries the words. Khata gives a thumbs-up at the end.
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start;
    L8.stage(svg, C.leaf, 880);
    L8.cal(svg, 30);
    const TX = [360, 960, 1560], TY = 470, TW = 540, TH = 660;
    const tiles = TX.map((x) => { const n = L8.node(svg, x, TY); L8.hide(n); L8.card(n, TW, TH); return n; });
    // ---- tile 1: the journal page, dates in order
    const t1 = tiles[0];
    const page = L8.node(t1, 0, -40); 
    K.tex(K.shadow(page, 1), K.cutRect(-190, -210, 380, 420, 2, 22), "pat-paper");
    K.paper(page, K.cutRect(-182, -202, 364, 54, 1.4, 18), C.red);
    for (let i = 0; i < 5; i++) { const y = -110 + i * 76, col = i % 2 ? C.cr : C.dr; K.paper(page, K.cutRect(-170, y - 26, 10, 52, 0.5, 8), col); K.ink(page, [[-140, y], [20, y]], 6, "#7d7468", { opacity: 0.6 }); K.ink(page, [[60, y], [160, y]], 6, "#7d7468", { opacity: 0.45 }); }
    const cal1 = L8.node(t1, -120, 235); L8.hide(cal1); K.medallion(cal1, 0, 0, 52, "calendar");
    const tk1 = K.ticker(L8.node(t1, 70, 235), 0, 0, 1, { value: 1, size: 66, prefix: "", chip: true, w: 250, h: 90, edge: C.saffron }); L8.hide(tk1.g.parentNode);
    // ---- tile 2: 3,300 = 3,300
    const t2 = tiles[1];
    const a = K.ticker(L8.node(t2, -130, -40), 0, 0, 1, { value: 0, size: 70, chip: true, w: 220, h: 110, edge: C.dr, prefix: "" });
    const b = K.ticker(L8.node(t2, 130, -40), 0, 0, 1, { value: 0, size: 70, chip: true, w: 220, h: 110, edge: C.cr, prefix: "" });
    const eq = L8.node(t2, 0, -40); L8.hide(eq); K.text(eq, 0, 4, "=", { size: 90, weight: 800 });
    const sides = L8.node(t2, 0, 150); L8.hide(sides);
    K.paper(K.shadow(sides, 1), K.cutRect(-130, -30, 120, 60, 1, 18), C.dr); K.paper(K.shadow(sides, 1), K.cutRect(10, -30, 120, 60, 1, 18), C.cr);
    K.text(sides, -70, 3, "Dr", { size: 40, weight: 800, color: "#fff" }); K.text(sides, 70, 3, "Cr", { size: 40, weight: 800, color: "#fff" });
    [a, b].forEach((k) => L8.hide(k.g.parentNode));
    // ---- tile 3: ✗ over the Expense receipt, % tag + dashed wallet pocket beside it
    const t3 = tiles[2];
    const exp = L8.node(t3, 0, -70); L8.hide(exp); K.medallion(exp, 0, 0, 110, "receipt");
    const pct = L8.node(t3, -150, 150); L8.hide(pct); K.medallion(pct, 0, 0, 62, "percent");
    const pocket = L8.node(t3, 140, 150); L8.hide(pocket);
    K.paper(K.shadow(pocket, 1), K.cutRect(-85, -75, 170, 150, 1.6, 20), C.cream);
    K.el("path", { d: K.cutRect(-75, -65, 150, 130, 1.2, 22), fill: "none", stroke: C.coralText, "stroke-width": 5, "stroke-dasharray": "14 10", "stroke-linecap": "round" }, pocket);
    K.medallion(pocket, 0, 0, 46, "wallet");
    const khata = K.khataRig(svg, 960, 1055, 0.5, { expr: "awake" });
    L8.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2.6); khata.jitter(tl, T0, sc.end);
    // tile 1 — "the journal, the day-book: every transaction, in date order"
    L8.drop(tl, tiles[0], cue("s09", "@journal") - 0.1, { dur: 0.4 });
    L8.drop(tl, cal1, cue("s09", "@day-book"), { dur: 0.3 });
    L8.drop(tl, tk1.g.parentNode, cue("s09", "@transaction"), { dur: 0.3 });
    tk1.to(tl, cue("s09", "@order") - 0.2, 30, 1.4);
    // tile 2 — "one payment, many lines, both sides match"
    tl.to(tiles[0], { opacity: 0.7, duration: 0.4 }, cue("s09", "@payment") - 0.2);
    L8.drop(tl, tiles[1], cue("s09", "@payment") - 0.1, { dur: 0.4 });
    L8.drop(tl, sides, cue("s09", "@lines"), { dur: 0.3 });
    L8.drop(tl, a.g.parentNode, cue("s09", "@sides") - 0.2, { dur: 0.3 }); L8.drop(tl, b.g.parentNode, cue("s09", "@sides") - 0.2, { dur: 0.3 });
    a.to(tl, cue("s09", "@sides"), 3300, 0.9); b.to(tl, cue("s09", "@sides"), 3300, 0.9);
    L8.drop(tl, eq, cue("s09", "@match") + 0.1, { dur: 0.25 }); a.pulse(tl, cue("s09", "@match") + 0.9); b.pulse(tl, cue("s09", "@match") + 0.9);
    // tile 3 — "repaying a loan, or taking drawings, is not an expense"
    tl.to(tiles[1], { opacity: 0.7, duration: 0.4 }, cue("s09", "@repaying") - 0.2);
    L8.drop(tl, tiles[2], cue("s09", "@repaying") - 0.1, { dur: 0.4 });
    L8.drop(tl, exp, cue("s09", "@repaying"), { dur: 0.3 });
    L8.drop(tl, pct, cue("s09", "@repaying") + 0.4, { dur: 0.3 });
    L8.drop(tl, pocket, cue("s09", "@drawings") - 0.1, { dur: 0.3 });
    K.stamp(tl, t3, 0, -70, cue("s09", "@expense") - 0.1, 1.5);
    // thumbs-up
    const tEnd = cue("s09", "@expense") + 0.8;
    khata.expr(tl, tEnd, "happy").hop(tl, tEnd, { height: 40 }); khata.arm(tl, tEnd, "R", 150, 0.25); khata.arm(tl, tEnd + 1.2, "R", 20, 0.3);
  };
})();

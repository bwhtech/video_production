// s07 — Rent posted as salary? (solo). A game-show card: the Rent slip (₹5,000) lands on the Salary page (both Debit/blue) — "would the trial balance catch it?" (3.2 s countdown, viewer thinks).
// Reveal: No. Rent ₹0 · Salary ₹13,000 on their pages (>= 30 px), the totals chips stay ₹1,36,000 | ₹1,36,000, a level mini-scale and a red x ("not caught"). Out: default torn-paper wipe into s08.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);

    // ---- the two pages (both Debit accounts): Rent ₹5,000 and Salary ₹8,000
    const page = (x, name, icon, v0) => {
      const n = L.node(svg, x, 560); L.hide(n); const W = 440, H = 480;
      L.card(n, W, H);
      K.paper(n, K.cutRect(-W / 2 + 8, -H / 2 + 8, W - 16, 80, 1, 16), C.red);
      K.medallion(n, -W / 2 + 62, -H / 2 + 48, 28, icon);
      K.text(n, 36, -H / 2 + 50, name, { size: 46, weight: 800, color: C.cream });
      K.paper(n, K.cutRect(-W / 2 + 16, -H / 2 + 104, W - 32, 50, 0.8, 14), C.dr); K.text(n, 0, -H / 2 + 130, "Dr", { size: 38, weight: 800, color: "#fff" });
      const tk = K.ticker(n, 0, 70, 1, { value: v0, size: 74, weight: 800, color: C.drText, chip: true, w: 360, h: 120, edge: C.dr });
      const ring = L.ring(n, W, H);
      return { n, tk, ring, W, H };
    };
    const rent = page(380, "Rent", "key", 5000), sal = page(940, "Salary", "user", 8000);
    // the Rent slip (flies from the Rent page to the Salary page)
    const slip = L.node(svg, 380, 380); L.hide(slip);
    K.tex(K.shadow(slip, 2), K.cutRect(-96, -62, 192, 124, 1.6, 18), "pat-paper"); K.medallion(slip, -50, -10, 28, "key"); K.text(slip, 28, -8, "₹5,000", { size: 34, weight: 800 });
    K.paper(slip, K.cutRect(-70, 24, 140, 30, 0.6, 12), C.dr);
    // the reveal: totals chips, a level mini-scale and the red x
    const chips = [1330, 1730].map((x, i) => { const n = L.node(svg, x, 300); L.hide(n); const tk = K.ticker(n, 0, 0, 1, { value: 136000, size: 52, chip: true, w: 340, h: 92, edge: i ? C.cr : C.dr, color: i ? C.crText : C.drText }); return { n, tk }; });
    const msw = K.g(svg, { opacity: 0 }), ms = K.scaleRig.mini(msw, 1530, 1000, 0.66);
    const bad = L.cross(ms.slot.g, 0, 0, 66); L.hide(bad);
    const pm = K.pauseMedallion(svg, 660, 220, 0.5, { hidden: true });
    const kh = K.khataRig(svg, 700, 1062, 0.42, { expr: "awake" });
    L.allow(svg);

    // ======================================================================================= timeline
    kh.jitter(tl, T0, sc.end); kh.blink(tl, T0 + 2); kh.blink(tl, T0 + 12);
    // s07a — the game-show card: both pages, the slip lands on Salary
    L.drop(tl, rent.n, T0 + 0.4, { dur: 0.4 }); L.drop(tl, sal.n, T0 + 0.55, { dur: 0.4 });
    kh.expr(tl, cue("s07a", "@go"), "happy"); kh.hop(tl, cue("s07a", "@go"), { height: 40 });
    const tP = cue("s07a", "@posted");
    L.drop(tl, slip, tP - 0.3, { dur: 0.35 });
    tl.to(slip, { x: 940 - 380, y: 420 - 380, duration: 0.8, ease: "power2.inOut" }, tP + 0.2);
    tl.to(slip, { opacity: 0, duration: 0.25 }, tP + 1.15);
    const tS = cue("s07a", "@salary");
    K.pulseNode(tl, sal.n, tP + 1.0, 1.05);
    const tC = cue("s07a", "@catch");
    kh.expr(tl, tC, "wink");
    pm.enter(tl, segEnd("s07a") - 0.05); pm.countdown(tl, segEnd("s07a"), { dur: 3.1 });
    // s07b — "नहीं।": the pages update, the totals chips drop in and stay equal; level mini-scale + red x
    pm.exit(tl, segEnd("s07a") + 3.2);
    const tN = cue("s07b", "@no");
    L.drop(tl, msw, tN + 0.1, { dur: 0.4 });
    chips.forEach((c, i) => L.drop(tl, c.n, tN + 0.05 + i * 0.1, { dur: 0.4 }));
    L.drop(tl, bad, tN + 0.5, { dur: 0.3, from: 1.4 });
    rent.tk.to(tl, cue("s07b", "@rent"), 0, 0.7); tl.to(rent.ring, { opacity: 1, duration: 0.15 }, cue("s07b", "@rent")); tl.to(rent.ring, { opacity: 0, duration: 0.3 }, cue("s07b", "@rent") + 1.0);
    sal.tk.to(tl, cue("s07b", "@salary"), 13000, 0.7); tl.to(sal.ring, { opacity: 1, duration: 0.15 }, cue("s07b", "@salary")); tl.to(sal.ring, { opacity: 0, duration: 0.3 }, cue("s07b", "@salary") + 1.0);
    chips.forEach((c) => c.tk.pulse(tl, cue("s07b", "@totals") + 0.1));
    const tCa = cue("s07b", "@careful");
    kh.expr(tl, tCa, "wink"); kh.hop(tl, tCa, { height: 30 });
  };
})();

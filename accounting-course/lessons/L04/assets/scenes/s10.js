// s10 — Your Turn. s09's tiles turn edge-on and these three picture cards flip open in the same spots. Khata holds up a `?` sign;
// "answers next lesson" = a calendar-flip icon. Words on screen: `Expense?`, `Profit` (+ numbers).
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0", L = window.S910;
    K.wall(svg, C[L.wall], 880); K.table(svg, 880);
    [[40, 330, 160, 560], [1750, 380, 150, 500]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#2a9a8e" : "#34aa9e"));

    const cards = L.tileX.map((x, i) => {
      const n = L4.node(svg, x, L.tileY);
      const flip = K.g(n.inner, {});
      K.card(flip, 0, 0, L.tileW, L.tileH, { shadow: 2 });
      // number badge
      K.paper(K.shadow(flip, 1), K.cutEll(-L.tileW / 2 + 56, -L.tileH / 2 + 56, 38, 38, 1.4), C.coral);
      K.text(flip, -L.tileW / 2 + 56, -L.tileH / 2 + 59, String(i + 1), { size: 52, weight: 800, color: "#ffffff" });
      const ring = K.el("path", { d: K.cutRect(-L.tileW / 2 - 10, -L.tileH / 2 - 10, L.tileW + 20, L.tileH + 20, 1.2, 28), fill: "none", stroke: C.gold, "stroke-width": 10, opacity: 0 }, n.inner);
      return { n, flip, ring };
    });
    // card 1 — the cart + ₹36,000 + `Expense?`
    K.cartArt(K.g(cards[0].flip, { transform: "translate(0 -80) scale(2.1)" }));
    const tk1 = K.ticker(cards[0].flip, 0, 120, 1, { value: 0, size: 76 });
    const q1 = L4.chip(cards[0].flip, 0, 215, "Expense?", { size: 52, bg: "paper", rot: -2 });
    // card 2 — ₹18,000 and ₹5,000 slips, `= ?`
    {
      const g = cards[1].flip;
      [[-80, -150, "₹18,000", C.crText, -4], [80, -40, "₹5,000", C.coralText, 4]].forEach(([x, y, t, col, rot]) => {
        const n = L4.node(g, x, y);
        const r = K.g(n.inner, { transform: `rotate(${rot})` });
        K.tex(K.shadow(r, 1), K.cutRect(-150, -62, 300, 124, 1.6, 16), "pat-paper");
        K.text(r, 0, 4, t, { size: 66, weight: 800, color: col });
      });
      K.text(g, 0, 130, "= ?", { size: 120, weight: 800, color: C.ink });
    }
    // card 3 — mini scale, a `Profit` coin hovering over the beam, a `?` over each pan
    const mini = K.scaleRig.mini(cards[2].flip, 0, 230, 0.44);
    K.icon(mini.slot.g, "coins", 0, 0, 74, C.ink, 2.4);
    K.jarRig(mini.pans.L.g, 0, 0, 0.9, { contents: "coins", fill: 0.6 });
    K.claimTag(mini.pans.R.g, 0, 0, 0.7, { face: "meera" });
    const coinN = L4.node(cards[2].flip, 0, -150);
    K.paper(K.shadow(coinN.inner, 1), K.cutEll(0, 0, 70, 70, 1.4), C.gold);
    K.text(coinN.inner, 0, 3, "Profit", { size: 34, weight: 800, color: C.ink });
    const qs = [-150, 150].map((x) => { const n = L4.node(cards[2].flip, x, -10); K.qmark(n.inner, 0, 0, 1.3, C.cr); return n; });
    // Khata with the `?` sign, calendar-flip icon
    const khata = K.khataRig(svg, 960, 1012, 0.5, { expr: "awake" });
    const sign = L4.node(svg, 1060, 880); K.tex(K.shadow(sign.inner, 1), K.cutRect(-50, -62, 100, 124, 1.8, 18), "pat-paper"); K.qmark(sign.inner, 2, 20, 1.15, C.coral);
    sign.outer.setAttribute("opacity", "0");
    const cal = L4.node(svg, 660, 925); K.medallion(cal.inner, 0, 0, 52, "calendar", C.white); K.text(cal.inner, 0, 8, "5", { size: 36, weight: 800 });
    const calArrow = L4.node(svg, 745, 925); K.arrowShape(calArrow.inner, 0, 0, 90, C.ink, -1, 0, 20);
    cal.outer.setAttribute("opacity", "0"); calArrow.outer.setAttribute("opacity", "0");

    // ================================================================================ timeline
    const t0 = sc.start;
    cards.forEach((c, i) => tl.fromTo(c.flip, { scaleX: 0.03, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.3, ease: "power2.out", immediateRender: true }, t0 + i * 0.04));
    const light = (i, t) => { tl.fromTo(cards[i].ring, { opacity: 0 }, { opacity: 1, duration: 0.12, immediateRender: false }, t); tl.to(cards[i].ring, { opacity: 0, duration: 0.35 }, t + 1.3); K.pulseNode(tl, cards[i].n.inner, t, 1.03); };
    const tTurn = cue("s10", "@turn"), tOne = cue("s10", "@one"), tTwo = cue("s10", "@two"), tThree = cue("s10", "@three", 2), tAns = cue("s10", "@answers");
    L4.show(tl, sign.outer, tTurn); K.dropIn(tl, sign.inner, tTurn, { dur: 0.35 });
    khata.arm(tl, tTurn - 0.2, "R", 130, 0.3).expr(tl, tTurn, "happy");
    light(0, tOne); light(1, tTwo); light(2, tThree);
    K.dropIn(tl, q1.inner, cue("s10", "@expense") - 0.1, { dur: 0.3 });
    tl.set(q1.outer, { opacity: 0 }, 0); tl.set(q1.outer, { opacity: 1 }, cue("s10", "@expense") - 0.1);
    tk1.to(tl, cue("s10", "@thirty-six-thousand-rupee"), 36000, 0.5);
    K.pulseNode(tl, coinN.inner, cue("s10", "@profit", 2), 1.1);
    mini.levelFlash(tl, cue("s10", "@live"));
    khata.hop(tl, tThree + 0.2, { height: 36 });
    // "Answers at the start of the next lesson." — the calendar flips
    L4.show(tl, cal.outer, tAns); K.dropIn(tl, cal.inner, tAns, { dur: 0.34 });
    L4.show(tl, calArrow.outer, tAns + 0.4); K.dropIn(tl, calArrow.inner, tAns + 0.4, { dur: 0.3 });
    tl.to(cal.inner, { scaleX: 0.03, svgOrigin: O, duration: 0.15, ease: "power2.in" }, tAns + 1.0);
    tl.to(cal.inner, { scaleX: 1, svgOrigin: O, duration: 0.2, ease: "power2.out" }, tAns + 1.15);
    khata.blink(tl, t0 + 3).blink(tl, t0 + 11);
  };
})();

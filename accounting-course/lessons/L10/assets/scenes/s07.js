// s07 — The honest napkin. Meera's napkin: the ₹36,700 total is struck; three new lines (electricity · stock used · wear) each take their amount off;
// the running total steps 36,700 → 35,700 → 25,700 → 24,700 and is circled. The Scale HUD sits level (₹1,06,700), Cash never moved.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.leaf, 880);
    const cal = L.cal(svg, 30);
    const G = L.gauges(svg, { profit: 24700 });
    const H = L.hud(svg, tl, { elec: true, profit: 24700, totals: [106700, 106700], visible: true });
    H.jars.stock.fill(tl, 0, 0.2);

    // ---- the napkin (9 pencil lines): 5 from s01, 3 for the new icons, 1 for the honest total
    const NX = 960, NY = 575, NS = 1.25;
    const nap = K.napkin(svg, NX, NY, NS, { w: 380, h: 620, hidden: true, lines: [["Sales", "₹50,000"], ["− Rent", "₹5,000"], ["− Salary", "₹8,000"], ["− Interest", "₹300"], ["Profit", "₹36,700"], ["", ""], ["", ""], ["", ""], ["Profit", ""]] });
    const rowOf = (i) => nap.rows[i].y;
    // icon + amount rows (overlays on rows 5–7)
    const lines = [["zap", 1000, 5], ["leaf", 10000, 6], ["scuff", 1000, 7]].map(([ic, v, i]) => {
      const n = L.hide(L.node(nap.body, 0, rowOf(i)));
      if (ic === "scuff") L.scuff(n, -128, 0, 20); else K.medallion(n, -128, 0, 20, ic);
      K.text(n, -90, 2, "−", { size: 34, weight: 700, color: "#46424d" });
      const tk = K.ticker(n, 150, 2, 1, { value: 0, size: 34, anchor: "end", prefix: "₹", color: "#46424d" });
      return { n, tk, v };
    });
    const tot = L.hide(L.node(nap.body, 0, rowOf(8)));
    const totTk = K.ticker(tot, 150, 2, 1, { value: 36700, size: 40, anchor: "end", color: C.ink });
    const ring = K.el("path", { d: K.cutEll(0, 0, 175, 36, 1.4), fill: "none", stroke: C.coral, "stroke-width": 6, "stroke-linecap": "round", opacity: 0, transform: `translate(0 ${rowOf(8)})` }, nap.body);
    const delta = L.hide(L.node(svg, 1340, 560)); K.ticker(delta, 0, 0, 1, { value: 12000, size: 58, chip: true, w: 290, h: 92, edge: C.coral, prefix: "−₹" });
    K.medallion(delta, -120, -64, 28, "trending-down");
    const m = K.meera(svg, 1700, 1000, 0.92, { expr: "puzzled" });

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, sc.end - 1, 3.4);
    const tNap = cue("s07a", "@napkin");
    nap.slideIn(tl, tNap - 0.3, { dur: 0.5 });
    [0, 1, 2, 3, 4].forEach((i) => nap.write(tl, tNap + 0.3 + i * 0.28, i, { dur: 0.35 }));
    m.look(tl, tNap, -9, 4).expr(tl, tNap, "puzzled");
    // minus the electricity bill → 35,700
    const tEl = cue("s07a", "@electricity"), t35 = cue("s07a", "@thirty-five");
    nap.strike(tl, tEl - 0.4, 4);
    L.drop(tl, tot, tEl - 0.2, { dur: 0.3 }); nap.write(tl, tEl - 0.2, 8, { dur: 0.3 });
    L.drop(tl, lines[0].n, tEl, { dur: 0.3 }); lines[0].tk.to(tl, tEl + 0.15, 1000, 0.5);
    totTk.to(tl, t35 - 0.05, 35700, 0.8);
    m.expr(tl, tEl, "thinking");
    // minus the supplies she used → 25,700
    const tSu = cue("s07a", "@supplies"), t25 = cue("s07a", "@twenty-five");
    L.drop(tl, lines[1].n, tSu, { dur: 0.3 }); lines[1].tk.to(tl, tSu + 0.15, 10000, 0.8);
    totTk.to(tl, t25 - 0.05, 25700, 0.8);
    m.expr(tl, tSu, "worried");
    // minus depreciation → 24,700, circled
    const tDe = cue("s07a", "@depreciation"), t24 = cue("s07a", "@twenty-four");
    L.drop(tl, lines[2].n, tDe, { dur: 0.3 }); lines[2].tk.to(tl, tDe + 0.15, 1000, 0.5);
    totTk.to(tl, t24 - 0.05, 24700, 0.8);
    tl.to(ring, { opacity: 1, duration: 0.01 }, t24 + 1.0);
    { const L0 = ring.getTotalLength ? ring.getTotalLength() : 900; ring.setAttribute("stroke-dasharray", L0.toFixed(1)); ring.setAttribute("stroke-dashoffset", L0.toFixed(1)); tl.to(ring, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, t24 + 1.0); }
    m.expr(tl, t24 + 0.5, "happy");
    // s07b — twelve thousand less, still healthy; the honest napkin; the galla never moved
    const tTw = cue("s07b", "@twelve");
    L.drop(tl, delta, tTw, { dur: 0.34 });
    m.expr(tl, cue("s07b", "@healthy"), "proud");
    H.rig.levelFlash(tl, cue("s07b", "@healthy"));
    K.pulseNode(tl, tot, cue("s07b", "@honest"), 1.08);
    G.cash.flash(tl, cue("s07b", "@galla"), 1.2);
    m.expr(tl, cue("s07b", "@galla"), "proud");
    L.allow(svg);
  };
})();

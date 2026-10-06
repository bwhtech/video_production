// s10 — Recap. Three icon-only paper tiles, lit one at a time on the VO (the others rest at 70 %): (1) the two needles · (2) a tumbler ticked beside a coin
// with a clock (earned ≠ received) · (3) a coin leaving beside a still-full milk crate (paid ≠ used up). No text on tiles 2 and 3.
// On "Profit is not cash" the two needles swing apart; Khata flaps a thumbs-up. Out: default torn-paper wipe into s11.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start;
    L5.stage(K, svg, C.teal, 880);
    L5.cal(K, svg, 25);
    const XS = [330, 960, 1590], TY = 500;
    const mkTile = (x) => { const n = L5.hide(L5.node(K, svg, x, TY)); L5.card(K, n, 520, 540, { shadow: 2 }); return n; };
    const t1 = mkTile(XS[0]), t2 = mkTile(XS[1]), t3 = mkTile(XS[2]);

    // ---- tile 1: the two needles (no numbers — they start together, then swing apart)
    const g1 = L5.gauge(K, t1, -131, 80, 0.6, { label: "Profit", icon: "trending-up", band: C.saffron, max: 25000, value: 12500, tickerHidden: true });
    const g2 = L5.gauge(K, t1, 131, 80, 0.6, { label: "Cash", icon: "coins", band: C.sky, max: 60000, value: 30000, tickerHidden: true });
    // ---- tile 2: a tumbler ✓ beside a coin + clock
    const row = L5.tumblerRow(K, t2, -105, 170, 2.4, 3, 40);
    const chk = L5.hide(L5.node(K, t2, -105, -90)); K.medallion(chk, 0, 0, 52, "check");
    const coin2 = L5.hide(L5.node(K, t2, 140, 50)); K.coin(coin2, 0, 0, 74); K.medallion(coin2, 64, -60, 42, "clock");
    // ---- tile 3: a coin leaving (arrow out) beside a full milk crate
    const coin3 = L5.node(K, t3, -125, 60); K.coin(coin3, 0, 0, 70);
    const out = L5.hide(L5.node(K, t3, -150, -80)); K.arrowShape(out, 0, 0, 120, C.coral, 1, 0, 30);
    const mw = L5.node(K, t3, 105, 190, 1.05); K.milkCans(mw, 0, 0, 1, {});
    const full = L5.hide(L5.node(K, t3, 105, -90)); K.medallion(full, 0, 0, 40, "check", C.leaf);

    const khata = K.khataRig(svg, 1700, 1040, 0.55, { expr: "awake" });

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2.2).blink(tl, T0 + 7.0);
    const dim = (n, t) => tl.to(n, { opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, t);
    // "So — two needles." — tile 1
    const tNeedles = cue("s10", "@needles");
    L5.drop(tl, K, t1, tNeedles - 0.2, { dur: 0.4 });
    g1.flash(tl, tNeedles + 0.2, 0.5); g2.flash(tl, tNeedles + 0.2, 0.5);
    // "Earned isn't the same as received." — tile 2: the tumbler gets its tick, the coin arrives later (clock)
    const tEarned = cue("s10", "@earned"), tRec = cue("s10", "@received");
    L5.drop(tl, K, t2, tEarned - 0.2, { dur: 0.4 }); dim(t1, tEarned + 0.2);
    L5.drop(tl, K, chk, tEarned + 0.3, { dur: 0.3 });
    tl.fromTo(coin2, { x: 90 }, { x: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, tRec - 0.4);
    L5.drop(tl, K, coin2, tRec - 0.4, { dur: 0.3 });
    // "Paid isn't the same as used up." — tile 3: the coin leaves, the milk stays full
    const tPaid = cue("s10", "@paid"), tUsed = cue("s10", "@used");
    L5.drop(tl, K, t3, tPaid - 0.2, { dur: 0.4 }); dim(t2, tPaid + 0.2);
    L5.drop(tl, K, out, tPaid + 0.3, { dur: 0.3 });
    tl.to(coin3, { x: -260, duration: 0.8, ease: "power2.in" }, tPaid + 0.4);
    tl.to(coin3, { autoAlpha: 0, duration: 0.2 }, tPaid + 1.0);
    L5.drop(tl, K, full, tUsed, { dur: 0.3 }); K.pulseNode(tl, mw, tUsed + 0.2, 1.05);
    // "Profit is not cash." — tile 1 lights again; the two needles swing apart
    const tProfit = cue("s10", "@profit"), tIs = cue("s10", "@is"), tCash = cue("s10", "@cash");
    dim(t3, tProfit - 0.1);
    tl.to(t1, { opacity: 1, duration: 0.3, ease: "power2.out" }, tProfit - 0.1);
    g1.read(tl, tIs - 0.1, 20000, { dur: 0.9, ticker: false });
    g2.read(tl, tIs - 0.1, 12000, { dur: 0.9, ticker: false });
    khata.hop(tl, tCash - 0.1, { height: 40 }); khata.expr(tl, tCash, "happy");
    khata.arm(tl, tCash - 0.1, "R", 150, 0.25); khata.arm(tl, tCash + 1.2, "R", 20, 0.3);
    L5.allow(svg);
  };
})();

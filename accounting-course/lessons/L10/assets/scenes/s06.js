// s06 — Two traps (misconception moment, --scene-coral).
//   Trap 1: "book value ₹35,000 = what the cart would sell for?" — a dashed imagined price bubble → Khata stamps ✗; a buyer offers more or less; the 36 months ghost back in.
//   Trap 2: "Meera puts ₹1,000 aside?" — a dashed bubble with a Depreciation jar → ✗; the real galla: ₹50,700 on the 30th, the depreciation tile passes over, ₹50,700 still.
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.coral, 880);
    const cal = L.cal(svg, 30);
    const G = L.gauges(svg, { profit: 24700 });

    // ---------------------------------------------------------------- trap 1 world
    const w1 = K.g(svg, {});
    const strip = K.monthTiles(w1, 960, 925, 1, { months: 36, per: 12, width: 1700, hidden: true });
    strip.tiles.forEach((t) => t.inner.querySelectorAll("text").forEach((x) => x.remove()));
    const CX = 840, CY = 800, CS = 0.7;
    K.stall(w1, CX, CY, CS, { noProps: true });
    K.paper(w1, K.cutEll(CX, CY + 4, 230, 16, 1.5), "#3b2614", { opacity: 0.18 });
    const tag = K.hangTag(w1, CX - 270, CY - 470, 1, { amount: 36000, string: 40 });
    const contra = L.node(w1, CX - 250, CY - 318); { const cs = K.g(contra, {}); L.scuff(cs, -34, 0, 26); K.text(cs, 24, 2, "−1,000", { size: 36, weight: 800, color: C.coralText }); }
    const eq = L.node(w1, CX - 260, CY - 268); K.label(eq, 0, 0, "= 35,000", { size: 38, bg: "paper", weight: 800 });
    const bub1 = L.bubble(w1, CX, 235, 330, 150);
    K.text(bub1, 0, 6, "₹35,000", { size: 60, weight: 800 }); K.qmark(bub1, 120, -6, 0.7, C.dr);
    const buyer = K.merchant(w1, 2100, 1000, 0.9, { expr: "neutral" });
    const cUp = L.hide(L.node(w1, 1340, 720)), cDn = L.hide(L.node(w1, 1780, 720));
    [[cUp, "trending-up", C.leaf], [cDn, "trending-down", C.coral]].forEach(([n, ic, col]) => { L.card(n, 220, 250, { stripe: col }); K.medallion(n, 0, 24, 66, ic); });
    // ---------------------------------------------------------------- trap 2 world
    const w2 = K.g(svg, {}); L.hide(w2);
    const bub2 = L.bubble(w2, 960, 480, 460, 360);
    const jar2 = K.jarRig(bub2, 0, 140, 1.0, { label: "Depreciation", contents: "notes", fill: 0 });
    const note = L.hide(L.node(w2, 600, 520)); K.note(note, 0, 0, 120, 60, -8);
    const galla = K.galla(w2, 960, 840, 1.5, { open: false });
    const chipA = L.hide(L.node(w2, 600, 650)), chipB = L.hide(L.node(w2, 1320, 650));
    [chipA, chipB].forEach((n) => { K.dateTile(n, 0, 0, 1, { month: "Apr", day: 30, w: 160, h: 160 }); });
    const tkA = K.ticker(chipA, 0, 130, 1, { value: 50700, size: 52, chip: true, w: 250, h: 84, edge: C.sky });
    const tkB = K.ticker(chipB, 0, 130, 1, { value: 50700, size: 52, chip: true, w: 250, h: 84, edge: C.sky });
    const arrA = L.hide(L.node(w2, 780, 650)), arrB = L.hide(L.node(w2, 1140, 650));
    K.arrowShape(arrA, 0, 0, 110, C.cream, -1, 0, 26); K.arrowShape(arrB, 0, 0, 110, C.cream, -1, 0, 26);
    const tile = L.hide(L.node(w2, 740, 650)); K.paper(K.shadow(tile, 1), K.cutRect(-26, -38, 52, 76, 1.2, 12), C.gold);

    // ---------------------------------------------------------------- cast (shared)
    const khata = K.khataRig(svg, 1240, 1005, 0.6, { expr: "awake" });
    const meera = K.meera(svg, 2100, 1000, 0.95, { expr: "puzzled" });
    const stamps = [];

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 20);
    // s06a — the trap: book value 35,000 → "that's what the cart sells for?"
    const tSell = cue("s06a", "@sell");
    L.drop(tl, bub1, tSell - 0.2, { dur: 0.35 });
    khata.expr(tl, cue("s06a", "@traps"), "wow");
    // s06b — Khata stamps ✗; a buyer might pay more or less; the cost is spread across the months
    const tNope = cue("s06b", "@nope");
    khata.arm(tl, tNope - 0.5, "R", 150, 0.25); khata.arm(tl, tNope - 0.05, "R", 60, 0.12).expr(tl, tNope, "happy");
    const st1 = K.stamp(tl, svg, CX + 20, 240, tNope + 0.05, 1.1, { rot: -8 });
    khata.arm(tl, tNope + 0.5, "R", 12, 0.3);
    L.lift(tl, bub1, tNope + 1.2, { dur: 0.25 }); st1.lift && st1.lift(tl, tNope + 1.2);
    const tB = cue("s06b", "@buyer");
    buyer.walkTo(tl, tB - 0.3, 1560, 1.6);
    L.drop(tl, cUp, cue("s06b", "@more"), { dur: 0.3 });
    buyer.arm(tl, cue("s06b", "@more") - 0.2, "R", 80, 30, 0.25);
    L.drop(tl, cDn, cue("s06b", "@less"), { dur: 0.3 });
    buyer.arm(tl, cue("s06b", "@less") - 0.2, "L", 80, 30, 0.25);
    strip.reveal(tl, cue("s06b", "@spreads"), { per: 0.025 }); [0, 1, 2].forEach((y) => strip.year(tl, cue("s06b", "@spreads") + 0.2 + y * 0.2, y));
    tl.to(strip.g, { opacity: 0.6, duration: 0.3 }, cue("s06b", "@spreads") + 1.2);
    // s06c — trap two: Meera sets ₹1,000 aside?
    const tTwo = cue("s06c", "@two");
    [w1].forEach((n) => tl.to(n, { opacity: 0, duration: 0.35, ease: "power1.in" }, tTwo - 0.5));
    tl.to([cUp, cDn], { opacity: 0, duration: 0.2 }, tTwo - 0.5);
    tl.to(w2, { opacity: 1, duration: 0.01 }, tTwo - 0.1);
    tl.to(khata.mover, { x: 1780 - 1240, duration: 0.8, ease: "power2.inOut" }, tTwo - 0.5);
    tl.to(meera.mover, { x: 240 - 2100, duration: 1.0, ease: "power2.out" }, tTwo - 0.6);
    meera.expr(tl, tTwo, "thinking");
    L.drop(tl, bub2, tTwo + 0.2, { dur: 0.35 });
    jar2.enter(tl, tTwo + 0.4);
    const tAside = cue("s06c", "@aside");
    L.drop(tl, note, tAside - 0.5, { dur: 0.25 });
    meera.arm(tl, tAside - 0.5, "R", 100, 20, 0.25);
    tl.to(note, { x: 360, y: 180, duration: 0.6, ease: "power2.inOut" }, tAside - 0.2);
    tl.set(note, { opacity: 0 }, tAside + 0.45);
    jar2.fill(tl, tAside + 0.4, 0.4);
    // s06d — nope again: ✗; then the real galla: before / after
    const tNo2 = cue("s06d", "@nope");
    khata.arm(tl, tNo2 - 0.5, "R", 150, 0.25); khata.arm(tl, tNo2 - 0.05, "R", 60, 0.12);
    const st2 = K.stamp(tl, svg, 960, 480, tNo2 + 0.05, 1.3, { rot: 7 });
    khata.arm(tl, tNo2 + 0.5, "R", 12, 0.3);
    const tGal = cue("s06d", "@galla");
    tl.to(bub2, { opacity: 0, duration: 0.3 }, tGal - 0.2); st2.lift && st2.lift(tl, tGal - 0.2);
    tl.set(galla.g, { autoAlpha: 0 }, 0); tl.to(galla.g, { autoAlpha: 1, duration: 0.3 }, tGal - 0.3);
    galla.open(tl, tGal);
    meera.expr(tl, tGal, "neutral"); meera.look(tl, tGal, 8, 6);
    G.cash.flash(tl, tGal + 0.3, 1.2);
    const tBef = cue("s06d", "@before"), tAft = cue("s06d", "@after");
    L.drop(tl, chipA, tBef - 0.1, { dur: 0.35 }); L.drop(tl, arrA, tBef + 0.4, { dur: 0.3 });
    // the depreciation tile passes over the galla from the first 30 to the second
    L.drop(tl, tile, tAft - 0.9, { dur: 0.25 });
    L.fly(tl, tile, tAft - 0.6, [0, 0], [440, 0], 1.3, { lift: 0 });
    tl.set(tile, { opacity: 0 }, tAft + 0.75);
    L.drop(tl, chipB, tAft - 0.1, { dur: 0.35 }); L.drop(tl, arrB, tAft + 0.4, { dur: 0.3 });
    tl.to(galla.g, { opacity: 1, duration: 0.01 }, tAft);
    L.allow(svg);
  };
})();

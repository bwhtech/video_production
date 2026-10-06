// s03 — Two needles. Khata pins two gauges on the stall's back wall: Profit and Money (galla + bank). Readings ₹13,000 and ₹51,000.
// Meera's savings + Ravi Mama's loan flow into the Money gauge for a beat (why it's bigger). A dashed "they move together" link
// forms, then snaps on "Let's watch." Out: the calendar highlight steps BACK 16 → 15 (the one scripted rewind), default wipe into s04.
(function () {
  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start;
    L5.stage(K, svg, C.teal, 880);
    // wall dressing: two pale shelf lines (tone-on-tone)
    [[60, 190, 760], [1100, 190, 190]].forEach(([x, y, w], i) => K.paper(svg, K.cutRect(x, y, w, 10, 1, 24), "#2a9a8e", { opacity: 0.7 }));
    const cal = L5.cal(K, svg, 16);

    // ---- the two gauges (hero size)
    const PX = 430, CX = 1050, GYY = 530, GS = 1.15;
    const profit = L5.gauge(K, svg, PX, GYY, GS, { label: "Profit", icon: "trending-up", band: C.saffron, max: 25000, hidden: true, labelHidden: true, tickerHidden: true });
    const cash = L5.gauge(K, svg, CX, GYY, GS, {
      label: "Money", icon: "coins", band: C.sky, max: 60000, hidden: true, labelHidden: true, tickerHidden: true,
      sub: [{ icon: "galla", label: "Cash", value: 0, hidden: true }, { icon: "landmark", label: "Bank", value: 0, hidden: true }],
    });
    // the dashed "move together" link (two halves meeting at the middle) + the snap puff
    const LY = GYY - 110, mx = (PX + CX) / 2;
    const mkHalf = (x0, x1) => K.el("path", { d: `M${x0},${LY} L${x1},${LY}`, fill: "none", stroke: C.ink, "stroke-width": 9, "stroke-linecap": "round", "stroke-dasharray": "18 14", opacity: 0 }, svg);
    const linkA = mkHalf(PX + 250, mx), linkB = mkHalf(CX - 250, mx);
    const snap = L5.hide(L5.node(K, svg, mx, LY)); K.sparkle(snap, 0, 0, 32, C.gold);

    // ---- coin streams: Meera's savings + Ravi Mama's loan flow into the Money gauge
    const faceDisc = (who, x, y) => {
      const n = L5.hide(L5.node(K, svg, x, y));
      K.tex(K.shadow(n, 1), K.cutEll(0, 0, 54, 54, 1), "pat-paper"); K.faceArt(n, who, 42);
      return n;
    };
    const meeraF = faceDisc("meera", 790, 975), raviF = faceDisc("ravi", 1250, 975);

    // ---- Khata (pins the gauges)
    const khata = K.khataRig(svg, 1590, 925, 1.1, { expr: "awake" });
    // HUD last (z-order): Meera's scale after T7, level, ₹1,01,000 — top-right
    L5.hud(K, svg, tl, { stage: 0 });

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 1.4).blink(tl, T0 + 9);
    // s03a "Today, Khata pins two needles on the stall's wall."
    const tKhata = cue("s03a", "@khata"), tPins = cue("s03a", "@pins"), tNeedles = cue("s03a", "@needles");
    khata.hop(tl, tKhata - 0.1, { height: 60 }); khata.expr(tl, tKhata, "happy");
    khata.arm(tl, tPins - 0.3, "L", 125, 0.25);
    profit.enter(tl, tPins + 0.05); khata.arm(tl, tPins + 0.45, "L", 20, 0.2);
    khata.arm(tl, tNeedles - 0.2, "R", 125, 0.25);
    cash.enter(tl, tNeedles + 0.1); khata.arm(tl, tNeedles + 0.5, "R", 20, 0.2);
    // "The first is Profit." — the name chip ties on; "It moves when Meera earns money, or uses it up."
    const tProfit = cue("s03a", "@profit");
    profit.tieLabel(tl, tProfit); profit.flash(tl, tProfit + 0.1, 0.6);
    profit.showTicker(tl, tProfit + 0.4);
    // "The second is Money — everything in the galla, plus everything in the bank."
    const tCash = cue("s03a", "@money", 2), tGalla = cue("s03a", "@galla"), tBank = cue("s03a", "@bank");
    cash.tieLabel(tl, tCash); cash.flash(tl, tCash + 0.1, 0.6);
    cash.showTicker(tl, tCash + 0.4);
    cash.subEnter(tl, tGalla, 0); cash.subEnter(tl, tBank, 1);
    khata.expr(tl, tBank, "wow");

    // s03b "Right now, profit reads thirteen thousand. Money reads fifty-one thousand."
    const tT = cue("s03b", "@thirteen"), tF = cue("s03b", "@fiftyone");
    khata.expr(tl, segStart("s03b"), "happy");
    profit.read(tl, tT - 0.15, 13000, { dur: 1.1 });
    cash.read(tl, tF - 0.15, 51000, { dur: 1.2 });
    cash.sub(tl, tF, 0, 51000, 0.9);           // the galla
    // "It's bigger, because it also holds Meera's savings and Ravi Mama's loan."
    const tMs = cue("s03b", "@savings"), tLoan = cue("s03b", "@loan");
    L5.drop(tl, K, meeraF, tMs - 0.5); L5.drop(tl, K, raviF, tLoan - 0.5);
    L5.coinHop(tl, K, svg, [790, 960], [CX - 40, 700], tMs - 0.3, { n: 4, dur: 0.9, step: 0.2, r: 15, lift: 90 });
    L5.coinHop(tl, K, svg, [1250, 960], [CX + 40, 700], tLoan - 0.3, { n: 4, dur: 0.9, step: 0.2, r: 15, lift: 90 });
    L5.lift(tl, K, meeraF, tMs + 1.0); L5.lift(tl, K, raviF, tLoan + 1.0);
    cash.pulse(tl, tLoan + 0.6);
    // "Most people think these two needles move together." — the dashed link forms
    const tMove = cue("s03b", "@move");
    [linkA, linkB].forEach((p) => {
      tl.fromTo(p, { opacity: 0 }, { opacity: 0.85, duration: 0.3, ease: "power2.out", immediateRender: false }, tMove - 0.3);
    });
    khata.expr(tl, cue("s03b", "@think"), "wink");
    // "Let's watch." — it snaps apart; Khata nods
    const tWatch = cue("s03b", "@watch");
    tl.to(linkA, { x: -50, opacity: 0, duration: 0.3, ease: "power3.in" }, tWatch - 0.35);
    tl.to(linkB, { x: 50, opacity: 0, duration: 0.3, ease: "power3.in" }, tWatch - 0.35);
    L5.drop(tl, K, snap, tWatch - 0.4, { dur: 0.2 }); L5.lift(tl, K, snap, tWatch - 0.1);
    khata.arm(tl, tWatch - 0.2, "R", 100, 0.25); khata.arm(tl, tWatch + 0.5, "R", 20, 0.3);
    // exit: the calendar's highlight steps BACK 16 → 15 (the scripted rewind) as the scene hands over
    cal.tickTo(tl, segEnd("s03b") - 0.05, 15, { dur: 0.55, allowBack: true });
    L5.allow(svg);
  };
})();

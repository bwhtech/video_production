// s09 — Two needles, two stories. Two hero gauges (Profit ₹19,000 · Money ₹54,000) + the Scale HUD (final state, level). A strip of five transaction
// slips starting at T8 (15 · 16 · 20 · 22 · 25), each with a Profit socket and a Money socket: the Profit dot lights once (slip 2), Money dots three times
// (slips 3–5). Then the gauges slide up and two cards drop in: `Cash basis` (greyed to 50 %) and `Accrual basis` with the `Accrual ✓` chip.
// Camera still. Out: default torn-paper wipe into s10.
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start;
    L5.stage(K, svg, C.leaf, 880);
    const cal = L5.cal(K, svg, 25);

    // ---- hero gauges inside a two-layer rig (so they can scale AND slide up as one move)
    const lay = L5.layers(K, svg), GS = 0.95, GYY = 417;
    const profit = L5.gauge(K, lay.sc, 520, GYY, GS, { label: "Profit", icon: "trending-up", band: C.saffron, max: 25000, value: 19000 });
    const cash = L5.gauge(K, lay.sc, 1030, GYY, GS, { label: "Money", icon: "coins", band: C.sky, max: 60000, value: 54000,
      sub: [{ icon: "galla", label: "Cash", value: 35000 }, { icon: "landmark", label: "Bank", value: 19000 }] });

    // ---- the five transaction slips (T8 · T9 · T10 · T11 · T12), each with two sockets (Profit · Money)
    const SY = 860, SXS = [0, 1, 2, 3, 4].map((i) => 960 + (i - 2) * 340);
    const mkSocket = (parent, x, y, iconName) => {
      const g = K.g(parent, { transform: `translate(${x} ${y})` });
      K.el("circle", { cx: 0, cy: 0, r: 30, fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "10 8", opacity: 0.45 }, g);
      K.icon(K.g(g, { opacity: 0.3 }), iconName, 0, 0, 34, C.ink, 2.2);
      const lit = L5.hide(L5.node(K, g, 0, 0));
      K.paper(K.shadow(lit, 1), K.cutEll(0, 0, 31, 31, 0.8), C.ink);
      K.icon(lit, iconName, 0, 0, 36, C.gold, 2.4);
      return lit;
    };
    const art = [
      (g) => { K.medallion(g, -62, -34, 40, "landmark"); K.bundle(g, 48, -22, 0.6, -6); },
      (g) => { L5.tumblerRow(K, g, -40, 4, 0.9, 3, 50); K.faceArt(g, "infotech", 34).setAttribute("transform", "translate(78 -38)"); },
      (g) => { K.faceArt(g, "gopal", 34).setAttribute("transform", "translate(-66 -38)"); K.note(g, 52, -30, 96, 50, -6); },
      (g) => { K.medallion(g, -66, -36, 38, "cake"); K.text(g, 52, -34, "May 5", { size: 40, weight: 800 }); },
      (g) => { K.medallion(g, -66, -36, 38, "smartphone"); K.coin(g, 36, -26, 24); K.coin(g, 74, -40, 20); },
    ];
    const DATES = ["15", "16", "20", "22", "25"];
    const slips = SXS.map((x, i) => {
      const n = L5.hide(L5.node(K, svg, x, SY));
      K.tex(K.shadow(n, 2), K.cutRect(-140, -112, 280, 224, 2, 24), "pat-paper");
      art[i](n);
      K.text(n, 0, 148, DATES[i], { size: 40, weight: 800, color: "#fff4e2" });
      const sP = mkSocket(n, -62, 62, "trending-up"), sC = mkSocket(n, 62, 62, "coins");
      return { n, sP, sC };
    });

    // ---- the two basis cards (cash basis = greyed mirror), and the `Accrual ✓` chip
    const mkCard = (x, title) => {
      const n = L5.hide(L5.node(K, svg, x, 745)), g = K.g(n, {});
      K.card(g, 0, 0, 700, 400, { header: C.sky, title, titleSize: 56, headerH: 90 });
      return { n, g };
    };
    const cashCard = mkCard(520, "Cash basis"), accCard = mkCard(1400, "Accrual basis");
    K.coin(cashCard.g, -50, 70, 100); K.medallion(cashCard.g, 80, 0, 54, "check");
    K.tumbler(accCard.g, -210, 180, 4.6); K.medallion(accCard.g, -130, -20, 46, "check");
    K.coin(accCard.g, 90, 80, 82); K.medallion(accCard.g, 170, 14, 44, "clock");
    const chip = L5.hide(L5.node(K, svg, 1600, 498));
    K.label(chip, 0, 0, "Accrual", { size: 56, bg: C.saffron, rot: -2, weight: 800 });
    K.medallion(chip, -128, 0, 34, "check", C.leaf);
    const H = L5.hud(K, svg, tl, { stage: 5 });

    // ======================================================================================= timeline
    // s09a — "Since April fifteenth, the profit needle moved once … the money needle moved three times"
    const tFif = cue("s09a", "@fifteenth");
    slips.forEach((s, i) => L5.drop(tl, K, s.n, tFif + i * 0.3, { dur: 0.36 }));
    profit.flash(tl, cue("s09a", "@needle"), 0.6);
    L5.drop(tl, K, slips[1].sP, cue("s09a", "@once"), { dur: 0.3 });
    K.pulseNode(tl, slips[1].n, cue("s09a", "@once") + 0.2, 1.05);
    cash.flash(tl, cue("s09a", "@needle", 2), 0.6);
    L5.drop(tl, K, slips[2].sC, cue("s09a", "@moved", 2), { dur: 0.3 });
    L5.drop(tl, K, slips[3].sC, cue("s09a", "@three"), { dur: 0.3 });
    L5.drop(tl, K, slips[4].sC, cue("s09a", "@times"), { dur: 0.3 });
    // s09b — "Profit: nineteen thousand rupees. Money: fifty-four thousand." (no re-count — a soft highlight)
    profit.pulse(tl, cue("s09b", "@profit")); profit.flash(tl, cue("s09b", "@profit"), 0.7);
    cash.pulse(tl, cue("s09b", "@money")); cash.flash(tl, cue("s09b", "@money"), 0.7);
    // s09c — the strip lifts away, the gauges slide up, two cards drop in
    const tCB = cue("s09c", "@cash");
    slips.forEach((s, i) => L5.lift(tl, K, s.n, tCB - 0.45 + i * 0.05));
    L5.zoom(tl, lay, tCB - 0.45, 0.7, [775, GYY], 1, 0.62, [0, 0], [0, -120], "power2.inOut");
    L5.drop(tl, K, cashCard.n, tCB, { dur: 0.4 });
    L5.drop(tl, K, accCard.n, cue("s09c", "@accrual"), { dur: 0.4 });
    // "Businesses use accrual" — the chip settles on the Accrual card; the cash-basis card dims to 50 %
    const tUse = cue("s09c", "@accrual", 2);
    L5.drop(tl, K, chip, tUse, { dur: 0.4 });
    tl.to(cashCard.n, { opacity: 0.5, duration: 0.5, ease: "power2.inOut" }, tUse);
    L5.allow(svg);
  };
})();

// s05 — The tab: "Which two things changed?" on T9 (WORKED). Apr 16, Infotech's tab = the first fortnight's bill, ₹6,000.
//   slot (right) Sales +₹6,000 → a slip drops into the HUD's Profit pocket · slot (left) no cash comes in — a new jar `Infotech`
//   (Receivable, an asset) → flies into the HUD's left pan · then the NEEDLES: Profit 13,000 → 19,000, Cash dead still (the `=` tag),
//   1.5 s of silence on the still needle. Then the accrual strip (revenue row + expense row): the tick jumps from the coin panel to
//   the tumbler / used-up panel; `Accrual` chip lands; ≥ 1.5 s still. Seam-in: s04's slip grew into cream → this scene fades it out.
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start, GY = 1000;
    const cam = K.g(svg, {});
    L5.stage(K, cam, C.teal, 880);
    // the curved colour wipe teal → sky that arrives behind everything on the accrual beat
    const skyClip = K.el("clipPath", { id: "s05-skyclip" }, svg);
    const skyCirc = K.el("circle", { cx: -300, cy: 600, r: 0 }, skyClip);
    K.wall(K.g(cam, { "clip-path": "url(#s05-skyclip)" }), C.sky, 880);

    // ---- gauges (strip) at the post-T8 readings
    const { profit, cash, GS } = L5.strip(K, cam, { stage: 1 });

    // ---- cast + props
    const khata = K.khataRig(cam, 330, 1005, 0.72, { open: true, expr: "awake", blankPages: true });
    const meera = K.meera(cam, 1710, GY, 0.9, { expr: "happy" });
    const row = L5.tumblerRow(K, cam, 930, 962, 1.3, 5, 54);                 // Priya's floor of chai tumblers (full)
    const bill = L5.hide(L5.node(K, cam, 930, 640));                        // the bill slip (the Bank's door from s04)
    {
      const br = K.g(bill, { transform: "rotate(-2)" });
      K.tex(K.shadow(br, 2), K.cutRect(-150, -92, 300, 184, 2, 22), "pat-paper");
      K.paper(br, K.cutRect(-142, -84, 284, 22, 1, 20), C.sky);
      K.icon(br, "receipt", -124, -73, 30, C.white, 2.4);
      K.faceArt(br, "infotech", 38).setAttribute("transform", "translate(-96 14)");
      K.text(br, 40, 16, "₹6,000", { size: 58, weight: 800 });
    }
    const tick1 = L5.hide(L5.node(K, cam, 930, 820)); K.medallion(tick1, 0, 0, 40, "check", C.leaf);   // "earned" ✓ over the drunk tumblers
    // the empty galla ghost (no coins came in) + a "nothing" puff
    const ghost = L5.hide(L5.node(K, cam, 1290, 985));
    { const gg = K.g(ghost, { opacity: 0.55 }); K.galla(gg, 0, 0, 0.85, { open: true }); }
    const puffs = [[-30, -150, 34], [20, -190, 28], [-6, -230, 22]].map(([x, y, r]) => {
      const n = L5.hide(L5.node(K, cam, 1290 + x, 985 + y)); K.paper(n, K.cutEll(0, 0, r, r * 0.8, 1.2), C.cream); return n;
    });
    // the hero Infotech jar (outer flies, inner scales)
    const heroOuter = L5.node(K, cam, 1290, 985), heroInner = K.g(heroOuter, {});
    const hero = K.jarRig(heroInner, 0, 0, 1.0, { label: "Infotech", contents: "coins", fill: 0.6, amount: 0, edge: C.dr, hidden: true });
    { const fa = K.g(hero.body, { transform: "translate(0 -262)" }); K.tex(K.shadow(fa, 1), K.cutEll(0, 0, 44, 44, 1), "pat-paper"); K.faceArt(fa, "infotech", 36); }
    const recvBig = L5.chip(K, cam, 1290, 640, "Receivable", { bg: C.dr, size: 52, rot: -2 });
    const recvHud = L5.chip(K, cam, 1450, 462, "Receivable", { bg: C.dr, size: 40 });

    // ---- the accrual strip (two rows: revenue + expense); tick medallion hops between panels
    const strip = (cy, k) => {
      const n = L5.hide(L5.node(K, cam, 960, cy, k));
      K.tex(K.shadow(n, 2), K.cutRect(-560, -120, 1120, 240, 2, 26), "pat-paper");
      K.ink(n, [[0, -100], [0, 100]], 4, "#a39684", { opacity: 0.6 });
      return n;
    };
    const s1 = strip(620, 1.0), s2 = strip(850, 0.72);
    // row 1: A (earned) tumblers drunk · B (money arrives) coin + clock
    const a1 = K.g(s1, { transform: "translate(-280 0)" }), b1 = K.g(s1, { transform: "translate(280 0)" });
    const tr1 = L5.tumblerRow(K, a1, 0, 62, 1.45, 4, 84);   // fits inside the left half (was 2.1 → overflowed the card + divider)
    K.coin(b1, -70, 0, 62); K.medallion(b1, 60, -6, 50, "clock", C.coral);
    // row 2: A (used up) leaves thinning · B coin leaving + clock
    const a2 = K.g(s2, { transform: "translate(-280 0)" }), b2 = K.g(s2, { transform: "translate(280 0)" });
    const crate = K.jarRig(a2, 0, 90, 0.7, { contents: "leaves", icon: "leaf", fill: 1 });
    K.note(b2, -60, 10, 130, 66, -10); K.medallion(b2, 70, -6, 50, "clock", C.coral);
    // the tick medallion (one object that hops: row 1, then row 2)
    const tk = L5.hide(L5.node(K, cam, 0, 0)); K.medallion(tk, 0, 0, 44, "check", C.leaf);
    const tk2 = L5.hide(L5.node(K, cam, 0, 0)); K.medallion(tk2, 0, 0, 38, "check", C.leaf);
    const chipAccr = L5.chip(K, cam, 960, 990, "Accrual", { bg: C.saffron, size: 66, rot: -1 });
    const dimB1 = K.el("rect", { x: 280 - 250, y: -110, width: 500, height: 220, fill: C.cream, opacity: 0, rx: 18 }, s1);
    const dimB2 = K.el("rect", { x: 280 - 250, y: -110, width: 500, height: 220, fill: C.cream, opacity: 0, rx: 18 }, s2);

    const H = L5.hud(K, svg, tl, { stage: 1 });
    const cal = L5.cal(K, svg, 15);
    const w2 = K.whichTwo(svg, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");
    const cream = K.el("rect", { x: -40, y: -40, width: 2000, height: 1160, fill: C.cream, opacity: 1 }, svg);

    // ======================================================================================= timeline
    tl.to(cream, { opacity: 0, duration: 0.55, ease: "power1.out" }, T0 + 0.05);
    meera.blinks(tl, T0 + 1.2, sc.end, 3.4); khata.blink(tl, T0 + 2.0); khata.blink(tl, T0 + 12.0);
    // s05a "Now, April sixteenth. Infotech's tab. Which two things changed?"
    cal.tickTo(tl, cue("s05a", "@sixteenth") - 0.1, 16, { dur: 0.4 });
    L5.drop(tl, K, bill, cue("s05a", "@tab") - 0.7, { dur: 0.4 });
    meera.look(tl, cue("s05a", "@tab"), -7, 3);
    // THE DEVICE — freeze, veil, two dashed slots top-centre, 2.0 s of dead stillness (tick_tock), then the chips fill on the VO words
    const tWhich = cue("s05a", "@which");
    const tSales = cue("s05b", "@sales"), tInfo = cue("s05b", "@infotech");
    const slots = w2.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [
      { label: "Infotech", delta: 6000, side: "L", at: tInfo + 0.1 },
      { label: "Sales", delta: 6000, side: "R", at: tSales },
    ] });
    // s05b — "Sales went up by six thousand." the slip drops into the HUD's Profit pocket; the right pan gets heavier
    const tUp = cue("s05b", "@up");
    H.card.slip(tl, tSales + 0.3, "Profit", 6000, { from: [0, -220] });
    H.card.light(tl, tSales + 0.35, "Profit", { hold: 1.0 });
    H.rig.setTotals(tl, tSales + 0.8, undefined, 107000, { dur: 0.7 }); H.rig.tilt(tl, tSales + 0.8, -4, { dur: 0.7 });
    // "The chai has been drunk, so Meera has earned it." — the tumblers empty one by one; a ✓ medallion lands
    const tChai = cue("s05b", "@chai"), tDrunk = cue("s05b", "@drunk"), tEarned = cue("s05b", "@earned");
    row.drink(tl, tDrunk - 0.1, 0.2);
    L5.drop(tl, K, tick1, tEarned - 0.05, { dur: 0.35 });
    meera.expr(tl, tEarned, "proud"); meera.look(tl, tEarned, -8, 0);
    // "But on the left, no cash came in." — an empty galla ghost, a "nothing" puff
    const tLeft = cue("s05b", "@left"), tNoCash = cue("s05b", "@no");
    L5.drop(tl, K, ghost, tLeft); meera.expr(tl, tNoCash, "puzzled");
    puffs.forEach((n, i) => { tl.set(n, { autoAlpha: 1 }, tNoCash + 0.1 + i * 0.12); tl.to(n, { y: -70, autoAlpha: 0, duration: 0.9, ease: "power1.out" }, tNoCash + 0.1 + i * 0.12); });
    // "Instead, Infotech now owes the stall six thousand rupees." — the jar replaces the ghost; the amount counts
    const tOwes = cue("s05b", "@owes"), tSix = cue("s05b", "@six");
    L5.lift(tl, K, ghost, tInfo - 0.1);
        hero.enter(tl, tInfo + 0.1);
    hero.fill(tl, tOwes - 0.1, 0.6);
    hero.tick(tl, tSix, 0, 6000, 0.9);
    meera.expr(tl, tInfo, "thinking"); meera.look(tl, tInfo, -9, 1);
    // "Money that customers owe you is an asset, called a receivable." — the Receivable chip lands on the jar
    const tRecv = cue("s05b", "@receivable");
    L5.drop(tl, K, recvBig, tRecv - 0.05, { dur: 0.35 });
    w2.clear(tl, tInfo + 1.5);
    // s05c — "So the profit needle jumps…" the jar flies up and lands on the HUD's left pan; the beam settles level; the needle swings
    const tSo = cue("s05c", "@so"), tJumps = cue("s05c", "@jumps");
    const tArr = tSo + 0.9;
    H.add(tl, tArr - 0.15, "inf");
    const dest = H.jarPt("inf", -40);
    L5.lift(tl, K, recvBig, tSo - 0.1, { dur: 0.2 });
    L5.fly(tl, heroOuter, tSo, [0, 0], [dest[0] - 1290, dest[1] - 985], 0.9, { lift: 70 });
    tl.to(heroInner, { scale: 0.26, svgOrigin: O, duration: 0.9, ease: "power2.inOut" }, tSo);
    tl.to(heroInner, { autoAlpha: 0, duration: 0.12 }, tArr);
    L5.drop(tl, K, recvHud, tArr + 0.2, { dur: 0.35 });
    H.rig.setTotals(tl, tArr, 107000, undefined, { dur: 0.7 }); H.rig.settle(tl, tArr + 0.1, { dur: 0.9, hold: 1.5 });
    khata.expr(tl, tJumps - 0.3, "wow");
    profit.read(tl, tJumps - 0.15, 19000, { dur: 1.1 });
    profit.flash(tl, tJumps - 0.1, 0.9);
    khata.hop(tl, tJumps - 0.2, { height: 40 });
    // "And the cash needle? It doesn't move at all." — still. The `=` tag drops, the camera pushes in a touch, then 1.5 s dead still
    const tCashW = cue("s05c", "@cash"), tMove = cue("s05c", "@move");
    cash.flash(tl, tCashW, 1.6);
    cash.eq(tl, tMove);
    meera.expr(tl, tCashW, "puzzled"); meera.look(tl, tCashW, -9, -4);
    L5.push(tl, cam, tCashW - 0.2, segEnd("s05c") - tCashW + 0.2, `${cash.x} ${cash.y}`, 1.0, 1.05, "power1.inOut");

    // s05d — the accrual rule (colour wipe to sky; two-row strip; the tick jumps; the Accrual chip lands; ≥ 1.5 s still)
    const tWipe = segStart("s05d") - 0.5;
    tl.fromTo(skyCirc, { attr: { r: 0 } }, { attr: { r: 2600 }, duration: 1.0, ease: "power2.inOut", immediateRender: false }, tWipe);
    tl.to(cam, { scale: 1, svgOrigin: `${cash.x} ${cash.y}`, duration: 0.6, ease: "power2.inOut" }, tWipe + 0.15);
    [khata.g, row.g, bill, tick1, recvHud].forEach((n, i) => tl.to(n, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, tWipe + 0.1 + i * 0.03));
    const tRev = cue("s05d", "@revenue"), tEarn = cue("s05d", "@earned"), tDrk = cue("s05d", "@drunk"), tArrv = cue("s05d", "@arrives");
    L5.drop(tl, K, s1, tRev - 0.2, { dur: 0.4 });
    // the tick starts on the coin panel (the common assumption), then hops to the tumbler panel on "earned"
    // the tick starts on the coin panel (the common assumption), then hops to the tumbler panel on "earned" and stays there
    const tkB = [960 + 280, 620 - 90], tkA = [960 - 280, 620 - 100];   // ✓ centred over the whole glass group
    L5.drop(tl, K, tk, tRev + 0.3, { dur: 0.3 });
    tl.set(tk, { x: tkB[0], y: tkB[1] }, tRev + 0.3 - 0.02);
    L5.fly(tl, tk, tEarn - 0.1, tkB, tkA, 0.5, { lift: 70 });
    tr1.drink(tl, tDrk - 0.3, 0.18);
    tl.to(dimB1, { opacity: 0.6, duration: 0.4 }, tArrv);
    const tExp = cue("s05d", "@expenses"), tInc = cue("s05d", "@incurred"), tUsed = cue("s05d", "@used"), tPaid = cue("s05d", "@paid");
    L5.drop(tl, K, s2, tExp - 0.2, { dur: 0.4 });
    // the second tick starts the expense row on the money panel too, and hops to the used-up panel on "incurred"
    const tkB2 = [960 + 280 * 0.72, 850 - 66], tkA2 = [960 - 280 * 0.72, 850 - 66];
    L5.drop(tl, K, tk2, tExp + 0.4, { dur: 0.3 });
    tl.set(tk2, { x: tkB2[0], y: tkB2[1] }, tExp + 0.4 - 0.02);
    L5.fly(tl, tk2, tInc - 0.05, tkB2, tkA2, 0.5, { lift: 60 });
    crate.fill(tl, tUsed, 0.25);
    tl.to(dimB2, { opacity: 0.6, duration: 0.4 }, tPaid);
    const tAccr = cue("s05d", "@accrual");
    L5.drop(tl, K, chipAccr, tAccr - 0.05, { dur: 0.4 });
    L5.allow(svg);
  };
})();

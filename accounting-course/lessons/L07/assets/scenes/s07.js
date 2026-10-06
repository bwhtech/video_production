// s07 — Two traps: the Bank and Capital (T8, T1). The split screen stays (the scale proves the trap is about the FAMILY, never the side).
// Left camera turns coral (misconception beat): the three trays return; the Bank hovers over Real with a `?` → red ✗ stamp (Khata stamps) → it hops into Personal.
// T8 writes on both cameras (Bank = receiver), the entries lock; a mini SMS card slides in on "Exactly what we found with the SMS".
// Then Meera's face medallion (₹50,000 bundle) hovers over Real; Khata raises a hand → it slides into Personal; T1 (Capital = giver) writes and locks.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, S = L7.SPLIT, T0 = sc.start;
    const sp = L7.split(svg, tl, { cal: 25, L: 80000, R: 80000, leftBg: C.coral });
    const { world, rig } = sp;

    // ---- left camera: the three trays + their labels
    const fams = ["personal", "real", "nominal"], TX = [170, 480, 790], TYB = 905;
    const trays = fams.map((f, i) => { const t = L7.tray(world, TX[i], TYB, f, { w: 480, h: 140, s: 0.55 }); L7.hide(t.n); return t; });
    const labs = fams.map((f, i) => { const n = L7.node(world, TX[i], 1005); L7.hide(n); K.label(n, 0, 0, L7.FAM[f].name, { size: 44, bg: L7.FAM[f].col }); return n; });

    // ---- the Bank (floats over Real) + Meera's capital medallion
    const bank = L7.bank(world, 480, 760, 0.62); L7.hide(bank.n);
    const q1 = L7.qmark(world, 600, 600, 1.0);
    const cap = L7.node(world, 480, 700); L7.hide(cap);
    K.tex(K.shadow(cap, 2), K.cutEll(0, 0, 76, 76, 1), "pat-paper"); K.faceArt(cap, "meera", 66);
    { const b = L7.node(cap, 84, 40, 1); K.bundle(b, 0, 0, 0.8, -8); const t = K.ticker(cap, 0, 108, 1, { value: 50000, size: 42, chip: true, w: 190, h: 60, edge: C.cr }); }
    const q2 = L7.qmark(world, 600, 600, 1.0);
    // mini SMS card (callback)
    const sms = L7.node(world, 745, 610, 0.85); L7.hide(sms); K.smsCard(sms, 0, 0, 260, 190, { kind: "CREDITED", amount: "₹15,000", acct: "A/c XX12", size: 38 });

    // ---- Khata at the divider
    const khata = K.khataRig(world, 960, 1040, 0.42, { expr: "awake" });

    // ---- the scale: Cash + Bank (T8), then a fresh day-one state for T1
    const jCash = L7.sJar(rig, 0, 2, { label: "Cash", contents: "coins", fill: 1, edge: C.dr });
    const jBank = L7.sJar(rig, 1, 2, { label: "Bank", icon: "landmark", contents: "notes", fill: 0, edge: C.dr, hidden: true });
    const tMeera = L7.sTag(rig, 0, 2, { face: "meera" }), tRavi = L7.sTag(rig, 1, 2, { face: "ravi" });
    const jCash1 = K.jarRig(rig.pans.L.g, 0, 0, 1.0, { label: "Cash", contents: "coins", fill: 0, edge: C.dr, hidden: true });
    const tCap = K.claimTag(rig.pans.R.g, 0, 0, 0.8, { face: "meera", size: 54, hidden: true });
    rig.pans.L.total.set(tl, T0 - 0.2, 80000); rig.pans.R.total.set(tl, T0 - 0.2, 80000);

    // ---- entries
    const E8 = { eL: L7.entry(world, S.LCX, S.ENT_Y, [{ name: "Bank", amt: 15000, side: "L", tag: "personal_receiver" }, { name: "Cash", amt: 15000, side: "R", tag: "real_out" }], { gold: true }),
                 eR: L7.entry(world, S.RCX, S.ENT_Y, [{ name: "Bank", amt: 15000, side: "L" }, { name: "Cash", amt: 15000, side: "R" }], {}), seal: L7.seal(world, S.DIV, S.ENT_Y) };
    const E1 = { eL: L7.entry(world, S.LCX, S.ENT_Y, [{ name: "Cash", amt: 50000, side: "L", tag: "real_in" }, { name: "Capital", amt: 50000, side: "R", tag: "personal_giver" }], { gold: true }),
                 eR: L7.entry(world, S.RCX, S.ENT_Y, [{ name: "Cash", amt: 50000, side: "L" }, { name: "Capital", amt: 50000, side: "R" }], {}), seal: L7.seal(world, S.DIV, S.ENT_Y) };
    L7.allow(world);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 17); khata.blink(tl, T0 + 30);
    rig.setTotals(tl, T0 + 0.5, 80000, 80000, { dur: 0.1 });
    // s07a — "Two traps catch almost everyone." the trays return
    trays.forEach((t, i) => L7.drop(tl, t.n, cue("s07a", "@traps") + i * 0.14, { dur: 0.35 }));
    labs.forEach((n, i) => L7.drop(tl, n, cue("s07a", "@traps") + 0.4 + i * 0.14, { dur: 0.3 }));
    // "First, the bank." — it floats in over Real with a `?` on "A Real account, right?"
    L7.drop(tl, bank.n, cue("s07a", "@bank", 1) - 0.1, { dur: 0.4 });
    K.pulseNode(tl, bank.n, cue("s07a", "@thing"), 1.08);
    L7.drop(tl, q1, cue("s07a", "@real") - 0.1, { dur: 0.3 });
    // s07b — "[firmly] Nope." red ✗ stamp (Khata stamps) on the ghost Bank-in-Real; the Bank hops to Personal
    const tNope = cue("s07b", "@nope");
    khata.arm(tl, tNope - 0.4, "L", 125, 0.25); khata.arm(tl, tNope - 0.1, "L", 20, 0.12); khata.expr(tl, tNope - 0.4, "wow");
    const st = K.stamp(tl, world, 480, 650, tNope, 1.5);
    tl.to(q1, { autoAlpha: 0, duration: 0.2 }, tNope);
    const tPers = cue("s07b", "@personal");
    st.lift(tl, tPers - 0.35);
    tl.to(bank.n, { y: -180, duration: 0.3, ease: "power2.out" }, tPers - 0.3);
    tl.to(bank.n, { x: TX[0] - 55 - 480, duration: 0.55, ease: "power1.inOut" }, tPers - 0.3);
    tl.to(bank.n, { y: 60, scale: 0.8, svgOrigin: O, duration: 0.3, ease: "power2.in" }, tPers + 0.05);
    K.pulseNode(tl, trays[0].med, tPers + 0.4, 1.15);
    khata.arm(tl, tPers, "L", 20, 0.3); khata.expr(tl, tPers + 0.2, "happy");
    // T8 — "When Meera deposited fifteen thousand rupees, the bank was the receiver. Debit Bank."
    const [r81, r82] = E8.eL.rows, [q81, q82] = E8.eR.rows;
    E8.eL.show(tl, cue("s07b", "@receiver") - 0.35);
    L7.writeRow(tl, r81, cue("s07b", "@receiver") - 0.3, { chipAt: 0.45 });
    L7.writeRow(tl, r82, cue("s07b", "@bank", 3) + 0.2, { chipAt: 0.45 });
    // "Exactly what we found with the SMS." — the mini SMS card slides in; the scale agrees (Bank jar ↑, Cash jar ↓, level)
    const tEx = cue("s07b", "@exactly");
    L7.drop(tl, sms, cue("s07b", "@sms") - 0.5, { dur: 0.4 });
    jBank.enter(tl, tEx - 0.3); jBank.fill(tl, tEx + 0.1, 1.0); jCash.fill(tl, tEx + 0.3, 0.5);
    E8.eR.show(tl, tEx + 0.2);
    L7.writeRow(tl, q81, tEx + 0.25, { dur: 0.5 }); L7.writeRow(tl, q82, tEx + 0.7, { dur: 0.5 });
    rig.levelFlash(tl, tEx + 1.0);
    const k8 = L7.lock(tl, E8.eL, E8.eR, segEnd("s07b") + 0.05, { seal: E8.seal });
    // clear T8 + the scale for day one
    const tClr = k8.tCr + 0.55;
    [E8.eL.n, E8.eR.n, E8.seal, sms].forEach((n) => L7.lift(tl, n, tClr));
    // s07c — "Second trap: capital." Meera's medallion hovers over Real; Khata raises a hand; it slides to Personal
    const tReal = cue("s07c", "@real");
    L7.drop(tl, cap, cue("s07c", "@money") - 0.1, { dur: 0.4 });
    L7.drop(tl, q2, tReal - 0.1, { dur: 0.3 });
    const tNo = cue("s07c", "@no");
    khata.arm(tl, tNo - 0.3, "R", 125, 0.25); khata.expr(tl, tNo - 0.3, "wow");
    tl.to(q2, { autoAlpha: 0, duration: 0.2 }, tNo);
    tl.to(cap, { x: TX[0] + 100 - 480, y: 90, duration: 0.7, ease: "power2.inOut" }, tNo + 0.2);
    K.pulseNode(tl, trays[0].med, tNo + 0.9, 1.15);
    khata.arm(tl, tNo + 1.0, "R", 20, 0.3); khata.expr(tl, tNo + 1.1, "happy");
    // "On day one" — the scale is emptied; "she was the giver. Credit Capital, fifty thousand."
    const tDay = cue("s07c", "@day");
    [jCash, jBank].forEach((j) => j.exit(tl, tDay - 0.1)); [tMeera, tRavi].forEach((t) => t.exit(tl, tDay - 0.1));
    rig.setTotals(tl, tDay - 0.1, 0, 0, { dur: 0.5 });
    const [r11, r12] = E1.eL.rows, [q11, q12] = E1.eR.rows;
    E1.eL.show(tl, cue("s07c", "@giver") - 0.45);
    L7.writeRow(tl, r11, cue("s07c", "@giver") - 0.4, { chipAt: 0.4 });
    L7.writeRow(tl, r12, cue("s07c", "@credit") - 0.25, { chipAt: 0.4 });
    const tG = cue("s07c", "@giver");
    jCash1.enter(tl, tG - 0.2); jCash1.fill(tl, tG, 1.0); rig.setTotals(tl, tG, 50000, undefined, { dur: 0.6 });
    E1.eR.show(tl, tG + 0.2);
    L7.writeRow(tl, q11, tG + 0.25, { dur: 0.5 });
    tCap.enter(tl, cue("s07c", "@credit") + 0.1); rig.setTotals(tl, cue("s07c", "@credit") + 0.2, undefined, 50000, { dur: 0.6 });
    L7.writeRow(tl, q12, cue("s07c", "@capital", 2) - 0.3, { dur: 0.5 });
    rig.levelFlash(tl, cue("s07c", "@capital", 2) + 0.1);
    L7.lock(tl, E1.eL, E1.eR, cue("s07c", "@fifty") - 0.3, { seal: E1.seal });
  };
})();

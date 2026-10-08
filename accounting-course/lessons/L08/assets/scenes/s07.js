// s07 — T16: the compound entry (₹3,300 to Ravi Mama = ₹3,000 loan + ₹300 interest) + the misconception "repaying a loan is an expense".
//   a  Meera hands over three ₹1,000 + three ₹100 notes · "which things changed?": two slots, 2.0 s, then a THIRD slot squeezes in on "Three of them!"
//   b  Khata writes three lines (Dr Loan, Dr Interest, To Cash) + narration; "Compound entry" chip + brace; both totals count to 3,300 together
//   c  curved wipe to coral: Meera's thought bubble drops ALL six notes into the Interest jar → ✗ stamp → only the ₹100 notes stay; the ₹1,000 notes fly back onto Ravi Mama's tag (₹30,000 → ₹27,000); the profit gauge stays still.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start, JX = L8.JX, GY = 1048;
    const tWhich = cue("s07a", "@changed") - 0.3;
    // ---- world (teal, + the coral wipe for the misconception)
    const S = L8.scaffold(svg, tl, K, sc, { color: C.teal, at: 9999, wipe: { color: C.coral, cx: 1180, cy: 560 } });
    // scaffold built wall/table/cal; we need a coral wall *under* the table, so add the wipe layer right now (it sits above the teal wall, below everything built later)
    const jc = S.jc, y0 = S.y(0), y1 = S.y(1), y2 = S.y(2), y3 = S.y(3), y4 = S.y(4);
    // (cardPos/hud/check were scheduled at t=9999 — re-schedule them below by tweening to visible at the right time)
    const jarInt = S.jar("L", "interest", "Interest", "coins", C.dr), jarCash = S.jar("R", "cash", "Cash", "coins", C.cr);
    // ---- cast: Ravi Mama (left, with his face-tag), Meera (right)
    // big and central for the hand-over (explicit x / scale on the rig roots — the origin is the feet), then they step out to the margins
    const ravi = K.raviMama(svg, 120, GY, 0.56, { expr: "proud" });
    const rTag = K.claimTag(svg, 130, 700, 0.62, { face: "ravi", amount: 30000, size: 54 });
    const m = K.meera(svg, 1800, GY, 0.56, { expr: "happy" });
    // objects that light at the ding
    const jIntN = L8.node(svg, 420, GY); L8.hide(jIntN); const jInt = K.jarRig(jIntN, 0, 0, 0.85, { label: "Interest", icon: "percent", contents: "coins", fill: 0.15, edge: C.dr });
    const gN = L8.node(svg, 1480, GY); L8.hide(gN); K.galla(gN, 0, 0, 0.8, {});
    // six notes: three ₹1,000 (big) + three ₹100 (small)
    const mkNote = (big) => (n) => K.note(n, 0, 0, big ? 150 : 104, big ? 76 : 52, 0, big ? "#cfe3c4" : "#d6e4f0");
    // "brace + Compound entry" chip, totals row, rules
    const brace = L8.node(jc.body, 0, 0); L8.hide(brace);
    K.ink(brace, [[352, y0 - 28], [364, y0 - 28], [364, y0 + 6], [378, (y0 + y1) / 2], [364, y1 - 6], [364, y1 + 28], [352, y1 + 28]], 6, C.coralText);
    K.paper(K.shadow(brace, 1), K.cutRect(388, (y0 + y1) / 2 - 46, 164, 92, 1.4, 20), C.cream);
    K.text(brace, 470, (y0 + y1) / 2 - 20, "Compound", { size: 34, weight: 800, color: C.coralText }); K.text(brace, 470, (y0 + y1) / 2 + 22, "entry", { size: 34, weight: 800, color: C.coralText });
    const rule = L8.node(jc.body, 0, 0); L8.hide(rule);
    K.ink(rule, [[JX.drR - 205, y4 - 30], [JX.crR + 25, y4 - 30]], 5, C.ink); K.ink(rule, [[JX.drR - 205, y4 - 22], [JX.crR + 25, y4 - 22]], 4, C.ink);
    const tkTotDr = K.ticker(jc.body, JX.drR, y4 + 8, 1, { value: 0, size: 40, weight: 800, anchor: "end", prefix: "", color: C.drText, hidden: true });
    const tkTotCr = K.ticker(jc.body, JX.crR, y4 + 8, 1, { value: 0, size: 40, weight: 800, anchor: "end", prefix: "", color: C.crText, hidden: true });
    [tkTotDr, tkTotCr].forEach((k) => k.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true")));
    // ---- the misconception stage (coral): thought bubble with the Interest jar + the profit gauge
    const imag = K.imagineCard(svg, 1190, 450, 760, 470, { hidden: true });
    const jarBub = K.jarRig(imag.area.g, 80, 190, 1.0, { label: "Interest", icon: "percent", contents: "coins", fill: 0.1, edge: C.dr, amount: 0 });
    const gauge = L8.node(imag.area.g, -210, 180); L8.hide(gauge); K.gauge(gauge, 0, 0, 90, 0.5, { color: C.gold });
    const gLab = L8.node(imag.area.g, -210, 232); L8.hide(gLab); K.paper(K.shadow(gLab, 1), K.cutRect(-76, -24, 152, 48, 1, 16), C.cream); K.text(gLab, 0, 3, "Profit", { size: 34, weight: 800 });
    const mkSplit = (x, icon, amt, lab, col) => { const n = L8.node(svg, x, 300); L8.hide(n); K.paper(K.shadow(n, 1), K.cutRect(-190, -52, 380, 104, 1.6, 22), C.cream); K.paper(n, K.cutRect(-182, 40, 364, 8, 0.5, 8), col); K.medallion(n, -130, -2, 38, icon); K.text(n, 20, -14, amt, { size: 48, weight: 800, color: col === C.dr ? C.drText : C.crText }); K.text(n, 20, 26, lab, { size: 34, weight: 700, color: "#5b4f45" }); return n; };
    const splitA = mkSplit(820, "hand-coins", "₹3,000", "loan", C.dr), splitB = mkSplit(1260, "percent", "₹300", "interest", C.dr);
    const dev = K.whichTwo(svg, { veil: true, x: 1040, y: 190, s: 1 });
    L8.allow(svg);

    // =============================================================================== timeline
    ravi.blinks(tl, T0 + 1.2, sc.end, 3.3); m.blinks(tl, T0 + 2.0, sc.end, 3.5, 5); ravi.jitter(tl, T0, sc.end); m.jitter(tl, T0, sc.end);
    tl.set(ravi.g, { x: 520, y: 985, scale: 0.85 }, 0); tl.set(m.g, { x: 1400, y: 985, scale: 0.85 }, 0); tl.set(rTag.g, { x: 520, y: 450, scale: 0.9 }, 0);
    tl.to(ravi.g, { x: 120, y: GY, scale: 0.56, duration: 0.7, ease: "power2.inOut" }, tWhich - 0.25); tl.to(m.g, { x: 1800, y: GY, scale: 0.56, duration: 0.7, ease: "power2.inOut" }, tWhich - 0.25);
    tl.to(rTag.g, { x: 130, y: 700, scale: 0.62, duration: 0.7, ease: "power2.inOut" }, tWhich - 0.25);
    // the card / checklist / HUD (scheduled at 9999 by the scaffold) enter now
    const tIn = tWhich + 0.1;
    tl.fromTo(S.cardPos, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, tIn);
    [0, 1, 2].forEach((i) => S.check.enter(tl, tIn + 0.15 + i * 0.1, i)); S.hud.appear(tIn + 0.2);
    // ---- a: Meera hands over ₹3,300
    ravi.expr(tl, cue("s07a", "@tricky"), "happy"); m.expr(tl, cue("s07a", "@tricky"), "thinking");
    L8.drop(tl, jIntN, tWhich + 0.5, { dur: 0.3 }); L8.drop(tl, gN, tWhich + 0.7, { dur: 0.3 });
    const tH = cue("s07a", "@hands");
    m.arm(tl, tH - 0.2, "R", 85, 20, 0.3);
    const notes = [[true, "@three", 1], [true, "@three", 1], [true, "@three", 1], [false, "@hundred", 1], [false, "@hundred", 1], [false, "@hundred", 1]];
    notes.forEach(([big, w, nth], i) => {
      const t = (big ? cue("s07a", "@three", 1) : cue("s07a", "@hundred")) - 0.15 + (i % 3) * 0.14;
      L8.fly(svg, tl, t, [1290, 760], [575, 785 - (i % 3) * 10], mkNote(big), { dur: 0.9, k: 0.8, arc: 90 });
    });
    ravi.arm(tl, tH, "R", 70, 30, 0.3); ravi.arm(tl, cue("s07a", "@hundred") + 0.8, "R", 12, 8, 0.4); m.arm(tl, cue("s07a", "@hundred") + 0.7, "R", 12, 8, 0.4);
    L8.drop(tl, rTag.body, tH - 0.3, { dur: 0.3 });
    // "₹3,000 pays back part of his loan; ₹300 is interest" — Ravi's tag lights, the Interest jar lights
    rTag.light(tl, cue("s07a", "@loan") + 0.1, { hold: 0.7 });
    L8.drop(tl, splitA, cue("s07a", "@pays") - 0.1, { dur: 0.35 }); L8.drop(tl, splitB, cue("s07a", "@interest") - 0.1, { dur: 0.35 });
    L8.lift(tl, splitA, tWhich - 0.1, { dur: 0.2 }); L8.lift(tl, splitB, tWhich - 0.1, { dur: 0.2 });
    ravi.expr(tl, cue("s07a", "@interest"), "puzzled");
    // ---- "Which things changed?" — two slots, 2.0 s, then a third slot squeezes in on "Three of them!"
    m.expr(tl, cue("s07a", "@which"), "thinking");
    const slots = dev.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [{ label: "Ravi Mama", delta: -3000, side: "L" }, { label: "Interest", delta: 300, side: "L" }] });
    L8.flashRing(svg, tl, slots.tDing, [130 - 80, 560, 130 + 80, 706]);
    L8.flashRing(svg, tl, slots.tDing + 0.05, [420 - 100, GY - 260, 420 + 100, GY + 6]);
    S.check.tick(tl, slots.tDing + 0.2, 0);
    const tSq = cue("s07b", "@three") + 0.15, ex = L8.extraSlot(svg, 1420, 190, { label: "Cash", delta: -3300, side: "R" });
    tl.to(slots[0], { x: -190, duration: 0.35, ease: "power2.inOut" }, tSq); tl.to(slots[1], { x: -190, duration: 0.35, ease: "power2.inOut" }, tSq);
    L8.drop(tl, ex.slot, tSq + 0.2, { dur: 0.3 }); L8.drop(tl, ex.chip, tSq + 0.55, { dur: 0.3 });
    L8.flashRing(svg, tl, tSq + 0.6, [1480 - 100, GY - 150, 1480 + 100, GY + 6]);
    // ---- b: Khata writes the compound entry
    const tL = cue("s07b", "@loan", 2);
    S.date(tL - 0.5, 0, "Apr 30", 0.5);
    S.acct(tL, 0, "Loan from Ravi Mama A/c", { dur: 1.0 });
    const t3 = cue("s07b", "@three", 2);
    S.drMark(t3 - 0.5, 0); S.amt(t3, 0, "dr", 3000, 0.6);
    S.hud.tilt(tl, t3 + 0.6, 5, { dur: 0.7 }); S.hud.setTotals(tl, t3 + 0.6, 3000, undefined, { dur: 0.6 }); jarInt.enter(tl, t3 + 0.6);
    S.tag(t3 + 1.0, 0, "personal_receiver", "dr", { light: false }); S.check.tick(tl, t3 + 1.2, 1);
    const tI = cue("s07b", "@interest", 2);
    S.acct(tI, 1, "Interest A/c"); S.drMark(tI + 0.8, 1);
    const t300 = cue("s07b", "@three", 3);
    S.amt(t300, 1, "dr", 300, 0.5); S.hud.setTotals(tl, t300 + 0.4, 3300, undefined, { dur: 0.5 });
    S.tag(t300 + 0.9, 1, "nominal_expense", "dr", { light: false });
    const tTo = cue("s07b", "@to");
    S.acct(tTo - 0.1, 2, "To  Cash A/c", { to: true });
    const t33 = cue("s07b", "@three", 4);
    S.amt(t33, 2, "cr", 3300, 0.7); jarCash.enter(tl, t33 + 0.6); S.hud.settle(tl, t33 + 0.7, { dur: 0.8, hold: 1.5 }); S.hud.setTotals(tl, t33 + 0.7, undefined, 3300, { dur: 0.6 });
    S.tag(t33 + 1.0, 2, "real_out", "cr", { light: false }); S.check.tick(tl, t33 + 1.2, 2);
    // "Two debits, one credit." — the two blue rows flash, then the orange one
    jc.highlightRow(tl, cue("s07b", "@two"), 0, { hold: 0.5 }); jc.highlightRow(tl, cue("s07b", "@two") + 0.15, 1, { hold: 0.5 }); jc.highlightRow(tl, cue("s07b", "@one"), 2, { hold: 0.6 });
    // "compound entry" — the brace + chip
    L8.drop(tl, brace, cue("s07b", "@compound") - 0.1, { dur: 0.35 });
    S.narr(cue("s07b", "@line") - 0.3, 3, "percent", "Loan + interest");
    // "the two sides still match" — a rule under both money columns; both totals count up together
    L8.drop(tl, rule, cue("s07b", "@sides") - 0.1, { dur: 0.3 });
    const tM = cue("s07b", "@match");
    tkTotDr.enter(tl, tM, { dur: 0.2 }); tkTotCr.enter(tl, tM, { dur: 0.2 }); tkTotDr.to(tl, tM, 3300, 0.9); tkTotCr.to(tl, tM, 3300, 0.9);
    S.pencil.hide(tl, tM);
    L8.flashRing(svg, tl, tM + 1.0, L8.P(JX.drR - 205, y4 - 30).concat(L8.P(JX.crR + 25, y4 + 36)), 1.0);
    S.hud.pulseTotal(tl, tM + 1.0, "both");
    // ---- c: the misconception — curved wipe to coral; the whole payment into the Interest jar; ✗; the correction
    const tSlip = cue("s07c", "@slip"), tExp = cue("s07c", "@expense");
    const tClr = cue("s07b", "@to") + 0.4; dev.clear(tl, tClr); L8.lift(tl, ex.slot, tClr, { dur: 0.2 }); L8.lift(tl, ex.chip, tClr, { dur: 0.2 });
    S.wipe.run(tl, tSlip - 0.3, 1.0);
    const goneT = tSlip + 0.1;
    [S.cardPos, S.hud.g, S.check.g, gN, jInt.g, S.khata ? null : null].forEach((n) => n && tl.to(n, { autoAlpha: 0, duration: 0.35 }, goneT));
    S.pencil.hide(tl, goneT);
    ravi.expr(tl, tSlip, "worried"); m.expr(tl, tSlip, "thinking");
    imag.enter(tl, cue("s07c", "@payment") - 0.2);
    L8.drop(tl, gauge, cue("s07c", "@payment") + 0.1, { dur: 0.3 }); L8.drop(tl, gLab, cue("s07c", "@payment") + 0.1, { dur: 0.3 });
    // all six notes drop into the jar (bubble coords), the jar fills, its amount counts to ₹3,300
    const BX = 1190, BY = 450;
    const tAll = tExp - 0.1;
    notes.forEach(([big], i) => L8.fly(imag.area.g, tl, tAll + i * 0.1, [-60 + i * 40, -190], [80, 90], mkNote(big), { dur: 0.7, k: 0.6, arc: 20 }));
    jarBub.fill(tl, tAll + 0.9, 1.0); jarBub.tick(tl, tAll + 0.9, 0, 3300, 0.7);
    // "Nope." — the ✗ stamp (Khata stamps)
    const tNope = cue("s07d", "@nope");
    const st = K.stamp(tl, svg, BX, BY + 40, tNope, 1.7);
    // "Only the ₹300 interest is an expense." — the ₹1,000 notes lift out and fly back onto Ravi Mama's tag
    const tBack = cue("s07d", "@thousand") - 0.3;
    st.lift(tl, tBack - 0.5);
    jarBub.fill(tl, tBack - 0.3, 0.3); jarBub.tick(tl, tBack - 0.3, 3300, 300, 0.6);
    [0, 1, 2].forEach((i) => L8.fly(svg, tl, tBack + i * 0.15, [BX + 80, BY + 200], [140, 640], mkNote(true), { dur: 1.1, k: 0.6, arc: 160 }));
    rTag.tick(tl, tBack + 1.2 + 0.1, 30000, 27000, 0.9); rTag.light(tl, tBack + 1.3, { hold: 0.8 });
    ravi.expr(tl, tBack + 1.2, "happy");
    // "It shrinks her debt — not her profit." — the gauge stays dead still
    K.pulseNode(tl, rTag.body, cue("s07d", "@shrinks"), 1.06);
    m.expr(tl, cue("s07d", "@profit"), "happy");
    // Ravi's tag was dropped for phase 1 only if we hid it: keep it visible (it IS the correction target)
    L8.allow(svg);
  };
})();

// s09 — Warm-up → worked → faded → solo (T7, T9, T10). The practice board: Khata open centre-right, a shelf of jars (left) and tags (right) above it,
// Meera at left, the little scale HUD top-left (tips on the first line of each pair, settles on the second).
//   Warm-up (s09w): four single-account chips (Loan from Ravi Mama ↑ · Rent ↑ · Sales ↑ · Infotech ↓), one at a time over the spine; each slides to its page on
//        the answer word (Cr · Dr · Cr · Cr — the receivable DECREASE is the one learners miss), then they all lift off before the full entries.
//   T7 (worked, Khata): ₹18,000 cash sales — "which two things changed?" → Dr Cash, Cr Sales.
//   T9 (faded, Meera): Infotech's ₹6,000 chai tab — the SIDE is blank: she pushes the coin toward the RIGHT page, Khata raises a hand and the
//        coin stops at the spine (gentle correction, bwomp_no); 2.4 s of dead stillness; "No." → Infotech is an ASSET → LEFT.
//   T10 (solo, you): Meera pays Gopal Dairy ₹5,000 — a 3.2 s countdown ring, then Dr Gopal Dairy, Cr Cash.
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    const KX = 1130, KY = 1048, KS = 1.0;
    L6.stage(K, svg, C.teal, 880);
    // ---- the book + the HUD scale + Meera
    const k = K.khataRig(svg, KX, KY, KS, { open: true, expr: "awake" });
    gsap.set(k.tints.L, { opacity: 0.28 }); gsap.set(k.tints.R, { opacity: 0.28 });
    const hud = K.scaleRig(svg, 235, 400, 0.34, { tint: true, totals: false });
    const m = K.meera(svg, 330, 1046, 0.72, { expr: "happy" });
    // ---- the shelf: jars (left) and tags (right)
    const plank = L6.node(K, svg, 1080, 666); K.paper(plank, K.cutRect(-480, -11, 960, 22, 1.4, 30), C.wood); L6.hide(plank);
    const jCash = K.jarRig(svg, 690, 658, 0.85, { label: "Cash", contents: "coins", fill: 0.7, hidden: true });
    const jInf = K.jarRig(svg, 840, 658, 0.85, { label: "Infotech", contents: "coins", fill: 0, hidden: true });
    const tGop = K.claimTag(svg, 1340, 658, 0.7, { face: "gopal", size: 40, hidden: true });
    const sales = L6.hide(L6.node(K, svg, 1490, 616)); L6.chip(K, sales, "Sales", { size: 48, bg: C.cr, h: 68 });
    L6.allow(jCash.g); L6.allow(jInf.g);
    // ---- warm-up chips (one account at a time): paper chip + direction arrow; a coloured strip fades in when it lands on its page
    const WC = [
      ["Loan from Ravi Mama", "up", "R", 0, "@ravi", "@credit", 1],
      ["Rent", "up", "L", 0, "@rent", "@debit", 1],
      ["Sales", "up", "R", 1, "@sale", "@credit", 2],
      ["Infotech", "down", "R", 2, "@infotech", "@credit", 3],
    ].map(([label, dir, side, row, aAppear, aAns, nth]) => {
      const r = L6.rig(K, svg, KX, 440); L6.hide(r.inner);
      const tw = K.textW(label, 34), w = tw + 84, h = 66, col = side === "L" ? C.dr : C.cr;
      K.paper(K.shadow(r.inner, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.6, 20), C.cream);
      const strip = K.g(r.inner, { opacity: 0 }); K.paper(strip, K.cutRect(-w / 2 + 8, h / 2 - 10, w - 16, 6, 0.5, 12), col);
      K.text(r.inner, -w / 2 + 22, 3, label, { size: 34, weight: 800, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
      L6.arrow(K, r.inner, w / 2 - 32, 0, dir, side === "L" ? C.drText : C.crText, 36, 13);
      return { r, strip, side, row, aAppear, aAns, nth, land: Math.min(0.85, 322 / w) };
    });
    // ---- slips on the rail
    const slipA = L6.slip(K, svg, 640, 300, { icon: "coffee", amount: 18000 }); L6.hide(slipA.inner);
    const slipB = L6.slip(K, svg, 640, 300, { face: "infotech", amount: 6000 }); L6.hide(slipB.inner);
    const slipC = L6.slip(K, svg, 640, 300, { face: "gopal", amount: 5000 }); L6.hide(slipC.inner);
    // ---- Infotech's coin (hovers, gets stopped at the spine) + ?
    const pill = L6.rig(K, svg, 1020, 612); L6.hide(pill.inner);
    K.tex(K.shadow(pill.inner, 2), K.cutRect(-112, -38, 224, 76, 2, 20), "pat-paper");
    K.paper(pill.inner, K.cutRect(-100, 28, 200, 6, 0.5, 12), C.dr);
    K.tex(K.shadow(pill.inner, 1), K.cutEll(-64, 0, 31, 31, 0.8), "pat-paper"); K.faceArt(K.g(pill.inner, { transform: "translate(-64 0)" }), "infotech", 27);
    K.text(pill.inner, 20, 2, "₹6,000", { size: 42, weight: 800, color: C.drText }).setAttribute("data-layout-allow-overlap", "true");
    const q = L6.hide(L6.node(K, svg, 1180, 560)); K.qmark(q, 0, 0, 1.0, C.coral);
    // ---- the countdown medallion (solo)
    const pm = K.pauseMedallion(svg, KX, 400, 0.7, { hidden: true });
    const cal = L6.cal(K, svg, 15);
    const w2 = K.whichTwo(svg, { veil: true, x: KX, y: 176 });

    const rowAt = (side, i) => L6.rowAt(KX, KY, KS, side, i);
    const [cjx] = [690], pk = { cash: [690, 580], inf: [840, 580], gop: [1340, 580], sales: [1490, 610] };

    // ======================================================================================= timeline
    k.blink(tl, T0 + 3).blink(tl, T0 + 30).blink(tl, T0 + 55); m.blinks(tl, T0 + 1.2, sc.end, 3.7);
    // ---- the board arrives: "Let's practise. Khata goes first."
    const tLet = cue("s09w", "@practise");
    K.dropIn(tl, plank, tLet - 0.2, { dur: 0.3 }); hud.enter(tl, tLet);
    jCash.enter(tl, tLet + 0.1); jInf.enter(tl, tLet + 0.25); tGop.enter(tl, tLet + 0.4); K.dropIn(tl, sales, tLet + 0.55, { dur: 0.3 });
    m.expr(tl, tLet, "happy").look(tl, tLet, 6, 0);
    k.expr(tl, cue("s09a", "@khata"), "happy"); k.arm(tl, cue("s09a", "@khata") - 0.1, "L", 80, 0.25); k.arm(tl, cue("s09a", "@khata") + 0.8, "L", 20, 0.3);
    // ---- warm-up (s09w): each chip drops in as its account is named, waits through the thinking pause, slides to its page on the answer
    WC.forEach((c, i) => {
      const tA = cue("s09w", c.aAppear), tB = cue("s09w", c.aAns, c.nth), [tx, ty] = rowAt(c.side, c.row);
      K.dropIn(tl, c.r.inner, tA - 0.05, { dur: 0.34 });
      L6.mv(tl, c.r, tB, 0.65, { x: tx - KX, y: ty - 440 }, "power2.inOut");
      L6.mv(tl, c.r, tB, 0.65, { scale: c.land }, "power2.inOut");
      tl.to(c.strip, { opacity: 1, duration: 0.2 }, tB + 0.55);
      K.liftOff(tl, c.r.inner, segStart("s09a") - 0.2, { dur: 0.25 });
    });
    K.pulseNode(tl, WC[3].r.sc, cue("s09w", "@shrinks") - 0.3, 1.06);
    m.expr(tl, cue("s09w", "@careful"), "thinking").look(tl, cue("s09w", "@careful"), 4, -3);
    m.expr(tl, cue("s09w", "@asset"), "happy").look(tl, cue("s09w", "@asset"), 6, 0);
    // ---- T7 worked: slip, device, Dr Cash / Cr Sales
    K.dropIn(tl, slipA.inner, cue("s09a", "@half") - 0.2, { dur: 0.4 });
    const tCashW = cue("s09b", "@cash"), tSalesW = cue("s09b", "@sales");
    w2.run(tl, cue("s09a", "@which"), { slots: 2, gap: 2.0, fill: [
      { label: "Cash", delta: 18000, side: "L", at: tCashW },
      { label: "Sales", delta: 18000, side: "R", at: tSalesW },
    ] });
    jCash.light(tl, tCashW + 0.05, { color: C.dr, hold: 1.0 });
    L6.ringOn(K, tl, sales, tSalesW + 0.05, 1.0, 150, 70);
    w2.clear(tl, tSalesW + 1.2);
    const tDeb = cue("s09b", "@debit"), tCre = cue("s09b", "@credit");
    L6.flyChip(K, tl, svg, tDeb + 0.05, 0.7, pk.cash, rowAt("L", 0), "₹18,000", { color: C.drText });
    const r1 = L6.row(K, k, "L", 0, "Cash", 18000); L6.hide(r1); K.dropIn(tl, r1, tDeb + 0.75, { dur: 0.3 });
    hud.tilt(tl, tDeb + 0.1, 2.2, { dur: 0.7 });
    L6.flyChip(K, tl, svg, tCre + 0.05, 0.7, pk.sales, rowAt("R", 0), "₹18,000", { color: C.crText });
    const r2 = L6.row(K, k, "R", 0, "Sales", 18000); L6.hide(r2); K.dropIn(tl, r2, tCre + 0.75, { dur: 0.3 });
    hud.settle(tl, tCre + 0.7, { dur: 0.9, hold: 1.0 });
    K.pulseNode(tl, r1, cue("s09b", "@left"), 1.08); K.pulseNode(tl, r2, cue("s09b", "@equals") + 0.15, 1.08);
    // ---- T9 faded: Infotech's ₹6,000, pay later
    const tMeera = cue("s09c", "@meera's");
    K.liftOff(tl, slipA.inner, tMeera - 0.1, { dur: 0.25 });
    cal.tickTo(tl, tMeera + 0.3, 16);
    m.expr(tl, tMeera, "happy").arm(tl, tMeera + 0.2, "R", 100, 20, 0.25);
    K.dropIn(tl, slipB.inner, cue("s09c", "@infotech's") + 0.1, { dur: 0.4 });
    m.arm(tl, cue("s09c", "@later") + 0.3, "R", 12, 8, 0.3);
    // "so credit Sales, six thousand" — the right page first (the known line); HUD dips right
    const tCreS = cue("s09c", "@credit");
    L6.flyChip(K, tl, svg, tCreS + 0.05, 0.7, pk.sales, rowAt("R", 1), "₹6,000", { color: C.crText });
    const r3 = L6.row(K, k, "R", 1, "Sales", 6000); L6.hide(r3); K.dropIn(tl, r3, tCreS + 0.75, { dur: 0.3 });
    hud.tilt(tl, tCreS + 0.1, -2.2, { dur: 0.7 });
    // "Now Infotech. They owe the stall." — the coin hovers over the shelf gap with a ?: the SIDE is the blank
    const tNowI = cue("s09c", "@infotech");
    K.dropIn(tl, pill.inner, tNowI - 0.1, { dur: 0.34 }); K.dropIn(tl, q, tNowI + 0.3, { dur: 0.3 });
    m.expr(tl, tNowI, "thinking").look(tl, tNowI, 4, -3);
    // "Meera slides it toward the right page." — she pushes it right; Khata raises a hand and the coin STOPS at the spine
    const tSl = cue("s09c", "@slides");
    m.arm(tl, tSl - 0.1, "R", 85, 25, 0.25);
    tl.to(pill.pos, { x: 110, duration: 0.95, ease: "power2.out" }, tSl + 0.1);
    K.liftOff(tl, q, tSl, { dur: 0.15 });
    const tStop = tSl + 0.9;
    k.arm(tl, tStop - 0.35, "R", 125, 0.25); k.arm(tl, tStop + 0.1, "L", 125, 0.25);
    k.expr(tl, tStop - 0.1, "wow"); m.expr(tl, tStop, "worried").look(tl, tStop, 6, -4);
    // "Owing money, that was Gopal's side. Wasn't it?" — Gopal's tag glows faintly; everything else dead still through the 2.4 s gap
    tGop.light(tl, cue("s09c", "@gopal's"), { color: C.cr, hold: 1.5 });
    m.expr(tl, cue("s09c", "@wasn't"), "thinking");
    // ---- the correction: "No. Gopal is owed by the stall. Infotech owes the stall. An asset…"
    const tNo = segStart("s09d");
    m.arm(tl, tNo + 0.3, "R", 12, 8, 0.3);
    k.expr(tl, tNo, "happy"); k.arm(tl, tNo + 0.3, "R", 20, 0.3); k.arm(tl, tNo + 0.3, "L", 20, 0.3);
    tGop.light(tl, cue("s09d", "@gopal"), { color: C.cr, hold: 1.2 });
    jInf.light(tl, cue("s09d", "@infotech"), { color: C.dr, hold: 1.5 });
    K.pulseNode(tl, jInf.body, cue("s09d", "@owes"), 1.08);
    const tLeft = cue("s09d", "@left"), tDebI = cue("s09d", "@debit");
    jInf.fill(tl, cue("s09d", "@grew") , 0.5);
    const r4 = L6.row(K, k, "L", 1, "Infotech", 6000); L6.hide(r4);
    tl.to(pill.pos, { x: rowAt("L", 1)[0] - 1020, duration: 0.7, ease: "power2.inOut" }, tDebI);
    tl.to(pill.pos, { y: rowAt("L", 1)[1] - 612, duration: 0.7, ease: "power2.inOut" }, tDebI);
    tl.set(pill.inner, { opacity: 0 }, tDebI + 0.72);
    K.dropIn(tl, r4, tDebI + 0.72, { dur: 0.3 });
    hud.settle(tl, tDebI + 0.7, { dur: 0.9, hold: 1.0 });
    m.expr(tl, tDebI, "happy").look(tl, tDebI, 0, 0);
    // ---- T10 solo: Meera pays Gopal Dairy ₹5,000 — countdown, then reveal
    const tNow = cue("s09e", "@now");
    K.liftOff(tl, slipB.inner, tNow - 0.1, { dur: 0.25 });
    cal.tickTo(tl, tNow + 0.2, 20);
    K.dropIn(tl, slipC.inner, cue("s09e", "@gopal") + 0.1, { dur: 0.4 });
    m.expr(tl, cue("s09e", "@just"), "happy");
    const tDebW = cue("s09e", "@debit"), tCrW = cue("s09e", "@credit");
    pm.enter(tl, tDebW - 0.1);
    m.expr(tl, tCrW, "thinking").look(tl, tCrW, 4, -3);
    pm.countdown(tl, segEnd("s09e") + 0.05, { dur: 3.2 });
    // reveal
    const tR = segStart("s09f");
    K.liftOff(tl, pm.body, tR - 0.05, { dur: 0.2 });
    m.expr(tl, tR, "happy");
    const tDG = cue("s09f", "@debit"), tCC = cue("s09f", "@credit");
    L6.flyChip(K, tl, svg, tDG + 0.05, 0.7, pk.gop, rowAt("L", 2), "₹5,000", { color: C.drText });
    const r5 = L6.row(K, k, "L", 2, "Gopal Dairy", 5000); L6.hide(r5); K.dropIn(tl, r5, tDG + 0.75, { dur: 0.3 });
    tGop.light(tl, tDG, { color: C.dr, hold: 0.9 });
    L6.flyChip(K, tl, svg, tCC + 0.05, 0.7, pk.cash, rowAt("R", 2), "₹5,000", { color: C.crText });
    const r6 = L6.row(K, k, "R", 2, "Cash", 5000); L6.hide(r6); K.dropIn(tl, r6, tCC + 0.75, { dur: 0.3 });
    jCash.fill(tl, cue("s09f", "@five") + 0.2, 0.55);
    hud.tilt(tl, cue("s09f", "@liability") + 0.1, 1.2, { dur: 0.5 }); hud.settle(tl, tCC + 0.5, { dur: 0.7, hold: 1.0 });
    L6.allow(w2.g);
  };
})();

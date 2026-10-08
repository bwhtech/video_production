// s02 — Last time (L8's Your Turn answers). Three questions, one picture stage each (number badges top-left):
//   1 · Ravi Mama's ₹3,300 bundle splits: ₹3,000 → his tag (30,000 → 27,000), ₹300 → the Interest jar
//   2 · Infotech's UPI ₹4,000 → the answer writes onto a JournalCard with golden-rule tags
//   3 · Drawings: purse ₹3,000 beside the Expense jar → ✗ stamp → the Equity card opens, a −₹3,000 slip drops into the dashed Drawings pocket
// In: s01t pushes into a page showing #s02-first at 1/3 scale (identity camera). Initial hidden states are DOM attributes.
(function () {
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    window.OWN_SEAM_IN.s02 = true;
    const world = K.g(svg, { id: "s02-first" });
    L9.stage(world, C.teal, 880);
    const cal = L9.cal(world, 30);

    // ---- number badges
    const badges = [0, 1, 2].map((i) => {
      const n = L9.node(world, 110 + i * 104, 190); L9.hide(n);
      K.paper(K.shadow(n, 1), K.cutEll(0, 0, 40, 40, 1), C.saffron);
      K.text(n, 0, 3, String(i + 1), { size: 48, weight: 800 });
      return n;
    });

    // ================================================================ stage 1 — Ravi Mama's bundle
    const s1 = [];
    const tag1 = K.claimTag(world, 500, 700, 1.8, { face: "ravi", amount: 30000, hidden: true }); s1.push(tag1);
    const bundleN = L9.node(world, 960, 500); L9.hide(bundleN); K.bundle(bundleN, 0, 0, 2.7, 0); s1.push(bundleN);
    const bAmt = K.ticker(world, 960, 700, 1, { value: 0, size: 84, chip: true, w: 420, h: 130, edge: C.dr, hidden: true }); s1.push(bAmt);
    const jarI = K.jarRig(world, 1420, 700, 1.9, { label: "Interest", icon: "percent", contents: "coins", fill: 0, hidden: true }); s1.push(jarI);
    const sl1 = L9.chip(world, 960, 500, "₹3,000", { size: 60, w: 300 });
    const sl2 = L9.chip(world, 960, 500, "₹300", { size: 60, w: 230 });

    // ================================================================ stage 2 — Infotech pays by UPI
    const s2 = [];
    const phoneN = L9.node(world, 620, 400); L9.hide(phoneN);
    const phone = K.phone(phoneN, 0, 0, 1.25, { screen: "upi" }); s2.push(phoneN);
    const tag2 = K.claimTag(world, 1080, 700, 1.8, { face: "infotech", hidden: true }); s2.push(tag2);
    const dtile = K.dateTile(world, 1470, 450, 2.3, { month: "Apr", day: 25, hidden: true }); s2.push(dtile);
    const jc = K.journalCard(world, 960, 1050, 1, { rows: 3, hidden: true });

    // ================================================================ stage 3 — drawings
    const s3 = [];
    const purseN = L9.node(world, 560, 440); L9.hide(purseN); K.medallion(purseN, 0, 0, 150, "wallet"); s3.push(purseN);
    const pAmt = K.ticker(world, 560, 700, 1, { value: 0, size: 84, chip: true, w: 420, h: 130, edge: C.coral, hidden: true }); s3.push(pAmt);
    const jarE = K.jarRig(world, 1150, 700, 1.9, { label: "Expense", icon: "receipt", contents: "coins", fill: 0.3, hidden: true }); s3.push(jarE);
    const qN = L9.node(world, 1500, 440); L9.hide(qN); K.qmark(qN, 0, 0, 2.8, C.dr); s3.push(qN);
    const eq = K.equityCard(world, 960, 700, 1.3, { pockets: 3, capital: 50000, hidden: true });
    L9.allow(world);

    // ======================================================================================= timeline
    const showBadge = (i, t) => {
      badges.forEach((b, k) => {
        if (k === i) { if (i === 0) L9.drop(tl, b, t, { dur: 0.3 }); else tl.to(b, { opacity: 1, duration: 0.2 }, t); tl.to(b, { scale: 1.2, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t); }
        else if (k < i) tl.to(b, { scale: 1, opacity: 0.6, svgOrigin: O, duration: 0.3 }, t);
      });
    };
    const liftAll = (arr, t) => arr.forEach((n, i) => (n.exit ? n.exit(tl, t + i * 0.03, { dur: 0.2 }) : L9.lift(tl, n, t + i * 0.03, { dur: 0.2 })));

    // ------------------------------------------------ 1
    showBadge(0, cue("s02a", "@first") - 0.05);
    const tRavi = cue("s02a", "@ravi");
    tag1.enter(tl, tRavi - 0.1);
    const tB = cue("s02a", "@three");
    L9.drop(tl, bundleN, tB - 0.3, { dur: 0.35 });
    bAmt.enter(tl, tB - 0.1); bAmt.to(tl, tB, 3300, 0.9);
    // s02b — the bundle splits
    const t3 = cue("s02b", "@three"), t3b = cue("s02b", "@three", 2);
    L9.drop(tl, sl1.n, t3 - 0.25, { dur: 0.25 });
    tl.to(sl1.n, { x: -460, duration: 0.8, ease: "power2.inOut" }, t3);
    tl.to(sl1.n, { y: -90, duration: 0.4, ease: "power2.out" }, t3); tl.to(sl1.n, { y: 120, duration: 0.4, ease: "power2.in" }, t3 + 0.4);
    bAmt.to(tl, t3 + 0.2, 300, 0.6);
    L9.lift(tl, sl1.n, t3 + 0.82, { dur: 0.15 });
    tag1.tick(tl, t3 + 0.85, 30000, 27000, 0.7); tag1.pulse(tl, t3 + 0.85);
    jarI.enter(tl, cue("s02b", "@loan") + 0.3);
    L9.drop(tl, sl2.n, t3b - 0.25, { dur: 0.25 });
    tl.to(sl2.n, { x: 460, duration: 0.8, ease: "power2.inOut" }, t3b);
    tl.to(sl2.n, { y: -90, duration: 0.4, ease: "power2.out" }, t3b); tl.to(sl2.n, { y: 80, duration: 0.4, ease: "power2.in" }, t3b + 0.4);
    L9.lift(tl, sl2.n, t3b + 0.82, { dur: 0.15 });
    bAmt.to(tl, t3b + 0.2, 0, 0.5);
    jarI.fill(tl, t3b + 0.85, 0.5); jarI.light(tl, t3b + 0.9, { hold: 1.0 });
    tl.to(bundleN, { autoAlpha: 0, duration: 0.2 }, t3b + 0.8); 

    // ------------------------------------------------ 2
    const t2 = cue("s02c", "@two");
    liftAll(s1, t2 - 0.3);
    showBadge(1, t2 - 0.1);
    const tInf = cue("s02c", "@infotech");
    tag2.enter(tl, tInf - 0.1);
    L9.drop(tl, phoneN, tInf - 0.15, { dur: 0.35 });
    const tFour = cue("s02c", "@four");
    phone.show(tl, tFour - 0.1, { type: "upi", kind: "RECEIVED", amount: "₹4,000", from: "Infotech" });
    dtile.enter(tl, tFour);
    const tEnt = cue("s02c", "@entry");
    jc.enter(tl, tEnt - 0.2); jc.head(tl, tEnt, "all");
    // s02d — the answer writes on
    const tBank = cue("s02d", "@bank"), tTo = cue("s02d", "@to");
    const l1 = jc.writeRow(tl, tBank - 0.1, { date: "Apr 25", account: "Bank", dr: 4000, tag: "personal_receiver" });
    const l2 = jc.writeRow(tl, tTo - 0.1, { account: "Infotech", cr: 4000, tag: "personal_giver" });
    const nar = jc.narration(tl, Math.max(l2.tEnd, cue("s02d", "@came")) - 0.1, { icon: "smartphone", text: "UPI" });
    jc.highlightRow(tl, cue("s02d", "@owes"), l2, { hold: 1.0 });

    // ------------------------------------------------ 3
    const t3q = cue("s02e", "@three");
    liftAll(s2.concat([jc]), t3q - 0.3);
    showBadge(2, t3q - 0.1);
    const tDr = cue("s02e", "@drawings");
    L9.drop(tl, purseN, tDr - 0.35, { dur: 0.35 });
    pAmt.enter(tl, tDr - 0.2); pAmt.to(tl, tDr - 0.1, 3000, 0.7);
    jarE.enter(tl, tDr + 0.3);
    L9.drop(tl, qN, tDr + 0.7, { dur: 0.3 });
    // s02f — ✗ stamp, then the Equity card
    const tNo = cue("s02f", "@no");
    const st = K.stamp(tl, world, 1150, 470, tNo, 2.2);
    const tOwn = cue("s02f", "@owner");
    liftAll(s3, tOwn + 0.1); st.lift(tl, tOwn + 0.1);
    eq.enter(tl, tOwn + 0.15); eq.unfold(tl, tOwn + 0.55);
    const tOut = cue("s02f", "@out");
    eq.slip(tl, tOut, "Drawings", -3000, { icon: "wallet", from: [0, -280] });
    eq.light(tl, cue("s02f", "@shrink") + 0.2, "Drawings", { hold: 1.2 });
  };
})();

// s05 — Liabilities (T5). The cart slip flips over: its back is Gopal Dairy's ₹8,000 delivery slip (Apr 3). A milk crate lands on the
// LEFT pan, Stock grows → `Stock 8,000` on the left page. Then "And Gopal?": his IOU hovers dead still over the spine (1.6 s), and on
// "Credit." it slides RIGHT and lands as orange `Gopal Dairy 8,000`; his tag grows a step. Liabilities live on the right.
// Also hosts L6.afterT3 — the board as T3 left it (shared with s06 / s07).
(function () {
  // the board after T1 + T3: jars on the left pan, tags on the right, pins, rule card, four ledger lines
  L6.afterT3 = (K, B, o = {}) => {
    const C = K.C, { rig } = B;
    const n = o.leftJars || 3;
    const jars = {};
    const names = o.leftJars === 2
      ? [["cash", { label: "Cash", contents: "coins", fill: 0.3 }]]
      : [["cash", { label: "Cash", contents: "coins", fill: 0.3 }], ["equip", { label: "Equipment", contents: "cart" }], ["stock", { label: "Stock", contents: "leaves", fill: o.stockFill ?? 0.6 }]];
    names.forEach(([key, op], i) => { jars[key] = B.jar(i, o.leftJars === 2 ? 2 : 3, { ...op, hidden: false }); });
    const tags = {};
    const rt = o.rightTags === 2 ? [["gopal", "gopal"], ["cap", "meera"]] : [["ravi", "ravi"], ["gopal", "gopal"], ["cap", "meera"]];
    rt.forEach(([key, face], i) => { tags[key] = B.tag(i, rt.length, { face, hidden: false }); });
    const pinL = L6.pin(K, rig.pans.L.g, -196, -26, "L", 60), pinR = L6.pin(K, rig.pans.R.g, 196, -26, "R", 60);
    const rows = {
      cashL: B.row("L", 0, "Cash", 50000), equipL: B.row("L", 1, "Equipment", 36000),
      capR: B.row("R", 0, "Capital", 50000), cashR: B.row("R", 1, "Cash", 36000),
    };
    return { jars, tags, pinL, pinR, rows };
  };

  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L6.stage(K, svg, C.teal, 880);
    const B = L6.board(K, svg, { tint: 0.28 });
    const { k, rig } = B;
    const S = L6.afterT3(K, B, {});
    const rule = L6.ruleCard(K, svg, 230, 600);
    // the slip: cart (front) ↔ Gopal's delivery (back); flips on the first beat
    const slipCart = L6.slip(K, svg, 300, 200, { icon: "shopping-cart", amount: 36000 });
    const slipMilk = L6.slip(K, svg, 300, 200, { icon: "milk", amount: 8000 }); L6.hide(slipMilk.inner);
    const cal = L6.cal(K, svg, 2);
    // milk crate (with the Gopal Dairy milk medallion) that lands on the left pan
    const [lpx, lpy] = L6.panXY("L");
    const crate = L6.rig(K, svg, lpx + 118 * SS_(), 120); L6.hide(crate.inner);
    K.crate(crate.inner, 0, 0, 150, 96);
    K.medallion(crate.inner, 0, -48, 36, "milk");
    // Gopal's IOU pill (hovers over the spine) + the question mark
    const [r2x, r2y] = L6.rowXY("R", 2);
    const iou = L6.rig(K, svg, 960, 662); L6.hide(iou.inner);
    K.tex(K.shadow(iou.inner, 2), K.cutRect(-112, -38, 224, 76, 2, 20), "pat-paper");
    K.paper(iou.inner, K.cutRect(-100, 28, 200, 6, 0.5, 12), C.cr);
    K.tex(K.shadow(iou.inner, 1), K.cutEll(-64, 0, 31, 31, 0.8), "pat-paper"); const iouFace = K.g(iou.inner, { transform: "translate(-64 0)" }); K.faceArt(iouFace, "gopal", 27);
    K.text(iou.inner, 20, 2, "₹8,000", { size: 42, weight: 800, color: C.crText }).setAttribute("data-layout-allow-overlap", "true");
    const q = L6.hide(L6.node(K, svg, 1118, 650)); K.qmark(q, 0, 0, 1.05, C.coral);

    // ======================================================================================= timeline
    k.blink(tl, T0 + 2.5).blink(tl, T0 + 12);
    // the slip flips: cart → Gopal's delivery
    const tFlip = segStart("s05a") + 0.3;
    tl.to(slipCart.sc, { scaleX: 0, svgOrigin: O, duration: 0.15, ease: "power1.in" }, tFlip);
    tl.set(slipCart.inner, { opacity: 0 }, tFlip + 0.15);
    tl.set(slipMilk.inner, { opacity: 1 }, tFlip + 0.15);
    tl.fromTo(slipMilk.sc, { scaleX: 0, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.15, ease: "power1.out", immediateRender: false }, tFlip + 0.15);
    cal.tickTo(tl, tFlip + 0.3, 3);
    // "sends eight thousand rupees of stock" — the crate drops onto the left pan, the Stock jar fills
    const tSends = cue("s05a", "@sends");
    tl.set(crate.pos, { x: 0, y: 0 }, 0);
    K.dropIn(tl, crate.inner, tSends - 0.1, { dur: 0.3 });
    tl.to(crate.pos, { y: lpy - 120 - 120, duration: 0.7, ease: "power2.in" }, tSends);
    tl.to(crate.inner, { opacity: 0, duration: 0.18 }, tSends + 0.7);
    S.jars.stock.fill(tl, tSends + 0.62, 1.0);
    rig.tilt(tl, tSends + 0.6, 1.8, { dur: 0.7 });
    // "Stock grows. Debit Stock." — the amount flies to the LEFT page
    const tDebit = cue("s05a", "@debit");
    const [sjx, sjy] = L6.panItemXY("L", 2, 3);
    L6.flyChip(K, tl, svg, tDebit + 0.05, 0.7, [sjx, sjy], L6.rowXY("L", 2), "₹8,000", { color: C.drText });
    const rowStock = B.row("L", 2, "Stock", 8000); L6.hide(rowStock);
    K.dropIn(tl, rowStock, tDebit + 0.75, { dur: 0.3 });
    // "And Gopal?" — the IOU hovers over the spine, dead still, with a ?
    const tAnd = cue("s05a", "@gopal", 2);
    K.dropIn(tl, iou.inner, tAnd - 0.1, { dur: 0.34 });
    K.dropIn(tl, q, tAnd + 0.5, { dur: 0.3 });
    k.look(tl, tAnd, 0, -7); k.expr(tl, cue("s05a", "@debit", 2), "wow");
    // "Credit." — it slides right and lands as orange `Gopal Dairy 8,000`
    const tCredit = segStart("s05b");
    K.liftOff(tl, q, tCredit - 0.05, { dur: 0.15 });
    k.look(tl, tCredit - 0.05, 9, 3); k.expr(tl, tCredit, "happy");
    tl.to(iou.pos, { x: r2x - 960, duration: 0.85, ease: "power2.inOut" }, tCredit + 0.05);
    tl.to(iou.pos, { y: -34, duration: 0.3, ease: "power2.out" }, tCredit + 0.05);
    tl.to(iou.pos, { y: r2y - 662, duration: 0.55, ease: "power2.in" }, tCredit + 0.35);
    tl.set(iou.inner, { opacity: 0 }, tCredit + 0.9);
    const rowGopal = B.row("R", 2, "Gopal Dairy", 8000); L6.hide(rowGopal);
    K.dropIn(tl, rowGopal, tCredit + 0.9, { dur: 0.3 });
    K.pulseNode(tl, S.tags.gopal.body, tCredit + 0.95, 1.2);                     // Gopal's tag grows a step
    K.pulseNode(tl, S.pinR, tCredit + 1.0, 1.12);                                 // the orange pin nods
    rig.settle(tl, tCredit + 0.95, { dur: 0.9, hold: 1.5 });
    k.look(tl, tCredit + 1.8, 0, 0);
    // "…and liabilities live on the right." — the right pan lifts once
    K.pulseNode(tl, rig.pans.R.tint, cue("s05b", "@right"), 1.06);
  };
  function SS_() { return 0.72; }
})();

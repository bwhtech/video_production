// s04 — Home sides. 4a: the scale lowers on a string onto open Khata (left pan over the left page, right pan over the right page);
// jars sit on the left pan, tags on the right; a map-pin lands on each pan (the home sides); the icon-only rule card; T1 (₹50,000) with
// "which two things changed?" → Cash lands LEFT, Capital lands RIGHT.   4b: T3 (the cart, ₹36,000): Equipment lands LEFT, but Cash
// SHRINKS → its coin crosses the spine to the RIGHT page. ≥ 1.5 s hold. `Dr = ↑ ?` gets a ✗.
//
// Also hosts the shared Lesson-6 board kit (L6.board / row / pin / ruleCard / slip / flyChip) used by s05–s09.
(function () {
  // -------------------------------------------------------------------------------------------- board geometry
  const SS = 0.72;                                              // the scale's size on the board
  const geo = () => { const KH = L6.KH; return { KH, SS, scx: KH.x, scy: KH.y - 392 * KH.s + 6 }; };
  L6.geo = geo;
  // absolute centre of a page row (side "L"/"R", row i)
  L6.rowXY = (side, i) => { const { KH } = geo(); return [KH.x + (side === "L" ? -253 : 253) * KH.s, KH.y + (-305 + 60 * i) * KH.s]; };
  // absolute centre of a row on ANY book (centre x, ground y, scale)
  L6.rowAt = (cx, cy, ks, side, i) => [cx + (side === "L" ? -253 : 253) * ks, cy + (-305 + 60 * i) * ks];
  // absolute top-centre of a pan (level)
  L6.panXY = (side) => { const g = geo(); return [g.scx + (side === "L" ? -1 : 1) * 380 * SS, g.scy - 270 * SS]; };
  const JS = [0, 0.9, 0.8, 0.66], JSTEP = [0, 0, 150, 118], TS = [0, 0.62, 0.55, 0.44], TSTEP = [0, 0, 140, 112];
  // absolute (x, y-mid) of slot i of n on the left pan (jars) / right pan (tags)
  L6.panItemXY = (side, i, n) => {
    const [px, py] = L6.panXY(side), step = (side === "L" ? JSTEP : TSTEP)[n];
    return [px + (i - (n - 1) / 2) * step * SS, py - (side === "L" ? 100 : 62) * SS];
  };

  // a ledger line on a Khata page: cream chip, coloured edge, name (left) + amount (right)
  L6.row = (K, k, side, i, name, amt, o = {}) => {
    const C = K.C, cx = side === "L" ? -167 : 167, cy = -305 + 60 * i;
    const n = L6.node(K, k.pageArea[side].g, cx, cy);
    const H = o.tall ? 78 : 54;
    K.tex(K.shadow(n, 1), K.cutRect(-152, -H / 2, 304, H, 1.4, 18), "pat-paper");
    K.paper(n, K.cutRect(-152, -H / 2, 10, H, 0.5, 14), side === "L" ? C.dr : C.cr);
    const amtTxt = o.sign ? K.fmtINR(amt, "", true) : K.fmtIN(amt);
    const x0 = o.icon || o.face ? -88 : -132;
    if (o.icon) K.icon(n, o.icon, -112, 0, 36, C.ink, 2.4);
    if (o.face) { const f = K.g(n, { transform: "translate(-110 0)" }); K.tex(f, K.cutEll(0, 0, 26, 26, 0.8), "pat-paper"); K.faceArt(f, o.face, 23); }
    const lsz = o.lsize || Math.min(27, Math.floor(150 / (name.length * 0.56)));
    const col = side === "L" ? C.drText : C.crText;
    K.text(n, x0, o.tall ? -18 : 2, name, { size: lsz, weight: 700, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
    K.text(n, 140, o.tall ? 14 : 2, amtTxt, { size: o.asize || 36, weight: 800, anchor: "end", color: col }).setAttribute("data-layout-allow-overlap", "true");
    return n;
  };

  // map-pin medallion (home side): blue left / orange right; drawn around (0,0) in a fresh node on `parent`
  L6.pin = (K, parent, x, y, side, r = 56) => {
    const n = L6.node(K, parent, x, y);
    K.medallion(n, 0, 0, r, "map-pin", side === "L" ? K.C.dr : K.C.cr);
    return n;
  };

  // the icon-only rule card: ↑ → home-side pins · ↓ → the other side (↔)
  L6.ruleCard = (K, parent, x, y) => {
    const C = K.C, n = L6.node(K, parent, x, y);
    K.tex(K.shadow(n, 2), K.cutRect(-190, -135, 380, 270, 2, 24), "pat-paper");
    const r1 = K.g(n, {}), r2 = K.g(n, {});
    L6.arrow(K, r1, -122, -52, "up", C.ink, 80, 26);
    K.medallion(r1, 0, -52, 40, "map-pin", C.dr); K.medallion(r1, 92, -52, 40, "map-pin", C.cr);
    L6.arrow(K, r2, -122, 62, "down", C.ink, 80, 26);
    L6.arrow(K, r2, 20, 62, "left", C.dr, 66, 22); L6.arrow(K, r2, 100, 62, "right", C.cr, 66, 22);
    K.ink(n, [[-190 + 30, 5], [190 - 30, 5]], 3, "#a39684", { opacity: 0.6 });
    return { n, r1, r2 };
  };

  // a transaction slip (picture + amount) that rides a rail; returns a rig (pos = rail slide, inner = drop)
  L6.slip = (K, parent, x, y, o) => {
    const C = K.C, r = L6.rig(K, parent, x, y), n = r.inner, w = 350, h = 118;
    K.tex(K.shadow(n, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 22), "pat-paper");
    K.paper(n, K.cutRect(-w / 2 + 12, h / 2 - 12, w - 24, 6, 0.5, 14), o.edge || C.dr);
    const art = K.g(n, { transform: `translate(${-w / 2 + 66} -2)` });
    if (o.face) { K.tex(K.shadow(art, 1), K.cutEll(0, 0, 50, 50, 1), "pat-paper"); K.faceArt(art, o.face, 42); }
    else K.medallion(art, 0, 0, 46, o.icon);
    r.tk = K.ticker(n, 64, 0, 1, { value: o.amount, size: 60 });
    r.tk.text.setAttribute("data-layout-allow-overlap", "true");
    return r;
  };

  // a small amount chip that flies from (x0,y0) to (x1,y1) (absolute) — arc, smooth; returns its rig; `then` swaps it for the real row
  L6.flyChip = (K, tl, parent, t, dur, from, to, text, o = {}) => {
    const C = K.C, r = L6.rig(K, parent, from[0], from[1]);
    L6.hide(r.inner);
    L6.chip(K, r.inner, text, { size: o.size || 40, bg: C.cream, color: o.color || C.ink, w: o.w || 190, h: o.h || 58 });
    tl.set(r.inner, { opacity: 1 }, t);
    const dx = to[0] - from[0], dy = to[1] - from[1], lift = o.lift ?? 90;
    tl.to(r.pos, { x: dx, duration: dur, ease: o.xEase || "power1.inOut" }, t);
    tl.to(r.pos, { y: Math.min(0, dy) - lift, duration: dur * 0.5, ease: "power2.out" }, t);
    tl.to(r.pos, { y: dy, duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5);
    tl.set(r.inner, { opacity: 0 }, t + dur);
    return r;
  };

  // The board: open Khata (centred) with the scale standing on its spine. Returns refs; scenes drive the timeline.
  L6.board = (K, parent, o = {}) => {
    const C = K.C, { KH, scx, scy } = geo();
    const k = K.khataRig(parent, KH.x, KH.y, KH.s, { open: true, expr: o.expr || "awake" });
    gsap.set(k.tints.L, { opacity: o.tint ?? 0.28 }); gsap.set(k.tints.R, { opacity: o.tint ?? 0.28 });
    const rig = K.scaleRig(parent, scx, scy, SS, { tint: true, totals: false });
    const jar = (i, n, op = {}) => K.jarRig(rig.pans.L.g, (i - (n - 1) / 2) * JSTEP[n], 0, JS[n], { edge: C.dr, hidden: true, ...op });
    const tag = (i, n, op = {}) => K.claimTag(rig.pans.R.g, (i - (n - 1) / 2) * TSTEP[n], 0, TS[n], { size: 54, hidden: true, ...op });
    return { k, rig, KH, scx, scy, jar, tag, row: (side, i, name, amt, op) => L6.row(K, k, side, i, name, amt, op) };
  };

  // =================================================================================================== scene s04
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start, KH = L6.KH;
    L6.stage(K, svg, C.teal, 880);
    const B = L6.board(K, svg, { tint: 0.28 });
    const { k, rig } = B;
    // the scale hangs on a string; it lowers onto Khata
    const strG = K.g(rig.g, {});
    K.ink(strG, [[B.scx, B.scy - 389 - 18], [B.scx, -900]], 4, C.goldDark);
    tl.set(rig.g, { y: -760 }, 0);

    // jars (left pan) + tags (right pan) — hidden until the VO names them
    const jCash = B.jar(0, 3, { label: "Cash", contents: "coins", fill: 0.6 });
    const jEquip = B.jar(1, 3, { label: "Equipment", contents: "cart" });
    const jStock = B.jar(2, 3, { label: "Stock", contents: "leaves", fill: 0.6 });
    const tRavi = B.tag(0, 3, { face: "ravi" }), tGopal = B.tag(1, 3, { face: "gopal" }), tCap = B.tag(2, 3, { face: "meera" });
    // home-side pins ride the pans
    const pinL = L6.hide(L6.pin(K, rig.pans.L.g, -196, -26, "L", 60)), pinR = L6.hide(L6.pin(K, rig.pans.R.g, 196, -26, "R", 60));
    // the Cash ticker chip (under the left pan) — appears when Cash starts to shrink
    const [lpx, lpy] = L6.panXY("L");
    const cashChip = K.ticker(svg, lpx - 4, lpy + 118, 1, { value: 80000, size: 56, chip: true, w: 280, h: 82, edge: C.dr, hidden: true });
    L6.allow(cashChip.g);
    // rule card (left zone), icon-only
    const rule = L6.ruleCard(K, svg, 230, 600); L6.hide(rule.n);
    // slips on the top rail (left zone)
    const slipT1 = L6.slip(K, svg, 300, 200, { face: "meera", amount: 50000 }); L6.hide(slipT1.inner);
    const slipCart = L6.slip(K, svg, 300, 200, { icon: "shopping-cart", amount: 36000 }); L6.hide(slipCart.inner);
    // `Dr = ↑ ?` chip over the left page (row 3) → ✗
    const [r3x, r3y] = L6.rowXY("L", 3);
    const drq = L6.hide(L6.node(K, svg, r3x, r3y));
    K.tex(K.shadow(drq, 2), K.cutRect(-150, -34, 300, 68, 2, 20), "pat-paper");
    L6.chip(K, K.g(drq, { transform: "translate(-92 0)" }), "Dr", { size: 44, bg: C.dr, w: 76, h: 54 });
    K.text(drq, -34, 3, "=", { size: 48, weight: 800 }); L6.arrow(K, drq, 22, 0, "up", C.ink, 46, 18); K.text(drq, 92, 3, "?", { size: 52, weight: 800, color: C.coral });
    L6.allow(drq);
    // pan labels (readable size) — Assets · Liabilities · Equity — lift off when the rule card arrives
    const [rpx] = L6.panXY("R");
    const mkLab = (x, y, text, side) => { const n = L6.hide(L6.node(K, svg, x, y)); L6.chip(K, n, text, { size: 46, bg: side === "L" ? C.dr : C.cr, h: 64 }); return n; };
    const labA = mkLab(lpx, 506, "Assets", "L"), labL = mkLab(rpx, 498, "Liabilities", "R"), labE = mkLab(rpx, 574, "Equity", "R");
    const cal = L6.cal(K, svg, 1);       // (above the string)
    // the "which two things changed?" device (created last: its veil sits on top)
    const w2 = K.whichTwo(svg, { veil: true, y: 176 });

    // ======================================================================================= timeline
    k.blink(tl, T0 + 2.0).blink(tl, T0 + 30).blink(tl, T0 + 52);
    // ---- 4a: the scale lowers; "Assets on the left. Liabilities and equity on the right."
    const tLook = cue("s04a", "@look");
    tl.to(rig.g, { y: 0, duration: 1.35, ease: "power2.out" }, tLook - 1.2);
    k.look(tl, tLook - 0.9, 0, -8); k.look(tl, tLook + 0.9, 0, 0);
    tl.to(strG, { opacity: 0, duration: 0.35 }, tLook + 0.3);
    K.dropIn(tl, labA, cue("s04a", "@assets") + 0.35, { dur: 0.3 });
    K.dropIn(tl, labL, cue("s04a", "@liabilities") + 0.3, { dur: 0.3 }); K.dropIn(tl, labE, cue("s04a", "@equity") + 0.3, { dur: 0.3 });
    jCash.enter(tl, cue("s04a", "@assets")); jEquip.enter(tl, cue("s04a", "@assets") + 0.3); jStock.enter(tl, cue("s04a", "@left") + 0.1);
    K.pulseNode(tl, rig.pans.L.tint, cue("s04a", "@left"), 1.06);
    tRavi.enter(tl, cue("s04a", "@liabilities")); tGopal.enter(tl, cue("s04a", "@and") + 0.1); tCap.enter(tl, cue("s04a", "@equity"));
    K.pulseNode(tl, rig.pans.R.tint, cue("s04a", "@right"), 1.06);
    // "Every account has a home side" — a map-pin drops onto each pan
    const tHome = cue("s04a", "@home");
    K.dropIn(tl, pinL, tHome, { dur: 0.34 }); K.dropIn(tl, pinR, tHome + 0.2, { dur: 0.34 });
    // ---- the rule card
    const tRule = cue("s04b", "@whole");
    [labA, labL, labE].forEach((n, i) => K.liftOff(tl, n, tRule - 0.5 + i * 0.05, { dur: 0.2 }));
    K.dropIn(tl, rule.n, tRule, { dur: 0.4 });
    K.pulseNode(tl, rule.r1, cue("s04b", "@grows"), 1.1); K.pulseNode(tl, pinL, cue("s04b", "@home"), 1.12); K.pulseNode(tl, pinR, cue("s04b", "@home") + 0.15, 1.12);
    K.pulseNode(tl, rule.r2, cue("s04b", "@shrinks"), 1.1);

    // ---- T1: April 1 — Meera puts in ₹50,000
    const tApr = cue("s04c", "@april");
    K.dropIn(tl, slipT1.inner, tApr + 0.1, { dur: 0.4 });
    const tWhich = cue("s04c", "@which");
    const tCashW = cue("s04d", "@cash"), tCapW = cue("s04d", "@capital");
    w2.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [
      { label: "Cash", delta: 50000, side: "L", at: tCashW },
      { label: "Capital", delta: 50000, side: "R", at: tCapW },
    ] });
    jCash.light(tl, tCashW + 0.05, { color: C.dr, hold: 1.0 }); tCap.light(tl, tCapW + 0.05, { color: C.cr, hold: 1.0 });
    w2.clear(tl, tCapW + 1.2);
    // Cash lands LEFT ("Debit Cash"), Capital lands RIGHT ("Credit Capital"); tip on the first, settle on the second
    const tDebitCash = cue("s04d", "@debit"), tCreditCap = cue("s04d", "@credit");
    const [cjx, cjy] = L6.panItemXY("L", 0, 3), [tcx, tcy] = L6.panItemXY("R", 2, 3);
    const f1 = L6.flyChip(K, tl, svg, tDebitCash + 0.05, 0.7, [cjx, cjy], L6.rowXY("L", 0), "₹50,000", { color: C.drText });
    const row1L = B.row("L", 0, "Cash", 50000); L6.hide(row1L);
    K.dropIn(tl, row1L, tDebitCash + 0.75, { dur: 0.3 });
    rig.tilt(tl, tDebitCash + 0.1, 2.4, { dur: 0.7 });
    const f2 = L6.flyChip(K, tl, svg, tCreditCap + 0.05, 0.7, [tcx, tcy], L6.rowXY("R", 0), "₹50,000", { color: C.crText });
    const row1R = B.row("R", 0, "Capital", 50000); L6.hide(row1R);
    K.dropIn(tl, row1R, tCreditCap + 0.75, { dur: 0.3 });
    rig.settle(tl, tCreditCap + 0.7, { dur: 0.9, hold: 1.5 });
    // "Fifty thousand left, fifty thousand right."
    K.pulseNode(tl, row1L, cue("s04d", "@left", 2), 1.07); K.pulseNode(tl, row1R, cue("s04d", "@right", 2), 1.07);
    k.look(tl, cue("s04d", "@left", 2) - 0.1, -9, 2).look(tl, cue("s04d", "@right", 2) - 0.1, 9, 2).look(tl, cue("s04d", "@right", 2) + 0.7, 0, 0);

    // ---- 4b: T3 — the cart (₹36,000)
    const tNow = cue("s04e", "@now");
    L6.mv(tl, slipT1, tNow - 0.1, 0.6, { x: -700 }, "power2.in");
    cal.tickTo(tl, tNow + 0.1, 2);
    tl.set(slipCart.pos, { x: 2300 - 300 }, 0);
    tl.set(slipCart.inner, { opacity: 1 }, tNow + 0.2);
    L6.mv(tl, slipCart, tNow + 0.2, 0.9, { x: 0 }, "power2.out");
    const tWhich2 = cue("s04e", "@which");
    const tEq = cue("s04f", "@equipment"), tCsh = cue("s04f", "@cash");
    w2.run(tl, tWhich2, { slots: 2, gap: 2.0, fill: [
      { label: "Equipment", delta: 36000, side: "L", at: tEq },
      { label: "Cash", delta: -36000, side: "L", at: tCsh },
    ] });
    jEquip.light(tl, tEq + 0.05, { color: C.dr, hold: 1.0 }); jCash.light(tl, tCsh + 0.05, { color: C.dr, hold: 1.0 });
    w2.clear(tl, tCsh + 1.2);
    // "Debit Equipment" — lands on the LEFT page
    const tDebitEq = cue("s04f", "@debit");
    const [ejx, ejy] = L6.panItemXY("L", 1, 3);
    const f3 = L6.flyChip(K, tl, svg, tDebitEq + 0.05, 0.7, [300, 200], L6.rowXY("L", 1), "₹36,000", { color: C.drText });
    const row3L = B.row("L", 1, "Equipment", 36000); L6.hide(row3L);
    K.dropIn(tl, row3L, tDebitEq + 0.75, { dur: 0.3 });
    K.pulseNode(tl, slipCart.inner, tDebitEq + 0.05, 1.05);
    // "But Cash shrinks." — the Cash chip drops in under the left pan and counts down; the jar loses a step
    const tShr = cue("s04f", "@shrinks");
    cashChip.enter(tl, tShr - 0.5);
    cashChip.to(tl, tShr + 0.1, 44000, 1.0);
    jCash.fill(tl, tShr + 0.2, 0.3);
    // the cross-over: Cash lives on the left, so to shrink it write on the RIGHT — the slowest flight of the lesson, with a dashed trail
    const tCredit = cue("s04f", "@credit");
    const [cx0, cy0] = [cjx, cjy], [cx1, cy1] = L6.rowXY("R", 1);
    const trail = K.el("path", { d: `M${cx0},${cy0} Q${(cx0 + cx1) / 2},${Math.min(cy0, cy1) - 150} ${cx1},${cy1}`, fill: "none", stroke: C.cr, "stroke-width": 5, "stroke-dasharray": "14 12", "stroke-linecap": "round", opacity: 0 }, svg);
    tl.fromTo(trail, { opacity: 0 }, { opacity: 0.8, duration: 0.2, immediateRender: false }, tCredit);
    tl.to(trail, { opacity: 0, duration: 0.4 }, tCredit + 1.4);
    const f4 = L6.flyChip(K, tl, svg, tCredit + 0.05, 0.95, [cx0, cy0], [cx1, cy1], "₹36,000", { color: C.crText, lift: 150, xEase: "power2.inOut" });
    const row3R = B.row("R", 1, "Cash", 36000); L6.hide(row3R);
    K.dropIn(tl, row3R, tCredit + 1.0, { dur: 0.3 });
    K.pulseNode(tl, rule.r2, tCredit + 1.0, 1.1);
    k.look(tl, tCredit, 9, 4).look(tl, tCredit + 1.6, 0, 0);
    // (nothing moves from here until "So debit doesn't always mean up" — the ≥ 1.5 s hold)
    // "So debit doesn't always mean up." — `Dr = ↑ ?` gets a small ✗ (Khata stamps)
    const tDeb = cue("s04g", "@debit"), tUp = cue("s04g", "@up");
    K.dropIn(tl, drq, tDeb - 0.1, { dur: 0.34 });
    k.arm(tl, tUp - 0.4, "L", 125, 0.25); k.arm(tl, tUp + 0.15, "L", 20, 0.3);
    const st = K.stamp(tl, svg, r3x + 70, r3y, tUp - 0.15, 0.62);
    k.expr(tl, tUp, "wink");
    k.expr(tl, tUp + 0.9, "awake", { noTake: true });
    K.liftOff(tl, drq, sc.end - 0.2, { dur: 0.2 }); st.lift(tl, sc.end - 0.2);
    L6.allow(w2.g);
  };
})();

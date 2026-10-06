// s06 — Money made, money spent: the algebra move (T6). Rent ₹5,000: Cash shrinks → its coin crosses to the RIGHT page (the T3 pattern);
// the Rent slip hovers over the spine with a ? — where is its home? The long equation A = L + Capital + Revenue − Expenses slides in under the
// scale. The `−Expenses` chip lifts out of the strip, ARCS OVER THE POST (the =), its minus becomes a plus mid-air and it lands on the LEFT
// pan as the Expenses jar → A + Expenses = L + Capital + Revenue. ≥ 1.5 s hold. Then Rent lands on the left page (blue). Revenue never moved:
// its chip + slip glow on the right.  Expense = debit is DERIVED, not decreed.
(function () {
  const FS = 46, Y = 548, EQX = 960, G = 8;

  // the equation strip: per-term chips; `mx` (− Expenses) is the liftable, sign-flipping chip. Returns node refs + helpers.
  L6.eqStrip = (K, parent) => {
    const C = K.C, root = K.g(parent, {});
    const bk = L6.node(K, root, 1210, Y);
    K.tex(K.shadow(bk, 1), K.cutRect(-650, -50, 1300, 100, 2, 24), "pat-paper");
    const mk = (text, w, side, o = {}) => {
      const n = L6.node(K, root, 0, 0);                       // inner: x set by place()
      const bgc = side === "L" ? "#d4e4f8" : "#fbdcbc";
      if (!o.bare) K.paper(K.shadow(n, 1), K.cutRect(-w / 2, -32, w, 64, 1.4, 18), bgc);
      const t = K.text(n, 0, 3, text, { size: o.size || FS, weight: 800, color: o.color || (side === "L" ? C.drText : side === "R" ? C.crText : C.ink) });
      t.setAttribute("data-layout-allow-overlap", "true");
      n._w = w; n._t = t; return n;
    };
    const wTxt = (t) => Math.round(t.length * FS * 0.56 + 30);
    const N = {
      A: mk("A", 56, "L"), eq: mk("=", 44, "I", { bare: true, size: 58 }),
      L: mk("L", 56, "R"), p1: mk("+", 36, "I", { bare: true }), cap: mk("Capital", wTxt("Capital"), "R"),
      p2: mk("+", 36, "I", { bare: true }), rev: mk("Revenue", wTxt("Revenue"), "R"),
      lp: mk("+", 36, "I", { bare: true }), lx: mk("Expenses", wTxt("Expenses"), "L"),
    };
    // the liftable − Expenses chip: bar sign (the vertical bar scales in → a plus) + the word
    const mx = L6.rig(K, root, 0, 0), mxw = wTxt("Expenses") + 44;
    K.paper(K.shadow(mx.inner, 1), K.cutRect(-mxw / 2, -32, mxw, 64, 1.4, 18), "#fbdcbc");
    const sgn = K.g(mx.inner, { transform: `translate(${-mxw / 2 + 32} 0)` });
    K.paper(sgn, K.cutRect(-15, -4, 30, 8, 0.5, 10), C.crText);
    const vbar = K.g(sgn, {}); K.paper(vbar, K.cutRect(-4, -15, 8, 30, 0.5, 10), C.crText);
    gsap.set(vbar, { scaleY: 0, svgOrigin: "0 0" });
    const mxT = K.text(mx.inner, 24, 3, "Expenses", { size: FS, weight: 800, color: C.crText }); mxT.setAttribute("data-layout-allow-overlap", "true");
    mx.inner._w = mxw;
    // layout: right side starts just after the =, left side ends just before it
    const place = (n, cx) => { n.parentNode.setAttribute("transform", `translate(${cx} ${Y})`); n._cx = cx; return cx; };
    let x = EQX + 34 + 12;
    const right = [N.L, N.p1, N.cap, N.p2, N.rev];
    right.forEach((n) => { place(n, x + n._w / 2); x += n._w + G; });
    mx.w.setAttribute("transform", `translate(${x + mxw / 2} ${Y})`); const mxX = x + mxw / 2;
    place(N.eq, EQX);
    place(N.A, EQX - 34 - 12 - N.A._w / 2);
    const A0 = N.A._cx;
    // after the move: A + Expenses  (right-aligned to the =)
    const lw = [N.A._w, N.lp._w, N.lx._w], tot = lw.reduce((a, b) => a + b, 0) + 2 * G, sx = EQX - 34 - 12 - tot;
    const A1 = sx + lw[0] / 2, P1 = sx + lw[0] + G + lw[1] / 2, X1 = sx + lw[0] + lw[1] + 2 * G + lw[2] / 2;
    place(N.lp, P1); place(N.lx, X1);
    [bk, N.A, N.eq, N.L, N.p1, N.cap, N.p2, N.rev, N.lp, N.lx, mx.inner].forEach((n) => L6.hide(n));
    return { root, bk, N, mx, vbar, mxX, A0, A1, P1, X1, Y, EQX };
  };

  // gold "reading" ring that flashes round a term (a paper outline, never a glow)
  L6.ringOn = (K, tl, node, t, hold = 0.8, w = 70, h = 72) => {
    const r = K.el("rect", { x: -w / 2 - 6, y: -h / 2 - 2, width: w + 12, height: h + 4, rx: 10, fill: "none", stroke: K.C.gold, "stroke-width": 7, opacity: 0 }, node);
    tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.12, immediateRender: false }, t);
    tl.to(r, { opacity: 0, duration: 0.3 }, t + 0.12 + hold);
    return r;
  };

  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L6.stage(K, svg, C.saffron, 880);
    const B = L6.board(K, svg, { tint: 0.28 });
    const { k, rig } = B;
    // pans: Cash (+ the Expenses jar that lands later) on the left; Ravi, Gopal, Capital tags on the right
    const jCash = B.jar(0, 2, { label: "Cash", contents: "coins", fill: 0.3, hidden: false });
    const jExp = B.jar(1, 2, { label: "Expenses", contents: "sticker", icon: "key" });
    const tags = [["ravi", "ravi"], ["gopal", "gopal"], ["cap", "meera"]].map(([key, face], i) => B.tag(i, 3, { face, hidden: false }));
    L6.pin(K, rig.pans.L.g, -196, -26, "L", 60); const pinR = L6.pin(K, rig.pans.R.g, 196, -26, "R", 60);
    // ledger lines carried over (T1, T3, T5)
    B.row("L", 0, "Cash", 50000); B.row("L", 1, "Equipment", 36000); B.row("L", 2, "Stock", 8000);
    B.row("R", 0, "Capital", 50000); B.row("R", 1, "Cash", 36000); B.row("R", 2, "Gopal Dairy", 8000);
    const rule = L6.ruleCard(K, svg, 230, 590);
    const slip = L6.slip(K, svg, 300, 200, { icon: "key", amount: 5000 }); L6.hide(slip.inner);
    const cal = L6.cal(K, svg, 3);
    // Meera (bottom-left, small)
    const m = K.meera(svg, 215, 1042, 0.5, { expr: "neutral" });
    // Equity card (right zone): Capital | Profit holding last time's revenue + expense slips
    const eqc = K.equityCard(svg, 1662, 1034, 0.8, { pockets: 2, capital: 50000 });
    // the Rent slip pill hovering over the spine (+ ?)
    const [r3x, r3y] = L6.rowXY("L", 3);
    const pill = L6.rig(K, svg, 960, 662); L6.hide(pill.inner);
    K.tex(K.shadow(pill.inner, 2), K.cutRect(-112, -38, 224, 76, 2, 20), "pat-paper");
    K.paper(pill.inner, K.cutRect(-100, 28, 200, 6, 0.5, 12), C.dr);
    K.medallion(pill.inner, -62, 0, 30, "key");
    K.text(pill.inner, 24, 2, "₹5,000", { size: 42, weight: 800, color: C.drText }).setAttribute("data-layout-allow-overlap", "true");
    const q = L6.hide(L6.node(K, svg, 1118, 650)); K.qmark(q, 0, 0, 1.05, C.coral);
    // the equation strip
    const S = L6.eqStrip(K, svg);
    const orPin = L6.hide(L6.pin(K, svg, S.N.rev._cx, Y - 78, "R", 38));

    // ======================================================================================= timeline
    k.blink(tl, T0 + 3).blink(tl, T0 + 20).blink(tl, T0 + 38); m.blinks(tl, T0 + 1.5, sc.end, 3.6);
    // Equity card: Meera's tag unfolds; last time's two slips sit in the Profit pocket
    eqc.unfold(tl, T0 + 0.3);
    eqc.slip(tl, T0 + 1.2, "Profit", 18000, { icon: "coins" });
    eqc.slip(tl, T0 + 1.8, "Profit", -5000, { icon: "key" });
    // "April fifth. Rent, five thousand rupees." — the slip rides the rail; the calendar ticks
    const tApr = cue("s06a", "@fifth");
    cal.tickTo(tl, tApr - 0.1, 5);
    K.dropIn(tl, slip.inner, cue("s06a", "@rent"), { dur: 0.4 });
    // "Cash shrinks. Credit Cash." — Cash's coin crosses to the RIGHT page
    const tCr = cue("s06a", "@credit");
    const [cjx, cjy] = L6.panItemXY("L", 0, 2), [cx1, cy1] = L6.rowXY("R", 3);
    jCash.fill(tl, cue("s06a", "@shrinks") + 0.2, 0.0);
    L6.flyChip(K, tl, svg, tCr + 0.05, 0.9, [cjx, cjy], [cx1, cy1], "₹5,000", { color: C.crText, lift: 150, xEase: "power2.inOut" });
    const rowCashR = B.row("R", 3, "Cash", 5000); L6.hide(rowCashR);
    K.dropIn(tl, rowCashR, tCr + 0.95, { dur: 0.3 });
    // "And Rent? Rent grew. But where is its home?" — the pill hovers over the spine with a ?; Meera is puzzled
    const tQ = cue("s06a", "@grew");
    K.dropIn(tl, pill.inner, cue("s06a", "@rent", 2), { dur: 0.34 });
    K.dropIn(tl, q, tQ + 0.2, { dur: 0.3 });
    m.expr(tl, cue("s06a", "@where"), "puzzled").headTilt(tl, cue("s06a", "@where"), -7).look(tl, cue("s06a", "@where"), 6, -4);
    k.look(tl, tQ, 0, -7);

    // ---- the equation: terms light as they are read
    const tEq = cue("s06b", "@equation");
    K.dropIn(tl, S.bk, tEq - 0.1, { dur: 0.4 });
    [S.N.A, S.N.eq, S.N.L, S.N.p1, S.N.cap, S.N.p2, S.N.rev, S.mx.inner].forEach((n, i) => K.dropIn(tl, n, tEq + 0.05 + i * 0.05, { dur: 0.3 }));
    k.look(tl, tEq, 0, 0);
    [["A", "@assets"], ["L", "@liabilities"], ["cap", "@capital"], ["rev", "@revenue"]].forEach(([key, w]) => {
      const t = cue("s06b", w); K.pulseNode(tl, S.N[key], t, 1.1); L6.ringOn(K, tl, S.N[key], t, 0.7, S.N[key]._w, 66);
    });
    const tExpRead = cue("s06b", "@expenses");
    K.pulseNode(tl, S.mx.inner, tExpRead, 1.1); L6.ringOn(K, tl, S.mx.inner, tExpRead, 0.7, S.mx.inner._w, 66);
    // "That minus is the clue."
    const tClue = cue("s06b", "@minus", 2);
    K.pulseNode(tl, S.mx.inner, tClue, 1.12); L6.ringOn(K, tl, S.mx.inner, cue("s06b", "@clue") - 0.2, 1.0, S.mx.inner._w, 66);

    // ---- THE MOVE: the −Expenses chip lifts out, arcs over the post, flips to + and lands on the left pan as the Expenses jar
    const tMove = cue("s06b", "@move"), tFly = cue("s06b", "@across") + 0.1, tFlip = cue("s06b", "@minus", 3) - 0.35, DUR = 2.3;
    L6.mv(tl, S.mx, tMove + 0.1, 0.35, { y: -14 }, "power2.out");
    // ghost outline where the chip left
    const ghost = L6.hide(K.g(svg, { transform: `translate(${S.mxX} ${Y})` }));
    K.el("path", { d: K.cutRect(-S.mx.inner._w / 2, -32, S.mx.inner._w, 64, 1, 20), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", opacity: 0.6 }, ghost);
    tl.to(ghost, { opacity: 1, duration: 0.2 }, tFly);
    tl.to(ghost, { opacity: 0, duration: 0.3 }, tFly + DUR + 0.1);
    // Bézier over the post: P0 = the chip's slot in the strip, P1 above the right pan, P2 above the left pan
    const [lpx] = L6.panXY("L"), [expX, expY] = L6.panItemXY("L", 1, 2);
    const P0 = [S.mxX, Y - 14], P1 = [1130, 120], P2 = [expX, expY - 20];
    const bz = (t) => { const u = 1 - t; return [u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]]; };
    const pr = { t: 0 };
    tl.fromTo(pr, { t: 0 }, { t: 1, duration: DUR, ease: "power2.inOut", immediateRender: false,
      onUpdate: () => { const [bx, by] = bz(pr.t); gsap.set(S.mx.pos, { x: bx - S.mxX, y: by - Y }); } }, tFly);
    // the sign flips at the apex over the post: the vertical bar scales in — a minus becomes a plus
    tl.to(S.vbar, { scaleY: 1, svgOrigin: O, duration: 0.3, ease: "power2.out" }, tFlip);
    K.pulseNode(tl, S.mx.sc, tFlip + 0.1, 1.15);
    // the expense slip slides OUT of the Profit pocket (nothing is counted twice)
    const prof = eqc.pockets.Profit, slipNode = prof.slips.lastChild && prof.slips.lastChild.firstChild;
    if (slipNode) tl.to(slipNode, { y: -90, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, tFly);
    eqc.pocketTick(tl, tFly + 0.3, "Profit", 18000, 0.6);
    // landing: the chip lifts off, the Expenses jar drops onto the left pan; the strip ticks term by term (A slides left, + , Expenses)
    const tLand = tFly + DUR;
    tl.to(S.mx.inner, { opacity: 0, duration: 0.14 }, tLand - 0.04);
    jExp.enter(tl, tLand - 0.08);
    K.pulseNode(tl, rig.pans.L.tint, tLand, 1.05);
    tl.to(S.N.A, { x: S.A1 - S.A0, duration: 0.4, ease: "power2.inOut" }, tLand + 0.05);
    K.dropIn(tl, S.N.lp, tLand + 0.3, { dur: 0.28 }); tl.set(S.N.lp, { opacity: 1 }, tLand + 0.3);
    K.dropIn(tl, S.N.lx, tLand + 0.5, { dur: 0.28 }); tl.set(S.N.lx, { opacity: 1 }, tLand + 0.5);
    // (≥ 1.5 s hold — the VO re-reads the new equation; terms only light, nothing travels)
    [["A", "@assets"], ["lx", "@expenses"], ["L", "@liabilities"], ["cap", "@capital"], ["rev", "@revenue"]].forEach(([key, w]) => {
      const t = cue("s06c", w); K.pulseNode(tl, S.N[key], t, 1.1); L6.ringOn(K, tl, S.N[key], t, 0.6, S.N[key]._w, 66);
    });

    // ---- "So expenses live on the left, with the assets." → Rent drops onto the left page
    const tLeft = cue("s06c", "@left");
    jExp.light(tl, tLeft, { color: C.dr, hold: 0.9 }); jCash.light(tl, cue("s06c", "@assets", 2), { color: C.dr, hold: 0.9 });
    const tHome = cue("s06c", "@home");
    const rowRent = B.row("L", 3, "Rent", 5000); L6.hide(rowRent);
    tl.to(pill.pos, { y: r3y - 662, duration: 0.6, ease: "power2.in" }, tHome - 0.5);
    tl.to(pill.pos, { x: r3x - 960, duration: 0.6, ease: "power2.inOut" }, tHome - 0.5);
    tl.set(pill.inner, { opacity: 0 }, tHome + 0.1);
    K.dropIn(tl, rowRent, tHome + 0.1, { dur: 0.3 });
    K.liftOff(tl, q, tHome - 0.55, { dur: 0.15 });
    K.pulseNode(tl, rule.r1, tHome + 0.1, 1.12);
    m.expr(tl, cue("s06c", "@rent") - 0.1, "thinking"); m.expr(tl, cue("s06c", "@every"), "happy"); m.headTilt(tl, cue("s06c", "@every"), 0);
    k.look(tl, tHome - 0.6, -6, 4).look(tl, tHome + 0.9, 0, 0);

    // ---- "Revenue never moved, so its home stays on the right, with capital."
    const tRev = cue("s06d", "@revenue");
    K.pulseNode(tl, S.N.rev, tRev, 1.12); L6.ringOn(K, tl, S.N.rev, tRev, 1.4, S.N.rev._w, 66);
    eqc.light(tl, tRev + 0.05, "Profit", { color: C.cr, hold: 1.4 });
    K.dropIn(tl, orPin, cue("s06d", "@right"), { dur: 0.34 });
    K.pulseNode(tl, pinR, cue("s06d", "@right") + 0.1, 1.12);
    const tSale = cue("s06d", "@sale");
    K.pulseNode(tl, S.N.rev, tSale, 1.1); L6.ringOn(K, tl, S.N.rev, cue("s06d", "@credit"), 0.9, S.N.rev._w, 66);
    L6.allow(eqc.g);
  };
})();

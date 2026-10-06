// s07 — DEAD CLIC, and double entry. The pages are cleared; two columns of paper rows build up on Khata's pages (left: Debit · Expenses · Assets ·
// Drawings; right: Credit · Liabilities · Revenue→Income · Capital). Each row's initial is a letter: D E A D | C L I C — the letters fly up and
// stick onto the equation strip like price labels: the mnemonic belongs TO the equation. Then the scale flattens into the pages (same object,
// new costume): T1 replays alone, ₹50,000 = ₹50,000, `Double entry`.
// Out (own seam → s08): a divider drops from the scale's post; Khata slides left INTACT; the Bank's grey-blue ledger slides in from the right.
(function () {
  window.OWN_SEAM_IN.s08 = true;

  // a labelled page row with an initial-letter square (and optional icon at the right end)
  L6.tagRow = (K, k, side, i, text, letter, o = {}) => {
    const C = K.C, cx = side === "L" ? -167 : 167, cy = -305 + 60 * i, col = side === "L" ? C.dr : C.cr;
    const n = L6.node(K, k.pageArea[side].g, cx, cy);
    const face = (parent, txt, ltr) => {
      K.tex(K.shadow(parent, 1), K.cutRect(-152, -27, 304, 54, 1.4, 18), "pat-paper");
      K.paper(parent, K.cutRect(-146, -21, 42, 42, 0.8, 12), col);
      K.text(parent, -125, 2, ltr, { size: 32, weight: 800, color: "#ffffff" }).setAttribute("data-layout-allow-overlap", "true");
      K.text(parent, -92, 2, txt, { size: 32, weight: 700, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
    };
    const front = K.g(n, {}); face(front, text, letter);
    if (o.icon) K.icon(front, o.icon, 84, 0, 36, C.coral, 2.4);
    let back = null, eq = null;
    if (o.flipTo) {
      back = L6.hide(K.g(n, {})); face(back, o.flipTo[0], o.flipTo[1]);
      eq = L6.hide(K.g(n, {})); K.text(eq, 128, 2, "=", { size: 40, weight: 800, color: C.ink });
    }
    if (o.leaf) {   // the faint calendar leaf `30` — a silent plant for L8
      const lf = K.g(n, { transform: "translate(128 -14)", opacity: 0.55 });
      K.paper(lf, K.cutRect(-18, -16, 36, 34, 0.6, 10), C.cream); K.paper(lf, K.cutRect(-18, -16, 36, 11, 0.4, 10), C.coral);
      K.text(lf, 0, 8, "30", { size: 18, weight: 800 }).setAttribute("data-layout-allow-overlap", "true");
    }
    return { n, front, back, eq };
  };
  // a square letter tile (paper) drawn around (0,0)
  L6.letterTile = (K, parent, letter, color) => {
    const n = K.g(parent, {});
    K.tex(K.shadow(n, 2), K.cutRect(-27, -27, 54, 54, 1.2, 14), "pat-paper");
    K.paper(n, K.cutRect(-22, -22, 44, 44, 0.8, 12), color);
    K.text(n, 0, 3, letter, { size: 38, weight: 800, color: "#ffffff" }).setAttribute("data-layout-allow-overlap", "true");
    return n;
  };

  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start, TE = sc.end;
    const sq = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    K.wall(svg, C.leaf, 880);
    // the left-half sky wash (fades in at the seam) and the right half's night wall (slides in) sit under the table and the board
    const skyL = L6.hide(K.paper(svg, K.cutPoly(sq(-40, -40, 1010, 905), 0.5, 60), C.sky));
    const nightBg = L6.rig(K, svg, 0, 0); tl.set(nightBg.pos, { x: 960 }, 0);
    K.paper(nightBg.inner, K.cutPoly(sq(960, -40, 2010, 905), 0.5, 60), C.navy);
    K.table(svg, 880);
    // the whole board lives in a rig so it can slide left intact at the seam
    const kb = L6.rig(K, svg, 0, 0);
    const B = L6.board(K, kb.inner, { tint: 0.28 });
    const { k, rig } = B;
    const jCash = B.jar(0, 2, { label: "Cash", contents: "coins", fill: 0.3, hidden: false });
    const jExp = B.jar(1, 2, { label: "Expenses", contents: "sticker", icon: "key", hidden: false });
    [["ravi", "ravi"], ["gopal", "gopal"], ["cap", "meera"]].forEach(([key, face], i) => B.tag(i, 3, { face, hidden: false }));
    L6.pin(K, rig.pans.L.g, -196, -26, "L", 60); L6.pin(K, rig.pans.R.g, 196, -26, "R", 60);
    // the equation strip, as s06 left it: A + Expenses = L + Capital + Revenue
    const S = L6.eqStrip(K, kb.inner);
    [S.bk, S.N.A, S.N.eq, S.N.L, S.N.p1, S.N.cap, S.N.p2, S.N.rev, S.N.lp, S.N.lx].forEach((n) => gsap.set(n, { opacity: 1 }));
    gsap.set(S.N.A, { x: S.A1 - S.A0 });

    // ---- the two columns (hidden until the VO names them)
    const RL = [["Debit", "D"], ["Expenses", "E"], ["Assets", "A"], ["Drawings", "D", { icon: "wallet", leaf: true }]].map(([t, l, o], i) => L6.tagRow(K, k, "L", i, t, l, o || {}));
    const RR = [["Credit", "C"], ["Liabilities", "L"], ["Revenue", "R", { flipTo: ["Income", "I"] }], ["Capital", "C"]].map(([t, l, o], i) => L6.tagRow(K, k, "R", i, t, l, o || {}));
    [...RL, ...RR].forEach((r) => L6.hide(r.n));
    // ---- the 8 letter tiles (fly from their rows up onto the strip)
    const TY = 497, TW = 52, GAP = 8;
    const slotX = (grp, i) => (grp === "L" ? 760 : 1277) + (i - 1.5) * (TW + GAP);
    const LET = [["L", "D", 0], ["L", "E", 1], ["L", "A", 2], ["L", "D", 3], ["R", "C", 0], ["R", "L", 1], ["R", "I", 2], ["R", "C", 3]];
    const tiles = LET.map(([g, ch, i]) => {
      const [rx, ry] = L6.rowXY(g, i), fx = rx + (g === "L" ? -125 : -(-125) * 0) * 1;
      const startX = (g === "L" ? L6.rowXY("L", i)[0] : L6.rowXY("R", i)[0]) - 125 * L6.KH.s, startY = ry;
      const r = L6.rig(K, kb.inner, startX, startY); L6.hide(r.inner);
      L6.letterTile(K, r.inner, ch, g === "L" ? C.dr : C.cr);
      return { r, g, i, sx: startX, sy: startY, tx: slotX(g, i), ty: TY };
    });
    // ---- double-entry bits: totals chips above the pages, `=`, and the Double entry chip on the spine
    const [lx, ly] = L6.rowXY("L", 0), [rx0] = L6.rowXY("R", 0);
    const totL = K.ticker(kb.inner, lx, 588, 1, { value: 0, size: 54, chip: true, w: 270, h: 76, edge: C.dr, hidden: true });
    const totR = K.ticker(kb.inner, rx0, 588, 1, { value: 0, size: 54, chip: true, w: 270, h: 76, edge: C.cr, hidden: true });
    const eqS = L6.hide(L6.node(K, kb.inner, 960, 588)); K.text(eqS, 0, 3, "=", { size: 72, weight: 800 });
    const dbl = L6.hide(L6.node(K, kb.inner, 960, 662)); L6.chip(K, dbl, "Double entry", { size: 44, bg: C.saffron, h: 62 });
    L6.allow(totL.g); L6.allow(totR.g);

    // ---- the Frappe-course cross-reference (visual only, 2 s): a small chip `= AED-LIC` slides in right of the strip and lifts off
    const aedR = L6.rig(K, svg, 1690, 438); L6.hide(aedR.inner); L6.chip(K, aedR.inner, "= AED-LIC", { size: 46, bg: C.cream, h: 68 });
    const aed = aedR.inner;
    // ---- seam tail: divider, ledger sliding in on a night-blue half
    const night = L6.rig(K, svg, 0, 0);                        // the ledger rides in with the night wall
    tl.set(night.pos, { x: 960 }, 0);
    const led = L6.ledger(K, night.inner, 1440, 1050, 0.8);
    const divider = L6.rig(K, svg, 960, 0);
    K.tex(K.shadow(divider.inner, 3), K.cutRect(-9, -60, 18, 1200, 0.8, 60), "pat-cover");
    K.paper(divider.inner, K.cutRect(-9, -60, 18, 1200, 0.8, 60), C.brass, { opacity: 0.6 });
    tl.set(divider.pos, { y: -1240 }, 0);
    const cal = L6.cal(K, svg, 5);          // (above both halves)
    L6.allow(S.root);

    // ======================================================================================= timeline
    k.blink(tl, T0 + 3).blink(tl, T0 + 14).blink(tl, T0 + 26);
    // ---- "Debits live on the left: Expenses, Assets, and Drawings."
    const dr = (r, t) => K.dropIn(tl, r.n, t, { dur: 0.32 });
    dr(RL[0], cue("s07a", "@debits")); dr(RL[1], cue("s07a", "@expenses"));
    dr(RL[2], cue("s07a", "@assets")); dr(RL[3], cue("s07a", "@drawings"));
    k.look(tl, cue("s07a", "@debits") - 0.1, -8, 2).look(tl, cue("s07a", "@they") - 0.1, 0, 0);
    // "They behave like expenses." — Drawings and Expenses pulse together
    K.pulseNode(tl, RL[3].n, cue("s07a", "@behave"), 1.08); K.pulseNode(tl, RL[1].n, cue("s07a", "@behave") + 0.2, 1.08);
    // ---- "Credits live on the right: Liabilities, Income (that's revenue, or income), and Capital."
    dr(RR[0], cue("s07b", "@credits")); dr(RR[1], cue("s07b", "@liabilities"));
    dr(RR[2], cue("s07b", "@income")); dr(RR[3], cue("s07b", "@capital"));
    k.look(tl, cue("s07b", "@credits") - 0.1, 8, 2).look(tl, cue("s07b", "@capital") + 0.4, 0, 0);
    // the visible Revenue → Income flip (fake scaleX, 0.35 s) with a tiny = blinking between the faces
    const R2 = RR[2], tFl = cue("s07b", "@or");
    K.pulseNode(tl, R2.n, cue("s07b", "@revenue"), 1.08);
    tl.to(R2.front, { scaleX: 0.05, svgOrigin: "0 0", duration: 0.17, ease: "power1.in" }, tFl);       // (page-content local: row centre is 167 on the right page)
    tl.set(R2.front, { opacity: 0 }, tFl + 0.17); tl.set(R2.back, { opacity: 1 }, tFl + 0.17);
    tl.fromTo(R2.back, { scaleX: 0.05, svgOrigin: "0 0" }, { scaleX: 1, svgOrigin: "0 0", duration: 0.18, ease: "power1.out", immediateRender: false }, tFl + 0.17);
    tl.set(R2.eq, { opacity: 1 }, tFl + 0.12); tl.set(R2.eq, { opacity: 0 }, tFl + 0.12 + 2 / 15);
    // ---- "In short: DEAD CLIC." — the initials fly up as letter tiles
    const tDead = cue("s07b", "@dead"), tClic = cue("s07b", "@clic");
    tiles.forEach((t, j) => {
      const t0 = (j < 4 ? tDead : tClic) + (j % 4) * 0.13;
      tl.set(t.r.inner, { opacity: 1 }, t0);
      tl.to(t.r.pos, { x: t.tx - t.sx, duration: 0.7, ease: "power2.inOut" }, t0);
      tl.to(t.r.pos, { y: Math.min(0, t.ty - t.sy) - 70, duration: 0.35, ease: "power2.out" }, t0);
      tl.to(t.r.pos, { y: t.ty - t.sy, duration: 0.35, ease: "power2.in" }, t0 + 0.35);
      tl.fromTo(t.r.inner, { scale: 1.07, svgOrigin: O, autoAlpha: 0 }, { scale: 1, svgOrigin: O, autoAlpha: 1, duration: 0.25, ease: "power2.out", immediateRender: false }, t0);
    });
    // "You read it straight off the equation." — the row sticks (a soft press) and the strip reads under it
    const tRead = cue("s07b", "@read");
    tiles.forEach((t, j) => K.pulseNode(tl, t.r.sc, tRead + (j % 4) * 0.08 + (j < 4 ? 0 : 0.4), 1.1));
    // the cross-reference chip: slides in from the right beside the strip, rests ~2 s, lifts off
    tl.fromTo(aedR.pos, { x: 260 }, { x: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, tRead + 0.55);
    K.dropIn(tl, aed, tRead + 0.55, { dur: 0.35 }); K.liftOff(tl, aed, tRead + 2.55, { dur: 0.3 });
    // ---- "…the left total equals the right total." — everything else steps away, the scale flattens into the pages
    const tTx = cue("s07c", "@transaction"), tLeftT = cue("s07c", "@left");
    const lift = (n, t) => K.liftOff(tl, n, t, { dur: 0.22 });
    [...RL, ...RR].forEach((r, i) => lift(r.n, tTx + 0.1 + i * 0.03));
    tiles.forEach((t, i) => lift(t.r.inner, tTx + 0.1 + i * 0.03));
    [S.bk, S.N.A, S.N.eq, S.N.L, S.N.p1, S.N.cap, S.N.p2, S.N.rev, S.N.lp, S.N.lx].forEach((n, i) => lift(n, tTx + 0.15 + i * 0.02));
    // the flatten: scaleY → 0.1 about the spine top, then it fades (the beam becomes the page tops, the post becomes the spine)
    const tFlat = tLeftT - 0.35, base = L6.geo().scy;
    tl.to(rig.g, { scaleY: 0.1, svgOrigin: `960 ${base}`, duration: 1.0, ease: "power2.inOut" }, tFlat);
    tl.to(rig.g, { opacity: 0.0, duration: 0.3, ease: "power1.in" }, tFlat + 0.95);
    tl.to(k.tints.L, { opacity: 0.5, duration: 0.6 }, tFlat + 0.5); tl.to(k.tints.R, { opacity: 0.5, duration: 0.6 }, tFlat + 0.5);
    // T1 replays alone: ₹50,000 flies onto each page; the totals tick to ₹50,000 = ₹50,000
    const tEqual = cue("s07c", "@equals"), tRightT = Math.max(cue("s07c", "@right"), tEqual + 0.3);   // (Hindi says "right" before "equals")
    const L0 = L6.rowXY("L", 0), R0 = L6.rowXY("R", 0);
    L6.flyChip(K, tl, kb.inner, tEqual - 0.1, 0.65, [L6.panXY("L")[0], base - 30], [L0[0], L0[1] + 0], "₹50,000", { color: C.drText, lift: 60 });
    L6.flyChip(K, tl, kb.inner, tEqual - 0.1, 0.65, [L6.panXY("R")[0], base - 30], [R0[0], R0[1]], "₹50,000", { color: C.crText, lift: 60 });
    const rowL = L6.row(K, k, "L", 0, "Cash", 50000), rowR = L6.row(K, k, "R", 0, "Capital", 50000);
    L6.hide(rowL); L6.hide(rowR);
    K.dropIn(tl, rowL, tEqual + 0.55, { dur: 0.3 }); K.dropIn(tl, rowR, tEqual + 0.65, { dur: 0.3 });
    totL.enter(tl, tEqual + 0.5); totR.enter(tl, tEqual + 0.62);
    totL.to(tl, tEqual + 0.55, 50000, 0.7); totR.to(tl, tEqual + 0.65, 50000, 0.7);
    K.dropIn(tl, eqS, tRightT + 0.55, { dur: 0.3 });
    k.look(tl, tEqual, -6, 3).look(tl, tRightT + 0.3, 6, 3).look(tl, tRightT + 1.2, 0, 0);
    // (hold ≥ 1.5 s on the equal totals — the VO says "Always." then pauses)
    // "That's double entry: every rupee written twice, once on each side."
    K.dropIn(tl, dbl, cue("s07c", "@double"), { dur: 0.34 });
    K.pulseNode(tl, rowL, cue("s07c", "@once"), 1.08); K.pulseNode(tl, rowR, cue("s07c", "@each") + 0.1, 1.08);
    // "The same scale, in a new costume." — the scale's ghost returns for a beat over the pages
    const tSame = cue("s07c", "@scale");
    tl.set(rig.g, { scaleY: 1, svgOrigin: `960 ${base}` }, tSame - 0.05);
    tl.to(rig.g, { opacity: 0.32, duration: 0.45, ease: "power1.out" }, tSame);

    // ---- SEAM TAIL (own): divider drops from the post; Khata slides left intact; the bank's ledger slides in from the right
    const tS = TE - 1.55;
    [dbl, eqS, totL.body, totR.body].forEach((n, i) => K.liftOff(tl, n, tS - 0.05 + i * 0.03, { dur: 0.22 }));
    [rowL, rowR].forEach((n) => K.liftOff(tl, n, tS - 0.05, { dur: 0.22 }));
    tl.to(rig.g, { opacity: 0, duration: 0.25 }, tS);
    tl.to(k.tints.L, { opacity: 0.28, duration: 0.5 }, tS); tl.to(k.tints.R, { opacity: 0.28, duration: 0.5 }, tS);
    tl.to(divider.pos, { y: 0, duration: 0.4, ease: "power3.out" }, tS + 0.1);
    L6.mv(tl, kb, tS + 0.4, 1.1, { x: 520 - 960 }, "power2.inOut");
    tl.to(kb.sc, { scale: 0.8 / 1.08, svgOrigin: "960 1048", duration: 1.1, ease: "power2.inOut" }, tS + 0.4);
    tl.to(night.pos, { x: 0, duration: 1.1, ease: "power2.inOut" }, tS + 0.4);
    tl.to(nightBg.pos, { x: 0, duration: 1.1, ease: "power2.inOut" }, tS + 0.4);
    tl.to(skyL, { opacity: 1, duration: 0.8, ease: "power1.inOut" }, tS + 0.5);
    cal.tickTo(tl, tS + 0.35, 15, { dur: 1.1 });      // the cold open's date (Apr 15) — the deposit
  };
})();

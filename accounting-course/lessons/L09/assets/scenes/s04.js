// s04 — Posting. T1 in slow motion (journal card below, ledger page above): the Cash debit strip lifts off and lands on Cash's LEFT page, then the
// Capital credit strip lands on Capital's RIGHT page; Khata ticks the journal lines. Then the montage: 33 coloured strips (T2–T17) fly from the
// journal stack to 14 little open books (blue → left page, orange → right page), faster and faster, while the calendar ticks through April.
// T16's `To Cash 3,300` strip splits into two rows on landing. Everything stops dead on the last strip.
(function () {
  const ENTRIES = [   // T2..T17: [date day, [[book, side, amount], …]]
    [1, [["Cash", "L", 30000], ["Loan from Ravi Mama", "R", 30000]]],
    [2, [["Equipment", "L", 36000], ["Cash", "R", 36000]]],
    [2, [["Stock", "L", 6000], ["Cash", "R", 6000]]],
    [3, [["Stock", "L", 8000], ["Gopal Dairy", "R", 8000]]],
    [5, [["Rent", "L", 5000], ["Cash", "R", 5000]]],
    [15, [["Cash", "L", 18000], ["Sales", "R", 18000]]],
    [15, [["Bank", "L", 15000], ["Cash", "R", 15000]]],
    [16, [["Infotech", "L", 6000], ["Sales", "R", 6000]]],
    [20, [["Gopal Dairy", "L", 5000], ["Cash", "R", 5000]]],
    [22, [["Cash", "L", 4000], ["Advance from customer", "R", 4000]]],
    [25, [["Bank", "L", 4000], ["Infotech", "R", 4000]]],
    [30, [["Cash", "L", 22000], ["Sales", "R", 22000]]],
    [30, [["Infotech", "L", 4000], ["Sales", "R", 4000]]],
    [30, [["Salary", "L", 8000], ["Bank", "R", 8000]]],
    [30, [["Loan from Ravi Mama", "L", 3000], ["Interest", "L", 300], ["Cash", "R", 3300]]],
    [30, [["Drawings", "L", 3000], ["Cash", "R", 3000]]],
  ];
  const BOOKS = ["Cash", "Bank", "Infotech", "Stock", "Equipment", "Loan from Ravi Mama", "Gopal Dairy", "Advance from customer", "Capital", "Drawings", "Sales", "Rent", "Salary", "Interest"];
  window.L9.POSTING = { ENTRIES, BOOKS, gap: (i) => 0.37 - 0.25 * (i / 32), FLY: 0.55 };

  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    L9.stage(svg, C.teal, 880);
    const cal = L9.cal(svg, 1);

    // ================================================================ T1 in slow motion
    const jc = K.journalCard(svg, 960, 1052, 1, { rows: 3, hidden: true });
    const lpC = K.ledgerPage(svg, 960, 622, 1, { account: "Cash", icon: "coins", rows: 2, hidden: true });
    const lpK = K.ledgerPage(svg, 960, 622, 1, { account: "Capital", icon: "banknote", rows: 2, hidden: true });
    const tintOf = (lp, side, col) => { const p = lp.pages[side]; const r = K.paper(lp.body, K.cutRect(p.x0, p.y0, p.w, p.h, 1.2, 26), col, { opacity: 0 }); r.setAttribute("style", "mix-blend-mode:multiply"); return r; };
    const tC = [tintOf(lpC, "dr", C.dr), tintOf(lpC, "cr", C.cr)], tK = [tintOf(lpK, "dr", C.dr), tintOf(lpK, "cr", C.cr)];
    const postChip = L9.chip(svg, 1560, 190, "Posting", { size: 66, w: 310 });
    const stripPos = (i) => { const p = jc.cellPos(i, "date"); return { x: p.x - 75 + 380, y: p.y }; };
    const sp0 = stripPos(0), sp1 = stripPos(1);
    const st1 = K.journalStrip(svg, sp0.x, sp0.y, 1, { date: "Apr 1", account: "Cash", dr: 50000, hidden: true });
    const st2 = K.journalStrip(svg, sp1.x, sp1.y, 1, { account: "Capital", cr: 50000, hidden: true });

    // ================================================================ montage set: journal stack, 14 mini books, strips
    const stack = L9.node(svg, 230, 520); L9.hide(stack);
    for (let k = 3; k >= 1; k--) K.tex(K.shadow(stack, 1), K.cutRect(-170 + k * 8, -200 + k * 8, 340, 400, 2, 22), "pat-paper");
    K.tex(K.shadow(stack, 2), K.cutRect(-170, -200, 340, 400, 2, 22), "pat-paper");
    K.paper(stack, K.cutRect(-162, -192, 324, 72, 1.5, 22), C.red);
    K.text(stack, 0, -154, "Journal", { size: 46, weight: 800, color: C.cream });
    for (let k = 0; k < 6; k++) K.ink(stack, [[-130, -88 + k * 52], [130, -88 + k * 52]], 3, "#a39684", { opacity: 0.6 });
    const cnt = K.ticker(svg, 230, 800, 1, { value: 1, size: 66, chip: true, w: 330, h: 104, edge: C.ink, prefix: "", suffix: " / 17", hidden: true });
    const chk = K.tickMark(svg, 105, 800, 1.3, { hidden: true });
    const mbooks = {};
    const COLX = (c) => 690 + c * 265, ROWY = (r) => 285 + r * 282;
    const bookAt = BOOKS.map((nm, i) => ({ x: COLX(i % 5), y: ROWY(Math.floor(i / 5)) }));
    BOOKS.forEach((nm, i) => {
      const { x, y } = bookAt[i];
      const n = L9.node(svg, x, y); L9.hide(n);
      K.tex(K.shadow(n, 1), K.cutRect(-122, -66, 244, 132, 2, 22), "pat-cover");
      K.paper(n, K.cutRect(-122, -66, 244, 132, 2, 22), C.red, { opacity: 0.3 });
      [-1, 1].forEach((sd) => {
        K.tex(n, K.cutRect(sd < 0 ? -114 : 4, -58, 110, 116, 1.2, 18), "pat-paper");
        K.paper(n, K.cutRect(sd < 0 ? -114 : 4, -58, 110, 14, 0.6, 12), sd < 0 ? C.dr : C.cr);
      });
      K.ink(n, [[0, -58], [0, 58]], 5, C.redDark, { opacity: 0.6 });
      const parts = nm === "Loan from Ravi Mama" ? ["Loan from", "Ravi Mama"] : nm === "Advance from customer" ? ["Advance from", "customer"] : [nm];
      const lw = Math.max(...parts.map((p) => p.length)) * 18.5 + 30, lh = parts.length * 38 + 14;
      const lab = K.g(n, { transform: `translate(0 ${66 + lh / 2 + 8})` });
      K.tex(K.shadow(lab, 1), K.cutRect(-lw / 2, -lh / 2, lw, lh, 1.2, 16), "pat-paper");
      parts.forEach((p, k) => K.text(lab, 0, (k - (parts.length - 1) / 2) * 38 + 2, p, { size: 34, weight: 700 }));
      const flash = K.paper(n, K.cutRect(-114, -58, 228, 116, 1, 20), C.cream, { opacity: 0 });
      mbooks[nm] = { n, x, y, L: 0, R: 0, flash, lines: [] };
    });
    L9.allow(svg);
    const addLine = (b, side, t) => {
      const k = side === "L" ? b.L++ : b.R++, px = side === "L" ? -106 : 12, yy = -34 + 9 * Math.min(k, 9);
      const ln = K.ink(b.n, [[px, yy], [px + 94, yy]], 5, side === "L" ? C.dr : C.cr);
      tl.fromTo(ln, { opacity: 0, scaleX: 0, svgOrigin: `${px} ${yy}` }, { opacity: 1, scaleX: 1, svgOrigin: `${px} ${yy}`, duration: 0.14, ease: "power2.out", immediateRender: false }, t);
      tl.fromTo(b.flash, { opacity: 0 }, { opacity: 0.8, duration: 0.05, immediateRender: false }, t);
      tl.to(b.flash, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.06);
    };

    // ======================================================================================= timeline — s04a
    const tJ = cue("s04a", "@journal");
    jc.enter(tl, tJ - 0.1);
    const e1 = jc.entry(tl, tJ + 0.3, { date: "Apr 1", lines: [{ account: "Cash", dr: 50000, tag: "real_in" }, { account: "Capital", cr: 50000, tag: "personal_giver" }], speed: 1.6 });
    lpC.enter(tl, tJ + 0.5);
    L9.drop(tl, postChip.n, cue("s04a", "@posting") - 0.1, { dur: 0.35 });
    const flashTint = (r, t, hold = 1.1) => { tl.fromTo(r, { opacity: 0 }, { opacity: 0.45, duration: 0.25, ease: "power2.out", immediateRender: false }, t); tl.to(r, { opacity: 0, duration: 0.4 }, t + hold); };
    const tD = cue("s04a", "@debit"), tL = cue("s04a", "@left"), tCr = cue("s04a", "@credit"), tR = cue("s04a", "@right");
    jc.highlightRow(tl, tD - 0.1, 0, { hold: 1.2 }); flashTint(tC[0], tL - 0.15);
    jc.highlightRow(tl, tCr - 0.1, 1, { hold: 1.2 }); flashTint(tC[1], tR - 0.15);

    // ---------------- s04b — T1, slow
    const tCash = cue("s04b", "@cash"), tDeb = cue("s04b", "@debit"), tLeft = cue("s04b", "@left");
    st1.enter(tl, tCash - 0.1, { dur: 0.2 });
    K.pulseNode(tl, st1.body, tCash + 0.25, 1.05);
    const land1 = tLeft - 0.9;
    st1.flyTo(tl, tDeb + 0.35, ...(() => { const p = lpC.cellPos("dr", 0, "other"); return [p.x + 40, p.y]; })(), { dur: Math.max(0.9, land1 - tDeb - 0.35), k: 0.5 });
    const row1 = lpC.post(tl, land1 + 0.1, "dr", { date: "Apr 1", other: "Capital", amount: 50000, count: 0.8 });
    st1.exit(tl, land1 + 0.1, { dur: 0.12 });
    flashTint(tC[0], tLeft - 0.15);
    // the Capital book takes over; the credit strip lands on its right page
    const tCap = cue("s04b", "@capital"), tCred = cue("s04b", "@credit"), tRight = cue("s04b", "@right");
    lpC.exit(tl, tCap - 0.6); lpK.enter(tl, tCap - 0.4);
    st2.enter(tl, tCap - 0.1, { dur: 0.2 });
    K.pulseNode(tl, st2.body, tCap + 0.3, 1.05);
    const land2 = tRight - 0.9;
    st2.flyTo(tl, tCred + 0.35, ...(() => { const p = lpK.cellPos("cr", 0, "other"); return [p.x + 40, p.y]; })(), { dur: Math.max(0.9, land2 - tCred - 0.35), k: 0.5 });
    const row2 = lpK.post(tl, land2 + 0.1, "cr", { date: "Apr 1", other: "Cash", amount: 50000, count: 0.8 });
    st2.exit(tl, land2 + 0.1, { dur: 0.12 });
    flashTint(tK[1], tRight - 0.15);
    // "beside each amount, the date and the OTHER account" — highlight the cells, then the tick
    const tDate = cue("s04b", "@date"), tOther = cue("s04b", "@other");
    row2.hl(tl, tDate, { hold: 0.9 }); row2.hl(tl, tOther + 0.1, { hold: 1.2 });
    const tTick = cue("s04b", "@ticks");
    jc.tick(tl, tTick, e1.lines[0]); jc.tick(tl, tTick + 0.5, e1.lines[1]);
    lpK.tick(tl, tTick + 0.9, row2);

    // ---------------- s04c — the montage
    const tNow = cue("s04c", "@now");
    const tOut = cue("s04b", "@twice") + 1.0;
    jc.exit(tl, tOut); lpK.exit(tl, tOut); postChip.n && L9.lift(tl, postChip.n, tOut);
    L9.drop(tl, stack, tNow, { dur: 0.35 }); cnt.enter(tl, tNow + 0.1); chk.enter(tl, tNow + 0.1);
    BOOKS.forEach((nm, i) => L9.drop(tl, mbooks[nm].n, tNow + 0.05 + i * 0.05, { dur: 0.3 }));
    // 33 strips: launch gaps shrink 0.40 → 0.13 s (2/s → 5/s)
    const P = L9.POSTING;
    let tLaunch = tNow + 0.9, n = 0, posted = 1;
    ENTRIES.forEach(([day, lines], ei) => {
      cal.tickTo(tl, tLaunch - 0.05, Math.max(day, cal.cur), { dur: 0.35 });
      lines.forEach(([book, side, amt], li) => {
        const b = mbooks[book], tl0 = tLaunch;
        const s = L9.node(svg, 230, 520); L9.hide(s);
        const col = side === "L" ? C.dr : C.cr;
        K.tex(K.shadow(s, 1), K.cutRect(-85, -26, 170, 52, 1.2, 14), "pat-paper");
        K.paper(s, K.cutRect(-80, -21, 12, 42, 0.6, 10), col);
        K.text(s, 8, 2, K.fmtIN(amt), { size: 34, weight: 800, color: side === "L" ? C.drText : C.crText });
        const tx = b.x + (side === "L" ? -60 : 60), ty = b.y - 4;
        tl.fromTo(s, { autoAlpha: 0, x: 0, y: 0, scale: 1, svgOrigin: O }, { autoAlpha: 1, duration: 0.05, immediateRender: false }, tl0);
        tl.to(s, { x: tx - 230, duration: P.FLY, ease: "power2.inOut" }, tl0);
        tl.to(s, { y: ty - 520 - 50, duration: P.FLY * 0.45, ease: "power2.out" }, tl0);
        tl.to(s, { y: ty - 520, duration: P.FLY * 0.55, ease: "power2.in" }, tl0 + P.FLY * 0.45);
        tl.to(s, { scale: 0.45, svgOrigin: O, duration: P.FLY, ease: "power2.inOut" }, tl0);
        const tLand = tl0 + P.FLY;
        tl.to(s, { autoAlpha: 0, duration: 0.06 }, tLand);
        addLine(b, side, tLand);
        if (book === "Cash" && amt === 3300) {      // T16's one credit strip splits into two rows (paper tear + cream flash)
          addLine(b, side, tLand + 0.2);
          [-1, 1].forEach((sd) => {
            const h = L9.node(svg, b.x + 60, b.y - 4); L9.hide(h);
            K.tex(K.shadow(h, 1), K.cutRect(-36, -12, 72, 24, 0.8, 10), "pat-paper"); K.paper(h, K.cutRect(-34, -10, 6, 20, 0.3, 6), C.cr);
            tl.fromTo(h, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: sd * 16, duration: 0.15, ease: "power2.out", immediateRender: false }, tLand);
            tl.to(h, { autoAlpha: 0, duration: 0.12 }, tLand + 0.36);
          });
        }
        if (li === lines.length - 1) { posted++; cnt.to(tl, tLand, posted, 0.2); }
        tLaunch += P.gap(n++);
      });
    });
    chk.draw(tl, tLaunch + 0.2);
    cnt.pulse(tl, tLaunch + 0.2);
  };
})();

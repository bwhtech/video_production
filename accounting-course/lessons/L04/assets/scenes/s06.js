// s06 — Profit belongs to the owner. Phase 1: inside the `?` pocket — a Revenue slip (₹18,000) and an Expense slip (₹5,000) on cream paper;
// "What's left?" (1.8 s of stillness) → ₹13,000; the `?` flips to `Profit`. Phase 2: pull back — the pocket sits on the Equity card on the right
// pan, next to Capital; Ravi Mama and Gopal hold their fixed tags; the expanded equation A = L + Capital + Revenue − Expenses slides in.
// ₹13,000 and the Profit chip sit on NEUTRAL cream paper (never green).
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    const T0 = sc.start;
    K.wall(svg, C.leaf, 860); K.table(svg, 860);
    const POCKET = [960 + 380 + 0.72 * 113, 560];             // pocket-2 centre on the hero card (world), pull-back anchor

    // ====================================================================================== phase 2 (built first → sits underneath)
    const p2 = K.g(svg, { id: "s06-p2" });
    const hud = K.scaleRig(p2, 960, 890, 1.0, { tint: true, L: 101000, R: 101000 });
    const P = L4.pans(hud, K, { cash: 51000 });
    const eq = P.eq;
    P.ravi.body.setAttribute("opacity", "0"); P.gopal.body.setAttribute("opacity", "0");   // they stand beside the pan instead
    gsap.set(eq.card, { autoAlpha: 1 }); gsap.set(eq.tag, { autoAlpha: 0 });
    eq.list.forEach((p) => gsap.set(p.wrap, { autoAlpha: 1 }));
    eq.slip(tl, T0, "Profit", -5000, { icon: "key", from: [0, 0], dur: 0.01 });
    eq.slip(tl, T0 + 0.05, "Profit", 18000, { icon: "coffee", from: [0, 0], dur: 0.01 });
    eq.namePocket(tl, T0 + 0.1, "Profit", { value: 13000 });
    hud.equation(tl, T0, "₹1,01,000 = ₹38,000 + ₹63,000");
    // people with their fixed tags
    const ravi = K.raviMama(p2, 1690, 1000, 0.62, { expr: "proud" });
    const gopal = K.gopal(p2, 1840, 1000, 0.62, { expr: "happy" });
    const rt = K.claimTag(p2, 1690, 868, 0.5, { face: "ravi", amount: 30000, size: 50 });
    const gt = K.claimTag(p2, 1840, 868, 0.5, { face: "gopal", amount: 8000, size: 50 });
    const meera = K.meera(p2, 150, 1000, 0.66, { expr: "proud", aL: [40, -66], aR: [40, -66] });
    // expanded equation strip (own terms, drop-and-place left → right)
    const eqN = L4.node(p2, 960, 942);
    const terms = [["A", C.drText, 52], ["=", C.ink, 52], ["L", C.crText, 52], ["+", C.ink, 52], ["Capital", C.crText, 190], ["+", C.ink, 52], ["Revenue", C.crText, 214], ["−", C.ink, 52], ["Expenses", C.crText, 236]];
    const stripW = 1120;
    K.tex(K.shadow(eqN.inner, 1), K.cutRect(-stripW / 2, -48, stripW, 96, 2, 24), "pat-paper");
    let cx = -stripW / 2 + 40; const termNodes = [], termX = [];
    terms.forEach(([t, col, w], i) => {
      const n = L4.node(eqN.inner, cx + w / 2, 3);
      K.text(n.inner, 0, 0, t, { size: 54, weight: 800, color: col });
      n.outer.setAttribute("opacity", "0");
      termNodes.push(n); termX.push(cx + w / 2); cx += w + 14;
    });
    eqN.outer.setAttribute("opacity", "0");
    // bracket under Capital + Revenue − Expenses, labelled Equity
    const bx0 = termX[4] - 100, bx1 = termX[8] + 118;
    const brk = L4.node(p2, 0, 0); brk.outer.setAttribute("opacity", "0");
    K.ink(brk.inner, [[bx0, 1000], [bx0, 1012], [bx1, 1012], [bx1, 1000]].map(([x, y]) => [x + 960, y]), 6, C.ink);
    const eqLab = L4.chip(p2, 960 + (bx0 + bx1) / 2, 1042, "Equity", { bg: C.cr, size: 36 });
    eqLab.outer.setAttribute("opacity", "0");
    const ring = K.el("path", { d: K.cutRect(-120, -250, 240, 262, 0.8, 30), fill: "none", stroke: C.gold, "stroke-width": 9, opacity: 0 }, hud.pans.R.g);
    gsap.set(p2, { autoAlpha: 0 });

    // ====================================================================================== phase 1 (on top)
    const p1 = K.g(svg, { id: "s06-p1" });
    const panel = K.g(p1, {});
    const PX = 960, PY = 570;
    K.paper(K.shadow(panel, 2), K.cutRect(PX - 650, PY - 360, 1300, 720, 2.4, 30), "#cdb691");       // pocket interior (kraft)
    K.tex(panel, K.cutRect(PX - 626, PY - 336, 1252, 672, 2, 28), "pat-paper");                       // cream paper inside
    const tab = L4.node(p1, PX, PY - 360);
    K.tex(K.shadow(tab.inner, 2), K.cutRect(-200, -72, 400, 144, 2, 26), "pat-paper");
    const q = K.g(tab.inner, {});
    K.text(q, 0, 8, "?", { size: 120, weight: 800, color: C.cr });
    const nameG = K.g(tab.inner, { opacity: 0 });
    K.text(nameG, 0, -24, "Profit", { size: 54, weight: 800 });
    const pT = K.ticker(nameG, 0, 30, 1, { value: 0, size: 62, color: C.ink });
    const slip = (x, title, val, name) => {
      const n = L4.node(p1, x, PY - 70);
      K.card(n.inner, 0, 0, 460, 330, { header: C.cr, title, titleSize: 50, headerH: 84, shadow: 2 });
      const tk = K.ticker(n.inner, 0, 52, 1, { value: 0, size: 96, color: val < 0 ? C.coralText : C.crText });
      n.outer.setAttribute("opacity", "0");
      return { n, tk };
    };
    const rev = slip(PX - 270, "Revenue", 18000), exp = slip(PX + 270, "Expense", -5000);
    const strip = L4.node(p1, PX - 270, PY + 70);                    // the 5,000-wide strip that tears off the revenue slip
    K.tex(K.shadow(strip.inner, 1), K.cutRect(-210, -34, 420, 68, 3, 14), "pat-paper"); strip.outer.setAttribute("opacity", "0");
    const res = L4.node(p1, PX, PY + 250);
    K.tex(K.shadow(res.inner, 2), K.cutRect(-560, -86, 1120, 172, 2, 28), "pat-paper");
    const r1 = K.ticker(res.inner, -385, 0, 1, { value: 0, size: 80, color: C.crText });
    const rm = K.text(res.inner, -188, 4, "−", { size: 80, weight: 800 });
    const r2 = K.ticker(res.inner, -15, 0, 1, { value: 0, size: 80, color: C.coralText });
    const re = K.text(res.inner, 150, 4, "=", { size: 80, weight: 800 });
    const r3 = K.ticker(res.inner, 365, 0, 1, { value: 0, size: 96, color: C.ink });
    res.outer.setAttribute("opacity", "0"); [r1.body, r2.body, r3.body, rm, re].forEach((e) => e.setAttribute("opacity", "0"));

    // ===================================================================================== timeline
    // phase 1
    const tPeek = cue("s06a", "@pocket"), tRevW = cue("s06a", "@revenue"), tEx = cue("s06a", "@expense"), tLeft = cue("s06a", "@left");
    K.dropIn(tl, tab.inner, T0 + 0.3, { dur: 0.34 }); L4.show(tl, tab.outer, T0 + 0.3);
    const tRev = cue("s06a", "@eighteen");
    L4.show(tl, rev.n.outer, tRev); K.dropIn(tl, rev.n.inner, tRev, { dur: 0.36 }); rev.tk.to(tl, tRev + 0.1, 18000, 0.7);
    const tExp = cue("s06a", "@five");
    L4.show(tl, exp.n.outer, tExp); K.dropIn(tl, exp.n.inner, tExp, { dur: 0.36 }); exp.tk.to(tl, tExp + 0.1, -5000, 0.6);
    // "What's left?" — everything holds still; then the subtraction
    const tThirteen = cue("s06b", "@thirteen");
    const tCut = tThirteen - 0.55;
    tl.to(exp.n.inner, { x: -540, duration: 0.5, ease: "power2.inOut" }, tCut);                       // expense slides onto the revenue slip
    L4.show(tl, strip.outer, tCut + 0.5);
    tl.to(strip.inner, { y: 230, rotation: 12, opacity: 0, duration: 0.55, ease: "power2.in" }, tCut + 0.6);   // a paper strip tears off and falls
    tl.to(rev.n.inner, { scaleY: 0.72, svgOrigin: `0 ${-165}`, duration: 0.3, ease: "power2.out" }, tCut + 0.55);
    tl.to(exp.n.inner, { autoAlpha: 0, duration: 0.25 }, tCut + 0.7);
    L4.show(tl, res.outer, tThirteen); K.dropIn(tl, res.inner, tThirteen, { dur: 0.34 });
    [r1.body, r2.body, r3.body, rm, re].forEach((e, i) => { tl.set(e, { opacity: 1 }, tThirteen + 0.05); });
    r1.to(tl, tThirteen + 0.05, 18000, 0.4); r2.to(tl, tThirteen + 0.05, 5000, 0.4); r3.to(tl, tThirteen + 0.2, 13000, 0.8);
    // "Now the pocket has a name" — the `?` flips to Profit (holds ≥ 1.0 s)
    const tName = cue("s06b", "@name") - 0.5;
    tl.to(q, { scaleX: 0.05, svgOrigin: "0 0", duration: 0.17, ease: "power1.in" }, tName);
    tl.set(q, { opacity: 0 }, tName + 0.17); tl.set(nameG, { opacity: 1 }, tName + 0.17);
    tl.fromTo(nameG, { scaleX: 0.05, svgOrigin: "0 0" }, { scaleX: 1, svgOrigin: "0 0", duration: 0.18, ease: "power1.out", immediateRender: false }, tName + 0.17);
    pT.to(tl, tName + 0.4, 13000, 0.6);
    // pull back: phase 1 shrinks into the pocket, phase 2 (the scale) comes into view
    const tPull = cue("s06b", "@look") - 0.35;
    tl.to(p1, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, tPull);
    tl.to(panel, { scale: 0.86, svgOrigin: `${PX} ${PY}`, duration: 0.8, ease: "power2.in" }, tPull);
    tl.fromTo(p2, { autoAlpha: 0, scale: 2.2, svgOrigin: `${POCKET[0]} ${POCKET[1]}` }, { autoAlpha: 1, scale: 1, svgOrigin: `${POCKET[0]} ${POCKET[1]}`, duration: 1.3, ease: "power2.inOut", immediateRender: false }, tPull);
    // phase 2 acting: people nod with their tags; Meera is proud
    const tFixed = cue("s06b", "@fixed"), tOwner = cue("s06b", "@owner");
    meera.blinks(tl, tPull + 1, sc.end, 3.3);
    ravi.headTilt(tl, cue("s06b", "@ravi"), 5).headTilt(tl, cue("s06b", "@ravi") + 0.5, 0);
    gopal.headTilt(tl, cue("s06b", "@gopal"), -5).headTilt(tl, cue("s06b", "@gopal") + 0.5, 0);
    const tOwn = cue("s06b", "@belongs");
    tl.fromTo(ring, { opacity: 0 }, { opacity: 1, duration: 0.15, immediateRender: false }, tOwn - 0.2);
    tl.to(ring, { opacity: 0, duration: 0.35 }, tOwn + 1.4);
    eq.light(tl, tOwn - 0.2, "Profit", { hold: 1.2 });
    meera.expr(tl, tOwn, "grin");
    // s06c — the equation gets longer
    const tLonger = cue("s06c", "@longer"), tAssets = cue("s06c", "@assets");
    tl.to(hud.eqG, { autoAlpha: 0, duration: 0.2 }, tLonger - 0.2);
    L4.show(tl, eqN.outer, tLonger); K.dropIn(tl, eqN.inner, tLonger, { dur: 0.34 });
    const tw = [["@assets", 0], ["@equal", 1], ["@liabilities", 2], ["@plus", 3], ["@capital", 4], ["@plus", 5, 2], ["@revenue", 6], ["@minus", 7], ["@expenses", 8]];
    tw.forEach(([w, i, nth]) => { const t = cue("s06c", w, nth || 1); L4.show(tl, termNodes[i].outer, t); K.dropIn(tl, termNodes[i].inner, t, { dur: 0.28 }); });
    const tExpenses = cue("s06c", "@expenses");
    L4.show(tl, brk.outer, tExpenses + 0.3);
    tl.fromTo(brk.inner, { scaleX: 0.05, svgOrigin: `${960 + (bx0 + bx1) / 2} 1012` }, { scaleX: 1, svgOrigin: `${960 + (bx0 + bx1) / 2} 1012`, duration: 0.5, ease: "power2.out", immediateRender: false }, tExpenses + 0.3);
    L4.show(tl, eqLab.outer, tExpenses + 0.6); K.dropIn(tl, eqLab.inner, tExpenses + 0.6, { dur: 0.3 });
    K.pulseNode(tl, hud.body, cue("s06c", "@same"), 1.03);
  };
})();

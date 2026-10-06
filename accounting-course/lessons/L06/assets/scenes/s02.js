// s02 — Last time. Three question cards (L5's Your-Turn) are answered one by one, then Aman's two-needle table (A5–A9).
//   card 1 catering advance → Liability · card 2 paying Gopal → ✗ Expense, Liability ↓ · card 3 Infotech 6,000 − 4,000 = 2,000
//   Aman: only A5 (cash sale) and A6 (rent) move BOTH needles → Profit ₹8,500.
// In:  s01t pushes into a page showing #s02-first at 1/3 scale (stage + calendar + three card backs; art hidden by DOM attributes).
// Out: the ₹8,500 profit chip flies to centre and flips over — its back is the SMS card; cream fills in → s03 (owns its seam-in).
(function () {
  window.OWN_SEAM_IN.s03 = true;

  // half-dial gauge with a swinging needle (kit gauge has a fixed needle)
  L6.gauge = (K, parent, x, y, r) => {
    const C = K.C, grp = K.g(parent, { transform: `translate(${x} ${y})` });
    K.tex(K.shadow(grp, 2), K.cutPoly([...K.arc(0, 0, r, Math.PI, Math.PI * 2, 18), [r, 22], [-r, 22]], 2, 20), "pat-paper");
    [-60, -30, 0, 30, 60].forEach((d) => { const a = ((d - 90) * Math.PI) / 180; K.ink(grp, [[Math.cos(a) * r * 0.74, Math.sin(a) * r * 0.74], [Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9]], 5); });
    const needle = K.g(grp, {});
    K.paper(K.shadow(needle, 1), K.cutStroke([[0, 0], [0, -r * 0.78]], 11, 0.8), C.red);
    K.paper(grp, K.cutEll(0, 0, 15, 15, 1), C.ink);
    return { g: grp, needle };
  };

  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    const world = K.g(svg, { id: "s02-first" });
    L6.stage(K, world, C.teal, 880);
    L6.cal(K, world, 1);
    const CY = 530, CW = 500, CH = 640, CX = [350, 960, 1570];

    // ---- three card backs (visible from the first frame) with their number badges
    const mkCard = (i) => {
      const n = L6.node(K, world, CX[i], CY);
      K.tex(K.shadow(n, 2), K.cutRect(-CW / 2, -CH / 2, CW, CH, 2, 24), "pat-paper");
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 52, -CH / 2 + 52, 40, 40, 1), C.saffron);
      K.text(n, -CW / 2 + 52, -CH / 2 + 56, String(i + 1), { size: 52, weight: 800, color: C.ink });
      return { n, art: L6.hide(K.g(n, {})) };
    };
    const cards = [0, 1, 2].map(mkCard);
    const qAt = (parent, x, y, s) => { const q = L6.hide(L6.node(K, parent, x, y)); K.qmark(q, 0, 0, s, C.dr); return q; };

    // ---- card 1: catering advance, May 5, ₹4,000 → Liability
    const a1 = cards[0].art;
    const leaf = L6.node(K, a1, -100, -150);
    K.tex(K.shadow(leaf, 1), K.cutRect(-70, -80, 140, 160, 2, 20), "pat-paper");
    K.paper(leaf, K.cutRect(-70, -80, 140, 52, 1.4, 18), C.coral);
    K.text(leaf, 0, -52, "May", { size: 38, weight: 800, color: "#ffffff" });
    K.text(leaf, 0, 22, "5", { size: 96, weight: 800 });
    L6.allow(leaf);
    const pot = L6.node(K, a1, 100, -90); K.kettle(pot, 0, 0, 1.15);
    const tk1 = K.ticker(a1, 0, 70, 1, { value: 0, size: 66, chip: true, w: 300, h: 92, edge: C.dr });
    const q1 = qAt(a1, 180, -190, 1.3);
    const mini1 = L6.hide(L6.node(K, a1, 0, 148)); K.scale(mini1, 0, 40, 0.1, { rightTint: C.cr });
    const lab1 = L6.hide(L6.node(K, a1, 0, 222)); K.label(lab1, 0, 0, "Liability", { size: 56, bg: C.cr, rot: -2 });

    // ---- card 2: Gopal's milk, ₹5,000 leaves the galla → not an expense, Liability ↓
    const a2 = cards[1].art;
    const cans = K.milkCans(L6.node(K, a2, -110, 10), 0, 0, 1.0);
    const gal = K.galla(a2, 120, 62, 0.62, { open: true, overflow: true });
    const coin = L6.rig(K, a2, 0, 0); L6.hide(coin.inner); K.coin(coin.inner, 0, 0, 28);
    const tk2 = K.ticker(a2, 0, 100, 1, { value: 0, size: 66, chip: true, w: 300, h: 92, edge: C.dr });
    const q2 = qAt(a2, 180, -200, 1.3);
    const exp = L6.hide(L6.node(K, a2, 0, -210)); K.label(exp, 0, 0, "Expense", { size: 50, bg: C.coral, rot: 2 });
    const lab2 = L6.hide(L6.node(K, a2, -24, 222)); K.label(lab2, 0, 0, "Liability", { size: 56, bg: C.cr, rot: -2 });
    const dn = L6.hide(L6.node(K, a2, 154, 222)); L6.arrow(K, dn, 0, 0, "down", C.cr, 64, 24);

    // ---- card 3: Infotech owes ₹6,000, pays ₹4,000 → ₹2,000
    const a3 = cards[2].art;
    const inf = L6.node(K, a3, -90, -150);
    K.tex(K.shadow(inf, 1), K.cutEll(0, 0, 76, 76, 1.4), "pat-paper"); K.faceArt(inf, "infotech", 64);
    const q3 = qAt(a3, 150, -190, 1.3);
    const c6 = L6.hide(L6.node(K, a3, 0, -20)); L6.chip(K, c6, "₹6,000", { size: 56, bg: C.cream, w: 260, h: 76 });
    const c4 = L6.hide(L6.node(K, a3, 0, 70)); L6.chip(K, c4, "−₹4,000", { size: 56, bg: C.coral, w: 260, h: 76 });
    const tk3 = K.ticker(a3, 0, 205, 1, { value: 0, size: 76, chip: true, w: 300, h: 100, edge: C.dr });
    tk3.body.setAttribute("opacity", "0");

    // ---- Aman + the two-needle table (A5–A9)
    const aman = K.aman(svg, -240, 1005, 0.78, { expr: "happy" });
    const TX = 1190, TY = 540;
    const tab = L6.hide(L6.node(K, svg, TX, TY));
    K.tex(K.shadow(tab, 2), K.cutRect(-440, -350, 880, 700, 2, 24), "pat-paper");
    const gP = L6.gauge(K, tab, -40, -220, 92), gC = L6.gauge(K, tab, 250, -220, 92);
    K.text(tab, -40, -150, "Profit", { size: 44, weight: 800 }); K.text(tab, 250, -150, "Cash", { size: 44, weight: 800 });
    const ROWS = [["A5", "+9,000", "+9,000"], ["A6", "−2,000", "−2,000"], ["A7", "+1,500", "0"], ["A8", "0", "−2,000"], ["A9", "0", "+1,000"]];
    const rowN = ROWS.map(([id, p, c], i) => {
      const n = L6.hide(L6.node(K, tab, 0, -76 + i * 66));
      const hi = K.paper(n, K.cutRect(-410, -29, 820, 58, 1.4, 20), C.saffron, { opacity: 0 });
      K.text(n, -360, 2, id, { size: 44, weight: 800, anchor: "start" });
      K.text(n, 30, 2, p, { size: 46, weight: 800, anchor: "end" });
      K.text(n, 320, 2, c, { size: 46, weight: 800, anchor: "end" });
      return { n, hi };
    });
    L6.allow(tab);
    // cream plate for the seam (above everything so far; the flipping chip + SMS card sit on top of it)
    const cream = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.cream, opacity: 0 }, svg);
    const foot = L6.rig(K, svg, TX, TY + 282); const footN = L6.hide(foot.inner);
    K.label(footN, -150, 0, "Profit", { size: 40, bg: C.sky });
    const tkF = K.ticker(footN, 50, 0, 1, { value: 0, size: 58, chip: true, w: 250, h: 78, edge: C.dr });
    // the SMS card (back of the profit chip)
    const smsR = L6.rig(K, svg, 960, 540); L6.hide(smsR.inner);
    K.smsCard(smsR.inner, 0, 0, 300, 210, { kind: "CREDITED", amount: "₹15,000" });
    gsap.set(smsR.sc, { scale: 1.5, svgOrigin: O });

    // ======================================================================================= timeline
    const art = (i, t) => K.dropIn(tl, cards[i].art, t, { dur: 0.36 });
    // Q1
    const tQ1 = cue("s02a", "@one");
    art(0, tQ1);
    tk1.to(tl, cue("s02a", "@thousand"), 4000, 0.7);
    K.dropIn(tl, q1, cue("s02a", "@april's"), { dur: 0.3 });
    // A1
    const tA1 = segStart("s02b");
    K.liftOff(tl, q1, tA1 - 0.05, { dur: 0.15 });
    K.dropIn(tl, mini1, tA1 + 0.5, { dur: 0.3 }); K.dropIn(tl, lab1, tA1 + 0.05, { dur: 0.34 });
    K.pulseNode(tl, lab1, cue("s02b", "@liability"), 1.07);
    // Q2
    const tQ2 = cue("s02c", "@two");
    art(1, tQ2);
    K.dropIn(tl, q2, cue("s02c", "@expense") - 0.1, { dur: 0.3 });
    const tCoin = cue("s02c", "@five");
    tl.set(coin.inner, { opacity: 1 }, tCoin - 0.05);
    L6.arcFly(tl, coin, tCoin - 0.05, 0.8, [510, 580], [405, 560], 110);
    tl.to(coin.inner, { opacity: 0, duration: 0.12 }, tCoin + 0.78);
    tk2.to(tl, tCoin + 0.2, 5000, 0.7);
    tl.fromTo(exp, { autoAlpha: 0, scale: 1.07, svgOrigin: O }, { autoAlpha: 0.55, scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.out", immediateRender: false }, cue("s02c", "@expense"));
    // A2 — the ✗ stamp on the faded Expense chip, then Liability ↓
    const tA2 = segStart("s02d");
    K.liftOff(tl, q2, tA2 - 0.05, { dur: 0.15 });
    K.stamp(tl, a2, 0, -210, tA2 + 0.05, 0.9);
    K.dropIn(tl, lab2, cue("s02d", "@shrinks") - 0.2, { dur: 0.34 }); K.dropIn(tl, dn, cue("s02d", "@shrinks") + 0.15, { dur: 0.3 });
    // Q3
    const tQ3 = cue("s02e", "@three");
    art(2, tQ3);
    K.dropIn(tl, q3, cue("s02e", "@how") - 0.1, { dur: 0.3 });
    // A3
    const tA3 = segStart("s02f");
    K.liftOff(tl, q3, tA3 - 0.05, { dur: 0.15 });
    tl.set(tk3.body, { opacity: 1 }, tA3 - 0.02); tk3.to(tl, tA3, 2000, 0.8);
    K.dropIn(tl, c6, cue("s02f", "@six"), { dur: 0.3 }); K.dropIn(tl, c4, cue("s02f", "@four"), { dur: 0.3 });
    // Aman's table
    const tAm = segStart("s02g");
    cards.forEach((c, i) => K.liftOff(tl, c.n, tAm - 0.05 + i * 0.08, { dur: 0.25 }));
    aman.walkTo(tl, tAm + 0.1, 330, 1.2);
    aman.expr(tl, cue("s02g", "@aman's"), "happy").look(tl, tAm + 1.2, 6, 0);
    K.dropIn(tl, tab, cue("s02g", "@challenge") - 0.15, { dur: 0.4 });
    rowN.forEach((r, i) => K.dropIn(tl, r.n, cue("s02g", "@only") + i * 0.12, { dur: 0.28 }));
    // A5 + A6 light ("both needles"), the others rest at 70 %
    const tCash = cue("s02g", "@cash"), tRent = cue("s02g", "@rent");
    [2, 3, 4].forEach((i) => tl.to(rowN[i].n, { opacity: 0.55, duration: 0.3 }, tCash - 0.1));
    tl.to(rowN[0].hi, { opacity: 0.55, duration: 0.25 }, tCash);
    tl.to(rowN[1].hi, { opacity: 0.55, duration: 0.25 }, tRent);
    // needles swing (A5 up, then A6 down — both needles together)
    const tBoth = cue("s02g", "@both");
    [gP, gC].forEach((g) => {
      tl.to(g.needle, { rotation: 48, svgOrigin: O, duration: 0.4, ease: "power2.out" }, tCash);
      tl.to(g.needle, { rotation: -40, svgOrigin: O, duration: 0.4, ease: "power2.inOut" }, tRent);
      tl.to(g.needle, { rotation: 22, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, tBoth + 0.4);
    });
    // profit counts up to ₹8,500
    K.dropIn(tl, footN, cue("s02g", "@aman's", 2) - 0.1, { dur: 0.34 });
    tkF.to(tl, cue("s02g", "@eight"), 8500, 1.3);
    // exit: everything else steps away; the profit chip flies to centre and flips — its back is the SMS card
    const tOut = cue("s02g", "@rupees") + 0.1;
    K.liftOff(tl, tab, tOut, { dur: 0.25 });
    aman.walkTo(tl, tOut, -260, 0.9);
    L6.mv(tl, foot, tOut + 0.05, 0.6, { x: 960 - TX, y: 540 - (TY + 282) });
    L6.mv(tl, foot, tOut + 0.05, 0.6, { scale: 1.5 });
    tl.to(cream, { opacity: 1, duration: 0.45, ease: "power1.inOut" }, tOut + 0.3);
    tl.to(foot.sc, { scaleX: 0, svgOrigin: O, duration: 0.14, ease: "power1.in" }, tOut + 0.62);
    tl.set(footN, { opacity: 0 }, tOut + 0.76);
    tl.set(smsR.inner, { opacity: 1 }, tOut + 0.76);
    tl.fromTo(smsR.sc, { scaleX: 0, svgOrigin: O }, { scaleX: 1.5, svgOrigin: O, duration: 0.14, ease: "power1.out", immediateRender: false }, tOut + 0.76);
    aman.blinks(tl, T0 + 1.0, sc.end, 3.4);
  };
})();

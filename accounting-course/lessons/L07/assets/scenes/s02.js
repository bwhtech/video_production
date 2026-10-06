// s02 — Last time (L6's three Your-Turn questions answered on Khata's open pages).
//   card 1 tea/milk/sugar ₹6,000 → Stock (Dr) / Cash (Cr) · card 2 the −Expenses chip hops the equals sign → Rent (Dr) · card 3 dashed imagine card, SMS DEBITED → Bank (Cr)
// In: s01t pushes into a page showing #s02-first at 1/3 scale (identity camera). Initial hidden states are DOM attributes.
// Out: default torn-paper wipe into s03.
(function () {
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    const world = K.g(svg, { id: "s02-first" });
    L7.stage(world, C.teal, 880);
    const cal = L7.cal(world, 25);
    const CX = [290, 760, 1230], CY = 345, CW = 450, CH = 400;

    const mkCard = (i) => {
      const n = L7.node(world, CX[i], CY);
      L7.card(n, CW, CH);
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 40, -CH / 2 + 40, 30, 30, 1), C.saffron);
      K.text(n, -CW / 2 + 40, -CH / 2 + 43, String(i + 1), { size: 40, weight: 800 });
      return { n, art: K.g(n, {}) };
    };
    const cards = [0, 1, 2].map(mkCard);
    cards.forEach((c) => L7.hide(c.n));

    // ---- card 1: tea + milk + sugar, ₹6,000
    const a1 = cards[0].art;
    const items1 = [];
    { const t = L7.node(a1, -110, -36); K.medallion(t, 0, 0, 52, "leaf"); items1.push(t);
      const m = L7.node(a1, 0, -36); K.medallion(m, 0, 0, 52, "milk"); items1.push(m);
      const sg = L7.node(a1, 110, -36); [[-16, 8], [14, 10], [0, -14]].forEach(([x, y], i) => K.paper(K.shadow(sg, 1), K.cutRect(x - 17, y - 17, 34, 34, 1.2, 12), C.cream, { opacity: 1 })); items1.push(sg); }
    items1.forEach(L7.hide);
    const amt1 = K.ticker(a1, 0, 110, 1, { value: 0, size: 62, chip: true, w: 280, h: 90, edge: C.dr });

    // ---- card 2: A = L + E − Exp  →  A + Exp = L + E   (the −Expenses chip hops the equals sign and flips)
    const a2 = L7.node(cards[1].art, 0, 10, 1.25);
    const el2 = [];
    const seq0 = [["A", 56, C.dr], ["=", 34], ["L", 56, C.cr], ["+", 34], ["E", 56, C.cr], ["−Exp", 120, C.coral]];
    const seq1 = [["A", 56, C.dr], ["+", 34], ["Exp", 100, C.dr], ["=", 34], ["L", 56, C.cr], ["+", 34], ["E", 56, C.cr]];
    const layout = (seq) => { const tot = seq.reduce((a, [, w]) => a + w, 0); let x = -tot / 2; return seq.map(([, w]) => { const c = x + w / 2; x += w; return c; }); };
    const x0 = layout(seq0), x1 = layout(seq1);
    // element order: A, =, L, +, E, Exp  (before idx 0..5)  → after: A(0) +(1) Exp(2) =(3) L(4) +(5) E(6)
    const mk2 = (label, w, col, x) => {
      const n = L7.node(a2, x, -10);
      if (col) { K.paper(K.shadow(n, 1), K.cutRect(-w / 2, -32, w, 64, 1.2, 14), col); K.text(n, 0, 2, label, { size: 36, weight: 800, color: K.onColor(col) }); }
      else K.text(n, 0, 2, label, { size: 44, weight: 800 });
      return n;
    };
    const eA = mk2("A", 56, C.dr, x0[0]), eEq = mk2("=", 34, null, x0[1]), eL = mk2("L", 56, C.cr, x0[2]), ePlus = mk2("+", 34, null, x0[3]), eE = mk2("E", 56, C.cr, x0[4]);
    const eExpA = mk2("−Exp", 120, C.coral, x0[5]);            // before-sign version
    const eExpB = mk2("+Exp", 112, C.dr, x1[2]); L7.hide(eExpB);       // after-flip version (placed at its final spot)
    const ePlus2 = mk2("+", 34, null, x1[1]); L7.hide(ePlus2);
    [eA, eEq, eL, ePlus, eE, eExpA, eExpB, ePlus2].forEach((n) => { el2.push(n); L7.hide(n); });
    // `L` + `E` key: tiny sticker under the strip is not needed (letters only)

    // ---- card 3: the dashed imagine card — SMS "DEBITED" (no amount) + a bill
    const imag = K.imagineCard(world, CX[2], CY, CW, CH, { hidden: true });
    L7.hide(cards[2].n);
    K.paper(K.shadow(imag.area.g, 1), K.cutEll(-CW / 2 + 54, -CH / 2 + 66, 30, 30, 1), C.saffron); K.text(imag.area.g, -CW / 2 + 54, -CH / 2 + 69, "3", { size: 40, weight: 800 });
    const sms = L7.node(imag.area.g, 0, 24, 1.3); L7.hide(sms);
    K.smsCard(sms, 0, 0, 270, 196, { kind: "DEBITED", amount: " ", acct: "A/c XX12" });
    const bill = L7.node(imag.area.g, -150, -118); L7.hide(bill); K.medallion(bill, 0, 0, 40, "receipt");
    const bankTag = L7.node(imag.area.g, 150, 130); L7.hide(bankTag); K.medallion(bankTag, 0, 0, 38, "landmark");

    // ---- Khata (open) — the answer surface, bottom centre
    const khata = K.khataRig(world, 760, 1040, 0.98, { expr: "awake" });
    const PL = khata.pageArea.L, PR = khata.pageArea.R;
    const pageLine = (page, i, name, amt, side, chip) => {
      const n = L7.node(page.g, page.x + page.w / 2, page.y + 50 + i * 92); L7.hide(n);
      const col = side === "R" ? C.cr : C.dr;
      K.paper(K.shadow(n, 1), K.cutRect(-152, -38, 304, 76, 1.4, 18), col);
      K.text(n, -140, 2, name, { size: 42, weight: 800, anchor: "start", color: K.onColor(col) });
      let tk = null;
      if (amt !== undefined) tk = K.ticker(n, 142, 2, 1, { value: amt, size: 42, anchor: "end", color: K.onColor(col) });
      if (chip) { K.paper(n, K.cutRect(60, -22, 76, 44, 0.8, 12), C.cream); K.text(n, 98, 2, chip, { size: 32, weight: 800 }); }
      L7.allow(n);
      return { n, tk };
    };
    const lineStock = pageLine(PL, 0, "Stock", 6000, "L"), lineCash = pageLine(PR, 0, "Cash", 6000, "R");
    const lineRent = pageLine(PL, 1, "Rent", undefined, "L"), lineBank = pageLine(PR, 1, "Bank", undefined, "R", "Cr");

    // ---- Meera (right) + the corner HUD scale (level, with Cash + Stock jars on the left pan)
    const m = K.meera(world, 1560, 1010, 0.8, { expr: "thinking" });
    const rig = K.scaleRig(svg, 960, 895, 1.1, { tint: true, L: 88000, R: 88000, equation: true });
    const jC = K.jarRig(rig.pans.L.g, -75, 0, 0.8, { label: "Cash", contents: "coins", fill: 0.6, edge: C.dr });
    const jS = K.jarRig(rig.pans.L.g, 75, 0, 0.8, { label: "Stock", contents: "leaves", fill: 0.6, edge: C.dr });
    const tM = K.claimTag(rig.pans.R.g, -75, 0, 0.6, { face: "meera", size: 54 }), tR = K.claimTag(rig.pans.R.g, 75, 0, 0.6, { face: "ravi", size: 54 });
    rig.g.setAttribute("opacity", "0");
    rig.hud(tl, T0, true, { dur: 0.01, text: 36 });
    tl.set(rig.g, { opacity: 1 }, T0 + 0.05);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); khata.blink(tl, T0 + 2.5); khata.blink(tl, T0 + 20);
    // "One." — card 1 drops; Khata opens
    const tOne = cue("s02a", "@one");
    L7.drop(tl, cards[0].n, tOne - 0.15); khata.open(tl, tOne - 0.1, 0.55); khata.expr(tl, tOne, "happy");
    amt1.to(tl, cue("s02a", "@six"), 6000, 0.8);
    L7.drop(tl, items1[0], cue("s02a", "@tea")); L7.drop(tl, items1[1], cue("s02a", "@milk")); L7.drop(tl, items1[2], cue("s02a", "@sugar"));
    m.expr(tl, cue("s02a", "@debited") - 0.3, "thinking").look(tl, cue("s02a", "@debited"), -6, -3);
    // answer 1 — Debit Stock (left, blue), Credit Cash (right, orange); both are the LEFT pan: a swap, the HUD stays level
    const tStock = cue("s02b", "@stock");
    L7.drop(tl, lineStock.n, tStock - 0.1); lineStock.tk.to(tl, tStock + 0.15, 6000, 0.6);
    
    m.expr(tl, cue("s02b", "@debit"), "happy");
    const tCash = cue("s02b", "@cash");
    L7.drop(tl, lineCash.n, tCash - 0.1); lineCash.tk.to(tl, tCash + 0.15, 6000, 0.6);
    
    rig.levelFlash(tl, cue("s02b", "@shrinks") + 0.1);
    jS.pulse(tl, cue("s02b", "@grows")); jC.pulse(tl, cue("s02b", "@shrinks"));
    // "Two." — card 1 dims, card 2 drops with the strip
    const tTwo = cue("s02c", "@two");
    tl.to(cards[0].n, { opacity: 0.6, duration: 0.4, ease: "power2.inOut" }, tTwo - 0.1);
    L7.drop(tl, cards[1].n, tTwo - 0.1);
    [eA, eEq, eL, ePlus, eE].forEach((n, i) => L7.drop(tl, n, tTwo + 0.15 + i * 0.07));
    L7.drop(tl, eExpA, tTwo + 0.55);
    m.expr(tl, tTwo, "thinking");
    // answer 2 — "an expense shrinks equity" (the chip pulses) → "move it across the equals sign" (hops, flips) → "sits on the left" (Rent, blue)
    K.pulseNode(tl, eExpA, cue("s02d", "@shrinks"), 1.12);
    const tAcross = cue("s02d", "@across"), tSign = cue("s02d", "@sign");
    // everything on the left of the hop re-spaces: A stays; "=" and L and the plus and E slide; the chip lifts off and its flipped twin lands
    tl.to(eA, { x: x1[0] - x0[0], duration: 0.45, ease: "power2.inOut" }, tAcross);
    tl.to(eEq, { x: x1[3] - x0[1], duration: 0.45, ease: "power2.inOut" }, tAcross);
    tl.to(eL, { x: x1[4] - x0[2], duration: 0.45, ease: "power2.inOut" }, tAcross);
    tl.to(ePlus, { x: x1[5] - x0[3], duration: 0.45, ease: "power2.inOut" }, tAcross);
    tl.to(eE, { x: x1[6] - x0[4], duration: 0.45, ease: "power2.inOut" }, tAcross);
    tl.to(eExpA, { x: x1[2] - x0[5], y: -90, duration: 0.3, ease: "power2.out" }, tAcross);
    tl.to(eExpA, { y: 0, duration: 0.25, ease: "power2.in" }, tAcross + 0.3);
    tl.set(eExpA, { opacity: 0 }, tSign + 0.05); tl.set(eExpB, { opacity: 1 }, tSign + 0.05);
    K.pulseNode(tl, eExpB, tSign + 0.05, 1.1);
    L7.drop(tl, ePlus2, tAcross + 0.3);
    const tLeft = cue("s02d", "@left");
    L7.drop(tl, lineRent.n, tLeft - 0.2); 
    m.expr(tl, tLeft, "happy");
    // "Three." — the dashed imagine card; SMS DEBITED; "In Meera's books?"
    const tThree = cue("s02e", "@three");
    tl.to(cards[1].n, { opacity: 0.6, duration: 0.4, ease: "power2.inOut" }, tThree - 0.1);
    imag.enter(tl, tThree - 0.1);
    L7.drop(tl, bill, cue("s02e", "@bill")); L7.drop(tl, sms, cue("s02e", "@sms") - 0.1);
    m.expr(tl, cue("s02e", "@debited"), "puzzled").look(tl, cue("s02e", "@debited"), -6, -2);
    // answer 3 — Credited: an orange `Bank` line (Cr) lands on the right page; the SMS gets a tiny Bank-building tag
    const tCred = cue("s02f", "@credited");
    L7.drop(tl, lineBank.n, tCred); 
    khata.expr(tl, tCred, "wow");
    L7.drop(tl, bankTag, cue("s02f", "@bank") - 0.1);
    rig.levelFlash(tl, cue("s02f", "@shrank") + 0.1); jC.pulse(tl, cue("s02f", "@shrank"));
    m.expr(tl, cue("s02f", "@shrank"), "happy");
    L7.allow(world);
  };
})();

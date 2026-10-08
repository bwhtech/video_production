// s07 — Misconception: equity is not cash. Meera imagines ₹71,700 of notes → red ✗. The galla (₹50,700) and the bank (₹11,000) are counted: ₹61,700 — a shorter stack than her ₹71,700.
// "It's a claim": the tall stack becomes paper strings Meera holds like a kite handle, tied to the cart, the stock jar, Infotech's tag (and the galla + bank); the four creditor tags hold shorter strings to the same props.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    L13.stage(svg, C.coral, 880);
    const GY = 990;                                                      // props stand on the table
    // ---- Meera (left) + imagine bubble
    const m = K.meera(svg, 260, 1022, 1.0, { expr: "happy" });
    const imag = K.imagineCard(svg, 800, 330, 580, 480, { hidden: true });
    const box = K.g(imag.area.g, { transform: "translate(0 10) scale(1.4)" });
    K.paper(K.shadow(box, 1), K.cutRect(-120, 40, 240, 120, 2, 20), C.wood);
    for (let i = 0; i < 6; i++) K.note(box, -80 + i * 32, 20 - (i % 3) * 14, 100, 52, (i - 3) * 6);
    for (let i = 0; i < 4; i++) K.coin(box, -60 + i * 40, 26, 16);
    const tag71 = K.ticker(imag.area.g, 0, -150, 1, { value: 71700, size: 60, chip: true, w: 300, h: 88, edge: C.cr });
    // ---- the galla + the bank (side by side), coins that slide together, the two stacks
    const galla = L13.node(svg, 600, GY, 1.0); L13.hide(galla); K.galla(galla, 0, 0, 1.6, {});
    const bank = L13.node(svg, 970, GY, 1.0); L13.hide(bank);
    L13.bank(bank, 0, 0, 1.25);
    const chipG = K.ticker(svg, 600, GY - 260, 1, { value: 0, size: 46, chip: true, w: 240, h: 68, edge: C.dr, hidden: true });
    const chipB = K.ticker(svg, 970, GY - 380, 1, { value: 0, size: 46, chip: true, w: 240, h: 68, edge: C.dr, hidden: true });
    const coinsG = [0, 1, 2, 3].map((i) => { const c = L13.node(svg, 600 + (i - 1.5) * 22, GY - 150 - (i % 2) * 8); K.coin(c, 0, 0, 22); L13.hide(c); return c; });
    const coinsB = [0, 1, 2].map((i) => { const c = L13.node(svg, 970 + (i - 1) * 26, GY - 80 - (i % 2) * 8); K.coin(c, 0, 0, 22); L13.hide(c); return c; });
    const LAY = 16;
    const stackN = (x, n) => {                                           // a paper stack of notes, 16 px per layer
      const s = L13.node(svg, x, GY); L13.hide(s);
      for (let i = 0; i < n; i++) K.paper(K.shadow(s, 1), K.cutRect(-96 + (i % 3 - 1) * 4, -(i + 1) * LAY, 192, LAY + 1, 0.8, 10), i % 2 ? "#cfe3c4" : "#bcd8ae");
      return s;
    };
    const stackC = stackN(1400, 22), stackE = stackN(1650, 26);
    const chipC = K.ticker(svg, 1400, GY - 22 * LAY - 56, 1, { value: 0, size: 46, chip: true, w: 250, h: 68, edge: C.dr, hidden: true });
    const chipE = K.ticker(svg, 1650, GY - 26 * LAY - 56, 1, { value: 0, size: 46, chip: true, w: 250, h: 68, edge: C.cr, hidden: true });
    const eqFace = L13.node(svg, 1650, GY - 26 * LAY - 140); L13.hide(eqFace); K.tex(K.shadow(eqFace, 1), K.cutEll(0, 0, 38, 38, 0.8), "pat-paper"); K.faceArt(eqFace, "meera", 34).setAttribute("transform", "translate(0 6)");

    // ---- claim strings: the handle (spool) in Meera's hand; the props the strings tie to
    const H = [450, 640];
    const spool = L13.node(svg, H[0], H[1]); L13.hide(spool);
    K.paper(K.shadow(spool, 1), K.cutRect(-14, -34, 28, 68, 1, 10), C.wood); K.paper(spool, K.cutRect(-30, -40, 60, 12, 1, 8), C.woodDark); K.paper(spool, K.cutRect(-30, 28, 60, 12, 1, 8), C.woodDark);
    const eqChip = L13.node(svg, H[0] + 10, H[1] - 84); L13.hide(eqChip);
    K.paper(K.shadow(eqChip, 1), K.cutRect(-96, -32, 192, 64, 1.2, 16), C.cr); K.text(eqChip, 0, 2, "Equity", { size: 42, weight: 800, color: K.onColor(C.cr) });
    const cartP = L13.node(svg, 1250, GY - 160); L13.hide(cartP);
    K.paper(K.shadow(cartP, 1), K.cutEll(0, 0, 92, 92, 1), C.wood); K.cartArt(K.g(cartP, { transform: "scale(1.05)" }));
    K.paper(K.shadow(cartP, 1), K.cutRect(-14, 90, 28, 70, 1, 8), C.woodDark);
    const chipCart = K.ticker(svg, 1250, GY - 330, 1, { value: 0, size: 44, chip: true, w: 230, h: 64, edge: C.dr, hidden: true });
    const jar = K.jarRig(svg, 1470, GY, 1.1, { label: "Stock", icon: "leaf", contents: "leaves", fill: 0.6, hidden: true });
    const info = K.claimTag(svg, 1670, GY, 0.95, { face: "infotech", hidden: true });
    // creditor tags (top, each above its prop) with shorter strings
    const cred = [["customer", 600], ["electricity", 970], ["ravi", 1250], ["gopal", 1470]].map(([f, x]) => K.claimTag(svg, x, 230, 0.6, { face: f, hidden: true }));
    // paper twine (stroke-dash draw) from (x0,y0) to (x1,y1) with a little sag
    const twine = (x0, y0, x1, y1, color = "#7a6b58", w = 5, sag = 40) => {
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + sag;
      let L = 0, px = x0, py = y0;
      for (let i = 1; i <= 20; i++) { const u = i / 20, qx = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, qy = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1; L += Math.hypot(qx - px, qy - py); px = qx; py = qy; }
      return { L, p: K.el("path", { d: `M${x0},${y0} Q${mx},${my} ${x1},${y1}`, fill: "none", stroke: color, "stroke-width": w, "stroke-linecap": "round", "stroke-dasharray": L.toFixed(1), "stroke-dashoffset": L.toFixed(1) }, svg) };
    };
    // Meera's strings: galla top, bank roof, cart disc, stock jar lid, Infotech tag
    const ANC = [[600, GY - 215], [970, GY - 330], [1250, GY - 255], [1470, GY - 250], [1670, GY - 175]];
    const tw = ANC.map(([x, y]) => twine(H[0], H[1], x, y, "#6b4a2b", 6, 60));
    L13.allow(svg);
    // khata (right, character)
    const khata = K.khataRig(svg, 1860, 1030, 0.5, { expr: "awake", lookX: -4 });

    // ======================================================================== timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); khata.blink(tl, T0 + 6).blink(tl, T0 + 20).blink(tl, T0 + 33);
    // s07a — "equity is ₹71,700 … so she has ₹71,700 in cash. Right?"
    m.expr(tl, cue("s07a", "@equity"), "thinking");
    imag.enter(tl, cue("s07a", "@somewhere") - 0.3);
    m.expr(tl, cue("s07a", "@cash"), "happy").look(tl, cue("s07a", "@cash"), 6, -4);
    // s07b — "Nope." the stamp; the bubble pops
    const tNo = cue("s07b", "@nope");
    K.stamp(tl, imag.area.g, 0, 0, tNo, 1.5, { rot: -10 });
    m.expr(tl, tNo + 0.1, "puzzled").look(tl, tNo, 0, 0);
    imag.exit(tl, tNo + 0.9);
    // the galla and the bank
    const tG = cue("s07b", "@galla"), tB = cue("s07b", "@bank");
    L13.drop(tl, galla, tG - 0.2); chipG.enter(tl, tG + 0.1); chipG.to(tl, tG + 0.15, 50700, 0.9);
    L13.drop(tl, bank, tB - 0.2); chipB.enter(tl, tB + 0.1); chipB.to(tl, tB + 0.15, 11000, 0.7);
    coinsG.forEach((c, i) => L13.drop(tl, c, tG + 0.2 + i * 0.05, { dur: 0.2 })); coinsB.forEach((c, i) => L13.drop(tl, c, tB + 0.2 + i * 0.05, { dur: 0.2 }));
    // "plus" — the coins slide together into one stack, ₹61,700
    const tP = cue("s07b", "@plus");
    coinsG.forEach((c, i) => tl.to(c, { x: 800 + (i % 2) * 12, y: -70 - i * 16, duration: 0.8, ease: "power2.inOut" }, tP + i * 0.03));
    coinsB.forEach((c, i) => tl.to(c, { x: 430 + (i % 2) * 12, y: -80 - i * 16, duration: 0.8, ease: "power2.inOut" }, tP + i * 0.03));
    tl.to([chipG.g, chipB.g], { autoAlpha: 0, duration: 0.25 }, tP + 0.5);
    tl.to([...coinsG, ...coinsB], { autoAlpha: 0, duration: 0.2 }, tP + 0.85);
    L13.drop(tl, stackC, tP + 0.9, { dur: 0.4 }); chipC.enter(tl, tP + 1.2); chipC.to(tl, tP + 1.2, 61700, 1.0);
    // "less than her equity" — the taller stack for the ₹71,700 beside it
    const tE = cue("s07b", "@equity");
    L13.drop(tl, stackE, tE - 0.1, { dur: 0.4 }); chipE.enter(tl, tE + 0.2); chipE.to(tl, tE + 0.2, 71700, 0.9); L13.drop(tl, eqFace, tE + 0.5);
    m.expr(tl, tE, "thinking");
    // "It's a claim" — the stack becomes strings: the handle appears in Meera's hand
    const tCl = cue("s07b", "@claim");
    tl.to([stackE, chipE.g, eqFace, stackC, chipC.g], { autoAlpha: 0, duration: 0.35, ease: "power1.in" }, tCl + 0.1);
    L13.drop(tl, spool, tCl + 0.2); L13.drop(tl, eqChip, tCl + 0.35);
    m.arm(tl, tCl, "R", 100, 20, 0.4).expr(tl, tCl, "amazed");
    tl.to(tw[0].p, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, tCl + 0.55);          // galla
    tl.to(tw[1].p, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, tCl + 0.75);          // bank
    // cart / stock / Infotech, as they are named
    const tCt = cue("s07b", "@cart");
    L13.drop(tl, cartP, tCt - 0.5); chipCart.enter(tl, tCt - 0.3); chipCart.to(tl, tCt - 0.25, 35000, 0.6); tl.to(tw[2].p, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, tCt);
    const tSt = cue("s07b", "@stock");
    jar.enter(tl, tSt - 0.5); tl.to(tw[3].p, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, tSt);
    const tIn = cue("s07b", "@infotech");
    info.enter(tl, tIn - 0.4); tl.to(tw[4].p, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, tIn);
    // the creditors' shorter strings to the same props, in one soft pass
    const tCr = cue("s07b", "@paid") + 0.4;
    cred.forEach((c, i) => c.enter(tl, tCr + i * 0.08));
    [[0, 600, GY - 215], [1, 970, GY - 330], [2, 1250, GY - 255], [3, 1470, GY - 250]].forEach(([i, x, y]) => cred[i].stringTo(tl, tCr + 0.4, x, y, { dur: 0.5 }));
    khata.expr(tl, tCr, "happy");
  };
})();

// s10 — Checkpoint 4: Aman's Samosa Cart (--scene-saffron). Aman + his cart; six transaction cards (A10–A15, picture + amount) deal in a 3×2 grid on the VO items, then shrink to a thumbnail row at the top;
// three tool icons light on "journal · ledger · trial balance"; the opening-balance strip (`after A9`, 5 + 5 rows, K.trialSheet) lands ON SCREEN with a worksheet chip; the pause medallion (3-2-1 ring) holds 3.2 s while
// everything dims to 70 %; the reveal restates the task, then Aman's trial balance writes on in two stages (Debit, then Credit — the School canteen row fades to 0 and drops off), totals ₹54,000 | ₹54,000 tick together,
// level — and the full sheet is held completely still. Out: default torn-paper wipe into s11.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.saffron, 880);

    // ---------------------------------------------------------------- cast: banner, Aman, cart
    const banner = K.checkpointBanner(svg, 960, 100, 0.46, 4, { hidden: true });
    const aman = K.aman(svg, 160, 1050, 0.7, { expr: "neutral" });
    const cart = K.samosaCart(svg, 1730, 1045, 0.5);
    const khata = K.khataRig(svg, 1830, 1066, 0.4, { expr: "awake" }); khata.g.setAttribute("opacity", "0");

    // ---------------------------------------------------------------- six transaction cards (3×2)
    const CWd = 380, CHt = 320, GX = [570, 1010, 1450], GY = [380, 730];
    const thumbs = K.g(svg, {});
    const samosa = (n, x, y) => { const sm = K.g(n, { transform: `translate(${x} ${y})` }); K.paper(K.shadow(sm, 1), K.cutPoly([[-34, 30], [34, 30], [0, -34]], 3, 18), "#c98a3b"); K.ink(sm, [[-18, 12], [18, 12]], 4, "#8e5a22"); K.ink(sm, [[-8, -6], [8, -6]], 4, "#8e5a22"); };
    const SPEC = [
      { id: "A10", amt: 11000, art: (n) => { samosa(n, -64, -14); K.coin(n, 26, 4, 28); K.coin(n, 58, -16, 22); }, at: ["@cash", -0.3] },
      { id: "A11", amt: 3000, art: (n) => { K.medallion(n, 0, -12, 54, "user"); }, at: ["@helper", -1.0] },
      { id: "A12", amt: 1500, art: (n) => { K.medallion(n, -50, -12, 50, "wallet"); K.bundle(n, 52, 0, 0.7, -4); }, at: ["@hundred", -0.6] },
      { id: "A13", amt: 1500, art: (n) => { K.medallion(n, -50, -12, 50, "school"); K.coin(n, 60, 0, 30); K.arrowShape(n, 6, -12, 40, C.ink, 1, 0, 12); }, at: ["@canteen", -0.4] },
      { id: "A14", amt: 500, from: 3000, art: (n) => { K.medallion(n, 0, -14, 54, "leaf"); }, at: ["@stock", -0.3] },
      { id: "A15", amt: 18000, art: (n) => { K.cartSticker(n, -40, -4, 0.9); const c = L.node(n, 70, -14); K.medallion(c, 0, 0, 34, "calendar"); K.text(c, 0, 4, "3", { size: 40, weight: 800, color: "#fff" }); }, at: ["@month", -0.2] },
    ];
    const cards = SPEC.map((s, i) => {
      const pos = L.node(thumbs, GX[i % 3], GY[Math.floor(i / 3)]), body = K.g(pos, {}); L.hide(body);
      L.card(body, CWd, CHt);
      K.paper(body, K.cutRect(-CWd / 2 + 12, -CHt / 2 + 12, 96, 56, 1, 14), C.cream);
      K.paper(K.shadow(body, 1), K.cutRect(-CWd / 2 + 12, -CHt / 2 + 12, 96, 56, 1, 14), C.saffron);
      K.text(body, -CWd / 2 + 60, -CHt / 2 + 41, s.id, { size: 40, weight: 800 });
      s.art(L.node(body, 0, -10));
      const tk = K.ticker(body, 0, 104, 1, { value: s.from || 0, size: 64, chip: true, w: 280, h: 90, edge: C.dr });
      return { pos, body, tk, s };
    });

    // ---------------------------------------------------------------- the three Module-4 tools (journal · ledger · sheet)
    const tools = L.node(svg, 960, 930);
    const tool = (dx, draw) => { const n = L.node(tools, dx, 0); L.hide(n); K.tex(K.shadow(n, 2), K.cutEll(0, 0, 64, 64, 1), "pat-paper"); draw(n); const r = K.el("circle", { r: 74, fill: "none", stroke: C.gold, "stroke-width": 10, opacity: 0 }, n); return { n, r }; };
    const toolJ = tool(-190, (n) => { K.paper(n, K.cutRect(-34, -38, 68, 20, 0.6, 10), C.red); for (let k = 0; k < 3; k++) K.ink(n, [[-28, -6 + k * 16], [28, -6 + k * 16]], 4, "#8a7a64"); });
    const toolL = tool(0, (n) => { K.smallBook(n, 0, 36, 56, 76, "check"); });
    const toolS = tool(190, (n) => { K.paper(n, K.cutRect(-38, -34, 34, 68, 0.6, 10), C.dr); K.paper(n, K.cutRect(4, -34, 34, 68, 0.6, 10), C.cr); });
    tools.setAttribute("data-layout-allow-overlap", "true");

    // ---------------------------------------------------------------- opening-balance strip (after A9) + worksheet chip
    const stripHold = K.g(svg, {});
    const strip = K.trialSheet(stripHold, 960, 800, 0.9, { rows: 5, hidden: true, dim: false });
    const SDR = [["Cash", 18000], ["School canteen", 1500], ["Ingredients stock", 3000], ["Cart & fryer", 18000], ["Stall rent", 2000]];
    const SCR = [["Bank loan", 10000], ["Sharma Kirana", 1000], ["Advance from customer", 1000], ["Capital", 20000], ["Sales", 10500]];
    const bc = (sd) => { const p = strip.cellPos(sd, 5); return { x: p.x, y: p.y + 19 * 0.9 }; };
    const afterChip = L.node(svg, bc("dr").x, bc("dr").y); L.hide(afterChip);
    K.paper(K.shadow(afterChip, 1), K.cutRect(-110, -30, 220, 60, 1, 16), C.cream); K.text(afterChip, 0, 3, "after A9", { size: 40, weight: 800 });
    const wsChip = L.node(svg, bc("cr").x, bc("cr").y); L.hide(wsChip);
    K.paper(K.shadow(wsChip, 1), K.cutRect(-130, -30, 260, 60, 1, 16), C.cream); K.medallion(wsChip, -86, 0, 24, "file-text"); K.icon(wsChip, "file-down", 40, 0, 44, C.ink, 2.4);
    afterChip.setAttribute("data-layout-allow-overlap", "true");
    const pm = K.pauseMedallion(svg, 960, 935, 0.78, { hidden: true });

    // ---------------------------------------------------------------- the answer sheet (Debit 8 + ghost, Credit 6)
    const sheet = K.trialSheet(svg, 960, 1052, 0.9, { rows: 9, hidden: true });
    const ADR = [["Cash", 26000], ["Ingredients stock", 500], ["Cart & fryer", 18000], ["Drawings", 1500], ["Stall rent", 2000], ["Helper wages", 3000], ["Ingredients used", 2500], ["Depreciation", 500]];
    const ACR = [["Capital", 20000], ["Bank loan", 10000], ["Sharma Kirana", 1000], ["Advance from customer", 1000], ["Accumulated depreciation", 500], ["Sales", 21500]];
    L.allow(svg);

    // ======================================================================================= timeline
    aman.blinks(tl, T0 + 1.2, sc.end, 3.3); aman.jitter(tl, T0, sc.end); cart.sizzle(tl, T0 + 2, segStart("s10c") + 0.2);
    khata.jitter(tl, T0, sc.end);
    // s10a — "Checkpoint चार!" banner drops, Aman waves; cart rolls in; the six cards deal one per VO item
    const tCp = cue("s10a", "@checkpoint");
    banner.enter(tl, tCp - 0.15); aman.expr(tl, tCp, "grin"); aman.wave(tl, cue("s10a", "@back"), "R", 2);
    cart.ring(tl, tCp + 0.2);
    cards.forEach((c, i) => {
      const [w, off, nth] = c.s.at, t = cue("s10a", w, nth || 1) + off;
      L.drop(tl, c.body, t, { dur: 0.35 });
      c.tk.to(tl, t + 0.1, c.s.amt, c.s.from ? 1.0 : 0.6);
    });
    // s10b — journal · ledger · trial balance (the three tools), then the strip of opening balances, the worksheet, the pause
    const tJ = cue("s10b", "@journal"), tLg = cue("s10b", "@ledger"), tTb = cue("s10b", "@trial");
    [[toolJ, tJ - 0.1], [toolL, tLg - 0.1], [toolS, tTb - 0.1]].forEach(([t, at]) => { L.drop(tl, t.n, at, { dur: 0.3 }); tl.to(t.r, { opacity: 1, duration: 0.15 }, at + 0.15); tl.to(t.r, { opacity: 0, duration: 0.3 }, at + 1.5); });
    const tBal = cue("s10b", "@balances");
    // cards shrink to a thumbnail row along the top; the tool icons leave
    cards.forEach((c, i) => {
      tl.to(c.body, { scale: 0.4, svgOrigin: O, duration: 0.6, ease: "power3.inOut" }, tBal - 0.5);
      tl.to(c.pos, { x: 960 + (i - 2.5) * 200 - GX[i % 3], y: 205 - GY[Math.floor(i / 3)], duration: 0.6, ease: "power3.inOut" }, tBal - 0.5);
    });
    L.lift(tl, toolJ.n, tBal - 0.5, { dur: 0.25 }); L.lift(tl, toolL.n, tBal - 0.5, { dur: 0.25 }); L.lift(tl, toolS.n, tBal - 0.5, { dur: 0.25 });
    strip.enter(tl, tBal - 0.2, { dur: 0.4 });
    const rowsAll = [...SDR.map(([a, m]) => ({ side: "dr", account: a, amount: m })), ...SCR.map(([a, m]) => ({ side: "cr", account: a, amount: m }))];
    const stripEnd = strip.fill(tl, tBal + 0.1, rowsAll, { step: 0.11 });
    L.drop(tl, afterChip, tBal + 0.9, { dur: 0.3 });
    strip.rows.cr[1].hl(tl, stripEnd, { hold: 0.35 });                       // Sharma Kirana: the one name not seen since L7
    const tWs = cue("s10b", "@worksheet");
    L.drop(tl, wsChip, tWs - 0.1, { dur: 0.35 });
    // the pause device: medallion drops, ring counts 3-2-1 over the gap, everything dims to 70 %
    const tPz = cue("s10b", "@pause");
    pm.enter(tl, tPz); pm.countdown(tl, segEnd("s10b") + 0.05, { dur: 3.1 });
    tl.to(stripHold, { opacity: 0.7, duration: 0.3 }, tPz); tl.to(thumbs, { opacity: 0.7, duration: 0.3 }, tPz);
    aman.expr(tl, tPz, "happy");
    // s10c — the reveal restates the task; the strip leaves, Aman's sheet writes on in two stages
    const tReady = cue("s10c", "@ready");
    pm.exit(tl, segStart("s10c") - 0.2);
    tl.to(stripHold, { opacity: 0, duration: 0.3, ease: "power1.in" }, tReady - 0.2);
    L.lift(tl, afterChip, tReady - 0.2, { dur: 0.25 }); L.lift(tl, wsChip, tReady - 0.2, { dur: 0.25 });
    cart.moveTo(tl, tReady, 2300, 1.3);
    sheet.enter(tl, tReady + 0.1, { dur: 0.45 });
    const tE = cue("s10c", "@entries");
    ADR.forEach(([a, m], k) => sheet.addRow(tl, tE - 0.4 + k * 0.12, "dr", { account: a, amount: m, dur: 0.22, count: 0.3 }));
    const ghost = sheet.addRow(tl, tE - 0.4 + 8 * 0.12, "dr", { account: "School canteen", amount: 1500, dim: false });
    ghost.ticker.to(tl, tE + 1.3, 0, 0.6); tl.to(ghost.g, { opacity: 0, duration: 0.4, ease: "power1.in" }, tE + 2.0);
    ACR.forEach(([a, m], k) => sheet.addRow(tl, tE + 1.5 + k * 0.12, "cr", { account: a, amount: m, dur: 0.22, count: 0.3 }));
    const tCol = cue("s10c", "@columns");
    sheet.total(tl, tCol, { dr: 54000, cr: 54000, dur: 1.2 });
    sheet.match(tl, cue("s10c", "@rupees") + 0.3, { hold: 1.6 });
    aman.expr(tl, cue("s10c", "@rupees"), "joy"); aman.arm(tl, cue("s10c", "@rupees"), "R", 150, 12, 0.35); aman.arm(tl, cue("s10c", "@rupees") + 1.6, "R", 12, 8, 0.4);
    // "बिल्कुल मीरा की तरह" — Khata pops in at the right and gives a thumbs-up (the sheet itself stays dead still)
    const tMe = cue("s10c", "@meera");
    tl.to(khata.g, { opacity: 1, duration: 0.2 }, tMe - 0.5); khata.hop(tl, tMe - 0.4, { height: 40 }); khata.arm(tl, tMe, "L", 150, 0.3).expr(tl, tMe, "happy");
  };
})();

// s10 — Checkpoint 1: Aman's Samosa Cart (A1–A4). New business, new colour (--scene-sky). Four picture rows (card + two device slots),
// Aman's own scale at frame right. "Pause the video now" → the checkpoint pause device (veil, saffron medallion, 3-2-1 ring, music dips).
// The reveal is ROW BY ROW: only one row is live; the previous row dims to 70 %. Out: Aman's scale shrinks into the corner and becomes
// Meera's HUD scale; the calendar ticks 3 → 5.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L3.stage(K, svg, C.sky, 880);
    const cal = L3.cal(K, svg, 3);
    const board = K.g(svg, {});                                     // everything that leaves at the end (the scale + calendar stay)

    // ---- helpers local to this scene
    const amanFace = (parent, x, y, r) => {
      const g = K.g(parent, { transform: `translate(${x} ${y})` });
      K.tex(K.shadow(g, 1), K.cutEll(0, 0, r + 6, r + 6, 0.8), "pat-paper");
      K.paper(g, K.cutEll(0, r * 0.72, r * 0.72, r * 0.38, 0.6), "#3f8a63");
      K.paper(g, K.cutEll(-r * 0.5, r * 0.5, r * 0.17, r * 0.3, 0.4), "#f0792a");
      K.paper(g, K.cutEll(0, -r * 0.08, r * 0.44, r * 0.5, 0.6), "#b0714a");
      K.paper(g, K.cutEll(0, -r * 0.46, r * 0.5, r * 0.24, 0.5), C.hair);
      [-1, 1].forEach((sd) => K.paper(g, K.cutEll(sd * r * 0.17, -r * 0.1, r * 0.06, r * 0.06, 0.1), C.ink));
      K.ink(g, K.arc(0, r * 0.06, r * 0.14, Math.PI * 0.2, Math.PI * 0.8, 6), 2.4);
      return g;
    };
    // a claim tag with its own artwork (Aman / Bank loan / Sharma Kirana) + a counting amount
    const tagX = (parent, x, y, s, art) => {
      const n = L3.hide(L3.node(K, parent, x, y, s));
      K.tex(K.shadow(n, 1), K.cutPoly([[-110, -132], [-76, -176], [76, -176], [110, -132], [110, 0], [-110, 0]], 1.4, 16), "pat-paper");
      K.paper(n, K.cutEll(0, -150, 14, 14, 0.5), "#e8dcc4"); K.paper(n, K.cutEll(0, -150, 7, 7, 0.3), "#6f6150");
      art(K.g(n, { transform: "translate(0 -92)" }));
      const tk = K.ticker(n, 0, -26, 1, { value: 0, size: 54, weight: 800 });
      return { n, tk, enter(tl, t, v) { L3.drop(tl, K, n, t); tk.to(tl, t + 0.1, v, 0.7); return this; } };
    };

    // ---- cast + Aman's own scale (frame right)
    const aman = K.aman(board, 1290, 520, 0.55, { expr: "neutral" });
    const cartW = L3.hide(L3.node(K, board, 1670, 520));
    const cart = K.samosaCart(cartW, 0, 0, 0.5);
    const SX = 1500, SY = 905, SS = 0.6;
    const rig = K.scaleRig(svg, SX, SY, SS, { hidden: true, tint: true, L: 0, R: 0, equation: true });
    rig.equation(tl, T0 - 0.5, "0 = 0 + 0", { size: 60 });
    const cashJ = L3.jar(K, rig, 0, 3, { label: "Cash", contents: "coins", amount: 0, fill: 0, hidden: true });
    const cartJ = L3.jar(K, rig, 1, 3, { label: "Cart & fryer", contents: "cart", amount: 0, fill: 0, hidden: true, labelHidden: true });
    const stockJ = L3.jar(K, rig, 2, 3, { label: "Ingredients stock", contents: "leaves", amount: 0, fill: 0, hidden: true });
    const xs3 = L3.slots(3, 112), TS = L3.TAG_S[3];
    const tAman = tagX(rig.pans.R.g, xs3[0], 0, TS, (g) => amanFace(g, 0, 0, 44));
    const tBank = tagX(rig.pans.R.g, xs3[1], 0, TS, (g) => K.medallion(g, 0, 0, 40, "landmark"));
    const tShop = tagX(rig.pans.R.g, xs3[2], 0, TS, (g) => K.medallion(g, 0, 0, 40, "store"));
    const qChip = (side) => { const n = L3.hide(L3.node(K, rig.pans[side].hang, 0, 370)); K.tex(K.shadow(n, 1), K.cutRect(-125, -35, 250, 70, 1.6, 22), "pat-paper"); K.text(n, 0, 3, "?", { size: 58, weight: 800 }); return n; };
    const qL = qChip("L"), qR = qChip("R");

    // ---- banner
    const banner = K.checkpointBanner(board, 340, 190, 0.5, 1, { hidden: true });

    // ---- four rows: picture card (left) + two device slots (middle)
    const RY = [330, 510, 690, 870], PX = 180, SXs = [560, 920];
    const AMT = [20000, 10000, 18000, 3000];
    const rows = RY.map((y, i) => {
      const pic = L3.hide(L3.node(K, board, PX, y));
      L3.card(K, pic, 340, 150);
      const art = [
        () => { amanFace(pic, -115, 0, 40); K.bundle(pic, -55, 12, 0.55, -6); },
        () => { K.medallion(pic, -115, 0, 38, "landmark"); K.bundle(pic, -55, 12, 0.55, -6); },
        () => { K.cartArt(L3.node(K, pic, -112, 0, 0.62)); K.note(pic, -50, 24, 66, 36, -6); },
        () => { K.sacks(pic, -112, 40, 0.26); K.medallion(pic, -48, -30, 26, "store"); K.medallion(pic, -48, 30, 24, "clock"); },
      ][i];
      art();
      K.ticker(pic, 82, 0, 1, { value: AMT[i], size: 46 });
      const slots = SXs.map((x) => {
        const s = L3.hide(L3.node(K, board, x, y));
        K.paper(K.shadow(s, 1), K.cutRect(-175, -54, 350, 108, 2, 22), C.cream, { opacity: 0.55 });
        K.el("path", { d: K.cutRect(-167, -46, 334, 92, 1.2, 24), fill: "none", stroke: C.ink, "stroke-width": 4.5, "stroke-dasharray": "16 11", "stroke-linecap": "round", opacity: 0.8 }, s);
        return s;
      });
      const grp = [pic, ...slots];
      return { y, pic, slots, grp, chips: [] };
    });
    const chip = (row, k, name, delta, side) => {
      const n = L3.hide(L3.node(K, row.slots[k], 0, 0)), col = side === "R" ? C.cr : C.dr;
      K.paper(K.shadow(n, 1), K.cutRect(-172, -52, 344, 104, 2, 22), col);
      const up = delta > 0, ax = -150;
      K.paper(K.shadow(n, 1), K.cutPoly(up ? [[ax, -16], [ax + 17, 12], [ax - 17, 12]] : [[ax, 16], [ax + 17, -12], [ax - 17, -12]], 0.6, 10), C.cream);
      K.text(n, 14, -20, name, { size: 34, weight: 700, color: K.onColor(col) });
      K.text(n, 14, 24, K.fmtINR(delta, "₹", true), { size: 46, weight: 800, color: K.onColor(col) });
      row.chips[k] = n; n.setAttribute("data-layout-allow-overlap", "true");
      return n;
    };

    // ---- veil + pause device (above everything but the calendar)
    const veil = K.el("rect", { x: -60, y: -60, width: 2040, height: 1200, fill: C.cream, style: "opacity:0" }, svg);
    const pm = K.pauseMedallion(svg, 960, 520, 0.8, { hidden: true });
    const wk = L3.hide(L3.node(K, svg, 960, 790)); L3.card(K, wk, 360, 130); K.medallion(wk, 0, 0, 46, "file-text");

    // ======================================================================================= timeline
    aman.blinks(tl, T0 + 1.0, sc.end, 3.3); aman.jitter(tl, T0, sc.end);
    // "And now, Checkpoint One." — banner drops, Aman waves
    const tCp = cue("s10a", "@checkpoint");
    banner.enter(tl, tCp - 0.1); aman.expr(tl, tCp, "grin"); aman.wave(tl, tCp + 0.2, "R", 2);
    // "A brand-new business." — Aman's own scale (empty, totals 0) comes in; "samosa cart" — the cart arrives and sizzles
    rig.enter(tl, cue("s10a", "@business") - 0.1);
    const tCart = cue("s10a", "@samosa");
    L3.drop(tl, K, cartW, tCart); cart.sizzle(tl, tCart + 0.1, tCart + 1.5);
    // "One… Two… Three… Four…" — each row's card drops on its number word
    [cue("s10a", "@one", 2), cue("s10a", "@two"), cue("s10a", "@three"), cue("s10a", "@four")].forEach((t, i) => { L3.drop(tl, K, rows[i].pic, t); aman.look(tl, t, 0, 2); });
    aman.look(tl, cue("s10a", "@later") + 0.5, 0, 0);
    // "which two things changed? And what does Aman's scale read after it?" — empty slots appear in every row; `?` under Aman's scale
    const tEach = cue("s10a", "@each");
    rows.forEach((r, i) => r.slots.forEach((s, k) => L3.drop(tl, K, s, tEach + i * 0.18 + k * 0.06)));
    const tQ = cue("s10a", "@scale");
    rig.pans.L.total.exit(tl, tQ - 0.05); rig.pans.R.total.exit(tl, tQ - 0.05);
    L3.drop(tl, K, qL, tQ); L3.drop(tl, K, qR, tQ + 0.1);
    // "Pause the video now." — THE checkpoint pause device: veil 30 %, saffron medallion, worksheet card; countdown over the 3.2 s hold
    const tPause = cue("s10a", "@pause");
    tl.to(veil, { opacity: 0.3, duration: 0.25, ease: "none" }, tPause - 0.1);
    pm.enter(tl, tPause); L3.drop(tl, K, wk, tPause + 0.25);
    pm.countdown(tl, segEnd("s10a"), { dur: 3.2 });
    aman.expr(tl, tPause, "happy");

    // s10b "Done?" — the veil lifts; then the reveal, ROW BY ROW
    const tDone = segStart("s10b");
    tl.to(veil, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, tDone);
    pm.exit(tl, tDone); L3.lift(tl, K, wk, tDone);
    const dim = (r, t) => r.grp.forEach((n) => tl.to(n, { opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, t));
    const reveal = (i, t, a, b) => {
      if (i > 0) dim(rows[i - 1], t - 0.05);
      L3.drop(tl, K, chip(rows[i], 0, ...a), t); L3.drop(tl, K, chip(rows[i], 1, ...b), t + 0.35);
    };
    const eq = (t, s) => rig.equation(tl, t, s, { size: 60 });
    const showTotals = (t) => { L3.lift(tl, K, qL, t); L3.lift(tl, K, qR, t + 0.05); rig.pans.L.total.enter(tl, t + 0.15); rig.pans.R.total.enter(tl, t + 0.2); };
    // row 1 — Cash +20,000 · Capital +20,000 → 20,000 = 0 + 20,000
    const t1 = cue("s10b", "@one");
    reveal(0, t1, ["Cash", 20000, "L"], ["Capital", 20000, "R"]);
    cashJ.enter(tl, t1 + 0.1); cashJ.fill(tl, t1 + 0.15, 0.5); cashJ.tick(tl, t1 + 0.2, 0, 20000, 0.7);
    tAman.enter(tl, t1 + 0.2, 20000);
    rig.pans.L.total.set(tl, t1 + 0.1, 0); rig.pans.R.total.set(tl, t1 + 0.1, 0);
    showTotals(t1 + 0.1); rig.setTotals(tl, t1 + 0.35, 20000, 20000, { dur: 0.7 });
    eq(cue("s10b", "@twenty"), "20,000 = 0 + 20,000");
    // row 2 — Cash +10,000 · Bank loan +10,000 → 30,000 = 10,000 + 20,000
    const t2 = cue("s10b", "@two");
    reveal(1, t2, ["Cash", 10000, "L"], ["Bank loan", 10000, "R"]);
    cashJ.tick(tl, t2 + 0.1, 20000, 30000, 0.7); cashJ.fill(tl, t2 + 0.1, 0.75);
    tBank.enter(tl, t2 + 0.3, 10000);
    rig.setTotals(tl, t2 + 0.35, 30000, 30000, { dur: 0.7 });
    eq(cue("s10b", "@thirty"), "30,000 = 10,000 + 20,000");
    // row 3 — Cart & fryer +18,000 · Cash −18,000 → still 30,000 (a swap on the left: the beam doesn't move)
    const t3 = cue("s10b", "@three");
    reveal(2, t3, ["Cart & fryer", 18000, "L"], ["Cash", -18000, "L"]);
    cashJ.tick(tl, t3 + 0.35, 30000, 12000, 0.7); cashJ.fill(tl, t3 + 0.35, 0.25);
    cartJ.enter(tl, t3 + 0.1); cartJ.landSticker(tl, t3 + 0.12, { dx: -150, dy: -70, dur: 0.7 }); cartJ.tieLabel(tl, t3 + 0.8); cartJ.ticker.enter(tl, t3 + 0.8); cartJ.tick(tl, t3 + 0.8, 0, 18000, 0.6);
    rig.eqPulse(tl, cue("s10b", "@thirty", 2));
    rig.levelFlash(tl, cue("s10b", "@thirty", 2) + 0.2);
    // row 4 — Ingredients stock +3,000 · Sharma Kirana +3,000 → 33,000 = 13,000 + 20,000
    const t4 = cue("s10b", "@four");
    reveal(3, t4, ["Ingredients stock", 3000, "L"], ["Sharma Kirana", 3000, "R"]);
    stockJ.enter(tl, t4 + 0.1); stockJ.fill(tl, t4 + 0.15, 0.5); stockJ.tick(tl, t4 + 0.2, 0, 3000, 0.7);
    tShop.enter(tl, t4 + 0.35, 3000);
    rig.setTotals(tl, t4 + 0.4, 33000, 33000, { dur: 0.7 });
    eq(cue("s10b", "@thirty-three"), "33,000 = 13,000 + 20,000");
    // "Next lesson, we'll walk through every step." — the four rows stand stacked; Aman thumbs-up
    const tNext = cue("s10b", "@next");
    aman.expr(tl, tNext, "joy"); aman.arm(tl, tNext, "R", 150, 12, 0.35); aman.arm(tl, tNext + 1.4, "R", 12, 8, 0.4);
    // exit: Aman's scale becomes Meera's HUD (totals swap back to 88,000), the cast lifts away, the calendar ticks 3 → 5
    const tEx = sc.end - 1.4;
    tl.to(board, { opacity: 0, duration: 0.35, ease: "power1.in" }, tEx - 0.1);
    [cashJ, cartJ, stockJ].forEach((j) => j.exit(tl, tEx - 0.1)); [tAman, tBank, tShop].forEach((t) => L3.lift(tl, K, t.n, tEx - 0.1));
    rig.hud(tl, tEx, true, { dur: 0.9, k: (0.28 * L3.BIG.s) / SS });
    rig.setTotals(tl, tEx, 88000, 88000, { dur: 0.8 });
    cal.tickTo(tl, tEx + 0.1, 5, { dur: 0.5 });
    L3.allow(board);
  };
})();

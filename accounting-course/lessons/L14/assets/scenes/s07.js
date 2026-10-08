// s07 — May preview: "you already know". A May calendar page and three date tiles (May 5 / 8 / 10). Each asks a quick question (guess gap), then answers on a mini scale:
//   May 5  (T21) advance ₹4,000 → May's revenue: the claim tag on the RIGHT pan swaps for a Sales slip — the fourth pattern (swap on the right).
//   May 8  (T22) paying April's electricity bill: coins leave the galla AND the payable tag comes off — a small May film strip stays empty (Khata shakes its head).
//   May 10 (T23) Infotech pays ₹6,000 by UPI: Infotech jar → Bank jar (a swap on the left); the Sales line doesn't move.
// Out: default torn-paper wipe into s08.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start;
    L.stage(svg, C.sky, 900);
    const cu = (seg, w, n) => cue(seg, w, n);

    // ---- left column: the May calendar page + three date tiles
    const calp = K.calendarPage(svg, 250, 300, 0.85, { month: "April", day: 30 });
    L.hide(calp.g);
    const tiles = [5, 8, 10].map((d, i) => K.dateTile(svg, 250, 580 + i * 160, 0.92, { month: "May", day: d, color: C.coral, hidden: true }));
    const tileRing = [0, 1, 2].map((i) => L.ringRect(svg, 250 - 80, 580 + i * 160 - 80, 160, 160));

    // ---- shared helpers
    const mkTile = () => L.node(svg, 1200, 520);
    const miniScale = (T, x, y, slotIcon) => {
      const sc_ = K.scaleRig.mini(T, x, y, 0.8, {});
      if (slotIcon) K.medallion(sc_.slot.g, 0, 0, 50, slotIcon);
      return sc_;
    };
    const qm = (T, x, y) => { const n = L.node(T, x, y); K.qmark(n, 0, 0, 1.5, C.coral); L.hide(n); return n; };
    const glyph = (parent, x, y, left, right) => {
      const g = L.node(parent, x, y, 1.35);
      K.tex(K.shadow(g, 1), K.cutRect(-64, -46, 128, 92, 1.4, 18), "pat-paper");
      K.ink(g, [[0, -38], [0, 38]], 3, "#a39684");
      const draw = (kind, cx) => {
        if (kind === "up") K.arrowShape(g, cx, 0, 40, C.navy, 1, 90, 14);
        if (kind === "down") K.arrowShape(g, cx, 0, 40, C.navy, 1, -90, 14);
        if (kind === "swap") { K.arrowShape(g, cx, -12, 38, C.navy, 1, 180, 12); K.arrowShape(g, cx, 12, 38, C.navy, 1, 0, 12); }
      };
      if (left) { if (left === "up2") { draw("up", -42); draw("up", -22); } else if (left === "down2") { draw("down", -42); draw("down", -22); } else draw(left, -32); }
      if (right) { if (right === "up2") { draw("up", 22); draw("up", 42); } else if (right === "down2") { draw("down", 22); draw("down", 42); } else draw(right, 32); }
      const rg = L.ringRect(g, -72, -54, 144, 108);
      L.hide(g);
      return { g, ring: rg };
    };

    // ======================================================================== T21 — May 5: the advance becomes revenue
    const T1 = mkTile(); L.hide(T1);
    const office = K.officeEvent(T1, -470, 420, 0.62, {});
    const mE = K.meera(T1, -470, 432, 0.46, { expr: "happy" });
    const s1 = miniScale(T1, 200, 420, "calendar-check");
    const advTag = K.claimTag(s1.pans.R.g, 0, 0, 0.78, { face: "customer", amount: 4000, size: 54 });
    const jar1 = K.jarRig(s1.pans.L.g, 0, 0, 0.8, { label: "", contents: "coins", fill: 0.7, labelHidden: true });
    const sales1 = L.node(s1.pans.R.g, 0, 0); L.hide(sales1);
    K.slip(sales1, 0, -40, 1.1, 0, "coins");
    K.text(sales1, 0, -108, "Sales", { size: 44, weight: 800 }).setAttribute("data-layout-allow-overlap", "true");
    const glyphs = [glyph(T1, -380, -330, "up2", "up2"), glyph(T1, -160, -330, "down2", "down2"), glyph(T1, 60, -330, "swap", null), glyph(T1, 280, -330, null, "swap")];
    const q1 = qm(T1, 20, -130);

    // ======================================================================== T22 — May 8: paying April's bill is not a May expense
    const T2 = mkTile(); L.hide(T2);
    const s2 = miniScale(T2, 200, 420, "zap");
    const jar2 = K.jarRig(s2.pans.L.g, 0, 0, 0.8, { label: "", contents: "coins", fill: 1, labelHidden: true });
    const eTag = K.claimTag(s2.pans.R.g, 0, 0, 0.78, { face: "electricity", amount: 1000, size: 54 });
    const gal2 = K.galla(T2, -520, 440, 1.6, { open: true, overflow: true });
    const bill2 = L.node(T2, -280, 330); K.medallion(bill2, 0, 0, 62, "receipt");
    const coins2 = K.coinStream(T2, { path: [[-480, 340], [-400, 280], [-300, 320]], n: 6, r: 24, seed: 8 });
    const film2 = L.node(T2, -430, -130); K.filmStrip(film2, 0, 0, 560, 140, [], 0, { resultFrames: 2 }); L.hide(film2);
    const q2 = qm(T2, 20, -130);

    // ======================================================================== T23 — May 10: Infotech pays → money in the bank
    const T3 = mkTile(); L.hide(T3);
    const s3 = miniScale(T3, 200, 420, "indian-rupee");
    const jInf = K.jarRig(s3.pans.L.g, -58, 0, 0.62, { icon: "receipt", contents: "notes", fill: 1 });
    const jBank = K.jarRig(s3.pans.L.g, 58, 0, 0.62, { icon: "landmark", contents: "notes", fill: 0.2 });
        const ph = K.phone(T3, -480, 270, 1.05, { screen: "upi" });
    const film3 = L.node(T3, -430, -130); K.filmStrip(film3, 0, 0, 560, 140, ["coins", "leaf", "key"], 0, { resultFrames: 2 });
    const q3 = qm(T3, 20, -130);

    // ---- Khata (host)
    const kk = K.khataRig(svg, 1850, 1040, 0.5, { expr: "awake" });
    L.allow(svg);

    // ======================================================================== timeline
    kk.blink(tl, T0 + 2); kk.blink(tl, T0 + 22); kk.blink(tl, T0 + 44);
    // ---- s07a
    const tStory = cu("s07a", "@story"), tFifth = cu("s07a", "@fifth"), tMeera = cu("s07a", "@meera"), tOffice = cu("s07a", "@office"), tFour = cu("s07a", "@four"), tAdv = cu("s07a", "@advance"), tHap = cu("s07a", "@happens");
    L.drop(tl, calp.g, tStory - 0.2);
    calp.flip(tl, tFifth - 0.1, { month: "May", day: 5 });
    tiles.forEach((tt, i) => tt.enter(tl, tFifth + 0.1 + i * 0.12));
    tileRing[0].flash(tl, tFifth + 0.2, 6);
    L.drop(tl, T1, tOffice - 0.6);
    mE.expr(tl, tMeera, "proud"); office.cheers(tl, tOffice);
    advTag.tick(tl, tFour, 0, 4000, 0.7);
    advTag.light(tl, tAdv, { hold: 0.9 });
    L.drop(tl, q1, tHap);
    kk.expr(tl, tHap, "wink");
    // ---- s07b — the answer: tag swaps for the Sales slip on the same (right) pan; the fourth pattern lights
    const tEarned = cu("s07b", "@earned"), tRev = cu("s07b", "@revenue"), tFourth = cu("s07b", "@fourth"), tPat = cu("s07b", "@pattern"), tSwap = cu("s07b", "@swap"), tClaim = cu("s07b", "@claim"), tAnother = cu("s07b", "@another");
    L.lift(tl, q1, tEarned - 0.1);
    advTag.exit(tl, tEarned + 0.4);
    L.drop(tl, sales1, tRev - 0.2);
    jar1.pulse(tl, tRev + 0.4);
    glyphs.forEach((gl, i) => L.drop(tl, gl.g, tFourth - 0.1 + i * 0.14, { dur: 0.28 }));
    glyphs[3].ring.flash(tl, tPat + 0.2, 2.2);
    K.pulseNode(tl, glyphs[3].g, tPat + 0.2, 1.1);
    // "swap on the right … one claim becomes another": slip ↔ tag swap once more, small
    K.pulseNode(tl, sales1, tSwap, 1.08); K.pulseNode(tl, sales1, tAnother, 1.08);
    kk.hop(tl, tAnother + 0.2); kk.expr(tl, tAnother, "happy");
    // ---- s07c — May 8: the electricity bill
    const tEighth = cu("s07c", "@eighth"), tPays = cu("s07c", "@pays"), tExp = cu("s07c", "@expense");
    L.lift(tl, T1, tEighth - 0.35); glyphs.forEach((gl) => L.lift(tl, gl.g, tEighth - 0.35));
    calp.flip(tl, tEighth - 0.1, { month: "May", day: 8 });
    tileRing[1].flash(tl, tEighth + 0.2, 6);
    L.drop(tl, T2, tEighth);
    L.drop(tl, bill2, tEighth + 0.2);
    coins2.run(tl, tPays, { dur: 1.2, stagger: 0.1 });
    L.drop(tl, q2, tExp);
    // ---- s07d — no: it was April's; paying clears what she owed (both pans go down)
    const tNo = cu("s07d", "@no"), tClears = cu("s07d", "@clears"), tOwed = cu("s07d", "@owed");
    L.lift(tl, q2, tNo - 0.1);
    L.drop(tl, film2, tNo);
    kk.wiggle(tl, tNo + 0.1); kk.expr(tl, tNo, "wink");
    jar2.fill(tl, tClears, 0.5);
    eTag.exit(tl, tClears + 0.1);
    s2.arrows(tl, tClears + 0.3, "downdown");
    s2.levelFlash && s2.levelFlash(tl, tOwed);
    // ---- s07e — May 10: Infotech pays ₹6,000
    const tTenth = cu("s07e", "@tenth"), tInf = cu("s07e", "@infotech"), tSix = cu("s07e", "@six"), tRev2 = cu("s07e", "@revenue");
    L.lift(tl, T2, tTenth - 0.35); L.lift(tl, film2, tTenth - 0.35);
    calp.flip(tl, tTenth - 0.1, { month: "May", day: 10 });
    tileRing[2].flash(tl, tTenth + 0.2, 6);
    L.drop(tl, T3, tTenth);
    ph.show(tl, tInf, { type: "upi", kind: "RECEIVED", amount: "₹6,000", from: "Infotech" });
    ph.buzz(tl, tInf + 0.1);
    L.drop(tl, q3, tRev2);
    // ---- s07f — no: earned in April; now money in the bank (swap on the left)
    const tNo2 = cu("s07f", "@no"), tTurns = cu("s07f", "@turns"), tBank = cu("s07f", "@bank"), tSee = cu("s07f", "@see"), tKnow = cu("s07f", "@know");
    L.lift(tl, q3, tNo2 - 0.1);
    kk.expr(tl, tNo2, "wink");
    jInf.fill(tl, tTurns, 0.2); jBank.fill(tl, tTurns + 0.1, 1);
    s3.arrows(tl, tTurns + 0.3, "swapL");
    jBank.light(tl, tBank, { hold: 1.0 });
    kk.arm(tl, tSee, "R", 150); kk.expr(tl, tSee, "happy"); kk.hop(tl, tSee + 0.1);
    L.spark(svg, tl, 1500, 300, tKnow + 0.1, 44);
  };
})();

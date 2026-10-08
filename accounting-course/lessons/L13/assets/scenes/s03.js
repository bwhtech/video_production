// s03 — Worked: assets on the left page of Khata's open spread. A mini trial-balance sheet flicks by (the 7 P&L strips lift off, the other 12 flutter onto the pages);
// the spread's left page lists the assets (equipment written inline 36,000 − 1,000 = 35,000) and totals ₹1,06,700.
// Out: default torn-paper wipe into s04.
(function () {
  const NAMES = ["Cash", "Bank", "Stock", "Infotech", "Equipment", "Drawings"];
  window.L13.filmHud = (parent, x, y, w = 330, h = 74) =>
    window.KIT.filmStrip(parent, x, y, w, h, ["banknote", "leaf", "key", "user", "zap", "percent", "trending-down"], 0, { resultFrames: 2 });

  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    L13.stage(svg, C.sky, 880);
    const hud = L13.filmHud(svg, 230, 62);
    const sp = L13.spread(svg);
    sp.tints.L.setAttribute("opacity", "0"); sp.tints.R.setAttribute("opacity", "0");
    const PL = sp.L;

    // ---- the page: header chip + rows
    const RW = 720, CX = PL.cx;
    const head = L13.node(svg, CX, 214); L13.hide(head);
    K.label(head, 0, 0, "Assets", { size: 50, bg: C.dr, w: 300, h: 76, rot: -1 });
    const rEquip = L13.row(svg, CX, 330, RW, { icon: "cart", label: "Equipment", inline: { a: "36,000", b: "− 1,000", c: 35000 }, h: 124 });
    const rStock = L13.row(svg, CX, 442, RW, { icon: "leaf", label: "Stock", value: 4000, h: 88 });
    const rInfo = L13.row(svg, CX, 536, RW, { face: "infotech", label: "Infotech", value: 6000, h: 88 });
    const rBank = L13.row(svg, CX, 630, RW, { icon: "landmark", label: "Bank", value: 11000, h: 88 });
    const rCash = L13.row(svg, CX, 724, RW, { icon: "banknote", label: "Cash", value: 50700, h: 88 });
    const tot = L13.node(svg, CX, 842); L13.hide(tot);
    K.ink(tot, [[-RW / 2, -50], [RW / 2, -50]], 5, C.ink);
    K.text(tot, -RW / 2 + 20, 2, "Total", { size: 46, weight: 800, anchor: "start" });
    const totT = K.ticker(tot, RW / 2 - 20, 2, 1, { value: 0, size: 56, anchor: "end" });
    L13.allow(svg);

    // ---- the mini trial-balance sheet: 19 strips (7 P&L lift off, 12 flutter onto the pages)
    const sheet = L13.node(svg, 960, 640); L13.hide(sheet);
    L13.card(sheet, 520, 540, { stripe: C.navy });
    const strips = [];
    const mkStrip = (col, i, blue, pl) => {
      const x = col ? 125 : -125, y = -200 + i * 48;
      const gI = K.g(sheet, { transform: `translate(${x} ${y})` });
      const sg = K.g(gI, {});
      K.paper(K.shadow(sg, 1), K.cutRect(-100, -17, 200, 34, 1, 12), blue ? C.dr : C.cr);
      strips.push({ g: sg, pl, x, y, col });
      return sg;
    };
    // left column (debit): 6 kept (assets + drawings) then 4 P&L; right (credit): 6 kept then 3 P&L
    for (let i = 0; i < 10; i++) mkStrip(0, i, true, i >= 6);
    for (let i = 0; i < 9; i++) mkStrip(1, i, false, i >= 6);

    // ======================================================================== timeline
    sp.face.blink(tl, T0 + 4).blink(tl, T0 + 21).blink(tl, T0 + 36);
    sp.face.look(tl, T0 + 0.8, -3, 0);
    // "the movie took the revenue and expense accounts out of the trial balance"
    const tTb = cue("s03a", "@trial") - 0.05;
    L13.drop(tl, sheet, tTb, { dur: 0.4 });
    const tRev = cue("s03a", "@revenue");
    strips.filter((s) => s.pl).forEach((s, i) => tl.to(s.g, { y: -170 - i * 6, x: (s.col ? 90 : -90) + (i % 3) * 20, rotation: (i % 2 ? 12 : -12), opacity: 0, duration: 0.5, ease: "power2.in", svgOrigin: O }, tRev + i * 0.07));
    // "the photo takes everything that's left" — the 12 kept strips flutter onto the pages, the sheet lifts away
    const tPh = cue("s03a", "@photo");
    strips.filter((s) => !s.pl).forEach((s, i) => {
      const left = s.col === 0 && i < 6;
      const tx = (left ? 495 : 1425) - 960 - s.x + (i % 3 - 1) * 90, ty = 330 + (i % 6) * 60 - 640 - s.y;
      tl.to(s.g, { x: tx, y: ty, rotation: (i % 2 ? 8 : -8), scale: 0.9, duration: 0.8, ease: "power2.inOut", svgOrigin: O }, tPh + i * 0.06);
      tl.to(s.g, { opacity: 0, duration: 0.3, ease: "power1.in" }, tPh + 0.7 + i * 0.06);
    });
    L13.lift(tl, sheet, tPh + 0.5, { dur: 0.3 });
    // "two sides, just like Khata" — the face looks left, then right, and winks
    sp.tint(tl, cue("s03a", "@sides"), "R", true);
    sp.face.look(tl, cue("s03a", "@sides"), -5, 1).look(tl, cue("s03a", "@khata") - 0.3, 5, 1).expr(tl, cue("s03a", "@khata"), "happy").look(tl, cue("s03a", "@left", 2) - 0.1, -6, 1);
    // "On the left … its assets" — blue tint on the left page, the Assets header
    const tL = cue("s03a", "@left", 2);
    sp.tint(tl, tL, "L", true);
    L13.drop(tl, head, cue("s03a", "@assets") - 0.2);
    sp.face.expr(tl, cue("s03a", "@lists") - 0.1, "awake");
    // rows
    const rowDrop = (r, t) => { L13.drop(tl, r.n, t, { dur: 0.34 }); };
    const eq = rEquip;
    rowDrop(eq, cue("s03a", "@cart") - 0.15);
    tl.set(eq.inl.a, { opacity: 1 }, cue("s03a", "@thirty-six")); K.pulseNode(tl, eq.inl.a, cue("s03a", "@thirty-six"), 1.08);
    tl.set(eq.inl.b, { opacity: 1 }, cue("s03a", "@depreciation") + 0.5); K.pulseNode(tl, eq.inl.b, cue("s03a", "@depreciation") + 0.5, 1.08);
    eq.inl.c.enter(tl, cue("s03a", "@worth")); eq.inl.c.to(tl, cue("s03a", "@thirty-five") - 0.1, 35000, 0.6);
    const fill = (r, tRow, tVal, v) => { rowDrop(r, tRow); r.tk.to(tl, tVal, v, 0.7); };
    fill(rStock, cue("s03a", "@stock") - 0.15, cue("s03a", "@four") - 0.05, 4000);
    fill(rInfo, cue("s03a", "@infotech") - 0.15, cue("s03a", "@six") - 0.05, 6000);
    fill(rBank, cue("s03a", "@bank") - 0.15, cue("s03a", "@eleven") - 0.05, 11000);
    fill(rCash, cue("s03a", "@galla") - 0.15, cue("s03a", "@fifty") - 0.05, 50700);
    // s03b — total
    L13.drop(tl, tot, cue("s03b", "@total") - 0.1); totT.to(tl, cue("s03b", "@lakh") - 0.1, 106700, 1.0);
    K.pulseNode(tl, totT.g, cue("s03b", "@rupees") + 0.3, 1.06);
    sp.face.expr(tl, cue("s03b", "@lakh") + 1.0, "happy");
  };
})();

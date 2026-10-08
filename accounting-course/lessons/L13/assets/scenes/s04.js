// s04 — Liabilities: the right page of the spread fills with what the stall owes (loan inline 30,000 − 3,000 = 27,000, Gopal, advance, electricity), total ₹35,000;
// Meera's folded face tag then hangs below, "₹ ?", waiting to unfold into the Equity card (s05). The left page is already written (finished state of s03).
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    L13.stage(svg, C.sky, 880);
    L13.filmHud(svg, 230, 62);
    const sp = L13.spread(svg);
    sp.tints.L.setAttribute("opacity", "1"); sp.tints.R.setAttribute("opacity", "0");
    L13.assetsPage(svg, tl, T0, sp);

    const PR = sp.R, RW = 720, CX = PR.cx;
    const head = L13.node(svg, CX, 214); L13.hide(head);
    K.label(head, 0, 0, "Liabilities", { size: 50, bg: C.cr, w: 340, h: 76, rot: 1 });
    const rLoan = L13.row(svg, CX, 330, RW, { face: "ravi", side: "R", label: "Loan from Ravi Mama", inline: { a: "30,000", b: "− 3,000", c: 27000 }, h: 124 });
    const rGop = L13.row(svg, CX, 442, RW, { face: "gopal", side: "R", label: "Gopal Dairy", value: 3000, h: 88 });
    const rAdv = L13.row(svg, CX, 536, RW, { face: "customer", side: "R", label: "Advance", value: 4000, h: 88 });
    const rEl = L13.row(svg, CX, 630, RW, { face: "electricity", side: "R", label: "Electricity bill", value: 1000, h: 88 });
    const tot = L13.node(svg, CX, 750); L13.hide(tot);
    K.ink(tot, [[-RW / 2, -46], [RW / 2, -46]], 5, C.ink);
    K.text(tot, -RW / 2 + 20, 2, "Total", { size: 46, weight: 800, anchor: "start" });
    const totT = K.ticker(tot, RW / 2 - 20, 2, 1, { value: 0, size: 56, anchor: "end" });
    // May 5 chip rides the advance row
    const may = L13.node(svg, CX + 100, 536); L13.hide(may); K.medallion(may, 0, 0, 27, "calendar-check");
    // Meera's folded tag (waiting) + "₹ ?"
    const tag = K.claimTag(svg, CX - 90, 925, 0.78, { face: "meera", hidden: true });
    const q = L13.node(svg, CX + 110, 850); K.text(q, 0, 0, "₹ ?", { size: 64, weight: 800, color: C.crText }); L13.hide(q);
    L13.allow(svg);

    // ======================================================================== timeline
    sp.face.blink(tl, T0 + 5).blink(tl, T0 + 14).blink(tl, T0 + 24);
    // "Right side पर" — the face looks right, the page tints orange
    sp.face.look(tl, T0 + 0.3, 5, 1);
    sp.tint(tl, cue("s04", "@right"), "R", true);
    L13.drop(tl, head, cue("s04", "@liabilities") - 0.2);
    const rowDrop = (r, t) => L13.drop(tl, r.n, t, { dur: 0.34 });
    // Ravi Mama — inline 30,000 − 3,000 = 27,000
    rowDrop(rLoan, cue("s04", "@ravi") - 0.15);
    tl.set(rLoan.inl.a, { opacity: 1 }, cue("s04", "@thirty")); K.pulseNode(tl, rLoan.inl.a, cue("s04", "@thirty"), 1.08);
    tl.set(rLoan.inl.b, { opacity: 1 }, cue("s04", "@three")); K.pulseNode(tl, rLoan.inl.b, cue("s04", "@three"), 1.08);
    rLoan.inl.c.enter(tl, cue("s04", "@twenty-seven") - 0.1); rLoan.inl.c.to(tl, cue("s04", "@twenty-seven"), 27000, 0.6);
    sp.face.expr(tl, cue("s04", "@back"), "happy");
    const fill = (r, tRow, tVal, v) => { rowDrop(r, tRow); r.tk.to(tl, tVal, v, 0.7); };
    fill(rGop, cue("s04", "@gopal") - 0.15, cue("s04", "@three", 2) - 0.05, 3000);
    fill(rAdv, cue("s04", "@catering") - 0.15, cue("s04", "@four") - 0.05, 4000);
    L13.drop(tl, may, cue("s04", "@chai") - 0.3);
    fill(rEl, cue("s04", "@electricity") - 0.15, cue("s04", "@one") - 0.05, 1000);
    L13.drop(tl, tot, cue("s04", "@total") - 0.1); totT.to(tl, cue("s04", "@thirty-five") - 0.1, 35000, 0.9);
    K.pulseNode(tl, totT.g, cueEnd("s04", "@thirty-five") + 0.3, 1.06);
    // Meera's tag hangs, folded, waiting
    const tTag = Math.min(cueEnd("s04", "@thirty-five") + 0.7, sc.end - 1.4);
    tag.enter(tl, tTag); L13.drop(tl, q, tTag + 0.25);
    sp.face.expr(tl, tTag, "wow").look(tl, tTag, 3, 4);
  };
})();

// s04 — Why it must balance. The shared JournalCard shows T16 (Ravi Mama: Dr Loan ₹3,000 + Dr Interest ₹300 / Cr Cash ₹3,300): two Dr lines + a brace = ₹3,300, an "=" to the single Cr line.
// The card then shrinks to the top; 20 tiny entries (a blue half + an orange half) stream into two wells, both rising by the same amount. Addendum: the software laptop card refuses a lopsided
// entry (₹3,300 | ₹3,000, Save greyed, red x) and lights Save once it reads ₹3,300 | ₹3,300. Out: default torn-paper wipe into s05.
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.sky, 1100);
    const cal = L.cal(svg, 30);

    // ---- the journal card (centre) inside two wrappers so it can shrink + move to the top without fighting its own transforms
    const CX = 960, CYC = 640;
    const cardPos = K.g(svg, {}), cardScale = K.g(cardPos, {});
    const jc = K.journalCard(cardScale, CX, CYC, 1, { rows: 4, anchor: "center" });
    const p0 = jc.cellPos(0, "dr"), p1 = jc.cellPos(1, "dr"), pc0 = jc.cellPos(0, "cr"), p2 = jc.cellPos(2, "cr");

    // brace over the two Dr amounts (drawn in the empty Cr cells of lines 0-1), the sum chip, and the "=" disc
    const bx = p0.x + 126, y1 = p0.y - 20, y2 = p1.y + 20, ym = (y1 + y2) / 2;
    const brace = K.g(svg, { opacity: 0 });
    K.ink(brace, [[bx, y1], [bx + 12, y1 + 8], [bx + 12, ym - 14], [bx + 30, ym], [bx + 12, ym + 14], [bx + 12, y2 - 8], [bx, y2]], 6, C.ink);
    const sumChip = L.node(svg, pc0.x + 44, ym); L.hide(sumChip);
    const sumTk = K.ticker(sumChip, 0, 0, 1, { value: 0, size: 38, chip: true, w: 160, h: 66, edge: C.cr });
    const eq = L.node(svg, pc0.x + 44, (ym + p2.y) / 2 + 4); L.hide(eq);
    K.paper(K.shadow(eq, 2), K.cutEll(0, 0, 24, 24, 1), C.cream);
    K.paper(eq, K.cutRect(-12, -9, 24, 6, 0.3, 10), C.ink); K.paper(eq, K.cutRect(-12, 3, 24, 6, 0.3, 10), C.ink);
    L.allow(svg);

    // ---- the two wells + totals chips (hidden until the stream)
    const WY = 1010, WH = 560, WW = 380, WX = [610, 1310];
    const wells = K.g(svg, {}); L.hide(wells);
    const fills = WX.map((x, i) => {
      K.tex(K.shadow(wells, 2), K.cutRect(x - WW / 2, WY - WH, WW, WH, 2, 24), "pat-paper");
      const col = i === 0 ? C.dr : C.cr;
      const f = K.el("rect", { x: x - WW / 2 + 14, y: WY - 14, width: WW - 28, height: 0, fill: col, opacity: 0.9 }, wells);
      return f;
    });
    const wChips = WX.map((x, i) => { const n = L.node(svg, x, 395); L.hide(n); const tk = K.ticker(n, 0, 0, 1, { value: 0, size: 54, chip: true, w: 330, h: 92, edge: i === 0 ? C.dr : C.cr, color: i === 0 ? C.drText : C.crText }); return { n, tk }; });
    const minis = [];
    for (let k = 0; k < 20; k++) {
      const n = K.g(svg, { opacity: 0 });
      const half = (col, dx) => { const h = K.g(n, { transform: `translate(${dx} 0)` }); K.paper(K.shadow(h, 1), K.cutRect(-30, -18, 60, 36, 0.8, 12), col); return h; };
      minis.push({ n, b: half(C.dr, -31), o: half(C.cr, 31) });
    }

    // ---- software laptop card
    const sv = L.save(svg, 960, 600, 1.35); L.hide(sv.n);

    // ======================================================================================= timeline
    // the entry writes on behind the pencil (3 lines + narration); card drops in first
    jc.enter(tl, T0 + 0.25, { dur: 0.4 });
    const e = jc.entry(tl, T0 + 0.8, { date: "Apr 30", speed: 1.05,
      lines: [{ account: "Loan from Ravi Mama", dr: 3000, tag: "personal_receiver" }, { account: "Interest", dr: 300, tag: "nominal_expense" }, { account: "Cash", cr: 3300, tag: "real_out" }],
      narration: { icon: "handshake", text: "loan + interest" } });
    jc.head(tl, T0 + 0.5, "all", { stagger: 0.08 });
    // "दो बराबर halves" — the Dr half lights (blue), then the Cr half (orange)
    const tH = cue("s04", "@halves");
    jc.highlightRow(tl, tH - 0.25, 0, { hold: 0.5 }); jc.highlightRow(tl, tH - 0.25, 1, { hold: 0.5 });
    jc.highlightRow(tl, tH + 0.55, 2, { hold: 0.7 });
    // Ravi Mama: 3,000 + 300 on the left = 3,300 on the right
    const tThree = cue("s04", "@three");
    tl.to(brace, { opacity: 1, duration: 0.3, ease: "power2.out" }, tThree - 0.1);
    L.drop(tl, sumChip, cue("s04", "@plus") - 0.1, { dur: 0.3 }); sumTk.to(tl, cue("s04", "@plus"), 3300, 0.6);
    L.drop(tl, eq, cue("s04", "@right") - 0.05, { dur: 0.3 });
    jc.pulseRow(tl, cue("s04", "@right") + 0.5, e.lines[2]);
    // equal halves go in -> equal totals come out: the card shrinks to the top, 20 tiny entries stream into the wells
    const tT = cue("s04", "@totals");
    const tS0 = tT - 1.5;
    tl.to(brace, { opacity: 0, duration: 0.2 }, tS0 - 0.1); L.lift(tl, sumChip, tS0 - 0.1, { dur: 0.2 }); L.lift(tl, eq, tS0 - 0.1, { dur: 0.2 });
    tl.to(cardScale, { scale: 0.26, svgOrigin: `${CX} ${CYC}`, duration: 0.6, ease: "power3.inOut" }, tS0);
    tl.to(cardPos, { y: 190 - CYC, duration: 0.6, ease: "power3.inOut" }, tS0);
    L.drop(tl, wells, tS0 + 0.4, { dur: 0.4 });
    wChips.forEach((c) => L.drop(tl, c.n, tS0 + 0.5, { dur: 0.35 }));
    const STEP = 0.14, T1 = tS0 + 0.9, FH = (WH - 28) / 20;
    minis.forEach((m, k) => {
      const t = T1 + k * STEP;
      // the tiny card appears at the shrunken card, falls to the wells' mid-height and splits: halves go left / right and land in the wells
      tl.set(m.n, { opacity: 1, x: CX, y: 190 }, t);
      tl.to(m.n, { y: 520, duration: 0.3, ease: "power2.in" }, t);
      tl.to(m.b, { x: WX[0] - CX, duration: 0.3, ease: "power2.out" }, t + 0.3);
      tl.to(m.o, { x: WX[1] - CX, duration: 0.3, ease: "power2.out" }, t + 0.3);
      tl.to(m.n, { y: WY - 14 - (k + 1) * FH + 10, duration: 0.25, ease: "power1.in" }, t + 0.3);
      tl.set(m.n, { opacity: 0 }, t + 0.58);
      fills.forEach((f) => tl.to(f, { attr: { y: WY - 14 - (k + 1) * FH, height: (k + 1) * FH }, duration: 0.2, ease: "none" }, t + 0.56));
    });
    wChips.forEach((c) => c.tk.to(tl, T1 + 0.5, 136000, STEP * 20));
    // the software refuses a lopsided entry, then accepts a balanced one
    const tSw = cue("s04", "@software");
    tl.to(wells, { opacity: 0, duration: 0.25 }, tSw - 0.5); wChips.forEach((c) => L.lift(tl, c.n, tSw - 0.5, { dur: 0.25 }));
    tl.to(cardScale, { opacity: 0, duration: 0.25 }, tSw - 0.4);
    L.drop(tl, sv.n, tSw - 0.2, { dur: 0.4 });
    L.drop(tl, sv.x, cue("s04", "@save") + 0.3, { dur: 0.25, from: 1.3 });
    const tFix = sc.end - 2.0;
    sv.tr_.to(tl, tFix, 3300, 0.6);
    L.lift(tl, sv.x, tFix, { dur: 0.2 });
    tl.to(sv.lit, { opacity: 1, duration: 0.2, ease: "power2.out" }, tFix + 0.6);
    K.pulseNode(tl, sv.btn, tFix + 0.6, 1.08);
  };
})();

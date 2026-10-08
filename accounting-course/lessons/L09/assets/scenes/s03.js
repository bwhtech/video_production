// s03 — One book per account (the ledger).
//   s03a: the journal sorts money by date (rows in date order, an `Apr 1 → Apr 30` chip); "by account" → Cash rows + Sales rows pick up tints, the Cash jar lights.
//   s03b: a two-tier shelf of 14 labelled jars; each jar turns into a little red khata book (Cash, Bank on their words, the rest in a cascade);
//         the shelf shrinks to the top, the Cash book opens (blue Dr page, orange Cr page) = `Ledger`; `Chart of accounts` chip; Khata looks at the little
//         khatas, then at itself; the one Hindi word `खाता` for 1.7 s.
(function () {
  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    L9.stage(svg, C.teal, 880);
    const cal = L9.cal(svg, 30);

    // ================================================================ s03a — the journal in date order
    const jc = K.journalCard(svg, 760, 1050, 0.95, { rows: 6, tags: false, hidden: true });
    const dchip = L9.node(svg, 1050, 460); L9.hide(dchip);
    {
      const w = 520, h = 88;
      K.paper(K.shadow(dchip, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.6, 20), C.cream);
      K.text(dchip, -150, 3, "Apr 1", { size: 54, weight: 800 });
      K.arrowShape(dchip, -10, 2, 90, C.ink, 1, 180, 24);
      K.text(dchip, 150, 3, "Apr 30", { size: 54, weight: 800 });
    }
    const cashJar = K.jarRig(svg, 1590, 700, 1.5, { label: "Cash", icon: "coins", contents: "coins", fill: 0.7, hidden: true });
    // the row tints (multiplied over the written rows, positioned from the card's cell geometry)
    const tint = (i, col, op) => {
      const p = jc.cellPos(i, "date");
      const w = 760 + (jc.W / 2) * 0.95 - 12 - (p.x - 90), r = K.paper(svg, K.cutRect(p.x - 90, p.y - 33, w, 66, 0.8, 20), col, { opacity: 0 });
      r.setAttribute("style", "mix-blend-mode:multiply");
      return { r, op };
    };
    const tints = [tint(0, "#f7d77a", 0.9), tint(3, "#f7d77a", 0.9), tint(4, "#f7d77a", 0.9), tint(5, "#f6a96c", 0.8)];

    // ================================================================ s03b — shelf of 14 jars → books
    const ACC = [
      ["Cash", "coins"], ["Bank", "landmark"], ["Infotech", "file-text"], ["Stock", "leaf"], ["Equipment", "shopping-cart"], ["Loan from Ravi Mama", "umbrella"], ["Gopal Dairy", "milk"],
      ["Advance from customer", "calendar-check"], ["Capital", "banknote"], ["Drawings", "wallet"], ["Sales", "trending-up"], ["Rent", "key"], ["Salary", "user"], ["Interest", "percent"],
    ];
    const shelfW = K.g(svg, {});
    const shelf = K.bookshelf(shelfW, 960, 905, 1, { tiers: 2, w: 1640, per: 7, n: 14, tierH: 340, icons: ACC.map((a) => a[1]), style: "covers", shown: false, hidden: true });
    const jars = [], names = [];
    ACC.forEach(([nm, ic], i) => {
      const sl = shelf.slots[i], x = 960 + sl.x, y = 905 + sl.y;
      jars.push(K.jarRig(shelfW, x, y, 0.85, { icon: ic, contents: "coins", fill: 0.6, hidden: true }));
      const lab = L9.node(shelfW, x, y + 62); L9.hide(lab);
      const parts = nm.indexOf(" ") > 0 && nm.length > 9 ? (nm === "Loan from Ravi Mama" ? ["Loan from", "Ravi Mama"] : nm === "Advance from customer" ? ["Advance from", "customer"] : [nm]) : [nm];
      const lw = Math.max(...parts.map((p) => p.length)) * 18.5 + 30, lh = parts.length * 38 + 14;
      K.tex(K.shadow(lab, 1), K.cutRect(-lw / 2, -lh / 2, lw, lh, 1.2, 16), "pat-paper");
      parts.forEach((p, k) => K.text(lab, 0, (k - (parts.length - 1) / 2) * 38 + 2, p, { size: 34, weight: 700 }));
      names.push(lab);
    });
    // the Cash ledger page (empty) that the shelf hands over to
    const lp = K.ledgerPage(svg, 960, 1034, 1, { account: "Cash", icon: "coins", rows: 3, hidden: true });
    const pageTint = (side, col) => { const p = lp.pages[side]; const r = K.paper(lp.body, K.cutRect(p.x0, p.y0, p.w, p.h, 1.2, 26), col, { opacity: 0 }); r.setAttribute("style", "mix-blend-mode:multiply"); return r; };
    const tDr = pageTint("dr", C.dr), tCr = pageTint("cr", C.cr);
    const ledgerChip = L9.chip(svg, 330, 215, "Ledger", { size: 64, w: 290 });
    const chartChip = L9.chip(svg, 330, 330, "Chart of accounts", { size: 52, w: 500 });
    const hindiChip = L9.chip(svg, 330, 450, "खाता", { size: 76, w: 250 });
    const khata = K.khataRig(svg, 1700, 480, 0.62, { expr: "awake" });
    tl.set(khata.g, { autoAlpha: 0 }, 0);
    L9.allow(svg);

    // ======================================================================================= timeline — s03a
    const tTrick = cue("s03a", "@trick"), tJ = cue("s03a", "@journal"), tDate = cue("s03a", "@date");
    jc.enter(tl, tTrick - 0.1);
    const rows = [
      { date: "Apr 1", account: "Cash", dr: 50000 }, { account: "Capital", cr: 50000 },
      { date: "Apr 2", account: "Equipment", dr: 36000 }, { account: "Cash", cr: 36000 },
      { date: "Apr 15", account: "Cash", dr: 18000 }, { account: "Sales", cr: 18000 },
    ];
    let tw = tJ - 0.3;
    rows.forEach((r) => { const l = jc.writeRow(tl, tw, { ...r, speed: 2.2 }); tw = l.tEnd - 0.05; });
    L9.drop(tl, dchip, tDate - 0.1, { dur: 0.35 });
    const tCash = cue("s03a", "@cash");
    cashJar.enter(tl, tCash - 0.2);
    const tAcc2 = cue("s03a", "@account", 2);
    tints.forEach(({ r, op }, i) => tl.to(r, { opacity: op, duration: 0.3, ease: "power2.out" }, tAcc2 + 0.1 + i * 0.12));
    cashJar.light(tl, tAcc2 + 0.4, { hold: 1.2 });
    K.pulseNode(tl, cashJar.body, tAcc2 + 0.4, 1.06);

    // ======================================================================================= timeline — s03b
    const tAcc = cue("s03b", "@account");
    jc.exit(tl, tAcc - 1.3); L9.lift(tl, dchip, tAcc - 1.3); cashJar.exit(tl, tAcc - 1.3);
    tints.forEach(({ r }) => tl.to(r, { opacity: 0, duration: 0.2 }, tAcc - 1.3));
    shelf.enter(tl, tAcc - 0.9);
    jars.forEach((j, i) => { j.enter(tl, tAcc - 0.5 + i * 0.1, { dur: 0.3 }); L9.drop(tl, names[i], tAcc - 0.4 + i * 0.1, { dur: 0.3 }); });
    // jar → book swaps
    const swap = (i, t) => {
      tl.to(jars[i].body, { scaleY: 0.82, svgOrigin: O, duration: 0.1, ease: "power1.in" }, t - 0.1);
      jars[i].exit(tl, t, { dur: 0.15 });
      shelf.put(tl, t + 0.05, i, { from: 90 });
    };
    swap(0, cue("s03b", "@cash"));
    swap(1, cue("s03b", "@bank"));
    const tEvery = cue("s03b", "@every");
    for (let i = 2; i < 14; i++) swap(i, tEvery + (i - 2) * 0.12);
    // hand over to the Cash book: the shelf shrinks to the top, the labels leave, the ledger page opens
    const tPage = cue("s03b", "@page");
    names.forEach((n, i) => L9.lift(tl, n, tPage - 0.5 + i * 0.015, { dur: 0.2 }));
    tl.to(shelfW, { scale: 0.42, y: -462, svgOrigin: "960 905", duration: 0.9, ease: "power2.inOut" }, tPage - 0.3);
    shelf.pull(tl, tPage + 0.5, 0, { dy: 40, k: 1.25 });
    lp.enter(tl, tPage + 0.35);
    const tL = cue("s03b", "@left"), tR = cue("s03b", "@right");
    [[tDr, tL], [tCr, tR]].forEach(([r, t]) => { tl.fromTo(r, { opacity: 0 }, { opacity: 0.4, duration: 0.25, ease: "power2.out", immediateRender: false }, t); tl.to(r, { opacity: 0, duration: 0.4 }, t + 1.4); });
    // `Ledger` lands on the shelf edge, then `Chart of accounts`
    L9.drop(tl, ledgerChip.n, cue("s03b", "@ledger"), { dur: 0.35 });
    const tChart = cue("s03b", "@chart");
    L9.drop(tl, chartChip.n, tChart, { dur: 0.35 });
    shelf.books.forEach((b, i) => K.pulseNode(tl, b._inner, tChart + 0.2 + i * 0.05, 1.12));
    // Khata glances at the little khatas, then at itself
    const tK = cue("s03b", "@khata");
    tl.set(khata.g, { autoAlpha: 1 }, tK - 1.2);
    khata.hop(tl, tK - 1.2, { height: 30 });
    khata.look(tl, tK, -14, -4).expr(tl, tK, "happy");
    khata.look(tl, tK + 1.3, 0, 8).blink(tl, tK + 0.7);
    // the one Hindi word
    const tM = cue("s03b", "@means");
    L9.drop(tl, hindiChip.n, tM, { dur: 0.35 }); L9.lift(tl, hindiChip.n, tM + 1.7, { dur: 0.25 });
    khata.jitter(tl, tK - 1.2, sc.end);
  };
})();

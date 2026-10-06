// s11 — Your Turn. Three picture cards: (1) tea + milk + sugar ₹6,000 with two blank lines `Dr ?` / `Cr ?` · (2) the Rent key-slip over Khata's spine `?` + the strip `A + Expenses = …`
// · (3) the hypothetical, on a dashed "imagine" card: SMS `DEBITED` + a bill + Meera's Khata with `Bank` on a blank line `?`.
// Khata (left) holds up a `?` while each question is read; "answers next lesson" = calendar-check medallion + a page flap.  Out: default torn-paper wipe into s12.
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L6.stage(K, svg, C.teal, 880);
    [[20, 230, 160, 650], [1740, 280, 170, 600]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#2a9a8e" : "#34aa9e"));
    L6.cal(K, svg, 20);

    // ---- the three cards (rig = wrapper > pos > sc > inner): inner drops in, pos slides, sc lifts on its turn
    const CW = 520, CH = 560, CY = 520, XS = [330, 960, 1590];
    const cards = XS.map((x, i) => {
      const r = L6.rig(K, svg, x, CY); L6.hide(r.inner);
      if (i < 2) K.card(r.inner, 0, 0, CW, CH, { header: C.saffron, title: String(i + 1), titleSize: 60, headerH: 84 });
      else {
        K.imagineCard(r.inner, 0, 0, CW, CH, {});
        const nb = L6.node(K, r.inner, 195, -228); K.paper(K.shadow(nb, 1), K.cutEll(0, 0, 40, 40, 1), C.saffron); K.text(nb, 0, 3, "3", { size: 48, weight: 800 });
      }
      return r;
    });
    const part = (ci, x, y, s = 1) => L6.hide(L6.node(K, cards[ci].inner, x, y, s));
    const dash = (parent, text, col, w = 190) => {
      K.paper(K.shadow(parent, 1), K.cutRect(-w / 2, -33, w, 66, 1.4, 20), C.cream, { opacity: 0.85 });
      K.el("path", { d: K.cutRect(-w / 2 + 7, -26, w - 14, 52, 1, 22), fill: "none", stroke: col, "stroke-width": 4, "stroke-dasharray": "13 9", opacity: 0.85 }, parent);
      K.text(parent, 0, 3, text, { size: 42, weight: 800, color: col === C.dr ? C.drText : C.crText }).setAttribute("data-layout-allow-overlap", "true");
    };
    // card 1 — tea + milk + sugar (₹6,000) · `Dr ?` / `Cr ?` · calendar leaf 2
    const tea = part(0, -110, -25), milk = part(0, 0, -25), sugar = part(0, 110, -25);
    K.medallion(tea, 0, 0, 52, "leaf"); K.medallion(milk, 0, 0, 52, "milk");
    K.paper(K.shadow(sugar, 1), K.cutEll(0, 0, 52, 52, 1.6), C.sky);
    [[-16, 8], [14, 10], [0, -14]].forEach(([x, y]) => K.paper(K.shadow(sugar, 1), K.cutRect(x - 17, y - 17, 34, 34, 1.2, 12), C.white));
    const amt1 = part(0, 0, 62); K.text(amt1, 0, 0, "₹6,000", { size: 60, weight: 800 });
    const dq = part(0, -110, 160), cq = part(0, 110, 160); dash(dq, "Dr ?", C.dr); dash(cq, "Cr ?", C.cr);
    const leaf = part(0, 190, -105); { K.paper(K.shadow(leaf, 1), K.cutRect(-26, -24, 52, 50, 0.8, 12), C.cream); K.paper(leaf, K.cutRect(-26, -24, 52, 15, 0.5, 12), C.coral); K.text(leaf, 0, 12, "2", { size: 30, weight: 800 }); }
    // card 2 — Rent key slip over the spine `?` + the strip `A + Expenses = …`
    const mk2 = K.khataRig(cards[1].inner, 0, 100, 0.36, { open: true, expr: "awake" });
    gsap.set(mk2.tints.L, { opacity: 0.8 }); gsap.set(mk2.tints.R, { opacity: 0.8 });
    const slip2 = part(1, 0, -55); K.tex(K.shadow(slip2, 2), K.cutRect(-95, -42, 190, 84, 1.6, 20), "pat-paper"); K.medallion(slip2, -40, 0, 32, "key", C.coral); K.text(slip2, 38, 3, "Rent", { size: 36, weight: 800 });
    const q2 = part(1, 125, -80); K.qmark(q2, 0, 0, 1.4, C.coral);
    const eq = [["A", C.dr, 56, -192], ["+", null, 30, -140], ["Expenses", C.coral, 160, -30], ["=", null, 34, 70], ["…", null, 50, 125]].map(([t, col, w, x]) => {
      const n = part(1, x + 20, 205);
      if (col) { K.paper(K.shadow(n, 1), K.cutRect(-w / 2, -26, w, 52, 1, 14), col); K.text(n, 0, 2, t, { size: 32, weight: 800, color: K.onColor(col) }).setAttribute("data-layout-allow-overlap", "true"); }
      else K.text(n, 0, 4, t, { size: 44, weight: 800 });
      return n;
    });
    // card 3 — the imagine card: SMS DEBITED (no amount) + a bill + Khata with `Bank` on a blank line `?`
    const sms = part(2, -50, -118, 1.0); K.smsCard(sms, 0, 0, 270, 196, { kind: "DEBITED", amount: " ", acct: "A/c XX12" });
    const bill = part(2, 170, -145); K.medallion(bill, 0, 0, 46, "receipt", C.coral);
    const mk3 = K.khataRig(cards[2].inner, 0, 175, 0.36, { open: true, expr: "awake" });
    gsap.set(mk3.tints.L, { opacity: 0.8 }); gsap.set(mk3.tints.R, { opacity: 0.8 });
    const bankLine = part(2, 0, 30); dash(bankLine, "Bank", C.dr, 200);
    const q3 = part(2, 150, 28); K.qmark(q3, 0, 0, 1.4, C.coral);

    // Khata (left) holds up the `?`
    const khata = K.khataRig(svg, 215, 1048, 0.6, { expr: "awake" });
    // "answers next lesson": calendar-check medallion + a page flap that flips
    const calN = L6.hide(L6.node(K, svg, 960, 975)); K.medallion(calN, 0, 0, 58, "calendar-check");
    const flapPos = K.g(svg, { transform: "translate(960 917)" }), flap = K.g(flapPos, {});
    K.paper(K.shadow(flap, 1), K.cutRect(-58, 0, 116, 116, 1, 20), C.cream);
    K.ink(flap, [[-34, 30], [34, 30]], 4, "#a39684"); K.ink(flap, [[-34, 60], [34, 60]], 4, "#a39684");
    gsap.set(flap, { opacity: 0 });

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 1.6).blink(tl, T0 + 9).blink(tl, T0 + 18);
    // "Your turn. Three quick ones." — the three empty cards drop in
    const tThree = cue("s11", "@three");
    cards.forEach((c, i) => L6.drop(tl, K, c.inner, tThree - 0.1 + i * 0.18));
    khata.hop(tl, cue("s11", "@turn") - 0.1, { height: 40 }); khata.expr(tl, cue("s11", "@turn"), "happy");
    const times = [cue("s11", "@one"), cue("s11", "@two"), cue("s11", "@three", 2)];
    // the card being read lifts a touch; the previous one settles
    times.forEach((t, i) => {
      tl.to(cards[i].sc, { scale: 1.04, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t - 0.1);
      if (i > 0) tl.to(cards[i - 1].sc, { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t - 0.1);
    });
    const d = (n, t, o) => L6.drop(tl, K, n, t, o);
    const askQ = (t, hold) => { khata.emote(tl, t, "?", hold); khata.arm(tl, t - 0.2, "R", 120, 0.3); khata.arm(tl, t + hold, "R", 15, 0.4); };
    // ONE — "Meera buys six thousand rupees of tea, milk and sugar, and pays cash. What's debited, and what's credited?"
    d(tea, cue("s11", "@tea") - 0.1); d(milk, cue("s11", "@milk") - 0.1); d(sugar, cue("s11", "@sugar") - 0.1);
    d(amt1, cue("s11", "@six") - 0.1); d(leaf, times[0] + 0.1);
    d(dq, cue("s11", "@debited") - 0.1); d(cq, cue("s11", "@credited") - 0.1);
    askQ(cue("s11", "@credited"), 1.5);
    // TWO — "Why is an expense a debit?"
    d(slip2, times[1] + 0.1); d(q2, cue("s11", "@debit") - 0.1);
    eq.forEach((n, i) => d(n, cue("s11", "@expense") - 0.1 + i * 0.08, { dur: 0.28 }));
    askQ(cue("s11", "@debit"), 1.3);
    // THREE — "Imagine Meera pays a bill from the bank, and the SMS says debited. In Meera's books, is Bank debited, or credited?"
    d(bill, cue("s11", "@bill") - 0.1); d(sms, cue("s11", "@sms") - 0.1);
    d(bankLine, cue("s11", "@books") - 0.1); d(q3, cue("s11", "@credited", 2) - 0.2);
    askQ(cue("s11", "@credited", 2), 1.8);
    // "Answers next lesson." — calendar-check medallion; a page flaps over it
    d(calN, cue("s11", "@answers") - 0.05);
    const tN = cue("s11", "@next");
    tl.set(flap, { opacity: 1, scaleY: 0.02, svgOrigin: "0 0" }, tN - 0.2);
    tl.to(flap, { scaleY: 1, svgOrigin: "0 0", duration: 0.22, ease: "power2.in" }, tN - 0.2);
    tl.to(flap, { scaleY: 0.02, svgOrigin: "0 0", duration: 0.22, ease: "power2.out" }, tN + 0.05);
    tl.set(flap, { opacity: 0 }, tN + 0.3);
    L6.allow(svg);
  };
})();

// s10 — Your Turn. Three picture cards (question numbers only — the VO carries the words); Khata holds a "?" sign.
//   1 · Ravi Mama's ₹3,300 bundle splitting ₹3,000 + ₹300, ?   2 · phone with UPI ₹4,000, Infotech's face tag, Apr 25, two blank journal lines   3 · Meera's purse ₹3,000 beside the Expense jar, ?
// Answers (for Lesson 9's "Last time"): 1 ₹3,000 only repays the loan; only the ₹300 interest is an expense · 2 Dr Bank 4,000 / To Infotech 4,000 · 3 No — drawings sit in their own Equity pocket.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start;
    L8.stage(svg, C.sky, 880);
    L8.cal(svg, 30);
    const CX = [345, 960, 1575], CY = 480, CW = 520, CH = 640;
    const mk = (i) => {
      const n = L8.node(svg, CX[i], CY); L8.hide(n); L8.card(n, CW, CH);
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 52, -CH / 2 + 52, 36, 36, 1), C.saffron); K.text(n, -CW / 2 + 52, -CH / 2 + 55, String(i + 1), { size: 48, weight: 800 });
      return n;
    };
    const cards = [0, 1, 2].map(mk);
    // ---- card 1: Ravi Mama + the ₹3,300 bundle splitting into ₹3,000 + ₹300
    const ravi = L8.node(cards[0], 120, -220); L8.hide(ravi); K.tex(K.shadow(ravi, 1), K.cutEll(0, 0, 60, 60, 1), "pat-paper"); K.faceArt(ravi, "ravi", 52);
    const whole = L8.node(cards[0], 0, -70); L8.hide(whole);
    K.paper(K.shadow(whole, 1), K.cutRect(-130, -48, 260, 96, 1.6, 20), C.cream);
    const tkAll = K.ticker(whole, 0, 2, 1, { value: 0, size: 62 });
    const partA = L8.node(cards[0], -105, 85); L8.hide(partA);
    K.paper(K.shadow(partA, 1), K.cutRect(-105, -46, 210, 92, 1.6, 20), C.dr); const tkA = K.ticker(partA, 0, 2, 1, { value: 0, size: 54, color: "#fff" });
    const partB = L8.node(cards[0], 135, 85); L8.hide(partB);
    K.paper(K.shadow(partB, 1), K.cutRect(-105, -46, 210, 92, 1.6, 20), C.cr); const tkB = K.ticker(partB, 0, 2, 1, { value: 0, size: 54, color: "#fff" });
    const q1 = L8.qmark(cards[0], 0, 215, 1.5);
    // ---- card 2: Apr 25 · Infotech UPI ₹4,000 · two blank journal lines
    const dt = K.dateTile(cards[1], -120, -215, 0.9, { month: "Apr", day: 25, hidden: true });
    const inf = L8.node(cards[1], 120, -215); L8.hide(inf); K.tex(K.shadow(inf, 1), K.cutEll(0, 0, 62, 62, 1), "pat-paper"); K.faceArt(inf, "infotech", 54);
    const phone = K.phone(cards[1], 0, -30, 0.6, { screen: "upi" }); phone.g.setAttribute("opacity", "0");
    const mkBlank = (y, col) => {
      const n = L8.node(cards[1], 0, y); L8.hide(n);
      K.paper(K.shadow(n, 1), K.cutRect(-220, -34, 440, 68, 1.4, 18), C.cream);
      K.paper(n, K.cutRect(-220, -34, 12, 68, 0.6, 14), col);
      K.el("path", { d: K.cutRect(120, -26, 90, 52, 0.8, 16), fill: "none", stroke: col, "stroke-width": 4, "stroke-dasharray": "10 8", "stroke-linecap": "round" }, n);
      K.el("path", { d: K.cutRect(-190, -10, 190, 20, 0.6, 12), fill: "none", stroke: C.ink, "stroke-width": 3, "stroke-dasharray": "10 8", opacity: 0.4 }, n);
      return n;
    };
    const blank1 = mkBlank(165, C.dr), blank2 = mkBlank(250, C.cr);
    // ---- card 3: Meera's purse ₹3,000 beside the Expense jar
    const purse = L8.node(cards[2], -120, -60); L8.hide(purse); K.medallion(purse, 0, 0, 72, "wallet");
    const tkP = K.ticker(L8.node(cards[2], -120, 55), 0, 0, 1, { value: 0, size: 54, chip: true, w: 190, h: 76, edge: C.cr });
    L8.hide(tkP.g.parentNode);
    const jar = K.jarRig(cards[2], 125, 130, 0.8, { label: "Expense", icon: "receipt", contents: "coins", fill: 0.35, edge: C.dr, hidden: true });
    const q3 = L8.qmark(cards[2], 125, -150, 1.5);
    // ---- Khata with a "?" sign + the answers-next-lesson calendar flip
    const khata = K.khataRig(svg, 960, 1052, 0.5, { expr: "awake" });
    const cal = K.calendarPage(svg, 1330, 960, 0.5, { month: "April", day: 30, hidden: true });
    L8.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 18); khata.jitter(tl, T0, sc.end);
    khata.expr(tl, cue("s10", "@turn"), "happy").hop(tl, cue("s10", "@turn"), { height: 40 });
    // 1 — Ravi Mama's ₹3,300
    L8.drop(tl, cards[0], cue("s10", "@one") - 0.1, { dur: 0.4 });
    L8.drop(tl, ravi, cue("s10", "@ravi") - 0.1, { dur: 0.3 });
    L8.drop(tl, whole, cue("s10", "@three", 2) - 0.1, { dur: 0.3 }); tkAll.to(tl, cue("s10", "@three", 2), 3300, 0.9);
    const tSplit = cue("s10", "@expense") - 0.5;
    tl.to(whole, { opacity: 0.35, duration: 0.3 }, tSplit);
    L8.drop(tl, partA, tSplit, { dur: 0.3 }); tkA.to(tl, tSplit + 0.1, 3000, 0.6);
    L8.drop(tl, partB, tSplit + 0.2, { dur: 0.3 }); tkB.to(tl, tSplit + 0.3, 300, 0.5);
    L8.drop(tl, q1, cue("s10", "@expense") + 0.1, { dur: 0.3 });
    khata.emote(tl, cue("s10", "@expense") + 0.2, "?", 1.3);
    // 2 — Infotech pays ₹4,000 by UPI on Apr 25
    tl.to(cards[0], { opacity: 0.6, duration: 0.4, ease: "power2.inOut" }, cue("s10", "@two") - 0.2);
    L8.drop(tl, cards[1], cue("s10", "@two") - 0.1, { dur: 0.4 });
    dt.enter(tl, cue("s10", "@april") - 0.1);
    L8.drop(tl, inf, cue("s10", "@journal"), { dur: 0.3 });
    tl.set(phone.g, { opacity: 1 }, cue("s10", "@journal") + 0.4);
    phone.show(tl, cue("s10", "@upi") - 0.4, { type: "upi", kind: "RECEIVED", amount: "₹4,000", from: "Infotech" }); phone.buzz(tl, cue("s10", "@upi") - 0.3);
    L8.drop(tl, blank1, cue("s10", "@upi") + 0.5, { dur: 0.3 }); L8.drop(tl, blank2, cue("s10", "@upi") + 0.7, { dur: 0.3 });
    // 3 — drawings: expense, or not?
    tl.to(cards[1], { opacity: 0.6, duration: 0.4, ease: "power2.inOut" }, cue("s10", "@three", 4) - 0.2);
    L8.drop(tl, cards[2], cue("s10", "@three", 4) - 0.1, { dur: 0.4 });
    L8.drop(tl, purse, cue("s10", "@drawings") - 0.1, { dur: 0.3 });
    L8.drop(tl, tkP.g.parentNode, cue("s10", "@drawings") + 0.1, { dur: 0.3 }); tkP.to(tl, cue("s10", "@drawings") + 0.2, 3000, 0.6);
    jar.enter(tl, cue("s10", "@expense", 2) - 0.2);
    L8.drop(tl, q3, cue("s10", "@not") - 0.1, { dur: 0.3 });
    // answers next lesson — the calendar page flips forward
    cal.enter(tl, cue("s10", "@answers") - 0.1);
    cal.flip(tl, cue("s10", "@next") + 0.2, { month: "May", day: 1 });
    khata.expr(tl, cue("s10", "@answers"), "wink");
  };
})();

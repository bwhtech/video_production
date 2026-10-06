// s10 — Your Turn: the three tiles flip open into question cards; Khata raises a "?" card; a calendar-flip icon says "next lesson".
// Pictures + numbers only (the written questions live in the description). Out: default torn-paper wipe.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", T0 = sc.start, L = window.S910;
    const cam = K.g(svg, { id: "s10-cam" });
    K.wall(cam, C.teal, 860);
    window.skyline(cam, C.teal, 880, 13, { minH: 150, maxH: 200, dark: 0.14 });
    K.table(cam, 880);
    const cal = DH.calendar(cam, 1);
    const cards = L.X.map((x, i) => {
      const n = DH.node(cam, x, L.Y);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-L.W / 2, -L.H / 2, L.W, L.H, 2.4, 26), "pat-paper");
      K.paper(K.shadow(n.inner, 1), K.cutEll(-L.W / 2 + 56, -L.H / 2 + 56, 40, 40, 1.4), C.coral);
      K.text(n.inner, -L.W / 2 + 56, -L.H / 2 + 59, String(i + 1), { size: 54, weight: 800, color: "#ffffff" });
      n.art = K.g(n.inner, { transform: "translate(0 30)" });
      return n;
    });
    const sub = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` }), {});
    // card 1: Gopal Dairy milk cans + ₹8,000 + clock (pay later)
    const a1 = cards[0].art;
    const cans = sub(a1, 0, 250, 1.85); K.milkCans(cans, 0, 0, 1);
    const p8 = sub(a1, 0, -215); K.label(p8, 0, 0, "₹8,000", { size: 80, bg: "paper", shadow: 2 });
    const clk = sub(a1, 175, -90); K.medallion(clk, 0, 0, 66, "clock", C.coral);
    const gtag = sub(a1, -120, -190); K.faceTag(gtag, 0, 0, "meera", 1, 0); gtag.setAttribute("opacity", "0");
    // card 2: Meera's scooter + her face tag + ?
    const a2 = cards[1].art;
    const sc2 = sub(a2, 0, 270, 1.1); K.scooter(sc2, 0, 0, 1);
    const mt = sub(a2, -115, -185, 2.2); K.faceTag(mt, 0, 0, "meera", 1, 0);
    const q2 = sub(a2, 150, -165); K.qmark(q2, 0, 0, 2.0, C.cr);
    // card 3: galla ₹80,000, Ravi tag ₹30,000, Meera tag ₹?
    const a3 = cards[2].art;
    const g3 = sub(a3, -90, 85, 1.25); K.galla(g3, 0, 0, 1, { open: true, overflow: true });
    const l3 = sub(a3, -50, -222); K.label(l3, 0, 0, "₹80,000", { size: 60, bg: "paper", shadow: 2 });
    const r3 = sub(a3, 120, 70, 1.25); K.claimTag(r3, 0, 0, 1, { face: "ravi", amount: 30000 });
    const m3 = sub(a3, 0, 300, 1.2); K.claimTag(m3, 0, 0, 1, { face: "meera" }); K.label(m3, 0, -80, "₹?", { size: 60, bg: "paper", shadow: 1 });
    const arts = [[cans, p8, clk], [sc2, mt, q2], [g3, l3, r3, m3]];
    arts.flat().forEach((e) => DH.hide(e));
    // Khata + "?" card + calendar-flip icon
    const k = K.khataRig(cam, window.KH.x, window.KH.y, window.KH.s, { expr: "awake" });
    const sign = DH.node(cam, 300, 960); const signA = K.g(sign.inner, { transform: "scale(1.35)" }); K.tex(K.shadow(signA, 1), K.cutRect(-44, -56, 88, 112, 1.8, 18), "pat-paper"); K.qmark(signA, 2, 18, 1, C.coral); DH.hide(sign.inner);
    const calIcon = DH.node(cam, 1760, 975); K.medallion(calIcon.inner, 0, 0, 76, "calendar", C.coral); DH.hide(calIcon.inner);

    // ======================================================================== timeline
    cards.forEach((n) => { tl.fromTo(n.inner, { scaleX: 0.02, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.3, ease: "power2.out", immediateRender: true }, T0); });
    const focus = (i, t) => cards.forEach((n, j) => { tl.to(n.outer, { opacity: j === i ? 1 : 0.65, duration: 0.25 }, t); tl.to(n.inner, { scale: j === i ? 1.05 : 1, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t); });
    const tTurn = cue("s10", "@turn");
    k.arm(tl, tTurn - 0.15, "R", 125).expr(tl, tTurn - 0.15, "happy");
    DH.pop(tl, sign.inner, tTurn - 0.05, { from: 0.6 });
    // 1 — Gopal Dairy: ₹8,000 of milk, pay later
    const tOne = cue("s10", "@one");
    focus(0, tOne); k.look(tl, tOne, -8, -6);
    DH.pop(tl, cans, cue("s10", "@milk"), { from: 1.1 });
    DH.pop(tl, p8, cue("s10", "@eight"));
    DH.pop(tl, clk, cue("s10", "@later"));
    // 2 — Meera's personal scooter
    const tTwo = cue("s10", "@two");
    focus(1, tTwo); k.look(tl, tTwo, 0, -8);
    DH.pop(tl, mt, cue("s10", "@meera's"));
    DH.pop(tl, sc2, cue("s10", "@scooter"), { from: 1.1 });
    DH.pop(tl, q2, cue("s10", "@asset"));
    // 3 — ₹80,000 − ₹30,000 = Meera's share?
    const tThree = cue("s10", "@three", 2);
    focus(2, tThree); k.look(tl, tThree, 9, -6);
    DH.pop(tl, g3, cue("s10", "@eighty")); DH.pop(tl, l3, cue("s10", "@eighty") + 0.15);
    DH.pop(tl, r3, cue("s10", "@thirty"));
    DH.pop(tl, m3, cue("s10", "@share"));
    // "Answers at the start of the next lesson." — all cards come back; calendar-flip icon
    const tAns = cue("s10", "@answers");
    cards.forEach((n) => { tl.to(n.outer, { opacity: 1, duration: 0.3 }, tAns - 0.1); tl.to(n.inner, { scale: 1, svgOrigin: O, duration: 0.3 }, tAns - 0.1); });
    k.look(tl, tAns, -9, 2).expr(tl, tAns, "wink");
    DH.pop(tl, calIcon.inner, cue("s10", "@next"));
    k.blink(tl, T0 + 9).blink(tl, T0 + 20);
  };
})();

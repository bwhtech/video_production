// s08 — Misconception: Khata the usher. A cinema doorway (the April film strip inside) with a velvet rope; Khata in a tiny usher's cap checks "tickets".
//   Meera's thought: "every rupee that moved belongs in the movie" → red ✗ (once). Queue from the left: Ravi Mama + ₹30,000 (blocked) · Ravi Mama again with ₹3,000 + a ₹300 coin (only the coin gets a ticket →
//   Interest frame lights) · the cart ₹36,000 (a ₹1,000 coin pops off → Depreciation frame) · Meera's drawings ₹3,000 (blocked, shrug, walks home) · the ₹4,000 advance envelope (May 5, blocked) · Infotech's ₹4,000 UPI payment
//   (Khata points at the Sales frame: Priya's tag pulses, a tick lands on the phone). Two signs hang at the end: Revenue / Expenses.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start, GY = 1010, WS = 0.8;
    L.stage(svg, C.coral, 930);
    // ---- the doorway (right) with the strip inside; frame rings that light when a ticket lands
    K.paper(K.shadow(svg, 2), K.cutRect(1196, 24, 716, 1040, 2, 30), "#6e2f2a");
    const film = L.film(svg, { filled: true, values: { 2: 40000, 8: 24700 } });
    const ringFor = (i) => { const f = film.fr[i], y = 540 + f.cy;
      return K.el("path", { d: K.cutRect(1550 - film.cw / 2 - 5, y - film.ch / 2 - 5, film.cw + 10, film.ch + 10, 0.8, 22), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, svg); };
    const rings = { 0: ringFor(0), 6: ringFor(6), 7: ringFor(7) };
    const fy = (i) => 540 + film.fr[i].cy;
    const priyaTag = L.node(svg, 1262, fy(0) - 52); L.hide(priyaTag); K.faceTag(priyaTag, 0, 0, "priya", 1.1, -6);
    // signs on the wall by the door: film icon + April, then Revenue / Expenses at the end
    const sAprl = L.node(svg, 1085, 100); L.hide(sAprl); K.medallion(sAprl, -66, 0, 36, "film"); K.label(sAprl, 40, 0, "April", { size: 40, bg: C.saffron, weight: 800 });
    const signR = L.sign(svg, 1085, 250, "indian-rupee", "Revenue", C.cream), signE = L.sign(svg, 1085, 380, "coffee", "Expenses", C.cream);
    L.hide(signR); L.hide(signE);
    // rope + stanchions + Khata the usher
    const post = (x) => { const p = K.shadow(svg, 1); K.paper(p, K.cutRect(x - 9, GY - 240, 18, 240, 1, 20), C.brass); K.paper(p, K.cutEll(x, GY - 246, 17, 17, 0.8), C.goldDark); K.paper(p, K.cutRect(x - 34, GY - 10, 68, 14, 1, 14), C.goldDark); };
    const khata = K.khataRig(svg, 1060, GY, 0.55, { expr: "awake" });
    {
      const b = khata.body, hat = K.g(b, {});
      K.paper(K.shadow(hat, 1), K.cutRect(-76, -430, 152, 46, 2, 16), C.navy);
      K.paper(hat, K.cutRect(-76, -398, 152, 12, 1, 16), C.gold);
      K.paper(K.shadow(hat, 1), K.cutRect(-96, -392, 192, 14, 1.4, 20), "#1d2840");
      const torch = K.g(khata.handAnchor("R"), {});
      K.paper(K.shadow(torch, 1), K.cutRect(-8, -50, 16, 60, 1, 10), "#3b3238"); K.paper(torch, K.cutEll(0, -56, 14, 10, 0.6), C.cream);
    }
    post(930); post(1170);
    K.paper(K.shadow(svg, 1), K.cutStroke([[930, GY - 232], [980, GY - 200], [1050, GY - 190], [1120, GY - 200], [1170, GY - 232]], 14, 1), C.red);

    // ---- people + their "items" (children of the person's mover, local units)
    const rv = K.raviMama(svg, -200, GY, WS, { expr: "happy" });
    const rItems1 = K.g(rv.mover, {}), rItems2 = K.g(rv.mover, {});
    K.umbrella(rItems1, -120, -330, 1, 18);
    K.bundle(rItems1, 190, -310, 1.3, -6); K.label(rItems1, 190, -470, "₹30,000", { size: 46, bg: C.cream, weight: 800 });
    K.bundle(rItems2, 190, -300, 1.0, -6); K.label(rItems2, 190, -440, "₹3,000", { size: 46, bg: C.cream, weight: 800 });
    const rCoin = L.node(rItems2, 330, -330); K.coin(rCoin, 0, 0, 34); K.label(rCoin, 10, -78, "₹300", { size: 46, bg: C.cream, weight: 800 });
    L.hide(rItems1); L.hide(rItems2);
    const mm = K.meera(svg, 360, GY, WS, { expr: "thinking" });
    const mItems = K.g(mm.mover, {}); L.hide(mItems);
    { const sl = L.expSlip(mItems, 200, -330, "wallet", 3000, { w: 330, h: 96, size: 46, face: "meera" }); L.pin(sl.n, -170, -32, 1.3); }
    // cart
    const cartW = L.node(svg, 0, 0);
    const cart = K.stall(cartW, 700, GY, 0.52, { galla: false });
    K.label(cartW, 700, GY - 400, "₹36,000", { size: 46, bg: C.cream, weight: 800 });
    // envelope
    const env = L.node(svg, 740, 640); L.hide(env);
    {
      const e = K.g(env, {});
      K.paper(K.shadow(e, 2), K.cutRect(-130, -80, 260, 160, 2, 20), C.cream);
      K.paper(e, K.cutPoly([[-130, -80], [130, -80], [0, 20]], 1.4, 18), "#efe3cc");
      K.text(e, 0, 38, "₹4,000", { size: 46, weight: 800 });
      env._chip = L.node(env, 66, -96); K.label(env._chip, 0, 0, "May 5", { size: 38, bg: C.saffron, weight: 800 });
      env._chip.setAttribute("data-chip", "1");
    }
    // phone with a UPI card
    const phone = K.phone(svg, 720, 570, 1.45, { screen: "upi" }); L.hide(phone.g);
    const tick = L.node(svg, 900, 400); L.hide(tick); K.paper(K.shadow(tick, 1), K.cutEll(0, 0, 40, 40, 0.8), C.cream); const tmk = K.tickMark(tick, 0, 0, 1.2, { color: C.ink, w: 8 });
    // thought bubble: all April's slips into the film → ✗
    const thought = K.imagineCard(svg, 700, 330, 640, 400, { hidden: true });
    const tSlips = [["banknote", -220, -90], ["receipt", -250, 60], ["handshake", -120, 130], ["shopping-cart", 210, -100], ["wallet", 240, 50], ["coins", 120, 130]].map(([ic, x, y], i) => {
      const n = L.node(thought.area.g, x, y); L.hide(n); K.slip(n, 0, 0, 0.8, (i % 2 ? 4 : -4), ic); return { n, x, y };
    });
    const bigFilm = L.node(thought.area.g, 0, 20); L.hide(bigFilm); K.medallion(bigFilm, 0, 0, 78, "film");

    // ---- helpers
    const walk = (p, t, x, d = 1.2) => p.walkTo(tl, t, x, d);
    const block = (t, hold = 0.9) => { khata.arm(tl, t, "L", 80, 0.2); khata.arm(tl, t + hold, "L", 15, 0.25); };
    const lightFrame = (i, t) => { tl.fromTo(rings[i], { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t); K.pulseNode(tl, film.fr[i].c, t + 0.05, 1.05); };
    const hop = (n, t, x0, y0, x1, y1, dur, h = 120) => {   // n = a wrapper-positioned inner node; x1/y1 are RELATIVE offsets
      const top = Math.min(y0, y1) - h;
      tl.set(n, { opacity: 1 }, t);
      tl.fromTo(n, { x: x0 }, { x: x1, duration: dur, ease: "none", immediateRender: false }, t);
      tl.fromTo(n, { y: y0 }, { y: top, duration: dur * 0.45, ease: "power2.out", immediateRender: false }, t);
      tl.to(n, { y: y1, duration: dur * 0.55, ease: "power2.in" }, t + dur * 0.45);
    };

    // ======================================================================== timeline
    khata.blink(tl, T0 + 3).blink(tl, T0 + 25).blink(tl, T0 + 47);
    L.drop(tl, sAprl, T0 + 0.8, { dur: 0.3 });
    // s08a — the misconception: Meera's thought, then ✗
    const tPeople = cue("s08a", "@people") - 0.2, tRup = cue("s08a", "@rupee"), tMov = cue("s08a", "@movie");
    mm.blinks(tl, T0 + 1.2, cue("s08a", "@khata"), 3.2);
    L.drop(tl, thought.body, tPeople, { dur: 0.4 }); L.drop(tl, bigFilm, tPeople + 0.4, { dur: 0.3 });
    tSlips.forEach((s, i) => L.drop(tl, s.n, tRup - 1.2 + i * 0.2, { dur: 0.3 }));
    tSlips.forEach((s, i) => { tl.to(s.n, { x: 0, y: 20, scale: 0.4, duration: 0.5, ease: "power2.in" }, tRup + i * 0.1); tl.to(s.n, { autoAlpha: 0, duration: 0.1 }, tRup + 0.45 + i * 0.1); });
    const st = K.stamp(tl, svg, 700, 340, tMov + 0.1, 1.9);
    mm.expr(tl, tRup, "happy");
    // Khata at the door: Meera steps away, thought leaves
    const tKh = cue("s08a", "@khata");
    L.lift(tl, thought.body, tKh - 0.3, { dur: 0.25 }); st.lift(tl, tKh - 0.3, { dur: 0.25 });
    mm.expr(tl, tKh - 0.4, "neutral"); walk(mm, tKh - 0.2, -260, 1.4);
    khata.hop(tl, tKh, { height: 36 }).expr(tl, tKh, "happy");
    // 1 — Ravi Mama + ₹30,000
    const tT = cue("s08a", "@thirty");
    tl.set(rItems1, { opacity: 1 }, tKh + 0.2);
    walk(rv, tKh + 0.35, 740, 2.0);
    const tTurn = cue("s08a", "@turned");
    block(tTurn - 0.15, 1.0);
    rv.expr(tl, tTurn + 0.1, "angry").look(tl, tTurn + 0.1, -8, 0);
    walk(rv, tTurn + 0.45, 330, 1.1);
    tl.set(rItems1, { opacity: 0 }, tTurn + 1.7);
    // 1b — he comes straight back: palm out, ₹3,000 + a ₹300 coin
    const tThree = cue("s08a", "@three");
    tl.set(rItems2, { opacity: 1 }, tThree - 1.5);
    rv.expr(tl, tThree - 1.4, "happy").look(tl, tThree - 1.4, 8, 0);
    walk(rv, tThree - 1.4, 740, 1.2);
    rv.arm(tl, tThree - 0.1, "R", 80, 20, 0.3);
    block(tThree + 1.2, 1.0);                                           // bundle blocked
    tl.to(rItems2.firstChild, { x: -40, duration: 0.2 }, tThree + 1.5);
    const tInt = cue("s08a", "@interest");
    const tTk = cue("s08a", "@hundred");
    khata.arm(tl, tTk - 0.3, "R", 60, 0.25); khata.arm(tl, tTk + 0.5, "R", 15, 0.3);        // tear a ticket for the coin
    // the ₹300 coin hops through the door onto the Interest frame
    const rcWorld = [740 + 330 * WS, GY - 330 * WS];
    const coin1 = L.node(svg, rcWorld[0], rcWorld[1]); L.hide(coin1); K.coin(coin1, 0, 0, 28);
    tl.set(rCoin, { opacity: 0 }, tInt - 0.1);
    hop(coin1, tInt - 0.1, 0, 0, 1550 - rcWorld[0], fy(7) - rcWorld[1], 0.9, 150);
    tl.set(coin1, { opacity: 0 }, tInt + 0.8);
    lightFrame(7, tInt + 0.8);
    rv.expr(tl, tInt + 1.0, "proud");
    // 2 — the cart (₹36,000)
    const tCart = cue("s08a", "@cart");
    walk(rv, tCart - 0.4, -260, 1.6); tl.set(rItems2, { opacity: 0 }, tCart + 1.3);
    tl.set(cartW, { x: -1100 }, T0);
    tl.to(cartW, { x: 40, duration: 1.8, ease: K.stepEase(1.8, "power1.inOut", tCart - 0.2) }, tCart - 0.2);
    cart.wheels && tl.to(cart.wheels, { rotation: 360, svgOrigin: O, duration: 1.8, ease: "none" }, tCart - 0.2);
    const tTurn2 = cue("s08a", "@turned", 2);
    block(tTurn2 - 0.1, 1.0);
    tl.to(cartW, { x: -20, duration: 0.2, ease: "power2.out" }, tTurn2 + 0.15); tl.to(cartW, { x: 40, duration: 0.3, ease: "power2.inOut" }, tTurn2 + 0.4);
    // a ₹1,000 coin (depreciation) pops off its side and gets a ticket
    const tDep = cue("s08a", "@depreciation");
    const coin2 = L.node(svg, 880, GY - 190); L.hide(coin2); K.coin(coin2, 0, 0, 28); K.label(coin2, 20, -66, "₹1,000", { size: 44, bg: C.cream, weight: 800 });
    tl.set(coin2, { opacity: 1 }, tDep - 0.6); tl.fromTo(coin2, { y: 0 }, { y: -110, duration: 0.3, ease: "power2.out", immediateRender: false }, tDep - 0.6);
    khata.arm(tl, tDep - 0.1, "R", 60, 0.25); khata.arm(tl, tDep + 0.5, "R", 15, 0.3);
    tl.to(coin2, { x: 1550 - 880, duration: 0.9, ease: "none" }, tDep + 0.2); tl.to(coin2, { y: fy(6) - (GY - 190), duration: 0.9, ease: "power1.inOut" }, tDep + 0.2);
    tl.set(coin2, { opacity: 0 }, tDep + 1.1); lightFrame(6, tDep + 1.1);
    tl.to(cartW, { x: -1100, duration: 1.1, ease: "power2.in" }, cue("s08a", "@ticket") - 0.7);

    // s08b — Meera's ₹3,000 (blocked, shrug, home) · the advance envelope · Infotech's payment
    const tMe = cue("s08b", "@meera's");
    tl.set(mItems, { opacity: 1 }, tMe - 0.8); mm.expr(tl, tMe - 0.9, "happy");
    walk(mm, tMe - 0.8, 740, 1.5);
    const tT2 = cue("s08b", "@turned");
    block(tT2 - 0.15, 1.0); mm.expr(tl, tT2 + 0.3, "worried"); mm.shrug(tl, tT2 + 0.4, 0.9);
    walk(mm, tT2 + 1.6, -260, 1.4); tl.set(mItems, { opacity: 0 }, tT2 + 2.9);
    const tAdv = cue("s08b", "@advance");
    tl.set(env, { opacity: 1 }, tAdv - 1.8);
    tl.fromTo(env, { x: -1000, y: 0 }, { x: 0, duration: 1.4, ease: "power2.out", immediateRender: false }, tAdv - 1.8);
    const tYet = cue("s08b", "@yet");
    block(tYet - 0.3, 1.0);
    tl.to(env._chip, { scale: 1.12, svgOrigin: O, duration: 0.15 }, tYet + 0.2); tl.to(env._chip, { scale: 1, svgOrigin: O, duration: 0.25 }, tYet + 0.35);
    tl.to(env, { x: -1100, duration: 1.0, ease: "power2.in" }, tYet + 0.8);
    const tPay = cue("s08b", "@payment");
    tl.fromTo(phone.g, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out", immediateRender: false }, tPay - 0.3);
    phone.show(tl, tPay + 0.1, { type: "upi", kind: "RECEIVED", amount: "₹4,000", from: "Infotech" });
    const tAl = cue("s08b", "@already");
    khata.arm(tl, tAl - 0.1, "R", 100, 0.3);                                        // points through the door at the Sales frame
    const tBill = cue("s08b", "@billed");
    L.drop(tl, priyaTag, tBill - 0.3, { dur: 0.3 });
    K.pulseNode(tl, priyaTag, tBill + 0.1, 1.12); K.pulseNode(tl, film.fr[0].c, tBill + 0.1, 1.06);
    lightFrame(0, tBill + 0.1);
    L.drop(tl, tick, tBill + 0.5, { dur: 0.3 }); tmk.draw(tl, tBill + 0.75, 0.3);
    khata.arm(tl, tBill + 1.0, "R", 15, 0.3);
    tl.to(phone.g, { autoAlpha: 0, duration: 0.25 }, cue("s08b", "@earned", 2) - 1.2); L.lift(tl, tick, cue("s08b", "@earned", 2) - 1.2, { dur: 0.3 });
    // the closing signs
    L.drop(tl, signR, cue("s08b", "@earned", 2) - 0.1, { dur: 0.35 });
    L.drop(tl, signE, cue("s08b", "@used") - 0.1, { dur: 0.35 });
    khata.expr(tl, cue("s08b", "@used"), "happy");
    L.allow(svg);
  };
})();

// s04 — Rewind: the bank deposit (T8, warm-up). Apr 15. Meera carries ₹15,000 from the galla to the friendly Bank. "Two different accounts":
// a `Cash` jar (notes — the galla) and a `Bank` jar (coins) drop in; the ₹15,000 label lifts off Cash (51,000 → 36,000), flies across and
// lands in Bank (0 → 15,000) as the bundle goes through the door. The `Money` needle never moves (an `=` tag drops on each needle). Plant: her phone buzzes once.
// Out: the Bank's door swings shut; its panel flips over and IS Infotech's bill slip (₹6,000), which grows to fill the frame (cream) → s05.
(function () {
  window.OWN_SEAM_IN.s05 = true;                 // s05 opens on the cream the slip grew into
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start, GY = 1000;
    L5.stage(K, svg, C.sky, 880);
    [[560, 560, 150, 330], [760, 640, 120, 250], [1560, 470, 150, 410]].forEach(([x, y, w, h], i) => {
      K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i % 2 ? "#4390d4" : "#4a96d9");
      for (let r = 0; r < Math.floor(h / 110); r++) for (let c = 0; c < Math.floor(w / 62); c++)
        K.paper(svg, K.cutRect(x + 16 + c * 56, y + 26 + r * 92, 34, 52, 0.6, 14), "#6aaee6", { opacity: 0.7 });
    });
    const cal = L5.cal(K, svg, 15);
    // gauges as the top-left strip, at the readings s03 left them
    const { profit, cash, GS } = L5.strip(K, svg, { stage: 0 });

    const stall = K.stall(svg, 250, GY, 0.8, {});
    const bank = L5.bank(K, svg, 1270, GY, 0.9);
    const m = K.meera(svg, 520, GY, 0.9, { expr: "happy" });
    // the ₹15,000 bundle in her right hand (rides upright), the ₹15,000 label, and her phone (left hand)
    const bundleP = K.g(m.handAnchor("R"), {}); K.bundle(bundleP, 8, -8, 0.7, -8); K.holdProp(m, "R", bundleP, [12, 8]); L5.hide(bundleP);
    const amt = L5.hide(L5.node(K, svg, 640, 400)); K.label(amt, 0, 0, "₹15,000", { size: 58, bg: C.saffron, rot: -3, weight: 800 });
    const phoneP = K.g(m.handAnchor("L"), {}); L5.hide(phoneP);
    const phone = K.phone(phoneP, 0, -16, 0.2, { screen: "sms" }); K.holdProp(m, "L", phoneP, [12, 8]);
    // the two account jars (books): Cash = the notes in the galla · Bank = money the bank keeps for her
    const cashJar = K.jarRig(svg, 640, GY, 1.1, { label: "Cash", icon: "coins", contents: "notes", fill: 0.6, amount: 51000, edge: C.saffron, hidden: true });
    const bankJar = K.jarRig(svg, 1665, GY, 1.1, { label: "Bank", icon: "landmark", contents: "coins", fill: 0, amount: 0, edge: C.sky, hidden: true });
    const fly2 = L5.node(K, svg, 0, 0), amt2 = L5.hide(L5.node(K, fly2, 0, 0)); K.label(amt2, 0, 0, "₹15,000", { size: 58, bg: C.saffron, rot: -3, weight: 800 });
    const flyB = L5.hide(L5.node(K, svg, 0, 0)); K.bundle(flyB, 0, 0, 0.7, -8);   // the bundle that goes through the door
    // the bill slip that the Bank's door becomes (s05 opens on it)
    const doorXY = [1270, GY - 134 * 0.9];
    const slipPos = L5.node(K, svg, doorXY[0], doorXY[1]);
    const slip = K.g(slipPos, {});
    K.tex(K.shadow(slip, 2), K.cutRect(-150, -92, 300, 184, 2, 22), "pat-paper");
    K.paper(slip, K.cutRect(-142, -84, 284, 22, 1, 20), C.sky);
    K.icon(slip, "receipt", -124, -73, 30, C.white, 2.4);
    K.faceArt(slip, "infotech", 38).setAttribute("transform", "translate(-96 14)");
    K.text(slip, 40, 16, "₹6,000", { size: 58, weight: 800 });
    L5.hide(slipPos);
    gsap.set(slip, { scaleX: 0.012, scaleY: 0.3, svgOrigin: O });
    const cream = K.el("rect", { x: -40, y: -40, width: 2000, height: 1160, fill: C.cream, opacity: 0 }, svg);
    const H = L5.hud(K, svg, tl, { stage: 0 });

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end);
    // "First, rewind one day. April fifteenth." — the calendar number pulses
    cal.pulse(tl, cue("s04", "@fifteenth"));
    // "Meera carries fifteen thousand rupees from the galla to the bank."
    const tCar = cue("s04", "@carries"), tFif = cue("s04", "@fifteen"), tGal = cue("s04", "@galla"), tBank = cue("s04", "@bank");
    m.look(tl, cue("s04", "@meera"), -6, 0);
    m.arm(tl, tCar - 0.5, "L", 70, 24, 0.3);
    stall.galla.open(tl, tCar - 0.4, { notes: false });
    tl.set(bundleP, { opacity: 1 }, tCar + 0.05);
    m.arm(tl, tCar + 0.1, "R", 30, 70, 0.3);
    stall.galla.shut(tl, tCar + 0.45);
    m.arm(tl, tCar + 0.5, "L", 12, 8, 0.3);
    L5.drop(tl, K, amt, tFif - 0.1, { dur: 0.35 });
    tl.to(amt, { x: 480, duration: 2.0, ease: "power1.inOut" }, tCar + 0.55);          // the label rides along above her
    // she strolls to the bank (cheat walk), bundle held out
    m.walkTo(tl, tCar + 0.55, 1000, 2.0);
    m.look(tl, tCar + 0.6, 8, -1);
    // "Meera carries … to the bank." — she arrives holding the bundle; the carry label lifts off
    L5.lift(tl, K, amt, tBank + 0.3);
    // "But in the books, these are two different accounts." — a Cash jar and a Bank jar drop in; she looks at each
    const tAcc = cue("s04", "@accounts"), tNotes = cue("s04", "@notes"), tKeeps = cue("s04", "@keeps");
    cashJar.enter(tl, tAcc - 0.2); bankJar.enter(tl, tAcc + 0.15);
    m.look(tl, tAcc, -8, -3); m.expr(tl, tAcc, "thinking");
    // "Cash is the notes in the galla." — the galla pops open, the Cash jar lights
    stall.galla.open(tl, tNotes - 0.1, { notes: false });
    cashJar.light(tl, tNotes, { hold: 1.1 });
    stall.galla.shut(tl, cue("s04", "@galla", 2) + 0.7);
    // "Bank is money the bank keeps for her, and gives back whenever she asks." — the Bank jar lights, she looks right
    bankJar.light(tl, tKeeps, { hold: 1.4 });
    m.look(tl, tKeeps - 0.1, 8, -2); m.expr(tl, tKeeps, "happy");
    // "Cash went down fifteen thousand." — ₹15,000 lifts off the Cash jar (51,000 → 36,000), the galla chip ticks
    const tDown = cue("s04", "@down"), tUp = cue("s04", "@up"), tL = tUp - 0.1;
    L5.drop(tl, K, amt2, tDown - 0.05, { dur: 0.3 });
    tl.set(fly2, { x: 640, y: 690 }, 0);
    cashJar.tick(tl, tDown + 0.1, 51000, 36000, 0.7); cashJar.fill(tl, tDown + 0.1, 0.4);
    cash.sub(tl, tDown + 0.1, 0, 36000, 0.8);
    H.jars.cash.fill(tl, tDown + 0.2, 0.5);
    m.look(tl, tDown, -3, -4);
    // "Bank went up fifteen thousand." — the label flies across to the Bank jar as the bundle goes through the door
    L5.fly(tl, fly2, tL - 1.25, [640, 690], [1665, 690], 1.15, { lift: 260 });
    L5.lift(tl, K, amt2, tL - 0.12, { dur: 0.2 });
    const tHnd = tL - 0.6;
    m.arm(tl, tHnd - 0.45, "R", 72, 18, 0.35);
    bank.doorTo(tl, tHnd - 0.25, 0.2, 0.35);
    tl.set(bundleP, { opacity: 0 }, tHnd + 0.15);
    tl.set(flyB, { opacity: 1, x: 1130, y: 800 }, tHnd + 0.15);
    L5.fly(tl, flyB, tHnd + 0.15, [1130, 800], [1270, 880], 0.4, { lift: 20 });
    tl.set(flyB, { opacity: 0 }, tHnd + 0.58);
    bank.bow(tl, tHnd + 0.55);
    m.arm(tl, tHnd + 0.7, "R", 12, 8, 0.4);
    bank.doorTo(tl, tHnd + 1.1, 1, 0.4);
    bankJar.tick(tl, tL, 0, 15000, 0.7); bankJar.fill(tl, tL, 0.4);
    cash.sub(tl, tL, 1, 15000, 0.8);
    // HUD: a Bank jar appears beside the galla jar and coins hop across — a swap inside the left pan (no tilt)
    const fromP = H.jarPt("cash");
    H.add(tl, tL - 0.1, "bank");
    const toP = H.jarPt("bank");
    L5.coinHop(tl, K, svg, fromP, toP, tL + 0.05, { n: 3, dur: 0.6, r: 7, lift: 40 });
    m.expr(tl, tL + 0.2, "happy"); m.look(tl, tL + 0.2, -4, -4);
    // "Profit? No change." — the `=` tag drops on the Profit gauge; "Money? Also no change." — and on the Money gauge
    profit.eq(tl, cue("s04", "@change")); cash.eq(tl, cue("s04", "@change", 2));
    m.expr(tl, cue("s04", "@profit"), "thinking"); m.expr(tl, cue("s04", "@money"), "thinking");
    // "So the money needle doesn't move." — halo only; the needle stays dead still (the final ≥ 1.5 s of the scene)
    cash.flash(tl, cue("s04", "@needle"), 1.2);
    // PLANT (no VO): she checks her phone — one buzz — and smiles
    const tPh = tUp + 0.35;
    m.arm(tl, tPh - 0.3, "L", 40, 95, 0.3);
    tl.set(phoneP, { opacity: 1 }, tPh - 0.2);
    phone.wake(tl, tPh + 0.15); phone.buzz(tl, tPh + 0.2);
    m.look(tl, tPh + 0.2, 0, 9); m.expr(tl, tPh + 0.6, "grin");
    // exit: the Bank's door swings shut toward us → its panel flips over → Infotech's bill slip grows into the next scene's cream
    const tD = sc.end - 1.5;
    bank.doorTo(tl, tD, 0.04, 0.3);
    tl.set(slipPos, { autoAlpha: 1 }, tD + 0.3);
    tl.to(slip, { scaleX: 0.3, svgOrigin: O, duration: 0.25, ease: "power2.out" }, tD + 0.3);
    tl.to(slip, { scaleX: 3.6, scaleY: 3.6, svgOrigin: O, duration: 0.95, ease: "power3.in" }, tD + 0.55);
    tl.to(cream, { opacity: 1, duration: 0.3, ease: "power1.in" }, sc.end - 0.35);
    L5.allow(svg);
  };
})();

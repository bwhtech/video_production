// s05 — "The business is its own person" (business entity concept).
// Daylight split stage: Meera (left, her own purse) | dashed line | the stall with a face (right, its own galla).
(function () {
  const O = "0 0";

  SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C;
    const T0 = sc.start, T1 = sc.end + TL.overlap;
    // positioned wrapper + animatable inner group drawn around local (0,0)
    const pos = (parent, x, y) => K.g(K.g(parent, { transform: `translate(${x} ${y})` }), {});
    const hide = (el) => el.setAttribute("opacity", "0");
    const popIn = (el, t, from = 0.86, dur = 0.32) => {
      // drop-and-place: lifted → settles flat (smooth, no overshoot)
      tl.fromTo(el, { autoAlpha: 0, scale: 1.07, svgOrigin: O }, { autoAlpha: 1, scale: 1, svgOrigin: O, duration: Math.max(dur, 0.34), ease: "power2.out" }, t);
    };
    const popOut = (el, t, dur = 0.2) => tl.to(el, { autoAlpha: 0, scale: 1.05, svgOrigin: O, duration: dur, ease: "power2.in" }, t);

    // ---------- camera: one slow push across the scene (no shake — stamps land per bible §5.6) ----------
    const cam = K.g(svg, {});
    const shake = K.g(cam, {});                               // plain stage group (no shake is ever applied to it)
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 640" }, { scale: 1.045, svgOrigin: "960 640", duration: T1 - T0, ease: "none" }, T0);

    // ---------- set ----------
    K.wall(shake, C.sky);
    K.cloud(shake, 260, 150, 0.9); K.cloud(shake, 1180, 110, 0.75); K.cloud(shake, 1720, 175, 0.85);
    K.table(shake, 860);

    // the dividing line on the ground — dashed, turns solid on "business entity"
    const LX = 930;
    const dashes = K.g(shake, {}), solid = K.g(shake, {});
    for (let y = 870; y < 1080; y += 56) K.paper(dashes, K.cutRect(LX - 6, y, 12, 34, 0.8, 10), C.ink, { opacity: 0.85 });
    K.paper(solid, K.cutRect(LX - 7, 862, 14, 220, 1, 20), C.ink);
    hide(solid);

    // ---------- the stall (a person in its own right) ----------
    const SX = 1390, GY = 985, SS = 0.95;
    const stall = K.stall(shake, SX, GY, SS, { face: true, faceExpr: "happy", noProps: true });
    const COUNTER = GY - 300 * SS; // counter top
    const kettle = K.kettle(shake, SX + 120, COUNTER, 0.95);
    kettle.steamLoop(tl, T0, T1);
    const GX = 1340;
    const galla = K.galla(shake, GX, COUNTER, 0.85, { open: false, overflow: true });
    const GALLA_IN = [GX, COUNTER - 92];

    // ---------- Meera (holds her own purse) ----------
    const MX = 470;
    const m = K.meera(shake, MX, GY, 0.95, { expr: "happy", aR: [20, 70], aL: [12, 8] });
    const purse = K.g(m.handAnchor("R"), {});
    K.paper(K.shadow(purse, 1), K.cutPoly([[-34, -6], [34, -6], [40, 40], [-40, 40]], 1.4, 12), C.coral);
    K.ink(purse, K.arc(0, -6, 20, Math.PI, Math.PI * 2, 8), 5, C.goldDark);
    K.paper(purse, K.cutEll(0, 2, 7, 7, 0.6), C.gold);
    const phone = K.g(m.handAnchor("L"), {});
    K.paper(K.shadow(phone, 1), K.cutRect(-20, -38, 40, 70, 1, 10), C.ink);
    K.paper(phone, K.cutRect(-14, -30, 28, 50, 0.8, 10), C.sky);
    hide(phone);
    const PURSE_W = m.handR; // world position of the purse at the build pose

    // the awning is the stall's "eyebrows" — a quick bob reads as a nod / a laugh
    const awningBob = (t, deg) => {
      tl.to(stall.awning, { rotation: deg, svgOrigin: O, duration: 0.17, ease: K.stepEase(0.17, "sine.inOut", t) }, t);
      tl.to(stall.awning, { rotation: -deg * 0.6, svgOrigin: O, duration: 0.17, ease: K.stepEase(0.17, "sine.inOut", t + 0.17) }, t + 0.17);
      tl.to(stall.awning, { rotation: 0, svgOrigin: O, duration: 0.25, ease: K.stepEase(0.25, "power2.out", t + 0.34) }, t + 0.34);
    };

    // ---------- intro: two characters say hello ----------
    m.blinks(tl, T0, T1, 3.3, 5);
    m.wave(tl, T0 + 0.5, "L", 2);
    stall.face.expr(tl, T0 + 0.7, "wow").expr(tl, T0 + 1.2, "happy");
    tl.to(stall.awning, { rotation: -4, svgOrigin: O, duration: 0.17, ease: K.stepEase(0.17, "sine.inOut", T0 + 0.9) }, T0 + 0.9);
    tl.to(stall.awning, { rotation: 3, svgOrigin: O, duration: 0.17, ease: K.stepEase(0.17, "sine.inOut", T0 + 1.07) }, T0 + 1.07);
    tl.to(stall.awning, { rotation: 0, svgOrigin: O, duration: 0.25, ease: K.stepEase(0.25, "power2.out", T0 + 1.24) }, T0 + 1.24);

    // ---------- s05a: "Meera … and Meera's Chai … are not the same." ----------
    const chipM = pos(shake, MX, 300); K.label(chipM, 0, 0, "Meera", { size: 46, bg: C.mustard });
    const chipS = pos(shake, SX, 290); K.label(chipS, 0, 0, "Meera's Chai", { size: 46, bg: C.saffron });
    hide(chipM); hide(chipS);
    popIn(chipM, cue("s05a", "@meera"));
    m.look(tl, cue("s05a", "@meera"), 0, -4);
    popIn(chipS, cue("s05a", "@meera's"));
    stall.face.look(tl, cue("s05a", "@meera's"), -8, 0);
    // "not the same" — the line draws itself, dash by dash; both glance across it
    const dashEls = Array.from(dashes.children);
    dashEls.forEach((d, i) => tl.fromTo(d, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, cue("s05a", "@not") + i * (2 / 15)));
    m.look(tl, cue("s05a", "@same") - 0.1, 8, 0);
    m.expr(tl, cue("s05a", "@same"), "thinking");
    popOut(chipM, segEnd("s05a") + 0.7); popOut(chipS, segEnd("s05a") + 0.75);

    // ---------- s05b: the stall is its own little person ----------
    stall.face.expr(tl, cue("s05b", "@stall"), "wow");
    awningBob(cue("s05b", "@person"), -5);
    stall.face.expr(tl, cue("s05b", "@person") + 0.5, "happy");
    m.expr(tl, cue("s05b", "@person"), "happy");
    // its own money · things · debts
    const own = [["money", "coins"], ["things", "package"], ["debts", "handshake"]].map(([w, ic], i) => {
      const p = pos(shake, 1790, 420 + i * 150);
      K.medallion(p, 0, 0, 58, ic);
      hide(p); popIn(p, cue("s05b", "@" + w));
      return p;
    });
    stall.face.look(tl, cue("s05b", "@money"), 9, -3);

    // ₹50,000 out of Meera's savings → into the galla. HYPOTHETICAL here (the real drop is L2 s01, Apr 1 dawn), so it plays
    // inside the dashed IMAGINE card (bible §5.5): purse → across the line → galla, claim tag (face + ₹50,000) on the galla.
    const tFifty = cue("s05b", "@fifty"), tGalla = cue("s05b", "@galla"), tRem = cue("s05b", "@remembers");
    const imagine = K.imagineCard(shake, 860, 250, 700, 370, { hidden: true });
    const ia = imagine.area.g;                                  // origin = card centre
    imagine.enter(tl, tFifty - 0.4);
    for (let y = -50; y < 150; y += 44) K.paper(ia, K.cutRect(-26, y, 9, 26, 0.6, 8), C.ink, { opacity: 0.8 });   // the line, in miniature
    const iPurse = pos(ia, -220, 105);
    K.paper(K.shadow(iPurse, 1), K.cutPoly([[-52, -8], [52, -8], [60, 56], [-60, 56]], 1.4, 12), C.coral);
    K.ink(iPurse, K.arc(0, -8, 30, Math.PI, Math.PI * 2, 8), 6, C.goldDark);
    K.paper(iPurse, K.cutEll(0, 4, 10, 10, 0.6), C.gold);
    const iGalla = K.galla(ia, 120, 150, 0.8, { open: false });
    m.expr(tl, tFifty - 0.2, "proud");
    m.arm(tl, tFifty - 0.1, "R", 40, 58, 0.3);
    const flyer = pos(ia, -220, 40);
    K.bundle(flyer, 0, 0, 0.8, -8);
    K.label(flyer, 0, -78, "₹50,000", { size: 36, bg: "paper" });
    hide(flyer);
    popIn(flyer, tFifty + 0.05, 0.5);
    const fx = 120 - -220, fy = 55 - 40;
    const tLaunch = tGalla - 0.95;
    tl.to(flyer, { x: fx, duration: 1.0, ease: "power1.inOut" }, tLaunch);
    tl.to(flyer, { y: -120, duration: 0.5, ease: "power2.out" }, tLaunch);
    tl.to(flyer, { y: fy, duration: 0.5, ease: "power2.in" }, tLaunch + 0.5);
    tl.to(flyer, { rotation: 14, svgOrigin: O, duration: 1.0, ease: "power1.inOut" }, tLaunch);
    iGalla.open(tl, tGalla - 0.45);
    tl.to(flyer, { autoAlpha: 0, scale: 0.6, svgOrigin: O, duration: 0.1 }, tGalla + 0.05);
    iGalla.shut(tl, tGalla + 0.3);
    m.arm(tl, tGalla - 0.2, "R", 20, 70, 0.35);
    m.look(tl, tLaunch, 8, -4).look(tl, tGalla, 9, 0);
    stall.face.expr(tl, tGalla + 0.4, "wow").expr(tl, cue("s05b", "@belongs"), "happy");

    // the stall remembers it came from Meera — a claim tag (Meera's face + ₹50,000, no words) hangs off the galla and turns once to camera
    const iTag = K.claimTag(ia, 262, 160, 0.6, { face: "meera", amount: 50000, hidden: true });
    iTag.stringTo(tl, tRem, 198, 105, { dur: 0.35 });
    tl.set(iTag.art.g, { scaleX: 0.12, svgOrigin: "0 -88" }, T0);
    iTag.enter(tl, tRem - 0.05);
    tl.to(iTag.art.g, { scaleX: 1, svgOrigin: "0 -88", duration: 0.5, ease: "power2.out" }, tRem - 0.05);
    m.expr(tl, cue("s05b", "@meera", 2), "joy");
    // before the misconception beat the card lifts off; the tag stays on the REAL galla (hangs off its front-left corner)
    const tCardOut = Math.min(cue("s05b", "@here's") - 0.5, tRem + 2.4);
    imagine.exit(tl, tCardOut, { dur: 0.25 });
    const gTag = K.claimTag(shake, GX - 168, COUNTER + 190, 0.56, { face: "meera", amount: 50000, hidden: true });
    gTag.stringTo(tl, tCardOut + 0.2, GX - 78, COUNTER - 6, { dur: 0.35 }).enter(tl, tCardOut + 0.2);

    // "Here's where most new founders slip" — the wrong thought
    const tSlip = cue("s05b", "@founders");
    own.forEach((p, i) => popOut(p, cue("s05b", "@here's") + i * 0.08));
    m.expr(tl, tSlip, "thinking").look(tl, tSlip, -4, -9);
    m.headTilt(tl, tSlip, 6);
    const bub = pos(shake, 600, 225);
    const bubble = K.g(bub, {});
    [[-118, 196, 14], [-92, 160, 20], [-60, 120, 26]].forEach(([dx, dy, r]) => K.tex(K.shadow(bubble, 1), K.cutEll(dx, dy, r, r * 0.9, 1), "pat-paper"));
    K.tex(K.shadow(bubble, 2), K.cutEll(0, 0, 210, 118, 3), "pat-paper");
    // purse + galla, side by side … then merged into one blob
    const bPurse = pos(bubble, -78, 6);
    K.paper(K.shadow(bPurse, 1), K.cutPoly([[-38, -8], [38, -8], [44, 44], [-44, 44]], 1.4, 12), C.coral);
    K.ink(bPurse, K.arc(0, -8, 22, Math.PI, Math.PI * 2, 8), 5, C.goldDark);
    const bGalla = pos(bubble, 82, 40);
    K.galla(bGalla, 0, 0, 0.5, { open: true, overflow: true });
    const bEq = pos(bubble, 0, 6);
    K.text(bEq, 0, 0, "=", { size: 80, color: C.ink, weight: 800 });
    hide(bub); hide(bEq);
    tl.fromTo(bub, { autoAlpha: 0, scale: 1.07, svgOrigin: "-118 196" }, { autoAlpha: 1, scale: 1, svgOrigin: "-118 196", duration: 0.4, ease: K.stepEase(0.4, "power2.out", tSlip + 0.3) }, tSlip + 0.3);
    const tMine = cue("s05b", "@money", 3);
    popIn(bEq, cue("s05b", "@stall", 4));
    tl.to(bPurse, { x: 40, duration: 0.4, ease: K.stepEase(0.4, "power2.inOut", tMine) }, tMine);
    tl.to(bGalla, { x: -44, duration: 0.4, ease: K.stepEase(0.4, "power2.inOut", tMine) }, tMine);
    tl.to(bEq, { autoAlpha: 0, duration: 0.1 }, tMine);
    m.expr(tl, cue("s05b", "@my", 2), "grin");

    // ---------- s05c: NOPE ----------
    const tNope = cue("s05c", "@nope");
    // Khata (small, stage-left corner) is the stamper: rises, raises a page-corner, the ✗ lands 1.25 → 1.0 power3.out (no shake, no wobble)
    const kh = K.khataRig(shake, 150, 1040, 0.42, { expr: "awake" });
    tl.set(kh.mover, { y: 820 }, T0);                         // local units → fully below frame
    tl.to(kh.mover, { y: 0, duration: 0.45, ease: "power2.out" }, tNope - 0.85);
    kh.arm(tl, tNope - 0.3, "R", 100).arm(tl, tNope + 0.25, "R", 15);
    const st = K.stamp(tl, shake, 600, 225, tNope - 0.18, 1.7, { rot: -12 });
    m.expr(tl, tNope, "worried").headTilt(tl, tNope, 0).look(tl, tNope, 0, 0);
    st.lift(tl, tNope + 1.0, { dur: 0.25 });
    tl.to(bub, { autoAlpha: 0, scale: 0.5, svgOrigin: "-118 196", duration: 0.25, ease: K.stepEase(0.25, "power2.in", tNope + 1.0) }, tNope + 1.0);

    // (a) home electricity bill paid from the galla → not a stall expense
    const tHome = cue("s05c", "@home");
    const house = pos(shake, 180, 430);
    K.medallion(house, 0, 0, 62, "zap");                          // electricity …
    K.medallion(house, 50, 46, 26, "map-pin", C.coral, C.ink);   // … home side (icon registry §5.12; `house` is retired)
    hide(house); popIn(house, tHome);
    m.look(tl, tHome, -9, -2);
    const note = pos(shake, GALLA_IN[0], GALLA_IN[1]);
    K.note(note, 0, 0, 120, 60, -6);
    hide(note);
    const tFrom = cue("s05c", "@galla");
    galla.open(tl, tFrom - 0.3, { notes: false });
    tl.fromTo(note, { autoAlpha: 0, x: 0, y: 0 }, { autoAlpha: 1, duration: 0.05 }, tFrom - 0.15);
    tl.to(note, { x: LX + 40 - GALLA_IN[0], duration: 0.55, ease: "power2.out" }, tFrom);
    tl.to(note, { y: -110, duration: 0.3, ease: "power2.out" }, tFrom);
    tl.to(note, { y: -60, duration: 0.25, ease: "power2.in" }, tFrom + 0.3);
    // bonk on the line → it can't cross
    const tNot = cue("s05c", "@not");
    kh.arm(tl, tNot - 0.3, "R", 100).arm(tl, tNot + 0.25, "R", 15);
    const st2 = K.stamp(tl, shake, LX, 560, tNot - 0.18, 0.9, { rot: 10 });
    stall.face.expr(tl, tNot - 0.3, "frown");
    tl.to(note, { x: 0, y: 0, rotation: 18, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, tNot + 0.15);
    tl.to(note, { autoAlpha: 0, duration: 0.08 }, tNot + 0.62);
    galla.shut(tl, tNot + 0.6);
    st2.lift(tl, tNot + 1.0);
    tl.to(kh.mover, { y: 820, duration: 0.4, ease: "power2.in" }, tNot + 1.1);
    popOut(house, cue("s05c", "@and") - 0.15);
    stall.face.expr(tl, cue("s05c", "@and"), "happy");

    // (b) sugar for the stall, paid with her own phone → the stall still records it
    const tBuys = cue("s05c", "@buys");
    tl.set(phone, { opacity: 1 }, tBuys - 0.15);
    m.arm(tl, tBuys - 0.2, "L", 46, 92, 0.3);
    m.expr(tl, tBuys, "happy").look(tl, tBuys, -6, -6);
    const SUGAR_X = 1218, SUGAR_Y = COUNTER - 4;
    const sack = pos(shake, 740, 960);
    const sk = K.g(sack, {});
    K.paper(K.shadow(sk, 2), K.cutPoly([[-46, 0], [46, 0], [40, -86], [26, -104], [-26, -104], [-40, -86]], 1.8, 14), C.white);
    K.ink(sk, [[-30, -88], [30, -88]], 4, C.goldDark);
    K.text(sk, 0, -46, "Sugar", { size: 24, font: "kalam", color: C.ink });
    hide(sack);
    const tSugar = cue("s05c", "@sugar");
    tl.fromTo(sack, { autoAlpha: 0, y: -260 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: K.stepEase(0.35, "power2.in", tSugar - 0.2) }, tSugar - 0.2);
    // slides across the line into the business (allowed: things CAN go into the stall)
    const tGo = cue("s05c", "@stall", 2);
    tl.to(sack, { x: SUGAR_X - 740, duration: 0.9, ease: "power2.inOut" }, tGo);
    tl.to(sack, { y: -170, duration: 0.45, ease: "power2.out" }, tGo);
    tl.to(sack, { y: SUGAR_Y - 960, duration: 0.45, ease: "power2.in" }, tGo + 0.45);
    stall.face.look(tl, tGo, -9, 4);
    stall.face.expr(tl, cue("s05c", "@phone"), "wow").expr(tl, cue("s05c", "@needs"), "happy");
    // the stall still records it: a second small claim tag hangs off the sugar — Meera's face + a ₹ glyph (no amount, no words)
    const sTag = K.claimTag(shake, SUGAR_X - 110, SUGAR_Y + 4, 0.42, { face: "meera", hidden: true });
    K.text(sTag.art.g, 0, -22, "₹", { size: 44, weight: 800, color: C.ink });
    sTag.stringTo(tl, cue("s05c", "@know"), SUGAR_X - 38, SUGAR_Y - 88, { dur: 0.3 }).enter(tl, cue("s05c", "@know"));
    tl.set(phone, { opacity: 0 }, cue("s05c", "@two") - 0.3);
    m.arm(tl, cue("s05c", "@two") - 0.4, "L", 12, 8, 0.3);

    // "Two people. Two sets of money."
    m.hop(tl, cue("s05c", "@people"), { height: 40 });
    awningBob(cue("s05c", "@people") + 0.1, 5);
    stall.face.expr(tl, cue("s05c", "@people") + 0.1, "wow").expr(tl, cue("s05c", "@people") + 0.6, "happy");
    const sp1 = pos(shake, PURSE_W[0] + 70, PURSE_W[1] - 60), sp2 = pos(shake, GX + 105, COUNTER - 60);
    K.sparkle(sp1, 0, 0, 30); K.sparkle(sp2, 0, 0, 30);
    hide(sp1); hide(sp2);
    popIn(sp1, cue("s05c", "@sets")); popIn(sp2, cue("s05c", "@sets") + 0.12);
    popOut(sp1, cue("s05c", "@sets") + 1.0); popOut(sp2, cue("s05c", "@sets") + 1.1);
    sTag.exit(tl, cue("s05c", "@this") - 0.2);

    // "business entity" — the chip lands on the line, and the line goes solid
    const tBiz = cue("s05c", "@business");
    const chip = pos(shake, LX, 790);
    K.label(chip, 0, 0, "Business entity", { size: 58, bg: C.violet, shadow: 2 });
    hide(chip);
    tl.fromTo(chip, { autoAlpha: 0, y: -380, rotation: -2, svgOrigin: O }, { autoAlpha: 1, y: 0, rotation: 0, svgOrigin: O, duration: 0.45, ease: K.stepEase(0.45, "power3.in", tBiz - 0.1) }, tBiz - 0.1);
    const tEnt = cue("s05c", "@entity") + 0.25;
    tl.set(solid, { opacity: 1 }, tEnt);
    tl.set(dashes, { opacity: 0 }, tEnt + 1 / 15);
    m.expr(tl, cue("s05c", "@idea"), "proud").look(tl, cue("s05c", "@idea"), 0, 0);
    stall.face.look(tl, cue("s05c", "@idea"), 0, 0);

    // paper wobble on the characters for the whole scene
    m.jitter(tl, T0, T1, { seed: 51 });
    stall.jitter(tl, T0, T1);
  };
})();

// s01 — Cold open: Meera's CA friend stops by for chai, spots Khata and fires six gold rule cards; Meera's eyes spiral;
// Khata hops up, scoops the pile and holds one gold rule card = one scale card. Exit: the camera rushes into the gold card's edge → s01t.
(function () {
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start, GROUND = 1000;
    const cam = K.g(svg, { id: "s01-cam" });
    L7.stage(cam, C.saffron, 880);

    // ---- set: the stall (no face, no galla) far right, a crate with Khata between the two women
    const stall = K.stall(cam, 1680, GROUND, 0.92, { galla: false });
    const crate = K.crate(cam, 1010, GROUND, 230, 150);
    const khata = K.khataRig(cam, 1010, GROUND - 150, 0.5, { expr: "awake" });

    // ---- cast
    const m = K.meera(cam, 470, GROUND, 1.0, { expr: "neutral" });
    const ca = K.caFriend(cam, 2250, GROUND, 1.0, { expr: "happy", flip: true });
    // chai glass in her hand (right local arm → viewer-left)
    const glassP = K.g(ca.handAnchor("R"), {}); K.tumbler(glassP, 0, 8, 1.15); K.holdProp(ca, "R", glassP, [12, 8]); L7.hide(glassP);

    // ---- dizzy spirals on Meera's eyes (head-local ±21, −54) — two stepped quarter-turns, then hold
    const spirals = [-1, 1].map((sd) => {
      const pos = L7.node(m.head, sd * 21, -54); L7.hide(pos);
      K.paper(pos, K.cutEll(0, 0, 14, 15, 0.6), C.white);
      const sp = K.g(pos, {});
      const pts = []; for (let i = 0; i <= 26; i++) { const a = i * 0.46, r = 1.5 + i * 0.4; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
      K.ink(sp, pts, 2.6, C.ink);
      return { pos, sp };
    });

    // ---- the six gold rule cards (icon + Dr/Cr chip) + the pile target
    const PILE = [690, 905];
    const kinds = [["palm", "L"], ["giving", "R"], ["into", "L"], ["outof", "R"], ["coinsout", "L"], ["coinsin", "R"]];
    const cards = kinds.map(([k, side], i) => {
      const rc = L7.ruleCard(cam, 1130, 560, k, side); L7.hide(rc.n); return rc;
    });
    // ---- the two held cards at the end (gold rule card = scale card)
    const heldR = L7.ruleCard(cam, 840, 252, "into", "L"); L7.hide(heldR.n);
    const heldS = L7.node(cam, 1160, 252); L7.hide(heldS);
    {
      K.tex(K.shadow(heldS, 2), K.cutRect(-100, -110, 200, 220, 2, 22), "pat-paper");
      K.paper(heldS, K.cutRect(-86, -96, 86, 192, 1.2, 16), C.dr, { opacity: 0.95 });
      K.paper(heldS, K.cutRect(0, -96, 86, 192, 1.2, 16), C.cr, { opacity: 0.95 });
      K.ink(heldS, [[-70, -20], [70, -20]], 8, C.cream); K.ink(heldS, [[0, -20], [0, 60]], 8, C.cream);
      K.paper(heldS, K.cutPoly([[-50, 62], [-18, 62], [-34, 30]], 0.6, 8), C.cream); K.paper(heldS, K.cutPoly([[18, 62], [50, 62], [34, 30]], 0.6, 8), C.cream);
    }
    const eq = L7.node(cam, 1000, 252); L7.hide(eq);
    K.paper(K.shadow(eq, 1), K.cutRect(-34, -30, 68, 14, 0.5, 8), C.cream); K.paper(K.shadow(eq, 1), K.cutRect(-34, 12, 68, 14, 0.5, 8), C.cream);

    // ---- fade from black + the brass plate for the rush
    const cal = L7.cal(svg, 25);
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const brass = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.brass, opacity: 0 }, svg);

    // ======================================================================================= timeline
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.0, ease: "power1.out" }, T0);
    const tRush = segEnd("s01c") - 0.35;
    tl.fromTo(cam, { scale: 1, x: 0, y: 0, svgOrigin: "960 560" }, { scale: 1.06, x: 0, y: 0, svgOrigin: "960 560", duration: tRush - T0, ease: "none" }, T0);

    m.expr(tl, cue("s01a", "@meera's") - 0.1, "happy").look(tl, cue("s01a", "@friend"), 8, -2);
    // "Meera's friend is a chartered accountant." — she walks in from the right
    ca.walkTo(tl, cue("s01a", "@friend") - 0.2, 1290, 1.9);
    m.arm(tl, cue("s01a", "@friend"), "R", 150, -20, 0.25);                    // waves hello
    m.arm(tl, cue("s01a", "@friend") + 0.5, "R", 120, -10, 0.2); m.arm(tl, cue("s01a", "@friend") + 0.8, "R", 12, 8, 0.3);
    // "stops by for chai" — a glass of chai appears in her hand, a sip
    const tChai = cue("s01a", "@chai");
    tl.set(glassP, { opacity: 1 }, tChai - 0.2);
    ca.arm(tl, tChai - 0.2, "R", 70, 90, 0.3).headTilt(tl, tChai + 0.3, -6);
    ca.arm(tl, tChai + 0.9, "R", 12, 8, 0.3).headTilt(tl, tChai + 0.9, 0);
    // "spots Meera's khata" — she turns to look, points; Khata (awake) blinks
    const tSpot = cue("s01a", "@spots");
    ca.look(tl, tSpot, -9, 2).expr(tl, tSpot, "amazed");
    ca.arm(tl, tSpot + 0.05, "R", 85, 14, 0.3);
    tl.set(glassP, { opacity: 0 }, tSpot + 0.05);
    khata.blink(tl, tSpot + 0.4);
    ca.arm(tl, cue("s01a", "@starts") - 0.2, "R", 14, 8, 0.25);
    // "starts firing rules" — folder open, grin, arm cocked
    ca.expr(tl, cue("s01a", "@starts"), "grin");
    // six flicks: Debit/Credit × 3 — each flick throws a gold rule card onto the pile in front of Meera
    const times = [cue("s01a", "@debit", 1), cue("s01a", "@credit", 1), cue("s01a", "@debit", 2), cue("s01a", "@credit", 2), cue("s01a", "@debit", 3), cue("s01a", "@credit", 3)];
    const HAND = [1130, 520];
    times.forEach((t, i) => {
      const rc = cards[i], tt = t - 0.1, tx = PILE[0] + (i % 2 ? 22 : -14), ty = PILE[1] - 30 - i * 24, rot = [-9, 7, -5, 10, -8, 4][i];
      ca.arm(tl, tt - 0.12, "R", 130, -30, 0.12);
      ca.arm(tl, tt + 0.08, "R", 70, 30, 0.14);
      ca.arm(tl, tt + 0.5, "R", 14, 8, 0.25);
      rc.n.setAttribute("opacity", "0");
      const ease = "power1.inOut";
      tl.set(rc.n, { opacity: 1 }, tt);
      tl.fromTo(rc.inner, { x: 0, y: 0, scale: 0.7, rotation: 0, svgOrigin: O }, { x: tx - 1130, scale: 0.8, rotation: rot, svgOrigin: O, duration: 0.5, ease, immediateRender: false }, tt);
      tl.fromTo(rc.inner, { y: 0 }, { y: -140, duration: 0.22, ease: "power2.out", immediateRender: false }, tt);
      tl.to(rc.inner, { y: ty - 560, duration: 0.28, ease: "power2.in" }, tt + 0.22);
      // Meera leans back a step per card (small)
      m.lean(tl, tt + 0.3, -1.2 * (i + 1));
    });
    m.expr(tl, cue("s01a", "@receiver") + 0.3, "worried");
    m.look(tl, cue("s01a", "@giver"), 6, 4);
    m.expr(tl, cue("s01a", "@expenses") + 0.2, "amazed");

    // s01b — "head is spinning": spirals on the eyes, two stepped quarter-turns, then hold; "Is this a whole new system?"
    const tSpin = cue("s01b", "@spinning");
    m.expr(tl, tSpin - 0.1, "puzzled").headTilt(tl, tSpin, 6);
    spirals.forEach(({ pos, sp }) => {
      tl.set(pos, { opacity: 1 }, tSpin);
      tl.set(sp, { rotation: 0, svgOrigin: O }, tSpin);
      tl.set(sp, { rotation: 90, svgOrigin: O }, tSpin + 0.34);
      tl.set(sp, { rotation: 180, svgOrigin: O }, tSpin + 0.68);
    });
    const q = L7.qmark(cam, 560, 330, 1.7);
    L7.drop(tl, q, cue("s01b", "@system") - 0.3);
    m.arm(tl, cue("s01b", "@whole"), "R", 150, 40, 0.3);                     // hand to head

    // s01c — "It isn't." Khata hops, opens, scoops the pile and closes; holds the two cards with "=" between
    const tIsnt = cue("s01c", "@isn't");
    m.arm(tl, tIsnt, "R", 12, 8, 0.3).headTilt(tl, tIsnt, 0).expr(tl, tIsnt, "happy");
    spirals.forEach(({ pos }) => tl.set(pos, { opacity: 0 }, tIsnt + 0.05));
    tl.to(q, { autoAlpha: 0, scale: 1.05, svgOrigin: O, duration: 0.2, ease: "power2.in" }, tIsnt);
    m.lean(tl, tIsnt, 0);
    khata.hop(tl, tIsnt, { height: 70 }).expr(tl, tIsnt, "happy");
    const tSame = cue("s01c", "@same");
    khata.open(tl, tSame - 0.45, 0.4);
    // the pile flies into Khata's pages (staggered), Khata closes
    cards.forEach((rc, i) => tl.to(rc.inner, { x: 1010 - 1130, y: GROUND - 300 - 560, scale: 0.25, autoAlpha: 0, rotation: 0, svgOrigin: O, duration: 0.4, ease: "power2.in" }, tSame - 0.2 + i * 0.07));
    khata.close(tl, tSame + 0.5, 0.35);
    const tLang = cue("s01c", "@language");
    ca.expr(tl, tIsnt, "happy").look(tl, tIsnt, -6, 0);
    // "in another dialect" — the two cards come up over Khata with "=" between
    const tDia = cue("s01c", "@another");
    L7.drop(tl, heldR.n, tDia - 0.1); L7.drop(tl, heldS, tDia + 0.15); L7.drop(tl, eq, tDia + 0.4);
    khata.arm(tl, tDia - 0.1, "L", 95, 0.3); khata.arm(tl, tDia - 0.1, "R", 95, 0.3);
    // "translate it" — wink
    khata.expr(tl, cue("s01c", "@translate"), "wink");
    // exit: camera rushes into the gold rule card's edge; brass plate fills the frame
    tl.to(cam, { scale: 12, x: 960 - 840, y: 540 - 252, svgOrigin: "840 252", duration: sc.end - tRush, ease: "power3.in" }, tRush);
    tl.to(brass, { opacity: 1, duration: 0.16, ease: "none" }, sc.end - 0.16);
    tl.to(black, { opacity: 0, duration: 0.01 }, sc.end);

    L7.allow(cam);
    // acting texture
    m.blinks(tl, T0 + 1.6, tSpin, 3.4); ca.blinks(tl, T0 + 3.0, tIsnt, 3.6, 5); khata.blink(tl, T0 + 2.2); khata.blink(tl, T0 + 9.5);
    m.jitter(tl, T0, sc.end); ca.jitter(tl, T0, sc.end);
  };
})();

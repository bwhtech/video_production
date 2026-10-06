// s04 — Where did it come from? The ₹50,000 gets Meera's tag (equity); the tag unfolds into the Equity card with one pocket: Capital.
// In : s03's flipped note (blank tag on its back) fills the frame; here it shrinks back onto the bundle in the galla (match-cut).
// Out: an umbrella handle hooks the right edge and drags the frame — whip pan with blur (s05 settles from the right).
(function () {
  window.OWN_SEAM_IN.s05 = true;                 // this scene owns the whip pan into s05
  window.S_WHIP = { dx: 1100, blur: 26 };        // shared with s05's settle

  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, NT = window.S03_NOTE, O = "0 0", W = window.S_WHIP;
    const T0 = sc.start;
    const GX = 520, GY = 770, GS = 2.0;            // galla (assets side, left)
    const BX = GX, BY = 500;                       // the bundle on top of it
    const TX = 960, TY = 810, TS = 1.85;            // Meera's tag (bottom centre), hole ≈ (930, 595)
    const HAND = [1325, 622];                      // Meera's left hand when she holds the string (pose [52, 60], s = 1, x = 1560)

    const cam = K.g(svg, { id: "s04-cam" });
    K.wall(cam, C.saffron, 860);
    K.paper(cam, K.cutRect(1900, -40, 2400, 1000, 0, 80), C.saffron);        // saffron continues to the right for the whip pan
    window.skyline(cam, C.saffron, 860, 5, { x0: -20, x1: 2400, minH: 110, maxH: 150, dark: 0.1 });
    K.table(cam, 860);
    K.paper(cam, K.cutRect(1900, 856, 2400, 330, 0, 80), "#b7895a");
    K.crate(cam, GX, 960, 540, 190);
    const galla = K.galla(cam, GX, GY, GS, { open: true, overflow: true });
    K.bundle(cam, BX, BY + 6, 1.5, 0);

    // Meera enters stage-right (orange side) — she is now a claimant
    const m = K.meera(cam, 1560, 985, 1.0, { expr: "neutral", aL: [12, 8], aR: [12, 8] });
    gsap.set(m.mover, { x: 2250 - 1560 });
    const k = K.khataRig(cam, window.KH.x, window.KH.y, window.KH.s, { expr: "awake" });

    // the tag: blank first, then Meera's face tag (= the folded Equity card)
    const blank = DH.node(cam, BX, BY - 12); const blankArt = K.g(blank.inner, {}); DH.blankTag(K.g(blankArt, { transform: `scale(${TS})` }), 220, 176);
    DH.hide(blank.outer);
    const eq = K.equityCard(cam, TX, TY, TS, { pockets: 2, capital: 50000, hidden: true });
    eq.list.pop();                                                        // one pocket only (Capital) — Profit arrives in L4
    gsap.set(eq.pockets.Capital.inner, { x: 0 });
    gsap.set(eq.card.children[0], { scaleX: (210 + 48) / (2 * 210 + 16 + 48), svgOrigin: O });
    eq.g.setAttribute("data-layout-allow-overlap", "true"); eq.g.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
    const stub = K.g(cam, {});                                           // twine hanging free from the blank tag
    const equityChip = DH.node(cam, 1300, 575); K.label(equityChip.inner, 0, 0, "Equity", { size: 72, bg: C.cr, shadow: 2 });
    const ghostB = DH.node(cam, BX, BY); const gI = K.g(ghostB.inner, {}); K.bundle(gI, 0, 0, 1.5, 0); DH.hide(ghostB.outer);
    const cal = DH.calendar(cam, 1);

    // the match-cut plate (note back + tag) — full frame at t0, shrinks to rest on the bundle
    const plate = DH.node(svg, 960, 540);
    plate.outer.setAttribute("data-layout-allow-overlap", "true");
    plate.inner.setAttribute("transform", `scale(${NT.ZOOM})`);
    K.paper(K.shadow(plate.inner, 1), K.cutRect(-NT.w / 2, -NT.h / 2, NT.w, NT.h, 1.8, 16), NT.color);
    const pTag = K.g(plate.inner, { transform: "translate(0 -10) scale(0.3)" }); DH.blankTag(pTag, 150, 128);
    const SEND = (130 * 1.5) / NT.w;
    const zp = { p: 0 };
    tl.to(zp, { p: 1, duration: 1.15, ease: "power2.inOut", onUpdate: () => {
      gsap.set(plate.inner, { scale: Math.pow(NT.ZOOM, 1 - zp.p) * Math.pow(SEND, zp.p), svgOrigin: O });
      gsap.set(plate.outer, { x: 960 + (BX - 960) * zp.p, y: 540 + (BY - 540) * zp.p });
    } }, T0);

    // ======================================================================== timeline
    k.blink(tl, T0 + 2).blink(tl, T0 + 14).blink(tl, T0 + 26);
    // "Where did it come from?" — Khata asks; the blank tag lifts out of the plate and turns to camera
    const tWhere = cue("s04a", "@where");
    k.emote(tl, tWhere, "?", 1.8).look(tl, tWhere, 8, -4);
    tl.set(pTag, { opacity: 0 }, tWhere - 0.02);
    const dest = [TX, TY - 150 * TS];                                          // the tag hole
    tl.fromTo(blank.outer, { autoAlpha: 0, x: BX, y: BY - 12 }, { autoAlpha: 1, duration: 0.05, immediateRender: false }, tWhere - 0.02);
    tl.to(blank.outer, { x: dest[0], duration: 0.95, ease: "power1.inOut" }, tWhere);
    tl.to(blank.outer, { y: dest[1] - 90, duration: 0.45, ease: "power2.out" }, tWhere);
    tl.to(blank.outer, { y: dest[1], duration: 0.5, ease: "power2.in" }, tWhere + 0.45);
    tl.fromTo(blank.inner, { scale: 0.3, rotation: -14, svgOrigin: O }, { scale: 1, rotation: 0, svgOrigin: O, duration: 0.95, ease: "power2.out", immediateRender: false }, tWhere);
    // "Every asset has a source. So let's tag the money." — the string hangs free
    const tTag = cue("s04a", "@tag");
    const sp = DH.string(tl, stub, tTag, [dest[0], dest[1]], [dest[0] + 70, dest[1] - 170], 0.5, -10);

    // Meera walks in (stepped) and takes her place
    const tWalk = segEnd("s04a") + 0.05;
    m.walkTo(tl, tWalk, 1560, 1.6);
    m.expr(tl, tWalk, "happy").look(tl, tWalk, -6, 0);
    // "came from Meera" — her face is stamped onto the tag
    const tMeera = cue("s04b", "@meera");
    tl.to(blank.outer, { autoAlpha: 0, duration: 0.1 }, tMeera);
    tl.to(stub, { opacity: 0, duration: 0.1 }, tMeera);
    eq.enter(tl, tMeera);
    m.arm(tl, tMeera - 0.1, "L", 52, 60, 0.3);
    m.expr(tl, tMeera, "grin");
    // "The stall holds the money" — the galla gives a small lift
    tl.to(galla.body, { y: -10, duration: 0.2, ease: K.stepEase(0.2, "power2.out", cue("s04b", "@holds")) }, cue("s04b", "@holds"));
    tl.to(galla.body, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.inOut", cue("s04b", "@holds") + 0.2) }, cue("s04b", "@holds") + 0.2);
    // "but Meera has a claim on it" — the string runs in a smooth arc from the tag to her hand
    const tClaim = cue("s04b", "@claim");
    const claimStr = DH.string(tl, cam, tClaim - 0.35, [dest[0], dest[1]], HAND, 0.8, 34);
    m.expr(tl, tClaim, "proud");
    // "If the stall ever closed, this share would go back to her" — a ghost bundle slides along to her and fades
    const tClosed = cue("s04b", "@closed"), tGo = cue("s04b", "@go");
    tl.fromTo(ghostB.outer, { autoAlpha: 0, x: BX, y: BY }, { autoAlpha: 0.45, duration: 0.25, immediateRender: false }, tClosed);
    DH.fly(tl, ghostB.outer, cue("s04b", "@would"), [BX, BY], [HAND[0] - 20, HAND[1] - 10], 0.85, 130);
    tl.to(ghostB.outer, { autoAlpha: 0, duration: 0.3 }, cue("s04b", "@her") + 0.15);
    m.look(tl, tGo, -8, 2);
    // "called equity" — the orange chip drops on the string and holds alone (≥ 1.5 s)
    DH.pop(tl, equityChip.inner, cue("s04b", "@equity"), { from: 1.12 });
    eq.pulse(tl, cue("s04b", "@equity") + 0.1, 1.04);
    // "capital" — the tag unfolds once into the Equity card: one pocket, Capital
    const tCap = cue("s04b", "@capital");
    DH.out(tl, equityChip.inner, tCap - 0.3, 0.25);
    tl.to(claimStr, { opacity: 0, duration: 0.25 }, tCap - 0.1);
    m.arm(tl, tCap + 0.1, "L", 12, 8, 0.4);
    const capT = eq.pockets.Capital.ticker;
    capT.set(tl, tCap - 0.2, 0);
    eq.unfold(tl, tCap);
    capT.to(tl, cue("s04b", "@fifty", 2), 50000, 0.9);
    m.expr(tl, cue("s04b", "@meera's"), "proud");

    // ---- seam: an umbrella handle hooks the right edge and drags the frame left (whip pan, blur)
    const tHook = sc.end - 1.0;
    const handle = DH.node(svg, 2300, 470);
    handle.outer.setAttribute("data-layout-allow-overlap", "true");
    K.ink(handle.inner, [[0, 0], [420, 0]], 26, "#3b2a20");
    K.ink(handle.inner, K.arc(0, 56, 56, -Math.PI / 2, Math.PI * 0.9, 16), 26, "#3b2a20");
    tl.to(handle.outer, { x: 1820, duration: 0.3, ease: "power2.out" }, tHook);
    tl.to(handle.outer, { x: 1820 - W.dx, duration: 0.6, ease: "power3.in" }, sc.end - 0.6);
    tl.to(cam, { x: -W.dx, duration: 0.6, ease: "power3.in" }, sc.end - 0.6);
    tl.to(cam, { filter: `blur(${W.blur}px)`, duration: 0.5, ease: "power1.in" }, sc.end - 0.5);
    m.jitter(tl, T0, sc.end); k.jitter(tl, T0, sc.end);
  };
})();

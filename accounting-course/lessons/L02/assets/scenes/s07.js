// s07 — The claims picture: ₹80,000 of "has" (blue, left) = two claims stacked on the right (Ravi ₹30,000 + Meera ₹50,000). Level line, strings,
// the one-sentence rule, a ghost scale. (Bar order: Ravi bottom, Meera top = VO order and balance-sheet order; deviation from storyboard.)
// In : default torn-paper wipe.  Out: default torn-paper wipe.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", T0 = sc.start;
    const cam = K.g(svg, { id: "s07-cam" });
    K.wall(cam, C.sky, 860);
    K.table(cam, 860);
    const cal = DH.calendar(cam, 1);

    // ghost scale (behind everything), shown for ~1 s at the end
    const gs = K.g(cam, { opacity: 0 });
    K.scaleRig(gs, 900, 1000, 1.0, { totals: false });

    const BX = 900, BYY = 975, BS = 1.9;
    // Cash galla (left)
    const galla = K.galla(cam, 330, 900, 1.45, { open: true, overflow: true });
    const cashL = DH.node(cam, 330, 900 - 30 * 1.45); K.label(cashL.inner, 0, 0, "Cash", { size: 54, bg: "paper", shadow: 2 });
    const bars = K.barPair(cam, BX, BYY, BS, { max: 100000, refH: 380, faces: ["ravi", "meera"] });

    // people at the right edge, holding strings (strings first so they sit behind)
    const MX = 1700, RX = 1840, PS = 0.6;
    const hand = (x) => [x - PS * 235, 985 - PS * 365];
    const ravi = K.raviMama(cam, RX, 985, PS, { expr: "proud", aL: [52, 60], aR: [12, 8] });
    const meera = K.meera(cam, MX, 985, PS, { expr: "happy", aL: [52, 60], aR: [12, 8] });
    const ravi_mid = [BX + 130 * BS, BYY - 15000 * (380 / 100000) * BS], meera_mid = [BX + 130 * BS, BYY - 55000 * (380 / 100000) * BS];

    const eq = DH.node(cam, 960, 215); K.label(eq.inner, 0, 0, "₹80,000 = ₹30,000 + ₹50,000", { size: 56, bg: "paper", shadow: 2 }); DH.hide(eq.inner);
    const k = K.khataRig(cam, 120, 1050, 0.5, { expr: "awake" });

    // ======================================================================== timeline
    meera.blinks(tl, T0 + 1, sc.end, 3.3); ravi.blinks(tl, T0 + 2, sc.end, 3.7);
    k.blink(tl, T0 + 3).blink(tl, T0 + 14);
    cashL.inner.setAttribute("opacity", "1");
    // "The stall has eighty thousand rupees" — the blue bar grows
    const tEighty = cue("s07", "@eighty");
    bars.grow(tl, tEighty - 0.1, 80000, [], { dur: 0.9 });
    DH.pulse(tl, galla.body, tEighty, 1.04);
    // "Thirty thousand of it is claimed by Ravi Mama" / "Fifty thousand is claimed by Meera"
    const tThirty = cue("s07", "@thirty"), tFifty = cue("s07", "@fifty");
    bars.grow(tl, tThirty, undefined, [30000], { dur: 0.8 });
    ravi.look(tl, tThirty, -8, 0);
    bars.grow(tl, tFifty, undefined, [30000, 50000], { dur: 0.8 });
    meera.look(tl, tFifty, -8, 0);
    // level line across both tops
    const tLevel = cue("s07", "@meera.");
    bars.level(tl, tLevel + 0.75, { dur: 0.5, hold: 1.2 });
    // "Every rupee … belongs to someone" — a string from each block to each person, tightening in sequence
    const tEvery = cue("s07", "@every");
    const sR = DH.string(tl, cam, tEvery, ravi_mid, hand(RX), 0.6, 10);
    const sM = DH.string(tl, cam, tEvery + 0.4, meera_mid, hand(MX), 0.6, 10);
    cam.insertBefore(sR, ravi.g); cam.insertBefore(sM, ravi.g);
    meera.expr(tl, tEvery + 0.4, "proud");
    // "In one sentence:" — the equation chip; the sentence is spoken, the numbers carry it
    const tSent = cue("s07", "@sentence:");
    DH.pop(tl, eq.inner, tSent, { from: 1.1 });
    // "Next lesson, it gets a scale." — a 30 % ghost scale fades in behind the bars, holds ~1 s, fades out; Khata winks
    const tScale = cue("s07", "@scale");
    tl.to(gs, { opacity: 0.3, duration: 0.5, ease: "power1.out" }, tScale - 0.3);
    tl.to(gs, { opacity: 0, duration: 0.5, ease: "power1.in" }, tScale + 1.0);
    k.expr(tl, tScale, "wink").emote(tl, tScale + 0.05, "sparkle", 1.0);
    k.expr(tl, tScale + 1.6, "happy");
    meera.jitter(tl, T0, sc.end); ravi.jitter(tl, T0, sc.end);
  };
})();

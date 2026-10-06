// s13 — Next time (tease). Night at the stall: Meera's phone buzzes, "CREDITED ₹15,000" — she cheers; Khata (behind her) goes wide-eyed, a `?` pops.
// Freeze → Khata's "6" cover slams shut over the frame (s14 owns the swing-open). In: s12's navy wipe (this scene opens on navy and fades in).
(function () {
  window.OWN_SEAM_IN.s14 = true;
  window.SCENES.s13 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start, GY = 1000;
    const cam = K.g(svg, {});
    L5.stage(K, cam, C.navy, 880);
    K.el("rect", { x: 0, y: 872, width: 1920, height: 260, fill: "#1b2640", opacity: 0.45 }, cam);   // night over the floor (flat)
    [[40, 470, 170, 410], [1700, 430, 190, 450]].forEach(([x, y, w, h]) => {
      K.paper(cam, K.cutRect(x, y, w, h, 1.6, 24), "#34476a");
      for (let r = 0; r < Math.floor(h / 110); r++) for (let c = 0; c < Math.floor(w / 62); c++) K.paper(cam, K.cutRect(x + 16 + c * 56, y + 26 + r * 92, 34, 52, 0.6, 14), r % 2 ? "#e9c36a" : "#44587f", { opacity: 0.8 });
    });
    K.stringLights(cam, 120, 1800, 120, 55, 13);
    // the stall (no props — we dress the counter ourselves: tumblers, kettle, the phone)
    const SXs = 1320, SS = 0.95;
    const stall = K.stall(cam, SXs, GY, SS, { noProps: true });
    [-165, -125, -85].forEach((tx) => K.tumbler(stall.jit, tx, -300));
    K.kettle(stall.jit, 140, -300, 1);
    const phone = K.phone(stall.jit, 20, -300 - 63, 0.34, { screen: "sms" });
    const PH = [SXs + 20 * SS, GY - (300 + 63) * SS];              // phone centre (world)
    // Khata (behind Meera) then Meera
    const khata = K.khataRig(cam, 600, GY, 0.6, { expr: "awake" });
    const m = K.meera(cam, 780, GY, 0.95, { expr: "happy" });
    // the big bank SMS card (flies out of the phone, grows)
    const bigO = L5.hide(L5.node(K, cam, 0, 0)), bigI = K.g(bigO, {});
    K.smsCard(K.g(bigI, { transform: "scale(1.7)" }), 0, 0, 300, 190, { kind: "CREDITED", amount: "₹15,000", acct: "A/c XX12", type: "sms" });
    const cover = L5.cover(K, svg, 6);
    const fade = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.navy }, svg);

    // ======================================================================================= timeline
    tl.fromTo(fade, { opacity: 1 }, { opacity: 0, duration: 0.7, ease: "power1.out" }, T0);
    L5.push(tl, cam, T0 + 3.5, sc.end - 1.2 - (T0 + 3.5), `${PH[0]} ${PH[1]}`, 1, 1.06);
    m.blinks(tl, T0 + 1.2, sc.end, 3.3); khata.blink(tl, T0 + 2.0).blink(tl, T0 + 8);

    // "Next time — remember that bank deposit?" — Meera thinks back, smiles
    m.expr(tl, cue("s13", "@remember"), "thinking"); m.look(tl, cue("s13", "@remember"), 4, -3);
    m.expr(tl, cue("s13", "@deposit") + 0.5, "happy");
    // "Meera's phone buzzed." — one buzz, the screen wakes
    const tBuzz = cue("s13", "@buzzed");
    m.look(tl, tBuzz - 0.2, 9, 3);
    phone.buzz(tl, tBuzz);
    // "Your account is credited with fifteen thousand rupees." — the SMS lands on the phone; the big card pops out over the sky, left of Meera (clear of the stall)
    const tAcc = cue("s13", "@account"), tCr = cue("s13", "@credited");
    phone.show(tl, tAcc, { kind: "CREDITED", amount: "₹15,000", acct: "A/c XX12" });
    tl.set(bigO, { autoAlpha: 1, x: PH[0], y: PH[1] }, tCr);
    tl.fromTo(bigO, { x: PH[0], y: PH[1] }, { x: 420, y: 270, duration: 0.55, ease: "power2.out", immediateRender: false }, tCr);
    tl.fromTo(bigI, { scale: 0.18, svgOrigin: O }, { scale: 1, svgOrigin: O, duration: 0.55, ease: "power2.out", immediateRender: false }, tCr);
    m.expr(tl, tCr, "amazed");
    // "Credited! Great news…" — Meera cheers
    const tC2 = cue("s13", "@credited", 2);
    m.expr(tl, tC2, "joy"); m.pose(tl, tC2, { aL: [160, 12], aR: [160, 12], dur: 0.35 });
    m.hop(tl, tC2 + 0.1, { height: 40 });
    // "…right?" — Khata goes wide-eyed, a `?` pops; Meera's cheer relaxes
    const tR = cue("s13", "@right");
    khata.expr(tl, tR - 0.25, "wow"); khata.emote(tl, tR - 0.15, "?", 2.0); khata.hop(tl, tR - 0.25, { height: 30 });
    m.pose(tl, tR + 0.4, { aL: [12, 8], aR: [12, 8], dur: 0.4 });
    // freeze → Khata's "6" cover slams shut
    const tLand = sc.end - 0.2;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
    L5.allow(svg);
  };
})();

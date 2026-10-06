// s03 — The two scary words. The SMS card (from s02's flip) sits top-centre; Khata rises under it, opens, and its pages tint
// debit-blue / credit-orange BEFORE any word exists. FOUR MYTHS (thumbs-down, thumbs-up, arrow-down-up, diff) lift off the SMS one per
// sentence and get a small red ✗ — then flutter away on "what they really mean". Then the tiles land: DEBIT on the blue left page, CREDIT on the orange right page.
// In:  s02 ends on a cream plate with the SMS card centred (this scene owns its seam-in); the plate fades, the card rises to top-centre.
// Out: default torn-paper wipe → s04 (Khata stays where it is; the scale lowers onto it there).
(function () {
  // paper word tile (cream, coloured ink) drawn around (0,0)
  L6.tile = (K, parent, text, color, o = {}) => {
    const size = o.size || 56, w = o.w || K.textW(text, size) + 70, h = o.h || size * 1.5;
    const n = K.g(parent, {});
    K.tex(K.shadow(n, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 22), "pat-paper");
    K.paper(n, K.cutRect(-w / 2 + 8, h / 2 - 14, w - 16, 7, 0.6, 14), color);
    K.text(n, 0, -3, text, { size, weight: 800, color: o.ink || color }).setAttribute("data-layout-allow-overlap", "true");
    return n;
  };
  // Khata board geometry shared by s03 … s09 (Khata open, centred; the scale stands on its spine)
  L6.KH = { x: 960, y: 1048, s: 1.08 };

  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start, KH = L6.KH;
    L6.stage(K, svg, C.cream, 880);
    L6.cal(K, svg, 1);

    // ---- Khata (closed, below the frame) — pages tint, then tiles
    const k = K.khataRig(svg, KH.x, KH.y, KH.s, { expr: "awake" });
    tl.set(k.mover, { y: 560 }, 0);
    const lt = L6.node(K, k.pageArea.L.g, -167, -262); L6.hide(lt); L6.tile(K, lt, "DEBIT", C.dr, { ink: C.drText, size: 58, w: 270 });
    const rt = L6.node(K, k.pageArea.R.g, 167, -262); L6.hide(rt); L6.tile(K, rt, "CREDIT", C.cr, { ink: C.crText, size: 58, w: 290 });
    const dr = L6.node(K, k.pageArea.L.g, -167, -168); L6.hide(dr); L6.chip(K, dr, "Dr", { size: 54, bg: C.dr, w: 110, h: 72 });
    const cr = L6.node(K, k.pageArea.R.g, 167, -168); L6.hide(cr); L6.chip(K, cr, "Cr", { size: 54, bg: C.cr, w: 110, h: 72 });

    // ---- the SMS card (top-centre) and the two root icons that float out of it
    const smsR = L6.rig(K, svg, 960, 540); gsap.set(smsR.sc, { scale: 1.5, svgOrigin: O });
    K.smsCard(smsR.inner, 0, 0, 300, 210, { kind: "CREDITED", amount: "₹15,000" });
    // the four myths: sticker medallions that lift off the SMS card, fly to a row beside it and get a small red ✗
    const MY = [["thumbs-down", C.coral, 330, "@bad"], ["thumbs-up", C.leaf, 540, "@good"], ["arrow-down-up", C.sky, 1380, "@out"], ["diff", C.saffron, 1590, "@minus"]];
    const myths = MY.map(([name, col, x, anchor]) => {
      const r = L6.rig(K, svg, 0, 0); L6.hide(r.inner); K.medallion(r.inner, 0, 0, 62, name, col, C.white);
      return { r, x, anchor };
    });

    // ---- "Lesson 1" keepsake: a small photo card with Khata open, clipped to the corner
    const keep = L6.hide(L6.node(K, svg, 1600, 330));
    const keepR = K.g(keep, { transform: "rotate(4)" });
    K.tex(K.shadow(keepR, 2), K.cutRect(-170, -135, 340, 270, 2, 22), "pat-paper");
    K.paper(keepR, K.cutRect(-150, -115, 300, 190, 1.5, 22), C.cream);
    const mk = K.khataRig(keepR, 0, 50, 0.3, { open: true, expr: "happy" });
    tl.set(mk.tints.L, { opacity: 0.9 }, 0); tl.set(mk.tints.R, { opacity: 0.9 }, 0);
    K.text(keepR, 0, 100, "Lesson 1", { size: 44, font: "kalam", weight: 700 });
    K.paper(keepR, K.cutRect(-26, -150, 52, 40, 1, 12), C.saffron, { opacity: 0.9 });   // the paper clip

    // the cream plate carried over from s02 (above everything; fades first)
    const plate = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.cream }, svg);
    svg.appendChild(smsR.w);                     // card sits above the plate (it is the match object)

    // ======================================================================================= timeline
    tl.to(plate, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, T0 + 0.05);
    L6.mv(tl, smsR, T0 + 0.15, 0.7, { x: 0, y: -240 }, "power2.inOut");            // card glides up to top-centre
    // Khata rises from under the card, opens, pages tint (all before "Debit")
    const tNow = cue("s03a", "@now");
    tl.to(k.mover, { y: 0, duration: 0.95, ease: "power3.out" }, tNow + 0.15);
    k.look(tl, tNow + 1.0, 0, -8);
    k.open(tl, cue("s03a", "@sms") + 0.1, 0.6);
    k.expr(tl, cue("s03a", "@sms") + 0.5, "happy", { noTake: true });
    k.pageTint(tl, cue("s03a", "@sms") + 0.85, "left"); k.pageTint(tl, cue("s03a", "@sms") + 1.1, "right");
    k.look(tl, cue("s03a", "@sms") + 1.5, 0, 0);
    // soften the tint a little once both are down (ink + tiles read clearly)
    tl.to(k.tints.L, { opacity: 0.62, duration: 0.5 }, cue("s03a", "@sms") + 1.5); tl.to(k.tints.R, { opacity: 0.62, duration: 0.5 }, cue("s03a", "@sms") + 1.5);

    // four myths: each sticker lifts out of the SMS card on its sentence and lands in the row beside it; a small ✗ stamps it. They flutter down on "what they really mean".
    const tFall = cue("s03b", "@mean");
    myths.forEach(({ r, x, anchor }, i) => {
      const t = cue("s03a", anchor) - 0.5, sd = x < 960 ? -1 : 1;
      tl.set(r.pos, { x: 960 + sd * 60, y: 300 }, 0); gsap.set(r.sc, { scale: 0.5, svgOrigin: O });
      K.dropIn(tl, r.inner, t, { dur: 0.3 });
      L6.mv(tl, r, t, 0.75, { x, y: 300 }, "power2.out");
      L6.mv(tl, r, t, 0.75, { scale: 1.0 }, "power2.out");
      K.pulseNode(tl, smsR.inner, t - 0.05, 1.03);
      K.stamp(tl, r.inner, 40, 40, t + 0.8, 0.5, { rot: i % 2 ? 8 : -9 });
      // flutter down and out of frame (paper sway), after the pause
      const tf = tFall + i * 0.1;
      tl.to(r.pos, { x: x + sd * 220, duration: 1.1, ease: "power1.in" }, tf);
      tl.to(r.pos, { y: 1230, duration: 1.1, ease: "power2.in" }, tf);
      tl.to(r.sc, { rotation: sd * 38, svgOrigin: O, duration: 1.1, ease: "power1.inOut" }, tf);
    });

    // the tiles: "debit just means LEFT" / "credit just means RIGHT"
    const tL = cue("s03b", "@left"), tR = cue("s03b", "@right");
    k.look(tl, tL - 0.15, -9, 0); k.look(tl, tR - 0.15, 9, 0); k.look(tl, tR + 0.8, 0, 0);
    K.dropIn(tl, lt, tL - 0.02, { dur: 0.34 }); K.dropIn(tl, dr, tL + 0.32, { dur: 0.3 });
    K.dropIn(tl, rt, tR - 0.02, { dur: 0.34 }); K.dropIn(tl, cr, tR + 0.32, { dur: 0.3 });
    k.arm(tl, tL - 0.1, "L", 60, 0.25).arm(tl, tL + 0.9, "L", 20, 0.3);
    k.arm(tl, tR - 0.1, "R", 60, 0.25).arm(tl, tR + 0.9, "R", 20, 0.3);

    // "Remember Khata's two pages, from the very first lesson?" — the Lesson 1 keepsake clips on
    K.dropIn(tl, keep, cue("s03c", "@first"), { dur: 0.4 });
    // "This is why." — Khata winks
    k.expr(tl, cue("s03c", "@this"), "wink").emote(tl, cue("s03c", "@this") + 0.1, "sparkle", 0.9);
    k.expr(tl, cue("s03c", "@why") + 0.5, "happy", { noTake: true });
    k.blink(tl, T0 + 9.5).blink(tl, T0 + 16.5);
  };
})();

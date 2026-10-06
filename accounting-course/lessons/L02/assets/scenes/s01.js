// s01 — Cold open: April 1, before sunrise. Meera drops the ₹50,000 bundle into the galla; dawn breaks; "whose money is it now?"
// Exit: she shuts the galla (blank tag hanging on its edge) and the camera rushes into the brass clasp → s01t (same seam as L1 s01→s01t).
// ALSO defines window.DH — the small helper kit shared by every Lesson-2 scene file (this file loads first).
(function () {
  // ---------- icons that Lesson 2 needs and the shared set lacks (Lucide, inlined) ----------
  Object.assign(window.ICONS, {
    hand: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /> <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" /> <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" /> <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />',
    "thumbs-up": '<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /> <path d="M7 10v12" />',
    "user-round": '<circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" />',
  });

  const O = "0 0";
  const DH = (window.DH = {
    // positioned wrapper + inner group drawn around local (0,0) (so scale/rotate pivot on it)
    node(parent, x, y, extra = {}) {
      const K = window.KIT;
      const outer = K.g(parent, { transform: `translate(${x} ${y})`, ...extra });
      return { outer, inner: K.g(outer, {}) };
    },
    // hidden by DOM attribute (so a <use> clone / first frame is right even before the timeline reaches it)
    hide(el) { el.setAttribute("opacity", "0"); return el; },
    // drop-and-place entrance (1.07x lifted -> flat, power2.out, no overshoot) and lift-off exit
    pop(tl, el, t, o = {}) {
      DH.hide(el);
      tl.fromTo(el, { autoAlpha: 0, scale: o.from ?? 1.07, svgOrigin: O },
        { autoAlpha: 1, scale: 1, svgOrigin: O, duration: o.dur ?? 0.34, ease: "power2.out", immediateRender: false }, t);
      return el;
    },
    out(tl, el, t, dur = 0.2) { tl.to(el, { scale: 1.05, autoAlpha: 0, svgOrigin: O, duration: dur, ease: "power2.in" }, t); },
    // calm highlight: 1 -> amt -> 1 (smooth lift, no bounce)
    pulse(tl, el, t, amt = 1.06) {
      tl.to(el, { scale: amt, svgOrigin: O, duration: 0.22, ease: "power2.out" }, t);
      tl.to(el, { scale: 1, svgOrigin: O, duration: 0.4, ease: "power2.inOut" }, t + 0.22);
    },
    // arc flight: outer node already sits at `from`; x eased in-out, y up-then-down
    fly(tl, el, t, from, to, dur = 0.6, lift = 120) {
      tl.set(el, { x: from[0], y: from[1] }, 0);
      tl.to(el, { x: to[0], duration: dur, ease: "power1.inOut" }, t);
      const peak = Math.min(from[1], to[1]) - lift;
      tl.to(el, { y: peak, duration: dur * 0.45, ease: "power2.out" }, t);
      tl.to(el, { y: to[1], duration: dur * 0.55, ease: "power2.in" }, t + dur * 0.45);
    },
    // dotted paper line between two points (static dots)
    dots(parent, x0, y0, x1, y1, n = 8, r = 5, color) {
      const K = window.KIT, grp = K.g(parent, {});
      for (let i = 1; i <= n; i++) {
        const u = i / (n + 1);
        K.paper(grp, K.cutEll(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, r, r, 0.4), color || K.C.ink, { opacity: 0.7 });
      }
      return grp;
    },
    // blank paper tag (hole + twine loop); origin = the hole at (0,0), tag hangs DOWN from it
    blankTag(parent, w = 170, h = 150, kraft = false) {
      const K = window.KIT, g = K.g(parent, {});
      K.el("path", { d: "M0,0 C-26,-56 26,-56 0,0", fill: "none", stroke: "#7a6b58", "stroke-width": 3.4, "stroke-linecap": "round" }, g);
      // same footprint as the equity/claim tag art: hole 26 px below the top edge, bottom h-26 below the hole
      K.tex(K.shadow(g, 1), K.cutPoly([[-w / 2, 18], [-(w / 2 - 34), -26], [w / 2 - 34, -26], [w / 2, 18], [w / 2, h - 26], [-w / 2, h - 26]], 1.4, 16), kraft ? "pat-kraft" : "pat-paper");
      K.paper(g, K.cutEll(0, 0, 17, 17, 0.5), "#e8dcc4");
      K.paper(g, K.cutEll(0, 0, 8.5, 8.5, 0.3), "#6f6150");
      return g;
    },
    // twine drawn by stroke-dash from (x0,y0) to (x1,y1) with a slight sag; returns the path
    string(tl, parent, t, [x0, y0], [x1, y1], dur = 0.6, sag = 40) {
      const K = window.KIT, mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + sag;
      let L = 0, px = x0, py = y0;
      for (let i = 1; i <= 24; i++) { const u = i / 24, qx = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, qy = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1; L += Math.hypot(qx - px, qy - py); px = qx; py = qy; }
      const p = K.el("path", { d: `M${x0},${y0} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`, fill: "none", stroke: "#7a6b58", "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": L.toFixed(1), "stroke-dashoffset": L.toFixed(1) }, parent);
      tl.to(p, { strokeDashoffset: 0, duration: dur, ease: "power2.out" }, t);
      p._len = L;
      return p;
    },
    // April strip: from s03 to s10 it shows `1`; only s11 ticks it to `2`
    calendar(parent, highlight = 1, o = {}) {
      return window.KIT.calendarStrip(parent, 960, o.y ?? 58, o.s ?? 1, { highlight, hidden: !!o.hidden });
    },
  });

  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, T0 = sc.start;
    const GROUND = 985;
    const GX = 1010, GS = 1.35, GY = 775;                       // galla on the crate
    const CLASP = [GX, GY - 81 * GS];                           // brass clasp centre (world) — the rush target
    const cam = K.g(svg, { id: "s01-cam" });

    // ---- dawn sky (navy → saffron band behind the skyline), string lights, ground
    const dawn = K.dawnBand(cam, 0, 0, 1, { horizon: 826, bandH: 300 });
    K.stringLights(cam, -20, 1940, 40, 90, 14);
    K.table(cam, 830);
    const tint = K.paper(cam, K.cutRect(-40, 826, 2000, 330, 0, 80), C.navy, { opacity: 0.42 });   // night wash on the ground

    // ---- the empty pitch: a faint chalk outline of the stall that doesn't exist yet
    const ghost = K.cartGhost(cam, 1500, GROUND, 0.9, { lineOpacity: 0.5 });

    // ---- crate + closed galla + Meera (hero ≈ 55 % of frame height)
    K.crate(cam, GX, GROUND - 10, 340, 200);
    const galla = K.galla(cam, GX, GY, GS, { open: false, overflow: true });
    const m = K.meera(cam, 560, GROUND, 0.95, { expr: "thinking", aL: [12, 8], aR: [20, 70], lookY: 4 });
    const flyer = DH.node(cam, m.handR[0] + 6, m.handR[1] - 4);
    K.bundle(flyer.inner, 0, 0, 0.95, -8);
    const chip = DH.node(cam, m.handR[0] + 70, m.handR[1] - 150);
    K.label(chip.inner, 0, 0, "₹50,000", { size: 52, bg: C.saffron, rot: -3, shadow: 2 });

    // blank claim tag that will hang on the galla's edge
    const tagPos = DH.node(cam, GX + 108 * GS, GY - 88 * GS);
    const tagG = DH.blankTag(tagPos.inner, 150, 128);
    DH.hide(tagPos.outer);

    // '?' above the stall side
    const q = DH.node(cam, GX + 40, 410);
    K.qmark(q.inner, 0, 0, 1.5, C.saffron);
    DH.hide(q.inner);

    // fade from black + brass plate for the clasp rush (both above the camera)
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const gold = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.brass, opacity: 0 }, svg);

    // ======================================================================== timeline
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.2, ease: "power1.out" }, T0);

    const tEndB = segEnd("s01b"), tRush = tEndB - 0.05;
    tl.fromTo(cam, { scale: 1, x: 0, y: 0, svgOrigin: `${CLASP[0]} ${CLASP[1]}` },
      { scale: 1.07, x: 0, y: 0, svgOrigin: `${CLASP[0]} ${CLASP[1]}`, duration: tRush - T0, ease: "none" }, T0);

    // --- s01a ---------------------------------------------------------------
    m.blink(tl, T0 + 1.6);
    m.look(tl, cue("s01a", "@meera"), 7, 5);                                  // looks down at the bundle
    m.lean(tl, cue("s01a", "@years") - 0.1, 1.6).lean(tl, cue("s01a", "@years") + 0.35, 0);   // small breath
    m.expr(tl, cue("s01a", "@years"), "sad", { noTake: true });
    m.expr(tl, cue("s01a", "@savings") + 0.2, "thinking");
    // the bundle + its label are there from the first frame (settled by the time she says "fifty")
    DH.pop(tl, chip.inner, cue("s01a", "@fifty") - 0.1);

    // --- the gap: lid opens, her arm swings over, the bundle drops on an eased arc
    const tDrop = segEnd("s01a") + 0.2;
    galla.open(tl, tDrop - 0.25, { notes: false });
    m.arm(tl, tDrop - 0.1, "R", 82, 10, 0.3);
    m.look(tl, tDrop - 0.1, 8, 3);
    tl.to(chip.outer, { autoAlpha: 0, duration: 0.2 }, tDrop - 0.1);
    const from = [m.handR[0] + 6, m.handR[1] - 4], to = [GX + 10, GY - 150];
    DH.fly(tl, flyer.outer, tDrop, from, to, 0.55, 90);
    tl.to(flyer.outer, { autoAlpha: 0, duration: 0.08 }, tDrop + 0.55);
    tl.to(galla.notes, { opacity: 1, duration: 0.1 }, tDrop + 0.5);
    tl.to(galla.notes, { scale: 1.06, svgOrigin: "0 -120", duration: 0.15, ease: K.stepEase(0.15, "power2.out", tDrop + 0.55) }, tDrop + 0.55);
    tl.to(galla.notes, { scale: 1, svgOrigin: "0 -120", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tDrop + 0.7) }, tDrop + 0.7);
    m.arm(tl, tDrop + 0.7, "R", 20, 70, 0.35);
    m.expr(tl, tDrop + 0.6, "happy");

    // --- dawn: "And just like that" — the saffron band rises in two stepped moves; the moon slides off; the night wash lifts
    const tDawn = segStart("s01b");
    dawn.rise(tl, tDawn, tDawn + 3.0).moonOff(tl, tDawn + 0.3, 2.6);
    tl.to(tint, { opacity: 0.1, duration: 2.6, ease: "power1.inOut" }, tDawn);
    m.look(tl, cue("s01b", "@galla"), 6, 3);

    // --- s01b: whose money?
    const tSo = cue("s01b", "@so");
    m.expr(tl, tSo + 0.1, "puzzled").headTilt(tl, tSo + 0.1, -5).look(tl, cue("s01b", "@whose"), 0, -4);
    DH.pop(tl, q.inner, cue("s01b", "@whose") + 0.2);
    const tMeeras = cue("s01b", "@meera's"), tStalls = cue("s01b", "@stall's");
    m.arm(tl, tMeeras - 0.1, "L", 40, 120, 0.25);                             // taps her own chest: "Meera's?"
    m.look(tl, tMeeras, 0, -2);
    m.arm(tl, tStalls - 0.35, "L", 12, 8, 0.25);
    m.point(tl, tStalls - 0.2, "R", 92).look(tl, tStalls - 0.2, 9, 2);        // points at the galla: "Or the stall's?"
    tl.to(q.outer, { autoAlpha: 0, duration: 0.2 }, cue("s01b", "@answer") - 0.2);
    // "a bit of both" — a blank tag drops on the galla's edge and hangs still; Meera puzzled → grin
    const tBit = cue("s01b", "@bit");
    tl.fromTo(tagPos.outer, { autoAlpha: 0, y: GY - 88 * GS - 90 }, { autoAlpha: 1, y: GY - 88 * GS, duration: 0.3, ease: "power2.in", immediateRender: false }, tBit - 0.1);
    tl.fromTo(tagPos.inner, { rotation: -6, svgOrigin: O }, { rotation: 3, svgOrigin: O, duration: 0.3, ease: "power2.out", immediateRender: false }, tBit - 0.1);
    m.arm(tl, tBit, "R", 20, 70, 0.3).look(tl, tBit, 5, 1);
    m.expr(tl, tBit, "grin");

    // --- exit: the galla snaps shut (tag still hanging), the camera rushes into the brass clasp
    galla.shut(tl, tEndB - 0.3);
    const rushDur = sc.end - tRush;
    tl.to(cam, { scale: 11, x: 960 - CLASP[0], y: 540 - CLASP[1], svgOrigin: `${CLASP[0]} ${CLASP[1]}`, duration: rushDur, ease: "power3.in" }, tRush);
    tl.to(gold, { opacity: 1, duration: 0.16, ease: "none" }, sc.end - 0.16);

    m.blinks(tl, T0 + 4, sc.end, 3.4);
    m.jitter(tl, T0, sc.end);
  };
})();

// s01 — Cold open: night at the stall. Meera counts the day's notes, can't answer "did I make money?".
// Exit: she snaps the galla shut and the camera rushes into its brass clasp (gold fills the frame) → s01t.
(function () {
  // icons for the cost slips + profit/loss beat (Lucide, inlined)
  Object.assign(window.ICONS, {
    "milk": '<path d="M8 2h8" /> <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" /> <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />',
    "store": '<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" /> <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" /> <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />',
    "trending-down": '<path d="M16 17h6v-6" /> <path d="m22 17-8.5-8.5-5 5L2 7" />',
  });
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C;
    const NIGHT_INK = "#1f2a44";

    // ---- camera: one group, pivot at the galla clasp so the slow push and the final rush share an origin
    const MS = 1.3, GROUND = 985;                       // Meera is the hero: big in frame
    const GX = 600, GY = GROUND - 105 * MS, GS = 0.95 * MS;   // galla on Meera's lap
    const CLASP = [GX, GY - 81 * GS];                  // clasp centre in world space
    const cam = K.g(svg, { id: "s01-cam" });

    // ---- sky
    K.wall(cam, C.navy);
    K.paper(K.shadow(cam, 1), K.cutEll(1700, 150, 62, 62, 2), C.cream);           // moon
    K.paper(cam, K.cutEll(1724, 138, 50, 52, 1.5), C.navy);                        // crescent bite
    [[180, 120], [420, 70], [760, 150], [1080, 60], [1320, 130], [1500, 230], [960, 260], [260, 300]].forEach(([x, y], i) =>
      K.paper(cam, K.cutEll(x, y, 5 + (i % 3) * 2, 5 + (i % 3) * 2, 0.6), C.gold, { opacity: 0.85 }));

    // ---- string lights with refs (they warm up on s01c)
    const wire = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24; wire.push([-20 + 1960 * t, 70 + Math.sin(t * Math.PI) * 110]); }
    K.ink(cam, wire, 3, "#141b2c");
    const halos = K.g(cam, { opacity: 0 }), bulbs = [];
    for (let i = 0; i < 15; i++) {
      const t = (i + 0.5) / 15, bx = -20 + 1960 * t, by = 70 + Math.sin(t * Math.PI) * 110 + 18;
      K.paper(halos, K.cutEll(bx, by, 34, 34, 2), C.cream, { opacity: 0.22 });
      const bp = K.g(cam, { transform: `translate(${bx} ${by})` });
      const b = K.g(bp, {});
      K.paper(K.shadow(b, 1), K.cutEll(0, 0, 11, 14, 1), C.gold);
      bulbs.push(b);
    }

    // ---- ground + night tint
    K.table(cam, 820);
    K.paper(cam, K.cutRect(-40, 810, 2000, 330, 0, 80), C.navy, { opacity: 0.42 });

    // ---- neighbouring stalls (silhouettes) + their owners
    const silStall = (x, s) => {
      const gp = K.g(cam, { transform: `translate(${x} 838) scale(${s})` });
      K.paper(gp, K.cutRect(-170, -300, 340, 40, 1.5), "#24304d");
      K.paper(gp, K.cutRect(-150, -260, 300, 200, 2), "#1b2540");
      K.paper(gp, K.cutRect(-190, -420, 380, 70, 1.5), "#2a3756");
      [-140, 140].forEach((px) => K.paper(gp, K.cutRect(px - 8, -360, 16, 120, 1, 20), "#1b2540"));
    };
    silStall(70, 0.62); silStall(1860, 0.6);
    const sil = (x, s, flip, hair) => K.meera(cam, x, 846, s, {
      skin: NIGHT_INK, top: NIGHT_INK, legs: NIGHT_INK, shoes: NIGHT_INK, apron: false, earrings: false, collar: false,
      hair, flip, expr: "neutral",
    });
    const neighbours = [sil(230, 0.42, false, "pony"), sil(1075, 0.36, true, undefined), sil(1770, 0.42, true, "bald")];

    // ---- Meera's stall (no galla on the counter — it's on her lap tonight)
    const stall = K.stall(cam, 1460, GROUND, 1.05, { galla: false });

    // ---- crate + Meera + galla
    K.crate(cam, GX, GROUND, 230 * MS, 140 * MS);
    const m = K.meera(cam, GX, GROUND, MS, { sit: true, expr: "neutral", aL: [30, 78], aR: [30, 78], lookY: 4 });
    const galla = K.galla(cam, GX, GY, GS, { open: true, overflow: true });
    // the note Meera flicks: lives in her right hand
    const flickNote = K.g(m.handAnchor("R"), {});
    K.note(flickNote, 0, -24, 92, 48, -18);

    // '?' emote above her head
    const qPos = K.g(cam, { transform: `translate(${GX + 20} 170)` });
    const q = K.g(qPos, {});
    K.qmark(q, 0, 0, 1.6, C.saffron);

    // calendar strip (bible §5.7): this night is Apr 2 — Meera's first trading day. Lives OUTSIDE the camera group so it sits
    // dead still while the scene pushes; small, top, dimmed to the night tint; month label is the one swappable word.
    const cal = K.calendarStrip(svg, 960, 52, 0.62, { highlight: 2, month: "April", hidden: true });
    cal.g.setAttribute("opacity", "0.86");

    // fade from black + gold plate for the clasp rush (both above the camera)
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const gold = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.brass, opacity: 0 }, svg);

    // ======================================================================== timeline
    const T0 = sc.start;
    tl.set(q, { scale: 0, svgOrigin: "0 0" }, T0);
    cal.enter(tl, T0 + 0.9);                                  // drop-and-place as the black lifts, then dead still
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.4, ease: "power1.out" }, T0);
    // slow push toward the galla for the whole scene
    const tRush = cueEnd("s01c", "@business") + 0.35;     // after the galla snaps shut
    tl.fromTo(cam, { scale: 1, x: 0, y: 0, svgOrigin: `${CLASP[0]} ${CLASP[1]}` },
      { scale: 1.06, x: 0, y: 0, svgOrigin: `${CLASP[0]} ${CLASP[1]}`, duration: tRush - T0, ease: "none" }, T0);   // house cap 1.06

    // counting notes: flicks (stepped forearm taps + the note flips)
    const flick = (t) => {
      m.arm(tl, t, "R", 34, 96, 0.17);
      m.arm(tl, t + 0.25, "R", 30, 78, 0.17);
      tl.to(flickNote, { scaleX: -1, svgOrigin: "0 -24", duration: 1 / 15, ease: "none" }, t + 0.17);
      tl.to(flickNote, { scaleX: 1, svgOrigin: "0 -24", duration: 1 / 15, ease: "none" }, t + 0.42);
    };
    [0.55, 1.05].forEach((d) => flick(T0 + d));

    // "This is Meera." — she looks up at us and smiles
    const tMeera = cue("s01a", "@meera");
    m.look(tl, tMeera - 0.15, 0, -3).expr(tl, tMeera, "happy").headTilt(tl, tMeera, -4);
    // "first day of her chai stall" — she points proudly at the stall
    const tStall = cue("s01a", "@stall");
    m.point(tl, cue("s01a", "@first") - 0.1, "R", 72).look(tl, cue("s01a", "@first"), 7, -1);
    stall.awning && tl.to(stall.awning, { y: -10, duration: 0.17, ease: K.stepEase(0.17, "power2.out", tStall) }, tStall);
    stall.awning && tl.to(stall.awning, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tStall + 0.17) }, tStall + 0.17);
    // "She served chai all day" — kettle steams, back to counting
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end + 0.6);
    m.arm(tl, cue("s01a", "@served"), "R", 30, 78, 0.3).look(tl, cue("s01a", "@served"), 0, 4);
    flick(cue("s01a", "@chai", 2)); flick(cue("s01a", "@day", 2) + 0.2);
    // "the galla — her cash box" — she lifts the galla a little toward us
    const tGalla = cue("s01a", "@galla");
    tl.to(galla.body, { y: -16, duration: 0.25, ease: K.stepEase(0.25, "power2.out", tGalla) }, tGalla);
    tl.to(galla.body, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tGalla + 0.9) }, tGalla + 0.9);
    m.look(tl, tGalla, 0, -3);
    // "full of notes" — the notes puff up out of the box
    const tNotes = cue("s01a", "@notes");
    tl.to(galla.notes, { scale: 1.12, svgOrigin: "0 -120", duration: 0.17, ease: K.stepEase(0.17, "power2.out", tNotes - 0.1) }, tNotes - 0.1);
    tl.to(galla.notes, { scale: 1, svgOrigin: "0 -120", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tNotes + 0.1) }, tNotes + 0.1);
    // "But once she pays for the milk, the sugar, and the stall's rent —" three cost slips leave the galla, one per word;
    // the pile of notes shrinks a little each time (money in ≠ money left over)
    const costs = [["@milk", "milk", 890, 330, -5], ["@sugar", "package", 1030, 300, 3], ["@rent", "store", 1165, 335, -3]];
    const slips = costs.map(([word, icon, x, y, rot], i) => {
      const t = cue("s01a", word);
      const pos = K.g(cam, { transform: `translate(${GX} ${GY - 90})` });
      const inner = K.g(pos, {});
      K.slip(inner, 0, 0, 1.15, rot, icon);
      tl.set(inner, { opacity: 0 }, T0);
      tl.set(inner, { opacity: 1 }, t - 0.05);
      // arc out of the box (smooth flight), small settle on arrival
      tl.fromTo(pos, { x: GX, y: GY - 90 }, { x, y, duration: 0.55, ease: "power2.out", immediateRender: false }, t - 0.05);
      tl.fromTo(inner, { scale: 1.07, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.5, ease: "power2.out", immediateRender: false }, t - 0.05);
      tl.to(galla.notes, { scale: 1 - 0.05 * (i + 1), svgOrigin: "0 -120", duration: 0.25, ease: K.stepEase(0.25, "power2.out", t) }, t);
      m.look(tl, t, 6, -2);
      return inner;
    });
    // "did Meera actually make a profit today? Or a loss?" — up/down medallions above her, then puzzled + '?'
    const tProfit = cue("s01a", "@profit"), tLoss = cue("s01a", "@loss");
    m.look(tl, cue("s01a", "@did"), 0, 6).headTilt(tl, cue("s01a", "@did"), 3);
    const updown = [["trending-up", C.leaf, GX - 190, 290, tProfit], ["trending-down", C.coral, GX + 225, 215, tLoss]].map(([ic, bg, x, y, t]) => {
      const pp = K.g(cam, { transform: `translate(${x} ${y})` }), mi = K.g(pp, {});
      K.medallion(mi, 0, 0, 44, ic, bg, C.white);
      tl.set(mi, { opacity: 0, scale: 1.07, svgOrigin: "0 0" }, T0);                                 // drop-and-place
      tl.to(mi, { opacity: 1, duration: 0.12, ease: "none" }, t);
      tl.to(mi, { scale: 1, svgOrigin: "0 0", duration: 0.34, ease: "power2.out" }, t);
      return mi;
    });
    m.look(tl, tProfit, -6, -4);
    m.look(tl, tLoss - 0.1, 6, -5).expr(tl, tLoss, "puzzled").headTilt(tl, tLoss, -8);
    const tToday = tLoss + 0.35;
    tl.to(q, { scale: 1, rotation: 0, svgOrigin: "0 0", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tToday) }, tToday);
    tl.fromTo(q, { rotation: -8 }, { rotation: 0, svgOrigin: "0 0", duration: 0.3, ease: "none", immediateRender: false }, tToday);
    // clear the costs + medallions when she shrugs it off
    [...slips, ...updown].forEach((n, i) => tl.to(n, { opacity: 0, duration: 0.3, ease: "power1.in" }, cue("s01b", "@honestly") + i * 0.04));

    // s01b "She doesn't know." — shrug; '?' wobbles off
    const tKnow = cue("s01b", "@know");
    m.shrug(tl, tKnow - 0.35, 1.0).expr(tl, tKnow - 0.35, "worried", { noTake: true });
    tl.to(q, { scale: 0, svgOrigin: "0 0", duration: 0.2, ease: "power2.in" }, cue("s01b", "@honestly"));
    m.look(tl, cue("s01b", "@honestly"), 0, -3);
    // "Most people who start a business…" — the neighbours shrug in a staggered wave
    const tMost = cue("s01b", "@most");
    neighbours.forEach((n, i) => n.shrug(tl, tMost + i * 0.22, 1.1));
    m.look(tl, tMost, -6, -1);
    m.look(tl, cue("s01b", "@either"), 0, -3).headTilt(tl, cue("s01b", "@either"), 0);

    // s01c — warm lift: lights brighten, Meera looks hopeful
    const tBy = segStart("s01c");
    tl.to(halos, { opacity: 1, duration: 0.8, ease: "power1.out" }, tBy);
    bulbs.forEach((b, i) => tl.to(b, { scale: 1.25, svgOrigin: "0 0", duration: 0.33, ease: K.stepEase(0.33, "power2.out", tBy + i * 0.05) }, tBy + i * 0.05));
    m.expr(tl, cue("s01c", "@course"), "happy").headTilt(tl, cue("s01c", "@course"), 0);
    m.expr(tl, cue("s01c", "@answer"), "grin");
    // "for Meera" — taps her chest with her left hand; "for your own business" — points at YOU
    m.arm(tl, cue("s01c", "@meera") - 0.1, "L", 40, 120, 0.25);
    m.arm(tl, cue("s01c", "@your") - 0.15, "L", 30, 78, 0.25);
    m.point(tl, cue("s01c", "@your") - 0.1, "R", 105).look(tl, cue("s01c", "@your"), 0, -2);

    // exit: snap the galla shut (both hands on it), then rush into the clasp
    const tShut = cueEnd("s01c", "@business") + 0.05;
    m.arm(tl, tShut - 0.2, "R", 30, 78, 0.17).expr(tl, tShut - 0.2, "joy", { noTake: true });
    galla.shut(tl, tShut);
    tl.to(flickNote, { opacity: 0, duration: 0.05 }, tShut);
    cal.exit(tl, tRush - 0.1);                                // lifts off before the clasp rush
    const rushDur = sc.end - tRush;
    tl.to(cam, { scale: 11, x: 960 - CLASP[0], y: 540 - CLASP[1], svgOrigin: `${CLASP[0]} ${CLASP[1]}`,
      duration: rushDur, ease: "power3.in" }, tRush);
    tl.to(gold, { opacity: 1, duration: 0.16, ease: "none" }, sc.end - 0.16);

    // acting texture
    m.blinks(tl, T0 + 1.5, sc.end, 3.3);
    m.jitter(tl, T0, sc.end);
    stall.jitter(tl, T0, sc.end);
    neighbours.forEach((n, i) => n.jitter(tl, T0, sc.end, { seed: 30 + i }));
  };
})();

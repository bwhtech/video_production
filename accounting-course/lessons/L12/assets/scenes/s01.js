// s01 — Cold open: L1's first night, rebuilt. Night, string lights, Meera on the crate with the galla on her knees, the street dog asleep,
// April 2 in the calendar strip. Three cost slips (milk, sugar, rent) lift out and hang — counted, not paid — then the profit / loss medallions.
// NEW vs L1: Khata sits on the counter, eyes open. Month of books (19 small books + a matching trial balance) arrive; "So tonight, Khata opens."
// Exit: Khata closes; the camera rushes into its red cover → fills the frame → s01t (title sting).
(function () {
  window.OWN_SEAM_IN.s01t = true;

  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    const NIGHT_INK = "#1f2a44";
    const MS = 1.3, GROUND = 985, GX = 600, GY = GROUND - 105 * MS, GS = 0.95 * MS;
    const KX = 1470, KY = 668, KS = 0.5;                   // Khata on the counter
    const PIVOT = [KX, KY - 100 * KS * 1.2];                // camera pivot = Khata's spine
    const cam = K.g(svg, { id: "s01-cam" });

    // ---- sky + string lights
    K.wall(cam, C.navy);
    K.paper(K.shadow(cam, 1), K.cutEll(1700, 150, 62, 62, 2), C.cream);
    K.paper(cam, K.cutEll(1724, 138, 50, 52, 1.5), C.navy);
    [[180, 120], [420, 70], [760, 150], [1080, 60], [1320, 130], [1500, 230], [960, 260], [260, 300]].forEach(([x, y], i) =>
      K.paper(cam, K.cutEll(x, y, 5 + (i % 3) * 2, 5 + (i % 3) * 2, 0.6), C.gold, { opacity: 0.85 }));
    const wire = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24; wire.push([-20 + 1960 * t, 70 + Math.sin(t * Math.PI) * 110]); }
    K.ink(cam, wire, 3, "#141b2c");
    for (let i = 0; i < 15; i++) {
      const t = (i + 0.5) / 15, bx = -20 + 1960 * t, by = 70 + Math.sin(t * Math.PI) * 110 + 18;
      K.paper(cam, K.cutEll(bx, by, 34, 34, 2), C.cream, { opacity: 0.18 });
      K.paper(K.shadow(cam, 1), K.cutEll(bx, by, 11, 14, 1), C.gold);
    }
    K.table(cam, 820);
    K.paper(cam, K.cutRect(-40, 810, 2000, 330, 0, 80), C.navy, { opacity: 0.42 });

    // ---- Meera's stall, with Khata awake on the counter
    const stall = K.stall(cam, 1460, GROUND, 1.05, { galla: false });
    const khata = K.khataRig(cam, KX, KY, KS, { expr: "awake" });

    // ---- crate + Meera + galla + the dog
    K.crate(cam, GX, GROUND, 230 * MS, 140 * MS);
    const m = K.meera(cam, GX, GROUND, MS, { sit: true, expr: "neutral", aL: [30, 78], aR: [30, 78], lookY: 4 });
    const galla = K.galla(cam, GX, GY, GS, { open: true, overflow: true });
    const flickNote = K.g(m.handAnchor("R"), {}); K.note(flickNote, 0, -24, 92, 48, -18);
    const dog = L.dog(cam, 285, GROUND + 4, 1.1);

    // ---- calendar strip (outside the camera): April 2
    const cal = K.calendarStrip(svg, 960, 52, 0.62, { highlight: 2, month: "April", hidden: true });
    cal.g.setAttribute("opacity", "0.86");

    // ---- L12 props: three cost slips, two medallions, "?" emote, 19 small books, matching trial balance sheet
    const costs = [["@milk", "milk", 930, 260, -5], ["@sugar", "package", 1070, 232, 3], ["@rent", "key", 1210, 262, -3]];
    const slips = costs.map(([w, icon, x, y, rot]) => {
      const pos = K.g(cam, { transform: `translate(${GX} ${GY - 90})` }), inner = K.g(pos, {});
      K.slip(inner, 0, 0, 1.15, rot, icon);
      return { pos, inner, w, x, y };
    });
    const medUp = L.node(cam, 400, 250); L.hide(medUp); K.medallion(medUp, 0, 0, 62, "trending-up");
    const medDown = L.node(cam, 800, 250); L.hide(medDown); K.medallion(medDown, 0, 0, 62, "trending-down");
    const q = L.node(cam, 600, 215); L.hide(q); K.qmark(q, 0, 0, 1.7, C.grey);
    // 19 books, two rows on the table between Meera and the stall
    const books = [];
    for (let i = 0; i < 19; i++) {
      const front = i >= 9, k = front ? i - 9 : i;
      const b = L.node(cam, 880 + k * 40 + (front ? 0 : 20), front ? 955 : 905); L.hide(b);
      K.smallBook(b, 0, 0, 36, 86, undefined, 0);
      books.push(b);
    }
    const sheet = L.node(cam, 1010, 420); L.hide(sheet);
    {
      const sg = K.g(sheet, { transform: "rotate(-3)" });
      K.tex(K.shadow(sg, 2), K.cutRect(-225, -150, 450, 300, 2, 24), "pat-paper");
      K.paper(sg, K.cutRect(-215, -140, 213, 56, 0.8, 14), C.dr); K.paper(sg, K.cutRect(2, -140, 213, 56, 0.8, 14), C.cr);
      K.text(sg, -108, -112, "Debit", { size: 36, weight: 800, color: "#fff" }); K.text(sg, 108, -112, "Credit", { size: 36, weight: 800, color: "#fff" });
      for (let r = 0; r < 3; r++) { K.ink(sg, [[-205, -52 + r * 38], [-12, -52 + r * 38]], 2.5, "#a39684"); K.ink(sg, [[12, -52 + r * 38], [205, -52 + r * 38]], 2.5, "#a39684"); }
      K.ink(sg, [[-215, 52], [215, 52]], 4, C.ink);
      sheet._sg = sg;
    }
    const totL = K.ticker(sheet._sg, -110, 100, 1, { value: 0, size: 38, weight: 800, color: C.drText });
    const totR = K.ticker(sheet._sg, 110, 100, 1, { value: 0, size: 38, weight: 800, color: C.crText });
    // soft paper panel behind Khata's blank pages (flat, no glow)
    const panel = L.node(cam, KX, KY - 95); L.hide(panel);
    K.paper(panel, K.cutRect(-240, -140, 480, 270, 3, 26), C.cream, { opacity: 0.55 });

    // fade from black + red plate for the rush
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const plate = L.plate(svg); plate.setAttribute("opacity", "0");

    // ======================================================================== timeline
    cal.enter(tl, T0 + 0.9);
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.4, ease: "power1.out" }, T0);
    const tOpen = cue("s01b", "@opens"), tClose = tOpen + 0.95, tRush = tClose + 0.1;
    tl.fromTo(cam, { scale: 1, svgOrigin: `${PIVOT[0]} ${PIVOT[1]}` }, { scale: 1.06, svgOrigin: `${PIVOT[0]} ${PIVOT[1]}`, duration: tClose - T0, ease: "none" }, T0);

    // counting notes (stepped forearm taps + the note flips)
    const flick = (t) => {
      m.arm(tl, t, "R", 34, 96, 0.17); m.arm(tl, t + 0.25, "R", 30, 78, 0.17);
      tl.to(flickNote, { scaleX: -1, svgOrigin: "0 -24", duration: 1 / 15, ease: "none" }, t + 0.17);
      tl.to(flickNote, { scaleX: 1, svgOrigin: "0 -24", duration: 1 / 15, ease: "none" }, t + 0.42);
    };
    [0.55, 1.05].forEach((d) => flick(T0 + d));
    flick(cue("s01a", "@remember") + 0.3); flick(cue("s01a", "@galla") + 0.3);
    khata.blink(tl, T0 + 3.0).blink(tl, T0 + 12.5);
    dog.flick(tl, T0 + 5.1);

    // s01a — "Remember this night? … April second." Meera glances up; calendar already shows 2
    const tNight = cue("s01a", "@night");
    m.look(tl, tNight, 0, -3).expr(tl, cue("s01a", "@first"), "happy");
    // "A galla full of notes" — the notes puff up out of the box
    const tG = cue("s01a", "@galla");
    tl.to(galla.notes, { scale: 1.12, svgOrigin: "0 -120", duration: 0.17, ease: K.stepEase(0.17, "power2.out", tG) }, tG);
    tl.to(galla.notes, { scale: 1, svgOrigin: "0 -120", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tG + 0.3) }, tG + 0.3);
    // "and one question" — she tilts her head
    m.headTilt(tl, cue("s01a", "@question"), -5).expr(tl, cue("s01a", "@question"), "puzzled");
    // the three cost slips lift out of the galla and HANG (counted, not paid: no coin leaves)
    slips.forEach((s, i) => {
      const t = cue("s01a", s.w);
      tl.set(s.inner, { opacity: 0 }, T0); tl.set(s.inner, { opacity: 1 }, t - 0.05);
      tl.fromTo(s.pos, { x: GX, y: GY - 90 }, { x: s.x, y: s.y, duration: 0.55, ease: "power2.out", immediateRender: false }, t - 0.05);
      tl.fromTo(s.inner, { scale: 1.07, svgOrigin: O }, { scale: 1, svgOrigin: O, duration: 0.5, ease: "power2.out", immediateRender: false }, t - 0.05);
      tl.to(galla.notes, { scale: 1 - 0.04 * (i + 1), svgOrigin: "0 -120", duration: 0.25, ease: K.stepEase(0.25, "power2.out", t) }, t);
      m.look(tl, t, 6, -2);
    });
    // "profit? Or a loss?" — the two medallions come either side of her head
    L.drop(tl, medUp, cue("s01a", "@profit") - 0.1, { dur: 0.3 });
    L.drop(tl, medDown, cue("s01a", "@loss") - 0.1, { dur: 0.3 });
    m.look(tl, cue("s01a", "@profit"), -4, -4).look(tl, cue("s01a", "@loss"), 4, -4);

    // s01b — "Back then, she had no way to know."
    const tBack = cue("s01b", "@back");
    [medUp, medDown, ...slips.map((s) => s.pos)].forEach((n) => L.lift(tl, n, tBack, { dur: 0.25 }));
    m.expr(tl, tBack, "worried").look(tl, tBack + 0.2, 0, 4);
    L.drop(tl, q, cue("s01b", "@know") - 0.1, { dur: 0.3 });
    L.lift(tl, q, cue("s01b", "@month") - 0.3, { dur: 0.25 });
    // "a whole month of books, and a trial balance that matches"
    const tM = cue("s01b", "@month") - 0.1, tTr = cue("s01b", "@trial") - 0.2;
    m.expr(tl, tM + 0.1, "happy").look(tl, tM, 8, 2);
    books.forEach((b, i) => L.drop(tl, b, tM + i * 0.075, { dur: 0.22 }));
    L.drop(tl, sheet, tTr, { dur: 0.34 });
    totL.to(tl, tTr + 0.25, 136000, 0.8); totR.to(tl, tTr + 0.25, 136000, 0.8);
    K.pulseNode(tl, sheet, cue("s01b", "@matches"), 1.05);
    // "So tonight, Khata opens." — Meera looks at Khata, Khata hops and opens, blank cream pages
    const tTon = cue("s01b", "@tonight"), tK = cue("s01b", "@khata");
    m.look(tl, tTon, 9, -4).headTilt(tl, tTon, 4);
    khata.hop(tl, tK - 0.1, { height: 40 }).expr(tl, tK, "happy");
    L.drop(tl, panel, tOpen - 0.3, { dur: 0.3 });
    khata.open(tl, tOpen - 0.05, 0.5);
    m.expr(tl, tOpen + 0.1, "amazed");
    // exit: Khata snaps shut and the camera rushes into its red cover
    khata.close(tl, tClose - 0.1, 0.3);
    tl.to(cam, { scale: 12, svgOrigin: `${PIVOT[0]} ${PIVOT[1]}`, duration: sc.end - tRush, ease: "power3.in" }, tRush);
    tl.to(plate, { opacity: 1, duration: 0.2, ease: "none" }, sc.end - 0.2);
    m.blinks(tl, T0 + 1.6, tClose, 3.4);
    L.allow(cam);
  };
})();

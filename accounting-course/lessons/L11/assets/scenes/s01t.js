// s01t — Series title sting (4.6 s, no VO; intro_sting music). Lesson 11. Reused shape from L01.
// In:  s01 ends on Khata's red cloth cover growing to fill the frame → the plate bursts past camera.
// Out: Khata's cover swings open; the right page already shows s02's first era (an SVG <use> of #s02-era1);
//      the camera pushes into the page until it exactly fills the frame at the cut → s02 continues.
//      (the page shows s02's first frame via <use href="#s02-first">; s02 hides its initial states with DOM attributes)
(function () {
  window.OWN_SEAM_IN.s01t = true;   // s01 owns the cover grow
  window.OWN_SEAM_IN.s02 = true;    // this scene owns the page push into s02

  const LESSON = "Lesson 11", TITLE_A = "The Trial", TITLE_B = "Balance";

  window.SCENES.s01t = ({ svg, tl, K, sc }) => {
    const C = K.C;
    const BX = 580, BY = 320, BW = 760, BH = 460;                 // the closed book (landscape ledger)
    const PX = 641, PY = 370, PW = 640, PH = 360;                 // 16:9 page window → fills 1920×1080 at ×3
    const PC = [PX + PW / 2, PY + PH / 2];

    const cam = K.g(svg, { id: "s01t-cam" });
    K.wall(cam, C.violet, 810);
    K.table(cam, 790);
    const book = K.g(cam, {});
    K.paper(cam, K.cutEll(960, 800, 430, 22, 2), "#3b2614", { opacity: 0.18 });  // contact shadow (under book)
    cam.appendChild(book);

    // back board + page block
    K.paper(K.shadow(book, 3), K.cutRect(BX - 8, BY - 8, BW + 16, BH + 16, 2.5), C.redDark);
    K.tex(K.shadow(book, 1), K.cutRect(BX + 12, BY + 10, BW - 22, BH - 20, 1.6), "pat-paper");
    // the page window: s02's first era, scaled 1/3
    const clip = K.el("clipPath", { id: "s01t-pageclip" }, svg);
    K.el("rect", { x: PX, y: PY, width: PW, height: PH }, clip);
    const win = K.g(book, { "clip-path": "url(#s01t-pageclip)" });
    K.el("rect", { x: PX, y: PY, width: PW, height: PH, fill: "#e9c88f" }, win);
    K.el("use", { href: "#s02-first", transform: `translate(${PX} ${PY}) scale(${PW / 1920})` }, win);

    // inside lining (revealed as the cover swings past the hinge) — drawn leftwards from the hinge
    const liningPos = K.g(book, { transform: `translate(${BX} ${BY})` });
    const lining = K.g(liningPos, { transform: "scale(0 1)" });
    K.paper(K.shadow(lining, 2), K.cutRect(-BW, -4, BW, BH + 8, 2.2), C.red);
    K.tex(lining, K.cutRect(-BW + 16, 12, BW - 30, BH - 24, 1.4), "pat-paper");
    K.ink(lining, [[-BW + 90, 30], [-BW + 90, BH - 30]], 3, "#e7a49a");

    // the cover (hinge = local x 0)
    const coverPos = K.g(book, { transform: `translate(${BX} ${BY})` });
    const cover = K.g(coverPos, {});
    const cs = K.shadow(cover, 2);
    K.tex(cs, K.cutRect(0, -4, BW, BH + 8, 2.4), "pat-cover");
    K.paper(cover, K.cutRect(0, -4, 64, BH + 8, 1.6), C.redShade, { opacity: 0.85 });           // spine strip
    K.ink(cover, [[96, 28], [BW - 28, 28], [BW - 28, BH - 28], [96, BH - 28], [96, 28]], 3.5, C.gold);
    // Khata's little face on the spine strip (it's Khata's own cover)
    const eyes = K.g(cover, {}), pupils = K.g(cover, {}), lids = K.g(cover, { opacity: 0 });
    [17, 46].forEach((ex) => {
      K.paper(eyes, K.cutEll(ex, 132, 10, 12, 0.6), C.white);
      K.paper(pupils, K.cutEll(ex + 1, 135, 5.5, 5.5, 0.3), C.ink);
      K.paper(lids, K.cutEll(ex, 132, 11, 13, 0.6), C.redShade);
    });
    K.ink(cover, K.arc(32, 158, 9, Math.PI * 0.15, Math.PI * 0.85, 6), 3, C.ink);

    // title pieces (each in its own wrapper so it can pop without fighting the kit's transforms)
    // pop wrapper: positioned at its pivot, content drawn around local (0,0) → scale with svgOrigin "0 0"
    const pop = (fn, ox, oy) => {
      const pos = K.g(cover, { transform: `translate(${ox} ${oy})` });
      const w = K.g(pos, { opacity: 0 });
      fn(K.g(w, { transform: `translate(${-ox} ${-oy})` }));
      return [w, "0 0"];
    };
    const cx = 64 + (BW - 64) / 2;
    const [lessonW, lessonO] = pop((w) => K.label(w, cx, 108, LESSON, { size: 38, bg: C.cream, rot: -2 }), cx, 108);
    const [plateW, plateO] = pop((w) => {
      K.paper(K.shadow(w, 2), K.cutRect(cx - 300, 160, 600, 176, 2.4), C.gold);
      K.ink(w, [[cx - 280, 176], [cx + 280, 176]], 2.5, C.goldDark, { opacity: 0.7 });
      K.ink(w, [[cx - 280, 320], [cx + 280, 320]], 2.5, C.goldDark, { opacity: 0.7 });
      K.text(w, cx, 218, TITLE_A, { size: 62, weight: 800, color: C.redDark }).setAttribute("data-layout-allow-overlap", "true");
      K.text(w, cx, 292, TITLE_B, { size: 74, weight: 800, color: C.redDark }).setAttribute("data-layout-allow-overlap", "true");
    }, cx, 248);
    const series = K.text(cover, cx, BH - 66, window.SERIES_NAME(), { size: 40, font: "title", color: C.gold, weight: 400 });
    series.setAttribute("opacity", "0");
    const [spark] = pop((w) => K.sparkle(w, cx + 290, 172, 26, C.cream), cx + 290, 172);

    // Khata's red cover from s01 (full frame), bursting past camera
    const plate = K.g(svg, {});
    K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.red }, plate);
    K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "url(#pat-cover)", style: "mix-blend-mode:multiply", opacity: 0.8 }, plate);

    // ======================================================================== timeline
    const T0 = sc.start;
    tl.fromTo(plate, { opacity: 1, scale: 1, svgOrigin: "960 540" }, { opacity: 0, scale: 2.4, svgOrigin: "960 540", duration: 0.32, ease: "power2.out" }, T0);
    tl.fromTo(book, { scale: 0.84, y: -26, svgOrigin: "960 560" }, { scale: 1, y: 0, svgOrigin: "960 560", duration: 0.55, ease: "power2.out" }, T0);
    const popIn = (w, o, t) => tl.fromTo(w, { opacity: 0, scale: 0.75, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: 0.3, ease: K.stepEase(0.3, "power2.out", t) }, t);
    popIn(lessonW, lessonO, T0 + 0.55);
    popIn(plateW, plateO, T0 + 0.8);
    tl.fromTo(series, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, T0 + 1.15);
    popIn(spark, "0 0", T0 + 1.1);
    tl.to(spark, { opacity: 0, scale: 0.3, svgOrigin: "0 0", duration: 0.2, ease: "power2.in" }, T0 + 1.9);
    // Khata's eyes: look at the title, blink, look back at us
    tl.to(pupils, { x: 3, y: 2, duration: 0.17, ease: K.stepEase(0.17, "power2.out", T0 + 1.3) }, T0 + 1.3);
    tl.set(lids, { opacity: 1 }, T0 + 2.0); tl.set(lids, { opacity: 0 }, T0 + 2.0 + 2 / 15);
    tl.to(pupils, { x: 0, y: 0, duration: 0.17, ease: K.stepEase(0.17, "power2.out", T0 + 2.4) }, T0 + 2.4);

    // the cover swings open on its hinge (smooth — it's an object flight), lining unfolds past the hinge
    const tSwing = T0 + 2.95;
    tl.to(cover, { scaleX: 1.02, svgOrigin: "0 0", duration: 0.12, ease: "power2.out" }, tSwing - 0.12);  // anticipation
    tl.to(cover, { scaleX: 0, svgOrigin: "0 0", duration: 0.26, ease: "power2.in" }, tSwing);
    tl.set(cover, { autoAlpha: 0 }, tSwing + 0.26);
    tl.to(lining, { scaleX: 1, svgOrigin: "0 0", duration: 0.3, ease: "power2.out" }, tSwing + 0.26);

    // push into the page: the 16:9 window grows to exactly fill the frame at the cut
    const tPush = tSwing + 0.72;
    tl.to(cam, { scale: 1920 / PW, x: 960 - PC[0], y: 540 - PC[1], svgOrigin: `${PC[0]} ${PC[1]}`,
      duration: sc.end - tPush, ease: "power2.in" }, tPush);
  };
})();

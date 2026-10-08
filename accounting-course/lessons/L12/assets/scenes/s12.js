// s12 — Next time. The film strip runs out on its last frame (Net profit ₹24,700): its tail flaps free once on "the movie is over". Khata lifts a paper instant camera toward us on "take the photo";
// 2-frame white flash; the red "13" cover slams shut over the frame → s13.
(function () {
  window.OWN_SEAM_IN.s13 = true;   // the "13" cover slam owns the seam into the end card

  window.SCENES.s12 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    K.wall(svg, C.violet, 930); K.table(svg, 930);
    const SX = 1380, SY = 466;
    const film = L.film(svg, { x: SX, y: SY, filled: true, values: { 2: 40000, 8: 24700 } });
    // the tail: a loose length of film hanging from the strip's last frame (hinge = its top-left)
    const tailPos = K.g(svg, { transform: `translate(${SX - film.W / 2} ${SY + film.H / 2 - 4})` });
    const tail = K.g(tailPos, {});
    K.paper(K.shadow(tail, 2), K.cutRect(0, 0, film.W, 120, 1.6, 24), "#2a2530");
    for (let i = 0; i < Math.floor(film.W / 36); i++) K.paper(tail, K.cutRect(10 + i * 36, 12, 16, 22, 0.5, 8), C.cream);
    const khata = K.khataRig(svg, 560, 1010, 0.85, { expr: "awake" });
    // paper instant camera in Khata's right hand
    const cam = K.g(khata.handAnchor("R"), {});
    {
      K.paper(K.shadow(cam, 2), K.cutRect(-62, -60, 124, 92, 2, 16), C.cream);
      K.paper(cam, K.cutRect(-62, -60, 124, 26, 1.2, 14), C.coral);
      K.paper(K.shadow(cam, 1), K.cutEll(0, -6, 30, 30, 0.8), "#2b2233"); K.paper(cam, K.cutEll(0, -6, 19, 19, 0.6), C.sky);
      K.paper(cam, K.cutRect(34, -52, 22, 14, 0.6, 8), C.gold);
    }
    const flash = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#ffffff", opacity: 0 }, svg);
    const cover = L.cover13(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 1.2);
    // "the movie is over" — the tail flaps free (one move, then still)
    const tOver = cue("s12", "@over");
    tl.fromTo(tail, { rotation: 0 }, { rotation: 24, svgOrigin: O, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tOver), immediateRender: false }, tOver);
    tl.to(tail, { rotation: 12, svgOrigin: O, duration: 0.4, ease: K.stepEase(0.4, "power2.inOut", tOver + 0.3) }, tOver + 0.3);
    khata.expr(tl, tOver, "wow");
    // "take the photo" — Khata raises the camera toward us; flash
    const tTake = cue("s12", "@take");
    khata.arm(tl, tTake - 0.5, "R", 120, 0.35).expr(tl, tTake - 0.3, "happy");
    const tFl = tTake + 0.55;
    tl.set(flash, { opacity: 0.4 }, tFl); tl.set(flash, { opacity: 0 }, tFl + 2 / 15);
    // the "13" cover slams shut
    const tLand = sc.end - 0.18;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
    L.allow(svg);
  };
})();

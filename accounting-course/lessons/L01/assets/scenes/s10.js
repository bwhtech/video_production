// s10 · Next time — Meera holds ₹50,000 over the open galla; freeze on "whose"; Khata's cover slams shut with a "2".
// The cover is drawn by DH.cover() and re-used full-frame at the start of s11 (hand-authored seam).
(function () {
  // full-frame red cloth ledger cover with a gold "2"
  window.DH.cover = (parent, K) => {
    const C = K.C;
    const n = window.DH.node(parent, 0, 0);
    n.outer.setAttribute("data-layout-allow-overlap", "true");   // the cover deliberately slams down over the scene
    const g = K.shadow(n.inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(n.inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);      // spine-side string
    K.paper(n.inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);        // tie across
    K.ink(n.inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);   // knot
    K.paper(K.shadow(n.inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(n.inner, 800, 545, "2", { size: 300, weight: 800, color: C.gold });
    K.text(n.inner, 800, 205, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });   // own zone above the "2" box
    return n;
  };

  window.OWN_SEAM_IN.s11 = true;

  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0";
    const cam = K.g(svg, {});
    K.wall(cam, C.navy); K.table(cam, 860);
    K.paper(K.shadow(cam, 1), K.cutEll(1760, 140, 62, 62, 2), C.cream);
    K.stringLights(cam, -20, 1940, 40, 90, 14);

    K.crate(cam, 1180, 905, 380, 150);
    const gl = K.galla(cam, 1180, 757, 1.55, { open: false, overflow: true });
    const m = K.meera(cam, 600, 1000, 0.98, { expr: "happy", aR: [20, 70] });
    const hold = DH.node(m.handAnchor("R"), 0, 0);
    K.bundle(hold.inner, 10, -10, 0.9, -8);
    const tag = DH.node(cam, 1070, 400);          // own zone: clear of the cover's "Lesson" / "2" text boxes (x≈700–900)
    K.label(tag.inner, 0, 0, "₹50,000", { size: 60, bg: C.saffron, rot: -4 });
    const q = DH.node(cam, 760, 300);
    K.qmark(q.inner, 0, 0, 1.6, C.saffron);

    const cover = DH.cover(svg, K);

    // ---------------- timing ----------------
    const t0 = sc.start;
    const tOpens = cue("s10", "@opens"), tFifty = cue("s10", "@fifty"), tSav = cue("s10", "@savings");
    const tWhose = cue("s10", "@whose"), tLand = sc.end - 0.18;

    m.jitter(tl, t0, sc.end + 0.6); m.blink(tl, t0 + 0.9);
    m.look(tl, t0 + 0.3, 8, 2);
    // "opens the galla"
    gl.open(tl, tOpens);
    m.expr(tl, tOpens + 0.1, "grin");
    // "fifty thousand rupees" — the bundle appears in her hand, she reaches over the galla
    tl.set(hold.inner, { autoAlpha: 0 }, 0);
    DH.pop(tl, hold.inner, tFifty - 0.1, { from: 0.5 });
    DH.pop(tl, tag.inner, tFifty + 0.1, { from: 0.6 });
    m.arm(tl, tFifty + 0.35, "R", 72, 18, 0.45);
    // "of her own savings" — she hesitates
    m.expr(tl, tSav - 0.2, "thinking").headTilt(tl, tSav - 0.1, -6).look(tl, tSav, 9, -4);
    // "whose money is it now?" — freeze: push in, puzzled, question mark
    tl.to(cam, { scale: 1.06, svgOrigin: "1000 640", duration: 0.7, ease: "power2.out" }, tWhose - 0.1);
    m.expr(tl, tWhose, "puzzled").look(tl, tWhose + 0.1, 0, -9);
    tl.set(q.inner, { autoAlpha: 0 }, 0);
    DH.pop(tl, q.inner, tWhose + 0.2, { from: 0.4, rot: 12 });
    // cover slams shut over everything (continues as the first frame of s11)
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    // the cover lands flat (no squash / settle wobble)
  };
})();

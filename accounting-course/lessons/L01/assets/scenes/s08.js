// s08 · Recap — three tiles light up with the narration; Khata thumbs-up. Tiles flip into s09's question cards.
(function () {
  window.S89 = { tileX: [420, 960, 1500], tileY: 450, tileW: 480, tileH: 380, khata: [960, 1045, 0.55], wall: "sky" };

  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, L = window.S89, O = "0 0";
    K.wall(svg, C[L.wall]); K.table(svg, 860);

    const tile = (i) => {
      const n = DH.node(svg, L.tileX[i], L.tileY);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-L.tileW / 2, -L.tileH / 2, L.tileW, L.tileH, 2.4, 26), "pat-paper");
      return n;
    };
    const tiles = [0, 1, 2].map(tile);

    // tile 1 — the movie (P&L)
    K.filmStrip(tiles[0].inner, 0, -18, 400, 150, ["coffee", "coins", "calendar"], -3);
    const play = DH.node(tiles[0].inner, 0, 110);
    K.medallion(play.inner, 0, 0, 34, "play", C.saffron, "#ffffff");
    // tile 2 — the photo (Balance Sheet)
    K.polaroid(tiles[1].inner, 0, -6, 230, 262, 4, (pg, x, y, w, h) => {
      K.medallion(pg, x + w * 0.3, y + h * 0.52, 32, "package");
      K.medallion(pg, x + w * 0.72, y + h * 0.52, 32, "hand-coins");
    });
    const flash = K.el("rect", { x: -L.tileW / 2 + 10, y: -L.tileH / 2 + 10, width: L.tileW - 20, height: L.tileH - 20, rx: 18, fill: "#ffffff", opacity: 0 }, tiles[1].inner);
    // tile 3 — Meera | the stall: two separate "people"
    const t3 = tiles[2].inner;
    for (let i = 0; i < 9; i++) K.ink(t3, [[0, -150 + i * 34], [0, -134 + i * 34]], 5, "#8a7d6c");
    const m = K.meera(t3, -112, 160, 0.42, { expr: "happy" });
    const st = K.stall(t3, 112, 160, 0.34, { face: true, faceExpr: "happy", galla: false });

    const labels = [["Profit & Loss", C.saffron], ["Balance Sheet", C.dr], ["Business entity", C.violet]].map(([t, bg], i) => {
      const n = DH.node(svg, L.tileX[i], L.tileY + L.tileH / 2 + 50);
      K.label(n.inner, 0, 0, t, { size: 40, bg });
      return n;
    });

    // Khata (same spot + size as in s09 so the hand-off is seamless)
    const [kx, ky, ks] = L.khata;
    const k = K.khataRig(svg, kx, ky, ks, { expr: "awake" });
    const thumb = DH.node(svg, kx + 165, ky - 300);
    K.medallion(thumb.inner, 0, 0, 40, "thumbs-up", C.leaf, "#ffffff");

    // ---------------- timing ----------------
    const t0 = sc.start;
    const tTwo = cue("s08", "@two"), tMovie = cue("s08", "@movie"), tPhoto = cue("s08", "@photo");
    const tBiz = cue("s08", "@business"), tPerson = cue("s08", "@person");
    const tFlip = sc.end - 0.26;

    k.jitter(tl, t0, sc.end + 0.6);
    tiles.forEach((n, i) => {
      DH.pop(tl, n.inner, t0 + 0.32 + i * 0.08, { from: 0.7, rot: 0 });
      tl.to(n.outer, { opacity: 0.55, duration: 0.01 }, t0 + 0.32);
    });
    labels.forEach((n) => tl.set(n.inner, { autoAlpha: 0 }, 0));

    // "two questions" — the two report tiles step forward
    [0, 1].forEach((i) => tl.to(tiles[i].outer, { opacity: 0.8, duration: 0.2 }, tTwo + i * 0.1));
    // "the movie…"
    tl.to(tiles[0].outer, { opacity: 1, duration: 0.15 }, tMovie - 0.05);
    DH.pulse(tl, tiles[0].inner, tMovie - 0.05, 1.07);
    DH.pulse(tl, play.inner, tMovie + 0.25, 1.25);
    DH.pop(tl, labels[0].inner, tMovie + 0.2, { from: 0.6 });
    // "the photo…"
    tl.to(tiles[1].outer, { opacity: 1, duration: 0.15 }, tPhoto - 0.05);
    DH.pulse(tl, tiles[1].inner, tPhoto - 0.05, 1.07);
    tl.to(flash, { opacity: 0.85, duration: 0.05 }, tPhoto); tl.to(flash, { opacity: 0, duration: 0.35, ease: "power2.out" }, tPhoto + 0.07);
    DH.pop(tl, labels[1].inner, tPhoto + 0.2, { from: 0.6 });
    // "…the business is its own person"
    tl.to(tiles[2].outer, { opacity: 1, duration: 0.15 }, tBiz - 0.05);
    DH.pulse(tl, tiles[2].inner, tBiz - 0.05, 1.07);
    m.wave(tl, tBiz + 0.1, "R", 2);
    st.face.expr(tl, tBiz + 0.35, "wow").expr(tl, tBiz + 1.0, "happy");
    DH.pop(tl, labels[2].inner, tBiz + 0.2, { from: 0.6 });
    // Khata: thumbs-up
    k.look(tl, tMovie, -9, -6).look(tl, tPhoto, 0, -8).look(tl, tBiz, 9, -6).look(tl, tPerson, 0, 0);
    k.expr(tl, tPerson, "happy").hop(tl, tPerson - 0.05, { height: 50 }).arm(tl, tPerson, "R", 120);
    DH.pop(tl, thumb.inner, tPerson + 0.15);

    // hand-off: labels + thumb tuck away, tiles flip edge-on (s09's cards flip open from edge-on)
    labels.forEach((n, i) => DH.out(tl, n.inner, tFlip - 0.35 + i * 0.04));
    DH.out(tl, thumb.inner, tFlip - 0.3);
    k.arm(tl, tFlip - 0.3, "R", 20).expr(tl, tFlip - 0.3, "awake");
    tiles.forEach((n) => {
      tl.to(n.outer, { opacity: 1, duration: 0.01 }, tFlip - 0.02);
      tl.to(n.inner, { scaleX: 0.02, svgOrigin: O, duration: 0.26, ease: "power2.in" }, tFlip);
    });
  };
})();

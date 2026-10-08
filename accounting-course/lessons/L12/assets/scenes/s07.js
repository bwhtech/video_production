// s07 — Read it like a story. The finished 9-frame strip (centre); a small paper projector at left throws a flat cream beam that steps down it as each line is read
// (Sales → supplies → the five running costs → Net profit). Then a ₹100 coin splits into 20 / 31 / 49 slices; only the ₹49 slice (Meera) stays lit.
// Exit: default wipe (s08's cinema door).
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    L.stage(svg, C.leaf, 930);
    const SX = 1010, SY = 540;
    // ---- projector (left): body + two reels + lens + stand
    const PX = 300, PY = 560, LX = PX + 190, LY = PY + 6;
    const proj = L.node(svg, PX, PY); L.hide(proj);
    {
      K.ink(proj, [[-70, 80], [-120, 440]], 12, "#3b3238"); K.ink(proj, [[70, 80], [120, 440]], 12, "#3b3238");
      K.paper(K.shadow(proj, 2), K.cutRect(-130, -85, 260, 170, 2, 24), "#5a5160");
      K.paper(proj, K.cutRect(-118, -73, 236, 40, 1, 22), "#6e6574");
      [-62, 62].forEach((rx) => { K.paper(K.shadow(proj, 1), K.cutEll(rx, -128, 62, 62, 1.6), "#3b3238"); K.paper(proj, K.cutEll(rx, -128, 40, 40, 1.2), C.cream);
        for (let k = 0; k < 4; k++) { const a = (k / 4) * Math.PI * 2; K.paper(proj, K.cutEll(rx + Math.cos(a) * 24, -128 + Math.sin(a) * 24, 9, 9, 0.5), "#3b3238"); } });
      K.paper(K.shadow(proj, 1), K.cutRect(128, -36, 56, 72, 1.2, 14), "#3b3238");
      K.paper(proj, K.cutEll(184, 0, 14, 28, 0.8), C.cream);
      K.paper(proj, K.cutEll(-84, 40, 13, 13, 0.6), C.red);
    }
    // ---- beam (behind the strip) + highlight ring (above it); both driven by one proxy
    const beam = K.el("path", { d: "", fill: C.cream, opacity: 0 }, svg);
    const film = L.film(svg, { x: SX, y: SY, filled: true, values: { 2: 40000, 8: 24700 } });
    const ring = K.el("path", { d: "", fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, svg);
    const stripL = SX - film.W / 2, stripR = SX + film.W / 2;
    const P = { y: SY - 400, h: 90 };
    const draw = () => {
      const y0 = P.y - P.h / 2, y1 = P.y + P.h / 2;
      beam.setAttribute("d", `M${LX},${LY - 14} L${stripL + 40},${y0} L${stripL + 40},${y1} L${LX},${LY + 14} Z`);
      ring.setAttribute("d", K.cutRect(SX - film.cw / 2 - 3, y0 - 3, film.cw + 6, P.h + 6, 0.8, 22));
    };
    draw();
    const stop = (t, i0, i1, dur = 0.35) => {
      const a = SY + film.fr[i0].cy, b = SY + film.fr[i1].cy;
      tl.to(P, { y: (a + b) / 2, h: (b - a) + film.ch, duration: dur, ease: "power2.inOut", onUpdate: draw }, t);
    };
    // ---- coin (right)
    const CX = 1620, CY = 540, R = 165;
    const coin = L.node(svg, CX, CY); L.hide(coin);
    const A0 = (-98.2 * Math.PI) / 180, tot = Math.PI * 2;
    const spec = [["49", 0.49, C.cream, "user"], ["31", 0.31, C.saffron, "store"], ["20", 0.2, C.sky, "milk"]];
    let a = A0;
    const slices = spec.map(([k, f, col, ic]) => {
      const a1 = a + tot * f, mid = (a + a1) / 2;
      const pts = [[0, 0], ...K.arc(0, 0, R, a, a1, Math.max(8, Math.round(f * 40)))];
      const sg = K.g(coin, {}), body = K.g(sg, {});
      K.paper(K.shadow(body, 1), K.cutPoly(pts, 1.2, 18), col);
      K.el("path", { d: K.pts2d(pts), fill: "none", stroke: C.goldDark, "stroke-width": 5, "stroke-linejoin": "round" }, body);
      const s = { k, mid, g: sg, body };
      a = a1; return s;
    });
    const coinLabel = L.node(coin, 0, 0); K.text(coinLabel, 0, 0, "₹100", { size: 60, weight: 800, color: C.ink });
    const chipAt = { "20": [1500, 300], "31": [1500, 800], "49": [1760, 290] };
    const chips = slices.map((s) => {
      const [x, y] = chipAt[s.k]; const n = L.node(svg, x, y); L.hide(n);
      const b = K.g(n, {}); K.tex(K.shadow(b, 1), K.cutRect(-100, -42, 200, 84, 1.4, 20), "pat-paper");
      const ic = spec.find((q) => q[0] === s.k)[3];
      if (ic === "user") { K.tex(b, K.cutEll(-52, 0, 31, 31, 0.6), "pat-paper"); const fa = K.g(b, { transform: "translate(-52 0)" }); K.faceArt(fa, "meera", 28); }
      else K.medallion(b, -52, 0, 31, ic);
      K.text(b, 28, 3, "₹" + s.k, { size: 46, weight: 800 });
      return { n, s };
    });

    // ======================================================================== timeline
    L.drop(tl, proj, T0 + 0.7, { dur: 0.4 });
    tl.set(film.n, { opacity: 1 }, T0);
    const tFifty = cue("s07", "@fifty") - 0.1;
    tl.set(beam, { opacity: 0.5 }, tFifty); tl.set(ring, { opacity: 1 }, tFifty);
    stop(tFifty, 0, 0, 0.3);
    stop(cue("s07", "@ten") - 0.1, 1, 1);
    stop(cue("s07", "@fifteen") - 0.1, 3, 7, 0.5);
    stop(cue("s07", "@net") - 0.25, 8, 8);
    K.pulseNode(tl, film.fr[8].c, cue("s07", "@profit") + 0.1, 1.05);
    tl.to([beam, ring], { opacity: 0, duration: 0.3 }, cue("s07", "@hundred", 2) - 0.2);
    // coin: "Out of every hundred rupees of chai" → ₹100 coin → splits 20 / 31 / 49 → only ₹49 stays lit
    const tC = cue("s07", "@hundred", 2) - 0.1;
    L.drop(tl, coin, tC, { dur: 0.4 });
    const tSplit = tC + 1.3;
    tl.to(coinLabel, { opacity: 0, duration: 0.2 }, tSplit - 0.1);
    slices.forEach((s) => tl.to(s.g, { x: Math.cos(s.mid) * 30, y: Math.sin(s.mid) * 30, duration: 0.5, ease: "power2.out" }, tSplit));
    chips.forEach((c, i) => L.drop(tl, c.n, tSplit + 0.25 + i * 0.12, { dur: 0.3 }));
    const tKeep = cue("s07", "@forty-nine");
    chips.forEach((c) => { if (c.s.k !== "49") { L.dim(tl, c.n, tKeep, 0.4, 0.3); L.dim(tl, c.s.g, tKeep, 0.35, 0.3); } });
    K.pulseNode(tl, chips[0].n, tKeep + 0.05, 1.08);
    L.allow(svg);
  };
})();

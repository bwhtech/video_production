// s09 · Your Turn — the recap tiles flip open into three question cards; Khata holds up a "?" card.
(function () {
  window.OWN_SEAM_IN.s09 = true; // s08's tiles flip edge-on → these cards flip open in the same spots

  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, L = window.S89, O = "0 0";
    K.wall(svg, C[L.wall]); K.table(svg, 860);

    const cards = [0, 1, 2].map((i) => {
      const n = DH.node(svg, L.tileX[i], L.tileY);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-L.tileW / 2, -L.tileH / 2, L.tileW, L.tileH, 2.4, 26), "pat-paper");
      // number badge, top-left
      K.paper(K.shadow(n.inner, 1), K.cutEll(-L.tileW / 2 + 52, -L.tileH / 2 + 52, 34, 34, 1.4), C.coral);
      K.text(n.inner, -L.tileW / 2 + 52, -L.tileH / 2 + 55, String(i + 1), { size: 46, weight: 800, color: "#ffffff" });
      return n;
    });
    const content = cards.map((c) => DH.node(c.inner, 0, 22));
    content.forEach((c) => c.outer.setAttribute("transform", "translate(0 22) scale(1.18)"));

    // card 1 — Meera's personal phone bill paid from her own account: does it belong in the stall's books?
    {
      const g1 = content[0].inner;
      K.faceTag(g1, -128, -70, "meera", 1.25, 0);
      K.medallion(g1, -128, 30, 40, "wallet", C.cream);
      K.curveArrow(g1, [[-70, -10], [-20, -40], [30, -30]], C.ink, 9);
      K.medallion(g1, 96, -26, 54, "smartphone", C.white);
      K.slip(g1, 140, 54, 0.6, 8, "receipt");
      const st = K.g(g1, { transform: "translate(-20 150) scale(0.18)" });
      K.stall(st, 0, 0, 1, { noProps: true });
      K.qmark(g1, 46, 120, 0.75, C.dr);
    }
    // card 2 — a customer asks the price, then walks away
    const walker = DH.node(content[1].inner, -10, 30);
    K.medallion(walker.inner, 0, 0, 62, "user-round", C.white);
    const bubble = DH.node(content[1].inner, 60, -96);
    K.label(bubble.inner, 0, 0, "₹ ?", { size: 46, bg: "paper", rot: -4 });
    K.tumbler(content[1].inner, -128, 96, 1.5);
    // card 3 — which one is the photo?
    {
      const g3 = content[2].inner;
      K.filmStrip(g3, -112, 0, 190, 110, ["coffee", "coins"], -6);
      K.polaroid(g3, 120, 0, 140, 166, 6, (pg, x, y, w, h) => K.medallion(pg, x + w / 2, y + h / 2, 26, "package"));
      K.qmark(g3, 4, 30, 1.05, C.cr);
    }

    // Khata, holding up a "?" card
    const [kx, ky, ks] = L.khata;
    const k = K.khataRig(svg, kx, ky, ks, { expr: "awake" });
    const sign = DH.node(svg, kx + 150, ky - 300);
    K.tex(K.shadow(sign.inner, 1), K.cutRect(-56, -70, 112, 140, 1.8, 18), "pat-paper");
    K.qmark(sign.inner, 2, 22, 1.25, C.coral);
    const cal = DH.node(svg, kx - 230, ky - 130);
    K.medallion(cal.inner, 0, 0, 44, "calendar", C.white);
    K.text(cal.inner, 0, 8, "2", { size: 30, weight: 800 });

    // ---------------- timing ----------------
    const t0 = sc.start;
    const tTurn = cue("s09", "@turn"), tOne = cue("s09", "@one"), tTwo = cue("s09", "@two"), tThree = cue("s09", "@three", 2); // 1st "Three" is "Three quick ones"
    const tBooks = cue("s09", "@books"), tAway = cue("s09", "@away"), tPhoto = cue("s09", "@photo"), tAns = cue("s09", "@answers");

    k.jitter(tl, t0, sc.end + 0.6);
    // flip open from edge-on (continues s08's flip)
    cards.forEach((n) => {
      tl.set(n.inner, { scaleX: 0.02, svgOrigin: O }, 0);
      tl.to(n.inner, { scaleX: 1, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t0);
    });
    content.forEach((c) => tl.set(c.inner, { autoAlpha: 0 }, 0));

    // "Your turn." — Khata raises the "?" card
    tl.set(sign.inner, { autoAlpha: 0 }, 0);
    k.arm(tl, tTurn - 0.15, "R", 125).expr(tl, tTurn - 0.15, "happy");
    DH.pop(tl, sign.inner, tTurn - 0.05, { from: 0.5 });

    const focus = (i, t) => cards.forEach((n, j) => tl.to(n.outer, { opacity: j === i ? 1 : 0.5, duration: 0.25 }, t));
    const reveal = (i, t) => { DH.pop(tl, content[i].inner, t, { from: 0.7, rot: 0 }); DH.pulse(tl, cards[i].inner, t, 1.05); focus(i, t); };
    reveal(0, tOne);
    k.look(tl, tOne, -9, -6);
    DH.pulse(tl, content[0].inner, tBooks - 0.1, 1.06);
    reveal(1, tTwo);
    k.look(tl, tTwo, 0, -8);
    tl.to(walker.outer, { x: 120, duration: 0.9, ease: "power1.inOut" }, tAway - 0.3);
    tl.to(walker.inner, { y: -8, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, tAway - 0.3);
    DH.out(tl, bubble.inner, tAway + 0.2);
    reveal(2, tThree);
    k.look(tl, tThree, 9, -6);
    DH.pulse(tl, content[2].inner, tPhoto, 1.06);

    // "Answers at the start of the next lesson." — all cards back, calendar flips to lesson 2
    cards.forEach((n) => tl.to(n.outer, { opacity: 1, duration: 0.3 }, tAns - 0.1));
    k.look(tl, tAns, -9, 2).expr(tl, tAns, "wink");
    tl.set(cal.inner, { autoAlpha: 0 }, 0);
    tl.set(cal.inner, { autoAlpha: 1, scaleX: 0.02, svgOrigin: O }, tAns);
    tl.to(cal.inner, { scaleX: 1, svgOrigin: O, duration: 0.3, ease: "power2.out" }, tAns);
  };
})();

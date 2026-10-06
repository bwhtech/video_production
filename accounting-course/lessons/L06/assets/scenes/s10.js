// s10 — Recap. Three icon-only paper tiles, lit one at a time as the VO names them (the others rest at 70 %):
//   (1) Khata's pages: blue left `Dr` ← → orange right `Cr`   (2) the home-side rule (↑ → pins, ↓ → the other side) with the DEAD CLIC strip stuck under it
//   (3) the Bank's own ledger with the SMS card docked under it.  On "bank's books" Khata flaps a thumbs-up (cover flap).
// Also hosts two small helpers for the tail: L6.cover (Khata's "7" cover, used by s12 + s13) and L6.push (scale-only camera push).
// Out: default torn-paper wipe into s11.
(function () {
  // ledger cover (red cloth, gold number) — full frame; `outer` carries a transform-free wrapper for flights
  L6.cover = (K, parent, num) => {
    const C = K.C, outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, String(num), { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
  // scale-only camera push about a point (never mix x/y with scale+svgOrigin in one tween — GSAP quirk)
  L6.push = (tl, cam, t, dur, org, s0, s1, ease = "none") =>
    tl.fromTo(cam, { scale: s0, svgOrigin: org }, { scale: s1, svgOrigin: org, duration: dur, ease, immediateRender: false }, t);

  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L6.stage(K, svg, C.teal, 880);
    L6.cal(K, svg, 20);
    const XS = [330, 960, 1590], TY = 480;
    const mkTile = (x) => {
      const r = L6.rig(K, svg, x, TY); L6.hide(r.inner);
      K.tex(K.shadow(r.inner, 2), K.cutRect(-260, -270, 520, 540, 2, 26), "pat-paper");
      return r;
    };
    const T1 = mkTile(XS[0]), T2 = mkTile(XS[1]), T3 = mkTile(XS[2]);
    const part = (tile, x, y, s = 1) => L6.hide(L6.node(K, tile.inner, x, y, s));

    // ---- tile 1: Khata's two pages, Dr ← · → Cr
    const mk = K.khataRig(T1.inner, 0, 150, 0.46, { open: true, expr: "happy" });
    gsap.set(mk.tints.L, { opacity: 0.9 }); gsap.set(mk.tints.R, { opacity: 0.9 });
    const aL = part(T1, -105, -105), aR = part(T1, 105, -105), dr = part(T1, -105, -185), cr = part(T1, 105, -185);
    L6.arrow(K, aL, 0, 0, "left", C.dr, 120, 38); L6.arrow(K, aR, 0, 0, "right", C.cr, 120, 38);
    L6.chip(K, dr, "Dr", { size: 60, bg: C.dr, w: 130, h: 80 }); L6.chip(K, cr, "Cr", { size: 60, bg: C.cr, w: 130, h: 80 });

    // ---- tile 2: the rule (↑ → home-side pins · ↓ → the other side) + the DEAD CLIC strip
    const rule = L6.ruleCard(K, L6.node(K, T2.inner, 0, -60, 0.95), 0, 0); L6.hide(rule.n);
    gsap.set(rule.r1, { opacity: 0 }); gsap.set(rule.r2, { opacity: 0 });
    const strip = [["D", C.dr, -1], ["E", C.dr, -1], ["A", C.dr, -1], ["D", C.dr, -1], ["C", C.cr, 1], ["L", C.cr, 1], ["I", C.cr, 1], ["C", C.cr, 1]].map(([ch, col, sd], i) => {
      const x = i < 4 ? -210 + i * 56 : 42 + (i - 4) * 56;
      const n = part(T2, x, 175, 0.95); L6.letterTile(K, n, ch, col); return n;
    });
    const stripBar = part(T2, 0, 218); K.paper(stripBar, K.cutRect(-236, -4, 472, 8, 0.5, 14), C.brass);

    // ---- tile 3: the Bank's own ledger, the SMS card docked under it
    const ledN = L6.hide(L6.node(K, T3.inner, 0, -30, 0.5)); L6.ledger(K, ledN, 0, 0, 1);
    const sms = part(T3, 0, 130); K.smsCard(sms, 0, 0, 330, 220, { kind: "CREDITED", amount: "₹15,000" });
    const crT = part(T3, 120, 215); L6.chip(K, crT, "Cr", { size: 48, bg: C.cr, w: 100, h: 64 });

    const khata = K.khataRig(svg, 1730, 1050, 0.55, { expr: "awake" });
    const flapPos = K.g(svg, { transform: "translate(1730 800)" }), flap = K.g(flapPos, {});     // the thumbs-up (cover flap)
    L6.hide(flapPos); K.medallion(flap, 0, 0, 52, "thumbs-up", C.leaf, C.white);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2.2).blink(tl, T0 + 7.0);
    const dim = (n, t) => tl.to(n, { opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, t);
    // "Debit is left, credit is right." — tile 1
    const tD = cue("s10", "@debit"), tC = cue("s10", "@credit");
    L6.drop(tl, K, T1.inner, tD - 0.25, { dur: 0.4 });
    L6.drop(tl, K, aL, tD + 0.05, { dur: 0.3 }); L6.drop(tl, K, dr, tD + 0.2, { dur: 0.3 });
    L6.drop(tl, K, aR, tC + 0.05, { dur: 0.3 }); L6.drop(tl, K, cr, tC + 0.2, { dur: 0.3 });
    mk.look(tl, tD, -8, 0).look(tl, tC, 8, 0).look(tl, tC + 0.8, 0, 0);
    // "Grow an account on its home side, shrink it on the other." — tile 2
    const tG = cue("s10", "@grow"), tS = cue("s10", "@shrink");
    L6.drop(tl, K, T2.inner, tG - 0.25, { dur: 0.4 }); dim(T1.inner, tG + 0.15);
    K.dropIn(tl, rule.n, tG - 0.05, { dur: 0.3 }); tl.set(rule.r1, { opacity: 1 }, tG); tl.set(rule.r2, { opacity: 0 }, 0);
    tl.set(rule.r2, { opacity: 1 }, tS - 0.05); K.pulseNode(tl, rule.r2, tS, 1.06);
    strip.forEach((n, i) => L6.drop(tl, K, n, cue("s10", "@other") - 0.15 + i * 0.07, { dur: 0.25 }));
    L6.drop(tl, K, stripBar, cue("s10", "@other") + 0.45, { dur: 0.25 });
    // "And the bank's SMS speaks from the bank's books." — tile 3
    const tSms = cue("s10", "@sms"), tBk = cue("s10", "@books");
    L6.drop(tl, K, T3.inner, tSms - 0.35, { dur: 0.4 }); dim(T2.inner, tSms + 0.05);
    K.dropIn(tl, ledN, tSms - 0.1, { dur: 0.35 }); K.dropIn(tl, sms, tSms + 0.25, { dur: 0.35 });
    K.dropIn(tl, crT, tBk - 0.2, { dur: 0.3 });
    // everything lights once, then Khata's thumbs-up
    tl.to(T1.inner, { opacity: 1, duration: 0.3 }, tBk + 0.3); tl.to(T2.inner, { opacity: 1, duration: 0.3 }, tBk + 0.3);
    khata.hop(tl, tBk, { height: 40 }); khata.expr(tl, tBk, "happy");
    K.dropIn(tl, flapPos, tBk + 0.15, { dur: 0.3 });
    K.liftOff(tl, flapPos, tBk + 1.5, { dur: 0.25 });
    L6.allow(svg);
  };
})();

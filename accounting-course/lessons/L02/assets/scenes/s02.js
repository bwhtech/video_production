// s02 — "Last time": L1's three Your-Turn cards come back and flip to their answers.
// In : s01t's cover swings open onto this scene — the first frame is #s02-era1 (static, set by DOM attributes only).
// Out: the Balance-Sheet polaroid flies to centre and grows until its photo window (16:9) IS the frame; inside the window
//      is #s03-first (s03's opening frame), so s03 continues from an identical picture.
(function () {
  window.OWN_SEAM_IN.s02 = true;   // s01t owns the page push into s02

  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0";
    const era1 = K.g(svg, { id: "s02-era1" });
    K.wall(era1, C.cream, 860);
    // set dressing (tone-on-tone): a darker-cream pinboard panel behind the cards, tape on each card
    K.paper(era1, K.cutRect(40, 70, 1840, 790, 2.4, 40), "#eadbbd", { opacity: 0.7 });
    K.table(era1, 860);

    const CX = [310, 960, 1610], CY = 470, CW = 560, CH = 740;
    const cards = CX.map((x, i) => {
      const n = DH.node(era1, x, CY);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-CW / 2, -CH / 2, CW, CH, 2.4, 26), "pat-paper");
      const bx = -CW / 2 + 52, by = -CH / 2 + 52;
      K.paper(K.shadow(n.inner, 1), K.cutEll(bx, by, 38, 38, 1.4), C.coral);
      K.text(n.inner, bx, by + 3, String(i + 1), { size: 48, weight: 800, color: "#ffffff" });
      window.tape(n.inner, CW / 2 - 70, -CH / 2 + 4, 14, 110, 34);
      n.art = K.g(n.inner, { transform: "scale(1.5)" });
      return n;
    });
    const sub = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` }), {});

    // ---- card 1: Meera's own phone bill (her wallet) — does it belong in the stall's books?
    const c1 = cards[0].art;
    const faceT = sub(c1, -95, -135, 1.3);    K.faceTag(faceT, 0, 0, "meera", 1, 0);
    const wallet = sub(c1, -95, -30);         K.medallion(wallet, 0, 0, 46, "wallet", C.cream);
    const bill = sub(c1, 100, -125);
    K.medallion(bill, 0, 0, 52, "smartphone", C.white);
    K.slip(bill, 0, 100, 0.62, 6, "receipt");
    const stallI = sub(c1, 40, 238, 0.31);    K.stall(stallI, 0, 0, 1, { noProps: true });
    const arrow1 = K.g(c1, {});               K.curveArrow(arrow1, [[128, -10], [136, 40], [112, 100]], C.ink, 9);
    const q1 = sub(c1, -108, 150);            K.qmark(q1, 0, 0, 0.95, C.dr);
    const divider = K.g(c1, {});              DH.dots(divider, -165, 40, 165, 40, 11, 5.5, C.ink); DH.hide(divider);
    const no1 = DH.node(cards[0].inner, CW / 2 - 60, -CH / 2 + 60); K.medallion(no1.inner, 0, 0, 38, "x", C.coral); DH.hide(no1.inner);

    // ---- card 2: a customer asks the price of chai, then walks away
    const c2 = cards[1].art;
    const walker = DH.node(c2, 40, -10);      K.medallion(walker.inner, 0, 0, 84, "user-round", C.white);
    const bubble = DH.node(c2, 80, -150);     K.label(bubble.inner, 0, 0, "₹ ?", { size: 58, bg: "paper", rot: -4 });
    K.tumbler(c2, -105, 190, 2.9);
    const no2 = DH.node(cards[1].inner, 30, 250); K.medallion(no2.inner, 0, 0, 88, "hand", C.coral); DH.hide(no2.inner);

    // ---- card 3: which report is the photo? film strip vs the Balance-Sheet polaroid (polaroid window is exactly 16:9)
    const c3 = cards[2].art;
    const strip = sub(c3, -35, -122);         K.filmStrip(strip, 0, 0, 236, 92, ["coffee", "coins"], -5);
    const q3 = sub(c3, 135, -125);            K.qmark(q3, 0, 0, 1.1, C.cr);
    const PW = 410, PH = (PW - 30) * 9 / 16 + 80;   // photo window (PW-30) × 16:9
    const pol = DH.node(era1, CX[2] + 10, CY + 150);
    pol.inner.setAttribute("transform", "rotate(3)");
    pol.outer.setAttribute("data-layout-allow-overlap", "true"); pol.inner.setAttribute("data-layout-allow-overlap", "true");
    K.polaroid(pol.inner, 0, 0, PW, PH, 0, null, { twoColumn: true, date: "30 Apr" });
    pol.outer.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
    const WIN = { x: -PW / 2 + 15, y: -PH / 2 + 15, w: PW - 30, h: (PW - 30) * 9 / 16 };
    const clip = K.el("clipPath", { id: "s02-winclip" }, svg);
    K.el("rect", { x: WIN.x, y: WIN.y, width: WIN.w, height: WIN.h }, clip);
    const win = K.g(pol.inner, { "clip-path": "url(#s02-winclip)" }); DH.hide(win);
    K.el("use", { href: "#s03-first", transform: `translate(${WIN.x} ${WIN.y}) scale(${WIN.w / 1920})` }, win);
    const sheetChip = DH.node(cards[2].inner, 0, 330); K.label(sheetChip.inner, 0, 0, "Balance Sheet", { size: 50, bg: C.saffron, shadow: 2 }); DH.hide(sheetChip.inner);

    // ---- Khata watches (bottom-left, 22 % height)
    cards.forEach((n) => n.outer.setAttribute("data-layout-allow-overlap", "true"));   // the polaroid grows over the cards at the seam
    const k = K.khataRig(era1, window.KH.x, window.KH.y, window.KH.s, { expr: "awake" });

    // ======================================================================== timeline
    const t0 = sc.start;
    const dim = (i, v, t) => { tl.to(cards[i].outer, { opacity: v, duration: 0.3, ease: "power1.out" }, t); if (i === 2) tl.to(pol.outer, { opacity: v, duration: 0.3, ease: "power1.out" }, t); };
    const lift = (i, t) => DH.pulse(tl, cards[i].inner, t, 1.05);
    k.blink(tl, t0 + 1.2).blink(tl, t0 + 12).blink(tl, t0 + 24);
    const nod = (t) => {
      tl.to(k.lift, { y: -12, duration: 0.14, ease: K.q("power2.out", 0.14, t) }, t);
      tl.to(k.lift, { y: 0, duration: 0.26, ease: K.q("power2.inOut", 0.26, t + 0.14) }, t + 0.14);
    };

    // 1 — "One. Meera pays her personal phone bill…" → "No."
    const tOne = cue("s02a", "@one");
    lift(0, tOne); dim(1, 0.72, tOne); dim(2, 0.72, tOne);
    k.look(tl, tOne, 7, -5);
    DH.pulse(tl, faceT, cue("s02a", "@meera"), 1.1);
    DH.pulse(tl, bill, cue("s02a", "@phone"), 1.1);
    DH.pulse(tl, q1, cue("s02a", "@books"), 1.15);
    const tNo = cue("s02a", "@no");
    tl.to(bill, { x: -195, duration: 0.7, ease: "power2.inOut" }, tNo);       // the bill slides back into her wallet
    tl.to(bill, { autoAlpha: 0, scale: 0.6, svgOrigin: "-95 -30", duration: 0.2, ease: "power2.in" }, tNo + 0.7);
    DH.out(tl, arrow1, tNo, 0.2); DH.out(tl, q1, tNo, 0.2);
    DH.pop(tl, divider, tNo + 0.45, { from: 1.0 });
    DH.pop(tl, no1.inner, tNo + 0.2);
    nod(tNo);
    k.look(tl, tNo, 0, 0);

    // 2 — "Two. A customer asks the price…" → "Not a transaction."
    const tTwo = cue("s02b", "@two");
    dim(0, 0.6, tTwo - 0.1); lift(1, tTwo); k.look(tl, tTwo, 0, -6);
    DH.pulse(tl, bubble.inner, cue("s02b", "@price"), 1.12);
    const tAway = cue("s02b", "@walks");
    tl.to(walker.outer, { x: 40 + 170, duration: 0.9, ease: "power1.inOut" }, tAway);
    tl.to(walker.inner, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, tAway + 0.75);
    DH.out(tl, bubble.inner, cue("s02b", "@away"), 0.2);
    DH.pop(tl, no2.inner, cue("s02b", "@not"));
    nod(cue("s02b", "@not") + 0.1);

    // 3 — "Three. Which report is the photo? The Balance Sheet."
    const tThree = cue("s02c", "@three");
    dim(1, 0.6, tThree - 0.1); dim(2, 1, tThree - 0.1); lift(2, tThree); DH.pulse(tl, pol.inner, tThree + 0.1, 1.05);
    k.look(tl, tThree, 9, -4);
    DH.pulse(tl, strip, cue("s02c", "@report"), 1.08);
    const tBal = cue("s02c", "@balance");
    DH.out(tl, strip, tBal - 0.1, 0.25);
    DH.out(tl, q3, tBal - 0.1, 0.2);
    DH.pop(tl, sheetChip.inner, tBal);
    DH.pulse(tl, pol.inner, tBal + 0.15, 1.07);
    k.arm(tl, tBal, "R", 60, 0.25).arm(tl, cue("s02c", "@and") - 0.1, "R", 15, 0.3);

    // seam: "And today, we start filling in that photo." — polaroid flies to centre and grows until its window fills the frame
    const tGrow = cue("s02c", "@today") - 0.2, S = 1920 / WIN.w;
    tl.to(pol.outer, { opacity: 1, duration: 0.1 }, tGrow);
    DH.out(tl, sheetChip.inner, tGrow - 0.05, 0.2);
    tl.to(pol.outer, { x: 960, y: 540 - (WIN.y + WIN.h / 2) * S, duration: sc.end - tGrow, ease: "power2.inOut" }, tGrow);
    tl.to(pol.inner, { scale: S, rotation: 0, svgOrigin: O, duration: sc.end - tGrow, ease: "power2.inOut" }, tGrow);
    tl.to(win, { opacity: 1, duration: 0.7, ease: "power1.in" }, sc.end - 0.9);
    k.expr(tl, cue("s02c", "@today"), "happy");
    tl.to(k.g, { opacity: 0, duration: 0.35, ease: "power1.in" }, tGrow + 0.2);   // s03's first frame has no Khata
  };
})();

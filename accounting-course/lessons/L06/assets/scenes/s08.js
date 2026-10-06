// s08 — The bank SMS, two cameras (T8) — the misconception moment. Split screen at the divider (x = 960, the scale's post from s07).
// LEFT (sky): Meera's books — Khata, intact. ₹15,000 moves from the Cash jar to the Bank jar: Dr Bank (left page), Cr Cash (right page);
//   the little HUD scale tips and settles (Bank ↑ and Cash ↓ are both on the left pan).
// RIGHT (night): the BANK's own grey-blue ledger — the notes land in its vault (Dr, left page + `vault` icon); Meera's money is a LIABILITY
//   to the bank (IOU card, `undo-2`): Cr `Meera's Chai`, right page. The SMS docks, its CREDITED turns orange. Scene 1's thumbs-up bubble
//   gets a big red ✗ (Credit ≠ good), a mirrored thumbs-down bubble a second one (Debit ≠ bad). Khata stamps.
// In: s07 ends on exactly this frame's left/right halves (divider, Khata at left, ledger at right) — this scene owns its seam-in.
// Out: default torn-paper wipe → s09.
(function () {
  // ----------------------------------------------------------------------------------------------- bank props
  // the Bank's own ledger: grey-blue cloth, SQUARE corners, no face, no string; both pages writable. Row geometry == Khata's (L6.row works on it).
  L6.ledger = (K, parent, x, y, s) => {
    const C = K.C, root = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const cov = "#7d93ab", covD = "#566b86", sq = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    K.el("ellipse", { cx: 0, cy: 2, rx: 470, ry: 18, fill: "#3b2614", "fill-opacity": 0.25 }, root);
    K.paper(K.shadow(root, 2), K.cutPoly(sq(-446, -380, 446, -26), 1.4, 40), covD);
    K.paper(root, K.cutPoly(sq(-438, -372, 438, -34), 1.2, 40), cov);
    const pageArea = {};
    [-1, 1].forEach((sd) => {
      const x0 = sd < 0 ? -424 : 82;
      K.tex(K.shadow(root, 1), K.cutPoly(sq(x0, -362, x0 + 342, -52), 1.2, 34), "pat-paper");
      K.paper(root, K.cutPoly(sq(x0 + 12, -350, x0 + 330, -64), 1, 34), sd < 0 ? C.dr : C.cr, { opacity: 0.2 });
      for (let i = 0; i < 6; i++) K.ink(root, [[x0 + 20, -300 + i * 40], [x0 + 322, -300 + i * 40]], 2, "#a39684", { opacity: 0.6 });
      const pg = K.g(root, { transform: `translate(${sd * 86} 0)` });
      pageArea[sd < 0 ? "L" : "R"] = { g: pg };
    });
    K.paper(K.shadow(root, 2), K.cutPoly(sq(-70, -380, 70, -26), 1, 40), covD);
    K.medallion(root, 0, -300, 40, "landmark");
    [[-446, -380, 1, 1], [446, -380, -1, 1], [-446, -26, 1, -1], [446, -26, -1, -1]].forEach(([cx, cy, sx, sy]) =>
      K.paper(root, K.cutPoly([[cx, cy], [cx + sx * 54, cy], [cx, cy + sy * 54]], 0.8, 20), "#aab6c4"));       // square metal corners
    return { g: root, pageArea };
  };
  // a small paper safe (vault) — origin = ground centre, ≈ 200 × 210
  L6.vault = (K, parent, x, y, s) => {
    const C = K.C, root = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const body = K.g(root, {});
    K.paper(K.shadow(body, 2), K.cutRect(-100, -210, 200, 210, 2, 30), "#8794a6");
    K.paper(body, K.cutRect(-82, -192, 164, 174, 1.4, 30), "#a4afbd");
    K.paper(body, K.cutRect(-70, -180, 140, 150, 1.2, 30), "#6f7d91");
    K.paper(K.shadow(body, 1), K.cutEll(0, -105, 40, 40, 1), "#c4ccd6");
    K.paper(body, K.cutEll(0, -105, 12, 12, 0.6), "#566b86");
    for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI; K.ink(body, [[Math.cos(a) * 34, -105 + Math.sin(a) * 34], [-Math.cos(a) * 34, -105 - Math.sin(a) * 34]], 5, "#566b86"); }
    K.paper(body, K.cutRect(-88, -170, 12, 30, 0.6, 14), "#566b86"); K.paper(body, K.cutRect(-88, -60, 12, 30, 0.6, 14), "#566b86");
    return { g: root, body };
  };

  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    const KS = 0.8, KX = 520, GY = 1048;
    // ---- stage: sky wall (left half) | night wall (right half) | the shared kraft table
    const sq = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    K.wall(svg, C.sky, 880);
    K.paper(svg, K.cutPoly(sq(960, -40, 2010, 905), 0.5, 60), C.navy);
    K.table(svg, 880);
    // ---- LEFT camera
    const hud = K.scaleRig(svg, 250, 372, 0.3, { tint: true, totals: false });
    hud.g.setAttribute("data-layout-allow-overlap", "true");
    const hJarB = K.jarRig(hud.pans.L.g, -75, 0, 0.8, { contents: "notes", icon: "landmark", fill: 0.6, hidden: true });
    const hJarC = K.jarRig(hud.pans.L.g, 75, 0, 0.8, { contents: "coins", fill: 0.6, hidden: true });
    const plank = L6.hide(L6.node(K, svg, 480, 675)); K.paper(plank, K.cutRect(-240, -11, 480, 22, 1.4, 30), C.wood);                   // the shelf plank
    const jCash = K.jarRig(svg, 340, 664, 0.85, { label: "Cash", contents: "coins", fill: 0.8, hidden: true });
    const jBank = K.jarRig(svg, 610, 664, 0.85, { label: "Bank", icon: "landmark", contents: "notes", fill: 0, hidden: true });
    const k = K.khataRig(svg, KX, GY, KS, { open: true, expr: "awake" });
    gsap.set(k.tints.L, { opacity: 0.28 }); gsap.set(k.tints.R, { opacity: 0.28 });
    const m = K.meera(svg, 66, GY, 0.48, { expr: "happy" });
    // the ₹15,000 bundle(s)
    const bnL = L6.rig(K, svg, 340, 560); L6.hide(bnL.inner); K.bundle(bnL.inner, 0, 0, 0.8, 0);
    // ---- RIGHT camera: the ledger (already in place from s07), the Bank, the vault, the IOU
    const led = L6.ledger(K, svg, 1440, GY + 2, 0.8);
    const vaultO = L6.vault(K, svg, 1706, 746, 0.85), vault = L6.hide(vaultO.body);
    const bank = L6.bank(K, svg, 1262, 748, 0.62); L6.hide(bank.body);
    const bnR = L6.rig(K, svg, 1262, 690); L6.hide(bnR.inner); K.bundle(bnR.inner, 0, 0, 0.8, 0);
    const bnMirror = L6.hide(L6.node(K, svg, 1060, 470)); K.bundle(bnMirror, 0, 0, 0.9, 0);
    const bnMirrorL = L6.hide(L6.node(K, svg, 860, 470)); K.bundle(bnMirrorL, 0, 0, 0.9, 0);
    const iou = L6.hide(L6.node(K, svg, 1520, 500));
    K.tex(K.shadow(iou, 2), K.cutRect(-110, -78, 220, 156, 2, 22), "pat-paper");
    K.tex(K.shadow(iou, 1), K.cutEll(-44, 0, 44, 44, 1), "pat-paper"); const iouF = K.g(iou, { transform: "translate(-44 0)" }); K.faceArt(iouF, "meera", 38);
    K.icon(iou, "undo-2", 52, 0, 62, C.cr, 2.6);
    const liab = L6.hide(L6.node(K, svg, 1462, 404)); L6.chip(K, liab, "Liability", { size: 46, bg: C.cr, h: 64 });
    // the SMS card (from scene 1) docks on the right camera
    const sms = L6.rig(K, svg, 1738, 312); gsap.set(sms.sc, { scale: 1.1, svgOrigin: O });
    const smsCard = K.smsCard(sms.inner, 0, 0, 300, 210, { kind: "CREDITED", amount: "₹15,000" }); L6.hide(sms.inner);
    const smsKind = smsCard.querySelectorAll("text")[1];
    // ---- the divider (the scale's post, from s07)
    const divider = K.g(svg, {});
    K.tex(K.shadow(divider, 3), K.cutRect(951, -60, 18, 1200, 0.8, 60), "pat-cover");
    K.paper(divider, K.cutRect(951, -60, 18, 1200, 0.8, 60), C.brass, { opacity: 0.6 });
    L6.cal(K, svg, 15);       // (above both halves and the divider)
    // ---- the misconception: scene 1's bubble (Cr + thumbs-up) → ✗, then the mirrored bubble (Dr + thumbs-down) → ✗
    const mkBub = (x, y, label, col, icon, icol) => {
      const b = L6.hide(L6.node(K, svg, x, y));
      K.cloud(b, 0, 0, 1.45);
      L6.chip(K, K.g(b, { transform: "translate(-62 -4)" }), label, { size: 58, bg: col, w: 112, h: 80 });
      K.icon(K.g(b, { transform: "translate(70 -4)" }), icon, 0, 0, 84, icol, 2.4);
      return b;
    };
    const bub1 = mkBub(960, 300, "Cr", C.cr, "thumbs-up", C.leaf), bub2 = mkBub(960, 560, "Dr", C.dr, "thumbs-down", C.coral);

    // ======================================================================================= timeline
    k.blink(tl, T0 + 2).blink(tl, T0 + 20).blink(tl, T0 + 36); m.blinks(tl, T0 + 1.4, sc.end, 3.5);
    // "So, the SMS. Two cameras, one deposit." — the left camera's props arrive
    const tSo = cue("s08a", "@sms");
    K.dropIn(tl, plank, tSo + 0.3, { dur: 0.3 }); hud.enter(tl, tSo + 0.3); jCash.enter(tl, tSo + 0.5); K.dropIn(tl, hJarC.body, tSo + 0.9, { dur: 0.3 });
    jBank.enter(tl, cue("s08a", "@cameras") - 0.1);
    hJarB.enter(tl, cue("s08a", "@cameras") + 0.2);
    m.expr(tl, tSo, "happy").look(tl, tSo, 6, 0);
    // "money moved from the galla to the bank" — the bundle arcs Cash jar → Bank jar
    const tMoved = cue("s08a", "@moved");
    tl.set(bnL.inner, { opacity: 1 }, tMoved);
    tl.to(bnL.pos, { x: 610 - 340, duration: 1.0, ease: "power1.inOut" }, tMoved);
    tl.to(bnL.pos, { y: -140, duration: 0.5, ease: "power2.out" }, tMoved);
    tl.to(bnL.pos, { y: 0, duration: 0.5, ease: "power2.in" }, tMoved + 0.5);
    tl.to(bnL.inner, { opacity: 0, duration: 0.15 }, tMoved + 1.0);
    jCash.fill(tl, tMoved + 0.1, 0.4);
    m.look(tl, tMoved, 8, -2);
    // "Bank grows. Debit Bank." → left page, blue; the HUD tips left
    const tGrows = cue("s08a", "@grows");
    jBank.fill(tl, tGrows - 0.4, 0.6);
    hud.tilt(tl, tGrows, 1.8, { dur: 0.7 });
    const tDebit = cue("s08a", "@debit");
    const [bjx, bjy] = [610, 560], rowL = L6.row(K, k, "L", 0, "Bank", 15000, { lsize: 40, asize: 46 }); L6.hide(rowL);
    const rowAt = (cx, cy, ks, side, i) => [cx + (side === "L" ? -253 : 253) * ks, cy + (-305 + 60 * i) * ks];
    L6.flyChip(K, tl, svg, tDebit + 0.05, 0.7, [bjx, bjy], rowAt(KX, GY, KS, "L", 0), "₹15,000", { color: C.drText });
    K.dropIn(tl, rowL, tDebit + 0.75, { dur: 0.3 });
    // "Cash shrinks. Credit Cash." → right page, orange; the HUD settles
    const tShr = cue("s08a", "@shrinks");
    jCash.fill(tl, tShr, 0.2);
    const tCredit = cue("s08a", "@credit");
    L6.flyChip(K, tl, svg, tCredit + 0.05, 0.7, [340, 560], rowAt(KX, GY, KS, "R", 0), "₹15,000", { color: C.crText });
    const rowR = L6.row(K, k, "R", 0, "Cash", 15000, { lsize: 40, asize: 46 }); L6.hide(rowR);
    K.dropIn(tl, rowR, tCredit + 0.75, { dur: 0.3 });
    hud.settle(tl, tCredit + 0.7, { dur: 0.9, hold: 0.6 });

    // ---- RIGHT: the bank's books
    const tBk = cue("s08b", "@bank's");
    L6.drop(tl, K, bank.body, tBk - 0.05, { dur: 0.4 });
    bank.look(tl, tBk, -8, 3).nod(tl, tBk + 0.3);
    // "the notes land in its vault" — the safe drops in, the bundle goes from the door into it
    const tNotes = cue("s08b", "@notes");
    K.dropIn(tl, vault, tNotes - 0.4, { dur: 0.35 });
    tl.set(bnR.inner, { opacity: 1 }, tNotes);
    tl.to(bnR.pos, { x: 1706 - 1262 - 20, duration: 0.9, ease: "power1.inOut" }, tNotes);
    tl.to(bnR.pos, { y: -110, duration: 0.45, ease: "power2.out" }, tNotes);
    tl.to(bnR.pos, { y: -40, duration: 0.45, ease: "power2.in" }, tNotes + 0.45);
    tl.to(bnR.inner, { opacity: 0, duration: 0.15 }, tNotes + 0.9);
    bank.look(tl, tNotes + 0.2, 8, 1);
    // "That's its debit." — Cash 15,000 + the vault icon, left page, blue
    const tDeb = cue("s08b", "@debit");
    const lr = rowAt(1440, GY + 2, 0.8, "L", 0);
    const rowBL = L6.row(K, led, "L", 0, "Cash", 15000, { icon: "vault", lsize: 32, asize: 42 }); L6.hide(rowBL);
    L6.flyChip(K, tl, svg, tDeb - 0.3, 0.7, [1706, 640], lr, "₹15,000", { color: C.drText });
    K.dropIn(tl, rowBL, tDeb + 0.4, { dur: 0.3 });
    // "It's money the bank owes her" — the IOU (Meera's face + undo) comes up; the bank nods; "Liability"
    const tOwes = cue("s08b", "@owes");
    K.dropIn(tl, iou, tOwes - 0.3, { dur: 0.4 }); bank.nod(tl, tOwes);
    K.pulseNode(tl, iou, cue("s08b", "@day"), 1.08);
    K.dropIn(tl, liab, cue("s08b", "@liability") - 0.1, { dur: 0.34 });
    // "It grows, so the bank credits it." — orange line on the right page
    const tCr = cue("s08b", "@credits");
    const rr = rowAt(1440, GY + 2, 0.8, "R", 0);
    const rowBR = L6.row(K, led, "R", 0, "Meera's Chai", 15000, { face: "meera", tall: true, lsize: 26, asize: 44 }); L6.hide(rowBR);
    L6.flyChip(K, tl, svg, tCr - 0.2, 0.7, [1520, 500], rr, "₹15,000", { color: C.crText });
    K.dropIn(tl, rowBR, tCr + 0.5, { dur: 0.3 });
    bank.look(tl, tCr, -9, 3);

    // ---- "Same money. Opposite books." — the bundle at the same height, mirrored, both cameras
    const tSame = cue("s08c", "@money");
    K.dropIn(tl, bnMirrorL, tSame - 0.1, { dur: 0.34 }); K.dropIn(tl, bnMirror, tSame - 0.1, { dur: 0.34 });
    K.liftOff(tl, bnMirrorL, cue("s08c", "@books") + 0.6, { dur: 0.25 }); K.liftOff(tl, bnMirror, cue("s08c", "@books") + 0.6, { dur: 0.25 });
    // "Your SMS is reading the bank's khata, not yours." — the card slides in on the right camera; CREDITED turns orange
    const tSms = cue("s08c", "@your");
    tl.set(sms.inner, { opacity: 1 }, tSms);
    tl.fromTo(sms.pos, { x: 400 }, { x: 0, duration: 0.7, ease: "power2.out", immediateRender: false }, tSms);
    tl.to(smsKind, { fill: C.crText, duration: 0.3 }, cue("s08c", "@not") + 0.1);
    bank.look(tl, tSms, 8, -3);
    // ---- "Credit doesn't mean good." → big red ✗ on scene 1's bubble; "Debit doesn't mean bad." → second ✗
    const tC = cue("s08c", "@credit"), tD = cue("s08c", "@debit");
    K.dropIn(tl, bub1, tC - 0.35, { dur: 0.4 });
    const st1 = K.stamp(tl, svg, 960, 308, cue("s08c", "@mean"), 1.7);
    k.arm(tl, cue("s08c", "@mean") - 0.35, "R", 125, 0.25); k.arm(tl, cue("s08c", "@mean") + 0.2, "R", 20, 0.3);
    K.dropIn(tl, bub2, tD - 0.3, { dur: 0.4 });
    const st2 = K.stamp(tl, svg, 960, 568, cue("s08c", "@bad"), 1.0);
    k.arm(tl, cue("s08c", "@bad") - 0.35, "R", 125, 0.25); k.arm(tl, cue("s08c", "@bad") + 0.2, "R", 20, 0.3);
    k.expr(tl, cue("s08c", "@bad") - 0.2, "wink"); k.expr(tl, cue("s08c", "@bad") + 0.8, "awake", { noTake: true });
    // "They just mean right, and left."
    const tJust = cue("s08c", "@just");
    [bub1, bub2].forEach((b) => K.liftOff(tl, b, tJust - 0.15, { dur: 0.25 })); st1.lift(tl, tJust - 0.15); st2.lift(tl, tJust - 0.15);
    K.pulseNode(tl, rowR, cue("s08c", "@right"), 1.1); K.pulseNode(tl, rowL, cue("s08c", "@left"), 1.1);
    K.pulseNode(tl, rowBR, cue("s08c", "@right"), 1.1); K.pulseNode(tl, rowBL, cue("s08c", "@left"), 1.1);
    m.expr(tl, cue("s08c", "@books") + 0.4, "thinking"); m.expr(tl, tJust, "happy");
    L6.allow(led.g);
  };
})();

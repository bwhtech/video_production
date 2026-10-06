// s11 — Your Turn. Three picture cards (1 advance → Revenue?, 2 paying Gopal → Expense?, 3 the Infotech jar → how much still owed?).
// Khata holds up a `?` while each question is read; "answers next lesson" = calendar-check medallion + a page flip.
// Out (hand-authored, s12 is the other half): a saffron wall wipes in BEHIND the cards, Aman and his samosa cart roll in, the cards slide
// aside — s12 opens on exactly that frame.
//
// Also hosts the helper `window.L5C` (Checkpoint-2 stage, shared with s12): L5C.walls · L5C.actors · L5C.amanFace
(function () {
  window.OWN_SEAM_IN.s12 = true;
  const O = "0 0";
  const L5C = (window.L5C = window.L5C || {});
  L5C.walls = (K, parent, color) => { K.wall(parent, color, 880); K.table(parent, 880); };
  // Aman + the samosa cart (cart scale .62 at the left, Aman 0.9 beside it). o.cartX / o.amanX let s11 build them off-screen.
  L5C.actors = (K, parent, o = {}) => {
    const cart = K.samosaCart(parent, o.cartX ?? 190, 1000, 0.62, {});
    const aman = K.aman(parent, o.amanX ?? 520, 1000, 0.9, { expr: "happy" });
    return { cart, aman };
  };
  // Aman's face medallion (cream disc + bust)
  L5C.amanFace = (K, parent, x, y, r) => {
    const C = K.C, g = K.g(parent, { transform: `translate(${x} ${y})` });
    K.tex(K.shadow(g, 1), K.cutEll(0, 0, r + 6, r + 6, 0.8), "pat-paper");
    K.paper(g, K.cutEll(0, r * 0.72, r * 0.72, r * 0.38, 0.6), "#3f8a63");
    K.paper(g, K.cutEll(-r * 0.5, r * 0.5, r * 0.17, r * 0.3, 0.4), "#f0792a");
    K.paper(g, K.cutEll(0, -r * 0.08, r * 0.44, r * 0.5, 0.6), "#b0714a");
    K.paper(g, K.cutEll(0, -r * 0.46, r * 0.5, r * 0.24, 0.5), C.hair);
    [-1, 1].forEach((sd) => K.paper(g, K.cutEll(sd * r * 0.17, -r * 0.1, r * 0.06, r * 0.06, 0.1), C.ink));
    K.ink(g, K.arc(0, r * 0.06, r * 0.14, Math.PI * 0.2, Math.PI * 0.8, 6), 2.4);
    return g;
  };

  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, L5 = window.L5, T0 = sc.start;
    L5.stage(K, svg, C.teal, 880);
    [[20, 230, 160, 650], [1740, 280, 170, 600]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#2a9a8e" : "#34aa9e"));
    // the saffron stage that wipes in behind the cards, with Aman and the cart rolling in (off-screen left until then)
    const sat = K.g(svg, {}); L5C.walls(K, sat, C.saffron);
    gsap.set(sat, { x: -2100 });
    const { cart, aman } = L5C.actors(K, svg, { cartX: -280, amanX: -220 });
    L5.cal(K, svg, 25);

    // ---- the three cards
    const CW = 520, CH = 560, CY = 500, XS = [330, 960, 1590];
    const cards = XS.map((x, i) => { const n = L5.hide(L5.node(K, svg, x, CY)); K.card(n, 0, 0, CW, CH, { header: C.saffron, title: String(i + 1), titleSize: 60, headerH: 84 }); return n; });
    const part = (ci, x, y, s = 1) => L5.hide(L5.node(K, cards[ci], x, y, s));
    const dashChip = (parent, text) => {
      K.paper(K.shadow(parent, 1), K.cutRect(-135, -38, 270, 76, 1.4, 20), C.cream, { opacity: 0.7 });
      K.el("path", { d: K.cutRect(-127, -31, 254, 62, 1, 22), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", opacity: 0.55 }, parent);
      K.text(parent, 0, 3, text, { size: 46, weight: 700, color: "#6b6275" });
    };
    // card 1 — the advance tag + calendar-check + `Revenue?`
    const tag1 = part(0, -100, 25, 1.05); K.claimTag(tag1, 0, 0, 1, { face: "customer", amount: 4000, size: 48 });
    const med1 = part(0, 150, -75); K.medallion(med1, 0, 0, 58, "calendar-check");
    const lab1 = part(0, 0, 100); K.label(lab1, 0, 0, "Advance from customer", { size: 34, bg: "paper" });
    const q1 = part(0, 0, 205); dashChip(q1, "Revenue?");
    // card 2 — Gopal hands back a note · ₹5,000 · `Expense?`
    const gp = part(1, -115, 150, 0.46); K.gopal(gp, 0, 0, 1, { expr: "neutral", aR: [78, 14] });
    const note2 = part(1, 40, -10); K.note(note2, 0, 0, 130, 66, -10);
    const amt2 = part(1, 120, 85); K.text(amt2, 0, 0, "₹5,000", { size: 56, weight: 800 });
    const q2 = part(1, 0, 205); dashChip(q2, "Expense?");
    // card 3 — the Infotech jar (no amount) · two slips · `?`
    const jarN = part(2, -140, 120, 0.8);
    const jar = K.jarRig(jarN, 0, 0, 1, { contents: "coins", fill: 0.6, edge: C.dr });
    K.faceArt(jar.body, "infotech", 44).setAttribute("transform", "translate(0 -145)");
    const lab3 = part(2, -140, 180); K.label(lab3, 0, 0, "Infotech", { size: 40, bg: "paper" });
    const slip = (ci, y, icon, text) => {
      const n = part(ci, 115, y);
      K.tex(K.shadow(n, 1), K.cutRect(-120, -42, 240, 84, 1.6, 20), "pat-paper");
      K.icon(n, icon, -78, 0, 44, C.ink, 2.4);
      K.text(n, 26, 4, text, { size: 46, weight: 800 });
      return n;
    };
    const slipA = slip(2, 40, "receipt", "₹6,000"), slipB = slip(2, 140, "smartphone", "₹4,000");
    const qm3 = part(2, 115, -85); K.qmark(qm3, 0, 0, 2.0, C.coral);

    // Khata (holds up the `?`) — wrapped so it can slide off with the cards
    const khWrap = K.g(svg, {});
    const khata = K.khataRig(khWrap, 215, 1048, 0.6, { expr: "awake" });
    // "answers next lesson": calendar-check medallion + a page flap that flips
    const calN = L5.hide(L5.node(K, svg, 960, 975));
    K.medallion(calN, 0, 0, 58, "calendar-check");
    const flapPos = K.g(svg, { transform: "translate(960 917)" }), flap = K.g(flapPos, {});
    K.paper(K.shadow(flap, 1), K.cutRect(-58, 0, 116, 116, 1, 20), C.cream);
    K.ink(flap, [[-34, 30], [34, 30]], 4, "#a39684"); K.ink(flap, [[-34, 60], [34, 60]], 4, "#a39684");
    gsap.set(flap, { opacity: 0 });

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 1.6).blink(tl, T0 + 9);
    // "Your turn. Three quick ones." — the three empty cards drop in
    const tThree = cue("s11", "@three");
    cards.forEach((c, i) => L5.drop(tl, K, c, tThree - 0.1 + i * 0.18));
    khata.hop(tl, cue("s11", "@turn") - 0.1, { height: 40 }); khata.expr(tl, cue("s11", "@turn"), "happy");
    const times = [cue("s11", "@one"), cue("s11", "@two"), cue("s11", "@three", 2)];
    // lift each card as it is read; the previous settles
    times.forEach((t, i) => {
      tl.to(cards[i], { scale: 1.04, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t - 0.1);
      if (i > 0) tl.to(cards[i - 1], { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t - 0.1);
    });
    const d = (n, t, o) => L5.drop(tl, K, n, t, o);
    // ONE — "The four-thousand-rupee catering advance — is it revenue in April?"
    d(tag1, times[0] + 0.05); d(lab1, cue("s11", "@advance") - 0.1); d(med1, cue("s11", "@advance") + 0.15);
    d(q1, cue("s11", "@revenue") - 0.1);
    khata.emote(tl, cue("s11", "@revenue"), "?", 1.6); khata.arm(tl, cue("s11", "@revenue") - 0.2, "R", 120, 0.3); khata.arm(tl, cue("s11", "@revenue") + 1.6, "R", 15, 0.4);
    // TWO — "Paying Gopal — is that an expense?"
    d(gp, times[1] + 0.05); d(note2, cue("s11", "@paying") - 0.1); d(amt2, cue("s11", "@gopal"));
    d(q2, cue("s11", "@expense") - 0.1);
    khata.emote(tl, cue("s11", "@expense"), "?", 1.6); khata.arm(tl, cue("s11", "@expense") - 0.2, "R", 120, 0.3); khata.arm(tl, cue("s11", "@expense") + 1.6, "R", 15, 0.4);
    // THREE — "After the UPI payment, how much does Infotech still owe Meera?"
    d(jarN, times[2] + 0.05);
    d(slipA, cue("s11", "@after") - 0.1); d(slipB, cue("s11", "@upi") - 0.1); d(lab3, cue("s11", "@infotech") - 0.1);
    d(qm3, cue("s11", "@owe") - 0.1);
    khata.emote(tl, cue("s11", "@owe"), "?", 2.2); khata.arm(tl, cue("s11", "@owe") - 0.2, "R", 120, 0.3); khata.arm(tl, cue("s11", "@owe") + 2.2, "R", 15, 0.4);
    // "Answers at the start of the next lesson." — calendar-check medallion; a page flaps over it
    d(calN, cue("s11", "@answers") - 0.05);
    const tN = cue("s11", "@next");
    tl.set(flap, { opacity: 1, scaleY: 0.02, svgOrigin: "0 0" }, tN - 0.2);
    tl.to(flap, { scaleY: 1, svgOrigin: "0 0", duration: 0.22, ease: "power2.in" }, tN - 0.2);
    tl.to(flap, { scaleY: 0.02, svgOrigin: "0 0", duration: 0.22, ease: "power2.out" }, tN + 0.05);
    tl.set(flap, { opacity: 0 }, tN + 0.3);

    // ---- exit: saffron wipes in behind the cards, Aman + cart roll in, cards slide aside (→ s12's first frame)
    const tE = segEnd("s11") - 0.75;
    tl.to(sat, { x: 0, duration: 0.55, ease: "power2.inOut" }, tE);
    cart.moveTo(tl, tE + 0.1, 190, 0.9, { smooth: true });
    aman.walkTo(tl, tE + 0.2, 520, 0.8, { smooth: true });
    tl.to(cards[0], { x: -760, duration: 0.6, ease: "power2.in" }, tE + 0.3);
    tl.to(cards[2], { x: 760, duration: 0.6, ease: "power2.in" }, tE + 0.34);
    tl.to(cards[1], { y: 1150, duration: 0.6, ease: "power2.in" }, tE + 0.38);
    tl.to(khWrap, { x: -420, duration: 0.5, ease: "power2.in" }, tE + 0.3);
    tl.to(calN, { autoAlpha: 0, duration: 0.2 }, tE + 0.3);
    L5.allow(svg);
  };
})();

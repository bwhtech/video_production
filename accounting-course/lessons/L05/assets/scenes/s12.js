// s12 — Checkpoint 2: Aman's Samosa Cart (A5–A9). The saffron stage s11 rolled in (Aman + cart at the left, worksheet card right):
// five icon+amount rows, each with two empty boxes (Profit | Cash). "Pause the video now" → cream veil 30 %, saffron pause medallion
// with the 3-2-1 ring over the 3.2 s hold. Reveal fills the grid row by row (neutral cream chips), Aman rings his bell on ₹8,500.
// Out (own seam into s13): a night-navy curved wipe sweeps in from the right while the camera slides right.
(function () {
  window.OWN_SEAM_IN.s13 = true;
  window.SCENES.s12 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, L5C = window.L5C, T0 = sc.start;
    const world = K.g(svg, {});
    L5C.walls(K, world, C.saffron);
    const { cart, aman } = L5C.actors(K, world);
    L5.cal(K, world, 25);
    const banner = K.checkpointBanner(world, 470, 205, 0.6, 2, { hidden: true });

    // ---- the worksheet card (centre-right): head row · five rows · total row
    const SX = 1330, SY = 545, CWd = 1100, CHt = 790;
    const sheet = L5.hide(L5.node(K, world, SX, SY));
    K.tex(K.shadow(sheet, 2), K.cutRect(-CWd / 2, -CHt / 2, CWd, CHt, 2, 24), "pat-paper");
    const BX = [170, 400], RY = [-215, -111, -7, 97, 201], BOXW = 200, BOXH = 80;
    // column heads (navy paper chips: neutral, never a debit/credit colour)
    const heads = [["Profit", "trending-up"], ["Cash", "coins"]].map(([t, ic], i) => {
      const n = L5.hide(L5.node(K, sheet, BX[i], -310));
      K.paper(K.shadow(n, 1), K.cutRect(-108, -34, 216, 68, 1.6, 20), C.navy);
      K.medallion(n, -70, 0, 24, ic);
      K.text(n, 22, 4, t, { size: 40, weight: 800, color: "#ffffff" });
      return n;
    });
    // rows
    const rowsData = [
      { icons: ["shopping-bag"], amt: 9000 },
      { icons: ["key"], amt: 2000 },
      { icons: ["school"], name: "School canteen", amt: 1500 },
      { icons: ["handshake"], name: "Sharma Kirana", amt: 2000 },
      { icons: ["cake", "calendar-check"], amt: 1000 },
    ];
    const rows = rowsData.map((r, i) => {
      const n = L5.hide(L5.node(K, sheet, 0, RY[i]));
      r.icons.forEach((ic, k) => K.medallion(n, -490 + k * 82, 0, 34, ic));
      if (r.name) {
        const lx = -440 + (r.icons.length - 1) * 82;
        K.label(n, lx + 140, 0, r.name, { size: 34, bg: "paper", w: 270, h: 52 });
      }
      K.text(n, 30, 4, K.fmtINR(r.amt), { size: 52, weight: 800, anchor: "end" });
      BX.forEach((bx) => {
        K.paper(n, K.cutRect(bx - BOXW / 2, -BOXH / 2, BOXW, BOXH, 1, 22), C.cream, { opacity: 0.55 });
        K.el("path", { d: K.cutRect(bx - BOXW / 2 + 6, -BOXH / 2 + 6, BOXW - 12, BOXH - 12, 1, 24), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", "stroke-linecap": "round", opacity: 0.55 }, n);
      });
      K.ink(n, [[-510, 52], [510, 52]], 2.5, "#a39684", { opacity: 0.55 });
      return n;
    });
    // answer chips (cream paper with an ink rim; signed counting amounts, zero = a plain 0)
    const ANS = [[9000, 9000], [-2000, -2000], [1500, 0], [0, -2000], [0, 1000]];
    const chips = ANS.map((pair, i) => pair.map((v, k) => {
      const n = L5.hide(L5.node(K, sheet, BX[k], RY[i]));
      K.paper(K.shadow(n, 1), K.cutRect(-BOXW / 2 + 4, -BOXH / 2 + 4, BOXW - 8, BOXH - 8, 1.2, 22), C.white);
      let tk = null;
      if (v === 0) K.text(n, 0, 4, "0", { size: 52, weight: 800 });
      else tk = K.ticker(n, 0, 3, 1, { value: 0, size: 46, signed: true });
      return { n, tk, v };
    }));
    // reveal helpers: a gold ring that lights the active row on its number word, and a QUESTION card beside the sheet (beside Aman, left)
    const ring = K.el("path", { d: K.cutRect(-536, -50, 1072, 100, 1, 22), fill: "none", stroke: C.gold, "stroke-width": 7, "stroke-linejoin": "round", opacity: 0 }, sheet);
    const QX = 430, QY = 370;
    const QDATA = [["Cash sales", "₹9,000", ["shopping-bag"]], ["Stall rent", "₹2,000", ["key"]], ["Canteen · on credit", "₹1,500", ["school"]],
      ["Paying Sharma Kirana", "₹2,000", ["handshake"]], ["Birthday advance", "₹1,000", ["cake"]]];
    const qcards = QDATA.map(([cap, amt, ic], i) => {
      const n = L5.hide(L5.node(K, world, QX, QY));
      L5.card(K, n, 640, 176, { shadow: 2 });
      K.paper(K.shadow(n, 1), K.cutEll(-262, 0, 44, 44, 1), C.saffron); K.text(n, -262, 16, String(i + 1), { size: 58, weight: 800 });
      K.medallion(n, -160, 0, 36, ic[0]);
      K.text(n, -100, -22, cap, { size: 36, weight: 700, anchor: "start" });
      K.text(n, -100, 38, amt, { size: 62, weight: 800, anchor: "start" });
      return n;
    });
    // total plate: Aman's profit so far
    const tot = L5.hide(L5.node(K, sheet, 0, 322));
    K.paper(K.shadow(tot, 2), K.cutRect(-290, -52, 580, 104, 2, 24), "#f3dcae");
    L5C.amanFace(K, tot, -230, 0, 40);
    K.text(tot, -150, 4, "Profit", { size: 46, weight: 800, anchor: "start" });
    const totTk = K.ticker(tot, 190, 4, 1, { value: 0, size: 64 });

    // ---- the pause device (veil → medallion + worksheet medallion), above the world
    const veil = K.el("rect", { x: -60, y: -60, width: 2040, height: 1200, fill: C.cream, style: "opacity:0" }, svg);
    const pm = K.pauseMedallion(svg, 1615, 545, 0.8, { hidden: true });
    const wk = L5.hide(L5.node(K, svg, 1722, 880)); L5.card(K, wk, 150, 110); K.medallion(wk, 0, 0, 38, "file-text");
    // ---- exit wipe (night navy, torn leading edge)
    const navy = K.g(svg, {});
    {
      const W = 2700, H = 1240, left = [];
      for (let i = 0; i <= 16; i++) left.push([-100 + K.sh(i * 31 + 7) * 42, -80 + (i * H) / 16]);
      K.paper(navy, "M" + left.map((p) => p.join(",")).join(" L") + ` L${W},${H - 80} L${W},-80 Z`, C.navy);
    }
    gsap.set(navy, { x: 2200 });

    // ======================================================================================= timeline
    aman.blinks(tl, T0 + 1.0, sc.end, 3.3);
    // s12a "And now — Checkpoint two." — the red banner unfurls, Aman waves
    const tCp = cue("s12a", "@checkpoint");
    banner.unfurl(tl, tCp - 0.1);
    aman.expr(tl, tCp, "grin"); aman.wave(tl, tCp + 0.2, "R", 2);
    // "Back to Aman's samosa cart." — the cart sizzles for the rest of the setup
    const tCart = cue("s12a", "@samosa");
    cart.sizzle(tl, tCart + 0.1, cue("s12b", "@pause"));
    // "Five things happen." — the empty worksheet drops in; heads tie on at "profit" / "cash"
    L5.drop(tl, K, sheet, cue("s12a", "@things") - 0.1);
    L5.drop(tl, K, heads[0], cue("s12a", "@profit")); L5.drop(tl, K, heads[1], cue("s12a", "@cash"));
    aman.look(tl, cue("s12a", "@things"), 7, 0);
    // s12b "One … Five." — each row drops in on its number
    ["@one", "@two", "@three", "@four", "@five"].forEach((w, i) => {
      const t = cue("s12b", w);
      L5.drop(tl, K, rows[i], t - 0.05); aman.look(tl, t, 6, 0);
    });
    // "Pause the video now." — veil 30 %, saffron medallion, worksheet medallion; ring over the 3.2 s hold
    const tPause = cue("s12b", "@pause");
    tl.to(veil, { opacity: 0.3, duration: 0.25, ease: "none" }, tPause - 0.1);
    pm.enter(tl, tPause); L5.drop(tl, K, wk, tPause + 0.25);
    pm.countdown(tl, segEnd("s12b"), { dur: 3.2 });
    // s12c "Ready?" — the veil lifts; the medallion lifts off
    const tReady = cue("s12c", "@ready");
    tl.to(veil, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, tReady - 0.1);
    pm.exit(tl, tReady - 0.1); L5.lift(tl, K, wk, tReady - 0.1);
    aman.expr(tl, tReady, "happy");
    // reveal rows: [row, chip times (profit, cash), number word]
    const dimPrev = (i, t) => { if (i > 0) tl.to(rows[i - 1], { opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, t); if (i > 0) chips[i - 1].forEach((c) => tl.to(c.n, { opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, t)); };
    const show = (i, k, t) => {
      const c = chips[i][k]; L5.drop(tl, K, c.n, t);
      if (c.tk) c.tk.to(tl, t + 0.1, c.v, 0.6);
    };
    const nod = (t, ex) => { aman.headTilt(tl, t, 5); aman.headTilt(tl, t + 0.5, 0); if (ex) aman.expr(tl, t, ex); };
    // each row lights on its number word ("One." … "Five.") and its question card appears beside the sheet; the previous card lifts away
    let curQ = -1, ringOn = false;
    const light = (i, t) => {
      L5.drop(tl, K, qcards[i], t, { dur: 0.3 });
      if (curQ >= 0) L5.lift(tl, K, qcards[curQ], t - 0.02, { dur: 0.2 });
      tl.set(ring, { y: RY[i] }, t); tl.fromTo(ring, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power2.out", immediateRender: false }, t);
      K.pulseNode(tl, rows[i], t, 1.03);
      curQ = i;
    };
    // ONE — both up nine thousand
    light(0, cue("s12c", "@one") - 0.05);
    dimPrev(0, 0);
    show(0, 0, cue("s12c", "@profit")); show(0, 1, cue("s12c", "@cash", 2)); nod(cue("s12c", "@profit"), "happy");
    // TWO — both down two thousand
    light(1, cue("s12c", "@two") - 0.05);
    dimPrev(1, cue("s12c", "@two") - 0.05);
    show(1, 0, cue("s12c", "@both", 2)); show(1, 1, cue("s12c", "@both", 2) + 0.35); nod(cue("s12c", "@both", 2), "thinking");
    // THREE — profit up fifteen hundred, cash nothing
    light(2, cue("s12c", "@three") - 0.05);
    dimPrev(2, cue("s12c", "@three") - 0.05);
    show(2, 0, cue("s12c", "@profit", 2)); show(2, 1, cue("s12c", "@nothing")); nod(cue("s12c", "@profit", 2), "happy");
    // FOUR — cash down two thousand, profit nothing ("a debt being paid")
    light(3, cue("s12c", "@four") - 0.05);
    dimPrev(3, cue("s12c", "@four") - 0.05);
    show(3, 1, cue("s12c", "@cash", 4)); show(3, 0, cue("s12c", "@profit", 3)); nod(cue("s12c", "@cash", 4), "thinking");
    // FIVE — cash up one thousand, profit nothing ("an advance")
    light(4, cue("s12c", "@five") - 0.05);
    dimPrev(4, cue("s12c", "@five") - 0.05);
    show(4, 1, cue("s12c", "@cash", 5)); show(4, 0, cue("s12c", "@profit", 4)); nod(cue("s12c", "@cash", 5), "happy");
    // "Aman's profit so far: eight thousand five hundred rupees." — the plate drops in, counts, the bell rings
    const tA = cue("s12c", "@aman's"), tEight = cue("s12c", "@eight");
    tl.to(rows[4], { opacity: 0.7, duration: 0.35 }, tA - 0.1); chips[4].forEach((c) => tl.to(c.n, { opacity: 0.7, duration: 0.35 }, tA - 0.1));
    L5.lift(tl, K, qcards[4], tA - 0.1, { dur: 0.25 }); tl.to(ring, { opacity: 0, duration: 0.25 }, tA - 0.1);
    L5.drop(tl, K, tot, tA - 0.1); totTk.to(tl, tEight - 0.1, 8500, 0.9);
    cart.ring(tl, tEight + 0.05); aman.expr(tl, tEight, "joy"); aman.arm(tl, tEight, "R", 150, 12, 0.35); aman.arm(tl, tEight + 1.6, "R", 12, 8, 0.4);
    totTk.pulse(tl, tEight + 0.9);
    // ---- exit: night-navy wipe sweeps in from the right; the camera slides right (world drifts left) → s13
    const tW = sc.end - 1.0;
    tl.to(world, { x: -260, duration: 1.0, ease: "power2.in" }, tW);
    tl.to(navy, { x: 0, duration: 0.85, ease: "power2.inOut" }, tW + 0.05);
    cart.ring(tl, tW + 0.1);
    L5.allow(svg);
  };
})();

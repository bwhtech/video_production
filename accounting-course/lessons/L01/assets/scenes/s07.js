// s07 · Record · Sort · Summarise — Khata records slips, jars sort them, jars pour into the movie + photo.
// Also defines window.DH: small helpers shared by s07–s11 (scene builder D).
(function () {
  // ---------- helpers for s07–s11 ----------
  const ICONS_EXTRA = {
    "pencil-line": '<path d="M13 21h8" /> <path d="m15 5 4 4" /> <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />',
    "layers": '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /> <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /> <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />',
    "sigma": '<path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" />',
    "wallet": '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /> <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />',
    "thumbs-up": '<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /> <path d="M7 10v12" />',
    "play": '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />',
    "user-round": '<circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" />',
  };
  Object.assign(window.ICONS, ICONS_EXTRA);

  const O = "0 0";
  const DH = (window.DH = {
    // positioned group + an inner group drawn around (0,0) for scale/rotate pivots
    node(parent, x, y, extra = {}) {
      const outer = window.KIT.g(parent, { transform: `translate(${x} ${y})`, ...extra });
      const inner = window.KIT.g(outer, {});
      return { outer, inner };
    },
    hide(tl, els) { tl.set(els, { autoAlpha: 0 }, 0); },
    pop(tl, el, t, o = {}) {
      // drop-and-place (paper lands on the table): appears lifted (slightly larger), settles flat, then holds still
      tl.set(el, { autoAlpha: 0, scale: 1.07, rotation: Math.max(-2, Math.min(2, o.rot ?? 0)), svgOrigin: O }, 0);
      tl.to(el, { autoAlpha: 1, duration: 0.12, ease: "none" }, t);
      tl.to(el, { scale: 1, rotation: 0, svgOrigin: O, duration: o.dur ?? 0.34, ease: "power2.out" }, t);
    },
    out(tl, el, t, dur = 0.2) {
      tl.to(el, { scale: 1.05, autoAlpha: 0, svgOrigin: O, duration: dur, ease: "power2.in" }, t);   // lifts off
    },
    pulse(tl, el, t, amt = 1.12) {
      // calm highlight: a small, smooth lift (was a bouncy pulse — "cards shaking" in review)
      const a = 1 + (amt - 1) * 0.3;
      tl.to(el, { scale: a, svgOrigin: O, duration: 0.25, ease: "power2.out" }, t);
      tl.to(el, { scale: 1, svgOrigin: O, duration: 0.45, ease: "power2.inOut" }, t + 0.25);
    },
    // flight along an arc (outer group already sits at `from`): x eased in-out, y up-then-down
    fly(tl, el, t, from, to, dur = 0.6, lift = 120) {
      tl.set(el, { x: from[0], y: from[1] }, 0);
      tl.to(el, { x: to[0], duration: dur, ease: "power1.inOut" }, t);
      const peak = Math.min(from[1], to[1]) - lift;
      tl.to(el, { y: peak, duration: dur * 0.45, ease: "power2.out" }, t);
      tl.to(el, { y: to[1], duration: dur * 0.55, ease: "power2.in" }, t + dur * 0.45);
    },
    // small paper chip: medallion icon + one word
    chip(parent, x, y, iconName, word, color) {
      const K = window.KIT;
      const n = DH.node(parent, x, y);
      const w = 92 + K.textW(word, 46, "baloo") + 30;
      K.paper(K.shadow(n.inner, 2), K.cutRect(-w / 2, -44, w, 88, 2, 22), color);
      const mx = -w / 2 + 48;
      K.medallion(n.inner, mx, 0, 30, iconName);
      K.text(n.inner, mx + 40, 3, word, { size: 46, anchor: "start", weight: 800, color: K.onColor(color) });
      return n;
    },
  });

  // ---------- s07 ----------
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C;
    K.wall(svg, C.teal); K.table(svg, 860);

    // April calendar strip (bible §5.7) — the SAME kit device as s01: numbers only, `2` highlighted (tonight is still Apr 2).
    // It drops in on "next lessons"; the highlight STAYS on 2 — only a thin underline travels 2 → 30 (never backwards).
    const cal = K.calendarStrip(svg, 960, 72, 0.92, { highlight: 2, month: "April", hidden: true });
    const ulX0 = cal.cx(2) - 22, ulX1 = cal.cx(30) + 22, ulY = 33;
    const underline = K.g(cal.body, {});
    K.ink(underline, [[ulX0, ulY], [ulX1, ulY]], 5, C.coral);
    tl.set(underline, { opacity: 0 }, 0);

    // three step chips
    const chips = [
      DH.chip(svg, 400, 330, "pencil-line", "Record", C.saffron),
      DH.chip(svg, 1080, 330, "layers", "Sort", C.sky),
      DH.chip(svg, 1640, 330, "sigma", "Summarise", C.violet),
    ];

    // RECORD: Khata, open, with slips landing on its pages
    const k = K.khataRig(svg, 400, 900, 0.78, { open: true, expr: "awake", blankPages: false });
    // SORT: three plain glass jars (no label, no icon)
    const jarX = [930, 1080, 1230];
    const jars = jarX.map((x, i) => {
      const n = DH.node(svg, x, 862);
      K.jar(n.inner, 0, 0, 132, 178, { fill: 0 });   // UNLABELLED glass — L2 births the jar device and names the first jar
      return n;
    });

    const slipIcons = ["coffee", "shopping-bag", "coins"];
    const slipLand = [[203, 688], [203, 792], [597, 740]];
    const slipFrom = [[-140, 470], [-120, 620], [-160, 360]];
    const slips = slipIcons.map((ic, i) => {
      const n = DH.node(svg, 0, 0);
      const s = K.g(n.inner, { transform: "scale(0.9)" });
      K.slip(s, 0, 0, 1, (i - 1) * 6, ic);
      return n;
    });

    // SUMMARISE: the movie + the photo
    const film = DH.node(svg, 1620, 560);
    K.filmStrip(film.inner, 0, 0, 470, 164, ["coffee", "coins", "calendar"], -3, { resultFrames: 2 });   // same kit strip as s04 (+ two ruled result frames)
    const photo = DH.node(svg, 1670, 805);
    K.polaroid(photo.inner, 0, 0, 236, 262, 6, (pg) => {   // same two-column kit polaroid as s04 (30 Apr)
      K.medallion(pg, pg.cols.L.cx, pg.cols.L.y + pg.cols.L.h * 0.5, 22, "package");
      K.medallion(pg, pg.cols.R.cx, pg.cols.R.y + pg.cols.R.h * 0.5, 22, "hand-coins");
    }, { twoColumn: true, date: "30 Apr" });
    photo.outer.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));   // kit header "Liabilities / + Equity" are two tight lines (bbox touch)
    const coins = [0, 1, 2, 3, 4].map((i) => { const n = DH.node(svg, 0, 0); K.coin(n.inner, 0, 0, 24, i * 30); return n; });

    // ---------------- timing (from the voice) ----------------
    const tRec = cue("s07", "@record"), tSort = cue("s07", "@sort"), tSum = cue("s07", "@sum");
    const tMovie = cue("s07", "@movie"), tPhoto = cue("s07", "@photo");
    const tR2 = cue("s07", "@record", 2), tS2 = cue("s07", "@sort", 2), tSu2 = cue("s07", "@summarise");
    const tNext = cue("s07", "@next"), tMonth = cue("s07", "@month");
    const tOne = cue("s07", "@one"), tDay = cue("s07", "@day"), tTime = cue("s07", "@time");

    k.jitter(tl, sc.start, sc.end + 0.6);
    k.blink(tl, sc.start + 1.0);

    // record
    DH.pop(tl, chips[0].inner, tRec - 0.15);
    k.expr(tl, tRec, "happy");
    slips.forEach((n, i) => {
      tl.set(n.outer, { autoAlpha: 0 }, 0);
      tl.set(n.outer, { autoAlpha: 1 }, tRec + i * 0.18);
      DH.fly(tl, n.outer, tRec + i * 0.18, slipFrom[i], slipLand[i], 0.6, 80);
    });
    k.look(tl, tRec + 0.2, -6, 2).look(tl, tRec + 0.9, 4, 0);

    // sort: slips leave the pages and drop into the jars
    DH.pop(tl, chips[1].inner, tSort - 0.15);
    k.arm(tl, tSort - 0.05, "R", 70).look(tl, tSort, 9, 0);
    slips.forEach((n, i) => {
      DH.fly(tl, n.outer, tSort + 0.1 + i * 0.16, slipLand[i], [jarX[i], 778], 0.62, 130);
      tl.to(n.inner, { scale: 0.62, svgOrigin: O, duration: 0.62, ease: "power1.in" }, tSort + 0.1 + i * 0.16);
      tl.to(n.outer, { autoAlpha: 0, duration: 0.1, ease: "none" }, tSort + 0.1 + i * 0.16 + 0.62);   // the slip is IN the jar — glass stays plain/unlabelled
      DH.pulse(tl, jars[i].inner, tSort + 0.72 + i * 0.16, 1.06);
    });
    k.arm(tl, tSort + 1.2, "R", 20);

    // summarise: jars tip and pour into the movie + photo
    DH.pop(tl, chips[2].inner, tSum - 0.15);
    jars.forEach((j, i) => {
      tl.to(j.inner, { rotation: 18, svgOrigin: "60 0", duration: 0.35, ease: "power2.out" }, tSum + i * 0.08);
      tl.to(j.inner, { rotation: 0, svgOrigin: "60 0", duration: 0.4, ease: "power2.out" }, tMovie + 0.3 + i * 0.08);
    });
    coins.forEach((n, i) => {
      const from = [jarX[i % 3] + 56, 690];
      const to = i < 3 ? [1520 + i * 100, 560] : [1630 + (i - 3) * 80, 805];
      tl.set(n.outer, { autoAlpha: 0 }, 0);
      tl.set(n.outer, { autoAlpha: 1 }, tSum + 0.15 + i * 0.12);
      DH.fly(tl, n.outer, tSum + 0.15 + i * 0.12, from, to, 0.7, 160);
      tl.to(n.outer, { autoAlpha: 0, duration: 0.12 }, tSum + 0.85 + i * 0.12);
    });
    DH.pop(tl, film.inner, tMovie - 0.1, { from: 0.6 });
    DH.pop(tl, photo.inner, tPhoto - 0.1, { from: 0.6, rot: 8 });
    k.expr(tl, tPhoto, "wow").look(tl, tPhoto, 9, -4);

    // "Record. Sort. Summarise." — each column answers its word
    DH.pulse(tl, chips[0].inner, tR2, 1.14);
    DH.pulse(tl, chips[1].inner, tS2, 1.14); jars.forEach((j, i) => DH.pulse(tl, j.inner, tS2 + i * 0.06, 1.08));
    DH.pulse(tl, chips[2].inner, tSu2, 1.14); DH.pulse(tl, film.inner, tSu2 + 0.05, 1.06); DH.pulse(tl, photo.inner, tSu2 + 0.1, 1.06);
    k.expr(tl, tSu2 + 0.4, "happy").look(tl, tSu2 + 0.4, 0, -4);

    // the month ahead: the strip drops in (drop-and-place), then a thin underline travels 2 → 30 and fades
    cal.enter(tl, tNext - 0.1);
    const tUlEnd = tTime + 0.7;
    tl.fromTo(underline, { opacity: 1, scaleX: 0.001, svgOrigin: `${ulX0} ${ulY}` }, { opacity: 1, scaleX: 1, svgOrigin: `${ulX0} ${ulY}`, duration: tUlEnd - tMonth, ease: "power1.inOut", immediateRender: false }, tMonth);
    tl.to(underline, { opacity: 0, duration: 0.4, ease: "power1.in" }, tUlEnd + 0.15);
    k.look(tl, tNext, 0, -9).hop(tl, tMonth - 0.1, { height: 40 });
  };
})();

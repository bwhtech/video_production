// Lesson-10 local helper kit — loaded after _shared.js, before every scene (index.template).
// Lesson-local on purpose (the shared kit is untouched). Candidates to promote: gauge, jcard (JournalCard), tagChip, scuff, hud.
(function () {
  const K = window.KIT, C = K.C;
  const L10 = (window.L10 = window.L10 || {});
  const O = "0 0";

  // Lucide `droplets` is not in the kit's icons.js yet — register the Lucide droplet path locally if missing.
  if (!window.ICONS.droplets) window.ICONS.droplets = '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>';
  K.ICON_COLORS = K.ICON_COLORS || {};

  // ------------------------------------------------------------------------------------------------ basics (from L5 / L7)
  L10.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L10.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L10.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L10.cal = (parent, hl = 30) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L10.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L10.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L10.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L10.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    if (o.dashed) K.el("path", { d: K.cutRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 1.2, 24), fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-dasharray": "18 12", "stroke-linecap": "round", opacity: 0.75 }, grp);
    return grp;
  };
  L10.chip = (parent, x, y, text, o = {}) => {
    const n = L10.hide(L10.node(parent, x, y));
    K.label(n, 0, 0, text, { size: o.size || 40, bg: o.bg || "paper", rot: o.rot || 0, weight: 800, shadow: 1 });
    return n;
  };
  L10.push = (tl, cam, t, dur, org, s0, s1, ease = "none") =>
    tl.fromTo(cam, { scale: s0, svgOrigin: org }, { scale: s1, svgOrigin: org, duration: dur, ease, immediateRender: false }, t);
  L10.fly = (tl, node, t, from, to, dur, o = {}) => {
    const lift = o.lift ?? 60, ease = o.ease || "power1.inOut";
    tl.fromTo(node, { x: from[0] }, { x: to[0], duration: dur, ease, immediateRender: false }, t);
    if (lift) {
      tl.fromTo(node, { y: from[1] }, { y: Math.min(from[1], to[1]) - lift, duration: dur * 0.5, ease: "power2.out", immediateRender: false }, t);
      tl.fromTo(node, { y: Math.min(from[1], to[1]) - lift }, { y: to[1], duration: dur * 0.5, ease: "power2.in", immediateRender: false }, t + dur * 0.5);
    } else tl.fromTo(node, { y: from[1] }, { y: to[1], duration: dur, ease, immediateRender: false }, t);
  };
  // fade a node via opacity (safe on rig groups that carry transform attrs)
  L10.fade = (tl, n, t, to = 1, dur = 0.3) => tl.to(n, { opacity: to, duration: dur, ease: "power1.inOut" }, t);
  // write-on: a left→right clip reveal on a node (clip rect lives in the node's own coordinate space)
  let clipN = 0;
  L10.writeOn = (tl, node, svg, x, y, w, h, t, dur = 0.6) => {
    const id = "wo" + (clipN++), cp = K.el("clipPath", { id }, svg), r = K.el("rect", { x, y, width: 0.01, height: h }, cp);
    node.setAttribute("clip-path", `url(#${id})`);
    tl.fromTo(r, { attr: { width: 0.01 } }, { attr: { width: w }, duration: dur, ease: "none", immediateRender: false }, t);
    return r;
  };

  // ------------------------------------------------------------------------------------------------ GAUGE (from L5) — Profit / Cash
  L10.gauge = (parent, x, y, s, o = {}) => {
    const R = 200, MAX = o.max || 60000;
    const root = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const body = K.g(root, {});
    if (o.hidden) L10.hide(body);
    const dial = K.g(body, {});
    K.tex(K.shadow(dial, 2), K.cutPoly([...K.arc(0, 0, R, Math.PI, Math.PI * 2, 24), [R, 52], [-R, 52]], 2, 24), "pat-paper");
    K.paper(dial, K.cutPoly([...K.arc(0, 0, R * 0.9, Math.PI * 1.03, Math.PI * 1.97, 18), ...K.arc(0, 0, R * 0.76, Math.PI * 1.97, Math.PI * 1.03, 18)], 0.8, 10), o.band || C.saffron, { opacity: o.dashed ? 0.45 : 0.92 });
    for (let i = 0; i <= 10; i++) {
      const a = Math.PI + (i / 10) * Math.PI, r0 = R * (i % 5 === 0 ? 0.56 : 0.64), r1 = R * 0.72;
      K.ink(dial, [[Math.cos(a) * r0, Math.sin(a) * r0], [Math.cos(a) * r1, Math.sin(a) * r1]], i % 5 === 0 ? 7 : 4);
    }
    const halo = K.el("path", { d: K.cutPoly([...K.arc(0, 0, R + 14, Math.PI, Math.PI * 2, 22), [R + 14, 66], [-R - 14, 66]], 1, 26), fill: "none", stroke: C.gold, "stroke-width": 10, "stroke-linejoin": "round", opacity: 0 }, body);
    const needle = K.g(body, {});
    K.paper(K.shadow(needle, 1), K.cutPoly([[-10, 22], [-5, -R * 0.84], [0, -R * 0.9], [5, -R * 0.84], [10, 22]], 0.6, 18), C.red);
    K.paper(K.shadow(body, 1), K.cutEll(0, 0, 24, 24, 1), C.ink);
    K.paper(body, K.cutEll(-6, -6, 6, 6, 0.4), "#5b5066");
    const deg0 = (Math.max(0, Math.min(1, (o.value || 0) / MAX)) - 0.5) * 180;
    gsap.set(needle, { rotation: deg0, svgOrigin: O });
    // ghost needle (dashed look) for the imagined bill
    const ghost = K.g(body, {}); L10.hide(ghost);
    K.paper(ghost, K.cutPoly([[-8, 22], [-4, -R * 0.84], [0, -R * 0.9], [4, -R * 0.84], [8, 22]], 0.6, 18), C.coral, { opacity: 0.8 });
    gsap.set(ghost, { rotation: deg0, svgOrigin: O });
    const labPos = K.g(body, { transform: `translate(0 ${-R - 62})` }), lab = K.g(labPos, {});
    if (o.label) {
      const lw = 168 + o.label.length * 24;
      K.tex(K.shadow(lab, 1), K.cutRect(-lw / 2, -40, lw, 80, 1.6, 20), "pat-paper");
      K.medallion(lab, -lw / 2 + 48, 0, 30, o.icon || "coins");
      K.text(lab, 32, 4, o.label, { size: 50, weight: 800 });
    }
    const tkPos = K.g(body, { transform: "translate(0 122)" });
    const tk = K.ticker(tkPos, 0, 0, 1, { value: o.value || 0, size: o.size || 66, chip: true, w: 350, h: 96, edge: o.band || C.saffron });
    const st = { deg: deg0, gdeg: deg0 };
    const rig = {
      g: root, body, needle, ghost, ticker: tk, lab, halo, x, y, s, R,
      enter(tl, t) { K.dropIn(tl, body, t); return rig; },
      read(tl, t, value, oo = {}) {
        const dur = oo.dur ?? 1.0, f = Math.max(0, Math.min(1, value / MAX)), deg = (f - 0.5) * 180;
        const dir = Math.sign(deg - st.deg) || 1, ov = oo.settle ?? 3.2;
        tl.fromTo(needle, { rotation: st.deg, svgOrigin: O }, { rotation: deg + dir * ov, svgOrigin: O, duration: dur * 0.75, ease: "power3.out", immediateRender: false }, t);
        tl.fromTo(needle, { rotation: deg + dir * ov, svgOrigin: O }, { rotation: deg, svgOrigin: O, duration: 0.3, ease: "power2.inOut", immediateRender: false }, t + dur * 0.75);
        if (oo.ticker !== false) tk.to(tl, t + 0.05, value, dur * 0.85);
        st.deg = deg;
        return rig;
      },
      // ghost needle dips beside the real one (imagined bill) — the real one never moves
      ghostTo(tl, t, value, dur = 0.8) {
        const f = Math.max(0, Math.min(1, value / MAX)), deg = (f - 0.5) * 180;
        tl.to(ghost, { autoAlpha: 1, duration: 0.2 }, t);
        tl.fromTo(ghost, { rotation: st.deg, svgOrigin: O }, { rotation: deg, svgOrigin: O, duration: dur, ease: "power2.out", immediateRender: false }, t + 0.1);
        return rig;
      },
      ghostOff(tl, t) { tl.to(ghost, { autoAlpha: 0, duration: 0.25 }, t); return rig; },
      flash(tl, t, hold = 0.7) {
        tl.fromTo(halo, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t);
        tl.to(halo, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + hold); return rig;
      },
    };
    return rig;
  };
  // Profit / Cash pair, top-left (≈ 50 %)
  L10.gauges = (parent, o = {}) => {
    const GS = 0.5;
    const profit = L10.gauge(parent, 170, 272, GS, { label: "Profit", icon: "trending-up", band: C.saffron, max: 40000, value: o.profit ?? 36700, hidden: o.hidden });
    const cash = L10.gauge(parent, 440, 272, GS, { label: "Cash", icon: "coins", band: C.sky, max: 60000, value: 50700, hidden: o.hidden });
    return { profit, cash, GS };
  };

  // ------------------------------------------------------------------------------------------------ SCALE HUD (top-right) — from L5.hud, trimmed to L10's balances
  // stage 0 = before the adjustments: A ₹1,17,700 = L ₹34,000 + E ₹83,700 (Capital 50,000 + Profit 36,700 − Drawings 3,000)
  L10.hud = (parent, tl, o = {}) => {
    const k = o.k ?? 0.5, right = o.right ?? 36, top = o.top ?? 122, BX = 960, BY = 890;
    const box = K.g(parent, {});                       // enter/exit layer (opacity + slide only)
    const slide = K.g(box, {});
    const tr = K.g(slide, {}), sc = K.g(tr, {});
    const T0 = o.totals || [117700, 117700];
    const rig = K.scaleRig(sc, BX, BY, 1, { tint: true, L: T0[0], R: T0[1] });
    const Lg = rig.pans.L.g, Rg = rig.pans.R.g;
    const dx = 1920 - right - BX - k * 640, dy = top - BY + 600 * k, boost = 30 / (44 * k);
    tl.set(sc, { scale: k, svgOrigin: `${BX} ${BY}` }, 0);
    tl.set(tr, { x: dx, y: dy }, 0);
    ["L", "R"].forEach((kk) => { const P = rig.pans[kk]; if (P.chipBoost) tl.set(P.chipBoost, { scale: boost, y: 62, svgOrigin: O }, 0); tl.set(P.labelsG, { autoAlpha: 0 }, 0); });
    tl.set(rig.eqG.parentNode, { autoAlpha: 0 }, 0);
    const pt = (lx, ly) => [1920 - right - 640 * k + k * lx, top + 600 * k + k * ly];
    const panPt = (side, px, py) => pt((side === "L" ? -380 : 380) + px, -270 + py);

    const JS = 0.4, orderL = ["cash", "bank", "inf", "stock", "equip"];
    const defL = {
      cash: { contents: "coins", icon: "coins", fill: 0.7 },
      bank: { contents: "coins", icon: "landmark", fill: 0.4 },
      inf: { contents: "coins", fill: 0.3 },
      stock: { contents: "leaves", icon: "leaf", fill: 0.8 },
      equip: { contents: "cart", icon: "shopping-cart" },
    };
    const jars = {}, slotL = {}, xL = {};
    orderL.forEach((id, i) => {
      slotL[id] = K.g(Lg, {});
      jars[id] = K.jarRig(slotL[id], 0, 0, JS, { edge: C.dr, ...defL[id] });
      if (id === "inf") { const fa = K.faceArt(jars[id].body, "infotech", 40); fa.setAttribute("transform", `translate(0 ${-196 * 0.74})`); }
      xL[id] = (i - (orderL.length - 1) / 2) * 70;
      gsap.set(slotL[id], { x: xL[id] });
    });
    // right pan: tags + the equity card
    const TS = 0.29, CS = 0.4, orderR = ["ravi", "gopal", "adv", "elec", "card"], wR = { ravi: 64, gopal: 64, adv: 64, elec: 64, card: 200 };
    const showR = new Set(["ravi", "gopal", "adv", "card", ...(o.elec ? ["elec"] : [])]);
    const slotR = {}, xR = {}, tags = {};
    orderR.forEach((id) => { slotR[id] = K.g(Rg, {}); });
    tags.ravi = K.claimTag(slotR.ravi, 0, 0, TS, { face: "ravi" });
    tags.gopal = K.claimTag(slotR.gopal, 0, 0, TS, { face: "gopal" });
    tags.adv = K.claimTag(slotR.adv, 0, 0, TS, { face: "customer" });
    tags.elec = K.claimTag(slotR.elec, 0, 0, TS, { face: "electricity", hidden: !o.elec });
    const card = K.equityCard(slotR.card, 0, 0, CS, { pockets: 2, capital: 50000, profit: o.profit ?? 36700 });
    card.unfold(tl, 0, { dur: 0.05 });
    const layoutR = () => {
      const ids = orderR.filter((id) => showR.has(id)), gap = 8, tot = ids.reduce((a, id) => a + wR[id], 0) + gap * (ids.length - 1);
      let cx = -tot / 2; const r = {}; ids.forEach((id) => { r[id] = cx + wR[id] / 2; cx += wR[id] + gap; }); return r;
    };
    Object.assign(xR, layoutR());
    orderR.forEach((id) => gsap.set(slotR[id], { x: xR[id] ?? 0 }));

    const H = {
      rig, jars, tags, card, pt, panPt, k, box, slide,
      jarPt: (id, dy = -60) => panPt("L", xL[id] ?? 0, dy * 0.8),
      pocketPt: (name) => panPt("R", (xR.card ?? 0) + (name === "Profit" ? 0 : name === "Capital" ? -150 : 150) * CS, -150 * CS),
      tagPt: (id) => panPt("R", xR[id] ?? 0, -90 * TS),
      // a newcomer tag joins the right pan; the others glide to the new layout
      addTag(tl, t, id) {
        showR.add(id); const nx = layoutR();
        orderR.forEach((j) => { if (!showR.has(j) || j === id) return; tl.to(slotR[j], { x: nx[j], duration: 0.5, ease: "power2.inOut" }, t); });
        tl.set(slotR[id], { x: nx[id] }, t - 0.02); Object.assign(xR, nx);
        tags[id].enter(tl, t + 0.15);
        return H;
      },
      enter(tl, t, dur = 0.5) {
        tl.fromTo(slide, { x: 300 }, { x: 0, duration: dur, ease: "power2.out", immediateRender: false }, t);
        tl.fromTo(box, { autoAlpha: 0 }, { autoAlpha: 1, duration: dur * 0.6, ease: "power1.out", immediateRender: false }, t);
        return H;
      },
    };
    if (!o.visible) tl.set(box, { autoAlpha: 0 }, 0);
    return H;
  };

  // ------------------------------------------------------------------------------------------------ small art
  // scuff sticker (depreciation icon, bible §5.12): round cream sticker, coral rim, diagonal scratches
  L10.scuff = (parent, x, y, r = 40) => {
    const n = L10.node(parent, x, y);
    const s = K.shadow(n, 1);
    K.paper(s, K.cutEll(0, 0, r, r, 1.4), C.cream);
    K.paper(n, K.cutEll(0, 0, r * 0.82, r * 0.82, 1), C.coral);
    [[-0.5, -0.1, 0.3, -0.7], [-0.62, 0.2, 0.55, -0.35], [-0.4, 0.55, 0.62, 0.0]].forEach(([a, b, c, d]) => K.ink(n, [[a * r, b * r], [c * r, d * r]], Math.max(3, r * 0.1), C.cream));
    K.ink(n, [[0.1 * r, 0.1 * r], [0.2 * r, 0.32 * r], [0.05 * r, 0.5 * r]], Math.max(2.5, r * 0.07), C.cream);
    return n;
  };
  // small calendar page (month bin)
  L10.calPage = (parent, x, y, month, o = {}) => {
    const w = o.w || 340, h = o.h || 300, n = L10.node(parent, x, y);
    K.tex(K.shadow(n, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 22), "pat-paper");
    K.paper(n, K.cutRect(-w / 2 + 6, -h / 2 + 6, w - 12, 62, 1.4, 20), o.col || C.coral);
    K.text(n, 0, -h / 2 + 38, month, { size: 44, weight: 800, color: K.onColor(o.col || C.coral) });
    [-1, 1].forEach((sd) => K.paper(n, K.cutEll(sd * 80, -h / 2 + 4, 9, 9, 0.4), C.ink));
    if (o.dashed) K.el("path", { d: K.cutRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 1.2, 24), fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-dasharray": "18 12", "stroke-linecap": "round", opacity: 0.75 }, n);
    return n;
  };
  // dashed imagined bubble with content slot (thought-bubble style)
  L10.bubble = (parent, x, y, w, h) => {
    const n = L10.hide(L10.node(parent, x, y));
    K.paper(n, K.cutEll(0, 0, w / 2, h / 2, 2), C.cream, { opacity: 0.8 });
    K.el("path", { d: K.cutEll(0, 0, w / 2 - 6, h / 2 - 6, 1.4), fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-dasharray": "16 11", "stroke-linecap": "round", opacity: 0.75 }, n);
    [[-w * 0.18, h / 2 + 22, 15], [-w * 0.26, h / 2 + 56, 9]].forEach(([bx, by, br]) => K.paper(n, K.cutEll(bx, by, br, br, 0.6), C.cream, { opacity: 0.8 }));
    return n;
  };
  // the device's chip label is a kit constant (334 px wide): long account names go on two lines (30 px) with the amount below
  L10.twoLine = (root, label, lines) => {
    root.querySelectorAll("text").forEach((t) => {
      if (t.textContent !== label) return;
      t.textContent = lines[0]; t.setAttribute("y", "-36"); t.setAttribute("font-size", "31");
      const c = t.cloneNode(true); c.textContent = lines[1]; c.setAttribute("y", "-6"); t.parentNode.insertBefore(c, t.nextSibling);
      c.setAttribute("data-layout-allow-overlap", "true"); t.setAttribute("data-layout-allow-overlap", "true");
      t.parentNode.querySelectorAll("text").forEach((a) => { if (a !== t && a !== c && a.getAttribute("font-size") === "46") { a.setAttribute("y", "34"); a.setAttribute("font-size", "42"); } });
    });
  };

  // ------------------------------------------------------------------------------------------------ small Khata book (T-page) for recap scenes
  // closed → open ledger with left page (blue head) and right page (orange head); name label above.
  L10.book = (parent, x, y, s, name, o = {}) => {
    const n = L10.node(parent, x, y, s), b = K.g(n, {});
    const W = 420, Hh = 300;
    K.paper(K.shadow(b, 2), K.cutRect(-W / 2 - 10, -Hh - 8, W + 20, Hh + 16, 2.2, 22), C.redDark);
    const pages = { L: K.g(b, {}), R: K.g(b, {}) };
    [["L", -W / 2 + 4, C.dr], ["R", 4, C.cr]].forEach(([k, px, col]) => {
      K.tex(K.shadow(pages[k], 1), K.cutRect(px, -Hh, W / 2 - 8, Hh, 1.6, 20), "pat-paper");
      K.paper(pages[k], K.cutRect(px, -Hh, W / 2 - 8, 44, 1.2, 18), col, { opacity: 0.9 });
      K.text(pages[k], px + (W / 2 - 8) / 2, -Hh + 24, k === "L" ? "Dr" : "Cr", { size: 34, weight: 800, color: K.onColor(col) });
    });
    K.ink(b, [[0, -Hh], [0, 0]], 5, C.redDark);
    const lab = K.g(b, {});
    const lw = Math.max(240, name.length * 21 + 90);
    K.tex(K.shadow(lab, 1), K.cutRect(-lw / 2, -Hh - 92, lw, 70, 1.6, 20), "pat-paper");
    if (o.icon) K.medallion(lab, -lw / 2 + 40, -Hh - 57, 24, o.icon);
    K.text(lab, o.icon ? 22 : 0, -Hh - 55, name, { size: 38, weight: 800 });
    return { n, b, pages, lab, W, Hh, pageX: { L: -W / 4 - 2, R: W / 4 + 2 } };
  };
})();

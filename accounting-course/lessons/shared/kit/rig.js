// Paper cut-out ANIMATION RIG — load after kit.js. Extends window.KIT.
// Rules: everything deterministic + synchronous. Geometry that rotates/scales is drawn around its
// local (0,0) inside a positioning <g>, and tweened with svgOrigin "0 0" (exact joint pivot even
// inside scaled/flipped parents). Character acting is stepped "on twos" (12 fps) by default;
// pass {smooth:true} for 30 fps motion. See RIG.md.
(function () {
  const K = window.KIT, C = K.C;
  const { g, el, sh, paper, tex, ink, shadow, cutRect, cutEll, cutPoly, cutStroke, arc, pts2d } = K;
  const FPS = 15;   // 2 render frames per step at 30 fps — 12 fps gave uneven 3-2-3-2 holds (judder). research/paper-cutout-jitter.md
  const O = "0 0";

  // ---------- timing ----------
  // Ease quantised to the global 12 fps grid (when t0 is known) or to the tween's own steps.
  function stepEase(dur, ease = "power2.out", t0) {
    const f = typeof ease === "function" ? ease : gsap.parseEase(ease);
    if (t0 === undefined) {
      const n = Math.max(1, Math.round(dur * FPS));
      return (p) => (p >= 1 ? f(1) : f(Math.floor(p * n + 1e-6) / n));
    }
    return (p) => {
      if (p >= 1) return f(1);
      const tq = Math.floor((t0 + p * dur) * FPS + 1e-6) / FPS;
      return f(Math.min(1, Math.max(0, (tq - t0) / dur)));
    };
  }
  const q = (ease, dur, t0) => stepEase(dur, ease, t0);
  // tween helper used by every rig method
  function tw(tl, target, vars, t, dur, o = {}) {
    const ease = o.ease || vars.ease || "power2.out";
    tl.to(target, { ...vars, duration: dur, ease: o.smooth ? ease : stepEase(dur, ease, t) }, t);
  }
  // per-1/12s micro offsets on wrapper groups (replacement-animation wobble)
  function jitter(tl, els, t0, t1, o = {}) {
    // Disabled after the L01 review ("the shake hurts my eyes"): real cut-out pieces sit still unless they're moved.
    // Continuous per-step positional wobble on holds was the main source of eye strain. Kept as a no-op so calls stay valid.
    if (!o.force) return;
    const list = Array.isArray(els) ? els : [els];
    const rot = o.rot ?? 0.3, px = o.px ?? 0.7, seed = o.seed ?? 7;   // calmed after L01 review (was 0.6 / 1.5)
    const i0 = Math.ceil(t0 * FPS - 1e-6), i1 = Math.floor(t1 * FPS + 1e-6);
    list.forEach((e, k) => {
      if (!e) return;
      const s = seed * 1000 + k * 101;
      for (let i = i0; i < i1; i++) {
        tl.set(e, { x: sh(s + i * 17) * px, y: sh(s + i * 19 + 5) * px, rotation: sh(s + i * 13 + 9) * rot, transformOrigin: "50% 50%" }, i / FPS);
      }
      tl.set(e, { x: 0, y: 0, rotation: 0, transformOrigin: "50% 50%" }, i1 / FPS);
    });
  }
  // visibility swap between named sets (state machine evaluated at authoring time)
  function swapSet(tl, sets, name, t) {
    Object.entries(sets).forEach(([k, node]) => { if (node) tl.set(node, { opacity: k === name ? 1 : 0 }, t); });
  }
  function hideAll(sets, except) { Object.entries(sets).forEach(([k, n]) => n && n.setAttribute("opacity", k === except ? "1" : "0")); }

  // =====================================================================================
  // PEOPLE
  // =====================================================================================
  const NECK_Y = -440, SH_Y = -392, SH_X = 60, L1 = 104, L2 = 98;
  const EXPR = {
    neutral: ["open", "neutral", "flat"], happy: ["open", "neutral", "smile"], grin: ["open", "up", "grin"],
    joy: ["happy", "up", "grin"], puzzled: ["open", "puzzled", "wavy"], amazed: ["wide", "up", "o"], wow: ["wide", "up", "o"],
    worried: ["worried", "worried", "worried"], sad: ["worried", "worried", "worried"], thinking: ["open", "puzzled", "flat"],
    angry: ["open", "angry", "flat"], sleep: ["closed", "neutral", "flat"], talk: ["open", "up", "talk"], proud: ["happy", "neutral", "smile"],
  };
  const SHRUG = { L: [8, 96], R: [8, 96] };

  function buildFace(head, P) {
    // head-local coords: neck pivot is (0,0); face centre ≈ (0,-52)
    const cx = 0, cy = -52, dx = 21;
    const cheeks = g(head, {});
    paper(cheeks, cutEll(cx - 33, cy + 20, 11, 7, 0.6), C.pink, { opacity: 0.75 });
    paper(cheeks, cutEll(cx + 33, cy + 20, 11, 7, 0.6), C.pink, { opacity: 0.75 });
    const eyes = {}, pupils = [];
    eyes.open = g(head, {});
    [-1, 1].forEach((sd) => paper(eyes.open, cutEll(cx + sd * dx, cy - 2, 11, 13, 0.8), C.white));
    const po = g(eyes.open, {}); pupils.push(po);
    [-1, 1].forEach((sd) => { paper(po, cutEll(cx + sd * dx, cy + 1, 6.5, 6.5, 0.4), C.ink); paper(po, cutEll(cx + sd * dx - 2, cy - 2, 2.2, 2.2, 0.2), C.white); });
    eyes.wide = g(head, {});
    [-1, 1].forEach((sd) => paper(eyes.wide, cutEll(cx + sd * dx, cy - 4, 14, 16, 0.8), C.white));
    const pw = g(eyes.wide, {}); pupils.push(pw);
    [-1, 1].forEach((sd) => paper(pw, cutEll(cx + sd * dx, cy - 3, 5.5, 5.5, 0.4), C.ink));
    eyes.worried = g(head, {});
    [-1, 1].forEach((sd) => paper(eyes.worried, cutEll(cx + sd * dx, cy, 10.5, 11, 0.8), C.white));
    const pwo = g(eyes.worried, {}); pupils.push(pwo);
    [-1, 1].forEach((sd) => paper(pwo, cutEll(cx + sd * dx, cy + 3, 6, 6, 0.4), C.ink));
    eyes.closed = g(head, {});
    [-1, 1].forEach((sd) => ink(eyes.closed, arc(cx + sd * dx, cy - 6, 10, Math.PI * 0.12, Math.PI * 0.88, 8), 4.5));
    eyes.happy = g(head, {});
    [-1, 1].forEach((sd) => ink(eyes.happy, arc(cx + sd * dx, cy + 4, 10, Math.PI * 1.12, Math.PI * 1.88, 8), 4.8));

    const brows = {};
    const brow = (grp, sd, lift = 0, tilt = 0) => ink(grp, [[cx + sd * 12, cy - 24 - lift + tilt], [cx + sd * 30, cy - 26 - lift - tilt * 0.6]], 4.5);
    brows.neutral = g(head, {}); brow(brows.neutral, -1); brow(brows.neutral, 1);
    brows.up = g(head, {}); brow(brows.up, -1, 8); brow(brows.up, 1, 8);
    brows.worried = g(head, {}); brow(brows.worried, -1, 6, -6); brow(brows.worried, 1, 6, -6);
    brows.angry = g(head, {}); brow(brows.angry, -1, -2, 6); brow(brows.angry, 1, -2, 6);
    brows.puzzled = g(head, {}); brow(brows.puzzled, -1, 0); brow(brows.puzzled, 1, 10, -3);

    const mouths = {}, my = cy + 18;
    mouths.smile = g(head, {}); ink(mouths.smile, arc(cx, my, 14, Math.PI * 0.15, Math.PI * 0.85, 8), 4.5);
    mouths.grin = g(head, {});
    paper(mouths.grin, pts2d([[cx - 17, my], [cx + 17, my], ...arc(cx, my, 17, 0, Math.PI, 8).slice(1, -1)]), C.ink);
    paper(mouths.grin, cutEll(cx, my + 11, 8, 4, 0.4), C.pink);
    mouths.o = g(head, {}); paper(mouths.o, cutEll(cx, my + 8, 8, 10, 0.5), C.ink);
    mouths.flat = g(head, {}); ink(mouths.flat, [[cx - 11, my + 7], [cx + 11, my + 7]], 4.5);
    mouths.worried = g(head, {}); ink(mouths.worried, arc(cx, my + 14, 12, Math.PI * 1.15, Math.PI * 1.85, 8), 4.5);
    mouths.wavy = g(head, {}); ink(mouths.wavy, [[cx - 10, my + 7], [cx - 3, my + 3], [cx + 4, my + 7], [cx + 11, my + 3]], 4.5);
    mouths.talk = g(head, {}); paper(mouths.talk, cutEll(cx, my + 7, 10, 6, 0.5), C.ink);
    return { eyes, brows, mouths, pupils, cheeks };
  }

  function buildArm(parent, side, P) {
    const sleeve = P.top, fore = P.longSleeve ? P.top : P.skin;
    const pos = g(parent, { transform: `translate(${side * SH_X} ${SH_Y})` });
    const upper = g(pos, {});
    const su = shadow(upper, 1);
    paper(su, cutEll(0, 2, 23, 23, 1), sleeve);
    paper(su, cutStroke([[0, -6], [0, L1]], 38, 1.4), sleeve);
    const elbowPos = g(upper, { transform: `translate(0 ${L1})` });
    const foreG = g(elbowPos, {});
    const sf = shadow(foreG, 1);
    paper(sf, cutEll(0, 0, 16, 16, 0.8), fore);
    paper(sf, cutStroke([[0, 0], [0, L2]], 31, 1.2), fore);
    const handPos = g(foreG, { transform: `translate(0 ${L2})` });
    paper(shadow(handPos, 1), cutEll(0, 2, 17, 17, 1.2), P.skin);
    const anchor = g(handPos, {});
    paper(foreG, cutEll(0, 0, 5, 5, 0.5), C.gold); // elbow brad
    paper(pos, cutEll(0, 0, 6, 6, 0.6), C.gold); // shoulder brad
    return { pos, upper, fore: foreG, hand: handPos, anchor, side };
  }

  function person(parent, x, y, s, P) {
    const fs = P.flip ? -1 : 1;
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${fs * s} ${s})` });
    const mover = g(root, {});
    el("ellipse", { cx: 0, cy: 2, rx: P.sit ? 110 : 78, ry: 12, fill: "#3b2614", "fill-opacity": 0.22 }, mover);
    const jit = g(mover, {});
    const lift = g(jit, {});
    const body = g(lift, {});
    const sit = P.sit ? 110 : 0;
    if (!P.noLegs) {
      const legs = shadow(body, 1);
      if (P.sit) { paper(legs, cutRect(-48, -70, 40, 58, 1.5, 14), P.legs); paper(legs, cutRect(8, -70, 40, 58, 1.5, 14), P.legs); }
      else { paper(legs, cutRect(-44, -190, 40, 176, 1.5, 18), P.legs); paper(legs, cutRect(4, -190, 40, 176, 1.5, 18), P.legs); }
      paper(legs, cutEll(-28, -10, 26, 12, 1), P.shoes || "#4a2f25");
      paper(legs, cutEll(28, -10, 26, 12, 1), P.shoes || "#4a2f25");
    }
    const top = g(body, { transform: `translate(0 ${sit})` });
    const T = P.topBottom || -165;
    // head position group (neck pivot), back hair goes behind the torso
    const back = g(top, {});
    const torso = shadow(top, 2);
    const bw = P.belly ? 104 : 84;
    paper(torso, cutPoly([[-62, -400], [62, -400], [bw, T], [-bw, T]], 2.2, 22), P.top);
    if (P.belly) paper(torso, cutEll(0, -270, 92, 96, 2), P.top);
    if (P.apron) {
      paper(torso, cutPoly([[-50, -345], [50, -345], [60, T - 12], [-60, T - 12]], 1.8, 20), C.apron);
      ink(top, [[-44, -345], [-16, -400]], 7, C.apron); ink(top, [[44, -345], [16, -400]], 7, C.apron);
      paper(top, cutRect(-30, -280, 60, 44, 1.2, 14), "#24877c");
    }
    if (P.lanyard) { ink(top, [[-18, -398], [0, -320], [18, -398]], 5, C.coral); paper(shadow(top, 1), cutRect(-18, -322, 36, 46, 1, 12), C.white); }
    paper(top, cutRect(-15, -445, 30, 52, 1, 12), P.skin);
    if (P.collar) paper(top, cutPoly([[-22, -402], [0, -372], [22, -402]], 1, 12), P.skin);
    // HEAD (pivot at neck) — draw in head-local coords (y + 440)
    const headPos = g(top, { transform: `translate(0 ${NECK_Y})` });
    const head = g(headPos, {});
    const Y = (v) => v - NECK_Y;
    const headBack = g(head, {});
    if (P.hair === "bun" || P.hair === "pony") paper(shadow(headBack, 1), cutEll(0, Y(-505), 66, 72, 1.6), C.hair);
    if (P.hair === "pony") paper(shadow(headBack, 1), cutPoly([[30, Y(-520)], [70, Y(-480)], [60, Y(-400)], [36, Y(-420)]], 2, 14), C.hair);
    const hs = shadow(head, 1);
    paper(hs, cutEll(-56, Y(-495), 11, 15, 0.8), P.skin);
    paper(hs, cutEll(56, Y(-495), 11, 15, 0.8), P.skin);
    paper(hs, cutEll(0, Y(-494), 57, 63, 1.4), P.skin);
    if (P.earrings) { paper(head, cutEll(-57, Y(-474), 5, 5, 0.4), C.gold); paper(head, cutEll(57, Y(-474), 5, 5, 0.4), C.gold); }
    if (P.hair === "bun" || P.hair === "pony") paper(head, cutPoly([...arc(0, Y(-500), 64, Math.PI * 1.02, Math.PI * 1.98, 14), [44, Y(-520)], [10, Y(-540)], [-20, Y(-528)], [-50, Y(-505)]], 1.4, 14), C.hair);
    if (P.hair === "bun") {
      paper(shadow(head, 1), cutEll(26, Y(-572), 36, 32, 1.4), C.hair);
      const pg = shadow(head, 1);
      paper(pg, cutStroke([[-22, Y(-606)], [74, Y(-548)]], 11, 0.6), C.gold);
      paper(pg, cutStroke([[74, Y(-548)], [88, Y(-540)]], 11, 0.4), C.pink);
      paper(pg, cutPoly([[-22, Y(-612)], [-22, Y(-600)], [-38, Y(-614)]], 0.3, 12), "#e8c9a0");
    }
    if (P.hair === "bald") {
      paper(head, cutPoly([[-60, Y(-500)], [-58, Y(-530)], [-44, Y(-540)], [-40, Y(-505)]], 1, 10), C.grey);
      paper(head, cutPoly([[60, Y(-500)], [58, Y(-530)], [44, Y(-540)], [40, Y(-505)]], 1, 10), C.grey);
    }
    if (P.topi) paper(shadow(head, 1), cutPoly([[-58, Y(-538)], [58, Y(-538)], [44, Y(-582)], [-44, Y(-582)]], 1.5, 16), C.white);
    const F = buildFace(head, P);
    if (P.moustache) paper(head, cutPoly([[-34, Y(-466)], [-4, Y(-476)], [0, Y(-470)], [4, Y(-476)], [34, Y(-466)], [24, Y(-458)], [0, Y(-464)], [-24, Y(-458)]], 0.8, 8), C.grey);
    if (P.glasses) { ink(head, arc(-21, Y(-492), 16, 0, Math.PI * 2, 14), 3.5); ink(head, arc(21, Y(-492), 16, 0, Math.PI * 2, 14), 3.5); }
    // ARMS (last → over torso)
    const armL = buildArm(top, -1, P), armR = buildArm(top, 1, P);
    const arms = { L: armL, R: armR };
    const setArmAttr = (a, sh_, el_) => {
      const sgn = a.side < 0 ? 1 : -1;
      a.upper.setAttribute("transform", `rotate(${sgn * sh_})`);
      a.fore.setAttribute("transform", `rotate(${sgn * el_})`);
    };
    const aL = P.aL || [12, 8], aR = P.aR || [12, 8];
    setArmAttr(armL, aL[0], aL[1]); setArmAttr(armR, aR[0], aR[1]);
    // initial expression
    const ex0 = EXPR[P.expr || "happy"] || EXPR.happy;
    hideAll(F.eyes, ex0[0]); hideAll(F.brows, ex0[1]); hideAll(F.mouths, ex0[2]);
    if (P.lookX || P.lookY) F.pupils.forEach((p) => p.setAttribute("transform", `translate(${P.lookX || 0} ${P.lookY || 0})`));

    // world hand positions at build pose (back-compat with the stills kit)
    const handWorld = (side, a) => {
      const sx = side * SH_X, sy = SH_Y, A1 = (a[0] * Math.PI) / 180, A2 = ((a[0] + a[1]) * Math.PI) / 180;
      const ex = sx + side * Math.sin(A1) * L1, ey = sy + Math.cos(A1) * L1;
      const hx = ex + side * Math.sin(A2) * L2, hy = ey + Math.cos(A2) * L2;
      return [x + fs * hx * s, y + (hy + sit) * s];
    };

    const st = { arm: { L: aL.slice(), R: aR.slice() }, exprAt: [[-1e9, P.expr || "happy"]], lean: 0 };
    const exprAt = (t) => { let cur = st.exprAt[0][1]; for (const [tt, n] of st.exprAt) if (tt <= t + 1e-6) cur = n; return cur; };

    const rig = {
      g: root, root, mover, jit, lift, body, top, head, headPos, arms, face: F, handL: handWorld(-1, aL), handR: handWorld(1, aR),
      x, y, s, flip: !!P.flip,
      handAnchor: (side) => (side === "L" || side < 0 ? armL.anchor : armR.anchor),
      expr(tl, t, name, o = {}) {
        const e = EXPR[name] || EXPR.happy;
        if (!o.noTake) {
          tl.to(body, { scaleY: 0.965, scaleX: 1.02, svgOrigin: O, duration: 1 / FPS, ease: "none" }, t);
          tl.to(body, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 1 / FPS, ease: "none" }, t + 2 / FPS);
        }
        const ts = t + (o.noTake ? 0 : 1 / FPS);
        swapSet(tl, F.eyes, e[0], ts); swapSet(tl, F.brows, e[1], ts); swapSet(tl, F.mouths, e[2], ts);
        st.exprAt.push([ts, name]); st.exprAt.sort((a, b) => a[0] - b[0]);
        return rig;
      },
      blink(tl, t) {
        const e = EXPR[exprAt(t)] || EXPR.happy;
        if (!["open", "wide", "worried"].includes(e[0])) return rig;
        tl.set(F.eyes[e[0]], { opacity: 0 }, t); tl.set(F.eyes.closed, { opacity: 1 }, t);
        tl.set(F.eyes.closed, { opacity: 0 }, t + 2 / FPS); tl.set(F.eyes[e[0]], { opacity: 1 }, t + 2 / FPS);
        return rig;
      },
      blinks(tl, t0, t1, every = 3.1, seed = 3) { for (let t = t0 + 0.8 + sh(seed) * 0.4, i = 0; t < t1 - 0.3; t += every + sh(seed + ++i) * 0.9) rig.blink(tl, t); return rig; },
      look(tl, t, dx, dy, o = {}) { F.pupils.forEach((p) => tw(tl, p, { x: dx, y: dy }, t, o.dur ?? 0.17, o)); return rig; },
      headTilt(tl, t, deg, o = {}) { tw(tl, head, { rotation: deg, svgOrigin: O }, t, o.dur ?? 0.25, o); return rig; },
      arm(tl, t, side, shDeg, elDeg, dur = 0.33, o = {}) {
        const a = side === "L" || side < 0 ? armL : armR, key = a === armL ? "L" : "R", sgn = a.side < 0 ? 1 : -1;
        tw(tl, a.upper, { rotation: sgn * shDeg, svgOrigin: O }, t, dur, o);
        tw(tl, a.fore, { rotation: sgn * elDeg, svgOrigin: O }, t + (o.lag ?? 1 / FPS) * (dur > 0.2 ? 1 : 0), dur, o);
        st.arm[key] = [shDeg, elDeg];
        return rig;
      },
      pose(tl, t, p = {}, o = {}) {
        const dur = p.dur ?? 0.35;
        if (p.aL) rig.arm(tl, t, "L", p.aL[0], p.aL[1], dur, o);
        if (p.aR) rig.arm(tl, t + 1 / FPS, "R", p.aR[0], p.aR[1], dur, o); // no twinning
        if (p.lean !== undefined) { tw(tl, body, { rotation: p.lean, svgOrigin: O }, t, dur, o); st.lean = p.lean; }
        if (p.head !== undefined) rig.headTilt(tl, t, p.head, o);
        return rig;
      },
      shrug(tl, t, hold = 0.7, o = {}) {
        const prev = { L: st.arm.L.slice(), R: st.arm.R.slice() };
        rig.arm(tl, t, "L", SHRUG.L[0], SHRUG.L[1], 0.25, o); rig.arm(tl, t, "R", SHRUG.R[0], SHRUG.R[1], 0.25, o);
        tw(tl, lift, { y: -10 }, t, 0.2, o); rig.headTilt(tl, t, -7, o);
        tw(tl, lift, { y: 0 }, t + 0.25 + hold, 0.25, o); rig.headTilt(tl, t + 0.25 + hold, 0, o);
        if (!o.keep) { rig.arm(tl, t + 0.25 + hold, "L", prev.L[0], prev.L[1], 0.3, o); rig.arm(tl, t + 0.25 + hold, "R", prev.R[0], prev.R[1], 0.3, o); }
        return rig;
      },
      wave(tl, t, side = "R", beats = 3, o = {}) {
        const key = side === "L" || side < 0 ? "L" : "R", prev = st.arm[key].slice();
        rig.arm(tl, t, key, 150, -20, 0.25, o);
        const a = key === "L" ? armL : armR, sgn = a.side < 0 ? 1 : -1;
        for (let i = 0; i < beats * 2; i++) tw(tl, a.fore, { rotation: sgn * (i % 2 ? -20 : 25), svgOrigin: O }, t + 0.25 + i * 0.17, 0.17, { ...o, ease: "sine.inOut" });
        if (!o.keep) rig.arm(tl, t + 0.3 + beats * 0.34, key, prev[0], prev[1], 0.3, o);
        return rig;
      },
      point(tl, t, side = "R", angle = 90, o = {}) { return rig.arm(tl, t, side, angle, o.elbow ?? 4, o.dur ?? 0.3, o); },
      hop(tl, t, o = {}) {
        const h = o.height ?? 60;
        tl.to(body, { scaleY: 0.9, scaleX: 1.06, svgOrigin: O, duration: 0.12, ease: stepEase(0.12, "power2.out", t) }, t);
        tl.to(lift, { y: -h, duration: 0.22, ease: o.smooth ? "power3.out" : stepEase(0.22, "power3.out", t + 0.12) }, t + 0.12);
        tl.to(body, { scaleY: 1.06, scaleX: 0.96, svgOrigin: O, duration: 0.22, ease: stepEase(0.22, "power3.out", t + 0.12) }, t + 0.12);
        tl.to(lift, { y: 0, duration: 0.18, ease: o.smooth ? "power2.in" : stepEase(0.18, "power2.in", t + 0.34) }, t + 0.34);
        tl.to(body, { scaleY: 0.92, scaleX: 1.05, svgOrigin: O, duration: 0.08, ease: "none" }, t + 0.52);
        tl.to(body, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 0.25, ease: stepEase(0.25, "back.out(1.6)", t + 0.6) }, t + 0.6);
        return rig;
      },
      walkTo(tl, t, wx, dur = 1.2, o = {}) {
        const dx = (wx - x) / (fs * s);
        tl.to(mover, { x: dx, duration: dur, ease: o.smooth ? "power1.inOut" : stepEase(dur, "power1.inOut", t) }, t);
        const steps = Math.max(2, Math.round(dur / 0.25));
        for (let i = 0; i < steps; i++) tl.set(lift, { y: i % 2 ? 0 : -8 }, t + (i * dur) / steps);
        tl.set(lift, { y: 0 }, t + dur);
        return rig;
      },
      lean(tl, t, deg, o = {}) { tw(tl, body, { rotation: deg, svgOrigin: O }, t, o.dur ?? 0.3, o); st.lean = deg; return rig; },
      jitter(tl, t0, t1, o = {}) { jitter(tl, [jit], t0, t1, { seed: (o.seed ?? 11) + Math.round(x), ...o }); return rig; },
    };
    return rig;
  }

  const meera = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: C.skin, top: C.mustard, legs: C.cream, apron: true, hair: "bun", earrings: true, collar: true, aL: [12, 8], aR: [12, 8], ...o,
  });
  const raviMama = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: "#a96a45", top: C.white, legs: C.white, belly: true, hair: "bald", moustache: true, longSleeve: true,
    topBottom: -150, shoes: "#3b2a20", aL: [12, 8], aR: [12, 8], ...o,
  });
  const priya = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: "#c08560", top: C.sky, legs: "#34405a", hair: "pony", lanyard: true, collar: true, longSleeve: true,
    topBottom: -215, aL: [12, 8], aR: [12, 8], ...o,
  });
  const merchant = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: "#a96a45", top: C.white, legs: C.white, hair: "bald", moustache: true, topi: true, longSleeve: true,
    noLegs: true, aL: [12, 8], aR: [12, 8], ...o,
  });

  // =====================================================================================
  // KHATA (the mascot) — face on the spine, always
  // =====================================================================================
  const KX = 86, PANEL = 346, ARM_Y = -190;
  function khataRig(parent, x, y, s = 1, o = {}) {
    const open0 = !!o.open;
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const mover = g(root, {});
    const gshadow = el("ellipse", { cx: 0, cy: 2, rx: 150, ry: 18, fill: "#3b2614", "fill-opacity": 0.25 }, mover);
    if (open0) gshadow.setAttribute("transform", `scale(${430 / 150} 1)`);
    const jit = g(mover, {});
    const lift = g(jit, {});
    const body = g(lift, {});
    const feet = shadow(body, 1);
    paper(feet, cutRect(-64, -32, 46, 36, 2, 14), C.redDark);
    paper(feet, cutRect(18, -32, 46, 36, 2, 14), C.redDark);
    // page panels (scaleX from the spine edge)
    const panels = {}, tints = {}, pageArea = {};
    [-1, 1].forEach((side) => {
      const key = side < 0 ? "L" : "R";
      const pos = g(body, { transform: `translate(${side * KX} 0)` });
      const pn = g(pos, { transform: open0 ? "" : "scale(0.04 1)" });
      const x0 = side < 0 ? -PANEL : 0;
      const board = shadow(pn, 2);
      paper(board, cutRect(x0, -362, PANEL, 334, 3), C.redDark);
      tex(board, cutRect(side < 0 ? -340 : 0, -374, 340, 332, 3), "pat-cover");
      const pg = shadow(pn, 1);
      const px = side < 0 ? -326 : 8;
      tex(pg, cutRect(px, -358, 318, 302, 2.4), "pat-paper");
      if (!o.blankPages) for (let i = 0; i < 6; i++) {
        const yy = -300 + i * 40, wv = [];
        for (let k = 0; k <= 10; k++) wv.push([px + 14 + k * 29, yy + sh(side * 300 + k + i * 11) * 1.2]);
        el("path", { d: "M" + wv.map((p) => p.join(",")).join(" L"), fill: "none", stroke: "#a39684", "stroke-width": 2, opacity: 0.7 }, pg);
      }
      el("path", { d: "M" + (side < 0 ? px + 58 : px + 260) + ",-350 L" + (side < 0 ? px + 58 : px + 260) + ",-66", stroke: "#d98b80", "stroke-width": 2.5, opacity: 0.8, fill: "none" }, pg);
      const tintPos = g(pn, { transform: `translate(${px + 159} -207)` });
      const tint = g(tintPos, { opacity: 0 });
      paper(shadow(tint, 1), cutRect(-149, -141, 298, 282, 3), side < 0 ? C.dr : C.cr);
      tints[key] = tint;
      const content = g(pn, {});
      pageArea[key] = { g: content, x: px, y: -358, w: 318, h: 302 };
      if (o.pageContent) o.pageContent(content, side, px);
      panels[key] = pn;
    });
    // arms (slide out to the panel edge when open)
    const arms = {};
    [-1, 1].forEach((side) => {
      const key = side < 0 ? "L" : "R";
      const pos = g(body, { transform: `translate(${side * KX} ${ARM_Y})` });
      const slide = g(pos, { transform: open0 ? `translate(${side * PANEL} 0)` : "" });
      const ang = (side < 0 ? o.armL : o.armR) ?? (open0 ? 20 : 15);
      const A = g(slide, { transform: `rotate(${side < 0 ? ang : -ang})` });
      const st = shadow(A, 1);
      paper(st, cutStroke([[0, 0], [side * 28, 8], [side * 50, 22], [side * 62, 32]], 20, 1.4), C.redShade);
      paper(st, cutEll(side * 64, 34, 16, 16, 1.5), C.redShade);
      const hand = g(A, { transform: `translate(${side * 64} 34)` });
      paper(A, cutEll(0, 0, 7, 7, 0.8), C.gold);
      arms[key] = { slide, arm: A, hand, side };
    });
    // spine
    const sp = shadow(body, 2);
    tex(sp, cutRect(-90, -392, 180, 370, 3), "pat-cover");
    el("path", { d: cutRect(36, -388, 50, 362, 2), fill: "#000", opacity: 0.16 }, sp);
    const band = shadow(body, 1);
    paper(band, cutRect(-92, -113, 184, 16, 1.5, 18), C.gold);
    paper(band, cutStroke(arc(-22, -118, 18, Math.PI * 0.05, Math.PI * 1.95, 14), 8, 1), C.gold);
    paper(band, cutStroke(arc(22, -118, 18, -Math.PI * 0.95, Math.PI * 0.95, 14), 8, 1), C.gold);
    paper(band, cutStroke([[-4, -104], [-18, -70]], 8, 1), C.gold);
    paper(band, cutStroke([[4, -104], [18, -70]], 8, 1), C.gold);
    paper(band, cutEll(0, -106, 10, 10, 1), C.gold);
    // face sets
    const fc = g(body, {});
    paper(fc, cutEll(-50, -212, 18, 11, 1.2), C.pink, { opacity: 0.85 });
    paper(fc, cutEll(50, -212, 18, 11, 1.2), C.pink, { opacity: 0.85 });
    const eyes = {}, pupils = [];
    const eyeOpen = (grp, ex, big = 1, prad = 13) => {
      paper(shadow(grp, 1), cutEll(ex, -268, 25 * big, 30 * big, 1.6), C.white);
      const p = g(grp, {}); pupils.push(p);
      paper(p, cutEll(ex, -264, prad, prad, 1), C.ink);
      paper(p, cutEll(ex - 4, -269, 4.5, 4.5, 0.5), C.white);
    };
    eyes.open = g(fc, {}); [-38, 38].forEach((ex) => eyeOpen(eyes.open, ex));
    eyes.wide = g(fc, {}); [-38, 38].forEach((ex) => eyeOpen(eyes.wide, ex, 1.18, 10));
    eyes.sleep = g(fc, {}); [-38, 38].forEach((ex) => ink(eyes.sleep, arc(ex, -282, 20, Math.PI * 0.15, Math.PI * 0.85, 10), 7));
    eyes.happy = g(fc, {}); [-38, 38].forEach((ex) => ink(eyes.happy, arc(ex, -256, 20, Math.PI * 1.15, Math.PI * 1.85, 10), 7.5));
    eyes.wink = g(fc, {}); eyeOpen(eyes.wink, -38); ink(eyes.wink, arc(38, -278, 22, Math.PI * 0.15, Math.PI * 0.85, 10), 7);
    const mouths = {};
    mouths.smile = g(fc, {});
    paper(shadow(mouths.smile, 1), pts2d([[-22, -212], [0, -207], [22, -212], ...arc(0, -212, 22, 0, Math.PI, 10).slice(1, -1).map(([px, py]) => [px, -212 + (py + 212) * 1.2])]), C.ink);
    paper(mouths.smile, cutEll(0, -192, 10, 6, 0.6), C.pink);
    mouths.sleep = g(fc, {}); ink(mouths.sleep, arc(0, -214, 10, Math.PI * 0.2, Math.PI * 0.8, 8), 5);
    mouths.o = g(fc, {}); paper(mouths.o, cutEll(0, -198, 12, 14, 0.6), C.ink);
    const KEXPR = { sleep: ["sleep", "sleep"], awake: ["open", "smile"], happy: ["happy", "smile"], wink: ["wink", "smile"], wow: ["wide", "o"] };
    const e0 = KEXPR[o.expr || "awake"]; hideAll(eyes, e0[0]); hideAll(mouths, e0[1]);
    if (o.lookX || o.lookY) pupils.forEach((p) => p.setAttribute("transform", `translate(${o.lookX || 0} ${o.lookY || 0})`));
    // emotes (outside the squash group)
    const em = g(mover, {});
    const mk = (tx, ty) => { const pos = g(em, { transform: `translate(${tx} ${ty})` }); return g(pos, { transform: "scale(0)" }); };
    const zs = [[108, -400, 1], [150, -458, 1.25], [200, -524, 1.5]].map(([zx, zy, zsc]) => {
      const z = mk(zx, zy);
      paper(shadow(z, 1), cutStroke([[-12 * zsc, -12 * zsc], [12 * zsc, -12 * zsc], [-12 * zsc, 12 * zsc], [12 * zsc, 12 * zsc]], 7, 0.8), C.ink);
      return z;
    });
    const bang = mk(140, -470);
    paper(shadow(bang, 1), cutRect(-9, -60, 18, 42, 1, 10), C.cr); paper(shadow(bang, 1), cutEll(0, -4, 10, 10, 0.8), C.cr);
    const qm = mk(-160, -470); K.qmark(qm, 0, 0, 1.3, C.dr);
    const sparks = [[160, -430, 1], [230, -340, 0.6], [-210, -410, 0.75]].map(([sx, sy, ss]) => { const p = mk(sx, sy); K.sparkle(p, 0, 0, 28 * ss); return p; });

    const kst = { open: open0, expr: o.expr || "awake" };
    const rig = {
      g: root, root, mover, jit, lift, body, panels, tints, pageArea, arms, face: { eyes, mouths, pupils }, emotes: { zs, bang, qm, sparks }, shadow: gshadow,
      x, y, s,
      handAnchor: (side) => (side === "L" || side < 0 ? arms.L.hand : arms.R.hand),
      open(tl, t, dur = 0.55, o2 = {}) {
        tw(tl, body, { scaleX: 0.94, scaleY: 1.04, svgOrigin: O }, t, 0.16, o2);
        tw(tl, body, { scaleX: 1, scaleY: 1, svgOrigin: O }, t + 0.16, 0.4, { ...o2, ease: "back.out(1.6)" });
        ["L", "R"].forEach((k) => {
          tw(tl, panels[k], { scaleX: 1, svgOrigin: O }, t + 0.16, dur, { ...o2, ease: "back.out(1.4)" });
          tw(tl, arms[k].slide, { x: arms[k].side * PANEL }, t + 0.16, dur, { ...o2, ease: "back.out(1.4)" });
        });
        tw(tl, gshadow, { scaleX: 430 / 150, svgOrigin: "0 0" }, t + 0.16, dur, o2);
        kst.open = true; return rig;
      },
      close(tl, t, dur = 0.4, o2 = {}) {
        ["L", "R"].forEach((k) => {
          tw(tl, panels[k], { scaleX: 0.04, svgOrigin: O }, t, dur, { ...o2, ease: "power2.in" });
          tw(tl, arms[k].slide, { x: 0 }, t, dur, { ...o2, ease: "power2.in" });
        });
        tw(tl, gshadow, { scaleX: 1, svgOrigin: "0 0" }, t, dur, o2);
        tw(tl, body, { scaleY: 0.92, scaleX: 1.05, svgOrigin: O }, t + dur, 0.08, o2);
        tw(tl, body, { scaleY: 1, scaleX: 1, svgOrigin: O }, t + dur + 0.08, 0.3, { ...o2, ease: "back.out(1.6)" });
        kst.open = false; return rig;
      },
      expr(tl, t, name, o2 = {}) {
        const e = KEXPR[name] || KEXPR.awake;
        if (!o2.noTake) { tl.to(body, { scaleY: 0.96, scaleX: 1.025, svgOrigin: O, duration: 1 / FPS, ease: "none" }, t); tl.to(body, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 1 / FPS, ease: "none" }, t + 2 / FPS); }
        const ts = t + (o2.noTake ? 0 : 1 / FPS);
        swapSet(tl, eyes, e[0], ts); swapSet(tl, mouths, e[1], ts);
        kst.expr = name; return rig;
      },
      blink(tl, t) {
        tl.set(eyes.open, { opacity: 0 }, t); tl.set(eyes.sleep, { opacity: 1 }, t);
        tl.set(eyes.sleep, { opacity: 0 }, t + 2 / FPS); tl.set(eyes.open, { opacity: 1 }, t + 2 / FPS);
        return rig;
      },
      look(tl, t, dx, dy, o2 = {}) { pupils.forEach((p) => tw(tl, p, { x: dx, y: dy }, t, o2.dur ?? 0.17, o2)); return rig; },
      arm(tl, t, side, deg, dur = 0.3, o2 = {}) {
        const a = side === "L" || side < 0 ? arms.L : arms.R;
        tw(tl, a.arm, { rotation: a.side < 0 ? deg : -deg, svgOrigin: O }, t, dur, o2); return rig;
      },
      hop(tl, t, o2 = {}) {
        const h = o2.height ?? 80;
        tl.to(body, { scaleY: 0.88, scaleX: 1.08, svgOrigin: O, duration: 0.14, ease: stepEase(0.14, "power2.out", t) }, t);
        tl.to(lift, { y: -h, duration: 0.24, ease: o2.smooth ? "power3.out" : stepEase(0.24, "power3.out", t + 0.14) }, t + 0.14);
        tl.to(body, { scaleY: 1.08, scaleX: 0.94, svgOrigin: O, duration: 0.24, ease: stepEase(0.24, "power3.out", t + 0.14) }, t + 0.14);
        tl.to(gshadow, { scale: kst.open ? 2.0 : 0.7, svgOrigin: "0 0", duration: 0.24, ease: stepEase(0.24, "power3.out", t + 0.14) }, t + 0.14);
        tl.to(lift, { y: 0, duration: 0.2, ease: o2.smooth ? "power2.in" : stepEase(0.2, "power2.in", t + 0.38) }, t + 0.38);
        tl.to(gshadow, { scaleX: kst.open ? 430 / 150 : 1, scaleY: 1, svgOrigin: "0 0", duration: 0.2, ease: stepEase(0.2, "power2.in", t + 0.38) }, t + 0.38);
        tl.to(body, { scaleY: 0.9, scaleX: 1.06, svgOrigin: O, duration: 0.08, ease: "none" }, t + 0.58);
        tl.to(body, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 0.3, ease: stepEase(0.3, "back.out(1.6)", t + 0.66) }, t + 0.66);
        return rig;
      },
      wiggle(tl, t, o2 = {}) {
        tw(tl, body, { rotation: -5, svgOrigin: O }, t, 0.14, o2);
        tw(tl, body, { rotation: 5, svgOrigin: O }, t + 0.14, 0.2, { ...o2, ease: "power2.inOut" });
        tw(tl, body, { rotation: 0, svgOrigin: O }, t + 0.34, 0.3, { ...o2, ease: "back.out(1.6)" });
        return rig;
      },
      pageTint(tl, t, side, on = true, o2 = {}) {
        const k = side === "left" || side === "L" ? "L" : "R";
        if (on) { tl.set(tints[k], { scale: 1.12, svgOrigin: O }, t); tw(tl, tints[k], { opacity: 0.9, scale: 1, svgOrigin: O }, t, 0.25, { ...o2, ease: "power2.out" }); }
        else tw(tl, tints[k], { opacity: 0 }, t, 0.2, o2);
        return rig;
      },
      emote(tl, t, type, hold = 1.0, o2 = {}) {
        const list = type === "z" ? zs : type === "!" ? [bang] : type === "?" ? [qm] : sparks;
        list.forEach((n, i) => {
          const ti = t + i * (type === "z" ? 0.3 : 0.07);
          tl.set(n, { scale: 0, rotation: -15, svgOrigin: O }, ti);
          tw(tl, n, { scale: 1, rotation: 0, svgOrigin: O }, ti, 0.28, { ...o2, ease: "back.out(1.7)" });
          tw(tl, n, { scale: 0, svgOrigin: O }, ti + hold, 0.18, { ...o2, ease: "power2.in" });
        });
        return rig;
      },
      jitter(tl, t0, t1, o2 = {}) { jitter(tl, [jit], t0, t1, { seed: (o2.seed ?? 23) + Math.round(x), ...o2 }); return rig; },
    };
    return rig;
  }

  // =====================================================================================
  // KETTLE / GALLA / STALL with refs
  // =====================================================================================
  function kettle(parent, x, y, s = 1) {
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const b = shadow(grp, 1);
    paper(b, cutRect(-42, -20, 84, 22, 1.5, 14), "#3b3238");
    paper(b, cutEll(0, -58, 44, 38, 1.8), C.brass);
    paper(b, cutStroke([[36, -62], [64, -84], [74, -86]], 10, 1), C.brass);
    paper(b, cutStroke(arc(0, -92, 30, Math.PI, Math.PI * 2, 10), 7, 1), C.goldDark);
    paper(b, cutEll(0, -96, 10, 7, 1), C.goldDark);
    const steam = g(grp, {});
    const puffs = [[-10, -150], [16, -190], [-4, -230]].map(([sx, sy], i) => {
      const pp = g(steam, { transform: `translate(${sx} ${sy})` });
      const p = g(pp, {});
      paper(p, cutStroke(arc(0, 30, 14, Math.PI * 0.5, Math.PI * 1.5, 6), 8, 1.2), C.cream, { opacity: 0.85 - i * 0.2 });
      return p;
    });
    return { g: grp, steam, puffs,
      steamLoop(tl, t0, t1) { // stepped drifting puffs
        for (let i = Math.ceil(t0 * 6); i < Math.floor(t1 * 6); i++) puffs.forEach((p, k) => tl.set(p, { y: -((i + k * 2) % 6) * 6, x: sh(i * 3 + k) * 3, opacity: 1 - ((i + k * 2) % 6) / 7 }, i / 6));
      } };
  }

  function galla(parent, x, y, s = 1, o = {}) {
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const jit = g(grp, {});
    const body = g(jit, {});
    const lidPos = g(body, { transform: "translate(0 -110)" });
    const lidOpen = g(lidPos, { transform: o.open ? "" : "scale(1 0.08)" });
    paper(shadow(lidOpen, 2), cutPoly([[-95, 0], [95, 0], [105, -65], [-85, -55]], 2), C.woodDark);
    const b = shadow(body, 2);
    paper(b, cutRect(-100, -110, 200, 110, 2.5), C.wood);
    ink(body, [[-90, -60], [90, -60]], 3, C.woodDark, { opacity: 0.6 });
    const notes = g(body, { opacity: o.open && o.overflow ? 1 : 0 });
    for (let i = 0; i < 7; i++) K.note(notes, -70 + i * 24, -118 - (i % 3) * 10, 90, 46, sh(i + 70) * 18);
    for (let i = 0; i < 4; i++) K.coin(notes, -60 + i * 40, -120 + (i % 2) * 6, 16);
    const lidClosed = g(body, { opacity: o.open ? 0 : 1 });
    paper(shadow(lidClosed, 1), cutRect(-104, -128, 208, 26, 2), C.woodDark);
    const clasp = g(body, {});
    paper(shadow(clasp, 1), cutRect(-14, -96, 28, 30, 1.2, 10), C.brass);
    return {
      g: grp, jit, body, lidOpen, lidClosed, notes, clasp,
      open(tl, t, o2 = {}) {
        tl.set(lidClosed, { opacity: 0 }, t);
        tl.set(lidOpen, { scaleY: 0.08, svgOrigin: O }, t);
        tw(tl, lidOpen, { scaleY: 1, svgOrigin: O }, t, 0.25, { ...o2, ease: "back.out(1.8)" });
        if (o2.notes !== false && o.overflow) tw(tl, notes, { opacity: 1 }, t + 0.08, 0.1, o2);
        return this;
      },
      shut(tl, t, o2 = {}) {
        tw(tl, lidOpen, { scaleY: 0.08, svgOrigin: O }, t, 0.12, { ...o2, ease: "power3.in" });
        tl.set(lidClosed, { opacity: 1 }, t + 0.12); tl.set(notes, { opacity: 0 }, t + 0.12);
        tl.to(body, { scaleY: 0.93, scaleX: 1.04, svgOrigin: O, duration: 1 / FPS, ease: "none" }, t + 0.12);
        tl.to(body, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 0.25, ease: stepEase(0.25, "back.out(2)", t + 0.12 + 1 / FPS) }, t + 0.12 + 1 / FPS);
        return this;
      },
    };
  }

  function stall(parent, x, y, s = 1, o = {}) {
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const jit = g(grp, {});
    const back = shadow(jit, 2);
    [-180, 180].forEach((px) => paper(back, cutRect(px - 9, -560, 18, 300, 1.5, 30), C.woodDark));
    // awning (also the "brows" when the stall has a face) — pivot at its centre top
    const awPos = g(jit, { transform: "translate(0 -640)" });
    const awning = g(awPos, {});
    const aw = shadow(awning, 2);
    const AX = -250, AW = 500, AY = 0, AH = 110, N = 8;
    for (let i = 0; i < N; i++) {
      const x0 = AX + (AW / N) * i, x1 = x0 + AW / N;
      const scal = arc((x0 + x1) / 2, AY + AH, (x1 - x0) / 2, 0, Math.PI, 8, 26);
      paper(aw, cutPoly([[x0, AY], [x1, AY], ...scal], 1.5, 18), i % 2 ? C.cream : C.saffron);
    }
    paper(aw, cutRect(AX - 10, AY - 22, AW + 20, 30, 2, 24), C.saffron);
    let face = null, face0 = null;
    if (o.face) {
      const fg = g(jit, {});
      const fy = -496, eyes = g(fg, {});
      [-70, 70].forEach((ex) => paper(shadow(eyes, 1), cutEll(ex, fy, 34, 34, 1.5), C.white));
      const pupils = g(eyes, {}), lids = g(fg, { opacity: 0 });
      [-70, 70].forEach((ex) => {
        paper(pupils, cutEll(ex + 4, fy + 6, 15, 15, 1), C.ink);
        paper(pupils, cutEll(ex, fy + 1, 5, 5, 0.4), C.white);
        paper(lids, cutPoly([...arc(ex, fy, 36, Math.PI, Math.PI * 2, 10), [ex + 36, fy - 2], [ex - 36, fy - 2]], 1, 10), C.woodDark);
      });
      face0 = { fg, eyes, pupils, lids };
    }
    const buildFaceApi = () => {
      const { fg, eyes, pupils, lids, mouths } = face0;
      face = {
        g: fg, eyes, pupils, lids, mouths,
        expr(tl, t, name, o2 = {}) {
          swapSet(tl, mouths, name === "wow" ? "wow" : name === "frown" ? "frown" : "happy", t + 1 / FPS);
          tl.set(lids, { opacity: name === "frown" ? 1 : 0 }, t + 1 / FPS);
          tw(tl, awning, { y: name === "wow" ? -18 : name === "frown" ? 12 : 0 }, t, 0.2, o2);
          tw(tl, pupils, { scale: name === "wow" ? 0.8 : 1, svgOrigin: "0 -496" }, t, 0.2, o2);
          return face;
        },
        look(tl, t, dx, dy, o2 = {}) { tw(tl, pupils, { x: dx, y: dy }, t, 0.17, o2); return face; },
      };
    };
    const body = shadow(jit, 2);
    paper(body, cutRect(-210, -300, 420, 34, 2.5), C.woodDark);
    paper(body, cutRect(-195, -270, 390, 170, 3), C.wood);
    [-210, -170, -130].forEach((py, i) => ink(jit, [[-185, py + 70], [185, py + 70 + sh(i) * 2]], 3, C.woodDark, { opacity: 0.55 }));
    const wheels = [-120, 120].map((wx) => {
      const wp = g(jit, { transform: `translate(${wx} -60)` });
      const w = g(wp, {});
      const ws = shadow(w, 2);
      paper(ws, cutEll(0, 0, 60, 60, 2), "#3b2a20");
      paper(ws, cutEll(0, 0, 44, 44, 1.5), C.wood);
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; ink(w, [[0, 0], [Math.cos(a) * 42, Math.sin(a) * 42]], 5, "#3b2a20"); }
      paper(w, cutEll(0, 0, 10, 10, 1), C.brass);
      return w;
    });
    if (o.face) {
      const { fg } = face0, mouths = {}, mg = g(jit, {});
      mouths.happy = g(mg, {}); paper(mouths.happy, cutStroke(arc(0, -232, 112, Math.PI * 0.16, Math.PI * 0.84, 14, 52), 12, 1), C.ink);
      paper(mouths.happy, cutPoly([...arc(0, -232, 70, Math.PI * 0.3, Math.PI * 0.7, 8, 30), [0, -196]], 1, 10), C.pink, { opacity: 0.9 });
      mouths.frown = g(mg, {}); paper(mouths.frown, cutStroke(arc(0, -128, 96, Math.PI * 1.2, Math.PI * 1.8, 12, 40), 12, 1), C.ink);
      mouths.wow = g(mg, {}); paper(mouths.wow, cutEll(0, -186, 30, 38, 1), C.ink); paper(mouths.wow, cutEll(0, -170, 16, 12, 0.6), C.pink);
      hideAll(mouths, o.faceExpr || "happy");
      face0.mouths = mouths;
      buildFaceApi();
    }
    let gl = null, kt = null; const tumblers = [];
    if (!o.noProps) {
      for (let i = 0; i < 4; i++) tumblers.push(K.tumbler(jit, -175 + i * 42, -300));
      kt = kettle(jit, 130, -300);
      if (o.galla !== false) gl = galla(jit, -10, -300, 0.62, { open: !!o.gallaOpen, overflow: o.overflow ?? !!o.gallaOpen });
    }
    return { g: grp, jit, awning, face, wheels, galla: gl, kettle: kt, steam: kt && kt.steam, tumblers,
      jitter(tl, t0, t1, o2 = {}) { jitter(tl, [jit], t0, t1, { seed: 41 + Math.round(x), rot: 0.3, px: 1, ...o2 }); return this; } };
  }

  Object.assign(K, { FPS, stepEase, q, tw, jitter, swapSet, EXPR, person, meera, raviMama, priya, merchant, khataRig, kettle, galla, stall });
})();

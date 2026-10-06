// s01 — Cold open (Apr 15): Meera deposits ₹15,000, her phone buzzes "CREDITED ₹15,000", she beams (credit = good!),
// then Khata hops up holding a blue Dr chip — in Meera's own books that same deposit is a DEBIT. "So who's right?"
// Exit: she sets the phone face-down on the galla lid; its red cloth back rushes up to fill the frame → s01t (Khata's cover).
//
// This file ALSO hosts the lesson-local helper kit `window.L6` (scene files load in order; every later scene uses it).
(function () {
  const L6 = (window.L6 = window.L6 || {});
  const O = "0 0";

  // ----------------------------------------------------------------------------------------------- generic helpers
  // positioned wrapper (carries the transform attr) + animatable inner group drawn around local (0,0)
  L6.node = (K, parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L6.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L6.stage = (K, parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L6.cal = (K, parent, hl) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L6.drop = (tl, K, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L6.lift = (tl, K, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  // lint: every text inside `root` is intentionally layered (device chips: name + amount sit tight on purpose)
  L6.allow = (root) => { root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true")); return root; };
  // GSAP quirk (see L04 notes): a node that gets BOTH x/y tweens AND scale/rotation with svgOrigin mis-places (x/y get scaled).
  // So every flyer is a 3-level rig: wrapper(translate attr) > pos (gsap x/y) > sc (gsap scale/rotation, svgOrigin "0 0") > inner (content;
  // dropIn / autoAlpha go on `inner`).  L6.rig(K, parent, x, y, s) → {w, pos, sc, inner}
  L6.rig = (K, parent, x = 0, y = 0, s = 1) => {
    const w = K.g(parent, { transform: `translate(${x} ${y})` });
    const pos = K.g(w, {}), sc = K.g(pos, {}), inner = K.g(sc, {});
    if (s !== 1) gsap.set(sc, { scale: s, svgOrigin: O });
    return { w, pos, sc, inner };
  };
  L6.mv = (tl, r, t, dur, v, ease = "power2.inOut") => {
    const xy = {};
    if (v.x !== undefined) xy.x = v.x;
    if (v.y !== undefined) xy.y = v.y;
    if (Object.keys(xy).length) tl.to(r.pos, { ...xy, duration: dur, ease }, t);
    if (v.scale !== undefined) tl.to(r.sc, { scale: v.scale, svgOrigin: O, duration: dur, ease }, t);
    if (v.rotation !== undefined) tl.to(r.sc, { rotation: v.rotation, svgOrigin: O, duration: dur, ease }, t);
  };
  // arc flight of a rig's pos (x linear-ish, y up then down); from/to = pos offsets
  L6.arcFly = (tl, r, t, dur, from, to, lift = 120, o = {}) => {
    tl.fromTo(r.pos, { x: from[0], y: from[1] }, { x: to[0], duration: dur, ease: o.xEase || "power1.inOut", immediateRender: false }, t);
    tl.fromTo(r.pos, { y: from[1] }, { y: Math.min(from[1], to[1]) - lift, duration: dur * 0.5, ease: "power2.out", immediateRender: false }, t);
    tl.to(r.pos, { y: to[1], duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5);
  };
  // paper chip (coloured label) with text, centred on (0,0) of a fresh node
  L6.chip = (K, parent, text, o = {}) => {
    const size = o.size || 40, w = o.w || K.textW(text, size) + size * 0.9, h = o.h || size * 1.45, col = o.bg || K.C.cream;
    const n = K.g(parent, {});
    K.paper(K.shadow(n, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.6, 20), col);
    const t = K.text(n, 0, size * 0.04, text, { size, weight: o.weight || 800, color: o.color || K.onColor(col) });
    t.setAttribute("data-layout-allow-overlap", "true");
    return n;
  };
  // paper arrow (dir: up | down | left | right)
  L6.arrow = (K, parent, x, y, dir, color, len = 70, thick = 22) =>
    K.arrowShape(parent, x, y, len, color, 1, { up: 90, down: -90, right: 180, left: 0 }[dir], thick);

  // Lucide glyphs the shared kit does not inline yet (24×24 stroke paths) — added once, locally
  const ICONS = window.ICONS || (window.ICONS = {});
  Object.assign(ICONS, {
    "thumbs-up": '<path d="M7 10v12" /> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />',
    "thumbs-down": '<path d="M17 14V2" /> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />',
    vault: '<rect width="18" height="18" x="3" y="3" rx="2" /> <circle cx="7.5" cy="7.5" r="0.6" /> <path d="m7.9 7.9 2.7 2.7" /> <circle cx="16.5" cy="7.5" r="0.6" /> <path d="m13.4 10.6 2.7-2.7" /> <circle cx="7.5" cy="16.5" r="0.6" /> <path d="m7.9 16.1 2.7-2.7" /> <circle cx="16.5" cy="16.5" r="0.6" /> <path d="m13.4 13.4 2.7 2.7" /> <circle cx="12" cy="12" r="2" />',
    "arrow-down-up": '<path d="m3 16 4 4 4-4" /> <path d="M7 20V4" /> <path d="m21 8-4-4-4 4" /> <path d="M17 4v16" />',
    diff: '<path d="M12 3v14" /> <path d="M5 10h14" /> <path d="M5 21h14" />',
    "undo-2": '<path d="M9 14 4 9l5-5" /> <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />',
  });

  // ----------------------------------------------------------------------------------------------- THE BANK (friendly building)
  // origin = ground centre, ≈ 470 wide × 490 tall at s = 1. Pediment eyebrows, entablature eyes, door = mouth, columns for legs.
  L6.bank = (K, parent, x, y, s = 1, o = {}) => {
    const C = K.C, { g, paper, shadow, cutRect, cutPoly, cutEll, ink, arc } = K;
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const mover = g(root, {});                       // y (nod)
    const body = g(mover, {});                       // scale (gulp)
    K.el("ellipse", { cx: 0, cy: 2, rx: 250, ry: 16, fill: "#3b2614", "fill-opacity": 0.22 }, body);
    const stone = "#c9d4e1", stoneD = "#9fb0c4", ped = "#8aa3bd";
    paper(shadow(body, 2), cutRect(-235, -34, 470, 34, 2), stoneD);
    paper(shadow(body, 2), cutRect(-212, -66, 424, 34, 2), "#b3c2d3");
    // back wall behind the door
    paper(shadow(body, 1), cutRect(-190, -300, 380, 236, 2), stone);
    // columns (the legs)
    [-160, -100, 100, 160].forEach((cx) => {
      paper(shadow(body, 1), cutRect(cx - 19, -300, 38, 236, 1.2, 30), "#eef2f7");
      paper(body, cutRect(cx - 7, -296, 8, 228, 0.8, 30), "#ffffff", { opacity: 0.55 });
      paper(shadow(body, 1), cutRect(cx - 28, -312, 56, 20, 1, 12), "#dbe3ed");
      paper(shadow(body, 1), cutRect(cx - 28, -76, 56, 14, 1, 12), "#dbe3ed");
    });
    // the door = the mouth
    const mouth = g(body, {});
    paper(mouth, cutPoly([[-48, -64], [-48, -190], ...arc(0, -190, 48, Math.PI, Math.PI * 2, 10), [48, -64]], 1.4, 20), "#3a4556");
    paper(mouth, cutRect(-36, -80, 72, 14, 1, 14), "#27303d");
    // entablature (head) with the eyes, pediment with the eyebrows
    paper(shadow(body, 2), cutRect(-225, -396, 450, 92, 2.4), "#d6e0ec");
    paper(shadow(body, 2), cutPoly([[-246, -394], [246, -394], [0, -500]], 2.2, 26), ped);
    K.medallion(body, 0, -440, 27, "landmark");
    const eyes = g(body, {}), pup = g(eyes, {});
    [-78, 78].forEach((ex) => {
      paper(shadow(eyes, 1), cutEll(ex, -348, 30, 32, 1.2), C.white);
      paper(pup, cutEll(ex, -344, 14, 14, 0.8), C.ink);
      paper(pup, cutEll(ex - 5, -350, 4.5, 4.5, 0.4), C.white);
      ink(body, [[ex - 32, -394 + (ex < 0 ? 0 : 3)], [ex + 32, -392 - (ex < 0 ? 3 : 0)]], 7, C.ink);   // brows (pediment edge)
    });
    [-122, 122].forEach((cx) => paper(body, cutEll(cx, -326, 15, 9, 0.8), C.pink, { opacity: 0.7 }));
    const rig = {
      g: root, body, pup, mouth,
      look(tl, t, dx, dy) { tl.to(pup, { x: dx, y: dy, duration: 0.17, ease: K.stepEase(0.17, "power2.out", t) }, t); return rig; },
      // satisfied gulp: two-step squash, door-mouth shuts a hair
      gulp(tl, t) {
        tl.to(body, { scaleY: 0.95, scaleX: 1.03, svgOrigin: "0 0", duration: 0.13, ease: K.stepEase(0.13, "power2.out", t) }, t);
        tl.to(body, { scaleY: 1, scaleX: 1, svgOrigin: "0 0", duration: 0.3, ease: K.stepEase(0.3, "power2.out", t + 0.2) }, t + 0.2);
        return rig;
      },
      nod(tl, t) {
        tl.to(mover, { y: 8, duration: 0.13, ease: K.stepEase(0.13, "power2.out", t) }, t);
        tl.to(mover, { y: 0, duration: 0.26, ease: K.stepEase(0.26, "power2.out", t + 0.26) }, t + 0.26);
        return rig;
      },
    };
    return rig;
  };

  // ----------------------------------------------------------------------------------------------- scene
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C;
    const GROUND = 985, T0 = sc.start;
    const cam = K.g(svg, { id: "s01-cam" });
    L6.stage(K, cam, C.sky, 860);
    // tone-on-tone street: skyline strokes behind the bank, a lamp post, kerb lines
    [[120, 400, 200], [330, 330, 150], [1700, 380, 190], [1860, 300, 120]].forEach(([bx, by, bw], i) => K.paper(cam, K.cutRect(bx - bw / 2, by, bw, 860 - by, 2, 40), "#3f8bd0", { opacity: 0.5 }));
    for (let i = 0; i < 5; i++) K.ink(cam, [[60 + i * 440, 905], [260 + i * 440, 905]], 5, "#d9a441", { opacity: 0.35 });

    // ---- galla on a crate (left); the phone ends face-down on its lid
    const GX = 235, GBASE = GROUND - 150, GS = 1.0;
    K.crate(cam, GX, GROUND, 270, 150);
    const galla = K.galla(cam, GX, GBASE, GS, { open: false });
    const LID = [GX, GBASE - 128 * GS];                        // lid top centre

    // ---- the Bank (right) and Khata (centre, enters from below)
    const bank = L6.bank(K, cam, 1500, GROUND, 0.9);
    const k = K.khataRig(cam, 1010, 1048, 0.85, { expr: "awake" });
    // Khata's blue Dr chip (held up in its right hand, upright)
    const drChip = L6.hide(L6.node(K, cam, 1175, 690));
    L6.chip(K, drChip, "Dr", { size: 64, bg: C.dr, w: 130, h: 92 });

    // ---- Meera (walks in from the left, bundle in her right hand)
    const m = K.meera(cam, -90, GROUND, 0.95, { expr: "happy", aL: [12, 8], aR: [12, 8] });
    const bundleP = K.g(m.handAnchor("R"), {});
    K.bundle(bundleP, 10, -6, 0.62, -8);
    K.holdProp(m, "R", bundleP, [12, 8]);
    const bundleFly = L6.rig(K, cam, 0, 0); L6.hide(bundleFly.inner);
    K.bundle(bundleFly.inner, 0, 0, 0.7, 0);

    // ---- veil (behind the phone close-up) + the phone
    const veil = K.el("rect", { x: -40, y: -40, width: 2000, height: 1160, fill: "#14101c", opacity: 0 }, cam);
    const phoneN = L6.rig(K, cam, 0, 0);
    const phoneD = L6.hide(K.g(phoneN.inner, {}));
    const ph = K.phone(phoneD, 0, 0, 1.0);
    ph.g.setAttribute("data-layout-allow-overlap", "true");
    const backR = L6.rig(K, cam, 0, 0); const backN = L6.hide(backR.inner);   // the phone's red cloth back (face-down)
    K.paper(K.shadow(backN, 2), K.cutRect(-95, -185, 190, 370, 2, 26), C.red);
    K.tex(backN, K.cutRect(-95, -185, 190, 370, 2, 26), "pat-cover");
    K.ink(backN, [[-62, -150], [62, -150], [62, 150], [-62, 150], [-62, -150]], 3.5, C.gold, { opacity: 0.9 });
    K.paper(backN, K.cutEll(0, -110, 22, 22, 1), "#2b2233");           // camera dot

    // ---- Meera's thought bubble: orange Cr chip + thumbs-up
    const bub = L6.hide(L6.node(K, cam, 700, 250));
    K.cloud(bub, 0, 0, 1.45);
    L6.chip(K, K.g(bub, { transform: "translate(-62 -4)" }), "Cr", { size: 58, bg: C.cr, w: 112, h: 80 });
    K.icon(K.g(bub, { transform: "translate(70 -4)" }), "thumbs-up", 0, 0, 84, C.leaf, 2.4);
    // "?" between the Bank and Khata
    const qm = L6.hide(L6.node(K, cam, 1255, 430)); K.qmark(qm, 0, 0, 2.0, C.coral);

    // ---- calendar (Apr 15) + fade from black + red plate for the exit rush
    L6.cal(K, svg, 15);
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const red = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.red, opacity: 0 }, svg);

    // ======================================================================================= timeline
    const tEnd = sc.end;
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.0, ease: "power1.out" }, T0);
    const tSet = cue("s01d", "@right") + 0.1, tRush = tSet + 0.65;
    const RP = `${LID[0]} ${LID[1] - 20}`;
    tl.fromTo(cam, { scale: 1, svgOrigin: RP }, { scale: 1.05, svgOrigin: RP, duration: tRush - T0, ease: "none" }, T0);

    // Meera walks in, stops by the bank
    m.walkTo(tl, T0 + 0.7, 590, 1.5);
    m.expr(tl, cue("s01a", "@april") - 0.1, "happy").look(tl, cue("s01a", "@april"), 6, -2);
    // "deposits" — she reaches toward the bank door, the bundle arcs into the door-mouth
    const tDep = cue("s01a", "@deposits");
    m.arm(tl, tDep - 0.35, "R", 78, 30, 0.3);
    tl.set(bundleP, { opacity: 0 }, tDep + 0.12);
    tl.set(bundleFly.inner, { opacity: 1 }, tDep + 0.12);
    L6.arcFly(tl, bundleFly, tDep + 0.12, 1.0, [770, 700], [1470, 840], 150);
    L6.mv(tl, bundleFly, tDep + 1.12, 0.14, { scale: 0.5 }, "power2.in");
    tl.to(bundleFly.inner, { opacity: 0, duration: 0.14, ease: "power2.in" }, tDep + 1.12);
    bank.gulp(tl, tDep + 1.15).look(tl, tDep + 0.1, -7, 3);
    m.arm(tl, tDep + 1.3, "R", 12, 8, 0.35);
    m.look(tl, tDep + 1.2, 7, -1);

    // "Her phone buzzes" — the phone pops out beside her, buzzes twice, then flies to a centred close-up
    const tBuzz = cue("s01a", "@buzzes");
    L6.drop(tl, K, phoneD, tBuzz - 0.05, { from: 1.12, dur: 0.3 });
    tl.set(phoneN.pos, { x: 700, y: 700 }, 0); gsap.set(phoneN.sc, { scale: 0.55, svgOrigin: O });
    ph.buzz(tl, tBuzz); ph.buzz(tl, tBuzz + 0.55);
    m.expr(tl, tBuzz, "amazed").look(tl, tBuzz, 5, 4);
    const tUp = cue("s01a", "@your") - 0.45;
    L6.mv(tl, phoneN, tUp, 0.65, { x: 960, y: 560 }, "power2.inOut");
    L6.mv(tl, phoneN, tUp, 0.65, { scale: 2.0 }, "power2.inOut");
    tl.to(veil, { opacity: 0.42, duration: 0.5, ease: "power1.out" }, tUp);
    // the SMS card drops-and-places as the VO says "credited"
    ph.show(tl, cue("s01a", "@account") + 0.1, { kind: "CREDITED", amount: "₹15,000", acct: "A/c XX12" });
    K.pulseNode(tl, ph.body, cue("s01a", "@credited"), 1.03);
    // "Credited!" — the phone drops back into her hand; she beams, hops; the bubble pops
    const tCr = cue("s01b", "@credited");
    L6.mv(tl, phoneN, tCr - 0.1, 0.55, { x: 700, y: 700 }, "power2.inOut");
    L6.mv(tl, phoneN, tCr - 0.1, 0.55, { scale: 0.55 }, "power2.inOut");
    tl.to(veil, { opacity: 0, duration: 0.4, ease: "power1.in" }, tCr - 0.05);
    m.expr(tl, tCr, "joy").hop(tl, tCr + 0.05, { height: 50 });
    const tBub = cue("s01b", "@credit");
    L6.drop(tl, K, bub, tBub, { from: 1.1, dur: 0.34 });
    m.expr(tl, cue("s01b", "@good"), "grin");
    // the bubble's thumbs-up gives one small lift on "good"
    K.pulseNode(tl, bub, cue("s01b", "@good") + 0.1, 1.05);

    // "Khata has news." — Khata hops up from below frame, raising the blue Dr chip
    const tKh = cue("s01c", "@khata");
    tl.set(k.g, { autoAlpha: 0 }, 0); tl.set(k.g, { autoAlpha: 1 }, tKh - 0.05);
    tl.fromTo(k.mover, { y: 330 }, { y: 0, duration: 0.5, ease: "power3.out", immediateRender: false }, tKh - 0.05);
    k.hop(tl, tKh + 0.5, { height: 60 });
    k.arm(tl, tKh + 0.3, "R", 150, 0.3).expr(tl, tKh + 0.55, "happy");
    L6.drop(tl, K, drChip, tKh + 0.7, { from: 1.12, dur: 0.3 });
    m.expr(tl, cue("s01c", "@meera's"), "puzzled").headTilt(tl, cue("s01c", "@meera's"), -7).look(tl, cue("s01c", "@meera's"), 8, 2);
    K.pulseNode(tl, drChip, cue("s01c", "@debit"), 1.08);
    m.expr(tl, cue("s01c", "@debit") + 0.15, "worried");
    // "So who's right?" — bank and Khata look at each other, a ? pops between them
    const tSo = cue("s01d", "@who's");
    bank.look(tl, tSo - 0.1, -9, 2); k.look(tl, tSo - 0.1, 8, -3);
    L6.drop(tl, K, qm, tSo + 0.25, { from: 1.15, dur: 0.3 });
    m.look(tl, tSo, 8, -2);

    // exit: she sets the phone face-down on the galla lid; the red back rushes up to fill the frame
    m.arm(tl, tSet - 0.15, "L", 62, 50, 0.25);
    L6.mv(tl, phoneN, tSet, 0.5, { x: LID[0], y: LID[1] - 20 }, "power2.inOut");
    L6.mv(tl, phoneN, tSet, 0.5, { scale: 0.62 }, "power2.inOut");
    tl.to(phoneN.sc, { scaleX: 0, svgOrigin: O, duration: 0.14, ease: "power1.in" }, tSet + 0.4);
    tl.set(phoneD, { opacity: 0 }, tSet + 0.54);
    tl.set(backR.pos, { x: LID[0], y: LID[1] - 20 }, 0); gsap.set(backR.sc, { scale: 0.62, svgOrigin: O });
    tl.set(backN, { opacity: 1 }, tSet + 0.54);
    tl.fromTo(backR.sc, { scaleX: 0, svgOrigin: O }, { scaleX: 0.62, svgOrigin: O, duration: 0.14, ease: "power1.out", immediateRender: false }, tSet + 0.54);
    // rush into the red cloth back
    tl.to(cam, { scale: 7.5, x: 960 - LID[0], y: 540 - (LID[1] - 20), svgOrigin: RP, duration: tEnd - tRush, ease: "power3.in" }, tRush);
    tl.to(red, { opacity: 1, duration: 0.18, ease: "none" }, tEnd - 0.18);

    m.blinks(tl, T0 + 1.8, tEnd, 3.3); bank.look(tl, T0 + 3.0, 0, 0);
    m.jitter(tl, T0, tEnd);
  };
})();

// Paper cut-out CAST + PROPS for the course — load after kit.js and rig.js. Extends window.KIT.
// People are built by the shared body builder (K.person from rig.js) and then DRESSED: hair, shirt checks, vests, caps,
// props in the hand anchors. Every cast rig therefore has exactly the K.meera method set
// (expr / blink(s) / look / headTilt / arm / pose / shrug / wave / point / hop / walkTo / lean / handAnchor / jitter).
// Props are built synchronously and expose small methods with the same `(tl, t, …)` shape.
// Everything is deterministic (no Math.random / Date). See RIG.md → "Cast (shared)" and "Props".
(function () {
  const K = window.KIT, C = K.C;
  const { g, el, sh, paper, tex, ink, shadow, cutRect, cutEll, cutPoly, cutStroke, arc, pts2d } = K;
  const O = "0 0";
  const PI = Math.PI;
  let UID = 0;

  // ---------------------------------------------------------------------------------------------- helpers
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const mix = (a, b, t) => {
    const A = hex(a), B = hex(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  };
  const shade = (c, t = 0.22) => mix(c, "#2b2233", t);      // darker step (one shade step, house rule)
  const tint = (c, t = 0.25) => mix(c, "#ffffff", t);

  // clipPath + clipped group (unique ids)
  function clipped(parent, d, attrs = {}) {
    const id = "cast-clip-" + (UID++);
    const cp = el("clipPath", { id }, parent);
    el("path", { d }, cp);
    return g(parent, { "clip-path": `url(#${id})`, ...attrs });
  }
  const rect = (parent, x, y, w, h, fill, opacity = 1) => el("rect", { x, y, width: w, height: h, fill, opacity }, parent);

  // plaid: wide pale bars + thin dark bars, clipped to the garment path
  function plaid(parent, d, box, base, o = {}) {
    const cg = clipped(parent, d);
    const [x0, y0, x1, y1] = box, step = o.step || 24;
    const pale = o.pale || "#f4efe0", dark = o.dark || shade(base, 0.45);
    for (let x = x0 + (o.ox || 0); x < x1; x += step) { rect(cg, x, y0, 7, y1 - y0, pale, 0.30); rect(cg, x + 3, y0, 2, y1 - y0, dark, 0.28); }
    for (let y = y0 + (o.oy || 0); y < y1; y += step) { rect(cg, x0, y, x1 - x0, 7, pale, 0.30); rect(cg, x0, y + 3, x1 - x0, 2, dark, 0.28); }
    return cg;
  }

  // layers inserted INTO the person at the right z-depth
  const torsoLayer = (rig) => { const l = g(rig.top, {}); rig.top.insertBefore(l, rig.headPos); return l; };   // over torso+neck, under head + arms
  function sleeveLayer(rig, side) {                                                                       // over the sleeve, under the forearm
    const up = rig.arms[side].upper, l = g(up, {}); up.insertBefore(l, up.children[1]); return l;
  }
  function cuffLayer(rig, side) {                                                                         // wrist band, under the hand
    const fo = rig.arms[side].fore, l = g(fo, {}); fo.insertBefore(l, fo.children[1]); return l;
  }
  const headFront = (rig) => g(rig.head, {});                                                             // over face (hair, caps, glasses)
  const headBack = (rig) => rig.head.firstChild;                                                          // behind the skull (bob hair)

  // trapezoid torso (same numbers as rig.js `person`)
  const torsoHalf = (y, T, bw) => 62 + (bw - 62) * ((y + 400) / (T + 400));
  const torsoD = (T, bw = 84, inset = 1) => pts2d([[-62 + inset, -400], [62 - inset, -400], [bw - inset, T], [-bw + inset, T]]);

  // keep a hand-held prop upright / hanging whatever the arm angles are: prop group lives in handAnchor(side)
  function holdProp(rig, side, prop, rest) {
    const sgn = side === "R" ? 1 : -1, ang = (a, b) => sgn * (a + b);
    prop.setAttribute("transform", `rotate(${ang(rest[0], rest[1])})`);
    const base = rig.arm;
    rig.arm = function (tl, t, sd, a, b, dur = 0.33, o = {}) {
      base(tl, t, sd, a, b, dur, o);
      if ((sd === "L" || sd < 0 ? "L" : "R") === side) K.tw(tl, prop, { rotation: ang(a, b), svgOrigin: O }, t, dur, o);
      return rig;
    };
  }

  // ---------------------------------------------------------------------------------------------- hair
  // head-local coords (rig.js): neck pivot = (0,0); skull centre ≈ (0,-54), rx 57, ry 63; brows end ≈ y -90.
  function hairShort(rig, color, o = {}) {
    const h = headFront(rig), L = o.lowL ?? -88, R = o.lowR ?? -84, part = o.part ?? -8;
    const outer = arc(0, -54, 60, PI * 1.03, PI * 1.97, 14, 68);
    const line = [[58, R], [44, -92], [26, -97], [part + 10, -100], [part - 6, -98], [-14, -100], [-34, -97], [-50, -92], [-58, L]];
    paper(shadow(h, 1), cutPoly([...outer, ...line], 1.4, 14), color);
    if (o.quiff) paper(h, cutPoly([[part - 34, -108], [part - 10, -134], [part + 28, -130], [part + 40, -106]], 1.2, 12), color);
    return h;
  }
  function hairSpiky(rig, color) {
    const h = headFront(rig);
    paper(shadow(h, 1), cutPoly([...arc(0, -54, 60, PI * 1.03, PI * 1.97, 14, 68), [58, -82], [44, -92], [20, -98], [-6, -97], [-30, -98], [-50, -92], [-58, -84]], 1.4, 14), color);
    [[-40, -112, -34, -140, -18, -116], [-18, -118, -6, -148, 8, -118], [6, -118, 22, -146, 32, -114], [28, -112, 46, -134, 48, -106]]
      .forEach(([a, b, c, d, e, f]) => paper(h, cutPoly([[a, b], [c, d], [e, f]], 0.8, 10), color));
    return h;
  }
  function hairBob(rig, color) {
    paper(shadow(headBack(rig), 1), cutPoly([[-68, -102], [0, -126], [68, -102], [74, 8], [60, 34], [-60, 34], [-74, 8]], 1.8, 16), color);
    const h = headFront(rig);
    paper(shadow(h, 1), cutPoly([...arc(0, -54, 61, PI * 1.02, PI * 1.98, 14, 69), [58, -70], [40, -86], [18, -96], [-8, -92], [-30, -84], [-48, -78], [-58, -62]], 1.4, 14), color);
    return h;
  }

  // ---------------------------------------------------------------------------------------------- caps
  function capFlat(rig, color) {            // baseball-style cap, front view
    const h = headFront(rig);
    paper(shadow(h, 1), cutPoly([...arc(0, -96, 62, PI, PI * 2, 14, 46), [62, -94], [-62, -94]], 1.4, 14), color);
    paper(shadow(h, 1), cutRect(-64, -102, 128, 14, 1, 16), shade(color, 0.25));                              // band
    paper(shadow(h, 1), cutPoly([[-40, -90], [40, -90], [46, -83], [-46, -83]], 1, 12), shade(color, 0.12));   // bill (seen from the front)
    paper(h, cutEll(0, -142, 6, 5, 0.4), shade(color, 0.3));
    return h;
  }

  // ---------------------------------------------------------------------------------------------- garments
  // waistcoat / vest: two panels with a V opening, buttons, optional pockets
  function vest(rig, T, bw, color, o = {}) {
    const L = torsoLayer(rig), s1 = shadow(L, 1), bot = o.bottom ?? -205, vy = o.vy ?? -262, vx = o.vx ?? 20;
    const hb = (y) => torsoHalf(y, T, bw) - 2;
    paper(s1, cutPoly([[-hb(-400), -400], [-vx, -400], [-3, vy], [-3, bot], [-hb(bot), bot]], 1.6, 18), color);
    paper(s1, cutPoly([[hb(-400), -400], [vx, -400], [3, vy], [3, bot], [hb(bot), bot]], 1.6, 18), color);
    const dk = shade(color, 0.3);
    ink(L, [[-vx, -400], [-3, vy]], 4, dk); ink(L, [[vx, -400], [3, vy]], 4, dk);
    for (let i = 0; i < (o.buttons ?? 3); i++) paper(L, cutEll(0, vy + 26 + i * 24, 5.5, 5.5, 0.4), o.buttonColor || C.gold);
    if (o.pockets) [-1, 1].forEach((sd) => ink(L, [[sd * 32, bot - 52], [sd * 58, bot - 56]], 4, dk));
    return L;
  }

  // ================================================================================================== CAST
  // ---------------------------------------------------------------------------------------------- AMAN
  // early 30s, checked shirt (plaid on torso + sleeves), orange gamcha on the viewer-left shoulder, short side-parted hair.
  function aman(parent, x, y, s, o = {}) {
    const top = "#3f8a63";
    const r = K.person(parent, x, y, s, { skin: "#b0714a", top, legs: "#3c3a45", shoes: "#2b2233", aL: [12, 8], aR: [12, 8], ...o });
    const T = -165, L = torsoLayer(r);
    plaid(L, torsoD(T), [-84, -400, 84, T], top, { ox: 6, oy: 6 });
    plaid(sleeveLayer(r, "L"), pts2d([[-19, -6], [19, -6], [19, 104], [-19, 104]]), [-19, -6, 19, 104], top, { ox: 4, oy: 8 });
    plaid(sleeveLayer(r, "R"), pts2d([[-19, -6], [19, -6], [19, 104], [-19, 104]]), [-19, -6, 19, 104], top, { ox: 4, oy: 8 });
    // collar flaps + placket + buttons
    const cl = shade(top, 0.18);
    [-1, 1].forEach((sd) => paper(shadow(L, 1), cutPoly([[sd * 3, -398], [sd * 30, -408], [sd * 34, -392], [sd * 12, -370]], 0.8, 10), cl));
    ink(L, [[0, -372], [0, T + 6]], 3.5, shade(top, 0.4));
    [-336, -296, -256, -216].forEach((by) => paper(L, cutEll(0, by, 4.6, 4.6, 0.3), "#f4efe0"));
    // gamcha — thick orange cloth over the shoulder, hanging down the chest, fringed
    const G = "#f0792a", gd = shade(G, 0.3), gl = shadow(L, 1);
    paper(gl, cutPoly([[-70, -410], [-36, -414], [-20, -236], [-48, -226], [-64, -250]], 1.6, 14), G);
    paper(gl, cutEll(-52, -409, 26, 11, 1), shade(G, 0.1));
    [-290, -270, -248].forEach((gy, i) => ink(L, [[-60 + i * 3, gy], [-26 + i * 3, gy - 2]], 4, i === 1 ? "#f4efe0" : gd));
    ink(L, [[-48, -300], [-44, -236]], 3, "#f4efe0", { opacity: 0.55 });
    [-62, -50, -38, -26].forEach((fx, i) => ink(L, [[fx, -232 + i * 1.5], [fx - 1, -212 + i * 2]], 5, i % 2 ? gd : G));
    hairShort(r, C.hair, { quiff: true });
    r.gamcha = L;
    return r;
  }

  // ---------------------------------------------------------------------------------------------- GOPAL
  // dairy owner: white kurta + white topi, glasses, grey moustache; sky-blue kurta trim (placket, cuffs), milk-drop pocket.
  function gopal(parent, x, y, s, o = {}) {
    const r = K.merchant(parent, x, y, s, { skin: "#9a6038", glasses: true, noLegs: false, topBottom: -135, ...o });
    const T = o.topBottom ?? -135, L = torsoLayer(r), blue = C.sky, bd = shade(blue, 0.15);
    paper(shadow(L, 1), cutPoly([[-22, -408], [22, -408], [18, -388], [-18, -388]], 0.8, 10), "#efe8d8");        // mandarin collar
    ink(L, [[0, -388], [0, T + 4]], 4, blue);                                                                       // placket
    [-350, -312, -274, -236].forEach((by) => paper(L, cutEll(0, by, 5, 5, 0.3), bd));
    // chest pocket with a milk drop
    paper(shadow(L, 1), cutRect(24, -330, 40, 46, 1, 12), "#efe8d8");
    paper(L, cutPoly([[44, -322], [54, -304], [50, -294], [38, -294], [34, -304]], 0.5, 8), blue);
    paper(L, cutEll(41, -300, 2.6, 4, 0.2), "#ffffff", { opacity: 0.8 });
    ink(L, [[-70, T - 6], [70, T - 6]], 5, blue, { opacity: 0.9 });                                                // kurta hem
    [["L"], ["R"]].forEach(([sd]) => paper(shadow(cuffLayer(r, sd), 1), cutRect(-17, 76, 34, 14, 0.8, 14), blue));
    r.trim = L;
    return r;
  }

  // ---------------------------------------------------------------------------------------------- RAJU
  // teen helper (≈ 86 % of an adult), stall apron over a tee, spiky hair. `tray` rides his right hand.
  function raju(parent, x, y, s, o = {}) {
    const k = o.scale === false ? 1 : 0.86;
    const r = K.person(parent, x, y, s * k, {
      skin: "#a8683f", top: "#f1ead8", legs: "#4f5f80", shoes: "#2b2233", apron: true, aL: [12, 8], aR: [24, 66], ...o,
    });
    hairSpiky(r, C.hair);
    // tray: brass-rimmed round tray + three chai tumblers; lives in the right hand and stays level
    const tray = g(r.handAnchor("R"), {});
    const tp = g(tray, { transform: "translate(0 -14)" });
    paper(shadow(tp, 1), cutEll(0, 0, 98, 11, 1.2), "#cfcac2");
    paper(tp, cutEll(0, -2, 90, 7, 0.8), "#e3dfd8");
    ink(tp, [[-96, 3], [96, 3]], 4, C.goldDark, { opacity: 0.7 });
    [-48, 0, 48].forEach((tx, i) => K.tumbler(tp, tx, -4 + (i % 2) * 2, 1));
    r.tray = tray;
    if (o.tray === false) tray.setAttribute("opacity", 0);
    holdProp(r, "R", tray, [24, 66]);
    r.carry = (tl, t, o2 = {}) => { r.arm(tl, t, "R", 24, 66, o2.dur ?? 0.35, o2); return r; };                       // lift tray level
    r.lower = (tl, t, o2 = {}) => { r.arm(tl, t, "R", 14, 40, o2.dur ?? 0.35, o2); return r; };                       // tray low, still level
    r.trayShow = (tl, t, on = true) => { tl.set(tray, { opacity: on ? 1 : 0 }, t); return r; };
    return r;
  }

  // ---------------------------------------------------------------------------------------------- LANDLORD
  // merchant base, MUSTARD kurta, grey waistcoat, bald + moustache, key ring in the right hand (hangs straight down).
  function landlord(parent, x, y, s, o = {}) {
    const T = -125;
    const r = K.merchant(parent, x, y, s, {
      skin: "#b27a50", top: C.mustard, legs: "#efe6d0", topi: false, noLegs: false, topBottom: T, expr: "neutral", ...o,
    });
    vest(r, T, 84, "#757a88", { bottom: -190, vy: -280, vx: 22, pockets: true });
    const L = torsoLayer(r);
    ink(L, [[-70, T - 6], [70, T - 6]], 5, shade(C.mustard, 0.2), { opacity: 0.8 });
    // key ring + 3 keys
    const prop = g(r.handAnchor("R"), {});
    const ring = g(prop, { transform: "translate(0 16)" });
    const keys = [];
    const keyShape = (grp, col) => {
      paper(shadow(grp, 1), cutRect(-3.2, 14, 6.4, 46, 0.4, 14), col);
      paper(grp, cutRect(2, 44, 10, 5, 0.3, 8), col); paper(grp, cutRect(2, 53, 8, 5, 0.3, 8), col);
      paper(shadow(grp, 1), cutEll(0, 10, 11, 11, 0.5), col); paper(grp, cutEll(0, 10, 5, 5, 0.3), "#7a5a2a");
    };
    [[-22, C.brass], [3, "#c9c5be"], [26, C.gold]].forEach(([a, col], i) => { const kp = g(ring, {}); const k = g(kp, { transform: `rotate(${a})` }); keyShape(k, col); keys.push(kp); });
    ink(ring, arc(0, 0, 12, 0, PI * 2, 14), 4.5, C.goldDark);
    holdProp(r, "R", prop, [12, 8]);
    r.keys = prop; r.keyList = keys;
    r.jingle = (tl, t) => {                                   // small stepped swing, damped (one-off, not a loop)
      [[-9, 0], [8, 1], [-5, 2], [3, 3], [0, 4]].forEach(([d, i]) => tl.set(ring, { rotation: d, svgOrigin: "0 0" }, t + i * 0.13));
      return r;
    };
    r.keysShow = (tl, t, on = true) => { tl.set(prop, { opacity: on ? 1 : 0 }, t); return r; };
    return r;
  }

  // ---------------------------------------------------------------------------------------------- CART-WALA
  // merchant base, cream shirt, denim-navy vest with pockets, brick cap. (distinct from Gopal's white and the landlord's mustard)
  function cartWala(parent, x, y, s, o = {}) {
    const T = -150;
    const r = K.merchant(parent, x, y, s, {
      skin: "#bd8456", top: "#efe3cc", legs: "#8c7b5a", topi: false, noLegs: false, topBottom: T, ...o,
    });
    vest(r, T, 84, "#34476b", { bottom: -200, vy: -290, vx: 24, buttons: 3, pockets: true, buttonColor: "#efe3cc" });
    const L = torsoLayer(r);
    paper(shadow(L, 1), cutPoly([[-24, -402], [-4, -400], [-20, -376], [-34, -392]], 0.8, 10), "#efe3cc");           // shirt collar peeks
    paper(shadow(L, 1), cutPoly([[24, -402], [4, -400], [20, -376], [34, -392]], 0.8, 10), "#efe3cc");
    capFlat(r, "#b5472f");
    return r;
  }

  // ---------------------------------------------------------------------------------------------- CA FRIEND
  // woman, burgundy blazer over a saffron kurta, round specs, bob; fat kraft file folder in the left hand.
  function caFriend(parent, x, y, s, o = {}) {
    const blazer = "#8a2f45", T = -190;
    const r = K.person(parent, x, y, s, {
      skin: "#c28a62", top: blazer, legs: "#2f3a52", shoes: "#2b2233", longSleeve: true, glasses: true, earrings: true,
      topBottom: T, aL: [16, -80], aR: [12, 8], ...o,
    });
    const L = torsoLayer(r), dk = shade(blazer, 0.3);
    paper(L, cutPoly([[-21, -396], [21, -396], [0, -296]], 0.8, 12), C.saffron);                                      // kurta V
    ink(L, [[-12, -380], [12, -380]], 3, "#b8862a", { opacity: 0.6 });
    const sl = shadow(L, 1);
    paper(sl, cutPoly([[-62, -400], [-22, -398], [-2, -296], [-16, -248], [-44, -332]], 1.2, 14), shade(blazer, 0.16));  // lapels
    paper(sl, cutPoly([[62, -400], [22, -398], [2, -296], [16, -248], [44, -332]], 1.2, 14), shade(blazer, 0.16));
    ink(L, [[0, -296], [0, T + 8]], 3.5, dk);
    [-262, -236].forEach((by) => paper(L, cutEll(0, by, 5, 5, 0.3), C.gold));
    paper(L, cutRect(26, -246, 34, 8, 0.6, 12), dk);
    paper(L, cutEll(-40, -326, 5, 5, 0.3), C.gold);                                                                  // lapel pin
    hairBob(r, C.hair);
    // fat file folder (held level against the chest)
    const prop = g(r.handAnchor("L"), {});
    const fp = g(prop, { transform: "translate(8 -62)" });
    paper(shadow(fp, 2), cutRect(-52, -78, 104, 142, 1.6, 18), shade("#d9a86c", 0.1));
    [0, 1, 2].forEach((i) => paper(fp, cutRect(-48 + i * 2, -84 + i * 2, 98, 18, 0.8, 16), "#fbf7ef"));            // paper edges sticking out
    paper(shadow(fp, 1), cutRect(-52, -58, 104, 122, 1.6, 18), "#d9a86c");
    paper(shadow(fp, 1), cutRect(-52, -70, 40, 16, 1, 12), "#d9a86c");                                               // tab
    ink(fp, [[-46, 6], [46, 6]], 3.5, shade("#d9a86c", 0.35), { opacity: 0.8 });
    ink(fp, [[-46, 16], [28, 16]], 3.5, shade("#d9a86c", 0.35), { opacity: 0.8 });
    [0, 1, 2].forEach((i) => ink(fp, [[46 + i * 2, -50], [46 + i * 2, 58]], 2.2, shade("#d9a86c", 0.28), { opacity: 0.7 }));   // thick spine: stacked edges
    K.icon(fp, "file-text", 0, -22, 38, C.ink, 2.2);                                                                // label sticker
    ink(fp, [[-52, 34], [52, 34]], 5, C.red, { opacity: 0.9 });                                                      // elastic band
    paper(fp, cutEll(0, 34, 7, 7, 0.4), C.red);
    holdProp(r, "L", prop, [16, -80]);
    r.folder = prop;
    r.folderShow = (tl, t, on = true) => { tl.set(prop, { opacity: on ? 1 : 0 }, t); return r; };
    return r;
  }

  // ================================================================================================== PROPS
  const FLOOR = "#3b2614";
  const floorShadow = (p, rx, ry = 13) => el("ellipse", { cx: 0, cy: 2, rx, ry, fill: FLOOR, "fill-opacity": 0.22 }, p);
  const root = (parent, x, y, s) => g(parent, { transform: `translate(${x} ${y}) scale(${s})` });

  function spokedWheel(parent, wx, wy, r, tyre = "#3b2a20", inner = C.wood) {
    const wp = g(parent, { transform: `translate(${wx} ${wy})` });
    const w = g(wp, {});
    const ws = shadow(w, 2);
    paper(ws, cutEll(0, 0, r, r, 2), tyre);
    paper(ws, cutEll(0, 0, r * 0.73, r * 0.73, 1.5), inner);
    for (let k = 0; k < 6; k++) { const a = (k / 6) * PI * 2; ink(w, [[0, 0], [Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.7]], 5, tyre); }
    paper(w, cutEll(0, 0, 10, 10, 1), C.brass);
    return w;
  }

  // ---------------------------------------------------------------------------------------------- SAMOSA CART
  // (x,y) = ground centre. ≈ 470 wide × 560 tall at s = 1. Kadhai + stove left, samosa pile right, bell on a pole.
  function samosaCart(parent, x, y, s = 1, o = {}) {
    const rt = root(parent, x, y, s), mover = g(rt, {});
    floorShadow(mover, 250);
    const jit = g(mover, {});
    // handle + bell pole (behind the body)
    const back = shadow(jit, 1);
    paper(back, cutStroke([[-190, -262], [-262, -296], [-292, -294]], 13, 1), C.woodDark);
    paper(back, cutEll(-296, -294, 11, 11, 0.8), C.woodDark);
    paper(back, cutRect(166, -560, 11, 262, 1, 30), C.woodDark);
    paper(back, cutStroke([[171, -552], [118, -552]], 9, 0.8), C.woodDark);
    // body
    const body = shadow(jit, 2);
    paper(body, cutRect(-206, -314, 412, 28, 2.5), C.woodDark);
    paper(body, cutRect(-192, -286, 384, 178, 3), C.wood);
    [-246, -206, -166].forEach((py, i) => ink(jit, [[-182, py], [182, py + sh(i + 5) * 2]], 3, C.woodDark, { opacity: 0.5 }));
    // front emblem: a samosa on a cream disc
    paper(shadow(jit, 1), cutEll(0, -196, 52, 52, 1.2), C.cream);
    const samosa = (grp, cx, cy, sc = 1, rot = 0, golden = true) => {
      const sg = g(grp, { transform: `translate(${cx} ${cy}) rotate(${rot}) scale(${sc})` });
      const col = golden ? "#dca24a" : "#c78a35";
      paper(shadow(sg, 1), cutPoly([[-30, 0], [30, 0], [14, -26], [0, -50], [-14, -26]], 1.2, 14), col);
      paper(sg, cutPoly([[-18, -4], [8, -4], [0, -34]], 0.6, 10), "#efc16e", { opacity: 0.8 });
      ink(sg, [[-26, -3], [26, -3]], 3, "#a8672a", { opacity: 0.75 });
      for (let i = -3; i <= 3; i++) ink(sg, [[i * 8, -3], [i * 8 + 1, 2]], 2.5, "#a8672a", { opacity: 0.7 });
      return sg;
    };
    samosa(jit, 0, -178, 1.15, 0);
    // wheels
    const wheels = [-112, 112].map((wx) => spokedWheel(jit, wx, -60, 60));
    // stove + kadhai (wok)
    const st = shadow(jit, 1);
    paper(st, cutRect(-122, -346, 64, 34, 1.5, 14), "#3b3238");
    paper(st, cutRect(-132, -316, 84, 6, 1, 14), "#5a4f58");
    const kadhai = g(jit, {});
    const kg = shadow(kadhai, 2);
    paper(kg, cutPoly([...arc(-92, -374, 84, 0, PI, 16, 44), [-176, -374]], 2, 14), "#2f2a30");
    paper(kg, cutRect(-180, -380, 18, 10, 1, 10), "#26222a"); paper(kg, cutRect(-22, -380, 18, 10, 1, 10), "#26222a");    // ear handles
    paper(kadhai, cutEll(-92, -376, 86, 14, 1.2), "#26222a");                                                           // rim
    paper(kadhai, cutEll(-92, -375, 76, 9, 1), "#d58a2a");                                                              // oil
    const fry = g(kadhai, {});
    [[-128, -376, 0.5, -20], [-96, -373, 0.55, 8], [-62, -377, 0.5, 24]].forEach(([fx, fy, fs, fr]) => samosa(fry, fx, fy + 6, fs, fr));
    // bubbles + steam (driven by sizzle)
    const bubbles = [0, 1, 2, 3, 4].map((i) => { const b = g(kadhai, { opacity: 0 }); paper(b, cutEll(0, 0, 4 + (i % 3), 4 + (i % 3), 0.3), "#fff0c4"); return b; });
    const steam = g(jit, {});
    const puffs = [[-116, -440], [-84, -484], [-104, -528]].map(([sx, sy], i) => {
      const pp = g(steam, { transform: `translate(${sx} ${sy})` });
      const p = g(pp, { opacity: 0 });
      [[0, 0, 24, 17], [-18, 9, 17, 12], [18, 7, 16, 12]].forEach(([dx, dy, rx, ry]) => paper(p, cutEll(dx, dy, rx, ry, 1.2), C.cream, { opacity: 0.92 - i * 0.14 }));
      return p;
    });
    // samosa pile on a steel tray
    paper(shadow(jit, 1), cutEll(112, -316, 74, 10, 1.2), "#c9c5be");
    paper(jit, cutEll(112, -318, 66, 6, 0.8), "#e3dfd8");
    const pile = g(jit, {});
    const spots = [[78, -322, 0], [112, -324, 3], [146, -322, -2], [95, -362, -4], [130, -362, 5], [112, -402, 2]];
    const samosas = spots.map(([sx, sy, sr], i) => samosa(pile, sx, sy, 0.95, sr, i % 2 === 0));
    // bell: brass, hangs from the hook on the pole
    const bellPos = g(jit, { transform: "translate(120 -552)" });
    const bell = g(bellPos, {});
    ink(bell, [[0, 0], [0, 12]], 3, "#6e4422");
    paper(shadow(bell, 1), cutPoly([[-9, 10], [9, 10], [22, 52], [30, 68], [-30, 68], [-22, 52]], 1.2, 12), C.brass);
    paper(bell, cutEll(0, 68, 30, 6, 0.8), C.goldDark);
    paper(bell, cutEll(0, 78, 6, 6, 0.4), C.goldDark);
    const dings = g(bellPos, { opacity: 0 });
    [-1, 1].forEach((sd) => { ink(dings, arc(sd * 18, 52, 26, sd < 0 ? PI * 0.75 : -PI * 0.25, sd < 0 ? PI * 1.25 : PI * 0.25, 6), 3.5, C.cream); ink(dings, arc(sd * 18, 52, 40, sd < 0 ? PI * 0.78 : -PI * 0.22, sd < 0 ? PI * 1.22 : PI * 0.22, 6), 3, C.cream, { opacity: 0.7 }); });

    const api = {
      g: rt, mover, jit, wheels, kadhai, samosas, pile, bell, steam, puffs, bubbles,
      sizzle(tl, t0, t1) {            // bubbles pop in the oil + steam drifts up — stepped at 7.5 fps, off outside [t0,t1]
        const R = 7.5, i0 = Math.ceil(t0 * R), i1 = Math.floor(t1 * R);
        for (let i = i0; i < i1; i++) {
          const t = i / R;
          bubbles.forEach((b, k) => tl.set(b, { x: -92 + sh(i * 7 + k * 13) * 62, y: -376 + sh(i * 5 + k * 3 + 1) * 4, opacity: (i + k) % 3 === 0 ? 0 : 1 }, t));
          puffs.forEach((p, k) => { const ph = (i + k * 2) % 6; tl.set(p, { y: -ph * 9, x: sh(i * 3 + k) * 4, opacity: ph === 5 ? 0 : 1 - ph / 7 }, t); });
          tl.set(fry, { y: (i % 2 ? 1 : -1) * 1.5 }, t);
        }
        bubbles.forEach((b) => tl.set(b, { opacity: 0 }, i1 / R)); puffs.forEach((p) => tl.set(p, { opacity: 0, y: 0 }, i1 / R)); tl.set(fry, { y: 0 }, i1 / R);
        return api;
      },
      ring(tl, t) {                   // damped stepped swing + two "ding" arcs
        [[-18, 0], [15, 1], [-10, 2], [6, 3], [-3, 4], [0, 5]].forEach(([d, i]) => tl.set(bell, { rotation: d, svgOrigin: O }, t + i * 0.13));
        tl.set(dings, { opacity: 1 }, t); tl.set(dings, { opacity: 0 }, t + 0.55);
        return api;
      },
      moveTo(tl, t, wx, dur = 1.2, o2 = {}) {   // push the cart along; wheels roll with it
        const dx = (wx - x) / s, ease = o2.smooth ? "power1.inOut" : K.stepEase(dur, "power1.inOut", t);
        tl.to(mover, { x: dx, duration: dur, ease }, t);
        wheels.forEach((w) => tl.to(w, { rotation: (dx / 60) * (180 / PI), svgOrigin: O, duration: dur, ease }, t));
        return api;
      },
    };
    return api;
  }

  // ---------------------------------------------------------------------------------------------- MILK CANS
  // two aluminium cans with a sky "milk" medallion; (x,y) = ground centre between them. ≈ 200 tall at s = 1.
  function milkCans(parent, x, y, s = 1, o = {}) {
    const rt = root(parent, x, y, s);
    const Al = "#cfd5db", AlD = "#a9b1bb";
    const make = (cx) => {
      const pos = g(rt, { transform: `translate(${cx} 0)` });
      floorShadow(pos, 56, 9);
      const can = g(pos, {});
      const sb = shadow(can, 2);
      ink(can, arc(48, -96, 20, -PI / 2, PI / 2, 10), 7, AlD); ink(can, arc(-48, -96, 20, PI / 2, PI * 1.5, 10), 7, AlD);   // side handles
      paper(sb, cutPoly([[-46, 0], [46, 0], [48, -30], [48, -120], [40, -140], [26, -158], [26, -172], [-26, -172], [-26, -158], [-40, -140], [-48, -120], [-48, -30]], 1.6, 18), Al);
      paper(can, cutPoly([[24, -4], [46, -4], [48, -30], [48, -120], [40, -140], [26, -158], [24, -160]], 0.8, 14), AlD, { opacity: 0.55 });
      paper(can, cutRect(-38, -150, 10, 112, 0.8, 18), "#ffffff", { opacity: 0.5 });
      ink(can, [[-47, -34], [47, -34]], 3.5, AlD); ink(can, [[-47, -120], [47, -120]], 3.5, AlD);
      paper(shadow(can, 1), cutPoly([[-30, -172], [30, -172], [24, -192], [-24, -192]], 1, 12), AlD);
      paper(can, cutEll(0, -197, 9, 7, 0.5), Al);
      K.medallion(can, 0, -80, 24, "milk");
      return { pos, can };
    };
    const cans = [make(-56), make(56)];
    const api = {
      g: rt, cans,
      tip(tl, t, i = 0, deg = 70, dur = 0.5, o2 = {}) {    // tip a can to pour: pivot on its base corner, away from the other can
        const sd = i === 0 ? -1 : 1;
        K.tw(tl, cans[i].can, { rotation: sd * Math.abs(deg), svgOrigin: `${sd * 46} 0` }, t, dur, { ease: "power2.in", ...o2 });
        return api;
      },
      level(tl, t, i = 0, dur = 0.35, o2 = {}) { K.tw(tl, cans[i].can, { rotation: 0, svgOrigin: `${i === 0 ? -46 : 46} 0` }, t, dur, o2); return api; },
    };
    return api;
  }

  // ---------------------------------------------------------------------------------------------- SACKS + OIL TIN
  // potato sack, flour sack, oil tin. (x,y) = ground centre of the group. ≈ 250 wide.
  function sacks(parent, x, y, s = 1, o = {}) {
    const rt = root(parent, x, y, s);
    floorShadow(rt, 200, 12);
    const burlap = "#c9a66b", rope = "#8a6a3a";
    const sack = (cx, col, mouth) => {
      const p = g(rt, { transform: `translate(${cx} 0)` });
      const b = shadow(p, 2);
      paper(b, cutPoly([[-52, 0], [52, 0], [62, -60], [56, -122], [34, -150], [-34, -150], [-56, -122], [-62, -60]], 2, 16), col);
      paper(p, cutPoly([[26, -6], [52, -4], [60, -60], [54, -122], [34, -148]], 0.8, 14), shade(col, 0.25), { opacity: 0.4 });
      [-100, -64, -30].forEach((wy, i) => ink(p, [[-52, wy], [52, wy + sh(i + cx) * 2]], 2.5, shade(col, 0.3), { opacity: 0.4 }));
      return { p, b };
    };
    // potato sack (open mouth, potatoes heaped on top)
    const ps = sack(-86, burlap);
    const potato = ps.p;
    paper(potato, cutPoly([[-36, -150], [36, -150], [30, -166], [-30, -166]], 1.2, 12), shade(burlap, 0.2));
    [[-22, -176, 22, 15], [4, -184, 24, 17], [26, -172, 18, 13], [-4, -166, 20, 13], [-30, -166, 16, 11]].forEach(([px, py, rx, ry], i) => {
      paper(shadow(potato, 1), cutEll(px, py, rx, ry, 1.6), i % 2 ? "#b98a52" : "#a97a44");
      paper(potato, cutEll(px - 5, py - 3, 2.4, 1.8, 0.2), shade("#b98a52", 0.4)); paper(potato, cutEll(px + 7, py + 2, 2, 1.6, 0.2), shade("#b98a52", 0.4));
    });
    K.icon(potato, "leaf", 0, -82, 54, C.leaf, 2.2);                                    // leaf sticker on the sack
    // flour sack (tied neck, cream with a blue band + wheat sticker)
    const fs = sack(18, "#f3ead6");
    const flour = fs.p;
    paper(shadow(flour, 1), cutPoly([[-26, -150], [26, -150], [20, -172], [-20, -172]], 1, 12), "#f3ead6");
    ink(flour, [[-22, -154], [22, -154]], 6, rope);
    paper(flour, cutRect(-56, -118, 112, 26, 1, 16), C.sky, { opacity: 0.9 });
    K.icon(flour, "sprout", 0, -58, 56, C.goldDark, 2.2);
    // oil tin (yellow, red band, cap + handle)
    const op = g(rt, { transform: "translate(112 0)" });
    const oil = op;
    paper(shadow(op, 2), cutRect(-36, -118, 72, 118, 2.2, 18), "#e8b43a");
    paper(op, cutRect(24, -114, 10, 110, 0.8, 18), shade("#e8b43a", 0.25), { opacity: 0.5 });
    paper(op, cutRect(-36, -78, 72, 30, 1, 18), C.red);
    paper(shadow(op, 1), cutPoly([[-34, -118], [34, -118], [26, -134], [-26, -134]], 1, 12), "#d3a02c");
    paper(shadow(op, 1), cutRect(-9, -148, 18, 16, 0.8, 10), "#7a5a2a");
    ink(op, arc(0, -134, 18, PI, PI * 2, 10), 5, "#7a5a2a");
    paper(op, cutPoly([[0, -72], [10, -60], [8, -52], [-8, -52], [-10, -60]], 0.5, 8), C.cream);              // oil drop
    return { g: rt, potato, flour, oil, tin: oil };
  }

  // ---------------------------------------------------------------------------------------------- INFOTECH BUILDING
  // tone-on-tone tall office block. (x,y) = ground centre. opts: rows, cols, tone, sign.
  // Windows are indexed row-major from the top-left (0 … rows*cols-1).
  function infotechBuilding(parent, x, y, s = 1, o = {}) {
    const rows = o.rows ?? 4, cols = o.cols ?? 3, ww = 112, wh = 132, gapX = 26, pitchY = 154;
    const W = cols * ww + (cols + 1) * gapX, topPad = 190, lobby = 130;
    const H = topPad + rows * pitchY + lobby;
    const body = o.tone || mix(C.sky, "#2b2233", 0.22), rec = mix(body, "#2b2233", 0.34), frame = tint(body, 0.14), lit = "#ffe9ae";
    const rt = root(parent, x, y, s);
    floorShadow(rt, W * 0.62, 12);
    const bg = g(rt, {});
    // main block + side wing + roof furniture
    paper(shadow(bg, 2), cutRect(-W / 2, -H, W, H, 2.5, 30), body);
    paper(shadow(bg, 1), cutRect(-W / 2 + 18, -H - 36, W - 36, 40, 2, 26), shade(body, 0.1));                            // parapet step
    paper(shadow(bg, 1), cutRect(W / 2 - 96, -H - 82, 70, 50, 1.6, 18), shade(body, 0.18));                              // AC / lift housing
    ink(bg, [[-W / 2 + 40, -H - 36], [-W / 2 + 40, -H - 120]], 5, shade(body, 0.2)); ink(bg, [[-W / 2 + 22, -H - 96], [-W / 2 + 58, -H - 96]], 4, shade(body, 0.2));
    // sign plate (tone-on-tone)
    paper(shadow(bg, 1), cutRect(-W / 2 + 22, -H + 28, W - 44, 86, 1.8, 22), shade(body, 0.2));
    K.text(bg, 0, -H + 71, o.sign ?? "INFOTECH", { size: 52, weight: 800, color: tint(body, 0.8), ls: 4 });
    // floor bands
    for (let r = 0; r <= rows; r++) ink(bg, [[-W / 2 + 8, -H + topPad - 10 + r * pitchY], [W / 2 - 8, -H + topPad - 10 + r * pitchY]], 3, shade(body, 0.16), { opacity: 0.55 });
    const wins = [], litG = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c, cx = -W / 2 + gapX + ww / 2 + c * (ww + gapX), top = -H + topPad + r * pitchY, cy = top + wh / 2;
      const wg = g(bg, {});
      paper(wg, cutRect(cx - ww / 2 - 5, top - 5, ww + 10, wh + 10, 0.8, 18), frame);
      paper(wg, cutRect(cx - ww / 2, top, ww, wh, 0.6, 18), rec);
      const l = g(wg, { opacity: 0 });
      rect(l, cx - ww / 2, top, ww, wh, lit);
      ink(wg, [[cx, top], [cx, top + wh]], 3, tint(body, 0.12), { opacity: 0.8 });                                       // mullion (behind anyone in the window)
      const slot = g(wg, { transform: `translate(${cx} ${top + wh})` });                                             // sill centre
      const id = "cast-win-" + (UID++);
      el("path", { d: `M${-ww / 2} ${-wh}H${ww / 2}V0H${-ww / 2}Z` }, el("clipPath", { id }, slot));
      const anchor = g(slot, { "clip-path": `url(#${id})` });
      paper(wg, cutRect(cx - ww / 2 - 9, top + wh + 3, ww + 18, 8, 0.5, 14), frame);                                    // sill
      wins.push({ cx, cy, w: ww, h: wh, top, sill: top + wh, anchor, slot, lit: l });
    }
    // lobby door
    paper(shadow(bg, 1), cutRect(-60, -112, 120, 112, 1.6, 18), rec);
    paper(bg, cutRect(-54, -106, 52, 106, 0.8, 18), mix(rec, "#bfe3f5", 0.28)); paper(bg, cutRect(2, -106, 52, 106, 0.8, 18), mix(rec, "#bfe3f5", 0.28));
    paper(shadow(bg, 1), cutRect(-74, -122, 148, 12, 1, 18), frame);
    const api = {
      g: rt, wins, count: wins.length, W, H, rows, cols,
      windowAnchor(i, o2 = {}) {            // <g> at the window's SILL CENTRE (y up = negative). Clipped to the opening unless {clip:false}.
        const w = wins[i];
        if (o2.clip === false) return g(rt, { transform: `translate(${w.cx} ${w.sill})` });         // unclipped: she can lean out over the facade
        return w.anchor;
      },
      bustY(ps) { return Math.round(-wh + 557 * ps + 6); },   // ground y for a person at scale ps so head + shoulders sit in the window: K.priya(win, 0, b.bustY(0.38), 0.38)
      windowPos(i) { const w = wins[i]; return [x + w.cx * s, y + w.sill * s]; },       // world position of the sill centre
      lightWindow(tl, t, i, o2 = {}) {        // two-step flicker-on (55 % then full)
        const w = wins[i];
        tl.set(w.lit, { opacity: 0.55 }, t); tl.set(w.lit, { opacity: 1 }, t + 1 / 15 * 2);
        return api;
      },
      lightAll(tl, t0, every = 0.12, order) {
        const ord = order || wins.map((_, i) => i);
        ord.forEach((i, k) => api.lightWindow(tl, t0 + k * every, i));
        return api;
      },
      darkWindow(tl, t, i) { tl.set(wins[i].lit, { opacity: 0 }, t); return api; },
    };
    return api;
  }

  // ---------------------------------------------------------------------------------------------- SCOOTER (side view, faces right)
  // (x,y) = ground under the middle of the wheelbase. ≈ 330 long × 300 tall at s = 1. opts: color, flip.
  function scooter(parent, x, y, s = 1, o = {}) {
    const col = o.color || "#d9503f", cd = shade(col, 0.22), fs = o.flip ? -1 : 1;
    const rt = g(parent, { transform: `translate(${x} ${y}) scale(${fs * s} ${s})` });
    const mover = g(rt, {});
    floorShadow(mover, 190, 12);
    const jit = g(mover, {});
    const wheels = [-108, 122].map((wx) => {
      const w = spokedWheel(jit, wx, -46, 46, "#2a2630", "#cfcac2");
      return w;
    });
    // body: rear hump over the rear wheel → floorboard → leg shield / steering column → front fender
    const bd = shadow(jit, 2);
    paper(bd, cutPoly([[-178, -66], [-180, -128], [-152, -178], [-100, -202], [-40, -202], [-4, -178], [14, -132], [36, -98], [62, -90], [62, -70], [-40, -58], [-112, -60]], 2, 18), col);
    paper(bd, cutPoly([[40, -96], [106, -96], [106, -70], [40, -70]], 1.4, 16), cd);                                           // floorboard
    paper(bd, cutPoly([[84, -72], [92, -132], [100, -200], [116, -250], [142, -252], [152, -232], [140, -160], [134, -100], [134, -72]], 2, 16), col);   // leg shield
    ink(jit, [[-162, -122], [-142, -160], [-96, -184], [-44, -184]], 7, tint(col, 0.35), { opacity: 0.85 });                  // body stripe
    ink(jit, arc(122, -46, 56, PI * 1.12, PI * 1.95, 10), 13, col);                                                            // front fender
    paper(shadow(jit, 1), cutPoly([[-152, -200], [-40, -208], [-8, -198], [-14, -178], [-152, -178]], 1.4, 16), "#3a2a22");   // seat
    paper(shadow(jit, 1), cutEll(152, -214, 14, 20, 1), C.cream);                                                              // headlamp
    paper(jit, cutEll(156, -214, 7, 11, 0.5), "#ffe9ae");
    ink(jit, [[128, -250], [114, -312]], 9, "#3b3238");                                                                        // steering stem
    ink(jit, [[90, -316], [140, -304]], 10, "#3b3238");                                                                        // handlebar
    paper(jit, cutEll(142, -304, 8, 8, 0.6), "#26222a");
    paper(jit, cutEll(100, -332, 11, 6, 0.6), "#cfcac2");                                                                      // mirror
    ink(jit, [[100, -324], [102, -318]], 3, "#3b3238");
    paper(shadow(jit, 1), cutRect(-170, -56, 62, 14, 1, 12), "#9aa1ab");                                                       // exhaust
    paper(jit, cutRect(-184, -132, 8, 22, 0.6, 10), C.red);                                                                    // tail lamp
    const api = {
      g: rt, mover, jit, wheels,
      rollTo(tl, t, wx, dur = 1.4, o2 = {}) {
        const dx = ((wx - x) / s) * fs, ease = o2.smooth ? "power1.inOut" : K.stepEase(dur, "power1.inOut", t);
        tl.to(mover, { x: dx, duration: dur, ease }, t);
        wheels.forEach((w) => tl.to(w, { rotation: (dx / 46) * (180 / PI), svgOrigin: O, duration: dur, ease }, t));
        return api;
      },
    };
    return api;
  }

  // ---------------------------------------------------------------------------------------------- DAWN BAND
  // flat saffron strip that rises behind a tone-on-tone skyline, + a paper crescent moon. NO gradient.
  // (x,y) = top-left of the area; opts: w (1920), h (1080), horizon (y of the skyline base, 780), sky, band, moon.
  function dawnBand(parent, x = 0, y = 0, s = 1, o = {}) {
    const w = o.w ?? 1920, h = o.h ?? 1080, hz = o.horizon ?? Math.round(h * 0.72), sky = o.sky || C.navy;
    const rt = root(parent, x, y, s);
    const area = clipped(rt, `M0 0H${w}V${h}H0Z`);
    rect(area, 0, 0, w, h, sky);
    if (o.stars !== false) [[0.09, 0.11], [0.22, 0.06], [0.4, 0.14], [0.56, 0.06], [0.7, 0.12], [0.78, 0.21], [0.5, 0.24], [0.14, 0.28]].forEach(([fx, fy], i) =>
      paper(area, cutEll(fx * w, fy * h, 4 + (i % 3) * 1.5, 4 + (i % 3) * 1.5, 0.5), C.gold, { opacity: 0.8 }));
    // moon
    const moonPos = g(area, { transform: `translate(${w * 0.885} ${h * 0.14})` });
    const moon = g(moonPos, {});
    paper(shadow(moon, 1), cutEll(0, 0, 62, 62, 2), C.cream);
    paper(moon, cutEll(24, -12, 50, 52, 1.5), sky);
    // the band: sits BELOW the skyline until `rise`
    const bandH = o.bandH ?? 300;
    const band = g(area, { transform: `translate(0 ${bandH})` });
    rect(band, 0, hz - bandH, w, bandH + 40, o.band || C.saffron);
    // skyline (tone-on-tone with the sky)
    const sky1 = o.skyline || mix(sky, "#000000", 0.28), sky2 = mix(sky, "#000000", 0.18);
    const skyline = g(area, {});
    let cx = -20, i = 0;
    while (cx < w + 40) {
      const bw = 90 + Math.round(sh(i * 7 + 3) * 30 + 30), bh = 90 + Math.round((sh(i * 11 + 1) + 1) * 85);
      const col = i % 3 === 0 ? sky2 : sky1;
      paper(skyline, cutRect(cx, hz - bh, bw, bh + (h - hz), 1.8, 22), col);
      if (i % 4 === 1) paper(skyline, cutRect(cx + bw * 0.3, hz - bh - 30, bw * 0.4, 32, 1.2, 14), col);                       // water tank
      if (i % 5 === 2) paper(skyline, cutPoly([[cx + bw * 0.2, hz - bh], [cx + bw * 0.5, hz - bh - 54], [cx + bw * 0.8, hz - bh]], 1, 12), col); // dome / shikhara
      cx += bw + 4 + Math.round((sh(i * 5) + 1) * 8); i++;
    }
    const api = {
      g: rt, sky: area, band, skyline, moon, horizon: hz,
      rise(tl, t0, t1, o2 = {}) {          // two stepped moves with a held beat between
        const mid = bandH * 0.5, d = Math.min(0.5, (t1 - t0) * 0.35);
        tl.to(band, { y: mid, duration: d, ease: o2.smooth ? "power2.inOut" : K.stepEase(d, "power2.inOut", t0) }, t0);
        tl.to(band, { y: 0, duration: d, ease: o2.smooth ? "power2.inOut" : K.stepEase(d, "power2.inOut", t1 - d) }, t1 - d);
        return api;
      },
      moonOff(tl, t, dur = 1.2) { tl.to(moon, { x: w * 0.2, y: -60, opacity: 0, duration: dur, ease: "power1.in" }, t); return api; },
    };
    return api;
  }

  // ---------------------------------------------------------------------------------------------- CART GHOST
  // chalk outline of the (future) stall — same geometry as K.stall (awning, posts, counter, wheels), no face / galla.
  // `fill(tl,t,v)` fades the 40 % ghost fill in/out. (x,y) = ground centre.
  function cartGhost(parent, x, y, s = 1, o = {}) {
    const col = o.color || "#fff4e2", rt = root(parent, x, y, s);
    const fillG = g(rt, { opacity: o.ghost ? (o.fillOpacity ?? 0.4) : 0 });
    const lineG = g(rt, { opacity: o.lineOpacity ?? 0.55 });
    const shapes = [];                                     // [polygon d, ...] shared by outline + fill
    const AX = -250, AW = 500, AH = 110, N = 8, AY = -640;
    for (let i = 0; i < N; i++) {
      const x0 = AX + (AW / N) * i, x1 = x0 + AW / N;
      shapes.push(pts2d([[x0, AY], [x1, AY], ...arc((x0 + x1) / 2, AY + AH, (x1 - x0) / 2, 0, PI, 8, 26)]));
    }
    shapes.push(cutRect(AX - 10, AY - 22, AW + 20, 30, 1.2, 24), cutRect(-189, -560, 18, 300, 1, 30), cutRect(171, -560, 18, 300, 1, 30),
      cutRect(-210, -300, 420, 34, 1.2), cutRect(-195, -270, 390, 170, 1.5));
    shapes.forEach((d, i) => { el("path", { d, fill: i < 8 && i % 2 ? "#ffffff" : col }, fillG); el("path", { d, fill: "none", stroke: col, "stroke-width": 5, "stroke-linejoin": "round", "stroke-dasharray": "22 10" }, lineG); });
    [-120, 120].forEach((wx) => {
      el("circle", { cx: wx, cy: -60, r: 60, fill: col }, fillG);
      el("circle", { cx: wx, cy: -60, r: 60, fill: "none", stroke: col, "stroke-width": 5, "stroke-dasharray": "22 10" }, lineG);
      el("circle", { cx: wx, cy: -60, r: 12, fill: "none", stroke: col, "stroke-width": 4 }, lineG);
    });
    const api = {
      g: rt, line: lineG, fillG,
      fill(tl, t, v = 0.4, dur = 0.5, o2 = {}) { K.tw(tl, fillG, { opacity: v }, t, dur, { ease: "power1.out", ...o2 }); return api; },
      show(tl, t, v = 0.55, dur = 0.4) { tl.to(lineG, { opacity: v, duration: dur, ease: "power1.out" }, t); return api; },
      hide(tl, t, dur = 0.3) { tl.to(lineG, { opacity: 0, duration: dur }, t); tl.to(fillG, { opacity: 0, duration: dur }, t); return api; },
    };
    return api;
  }

  // ---------------------------------------------------------------------------------------------- PHONE + SMS / UPI cards
  // (x,y) = centre of the handset. 190 × 370 at s = 1. opts: screen "sms" | "upi" (default card style).
  // Paper card for a bank SMS or a UPI alert; also usable on its own.
  function smsCard(parent, cx, cy, w, h, c = {}) {
    const grp = g(parent, { transform: `translate(${cx} ${cy})` });
    tex(shadow(grp, 1), cutRect(-w / 2, -h / 2, w, h, 1.4, 18), "pat-paper");
    const upi = c.type === "upi";
    K.medallion(grp, -w / 2 + 28, -h / 2 + 28, 17, upi ? "indian-rupee" : "landmark", upi ? C.leaf : C.sky);
    K.text(grp, -w / 2 + 52, -h / 2 + 28, c.acct || (upi ? "UPI" : "A/c XX12"), { size: 17, weight: 600, anchor: "start", color: "#5a4f66" });
    ink(grp, [[-w / 2 + 12, -h / 2 + 54], [w / 2 - 12, -h / 2 + 54]], 2.5, "#a39684", { opacity: 0.7 });
    K.text(grp, 0, -h / 2 + 80, c.kind || (upi ? "RECEIVED" : "CREDITED"), { size: 22, weight: 800, color: K.C.ink, ls: 1 });
    K.text(grp, 0, -h / 2 + 130, c.amount || "₹15,000", { size: c.size || 40, weight: 800, color: K.C.ink });
    if (c.from) K.text(grp, 0, -h / 2 + 172, c.from, { size: 18, weight: 600, color: "#5a4f66" });
    return grp;
  }
  function phone(parent, x, y, s = 1, o = {}) {
    const rt = root(parent, x, y, s), mover = g(rt, {}), body = g(mover, {});
    const W = 190, H = 370;
    paper(shadow(body, 2), cutRect(-W / 2, -H / 2, W, H, 2, 26), "#2b2233");
    paper(body, cutRect(-W / 2 + 9, -H / 2 + 9, W - 18, H - 18, 1.2, 24), "#1e1826");                      // screen off
    const sw = W - 18, sht = H - 18, sx = -sw / 2, sy = -H / 2 + 9;
    const on = g(body, { opacity: 0 });
    tex(on, cutRect(sx, sy, sw, sht, 1.2, 24), "pat-paper");
    rect(on, sx, sy, sw, 34, "#e8dfce", 1);
    K.text(on, sx + 16, sy + 20, "9:41", { size: 17, weight: 700, color: "#5a4f66", anchor: "start" });
    paper(body, cutRect(-26, -H / 2 + 12, 52, 11, 0.6, 12), "#2b2233");                                   // notch
    const area = clipped(body, pts2d([[sx, sy + 34], [sx + sw, sy + 34], [sx + sw, sy + sht], [sx, sy + sht]]));
    const cards = [];
    let cur = null, woke = false;
    const api = {
      g: rt, mover, body, cards, W, H,
      wake(tl, t) { if (!woke) { tl.set(on, { opacity: 0.6 }, t); tl.set(on, { opacity: 1 }, t + 2 / 15); woke = true; } return api; },
      show(tl, t, card = {}) {             // card: {kind, amount, acct, from, type} | function(group, cx, cy, w, h)
        api.wake(tl, t);
        const cw = sw - 20, ch = card.h || 206, ty = sy + 34 + 18 + ch / 2;
        const holder = g(area, { opacity: 0 });
        const pos = g(holder, { transform: `translate(0 -34)` });
        if (typeof card === "function") card(pos, 0, ty, cw, ch);
        else smsCard(pos, 0, ty, cw, ch, { type: o.screen === "upi" ? "upi" : "sms", ...card });
        if (cur) tl.set(cur, { opacity: 0 }, t);
        tl.set(holder, { opacity: 1 }, t);
        tl.to(pos, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "back.out(1.5)", t) }, t);            // drop-and-place
        cur = holder; cards.push(holder);
        return api;
      },
      hideCard(tl, t) { if (cur) tl.set(cur, { opacity: 0 }, t); cur = null; return api; },
      buzz(tl, t) {                        // one short stepped buzz (phone_buzz sfx), then still
        [[-3, 0], [3, 1], [-3, 2], [3, 3], [-2, 4], [2, 5], [0, 6]].forEach(([d, i]) => tl.set(mover, { rotation: d, x: d * 1.2, svgOrigin: O }, t + i / 15));
        return api;
      },
    };
    return api;
  }

  // ---------------------------------------------------------------------------------------------- icon colours for the new Lucide glyphs (K.medallion default disc)
  const ICON_COLORS = {
    landmark: "sky", clock: "coral", pause: "saffron", "file-text": "sky", flag: "coral", flame: "coral", key: "teal",
    school: "teal", cake: "coral", "map-pin": "coral", "shopping-cart": "sky", leaf: "leaf", box: "sky",
    "calendar-check": "leaf", percent: "violet", search: "violet", mail: "sky", "clipboard-list": "teal", tag: "violet",
  };
  const baseMedallion = K.medallion;
  K.medallion = (parent, x, y, r, name, bg = C.white, fg = C.ink) =>
    baseMedallion(parent, x, y, r, name, bg === C.white && ICON_COLORS[name] ? C[ICON_COLORS[name]] : bg, fg);

  Object.assign(K, {
    aman, gopal, raju, landlord, cartWala, caFriend,
    samosaCart, milkCans, sacks, infotechBuilding, scooter, dawnBand, cartGhost, phone, smsCard,
    holdProp, mixColor: mix, ICON_COLORS,
  });
})();

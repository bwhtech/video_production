// 14 clay stills — one scene per lesson, scene i shown during [i-1, i) seconds.
import * as THREE from "three";
import * as K from "./kit.js";
import { ICON } from "./icons.js";
const { C, at, grp } = K;

// ---------- renderer
const canvas = document.getElementById("three-layer");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(1920, 1080, false);
renderer.setPixelRatio(1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const camera = new THREE.PerspectiveCamera(30, 1920 / 1080, 0.1, 200);

function makeCyc(color) {
  const R = 5, W = 70, prof = [[0, 16]];
  for (let z = 16; z > -2; z -= 1) prof.push([0, z]);
  for (let i = 0; i <= 24; i++) { const a = (i / 24) * (Math.PI / 2); prof.push([R - Math.cos(a) * R, -2 - Math.sin(a) * R]); }
  prof.push([24, -2 - R]);
  const pos = [], idx = [];
  prof.forEach(([y, z]) => pos.push(-W / 2, y, z, W / 2, y, z));
  for (let i = 0; i < prof.length - 1; i++) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color, roughness: 1, side: THREE.DoubleSide }));
  m.receiveShadow = true; return m;
}

// ---------- scenes
const SCENES = [];
function scene(def) {
  const s = new THREE.Scene();
  s.background = new THREE.Color(def.bg);
  s.add(makeCyc(def.bg));
  const L = def.light || "day";
  if (L === "day") {
    s.add(new THREE.HemisphereLight(0xfff6ea, 0xe0c0a0, 1.35));
    const key = new THREE.DirectionalLight(0xfff0dc, 2.6); key.position.set(-6, 10, 9); shadow(key); s.add(key);
    const fill = new THREE.DirectionalLight(0xffe0cc, 0.6); fill.position.set(8, 3, 6); s.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.0); rim.position.set(3, 7, -9); s.add(rim);
  } else if (L === "night") {
    s.add(new THREE.HemisphereLight(0xa9b8e6, 0x3a3048, 1.15));
    const key = new THREE.DirectionalLight(0xffcf96, 2.1); key.position.set(-4, 9, 8); shadow(key); s.add(key);
    const rim = new THREE.DirectionalLight(0x9bb6ff, 1.1); rim.position.set(4, 6, -9); s.add(rim);
  } else if (L === "cinema") {
    s.add(new THREE.HemisphereLight(0x9a8fc4, 0x2b2233, 0.6));
    const key = new THREE.DirectionalLight(0xfff0dc, 1.4); key.position.set(-3, 9, 10); shadow(key); s.add(key);
    const scr = new THREE.PointLight(0xbfd8ff, 30, 14, 1.6); scr.position.set(0, 3.5, -1.5); s.add(scr);
  } else if (L === "dusk") {
    s.add(new THREE.HemisphereLight(0xffd9c2, 0xb8806a, 1.2));
    const key = new THREE.DirectionalLight(0xffc49a, 2.4); key.position.set(-8, 7, 8); shadow(key); s.add(key);
    const rim = new THREE.DirectionalLight(0xc9b8ff, 0.9); rim.position.set(4, 6, -9); s.add(rim);
  }
  const labels = [];
  def.build(s, (html, p, cls = "") => labels.push({ html, p, cls }), (html, p) => labels.push({ html, p, card: true }));
  SCENES.push({ s, cam: def.cam, labels });
}
function shadow(l) {
  l.castShadow = true; l.shadow.mapSize.set(2048, 2048);
  Object.assign(l.shadow.camera, { left: -11, right: 11, top: 10, bottom: -4, near: 1, far: 45 });
  l.shadow.radius = 7; l.shadow.bias = -0.0006;
}
const CAM = (x = 0, y = 2.6, z = 14.5, lx = 0, ly = 2.3, lz = 0, fov = 30) => ({ pos: [x, y, z], look: [lx, ly, lz], fov });
const arcPts = (a, b, h, n) => Array.from({ length: n }, (_, i) => { const t = (i + 0.5) / n; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t + Math.sin(t * Math.PI) * h, a[2] + (b[2] - a[2]) * t]; });
const stringLights = (s, y = 4.6, x0 = -7, x1 = 7, z = -0.6) => {
  for (let i = 0; i <= 18; i++) {
    const t = i / 18, x = x0 + (x1 - x0) * t, yy = y - Math.sin(t * Math.PI * 2) ** 2 * 0.35;
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffd98a }));
    s.add(at(b, x, yy, z));
  }
  [-4, 0, 4].forEach((x) => { const p = new THREE.PointLight(0xffc77a, 9, 9, 1.8); p.position.set(x, y - 0.3, z + 0.8); s.add(p); });
};

// L1 · Why Bother? — night, puzzled Meera with a full galla; Khata holds the two reports
scene({ bg: 0x3f4c7c, light: "night", cam: CAM(0.2, 2.5, 12.6, 0.2, 2.3, 0), build(s, lb) {
  stringLights(s);
  s.add(at(K.cart({ s: 0.95 }), 2.7, 0, -1.4));
  s.add(at(K.crate(), -2.4, 0, 0.2));
  const m = K.meera({ pose: "sit", expr: "puzzled", aL: 0.35, aR: 0.35, armFwd: 0.9, headTilt: 0.12 }); s.add(at(m, -2.4, 0, -0.05));
  const g = K.galla({ open: 0.95, notes: 9, s: 0.75 }); g.rotation.y = 0.15; s.add(at(g, -2.4, 1.15, 0.85));
  const q = K.qmark(C.saffron, 1.0); s.add(at(q, -3.4, 4.45, 0.2));
  const k = K.khata({ open: 0, aL: 2.0, aR: 2.0 }); k.scale.setScalar(0.62); s.add(at(k, 0.45, 0, 1.2));
  const f = K.filmStrip(4, 0.75); f.rotation.z = 0.25; s.add(at(f, -0.75, 2.75, 1.45));
  const p = K.polaroid(1.05, C.sky); p.rotation.z = -0.15; s.add(at(p, 1.7, 2.65, 1.45));
  lb("Profit &amp; Loss", [-0.75, 1.3, 1.45], "sm");
  lb("Balance Sheet", [1.85, 3.75, 1.45], "sm");
} });

// L2 · What You Have, What You Owe
scene({ bg: 0xbfe3dc, cam: CAM(0.2, 2.6, 13.6, 0.2, 2.3, 0), build(s, lb) {
  s.add(at(K.cart({ s: 0.92, face: true }), 0.6, 0, -1.6));
  const g = K.galla({ open: 0.95, notes: 7, s: 0.8 }); s.add(at(g, -0.4, 1.7, -0.9));
  const m = K.meera({ aR: 1.2, armFwd: 0.6, expr: "happy", look: 0.25 }); s.add(at(m, -3.3, 0, 0.6));
  const b1 = K.noteBundle(0.9); b1.rotation.set(0.3, 0.2, -0.3); s.add(at(b1, -2.05, 2.55, 0.65));
  const r = K.raviMama({ aL: 1.15, armFwd: 0.6, expr: "happy", look: -0.3 }); s.add(at(r, 3.9, 0, 0.6));
  const um = K.umbrella(); um.rotation.z = -0.15; s.add(at(um, 4.75, 0, 0.9));
  const b2 = K.noteBundle(0.9); b2.rotation.set(0.3, -0.2, 0.25); s.add(at(b2, 2.55, 2.55, 0.65));
  const io = K.iou(0.9); io.rotation.z = 0.18; s.add(at(io, 2.85, 3.35, 0.75));
  const k = K.khata({ open: 0, aL: 0.6, aR: 2.2, pupX: -0.05 }); k.scale.setScalar(0.42); s.add(at(k, 0.75, 0, 1.6));
  lb("Assets ₹80,000", [-0.4, 3.25, -0.9], "dr");
  lb("Equity ₹50,000 <small>Meera</small>", [-3.3, 4.45, 0.6], "cr sm");
  lb("Liability ₹30,000 <small>Ravi Mama</small>", [3.9, 4.55, 0.6], "cr sm");
} });

// L3 · The Scale That Never Tips
scene({ bg: 0xf6e3cf, cam: CAM(-0.3, 2.7, 14.6, -0.3, 2.6, 0), build(s, lb) {
  const tz = K.taraazu({ s: 1.1 }); s.add(at(tz, 0.9, 0, -0.6));
  const [pl, pr] = tz.userData.pans;
  pl.add(at(K.jar({ level: 0.7, s: 0.62 }), -0.42, 0, 0.0));
  const mc = K.cart({ s: 0.24 }); pl.add(at(mc, 0.3, 0, 0.05));
  pl.add(at(K.jar({ level: 0.6, coins: false, fill: 0x5a3b2a, s: 0.45 }), 0.05, 0, -0.4));
  const io = K.iou(1.5); io.rotation.y = 0.1; pr.add(at(io, -0.25, 0.45, -0.1));
  const rm = K.raviMama({ expr: "happy" }); rm.scale.setScalar(0.24); pr.add(at(rm, 0.45, 0.02, 0.05));
  const mh = K.meera({ expr: "happy" }); mh.scale.setScalar(0.24); pr.add(at(mh, -0.05, 0.02, 0.25));
  const k = K.khata({ open: 0, aL: 1.5, aR: 1.5 }); k.scale.setScalar(0.36); s.add(at(k, 0.9, 4.05 * 1.1 + 0.18, -0.6));
  const m = K.meera({ expr: "smile", aL: 0.35, aR: 1.9, look: 0.35 }); s.add(at(m, -5.1, 0, 1.2));
  lb("Assets ₹88,000", [-2.45, 1.05, -0.6], "dr");
  lb("Liabilities + Equity ₹88,000", [4.25, 1.05, -0.6], "cr");
} });

// L4 · Making Money
scene({ bg: 0xffe2b8, cam: CAM(0.3, 2.6, 13.6, 0.3, 2.4, 0), build(s, lb) {
  s.add(at(K.cart({ s: 0.85 }), -3.6, 0, -1.8));
  const m = K.meera({ expr: "happy", aR: 0.9, armFwd: 0.7, look: 0.3 }); s.add(at(m, -3.6, 0, 0.2));
  const cu = K.person({ top: C.coral, bottom: C.navy, hair: "short", expr: "happy", aL: 0.9, armFwd: 0.6, skin: 0x9c6b4a, look: -0.4 }); s.add(at(cu, -1.4, 0, 0.6));
  const cu2 = K.person({ top: C.leaf, bottom: 0x6b5a4a, hair: "bob", expr: "smile", skin: 0xc28a62 }); cu2.scale.setScalar(0.92); s.add(at(cu2, -0.2, 0, -0.6));
  s.add(at(K.jar({ level: 0.55, s: 1.25 }), 2.2, 0, 0.2));
  s.add(at(K.jar({ level: 0.4, s: 1.25, tint: 0xe3f3df }), 3.85, 0, 0.2));
  arcPts([-2.6, 2.3, 0.4], [3.85, 1.7, 0.2], 1.6, 7).forEach((p, i) => { const c = K.coin(0.9); c.rotation.set(0.3 * i, 0.6 * i, 0); s.add(at(c, ...p)); });
  arcPts([4.5, 1.2, 0.3], [6.2, 0.2, 0.6], 0.4, 3).forEach((p, i) => { const c = K.coin(0.8); c.rotation.set(0.5 * i, 0.2, 0.3); s.add(at(c, ...p)); });
  const k = K.khata({ open: 0, aL: 2.4, aR: 2.4 }); k.scale.setScalar(0.4); s.add(at(k, 0.95, 0, 1.6));
  lb("Sales +₹18,000", [0.6, 4.55, 0.3], "leaf");
  lb("Capital", [2.2, -0.45, 0.2], "sm");
  lb("Profit ₹13,000", [3.85, -0.45, 0.2], "leaf sm");
  lb("Rent −₹5,000", [5.6, 1.6, 0.4], "coral sm");
} });

// L5 · Profit Is Not Cash
scene({ bg: 0xd9ecf5, cam: CAM(0, 2.7, 13.6, 0, 2.5, 0), build(s, lb) {
  const wall = K.rbox(7.2, 3.6, 0.3, 0.12, C.wood, 0.02); s.add(at(wall, 0, 3.0, -2.2));
  for (let i = 0; i < 5; i++) s.add(at(K.rbox(7.0, 0.05, 0.05, 0.02, C.woodDark, 0), 0, 1.6 + i * 0.7, -2.02));
  s.add(at(K.gauge({ value: 0.78, color: C.leaf, s: 1.05 }), -1.6, 3.15, -1.95));
  s.add(at(K.gauge({ value: 0.3, color: C.sky, s: 1.05 }), 1.6, 3.15, -1.95));
  const m = K.meera({ expr: "puzzled", aL: 0.5, aR: 0.3, headTilt: -0.15, look: 0.2 }); s.add(at(m, -4.4, 0, 0.6));
  const p = K.priya({ expr: "happy", aL: 0.8, aR: 0.8, armFwd: 0.9, look: -0.3 }); s.add(at(p, 4.3, 0, 0.6));
  const tray = grp(K.rbox(1.1, 0.06, 0.6, 0.03, C.brass, 0)); for (let i = 0; i < 3; i++) tray.add(at(K.cyl(0.1, 0.085, 0.25, 0xc98a4a, 14), -0.3 + i * 0.3, 0.15, 0));
  s.add(at(tray, 4.3, 1.55, 1.35));
  const k = K.khata({ open: 0, aL: 0.5, aR: 2.6, pupY: 0.05 }); k.scale.setScalar(0.42); s.add(at(k, 0.2, 0, 1.4));
  lb("Profit +₹6,000", [-1.6, 1.55, -1.9], "leaf");
  lb("Cash +₹0", [1.6, 1.55, -1.9], "ink");
  lb("Pay at month-end", [4.3, 4.75, 0.6], "sm");
} });

// L6 · Debit & Credit Are Just Left & Right
scene({ bg: 0xf6e3cf, cam: CAM(-0.2, 2.6, 14.0, -0.2, 2.5, 0), build(s, lb) {
  const k = K.khata({ open: 1, tintL: 1, tintR: 1, aL: 1.9, aR: 1.9, pupX: -0.05 }); k.scale.setScalar(0.7); s.add(at(k, 0.6, 0, 0));
  s.add(at(K.arrow(-1, C.dr, 1.3), -1.7, 4.45, 0.3));
  s.add(at(K.arrow(1, C.cr, 1.3), 2.9, 4.45, 0.3));
  arcPts([-5.0, 3.8, 1.2], [-1.4, 2.0, 0.4], 0.8, 3).forEach((p, i) => { const c = K.coin(1.0); c.rotation.set(0.3, 0.5 * i, 0); s.add(at(c, ...p)); });
  const io = K.iou(1.1); io.rotation.z = -0.25; s.add(at(io, 4.0, 3.3, 0.7)); [[3.7, 2.3], [4.6, 2.0]].forEach(([x, y]) => { const sl = K.slip(C.cr, 1.0); sl.rotation.z = 0.3; s.add(at(sl, x, y, 0.8)); });
  const m = K.meera({ expr: "happy", aR: 2.3, look: 0.3 }); m.scale.setScalar(0.82); s.add(at(m, -5.4, 0, 1.6));
  const ph = K.rbox(0.32, 0.55, 0.06, 0.06, 0x2f2a33, 0); ph.rotation.z = 0.35; s.add(at(ph, -4.85, 3.45, 1.8));
  lb("Debit = Left", [-1.8, 1.2, 0.5], "dr big");
  lb("Credit = Right", [3.0, 1.2, 0.5], "cr big");
  lb(`${ICON.smartphone}CREDITED ₹15,000`, [-4.2, 4.2, 1.7], "ink sm");
} });

// L7 · The Golden Rules, Decoded
scene({ bg: 0xf3dcc0, cam: CAM(0.3, 2.5, 14.2, 0.3, 2.3, 0), build(s, lb) {
  const gaddi = grp(K.rbox(2.6, 0.35, 1.6, 0.15, C.white, 0.01)); gaddi.add(at(K.cap(0.28, 1.6, C.white), 0, 0.45, -0.75)); gaddi.children[1].rotation.z = Math.PI / 2;
  s.add(at(gaddi, -4.6, 0, 0.2));
  const mer = K.person({ pose: "cross", top: C.kurtaWhite, bottom: C.kurtaWhite, hair: "short", hairColor: 0x3a2a24, moustache: true, skin: 0xa36b47, aL: 0.3, aR: 0.5, armFwd: 0.9, expr: "smile", look: 0.3 });
  mer.scale.setScalar(1.05); s.add(at(mer, -4.6, 0.95, 0.1));
  const bk = K.khata({ open: 1, aL: 0, aR: 0 }); bk.scale.setScalar(0.18); bk.rotation.x = -1.0; s.add(at(bk, -4.4, 0.45, 1.1));
  const lamp = grp(K.cyl(0.25, 0.12, 0.12, C.brass)); lamp.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffc04a })), 0.18, 0.12, 0));
  s.add(at(lamp, -3.0, 0.06, 1.2)); const fl = new THREE.PointLight(0xffb347, 6, 4, 2); fl.position.set(-3.0, 0.6, 1.3); s.add(fl);
  const cols = [C.teal, C.saffron, C.coral];
  [-1.2, 0.6, 2.4].forEach((x, i) => s.add(at(K.arch(cols[i], 0.72), x, 0, -0.9)));
  const k = K.khata({ open: 0, aL: 0.4, aR: 2.2 }); k.scale.setScalar(0.6); s.add(at(k, 4.5, 0, 0.6));
  const tz = K.taraazu({ s: 0.42 }); s.add(at(tz, 6.1, 0, -0.9));
  lb(`${ICON.user}Personal`, [-1.2, 2.55, -0.9], "sm");
  lb(`${ICON.package}Real`, [0.6, 2.55, -0.9], "sm");
  lb(`${ICON.receipt}Nominal`, [2.4, 2.55, -0.9], "sm");
  lb("Same entries, two dialects", [0.6, 4.65, -0.9], "ink");
} });

// L8 · The Journal
scene({ bg: 0xe8e0f3, cam: CAM(-0.2, 2.6, 14.0, -0.2, 2.5, 0), build(s, lb, card) {
  const k = K.khata({ open: 1, rows: true, aL: 1.0, aR: 1.2 }); k.scale.setScalar(0.62); s.add(at(k, 1.5, 0, -0.2));
  const tis = K.rbox(0.9, 0.7, 0.05, 0.03, C.white, 0); tis.rotation.set(0.4, 0.5, 0.6); s.add(at(tis, -3.0, 4.5, 0.8)); for (let i = 0; i < 3; i++) s.add(at(K.rbox(0.45, 0.025, 0.02, 0.01, 0x8a8095, 0), -3.0 + (i - 1) * 0.05, 4.6 - i * 0.14, 0.86));
  [[-3.6, 4.0], [-2.8, 4.75]].forEach(([x, y]) => { const sp = K.star(C.white, 0.5); s.add(at(sp, x, y, 0.7)); });
  const m = K.meera({ expr: "puzzled", aR: 2.6, aL: 0.6, look: 0.2, headTilt: -0.15 }); s.add(at(m, -4.6, 0, 0.8));
  card(`<h4>30 Apr</h4><div class="row"><span>Cash <span class="dr">Dr</span></span><span class="dr">₹22,000</span></div><div class="row"><span>&nbsp;&nbsp;To Sales <span class="cr">Cr</span></span><span class="cr">₹22,000</span></div><div class="row muted"><span>(cash sales, Apr 16–30)</span></div>`, [1.5, 4.8, -0.2]);
} });

// L9 · The Ledger
scene({ bg: 0xd6efe2, cam: CAM(0, 2.7, 15.5, 0, 2.5, 0), build(s, lb, card) {
  const sh = new THREE.Group(); s.add(at(sh, 1.6, 0, -1.6));
  [1.35, 2.95].forEach((y) => sh.add(at(K.rbox(5.4, 0.16, 1.0, 0.05, C.wood, 0.01), 0, y, 0)));
  [-2.7, 2.7].forEach((x) => sh.add(at(K.rbox(0.18, 3.4, 1.0, 0.05, C.woodDark, 0.01), x, 1.7, 0)));
  const icols = [C.gold, C.teal, C.sky, C.leaf, C.coral, C.white, C.saffron];
  [1.43, 3.03].forEach((y, row) => { for (let i = 0; i < 7; i++) { const b = K.miniBook(i % 2 ? C.red : 0xb8322a, 0.95, icols[(i + row * 3) % 7]); b.rotation.z = ((i * 37) % 5 - 2) * 0.02; sh.add(at(b, -2.2 + i * 0.72, y + 0.42, 0.1)); } });
  const jb = K.khata({ open: 1, rows: true, aL: 0, aR: 0 }); jb.scale.setScalar(0.3); jb.rotation.x = -0.9; s.add(at(jb, -4.2, 1.15, 0.8));
  s.add(at(K.rbox(2.4, 1.1, 1.4, 0.06, C.woodDark, 0.01), -4.2, 0.55, 0.5));
  arcPts([-4.0, 1.9, 0.9], [-0.4, 3.9, -1.0], 1.2, 4).forEach((p, i) => { const sl = K.slip(i % 2 ? C.cr : C.dr, 0.9); sl.rotation.set(0.2, 0.3 * i, 0.4 - i * 0.2); s.add(at(sl, ...p)); });
  s.add(at(K.crate(), 4.9, 0, 0.6));
  const m = K.meera({ expr: "happy", aL: 2.4, look: -0.4 }); m.scale.setScalar(0.92); s.add(at(m, 4.9, 0.8, 0.6));
  card(`<h4>Cash</h4><div class="row"><span class="dr">Dr total</span><span class="dr">₹1,24,000</span></div><div class="row"><span class="cr">Cr total</span><span class="cr">₹73,300</span></div><div class="row tot"><span>Balance</span><span>₹50,700 Dr</span></div>`, [-3.9, 4.3, 0.6]);
} });

// L10 · Month-End Surprises
scene({ bg: 0xf7c9a8, light: "dusk", cam: CAM(0, 2.6, 15.5, 0, 2.4, 0), build(s, lb) {
  const m = K.meera({ expr: "happy", aL: 2.5, aR: 2.5 }); s.add(at(m, -4.4, 0, 0.6));
  const r = K.mulberry32(42), cc = [C.saffron, C.teal, C.coral, C.sky, C.leaf, C.gold, C.pink];
  for (let i = 0; i < 70; i++) { const c = K.rbox(0.16, 0.08, 0.02, 0.01, cc[i % 7], 0); c.rotation.set(r() * 6, r() * 6, r() * 6); s.add(at(c, -4.4 + (r() - 0.5) * 4.5, 3.2 + r() * 2.6, (r() - 0.5) * 2)); }
  const k = K.khata({ open: 0, aL: 0.5, aR: 2.9, mouth: "o" }); k.scale.setScalar(0.5); s.add(at(k, -0.9, 0, 1.0));
  const env = grp(K.rbox(1.1, 0.7, 0.05, 0.03, C.white, 0)); const fl = K.rbox(0.8, 0.4, 0.04, 0.02, 0xece4d8, 0); fl.rotation.z = Math.PI / 4; env.add(at(fl, 0, 0.12, 0.03));
  env.rotation.z = 0.25; s.add(at(env, 1.6, 4.0, 0));
  s.add(at(K.jar({ level: 0.14, coins: false, fill: 0x5a3b2a, s: 0.9 }), 2.6, 0, 0.6));
  s.add(at(K.cart({ s: 0.55 }), 4.7, 0, -1.4));
  s.add(at(K.jar({ level: 0.12, s: 0.75, tint: 0xf5e1dc }), 5.8, 0, 0.9));
  arcPts([5.2, 1.4, -0.2], [5.8, 1.0, 0.9], 0.3, 3).forEach((p) => s.add(at(K.coin(0.6), ...p)));
  lb("Profit ₹36,700 → ₹24,700", [0.6, 5.2, 0], "ink big");
  lb(`${ICON.zap}Electricity ₹1,000`, [1.6, 3.1, 0], "sm");
  lb("Supplies used ₹10,000", [2.6, -0.35, 0.6], "sm");
  lb("Depreciation ₹1,000", [5.5, 2.75, 0.4], "sm");
} });

// L11 · The Trial Balance
scene({ bg: 0xe2e9f7, cam: CAM(0, 2.8, 16, 0, 2.6, 0), build(s, lb, card) {
  const tower = new THREE.Group(); s.add(at(tower, -1.4, 0, 0)); tower.rotation.z = 0.06;
  for (let i = 0; i < 11; i++) { const b = K.miniBook(i % 2 ? C.red : 0xb8322a, 1.3); b.rotation.set(Math.PI / 2, 0, ((i * 53) % 7 - 3) * 0.06); tower.add(at(b, Math.sin(i * 1.3) * 0.1, 0.22 + i * 0.4, 0)); }
  const k = K.khata({ open: 0, aL: 0.5, aR: 2.8 }); k.scale.setScalar(0.32); tower.add(at(k, 0, 4.6, 0));
  const m = K.meera({ expr: "puzzled", aR: 1.0, armFwd: 0.4, look: 0.4 }); s.add(at(m, -3.6, 0, 0.6));
  const tz = K.taraazu({ s: 0.42 }); s.add(at(tz, 4.6, 0, -0.4));
  card(`<h4>Trial Balance · 30 Apr</h4><div class="row"><span class="dr">Debits</span><span class="dr">₹1,36,000</span></div><div class="row"><span class="cr">Credits</span><span class="cr">₹1,36,000</span></div><div class="row tot"><span>Difference</span><span>₹0</span></div>`, [3.0, 4.6, 0]);
} });

// L12 · The Profit & Loss Statement — a tiny cinema, Khata the usher
scene({ bg: 0x3a2f55, light: "cinema", cam: CAM(0.6, 2.9, 16.2, 0.6, 2.6, 0), build(s, lb, card) {
  s.add(at(K.rbox(7.4, 4.2, 0.3, 0.12, 0x241d33, 0.01), -0.8, 3.4, -3.0));
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(6.8, 3.7), new THREE.MeshBasicMaterial({ color: 0xf2efe8 })); s.add(at(scr, -0.8, 3.4, -2.83));
  for (let i = 0; i < 6; i++) { const seat = grp(K.rbox(0.9, 0.55, 0.7, 0.12, 0xb8322a, 0.01)); seat.add(at(K.rbox(0.9, 0.9, 0.2, 0.08, 0x9e2a24, 0.01), 0, 0.5, -0.3)); s.add(at(seat, -3.6 + i * 1.05, 0.3, 1.6)); }
  const m = K.meera({ pose: "sit", expr: "happy", aR: 0.6, armFwd: 0.9, look: -0.2 }); m.scale.setScalar(0.72); m.rotation.y = Math.PI; s.add(at(m, -1.5, 0.05, 1.45));
  const pop = K.cyl(0.2, 0.15, 0.4, 0xf4efe6, 16); s.add(at(pop, -1.15, 1.3, 1.1));
  const k = K.khata({ open: 0, aL: 0.4, aR: 1.7 }); k.scale.setScalar(0.5); s.add(at(k, 3.1, 0, 1.4));
  const torch = grp(K.cyl(0.08, 0.08, 0.5, 0x3a3030, 10)); torch.rotation.z = Math.PI / 2; s.add(at(torch, 4.2, 1.55, 1.5));
  const r = K.raviMama({ expr: "puzzled", aL: 0.9, armFwd: 0.6, look: -0.4 }); r.scale.setScalar(0.82); s.add(at(r, 4.8, 0, 0.4));
  const io = K.iou(0.7); io.rotation.z = 0.25; s.add(at(io, 4.0, 2.2, 0.9));
  s.add(at(K.cart({ s: 0.3 }), 5.7, 0, 1.6));
  card(`<h4>April · Profit &amp; Loss</h4><div class="row"><span>Sales</span><span>₹50,000</span></div><div class="row"><span>Cost of supplies</span><span>(₹10,000)</span></div><div class="row"><span>Other expenses</span><span>(₹15,300)</span></div><div class="row tot"><span>Net profit</span><span>₹24,700</span></div>`, [-0.8, 3.45, -2.8]);
} });

// L13 · The Balance Sheet — the photo
scene({ bg: 0xd2e6f7, cam: CAM(0, 2.7, 14.2, 0, 2.7, 0), build(s, lb, card) {
  const p = K.polaroid(3.3, C.saffron); p.rotation.z = -0.06; s.add(at(p, -0.6, 2.9, -0.6));
  const ms = K.cart({ s: 0.36 }); s.add(at(ms, -1.0, 2.05, -0.45));
  s.add(at(K.galla({ open: 0.8, notes: 4, s: 0.38 }), 0.35, 2.05, -0.4));
  const k = K.khata({ open: 0, aL: 0.6, aR: 1.25, wink: true }); k.scale.setScalar(0.55); s.add(at(k, -5.0, 0, 1.0));
  const camB = grp(K.rbox(0.9, 0.6, 0.45, 0.1, 0x2f2a33, 0.01)); const lens = K.cyl(0.2, 0.22, 0.25, 0x5a5560, 24); lens.rotation.x = Math.PI / 2; camB.add(at(lens, 0, 0, 0.32));
  camB.rotation.y = -0.3; s.add(at(camB, -3.95, 1.45, 1.3));
  const fl = K.star(0xfff4c2, 2.0); s.add(at(fl, -3.2, 1.9, 1.5));
  const f = K.filmStrip(3, 0.6); f.rotation.z = 0.6; s.add(at(f, -3.0, 5.0, -0.4));
  arcPts([-2.6, 4.6, -0.3], [-0.9, 4.3, -0.3], 0.5, 4).forEach((pp) => s.add(at(K.coin(0.7), ...pp)));
  card(`<h4>Balance Sheet · 30 Apr</h4><div class="row"><span class="dr">Assets</span><span class="dr">₹1,06,700</span></div><div class="row"><span class="cr">Liabilities</span><span class="cr">₹35,000</span></div><div class="row"><span class="cr">Equity</span><span class="cr">₹71,700</span></div><div class="row tot"><span>Both sides</span><span>₹1,06,700</span></div>`, [4.1, 2.8, 0]);
} });

// L14 · Where Did the Money Go? — night rhyme, coin waterfall
scene({ bg: 0x34416a, light: "night", cam: CAM(0, 2.6, 15.5, 0, 2.5, 0), build(s, lb) {
  stringLights(s, 5.2);
  s.add(at(K.cart({ s: 0.75 }), 5.4, 0, -2.2));
  const m = K.meera({ expr: "happy", aL: 0.4, aR: 1.0, armFwd: 0.4, look: 0.3 }); s.add(at(m, -4.3, 0, 0.8));
  const k = K.khata({ open: 1, tintL: 0.4, tintR: 0.4, aL: 1.4, aR: 2.6 }); k.scale.setScalar(0.36); s.add(at(k, -1.6, 0, 1.3));
  s.add(at(K.crate(), 2.4, 0, 0.4));
  const g = K.galla({ open: 0.95, notes: 10, s: 1.2 }); s.add(at(g, 2.4, 0.8, 0.4));
  const purse = K.rbox(0.7, 0.5, 0.3, 0.15, C.pink, 0.01); s.add(at(purse, -0.4, 5.1, -0.4));
  const um = K.umbrella(); um.rotation.z = Math.PI * 0.85; s.add(at(um, 2.4, 5.7, -0.4));
  const cup = K.cyl(0.26, 0.2, 0.5, 0xc98a4a, 16); s.add(at(cup, 5.0, 5.0, -0.4));
  [[-0.4, 4.8], [2.4, 4.9], [5.0, 4.7]].forEach(([x, y], j) => arcPts([x, y, -0.3], [2.4, 1.8, 0.4], 0.5, 5).forEach((p, i) => { const c = K.coin(0.75); c.rotation.set(i * 0.4, j + i * 0.3, 0); s.add(at(c, ...p)); }));
  lb("₹61,700 <small>cash + bank</small>", [2.4, -0.4, 0.4], "dr");
  lb("+₹50,000", [-0.4, 5.85, -0.4], "sm");
  lb("+₹30,000", [3.3, 6.0, -0.4], "sm");
  lb("+₹23,700", [5.0, 5.75, -0.4], "sm");
  lb("Profit ₹24,700", [-4.3, 4.5, 0.8], "leaf");
} });

// ---------- labels: project 3D anchors to screen once per scene
const v = new THREE.Vector3();
function placeLabels(i) {
  const sc = SCENES[i], host = document.getElementById("labels-" + (i + 1));
  if (host.dataset.built) return;
  host.dataset.built = "1";
  sc.labels.forEach((l) => {
    v.set(...l.p).project(camera);
    const el = document.createElement("div");
    el.className = l.card ? "card" : "lb " + l.cls;
    el.innerHTML = l.html;
    el.style.left = ((v.x + 1) / 2) * 1920 + "px";
    el.style.top = ((1 - v.y) / 2) * 1080 + "px";
    host.appendChild(el);
  });
}
function setCam(i) {
  const c = SCENES[i].cam;
  camera.fov = c.fov; camera.position.set(...c.pos); camera.lookAt(...c.look); camera.updateProjectionMatrix();
}
SCENES.forEach((_, i) => { setCam(i); placeLabels(i); });

function renderAt(time) {
  const i = Math.max(0, Math.min(SCENES.length - 1, Math.floor(time + 1e-6)));
  setCam(i);
  renderer.render(SCENES[i].s, camera);
}
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);

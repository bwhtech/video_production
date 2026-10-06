// Clay kit — factory functions returning THREE.Group. Deterministic (seeded noise only).
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const C = {
  red: 0xc8372d, redDark: 0x8e2a22, gold: 0xe9b949, brass: 0xd9a23a, page: 0xfffaf0, ink: 0x2b2233,
  white: 0xfdfaf4, cheek: 0xf29a8f, dr: 0x3d7fd9, cr: 0xe8862e, set: 0xf6e3cf,
  skin: 0xb07650, skinDark: 0x8d5a3b, hair: 0x2a1c19, mustard: 0xe8b23a, teal: 0x2fa79a, cream: 0xf3e7d3,
  wood: 0xa86c3c, woodDark: 0x7a4a26, saffron: 0xf2a33a, leaf: 0x5db96b, coral: 0xef6f5e, navy: 0x2b3a55,
  sky: 0x4c9be0, grey: 0xb9b3ad, kurtaWhite: 0xf4efe6, blue: 0x5d8fd6, green: 0x7cb46b, pink: 0xe58fa8,
};

// ---------- deterministic noise
export function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Clay surface: thumb smudges + fingerprint ridges + fine grain, as a bump map.
function clayBump(seed) {
  const s = 512, cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const g = cv.getContext("2d"), rnd = mulberry32(seed);
  g.fillStyle = "#808080"; g.fillRect(0, 0, s, s);
  for (let i = 0; i < 2600; i++) {
    const v = 90 + rnd() * 80;
    g.fillStyle = `rgba(${v},${v},${v},0.16)`;
    g.beginPath(); g.ellipse(rnd() * s, rnd() * s, 3 + rnd() * 16, 2 + rnd() * 8, rnd() * Math.PI, 0, Math.PI * 2); g.fill();
  }
  for (let f = 0; f < 22; f++) {                      // fingerprints: tight concentric arcs
    const cx = rnd() * s, cy = rnd() * s, rot = rnd() * Math.PI, rings = 6 + Math.floor(rnd() * 7);
    for (let r = 0; r < rings; r++) {
      const v = r % 2 ? 150 : 105;
      g.strokeStyle = `rgba(${v},${v},${v},0.32)`; g.lineWidth = 1.6;
      g.beginPath(); g.ellipse(cx, cy, 4 + r * 3.2, 3 + r * 2.4, rot, Math.PI * 0.15, Math.PI * 1.25); g.stroke();
    }
  }
  const img = g.getImageData(0, 0, s, s), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const n = (rnd() - 0.5) * 26; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1.5, 1.5);
  return t;
}
const BUMP = clayBump(11);
const matCache = new Map();
export const clay = (color, extra = {}) => {
  const key = color + JSON.stringify(extra);
  if (!extra.map && matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, bumpMap: BUMP, bumpScale: 1.6, ...extra });
  if (!extra.map) matCache.set(key, m);
  return m;
};

// Slightly irregular, hand-pressed forms: displace vertices along their normals with smooth noise.
export function lumpy(geo, amt = 0.025, seed = 1) {
  const p = geo.attributes.position, n = geo.attributes.normal;
  if (!n) return geo;
  const a = seed * 1.7, b = seed * 2.3;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const k = Math.sin(x * 3.1 + a) * Math.cos(y * 2.7 + b) + Math.sin(z * 3.7 + y * 1.3 + a) * 0.6;
    const d = k * amt;
    p.setXYZ(i, x + n.getX(i) * d, y + n.getY(i) * d, z + n.getZ(i) * d);
  }
  p.needsUpdate = true;
  return geo;
}

let seedCounter = 1;
export const mesh = (geo, mat, lump = 0) => {
  if (lump) lumpy(geo, lump, seedCounter++);
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true; m.receiveShadow = true;
  return m;
};
export const rbox = (w, h, d, r, color, lump = 0.012) => mesh(new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2.01, h / 2.01, d / 2.01)), clay(color), lump);
export const sphere = (r, color, lump = 0) => mesh(new THREE.SphereGeometry(r, 32, 22), clay(color), lump);
export const cap = (r, len, color, lump = 0) => mesh(new THREE.CapsuleGeometry(r, len, 8, 18), clay(color), lump);
export const cyl = (rt, rb, h, color, seg = 32) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg), clay(color));
export const at = (o, x, y, z = 0) => { o.position.set(x, y, z); return o; };
export const grp = (...kids) => { const g = new THREE.Group(); kids.forEach((k) => k && g.add(k)); return g; };
export function arcMesh(r, tube, color, arc = Math.PI, upside = true) {
  const m = mesh(new THREE.TorusGeometry(r, tube, 10, 32, arc), new THREE.MeshStandardMaterial({ color, roughness: 0.5 }));
  if (upside) m.rotation.z = Math.PI;
  return m;
}
export function extrude(shape, color, depth = 0.14, extra = {}) {
  const m = mesh(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 4, curveSegments: 16 }), clay(color, { bumpScale: 0.6, ...extra }));
  m.geometry.center(); return m;
}
export function canvasTex(w, h, draw) {
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  draw(cv.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// ---------- KHATA (face on spine; covers hinged)
export function khata(o = {}) {
  const { open = 1, tintL = 0, tintR = 0, wink = false, aL = 1.0, aR = 1.0, pupX = 0, pupY = 0, rows = false, mouth = "smile" } = o;
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  [-0.42, 0.42].forEach((x) => { const f = sphere(0.3, C.redDark); f.scale.set(1, 0.55, 1.3); at(f, x, 0.17, 0.05); body.add(f); });
  const SW = 1.8, SH = 3.6, SD = 0.72, Y0 = 0.3, FZ = SD / 2;
  body.add(at(rbox(SW, SH, SD, 0.26, C.red, 0.02), 0, Y0 + SH / 2, 0));
  body.add(at(rbox(SW + 0.06, 0.14, SD + 0.06, 0.05, C.gold, 0), 0, 1.35, 0));
  [-1, 1].forEach((s) => {
    const loop = mesh(new THREE.TorusGeometry(0.16, 0.05, 12, 32), clay(C.gold));
    loop.scale.set(1.25, 0.8, 1); loop.rotation.z = s * 0.35; body.add(at(loop, s * 0.18, 1.42, FZ + 0.07));
    const tail = cap(0.045, 0.32, C.gold); tail.rotation.z = s * 0.35; body.add(at(tail, s * 0.12, 1.12, FZ + 0.07));
  });
  body.add(at(sphere(0.09, C.gold), 0, 1.36, FZ + 0.09));
  const face = at(new THREE.Group(), 0, 0, FZ); body.add(face);
  [-0.4, 0.4].forEach((x, i) => {
    if (wink && i === 1) { face.add(at(arcMesh(0.2, 0.04, C.ink), x, 3.0, 0.04)); return; }
    const w = sphere(0.27, C.white); w.material = clay(C.white, { roughness: 0.4, bumpScale: 0.1 }); w.scale.set(0.92, 1.1, 0.42);
    face.add(at(w, x, 2.95, 0.02));
    const p = mesh(new THREE.SphereGeometry(0.135, 24, 16), new THREE.MeshStandardMaterial({ color: C.ink, roughness: 0.25 }));
    p.scale.set(1, 1, 0.5); face.add(at(p, x + pupX, 2.92 + pupY, 0.12));
    face.add(at(mesh(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })), x + pupX - 0.045, 2.97 + pupY, 0.19));
  });
  [-0.58, 0.58].forEach((x) => {
    const ch = mesh(new THREE.CircleGeometry(0.15, 24), new THREE.MeshStandardMaterial({ color: C.cheek, roughness: 0.9, transparent: true, opacity: 0.8 }));
    ch.scale.set(1.4, 0.85, 1); face.add(at(ch, x, 2.58, 0.012));
  });
  if (mouth === "o") face.add(at(mesh(new THREE.TorusGeometry(0.09, 0.035, 10, 24), new THREE.MeshStandardMaterial({ color: C.ink })), 0, 2.58, 0.03));
  else {
    const ms = mesh(new THREE.CircleGeometry(0.21, 32, Math.PI, Math.PI), new THREE.MeshStandardMaterial({ color: C.ink, roughness: 0.4 }));
    ms.scale.set(1, 0.9, 1); face.add(at(ms, 0, 2.6, 0.02));
    const tg = mesh(new THREE.CircleGeometry(0.1, 24, Math.PI, Math.PI), new THREE.MeshStandardMaterial({ color: C.cheek }));
    tg.scale.set(1, -0.7, 1); face.add(at(tg, 0, 2.5, 0.025));
  }
  const CW = 3.35, CH = 3.25, CD = 0.14, CY = Y0 + 0.2 + CH / 2;
  const PAGE = new THREE.Color(0xffffff), DR = new THREE.Color(0x8fbcf7), CR = new THREE.Color(0xffbf85);
  [-1, 1].forEach((side) => {
    const pivot = at(new THREE.Group(), side * (SW / 2 - 0.05), CY, -0.08); body.add(pivot);
    pivot.add(at(rbox(CW, CH, CD, 0.06, C.red, 0), side * CW / 2, 0, 0));
    pivot.add(at(rbox(CW, CH, 0.08, 0.04, C.redDark, 0), side * (CW / 2 + 0.05), -0.08, -0.08));
    const tex = canvasTex(512, 496, (g, w, h) => {
      g.fillStyle = "#fffaf0"; g.fillRect(0, 0, w, h);
      g.strokeStyle = "#e6d0ae"; g.lineWidth = 5;
      for (let y = 90; y < h - 30; y += 62) { g.beginPath(); g.moveTo(24, y); g.lineTo(w - 24, y); g.stroke(); }
      g.strokeStyle = "#e7a49a"; const mx = side < 0 ? 80 : w - 80;
      g.beginPath(); g.moveTo(mx, 16); g.lineTo(mx, h - 16); g.stroke();
      if (rows) {                                         // abstract journal entries
        const r = mulberry32(side + 9);
        for (let y = 70; y < h - 40; y += 62) {
          g.fillStyle = "#6b5f73"; g.fillRect(side < 0 ? 100 : 30, y - 22, 120 + r() * 160, 9);
          g.fillStyle = side < 0 ? "#3d7fd9" : "#e8862e"; g.fillRect(side < 0 ? 380 : 300, y - 26, 70, 16);
        }
      }
    });
    const pm = new THREE.MeshStandardMaterial({ color: PAGE.clone().lerp(side < 0 ? DR : CR, side < 0 ? tintL : tintR), map: tex, roughness: 0.92, bumpMap: BUMP, bumpScale: 0.4 });
    pivot.add(at(mesh(new THREE.PlaneGeometry(CW - 0.3, CH - 0.3), pm), side * CW / 2, 0, CD / 2 + 0.03));
    pivot.rotation.y = side * (Math.PI / 2) * 1.02 * (1 - open);
  });
  [[-1, aL], [1, aR]].forEach(([side, a]) => {
    const sx = SW / 2 + 0.05 + open * (CW - 0.12);
    const sh = at(new THREE.Group(), side * sx, 2.25, 0.15); body.add(sh);
    sh.add(at(cap(0.1, 0.5, C.redDark), 0, -0.33, 0));
    sh.add(at(sphere(0.16, C.redDark), 0, -0.7, 0));
    sh.rotation.z = side * a;
  });
  root.userData.body = body;
  return root;
}

// ---------- PEOPLE (one builder, many variants). Origin = between the feet.
export function person(o = {}) {
  const {
    skin = C.skin, top = C.mustard, bottom = C.cream, apron = null, hair = "bun", hairColor = C.hair,
    moustache = false, belly = 0, aL = 0.25, aR = 0.25, pose = "stand", expr = "smile", pencil = false,
    earrings = false, lanyard = false, headTilt = 0, look = 0, glasses = false, shoes = 0x5a3a2a,
  } = o;
  const root = new THREE.Group(), g = new THREE.Group(); root.add(g);
  const hipY = pose === "stand" ? 0.95 : 0.95;
  // legs
  if (pose === "stand") {
    [-0.2, 0.2].forEach((x) => {
      g.add(at(cap(0.16, 0.62, bottom, 0.006), x, 0.52, 0));
      const s = sphere(0.17, shoes); s.scale.set(1, 0.55, 1.5); g.add(at(s, x, 0.1, 0.08));
    });
  } else if (pose === "sit") {                         // sitting on something ~0.95 high
    [-0.2, 0.2].forEach((x) => {
      const th = cap(0.16, 0.5, bottom); th.rotation.x = Math.PI / 2; g.add(at(th, x, 0.98, 0.35));
      g.add(at(cap(0.15, 0.55, bottom), x, 0.55, 0.7));
      const s = sphere(0.17, shoes); s.scale.set(1, 0.55, 1.5); g.add(at(s, x, 0.12, 0.78));
    });
  } else if (pose === "cross") {                       // cross-legged on the floor
    [-1, 1].forEach((s) => { const th = cap(0.17, 0.55, bottom); th.rotation.z = Math.PI / 2; th.rotation.y = s * 0.35; g.add(at(th, s * 0.32, 0.2, 0.25)); });
  }
  const baseY = pose === "cross" ? -0.6 : 0;
  const torso = at(new THREE.Group(), 0, baseY, 0); g.add(torso);
  // kurta / shirt as a lathe
  const prof = [];
  const flare = top === C.kurtaWhite || o.longKurta ? 0.66 : 0.56;
  prof.push(new THREE.Vector2(0.001, 0.72), new THREE.Vector2(flare, 0.74), new THREE.Vector2(flare - 0.06, 1.1),
    new THREE.Vector2(0.44 + belly * 0.9, 1.45), new THREE.Vector2(0.47 + belly * 0.5, 1.8), new THREE.Vector2(0.48, 2.02),
    new THREE.Vector2(0.36, 2.2), new THREE.Vector2(0.001, 2.24));
  const body = mesh(new THREE.LatheGeometry(prof, 40), clay(top), 0.012);
  torso.add(body);
  if (apron) {
    const ap = mesh(new THREE.CylinderGeometry(0.52 + belly * 0.7, 0.62, 1.05, 32, 1, true, -0.85, 1.7), clay(apron, { side: THREE.DoubleSide }));
    ap.rotation.y = 0; torso.add(at(ap, 0, 1.3, 0.02));
    const bib = rbox(0.5, 0.42, 0.06, 0.04, apron, 0); bib.rotation.x = -0.12; torso.add(at(bib, 0, 1.95, 0.42));
  }
  if (lanyard) {
    const ly = mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 32, Math.PI), clay(C.coral)); ly.rotation.z = Math.PI; ly.rotation.x = -0.25;
    torso.add(at(ly, 0, 2.08, 0.32)); torso.add(at(rbox(0.22, 0.28, 0.04, 0.03, C.white, 0), 0, 1.72, 0.47));
  }
  // arms (pivot at shoulders; built hanging; aL/aR = outward raise in radians)
  [[-1, aL], [1, aR]].forEach(([s, a]) => {
    const sh = at(new THREE.Group(), s * 0.47, 2.02, 0); torso.add(sh);
    sh.add(at(cap(0.12, 0.62, top), 0, -0.38, 0));
    sh.add(at(sphere(0.13, skin), 0, -0.82, 0));
    sh.rotation.z = s * a; sh.rotation.x = o.armFwd ? -o.armFwd : 0;
    root.userData[s < 0 ? "handL" : "handR"] = sh;
  });
  // head
  const head = at(new THREE.Group(), 0, 2.25, 0); torso.add(head);
  head.rotation.z = headTilt; head.rotation.y = look;
  head.add(at(cyl(0.12, 0.13, 0.2, skin), 0, 0.05, 0));
  head.add(at(sphere(0.55, skin, 0.01), 0, 0.55, 0));
  head.add(at(sphere(0.07, C.skinDark), 0, 0.48, 0.54));
  if (hair === "bun" || hair === "bob" || hair === "short") {
    const capG = new THREE.SphereGeometry(0.585, 36, 20, 0, Math.PI * 2, 0, Math.PI * (hair === "bob" ? 0.62 : 0.52));
    const hc = mesh(capG, clay(hairColor), 0.01); hc.rotation.x = -0.42; head.add(at(hc, 0, 0.6, -0.03));
    if (hair === "bob") { [-1, 1].forEach((s) => { const sd = cap(0.2, 0.45, hairColor); head.add(at(sd, s * 0.48, 0.35, -0.08)); }); }
    if (hair === "bun") {
      head.add(at(sphere(0.27, hairColor, 0.01), 0, 1.15, -0.25));
      if (pencil) {
        const pg = new THREE.Group(); pg.position.set(0, 1.2, -0.25); pg.rotation.z = -0.75; pg.rotation.x = 0.2; head.add(pg);
        pg.add(at(cyl(0.035, 0.035, 0.8, 0xf5c518, 6), 0, 0, 0));
        pg.add(at(cyl(0.036, 0.036, 0.08, C.pink, 12), 0, 0.42, 0));
        pg.add(at(mesh(new THREE.ConeGeometry(0.036, 0.12, 6), clay(0xe8c9a0)), 0, -0.46, 0)); pg.children[2].rotation.x = Math.PI;
      }
    }
  } else if (hair === "bald") {
    const ring = mesh(new THREE.TorusGeometry(0.5, 0.12, 12, 32, Math.PI * 1.3), clay(hairColor)); ring.rotation.x = Math.PI / 2; ring.rotation.z = -0.3 + Math.PI * 0.35;
    head.add(at(ring, 0, 0.5, -0.05));
  }
  // face
  const ey = 0.62, ez = 0.5;
  [-0.19, 0.19].forEach((x) => {
    const e = mesh(new THREE.SphereGeometry(0.075, 16, 12), new THREE.MeshStandardMaterial({ color: C.ink, roughness: 0.3 }));
    e.scale.set(1, expr === "happy" ? 0.45 : 1.15, 0.6); head.add(at(e, x, ey, ez));
    head.add(at(mesh(new THREE.SphereGeometry(0.022, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })), x - 0.02, ey + 0.03, ez + 0.05));
    if (expr === "puzzled") { const b = cap(0.022, 0.12, C.hair); b.rotation.z = Math.PI / 2 + (x < 0 ? 0.35 : -0.15); head.add(at(b, x, ey + 0.2 + (x < 0 ? 0.03 : 0), ez - 0.02)); }
  });
  if (glasses) [-0.19, 0.19].forEach((x) => head.add(at(mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 24), clay(C.ink)), x, ey, ez + 0.04)));
  [-0.32, 0.32].forEach((x) => { const ch = mesh(new THREE.CircleGeometry(0.09, 20), new THREE.MeshStandardMaterial({ color: C.cheek, transparent: true, opacity: 0.7 })); ch.scale.set(1.3, 0.8, 1); ch.position.set(x, 0.45, 0.47); ch.lookAt(x * 3, 0.45, 3); head.add(ch); });
  if (expr === "puzzled") head.add(at(mesh(new THREE.TorusGeometry(0.055, 0.022, 8, 20), clay(C.ink)), 0.04, 0.32, 0.51));
  else { const m = arcMesh(expr === "happy" ? 0.13 : 0.11, 0.024, C.ink); m.scale.y = 0.8; head.add(at(m, 0, 0.37, 0.5)); }
  if (moustache) [-1, 1].forEach((s) => { const mm = cap(0.055, 0.2, C.grey); mm.rotation.z = s * 1.2; head.add(at(mm, s * 0.12, 0.4, 0.53)); });
  if (earrings) [-0.54, 0.54].forEach((x) => head.add(at(sphere(0.05, C.gold), x, 0.42, 0.02)));
  root.userData.head = head;
  return root;
}
export const meera = (o = {}) => person({ apron: C.teal, pencil: true, earrings: true, ...o });
export const raviMama = (o = {}) => person({ top: C.kurtaWhite, bottom: C.kurtaWhite, hair: "bald", hairColor: C.grey, moustache: true, belly: 0.16, skin: 0xa36b47, glasses: true, longKurta: true, ...o });
export const priya = (o = {}) => person({ top: C.blue, bottom: C.navy, hair: "bob", lanyard: true, skin: 0xc28a62, shoes: C.ink, ...o });

export function umbrella() {
  const g = new THREE.Group();
  g.add(at(cyl(0.03, 0.03, 1.5, C.ink, 8), 0, 0.75, 0));
  g.add(at(mesh(new THREE.ConeGeometry(0.16, 1.1, 12), clay(C.ink)), 0, 0.9, 0));
  const h = mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 16, Math.PI), clay(C.woodDark)); h.rotation.z = Math.PI; g.add(at(h, -0.1, 0.02, 0));
  return g;
}

// ---------- PROPS
export function coin(s = 1) {
  const g = new THREE.Group();
  const c = cyl(0.22 * s, 0.22 * s, 0.07 * s, C.gold, 28); c.rotation.x = Math.PI / 2; g.add(c);
  const r = mesh(new THREE.TorusGeometry(0.17 * s, 0.018 * s, 6, 24), clay(0xc99a33)); g.add(at(r, 0, 0, 0.04 * s));
  return g;
}
export function note(color = C.green, s = 1) { return rbox(0.62 * s, 0.32 * s, 0.03 * s, 0.02, color, 0.004); }
export function noteBundle(s = 1) {
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) g.add(at(note(i % 2 ? 0x8fbf7a : 0x9ccf88, s), 0, i * 0.035 * s, 0));
  g.add(at(rbox(0.16 * s, 0.36 * s, 0.17 * s, 0.02, C.white, 0), 0, 0.06 * s, 0));
  g.children.forEach((c) => (c.rotation.x = 0));
  return g;
}
export function galla(o = {}) {
  const { open = 0.9, notes = 6, s = 1 } = o;
  const g = new THREE.Group();
  g.add(at(rbox(1.1 * s, 0.55 * s, 0.75 * s, 0.06, C.wood, 0.01), 0, 0.275 * s, 0));
  const lidP = at(new THREE.Group(), 0, 0.55 * s, -0.37 * s); g.add(lidP);
  lidP.add(at(rbox(1.12 * s, 0.1 * s, 0.77 * s, 0.04, C.woodDark, 0.006), 0, 0.05 * s, 0.37 * s));
  lidP.add(at(rbox(0.14 * s, 0.12 * s, 0.04 * s, 0.02, C.brass, 0), 0, 0.02 * s, 0.76 * s));
  lidP.rotation.x = -open * 1.9;
  const r = mulberry32(notes + 3);
  for (let i = 0; i < notes; i++) {
    const n = note(i % 3 ? 0x9ccf88 : 0xe7a0b8, 0.85 * s); n.rotation.set(-0.5 + r() * 0.6, r() * 1.2 - 0.6, r() * 0.8 - 0.4);
    g.add(at(n, (r() - 0.5) * 0.7 * s, 0.56 * s + r() * 0.12 * s, (r() - 0.5) * 0.4 * s));
  }
  return g;
}
export function jar(o = {}) {
  const { fill = C.gold, level = 0.6, coins = true, s = 1, tint = 0xdfeef5 } = o;
  const g = new THREE.Group();
  const pts = [[0.001, 0], [0.42, 0], [0.48, 0.1], [0.48, 0.9], [0.36, 1.05], [0.3, 1.12], [0.32, 1.2], [0.001, 1.2]].map(([x, y]) => new THREE.Vector2(x * s, y * s));
  const glass = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), new THREE.MeshStandardMaterial({ color: tint, roughness: 0.15, transparent: true, opacity: 0.38 }));
  glass.castShadow = true; g.add(glass);
  if (level > 0) {
    if (coins) {
      const r = mulberry32(Math.floor(level * 100));
      const n = Math.floor(level * 26);
      for (let i = 0; i < n; i++) { const c = coin(0.6 * s); c.rotation.set(Math.PI / 2 + (r() - 0.5) * 0.8, r(), 0); g.add(at(c, (r() - 0.5) * 0.55 * s, (0.08 + (i / n) * level * 0.85) * s, (r() - 0.5) * 0.4 * s)); }
    } else g.add(at(cyl(0.44 * s, 0.44 * s, level * 0.85 * s, fill), 0, level * 0.43 * s, 0));
  }
  g.add(at(cyl(0.34 * s, 0.34 * s, 0.1 * s, C.woodDark), 0, 1.24 * s, 0));
  return g;
}
export function cart(o = {}) {
  const { s = 1, face = false } = o;
  const g = new THREE.Group();
  g.add(at(rbox(3.2, 1.2, 1.3, 0.08, C.wood, 0.015), 0, 1.15, 0));
  g.add(at(rbox(3.4, 0.14, 1.45, 0.05, C.woodDark, 0.006), 0, 1.82, 0));
  for (let i = 0; i < 4; i++) g.add(at(rbox(3.1, 0.04, 0.02, 0.01, C.woodDark, 0), 0, 0.75 + i * 0.27, 0.66));
  [-1, 1].forEach((sx) => {
    const w = mesh(new THREE.TorusGeometry(0.42, 0.08, 12, 32), clay(0x3a3030)); g.add(at(w, sx * 1.15, 0.45, 0.68));
    g.add(at(sphere(0.1, C.brass), sx * 1.15, 0.45, 0.72));
    for (let k = 0; k < 4; k++) { const sp = cyl(0.025, 0.025, 0.8, 0x3a3030, 6); sp.rotation.z = k * Math.PI / 4; g.add(at(sp, sx * 1.15, 0.45, 0.68)); }
  });
  [-1.55, 1.55].forEach((x) => g.add(at(cyl(0.05, 0.05, 1.9, C.woodDark, 8), x, 2.8, 0.55)));
  for (let i = 0; i < 8; i++) {                       // striped awning, scalloped front
    const st = rbox(0.43, 0.14, 1.6, 0.05, i % 2 ? C.cream : C.saffron, 0.006);
    st.rotation.x = 0.28; g.add(at(st, -1.5 + i * 0.43, 3.75, 0.25));
    const sc = sphere(0.215, i % 2 ? C.cream : C.saffron); sc.scale.set(1, 0.7, 0.35); g.add(at(sc, -1.5 + i * 0.43, 3.5, 1.05));
  }
  // kettle on stove + tumblers
  g.add(at(rbox(0.6, 0.25, 0.5, 0.05, 0x4a4040, 0), 0.9, 2.02, 0));
  const k = sphere(0.33, C.brass); k.scale.y = 0.85; k.material = clay(C.brass, { metalness: 0.35, roughness: 0.5 }); g.add(at(k, 0.9, 2.42, 0));
  const sp = cap(0.06, 0.3, C.brass); sp.rotation.z = -1.0; g.add(at(sp, 1.22, 2.5, 0));
  const hd = mesh(new THREE.TorusGeometry(0.22, 0.035, 8, 24, Math.PI), clay(0x3a3030)); g.add(at(hd, 0.9, 2.65, 0));
  for (let i = 0; i < 4; i++) g.add(at(mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.28, 16), new THREE.MeshStandardMaterial({ color: 0xc98a4a, roughness: 0.3, transparent: true, opacity: 0.85 })), -0.2 + i * 0.27 - 0.9, 2.03, 0.35));
  if (face) {                                         // the stall as its own "person" (L1/L2 only)
    [-0.6, 0.6].forEach((x) => { const e = sphere(0.24, C.white); e.scale.z = 0.5; g.add(at(e, x, 3.05, 1.0)); g.add(at(sphere(0.11, C.ink), x, 3.02, 1.12)); });
    const m = arcMesh(0.4, 0.06, C.ink); g.add(at(m, 0, 1.45, 0.7));
  }
  g.scale.setScalar(s);
  return g;
}
export function crate() {
  const g = new THREE.Group();
  g.add(at(rbox(1.0, 0.8, 0.8, 0.04, 0xb88350, 0.01), 0, 0.4, 0));
  [0.2, 0.6].forEach((y) => g.add(at(rbox(1.02, 0.06, 0.82, 0.02, C.woodDark, 0), 0, y, 0)));
  return g;
}
export function filmStrip(frames = 4, s = 1) {
  const g = new THREE.Group();
  g.add(rbox(0.7 * s, frames * 0.62 * s, 0.06 * s, 0.03, 0x2f2a33, 0));
  const colors = [C.saffron, C.teal, C.coral, C.sky, C.leaf];
  for (let i = 0; i < frames; i++) {
    g.add(at(rbox(0.46 * s, 0.46 * s, 0.07 * s, 0.03, colors[i % 5], 0), 0, ((i - (frames - 1) / 2) * 0.62) * s, 0.01));
    [-0.29, 0.29].forEach((x) => [-0.16, 0.16].forEach((y) => g.add(at(rbox(0.06 * s, 0.08 * s, 0.075 * s, 0.01, C.cream, 0), x * s, ((i - (frames - 1) / 2) * 0.62 + y) * s, 0.01))));
  }
  return g;
}
export function polaroid(s = 1, photo = C.sky) {
  const g = new THREE.Group();
  g.add(rbox(1.0 * s, 1.18 * s, 0.05 * s, 0.03, C.white, 0));
  g.add(at(rbox(0.84 * s, 0.82 * s, 0.06 * s, 0.02, photo, 0), 0, 0.1 * s, 0.01));
  const sun = sphere(0.1 * s, C.gold); sun.scale.z = 0.3; g.add(at(sun, 0.22 * s, 0.33 * s, 0.05 * s));
  const hill = sphere(0.36 * s, C.leaf); hill.scale.set(1.2, 0.5, 0.15); g.add(at(hill, -0.1 * s, -0.22 * s, 0.04 * s));
  return g;
}
export function iou(s = 1) {
  const g = new THREE.Group();
  g.add(rbox(0.8 * s, 0.55 * s, 0.03 * s, 0.02, C.white, 0.004));
  for (let i = 0; i < 3; i++) g.add(at(rbox(0.5 * s, 0.035 * s, 0.035 * s, 0.01, 0xb8aca0, 0), -0.05 * s, (0.12 - i * 0.1) * s, 0.02));
  g.add(at(sphere(0.07 * s, C.coral), 0.27 * s, -0.17 * s, 0.03 * s));
  return g;
}
export function tag(color = C.saffron, s = 1) {
  const g = new THREE.Group();
  g.add(rbox(0.36 * s, 0.24 * s, 0.03 * s, 0.03, color, 0));
  g.add(at(mesh(new THREE.TorusGeometry(0.03 * s, 0.01 * s, 6, 12), clay(C.ink)), -0.13 * s, 0, 0.02));
  return g;
}
export function taraazu(o = {}) {
  const { tilt = 0, s = 1 } = o;
  const g = new THREE.Group();
  const brass = clay(C.brass, { metalness: 0.3, roughness: 0.55 });
  const base = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0], [1.0, 0], [1.0, 0.15], [0.6, 0.3], [0.3, 0.45], [0.001, 0.45]].map(([x, y]) => new THREE.Vector2(x, y)), 40), brass);
  base.castShadow = base.receiveShadow = true; g.add(base);
  const pil = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 3.6, 24), brass); pil.castShadow = true; g.add(at(pil, 0, 2.2, 0));
  g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 16), brass), 0, 4.05, 0));
  const beam = at(new THREE.Group(), 0, 3.95, 0); g.add(beam); beam.rotation.z = tilt;
  const bm = new THREE.Mesh(new RoundedBoxGeometry(6.4, 0.16, 0.2, 3, 0.07), brass); bm.castShadow = true; beam.add(bm);
  const pans = [];
  [-1, 1].forEach((side) => {
    const hang = at(new THREE.Group(), side * 3.05, 0, 0); beam.add(hang); hang.rotation.z = -tilt;
    beam.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), brass), side * 3.15, 0, 0));
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2, ch = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 2.25, 6), brass);
      const dx = Math.cos(a) * 0.62, dz = Math.sin(a) * 0.62;
      ch.position.set(dx / 2, -1.1, dz / 2); ch.rotation.z = Math.atan2(dx, 2.2); ch.rotation.x = -Math.atan2(dz, 2.2); hang.add(ch);
    }
    const pan = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0], [0.5, 0.02], [0.8, 0.14], [0.86, 0.24], [0.82, 0.24], [0.001, 0.06]].map(([x, y]) => new THREE.Vector2(x, y)), 40), clay(side < 0 ? 0x6f9fe3 : 0xf0a25b, { metalness: 0.1, roughness: 0.6 }));
    pan.castShadow = pan.receiveShadow = true; hang.add(at(pan, 0, -2.25, 0));
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.035, 8, 40), brass); rim.rotation.x = Math.PI / 2; hang.add(at(rim, 0, -2.01, 0));
    const holder = at(new THREE.Group(), 0, -2.18, 0); hang.add(holder); pans.push(holder);
  });
  g.userData.pans = pans; g.scale.setScalar(s);
  return g;
}
export function gauge(o = {}) {
  const { value = 0.5, color = C.leaf, s = 1 } = o;
  const g = new THREE.Group();
  g.add(at(cyl(0.95, 0.95, 0.18, 0x3a3340, 48), 0, 0, 0)); g.children[0].rotation.x = Math.PI / 2;
  const face = mesh(new THREE.CircleGeometry(0.82, 48), clay(C.cream, { bumpScale: 0.4 })); g.add(at(face, 0, 0, 0.1));
  const arc = mesh(new THREE.TorusGeometry(0.66, 0.06, 8, 40, Math.PI * 1.2), clay(color)); arc.rotation.z = -Math.PI * 0.1; g.add(at(arc, 0, 0, 0.12));
  for (let i = 0; i <= 6; i++) { const a = Math.PI * 1.1 - i * (Math.PI * 1.2 / 6); const t = rbox(0.04, 0.16, 0.04, 0.01, C.ink, 0); t.rotation.z = a - Math.PI / 2; g.add(at(t, Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0.13)); }
  const needle = at(new THREE.Group(), 0, 0, 0.16); g.add(needle);
  needle.add(at(rbox(0.07, 0.62, 0.05, 0.02, C.coral, 0), 0, 0.28, 0));
  needle.rotation.z = Math.PI * 0.6 - value * Math.PI * 1.2;
  g.add(at(sphere(0.1, C.ink), 0, 0, 0.18));
  g.scale.setScalar(s);
  return g;
}
export function miniBook(color = C.red, s = 1, iconColor = C.gold) {
  const g = new THREE.Group();
  g.add(rbox(0.55 * s, 0.78 * s, 0.3 * s, 0.06, color, 0.008));
  g.add(at(rbox(0.57 * s, 0.05 * s, 0.32 * s, 0.02, C.gold, 0), 0, -0.15 * s, 0));
  const ic = sphere(0.1 * s, iconColor); ic.scale.z = 0.4; g.add(at(ic, 0, 0.15 * s, 0.16 * s));
  return g;
}
export function slip(color = C.dr, s = 1) { return rbox(0.6 * s, 0.32 * s, 0.03 * s, 0.03, color, 0.003); }
export function star(color = C.gold, s = 1) {
  const sh = new THREE.Shape(), r = 0.32, k = 0.07;
  sh.moveTo(0, r); sh.quadraticCurveTo(k, k, r, 0); sh.quadraticCurveTo(k, -k, 0, -r); sh.quadraticCurveTo(-k, -k, -r, 0); sh.quadraticCurveTo(-k, k, 0, r);
  const m = extrude(sh, color, 0.08); m.scale.setScalar(s); return m;
}
export function arrow(dir, color, s = 1) {
  const sh = new THREE.Shape(), L = 1.1, T = 0.14, H = 0.36;
  [[-L / 2, -T], [L / 2 - H, -T], [L / 2 - H, -H], [L / 2, 0], [L / 2 - H, H], [L / 2 - H, T], [-L / 2, T]].forEach(([x, y], i) => (i ? sh.lineTo(dir * x, y) : sh.moveTo(dir * x, y)));
  const m = extrude(sh, color); m.scale.setScalar(s); return m;
}
export function qmark(color = C.dr, s = 1) {
  const g = new THREE.Group();
  const p = new THREE.CurvePath();
  p.add(new THREE.CubicBezierCurve3(new THREE.Vector3(-0.2, 0.25, 0), new THREE.Vector3(-0.2, 0.6, 0), new THREE.Vector3(0.32, 0.55, 0), new THREE.Vector3(0.22, 0.2, 0)));
  p.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(0.22, 0.2, 0), new THREE.Vector3(0.02, 0.05, 0), new THREE.Vector3(0.02, -0.12, 0)));
  g.add(mesh(new THREE.TubeGeometry(p, 48, 0.085, 12, false), clay(color)));
  g.add(at(sphere(0.1, color), 0, -0.36, 0)); g.scale.setScalar(s);
  return g;
}
export function arch(color, s = 1) {
  const g = new THREE.Group();
  [-0.75, 0.75].forEach((x) => g.add(at(rbox(0.3, 2.0, 0.4, 0.08, color, 0.01), x, 1.0, 0)));
  const top = mesh(new THREE.TorusGeometry(0.75, 0.16, 12, 32, Math.PI), clay(color), 0.01); g.add(at(top, 0, 2.0, 0));
  g.scale.setScalar(s); return g;
}

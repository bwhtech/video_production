import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

const kit = new URL('../../lessons/shared/kit/', import.meta.url);
const output = new URL('../public/art/', import.meta.url);
const dom = new JSDOM('<!doctype html><body></body>', { runScripts: 'outside-only' });

for (const file of ['icons.js', 'kit.js', 'rig.js']) {
  dom.window.eval(await readFile(new URL(file, kit), 'utf8'));
}

const K = dom.window.KIT;
const browser = await chromium.launch({ channel: 'chrome' });
const textureNames = { grain: 'construction', cover: 'cover', paper: 'paper', kraft: 'kraft' };
let definitions = '';
for (const [name, file] of Object.entries(textureNames)) {
  const texture = await sharp(await readFile(new URL(`tex/${file}.jpg`, kit))).resize(384).jpeg({ quality: 72 }).toBuffer();
  definitions += `<pattern id="pat-${name}" patternUnits="userSpaceOnUse" width="768" height="432"><image href="data:image/jpeg;base64,${texture.toString('base64')}" width="768" height="432" /></pattern>`;
}
for (let level = 1; level <= 3; level++) {
  definitions += `<filter id="sh${level}" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="${level * 2}" dy="${level * 3}" stdDeviation="${level * 1.2}" flood-color="#3b2614" flood-opacity=".28" /></filter>`;
}

const scenes = [
  { name: 'meera', width: 420, height: 760, draw: svg => K.meera(svg, 205, 720, 1.06, { expr: 'happy', aL: [12, 10], aR: [45, 65] }) },
  { name: 'stall', width: 960, height: 840, draw: svg => K.stall(svg, 480, 800, 1.12, { galla: false }) },
  { name: 'khata', width: 920, height: 480, draw: svg => {
    const khata = K.khataRig(svg, 460, 442, 0.95, { open: true, expr: 'awake', blankPages: true });
    Object.values(khata.tints).forEach(tint => tint.setAttribute('opacity', '1'));
  } },
];

for (const scene of scenes) {
  const svg = K.el('svg', { xmlns: 'http://www.w3.org/2000/svg', width: scene.width, height: scene.height, viewBox: `0 0 ${scene.width} ${scene.height}` });
  svg.innerHTML = `<defs>${definitions}</defs>`;
  const rig = scene.draw(svg);
  if (scene.name === 'stall') rig.steam?.setAttribute('opacity', '0');
  if (scene.name === 'meera') {
    rig.head.classList.add('meera-head');
    rig.arms.R.upper.classList.add('meera-upper-arm');
    rig.arms.R.fore.classList.add('meera-forearm');
    rig.face.brows.neutral.classList.add('meera-brows-rest');
    rig.face.brows.puzzled.classList.add('meera-brows-thinking');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    await mkdir(new URL('../src/assets/', import.meta.url), { recursive: true });
    await writeFile(new URL('../src/assets/meera-hero.svg', import.meta.url), svg.outerHTML);
  }
  // Chromium preserves the kit's layered SVG drop-shadow filters.
  const page = await browser.newPage({ viewport: { width: scene.width, height: scene.height } });
  await page.setContent(`<style>body{margin:0}svg{display:block}</style>${svg.outerHTML}`);
  const screenshot = await page.screenshot({ omitBackground: true });
  await sharp(screenshot).webp({ quality: 88 }).toFile(fileURLToPath(new URL(`${scene.name}.webp`, output)));
  await page.close();
  console.log(`Exported ${scene.name}.webp`);
}

// Transparent grain lets each paper surface keep its own token colour.
const grain = await sharp(await readFile(new URL('tex/paper.jpg', kit))).resize(384).greyscale().raw().toBuffer({ resolveWithObject: true });
const pixels = Buffer.alloc(grain.info.width * grain.info.height * 4);
for (let i = 0; i < grain.data.length; i++) {
  pixels[i * 4] = 68;
  pixels[i * 4 + 1] = 48;
  pixels[i * 4 + 2] = 26;
  pixels[i * 4 + 3] = Math.round((255 - grain.data[i]) * 0.22);
}
await sharp(pixels, { raw: { width: grain.info.width, height: grain.info.height, channels: 4 } }).webp({ lossless: true }).toFile(fileURLToPath(new URL('paper-texture.webp', output)));
await writeFile(new URL('../public/favicon.svg', import.meta.url), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#e9b949"/><path d="M9 13h19v13a6 6 0 0 1-6 6h-7a6 6 0 0 1-6-6ZM28 15h3a4 4 0 0 1 0 8h-3M14 6v3m8-3v3" fill="none" stroke="#244a43" stroke-width="2.5" stroke-linecap="round"/></svg>');
dom.window.close();
await browser.close();

# Paper-world icons: how to make Lucide icons look cut from paper

Research date: 2026-10-06. Context: the L01 kit inlines Lucide strokes (`lessons/L01/assets/kit/icons.js`, 24×24 grid). It already has
paper patterns (`#pat-paper`, `#pat-kraft`, `#pat-grain`, `#pat-cover`) and three drop-shadow filters (`#sh1`–`#sh3`) in
`lessons/L01/index.template`. Target icon size is 40–80 px on a 1920×1080 canvas. Note that L01 currently renders at 1280×720, so the real size is 27–53 px.
The goal is icons that read as **physical pieces on the table**, not flat UI line icons.

## The common recipe (seen in every source)

All paper cut-out looks use the same four ingredients. Only the mix changes:
1. **Solid filled shape, not a hairline.** Paper cannot be a 1.5 px line. Strokes get thickened and outlined ("Outline Stroke") into a fill.
2. **Short, soft, warm drop shadow.** "A real paper cut-out casts a soft, short shadow because it sits just above the surface. Crank your shadow too dark or too far, and the illusion breaks" ([Paper Toolkit][ptk]).
3. **Imperfect edge.** In AE this is done with Roughen Edges, Turbulent Displace or Wiggle Paths ([iaian7][iaian7], [Lesterbanks / Ben Marriott][marriott], [Miles of Roses][mor]).
4. **Paper texture inside the shape.** In AE, the texture layer also drives a Displacement Map, so the fibres slightly bend the edge ([iaian7][iaian7]).

---

## Options

### 1. Thick cut-out (expanded stroke, filled with card texture)
The Lucide stroke is made thick (2.5–3 on the 24 grid) and filled with a coloured card pattern. It has a 0.5–1 px static displacement on the edge and `#sh1` below it.
It reads as "the same icon, cut from card with scissors."
- **Seen in:** [Icons8 "Papercut" style][i8], Ben Marriott's shape-layer paper look ([Lesterbanks][marriott]), most "paper cut icon" stock packs ([Vecteezy][vz]).
- **Small sizes:** Good. It keeps the Lucide silhouette, so 40 px stays readable if stroke ≥ 2.5. Thin details (`.01` dots, small inner circles) can fill in, so check each icon.
- **SVG:** No geometry step needed. Set `stroke="url(#pat-kraft)" stroke-width="2.75" stroke-linejoin="round" stroke-linecap="round"` on a `<g>` and apply one filter:
  `feTurbulence type=fractalNoise baseFrequency=0.9 numOctaves=2 seed=N` → `feDisplacementMap scale≈1` (scale in user units at render size; keep ≤1.5 px or strokes break) → `feDropShadow` (reuse the `#sh1` values).
  The `seed` is static, so there is no boil (see `paper-cutout-jitter.md`).

### 2. Die-cut sticker (icon on an offset cream backing)
The icon (in colour, or Option 1) sits on a cream/white backing that follows its outline at a 3–6 px offset. The shadow falls from the backing, not the icon.
- **Seen in:** die-cut sticker illustration ([Dribbble: die-cut-sticker][dds]), sticker cutline/offset-path guides ([stickers-cut][offset]), [Astute: die-cut effect in Illustrator][astute], [jh3y SVG sticker filter pen][jh3y].
- **Small sizes:** **Best of all.** The cream halo separates the icon from any background (kraft, painted scene, dark card), and it also hides small edge noise. Con: the icon has a larger footprint (+8–12 px), and a sticker can read slightly "scrapbook".
- **SVG (filter, no build step):** `SourceAlpha` → `feGaussianBlur stdDeviation=3` → `feComponentTransfer` (alpha `type=linear slope=20 intercept=-2`, which gives a **rounded** dilation). Then `feFlood` cream + `feComposite in2` → this is the backing. Add an optional `feDisplacementMap scale=1.5` on the backing only, for a scissor edge. Then `feDropShadow` of the backing → `feMerge` [shadow, backing, SourceGraphic].
  Avoid plain `feMorphology dilate`, because its square kernel gives blocky corners.
  **SVG (geometry, at build time):** [paperjs-offset][pjo] `offset(path, 4)`, or Skia PathKit `path.stroke({width:8, join:'round'}).simplify()` to union the outline. With geometry, the backing can also get its own pattern fill.

### 3. Layered paper (tile + cut-out, 2–3 stacked sheets)
The icon is cut from one colour and placed on a small paper tile or disc of another colour. Each layer has its own short shadow, so you see 2–3 depth steps.
- **Seen in:** [Dribbble: layered-paper][dlp], [Behance: layered paper art][blp], [Icons8 Papercut][i8] (stacked flat pieces with soft shadows between them).
- **Small sizes:** Very good. The tile gives a fixed, high-contrast background, and the tile shape can encode a category (for example, a disc for money and a square for documents). Con: it has more objects per icon, and it looks busy if 6+ icons appear at the same time.
- **SVG:** Use `<g>`: a tile `<rect rx>` or `<circle>` with `fill=url(#pat-paper)` and `filter=#sh1`, then the icon group (Option 1) with a smaller shadow (`dx1.5 dy2 σ1`). Shadow size should increase with the gap between layers.

### 4. Stencil / punched-through (icon cut OUT of a card)
The icon is a hole in a card, and you see a darker sheet behind it. It needs an inner shadow on the hole's top-left edge.
- **Seen in:** layered paper-cut ("kirigami") art ([Behance][blp], [Dribbble: layered-paper][dlp]).
- **Small sizes:** Fair. It works for chunky glyphs (₹, house, check), but it fails for detailed icons, because the inner shadow eats the thin strokes. It is also hard to read when the card colour is close to the back sheet.
- **SVG:** `<mask>` the card with the expanded icon (white rect + black icon strokes). The inner shadow is `SourceAlpha` inverted → offset → blur → `feComposite operator=in` with the card alpha.

### 5. Torn / hand-ripped edge
The edge is strongly roughened, with a lighter "fibre" rim where the paper tore. This is the classic AE "torn paper" look.
- **Seen in:** [iaian7 Dynamic Paper Cutouts][iaian7] (Simple Choker expands the alpha, then Turbulent Displace), [Enchanted Media torn-paper][torn], [Adobe torn paper edge][adobetorn], [Codrops feTurbulence][codrops].
- **Small sizes:** **Poor.** Tearing needs about 6+ px of jagged margin, so it destroys 40–80 px glyphs. Use it for large cards, banners and seam wipes (L01 already does torn seams), not for icons.
- **SVG:** Option 2's backing with `feDisplacementMap scale 4–8` and `baseFrequency 0.04–0.08` (a low frequency gives tears, a high one gives grit). The fibre rim is a second, slightly larger displaced copy in near-white.

### 6. Embossed / debossed (pressed into the card)
The icon is the same colour as the card. It is shown only by light (raised = emboss, pressed = letterpress).
- **Seen in:** letterpress mockups ([Medialoot][ml]), [Carmen Ansio: SVG letterpress filters][ansio], the AE Emboss + Soft Light blend that iaian7 uses for paper curl.
- **Small sizes:** **Poor.** The only contrast comes from lighting, so it falls below legibility at 40 px, especially after YouTube compression. It is good as a subtle watermark or on large title cards.
- **SVG:** `SourceAlpha` → `feGaussianBlur σ1.5` → `feDiffuseLighting surfaceScale=3` with `feDistantLight azimuth=225 elevation=45` → `feComposite arithmetic` multiply onto the card fill.

### 7. Pencil / ink drawn on a paper card
The icon is drawn in graphite/ink (a roughened thin stroke with a grain texture) on a small cut card that has a shadow. The card is the paper object, and the icon is a drawing on it.
- **Seen in:** sketchnote explainers, [Here Dragons Abound: pencil effect in SVG][hda], [Ben Gammon rough borders][gammon].
- **Small sizes:** Good if the stroke stays ≥ 2 px and the card gives contrast. It suits the kit's **Kalam** handwritten notes. Con: it reads as "notes", not "cut-out", so it is less tactile than Options 1–3.
- **SVG:** Card = `rect rx` + `#pat-paper` + `#sh1`. Icon = Lucide stroke `stroke-width 2` with the filter `feTurbulence baseFrequency 0.8` → `feDisplacementMap scale 1`, then `feComposite in` with a grain pattern for graphite breakup.

---

## Animation: how paper icons enter

Paper sources almost never use a scale-from-0 elastic "pop". That reads as UI. The paper vocabulary is:
- **Drop / place (default).** The icon starts slightly large (scale 1.06–1.1) with a **big, soft, offset shadow** (`#sh3`-like: far offset, wide blur, lighter). Over about 0.25–0.35 s it lands at scale 1, and the shadow **shrinks and darkens** to its resting value (`#sh1`). Add a 1–3° rotation that settles. This reads as "a hand puts the piece on the table". Shadow size is the depth cue ([Paper Toolkit][ptk]; layer parallax from [Babtt][babtt]).
- **Slide-in (pushed across the table).** It translates in from the side with a **constant small shadow**. It does not scale, because it stays on the surface. Use this for rows and lists, and stagger the items.
- **Peel / flip.** `scaleX` 0 → 1 with a slight skew, or a fold-out around one edge. Use it sparingly, for reveals (a stamp, or a card turned over).
- **Timing.** Step the entrance on a calm grid (8 fps or every 4 frames at 30 fps, never 12 fps on 30), and keep the icon **still once it lands**. No position jitter. The handmade feel comes from the cut edge and texture (see `paper-cutout-jitter.md`, [Lesterbanks / Marriott][marriott]).
- **Implementation tip.** Do not tween the shared `#sh*` filters. Draw the shadow as a separate clone underneath: the same shape, filled `#3b2614`, with a static `feGaussianBlur`. Animate its `x/y` offset, `opacity` and blur. To tween the blur, swap between 2–3 pre-blurred clones. This stays seek-safe on the paused GSAP timeline, and it is cheaper than re-rasterising filters every frame.

---

## Recommendation

1. **Option 2 — Die-cut sticker (built on Option 1).** It is the most legible at 40–80 px on any background. The cream offset backing makes even a thin Lucide icon read as one physical paper piece, and the backing also hides small edge noise. Use it for **standalone icons placed into a scene** (ledger callouts, "₹ in / ₹ out" markers).
2. **Option 3 — Layered paper tile.** Use it for **icon grids, lists and category markers**, where a consistent tile shape and colour carries the meaning (assets / liabilities / income). Each icon inside the tile is the Option 1 thick cut-out.

Both use the same core: thicken the Lucide stroke to 2.5–3, fill it with `#pat-kraft` / a coloured card pattern, add a static ≤1 px displacement on the edge, and use a short warm shadow. Build the sticker offset geometrically at build time (paperjs-offset or PathKit). The `feComponentTransfer` filter is the zero-dependency fallback. Avoid torn edges (5) and emboss (6) for icons. Keep them for cards, titles and seams.

---

## Sources

[ptk]: https://papertoolkit.com/blogs/paper-animation-effects/
[iaian7]: https://iaian7.com/aftereffects/DynamicPaperCutouts
[marriott]: https://lesterbanks.com/2020/02/an-easy-way-to-get-a-paper-cutout-stop-motion-look-in-ae/
[mor]: https://medium.com/@MilesOfRoses/create-a-paper-cut-out-animation-with-after-effects-e4891f6aba95
[i8]: https://icons8.com/icons/papercut
[vz]: https://www.vecteezy.com/free-vector/paper-cut-icon
[dds]: https://dribbble.com/tags/die-cut-sticker
[dlp]: https://dribbble.com/tags/layered-paper
[blp]: https://www.behance.net/search/projects/layered%20paper%20art%20cutting
[offset]: https://stickers-cut.com/guides/svg-offset-path-explained
[astute]: https://astutegraphics.com/learn/10minskills/create-a-die-cut-sticker-effect-in-illustrator
[jh3y]: https://codepen.io/jh3y/pen/OPJyVGb
[pjo]: https://github.com/glenzli/paperjs-offset
[torn]: https://www.enchanted.media/how-to-create-torn-paper-transitions-in-after-effects/
[adobetorn]: https://helpx.adobe.com/si/photoshop/how-to/torn-paper-edge.html
[codrops]: https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/
[ml]: https://medialoot.com/item/close-up-embossed-debossed-logo-mockup/
[ansio]: https://www.carmenansio.com/articles/svg-filters-on-type/
[hda]: https://heredragonsabound.blogspot.com/2020/02/creating-pencil-effect-in-svg.html
[gammon]: https://bengammon.co.uk/rough-css-borders-with-svg-filters/
[babtt]: https://babtt.co.uk/paper-cut-animation/

Stroke-to-fill tools, if geometry is needed: [svg-outline-stroke](https://www.npmjs.com/package/svg-outline-stroke),
[Inkscape CLI `object-stroke-to-path`](https://github.com/leifgehrmann/svg-stroke-to-path), [paperjs-offset `offsetStroke`][pjo].

# L02 · What You Have, What You Owe — build log

## 2026-10-06 — v1 (English)
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4, 24 VO segments (`vo-segments.json`, `pauses.json` → 17 pause cuts, all in silence).
  Total 5:36.8 (4.6 s title sting + 12 s end card included).
- Scenes (`assets/scenes/`): s01 cold open (Apr 1 dawn; also defines `window.DH` helpers for the whole lesson) · s01t title sting (L1's, two-line title) ·
  s02 Last time · s03 Assets · s04 Equity / Capital · s05 Ravi Mama / Liability · s06 Misconception ✗ · s07 Claims picture (bar pair) ·
  s08 Sort it (worked → faded → solo×2, 3.2 s countdowns, answers hidden) · s09 Recap · s10 Your Turn · s11 Next time ("3" cover slam) · s12 End card.
- Calendar strip: highlight `1` from s03 to s10, ticks to `2` only in s11 (first beat). Never goes back.
- Seams hand-authored: s01→s01t clasp rush (L1 shape) · s01t→s02 cover opens onto `#s02-era1` · s02→s03 Balance-Sheet polaroid (window exactly 16:9)
  grows until `#s03-first` fills the frame · s03→s04 note lifts, flips (blank tag on back), grows to a full-frame plate that s04 shrinks back onto the bundle ·
  s04→s05 umbrella handle hooks the right edge, whip pan + blur (s05 settles from the right, same speed) · s05→s06 thought bubble swells to fill the frame (s06 contracts it) ·
  s09→s10 tiles flip edge-on, cards flip open in the same spots · s11→s12 "3" cover slams, swings open on the end card.
  Default torn-paper wipe (+ build.py's paper_whoosh): s06→s07, s07→s08, s08→s09, s10→s11.
- Hindi: every cue is an `@anchor`; `anchors.hi.json` not created for L2.

### New SFX (generated once, shared library `lessons/shared/audio/sfx/`)
- `twine_tug.mp3` (0.6 s) — claim string pulled taut. `dawn_birds.mp3` (6 s) — looped under the cold-open dawn (music.json).
- music.json adds `music/night.mp3` (L1's night bed, vol 0.2) + `sfx/night_street.mp3` under the cold open, `sfx/dawn_birds.mp3` from the dawn rise.
- Cold-open lead raised 0.5 → 1.2 s in `scenes.json` (fade from black).

### Deviations from the storyboard
- s07 bar order: Ravi ₹30,000 at the bottom, Meera ₹50,000 on top (VO order = balance-sheet order; `K.barPair` stacks in call order).
- s04: card has ONE pocket (Capital) — `K.equityCard` only supports 2|3, so the Profit pocket is popped from `rig.list` and the card back is narrowed (local workaround).
- s04 "galla lid closes / reopens" beat dropped: the bundle sits on the open galla; the ghost bundle slides along to Meera and fades instead.
- s06→s07 / s07→s08 / s08→s09 / s10→s11 use the default wipe (storyboard asks for bubble-shrink, items-drop-into-boxes, boxes→tiles, galla-grows seams).
- s06 Khata stands outside the bubble (bottom-left) and stamps from there; the little bundle-worker is a simplified paper character (arms swing on twos).
- s08 "Meera drifts toward Asset" is carried by the card sliding toward the Asset box + her reaching arm, not a walk.
- s09 uses jar `Cash` (not the galla) for the Asset tile.

### Kit bugs / gaps worked around (shared kit untouched)
- `K.equityCard` can't do a single pocket (see above).
- `K.tumblerStack({hidden:true})` hides the body so `dropIn()` never shows it → build visible and hide `items` by attribute.
- `rig.galla.g` / `K.jarRig().g` carry a `transform` attribute: tweening `scale` with `svgOrigin:"0 0"` on them jumps them to the origin; tween `body`, or use absolute `x`/`y`.
- Scene sections on the lower track stay hidden under the higher-track neighbour for the 0.6 s overlap: s03, s05, s09, s11 end with `tl.set(root,{autoAlpha:0}, sc.end)`.
- Layout check flags kit text (polaroid header, equity pockets, claim-tag tickers) as content_overlap → `data-layout-allow-overlap` on those groups.

### Known nits
- Scenes are a bit sparse at 1080p (small props on large walls); hero people are 50–57 % of frame height only in s01, s04, s05, s06, s11.
- s08/s10 card art is small relative to the cards; text on cards ≥ 34 px except tag tickers (36 px × tag scale).
- s05 umbrella is a closed prop held at the hand (reads small).

### Outputs (v1)
- `renders/L02-final.en.mp4` — 1080p, 5:36.87, video+audio start_time 0.000, mix −14 LUFS (premix −21.2 → 2-pass loudnorm).
- `renders/L02-review-720p.en.mp4` — 1280×720, crf 23, same duration.
- `npm run check`: 0 errors (65 lint warnings = same sub-composition / duplicate-track notes as L1). Render ≈ 16 min (screenshot capture, 4 workers).
- Snapshots: `snapshots/<scene>/contact-sheet*.jpg` per scene, `snapshots/v*/` after the last fixes, `snapshots/final/contact-sheet-final.png` from the final render.

## 2026-10-06 — v2 polish (staging only; VO, pauses, SFX, seams, cue timing untouched)
Goal: characters/props big in frame (hero 45–60 % height), set dressing so walls are not empty, readable numbers, one deliberate Khata spot.
- `_shared.js`: new helpers `window.KH` (Khata spot x125 y1064 s0.62 ≈ 22 % height, used by every scene that shows her), `window.tape()` (paper tape on cards), `window.skyline()` (seeded tone-on-tone skyline; colour = wall darkened).
- s02: cards 560×740 (was 620 tall, art ×1.2 → ×1.5), pinboard panel + tape, polaroid 410 wide (window still exactly 16:9, seam math unchanged), Khata 22 % and fades out as the polaroid grows so the window equals #s03-first.
- s03: galla ×2.4 on a 540 crate (hero ≈ 58 % of frame height), ticker/Cash/Asset/Account text 80–88 px, medallions r86, jar ×2, ghost cart bigger, skyline behind the right half; push 1.12 → 1.07. Glass-jar outline rescaled to the bigger galla.
- s04: tag/Equity card ×1.85 (card ≈ 460 px wide; "Capital ₹50,000" ≈ 50 px), Equity chip 72 px, skyline, Khata at the shared spot (with `?`).
- s05: galla ×2.3, Meera + Ravi 0.9 → 1.0 (≈ 57 %), tags ×1.3 (₹ text ≈ 46 px), proper furled navy umbrella (local helper, tip on the ground, was a 184 px dark stick), ₹30,000 chip 64 px, Liability chip 72 px on the give-back arrow, thought bubble moved above both heads, skyline. No Khata (nothing for her to do).
- s06: daydream galla ×2.3, Meera 1.0, tickers 92 px (were 70), +30,000 columns 88 px, bundle-worker ×2.3, faint dream skyline clipped to the bubble, Khata at the shared spot + `!` when she stamps.
- s07: bar pair ×2.0, people 0.6 → 0.95, galla in front of the blue bar, equation chip 68 px, clouds + skyline, ghost scale ×1.3, Khata hops on the level line.
- s08: crates 430 × 215 with 68 px labels, cards ×1.55 with the art scaled to fill them (galla 1.5, tag 1.4, glasses 1.6, key 100), landed cards sit above the label, Meera 0.95, bell ×1.5, countdown medallion ×1.0, string lights + skyline.
- s09/s10: tiles/cards 520 × 730 (was 480 × 600), art ×1.4–2×, headers 74 px, ₹ labels 60–80 px, skyline, Khata at the shared spot (thumbs-up / "?" card bigger).
- s11: price tag ×1.6 (₹36,000 ≈ 50 px), Meera/cart-wala 1.0, bigger `?`, skyline. s01 / s01t / s12 untouched.
- Checks: `npm run check` 0 errors (65 lint warnings = same sub-composition/duplicate-track notes as v1), contrast 132/132.
- Snapshots: `snapshots/v2/<scene>/contact-sheet*.jpg`.
- Outputs (v2): `renders/L02-final.en.mp4` 1080p, 5:36.87 (336.87 s), video+audio start_time 0.000, mix unchanged (−14 LUFS); `renders/L02-review-720p.en.mp4` 1280×720 crf 23, same duration. Render 8 min (3 workers). Final contact sheet: `snapshots/final-v2/contact-sheet-final-v2.png`.
- Left: s01 / s01t / s12 not touched; s06's daydream is still a single big cream bubble (left half is bare during the two-column beat); the s03/s04 note-plate seam and s02 polaroid seam were only re-timed through unchanged math (checked at the seam frames).

## 2026-10-06 — Hindi (Hinglish)
- `vo-segments.hi.json` (same 20 ids / scenes / gap_after as EN), Hinglish: Devanagari + accounting terms in Latin (asset, liability, equity, capital, account, cash, loan, stall, tag, jar, balance sheet); names/₹ identical; "scale" = तराज़ू (keep for L3 Hindi). Voice = same Monika `eleven_v4`, `assets/vo-hi/`.
- Markers: every cue / cueEnd / sfx word / pauses.json key of L2 has a marker (158 anchors, 0 missing; `hi_anchors.py` reported 0 token/word mismatches). Punctuated keys (`@asset!`, `@liability.`, `@meera.`, `@mama,`, `@cart,`, `@photo?`, `@sentence:`) are written literally in the marker. All `{p@…}` pause markers sit on sentence-final words → `validate_cuts`: 17/17 cuts in silence.
- Word order was kept aligned with EN so scene beats still fire in sequence (checked by comparing EN vs HI anchor times per segment). Only inversion left: s11 `@spends` now lands ~1 s after `@thirty-six` (arm gesture vs price tag; harmless).
- No scene edits needed: series wordmark (title sting, end card) already goes through `SERIES_NAME()` → "Hisaab Kitaab"; on-screen labels stay English like L1 (no Devanagari anywhere, snapshots `L02-hi/snapshots/hi1/`).
- `python3 build.py --lang=hi` → `lessons/L02-hi/` (375.63 s = 6:15.6, +11.5 % vs EN 5:36.9). `npm run check` 0 errors / 0 warnings, contrast 132/132. Render 8 m 54 s (3 workers).
- Outputs: `lessons/L02-hi/renders/L02-final.hi.mp4` (1080p, −14.8 LUFS, start_time 0.000 both streams) and `L02-review-720p.hi.mp4`. Mix: `python3 build.py --lang=hi --mix --mux`.
- Open: audition the Hindi VO (loanwords "Asset!/Liability." read in Hindi cadence; English-final-word pauses); quiz gaps left at EN values (3.2 s) — raise if the Hindi questions feel rushed.

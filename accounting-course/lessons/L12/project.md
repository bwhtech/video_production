# L12 · The Profit & Loss Statement — build log

## 2026-10-08 — Hindi-first build (English NOT generated, NOT rendered)

### Pipeline
- Hinglish script `vo-segments.hi.json` (21 segments, same ids / scenes as EN; gaps raised only on s06b 2.8 → 3.0). eleven_v4 / Monika, `--lang hi`, takes in `assets/vo-hi/`.
  **21 segments generated once, 0 retakes** (s12 hit a 429 concurrency error from the shared account and was simply re-sent — no credit spent on the failed call).
- Every anchor is explicit in the Hindi text: `{@name}` before the Hindi word, `{@name#2}` for the 2nd English occurrence, `{p@name}` on the sentence-final word for each pause in `pauses.json`
  (so the English build later resolves the same cues with no scene / sfx changes — names are the English words of `vo-segments.json`).
  `python3 ../../tools/hi_anchors.py --lang hi` → 209 anchors, 0 problems; `build.py` → 25 pause cuts, all in silence.
- Build: `python3 build.py --lang=hi` → `lessons/L12-hi/` (384.5 s = 6:24.5). `npm run check` 0 errors (65 lint warnings = the usual "sub-composition" nags; 1 contrast ✗ = the cream digit on the saffron pause medallion, kit object — same as L7).
- Music: new bed **`music/m5_main.mp3`** (generated once, 60 s, looped) s02 → s12 under the VO; `night_street` over the cold open; `intro_sting` under the title; `outro` on the end card. `music.json` `hush` is now a list
  (list-hush patch from L3/L7 copied into this `build.py`): the bed dips for the s06b countdown and the s09a countdown.
- SFX: all from the library (126 cues incl. seam whooshes; `ticket_tear` / `stamp_thunk` / `projector` / `bell_ring` / `shutter` were already there). Nothing new generated. Cues live in `assets/scenes/<id>.sfx.json`.

### Scenes (`assets/scenes/`) and local helpers (`_l12.js`, added to `index.template`)
- `L12.film` — **the vertical 9-frame P&L film strip** (7 line frames + 2 ruled result frames; line content = `L12.strip` cards; result frames count with a ticker, `₹ ?` placeholder, negative state with a doubled rule).
  Same object in s04 / s05 / s06 / s07 / s08 (inside the cinema doorway) / s09 (stood up on a white card) / s12. (Kit `filmStrip` is horizontal-icons only, so this is lesson-local — candidate for the kit.)
- `L12.column` — paper-block column (1 block = ₹1,000, chunks that lift as one group, kraft tint, 0.3 sliver). `L12.tb` — the 19-line trial-balance list (rows ≥ 34 px, Dr/Cr columns, pinned Drawings).
  `L12.expSlip` (icon/face + counting amount), `L12.dog` (the sleeping street dog, one ear flick), `L12.sign`, `L12.pin`, `L12.cover13`, `L12.plate`, `L12.endOf(seg,"@name|p")` (time a pause marker's word ends — pauses aren't exposed through `cue`).
- s01 cold open (L1's night rebuilt; Khata awake on the counter; 3 cost slips hang, no coin leaves; 19 small books + matching ₹1,36,000 sheet; Khata opens, closes, camera rushes into the red cover) → s01t title sting (L7 shape, red plate burst, page = `#s02-first`) → s02 three answer cards (dimmed with a shade overlay, never opacity) →
  s04 TB → strip (clip-unroll; seven strips fly into the line frames; 12 dim and step back; Sales splits cash/credit and re-merges) → s05 gross profit (blocks lift, ₹40,000 ticks into the first result frame, label arrives with the term) →
  s06 Meera walks in, five slips, the pushpinned Drawings fumble in the 1.2 s pause, 3-2-1 ring in the 3 s gap, ₹24,700 + leaf wipe, ≥ 1.6 s dead-still hold (no blinks, no hop), torn-paper vignette of L1's night (profit medallion lit) →
  s07 projector + beam stepping down the strip, ₹100 coin → 20 / 31 / 49 slices →
  s08 cinema doorway + usher Khata: thought → ✗ stamp; Ravi Mama twice (loan blocked; ₹3,000 blocked, ₹300 coin gets a ticket → Interest frame lights), the cart (₹1,000 coin → Depreciation frame), Meera's drawings (blocked, shrug, home), the ₹4,000 advance envelope (May 5), Infotech's UPI payment (Sales frame + Priya's tag pulse, tick on the phone), Revenue / Expenses signs →
  s09 solo: rent patch ₹7,000 (Gross holds, Net → ₹22,700, bracket), sales patch ₹15,000 (Infotech windows go dark, Gross → ₹5,000, Net blanks, → −₹10,300 with doubled rule, no red), medallions swap, Meera's tag + down-arrow → s10 recap (3 tiles) → s11 three cards (pauses hold still) → s12 tail flap, instant camera, flash, "13" cover slam → s13 end card ("Up next · Lesson 13 · The Balance Sheet").
- s03 (old Checkpoint-4 walk-through) is not built, as instructed.

### Kit gaps / workarounds (shared kit untouched)
- No `usher cap`, `torch`, `cinema doorway`, `instant camera`, `envelope`, `ticket` in the kit at build time → drawn locally in s08 / s10 / s12 (usher cap = three paper rects appended to `khata.body`).
- `K.dropIn` tweens `scale` — never used on nodes that carry a `transform` attribute (cast rigs, `K.phone` root): those get opacity-only fades. `K.stall` rig's `wheels` ref is not rotated by `moveTo`, so the s08 cart just slides.
- `K.filmStrip` (horizontal) is only used for the tiny recap / quiz pictures; the real strip is `L12.film`.
- Ravi Mama's ₹ chips, Meera's slip and the cart tag are children of the person's `mover` group (they walk with the rig); their text is 46 px local so it stays ≥ 34 px at s = 0.8.

### Hindi-specific
- On-screen labels stay English account names / ₹ numbers (no swaps needed; the s08 signs are `Revenue` / `Expenses`).
- Phrases reused from L5–L7: "आपकी बारी। तीन छोटे सवाल।", "जवाब अगले lesson की शुरुआत में।", "Video को pause कीजिए", "पिछली बार के सवाल". "कौन सी दो चीज़ें बदलीं?" is not needed in this lesson (no two-change beats).
- Questions that continue (`क्या मीरा को profit हुआ, या loss?`) are written with a comma / dash so the auto thinking-beat doesn't split them; real question marks get the automatic 0.6 s beat (1.8 s before the next "दो / तीन / जवाब").

### Open nits
- Pause-medallion digits (cream on saffron) fail the 3:1 contrast check — kit object (same in L7).
- Phone UPI card text (kit) is ≈ 26 px even at 1.45×; Infotech building sign is decor.
- s08 is dense (≈ 60 s): Ravi's "₹3,000" / "₹300" chips overlap when he stands at the rope (readable, transient).
- The s08 cart does not spin its wheels (rig `wheels` ref).
- Render is the Hindi cut only; EN needs `python3 build.py` (no flag) after the English TTS exists.

### Hindi render (done, under the render lock, 6 workers)
- `L12-hi/renders/L12-final.hi.mp4` — 384.57 s (6:24.6), 1920×1080 @ 30, both streams `start_time` 0.000, integrated loudness −14.8 LUFS (LRA 3.8). Review copy: `L12-hi/renders/L12-review-720p.hi.mp4` (1280×720, 26 MB).
- Render 11,537 frames in ≈ 9 min (capture 6:03, encode 2:07); `python3 build.py --lang=hi --mix --mux` (measured pre-norm −20.8 LUFS).
- Dense snapshots read scene by scene during the build (`L12-hi/snapshots/a1…a9`); fixes after the first read: slips / sheet / dog repositioned in s01, card dimming via shade overlay (s02, s11), leaf wipe initial state (s06), ink bracket (s09), Gross/Net cut order (s10), cart/Meera hand-over timing (s08), blinks paused during the s06 dead-still hold.
- English: not generated, not rendered (per brief).

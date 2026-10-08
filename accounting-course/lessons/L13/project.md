# L13 · The Balance Sheet — build log

## 2026-10-08 — Hindi (Hinglish) first build
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4 (`--lang hi`). **English not generated, not rendered** (Hindi-first brief).
- `vo-segments.hi.json`: 20 segments, same ids / scenes / `gap_after` as EN (no gaps changed). `assets/vo-hi/` = 20 takes, **0 retakes** (several first attempts hit the shared 429 concurrency limit and were simply re-run; no audio was produced for them).
- Anchors: every `@name` is the English word of the segment's English line (nth occurrence), written into the Hindi text as `{@name}` immediately before the Hindi word (`{p@name}` on the sentence-final word for every `pauses.json` entry). `python3 ../../tools/hi_anchors.py --lang hi` → 226 anchors, 0 problems. No alias file needed.
  Extra markers beyond the brief (all English words from that segment's English text so the later EN build resolves them unchanged): amounts (`@four @six @eleven @fifty`, `@thirty @three @twenty-seven @four @one @thirty-five`), `@took` (the word that ends the 1.0 s hesitation in s05c), `@equity` before `{p@equity}` in s07b, `{@rupees}{p@rupees}` in s03b (a pause-only anchor can't be cue()'d — add the plain marker as well).
- Build: `python3 build.py --lang=hi` → `lessons/L13-hi/` **395.3 s (6:35.3)**, 22 pause cuts all in silence, 142 sfx cues. `hush` list patch from L07 ported into this build.py (two hushes: s05c equity countdown, s09a solo countdown).
- Music: `music/m5_main.mp3` (Module 5 bed) from s02+0.2 → s12 end, `day_street` under s01, `intro_sting`, `outro`.
- Checks: `npm run check` (via with_slot) → 0 errors, 0 contrast failures.

## Scene notes
- Local helper kit `window.L13` in `assets/scenes/_l13.js` (added to `index.template` after `_shared.js`). Nothing in `lessons/shared/kit` was touched.
  - `L13.spread` = Khata as an open two-page spread with a face on the spine (blink/look/expr) — the kit's `khataRig` pages are too small for 38 px rows at full frame; `L13.row` (medallion + label + ticker / inline `a − b = c`), `L13.assetsPage` (the finished left page, static), `L13.printBS` (the finished two-column Balance Sheet polaroid, **the object L14 s9/s10 should reuse** — kit `K.polaroid` + cream cover + ≥ 34 px headers/rows), `L13.cover(n)` (full-frame red lesson cover, as L7 `cover8`), `L13.bank`, `L13.khataFace`, `L13.photoScene`.
  - Promote candidates: spread, row, printBS, cover.
- s01 cold open: local instant camera + closing-time stall (kit `instantCamera` / `stallClosing` arrived after this was built; swap if wanted). The print flips (red cloth back) and grows to fill the frame → s01t's red plate bursts past camera (hand-authored seam; s01t sets `OWN_SEAM_IN.s01t`, `OWN_SEAM_IN.s02`).
- s02 three answer cards (drawings / ₹4,000 envelope May 5 outside the film strip / Gross profit ₹40,000). s01t pushes into `#s02-first` exactly like L7.
- s03–s05 share the spread. s03 mini TB sheet: 7 P&L strips lift off, 12 flutter onto the pages. Equipment written inline `36,000 − 1,000 = 35,000`. s04 Loan inline `30,000 − 3,000 = 27,000`.
- s05: Equity card (kit `equityCard`, `capital:0` so ₹50,000 counts in when the bundle lands); the film strip's Net frame glides into Profit; the ₹3,000 wallet slip hovers over Profit (1.0 s hesitation, Khata "!"), then Drawings; countdown (kit `pauseMedallion`); ₹71,700; Apr 1 → Apr 30 strip; mini TB sheet flashes; the spread lifts 2 %.
- s06: kit `scaleRig` (once in the lesson) → snaps into the finished polaroid; held still; Khata steps out; ⅓/⅔ proportion bar to the right of the print; Fixed divider + Current bracket.
- s07 coral: thought bubble → stamp; galla + bank → coins merge → ₹61,700 vs a taller ₹71,700 stack; stack → strings from Meera's spool tied to galla / bank / cart / stock jar / Infotech tag; four creditor tags hold shorter strings to the same props.
- s08 kit `bookshelf` (2 tiers, Capital hops from Equity to Liabilities, mini scale + ₹1,06,700 stay put). s09 equity card without drawings → ₹74,700 → mini scale with `+₹3,000` on each pan. s10 recap tiles. s11 three question cards (1.8 s holds come from `pauses.json`). s12 galla + bank → ₹61,700, Meera fans notes, sparkle, "14" cover slams; s13 end card "Up next · Lesson 14 · Where Did the Money Go?".

## Kit gaps / notes
- `K.polaroid` two-column draws header text at ≈ 25 px and rules that don't match row spacing; `L13.printBS` covers and redraws them. A real kit version should take `rows`.
- `K.khataRig` has no spread-at-full-frame mode with a face on the spine.
- `K.equityCard` has no footer total; a `K.ticker` chip is placed under it.
- Pause-only anchors (`{p@x}` without `{@x}`) cannot be used with `cue()` — add both markers.
- Shared scratchpad collision: parallel agents overwrite files like `tts_all.py` in the common scratchpad; use a private subfolder.

## Open nits
- Meera in s05 stands in front of the right page edge (arm overlaps the Drawings pocket label for ~1 s during the hesitation).
- s12 first 1.3 s has the characters but no number yet (ticker arrives with "इकसठ").
- English build (later): `python3 build.py` after generating `assets/vo/*` — all anchors are English words, nothing to re-map.

# L11 · The Trial Balance (Checkpoint 4) — build log

## 2026-10-08 — Hindi (Hinglish) first build
- **Hindi first, English later**: no English TTS, no English render. `vo-segments.json` (EN) is untouched and stays the source of the meaning; `vo-segments.hi.json` has the same 27 ids / scenes / `gap_after`
  (only change: none lowered; `s10b` kept at 3.2 s). Voice Monika, eleven_v4, `--lang hi`; takes in `assets/vo-hi/` (27 segments generated ONCE each, 0 retakes; some calls were retried
  after ElevenLabs `429 concurrent_limit_exceeded` — those cost nothing).
- Build: `python3 build.py --lang=hi` → `lessons/L11-hi/` (437.47 s = 7:17.5, 185 sfx cues, 38 pause cuts all in silence). `npm run check` → 0 errors.
  Final: `python3 build.py --lang=hi --mix --mux` → `L11-hi/renders/L11-final.hi.mp4` (+ `L11-review-720p.hi.mp4`). Music = **M4 bed `music/m4_main.mp3`** (L10's builder generated it), `day_street` under the cold open,
  `intro_sting` under the title, `outro` on the end card. `build.py` got L10's list-`hush` patch (three silent thinking pauses dip the bed: s06b gap, s07a countdown, s10b checkpoint pause).

## How the Hindi anchors work (so the English build later "just works")
- Every anchor in scenes / sfx / pauses / hush is an **English word from that segment's English text** (`@journal`, `@halves`, `@lakh#2`…). In `vo-segments.hi.json` the matching Hindi word carries `{@name}` (or `{@name#n}`);
  every pause in `pauses.json` has a `{p@name}` on a sentence-final word (`।`/`?`). `python3 ../../tools/hi_anchors.py --lang hi` → `anchors.hi.json` (214 anchors, 0 problems).
- Markers don't change the TTS text, so anchors can be added/moved later without re-synthesis (done 4× after the takes: `@minus` s02b, `@rest` s03b, `@difference` s08, `@answers` s09).
- Where Hindi order ≠ English order (s02c `@payable`/`@clears`, s05d, s07a) the scene code uses the cues in Hindi order; the English build will resolve each anchor to its English word — **re-check s02c and s07a ordering when the EN take is built**.
- Validation helper (not shipped): scan every `cue("sNN","@x",n)` and every sfx `word` against `anchors.hi.json` (all resolve).

## Scene notes (deviations from the storyboard)
- **s01** cold open (teal): 20-slip pile chip, blank sheet, Khata splits into 19 *lying* books (each with its registry icon on the end cap, no names) that stack into a tower with a `19` chip; Meera + `K.magnifier`; three icon-only
  thought bubbles (slip between two books · blue/orange arrows · blank slip) on the three questions; the tower leans once on "quicker way"; books swoop back into Khata and its red cover grows to fill the frame (s01 owns the seam into s01t).
- **s01t** = L7's sting (plate = Khata's red cover, "Lesson 11 · The Trial Balance"); owns the page-push into s02 (`#s02-first` = s02's stage + calendar).
- **s02** last time: three cards (cart + May tile → ₹1,000; Stock jar 14,000 − 5,000 → ₹9,000 jar; April bill → Electricity payable drains to ₹0, the expense card gets an x). Jar labels are icon-first at this scale (the "Cost of supplies used" and "Electricity payable"
  names are NOT written on the jars — registry names appear in s03/s10 tables).
- **s03** uses `K.trialSheet` (s = .88) + a single-tier `K.smallBookShelf` of 19 books above it (the 12-row sheet fills the frame, so there is **no calendar strip** here — type floor wins). Worked four with `pull`, montage cascade, Accumulated depreciation
  lands in Credit (row highlight, cart sticker flies from the Equipment row to the right edge, a coral `−` links the two rows), totals count together, `sheet.match`, the sheet tips 2.4° and settles level (no fulcrum silhouette: the sheet sits at the frame bottom).
- **s04** `K.journalCard` T16 (3 lines + narration, golden-rule chips) · brace + `₹3,300` chip + `=` · card shrinks to the top, 20 mini entries (blue half + orange half) fill two wells together · software laptop: ₹3,300 | ₹3,000 + greyed Save + x → ₹3,300 | ₹3,300, Save lights (≤ 3 s).
- **s05** coral. Level `K.scaleRig` (chips ₹1,36,000 | ₹1,36,000), pans hold labelled blocks; Khata stamps ✗ on the check; the beam never moves in the three vignettes (forgotten / wrong account / backwards); result glyphs stay along the bottom;
  Rent block jumps to the Credit pan in vignette 3, chips tick to ₹1,41,000 together. Local block helper (`mkBlock`, heights tween) lives in `s05.js` (kit has no "scale with stacked pan contents").
- **s06** the scale tips toward Credit (only time), difference chip ₹5,000; 20 slips fan out face-down (kraft / paper alternating), 3-2-1 ring during the 2.6 s gap, two slips are pulled out, enlarged and flipped (Rent · Gopal Dairy); Rent page ✓; Gopal Dairy page ₹8,000 with the empty ₹5,000 Dr slot;
  Meera writes it → ₹3,000, totals meet, scale settles level (`rig.settle`, 1.5 s hold). Pages are local T-account cards (not `K.ledgerPage`, which is 1552 px wide).
- **s07** two pages (Rent, Salary) + slip flight + 3.1 s countdown; reveal: pages update (₹0 / ₹13,000 at ≥ 30 px), totals chips equal, mini-scale level with the red ✗ in its slot.
- **s08** three tiles (sheet + `=` + `Trial balance` chip · tipped mini-scale with `search` in the slot + ₹5,000 · level mini-scale with the ✗ in the slot); Khata thumbs-up.
- **s09** three picture cards (numbers only), 1.8 s thinking holds come from `pauses.json`; Khata with `?` and the `calendar-check` "answers next lesson" medallion. Answers for L12 "Last time": 1 — ₹1,36,000 each side · 2 — No · 3 — Debit.
- **s10** checkpoint: banner, Aman waves, cart sizzles, six cards deal on the VO items (A10–A15), then shrink to a thumbnail row; three tool icons (journal · ledger · sheet) light on the VO; opening-balance strip (`K.trialSheet` rows:5, `after A9` chip, worksheet chip, Sharma Kirana row lifts);
  pause medallion + dim 70 % + 3.1 s ring; reveal: restated task, Debit column (8 rows + a School-canteen ghost that counts to 0 and fades), Credit column (6 rows), totals ₹54,000 | ₹54,000, `match`, then **dead still** for ≈ 10 s (Aman's `joy`, Khata thumbs-up at "मीरा की तरह" are off the sheet).
  The cart rolls out when the reveal starts. No calendar strip (dense scene).
- **s11** night (L1's composition: crate, open galla full of notes, string lights, ?-emote on "profit"); Khata hops in and winks; the gold `12` cover drops (s11 owns the seam into s12). **s12** end card: "Up next · Lesson 12 · The Profit & Loss Statement" with a film-strip drawing, two end-screen panels, Khata waves.

## Kit usage / gaps
- Used: `books.js` (`trialSheet`, `journalCard`, `smallBookShelf`), `props2.js` (`magnifier`, `windLines`), devices (`scaleRig` + `.mini`, `jarRig`, `ticker`, `weightChip`, `stamp`, `pauseMedallion`, `checkpointBanner`, `calendarStrip`, `claim`…), cast (`aman`, `samosaCart`, `priya`, `meera`, `khataRig`).
- Local helpers: `assets/scenes/_l11.js` (`L11.node/hide/stage/cal/drop/lift/allow/card/ring/num/tick/cross/chip/save/miniEntry/coverN/flip`), block stacks in `s05.js`, T-account pages in `s06.js`, strip/pages in `s07.js`/`s10.js`.
- Gaps worth promoting: a **stacked-contents scale** (blocks that grow/shrink without moving the beam); a **laptop "Save" card**; **T-account page cards** at half size; `K.trialSheet` option for an empty totals bar (the 5-row strip leaves the bar for chips); `scaleRig.mini` slot content helpers.
- `K.dropIn` on rig groups with a `transform` attribute was avoided (opacity fades used for Meera/Priya).

## Known nits
- Small text: scale pan blocks (≈ 35 px), jar/pan labels in s02/s06 (≈ 25–30 px), thumbnail row in s10 (unreadable by design, the cards were shown at full size first), fan slips in s06 before they are pulled out.
- s06's fan reads as a "brick arch" of slips (20 overlapping cards); good enough but a candidate for a kit `slipFan`.
- Hindi lines kept the English accounting terms in Latin; on-screen labels stay English account names.
- Audio mix measured −14.9 LUFS integrated, true peak −0.7 dBFS.

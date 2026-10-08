# L09 · The Ledger — build log

## 2026-10-08 — Hindi (Hinglish) first build
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4, `--lang hi`. **Hindi first — English TTS NOT generated, English NOT built/rendered.**
- Pipeline: `python3 build.py --lang=hi` → `lessons/L09-hi/` → `npm run check` (0 errors) → `hyperframes render --workers 6` (under the render lock) →
  `python3 build.py --lang=hi --mix --mux` → `L09-hi/renders/L09-final.hi.mp4` (+ `L09-review-720p.hi.mp4`).
- Runtime ≈ 6:41 (s01 27.9 · s01t 4.6 · s02 45.4 · s03 50.6 · s04 50.2 · s05 75.9 · s06 43.9 · s07 36.1 · s08 15.9 · s09 24.9 · s10 13.9 · s11 12.0).
- TTS: 27 segments generated once each (0 retakes). Several 429 `concurrent_limit_exceeded` replies from the shared account limit (no audio produced → retried by `tts.py`'s cache logic).
- `vo-segments.hi.json`: same ids / scenes / gap_after as EN. Hinglish: Devanagari sentences, English accounting terms (journal, ledger, debit/credit, Dr/Cr, posting, balance c/d …). Khata is written खाता (as in L5–L7), `तराज़ू` not needed here.
- Anchors: `tools/hi_anchors.py --lang hi` → 228 anchors, 0 problems; 25 pause cuts all in silence. Markers use the English word of the EN line (nth occurrence), so the English build resolves the same cues with no change.
  Pause markers `{p@…}` sit on sentence-final words: s03a `@cash`; s03b `@watch @right @ledger`; s04a `@posting @account`; s04b `@capital#2 @from`; s05a `@in @advance`; s05b `@drawings @hundred`; s05c `@rupees @down @may @side#3`;
  s06d `@rupees @sits`; s07b `@balance @side`; s09 `@ones @account @account#2 @side#2`.
- Gotchas: a marker sits BEFORE its word, so `{@journal}जवाब journal` anchors on "जवाब" (≈0.3 s early, harmless). s03b's "याद हैं" is a statement (not "?") so the auto question-beat does not add a 0.6 s pause before "देखिए"; "याद है, … खाता क्यों कहते हैं?" keeps the auto beat (glance → self).

## Scenes (what is on screen; deviations from the storyboard)
- **s01** cold open — Meera + galla (`₹ ?` chip); paper journal with 4 flip-able spreads (scribbled entries, only dates are text), frantic flips slowing onto the four cash dates, cream signed chips `+50,000 −36,000 +18,000 −5,000`;
  17 entry cards (6-6-5) laid out, 12 glow, counters 17 / 12; loose journal page covers the lens → s01t slides it off to the right.
- **s01t** title sting — L7's shape (book window shows `#s02-first` at 1/3, push into the page). "Lesson 9 · The Ledger". **s02 owns `OWN_SEAM_IN.s02`.**
- **s02** last time — three single-question stages with number badges: (1) Ravi Mama bundle `₹3,300` splits `₹3,000` → his tag (30,000 → 27,000), `₹300` → Interest jar; (2) UPI phone + Infotech tag + Apr 25 → kit `journalCard` answer with golden-rule tags (Bank = Personal receiver, Infotech = Personal giver, narration `smartphone · UPI`);
  (3) wallet ₹3,000 beside the Expense jar → ✗ stamp → Equity card (3 pockets), −₹3,000 slip drops into the dashed Drawings pocket; Capital / Profit do not move. (Storyboard had cards side by side; one big stage at a time keeps type ≥ 34 px.)
- **s03** one book per account — s03a: journal card in date order, `Apr 1 → Apr 30` chip, Cash rows cream / Sales rows saffron tints (multiply overlays), Cash jar; s03b: kit `bookshelf` of 14 labelled jars (names are two-line paper chips at 34 px under each slot), jar→book cascade
  (Cash, Bank on their words, rest at 0.12 s stagger), shelf shrinks to the top, empty Cash `ledgerPage` (Dr/Cr tint flashes on "left"/"right"), `Ledger` and `Chart of accounts` chips, Khata glances, `खाता` chip for 1.7 s.
- **s04** posting — T1 slow: journal card (kit, tags on) at the bottom, ledger page above; debit strip flies to Cash's LEFT page, Cash book swaps for Capital, credit strip to its RIGHT page; date / other-account cells flash; ink ticks on the journal lines.
  Montage: journal stack (left) + 14 mini open books (5 × 3 grid, 34 px labels) + 33 strips (T2–T17, T16's `Cash 3,300` splits in two on landing) at 2 → 5 per second (gap 0.37 → 0.12 s); calendar strip ticks 1 → 30; counter `1 / 17 → 17 / 17` (T1 was posted in slow motion).
  Transition into s05 = default torn-paper wipe (no match-cut: the montage books are mini open books, not the full ledger page).
- **s05** Cash page — kit `ledgerPage` (rows 9) at 0.96, 13 rows already posted; left total 1,24,000 on "Total", right total 73,300 in s05b, page + corner scale tip toward the heavier left on "heavier", `?` weight chip through the 1.4 s gap, becomes 50,700 and drops on the right (Balance c/d ↓), page levels, right total re-ticks to 1,24,000;
  chip 2 slides down past the rule and across to the left (Balance b/d ↑); `Debit balance` chip. s05d: page shrinks right, Meera counts notes at the galla, `₹50,700` ticker slides next to the ledger and nudges.
- **s06** Gopal Dairy — Meera (left) + Gopal (right) behind the page; rows written with arm acting; `?` chip through the 2.4 s gap; answer balances c/d on the lighter LEFT, b/d on the RIGHT, `Credit balance` chip; coral beat: bubble with coins → purse, ✗ stamp, Gopal holds the ₹3,000 tag;
  the HUD scale is swapped (exit / enter) for a full-size scale in the centre (Meera and Gopal step aside), Gopal's book + tag land on the right pan, level.
- **s07** Infotech — page already written, pause medallion 3-2-1 through the 3.2 s gap, three-stage reveal (c/d chip drop → totals 10,000 | 10,000 + level → chip slides to May 1 b/d + `Debit balance`), hold; then full-size scale with an asset book (blue page lit, `Assets`) and a liability book (orange page lit, `Liabilities`).
- **s08** recap — three tiles on `--scene-leaf`, strips fly left then right on "debits / credits", balance ticker 50,700, Khata thumbs-up (arm raise + hop). **s09** Your Turn — real `ledgerPage` cards (Sales, Bank, Loan from Ravi Mama) one at a time, ⅔-frame, stack at the top-left.
- **s10** next time — night stall, napkin (kit `napkin`) → ₹36,700, popper (local paper cone, not fired), Khata raises an arm + `!`, Meera freezes `amazed`; Khata's "10" cover swings shut (**s10 sets `OWN_SEAM_IN.s11`**). **s11** end card — L7's shape: "Up next · Lesson 10 · Month-End Surprises" + calendar page 30.
- Data: every number comes from `course/data/meeras-chai.json` (T1–T17, balances Cash 50,700 Dr · Gopal Dairy 3,000 Cr · Infotech 6,000 Dr; Your Turn answers Sales 50,000 Cr · Bank 11,000 Dr · liability = credit side).

## Kit usage, workarounds, gaps
- Used the new kit (all READY): `journalCard`, `journalStrip`, `ledgerPage`, `weightChip`, `ruleTag` (via journalCard), `tickMark`, `bookshelf`, `napkin`, `purse`, `dateTile`, `calendarPage`, `claimTag`, `equityCard`, `scaleRig`, `pauseMedallion`, `phone`.
- Local helpers only: `assets/scenes/_l9.js` (node/hide/stage/cal/chip/cover) and `L9.miniOpen` (open mini khata, one page lit — defined in `s07.js`, used by s07/s08). No kit file edited.
- **Gap / bug: `scaleRig.hud(tl, t, false)` (grow HUD back to centre) breaks** — after the call the rig ends at translate(1946, −1807) (off-screen) because the `on` tween (dur 0.01) and the `off` tween fight over `svgOrigin`+`x/y`. Worked around in s06/s07 by creating a second full-size rig (`hidden:true`), `rig.exit` the HUD and `big.enter`.
- Gap: `ledgerPage.total()` draws both pages at once (no per-side reveal) — s05 passes `cr: 0`, hides the right ticker and counts it later; `row: 9` is passed so the balance row (index 8) is not hit by the rule.
- Gap: GSAP on one node mixing `x/y` + `scale` + `svgOrigin` (s09 card stack) mis-computes the translate — split into an outer (x/y/opacity) and an inner (scale, svgOrigin) node.
- Gap: `K.stamp`, `K.dropIn` etc. must not touch rigs that carry a `transform` attribute (`tagG.g`, `m.g`) — used `rig.exit` / own wrappers.
- Default seam wipe colours rotate through `WIPE_COLORS` including violet (s09 → s10 wipe is violet); `_shared.js` is not mine to edit — transient only.

## Audio
- SFX: all from the shared library (`pen_tick`, `weight_clunk`, `page_flurry`, `camera_click`… were already generated by the props agent). No new SFX generated.
- Music: `music/m4_main.mp3` (Module 4 bed, from L8's builder) under s02 → s10, `day_street` ambience on the cold open, `intro_sting` on the title, `outro` on the end card. `build.py` supports ONE hush object: set on the s07a solo countdown.

## Known nits
- s04 montage books and strips are decorative (labels 34 px, strip amounts scale to ~15 px in flight); s05d shrinks the ledger page to 0.62 after the work is done (text < 34 px by then, by design).
- s05 / s06 / s07 corner scale is small (it is the standard HUD) — pan content is empty; only the totals chips and the tilt carry information.
- s06 / s07: the characters stand "behind" the ledger page (their legs are hidden by the page) — the page needs ≥ 0.95 scale so there is no room for full-height people.
- Napkin text is Kalam (kit), digits 5 look like "S" at 34 px.
- Violet seam wipe s09 → s10 (see above).

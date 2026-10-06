
## 2026-10-06 — script revision (Frappe ERPNext-course reference) — scene files NOT yet updated
- VO changed: `s09a` (re-take), `s03a` (four myths: debit ≠ bad, credit ≠ good, ≠ money in/out, ≠ plus/minus; Latin roots cut), `s03b`
  ("So here's what they really mean."), NEW `s09w` (warm-up drill: one account at a time — loan ↑ Cr, rent ↑ Dr, sale Cr,
  Infotech ↓ Cr), `s09a` now opens "Now full entries." Old takes kept as `*.v1.*.bak`.
- Temporary cue patches so build.py runs: s03 root-icon cues → `@bad`/`@good`/`@mean`; s09 `@practise` → `@full`.
- TODO for the builder: s03 = four crossed myth stickers (see STORYBOARD Scene 3), s07 `= AED-LIC` chip (2 s, visual only),
  s09 warm-up chips (`Loan from Ravi Mama ↑`, `Rent ↑`, `Sales ↑`, `Infotech ↓`) before T7.

## 2026-10-06 — scenes finished (s03/s07/s09 updated, s10–s13 written) + Hindi (Hinglish)
English build: 490.36 s (8:10.4), `npm run check` 0 errors; EN not rendered (Hindi only, per coordinator).
- `music.json` → Module 3 bed `music/m3_main.mp3` (s02+0.2 → s12 end, ducked, looped); intro_sting / outro unchanged.
- **s01t** title fixed to the real lesson title: "Debit & Credit Are" / "Just Left & Right" (the earlier builder had "The Scale / That Never Tips").
- **s03** four myths: thumbs-down / thumbs-up / arrow-down-up / diff medallions (new local icons in `s01.js` ICONS) lift off the SMS card on `@bad` `@good` `@out` `@minus`
  (−0.5 s), land in a row beside it (x 330 · 540 · 1380 · 1590, y 300) and get a small ✗ (`K.stamp`, scale 0.5, bottom-right of the sticker, no shake) at +0.8 s;
  they flutter down on `@mean` (s03b). `stamp_thunk` ×4 vol 0.25 + `pop` ×4. No Latin roots.
- **s07** `= AED-LIC` chip (cream paper chip, x 1690 y 438 — free green wall right of the strip) slides in at `@read`+0.55, lifts off 2 s later. Visual only, no VO.
  `tRightT = max(@right, @equals+0.3)` so the Hindi order (right before equals) still builds the `=` after the chips.
- **s09** warm-up (s09w): board arrives on `@practise`; four chips (`Loan from Ravi Mama ↑`, `Rent ↑`, `Sales ↑`, `Infotech ↓`) drop in over the spine on the account word
  (`@ravi` `@rent` `@sale` `@infotech`), wait through the 1.4 s thinking pause, then slide to their page on the answer (`@credit` · `@debit` · `@credit#2` · `@credit#3`;
  coloured strip fades in on landing, `tink_low/high`). Chips lift off just before s09a. Infotech chip pulses before its answer. Meera's pointing arm now resets on s09d.
  Chip landing scale = min(0.85, 322 / chip width) (the Ravi Mama chip lands at ≈ 0.75 → label ≈ 26 px; numbers elsewhere stay ≥ 34 px).
- **s10** recap: three icon-only tiles (Khata pages ← Dr / Cr →; rule card + DEAD CLIC strip; Bank ledger + SMS card with `Cr`), Khata thumbs-up on `@books`.
  Hosts `L6.cover` (red "7" cover) and `L6.push`. **s11** Your Turn: cards 1–2 (`K.card`), card 3 on `K.imagineCard` (SMS `DEBITED`, receipt, Khata with dashed `Bank` line, `?`);
  Khata `?` emotes; calendar-check + page flap on `@answers/@next`. **s12** tease: saffron stall, `K.caFriend` walks in, two gold rule cards (`L6.goldCard`: hand-coins + arrow + Dr/Cr)
  land in front of Meera, 4 % push, Meera `amazed` on `@whole`, "7" cover slams (own seam into s13). **s13** end card: "Up next · Lesson 7 · The Golden Rules, Decoded", two gold mini-cards, Khata waves.
- Dense snapshots (`snapshots/a*–d1` EN, `L06-hi/snapshots/h*` HI) read; fixes: sugar icon invisible on cream card (disc added), SMS card on card 3 too small, DEAD CLIC strip off-centre in recap tile 2.

### Hindi (Hinglish) — `lessons/L06-hi/`
- `vo-segments.hi.json` (43 segments, same ids / scenes / gap_after as EN), `assets/vo-hi/` (eleven_v4, Monika), `anchors.hi.json` (259 anchors; `hi_anchors.py` 0 problems).
  Recurring phrases follow L03–L05: "कौन सी दो चीज़ें बदलीं?", तराज़ू, "आपकी बारी। तीन छोटे सवाल।", "जवाब अगले lesson में।". Accounting terms stay Latin (debit, credit, asset, liability, equity, capital,
  revenue, income, expense, drawings, DEAD CLIC, double entry); "left/right" = बाईं/दाईं तरफ़.
- Anchor notes: pause markers all on sentence-final words (`{p@good}होता`, `{p@left}तरफ़`, `{p@side}लिखिए`, `{p@cash#2}Cash`, `{p@up}होता`, `{p@revenue}revenue`, `{p@always}हमेशा`, `{p@books}books`,
  s09w: `{p@grows}`, `{p@grows#2}`, `{p@sale}`, `{p@shrinks}है`). s07c Hindi order is left → right → equals (EN: left → equals → right) — handled in s07. s06c `@left`/`@home` order kept.
  The only anchors that move > 15 % of a segment vs EN: s01a `@deposits` (जमा), s02d `@shrinks`, s06c `@left` — all harmless.
- Build: `python3 build.py --lang=hi` → 551.96 s (9:12.0, +12.6 %), `validate_cuts` 16/16 in silence, `npm run check` 0 errors. `L06-hi/renders` → SSD symlink.
- Render under the lock with `--workers 6`; `build.py --lang=hi --mix --mux` → `renders/L06-final.hi.mp4`, 720p copy `L06-review-720p.hi.mp4`.
- Script revisions picked up later the same day: **s02g removed** (L5 reveals its own checkpoint answers) → s02 now ends: cards lift off, cream fills, SMS card lands (Aman table / gauges / ₹8,500 footer deleted; `assets/vo/s02g.*` moved out, `vo-hi/s02g.*` deleted); and the coordinator's `patch_question_beat` (thinking pause after spoken questions) in `build.py`.
  Final builds: EN 484.95 s (8:05.0, not rendered); HI 551.27 s (9:11.3), 42 segments, 250 anchors. `renders/L06-final.hi.mp4` (551.3 s, both streams start_time 0) + `L06-review-720p.hi.mp4`.

# L04 · Making Money — build log

## 2026-10-06 — v1 (English)
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4, 26 VO segments (`vo-segments.json`, cached in `assets/vo/`).
- Pipeline: `python3 build.py` (timing map from VO timestamps → index.html + assets/timeline.js + captions.en.srt + mix.json) → `npm run check`
  → `npx hyperframes@0.8.133 render -o renders/video.en.mp4` → `python3 build.py --mix --mux` → `renders/L04-final.en.mp4`.
- Scenes `assets/scenes/s01 … s12` (+ `.sfx.json`). `s01.js` also defines `window.L4` (shared Lesson-4 helpers — it loads first):
  `L4.street / preRent` (the rent-day frame, drawn identically in s01, the s03 torn still and s04's first frame), `L4.pans` (standard scale
  contents), `L4.layers / zoom / hudSet / hudExpand` (HUD + camera moves, see "GSAP quirk"), `L4.card3`, `L4.node`, `L4.chip`, `L4.dash`.
- Hand-authored seams: s01 → s01t (camera rushes into the scale's brass pivot disc → brass plate), s01t → s02 (cover opens onto s02's first
  frame, via `<use #s02-era1>`), s03 → s04 (worksheet flips over → TORN-PAPER STILL of rent day just before the rent leaves, pushed to full
  frame = s04's first frame; the still never shows a tipped scale), s09 → s10 (tiles turn edge-on, question cards flip open in the same
  spots), s11 → s12 (Khata's "5" cover slams, then swings open on the end card). Everything else: default torn-paper wipe moving left.
- Devices used: `K.scaleRig` (tilt / settle / hud / equation / setTotals / levelFlash), `K.jarRig`, `K.claimTag`, `K.equityCard`
  (unnamed `?` pocket → `Profit`), `K.whichTwo` (2.0 s device in s04 + s05; small 3.2 s variants with a `K.pauseMedallion` countdown ring in
  s08), `K.stamp` (✗, s07, no shake), `K.imagineCard`, `K.calendarStrip` (stepped 2 → 15 in s05), `K.ticker`, `K.gasCylinder`.
  Cast: `K.landlord`, `K.raju` (tray hand-off in s05), `K.aman` + `K.samosaCart` (s03), `K.raviMama` + `K.gopal` (s06), `K.infotechBuilding` + `K.priya` (s11).

## Audio generated for this lesson (ElevenLabs)
- Music: `lessons/shared/audio/music/m2_main.mp3` — Module 2's own light bed (marimba + ukulele, 60 s, looped under the lesson; replaces
  `main.mp3` in `music.json`; `intro_sting` + `outro` kept). Ambience: `day_street` under s01 and the s05 time-lapse.
- New SFX (shared, generated once): `scale_creak`, `paper_unfold`, `tray_clatter`, `pen_scratch`. (`page_flip` already existed.)
  All other cues come from the existing library (gain-matched to −24 LUFS by `build.py --mix`).

## Decisions / deviations from the storyboard
- s01: the HUD is ~50 % (not 30 %) so the 6° tip reads; the tip is the one allowed cliff-hanger and it HOLDS until the brass rush.
- s02 → s03 and s05 → s06 use the default wipe (no bespoke card-stack / pocket iris). s04 → s05 default wipe too (calendar `5` flip skipped);
  s05's calendar simply starts at `2`.
- s04: Ravi's and Gopal's `=` tags + dimmed tags step aside (right of the pan) when Meera's tag unfolds, so the Equity card has room.
  The scale stays tipped until "The scale settles" (VO), then ≥ 1.5 s level hold; the equation strip updates one beat before.
- s05: after "Where's the second change?" Meera thinks (2.0 s device gap), points, and only THEN does the `?` pocket glow and slot 2 fill.
- s06: ₹13,000 / `Profit` sit on neutral cream paper; wall is `--scene-leaf` (aha colour) only. Expanded equation is its own term-by-term strip
  with a bracket under `Capital + Revenue − Expenses` labelled `Equity`.
- s07: bins re-built identically in s08 so the practice board feels continuous.
- Scale HUD is shown in s01, s07, s08 (and the s03/s04 still); s02/s03/s09/s10 use mini scales or none; s04–s06 use the hero scale.

## GSAP quirk found (affects any future lesson)
In this GSAP build (3.14.2 via hyperframes 0.8.133) a tween that changes `x`/`y` AND `scale` with `svgOrigin` leaves x/y stuck at their start
values (reproduced in an isolated page). Scale-only tweens with `svgOrigin`, and x/y-only tweens, are fine. `scaleRig.hud(…, false)` in the
shared kit uses the broken combination when the HUD was set up with `gsap.set`; Lesson 4 therefore builds the rig inside two nested layers
(`L4.layers`: translate layer > scale layer) and animates them separately (`L4.hudSet`, `L4.hudExpand`, `L4.zoom`). Also: never put a
`svgOrigin` scale tween on an element that also gets x/y tweens (use `L4.card3`).

## Known nits
- Equity-card text at hero size is small (pocket names ~25 px); the card is kit-locked, camera push capped at 8 %.
- HUD pan contents (jars/tags) are pictogram-sized by design; numbers that matter are the slot chips + ≥ 44 px pan totals.

# Reusable compositions

Compositions in `compositions/` that are meant to be re-run with new content,
rather than one-off graphics for a single video.

To work on one: copy it to `index.html` in a scratch project directory that also
has `theme/` (symlink is fine) and a `meta.json`, then run
`npx hyperframes check .` / `snapshot .` / `render .` there. The CLI operates on
a project directory, so it will not target a file inside `compositions/`
directly.

---

## `title-bouncing-ball.html` — typed title with a bouncing ball

Light title card: the headline types itself in while a blue ball bounces along
the top of the letters and exits right. Recreated from the "Chapter 1 —
Frappe/ERPNext course" intro, so it matches that series.

**Change the title and nothing else.** `CFG.text` drives everything downstream —
typing duration, the ball's horizontal speed, and how far the bounce surface
extends — so a longer or shorter headline re-times itself.

### Knobs (`CFG` at the top of the `<script>`)

| Key | Now | What it does |
| --- | --- | --- |
| `text` | "Cost of an ERP Failure" | the headline |
| `charFrames` | 3 | gap between letters (100ms) |
| `fadeFrames` | 7 | how long one letter takes to reach full opacity (233ms). Longer than `charFrames`, so 2-3 letters are always mid-fade and the trailing edge reads soft. Drop to 3 to match the source video exactly, which pops. |
| `crossRatio` | 1.377 | ball crosses the full frame in `typingFrames × crossRatio` |
| `gravity` / `launchVy` / `restitution` | 4.2 / 38 / 0.93 | the bounce, in px per frame |
| `ballR` | 13 | ball radius; the element's size and centering offset derive from it |
| `capLine` | 496 | y of the cap-height line — the ball rests **on** it, never sinks through |
| `floatOut` | false | when true the ball takes one soft hop past the end of the title and coasts out. Matches the source video, but the bounce rhythm dies and it reads as slowing down. |
| `blurPerV` | 0.13 | motion blur, scaled by speed. The ball itself never deforms. |

Colours are `:root` vars at the top of the `<style>`: `--card-bg`,
`--title-ink`, `--ball`. This card uses the source video's own light palette,
not the frappe-ui dark theme in `THEME.md`.

### How the ball works

matter.js runs the bounce (a circle on a static ground at the cap line) and the
result is baked to one position per frame **at load**. A single GSAP proxy tween
then reads that table, which keeps the timeline seekable and the render
deterministic — a live physics step would be neither.

The bake runs twice: pass 1 records where the ball actually lands so pass 2 knows
which contact is the last one still over the title. That only matters when
`floatOut` is on.

### Duration

`DUR` in the script must stay in sync with `data-duration` on both `#root` and
`#card`. At the current settings the ball leaves frame around 3.0s and the card
holds the finished title until 4.0s.

---

## `slide-ch10-item-variants.html` — item template → variants (narrated)

Light palette shared with `title-bouncing-ball` / `list-walking-dot`
(`#ececec` bg, `#212121` ink, blue `#0a8df7` accent — `:root` vars at the top
of the `<style>`, not the frappe-ui tokens). Left: the template item card
(dashed blue phone = blueprint). Middle: the attribute chip.
Right: three variant cards that fill dashed ghost slots when the VO says
"color". "Memory" / "Configuration" chips stack under "Color" on their cues.

Voiceover: `assets/ch10-variant.mp3` (7.87s), transcript cached at
`assets/edit/transcripts/ch10-variant.json`. Root duration 9.4s.

### Knobs (`CFG`)

| Key | What it does |
| --- | --- |
| `items[]` | variant `name`, phone `body` / `screen` colours, swatch `ink`, optional `edge` outline for dark bodies |
| `t.*` | cue times — word start minus ~0.1s; retime here if the VO changes |
| `template` / `chip` / `variants` | geometry; SVG connectors derive from the same numbers |

Rendered: `renders/slide-ch10-item-variants.mp4`.

---

## `slide-ch11-item-price.html` — one item, many price lists (narrated)

Same light palette + card language as `slide-ch10-item-variants`. Left: the
item. Right: two price-list cards (New York / Outside New York) whose rates
pop on "one rate" / "different rate"; a "+ transportation" chip lands on
"transportation costs"; wires go blue and the footer + criteria chips land on
"one item … multiple prices … different criteria".

Voiceover: `assets/ch11-price-list.mp3` (16.67s) starts at `AUDIO_AT` = 0.5s
so the item is on screen before the first word. Transcript cached at
`assets/edit/transcripts/ch11-price-list.json`. Root duration 18.6s.

### Knobs (`CFG`)

| Key | What it does |
| --- | --- |
| `lists[]` | price-list `name`, `amount`, Lucide `icon` (pin / globe), optional `extra` chip |
| `criteria[]` | footer chips |
| `w.*` | transcript word starts (audio-local); `cue()` adds `AUDIO_AT` and subtracts `LEAD` |
| `item` / `plists` | geometry; wires derive from the same numbers |

Rendered: `renders/slide-ch11-item-price.mp4`.

---

## `timeline-go-live.html` — vertical go-live checklist, ticked off across videos

Light series palette. A vertical rail with four steps (User training,
User acceptance testing (UAT), Clear transactions, Opening balances) and a
filled "Go Live" destination node. A faint dotted rail enters from the top
edge = everything done before. No in/out — each slice starts and ends on a
still so it cuts in anywhere.

Tick = node squash → blue fill → check draws → label goes dark → "Signed off"
pill (steps with `signoff: true`) → rail below fills blue toward the next step.

### Knobs (`CFG`)

| Key | What it does |
| --- | --- |
| `done` | how many steps are already ticked at t=0 |
| `ticks` | `[{ i, at }]` ticks landing in this clip; `i` 0–3 steps, 4 = Go Live (pop only); `[]` = hold frame |
| `dur` | clip length — keep in sync with both `data-duration` attrs |
| `focus` | `{ i, at }` — a blue ring draws clockwise around step `i` ("this is next"); `null` = none |
| `confetti` | `{ i, at }` — confetti burst from step `i`'s node. canvas-confetti physics/look re-implemented with a seeded RNG, baked per frame, drawn on a canvas from the timeline (seek-safe, deterministic). Tune in the `C` block. `null` = off |
| `priorLine` | the dotted rail from the top edge |
| `steps[]` / `golive` | text, optional `paren`, Lucide `icon`, `signoff` |

### Rendered slices (`renders/timeline-*.mp4`)

| File | done | ticks |
| --- | --- | --- |
| `timeline-01-user-training` | 0 | step 0 @1.0s |
| `timeline-02-uat` | 1 | step 1 @1.0s |
| `timeline-03-clear-transactions` | 2 | step 2 @1.0s |
| `timeline-04-opening-balances-pending` | 3 | no tick; focus ring on step 3 @1.0s, 4s |
| `timeline-05-opening-balances` (next video) | 3 | step 3 @1.0s |
| `timeline-06-go-live` (next video) | 4 | Go Live pop + confetti @1.0s, 10.5s (6s still hold at end) |
| `timeline-full-sequence` | 0 | steps 0,1,2 @1.0 / 2.8 / 4.6s, 7.5s |

Slice renderer (scratch): `render_tl.sh <name> <done> '<ticks js>' <dur> ['<focus js>' ['<confetti js>']]` —
copies the composition into a scratch project with those knobs and renders.

---

## `slide-ch14-chart-of-accounts.html` — chart of accounts → balance sheet vs P&L (narrated)

Same light palette + card language as `slide-ch10` / `timeline-go-live`. A root
"Chart of Accounts" node branches to four Lucide-iconed cards (Asset, Liability,
Income, Expense). Each card fills its dashed slot on its word; then the two
wires of a pair merge into one trunk while a container draws itself around them
("Balance Sheet", then "Profit & Loss"). On "only for balance sheet accounts"
the BS side goes blue and gets an "Opening balances required" pill; the P&L
side dims (dashed border, grey tiles) and gets "No opening balances".

Cued to the **delivered chapter-14 edit** (`chapter 14 A (end of course)…mp4`),
transcript at `projects/ERPNext-Implementation/edit/local/transcripts/`.
**Place the clip at source 00:09.00** — every `CFG.t` cue is source time − 9.0s.
Duration 17s (source 09.0 → 26.0; the last beat lands at 24.6, hold after).

### Knobs (`CFG`)

| Key | What it does |
| --- | --- |
| `t.*` | cue times; retime here if the VO changes |
| `sides[]` / `groups[]` | labels, Lucide icons, pill copy |
| `root` / `leaf` / `box` / `pillCy` | geometry; wires and boxes derive from the same numbers |

Rendered: `renders/slide-ch14-chart-of-accounts.mp4`.

---

## `slide-ch14-certifications.html` — the two certifications + Frappe School (narrated)

Same light palette + card language. "Get certified" kicker; two cards
(ERPNext Certification / Frappe Framework Certification, Lucide tiles) land on
their names; each opens a dashed "Designed for" slot that fills with the
audience pill on the word (Functional consultants / Framework developers).
"Learn more" opens a footer slot, "Frappe School" fills it with a dark pill
carrying `school.frappe.io ↗`.

Cued to the **delivered chapter-14 edit**. **Place the clip at source
06:37.00 (397.0s)** — every `CFG.t` cue is source time − 397.0. Duration 14s
(397 → 411; last beat 408.4, hold after; "ratings and feedback" starts 411.2).

Rendered: `renders/slide-ch14-certifications.mp4`.

---

## `slide-ch14-balance-sheet.html` — GizmoWorld's opening balance sheet, performed (narrated)

Replaces the spreadsheet on screen with the same numbers in our card language.
Two panels (Assets / Liabilities), group rows + indented children, tabular
figures. Segment A: rows cascade in on "this is how it looks"; Temporary
Opening gets a ring, a dashed "balancing figure" chip, then a green `0 · auto`
chip on "zero"; panels go blue on "two sides"; totals count up to 80,000 on
"same value"; an `=` badge pops on "tallying"; "Closed balance sheet" +
"Prerequisite for opening balances" pills land. Segment B: a single reading
highlight follows the tree walk row by row; then each account gets the tool
that posts its opening balance — `✓ Stock Reco` (green), `Opening Invoice`
(blue), dashed slots that all fill with `Journal Entry` on the words. Legend
under the panels. Bottom-left ~440×320 kept clear for the facecam PIP.

Cued to the **delivered chapter-14 edit**. **Place the clip at source
00:33.00** and let it run — 113s, to 02:26. Cut back to the facecam for
01:16–01:35 ("not mandatory on day one"); the graphic holds still there.
Every `CFG.t` cue is source − 33.0. `CFG.sides` holds the figures.

Rendered: `renders/slide-ch14-balance-sheet.mp4`.

---

## `overlay-ch14-accounting-basics.html` — cross-promo card (transparent overlay)

Small top-right card over the facecam: the real YouTube thumbnail of
"Accounting Basics ft. Umair Sayed" (`assets/img/accounting-basics-thumb.jpg`,
from youtube.com/watch?v=4bb6o94Z_vc) with a play badge and channel line. No
CTA — the "link in description" graphic on screen carries that.

**Place at source 00:27.00.** Card in on "video" (27.8), play badge on
"Hussain" (28.2), out at 30.5 before "link". 4s.
Render with `--format mov` (ProRes 4444, alpha) — `renders/overlay-ch14-accounting-basics.mov`.

---

## `slide-ch14-reload.html` — the reload: totals roll, equation locks, plug zeroes (narrated)

Replaces the ERPNext report frames after "If I just reload" (they carry
highlight boxes, a black rectangle on the chart, and an asterisk note about
the hidden temporary account). Three stat tiles echo ERPNext's own summary
row: on "reload" the figures roll 60,000 → 80,000 / 42,000 → 62,000 / 18,000
with delta chips; on "asset and liabilities" the equation
`62,000 + 18,000 = 80,000` assembles and "tallying" locks it with the `=`
badge and a green "Tallies" chip; on "become zero" the Temporary Opening tile
counts −10,000 → 0 and collapses, replaced by a note that zero-balance
accounts are hidden in the report; "completion" lands the "Opening balances
complete" pill.

Cued to the **delivered chapter-14 edit**. Keep the real screen up to
"reload", then **place at source 06:02.00 (362.0s)**; 19s. Cut to
`timeline-06-go-live` on "ready to go live" (06:20.96). Cues are source − 362.

Rendered: `renders/slide-ch14-reload.mp4`.

---

## `title-feature-highlighter.html` — feature transition title (What's New in FF)

Dark panel wipes in from the left, title settles on a critically damped spring,
a badge-hue marker stroke draws behind the last word, then everything retraces
back left. Whip on each panel wipe, soft whoosh under the stroke. 3.4s,
transparent — render `--format webm`, convert to ProRes 4444 `.mov` for NLEs.

Knobs in `CFG`: `title`, `hue` (violet | blue | green | amber), `mark`
(`"last"` | `"title"`). Long titles shrink from 128px to fit one line (floor 96px).

`title` and `hue` are also composition variables, so one batch renders every card:

```bash
npx hyperframes render -c compositions/title-feature-highlighter.html --format webm \
  --batch features.json   # [{"title":"Ignore Versioning","hue":"violet"}, ...]
```

Batch output lands as `renders/graphics_<timestamp>_<row>.webm` (row order) — rename after.

## `title-version-shine.html` — version release title (What's New in FF)

Same panel wipe and spring-settled title as `title-feature-highlighter`, but the
version is the shiny object: gold type (`--ink-amber-8`), a lucide `sparkle` pops in
at the top-right on an under-damped spring (one ~9% overshoot, quarter turn), one
hard-edged sheen band (`--ink-gray-9`, flat, no gradient) sweeps across the digits,
a small second sparkle glints once, then it holds still and retraces out. Glint SFX
`assets/sfx/glint.wav` (synthesised, ffmpeg `aevalsrc`) on the pop. 3.5s, transparent.

Knob: `title` (also a variable — `--variables '{"title":"v16.60"}'`). Timing in `CFG`
(`sparkAt`, `sheenAt`, `sheenDur`, `sheenW`, `glintAt`, `exitAt`, `panelOutAt`).

## `title-feature-cascade.html` — series title (What's New in FF)

Same panel, but letters rise in tinted with cycling badge hues and resolve to
neutral ink; the colour wave runs back on exit. Knobs: `title`, `fontSize`,
`stagger`, `exitStagger`, `exitAt`, `panelOutAt`. For long titles (~30 letters)
use `fontSize: 88, stagger: 0.025, exitStagger: 0.015, exitAt: 2.4,
panelOutAt: 2.75`, duration 3.35, whip-out `data-start` 2.99.

## `list-ff-august-{full,rail,stack}.html` — agenda list, highlight follows the VO (What's New in FF)

Four items; each one is highlighted on its VO cue and gets a check once done.
Voiceover: `assets/index-list.wav` (26.73s), transcript
`assets/edit/transcripts/index-list.json`. Cues = word starts of First / Second
/ Third / And last (`CFG.cues`), minus `CFG.lead`.

| File | Look | Output |
| --- | --- | --- |
| `full` | full-screen dark panel wipe (same as `title-feature-highlighter`), big type, marker stroke behind the active item — one hue per item (`CFG.hues`), numbers never move | 27.8s, transparent outside the panel |
| `rail` | one dark card on a side, violet pill slides between rows | 27.6s overlay; `CFG.side` left/right |
| `stack` | separate cards; active card opens to show `desc` + violet edge, stack re-flows | 27.6s overlay; `CFG.side` right/left |

Knobs: `items`, `cues`, `lead`, `dimTo`, `side`, geometry. Overlays must render
`--format webm` (or mov); the `-preview.mp4` renders show white where it is transparent.
The `<audio id="vo">` is there for sync checks — drop it (or `data-volume="0"`) for the NLE overlay.

## `code-ff-august-awesomebar-result.html` — hook result dict, key by key (What's New in FF)

frappe/frappe#41925. Same panel wipe + badge hues as `list-ff-august-full`. A code
card (illustrative; `route` + `route_options` match `create_party_result()` in gst_search) is centred; a band walks the dict →
`label` → `description` → `route` (green only). On "three different things"
the code nudges left and three route-shape cards arrive (Desk route / In-app path /
External URL); the `route` value in the code morphs to match the lit card. On
"route options" the cards leave, code re-centres, band moves to `route_options`.

Covers `FF August.mov` 495.30s → 527.65s. Cue times in `CFG.cues` are **source**
seconds; `SRC_AT` maps them to the composition. VO slice for sync:
`assets/aug-route-format.wav` — drop the `<audio id="vo">` for the alpha render.
Mono face: JetBrains Mono, self-hosted in `theme/fonts/` (ligatures off).

## `overlay-ff-august-frappeverse-talk.html` — talk cross-promo card (transparent overlay)

Same card as `overlay-ch14-accounting-basics`, top-left (clear of the face in both
facecam framings; he points up-left at "here"). Thumbnail
`assets/img/frappeverse-2026-talk-thumb.jpg` (1.93:1, shown uncropped at 560×291);
play badge sits in the gap between title and photo so it doesn't cover the title.

**Place at `FF August.mov` 00:20.00.** In on "talk" (20.93), play badge on "YouTube"
(26.70), small lift on "here" (28.90), out 29.9 before "Let's get started". 10.6s.
Rendered with the VO slice (`assets/aug-talk-promo.wav`) for waveform alignment —
mute the clip's audio after aligning.

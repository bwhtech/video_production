---
format: 1920x1080
fps: 30
duration: ~6m00s (estimate; build re-times from TTS word timestamps)
message: "The Profit & Loss statement is the movie of April: sales, minus what was used and what it cost to run the stall, is profit — and Meera made ₹24,700."
arc: Cold open (L1's night, replayed) → Title → Last time (TB answers) → Checkpoint 4 solution (Aman's TB) → Which accounts get a part? → Worked: gross profit → Faded: net profit + L1's answer → Read it like a story → Misconception: Khata the usher (Ravi Mama comes twice) → Solo: gross vs net, then the loss (sales ₹15,000 → −₹10,300) → Recap → Your Turn → Tease (the photo) → End card
audience: adults with school maths, zero accounting (founder archetype)
lesson: 12
module: "M5 · Reading the Story"
new_idea: "Build and read the P&L — the movie of a period: revenue − cost of supplies used = gross profit; − running costs = net profit (or a loss)."
---

<!--
Visual language, cast, and devices: ../../SERIES-BIBLE.md (§4 cast, §5 devices, §9 visual identity).
Every scene leaves through an OBJECT that becomes the next scene — no hard cuts.
VO = vo-segments.json ids (SCRIPT.md line numbers in brackets).
Motion (locked): acting on 15 fps steps; no jitter/boil on holds, cards or text; camera pushes ≤ 8 %;
entrances = drop-and-place (1.07× lifted → settle, power2.out); exits lift off (1.05× + fade).
Numbers on screen always count (tickers), Indian grouping. Debit/left = #3D7FD9, credit/right = #E8862E.
All figures: course/data/meeras-chai.json (P&L: Sales 50,000 − Cost of supplies used 10,000 = 40,000;
− Rent 5,000 − Salary 8,000 − Electricity 1,000 − Depreciation 1,000 − Interest 300 = 24,700) and aman-samosa.json.
Solo what-ifs (Scene 9) are hypotheticals derived from the same lines: rent 7,000 → net 22,700 (gross unchanged);
sales 15,000 → gross 5,000 → net −10,300.
Scale HUD: absent by design in every scene of this lesson — the film strip plays the scale's role (bible §5.1).
Colour: `--scene-leaf` is only ever a wipe here; the ₹24,700 / ₹40,000 / −₹10,300 figures sit on neutral `--paper`
so the same strip can show a loss (bible §9).
Shared kit props (bible §5.11): `filmStrip` = 7 line frames + 2 ruled result frames (Gross / Net), identical in s4, s7,
s9, L13 s5 and L14 s9. The `polaroid` is the Balance Sheet only — never a memory card.
-->

## Scene 1 — The first night, again (cold open)

- scene: L1's opening shot, rebuilt: the night of April 2, Meera on the crate, galla full of notes, three cost slips (milk, sugar, rent), the profit/loss medallions, the snoozing street dog. This time Khata sits awake on the counter — and opens.
- duration: 25s
- voiceover: s01a, s01b (Line 1)
- learning: Pay off L11's tease and L1's question: "did Meera make a profit, or a loss?" — this lesson answers it.
- transition_in: fade from black
- transition_out: Khata closes; the camera rushes into its red cover → the cover becomes the title-sting book
- status: outline

**Visual.** `--scene-night`. Same framing and set as L1 s01 (string lights, stall with the "MEERA'S CHAI"
board, kettle, stacked tumblers, **the street dog snoozing by the crate** — L1 s01's exact prop, same spot) so
the rhyme is unmistakable. A faint calendar strip along the top with `2` (April) highlighted — on-screen
confirmation of "April second" (L1's night is Apr 2, Meera's first trading day; bible §2). Meera on the upturned
crate, galla on her knees, notes showing. On "count the milk, the sugar, and the stall's rent" the three L1 cost slips (milk-can,
sugar-bag, `key` icons; no words) lift out of the galla one by one and hang in the air — *counted*, not paid:
they hang beside the galla, no coins leave it; on "profit? Or a loss?"
the two L1 medallions (trending-up / trending-down) appear either side of Meera's head. NEW vs L1: Khata
sits on the counter, eyes open (in L1 it was not yet introduced). On "Back then, she had no way to know" a
tiny grey "?" emote pops over Meera — exactly L1's — then on "a whole month of books" a neat stack of 19
smallBooks and a trial-balance sheet slide onto the counter beside Khata (the sheet shows two equal totals,
`₹1,36,000` | `₹1,36,000`).

**Motion.** Slow push-in 1.00 → 1.06 over the scene. Meera: counting pose (L1) → stops → looks at Khata
(look + head tilt, stepped). The dog is the scene's one ambient "life" element (one slow ear flick, stepped; no
breathing loop). Cost slips drop-and-place in a gentle arc, hold (no float). On "So tonight,
Khata opens" Khata hops once and `open()`s; its pages are blank cream, a soft paper-white panel behind them
(flat, no glow). Meera's expression → `amazed`. Hold 0.6 s.

**Sound.** `night_street` bed (build), `kettle_bubble` low. One soft `note_rustle` (vol ≤ 0.25) on the
galla. `paper_slide` ×3 for the slips (staggered), `pop` for the "?" emote, `book_thump` small for the
smallBooks stack, `cover_swing` on Khata opening.

**Transition.** Khata snaps shut (`close()`), the camera rushes into the red cloth cover; it fills the
frame and becomes the title sting's cover (hand-authored seam, like L1's clasp rush).

## Scene 1t — Title sting

- scene: Series sting, reused: red Khata cover with "Lesson 12" + "The Profit & Loss Statement" swings open.
- duration: 4.6s
- voiceover: —
- transition_out: cover swings open → the right page already shows Scene 2's three answer cards; camera pushes into the page
- status: outline

**Visual/Motion.** Exactly L1's `s01t` shape: `LESSON = "Lesson 12"`, `TITLE = "The Profit & Loss Statement"`
(Baloo 2, gold stitched look), cover swings open on its spine; page window shows Scene 2's first frame.
SFX: `book_thump`, `cover_swing`. Music: `intro_sting`.

## Scene 2 — Last time: the trial balance answers

- scene: Three answer cards in a row; each lights as its answer is spoken.
- duration: 26s
- voiceover: s02 (Line 2)
- learning: Spaced retrieval of L11 — TB totals; what a TB can't catch; Drawings sit in the debit column (but are not an expense).
- transition_out: the trial-balance card slides left; Aman's samosa cart rolls in from the right, pushing his own sheet (Scene 3)
- status: outline

**Visual.** `--scene-teal`. Three white cards with coloured header strips (`1`, `2`, `3` only).
1. A two-column sheet: blue left column, orange right column; totals tick up together to `₹1,36,000` =
   `₹1,36,000`.
2. A transaction slip with a dashed outline (the forgotten one) above the same sheet; it fades out of BOTH
   columns at once; a mini scale (the L3 Taraazu) stays level → answer medallion: empty open hand (L1's
   "not" icon) — "can't catch it".
3. A `Drawings ₹3,000` slip (Meera's face tag) drops into the blue left column, next to expense slips
   (`Rent`, `Salary`). On "not an expense" Khata (small, card corner) pops a "!" emote and the Drawings slip
   gets a tiny red pushpin — it will come back in Scene 8.

**Motion.** Cards drop-and-place, stagger 0.15 s. Each card lifts 4 % and brightens while its answer plays,
then settles back. Tickers smooth (30 fps). No idle motion between answers.

**Sound.** `pop` per card, `tink_low` + `tink_high` as the two totals land, `ding_yes` on card 1's match,
`bwomp_no` (soft) on card 2's "No", `paper_slide` for the Drawings slip, `pop` for the "!".

**Transition.** Cards 2 and 3 lift off; card 1 (the sheet) slides left and shrinks; from the right, Aman's
cart rolls in pushing a fresh sheet of his own.

## Scene 3 — Checkpoint 4 solution: Aman's trial balance

- scene: Aman at his samosa cart; six journal slips (A10–A15) fly onto his khata's pages and his trial balance totals ₹54,000 = ₹54,000.
- duration: 33s
- voiceover: s03a, s03b (Line 3)
- learning: Model solution for the Checkpoint 4 challenge (journal → post → trial balance) on a different business.
- transition_out: Aman's TB card flips over — its back is Meera's 19-line trial balance (Scene 4)
- status: outline

**Visual.** `--scene-saffron`. Aman (stage-left, ~50 % frame height) beside his samosa cart (new assets,
shared with the L3/L5/L7/L11 checkpoints). Centre: six small journal slips arrive one per VO beat, each a
white card with a blue Dr line and an orange Cr line (English account names + ₹, no other words):
- A10 `Cash 11,000` | `Sales 11,000`
- A11 `Helper wages 3,000` | `Cash 3,000`
- A12 `Drawings 1,500` | `Cash 1,500`
- A13 `Cash 1,500` | `School canteen 1,500`
- A14 `Ingredients used 2,500` | `Ingredients stock 2,500`
- A15 `Depreciation 500` | `Accumulated depreciation 500`
On "Post them, balance every account" the slips fly into a small open khata (blue left page / orange right
page) in a quick 1 s montage; then a two-column TB card rises: totals tick to `₹54,000` | `₹54,000`, a mini
scale settles level, a tick medallion drops on. Aman does a small cheer pose (`[160, 12]`), on twos.

**Motion.** Slips drop-and-place in a 2×3 grid (no bounce). Each slip's Dr line arrives first (`tink_low`),
Cr second (`tink_high`). Post montage = smooth flights. Scale tilts once and settles; ≥ 1.5 s hold after.

**Sound.** `tink_low` / `tink_high` per slip line (vol low — six pairs), `paper_whoosh` for the post
montage, `ding_yes` on the matching totals, `boing_hop` (soft) on Aman's cheer.

**Transition.** The TB card flips (scaleX fake 3D) and its back is Meera's trial balance — the camera
follows it to centre-frame on teal.

## Scene 4 — Which accounts get a part? (the movie)

- scene: Meera's 19-line trial balance; the kit film strip unrolls with 9 frames (7 line frames + 2 ruled result frames); seven revenue and expense lines step out into the line frames; the rest stay behind, dimmed. The Sales frame splits into cash + credit.
- duration: 31s
- voiceover: s04a, s04b (Line 4)
- learning: The P&L takes only revenue and expense accounts; it covers a period (April); credit sales count.
- pause_beats: 1.4s after "So which accounts get a part in it?"
- transition_out: camera follows the film strip down to its second frame (Scene 5)
- status: outline

**Visual.** `--scene-teal`. The TB as a tall paper sheet of 19 thin strips (account name + ₹, Indian
grouping, ≥ 34 px Baloo 2, rows ≥ 60 px — the 19 rows are a two-stage reveal: top 10 then bottom 9 scroll up),
blue debit column, orange credit column. On "a movie — the Profit and Loss statement" a vertical film strip
(kit `filmStrip`, **9 frames**: 7 empty line frames + 2 **ruled result frames** — one after frame 2, one at the
bottom — the result frames carry a ruled line and a `₹` placeholder and stay empty until s5/s6) unrolls on the
right with a `Profit & Loss` chip and an `April` date chip on top. This 9-frame shape is the stable prop reused
unchanged in s7, s9, L13 s5 and L14 s9. During the 1.4 s gap: Khata (small, bottom-left, open) pops a "?" emote.
On "Revenue, and expenses" the seven strips lift out of the TB and fly into the seven *line* frames, top to
bottom (skipping the two ruled result frames):
`Sales ₹50,000` · `Cost of supplies used ₹10,000` · `Rent ₹5,000` · `Salary ₹8,000` · `Electricity ₹1,000` ·
`Depreciation ₹1,000` · `Interest ₹300`. On "Everything else stays behind" the remaining 12 strips dim to
45 % and slide back a step (`Cash`, `Bank`, `Infotech`, `Stock`, `Equipment`, `Accumulated depreciation`,
`Loan from Ravi Mama`, `Gopal Dairy`, `Advance from customer`, `Electricity payable`, `Capital`, `Drawings` —
registry names, bible §5.14; Drawings still wears its red pushpin).
On "Forty thousand in cash, and ten thousand on credit" the Sales frame splits into two coin stacks:
galla icon `₹40,000` + Priya's face tag `₹10,000`, then re-merges into `₹50,000`.

**Motion.** Strips fly on smooth arcs, stagger 0.12 s, each landing with a small drop-and-place. Film strip
holds still (no scrolling loop — the projector runs only in Scene 7). Dim = one 0.3 s fade, no wobble.

**Sound.** `projector` short (1.0 s, vol low) when the film strip unrolls; `paper_slide` ×7 (soft,
staggered — or one `paper_whoosh` for the group); `coin_clink` on the Sales split.

**Transition.** The camera glides down the film strip; frame 2 (`Cost of supplies used`) fills centre
frame and becomes Scene 5's stage.

## Scene 5 — Worked: gross profit

- scene: Khata subtracts the supplies used from sales; the milk and sugar slips from Scene 1 land on the "Cost of supplies used" frame; the "cost of goods sold" alias flashes once; ₹40,000 gross profit lands in the first ruled result frame.
- duration: 26s
- voiceover: s05 (Line 5)
- learning: **Gross profit** = sales − cost of supplies used: what's left after paying for the chai itself. Global alias, once: **cost of goods sold** (bible §6.11).
- transition_out: the paper-block column (now 40 blocks) stays on stage; Meera steps in beside it (Scene 6 continues the same column)
- status: outline

**Visual.** `--scene-saffron`. Khata open, centre-right, one page arm pointing like a teacher. Left: a stack
of 50 thin paper "chai blocks" = `Sales ₹50,000` (a tall paper column, not a chart axis). On "Remember the
milk and the sugar… Here they are" the milk-can and sugar-bag slips from Scene 1 flutter in and land on the
`Cost of supplies used ₹10,000` frame, joined by a `leaf` icon (stock). On "Bigger businesses call this line cost
of goods sold" a small chip `Cost of goods sold` hangs under the frame's label for the length of the sentence,
then lifts off — an alias shown once, the label itself never changes. On "Fifty thousand, minus ten thousand"
the top 10 blocks (tinted kraft) lift off the column and slide onto the supplies frame; the column ticker
counts `₹50,000 → ₹40,000`; the first **ruled result frame** of the strip lights and `Gross profit ₹40,000`
ticks into it (neutral paper — not leaf).

**Motion.** Slips: soft arc, drop-and-place. Alias chip: drop-and-place, lift-off (no flip). Block lift = one
smooth group move (0.5 s, power2.out). Khata: `point` on "Here they are", `expr("happy")` on "gross profit".
Hold 1.0 s on the result.

**Sound.** `paper_slide` for the slips, `paper_whoosh` for the block lift, `ding_yes` (soft) as the chip
lands.

**Transition.** No object swap: the 40-block column and the strip stay exactly where they are; Khata steps
back a pace and Meera walks in from the left (cheat walk, on twos) to take over the same stage. One visual
system from gross to net — the column keeps shrinking.

## Scene 6 — Faded: net profit (and Lesson 1's answer)

- scene: Meera subtracts five running costs from the same 40-block column; she tries to add the Drawings slip to the stack — Khata's "!" — and pulls it back; a blank ₹ ? with a countdown; reveal ₹24,700 net profit, dead-still hold; torn-paper flashback to L1's night with the "profit" medallion lighting up.
- duration: 44s
- voiceover: s06a, s06b, s06c, s06d (Line 6)
- learning: **Net profit** = gross profit − costs of running the stall. Answers L1's cold-open question.
- pause_beats: 1.2s silent hold after "three hundred." (Meera's Drawings fumble) · 2.8s countdown after "Pause, and work it out." · ≥1.5s dead-still hold on ₹24,700 before s06d (the 1.6 s gap)
- faded_choice: Meera reaches for the pushpinned `Drawings ₹3,000` slip and tries to add it to the expense stack; Khata "!"; she removes it (bible §3 — the faded beat must show a visible slip)
- transition_out: the film strip rolls back up into one complete strip (Scene 7)
- status: outline

**Visual.** `--scene-teal` → `--scene-leaf` *wipe* on the reveal (leaf is the aha colour, not the profit
colour — every ₹ figure in this scene sits on neutral `--paper`). Same stage as Scene 5: the 40-block column
(`₹40,000`) centre-left, the film strip right. Five expense slips arrive one per VO beat and stack beside Meera,
each a die-cut paper icon + amount: `Rent ₹5,000` (`key` — the SAME rent slip from Scene 1, callback),
`Salary ₹8,000` (Raju face tag), `Electricity ₹1,000` (`zap`), `Depreciation ₹1,000` (cart with the scuff
sticker), `Interest ₹300` (Ravi Mama face tag, `percent`). Stack ticker: `₹15,300`.
**The fumble (1.2 s hold after "three hundred"):** Meera glances at the dimmed TB behind her, picks up the
pushpinned `Drawings ₹3,000` slip (`wallet` icon, Meera's face tag) and moves it toward the expense stack —
the stack ticker *starts* to tick `₹15,300 → ₹16,…`; Khata (small, right) pops a "!" emote and taps the
pushpin; the ticker snaps back to `₹15,300`; Meera `sheepish`, puts the slip back on the TB, pushpin still in.
(The slip is turned away *for real* at the cinema door in Scene 8.) Then "Together, fifteen thousand three
hundred" lands on the untouched stack.
s06b: 15 blocks plus a thin 0.3 sliver (tinted kraft, same as s5's cut) lift off the column onto the five slips;
the column ticker counts `₹40,000 → ₹ ?` — the number blanks instead of landing; a 3-2-1 countdown ring
drains over 2.8 s; Meera in `thinking` pose, pencil from her bun.
s06c: `₹ ?` ticks to `₹24,700` (from 40,000 down, 0.8 s); the strip's bottom **ruled result frame** lights
and `Net profit ₹24,700` ticks into it on cream paper; colour wipe to leaf behind; Meera `joy`, Khata hops
once. **Then nothing moves for ≥ 1.5 s** (the 1.6 s gap) — the course's central payoff gets real stillness.
s06d: a **torn-paper vignette** (irregular torn edges, night colour, 25 % frame) of Scene 1's night slides in
at top-left — the L1 set in miniature with the two medallions, NOT a polaroid (the polaroid is the Balance
Sheet prop only); on "A profit" the trending-up medallion comes to full opacity and the trending-down one dims
to 40 % (ink on paper, no colour change); Meera exhales and smiles (`happy`) on "She finally knows."

**Motion.** Slips drop-and-place in a vertical stack (stagger by VO word). Fumble: Meera's reach = one
stepped arm move (3 steps), ticker starts and snaps back (no wobble), "!" = `pop` scale 1.07 → 1.0. Block lift
= one smooth group move (0.5 s). Countdown ring smooth; everything else completely still during the gap.
Reveal: 0.5 s stillness, ticker 0.8 s, then the ≥ 1.5 s dead-still hold (no sparkle, no hop, no camera —
hold *everything*). Khata `hop` (one) on the ticker, not during the hold. No confetti loop — at most a single
`sparkle` burst on "A profit" that clears in < 1 s.

**Sound.** `paper_slide` per slip (soft), `pop` for Khata's "!", `paper_slide` as the Drawings slip goes
back, `paper_whoosh` for the block lift, `tick_tock` during the countdown (music ducks), `ka_ching` on
₹24,700, silence through the hold, `paper_tear` (new, soft) as the vignette slides in, `sparkle` small on
"A profit".

**Transition.** The five slips and the two result cards slot back into their film-strip frames; the strip
rolls up and the camera pulls back to show it whole (Scene 7).

## Scene 7 — Read it like a story

- scene: The complete 9-frame P&L film strip; a projector beam runs down it frame by frame as the VO reads; then a ₹100 coin splits to show "about ₹49" kept — one sentence, one picture.
- duration: 20s
- voiceover: s07 (Line 7)
- learning: Read the P&L top to bottom; one glance at proportion ("about ₹49 of every ₹100") — kept to a single sentence, ratios are not taught (bible §1).
- transition_out: the projector beam swings and lights a cinema door — Khata stands at it as usher (Scene 8)
- status: outline

**Visual.** `--scene-leaf` (carried over from the s6 wipe; the figures stay on cream paper). The finished
9-frame film strip centre-frame, the same object as s4: Sales (top) → supplies → ruled result frame
`Gross profit ₹40,000` → five running costs → ruled result frame `Net profit ₹24,700` (bottom).
A small paper projector at left throws a flat cream beam (no glow) that steps down the strip as each line is
read. On "Out of every hundred rupees of chai" a big paper coin `₹100` appears beside the strip and splits
into three slices sized 20 / 31 / 49 — chips: `₹20` (milk-can = the chai itself), `₹31` (**stall icon** =
all five running costs together, not the `key`/rent alone), `₹49` (Meera's face). Only the ₹49 slice stays lit.

**Motion.** Beam moves in steps (one per VO phrase, smooth 0.3 s slides). Coin split: one smooth 0.5 s
separation, no spin. Hold 1.0 s on ₹49.

**Sound.** `projector` (running, under VO at low vol, ≤ 4 s), `coin_clink` on the split.

**Transition.** The projector beam swings right and lands on a paper cinema door; the camera follows the
beam (whip-free, smooth pan).

## Scene 8 — Misconception: Khata the usher

- scene: A cinema door marked with the April film strip; Khata as usher checks "tickets". Ravi Mama comes twice (loan bundle blocked; then ₹3,000 + ₹300 — only the ₹300 coin gets a ticket), then the cart, Meera's drawings, the advance and Infotech's payment; only depreciation and interest get tickets.
- duration: 50s
- voiceover: s08a, s08b (Line 8)
- learning: Not every rupee that moved is revenue or expense: loan, loan repayment, equipment purchase, drawings, advance, collection from a debtor stay out of the P&L; interest and depreciation get in.
- misconception: "Every rupee that moved in April belongs in the P&L." Staged inside it (bible §6.6): **loan repayment ≠ expense** (Ravi Mama's second visit) and **drawings ≠ expense** (Meera, pushpin slip).
- transition_out: the cinema door swings shut; its door panel becomes a question card (Scene 9)
- status: outline

**Visual.** `--scene-coral`. A paper cinema doorway with a velvet rope (new asset); above it a film-strip
icon + `April` chip. Khata stands at the rope in a tiny usher's cap holding a paper torch (new props).
On "every rupee that moved in April belongs in the movie" Meera's thought bubble shows ALL April's slips
crowding into the film strip → red ✗ misconception stamp (once).
A queue arrives from the left, one per VO beat:
1. Ravi Mama with a `₹30,000` bundle (umbrella under his arm) → Khata's arm blocks; he turns away (stepped
   walk-off, proud huff).
1b. **He comes straight back** (two-step turn, no exit): palm out, holding a `₹3,000` note bundle and a small
   `₹300` coin (`percent` icon). Khata's arm blocks the bundle (it slides back into his palm) and tears a
   ticket for the coin — the `₹300` coin hops through the door and lands on the `Interest ₹300` frame, which
   lights. Ravi Mama leaves content (proud nod). *Loan repayment is not a cost; interest is.*
2. The cart (`₹36,000` tag) rolls up → blocked; a small `₹1,000` coin (depreciation, scuff sticker) pops off
   its side and Khata tears it a ticket — it hops through the door onto the `Depreciation ₹1,000` frame.
3. Meera holding `₹3,000` notes with the `wallet` icon (the Drawings slip with the red pushpin from Scene 2
   and Scene 6's fumble — "hold that thought" pays off) → blocked; she shrugs and walks home.
4. An envelope `₹4,000` with a `May 5` calendar chip (the catering advance) → blocked; Khata taps the
   calendar chip.
5. A phone with a UPI sticker `₹4,000` (Infotech's payment) → Khata points through the door at the Sales
   frame: **Priya's face tag on the Sales frame pulses once (1.0 → 1.08 → 1.0) and a tick sticker lands on
   the phone** — counted already; the phone stays outside, no bwomp.
On the closing line two small signs hang beside the door: `Revenue` (indian-rupee icon) and `Expenses`
(empty tumbler icon) — accounting terms only, no English phrases (dub rule).

**Motion.** Queue walk-ins on twos (cheat walk), blocked with Khata's one-arm gesture (`arm` up, hold,
down). Turn-aways are quick exits (faster than entries). Ticket tear: 2-step. No shaking — the stamp lands
with a scale settle (1.07 → 1.0), no screen shake.

**Sound.** `stamp_thunk` on the ✗, `bwomp_no` (soft, vol low) on each turn-away (×5: loan, repayment,
cart, drawings, advance), `ticket_tear` (new) + `ding_yes` ×2 for the interest and depreciation tickets,
`pop` for the phone's tick, `bell_ring` small as the two signs hang.

**Transition.** Khata unhooks the rope and the door swings shut toward camera; the door panel fills the
frame and becomes the white question card of Scene 9.

## Scene 9 — Solo: gross vs net, then the loss

- scene: Two cards. Card 1: the P&L strip with rent patched to ₹7,000 — does GROSS profit change? Countdown; reveal: gross holds at ₹40,000, net ticks to ₹22,700. Card 2: sales patched to ₹15,000; the strip's result frames tick down to a negative — a loss of ₹10,300; the trending-down medallion lights; Meera's share shrinks.
- duration: 43s
- voiceover: s09a, s09b, s09c, s09d (Line 9)
- learning: Solo tests the lesson's idea (which line a cost sits on — above or below gross profit), not arithmetic. Then the one **loss** of the course (bible §6.11): the same strip, a negative result frame — "Profit *and Loss*" has two shapes.
- pause_beats: 3.2s countdown after "Does gross profit change too?" · 1.0s suspended beat after "to run the stall…"
- transition_out: card 2 shrinks into the first recap tile (Scene 10)
- status: outline

**Visual.** `--scene-teal` (stays teal through the loss — no coral, no leaf: the loss is a result, not a
misconception). **Card 1:** the kit `filmStrip` (same 9-frame object) stood up as a card. The `Rent ₹5,000`
line gets a new paper patch slapped over it: `₹7,000`. Both ruled result frames flip to `₹ ?`; a countdown
ring beside the Gross frame (the question is about gross). Reveal: the Gross frame ticks back to `₹40,000`
and holds (a small cream tick sticker, no colour), the Net frame ticks `₹24,700 → ₹22,700`; a thin cream
bracket appears from the rent line down to the Net frame — rent sits *below* the gross line. On "stays at forty
thousand" the Gross frame lifts 4 % once.
**Card 2:** the rent patch peels off (`₹5,000` again); a new patch lands on the Sales frame: `₹15,000`
(behind it, the Infotech office window from L4's tease goes dark — nobody drinking chai). The Gross frame
ticks `₹40,000 → ₹5,000` on "five of gross profit". The five running-cost frames stay as they are
(`₹15,300` bracket). On "to run the stall…" the Net frame blanks to `₹ ?` and the 1.0 s beat holds. s09d: the
Net frame ticks `₹5,000 → −₹10,300` — the **negative result frame**: same cream paper, a minus sign in ink,
and the frame's ruled line doubles (two rules) so the shape itself reads "below zero"; no red. On "A loss"
the trending-down medallion from Scene 1 / Scene 6's vignette lights to full opacity beside the strip (the
trending-up one dims to 40 %). On "Meera's share would shrink" Meera's face tag (L4's equity tag) appears
small at right with a cream down-arrow sticker — the equity consequence L13 will show properly.

**Motion.** Patches drop-and-place; rings drain smoothly; everything else still during the gaps. Tickers
0.6 s (card 1), 0.8 s for the drop to −₹10,300 — then ≥ 1.0 s hold on the negative frame before the recap
pull-back. Medallion swap = opacity only, no scale.

**Sound.** `paper_slide` (patches), `tick_tock` (music ducks) on card 1, `ding_yes` on the ₹40,000 hold,
`paper_slide` for the sales patch, a single low `bwomp_no` (very soft) as the frame goes negative — no sting,
`pop` for the medallion.

**Transition.** Camera pulls back; card 2 shrinks into the first of three recap tiles.

## Scene 10 — Recap

- scene: Three tiles: the film strip (a period), the two-cut column (gross → net), Khata at the cinema door.
- duration: 17s
- voiceover: s10 (Line 10)
- learning: Retrieval summary.
- transition_out: tiles flip over to reveal three question cards (Scene 11)
- status: outline

**Visual/Motion.** `--scene-teal`. Three equal paper tiles, each lights (lifts 4 %) on its VO beat: (1) the
9-frame film strip with an `April` chip; (2) the blocks column with two cut lines at the two ruled result frames
(`Gross` and `Net` — accounting terms, allowed);
(3) Khata in the usher cap at the rope. Khata thumbs-up (page-arm) at the end. SFX: `pop` ×3, `rise_three`
(soft) at the end.

**Transition.** The tiles flip (scaleX) into three question cards — hand-authored, like L1 s08 → s09.

## Scene 11 — Your Turn

- scene: Three question cards with pictures; Khata holds up a "?" sign.
- duration: 22s
- voiceover: s11 (Line 11)
- learning: Retrieval practice; answers open Lesson 13.
- transition_out: cards slide aside; the P&L film strip runs to its last frame (Scene 12)
- status: outline

**Visual.** Minimal text — question numbers only; VO carries the words. Card 1: Meera carrying `₹3,000`
home (`wallet` icon) beside the film strip with a "?" between. Card 2: the `₹4,000` envelope with the
`May 5` chip beside the film strip, "?". Card 3: `Gross profit ₹ ?`. Each card lights on its number; the
1.8 s pauses after each question (pauses.json) hold perfectly still.

**Answers (for Lesson 13's "Last time"):** 1 — Drawings are not an expense: Meera took money home; it
didn't help run the stall. 2 — No: the advance isn't earned yet (it's a liability until May's catering).
3 — ₹40,000 (₹50,000 − ₹10,000).

**Sound.** `pop` per card. Description/pinned comment carries the written questions.

## Scene 12 — Next time

- scene: The film strip runs out on its last frame (Net profit ₹24,700); Khata lifts an instant camera; white flash; the "13" cover closes over it.
- duration: 6s
- voiceover: s12 (Line 12)
- learning: Tease L13's cold open (camera shutter, a polaroid slides out).
- transition_out: Khata cover with "13" swings open → end card (Scene 13)
- status: outline

**Visual/Motion.** `--scene-violet`. The strip's tail flaps free (one move, then still) on "the movie ends".
On "take the photo" Khata raises a paper instant camera (new asset) toward the lens; 2-frame white flash
at 40 %; the red cover with `13` slams shut over the frame. SFX: `projector` stop click, `shutter`,
`book_thump`.

## Scene 13 — End card

- scene: Series wordmark, "Up next" card (Lesson 13 · The Balance Sheet), two blank paper panels on the right for YouTube end-screen videos, Khata waving.
- duration: 12s
- voiceover: —
- transition_out: music tail, fade to black
- status: outline

**Visual/Motion.** L1 `s11` layout exactly: `--scene-violet` wall + table; series wordmark
(`window.SERIES_NAME()`, Shrikhand) top-left on a paper label; "Up next" card (saffron header) with a
developing polaroid of the stall + `Lesson 13` / `The Balance Sheet`; two clean paper panels at
(1450, 300) and (1450, 720) for end-screen elements; Khata (small, bottom-left) `wave`, on twos. The "13"
cover from Scene 12 swings open onto it. NO subscribe circle, NO credit line, no channel branding.
SFX: `cover_swing`; music `outro`.

## New kit assets

- **Aman** (character rig) + **samosa cart** — shared with the L3/L5/L7/L11/L14 checkpoints (build once).
- **Cinema doorway + velvet rope** (paper set piece, coral-friendly colours) and a tiny **usher cap + paper
  torch** for Khata (`handAnchor` prop), **ticket stub** prop.
- **Instant camera** (paper prop for Khata; reused in L13's cold open).
- **Trial-balance sheet** — 19-strip two-column sheet (from L11; reuse its component; ≥ 34 px Baloo 2).
- **`filmStrip` (kit, locked shape)** — 7 line frames + 2 ruled result frames (Gross / Net); result frames
  take a `₹` ticker and a **negative state** (ink minus sign, doubled rule). Used standing (card) in s9. The
  same object in s4, s7, s9, L13 s5, L14 s9.
- **Torn-paper vignette** of L1's night (irregular torn mask over a reduced render of L1 s01's set) — NOT
  the `polaroid`, which is the Balance Sheet only.
- **Paper-block column** — 50 thin `₹1,000` blocks with a group-lift helper and a 0.3 sliver (s5 → s6).
- **Pushpinned Drawings slip** (`wallet` icon + Meera's face tag + red pushpin) — s2 → s4 → s6 → s8.
- **Ravi Mama palm-out pose** with `₹3,000` bundle + `₹300` coin (`percent` icon).
- **Cost of goods sold** alias chip (shown once, s5).
- **Street dog** (L1 s01 prop) — reuse; one ear-flick pose.
- **Raju** face tag (if not already built in L8) and **Gopal** not needed here.
- Icons (bible §5.12): rent `key`, drawings `wallet`, stock `leaf`, electricity `zap`, interest `percent`,
  depreciation = scuff sticker; the ₹31 slice uses the **stall** icon.

## New SFX

- `ticket_tear` — "small paper cinema ticket being torn, quick, crisp, friendly".
- `paper_tear` — "a single sheet of paper torn slowly along one edge, soft, close-miked" (s6d vignette).

## Hindi swap list (non-term English on screen)

- none — the s8 signs are now `Revenue` / `Expenses` (terms); all other on-screen text is account names, ₹ numbers,
  dates and the lesson title.

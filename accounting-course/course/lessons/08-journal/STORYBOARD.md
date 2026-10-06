---
format: 1920x1080
fps: 30
duration: 6m13s
message: "The journal is the day-book: every transaction in date order — debit line, 'To' credit line, amounts, narration. One payment can need several lines, and repaying a loan or taking drawings is not an expense."
arc: Cold open (the tissue blows away) → Title → Last time (L7 answers) → Checkpoint 3 quick check (Aman) → The journal: what it is + T13 written live as the columns build → Worked T14 (interleaved T9) → Faded T15 → Compound T16 + misconception → Solo T17 + misconception (Equity card, third pocket) → Recap → Your Turn → Tease → End card
audience: adults with school maths, zero accounting (founder archetype)
lesson: 8
module: "M4 · Keeping the Books"
new_idea: "The journal (day-book, rojmel): write every transaction in date order as Dr line / 'To' Cr line / amounts / narration; compound entries."
builds_on: "Dr/Cr from the equation (L6) and golden-rule tags (L7); the Equity card with Capital | Profit pockets (L4)."
transactions: "T13 cash sales ₹22,000 · T14 Infotech ₹4,000 on credit · T15 salary ₹8,000 by UPI · T16 ₹3,300 to Ravi Mama (₹3,000 loan + ₹300 interest) · T17 drawings ₹3,000 — all Apr 30. Last time: T11. Checkpoint 3: Aman A2, A3, A5, A6, A7, A9."
review: "2026-10-06 pickups applied: A6 (third pocket `Drawings`), B5 (two-slot beat before T15/T17, 3-slot on T16, 2.0 s constant), C4 (Raju name chip), C10 (equation reason first, tag second), E-L8 (Aman cards, T13 live, `A/c` chip, narration rows icon-first, Scale HUD, icons `wallet`/`key`), F (shared `JournalCard`, icon-first tags, type floor, account-name registry)."
---

<!--
Visual language, cast and devices: ../../SERIES-BIBLE.md (§4 cast, §5 devices, §9 visual identity).
Kit: lessons/L01/assets/kit/RIG.md. VO text: vo-segments.json (SCRIPT.md mirrors it).
Every scene leaves through an OBJECT that becomes the next scene — no hard cuts.
Motion (locked): acting on 15 fps steps; no idle jitter/boil on holds, cards or text; camera pushes ≤ 8 %;
entrances are drop-and-place (back.out ≤ 1.2), never bouncy overshoot. Debit = #3D7FD9 (blue, left), credit = #E8862E (orange, right).
Khata is "it".

JOURNALCARD — shared `JournalCard` component (bible §5.9), born here and reused unchanged in L9 (answer cards), L10 (adjustments)
and L11 (T16 card). A wide white paper card (~1400 × 700) with a khata-red header strip that reads "Journal". Four columns,
ruled in thin ink: Date (≈170) · Particulars (≈690) · Dr ₹ (≈250, blue header strip) · Cr ₹ (≈250, orange header strip).
Each entry = 2–3 rows (≥ 60 px each) + a narration row in brackets = **icon + ≤ 2 words** (e.g. `( coins · Cash sales )`),
never a sentence. Debit account line ends in a small "Dr"; credit line is indented ~60 px and starts with "To". Account
names are exactly the §5.14 registry keys followed by `A/c`. Type floor (§5.13): **≥ 34 px Baloo 2** for every cell;
settled entries may dim to 70 %; never more than ~8 rows at full frame without a scroll. Text "writes on" with a
left-to-right clip reveal behind a pencil (Khata's or Meera's) — never typewriter flicker. Amounts tick up (number
ticker), never just appear. The `A/c` = account chip (small cream chip, `A/c` large + `account` small beneath) is tied to the
first `A/c` the first time it is written (s4b); afterwards `A/c` is plain text.
GOLDEN-RULE TAGS (bible §5.5, first used here) — on EVERY journal line. Small paper luggage tags tied by a thread to the
card's right margin, tinted by side (blue = debit line, orange = credit line). **Icon-first:** family medallion
(`Real` = `box` · `Personal` = `user` · `Nominal` = `receipt`) + rule glyph (`comes in` = arrow-down-into-box ·
`goes out` = arrow-up-out-of-box · `receiver` = open palm `hand` · `giver` = `hand-coins` · `expense` = coins-out ·
`income` = coins-in). The English words (`Real · comes in`) sit small under the icons and are swappable for the dub.
"WHICH TWO THINGS CHANGED?" (bible §5.3) — the kit constant, identical every time: freeze; cream veil 30 %; two empty
slots drop in at TOP CENTRE; **2.0 s** gap with `tick_tock`; `ding_yes` as the two jars/tags light and drop into the
slots. 3-slot variant on T16 (the third slot squeezes in on "Three of them!"). Used before T13, T15, T16, T17 are
named Dr/Cr (T14 is a repeat of T9 and skips it by design).
SCALE HUD (bible §5.1) — top-right corner, ~30 %, in every scene that records a transaction: s4b, s5, s6, s7, s8. It
tilts as the first effect lands and levels as the second lands (`power2.inOut`, no overshoot); never stays tipped.
Absent by design in s1–s4 (no entry yet), s9–s11.
EQUITY CARD (bible §5.2) — Meera's face-tag on the right pan unfolds into the Equity card: pockets `Capital` | `Profit`
(L4) and, from s8 here, a third pocket `Drawings` drawn DASHED, holding slips that LEFT, amount negative. Capital stays
₹50,000 all course; Profit does not move for drawings. Same component as L4 / L13 — build once.
ICONS (bible §5.12): rent = `key` · drawings = `wallet` · bank = `landmark` · salary = `user` (Raju) · interest = `percent`
· advance = `calendar-check` · stock = `leaf` · equipment = `shopping-cart`. `house` is retired (was rent AND drawings here).
-->

## Scene 1 — Five things before lunch (cold open)

- scene: Apr 30 morning rush at the stall. Five tiny vignettes pop up as Meera does each thing; she scribbles them on a tissue; a gust steals it.
- duration: 25s
- voiceover: "April thirtieth. Five things happen before lunch… She grabs a tissue… Gone. So how will Meera remember any of this… a year from now?" (Line 1 · s01a–s01c)
- learning: Create the need for a written, dated record (pays off L7's tease: "five things before lunch… a tissue").
- transition_in: fade from black
- transition_out: the tissue rushes back on the wind and slaps flat across the lens → cream paper fills frame → slides away right to reveal the title wall (s01t)
- status: outline

**Visual.** `--scene-saffron` wall, stall (`K.stall`, no face) centre-left, Meera behind the counter, kettle steaming.
Calendar strip along the top with **30** highlighted (numbers only, month label small). As the VO lists the five events,
five small white cards drop into a row above the stall, each a picture + one number: banknote stack `₹22,000` ·
`receipt` icon with Priya's face tag `₹4,000` · Raju (L4 rig) holding a `smartphone` with a UPI tick `₹8,000` ·
Ravi Mama's umbrella + notes `₹3,300` · `wallet` icon + notes `₹3,000`. Meera pulls a tissue from a box on the counter
and the pencil from her bun; the five cards shrink into scribbles on the tissue.

**Motion.** Cards drop-and-place on each VO clause (stagger by word anchors `@sales`, `@bill`, `@salary`, `@loan`,
`@herself`). Meera acts on 15 fps steps: counting notes, waving to Priya, tapping the phone, handing notes left, pocketing.
Gust (silent beat, s01b gap 1.4 s): three paper wind-lines streak in from the left, the tissue lifts out of her hand on a
smooth arc and tumbles away to the upper right; Meera's hand stays reaching, expression `worried`. On "Gone." hold still
(≥ 0.5 s). On "a year from now?" the calendar strip's month label swaps to next year's (one page turn forward, no
flip back — §5.7), Meera `puzzled` head tilt.

**Sound.** `day_street` ambience (low), `kettle_bubble`. `note_rustle` on the sales count, `phone_buzz` on UPI,
`paper_slide` per card. Gust: **new** `wind_gust`; tissue flutter = `paper_whoosh`. Music pickup after "Gone."

**Transition.** The tissue comes rushing back from the distance on the wind and slaps flat across the lens; the cream
tissue fills frame for 3 frames, then slides off to the right revealing the violet title wall.

## Scene 1t — Title sting

- scene: Khata's red cover drops onto the table, "Lesson 8 · The Journal" in gold, swings open.
- duration: 4.6s (fixed, no VO, `intro_sting` music)
- voiceover: —
- transition_out: the cover swings open; the right page already shows Scene 2's first question card; camera pushes into the page (≤ 8 % then the page fills frame on the cut, as in L1's s01t)
- status: outline

**Visual/Motion.** Reuse L1 `s01t` shape exactly; only `LESSON = "Lesson 8"`, `TITLE = "The Journal"` change.
SFX `book_thump` + `cover_swing`.

## Scene 2 — Last time (L7 Your Turn answers)

- scene: Three question cards in a row; each answer lands as golden-rule tags or a family sort.
- duration: 26s
- voiceover: "First, last time's answers… Nominal. It's an expense." (Line 2 · s02a–s02f)
- learning: Spaced retrieval of the golden rules (needed for today's tags).
- pause_beats: 1.4 s, 1.2 s, 1.2 s (viewer answers before each reveal)
- transition_out: the three cards flip face-down and slide into one stack; the top card's back shows Aman's samosa cart (Scene 3)
- status: outline

**Visual.** `--scene-teal`. Card 1: catering slip (`calendar-check` icon reading `May 5`) + `₹4,000` coins, two short
journal lines `Cash A/c` / `Advance from customer A/c` with empty tag slots. Card 2: a bank medallion (`landmark` icon)
above two bins labelled `Real` and `Personal`. Card 3: `key` icon (rent) + `₹5,000` above three small pots `Personal` ·
`Real` · `Nominal`.

**Motion.** Each card lifts slightly when its question is read (the others dim to 70 %). Gap → answer: Card 1 — a blue
icon-first tag (`box` + arrow-in · small `Real · comes in`) ties onto the Cash line, then an orange tag (`user` +
`hand-coins` · small `Personal · giver`) onto Advance from customer. Card 2 — the bank medallion drops into `Personal`.
Card 3 — the `key` icon drops into `Nominal`. Each landing: small settle, no bounce.

**Sound.** `tick_tock` (trimmed to the gap length) under each pause; `ding_yes` on each answer; `pop` per tag.

**Transition.** Cards flip face-down (scaleX squeeze), stack centre; the top back is a sky-blue card printed with Aman's
cart — it grows to fill frame as Scene 3's background.

## Scene 3 — Checkpoint 3 quick check (Aman's Samosa Cart)

- scene: Aman beside his cart; six small cards (id chip + picture + ₹) land in a 3 × 2 grid while the viewer checks; then A7 and A9 open full-size as journal cards with their tags.
- duration: 23s
- voiceover: "And Aman's checkpoint. Here are all six… Two of them trip people up… Personal, the giver." (Line 3 · s03a–s03b)
- learning: Transfer check. L7 already revealed the full solution at its end (s12b–c), so this is a fast visual re-check, not a second walk-through; VO spends its time on the two entries most people miss (Personal receiver on debit; an advance is a Personal giver, not income). Only the two discussed entries are shown in journal format — and in the `… Dr` / `To …` format taught in s4b, never a `Cr …` shorthand.
- pause_beats: 3.2 s while the six cards land (viewers can pause to compare)
- transition_out: the cards fan into a stack; Meera's lost tissue drifts down from the top of frame and lands on it; camera follows the tissue down to Khata (Scene 4)
- status: outline

**Visual.** `--scene-sky` (other business = other colour). Aman (kit, shared with L3/L5/L7/L11/L14) waves from the left
beside his samosa cart; the grid fills the right two-thirds. **Default card = id chip + one picture + ₹ only** (no
Dr/Cr text, no tags — the viewer compares against their own answer):

| Card | Picture | ₹ |
|---|---|---|
| A2 | `landmark` + notes | 10,000 |
| A3 | cart + fryer (`shopping-cart`) | 18,000 |
| A5 | samosa plate + coins | 9,000 |
| A6 | `key` | 2,000 |
| A7 | school building + tab slip | 1,500 |
| A9 | `calendar-check` + coins | 1,000 |

On "@canteen" the A7 card opens into a full-size `JournalCard` entry (others dim to 70 %):
`School canteen A/c … Dr · 1,500` (blue tag `user` + `hand` · `Personal · receiver`) / `To Sales A/c · 1,500` (orange tag
`receipt` + coins-in · `Nominal · income`) / `( samosa · School canteen )`. On "@advance" it folds back and A9 opens:
`Cash A/c … Dr · 1,000` (blue tag `box` + arrow-in · `Real · comes in`) / `To Advance from customer A/c · 1,000` (orange
tag `user` + `hand-coins` · `Personal · giver`) / `( calendar-check · Birthday advance )`. Account names per §5.14
(Aman: `School canteen`, `Advance from customer`, `Sales`).

**Motion.** Cards drop-and-place one after another through s03a's 3.2 s gap (0.45 s stagger). A7 / A9 open by a
card-grow (power3.out, 0.5 s) to ~1400 px wide, centred; the tag on the discussed line gets a cream highlight strip on
"receiver" / "giver". On the closing "Personal, the giver" Aman gives a thumbs-up (15 fps).

**Sound.** `paper_slide` per card (soft), `tink_low` on A7's debit tag, `tink_high` on A9's credit tag, `ding_yes` at the end.

**Transition.** Cards fan together into one stack. From the top of frame, Meera's tissue (Scene 1) drifts down and lands
on the stack; the camera follows it down as the stack slides out — Khata catches the tissue (Scene 4).

## Scene 4 — The journal (what it is) + "which two things changed?"

- scene: Khata catches the scribbled tissue, frowns at the mess, opens; a blank journal card slides out of its pages. Khata says it will write the first one straight in — freeze, two slots, the galla and the Sales jar light.
- duration: 34s
- voiceover: "Back to Meera's tissue… That book is called the journal… the rojmel. Khata opens to a fresh journal page — and writes the first one straight in… Which two things changed?" (Line 4 · s04a–s04b)
- learning: The journal's job (date order, one book). Then the kit beat before any Dr/Cr is named (§6.4).
- pause_beats: 2.0 s "which two things changed?" (kit constant)
- transition_out: the veil lifts; the two lit items slide down beside the blank card and Khata's pencil touches row 1 (Scene 4b)
- status: outline

**Visual.** `--scene-teal`. Khata (`khataRig`, centre, s ≈ 0.8) holding the tissue — scribbles visible, no legible text.
On "the journal" Khata opens and the blank `JournalCard` slides up out of its pages to fill the upper two-thirds; header
strip reads `Journal`; the four columns are ruled but **unlabelled** — no grey placeholders, no headers yet. On "the
rojmel" a small label chip `rojmel` tucks under the header (one word, stays in the Hinglish cut). On s04b the galla
(cash) and the `Sales` jar sit lower-left; on "Which two things changed?" the frame freezes under the cream veil and two
empty slots drop in at top centre.

**Motion.** Khata peers at the tissue (`expr` `wow`), leans its head down a little, and tosses the tissue behind its
back. Open (`open`, 0.55 s), card slides up (power3.out). Device 3 exactly per kit: veil 30 %, slots drop-and-place,
`tick_tock` for 2.0 s, `ding_yes` as the galla and the Sales jar light (cream highlight strip) and drop into the slots.

**Sound.** `cover_swing` on open, `paper_slide` for the card, `pop` on the `rojmel` chip, `tick_tock` + `ding_yes`.

**Transition.** The veil lifts; the two lit items slide down to sit beside the card (galla left, Sales jar right); Khata's
pencil comes down onto row 1 — Scene 4b writes.

## Scene 4b — T13 written live; the columns label themselves after

- scene: Khata writes T13 into the blank card, element by element, on the VO words; each column head labels itself the moment its first cell is written. The `A/c` = account chip ties on at the first "A/c". Tags tie on as each line finishes. Scale HUD tilts and levels.
- duration: 48s
- voiceover: "Cash went up. And Sales went up. Cash grows — an asset, home on the left — so, debit… Now watch the columns… That's the narration." (Line 4 · s04c–s04d)
- learning: Dr/Cr by the equation first (asset grows → left; equity grows → right), tag second (C10). Then the anatomy: Date · Particulars (Dr line; indented "To" line) · Dr ₹ · Cr ₹ · narration — learned from a real entry, not placeholders.
- transition_out: the finished entry dims to 70 % and the card scrolls up one entry; Priya leans in at the right edge (Scene 5)
- status: outline

**Visual.** `--scene-saffron` (money beat; curved wipe from teal on "Cash went up"). Shared `JournalCard` upper two-thirds;
galla and `Sales` jar lower-left; **Scale HUD top-right**. s04c: on "an asset, home on the left" the galla slides onto
the HUD's left pan (tilts); on "equity, home on the right" the Sales jar's coins drop onto the right pan (levels). A
blue tag (`box` + arrow-in · `Real · comes in`) and an orange tag (`receipt` + coins-in · `Nominal · income`) appear
loose beside the card, waiting for their lines. s04d — the card fills, exact on-screen text, in this order:

| On VO | Cell written | Column head labels itself |
|---|---|---|
| "@thirtieth" | `Apr 30` | `Date` |
| "Cash." | `Cash` | `Particulars` |
| "A-slash-c" | `A/c` appended → `Cash A/c` + the **`A/c` = account chip** ties to it | — |
| "small Dr" | `… Dr` at the line's end | — |
| "Twenty-two thousand" | `22,000` ticks up in the blue money cell | `Dr ₹` (blue strip) |
| "pushed in a little" | row 2 slides 60 px right | — |
| "the word To" / "To Sales" | `To Sales A/c` | — |
| "twenty-two thousand … credit column" | `22,000` ticks up in the orange cell | `Cr ₹` (orange strip) |
| "a short note in brackets" | `( coins · Cash sales )` | — |

Tags tie onto their lines as each line's amount lands. Final entry (hold ≥ 1.5 s before the seam):

| Date | Particulars | Dr ₹ | Cr ₹ | Tag |
|---|---|---|---|---|
| Apr 30 | Cash A/c … Dr | 22,000 | | `box` ↓ · `Real · comes in` (blue) |
| | To Sales A/c | | 22,000 | `receipt` coins-in · `Nominal · income` (orange) |
| | ( coins · Cash sales ) | | | |

**Motion.** Khata's pencil writes each element on its VO word (clip reveal, 0.3–0.5 s each); amounts tick 0 → 22,000.
Each column head drops-and-places onto its strip the frame after its first cell is complete (the label is a
consequence, not a promise). The `A/c` chip ties on with a thread (0.4 s) and stays for the rest of the scene. Khata's
arm points at each column as it labels itself (arm angle per column, 15 fps). The indent is shown by row 2 sliding
60 px right as `To` drops in. Hold the finished entry still ≥ 1.5 s.

**Sound.** `quill_scratch` (short, low) under each write-on; `pop` per column head and on the `A/c` chip; `tink_low` when
the Dr amount lands, `tink_high` when the Cr amount lands; `pop` per tag; `scale_tilt` / `scale_settle` on the HUD.

**Transition.** The finished entry dims to 70 % and the card scrolls up one entry so the next blank rows sit centre;
Priya leans in at the right edge holding an empty tumbler — Scene 5.

## Scene 5 — Worked: T14 (interleaved repeat of T9)

- scene: Priya's tab. The Infotech entry appears with `?` chips in both amount cells through the gap; on "Debit." the ₹4,000 ticks into the Dr cell; a ghost of the Apr 16 T9 entry slides over to show it is the same shape.
- duration: 17s
- voiceover: "Same morning, Meera bills Infotech… Debit or credit, for Infotech?… Debit. Infotech owes the stall now — an asset growing, on the left. Personal, the receiver… Exactly like April sixteenth." (Line 5 · s05a–s05b)
- learning: Repetition of a known transaction (T9) in the new format; equation reason (receivable = asset grows → left) then the tag.
- pause_beats: 1.6 s "debit or credit, for Infotech?" (a retrieval question, not the two-slot beat — T14 is a repeat, by design)
- transition_out: the page scrolls up a row; Meera's hand reaches in from the left and takes the pencil from Khata (Scene 6)
- status: outline

**Visual.** `--scene-saffron`. Shared `JournalCard`; **Scale HUD top-right**. Rows written (exact on-screen text):

| Date | Particulars | Dr ₹ | Cr ₹ | Tag |
|---|---|---|---|---|
| Apr 30 | Infotech A/c … Dr | 4,000 | | `user` + `hand` · `Personal · receiver` (blue) |
| | To Sales A/c | | 4,000 | `receipt` coins-in · `Nominal · income` (orange) |
| | ( receipt · Infotech ) | | | |

Priya (kit) leans in at the right edge holding an empty tumbler (15 fps wave). Through the 1.6 s gap the Infotech line
shows a small `?` chip in **both** amount cells (blue cell / orange cell). On "Debit." the `4,000` ticks into the Dr cell
and the HUD tilts left (Infotech's tag joins the asset pan); on "To Sales, credit" the Cr cell ticks and the HUD levels.
On "Exactly like April sixteenth" a faded paper ghost of the T9 entry (`Apr 16 · Infotech A/c … Dr 6,000 / To Sales A/c
6,000`) slides over the T14 rows, the two line up exactly, then the ghost slides away.

**Motion.** Khata writes (clip reveal); `?` chips swap to tickers with a 2-step settle. Ghost: slide in 0.5 s, hold 0.8 s,
slide out 0.4 s. Priya still except the one wave.

**Sound.** `quill_scratch` (short); `tink_low` / `tink_high` on the two amounts; `pop` per tag; `glass_clink` for Priya's
tumbler; `paper_slide` for the ghost.

**Transition.** The card scrolls up one entry; from the left edge Meera's hand reaches in and takes the pencil from
Khata — the camera follows the pencil into Scene 6.

## Scene 6 — Faded: T15 salary by UPI (Meera writes; you finish the credit line)

- scene: Raju (name chip) gets a UPI ping. "Which two things changed?" — Salary and Bank light. Meera writes the Salary debit line, then stops at a blank indented "To ____" line.
- duration: 32s
- voiceover: "Now Meera writes one. Raju's salary… Which two things changed?… Salary went up. And Bank went down… Can you finish it for her?… To Bank, eight thousand. The money left the bank — an asset shrank, so it goes on the right… So, credit." (Line 6 · s06a–s06c)
- learning: Faded practice — the viewer supplies the credit line and its tag. Two-slot beat before the entry (B5); Raju gets a face and a name on screen (C4).
- pause_beats: 2.0 s "which two things changed?" (kit constant); 2.6 s (viewer completes the credit line)
- transition_out: the bank medallion on the new tag rolls off the card's edge; Ravi Mama's umbrella handle hooks it from off-frame and pulls the camera right (Scene 7)
- status: outline

**Visual.** `--scene-teal`. Meera at the counter, shared `JournalCard` on the counter angled toward camera (front-on, no
3D); **Scale HUD top-right**. Raju (L4 rig) at the right with a cream **name chip `Raju`** above his head (1.5 s on his
first frame, then it tucks away); his phone shows a UPI tick and `₹8,000` (`smartphone` icon + number). Two-slot beat
on "Which two things changed?": freeze, veil, two slots top centre, `tick_tock` 2.0 s; `ding_yes` as the `Salary` jar
(`user` icon) and the `Bank` medallion (`landmark`) light and drop into the slots. Rows:
`Apr 30 · Salary A/c … Dr · 8,000` with blue tag (`receipt` + coins-out · `Nominal · expense`); then `To ________`
indented, Cr cell blank (dotted outline). Answer: `To Bank A/c · 8,000` with orange tag (`user` + `hand-coins` ·
`Personal · giver`). Narration row: `( user · Salary )`.

**Motion.** Meera writes the debit line (15 fps acting, pencil write-on); HUD tilts as `8,000` lands on the Dr side. On
"she stops" she lifts the pencil, looks at camera (`thinking`), small head tilt; she holds the pose through the 2.6 s
gap — completely still apart from one blink. On "To Bank" she writes it in; the HUD levels on "goes on the right"; tag
ties on; Meera `happy`.

**Sound.** `phone_buzz` on the UPI ping; `pop` on the name chip; `tick_tock` + `ding_yes` (device); `quill_scratch`
(short) per write-on; soft `tick_tock` through the 2.6 s gap; `ding_yes` + `tink_high` on the answer.

**Transition.** The bank medallion on the orange tag pops loose and rolls off the right edge of the card; Ravi Mama's
umbrella handle hooks in from off-frame, catches it, and pulls the frame right (smooth whip, 0.4 s) into Scene 7.

## Scene 7 — T16: the compound entry + misconception (loan repayment ≠ expense)

- scene: Ravi Mama receives ₹3,300. "Which things changed?" — a surprise third slot. Khata writes a 3-line entry. Then the misconception: Meera's thought bubble drops all ₹3,300 into the Interest jar → ✗ stamp → the correct split.
- duration: 55s
- voiceover: "Now a tricky one… Three of them!… That's called a compound entry… Here's where a lot of people slip… It shrinks her debt — not her profit." (Line 7 · s07a–s07d)
- learning: Compound entry = one transaction, more than two accounts, Dr total = Cr total. Only interest is an expense; the principal repaid reduces a liability.
- misconception: "Repaying a loan is an expense."
- pause_beats: 2.0 s "which things changed?" (kit constant, 3-slot variant)
- transition_out: the ✗ stamp lifts; the galla underneath it pops its lid open (Scene 8)
- status: outline

**Visual.** `--scene-teal` until s07c, then a curved colour wipe to `--scene-coral` for the misconception. Ravi Mama
(umbrella, proud) at left, holding his face-tag `₹30,000`. Meera hands over three `₹1,000` notes and three `₹100` notes
(`K.note`). Device 3 top centre; shared `JournalCard` upper-right; **Scale HUD top-right** (beside the slots, smaller
while the slots are up). Rows written:

| Date | Particulars | Dr ₹ | Cr ₹ | Tag |
|---|---|---|---|---|
| Apr 30 | Loan from Ravi Mama A/c … Dr | 3,000 | | `user` + `hand` · `Personal · receiver` (blue) |
| | Interest A/c … Dr | 300 | | `receipt` + coins-out · `Nominal · expense` (blue) |
| | To Cash A/c | | 3,300 | `box` ↑ · `Real · goes out` (orange) |
| | ( percent · Loan + interest ) | | | |

Then a total rule under both money columns: `3,300` | `3,300`, and a label chip `Compound entry` lands beside the brace
that groups the two debit rows.
Misconception (coral): Meera's thought bubble — all six notes drop into the `Interest` jar (`percent` icon) → red ✗
stamp (icon). Correct version: only the three ₹100 notes drop into the `Interest` jar; the ₹1,000 notes fly back onto
Ravi Mama's face-tag, which ticks down `₹30,000 → ₹27,000`.

**Motion.** Device 3 with the 3-slot variant: two slots drop in as usual, `tick_tock` 2.0 s, then a third slot squeezes
in on "Three of them!" (drop-and-place, no bounce); Ravi Mama's tag, the Interest jar and the galla drop into the slots.
Khata writes row by row on the VO words; amounts tick; the HUD tilts on the first Dr amount and levels when `3,300`
lands. On "the two sides still match" both totals tick up together and land at the same frame. Stamp: scale 1.25 → 1.0
`power3.out` (no shake). On "It shrinks her debt" the tag's ticker counts down; on "not her profit" a small profit
gauge (`K.gauge`) beside the jar stays perfectly still while the ₹1,000 notes pass it.

**Sound.** `tick_tock` + `ding_yes` ×3 (third ding a step higher). `quill_scratch` (short) per row, `tink_low` ×2 (Dr
amounts), `tink_high` (Cr amount). `stamp_thunk` on the ✗. `paper_slide` as the ₹100 notes drop into the jar;
`paper_whoosh` as the ₹1,000 notes fly back.

**Transition.** The stamp lifts off the thought bubble; the bubble pops, and where it was, the galla's lid pops open —
we're at the galla for Scene 8.

## Scene 8 — Solo: T17 drawings + misconception (drawings ≠ expense) — the Equity card grows a third pocket

- scene: Meera takes ₹3,000 from the galla for home. "Which two things changed?" — the galla lights; the second slot stays a `?`. Blank two-line entry + 3-2-1 countdown. Reveal with tags, hold. Misconception: drawings into the Expense jar → ✗ → the Equity card unfolds and grows a dashed third pocket `Drawings`; the ₹3,000 slip lands in it. Capital and Profit do not move.
- duration: 49s
- voiceover: "Last one's yours… Which two things changed?… Cash went down. The other one is new — yours to name… Debit Drawings, three thousand… And here's the second slip… Drawings sit on the left, like expenses — but in their own pocket." (Line 8 · s08a–s08e)
- learning: Solo journal entry; drawings = a third pocket of equity (negative, dashed), never an expense and never a dip in Capital or Profit (A6); the L6 derivation echoed — like `−Expenses`, `−Drawings` crosses to the left, into its own pocket.
- misconception: "Drawings are an expense."
- pause_beats: 2.0 s "which two things changed?" (kit constant; second slot stays `?` — it is the solo's question); 3.2 s countdown (solo)
- transition_out: camera pulls back from the journal card; the whole page shrinks into the first of three recap tiles (Scene 9)
- status: outline

**Visual.** `--scene-teal`, coral wipe from s08d. Meera at the galla folds three `₹1,000` notes into her own purse
(`wallet` icon on a strap — the drawings icon everywhere, §5.12). **Scale HUD top-right.** Two-slot beat: freeze, veil,
two slots; on `ding_yes` the galla lights and drops into slot 1; slot 2 shows a cream `?` chip and stays. Shared
`JournalCard`: `Apr 30 · ________ A/c … Dr · ____` / `To ________ A/c · ____` with dotted cells; countdown ring (L1
`s06` device) beside it. Reveal (all at the ring's end):

| Date | Particulars | Dr ₹ | Cr ₹ | Tag |
|---|---|---|---|---|
| Apr 30 | Drawings A/c … Dr | 3,000 | | `user` + `hand` · `Personal · receiver` (blue) |
| | To Cash A/c | | 3,000 | `box` ↑ · `Real · goes out` (orange) |
| | ( wallet · Drawings ) | | | |

**Hold ≥ 1.5 s** on the revealed entry (dead still) before the coral wipe. Misconception (coral): thought bubble — the
notes drop into a generic `Expense` jar (`receipt` icon; a generic Expense jar is permitted before L10, §5.14) → ✗
stamp. Then, on "Meera and Meera's Chai are not the same", the Scale HUD grows to centre and Meera's face-tag on the
right pan unfolds into the **Equity card** (L4 component): pockets `Capital ₹50,000` | `Profit` (no number; it holds the
April slips). On "a third pocket" a **dashed** pocket `Drawings` (`wallet` icon) unfolds at the card's left edge; the
₹3,000 slip, drawn as a slip with a minus (`−3,000`), slides out of the galla and into the dashed pocket. `Capital
₹50,000` is still; `Profit` is still — the stillness is the point. On "sit on the left, like expenses" a small echo of
L6's derivation: a `−Drawings` chip crosses the scale's post from right to left and flips sign to `Drawings` on the
left (the same move L6 makes for `−Expenses`), landing beside the dashed pocket. **No L1 split stage** — the card
carries the whole idea.

**Motion.** Device 3 per kit (2.0 s). Countdown ring drains clockwise over 3 s; answer cells write on together at the
ring's end; HUD tilts on `3,000` Dr and levels on `3,000` Cr. Stamp 1.25 → 1.0, no shake. Equity card unfold: 0.6 s
`power3.out`; dashed pocket unfolds 0.4 s; slip travels on a smooth arc (0.7 s). The chip crossing: 0.8 s, sign flip at
the post. Hold ≥ 1.5 s on the finished card (Capital · Profit · Drawings) before the pull-back.

**Sound.** `galla_clack` (lid), `note_rustle`, `tick_tock` + `ding_yes` (device), `tick_tock` (3 s) + `ding_yes` on
reveal, `tink_low` / `tink_high` on the two amounts. `stamp_thunk`. `paper_whoosh` on the slip's arc; `paper_slide` as
the dashed pocket unfolds; `pop` on the sign flip.

**Transition.** The camera pulls back (smooth, the frame shrinks to one-third) — the journal page with all five April-30
entries becomes recap tile 1.

## Scene 9 — Recap

- scene: Three tiles: the journal page (dates in order), the compound entry with matching totals, and the ✗ over the Expense jar with Ravi Mama's face-tag and the dashed Drawings pocket beside it.
- duration: 12s
- voiceover: "So — the journal is the day-book… is not an expense." (Line 9 · s09)
- learning: Retrieval summary.
- transition_out: tiles flip over to reveal three question cards (Scene 10)
- status: outline

**Visual.** `--scene-leaf`. Tile labels are **icons only** (dub swap list — the former `Date order` · `Both sides match` ·
`Not expenses` are gone): tile 1 = `calendar` icon with `1 → 30`; tile 2 = `3,300 = 3,300` (numbers only); tile 3 = ✗
stamp over the `receipt` icon, with the `percent` tag and the `wallet` pocket beside it.

**Motion.** Each tile lifts as the VO reaches it (same as L1 Scene 8); Khata gives a book-flap thumbs-up at the end.

**Sound.** `rise_three` motif across the three tiles (one note per tile).

**Transition.** The tiles flip (scaleX squeeze) and come back as Scene 10's question cards.

## Scene 10 — Your Turn

- scene: Three question cards with pictures; Khata holds a "?" sign; "answers next lesson" as a calendar-flip icon.
- duration: 23s
- voiceover: "Your turn. Three quick ones… Answers at the start of the next lesson." (Line 10 · s10)
- learning: Retrieval practice; answers open Lesson 9.
- transition_out: the cards tuck into Khata's pages; Khata closes (Scene 11)
- status: outline

**Visual.** `--scene-violet`. Card 1: Ravi Mama's bundle split `₹3,000 + ₹300` with a `?`. Card 2: phone with UPI tick
`₹4,000`, Priya's face tag, `Apr 25`, two blank `JournalCard` lines beneath (blue/orange cells). Card 3: Meera's purse
(`wallet`) `₹3,000` next to the `Expense` jar (`receipt`) with a `?`. Question numbers only; the VO carries the words.
Description/pinned comment carries the written questions.

**Answers (for Lesson 9's "Last time" — must match LESSON-PLANS.md):** 1 — ₹3,000 just repays the loan; only the ₹300
interest is an expense. 2 — `Bank A/c … Dr 4,000 / To Infotech A/c 4,000`. 3 — No: drawings are not an expense (they
sit in their own Equity pocket).

**Motion.** Cards lift in turn with the VO; the 1.8 s pauses after each question hold still.

**Sound.** `pop` per card, `bell_ring` softly on "Your turn".

## Scene 11 — Next time

- scene: Meera stares at the galla, then at the journal; the cash amounts glow on scattered rows across several pages — the answer is in pieces. Khata's "9" cover slams shut.
- duration: 10s
- voiceover: "Next time, Meera has one simple question… but the answer is in pieces." (Line 11 · s11)
- learning: Set up L9's cold open (hunting for the cash total in the journal).
- transition_out: Khata's cover with a gold "9" closes over the frame → end card (Scene 12)
- status: outline

**Visual.** `--scene-teal`. Galla centre with a `₹ ?` chip; the journal fans out into four pages behind it. Cash amounts
on different rows highlight one by one: `50,000` · `36,000` · `18,000` · `5,000` · `22,000` · `3,300` (each a cream
highlight strip on a different page). The pages drift slightly apart (smooth, ≤ 40 px) on "in pieces".

**Motion.** Meera `thinking` → `puzzled` (15 fps). Highlights step in on twos. Freeze for 0.5 s, then the cover closes.

**Sound.** `note_rustle` (soft), `paper_slide`; `book_thump` on the cover.

**Transition.** Khata's red cover with a gold **9** swings shut over the frame → Scene 12 opens it.

## Scene 12 — End card

- scene: Series end card (L1 `s11` shape, fixed 12 s, no VO).
- duration: 12s
- voiceover: —
- status: outline

**Visual/Motion.** The "9" cover swings open onto the violet end card: series wordmark (Shrikhand) top-left; `Up next`
card — `Lesson 9` / `The Ledger` with a little stack of small khata books (`K.smallBook` ×3); two blank paper panels on
the right for YouTube end-screen videos; Khata waving bottom-left. **No subscribe circle, no credit line, no channel
branding.** `outro` music.

---

## New kit assets

- **`JournalCard`** (shared component, bible §5.9; reused unchanged L9–L11): white card, khata-red header strip, four
  ruled columns (Date · Particulars · Dr ₹ blue strip · Cr ₹ orange strip), row write-on helper, indented "To" rows,
  narration row = icon + ≤ 2 words, a tag slot per line, column heads that can label themselves late (s4b), ≥ 34 px
  Baloo 2. Could be built on `K.card` + `K.rows`.
- **`A/c` = account chip** — cream chip, `A/c` large + `account` small, tied by thread to the first `A/c` written (s4b).
- **Golden-rule tag** (icon-first, bible §5.5): paper luggage tag with thread + hole, blue (Dr) / orange (Cr) tint;
  family medallion (`box` / `user` / `receipt`) + rule glyph (arrow-in, arrow-out, `hand`, `hand-coins`, coins-out,
  coins-in); small swappable English words.
- **"Which two things changed?" device** — the kit constant (veil 30 %, two slots top centre, 2.0 s), plus the
  **3-slot variant** (third slot squeezes in) and a **`?` slot** state (s8).
- **Scale HUD** (`scaleRig`, corner variant) — grows to centre in s8.
- **Equity card with three pockets** (shared with L4 and L13): `Capital` | `Profit` | dashed `Drawings` (`wallet`);
  Meera's face-tag unfolds into it; negative slips for the Drawings pocket. If L4 built the two-pocket card, extend it.
- **`−Drawings` chip** that crosses the scale's post and flips sign (same helper as L6's `−Expenses` chip).
- **Aman** (character) + **samosa cart** (shared with L3/L5/L7/L11/L14 checkpoints) — reuse.
- **Raju** — reuse the L4 rig; **name chip** (`Raju`) helper for first on-screen appearances.
- **Tissue** (soft cream square with scribbles; flutter pose) + **tissue box**; **wind lines** (three paper streaks).
- **Purse** for Meera (strap + `wallet` icon).
- **Jars**: `Interest` (`percent`), `Salary` (`user`), `Sales`, generic `Expense` (`receipt`; permitted before L10).
- **Icons:** `landmark`, `wallet`, `key`, `percent`, `user`, `box`, `receipt`, `hand`, `hand-coins`, `calendar-check`,
  `shopping-cart`, `smartphone`, `calendar`, `pencil` (if the pencil prop isn't drawn) — add to `icons.js` from
  lucide-static.

## New SFX

- `wind_gust` — short soft gust of wind, papery, ~1.2 s.
- `pencil_write` — short pencil on paper (optional; `quill_scratch` trimmed short is the fallback).
- `scale_tilt` / `scale_settle` — if the shared `scaleRig` doesn't already ship them (soft wood creak / settle).

## Addendum (2026-10-06) — Three-question checklist

From Scene 4, a docked chip trio (top-left, ~30 % size) appears on "three questions": **① two empty slots** (which accounts changed? — the "which two things changed?" device, now step 1) · **② a family medallion** (`box` / `user` / `receipt`: what kind?) · **③ an `L | R` toggle** (which side?). On every later entry in L8 (T14–T17) the three chips tick in order as the VO answers them. Reused in L10's adjustments and every checkpoint from L11. Source: Frappe ERPNext course, Module 3 part 2, "Steps to write an entry".

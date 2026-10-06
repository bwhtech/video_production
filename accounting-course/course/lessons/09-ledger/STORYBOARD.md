---
format: 1920x1080
fps: 30
duration: 5m37s
message: "The ledger gives every account its own khata page. Posting copies each journal line there — debits left, credits right — and balancing turns a page into one number that sits on the account's home side."
arc: Cold open (hunting cash in the journal) → Title → Last time (L8 answers, JournalCard + tags) → One book per account (Khata callback, one line) → Posting (T1 slow, T2–T17 montage) → Worked: Cash balanced + carried down (T16 as two rows; matches the galla) → Faded: Gopal + misconception → Solo: Infotech, staged c/d → b/d → hold, then the home-side pattern → Recap → Your Turn (one large card at a time) → Tease (freeze before the popper fires) → End card
audience: adults with school maths, zero accounting (founder archetype)
lesson: 9
module: "M4 · Keeping the Books"
new_idea: "The ledger: one T-account page per account; posting journal lines to it; balancing and carrying down a balance."
builds_on: "The journal and the shared JournalCard (L8); left/right pages and home sides (L6); account jars (L2 on); the Equity card with three pockets (L8 s8)."
transactions: "Post T1–T17. Balances shown (Apr 30, before L10's adjustments): Cash ₹50,700 Dr · Gopal Dairy ₹3,000 Cr · Infotech ₹6,000 Dr. Your Turn: Sales ₹50,000 Cr · Bank ₹11,000 Dr."
review: "2026-10-06 pickups applied: C6 (no second name reveal; Khata = it), E-L9 (Cash page: T16 as two rows, type floor, c/d ↓ / b/d ↑ glyphs; s2 answers in JournalCard format with tags; home-side generalisation moved s6 → s7; s7 staged with a hold; Your Turn cards one at a time; s1 chips cream; tease aligned with L10 s1), F (Scale HUD s5–s7, account-name registry §5.14, `One page each` label → icon)."
---

<!--
Visual language, cast and devices: ../../SERIES-BIBLE.md (§4 cast, §5 devices, §9 visual identity).
Kit: lessons/L01/assets/kit/RIG.md. VO text: vo-segments.json (SCRIPT.md mirrors it). JournalCard: the shared component
born in L8 (bible §5.9) — used here unchanged for the s2 answer cards and the s4 journal; tags icon-first (§5.5).
Every scene leaves through an OBJECT that becomes the next scene — no hard cuts.
Motion (locked): acting on 15 fps steps; no idle jitter/boil on holds, cards or text; camera pushes ≤ 8 %;
entrances are drop-and-place (back.out ≤ 1.2). Debit = #3D7FD9 (blue, left page), credit = #E8862E (orange, right page).
Khata is "it". Khata's name was explained once, in L7 — s3 here is a one-line callback, not a reveal.

THE LEDGER PAGE (T-account, new shared device for L9–L11): an open mini-Khata (red cloth edge, cream pages). Account name
on a paper label across the spine top — exactly the §5.14 registry key (`Loan from Ravi Mama`, `Advance from customer`,
`Gopal Dairy`…). Left page header strip blue `Dr`, right page header strip orange `Cr`. Each posted row =
`date · other account · amount` (e.g. `Apr 1 · Capital · 50,000`) — **one row per journal line**, so a compound entry
gives one row per account (T16 → `Loan from Ravi Mama · 3,000` AND `Interest · 300`). A total rule + total at the foot
of each page. Balancing rows: `Balance c/d` carries a small **↓ glyph** (carried down) and `Balance b/d` a small
**↑ glyph** (brought down) the first time each appears (s5); plain afterwards. Side chips `Debit balance` /
`Credit balance`. **Type floor (§5.13): ≥ 34 px Baloo 2 for every cell, rows ≥ 60 px; settled rows dim to 70 %;**
the Cash page's right side (8 rows + total) is the densest table in the lesson and is built at full frame height.
Indian textbooks also prefix rows with "To" (left) / "By" (right) — deliberately left OUT here to avoid clashing with the
journal's "To" taught in L8.

SCALE HUD (bible §5.1) — top-right, ~30 %, in every scene that records or balances an account: s5, s6, s7 (it mirrors
each page's tilt and levels with it). Absent by design in s1–s4 (the journal is being sorted, nothing is recorded) and
s8–s10.

ACCOUNTS ON THE SHELF after T17 (14, §5.14 names): Cash · Bank · Infotech · Stock · Equipment · Loan from Ravi Mama ·
Gopal Dairy · Advance from customer · Capital · Drawings · Sales · Rent · Salary · Interest. (L11 will show 19 after
L10 adds 5.)
ICONS (bible §5.12): bank = `landmark` · loan = `umbrella` (kit) · Gopal = `milk` · rent = `key` · drawings = `wallet` ·
salary = `user` · interest = `percent` · advance = `calendar-check` · stock = `leaf` · equipment = `shopping-cart`.
-->

## Scene 1 — Where's the cash? (cold open)

- scene: Meera flips frantically through the journal to total her cash; each cash row flashes as she finds it; pages fly; seventeen entry cards spread over the counter, twelve of them glowing.
- duration: 26s
- voiceover: "Meera has one simple question. How much cash is in the galla right now?… There has to be a faster way to find one number." (Line 1 · s01a–s01c)
- learning: Pays off L8's tease. The journal is in date order, so one account's story is scattered — create the need for sorting by account.
- transition_in: fade from black
- transition_out: one loose journal page floats down over the lens and covers the frame → it slides away to reveal the title wall (s01t)
- status: outline

**Visual.** `--scene-saffron`. Meera behind the stall counter with the journal (shared `JournalCard`, L8) open in front
of her, the galla beside it with a `₹ ?` chip. As she flips, the cash rows flash with a cream highlight and a signed
chip pops above — **cream chips, ink text, no blue/orange** (these are amounts in and out of the galla, not Dr/Cr
sides): `+50,000` (Apr 1, "@first") · `−36,000` (Apr 2, "@second") · `+18,000` (Apr 15, "@fifteenth") · `−5,000`
(Apr 20, "@twentieth"). On s01b, the pages lift off and lay out as 17 small entry cards across the counter (a 6-6-5
grid); 12 of them glow (T1, T2, T3, T4, T6, T7, T8, T10, T11, T13, T16, T17) with counters `17` and `12` as two small
cream chips.

**Motion.** Page flips speed up with each date (0.5 s → 0.25 s per flip, smooth). Meera's acting on 15 fps: licks thumb,
flips, finger-traces, frowns (`worried`). On "scattered across every page" the cards slide out to their grid positions
(staggered drop-and-place). s01c: Meera puffs a strand of hair off her face, slumps on her elbows (`sad` → `thinking`).
Hold ≥ 0.5 s.

**Sound.** `day_street` (low). **New** `page_flurry` under the frantic flipping; `paper_slide` per card group; `pop` on
each signed chip; `galla_clack` once at the start.

**Transition.** One loose page drifts down from the top, settles flat over the lens (cream fills frame), then slides
off to the right revealing the violet title wall.

## Scene 1t — Title sting

- scene: Khata's red cover drops, "Lesson 9 · The Ledger" in gold, swings open.
- duration: 4.6s (fixed, no VO, `intro_sting` music)
- voiceover: —
- transition_out: cover opens; the right page shows Scene 2's first question card; push into the page (L1 `s01t` shape)
- status: outline

**Visual/Motion.** Reuse L1 `s01t`; `LESSON = "Lesson 9"`, `TITLE = "The Ledger"`. SFX `book_thump` + `cover_swing`.

## Scene 2 — Last time (L8 Your Turn answers)

- scene: Three question cards; each answer lands as a picture or a JournalCard entry with its golden-rule tags.
- duration: 35s
- voiceover: "First, last time's answers… They shrink equity, but never touch profit." (Line 2 · s02a–s02f)
- learning: Spaced retrieval of the journal format (with tags) and both L8 misconceptions; the Equity card's third pocket is seen again.
- pause_beats: 1.4 s, 1.4 s, 1.2 s
- transition_out: the three cards fold into one journal card, which Khata snaps shut into a book (Scene 3)
- status: outline

**Visual.** `--scene-teal`. Card 1: Ravi Mama's bundle `₹3,300`. Answer: the bundle splits — `₹3,000` flies onto his
face-tag (ticks `₹30,000 → ₹27,000`), `₹300` drops into the `Interest` jar (`percent` icon). Card 2: phone with a UPI
tick, Priya's face tag, `Apr 25`, two blank lines on a small shared **`JournalCard`** (L8 component, same proportions,
scaled to the card). Answer writes on in the L8 format **with tags**:

| Date | Particulars | Dr ₹ | Cr ₹ | Tag |
|---|---|---|---|---|
| Apr 25 | Bank A/c … Dr | 4,000 | | `user` + `hand` · `Personal · receiver` (blue) |
| | To Infotech A/c | | 4,000 | `user` + `hand-coins` · `Personal · giver` (orange) |
| | ( smartphone · UPI ) | | | |

Card 3: Meera's purse (`wallet`) `₹3,000` next to the `Expense` jar (`receipt`; generic Expense jar permitted before
L10, §5.14) with a `?`. Answer: ✗ stamp over the jar (small, not a full misconception beat), then the **Equity card**
(L8 s8 component) with its three pockets — `Capital ₹50,000` · `Profit` · dashed `Drawings −3,000` — the slip already
in the dashed pocket; Capital and Profit do not move (no "pocket dips").

**Motion.** Each card lifts on its question; others dim to 70 %. Write-ons behind a pencil; tickers count; tags tie on
as each amount lands. Stamp 1.25 → 1.0 `power3.out`, no shake. Equity card unfolds 0.6 s and holds still ≥ 1.0 s.

**Sound.** `tick_tock` (gap length) + `ding_yes` per answer; `tink_low` / `tink_high` on the two journal amounts; `pop`
per tag; `stamp_thunk` (vol 0.4) on card 3.

**Transition.** The three cards slide together into a single journal card; Khata (bottom centre) claps it shut between
its covers — Khata is now centre stage for Scene 3.

## Scene 3 — One book per account (the ledger)

- scene: The account jars on a shelf turn, one by one, into little khata books — one per account. The Cash book opens: blue Dr page, orange Cr page. The shelf gets its name. One-line callback to Khata's name (explained in L7).
- duration: 36s
- voiceover: "Here's the trick. The journal sorts money by date… This set of books is called the ledger. Remember why our friend is called Khata? Khata means account." (Line 3 · s03a–s03b)
- learning: Sorting by account instead of by date; one page per account, each with a debit (left) and credit (right) side = the ledger. The name callback ties "khata = account" to "one khata per account" — no second reveal (C6).
- transition_out: the Cash book and the Capital book slide down off the shelf and open side by side; the journal card slides in on the left (Scene 4)
- status: outline

**Visual.** `--scene-teal`. s03a: the shared `JournalCard` on the left shows rows in date order (a small `Apr 1 → Apr 30`
chip on its edge). On "by account" the account names in the rows pick up soft tints (Cash rows cream, Sales rows pale
saffron) — a first hint of sorting. s03b: a two-tier shelf with 14 labelled jars (Cash = the galla, Bank, Infotech,
Stock, Equipment, `Loan from Ravi Mama`, `Gopal Dairy`, `Advance from customer`, Capital, Drawings, Sales, Rent, Salary,
Interest — §5.14 labels on the jars, as always). Each jar turns into a little red khata book (`K.smallBook` with the
account label + its icon on the cover). The Cash book opens (mini `khataRig` pages): left page blue `Dr`, right page
orange `Cr` (`pageTint`). Label chip `Ledger` lands on the shelf edge. On "called Khata?" Khata, beside the shelf,
glances at the row of little khatas and then at itself (`look`, one head tilt) — the 14 small books and the big one
are visibly the same object; on "Khata means account" a small `खाता` chip appears on the shelf edge for 1.5 s (the one
Hindi word, stays in both cuts). No hop, no sparkle — this is a reminder, not a reveal.

**Motion.** Jar → book swaps happen left to right in a quick cascade on "Each jar becomes a little book" (each: jar
squashes down 2 steps, book drops-and-places in its spot) — Cash and Bank first on their VO words, then the rest at
0.12 s stagger on "every account". Cash book `open` + both `pageTint`s on "@left" / "@right". Khata `look` (shelf →
self) on "@khata", `expr` `happy`.

**Sound.** `glass_clink` (jar) → `book_thump` (vol 0.4) per swap for the first two, then a light `paper_slide` ripple for
the cascade; `cover_swing` (small) on the Cash book; `tink_low` / `tink_high` on the two page tints; `pop` on the chip.

**Transition.** The other books slide back to a neat grid at the right; the Cash and Capital books slide down to centre
and open side by side; the journal card slides in from the left with its first entry glowing — Scene 4.

## Scene 4 — Posting (T1 in slow motion, then T2–T17 montage)

- scene: T1's two journal lines lift off and fly to the Cash book's left page and the Capital book's right page; Khata ticks the journal line. Then the remaining entries post in a quick rhythmic montage across all 14 books while the calendar strip ticks through April.
- duration: 44s
- voiceover: "Copying each journal line onto its account's page is called posting… Left… right. Left… right." (Line 4 · s04a–s04c)
- learning: Posting rule — a journal debit goes to the left side of that account, a credit to the right; write the date and the other account beside the amount; tick the journal line once posted. One journal line = one ledger row (so T16 posts three strips).
- pause_beats: 2.4 s montage after "Left… right." (music + tinks carry it)
- transition_out: the montage ends; every book closes except Cash, which slides to centre and grows to fill the frame by drop-and-place (no zoom) (Scene 5)
- status: outline

**Visual.** `--scene-teal`. Shared `JournalCard` left third; ledger books right two-thirds. T1 rows: `Apr 1 · Cash A/c …
Dr · 50,000` / `To Capital A/c · 50,000` (tags on, as in L8). Each line lifts off as a narrow paper strip and lands on
its page re-written as a ledger row: on Cash's **left** page `Apr 1 · Capital · 50,000`; on Capital's **right** page
`Apr 1 · Cash · 50,000`. The "other account" word is highlighted as it lands (cream strip) on "the other account". Then
a small ink tick (`check` icon) appears at the journal line's right edge on "ticks". Montage: the 14 books in a 7 × 2
grid, open; journal strips (T2–T17, 33 lines incl. T16's three) fly to their books — always Dr strips to left pages,
Cr strips to right pages. T16 (the compound entry): its two debit strips land on two different books
(`Loan from Ravi Mama`, `Interest`); its one credit strip, `To Cash 3,300`, lands on Cash's right page and **splits
into two rows** on landing — `Loan from Ravi Mama · 3,000` and `Interest · 300` — because a ledger row names ONE other
account (the rule just taught in s4a). The split is a 2-step paper tear, 0.3 s, with a cream flash. Calendar strip
along the top ticks `1 → 30`.

**Motion.** T1 flights: smooth arcs (0.7 s each, power3.out), land with a 2-step settle. Montage: flights accelerate from
2 per second to 5 per second, each lands with a tiny cream flash on the page, no camera shake. Ticks appear down the
journal's right edge in sync. Everything stops dead on the last strip (T17's `To Cash`) — 0.5 s stillness.

**Sound.** `tink_low` on every left landing, `tink_high` on every right landing (the L1 pitch pair — the montage becomes a
little two-note tune; duck the volume to 0.35 as the rate rises). **New** `pen_tick` for each journal tick (fallback:
`pop` at vol 0.3). `paper_whoosh` (soft) on the first two flights only; `paper_tear` (soft) on the T16 split.

**Transition.** Thirteen books close (one `book_thump` vol 0.3 for all) and slide off right; the Cash book glides to
centre and is placed large (drop-and-place to full height) — Scene 5's page.

## Scene 5 — Worked: the Cash account, balanced and carried down

- scene: The Cash page full-frame. Left page rows light as the VO names them; totals tick. The page tilts toward the heavier side like the scale. "So how much cash is left?" The ₹50,700 balance drops onto the lighter side to level the page, both totals read ₹1,24,000, then the balance drops to the left as May's opening line. Meera counts the galla — it matches.
- duration: 66s
- voiceover: "Now open the Cash page… Total: one lakh, twenty-four thousand rupees… Gopal, Ravi Mama's loan, his interest, and Meera's drawings… So how much cash is left?… Fifty thousand seven hundred!… The ledger and the galla agree." (Line 5 · s05a–s05d)
- learning: Balancing an account: total both sides, put the difference on the lighter side (balance carried down) so the totals match, then bring it down on the heavier side to open the next period. The balance belongs to the heavier side → Cash has a debit balance.
- pause_beats: 1.4 s "how much cash is left?"
- transition_out: the galla's clasp snaps shut; Gopal's milk can rolls into frame from the right and knocks the Gopal Dairy book open (Scene 6)
- status: outline

**Visual.** `--scene-saffron` (money). The Cash ledger page at full frame height, **≥ 34 px Baloo 2, rows ≥ 60 px**;
**Scale HUD top-right**. Exact rows (§5.14 names; T16 is TWO rows — one per account, as s4 taught):

| Dr (left, blue) | ₹ | Cr (right, orange) | ₹ |
|---|---|---|---|
| Apr 1 · Capital | 50,000 | Apr 2 · Equipment | 36,000 |
| Apr 1 · Loan from Ravi Mama | 30,000 | Apr 2 · Stock | 6,000 |
| Apr 15 · Sales | 18,000 | Apr 5 · Rent | 5,000 |
| Apr 22 · Advance from customer | 4,000 | Apr 15 · Bank | 15,000 |
| Apr 30 · Sales | 22,000 | Apr 20 · Gopal Dairy | 5,000 |
| | | Apr 30 · Loan from Ravi Mama | 3,000 |
| | | Apr 30 · Interest | 300 |
| | | Apr 30 · Drawings | 3,000 |
| **Total** | **1,24,000** | *(running total)* | *73,300* |

The right page holds 8 rows + the balancing row + the total = the type-floor ceiling; the five left rows are spaced to
the same row height so the two pages read as one table. Then on the right page: `Apr 30 · Balance c/d ↓ · 50,700`
(written in a cream box; the **↓ glyph** marks "carried down" on first use), right total becomes `1,24,000`, both totals
double-underlined. Below the totals on the left: `May 1 · Balance b/d ↑ · 50,700` (**↑ glyph**, first use) and a blue
chip `Debit balance`. The Scale HUD mirrors the page's tilt and levels with it.
s05d: Meera at the galla bottom-left counting notes; a ticker above the galla counts up to `₹50,700`, then slides next to
the ledger's `50,700` — they match.

**Motion.** Rows highlight on their VO words (`@meera`, `@mama`, `@eighteen`, `@twenty-two`, `@advance`), left total
ticks to 1,24,000. The right page's rows highlight as a group on the list in s05b (stagger 0.15 s; `Loan from Ravi Mama`
on "@loan", `Interest` on "@interest", `Drawings` on "@drawings"), right total ticks to 73,300. On "heavier" the whole
page rotates ≤ 3° toward the left (smooth, power2.out) — like the scale, it does NOT stay tipped. Through the 1.4 s gap:
a cream weight-chip with `?` hangs above the right page. On "Fifty thousand seven hundred rupees" the chip becomes
`50,700`, drops onto the right page's next row (drop-and-place), the page levels (0.5 s), and the right total re-ticks
73,300 → 1,24,000 in sync with the left total pulsing once. On "drops to the heavier side" the `50,700` chip slides down
past the double underline and across to the left page's `May 1` row. On "debit balance" the blue chip lands. Hold
≥ 1.5 s on the finished page before s05d. Meera's counting on 15 fps; the match: both numbers nudge 8 px toward each
other and settle.

**Sound.** `tink_low` per left row, `tink_high` per right row (soft), ticker clicks from the build's ticker sound if any
(otherwise none). **New** `weight_clunk` (soft wooden clunk) when the balance chip lands and the page levels.
`paper_slide` as it carries down. `note_rustle` while Meera counts; `ka_ching` + `ding_yes` on the match.

**Transition.** Meera snaps the galla shut (`galla_clack`); from the right, a milk can (Gopal's) rolls in along the
counter and bumps a small book, which flips open — the Gopal Dairy page, Scene 6.

## Scene 6 — Faded: Gopal Dairy + misconception (credit balance ≠ money for you)

- scene: Meera balances Gopal's page with one blank: which side is heavier, what's the balance? Then she misreads "credit balance" as good news → ✗ → it's what the stall owes Gopal; Gopal's book sits on the scale's right pan, its home side.
- duration: 37s
- voiceover: "Meera's turn. Gopal Dairy's page… Which side is heavier, and what's the balance?… Nope. On Gopal's page, a credit balance means the stall still owes Gopal three thousand rupees… That's where its balance normally sits." (Line 6 · s06a–s06d)
- learning: Faded balancing (Meera makes a visible choice — she reaches for the LEFT page to write the balance, hesitates, then puts it there correctly as the lighter side); "credit" in an account is a side, not good news (callback to L6's bank SMS). This beat stays on Gopal — the general "every account's balance lands on its home side" moves to Scene 7.
- misconception: "A credit balance means money for me."
- pause_beats: 2.4 s (viewer works out side + amount)
- transition_out: the scale rolls Gopal's book back down; Priya's office tumbler slides into its place (Scene 7)
- status: outline

**Visual.** `--scene-teal`; curved wipe to `--scene-coral` on s06c. Gopal (merchant rig re-dressed: white cap + milk can,
new) stands stage-right. **Scale HUD top-right.** Gopal Dairy page: right `Apr 3 · Stock · 8,000`; left `Apr 20 · Cash ·
5,000`. Meera holds the pencil stage-left. A cream `?` chip hovers between the pages through the gap. Answer: page tilts
right (≤ 3°); `Apr 30 · Balance c/d · 3,000` on the **left**; totals `8,000 | 8,000`; `May 1 · Balance b/d · 3,000` on
the **right**; orange chip `Credit balance`.
Misconception (coral): Meera beams (`joy`); her thought bubble shows coins raining into her purse (`wallet`) → red ✗
stamp. Then Gopal holds up a face-tag slip `₹3,000` with the stall's face (`faceTag`). The Scale grows from the HUD to
centre: Gopal's book slides onto the right pan (L + E side, orange) and the scale settles — his tag hangs there, where a
claim lives. (The asset-book / liability-book pair that used to end this scene now lives in Scene 7.)

**Motion.** Meera writes the two rows (15 fps). She stops, looks at camera (`thinking`) and holds still through the gap
(one blink only). On the answer her pencil first drifts toward the right page (the heavier side — the common slip),
pauses one step, then moves to the left page and writes the `3,000` there; balancing then animates as in Scene 5 but
faster (the viewer has seen it once). Stamp 1.25 → 1.0 `power3.out`, no shake. Book onto the pan: smooth arc, the
scale tilts and settles (it never stays tipped).

**Sound.** `tick_tock` through the gap, `ding_yes` on the answer, `weight_clunk` on levelling. `coin_clink` in the
thought bubble, `stamp_thunk` on the ✗. `tink_high` as the book lands on the right pan.

**Transition.** The scale tips Gopal's book back off the pan and away; in its place on the counter, Priya's office tumbler
slides in from the right with an Infotech tag — Scene 7.

## Scene 7 — Solo: Infotech's page — then the pattern

- scene: Infotech's page with three rows; 3-2-1 countdown; reveal in stages — `Balance c/d` lands, THEN `Balance b/d` drops, THEN a ≥ 1.5 s hold on the finished page. Then the generalisation: an asset book with its left page lit and a liability book with its right page lit sit on the scale's two pans.
- duration: 30s
- voiceover: "Your turn. Infotech's page… What's the balance, and which side?… Six thousand rupees, on the left — a debit balance… It's an asset, sitting on its home side. And that's the pattern: every account's balance usually lands on its home side." (Line 7 · s07a–s07b)
- learning: Solo balancing on a receivable; then the lesson's generalisation (moved here from s6): normal balance = home side.
- pause_beats: 3.2 s countdown (solo)
- transition_out: camera pulls back; the Infotech page shrinks into recap tile 3 while two more tiles slide in beside it (Scene 8)
- status: outline

**Visual.** `--scene-teal`. Priya (kit) at the right with a sheepish smile and her tumbler. **Scale HUD top-right.**
Infotech page (≥ 34 px): left `Apr 16 · Sales · 6,000`, `Apr 30 · Sales · 4,000`; right `Apr 25 · Bank · 4,000`.
Countdown ring (L1 device) beside the page. Reveal, in three stages: (1) left total `10,000`; `Apr 30 · Balance c/d ·
6,000` on the right; totals `10,000 | 10,000`, page levels; (2) `May 1 · Balance b/d · 6,000` on the left; blue chip
`Debit balance`; (3) hold. Then on "that's the pattern" the Scale HUD grows to centre: a mini asset book (blue left
page lit, `Assets` label on the pan) sits on the left pan and a mini liability book (orange right page lit,
`Liabilities` label on the pan) on the right pan — no words beyond the two pan labels; the scale is level.

**Motion.** Rows are already written when the scene opens (it's the viewer's turn — no pencil). Ring drains 3 s. Stage 1
on "a debit balance": the `6,000` weight-chip drops onto the right page (drop-and-place), the page levels, totals tick
(0.8 s). Stage 2 on "still owes": the chip slides down past the underline and across to the left `May 1` row; the blue
chip lands (0.8 s). Stage 3: **hold ≥ 1.5 s, dead still**. Priya gives a small apologetic wave on "still owes" (15 fps).
On "that's the pattern" the HUD grows (0.6 s), the two mini books drop onto their pans (0.4 s each, left first), the
scale settles; hold ≥ 1.0 s before the pull-back.

**Sound.** `tick_tock` (3 s), `ding_yes`, `weight_clunk` (soft) on stage 1, `paper_slide` on stage 2, `tink_low` on the
debit-balance chip; `tink_low` (asset book) / `tink_high` (liability book) on the pans.

**Transition.** Camera pulls back (smooth); the page shrinks to a tile and slides right; two more tiles slide in from the
left (Scene 8).

## Scene 8 — Recap

- scene: Three tiles: the shelf of little books; a journal strip flying to a left page and a right page; a levelled page with its balance.
- duration: 13s
- voiceover: "So — the ledger gives every account its own page… in one number." (Line 8 · s08)
- learning: Retrieval summary.
- transition_out: tiles flip over into question cards (Scene 9)
- status: outline

**Visual.** `--scene-leaf`. Tile labels: tile 1 = **icon only** (one small book with a `1` badge — the former `One page
each` is on the dub swap list and is gone) · tile 2 `Posting` · tile 3 `Balance` (both accounting terms, allowed).

**Motion.** Each tile lifts as the VO reaches it; tile 2's strip flies once (left, then right) when lifted. Khata
thumbs-up (book flap) at the end.

**Sound.** `rise_three` motif across the tiles; `tink_low` / `tink_high` on tile 2's flights.

**Transition.** Tiles flip (scaleX squeeze) into Scene 9's question cards.

## Scene 9 — Your Turn

- scene: Three cards, shown ONE AT A TIME, large: the Sales page and the Bank page with their rows already posted (balance left blank), and a liability book with a "?" between its pages.
- duration: 23s
- voiceover: "Your turn. Three quick ones… Answers at the start of the next lesson." (Line 9 · s09)
- learning: Retrieval + solo balancing; answers open Lesson 10.
- transition_out: cards tuck into Khata; Khata closes (Scene 10)
- status: outline

**Visual.** `--scene-violet`. The three cards start as a small stack at the left edge; **the current card slides to centre
and grows to ~⅔ frame (≥ 34 px rows)** while its question is read, then shrinks back to the stack as the next one
comes forward — never three ledger pages at ⅓ frame. Card 1 — `Sales` page: left empty; right `Apr 15 · Cash · 18,000`
· `Apr 16 · Infotech · 6,000` · `Apr 30 · Cash · 22,000` · `Apr 30 · Infotech · 4,000`; balance cell `?`. Card 2 — `Bank`
page: left `Apr 15 · Cash · 15,000` · `Apr 25 · Infotech · 4,000`; right `Apr 30 · Salary · 8,000`; balance cell `?`.
Card 3 — the `Loan from Ravi Mama` book (umbrella icon), blue and orange pages both dim with a `?` between. Question
numbers only; the VO carries the words. Description/pinned comment carries the written questions.

**Answers (for Lesson 10's "Last time" — must match LESSON-PLANS.md):** 1 — Sales: ₹50,000 credit balance. 2 — Bank:
₹11,000 debit balance. 3 — On the credit side (a liability's home side).

**Motion.** Card forward: 0.5 s power3.out grow + slide; back: 0.35 s. Still holds during the 1.8 s pauses (the large
card is dead still while the viewer works).

**Sound.** `paper_slide` per card forward/back; `bell_ring` softly on "Your turn".

## Scene 10 — Next time

- scene: Evening at the stall. Meera totals April's profit on a napkin — ₹36,700! — and reaches for a confetti popper. Khata, on the counter, raises one arm and clears its throat. Freeze BEFORE the popper fires. "10" cover.
- duration: 10s
- voiceover: "Next time, Meera adds up April's profit. Thirty-six thousand seven hundred rupees!… and Khata clears its throat. Not so fast." (Line 10 · s10)
- learning: Set up L10's cold open. Continuity with L10 s1: there the popper FIRES and the confetti freezes mid-air; here the tease ends one beat earlier — Meera's hand on the popper, Khata's arm up, freeze, no confetti yet.
- transition_out: Khata's cover with a gold "10" swings shut → end card (Scene 11)
- status: outline

**Visual.** `--scene-night` (evening; rhymes with L1's night stall, string lights). The L10 napkin (shared prop) on the
counter with `50,000 − 5,000 − 8,000 − 300` and the total ticking to `₹36,700` (all from `meeras-chai.json` after T17:
sales, rent, salary, interest). Meera `joy`, the paper confetti popper (shared with L10) in hand, string still slack.
Khata at the counter edge, one arm up, `!` emote.

**Motion.** Ticker counts up on "Thirty-six thousand seven hundred". Meera reaches for and lifts the popper (15 fps).
On "clears its throat" Khata's arm rises and the `!` pops; Meera freezes mid-reach (`amazed`), popper raised, string
untouched. Hold 0.5 s on "Not so fast." — the confetti does **not** fire here (L10 s1 fires it, then freezes it mid-air).

**Sound.** `night_street` (low); `ka_ching` on the total; `pop` for the `!` emote (no confetti `pop`); `book_thump` on the
cover.

**Transition.** Khata's red cover with a gold **10** swings shut over the frame → Scene 11 opens it.

## Scene 11 — End card

- scene: Series end card (L1 `s11` shape, fixed 12 s, no VO).
- duration: 12s
- voiceover: —
- status: outline

**Visual/Motion.** The "10" cover swings open onto the violet end card: series wordmark (Shrikhand) top-left; `Up next`
card — `Lesson 10` / `Month-End Surprises` with a `calendar` medallion showing `30`; two blank paper panels on the right
for YouTube end-screen videos; Khata waving bottom-left. **No subscribe circle, no credit line, no channel branding.**
`outro` music.

---

## New kit assets

- **Ledger page / T-account** (shared device for L9–L11): open mini-Khata with account label (§5.14 key), blue `Dr` /
  orange `Cr` header strips, row helper (`date · other account · amount`, ≥ 34 px Baloo 2, rows ≥ 60 px, settled rows
  dim to 70 %), total rule, `Balance c/d` / `Balance b/d` rows with first-use **↓ / ↑ glyphs**, side chips
  `Debit balance` / `Credit balance`. Built on `khataRig` pages (`pageContent`) or `K.smallBook` opened.
- **`JournalCard`** (shared, from L8 — reuse unchanged; scaled variant for the s2 answer card) + **journal strip** (one
  journal line as a flying paper strip, with a **split-on-landing** state for T16's `To Cash` strip) + **ink tick**
  (`check` icon, ink-coloured).
- **Golden-rule tags** (icon-first, from L8) — on the s2 answer card.
- **Equity card with three pockets** (from L8 s8) — s2 card 3.
- **Scale HUD** (`scaleRig`, corner variant; grows to centre in s6 and s7) + **mini asset / liability books** for the pans.
- **Shelf** (two-tier, tone-on-tone) for 14 small books; **14 account jars** (reuse `K.jar` with §5.14 labels).
- **Balance weight-chip** (cream rounded tab that can hold `?` or a number); **cream signed chips** (`+50,000` /
  `−36,000`, ink text) for s1.
- **Gopal** — merchant rig re-dressed (white cap) + **milk can** prop.
- **Napkin** and **confetti popper** (both shared with L10 — build once, popper has an "unfired" and a "fired" state).
- **`खाता` chip** (one Hindi word, Mukta / Noto Sans Devanagari).
- **Icons:** `landmark` (bank), `umbrella` is a kit piece (loan book cover), `milk` (Gopal), `key` (rent), `wallet`
  (drawings), `user` (salary), `percent` (interest), `calendar-check` (advance), `leaf` (stock), `shopping-cart`
  (equipment), `check`, `smartphone`.

## New SFX

- `page_flurry` — rapid flipping through a paper notebook, ~1.5 s.
- `pen_tick` — quick pen tick-mark on paper, very short.
- `weight_clunk` — soft wooden clunk of a weight settling on a scale pan.
- `paper_tear` — soft short paper tear (T16 strip splitting into two rows in s4; vol 0.4).

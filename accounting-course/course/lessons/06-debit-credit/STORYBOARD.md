---
format: 1920x1080
fps: 30
duration: 6m39s
message: "Debit means left and credit means right. Every account has a home side from the equation: grow it there, shrink it on the other side. Left total always equals right total."
arc: Cold open (bank SMS 'credited') → Title → Last time (L5 answers + Aman A5–A9) → Khata opens, pages tint, then the two words land = left/right → Home sides from the scale: 4a T1 → 4b T3 cross-over → Liabilities (T5) → The algebra move: −Expenses crosses the post (T6), revenue stays right → DEAD CLIC (drawings tile, Revenue→Income flip) + double entry (scale ↔ khata, T1 replay) → Bank SMS, two cameras (T8) → Worked T7 / faded T9 (side blank) / solo T10 → Recap (3 tiles) → Your Turn (Q3 = imagine) → Tease (CA friend) → End card
audience: adults with school maths, zero accounting (founder archetype)
lesson: 6
module: "M3 · The Secret Language"
new_idea: "Debit = left, credit = right. Each account's home side comes from where it sits in A = L + E; increases go on the home side, decreases on the other. Total debits = total credits."
---

<!--
Visual language, cast, and devices: ../../SERIES-BIBLE.md (§4 cast, §5 devices, §9 visual identity).
Kit: ../../../lessons/L01/assets/kit/RIG.md. Every scene leaves through an OBJECT that becomes the next scene.
VO segment ids refer to vo-segments.json; line numbers to SCRIPT.md.
Colour law for this lesson (and the rest of the course): debit / left = --dr #3D7FD9 blue, credit / right = --cr #E8862E
orange. Never green/red for Dr/Cr. Every amount that lands on a LEFT page plays tink_low; on a RIGHT page, tink_high.
Layout law: whenever the scale and Khata share the frame, the scale hangs directly ABOVE open Khata so the left pan sits
over the left page and the right pan over the right page — the viewer sees "left of the equation = left page" without words.
Device constants (bible §5.3, §5.6): "which two things changed?" = freeze, cream veil 30 %, two empty slots at top centre,
2.0 s gap with tick_tock, ding as the two jars/tags light — identical in 4a, 4b, 9. ✗ stamp = scale 1.25 → 1.0 power3.out,
stamp_thunk, no shake, no settle wobble; Khata stamps. Scale HUD (§5.1) is present in every scene that writes a
transaction (4a, 4b, 5, 6, 8, 9). Khata is "it". Build note: Scenes 4a and 4b are both `scene: 4` in vo-segments.json
(4a = s04a–s04d, 4b = s04e–s04g); the build keys scenes by integer.
-->

## Scene 1 — The SMS (cold open)

- scene: Outside the bank, day. Meera hands a ₹15,000 bundle to the Bank; her phone buzzes "CREDITED ₹15,000"; she beams; Khata hops up holding a blue "Dr" chip; Meera's face falls.
- duration: 22s
- voiceover: s01a–s01d (Line 1)
- learning: Create the conflict the lesson resolves — "credit" on the SMS vs "debit" in Meera's books.
- transition_in: fade from black
- transition_out: Meera drops the phone face-down on the galla; its red cloth back fills the frame → Khata's cover (title sting)
- status: outline

**Visual.** Flat `--scene-sky` background; tone-on-tone street strokes. **The Bank** (new asset: friendly building,
columns for legs, pediment eyebrows, door = mouth) stands right of centre. Meera left, galla under one arm, a ₹15,000
`bundle` in the other hand. Calendar strip on top shows **Apr 15** highlighted. After the buzz, a phone close-up (new
asset: phone with an SMS card): bank icon + `A/c XX12` + **`CREDITED ₹15,000`** — "CREDITED" printed in plain ink, not
orange (we don't colour the bank's word until Scene 8). Meera's thought bubble: an orange `Cr` chip + Lucide
`thumbs-up`. Khata pops up bottom-right holding a blue **`Dr`** chip.

**Motion.** Meera walks in (`walkTo`, cheat walk), bundle arcs into the Bank's door-mouth (Bank does a small satisfied
gulp — 2-step squash). Phone buzz: phone lifts into a centred close-up (smooth 30 fps), card drops-and-places. On
"Credited!" Meera `expr joy` + `hop`; thought bubble pops. On "Khata has news" Khata `hop`s in from below frame and
raises its arm with the Dr chip; Meera `expr puzzled`, `headTilt`. On "who's right?" the Bank and Khata look at each
other (`look`), a `?` emote pops between them. Camera push ≤ 6 % over the scene.

**Sound.** `day_street` ambience, `note_rustle` on the bundle, `phone_buzz` (×2), `pop` on the bubble, `boing_hop` on
Khata's entrance, `tink_low` on the Dr chip (the debit pitch, planted).

**Transition.** Meera sets the phone face-down on the galla lid; camera rushes into the phone's back, a red cloth case
that fills frame and becomes Khata's cover for `s01t`.

## Scene 1t — Title sting (`s01t`)

- scene: Series sting: Khata's red cover with "Lesson 6 · Debit & Credit Are Just Left & Right"; cover swings open.
- duration: 4.6s
- voiceover: —
- transition_out: cover swings open → the right page already shows Scene 2's question board; camera pushes into the page
- status: outline

**Visual/Motion.** Reuse L1 `s01t` exactly (lesson number + title swapped; the title is long — set it on two lines:
"Debit & Credit Are" / "Just Left & Right"). For this lesson only, as the cover swings open the left page flashes
blue and the right page orange for 4 frames — a tiny wink at what's coming. SFX: `book_thump` + `cover_swing`.

## Scene 2 — Last time

- scene: Three question cards on a paper board, answered one by one; then Aman's two-needle table for A5–A9.
- duration: 40s
- voiceover: s02a–s02g (Line 2)
- learning: Spaced retrieval of L5 (advance = liability; paying a supplier ≠ expense; receivable balance) + Checkpoint 2 headline.
- transition_out: the ₹8,500 profit chip flips over; its back is the SMS card from Scene 1 → camera pushes into "CREDITED"
- status: outline

**Visual.** `--scene-teal`. Three `card`s in a row, picture-first:
1. Calendar leaf **May 5** + catering pot icon + `₹4,000` note → answer: a `label` **`Liability`** drops onto the card,
   with a small orange right-pan scale icon.
2. Gopal's milk can + `₹5,000` coins leaving the galla → a faded "Expense" chip gets a small red ✗ `stamp`; answer
   label **`Liability ↓`**.
3. Infotech/Priya medallion with a ticker: `₹6,000 − ₹4,000` → **`₹2,000`**.
Then Aman (new asset if not built for L3/L5: Aman + samosa cart) slides in left; a compact table with two `gauge`
needles in the header (`Profit` · `Cash`) and five rows:
`A5 +9,000 · +9,000` · `A6 −2,000 · −2,000` · `A7 +1,500 · 0` · `A8 0 · −2,000` · `A9 0 · +1,000`.
Rows A5 and A6 get a small "both needles" highlight. Footer chip ticks up to **`Profit ₹8,500`**.

**Motion.** Each card drops-and-places as its question is read; the answer element lands after the 1.2 s gap. Table
rows slide in on twos as a quick stagger (0.12 s each) while VO says "only the cash sale and the rent" — A5/A6 rows
light; the other three dim slightly as A5/A6 light. Profit ticker counts 0 → 8,500.

**Sound.** `tick_tock` under each 1.2 s gap, `ding_yes` on answers, `stamp_thunk` (light, vol 0.4) on the ✗, `coin_clink`
on the ticker.

**Transition.** The profit chip flips (rotateY fake via scaleX) and its back is the SMS card; camera push-through into
the word `CREDITED`.

## Scene 3 — The two scary words

- scene: Khata rises from below the SMS card and opens; its left page tints blue and its right page orange — the picture first. Two root icons (a hand with coins, a handshake) float up from the SMS word and fall away. Then the paper tiles DEBIT and CREDIT drop onto the tinted pages, left and right.
- duration: 20s
- voiceover: s03a–s03c (Line 3)
- learning: Debit = left, credit = right — nothing more. Pays off L1 s03 ("A left page, and a right page… It's going to matter"). Concrete (two tinted pages) before the term (the two tiles).
- transition_out: camera tilts up from Khata's open pages; the scale lowers on a string until its pans hang over the pages (Scene 4a)
- status: outline

**Visual.** `--paper` cream background (the same plain set as L1 s03 — deliberate rhyme). Order is the point:
1. The SMS card from Scene 2 sits top-centre. **Khata (`khataRig`) rises** from below it, centre, and opens; `pageTint`
   left → blue, right → orange, during "Now, that SMS." — before any word tile exists.
2. On "Latin": two **root icons only**, no words — Lucide `hand-coins` (debere) and `handshake` (credere) — float up out of
   the SMS word `CREDITED`, hover a beat, and flutter down out of frame on "Forget those meanings." No `debere` / `credere` text.
3. On "debit just means left": the paper tile **`DEBIT`** drops onto the already-blue left page and a `Dr` label settles
   under it; on "right": **`CREDIT`** drops onto the orange right page, `Cr` under it.
4. A small "Lesson 1" polaroid (callback frame of L1 s03 Khata) clips to the corner on "from the very first lesson".
Text on screen: `DEBIT`, `CREDIT`, `Dr`, `Cr` — four items, all accounting terms.

**Motion.** Khata rises smooth (30 fps), opens with the kit page-fan; tints wipe across each page (0.4 s, `power2.inOut`).
Root icons rise on a slow arc and fall with a paper flutter (smooth). ≥ 0.5 s stillness on the two bare tinted pages
before "debit just means left" — then the tiles drop-and-place (`power3.out`, no bounce). Khata `expr wink` on "This is
why". No idle motion on the open pages.

**Sound.** `paper_slide` on Khata opening; `paper_whoosh` as the root icons lift;
**`tink_low`** exactly on "left" (DEBIT lands), **`tink_high`** exactly on "right" (CREDIT lands) — the L1 pitch pair, now
paid off.

**Transition.** Camera tilts up (smooth, ≤ 8 % move); the scale (kit `scale`) lowers on a string from above until its
left pan hangs over the left page and its right pan over the right page.

## Scene 4a — Home sides (T1)

- scene: Scale above open Khata. Jars on the left pan (Cash, Equipment, Stock), tags on the right pan (Ravi Mama, Gopal, Meera). A map-pin lands on each pan: the home sides. The rule card, icons only. "Which two things changed?" on T1; ₹50,000 lands on each page.
- duration: 34s
- voiceover: s04a–s04d (Line 4, Scene 4a)
- learning: Home side = side of the equation; grow on the home side, shrink on the other.
- pause_beats: 1 × "Which two things changed?" (2.0 s)
- transition_out: the T1 slip slides off left; the cart slip (`₹36,000`) slides in from the right on the same rail — same set, no cut (Scene 4b)
- status: outline

**Visual.** `--scene-teal`. Top half: the scale (the HUD, enlarged to a prop here); bottom half: Khata open, pages
blue/orange-tinted at 25 % (so ink amounts read clearly); left pan over left page, right pan over right page (layout
law). **Left pan = jars** (`Cash` as the galla-jar, `Equipment`, `Stock`); **right pan = tags on strings** (Ravi Mama's
face-tag `Loan from Ravi Mama`, Gopal's face-tag `Gopal Dairy`, Meera's face-tag `Capital`) — claims never look like
money the stall has (bible §5.2). Labels on the jars/tags, no legend.
On "home side": a Lucide **`map-pin`** medallion drops onto each pan — blue pin on the left pan, orange pin on the right
pan (§5.12; `house` is retired).
**Rule card** (`card`, drops below the scale, left of Khata's spine) — **icons only, no prose**: row 1 `↑` then a blue/orange
`map-pin` (grow → home side); row 2 `↓` then `↔` (shrink → the other side). The card stays for 4b, 5, 6.
**T1:** slip `Apr 1 · ₹50,000` (Meera's face icon) on the top rail. "Which two things changed?" device (kit constant,
2.0 s): freeze, cream veil, two empty slots top-centre; `ding` → the `Cash` jar and Meera's `Capital` tag light.
`₹50,000` flies from the Cash jar to the **left page** (blue line `Cash 50,000`) and from the Capital tag to the **right
page** (orange line `Capital 50,000`). No running-total chips under the pages in this scene (totals belong to Scene 7).

**Motion.** Scale tilts briefly when the first amount of the pair lands and settles when the second lands (device rule:
it never stays tipped; `power2.inOut`, no overshoot). Amount flights: smooth 30 fps arcs, `power3.out`, drop-and-place
on the page. Pins and card drop-and-place, no bounce. Camera still.

**Sound.** `pop` ×2 (pins), `paper_slide` (card), `tick_tock` + `ding_yes` (device), `coin_clink` on flights, `tink_low`
on the left-page landing, `tink_high` on the right-page landing.

**Transition.** The T1 slip exits left along the rail; the cart slip enters right along the same rail.

## Scene 4b — The cross-over (T3)

- scene: Same set. The cart slip. "Which two things changed?" — Equipment and Cash light. Equipment ₹36,000 lands on the left page; the Cash coin leaves the left-pan jar and crosses the spine to the RIGHT page. Hold. The Cash jar's label ticks 80,000 → 44,000.
- duration: 31s
- voiceover: s04e–s04g (Line 4, Scene 4b)
- learning: An asset that shrinks is written on the other side — debit ≠ "up". The click moment of the lesson.
- pause_beats: 1 × "Which two things changed?" (2.0 s) · 1 × hold 1.6 s after "Credit Cash"
- transition_out: the cart slip turns over — its back is Gopal Dairy's ₹8,000 delivery slip (Scene 5)
- status: outline

**Visual.** Continuity with 4a (scale, jars, tags, pins, rule card, the two T1 lines already on the pages). Calendar
strip ticks to **Apr 2**. Slip `Apr 2 · ₹36,000` with the `shopping-cart` icon (equipment, §5.12).
"Which two things changed?" device (identical constant): `ding` → the `Equipment` jar and the `Cash` jar light — **both on
the left pan**; the scale does not move (L3 callback).
`Equipment 36,000` flies to the **left page** in blue. Then the Cash jar drops a coin stack — and this coin flies **across
the spine to the right page**: `Cash 36,000` in orange. **Hold ≥ 1.5 s** on this frame — it's the moment. The Cash
jar's label chip ticks **`₹80,000 → ₹44,000`** (jar level drops one step) — a ticker only; no mini T-account page (that
device is L9's). Rule card row 2 (`↓ ↔`) gives a single highlight pulse as the coin lands right.
On "debit doesn't always mean up": a tiny chip `Dr = ↑ ?` appears over the left page and Khata gives it a small ✗
(§5.6 spec at half size, `stamp_thunk` vol 0.35).

**Motion.** The cross-over coin travels slower than every other flight (0.7 s) with a dashed trail so the eye follows it
from the left-pan jar to the right page; nothing else moves during the hold. Ticker counts down (never jumps). Camera
holds still through the device and the hold.

**Sound.** `tick_tock` + `ding_yes` (device), `coin_clink`, `tink_low` (Equipment), **`tink_high`** on the Cash coin — the
ear learns "right" even for an asset — `coin_clink` (soft) under the ticker, light `stamp_thunk` on the ✗.

**Transition.** The cart slip flips (scaleX fake) — its back is Gopal Dairy's delivery slip, `₹8,000`.

## Scene 5 — Liabilities (T5)

- scene: Gopal's crate of stock lands on the left pan; Gopal's IOU coin hovers above Khata's spine — left or right? — then drops to the right page.
- duration: 18s
- voiceover: s05a–s05b (Line 5)
- learning: Liabilities' home is the right; a liability that grows is a credit.
- pause_beats: 1 × 1.6 s "Debit, or credit?"
- transition_out: camera slides along the right pan to Meera's Capital tag, which comes forward and unfolds into the Equity card (Scene 6)
- status: outline

**Visual.** Same set as Scene 4b (continuity), calendar strip ticks to **Apr 3**. A milk `crate` with the Gopal Dairy
medallion (milk-can icon) drops onto the left pan, `Stock` jar fills; `Stock 8,000` lands on the left page in blue.
Gopal's IOU: a paper coin `₹8,000` with the Gopal medallion hovers over the spine with a small `?` above; Gopal's
face-tag on the right pan grows a step when it lands.

**Motion.** During the 1.6 s gap the coin holds perfectly still over the spine (no bob — stillness is the question).
On "Credit." it slides right and lands as orange `Gopal Dairy 8,000`; the right pan's orange `map-pin` gives a single
2-step nod. Scale tips left on the stock landing, settles when Gopal's line lands.

**Sound.** `glass_clink` (crate on pan), `tink_low` (Stock), `tick_tock` under the gap, `tink_high` + `ding_yes` on "Credit".

**Transition.** Camera slides right along the right pan to Meera's `Capital` tag; it comes forward and unfolds.

## Scene 6 — Money made, money spent: the algebra move (T6)

- scene: Meera's tag unfolds into the Equity card (Capital | Profit). Rent ₹5,000: the Cash coin crosses to the right page; the Rent slip hovers over the spine with a "?". The L4 equation strip slides in under the scale. The `−Expenses` chip lifts, crosses the scale's post, flips its sign to `+Expenses` and lands on the LEFT pan as the Expenses jar; the strip ticks to `A + Expenses = L + Capital + Revenue`. Hold. The Rent slip drops onto the left page. Revenue's chip stays right.
- duration: 43s
- voiceover: s06a–s06d (Line 6)
- learning: Expense = debit is *derived*: moving Expenses across the equals sign puts it on the left with the assets. Revenue never moves, so its home is the right. Two ideas, nothing else (no drawings here — see Scene 7).
- pause_beats: 1 × hold 1.5 s after the rearranged equation lands
- transition_out: the pans slide down onto Khata's pages and the jars/tags line up in two columns (Scene 7)
- status: outline

**Visual.** `--scene-saffron` (money beats). Same set (scale over open Khata, rule card, T1/T3/T5 lines on the pages).
Calendar strip: **Apr 5**. Rent slip `₹5,000` with the Lucide **`key`** icon (rent, §5.12).
1. **The pair, half-written.** Meera's `Capital` tag on the right pan unfolds into the **Equity card** with two pockets
   (L4 callback, same component): `Capital ₹50,000` · `Profit` — the Profit pocket holds L4's two slips (revenue `18,000`,
   expense `5,000` as pictures, no new numbers). `Cash 5,000` coin flies from the Cash jar to the **right page** (orange) —
   the T3 pattern again. The **Rent slip hovers over the spine with a `?`** — which side? Meera (small, bottom-left,
   `expr puzzled`, `headTilt`) on "where is its home?".
2. **The equation strip** (same strip component as L4 s6) slides in **under the scale, between the pans and the pages**:
   `A = L + Capital + Revenue − Expenses`. Each term chip lights as it is read. The `Expenses` chip under the Profit pocket
   wears its `−`.
3. **The move** (the one new picture of the lesson). On "Move Expenses across the equals sign": the **`−Expenses` chip
   lifts out of the strip**, arcs **over the scale's post** (the `=`), and **flips** mid-air — the `−` rotates into a `+` —
   then **lands on the left pan as the `Expenses` jar** (the Rent slip's picture inside). As it leaves, the expense slip
   slides *out of the Profit pocket* (the pocket now holds only revenue — nothing is counted twice; the pan it left loses
   exactly the weight the left pan gains). The strip **ticks** term by term to **`A + Expenses = L + Capital + Revenue`**.
   **Hold ≥ 1.5 s** — nothing moves.
4. On "Rent grew, and the left is its home": the hovering Rent slip drops onto the **left page** as blue `Rent 5,000`.
   Rule card row 1 (`↑ map-pin`) pulses once. Meera `expr thinking` → `expr happy` on "Every expense is a debit".
5. On "Revenue never moved": the `Revenue` chip in the strip and the revenue slip in the Profit pocket glow together on the
   **right**; an orange `map-pin` ticks on beside them. No new jar for revenue — it already lives in the Profit pocket.

**Motion.** Tag unfolds with a clean paper slide (no wobble). Strip slides in `power3.out`. The chip flight is the slowest
move in the lesson (1.0 s arc, `power2.inOut`, the sign flip at the apex over the post). Strip ticks are 0.15 s per term,
left to right. Scale: brief tip-settle on the rent pair; level during the move (the weight moves *with* the chip — when
the chip lands left, the pans are level). Camera one gentle push ≤ 6 % onto the strip during the move, back for the hold.

**Sound.** `coin_clink`, `tink_high` (Cash), `pop` per term chip, `paper_whoosh` on the chip lift, a soft `flip` (`paper_slide`)
at the sign flip, `glass_clink` as the Expenses jar lands, `rise_three` (soft) as the rearranged strip completes, `tink_low`
(Rent lands).

**Transition.** The pans lower onto Khata's pages; the jars on the left and the card/tags on the right line up as two columns.

## Scene 7 — DEAD CLIC, and double entry

- scene: Two columns on Khata's pages (jars left, claims right); a 3 s `D` wallet tile joins the left column for drawings; the `Revenue` chip visibly flips to `Income`; the initials drop as letter tiles to spell DEAD | CLIC and the strip sticks onto the equation strip. Then the scale's pans flatten down into Khata's pages: the scale and the book are the same object; pages cleared, T1 replayed alone — ₹50,000 = ₹50,000.
- duration: 33s
- voiceover: s07a–s07c (Line 7)
- learning: DEAD CLIC as a *summary read off the rearranged equation*; drawings planted as a tile only (transaction in L8); revenue = income bridged once; total debits = total credits = double entry = the scale.
- pause_beats: 1 × hold 1.5 s on the equal totals
- transition_out: a divider drops from the scale's post; Khata slides left INTACT; the Bank's grey-blue ledger slides in from the right (Scene 8)
- status: outline

**Visual.** `--scene-leaf` (the "aha" beat). The T1/T3/T5/T6 lines fold into the page gutters as the columns arrive — the
pages are **cleared** for this scene. Left page column: a blue `D` tile (= Debit) then the `Expenses` jar, the `Assets` jar
(Cash/Equipment/Stock grouped as one); right page column: an orange `C` tile (= Credit) then the three claims: `Liabilities`
tag, the `Revenue` chip (from the Profit pocket), `Capital` tag.
- **Drawings tile (3 s):** on "and drawings": a small blue tile **`D`** with the Lucide **`wallet`** icon (§5.12) drops into
  the left column under Expenses, with a faint calendar leaf `30` on its corner (a silent plant for L8). It stays as a tile —
  no jar, no amount, no pipe. (The Drawings pocket itself is built in L8 on the Equity card.)
- **Revenue → Income (A3):** on "Income, that's revenue, or income": the `Revenue` chip **flips** (scaleX fake, 0.35 s) and
  its back reads **`Income`**; a tiny `=` blinks between the two faces for 2 frames. This is the only place the course
  renames it; the account stays `Sales` everywhere.
- Each column item's initial drops as a letter tile into a row: **`D E A D`** (blue) · **`C L I C`** (orange).
- On "You read it straight off the equation": the equation strip from Scene 6 (`A + Expenses = L + Capital + Revenue`) is
  still under the scale; the DEAD CLIC row flies up and sticks onto it like a price label — the `D E A D` half over the
  left of the `=`, `C L I C` over the right. The mnemonic belongs *to* the equation.
- On "left total equals right total": the **scale ↔ khata morph** — the pans flatten and slide down into the pages, the
  beam becomes the page tops, the post becomes the spine. **T1 replays alone**: `₹50,000` flies onto each page; a total chip
  under each page ticks to **`₹50,000` = `₹50,000`** — what the pages actually carry. Chip **`Double entry`** lands on the
  spine.

**Motion.** Letter tiles drop on twos with a 0.1 s stagger, drop-and-place (no bounce). Chip flip 0.35 s. Morph is smooth
30 fps over ~1.2 s with `power2.inOut`. ≥ 1.5 s hold on the equal totals before the VO's last sentence.

**Sound.** `pop` per tile, `paper_slide` on the Income flip, `ka_ching` (soft) when DEAD CLIC sticks to the strip,
`paper_slide` on the morph, `coin_clink` ×2 on the T1 replay, `rise_three` motif on "Double entry" (course "it all fits" cue).

**Transition.** A vertical **divider drops from the scale's post** (the post simply extends to the floor). **Khata slides
left, intact** — cover, both pages, spine, face — and settles as the left camera's book. From the right edge the Bank's own
**grey-blue ledger** slides in and settles as the right camera's book. Two visibly different objects; Khata's page is never
morphed into another party's book (bible §5.8).

## Scene 8 — The bank SMS, two cameras (T8) — misconception moment

- scene: Split screen. Left: Khata (intact) — Bank Dr ₹15,000 / Cash Cr ₹15,000. Right: the Bank's own grey-blue ledger — its vault line Dr ₹15,000 on the left page AND "Meera's Chai" Cr ₹15,000 on the right page (a liability: the Bank holds an IOU with Meera's face). The ✗ stamp lands on Scene 1's "credit = 👍" bubble.
- duration: 39s
- voiceover: s08a–s08c (Line 8)
- learning: The bank SMS reports the bank's books, where Meera's deposit is a liability (the bank's debit is its own vault); in Meera's books Bank is an asset → debit.
- misconception: "Credit = money in / good; debit = money out / bad."
- transition_out: the Bank's half slides out; Meera's half widens to full frame and becomes the practice board (Scene 9)
- status: outline

**Visual.** Divider down the centre (the scale's post, from Scene 7). **Left camera** — `--scene-sky`, Meera beside
**Khata** (the whole book, slid in from Scene 7): a ₹15,000 `bundle` flies from the galla jar to a `Bank` jar (Lucide
`landmark` medallion). Lines: blue `Bank 15,000` on Khata's left page, orange `Cash 15,000` on its right page. Scale HUD
top-left of this camera: Bank jar ↑ and Cash jar ↓ both on the left pan — level. **Right camera** — `--scene-night` (the
bank's interior): the Bank character stands with its own big **grey-blue ledger** (new asset; visibly a different object
from Khata — square corners, no face, no string). **Both of the Bank's lines are written**: on its **left page** a blue line
`Cash 15,000` with a Lucide **`vault`** icon as the notes land in a vault behind the Bank ("the notes land in its vault —
that's its debit"); on its **right page** an orange line `Meera's Chai 15,000` with Meera's face icon. The Bank holds up a
small IOU `card` with Meera's face on it and a Lucide `undo-2` arrow ("can ask for it back"). A label on the bank side:
`Liability`. On "Same money": the ₹15,000 bundle appears in both cameras at the same height, mirrored. On "Your SMS is
reading the bank's khata": the SMS card from Scene 1 slides in on the right camera, docking under the Bank's ledger — its
`CREDITED` word now turns orange, matching the Bank's Cr line.
Misconception: Scene 1's thought bubble (`Cr` + thumbs-up) floats into the centre over the divider → big red ✗ `stamp`
on [firmly]; then a mirrored bubble (`Dr` + thumbs-down) gets a second, smaller ✗. Khata stamps.

**Motion.** Two cameras animate in lockstep (Meera's Dr line and the Bank's Dr line land at the same moment; the two Cr
lines likewise). Stamp: scale 1.25 → 1.0 `power3.out`, no shake, no settle wobble (§5.6). Bank character: one 2-step nod
on "owes her".

**Sound.** `note_rustle`, `tink_low` ×2 (Meera's Bank Dr, the bank's vault Dr — same pitch, same moment), `tink_high` ×2
(Meera's Cash Cr, the bank's Cr line), `phone_buzz` (soft) as the SMS docks, `stamp_thunk` ×2 (second at vol 0.5). Music
dips to near-silence for 0.6 s after "Opposite books."

**Transition.** The Bank's half slides right and out; Meera's half widens into full frame — Khata stays put as the
practice board.

## Scene 9 — Worked → faded → solo (T7, T9, T10)

- scene: Practice board: Khata open centre, Scale HUD top-left tipping and settling per line. Khata does T7; Meera does T9 and slips — she pushes the Infotech coin toward the RIGHT page (the side is blank, not the account); the viewer does T10 with a countdown ring.
- duration: 60s
- voiceover: s09a–s09f (Line 9)
- learning: Apply home sides to revenue, a receivable (side choice), a liability decrease.
- pause_beats: 1 × 2.0 s (two-things device, worked), 1 × 2.4 s (faded), 1 × 3.2 s countdown (solo)
- transition_out: camera pulls back; the three finished entries shrink into recap tiles (Scene 10)
- status: outline

**Visual.** `--scene-teal`. Khata open centre-right; a shelf of jars (left) and tags (right) above; Meera stands left.
**Scale HUD top-left** (§5.1 presence rule — the lesson's thesis is "home side from the scale"): it tips when the first
line of each pair lands and settles when the second lands. Each transaction enters as a `slip` with picture + amount, then
two lines get written (blue left, orange right):
1. **Worked — T7**, slip `Apr 2–15 · ₹18,000` (chai tumblers icon). Two-things device (kit constant, 2.0 s) → the `Cash`
   jar and the `Revenue` chip light. `Cash 18,000` (left) · `Sales 18,000` (right). HUD: left pan dips, right pan answers,
   level. Totals chips equal.
2. **Faded — T9**, slip `Apr 16 · Infotech · ₹6,000` (Priya medallion). `Sales 6,000` lands on the **right** page first
   (the known line). Then the **Infotech `₹6,000` coin hovers over the spine with a `?`** — the *side* is the blank, not the
   account. Meera picks it up and **slides it toward the right page** (Gopal's tag on the shelf glows faintly — "owing
   money, that was Gopal's side"). Khata raises a hand; the coin stops at the spine (no stamp — a gentle correction,
   `bwomp_no`) and holds there, dead still, through the 2.4 s gap. On "No.": Gopal's tag and the Infotech jar light in
   turn — tag on the right (owed *by* the stall), jar on the left (owed *to* the stall) — and the coin drops onto the
   **left page** as `Infotech 6,000`. HUD: right pan had dipped on Sales; it levels when Infotech lands left.
3. **Solo — T10**, slip `Apr 20 · Gopal Dairy · ₹5,000` (coins leaving the galla, Gopal medallion). Both lines blank;
   countdown ring drains 3 s → `Gopal Dairy 5,000` (left) · `Cash 5,000` (right). HUD: both pans drop together — level.

**Motion.** Slips drop-and-place top-centre; lines write on with a quill wipe (smooth). Meera's acting on twos: reach
(`arm`), slide, `expr worried` when Khata stops her, `expr thinking` during the gap, `expr happy` on "Debit Infotech".
Countdown ring = L1 s06 ring (reuse). HUD level-return `power2.inOut`, no overshoot. Camera holds still during the gap
and the countdown (no push while the viewer thinks).

**Sound.** `tick_tock` + `ding_yes` (device), `bwomp_no` on Meera's slip, `tick_tock` loop under the countdown, `ding_yes`
on reveals, `tink_low`/`tink_high` per line.

**Transition.** Camera dolly-out; the three entries shrink and drift into a row of three recap tiles.

## Scene 10 — Recap

- scene: Three tiles: Khata's pages ← Dr / Cr →; the scale with map-pins and the `↑ map-pin` / `↓ ↔` rule icons, the DEAD CLIC strip stuck under it; the SMS card docked under the Bank's ledger.
- duration: 11s
- voiceover: s10 (Line 10)
- learning: Retrieval summary (three pictures, bible §3).
- transition_out: tiles flip over to reveal three question cards (Scene 11)
- status: outline

**Visual/Motion.** `--scene-teal` (violet is for title stings and end cards only, §9). Each tile lights as VO names it
(no extra text beyond the labels already in the pictures; DEAD CLIC rides inside tile 2 rather than taking a tile of its
own). Khata thumbs-up (cover flap) at the end. SFX: `pop` per tile, `ding_yes` at the end.

## Scene 11 — Your Turn

- scene: Three question cards with pictures; Khata holds a "?" sign; "answers next lesson" as a calendar-flip icon.
- duration: 20s
- voiceover: s11 (Line 11)
- learning: Retrieval practice; answers open Lesson 7.
- transition_out: Khata closes; its cover shows "7" → next-lesson tease
- status: outline

**Visual.** Card 1: tea-leaf + milk + sugar icons + `₹6,000` (T4, cash), two blank lines `Dr ?` / `Cr ?` (calendar leaf `2`).
Card 2: the `key` rent slip over the spine with a `?`, and the small equation strip `A + Expenses = …` below it. Card 3 —
the hypothetical — drawn on L4's **dashed "imagine" card** (same component): SMS card **`DEBITED`** (no amount) + a bill
icon (Lucide `receipt`) + Meera's Khata with `Bank` on a blank line over the spine, `?`. No name, no date, no amount — it
hasn't happened. Question numbers only; VO carries the words. Description/pinned comment carries the written questions.

**Answers (for Lesson 7's "Last time"):** 1 — Dr Stock 6,000 / Cr Cash 6,000 (T4; T12 is L7's solo). 2 — An expense shrinks equity; moved
across the equals sign it sits on the left with the assets. 3 — Credited (Bank is an asset; it shrank).

## Scene 12 — Next time

- scene: Afternoon at the stall. A woman in a blazer with a fat file folder (Meera's CA friend) arrives; rule cards fan out of the folder at Meera; freeze on Meera's wide eyes; Khata's "7" cover slams over.
- duration: 11s
- voiceover: s12 (Line 12)
- transition_out: Khata cover closes → end card
- status: outline

**Visual/Motion.** `--scene-saffron`. CA friend (new asset — shared with L7) walks in from the right (`walkTo`). On
"Debit the receiver! Credit the giver!" two gold-edged rule cards flick out of her folder (icon cards: hand-receiving +
blue `Dr`; hand-giving + orange `Cr`) and land in front of Meera. Freeze-frame (slight 4 % zoom), cover with "7" slams
shut. SFX: `paper_slide` ×2, `book_thump`.

## Scene 13 — End card (12 s, no VO)

- scene: L1 `s11` layout: series wordmark ("Double Entry, Single Chai"), "Up next" card — `Lesson 7` / `The Golden Rules,` / `Decoded` with a small gold rule-card illustration — two blank paper panels right for YouTube end-screen videos, Khata waving.
- duration: 12s
- voiceover: —
- transition_out: music tail, fade
- status: outline

**Visual/Motion.** Reuse L1 `s11` exactly (cover swings open onto the card; Khata hops, waves twice, winks). No subscribe
circle, no credit line, no channel branding.

---

## New kit assets

- **The Bank** — friendly building character: columns for legs, pediment eyebrows, door mouth, dot eyes; holds props. (Scenes 1, 8; reused in L7.)
- **Bank ledger** — the Bank's own big book, grey-blue cloth, square corners, no face, no string — visibly a different object from Khata; both pages writable (vault Dr line + Meera's Chai Cr line) (Scene 8).
- **Vault** — a small paper safe behind the Bank; the notes land in it (Scene 8). Lucide `vault` as its icon on the ledger line.
- **Phone + SMS card** — hand-held phone with a white SMS card (bank icon, `A/c XX12`, one bold line). Variants: `CREDITED ₹15,000` (Scenes 1, 8) and `DEBITED` with no amount, on L4's dashed "imagine" card (Scene 11; L7 s2 reuses it).
- **Letter tiles** — square paper tiles, blue / orange variants, for `D E A D` · `C L I C` (Scene 7).
- **Drawings tile** — blue `D` tile with Lucide `wallet` + a faint calendar leaf `30` (Scene 7; 3 s). No jar.
- **Flip chip** — a two-faced chip (`Revenue` / `Income`) with the scaleX flip (Scene 7).
- **Equation strip** — the L4 s6 strip component (`A = L + Capital + Revenue − Expenses`) with per-term chips, a liftable `−Expenses` chip that flips sign mid-flight, and a tick to `A + Expenses = L + Capital + Revenue` (Scene 6; L8 reuses the move for Drawings).
- **Equity card with two pockets** (Capital | Profit) unfolding from Meera's face-tag — the L4 component (Scene 6).
- **Rule card (icons)** — two rows `↑ map-pin` / `↓ ↔`, no words (Scenes 4a–6).
- **Map-pin medallions** — blue / orange `map-pin` for the home sides (Scenes 4a–6, 9, 10).
- **Dashed "imagine" card** — L4's hypothetical frame (Scene 11).
- **Aman + samosa cart** — if not already built for L3/L5 (Scene 2 table header).
- **CA friend** — woman in a blazer, specs, fat file folder (Scene 12; main role in L7).
- **Lucide icons to inline** (if not already in `icons.js`): `map-pin`, `wallet`, `key`, `shopping-cart`, `landmark`, `vault`, `receipt`, `thumbs-up`, `thumbs-down`, `hand-coins`, `handshake`, `undo-2`. (`house` and `store` retired, §5.12.)

## New SFX

- none required. `rise_three` (soft) is reused on the rearranged equation (Scene 6). (Optional: a soft `paper_tear` for the divider seam into Scene 8; `paper_slide` works as a fallback.)

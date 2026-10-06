# Production needs — L2–L14 (collected from each STORYBOARD.md)

Build order suggestion: shared rigs first (used across many lessons), then per-lesson props.

## Shared across lessons (build once)

- **scaleRig** — animatable balance scale: pans with jars/tags, totals, equation strip, corner mode (L3 → L14)
- **Aman + samosa cart** — every checkpoint (L3, L5, L7, L11, L14)
- **Gopal (dairy)**, **Bank building / Bank character**, **Infotech office + Priya**, **CA friend**, **Raju**
- **Profit / Cash gauges** with stepped needles (L5, L10, L14)
- **Calendar strip / page** — flips to a date, time-lapse, rewind (L3, L5, L10, L14)
- **Two-pocket equity jar** (Capital | Profit) (L4 → L13)
- **Journal card** with golden-rule tag chips (L7 → L11) · **ledger page** with b/d, c/d (L9 → L11)
- **Phone with SMS / UPI cards** (L5, L6, L13) · **instant camera** (L12, L13) · **napkin + paper confetti** (L9, L10)
- **Checkpoint banner + pause disc + worksheet card** (all checkpoints)
- Lucide icons to add: landmark, milk, clock, store, pause, file-text, flag, flame, key-round, school, cake, mail, clipboard-list, trending-down, tag, search, file-down
- New SFX: scale_creak, scale_settle, page_flip, needle_tick/gauge_tick, upi_chime, checkpoint_sting, click_lock, pencil_scribble, envelope_drop, coin_pour, ticket_tear, twine_tug, dawn_birds, fryer_sizzle, wind_gust, page_flurry, pen_tick, weight_clunk, freeze_stop
- Pronunciation dictionary (ElevenLabs): rojmel, taraazu, Infotech, UPI, galla, khata, bahi-khata

## Per-lesson lists (verbatim from storyboards)

### 02-what-you-have

#### New kit assets

- **Blank hanging tag + string ("claim string")** — paper tag that can hold a `faceTag`, with a string that can be
  drawn (stroke-dash reveal) from the tag to a character's hand anchor. Used again in L3 for the scale's right pan.
- **Cart outline (chalk ghost)** — tone-on-tone line version of kit `stall` without face/galla, plus a 40 % ghost fill
  state.
- **Dawn band** — flat saffron paper strip that rises behind a tone-on-tone skyline (no gradient), and a paper moon.
- **Bar pair** — two paper bars that grow from a baseline (left blue, right orange split into stacked blocks with face
  tags) + a level line. Seeds L3's scale; reusable in L13 (balance sheet).
- **Gopal Dairy milk cans** (prop, two aluminium cans) and Lucide `milk` icon (add to `icons.js`).
- **Scooter** (prop; Lucide has no good scooter — paper cut-out side view).
- **Unpaid bill card** — kit `card`/`slip` with `receipt` + Lucide `clock` (add `clock` to `icons.js`).
- **Little "worker" arms on a note bundle** (Scene 6 gag) — two rubber-hose arms attachable to kit `bundle`.
- **Cart-wala** — kit `merchant` re-dressed (vest, cap) standing; reused in L3's cold open.
- **Price tag** on a string (`₹36,000`).
- Title-sting text: `Lesson 2` / `What You Have, What You Owe`; end-card "Up next" text for Lesson 3.

#### New SFX

- `twine_tug` — "a short soft twine string pulled taut, paper tag flick, close" (~0.5 s).
- `dawn_birds` — "two or three soft morning birds chirping over a quiet Indian street, very light" (ambience, ~6 s).

### 03-scale

#### New kit assets

- **`scaleRig`** (the course's main device, needed from here to L14): kit `scale` made animatable — beam rotation
  (`tilt(tl, t, deg)`, ≤ 6°, smooth), pans that follow the beam and carry child groups (jars on the left, tags on the
  right), pan tints (blue/orange), pan labels, pan-total tickers, an equation strip under it, a "level line" flash, and
  a HUD mode (shrink to top-right, ~25 %). No idle sway.
- **"Which two things changed?" device** — two dashed slots + cream veil + chip-fill animation, reusable all course
  (bible §5.3). Mini version for the checkpoint cards.
- **Equipment jar** — kit `jar` with a paper cart sticker inside. **Stock jar** = kit `jar` contents `leaves`.
- **Gopal** — dairy owner (new character rig, or kit `merchant` re-dressed: white kurta, cap) + milk cans from L2 +
  small hand-cart.
- **Aman** — new character rig (early 30s, checked shirt, orange gamcha) — reused in every checkpoint (L5, L7, L11, L14).
- **Samosa cart** with kadhai/fryer and a samosa pile; **sacks** (potatoes, flour) + oil tin.
- **Mini scale** — `scaleRig` at ~0.3× with pictogram slot and arrow pair (↑↑ ↓↓ ⇄ ⇄).
- **Checkpoint banner** — paper ribbon + flag icon, text `Checkpoint 1` (reused with 2–5).
- **Pause disc + worksheet card** for the pause-the-video moment (reused in every checkpoint).
- Lucide icons to add to `icons.js`: `landmark` (bank), `store` (Sharma Kirana), `pause`, `file-text` (worksheet),
  `flag` (banner), `clock` (pay later; also in L2), `milk` (also in L2).
- Calendar strip/chip with page-flip (L1 s07 has a calendar strip — needs a flip-to-date method).
- Title-sting text: `Lesson 3` / `The Scale That Never Tips`; end-card "Up next" text for Lesson 4.

#### New SFX

- `scale_settle` — "small brass balance scale pans settling level, a soft single metallic chime, gentle" (~0.8 s).
- `scale_creak` — "brass balance beam tilting, a short soft creak, subtle" (~0.6 s).
- `checkpoint_sting` — "short playful game-show fanfare, marimba and claps, two seconds, friendly" (~1.8 s).
- `fryer_sizzle` — "samosas frying in a kadhai, gentle oil sizzle, short" (~1.5 s).

### 04-making-money

#### New kit assets

- **Scale rig (animatable)** — `K.scale` is build-time only (`tilt` is static). Needs a rig: beam rotation about the
  pivot with pans counter-rotating to hang level, pan contents as child groups, `tip(tl, t, deg)` and `settle(tl, t)`
  (one damped settle, then still). Probably shared with L3 — reuse if L3 already adds it.
- **Equity jar with two pockets** — a `K.jar` variant with a paper divider: `Capital` | `Profit`, each pocket able to
  hold slips; label tickers on the jar.
- **Calendar strip** (bible device §5.7) — top-of-frame April strip with a highlighted date; tear-off / flip of the
  current page; fast stepped flip for time-lapse.
- **Landlord** — reuse `K.merchant` (white kurta) + a key-ring prop; no new character needed.
- **Gopal** (Gopal Dairy owner) — new character (bible §4), or a `K.merchant` re-colour with a milk-can prop.
- **Aman + samosa cart** — new character and cart (probably also needed by L3's checkpoint; reuse if it exists).
- **Infotech office building** — tone-on-tone tall building with a window row (also used in L5).
- **Gas cylinder** prop (red cylinder cut-out).
- **"Imagine" card style** — dashed border + thought-cloud corner (marks hypotheticals that are not in the books).
- **Icons** (Lucide, paper-icon treatment): `landmark` (bank), `flame`, `key-round`, `clock` — not in `icons.js` yet.

#### New SFX

- `scale_creak` — small brass balance tilting, a soft metallic creak, short (tip + settle).
- `page_flip` — single calendar page flipping, quick (the bible's "page flip" — not in L1's library).

### 05-profit-not-cash

#### New kit assets

- **Gauge rig (animatable)** — `K.gauge` draws a static needle (`frac` at build time). Needs a rig with a rotatable
  needle group pivoting at the hub, `set(tl, t, frac)` with one small settle, a number ticker slot under it and
  optional sub-chips (Galla / Bank). Two instances: `Profit` (`trending-up`) and `Cash` (`coins`).
- **The Bank** — friendly building with columns for legs (bible §4; L6 needs it too).
- **Infotech office building** — tall tone-on-tone building with a window row that can light window by window
  (shared with L4's tease).
- **Gopal** — Gopal Dairy owner with milk cans (bible §4; also appears in L4 Scene 6).
- **Aman + samosa cart** — shared with L3/L4 checkpoint scenes; the cart has a small bell.
- **Catering customer** — reuse `K.person` with new colours + a party-tray prop.
- **Phone with SMS screen** — a smartphone cut-out whose screen can show a paper SMS card (tease; L6 cold open reuses it).
- **Calendar strip** (shared with L4) — needs a reverse flip ("rewind") as well as forward flips.
- **Scale rig (animatable)** — corner-HUD use; shared with L3/L4.
- **Icons** (Lucide, paper-icon treatment): `landmark`, `clock`, `school`, `cake`, `pause` — not in `icons.js` yet.

#### New SFX

- `needle_tick` — small mechanical gauge needle settling, a soft click.
- `upi_chime` — short, friendly phone payment-received chime (generic, not a real app's sound).
- `scale_creak` / `page_flip` — as listed in L4.

### 06-debit-credit

#### New kit assets

- **The Bank** — friendly building character: columns for legs, pediment eyebrows, door mouth, dot eyes; holds props. (Scenes 1, 8; reused in L7.)
- **Bank ledger** — the Bank's own big book, grey-blue cloth, visibly different from Khata (Scene 8).
- **Phone + SMS card** — hand-held phone with a white SMS card (bank icon, `A/c XX12`, one bold line). Two variants: `CREDITED ₹15,000`, `DEBITED ₹8,000` (Scenes 1, 8, 11).
- **Mini T-account page** — an account's own small page: `smallBook` opened flat with a "T" rule, left/right amount slots and a balance ticker (Scene 4; heavily reused from L9).
- **Letter tiles** — square paper tiles, blue / orange variants, for `D E A D` · `C L I C` (Scene 7).
- **Equity jar with two pockets** (Capital | Profit) and **pipe** connector — if not already built for L4 (Scene 6).
- **Aman + samosa cart** — if not already built for L3/L5 (Scene 2 table header).
- **CA friend** — woman in a blazer, specs, fat file folder (Scene 12; main role in L7).
- **Lucide icons to inline** (if not already in `icons.js`): `house`, `landmark`, `thumbs-up`, `thumbs-down`, `handshake`, `undo-2`, `store`.

#### New SFX

- none required. (Optional: a soft `paper_tear` for the spine-splits-the-frame seam into Scene 8; `paper_slide` works as a fallback.)

### 07-golden-rules

#### New kit assets

- **CA friend** — woman in a blazer, specs, fat file folder; acting set incl. "flick card" pose (Scene 1; also L6 tease).
- **Meera `dizzy` expression** — spiral-eyes face set; spirals turn in two stepped quarter-turns, then hold (Scene 1).
- **Gold-edged rule card** — `card` variant with a `--khata-gold` border, family medallion top-left, two tag-chip rows (Scenes 1, 5, 8).
- **Tag chips** — small rounded chips `Family · rule` with the family medallion (6 variants); these become L8's journal-line tags.
- **Family trays** — three shallow paper trays with medallions `user` / `package` / `receipt` (Scenes 4, 7).
- **Split-screen gold frame + lock seal** — gold frame for the golden-rules camera, round gold seal for each match (Scenes 6, 9).
- **The Bank** — from L6 (Scene 7, 11).
- **Aman + samosa cart** — if not already built for L3/L5 (Scene 12).
- **Big pause icon** — round two-bar pause medallion for the checkpoint (Scene 12; reuse for L11, L14).
- **Paper tissue** — for the L8 tease (Scene 13).
- **Lucide icons to inline** (if not already in `icons.js`): `user`, `package`, `receipt`, `landmark`, `hand-coins`, `pause`.

#### New SFX

- `click_lock` — short, crisp paper/wood click for two entries locking together in the split screen (Scenes 6, 9; reuse in L8+ whenever a journal entry "balances").

### 08-journal

#### New kit assets

- **Journal card** (shared device for L8–L11): white card, khata-red header strip, four ruled columns (Date · Particulars ·
  Dr ₹ blue strip · Cr ₹ orange strip), row write-on helper, indented "To" rows, narration row. Could be built on
  `K.card` + `K.rows`.
- **Golden-rule tag**: small paper luggage tag with thread + hole, blue (Dr) / orange (Cr) tint, 2–3 words (`K.label`
  variant).
- **Aman** (character) + **samosa cart** (shared with L3/L5/L7/L11/L14 checkpoints).
- **Raju** (Meera's helper) — character; cast list has him, kit doesn't yet.
- **Tissue** (soft cream square with scribbles; flutter pose) + **tissue box**.
- **Wind lines** (three paper streaks).
- **Purse** for Meera (strap + `shopping-bag` icon).
- **Expense jar** label variant + **Equity jar with two pockets** (Capital / Profit) — if L4 already built it, reuse.
- **Icons:** `landmark` (bank), `pencil` (if the pencil prop isn't drawn) — add to `icons.js` from lucide-static.

#### New SFX

- `wind_gust` — short soft gust of wind, papery, ~1.2 s.
- `pencil_write` — short pencil on paper (optional; `quill_scratch` trimmed short is the fallback).

### 09-ledger

#### New kit assets

- **Ledger page / T-account** (shared device for L9–L11): open mini-Khata with account label, blue `Dr` / orange `Cr`
  header strips, row helper (`date · other account · amount`), total rule, `Balance c/d` / `Balance b/d` rows, side
  chips `Debit balance` / `Credit balance`. Built on `khataRig` pages (`pageContent`) or `K.smallBook` opened.
- **Journal card** (from L8) + **journal strip** (one journal line as a flying paper strip) + **ink tick** (`check`
  icon, ink-coloured).
- **Shelf** (two-tier, tone-on-tone) for 14 small books; **14 account jars** (reuse `K.jar` with labels).
- **Balance weight-chip** (cream rounded tab that can hold `?` or a number).
- **Gopal** — merchant rig re-dressed (white cap) + **milk can** prop.
- **Napkin** (L10 shares it) and **confetti popper** (L10 shares it).
- **Icons:** `landmark` (bank), `umbrella` is a kit piece (use it as the loan book's cover icon), `milk` (lucide
  `milk`) for Gopal's book.

#### New SFX

- `page_flurry` — rapid flipping through a paper notebook, ~1.5 s.
- `pen_tick` — quick pen tick-mark on paper, very short.
- `weight_clunk` — soft wooden clunk of a weight settling on a scale pan.

### 10-month-end

#### New kit assets

- **Napkin** — a white paper napkin card with a crumpled edge and pencil lines (can be a `slip` variant with
  a torn edge + 4–7 line slots).
- **Paper confetti** — 6–8 flat coloured cut-out rectangles/strips (can be built from `cutRect` in-scene).
- **Envelope** — folded paper envelope that opens into a `card`.
- **Calendar strip** (bible device 7) — April 1–30 strip, `30` circled; plus small `April` / `May` calendar-page bins.
- **Month tiles strip** — 36 (and 48) small paper tiles in groups of 12 with year markers `1 2 3 (4)`.
- **Clipboard** — card with a clip + `clipboard-list` icon for the stock count.
- **Stock packets** — tea / milk / sugar paper packets that stack inside the `jar`.
- **Price tag on string** — small swinging paper tag for the cart.
- **Gauges labelled Profit / Cash** — if not already built for L5, two `gauge`s with a ticker underneath.
- **Lucide icons not yet in `icons.js`:** `mail`, `clipboard-list`, `trending-down`, `tag`, `hourglass` (optional).

#### New SFX

- `pencil_scribble` — pencil scribbling a short line on paper, quick.
- `freeze_stop` — soft whoosh that halts abruptly, like time freezing (gentle, not a record scratch).
- `envelope_drop` — paper envelope slapping softly onto a wooden counter.
- `gauge_tick` — small mechanical needle click-down on a dial.
- (`page_flip` is named in the bible's SFX vocabulary; if it isn't in `assets/sfx/` yet, generate it.)

### 11-trial-balance

#### New kit assets

- **Aman** — character (Meera's friend, samosa cart owner) — needed by every checkpoint lesson (L3/L5/L7/L11/L14);
  build once if not already built for L3.
- **Samosa cart** — small cart with a kadhai/fryer and a samosa tray (checkpoint set piece, shared with L3/L5/L7/L14).
- **Magnifier** — hand prop for Meera (cold open + ₹5,000 hunt).
- **Two-column sheet** — Khata open as a trial balance: `Debit`/`Credit` header strips, up to 12 rows a side,
  totals bar with two tickers (reused by L12/L13 as the source of report lines).
- **Paper pause symbol** — two cream bars on a coloured disc.
- **Bank medallion / Bank character** — if not built for L5/L6 (the bible's columns-for-legs building).
- **Lucide icons not yet in `icons.js`:** `search` (magnifier sticker), `school` (canteen), `flag` (checkpoint chip),
  `file-down` (worksheet chip), `pause`, `scale` (optional, for the recap tile).

#### New SFX

- `page_flip` — if not already in `assets/sfx/` (bible vocabulary; used for books opening).
- `card_deal` — optional: a quick paper card flick for the checkpoint cards and the montage stream (else `paper_slide`).

### 12-profit-and-loss

#### New kit assets

- **Aman** (character rig) + **samosa cart** — shared with the L3/L5/L7/L11/L14 checkpoints (build once).
- **Cinema doorway + velvet rope** (paper set piece, coral-friendly colours) and a tiny **usher cap + paper
  torch** for Khata (`handAnchor` prop), **ticket stub** prop.
- **Instant camera** (paper prop for Khata; reused in L13's cold open).
- **Trial-balance sheet** — 19-strip two-column sheet (from L11; reuse its component), plus a compact
  **P&L card** variant of `filmStrip` with labelled frames.
- **Raju** face tag (if not already built in L8) and **Gopal** not needed here.
- Memory card of L1's night (a `polaroid` holding a reduced render of L1 s01's set).

#### New SFX

- `ticket_tear` — "small paper cinema ticket being torn, quick, crisp, friendly".

### 13-balance-sheet

#### New kit assets

- **Instant camera** (shared with L12 Scene 12).
- **Closing-time stall variant** — `K.stall` with shutter half down, kettle steam off.
- **Two-page spread at full frame** — `khataRig` at large scale with medallion rows on `pageArea` (may only
  need a layout helper, not new art).
- **Bank building** (paper, columns-for-legs from the cast list; probably built for L6) and **Gopal** face tag.
- **Bookshelf** (two shelves, paper) for Scene 8.
- **Claim strings** — paper string strokes from Meera's hand to props (stroke-draw helper).
- **Envelope + calendar chip** (`May`, `May 5`) — likely shared with L5.

#### New SFX

- none (all from L1's library).

### 14-where-did-the-money-go

#### New kit assets

- **Aman** (rig) + **samosa cart** — shared with the L3/L5/L7/L11/L12 checkpoints.
- **Bank building** (paper; columns-for-legs) and a **passbook/phone with UPI sticker** prop.
- **Coin stream** helper — a short burst of paper coins along a path (in and out), for Scene 3.
- **River + plank bridge** set (paper strips) and a **coin token with Khata's eyes** for Scene 5.
- **Cycle loop track** with seven station badges (mostly composed from existing kit: jar, khataRig, card,
  smallBook, scale, filmStrip, polaroid).
- **Calendar page** (`April` / `May`, date tiles) — shared with L10's month-end beats if built there.
- **Office event set** for May 5 (Priya's office: a table with tumblers, two office-worker silhouettes).
- **Neighbour-stall silhouettes** — reuse L1 s01's; add a single "nod" pose.
- **Gold tick sticker** + numbered smallBook spines for the finale card.

#### New SFX

- `coin_pour` — "a short stream of coins pouring into a wooden box, bright, one second".

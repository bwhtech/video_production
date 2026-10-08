STATUS: READY

# Books kit — `books.js` (L8–L14)

Golden-rule tags, JournalCard, journal strip, ledger page, trial-balance sheet, statement cards, weight chip, small-book shelf.
Same contract as `devices.js` (see `RIG.md` → Devices): load **after `devices.js`**, build DOM synchronously, then
`method(tl, t, …)` adds tweens to the paused master timeline at **absolute** time `t` and returns the rig. Call methods **in time
order** per rig (tickers track their current value at authoring time). Every rig has `g` (root), `body`, `enter(tl,t)`,
`exit(tl,t)`, `pulse(tl,t)` and accepts `{hidden:true}`. Writing = stepped clip-wipe on twos (never typewriter); numbers COUNT
(Indian grouping via `K.fmtIN`); settled rows dim to 70 %; no idle motion; flashes are gold paper strips, never glows.

```html
<script src="assets/kit/devices.js"></script>
<script src="assets/kit/books.js"></script>   <!-- extends window.KIT -->
```

Test sheet: `books-test/index.html` (18 s; `cd books-test && ../../with_slot.sh npx --yes hyperframes@0.8.133 snapshot -o snapshots --at 2,3,4.4,6.6,8.9,12,14.9,17.9`).

**Origins.** `(x, y)` = **bottom centre** for journalCard (`anchor:"center"` → centre), ledgerPage, trialSheet, statementCard, smallBookShelf.
= **centre** for ruleTag, journalStrip, weightChip, tickMark. All sizes below are at `s = 1` on the 1920×1080 canvas. Type is
≥ 34 px Baloo 2 in every table cell (so don't scale tables below ~0.95 and keep the floor — use the HUD/dim tricks instead).
`K.RULE_TAGS`, `K.FAMILIES`, `K.ruleGlyph(parent, kind, x, y, k, col)`, `K.famMedallion(parent, fam, x, y, r)` are exported.

## 1. `K.ruleTag(parent, x, y, s, opts)` — icon-first golden-rule chip (bible §5.5) · origin = centre

Promoted from L7's `_l7.js` (`tagChip` + glyphs). `[family medallion][rule glyph on a cream disc][small word]` on a paper chip tinted by
side: Dr blue / Cr orange. Family = `Real` box · `Personal` user · `Nominal` receipt (fixed disc colour each).

`opts`: `rule` (required), `side` (`"dr"|"cr"`, default from the rule), `compact:true` (icons only, 150 × 64 — the journal-card size),
`words:false` (full chip without the word), `word` (override the English word for the dub), `hidden`.

| `rule` | family | glyph | word | default side |
|---|---|---|---|---|
| `real_in` | Real | ↓ into box | comes in | Dr |
| `real_out` | Real | ↑ out of box | goes out | Cr |
| `personal_receiver` | Personal | open palm | receiver | Dr |
| `personal_giver` | Personal | giving hand | giver | Cr |
| `nominal_expense` | Nominal | coins out | expense | Dr |
| `nominal_income` | Nominal | coins in | income | Cr |

Full chip 300 × 86, compact 150 × 64. Members: `appear(tl,t)` (= `enter`), `light(tl,t,{hold})` (cream highlight strip — "the tag on the
discussed line"), `exit`, `pulse`, `side`, `key`. `K.emptyTag(parent,x,y,s,{compact})` = dashed placeholder chip (drop the real one over it).

## 2. `K.journalCard(parent, x, y, s, opts)` — bible §5.9 · origin = bottom centre

White card, khata-red header strip (`title`, default "Journal"), columns **Date · Particulars · Dr ₹ (blue strip) · Cr ₹ (orange strip)** + a tag
column. **1502 px wide** (1332 with `tags:false`), height = `10+62+8+56+rows·72+22` (**662 at `rows:7`**, 734 at 8). Row pitch 72, cells 34–40 px.
`opts`: `rows` (capacity, 7), `tags` (true), `heads:false` (columns ruled but **unlabelled** until `head()` — L8 s4b), `title`, `dateLabel`, `particularsLabel`,
`anchor:"center"`, `hidden`.

| Member | Notes |
|---|---|
| `writeRow(tl,t,spec)` → line | One journal LINE written on behind a pencil sweep: date → `Cash A/c … Dr` (credit lines indented, `To Sales A/c`) → amount **counts** in its column → tag drops. `spec`: `{date?, account, dr\|cr (number), to?, ac?:false (drop "A/c"), tag?:ruleKey, noAmount?, row?, speed?}`. Account = §5.14 registry key. A `date` starts a new entry (ink separator above it). Lines are `{i, y, side, tEnd, tag, tk}` + `hl(tl,t)`, `pulse(tl,t)`, `dim(tl,t,k)` |
| `narration(tl,t,{icon,text}\|"text")` → line | `( icon · ≤2 words )` row, indented under the credit line |
| `entry(tl,t,{date, lines:[…], narration, speed})` → `{lines, narr, tEnd, first, last}` | Whole entry in sequence — **compound entries = several `lines`** (T16: two Dr + one Cr; or any N) |
| `head(tl,t,"all"\|"date"\|"particulars"\|"dr"\|"cr",{stagger})` | column heads drop onto their strips (use with `heads:false`) |
| `highlightRow(tl,t,lineOrIndex,{hold})` · `pulseRow(tl,t,line)` | gold paper strip flash / lift-and-settle on one row |
| `dim(tl,t,upToRowIndex,k=.7)` | settled entries dim to 70 % |
| `tick(tl,t,line)` | ink ✓ drawn in the left gutter (posted) |
| `cellPos(i, "date"\|"particulars"\|"dr"\|"cr"\|"tag"\|"tick")` | **parent-space** point of a cell (aim journal strips / pencil at it) |
| `lines`, `lineY(i)`, `W`, `H` | |

The `A/c` account chip (L8 s4b) is not in this kit — lesson-local.

## 3. `K.journalStrip(parent, x, y, s, {date?, account, dr\|cr, hidden})` — one line as a flying paper strip · origin = centre

760 × 74 paper strip, side-coloured edge, `Apr 30 · Cash A/c Dr · 22,000` (credit: `To X A/c`). `flyTo(tl, t, tx, ty, {dur=.7, k=1, arc, rot})`
glides on a smooth arc to the **parent-space** point (`k` = scale on landing — strips narrow as they fly; chain calls, it tracks position) ·
`holdUntil` = landing time · `enter/exit`. Target `ledger.cellPos(side, row, "amt")` or `card.cellPos(i, "particulars")`.

## 4. `K.ledgerPage(parent, x, y, s, opts)` — T-account on an open mini-Khata · origin = bottom centre of the book

Red cloth cover, two cream pages, spine; **1552 px wide**; height **752** at `rows:8` (+ ~92 for the label above). Account label (paper
chip, `icon` medallion) across the spine top. `opts`: `account` (§5.14 key), `icon` (Lucide name), `rows` (8 posting rows; the page also reserves the
total line + the b/d line), `labelHidden`, `write:true` (rows write on instead of dropping), `hidden`. Left page = **Dr** (blue strip), right = **Cr** (orange).

| Member | Notes |
|---|---|
| `post(tl,t,side,{date, other, amount, write?, row?, count?})` → row | one row = `date · other account · amount` (amount counts). `side` `"dr"\|"cr"` (or `"L"\|"R"`). Row: `{side,i,y,tEnd,tk}` + `hl/pulse/dim`. One row per journal line — a compound entry posts several rows |
| `balance(tl,t,{cd?, side?, date?})` → row | `Balance c/d` ↓ on the **smaller** side (`cd` defaults to the difference of what was posted; `side` defaults to the smaller one) |
| `total(tl,t,{amount?, dr?, cr?, row?})` → `{dr,cr,tEnd}` | ink double rule across both pages on the same line (just under the longer side) + `Total` counts (default = larger side) |
| `broughtDown(tl,t,{date="May 1", amount?, side?})` → row | `Balance b/d` ↑ on the opposite side, the line after the total |
| `sideChip(tl,t,"debit"\|"credit",{text})` | `Debit balance` (blue, over the left page) / `Credit balance` (orange, over the right) |
| `tick(tl,t,row)` | ink ✓ in the row's left margin |
| `highlight(tl,t,row)` · `dimRows(tl,t,k=.7)` · `tieLabel(tl,t)` | |
| `cellPos(side,i,"amt"\|"other"\|"date")` · `sum(side)` · `rows.dr/cr` · `pages` | |

Author in time order: post rows → `balance` → `total` → `broughtDown` → `sideChip`.

## 5. `K.trialSheet(parent, x, y, s, opts)` — Khata open as a trial balance · origin = bottom centre

Same book frame; `Debit` (blue) / `Credit` (orange) strips; **1552 wide × 954 tall at 12 rows** (60 px rows, 42 px names / 40 px amounts, `₹` tickers);
totals bar at the foot. `opts`: `rows` (12), `drLabel`/`crLabel`, `dim:false` (don't dim settled rows), `hidden`. For > 12 rows use two stages.

| Member | Notes |
|---|---|
| `addRow(tl,t,side,{account, amount, icon?, row?, dur?, count?})` → row | drops in, amount counts; the previous row on that side dims to 70 %. Row: `{side,i,y,ticker,tEnd}` + `hl/pulse/dim/light` |
| `fill(tl,t,[{side,account,amount}…],{step=.14})` → tEnd | quick cascade |
| `total(tl,t,{dr?, cr?, dur})` → tEnd | totals bar drops, **both tickers count** (default = sums of rows added; pass values to override, e.g. a wrong total) |
| `match(tl,t,{hold, exit})` → tEnd | equal-totals beat: gold rings on both totals, `=` disc on the spine, tickers pulse |
| `mismatch(tl,t,{diff})` | coral `≠` disc + difference chip (`search` medallion + counting `diff`) above it · `clearMismatch(tl,t)` |
| `dimRows(tl,t,k)` · `sum(side)` · `cellPos(side,i)` · `tickers.dr/cr` | |

## 6. `K.statementCard(parent, x, y, s, opts)` — P&L and Balance Sheet · origin = bottom centre

Own row layout (kit.js `K.rows` is static text — no tickers/reveal). Rows are `{label, value, icon?, bold?, rule?, indent?, head?, side?, total?}`:
`value` number → counts (`₹`, negatives show `−₹`); string → static; `rule:"sub"` = ink rule above + bold (e.g. Gross profit); `rule:"total"` (or `total:true`) = double
rule + cream band + big bold (Net profit / Total) — **profit is always neutral paper, never green**; `head:"Current"` = small section heading; `indent:1`.

- **Plain (P&L)** `opts: {title:"Profit & Loss", sub:"April" (right of the header, Kalam), header:colour (navy), w:900, rowH:62}` → 900 wide, height = `84+14+Σrows+28` (~62 px/row).
- **Balance sheet** `opts: {kind:"bs", leftLabel:"Assets", rightLabel:"Liabilities + Equity", date:"30 Apr", w:1500}` → two-sided: `Assets` blue strip | `Liabilities + Equity` orange strip, `side:"L"|"R"`
  per row (stacked per side in the order given); items with `total:true` align along the shared foot. `30 Apr` (Kalam) in the bottom margin.

| Member | Notes |
|---|---|
| `reveal(tl,t,i,{dur,count})` | row `i` (index in `rows` as given) drops in, value counts |
| `revealAll(tl,t,{step=.4, from, to})` → tEnd | |
| `highlight(tl,t,i)` · `pulseRow(tl,t,i)` · `dimRows(tl,t,upTo,k)` · `cellPos(i)` · `rows[i].ticker` | |

## 7. Supports

`K.weightChip(parent,x,y,s,{value:"?"|number, edge:"dr"|"cr"|colour, prefix, w:210,h:80,size})` — cream tab with a colour edge. `reveal(tl,t,value,{from,count})` flips the
`?` (fake scaleX .35 s) to the number, which counts · `to(tl,t,value,dur)` counts number → number · `lift(tl,t)`. Ticker at `.ticker`.

`K.smallBookShelf(parent,x,y,s,{books:[{icon,name?,col?}…], tiers:[7,7], w:1500, bookW:80, bookH:150, tierGap:230})` — two-tier tone-on-tone shelf (tier 0 = top) of small account books
(red cover, gold band, colour cap, icon disc; **no names on spines**). `stock(tl,t,{step})` books drop on one by one → tEnd · `pull(tl,t,i,{dy,rot})` / `push(tl,t,i)` · `light(tl,t,i)` gold ring ·
`lightAll(tl,t,{step})` · `bookPos(i)` parent-space · `books[i].g`.

`K.tickMark(parent,x,y,s,{color,w})` — ink ✓ stroke; `draw(tl,t,dur)`.

## Example

```js
const jc = K.journalCard(svg, 960, 1040, 1, { rows: 7, heads: false });
jc.enter(tl, 0.1);
const e = jc.entry(tl, 0.5, { date: "Apr 30",
  lines: [{ account: "Cash", dr: 22000, tag: "real_in" }, { account: "Sales", cr: 22000, tag: "nominal_income" }],
  narration: { icon: "coins", text: "Cash sales" } });
jc.head(tl, 1.9, "all");                  // column heads label themselves late
const lp = K.ledgerPage(svg, 960, 1030, 1, { account: "Cash", icon: "coins" });
const row = lp.post(tl, 5.0, "dr", { date: "Apr 30", other: "Sales", amount: 22000 });
lp.tick(tl, row.tEnd, row);
lp.balance(tl, 6.7); lp.total(tl, 7.3); lp.broughtDown(tl, 8.2); lp.sideChip(tl, 8.5, "debit");
```

## Notes / gaps

- Text widths are estimated (0.52 em) for layout, never for clipping; account names up to ~25 characters fit the ledger / journal cells.
- Row positions in a ledger/sheet are fixed slots (so totals line up); rows are not auto-scrolled — split into two stages past capacity.
- No pencil prop: use `cellPos()` + `line.t0/tEnd` to drive Khata's / Meera's pencil.

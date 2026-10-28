# ERPNext Implementation — transcription log

**Course:** ERPNext implementation best practices. Presenter **Umair Sayed** (Frappe).
Running case study: **James / Gizmo World**, a US consumer-durables retail + trading
business, implemented by Frappe partner **Nexus Solution**.

- **Sources:** `/Volumes/Extreme SSD/ERPNext Implementation/Screen Flow Exports for Edit/`
- **Transcripts:** `/Volumes/Extreme SSD/ERPNext Implementation/edit/transcripts/`
  (`edit/transcripts` in this repo is a **symlink** there — internal disk runs near-full)
- **Engine:** ElevenLabs Scribe v1 — verbatim, word timestamps, diarized, `--language en`
- **Driver:** `edit/run_batch.py` (wraps video-use `helpers/transcribe.py`, cached per file)

> **Transcripts are verbatim takes, not scripts.** Every file contains retakes,
> self-corrections, and Hindi/English director chatter between the presenter and
> the crew. The usable narration must be selected out at edit time. Per-file
> retake notes are in the tables below.

## Batch 1 — sf-wa-001 … 010 ✅ complete

10/10 transcribed in 154s, 24,082 words.

| # | File | Dur | ✔ | Content | Notes |
|---|---|---|---|---|---|
| 1 | sf-wa-001 | 9:38 | ☑ | Course intro + **What is ERP**. Highway truck-jam story (a real ERP failure that blocked factory gates). Crowded single-counter shop → separate counters per step = process streamlining. Maps counters to ERPNext docs: Quotation → Sales Order → Sales Invoice → Delivery Note. "ERP = virtual instance of a company." | Intro shot **3×**; third take is clean. Long director block mid-file re: hand gestures. Fumbles on "process reengineering" vs "streamlining" — final wording is *streamlining*. |
| 2 | sf-wa-002 | 9:32 | ☑ | **Why implementations fail.** Software is only 30–40% of the work; rest is people + process. "Mom explaining symptoms to a doctor" analogy for customers who can't articulate problems. Two real Frappe failures: Delhi perfume manufacturer (hostile founder), Middle East hardware integrator (400 pages of requirements, no sign-off). Org-readiness checklist. Overstocking/understocking worked example → item-code logic, reorder level, approval matrix. | Heavy retakes on the **"data dumping tool"** line (4×). Ends mid-thought — continues into 003. |
| 3 | sf-wa-003 | 4:13 | ☑ | **Case study setup.** James founds Gizmo World, outgrows his basic accounting app, hits scalability pain (bad service, wrong/faulty deliveries, cash-flow crunch). Friend Jonith recommends ERP → discovers ERPNext → contacts Frappe RM **Mahima** → partner **Nexus Solution** aligned. Consortium = Frappe + customer + partner. | Long retake block on grammar: *"suggested James"* vs *"suggested to James"*. Consortium line shot 3×; last take is best (expressions). Note: Jonith's pronoun is inconsistent in the takes ("his friend Jonith… **She** shared **her** experience") — **needs a decision at edit**. |
| 4 | sf-wa-004 | 8:57 | ☑ | **Meeting the customer.** ERP-as-marriage framing. On-site visits surface unarticulated needs (manual serial entry at billing counter; uncoded racks/bins). Don't pitch product — listen and ask. Cash-flow probing questions. Prioritize modules by pain, not by module list. Partner **Mihir** trust anecdote. Validating readiness: demand a **project champion**, master data, agile buy-in. | Several restarts around "listening/listing". Fast-delivery retake on the "validate the readiness" heading. |
| 5 | sf-wa-005 | 4:01 | ☑ | **Documentation.** Proposes just two docs instead of the usual BRD/fit-gap/solutioning stack: **as-is** (current state, org chart, gaps) and **to-be** (proposed solution, workflows, restructuring/hiring needs). Sign-offs. Agile + **POC** to win the early-go-live argument. | Says *"link of this document in the description below"* — **sample as-is/to-be docs must be sourced for the description.** Cuts off mid-sentence at the end. |
| 6 | sf-wa-006 | 1:49 | ☑ | **Escalations.** Customer says partner didn't deliver; partner says customer kept changing scope. "Trust the surgeon on the table" analogy. Partner must gain confidence and be willing to say **"No"**; partner drives the plan around customer priorities. | Shortest file. Scribe mis-transcribes "go live" as **"Django live"** — caption fixup needed. |
| 7 | sf-wa-007 | 16:07 | ☑ | **First product demo — Project module.** Creates "Gizmo ERPNext Implementation" project from a template (3 ship: enterprise / SMB / simple ERPNext implementation). 80+ tasks auto-created. Task assignment, status (working/completed + completion date), timesheets, progress reporting — **including blockers**, shared with champion *and* sponsors. Plugs Frappe partner maturity program. | **Messiest file.** ~4 min of setup chatter before content starts. Mid-take UI failures: Holiday List required a 2025 entry; delete permission missing; a stray sidebar opened on window switch forcing a redo. Salvageable narration is in the back half. |
| 8 | sf-wa-008 | 3:01 | ☑ | **Frappe Cloud.** New site: pick app, version, server region, plan, subdomain (Gizmo World), accept terms. Site dashboard — daily usage and performance/compute charts. Points to frappe.io/cloud and the Frappe School course. | Clean. One aborted "set up site" button demo — presenter switches to "let's assume you have a site". |
| 9 | sf-wa-009 | 33:08 | ☑ | **Masters vs transactions** — bouquet analogy (each master is a flower). Healthy masters → accurate transactions → usable MIS. v16 icon dashboard. **Company master**: 4 legal entities (Gizmo Global holding → India, UK, World), tree view, out-of-the-box **consolidated financial statements** — directly solves the customer's manual-consolidation problem. **Chart of Accounts**: per-company, 4 groups (asset/liability/income/expense), add child ledgers (kitchen equipment fixed asset, Citibank bank account, Middle East debtor in a different currency). Key point: ERPNext needs **one receivable ledger for all customers**, not one per customer. Chart of Accounts Importer. **MIS masters**: territory (USA regions, New York subdivided), customer group, supplier group, item group (tree, extensive: products → computer peripherals/accessories, electronics → audio/home theatre, laptops, mobile phones). | **Longest and most retake-heavy file (7,953 words).** Chart-of-accounts intro attempted ~6× before landing. Presenter flags *"let's assume"* as an overused filler and re-shoots to remove it; same for *"similarly"* → *"likewise"*. A whole segment was re-ordered on the fly — the company-tree problem statement was moved *before* chart of accounts. **Presenter explicitly requests animation** for the "fragmenting the core masters" concept and consolidated reports — graphics work item. |
| 10 | sf-wa-010 | 10:07 | ☑ | **Item master.** Creates "iPhone 17 Pro" under smartphone group. Naming series. Bulk import via Data Import tool. **Serialized items** — has-serial-no + prefix, auto-generates unique serials per unit, solves the locate-a-specific-unit problem. **Barcode** — barcode table on item, scan into Sales Order barcode field to fetch item + price (or serial). **Item variants** — iPhone 15 template + attributes (colour, memory) → multiple variants. | Barcode scanner **failed to register input** mid-demo (laptop stopped taking scanner input); recovered after a pause. Verify the scan actually lands on screen when cutting. |

## Batch 2 — remaining 9 movs ✅ complete

9/9 transcribed in 79s, 12,141 words.

| # | File | Dur | ✔ | Content | Notes |
|---|---|---|---|---|---|
| 11 | sf-wa-011 | 5:02 | ☑ | **Item Price.** Why price is a separate master — New York price list vs "Rest of USA" (transport costs raise the rate). Full Data Import walkthrough: spreadsheet with item code / price / price list → Data Import → Item Price doctype → attach → Start Import → "Go to Item Price List" to verify. | ~1 min of off-topic crew chat at the head (comparing 2 TB portable SSDs) — trim. Scribe writes **"ERPNext" as "YapiNext"** twice → caption fixup. Import-verify beat shot 3×. |
| 12 | sf-wa-012 | 3:49 | ☑ | **Permissions & workflow.** Notes masters not covered (manufacturing: operations, workstation, BOM; HR: department, designation, employee, holiday list, expense claim). **Role Permission Manager** demo on Item doctype — most roles read-only, Item Manager gets create/delete/print/email/report. Then **workflow** on Purchase Order: PO **above $500** must route to Purchase Manager — closes the store-manager-bypass problem raised earlier. | Clean. Callbacks to problems posed in 002 land well here. |
| 13 | sf-wa-013 | 7:54 | ☑ | **Personalization + customization + handover.** Letterhead master (logo + address), fetched into Quotation print, compact print format. **Customize Form** — add a custom **signature** field to Purchase Order via ⋯ → Customize → Add Field → type Signature → Update → refresh. Then handover process: departmental **training**, scenario list, trainee **sign-off**, hands-on entry by users, **UAT sign-off**, staging/test site for parallel entry, and **Delete Transactions** in Company master to clear before go-live. | Grammar retakes on "quotation **with** the company's letterhead". Ends with a clean tease into the opening-entry chapter. |
| 14 | sf-wa-014 | 10:08 | ☑ | **Accounts opening balance.** Balance-sheet primer (asset/liability = BS; income/expense = P&L; opening balances only on BS accounts). Temporary Opening account explained — zeroes out once all openings are correct. Closed/tallying balance sheet ($80,000 both sides) as prerequisite; notes it's **not** mandatory on day one — do cash/bank first if accounts team needs time. **Journal Entry** for electronics 30k, bank 20k, deposits 12k, retained earnings 18k (credit), secured loans; difference plugged to Temporary Opening. Posting date must be 1 Jan. Then **Opening Invoice Creation Tool** for receivables (Google, Tech Retail Solution) and payables (Nvidia, Sony). | **Ends on an unresolved bug:** the balance sheet won't tally — opening invoices were created in the **wrong fiscal year (2025 instead of 2026)**. Presenter catches it on camera; the take stops there. **This chapter needs a reshoot or a pickup for the ending.** |
| 15 | sf-wa-014-b | 7:25 | ☑ | **Stock opening balance.** Migration framing: 31 Dec cutover, new FY starts 1 Jan, system needs stock per warehouse or dispatches get blocked. Identify opening date, prepare data. ERPNext template spreadsheet (item code, warehouse, qty, valuation rate; serial/batch values if applicable). **Stock Reconciliation** with purpose = Opening Stock, upload sheet, submit. Verifies via Stock Ledger — serial numbers and batches auto-created. Closes at **$7,726** total stock value and teases "what is Temporary Opening?" | ⚠️ **Despite the name, this comes BEFORE `sf-wa-014` narratively** — stock opening precedes accounts opening, and 014's outro references stock reconciliation as already done. **Order as 014-b → 014.** |
| 16 | sf-wa-intro-end-content-sequence | 2:55 | ☑ | **Course roadmap.** Enumerates the whole implementation sequence: ERPNext account → company → chart of accounts → MIS masters (customer group, territory, item group) → core masters (customer, supplier, item, warehouse) → personalize (letterhead) → training → UAT → customizations → go-live prep → stock opening balance → accounts opening balance. | This is the **agenda card**, not an ending — despite "end" in the filename. Belongs **early**, right after the intro. Retakes on "the following steps will be" → "the next steps will be". Crew explicitly says *"raw footage रखना"* — keep, reusable elsewhere. |
| 17 | sf-wa-item-master-extra-tbd | 9:17 | ☑ | **Item master — alternate full take.** Same beats as `sf-wa-010`: create iPhone 17 Pro, Data Import for bulk, serialized items (has-serial-no + prefix/hashes), barcode field + scan into Sales Order, item templates & variants. | ⚠️ **Duplicate of `sf-wa-010`, not extra content.** See "Duplicate takes" below — pick one. This take has the **cleaner barcode demo** (010's scanner failed to register input). 010 has slightly better variant explanation (names iPhone 15 template explicitly). |
| 18 | sf-wa-post-implementation | 3:38 | ☑ | **Post-implementation / adoption.** Mumbai customer story — 350 hours, correct setup, users still refused to migrate for 6–7 months until a compliance change forced it. Users have no incentive to learn a new system; needs a management mandate. Account manager must motivate users. **Hard cutoff date — pull the plug on the legacy system**, or users fall back at every blocker. Closes by returning to the customer's original problem: *go-live is not a sufficient goal.* | Strong closing argument. Leads directly into a goals-assessment for Gizmo World — **that assessment segment is not in any transcribed file**; check whether it was shot. |
| 19 | sf-wa-the-end | 2:14 | ☑ | **Outro.** Recommends certification — ERPNext certification (functional consultants), Frappe Framework certification (developers), both on Frappe School. Asks for ratings/feedback. | Ends abruptly and deliberately — crew agree the unexpected non-sign-off is fine ("Unexpected ही है"). Confirm that's the intended ending. |

## Batch 3 — Camera Footage `C0359`–`C0393` ✅ complete

35 facecam clips, 35/35 transcribed. These are the **facecam angle of the same takes** as
the ScreenFlow recordings — same audio, different camera. Transcribed anyway because
cutting the talking-head angle needs word timings in the *camera's* timebase; the mov
transcripts' timestamps don't map.

`C0394`–`C0412` (19 clips) **deliberately skipped** — dated **3–4 May 2021**, four years
before this shoot, ~5.6 min total, mostly 0.5–1s fragments. Unrelated leftover card content.

### Camera clip → chapter map

Generated by `edit/map_camera.py` (5-gram overlap). Score = fraction of the camera clip's
n-grams found in that chapter.

| Camera | Dur | Chapter | Score |
|---|---|---|---|
| C0359 | 15s | — (slate/chatter) | — |
| C0360 | 107s | sf-wa-001 | 0.81 |
| C0361 | 422s | sf-wa-001 | 0.78 |
| C0362 | 584s | sf-wa-002 | 0.66 |
| C0363 | 285s | sf-wa-003 | 0.64 |
| C0364 | 533s | sf-wa-004 | 0.80 |
| C0365 | 247s | sf-wa-005 | 0.93 |
| C0366 | 30s | sf-wa-post-implementation | 0.55 |
| C0367 | 209s | sf-wa-post-implementation | 0.80 |
| C0368 | 113s | sf-wa-the-end | 0.61 |
| C0369 | 106s | sf-wa-006 | 0.85 |
| C0370 | 256s | sf-wa-007 | 0.60 |
| C0371 | 866s | sf-wa-007 | 0.55 |
| C0372 | 166s | sf-wa-008 | 0.95 |
| C0373 | 1317s | sf-wa-009 | 0.76 |
| C0374 | 409s | sf-wa-009 | 0.72 |
| C0375 | 363s | item-master-extra-tbd | 0.81 |
| C0376 | 170s | item-master-extra-tbd | 0.97 |
| C0377 | 579s | sf-wa-010 | 0.73 |
| C0378 | 229s | sf-wa-011 | 0.71 |
| **C0379** | **150s** | **⚠️ no chapter** | — |
| **C0380** | **280s** | **⚠️ no chapter** | — |
| **C0381** | **279s** | **⚠️ no chapter** | — |
| C0382 | 225s | sf-wa-012 | 0.87 |
| C0383 | 82s | sf-wa-012 (weak) | 0.06 |
| C0384 | 455s | sf-wa-013 | 0.88 |
| **C0385** | **77s** | **⚠️ no chapter** (letterhead) | — |
| C0386 | 72s | sf-wa-013 (weak) | 0.05 |
| C0387 | 20s | sf-wa-014-b | 0.77 |
| C0388 | 376s | sf-wa-014-b | 0.68 |
| C0389 | 544s | sf-wa-014 | 0.79 |
| **C0390** | **287s** | **⚠️ no chapter** (accounts opening — the good take) | — |
| C0391 | 2s | — (slate) | — |
| C0392 | 52s | intro-end-content-sequence | 0.72 |
| C0393 | 116s | intro-end-content-sequence | 0.52 |

### 🔴 The ScreenFlow exports are incomplete

Five substantial camera clips match **no** exported `.mov`. The narration exists; the
screen recording was never exported to `Screen Flow Exports for Edit/`.

**1. Customer / Supplier / Warehouse masters — an entire missing chapter.**
`C0379`, `C0380`, `C0381` are three takes of a chapter covering: customer master (create
Google Incorporation, territory USA West, group Large Corporates), contacts (Sundar
Pichai), multiple addresses (Mountain View, California), supplier master, and **warehouse
master** (tree structure, NYC warehouse with racks/bins vs flat Dallas / San Francisco).

This sits **between `sf-wa-011` and `sf-wa-012`** — `011` ends *"let's move to another
fundamental master which is customer"*, and `012` opens *"these masters are sufficient for
us"*. There is no mov covering it. Note `Ch 12 Warehourses.screenflow` exists on the SSD
but was **never exported**. `C0381` is the most complete take.

**2. `C0390` resolves the `sf-wa-014` bug.** The accounts-opening chapter ends mid-failure
in the mov (invoices posted to FY2025, balance sheet won't tally). `C0390` is a **complete
successful take** — the presenter hits the "Due date cannot be before" validation, restarts,
sets posting date 1 Jan / due date 31 Jan, creates receivable and payable invoices, and
lands on a tallying balance sheet: *"assets 80,000… 62 plus 18 gives us 80,000, which
confirms that our assets and liability are tallying just fine."* **The chapter ending is
not lost — it's on camera, just not exported.**

**3. `C0385`** is an alternate letterhead take (quotation print, proposal print format).

**Action: re-export the missing segments from the `.screenflow` projects.** The camera
angle alone can't carry chapters that are screen demos.

## Notes

### ⚠️ Duplicate takes — decision needed

`sf-wa-010` and `sf-wa-item-master-extra-tbd` are **two full takes of the same Item
Master chapter**, not two chapters. The `-extra-tbd` name is misleading. Same script,
same beats, same order.

- **`item-master-extra-tbd` has the better barcode demo** — in `010` the scanner stopped
  registering input mid-take and the presenter has to talk around it.
- **`010` explains variants slightly better** — names the iPhone 15 template explicitly;
  the alternate take is vaguer ("Samsung and iPhone are variants").

Recommend cutting from `item-master-extra-tbd` and lifting the variants beat from `010`,
or just shooting a pickup for variants. **Confirm before editing.**

### ⚠️ Chapter order — `014-b` precedes `014`

Filename order is misleading. Narrative order is **stock opening (`014-b`) → accounts
opening (`014`)**: `014` opens by referring to stock reconciliation as already done, and
`014-b` closes by teasing the Temporary Opening account that `014` explains.

Matches the SSD ScreenFlow project names — `Ch 14 - Stock Opening` and
`Ch 14 - Opening Account Entries`.

### ⚠️ `sf-wa-014` ends on an unresolved bug

The accounts-opening take **does not complete**. The Opening Invoice Creation Tool posted
invoices into **FY2025 instead of FY2026**, the balance sheet doesn't tally, and the
presenter catches it live. Needs a pickup or a reshoot of the ending. Flagging because
it's the final substantive chapter of the course.

### Go-live / hypercare coverage

Searched all 54 transcripts (`edit/search_transcripts.py`) for `hypercare`, `hyper care`,
`AMC`, `SLA`, `post implementation`, `after go live`, `handholding`, `warranty`, `ticket`.

**Hypercare / post-go-live support is not covered anywhere in this course.** Zero hits on
every term. The `support` hits are incidental (Umair's bio, "all-round support" from the
consortium, "management didn't offer enough support"); `maintenance` is a permission role
name in `sf-wa-012`. If hypercare belongs in the course, **it must be shot.**

**Go-live is covered** — 12 mentions in the movs, 10 in camera. Best pulls:

| Chapter | TC | Camera | TC | Line |
|---|---|---|---|---|
| sf-wa-013 | 00:07:18 | C0384 | 00:07:09 | "ready for the go live… delete all the transactions" |
| post-implementation | 00:03:19 | C0367 | 00:03:14 | "**Go live isn't a sufficient goal.** Did this implementation solve the actual business problem?" |
| intro-end-content-sequence | 00:02:29 | C0393 | 00:01:38 | "…configure customizations and preparation for go live" |
| sf-wa-005 | 00:03:19 | C0365 | 00:03:31 | "With the early go live of phase one, you have already solved the most significant problems" |
| sf-wa-005 | 00:02:40 | C0365 | 00:02:53 | "go live with vanilla implementation and only critical customizations" |
| sf-wa-004 | 00:08:02 | C0364 | — | "focus efforts towards early go live" |
| sf-wa-002 | 00:01:43 | C0362 | 00:01:52 | "everything falls like house of cards at go live" |
| sf-wa-006 | 00:00:38 | C0369 | — | "fighting over first go live and discussing milestone dates" (Scribe: `Django live`) |

Earlier timecodes in `post-implementation` (02:55, 03:02, 03:04) and `sf-wa-005` (03:05)
are retake fragments — use the ones listed.

### Missing segment

`sf-wa-post-implementation` ends with *"let's quickly assess the goals we set for
GizmoWorld and assess if we met them."* **No transcribed file contains that assessment.**
Either it wasn't shot, or it's in the Camera Footage / an untranscribed source.

### Chapter order

`sf-wa-NNN` matches narrative order through 013. The `.screenflow` project names on the
SSD line up with the demo files: **007 ≈ Ch 07, 009 ≈ Ch 09 Masters, 010 ≈ Ch 10 Item
Master, 011 ≈ Ch 11 Item Price Import, 012 ≈ Ch 12 Roles/Workflows, 013 ≈ Ch 13
Customisation, 014-b ≈ Ch 14 Stock Opening, 014 ≈ Ch 14 Opening Account Entries.**

`sf-wa-intro-end-content-sequence` is the **agenda card** and belongs early, not at the
end — the filename misleads.

### Structure

Files 001–006 are pure talking-head narration (concepts, no screen). 007 onward are
screen demos. That split matters for layout choices at edit.

### Follow-ups

- Source the sample **as-is / to-be documents** referenced in 005 for the description.
- **Animation requests** (from 009): "fragmenting the core masters", consolidated reporting.
- Link needed: the **accounting-fundamentals video with Hussain** referenced in `014`.
- Caption fixups: `Django live` → `go live` (006), `YapiNext` → `ERPNext` (011).
  Watch for more product-name artifacts.
- Resolve **Jonith's pronoun** inconsistency in 003.
- Confirm the abrupt ending in `sf-wa-the-end` is intentional.

### Session log

**2026-07-20** — Batch 1 transcribed (10 files, 154s, 24,082 words). Internal disk hit
**0 bytes free** mid-session (pre-existing, ~418 GB used; transcripts are only 4 MB) —
blocked all tool execution until space was reclaimed. Transcripts then relocated to the
external SSD with a symlink back into the repo, and `run_batch.py`'s `EDIT_DIR` repointed
at the SSD so future batches never touch internal storage. Batch 2 transcribed (9 files,
79s, 12,141 words) and summarized. **All 19 ScreenFlow exports done — 36,223 words total.**
Structural issues surfaced: duplicate item-master takes, `014-b`/`014` order inversion,
the unresolved FY2025 bug ending `014`, and a missing goals-assessment segment.
Camera Footage not started.

## Batch 4 — `chapter 14 A (end of course) Augst final.mp4` ✅ (2026-09-10)

Delivered edit of **Ch 14 accounts opening + course outro**. 1920×1080 @ 30fps, 7:07,
2,071 words, single speaker, **no retakes, no crew chatter** — already cut.

- **Source:** `~/Downloads/chapter 14 A (end of course) Augst final .mp4` (note trailing space in name)
- **Transcript:** `edit/local/transcripts/sf-wa-014-a-end-of-course.json` + `edit/local/takes_packed.md`
  — written **locally** because the SSD was not mounted (`edit/transcripts` symlink was dead).
  Move to `/Volumes/Extreme SSD/ERPNext Implementation/edit/transcripts/` when it's back.

| TC | Beat |
|---|---|
| 00:04–01:42 | Balance-sheet primer (4 sides, BS vs P&L, Temporary Opening, closed $80k sheet, not mandatory day one). Mentions *"my video with Hussain on accounting fundamentals — link in description"*. |
| 01:42–02:28 | Walk the GizmoWorld balance sheet; stock already done via Stock Reconciliation; receivables/payables get their own tool; rest via Journal Entry. |
| 02:28–03:48 | **Journal Entry**: electronics 30k, bank 20k, deposits 12k (Dr); retained earnings 18k, secured loans (Cr); difference → Temporary Opening. Posting date 1 Jan. Submit. |
| 03:48–04:32 | Balance sheet FY2026 refresh — 60k/60k but 10k mismatch remains. |
| 04:32–06:12 | **Opening Invoice Creation Tool**: sales → Google + Tech Retail Solution 5k each; purchase → Nvidia + Sony split 20k. |
| 06:12–06:22 | Reload → **tallies, Temporary Opening = 0**. ✅ Resolves the `sf-wa-014` unresolved-bug ending. |
| 06:22–07:00 | Ready for go-live → certification pitch (ERPNext cert, Frappe Framework cert, Frappe School) → ratings/feedback → *"Till then."* |
| 07:01–07:11 | Outro music. |

Supersedes both `sf-wa-014` (accounts opening) and `sf-wa-the-end` (outro) — they are
merged into this one file. Graphics candidates: balance-sheet 4-sides diagram, Temporary
Opening "zeroes out" animation, journal-entry Dr/Cr table, tally reveal.

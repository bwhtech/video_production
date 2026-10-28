# ERPNext Implementation Best Practices — lesson descriptions

Presenter: Umair Sayed (Frappe). Running case study: James / Gizmo World, a US consumer-durables retailer, implemented by Frappe partner Nexus Solution.

Source videos: `~/Downloads/Umair Course/` (19 files, final cuts). Transcripts cached at `edit/final-cuts/transcripts/`. Every URL below returned HTTP 200 on 2026-09-10.

Links are written as `[label](url)` on purpose: the Frappe LMS lesson editor (EditorJS, default block = its custom Markdown block) converts pasted text to blocks only when the paste contains a heading, list, or code fence, and it only turns `[label](url)` into a link. Bare URLs stay plain text. Paste each list including its `- ` bullets and the links land as real anchors.

Links flagged **TODO** are ones the presenter promises on camera but that do not exist yet (or could not be located) — fill before publishing that lesson.

## Suggested LMS chapters

### Chosen layout (as built on school.frappe.io — course `erpnext-implementation-guide`)

| Video | Lesson on Frappe School | Chapter |
|---|---|---|
| Ch 1 | `14192` Need for an ERP | Before You Implement |
| Ch 1.1 | `14193` Cost of Failure | Before You Implement |
| Ch 2 | `14194` Implementation Best Practices | Before You Implement |
| Ch 3 | `14195` From Growing Pains to ERPNext | Before You Implement |
| Ch 4 | `14196` Know Your Customer | Before You Implement |
| Ch 5 | `14197` Building Trust with the Client | Before You Implement |
| Ch 6 | `14325` Documenting Customer Requirements | Before You Implement |
| — | `14324` AS-IS and TO-BE Examples (links only, no video) | Before You Implement |
| Ch 7 | `14332` Who Drives The Project? | Before You Implement |
| Ch 8 | `14333` Creating an ERPNext Instance | Setting Up The Foundation |
| Ch 9 | `14385` Setting Up Company & Accounts | Setting Up The Foundation |
| Ch 10 | `14386` Understanding Item Master | Setting Up The Foundation |
| Ch 11 | `14387` Importing Item Prices | Setting Up The Foundation |
| Ch 12 | `14388` Customers, Suppliers, & Warehouses | Setting Up The Foundation |
| Ch 13 | `14389` Permissions & Workflows | Control, Personalise, Hand Over |
| Ch 14 | `14390` Customising Prints & Forms | Control, Personalise, Hand Over |
| Ch 15 | `14391` User Training & UAT | Go Live |
| Ch 16 | `14392` Opening Stock Balance | Go Live |
| Ch 17 | `14393` Opening Accounts Balance | Go Live |
| Ch 18 | `14394` Ready to Go Live! #DFTBA | Go Live |

Lesson bodies are EditorJS JSON; each currently holds only a YouTube embed block. Descriptions and links below can be appended as `paragraph` / `header` / `list` blocks via `frappectl -s "Frappe School" doc update "Course Lesson" <id>`.

### Original proposal

| LMS chapter | Lessons | Runtime |
|---|---|---|
| 1. Before You Implement — why implementations fail, and how to work with the customer | 1, 1.1, 2, 3, 4, 5, 6, 7 | ~21 min |
| 2. Setting Up the Foundation — site, company, chart of accounts, and core masters | 8, 9, 10, 11, 12 | ~19 min |
| 3. Control, Personalise, Hand Over — permissions, workflow, letterhead, customisation, training, UAT | 13, 14, 15 | ~7 min |
| 4. Go Live — stock and accounts opening balances, certification | 16, 17, 18 | ~11 min |

Boundaries follow the footage: lessons 1–7 are talking-head only, lesson 8 is the first screen demo; lesson 13 opens with "these masters are sufficient"; lesson 15 teases "next chapter: opening entries"; lesson 16 opens with "the last and most crucial step". For a 3-chapter layout, merge chapter 3 into chapter 2.

### Alternative considered — implementation phases

| LMS chapter | Lessons | Runtime |
|---|---|---|
| 1. Understand the Job | 1, 1.1, 2 | ~9 min |
| 2. Consult the Customer | 3, 4, 5, 6, 7 | ~12 min |
| 3. Configure ERPNext | 8, 9, 10, 11, 12, 13, 14 | ~24 min |
| 4. Go Live | 15, 16, 17, 18 | ~12 min |

Not chosen: chapter 3 becomes a 7-lesson, 24-minute block.

---

## Chapter 1 — Introduction: what is ERPNext, and what is an ERP?

**File:** `Chapter-1-Umair.mp4` (2:51)

### Description

Umair Sayed from Frappe introduces the course: implementation best practices, plus one full implementation flow demonstrated from scratch. Using a crowded single-counter shop, he explains what an ERP does: identify the steps in a process, put them in sequence, link them, and make people accountable. Each counter maps to an ERPNext transaction: Quotation → Sales Order → Sales Invoice → Delivery Note. An ERP is a "virtual instance of a company".

### Relevant ERPNext documentation

- [Introduction to ERPNext](https://docs.frappe.io/erpnext/introduction)
- [Do I need an ERP?](https://docs.frappe.io/erpnext/do-i-need-an-erp)
- [Open source](https://docs.frappe.io/erpnext/open-source)
- [Quotation](https://docs.frappe.io/erpnext/quotation)
- [Sales Order](https://docs.frappe.io/erpnext/sales-order)
- [Sales Invoice](https://docs.frappe.io/erpnext/sales-invoice)
- [Delivery Note](https://docs.frappe.io/erpnext/delivery-note)

### Resources

- [ERPNext on GitHub](https://github.com/frappe/erpnext)

---

## Chapter 1.1 — The product is only one piece of the puzzle

**File:** `Chapter 1.1.mp4` (1:23)

### Description

A true story: a highway jammed by trucks stuck at a factory gate, caused by a failed ERP rollout at a large conglomerate. Even with a good product fit, implementations fail when the organisation's processes and people aren't ready. Example: fix stock pilferage (a process problem) before expecting a stock-tracking system to work.

### Relevant ERPNext documentation

- [Setting up ERPNext (recommended order, go-live checks)](https://docs.frappe.io/erpnext/setting-up)

---

## Chapter 2 — People, process, and organisational readiness

**File:** `Chapter 2.mp4` (4:59)

### Description

Software is 30–40% of an implementation; the rest is people and process. Two real Frappe failures, a Delhi perfume manufacturer and a Middle-East hardware integrator with 400 pages of unsigned requirements, show why understanding the actual business problem matters more than module lists. Includes the organisational-readiness questions to ask before starting, and a worked example (over/under-stocking) that must be solved with item-code discipline, controlled master creation, reorder levels, and an approval matrix. Otherwise the ERP becomes a "data dumping tool".

### Relevant ERPNext documentation

- [Item Codification](https://docs.frappe.io/erpnext/item-codification)
- [Reorder level / auto material request](https://docs.frappe.io/erpnext/reorder-level)
- [Role-based permissions (controlling who creates masters)](https://docs.frappe.io/erpnext/role-based-permissions)
- [Workflows (approval matrix)](https://docs.frappe.io/erpnext/workflows)

---

## Chapter 3 — Case study: James and Gizmo World

**File:** `Chapter 3.mp4` (2:07)

### Description

Meet James, founder of Gizmo World, a consumer-durables retail and trading business. He starts with a basic accounting app, then hits scalability problems as stores multiply: poor service, wrong and faulty deliveries, cash-flow crunch. A friend's ERP experience leads him to ERPNext. Frappe's regional manager aligns a local partner, Nexus Solution, and the consortium of Frappe + customer + partner is formed.

### Relevant ERPNext documentation

- [Do I need an ERP?](https://docs.frappe.io/erpnext/do-i-need-an-erp)

### Resources

- [Frappe partners](https://frappe.io/partners)

---

## Chapter 4 — Meeting the customer: listen, ask, observe

**File:** `Chapter 4.mp4` (2:28)

### Description

ERP implementations are like marriages, so meet the customer in person. Site visits surface problems the customer can't articulate (a clerk manually retyping serial numbers, uncoded racks and bins in the warehouse). Don't lead with a product pitch: listen, acknowledge, and ask where exactly money is stuck: overstock, receivables, credit days, pilferage. Build the implementation plan and demo around those problems only.

### Relevant ERPNext documentation

- [Serial Numbers](https://docs.frappe.io/erpnext/serial-no)
- [Warehouse (racks and bins as child warehouses)](https://docs.frappe.io/erpnext/warehouse)
- [Accounts Receivable report](https://docs.frappe.io/erpnext/accounts-receivable)

---

## Chapter 5 — Prioritise modules, build trust, validate readiness

**File:** `Chapter 5.mp4` (2:53)

### Description

Prioritise modules by the client's pain (stock and accounting before CRM or projects), just as medication varies per patient. Frappe partner Mihir treats his clients' businesses as his own; trust can't be faked. Practical trust builders: share meeting notes, restate the customer's point in their words, share the plan and timely updates. Before starting, demand a project champion, get master data (items, customers, suppliers, chart of accounts, warehouses), and align on an agile approach with early go-live.

### Relevant ERPNext documentation

- [Setting up ERPNext (recommended setup order)](https://docs.frappe.io/erpnext/setting-up)
- [Data Import (for master data hand-over)](https://docs.frappe.io/erpnext/data-import)

---

## Chapter 6 — Documentation: As-Is, To-Be, sign-offs, and agile go-live

**File:** `Chapter 6.mp4` (3:02)

### Description

Instead of the usual BRD / fit-gap / solutioning stack, keep it to two documents. The **As-Is** document captures current operations, department workflows, org chart, legacy systems, and gaps. The **To-Be** document proposes the solution, new workflows, org restructuring or hiring needs: the blueprint of the business after implementation. Record customisation requirements and get them signed off. Use a proof of concept to convince the customer to go live early on a vanilla setup with only critical customisations.

### Links mentioned in the video

- [Example of an AS-IS document](https://suite.frappe.io/writer/w/b20b104bf0)
- [Example of a TO-BE document](https://suite.frappe.io/writer/w/7d332da0ac)
- These two also live as their own lesson in the course: "AS-IS and TO-BE Examples" (lesson `14324`), right after this one.

### Relevant ERPNext documentation

- [Customize Form (scoping customisations)](https://docs.frappe.io/erpnext/customize-form)
- [Setting up ERPNext](https://docs.frappe.io/erpnext/setting-up)

---

## Chapter 7 — Escalations: trust the surgeon, learn to say "No"

**File:** `Chapter 7.mp4` (1:33)

### Description

A typical escalation: the customer says the partner isn't delivering; the partner says the customer keeps changing scope. Both are arguing over go-live dates without agreeing on the problem. Like a patient on the surgery table trusting the doctor, the customer must let the partner drive, and the partner must earn that confidence and be willing to say "No". The partner drives the plan around the customer's priorities.

### Relevant ERPNext documentation

- [Project (tracking the implementation plan)](https://docs.frappe.io/erpnext/project)

### Resources

- [How Frappe partners run implementations: scope, agile phases, sign-offs](https://frappe.io/partner/implementation)
- [A guide to working with Frappe Partners (Frappe blog)](https://frappe.io/blog/community/a-guide-to-working-with-frappe-partners)

---

## Chapter 8 — Creating the ERPNext site on Frappe Cloud

**File:** `Chapter 8.mp4` (1:48)

### Description

The first project task: an ERPNext instance for Gizmo World. ERPNext is open source and can be hosted anywhere; here it's created on Frappe Cloud, Frappe's managed hosting. Walkthrough: New Site → choose apps (optional compliance app) → version → server region → plan → subdomain → accept terms → create. Then the site dashboard with daily usage and performance/compute charts.

### Links mentioned in the video

- [Frappe Cloud](https://frappe.io/cloud)
- [Frappe Cloud documentation](https://docs.frappe.io/cloud)
- **TODO — Frappe Cloud course on Frappe School** (presenter: "a dedicated course on Frappe Cloud on Frappe School"). No such course is currently listed on school.frappe.io; link the Frappe Cloud docs above or confirm the course URL with Frappe School.

### Relevant ERPNext documentation

- [Getting started](https://docs.frappe.io/erpnext/getting-started)
- [Project Template (the implementation-project tasks referenced at the start)](https://docs.frappe.io/erpnext/project-template)

### Resources

- [Frappe School](https://school.frappe.io)

---

## Chapter 9 — Masters vs transactions, Company, and Chart of Accounts

**File:** `Chapter 9.mp4` (7:24)

### Description

ERPNext has two kinds of records: masters (customer, supplier, item, company, warehouse) and transactions built from them, like flowers making a bouquet. Healthy masters give accurate transactions and usable MIS reports. Tour of the v16 icon dashboard, then the **Company** master: multiple legal entities in one account, tree view (Gizmo Global holding → Gizmo India, UK, World), and the out-of-the-box **Consolidated Financial Statement** that solves Gizmo's manual-consolidation problem. Then the **Chart of Accounts**: it determines how the balance sheet, P&L and trial balance look; adding child ledgers (Kitchen Equipment fixed asset, Citibank bank account, a Middle-East receivable in another currency, a new expense account); why ERPNext needs only one receivable ledger for all customers; and bulk import with the Chart of Accounts Importer.

### Relevant ERPNext documentation

- [Concepts and terms](https://docs.frappe.io/erpnext/concepts-and-terms)
- [Company](https://docs.frappe.io/erpnext/company-setup)
- [Company accounting defaults](https://docs.frappe.io/erpnext/company-accounting-defaults)
- [Chart of Accounts](https://docs.frappe.io/erpnext/chart-of-accounts)
- [Account (adding ledgers)](https://docs.frappe.io/erpnext/account)
- [Chart of Accounts Importer](https://docs.frappe.io/erpnext/chart-of-accounts-importer)
- [Accounting reports (incl. Consolidated Financial Statements)](https://docs.frappe.io/erpnext/accounting-reports)
- [Balance Sheet](https://docs.frappe.io/erpnext/balance-sheet)
- [Trial Balance](https://docs.frappe.io/erpnext/trial-balance)
- [Multi-currency accounting (foreign-currency receivable ledger)](https://docs.frappe.io/erpnext/multi-currency-accounting)
- [Accounts Receivable and Payable](https://docs.frappe.io/erpnext/accounts-receivable-and-payable)

### Resources

- [ERPNext Version 16](https://frappe.io/erpnext/version-16)

---

## Chapter 10 — Item master

**File:** `Chapter 10.mp4` (4:23)

### Description

Items are the products or services you sell. Create one manually (iPhone 17 Pro under the Smartphone group), or bulk-import from a spreadsheet with Data Import. Naming series for item codes. To solve Gizmo's "can't locate a specific unit" problem, items are **serialised**: enable Has Serial No with a prefix so the system generates a unique serial per unit. **Barcodes** on the item let you scan into a Sales Order and fetch the item, price, or serial automatically, fixing wrong item/serial selection. **Item templates and variants** (iPhone 15 → colour, memory) create many variants from one template. Enable other item features only when the use case demands.

### Relevant ERPNext documentation

- [Item](https://docs.frappe.io/erpnext/item)
- [Item Codification](https://docs.frappe.io/erpnext/item-codification)
- [Naming Series](https://docs.frappe.io/erpnext/naming-series)
- [Data Import](https://docs.frappe.io/erpnext/data-import)
- [Serial Numbers](https://docs.frappe.io/erpnext/serial-no)
- [Batch](https://docs.frappe.io/erpnext/batch)
- [Item Variants](https://docs.frappe.io/erpnext/item-variants)
- [Item Group](https://docs.frappe.io/erpnext/item-group)
- [Unit of Measure](https://docs.frappe.io/erpnext/uom)
- [Stock Settings](https://docs.frappe.io/erpnext/stock-settings)
- [Sales Order (barcode scan demo)](https://docs.frappe.io/erpnext/sales-order)

---

## Chapter 11 — Item Price and importing prices

**File:** `Chapter 11.mp4` (2:14)

### Description

One item can have several prices, for example a New York price list and a "Rest of USA" list where transport raises the rate, so Item Price is a separate master. Full Data Import walkthrough: spreadsheet of item code, price and price list → New Data Import → Item Price → attach → Start Import → verify the new records in the Item Price list.

### Relevant ERPNext documentation

- [Item Price](https://docs.frappe.io/erpnext/item-price)
- [Price Lists](https://docs.frappe.io/erpnext/price-lists)
- [Data Import](https://docs.frappe.io/erpnext/data-import)
- [Data Export](https://docs.frappe.io/erpnext/data-export)

---

## Chapter 12 — Customer, Supplier, and Warehouse

**File:** `Chapter 12 - Customer, Suppliers, and Warehourses.mp4` (3:16)

### Description

Customers carry a Customer Group and Territory (New York vs Rest of USA). Create Google Inc. with territory West and group Large Corporates, then add a contact (Sundar Pichai) and an address (Mountain View) from the customer form. Bulk-load customers from a legacy system with Data Import. Suppliers follow the same steps and are used in Purchase Order, Purchase Receipt and Purchase Invoice. Warehouses are a tree, so parent/child warehouses model stores, racks and bins. Gizmo's NYC warehouse has rack/bin levels; Dallas and San Francisco are flat.

### Relevant ERPNext documentation

- [Customer](https://docs.frappe.io/erpnext/customer)
- [Customer Group](https://docs.frappe.io/erpnext/customer-group)
- [Territory](https://docs.frappe.io/erpnext/territory)
- [Contact](https://docs.frappe.io/erpnext/contact)
- [Address](https://docs.frappe.io/erpnext/address)
- [Supplier](https://docs.frappe.io/erpnext/supplier)
- [Warehouse](https://docs.frappe.io/erpnext/warehouse)
- [Purchase Order](https://docs.frappe.io/erpnext/purchase-order)
- [Purchase Receipt](https://docs.frappe.io/erpnext/purchase-receipt)
- [Purchase Invoice](https://docs.frappe.io/erpnext/purchase-invoice)
- [Data Import](https://docs.frappe.io/erpnext/data-import)

---

## Chapter 13 — Other masters, permissions, and approval workflow

**File:** `Chapter 13.mp4` (2:29)

### Description

Gizmo World's masters are done; manufacturers add Operation, Workstation and BOM, and HR adds Department, Designation, Employee, Holiday List, Expense Claim. To keep master data clean, give creation rights to very few users using roles like Item Manager, Sales Master Manager and Purchase Master Manager, as shown in the Role Permission Manager for Item. Then a **Workflow** on Purchase Order: anyone drafts, Purchase User approves, but POs above $500 must be approved by the Purchase Manager. This closes the "store managers bypass management" problem.

### Relevant ERPNext documentation

- [Role Based Permissions](https://docs.frappe.io/erpnext/role-based-permissions)
- [Adding Users](https://docs.frappe.io/erpnext/adding-users)
- [User Permissions](https://docs.frappe.io/erpnext/user-permissions)
- [Workflows](https://docs.frappe.io/erpnext/workflows)
- [Purchase Order](https://docs.frappe.io/erpnext/purchase-order)
- [Bill of Materials](https://docs.frappe.io/erpnext/bill-of-materials)
- [Workstation](https://docs.frappe.io/erpnext/workstation)
- [Operation](https://docs.frappe.io/erpnext/operation)

### Resources

- [Frappe HR documentation](https://docs.frappe.io/hr)

---

## Chapter 14 — Letterhead, print formats, and customising forms

**File:** `Chapter 14.mp4` (2:45)

### Description

Make the system feel curated for the customer. Set up a **Letter Head** (logo + address image) and see it fetched onto a Quotation print, including the Compact print format. Then the customisation that makes people choose ERPNext: add a custom **Signature** field to Purchase Order via ⋯ → Customize → Add Field → type Signature → Update, refresh, and the field appears on new purchase orders.

### Relevant ERPNext documentation

- [Letter Head](https://docs.frappe.io/erpnext/letter-head)
- [Print Format](https://docs.frappe.io/erpnext/print-format)
- [Print Settings](https://docs.frappe.io/erpnext/print-settings)
- [Customize Form](https://docs.frappe.io/erpnext/customize-form)
- [Custom Field](https://docs.frappe.io/erpnext/custom-field)
- [Quotation](https://docs.frappe.io/erpnext/quotation)

---

## Chapter 15 — Training, hands-on entries, UAT, and go-live prep

**File:** `Chapter 15 - F.mp4` (1:40)

### Description

Before handing over the site: run department-wise training from a prepared scenario list, do Q&A, and take a sign-off from trainees. Then let users make real entries against a use-case list (sales order with variants and serialised items, barcode fetch, item taxes) and collect a **UAT sign-off**. Give them a test/staging site for parallel entries alongside the legacy system. When ready for go-live, wipe test transactions with **Delete Transactions** on the Company master.

### Relevant ERPNext documentation

- [Delete Company Transactions](https://docs.frappe.io/erpnext/delete_company_transactions)
- [Company](https://docs.frappe.io/erpnext/company-setup)
- [Setting up ERPNext (pre-go-live validation)](https://docs.frappe.io/erpnext/setting-up)
- [Setting up taxes](https://docs.frappe.io/erpnext/setting-up-taxes)

### Resources

- [Frappe Cloud docs (staging / test sites)](https://docs.frappe.io/cloud)

---

## Chapter 16 — Stock opening balance

**File:** `Chapter 16 - Stock Opening.mp4` (3:05)

### Description

Migration cut-over: legacy system until 31 Dec, ERPNext from 1 Jan. The system needs opening stock per warehouse or dispatches will be blocked. Fix the opening date, prepare the ERPNext template (item code, warehouse, quantity, valuation rate, plus serial/batch values where applicable), then create a **Stock Reconciliation** with purpose Opening Stock, upload the sheet, submit. Verify in the Stock Ledger: serial numbers are auto-created and the total opening stock value ($7,726) is visible. Ends with the question: what is Temporary Opening?

### Relevant ERPNext documentation

- [Opening Stock](https://docs.frappe.io/erpnext/opening-stock)
- [Stock Reconciliation](https://docs.frappe.io/erpnext/stock-reconciliation)
- [Stock Ledger](https://docs.frappe.io/erpnext/stock-ledger)
- [Stock Balance](https://docs.frappe.io/erpnext/stock-balance)
- [Serial Numbers](https://docs.frappe.io/erpnext/serial-no)
- [Batch](https://docs.frappe.io/erpnext/batch)
- [Fiscal Year](https://docs.frappe.io/erpnext/fiscal-year)

---

## Chapter 17 — Accounts opening balance

**File:** `Chapter 17- Accounts Opening.mp4` (6:29)

### Description

Balance-sheet primer: asset and liability accounts make the balance sheet; income and expense make the P&L; opening balances go only on balance-sheet accounts. Gizmo's last-year balance sheet tallies at $80,000 a side. A closed balance sheet is the prerequisite, though not mandatory on day one (start with cash and bank if the accounts team needs time). Stock was already opened via Stock Reconciliation; receivables and payables get their own tool; the rest (electronics fixed asset, bank, deposits, retained earnings, secured loans) go in a **Journal Entry** dated 1 Jan, with the difference posted to Temporary Opening. Then the **Opening Invoice Creation Tool** creates opening sales invoices (Google, Tech Retail Solution) and purchase invoices (Nvidia, Sony). Reload the balance sheet: assets and liabilities tally and Temporary Opening is zero.

### Links mentioned in the video

- [Accounting Basics with Umair Sayed, guest lecture on Build With Hussain ("Let's Learn ERPNext!")](https://www.youtube.com/watch?v=4bb6o94Z_vc)

### Relevant ERPNext documentation

- [Opening Balance in Accounts](https://docs.frappe.io/erpnext/opening-balance)
- [Accounting Entries (debit/credit, BS vs P&L)](https://docs.frappe.io/erpnext/accounting-entries)
- [Journal Entry](https://docs.frappe.io/erpnext/journal-entry)
- [Opening Invoice Creation Tool](https://docs.frappe.io/erpnext/opening-invoice-creation-tool)
- [Balance Sheet](https://docs.frappe.io/erpnext/balance-sheet)
- [Chart of Accounts](https://docs.frappe.io/erpnext/chart-of-accounts)
- [Fiscal Year](https://docs.frappe.io/erpnext/fiscal-year)
- [Accounts Receivable and Payable](https://docs.frappe.io/erpnext/accounts-receivable-and-payable)

### Resources

- [Frappe School: Accounting course](https://school.frappe.io/lms/courses/erpnext-accounting)

---

## Chapter 18 — Ready to go live, and getting certified

**File:** `Chapter 18.mp4` (0:59)

### Description

With masters, configuration and opening balances in place, Gizmo World's account is ready for day-to-day entries. To drive implementations, get certified: the ERPNext certification for functional consultants and the Frappe Framework certification for developers, both on Frappe School. Please rate the course and share feedback.

### Links mentioned in the video

- [Frappe School](https://school.frappe.io)
- [ERPNext Certification (functional consultants)](https://school.frappe.io/lms/courses/erpnext-training)
- [Frappe Framework Certification (developers)](https://school.frappe.io/lms/courses/frappe-developer-certification)
- [How certification works](https://docs.frappe.io/school/paid-certification)

### Resources

- [Frappe School course catalogue](https://school.frappe.io/lms/courses)
- [Certified participants](https://school.frappe.io/lms/certified-participants)

---

## Notes for the course editor

- **Chapter 8 opens with "In project, we saw that there are several tasks..."** but no final cut covers the Project module demo (raw take `sf-wa-007`). Either a Projects chapter is missing from the export, or that line needs a trim.
- **Chapter 9 ends at the Chart of Accounts Importer.** The MIS masters segment (Territory, Customer Group, Item Group) from the raw take isn't in any final cut, yet Chapter 12 opens with "Remember how we segmented customers based on their territories". Check whether a chapter between 9 and 10 is still to come.
- The **course roadmap** take and the **post-implementation / adoption** take (Mumbai customer, hard cut-off date) are not in the final cuts.
- `Chapter 15 - F.mp4` — "F" looks like a placeholder in the filename.
- `Slide 1.wav` in the folder is not a chapter.

"""Aman's Samosa Cart — the checkpoint practice business (transfer, not Meera's numbers)."""
import json
from ledger import DEBIT_NORMAL  # noqa: F401  (shared convention)

TYPES = {"Cash": "A", "School canteen (receivable)": "A", "Ingredients stock": "A", "Cart & fryer": "A",
         "Accumulated depreciation": "CA", "Bank loan": "L", "Sharma Kirana (payable)": "L",
         "Advance from customer": "L", "Capital": "E", "Drawings": "D", "Sales": "R",
         "Stall rent": "X", "Helper wages": "X", "Ingredients used": "X", "Depreciation": "X"}

T = [  # id, text, debit, credit, checkpoint
    ("A1", "Aman puts ₹20,000 of savings into the cart business", [("Cash", 20000)], [("Capital", 20000)], 1),
    ("A2", "Takes a ₹10,000 bank loan", [("Cash", 10000)], [("Bank loan", 10000)], 1),
    ("A3", "Buys cart and fryer for ₹18,000 cash", [("Cart & fryer", 18000)], [("Cash", 18000)], 1),
    ("A4", "Buys ₹3,000 potatoes, flour, oil on credit from Sharma Kirana", [("Ingredients stock", 3000)], [("Sharma Kirana (payable)", 3000)], 1),
    ("A5", "Cash sales ₹9,000", [("Cash", 9000)], [("Sales", 9000)], 2),
    ("A6", "Pays stall-spot rent ₹2,000", [("Stall rent", 2000)], [("Cash", 2000)], 2),
    ("A7", "Supplies school canteen ₹1,500 on credit", [("School canteen (receivable)", 1500)], [("Sales", 1500)], 2),
    ("A8", "Pays Sharma Kirana ₹2,000", [("Sharma Kirana (payable)", 2000)], [("Cash", 2000)], 2),
    ("A9", "Gets ₹1,000 advance for a birthday-party order next month", [("Cash", 1000)], [("Advance from customer", 1000)], 2),
    ("A10", "Cash sales ₹11,000", [("Cash", 11000)], [("Sales", 11000)], 4),
    ("A11", "Pays helper ₹3,000", [("Helper wages", 3000)], [("Cash", 3000)], 4),
    ("A12", "Aman takes ₹1,500 home", [("Drawings", 1500)], [("Cash", 1500)], 4),
    ("A13", "School canteen pays ₹1,500", [("Cash", 1500)], [("School canteen (receivable)", 1500)], 4),
    ("A14", "Stock count: ₹500 left → ₹2,500 used", [("Ingredients used", 2500)], [("Ingredients stock", 2500)], 4),
    ("A15", "Depreciation ₹18,000 ÷ 36 months", [("Depreciation", 500)], [("Accumulated depreciation", 500)], 4),
]

bal = {a: 0 for a in TYPES}
for tid, text, dr, cr, cp in T:
    assert sum(a for _, a in dr) == sum(a for _, a in cr)
    for a, v in dr: bal[a] += v
    for a, v in cr: bal[a] -= v
    A = sum(v for k, v in bal.items() if TYPES[k] in ("A", "CA"))
    L = -sum(v for k, v in bal.items() if TYPES[k] == "L")
    P = -sum(v for k, v in bal.items() if TYPES[k] in ("R", "X"))
    E = -bal["Capital"] - bal["Drawings"] + P
    assert A == L + E
    print(f"{tid:>4} A {A:>6,} = L {L:>6,} + E {E:>6,}  profit {P:>6,}  cash {bal['Cash']:>6,}")
tb = sum(v for v in bal.values() if v > 0); assert tb == -sum(v for v in bal.values() if v < 0)
print("TB", tb, "| closing", {k: v for k, v in bal.items() if v})
json.dump(dict(accounts=TYPES, transactions=[dict(id=t[0], text=t[1], debit=t[2], credit=t[3], checkpoint=t[4]) for t in T],
               closing={k: v for k, v in bal.items() if v}, trial_balance_total=tb), open("aman-samosa.json", "w"), indent=1, ensure_ascii=False)

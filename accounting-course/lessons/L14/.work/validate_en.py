import json, re, glob
en = {s["id"]: s["text"] for s in json.load(open("vo-segments.json"))}
hi = json.load(open("anchors.hi.json"))
PUNCT = re.compile(r"[.,!?;:\"“”‘’—–()…।॥\-]")
norm = lambda w: PUNCT.sub("", w).lower()
def en_words(seg):
    t = re.sub(r"\[[^\]]*\]", " ", en[seg])
    return [norm(w) for w in t.split() if norm(w)]
def count(seg, w): return sum(1 for x in en_words(seg) if x == norm(w))
problems = []
def chk(seg, name, nth, src):
    if seg not in en: problems.append(f"{src}: unknown seg {seg}"); return
    if count(seg, name.lstrip("@")) < nth: problems.append(f"{src}: EN {seg} has {count(seg,name.lstrip('@'))}x '{name}' (need #{nth})")
    key = name + (f"#{nth}" if nth > 1 else "")
    if key not in hi.get(seg, {}): problems.append(f"{src}: HI {seg} missing anchor {key}")
for f in glob.glob("assets/scenes/*.js"):
    src = open(f).read()
    for m in re.finditer(r'cu?e?(?:End)?_?\(\s*"(s\d+[a-z]?)"\s*,\s*"(@[^"]+)"(?:\s*,\s*(\d+))?\s*\)', src):
        chk(m.group(1), m.group(2), int(m.group(3) or 1), f)
    # local cu(seg, w, n) closures with fixed seg (s06/s08 style): cu("@x") — check separately
for f in glob.glob("assets/scenes/*.sfx.json"):
    for c in json.load(open(f)):
        at = c["at"]
        if isinstance(at, dict) and "word" in at: chk(at["seg"], at["word"], at.get("nth", 1), f)
for seg, ps in json.load(open("pauses.json")).items():
    for p in ps:
        nth = p[2] if len(p) > 2 else 1
        key = p[0] + (f"#{nth}" if nth > 1 else "")
        if key + "|p" not in hi.get(seg, {}): problems.append(f"pauses: HI {seg} missing pause anchor {key}|p")
        if count(seg, p[0].lstrip("@")) < nth: problems.append(f"pauses: EN {seg} {p}")
for h in json.load(open("music.json")).get("hush", []):
    chk(h["seg"], h["word"], h.get("nth", 1), "music.json")
print("\n".join(problems) or "all anchors OK")
# closure-style cues
for f, seg, pat in [("assets/scenes/s06.js", "s06", r'cu\("(@[^"]+)"(?:,\s*(\d+))?\)'), ("assets/scenes/s08.js", "s08", r'cu\("(@[^"]+)"(?:,\s*(\d+))?\)'), ("assets/scenes/s09.js", "s09c", r'\bw\("(@[^"]+)"(?:,\s*(\d+))?\)')]:
    src = open(f).read()
    for m in re.finditer(pat, src):
        chk(seg, m.group(1), int(m.group(2) or 1), f)
print("closure check done" if not problems else "\n".join(problems))

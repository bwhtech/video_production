"""Rebuild anchors.<lang>.json from vo-segments.<lang>.json markers + the TTS word timestamps.

usage (from a lesson dir): python3 ../../tools/hi_anchors.py [--lang hi]
Keys: '@name' (+ '#n' when the scene uses the nth English occurrence) (+ '|p' for a pause position).
Values: [word as spoken in that language, nth occurrence of that word in the take].
"""
import json, re, sys, importlib.util
from pathlib import Path
HERE = Path.cwd(); LANG = sys.argv[sys.argv.index("--lang") + 1] if "--lang" in sys.argv else "hi"
spec = importlib.util.spec_from_file_location("tts", Path(__file__).with_name("tts.py")); tts = importlib.util.module_from_spec(spec); spec.loader.exec_module(tts)
PUNCT = re.compile(r"[.,!?;:\"“”‘’—–()…।॥\-]"); norm = lambda w: PUNCT.sub("", w).lower()
aliases = json.loads((HERE / f"anchors.{LANG}.aliases.json").read_text()) if (HERE / f"anchors.{LANG}.aliases.json").exists() else {}
out, problems = {}, []
for s in json.loads((HERE / f"vo-segments.{LANG}.json").read_text()):
    clean, marks = tts.strip_markers(s["text"])
    words = json.loads((HERE / "assets" / f"vo-{LANG}" / f"{s['id']}.words.json").read_text())
    toks = [x for x in clean.split() if not (x.startswith("[") and x.endswith("]")) and x != "..."]
    if len(toks) != len(words): problems.append(f"{s['id']}: {len(toks)} tokens vs {len(words)} words")
    m = {}
    for idx, name, n in marks:
        w = words[min(idx, len(words) - 1)]["w"]; nth = sum(1 for x in words[:idx + 1] if norm(x["w"]) == norm(w))
        base, suf = (name[:-2], "|p") if name.endswith("|p") else (name, "")
        m[base + (f"#{n}" if n > 1 else "") + suf] = [w, nth]
        if suf and not w.endswith(("।", "?", "!", ".", ",", "—")): problems.append(f"{s['id']}: pause marker on non-final word {w}")
    for k, src in aliases.get(s["id"], {}).items():
        if src in m: m[k] = m[src]
    out[s["id"]] = m
(HERE / f"anchors.{LANG}.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
print(f"anchors.{LANG}.json: {sum(len(v) for v in out.values())} anchors" + ("" if not problems else " | PROBLEMS: " + "; ".join(problems)))

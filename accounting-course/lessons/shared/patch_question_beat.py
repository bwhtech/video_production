"""Patch every lesson's build.py: insert a thinking beat after a spoken question that runs straight into the next words.

Why (user, 2026-10-06, Hindi): "when she asks a question and then says No! it is very abrupt". ElevenLabs Hindi leaves
only 0.04–0.08 s after "?" (English leaves ~0.3 s), so "…expense है?नहीं।" sounds like one breath. build_timing now adds
a pause after any word ending in "?" whose next word starts < 0.35 s later: 1.8 s when the next words start the next quiz
question / the "answers next lesson" line, else 0.6 s. The cut is snapped into silence and skipped if it would land in
speech. Languages: AUTO_Q_BEAT_LANGS (English only where the English video hasn't been rendered yet). Idempotent.

usage: python3 lessons/shared/patch_question_beat.py
"""
from pathlib import Path

LESSONS = Path(__file__).resolve().parent.parent
EN_RENDERED = set()                      # all English re-rendered with question beats (2026-10-07)

ANCHOR = "                cuts.sort()\n"
BLOCK = '''                if LANG in AUTO_Q_BEAT_LANGS:          # thinking beat after a question that runs into the next words
                    have = {k for _, _, k in cuts}
                    for k in range(len(words) - 1):
                        if k in have or not words[k]["w"].rstrip("\\"'”’").endswith("?"):
                            continue
                        if words[k + 1]["s"] - words[k]["e"] >= 0.35:
                            continue
                        nxt = _norm(words[k + 1]["w"])
                        nxt2 = _norm(words[k + 2]["w"]) if k + 2 < len(words) else ""
                        listy = nxt in Q_LIST_NEXT or (nxt in ("जवाब", "answers") and nxt2 in ("अगले", "at", "next"))
                        secs = 1.8 if listy else 0.6
                        c = snap_cut(mp3, words, k)
                        if _cut_in_speech(mp3, c):
                            continue                   # no clean silence: leave the take as it is rather than chop a word
                        cuts.append((round(c, 3), secs, k))
'''
HELPERS = '''
# ---- thinking beat after questions (see lessons/shared/patch_question_beat.py)
AUTO_Q_BEAT_LANGS = {LANGS}
Q_LIST_NEXT = {{"two", "three", "four", "five", "six", "दो", "तीन", "चार", "पाँच", "छह"}}

def _cut_in_speech(path, c):
    import numpy as np
    x = _pcm(path); seg_rms = float(np.sqrt(np.mean(x ** 2))) + 1e-9
    i = int(c * 16000); w = x[max(0, i - 400):i + 400]
    return float(np.sqrt(np.mean(w ** 2))) / seg_rms > 0.12

def build_timing():'''


def patch(p: Path):
    t = p.read_text()
    if "AUTO_Q_BEAT_LANGS" in t:
        return "already"
    if ANCHOR not in t or "\ndef build_timing():" not in t:
        return "SKIP (pattern missing)"
    langs = '{"hi"}' if p.parent.name in EN_RENDERED else '{"hi", "en"}'
    t = t.replace(ANCHOR, BLOCK + ANCHOR, 1)
    t = t.replace("\ndef build_timing():", HELPERS.replace("{LANGS}", langs).replace("{{", "{").replace("}}", "}"), 1)
    p.write_text(t)
    return f"patched (langs {langs})"


if __name__ == "__main__":
    for b in sorted(LESSONS.glob("L[0-9][0-9]/build.py")):
        print(b.parent.name, patch(b))

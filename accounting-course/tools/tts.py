"""ElevenLabs TTS with word timestamps (narrator: Monika Sogam).

usage: python3 tools/tts.py <out.mp3> "<text>" [--lang en] [--voice <id>]
writes <out.mp3> and <out>.words.json  [{"w": "Meet", "s": 0.12, "e": 0.34}, ...]
Cached: skips the API call if both files exist.
"""
import argparse, base64, json, os, re, sys, requests

MONIKA = "EaBs7G1VibMrNAuz2Na7"
SETTINGS = {"stability": 0.4, "similarity_boost": 0.75, "style": 0.4, "use_speaker_boost": True}

def key():
    for l in open(os.path.expanduser("~/Developer/video-use/.env")):
        if l.startswith("ELEVENLABS_API_KEY"):
            return l.split("=", 1)[1].strip()

MARK = re.compile(r"\{(p?)(@[^}#]+)(?:#(\d+))?\}")

def strip_markers(text):
    """'{@galla}गल्ले' → text without markers + [(token_index, '@galla' or '@galla|p', nth)] for anchors.<lang>.json."""
    marks, clean_tokens, pending = [], [], []
    for raw in text.split():
        found = MARK.findall(raw)
        tok = MARK.sub("", raw)
        pending += [((("" if not p else "|p"), name, int(n or 1))) for p, name, n in found]
        if not tok:
            continue
        clean_tokens.append(tok)
        if not (tok.startswith("[") and tok.endswith("]")) and tok != "...":
            idx = sum(1 for t in clean_tokens if not (t.startswith("[") and t.endswith("]")) and t != "...") - 1
            marks += [(idx, name + suf, n) for suf, name, n in pending]
        pending = []
    return " ".join(clean_tokens), marks

def words_from_alignment(al):
    chars, starts, ends = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    out, cur = [], None
    for c, s, e in zip(chars, starts, ends):
        if c.isspace():
            if cur: out.append(cur); cur = None
            continue
        if cur is None: cur = {"w": c, "s": round(s, 3), "e": round(e, 3)}
        else: cur["w"] += c; cur["e"] = round(e, 3)
    if cur: out.append(cur)
    return [w for w in out if not (w["w"].startswith("[") and w["w"].endswith("]")) and w["w"] != "..."]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out"); ap.add_argument("text")
    ap.add_argument("--lang", default="en"); ap.add_argument("--voice", default=MONIKA)
    a = ap.parse_args()
    wpath = a.out.rsplit(".", 1)[0] + ".words.json"
    text, marks = strip_markers(a.text)
    mpath = a.out.rsplit(".", 1)[0] + ".marks.json"
    if marks: json.dump(marks, open(mpath, "w"))
    if os.path.exists(a.out) and os.path.exists(wpath):
        print("cached", a.out); return
    r = requests.post(f"https://api.elevenlabs.io/v1/text-to-speech/{a.voice}/with-timestamps?output_format=mp3_44100_128",
                      headers={"xi-api-key": key()}, timeout=180,
                      json={"text": text, "model_id": "eleven_v4", "language_code": a.lang, "seed": 7, "voice_settings": SETTINGS})
    if r.status_code != 200: sys.exit(f"{r.status_code} {r.text[:400]}")
    d = r.json()
    open(a.out, "wb").write(base64.b64decode(d["audio_base64"]))
    words = words_from_alignment(d["alignment"] if a.lang != "en" else (d.get("normalized_alignment") or d["alignment"]))
    json.dump(words, open(wpath, "w"), indent=0)
    print("ok", a.out, len(words), "words, ends", words[-1]["e"] if words else 0)

if __name__ == "__main__":
    main()

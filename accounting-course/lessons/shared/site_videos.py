"""Write Cloudflare Stream video IDs into the course site's lesson data (~/cs17.org).

Reads lessons/shared/stream-uploads.json (from upload_stream.py) and each lesson's timeline (poster = a cold-open
story frame, picked so the player's centred play button covers nothing important; the page heading already names
the lesson), then sets `videos: { hi: { id, poster }, en: { … } }` on each lesson in
~/cs17.org/src/features/accounting/data/course.ts. Idempotent.

usage: python3 lessons/shared/site_videos.py [--site ~/cs17.org]
"""
import json, re, sys
from pathlib import Path

LESSONS = Path(__file__).resolve().parent.parent
site = Path(sys.argv[sys.argv.index("--site") + 1]).expanduser() if "--site" in sys.argv else Path.home() / "cs17.org"
COURSE = site / "src/features/accounting/data/course.ts"
man = json.loads((LESSONS / "shared/stream-uploads.json").read_text())


# poster frame per lesson: (scene, fraction through it) — the same story beat in both languages
POSTER = {"L01": ("s01", 0.92), "L02": ("s01", 0.92), "L03": ("s01", 0.75), "L04": ("s01", 0.15),
          "L05": ("s01", 0.15), "L06": ("s01", 0.15), "L07": ("s01", 0.15)}


def poster(L, lang):
    tl = (LESSONS / (L if lang == "en" else f"{L}-hi") / "assets/timeline.js").read_text()
    scenes = json.loads(re.search(r"window\.TL = (\{.*\});", tl).group(1))["scenes"]
    scene, frac = POSTER.get(L, ("s01", 0.5))
    s = scenes[scene]
    return round(s["start"] + (s["end"] - s["start"]) * frac, 1)


t = COURSE.read_text()
for n in range(1, 15):
    L = f"L{n:02d}"
    vids = {lang: {"id": man[f"{L}:{lang}"]["uid"], "poster": poster(L, lang)}
            for lang in ("hi", "en") if f"{L}:{lang}" in man}
    m = re.search(rf"\n  \{{\n    number: {n},\n.*?\n  \}}", t, re.S)
    block = re.sub(r",\n    videos: \{.*?\n    \}", "", m.group(0), flags=re.S)
    if vids:
        body = ",\n".join(f"      {lang}: {{ id: '{v['id']}', poster: {v['poster']} }}" for lang, v in vids.items())
        block = block[:-4] + ",\n    videos: {\n" + body + "\n    }\n  }"
    t = t[:m.start()] + block + t[m.end():]
    if vids:
        print(L, {k: v["id"][:8] for k, v in vids.items()})
COURSE.write_text(t)

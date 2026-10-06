"""Lesson build pipeline: timing map → index.html + timeline.js + mix plan + captions.

The voiceover is the clock. Every scene's start/end and every word's absolute time
comes from the ElevenLabs timestamps in assets/vo/*.words.json.

usage:
  python3 build.py [--lang=hi] # write assets/timeline.js, index.html, mix.json, captions.srt
  python3 build.py --mix      # also run the offline audio mix → renders/audio-mix.<lang>.m4a
  python3 build.py --mux      # mux renders/video.<lang>.mp4 + renders/audio-mix.<lang>.m4a → renders/<folder>-final.<lang>.mp4

Lesson-local inputs (this folder): scenes.json (scene plan), music.json (music/ambience plan + optional hush),
vo-segments*.json, pauses.json, anchors.<lang>.json. The lesson id (L01, L02…) comes from the folder name.
"""
import json, os, re, subprocess, sys
from pathlib import Path

def atomic_write(path, text):
    """Parallel scene builders run build.py concurrently — never leave a half-written file."""
    tmp = Path(str(path) + f".tmp{os.getpid()}")
    tmp.write_text(text); os.replace(tmp, path)

HERE = Path(__file__).resolve().parent
A = HERE / "assets"
LANG = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--lang=")), "en")
VO_DIR = A / ("vo" if LANG == "en" else f"vo-{LANG}")          # en: assets/vo, hi: assets/vo-hi
SEGS_FILE = HERE / ("vo-segments.json" if LANG == "en" else f"vo-segments.{LANG}.json")
ANCHORS_FILE = HERE / f"anchors.{LANG}.json"                  # {seg: {"@name": ["word", nth]}} — en may omit (name == word)
# Non-English builds go to a sibling project (lessons/L01-<lang>/) so they never clobber the English index.html.
OUT = HERE if LANG == "en" else HERE.parent / f"{HERE.name}-{LANG}"
OA = OUT / "assets"

def prepare_out():
    if OUT == HERE: return
    OA.mkdir(parents=True, exist_ok=True)
    ssd = Path("/Volumes/Extreme SSD/accounting-course-renders") / OUT.name   # frames are 3–6 GB; keep them off the internal disk
    if ssd.parent.parent.exists() and not (OUT / "renders").exists() and not (OUT / "renders").is_symlink():
        ssd.mkdir(parents=True, exist_ok=True); (OUT / "renders").symlink_to(ssd)
    for d in ["kit", "scenes", "sfx", "sfx-norm", "music", VO_DIR.name]:
        link = OA / d
        if not link.exists(): link.symlink_to(A / d)
    for f in ["package.json", "hyperframes.json"]:
        (OUT / f).write_text((HERE / f).read_text())
    meta = json.loads((HERE / "meta.json").read_text()); meta["id"] += f"-{LANG}"; meta["name"] += f" ({LANG})"
    (OUT / "meta.json").write_text(json.dumps(meta, indent=2))

# ---------------------------------------------------------------- scene plan
# scenes.json = [{"id": "s01", "title": "…", "lead": 1.2}, {"id": "s01t", "fixed": 4.6}, …]
#   lead  = seconds of picture before the scene's first VO segment (scene has VO)
#   fixed = fixed length in seconds, no VO (title sting, end card)
LESSON = HERE.name                                           # "L01", "L02", … (also names the final mp4)
_PLAN = json.loads((HERE / "scenes.json").read_text())
SCENES = [(sc["id"], sc.get("title", sc["id"]), sc.get("lead")) for sc in _PLAN]
FIXED = {sc["id"]: sc["fixed"] for sc in _PLAN if "fixed" in sc}
OVERLAP = 0.6  # each scene's section runs this long into the next (transition handoff)

def duration(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                         capture_output=True, text=True).stdout.strip()
    return float(out)

PAUSES_FILE = HERE / "pauses.json"   # {seg: [["@anchor", seconds, nth?], ...]} — language-neutral (anchors map per language)

PUNCT = re.compile(r"[.,!?;:\"“”‘’—–()…।॥\-]")   # same rule in timeline.js — works for Devanagari (keeps vowel signs)

def _norm(w):
    return PUNCT.sub("", w).lower()

def _find_word(words, name, nth):
    seen = 0
    for i, w in enumerate(words):
        if _norm(w["w"]) == _norm(name):
            seen += 1
            if seen == nth:
                return i
    return None

def _pause_word_index(seg_id, words, raw_dur, anchor, nth, anchors):
    """Index of the word a pause follows. Uses the language's anchor map; falls back to the English word's
    relative position (Hindi without an explicit anchor) mapped proportionally onto this take."""
    key = anchor + (f"#{nth}" if nth > 1 else "")
    amap = anchors.get(seg_id, {})
    hit = amap.get(key + "|p") or amap.get(key)        # '|p' = explicit pause position (sentence end in that language)
    name, n = (hit[0], hit[1] if len(hit) > 1 else 1) if hit else (anchor.lstrip("@"), nth)
    i = _find_word(words, name, n)
    if i is not None:
        return i
    en_file = A / "vo" / f"{seg_id}.words.json"
    if LANG != "en" and en_file.exists():
        en = json.loads(en_file.read_text()); j = _find_word(en, anchor.lstrip("@"), nth)
        if j is not None:
            en_dur = duration(A / "vo" / f"{seg_id}.mp3")
            target = en[j]["e"] * raw_dur / en_dur
            return min(range(len(words)), key=lambda k: abs(words[k]["e"] - target))
    raise KeyError(f"pause anchor {anchor} #{nth} not found in {seg_id} ({LANG})")

_PCM = {}

def _pcm(path):
    """mono 16 kHz float samples (cached) — used to snap VO cuts into real silence."""
    if path not in _PCM:
        import numpy as np
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(path), "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                             capture_output=True).stdout
        _PCM[path] = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    return _PCM[path]

def snap_cut(path, words, i):
    """ElevenLabs word timestamps drift by tens–hundreds of ms, so 'between word i and i+1' can still be inside a word.
    Search the audio from just before word i's reported end to just before word i+2 starts for the longest stretch of
    near-silence and cut in its middle. Falls back to the quietest 10 ms frame."""
    import numpy as np
    x = _pcm(path); sr = 16000; hop = 160                                   # 10 ms frames
    lo = max(0.0, words[i]["e"] - 0.12)
    hi = words[i + 2]["s"] - 0.05 if i + 2 < len(words) else len(x) / sr
    hi = min(hi, words[i]["e"] + 0.9)
    if hi - lo < 0.05:
        hi = lo + 0.3
    a, b = int(lo * sr), min(len(x), int(hi * sr))
    frames = np.array([np.sqrt(np.mean(x[k:k + hop] ** 2)) for k in range(a, max(a + hop, b - hop), hop)])
    if not len(frames):
        return (words[i]["e"] + words[i + 1]["s"]) / 2
    seg_rms = float(np.sqrt(np.mean(x ** 2))) + 1e-9
    quiet = frames < 0.06 * seg_rms
    best, run, best_mid = 0, 0, None
    for k, q in enumerate(quiet):
        run = run + 1 if q else 0
        if run > best:
            best, best_mid = run, k - run / 2
    k = best_mid if best >= 3 else int(np.argmin(frames))                # ≥ 30 ms of silence, else quietest frame
    return round(lo + (k * hop + hop / 2) / sr, 3)

# ---- thinking beat after questions (see lessons/shared/patch_question_beat.py)
AUTO_Q_BEAT_LANGS = {"hi"}
Q_LIST_NEXT = {"two", "three", "four", "five", "six", "दो", "तीन", "चार", "पाँच", "छह"}

def _cut_in_speech(path, c):
    import numpy as np
    x = _pcm(path); seg_rms = float(np.sqrt(np.mean(x ** 2))) + 1e-9
    i = int(c * 16000); w = x[max(0, i - 400):i + 400]
    return float(np.sqrt(np.mean(w ** 2))) / seg_rms > 0.12

def build_timing():
    segs = json.loads(SEGS_FILE.read_text())
    anchors = json.loads(ANCHORS_FILE.read_text()) if ANCHORS_FILE.exists() else {}
    pauses = json.loads(PAUSES_FILE.read_text()) if PAUSES_FILE.exists() else {}
    by_scene = {}
    for s in segs:
        by_scene.setdefault(f"s{s['scene']:02d}", []).append(s)
    t, scenes, seg_out = 0.0, {}, {}
    for sid, title, lead in SCENES:
        start = t
        if sid in FIXED:
            t += FIXED[sid]
        else:
            t += lead
            for s in by_scene[sid]:
                mp3 = VO_DIR / f"{s['id']}.mp3"
                words = json.loads((VO_DIR / f"{s['id']}.words.json").read_text())
                raw = duration(mp3)
                # deliberate pauses: cut the take between words and insert silence (no re-synthesis)
                cuts = []
                for p in pauses.get(s["id"], []):
                    anchor, secs, nth = p[0], p[1], (p[2] if len(p) > 2 else 1)
                    i = _pause_word_index(s["id"], words, raw, anchor, nth, anchors)
                    if i >= len(words) - 1:
                        continue  # a pause after the last word is just gap_after
                    c = snap_cut(mp3, words, i)
                    cuts.append((round(c, 3), secs, i))
                if LANG in AUTO_Q_BEAT_LANGS:          # thinking beat after a question that runs into the next words
                    have = {k for _, _, k in cuts}
                    for k in range(len(words) - 1):
                        if k in have or not words[k]["w"].rstrip("\"'”’").endswith("?"):
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
                cuts.sort()
                shift = lambda r: r + sum(sec for c, sec, _ in cuts if c <= r)
                # words shift by POSITION (everything after word i), not by their drifting timestamps
                wshift = lambda k: sum(sec for _, sec, i in cuts if k > i)
                bounds = [0.0] + [c for c, _, _ in cuts] + [raw]
                pieces = [{"start": round(t + shift(bounds[k]) , 3), "media": round(bounds[k], 3), "dur": round(bounds[k + 1] - bounds[k], 3)}
                          for k in range(len(bounds) - 1)]
                d = raw + sum(sec for _, sec, _ in cuts)
                seg_out[s["id"]] = {"scene": sid, "start": round(t, 3), "end": round(t + d, 3), "dur": round(d, 3), "raw": round(raw, 3),
                                    "cuts": [[c, sec] for c, sec, _ in cuts], "pieces": pieces,
                                    "text": re.sub(r"\[[^\]]*\]\s*", "", s["text"]).strip(),
                                    "words": [[w["w"], round(t + w["s"] + wshift(k), 3), round(t + w["e"] + wshift(k), 3)] for k, w in enumerate(words)]}
                if LANG != "en" and (A / "vo" / f"{s['id']}.words.json").exists():
                    en = json.loads((A / "vo" / f"{s['id']}.words.json").read_text())
                    seg_out[s["id"]]["en"] = [[w["w"], w["s"]] for w in en]
                    seg_out[s["id"]]["en_dur"] = round(duration(A / "vo" / f"{s['id']}.mp3"), 3)
                t += d + s["gap_after"]
        scenes[sid] = {"title": title, "start": round(start, 3), "end": round(t, 3)}
    return {"lang": LANG, "scenes": scenes, "segs": seg_out, "anchors": anchors, "total": round(t, 3), "overlap": OVERLAP}

def anchor_word(T, seg, word, nth):
    """'@name' → the language's word for that anchor (en default: the name itself)."""
    if not word.startswith("@"):
        return word, nth
    hit = T["anchors"].get(seg, {}).get(word + (f"#{nth}" if nth > 1 else ""))
    return (hit[0], hit[1] if len(hit) > 1 else 1) if hit else (word[1:], nth)

def proportional_time(T, seg_id, word, nth):
    """Hindi fallback when an @anchor has no mapping: the English word's relative position, scaled onto this take."""
    seg = T["segs"][seg_id]; en = seg.get("en")
    if not en: return None
    seen = 0
    for w, r in en:
        if _norm(w) == _norm(word.lstrip("@")):
            seen += 1
            if seen == nth:
                raw_t = r * seg["raw"] / seg["en_dur"]
                return seg["start"] + raw_t + sum(sec for c, sec in seg["cuts"] if c <= raw_t)
    return None

def validate_cuts(T):
    """Guard: every inserted pause must sit in silence (±25 ms around the cut). A cut inside a word = an audible drop."""
    import numpy as np
    bad = []
    for sid, sg in T["segs"].items():
        if not sg["cuts"]: continue
        x = _pcm(VO_DIR / f"{sid}.mp3"); seg_rms = float(np.sqrt(np.mean(x ** 2))) + 1e-9
        for c, _ in sg["cuts"]:
            i = int(c * 16000); w = x[max(0, i - 400):i + 400]
            r = float(np.sqrt(np.mean(w ** 2))) / seg_rms
            if r > 0.12: bad.append(f"{sid}@{c:.2f}s ({r:.2f})")
    if bad:
        sys.exit("✗ pause cuts inside speech (audible drops): " + ", ".join(bad) +
                 "\n  → move the pause anchor to the sentence's last word (Hindi: the {p@…} marker) or adjust pauses.json")
    print(f"  ✓ {sum(len(s['cuts']) for s in T['segs'].values())} pause cuts all in silence")

# ---------------------------------------------------------------- sfx cue files
def resolve_at(at, T):
    """at: number (absolute) | {"scene": id, "t": local} | {"seg": id, "word": w, "nth": 1, "offset": 0} | {"seg": id, "edge": "start"|"end", "offset": 0}"""
    if isinstance(at, (int, float)):
        return float(at)
    off = at.get("offset", 0)
    if "word" in at:
        seg = T["segs"][at["seg"]]; w0, nth = anchor_word(T, at["seg"], at["word"], at.get("nth", 1))
        want = _norm(w0); seen = 0
        for w, s, e in seg["words"]:
            if _norm(w) == want:
                seen += 1
                if seen == nth:
                    return s + off
        pt = proportional_time(T, at["seg"], at["word"], at.get("nth", 1))
        if pt is not None:
            return pt + off
        raise KeyError(f"word {at['word']!r} #{nth} not in {at['seg']}")
    if "seg" in at:
        seg = T["segs"][at["seg"]]
        return (seg["start"] if at.get("edge", "start") == "start" else seg["end"]) + off
    return T["scenes"][at["scene"]]["start"] + at.get("t", 0) + off

def load_sfx(T):
    cues = []
    for f in sorted((A / "scenes").glob("*.sfx.json")):
        for c in json.loads(f.read_text()):
            t = resolve_at(c["at"], T)
            cues.append({"sfx": c["sfx"], "t": round(t, 3), "vol": c.get("vol", 0.7), "dur": c.get("dur"),
                         "fade": c.get("fade", 0), "src": f.name})
    # the master's torn-paper seam wipes get a whoosh automatically (scenes that own their seam can override with vol 0 cue)
    ids = list(T["scenes"])
    for i, sid in enumerate(ids[1:], 1):
        cues.append({"sfx": "paper_whoosh", "t": round(T["scenes"][sid]["start"] - 0.35, 3), "vol": 0.32, "dur": None, "fade": 0, "src": "seams"})
    return cues

# ---------------------------------------------------------------- music + ambience plan
MUSIC_FILE = HERE / "music.json"   # {"tracks": [...], "hush": {...}} (a bare list of tracks also works)
_REF = re.compile(r"^(\w+)\.(start|end)\s*([+-]\s*[\d.]+)?$")

def _music_cfg():
    cfg = json.loads(MUSIC_FILE.read_text()) if MUSIC_FILE.exists() else {"tracks": []}
    return {"tracks": cfg} if isinstance(cfg, list) else cfg

def _at(v, S):
    """number (absolute s) | "<scene>.start|end[+/-offset]" → seconds."""
    if isinstance(v, (int, float)):
        return float(v)
    m = _REF.match(v.strip())
    if not m:
        sys.exit(f"music.json: bad time {v!r} (want seconds or '<scene>.start|end[+0.4]')")
    t = S[m.group(1)][m.group(2)]
    return t + float(m.group(3).replace(" ", "")) if m.group(3) else t

def music_plan(T):
    S = T["scenes"]
    out = []
    for m in _music_cfg()["tracks"]:
        m = {k: v for k, v in m.items() if not k.startswith("_")}
        m["start"] = _at(m["start"], S); m["end"] = _at(m["end"], S)
        out.append(m)
    return out

# ---------------------------------------------------------------- outputs
def write_timeline_js(T, sfx):
    js = "// GENERATED by build.py — do not edit. The voiceover is the clock.\n"
    js += "window.TL = " + json.dumps(T, separators=(",", ":")) + ";\n"
    js += "window.SFX_CUES = " + json.dumps(sfx, separators=(",", ":")) + ";\n"
    js += """
(function () {
  const norm = (w) => w.replace(/[.,!?;:"“”‘’—–()…।॥\\-]/g, "").toLowerCase();  // same rule as build.py (Devanagari-safe)
  // absolute time of the nth occurrence of `word` inside VO segment `seg`
  // '@name' anchors are language-neutral: TL.anchors[seg]['@name'] = [word, nth] (en default: the name itself)
  const resolve = (seg, word, nth) => {
    if (word[0] !== "@") return [word, nth];
    const a = (TL.anchors[seg] || {})[word + (nth > 1 ? "#" + nth : "")];
    return a ? [a[0], a[1] || 1] : [word.slice(1), nth];
  };
  window.cue = (seg, word, nth = 1) => {
    [word, nth] = resolve(seg, word, nth);
    const s = TL.segs[seg]; if (!s) throw new Error("no seg " + seg);
    let seen = 0;
    for (const [w, t] of s.words) if (norm(w) === norm(word) && ++seen === nth) return t;
    const p = proportional(s, word, nth);
    if (p !== null) return p;
    throw new Error("cue not found: " + seg + " / " + word + " #" + nth);
  };
  // Hindi fallback: English word's relative position scaled onto this take (+ inserted pauses)
  function proportional(s, word, nth) {
    if (!s.en) return null;
    let seen = 0;
    for (const [w, r] of s.en) if (norm(w) === norm(word) && ++seen === nth) {
      const raw = r * s.raw / s.en_dur;
      return s.start + raw + s.cuts.reduce((a, [c, sec]) => a + (c <= raw ? sec : 0), 0);
    }
    return null;
  }
  window.cueEnd = (seg, word, nth = 1) => {
    [word, nth] = resolve(seg, word, nth);
    const s = TL.segs[seg]; let seen = 0;
    for (const [w, , e] of s.words) if (norm(w) === norm(word) && ++seen === nth) return e;
    const p = proportional(s, word, nth);
    if (p !== null) return p + 0.3;
    throw new Error("cueEnd not found: " + seg + " / " + word);
  };
  window.segStart = (seg) => TL.segs[seg].start;
  window.segEnd = (seg) => TL.segs[seg].end;
  window.scene = (id) => TL.scenes[id];
})();
"""
    atomic_write(OA / "timeline.js", js)

def write_index(T, sfx):
    tpl = (HERE / "index.template").read_text()
    order = [s[0] for s in SCENES]
    sections, scripts = [], []
    for i, sid in enumerate(order):
        sc = T["scenes"][sid]
        end = sc["end"] + (OVERLAP if i < len(order) - 1 else 0)
        sections.append(
            f'      <section id="{sid}" class="clip scene" data-start="{sc["start"]}" data-duration="{round(end - sc["start"], 3)}" '
            f'data-track-index="{1 + (i % 2)}"><svg id="{sid}-svg" class="layer" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg"></svg></section>')
        if (A / "scenes" / f"{sid}.js").exists():
            scripts.append(f'    <script src="assets/scenes/{sid}.js"></script>')
    audio = []
    for sid, s in T["segs"].items():
        for k, pc in enumerate(s["pieces"]):
            audio.append(f'      <audio id="vo-{sid}-{k}" class="clip" data-start="{pc["start"]}" data-duration="{pc["dur"]}" data-media-start="{pc["media"]}" data-track-index="10" src="assets/{VO_DIR.name}/{sid}.mp3"></audio>')
    for k, c in enumerate(sfx):
        d = c["dur"] or duration(A / "sfx" / f"{c['sfx']}.mp3")
        audio.append(f'      <audio id="fx-{k:03d}" class="clip" data-start="{c["t"]}" data-duration="{round(d, 3)}" data-track-index="11" data-volume="{c["vol"]}" src="assets/sfx/{c["sfx"]}.mp3"></audio>')
    # music + ambience for Studio preview (final audio is the offline mix; see run_mix)
    for k, m in enumerate(music_plan(T)):
        src = A / m["f"]; L = duration(src); t0 = m["start"]
        while t0 < m["end"] - 0.05:
            d = min(L, m["end"] - t0)
            audio.append(f'      <audio id="mu-{k}-{int(t0)}" class="clip" data-start="{round(t0, 3)}" data-duration="{round(d, 3)}" data-track-index="12" data-volume="{m["vol"]}" src="assets/{m["f"]}"></audio>')
            if not m.get("loop"): break
            t0 += L
    out = (tpl.replace("{{TOTAL}}", str(T["total"]))
              .replace("{{SECTIONS}}", "\n".join(sections))
              .replace("{{SCENE_SCRIPTS}}", "\n".join(scripts))
              .replace("{{AUDIO}}", "\n".join(audio)))
    atomic_write(OUT / "index.html", out)

def write_captions(T):
    def ts(t):
        h, m = divmod(int(t), 3600); m, s = divmod(m, 60); ms = int(round((t - int(t)) * 1000))
        return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"
    cues, n = [], 1
    for seg in T["segs"].values():
        line, t0 = [], None
        for w, s, e in seg["words"]:
            if t0 is None: t0 = s
            line.append(w)
            text = " ".join(line)
            if len(text) > 38 or w.endswith((".", "?", "!")) or e - t0 > 3.2:
                cues.append(f"{n}\n{ts(t0)} --> {ts(e)}\n{text}\n"); n += 1; line, t0 = [], None
        if line:
            cues.append(f"{n}\n{ts(t0)} --> {ts(seg['words'][-1][2])}\n{' '.join(line)}\n"); n += 1
    atomic_write(OUT / f"captions.{LANG}.srt", "\n".join(cues))

# ---------------------------------------------------------------- sfx loudness normalisation
SFX_REF_LUFS = -24.0   # every SFX file is gain-matched to this, so a cue's `vol` means the same thing for all of them

def normalize_sfx():
    """ElevenLabs SFX come out anywhere from −13 to −38 LUFS. Gain-match each to SFX_REF_LUFS (cached)."""
    out = A / "sfx-norm"; out.mkdir(exist_ok=True)
    for f in sorted((A / "sfx").glob("*.mp3")):
        dst = out / (f.stem + ".wav")
        if dst.exists() and dst.stat().st_mtime > f.stat().st_mtime:
            continue
        r = subprocess.run(["ffmpeg", "-i", str(f), "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
        m = re.findall(r"I:\s+(-?[\d.]+) LUFS", r)
        lufs = float(m[-1]) if m and float(m[-1]) > -70 else SFX_REF_LUFS
        gain = max(-20.0, min(20.0, SFX_REF_LUFS - lufs))
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(f), "-af", f"volume={gain:.2f}dB,alimiter=limit=0.9",
                        "-ar", "48000", str(dst)], check=True)

# ---------------------------------------------------------------- offline mix
# Friction SFX (broadband hiss) read as a stray "sh" when they land on a spoken word. run_mix low-passes them and ducks
# them under the VO; everything else on the fx bus plays as cued.
NOISE_SFX = {"paper_slide", "paper_whoosh", "swoosh_transition", "note_rustle", "page_flip", "page_flurry",
             "cover_swing", "paper_unfold", "rewind_whoosh", "polaroid_whirr", "projector", "twine_tug"}

def run_mix(T, sfx, music):
    """VO bus (highpass) + SFX bus + music bus (sidechain-ducked under VO) → 2-pass loudnorm −14 LUFS."""
    total = T["total"]
    inputs, chains, vo_labels, fx_labels, mus_labels, noise_labels = [], [], [], [], [], []
    def add(path):
        inputs.extend(["-i", str(path)]); return len(inputs) // 2 - 1
    for sid, s in T["segs"].items():
        for k, pc in enumerate(s["pieces"]):
            i = add(VO_DIR / f"{sid}.mp3"); ms = int(pc["start"] * 1000); d = pc["dur"]
            fades = f"afade=t=in:d=0.02,afade=t=out:st={max(0, d - 0.035):.3f}:d=0.035,"
            chains.append(f"[{i}:a]aresample=48000,atrim={pc['media']:.3f}:{pc['media'] + d:.3f},asetpts=PTS-STARTPTS,{fades}adelay={ms}|{ms}[v{i}]")
            vo_labels.append(f"[v{i}]")
    for c in sfx:
        i = add(A / "sfx-norm" / f"{c['sfx']}.wav"); ms = int(c["t"] * 1000)
        trim = f"atrim=0:{c['dur']}," if c["dur"] else ""
        if c["sfx"] in NOISE_SFX:   # friction sounds: tame the hiss band and duck under speech (see NOISE_SFX)
            chains.append(f"[{i}:a]aresample=48000,{trim}lowpass=f=3200,volume={c['vol']},adelay={ms}|{ms}[f{i}]"); noise_labels.append(f"[f{i}]")
        else:
            chains.append(f"[{i}:a]aresample=48000,{trim}volume={c['vol']},adelay={ms}|{ms}[f{i}]"); fx_labels.append(f"[f{i}]")
    for m in music:
        src = A / m["f"]; i = add(src); length = m["end"] - m["start"]; ms = int(m["start"] * 1000)
        loop = f"aloop=loop=-1:size=2e9," if m.get("loop") else ""
        chains.append(f"[{i}:a]aresample=48000,{loop}atrim=0:{length:.3f},afade=t=in:d={m['fi']},"
                      f"afade=t=out:st={max(0, length - m['fo']):.3f}:d={m['fo']},volume={m['vol']},adelay={ms}|{ms}[m{i}]")
        (mus_labels if m["duck"] else fx_labels).append(f"[m{i}]")
    n = lambda L: len(L)
    chains.append(f"{''.join(vo_labels)}amix=inputs={n(vo_labels)}:normalize=0,highpass=f=80,apad=whole_dur={total:.3f},asplit=3[vo][vokey][vokey2]")
    # optional dramatic hush (music.json "hush"): dip the music bed at a VO word (1 s of near-silence)
    hush = ""
    h = _music_cfg().get("hush")
    if h:
        t_hush = resolve_at({"seg": h["seg"], "word": h["word"], "nth": h.get("nth", 1), "offset": h.get("offset", 0.0)}, T)
        a, b = t_hush - 0.1, t_hush + 1.6   # 0.3 s ramp down, 0.4 s ramp back (no clicks)
        hush = f",volume='1-0.85*clip((t-{a:.2f})/0.3,0,1)*clip(({b:.2f}-t)/0.4,0,1)':eval=frame"
    chains.append(f"{''.join(mus_labels)}amix=inputs={n(mus_labels)}:normalize=0{hush},apad=whole_dur={total:.3f}[mus]")
    chains.append("[mus][vokey]sidechaincompress=threshold=0.04:ratio=8:attack=20:release=300[musd]")
    chains.append(f"{''.join(fx_labels)}amix=inputs={n(fx_labels)}:normalize=0,volume=1.0,apad=whole_dur={total:.3f}[fx]")
    if noise_labels:
        chains.append(f"{''.join(noise_labels)}amix=inputs={len(noise_labels)}:normalize=0,apad=whole_dur={total:.3f}[nz]")
        chains.append("[nz][vokey2]sidechaincompress=threshold=0.02:ratio=10:attack=5:release=250[nzd]")
        chains.append(f"[vo][musd][fx][nzd]amix=inputs=4:normalize=0,atrim=0:{total:.3f}[mix]")
    else:
        chains.append("[vokey2]anullsink")
        chains.append(f"[vo][musd][fx]amix=inputs=3:normalize=0,atrim=0:{total:.3f}[mix]")
    graph = ";".join(chains)
    out_dir = OUT / "renders"; out_dir.mkdir(exist_ok=True)
    pre = out_dir / "audio-premix.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", graph, "-map", "[mix]", "-ar", "48000", str(pre)], check=True)
    # two-pass loudnorm
    r = subprocess.run(["ffmpeg", "-i", str(pre), "-af", "loudnorm=I=-14:TP=-1:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True)
    meas = json.loads(r.stderr[r.stderr.rfind("{"):r.stderr.rfind("}") + 1])
    ln = (f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={meas['input_i']}:measured_TP={meas['input_tp']}:"
          f"measured_LRA={meas['input_lra']}:measured_thresh={meas['input_thresh']}:offset={meas['target_offset']}:linear=true")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(pre), "-af", ln, "-ar", "48000", "-c:a", "aac", "-b:a", "192k",
                    str(out_dir / f"audio-mix.{LANG}.m4a")], check=True)
    print("mixed →", out_dir / f"audio-mix.{LANG}.m4a", "| measured input I", meas["input_i"])

def run_mux():
    out_dir = OUT / "renders"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(out_dir / f"video.{LANG}.mp4"), "-i", str(out_dir / f"audio-mix.{LANG}.m4a"),
                    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "copy", "-shortest", str(out_dir / f"{LESSON}-final.{LANG}.mp4")], check=True)
    print("muxed →", out_dir / f"{LESSON}-final.{LANG}.mp4")

if __name__ == "__main__":
    prepare_out()
    T = build_timing()
    validate_cuts(T)
    sfx = load_sfx(T)
    music = music_plan(T)
    write_timeline_js(T, sfx)
    write_index(T, sfx)
    write_captions(T)
    atomic_write(OUT / "mix.json", json.dumps({"sfx": sfx, "music": music}, indent=1))
    print(f"total {T["total"]:.2f}s ({int(T['total'] // 60)}:{T['total'] % 60:04.1f})")
    for sid, sc in T["scenes"].items():
        print(f"  {sid:5s} {sc['start']:7.2f} → {sc['end']:7.2f}  ({sc['end'] - sc['start']:5.2f}s)  {sc['title']}")
    print(f"  sfx cues: {len(sfx)}")
    if "--mix" in sys.argv: normalize_sfx(); run_mix(T, sfx, music)
    if "--mux" in sys.argv: run_mux()

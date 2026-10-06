#!/usr/bin/env python3
"""Scaffold a lesson project from the course docs.

usage:  python3 lessons/shared/new_lesson.py <NN> <course-slug> [--force]
e.g.    python3 lessons/shared/new_lesson.py 02 02-what-you-have

Creates lessons/L<NN>/ (build.py, index.template, package/hyperframes/meta json, scenes.json, music.json, SCENE-BRIEF.md,
vo-segments.json, pauses.json, assets/{kit,sfx,sfx-norm,music} symlinks, assets/scenes/_shared.js, assets/vo/).
No TTS, no scene files — the lesson builders do that. build.py / index.template / _shared.js are copied from lessons/L01
(the reference lesson), so improvements to L01's pipeline flow into new lessons.
"""
import datetime, json, re, shutil, sys
from pathlib import Path

SHARED = Path(__file__).resolve().parent
LESSONS = SHARED.parent
COURSE = LESSONS.parent / "course" / "lessons"
REF = LESSONS / "L01"
TITLE_STING, END_CARD = 4.6, 12.0
DEFAULT_LEAD = 0.5


def die(msg):
    sys.exit(f"new_lesson.py: {msg}")


def parse_args():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 2 or not re.fullmatch(r"\d{1,2}", args[0]):
        die("usage: new_lesson.py <NN> <course-slug>   (e.g. 02 02-what-you-have)")
    return int(args[0]), args[1], "--force" in sys.argv


def lesson_title(script):
    first = script.read_text().splitlines()[0]
    m = re.match(r"#\s*SCRIPT\s*[—-]\s*(.+)", first)
    return (m.group(1) if m else first.lstrip("# ")).strip()


def scene_plan(cdir):
    """[{"id","title","lead"|"fixed"}] from the storyboard's `## Scene N[t] — Title` headings; scenes with no VO segment are fixed."""
    segs = json.loads((cdir / "vo-segments.json").read_text())
    with_vo = {f"s{s['scene']:02d}" for s in segs}
    plan = []
    for m in re.finditer(r"^##\s+Scene\s+(\d+)(t|[a-z])?\s+[—-]\s+(.+?)\s*$", (cdir / "STORYBOARD.md").read_text(), re.M):
        suffix = m.group(2) or ""
        if suffix and suffix != "t":
            # "Scene 4a" / "Scene 4b" are sub-scenes of one VO scene (build keys by integer): merge into s04
            sid = f"s{int(m.group(1)):02d}"
            prev = next((p for p in plan if p["id"] == sid), None)
            if prev:
                prev["title"] += " / " + re.sub(r"\s*\(s\d+[a-z]?\)\s*$", "", m.group(3))
                continue
            suffix = ""
        sid = f"s{int(m.group(1)):02d}{suffix}"
        title = re.sub(r"\s*\(s\d+t?\)\s*$", "", m.group(3))   # "Title sting (s01t)" → "Title sting"
        if sid in with_vo:
            plan.append({"id": sid, "title": title, "lead": DEFAULT_LEAD})
        else:
            plan.append({"id": sid, "title": title, "fixed": TITLE_STING if m.group(2) else END_CARD})
    missing = with_vo - {p["id"] for p in plan}
    if missing:
        die(f"vo-segments.json has scenes the storyboard doesn't: {sorted(missing)}")
    return plan, segs


def fmt_scenes(plan):
    rows = []
    for p in plan:
        kv = [f'"id": "{p["id"]}"', f'"title": {json.dumps(p["title"], ensure_ascii=False)}']
        kv.append(f'"lead": {p["lead"]}' if "lead" in p else f'"fixed": {p["fixed"]}')
        rows.append("  {" + ", ".join(kv) + "}")
    return "[\n" + ",\n".join(rows) + "\n]\n"


def draft_music(plan):
    """A starting bed: intro sting on the title card, main bed over the teaching scenes, outro on the end card. Tune by ear."""
    ids = [p["id"] for p in plan]
    title = next((i for i in ids if i.endswith("t")), None)
    end = next((p["id"] for p in reversed(plan) if "fixed" in p and not p["id"].endswith("t")), None)
    tracks = []
    if title:
        tracks.append({"f": "music/intro_sting.mp3", "start": f"{title}.start+0.1", "end": f"{title}.end+0.6", "vol": 0.55, "fi": 0.0, "fo": 0.6, "duck": False})
        after = ids[ids.index(title) + 1]
        before_end = ids[ids.index(end) - 1] if end else ids[-1]
        tracks.append({"f": "music/main.mp3", "start": f"{after}.start+0.2", "end": f"{before_end}.end", "vol": 0.16, "fi": 1.5, "fo": 1.5, "duck": True, "loop": True})
    if end:
        tracks.append({"f": "music/outro.mp3", "start": f"{end}.start-0.3", "end": f"{end}.end", "vol": 0.45, "fi": 0.3, "fo": 2.0, "duck": False})
    doc = ("DRAFT — tune by ear. start/end = absolute seconds or '<scene>.start|end[+/-offset]'; duck = sidechain under VO; "
           "loop = repeat the file to fill the span. Optional: \"hush\": {\"seg\": \"s05a\", \"word\": \"@same\", \"offset\": 0.0} dips the bed at a VO word.")
    lines = ",\n".join("    " + json.dumps(t) for t in tracks)
    return '{\n  "_doc": ' + json.dumps(doc, ensure_ascii=False) + ',\n  "tracks": [\n' + lines + '\n  ]\n}\n'


def wrap(words, indent="  ", width=118):
    out, line = [], indent
    for w in words:
        if len(line) + len(w) + 1 > width:
            out.append(line.rstrip()); line = indent
        line += w + " "
    out.append(line.rstrip())
    return "\n".join(out)


def scene_table(plan, segs):
    by = {}
    for s in segs:
        by.setdefault(f"s{s['scene']:02d}", []).append(s["id"])
    rows = ["| id | title | timing | VO segments |", "|---|---|---|---|"]
    for p in plan:
        timing = f"lead {p['lead']} s" if "lead" in p else f"fixed {p['fixed']} s (no VO)"
        rows.append(f"| `{p['id']}` | {p['title']} | {timing} | {', '.join(by.get(p['id'], [])) or '—'} |")
    return "\n".join(rows)


def link(dst, target):
    if dst.is_symlink() or dst.exists():
        dst.unlink()
    dst.symlink_to(target)


def main():
    n, slug, force = parse_args()
    nn = f"{n:02d}"
    cdir = COURSE / slug
    if not cdir.is_dir():
        die(f"no course folder {cdir}")
    for f in ("SCRIPT.md", "STORYBOARD.md", "vo-segments.json", "pauses.json"):
        if not (cdir / f).exists():
            die(f"{cdir / f} missing")
    out = LESSONS / f"L{nn}"
    if out.exists() and not force:
        die(f"{out} already exists (use --force to overwrite the scaffold files)")
    short = re.sub(r"^\d+-", "", slug)
    title = lesson_title(cdir / "SCRIPT.md")
    plan, segs = scene_plan(cdir)

    (out / "assets" / "scenes").mkdir(parents=True, exist_ok=True)
    (out / "assets" / "vo").mkdir(parents=True, exist_ok=True)
    (out / "assets" / "vo" / ".gitkeep").write_text("")
    # pipeline (copied from the reference lesson)
    shutil.copy(REF / "build.py", out / "build.py")
    for f in ("package.json", "hyperframes.json"):
        shutil.copy(REF / f, out / f)
    tpl = (REF / "index.template").read_text()
    tpl = re.sub(r"<title>.*?</title>", lambda m: f"<title>Accounting, Finally — {title}</title>", tpl, count=1)
    if "assets/kit/cast.js" not in tpl:                       # new lessons get the shared cast + props (L01 predates it and stays byte-identical)
        tpl = tpl.replace('<script src="assets/kit/rig.js"></script>', '<script src="assets/kit/rig.js"></script>\n    <script src="assets/kit/cast.js"></script>', 1)
    (out / "index.template").write_text(tpl)
    shutil.copy(REF / "assets" / "scenes" / "_shared.js", out / "assets" / "scenes" / "_shared.js")
    sh = (out / "assets" / "scenes" / "_shared.js").read_text().replace("Shared scene plumbing for Lesson 1.", f"Shared scene plumbing for Lesson {n}.", 1)
    (out / "assets" / "scenes" / "_shared.js").write_text(sh)
    meta = {"id": f"l{nn}-{short}", "name": f"l{nn}-{short}", "createdAt": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")}
    (out / "meta.json").write_text(json.dumps(meta, indent=2) + "\n")
    # shared assets by symlink
    link(out / "assets" / "kit", "../../shared/kit")
    for d in ("sfx", "sfx-norm", "music"):
        link(out / "assets" / d, f"../../shared/audio/{d}")
    # course inputs
    shutil.copy(cdir / "vo-segments.json", out / "vo-segments.json")
    shutil.copy(cdir / "pauses.json", out / "pauses.json")
    # plans
    (out / "scenes.json").write_text(fmt_scenes(plan))
    (out / "music.json").write_text(draft_music(plan))
    sfx = sorted(p.stem for p in (SHARED / "audio" / "sfx").glob("*.mp3"))
    brief = (SHARED / "lesson-template" / "SCENE-BRIEF.md.tpl").read_text()
    for k, v in {"{N}": str(n), "{LESSON}": f"L{nn}", "{SLUG}": slug, "{SCENE_TABLE}": scene_table(plan, segs),
                 "{EXAMPLE_SEG}": segs[0]["id"], "{SFX}": wrap(sfx)}.items():
        brief = brief.replace(k, v)
    (out / "SCENE-BRIEF.md").write_text(brief)
    print(f"✓ {out}  ({len(plan)} scenes, {len(segs)} VO segments)  title: {title}")
    print(f"  next: generate VO into {out / 'assets' / 'vo'} (tools/tts.py), then scene files, then `cd {out.name} && python3 build.py`")


if __name__ == "__main__":
    main()

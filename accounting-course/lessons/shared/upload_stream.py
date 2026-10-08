"""Upload final lesson videos (+ their captions) to Cloudflare Stream.

Docs: developers.cloudflare.com/stream/uploading-videos/resumable-uploads/ (tus; basic POST caps at 200 MB, L01 is bigger)
      developers.cloudflare.com/stream/edit-videos/adding-captions/ (WebVTT only, PUT …/captions/<lang>)

Credentials (never committed): env vars, else ~/Developer/video-use/.env
  CF_ACCOUNT_ID=…                  # or CLOUDFLARE_ACCOUNT_ID
  CF_STREAM_TOKEN=…                # or CLOUDFLARE_STREAM_TOKEN; API token with Account › Stream › Edit

usage:
  python3 lessons/shared/upload_stream.py                 # every renders/L0N-final.<lang>.mp4 not uploaded yet
  python3 lessons/shared/upload_stream.py L01:en L05:hi   # just these
  flags: --signed (requireSignedURLs), --force (re-upload even if unchanged), --wait (poll until ready), --dry-run
Results: lessons/shared/stream-uploads.json (uid per lesson:lang; a re-upload keeps the old uid under "replaced").
"""
import base64, json, os, re, sys, time
from datetime import datetime, timezone
from pathlib import Path

import requests

LESSONS = Path(__file__).resolve().parent.parent
MANIFEST = LESSONS / "shared" / "stream-uploads.json"
SERIES = "Hisaab Kitaab"
TITLES = {"L01": "Why Bother?", "L02": "What You Have, What You Owe", "L03": "The Scale That Never Tips",
          "L04": "Making Money", "L05": "Profit Is Not Cash", "L06": "Debit and Credit",
          "L07": "The Golden Rules, Decoded", "L08": "The Journal", "L09": "The Ledger",
          "L10": "Month-End Surprises", "L11": "The Trial Balance", "L12": "The Profit & Loss Statement",
          "L13": "The Balance Sheet", "L14": "Where Did the Money Go?"}
LANG_NAME = {"en": "English", "hi": "Hindi"}
CHUNK = 50 * 1024 * 1024          # 50 MB: docs' recommendation; multiple of 256 KiB


def creds():
    env = dict(os.environ)
    f = Path.home() / "Developer/video-use/.env"
    if f.exists():
        for line in f.read_text().splitlines():
            m = re.match(r"\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)\s*$", line)
            if m and m.group(1) not in env:
                env[m.group(1)] = m.group(2).strip().strip("'\"")
    acct = env.get("CLOUDFLARE_ACCOUNT_ID") or env.get("CF_ACCOUNT_ID")
    tok = env.get("CLOUDFLARE_STREAM_TOKEN") or env.get("CF_STREAM_TOKEN") or env.get("CLOUDFLARE_API_TOKEN")
    if not acct or not tok:
        sys.exit("missing CF_ACCOUNT_ID / CF_STREAM_TOKEN (env or ~/Developer/video-use/.env)")
    return f"https://api.cloudflare.com/client/v4/accounts/{acct}/stream", {"Authorization": f"Bearer {tok}"}


def jobs(args):
    picks = [a for a in args if not a.startswith("--")]
    out = []
    for L in sorted(TITLES):
        for lang, folder in (("en", L), ("hi", f"{L}-hi")):
            if picks and f"{L}:{lang}" not in picks:
                continue
            mp4 = LESSONS / folder / "renders" / f"{L}-final.{lang}.mp4"
            if mp4.exists():
                out.append((L, lang, mp4, LESSONS / folder / f"captions.{lang}.srt"))
    return out


def b64(s):
    return base64.b64encode(s.encode()).decode()


def tus_upload(base, auth, mp4, name, signed):
    size = mp4.stat().st_size
    meta = f"name {b64(name)}" + (",requiresignedurls" if signed else "")
    r = requests.post(base, headers={**auth, "Tus-Resumable": "1.0.0", "Upload-Length": str(size), "Upload-Metadata": meta})
    if r.status_code != 201:
        sys.exit(f"tus create failed {r.status_code}: {r.text[:400]}")
    loc, uid = r.headers["Location"], r.headers.get("stream-media-id")
    off = 0
    with mp4.open("rb") as fh:
        while off < size:
            fh.seek(off)
            chunk = fh.read(CHUNK)
            for attempt in range(6):
                try:
                    p = requests.patch(loc, data=chunk, timeout=600, headers={
                        **auth, "Tus-Resumable": "1.0.0", "Upload-Offset": str(off),
                        "Content-Type": "application/offset+octet-stream"})
                    if p.status_code == 204:
                        off = int(p.headers["Upload-Offset"]); break
                    print(f"    PATCH {p.status_code}: {p.text[:200]}")
                except requests.RequestException as e:
                    print(f"    PATCH error: {e}")
                time.sleep(2 ** attempt)
                h = requests.head(loc, headers={**auth, "Tus-Resumable": "1.0.0"})   # resume from the server's offset
                if h.ok and "Upload-Offset" in h.headers:
                    off = int(h.headers["Upload-Offset"])
                    if off >= size: break
            else:
                sys.exit(f"upload of {mp4.name} failed at byte {off}")
            print(f"    {off / size:6.1%}")
    return uid


def srt_to_vtt(srt):
    body = re.sub(r"(\d\d:\d\d:\d\d),(\d\d\d)", r"\1.\2", srt.read_text().replace("\r\n", "\n"))
    return "WEBVTT\n\n" + body.strip() + "\n"


def main():
    args = sys.argv[1:]
    signed, force, wait, dry = "--signed" in args, "--force" in args, "--wait" in args, "--dry-run" in args
    man = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    todo = []
    for L, lang, mp4, srt in jobs(args):
        key, st = f"{L}:{lang}", mp4.stat()
        prev = man.get(key)
        if prev and not force and prev["size"] == st.st_size and prev["mtime"] == int(st.st_mtime):
            print(f"{key}: unchanged, already uploaded ({prev['uid']})"); continue
        todo.append((key, L, lang, mp4, srt, st))
    for key, L, lang, mp4, srt, st in todo:
        name = f"{SERIES} {L} — {TITLES[L]} ({LANG_NAME[lang]})"
        print(f"{key}: {name}  [{st.st_size / 1048576:.0f} MB]" + ("  (dry run)" if dry else ""))
    if dry or not todo:
        return
    base, auth = creds()
    for key, L, lang, mp4, srt, st in todo:
        name = f"{SERIES} {L} — {TITLES[L]} ({LANG_NAME[lang]})"
        print(f"{key}: uploading")
        uid = tus_upload(base, auth, mp4, name, signed)
        r = requests.post(f"{base}/{uid}", headers=auth, json={
            "meta": {"name": name, "series": SERIES, "lesson": L, "lang": lang}, "requireSignedURLs": signed})
        if not r.ok: print(f"    meta update failed {r.status_code}: {r.text[:200]}")
        cap = None
        if srt.exists():
            c = requests.put(f"{base}/{uid}/captions/{lang}", headers=auth,
                             files={"file": (f"{L}.{lang}.vtt", srt_to_vtt(srt).encode(), "text/vtt")})
            cap = lang if c.ok else None
            if not c.ok: print(f"    captions failed {c.status_code}: {c.text[:200]}")
        rec = {"uid": uid, "name": name, "file": str(mp4.relative_to(LESSONS)), "size": st.st_size, "mtime": int(st.st_mtime),
               "signed": signed, "captions": cap, "uploaded": datetime.now(timezone.utc).isoformat(timespec="seconds")}
        if key in man and man[key]["uid"] != uid:
            rec["replaced"] = man[key].get("replaced", []) + [man[key]["uid"]]
        man[key] = rec
        MANIFEST.write_text(json.dumps(man, indent=1, ensure_ascii=False) + "\n")
        print(f"    done → {uid}")
    if wait:
        for key, *_ in todo:
            uid = man[key]["uid"]
            while True:
                v = requests.get(f"{base}/{uid}", headers=auth).json()["result"]
                s = v["status"]
                if v.get("readyToStream") or s.get("state") in ("ready", "error"):
                    man[key]["preview"] = v.get("preview"); man[key]["hls"] = v.get("playback", {}).get("hls")
                    print(f"{key}: {s.get('state')}  {v.get('preview')}"); break
                time.sleep(15)
        MANIFEST.write_text(json.dumps(man, indent=1, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()

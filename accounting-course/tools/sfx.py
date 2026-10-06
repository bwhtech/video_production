"""ElevenLabs sound effects + music.

usage:
  python3 tools/sfx.py sfx <out.mp3> "<description>" [--dur 1.5] [--influence 0.5] [--loop]
  python3 tools/sfx.py music <out.mp3> "<prompt>" --ms 60000
Cached: skips if the output exists.
"""
import argparse, os, sys, requests

def key():
    for l in open(os.path.expanduser("~/Developer/video-use/.env")):
        if l.startswith("ELEVENLABS_API_KEY"):
            return l.split("=", 1)[1].strip()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("kind", choices=["sfx", "music"]); ap.add_argument("out"); ap.add_argument("prompt")
    ap.add_argument("--dur", type=float); ap.add_argument("--influence", type=float, default=0.5)
    ap.add_argument("--loop", action="store_true"); ap.add_argument("--ms", type=int, default=60000)
    a = ap.parse_args()
    if os.path.exists(a.out): print("cached", a.out); return
    h = {"xi-api-key": key()}
    if a.kind == "sfx":
        body = {"text": a.prompt, "prompt_influence": a.influence}
        if a.dur: body["duration_seconds"] = a.dur
        if a.loop: body["loop"] = True
        r = requests.post("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", headers=h, json=body, timeout=180)
    else:
        body = {"prompt": a.prompt, "music_length_ms": a.ms, "force_instrumental": True}
        r = requests.post("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128", headers=h, json=body, timeout=600)
    if r.status_code != 200: sys.exit(f"{r.status_code} {r.text[:400]}")
    open(a.out, "wb").write(r.content); print("ok", a.out, len(r.content))

if __name__ == "__main__":
    main()

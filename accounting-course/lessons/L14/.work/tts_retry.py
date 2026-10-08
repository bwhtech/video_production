import json, subprocess, os, time
from concurrent.futures import ThreadPoolExecutor
os.chdir("/Users/mdhussain/video_production/accounting-course")
segs = [s for s in json.load(open("lessons/L14/vo-segments.hi.json")) if not (os.path.exists(f"lessons/L14/assets/vo-hi/{s['id']}.mp3") and os.path.exists(f"lessons/L14/assets/vo-hi/{s['id']}.words.json"))]
env = {**os.environ, "SLOT_DIR": "/tmp/tts-slots", "HF_SLOTS": "4"}
def run(s):
    out = f"lessons/L14/assets/vo-hi/{s['id']}.mp3"
    for attempt in range(40):
        r = subprocess.run(["lessons/shared/with_slot.sh", "python3", "tools/tts.py", out, s["text"], "--lang", "hi"], env=env, capture_output=True, text=True)
        if "ok " in r.stdout or "cached" in r.stdout:
            print(s["id"], r.stdout.strip(), flush=True); return
        if "concurrent_limit" not in r.stderr and "429" not in r.stderr:
            print(s["id"], "FAIL", r.stderr.strip()[:300], flush=True); return
        time.sleep(12 + attempt)
    print(s["id"], "GAVE UP", flush=True)
with ThreadPoolExecutor(2) as ex: list(ex.map(run, segs))
print("DONE")

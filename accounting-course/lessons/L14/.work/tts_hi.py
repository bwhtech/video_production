import json, subprocess, os
from concurrent.futures import ThreadPoolExecutor
os.chdir("/Users/mdhussain/video_production/accounting-course")
segs = json.load(open("lessons/L14/vo-segments.hi.json"))
env = {**os.environ, "SLOT_DIR": "/tmp/tts-slots", "HF_SLOTS": "4"}
def run(s):
    out = f"lessons/L14/assets/vo-hi/{s['id']}.mp3"
    r = subprocess.run(["lessons/shared/with_slot.sh", "python3", "tools/tts.py", out, s["text"], "--lang", "hi"], env=env, capture_output=True, text=True)
    print(s["id"], r.stdout.strip(), r.stderr.strip()[:300], flush=True)
with ThreadPoolExecutor(3) as ex: list(ex.map(run, segs))
print("DONE")

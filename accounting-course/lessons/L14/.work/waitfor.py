import sys, time, pathlib
f, pat, secs = sys.argv[1], sys.argv[2], float(sys.argv[3])
t0 = time.time()
while time.time() - t0 < secs:
    s = pathlib.Path(f).read_text() if pathlib.Path(f).exists() else ""
    if pat in s: print("FOUND", pat); break
    time.sleep(5)
else: print("not yet")
print(s.strip().splitlines()[-1] if s.strip() else "(log empty)")

import json,sys
a=json.load(open("anchors.hi.json"))
for sid in sys.argv[1:]:
    w=json.load(open(f"assets/vo-hi/{sid}.words.json"))
    print(sid, "end", w[-1]["e"])
    print("  "+" ".join(f"{x['w']}@{x['s']:.1f}" for x in w))
    print("  ANCH:", {k:v for k,v in a[sid].items()})

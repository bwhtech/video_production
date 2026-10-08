import json,re,sys
s=open("/Users/mdhussain/video_production/accounting-course/lessons/L14-hi/assets/timeline.js").read()
T=json.loads(re.search(r"window.TL = (\{.*?\});\n",s,re.S).group(1))
norm=lambda w: re.sub(r'[.,!?;:"“”‘’—–()…।॥\-]','',w).lower()
def cue(seg,name,nth=1):
    a=T["anchors"].get(seg,{}).get(name+(f"#{nth}" if nth>1 else ""))
    w,n=(a[0],a[1]) if a else (name[1:],nth)
    seen=0
    for ww,st,en in T["segs"][seg]["words"]:
        if norm(ww)==norm(w):
            seen+=1
            if seen==n: return st
if __name__=="__main__":
    if len(sys.argv)==1:
        for k,v in T["scenes"].items(): print(k, v["start"], v["end"])
        for k,v in T["segs"].items(): print(" ",k, v["start"], v["end"])
    else:
        for a in sys.argv[1:]:
            seg,name=a.split(":"); nth=1
            if "#" in name: name,nth=name.split("#"); nth=int(nth)
            print(a, cue(seg,name,nth))

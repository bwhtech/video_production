"""Patch every lesson's build.py run_mix: friction SFX (paper slides, whooshes, rustles) get a low-pass and are
sidechain-ducked under the VO, so their hiss never sits on a spoken word (heard as a stray "sh", e.g. L02-hi 2:16
"capital" + paper_slide). Tonal SFX (dings, pops, coins, tinks) are untouched. Idempotent.

usage: python3 lessons/shared/patch_mix_noise_duck.py
"""
from pathlib import Path

LESSONS = Path(__file__).resolve().parent.parent
MARK = "NOISE_SFX"

OLD_FX = '''        chains.append(f"[{i}:a]aresample=48000,{trim}volume={c['vol']},adelay={ms}|{ms}[f{i}]"); fx_labels.append(f"[f{i}]")'''
NEW_FX = '''        if c["sfx"] in NOISE_SFX:   # friction sounds: tame the hiss band and duck under speech (see NOISE_SFX)
            chains.append(f"[{i}:a]aresample=48000,{trim}lowpass=f=3200,volume={c['vol']},adelay={ms}|{ms}[f{i}]"); noise_labels.append(f"[f{i}]")
        else:
            chains.append(f"[{i}:a]aresample=48000,{trim}volume={c['vol']},adelay={ms}|{ms}[f{i}]"); fx_labels.append(f"[f{i}]")'''

OLD_VO = "asplit=2[vo][vokey]\")"
NEW_VO = "asplit=3[vo][vokey][vokey2]\")"

OLD_OUT = '''    chains.append(f"[vo][musd][fx]amix=inputs=3:normalize=0,atrim=0:{total:.3f}[mix]")'''
NEW_OUT = '''    if noise_labels:
        chains.append(f"{''.join(noise_labels)}amix=inputs={len(noise_labels)}:normalize=0,apad=whole_dur={total:.3f}[nz]")
        chains.append("[nz][vokey2]sidechaincompress=threshold=0.02:ratio=10:attack=5:release=250[nzd]")
        chains.append(f"[vo][musd][fx][nzd]amix=inputs=4:normalize=0,atrim=0:{total:.3f}[mix]")
    else:
        chains.append("[vokey2]anullsink")
        chains.append(f"[vo][musd][fx]amix=inputs=3:normalize=0,atrim=0:{total:.3f}[mix]")'''

DECL = '''
# Friction SFX (broadband hiss) read as a stray "sh" when they land on a spoken word. run_mix low-passes them and ducks
# them under the VO; everything else on the fx bus plays as cued.
NOISE_SFX = {"paper_slide", "paper_whoosh", "swoosh_transition", "note_rustle", "page_flip", "page_flurry",
             "cover_swing", "paper_unfold", "rewind_whoosh", "polaroid_whirr", "projector", "twine_tug"}

def run_mix('''


def patch(p: Path):
    t = p.read_text()
    if MARK in t:
        return "already"
    for old in (OLD_FX, OLD_VO, OLD_OUT, "\ndef run_mix("):
        if old not in t:
            return f"SKIP (pattern missing: {old[:40]!r})"
    # the original output line uses ':' between amix options only via `inputs=3,normalize=0` — keep both spellings safe
    t = t.replace(OLD_FX, NEW_FX).replace(OLD_VO, NEW_VO).replace(OLD_OUT, NEW_OUT)
    t = t.replace("\ndef run_mix(", DECL, 1)
    t = t.replace("    inputs, chains, vo_labels, fx_labels, mus_labels = [], [], [], [], []",
                  "    inputs, chains, vo_labels, fx_labels, mus_labels, noise_labels = [], [], [], [], [], []")
    if "noise_labels = [" not in t:
        return "SKIP (label list line missing)"
    p.write_text(t)
    return "patched"


if __name__ == "__main__":
    for b in sorted(LESSONS.glob("L[0-9][0-9]/build.py")):
        print(b.parent.name, patch(b))

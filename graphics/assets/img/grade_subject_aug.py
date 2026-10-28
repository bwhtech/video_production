"""Prepare the THUMBS-UP subject cutout (August 2026 "What's New" thumbnail).

Frame 12:45.50 of the August recording. No un-mirror. Lit skin R/B measures
2.0 (warm tungsten, like the r plate), so a white-balance gain comes first.

1. Speck removal — the matte leaves ~10 one-to-two-pixel islands (beard/glasses
   highlights plus a stray dot out at x=129). Keep only the largest connected
   component.
2. Matte hardening + brand grade — same treatment as grade_subject_r.py so the
   cutout sits on the dark violet frame the same way.

    python3 assets/img/grade_subject_aug.py
    hussain-plate-aug-cut.png -> hussain-plate-aug-graded.png
"""
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = "assets/img/hussain-plate-aug-cut.png"
DST = "assets/img/hussain-plate-aug-graded.png"

GAIN = np.array([0.95, 0.99, 1.19], dtype=np.float32)   # lit skin R/B 2.0 -> ~1.6
SATURATION = 0.95
VIOLET = np.array([0.47, 0.34, 0.93], dtype=np.float32)  # --brand #7757ee
SHADOW_TINT = 0.14
CONTRAST = 1.06
LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
ALPHA_LO, ALPHA_HI = 0.35, 0.92
ALPHA_FEATHER = 0.6  # px

im = np.array(Image.open(SRC).convert("RGBA")).astype(np.float32)
rgb, alpha = im[:, :, :3] / 255.0, im[:, :, 3] / 255.0

# 1. keep only the largest connected component of the matte
labels, n = ndimage.label(alpha > 0.06)
sizes = ndimage.sum(alpha > 0.06, labels, range(1, n + 1))
alpha = np.where(labels == (int(np.argmax(sizes)) + 1), alpha, 0.0)

# 2. white balance + brand grade
rgb = np.clip(rgb * GAIN, 0.0, 1.0)
lum = (rgb * LUMA).sum(axis=2, keepdims=True)
rgb = lum + (rgb - lum) * SATURATION
shadow = np.clip(1.0 - lum * 2.2, 0.0, 1.0) ** 1.5
rgb = rgb * (1.0 - SHADOW_TINT * shadow) + VIOLET * (SHADOW_TINT * shadow) * lum.clip(0.04, 1.0)
rgb = np.clip((rgb - 0.5) * CONTRAST + 0.5, 0.0, 1.0)

# harden the matte: drop the low-alpha halo, keep a crisp soft edge
a = np.clip((alpha - ALPHA_LO) / (ALPHA_HI - ALPHA_LO), 0.0, 1.0)
a = np.array(Image.fromarray((a * 255).astype(np.uint8)).filter(
    ImageFilter.GaussianBlur(ALPHA_FEATHER))).astype(np.float32)

out = np.concatenate([rgb * 255.0, a[:, :, None]], axis=2)
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(DST)
print(f"wrote {DST} ({n} components -> 1, matte hardened {ALPHA_LO}-{ALPHA_HI})")

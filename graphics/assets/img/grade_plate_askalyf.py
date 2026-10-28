"""Grade the full Ask Alyf plate (no cutout) for the thumbnail.

Frame 00:04.90 of ask-alyf final.mp4 (lips fully closed, between phrases; 5.25 showed teeth). Lit skin R/B measures
1.40 already, so no white-balance gain. Same brand grade as grade_plate_aug.py.

    python3 assets/img/grade_plate_askalyf.py
    hussain-plate-askalyf.png -> hussain-plate-askalyf-graded.png
"""
import numpy as np
from PIL import Image

SRC = "assets/img/hussain-plate-askalyf.png"
DST = "assets/img/hussain-plate-askalyf-graded.png"

SATURATION = 0.95
VIOLET = np.array([0.47, 0.34, 0.93], dtype=np.float32)  # --brand #7757ee
SHADOW_TINT = 0.14
CONTRAST = 1.06
LIFT = 1.08  # plate is dark; lift exposure a touch for thumbnail size
LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

rgb = np.array(Image.open(SRC).convert("RGB")).astype(np.float32) / 255.0
rgb = np.clip(rgb * LIFT, 0.0, 1.0)
lum = (rgb * LUMA).sum(axis=2, keepdims=True)
rgb = lum + (rgb - lum) * SATURATION
shadow = np.clip(1.0 - lum * 2.2, 0.0, 1.0) ** 1.5
rgb = rgb * (1.0 - SHADOW_TINT * shadow) + VIOLET * (SHADOW_TINT * shadow) * lum.clip(0.04, 1.0)
rgb = np.clip((rgb - 0.5) * CONTRAST + 0.5, 0.0, 1.0)

Image.fromarray((rgb * 255.0).astype(np.uint8)).save(DST)
print(f"wrote {DST}")

"""Grade the full August plate (no cutout) for the thumbnail.

Frame 12:45.50 of the August recording, background kept: the room (wood wall,
bookshelf) sits on the right of the thumbnail and fades into the surface on the
left. Same white balance + brand grade as grade_subject_aug.py, no matte.

    python3 assets/img/grade_plate_aug.py
    hussain-plate-aug.png -> hussain-plate-aug-full-graded.png
"""
import numpy as np
from PIL import Image

SRC = "assets/img/hussain-plate-aug.png"
DST = "assets/img/hussain-plate-aug-full-graded.png"

GAIN = np.array([0.95, 0.99, 1.19], dtype=np.float32)   # lit skin R/B 2.0 -> ~1.6
SATURATION = 0.95
VIOLET = np.array([0.47, 0.34, 0.93], dtype=np.float32)  # --brand #7757ee
SHADOW_TINT = 0.14
CONTRAST = 1.06
LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

rgb = np.array(Image.open(SRC).convert("RGB")).astype(np.float32) / 255.0
rgb = np.clip(rgb * GAIN, 0.0, 1.0)
lum = (rgb * LUMA).sum(axis=2, keepdims=True)
rgb = lum + (rgb - lum) * SATURATION
shadow = np.clip(1.0 - lum * 2.2, 0.0, 1.0) ** 1.5
rgb = rgb * (1.0 - SHADOW_TINT * shadow) + VIOLET * (SHADOW_TINT * shadow) * lum.clip(0.04, 1.0)
rgb = np.clip((rgb - 0.5) * CONTRAST + 0.5, 0.0, 1.0)

Image.fromarray((rgb * 255.0).astype(np.uint8)).save(DST)
print(f"wrote {DST}")

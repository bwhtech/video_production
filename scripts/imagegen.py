"""Generate an image via OpenAI's images API (gpt-image-1).

Loads OPENAI_API_KEY from <repo>/.env or the environment (same resolution
order as transcribe.py). Saves the result as a PNG.

Usage:
    python helpers/imagegen.py "a cinematic still of a red car at dusk"
    python helpers/imagegen.py "..." -o /abs/path/out.png
    python helpers/imagegen.py "..." --size 1536x1024 --quality high
    python helpers/imagegen.py "..." --background transparent
"""

from __future__ import annotations

import argparse
import base64
import os
import re
import sys
import time
from pathlib import Path

import requests


IMAGES_URL = "https://api.openai.com/v1/images/generations"
DEFAULT_MODEL = "gpt-image-1"


def load_api_key() -> str:
    for candidate in [Path(__file__).resolve().parent.parent / ".env", Path(".env")]:
        if candidate.exists():
            for line in candidate.read_text().splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                if k.strip() == "OPENAI_API_KEY":
                    return v.strip().strip('"').strip("'")
    v = os.environ.get("OPENAI_API_KEY", "")
    if not v:
        sys.exit("OPENAI_API_KEY not found in .env or environment")
    return v


def slugify(text: str, max_len: int = 40) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", text.lower()).strip("-")
    return s[:max_len] or "image"


def generate_image(
    prompt: str,
    out_path: Path,
    api_key: str,
    model: str = DEFAULT_MODEL,
    size: str = "1024x1024",
    quality: str = "auto",
    background: str | None = None,
    verbose: bool = True,
) -> Path:
    payload: dict[str, object] = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "quality": quality,
        "n": 1,
    }
    if background:
        payload["background"] = background

    t0 = time.time()
    resp = requests.post(
        IMAGES_URL,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=600,
    )
    if resp.status_code != 200:
        raise RuntimeError(
            f"OpenAI images API returned {resp.status_code}: {resp.text[:500]}"
        )

    body = resp.json()
    data = body.get("data") or []
    if not data:
        raise RuntimeError(f"empty data in response: {body}")

    b64 = data[0].get("b64_json")
    if b64:
        img_bytes = base64.b64decode(b64)
    else:
        url = data[0].get("url")
        if not url:
            raise RuntimeError(f"no b64_json or url in response: {body}")
        r = requests.get(url, timeout=120)
        r.raise_for_status()
        img_bytes = r.content

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(img_bytes)

    if verbose:
        dt = time.time() - t0
        kb = out_path.stat().st_size / 1024
        print(f"saved: {out_path} ({kb:.1f} KB) in {dt:.1f}s")
    return out_path


def main() -> None:
    ap = argparse.ArgumentParser(description="Generate an image via OpenAI gpt-image-1")
    ap.add_argument("prompt", type=str, help="Text prompt")
    ap.add_argument(
        "-o", "--output", type=Path, default=None,
        help="Output PNG path (default: ./imagegen_test/<slug>.png)",
    )
    ap.add_argument("--model", type=str, default=DEFAULT_MODEL)
    ap.add_argument(
        "--size", type=str, default="1024x1024",
        help="1024x1024, 1024x1536, 1536x1024, or auto",
    )
    ap.add_argument(
        "--quality", type=str, default="auto",
        help="low, medium, high, or auto",
    )
    ap.add_argument(
        "--background", type=str, default=None,
        help="transparent, opaque, or auto (omit for default)",
    )
    args = ap.parse_args()

    out = args.output or (Path.cwd() / "imagegen_test" / f"{slugify(args.prompt)}.png")
    api_key = load_api_key()

    generate_image(
        prompt=args.prompt,
        out_path=out.resolve(),
        api_key=api_key,
        model=args.model,
        size=args.size,
        quality=args.quality,
        background=args.background,
    )


if __name__ == "__main__":
    main()

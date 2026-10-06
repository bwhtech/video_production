#!/usr/bin/env bash
# Generate one image with Codex's built-in gpt-image tool.
# usage: tools/gen_image.sh <out.png> <prompt-file>... [-- ref1.png ref2.png ...]
set -euo pipefail
out=$(cd "$(dirname "$1")" && pwd)/$(basename "$1"); shift
prompts=(); refs=()
while [[ $# -gt 0 && "$1" != "--" ]]; do prompts+=("$1"); shift; done
[[ "${1:-}" == "--" ]] && shift && for r in "$@"; do refs+=(-i "$r"); done
body=$(cat "${prompts[@]}")
ref_note=""; [[ ${#refs[@]} -gt 0 ]] && ref_note="Attached images are REFERENCES: match their character design, palette and rendering style exactly."
codex exec --skip-git-repo-check -s workspace-write -C "$(dirname "$out")" ${refs[@]+"${refs[@]}"} -o /dev/null \
"$body

$ref_note
Use the built-in image_gen tool exactly once. Landscape 16:9 (e.g. 1536x1024 or wider). Do not render any readable text, letters, or numbers unless the prompt explicitly asks.
Copy the saved PNG to $(basename "$out") in the current directory. Reply with only the path." < /dev/null > "${out%.png}.log" 2>&1
ls -la "$out"

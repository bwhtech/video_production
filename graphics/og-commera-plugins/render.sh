#!/usr/bin/env bash
# Screenshot the OG page with agent-browser. Needs `npm run dev` running.
# Usage: ./render.sh [out_dir]   (default: ./out)
set -euo pipefail
OUT="${1:-$(dirname "$0")/out}"
mkdir -p "$OUT"
AB="agent-browser --session og-commera"
$AB set viewport 1200 630 >/dev/null
shot() { # route file
  $AB open "http://localhost:5198/$1" >/dev/null
  $AB wait --load networkidle >/dev/null
  $AB wait 1200 >/dev/null
  $AB screenshot "$OUT/$2" >/dev/null
  echo "$OUT/$2"
}
shot og og-commera-plugins.png
shot og-b og-commera-plugins-centered.png
$AB close >/dev/null

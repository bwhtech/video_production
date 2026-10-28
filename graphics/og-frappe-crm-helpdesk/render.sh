#!/usr/bin/env bash
# Screenshot both pages with agent-browser. Needs `npm run dev` running.
# Usage: ./render.sh [out_dir]   (default: ./out)
set -euo pipefail
OUT="${1:-$(dirname "$0")/out}"
mkdir -p "$OUT"
AB="agent-browser --session og-frappe-crm-helpdesk"
shot() { # route width height file
  $AB set viewport "$2" "$3" >/dev/null
  $AB open "http://localhost:5196/$1" >/dev/null
  $AB wait --load networkidle >/dev/null
  $AB wait 1200 >/dev/null
  $AB screenshot "$OUT/$4" >/dev/null
  echo "$OUT/$4"
}
shot og 1200 630 og-frappe-crm-helpdesk-masterclass.png
$AB close >/dev/null

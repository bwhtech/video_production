#!/bin/bash
# Render lessons one at a time (6 workers, under the shared render lock), then mix, mux, make a 720p review copy and verify.
# usage: lessons/shared/render_queue.sh L01:en L05:hi ...      (log: lessons/shared/render_queue.log)
set -u
LESSONS="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$LESSONS/shared/render_queue.log"
LOCK=/tmp/hf-render-lock-dir/lock
mkdir -p /tmp/hf-render-lock-dir
say() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"; }
for job in "$@"; do
  L=${job%%:*}; lang=${job##*:}
  src="$LESSONS/$L"; proj="$src"; flag=""
  [ "$lang" = hi ] && { proj="$LESSONS/$L-hi"; flag="--lang=hi"; }
  say "$job: check"
  if ! (cd "$proj" && npx --yes hyperframes@0.8.133 check > "$proj/renders/check.$lang.log" 2>&1); then
    say "$job: CHECK FAILED — skipped (see $proj/renders/check.$lang.log)"; continue
  fi
  until mkdir "$LOCK" 2>/dev/null; do sleep 20; done
  say "$job: render"
  (cd "$proj" && npx --yes hyperframes@0.8.133 render -o "renders/video.$lang.mp4" --workers 6 > "renders/render.$lang.log" 2>&1)
  rc=$?; rmdir "$LOCK"
  [ $rc -ne 0 ] && { say "$job: RENDER FAILED rc=$rc (see $proj/renders/render.$lang.log)"; continue; }
  (cd "$src" && python3 build.py $flag --mix --mux >> "$proj/renders/render.$lang.log" 2>&1) || { say "$job: MIX/MUX FAILED"; continue; }
  fin="$proj/renders/$L-final.$lang.mp4"
  ffmpeg -v error -y -i "$fin" -vf scale=1280:-2 -c:v libx264 -preset fast -crf 23 -c:a copy "$proj/renders/$L-review-720p.$lang.mp4"
  st=$(ffprobe -v error -show_entries stream=codec_type,start_time,duration -of csv=p=0 "$fin" | tr '\n' ' ')
  lufs=$(ffmpeg -nostats -i "$fin" -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | tr -s ' ')
  say "$job: DONE  $st|$lufs"
done
say "queue finished"

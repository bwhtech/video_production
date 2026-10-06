#!/usr/bin/env bash
# Generates the per-lesson look frames: course/look/lessons/<style>/<Lxx>.png
cd "$(dirname "$0")/.."
L=course/look
job() {
  style=$1; lesson=$2; out=$L/lessons/$style/$lesson.png
  [ -f "$out" ] && return 0
  refs=($L/refs/khata-$style.png); [ -f $L/refs/meera-$style.png ] && refs+=($L/refs/meera-$style.png)
  tools/gen_image.sh "$out" $L/prompts/style_$style.txt $L/prompts/cast2.txt $L/prompts/lessons/$lesson.txt -- "${refs[@]}" >/dev/null 2>&1 \
    && echo "ok $style $lesson" || echo "FAIL $style $lesson"
}
export -f job; export L
for l in $(seq -f "L%02g" 1 14); do for s in flat paper clay; do echo "$s $l"; done; done | xargs -P 7 -n 2 bash -c 'job "$0" "$1"'

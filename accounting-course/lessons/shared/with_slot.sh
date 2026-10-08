#!/bin/bash
# Run a heavy headless-Chrome command (hyperframes check / snapshot) in one of N shared slots, so parallel builders
# don't swamp the machine. Renders use the separate render lock (/tmp/hf-render-lock-dir/lock).
# usage: lessons/shared/with_slot.sh npx --yes hyperframes@0.8.133 check
#        SLOT_DIR=/tmp/tts-slots HF_SLOTS=4 lessons/shared/with_slot.sh python3 tools/tts.py …   (ElevenLabs concurrency)
N=${HF_SLOTS:-3}
D=${SLOT_DIR:-/tmp/hf-slots}
mkdir -p "$D"
while :; do
  for i in $(seq 1 "$N"); do
    if mkdir "$D/$i" 2>/dev/null; then
      trap 'rmdir "'"$D/$i"'" 2>/dev/null' EXIT INT TERM
      "$@"; exit $?
    fi
  done
  sleep 5
done

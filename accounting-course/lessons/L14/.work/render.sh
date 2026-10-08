#!/bin/bash
cd /Users/mdhussain/video_production/accounting-course/lessons/L14-hi
until mkdir /tmp/hf-render-lock-dir/lock 2>/dev/null; do sleep 20; done
echo "LOCK ACQUIRED $(date)"
npx --yes hyperframes@0.8.133 render -o renders/video.hi.mp4 --workers 6
rc=$?
rmdir /tmp/hf-render-lock-dir/lock
echo "RENDER DONE rc=$rc $(date)"

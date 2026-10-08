#!/bin/bash
# build + check (hindi); print only errors/summary
cd /Users/mdhussain/video_production/accounting-course/lessons/L14 && python3 build.py --lang=hi > .work/build.txt 2>&1 || { tail -5 .work/build.txt; exit 1; }
cd ../L14-hi && ../shared/with_slot.sh npx --yes hyperframes@0.8.133 check > ../L14/.work/check.txt 2>&1
grep -n "✗\|page_error\|error(s)\|errors," ../L14/.work/check.txt | grep -v " 0 error(s)" | head -30
grep -n "◇  Check" ../L14/.work/check.txt

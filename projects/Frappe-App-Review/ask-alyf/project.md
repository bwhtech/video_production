# Frappe App Review — Ask Alyf

## Intro (2026-10-11)

- Music: `~/Movies/ask-alyf/intro music.wav` (6.8s), copied to `graphics/assets/ask-alyf-intro-music.wav`.
  175.8 BPM, first beat 0.256s. Quiet groove to 4.0s, section change at 4.01, bass enters ~5.0,
  biggest kick 5.72, hi-hat peak 6.06, last hit 6.74.
- Layout stills: `intro-stills.html` (A–E). User picked E (marketplace pick).
  Header stills: `intro-stills-e.html`. User picked E4 (highlighter behind "Review").
  User feedback: the wide-tracked uppercase kicker read as weak. Use a big, normal-tracked title.
- Composition: `graphics/compositions/intro-ask-alyf.html`. Knobs are in `CFG` (series words,
  app name, pick tile, hop path, push scale). All cues come from `B(n)`, the beat grid.
- Renders: `graphics/renders/intro-ask-alyf.mov` (ProRes 4444 + alpha + music),
  `.webm` (VP9 alpha), `-preview.mp4` (composited over a sample still for review).
- To check/render: copy the composition to `index.html` in a scratch project with `theme/` and
  `assets/` symlinked (see `graphics/TEMPLATES.md`).
- Open: the app icon is a Lucide placeholder (`message-square-text`). Swap in the real Ask Alyf logo when available.

## Final video — chapters + thumbnail (2026-10-11)

- `~/Movies/ask-alyf/final.mp4` (13:00). Transcript: `edit/transcripts/final.json`, packed: `edit/takes_packed.md`.
  Scribe writes the app as "askalive"; the maker's name came out as "Rafael Meir" (unverified spelling).
- Chapters: `youtube-chapters.txt`.
- Thumbnail: `graphics/compositions/thumbnail-askalyf.html`. Face = frame 00:04.90 (lips closed; 5.25 showed teeth),
  graded with `assets/img/grade_plate_askalyf.py`. Logo keyed from `logo.webp` → `assets/img/ask-alyf-logo.png`.
  Variant B = `thumbnail-askalyf-screen.html`: frame 07:02 (facecam inset bottom-left, mouth closed,
  pie chart on screen), 16:9 crop from the bottom-left (src x0-1600, y180-1080), dark title panel top-left.
  User wanted "face + screen" to mean a real video frame with both, not a pasted card.
  The inset (src x24-346, y637-1055) is covered with `assets/img/askalyf-inset-face.png`, a 832×1080 crop of
  the 04.90 plate. In 07:02 the eyes looked up and the hands were cramped; the user asked for the swap.
  Renders: `graphics/renders/thumbnail-askalyf-{a,b}.{png,jpg}` (jpg = 1280×720 upload).

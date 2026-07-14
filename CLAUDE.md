## Introduction

This is a video production pipeline / tools for the Build With Hussain YouTube channel. We produce two kinds of videos:

* Shorts (verticle)
* Normal Tutorial videos (horizontal)

## Workflow

* We will use video-use for edits (cuts, cropping, etc.)
* eleven labs for generating captions (video use has the skils for this too)
* and hyperframes for motion/info graphics + thumbnails. (there is a skill for this too)

### Graphics & thumbnails — `graphics/` (HyperFrames)

Thumbnails and motion graphics live in the **`graphics/`** HyperFrames project
(replaces the old Remotion `~/Learning/bwh-video`). Theme = **frappe-ui**
espresso tokens: **violet** brand, **dark** default, **Inter** — see
**`graphics/THEME.md`**. Use `var(--…)` tokens, never hex. Reference component:
the thumbnail at `graphics/index.html`. Port more old Remotion components on
demand with `/remotion-to-hyperframes`. Always `cd graphics && npm run check`
after editing a composition.

### Synced multi-cam sources

When a project has two videos for the same recording (e.g. a facecam + a screen recording from the same take), they share **near-identical** audio content from the same mic — but the two files can start a few tens of milliseconds apart depending on which recorder the user clicked first (April 26 sources differed by 28ms).

- **Transcription** → use the **screen** recording. It's the canonical text source; cache the JSON in `edit/transcripts/` and never re-transcribe.
- **Voice for the final video** → use the **facecam** file (`compose_short.py`'s default). Video and audio share the same source clock so AV stays sample-aligned. Pulling video from facecam and voice from the screen file produces a small, audible lip-sync drift.

REFER for video-use skill: /Users/mdhussain/Developer/video-use/SKILL.md if not loaded via claude code directly.

Refer to @DESIGN.md for our design system.

## YouTube chapters

Always generate YouTube chapters in `HH:MM:SS Title` format (zero-padded,
e.g. `00:00:00`, `01:07:13`) — even for videos under an hour. First chapter
must be `00:00:00`.

## Animations

IMPORTANT: always consult `/animations-dev` skill after planning any animations

## Shorts (vertical 1080×1920) — production recipe

Established on the "What's New in Frappe Framework — April 26" project. Treat
this as the default unless the user asks otherwise. The composer lives at
`projects/Series/Whats-New-in-FF/<month>/edit/compose_short.py` (per-project
copy — clone it to a new project's `edit/` and adapt the shot JSONs).

### Project layout

```
<project>/
├── ff-<date>-facecam.mp4           # face camera, no demo audio worth using
├── ff-<date>-only-screen.mp4       # screen recording, CANONICAL audio source
├── footage/
│   └── <bg-music>.mp3              # licensed music for the shots
└── edit/
    ├── compose_short.py            # the composer
    ├── render_captions.py          # PIL rounded-pill caption renderer
    ├── transcripts/<screen>.json   # ElevenLabs scribe verbatim — screen ONLY
    ├── takes_packed.md             # phrase-level packed transcript
    ├── shotN_<feature>.json        # per-shot EDL + zoom + bg_music spec
    ├── clips_vertical/             # per-segment intermediates
    ├── captions/cue_NNN.png        # rendered caption pills
    └── shotN_<feature>.mp4         # final delivered short
```

Source pair: 1920×1080 @ 30fps, 5-min recording. **Transcribe the screen file
only** — facecam audio is identical and wastes credits. Use
`helpers/transcribe.py <screen.mp4>` then `helpers/pack_transcripts.py`.

### Layouts (1080×1920)

Per-range `layout` field in the shot JSON. Three options validated on the April 26 series; pick per-range based on what the speaker is doing.

**`split` (default)** — face top + screen middle + caption strip:
- `y=  0..960`   facecam — `crop=1080:960:380:0` (face roughly centered, slight left bias because the speaker sits right of source center)
- `y=960..1568`  screen — `scale=1080:608` flush against the partition top
- `y=1568..1920` brand-dark `#181B25` strip (caption shadow margin lands here)
- Captions anchor at `y=960` (the partition).

**`facecam_only`** — full-bleed vertical facecam, no screen pane:
- 9:16 slice of source: `crop=608:1080:616:0,scale=1080:1920` (centered on the speaker's face at source x≈920)
- Use for HOOK / pitch beats where the speaker is just talking and there's no screen action worth showing.
- Captions anchor at `y=1500` (lower-third, well clear of the face).

**`screen_focus`** — blurred speaker BG + screen pane centered in frame:
- Background: full-bleed facecam with `gblur=sigma=30` — speaker is recognizable but de-emphasized.
- Foreground: 1080×608 screen pane overlaid centered at `y=656..1264`.
- Use when the screen content is the focus and the speaker is ambient.
- Captions anchor at `y=1500` (below the screen, in the blurred region).

A typical short uses `facecam_only` for the hook, hard-cuts to `split` for the demo. (`screen_focus` is the alternative if the demo doesn't need the speaker visually present.) Hard cuts between layouts are fine — they read as deliberate transitions.

### Default screen crop

Screen recordings often have desktop wallpaper visible around the captured window (the April 26 series showed ~5% wallpaper on left/right and a thin strip on top). Add `screen_default_crop` to the shot JSON to trim it before scaling:

```json
"screen_default_crop": {"x": 96, "y": 54, "w": 1728, "h": 972}
```

Stays 16:9 so it scales cleanly to 1080×608. Per-range zoom regions still address the original 1920×1080 coordinate space, so they don't have to be recomputed when `screen_default_crop` changes.

### Cuts and pacing

- Word boundaries from the Scribe transcript only — never cut mid-word.
- **Padding** for tight social shorts: ~150–200 ms before the first kept word and after the last. Tighter for energy, looser for breathing room.
- **Cut long pauses**: scan the packed transcript for inter-phrase gaps ≥ ~1.0s and split the EDL across them. Pad each side ~150–200ms — generally drop ~0.6–1.5s of silence per gap.
- **60-second hard cap** on shorts (YouTube/Instagram format ceiling). Sum the range durations before writing the JSON.
- **Don't over-trim.** When forced to fit 60s, drop a complete sub-beat (a whole feature paragraph or example) rather than chopping individual phrases — the latter feels mangled, the former feels intentional. Filler-feeling phrases ("Let me show you with an example", halting bridges, "Okay?" interjections) are usually authentic and should be kept; only obvious retake/fumble blocks are "free" cuts.
- **Re-read the transcript for verbal repetition** before shipping. A speaker often re-states the same beat in slightly different words (the April 26 shot 4 had `"…and submit them."` immediately followed by `"I getDoc over each of those orders and then submit."`). Drop the second instance.
- Shot 1 of the April series ended up as 3 ranges (intro / demo / closer) bridging two natural pauses — this is the canonical pattern.

### Captions (cool, brand-aligned)

Implemented in `render_captions.py` — PIL renders one transparent PNG per cue because libass can't do rounded-corner backgrounds.

- 2-word UPPERCASE chunks, break on punctuation
- Pill: indigo `#3F67C0` at ~94% alpha, corner radius 32, 24px shadow margin
- Text: Helvetica Neue Bold (`/System/Library/Fonts/HelveticaNeue.ttc` index 1), size 68, white
- Drop shadow: 8px offset, 12px Gaussian blur, ~55% alpha
- Composited via ffmpeg overlay with `enable='between(t,t0,t1)'`

**Anchor (`y_anchor`)** — per-cue, derived from the segment's `layout`:
- `split` → `y_anchor=960` (pill bottom at the face/screen partition; visible pill ends ~24px above partition with shadow margin closing the gap)
- `facecam_only` / `screen_focus` → `y_anchor=1500` (lower-third, clear of the speaker's face)
- Override per-range with `caption_y_anchor`

Captions are allowed to cover the speaker's mic/chest, NEVER the screen.

**Word fixups** in `render_captions.py`:
- `WORD_MERGES` — combine consecutive transcript tokens into one (e.g. `"doc" + "type" → "doctype"`)
- `WORD_REPLACEMENTS` — regex substitutions for code-name transcription artifacts (e.g. `getDocs → get_docs`, `getAll → get_all`, `asiterator → as_iterator`); chunker uppercases at render time so these display as `GET_DOCS` etc. Add new entries as needed when you spot Scribe writing camelCase code as a single token.

### Screen zooms (ken-burns)

ffmpeg's `crop` filter only evaluates `w`/`h` at config time, so animated
crop dimensions don't work. Workaround in `screen_chain()`:

1. `split` the screen into `1+N` parallel paths
2. Full path: `scale=1080:608`
3. Each zoom path: `crop=W:H:X:Y → scale=1080:608 → format=yuva420p →
   fade alpha in @ in_at-ease → fade alpha out @ out_at`
4. Chain `overlay=format=auto` to composite each zoom on top of full
5. Pad to 1080×960 with `BG_DARK`

Per-range schema: `"zooms": [{in_at, out_at, ease, x, y, w, h}, ...]`
Times are SEGMENT-LOCAL (relative to that range's start). Default ease 0.4s.
Aim for 16:9 crop region (`w/h ≈ 1.78`) so scaling to 1080×608 doesn't squish.
Common picks:
- Form right-column zoom (Frappe DocType edit pages): `1280×720 @ (500, 80)`
- VS Code file explorer (first column): `720×405 @ (0, 160)`

### Audio

**Voice-cleanup chain**: `highpass=f=80`. That's it. **Do not apply broadband denoise** (`afftdn`, `anlmdn`) at default strengths — it makes voice sound watery / "fumbled". If hum is audible after highpass, add a SURGICAL notch instead: `bandreject=f=50:width_type=h:width=8` for 50Hz mains (India), 60Hz for US.

**Voice is built as ONE continuous WAV**, not concatenated per-segment AAC. The composer's `build_continuous_voice()` reads each source range from the **facecam** with `-ss/-t -i` in a single ffmpeg invocation and joins them with `acrossfade`. This avoids the artifacts of the naive approach:

1. Per-segment AAC extracts joined with `-c copy` leave AAC encoder priming discontinuities at every boundary — even with re-encoded concat, you hear faint clicks at cuts.
2. The 30ms `afade` per segment leaves ~25ms of pure silence at every boundary; the bg-music sidechain compressor releases into that silence and re-attacks → audible "swell-then-duck" at every cut, perceived as "abrupt radio noises".

**Silence-padded acrossfade** (the critical detail): a naive acrossfade chain compresses the audio timeline by `crossfade × (n-1)` because each crossfade overlaps two real-voice regions. The audio drifts ahead of the (uncompressed) video — by the last segment in an 8-range short you hear ~420ms of lip-sync drift. Fix: pad each non-last segment with `crossfade` seconds of trailing silence (`apad=pad_dur=crossfade`). The crossfade now overlaps `silence_tail × voice_head` instead of `voice × voice` — segment N+1's voice ramps in over the crossfade window from 0 to full while segment N's silence fades out (no audible content). Voice content keeps its full timeline; AV stays in sync.

Default crossfade duration: 60ms. Triangular curves both sides (`c1=tri:c2=tri`) for equal-energy.

### Background music

Default `Chase The Sun - Bel Tempo.mp3` from the April project's `footage/`.
Spec in `shot.bg_music`:
```json
{
  "path": "../footage/<file>.mp3",
  "volume": 0.03,                  // very low — the music is texture, not presence
  "fade_in": 0.5,
  "fade_out": 1.5,
  "start_at": 0,
  "duck": true                     // sidechain compress against voice
}
```

**Validated levels** (talking-head shorts):
- `0.12` — original, hearable as a music bed underneath the voice
- `0.03` — final landing for the April 26 series; music is barely-perceptible texture, doesn't compete with voice at all

Sidechain ducking parameters: `threshold=0.04, ratio=8, attack=20ms, release=300ms` — music sits underneath the voice during speech, swells back during pauses. With the silence-padded acrossfade above, the compressor only sees real speaker breaths (not concat boundaries), so no swell-clicks at cuts.

**Always mix bg music BEFORE captions and BEFORE loudnorm**; the final two-pass loudnorm normalizes the voice+music mix to -14 LUFS.

### Render flow (compose_short.py)

1. **Per-segment extract** — per range, build the visual layer per `layout` (split / facecam_only / screen_focus) with zooms applied; encode video (libx264 fast CRF 20, yuv420p, 30fps, `-bf 0`, `setpts/asetpts=PTS-STARTPTS`). The audio in these per-seg files is unused downstream — they exist for the visual-track concat.
2. **Lossless video concat** (`-c copy`) of segments (skip if 1 range).
3. **Build continuous voice WAV** — read every source range from the **facecam** in one ffmpeg invocation, apply highpass, silence-pad each non-last segment, chain `acrossfade` with 60ms triangular crossfade. Output: one `voice_continuous.wav`, sample-aligned to video timeline.
4. **Replace audio**: mux concat'd video with `voice_continuous.wav` (apad to ensure audio ≥ video, `-shortest` so video drives output duration).
5. **Mix bg music** with sidechain ducking — reads voice + music, sidechain-compresses music against voice, re-encodes audio.
6. **Composite caption PNGs** as overlays (one `-i` + overlay chain per cue).
7. **Two-pass `loudnorm`** to `I=-14 LUFS, TP=-1 dBTP, LRA=11` social targets.
8. **Two-step AV align** (lossless, no re-encode):
   a. Probe both stream `start_time`s. Video has accumulated ~10–55ms of mux-level offset from x264 priming + edit-list gymnastics; audio is at 0. The container difference is the perceived "audio leads video" lag.
   b. Re-mux with `-i input -itsoffset {skew} -i input -map 0:v -map 1:a -c copy` → audio's container start shifts forward to match video's.
   c. `-ss {v_start} -c copy -avoid_negative_ts make_zero` → trim leading offset; both streams now report `start_time=0.000` in ffprobe and stay sample-aligned in playback.

Run: `python compose_short.py shotN_<feature>.json -o shotN_<feature>.mp4`

### Iteration etiquette

- Sample frames with `ffmpeg -ss <t> -vframes 1 -q:v 2` and Read them — verify every cut boundary, every zoom edge, every caption position.
- Audio cannot be verified visually — always have the user audition and confirm before moving to the next shot. For sync-suspect issues, extract waveform and check per-ms RMS around boundaries with a small Python script (saved approach: `wave + struct` + 5ms windows).
- After every render, `ffprobe stream=start_time` on both streams. Both should be `0.000`. Anything else means the AV align step regressed.
- Save iteration history in `edit/project.md` (one section per session) so the next session can resume context without re-deriving decisions.

### Common pitfalls (and the fixes that worked)

- **Audio click/swell at every cut** → caused by per-segment AAC concat + sidechain compressor releasing into inter-segment silence. Fixed by single-pass continuous voice WAV with silence-padded acrossfade.
- **Audio leads video by ~10–50ms (lip-sync drift)** → caused by mp4 muxer pushing video's `start_time` forward while audio stays at 0. Fixed by two-step align: `-itsoffset` to match, then `-ss` trim — both lossless `-c copy`.
- **Audio drifts further ahead at every cut, peaking at last segment** → caused by naive acrossfade compressing the audio timeline. Fixed by silence-padding non-last segments so the crossfade overlaps in silence.
- **Video lags audio by ~28ms** → caused by using screen-recording audio with facecam video (different file start times). Fixed by sourcing voice from facecam (same source clock as video).
- **Caption renders `GETDOCS` instead of `GET_DOCS`** → Scribe writes camelCase code as a single token. Add to `WORD_REPLACEMENTS` in `render_captions.py`.
- **Caption blocks the speaker's face in `facecam_only` mode** → use the layout's default `y_anchor=1500` (lower-third); only `split` mode anchors at `y=960`.
- **Zoom region cuts off the focus element** → sample the source frame at the moment the zoom should land, eyeball the target's source-coordinate position, then center the 16:9 zoom region (`w/h ≈ 1.78`) on it.
- **Speaker repeats a beat verbally** → re-read the transcript before locking; the speaker often says the same thing twice in slightly different words. Drop the second take.

## Verification

After every edit, verify by taking screenshots to see for obvious issues like:

1. Graphics covering talking face
2. crops on incorrect area (face got cut, etc.)

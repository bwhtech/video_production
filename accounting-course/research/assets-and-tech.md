# Assets & Tech Research: Animated Accounting Course

Scope: 12–15 lessons, 4–7 min each (~75 min total), 1920×1080, built in HyperFrames
(`graphics/`), playful cartoon style (not corporate). English VO first, Hindi dub later.

Researched 2026-10-05. Live API calls were made against the user's ElevenLabs account.
One tiny test image was generated through Codex to confirm the invocation works.

---

## 0. Recommended stack (decisions)

| Area | Decision | Why |
|---|---|---|
| **Narration** | ElevenLabs **`eleven_v4`** via `/v1/text-to-speech/{voice_id}/with-timestamps`, one request per scene/paragraph, fixed `seed`, alias pronunciation dictionary | v4 (launched 2026-09-28) is ElevenLabs' most expressive model. It supports 90+ languages (Hindi included) and audio tags, and it stitches multi-request projects better than v3. Fall back to `eleven_multilingual_v2` if a voice sounds unstable on long passages. |
| **Voice** | Audition 6 shortlisted voices (§1.2). Prefer a voice that has **verified Hindi**, so EN and HI use one `voice_id`. | One voice in both languages keeps the course consistent. |
| **Hindi** | Translate the **script**, then run TTS again with the same voice and `language_code: "hi"`. Re-time the animation from the new timestamps. Do **not** use the Dubbing API as the main path. | We own the scripts and the timeline. The Dubbing API gives less control, and its transcript editing through the API is Enterprise-only. |
| **Characters** | **Hybrid:** GPT Image 2.5 (through Codex) for design exploration, model sheets and style frames. Then **rebuild each character as a rigged, layered SVG** animated with GSAP. | A rigged SVG looks the same in all 15 lessons and can be reused, seeked and diffed. It renders fast in software GL, and it matches the flat style refs (Kurzgesagt, TED-Ed, Two Cents). |
| **Boil/"handmade" feel** | SVG `feTurbulence` + `feDisplacementMap`, with `seed` stepped at 12 fps on the GSAP timeline | Gives the p5.brush "boiling line" look without WebGL cost and stays deterministic. |
| **Backgrounds / textures** | GPT Image 2.5 for painted backgrounds and a paper texture, or SVG backgrounds drawn in code. Grain only if the user approves it (see the no-gradients rule, §7). | |
| **Icons** | `lucide-static` (inline SVG strings, build time). Never use the CDN `createIcons()` at render time. | Project rule. The HyperFrames determinism rules ban render-time network fetches. |
| **SFX** | Kenney.nl audio packs (CC0), Pixabay SFX, Mixkit SFX, Freesound filtered to CC0 | All are free for commercial use with no attribution. |
| **BGM** | YouTube Audio Library ("attribution not required" filter) as the safest choice. Pixabay Music as second choice. One looping bed per lesson at about −30 LUFS under the VO. | Avoids Content ID trouble on a monetized channel. |
| **Fonts** | **Baloo 2** (headings + numbers, Devanagari, `tnum`, variable 400–800) + **Inter** (EN body/UI) + **Mukta** or **Noto Sans Devanagari** (HI body) + **Kalam** (handwritten notes, Latin + Devanagari) | All checked locally for Devanagari, the ₹ glyph and tabular numerals (§6). |
| **HyperFrames version** | Move the pin from `0.7.56` to **≥ 0.7.90** before any canvas or p5 work | 0.7.90 adds `hf-seek` `waitUntil()` for async canvas renders (§2.5). |

---

## 1. ElevenLabs voice

### 1.1 Account status (live API)

- Tier: **`payg`**. Character limit **41,218** this cycle, **4,653** used. That is not enough for one full pass of the narration (~66k chars, §1.6). Top up or move to a plan before production.
- Voices already in the account worth noting:
  - **Kanika: Relatable Hindi Voice** `H6QPv2pQZDcGqLwDTIJQ` (professional, native Hindi). A reference or fallback for the Hindi dub.
  - Premade female voices: Matilda (upbeat educator), Jessica (playful), Alice (British educator), Bella, Lily, Sarah.
  - `Hussain Nagaria` clone `bc0fjOYm9ZzIKlBnDdRk`.

### 1.2 Shortlist (6), previews in `research/voice-candidates/`

Pitch was measured from each preview with autocorrelation F0. Lower Hz means a deeper voice. More semitones (st) means more intonation, which reads as more "exciting".
Each preview has a different script, so treat these numbers as rough.

| # | Voice | voice_id | Accent / age | Verified Hindi | Median F0 | Range | Notes |
|---|---|---|---|---|---|---|---|
| 1 | **Tara: Conversational and Expressive** | `P7vsEyTOpZ6YUTulin8m` | Indian, young | yes (multilingual_v2) | 205 Hz | **11.1 st** | Professional actress. Most expressive of the set at mid pitch. Indian English fits an ERPNext/₹ audience, and Hindi is native-sounding. |
| 2 | **Monika Sogam: Natural Conversations** | `EaBs7G1VibMrNAuz2Na7` | Indian, young | yes (multilingual_v2 `hi-marwadi`, flash `hi-khariboli`) | 182 Hz | 7.1 st | Smooth and lower. Known for EN + HI (200M+ chars). Safest for Hindi; a little less "exciting". |
| 3 | **Nichalia Schwartz: Bright and Friendly** | `XfNU2rGpBa01ckF309OY` | American, young | yes | 235 Hz | 8.7 st | Built for e-learning and long-form narration. Bright and warm. |
| 4 | **Amelia: Enthusiastic and Expressive** | `ZF6FPAbjXT4488VcRRnw` | British, young | yes | 246 Hz | 8.9 st | One of the most-used library voices (10B+ chars/yr). Energetic. The highest pitch of the six, which may be at the edge of "not too high". |
| 5 | **Paige: Engaging Narrator** | `NDTYOmYEjbDIVCKB35i3` | American, young | yes | 174 Hz | 6.3 st | Smooth and low, built for long-form and audiobooks. Needs `[excited]` tags or style to add energy. |
| 6 | **Matilda (premade)** | `XrExE9yKIg1WjnnlVkGX` | American, middle-aged | n/a (premade, multilingual) | 186 Hz | 11.1 st | "Pleasing alto", upbeat educator. **Premade, so it can never be withdrawn.** The preview is only 2.6 s. |

Extra file: `Kanika-hindi-ref.mp3`, a native Hindi benchmark for judging how each candidate sounds in Hindi.

**Recommendation:** first audition **Tara**, then Nichalia and Matilda. If Tara's English feels right, use her for both languages.
If the course targets a global English audience first, choose Nichalia or Matilda and check their Hindi output against Kanika.

**Next step (not done; it costs credits):** generate the *same* ~300-character accounting paragraph with each voice on `eleven_v4`, in EN and in HI (~3.6k chars, about $0.10–0.30).
That gives a like-for-like comparison. The previews above all have different scripts.

Library voices have a `notice_period` of 730 days, so the owner must give 2 years' notice before removal. That is acceptable. Premade voices carry no risk.

### 1.3 Models (as of Oct 2026)

| model_id | Use | Limit/request | Notes |
|---|---|---|---|
| **`eleven_v4`** | **Main narration** | 10,000 chars | Most emotive. Audio tags (`[excited]`, `[curious]`, `[pause]`, `[laughs]`) follow better than in v3. 90+ languages. IPA inline as `/ˈlɛdʒər/`. SSML `<break>` / `<phoneme>` are **not** supported. |
| `eleven_v4_turbo` | Drafts / scratch VO | n/a | ~150 ms latency, half the price of v4. |
| `eleven_v3` | Previous generation | 5,000 | Audio tags. Superseded by v4. |
| `eleven_multilingual_v2` | **Fallback** | 10,000 | Docs still call it "most stable on long-form". Supports `<break time="1.0s"/>`. Hindi is verified on all 5 library candidates with this model. |
| `eleven_flash_v2_5` | Cheap / fast | 40,000 | Supports pronunciation-dictionary phoneme rules. Lower expressiveness. |
| turbo v2 / v2.5 | Deprecated | | Replaced by Flash. |

### 1.4 Generation recipe

```bash
curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE/with-timestamps?output_format=mp3_44100_192" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" -H "Content-Type: application/json" -d '{
    "text": "[excited] So where did all that money actually go?",
    "model_id": "eleven_v4",
    "language_code": "en",
    "seed": 4242,
    "voice_settings": {"stability": 0.45, "similarity_boost": 0.8, "style": 0.35, "speed": 1.0},
    "previous_text": "<last sentence of previous chunk>",
    "next_text": "<first sentence of next chunk>",
    "pronunciation_dictionary_locators": [{"pronunciation_dictionary_id": "...", "version_id": "..."}],
    "apply_text_normalization": "off"
  }'
```

- **Timestamps:** the response has `audio_base64` plus `alignment` / `normalized_alignment`, with character-level `characters[]`, `character_start_times_seconds[]` and `character_end_times_seconds[]`.
  Fold these into words. Use them for (a) captions and (b) **GSAP cue times**: a character points, a number pops or a T-account fills on the exact word.
  Store them in `lessons/NN/vo/scene-XX.json`. The compositions read these cue times as data, so the Hindi version re-times automatically.
- **Chunking:** one request per scene or paragraph (≤ ~1,500 chars). Keep the same `seed` and voice settings, and pass `previous_text`/`next_text` for continuous prosody.
  `previous_request_ids` (max 3) also exists. Test it on v4 before relying on it.
- **Speed:** `speed` 0.7–1.2. Aim for ~150 wpm. Tutorials should breathe.
- **Pronunciation dictionaries** (PLS XML, max **3** per request):
  - *Alias* rules work on every model. Use them for the term list: `ERPNext → E R P Next`, `GST → G S T`, `Dr → debit`, `Cr → credit`, `A/c → account`, `FY → financial year`.
  - *Phoneme* rules (IPA/CMU) are documented for Flash v2. On v4, write IPA inline between slashes instead.
- **Money and numbers:** turn off normalization (`apply_text_normalization: "off"`) and write amounts out in the script.
  Indian numbering (`₹1,50,000` = "one lakh fifty thousand rupees") is easy for auto-normalization to get wrong. A small preprocessing step in the script pipeline should expand ₹ amounts per language.
- **Integration:** `media-use`'s TTS doc lists ElevenLabs as route 2, *without* word timestamps (it uses plain `/text-to-speech`).
  Call `/with-timestamps` directly with a small script instead. Keep `ELEVENLABS_API_KEY` in `/Users/mdhussain/Developer/video-use/.env`.

### 1.5 Hindi: keep the same voice

1. **Recommended: translated-script TTS.**
   - Translate each scene script into Hindi. Use conversational "Hinglish": accounting terms such as *debit, credit, ledger, journal entry* usually stay in English, written in Devanagari or Latin script. Have a human review it.
   - Generate with the **same `voice_id`** on `eleven_v4` (or `eleven_multilingual_v2`) with `language_code: "hi"`.
   - v4 claims voices "speak any other language while adopting native accents". An Indian voice (Tara, Monika) will sound most natural.
   - Use the HI timestamps to re-time the scenes. Hindi usually runs 10–25% longer, so build scene durations from VO length and don't hard-code them.
2. **Fallback: Dubbing API** (`POST /v1/dubbing`, `target_lang: "hi"`).
   - It auto-detects speakers and clones the source voice (clone strength 0–10, default 7).
   - Paid tiers have no watermark. Dubbing v1 costs about $0.50/min without watermark; v2 (alpha) costs $2.20/min.
   - Transcript editing and regeneration through the API are **Enterprise-only**, and Dubbing Studio v1 is in maintenance mode.
   - Use it only if we lose the scripts or need a quick preview.
3. **Voice cloning:**
   - Instant Voice Clone now needs only ~10 s of audio. Professional Voice Clone is supported on v4.
   - Clone only a voice you have rights to, such as the user's own. Do not clone a library voice.

### 1.6 Cost estimate (~75 min narration)

- 75 min × ~150 wpm ≈ 11,250 words ≈ **~66k characters** per language for one clean pass.
- Allow ~2.5× for retakes and auditions: **~165k chars per language**.

| Item | Rate | One pass | With retakes |
|---|---|---|---|
| EN on `eleven_v4` | $0.08 / 1k chars (regular; $0.022 launch promo until Oct 12) | ~$5.30 | ~$13 |
| HI on `eleven_v4` | same | ~$6 | ~$15 |
| *Alt: Dubbing v1 (HI)* | $0.50 / min | ~$37.50 | n/a |
| *Alt: Dubbing v2 (HI)* | $2.20 / min | ~$165 | n/a |

- Both languages total about **$30 in characters** at API rates. That is cheap, so cost should not limit retakes.
- The pricing page currently shows inflated "v4 characters" per plan during the launch promo (Creator $22 → "1M v4 chars"). Check the plan math again after Oct 12.
- The account's payg limit (41k) must be raised either way.

---

## 2. Characters

### 2.1 Options compared

| Option | Consistency over 15 lessons | Expressiveness | Reuse | Render cost in HF | License | Verdict |
|---|---|---|---|---|---|---|
| **(a) Procedural canvas (p5.js + p5.brush, like Clawd)** | High (code) | Very high: emotions, boil, squash/stretch | Good | **Poor.** WebGL brush fills in HF's default *software* GL take seconds per frame (§2.5) | MIT (kit), MIT (p5.brush) | Borrow the principles, not the runtime |
| **(b) Free illustration libraries** | Medium (mix-and-match, but generic) | Static poses only | OK | Trivial (SVG) | see below | Use for props and extras only |
| **(c) Lottie / Rive characters** | Low (each file from a different artist) | Pre-baked actions only | Poor (can't direct new poses) | Lottie: native adapter, cheap. Rive: no adapter, not seekable without custom glue | Lottie Simple License | Only for one-off flourishes (confetti, coins) |
| **(d) Rigged SVG + GSAP** | **Highest:** one file per character, versioned | High: swappable eyes/mouths, arm rotations, squash, emotes | **Best:** `<template>` sub-compositions + a shared `rig.js` | Cheap (DOM/SVG, no WebGL) | Ours | **Recommended**, with GPT Image for design (§3) |

**(b) Library licenses:**

| Library | License |
|---|---|
| **Open Peeps** (Pablo Stanley) | **CC0**. 584k combinations, hand-drawn, SVG. Best fit for "playful". |
| **Humaaans** | **CC0**. Flat, Sketch/Figma/SVG. |
| **Blush** | Collections by many artists. Free tier: attribution and PNG only. Pro for SVG. License varies per collection, so check each one. |
| **unDraw** | unDraw license: free commercial use, no attribution. You may not redistribute the art as a competing library. Recolorable SVG. |
| **DrawKit** | Free packs under the DrawKit license (commercial OK, no attribution). Some packs are paid. |
| **Storyset** (Freepik) | Free **with attribution**; Premium removes it. Exports animated SVG. |
| **IconScout free** | Free assets need **attribution**. Mixed quality. |

LottieFiles free animations use the **Lottie Simple License**: commercial use and modification allowed, no attribution required, and no compiling the files into a competing service.
HyperFrames has a native Lottie adapter (`window.__hfLottie`, seekable, duration inferred).

### 2.2 Recommendation: hybrid "AI-designed, SVG-rigged" cast

1. **Design (GPT Image 2.5 via Codex, §3):**
   - Explore 3–4 cast designs in the target style: a host/mascot, a small-shop owner, a customer and an accountant.
   - The user picks one. Then generate a **model sheet** (front, 3/4, side, back + 8 expressions) and **style frames** (2–3 full scenes).
2. **Rebuild as SVG:**
   - Trace each character into one SVG with flat fills (no gradients). Use a first auto-trace with `vtracer` (MIT, pip) on the flat-color sheet, then clean it up into named groups.
   - Suggested structure: `#root > #shadow, #legs, #body, #arm-L(#upper,#fore,#hand), #arm-R…, #head > #face > #eyes(#eye-L,#eye-R,#lid-L,#lid-R), #brows, #mouth > [#m-rest,#m-smile,#m-open,#m-O,#m-E,#m-wide…], #props-slot`.
   - Give each limb a `transform-origin` at its joint, or draw it around a local (0,0) inside a positioning `<g>`. The HF GSAP perf doc recommends this for stable SVG pivots.
   - Draw key views (front / 3/4 / side) as separate groups and swap them on turns. This is the Clawd "drawn key views, never 3D" rule.
3. **Rig library (`graphics/characters/rig.js`):** pure functions that add tweens to the composition's paused timeline.
   - `blink(tl, el, times)`
   - `talk(tl, el, words)`: switches mouth shapes on the ElevenLabs word/char timestamps, open on vowels and closed on pauses.
   - `emote(tl, el, 'surprised', t)`: anticipation, take, overshoot, then settle. This is the Clawd `emotions()` idea.
   - `point(tl, el, target, t)`, `hop`, `wave`, `idle(tl, el, t0, t1)`: a subtle breathing loop with a finite repeat count, never `repeat:-1`.
4. **Handmade feel:**
   - Apply an SVG filter to character groups: `<feTurbulence baseFrequency=".02" numOctaves="2" seed="N"/>` + `<feDisplacementMap scale="2.5"/>`.
   - Step `seed` at 12 fps with `tl.set(turb, {attr:{seed:i}}, i/12)`. Use a different seed per element, the same way Clawd's `boilSeed()` works.
   - Keep the boil subtle (scale 1.5–3 px). Check render cost per frame early.
5. **Reuse:**
   - Each character is a HyperFrames sub-composition or `<template>`, loaded into every lesson.
   - Expressions, props and outfits are toggled groups, never redrawn.
   - Keep a `characters/SHEET.html` composition as the living model sheet. Render it to PNG after every change to catch drift.

**Why this approach:** a rigged SVG is the only option that guarantees identical characters in lesson 1 and lesson 15.
It also lets Claude direct new acting beats in code from the script, and it renders as cheaply as the rest of the DOM.
Pure AI image generation can't hold identity across hundreds of frames. Library characters look generic and can't act. Lottie/Rive files can't be directed.

**From the Clawd kit**, copy its *ANIMATION_GUIDE.md* rules into the course's animation doc. Most of it carries over unchanged to SVG + GSAP:

- Storyboard with timed "reads".
- One read at a time: fast actions, slow meanings.
- Something happens in every scene.
- Anticipation and overshoot on every change.
- No twinning (offset left and right arms and blinks).
- Characters big in frame.
- A transition at every seam.
- The ending rhymes with the opening.

Drop its "no text" rule. An accounting course needs numbers and labels on screen.

### 2.3 Illustration libraries: where they still help

- Use **Open Peeps / Humaaans** for crowd extras such as customers in a queue.
- Use **unDraw / DrawKit** for props and background objects.
- Recolor all of them to the course palette.
- **Lottie:** use free LottieFiles animations only for effects (coin burst, confetti, checkmark). Check each file's license on its page.

### 2.4 Rive

Rive state machines advance with `advance(dt)` and hold internal state, so they can't seek frame by frame. HyperFrames also has no Rive adapter. Skip it.

### 2.5 Can p5.js + p5.brush run inside HyperFrames?

**Technically yes. Not recommended for characters.**

- **Seek hook:**
  - The HF runtime dispatches a global `hf-seek` event (`{detail:{time}}`) on every seek. The Three/TypeGPU adapters always call it, not only when Three is loaded (checked in `hyperframe-runtime.js`).
  - A p5 sketch in instance mode with `noLoop()` can listen for it and run `redraw()` at `e.detail.time`. Clawd's shots are already pure functions `fn(t, lt, dur)`, so they fit.
- **Async:**
  - p5 2.x `redraw()` and Clawd's `renderAt()` are async.
  - HyperFrames **0.7.90** adds `e.detail.waitUntil(promise)`, which must be called synchronously in the listener, so the renderer waits for the canvas.
  - The project pins **0.7.56**, which doesn't have it. Upgrade first.
  - Set root `data-duration`. Three-style adapters don't infer duration.
- **Render cost:** this is the deal-breaker.
  - HF's engine defaults to `browserGpuMode: "software"` (SwiftShader). Hardware GL is opt-in through `PRODUCER_BROWSER_GPU_MODE=hardware|auto`.
  - The Clawd README says watercolor fills already take *seconds per frame* on integrated GPUs.
  - 75 min × 30 fps = **135,000 frames**. At 1 s/frame that is ~37 h of render on one worker, before any retakes.
  - SVG/DOM frames render in tens of milliseconds.
- **Where p5.brush still fits:** pre-render static assets offline, such as watercolor washes, paper and brush-texture overlays, and use them as PNGs. You can also use it for a rare hero shot.

---

## 3. Image generation: GPT Image 2.5 via Codex CLI

The user requires GPT Image 2.5 through Codex for image generation.
Installed: `/Users/mdhussain/.nvm/versions/node/v24.15.0/bin/codex`, **codex-cli 0.160.0**.
`codex features list` shows `image_generation: stable, true`.

### 3.1 How it works

- Codex exposes a **built-in `image_gen` tool**, driven by the system skill `~/.codex/skills/.system/imagegen/SKILL.md`. It uses the ChatGPT/Codex subscription; **no `OPENAI_API_KEY` is needed**.
- There is **no dedicated CLI flag** for image generation or for picking the image model. You ask the agent in the prompt.
  `-m` selects the *agent* model, not the image model. `-i/--image` attaches **reference images**.
- Output is saved to `~/.codex/generated_images/<thread_id>/exec-<uuid>.png`. Ask Codex to copy the file into the workspace.
- **Fallback CLI** (`~/.codex/skills/.system/imagegen/scripts/image_gen.py generate|edit|generate-batch`):
  - Requires `OPENAI_API_KEY` and defaults to `gpt-image-2`.
  - It accepts any `gpt-image-*` model, so `--model gpt-image-2.5-sunburst` (precision) or `gpt-image-2.5-flare` (speed) are the explicit 2.5 API ids.
  - Exposes `--size` (up to `3840x2160`), `--quality`, multiple `--image` references and `--mask`.
  - CLI `gpt-image-2` can't do `--background transparent`. The built-in tool can return real alpha if you ask for a transparent background.

### 3.2 Verified invocation (1 test image generated)

```bash
cd <workdir>
codex exec --skip-git-repo-check -s workspace-write --json -o last.txt \
  "Use the built-in image_gen tool exactly once to generate <spec>. Then copy the saved PNG into the current directory as <name>.png and reply with only the saved path." \
  < /dev/null > events.jsonl
```

Results from the test:

- Exit 0 in about 60 s. The output was a 1254×1254 RGB PNG.
- Codex loaded the imagegen skill, called the tool, then ran `cp` from `~/.codex/generated_images/<thread>/…`.
- The `--json` event stream does **not** include the image event itself. It shows only agent messages and commands. Rely on the copy step, or find the newest file under `generated_images/<thread_id>/`. `thread_id` is in the first JSON event.
- Always pass `< /dev/null`, or Codex waits on stdin ("Reading additional input from stdin…").
- **Model version caveat:** the C2PA manifest says `softwareAgent: ChatGPT / gpt-image` with no version number, so this run could not prove it was 2.5.
  There is a known open bug where Codex advertised Images 2.5 while the built-in tool produced 2.0 (openai/codex #44369 → #43965).
  If exact-2.5 output is a hard requirement, use the fallback CLI with `--model gpt-image-2.5-sunburst`. That needs an API key.

Scripted wrapper (suggested `accounting-course/tools/gen_image.sh`):

```bash
#!/usr/bin/env bash
# usage: gen_image.sh <out.png> <prompt-file> [ref1.png ref2.png ...]
out=$1; prompt=$2; shift 2
refs=(); for r in "$@"; do refs+=(-i "$r"); done
codex exec --skip-git-repo-check -s workspace-write -C "$(dirname "$out")" "${refs[@]}" -o /dev/null \
  "$(cat accounting-course/prompts/STYLE_BIBLE.txt "$prompt")
Use the built-in image_gen tool exactly once. Attached images are REFERENCES (Image 1 = character model sheet, Image 2 = style frame): match their character design, palette and line style exactly.
Copy the saved PNG to $(basename "$out"). Reply with only the path." < /dev/null
```

### 3.3 Where it fits in this pipeline

| Use | Fit | Notes |
|---|---|---|
| Cast exploration / mood boards | **Excellent** | Quick variations. The user picks the direction. |
| **Character model sheets** (turnaround + expressions) | **Excellent**, as the *spec* for the SVG rig | One canonical sheet per character, kept in git: `characters/<name>/model-sheet.png`. |
| Style frames (key scenes per lesson) | **Excellent** | Lock the look before animating. Also good for storyboard thumbnails. |
| Backgrounds (shop, office, bank, market) | **Good** | Ask for **landscape**, then upscale or crop to 1920×1080. You can also generate separate foreground/background layers for parallax. Flat style, no text in the image. |
| Paper/grain textures | Good | Tileable, low-contrast. User sign-off needed (§7). |
| Thumbnails | Good | Combine with the existing HyperFrames thumbnail flow in `graphics/`. |
| Frame-by-frame character animation | **No** | Identity drifts between generations, and there is no seed control in the built-in tool. Animate the SVG rig instead. |
| Text, numbers, ledgers, T-accounts | **No** | Build these in HTML/SVG so numbers are exact, can be animated, and can be translated for Hindi. |

### 3.4 Keeping the character consistent across generations

1. **Canonical references:** after approval, freeze `model-sheet.png` and `style-frame.png`. Attach both with `-i` to *every* later generation, and label their roles in the prompt ("Image 1 = model sheet: identity reference; do not change proportions/outfit").
2. **Fixed prompt blocks:** keep `STYLE_BIBLE.txt` (medium, line weight, palette as exact hex values, flat fills/no gradients, lighting, "no text") and `CHARACTER_<name>.txt` (proportions such as "head ≈ 40% of height", silhouette, outfit, colors, distinguishing marks). Paste them verbatim. Only the scene line changes.
3. **One change per iteration.** For pose or expression variants, use **edit** semantics on the approved sheet ("change only the pose; keep face, outfit, palette identical") instead of a fresh generate.
4. **Neutral backgrounds for character art:** ask for a plain flat background or transparency, so tracing to SVG is clean.
5. **Review loop:** compare every new image side by side with the model sheet. Reject any drift and don't patch it later.
6. The final on-screen character is the **SVG rig**, so small differences between AI images never reach the video.

### 3.5 Best hybrid (summary)

**GPT Image 2.5 designs, SVG/GSAP performs.**

- Image generation produces the look: cast designs, model sheets, style frames, backgrounds, textures, thumbnails.
- The cast is rebuilt once as rigged SVG and animated in code from the VO timestamps.
- Procedural characters (p5.brush style) stay as an *option* for a special hero sequence, or for pre-rendered texture overlays.

---

## 4. Icons: Lucide

- Packages: **`lucide-static`** (raw SVG strings / files, v1.52.0) and **`lucide`** (vanilla JS, same version).
- Several existing compositions load `https://cdn.jsdelivr.net/npm/lucide@0.469.0/dist/umd/lucide.min.js` and call `createIcons()` at runtime.
  That is a **render-time network fetch**, which HyperFrames' determinism rules ban ("inline or pre-bundle").
- **Inline at build time:**
  ```bash
  npm i -D lucide-static
  # one icon -> inline SVG
  cat node_modules/lucide-static/icons/wallet.svg
  ```
  Or in a small Node build step:
  `import { Wallet, Receipt, Landmark } from 'lucide-static'` (exports SVG strings). Then write them into the composition HTML or a `graphics/icons/` sprite.
- Style them with CSS (`stroke: currentColor; stroke-width: 1.75`) and animate them as SVG (stroke-draw via `stroke-dasharray`, scale pops).
- Useful accounting icons: `wallet, banknote, coins, piggy-bank, landmark, receipt, receipt-indian-rupee, indian-rupee, calculator, scale, book-open, notebook-pen, file-spreadsheet, chart-pie, chart-column, trending-up/down, hand-coins, handshake, store, truck, package, building-2, calendar, clipboard-check, scroll-text, percent, arrow-left-right`.
- If an icon is missing, ask the user (DESIGN.md rule).

---

## 5. Sound

### 5.1 What `media-use` already has

- `resolve.mjs --type sfx|bgm` searches the **HeyGen catalog** (10k+ BGM tracks, plus SFX). This needs `heygen` CLI auth; run `resolve.mjs --doctor`.
- The manifest lists a **bundled 19-file Pixabay SFX library**: chime, click, click-soft, error, glitch ×3, impact-bass ×2, key-press, notification, ping, **pop**, riser, sparkle, typing, **whoosh** ×3.
  In this install, though, `.claude/skills/media-use/audio/assets/sfx/` holds only `CREDITS.md` + `manifest.json`. **The mp3 files are missing.** Re-install the skill or source the files again.
- `graphics/assets/sfx/` already has `whip.wav` and `whoosh.wav`.
- Missing for this course: coin, cash register, paper rustle, pencil scribble, stamp, page flip.

### 5.2 Free SFX sources

| Source | License | Attribution | Good for |
|---|---|---|---|
| **Kenney.nl** audio packs (*Interface Sounds, UI Audio, Impact Sounds, RPG Audio* (coins, cloth, book/paper), *Casino Audio* (chips, cards), *Digital Audio*, *Music Jingles*) | **CC0** | No | Pops, clicks, coins, paper, dings. Consistent family sound. **First choice.** |
| **Pixabay Sound Effects** | Pixabay Content License | No | Cash register, pencil scribble, paper rustle, whoosh. Don't redistribute standalone. |
| **Mixkit** SFX | Mixkit Free License | No | Polished whooshes, pops, "success" dings. |
| **Freesound** | Per-file (filter **CC0**) | CC0: no. CC-BY: yes | Real pencil-on-paper, ledger page flips, rubber stamp. Skip NC files. |
| **Zapsplat** | Free tier: attribution required; Gold removes it | Yes (free) | Large library. Use only if the others miss. |

Shopping list: `pop-1..3`, `whoosh-soft`, `swoosh-in/out`, `coin-drop`, `coins-jingle`, `cash-register`, `paper-rustle`, `page-flip`, `pencil-scribble`, `stamp`, `ding-correct`, `buzz-wrong`, `click-soft`, `tick`.
Normalize them all to about −20 LUFS peak-safe, mix SFX about 6–10 dB under the VO, and store them in `accounting-course/assets/sfx/` with a `CREDITS.md`.

### 5.3 Background music (YouTube-monetized channel)

| Source | License | Monetization notes |
|---|---|---|
| **YouTube Audio Library** (Studio → Audio Library, filter "Attribution not required") | YouTube terms | **Safest for YouTube.** No Content ID claims. Only for use on YouTube. |
| **Pixabay Music** | Pixabay Content License, free, no attribution | OK commercially. Some tracks still trigger third-party Content ID claims. Keep the download page / license proof and dispute any claim. |
| **Uppbeat** | Free tier: a few downloads/month **with credit** in the description. Premium: no credit. | Each track has a claim-clearing code. Good playful catalog. (Limits not re-verified: page rate-limited.) |
| **Kevin MacLeod / incompetech** | **CC BY 4.0** (credit "Title by Kevin MacLeod, incompetech.com, CC BY 4.0") or a paid no-credit license | Monetization allowed. Very recognizable "stock" sound. Occasional false claims. |
| **HeyGen catalog via media-use** | HeyGen terms | Convenient inside the pipeline. Check monetization terms before you rely on it. |

Direction:

- Playful ukulele, glockenspiel, pizzicato or light lo-fi; 90–110 BPM; no vocals; few melodic hooks so it doesn't fight the VO.
- One bed per lesson, or one theme with variations for the whole course to strengthen brand identity.
- Duck about 12 dB under speech. The `hyperframes-audio` skill has voiceover carve and ducking. Target about −30 LUFS bed vs −14 LUFS final mix.

---

## 6. Fonts

All fonts are on Google Fonts (OFL). Each was checked locally with fontTools for Devanagari, the ₹ glyph (U+20B9) and an OpenType `tnum` (tabular numerals) feature.

| Font | Role | Devanagari | ₹ | `tnum` | Axes | Notes |
|---|---|---|---|---|---|---|
| **Baloo 2** | **Headings, big numbers, money** | ✅ | ✅ | ✅ | wght 400–800 | Rounded and friendly, and it has a matching Devanagari design. **Primary display font for EN and HI.** |
| **Inter** (already self-hosted) | EN body, UI, tables | ❌ | ✅ | ✅ | wght 100–900 | Brand continuity with `graphics/`. |
| **Mukta** | HI body / tables | ✅ | ✅ | ✅ | static | Clean Devanagari with tabular figures. Pairs with Inter. |
| **Noto Sans Devanagari** | HI body (alt) | ✅ | ✅ | (digits already tabular) | wght 100–900, wdth | Neutral; most complete coverage. |
| **Anek Devanagari** | HI display (alt) | ✅ | ✅ | ✅ | wght 100–800, wdth 75–125 | Modern; width axis helps when Hindi lines run long. |
| **Kalam** | Handwritten annotations ("notes on the ledger") | ✅ | ✅ | ❌ | static | Latin + Devanagari. Don't use it for numbers in columns. |
| **Gotu** | HI display (alt) | ✅ | ✅ | ✅ | static | Calligraphic. |
| Hind / Poppins | Body alt | ✅ | ✅ | ❌ | static | No `tnum`, so avoid them in money tables. |
| Fredoka / Nunito | Rounded Latin | ❌ | Nunito only | ❌ | variable | **Latin only.** Rejected because the Hindi version would need a second display face. |

Rules:

- Money tables use `font-variant-numeric: tabular-nums lining-nums;` and right alignment.
- Format amounts with `Intl.NumberFormat('en-IN', {style:'currency', currency:'INR'})`, which gives lakh/crore grouping.
- Self-host the woff2 files in `graphics/theme/fonts/` with `font-display: block` (same pattern as Inter) so renders don't fetch from the network.
- Subset the Devanagari fonts to keep them small.

---

## 7. Textures / paper / grain (CC0)

**Taste conflict:** the user's saved feedback says *no gradients, no dot-grid backgrounds, no glows, flat token colors only*.
Grain and paper textures are close to that line. **Default to flat fills.** Show one A/B style frame (flat vs. subtle paper) and let the user decide.

If approved:

- **ambientCG**: CC0. Paper, cardboard and fabric scans, tileable, up to 8K.
- **Poly Haven**: CC0. Textures (mostly 3D-oriented, some flat surfaces).
- **texture.ninja**: public domain photo textures (paper, concrete).
- **Pixabay**: paper backgrounds under the Pixabay license (no attribution).
- **Procedural (zero assets, deterministic):** a static full-frame SVG `feTurbulence` grain multiplied at 3–6% opacity, or the same filter used as the line boil (§2.2).
- **GPT Image 2.5**: "seamless tileable warm off-white paper texture, very low contrast, no stains, no text".
- **p5.brush offline**: pre-render watercolor washes or paper with Clawd's `paper()`, then save as PNG.

Keep one texture for the whole course, and never animate it except as a 12 fps boil.

---

## 8. Open items for the user

1. Audition the six voices (and Kanika for a Hindi benchmark). OK to spend ~$0.30 for a same-script EN+HI comparison on `eleven_v4`?
2. Raise the ElevenLabs limit (payg 41k chars → plan or top-up) before production.
3. Approve the cast-exploration step with GPT Image 2.5 (≈ 4 designs × 2 rounds).
   Is exact-2.5 required (needs an OpenAI API key and the fallback CLI), or is the Codex built-in tool acceptable?
4. Flat vs. subtle paper texture (A/B frame).
5. Upgrade the HyperFrames pin to ≥ 0.7.90.
6. Restore the media-use bundled SFX mp3s (currently missing).

---

## Sources

- ElevenLabs models: https://elevenlabs.io/docs/models
- Eleven v4 launch: https://elevenlabs.io/blog/eleven-v4 · https://elevenlabs.io/v4
- API pricing: https://elevenlabs.io/pricing/api
- TTS with timestamps: https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps
- TTS best practices (pronunciation, breaks, normalization, tags): https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices
- Pronunciation dictionary guide: https://elevenlabs.io/blog/pronunciation-dictionary-guide
- Dubbing: https://elevenlabs.io/docs/overview/capabilities/dubbing
- GPT Images 2.5 announcement: https://community.openai.com/t/introducing-gpt-images-2-5-in-the-api-and-chatgpt/1395897
- Codex Images 2.5 vs 2.0 bug: https://github.com/openai/codex/issues/44369
- OpenAI image generation guide: https://developers.openai.com/api/docs/guides/image-generation
- Lottie Simple License: https://lottiefiles.com/page/license
- Pixabay Content License: https://pixabay.com/service/license-summary/
- Humaaans (CC0): https://www.humaaans.com/
- Clawd kit: `research/repos/ClaudeAnimationBase` (ANIMATION_GUIDE.md, src/clawd.js, src/core.js, render.mjs; MIT)
- HyperFrames: `.claude/skills/hyperframes-core/references/determinism-rules.md`, `.claude/skills/hyperframes-animation/adapters/{three,typegpu,lottie}.md`, runtime source `hyperframes@0.7.56` / `0.7.90` (`hf-seek`, `waitUntil`, `browserGpuMode`)
- media-use: `.claude/skills/media-use/{SKILL.md,references/resolve.md,audio/references/tts.md,audio/assets/sfx/CREDITS.md}`

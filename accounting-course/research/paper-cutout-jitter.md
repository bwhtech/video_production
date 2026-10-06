# Paper cut-out jitter, boil and stepped timing for long-form viewing

Research date: 2026-10-06. Context: L01 renders at **30 fps** (checked `renders/L01-final.en.mp4`: 1280x720, 30/1).
The rig (`lessons/L01/assets/kit/rig.js`) steps acting on a **12 fps** grid and `jitter()` sets a new random
offset (x/y ±0.7 px, rotation ±0.3° around the 50%/50% origin) on every 1/12 s step. Scenes call `k.jitter()` for the
**whole scene** (for example, `s03.js:119`, `sc.start → sc.end-0.25`). Characters are children of the `cam` group, which does a
linear 6% push over the whole scene.

The user watched the full lesson and said **"the shake hurts my eyes"**, even after the amplitude was halved.

---

## TL;DR: what is wrong with the current setup

1. **12 fps steps in a 30 fps render have an uneven cadence.** 30 / 12 = 2.5 frames, so the steps are held for
   3, 2, 3, 2 ... frames. This is the same arithmetic as 24p on a 60 Hz display (3:2 pulldown). That is the textbook cause of
   **judder**: "uneven motion caused by frames being displayed for unequal lengths of time … a recurring stutter-step,
   a subtle 'tug' in the motion that repeats several times a second" ([Fora Soft][forasoft]). Each step is also a
   random jump, so the eye gets an irregular rhythm on top of a random direction.
2. **The whole character moves against the frame and the background, all the time.** Disney's scene-planning primer
   describes exactly this failure. Studios tried to fix strobing by "jogging" the peg bar every other frame, and
   *"in practice, this led to strobing of an even worse breed — the entire character jittered back and forth relative to the
   screen edge, which proved to be terribly distracting"* ([Steinberg, *The Perfect Pan*][perfectpan]).
3. **It is constant, for 5–6 minutes, including during holds.** Squigglevision (*Dr. Katz*) is the reference case for
   "always-on boil". It loops 5 drawings for the whole show, and it is known for giving some viewers headaches
   ([TV Tropes / Wikipedia via search][katz], [Wikipedia: Squigglevision][squiggle]). Attention research shows that the
   **onset of motion captures attention automatically, bottom-up** ([Abrams & Christ 2003][abrams]). A random re-jump
   every 83 ms is a stream of tiny motion onsets that the visual system cannot learn to ignore.
4. **Rotation about the centre makes the amplitude larger than it looks.** 0.3° about the centre of a 600 px tall
   character moves the head by about ±1.6 px. The values are uncorrelated between steps, so a jump from one step to the next can
   be about 3 px at the head, plus up to 1.4 px of translation. Halving the "px" value did not halve what the eye sees.
5. **Real cut-out puppets do not shake when nobody touches them.** Reiniger's puppets lay on a glass table and were
   *weighted with flat pieces of lead* so they stayed flat and still ([BFI][bfi], [Wikipedia: Cutout animation][cutout]).
   In stop motion, "boiling" happens when the animator disturbs a part (fabric, hair). Pros use rods and tie-downs to
   *prevent* it ([stopframe.org summary][stopframe]). So jitter on held poses is not even authentic. The handmade
   feeling comes from **stepped poses + imperfect cut edges + paper texture**, not from position noise.

---

## 1. Boil frequency: how fast?

| Source | Practice |
|---|---|
| Classic hand-drawn boil | Loop **3–8 tracings** of a still drawing ([Zemni: Observing Boil][zemni]). *Ed, Edd n Eddy* traced each drawing **3 times**, looped 1-2-3 (search summary of [MetaFilter][mefi]/[doodraw][doodraw]). |
| Classic recipe | "Trace your drawing on 2 to 4 frames and loop them at around **8 fps**" ([doodraw][doodraw]). |
| After Effects practice | `posterizeTime(4)` = 4 changes/sec for a calm boil; `posterizeTime(12)` = "a faster line boil" ([PremiumBeat][premiumbeat]). Jonti Rudd: lower the boil "so it's **every 4 frames or so**", and warns that some audiences "think the video is lagging" ([Jonti Rudd][rudd]). |
| Ben Marriott's paper cut-out look (AE) | Wiggle Paths on the **edge** ("as if the shape was a different piece of paper in every shot") with posterized time. Position/rotation wiggle only on *some* objects ([Lesterbanks][lester]). Motion Array uses Posterize Time at **8 fps** for the stop-motion look ([Motion Array][motionarray]). |
| Moho | Its built-in "Animated noise" layer option "can lead to either a **very distracting** look, or a very sketchy, free-form one" (quoted from the Moho docs via [search][mohoforum]). Recommended settings use low offset + large scale, so the jitter is "broad and not so scribbly". |
| Squigglevision | 5-drawing loop on all characters, **inanimate objects static** ([katz]). Reported headaches. |

**Takeaway:** 12 Hz is at the *fast* end. Calm boils run at **4–8 Hz**, usually with only **3 alternating states**.
The boil changes the **edge and texture**, not the position of the whole figure.

## 2. Amplitude and what should move

- **Texture or edge boil instead of positional shake.** Marriott's paper look boils the *cut edge*, so each frame looks like a
  freshly cut piece of paper. Aardman's "boil" lives in the *surfaces* (thumbprints, fabric), not in figures bouncing
  around: *"you can see the thumbprints, you can see the boil in the fabrics"* ([AWN: Aardman at 50][aardman]).
- **Non-moving properties are safe; displacement is the risk.** Val Head: *"Animation that involves only non-moving
  properties, like opacity, color, and blurs, are unlikely to be problematic,"* while movement across space is the main
  trigger ([A List Apart][ala]). A texture swap (grain offset, edge seed) is close to a "non-moving property". A
  whole-body translate/rotate is not.
- **Static backgrounds and props.** Squigglevision kept inanimate objects still. Disney planning keeps the background
  as the stable reference that the eye uses to read motion ([perfectpan]). Neurodiversity.design: keep motion small, within
  about 1/3 of the viewport, and remove auto-looping motion ([neurodiversity.design][nd]).
- **Holds must be calmer than the action around them.** Moving-hold doctrine says the motion during a hold "should always be
  smaller than the preceding and following movements, and this contrast is what makes it a hold" ([CGWire][cgwire]).
  A hold that jitters as much as the action has no contrast.

## 3. Smooth camera and stepped characters

- **Stepped characters inside a smooth camera are fine *if they ride the camera*.** *Into the Spider-Verse* animated
  characters mostly on twos with the camera on ones. Sony "could 'stick' poses to the camera, so that the held frames pick up
  the camera's movement," and it "works fine" ([Just to do Something Bad][spidey]). Our characters are children of `cam`,
  so this is already the case. **Keep the camera smooth on ones. Never step the camera.** A stepped camera shakes every
  pixel of the frame at once.
- **The strobing case to avoid:** a character's *own* stepped translation running against a smooth camera or background.
  Disney: a character on twos against a pan on ones "will appear to slip against the background every other frame,
  creating a very disturbing [j]uttering effect" ([perfectpan]). Spider-Verse: "any time the character's movement aligns with
  the camera's, it's going to strobe terribly" ([spidey]). **Rule:** step limb and pose changes. When a character travels
  across the frame *during a camera move*, run the travel smooth (`{smooth:true}`).
- **Camera moves should be slow with long eases.** "If the audience doesn't notice a camera move, it's been a
  success … the longer the tapers the better … usually a third or more of the total pan footage" ([perfectpan]). Judder grows
  with speed and contrast ([Fora Soft][forasoft]). Our 6% linear push over a scene is slow enough. Ease it (`sine.inOut`)
  when a scene starts or ends on a hold rather than a cut.
- **Mixed rates are normal. Uneven cadence is not.** Spider-Verse animators switched between ones and twos per moment
  ([AWN: Spider-Verse][awnspidey]), but always on whole-frame multiples of 24. At 30 fps, the even multiples are
  **15 fps (2 frames)**, **10 fps (3 frames)**, **7.5 fps (4 frames)**, **6 fps (5 frames)** and **5 fps (6 frames)**. 12 fps is not one of them.

## 4. Eye strain and accessibility

- **WCAG 2.2.2 Pause, Stop, Hide (A):** moving content that starts automatically, lasts more than 5 s and runs *in parallel with
  other content* must be stoppable. One reason given is that people with attention or reading disorders "cannot concentrate when parallel
  updates occur" ([BOIA summary][wcag222]). A video is not a web page, but the principle applies directly to an
  always-on jitter layer that runs in parallel with the lesson content.
- **Vestibular guidance** (Val Head; neurodiversity.design): avoid constant or looping motion, large relative movement, and
  foreground/background moving at different rates. Prefer non-positional properties ([ala], [nd]).
- **Motion onset captures attention involuntarily** ([Abrams & Christ 2003][abrams]). Constant micro-onsets compete with the
  narration for attention.
- **Learning:** Mayer's coherence principle says extraneous decorative material hurts learning (reported effect size of about 0.9 for
  excluding it) ([Devlin Peck summary][mayer]). Decoration that never stops is the purest form of "extraneous".
- **Judder** makes content "difficult or unpleasant to watch". It is worse with high contrast and fast motion
  ([Fora Soft][forasoft]). Flat, high-contrast paper shapes on a plain background are the worst case for judder visibility.

## 5. Notes on the named references

- **South Park:** the pilot was paper cut-outs at a low frame rate. The series is CG (PowerAnimator, then Maya) imitating that look
  ([Wikipedia: South Park][sp], [cutout]). The well-known "head jitter" is **triggered only while a character talks**, not
  constant (Character Animator community advice, [Adobe forum][adobesp]). Jitter is tied to an event.
- **Terry Gilliam:** cut-outs suit "swift, sudden movements". Graceful movement is "damned near impossible"
  ([Open Culture][gilliam]). The style comes from snappy pose changes, not from idle shake.
- **Lotte Reiniger:** pieces were weighted with lead on a lit glass table. Untouched pieces stay still ([bfi]).
- **Oliver Postgate / Smallfilms (*Ivor the Engine*):** painted cardboard pinned and held with Blu-Tack, shot with a motorised
  single-frame camera ([Animation Studies blog][ivor]). The pieces are still between moves. The charm is in the painting and the
  timing.
- **Spider-Verse:** twos for characters, ones for camera, poses stuck to camera, switching rate per moment ([spidey], [awnspidey]).
- **Aardman:** the boil is in surfaces (thumbprints, fabric) and is described as craft, not as the figure bouncing ([aardman]).
- **Tearaway / Paper Mario / Kurzgesagt / TED-Ed:** no published frame-rate or jitter specs were found. *Tearaway Unfolded*
  runs at 60 fps and gets its paper feel from flat construction-paper colours and fold or pop-up mechanics, not from shake
  ([Wikipedia: Tearaway Unfolded][tearaway]). Treat these as "paper look comes from materials and edges" examples only.
- **Over the Garden Wall:** nothing found on frame rates or boil.

---

## 6. Recommended spec

### A. Timing grid (fixes the judder)
- Keep the render at **30 fps**.
- Change the rig grid from `FPS = 12` to **`FPS = 15`** (exactly 2 frames per step = true twos at 30 fps).
  Option: **10 fps (3 frames)** for slower, more "stop-motion" acting. Never use a rate that does not divide 30.
- *Alternative:* render at **24 fps** and keep 12 = clean twos. Use this only if the whole pipeline (captions, SFX timing, HyperFrames
  render) can move to 24. Changing the grid to 15 is the smaller change.

### B. Remove the always-on positional jitter
- **Delete the continuous `jitter()` calls during holds.** Default: **no positional offset at all** on characters, props,
  cards or backgrounds while nothing is acting.
- **Replace it with a pose-coupled "placement error".** On the frame where a stepped *pose change* lands (an arm hit,
  expression swap or lean), apply ONE small offset to that body part's wrapper and **hold it until the next pose change**. This is what
  happens physically when an animator nudges a paper piece.
  - Amplitude: translate **≤ 0.4 px**, rotation **≤ 0.15°**, with the rotation origin at the **part's joint** (for the
    whole body: feet or base, `50% 100%`), never at the centre.
  - Each step changes by at most ±1 unit from the previous step. Use a small random walk around zero that is reset to 0 at the end of the action, not fresh white noise each step.
  - Maximum rate = the acting rate (only when the pose actually changes). Holds get zero new offsets.

### C. Texture or edge boil (the "handmade" signal), optional and subtle
- **3 pre-baked variants** per paper piece (edge `cut*` seed, or paper-grain texture offset/seed). Cycle **1-2-3** (not random).
- Cadence: **one change every 5 frames = 6 Hz** at 30 fps (equivalent to "on fours" at 24). Use 4 frames / 7.5 Hz only as a maximum.
- Amplitude: edge displacement **≤ 1 px** at 1080p (≤ 0.7 px at 720p). The texture offset moves the grain only. The shape position and
  silhouette centroid stay still.
- Apply to **characters only**. Backgrounds, cards, chips, labels and text: **no boil** (static, like Squigglevision's
  inanimate objects).
- **During long holds (> 2 s, for example the speaker listening while a card explains): pause the boil** (stay on variant 1). Resume it
  2 frames before the next action. Boil is a sign of life near action, not a constant layer.
- If you use an SVG `feTurbulence` seed swap (as in `studio/index.html`), keep the displacement `scale` ≤ 1.5 and step it on the
  same 5-frame cadence. The current studio test uses 12 fps, 9 seeds and scale 3.2. That is too busy for a 6-minute lesson.

### D. Camera
- Camera stays **smooth at 30 fps**. **Never step or jitter the camera.**
- All characters and props stay **children of `cam`** (the stuck-to-camera rule, already in place).
- Slow pushes only. **≤ 8% scale per scene.** Use `sine.inOut` when a scene starts or ends on a hold rather than a hard cut, with the eases taking about 1/3 of
  the move duration each.
- A character travelling across frame while the camera moves: use **smooth** travel (`{smooth:true}`). Step only limbs and expressions.

### E. Global budget and safety
- At any moment, **at most one** stepped "life" element is active in the frame (the acting character). Everything else is still.
- Before shipping, watch 60 s at full screen. If you notice the boil while listening to the VO, halve it.
- Optional: render a "calm" variant (no boil, no placement error, acting still stepped). This is the video equivalent of `prefers-reduced-motion`.

### Code changes (rig.js)
```js
const FPS = 15;                 // was 12 — must divide 30
// jitter(): remove the per-step loop over [t0,t1].
// New: placementError(tl, el, tPoseChange, {px:0.4, rot:0.15, origin:"50% 100%"}) called by
//      rig methods when a stepped pose lands; random-walk ±1 unit, reset to 0 at end of action.
// New: boil(tl, variants[3], t0, t1, {hold: 5/30}) cycling 1-2-3; skipped for holds > 2 s.
```

---

## Sources

[forasoft]: https://www.forasoft.com/learn/video-quality/articles-vqm/judder-stutter-frame-rate-artifacts
[perfectpan]: http://www.animationmeat.com/pdf/featureanimation/perfectpan.pdf
[katz]: https://tvtropes.org/pmwiki/pmwiki.php/WesternAnimation/DrKatzProfessionalTherapist
[squiggle]: https://en.wikipedia.org/wiki/Squigglevision
[abrams]: https://journals.sagepub.com/doi/abs/10.1111/1467-9280.01458
[bfi]: https://www.bfi.org.uk/sight-and-sound/features/scissors-make-films-lotte-reiniger-creating-her-magical-animations
[cutout]: https://en.wikipedia.org/wiki/Cutout_animation
[stopframe]: https://www.stopframe.org/threads/6-stop-motion-secrets-revealed-by-tim-allen.122/
[zemni]: https://movingimage.zemniimages.info/research-1-1-observing-boil
[mefi]: https://ask.metafilter.com/112149/Is-this-cartoon-boiling
[doodraw]: https://doodraw.com/blog/boiling-lines-animation/
[premiumbeat]: https://www.premiumbeat.com/blog/wiggle-text-line-boil/
[rudd]: https://www.jontirudd.com/post/animation-boil
[lester]: https://lesterbanks.com/2020/02/an-easy-way-to-get-a-paper-cutout-stop-motion-look-in-ae/
[motionarray]: https://motionarray.com/learn/after-effects/stop-motion-style-animation-in-after-effects/
[mohoforum]: https://lostmarble.net/forum/viewtopic.php?t=35273
[aardman]: http://www.awn.com/animationworld/aardman-50-inside-clay-felt-and-fingerprints
[ala]: https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/
[nd]: https://neurodiversity.design/principles/animations/
[cgwire]: https://blog.cg-wire.com/engaging-animation/
[spidey]: https://www.justtodosomethingbad.com/blog/2020/1/2/more-lessons-from-peter-b-parker
[awnspidey]: https://www.awn.com/animationworld/creating-stylized-universe-sonys-spider-man-spider-verse
[wcag222]: https://www.boia.org/wcag2/cp/2.2.2
[mayer]: https://www.devlinpeck.com/content/mayers-principles-of-multimedia-learning
[sp]: https://en.wikipedia.org/wiki/South_Park
[adobesp]: https://community.adobe.com/questions-571/south-park-style-animation-tips-tricks-help-in-ch-250272
[gilliam]: https://www.openculture.com/2014/07/terry-gilliam-reveals-the-secrets-of-monty-python-animations.html
[ivor]: https://blog.animationstudies.org/recollecting-ivor-the-engine-1959/
[tearaway]: https://en.wikipedia.org/wiki/Tearaway_Unfolded

- Judder from uneven frame holds (3:2 cadence): https://www.forasoft.com/learn/video-quality/articles-vqm/judder-stutter-frame-rate-artifacts
- David Steinberg, *The Perfect Pan* (Disney scene-planning primer): strobing, jogged pegs "terribly distracting", camera tapers: http://www.animationmeat.com/pdf/featureanimation/perfectpan.pdf
- Spider-Verse: poses stuck to camera, camera on ones: https://www.justtodosomethingbad.com/blog/2020/1/2/more-lessons-from-peter-b-parker
- Spider-Verse (AWN, Josh Beveridge): https://www.awn.com/animationworld/creating-stylized-universe-sonys-spider-man-spider-verse
- Squigglevision / Dr. Katz: https://en.wikipedia.org/wiki/Squigglevision, https://tvtropes.org/pmwiki/pmwiki.php/WesternAnimation/DrKatzProfessionalTherapist
- Boil definition, 3–8 drawings: https://movingimage.zemniimages.info/research-1-1-observing-boil
- Boil rates: https://doodraw.com/blog/boiling-lines-animation/, https://www.premiumbeat.com/blog/wiggle-text-line-boil/, https://www.jontirudd.com/post/animation-boil
- Ben Marriott paper cut-out AE technique: https://lesterbanks.com/2020/02/an-easy-way-to-get-a-paper-cutout-stop-motion-look-in-ae/ (project file: https://benmarriott.gumroad.com/l/NDtPol)
- Posterize Time 8 fps stop-motion look: https://motionarray.com/learn/after-effects/stop-motion-style-animation-in-after-effects/
- Moho noise settings: https://lostmarble.net/forum/viewtopic.php?t=35273
- Aardman boil / thumbprints: http://www.awn.com/animationworld/aardman-50-inside-clay-felt-and-fingerprints
- Lotte Reiniger technique: https://www.bfi.org.uk/sight-and-sound/features/scissors-make-films-lotte-reiniger-creating-her-magical-animations, https://en.wikipedia.org/wiki/Cutout_animation
- Stop-motion boiling avoided with rods and tie-downs: https://www.stopframe.org/threads/6-stop-motion-secrets-revealed-by-tim-allen.122/ (403 on direct fetch, content from the search summary)
- Terry Gilliam: https://www.openculture.com/2014/07/terry-gilliam-reveals-the-secrets-of-monty-python-animations.html
- Ivor the Engine: https://blog.animationstudies.org/recollecting-ivor-the-engine-1959/
- South Park: https://en.wikipedia.org/wiki/South_Park, https://community.adobe.com/questions-571/south-park-style-animation-tips-tricks-help-in-ch-250272
- Val Head, safer animation for motion sensitivity: https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/
- neurodiversity.design animations: https://neurodiversity.design/principles/animations/
- WCAG 2.2.2: https://www.boia.org/wcag2/cp/2.2.2
- Abrams & Christ 2003, Motion onset captures attention: https://journals.sagepub.com/doi/abs/10.1111/1467-9280.01458
- Mayer coherence principle: https://www.devlinpeck.com/content/mayers-principles-of-multimedia-learning
- Moving holds: https://blog.cg-wire.com/engaging-animation/
- Tearaway Unfolded: https://en.wikipedia.org/wiki/Tearaway_Unfolded

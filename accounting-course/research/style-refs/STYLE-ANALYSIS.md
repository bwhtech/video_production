# Style analysis: animated explainers (for the playful accounting course)

Research date: 2026-10-05. Sources were downloaded with yt-dlp at 720p (Treehouse) or 480p (others). I sampled frames with ffmpeg, extracted palettes by median-cut quantization, and estimated VO speed from YouTube subtitles. "Visual beats" counts come from the contact sheets, because these styles have almost no hard cuts. The ffmpeg scene detector found 0 to 2 cuts per Treehouse or Kurzgesagt video.

All paths are relative to `research/style-refs/`.

## Sources

| Channel | Video | File | Notes |
|---|---|---|---|
| Treehouse | What Is Treehouse? (55s) | `treehouse/z2afy2xZMqY_what-is-treehouse.mp4` | **Best reference.** Full character cast, wipes, morphs, whip pan |
| Treehouse | 3 Ways to Build a Habit of Learning (88s) | `treehouse/Ay0Jwz-AqdE_3-ways-to-build-a-habit-of-lea.mp4` | **Best rig reference.** Desk character with face swaps, duck, arm pop. Calendar-block concept viz |
| Treehouse | Never Stop Learning (38s) | `treehouse/AkSSCR90Pjs_never-stop-learning-with-treeh.mp4` | Curved color wipes, folder pop-outs, top-down hands, crowd |
| Treehouse | What is Machine Learning? (277s) | `treehouse/MR633gYfrg8_what-is-machine-learning.mp4` | Robot rig (squash, rubber-hose arms) used to show classification |
| Treehouse | Collaborating with Developers (96s) | `treehouse/8R-kcTs1avc_collaborating-with-developers.mp4` | Character intro beat, then screencast |
| Treehouse | What is Blockchain? (267s) | `treehouse/YvfoSH6EKdw_what-is-blockchain.mp4` | Host + cartoon middle section (ledger metaphor with D&D characters) |
| Treehouse | Watson chatbot trailer (41s) | `treehouse/u4k1J-VDYn8_build-a-chatbot-with-watson-ap.mp4` | Car/driver vignette + info pop-ups |
| Treehouse | What is a P&L Statement? (161s) | `treehouse/1OjEf4YRCPo_what-is-a-profit-and-loss-stat.mp4` | **Anti-reference.** Their only finance video is a host and static 10-K screenshots |
| TED-Ed | How does the stock market work? (270s) | `ted-ed/p7HKvqRI_Bo_how-does-the-stock-market-work.mp4` | Textured, hand-drawn style with strong metaphors |
| Kurzgesagt | How The Stock Exchange Works (214s, 2013) | `kurzgesagt/F3QpgXBtDeo_how-the-stock-exchange-works-f.mp4` | Flat vector style. Number tickers, zoom-through transitions |
| Two Cents (PBS) | Budgeting Basics! (313s) | `two-cents/sVKQn2I4HDM_budgeting-basics.mp4` | Personal-finance hosts on green screen with cut-out animation |

The Treehouse channel URL is `youtube.com/user/gotreehouse`. `@teamtreehouse` returns 404. Of about 650 uploads, roughly 10 are mostly animated. Most are talking-head or screencast videos. The character style seen across these videos is consistent: noodle-limbed cast, scientist, panda, yellow monster, robot.

## Contact sheets

Uniform overviews (24 frames, 6x4, with timestamps):
- `sheets/treehouse_z2afy2xZMqY_what-is-treehouse_uniform.jpg`
- `sheets/treehouse_Ay0Jwz-AqdE_3-ways-to-build-a-habit-of-lea_uniform.jpg`
- `sheets/treehouse_AkSSCR90Pjs_never-stop-learning-with-treeh_uniform.jpg`
- `sheets/treehouse_MR633gYfrg8_what-is-machine-learning_uniform.jpg`
- `sheets/treehouse_8R-kcTs1avc_collaborating-with-developers_uniform.jpg`
- `sheets/treehouse_YvfoSH6EKdw_what-is-blockchain_uniform.jpg`
- `sheets/treehouse_u4k1J-VDYn8_build-a-chatbot-with-watson-ap_uniform.jpg`
- `sheets/treehouse_1OjEf4YRCPo_what-is-a-profit-and-loss-stat_uniform.jpg` (anti-reference)
- `sheets/treehouse_qepp8a2fDHQ_what-is-code_uniform.jpg`, `sheets/treehouse_DErfmYlysWY_introducing-treehouse-code-adv_uniform.jpg` (mostly host or screencast. Triage only)
- `sheets/ted-ed_p7HKvqRI_Bo_how-does-the-stock-market-work_uniform.jpg`
- `sheets/kurzgesagt_F3QpgXBtDeo_how-the-stock-exchange-works-f_uniform.jpg`
- `sheets/two-cents_sVKQn2I4HDM_budgeting-basics_uniform.jpg`

Rig and motion strips (frame labels are in centiseconds, so `3450` = 34.50s):
- `sheets/treehouse_rig_desk-face-expression_15fps.jpg`: expression swap with a 1 to 2 frame smear
- `sheets/treehouse_rig_desk-duck-and-point_10fps.jpg`: anticipation, duck, rubber-hose arm pops up
- `sheets/treehouse_rig_robot-squash_10fps.jpg`: idle squash, head lag, eye-light blink
- `sheets/treehouse_rig_robot-arms_10fps.jpg`: symmetric arm swing, bendy-hose curve flip
- `sheets/treehouse_rig_student-walk_10fps.jpg`: walk-through with a background wipe carried behind
- `sheets/treehouse_rig_group-wave_10fps.jpg`: cast pops up, waves, whip-pans with motion blur
- `sheets/treehouse_rig_scientist_10fps.jpg`: subtle hold (soot smudges after the explosion gag)
- `sheets/treehouse_transition_folder-wipe_10fps.jpg`: curved-edge color wipe carries the card in, items pop out
- `sheets/treehouse_transition_logo-to-cards_10fps.jpg`: logo morphs into a card (shape-morph match cut)
- `sheets/treehouse_what-is-treehouse_{scientist,student,group}_4fps.jpg`, `sheets/treehouse_habit_desk_2fps.jpg`, `sheets/treehouse_collab_woman_3fps.jpg`, `sheets/treehouse_ml_robot_1fps.jpg`
- `sheets/kurzgesagt_transitions_4fps.jpg` (coin stacks rise, type-on, blur-out), `sheets/kurzgesagt_whip_4fps.jpg` (chart crash, zoom-through to a medallion), `sheets/kurzgesagt_robot_10fps.jpg` (number ticker)
- `sheets/ted-ed_character_3fps.jpg`, `sheets/ted-ed_traders_6fps.jpg`, `sheets/ted-ed_queue_4fps.jpg`
- `sheets/two-cents_washington-puppet_6fps.jpg`, `sheets/two-cents_puppet_4fps.jpg`, `sheets/two-cents_map_4fps.jpg`

---

## 1. Treehouse (primary reference)

**Palette (sampled).** Each scene has one flat, saturated, mid-value background. The background color changes per scene and works as a chapter color.
- Backgrounds: green `#51C07A` (brand), blue `#0A7BD7` / sky `#28A1D1` / steel `#3C86BC`, purple `#755EB5`, deep indigo `#493F8D`, periwinkle `#7785CD`, teal `#6CBDC2`, red `#D2474F`, yellow `#F7D774`.
- Accents: sun yellow `#F5CA48`/`#FCDC63`, coral `#EE6352` (shirt), lavender `#A08CCB`, pale blue `#74C6F0`.
- Neutrals: card white `#FDFDFD`, charcoal `#3B3640`/`#463E41`, desk wood `#745A44`, laptop gray `#999EA0`.
- Skin: `#F4D3A6`, `#EFDFA1`, deep brown `#5E4F4E`. Hair: ginger `#E07A3F`, blond `#F2CE5B`.
- **Tone-on-tone line art for set dressing.** Bookshelves, windows, buildings and clocks are drawn as thin strokes about 10 to 15% darker than the background, so they read as a pattern, not detail. Characters and props sit on top in full color. This is the main reason scenes look clean and still have context.

**Shape language.** Geometric and rounded: rounded rectangles, capsules, circles. No outlines on anything. Fill is flat, with at most one darker shade (the inside of a coat, a laptop lid). The only shadow is a flat ellipse under the feet. No gradients and no texture.

**Character design.**
- About **3 heads tall** (red-shirt guy: head plus hair 185px of a 560px figure). Head is a tall rounded rectangle with a flat top. The haircut is a separate shape: flat-top block, bowl, or long blond.
- Face: small dot or oval eyes, thick arc brows, D-shaped open smile with a white tooth bar, small semicircle ears, no nose or a tiny one. Glasses and beards are separate overlay shapes.
- Torso is a rectangle (the shirt). Legs are long thin sticks, slightly tapered, ending in flat wedge shoes. Arms are **rubber-hose noodles** (no elbow joint) that end in detailed 4-finger hands. The hands are the only place with fine detail.
- Mascot extras: one-eyed yellow monster (zig-zag edges), panda, boxy robot on treads, bald scientist with goggles. These add playfulness without making the cast childish.

**Rig behavior (from the 10–15 fps strips).**
- **Face swaps, not mouth rigs.** An expression change (smile to worried, brows tilted, mouth to a flat grimace) swaps the drawings with a 1 to 2 frame cross-dissolve or smear, plus a few degrees of head tilt (`rig_desk-face-expression`, 28.00–28.13s). Eyes dart sideways between holds. There is no visible lip-sync. Mouths change per phrase, not per phoneme.
- **Anticipation, then action.** Before the duck, the head pops up a few pixels and there is one smeared frame (33.90s). Then the head drops behind the laptop in about 0.3s (34.0→34.3). The arm then shoots up from below the desk in about 0.2s on an arc, with a pointing finger, and settles (35.0→35.3).
- **Robot idle.** The body squashes about 8% over about 0.3s, the head lags 1 to 2 frames behind the body (follow-through), and it rebounds. Eye lights blink one at a time. The arms are bezier hoses whose curve flips direction when they swing up (about 0.5s with ease-out).
- **Walks are cheated.** The student crosses the frame (about 1.6s for 1280px) as a whole-body translate with a small vertical bob. The legs are mostly cropped or hidden. A blue circle wipe follows him and changes the scene behind him.
- **Group entrance.** All characters rise from below the frame edge in about 0.2s with overshoot (`rig_group-wave`, 47.00–47.20), then hold a looping wave (arm rotates about ±15°, 0.5s period), then the whole shot whip-pans sideways with heavy motion blur.
- **Ambient secondary motion.** Clock hands tick, the logo slowly wobbles about ±5° while held, and steam rises. Something small always moves during a hold.
- Motion is on ones (30 fps tweens, After-Effects-style puppet animation). The frame-diff check found continuous change during moves, not stepped holds.

**Timing and easing.** Pop-ins are 0.2 to 0.4s with back or overshoot easing. Wipes and morphs are 0.5 to 0.8s with strong ease-in-out. Fast moves get motion blur. Elements in grids bob in a staggered sine wave (cards rise in turn about 60ms apart, `what-is-treehouse_group_4fps`, 42.75–43.5s). Icons draw on as strokes (the question mark appears as a line reveal over 0.75s).

**Transitions (the signature).** There are almost no hard cuts. Every scene change is one of these:
1. **Curved-edge color wipe.** A blob with a bezier leading edge sweeps across in about 0.6s. The next scene's background color is the wipe, and it brings the next object in with it (`transition_folder-wipe`).
2. **Circle iris wipe** that grows from off-screen (blue circle behind the walking student).
3. **Shape-morph match cut.** The hexagon logo morphs into a white rectangle that rotates and becomes a UI card (`transition_logo-to-cards`, 19.6–20.2s).
4. **Whip pan with motion blur** into the next shot (cast into a laptop screen).
5. **Push-in through an object.** A card grid zooms into one card, and that card becomes the next scene.

**Typography and text density.** A geometric sans (Gotham or Avenir style), white, medium to bold weight, centered. Text appears only as title cards ("Learning Tip #1 / Spread your learning over the week") or 1 to 3 word labels (Mon…Sun, "Web Design"). Per scene there are at most about 6 words of text on screen.

**How they show abstract ideas.**
- *Concepts as UI cards.* A course is a white card with a colored header strip. A catalog is a grid of cards. A path is cards joined by a line.
- *Time as blocks.* A week is 7 yellow squares. "Spread it out" means non-study days dim and slide away, leaving Tue, Thu, Sat. A duration is a pie clock filling.
- *Classification as a robot* holding a ✓ in one claw and a ⚠ in the other, with icons swapped on its chest screen.
- *Emotion and concept carried by a character prop:* a scientist's explosion means "experimentation", a phone-gazing student means "learn anywhere".

**Pacing.** VO is 175 to 198 wpm (fast, promotional). A new composition appears every 3 to 5s. Animated segments are often book-ended by a live host, so the animation is the "illustration break" inside the explanation.

---

## 2. Kurzgesagt (2013, "How The Stock Exchange Works")

- **Palette:** one saturated flat background per section: salmon `#ED7B77`, teal `#56BEB5`, mustard `#F0C264`, deep blue (DAX section), and dark slate `#4A4A4A` for "screens". Mid grays `#787976` for buildings, white for coins and medallions. There is a faint radial vignette on every background. Do not copy it (see the no-gradients rule).
- **Shape language:** flat vector, no outlines, tiny detailed props (buildings, tacos, coffee). The key pattern is **objects framed in white circular medallions** used as tokens that move, compare (A `<` B) and orbit (exchanges circling the globe).
- **Characters:** minimal. One small robot mascot ("Like Robot!") and no humans. Ideas are carried by objects and numbers, not acting.
- **Motion:** coin stacks rise from the bottom in a stagger. **Number tickers** count continuously ("Company Value 6,000,000 $ → 58,000,000 $" over 3s). Line charts draw on, then crash. Speech bubbles pop ("Rotten Meat!"). Text types on letter by letter ("60 Trillion Euro").
- **Transitions:** zoom-blur. The scene scales up or down while blurring, and the next scene resolves from the blur (`kurzgesagt_transitions_4fps`, 19.0→19.5s). There is also zoom-through into a medallion (`kurzgesagt_whip_4fps`, 134.75→135.75s). Zero hard cuts in 214s.
- **Text:** bold rounded sans (similar to Kurzgesagt's later Gotham Rounded), short labels, numbers set large.
- **Pacing:** 157 wpm, a visual beat about every 4 to 6s, and continuous camera motion.

## 3. TED-Ed ("How does the stock market work?", Oliver Elfenbaum)

- **Palette:** muted and retro, with flat backgrounds per scene: mustard `#DCA03A`, chartreuse `#C4C243`, slate blue `#A0B2CD`, brick red `#B24A3A`, cream paper. Ink is near-black brown `#220E21`. Graph paper and parchment textures show up where they mean something (markets = grid paper, history = old map).
- **Shape and line:** hand-drawn, with a thin wobbly black line on faces and hands. Bodies are filled silhouettes with paper grain. Characters are tall and narrow with long noses and tiny heads (about 5 to 6 heads tall), drawn as caricature.
- **Rig:** mostly pose holds with one small action (hands to hips, pockets turned out). Comic secondary motion carries the joke (a fly buzzing around the broke trader, `ted-ed_traders_6fps`). Parts of it are animated **on twos** (the frame-diff shows `#.#.#.`), which gives a handmade feel.
- **Concept visualization (the strongest of the four):** a seesaw built from letter blocks S-U-P-P-L-Y / D-E-M-A-N-D. Investors are a row of identical ghost heads under a live ticker board. Demand is a coffee-shop queue that grows. A balloon carries a $ away. A company is a painter showing a canvas to investors.
- **Pacing:** 157 wpm, about 7 cuts per minute (hard cuts and dissolves between illustrated tableaux). Text is nearly zero, apart from a pull-quote opener and ticker symbols.

## 4. Two Cents (PBS Digital, "Budgeting Basics!")

- **Format:** two hosts on green screen against a concentric-ring background (green/sage `#909D83`, `#B2D2A7`). Punch-in zoom cuts every few seconds. Graphics are composited beside the host.
- **Graphics:** cut-out collage on parchment (`#EFE6CF`). Labelled jars for budget buckets (Essentials, Security, Goals, Lifestyle). Dollar-bill soldiers in helmets. A **board-game hex map** with territories labeled "Monthly Spending", "Savings", "Emergency Fund" stands in for the budget. Hand-lettered condensed caps ("BATTLE PLAN", "1.) WRITE IT DOWN").
- **Character:** a George Washington cut-out puppet with closed-eye blinks and limb rotations at pivots. Scene elements slide in with parallax and motion blur. The bill-to-cartoon transition is a motion-blurred whip.
- **Pacing:** 191 wpm (quick and comedic), about 5 hard cuts per minute.
- **Takeaway:** the jar/bucket and game-board metaphors work well for money allocation. The live-host plus collage mix fits a personality channel but does not match a fully animated course.

---

## What we should steal (rules for HyperFrames: HTML, SVG, GSAP)

### Look
1. **One flat background color per scene, changed as a chapter signal.** Use a fixed set of 6 to 8 saturated mid-value colors (Treehouse green, blue, purple, teal, plus warm coral and mustard for "money" beats). No gradients, no vignettes, no textures. Define them as `--scene-*` tokens next to the frappe-ui tokens, since the course is playful and not channel-branded dark violet.
2. **Tone-on-tone set dressing.** Draw background context (office, shop, bank, warehouse) as `stroke`-only SVG at 1.5–2px in `color-mix(in srgb, var(--scene-bg) 85%, black)`. Characters and the key prop are the only fully colored elements.
3. **No outlines. Flat fills plus at most one shade step.** Add a single `ellipse` floor shadow at 15% black under standing characters and props.
4. **Concepts as white "cards" and medallions.** An account, invoice, ledger or journal entry is a white rounded card (`rx` 12–16) with a colored header strip. A comparable object is a white circle medallion holding an icon. These map directly onto accounting objects. Use cards for documents and medallions for assets.

### Characters (SVG puppet rig)
5. **Proportions:** about 3 heads tall. Rounded-rectangle head, separate hair shape, rectangle torso, stick legs (stroke-linecap round), wedge feet, 4-finger hands. Faces are dot eyes, arc brows, D-mouth. Give the cast a mascot, for example a coin or ledger-book creature in the role of Treehouse's yellow monster.
6. **Rig structure (one `<g>` per part, nested):** `char > [shadow, legs, torso > [armL, armR], head > [face > (brows, eyes, mouth), hair, ears]]`. Set `transform-origin` at the joints (neck base, shoulders, hips). For GSAP use `svgOrigin` or `transformOrigin` in px.
7. **Rubber-hose arms as one `<path>`** (shoulder → control point → hand). Animate the control point (GSAP tween of a JS object, then `setAttribute('d', …)` on update) so the arm bends without elbows. The hand is a separate `<g>` placed at the path end, rotated to the path tangent.
8. **Expressions as swappable face sets.** Each emotion (`happy`, `worried`, `thinking`, `surprised`) is a `<g>` of brows, eyes and mouth. Swap with a 2-frame crossfade (`autoAlpha`, 0.066s) plus a 3–5° head tilt and a 2–4px head drop. Do not build phoneme lip-sync. Change the mouth per phrase on emphasis words.
9. **Blinks:** scaleY of the eyes to 0.1 over 2 frames and back over 3 frames, every 2.5 to 5s with seeded random offsets (deterministic for render). Add eye darts (translate x ±3px) before a character "notices" something.
10. **Every action has anticipation and settle:** 4–6 frames opposite to the move, the move with `power3.out`, and a settle with `back.out(1.6)` or a small overshoot. Head and hair follow the body 1–2 frames late (`delay: 0.04`).
11. **Squash and stretch on the body group only** (robot or mascot style): `scaleY 0.92 / scaleX 1.05` on landing, origin at the feet, and back in 0.25s.
12. **Cheat walks.** Translate the whole character with a 2-step vertical bob (`y: -6` yoyo at the step rate, about 0.25s) and keep the legs hidden behind props or the frame edge, or use a simple 2-pose leg swap. Let a wipe or the background travel with them.
13. **Ambient motion during holds:** one small thing always moves (clock hand, coin glint, steam, a slow ±3° mascot sway). Keep it subtle and keep it to one item, so it does not become "idle wobble" everywhere (that conflicts with motion-doctrine).

### Motion and transitions
14. **No hard cuts inside an animated sequence.** Chain scenes with: (a) curved-blob color wipes, where an SVG path with a bezier leading edge sweeps across over 0.6s with `power2.inOut` and is filled with the next scene's background color, (b) circle iris wipes (`clip-path: circle()`), (c) **shape-morph match cuts** (MorphSVG, or flubber if MorphSVG is unavailable, for example a coin morphs into a ledger card), (d) push-in through a card, (e) whip pan with blur (`filter: blur()` up to 18–20px at peak velocity). These match the cut-the-curve and seam-craft skills already in the repo.
15. **Pop-ins:** 0.25–0.35s, `back.out(1.7)`, scale from 0.6, staggered 0.05–0.08s. Exits: 0.2s `power2.in`, faster than entrances.
16. **Grid wave:** when a row of cards or accounts is shown, a staggered sine bob (`y: -10`, 0.06s stagger, yoyo once) brings the row to life without extra content.
17. **Stroke-draw icons and lines** (`stroke-dashoffset`) for arrows, T-account lines, underlines and check marks. Draw time is 0.4–0.75s.
18. **Number tickers** (Kurzgesagt) for every balance change. Tween a number with `snap` and tabular figures. Debits and credits that tick in sync on both sides make double entry visible.
19. **Motion blur proxy** on fast moves: a short `filter: blur(Xpx)` keyed to velocity, or a 2–3 ghost copy smear at 20–30% opacity for one frame (Treehouse's expression smear).

### Teaching devices
20. **Metaphor-first scenes** (TED-Ed's strongest skill): each abstract idea gets a physical object with behavior. Starting candidates: balance scale or seesaw for debits = credits, jars or buckets for accounts (Two Cents), two-sided T-account "doors" that cards walk through, a conveyor or queue for accruals over time, and calendar blocks (Treehouse's week squares) for periods and accrual timing.
21. **Text budget:** at most about 6 words of on-screen text per scene, plus numbers. Use title cards only at section breaks ("Rule #1 / Every entry has two sides"). Set type in Inter (house font) at 600–700 weight, white on the scene color, centered.
22. **Pacing:** target 150–165 wpm VO (TED-Ed and Kurzgesagt, with room for numbers to land), not Treehouse's 190+ promo speed. Use a new visual beat every 3–5s and a full scene change every 8–15s. Hold 0.5–1s of stillness before a key reveal (stillness before climax).

## What to avoid

- **The Treehouse P&L approach:** a host plus full-page financial-statement screenshots with yellow highlighter. This is the default failure mode for accounting video. Rebuild statements as simplified animated cards with 3 to 6 lines and live numbers.
- **Gradients, vignettes, paper grain or glow** (Kurzgesagt's radial vignette, TED-Ed's texture, Two Cents' parchment). These conflict with our flat-token rule and are costly to keep consistent in SVG.
- **Full phoneme lip-sync and full walk cycles.** These cost a lot and add little. Treehouse avoids both and still reads as "nice rigs".
- **Idle wobble on everything.** Treehouse holds are mostly still with one ambient mover. Constant breathing on every character looks cheap and violates motion-doctrine.
- **Fast promo pacing (190+ wpm) for concept lessons.** It works for a 55s ad but is too fast for debits and credits.
- **Mixed visual systems in one lesson.** For example, Two Cents puts a photographic flag behind a cartoon puppet. Keep one illustration language for everything.
- **Hard cuts between animated scenes.** They break the "one continuous world" feel that makes Treehouse and Kurzgesagt look polished.
- **Text-heavy slides and bullet lists** (the "Collaborating with Developers" bullet slide beside the character). Move bullets into narration and objects.
- **Caricature that is too stylized for a broad audience** (TED-Ed's long-nosed figures). Treehouse's friendly geometric cast is a better fit for "playful but approachable".

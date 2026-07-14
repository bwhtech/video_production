# graphics/ — thumbnails & motion graphics (HyperFrames)

Replaces the old Remotion project at `~/Learning/bwh-video`. Graphics are now
authored as **HyperFrames** HTML compositions (render video/stills from HTML),
themed from **frappe-ui**'s design tokens.

## Theme = frappe-ui espresso tokens

`theme/tokens.css` is **auto-generated** from frappe-ui's own generated tokens —
variable names match frappe-ui **1:1**, so graphics look like Frappe products.
Use tokens, not hex (e.g. `color: var(--ink-gray-9)`).

**The token system is documented upstream — read the vendored copies in
`theme/ref/` (mirrored from frappe-ui, see `ref/PROVENANCE.txt`):**

- `ref/frappe-ui-TOKENS.md` — the semantic token reference (`ink-*` /
  `surface-*` / `outline-*`, which step to use for what). In CSS the utilities
  map to vars: `text-ink-gray-9` → `var(--ink-gray-9)`,
  `bg-surface-base` → `var(--surface-base)`, etc.
- `ref/frappe-ui-DESIGN.md` — the design language (gray-first, ink hierarchy,
  color only where it encodes meaning). Follow it for graphic composition.
- `ref/frappe-ui-foundations.md` — the token spec (color/type/radius/elevation).
- `ref/frappe-ui-COMPONENTS.md` — component API reference.

### Video-specific deltas (NOT in the frappe-ui docs — decided here)

- **Brand accent: violet** (frappe-ui's badge violet), exposed as `var(--brand)`
  + `--brand-hover` / `--brand-subtle` / `--brand-ink` / `--on-brand`. frappe-ui
  apps default to blue; our channel graphics use violet.
- **Dark theme is the default.** `:root` carries the dark values; add
  `data-theme="light"` to a subtree to flip it back to light. (frappe-ui ships
  `:root`=light / `[data-theme=dark]`=dark; `build_tokens.py` inverts the
  default for video.)
- Primitives are also exposed directly: `--<hue>-<shade>` (canonical scale, e.g.
  `--violet-500`) everywhere, `--dark-<hue>-<shade>` under dark.

### Regenerating tokens

Source JSONs are vendored in `theme/frappe-ui-tokens/` (see `PROVENANCE.txt`).
To refresh from a newer frappe-ui:

```bash
# re-copy the 3 generated JSONs from the frappe-ui checkout, then:
cd theme && python3 build_tokens.py
```

`tokens.css` is a build artifact — edit `build_tokens.py`, never `tokens.css`.

## Fonts

`theme/fonts.css` self-hosts the exact Inter Variable woff2 frappe-ui ships
(`theme/fonts/`), so renders are deterministic (no network fetch). Referenced
with a sibling-relative `url("fonts/…")` — **never** `../` (breaks HF's render
path-rewriter; `npx hyperframes check` enforces this).

## Layout & asset-path rules (HyperFrames)

- The **main composition** is `index.html` (currently the **thumbnail**
  reference). Additional graphics are added as sub-compositions under
  `compositions/` (see `/hyperframes-core` → `references/sub-compositions.md`)
  or as sibling projects.
- **Asset paths must be root-relative** (`assets/…`, `theme/…`) with **no
  `../`** — compositions serve with the project root as base URL.
- Run `npm run check` after every edit (0 findings before render).
- Snapshot a frame: `npx hyperframes snapshot --at 0` → `snapshots/`.
- Render: `npm run render`.

## Reference component: thumbnail (`index.html`)

Ported from the Remotion `bwh-video` `Thumbnail.tsx`, re-themed to dark +
violet. Static 1920×1080. Structure: dark surface + subtle dot grid + violet
glow, slanted photo split (right) fading into the surface, violet slant accent
line, product logo + Inter-bold title (`--ink-gray-9`) + violet chapter pill
(`--brand-subtle` fill / `--brand-ink` text). Edit the two title lines and the
`.chapter` text per video.

## Retiring bwh-video

`~/Learning/bwh-video` (Remotion) is the **old** graphics system. Port its
remaining finalized components on demand with `/remotion-to-hyperframes`
(LowerThird, TitleSlide, AgendaGiantNumbers, OrderedList, NumberTicker,
EndScreen, intros), re-theming each to these tokens as done for the thumbnail.

# Double Entry, Single Chai

A free, English-language accounting course website built with Astro 7.3.6, semantic HTML, plain CSS, and a small progressive-enhancement script. The existing course artwork and curriculum are the source material.

## Local development

Use Node 24 (or Node >=22.12.0).

```sh
npm ci
npm run dev
```

Open the URL printed by Astro, normally http://localhost:4321.

```sh
npm run check     # Astro and TypeScript diagnostics
npm run build     # Static output in dist/
npm run preview   # Serve the production build
npm test          # Browser integration and accessibility checks
```

The browser suite uses a local Google Chrome installation and starts a production preview on port 4322. It covers 14 lesson routes, previous/next navigation, chapter expansion, keyboard access, JavaScript-disabled access, missing images, overflow, and axe accessibility checks at 320, 375, 414, 768, 1280, and 1440px. Screenshots are written to the ignored `test-results/` directory.

## Editing

- `src/data/course.ts`: the 14 lessons, five chapters, descriptions, stable slugs, and checkpoint flags.
- `src/pages/index.astro`: landing page composition.
- `src/components/`: hero illustration, curriculum, story, and icons.
- `src/pages/lessons/[slug].astro`: generated lesson pages and player placeholder.
- `src/layouts/Layout.astro`: shared navigation, footer, and page metadata.
- `tokens.css`: the shared colour, typography, spacing, and motion tokens.
- `src/styles/`: styles split by page responsibility.

Every play link leads to an individual lesson URL. The placeholder says that the video is coming soon; no video is loaded, no progress is recorded, and no account is required. Replace `.player-placeholder` in the lesson route when building the player. Lesson discovery and navigation also work without JavaScript; JavaScript adds the expand-all convenience control and opens chapters targeted by a URL fragment.

## Artwork and fonts

The transparent WebP characters are exports of `../lessons/shared/kit/kit.js` and `rig.js`, with the course’s existing paper textures. The hero also uses an inline SVG export of Meera, with CSS animation on the head and arm joints. The site does not ship the animation rig or GSAP. Steam loops continuously; Meera makes a brief thinking gesture every twelve seconds. Both pause off-screen, when the tab is hidden, or via the motion control, and respect reduced-motion preferences. To regenerate them from this repository, run `npm run art` (requires local Google Chrome).

Baloo 2 and Kalam come from the shared course kit. DM Sans comes from Google Fonts. All fonts are self-hosted; their SIL Open Font Licenses are in `public/fonts/licenses/`. The site makes no runtime requests to a font CDN.

## Netlify, when ready

If connecting the parent repository, set the **base directory to `accounting-course/website`** when the repository root is `video_production`, or **`website`** when the repository root is `accounting-course`. If deploying this directory as its own repository, leave the base directory empty.

`netlify.toml` contains:

- Build command: `npm run build`
- Publish directory: `dist` (relative to the base directory)
- Node version: `24`

The site is fully static. No Netlify adapter, server functions, login, or SPA redirect is needed. Netlify can serve each generated lesson route directly, and `404.html` handles missing pages. Set the production `site` URL in `astro.config.mjs` once a domain is chosen if adding canonical URLs or a sitemap.

Nothing has been deployed.

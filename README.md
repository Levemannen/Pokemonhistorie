# Pokémon – The Mystery of the Lost Starlight

A complete, free, browser-only choose-your-own-adventure storybook for ages 8–12. React, TypeScript, Tailwind CSS and Vite. No backend, API keys, image services, analytics, web fonts or paid dependencies. All game assets ship locally.

## Play locally

Install Node.js 22 or later and pnpm 11.25.0, then:

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite. `pnpm build` creates the self-contained static site in `dist/`. Serve that directory through any static HTTP server; opening `index.html` directly as a file is not supported.

## Deploy to GitHub Pages for free

For steg på norsk, se [opplastingsveiledningen](docs/GITHUB-NO.md).

Push this project to the `main` branch of a GitHub repository. In the repository’s **Settings → Pages**, select **GitHub Actions** as the source. The included workflow installs locked dependencies, verifies the story, builds the app, and deploys `dist/`. Relative asset paths support both repository Pages and custom domains. No secret or API key is needed. Publication requires your GitHub repository and account; no live deployment has been created by this local build.

## Story and controls

The October 29 editorial revision rewrites the English and Bokmål scene text with stable paragraph IDs, explicit conditions, continuity tests, and historical-save corrections. See the [revision report](docs/EDITORIAL-REVISION-2026-10-29.md) and [story canon](docs/STORY-CANON.md).

Every choice now has its own action result leading into the next scene. The story runs directly between chapters, with important companion reactions woven into the prose. See [all transitions](docs/STORY-TRANSITIONS.md).

Edition 2.1 has 39 scenes, five chapters, 118 authored choices, and six endings, fully available in English and Norwegian Bokmål. Choose Bulbasaur, Charmander or Squirtle; starter abilities unlock different paths. Decisions preserve clues, tools, promises and explicitly recruited companions. All six endings are available to each starter. Existing saves continue in the previous edition without converting their flags into new story facts. See [edition notes and limitations](docs/EDITION-2.1.md). No combat, punishment, purchases, or timed reading.

- **Read to me:** optional English or Norwegian browser speech synthesis, with slower reading speeds. Available voices and offline support depend on the browser/OS; the app calls no narration API. Playback requires a click, stops at scene changes, and can be stopped immediately.
- **Word explorer:** bilingual English/Bokmål definitions beside underlined English words. All 118 choices have optional language help and separate playback.
- **Your journey:** chronological record with historical state snapshots and safe branching while keeping the original journey.
- **Companions:** starter plus recruited Pokémon remain beside you.
- **Local save:** automatically resumes on the same browser/device. Endings stay collected when starting again. Clearing browser storage removes progress. If storage is blocked, the app remains playable and shows a warning.

## Art pipeline

The storybook has prepared AI illustrations for all 39 locations, with clearly labeled SVG recovery if an image fails to load. The ridge now has matching prepared paintings for Bulbasaur, Charmander and Squirtle. Generated paintings are stored in `public/images/scenes/painted/`. Most scenes share one illustration across all three starters, focusing on the location, discovery, or encounter. The opening and observatory use starter-specific paintings; important companions and decisions select alternate scenes. The app uses only local prebuilt assets and never generates artwork during play.

`public/images/illustration-manifest.json` maps each scene, starter, companion, and major decision to local artwork and records actual painted coverage. `public/images/painted-prompts.json` contains the detailed painting prompts; `public/images/painted-catalog.json` records saved generated files. `public/images/illustration-prompts.json` also retains the original fallback prompts. See [artwork production notes](docs/ARTWORK.md). `pnpm art` regenerates SVG fallbacks and reapplies registered paintings to the manifest.

## Verification

```sh
pnpm test
pnpm build
```

`pnpm test:full` additionally builds and serves the production files under `/Pokemonhistorie/` to verify repository-subpath deployment. `pnpm export:story` refreshes the third-party review package, including 18 English and 18 Norwegian reading routes.

## Tablet layout

The book is also an installable web app with local icons, standalone launch and an optional complete offline download. Open “Keep this book on your tablet” in the book. See [installation, offline behavior and update notes](docs/APP-MODE.md).

Portrait tablets use a full-width book with companions below; landscape widths of 1100–1366 pixels show a side panel. Tablet text is larger, separate touch controls have at least 44-pixel targets, and dialogs fit the available screen height. Pinch zoom remains available. Reading mode hides the side panel. Automated checks cover portrait, landscape, rotation and split-screen widths in Edge touch emulation; physical iPad/Safari testing remains recommended.

## Norwegian and English

Choose **Norsk** or **English** above the book before starting, or change language during the journey. Language is saved locally with progress. Local catalogs are `src/manuscript-nb.json`, `src/edition-ui-nb.json` and `src/nb.json`; no translation service is called. Narration requests `nb-NO` or `en-US` and depends on voices installed in the browser/device. The vocabulary notebook deliberately keeps English words and example sentences alongside Norwegian meanings.

See [the 100-point development report](docs/DEVELOPMENT-REVIEW.md) for implemented changes, partial items, test evidence and manual checks still needed.

See [the revised edition quality report](docs/QUALITY-CONTROL-EDITION-2.1.md) for current checks. The earlier October 27 report describes the previous edition.

The story checker explores future-relevant state combinations, checks every authored choice and scene is reachable, checks there are no dead ends, preserves companions and decisions, validates local art/prompt references, and proves all six endings are reachable with each starter. `verification-report.json` records example complete routes for every ending and starter. Browser checks should additionally cover narration on your own device, saved progress, mobile layout, keyboard interaction, and the deployed Pages URL.

## Files

- `src/story.ts`: complete story graph, typed transitions and vocabulary
- `src/App.tsx`: reader, save state, narration, journal and ending collection
- `src/style.css`: responsive storybook styling, including Tailwind
- `scripts/art.ts`: deterministic SVG art preparation
- `scripts/verify.ts`: story graph and asset verification
- `.github/workflows/deploy.yml`: free static Pages deployment

Pokémon names and characters belong to their respective owners. This is an unofficial fan project and is not affiliated with Nintendo, Game Freak, or The Pokémon Company.





See [the gameplay update](docs/UPDATES.md) for consequence routes, interactive puzzles, companion dialogue, inline definitions, adjustable narration and illustrated ending memories.


See [reading and collections](docs/COMFORT.md) for calm reading mode, adjustable text, whole-adventure books, the adventure bag, uninterrupted chapters and a contextual personal word notebook.

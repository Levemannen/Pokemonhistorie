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

39 scenes, five chapters, 104 authored choices, and six endings. Choose Bulbasaur, Charmander or Squirtle; starter abilities unlock different paths. Decisions preserve clues, tools, promises and recruited companions. Some grant later options, while scene-specific consequences and collected companions change the text and illustration layers. All six endings are available to each starter, with additional routes unlocked by prior choices. No combat, punishment, purchases, or timed reading.

- **Read to me:** optional browser speech synthesis, English at a gentle pace. Available voices and offline support depend on the browser/OS; the app calls no narration API. Playback requires a click, stops at scene changes, and can be stopped immediately.
- **Word explorer:** definitions for challenging English words; underlined story words open it.
- **Your journey:** chronological, read-only record of visited pages and decisions.
- **Companions:** starter plus recruited Pokémon remain beside you.
- **Local save:** automatically resumes on the same browser/device. Endings stay collected when starting again. Clearing browser storage removes progress. If storage is blocked, the app remains playable and shows a warning.

## Art pipeline

The storybook now supports **prepared AI illustrations alongside clearly labeled SVG fallbacks**. Generated paintings are stored in `public/images/scenes/painted/`. Most scenes share one illustration across all three starters, focusing on the location, discovery, or encounter. The opening and observatory use starter-specific paintings; important companions and decisions can select alternate scenes. Original SVGs remain available for unfinished artwork and loading recovery. The app uses only local prebuilt assets and never generates artwork during play.

`public/images/illustration-manifest.json` maps each scene, starter, companion, and major decision to local artwork and records actual painted coverage. `public/images/painted-prompts.json` contains the detailed painting prompts; `public/images/painted-catalog.json` records saved generated files. `public/images/illustration-prompts.json` also retains the original fallback prompts. See [artwork production notes](docs/ARTWORK.md). `pnpm art` regenerates SVG fallbacks and reapplies registered paintings to the manifest.

## Verification

```sh
pnpm test
pnpm build
```

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


See [reading and collections](docs/COMFORT.md) for calm reading mode, adjustable text, whole-adventure books, the adventure bag, chapter bookmarks and a contextual personal word notebook.

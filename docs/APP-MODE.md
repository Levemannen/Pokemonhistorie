# Installable app and offline reading

Implemented October 28, 2026. The book is a static Progressive Web App (PWA): no account, backend, subscription, store listing or paid API is required.

## Install

Publish the current build through the existing GitHub Pages workflow. Open the HTTPS website on the tablet. On iPad, use Safari → Share → Add to Home Screen and enable Open as Web App if offered. Other supported browsers offer Install app or Add to Home screen; the book displays an install button when the browser exposes that capability.

The app icon opens the book in a standalone window. It supports both orientations and keeps the selected reading language. Browser and installed-app storage can differ on some platforms: install before starting a new adventure. There is no cross-device sync.

Official references: [Apple iPad instructions](https://support.apple.com/en-mide/guide/ipad/ipad8f1f7a29/ipados), [MDN installation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable), [MDN offline operation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation).

## Offline

Open “Keep this book on your tablet” and choose “Download book for offline reading.” The complete current package is about 159 MB, including every referenced painting and SVG recovery image. The button is optional: first launch automatically caches only the small app shell, then illustrations as visited.

The download shows progress and is marked ready only when every required file is cached. Keep the app open while downloading. A failed download can be retried; already downloaded files are reused. Cached files can be evicted by the operating system when storage is low. Installed voices determine whether narration works offline.

## Updates and saves

Each build generates a versioned service worker from file contents, including artwork. Cache names are scoped to the deployment path, so this project does not remove caches from other GitHub Pages projects. Only local same-origin project files are cached; no analytics or external services are added.

New builds wait until the reader chooses “Update app and reopen book.” Saved journeys remain in localStorage. The new version clears its previous asset cache, so its full offline download may be needed again. A failed core installation does not replace the existing working app. Development mode does not register the worker.

`pnpm build` runs Vite and then generates `dist/sw.js` and offline metadata. Deploy the complete `dist` directory, including its manifest, icons and worker. Icon PNGs are committed; regenerating them is optional and uses `scripts/app-icons.mjs` with the existing Playwright runtime.

## Verification

`scripts/browser-pwa.ts` serves the actual production build under `/Pokemonhistorie/` and checks the manifest, worker scope, failed-download retry, a complete ending reached with real offline clicks, all 39 scene illustrations offline, a cold offline tab launch, Norwegian status text, and user-triggered update preserving the exact saved journey. Report: `docs/browser-qa/pwa-report.json`.

Tests use Chromium/Edge, not a physical iPad. Home-screen installation and storage behavior should also be tried on the intended iPad/Safari version. Nothing has been published automatically.

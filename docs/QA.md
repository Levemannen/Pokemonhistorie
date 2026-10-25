# Verification record

Updated locally on 25 October 2026. Prepared AI artwork is now integrated through a shared-scene manifest, with original SVG recovery. Earlier gameplay-only results below remain historical notes for those updates. See ARTWORK.md and illustration-manifest.json for the current artwork coverage.

- TypeScript and production build: passed.
- Story graph: 39 scenes, five chapters, 104 choices and six endings. All authored choices and scenes are reachable, with two to four story choices at every playable state.
- Ending reachability: all six endings reachable with all three starters. The checker merges states only after earlier clues can no longer affect future choices; the current pass checks 40,810 distinct futures. Puzzle retries do not advance the story.
- Assets: all 117 local SVGs and prompt references remain present. Existing art is reused for visiting companions and ending memory cards.
- Regression checks: each puzzle scene with all three starters; wrong attempts, two hints, reset, partial saves, solutions and guarded choices. The observatory has a different answer for each starter.
- Consequence checks: returning forest-guard Pikachu, the Lapras promise trail, the nest melody, the river reply and the planted seed. Prerequisites and route exclusions are covered.
- Ending memories: at least three cards per ending route, with choices verified against the actual journal. Unused feathers and old-edition puzzle flags are not credited with solving new puzzles.
- Save compatibility: v1 saves restore, with new arrival effects applied when appropriate. Invalid puzzle data is discarded safely. New journal snapshots preserve knowledge from the time of the choice.
- Browser: completed a Bulbasaur journey through all three puzzles to The River of Stars. Checked wrong attempts, hints, partial-save reload, solved-choice unlocking, inline definitions, slow-word narration controls and persistent reading pace.
- Browser: completed the Squirtle promise route to The Lantern League, with the hidden stair, changed greeting, team dialogue and illustrated memories. Testing used a separate local origin and did not replace the reader's saved journey.
- Mobile: 390 by 844 viewport checked for story text, inline definitions, reading pace, consequence callouts and companion dialogue.
- Audio controls were tested, but audio quality was not assessed by listening. Written notes and story text remain available without audio.
- GitHub Pages workflow is supplied; no public deployment was performed.

verification-report.json contains example ending routes for every starter and puzzle solutions. Screenshots in this folder show rendered game pages.


## Discovery, map and epilogue update

- Added three exclusive encounters: Echo Archive, Reed Workshop and Wind-Watch Perch, with later route and ending consequences. The book now has 39 scenes and 104 choices.
- Added targeted discovery tests for one complete route through all three encounters and the resulting star-reed garden. Map snapshots, hidden future locations, personal non-party epilogues and legacy saves are checked.
- Browser playthrough confirmed the archive clue, cloud-platform bypass, lantern garden and personal outcomes for Psyduck, Altaria and Gastly. Old saves also display after-stories for Pokémon left behind.
- Puzzle observations and the written melody are closed until requested; first hints nudge and second hints explain the solution. Ordinary dialogue no longer gives the observatory answer.
- The actual child playtest remains to be performed. A short Norwegian test plan is prepared in PLAYTEST.md.
- Mobile map check: at 390 by 844, the map scrolled sideways using keyboard controls and the page stayed within the viewport. Selecting a place showed its historical snapshot; Back to the map returned to the selected footprint. Closing the map and reloading preserved the garden ending.
- Final production browser console: no errors or warnings. The existing player tab was refreshed without replacing its saved journey. Latest example: journey-map-preview.png.

## Reading and collections update

- Added persistent reading mode and three text sizes; normal story text, old books, examples and memories respond to the settings.
- Completed journeys are archived with unique run identities. Reloading an ending does not duplicate a book; independent repeat runs remain separate. Books preserve their own map, journal, inventory, ending and friends while the active journey is unchanged.
- Added a derived adventure bag with actual source choices and usage notes. Unfound items remain hidden. No inventory item or effect was invented to fill the bag.
- Added four persistent chapter bookmarks with choice-aware recaps, optional recap narration and natural pause/resume controls. Continuing a chapter does not add a story decision.
- Added a personal word notebook: canonical words, real sentence examples, source pages and starter context. Repeat taps and plural forms are deduplicated; words remain across new journeys.
- Targeted comfort tests cover independent books, archive deduplication, deep snapshots, old saves, four bookmark reloads, source-based word examples, preferences and inventory attribution.
- Browser test: loaded an earlier completed Bulbasaur garden journey, archived it, started a new Charmander journey and completed The Aurora Promise through all four chapter pauses. Both books remained after reload; the older map could be opened during the new journey without moving it.
- Browser test: reading mode hid the sidebar, Extra large produced 24 px story text, and both settings survived reload. A constellation example from the Bulbasaur journey and a star example from the Charmander journey remained in My Words.
- Mobile: bookshelf and word notebook checked at 390 by 844 with Extra large enabled. No horizontal document overflow; book cards stacked correctly and source examples remained readable.
- Recap narration start/stop and chapter pause reload were exercised. Audio quality was not assessed by listening. Storage failure handling is implemented; quota exhaustion was not simulated in the browser.
- Full story graph remains 39 scenes, 104 choices and six endings reachable with each starter. No new illustration assets were generated.
- Final build and all four test suites passed. The player tab now serves the updated production bundle. No console warnings or errors were captured in the isolated production browser test. The test preview was stopped; the original player preview remains available.
- Current screenshot: bookshelf-preview.png. The static ZIP was rebuilt with this version.

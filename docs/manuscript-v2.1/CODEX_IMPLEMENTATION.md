# Implementation Handoff to Codex — V2

**Source of truth:** `scenes.json` (structured scene manuscript including `body`, cumulative `variants`, `choices`, `immediateText`, conditions and effects); `COMPLETE_MANUSCRIPT.md` (readable copy); `STORY_BIBLE.md` (canonical world rules). These replace rather than patch narrative. No code changes are included.

## Build contract
1. Keep the current app free, offline-playable and in English; preserve story layout, reader saves and accessibility.
2. Scene `body` is *full narrative*, not a summary to be expanded by Codex. Display an eligible previous choice's `immediateText` **before** displaying destination narrative. In scene `lumi` additionally show all eligible cumulative variant paragraphs in meaningful order, not one if/else winner.
3. Evaluate simple conditions in the structured file (`always`, `starter=X`, `flag=value`, `OR`, `puzzle:ID solved`). Interpret effects as explicit set/add/remove operations. Treat `item+=` and `item-=` as inventory changes; boolean `flag=yes` means true; a simple `flag` means a string or boolean as appropriate. Normalize these symbols in a single documented schema before coding and test conversion carefully.
4. Canonical reader state: `{sceneId, starter, flags, items, knownFacts, relationships, partyTraveling, friendsLocal, arrivalMode, lastChoiceId, history, puzzleStates}`. Do not infer a companion from a kindness flag. Do not render Lapras physically outside river scene illustrations.
5. Track arrival mode from choice provenance, not merely a global flag. Gate alternative entrances; `tower` has variants for service route, bells and stones. Show scene-specific arrival text for other valid entrances as required.
6. Mandatory knowledge chain: Mira is introduced at `lantern`; the core tower mechanism at `square`; a real memory and Lumi's role at `island`; current injury and cause at `lumi` + `listen`; three rings and costs at `plan`. No route can bypass `listen` or `plan` to an ending.
7. Avoid transposing current 39-scene ID array indices to positions; reuse identifiers and maintain backward-compatible migration for saved journeys. Old flags are not blindly interpreted as new canon facts. For incompatible past saves, provide clear option to replay the chapter.
8. Full puzzles: mushrooms order small → medium → large; waterfall low → high → low; observatory Bulbasaur root → leaf → flower, Charmander moon → sun → latch, Squirtle low → middle → high. Provide accessible repeat/hint mode; no loss or forced scene change on incorrect answers.
9. Implement all six endings based on their guarded choices only; verify each reachable with every starter. Never grant an item during a choice whose source scene is skipped.
10. Ending portraits, companions, journals, chapter recaps and item icons must derive from the same authoritative world state. Make responsive images conditional on actual parties, not guessed from one flag.
11. Because many outcomes are passed as incoming scene paragraphs, make prior choice labels immutable IDs so translations and punctuation changes do not break history.

## Mandatory QA matrix
- Start all three starters; with and without Eevee; follow each of the four `gate` exits.
- Ridge→brook, brook direct and grove direct: signs have consistent discovery, never assume Squirtle.
- Rescue Pikachu and invite, rescue and guard, or leave behind; inspect companion state at observatory/ending.
- Optional Hoothoot and optional archive skipped: every mandatory fact is still presented correctly.
- Bank→cave (with clues) versus falls→cave; correct entrance description is mandatory.
- Make and skip optional lanterns and ordinary forest seed; no phantom inventory or reactivity.
- Reach tower by stairs, roof-stones, moon-bell, cover-walkway and service tunnel; verify accurate opening.
- Lumi first-contact: knock, seed, Shinx question, two-scarf return. Prior reply plus scarf triggers two *cumulative* reactions.
- Lumi/ Shinx necessary explanation given on every route even when archive missed.
- All six endings: full return of original sky reflections and credible continuation of care.
- 3 starters × 6 endings; conditionally rewarded aurora methods and song access.
- Automated invariant tests for unseen item references, impossible gates, dangling flags, contradictory party status, double consumption and absent mandatory dialogue.
- Visually inspect illustration combinations, read-aloud flow, short mobile screens and alt text separately. None of these were visually tested during this editorial delivery.

## Known editorial issues to resolve before declaring production-ready
- The scene JSON specifies some broad `entry` prose rather than machine-readable predecessor arrays. Codex must use graph edges, not infer topology from these strings.
- Cumulative variants currently need editorial placement (some work best immediately after the first or second sentence). Do not dump them as an unrelated appendix in a scene.
- A few optional rescue, seed and lantern consequences primarily appear through immediate text and epilogue; add later short callbacks when selected, without inventing new causal paths.
- Reassess conditional accessibility: all unconditional return-home solutions remain available, but some optional powers should be earned.

## Authoritative state and presentation rules
- `silverSeed` is granted automatically in `lantern`, kept in the belt pouch from `square` through the climax, and planted or settled only once in the chosen epilogue.
- If the reader bypassed Pikachu's rescue, add the `pikachu=left` paragraph in `clearing`: helpers are arriving; do not award Pikachu as a traveler.
- At `square`, the choice response follows the scene and precedes `hill`; do not render future knowledge as a conditional paragraph above the choice that grants it.
- At `mushrooms`, the rune is awarded only after its successful puzzle choice; do not display a rune-owned paragraph upon entering the puzzle.
- The earth-ring receiver is carried down *after* the Glass releases the stars. No teleporting plants, remote rooting or unintroduced copper conduit are necessary.
- At `endSong`, the familiar tune coordinates the ring operation, while a warmed carrier or shared lanterns supply actual warmth.

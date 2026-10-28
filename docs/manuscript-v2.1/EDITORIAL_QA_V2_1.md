# Independent editorial and route QA — v2.1 (27 October 2026)

## What was actually reviewed
The complete structured manuscript (`scenes.json`), the corresponding readable manuscript, the character/world bible, and the implementation handoff were inspected and revised. A randomized graph-and-state walk tested 16,000 choices-to-ending routes for each starter (48,000 completed simulated routes overall). These simulations included puzzle-gated choices as solvable, but did **not** execute the existing frontend or visually play the deployed game.

## Structural findings
- **39 scenes, 118 choice definitions, five chapters, six endings.**
- **All 39 scenes reached** for each starter.
- **All six endings reached** for each starter.
- All choices available to each particular starter were sampled at least once during the randomized walks; the starter-specific choices only appeared for their eligible starter.
- No encountered dead ends, unknown destinations or removal of an absent inventory item in the simulated routes.
- All remaining conditional paragraphs were exercised in the 48,000 route samples.
- **Limits:** This is probabilistic route sampling, not exhaustive checking of every theoretically possible state combination. No game browser test, screenshot test, old-save migration test, proofread of all concatenated paragraphs in rendered UI or real puzzle UI test has been completed.

## Specific repairs in this editorial pass
1. Starter-specific opening replaces a misleading single passage that showed all three starters acting simultaneously.
2. The silver seed is explicitly secured with the child and its epilogue fate is written into the main text instead of under an unreachable `silverSeed=owned` condition.
3. Mira describes her village coverage, signals, supplies and safe-return plan before the child enters Moonwood.
4. Brook signage no longer supposes a route-specific Squirtle action occurred.
5. Unrescued Pikachu triggers a warning and forest helpers, with a later confirmation and no false player credit.
6. Psyduck's optional travel decision follows a completed workshop project instead of changing companion status without doing the requested work.
7. All three SKY solutions establish non-magical heat and safe transport first; the song is calming rather than a miraculous cure.
8. HEART explains when the release latch opens; village participation receives an explicit visible signal rather than appearing from nowhere.
9. EARTH no longer makes the seed teleport to Willowbrook: the receiver holds warmth and is carried down for planting after release.
10. Ending passages explicitly settle the silver seed and are tailored separately to the three possible starters instead of using shared generic filler.
11. Removed impossible `square` and `mushrooms` text variants that could never fire on entering those scenes.
12. Removed direct metacommentary in the tower scene about what the reader may or may not know.

## Remaining tasks before a production-ready label
- Implement and test display placement of cumulative conditional paragraphs, especially `lumi`, `listen` and `plan`, in a real reader UI.
- Confirm the editor's **intended** distinction between result flags and owned inventory, especially `rune=earned`, `ordinarySeed=owned`, and `silverSeed` in all paths.
- Inspect actual consecutive-choice prose, not only individual destination nodes, for rhythm and duplicate claims.
- Verify art, alt text, saved game migration, button labels and on-screen English language support.
- Review whether every optional detail receives sufficient payoff; not every variation presently creates an exclusive scene.
- Keep any old code and the previous original report as separate evidence; this v2.1 revision was audited as a *new manuscript*, not as a live published build.

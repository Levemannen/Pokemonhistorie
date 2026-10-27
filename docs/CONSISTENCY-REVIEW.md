# Superseded initial review

The later narrative rework replaces this initial audit: see STORY-REWORK.md and STORY-TRANSITIONS.md. All 39 scenes now have painted coverage.

# Story and illustration review — 25 October 2026

Reviewed all 39 authored scenes, the branch graph, 53 distinct selected paintings (contact sheets in `art-review/`), and the 18 SVG starter fallbacks used by the six partly/unpainted scenes. The illustrations are narrative moments, not an exhaustive picture of every traveling companion.

## Changes

- Applied the approved storybook presentation: paper-colored illustration fade, serif choices, sentence-style answers, no choice numbers/arrows/checkmarks. Large-text settings still scale the answers. Existing history/save labels remain stable.
- Matched the constellation controls to the painting: small bottom-left, medium center, large top-right. Explained how three waterfall bells produce two pitches.
- Made the astronomer’s hidden-stair sketch unlock the roof route and credit its source in the bag and ending memories.
- Kept Lapras physically at the river while preserving its friendship and distant song.
- Explained how Lumi receives the river reply, introduced her name before the tower, and matched scarf/promise greetings to illustration priority.
- Clarified that the two yellow scarves are a matching pair: Shinx’s is lost on the trail; Lumi’s remains at the tower.
- Fixed the seed/tool wording, ferry safety, island access, bridge condition, and roof opening when using the outside stair.
- Made the new lullaby, Charmander warmth and river-garden endings describe the actual chosen route.
- Chapter-pause artwork now uses the preceding page’s historical flags/companions, avoiding decisions appearing before they happen.

## Scene checklist

| Scene | Illustration / narrative check |
| --- | --- |
| lantern | Three correct starter paintings; silver seed and dark sky |
| square | Mira, map and Eevee; shared painting |
| hill | Hoothoot and silver trail; removed incorrect eye-color claim |
| gate | Base, Eevee and corrected Hoothoot arch variants |
| ridge | Charmander’s safe flame and fallen nest |
| brook | Bottle and moon stopper; reply delivery explained later |
| grove | Bulbasaur painting; other starters use ivy/Pikachu SVGs |
| rescue | Freed Pikachu and ivy |
| mushrooms | Painted star diagonal now matches interactive puzzle |
| hollow | Friendly Gastly in hollow tree |
| echoArchive | Separate Gastly archive painting and optional discoveries |
| roots | Tree face and woven root doorway |
| clearing | Lens/tool painting; Hoothoot gift variant; ordinary seed distinguished |
| bank | Stranded Lapras, ferry and river |
| lapras | Three SVGs show Lapras back in the river |
| ferry | Rope repair and Psyduck; all crossings made safe |
| reedWorkshop | Reeds, lanterns and Psyduck workshop |
| falls | Three bells; low/high/low clue consistent |
| cave | Notebook and remembered friends; sphere/lens terminology corrected |
| island | Shared memory and corrected companion variants; Lumi’s name revealed |
| bridge | Swaying intact bridge; promise mist-stair variant |
| windwatch | Altaria’s flock and cloud platform |
| stairs | Dropped scarf and promise-path variant |
| shelter | Altaria, cloudberries and feather |
| observatory | Three starter mechanisms and returning Pikachu variant |
| roof | Stepping-stones or flock arrival; outside latch explained |
| tower | Door and matching scarf on chair |
| lumi | Base/reply/scarf/promise paintings with matching text priority |
| listen | Lumi and waking Shinx beside sphere |
| plan | Three-ring sphere mechanism |
| sky | Lumi, resting Shinx and sphere |
| heart | Three symbolic heart-sphere SVG fallbacks |
| earth | Silver seed; Moonwood garden and floating-lantern variants |
| endDawn | Mira caring for Shinx in village |
| endAurora | Warm nest and aurora; feather versus Charmander text |
| endSong | River-song SVGs; new or remembered melody distinguished |
| endSanctuary | Sanctuary SVGs |
| endLantern | Village parade SVGs |
| endGarden | Garden painting or Psyduck river-reed variant |

## Verification and remaining art work

All automated suites pass: 39 scenes, 104 choices, 46,314 future-relevant states, and all six endings reachable with each starter. Regression tests cover the new story/art priorities, hidden stair, Lapras location, outside latch and star-puzzle direction. Production build passes. Browser smoke check confirms navigation, paper fade and sentence choices with extra-large text.

There are still six scenes without complete painted coverage: grove (Charmander/Squirtle), lapras, heart, endSong, endSanctuary and endLantern. Their locally stored SVGs work, but remain visibly simpler, symbolic fallback illustrations. The optional mushrooms/Pikachu painting is also unfinished; its base image is used. This review does not claim that those fallbacks are finished AI paintings. No new image generation or publication was performed in this revision.

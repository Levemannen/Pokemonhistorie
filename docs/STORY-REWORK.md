# Story rework — 25 October 2026

This replaces the earlier consistency review. The underlying 39-scene graph and six endings remain compatible with saved games, but all scene prose and all 104 transitions have been rewritten around an explicit action, result and reason to travel onward.

## Changes readers see

- The opening introduces the selected Pokémon's uncertainty, Mira's nearby stall and the hill before offering those choices. Comforting now explicitly means comforting the starter and asking Mira for help.
- Mira answers the seed question, explains the map route and points readers to the forest; she no longer appears without an introduction or arrival.
- Every converging path has a distinct first sentence acknowledging the actual previous choice. A tree response, found clue, repaired ferry or companion action happens on the page before the next decision.
- Bulbasaur speaks through its vines; the tree answers and raises its roots into a doorway. The reader sees the result before receiving the lens.
- Forest routes, cave entrances, river crossings and mountain detours explain where they lead. The observatory is clearly separate from Starfall Tower. Names, clues and useful objects are introduced before they are needed.
- All scene paragraphs remain 2–4 sentences. Important late reactions—Pikachu's return, the nest song, Lapras's promise route and Lumi's welcome—are integrated in the story.
- Automatic chapter recaps, consequence callout boxes and “Around your little team” are removed from the reading page. The chapter heading, companion sidebar, optional language help, history and endings remain.
- Canonical choice labels and save structure are retained; history and ending cards display the revised wording.

## Artwork

All 39 scenes now resolve to prepared paintings for every reachable starter. New shared paintings cover The whispering trees, A song across the water, The heart ring, The song the stars remembered, A home above the clouds and A thousand little lights. All six new paintings were visually inspected; the selected earlier paintings were reviewed in the contact sheets. The song and sanctuary endings are environmental paintings, consistent with the decision not to require every Pokémon in every image.

All active variants also use PNG paintings. The ungenerated mushroom/Pikachu variant uses the finished base painting. SVGs remain emergency recovery assets and are labeled if loading fails; they are no longer normal scene artwork.

## Verification

- All 104 authored choices have a distinct action result; tests check coverage, correct destinations and 2–4 sentences after every edge.
- Full traversal checks 46,314 future-relevant states, with every scene/choice covered and all six endings reachable for all starters.
- Image tests require painted resolution for every reachable scene/starter combination and validate active variants, local files and prompts.
- Existing puzzle, save, archive, language and consequence regression suites pass.
- Browser walkthrough confirmed Mira's transition, the arch opening, the new painted grove, direct entry to chapter 2, the trees' directions and Bulbasaur opening the root doorway.

The graph's converging routes are intentional: different actions can reach the same location, but the result and retained flags differ. This is an editorial/software review; a reading session with a ten-year-old would still be useful to identify phrases they find difficult.

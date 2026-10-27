# Prepared storybook artwork

All artwork is stored in `public/images/scenes/`. The game never generates images, calls an image service, or requires an API key during play.

Current prepared coverage: 58 of 59 planned painted assets are saved, covering all 39 scenes for every reachable starter. The remaining mushrooms/Pikachu companion variant uses the finished base painting; it does not produce an old-style page. Six newly prepared paintings replace the last normal-play SVG scenes: grove, lapras, heart, endSong, endSanctuary and endLantern. Sanctuary and song endings use painted environments without characters. SVGs are retained only for load-failure recovery. Three incorrect-location companion drafts remain unselected. Exact replacement prompts are preserved in painted-revisions.json.

## Shared illustrations

Most scenes use one finished illustration for all three starter choices. The composition focuses on the explorer, location, discovery, and characters who belong to that encounter. The selected starter can be just outside the picture. We do not add flat creature cutouts over a finished painting.

The opening and the observatory puzzle have starter-specific illustrations, because the starter has a visible central role. The ridge is a Charmander-only path. Important promises, rescues, and companion encounters can select their own shared alternate illustration. These variants follow the actual saved story state, including when reviewing an earlier memory or completed book.

`docs/painted-production-plan.json` records the production plan. It has 59 required images and preserves earlier generated starter variants as optional assets. Optional variants do not require generating the other starters. `public/images/painted-prompts.json` contains detailed prompts, including character continuity, scene action, lighting, and a starless sky before the endings. Images were created with the built-in image generation tool and copied into the project.

## Manifest and recovery

`public/images/painted-catalog.json` records only successfully saved generated images. `public/images/illustration-manifest.json` selects the appropriate local file and reports actual production coverage. Shared scene images take precedence over older starter-specific extras. Shared variants have no starter restriction; starter-specific variants are checked against the selected Pokémon. When several variants match, the highest priority wins.

Original SVG illustrations remain available. Loading failures also recover to the original SVG illustration. The application does not label those fallback illustrations as finished AI artwork.

After registering newly generated artwork, run `tsx scripts/sync-painted.ts` and rebuild the static application. The `art` command regenerates SVG assets and then reapplies the prepared paintings, so it does not discard the generated artwork from the manifest.

`scripts/illustrations-test.ts` checks sharing across all starters, restricted variants, companion and decision priority, SVG recovery, local PNG signatures, and prompt coverage. Other story tests continue to verify every ending is reachable.

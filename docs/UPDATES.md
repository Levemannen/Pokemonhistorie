# Choices that stay with you

## Discoveries and a map of your own

The book now has 39 scenes and 104 authored choices. Three routes have exclusive encounters: Gastly's Echo Archive, Psyduck's Reed Workshop, and Altaria's Wind-Watch Perch. Their discoveries can reveal a hidden tower route, teach another melody, bypass the observatory, or grow a star-reed garden along a lantern trail.

The travel map reveals only places actually visited in the current journey. Its lines follow the real order of decisions; unknown places stay unnamed. Selecting a footprint reads a snapshot without changing the saved story, with a button to return to the map. It supports keyboard navigation and sideways scrolling on mobile.

Puzzles now begin with an invitation to explore rather than an answer. Observations, first hints, explicit second hints, and the written version of the melody are requested separately. Companion dialogue gives questions and encouragement instead of automatically reciting solutions.

Every ending includes a personal after-story for each helped Pokémon, including friends that stayed behind. Outcomes reflect forest guarding, river guiding, nest repair, workshop projects, and the selected ending. Existing local art is reused for the new scenes; no new artwork was generated.

See [the short child playtest plan](PLAYTEST.md) for a practical next check. Browser and automated tests have been run; an actual playtest with children has not been conducted.

## Lasting consequences

- Free Pikachu and ask it to guard Moonwood: it later returns at the observatory with a new way to power the roof.
- Repair the nest: Hoothoot brings a melody that can open the waterfall door or become a song for the heart ring.
- Befriend Lapras and promise to help both Lumi and Shinx: the Moonlit Promise Trail opens. Its hidden stair bypasses the observatory and gives Lumi a special way to open the heart ring.
- Send a river reply: Lumi keeps it beside Shinx and greets you with trust.
- Plant a thank-you seed: it becomes part of the garden ending’s story.

Consequence callouts explain why a later event changed. Conversations respond to your starter, recruited friends, recent choices and location. Eevee and Pikachu can coordinate with one another.

## Interactive puzzles

The constellation grid, low/high bell melody and observatory mechanism have real input sequences, retries, reset controls, two friendly hints, and optional alternative story routes. Nothing is lost after a wrong attempt. Input, attempts and hints save automatically.

At the observatory, Bulbasaur guides vine cables, Charmander thaws gears carefully, and Squirtle fills water counterweights. Their answers and instructions differ. Bell audio is synthesized locally; written notes are also provided.

## English reading help

Tap an underlined word to open a definition beside the story. Hear individual words slowly, or choose Normal, Gentle or Extra slow narration. The selected reading pace is remembered. The full dictionary remains available from Word explorer. Narration depends on the device/browser; no paid speech service is called by the app.

## Endings and saved journeys

Every ending shows three to six small illustrated memory cards, with the choices actually made and their effects, plus a suggestion for another journey. Cards reuse existing local images. Old v1 saves and collected endings remain compatible; new journal entries store snapshots so earlier pages do not acquire future knowledge.

New AI artwork is deferred, as requested. This update changes the story and interaction; it does not replace the illustration assets.

`pnpm test` runs targeted regression checks and all-ending graph verification. `pnpm build` checks TypeScript and creates the static build.

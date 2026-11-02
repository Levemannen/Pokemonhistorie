# Lokal redaksjonell revisjon 3.0.7

Grunnlag: 3.0.6 ved 7e7413b. Gren: codex/redaksjonell-307.

## Tekstregnskap

Alle feltene nedenfor ble kontrollert mot POKEMON_306_REDAKSJONELL_PATCH.json. JSON-vedlegget er kilden til ordlyden på begge språk. Unntaket er den bestilte harmoniseringen av norske stedsnavn.

- **Hele scenetekster (nb/en)** — S04, S08, S09, S13, Q_RECONCILE, Q_ARCHIVE, Q_VILLAGE, Q_PIKACHU, Q_HOOTHOOT, Q_LAPRAS, Q_PSYDUCK, Q_BRIDGE, Q_ALTARIA, Q_GASTLY, Q_LEAD, Q_MOON2, Q_MOON3, Q_STAR, Q_MOON1.
- **Valgresponser (nbResponse/response)** — S05.1, S05.2, S06.1, S08.1, S08.2, S08.3, S09.3, S16.1, S16.2, S18.1, S18.2, S18.3, S19.1, S19.2, S19.3, S19.4, S19.5, S20.1, S20.2, S20.3, S21.1, S21.2, S22.4, S22.5, S23.1, S23.2, S23.3, S24.1, S24.2, S24.3, S24.4, S25.1, S25.2, Q_PREP.1, Q_PREP.2, Q_PREP.3, Q_PREP.4, Q_PREP.5, Q_RECONCILE.1, Q_ARCHIVE.1, Q_VILLAGE.1, Q_PIKACHU.1, Q_HOOTHOOT.1, Q_LAPRAS.1, Q_PSYDUCK.1, Q_BRIDGE.1, Q_ALTARIA.1, Q_GASTLY.1, Q_LEAD.1, Q_MOON1.1, Q_MOON2.1, Q_MOON3.1, Q_STAR.1, B_GATE.1, B_GATE.2, B_GATE.3, B_LUNALA.1, B_SOLGALEO.1, B_BOTH.1.
- **Valgknapper (nb/label)** — S05.1, S05.2, S06.1, S06.2, S08.1, S08.2, S08.3, S09.1, S09.2, S09.3, S10.1, S10.2, S10.3, S11.1, S11.2, S11.3, S16.1, S16.2, S17.1, S17.2, S17.3, S18.1, S18.2, S18.3, S19.2, S19.3, S19.4, S20.1, S20.2, S20.3, S21.1, S21.2, S22.1, S22.2, S22.3, S22.4, S23.2, S23.3, S24.4, Q_RETURN.1, Q_RETURN.2, Q_RETURN.3, Q_RETURN.4, Q_RETURN.5, Q_RETURN.6, Q_RETURN.7, Q_RETURN.8.
- **20 betingede avsnitt** — S06, S10, S12, S14, S16, S18, S20, S25.
- **Åpning og hint i valgfrie gåter** — S16, S18.
- **Eiketreet** — S09.3, to separate hint på begge språk.
- 99 navneerstatninger i manus-, ordbok- og kartimporten, deretter tre i eldre valgtekster og frøets plassering. Engelske stedsnavn beholdes i den engelske teksten.
- Sammenlignet mot grunnversjonen: 52 manusoppføringer, 117 uendrede valg-ID-er, identiske kapitler, destinasjoner, vilkår, flagg, gjenstander og alternative mål. Seks sluttvisninger kommer i tillegg.

## Visuell kontroll

53 unike malerier for ankomst og resultat gjennomgått i kontaktark. Nye lokale malerier for S03, S04, S13, S14, S25, Q_STAR og E_DAWN. S13 viser kurv, lapp og glassvekt på kabelen. Mira har grå knute og grønn kappe i de nye Mira-bildene. Q_STAR starter med løse kartbiter. S14, Q_HOOTHOOT, Q_STAR, Q_ARCHIVE, Q_MOON2 og Q_MOON3 skiller ankomstbilde fra opptjent resultat.

Begrensninger: Q_PIKACHU, Q_GASTLY og Q_ALTARIA gjenbruker stedets hovedmotiv. Illustrasjonene viser ett øyeblikk, og dokumenterer ikke hver enkelt handling eller alle mulige følgesvenner. I små bakgrunnsfigurer kan alder og ansiktstrekk ikke avgjøres entydig.

## Kontroller

- Spillmotor: 15 714 tilstandskontroller, 117 valg, 18 kombinasjoner av starter og hovedslutt, 12 bonusruter og 120 tilfeldige gjennomspillinger. Begge språk.
- Tidligere lagringer: 58 tilstander fra e99d5b4 (3.0.5) og 58 fra 7e7413b (3.0.6) gjenåpnet med de samme gjenstandene og tilgjengelige valgene.
- Kart og valgfrie gåter: 37 motortilfeller. Berøringstest av riktige og gale svar, 16 gåtehint, S08.1–3, to eikehint, rulleposisjon, språkbytte på resultatkort og gjenopptakelse.
- Hvert sideoppdrag med én handlingsknapp er kontrollert før og etter klikk. Resultatet viser belønningen én gang.
- Nettleser: 44 gjennomspillinger og 1 604 sidekontroller. Ingen fysisk Samsung-enhet ble brukt.
- Frakoblet: avbrutt nedlasting og nytt forsøk, gjenåpning, fullføring til en slutt, 58 illustrerte sider og oppdatering av lagret bok.
- Produksjonsbygg og GitHub Pages-understi testet lokalt. Ingen publisering.

## Endrede filer

- `docs/browser-qa/map/en-landscape.png`
- `docs/browser-qa/map/en-portrait.png`
- `docs/browser-qa/map/nb-landscape.png`
- `docs/browser-qa/map/nb-portrait.png`
- `docs/browser-qa/v3/ending-tablet.png`
- `docs/browser-qa/v3/offline-report.json`
- `docs/browser-qa/v3/offline-tablet.png`
- `docs/editorial-scenarios.json`
- `docs/manuscript-v3/choice-matrix.json`
- `docs/manuscript-v3/illustration-prompts.json`
- `docs/v3-fixtures.json`
- `docs/v3-routes.json`
- `package.json`
- `public/images/scenes/painted/v3-Q_STAR.jpg`
- `public/images/scenes/painted/v3-S03.jpg`
- `public/images/scenes/painted/v3-S25.jpg`
- `scripts/browser-map-puzzles.ts`
- `scripts/browser-v3-offline.ts`
- `scripts/browser-v3.ts`
- `scripts/build-pwa.mjs`
- `scripts/import-map-puzzles.mjs`
- `scripts/v3-art.mjs`
- `scripts/v3-test.ts`
- `src/App.tsx`
- `src/HistoryJournal.tsx`
- `src/StoryChoices.tsx`
- `src/artDescriptions.ts`
- `src/edition-ui-nb.json`
- `src/edition3.ts`
- `src/illustrations.ts`
- `src/journeyReview.ts`
- `src/legacyStory.ts`
- `src/manuscript-nb.json`
- `src/manuscript-v3.json`
- `src/map-markers.json`
- `src/miraMapData.ts`
- `src/nb.json`
- `src/norwegian.ts`
- `src/optional-puzzles.json`
- `src/story.ts`
- `src/v3-art.json`
- `src/v3Inventory.ts`
- `docs/redaksjonell-revisjon-3.0.7.md`
- `public/images/scenes/painted/v3-E_DAWN.jpg`
- `public/images/scenes/painted/v3-Q_STAR-result.jpg`
- `public/images/scenes/painted/v3-S04.jpg`
- `public/images/scenes/painted/v3-S13.jpg`
- `public/images/scenes/painted/v3-S14.jpg`
- `src/tree-hints.json`

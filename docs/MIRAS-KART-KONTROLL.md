# Samlet kontroll av 3.0.6, Miras kart og fire valgfrie gåter

## Utgangspunkt og leveranse

Arbeidsgrenen er codex/miras-map-optional-puzzles. HEAD ved oppstart var e99d5b4. De lokale 3.0.6-rettelsene fra forrige oppdrag var allerede til stede og er bevart. Del A i det nye dokumentet ble sammenlignet felt for felt mot gjeldende manus og stemte. Versjonen er fortsatt 3.0.6, med nytt lokalt bygg. Offlinebyggidentifikatoren er 592803ea382f6fb4.

De 52 manusscenene og 117 ordinære valgene er bevart. Denne kartleveransen legger til valgfrie undersøkelser uten nye overganger i scenegrafen. De ferdigskrevne spørsmålene, svarene, tilbakemeldingene, hintene og kartnotatene ble hentet direkte fra dokumentet. Dokumentets ytre sitattegn og Markdown-formatering behandles som formatering.

## Funksjonalitet

- Miras kart åpnes fra verktøylinjen, scenen eller sidepanelet. I S04 er det tilgjengelig etter den eksisterende innledningen, slik sceneintegrasjonen i oppdraget beskriver. Før dette vises den oppgitte teksten om at Mira ennå ikke har vist kartet.
- Kartet tegnes lokalt med SVG, pergamentfarge, elv, skog, fjell, bygninger og oppdagede stier. Berøring og rulling lar barnet utforske hele kartet. Steder har tastaturbetjente knapper. Escape lukker dialogen og gir fokus tilbake.
- Kun besøkte steder får navn. Stedsminner hentes fra den aktive historiens snapshot. Klikk på et sted endrer aldri scene. Tidligere utgaver bruker fortsatt den gamle reiseoversikten, og historiejournalen er tilgjengelig separat.
- Åtte ordinære markører følger dokumentets flagg eller gjenstander. Fire gåtemerker bruker samme kart og samme lagring.
- Løste gåter setter bare sitt eget puzzle_*_solved-flagg. Åpning, hint, gale svar og avbryting gir ingen hovedhistoriebelønning. Riktig svar vises umiddelbart. Ved senere åpning vises kartnotatet.
- Gåteflagg gjenopprettes bare når den aktuelle gåtescenen allerede er nådd. Historiske snapshots bevarer oppdagelsestidspunktet. Et nytt eventyr starter uten disse flaggene.
- Varsler om nye kartmerker kvitteres i den eksisterende flags-listen med map-seen-prefikset. Kvitteringene overlever lagring, slik at samme merke ikke varsles på nytt ved ny innlasting.

## Markører

| Sted | Kilde |
|---|---|
| Pikachus lysning | pikachu_help_sent |
| Altarias sti | marked_altaria_path |
| Brevruten fra elven | practical_letter |
| Leirplassen | map_fragment_1 |
| Observatoriets arkiv | map_fragment_2 |
| Det hemmelige stjernekartet | secret_star_map |
| Øya | moon_rune eller moon_sig_3 |
| Broen | bridge_repaired |
| Hoothoots rede | puzzle_hoothoot_solved |
| Psyducks verksted | puzzle_psyduck_solved |
| Gastlys hule | puzzle_gastly_solved |
| Observatoriets stjernehjul | puzzle_starwheel_solved |

Kartbiter kan ligge i gjenstandslisten. Mappingen kontrollerer både eksisterende flagg og gjenstander. Den gir aldri barnet noe ved å åpne kartet.

## Endrede og nye filer for kartleveransen

| Fil | Innhold |
|---|---|
| src/App.tsx | Integrasjon med eksisterende kartdialog, undersøkelsesknapper og kartvarsler |
| src/MiraMap.tsx | Visuell kartkomponent, steder, markører og historiske stedsminner |
| src/miraMapData.ts | Stedsplassering, kunnskapsregler, felles markørmapping og oppgitte mikrotekster |
| src/map-markers.json | Åtte tospråklige markørbeskrivelser fra dokumentet |
| src/mira-map.css | Kart- og gåtelayout |
| src/MapDiscoveryNotice.tsx | Engangsvarsler for nye oppdagelser |
| src/OptionalPuzzle.tsx | Felles valgfri gåtevisning |
| src/optionalPuzzles.ts | Svarlogikk og trygg gjenoppretting av gåteflagg |
| src/optional-puzzles.json | Alle fire gåter på norsk og engelsk |
| src/edition3.ts | Bevarer gåteflagg ved gjenavspilling og kartvarselkvitteringer ved lasting |
| package.json | Kobler den nye regresjonstesten til pnpm test |
| scripts/import-map-puzzles.mjs | Reproduserbar uttrekking av ferdigskrevet tekst og kontroll av del A |
| scripts/map-puzzles-test.ts | Automatiserte kart-, gåte-, lagrings- og historikktester |
| scripts/browser-map-puzzles.ts | Faktiske knappetrykk, hint, feil/riktig svar, språkbytte, kart, fokus, omstart og skjermbilder |
| docs/browser-qa/map/ | Tospråklig testrapport og skjermbilder i stående og liggende format |
| docs/browser-qa/v3/ | Oppdatert generell nettleserrapport og skjermbilder |
| docs/v3-fixtures.json, docs/v3-routes.json, docs/v3-test-report.json | Regenererte testtilstander og resultater |
| docs/MIRAS-KART-KONTROLL.md | Denne rapporten |

Den tidligere del A-listen over manusfelt og kompatibilitetsendringer står i docs/manuscript-v3/3.0.6-kontroll.md. Disse lokale endringene følger den samme arbeidsgrenen.

## Testlogg

- pnpm test ble kjørt gjennom pnpm test:full. Begge besto.
- Spillmotoren besto 15 714 tilstandskontroller, 58 spillscener inkludert sluttsidene og alle 117 valg. Testen omfatter 18 starter/avslutningskombinasjoner, 12 bonusgjennomspillinger, 120 tilfeldig valgte reiser og begge språk.
- Kompatibilitetstester for eldre utgaver besto med 102 800 tilstander, 369 tekst-/bildefixtures og 1 156 tospråklige sider i den redaksjonelle testen.
- De nye enhetstestene besto 36 kombinasjoner av kart- og gåteforhold, inkludert tre startere, begge språk, gjenoppretting, historisk tilbakehopp og synlige/usynlige markører.
- pnpm test:browser:v3 besto med 44 reiser og 1 604 sidekontroller på norsk og engelsk, uten registrerte nettleserfeil. Alle disse reisene fullførte uten å løse de nye valgfrie gåtene.
- browser-map-puzzles.ts besto med 24 svarprøver og 16 hintprøver, som dekker alle tolv svaralternativer og åtte hint på begge språk. Den tester også avbryting, gjentatt åpning, korrekt løsning én gang, lasting, språkbytte, S04, markeringsregler, Escape, fokusretur og nytt eventyr.
- Første samlede nettleserkjøring ble avbrutt av en overlappende gjenbygging av testutgaven. Den ble kjørt på nytt mot ferdig bygg. En umiddelbar fokusassert i karttesten var for tidlig i forhold til dialogens requestAnimationFrame. Testen venter nå på den faktiske fokusreturen og besto.
- Produksjonsbygget og GitHub Pages-testen besto. Bygget gir fortsatt Vites størrelsesvarsel for hovedpakken.
- Offlinekontrollen besto for alle 58 illustrerte sider, en full avslutning uten nett, gjenoppretting etter avbrutt nedlasting, kald oppstart og oppdatering med bevart lagret reise.

## Visuell kontroll og begrensninger

Skjermbilder er laget i mobilbredde, nettbrettformat og liggende format. Testene bruker Chromium/Edge-emulering. Fysisk Samsung-nettbrett og installert Android-app er ikke prøvd i denne kontrollen. Kartet har en rullbar flate med store klikkmål, slik at navnene kan være lesbare også på smale skjermer.

Ingen uløste manuskonflikter er funnet. Hele leveransen ligger lokalt for gjennomgang.

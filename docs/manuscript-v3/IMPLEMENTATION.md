# Implementasjon av manus v3

Dato: 31. oktober 2026. Autoritativ kilde: [det vedlagte v3-manuset](source.md). Kilden er bevart uendret. Produksjonsdata finnes i `src/manuscript-v3.json`; importen kan gjentas med `node scripts/import-v3.mjs`.

## Leveranse

- 52 forfatterscener: S01–S25, 17 Q-scener, seks E-scener og fire B-scener (porten og tre bonusutfall).
- 117 valg med samme ID, mål og vilkår på norsk og engelsk. Seks ekstra F-scener er tekniske avslutningssider for bokhyllen, ikke nye historier.
- Ny historiemotor for utgave 3. Eksisterende utgave 2.1 og den opprinnelige utgaven beholder sine scener, valg og lagringer. Et nytt eventyr bruker v3; et påbegynt gammelt eventyr fortsetter i sin opprinnelige utgave.
- Betingelser med AND, OR, NOT og parenteser håndheves i motoren. Den valgte knappen kontrolleres mot faktisk tilgjengelige valg. Visningsspråket påvirker aldri reglene.
- Pikachu og Hoothoot reiser bare med etter invitasjon. Senere returredning rekrutterer ikke automatisk. Psyduck teller som hjulpet én gang, selv når flere handlinger gjelder samme reparasjon.
- Varmeplan må klargjøres og godkjennes av Shinx før valg av ring. Avslutningens hendelsesrekkefølge registrerer konkret varme, samtykke, Lumis åpning og lysfrigjøring. Frøet plantes nøyaktig én gang; i Jord før frigjøring, ellers etterpå.
- Bonuser beregnes fra faktisk historie. De er utilgjengelige før hovedhistorien er fullført. Begge kvalifikasjoner uten stjernekart gir valg mellom Lunala og Solgaleo, men ikke fellesbonusen.
- Returoppdrag har separate steder og handlinger. Fullførte oppdrag fjernes. Menyen viser fire valg om gangen på små skjermer. Retur fra et tidlig besøk går tilbake før møtet med Lumi, slik at møtet ikke hoppes over.
- Årstidsgåten, sveivreparasjonen og stjernekartet er spillbare med vennlige hint. Alle startere kan løse dem. Opplesning, ordhjelp, historikk, alternative grener, bokhylle, språkvalg, enkel omstart og nettbrettoppsett er beholdt.
- Lagringer gjenskapes ved å spille av registrerte valg i motoren. Vilkårlige lagrede utstyrs- og samtykkeflagg kan ikke åpne en ellers utilgjengelig avslutning. Delvis gåteprogresjon, hint og undersøkte gjenstander bevares.

## Begrunnede tekst- og strukturtilpasninger

Det er ikke laget en forkortet versjon av fortellingen. Nedenstående tilpasninger hindrer konkrete motsetninger eller gjør redaksjonelle instrukser spillbare. Dialog og øvrig fortelling er importert fra kilden på begge språk.

| Sted | Tilpasning og begrunnelse |
|---|---|
| S01, S07 | Starterbeskrivelsene vises bare for valgt Pokémon; ellers ville teksten gitt barnet tre startere samtidig. |
| S05 | Eevees gave og Miras reservegave er alternative avsnitt, ikke begge på én gang. |
| S07, S08, S09, S12, S17 | Resultatet av redning, invitasjon, linsefunn, reparasjon eller åpnet port vises etter den relevante handlingen. Kildens tekst lå enkelte steder før valget og gjorde dermed handlingen utført også når spilleren avslo. |
| S12 | Ved valg av skisse reparerer en frivillig sammen med Psyduck. Spilleren får ikke redningsmerket uten å velge egen hjelp, men postkurven fungerer videre. |
| S15 | Replikken om å passe på en fjær før spilleren har valgt å skaffe den er erstattet med at partneren ser mot stien. Mørkebølgen beholdes. |
| S17 | Sveivmetoden har en konkret reparasjonsgåte og en kort utførelsesbeskrivelse, slik manus krever. |
| S19 / Q_RETURN / Q_PREP | Retur før S20 går til S20, ikke direkte til S22. Ellers ville spilleren møtt Shinx uten å ha møtt Lumi. Forsyningsverandaen kan også besøkes fra S19, i samsvar med tilgjengelighetsnotatet. |
| Q_RETURN | Persontransport skjer med frivillige langs merket sti, ikke i postkurven: S12 sier uttrykkelig at denne bare kan frakte brev. |
| S22, S23, Q_PREP | Teksten viser bare varmeplaner som faktisk er klargjort. Forfatterinstruksjonen om å vise bare relevante beskrivelser er gjort til kode. Ada og Bo gir de to frivillige konkrete navn, slik S22 etterspør. |
| E_SANCTUARY, engelsk | Den andre plantingen/vanningen er fjernet fra ett avsnitt. Avsnittet om å gi slipp og partnerens pote beholdes. Norsk beskriver allerede bare én planting. |
| E_SONG | Hoothoots tilstedeværelse ved elven er betinget av faktisk reisefølge; Song krever ikke Hoothoot. |
| E_GARDEN, S25 | IF/ELSE blir ekte alternative avsnitt. Felles avsluttende tekst vises uavhengig av gren. Ingen utviklermarkører vises for barnet. |
| Gåter | Konkrete knappesekvenser og hint er lagt til for oppgavene som manus beskriver, uten å endre deres belønning eller hovedrute. |
| Bokhyllen | E-scenene følges av S25 og eventuell bonus før F-siden arkiverer hele reisen. De seks avslutningene teller fortsatt som seks; bonusene er ikke tre ekstra hovedavslutninger. |

## Illustrasjoner

Alle scenesider har en lokal illustrasjon og lokal SVG-reserve. Eksisterende malerier brukes der motivet passer. Nye motiver har sceneavhengige, tydelig merkede SVG-illustrasjoner; de er **ikke ferdig generert KI-kunst**. Nye reserveillustrasjoner viser hovedpersonen stående eller i aktivitet. Tidligere malerier er ikke automatisk tegnet om.

Den komplette koblingen er i `src/v3-art.json`. [Illustrasjonsprompter](illustration-prompts.json) beskriver motiv, stil, nødvendig tilstand og ønsket positur for den senere malerirunden. Ingen bildegenerering eller betalt tjeneste brukes under spilling. Offlinepakken inkluderer de nye motivene.

## Tester

- Motor: alle 18 kombinasjoner av starter og hovedavslutning; de tre bonusene samt begge kvalifikasjoner uten stjernekart; 120 varierte gjennomspillinger. Tekst kontrolleres separat på begge språk. Se `docs/v3-test-report.json`.
- Q_PREP.4 er en defensiv reparasjon av manglende reservevarme. Normal klargjøring gir potte og reservevarme sammen, så akkurat dette valget testes med en eksplisitt delvis klargjort testtilstand.
- Nettleser: **44 komplette gjennomspillinger, 1 592 kontrollerte sider**, norsk og engelsk, bredder 320/375/820/1280. Ingen registrerte sidefeil eller testfeil. Tekst, valgoversettelser, illustrasjonslasting, lagring etter omlasting, paginering og bokarkivering er kontrollert. Se `docs/browser-qa/v3/report.json`.
- Bakoverkompatibilitet: tidligere utgave bestod 102 800 tilstander, 39 scener, 118 valg og 18 avslutningsruter; 369 tospråklige presentasjonskontroller og 26 kontinuitetsruter med 1 156 sider.
- Produksjonsbygg og TypeScript-kontroll består. Bygget varsler fortsatt om størrelsen på JavaScript-pakken; dette er en advarsel, ikke en byggfeil.
- Offlinekontrollen består: nedlastingsfeil og nytt forsøk, en hel rute til fellesbonusen med Lunala/Solgaleo uten nett, alle 58 scenesider, ny fane uten nett og appoppdatering som bevarer lagringen. Se `docs/browser-qa/v3/offline-report.json`.
- GitHub Pages-kontrollen består: bygd inngangsside og 183 ressurser fra den opprinnelige illustrasjonskatalogen lastes under `/Pokemonhistorie/`; ukjente filer gir 404. Nye v3-bilder kontrolleres separat av nettleser- og offlineprøvene.

## Gjenværende begrensninger

1. De nye SVG-motivene bør erstattes med malerier i ønsket stil. Også gjenbrukte illustrasjoner bør få en siste redaksjonell gjennomgang mot v3 før en endelig bilderunde; gamle sittende positurer er fortsatt bevart der eksisterende malerier gjenbrukes.
2. Nettbrett er testet i nettleser med ulike skjermbredder, ikke på en fysisk Samsung-enhet. Faktiske installerte opplesningsstemmer varierer mellom enheter.
3. Rutetestene er omfattende, men er ikke en uttømmende gjennomgang av alle mulige kombinasjoner av gjentatte returvalg. Menneskelig gjennomlesning og utprøving med barn er fortsatt nyttig.
4. Hele offlinepakken er omtrent 160 MiB. Den bruker lokal lagring og krever tilstrekkelig plass på enheten.

Siste produksjonsbygg: `a66c10b9631b1e55`, 238 offlinefiler, 167 428 000 byte (omtrent 160 MiB; nøyaktig størrelse finnes i `dist/offline-info.json`). Etter rydding av sluttvisningen er begge språk kontrollert på nytt på 820 piksler, inkludert dekoding av samtlige minnebilder. Tomme etterhistoriefelt og gjentatt valgtekst vises ikke lenger.

Ingen commit, push eller publisering er utført som del av denne revisjonen.

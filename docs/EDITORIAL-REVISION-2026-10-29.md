# Redaksjonell revisjon – 29. oktober 2026

## Faktisk implementert

Alle 39 hovedscener er bearbeidet på engelsk og bokmål. De 118 valg-ID-ene, destinasjonene og tilgjengelighetsvilkårene er kontrollert mot Git-utgangspunktet og bevart, med fem kapitler, tre start-Pokémon og seks avslutninger. Valgtekster og overgangsreaksjoner er gjennomlest; 50 valg har endret engelsk etikett eller reaksjon, med tilhørende norsk tekst. Ikke alle valg er ment å gi en egen avslutning: en annen ankomst, opplysning, relasjon eller konkret handling kan være konsekvensen.

### Fortelling og kontinuitet

- Åpningen viser samspill med den valgte Pokémonen før mørket kommer. Eevee introduseres før trøstevalget.
- Mira forklarer hvorfor hun fjernet kartbiten, tegner inn tårnet igjen og sender forsyninger. Hjelpernes ankomst og utpakking skjer før ringvalget. Hemmeligholdet hennes får en parallell i Lumis stengte dør.
- Hoothoots rede sikres før invitasjonen. Reparasjon uten invitasjon og hjelp fra Mira er forskjellige handlinger.
- Pikachu reddes med ulike, konkrete handlinger for hver start-Pokémon. Lys som strammer eføyen, skjermes først. Hjelperne får æren når barnet velger å varsle dem. Vaktbesøket i observatoriet er adskilt fra rekruttering.
- Brevet driver nedover; svaret sendes oppover med en beskrevet, vannhjulsdrevet postkurv. Hoothoot er valgfri og blir ikke en oppdiktet budbringer.
- Gastly savner besøk. Den svever foran barnet til arkivet. Astronomens gamle bok og Lumis nyere notat er to dokumenter.
- Det gamle treet åpner først etter valget. Lønnen gir et vingefrø som holdes adskilt fra sølvfrøet.
- Lapras reddes bare én gang. Ferge- og verkstedvalgene forteller hvordan gruppen når øya. Psyduck får vise ferdigheter og gradvis mestring.
- Øyminnet viser fortiden, ikke Shinx’ nåværende helse. Lumi får navnet sitt gjennom Shinx’ replikk. Stemmen ved døren gir den første bekreftelsen på hvordan han har det nå.
- De to gule skjerfene, Miras reserveskjerf, fotografiet, tilbakeleveringen og vinduet ved den lukkede døren er avklart.
- Altaria samler alle ungene før flyging. På gå-ruten finner hun sistemann selv. Observatorium, takvei og tjenestegang leder til samme tårnrom.
- Lumi er handlekraftig, redd og sliten. Shinx har humor og egne ønsker. Tidligere løfter, brev, poteavtrykk og Pikachus tegning får konkrete reaksjoner.
- Varmen er klar før åpningen. Ingen melodi helbreder Shinx. Hageavslutningen slipper lyset ut én gang; elvehage og landsbyhage har ulike avsnitt, frøplasseringer og inventarnotater.

### Språk og programkode

`src/manuscript-v2.json` bruker nå ordnede avsnitt med stabile ID-er og betingelser. `src/manuscript-nb.json` bruker de samme avsnitts-ID-ene og valg-ID-ene, i stedet for posisjonelle lister. Historien avhenger ikke lenger av at en bestemt lang engelsk setning finnes for at en runtime-`replace` skal virke.

Rettet blant annet de unaturlige norske huleinngangene, sammenlimingen `receiverholds`/`helpersholds`, tekniske kommentarer til leseren, gjentatt frigjøring av lyset og feil plantested. Engelsk bruker amerikansk rettskriving; norsk bruker bokmål. Hovedtekst, valg, reaksjoner og betingede avsnitt er skrevet på begge språk.

Nettlesertesten fant også at norsk «Fire stier» kunne bli tolket som engelsk «fire» ved en ny runde gjennom UI-ordboken. Ferdigskrevet, lokalisert fortellertekst markeres nå som ferdig, og en regresjonstest kontrollerer at den ikke endres ved etterfølgende oversettelse. UI-ordboken og den eldre utgaven beholdes; de brukes ikke til å velge historieavsnitt i 2.1.

Historikk bruker stabile valg-ID-er for reviderte etiketter. Illustrerte sluttminner beregner valgreaksjonen fra tilstanden etter det aktuelle valget, ikke fra sluttens samlede kunnskap. Løftet til Lapras og løftet på øya kan begge huskes selv om det gamle `promise`-feltet overskrives.

Lagringsformatet er fortsatt 2.1. To presise rettelser ved innlasting bygger på dokumenterte valg: `hill.3` markerer redet som sikret; etter `lumi.2` regnes brevet som overlevert. Historiske øyeblikksbilder før valgene endres ikke. Lagringer uten `world` fortsetter i den eldre motoren.

### Gåter, følgesvenner og tilgjengelighet

De tre aktive gåtene i 2.1 beholdes: soppmønster, fossmelodi og start-Pokémonens mekanisme. Hovedteksten røper ikke lenger løsningene på forhånd. Observasjon, første hint og tydelig løsningshint er fortsatt tilgjengelige, sammen med alternative veier. Feilforsøk har egne vennlige reaksjoner. Fossens hint kjenner nå også melodikunnskapen fra 2.1.

De fem øvrige gåtene beholdes for gamle reiser. De rapporteres ikke som nye, nåbare 2.1-ruter. Følgesvennpanelet har konkrete scene- og handlingsavhengige replikker, inkludert en samtale mellom Hoothoot og Pikachu ved fossen.

På skjermer på høyst 360 piksler kan toppnavigasjonen bryte over flere rader. Dette retter norsk navigasjon som ellers stakk utenfor en 320-pikslers skjerm, uten å gjøre berøringsknappene mindre.

## Kontrollmateriale

- `STORY-CANON.md`: felles verdensregler, geografi, personkunnskap, gjenstander og sluttsteder.
- `editorial-choice-matrix.json`: alle 118 valg med vilkår, lagrede effekter, umiddelbar reaksjon og mulige betingede oppfølginger. Oppfølgingene er en teknisk referanse, ikke et løfte om at hvert avsnitt alltid vises etter valget.
- `editorial-scenarios.json`: 26 komplette kontrollruter, inkludert A–Y fra bestillingen og en ekstra rute med begge løftene. Inneholder faktisk rendret tekst og bildevalg på begge språk.
- `exports/storyline-review-v2.1/index.html`: lesbar eksport med alle scener, alle betingede avsnitt og 36 komplette reiser (tre start-Pokémon × seks avslutninger × to språk).

## Bilder: vurdert, men ikke generert på nytt

**Senere samme dag:** En egen [bilderunde](ART-REVISION-2026-10-29.md) har nå oppdatert åtte illustrasjoner for avvikene nedenfor. Avsnittet under beskriver status før denne bilderunden.

Eksisterende malerier og startervarianter er bevart. Automatisk kontroll verifiserer lokale, malte bilder for de testede tilstandene. Kontaktarkene er visuelt gjennomgått. Dette betyr ikke at alle detaljer i de eksisterende maleriene er identiske med det reviderte manuset.

Konkrete behov for en senere bilderunde:

1. **Hulen:** det eksisterende maleriet viser en oppslått bok med Lumi og Shinx; teksten handler nå om en gammel veggtegning av ringene. Dette er det tydeligste gjenværende bildeavviket. Behold stil, barn og hulemiljø; erstatt boken med veggdiagrammet, uten å foregripe ulykken.
2. **Skjerf og tårndør:** navn, plassering inne ved vinduet og de to separate skjerfene er ikke konsekvent synlige i eldre bilder.
3. **Takveien:** manusets støtter og rekkverk bør være tydeligere i bildet av de lysende steinene. Tårnets og observatoriets innbyrdes plassering varierer også noe mellom bildene.
4. **Gastly/arkivet:** enkelte bilder viser flere Gastly, mens teksten følger én. Et senere detaljpass kan samle motivet rundt denne ene historiefortelleren.
5. **Postkurven:** bekkeillustrasjonen viser flaskefunnet, men ikke den nye postmekanismen. Et alternativt bilde av svarhandlingen vil gjøre konsekvensen mer synlig.

Ingen gode malerier er byttet ut med generiske bilder eller SVG. Det er ikke kjørt bildegenerering i denne revisjonen.

## Begrensninger

Litterær og språklig gjennomlesning er utført under implementeringen, fulgt av kontinuitetsruter og nettleserkontroll. Automatiske tester beviser ikke at alle mulige kombinasjoner er litterært perfekte. En fysisk Samsung-test og høytlesning med et barn vil fortsatt være nyttig. Taleprøven bruker simulerte nettleserstemmer og bekrefter koblingen, ikke kvaliteten på en faktisk norsk systemstemme.

Produksjonsbygget gir fortsatt en advarsel om størrelsen på JavaScript-pakken. Full lokal bildenedlasting er omtrent 159 MB. Dette er eksisterende størrelsesbegrensninger, ikke behov for betalte tjenester. Ingenting er committet, pushet eller publisert automatisk.

## Endelige testresultater

| Kontroll | Bekreftet resultat |
|---|---|
| `pnpm test:full`, 29. oktober | Bestått fra start til slutt |
| Historiegraf | 102 800 tilstander; 39 scener og 118 valg; seks avslutninger for hver start-Pokémon |
| Presentasjon og språk | 369 tilstandseksempler på begge språk; oversettelsesfelt, valgknapper, inventar, sluttminner og malte bilder |
| Redaksjonelle kontrollruter | 26 ruter; 1 156 sider på to språk; tilbakeblikk, gjenstander, løfter, varmekilder, plantesteder og lagringsrettinger |
| `browser-quality.ts`, 29. oktober | 36 komplette nettleserreiser; 736 sider; norsk og engelsk; bredder 375, 768 og 1440; ingen rapporterte feil |
| `browser-tools.ts`, 28. oktober | Ord- og valghjelp, historikk, forgrening/gjenoppretting, inventar, språkbytte, ni gåteeksempler, bilde-reserve og blokkert lagring bestått |
| Smale skjermer, 28. oktober | 156 visninger (39 scener × fire bredder), inkludert 320 piksler og ekstra stor skrift; overflyten rettet og ny kjøring bestått |
| `browser-tablet.mjs`, 28. oktober | 64 berørings-/nettbrettvisninger, begge språk, rotering og historikk bestått |
| `browser-legacy.ts`, 29. oktober | Gammel utgave fortsetter; ny start, originalkopi og nøyaktig gjenoppretting bestått |
| `browser-narration.mjs`, 29. oktober | Språk, uttalehastighet, stopp ved sideskifte, feilmelding og norsk reiseeksport bestått med simulert talemotor |
| `browser-pwa.ts`, 29. oktober | Installasjonsmanifest, mislykket nedlasting med nytt forsøk, faktisk slutt gjennomført offline, 42 illustrerte offline-visninger og oppdatering som bevarer lagring |
| Produksjonsbygg / Pages | Bestått; 183 lokale ressurser lastet under `/Pokemonhistorie/`; ukjente ressurser gir 404 |
| Gjennomgangseksport | 39 scener, 118 valg i matrisen, 36 reiser og 43 lokale malerier |

Testkjøringen fant og førte til retting av en manglende norsk verkstedovergang, dobbel oversettelse av «Fire», mobiloverflyt og typefeil i nye test-/eksportfiler. Rutesøket i selve kontinuitetstesten fikk mellomlagring for å unngå å undersøke samme delgraf om igjen. Den lokale forhåndsvisningen måtte startes på nytt etter øktavbruddet; nettleserprøvene ble deretter kjørt på nytt og bestod.

Byggversjon ved levering: `3cc8a1d782348cdf`. Rapportene ligger i `docs/browser-qa/`; oppdaterte eksportfiler ligger i `exports/storyline-review-v2.1/`. Eksportmappen er med vilje Git-ignorert fordi den inneholder kopier av maleriene; `pnpm export:story` gjenskaper den.

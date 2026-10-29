# Revidert historie 2.1

**Redaksjonell revisjon 29. oktober 2026:** Se [sluttrapporten](EDITORIAL-REVISION-2026-10-29.md) og [historiens kanon](STORY-CANON.md). Fortellerteksten bruker nå navngitte, betingede avsnitt og ID-baserte norske oversettelser. Den opprinnelige ZIP-utgaven nedenfor er historisk kildemateriale.

Kildemanuset fra den gjennomgåtte ZIP-filen er bevart uendret i `docs/manuscript-v2.1`. Spillets versjon ligger i `src/manuscript-v2.json`, med stabile valg-ID-er. Full norsk tekst ligger i `src/manuscript-nb.json`. Tekst, bilder, oversettelser og lagring fungerer lokalt uten API-er.

## Historie og tilstand

- 39 scener, 118 valg, fem kapitler og seks avslutninger. Alle avslutninger er tilgjengelige med alle tre start-Pokémonene.
- Valget gir først en konkret reaksjon, deretter sceneteksten. Flere relevante reaksjoner fra Lumi og vennene vises sammen inne i scenen.
- `world` har utgavenummer 2.1, gjenstander, brukte gjenstander, kunnskap, relasjoner, lokale venner, reisefølge, ankomstmåte og siste valg-ID. Kunnskap legges til; vanlige statusfelt overskrives eksplisitt.
- Hver historikkoppføring tar et øyeblikksbilde før valget. Forgrening, historikk og illustrerte minner bruker dette bildet, slik at senere funn ikke følger med bakover.
- Bare uttrykkelig inviterte Pokémon blir reisefølge. Lapras blir på elven. Pikachu kan besøke observatoriet uten å bli reisefølge.
- Sølvfrøet gis ved starten og forlater inventaret én gang i avslutningen. Reserveskjerfet og Shinx sitt skjerf er forskjellige gjenstander. Rune krever soppgåten. Fjær krever besøket hos Altaria. Et brukt tau kan fortsatt bæres.
- Alle ruter passerer øya, Lumi, forklaringen og ringplanen. Ingen musikk helbreder Shinx alene; varme og videre omsorg må være klare.

## Bevaring av eldre reiser

Lagringer uten `world.edition` fortsetter i den tidligere historiemotoren, med tidligere valg og gåter. Gamle flagg gjøres ikke om til nye fakta. Ved omstart fra gammel utgave beholdes originalreisen, med knapp for å vende tilbake. Ugyldige eller ukjente tilstandsskjemaer godtas ikke som den nye utgaven.

## Redaksjonelle rettelser

- Erstattet «if chosen», «if traveling» og generelle ruteinstruksjoner med faktisk start-Pokémon, reisefølge og ankomst.
- Fjernet påstand om at andre i laget kom en annen vei ved serviceinngangen.
- Svaret fra bekken krever ikke en Hoothoot som aldri ble invitert.
- Lumi-navnet fra øyminnet kan ikke gjøre teksten om et tidligere spørsmål til Mira sann med tilbakevirkende kraft.
- Hageavslutningen frigir ikke stjernelyset to ganger. Elvehagevalget ender ved elvekanalen.
- Tilfluktsstedets varmekilde følger valgt ring; sangavslutningens varme følger himmel-/hjerteveien.
- Fjernet kommentarer om teleportering og «et uforklart andre tårn» fra leserteksten.
- Den norske utgaven gjengir hele historien i naturlig bokmål med samme valg og konsekvenser.

## Illustrasjoner

Eksisterende malte illustrasjoner beholdes. Varianter for Pikachus besøk, Altarias flokk, svarbrevet, elvelykter, elvehagen og Charmanders varme bruker den nye tilstanden. Lapras kan vises ved øyas bredd etter skyss, men blir ikke reisefølge. Det tidligere bildet med en magisk rotforbindelse til skogen brukes ikke i den nye utgaven.

**Bildearbeid fullført 28. oktober 2026:** Fjellryggen har nå egne malte bilder for Bulbasaur, Charmander og Squirtle. De to nye bildene er laget med innebygd image_gen og lagret lokalt. SVG brukes bare som reserve ved lastefeil. Promptene er dokumentert i `ridge-image-prompts.json`.

## Kontroll og eksport

`pnpm test` kontrollerer den nye motoren, lagring, historiske tilstander, norsk dekning, faktisk gjengivelse av valg og lokale bildefiler. Eldre testskript er beholdt som historisk materiale; flere av dem beskriver den gamle historiens valg og skal ikke brukes som godkjenning av 2.1.

`pnpm test:full` kjører disse kontrollene, bygger nettstedet og tester lokale ressurser under GitHub Pages-undermappen. Nettleserskriptene tester ruter, verktøy og opplesningskobling separat. Opplesningsprøven bruker en simulert stemmemotor og vurderer ikke kvaliteten på installerte stemmer. Mobilstørrelser testes i Edge, ikke på fysiske iOS-/Android-enheter.

`pnpm export:story` lager en lokal HTML-gjennomgang, alle valg og betingelser, Mermaid-tre og 36 komplette norsk/engelske eksempelreiser med lokale bilder i `exports/storyline-review-v2.1`.

Oppdateringen publiserer ikke automatisk til GitHub. Eksisterende Pages-oppsett brukes ved senere innsjekking og opplasting.

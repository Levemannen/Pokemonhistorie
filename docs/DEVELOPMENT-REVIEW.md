# Utviklingsrapport – 27. oktober 2026

**Oppdatert nettleserkontroll:** En senere kontroll samme dag fikk gjennomført testene med separat Edge-nettleser. 36 fullstendige reiser og 156 layouttilstander passerer. Gjentatte samtalefelt og foreldet redningsdialog er rettet. Se [ny kvalitetsrapport](QUALITY-CONTROL-2026-10-27.md); den erstatter den tidligere begrensningen om at nettlesertesting ikke kunne gjennomføres. Fysiske mobilenheter, ekte stemmekvalitet og skjermleser gjenstår fortsatt.

Arbeidskopien inneholder 39 scener, 105 valg, fem kapitler og seks hovedavslutninger. Den er ikke publisert eller pushet til GitHub i denne arbeidsrunden.

## Viktigste endringer

- Åpningen etablerer den valgte Pokémonens usikkerhet før trøstevalget. Miras svar, Hoothoots vitneforklaring og overganger gir en tydeligere grunn til reisen.
- Alle 105 valg har egne handlingsresultater. Kart, brev eller arkivkunnskap kreves for hulen; generell nysgjerrighet er ikke nok. Landsbyforslaget åpner en egen løsning senere.
- Lumi anerkjenner flere samtidige handlinger. Shinx får medbestemmelse. Skjerfenes eierskap, Lapras' plass i elven og Pikachus selvstendige vei ut av eføyen er forklart.
- Åtte frivillige oppgaver har gjentatte forsøk og gradvise hint. Gjenstander kan undersøkes, og undersøkt stjernestøv sammen med relevant kunnskap gir en særskilt løsning.
- Historikken kan brukes til å prøve et tidligere veiskille med en separat sikkerhetskopi av originalreisen. Reisen kan lastes ned som tekst.
- Samtaler, forklaring av tidligere konsekvenser og refleksjon er frivillige utvidelser. Ingen tvungne kapitteloppsummeringer er satt tilbake.
- Norsk/engelsk velges øverst i boka og kan byttes underveis. Fortelling, valg, gåter, dialog og verktøy oversettes lokalt; språkvalg lagres. Engelske ord og eksempelsetninger beholdes i læringsheftet. Opplesning velger språk etter lesemodus og bruker nettleserens stemmer.

## Bekreftede feil rettet

| Feil | Løsning |
|---|---|
| Konkrete handlinger kunne forsvinne i neste sides tekst | Egne ankomstresultater og ny sammenstilling av scenetekst |
| Flere Lumi-reaksjoner konkurrerte om samme tekstvariant | Modulære reaksjoner for løfte, skjerf, svar og privatliv |
| Generell innsikt kunne fungere som geografisk spor | Eksplisitt krav til kart, brev eller arkivkart |
| Landsbyforslaget manglet en tydelig senere vei | Eget tilgjengelig valg i planleggingsscenen |
| Lapras kunne omtales som fysisk reisefølge utenfor elven | Stedsavhengig dialog og korrekt epilogetikett |
| Ny språktilpasning fjernet dynamisk sideinnhold | Rettet feil bruk av TypeScripts JSX-oppdatering; komponenter gjenopprettet; gjengivelsestester for valg, kart, gåter og samtaler |
| Norsk lesemodus viste hjelpetekst om å trykke på et engelsk valg | Hjelpen følger valgt språk og kan vise det engelske originalvalget |
| Engelske eksempelsetninger ble oversatt i ordheftet | Ord, definisjoner og eksempler beholdes på engelsk med norske betydninger |
| Retur til originalreisen kunne gjeninnføre et eldre språkvalg | Gjeldende lesespråk følger gjenopptakelsen |

## Status for de 100 punktene

«Fullført» gjelder den konkrete implementasjonen, ikke et bevis på at alle mulige fortolkninger eller bildevarianter er perfekte. «Allerede på plass» betyr at funksjonen var i arbeidskopien og er beholdt/testet. Delvise punkter er ikke regnet som ferdige.

| Nr. | Status | Resultat / avgrensning |
|---:|---|---|
|1|Fullført|Frykt introdusert før trøst, synlig reaksjon etterpå.|
|2|Fullført|Mira forklarer halvmånemerket og tårnhagen.|
|3|Fullført|Landsbyplan gir et eget senere valg.|
|4|Fullført|Shinx uttrykker behov og påvirker planlegging.|
|5|Fullført|Stjernestøv gir dialog og en undersøkt-kunnskap-kombinasjon.|
|6|Fullført|Pikachus redning og ruter uten redning har ulike forklaringer.|
|7|Fullført|Hulen krever relevante konkrete spor.|
|8|Fullført|Privatlivsløftet anerkjennes av Lumi.|
|9|Fullført|Skjerfenes eierskap og felles opphav forklares.|
|10|Fullført|Samtidige Lumi-flagg får egne reaksjoner.|
|11|Fullført|Planting og flytende lykter kan begge omtales.|
|12|Fullført|Lapras skilles fra fysisk reisefølge.|
|13|Fullført|Festivalen avbrytes når stjernene slukner.|
|14|Fullført|Mira gir en personlig og forståelig oppgave.|
|15|Fullført|Frø, varme og sfære forklares gjennom flere oppdagelser.|
|16|Fullført|Mira er veileder med begrenset kunnskap.|
|17|Fullført|Kart gir konkret tilgang og senere kunnskap.|
|18|Fullført|Hoothoot beskriver lyssporet og melodien.|
|19|Fullført|Planter, flamme og vann gir ulike starteropplevelser.|
|20|Fullført|Det første valget får umiddelbart handlingsresultat.|
|21|Fullført|Frivillig redningsoppgave med startertilpasset hjelp.|
|22|Fullført|Gastlys ensomhet og lek gir motivasjon.|
|23|Fullført|Arkivoppgave om stjerner, sfære og frø.|
|24|Fullført|Treets gåte har konkret riktig/feil-reaksjon.|
|25|Fullført|Alternative svar og ubegrensede nye forsøk.|
|26|Delvis fullført|Skogens respekt- og vennlighetsreaksjoner er styrket; ingen uttømmende magiregelmodell.|
|27|Fullført|Tidlig Pikachu-hjelp påvirker senere muligheter.|
|28|Allerede på plass|Redet gir Hoothoot-hjelp og melodispor.|
|29|Fullført|Tau, nøkkel og planting har forskjellige bruksområder.|
|30|Fullført|Lapras har stedstilknyttet motivasjon og dialog.|
|31|Fullført|Psyduck får økt trygghet gjennom fergeoppgaven.|
|32|Fullført|Fergen har en interaktiv sikkerhetsrekkefølge.|
|33|Allerede på plass|Tauet brukes konkret ved kryssingen.|
|34|Fullført|Melodikunnskap kan påvirke senere løsning og avslutning.|
|35|Fullført|Notater og diagram forklarer varmemekanismen.|
|36|Fullført|Minneøya viser Lumis hjelp til Shinx.|
|37|Fullført|Løftet åpner rute og får reaksjoner senere.|
|38|Fullført|Lysprikken kan undersøkes og brukes som varm nattlampe.|
|39|Delvis fullført|Trygge avveininger og oppgaver gir spenning; ingen større ny fjellsekvens.|
|40|Fullført|Bro, trapp, fjell og skyplattform har ulike handlinger/overganger.|
|41|Fullført|Fugleflokken balanseres på skyplattformen.|
|42|Allerede på plass|Fjær, skål og samtale gir ulike oppdagelser/reaksjoner.|
|43|Delvis fullført|Observatoriets rolle og mekanikk er tydeligere; ingen ny sceneutvidelse.|
|44|Fullført|Startertilpassede mekanismer og valg i observatoriet.|
|45|Fullført|Den hemmelige ruten gir eget varmediagram/kunnskap.|
|46|Fullført|Stemmen bak døren og skjerftegningen bygger forventning.|
|47|Fullført|Lumi viser frykt, skyld og håp gjennom handling/dialog.|
|48|Fullført|Shinx deltar i valg om trygghet og fremtid.|
|49|Fullført|Sikkerhetslås og erstatningsvarme forklarer sfæren.|
|50|Fullført|Konkret kunnskap åpner særskilte løsninger.|
|51|Fullført|Himmel, hjerte og jord har forskjellige virkemåter.|
|52|Fullført|Hjemreise, fellesskap, omsorg og dyrking gir ulike ettervirkninger.|
|53|Fullført|Alle avslutninger forklarer trygg varme for Shinx.|
|54|Fullført|De opprinnelige stjernenes skjebne forklares, også i hagen.|
|55|Delvis fullført|Klimakset har flere reaksjoner og tydeligere sammenheng; redaksjonell prøvelesing gjenstår.|
|56|Fullført|105 konkrete handlingsresultater.|
|57|Delvis fullført|Flere langsiktige konsekvenser; noen valg har fortsatt bare umiddelbar/historisk betydning.|
|58|Fullført|Felles destinasjoner får forskjellige ankomster.|
|59|Fullført|Løfter, kunnskap og undersøkt minne gir kombinasjonseffekter.|
|60|Fullført|Tre ulike evneprofiler i ruter, dialog og oppgaver.|
|61|Fullført|Squirtle har egen vanningsvariant i hageavslutningen; særskilt maleri mangler.|
|62|Fullført|Kontekstuelle samtaler og hjelp fra venner.|
|63|Fullført|Pikachu kan bli igjen og komme tilbake; Lapras blir i elven.|
|64|Fullført|Redning, rede og løfter knyttes til senere hjelp.|
|65|Fullført|Undersøkelse av eide gjenstander med lagret oppdagelse.|
|66|Fullført|Undersøkt stjernestøv og relevant kunnskap gir unik løsning.|
|67|Fullført|To gradvise hint per oppgave.|
|68|Fullført|Frivillige oppgaver, hint, nye forsøk og alternative veier.|
|69|Fullført|Barnet velger selv eller ber Pokémonen om hint.|
|70|Fullført|Veiskillekopi med bevart originalreise og returknapp.|
|71|Allerede på plass|Alle seks avslutninger bruker egne lokale malerier.|
|72|Delvis fullført|Startervarianter brukes der de finnes; delte miljøbilder er fortsatt bevisste.|
|73|Delvis fullført|Betingede malerier finnes; ikke alle mulige følgegrupper er malt.|
|74|Allerede på plass|Sentrale gjenstander er synlige i relevante bilder.|
|75|Fullført|Løst redningsoppgave bytter til frigjort Pikachu-motiv.|
|76|Delvis fullført|Lumi har ulike situasjonsbilder; ikke alle følelseskombinasjoner har egne bilder.|
|77|Delvis fullført|Kontaktark gjennomgått og bildekoblinger testet; full visuell kontinuitetsgaranti gis ikke.|
|78|Delvis fullført|Himmelens narrative regler er rettet; alle lysprikker i maleriene er ikke individuelt verifisert.|
|79|Delvis fullført|Ny Charmander/nordlys-variant; egen Squirtle/hage-variant ikke produsert.|
|80|Fullført|Scene- og variantspesifikke alternativtekster.|
|81|Fullført|Møtte ord får egen markering og lagres i ordheftet.|
|82|Fullført|Frivillige refleksjonsspørsmål ved kapittelovergang og slutt.|
|83|Delvis fullført|Kort hovedtekst og frivillige utdypinger; ingen separat enklere engelsk versjon.|
|84|Fullført|Opplesning av hovedtekst, dialog, valg og setninger.|
|85|Allerede på plass|74 ord med norsk betydning og langsom uttale.|
|86|Allerede på plass|Bokhylle, avslutninger og kart over besøkte steder.|
|87|Fullført|Frivillig forklaring av opplevde konsekvenser og tilgjengelige ruter.|
|88|Fullført|Reisevenner, elvevenn og besøkende skilles.|
|89|Fullført|Gjenstander viser opphav, bruk og oppdagelser.|
|90|Fullført|Tekstnedlasting av egen reise på valgt språk.|
|91|Delvis fullført|Alle valg har resultattekst og kjente kontrakter testes; ingen automatisk semantisk garanti for hvert mulig forløp.|
|92|Fullført|Kombinasjonstester for Lumi, hager og særskilte løsninger.|
|93|Fullført|Lokale bildefiler, varianter, reservebilder og bokstavstørrelse testes.|
|94|Fullført|Alle tre startere testes for valg, oppgaver, tekst og bildekoblinger.|
|95|Fullført|Lagring midt i oppgaver og gjennom 18 avslutningsruter testes.|
|96|Delvis fullført|Språk, avbrudd og feilhåndtering testet med testmotor i nettleser; ekte mobilopplesning gjenstår.|
|97|Delvis fullført|Fokus, Shift+Tab og Escape testet i nettleser; faktisk skjermleser ikke testet.|
|98|Delvis fullført|Alle 39 scener testet ved 320–1280 piksler, pluss reiser ved 375–1440; fysiske enheter gjenstår.|
|99|Fullført|Automatisk konsekvensrapport med begrensninger.|
|100|Fullført|18 reelle ruter: seks avslutninger med alle tre startere, pluss variasjonskontrakter.|

## Illustrasjoner

Alle 39 scener har lokale malerier og fungerende SVG-reserver. `endAurora-charmander.png` er ny, med varmende Charmander på trygg stein ved Shinx. Manifestet velger den bare for riktig avslutningshandling. Redningsoppgaven skifter til frigjort Pikachu-motiv når den løses.

Forsøket på en egen Squirtle/hage-illustrasjon ble avvist av bildegeneratoren; eksisterende ferdigmalte hagemotiv beholdes. Det er ikke registrert som et nytt bilde. Prompter og status ligger i `ending-variant-prompts.json`. Alle følge-/starterkombinasjoner har ikke egne malte bilder.

## Testgrunnlag og begrensninger

- Grafkontroll: 48 907 dedupliserte tilstander med fremtidsrelevante forskjeller; 39 scener og 105 valg. Dette er ikke en opptelling av alle komplette historier.
- 18 representative avslutningsruter spilles gjennom den faktiske motoren og lagres/gjenopprettes.
- 40 oppgave-/kombinasjonskontrakter. Syntetiske kombinasjoner regnes ikke som reelle spillruter.
- 10 580 tekst-/illustrasjonskombinasjoner og 10 608 språkkontroller. Engelske restord oppdages med en heuristikk; det erstatter ikke norsk språkvask av hvert mulig sammensatt avsnitt.
- Komponenttester kontrollerer gjengitt innhold i valg, oppgaver, kart, samtaler og ordhefte. Bygg og HTTP-kontroll under `/Pokemonhistorie/` kontrollerer lokale publiseringsfiler.
- Konsekvensrapporten finner 84 produserte flagg. 12 brukes bare gjennom egenskapsterskler; andre er historikk/umiddelbare reaksjoner. Rapporten beviser ikke litterær kvalitet.
- Nettleserverktøyet feilet ved oppstart med «trusted Node process exited unexpectedly». Derfor er faktisk mobilvisning, stemmekvalitet og skjermleseroppførsel fortsatt manuell kontroll.

## Anbefalt neste gjennomgang

1. Prøveles et par forskjellige ruter med barn i målgruppen, på begge språk.
2. Test Safari/iOS og Chrome/Android for stemmer, setningslesing, fokus og smale skjermer.
3. Prioriter manglende Squirtle-hagebilde og kontinuiteten i nattehimmelen før flere kosmetiske varianter.
4. Bruk den oppdaterte tredjepartseksporten til redaksjonell vurdering av de delvise punktene.

Ingen backend, betalt API, nettbasert oversettelse eller bildegenerering brukes under spilling.

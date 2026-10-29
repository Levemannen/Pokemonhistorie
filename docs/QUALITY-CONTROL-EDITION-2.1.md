# Kvalitetskontroll – revidert utgave 2.1

Nyere revisjon og testresultater: [29. oktober 2026](EDITORIAL-REVISION-2026-10-29.md). Tallene nedenfor beskriver tidligere kjøringer.

Dato: 27. oktober 2026. Gjelder det gjennomgåtte nye manuset, ikke tidligere utgaver.

**Oppdatering 28. oktober:** De to fjellryggbildene som er nevnt som gjenstående nedenfor, er nå laget og koblet inn. Alle tre start-Pokémonene har eget maleri på fjellryggen. Presentasjonskontrollen for 293 tilstander på begge språk består nå med krav om maleri i samtlige tilstander. Bygg og Pages-kontroll består med 181 lokale ressurser. De opprinnelige avgrensningene nedenfor er historikken fra 27. oktober.

## Bestått

| Kontroll | Resultat |
|---|---|
| Historiegraf med tilstand | 102 800 fremtidsrelevante tilstander, alle 39 scener og 118 valg nåbare |
| Avslutninger | Seks avslutninger for hver av tre start-Pokémoner; 18 lagrede bevisruter |
| Nødvendig forklaring | Alle kontrollerte sluttilstander har besøkt øya, Lumi, forklaringen og ringplanen |
| Tilstand | Ingen overgang endrer forrige tilstand; historikken lagrer øyeblikksbildet før valget; ingen forbruk av manglende gjenstand |
| Lagre og forgrene | Gjenoppretting bevarer ny verden og tidligere øyeblikksbilder; eldre utgave holdes separat |
| Norsk dekning | Alle 39 scenetekster, titler, 118 valg med reaksjoner og samtlige manusvarianter har lokale norske felt |
| Presentasjon | 293 faktiske scene-/ankomst-/varianttilstander undersøkt på begge språk; ingen uløste tekstmarkører; valg, inventar, epilog og bildefiler kontrollert |
| Nettleserreiser | 36 komplette reiser, 736 sidevisninger, begge språk og tre skjermbredder; riktig avslutning, tekst, bilde og lagring etter omlasting |
| Lesestøtte | Valgoversettelse uten navigasjon, lagring av ord, ordhjelp, språkbytte, tekststørrelse, lesemodus, dialogfokus og tastaturlukking |
| Gåter | Ni kombinasjoner: tre gåter × tre start-Pokémoner; feil svar, hint, omlasting midt i gåten og riktig løsning |
| Smale skjermer | 156 isolerte oppsett: alle 39 sider ved 320, 390, 768 og 1280 piksler, ekstra stor tekst; ingen horisontal sideoverflyt |
| Feilhåndtering | Manglende maleri viser merket lokal SVG; blokkert lagring varsles mens lesingen kan fortsette |
| Opplesning | Simulert stemmemotor bekrefter språk, sakte orduttale, stopp ved sideskifte, synlig feilmelding og norsk historieeksport |
| Gammel utgave i nettleser | Gammel lagring fortsetter med gamle valg; ny start beholder originalen; tilbakeknappen gjenoppretter den nøyaktig |
| Bygg og Pages | Typekontroll og produksjonsbygg bestått; indeks og 179 lokale ressurser tilgjengelige under `/Pokemonhistorie/` |
| Gjennomgangseksport | 39 scener, alle betingelser og effekter, trestruktur og 36 komplette eksempelreiser med 43 lokale bildevarianter |

Resultatfiler: `edition-v2-verification.json`, `edition-v2-fixtures.json` og rapportene i `browser-qa/`.

## Feil funnet og rettet under kontrollen

- Ny lagring mistet ellers `world` og stabile valg-ID-er.
- Historisk gjenlesing og forgrening kunne ellers få med seg fremtidige fakta.
- Et navn lært på øya gjorde feilaktig et tidligere spørsmål til Mira til et faktum.
- Hageavslutningen frigjorde lyset to ganger; elvehagevalget pekte på feil plantested.
- Rute- og følgesvennforbehold i manuset ble vist som redigeringskommentarer.
- Flere bildevarianter brukte gamle flaggnavn og ville ikke reagere på de nye valgene.
- Ordhjelpen kunne lukkes straks av automatisk rulling på lengre sider. Den følger nå det synlige ordet og lukkes når ordet forlater skjermen.
- Opplesningstesten sjekket feilmeldingen før React hadde vist den; testen venter nå på den synlige meldingen.

## Avgrensninger og gjenstående arbeid

Det er **to kjente SVG-kombinasjoner**: fjellryggen med Bulbasaur eller Squirtle. Det malte bildet for denne scenen viser Charmander. Reservebildene er merket og skjules ikke som ferdig KI-kunst. Nye malerier er ikke laget i denne oppdateringen.

Automatiske bildesjekker bekrefter valg av fil og at den finnes, ikke full kunstnerisk eller semantisk korrekthet i alle detaljer. Mobilkontroll bruker skjermbredder i Edge, ikke fysiske telefoner. Taleprøven undersøker kobling og feil, ikke kvaliteten på ekte stemmer. Uavhengig høytlesing av norsk og engelsk manus er fortsatt en nyttig redaksjonell kontroll.

Historiegrafen slår sammen tilstander med lik betydning for fremtidige valg; tallet er ikke en påstand om at alle mulige rekkefølger er lest manuelt. Det store JavaScript-bygget gir fortsatt et størrelsesvarsel fra Vite, men byggingen lykkes. Ingen publisering, commit eller push er utført.

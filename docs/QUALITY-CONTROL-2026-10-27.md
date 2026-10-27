# Full kvalitetskontroll – 27. oktober 2026

## Resultat

Den lokale boka er bygget og kontrollert med både automatiske motortester og faktiske nettleserklikk. To bekreftede feil er rettet. Ingen blokkerende feil ble funnet i de gjennomførte testene. Dette er ikke et bevis på at alle mulige historier eller alle virkelige enheter er feilfrie.

## Feil som ble funnet og rettet

1. **Gjentatte samtalefelt etter sidebytte.** Samtalefeltet og gåtekortet hadde samme React-nøkkel. Ved navigering kunne gamle samtalefelt bli stående flere ganger. De har nå forskjellige nøkler. En ny nettleserkontroll krever nøyaktig ett samtalefelt og korrekt antall gåtekort på hver side gjennom hele reisen.
2. **Dialog etter Pikachus redning beskrev en fremtidig redning.** Start-Pokémonen kunne fortsatt foreslå å løfte eføyen etter at Pikachu allerede var fri. Alle tre startervariantene anerkjenner nå den gjennomførte redningen, på både norsk og engelsk. Regresjonstest hindrer at den gamle formuleringen kommer tilbake.

## Gjennomførte tester

| Område | Faktisk kontroll | Resultat |
|---|---|---|
| Historiegraf | 39 scener, 105 valg, 48 907 dedupliserte tilstander med relevante fremtidsforskjeller | Bestått |
| Avslutninger i motoren | 18 faktiske ruter med lagring og gjenoppretting | Bestått |
| Avslutninger i nettleseren | 36 komplette gjennomspillinger med faktiske knappetrykk, begge språk | Bestått |
| Sidetekst og bilder i nettleseren | 666 sidevisninger sammenlignet med motorens faktiske tilstand og bildemanifest | Bestått |
| Dynamiske sidefelt | Ett samtalefelt og riktig gåtekort etter hvert sidebytte | Bestått etter retting |
| Gåter i nettleseren | Åtte oppgaver × tre startere: feil svar, hint, lagring midt i oppgaven og riktig løsning | Bestått |
| Kombinasjoner | 40 kontrakter for gåter og viktige kombinerte handlinger | Bestått |
| Tekst og illustrasjonsregler | 10 580 syntetiske kombinasjoner | Bestått |
| Norsk/engelsk | 10 608 tekstkontroller og språkvalg som overlever oppdatering | Bestått |
| Smale skjermer | Alle 39 scener ved 320, 390, 768 og 1280 piksler med ekstra stor tekst | Ingen horisontal sideoverflyt |
| Rutevisning | Reelle reiser ved 375, 768 og 1440 piksler | Bestått |
| Ordhefte | Ordhjelp lagrer ord; norske betydninger og engelske eksempler beholdes | Bestått |
| Valghjelp | Hjelpeknappen åpner forklaring uten å velge historiegren | Bestått |
| Historikk/veiskiller | Originalreise bevares og gjenopprettes etter alternativt valg | Bestått |
| Gjenstander | Undersøkelse av eid gjenstand lagres | Bestått |
| Tastatur | Fokus ved åpning, Shift+Tab innen dialog, Escape og retur til åpningsknapp | Bestått |
| Lesepreferanser | Lesemodus og ekstra stor tekst beholdes ved oppdatering | Bestått |
| Manglende bilde | Bevisst 404 på malerier utløser lokalt SVG-reservebilde med korrekt merking | Bestått |
| Blokkert lagring | Synlig varsel og fortsatt spillbar reise i minnet | Bestått |
| Opplesningskobling | Testmotor bekrefter en-US/nb-NO, langsom uttale, avbrudd ved sidebytte og feilvarsel | Bestått; ikke en faktisk lydtest |
| Teksteksport | Norsk nedlasting inneholder oversatt historikk | Bestått |
| Publisering | Bygg og HTTP-lasting av 179 lokale filer under `/Pokemonhistorie/` | Bestått |
| Kjøretidsfeil | Ingen JavaScript-feil registrert i de gjennomførte nettleserrutene | Bestått |

Nettlesertestene bruker en separat, ren Edge-profil. Brukerens lagrede reise er ikke endret. Skjermbreddetester er emulering på Windows, ikke fysiske telefoner. Isolerte gåte- og layouttilstander regnes ikke som reelle spillruter. De 36 fullstendige rutene bruker faktisk navigering fra startsiden.

## Visuell kontroll og begrensninger

Startsiden og representative norske mobilsider er inspisert som skjermbilder; dette avdekket de gjentatte samtalefeltene. Bildene blir lastet og skiftet etter forventet tilstand, og reservebildene fungerer. Fil- og manifesttester kan ikke bevise at alle detaljer i et maleri samsvarer med hver tekstvariant.

Fortsatt relevant fra utviklingsrapporten:

- Enkelte illustrasjoner har himmellys som bør vurderes redaksjonelt opp mot de savnede stjernene; full visuell kontinuitet er ikke ferdig attestert.
- Alle mulige følgegrupper har ikke egne malerier. Squirtles særskilte hagevariant bruker fortsatt det eksisterende hagemotivet.
- Faktisk uttalekvalitet, installerte norske stemmer og opplesning på iOS/Android må kontrolleres på de aktuelle enhetene.
- Faktisk skjermleserbruk og full WCAG-/kontrastgjennomgang er ikke gjennomført. Tastatur- og fokusprøvene er ikke en slik sertifisering.
- Oversettelsestestene inkluderer tekstsammenligning og en restordsheuristikk; redaksjonell språkvask med barn i målgruppen er fortsatt nyttig.
- Bygget gir et ikke-blokkerende varsel om en JavaScript-fil over 500 kB før komprimering, omtrent 172 kB komprimert. Ingen funksjonsfeil følger av varselet i testene.

## Etterprøvbarhet

- `pnpm test:full` kjører motor, språk, bygg og lokal publiseringskontroll.
- `scripts/browser-quality.ts` kjører de 36 komplette nettleserrutene.
- `scripts/browser-tools.ts` kontrollerer verktøy, gåter, tastatur og skjermbredder.
- `scripts/browser-narration.mjs` bruker en tydelig merket testmotor for opplesning og kontrollerer tekstnedlasting.
- Nettleserskriptene trenger `PLAYWRIGHT_MODULE` satt til den installerte Playwright-modulen og `BROWSER_EXECUTABLE` til en lokal Chromium-/Edge-binær. De krever ingen eksterne tjenester. Start forhåndsvisningen på port 4173 først.
- Maskinlesbare rapporter og representative skjermbilder ligger i `docs/browser-qa/`.

Endringene er lokale. Ingenting er pushet eller publisert til GitHub i denne kontrollen.

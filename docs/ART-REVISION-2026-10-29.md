# Bilderunde etter manusrevisjonen

Åtte ferdige illustrasjoner er redigert med innebygd `image_gen` og lagret lokalt. Originalene er beholdt. Alle nye filer ligger i `public/images/scenes/painted/` og har suffikset `-v3.png`.

| Fil | Rettelse |
|---|---|
| `scene-cave-v3.png` | Gammel veggtegning av ringer og varmekilder; ingen bok som avslører Lumi og Shinx |
| `scene-tower-v3.png` | Lukket dør, vindu inn til stolen og gult skjerf tydelig merket LUMI |
| `scene-stairs-v3.png` | Skjerf merket SHINX, fotografi av begge vennene med skjerf, observatoriets mur ved trappen |
| `scene-roof-v3.png` | Kort steinbro med støtter og rekkverk, overbygd gangvei nedenfor |
| `roof-flock-v3.png` | Samme trygge overgang med Altaria etter flyturen; ungene er ved redet |
| `scene-hollow-v3.png` | Én Gastly og samlingen av votter, knapper og dagbøker |
| `scene-echoArchive-v3.png` | Én Gastly, gammel astronomibok og et separat nyere notat |
| `scene-brook-v3.png` | Flaskefunnet beholdt; postkurv, kabel, vannhjul og drivverk synlige |

De fullstendige promptene er lagret i `editorial-art-prompts.json`, inkludert bildebaner og generator. Katalog, produksjonsplan, promptregistre og illustrasjonsmanifest er oppdatert. Skjermleserbeskrivelsene er oppdatert på engelsk og norsk. Altaria-varianten er kontrollert særskilt slik at den ikke gjeninnfører det gamle bildet av en ubeskyttet kryssing.

Alle bildene er vurdert visuelt før innkobling. Små kunstneriske forskjeller mellom andre eksisterende malerier kan fortsatt forekomme; denne runden gjelder de åtte oppførte motivene. Ingen historietekst, valg eller lagringsformat er endret i bilderunden. Ingen bilde-API kalles under spilling.

## Kontroll

- Presentasjonskontrollen består for 369 historietilstander på begge språk, med krav om lokalt maleri.
- Produksjonsbygget består. Offlinepakken inneholder 186 filer, omtrent 160 MB.
- Alle 32 nettleserkontroller i `browser-editorial-art.ts` består: åtte bilder på norsk/engelsk ved 375/1024 piksler. Altaria-tilstanden hentes fra en faktisk gjennomspilt rute.
- TypeScript-kontrollen og kontrollen av 183 lokale ressurser under GitHub Pages-adressen består.
- Offlinekontrollen består: nedlastingsfeil og nytt forsøk, en hel avslutning uten nett, 42 illustrerte sider uten nett og oppdatering som bevarer lagringen. Dette er nettlesertesting, ikke testing på fysisk Samsung-nettbrett.
- Gjennomgangseksporten er oppdatert med de nye bildefilene.

Byggversjon: `703848ef2e8d144c`. Ingenting er committet, pushet eller publisert automatisk.

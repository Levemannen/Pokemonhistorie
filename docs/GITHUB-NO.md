# Last opp prosjektet og publiser spillet

Prosjektmappen er `F:\KI-prosjekter\Pokemonhistorie`. Last opp kildekoden og de lokale bildene sammen. GitHub bygger den spillbare nettsiden automatisk. Ingen API-nøkkel eller backend er nødvendig.

## Med GitHub Desktop

1. Åpne GitHub Desktop og logg inn på GitHub-kontoen din.
2. Velg **File → Add local repository**, og velg prosjektmappen over. Hvis Desktop sier at mappen ikke er et Git-repository, velg lenken **create a repository here**. Bruk den eksisterende prosjektmappen og behold filene som ligger der.
3. Se gjennom filene under **Changes**. Skriv for eksempel `First playable storybook` i **Summary**, og velg **Commit to main** hvis det finnes endringer. Når et repository opprettes i Desktop, kan den første commiten allerede være laget.
4. Velg **Publish repository**. Bruk for eksempel navnet `pokemon-starlight`. Fjern avhukingen **Keep this code private** hvis du bruker GitHub Free og vil publisere spillet gratis med Pages. Velg **Publish repository**.
5. Åpne prosjektet på github.com. Gå til **Settings → Pages**. Under **Build and deployment → Source**, velg **GitHub Actions**.
6. Åpne fanen **Actions**. Velg **Deploy storybook**, og bruk **Run workflow → main → Run workflow** hvis første kjøring feilet før Pages ble aktivert, eller ingen kjøring starter automatisk.
7. Når kjøringen er grønn, finner du spilladressen under **Settings → Pages**, vanligvis `https://DITT-BRUKERNAVN.github.io/pokemon-starlight/`.

Ikke velg publisering direkte fra `main`-mappen. Dette prosjektet skal bygges med det medfølgende Actions-oppsettet.

## Hva følger med?

- `src/`: historien, gåtene og hele spillmotoren.
- `public/`: lokale illustrasjoner, bildevalg og bildeprompter.
- `scripts/`: kontroller av historien, sluttmulighetene og bildene.
- `.github/workflows/deploy.yml`: automatisk testing, bygging og publisering.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, konfigurasjonsfiler og dokumentasjon.

`node_modules/`, `dist/`, mellomlagring, lokale miljøfiler og ZIP-pakker er utelatt med `.gitignore`. Publiser kildeprosjektet, ikke bare ZIP-filen med det ferdige nettstedet.

Bildene er ferdig lagret før leseren spiller. Alle 39 scener har nå malte illustrasjoner for alle tilgjengelige start-Pokémon. Én planlagt følgesvennvariant bruker det malte grunnbildet. SVG-reserver brukes bare hvis en bildefil ikke kan lastes. Alle 104 valg har en egen fortalt følge, og alle seks avslutninger er testet som tilgjengelige med hver start-Pokémon.

## Senere endringer

Gjør endringene i samme lokale mappe. I GitHub Desktop skriver du en kort oppsummering, velger **Commit to main** og deretter **Push origin**. Actions tester og publiserer en oppdatert versjon. Lesernes lagring forblir i nettleseren deres; fremdrift fra den lokale forhåndsvisningen flyttes ikke automatisk til den nye nettadressen.

Hvis Actions viser rødt, åpne den mislykkede kjøringen og se hvilket trinn som feilet. Kontroller først at Pages bruker **GitHub Actions**, og at publiseringsgrenen heter `main`.

Offisiell veiledning: [Legg til et lokalt prosjekt](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github), [GitHub Pages med Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

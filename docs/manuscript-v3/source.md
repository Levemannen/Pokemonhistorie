# POKÉMON – THE MYSTERY OF THE LOST STARLIGHT
## Fullstendig tospråklig narrativt manus / Complete bilingual narrative script

**Redaksjonell nyfortelling · revisjon 3 · 31. oktober 2026 · Norsk bokmål + American English**

Dette dokumentet er et **komplett sammenhengende narrativt manus på hovedscenenivå**, med dialog, beslutningspunkter, valgfri sidehandling, seks gjensidig alternative hovedavslutninger og tre hemmelige bonusepiloger. Hver scene har samme ID på begge språk. Det er en **ny manusversjon**, ikke ferdig implementert kode; hendelser og krav må fortsatt kontrolleres i Codex mot spillets faktiske motor og originale 39-scene-graf.

This is a complete **narrative draft at main-scene level**, not deployed code. Norwegian and English share scene IDs, conditions and destinations. Every choice includes its game-state consequences. The engine must enforce requirements rather than treating these notes as decorative prose.

### Lesekonvensjon / Reading conventions
- `S01`–`S25`: hovedscener / main scenes. `Q` = frivillig sidehandling / optional quest. `E` = slutt / ending. `B` = legendary bonus.
- `IF`: vis bare når vilkåret er sant / display only if true. `SET`: permanent flag. `GET`: item. `USE`: consume item. `GOTO`: destination.
- Alle hovedruter møtes ved hovedscenene; valg påvirker tekst, ressurser, allierte og slutninger. Ingen permanent blindvei.
- Partner kan være Bulbasaur, Charmander eller Squirtle, valgt i `S01`; alle er likeverdige.

### Kanon som ikke skal brytes / Non-negotiable canon
Stjernene er fortsatt på himmelen, men lyset som når dalen, holdes tilbake av **Starlight Glass / Stjernelysglasset**. Maskinen ga opprinnelig varme under stormer og skulle frigjøre lyset daglig. Lumi har låst en fysisk vokterlås for å holde skadde Shinx varm. **Lumi må selv løsne denne låsen.** Shinx kan ikke helbredes øyeblikkelig; han må samtykke til flytting og trenger hvile. Det finnes **nøyaktig ett sølvfrø**; det sendes som nødsignal og brukes bare én gang som varig plantet frø. Mira tegner tårnet inn på kartet igjen. Ruten er Willowbrook → høyden → Moonwood → elven → øya → fjellet → Starfall-tårnet; observatoriet er del av tårnet. <ENDINGS> representerer alternative kanoniske utfall, ikke samtidige hendelser.

---

## S01 · Lykten før mørket / The Lantern Before the Dark

### Norsk

Willowbrook lukter nybakte boller og regnvått tre. På torget henger lykter mellom husene. Du har fått ansvaret for den siste lykten, den som skal tennes når den første stjernen viser seg. Ved siden av deg står Pokémonen du nettopp har valgt som reisefølge.

Bulbasaur stryker et blad langs håndleddet ditt, som om den undersøker om du skjelver. Charmander forsøker å varme den kalde fyrstikken og ser svært fornøyd ut med seg selv. Squirtle passer nøye på at ingen velter spannet med vann ved scenen.

«Det er ikke en konkurranse om hvem som tenner først,» sier Mira. Den eldre karttegneren har blekk på fingrene og et kart sammenrullet under armen. «Det er en konkurranse om hvem som klarer å vente.»

En Eevee står på en kasse og prøver å nå en altfor høyt plassert papirlykt. Den løfter potene, mister balansen og griper kanten i siste øyeblikk. Du rekker akkurat å strekke ut armene. Skal du hjelpe, eller rope etter den ansvarlige før du tenner lykten? Så kommer kveldens første stjerne til syne.

Du løfter fyrstikken. Lysglimtet i himmelen blafrer. Så slukner stjernen.

En annen følger. Og en tredje. Ingen snakker lenger. I løpet av tre hjerteslag blir himmelen svart, som om noen har lagt et teppe over hele verden.

### English

Willowbrook smells of fresh buns and rain-soaked wood. Lanterns hang between the houses around the square. You have been trusted with the final lantern, the one to be lit when the first star appears. Beside you stands the Pokémon you have just chosen as your partner.

Bulbasaur brushes a leaf against your wrist, as though checking whether you are shaking. Charmander tries to warm the cold match and looks extremely pleased with itself. Squirtle keeps a careful eye on the water bucket beside the stage.

“It isn't a contest to see who lights theirs first,” says Mira. The old mapmaker has ink on her fingers and a rolled-up map under one arm. “It's a contest to see who can wait.”

An Eevee stands on a crate, struggling to reach a paper lantern hung too high. It lifts its paws, slips, and catches the edge at the last moment. You have just enough time to reach out. Will you help, or call the lantern keeper before lighting yours? Then the first star of the evening appears.

You lift the match. The point of light above you flickers. Then it goes out.

Another follows. And another. Nobody speaks. In three heartbeats the sky turns black, as if someone has pulled a blanket over the entire world.

**Valg / Choices and state:**

- Hjelp Eevee ned fra kassen / Help Eevee down: `SET kindness_eevee, rescue_count+1`; GOTO S02. Eevee husker redningen / Eevee remembers.
- Rop på lyktansvarlig og sikre området, så tenn lykten / Call the lantern keeper to secure the area, then light it: `SET town_lantern, leadership`; GOTO S02. Eevee får hjelp av en voksen / Eevee is helped by an adult.

---

## S02 · Da stjernene forsvant / When the Stars Vanished

### Norsk

Et øyeblikk er alle stille. Så begynner bjellen i Starfall-tårnet å ringe, høyt oppe på fjellet. Det er umulig. Tårnet har vært forlatt i årevis.

Lyktene på torget skifter fra gult til matt blått. En liten Pichu snubler over tauene rundt scenen. Eevee kryper sammen under benken. På høyden bak husene blir de nattlysende blomstene mørke, én etter én.

«Stjernene!» roper noen. «De er borte!»

«Nei,» sier Mira, så lavt at bare du hører det. «Stjernene er der fortsatt. Det er noe annet som mangler.»

Før du rekker å spørre, river et sølvglimt en stripe gjennom natten. Noe lander utenfor torget med et klirr av glass. Partneren din ser på deg. Nå må du bestemme deg: løpe mot lyden, eller sørge for at ingen blir stående alene i mørket.

### English

For a moment everyone is silent. Then the bell in Starfall Tower begins to ring, high on the mountain. That is impossible. The tower has stood abandoned for years.

The lanterns in the square shift from gold to a dull blue. A tiny Pichu trips over the ropes around the stage. Eevee curls beneath a bench. On the hill beyond the houses, the night-blooming flowers go dark, one by one.

“The stars!” someone cries. “They're gone!”

“No,” says Mira, so quietly that only you hear. “The stars are still there. Something else is missing.”

Before you can ask what she means, a silver streak tears across the night. Something lands beyond the square with a sound like breaking glass. Your partner looks at you. Now you have to choose: run toward the sound, or make sure nobody is left alone in the dark.

**Valg / Choices and state:**

- Bli og sørg for Pichu og Eevee / Stay with Pichu and Eevee: `SET rescue_square, rescue_count+1, moon_kindness`; GOTO S03; Mira viser senere nedslagsstedet.
- Undersøk nedslaget med en gang / Investigate the impact at once: `SET silver_first`; GOTO S03; en landsbyvakt hjelper de små.

---

## S03 · Frøet av sølv / The Silver Seed

### Norsk

Ved enden av brosteinsgaten har noe brent et lite hull i bakken. Midt i hullet ligger en gjenstand på størrelse med et eikenøtt, men den er sølvfarget og varm mot fingrene. Den har et mønster som ligner et åpent øye.

«Et frø?» spør du.

Mira kommer løpende, uvanlig andpusten. «Ikke plant det. Ikke ennå.»

Hun lukker hånden din varsomt rundt frøet. En tynn lysstråle peker mot fjellet, forsvinner og kommer tilbake når du snur deg. Som en pil som prøver å huske hvor den skal.

«Dette er et nødsignal fra Stjernelysglasset,» sier Mira. «Det betyr at maskinen har sluttet å slippe lyset fri.»

«Hvorfor har ingen fortalt oss om den?»

Mira ser ned på kartet under armen. «Fordi jeg trodde det var tryggere at dere ikke visste.»

### English

At the end of the cobbled lane, something has burned a small hollow in the earth. In its center lies an object no larger than an acorn, silver and warm against your fingers. A pattern on its surface resembles an open eye.

“A seed?” you ask.

Mira hurries up, unusually out of breath. “Don't plant it. Not yet.”

She gently closes your hand around the seed. A narrow beam points toward the mountain, vanishes, then returns when you turn. Like an arrow trying to remember where it belongs.

“This is an emergency signal from the Starlight Glass,” Mira says. “It means the machine has stopped releasing the light.”

“Why hasn't anyone told us about it?”

Mira looks at the map beneath her arm. “Because I thought it was safer if you didn't know.”

**Valg / Choices and state:**

- Spør Mira rett ut hva hun skjuler / Ask Mira what she is hiding: `SET question_mira`; GOTO S04.
- Undersøk frøets mønster / Study the seed's pattern: `SET seed_pattern`; GOTO S04.
`GET silver_seed` alltid / always.

---

## S04 · Kartet med hullet / The Hole in the Map

### Norsk

Mira brer kartet utover bibliotekbordet. Der fjellet skulle stå, er det et firkantet hull i papiret. Hun tar frem en løs kartbit fra frakkelommen og legger den på plass. Der er Starfall-tårnet, observatoriet og veien forbi Moonwood.

«For mange år siden skjedde en ulykke ved tårnet,» sier hun. «Et barn og en Pokémon ble skadet. Jeg klippet ut kartbiten fordi jeg var redd for at noen skulle dra dit igjen.»

«Da kunne ingen hjelpe hvis noe skjedde,» sier du.

Mira nikker uten å forsvare seg. «Det var det jeg ikke forsto.»

Hun tegner stien inn på kartet ditt og peker på et lite vannhjul ved elven. «Det driver en kabelkurv med post opp til tårnet. Hvis noen er der oppe, kan vi kanskje få et svar.»

Mira lover å samle lykter, tepper, varme steiner og hjelpere. Hun kan ikke forlate landsbyen mens de minste trenger henne. Men hun vil sende forsyningene etter deg, ikke et løfte om hjelp som aldri kommer.

### English

Mira spreads the map across the library table. Where the mountain should be, a square hole has been cut through the paper. She takes a loose section from her coat pocket and fits it back into place. There is Starfall Tower, the observatory, and the route past Moonwood.

“Years ago, there was an accident near the tower,” she says. “A child and a Pokémon were hurt. I cut out the map because I was afraid somebody would go there again.”

“Then nobody could help if something went wrong,” you say.

Mira nods without defending herself. “That's what I didn't understand.”

She draws the path onto your map and points to a small waterwheel by the river. “It drives a cable basket that carries mail up to the tower. If someone is up there, perhaps we can get an answer.”

Mira promises to gather lanterns, blankets, warm stones, and helpers. She cannot leave the village while its youngest residents need her. But she will send the supplies after you—not offer a promise of help that never arrives.

**Valg / Choices and state:**

- Godta unnskyldningen, men be om hele sannheten / Accept the apology but ask for the full truth: `SET mira_trust`; GOTO S05.
- Si at tillit må fortjenes / Say trust must be earned: `SET mira_accountability`; GOTO S05.

---

## S05 · Den siste lykten / The Last Lantern

### Norsk

Før daggry står du på høyden over Willowbrook. Lysene nedenfor er små og ustø. Partneren din går så tett ved siden av deg at skulderen din av og til treffer dens.

[IF kindness_eevee] Eevee venter ved stien med en liten lykt og skyver den bort til deg. [ELSE] En lykt fra Mira henger på gjerdet, med navnet ditt på. Ingen av variantene gjør Eevee til fast reisefølge.

I mørket foran dere stiger Moonwood som en vegg av stille trær. Sølvfrøet gir et kort pulsslag gjennom lommen.

«Vi må ikke bli modige hele tiden,» sier du til partneren din. «Bare lenge nok til neste skritt.»

Dere går inn under greinene.

### English

Before dawn, you stand on the hill above Willowbrook. The lights below are small and unsteady. Your partner walks so close that your shoulder brushes against its side from time to time.

[IF kindness_eevee] Eevee waits beside the trail and pushes a little lantern toward you. [ELSE] A lantern from Mira hangs on the fence with your name attached. Neither version makes Eevee a permanent companion.

Moonwood rises before you like a wall of silent trees. The silver seed gives one quick pulse inside your pocket.

“We don't have to be brave all the time,” you tell your partner. “Just long enough for the next step.”

Together you pass beneath the branches.

**Valg / Choices and state:**

- Følg stien med lykten / Follow the lantern-lit path: `SET safe_entry`; GOTO S06.
- Følg sølvfrøets blinkende retning / Follow the seed's pulse: `SET seed_guided`; GOTO S06.

---

## S06 · Skogen holder pusten / The Forest Holds Its Breath

### Norsk

Moonwood pleier å være full av lyder. Nå er det som om skogen holder pusten. Sopp som vanligvis gløder blått, er grå. Vinden beveger bladene uten å få dem til å rasle.

Tre steiner ligger rundt en uttørket dam. På hver stein er et symbol: blad, flamme og dråpe. Partneren din berører sitt eget symbol. Lyset fra sølvfrøet faller på en fjerde stein du ikke hadde sett.

Ved en rot ligger en liten papirbit: «Den rette veien vises ikke for den som løper forbi.»

Du kan bruke tid på å undersøke mønsteret, eller følge den tydelige stien. Begge veiene fører videre, men bare den grundige undersøkelsen avslører et av de skjulte himmeltegnene.

### English

Moonwood is usually full of sounds. Now it feels as if the forest is holding its breath. Mushrooms that normally glow blue are gray. Wind moves the leaves without making them rustle.

Three stones surround a dried-up pool. Each bears a symbol: leaf, flame, and drop. Your partner touches the symbol that matches it. Light from the silver seed falls onto a fourth stone you hadn't noticed.

A scrap of paper rests by a root: “The right path does not show itself to those who hurry past.”

You can take time to study the pattern, or follow the obvious path. Both lead onward, but only a careful search reveals one of the hidden signs of the sky.

**Valg / Choices and state:**

- Undersøk steinene og sett symbolene i årstidens rekkefølge / Study and arrange the stones in seasonal order: `SET moon_sig_1, forest_clue`; GOTO S07. Hint fra partneren tillatt / partner hint available.
- Velg den brede stien / Take the broad path: `SET fast_forest`; GOTO S07.

---

## S07 · Pikachu under eføyen / Pikachu Beneath the Ivy

### Norsk

En skarp knitring kommer fra en lysning. Pikachu sitter fanget i eføy som har viklet seg rundt en gammel lyktestolpe. Hver gang den prøver et elektrisk støt, trekker plantene seg strammere sammen. «Pika!» roper den, rasende og redd på samme tid.

«Ikke bruk mer strøm!» roper du. «Plantene reagerer på lyset.»

Bulbasaur kan løsne røttene uten å skade dem. Charmander kan varme stolpen slik at den utvider seg og eføyen glir av, men må holde halen unna bladene. Squirtle kan bløte opp jorden og frigjøre den nederste roten. Uansett løsning må du først dekke til den blinkende lykten.

Pikachu blir sittende og puste tungt. Så strekker den ut en pote.

«Du trenger ikke bli med oss,» sier du. «Men du kan, hvis du vil.»

### English

A sharp crackling sound comes from a clearing. Pikachu is trapped in ivy wound around an old lantern post. Every time it tries an electric jolt, the vines tighten. “Pika!” it cries, furious and frightened at once.

“Don't use any more electricity!” you call. “The plants react to the light.”

Bulbasaur can loosen the roots without hurting them. Charmander can gently warm the post so it expands and the ivy slips free, but must keep its tail away from the leaves. Squirtle can soak the ground and free the lowest root. Whatever you do, you must first cover the flashing lamp.

Pikachu sits breathing hard. Then it extends a paw.

“You don't have to come with us,” you say. “But you can, if you want to.”

**Valg / Choices and state:**

- Befri Pikachu og inviter den med / Free Pikachu and invite it: `SET rescued_pikachu, companion_pikachu, rescue_count+1, sun_rescue_1`; GOTO S08.
- Befri Pikachu og be den vokte stien / Free Pikachu and ask it to guard the path: `SET rescued_pikachu, pikachu_guard, rescue_count+1, sun_rescue_1`; GOTO S08.
- Varsle Miras hjelpere og merk stedet / Alert Mira's helpers and mark the spot: `SET pikachu_help_sent`; GOTO S08; senere bekreftet reddet / later rescued by helpers.

---

## S08 · Hoothoots hus / Hoothoot’s Home

### Norsk

Et Hoothoot-rede henger skjevt over en bekk. Et knekt greinfeste gir etter hver gang vinden kommer. Inne i redet ligger to blanke steiner og et lite egg.

Hoothoot sitter på den andre siden og ser på deg med et ansikt som om det allerede har bestemt seg for at du kommer til å gjøre noe dumt.

«Vi kan ikke bare dra det ned,» sier du. «Først må vi sikre det.»

Med en myk gren, litt bark og partnerens hjelp lager dere et nytt feste. Hoothoot kontrollerer arbeidet med et alvorlig «Hoo». Først når egget er trygt, senker den vingene.

«Du kjenner skogen bedre enn oss,» sier du. «Vil du følge oss et stykke?» Hoothoot blunker først med det ene øyet, så det andre.

### English

A Hoothoot nest hangs crooked over a stream. A broken branch support bends whenever the wind rises. Inside are two polished stones and one small egg.

Hoothoot sits across the water, watching you with the expression of someone who has already decided you're going to do something foolish.

“We can't just pull it down,” you say. “We need to make it safe first.”

Using a flexible branch, some bark, and your partner's help, you build a fresh support. Hoothoot inspects the work with a solemn “Hoo.” Only when the egg is safe does it lower its wings.

“You know these woods better than we do,” you say. “Would you like to come with us for a while?” Hoothoot blinks one eye, then the other.

**Valg / Choices and state:**

- Sikre redet og inviter Hoothoot / Secure nest and invite Hoothoot: `SET hoothoot_nest, companion_hoothoot, rescue_count+1, moon_kindness`; GOTO S09.
- Sikre redet og la Hoothoot vokte egget / Secure nest and let Hoothoot guard egg: `SET hoothoot_nest, rescue_count+1, moon_kindness`; GOTO S09.
- Be Hoothoot om veibeskrivelse uten å reparere / Ask directions without repair: `SET hoothoot_directions`; GOTO S09.

---

## S09 · Treet som husker / The Tree That Remembers

### Norsk

Et eiketre står midt i stien. Stammen har et ansikt som bare kan sees når lykten holdes lavt. «Jeg husker dem som går gjennom skogen,» knaker det. «Men hvem husker dem som må bli igjen?»

Ved røttene er fire små fordypninger: én med mose, én med aske, én med vann og én tom. Partneren din snuser på den tomme. Du forstår at dette ikke er en prøve i å gjette et ord, men i å huske hva skogen trenger.

Hvis du hjalp Pikachu eller Hoothoot, kan du fortelle treet hva du lærte. Hvis ikke, kan du undersøke de fire fordypningene og finne det samme svaret: Ingen sti er trygg dersom man glemmer dem man forlater.

Treet bøyer en grein. Bak barken ligger en halvmåneformet linse. «Denne viser ikke det du ønsker å se,» sier treet. «Bare det lyset har berørt.»

### English

An oak tree stands in the middle of the path. Its face can be seen only when the lantern is held low. “I remember those who pass through the woods,” it creaks. “But who remembers those who must stay behind?”

At its roots are four hollows: one filled with moss, one with ash, one with water, and one empty. Your partner sniffs the empty space. You realize this isn't a test of guessing a word. It's a test of remembering what the forest needs.

If you helped Pikachu or Hoothoot, you can tell the tree what you learned. Otherwise, you can inspect the hollows and discover the same answer: No path is safe if you forget those you leave behind.

The tree bends a branch aside. Hidden beneath the bark is a crescent-shaped lens. “This does not show what you want to see,” says the tree. “Only what the light has touched.”

**Valg / Choices and state:**

- Bruk lærdommen fra en redning / Answer from a rescue (`IF rescued_pikachu OR hoothoot_nest`): `GET crescent_lens`; GOTO S10.
- Studer alle fire fordypningene / Examine all four hollows: `SET learned_tree, GET crescent_lens`; GOTO S10.
- Be om et hint / Ask for a hint: reduser ingen permanent ressurs / no permanent penalty; GOTO samme scene ved hint / remain until solved.

---

## S10 · Leirplassen med to kopper / The Camp with Two Cups

### Norsk

Mellom granene finner dere en sluknet ild, to kopper og et teppe brettet over en flat stein. En av koppene er liten og har et merke etter en lynformet pote. Ved siden av ligger et fotografi av en Clefairy og en Shinx. Begge har hvert sitt gule skjerf.

Bak fotografiet står det: «Hvis du blir redd, vil jeg sitte hos deg til du ikke er det lenger. – L.»

Halvmånelinsen avslører små stjerner risset inn på koppen. Uten linsen kan du fortsatt lese fotografiet og følge stien, men du forstår ikke at rissene viser den første delen av et gammelt stjernekart.

Et raslende trinn høres lenger inne i skogen. Noen har vært her nylig. Den som forlot leiren, bar den ene koppen bort og satte den tilbake. Hvorfor skulle noen gjøre det hvis de aldri kom tilbake?

### English

Between the firs you find the remains of a fire, two cups, and a blanket folded over a flat stone. One cup is small and bears a mark shaped like a lightning paw. Beside it lies a photograph of a Clefairy and a Shinx. Each wears a separate yellow scarf.

On the back of the photograph someone has written: “If you get scared, I'll sit with you until you aren't scared anymore. —L.”

The crescent lens reveals tiny stars scratched into the cup. Without it you can still read the photograph and follow the trail, but you won't realize that the marks form the first part of an ancient star map.

A footstep rustles deeper in the woods. Someone has been here recently. Whoever left the campsite took one cup away and put it back. Why would someone do that if they never meant to return?

**Valg / Choices and state:**

- Undersøk koppen med linsen / Examine cup using lens (`IF crescent_lens`): `SET map_fragment_1, moon_sig_2`; GOTO S11.
- Ta med fotografiet som spor / Take photo as clue: `GET photo_lumi_shinx`; GOTO S11.
- Følg de ferske sporene / Follow fresh prints: `SET tracks_lumi`; GOTO S11.

---

## S11 · Broen som mangler / The Missing Bridge

### Norsk

Elven er høyere enn på kartet. Der broen skulle stå, henger to tau og en halv planke ut over vannet. På den andre bredden står Psyduck og stirrer på et hjul som har falt av akslingen. Den løfter potene mot hodet, setter dem ned igjen og begynner på nytt.

Lapras ligger lenger nede i en vik med en snor viklet rundt en finne. Hver gang den forsøker å bevege seg, strammes snoren.

«Vi kan bygge en vei,» sier du. «Eller vi kan hjelpe dem som allerede kjenner elven.»

Ingen kan teleportere dere over. Løsningene krever arbeid: en enkel reparasjon av plankene med tau, hjelp fra Lapras etter at finnen er frigjort, eller Psyducks vannhjul etter at dere rolig har funnet delene.

### English

The river is higher than it appears on the map. Where the bridge should be, two ropes and half a plank hang above the water. On the far bank, Psyduck stares at a wheel that has slipped off its axle. It raises its paws to its head, lowers them, and starts again.

Lapras lies farther downstream in a cove, a length of cord wound around one fin. Each time it tries to move, the cord tightens.

“We can make a way across,” you say. “Or we can help the ones who already know the river.”

Nobody can simply teleport you across. Each solution requires work: patching the planks with rope, helping Lapras after freeing its fin, or restoring Psyduck's waterwheel by calmly gathering its pieces.

**Valg / Choices and state:**

- Hjelp Lapras og få skyss / Help Lapras and accept passage: `SET rescued_lapras, rescue_count+1, sun_rescue_2`; GOTO S12.
- Reparer Psyducks hjul og bruk kabelplattformen / Fix Psyduck's wheel and use cable platform: `SET helped_psyduck, rescue_count+1, sun_rescue_2`; GOTO S12.
- Sikre den gjenværende broen med tau fra verktøykassen / Secure damaged bridge using toolbox rope: `SET bridge_repaired`; GOTO S12. Tau er tilgjengelig i verktøykassen ved broen, ikke magisk / Rope comes from bridge toolbox.

---

## S12 · Den lille ingeniøren / The Little Engineer

### Norsk

Psyduck forsøker å holde to bolter, en mutter og en skisse samtidig. Alt faller i vannet. Den stirrer på deg, helt motløs.

«Kanskje én ting om gangen?» foreslår du.

Først teller dere boltene. Så skyller dere gjørmen av akslingen. Til slutt vrir Psyduck mutteren på plass selv. Den ser forbauset på sine egne poter.

«Psy?» sier den, som om den spør om det virkelig var den som klarte det.

Vannhjulet begynner å gå. En liten postkurv stiger langs kabelen som forsvinner opp i fjellene. Psyduck smiler for første gang. Ved bredden finner dere en gammel notis om at kurven kan bringe brev til tårnet, men ikke mennesker.

### English

Psyduck tries to hold two bolts, a nut, and a sketch at the same time. Everything falls into the river. It stares at you, utterly discouraged.

“Maybe one thing at a time?” you suggest.

First you count the bolts. Then you wash mud off the axle. Finally Psyduck tightens the nut itself. It looks at its own paws in surprise.

“Psy?” it says, as if asking whether it really did that.

The waterwheel begins to turn. A little mail basket rises along a cable stretching toward the mountains. Psyduck smiles for the first time. By the bank, you find an old notice explaining that the basket can deliver letters to the tower—but not people.

**Valg / Choices and state:**

- Hjelp Psyduck lære reparasjonen / Help Psyduck master the repair: `SET helped_psyduck, sun_rescue_3, rescue_count+1` only if not already counted; GOTO S13.
- Tegn av kabelkurvens mekanisme / Sketch the cable-basket mechanism: `SET know_mail_system`; GOTO S13.

---

## S13 · Brevet som kom nedover / The Letter That Came Down

### Norsk

En hvit papirlapp driver med strømmen mot dere. Den er foldet rundt et lite glasslodd. På papiret står det: «Lyset må bli her litt til. Vær så snill. – L.»

På baksiden er en hastig tegning av en Shinx som ligger ved en ovn. Du ser at noen har tegnet en ekstra dyne rundt den, og enda en, som om tegneren ikke klarte å stoppe.

«Noen er oppe ved tårnet,» sier du. «Og noen er redde.»

Dere kan sende et svar med kabelkurven. Den går oppover når vannhjulet snurrer. Det er ingen garanti for at avsenderen vil svare, men ordene dine kan endre hvordan hun møter deg senere.

### English

A white slip of paper floats downstream toward you, folded around a small glass weight. It reads: “The light needs to stay here a little longer. Please. —L.”

On the back is a hurried drawing of a Shinx beside a stove. Someone has sketched an extra blanket over it, and another, as if they could not stop drawing more.

“Someone is up at the tower,” you say. “And someone is afraid.”

You can send an answer using the cable basket. It travels uphill as the waterwheel turns. There is no guarantee the writer will answer, but your words may change the way she greets you later.

**Valg / Choices and state:**

- Skriv: «Vi vil hjelpe begge.» / Write “We want to help you both”: `SET compassionate_letter, moon_kindness`; GOTO S14.
- Skriv: «Åpne straks maskinen.» / Write “Open the machine at once”: `SET urgent_letter`; GOTO S14.
- Send bare et kart over trygg vei / Send a map of the safe route: `SET practical_letter`; GOTO S14.

---

## S14 · Øya som viser gårsdagen / The Island That Shows Yesterday

### Norsk

På den lille øya midt i elven står en steinsøyle med en skive av mørkt glass. Når du løfter halvmånelinsen foran den, faller en stripe sølvlys over steinen. Et bilde vokser frem: et tårnrom under en vinterstorm. To små skikkelser løper mellom ovnene.

En Shinx sklir på en våt trapp. En Clefairy griper etter ham, men når ikke frem. Bildet flimrer og forsvinner før du ser hva som skjedde etterpå.

«Det er et minne,» hvisker du. «Ikke noe som skjer nå.»

Om du ikke har linsen, kan du lese samme hovedfakta på en værslitt minneplate, men bare linsen avslører en skjult månerune i kanten av glasset. Det er andre gang den gamle teknologien skiller mellom den som bare passerer og den som ser nøye etter.

### English

On the little island in the middle of the river stands a stone column holding a disk of dark glass. When you raise the crescent lens before it, a stripe of silver light crosses the stone. An image appears: a tower room during a winter storm. Two small figures run between the stoves.

A Shinx slips on a wet stair. A Clefairy reaches for him but cannot catch him. The image flickers and vanishes before you can see what happened next.

“It's a memory,” you whisper. “Not what's happening now.”

Without the lens, you can read the same essential facts on a weathered plaque, but only the lens reveals a hidden moon rune around the glass. Once again, the old technology distinguishes between passing by and paying attention.

**Valg / Choices and state:**

- Studer minnet med linsen / Study memory using lens (`IF crescent_lens`): `GET moon_rune, SET moon_sig_3, know_accident`; GOTO S15.
- Les minneplaten / Read memorial plaque: `SET know_accident`; GOTO S15.
- Legg igjen et løfte om hjelp / Leave a promise of help: `SET island_promise`; GOTO S15.

---

## S15 · Altarias rede / Altaria’s Nest

### Norsk

Oppe på en liten klippe ligger Altarias rede. Tre unger sitter tett sammen, men en fjerde er ikke der. Altaria veksler mellom å stirre mot skyene og ned mot buskene. Den kan ikke fly fra ungene for å lete.

Dere finner den fjerde ungen under en rot, livredd, men uskadd. Du kan bruke tid på å samle alle fire eller be Altaria vise dere fjellstien og la den finne ungen selv. Dersom dere hjelper, gir Altaria en myk fjær som holder på varme når den ligger rundt en varm stein. Den skaper ikke varme av ingenting.

«Denne må vi passe godt på,» sier du. Partneren din nikker. I horisonten skyller en mørk bølge over skogen. For et øyeblikk slukner også lyktene ved elven.

### English

Altaria's nest rests on a small cliff. Three chicks huddle together, but a fourth is missing. Altaria looks from the clouds to the bushes below. It cannot leave the chicks to search.

You find the fourth chick trembling beneath a root, frightened but unhurt. You can take time to gather all four, or ask Altaria to show you the mountain path and let it find the chick itself. If you help, Altaria offers a soft feather that holds warmth when wrapped around a heated stone. It cannot create heat from nothing.

“We should take good care of this,” you say. Your partner nods. Along the horizon, a wave of darkness washes across the forest. For one instant the lanterns beside the river go out as well.

**Valg / Choices and state:**

- Finn ungen og samle flokken / Find chick and reunite family: `SET helped_altaria, rescue_count+1, moon_kindness, GET altaria_feather`; GOTO S16.
- La Altaria lete mens dere merker trygg sti / Let Altaria search while you mark safe trail: `SET marked_altaria_path`; GOTO S16.

---

## S16 · Den andre mørkebølgen / The Second Wave of Darkness

### Norsk

Mørket kommer ikke lenger bare ovenfra. Det kryper mellom steinene, som et hav som stiger uten lyd. Langs fjellstien står blomster med kronbladene lukket. Den lille lanternen fra Willowbrook begynner å falme.

«Hvis lyset fortsetter å forsvinne, blir det ikke bare mørkt,» sier du. «Det blir kaldt.»

En Gastly dukker opp foran en gammel hulestrekning. Den er ikke skremmende; den virker mest fornærmet over at ingen har besøkt den på lenge. «Gas-tly!» sier den og peker insisterende mot en sidegang.

Der inne finnes en historie om da folk bygget tårnet for å dele varme i stormene. Du kan lytte, eller gå rett videre. Gastly viser likevel trygg utgang, men et gammelt vers kan senere vise seg avgjørende.

### English

The darkness no longer comes only from above. It creeps between the stones like a silent rising sea. Flowers along the mountain path have closed their petals. Your little lantern from Willowbrook begins to fade.

“If the light keeps disappearing, it won't just get dark,” you say. “It'll get cold.”

A Gastly appears before an old cave passage. It isn't frightening; it looks mostly offended that nobody has visited it in so long. “Gas-tly!” it declares, pointing firmly toward a side tunnel.

Inside lies a story of the people who built the tower to share warmth during storms. You can listen or continue. Gastly will still show you the safe way out, but an ancient verse may matter later.

**Valg / Choices and state:**

- Bli hos Gastly og hør hele historien / Stay and hear Gastly's story: `SET gastly_friend, moon_kindness, know_old_verse`; GOTO S17.
- Takk Gastly og gå videre / Thank Gastly and continue: `SET gastly_met`; GOTO S17.

---

## S17 · Porten som ikke gir etter / The Gate That Will Not Yield

### Norsk

Ved observatoriets nedre mur stopper veien. En jernport er låst innenfra. Over den står tre sirkler: måne, sol og stjerne. Et hull i messing passer til halvmånelinsen.

Hvis du har månerunen, kan du lese den skjulte låsen. Hvis Pikachu følger deg, kan den drive en gammel motor når du finner bryteren. Hvis ikke, kan du hente en rusten sveiv fra redskapsboden på utsiden og bruke tid på å reparere tannhjulet. Ingen av løsningene fungerer uten sitt konkrete arbeid.

Når porten endelig åpner seg, er luften innenfor underlig varm. Langt over dere høres en hoste, deretter en lav stemme som sier: «Bare hold ut litt til.»

### English

At the observatory's lower wall, the road ends. An iron gate is locked from within. Above it are three circles: moon, sun, and star. A brass socket matches the crescent lens.

If you have the moon rune, you can read the hidden lock. If Pikachu travels with you, it can power an old motor after you find its switch. Otherwise, you can fetch a rusted crank from the tool shed outside and take time to repair the gearing. None of these methods works without its particular effort.

When the gate finally opens, the air inside is strangely warm. Far above, you hear a cough, followed by a soft voice saying, “Just hold on a little longer.”

**Valg / Choices and state:**

- Bruk linse og månerune (`IF crescent_lens AND moon_rune`) / Use lens and moon rune: `SET entered_by_moon`; GOTO S18.
- Be Pikachu drive motoren (`IF companion_pikachu`) / Have Pikachu power motor: `SET entered_by_sun`; GOTO S18.
- Reparer sveiv og tannhjul / Repair crank and gears: `SET entered_by_work`; GOTO S18. Alltid mulig / always possible, requires on-scene repair dialogue.

---

## S18 · Boken fra hundre år tilbake / The Book from a Hundred Years Ago

### Norsk

I observatoriets arkiv står bøker under støvete glassklokker. Gastly svever foran deg hvis dere ble venner; ellers finner partneren din døren ved å følge en stripe varm luft. På bordet ligger et hundre år gammelt hefte. På et nyere ark ved siden av står skjelvende håndskrift: «En natt til. Bare én natt til.»

Det gamle heftet forklarer at Stjernelysglasset samler lyset som ellers skulle nå dalen, og gir varme i stormene. Hver dag må vokterlåsen slippes, slik at lyset strømmer tilbake. Hvis den holdes lukket for lenge, øker trykket og stadig mer lys trekkes inn.

Det nyere arket er ikke en del av heftet. Det er Lumis egne notater. Mellom linjene finner du beregninger av ovnens temperatur og Shinx' hvileperioder. Hun har ikke sluttet å følge med. Hun har blitt for redd til å stoppe.

I margen på heftet står tre gamle ringer beskrevet: Himmel, Hjerte og Jord. Ingen av dem er en tryllekur. Alle krever at varme er ordnet før låsen åpnes.

### English

In the observatory archive, books rest beneath dusty glass bells. Gastly floats ahead if you became friends; otherwise your partner finds the door by following a ribbon of warm air. On the table is a booklet a hundred years old. Beside it lies a newer page in shaky handwriting: “One more night. Just one more night.”

The old booklet explains that Starlight Glass gathers the light that would otherwise reach the valley, providing warmth during storms. Every day its keeper must release the physical lock so the light can return. Left closed too long, pressure rises and more and more light is drawn in.

The newer page is separate from the booklet. These are Lumi's own notes. Between the lines you find temperature readings and Shinx's rest periods. She has not stopped paying attention. She has become too frightened to stop.

The booklet describes three ancient rings: Sky, Heart, and Earth. None offers a magical cure. Each requires a safe source of warmth before the lock is opened.

**Valg / Choices and state:**

- Kopier reglene om de tre ringene / Copy the three rings' rules: `SET knows_rings`; GOTO S19.
- Let etter skjult informasjon med linsen / Search with lens (`IF crescent_lens`): `SET map_fragment_2`; GOTO S19.
- Les Lumis temperaturjournal / Read Lumi's temperature log: `SET knows_shinx_care`; GOTO S19.

---

## S19 · Miras hemmelighet, én gang til / Mira’s Secret, Once More

### Norsk

Bak en glassrute i arkivet ligger et gulnet vedlikeholdsbrev, skrevet av Mira for mange år siden: «Rekkverk løst. Steng trappen før noen skades.» Under står en annen håndskrift: «Reparasjon utsatt.» Du merker deg begge deler. Mira advarte altså om en fare, men fulgte ikke opp da ingen svarte.

Talerøret knitrer. «Jeg trodde jeg hadde gjort nok da jeg leverte brevet», sier Mira fra forsyningsverandaen. «Og etter ulykken klippet jeg tårnet ut av kartet. Det gjorde bare hjelpen vanskeligere.»

«Du kan ikke endre det», sier du. «Men du kan hjelpe oss nå.»

«Det er det jeg prøver på.» Gjennom vinduet ser du frivillige bære kasser inn under tak. Forsyningene er på plass: steiner som kan varmes, tepper, en kurv, lykter og en liste over dem som har tilbudt seg å hjelpe. Mira kommer ikke opp trappen; hun organiserer dem som trenger henne nede i dalen.

Du velger hvilken forberedelse dere undersøker først. Å se på utstyret gjør det **ikke** automatisk klart.

### English

Behind glass in the archive lies an old maintenance letter, written by Mira years ago: “Railing loose. Close the stairs before someone gets hurt.” Below it, in another hand: “Repair postponed.” You take note of both lines. Mira had warned someone, but she did not follow up when no one answered.

The speaking tube crackles. “I thought sending the letter was enough,” Mira says from the supply porch. “After the accident, I cut the tower off the map. That only made help harder to reach.”

“You can't change that,” you say. “But you can help us now.”

“I'm trying.” Through the window, you see volunteers carrying crates under shelter. Supplies are here: stones to heat, blankets, a basket, lanterns, and the names of people willing to help. Mira does not climb the stairs; she coordinates everyone who needs her below.

You choose which plan to investigate first. **Looking** at supplies does not mean the plan is ready.

**Valg / Choices and state:**
- Utforsk tidligere steder / Return through valley: GOTO Q_RETURN; RETURN S22.
- Undersøk kurven / Inspect basket: `SET inspected_sky`; GOTO S20. Preparation later via Q_PREP.
- Undersøk vaktlisten / Inspect watch roster: `SET inspected_heart`; GOTO S20.
- Undersøk jordpotten / Inspect Earth pot: `SET inspected_earth`; GOTO S20.

## S20 · Den siste trappen / The Final Stair

### Norsk

Den øverste trappen er fremdeles skadet. Her falt Shinx en gang. Nå løsner en stein under din egen fot. Partneren din griper deg akkurat tidsnok.

På veggen henger et gult skjerf med navnemerke: SHINX. Litt lenger fremme ligger en annen knute av gul tråd i en sprekk. Bildet fra skogen får plutselig en annen betydning. De var to venner, ikke én redningsmann og én som måtte reddes.

Bak den lukkede døren hører du bevegelse. «Hvem er der?» spør en stemme.

«Vi kommer fra Willowbrook,» svarer du.

«Gå tilbake.» Stemmen er liten, men bestemt. «Jeg kan ikke åpne. Han trenger varmen.»

Du setter deg ned på den kalde trappen. «Da skal vi ikke ta den fra ham,» sier du. «Først skal vi høre hva han selv vil.»

### English

The upper stair is still damaged. This is where Shinx once fell. Now a stone slips beneath your own foot. Your partner catches you just in time.

On the wall hangs a yellow scarf with a name tag: SHINX. A little farther along, another knot of yellow thread is wedged in a crack. The photograph from the woods suddenly means something else. They were two friends—not one rescuer and someone who needed rescuing.

Behind the closed door you hear movement. “Who's there?” asks a voice.

“We've come from Willowbrook,” you answer.

“Go back.” The voice is small but firm. “I can't open it. He needs the heat.”

You sit on the cold stair. “Then we won't take it from him,” you say. “First, we need to hear what he wants.”

**Valg / Choices and state:**

- Vis fotografiet eller brevet (`IF photo_lumi_shinx OR compassionate_letter`) / Show photo or read letter: `SET lumi_open_to_talk`; GOTO S21.
- Fortell hva du fant i boken / Explain the old book: `SET lumi_knows_pressure`; GOTO S21.
- Spør Shinx direkte gjennom døren / Ask Shinx through the door: `SET asked_shinx`; GOTO S21.

---

## S21 · Den som holdt lyset tilbake / The One Who Held Back the Light

### Norsk

Den smale inspeksjonsluken åpner seg. En Clefairy ser på deg med øyne som ikke har sovet ordentlig på flere netter. «Jeg heter Lumi,» sier hun. «Jeg stengte låsen.»

Bak henne står Stjernelysglasset: en enorm kuppel med hele dalens stjernelys fanget i en virvlende, sølvhvit storm. Ved siden av ovnen ligger Shinx, våken, men sliten. Han blunker til deg.

«Hun er veldig flink til å ordne tepper,» sier han. «Litt mindre flink til å høre når jeg sier at fire er nok.»

Lumi smiler, og smilet blir borte. «Jeg trodde vi bare trengte én natt. Så ville han bli sterkere. Men neste natt var han fortsatt svak, og jeg kunne ikke få meg til å åpne.»

Du forteller om blomster som sluknet, lykter som ble kalde og skogen som ble stille. Lumi ser på lyset i glasset. «Jeg visste at det var galt,» sier hun. «Jeg visste bare ikke hvordan jeg skulle gjøre det riktig.»

### English

The narrow inspection hatch opens. A Clefairy watches you with eyes that have barely slept for days. “My name is Lumi,” she says. “I closed the lock.”

Behind her rises Starlight Glass: a huge dome filled with the valley's captured starlight, a swirling silver-white storm. Beside the stove lies Shinx, awake but tired. He gives you a wink.

“She's very good at arranging blankets,” he says. “Not quite as good at listening when I tell her four is enough.”

Lumi smiles, and the smile fades. “I thought we needed only one night. He'd be stronger by morning. But the next night he was still weak, and I couldn't make myself open it.”

You tell her about the dark flowers, the cooling lanterns, and the silent forest. Lumi looks toward the light trapped in the glass. “I knew it was wrong,” she says. “I just didn't know how to make it right.”

**Valg / Choices and state:**

- Lytt før du foreslår løsninger / Listen before proposing plans: `SET lumi_trust, moon_kindness`; GOTO S22.
- Forklar konkrete farer uten å klandre / Explain risks without blame: `SET lumi_informed`; GOTO S22.

---

## S22 · Shinx får bestemme / Shinx Gets a Say

### Norsk

«Jeg vil være varm,» sier Shinx. «Men jeg vil ikke at hele dalen skal fryse for min skyld.»

Lumi setter seg ved siden av ham. «Når jeg åpner låsen, kan ovnen miste varmen.»

«Da trenger vi en plan som fungerer *før* du åpner,» sier Shinx. «Og jeg vil vite hvor jeg skal være. Ikke bestem over hodet på meg.»

Du viser bare løsninger som er undersøkt og **faktisk klargjort**. Ved himmelveien har dere prøvd kurven og pakket steinene i flere lag så de ikke kan svi ham. Ved hjerteveien har to navngitte frivillige sagt ja til vakt, og lyktene er testet. Ved jordveien har dere lest instruksjonen, varmet jorden og gjort en reservevarmekilde klar mens planten får tid til å spire.

«Jeg kan si ja til mer enn én plan,» sier Shinx. «Men jeg vil velge hvilken vi bruker når vi vet at den virker.»

### English

“I want to stay warm,” says Shinx. “But I don't want the whole valley to freeze because of me.”

Lumi sits beside him. “When I open the lock, the stove could lose its heat.”

“Then we need something that works *before* you open it,” says Shinx. “And I want to know where I'll be. Don't decide over my head.”

You show him only the solutions you have examined and **actually prepared**. For Sky, the basket has been tested and the stones wrapped in layers that cannot burn him. For Heart, two named volunteers have agreed to take shifts and the lanterns have been tested. For Earth, you have read the instructions, warmed the soil, and prepared a backup heater while the plant takes time to sprout.

“I can agree to more than one,” says Shinx. “But I want to choose which one we use when we know it works.”

**Valg / Choices and state:**
- Beskriv trygg kurv / Explain safe basket (`IF warmth_sky_ready`): `SET shinx_consents_sky`; GOTO S23.
- Beskriv vaktplanen / Explain watch plan (`IF warmth_heart_ready`): `SET shinx_consents_heart`; GOTO S23.
- Beskriv jordplanen og reservevarmen / Explain Earth plan and backup heat (`IF earth_pot_found AND earth_backup_ready AND silver_seed`): `SET shinx_consents_earth`; GOTO S23.
- Skaff nødvendig utstyr / Gather supplies (`IF NOT any valid consent`): GOTO Q_PREP; RETURN S22.
- Endre mening / Reconsider plans (`IF any valid consent`): GOTO Q_PREP; RETURN S22. Consent is never inferred from silence.

## S23 · Glasset begynner å sprekke / The Glass Begins to Crack

### Norsk

En sprekk av hvitt lys løper gjennom kuppelen. Den gamle klokken slår én gang uten at noen rører den. På veggen synker den røde nålen mot et felt merket *siste sikre åpning*.

«Vi har ikke lenge igjen,» sier Lumi.

Du ber henne vente akkurat lenge nok til å kontrollere planen. Under et teppe ligger de innpakkede steinene klare, eller to frivillige har tent og prøvd lyktene, eller en varm reserveovn står ved den tilberedte jordpotten. Bare det som virkelig er forberedt, beskrives. Shinx kjenner selv på varmen. Han nikker hvis løsningen er trygg.

«Jeg er redd,» hvisker Lumi.

«Det kan du være,» sier Shinx. «Bare hør etter når jeg sier at jeg er klar.»

Dere går sammen bort til de tre ringene. **Ingen lås er åpnet ennå. Ingen frø er plantet ennå.**

### English

A white crack of light darts through the dome. The ancient bell tolls once though no one has touched it. On the wall, the red needle sinks toward a section labeled *last safe release*.

“We don't have much time,” says Lumi.

You ask her to wait just long enough to check the plan. Beneath a blanket lie properly wrapped warm stones, or two volunteers have lit and tested the lanterns, or a warm backup heater stands beside the prepared Earth pot. Only what you actually prepared is described. Shinx feels the warmth himself. He nods if the plan is safe.

“I'm frightened,” Lumi whispers.

“You can be,” says Shinx. “Just listen when I tell you I'm ready.”

Together you approach the three rings. **No lock has opened yet. No seed has been planted yet.**

**Valg / Choices and state:**
- Gå til ringene / Approach rings (`IF any prepared-and-consented plan`): GOTO S24.
- Undersøk dalen igjen / Revisit the valley (`IF NOT release_done`): GOTO Q_RETURN; return to S22. This remains possible until committing to a route in S24.
- Kontroller utstyret igjen / Check equipment (`IF TRUE`): GOTO Q_PREP; RETURN S22. No release.

## S24 · Det virkelige valget / The Choice That Matters

### Norsk

Tre ringer er risset inn i gulvet. Himmelringen peker mot bærekurven; Hjerteringen mot de ventende vaktene; Jordringen mot potten ved ovnen. Hvilke tegn som lyser, avhenger av hva du faktisk har ordnet.

«Du får ikke bare velge et pent symbol», sier Shinx. «Du må velge den løsningen som kan holde meg varm.»

Du ser mot Lumi. Hånden hennes hviler over vokterlåsen. Hun venter på *ditt valg* og *Shinx' bekreftelse*. Dere må først sette den konkrete varmeplanen i drift. **Deretter** kan hun løsne låsen.

### English

Three rings are carved into the floor. Sky points toward the carrying basket, Heart toward the waiting volunteers, and Earth toward the pot beside the stove. Only the signs you have truly prepared are lit.

“You can't just choose a pretty symbol,” says Shinx. “You have to choose the way that will keep me warm.”

You look at Lumi. Her hand hovers above the keeper's lock. She waits for *your choice* and *Shinx's confirmation*. You must first put the chosen warmth plan into operation. **Only then** may she release the lock.

**Valg / Choices and state:**
- Himmelveien / Sky (`IF warmth_sky_ready AND shinx_consents_sky`): `SET chosen_route=sky`; GOTO E_DAWN (`IF NOT (helped_altaria AND mira_trust)`) ELSE E_AURORA.
- Hjerteveien / Heart (`IF warmth_heart_ready AND shinx_consents_heart`): `SET chosen_route=heart`; GOTO E_LANTERN (`IF NOT know_old_verse`) ELSE E_SONG.
- Jordveien / Earth (`IF earth_pot_found AND earth_backup_ready AND silver_seed AND shinx_consents_earth`): `SET chosen_route=earth`; GOTO E_GARDEN (`IF NOT (helped_altaria AND knows_shinx_care)`) ELSE E_SANCTUARY.
- Prøv en annen løsning / Reconsider (`IF TRUE`): GOTO Q_PREP; RETURN S22. **No release occurs in S24.**

**Felles transaksjon i E-scener / Common transaction in endings:** `IF release_done==false`: (1) execute route-specific setup, (2) Shinx confirms warmth, (3) Lumi manually unlocks, (4) light returns, (5) `SET release_done`; never repeat on reload. For Earth `USE silver_seed` once at planting, not before. For Sky/Heart seed is planted once **after** release. `main_complete` becomes true after S25, not here.

## S25 · En himmel som husker / A Sky That Remembers

### Norsk

[IF release_done] Fra fjellet ser du at stjernelyset vender tilbake til Willowbrook. Først blir én mørklagt blomst sølvfarget. Så tennes vindu etter vindu. Stjernene har hele tiden vært der – det er lyset deres som igjen finner frem til dalen.

På torget står Mira med et reparert kart i hendene. «Ingen hull denne gangen», sier hun. Et øyeblikk er hun stille før hun legger til: «Og ingen hemmeligheter når det gjelder sikkerheten.»

[IF rescued_pikachu] Pikachu kommer til syne ved stien. [ELSE IF pikachu_help_sent] En av Miras hjelpere vinker: «Pikachu er trygt hjemme!» [ELSE] Den gamle lyktestolpen er nå stille.

[IF hoothoot_nest] Hoothoot vender tilbake til et trygt rede. [ELSE] En vakt legger et nytt feste under Hoothoots grein mens dere ser på.

[IF helped_altaria] Altaria kretser over tårnet sammen med hele flokken. [ELSE] Et fjernt rop forteller at Altaria fortsatt leter; Mira lover å sende et letemannskap.

Lumi blir ved Shinx, som ennå trenger ro og oppfølging. Partneren din lener seg mot deg. Eventyret er over, men et uvanlig skinn danser på innsiden av kartet ditt dersom du oppdaget dalens aller eldste hemmeligheter.

### English

[IF release_done] From the mountain you watch starlight return to Willowbrook. First a darkened flower becomes silver again. Then window after window shines. The stars were there all along—their light has finally found its way back to the valley.

In the square, Mira holds a repaired map. “No holes this time,” she says. After a quiet moment she adds, “And no more secrets when safety is at stake.”

[IF rescued_pikachu] Pikachu appears on the trail. [ELSE IF pikachu_help_sent] One of Mira's helpers waves. “Pikachu is safe at home!” [ELSE] The old lantern post stands silent now.

[IF hoothoot_nest] Hoothoot returns to a secure nest. [ELSE] A helper fastens a new support beneath Hoothoot's branch while you watch.

[IF helped_altaria] Altaria circles the tower with her whole flock. [ELSE] A distant call tells you Altaria is still searching; Mira promises to send a search party.

Lumi stays beside Shinx, who still needs rest and care. Your partner leans against you. The adventure is over, but an unusual shimmer dances inside your map if you uncovered the valley's oldest secrets.

**Før valgene beregnes / Recalculate before choices:** `moon_unlock = rescue_square && hoothoot_nest && helped_altaria && gastly_friend && (compassionate_letter || (lumi_trust && island_promise)) && moon_sig_1 && moon_sig_2 && moon_sig_3`; `sun_unlock = rescued_pikachu && rescued_lapras && helped_psyduck && helped_altaria && bridge_repaired && leadership`; `both_unlock = moon_unlock && sun_unlock && secret_star_map`. These are derived booleans, not independently granted collectibles; rerun on S25 entrance and on save restoration.

**Valg / Choices and state:**
- Fullfør hovedhistorien / Complete main story: `SET main_complete` once and end.
- Undersøk det siste glimtet / Examine last glimmer (`IF moon_unlock OR sun_unlock`): `SET main_complete`; GOTO B_GATE.
**Invariant:** `S25` requires `release_done`. Display only conditional companion epilogue branches.

# SIDEHANDLINGER / OPTIONAL QUESTS

Disse sidehandlingene kan legges ved angitte scenegrenser, med tilbakekomst til hovedruten. De er ikke bare avkrysningsoppgaver: hver inneholder en faktisk handling og en senere virkning.

## Q_PREP · Forsyningsverandaen / The Supply Porch
**Tilgjengelig fra S19 til S24 / Available from S19 through S24. Return to S22 unless opening from S19 (then S20).**

### Norsk

Mira har merket forsyningskassen med tre tegn. «Du kan klargjøre mer enn én løsning», sier hun gjennom talerøret. «Men prøv dem. Sjekk varmen. Og spør Shinx hva han vil.»

**Himmel:** Du varmer fire steiner, svøper dem i stoff og legger dem under en falsk bunn i kurven. Partneren din tester avstanden med en pote. «Ikke for varmt, ikke for kaldt.» En av hjelperne viser hvordan kurven kan bæres uten at Shinx ristes.

**Hjerte:** Du spør to frivillige om de faktisk kan ta hver sin vakt. Begge svarer ja. Dere tenner lyktene og måler om rommet holder jevn varme også når én lykt slukkes. «Da tar jeg over», sier den andre vakten og viser deg reserveoljen.

**Jord:** I arkivet står det at sølvfrøet kan holde på eksisterende varme når det slår rot – men ikke skape varme fra ingenting. Du varmer jorden, fyller en liten reserveovn og plasserer et teppe ved siden av potten. «Frøet må få tid», sier du. «Shinx skal ikke måtte vente i kulden mens vi håper.»

### English

Mira has marked the supply chest with three signs. “You can prepare more than one option,” she says through the speaking tube. “But test them. Check the heat. And ask Shinx what he wants.”

**Sky:** You heat four stones, wrap them in cloth, and place them beneath a false bottom in the basket. Your partner tests the distance with a paw. “Not too hot, not too cold.” A helper shows how to carry the basket without jostling Shinx.

**Heart:** You ask two volunteers whether they can genuinely take a shift each. Both agree. You light the lanterns and check that the room stays warm even when one lantern goes out. “Then I take over,” says the second watcher, showing you the spare oil.

**Earth:** The archive says the silver seed can retain existing warmth once rooted—but it cannot create warmth from nothing. You warm the soil, fuel a small backup heater, and place a blanket beside the pot. “The seed needs time,” you say. “Shinx mustn't freeze while we're hoping it works.”

**Handlinger / Actions:**
- Klargjør Himmel / Prepare Sky (`IF NOT warmth_sky_ready`): `SET warmth_sky_ready`; return.
- Klargjør Hjerte / Prepare Heart (`IF NOT warmth_heart_ready`): `SET warmth_heart_ready`; return.
- Klargjør Jord / Prepare Earth (`IF silver_seed AND NOT earth_pot_found`): `SET earth_pot_found, earth_backup_ready`; return.
- Reparer ekstra lys / Test Earth backup (`IF earth_pot_found AND NOT earth_backup_ready`): `SET earth_backup_ready`; return.
- Gå til Shinx / Return to Shinx (`IF any prepared route`): GOTO S22. If no route prepared, first preparation remains accessible. Each option is repeat-safe; no duplicated items.

## Q_RETURN · Siste runde gjennom dalen / One Last Journey Through the Valley
**Åpnes mellom S18 og S23 / Available from S18 through S23. Each task is a separate scene, not an automatic montage.**

### Norsk

Mira har tegnet små sirkler rundt steder som trenger hjelp. «Vi kan gjøre én runde til før vi åpner Glasset,» sier hun gjennom talerøret. «Du velger hvor vi går; jeg sørger for sikker transport.» En kabelkurv tar deg til elven og den merkede stien mot skogen. Hver tur tar tid; i det fjerne høres tårnklokken slå, men ingen blir låst ute av hovedhistorien.

### English

Mira has circled places that may still need help. “We can make one more round before opening the Glass,” she says through the speaking tube. “You choose where we go; I'll arrange safe transport.” A cable basket carries you to the river and the marked forest trail. Each trip takes time; you hear the tower bell in the distance, but no player is locked out of the main story.

**Meny / Menu (recalculate after every return):**
- Willowbrook (`IF NOT rescue_square`): GOTO Q_VILLAGE.
- Pikachu (`IF NOT rescued_pikachu`): GOTO Q_PIKACHU.
- Hoothoot (`IF NOT hoothoot_nest`): GOTO Q_HOOTHOOT.
- Lapras (`IF NOT rescued_lapras`): GOTO Q_LAPRAS.
- Psyduck (`IF NOT helped_psyduck`): GOTO Q_PSYDUCK.
- Bridge (`IF NOT bridge_repaired`): GOTO Q_BRIDGE.
- Altaria (`IF NOT helped_altaria`): GOTO Q_ALTARIA.
- Gastly (`IF NOT gastly_friend`): GOTO Q_GASTLY.
- Lead a volunteer team (`IF NOT leadership`): GOTO Q_LEAD.
- Forest sky mark (`IF NOT moon_sig_1`): GOTO Q_MOON1.
- Camp sky mark (`IF NOT moon_sig_2 AND crescent_lens`): GOTO Q_MOON2.
- Island sky mark (`IF NOT moon_sig_3 AND crescent_lens`): GOTO Q_MOON3.
- Stjernekartet / Secret star map (`IF map_fragment_1 AND map_fragment_2 AND moon_sig_3 AND silver_seed AND crescent_lens AND NOT secret_star_map`): GOTO Q_STAR.
- Arkivets kartdel / Archive map fragment (`IF crescent_lens AND NOT map_fragment_2`): GOTO Q_ARCHIVE.
- Skriv brevet / Write a letter (`IF NOT compassionate_letter AND NOT (lumi_trust AND island_promise)`): GOTO Q_RECONCILE.
- Finish return trip / Avslutt runden: GOTO S22. No quest automatically completes any other.


## Q_RECONCILE · Brevet du ikke skrev / The Letter You Never Wrote
**Tilgjengelig fra Q_RETURN dersom `NOT compassionate_letter AND NOT (lumi_trust AND island_promise)`; kan bare fullføres én gang. / Available from Q_RETURN if neither empathy route is completed; once only.**

**Norsk:** På et arbeidsbord i forsyningsrommet ligger et blankt papir. Du husker sporene etter Lumi: en varm stein, et slitt teppe og et lite avtrykk fra Shinx' pote. Først hadde du trodd dette var spor etter en tyv. Nå vet du bedre. Du skriver langsomt: «Jeg vet at du prøvde å hjelpe. Vi kommer ikke for å ta fra Shinx varmen. Vi kommer for å finne en bedre måte sammen.» Du lar Mira lese brevet. «Det skulle jeg ha skrevet for lenge siden», sier hun. Hun sender det opp gjennom talerøret, og du hører Lumi lese det stille for Shinx.

**English:** A blank sheet of paper lies on the supply-room desk. You remember the traces Lumi left: a warm stone, a threadbare blanket, and a small print from Shinx's paw. At first you thought they belonged to a thief. Now you know better. Slowly you write: “I know you were trying to help. We aren't coming to take away Shinx's warmth. We're coming to find a better way together.” Mira reads the letter. “I should have written that long ago,” she says. She sends it through the speaking tube, and you hear Lumi read it softly to Shinx.

- Send brevet / Send the letter: `SET compassionate_letter, moon_kindness`; RETURN Q_RETURN. No trust is automatically awarded; Lumi's subsequent response is earned in S21.

## Q_ARCHIVE · Arkivets skjulte side / The Hidden Archive Page
**Norsk:** Du vender linsen mot bokryggen med de tre ringene. I margen dukker en stjernefigur frem, som du tegner av før du legger boken tilbake.
**English:** You hold the lens against the spine of the book about the three rings. A constellation appears in the margin; you copy it before returning the book.
- Tegn av / Copy: `SET map_fragment_2`; RETURN Q_RETURN.

## Q_VILLAGE · Lyktestativet / The Lantern Stand
**Norsk:** Eevee står ved stativet; Pichu forsøker å vikle et snøre ut av en lykt. Du får begge ned, pakker bort snøret og viser dem hvor de kan gå dersom mørket kommer tilbake. Eevee dytter en liten lykt mot deg.
**English:** Eevee stands beside the lantern stand; Pichu is trying to untangle a cord inside a lantern. You help both down, put the cord away, and show them a safe place if the darkness returns. Eevee nudges a small lantern toward you.
- Hjelp begge / Help both: `SET rescue_square, rescue_count+1, moon_kindness`; RETURN Q_RETURN.

## Q_PIKACHU · Eføyen igjen / Ivy Again
**Norsk:** Pikachu sitter fortsatt fast, eller er akkurat i ferd med å bli hjulpet av Miras frivillige dersom du sendte beskjed. Du dekker lampen før dere løsner røttene. «Pika!» Den rister potene fri og velger selv å bli med hjelperne. Pikachu blir ikke automatisk reisefølge nå.
**English:** Pikachu is still trapped—or Mira's volunteers have just arrived if you sent word. You cover the lamp before loosening the roots. “Pika!” It shakes its paws free and chooses to go with the helpers. Pikachu does not automatically become a companion now.
- Hjelp trygt / Rescue safely: `SET rescued_pikachu, rescue_count+1, sun_rescue_1`; RETURN Q_RETURN. `pikachu_help_sent` remains historical.

## Q_HOOTHOOT · Redet i vinden / Nest in the Wind
**Norsk:** Hoothoot sperrer opp øynene når den samme greinen knaker. Du og partneren legger bark under festet og kontrollerer egget. Hoothoot legger én blank stein ved føttene dine som takk.
**English:** Hoothoot's eyes widen as the branch creaks again. You and your partner wedge bark under the support and check the egg. In thanks, Hoothoot places a polished stone at your feet.
- Sikre redet / Secure nest: `SET hoothoot_nest, rescue_count+1, moon_kindness`; RETURN Q_RETURN.

## Q_LAPRAS · Snoren i elven / Cord in the River
**Norsk:** Lapras holder finnen helt stille mens du løsner snoren med en glatt pinne. Når den kan svømme fritt igjen, lar den deg prøve en kort, trygg tur langs bredden.
**English:** Lapras holds its fin perfectly still as you loosen the cord with a smooth stick. Once free, it gives you a short, safe ride along the bank.
- Frigjør finnen / Free the fin: `SET rescued_lapras, rescue_count+1, sun_rescue_2`; RETURN Q_RETURN.

## Q_PSYDUCK · Et hjul på plass / A Wheel in Place
**Norsk:** «Ikke alt på én gang», sier du til Psyduck. «Først akslingen. Så mutteren.» Psyduck klarer siste skritt selv. Kabelkurven kjører jevnt, og Psyduck smiler bredt.
**English:** “Not everything at once,” you tell Psyduck. “First the axle. Then the nut.” Psyduck completes the final step itself. The cable basket runs smoothly and Psyduck beams.
- Hjelp Psyduck / Help Psyduck: `SET helped_psyduck, sun_rescue_3, rescue_count+1` only if not already counted; RETURN Q_RETURN.

## Q_BRIDGE · Tau over strømmen / Rope Across the Current
**Norsk:** Tauet i brokassen er tørt. Du knyter det til de friske stolpene, lar partneren prøve festene og setter opp et skilt for dem som kommer etter. Broen kan brukes igjen.
**English:** The rope in the bridge toolbox is dry. You fasten it to sound posts, have your partner test the knots, and hang a warning sign for those who follow. The bridge is passable again.
- Sikre broen / Secure bridge: `SET bridge_repaired`; RETURN Q_RETURN.

## Q_ALTARIA · Den savnede ungen / The Missing Chick
**Norsk:** Under en rot hører du et pip. En Altaria-unge sitter klemt mellom to steiner. Du løfter forsiktig, mens partneren støtter rota. Altaria finner ungen og lar en løs fjær falle ved føttene dine.
**English:** A peep comes from under a root. An Altaria chick is wedged between two stones. You lift carefully as your partner braces the root. Altaria finds its chick and lets a loose feather fall at your feet.
- Gjenforen flokken / Reunite flock: `SET helped_altaria, moon_kindness, rescue_count+1; GET altaria_feather`; RETURN Q_RETURN.

## Q_GASTLY · Den siste historien / One Last Story
**Norsk:** Gastly har ventet ved hulen. «De fleste løper videre», sier den. Du setter deg og lytter. Før du går, lærer den deg verset om vaktskifte: «Dyp, lys, dyp.»
**English:** Gastly waits beside the cave. “Most people rush on,” it says. You sit and listen. Before you leave, it teaches you the shift-changing verse: “Low, high, low.”
- Lytt / Listen: `SET gastly_friend, moon_kindness, know_old_verse`; RETURN Q_RETURN.

## Q_LEAD · Lyskjeden / The Lantern Chain
**Norsk:** Du fordeler oppgavene: én legger ut tau, én bærer tepper, og én holder forbindelsen med Mira. «Ingen behøver gjøre alt», sier du. Hjelperne klarer turen tilbake sammen.
**English:** You divide the jobs: one helper lays out rope, another carries blankets, and a third stays in touch with Mira. “Nobody has to do everything,” you say. Together the volunteers complete the return journey.
- Led laget / Lead team: `SET leadership`; RETURN Q_RETURN.

## Q_MOON1 · Steinringen / The Stone Circle
**Norsk:** I Moonwood vender du tilbake til steinene og legger symbolene i riktig årstidsrekkefølge. Den fjerde steinen kaster en sølvskygge på kartet. Du tegner av tegnet.
**English:** Back in Moonwood, you arrange the stones in the correct seasonal order. The fourth stone casts a silver shadow on your map. You copy the sign.
- Løs mønster / Solve pattern: `SET moon_sig_1, forest_clue`; RETURN Q_RETURN.

## Q_MOON2 · Koppen med tegn / The Marked Cup
**Norsk:** Med halvmånelinsen ser du de små stjernepunktene på koppen. De blir til første del av et mønster når du tegner dem over på kartet.
**English:** Through the crescent lens, you see tiny stars scratched into the cup. They form the first part of a pattern as you copy them onto your map.
- Undersøk koppen / Examine cup: `SET map_fragment_1, moon_sig_2`; RETURN Q_RETURN.

## Q_MOON3 · Øyas minne / The Island's Memory
**Norsk:** Du holder linsen over minneplaten og ser månetegnet som først var skjult av vann. Du tegner det av. Månerunen ligger fortsatt der den ble funnet; du tar den med dersom du mangler den.
**English:** Holding the lens above the memory stone reveals a moon sign once hidden by water. You copy it. The moon rune is still where it was found; you take it if you lack it.
- Undersøk platen / Study stone: `SET moon_sig_3, know_accident; GET moon_rune IF absent`; RETURN Q_RETURN.

## Q_STAR · Den hemmelige kartgåten / The Secret Star-Map Puzzle
**Tilgjengelig før S24 ved forsyningsverandaen, når `map_fragment_1 AND map_fragment_2 AND moon_sig_3 AND silver_seed AND crescent_lens`; never available after the seed is planted.**

**Norsk.** Når du legger linsen over tegningene fra koppen og arkivet, oppdager du at de tre delene ikke viser steder. De viser tider: det siste lyset før soloppgang, den første skyggen etter solnedgang og øyeblikket da begge møtes i glasset. På baksiden av Miras kart er en tom sirkel. Du holder sølvfrøet over den uten å plante det. Et nytt stjernebilde blir synlig: to store skikkelser på hver sin side av en dør.

**English.** When you lay the lens over the drawings from the cup and the archive, you discover that the three pieces do not show places. They show times: the last light before dawn, the first shadow after sunset, and the moment both meet inside the glass. An empty circle is drawn on the back of Mira's map. You hold the silver seed over it without planting it. A new constellation appears: two vast figures facing one another across a door.

- Løs mønsteret / Solve pattern: `SET secret_star_map`; RETURN Q_RETURN or S22. Ingen legendestatus gis her / Legendary routes not awarded here.

# SEKS HOVEDAVSLUTNINGER / SIX MAIN ENDINGS

Hver avslutning følger bare én valgt ring. Ved Himmel avgjør `helped_altaria AND mira_trust` mellom Dawn og Aurora; ved Hjerte avgjør `know_old_verse` mellom Lantern og Song; ved Jord avgjør `helped_altaria AND knows_shinx_care` mellom Garden og Sanctuary. Alle startere kan nå alle seks. Hvis frøet ikke er plantet i jordruten, plantes det **én gang i epilogen** på den angitte plassen. Deretter følges S25 med en dynamisk oppsummering av faktisk valgte handlinger. / Exactly one chosen ring determines one ending. The seed is planted once, either during Earth resolution or later as described; never duplicated.

## E_DAWN · Den første morgenen / The First Morning

**Betingelser / Conditions:** `warmth_sky_ready AND shinx_consents_sky AND NOT (helped_altaria AND mira_trust)`; on this Sky/Heart route plant the seed exactly once after release (`USE silver_seed` in this ending); Earth alone consumes the seed before release.

### Norsk

Du setter kurven i det lune hvilerommet og lar Shinx kjenne de innpakkede steinene. «Ja», sier han. «Dette er varmt nok.» Først nå gir du Lumi signal. Hun løsner vokterlåsen, og lyset strømmer tilbake til himmelen. Shinx ligger trygt i kurven mens dere følger nøye med på varmen.

Kurven gynger forsiktig idet den blir løftet ned til det lune hvilerommet ved observatoriet. Mira har lagt et tykt skjerf rundt kanten. Lumi kjenner på steinene og nikker. «Varmen holder.» Shinx legger hodet på skrå. «Jeg sa jo at en kurv var bedre enn et fjell av tepper.»

Over Willowbrook løfter morgenlyset seg. Dere planter sølvfrøet i Miras vinduskasse, ikke for å lage en ny varmekilde, men som et minne om natten dere hjalp hverandre. Det slår rot som en vanlig sølvskimrende plante etter at krisen er over. Shinx hviler, og Mira lover aldri mer å skjule en farlig vei ved å klippe den ut av kartet.

### English

You settle the basket in the sheltered resting room and let Shinx feel the wrapped stones. “Yes,” he says. “This is warm enough.” Only now do you signal Lumi. She releases the keeper’s lock, and the light streams back into the sky. Shinx rests safely in the basket as you keep checking the warmth.

The basket sways gently as it is lowered into the warm resting room beside the observatory. Mira has lined the rim with a thick scarf. Lumi checks the stones and nods. “The heat is holding.” Shinx tilts his head. “See? A basket is better than a mountain of blankets.”

Morning rises above Willowbrook. You plant the silver seed in Mira's window box—not as a new heat source, but as a reminder of the night you helped one another. Once the crisis is over, it takes root as an ordinary silver-shimmering plant. Shinx rests, and Mira promises never again to hide a dangerous road by cutting it out of a map.

**Neste / Next:** GOTO S25; `SET ending_dawn`.

## E_AURORA · Nordlyset over tårnet / Aurora Above the Tower

**Betingelser / Conditions:** `warmth_sky_ready AND shinx_consents_sky AND helped_altaria AND mira_trust`; on this Sky/Heart route plant the seed exactly once after release (`USE silver_seed` in this ending); Earth alone consumes the seed before release.

### Norsk

Du setter kurven i det lune hvilerommet og lar Shinx kjenne de innpakkede steinene. «Ja», sier han. «Dette er varmt nok.» Først nå gir du Lumi signal. Hun løsner vokterlåsen, og lyset strømmer tilbake til himmelen. Shinx ligger trygt i kurven mens dere følger nøye med på varmen.

Altarias fjær ligger rundt de varme steinene i kurven. Hver gang vinden trenger inn gjennom vinduet, holder fjæren varmen litt lenger. Altaria selv flyr en rolig runde rundt tårnet og viser Miras hjelpere den tryggeste veien ned.

Stjernelyset strømmer over fjellet i brede bånd. «Det ser ut som himmelen maler,» hvisker Shinx. Han blir i hvilerommet til kreftene vender gradvis tilbake. Sølvfrøet plantes i potten ved Miras hvilerom. Den er et tegn på at et godt resultat kom av flere små, omhyggelige valg.

### English

You settle the basket in the sheltered resting room and let Shinx feel the wrapped stones. “Yes,” he says. “This is warm enough.” Only now do you signal Lumi. She releases the keeper’s lock, and the light streams back into the sky. Shinx rests safely in the basket as you keep checking the warmth.

Altaria's feather wraps around the warm stones in the basket. Whenever wind slips through the window, it holds the warmth a little longer. Altaria itself circles the tower calmly, showing Mira's helpers the safest way down.

Starlight streams over the mountain in wide ribbons. “It's like the sky is painting,” Shinx whispers. He stays in the resting room until his strength slowly returns. The silver seed is planted in a pot beside Mira's resting room—a reminder that a good ending can grow from many small, careful choices.

**Neste / Next:** GOTO S25; `SET ending_aurora`.

## E_LANTERN · Lyktenes natt / The Night of Lanterns

**Betingelser / Conditions:** `warmth_heart_ready AND shinx_consents_heart AND NOT know_old_verse`; on this Sky/Heart route plant the seed exactly once after release (`USE silver_seed` in this ending); Earth alone consumes the seed before release.

### Norsk

To frivillige tar plass ved lyktene. Den første tenner reserveflammen; den andre viser hvordan varmen skal kontrolleres. Shinx prøver rommet og nikker. «Nå kan du åpne», sier han til Lumi. Hun løsner selv vokterlåsen. Stjernelyset bryter fri, mens vaktlaget holder varmen jevn.

Frivillige fra Willowbrook setter lyktene i en ring og tar vakter to og to. De passer på at Shinx' rom holder jevn varme etter at Stjernelysglasset er åpnet. Lumi setter opp en liste slik at ingen må våke alene.

Da du kommer hjem, henger den aller første festivallykten fremdeles på torget. Sølvfrøet plantes ved foten av stativet, som et løfte om at ingen skal bære hele ansvaret alene. Stjernene lyser igjen, og denne gangen er det flere som vet hvordan man holder dem synlige.

### English

Two volunteers take their places beside the lanterns. The first lights the backup flame; the second demonstrates the heat checks. Shinx tests the room and nods. “You can open it now,” he tells Lumi. She releases the keeper’s lock herself. Starlight breaks free while the watchers keep the room warm.

Volunteers from Willowbrook arrange lanterns in a circle and take shifts in pairs. They keep Shinx's room steadily warm after Starlight Glass has been opened. Lumi makes a schedule so no one has to stay awake alone.

When you return home, the very first festival lantern still hangs in the square. You plant the silver seed at the foot of its stand, a promise that no one should carry every responsibility alone. The stars shine again, and this time more people know how to keep them visible.

**Neste / Next:** GOTO S25; `SET ending_lantern`.

## E_SONG · Sangen som fant veien hjem / The Song That Found Its Way Home

**Betingelser / Conditions:** `warmth_heart_ready AND shinx_consents_heart AND know_old_verse`; on this Sky/Heart route plant the seed exactly once after release (`USE silver_seed` in this ending); Earth alone consumes the seed before release.

### Norsk

To frivillige tar plass ved lyktene. Den første tenner reserveflammen; den andre viser hvordan varmen skal kontrolleres. Shinx prøver rommet og nikker. «Nå kan du åpne», sier han til Lumi. Hun løsner selv vokterlåsen. Stjernelyset bryter fri, mens vaktlaget holder varmen jevn.

Vaktlaget følger den gamle melodien fra hulen: dyp, lys, dyp. Ikke for å helbrede Shinx, men for å huske når ovnene skal sjekkes og når neste vakt tar over. Gastly forteller en ny historie til hver som kommer.

Ved elvestien planter dere sølvfrøet mens Hoothoot passer på fra greinen over. Shinx får tid, varme og selskap. Om kvelden høres den enkle sangen fra hus til hus. Det er ingen magi i tonene, bare folk som holder det de har lovet.

### English

Two volunteers take their places beside the lanterns. The first lights the backup flame; the second demonstrates the heat checks. Shinx tests the room and nods. “You can open it now,” he tells Lumi. She releases the keeper’s lock herself. Starlight breaks free while the watchers keep the room warm.

The watch team follows the old cave tune: low, high, low. Not to heal Shinx, but to remember when to check the heaters and when the next shift begins. Gastly tells a fresh story to everyone who arrives.

You plant the silver seed beside the riverside path while Hoothoot watches from the branch overhead. Shinx has time, warmth, and company. In the evening, the simple song travels from house to house. The notes themselves are not magic; they belong to people keeping their promises.

**Neste / Next:** GOTO S25; `SET ending_song`.

## E_SANCTUARY · Vinduets lille sol / The Small Sun at the Window

**Betingelser / Conditions:** `earth_pot_found AND earth_backup_ready AND silver_seed AND shinx_consents_earth AND helped_altaria AND knows_shinx_care`; plant the one seed during Earth resolution before release, exactly once. / Plant det ene frøet før åpning, én gang.

### Norsk

Dere tenner først reserveovnen. Deretter legger du det eneste sølvfrøet i den varme potten og vanner det én gang. Spiren kommer langsomt, ikke som et trylleslag. Shinx kjenner varmen fra reserveovnen og sier: «Jeg er klar.» Først da løsner Lumi vokterlåsen. Stjernelyset vender tilbake mens dere passer på at potten og varmen holder seg stabile.

Det er vanskelig å gi slipp på det du har båret gjennom hele reisen. Partneren din legger en pote ved siden av hånden din mens dere følger med på spiren.

En sølvplante vokser sakte frem, blad for blad. Den holder på varmen fra den lille ovnen og Altarias fjær, slik at rommet kan holdes varmt i tiden etter at vokterlåsen er åpnet. Shinx følger med og sier selv når han er klar. Planen virker fordi dere har forberedt den, ikke fordi frøet kan gjøre hva som helst.

Den nye varmeplassen blir et hvilested også for andre som trenger ro. Lumi kaller det Fristedet. Det finnes bare én sølvplante, og den står her.

### English

First you light the backup heater. Then you plant the one and only silver seed in the warm pot and water it once. The shoot emerges slowly, not in a burst of magic. Shinx feels the backup heat and says, “I’m ready.” Only then does Lumi release the keeper’s lock. Starlight returns as you make sure the pot and room remain safely warm.

You place the one and only silver seed in the warm pot beside the tower window. It is hard to let go of something you've carried throughout the journey. Your partner places a paw beside your hand. You water the seed once.

A silver plant slowly unfurls, leaf by leaf. It holds warmth from the small heater and Altaria's feather, helping the room stay warm after the keeper's lock has opened. Shinx watches and tells everyone when he is ready. The plan works because you prepared it—not because the seed can do anything at all.

The new warm place becomes a resting room for others who need quiet. Lumi calls it the Sanctuary. There is only one silver plant, and it stands here.

**Neste / Next:** GOTO S25; `SET ending_sanctuary`.

## E_GARDEN · Hagen med stjernelys / The Garden of Starlight

**Betingelser / Conditions:** `earth_pot_found AND earth_backup_ready AND silver_seed AND shinx_consents_earth AND NOT (helped_altaria AND knows_shinx_care)`; plant the one seed during Earth resolution before release, exactly once. / Plant det ene frøet før åpning, én gang.

### Norsk

Dere tenner først reserveovnen. Deretter legger du det eneste sølvfrøet i den varme potten og vanner det én gang. Spiren kommer langsomt, ikke som et trylleslag. Shinx kjenner varmen fra reserveovnen og sier: «Jeg er klar.» Først da løsner Lumi vokterlåsen. Stjernelyset vender tilbake mens dere passer på at potten og varmen holder seg stabile.

Den varme potten holder spiren, og bladene tar forsiktig vare på varmen fra ovnen. Shinx hviler til han kan reise trygt med hjelp fra landsbyen.

Senere flytter dere planten til felleshagen i Willowbrook. [IF helped_psyduck] Psyduck lager et lite vanningshjul til planten. [ELSE] Dere vanner den selv og lager et enkelt skilt med stellråd. Dere flytter selve planten, ikke et nytt frø. Den vokser langsomt gjennom årstidene, mens Shinx gradvis blir sterkere. Ingen av delene skjer på et øyeblikk.

### English

First you light the backup heater. Then you plant the one and only silver seed in the warm pot and water it once. The shoot emerges slowly, not in a burst of magic. Shinx feels the backup heat and says, “I’m ready.” Only then does Lumi release the keeper’s lock. Starlight returns as you make sure the pot and room remain safely warm.

The warm pot holds the new shoot, whose first leaves gently retain warmth from the stove. Shinx rests until he can travel safely with help from the village.

Later you move the plant to Willowbrook's community garden. [IF helped_psyduck] Psyduck builds a little watering wheel for it. [ELSE] You water it yourselves and write simple care instructions on a sign. You move the same plant—not a second seed. It grows slowly through the seasons as Shinx gradually grows stronger. Neither change happens in an instant.

**Neste / Next:** GOTO S25; `SET ending_garden`.

# HEMMELIGE LEGENDARISKE RUTER / LEGENDARY SECRET ROUTES

**Hemmelige krav blir ikke vist som avkrysningsliste i spillet.** De skal oppdages gjennom spor. Lunala og Solgaleo kan *ikke* reparere verden i stedet for spilleren; møtet er en belønning etter en fullført hovedavslutning. De kan heller ikke helbrede Shinx ved magi. Ingen legendariske Pokémon kan fanges eller legges til i inventaret i denne historien.

**Måneport / Moon unlock:** `rescue_square AND hoothoot_nest AND helped_altaria AND gastly_friend AND (compassionate_letter OR (lumi_trust AND island_promise)) AND moon_sig_1 AND moon_sig_2 AND moon_sig_3` → `moon_unlock`. Pikachu kan være vakt eller følgesvenn; den må være reddet av spilleren for maksimal hjelperute. Dette er en ekstrem rute bygget på omsorg og lytting.

**Solport / Sun unlock:** `rescued_pikachu AND rescued_lapras AND helped_psyduck AND helped_altaria AND bridge_repaired AND leadership` → `sun_unlock`. `leadership` kan oppnås også gjennom ny frivillig handling på forsyningsverandaen, slik at startvalget aldri ødelegger fremtidig mulighet permanent. Dette er en ekstrem rute bygget på initiativ og samarbeid.

**Begge / Both:** `moon_unlock AND sun_unlock AND secret_star_map` → `both_unlock`. Valgfrie Q-ruter må kunne gjenbesøkes før finalen, slik at alle krav kan oppnås på én reise uten selvmotsigende engangsvalg.

## B_GATE · Døren over himmelen / The Door Beyond the Sky

### Norsk

Da du vender tilbake til det stille observatoriet etter at stjernene er kommet tilbake, ligger en tynn stripe lys over gulvet. Den følger ikke solen og heller ikke månen. Det er den samme streken du så i sølvfrøet, før frøet ble plantet. I stedet for å peke mot tårnet peker den nå mot himmelen.

I glasset vises en dør uten håndtak. Under den står et vers: «Den som bare søker lyset, finner en lampe. Den som bærer lyset for andre, finner veien bak stjernene.»

### English

When you return to the quiet observatory after the stars have come back, a thin line of light crosses the floor. It follows neither sun nor moon. It is the same line you saw in the silver seed, before the seed was planted. Instead of pointing toward the tower, it now points at the sky.

A door without a handle appears in the glass. Beneath it a verse reads: “Those who seek only light may find a lantern. Those who carry light for others may find the path beyond the stars.”

- Følg måneskinnet / Follow moonlight (`IF moon_unlock AND NOT both_unlock`): B_LUNALA.
- Følg solglimtet / Follow sunlight (`IF sun_unlock AND NOT both_unlock`): B_SOLGALEO.
- Legg hendene på begge tegn / Place hands on both symbols (`IF both_unlock`): B_BOTH.

## B_LUNALA · Nattens gave / Lunala’s Gift

### Norsk

Døren åpner seg ikke utover. Den åpner seg oppover. Taket blir til en stille nattehimmel, og mellom stjernene folder en enorm skikkelse ut vingene. Lunala svever ned uten et eneste vingeslag. Over kroppen går et lys som minner om måneskinn på vann.

Du venter på et brøl, men det kommer ingen lyd. I stedet ser du skogens minner: Eevee som fikk hjelp, Hoothoots egg som ble trygt, Altarias lille unge under roten, en ensom Gastly som endelig fikk noen å fortelle historier til. Det er som om natten selv har lagt merke til alt det små som andre kunne ha oversett.

Lunala senker hodet. En sølvfjær av lys svever ned, blir til et stjernetegn og fester seg på innsiden av kartet ditt. Ikke en gjenstand du kan bruke mot noen, men et minne som bare finnes i denne reisen.

«Var det derfor du ventet på meg?» hvisker du.

Lunala folder vingene. På et øyeblikk er nattehimmelen tilbake der den skal være. Men i kartet ditt gløder et tegn som ikke var der før.

### English

The door does not open outward. It opens upward. The roof becomes a quiet night sky, and among the stars an enormous shape unfolds its wings. Lunala descends without a single wingbeat, moonlight shimmering across its body like light on water.

You wait for a roar, but no sound comes. Instead you see the forest's memories: Eevee receiving help, Hoothoot's egg made safe, Altaria's little chick beneath the root, and a lonely Gastly finally finding someone to tell stories to. It is as though the night itself noticed all the small things others might have overlooked.

Lunala lowers its head. A silver feather of light drifts down, turns into a star-shaped symbol, and settles inside your map. Not a weapon or tool, but a memory belonging only to this journey.

“Is that why you waited for me?” you whisper.

Lunala folds its wings. In an instant the night sky is where it belongs. But inside your map, a sign glows that was not there before.

**Reward:** `SET met_lunala, badge_moon_witness`. End.

## B_SOLGALEO · Solens løfte / Solgaleo’s Promise

### Norsk

Den gyldne sirkelen i gulvet blir varm under føttene. Et brøl ruller over fjellene, men du kjenner ingen frykt. I lyset av en soloppgang som ikke tilhører denne dagen, kommer Solgaleo til syne. Den enorme manken gløder som et helt hav av morgensol.

Rundt deg blinker bildene av dem som fikk hjelp: Pikachu under eføyen, Lapras i elven, Psyduck med mutteren i potene og Altarias unger samlet på klippen. Så viser lyset deg noe nytt: alle de små handlingene som fortsatte etter at du hadde gått videre. Pikachu viser en annen Pokémon en trygg sti. Psyduck hjelper noen reparere en lykt. Lapras bærer en venn over elven.

Solgaleo bøyer hodet. Et gyllent tegn brennes forsiktig inn på kartets innside, uten å skade papiret. Det viser ikke hvor du skal. Det minner deg på at hjelpen ikke sluttet der du sluttet å se den.

### English

The golden circle beneath your feet grows warm. A roar rolls across the mountains, but you feel no fear. In the light of a sunrise that does not belong to this day, Solgaleo appears. Its great mane glows like an ocean of morning sunlight.

Around you flash images of those you helped: Pikachu under the ivy, Lapras in the river, Psyduck holding the nut, and Altaria's chicks gathered on the cliff. Then the light shows you something new: all the little acts that continued after you had moved on. Pikachu guides another Pokémon to a safe path. Psyduck helps someone repair a lantern. Lapras carries a friend across the river.

Solgaleo bows its head. A golden symbol gently appears on the inside of your map without burning the paper. It doesn't tell you where to go. It reminds you that the help you gave did not end when you stopped watching.

**Reward:** `SET met_solgaleo, badge_sun_witness`. End.

## B_BOTH · Stjerneportens hemmelighet / The Secret of the Star Gate

### Norsk

Du legger kartet mellom de to sirklene. Månetegnene du fant i skogen, og solsporene etter alle du hjalp, møtes på papiret. Den siste biten av stjernekartet gløder. For et øyeblikk blir tårnet helt stille.

Så åpnes himmelen i to.

Fra den ene siden kommer Lunala, mørkeblå og sølvskimrende, med vinger som favner natten. Fra den andre kommer Solgaleo, lysende som en ny dag. De møtes over tårnet uten kamp. Mellom dem dannes en tredje sti, verken natt eller dag, men øyeblikket da begge finnes samtidig.

Der ser du Willowbrook slik den var for hundre år siden. Arkitektene som bygget Stjernelysglasset, sto ved den samme porten. På veggen hadde de skrevet én setning som senere forsvant fra bøkene: «Lys som holdes for seg selv, slukner. Lys som deles, finner veien hjem.»

Du forstår at dette ikke er enda en maskin som må repareres. Det er en hemmelig takk fra dem som en gang lærte å dele varmen. Lunala senker den ene vingen. Solgaleo legger en pote på steinen. Kartet ditt får et nytt bilde: en stjerne mellom en måne og en sol.

Ingen andre i Willowbrook kommer helt til å tro på det du forteller. Men når du åpner kartet ved festivalen neste år, faller et sølvfarget og et gyllent lys over papiret. Partneren din ser opp på deg, som om den vil si: *Vi vet.*

### English

You place the map between the two circles. The moon signs you found in the woods and the traces of sunlight left by everyone you helped meet on the page. The final piece of the star map glows. For one moment, the entire tower goes still.

Then the sky opens in two.

Lunala comes from one side, midnight blue and silver, its wings embracing the night. Solgaleo comes from the other, radiant as a new day. They meet above the tower without fighting. Between them forms a third path, neither night nor day, but the moment when both exist together.

There you see Willowbrook as it was a hundred years ago. The builders of Starlight Glass stood before this same gate. On the wall they had written a sentence that was later lost from the books: “Light kept only for oneself fades. Light shared finds its way home.”

You understand that this is not another machine to fix. It is a secret thank-you from those who once learned to share warmth. Lunala lowers one wing. Solgaleo rests a paw on the stone. Your map gains a new image: a star between a moon and a sun.

Nobody in Willowbrook will entirely believe what you tell them. But when you open the map at next year's festival, silver and golden light fall across the paper. Your partner looks up at you as if to say: *We know.*

**Reward:** `SET met_lunala, met_solgaleo, badge_star_gate, ultimate_secret_found`. End.

# IMPLEMENTERINGSREGISTER / IMPLEMENTATION REGISTER

## Prioritet 1: Logiske invariants / Logic invariants

1. Ingen scene kan bruke `silver_seed` etter `USE silver_seed`; det finnes bare ett, og plantestedet er ett per gjennomspilling.
2. `ready_to_release` krever **både** passende varmeplan og Shinx' samtykke, før Lumi fysisk åpner låsen.
3. Lumi er den eneste som løsner vokterlåsen. Ingen melodi, legendary eller starter gjør dette i stedet.
4. Alle kan velge mekanisk sveiv i S17 etter nødvendig reparasjon. Starterne kan aldri bli permanent utestengt.
5. Pusleråd må være tilgjengelige uten å ødelegge fullføring. Feil valg får konsekvens i tid/dialog, ikke permanent blindvei.
6. Valg og historieavsnitt bruker de samme ID-ene i `nb-NO` og `en-US`.
7. Sideoppdrag må ha returpunkter; en oppgave som teller til hemmelig bonus må kunne fullføres før S24.
8. Hjelpehandlingen `helped_psyduck` øker `rescue_count` **bare én gang**, også om den forekommer i S11 og S12.
9. Både sol- og månevilkår må være samtidig oppnåelige. S01-valgene `leadership` / `kindness_eevee` kan kompenseres gjennom senere arbeid, med en faktisk skrevet scene. `Q_STAR` må være gjennomførbar før `USE silver_seed`. `Q_RETURN` gjør valgfrie redningsoppgaver tilgjengelige igjen før finalen.
10. Slutttekst skal vise bare venner som faktisk ble møtt eller hjulpet; S25 må ha betingede avsnitt for dette.

## Krever en siste produksjonsrunde / Production notes

- Dette er en ny sammenhengende manusversjon med **25 ferdig skrevne hovedscener**, Q_PREP, Q_STAR, **seks avslutninger** og **tre legendebonuser**, på begge språk. Det er ikke en rad-for-rad-konvertering av de eksisterende 39 scenene.
- Ved implementering må de opprinnelige 39 scenene og de 118 valgene mappes til ny struktur eller erstattes bevisst; ingenting skal erstattes ved ren tekstsøk uten ID-basert migrasjon.
- `Q_RETURN` har fullt tospråklig sceneinnhold, men må deles opp i egne betingede spillvalg og testes i motoren før publisering.
- De opprinnelige illustrasjonene og eksisterende tekst-til-tale-funksjonalitet bør bevares der det passer, men nye steder og bonusruter trenger nye illustrasjoner.

## Testscenarier / Test routes

A. Alle tre startere fullfører alle seks hovedavslutninger. B. Standardgjennomspilling uten sideoppdrag: minst én sikker løsning tilgjengelig etter Q_PREP. C. Manglende linse tvinger alternativ observatorieport, men ikke blindvei. D. Et sølvfrø kan ikke plantes to steder. E. Lunala uten Solgaleo. F. Solgaleo uten Lunala. G. Begge på samme gjennomspilling med stjernekart. H. Ingen legendebonus uten avsluttet hovedfortelling. I. Norsk og engelsk har identiske scene-ID-er, flagg og destinasjoner. J. Lagring før S24 kan ikke føre til ulovlig ringvalg.



# REVISJON 2 – TEKNISK AKSEPTANSE / REVISION 2 – TECHNICAL ACCEPTANCE

**Kontrollerbar sluttsekvens / Auditable release sequence:** At S24 the chosen route is recorded, but the lock remains closed. On entering the selected E scene, prepare/activate the corresponding heat source, request Shinx's final verbal confirmation, call `release_keeper_lock` by Lumi exactly once, then mark `release_done=true`. Render the post-release ending paragraphs only after that action. The Earth plant is a *heat-retaining* support, never instantaneous healing or standalone heat generation.

**State guards:** Every rescue objective sets its success flag only if false; `rescue_count` increments once per unique Pokémon group. `Q_RETURN` is a hub, each Q scene a real separate branch. Distinguish `pikachu_help_sent` from `rescued_pikachu`; volunteer rescue does not silently give the player the Solgaleo condition. `silver_seed` transitions `carried → planted_at_named_location` once. After planting, the map puzzle stays completed if already solved.

**Six endings remain distinct:** Sky/Dawn = immediate safe evacuation and ordinary recovery; Sky/Aurora = Altaria-guided descent and renewed trust in Mira; Heart/Lantern = volunteer rotating night watches; Heart/Song = Gastly's tune coordinating watch shifts; Earth/Garden = the single plant relocated later to a community garden; Earth/Sanctuary = the single plant left at the tower as a longer-term rest space. Do not describe these as six unrelated machine mechanisms: they are six supported consequences of three repair strategies.

**Acceptance tests / Tester:** (1) no ring action before S24; (2) no release before final warmed and consenting plan; (3) seed used exactly once in every ending; (4) alternative Earth backup always present; (5) Q_RETURN completion flags cannot be awarded by entering the hub alone; (6) all optional rescue sequences can be completed independently; (7) show only previously encountered/rescued friends in S25; (8) all 3 partners can reach every normal ending; (9) each legend alone plus both achievable without replay; (10) English and Norwegian have corresponding scenes, conditions and destinations.


# REVISJON 3 – DRAMATURGISKE OG TEKNISKE RETTELSER / REVISION 3 – NARRATIVE AND TECHNICAL CORRECTIONS

### A. Rekkefølge, sikkerhet og årsakskjede / Release order
Alle seks E-scenene inneholder en forberedelse og Shinx' uttrykkelige bekreftelse **før** Lumi åpner vokterlåsen. Teksten i E-scenen er den autoritative rekkefølgen; S24 er bare valg av strategi. Ingen knapp for å «slippe lyset fri» er tilgjengelig tidligere. Under implementering må hele handlingen være en idempotent overgang med `release_done` som vern mot dobbel utføring.

### B. Reelle returer / Genuine return quests
`Q_RETURN` viser **individuelle** sideoppdrag med egne tekster og valg i begge språk, aldri en automatisk «hjelp alle»-knapp. Spilleren må selv velge Q_PIKACHU, Q_LAPRAS, Q_PSYDUCK, Q_HOOTHOOT, Q_ALTARIA, Q_GASTLY, Q_BRIDGE, Q_VILLAGE og Q_LEAD etter behov. Et fullført oppdrag forsvinner fra menyen, og oppdaterer bare sitt eget flagg. `Q_RECONCILE` gir en rettferdig, men faktisk spilt, mulighet til å skape kontakt med Lumi.

### C. Sesong, tid og spenning / Pacing
Tårnklokken fungerer som dramatisk trykk, ikke som en nedtelling som kan gjøre spillet umulig. Hver retur til dalen bør ha én kort ny observasjon: økende stillhet, svakere blomsterlys eller flere frivillige i arbeid. Ikke la uendelig retur fremstå som om katastrofen har stoppet. Når alle uløste sideoppdrag er fullført, fjern returvalget eller vis kun «fortsett».

### D. Ulike avslutninger / Differentiated endings
- `E_DAWN`: trygg nedfiring og normal restitusjon med praktisk koordinering; Mira erkjenner sin kartfeil.
- `E_AURORA`: Altaria og gjenvunnet tillit gjør fjellnedstigningen mulig på en annen måte, og gir en særskilt forsoning.
- `E_LANTERN`: et fellesskap bærer varmevaktene, og den første festivallykten blir deres symbol.
- `E_SONG`: Gastlys sang skaper en struktur for vaktskiftene, uten å trylle eller helbrede.
- `E_SANCTUARY`: det ene frøet blir stående ved tårnet som varmelagrende plante og et varig hvileområde.
- `E_GARDEN`: den samme planten flyttes først etter at Shinx er trygg; landsbyen får en offentlig hage.
Dette er seks tydelige følelsesmessige og sosiale utfall av tre ulike varmeplaner – ikke seks uforklarte maskinfunksjoner.

### E. Hemmelig bonus / Secret legendary reward
Lunala og Solgaleo blir tilgjengelige **etter** hovedavslutning, og gir ikke en enkel snarvei gjennom krisen. Alle tre varianter kan nås ved ett gjennomspill gjennom synlige handlinger og skjulte kombinasjoner. Beregn de to kvalifikasjonene på nytt når S25 lastes. Dersom begge kvalifikasjoner finnes men stjernekartet mangler, kan spilleren velge enten Lunala eller Solgaleo (uten å få bonusen for begge).

### F. Oversettelse og tilstand / Localization
Alle Q-scener og E-scener skal ha samme ID og de samme vilkårene på norsk og engelsk. Oversettelser kan være idiomatiske, men ingen språkversjon kan gi et ekstra valg, en ekstra gjenstand eller en annen forutsetning. `IF`/`SET`-markører er utviklernotasjon og må ikke vises bokstavelig for barnet.

### G. Redaksjonell grense / Editorial limitation
Dette dokumentet er et **gjennomskrevet hovedscenemanus med sideoppdrag**, men ikke ferdig produksjonsdata eller en testet implementasjon av alle 39 eksisterende spillscener. Revisjon 3 løser de påviste manus- og logikkmotsetningene i dette dokumentet; en full kildekodebasert rutetest gjenstår hos Codex.

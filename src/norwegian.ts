import {byId,type Choice} from './story';
export const norwegianWords:Record<string,string>={
 causeway:'steinvei over grunt vann',astronomer:'astronom – en som studerer stjerner og verdensrommet',platform:'plattform – et flatt sted å stå',channel:'kanal – et løp som vann kan renne gjennom',nook:'liten, skjermet krok',ribbon:'bånd',footprints:'fotspor',shelter:'ly eller et beskyttet sted',
 crescent:'halvmåneform',constellation:'stjernebilde',sanctuary:'trygt tilfluktssted',observatory:'observatorium – et sted for å studere stjerner',rune:'rune – et skrevet eller risset tegn',lens:'linse',meteor:'meteor – et lysende stjerneskudd',reflection:'speilbilde',pedestal:'sokkel',aurora:'nordlys eller sørlys',frayed:'frynsete',rhythm:'rytme',ivy:'eføy – en klatreplante',frost:'rim',empathy:'empati – å forstå hvordan andre har det',
 archive:'arkiv – et sted som tar vare på gamle bøker og opplysninger',reed:'siv',flock:'fugleflokk',workshop:'verksted',star:'stjerne',lantern:'lykt',promise:'løfte',companion:'følgesvenn',counterweight:'motvekt',gear:'tannhjul',basin:'skål eller basseng',vine:'slyngplante',echo:'ekko',sheltered:'beskyttet, i ly',harmony:'samklang',mechanism:'mekanisme – deler som virker sammen',
 whisper:'hviske',careful:'forsiktig',together:'sammen',warmth:'varme',kindness:'vennlighet',frightened:'redd',gentle:'varsom eller mild',trust:'tillit; å stole på',glow:'glød; å lyse svakt',trail:'sti eller spor',borrow:'låne',rescue:'redde; en redning',safe:'trygg',brave:'modig',courage:'mot',seed:'frø',sphere:'kule',injured:'skadet',grateful:'takknemlig',patient:'tålmodig',choose:'velge',remember:'huske',listen:'lytte',share:'dele',light:'lys',lost:'bortkommen eller mistet',forest:'skog',river:'elv',bridge:'bro',scarf:'skjerf',feather:'fjær',roots:'røtter',path:'sti eller vei',clue:'ledetråd',dawn:'daggry',
};
// Authored translations, kept locally. The matching canonical labels never change saved choices.
const translations:Record<string,string[]>={
 lantern:['Trøst {starter}, og be Mira om hjelp.','Undersøk sølvfrøet.','Se etter falne stjerner på åsen.'],
 square:['«Bli med oss, Eevee.»','Spør om å få låne Miras gamle stjernekart.','«Hvor kom dette lille frøet fra?»'],
 hill:['Husk sangen med tre toner.','Del litt mat med Hoothoot.'],
 gate:['Hjelp Bulbasaur med å løsne den sammenfiltrede buen.','La Charmander lyse opp åsryggen.','La Squirtle vaske det gjørmete skiltet.','Følg den svake gløden fra frøet.'],
 ridge:['Løft greinen og reparer reiret.','Merk reiret så Mira kan hjelpe.'],
 brook:['Ta vare på beskjeden.','Send svaret «Vi kommer» med strømmen.'],
 grove:['Stopp og befri Pikachu.','Studer de blinkende soppene.','Be trærne snakke ett om gangen.'],
 rescue:['Ønsk Pikachu velkommen på laget.','Be Pikachu passe på skogen.'],
 mushrooms:['Følg stjernemønsteret vi løste.','Følg gruppen som lyser sterkest.','Vent og tegn hele mønsteret.','La vennligheten vår vise vei gjennom eføyen.'],
 hollow:['Fortell om vårt første eventyr.','Forklar hvorfor vi må hjelpe himmelen.'],
 echoArchive:['Lån astronomens notatbok om Lumi.','Tegn av en skjult fjellrute.','Lær arkivets hilsen med tre toner.'],
 roots:['Svar: «Vennlighet».','Svar: «En flamme».','Be Bulbasaur snakke med røttene.'],
 clearing:['Ta linsen og et redningstau.','Ta linsen og en runenøkkel.','Ta linsen og plant et vanlig frø som takk.'],
 bank:['Hjelp Lapras ut på dypt vann.','Reparer fergen med trevirke du finner.','Utforsk fossen til fots.','Bruk ledetrådene våre til å finne astronomens hule.'],
 lapras:['Bli venn med Lapras.','Be Lapras vise vei for bortkomne reisende.','Bruk Squirtles vann til å gjøre kanalen bredere.'],
 ferry:['Lag en solid knute med redningstauet vårt.','Flett et nytt tau av lange siv.','Hjelp Psyduck over først.'],
 reedWorkshop:['Bygg flytende lykter med Psyduck.','Tegn et kart over Psyducks rolige sivkanal.','Lær Psyducks beroligende melodi med tre toner.'],
 falls:['Gå inn døren som melodien vår åpnet.','La klokkene være og følg elven.','Syng melodien vi lærte på reisen.','Utforsk den trygge stien rundt fossen.'],
 cave:['Les hvordan vi kan åpne kulen varsomt.','Tegn av tårnets skjulte trapp.'],
 island:['Lov å hjelpe begge Pokémonene.','Ta vare på den gylne lysprikken.','Be elven bevare hemmeligheten deres.'],
 bridge:['Vent til vinden roer seg, og kryss sammen.','Følg løftestien som Lapras viste oss.','Ta den lengre steinstien.','La Bulbasaur holde broen stødig med slyngplantene sine.'],
 windwatch:['Hjelp Altaria å lede flokken til skyplattformen.','Les vindmerkene og ta steintrappen.','Be Altaria vise en sti i ly til bærkroken.'],
 stairs:['Ta med skjerfet til eieren.','Knyt skjerfet til et merke som hjelper andre reisende.','Hold løftet vårt og følg den skjulte trappen til Lumi.'],
 shelter:['Bytt litt mat mot fjæren.','Reparer den sprukne bærskålen.','Fortell hva vi har lært om Lumi.'],
 observatory:['Åpne taket med mekanismen vi reparerte.','Ta imot Pikachus hjelp med den gamle motoren.','Let etter en håndsveiv med {starter}.','Gå opp den trygge utetrappen sammen.'],
 roof:['Gå sakte over og pass på alle vennene.','Finn trappen i ly under taket.','Følg den skjulte ruten ledetrådene viser oss.','Be Charmander varme de rimdekte steinene.'],
 tower:['Bank på og presenter oss.','Si varsomt: «Lumi, vi vil hjelpe.»','Lever tilbake skjerfet før vi sier noe.'],
 lumi:['Sett deg ved siden av Lumi og lytt.','Del det astronomens notater har lært oss.','Foreslå å flytte kulen til landsbyen.','Hold løftet fra elven og del hjerteringen.'],
 listen:['Fortell Lumi at hun ikke står alene.','La Shinx velge hva han trenger.','Del den myke varmen fra fjæren.'],
 plan:['Gjør klart til å slippe stjernene tilbake på himmelen.','Samle alle rundt hjerteringen.','Ta med jordringen til hagebalkongen.','Følg planen vår og ta med den lukkede sfæren til Mira.'],
 sky:['Lag et varmt rede med skyfjæren.','La Charmander holde Shinx trygt varm.','Slipp stjernene fri og bær Shinx hjem.','Nynn en lindrende vuggesang mens vi åpner ringen.'],
 heart:['Lag et trygt tilfluktssted her med Lumi.','Koble Pikachus gnist til lyktene i landsbyen.','Syng sangen med tre toner sammen.','Ta med varmesirkelen til Willowbrook.'],
 earth:['Plant en stjernelyshage i Willowbrook.','La Bulbasaur dyrke en levende himmelplante.','Spar frøet og lag et tilfluktssted i tårnet.','Plant stjernesiv langs Psyducks lyktesti.'],
};
export function choiceNorwegian(scene:string,choice:Choice,starter:string):string{
 const index=byId[scene]?.choices.indexOf(choice)??-1;
 return (translations[scene]?.[index]||'').replaceAll('{starter}',starter);
}

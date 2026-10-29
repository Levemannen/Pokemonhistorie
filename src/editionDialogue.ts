import type {State,Dialogue} from './legacyStory';
import {getLanguage,authoredText} from './i18n';
type Pair=[string,string];
const line=(pair:Pair)=>authoredText(pair[getLanguage()==='nb'?1:0]);
export function editionConversation(state:State):Dialogue[]{
 const w=state.world!,scene=state.scene;
 const starterLines:Record<string,Record<string,Pair>>={
  Bulbasaur:{grove:['The stem is pulling on the loop. I can hold its weight.','Stengelen trekker i løkken. Jeg kan holde den oppe.'],roots:['May I try asking with a vine? Trees do not always need words.','Kan jeg prøve å spørre med en slyngtråd? Trær trenger ikke alltid ord.'],observatory:['The picture starts under the soil. Shall we look at the roots?','Bildet begynner under jorden. Skal vi se på røttene?'],earth:['A growing plant needs room. I can keep its pot steady.','En plante som vokser, trenger plass. Jeg kan holde potten stødig.']},
  Charmander:{grove:['I will keep my tail back. We need less light here.','Jeg holder halen unna. Her trenger vi mindre lys.'],observatory:['That little gear is trapped inside the big one. Let us look before warming anything.','Det lille tannhjulet sitter fast inni det store. La oss se nøye før vi varmer noe.'],sky:['Ask Shinx first. I can sit beside the carrier without touching the blanket.','Spør Shinx først. Jeg kan sitte ved kurven uten å berøre teppet.'],earth:['I can carry the watering cup. Away from my tail, obviously.','Jeg kan bære vannkoppen. Langt unna halen min, selvfølgelig.']},
  Squirtle:{grove:['Just a little water around the roots. No splashing Pikachu.','Bare litt vann rundt røttene. Ikke sprut på Pikachu.'],observatory:['Where does the pipe begin? Water has to reach the first basin somehow.','Hvor begynner røret? Vannet må jo komme fram til det første karet.'],ferry:['Psyduck checked every board. Let us check the landing too.','Psyduck sjekket hver planke. La oss sjekke kaien også.'],earth:['I volunteer for watering. A small cup this time.','Jeg melder meg til vanning. En liten kopp denne gangen.']}
 };
 const fallback:Record<string,Pair>={Bulbasaur:['I will watch where we step. Small things grow beside the path.','Jeg passer på hvor vi trår. Det vokser små ting langs stien.'],Charmander:['Tell me where you need the light. I am ready.','Si hvor du trenger lys. Jeg er klar.'],Squirtle:['Shall we check the next step together?','Skal vi sjekke neste skritt sammen?']};
 const result:Dialogue[]=[{speaker:state.starter,text:line(starterLines[state.starter][scene]||fallback[state.starter])}];
 const add=(speaker:string,pair:Pair)=>result.push({speaker,text:line(pair)});
 for(const friend of w.partyTraveling){
  if(friend==='Eevee')add(friend,['lumi','listen','plan'].includes(scene)?['Lumi is listening now. I will sit where she can see me.','Lumi lytter nå. Jeg setter meg der hun kan se meg.']:scene==='hill'?['I have one berry left. Do you think Hoothoot likes berries?','Jeg har ett bær igjen. Tror du Hoothoot liker bær?']:['You waited when I was frightened. I can wait for someone else.','Du ventet da jeg var redd. Jeg kan vente på noen andre.']);
  if(friend==='Hoothoot')add(friend,['falls','endSong'].includes(scene)?['Low, high, low. Our hilltop greeting has traveled a long way.','Dyp, lys, dyp. Hilsenen fra høyden har reist langt.']:['The nest was safe before I left. Now I can keep an eye on this path.','Redet var trygt før jeg dro. Nå kan jeg holde øye med denne stien.']);
  if(friend==='Pikachu')add(friend,['heart','plan'].includes(scene)?['Shinx, would a small spark help? I will wait for your answer.','Shinx, hjelper det med en liten gnist? Jeg venter på svaret ditt.']:['You held the ivy still for me. Let me hold the lantern for you.','Du holdt eføyen stille for meg. La meg holde lykten for deg.']);
  if(friend==='Psyduck')add(friend,scene==='plan'?['Blanket, carrier, lantern. I checked them. Shall I check with Shinx now?','Teppe, bærekurv, lykt. Jeg har sjekket dem. Skal jeg spørre Shinx nå?']:['I can be nervous and still do the next small job.','Jeg kan være nervøs og likevel gjøre den neste lille oppgaven.']);
 }
 if(w.partyTraveling.includes('Hoothoot')&&w.partyTraveling.includes('Pikachu')&&scene==='falls')add('Pikachu',['Hoothoot, sing it once more. I will count the beats.','Hoothoot, syng en gang til. Jeg teller taktslagene.']);
 return result;
}

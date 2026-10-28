import manuscript from './manuscript-v2.json';
import * as legacy from './legacyStory';
import type {State,Choice,Scene,Starter} from './legacyStory';
import type {WorldState} from './world';
import {translate,getLanguage} from './i18n';
export type ManuscriptScene={id:string;chapter:number;title:string;body:string;variants:Record<string,string>;choices:{id?:string;label:string;to:string;effect:string;condition:string;immediateText:string}[]};
export const manuscriptScenes=manuscript as unknown as ManuscriptScene[];
export const rawById=Object.fromEntries(manuscriptScenes.map(s=>[s.id,s]));
export const chapters=['The Night the Sky Went Quiet','Moonwood Holds Its Breath','The River Without Reflections','Above the Sleeping Clouds','A Light to Bring Home'];
export const scenes:Scene[]=manuscriptScenes.map(s=>({...legacy.byId[s.id],title:s.title,text:s.body,choices:s.choices.map((c,i)=>({...c,id:c.id||`${s.id}.${i+1}`,needs:c.condition==='always'?undefined:c.condition,starter:c.condition.startsWith('starter=')?c.condition.slice(8) as Starter:undefined}))}));
export const byId=Object.fromEntries(scenes.map(s=>[s.id,s]));
export const choicesById=Object.fromEntries(scenes.flatMap(s=>s.choices.map(c=>[c.id!,c])));
const copy=(world:WorldState):WorldState=>structuredClone(world);
function give(world:WorldState,...items:string[]){world.items=[...new Set([...world.items,...items])];}
function consume(world:WorldState,item:string){if(!world.items.includes(item))throw Error('Cannot consume absent item: '+item);world.items=world.items.filter(i=>i!==item);world.usedItems=[...new Set([...world.usedItems,item])];}
function enter(world:WorldState,id:string){
 world.visited=[...new Set([...world.visited,id])];
 if(id==='square')give(world,'map','spareScarf');
 if(id==='clearing'){give(world,'lens');if(world.flags.pikachu==='left')world.relationships.Pikachu='help-arriving';}
 if(id==='stairs')give(world,'shinxScarf');
 if(id==='island')world.knownFacts=[...new Set([...world.knownFacts,'island_memory'])];
 if(id==='listen')world.knownFacts=[...new Set([...world.knownFacts,'injury_cause','ordinary_warmth'])];
 if(id==='plan')world.knownFacts=[...new Set([...world.knownFacts,'three_rings'])];
 if(id==='ferry'&&world.items.includes('rope'))world.usedItems=[...new Set([...world.usedItems,'rope'])];
 if(byId[id]?.ending&&world.items.includes('silverSeed')){consume(world,'silverSeed');world.flags.seedSettled=id;}
}
export function initial(starter:Starter):State{
 const world:WorldState={edition:'2.1',flags:{},items:['silverSeed','lantern'],knownFacts:[],relationships:{},partyTraveling:[],friendsLocal:{Eevee:'Willowbrook',Hoothoot:'hill'},arrivalMode:'start',lastChoiceId:null,visited:['lantern'],usedItems:[]};
 return {...legacy.initial(starter),world};
}
export function condition(state:State,expression:string):boolean{
 const w=state.world;if(!w)return false;
 if(expression==='always'||!expression)return true;
 if(expression.includes(' OR '))return expression.split(' OR ').some(term=>condition(state,term));
 if(expression.includes(' AND '))return expression.split(' AND ').every(term=>condition(state,term));
 const puzzle=/^puzzle:([\w]+) solved$/.exec(expression);if(puzzle)return state.flags.includes('puzzle:'+puzzle[1]);
 const [key,value]=expression.split('=');
 if(key==='starter')return state.starter===value;
 if(key==='item')return w.items.includes(value);
 if(key==='companion')return w.partyTraveling.includes(value);
 if(key==='know'||key==='knowledge'||key==='clue')return w.knownFacts.includes(`${key}:${value}`)||w.knownFacts.includes(value);
 if(key==='arrival')return w.arrivalMode===value;
 return w.flags[key]===value;
}
export const available=(state:State)=>byId[state.scene].choices.filter(c=>condition(state,c.condition||'always'));
export function advance(state:State,choice:Choice):State{
 if(!state.world||!available(state).some(c=>c.id===choice.id))throw Error('Unavailable choice');
 const canonical=choicesById[choice.id!];if(!canonical||canonical.to!==choice.to)throw Error('Invalid choice');
 const world=copy(state.world);world.arrivalMode=state.scene;world.lastChoiceId=canonical.id!;
 if(state.scene==='island')world.knownFacts=[...new Set([...world.knownFacts,'lumi_name'])];
 for(const effect of (canonical.effect||'').split(';').filter(Boolean)){
  const add=/^(item|companion)\+=(.+)$/.exec(effect),remove=/^item-=(.+)$/.exec(effect);
  if(add){if(add[1]==='item')give(world,add[2]);else{world.partyTraveling=[...new Set([...world.partyTraveling,add[2]])];delete world.friendsLocal[add[2]];}continue;}
  if(remove){consume(world,remove[1]);continue;}
  const [key,value]=effect.split('=');if(!key||!value)throw Error('Unknown effect '+effect);
  if(['know','knowledge','clue'].includes(key)){world.knownFacts=[...new Set([...world.knownFacts,`${key}:${value}`])];continue;}
  if(key==='arrival'){world.arrivalMode=value;continue;}
  world.flags[key]=value;
  if(key==='letter'&&value==='kept')give(world,'letter');
  if(key==='rune'&&value==='earned')give(world,'rune');
  if(key==='ordinarySeed'){if(value==='owned')give(world,'ordinarySeed');if(value==='planted')consume(world,'ordinarySeed');}
  if(key==='pikachu'){world.relationships.Pikachu=value;if(value!=='freed')world.friendsLocal.Pikachu='Moonwood';}
  if(key==='lapras'){world.relationships.Lapras=value;world.friendsLocal.Lapras='Lumen River';}
  if(key==='psyduck'){world.relationships.Psyduck=value;world.friendsLocal.Psyduck='ferry';}
 }
 enter(world,canonical.to);
 return {...state,scene:canonical.to,world,companions:[...world.partyTraveling],history:[...state.history,{scene:state.scene,choice:canonical.label,choiceId:canonical.id,world:copy(state.world),flags:[...state.flags],companions:[...state.companions]}]};
}
/** Documented continuity corrections; the supplied manuscript remains unchanged in docs/. */
function prose(state:State,text:string):string{
 const w=state.world!;
 text=translate(text);
 const nb:Record<string,string>={
  rootArch:state.starter==='Bulbasaur'?'Bulbasaur skyver de minste røttene varsomt til side uten å skade buen.':'Dere bøyer dere under de minste røttene uten å skade buen.',
  riverReply:w.partyTraveling.includes('Hoothoot')?'Hoothoot følger flasken mot tårnets gamle vanninntak.':'Strømmen bærer flasken mot tårnets gamle vanninntak.',
  starterRescue:state.starter==='Bulbasaur'?'Bulbasaur løsner røttene med forsiktige slyngtråder.':state.starter==='Charmander'?'Charmander lyser opp knuten og holder flammen trygt unna de tørre bladene.':'Squirtle mykner jorden med en tynn vannstråle.',
  caveArrival:w.arrivalMode==='falls'?'Dere går inn de tørre trinnene bak fossen.':'Dere kommer inn den tørre sideinngangen fra elvebredden.',
  towerScarf:w.items.includes('shinxScarf')?'Det like skjerfet i sekken din tilhører Shinx.':'Du ser navnet Lumi brodert langs kanten.',
  replyArrival:w.partyTraveling.includes('Hoothoot')?'Hoothoot hjalp svaret ditt frem til det gamle vanninntaket.':'Svaret ditt nådde tårnets gamle vanninntak.',
  songWarmth:w.flags.plan==='sky'?'Den varme steinen i den polstrede kurven og lykten holder Shinx varm.':'De frivillige hjelpernes lykter holder Shinx varm mens kulen tømmes.',
  sanctuarySource:w.flags.endingMethod==='plant_sanctuary'?'Den levende jordmottakeren':'En krets av frivillige hjelpere',
  gardenPlace:w.flags.endingMethod==='reeds'?'Neste morgen planter du og Mira den lille sølvmottakeren ved Psyducks lyktesti langs elven. Der kan mennesker og Pokémon stelle den sammen.':'Neste morgen planter du og Mira den lille sølvmottakeren i Willowbrook. Der kan mennesker og Pokémon stelle den sammen.',
 };
 text=text.replace(/\{(\w+)\}/g,(match,key:string)=>nb[key]||match);
 text=text.replace('Bulbasaur, if chosen, parts the smallest vines gently, leaving the arch unharmed.',state.starter==='Bulbasaur'?'Bulbasaur parts the smallest vines gently, leaving the arch unharmed.':'You duck beneath the smallest vines, leaving the arch unharmed.');
 text=text.replace('Hoothoot, if traveling with you, guides it; otherwise the current carries it toward the tower’s old intake.',w.partyTraveling.includes('Hoothoot')?'Hoothoot guides it toward the tower’s old intake.':'The current carries it toward the tower’s old intake.');
 text=text.replace('Bulbasaur can loosen the roots with gentle vines; Charmander can light the knot without bringing flame near dry leaves; Squirtle can soften the earth with a thin stream of water.',state.starter==='Bulbasaur'?'Bulbasaur loosens the roots with gentle vines.':state.starter==='Charmander'?'Charmander lights the knot while keeping its flame safely away from the dry leaves.':'Squirtle softens the earth with a thin stream of water.');
 text=text.replace('There is no need to pretend you took the rune as well.','The rope will be ready if a crossing needs a handrail.');
 text=text.replace('If you left Pikachu at the lamp post, you receive','You receive').replace('; you did not claim the rescue for yourself.','. Pikachu is safe with the helpers.');
 text=text.replace('You reach the door through the service passage; the others came by the roof.','Your whole traveling party reaches the door through the sheltered service passage.');
 text=text.replace('A Hoothoot carrying the river reply arrived earlier;',w.partyTraveling.includes('Hoothoot')?'Hoothoot helped your river reply reach the old intake earlier;':'Your river reply reached the tower’s old intake earlier;');
 if(state.scene==='tower')text=text.replace('If you found a scarf on the stairs, you hold Shinx’s matching scarf—not this one.',w.items.includes('shinxScarf')?'The matching scarf in your pack belongs to Shinx.':'You notice the name Lumi stitched into its edge.');
 if(state.scene==='endGarden')text=text.replace('Then the Glass releases every borrowed reflection back to the real sky. ','');
 if(state.scene==='cave')text=text.replace('You arrive by the entrance you actually used.',w.arrivalMode==='falls'?'You climb the dry steps behind the waterfall.':'You enter by the dry side path from the riverbank.');
 if(state.scene==='lapras')text=text.replace('You and your partner move the branch trapping Lapras.','You and your partner have moved the branch that trapped Lapras.');
 text=text.replace('Using the route you copied, you find the dry side entrance above the stream.','Using the tower symbols you studied and Mira’s map, you find the dry side entrance above the stream.');
 if(state.scene==='shelter')text=text.replace('Nothing you pick up is magically teleported elsewhere; you must carry it.','You make room in your pack for anything you choose to carry.');
 if(state.scene==='roof')text=text.replace('You are not crossing to an unexplained second tower; this roof faces the same Starfall Tower Mira showed on her map.','This is Starfall Tower, the place Mira showed you on her map.');
 if(state.scene==='endSong'&&w.flags.plan!=='sky')text=text.replace('while its remaining warmth passes into a prepared warmed-stone carrier and the shelter lantern','while the willing helpers’ lanterns keep Shinx warm');
 if(state.scene==='endGarden'&&w.flags.endingMethod==='reeds')text=text.replace('in Willowbrook, where people and Pokémon can tend it together','beside Psyduck’s floating lantern channel, where people and Pokémon can tend it together').replace('rooted in Willowbrook','rooted beside the river');
 if(state.scene==='endSanctuary')text=text.replace('A living earth receiver or a circle of willing helpers—depending on the route you chose—',w.flags.endingMethod==='plant_sanctuary'?'The living earth receiver':'A circle of willing helpers').replace(' The seed stays in a tended pot by the tower window, whether or not it served as the living receiver.','');
 return text;
}
export function paragraphs(state:State):string[]{
 const raw=rawById[state.scene],w=state.world!;
 const arrival=w.lastChoiceId?choicesById[w.lastChoiceId]:null;
 const variants=Object.entries(raw.variants).filter(([key])=>condition(state,key)).map(([,value])=>prose(state,value));
 let body=prose(state,raw.body);
 // Place the starter's first action before the sky changes, rather than after the alarm.
 if(state.scene==='lantern'&&variants.length){const marker=getLanguage()==='nb'?'Så forsvinner stjernene.':'Then the stars disappear.';body=body.replace(marker,variants.shift()+' '+marker);}
 const reactionMarkers:Record<string,[string,string]>={lumi:['Nobody touches the controls yet.','Ingen rører kontrollene ennå.'],listen:['Shinx lifts his head.','Shinx løfter hodet.'],plan:['Shinx makes one request:','Shinx har ett ønske:']};
 if(reactionMarkers[state.scene]&&variants.length){const split=body.indexOf(reactionMarkers[state.scene][getLanguage()==='nb'?1:0]);if(split>=0)body=body.slice(0,split).trimEnd()+'\n\n'+variants.splice(0).join('\n\n')+'\n\n'+body.slice(split);}
 return [...arrival?.to===state.scene&&arrival.immediateText?[prose(state,arrival.immediateText)]:[],body,...variants];
}
export const storyText=(state:State)=>paragraphs(state).join('\n\n');
export const choiceResponse=(state:State,id:string)=>prose(state,choicesById[id]?.immediateText||'');
export function visibleCompanions(state:State):string[]{return [...state.world!.partyTraveling];}

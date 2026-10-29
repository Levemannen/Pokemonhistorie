import manuscript from './manuscript-v2.json';
import * as legacy from './legacyStory';
import type {State,Choice,Scene,Starter} from './legacyStory';
import type {WorldState} from './world';
import {getLanguage,authoredText} from './i18n';
import {localizedManuscript,type TextBlock} from './storyLocale';
export type ManuscriptScene={id:string;chapter:number;title:string;body:string;variants:Record<string,string>;passages:TextBlock[];choices:{id?:string;label:string;to:string;effect:string;condition:string;immediateText:string;responses?:TextBlock[]}[]};
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
 if((id==='ridge'||id==='bridge')&&world.items.includes('spareScarf'))world.usedItems=[...new Set([...world.usedItems,'spareScarf'])];
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
 if(expression.startsWith('NOT '))return !condition(state,expression.slice(4));
 const puzzle=/^puzzle:([\w]+) solved$/.exec(expression);if(puzzle)return state.flags.includes('puzzle:'+puzzle[1]);
 const [key,value]=expression.split('=');
 if(key==='starter')return state.starter===value;
 if(key==='item')return w.items.includes(value);
 if(key==='companion')return w.partyTraveling.includes(value);
 if(key==='know'||key==='knowledge'||key==='clue')return w.knownFacts.includes(`${key}:${value}`)||w.knownFacts.includes(value);
 if(key==='arrival')return w.arrivalMode===value;
 if(key==='lastChoice')return w.lastChoiceId===value;
 if(key==='visited')return w.visited.includes(value);
 if(key==='choice')return w.lastChoiceId===value||state.history.some(h=>h.choiceId===value);
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
 if(canonical.id==='hill.3')world.flags.nest='saved';
 enter(world,canonical.to);
 return {...state,scene:canonical.to,world,companions:[...world.partyTraveling],history:[...state.history,{scene:state.scene,choice:canonical.label,choiceId:canonical.id,world:copy(state.world),flags:[...state.flags],companions:[...state.companions]}]};
}
/** Stable IDs select authored paragraphs; wording never controls story logic. */
function renderBlocks(state:State,blocks:TextBlock[],localized:Record<string,string>):string[]{
 return blocks.filter(block=>condition(state,block.when||'always')).map(block=>getLanguage()==='nb'?localized[block.id]:block.text);
}
export function choiceResponse(state:State,id:string):string{
 const source=rawById[id.split('.')[0]],choice=source?.choices.find(c=>c.id===id);
 if(!choice)return '';
 const local=localizedManuscript[source.id].choices[id];
 return authoredText([getLanguage()==='nb'?local.immediateText:choice.immediateText,...renderBlocks(state,choice.responses||[],local.responses||{})].filter(Boolean).join(' '));
}
export function paragraphs(state:State):string[]{
 const raw=rawById[state.scene],last=state.world!.lastChoiceId;
 const arrival=last&&choicesById[last]?.to===state.scene?choiceResponse(state,last):'';
 return [...arrival?[arrival]:[],...renderBlocks(state,raw.passages,localizedManuscript[raw.id].passages)];
}
export const storyText=(state:State)=>authoredText(paragraphs(state).join('\n\n'));
export function visibleCompanions(state:State):string[]{return [...state.world!.partyTraveling];}

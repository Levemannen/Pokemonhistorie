import {restoreSave as restoreLegacy} from './legacySave';
import {byId,choicesById} from './edition';
import type {State} from './story';
import type {WorldState} from './world';
const strings=(v:unknown):v is string[]=>Array.isArray(v)&&v.every(x=>typeof x==='string');
const record=(v:unknown)=>Boolean(v)&&typeof v==='object'&&!Array.isArray(v)&&Object.values(v as object).every(x=>typeof x==='string');
function validWorld(v:unknown):v is WorldState{
 if(!v||typeof v!=='object')return false;
 const w=v as WorldState;
 return w.edition==='2.1'&&record(w.flags)&&record(w.relationships)&&record(w.friendsLocal)&&
 [w.items,w.knownFacts,w.partyTraveling,w.visited,w.usedItems].every(strings)&&
 w.visited.every(id=>Boolean(byId[id]))&&typeof w.arrivalMode==='string'&&
 (w.lastChoiceId===null||typeof w.lastChoiceId==='string'&&Boolean(choicesById[w.lastChoiceId]));
}
/** Missing edition means legacy: never infer new facts from old flags. */
export function restoreSave(raw:string|null):State|null{
 try{
  const value=JSON.parse(raw||'null');
  if(!value||value.world===undefined)return restoreLegacy(raw);
  if(!validWorld(value.world))return null;
  const base=restoreLegacy(raw);if(!base)return null;
  if(!value.history.every((h:State['history'][number])=>validWorld(h.world)&&typeof h.choiceId==='string'&&Boolean(choicesById[h.choiceId])&&byId[h.scene]?.choices.some(c=>c.id===h.choiceId)))return null;
  return {...base,world:structuredClone(value.world),companions:[...value.world.partyTraveling],history:value.history.map((h:State['history'][number])=>({...h,world:structuredClone(h.world),flags:[...h.flags||[]],companions:[...h.world!.partyTraveling]}))};
 }catch{return null;}
}

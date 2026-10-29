import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {scenes,byId,rawById,initial,available,advance,condition,storyText} from '../src/edition';
import {restoreSave} from '../src/save';
import {branchAt} from '../src/journeyReview';
import * as legacy from '../src/legacyStory';
import {getPuzzle,tryPuzzle} from '../src/puzzles';
import type {State,Starter} from '../src/story';
const future=new Map<string,string[]>();
function needs(id:string):string[]{
 if(future.has(id))return future.get(id)!;
 const result=[...new Set(byId[id].choices.flatMap(c=>[...(c.condition||'always').split(/ OR | AND /),...needs(c.to)]))].sort();
 future.set(id,result);return result;
}
const reached=new Set<string>(),chosen=new Set<string>(),routes:Record<string,Record<string,string[]>>={};let checked=0;
const fixtures=new Map<string,State>();
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 const stack:State[]=[initial(starter)],seen=new Set<string>();routes[starter]={};
 while(stack.length){
  const state=stack.pop()!,w=state.world!;
  const signature=JSON.stringify([state.scene,needs(state.scene).map(n=>condition(state,n)),w.items.slice().sort(),w.partyTraveling.slice().sort()]);
  if(seen.has(signature))continue;seen.add(signature);checked++;reached.add(state.scene);
  const visualKey=JSON.stringify([starter,state.scene,w.lastChoiceId,w.arrivalMode,w.flags.endingMethod,rawById[state.scene].passages.map(p=>condition(state,p.when||'always'))]);
  if(!fixtures.has(visualKey))fixtures.set(visualKey,state);
  assert.deepEqual(state.companions,w.partyTraveling);
  assert.ok(!w.partyTraveling.includes('Lapras'));
  const text=storyText(state);assert.ok(text.trim().length>30);
  assert.ok(!/if chosen|if traveling with you|depending on the route you chose/i.test(text),state.scene+' has editorial placeholders');
  const choices=available(state);
  assert.ok(byId[state.scene].ending||choices.length>=2,state.scene+' is a dead end');
  const puzzle=getPuzzle(state);
  if(puzzle&&!state.flags.includes('puzzle:'+puzzle.id)){
   let solved=state;for(const n of puzzle.answer)solved=tryPuzzle(solved,n);
   assert.ok(solved.flags.includes('puzzle:'+puzzle.id));stack.push(solved);
  }
  if(byId[state.scene].ending){
   for(const id of ['island','lumi','listen','plan'])assert.ok(w.visited.includes(id),id+' bypassed');
   assert.ok(!w.items.includes('silverSeed'));assert.ok(w.usedItems.includes('silverSeed'));
   if(!routes[starter][state.scene]){
    routes[starter][state.scene]=state.history.map(h=>h.choiceId!);
    const loaded=restoreSave(JSON.stringify(state));assert.ok(loaded);assert.deepEqual(loaded.world,w);
    for(let i=0;i<state.history.length;i++)assert.deepEqual(branchAt(loaded,i)?.world,state.history[i].world);
   }
  }
  for(const choice of choices){
   chosen.add(choice.id!);const before=JSON.stringify(state),next=advance(state,choice);
   assert.equal(JSON.stringify(state),before);assert.equal(next.history.at(-1)?.choiceId,choice.id);
   assert.deepEqual(next.history.at(-1)?.world,w);stack.push(next);
  }
 }
 assert.equal(Object.keys(routes[starter]).length,6,starter+' cannot reach every ending');
}
assert.equal(reached.size,39);assert.equal(chosen.size,118);
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 const old=legacy.initial(starter);const restored=restoreSave(JSON.stringify(old));assert.ok(restored);assert.equal(restored.world,undefined);
 assert.deepEqual(legacy.available(restored),legacy.available(old));
}
assert.equal(restoreSave(JSON.stringify({...initial('Bulbasaur'),world:{edition:'2.1'}})),null);
writeFileSync('docs/edition-v2-verification.json',JSON.stringify({scenes:reached.size,choices:chosen.size,checkedStates:checked,routes},null,2));
writeFileSync('docs/edition-v2-fixtures.json',JSON.stringify([...fixtures.values()]));
const reachableRoutes=Object.fromEntries(Object.entries(routes).map(([starter,endings])=>[starter,Object.fromEntries(Object.entries(endings).map(([id,ids])=>[byId[id].ending,ids.map(choiceId=>{const scene=choiceId.split('.')[0];return scene+': '+byId[scene].choices.find(c=>c.id===choiceId)!.label;}).concat(id)]))]));
writeFileSync('verification-report.json',JSON.stringify({edition:'2.1',scenes:39,choices:118,checkedStates:checked,reachableRoutes},null,2));
console.log(`PASS: revised edition: ${checked} states, ${reached.size} scenes, ${chosen.size} choices, 18 ending routes; save and historical-state checks.`);

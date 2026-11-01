import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initial,advance,available,restore} from '../src/edition3';
import {historicalState,type State} from '../src/story';
import {optionalPuzzles,answerOptionalPuzzle} from '../src/optionalPuzzles';
import {mapMarkers,mapState,hasMiraMap,mapPlaces} from '../src/miraMapData';
import {setLanguage} from '../src/i18n';
const fixtures=JSON.parse(readFileSync('docs/v3-fixtures.json','utf8')) as State[];
let checks=0;
for(const language of ['nb','en'] as const){
 setLanguage(language);
 for(const starter of ['Bulbasaur','Charmander','Squirtle'] as const)for(const puzzle of optionalPuzzles){
  const state=structuredClone(fixtures.find(s=>s.scene===puzzle.scene)!);state.starter=starter;
  delete state.world!.flags[puzzle.flag];
  const before=JSON.stringify(state),text=puzzle[language];
  assert.equal(text.answers.length,3);assert.equal(text.hints.length,2);
  for(const [index,option] of text.answers.entries()){
   const result=answerOptionalPuzzle(state,index);
   assert.equal(JSON.stringify(state),before);
   assert.deepEqual(available(result),available(state));
   if(!option.correct){assert.equal(result,state);continue;}
   assert.deepEqual(result,{...state,world:{...state.world!,flags:{...state.world!.flags,[puzzle.flag]:'true'}}});
   assert.equal(answerOptionalPuzzle(result,index),result);
   const validSource=fixtures.find(s=>s.scene===puzzle.scene)!;
   const saved=answerOptionalPuzzle(validSource,index);
   assert.equal(restore(saved)?.world?.flags[puzzle.flag],'true');
   const next=advance(saved,available(saved)[0]);
   assert.equal(restore(next)?.world?.flags[puzzle.flag],'true');
   assert.equal(mapState(saved).markers.filter(m=>m.id===puzzle.flag).length,1);
   assert(!mapState(state).markers.some(m=>m.id===puzzle.flag));
   const past=historicalState(next,Math.max(0,next.history.length-2));
   assert(!mapState(past).markers.some(m=>m.id===puzzle.flag));
   assert(!restore({...validSource,world:{...validSource.world!,flags:{}}})?.world?.flags[puzzle.flag]);
   checks++;
  }
 }
}
for(const marker of mapMarkers){
 const place=mapPlaces.find(p=>p.id===marker.place)!;
 const state=structuredClone(fixtures.find(s=>s.scene===place.scenes[0])!);
 for(const flag of marker.flags){delete state.world!.flags[flag];state.world!.items=state.world!.items.filter(i=>i!==flag);}
 assert(!mapState(state).markers.some(m=>m.id===marker.id));
 state.world!.flags[marker.flags[0]]='true';
 assert(mapState(state).markers.some(m=>m.id===marker.id));
 checks++;
}
const start=initial('Bulbasaur');
assert(!hasMiraMap(start));
assert.deepEqual(mapState(start).places.map(p=>p.id),['village']);
assert.equal(mapState(start).markers.length,0);
assert(hasMiraMap(fixtures.find(s=>s.scene==='S04')!));
for(const puzzle of optionalPuzzles){
 const forged=structuredClone(start);forged.world!.flags[puzzle.flag]='true';
 assert(!restore(forged)?.world!.flags[puzzle.flag]);
}
console.log(`PASS: ${checks} map/puzzle cases; all answers, three starters, both languages, restore, historical branches and marker visibility.`);

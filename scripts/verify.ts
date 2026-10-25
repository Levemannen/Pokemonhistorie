import assert from 'node:assert/strict';
import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {scenes,byId,available,advance,initial,storyText,hasNeed,endingMemories,type Starter,type State} from '../src/story';
import {getPuzzle,tryPuzzle} from '../src/puzzles';
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
const prompts=JSON.parse(readFileSync('public/images/illustration-prompts.json','utf8'));
assert.equal(new Set(scenes.map(s=>s.id)).size,scenes.length);
assert.ok(scenes.length>=30&&scenes.length<=40);
assert.equal(scenes.filter(s=>s.ending).length,6);
assert.ok(scenes.reduce((n,s)=>n+s.choices.length,0)>=50);
for(const s of scenes){
 assert.ok(s.chapter>=1&&s.chapter<=5);
 assert.ok(s.ending?s.choices.length===0:s.choices.length>=2&&s.choices.length<=4);
 const sentenceCount=[...new Intl.Segmenter('en',{granularity:'sentence'}).segment(storyText(s,initial('Bulbasaur')))].length;
 assert.ok(sentenceCount>=2&&sentenceCount<=4,`${s.id} must have 2–4 sentences`);
 for(const c of s.choices)assert.ok(byId[c.to],`Missing target ${c.to}`);
 for(const starter of ['Bulbasaur','Charmander','Squirtle']){
  const path=manifest.scenes[s.id].base[starter];assert.ok(existsSync('public/'+path));assert.ok(prompts[path.split('/').pop()]);
 }
}
for(const file of Object.values(manifest.companionLayers) as string[])assert.ok(existsSync('public/'+file));
for(const d of manifest.decisionLayers)assert.ok(existsSync('public/'+d.path));
// Keep all full states, but merge futures after their earlier clues can no longer
// change any available path. Puzzles add a solved edge; retries are tested separately.
const dependencies:Record<string,string[]>={promiseTrail:['promise','riverFriend'],pikachuHelp:['rescue','forestGuard','guardReturned'],melodyHelp:['song','nest','nestGift','echoTune','duckRhythm'],secretWay:['key','archiveMap','secretStair','reedGuide']};
const futureCache=new Map<string,string[]>();
function futureNeeds(id:string):string[]{
 const cached=futureCache.get(id);if(cached)return cached;
 const needs=new Set<string>();
 for(const c of byId[id].choices){if(c.needs)for(const f of dependencies[c.needs]||[c.needs])needs.add(f);for(const f of futureNeeds(c.to))needs.add(f);}
 const result=[...needs].sort();futureCache.set(id,result);return result;
}
const proof:Record<string,Record<string,string[]>>={};let total=0;const visitedScenes=new Set<string>(),usedChoices=new Set<string>();
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 const queue:State[]=[initial(starter)],seen=new Set<string>();proof[starter]={};
 while(queue.length){
  const state=queue.pop()!;const sig=JSON.stringify([state.scene,futureNeeds(state.scene).map(f=>hasNeed(state,f)),[...state.companions].sort()]);
  if(seen.has(sig))continue;seen.add(sig);total++;visitedScenes.add(state.scene);
  const choices=available(state);const scene=byId[state.scene];
  assert.ok(scene.ending||choices.length>=2&&choices.length<=4,`${starter}: invalid choice count ${scene.id}`);
  const puzzle=getPuzzle(state);
  if(puzzle&&!state.flags.includes(`puzzle:${puzzle.id}`)){let solved=state;for(const n of puzzle.answer)solved=tryPuzzle(solved,n);assert.ok(solved.flags.includes(`puzzle:${puzzle.id}`));queue.push(solved);}
  assert.ok(!storyText(scene,state).includes('{starter}'));
  if(scene.ending&&!proof[starter][scene.ending])proof[starter][scene.ending]=state.history.map(h=>`${h.scene}: ${h.choice}`).concat(state.scene);
  if(scene.ending){const memories=endingMemories(state);assert.ok(memories.length>=3);for(const m of memories)assert.ok(state.history.some(h=>h.scene===m.scene&&h.choice===m.choice),'Memory must describe a choice actually made');}
  for(const choice of choices){
   usedChoices.add(scene.id+':'+choice.label);const before=JSON.stringify(state);const next=advance(state,choice);
   assert.equal(JSON.stringify(state),before,'Transition mutated previous state');
   assert.ok(state.flags.every(f=>next.flags.includes(f)),'Lost a lasting flag');
   assert.ok(state.companions.every(f=>next.companions.includes(f)),'Lost a friend');
   assert.equal(next.history.length,state.history.length+1);
   queue.push(next);
  }
 }
 assert.equal(Object.keys(proof[starter]).length,6,`${starter} cannot reach all endings`);
}
assert.equal(visitedScenes.size,scenes.length,'Unreachable scene');
assert.equal(usedChoices.size,scenes.reduce((n,s)=>n+s.choices.length,0),'Unreachable choice');
const starter=initial('Bulbasaur');assert.throws(()=>advance(starter,{label:'invalid',to:'endDawn'}));
const puzzleSolutions=Object.fromEntries((['Bulbasaur','Charmander','Squirtle'] as Starter[]).map(starter=>[starter,Object.fromEntries(['mushrooms','falls','observatory'].map(scene=>{const p=getPuzzle({...initial(starter),scene})!;return [scene,p.answer.map(i=>p.buttons[i])];}))]));
const report={scenes:scenes.length,choices:usedChoices.size,checkedStates:total,endingsPerStarter:6,puzzleSolutions,reachableRoutes:proof};
writeFileSync('verification-report.json',JSON.stringify(report,null,2));
console.log(`PASS: ${scenes.length} scenes, ${usedChoices.size} choices, ${total} states; all six endings reachable with every starter. All illustrations and prompts present.`);

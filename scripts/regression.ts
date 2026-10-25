import assert from 'node:assert/strict';
import {advance,available,byId,companionConversation,consequence,endingMemories,initial,storyText,type Choice,type State,type Starter} from '../src/story';
import {getPuzzle,hintPuzzle,progressFor,resetPuzzle,tryPuzzle} from '../src/puzzles';
import {restoreSave} from '../src/save';
function choose(state:State,flagOrText:string){const c=available(state).find(c=>c.flag===flagOrText||c.label===flagOrText);assert.ok(c,`Missing ${flagOrText} at ${state.scene}`);return advance(state,c);}
const here=(scene:string,starter:Starter='Bulbasaur',flags:string[]=[]):State=>({...initial(starter),scene,flags});
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[])for(const scene of ['mushrooms','falls','observatory']){
 let state=here(scene,starter);const p=getPuzzle(state)!;const snapshot=JSON.stringify(state);
 const locked=byId[scene].choices.find(c=>c.needs===`puzzle:${scene}`)!;
 assert.ok(!available(state).includes(locked));assert.throws(()=>advance(state,locked));
 for(let i=0;i<3;i++)state=tryPuzzle(state,(p.answer[i]+1)%p.buttons.length);
 assert.equal(JSON.stringify(here(scene,starter)),snapshot);assert.equal(progressFor(state,scene).attempts,1);assert.equal(progressFor(state,scene).solved,false);assert.equal(state.history.length,0);
 state=hintPuzzle(state);state=hintPuzzle(hintPuzzle(state));assert.equal(progressFor(state,scene).hints,2);
 state=tryPuzzle(state,p.answer[0]);state=restoreSave(JSON.stringify(state))!;assert.deepEqual(progressFor(state,scene).input,[p.answer[0]]);
 state=resetPuzzle(state);assert.deepEqual(progressFor(state,scene).input,[]);
 for(const n of p.answer)state=tryPuzzle(state,n);
 assert.ok(state.flags.includes(`puzzle:${scene}`));assert.ok(available(state).includes(locked));assert.equal(tryPuzzle(state,0),state);
 const next=advance(state,locked);assert.ok(next.flags.includes(`puzzle:${scene}`));assert.equal(next.history.length,1);
 assert.equal(tryPuzzle(state,-1),state);assert.equal(tryPuzzle(state,99),state);
}
assert.equal(new Set((['Bulbasaur','Charmander','Squirtle'] as Starter[]).map(s=>getPuzzle(here('observatory',s))!.answer.join())).size,3);
let guard=initial('Bulbasaur');for(const step of ['kind','kind','gentle','kind','forestGuard','wisdom','rope','builder','patient','stardust','steady','feather'])guard=choose(guard,step);
assert.equal(guard.scene,'observatory');assert.ok(guard.flags.includes('guardReturned'));assert.ok(!guard.companions.includes('Pikachu'));assert.match(storyText(byId.observatory,guard),/familiar Pikachu/);assert.ok(consequence(guard));assert.ok(companionConversation(guard).some(d=>d.speaker==='Pikachu'));
guard=choose(guard,'spark');assert.ok(guard.flags.includes('spark'));
for(const step of ['careful','respect','empathy','support','heartPlan','Link Pikachu’s spark to the village lanterns'])guard=choose(guard,step);
assert.equal(guard.scene,'endLantern');assert.ok(endingMemories(guard).some(m=>m.scene==='rescue'&&m.effect.includes('came back')));
let promise=initial('Squirtle');for(const step of ['brave','song','river','reply','listener','wisdom','key','kind','riverFriend','promise','promiseRoute','keptPromise','gentleVoice','promiseFulfilled','Sing the three-note song together'])promise=choose(promise,step);
assert.equal(promise.scene,'endSong');assert.ok(!promise.history.some(h=>h.scene==='observatory'));assert.ok(endingMemories(promise).some(m=>m.scene==='island'&&m.effect.includes('heart ring')));assert.ok(endingMemories(promise).some(m=>m.scene==='brook'));
const bridgeWithoutPromise=here('bridge','Squirtle',['riverFriend']);assert.ok(!available(bridgeWithoutPromise).some(c=>c.flag==='promiseRoute'));
const bridgeWithoutLapras=here('bridge','Squirtle',['promise']);assert.ok(!available(bridgeWithoutLapras).some(c=>c.flag==='promiseRoute'));
const waterFriend={...here('bridge','Squirtle',['promise','clearWater']),companions:['Lapras']};assert.ok(available(waterFriend).some(c=>c.flag==='promiseRoute'),'Squirtle’s channel rescue must also count as Lapras friendship');
let nest=initial('Charmander');for(const step of ['kind','map','ember','nest','listener','wisdom'])nest=choose(nest,step);
assert.equal(nest.scene,'clearing');assert.ok(nest.flags.includes('nestGift'));assert.ok(available({...nest,scene:'falls'}).some(c=>c.flag==='songDoor'));
assert.ok(!available(here('observatory')).some(c=>c.flag==='spark'));
assert.match(storyText(byId.earth,here('earth','Bulbasaur',['garden'])),/first small garden/);
const old={...initial('Charmander'),scene:'observatory',flags:['forestGuard']};assert.ok(restoreSave(JSON.stringify(old))?.flags.includes('guardReturned'));
assert.equal(restoreSave('{bad json'),null);assert.equal(restoreSave(JSON.stringify({...old,scene:'not-a-scene'})),null);
const damaged=restoreSave(JSON.stringify({...old,puzzles:{observatory:{input:[999],hints:99}}}));assert.deepEqual(damaged?.puzzles,{});
for(const state of [guard,promise,nest,here('stairs','Squirtle',['promiseRoute']),here('bridge','Squirtle',['promise','riverFriend']),here('lumi','Squirtle',['replyTrust']),here('lumi','Squirtle',['keptPromise'])]){
 const text=storyText(byId[state.scene],state);const n=[...new Intl.Segmenter('en',{granularity:'sentence'}).segment(text)].length;assert.ok(n>=2&&n<=4,`${state.scene} has ${n} sentences`);
}
// A journal snapshot must not gain knowledge from a later chapter.
const arrival=promise.history.find(h=>h.scene==='brook')!;assert.ok(arrival.flags&&!arrival.flags.includes('keptPromise'));
// Choosing Charmander instead of a feather must not credit an unused feather.
const warmEnding={...here('endAurora','Charmander',['feather']),history:[{scene:'shelter',choice:'Trade a little food for the feather'},{scene:'sky',choice:'Let Charmander keep Shinx safely warm'}]};
assert.ok(!endingMemories(warmEnding).some(m=>m.title==='Warmth from the cloud shepherd'));
console.log('PASS: starter-specific puzzles, retries/hints, partial saves, guarded choices, returning Pikachu, promise route, nest song, narrative variants, accurate ending memories and v1 save migration.');

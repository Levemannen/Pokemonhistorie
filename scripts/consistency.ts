import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {available,advance,byId,choiceText,endingMemories,initial,scenes,storyText,visibleCompanions,type State,type Starter} from '../src/story';
import {getPuzzle,tryPuzzle} from '../src/puzzles';
import {resolveIllustration,type IllustrationManifest} from '../src/illustrations';
const state=(scene:string,flags:string[]=[]):State=>({...initial('Squirtle'),scene,flags});
const stair=state('roof',['secretStair']);
assert(available(stair).some(c=>c.flag==='secretRoute'));
const routed=advance(stair,available(stair).find(c=>c.flag==='secretRoute')!);
const ending={...routed,scene:'endDawn',history:[{scene:'cave',choice:byId.cave.choices[1].label},...routed.history]};
assert(endingMemories(ending).some(m=>m.scene==='cave'&&m.title==='A secret worth carrying'));
const lapras={...state('heart'),companions:['Lapras','Eevee']};
assert(!visibleCompanions(lapras).includes('Lapras'));
assert(visibleCompanions({...lapras,scene:'island'}).includes('Lapras'));
assert(lapras.companions.includes('Lapras'));
const outside=advance(state('observatory'),byId.observatory.choices.find(c=>c.flag==='outsideStair')!);
assert.match(storyText(byId.roof,outside),/manual latch/);
assert.match(storyText(byId.island,state('island')),/Lumi lifts Shinx/);
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8')) as IllustrationManifest;
const scarf=state('lumi',['replyTrust','returnedScarf']);
assert.match(storyText(byId.lumi,scarf),/scarf you found/);
assert.match(resolveIllustration(manifest,scarf).base,/scarf/);
const promised=state('lumi',['replyTrust','returnedScarf','keptPromise']);
assert.match(storyText(byId.lumi,promised),/hidden stair/);
assert.match(resolveIllustration(manifest,promised).base,/promise/);
let stars=state('mushrooms');
assert.deepEqual(getPuzzle(stars)!.answer,[6,4,2]);
for(const n of [6,4,2])stars=tryPuzzle(stars,n);
assert(stars.flags.includes('puzzle:mushrooms'));
assert.match(getPuzzle(state('falls'))!.observation,/two outer bells/);
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 for(const scene of scenes){
  const text=storyText(scene,{...initial(starter),scene:scene.id});
  assert(!text.includes('{starter}'));
  assert(text.length>60,scene.id);
  for(const choice of scene.choices){const original=choice.label;assert(choiceText(choice,starter).length>5);assert.equal(choice.label,original);}
 }
}
assert(!readFileSync('src/App.tsx','utf8').includes('className="choice-number"'));
console.log('PASS: hidden stair consequence, matching text/art priorities, river-only Lapras, name discovery, outside roof latch, illustrated puzzle direction and stable choice labels.');

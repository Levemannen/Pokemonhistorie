import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {initial,available,advance,byId,scenes,storyText,choiceText,companionConversation,type State,type Starter} from '../src/story';
import {getPuzzle,puzzleIds,tryPuzzle,hintPuzzle} from '../src/puzzles';
import {restoreSave} from '../src/save';
import {examineItem,itemDiscovery} from '../src/inventory';
import {branchAt,journeyText} from '../src/journeyReview';
import {StoryExtras} from '../src/StoryExtras';
import {AdventureBag} from '../src/AdventureBag';
import {resolveIllustration} from '../src/illustrations';
import {illustrationAlt} from '../src/artDescriptions';
import {sentenceParts} from '../src/words';
const starters:Starter[]=['Bulbasaur','Charmander','Squirtle'];
const choose=(s:State,id:string)=>{const c=available(s).find(c=>c.flag===id||c.label===id);assert(c,`${s.scene}: ${id}`);return advance(s,c);};
let checks=0;
for(const starter of starters)for(const scene of puzzleIds){
 let s={...initial(starter),scene};const p=getPuzzle(s)!;
 for(const answer of p.answer)s=tryPuzzle(s,(answer+1)%p.buttons.length);
 assert(!s.flags.includes(`puzzle:${scene}`));assert.equal(s.scene,scene);assert.equal(s.history.length,0);
 s=hintPuzzle(s);assert.equal(s.puzzles?.[scene].hints,1);
 s=tryPuzzle(s,p.answer[0]);const saved=restoreSave(JSON.stringify(s))!;assert.deepEqual(saved.puzzles,s.puzzles);
 s=saved;for(const answer of p.answer.slice(1))s=tryPuzzle(s,answer);
 assert(s.flags.includes(`puzzle:${scene}`));assert.deepEqual(restoreSave(JSON.stringify(s))!.flags,s.flags);checks++;
}
// Synthetic rule contracts, deliberately NOT counted as reachable journeys.
for(let mask=0;mask<16;mask++){
 const flags=['keptPromise','returnedScarf','replyTrust','privacy'].filter((_,i)=>mask&(1<<i));
 const text=storyText(byId.lumi,{...initial('Squirtle'),scene:'lumi',flags});
 for(const [flag,term] of [['keptPromise','hidden stair'],['returnedScarf','scarf you found'],['replyTrust','river reply'],['privacy','private']])assert.equal(text.includes(term),flags.includes(flag));checks++;
}
const earth=storyText(byId.earth,{...initial('Squirtle'),scene:'earth',flags:['garden','floatingLanterns']});assert(earth.includes('Moonwood')&&earth.includes('Psyduck')&&earth.includes('watering'));
for(const flag of ['curious','humor','patient','builder','rune'])assert(!available({...initial('Bulbasaur'),scene:'bank',flags:[flag]}).some(c=>c.to==='cave'));
for(const flag of ['map','letter','archiveMap'])assert(available({...initial('Bulbasaur'),scene:'bank',flags:[flag]}).some(c=>c.to==='cave'));
for(const starter of starters){
 assert(!companionConversation({...initial(starter),scene:'rescue'}).some(line=>/lift the ivy|loosen the knot|while you help Pikachu/.test(line.text)),'Rescue dialogue must reflect the completed rescue');
 const c=byId.observatory.choices.find(c=>c.flag==='teamwork')!;assert(choiceText(c,starter).includes(starter));
 for(const other of starters.filter(s=>s!==starter))assert(!choiceText(c,starter).includes(other));
 assert(!companionConversation({...initial(starter),scene:'stairs',companions:['Lapras']}).some(c=>c.speaker==='Lapras'));
}
// Real route: examine the memory after studying the archive, then use it at the ending.
let route=initial('Squirtle');for(const step of ['kind','map','trust','curious','detour','humor','understanding','key','builder','patient','stardust'])route=choose(route,step);
assert.equal(route.scene,'bridge');assert.equal(examineItem(route,'feather'),route,'Cannot inspect an unowned item');
route=examineItem(route,'stardust');assert.match(itemDiscovery(route,'stardust'),/warm-light/);
for(const step of ['steady','feather','teamwork','secretRoute','respect','villagePlan','skyPlan','Release the stars and carry Shinx home'])route=choose(route,step);
assert.equal(route.scene,'endDawn');assert.match(storyText(byId.endDawn,route),/warm night-light/);assert.match(storyText(byId.endDawn,route),/every original star/);
const original=JSON.stringify(route),fork=branchAt(route,3)!;assert(fork.journeyId!==route.journeyId);assert(!fork.flags.includes('stardust'));assert.equal(JSON.stringify(route),original);assert.equal(fork.history.length,3);assert(restoreSave(JSON.stringify(fork)));
assert(journeyText(route).includes('warm night-light'));assert(!journeyText(route).includes('{starter}'));
assert(renderToStaticMarkup(<AdventureBag game={route} onChange={()=>{}}/>).includes('Examined'));
assert(renderToStaticMarkup(<StoryExtras game={route} text={storyText(byId.endDawn,route)} speak={()=>{}}/>).includes('A moment to think about chapter 5'));
// Recheck every representative route from the graph verifier, using actual available choices.
const proof=JSON.parse(readFileSync('verification-report.json','utf8'));let routes=0;
for(const starter of starters)for(const [ending,steps] of Object.entries(proof.reachableRoutes[starter]) as [string,string[]][]){
 let s=initial(starter);
 for(const step of steps.slice(0,-1)){
  const at=step.indexOf(': ');assert.equal(s.scene,step.slice(0,at));const label=step.slice(at+2);
  let c=available(s).find(c=>c.label.replaceAll('{starter}',starter)===label);
  if(!c){const p=getPuzzle(s)!;assert(p);for(const n of p.answer)s=tryPuzzle(s,n);c=available(s).find(c=>c.label.replaceAll('{starter}',starter)===label);}
  assert(c);s=advance(s,c);s=restoreSave(JSON.stringify(s))!;assert(s);
  const text=storyText(byId[s.scene],s);assert(!text.includes('{starter}'));const sentences=sentenceParts(text).map(p=>p.text.trim());assert.equal(new Set(sentences).size,sentences.length,'Repeated sentence');assert(sentences.length>=2&&sentences.length<=4,s.scene+' length');
 }
 assert.equal(byId[s.scene].ending,ending);routes++;
}
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
const warm={...initial('Charmander'),scene:'endAurora',history:[{scene:'sky',choice:'Let Charmander keep Shinx safely warm'}]};
assert(resolveIllustration(manifest,warm).base.endsWith('endAurora-charmander.png'));
assert(!resolveIllustration(manifest,{...warm,history:[{scene:'sky',choice:'Make a warm nest with the cloud feather'}]}).base.endsWith('endAurora-charmander.png'));
assert.equal(resolveIllustration(manifest,{...initial('Bulbasaur'),scene:'grove',flags:['puzzle:grove']}).base,manifest.scenes.rescue.base.Bulbasaur);
for(const scene of scenes)assert(illustrationAlt({...initial('Bulbasaur'),scene:scene.id},manifest.scenes[scene.id].base.Bulbasaur).length>40);
// File-name casing matters on GitHub Pages even though Windows accepts a wrong case.
for(const scene of Object.values(manifest.scenes) as any[])for(const path of [...Object.values(scene.base),...(scene.variants||[]).map((v:any)=>v.path)] as string[]){let dir='public';for(const component of path.split('/')){assert(readdirSync(dir).includes(component),`Case mismatch ${path}`);dir+='/'+component;}}
writeFileSync('docs/development-test-report.json',JSON.stringify({puzzleAndCombinationCases:checks,replayedEndings:routes,actualSpecialRoute:route.history,checks:['mid-puzzle save','wrong answers','combined Lumi reactions','combined gardens','geographic cave gate','starter labels','river-only Lapras','item ownership','examined-memory solution','safe branch snapshot','text download','conditional art','case-sensitive asset paths'],note:'Combination contracts are synthetic unit tests; only engine-replayed paths are reported as actual routes.'},null,2));
console.log(`PASS: ${checks} puzzle/combination contracts, ${routes} saved-and-restored ending routes, examined-memory route, safe branching, contextual text export and artwork rules.`);

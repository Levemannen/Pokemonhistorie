import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {scenes,initial,byId,available,advance,storyText,chapters,type Starter} from '../src/story';
import {translate,setLanguage} from '../src/i18n';
import {getPuzzle,tryPuzzle,puzzleIds} from '../src/puzzles';
import {restoreSave} from '../src/save';
import {branchAt} from '../src/journeyReview';
import {StoryChoices} from '../src/StoryChoices';
import {PuzzleCard} from '../src/PuzzleCard';
import {MyWords} from '../src/MyWords';
import {StoryExtras} from '../src/StoryExtras';
import {JourneyMap} from '../src/JourneyMap';
const proof=JSON.parse(readFileSync('verification-report.json','utf8'));
const leaks:{context:string;text:string}[]=[];let pages=0;
const english=/\b(the|your|you|with|when|while|their|they|would|could|will|which|where|from|this|that|before|after|and|into|beside|together)\b/i;
function check(text:string,context:string){const nb=translate(text,'nb');assert(!/\{(?:\d+|starter)\}/.test(nb),context);if(english.test(nb))leaks.push({context,text:nb});pages++;return nb;}
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 for(const scene of scenes)check(storyText(scene,{...initial(starter),scene:scene.id}),starter+':'+scene.id);
 for(const [ending,steps] of Object.entries(proof.reachableRoutes[starter]) as [string,string[]][]){
  let state={...initial(starter),language:'nb' as const};
  for(const step of steps.slice(0,-1)){
   const label=step.slice(step.indexOf(': ')+2);let choice=available(state).find(c=>c.label.replaceAll('{starter}',starter)===label);
   if(!choice){for(const n of getPuzzle(state)!.answer)state={...tryPuzzle(state,n),language:'nb'};choice=available(state).find(c=>c.label.replaceAll('{starter}',starter)===label);}
   assert(choice);state={...advance(state,choice),language:'nb'};
   const restored=restoreSave(JSON.stringify(state))!;assert.equal(restored.language,'nb');assert.deepEqual(restored.flags,state.flags);
   check(storyText(byId[state.scene],state),starter+':'+state.scene+':'+label);
  }
  assert.equal(byId[state.scene].ending,ending);assert.equal(branchAt(state,0)!.language,'nb');
 }
 for(const id of puzzleIds){const state={...initial(starter),scene:id},p=getPuzzle(state)!;for(const text of [p.title,p.instruction,p.observation,p.success,...p.buttons,...p.hints])check(text,id);}
}
const flags=[...new Set(scenes.flatMap(s=>s.choices.flatMap(c=>c.flag?[c.flag]:[])))];
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[])for(const scene of scenes)for(const set of [...flags.map(f=>[f]),flags])check(storyText(scene,{...initial(starter),scene:scene.id,flags:set}),starter+':'+scene.id+':'+set.join(','));
setLanguage('nb');
for(const chapter of chapters)assert.notEqual(translate(chapter),chapter);
const game={...initial('Bulbasaur'),scene:'grove'};
const choices=renderToStaticMarkup(<StoryChoices game={game} onChoose={()=>{}} speak={()=>{}} speechAvailable={false}/>);
assert.equal((choices.match(/class="choose-story"/g)||[]).length,available(game).length);
assert(choices.includes('Stopp og befri Pikachu'));assert(choices.includes('English help'));assert(!choices.includes('Trykk på den engelske teksten'));
const puzzle=renderToStaticMarkup(<PuzzleCard game={game} onChange={()=>{}}/>);assert(puzzle.includes('puzzle-controls'));assert(puzzle.includes('Pikachu'));assert(!english.test(puzzle.replace(/<[^>]*>/g,'')));
const extras=renderToStaticMarkup(<StoryExtras game={game} text="" speak={()=>{}}/>);assert(extras.includes('Bulbasaur'));assert(extras.includes('<details>'));
assert(renderToStaticMarkup(<JourneyMap game={game}/>).includes('place-node'));
const notebook=renderToStaticMarkup(<MyWords words={[{word:'promise',example:'We keep our promise.',scene:'island',sceneTitle:'The island',starter:'Bulbasaur',learnedAt:'2026-10-25'}]} speak={()=>{}} speechAvailable={false}/>);assert(notebook.includes('We keep our promise.'));assert(notebook.includes('løfte'));
setLanguage('en');assert.equal(translate('The stars return.'),'The stars return.');
writeFileSync('docs/bilingual-review.json',JSON.stringify({checkedTexts:pages,leaks},null,2));
assert.equal(leaks.length,0,'Untranslated English remains; see docs/bilingual-review.json');
console.log(`PASS: ${pages} bilingual text checks, 18 real routes, persisted language, rendered choices/puzzles/map and English learning notebook.`);

import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {advance,available,byId,initial,endingMemories,companionConversation,illustrationScene,type State} from '../src/story';
import {friendFates} from '../src/epilogues';
import {journeyVisits} from '../src/journey';
import {JourneyMap} from '../src/JourneyMap';
import {PuzzleCard} from '../src/PuzzleCard';
import {getPuzzle} from '../src/puzzles';
import {restoreSave} from '../src/save';
const choose=(state:State,flag:string)=>{const c=available(state).find(c=>c.flag===flag||c.label===flag);assert.ok(c,`${flag} missing at ${state.scene}`);return advance(state,c);};
let path=initial('Bulbasaur');
for(const flag of ['kind','map','trust','curious','detour','humor'])path=choose(path,flag);
assert.equal(path.scene,'echoArchive');assert.ok(companionConversation(path).some(c=>c.speaker==='Gastly'));
path=choose(path,'archiveMap');assert.equal(path.scene,'clearing');
for(const flag of ['rope','builder','duck'])path=choose(path,flag);
assert.equal(path.scene,'reedWorkshop');assert.ok(path.companions.includes('Psyduck'));
for(const flag of ['floatingLanterns','privacy','patient'])path=choose(path,flag);
assert.equal(path.scene,'windwatch');assert.ok(companionConversation(path).some(c=>c.speaker==='Altaria'));
path=choose(path,'flockGuide');assert.equal(path.scene,'roof');assert.ok(!path.history.some(h=>h.scene==='observatory'));
for(const flag of ['secretRoute','respect','empathy','support','earthPlan','reedGarden'])path=choose(path,flag);
assert.equal(path.scene,'endGarden');assert.ok(endingMemories(path).some(m=>m.scene==='echoArchive'&&m.effect.includes('map')));assert.ok(endingMemories(path).some(m=>m.scene==='windwatch'));assert.ok(endingMemories(path).some(m=>m.scene==='reedWorkshop'));
const fates=friendFates(path);assert.match(fates.find(f=>f.name==='Psyduck')!.text,/star reeds/);assert.ok(fates.some(f=>f.name==='Gastly'));assert.ok(fates.some(f=>f.name==='Altaria'));assert.ok(!fates.some(f=>f.name==='Pikachu'),'Unhelped Pokémon must not receive invented rescue credit');
const visits=journeyVisits(path);assert.deepEqual(visits.map(v=>v.id),[...path.history.map(h=>h.scene),path.scene]);assert.equal(visits.filter(v=>v.current).length,1);
assert.ok(visits.every(v=>v.snapshot.scene===v.id));assert.ok(!visits.find(v=>v.id==='lantern')!.snapshot.flags.includes('reedGarden'),'Map snapshots must not leak future knowledge');
const before=JSON.stringify(path);const fullMap=renderToStaticMarkup(<JourneyMap game={path}/>);assert.equal(JSON.stringify(path),before);assert.ok(fullMap.includes('The Echo Archive'));assert.ok(!fullMap.includes('The sleeping observatory'),'Skipped places must stay unnamed on the map');
assert.ok(fullMap.includes('Back to the map'),'An inspected memory needs a clear way back to the route');
const firstMap=renderToStaticMarkup(<JourneyMap game={initial('Squirtle')}/>);for(const secret of ['The Echo Archive','Psyduck’s Reed Workshop','Altaria’s Wind-Watch Perch','The Lantern League'])assert.ok(!firstMap.includes(secret),`Map revealed ${secret}`);
const emptyMap=renderToStaticMarkup(<JourneyMap game={null}/>);assert.ok(emptyMap.includes('first footprint'));assert.ok(!emptyMap.includes('Moonlit'));
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as const){
 const game={...initial(starter),scene:'observatory'};const p=getPuzzle(game)!;assert.ok(!p.instruction.includes('→'));assert.ok(!p.instruction.includes('first'));assert.ok(!companionConversation(game)[0].text.includes('Roots, leaves, then flowers'));
 const html=renderToStaticMarkup(<PuzzleCard game={game} onChange={()=>{}}/>);assert.ok(html.includes('Look a little closer'));assert.ok(html.includes(`Ask ${starter} for a hint`));assert.ok(!html.includes(p.hints[1]),'An unrequested solution must not be rendered');
}
const melodyHTML=renderToStaticMarkup(<PuzzleCard game={{...initial('Bulbasaur'),scene:'falls'}} onChange={()=>{}}/>);assert.match(melodyHTML,/<details class="written-echo"><summary>/);assert.ok(!melodyHTML.includes('written-echo" open'),'Written melody must be an optional clue');
const stayedHome={...initial('Charmander'),scene:'endDawn',flags:['forestGuard','riverGuard','nest','craft','honest'],companions:[]};
for(const name of ['Pikachu','Lapras','Hoothoot','Altaria','Gastly']){const fate=friendFates(stayedHome).find(f=>f.name===name);assert.ok(fate,`${name} needs an epilogue even without recruitment`);assert.equal(fate.travelled,false);}
assert.match(friendFates(stayedHome).find(f=>f.name==='Lapras')!.text,/stays on the river/);
for(const ending of ['endDawn','endAurora','endSong','endSanctuary','endLantern','endGarden']){const results=friendFates({...initial('Bulbasaur'),scene:ending});assert.ok(results.some(f=>f.name==='Lumi'));assert.ok(results.some(f=>f.name==='Shinx'));assert.equal(new Set(results.map(f=>f.name)).size,results.length);}
assert.deepEqual(friendFates(initial('Bulbasaur')),[]);
assert.equal(restoreSave(JSON.stringify({...initial('Squirtle'),scene:'reedWorkshop'}))?.scene,'reedWorkshop');
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
for(const scene of ['echoArchive','reedWorkshop','windwatch']){assert.ok(byId[scene]);assert.equal(manifest.scenes[scene].fallbackSourceScene,illustrationScene(scene));}
assert.ok(readdirSync('public/images/scenes').filter(f=>f.endsWith('.svg')).length>=117,'Original scene fallbacks must remain available');
console.log('PASS: three exclusive encounters and their later consequences, personal non-party epilogues, spoiler-free read-only route map, optional puzzle observations/solutions, and existing art reuse.');

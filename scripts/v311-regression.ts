import {historicalState} from '../src/story';
import {mapState} from '../src/miraMapData';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {advance,available,choicesById,raw,rawById,resultText,storyText} from '../src/edition3';
import {setLanguage} from '../src/i18n';
import type {State} from '../src/story';

const graph=raw.map(s=>[s.id,s.choices.map(({id,to,when,set,get,alternate})=>({id,to,when,set,get,alternate}))]);
assert.equal(createHash('sha256').update(JSON.stringify(graph)).digest('hex'),'959936535b7fde8a4132bcdd38634044deaaf81380dc95f19c9d888e64bd4c43','3.1.0 graph, including ordering');
const source=readFileSync('docs/editorial/v3.1.1-manus.md','utf8').replaceAll('\r','');
const [nb,en]=[...source.matchAll(/^`{3}text\n([\s\S]*?)\n`{3}$/gm)].map(m=>m[1]);
assert.equal(rawById.S25.nb,nb);assert.equal(rawById.S25.en,en);
const fixtures=JSON.parse(readFileSync('docs/v3-fixtures.json','utf8')) as State[];
function fixture(scene:string){return structuredClone(fixtures.find(s=>s.scene===scene)!);}
function choose(scene:string,id:string){
 const s=fixture(scene),choice=available(s).find(c=>c.id===id);assert(choice,id);
 return advance(s,choice);
}
function epilogue(s:State){return storyText({...s,scene:'S25'});}
assert(choicesById['S01.1'].nbResponse?.includes('Noen gisper på torget.'));
for(const language of ['nb','en'] as const){
 setLanguage(language); const norwegian=language==='nb';
 for(const starter of ['Bulbasaur','Charmander','Squirtle'] as const)assert(storyText({...fixture('S05'),starter}).includes(norwegian?'beinet ditt':'your leg'));
 assert(!/secret sky sign|hidden signs of the sky|skjulte himmeltegn/i.test(storyText(fixture('S06'))));
 for(const id of ['S08.1','S08.2','S08.3']){
  const result=choose('S08',id);
  assert.equal(resultText(result).includes('Noctowl'),id==='S08.1');
  assert.equal(epilogue(result).includes('Noctowl'),id==='S08.1');
 }
 const crossing=choose('S11','S11.2'),response=resultText(crossing);
 const steps=norwegian?['andre siden','begge armene','plattform','klatrer om bord']:['far bank','both arms','platform','climb aboard'];
 let index=-1;for(const step of steps){const next=response.indexOf(step);assert(next>index,step);index=next;}
 assert.equal(crossing.scene,'S12');
 for(const id of ['S15.1','S15.2']){
  const result=choose('S15',id);assert.equal(result.world!.items.includes('altaria_feather'),id==='S15.1');
  assert(epilogue(result).includes(id==='S15.1'?(norwegian?'skisse fra fjellet':'sketch from the mountain'):(norwegian?'hjelpere fulgte':'helpers followed')));
 }
 const pikachu=choose('Q_PIKACHU','Q_PIKACHU.1');
 assert(!pikachu.companions.includes('Pikachu'));assert(epilogue(pikachu).includes(norwegian?'hjelpelaget':'rescue team'));
 for(const [scene,detour] of [['S19','S19.1'],['S23','S23.2']]){
  const routes=JSON.parse(readFileSync('docs/v3-routes.json','utf8')) as State[];
  const possible=routes.map(route=>historicalState(route,route.history.findIndex(h=>h.scene===scene)))
   .filter(s=>s.scene===scene && available(s).some(c=>c.id===detour));
  const hubs=possible.map(s=>advance(s,choicesById[detour]));
  const hub=hubs.find(s=>available(s).some(c=>c.to==='Q_RECONCILE'));assert(hub);
  assert.equal(hub.history.some(h=>h.scene==='S21'),scene==='S23');
  const river=advance(hub,available(hub).find(c=>c.to==='Q_RECONCILE')!);
  const after=advance(river,choicesById['Q_RECONCILE.1']);
  assert(resultText(after).includes(norwegian?'hva Shinx ønsker':'what Shinx wants'));
  const memory=norwegian?'Vi tok vare på brevet':'We kept your letter';
  assert(!epilogue(hub).includes(memory));assert(epilogue(after).includes(memory));
 }
 const reply=choose('Q_RECONCILE','Q_RECONCILE.1');
 assert(resultText(reply).includes(norwegian?'hva Shinx ønsker':'what Shinx wants'));
 assert(epilogue(reply).includes(norwegian?'brevet':'your letter'));
 assert(!/not a second seed|ikke et nytt frø/i.test(storyText(fixture('E_GARDEN'))));
 for(const id of ['DAWN','AURORA','LANTERN','SONG','GARDEN','SANCTUARY']){
  const after=choose('E_'+id,'E_'+id+'.1');assert.equal(after.scene,'S25');assert.equal(mapState(after).current,'village');
  assert(storyText(after).startsWith(norwegian?'En tid etter':'Some time after'));
 }
}
console.log('PASS: 3.1.0 graph fingerprint, exact paired epilogue and 3.1.1 choice continuity.');

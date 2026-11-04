import {historicalState} from '../src/story';
import {mapState} from '../src/miraMapData';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {advance,available,choicesById,raw,resultText,storyText} from '../src/edition3';
import {setLanguage} from '../src/i18n';
import type {State} from '../src/story';

const graph=raw.map(s=>[s.id,s.choices.map(({id,to,when,set,get,alternate})=>({id,to,when,set,get,alternate}))]);
assert.equal(createHash('sha256').update(JSON.stringify(graph)).digest('hex'),'b7b88d7765662ec0969fcae52bb6992801158db4344daacfaa06d6be5b74f87e','3.2.0 graph, including ordering');
const fixtures=JSON.parse(readFileSync('docs/v3-fixtures.json','utf8')) as State[];
function fixture(scene:string){return structuredClone(fixtures.find(s=>s.scene===scene)!);}
function choose(scene:string,id:string){
 const s=fixture(scene),choice=available(s).find(c=>c.id===id);assert(choice,id);
 return advance(s,choice);
}
function epilogue(s:State){return storyText({...s,scene:'S25'});}
for (const nest of [false,true]) for (const companion of [false,true]) {
 const hub=fixture('Q_RETURN');
 hub.world!.flags.hoothoot_nest=String(nest);
 hub.world!.flags.companion_hoothoot=String(companion);
 const canReturn=!nest && !companion;
 assert.equal(available(hub).some(c=>c.id==='Q_RETURN.3'),canReturn);
 if(!canReturn) assert.throws(()=>advance(hub,choicesById['Q_RETURN.3']));
}
assert(choicesById['S01.1'].nbResponse?.includes('Noen gisper på torget.'));
for(const language of ['nb','en'] as const){
 setLanguage(language); const norwegian=language==='nb';
 for(const starter of ['Bulbasaur','Charmander','Squirtle'] as const)assert(storyText({...fixture('S05'),starter}).includes(norwegian?'beinet ditt':'your leg'));
 assert(!/secret sky sign|hidden signs of the sky|skjulte himmeltegn/i.test(storyText(fixture('S06'))));
 for(const id of ['S08.1','S08.2','S08.3']){
  const result=choose('S08',id);
  assert.equal(resultText(result).includes('Noctowl'),id==='S08.1');
  const hub={...result,scene:'Q_RETURN'};
  assert.equal(available(hub).some(c=>c.id==='Q_RETURN.3'),id==='S08.3');
 }
 const crossing=choose('S11','S11.2'),response=resultText(crossing);
 const steps=norwegian?['andre siden','begge armene','plattform','klatrer om bord']:['far bank','both arms','platform','climb aboard'];
 let index=-1;for(const step of steps){const next=response.indexOf(step);assert(next>index,step);index=next;}
 assert.equal(crossing.scene,'S12');
 for(const id of ['S15.1','S15.2']){
  const result=choose('S15',id);assert.equal(result.world!.items.includes('altaria_feather'),id==='S15.1');

 }
 const pikachu=choose('Q_PIKACHU','Q_PIKACHU.1');
 assert(!pikachu.companions.includes('Pikachu'));
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
  const memory=norwegian?'ordene fra brevet ditt':'words from your letter';
  assert(!epilogue(hub).includes(memory));assert(epilogue(after).includes(memory));
 }
 const reply=choose('Q_RECONCILE','Q_RECONCILE.1');
 assert(resultText(reply).includes(norwegian?'hva Shinx ønsker':'what Shinx wants'));
 assert(epilogue(reply).includes(norwegian?'brevet ditt':'your letter'));
 assert(!/not a second seed|ikke et nytt frø/i.test(storyText(fixture('E_GARDEN'))));
 for(const id of ['DAWN','AURORA','LANTERN','SONG','GARDEN','SANCTUARY']){
  const after=choose('E_'+id,'E_'+id+'.1');assert.equal(after.scene,'S25');assert.equal(mapState(after).current,'village');
  assert(storyText(after).startsWith(norwegian?'En tid etter':'Some time after'));
 }
}
console.log('PASS: 3.2.0 graph fingerprint, return guard and bilingual choice continuity.');

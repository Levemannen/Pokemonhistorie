import assert from 'node:assert/strict';
import fs from 'node:fs';
import {available,advance,choicesById,restore,rawById,storyText,resultText} from '../src/edition3';
import {setLanguage} from '../src/i18n';
import type {State} from '../src/story';
import detour from '../src/legacy-v3-detour.json';
const fixtures=JSON.parse(fs.readFileSync('docs/v3-fixtures.json','utf8')) as State[];
function fixture(scene:string){return structuredClone(fixtures.find(s=>s.scene===scene)!);}
function checkBranches(id:string,keys:string[],fallback:boolean,lang:'en'|'nb'){
 const p=rawById[id][lang].split('\n\n').find(p=>p.startsWith('[IF '+keys[0]+']'))!;
 const alternatives=p.split(/\[(?:IF [^\]]+|ELSE IF [^\]]+|ELSE|END)\]/).map(x=>x.trim()).filter(Boolean);
 assert.equal(alternatives.length,keys.length+Number(fallback));
 for(let mask=0;mask<2**keys.length;mask++){
  const s=fixture(id);
  for(const [i,key] of keys.entries())s.world!.flags[key]=String(!!(mask&(1<<i)));
  const first=keys.findIndex((_,i)=>!!(mask&(1<<i))),text=storyText(s);
  alternatives.forEach((part,i)=>assert.equal(text.includes(part),i===(first<0?keys.length:first),id+' '+keys+' '+mask));
 }
}
for(const lang of ['en','nb'] as const){
 setLanguage(lang);
 checkBranches('S25',['companion_pikachu','helped_altaria','companion_hoothoot','rescued_pikachu','helped_psyduck'],true,lang);
 checkBranches('S05',['mira_trust','mira_accountability'],false,lang);
 checkBranches('S25',['mira_trust','mira_accountability'],true,lang);
 checkBranches('S24',['lumi_trust','lumi_informed'],false,lang);
 for(const id of ['S16','S24'])for(const starter of ['Bulbasaur','Charmander','Squirtle'] as const){
  const s={...fixture(id),starter};
  for(const other of ['Bulbasaur','Charmander','Squirtle'])assert.equal(storyText(s).includes(other),other===starter);
 }
 const at=fixture('S24');
 assert(available(at).every(c=>c.to.startsWith('E_')));
 assert(!choicesById[detour.id]);assert.throws(()=>advance(at,detour));
 const h={scene:at.scene,choice:detour.label,choiceId:detour.id,world:at.world,flags:at.flags,companions:at.companions};
 const restored=restore({...at,scene:'Q_PREP',history:[...at.history,h],pendingResult:true})!;
 assert(restored);assert.equal(restored.scene,'Q_PREP');assert.equal(restored.history.at(-1)?.choiceId,detour.id);
 assert.equal(resultText(restored),lang==='nb'?detour.nbResponse:detour.response);assert.deepEqual(restored.world!.items,at.world!.items);
 assert.deepEqual(restore(restored)?.world,restored.world);
}
console.log('PASS: bilingual branch precedence, all starters, legal finale, historical detour replay and pending result.');

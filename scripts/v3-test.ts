import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as v3 from '../src/edition3';
import {getPuzzle,tryPuzzle} from '../src/puzzles';
import {setLanguage} from '../src/i18n';
import type {State,Starter} from '../src/story';
const routes:State[]=[];
const fixtures=new Map<string,State>(),coverage=new Set<string>();let checks=0;
function record(s:State){fixtures.set(s.scene,structuredClone(s));for(const language of ['en','nb'] as const){setLanguage(language);const text=v3.storyText(s);assert(text.length>30,s.scene);assert(!/\[(?:IF|ELSE|END)|\b(?:GOTO|RETURN|SET)\b|Only what you actually prepared|Bare det som virkelig/.test(text),s.scene+' exposes notation');}checks++;}
function solve(s:State){const p=getPuzzle(s);return p?p.answer.reduce(tryPuzzle,s):s;}
function step(s:State,id:string){s=solve(s);record(s);const c=v3.available(s).find(c=>c.id===id);assert(c,'Unavailable '+id+' at '+s.scene);coverage.add(id);const n=v3.advance(s,c!);assert.equal(n.world!.usedItems.filter(x=>x==='silver_seed').length,n.world!.flags.release_done==='true'?1:0);assert(!(n.world!.items.includes('silver_seed')&&n.world!.usedItems.includes('silver_seed')));assert(v3.restore(n),'Restore '+n.scene);record(n);return n;}
function route(starter:Starter,ending:string,bonus?:'moon'|'sun'|'both'|'both-no-map'){
 let s=v3.initial(starter);const special=ending==='AURORA'||ending==='SANCTUARY';
 const picks=[1,2,1,ending==='AURORA'?1:2,1,2,3,3,2,3,3,2,2,2,special?1:2,ending==='SONG'?1:2,3,ending==='SANCTUARY'?3:1,2,2,2];
 for(let i=1;i<=21;i++)s=step(s,`S${String(i).padStart(2,'0')}.${picks[i-1]}`);
 assert.equal(s.scene,'S22');assert.equal(v3.available(s).length,1);assert.equal(s.world!.flags.release_done,undefined);
 s=step(s,'S22.4');const prep=ending==='DAWN'||ending==='AURORA'?1:ending==='SONG'||ending==='LANTERN'?2:3;
 s=step(s,`Q_PREP.${prep}`);s=step(s,'Q_PREP.5');s=step(s,`S22.${prep}`);
 if(bonus){s=step(s,'S23.2');
  const tasks=bonus==='moon'?['Q_VILLAGE','Q_HOOTHOOT','Q_ALTARIA','Q_GASTLY','Q_MOON1','Q_MOON2','Q_MOON3','Q_RECONCILE']:bonus==='sun'?['Q_PIKACHU','Q_LAPRAS','Q_PSYDUCK','Q_ALTARIA','Q_BRIDGE','Q_LEAD']:['Q_VILLAGE','Q_PIKACHU','Q_HOOTHOOT','Q_LAPRAS','Q_PSYDUCK','Q_ALTARIA','Q_GASTLY','Q_BRIDGE','Q_LEAD','Q_MOON1','Q_MOON2','Q_MOON3','Q_RECONCILE','Q_ARCHIVE',...(bonus==='both'?['Q_STAR']:[])];
  for(const task of tasks){const c=v3.available(s).find(c=>c.to===task);if(!c)continue;s=step(s,c.id);s=step(s,task+'.1');assert(!v3.available(s).some(c=>c.to===task),'Quest repeat '+task);}
  s=step(s,'Q_RETURN.16');s=step(s,`S22.${prep}`);
 }
 s=step(s,'S23.1');const before=structuredClone(s);const wrong={...v3.available(s)[0],id:'S24.3',to:'E_SANCTUARY'};if(prep!==3)assert.throws(()=>v3.advance(s,wrong));
 s=step(s,`S24.${prep}`);assert.equal(s.scene,'E_'+ending);assert.equal(s.world!.flags.release_done,'true');
 const events=s.world!.flags.release_events.split(',');assert(events.indexOf('shinx_confirms')<events.indexOf('lumi_unlocks'));assert(events.indexOf('lumi_unlocks')<events.indexOf('release'));assert.equal(events.filter(e=>e==='plant_seed').length,1);assert.equal(events.indexOf('plant_seed')<events.indexOf('release'),prep===3);
 const restored=v3.restore(s)!;assert.deepEqual(restored.world,s.world);
 s=step(s,s.scene+'.1');assert.equal(s.scene,'S25');
 if(bonus){s=step(s,'S25.2');const target=bonus==='both'?'B_BOTH':bonus==='sun'?'B_SOLGALEO':'B_LUNALA';if(bonus==='both-no-map')assert.equal(v3.available(s).length,2);s=step(s,v3.available(s).find(c=>c.to===target)!.id);s=step(s,target+'.1');}else s=step(s,'S25.1');
 assert.equal(s.scene,'F_'+ending);assert(s.world!.flags.main_complete);assert.deepEqual(v3.restore(s)?.world,s.world);
 const tampered=structuredClone(before);tampered.world!.flags.warmth_earth_ready='true';tampered.world!.flags.release_done='true';assert.equal(v3.restore(tampered)?.world?.flags.release_done,undefined);
 routes.push(s);return s;
}
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[])for(const ending of v3.endings)route(starter,ending);
for(const bonus of ['moon','sun','both','both-no-map'] as const)for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[])route(starter,'DAWN',bonus);
// All legal choices at every collected decision are exercised, including return before meeting Lumi.
for(const source of [...fixtures.values()])for(const c of v3.available(solve(source))){const n=step(source,c.id);if(source.scene==='S19'&&c.to==='Q_RETURN'){assert.equal(n.world!.flags.return_main,'S20');const back=step(n,'Q_RETURN.16');assert.equal(back.scene,'S20');}}
// Every reachable decision can recover through equipment preparation; no hidden bonus is mandatory.
for(let seed=1;seed<=120;seed++){
 let n=seed,s=v3.initial((['Bulbasaur','Charmander','Squirtle'] as Starter[])[seed%3]);
 for(let i=0;i<180&&!s.scene.startsWith('F_');i++){
  s=solve(s);let choices=v3.available(s);assert(choices.length,s.scene+' dead end');
  if(i>85){const preferred=choices.find(c=>c.to==='S20'||c.to==='S21'||c.to==='S22'||c.to==='S23'||c.to==='S24'||c.to==='S25'||c.to.startsWith('E_')||c.to.startsWith('F_'));if(preferred)choices=[preferred];}
  n=(Math.imul(n,1664525)+1013904223)>>>0;s=step(s,choices[n%choices.length].id);
 }assert(s.scene.startsWith('F_'),'Route failed to terminate '+seed);
}
const partial=structuredClone(fixtures.get('Q_PREP')!);partial.world!.flags.earth_pot_found='true';delete partial.world!.flags.earth_backup_ready;
const repair=v3.available(partial).find(c=>c.id==='Q_PREP.4');assert(repair);assert.equal(v3.advance(partial,repair).world!.flags.earth_backup_ready,'true');coverage.add('Q_PREP.4');
fs.writeFileSync('docs/v3-routes.json',JSON.stringify(routes,null,2));
fs.writeFileSync('docs/v3-fixtures.json',JSON.stringify([...fixtures.values()],null,2));
fs.writeFileSync('docs/v3-test-report.json',JSON.stringify({passed:true,checkedStates:checks,scenes:fixtures.size,choiceCoverage:coverage.size,totalChoices:Object.keys(v3.choicesById).length,defensiveChoiceTestedWithPartialState:"Q_PREP.4",missingChoices:Object.keys(v3.choicesById).filter(id=>!coverage.has(id)),starters:3,endings:6,bonusVariants:3,bothWithoutMap:true,randomJourneys:120,languages:['en','nb']},null,2));
console.log(`PASS: ${checks} state checks, ${fixtures.size} scenes, ${coverage.size} choices; 18 starter/endings, 12 bonus routes, 120 random journeys; both languages.`);

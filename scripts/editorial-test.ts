import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {manuscriptScenes,rawById,initial,available,advance,condition,storyText,choiceResponse} from '../src/edition';
import {localizedManuscript} from '../src/storyLocale';
import {getPuzzle,tryPuzzle} from '../src/puzzles';
import {setLanguage,translate} from '../src/i18n';
import {seedLocation} from '../src/seedLocation';
import {restoreSave} from '../src/save';
import {historicalState,endingMemories,type State,type Starter} from '../src/story';
import {resolveIllustration} from '../src/illustrations';
const cases:[string,Starter,string[]][]=[
 ['A Hoothoot joins after nest repair','Bulbasaur',['hill.3','plan.1','sky.1']],
 ['B nest repaired and Hoothoot stays','Squirtle',['hill.1','plan.1','sky.1']],
 ['C Pikachu rescued and joins','Charmander',['grove.1','rescue.1','plan.2','heart.1']],
 ['D Pikachu guards and visits','Bulbasaur',['grove.1','rescue.2','stairs.1','observatory.2','plan.2','heart.2']],
 ['E helpers rescue Pikachu','Squirtle',['grove.2','plan.1','sky.1']],
 ['F keep and return letter','Bulbasaur',['gate.3','brook.1','lumi.2','plan.1','sky.1']],
 ['G reply without Hoothoot','Squirtle',['hill.1','gate.3','brook.2','plan.1','sky.1']],
 ['H reply with Hoothoot','Charmander',['hill.3','gate.3','brook.2','plan.1','sky.1']],
 ['I return Shinx scarf','Bulbasaur',['stairs.1','tower.3','lumi.4','plan.1','sky.1']],
 ['J tower without Shinx scarf','Squirtle',['bridge.2','windwatch.1','tower.1','plan.1','sky.1']],
 ['K help Altaria flock','Bulbasaur',['windwatch.1','plan.1','sky.1']],
 ['L walk while Altaria gathers flock','Charmander',['windwatch.3','shelter.1','plan.1','sky.2']],
 ['M Bulbasaur mechanism','Bulbasaur',['observatory.1','plan.1','sky.1']],
 ['N Charmander mechanism','Charmander',['observatory.1','plan.1','sky.1']],
 ['O Squirtle mechanism','Squirtle',['observatory.1','plan.1','sky.1']],
 ['P village garden','Bulbasaur',['plan.3','earth.1']],
 ['Q river garden','Squirtle',['ferry.2','reedWorkshop.1','plan.3','earth.4']],
 ['R plant sanctuary','Bulbasaur',['plan.3','earth.3']],
 ['S helper sanctuary','Charmander',['plan.2','heart.2']],
 ['T sky song','Squirtle',['plan.1','sky.4']],
 ['U heart song','Bulbasaur',['plan.2','heart.3']],
 ['V Charmander aurora','Charmander',['plan.1','sky.3']],
 ['W feather aurora','Squirtle',['shelter.2','plan.1','sky.2']],
 ['X few side trips','Bulbasaur',['gate.1','grove.3','roots.1','clearing.4','bank.3','falls.2','island.4','bridge.1','stairs.3','roof.1','tower.1','lumi.1','listen.1','plan.1','sky.1']],
 ['Y many side trips and all traveling friends','Bulbasaur',['square.3','hill.3','gate.2','ridge.1','brook.2','grove.1','rescue.1','mushrooms.2','hollow.1','echoArchive.2','clearing.1','bank.1','lapras.2','ferry.2','reedWorkshop.4','island.2','bridge.2','windwatch.2','shelter.1','observatory.1','roof.3','tower.4','lumi.1','listen.1','plan.3','earth.4']],
 ['Z cumulative river and listening promises','Bulbasaur',['lapras.3','island.2','plan.2','heart.4']],
];
const reachability=new Map<string,boolean>();
function canReach(scene:string,target:string):boolean{
 const key=scene+':'+target;if(reachability.has(key))return reachability.get(key)!;
 const result=scene===target||rawById[scene].choices.some(c=>canReach(c.to,target));reachability.set(key,result);return result;
}
function route(state:State,steps:string[],index=0):State|null{
 if(!steps.length)return state;
 if(index===steps.length)return rawById[state.scene].choices.length?null:state;
 const target=steps[index],targetScene=target.split('.')[0];
 if(!canReach(state.scene,targetScene))return null;
 const p=getPuzzle(state);if(p&&!state.flags.includes('puzzle:'+p.id))for(const n of p.answer)state=tryPuzzle(state,n);
 const choices=available(state).filter(c=>state.scene===targetScene?c.id===target:canReach(c.to,targetScene));
 for(const c of choices){const found=route(advance(state,c),steps,index+(c.id===target?1:0));if(found)return found;}
 return null;
}
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
const reports=[];let rendered=0;
for(const [name,starter,steps] of cases){
 const end=route(initial(starter),steps);assert(end,name+' unreachable');
 const pages:Record<string,unknown>[]=[];
 for(const locale of ['en','nb'] as const){setLanguage(locale);for(let i=0;i<=end.history.length;i++){
  const state:State=i===end.history.length?end:historicalState(end,i);const text=storyText(state);
  assert.equal(translate(text,locale),text,'Authored prose was translated twice: '+state.scene);
  assert(text.trim());assert(!/undefined|\{\w+\}|receiverholds|helpersholds|depending on the route|if chosen|your starter/i.test(text),name+' '+state.scene+' '+text);
  assert(!/[.!?]{2}|[a-z][A-Z][a-z]/.test(text.replaceAll('Willowbrook','').replaceAll('Moonwood','').replaceAll('Starfall','')),state.scene+' punctuation/word boundary');
  if(locale==='nb')assert(!/\b(the|your|with|while|through|someone|receiver)\b/i.test(text),name+' untranslated');
  const art=resolveIllustration(manifest,state);assert.equal(art.kind,'painted');
  pages.push({language:locale,scene:state.scene,text,image:art.base,choice:end.history[i]?.choiceId||null});rendered++;
  assert.deepEqual(restoreSave(JSON.stringify(state))?.world,state.world);
 }
 for(const m of endingMemories(end))assert(!/undefined|\{\w+\}/.test(m.effect));}
 const at=(id:string)=>{const i=end.history.findIndex(h=>h.scene===id);return i<0?end:historicalState(end,i);};
 setLanguage('en');
 if(name.startsWith('A ')){assert.equal(at('gate').world!.flags.nest,'saved');assert(at('gate').world!.partyTraveling.includes('Hoothoot'));}
 if(name.startsWith('B '))assert(!end.world!.partyTraveling.includes('Hoothoot'));
 if(name.startsWith('D '))assert(storyText(at('observatory')).includes('finished guiding'));
 if(name.startsWith('E '))assert(storyText(at('clearing')).includes('Pikachu is safe'));
 if(name.startsWith('F ')){assert(!end.world!.items.includes('letter'));assert(end.world!.usedItems.includes('letter'));}
 if(name.startsWith('G '))assert(!storyText(at('lumi')).includes('Hoothoot'));
 if(name.startsWith('I '))assert(end.world!.usedItems.includes('shinxScarf'));
 if(name.startsWith('J '))assert(!end.world!.items.includes('shinxScarf'));
 if(name.startsWith('L '))assert(choiceResponse(at('shelter'),'windwatch.3').includes('gathers the last'));
 if(name.startsWith('Q ')){assert(seedLocation(end)![0].includes('river'));assert(!storyText(end).includes('roots gradually reach'));}
 if(name.startsWith('R '))assert(storyText(end).startsWith('You settle the plant'));
 if(name.startsWith('S '))assert(storyText(end).includes('willing lantern keepers'));
 if(name.startsWith('T '))assert(storyText(end).includes('wrapped warm stone'));
 if(name.startsWith('U '))assert(storyText(end).includes('volunteer lanterns'));
 if(name.startsWith('Y '))assert.equal(end.world!.partyTraveling.length,4);
 if(name.startsWith('Z ')){assert(storyText(at('lumi')).includes('promise on the island'));assert(storyText(at('plan')).includes('promise you made beside Lapras'));}
 reports.push({name,starter,ending:end.scene,steps:end.history.map(h=>h.choiceId),pages});
}
for(const s of manuscriptScenes){
 const n=localizedManuscript[s.id];assert(n);assert.equal(new Set(s.passages.map(p=>p.id)).size,s.passages.length);
 for(const c of s.choices){assert(c.id);assert(n.choices[c.id]);for(const r of c.responses||[])assert(n.choices[c.id].responses?.[r.id]);}
 for(const p of s.passages){assert(p.text.trim());assert(n.passages[p.id]?.trim());}
}
// A save made before new text blocks still restores. IDs, not old wording, identify choices.
const old=initial('Bulbasaur');const next=advance(old,available(old)[0]);next.history[0].choice='Old wording from edition 2.1';assert(restoreSave(JSON.stringify(next)));
// Pre-editorial saves: only snapshots after the relevant choice receive the correction.
const beforeNest=route(initial('Bulbasaur'),['hill.3','plan.1','sky.1'])!;
delete beforeNest.world!.flags.nest;
for(const h of beforeNest.history)if(h.world)delete h.world.flags.nest;
const migratedNest=restoreSave(JSON.stringify(beforeNest))!;assert.equal(migratedNest.world!.flags.nest,'saved');
assert.equal(migratedNest.history.find(h=>h.scene==='hill')!.world!.flags.nest,undefined);
const beforeLetter=route(initial('Bulbasaur'),['brook.1','lumi.2','plan.1','sky.1'])!;
beforeLetter.world!.items.push('letter');beforeLetter.world!.usedItems=beforeLetter.world!.usedItems.filter(i=>i!=='letter');
const migratedLetter=restoreSave(JSON.stringify(beforeLetter))!;assert(!migratedLetter.world!.items.includes('letter'));
assert(migratedLetter.history.find(h=>h.scene==='lumi')!.world!.items.includes('letter'));
// Editorial text may change freely without altering conditional selection.
const sample=initial('Bulbasaur');assert(condition(sample,'starter=Bulbasaur'));assert(!condition(sample,'NOT starter=Bulbasaur'));
writeFileSync('docs/editorial-scenarios.json',JSON.stringify({cases:reports.length,renderedPages:rendered,reports},null,2));
setLanguage('en');console.log(`PASS: ${reports.length} continuity routes, ${rendered} bilingual pages, local painted art, text IDs, save round trips and cumulative promises.`);

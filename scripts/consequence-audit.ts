import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {scenes,qualities} from '../src/story';
import {choiceOutcomes} from '../src/narrative';
const files=readdirSync('src').filter(f=>/\.tsx?$/.test(f)&&!['words.ts','norwegian.ts','artDescriptions.ts'].includes(f));
const flags=[...new Set(scenes.flatMap(s=>s.choices.flatMap(c=>c.flag?[c.flag]:[])))];
const report=flags.map(flag=>{
 const producers=scenes.flatMap(s=>s.choices.filter(c=>c.flag===flag).map(c=>({scene:s.id,choice:c.label,to:c.to})));
 const gates=scenes.flatMap(s=>s.choices.filter(c=>c.needs===flag).map(c=>({scene:s.id,choice:c.label})));
 const reads=files.flatMap(file=>readFileSync('src/'+file,'utf8').split('\n').flatMap((line,i)=>{
  if(file==='story.ts'&&(line.startsWith('c(')||line.startsWith('export const qualities')))return [];
  if(!line.includes(`'${flag}'`)&&!line.includes(`"${flag}"`))return [];
  // Candidate static reads, not a claim of executable path coverage.
  return [{file,line:i+1}];
 }));
 const traits=Object.entries(qualities).filter(([,values])=>values.includes(flag)).map(([key])=>key);
 const activeTraits=traits.filter(t=>scenes.some(s=>s.choices.some(c=>c.needs===t)));
 return {flag,producers,gates,readCandidates:reads,traitCategories:traits,activeTraitGates:activeTraits,classification:gates.length?'Direct future choice gate':reads.length?'Narrative, inventory, relationship or rule consumer found':activeTraits.length?'Trait gate only; no other direct read found':'No direct future read found; immediate outcome/history only'};
});
const edges=scenes.flatMap(s=>s.choices.map((c,i)=>({scene:s.id,choice:c.label,to:c.to,immediateOutcome:choiceOutcomes[s.id][i],persistentFlag:c.flag||null,companion:c.companion||null,requirement:c.needs||null,starter:c.starter||null})));
writeFileSync('docs/consequence-audit.json',JSON.stringify({method:'Static consumer audit plus authored transition outcomes. Read candidates include display code and are not proof of gameplay significance; see classification and review manually. Trait-only flags are retained for old saves and aggregate forest-care paths. This does not label every choice as mechanically unique.',flags:report,edges},null,2));
writeFileSync('docs/CONSEQUENCE-AUDIT.md','# Consequence audit\n\nGenerated from the current source. All '+edges.length+' choices have an authored immediate outcome. The table distinguishes direct gates from display/rule consumers and trait-only state. A text acknowledgement is not the same as a new route. Candidate reads are a static heuristic, not a semantic proof.\n\n| Flag | Classification | Trait categories |\n|---|---|---|\n'+report.map(r=>`| ${r.flag} | ${r.classification} | ${r.traitCategories.join(', ')} |`).join('\n')+'\n\nFull choice outcomes and source-line read candidates: consequence-audit.json.\n');
console.log('Audited '+flags.length+' produced flags and '+edges.length+' choices; '+report.filter(r=>r.classification.startsWith('Trait')).length+' trait-only flags need editorial judgment.');

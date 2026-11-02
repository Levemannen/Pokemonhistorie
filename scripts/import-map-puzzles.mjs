import fs from 'node:fs';
import assert from 'node:assert/strict';

const source=fs.readFileSync(process.argv[2],'utf8').replace(/\r\n/g,'\n');
const patch=JSON.parse(source.match(/```json\n([\s\S]*?)\n```/)[1]);
const manuscript=JSON.parse(fs.readFileSync('src/manuscript-v3.json','utf8'));
for(const [id,{choices,...fields}] of Object.entries(patch)){
 const scene=manuscript.find(s=>s.id===id);
 for(const [key,value] of Object.entries(fields))assert.deepEqual(scene[key],value,id+'.'+key);
 for(const [choiceId,updates] of Object.entries(choices)){
  const choice=scene.choices.find(c=>c.id===choiceId);
  for(const [key,value] of Object.entries(updates))assert.deepEqual(choice[key],value,choiceId+'.'+key);
 }
}
const blocks=[...source.matchAll(/^## [1-4]\. (S\d+) – ([^\n]+)\n([\s\S]*?)(?=\n---)/gm)];
assert.equal(blocks.length,4);
const unwrap=text=>text.trim().replace(/^[«“]/,'').replace(/[»”]$/,'');
const puzzles=blocks.map(([,scene,title,body])=>{
 const parts=body.split(/^### (?:Bokmål|English) – complete puzzle\n|^### Bokmål – komplett gåte\n/gm).slice(1);
 assert.equal(parts.length,2);
 const localized=parts.map(part=>{
  const fields=Object.fromEntries([...part.matchAll(/^\*\*([^*]+):\*\*\s*([\s\S]*?)(?=\n\*\*|(?![\s\S]))/gm)].map(([,key,value])=>[key,value.trim()]));
  const opening=(fields['Åpning']||fields.Opening).split('\n').map(line=>line.replace(/^> ?/,'')).join('\n').trim();
  const answers=[...(fields.Svar||fields.Answers).matchAll(/^([ABC])\. (.*?) — \*\*(.*?)\*\*$/gm)];
  assert.equal(answers.length,3);
  return {
   button:unwrap(fields.Knapp||fields.Button),opening,
   answers:answers.map(([,letter,label,outcome])=>({label:unwrap(label),correct:['Riktig','Correct'].includes(outcome),response:unwrap(fields['Ved '+letter]||fields['On '+letter]||fields['Ved riktig svar']||fields['On correct'])})),
   hints:[unwrap(fields['Hint 1']),unwrap(fields['Hint 2'])],
   success:unwrap(fields['Ved riktig svar']||fields['On correct']),
   leave:unwrap(fields['Avslutt uten løsning']||fields.Avslutt||fields.Leave),
   note:unwrap(fields['Kartnotat etter løsning']||fields.Kartnotat||fields['Map note'])
  };
 });
 assert.deepEqual(localized[0].answers.map(a=>a.correct),localized[1].answers.map(a=>a.correct));
 return {scene,flag:body.match(/`(puzzle_\w+_solved)`/)[1],nb:localized[0],en:localized[1]};
});
const markers=source.split('\n').filter(line=>line.startsWith('| ')&&line.includes('«')&&line.includes(' / ')).map(line=>{
 const cells=line.split('|').slice(1,-1).map(c=>c.trim());
 const pair=cells[3].match(/«(.*?)» \/ «(.*?)»/);
 return {flags:[...cells[1].matchAll(/`([^\x60]+)`/g)].map(m=>m[1]),nb:pair[1],en:pair[2]};
});
assert.equal(markers.length,8);
assert(!fs.existsSync('src/tree-hints.json'),'Historical importer only supports the unpatched 3.0.6 manuscript.');
fs.writeFileSync('src/optional-puzzles.json',JSON.stringify(puzzles,null,2)+'\n');
fs.writeFileSync('src/map-markers.json',JSON.stringify(markers,null,2)+'\n');
console.log('Verified existing 3.0.6 patch. Extracted four bilingual puzzles and eight marker descriptions verbatim.');

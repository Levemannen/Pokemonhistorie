import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source=readFileSync('docs/editorial/v3.1.1-manus.md','utf8').replaceAll('\r','');
function section(id){
 const heading='### '+id+' ';
 const start=source.indexOf(heading);
 assert(start>=0,id);
 return source.slice(start+heading.length).split(/^#{2,3} /m)[0];
}
function quotes(id){return [...section(id).matchAll(/^> (.+)$/gm)].map(m=>m[1]);}
function replace(text,pattern,value){
 const match=text.match(pattern);
 assert(match && match[0],String(pattern));
 assert.equal(text.indexOf(match[0]),text.lastIndexOf(match[0]));
 return text.replace(match[0],()=>value);
}
export function applyV311(data){
 const scene=Object.fromEntries(data.map(s=>[s.id,s]));
 const choice=Object.fromEntries(data.flatMap(s=>s.choices.map(c=>[c.id,c])));
 choice['S01.1'].nbResponse=replace(choice['S01.1'].nbResponse,/Noen gispet på torget\./,'Noen gisper på torget.');
 for(const [i,lang] of ['nb','en'].entries()){
  const response=i?'response':'nbResponse';
  scene.S05[lang]=replace(scene.S05[lang],i?/Your partner walks so close that your shoulder[^.]+\./:/Partneren din går så tett ved siden av deg at skulderen din[^.]+\./,quotes('K02')[i]);
  scene.S06[lang]=replace(scene.S06[lang],i?/You can take time to study the pattern[^\n]+/:/Du kan bruke tid på å undersøke mønsteret[^\n]+/,quotes('K03')[i]);
  for(const [id,k] of [['S08.1','K04'],['S11.2','K05'],['Q_PIKACHU.1','K08']])choice[id][response]=quotes(k)[i];
  scene.S15[lang]=replace(scene.S15[lang],i?/You could search for the lost chick[^.]+\./:/Dere kan lete etter den savnede ungen[^.]+\./,quotes('K06')[i]);
  choice['S15.2'][response]=quotes('K06')[2+i];
  const labels=[...section('K06').matchAll(/^- `(?:nb|label)`: `([^`]+)`/gm)];
  choice['S15.2'][i?'label':'nb']=labels[i][1];
  choice['Q_RECONCILE.1'][response]=replace(choice['Q_RECONCILE.1'][response],i?/“Come and talk to us\. —Lumi\.”/:/«Kom og snakk med oss\. – Lumi\.»/,quotes('K07')[i]);
  scene.E_GARDEN[lang]=replace(scene.E_GARDEN[lang],i?/When he is strong enough to travel, you move \*\*the plant\*\*[^\n]+/:/Når han er sterk nok til å reise, flytter dere \*\*planten\*\*[^\n]+/,quotes('K09')[i]);
  const epilogue=section(i?'C2.':'C1.').match(/^`{3}text\n([\s\S]+?)\n`{3}$/m);
  assert(epilogue);
  scene.S25[lang]=epilogue[1];
 }
}

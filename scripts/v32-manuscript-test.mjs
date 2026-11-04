import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync('docs/editorial/v3.2.0-manus.md','utf8').replaceAll('\r\n','\n');
const scenes = JSON.parse(fs.readFileSync('src/manuscript-v3.json','utf8'));
const records = new Map(scenes.flatMap(s=>[s,...s.choices]).map(record=>[record.id,record]));
const groups = source.split(/^### (?:SCENE|CHOICE) /m).slice(1);
assert.equal(groups.length,36);
for (const group of groups) {
 const id = group.split(' ')[0];
 const keys = id.includes('.') ? ['nbResponse','response'] : ['nb','en'];
 const blocks = [...group.matchAll(/^`{3}text\n([\s\S]*?)\n`{3}$/gm)].slice(0,2);
 assert.equal(blocks.length,2,id);
 const markers = [];
 for (const [i, block] of blocks.entries()) {
  const value = records.get(id)[keys[i]];
  assert.equal(value,block[1],id+'.'+keys[i]);
  const tags = value.match(/\[[^\]]+\]/g) ?? [];
  markers.push(tags);
  for (const p of value.split('\n\n')) {
   let open=false,hadElse=false;
   for (const tag of p.match(/\[[^\]]+\]/g) ?? []) {
    if (tag.startsWith('[IF ')) { assert(!open,id); open=true; hadElse=false; }
    else if (tag==='[END]') { assert(open,id); open=false; }
    else { assert(open && !hadElse && (tag==='[ELSE]' || tag.startsWith('[ELSE IF ')),id); hadElse=tag==='[ELSE]'; }
   }
   assert(!open,'Unclosed paragraph condition in '+id);
  }
 }
 assert.deepEqual(markers[0],markers[1],id+' language parity');
}
console.log('PASS: 72 verbatim story fields and matching, balanced Norwegian and English conditions.');

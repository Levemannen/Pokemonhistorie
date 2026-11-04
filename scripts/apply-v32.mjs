import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

export function applyV32(scenes) {
 const source = readFileSync('docs/editorial/v3.2.0-manus.md','utf8').replaceAll('\r\n','\n');
 const records = new Map(scenes.flatMap(s => [s,...s.choices]).map(record => [record.id,record]));
 const fields = new Set();
 function assign(id,key,value) {
  assert(records.has(id) && Object.hasOwn(records.get(id),key), 'Unknown manuscript field '+id+'.'+key);
  assert(!fields.has(id+'.'+key), 'Duplicate manuscript field '+id+'.'+key);
  fields.add(id+'.'+key);
  records.get(id)[key] = value;
 }
 const blocks = /^\*\*`([A-Z_0-9]+(?:\.\d+)?)\.(nb|en|nbResponse|response)`(?: \([^\n]+\))?:\*\*\n\n```text\n([\s\S]*?)\n```$/gm;
 for (const [,id,key,value] of source.matchAll(blocks)) assign(id,key,value);
 assert.equal(fields.size,72,'Expected 15 scenes and 21 bilingual responses');
 for (const [,key,value] of source.matchAll(/^- `S09\.2\.(nb|label)` = `([^`]+)`$/gm)) assign('S09.2',key,value);
 assert.equal(fields.size,74);
 assign('Q_RETURN.3','when','NOT hoothoot_nest AND NOT companion_hoothoot');
}

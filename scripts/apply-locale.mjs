import fs from 'node:fs';
const catalog=JSON.parse(fs.readFileSync('docs/locale-pending.json','utf8'));
const nb=JSON.parse(fs.readFileSync('src/nb.json','utf8'));
for(const file of fs.readdirSync('docs/locale-batches'))for(const line of fs.readFileSync('docs/locale-batches/'+file,'utf8').split(/\r?\n/)){
 if(!line.trim())continue;const at=line.indexOf('\t');if(at<0)throw Error('Missing tab in '+file);const id=Number(line.slice(0,at));if(!catalog[id])throw Error('Unknown '+id);nb[catalog[id].en]=line.slice(at+1);
}
fs.writeFileSync('src/nb.json',JSON.stringify(nb,null,2)+'\n');
const pending=catalog.filter(x=>!nb[x.en]);fs.writeFileSync('docs/locale-remaining.json',JSON.stringify(pending,null,2));console.log(`${Object.keys(nb).length} translations; ${pending.length} candidates remain.`);

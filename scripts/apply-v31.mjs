import {applyV32} from './apply-v32.mjs';
import {applyV311} from './apply-v311.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const data=JSON.parse(fs.readFileSync('docs/editorial/v3.0.8-baseline.json','utf8'));
const lines=fs.readFileSync('docs/editorial/v3.1-codex-prompt.md','utf8').split(/\r?\n/);
function quote(line){
 let i=line;while(!lines[i].trim())i++;
 assert(lines[i].startsWith('>'),lines[i]);const result=[];
 while(lines[i]?.startsWith('>'))result.push(lines[i++].replace(/^> ?/,''));
 return result.join('\n').trim();
}
const scenes=Object.fromEntries(data.map(s=>[s.id,s]));
const choices=Object.fromEntries(data.flatMap(s=>s.choices.map(c=>[c.id,c])));
for(const [lang,offset] of [['nb',0],['en',1]]){
 const response=offset?'response':'nbResponse';
 const q=(nb,en)=>quote(offset?en:nb);
 const paras=id=>scenes[id][lang].split('\n\n');
 const set=(id,parts)=>{scenes[id][lang]=parts.join('\n\n')};
 set('S05',[...paras('S05').filter(p=>!p.startsWith('[IF mira_')),'[IF mira_trust] '+q(38,42)+' [ELSE IF mira_accountability] '+q(46,50)+' [END]']);
 const p=paras('S16');p.splice(3,0,...['Bulbasaur','Charmander','Squirtle'].map((n,i)=>'[IF starter_'+n+'] '+quote(72+i*8+offset*4)+' [END]'));set('S16',p);
 const stair=paras('S20');
 const photo=offset?'The photograph from the woods':'Bildet fra skogen';
 assert(stair[1].includes(photo));
 stair[1]=stair[1].replace(photo,'[IF photo_lumi_shinx] '+photo)+' [END]';
 set('S20',stair);
 set('S18',[q(126,130),...paras('S18').slice(1)]);
 set('S21',paras('S21').map(p=>p.startsWith('[IF lumi_open_to_talk]')?q(150,154):p));
 for(const [id,nb,en] of [['S09.3',58,62],['S17.1',98,102],['S17.2',106,110],['S17.3',114,118],['S20.1',140,144],['S21.1',163,167],['S21.2',171,175],['S19.1',191,195],['S23.1',269,273],['S23.2',277,281],['S23.3',285,289]])choices[id][response]=q(nb,en);
 choices['S19.1'][offset?'label':'nb']=q(183,187);
 for(const row of lines.filter(l=>/^\| S23\.[123] \|/.test(l))){const [,id,nb,en]=row.split('|').map(x=>x.trim());choices[id][offset?'label':'nb']=offset?en:nb}
 for(const [id,nb,en] of [['Q_RETURN',199,207],['S23',221,241],['S24',293,311],['S25',334,374],['E_DAWN',424,446],['E_AURORA',470,490],['E_LANTERN',513,541],['E_SONG',571,597],['E_GARDEN',625,657],['E_SANCTUARY',691,721]])scenes[id][lang]=q(nb,en);
 scenes.E_GARDEN[lang]+='\n\n'+q(649,681);
}
scenes.S24.choices=scenes.S24.choices.filter(c=>c.id!=='S24.4');
assert.equal(data.length,52);assert.equal(data.flatMap(s=>s.choices).length,116);
const supplied=lines.slice(lines.findIndex(l=>l.startsWith('# DEL B')),lines.findIndex(l=>l.startsWith('# DEL D'))).filter(l=>l.startsWith('> '));
const manuscriptFields=data.flatMap(s=>[s.nb,s.en,...s.choices.flatMap(c=>[c.nb,c.label,c.nbResponse,c.response])]).filter(Boolean);
for(const line of supplied)assert(manuscriptFields.some(value=>value.includes(line.slice(2))), 'Unmatched author text: '+line);
applyV311(data);
applyV32(data);
fs.writeFileSync('src/manuscript-v3.json',JSON.stringify(data,null,2)+'\n');
const mapCopy=lines.slice(767,785).filter(l=>l.startsWith('| ')&&!l.includes('Betydning')).map(l=>{const [,key,nb,en]=l.split('|').map(v=>v.trim());return [key,{nb,en}]});
fs.writeFileSync('src/map-copy-v31.json',JSON.stringify(Object.fromEntries(mapCopy),null,2)+'\n');

const matrix=data.map(s=>({scene:s.id,title:s.title,norsk:s.nbTitle,choices:s.choices.map(c=>({id:c.id,en:c.label,nb:c.nb,requires:c.when,to:c.to,alternate:c.alternate,flags:c.set,items:c.get}))}));
fs.writeFileSync('docs/manuscript-v3/choice-matrix.json',JSON.stringify(matrix,null,2));
const dialogue={};
for(const row of lines.filter(l=>/^\| S(?:07|17|24) \|/.test(l))){
 const [,scene,starter,nb,en]=row.split('|').map(s=>s.trim());
 (dialogue[scene]??={})[starter]={en,nb};
}
fs.writeFileSync('src/v31-dialogue.json',JSON.stringify(dialogue,null,2)+'\n');

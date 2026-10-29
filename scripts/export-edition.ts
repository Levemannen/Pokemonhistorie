import {mkdirSync,readFileSync,writeFileSync,copyFileSync} from 'node:fs';
import {dirname} from 'node:path';
import assert from 'node:assert/strict';
import {manuscriptScenes,initial,available,advance,byId,storyText} from '../src/edition';
import {setLanguage,translate} from '../src/i18n';
import {getPuzzle,tryPuzzle} from '../src/puzzles';
import {resolveIllustration} from '../src/illustrations';
import type {State,Starter} from '../src/story';
import {localizedManuscript} from '../src/storyLocale';
const out='exports/storyline-review-v2.1';mkdirSync(out,{recursive:true});
const proof=JSON.parse(readFileSync('docs/edition-v2-verification.json','utf8'));
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
const fixtures=JSON.parse(readFileSync('docs/edition-v2-fixtures.json','utf8')) as State[];
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const routes=[];const assets=new Set<string>();
for(const language of ['en','nb'] as const){
 setLanguage(language);
 for(const [starter,endings] of Object.entries(proof.routes) as [Starter,Record<string,string[]>][]){
  for(const [ending,steps] of Object.entries(endings)){
   let state=initial(starter);const pages=[];
   for(const id of steps){
    let choice=available(state).find(c=>c.id===id);
    if(!choice){const p=getPuzzle(state);assert(p);for(const n of p.answer)state=tryPuzzle(state,n);choice=available(state).find(c=>c.id===id);}
    assert(choice);const image=resolveIllustration(manifest,state).base;assets.add(image);
    pages.push({scene:state.scene,title:translate(byId[state.scene].title),text:storyText(state),image,choiceId:id,choice:translate(choice.label)});state=advance(state,choice);
   }
   assert.equal(state.scene,ending);const image=resolveIllustration(manifest,state).base;assets.add(image);
   pages.push({scene:ending,title:translate(byId[ending].title),text:storyText(state),image,choiceId:null,choice:null});
   routes.push({language,starter,ending,pages});
  }
 }
}
const graph=['flowchart TD',...manuscriptScenes.map(s=>`  ${s.id}["${s.id}: ${s.title}"]`),...manuscriptScenes.flatMap(s=>s.choices.map(c=>`  ${s.id} -->|"${c.id}"| ${c.to}`))].join('\n');
writeFileSync(out+'/story-tree.mmd',graph);
writeFileSync(out+'/story-data.json',JSON.stringify({edition:'2.1',scenes:manuscriptScenes,norwegian:JSON.parse(readFileSync('src/manuscript-nb.json','utf8')),proof,routes},null,2));
let html='<!doctype html><html lang="nb"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Starlight – gjennomgang v2.1</title><style>body{font:18px/1.6 Georgia,serif;max-width:1000px;margin:auto;padding:24px;background:#faf7ef;color:#243d3a}a{color:#246153}article{border-top:1px solid #ccc;margin-top:40px;padding-top:24px}img{max-width:100%;max-height:380px;object-fit:contain}p{white-space:pre-line}table{border-collapse:collapse;width:100%;font:14px/1.4 system-ui}td,th{border:1px solid #ccc;padding:8px;text-align:left}details{margin:20px 0}code{overflow-wrap:anywhere}</style><h1>Pokémon – The Mystery of the Lost Starlight</h1><p>Gjennomgang av utgave 2.1: 39 scener, 118 stabile valg-ID-er og 36 komplette eksempelreiser på norsk og engelsk. Utvalgte scenevisninger er eksempler; rutene viser faktisk sammenhengende tekst. JSON-filen inneholder alle råtekstvarianter og betingelser. Ingen nettjeneste er nødvendig.</p><nav>'+manuscriptScenes.map(s=>`<a href="#${s.id}">${escape(s.title)}</a>`).join(' · ')+'</nav>';
for(const scene of manuscriptScenes){
 html+=`<article id="${scene.id}"><h2>${escape(scene.id)} · ${escape(scene.title)}</h2>`;
 const state=fixtures.find(s=>s.scene===scene.id)!;const image=resolveIllustration(manifest,state).base;assets.add(image);html+=`<img src="${image}" alt="Illustrasjon til scenen">`;
 for(const language of ['en','nb'] as const){setLanguage(language);html+=`<details><summary>${language==='en'?'English':'Norsk'} – eksempel</summary><p>${escape(storyText(state))}</p></details>`;}
 html+='<details><summary>Alle avsnitt og betingelser på begge språk</summary>'+scene.passages.map(p=>`<h4>${escape(p.id)} · ${escape(p.when||'always')}</h4><p lang="en">${escape(p.text)}</p><p lang="nb">${escape(localizedManuscript[scene.id].passages[p.id])}</p>`).join('')+'</details>';
 html+='<table><thead><tr><th>ID</th><th>Valg</th><th>Til</th><th>Krav</th><th>Konsekvens</th></tr></thead><tbody>'+scene.choices.map(c=>`<tr><td>${c.id}</td><td>${escape(c.label)}</td><td><a href="#${c.to}">${c.to}</a></td><td>${escape(c.condition)}</td><td>${escape(c.effect)}</td></tr>`).join('')+'</tbody></table></article>';
}
html+='<h2>Komplette reiser</h2>';
for(const route of routes)html+=`<details><summary>${route.language} · ${route.starter} · ${route.ending}</summary>`+route.pages.map(p=>`<h3>${escape(p.title)}</h3><img loading="lazy" src="${p.image}" alt=""><p>${escape(p.text)}</p>${p.choice?'<p><strong>'+escape(p.choice)+'</strong> · '+p.choiceId+'</p>':''}`).join('')+'</details>';
writeFileSync(out+'/index.html',html+'</html>');
for(const path of assets){mkdirSync(dirname(out+'/'+path),{recursive:true});copyFileSync('public/'+path,out+'/'+path);}
copyFileSync('docs/EDITION-2.1.md',out+'/READ-ME.md');setLanguage('en');
console.log(`Exported ${manuscriptScenes.length} scenes, ${routes.length} bilingual routes and ${assets.size} local illustrations to ${out}.`);
const rows=manuscriptScenes.flatMap(s=>s.choices.map(c=>{
 const terms=(c.effect||'').split(';').map(e=>e.split('=')[0]);
 const callbacks=manuscriptScenes.flatMap(scene=>scene.passages.filter(p=>p.when&&(p.when.includes('choice='+c.id)||terms.some(term=>p.when!.includes(term+'=')))).map(p=>scene.id+'/'+p.id));
 return {id:c.id,scene:s.id,label:c.label,norwegian:localizedManuscript[s.id].choices[c.id!],destination:c.to,condition:c.condition,effect:c.effect,immediate:c.immediateText,responses:c.responses||[],possibleFollowUps:callbacks,ending:c.to.startsWith('end')?c.to:null};
}));
writeFileSync('docs/editorial-choice-matrix.json',JSON.stringify(rows,null,2));
writeFileSync(out+'/choice-matrix.json',JSON.stringify(rows,null,2));

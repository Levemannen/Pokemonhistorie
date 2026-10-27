import {createServer} from 'node:http';
import {readFileSync,statSync} from 'node:fs';
import {resolve,sep} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist'),prefix='/Pokemonhistorie/';
const server=createServer((req,res)=>{
 try{
  if(!req.url.startsWith(prefix)){res.writeHead(404).end();return;}
  const path=resolve(root,decodeURIComponent(req.url.slice(prefix.length))||'index.html');
  if(!path.startsWith(root+sep))throw Error('Invalid path');
  const info=statSync(path);if(!info.isFile())throw Error('Not file');
  res.writeHead(200,{'Content-Length':info.size});res.end(req.method==='HEAD'?undefined:readFileSync(path));
 }catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
try{
 const base=`http://127.0.0.1:${server.address().port}${prefix}`;
 const response=await fetch(base);assert.equal(response.status,200);const html=await response.text();
 const manifest=JSON.parse(readFileSync('dist/images/illustration-manifest.json','utf8'));
 const paths=new Set(['images/illustration-manifest.json']);
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g))if(!match[1].startsWith('data:'))paths.add(match[1]);
 for(const scene of Object.values(manifest.scenes)){
  Object.values(scene.base).forEach(p=>paths.add(p));Object.values(scene.fallbackBase||{}).forEach(p=>paths.add(p));
  (scene.variants||[]).forEach(v=>paths.add(v.path));
 }
 Object.values(manifest.companionLayers).forEach(p=>paths.add(p));manifest.decisionLayers.forEach(l=>paths.add(l.path));
 for(const path of paths){const url=new URL(path,base);assert(url.pathname.startsWith(prefix));const r=await fetch(url,{method:'HEAD'});assert.equal(r.status,200,path);assert(Number(r.headers.get('Content-Length'))>0,path);}
 assert.equal((await fetch(base+'does-not-exist.png')).status,404);
 console.log(`PASS: built index and ${paths.size} local assets load under /Pokemonhistorie/; unknown assets return 404.`);
}finally{await new Promise(r=>server.close(r));}

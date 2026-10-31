import {readFileSync,writeFileSync,readdirSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(readFileSync('dist/images/illustration-manifest.json','utf8'));
const imageFiles=new Set();
const v3=JSON.parse(readFileSync('src/v3-art.json','utf8'));
for(const scene of Object.values(v3))for(const p of [...Object.values(scene.base),...Object.values(scene.fallbackBase)])imageFiles.add(p);
for(const scene of Object.values(manifest.scenes)){
 for(const path of [...Object.values(scene.base),...Object.values(scene.fallbackBase||{}),...(scene.variants||[]).map(v=>v.path)])imageFiles.add(path);
}
Object.values(manifest.companionLayers).forEach(p=>imageFiles.add(p));manifest.decisionLayers.forEach(l=>imageFiles.add(l.path));
const core=['index.html','manifest.webmanifest','images/illustration-manifest.json','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png',...readdirSync('dist/assets').map(p=>'assets/'+p)];
const all=[...core,...imageFiles];const hash=createHash('sha256');
for(const p of all){hash.update(p);hash.update(readFileSync('dist/'+p));}
const template=readFileSync('scripts/service-worker.js','utf8');hash.update(template);
const version=hash.digest('hex').slice(0,16),bytes=all.reduce((n,p)=>n+statSync('dist/'+p).size,0);
writeFileSync('dist/offline-info.json',JSON.stringify({version,bytes,files:all.length}));
writeFileSync('dist/sw.js',`const BUILD=${JSON.stringify({version,core,all,bytes})};\n`+template);
console.log(`PWA: ${all.length} offline files, ${Math.ceil(bytes/1024/1024)} MB; version ${version}.`);

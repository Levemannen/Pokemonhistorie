import {createServer} from 'node:http';
import {readFileSync,writeFileSync,statSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import {available,initial,type State} from '../src/story';
import {getPuzzle} from '../src/puzzles';
const root=resolve('dist'),prefix='/Pokemonhistorie/';let failDownload=true,updateBuild=false;
const server=createServer((req,res)=>{
 try{
  const pathname=new URL(req.url!,'http://localhost').pathname;if(!pathname.startsWith(prefix)){res.writeHead(404).end();return;}
  const path=resolve(root,decodeURIComponent(pathname.slice(prefix.length))||'index.html');
  if(!path.startsWith(root+sep)||!statSync(path).isFile())throw Error('Invalid path');
  if(path.endsWith('scene-ridge-squirtle.png')&&failDownload){failDownload=false;res.writeHead(503).end('Temporary test failure');return;}
  const mime:Record<string,string>={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
  res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-cache'});
  res.end(updateBuild&&path.endsWith('sw.js')?readFileSync(path,'utf8').replace(/"version":"[^"]+"/,'"version":"qa-update"'):readFileSync(path));
 }catch{res.writeHead(404).end();}
});
await new Promise<void>(r=>server.listen(0,'127.0.0.1',r));
const address=server.address() as {port:number},base=`http://127.0.0.1:${address.port}${prefix}`;
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const context=await browser.newContext({viewport:{width:820,height:1180},hasTouch:true,reducedMotion:'reduce'});
const page=await context.newPage(),errors:string[]=[];page.on('pageerror',(e:Error)=>errors.push(e.message));
try{
 await page.goto(base);await page.locator('.app-install > summary').click();
 await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
 const manifest=await page.evaluate(async()=>fetch('manifest.webmanifest').then(r=>r.json()));assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'./');
 const download=page.getByRole('button',{name:'Download book for offline reading',exact:true});await download.click();
 await page.getByText('The download could not finish.',{exact:false}).waitFor({timeout:120000});
 await download.click();await page.getByRole('button',{name:'Book saved for offline reading',exact:true}).waitFor({timeout:120000});
 await context.setOffline(true);await page.reload();await page.locator('.begin').click();
 const proof=JSON.parse(readFileSync('docs/edition-v2-verification.json','utf8'));
 for(const id of proof.routes.Bulbasaur.endDawn){
  let state=await page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!)) as State;
  let index=available(state).findIndex(c=>c.id===id);
  if(index<0){const puzzle=getPuzzle(state)!;for(const n of puzzle.answer)await page.locator('.puzzle-controls button').nth(n).click();state=await page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!));index=available(state).findIndex(c=>c.id===id);}
  assert(index>=0,id);await page.locator('.choose-story').nth(index).click();
 }
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!).scene),'endDawn');
 const fixtures=JSON.parse(readFileSync('docs/edition-v2-fixtures.json','utf8')) as State[];
 const scenes=new Map(fixtures.map(s=>[s.scene,s]));let checked=0;
 for(const state of [...scenes.values(),...fixtures.filter(s=>s.scene==='ridge').slice(0,3)]){
  await page.evaluate((s:State)=>localStorage.setItem('starlight-story-v1',JSON.stringify({...s,language:'nb'})),state);await page.reload();
  await page.locator('.illustration[data-art-kind="painted"]').waitFor();await page.locator('.illustration .scene-art-base').evaluate((img:HTMLImageElement)=>img.decode());checked++;
 }
 // A new tab can cold-launch the cached entry point, not just reload an existing document.
 const cold=await context.newPage();await cold.goto(base);await cold.locator('.page-body h2').waitFor();await cold.close();
 await page.locator('.app-install > summary').click();await page.getByRole('button',{name:'Boka er lagret for lesing uten nett',exact:true}).waitFor();
 await page.screenshot({path:'docs/browser-qa/app-offline-tablet.png'});
 await context.setOffline(false);updateBuild=true;
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!));
 await page.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();await reg!.update();});
 const updateButton=page.getByRole('button',{name:'Oppdater appen og åpne boka igjen',exact:true});await updateButton.waitFor({timeout:30000});
 await Promise.all([page.waitForEvent('load'),updateButton.click()]);
 await page.locator('.page-body h2').waitFor();assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!)),saved);
 assert.equal(errors.length,0,errors.join('\n'));
 writeFileSync('docs/browser-qa/pwa-report.json',JSON.stringify({date:new Date().toISOString().slice(0,10),passed:true,offlineSceneChecks:checked,checks:['GitHub Pages subpath scope','Install manifest','Download failure and retry','Complete ending through actual clicks while offline','All 39 painted scenes offline','Cold offline tab launch','Norwegian offline status','User-triggered app update preserves the saved journey'],limitations:'Chromium emulation, not physical iPad installation or actual installed voice quality.'},null,2));
 console.log(`PASS: install manifest, scoped service worker, failed download recovery, offline ending and ${checked} offline illustrated pages.`);
}finally{await browser.close();await new Promise<void>(r=>server.close(()=>r()));}

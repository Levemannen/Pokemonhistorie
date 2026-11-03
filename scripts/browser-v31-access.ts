import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import type {State} from '../src/story';
import copy from '../src/map-copy-v31.json';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const fixtures=JSON.parse(readFileSync('docs/v3-fixtures.json','utf8')) as State[];
try{
 for(const lang of ['en','nb'] as const){
  const context=await browser.newContext({viewport:{width:1280,height:900},serviceWorkers:'block',hasTouch:true,reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  for(const scene of ['S17','S23']){
   const saved={...fixtures.find(s=>s.scene===scene)!,language:lang};
   await page.evaluate((s:State)=>{localStorage.setItem('starlight-story-v1',JSON.stringify(s));localStorage.setItem('starlight-language',s.language!)},saved);
   await page.reload();await page.locator('.story-text').first().waitFor();
   if(scene==='S17'){assert.equal(await page.locator('.illustration').getAttribute('data-gate-crop'),'true');continue;}
   await page.evaluate(()=>{document.body.style.zoom='200%'});
   const open=page.getByRole('button',{name:copy['Før finale'][lang],exact:true});await open.focus();await page.keyboard.press('Enter');
   const dialog=page.getByRole('dialog');await dialog.waitFor();
   assert.equal(await dialog.getByText(copy.Månehint[lang],{exact:true}).count(),Number(['moon_sig_1','moon_sig_2','moon_sig_3'].some(f=>saved.world!.flags[f]==='true')));
   assert.equal(await dialog.getByText(copy.Solhint[lang],{exact:true}).count(),Number(['rescued_pikachu','rescued_lapras','helped_psyduck','helped_altaria','bridge_repaired'].filter(f=>saved.world!.flags[f]==='true').length>=2));
   for(const pin of await dialog.locator('.field-pin').all()){
    assert(await pin.getAttribute('aria-label'));const size=await pin.boundingBox();assert(size && size.width>=44 && size.height>=44);
   }
   await page.keyboard.press('Escape');assert.equal(await dialog.count(),0);
   await page.waitForFunction((b:HTMLElement)=>document.activeElement===b,await open.elementHandle());
   assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!).scene),'S23');
  }
  await context.close();
 }
 console.log('PASS: gate crop, pre-finale map, earned moon hint, 200% CSS zoom, labelled touch targets, keyboard open/close and restored focus (nb/en).');
}finally{await browser.close();}

import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const fixtures=JSON.parse(readFileSync('docs/edition-v2-fixtures.json','utf8'));
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const sizes=[[768,1024],[820,1180],[1024,1366],[1024,768],[1180,820],[1366,1024],[600,900],[390,844]];
const errors=[],results=[];
try{
 for(const [width,height] of sizes){
  const context=await browser.newContext({viewport:{width,height},hasTouch:true,reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  for(const language of ['en','nb'])for(const scene of ['lantern','plan','observatory','endGarden']){
   const state=fixtures.find(s=>s.scene===scene&&s.starter==='Bulbasaur');assert(state);
   await page.evaluate(s=>localStorage.setItem('starlight-story-v1',JSON.stringify(s)),{...state,language});await page.reload();
   await page.locator('.page-body h2').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${width} ${language} ${scene} overflow`);
   for(const button of await page.locator('.reading-toolbar > button,.choice-language-tools button,.reader-tool-links button').all()){
    const box=await button.boundingBox();assert(box&&box.height>=43.5&&box.width>=43.5,'Small tablet target');
   }
   if(width>=681){
    const book=await page.locator('.book-column').boundingBox(),aside=await page.locator('.book-layout > aside').boundingBox();
    if(width>=1100&&width>height)assert(aside.x>=book.x+book.width,'Landscape side rail');
    else assert(aside.y>=book.y+book.height-1,'Portrait should put companions after book');
   }
   results.push({width,height,language,scene});
  }
  if(width===820||width===1180)await page.screenshot({path:`docs/browser-qa/tablet-${width}.png`,fullPage:true});
  // Rotate an active saved journey, then open the journal with a finger.
  const before=await page.evaluate(()=>localStorage.getItem('starlight-story-v1'));
  await page.setViewportSize({width:height,height:width});
  assert.equal(await page.evaluate(()=>localStorage.getItem('starlight-story-v1')),before);
  await page.locator('header nav button').nth(1).tap();await page.locator('[role="dialog"]').waitFor();
  const close=page.locator('.close');await close.tap({trial:true});const box=await close.boundingBox();assert(box.width>=43.5&&box.height>=43.5,JSON.stringify(box));await close.tap();
  await page.locator('.reader-mode').tap();assert.equal(await page.locator('.book-layout > aside').isVisible(),false);
  await context.close();
 }
 assert.equal(errors.length,0,errors.join('\n'));
 writeFileSync('docs/browser-qa/tablet-report.json',JSON.stringify({date:'2026-10-28',checks:results.length,results,errors,scope:'Edge touch emulation; portrait, landscape, split-screen, phone, both languages, saved-state rotation, journal and reading mode. Not a physical iPad/Safari test.'},null,2));
 console.log(`PASS: ${results.length} tablet/touch layout checks; rotation preserves progress; journal and reading mode work.`);
}finally{await browser.close();}

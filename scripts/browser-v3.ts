import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import * as v3 from '../src/edition3';
import {getPuzzle} from '../src/puzzles';
import {setLanguage} from '../src/i18n';
import {resolveIllustration} from '../src/illustrations';
import type {State} from '../src/story';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const routes=JSON.parse(readFileSync('docs/v3-routes.json','utf8')) as State[];
const fixtures=JSON.parse(readFileSync('docs/v3-fixtures.json','utf8')) as State[];
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
const errors:string[]=[],failures:string[]=[];let pages=0,journeys=0;
const norm=(s:string)=>s.replace(/\s+/g,' ').trim();
const stateOf=(page:any):Promise<State>=>page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!));
mkdirSync('docs/browser-qa/v3',{recursive:true});
try{
 for(const language of ['en','nb'] as const)for(const [ri,route] of routes.entries()){
  if(ri>=18&&route.starter!=='Bulbasaur')continue;
  setLanguage(language);const width=[375,820,1280][ri%3];
  const ctx=await browser.newContext({viewport:{width,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});const page=await ctx.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));
  try{
   await page.goto('http://127.0.0.1:4173/');if(language==='nb')await page.getByRole('button',{name:'Norsk',exact:true}).click();
   await page.locator('.starter').filter({hasText:route.starter}).click();await page.locator('.begin').click();
   for(const h of route.history){
    let s=await stateOf(page);assert.equal(s.scene,h.scene);
    const puzzle=getPuzzle(s);if(puzzle&&!s.flags.includes('puzzle:'+puzzle.id))for(const n of puzzle.answer)await page.locator('.puzzle-controls button').nth(n).click();
    s=await stateOf(page);
    assert.equal(norm(await page.locator('.story-text').first().innerText()),norm(v3.storyText(s)),`${s.scene} ${language}`);
    await page.locator('.illustration .scene-art-base').evaluate((img:HTMLImageElement)=>img.decode());
    assert((await page.locator('.illustration .scene-art-base').getAttribute('src'))!.endsWith(resolveIllustration(manifest,s).base));
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),s.scene+' overflow');
    const target=page.locator(`[data-choice-id="${h.choiceId}"]`);
    if(await target.count()===0&&await page.locator('.choice-pages').count()){
     const prev=page.locator('.choice-pages button').first();while(await prev.isEnabled())await prev.click();
     while(await target.count()===0)await page.locator('.choice-pages button').last().click();
    }
    assert.equal((await target.innerText()).trim(),language==='nb'?v3.choicesById[h.choiceId!].nb:v3.choicesById[h.choiceId!].label);
    const next=v3.advance(s,v3.available(s).find(c=>c.id===h.choiceId)!);await target.click();await page.waitForFunction((id:string)=>JSON.parse(localStorage.getItem('starlight-story-v1')||'{}').world?.lastChoiceId===id,h.choiceId);
    assert.equal((await stateOf(page)).scene,next.scene);pages++;
    if(h.scene==='S12'){const before=await stateOf(page);await page.reload();await page.locator('.story-text').waitFor();assert.deepEqual((await stateOf(page)).world,before.world);}
   }
   await page.locator('.ending-card').waitFor();assert.equal((await stateOf(page)).scene,route.scene);
   assert.equal((await page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-books-v1')!))).length,1);
   if(language==='nb'&&ri===0)await page.screenshot({path:'docs/browser-qa/v3/ending-tablet.png',fullPage:true});
   journeys++;console.log(`V3 browser ${journeys}: ${language} ${route.starter} ${route.scene}`);
  }catch(e){failures.push(`${language} ${ri}: ${e}`);break;}finally{await ctx.close();}
 }
 // Every authored scene at the narrowest supported width, independently in both languages.
 for(const language of ['en','nb'] as const){const ctx=await browser.newContext({viewport:{width:320,height:900},serviceWorkers:'block'});const page=await ctx.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));await page.goto('http://127.0.0.1:4173/');
 for(const s of fixtures){await page.evaluate((v:State)=>{localStorage.setItem('starlight-story-v1',JSON.stringify(v));localStorage.setItem('starlight-language',v.language!);}, {...s,language,journeyId:'fixture'});await page.reload();await page.locator('.page-body h2').waitFor();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),s.scene);await page.locator('.illustration .scene-art-base').evaluate((i:HTMLImageElement)=>i.decode());pages++;}
 await ctx.close();}
}finally{await browser.close();writeFileSync('docs/browser-qa/v3/report.json',JSON.stringify({journeys,pages,errors,failures,languages:['en','nb'],widths:[320,375,820,1280]},null,2));}
assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);assert.equal(journeys,44);console.log(`PASS: ${journeys} browser journeys, ${pages} pages, both languages.`);

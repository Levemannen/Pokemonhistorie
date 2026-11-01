import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {optionalPuzzles} from '../src/optionalPuzzles';
import {mapState,mapCopy,mapMarkers} from '../src/miraMapData';
import type {State} from '../src/story';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const fixtures=JSON.parse(readFileSync('docs/v3-fixtures.json','utf8')) as State[];
const errors:string[]=[];let answers=0,hints=0;
const plain=(s:string)=>s.replace(/\*/g,'').replace(/\s+/g,' ').trim();
mkdirSync('docs/browser-qa/map',{recursive:true});
try{
 for(const language of ['en','nb'] as const){
  const context=await browser.newContext({viewport:{width:language==='nb'?820:375,height:1180},hasTouch:true,reducedMotion:'reduce',serviceWorkers:'block'});
  const page=await context.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  async function load(scene:string){
   const state=structuredClone(fixtures.find(s=>s.scene===scene)!);state.language=language;
   await page.evaluate((s:State)=>{localStorage.setItem('starlight-story-v1',JSON.stringify(s));localStorage.setItem('starlight-language',s.language!);},state);
   await page.reload();await page.locator('.story-text').first().waitFor();
  }
  const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!) as State);
  await load('S04');
  const before=await saved();
  const mapButton=page.getByRole('button',{name:mapCopy.open[language],exact:true}).first();
  await mapButton.click();
  const dialog=page.getByRole('dialog',{name:mapCopy.title[language]});
  await dialog.waitFor();
  assert.equal(await dialog.getByText('Starfall Tower',{exact:true}).count(),0);
  assert.equal(await dialog.locator('[data-map-marker]').count(),0);
  await page.keyboard.press('Escape');assert.equal(await dialog.count(),0);
  assert.deepEqual(await saved(),before);
  await page.waitForFunction((el:HTMLElement)=>el===document.activeElement,await mapButton.elementHandle());
  for(const puzzle of optionalPuzzles){
   await load(puzzle.scene);
   const initial=await saved(),copy=puzzle[language];
   const region=page.locator('[data-optional-puzzle="'+puzzle.scene+'"]');
   const trigger=region.getByRole('button',{name:copy.button,exact:true});
   await trigger.click();
   assert.equal(plain(await region.locator('.optional-passage').first().innerText()),plain(copy.opening));
   const back=region.getByRole('button',{name:language==='nb'?'Tilbake til historien':'Back to the story',exact:true});
   for(const [index,option] of copy.answers.entries()){
    if(option.correct)continue;
    await region.locator('[data-optional-answer="'+index+'"]').click();
    assert(plain(await region.innerText()).includes(plain(option.response)));answers++;
    assert.deepEqual((await saved()).world,initial.world);
   }
   for(let n=0;n<2;n++){
    await region.locator('[data-optional-hint]').click();
    assert(plain(await region.innerText()).includes(plain(copy.hints[n])));
    if(n===0)assert(!plain(await region.innerText()).includes(plain(copy.hints[1])));hints++;
   }
   assert(await region.locator('[data-optional-hint]').isDisabled());
   await back.click();
   assert(plain(await region.innerText()).includes(plain(copy.leave)));
   assert.deepEqual((await saved()).world,initial.world);
   await trigger.click();
   await region.locator('[data-optional-answer="'+copy.answers.findIndex(a=>a.correct)+'"]').click();answers++;
   assert(plain(await region.innerText()).includes(plain(copy.success)));
   const solved=await saved();
   assert.deepEqual(solved.world,{...initial.world!,flags:{...initial.world!.flags,[puzzle.flag]:'true'}});
   await back.click();await trigger.click();
   assert(!plain(await region.innerText()).includes(plain(copy.success)));
   await page.getByRole('button',{name:mapCopy.open[language],exact:true}).first().click();
   await dialog.locator('[data-map-marker="'+puzzle.flag+'"]').click();
   assert(plain(await dialog.innerText()).includes(plain(copy.note)));
   await page.keyboard.press('Escape');
   await page.reload();await page.locator('.story-text').first().waitFor();
   assert.equal((await saved()).world!.flags[puzzle.flag],'true');
   assert.equal(await page.getByText(mapCopy.newMark[language],{exact:true}).count(),0);
   const other=language==='nb'?'en':'nb';
   await page.getByRole('button',{name:other==='nb'?'Norsk':'English',exact:true}).click();
   await page.getByRole('button',{name:mapCopy.open[other],exact:true}).first().click();
   assert.equal(await page.locator('[data-map-marker="'+puzzle.flag+'"]').count(),1);
   await page.keyboard.press('Escape');
   await page.getByRole('button',{name:language==='nb'?'Norsk':'English',exact:true}).click();
  }
  // Every story marker follows the active history, including first discovery and reopening.
  for(const scene of ['S08','S14','S16','S19','Q_STAR','S25']){
   await load(scene);const state=await saved();
   await page.getByRole('button',{name:mapCopy.open[language],exact:true}).first().click();
   const expected=mapState(state).markers.map(m=>m.id).sort();
   assert.deepEqual((await dialog.locator('[data-map-marker]').evaluateAll((els:Element[])=>els.map(el=>el.getAttribute('data-map-marker')))).sort(),expected);
   assert.equal((await saved()).scene,scene);
   for(const marker of mapMarkers.filter(m=>!expected.includes(m.id)))assert.equal(await dialog.locator('[data-map-marker="'+marker.id+'"]').count(),0);
   if(scene==='S25'){
    await page.screenshot({path:'docs/browser-qa/map/'+language+'-portrait.png'});
    await page.setViewportSize({width:1280,height:800});
    await page.screenshot({path:'docs/browser-qa/map/'+language+'-landscape.png'});
   }
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await page.keyboard.press('Escape');
  }
  await page.locator('.restart').click();
  await page.getByRole('dialog').locator('.begin').click();
  await page.locator('.starter').first().click();await page.locator('.begin').click();
  const fresh=await saved();assert.equal(fresh.scene,'S01');
  assert.equal(mapState(fresh).markers.length,0);
  for(const puzzle of optionalPuzzles)assert(!fresh.world!.flags[puzzle.flag]);
  await context.close();
 }
 assert.deepEqual(errors,[]);
 writeFileSync('docs/browser-qa/map/report.json',JSON.stringify({passed:true,answers,hints,languages:['en','nb'],errors,checks:['wrong answers','both hints','leave and reopen','correct answer once','save and reload','language switch','S04 map purity','Escape and focus return','marker presence and absence','portrait and landscape']},null,2));
 console.log(`PASS: ${answers} answers, ${hints} hints, both languages, optional puzzle persistence and map interactions.`);
}finally{await browser.close();}

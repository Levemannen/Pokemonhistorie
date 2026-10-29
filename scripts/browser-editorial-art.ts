import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {initial,available,advance,type State} from '../src/story';
import {getPuzzle,tryPuzzle} from '../src/puzzles';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const fixtures=JSON.parse(readFileSync('docs/edition-v2-fixtures.json','utf8')) as State[];
const jobs=JSON.parse(readFileSync('docs/editorial-art-prompts.json','utf8')) as {id:string;scene:string;path:string}[];
const flightRoute=JSON.parse(readFileSync('docs/editorial-scenarios.json','utf8')).reports.find((r:{name:string})=>r.name.startsWith('K ')).steps as string[];
let flight=initial('Bulbasaur');
for(const id of flightRoute){
 if(flight.scene==='roof')break;
 let choice=available(flight).find(c=>c.id===id);
 if(!choice){const puzzle=getPuzzle(flight);assert(puzzle);for(const n of puzzle.answer)flight=tryPuzzle(flight,n);choice=available(flight).find(c=>c.id===id);}
 assert(choice);flight=advance(flight,choice);
}
assert.equal(flight.world!.arrivalMode,'air');
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const results:unknown[]=[],errors:string[]=[];
try{
 for(const job of jobs)for(const language of ['en','nb'])for(const width of [375,1024]){
  const state=job.id==='roof-flock'?flight:fixtures.find(s=>s.scene===job.scene&&s.world!.arrivalMode!=='air');
  assert(state,job.id);
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');await page.evaluate((s:unknown)=>localStorage.setItem('starlight-story-v1',JSON.stringify(s)),{...state,language});await page.reload();
  const img=page.locator('.scene-art-base').first();await img.evaluate((e:HTMLImageElement)=>e.decode());
  assert((await img.getAttribute('src'))?.endsWith(job.path),job.id+' wrong asset');
  assert(await img.evaluate((e:HTMLImageElement)=>e.naturalWidth>1000));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  if(language==='nb'&&width===1024)await page.locator('.storybook').screenshot({path:`docs/browser-qa/art-${job.id}-v3.png`});
  results.push({id:job.id,language,width,path:job.path});await context.close();
 }
 assert.deepEqual(errors,[]);writeFileSync('docs/browser-qa/editorial-art-report.json',JSON.stringify({checks:results.length,errors,results},null,2));
 console.log(`PASS: ${results.length} revised-art browser checks across both languages and phone/tablet widths.`);
}finally{await browser.close();}

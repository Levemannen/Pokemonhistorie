import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {initial,scenes,type Starter} from '../src/story';
import {getPuzzle,puzzleIds} from '../src/puzzles';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const results:string[]=[],errors:string[]=[];
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const page=await context.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));
const url='http://127.0.0.1:4173/';
const read=(key='starlight-story-v1')=>page.evaluate((key:string)=>JSON.parse(localStorage.getItem(key)||'null'),key);
try{
 await page.goto(url);await page.locator('.begin').click();
 const first=await read();await page.locator('.choice-language-tools button').nth(1).click();assert.deepEqual(await read(),first);assert(await page.locator('.choice-translation').first().isVisible());
 await page.locator('.word').first().click();await page.locator('.word-popover').waitFor({state:'visible'});assert((await read('starlight-my-words-v1')).length===1);await page.keyboard.press('Escape');await page.locator('.word-popover').waitFor({state:'detached'});
 await page.locator('.choose-story').first().click();await page.locator('.choose-story').nth(1).click();
 const before=await read();await page.getByRole('button',{name:'Norsk',exact:true}).click();await page.reload();assert.deepEqual((await read()).history,before.history);assert.equal(await page.locator('html').getAttribute('lang'),'nb');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await page.locator('.reader-mode').click();await page.locator('.reader-controls select').selectOption('extra');await page.reload();assert.equal(await page.locator('.app-shell').getAttribute('data-text-size'),'extra');assert((await page.locator('.app-shell').getAttribute('class')).includes('reading-mode'));await page.locator('.reader-mode').click();
 const history=page.locator('header nav button').nth(1);await history.click();await page.locator('[role="dialog"]').waitFor();
 assert(await page.locator('.close').evaluate((e:HTMLElement)=>e===document.activeElement));await page.keyboard.press('Shift+Tab');assert(await page.locator('[role="dialog"]').evaluate((e:HTMLElement)=>e.contains(document.activeElement)));await page.keyboard.press('Escape');assert(await history.evaluate((e:HTMLElement)=>e===document.activeElement));
 await history.click();const original=await read();await page.getByRole('button',{name:'Try a different choice from here',exact:true}).first().click();assert.deepEqual(await read('starlight-original-journey-v1'),original);assert.equal((await read()).scene,'lantern');await page.locator('.choose-story').nth(1).click();await page.getByRole('button',{name:'Return to my original adventure',exact:true}).click();assert.deepEqual(await read(),original);assert.equal(await read('starlight-original-journey-v1'),null);
 await page.locator('.reader-tool-links button').first().click();const examine=page.getByRole('button',{name:/^Examine /});assert(await examine.count()>0);await examine.first().click();assert((await read()).flags.some((f:string)=>f.startsWith('inspected:')));await page.keyboard.press('Escape');
 results.push('Choice help does not navigate; vocabulary saves; Escape closes word help; language, text size and reading mode survive reload; modal focus/escape; branch original restored; bag examination persists.');
 for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[])for(const id of puzzleIds.filter(id=>['mushrooms','falls','observatory'].includes(id))){
  const fixture={...initial(starter),scene:id,language:'en' as const,journeyId:'qa-puzzle'};await page.evaluate((s:unknown)=>localStorage.setItem('starlight-story-v1',JSON.stringify(s)),fixture);await page.reload();const puzzle=getPuzzle(fixture)!;
  const wrong=Array(puzzle.answer.length).fill((puzzle.answer[0]+1)%puzzle.buttons.length);for(const n of wrong)await page.locator('.puzzle-controls button').nth(n).click();assert.equal((await read()).puzzles[id].attempts,1);
  await page.locator('.puzzle-actions button').first().click();assert((await page.locator('.puzzle-hint').innerText()).length>8);
  await page.locator('.puzzle-controls button').nth(puzzle.answer[0]).click();await page.reload();
  for(const n of puzzle.answer.slice(1))await page.locator('.puzzle-controls button').nth(n).click();assert((await read()).flags.includes('puzzle:'+id));assert(await page.locator('.puzzle-card.solved').isVisible());
 }
 results.push('9 isolated puzzle fixtures: wrong answers, hints, mid-puzzle reload, correct solutions for all starters. Fixtures are not reported as reachable routes.');
 for(const width of [320,390,768,1280]){
  await page.setViewportSize({width,height:900});
  for(const scene of scenes){await page.evaluate((s:unknown)=>localStorage.setItem('starlight-story-v1',JSON.stringify(s)),{...initial('Bulbasaur'),scene:scene.id,language:'nb',journeyId:'qa-layout'});await page.reload();await page.waitForSelector('.page-body h2');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,scene.id+' overflow at '+width);}
  await page.screenshot({path:`docs/browser-qa/ending-${width}.png`,fullPage:true});
 }
 results.push('156 isolated layout fixtures: all 39 scenes at 320, 390, 768 and 1280 pixels, extra-large text; no page-level horizontal overflow.');
 await context.close();
 const fallback=await browser.newContext();const fp=await fallback.newPage();await fp.route('**/images/scenes/painted/**',(route:any)=>route.fulfill({status:404,body:''}));await fp.goto(url);await fp.waitForSelector('[data-art-kind="fallback"]');await fp.locator('.scene-art-base').evaluate((img:HTMLImageElement)=>img.decode());assert(await fp.locator('.fallback-art-credit').isVisible());await fallback.close();results.push('Missing painting loads the labeled local SVG fallback.');
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Blocked for QA','QuotaExceededError');};});const bp=await blocked.newPage();await bp.goto(url);await bp.locator('.begin').click();await bp.locator('.choose-story').first().click();assert(await bp.locator('.storage-notice').isVisible());assert(await bp.locator('.page-body h2').innerText());await blocked.close();results.push('Blocked storage displays a warning while the in-memory journey remains playable.');
}finally{await browser.close();writeFileSync('docs/browser-qa/tools-report.json',JSON.stringify({results,errors,note:'Automated Edge desktop testing with mobile viewport emulation; not a real iOS/Android device or screen-reader test.'},null,2));}
assert.equal(errors.length,0,errors.join('\n'));console.log('PASS: '+results.join('\n'));


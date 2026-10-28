import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import * as old from '../src/legacyStory';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
let legacy={...old.initial('Bulbasaur'),language:'en' as const,journeyId:'legacy-compatibility-check'};
for(let i=0;i<6;i++)legacy={...old.advance(legacy,old.available(legacy)[0]),language:'en',journeyId:legacy.journeyId};
const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
const read=(key='starlight-story-v1')=>page.evaluate((key:string)=>JSON.parse(localStorage.getItem(key)||'null'),key);
try{
 await page.goto('http://127.0.0.1:4173/');await page.evaluate((s:unknown)=>localStorage.setItem('starlight-story-v1',JSON.stringify(s)),legacy);await page.reload();
 await page.getByText('You are continuing the previous edition. Your saved choices are preserved.',{exact:true}).waitFor();
 assert.equal((await read()).world,undefined);assert.deepEqual((await read()).history,legacy.history);
 const next=old.advance(legacy,old.available(legacy)[0]);await page.locator('.choose-story').first().click();assert.equal((await read()).scene,next.scene);
 const saved=await read();await page.locator('.restart').click();await page.getByRole('button',{name:'Start again',exact:true}).click();
 assert.deepEqual(await read('starlight-original-journey-v1'),saved);await page.locator('.begin').click();assert.equal((await read()).world.edition,'2.1');
 await page.getByRole('button',{name:'Return to my original adventure',exact:true}).click();assert.deepEqual(await read(),saved);
 writeFileSync('docs/browser-qa/legacy-report.json',JSON.stringify({passed:true,checks:['Legacy saved journey retains original choices and history','Legacy choice advances with legacy engine','Starting revised edition keeps an original backup','Return button restores legacy state exactly']},null,2));
 console.log('PASS: legacy continuation, new-edition start, original backup and exact restoration.');
}finally{await browser.close();}

import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const fixtures=JSON.parse(readFileSync('docs/edition-v2-fixtures.json','utf8'));
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const page=await browser.newPage({viewport:{width:1100,height:850},reducedMotion:'reduce'}),results=[];
try{
 await page.goto('http://127.0.0.1:4173/');
 for(const starter of ['Bulbasaur','Charmander','Squirtle']){
  const state=fixtures.find(s=>s.scene==='ridge'&&s.starter===starter);assert(state);
  await page.evaluate(s=>localStorage.setItem('starlight-story-v1',JSON.stringify({...s,language:'en'})),state);
  await page.reload();await page.locator('.illustration[data-art-kind="painted"]').waitFor();
  const image=page.locator('.illustration .scene-art-base');await image.evaluate(img=>img.decode());
  assert((await image.getAttribute('src')).endsWith(`scene-ridge-${starter.toLowerCase()}.png`));
  assert.equal(await page.locator('.fallback-art-credit').count(),0);
  await page.locator('.illustration').screenshot({path:`docs/browser-qa/ridge-${starter.toLowerCase()}-painted.png`});
  results.push({starter,image:await image.getAttribute('src'),passed:true});
 }
 writeFileSync('docs/browser-qa/ridge-art-report.json',JSON.stringify({date:'2026-10-28',results},null,2));
 console.log('PASS: all three ridge starters load their own painted image in the browser; no fallback label.');
}finally{await browser.close();}

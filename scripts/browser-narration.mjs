import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const context=await browser.newContext({reducedMotion:'reduce',acceptDownloads:true});
await context.addInitScript(()=>{
 window.qaSpeech={calls:[],cancels:0,last:null};
 window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
  cancel(){window.qaSpeech.cancels++;},getVoices(){return [{lang:'en-US',localService:true},{lang:'nb-NO',localService:true}];},
  speak(speech){window.qaSpeech.last=speech;window.qaSpeech.calls.push({text:speech.text,lang:speech.lang,rate:speech.rate});queueMicrotask(()=>speech.onstart?.());}
 }});
});
const page=await context.newPage();const results=[];
try{
 await page.goto('http://127.0.0.1:4173/');await page.locator('.begin').click();
 await page.locator('.reading-toolbar > button').click();let call=await page.evaluate(()=>window.qaSpeech.calls.at(-1));assert.equal(call.lang,'en-US');assert(call.text.includes('festival'));
 const cancelled=await page.evaluate(()=>window.qaSpeech.cancels);await page.locator('.choose-story').first().click();assert((await page.evaluate(()=>window.qaSpeech.cancels))>cancelled);
 await page.locator('.word').first().click();await page.locator('.pronounce').click();call=await page.evaluate(()=>window.qaSpeech.calls.at(-1));assert.equal(call.rate,.65);assert.equal(call.lang,'en-US');await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Norsk',exact:true}).click();await page.locator('.reading-toolbar > button').click();call=await page.evaluate(()=>window.qaSpeech.calls.at(-1));assert.equal(call.lang,'nb-NO');assert(call.text.includes('Mira'));
 await page.evaluate(()=>window.qaSpeech.last.onerror({error:'not-allowed'}));await page.locator('.speech-message').waitFor({state:'visible'});
 await page.locator('header nav button').nth(1).click();const pending=page.waitForEvent('download');await page.locator('[role="dialog"] > .small-action').click();const download=await pending;await download.saveAs('docs/browser-qa/download-nb.txt');const downloaded=readFileSync('docs/browser-qa/download-nb.txt','utf8');assert(downloaded.includes('Du valgte:'));assert(!downloaded.includes('The festival music stops'));
 results.push('English narration uses en-US; Norwegian narration uses nb-NO; word pronunciation uses rate 0.65; scene changes cancel old speech; speech failure gives visible feedback; Norwegian journey download contains translated history.');
}finally{await browser.close();writeFileSync('docs/browser-qa/narration-report.json',JSON.stringify({results,scope:'Mocked browser speech engine tests wiring and failure handling only. No claim about actual audio quality, installed voices or real mobile devices.'},null,2));}
console.log('PASS: '+results.join('\n'));

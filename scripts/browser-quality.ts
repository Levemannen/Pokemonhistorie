import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {initial,available,advance,byId,storyText,type State,type Starter} from '../src/story';
import {getPuzzle} from '../src/puzzles';
import {restoreSave} from '../src/save';
import {translate} from '../src/i18n';
import {resolveIllustration} from '../src/illustrations';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE!).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
const proof=JSON.parse(readFileSync('verification-report.json','utf8'));
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
const output='docs/browser-qa';mkdirSync(output,{recursive:true});
const errors:string[]=[],failures:unknown[]=[],screens=new Set<string>();let pages=0,routes=0;
const widths=[375,768,1440];const normalize=(s:string)=>s.replace(/\s+/g,' ').trim();
const stateOf=(page:any):Promise<State>=>page.evaluate(()=>JSON.parse(localStorage.getItem('starlight-story-v1')!));
try{
 for(const language of ['en','nb'] as const)for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[])for(const [ending,steps] of Object.entries(proof.reachableRoutes[starter]) as [string,string[]][]){
  const width=widths[routes%3];const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();
  page.on('pageerror',(e:Error)=>errors.push(e.message));
  try{
   await page.goto('http://127.0.0.1:4173/');
   if(language==='nb')await page.getByRole('button',{name:'Norsk',exact:true}).click();
   await page.locator('.starter').filter({hasText:starter}).click();await page.locator('.begin').click();
   for(let index=0;index<steps.length;index++){
    let state=await stateOf(page);assert(state);const id=steps[index].split(': ')[0];assert.equal(state.scene,id);
    assert.equal(await page.locator('.story-extras').count(),1,'Repeated companion section at '+id);
    assert.equal(await page.locator('.puzzle-card').count(),getPuzzle(state)?1:0,'Stale puzzle at '+id);
    await page.locator('.scene-art-base').first().evaluate((img:HTMLImageElement)=>img.decode());
    const image=await page.locator('.scene-art-base').first().getAttribute('src');assert(image?.endsWith(resolveIllustration(manifest,state).base));
    const rendered=normalize(await page.locator('.page-body > div > .story-text').count()?await page.locator('.page-body > div > .story-text').innerText():await page.locator('.story-text').first().innerText());
    assert.equal(rendered,normalize(translate(storyText(byId[state.scene],state),language)),state.scene+' '+language);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)failures.push({type:'horizontal-overflow',scene:state.scene,width,language});
    if(!screens.has(state.scene)&&language==='nb'){screens.add(state.scene);await page.screenshot({path:`${output}/${state.scene}-${width}-nb.png`,fullPage:true});}
    pages++;
    if(index===steps.length-1){assert.equal(byId[state.scene].ending,ending);break;}
    const label=steps[index].slice(steps[index].indexOf(': ')+2);
    let choices=available(state),ci=choices.findIndex(c=>c.label.replaceAll('{starter}',starter)===label);
    if(ci<0){for(const n of getPuzzle(state)!.answer)await page.locator('.puzzle-controls button').nth(n).click();state=await stateOf(page);choices=available(state);ci=choices.findIndex(c=>c.label.replaceAll('{starter}',starter)===label);}
    assert(ci>=0);const next=advance(state,choices[ci]);await page.locator('.choose-story').nth(ci).click();
    await page.waitForFunction((id:string)=>JSON.parse(localStorage.getItem('starlight-story-v1')||'{}').scene===id,next.scene);
    if(index===4){const before=restoreSave(JSON.stringify(await stateOf(page)));await page.reload();await page.waitForSelector('.choose-story');assert.deepEqual(await stateOf(page),before);}
   }
   assert.equal((await stateOf(page)).language,language);routes++;
  }catch(error){failures.push({starter,ending,language,error:String(error)});}
  finally{await context.close();}
  console.log(`Browser route ${routes}: ${starter}, ${ending}, ${language}`);
 }
}finally{
 await browser.close();writeFileSync(`${output}/report.json`,JSON.stringify({routes,pages,widths,screenshots:[...screens],errors,failures,scope:'Real UI clicks on 18 representative routes in each language. Reduced motion. Separate clean browser profiles; no user saves changed.'},null,2));
}
assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failures.length,0,JSON.stringify(failures));assert.equal(routes,36);
console.log(`PASS: ${routes} browser journeys, ${pages} rendered pages, both languages, 3 viewport widths, reload persistence and expected local artwork.`);

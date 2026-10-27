import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {byId,initial,scenes,available,storyText,type Starter} from '../src/story';
import {sentenceParts} from '../src/words';
import {StoryChoices} from '../src/StoryChoices';
import {resolveIllustration,type IllustrationManifest} from '../src/illustrations';
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8')) as IllustrationManifest;
const allFlags=[...new Set(scenes.flatMap(s=>s.choices.flatMap(c=>c.flag?[c.flag]:[])).concat(['guardReturned','nestGift','replyTrust','puzzle:mushrooms','puzzle:falls','puzzle:observatory']))];
const sets=[[],...allFlags.map(f=>[f]),allFlags];let cases=0;
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 for(const scene of scenes){
  if(scene.id==='ridge'&&starter!=='Charmander')continue;
  for(const flags of sets){
   const state={...initial(starter),scene:scene.id,flags};const text=storyText(scene,state);
   assert(sentenceParts(text).length>=2&&sentenceParts(text).length<=4,scene.id);
   assert(!text.includes('{starter}'));assert.equal(resolveIllustration(manifest,state).kind,'painted');cases++;
  }
  const state={...initial(starter),scene:scene.id};
  if(!scene.ending){
   const markup=renderToStaticMarkup(<StoryChoices game={state} onChoose={()=>{}} speak={()=>{}} speechAvailable={false}/>);
   assert.equal((markup.match(/class="choose-story"/g)||[]).length,available(state).length);
   const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
   for(const match of markup.matchAll(/aria-controls="([^"]+)"/g))assert(ids.includes(match[1]));
  }
 }
 const state={...initial(starter),scene:'roots'};
 if(starter!=='Bulbasaur')assert(!storyText(byId.roots,state).includes('Bulbasaur'));
 const sky=storyText(byId.sky,{...state,scene:'sky'});assert(!sky.includes('feather'));assert.equal(sky.includes('Charmander'),starter==='Charmander');
 assert(storyText(byId.sky,{...state,scene:'sky',flags:['feather']}).includes('cloud feather'));
 const earth=storyText(byId.earth,{...state,scene:'earth'});assert.equal(earth.includes('Bulbasaur'),starter==='Bulbasaur');
 assert(!storyText(byId.stairs,{...state,scene:'stairs'}).includes('Promise Trail'));
}
const paths=new Set<string>();for(const scene of Object.values(manifest.scenes)){Object.values(scene.base).forEach(p=>paths.add(p));scene.variants?.forEach(v=>paths.add(v.path));}
for(const path of paths){assert(existsSync('public/'+path));assert(statSync('public/'+path).size>0);assert(!path.startsWith('/')&&!path.includes('..'));}
const html=readFileSync('dist/index.html','utf8');assert(!/src="\/assets|href="\/assets/.test(html),'Deployment assets must support repository subpaths');
console.log('PASS: '+cases+' scene/starter/decision text-and-art combinations; rendered choice IDs and controls; available-ability wording; local assets and relative deployment paths.');

import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {resolveIllustration,type IllustrationManifest} from '../src/illustrations';
import {initial,scenes,type Starter} from '../src/story';

const shared='images/scenes/painted/scene-gate.png';
const manifest:IllustrationManifest={scenes:{gate:{base:{Bulbasaur:shared,Charmander:shared,Squirtle:shared},fallbackBase:{Bulbasaur:'b.svg',Charmander:'c.svg',Squirtle:'s.svg'},variants:[{path:'eevee.png',needs:'companion:Eevee',priority:15},{path:'promise.png',needs:'keptPromise',priority:30},{path:'fire.png',starter:'Charmander',needs:'companion:Eevee',priority:20}]}},companionLayers:{Eevee:'eevee.svg'},decisionLayers:[]};
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 const state={...initial(starter),scene:'gate'};
 assert.equal(resolveIllustration(manifest,state).base,shared,'Shared backgrounds must work for every starter');
 assert.deepEqual(resolveIllustration(manifest,state).layers,[],'Paintings must not receive flat SVG overlays');
 const withFriend={...state,companions:['Eevee']};
 assert.equal(resolveIllustration(manifest,withFriend).base,starter==='Charmander'?'fire.png':'eevee.png');
 assert.equal(resolveIllustration(manifest,{...withFriend,flags:['keptPromise']}).base,'promise.png','The most important matching decision wins');
 const fallback=resolveIllustration(manifest,withFriend,true);
 assert.equal(fallback.kind,'fallback');assert.equal(fallback.base,manifest.scenes.gate.fallbackBase![starter]);
 assert.deepEqual(fallback.layers,[{path:'eevee.svg',kind:'canvas'}]);
}
const actual=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8')) as IllustrationManifest;
const catalog=JSON.parse(readFileSync('public/images/painted-catalog.json','utf8'));
const prompts=JSON.parse(readFileSync('public/images/painted-prompts.json','utf8'));
for(const [id,asset] of Object.entries(catalog) as [string,{path:string}][]){
 assert.ok(existsSync('public/'+asset.path),id+' must exist locally');
 assert.equal(readFileSync('public/'+asset.path).subarray(0,8).toString('hex'),'89504e470d0a1a0a',id+' must be a real PNG');
 assert.ok(prompts[id],id+' must have an authored prompt');
}
for(const entry of Object.values(actual.scenes)){
 for(const path of Object.values(entry.base))assert.ok(existsSync('public/'+path),path);
 for(const variant of entry.variants||[])assert.ok(existsSync('public/'+variant.path),variant.path);
}
for(const scene of scenes){
 for(const starter of (scene.id==='ridge'?['Charmander']:['Bulbasaur','Charmander','Squirtle']) as Starter[]){
  assert.equal(resolveIllustration(actual,{...initial(starter),scene:scene.id}).kind,'painted',scene.id+' / '+starter+' must use the finished style');
 }
 for(const variant of actual.scenes[scene.id].variants||[])assert(variant.path.endsWith('.png'),'Active variants must also use the finished style');
}
assert.equal(actual.coverage?.paintedScenes,39);
console.log('Artwork passed: all 39 scenes use prepared paintings for every reachable starter; active variants, local PNGs and emergency SVG recovery validated.');

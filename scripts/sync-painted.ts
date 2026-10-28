import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {scenes,type Starter} from '../src/story';
const file='public/images/illustration-manifest.json';
const manifest=JSON.parse(readFileSync(file,'utf8'));
const catalogPath='public/images/painted-catalog.json';
const catalog=existsSync(catalogPath)?JSON.parse(readFileSync(catalogPath,'utf8')):{};
const plan=JSON.parse(readFileSync('docs/painted-production-plan.json','utf8'));
const prompts=JSON.parse(readFileSync('public/images/illustration-prompts.json','utf8'));
const starters:Starter[]=['Bulbasaur','Charmander','Squirtle'];
const ready=(id:string)=>catalog[id]&&catalog[id].status==='generated'&&existsSync('public/'+catalog[id].path);
const overrides=JSON.parse(readFileSync('public/images/story-art-overrides.json','utf8'));
delete manifest.paintedStarters;delete manifest.paintedFriends;
let paintedScenes=0;
for(const scene of scenes){
 const entry=manifest.scenes[scene.id];
 entry.fallbackBase??={...entry.base};entry.base={...entry.fallbackBase};delete entry.render;delete entry.embedded;delete entry.variants;
 const shared=`scene-${scene.id}`;
 const reachable=starters;
 let painted=0;
 for(const name of starters){
  const specific=scene.id==='lantern'?`lantern-${name.toLowerCase()}`:`scene-${scene.id}-${name.toLowerCase()}`;
  const id=ready(shared)?shared:specific;
  if(ready(id)){entry.base[name]=catalog[id].path;if(reachable.includes(name))painted++;}
 }
 if(painted){entry.render='painted-baked';if(painted===reachable.length)paintedScenes++;}
 entry.variants=plan.jobs.filter((job:{id:string;kind:string;scene:string})=>job.kind==='variant'&&job.scene===scene.id&&ready(job.id)).map((job:{id:string;starter:string;needs:string;priority:number})=>({path:catalog[job.id].path,starter:job.starter,needs:job.needs,priority:job.priority}));
 for(const variant of overrides[scene.id]||[]){if(!existsSync('public/'+variant.path))throw Error('Missing reviewed variant '+variant.path);entry.variants.push(variant);}
}
for(const job of plan.jobs){if(ready(job.id))prompts[`${job.id}.png`]=job.prompt;}
const required=plan.jobs.filter((job:{optional?:boolean})=>!job.optional);
manifest.coverage={paintedScenes,totalScenes:scenes.length,completedAssets:required.filter((job:{id:string})=>ready(job.id)).length,plannedAssets:required.length,optionalAssets:plan.jobs.filter((job:{id:string;optional?:boolean})=>job.optional&&ready(job.id)).length};
manifest.artType=paintedScenes===scenes.length?'Locally prepared AI storybook scenes, shared across starters where appropriate; SVG fallbacks retained':'Mixed locally prepared full-scene AI artwork and clearly labeled SVG fallbacks';
manifest.version=2;
writeFileSync(file,JSON.stringify(manifest,null,2));writeFileSync('public/images/illustration-prompts.json',JSON.stringify(prompts,null,2));
console.log(`Local painted artwork: ${manifest.coverage.completedAssets}/${required.length} required assets; ${paintedScenes}/${scenes.length} scenes integrated.`);

import {readFileSync,writeFileSync,copyFileSync,existsSync} from 'node:fs';
const inputs=JSON.parse(readFileSync(process.argv[2],'utf8'));
const planPath='docs/painted-production-plan.json',catalogPath='public/images/painted-catalog.json',promptsPath='public/images/painted-prompts.json',revisionPath='public/images/painted-revisions.json';
const plan=JSON.parse(readFileSync(planPath,'utf8')),catalog=JSON.parse(readFileSync(catalogPath,'utf8')),prompts=JSON.parse(readFileSync(promptsPath,'utf8'));
const revisions=existsSync(revisionPath)?JSON.parse(readFileSync(revisionPath,'utf8')):{};
for(const {id,source,prompt} of inputs){
 const job=plan.jobs.find(j=>j.id===id);if(!job)throw Error('Unknown job '+id);
 if(!readFileSync(source).subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')))throw Error('Not a PNG');
 const path='images/scenes/painted/'+id+'.png';copyFileSync(source,'public/'+path);
 job.prompt=prompt;prompts[id]=prompt;revisions[id]=prompt;
 const {prompt:_,...metadata}=job;catalog[id]={...metadata,path,promptKey:id,generator:'built-in image_gen',status:'generated'};
 console.log('Registered reviewed painting: '+id);
}
writeFileSync(planPath,JSON.stringify(plan,null,2));writeFileSync(catalogPath,JSON.stringify(catalog,null,2));writeFileSync(promptsPath,JSON.stringify(prompts,null,2));writeFileSync(revisionPath,JSON.stringify(revisions,null,2));

import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {scenes,byId,initial,advance,available,storyText,type State,type Starter} from '../src/story';
import {arrivalText,choiceOutcomes} from '../src/narrative';
import {sentenceParts} from '../src/words';
let edges=0;const report:string[]=['# Story transition review','', 'Every choice below has its own authored result before the destination scene. Canonical labels remain stable for existing saves.',''];
for(const scene of scenes){
 if(scene.ending)continue;
 assert.equal(choiceOutcomes[scene.id]?.length,scene.choices.length,scene.id+' must acknowledge every choice');
 assert.equal(new Set(choiceOutcomes[scene.id]).size,scene.choices.length,scene.id+' repeats a generic result');
 report.push('## '+scene.title,'');
 for(const choice of scene.choices){
  edges++;
  const starter=choice.starter||'Bulbasaur';
  const flags=[...new Set(scenes.flatMap(s=>s.choices.flatMap(c=>c.flag?[c.flag]:[])).concat(['guardReturned','nestGift','replyTrust','puzzle:mushrooms','puzzle:falls','puzzle:observatory']))];
  const before:State={...initial(starter),scene:scene.id,flags,companions:['Lapras','Pikachu','Hoothoot']};
  assert(available(before).includes(choice),scene.id+': unavailable test edge');
  const after=advance(before,choice),dest=byId[after.scene],text=storyText(dest,after),arrival=arrivalText(dest,after,byId);
  assert(arrival.length>30,scene.id+': no action result');assert(text.startsWith(arrival));
  const count=sentenceParts(text).length;assert(count>=2&&count<=4,dest.id+' has '+count+' sentences after '+choice.label);
  assert(!text.includes('{starter}'));assert(!/undefined|null/.test(text));
  report.push('- **'+choice.label+'** → '+dest.title+'\n  '+arrival);
 }
 report.push('');
}
const choose=(g:State,flag:string)=>advance(g,available(g).find(c=>c.flag===flag)!);
for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 let game=initial(starter);
 assert.match(storyText(byId.lantern,game),new RegExp(starter));
 assert.match(storyText(byId.lantern,game),/Mira/);
 game=choose(game,'kind');assert.match(storyText(byId.square,game),/until it feels braver.*Mira/);
}
let root=initial('Bulbasaur');for(const step of ['kind','map','gentle','listener','rootFriend'])root=choose(root,step);
assert.equal(root.scene,'clearing');assert.match(storyText(byId.clearing,root),/Bulbasaur touches the roots.*lifts its roots into a doorway/);
const ui=readFileSync('src/App.tsx','utf8');assert(!ui.includes('AROUND YOUR LITTLE TEAM'));assert(!ui.includes('<ChapterPause'));assert(!ui.includes('pendingChapter('));
assert.equal(edges,105);
writeFileSync('docs/STORY-TRANSITIONS.md',report.join('\n'));
console.log('PASS: all 105 choices have distinct action results, 2–4 sentences per destination, all starter introductions, Bulbasaur root response and uninterrupted chapter transitions.');

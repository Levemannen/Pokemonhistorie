import data from './manuscript-v3.json';
import type {State,Scene,Choice,Starter} from './legacyStory';
import type {WorldState} from './world';
import {authoredText,getLanguage} from './i18n';

export type V3Choice=Choice&{id:string;nb:string;when:string;set:string[];get:string[];response?:string;nbResponse?:string;alternate?:{when:string;to:string}};
export type V3Scene={id:string;title:string;nbTitle:string;chapter:number;en:string;nb:string;choices:V3Choice[]};
export const raw=data as V3Scene[];
export const rawById=Object.fromEntries(raw.map(s=>[s.id,s]));
export const endings=['DAWN','AURORA','LANTERN','SONG','SANCTUARY','GARDEN'];
export const oldEndings:Record<string,string>={DAWN:'endDawn',AURORA:'endAurora',LANTERN:'endLantern',SONG:'endSong',SANCTUARY:'endSanctuary',GARDEN:'endGarden'};
export const scenes:Scene[]=[...raw.map(s=>({id:s.id,title:s.title,text:s.en,chapter:s.chapter,setting:s.chapter===1?'village':s.chapter===2?'forest':s.chapter===3?'river':'tower',detail:s.id,choices:s.choices})),...endings.map(e=>({id:'F_'+e,title:rawById['E_'+e].title,text:'',chapter:5,setting:'village',detail:e,choices:[],ending:rawById['E_'+e].title}))];
export const byId=Object.fromEntries(scenes.map(s=>[s.id,s]));
export const choicesById=Object.fromEntries(raw.flatMap(s=>s.choices.map(c=>[c.id,c])));
export const isV3=(s:State)=>s.world?.edition==='3';
export function initial(starter:Starter):State{
 return {scene:'S01',starter,flags:[],companions:[],history:[],puzzles:{},world:{edition:'3',flags:{},items:[],knownFacts:[],relationships:{},partyTraveling:[],friendsLocal:{},arrivalMode:'start',lastChoiceId:null,visited:['S01'],usedItems:[]}};
}
const has=(s:State,key:string)=>s.world!.flags[key]==='true'||s.world!.items.includes(key);
export function condition(s:State,expression:string):boolean{
 const tokens=expression.match(/[A-Za-z_][\w]*|[()]/g)||[];let pos=0;
 function atom():boolean{const token=tokens[pos++];if(token==='NOT')return !atom();if(token==='('){const v=or();if(tokens[pos++]!==')')throw Error('Unbalanced condition');return v;}if(!token)throw Error('Missing condition');return fact(s,token);}
 function and():boolean{let v=atom();while(tokens[pos]==='AND'){pos++;const rhs=atom();v=v&&rhs;}return v;}
 function or():boolean{let v=and();while(tokens[pos]==='OR'){pos++;const rhs=and();v=v||rhs;}return v;}
 if(!expression)return true;const value=or();if(pos!==tokens.length)throw Error('Invalid condition '+expression);return value;
}
export function fact(s:State,key:string):boolean{
 if(key==='TRUE')return true;
 if(key.startsWith('starter_'))return s.starter===key.slice(8);
 if(key==='prepared_route')return condition(s,'warmth_sky_ready OR warmth_heart_ready OR (earth_pot_found AND earth_backup_ready AND silver_seed)');
 if(key==='valid_consent')return condition(s,'(warmth_sky_ready AND shinx_consents_sky) OR (warmth_heart_ready AND shinx_consents_heart) OR (earth_pot_found AND earth_backup_ready AND silver_seed AND shinx_consents_earth)');
 if(key==='moon_unlock')return condition(s,'rescue_square AND hoothoot_nest AND helped_altaria AND gastly_friend AND (compassionate_letter OR (lumi_trust AND island_promise)) AND moon_sig_1 AND moon_sig_2 AND moon_sig_3');
 if(key==='sun_unlock')return condition(s,'rescued_pikachu AND rescued_lapras AND helped_psyduck AND helped_altaria AND bridge_repaired AND leadership');
 if(key==='both_unlock')return condition(s,'moon_unlock AND sun_unlock AND secret_star_map');
 if(key.startsWith('solved_'))return s.flags.includes('puzzle:'+key.slice(7));
 return has(s,key);
}
export function available(s:State):V3Choice[]{
 return (rawById[s.scene]?.choices||[]).filter(c=>condition(s,c.when)).filter(c=>c.to!=='Q_RETURN'||s.scene.startsWith('Q_')||rawById.Q_RETURN.choices.some(q=>q.to!=='RETURN_MAIN'&&condition(s,q.when))).map(c=>({...c,to:c.to==='RETURN_MAIN'?(s.world!.flags.return_main||'S22'):c.to==='FINISH'?'F_'+s.world!.flags.ending:c.alternate&&condition(s,c.alternate.when)?c.alternate.to:c.to}));
}
const rescued=['kindness_eevee','rescue_square','rescued_pikachu','hoothoot_nest','rescued_lapras','helped_psyduck','helped_altaria'];
function sync(w:WorldState){
 w.partyTraveling=['Pikachu','Hoothoot'].filter(n=>w.flags['companion_'+n.toLowerCase()]==='true');
 w.flags.rescue_count=String(rescued.filter(k=>w.flags[k]==='true').length);
 w.relationships=Object.fromEntries(rescued.filter(k=>w.flags[k]==='true').map(k=>[k,'helped']));
}
function grant(w:WorldState,...items:string[]){w.items=[...new Set([...w.items,...items.filter(id=>!w.usedItems.includes(id))])];}
function release(s:State,id:string){
 const w=s.world!,route=w.flags.chosen_route;if(w.flags.release_done==='true')throw Error('Light already released');
 const valid=route==='sky'?condition(s,'warmth_sky_ready AND shinx_consents_sky'):route==='heart'?condition(s,'warmth_heart_ready AND shinx_consents_heart'):route==='earth'?condition(s,'earth_pot_found AND earth_backup_ready AND shinx_consents_earth'):false;
 if(!valid||!w.items.includes('silver_seed'))throw Error('Unprepared release');
 const expected=route==='sky'?(condition(s,'helped_altaria AND mira_trust')?'AURORA':'DAWN'):route==='heart'?(has(s,'know_old_verse')?'SONG':'LANTERN'):(condition(s,'helped_altaria AND knows_shinx_care')?'SANCTUARY':'GARDEN');
 if(id!=='E_'+expected)throw Error('Incorrect ending');
 // One atomic transition. Event order follows the authored ending; reload never executes it.
 const events=route==='earth'?['backup_heat','plant_seed','shinx_confirms','lumi_unlocks','release']:['start_warmth','shinx_confirms','lumi_unlocks','release','plant_seed'];
 w.flags.release_events=events.join(',');w.flags.release_done='true';w.flags.ending=expected;w.flags.seed_location=expected;
 w.items=w.items.filter(i=>i!=='silver_seed');w.usedItems=[...new Set([...w.usedItems,'silver_seed'])];
}
export function advance(s:State,requested:Choice):State{
 const c=available(s).find(c=>c.id===requested.id&&c.to===requested.to);if(!c)throw Error('Unavailable v3 choice');
 const w=structuredClone(s.world!);const next:State={...s,world:w,scene:c.to,history:[...s.history,{scene:s.scene,choice:c.label,choiceId:c.id,world:structuredClone(s.world!),flags:[...s.flags],companions:[...s.companions]}]};
 if((c.to==='Q_RETURN'||c.to==='Q_PREP')&&!s.scene.startsWith('Q_'))w.flags.return_main=s.world!.visited.includes('S21')?'S22':'S20';
 for(const flag of c.set){const [k,v]=flag.split('=');w.flags[k]=v||'true';}
 grant(w,...c.get);w.arrivalMode=s.scene;w.lastChoiceId=c.id;w.visited=[...new Set([...w.visited,c.to])];
 if(c.to==='S03')grant(w,'silver_seed');if(c.to==='S05')grant(w,'map','lantern');
 if(c.to==='S13')grant(w,'letter');if(c.to==='S19')w.flags.supplies_arrived='true';
 if(c.to==='Q_RETURN')w.flags.return_visits=String(Number(w.flags.return_visits||0)+1);
 if(c.to.startsWith('E_'))release(next,c.to);
 if(c.to==='S25'&&w.flags.release_done!=='true')throw Error('Epilogue before release');
 if(c.to.startsWith('B_')&&w.flags.main_complete!=='true')throw Error('Bonus before completion');
 sync(w);next.companions=[...w.partyTraveling];return next;
}
export function endingKey(s:State):string{return isV3(s)?oldEndings[s.world!.flags.ending]||s.scene:s.scene;}
export function title(s:State):string{const id=s.scene.startsWith('F_')?'E_'+s.world!.flags.ending:s.scene;return authoredText(getLanguage()==='nb'?rawById[id].nbTitle:rawById[id].title);}
function conditionalText(s:State,text:string){
 return text.split('\n\n').map(p=>{
  const segments=p.split(/(\[(?:IF [^\]]+|ELSE IF [^\]]+|ELSE|END)\])/);let include=true,matched=false;
  return segments.map(t=>{if(t.startsWith('[IF ')){include=condition(s,t.slice(4,-1));matched=include;return '';}
   if(t.startsWith('[ELSE IF ')){include=!matched&&condition(s,t.slice(9,-1));matched ||= include;return '';}
   if(t==='[ELSE]'){include=!matched;return '';}
   if(t==='[END]'){include=true;matched=false;return '';}
   return include?t:'';}).join('').trim();
 }).filter(Boolean).join('\n\n');
}
export function storyText(s:State):string{
 let id=s.scene; if(id.startsWith('F_'))id='S25';
 let text=rawById[id][getLanguage()==='nb'?'nb':'en'];
 const previous=s.world!.lastChoiceId?choicesById[s.world!.lastChoiceId]:null;
 const response=previous?.[getLanguage()==='nb'?'nbResponse':'response'];
 if(response)text=response+'\n\n'+text;
 text=conditionalText(s,text).replace(/\{starter\}/g,s.starter);
 const isNb=getLanguage()==='nb';
 if(s.scene==='Q_RETURN')text+='\n\n'+(Number(s.world!.flags.return_visits||0)>2?(isNb?'Flere frivillige bærer nå lykter langs stien. Tårnklokken slår igjen.':'More volunteers now carry lanterns along the path. The tower bell rings again.'):(isNb?'Blomstenes lys er svakere nå. Dere følger de trygge merkene sammen.':'The flowers glow more faintly now. Together you follow the safe trail markers.'));
 if(s.scene==='S09'&&has(s,'tree_hint'))text+='\n\n'+(isNb?'Partneren din peker mot stien bak dere. «Tenk på dem som ikke kunne følge oss.»':'Your partner points toward the path behind you. “Think of those who could not come with us.”');
 if(s.world!.lastChoiceId?.startsWith('Q_PREP.')){const choice=s.world!.lastChoiceId!;const index=Number(choice.split('.')[1]);if(index<=4)text=(isNb?'Dere har prøvd løsningen. Den er klar til å vises til Shinx.':'You have tested the plan. It is ready to show Shinx.')+'\n\n'+text;}
 return authoredText(text);
}
/** Replay every recorded choice: saved booleans cannot bypass equipment or consent. */
export function restore(value:unknown):State|null{
 try{const v=value as State;if(!v||v.world?.edition!=='3'||!['Bulbasaur','Charmander','Squirtle'].includes(v.starter)||!Array.isArray(v.history)||v.history.length>10000)return null;
 let s=initial(v.starter);
 for(const h of v.history){if(h.scene!==s.scene)return null;
  // Only validated puzzle solutions from the snapshot may enable a puzzle-gated choice.
  const flags=(h.flags||[]).filter(f=>/^puzzle:(S06|S07|S17|Q_MOON1|Q_STAR)$/.test(f));
  s={...s,flags:[...new Set([...s.flags,...flags])]};
  const c=available(s).find(c=>c.id===h.choiceId);if(!c)return null;s=advance(s,c);
 }
 if(s.scene!==v.scene)return null;
 const current=(v.flags||[]).filter(f=>/^puzzle:(S06|S07|S17|Q_MOON1|Q_STAR)$/.test(f));
 const inspections=(v.flags||[]).filter(f=>f.startsWith('inspected:')&&[...s.world!.items,...s.world!.usedItems].includes(f.slice(10)));
 const puzzles:NonNullable<State['puzzles']>={};
 for(const id of ['S06','S17','Q_MOON1','Q_STAR']){
  const p=v.puzzles?.[id];if(!p||!Array.isArray(p.input)||p.input.length>3||!p.input.every(n=>Number.isInteger(n)&&n>=0&&n<3))continue;
  puzzles[id]={input:[...p.input],attempts:Number.isInteger(p.attempts)?Math.max(0,p.attempts):0,hints:Number.isInteger(p.hints)?Math.min(2,Math.max(0,p.hints)):0,solved:[...s.flags,...current].includes('puzzle:'+id)};
 }
 return {...s,flags:[...new Set([...s.flags,...current,...inspections])],puzzles,language:v.language==='nb'?'nb':'en',journeyId:typeof v.journeyId==='string'?v.journeyId:undefined,acknowledgedChapters:[1,2,3,4,5]};
 }catch{return null;}
}

import {byId,type State} from './legacyStory';
import {puzzleIds,getPuzzle,type PuzzleProgress} from './puzzles';
const strings=(value:unknown):value is string[]=>Array.isArray(value)&&value.every(v=>typeof v==='string');
export function restoreSave(raw:string|null):State|null{
 try{
  const value=JSON.parse(raw||'null');
  if(!value||!byId[value.scene]||!['Bulbasaur','Charmander','Squirtle'].includes(value.starter)||!strings(value.flags)||!strings(value.companions)||!Array.isArray(value.history))return null;
  if(!value.history.every((h:unknown)=>{if(!h||typeof h!=='object')return false;const entry=h as Record<string,unknown>;return typeof entry.scene==='string'&&Boolean(byId[entry.scene])&&typeof entry.choice==='string';}))return null;
  const state:State={scene:value.scene,starter:value.starter,flags:[...new Set(value.flags as string[])],companions:[...new Set(value.companions as string[])],history:value.history.map((h:{scene:string;choice:string;flags?:unknown;companions?:unknown})=>({scene:h.scene,choice:h.choice,...strings(h.flags)?{flags:h.flags}:{},...strings(h.companions)?{companions:h.companions}:{}}))};
  const puzzles:Record<string,PuzzleProgress>={};
  if(value.puzzles&&typeof value.puzzles==='object')for(const id of puzzleIds){
   const definition=getPuzzle({...state,scene:id});if(!definition)continue;
   const p=value.puzzles[id];if(!p||!Array.isArray(p.input)||!p.input.every((n:unknown)=>Number.isInteger(n)&&Number(n)>=0&&Number(n)<definition.buttons.length)||p.input.length>definition.answer.length)continue;
   const solved=state.flags.includes(`puzzle:${id}`);
   puzzles[id]={input:!solved&&p.input.length===definition.answer.length?[]:p.input,attempts:Number.isInteger(p.attempts)&&p.attempts>=0?p.attempts:0,hints:Number.isInteger(p.hints)?Math.max(0,Math.min(definition.hints.length,p.hints)):0,solved};
  }
  state.puzzles=puzzles;
  if(value.language==='en'||value.language==='nb')state.language=value.language;
  if(typeof value.journeyId==='string'&&value.journeyId)state.journeyId=value.journeyId;
  state.acknowledgedChapters=Array.isArray(value.acknowledgedChapters)?[...new Set(value.acknowledgedChapters.filter((n:unknown)=>Number.isInteger(n)&&Number(n)>=1&&Number(n)<=5))] as number[]:Array.from({length:byId[state.scene].chapter},(_,i)=>i+1);
  // Existing v1 saves keep their progress and gain arrival effects from the new edition.
  if(state.scene==='observatory'&&state.flags.includes('forestGuard')&&!state.flags.includes('guardReturned'))state.flags.push('guardReturned');
  if(state.scene==='clearing'&&state.flags.includes('nest')&&!state.flags.includes('nestGift'))state.flags.push('nestGift');
  if(state.scene==='lumi'&&state.flags.includes('reply')&&!state.flags.includes('replyTrust'))state.flags.push('replyTrust');
  return state;
 }catch{return null;}
}

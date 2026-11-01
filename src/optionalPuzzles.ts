import data from './optional-puzzles.json';
import type {State} from './legacyStory';

export const optionalPuzzles=data;
export const optionalPuzzleFor=(state:State)=>state.world?.edition==='3'?data.find(p=>p.scene===state.scene):undefined;
export function answerOptionalPuzzle(state:State,index:number):State{
 const puzzle=optionalPuzzleFor(state);
 if(!puzzle||!puzzle.en.answers[index]?.correct||state.world!.flags[puzzle.flag]==='true')return state;
 return {...state,world:{...state.world!,flags:{...state.world!.flags,[puzzle.flag]:'true'}}};
}
/** Preserve only optional discoveries earned in an already reached scene. */
export function restoreOptionalDiscoveries(state:State,flags:Record<string,string>|undefined){
 for(const puzzle of data){
  if(flags?.[puzzle.flag]==='true'&&state.world!.visited.includes(puzzle.scene))
   state.world!.flags[puzzle.flag]='true';
 }
}

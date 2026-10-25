import type {State} from './story';
export type PuzzleProgress={input:number[];attempts:number;hints:number;solved:boolean};
export type Puzzle={id:string;title:string;instruction:string;observation:string;kind:'stars'|'melody'|'mechanism';buttons:string[];answer:number[];hints:string[];success:string};
export const puzzleIds=['mushrooms','falls','observatory'];
export function getPuzzle(state:State):Puzzle|null{
 if(state.scene==='mushrooms')return {id:'mushrooms',title:'The little constellation',kind:'stars',instruction:'A stone reads, “A little light grows into a trail.” Choose three stars to trace the hidden path.',observation:'Three gold stars share a diagonal. The pale sparks sit off that line, and the gold stars have different sizes.',buttons:['Small star','Empty sky','Decoy star','Empty sky','Medium star','Empty sky','Decoy star','Empty sky','Large star'],answer:[0,4,8],hints:['What could “grows” mean when three stars have different sizes?','Start with the small gold star at the top left, then the centre star, then the large star at the bottom right.'],success:'The constellation lights up! A forest rune appears beneath the smallest mushroom.'};
 if(state.scene==='falls')return {id:'falls',title:'The waterfall’s melody',kind:'melody',instruction:'The hidden door answers a three-note echo. Explore the two bells and listen before choosing your tune.',observation:'One bell makes a deep note; the other rings higher. The echo has three beats, and its first and last notes sound alike.',buttons:['Low bell','High bell'],answer:[0,1,0],hints:[state.flags.includes('song')||state.companions.includes('Hoothoot')?'Think back to the hilltop melody. Which note did Hoothoot return to?':'Listen for whether the middle note rises or falls from the first note.','Ring low, then high, then low. You can listen to the echo as often as you like.'],success:'The bells answer in harmony. A dry doorway opens behind the waterfall.'};
 if(state.scene!=='observatory')return null;
 const base={id:'observatory',kind:'mechanism' as const,title:`${state.starter}’s observatory challenge`,success:'The old mechanism wakes up. Your starter’s special skill opens the roof!'};
 if(state.starter==='Bulbasaur')return {...base,instruction:'Three vine cables connect to parts of a stone plant. Bulbasaur can move them; you must discover the order that brings it to life.',observation:'A faded picture shows water under the soil, sunlight on a leaf, and a flower opening. Each socket matches part of the picture.',buttons:['Root socket','Leaf socket','Flower socket'],answer:[0,1,2],hints:['Which part of a plant takes in water before the rest can grow?','Connect Root → Leaf → Flower. Bulbasaur will gently pull the cables into place.']};
 if(state.starter==='Charmander')return {...base,instruction:'Two frozen gears and a roof latch need careful attention. Charmander can supply warmth while you work out a safe order.',observation:'The little moon gear sits inside the big sun gear. A warning mark shows that the latch cannot move while either gear is frozen.',buttons:['Big sun gear','Small moon gear','Star latch'],answer:[1,0,2],hints:['Could warming the big outer gear force the frozen little gear to turn?','Warm Moon → Sun, then release Star. Charmander keeps its flame away from the wood.']};
 return {...base,instruction:'Three water basins balance the roof. Squirtle can fill them, but the order of their counterweights is yours to discover.',observation:'A water pipe rises from the floor, linking the basins like steps. Dry floats show where the water must lift each weight.',buttons:['Middle basin','High basin','Low basin'],answer:[2,0,1],hints:['Where would water coming from the floor reach first?','Fill Low → Middle → High. Squirtle uses a gentle stream, not a blast.']};
}
export const progressFor=(state:State,id:string):PuzzleProgress=>state.puzzles?.[id]||{input:[],attempts:0,hints:0,solved:state.flags.includes(`puzzle:${id}`)};
export function tryPuzzle(state:State,button:number):State{
 const puzzle=getPuzzle(state);if(!puzzle||!Number.isInteger(button)||button<0||button>=puzzle.buttons.length)return state;
 const prior=progressFor(state,puzzle.id);if(prior.solved)return state;
 const input=[...prior.input,button];let next={...prior,input};
 if(input.length===puzzle.answer.length){const solved=input.every((value,i)=>value===puzzle.answer[i]);next={...prior,input:solved?input:[],attempts:prior.attempts+1,solved};}
 return {...state,puzzles:{...state.puzzles,[puzzle.id]:next},flags:next.solved?[...new Set([...state.flags,`puzzle:${puzzle.id}`])]:state.flags};
}
export function hintPuzzle(state:State):State{
 const p=getPuzzle(state);if(!p)return state;const prior=progressFor(state,p.id);
 return {...state,puzzles:{...state.puzzles,[p.id]:{...prior,hints:Math.min(prior.hints+1,p.hints.length)}}};
}
export function resetPuzzle(state:State):State{
 const p=getPuzzle(state);if(!p||progressFor(state,p.id).solved)return state;
 return {...state,puzzles:{...state.puzzles,[p.id]:{...progressFor(state,p.id),input:[]}}};
}


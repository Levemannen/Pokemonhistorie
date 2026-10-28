import type {State} from './story';
import type {Fate} from './legacyEpilogues';
export function friendFates(state:State):Fate[]{
 const w=state.world!;if(!w.flags.endingMethod)return [];
 const result:Fate[]=[];
 const add=(name:string,symbol:string,text:string)=>result.push({name,symbol,text,travelled:name===state.starter||w.partyTraveling.includes(name)});
 add(state.starter,'✦',`${state.starter} keeps a place beside your backpack, ready for another adventure.`);
 for(const name of w.partyTraveling)add(name,'✧',name==='Eevee'?'Eevee remembers your invitation and welcomes other nervous travelers.':name==='Hoothoot'?'Hoothoot keeps singing the hilltop greeting. You can still answer its three notes.':name==='Pikachu'?'Pikachu remembers the gentle rescue and helps smaller Pokémon along the forest paths.':'Psyduck takes one step at a time and shares that advice with other worried travelers.');
 if(!w.partyTraveling.includes('Pikachu')&&w.flags.pikachu)add('Pikachu','ϟ',w.flags.pikachu==='left'?'Mira’s helpers freed Pikachu after receiving your signal. Pikachu remains in Moonwood.':'Pikachu stays in Moonwood and keeps its forest neighbors safe.');
 if(w.flags.lapras)add('Lapras','≈','Lapras remains on the Lumen River, ready to help the next traveler cross.');
 if(w.flags.nest==='saved'||w.flags.nest==='marked')add('The hilltop nest','❧',w.flags.nest==='saved'?'The branch you lifted no longer threatens the hilltop nest.':'Mira’s helpers follow your marker to secure the branch above the nest.');
 if(w.flags.river==='lanterns')add('The river lanterns','✧','The floating lanterns you made still mark the safe river channel.');
 if(w.flags.ordinarySeed==='planted')add('The forest seed','❧','The ordinary brown seed you planted stays in the forest, separate from the silver receiver.');
 add('Lumi','✧','Lumi shares the work with willing helpers and asks for help before fear takes over.');
 add('Shinx','ϟ','Shinx has warmth, care and a say in his recovery. His paw needs time to heal.');
 return result;
}

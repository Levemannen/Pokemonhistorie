import * as legacy from './legacyStory';
import * as edition from './edition';
import type {State,Choice,Scene,Starter,Dialogue} from './legacyStory';
export type {State,Choice,Scene,Starter,HistoryEntry,Dialogue,Memory} from './legacyStory';
export {artAliases,illustrationScene,qualities,vocabulary} from './legacyStory';
export const scenes=edition.scenes,byId=edition.byId,chapters=edition.chapters;
export const initial=edition.initial;
export const available=(state:State)=>state.world?edition.available(state):legacy.available(state);
export const advance=(state:State,choice:Choice)=>state.world?edition.advance(state,choice):legacy.advance(state,choice);
export const storyText=(scene:Scene,state:State)=>state.world?edition.storyText(state):legacy.storyText(legacy.byId[scene.id],state);
export const sceneTitle=(state:State)=>state.world?byId[state.scene].title:legacy.sceneTitle(state);
export const choiceText=(choice:Choice,starter:Starter)=>choice.id?choice.label:legacy.choiceText(choice,starter);
export function historyChoiceText(scene:string,label:string,starter:Starter){return byId[scene]?.choices.some(c=>c.label===label)?label:legacy.historyChoiceText(scene,label,starter);}
export function hasNeed(state:State,need:string):boolean{
 if(!state.world)return legacy.hasNeed(state,need);
 const w=state.world;
 if(need.includes('=')||need.includes(' solved')||need==='always')return edition.condition(state,need);
 if(need==='charmanderWarmth')return state.starter==='Charmander'&&w.flags.endingMethod==='charmander';
 if(need==='reedGarden')return w.flags.endingMethod==='reeds';
 if(need==='feather')return w.flags.endingMethod==='feather';
 if(need==='puzzle:grove')return false;
 if(need==='rescue')return w.relationships.Pikachu==='freed';
 if(need==='returnedScarf')return w.usedItems.includes('shinxScarf');
 // The old garden illustration shows a remote magical root connection absent in this edition.
 if(need==='garden')return false;
 if(need==='pikachuHelp')return w.flags.pikachu==='guard'||w.partyTraveling.includes('Pikachu');
 if(need==='flockGuide')return w.flags.altaria==='flock'&&w.arrivalMode==='air';
 if(need==='replyTrust')return w.flags.reply==='sent';
 if(need==='floatingLanterns')return w.flags.river==='lanterns';
 return state.flags.includes(need);
}
export const visibleCompanions=(state:State)=>state.world?edition.visibleCompanions(state):legacy.visibleCompanions(state);
export const companionLine=(state:State)=>state.world?state.starter==='Bulbasaur'?'Bulbasaur’s vines curl toward you: “We can help this place grow.”':state.starter==='Charmander'?'Charmander lifts its tail carefully: “There is always a little light.”':'Squirtle pats your hand: “Together, one small step at a time.”':legacy.companionLine(state);
export function companionConversation(state:State){
 if(!state.world)return legacy.companionConversation(state);
 const w=state.world,lines:Dialogue[]=[{speaker:state.starter,text:byId[state.scene].ending?'Look how many little choices brought us here. Which adventure shall we try next?':'We can take our time. I’m right beside you.'}];
 for(const friend of w.partyTraveling)lines.push({speaker:friend,text:friend==='Eevee'?'I’ll check behind us so nobody gets left out.':friend==='Pikachu'?'If something needs a spark, ask me first. My cheeks are small, but my courage is growing.':friend==='Hoothoot'?'Hoo! I remember our little melody. Ask me if a door needs a song.':'I’m a little nervous. But crossing with you taught me I can try.'});
 return lines;
}
export function consequence(state:State){
 if(!state.world)return legacy.consequence(state);
 const w=state.world;
 if(state.scene==='clearing'&&w.flags.pikachu==='left')return {title:'Your signal reached the helpers',text:'Mira’s helpers found Pikachu because you marked its location. Pikachu stays in Moonwood with them.'};
 if(state.scene==='tower'&&w.arrivalMode==='service')return {title:'A clue became a safe path',text:'The route you learned let your whole party use the sheltered service passage.'};
 if(state.scene==='listen'&&w.usedItems.includes('shinxScarf'))return {title:'The scarf is home',text:'Shinx is wearing the scarf you found. It is no longer in your bag.'};
 return null;
}
export function endingMemories(state:State){
 if(!state.world)return legacy.endingMemories(state);
 const important=state.history.filter((h,i)=>i===0||h.scene==='square'||h.scene==='island'||h.scene==='listen'||h.scene==='plan'||i===state.history.length-1);
 return important.map(h=>({scene:h.scene,title:byId[h.scene].title,choice:h.choice,effect:edition.choiceResponse(state,h.choiceId||'')||h.choice}));
}
export const replayInvitation=(state:State)=>state.world?'Try a different starter: vines, careful warmth, and water each solve the observatory in a different way.':legacy.replayInvitation(state);
export function historicalState(game:State,index:number):State{
 const h=game.history[index];if(!h)return game;
 return {...game,scene:h.scene,world:h.world?structuredClone(h.world):undefined,flags:[...h.flags||[]],companions:[...h.companions||[]],puzzles:{},history:game.history.slice(0,index)};
}

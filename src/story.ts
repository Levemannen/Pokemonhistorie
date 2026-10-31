import * as v3 from './edition3';
import * as legacy from './legacyStory';
import * as edition from './edition';
import type {State,Choice,Scene,Starter} from './legacyStory';
import {editionConversation} from './editionDialogue';
export type {State,Choice,Scene,Starter,HistoryEntry,Dialogue,Memory} from './legacyStory';
export {artAliases,illustrationScene,qualities,vocabulary} from './legacyStory';
export const scenes=[...edition.scenes,...v3.scenes],byId={...edition.byId,...v3.byId},chapters=edition.chapters;
export const endingKey=v3.endingKey;
export const initial=v3.initial;
export const available=(state:State)=>v3.isV3(state)?v3.available(state):state.world?edition.available(state):legacy.available(state);
export const advance=(state:State,choice:Choice)=>v3.isV3(state)?v3.advance(state,choice):state.world?edition.advance(state,choice):legacy.advance(state,choice);
export const storyText=(scene:Scene,state:State)=>v3.isV3(state)?v3.storyText(state):state.world?edition.storyText(state):legacy.storyText(legacy.byId[scene.id],state);
export const sceneTitle=(state:State)=>v3.isV3(state)?v3.title(state):state.world?byId[state.scene].title:legacy.sceneTitle(state);
export const choiceText=(choice:Choice,starter:Starter)=>choice.id?choice.label:legacy.choiceText(choice,starter);
export function historyChoiceText(scene:string,label:string,starter:Starter,id?:string){return id&&v3.choicesById[id]?v3.choicesById[id].label:id&&edition.choicesById[id]?edition.choicesById[id].label:byId[scene]?.choices.some(c=>c.label===label)?label:legacy.historyChoiceText(scene,label,starter);}
export function hasNeed(state:State,need:string):boolean{
 if(v3.isV3(state))return v3.condition(state,need);
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
 return editionConversation(state);
}
export function consequence(state:State){
 if(v3.isV3(state))return null;
 if(!state.world)return legacy.consequence(state);
 const w=state.world;
 if(state.scene==='clearing'&&w.flags.pikachu==='left')return {title:'Your signal reached the helpers',text:'Mira’s helpers found Pikachu because you marked its location. Pikachu stays in Moonwood with them.'};
 if(state.scene==='tower'&&w.arrivalMode==='service')return {title:'A clue became a safe path',text:'The route you learned let your whole party use the sheltered service passage.'};
 if(state.scene==='listen'&&w.usedItems.includes('shinxScarf'))return {title:'The scarf is home',text:'Shinx is wearing the scarf you found. It is no longer in your bag.'};
 return null;
}
export function endingMemories(state:State){
 if(v3.isV3(state))return state.history.filter((h,i)=>['S01','S07','S11','S18','S22','S24'].includes(h.scene)&&!state.history.slice(i+1).some(later=>later.scene===h.scene)).map(h=>({scene:h.scene,title:byId[h.scene].title,choice:h.choice,effect:h.choice}));
 if(!state.world)return legacy.endingMemories(state);
 const important=state.history.filter((h,i)=>i===0||h.scene==='square'||h.scene==='island'||h.scene==='listen'||h.scene==='plan'||i===state.history.length-1);
 return important.map(h=>{const index=state.history.indexOf(h);const after=index+1<state.history.length?historicalState(state,index+1):state;return {scene:h.scene,title:byId[h.scene].title,choice:historyChoiceText(h.scene,h.choice,state.starter,h.choiceId),effect:edition.choiceResponse(after,h.choiceId||'')||h.choice};});
}
export const replayInvitation=(state:State)=>state.world?'Try a different starter: vines, careful warmth, and water each solve the observatory in a different way.':legacy.replayInvitation(state);
export function historicalState(game:State,index:number):State{
 const h=game.history[index];if(!h)return game;
 return {...game,scene:h.scene,world:h.world?structuredClone(h.world):undefined,flags:[...h.flags||[]],companions:[...h.companions||[]],puzzles:{},history:game.history.slice(0,index)};
}

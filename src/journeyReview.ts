import {translate} from './i18n';
import {byId,historicalState,storyText,historyChoiceText,type State} from './story';

/** Historic flags are snapshots taken before the choice, so future knowledge stays behind. */
export function branchAt(game:State,index:number):State|null{
 const entry=game.history[index];if(!entry||!entry.flags||!entry.companions)return null;
 return {...historicalState(game,index),journeyId:globalThis.crypto?.randomUUID?.()||`branch-${Date.now()}`};
}
export function journeyText(game:State):string{
 const lines=['Pokémon – The Mystery of the Lost Starlight',`An adventure with ${game.starter}`,''];
 for(let i=0;i<game.history.length;i++){
  const h=game.history[i],snapshot=branchAt(game,i);
  lines.push(byId[h.scene].title,snapshot?storyText(byId[h.scene],snapshot):'[This older save has no state snapshot; its exact page text cannot be reconstructed.]',`You chose: ${historyChoiceText(h.scene,h.choice,game.starter)}`,'');
 }
 lines.push(byId[game.scene].title,storyText(byId[game.scene],game));return lines.join('\n\n');
}
export function downloadJourney(game:State){
 const url=URL.createObjectURL(new Blob([translate(journeyText(game))],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`starlight-${game.starter}-${game.scene}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

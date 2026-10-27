import {translate} from './i18n';
import {byId,initial,storyText,historyChoiceText,type State} from './story';

/** Historic flags are snapshots taken before the choice, so future knowledge stays behind. */
export function branchAt(game:State,index:number):State|null{
 const entry=game.history[index];if(!entry||!entry.flags||!entry.companions)return null;
 return {...initial(game.starter),scene:entry.scene,language:game.language,flags:[...entry.flags],companions:[...entry.companions],history:game.history.slice(0,index).map(h=>({...h,flags:h.flags&&[...h.flags],companions:h.companions&&[...h.companions]})),journeyId:globalThis.crypto?.randomUUID?.()||`branch-${Date.now()}`};
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

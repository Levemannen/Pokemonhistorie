import {byId,sceneTitle,storyText,type State} from './story';
export function HistoryJournal({game}:{game:State|null}){
 if(!game?.history.length)return <p className="tool-empty">Your first page is still waiting.</p>;
 return <><p className="tool-intro">Your choices are part of the story. This journal keeps them safe.</p><ol className="history-list">{game.history.map((entry,i)=>{
  const snapshot={...game,scene:entry.scene,flags:entry.flags||[],companions:entry.companions||[],history:game.history.slice(0,i)};
  return <li key={i}><small>CHAPTER {byId[entry.scene].chapter}</small><h3>{sceneTitle(snapshot)}</h3><p>{storyText(byId[entry.scene],snapshot)}</p><strong>↗ {entry.choice}</strong></li>;
 })}</ol></>;
}

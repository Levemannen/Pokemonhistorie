import {byId,sceneTitle,historicalState,type State} from './story';
export type Visit={id:string;order:number;chapter:number;title:string;current:boolean;choice?:string;snapshot:State};
export function journeyVisits(game:State):Visit[]{
 const entries:Visit[]=game.history.map((entry,i)=>{
  const snapshot=historicalState(game,i);
  return {id:entry.scene,order:i+1,chapter:byId[entry.scene].chapter,title:sceneTitle(snapshot),current:false,choice:entry.choice,snapshot};
 });
 entries.push({id:game.scene,order:entries.length+1,chapter:byId[game.scene].chapter,title:sceneTitle(game),current:true,snapshot:game});
 return entries;
}

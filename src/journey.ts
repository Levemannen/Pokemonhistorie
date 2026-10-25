import {byId,sceneTitle,type State} from './story';
export type Visit={id:string;order:number;chapter:number;title:string;current:boolean;choice?:string;snapshot:State};
export function journeyVisits(game:State):Visit[]{
 const entries:Visit[]=game.history.map((entry,i)=>{
  const snapshot:State={...game,scene:entry.scene,flags:entry.flags||[],companions:entry.companions||[],history:game.history.slice(0,i)};
  return {id:entry.scene,order:i+1,chapter:byId[entry.scene].chapter,title:sceneTitle(snapshot),current:false,choice:entry.choice,snapshot};
 });
 entries.push({id:game.scene,order:entries.length+1,chapter:byId[game.scene].chapter,title:sceneTitle(game),current:true,snapshot:game});
 return entries;
}

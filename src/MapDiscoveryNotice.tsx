import {useEffect,useState} from 'react';
import {authoredText,getLanguage} from './i18n';
import {hasMiraMap,mapCopy,mapState} from './miraMapData';
import type {State} from './story';

export function MapDiscoveryNotice({game,onChange}:{game:State;onChange:(s:State)=>void}){
 const [notice,setNotice]=useState('');
 const position=game.scene+':'+game.history.length;
 useEffect(()=>{
  if(!hasMiraMap(game))return;
  const unseen=mapState(game).markers.filter(m=>!game.flags.includes('map-seen:'+m.id));
  if(!unseen.length)return;
  setNotice(position);
  onChange({...game,flags:[...game.flags,...unseen.map(m=>'map-seen:'+m.id)]});
 },[game,onChange,position]);
 return notice===position?<p className="map-notice" role="status">{authoredText(mapCopy.newMark[getLanguage()])}</p>:null;
}

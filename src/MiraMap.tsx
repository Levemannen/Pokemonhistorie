import {useState} from 'react';
import {authoredText,getLanguage} from './i18n';
import {hasMiraMap,mapCopy,mapPlaces,mapState} from './miraMapData';
import type {State} from './story';
import {byId,storyText} from './story';
import {journeyVisits} from './journey';
import './mira-map.css';

export function MiraMap({game}:{game:State|null}){
 const [selection,setSelection]=useState('');
 const language=getLanguage();
 const local=(value:{en:string;nb:string})=>authoredText(value[language]);
 if(!game||!hasMiraMap(game))return <p>{local(mapCopy.empty)}</p>;
 const state=mapState(game);
 const selected=state.markers.find(m=>m.id===selection)||state.places.find(p=>p.id===selection);
 const place=state.places.find(p=>p.id===selection);
 const memory=place?journeyVisits(game).filter(v=>place.scenes.includes(v.id)).at(-1):undefined;
 return <div className="mira-map">
  <p>{local(mapCopy.explanation)}</p>
  <div className="field-map">
   <img className="field-sheet" src={import.meta.env.BASE_URL+'images/scenes/painted/miras-field-map.jpg'} alt={language==='nb'?'Miras sammenbrettede papirkart. En firkant med fjellet og tårnet er lagt tilbake. En stiplet sti går fra landsbyen gjennom skogen. Ved elven er en ødelagt bro, et vannhjul og en kabelkurv tegnet inn.':'Mira’s folded paper map. A square showing the mountain and tower has been fitted back into place. A dotted trail leads from the village through the woods. A broken bridge, a waterwheel and a cable basket are drawn by the river.'}/>
   {state.places.map(p=><button key={p.id} className="field-pin" style={{left:p.x+'%',top:p.y+'%'}} aria-current={p.id===state.current?'location':undefined} aria-pressed={p.id===selection} aria-label={local(p)} title={local(p)} onClick={()=>setSelection(p.id)}><i>{mapPlaces.indexOf(p)+1}</i></button>)}
  </div>
  <h3 className="field-heading">{language==='nb'?'Miras stedsregister':'Mira’s place index'}</h3>
  <div className="field-index">{state.places.map(p=><button key={p.id} aria-pressed={selection===p.id} onClick={()=>setSelection(p.id)}><i>{mapPlaces.indexOf(p)+1}</i>{local(p)}</button>)}</div>
  {state.markers.length>0 && <><h3 className="field-heading">{language==='nb'?'Notater langs stien':'Notes from the trail'}</h3>
  <div className="field-notes">{state.markers.map(m=><button key={m.id} data-map-marker={m.id} aria-pressed={selection===m.id} onClick={()=>setSelection(m.id)}><i>{mapPlaces.findIndex(p=>p.id===m.place)+1}</i>{local(m)}</button>)}</div></>}
  <div className="mira-map-detail" role="status">{selected?local(selected):local(mapCopy.legend)}</div>
  {memory&&<section className="mira-place-memory" aria-label={local(place!)}><h3>{memory.title}</h3>{storyText(byId[memory.id],memory.snapshot).split('\n\n').map((text,i)=><p key={i}>{text}</p>)}</section>}
 </div>;
}

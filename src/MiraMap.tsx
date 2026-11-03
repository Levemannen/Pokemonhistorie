import copy from './map-copy-v31.json';
import {available,fact,type V3Choice} from './edition3';
import {useState} from 'react';
import {authoredText,getLanguage} from './i18n';
import {hasMiraMap,mapCopy,mapPlaces,mapState} from './miraMapData';
import type {State} from './story';
import {byId,storyText} from './story';
import {journeyVisits} from './journey';
import './mira-map.css';

const rescueAtPlace:Record<string,string>={village:'rescue_square',pikachu:'rescued_pikachu',nest:'hoothoot_nest',bridge:'bridge_repaired',workshop:'helped_psyduck',cove:'rescued_lapras',altaria:'helped_altaria'};
export function MiraMap({game,onChoose}:{game:State|null;onChoose?:(c:V3Choice)=>void}){
 const [selection,setSelection]=useState('');
 const language=getLanguage();
 const local=(value:{en:string;nb:string})=>authoredText(value[language]);
 if(!game||!hasMiraMap(game))return <p>{local(mapCopy.empty)}</p>;
 const state=mapState(game);
 const moon=['moon_sig_1','moon_sig_2','moon_sig_3'].some(f=>fact(game,f));
 const sun=['rescued_pikachu','rescued_lapras','helped_psyduck','helped_altaria','bridge_repaired'].filter(f=>fact(game,f)).length>=2;
 const selected=state.markers.find(m=>m.id===selection)||state.places.find(p=>p.id===selection);
 const place=state.places.find(p=>p.id===selection);
 const routes=onChoose && game.scene==="Q_RETURN" && !game.pendingResult ? available(game) : [];
 const back=routes.find(c=>c.id==="Q_RETURN.16");
 const visits=place?journeyVisits(game).filter(v=>place.scenes.includes(v.id) && !(game.pendingResult && v.current)):[];
 const memories=[...new Map(visits.map(v=>[v.id,v])).values()];
 return <div className="mira-map">
  <p>{local(mapCopy.explanation)}</p>
  <div className="field-map">
   <img className="field-sheet" src={import.meta.env.BASE_URL+'images/scenes/painted/miras-field-map.jpg'} alt={language==='nb'?'Miras sammenbrettede papirkart. En firkant med fjellet og tårnet er lagt tilbake. En stiplet sti går fra landsbyen gjennom skogen. Ved elven er en ødelagt bro, et vannhjul og en kabelkurv tegnet inn.':'Mira’s folded paper map. A square showing the mountain and tower has been fitted back into place. A dotted trail leads from the village through the woods. A broken bridge, a waterwheel and a cable basket are drawn by the river.'}/>
   <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} fill="none" stroke="#873d2b" strokeWidth=".32" strokeLinecap="round" strokeDasharray=".65 1">
    {state.markers.some(m=>m.id==='marked_altaria_path')&&<path d="M79 51 Q75 51 75 44 T69 35"/>}
    {state.markers.some(m=>m.id==='practical_letter')&&<path d="M87 35 Q78 32 75 26 T88 18"/>}
   </svg>
   {state.places.map(p=><button key={p.id} className="field-pin" style={{left:p.x+'%',top:p.y+'%'}} aria-current={p.id===state.current?'location':undefined} aria-pressed={p.id===selection} aria-label={local(p)} title={local(p)} onClick={()=>setSelection(p.id)}><i>{mapPlaces.indexOf(p)+1}</i></button>)}
  </div>
  <h3 className="field-heading">{language==='nb'?'Miras stedsregister':'Mira’s place index'}</h3>
  <div className="field-index">{state.places.map(p=><button key={p.id} aria-pressed={selection===p.id} onClick={()=>setSelection(p.id)}><i>{mapPlaces.indexOf(p)+1}</i>{local(p)}</button>)}</div>
  {state.markers.length>0 && <><h3 className="field-heading">{language==='nb'?'Notater langs stien':'Notes from the trail'}</h3>
  <div className="field-notes">{state.markers.map(m=><button key={m.id} data-map-marker={m.id} aria-pressed={selection===m.id} onClick={()=>setSelection(m.id)}><i>{mapPlaces.findIndex(p=>p.id===m.place)+1}</i>{local(m)}</button>)}</div></>}
  <div className="mira-map-detail" role="status">{selected?local(selected):local(mapCopy.legend)}{place && <> · {local(rescueAtPlace[place.id] ? fact(game,rescueAtPlace[place.id]) ? copy["Fullført redning"] : copy["Uferdig oppdrag"] : copy["Oppdaget sted"])}</>}</div>
  {moon && <p>{local(copy.Månehint)}</p>}{sun && <p>{local(copy.Solhint)}</p>}{fact(game,"secret_star_map") && <p>{local(copy["Stjernekart tilbakemelding"])} {local(copy["Kombinert hint"])}</p>}
  {state.seedHome&&<p className="mira-map-detail">{language==='nb'?'Sølvfrøets voksested: ':'Where the silver seed grows: '}{state.seedHome[language==='nb'?1:0]}</p>}
  {routes.length>0 && <div className="field-index">{place && routes.filter(c=>place.scenes.includes(c.to)).map(c=><button key={c.id} data-map-choice={c.id} onClick={()=>onChoose?.(c)}>{language==="nb"?c.nb:c.label}</button>)}{back && <button data-map-choice={back.id} onClick={()=>onChoose?.(back)}>{local(copy.Hovedhistorie)}</button>}</div>}
  {memories.length>0&&<section className="mira-place-memory" aria-label={local(place!)}><h3>{local(place!)}</h3>{memories.map(memory=><details key={memory.id} open={memories.length===1 || undefined}><summary>{memory.title}</summary>{storyText(byId[memory.id],memory.snapshot).split('\n\n').map((text,i)=><p key={i}>{text}</p>)}</details>)}</section>}
 </div>;
}

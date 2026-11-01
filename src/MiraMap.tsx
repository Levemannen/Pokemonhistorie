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
 const edges=[['village','library'],['library','forest'],['forest','pikachu'],['pikachu','nest'],['nest','camp'],['camp','bridge'],['bridge','workshop'],['workshop','letter'],['letter','island'],['island','altaria'],['altaria','cave'],['cave','tower'],['tower','archive']];
 return <div className="mira-map">
  <p>{local(mapCopy.explanation)}</p>
  <div className="mira-map-scroll" tabIndex={0} aria-label={local(mapCopy.title)}>
   <div className="mira-map-canvas">
    <svg viewBox="0 0 940 740" aria-hidden="true" focusable="false">
     <defs><pattern id="map-grain" width="19" height="17" patternUnits="userSpaceOnUse"><circle cx="3" cy="6" r=".7" fill="#816638" opacity=".13"/></pattern></defs>
     <rect width="940" height="740" rx="20" fill="#f1e5c5"/><rect width="940" height="740" fill="url(#map-grain)"/>
     <path d="M40 40Q400 70 900 35L905 700Q450 680 32 705Z" fill="none" stroke="#b99a60" strokeWidth="2"/>
     <path d="M365 30Q430 160 470 240T580 390Q650 460 580 515T530 645Q520 710 650 740" fill="none" stroke="#8eafb1" strokeWidth="33" opacity=".65"/>
     <path d="M365 30Q430 160 470 240T580 390Q650 460 580 515T530 645Q520 710 650 740" fill="none" stroke="#e8ead6" strokeWidth="3"/>
     <g fill="#dfd3b1" stroke="#a89269" strokeWidth="2"><path d="M455 230L540 50 610 195 660 35 750 230 815 90 900 230"/><path d="M540 50l-25 70 25-12 23 15M660 35l-28 78 30-22 25 20"/></g>
     <g fill="#90a082" stroke="#677d60" opacity=".5">{[190,240,330,370].flatMap((x,i)=>[350,400,530].map(y=><path key={x+'-'+y} d={`M${x} ${y}l18-44 18 44h-14v16h-8v-16z`}/>))}</g>
     <ellipse cx="635" cy="460" rx="60" ry="36" fill="#e9dcba" stroke="#a39269" strokeWidth="2"/>
     <g fill="#e5d5af" stroke="#816b45" strokeWidth="2" strokeLinejoin="round">
      {state.places.some(p=>p.id==='village')&&<g transform="translate(175 640)"><path d="M0 0v-35h24V0M30 8v-26h25V8M-36 8v-27h25V8"/><path d="M-5-35l17-18 17 18M25-18l18-15 17 15M-40-19l17-14 17 14" fill="#a98a65"/><path d="M10 0v-13h6V0M40 8v-12h6V8M-25 8v-12h6V8"/></g>}
      {state.places.some(p=>p.id==='library')&&<g transform="translate(130 420)"><path d="M0 0v-24h34V0zM-4-24l21-16 21 16Z"/><path d="M8-18v18M17-18v18M26-18v18"/></g>}
      {state.places.some(p=>p.id==='tower')&&<g transform="translate(725 100)"><path d="M0 0v-53h27V0zM-5-53l18-26 19 26Z"/><path d="M9 0v-18q5-8 10 0V0M10-44h8v10h-8z"/><path d="M13-79v-17l20 6-20 6" fill="#ac8252"/></g>}
      {state.places.some(p=>p.id==='bridge')&&<g transform="translate(520 620) rotate(-20)"><path d="M-30-8h60v16h-60z"/><path d="M-20-8V8M-10-8V8M0-8V8M10-8V8M20-8V8"/></g>}
      {state.places.some(p=>p.id==='cave')&&<path d="M585 285q-18-50 7-65q28 15 20 65z" fill="#b5a17b"/>}
     </g>
     <g stroke="#816b45" strokeWidth="3" strokeDasharray="3 8" strokeLinecap="round" fill="none">
      {edges.map(([a,b])=>{const start=state.places.find(p=>p.id===a),end=state.places.find(p=>p.id===b);return start&&end?<path key={a+b} d={`M${start.x} ${start.y}Q${start.x} ${end.y} ${end.x} ${end.y}`}/>:null;})}
      {state.markers.some(m=>m.id==='practical_letter')&&<path stroke="#387c92" d="M820 605Q915 170 665 100"/>}
     </g>
     <g transform="translate(115 100)" fill="none" stroke="#a38550"><circle r="32"/><path d="M0-48L9 0 0 48-9 0Z M-48 0L0 9 48 0 0-9Z"/><circle r="5" fill="#a38550"/></g>
    </svg>
    {mapPlaces.map(place=>{
     const known=state.places.some(p=>p.id===place.id),current=place.id===state.current;
     return <div key={place.id} className={`mira-place ${known?'':'mira-fog'}`} style={{left:place.x,top:place.y}}>
      <button className={current?'mira-current':''} aria-current={current?'location':undefined} aria-label={known?local(place):local(mapCopy.unknown)} onClick={()=>setSelection(known?place.id:'unknown')}>
       <span aria-hidden="true">{known?(current?'✦':'●'):'?'}</span>{known&&<strong>{local(place)}</strong>}
      </button>
      <div className="mira-marks">{state.markers.filter(m=>m.place===place.id).map(marker=><button key={marker.id} data-map-marker={marker.id} aria-label={local(marker)} aria-pressed={selection===marker.id} onClick={()=>setSelection(marker.id)}>{marker.symbol}</button>)}</div>
     </div>;
    })}
   </div>
  </div>
  <p className="mira-map-detail" role="status">{selected?local(selected):selection==='unknown'?local(mapCopy.unknown):local(mapCopy.legend)}</p>
  {memory&&<section className="mira-place-memory" aria-label={local(place!)}><h3>{memory.title}</h3>{storyText(byId[memory.id],memory.snapshot).split('\n\n').map((text,i)=><p key={i}>{text}</p>)}</section>}
 </div>;
}

import {baseWord,meanings,sentenceParts} from './words';
import {norwegianWords} from './norwegian';
export {baseWord,meanings,wordForms} from './words';
import {useEffect,useRef,useState,useId} from 'react';
export function ReadableText({text,speak,speechAvailable,onExplore,activeSentence=''}:{text:string;speak:(text:string)=>void;speechAvailable:boolean;onExplore?:(word:string)=>void;activeSentence?:string}){
 const [selected,setSelected]=useState<{word:string;index:string;left:number;top:number}|null>(null);const container=useRef<HTMLDivElement>(null);const anchor=useRef<HTMLButtonElement|null>(null);const popupId=useId();
 useEffect(()=>setSelected(null),[text]);
 useEffect(()=>{
  if(!selected)return;
  const close=(e:Event)=>{
   if(e.type==='keydown'&&(e as KeyboardEvent).key!=='Escape')return;
   if((e.type==='pointerdown'||e.type==='focusin'||e.type==='scroll')&&container.current?.contains(e.target as Node))return;
   setSelected(null);if(e.type==='keydown')anchor.current?.focus();
  };
  document.addEventListener('pointerdown',close);document.addEventListener('focusin',close);document.addEventListener('keydown',close);window.addEventListener('scroll',close,true);window.addEventListener('resize',close);
  return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('focusin',close);document.removeEventListener('keydown',close);window.removeEventListener('scroll',close,true);window.removeEventListener('resize',close);};
 },[selected]);
 return <div ref={container}>
  <p className="story-text" lang="en">{sentenceParts(text).map(sentence=><span key={sentence.start} className={activeSentence.trim()===sentence.text.trim()?'sentence-speaking':undefined}>{sentence.text.split(/(\b[A-Za-z]+\b)/).map((word,i)=>{
   const index=sentence.start+'-'+i;
   return meanings[baseWord(word)]?<button key={i} className="word" aria-expanded={selected?.index===index} aria-controls={selected?.index===index?popupId:undefined} aria-label={'Forklar '+word} onClick={e=>{
    const r=e.currentTarget.getBoundingClientRect();anchor.current=e.currentTarget;if(selected?.index!==index)onExplore?.(word);
    setSelected(selected?.index===index?null:{word,index,left:Math.max(12,Math.min(r.left-30,document.documentElement.clientWidth-304)),top:Math.max(12,Math.min(r.bottom+9,window.innerHeight-310))});
   }}>{word}</button>:word;
  })}</span>)}</p>
  <details className="sentence-help" key={text}><summary lang="nb">Lytt til én setning om gangen</summary><p lang="nb">Hør, les og prøv gjerne å si setningen selv. Du kan lytte flere ganger.</p>{sentenceParts(text).map((sentence,i)=><button key={sentence.start} disabled={!speechAvailable} className={activeSentence.trim()===sentence.text.trim()?'sentence-speaking':''} aria-label={'Hør setning '+(i+1)+': '+sentence.text} onClick={()=>speak(sentence.text)} lang="en">{sentence.text}</button>)}{!speechAvailable&&<p lang="nb">Denne nettleseren støtter ikke opplesning. Du kan fortsatt lese og bruke ordhjelpen.</p>}</details>
  {selected&&<div id={popupId} role="dialog" aria-label={'Forklaring: '+selected.word} className="word-popover" style={{left:selected.left,top:selected.top}}><button className="word-close" aria-label="Lukk ordforklaring" onClick={()=>{setSelected(null);anchor.current?.focus();}}>×</button><small lang="nb">ORDHJELP</small><strong lang="en">{selected.word}</strong><p className="norwegian-meaning" lang="nb">{norwegianWords[baseWord(selected.word)]}</p><p lang="en">{meanings[baseWord(selected.word)]}</p>{onExplore&&<small className="word-kept" lang="nb">Lagret i Mine ord</small>}<button className="pronounce" lang="nb" disabled={!speechAvailable} onClick={()=>speak(selected.word)}>Hør uttalen</button></div>}
 </div>;
}

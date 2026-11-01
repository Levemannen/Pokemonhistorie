import {useRef,useState} from 'react';
import {authoredText,getLanguage,t} from './i18n';
import {answerOptionalPuzzle,optionalPuzzleFor} from './optionalPuzzles';
import type {State} from './story';

function Passage({text}:{text:string}){
 return <div className="optional-passage">{text.split('\n\n').map((p,i)=><p key={i}>{p.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part,j)=>part.startsWith('**')?<strong key={j}>{part.slice(2,-2)}</strong>:part.startsWith('*')?<em key={j}>{part.slice(1,-1)}</em>:part)}</p>)}</div>;
}
export function OptionalPuzzle({game,onChange}:{game:State;onChange:(s:State)=>void}){
 const [open,setOpen]=useState(false),[answer,setAnswer]=useState<number|null>(null),[hints,setHints]=useState(0),[left,setLeft]=useState(false);
 const trigger=useRef<HTMLButtonElement>(null),body=useRef<HTMLElement>(null);
 const puzzle=optionalPuzzleFor(game);
 if(!puzzle)return null;
 const text=puzzle[getLanguage()],solved=game.world!.flags[puzzle.flag]==='true';
 const show=(s:string)=>authoredText(s);
 const returnLabel=getLanguage()==='nb'?'Tilbake til historien':'Back to the story';
 function close(){setOpen(false);setLeft(!solved);setAnswer(null);trigger.current?.focus();}
 return <section className="optional-puzzle" data-optional-puzzle={puzzle.scene}>
  <button ref={trigger} className="small-action" aria-expanded={open} onClick={()=>{if(open){close();return;}setOpen(true);setLeft(false);setAnswer(null);setHints(0);requestAnimationFrame(()=>body.current?.focus());}}>{show(text.button)}</button>
  {open&&<section ref={body} tabIndex={-1} aria-label={show(text.button)} onKeyDown={event=>{if(event.key==='Escape'){event.stopPropagation();close();}}}>
   <Passage text={show(solved?text.note:text.opening)}/>
   {!solved&&<div className="optional-answers">{text.answers.map((option,i)=><button key={i} data-optional-answer={i} onClick={()=>{setAnswer(i);if(option.correct)onChange(answerOptionalPuzzle(game,i));}}>{show(option.label)}</button>)}</div>}
   <div aria-live="polite" aria-atomic="true">
    {answer!==null&&<Passage text={show(text.answers[answer].response)}/>}
    {text.hints.slice(0,hints).map((hint,i)=><Passage key={i} text={show(hint)}/>)}
   </div>
   {!solved&&<button data-optional-hint className="small-action" disabled={hints===2} onClick={()=>setHints(n=>Math.min(2,n+1))}>{t('Hint')} {Math.min(2,hints+1)}</button>}
   <button className="small-action" onClick={close}>{show(returnLabel)}</button>
  </section>}
  {!open&&left&&<div role="status"><Passage text={show(text.leave)}/></div>}
 </section>;
}

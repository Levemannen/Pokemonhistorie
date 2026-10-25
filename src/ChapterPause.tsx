import {useState} from 'react';
import {chapterRecap} from './chapters';
import type {State} from './story';
export function ChapterPause({game,onContinue,speak,canSave=true,narrating=false,stopReading}:{game:State;onContinue:()=>void;speak:(text:string)=>void;canSave?:boolean;narrating?:boolean;stopReading?:()=>void}){
 const [resting,setResting]=useState(false);const recap=chapterRecap(game);
 return <section className="chapter-pause" aria-label="Chapter bookmark"><div className="page-label">CHAPTER {recap.completed} COMPLETE</div><h3>{resting?'A bookmark is waiting for you.':'A little pause for your traveling team.'}</h3><p>{resting?(canSave?'You can close the page and come back to this bookmark on the same device.':'Keep this page open while saving needs attention. Use Retry saving below before leaving.'):'Take a breath and remember the little lights you left behind.'}</p><ul>{recap.memories.map(line=><li key={line}>{line}</li>)}</ul><p className="carry-forward">✦ {recap.carry}</p><div className="chapter-pause-tools"><button className="small-action" onClick={()=>narrating?stopReading?.():speak([...recap.memories,recap.carry].join(' '))}>{narrating?'◼ Stop recap':'▷ Read my recap'}</button>{!resting&&<button className="small-action" onClick={()=>setResting(true)}>Pause here</button>}</div><button className="begin" onClick={onContinue}>{resting?'Resume':'Continue to'} chapter {recap.completed+1}<span>→</span></button><small>Next: {recap.next}. Your progress saves automatically on this device.</small></section>;
}


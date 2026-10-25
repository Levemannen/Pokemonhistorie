import {useState} from 'react';
import {available,choiceText,type State,type Choice} from './story';
import {choiceNorwegian} from './norwegian';
export function StoryChoices({game,onChoose,speak,speechAvailable}:{game:State;onChoose:(choice:Choice)=>void;speak:(text:string)=>void;speechAvailable:boolean}){
 const [help,setHelp]=useState<string|null>(null);
 return <div className="choices">{available(game).map(choice=>{
  const label=choiceText(choice,game.starter),open=help===choice.label,id=`choice-help-${game.scene}-${game.history.length}-${byChoiceIndex(game,choice)}`;
  return <div className="story-choice" key={choice.label}>
   <button className="choose-story" onClick={()=>onChoose(choice)}><span>{label}{choice.starter&&<small>{choice.starter}’s special path</small>}{choice.needs&&<small>{choice.needs.startsWith('puzzle:')?'You solved the puzzle together':choice.needs==='promiseTrail'||choice.needs==='keptPromise'?'Your river promise opened this path':choice.needs==='pikachuHelp'?'Pikachu remembers your kindness':choice.needs==='melodyHelp'?'You remember a song from your journey':'Something you learned makes this possible'}</small>}</span></button>
   <div className="choice-language-tools" lang="nb"><button aria-label={`Hør valget: ${label}`} disabled={!speechAvailable} onClick={()=>speak(label)}>Hør valget</button><button aria-expanded={open} aria-controls={id} onClick={()=>setHelp(open?null:choice.label)}>Norsk hjelp</button></div>
   <p id={id} hidden={!open} className="choice-translation" lang="nb">{choiceNorwegian(game.scene,choice,game.starter)}<small>Trykk på den engelske teksten når du vil velge.</small></p>
  </div>;
 })}</div>;
}
function byChoiceIndex(game:State,choice:Choice){return available(game).indexOf(choice);}

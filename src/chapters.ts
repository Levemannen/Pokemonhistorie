import {byId,chapters,type State} from './story';
export function pendingChapter(game:State):number|null{
 const chapter=byId[game.scene].chapter;
 if(byId[game.scene].ending||chapter===1||!game.acknowledgedChapters||game.acknowledgedChapters.includes(chapter))return null;
 return chapter;
}
export function continueChapter(game:State):State{
 const chapter=pendingChapter(game);return chapter?{...game,acknowledgedChapters:[...new Set([...game.acknowledgedChapters||[],chapter])]}:game;
}
export function chapterRecap(game:State):{completed:number;next:string;memories:string[];carry:string}{
 const next=byId[game.scene].chapter,completed=next-1,has=(f:string)=>game.flags.includes(f);
 const memories:string[]=[];
 if(completed===1){memories.push(`You and ${game.starter} followed a silver seed away from Willowbrook.`);if(has('nest'))memories.push('You stopped to repair a fallen nest.');else if(has('reply'))memories.push('You sent a hopeful reply down the river.');else if(game.companions.length)memories.push(`${game.companions[0]} chose to travel with you.`);else memories.push('Your first decisions began to shape the way you explore.');}
 if(completed===2){memories.push('Moonwood gave you the crescent lens.');memories.push(has('rope')?'You chose a rescue rope for the journey.':has('key')?'You chose a rune key to carry forward.':'You planted a thank-you seed instead of carrying a heavy tool.');if(has('forestGuard'))memories.push('Pikachu stayed to guard the forest, just as you asked.');else if(has('archiveMap')||has('echoTune'))memories.push('A detour through Gastly’s archive gave you a special discovery.');}
 if(completed===3){memories.push('The river showed you a memory of Lumi caring for an injured Shinx.');memories.push(has('promise')?'You promised to help both friends.':has('privacy')?'You chose to protect their private story.':'You kept a little golden stardust from the memory.');if(has('floatingLanterns'))memories.push('You and Psyduck left a lantern trail on the water.');else if(has('riverGuard'))memories.push('Lapras stayed to guide other travelers.');}
 if(completed===4){memories.push('Your team reached the door of Starfall Tower.');memories.push(has('keptPromise')?'Your river promise led you along the hidden stair.':has('flockGuide')?'Helping Altaria’s flock showed you a way above the clouds.':has('alignment')?'You and your starter repaired the observatory together.':has('spark')?'Pikachu helped you power the old observatory.':'You found a safe way through the mountain together.');if(has('returnedScarf'))memories.push('You returned the yellow scarf before entering.');}
 return {completed,next:chapters[next-1],memories,carry:has('promise')?'Your promise: help both Lumi and Shinx, and leave neither behind.':completed<3?'Your shared goal: discover where the lost starlight has gone.':'Your shared goal: bring back the light while caring for frightened friends.'};
}

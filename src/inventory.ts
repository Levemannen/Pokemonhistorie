import {byId,sceneTitle,type State} from './story';
export type BagItem={id:string;name:string;symbol:string;kind:'Tool'|'Clue'|'Keepsake';description:string;note:string;used:boolean;source:string;choice?:string};
function origin(game:State,flag:string,fallback:string){
 const entry=game.history.find(h=>byId[h.scene].choices.some(c=>c.flag===flag&&c.label.replace('{starter}',game.starter)===h.choice));
 return entry?{source:sceneTitle({...game,scene:entry.scene,flags:entry.flags||[]}),choice:entry.choice}:{source:fallback};
}
export function bagItems(game:State):BagItem[]{
 const has=(flag:string)=>game.flags.includes(flag),last=game.history.at(-1)?.choice||'';
 const items:BagItem[]=[{id:'seed',name:'Silver seed',symbol:'✦',kind:'Keepsake',description:'The little silver seed that began your adventure.',note:game.scene==='endGarden'?'Planted in the new starlight garden.':'A small reminder of the mystery you are following.',used:game.scene==='endGarden',source:'A night without stars'}];
 function add(flag:string,name:string,symbol:string,kind:BagItem['kind'],description:string,note:string,used=false,fallback='Your journey'){
  if(has(flag))items.push({id:flag,name,symbol,kind,description,note,used,...origin(game,flag,fallback)});
 }
 const gift=game.history.find(h=>h.scene==='clearing');
 if(gift)items.push({id:'lens',name:'Crescent lens',symbol:'☽',kind:'Tool',description:'The curved lens from Moonwood’s mossy pedestal.',note:has('alignment')?'You fitted it into the observatory’s mechanism.':game.history.some(h=>h.scene==='island')?'It helped you see the river’s memory.':'Its glass catches light that is otherwise hard to see.',used:has('alignment')||game.history.some(h=>h.scene==='island'),source:'A gift with two halves',choice:gift.choice});
 add('rope','Rescue rope','⌁','Tool','The rope you chose at the forest pedestal.',has('safeCrossing')?'Used to make a steady ferry knot.':'Ready when a safe crossing needs a strong knot.',has('safeCrossing'));
 add('key','Rune key','⚿','Tool','The stone key you chose at the forest pedestal.',has('secretRoute')?'Used to reveal a hidden tower route.':'Its carved marks may match a secret passage.',has('secretRoute'));
 add('map','Trail map','⌖','Clue','A map you borrowed or drew along your route.','A record of paths and patterns you took time to notice.');
 add('letter','Bottled message','✉','Clue','A note signed “L” asks for the dawn to return.','Kept safe after you found it in the river.');
 add('reply','Your river reply','✉','Keepsake','You sent a message saying, “We are coming.”',has('replyTrust')?'It reached Lumi and helped her trust you.':'Sent downriver, waiting to reach its reader.',has('replyTrust'));
 add('feather','Cloud feather','❧','Tool','The soft feather Altaria traded for a little food.',last.includes('feather')||has('cloudWarmth')?'Shared to bring gentle warmth to a frightened friend.':'Soft enough to make a little nest feel warm and safe.',last.includes('feather')||has('cloudWarmth'));
 add('scarf','Yellow scarf','≈','Keepsake','A scarf you found on the mountain trail.',has('returnedScarf')?'Returned to its owner at the tower.':'Kept safe until you can return it.',has('returnedScarf'));
 add('stardust','Golden stardust','✧','Clue','A golden speck from the river’s memory.','It holds a memory of warmth; examining it may help you understand the sphere.',has('inspected:stardust'));
 add('archiveMap','Archive route notes','⌖','Clue','A hidden mountain route copied from Gastly’s archive.',has('secretRoute')&&!has('key')?'Used to find a hidden way across the tower.':'An unusual discovery from the path you took through the hollow tree.',has('secretRoute')&&!has('key'));
 add('reedGuide','Quiet-channel map','≈','Clue','The gentle river route Psyduck helped you map.',has('secretRoute')&&!has('key')&&!has('archiveMap')?'Its old water passages revealed another tower route.':'Made for travelers who prefer a quieter crossing.',has('secretRoute')&&!has('key')&&!has('archiveMap'));
 add('secretStair','Hidden-stair sketch','⌖','Clue','A stairway copied from the astronomer’s notebook.',has('secretRoute')?'Your sketch helped reveal a safe passage through the tower.':'Your sketch may reveal a hidden route when you reach the roof.',has('secretRoute'));
 const melody=['song','nestGift','echoTune','duckRhythm'].find(has);
 if(melody||game.companions.includes('Hoothoot'))items.push({id:'melody',name:'Three-note melody',symbol:'♫',kind:'Clue',description:'A tune a friend shared during your journey.',note:has('songDoor')||last.includes('three-note')?'Your remembered melody opened a door or brought friends together.':'A melody you can carry without using any space in your pack.',used:has('songDoor')||last.includes('three-note'),...(melody?origin(game,melody,melody==='nestGift'?'A gift with two halves':'Your journey'):{source:'A message in the grass'})});
 return items;
}

export function examineItem(game:State,id:string):State{
 if(!bagItems(game).some(item=>item.id===id))return game;
 return {...game,flags:[...new Set([...game.flags,`inspected:${id}`])]};
}
export function itemDiscovery(game:State,id:string):string{
 const has=(f:string)=>game.flags.includes(f);
 const notes:Record<string,string>={
  seed:has('understanding')||has('puzzle:echoArchive')?'The astronomer’s diagram explains it: the seed can grow new light while the original stars go home.':'The seed warms your hand and points toward the tower; the tiny mark on its shell is a crescent.',
  lens:'The curved glass can hold a reflection even after you turn it away from the light.',
  stardust:has('understanding')||has('puzzle:echoArchive')?'Inside the lens, the speck matches the warm-light diagram: a little warmth can stay without trapping a star.':'The speck repeats a moment when Shinx felt safe; you need a diagram of the sphere to understand how to use that warmth.',
  map:'A crescent beside the river marks an old cave entrance; it matches the crescent carved on the tower.',
  letter:'The paper carries a crescent watermark and a sketch of a riverbank doorway, not just the letter L.',
  rope:'The rope is strong and supple; a padded loop will hold the ferry without cutting into the tree.',
  key:'Its crescent teeth fit a narrow tower lock; it opens a sheltered passage with a diagram inside.',
  scarf:has('returnedScarf')?'Shinx is wearing his own scarf again; this entry is a memory of returning it.':'Shinx’s name is stitched into the yellow wool; a second set of tiny stitches looks like Lumi’s careful work.',
  feather:'Tiny air pockets hold warmth inside the cloud feather, making a soft nest without a flame.'
 };
 return notes[id]||bagItems(game).find(item=>item.id===id)?.note||'';
}

import fs from 'node:fs';
let p='src/App.tsx',s=fs.readFileSync(p,'utf8');s="import {StoryExtras} from './StoryExtras';\nimport {branchAt,downloadJourney} from './journeyReview';\n"+s;
s=s.replace(" const [game,setGame]", " const [originalJourney,setOriginalJourney]=useState<State|null>(()=>restoreSave(stored('starlight-original-journey-v1')));\n const [game,setGame]");
s=s.replace(' function startAgain(){',` function forkJourney(index:number){
  if(!game||originalJourney)return;const next=branchAt(game,index);if(!next)return;
  try{localStorage.setItem('starlight-original-journey-v1',JSON.stringify(game));}catch{setSpeechMessage('Your original journey could not be saved, so it has not been changed.');return;}
  setOriginalJourney(game);closeDialog();move(next);
 }
 function returnToOriginal(){
  if(!originalJourney)return;
  try{localStorage.setItem(keys.game,JSON.stringify(originalJourney));localStorage.removeItem('starlight-original-journey-v1');}catch{setSpeechMessage('Your journey could not be restored yet. Please keep this tab open and try again.');return;}
  move(originalJourney);setOriginalJourney(null);
 }
 function startAgain(){`);
s=s.replace('   <div className="book-layout">', '   {originalJourney&&<p className="branch-notice" role="status">You are exploring another path. Your original adventure is safe. <button className="small-action" onClick={returnToOriginal}>Return to my original adventure</button></p>}\n   <div className="book-layout">');
s=s.replace("       {!scene!.ending&&<PuzzleCard", "       <StoryExtras key={game.scene} game={game} text={text} speak={speak}/>\n       {!scene!.ending&&<PuzzleCard");
s=s.replace('<HistoryJournal game={game}/>', '<HistoryJournal game={game} onBranch={originalJourney?undefined:forkJourney}/>');s=s.replace('<AdventureBag game={game}/>', '<AdventureBag game={game} onChange={setGame}/>');
s=s.replace('<FriendEpilogues game={game}/><p>Your journey:', '<FriendEpilogues game={game}/><button className="small-action" onClick={()=>downloadJourney(game)}>Download my finished story</button><p>Your journey:');
s=s.replace("{game.companions.length?game.companions.map(name=>", "{[...new Set([...game.companions,...visibleCompanions(game)])].length?[...new Set([...game.companions,...visibleCompanions(game)])].map(name=>");
s=s.replace("'Your friend on the river':'Traveling with you'", "'Your friend on the river':game.companions.includes(name)?'Traveling with you':'Visiting to help'");
fs.writeFileSync(p,s);
p='src/FriendEpilogues.tsx';s=fs.readFileSync(p,'utf8').replace("friend.travelled?'TRAVELED WITH YOU':'A FRIEND ALONG THE WAY'","friend.name==='Lapras'?'YOUR FRIEND ON THE RIVER':friend.travelled?'TRAVELED WITH YOU':'A FRIEND ALONG THE WAY'");fs.writeFileSync(p,s);

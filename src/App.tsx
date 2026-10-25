import {useEffect,useRef,useState} from 'react';
import {available,advance,byId,chapters,companionLine,initial,storyText,companionConversation,consequence,sceneTitle,visibleCompanions,illustrationScene,type State,type Starter} from './story';
import {ReadableText} from './ReadingTools';
import {PuzzleCard} from './PuzzleCard';
import {EndingMemories} from './EndingMemories';
import {restoreSave} from './save';
import {JourneyMap} from './JourneyMap';
import {FriendEpilogues} from './FriendEpilogues';
import {ReaderControls} from './ReaderControls';
import {ChapterPause} from './ChapterPause';
import {pendingChapter,continueChapter} from './chapters';
import {AdventureBag} from './AdventureBag';
import {HistoryJournal} from './HistoryJournal';
import {MyWords} from './MyWords';
import {Bookshelf} from './Bookshelf';
import {storageKeys as keys,parseBooks,parseLearnedWords,parseReader,archiveJourney,learnWord,type ReaderPreferences} from './collections';
import {SceneArtwork} from './SceneArtwork';
import {resolveIllustration,type IllustrationManifest} from './illustrations';
import './style.css';

type Manifest=IllustrationManifest;
type Panel='words'|'history'|'library'|'map'|'bag';
const titles:Record<Panel,string>={words:'My Words',history:'Your journey so far',library:'Your bookshelf',map:'Your travel map',bag:'Your adventure bag'};
const icons:Record<string,string>={Bulbasaur:'✿',Charmander:'♨',Squirtle:'◉',Pikachu:'ϟ',Eevee:'❧',Hoothoot:'◉',Lapras:'≈',Psyduck:'♧'};
const url=(path:string)=>import.meta.env.BASE_URL+path;
function stored(key:string){try{return localStorage.getItem(key);}catch{return null;}}
function journeyId(){return globalThis.crypto?.randomUUID?.()||`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;}
function loadGame(){const saved=restoreSave(stored(keys.game));return saved?{...saved,journeyId:saved.journeyId||journeyId()}:null;}
function loadEndings():string[]{try{const value=JSON.parse(stored(keys.endings)||'[]');return Array.isArray(value)?[...new Set(value.filter((id:unknown)=>typeof id==='string'&&byId[id]?.ending))] as string[]:[];}catch{return [];}}

export default function App(){
 const [game,setGame]=useState<State|null>(loadGame),[starter,setStarter]=useState<Starter>('Bulbasaur');
 const [manifest,setManifest]=useState<Manifest|null>(null),[artError,setArtError]=useState(false);
 const [panel,setPanel]=useState<Panel|null>(null),[restart,setRestart]=useState(false);
 const [books,setBooks]=useState(()=>parseBooks(stored(keys.books))),[words,setWords]=useState(()=>parseLearnedWords(stored(keys.words)));
 const [reader,setReader]=useState<ReaderPreferences>(()=>parseReader(stored(keys.reader))),[collected,setCollected]=useState(loadEndings);
 const [storageErrors,setStorageErrors]=useState<string[]>([]),[narrating,setNarrating]=useState(false),[speechMessage,setSpeechMessage]=useState('');
 const [pace,setPace]=useState(()=>{const value=Number(stored(keys.pace)||'.8');return [1,.8,.65].includes(value)?value:.8;});
 const heading=useRef<HTMLHeadingElement>(null),returnFocus=useRef<HTMLElement|null>(null),utterance=useRef<SpeechSynthesisUtterance|null>(null);
 const scene=game?byId[game.scene]:null,chapter=game?pendingChapter(game):null;
 const text=scene&&game?storyText(scene,game):'';

 function persist(key:string,value:unknown){
  try{localStorage.setItem(key,JSON.stringify(value));setStorageErrors(previous=>previous.includes(key)?previous.filter(item=>item!==key):previous);}
  catch{setStorageErrors(previous=>previous.includes(key)?previous:[...previous,key]);}
 }
 function stopSpeech(){utterance.current=null;window.speechSynthesis?.cancel();setNarrating(false);}
 function speak(content:string,rate=pace,reading=false){
  if(!('speechSynthesis'in window)){setSpeechMessage('Narration is unavailable here. Every page can still be read.');return;}
  stopSpeech();setSpeechMessage('');const speech=new SpeechSynthesisUtterance(content);utterance.current=speech;speech.lang='en-US';speech.rate=rate;
  const voice=window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('en')&&v.localService);if(voice)speech.voice=voice;
  speech.onend=()=>{if(utterance.current===speech){setNarrating(false);utterance.current=null;}};
  speech.onerror=event=>{if(utterance.current===speech){setNarrating(false);if(event.error!=='canceled'&&event.error!=='interrupted')setSpeechMessage('This device could not read aloud. You can keep reading or try again.');}};
  window.speechSynthesis.speak(speech);setNarrating(reading);
 }
 useEffect(()=>{fetch(url('images/illustration-manifest.json')).then(response=>{if(!response.ok)throw Error();return response.json();}).then(setManifest).catch(()=>setArtError(true));},[]);
 useEffect(()=>{
  if(game){persist(keys.game,game);if(byId[game.scene].ending){setBooks(previous=>archiveJourney(previous,game,new Date().toISOString()));setCollected(previous=>previous.includes(game.scene)?previous:[...previous,game.scene]);}}
  stopSpeech();
 },[game]);
 useEffect(()=>{persist(keys.books,books);setCollected(previous=>{const next=[...new Set([...previous,...books.map(book=>book.state.scene)])];return next.length===previous.length?previous:next;});},[books]);
 useEffect(()=>persist(keys.words,words),[words]);
 useEffect(()=>persist(keys.reader,reader),[reader]);
 useEffect(()=>persist(keys.endings,collected),[collected]);
 useEffect(()=>{try{localStorage.setItem(keys.pace,String(pace));}catch{setStorageErrors(previous=>previous.includes(keys.pace)?previous:[...previous,keys.pace]);}},[pace]);
 useEffect(()=>()=>window.speechSynthesis?.cancel(),[]);
 function openPanel(value:Panel){returnFocus.current=document.activeElement as HTMLElement;setPanel(value);}
 function openRestart(){returnFocus.current=document.activeElement as HTMLElement;setRestart(true);}
 function closeDialog(){stopSpeech();setPanel(null);setRestart(false);requestAnimationFrame(()=>{if(returnFocus.current?.isConnected)returnFocus.current.focus();else heading.current?.focus();});}
 useEffect(()=>{
  if(!panel&&!restart)return;stopSpeech();
  const trap=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){closeDialog();return;}
   if(event.key!=='Tab'||event.defaultPrevented)return;
   const dialog=document.querySelector('[role="dialog"][aria-modal="true"]');
   const nodes=Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]),select:not([disabled]),input:not([disabled]),summary,[href],[tabindex="0"]')||[]).filter(node=>node.getClientRects().length>0);
   if(!nodes.length)return;
   if(event.shiftKey&&document.activeElement===nodes[0]){event.preventDefault();nodes.at(-1)?.focus();}
   else if(!event.shiftKey&&document.activeElement===nodes.at(-1)){event.preventDefault();nodes[0].focus();}
  };
  document.addEventListener('keydown',trap);return()=>document.removeEventListener('keydown',trap);
 },[panel,restart]);
 function move(next:State){setGame(next);setTimeout(()=>{heading.current?.focus();heading.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});},30);}
 function startAgain(){
  if(game&&byId[game.scene].ending&&storageErrors.includes(keys.books))return;
  stopSpeech();try{localStorage.removeItem(keys.game);}catch{setStorageErrors(previous=>previous.includes(keys.game)?previous:[...previous,keys.game]);return;}
  setGame(null);setRestart(false);window.scrollTo({top:0});
 }
 function retrySaving(){if(game)persist(keys.game,game);persist(keys.books,books);persist(keys.words,words);persist(keys.reader,reader);persist(keys.endings,collected);try{localStorage.setItem(keys.pace,String(pace));setStorageErrors(previous=>previous.filter(key=>key!==keys.pace));}catch{/* The existing storage notice stays visible. */}}
 const imageFor=(id:string,who:Starter)=>url(resolveIllustration(manifest,{...initial(who),scene:id}).base);
 const renderArtwork=(snapshot:State,className='')=><SceneArtwork manifest={manifest} state={snapshot} imageUrl={url} className={className} onError={()=>setArtError(true)}/>;
 const displayScene=chapter&&game?.history.length?byId[game.history.at(-1)!.scene]:scene||byId.lantern;
 const displayStarter=game?.starter||starter;

 const callback=game?consequence(game):null,voices=game?companionConversation(game):[];
 const saveBlocked=Boolean(game&&scene?.ending&&storageErrors.includes(keys.books));

 return <div className={`app-shell${reader.readingMode?' reading-mode':''}`} data-text-size={reader.textSize}>
  <header inert={Boolean(panel||restart)}>
   <a className="brand" href="#" onClick={event=>{event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}}><span className="brand-star">✦</span><span>STARLIGHT STORIES<small>A Pokémon adventure</small></span></a>
   <nav aria-label="Story tools"><button aria-label="Your travel map" onClick={()=>openPanel('map')}><span>⌖</span><span className="nav-label">Map</span></button><button aria-label="Your journey" onClick={()=>openPanel('history')}><span>↶</span><span className="nav-label">Your journey</span></button><button aria-label={`Bookshelf: ${books.length} finished ${books.length===1?'book':'books'}, ${collected.length} of 6 endings`} onClick={()=>openPanel('library')}><span>▤</span><span className="nav-label">Bookshelf</span><b>{collected.length}/6</b></button></nav>
  </header>
  <main inert={Boolean(panel||restart)}>
   <div className="eyebrow"><span/>AN INTERACTIVE STORYBOOK<span/></div>
   <h1>Pokémon <span className="title-dash">—</span><br/>The Mystery of the <em>Lost Starlight</em></h1>
   <p className="subtitle">A little courage. A faithful friend. A sky waiting to shine again.</p>
   <ReaderControls preferences={reader} onChange={setReader} openBag={()=>openPanel('bag')} openWords={()=>openPanel('words')}/>
   <div className="book-layout"><div className="book-column">
    <div className="chapter-bar"><span className="chapter-dot">{chapter?'✦':game?scene!.chapter:'✦'}</span><span>{chapter?'A CHAPTER BOOKMARK':game?`CHAPTER ${scene!.chapter} OF 5`:'YOUR ADVENTURE AWAITS'}<strong>{game?chapters[scene!.chapter-1]:'Every great story begins with a friend.'}</strong></span><span className="page-count">{chapter?'A good place to pause':game?`${game.history.length+1} pages explored`:'5 chapters · 6 endings'}</span></div>
    <article className="storybook">
     <SceneArtwork manifest={manifest} state={game?{...game,scene:displayScene.id}:{...initial(displayStarter),scene:displayScene.id}} imageUrl={url} className="illustration" onError={()=>setArtError(true)}><div className="art-badge">✧ {chapter?'A little rest between adventures':scene?.ending?'A new ending to treasure':game?'The adventure is yours':'A world of wonder awaits'}</div></SceneArtwork>
     <div className="page-body">
      {!game?<>
       <div className="page-label">PROLOGUE · WILLOWBROOK</div><h2 ref={heading} tabIndex={-1}>The stars have gone missing.</h2><p className="story-text">The festival lanterns are glowing. The sky is strangely quiet. Somewhere beyond the forest, a secret is waiting — and you don’t have to find it alone.</p>
       <div className="choose-label">Choose your first companion<span>Who will walk beside you?</span></div><div className="starter-grid">{(['Bulbasaur','Charmander','Squirtle'] as Starter[]).map(name=><button key={name} aria-pressed={starter===name} className={`starter ${name.toLowerCase()} ${starter===name?'selected':''}`} onClick={()=>setStarter(name)}><span className="starter-icon">{icons[name]}</span><strong>{name}</strong><small>{name==='Bulbasaur'?'Gentle & resourceful':name==='Charmander'?'Warm & courageous':'Curious & dependable'}</small><span className="starter-type">{name==='Bulbasaur'?'GRASS · POISON':name==='Charmander'?'FIRE':'WATER'}</span></button>)}</div>
       <button className="begin" onClick={()=>move({...initial(starter),journeyId:journeyId(),acknowledgedChapters:[1]})}>Begin with {starter}<span>→</span></button><p className="local-note">No sign-up. No cost. Just you, your friend, and a little starlight.</p>
      </>:chapter?<><h2 ref={heading} tabIndex={-1}>A chapter bookmark</h2><ChapterPause key={chapter} game={game} canSave={storageErrors.length===0} narrating={narrating} stopReading={stopSpeech} onContinue={()=>move(continueChapter(game))} speak={content=>speak(content,pace,true)}/></>:<>
       <div className="reading-toolbar"><span className="page-label">{scene!.ending?'YOUR STORY’S ENDING':`CHAPTER ${scene!.chapter} · ${scene!.setting.toUpperCase()}`}</span><label className="pace-control">Reading pace<select aria-label="Reading pace" value={pace} onChange={event=>{setPace(Number(event.target.value));stopSpeech();}}><option value={1}>Normal</option><option value={.8}>Gentle</option><option value={.65}>Extra slow</option></select></label><button disabled={!('speechSynthesis'in window)} aria-pressed={narrating} onClick={()=>narrating?stopSpeech():speak(`${sceneTitle(game)}. ${text}`,pace,true)}>{narrating?'◼ Stop reading':'▷ Read to me'}</button></div>
       <h2 ref={heading} tabIndex={-1}>{sceneTitle(game)}</h2>{speechMessage&&<p className="speech-message" role="status">{speechMessage}</p>}
       <ReadableText text={text} speak={word=>speak(word,.65)} speechAvailable={'speechSynthesis'in window} onExplore={word=>setWords(previous=>learnWord(previous,word,game,new Date().toISOString()))}/>
       {callback&&<div className="consequence" role="note"><strong>✦ {callback.title}</strong><p>{callback.text}</p></div>}
       {!scene!.ending&&<PuzzleCard key={game.scene} game={game} onChange={setGame}/>}
       <section className="team-conversation" aria-label="Your companions are talking"><div className="page-label">AROUND YOUR LITTLE TEAM</div>{voices.map((line,i)=><p key={i}><strong>{line.speaker}</strong><span>{line.text}</span></p>)}</section>
       {scene!.ending?<div className="ending-card"><span>✦ ENDING DISCOVERED</span><h3>{scene!.ending}</h3><p>{companionLine(game)}</p><EndingMemories game={game} imageFor={imageFor} renderArtwork={renderArtwork}/><FriendEpilogues game={game}/><p>Your journey: {game.companions.length} new {game.companions.length===1?'friend':'friends'} · {game.history.length} decisions</p><button className="small-action" onClick={()=>openPanel('library')}>▤ Read your finished books</button><button className="begin" onClick={openRestart}>Discover another story<span>↻</span></button><button className="text-button" onClick={()=>openPanel('history')}>Read your journey again</button></div>:<><div className="choice-heading"><span>What will you do?</span><small>Every choice leaves a little light.</small></div><div className="choices">{available(game).map((choice,i)=><button key={choice.label} onClick={()=>move(advance(game,choice))}><span className="choice-number">{String(i+1).padStart(2,'0')}</span><span>{choice.label.replace('{starter}',game.starter)}{choice.starter&&<small>{choice.starter}’s special path</small>}{choice.needs&&<small>{choice.needs.startsWith('puzzle:')?'Unlocked by solving the puzzle':choice.needs==='promiseTrail'||choice.needs==='keptPromise'?'Unlocked by your river promise':choice.needs==='pikachuHelp'?'Unlocked by helping Pikachu':choice.needs==='melodyHelp'?'Unlocked by a melody from your journey':'Unlocked by your journey'}</small>}</span><span className="arrow">↗</span></button>)}</div></>}
      </>}
     </div>
    </article>
    <div className="under-book"><span>{storageErrors.length?'● Saving needs attention':game?'● Your adventure is saved on this device':'Made for curious hearts, ages 8–12'}</span><button onClick={()=>openPanel('words')}>Aa <span>My Words ({words.length})</span></button></div>
    {storageErrors.length>0&&<div className="storage-notice" role="status">This browser could not save some changes. Keep this tab open; your journey and collections are still here for now.<button onClick={retrySaving}>Retry saving</button></div>}
   </div><aside>
    <div className="side-card companion-card"><div className="side-eyebrow">YOUR TRAVELING FRIENDS</div><h3>A little team.<br/>A big adventure.</h3><div className={`companion-avatar ${displayStarter.toLowerCase()}`}>{icons[displayStarter]}</div><h4>{displayStarter}</h4><span className="friend-tag">{game?'YOUR FIRST COMPANION':'READY TO MEET YOU'}</span><p>{displayStarter==='Bulbasaur'?'A steady heart and a knack for helping things grow.':displayStarter==='Charmander'?'A warm heart and a light for even the darkest path.':'A curious heart and a clever way with water.'}</p>{game&&<><div className="friend-list">{game.companions.length?game.companions.map(name=><div key={name}><span>{icons[name]}</span><strong>{name}</strong><small>Traveling with you</small></div>):<span className="quiet">There’s room for new friends along the way.</span>}</div><p className="companion-dialogue">{companionLine(game)}</p></>}</div>
    <div className="side-card map-card"><div className="side-eyebrow">THE PATH AHEAD</div><ol>{chapters.map((title,i)=><li key={title} className={game&&scene!.chapter===i+1?'current':game&&scene!.chapter>i+1?'complete':''}><span>{game&&scene!.chapter>i+1?'✓':i+1}</span><div><small>CHAPTER {i+1}</small>{title}</div></li>)}</ol><button className="open-travel-map" onClick={()=>openPanel('map')}>⌖ Open your travel map</button></div><div className="tip"><span>✧</span><p>There’s no perfect path.<br/>Only the story <em>you</em> make.</p></div>{game&&<button className="restart" onClick={openRestart}>↻ Start a new adventure</button>}
   </aside></div>
   <footer><span>✦</span>A fan-made adventure, made with imagination.<small>Pokémon belongs to its respective owners. Artwork prepared locally · No images generated during play · No ads or tracking.</small>{artError&&<p role="status">An illustration could not load. Try refreshing this page.</p>}</footer>
  </main>
  {panel&&<div className="modal-backdrop" onClick={closeDialog}><section className={panel==='map'||panel==='library'?'modal map-modal':'modal'} role="dialog" aria-modal="true" aria-label={titles[panel]} onClick={event=>event.stopPropagation()}><button autoFocus className="close" onClick={closeDialog} aria-label="Close dialog">×</button><div className="page-label">YOUR STORYBOOK TOOLKIT</div><h2>{titles[panel]}</h2>{panel==='map'?<JourneyMap game={game}/>:panel==='history'?<HistoryJournal game={game}/>:panel==='bag'?<AdventureBag game={game}/>:panel==='words'?<MyWords words={words} speak={speak} speechAvailable={'speechSynthesis'in window}/>:<Bookshelf books={books} collected={collected} imageFor={imageFor} renderArtwork={renderArtwork}/>}</section></div>}
  {restart&&<div className="modal-backdrop"><section className="modal small-modal" role="dialog" aria-modal="true" aria-label="Start a new adventure"><h2>A fresh first page?</h2><p>This replaces your current journey. Your finished books, discovered endings, and personal word notebook stay in their collections.</p>{saveBlocked&&<p className="storage-notice">Your finished book could not be saved yet. Close this dialog and retry saving before beginning again.</p>}<button className="begin" disabled={saveBlocked} autoFocus onClick={startAgain}>Start again</button><button className="text-button" onClick={closeDialog}>Keep my adventure</button></section></div>}
 </div>;
}




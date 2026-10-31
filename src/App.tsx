import { t } from './i18n';
import {AppInstall} from './AppInstall';
import {chapters as legacyChapters} from './legacyStory';
import { translate, setLanguage, type Language } from './i18n';
import { StoryExtras } from './StoryExtras';
import { branchAt, downloadJourney } from './journeyReview';
import { useEffect, useRef, useState } from 'react';
import { advance, byId, endingKey, chapters, companionLine, initial, storyText, sceneTitle, visibleCompanions, illustrationScene, type State, type Starter } from './story';
import { ReadableText } from './ReadingTools';
import { StoryChoices } from './StoryChoices';
import { sentenceParts } from './words';
import { PuzzleCard } from './PuzzleCard';
import { EndingMemories } from './EndingMemories';
import { restoreSave } from './save';
import { JourneyMap } from './JourneyMap';
import { FriendEpilogues } from './FriendEpilogues';
import { ReaderControls } from './ReaderControls';
import { AdventureBag } from './AdventureBag';
import { HistoryJournal } from './HistoryJournal';
import { MyWords } from './MyWords';
import { Bookshelf } from './Bookshelf';
import { storageKeys as keys, parseBooks, parseLearnedWords, parseReader, archiveJourney, learnWord, type ReaderPreferences } from './collections';
import { SceneArtwork } from './SceneArtwork';
import { resolveIllustration, type IllustrationManifest } from './illustrations';
import './style.css';
import './storybook.css';
import './tablet.css';
type Manifest = IllustrationManifest;
type Panel = 'words' | 'history' | 'library' | 'map' | 'bag';
const titles: Record<Panel, string> = { words: 'My Words', history: 'Your journey so far', library: 'Your bookshelf', map: 'Your travel map', bag: 'Your adventure bag' };
const icons: Record<string, string> = { Bulbasaur: '✿', Charmander: '♨', Squirtle: '◉', Pikachu: 'ϟ', Eevee: '❧', Hoothoot: '◉', Lapras: '≈', Psyduck: '♧' };
const url = (path: string) => import.meta.env.BASE_URL + path;
function stored(key: string) {
    try {
        return localStorage.getItem(key);
    }
    catch {
        return null;
    }
}
function journeyId() { return globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; }
function loadGame() { const saved = restoreSave(stored(keys.game)); return saved ? { ...saved, journeyId: saved.journeyId || journeyId() } : null; }
function loadEndings(): string[] {
    try {
        const value = JSON.parse(stored(keys.endings) || '[]');
        return Array.isArray(value) ? [...new Set(value.filter((id: unknown) => typeof id === 'string' && byId[id]?.ending))] as string[] : [];
    }
    catch {
        return [];
    }
}
export default function App() {
    const [language, setLocale] = useState<Language>(() => { const value = restoreSave(stored(keys.game))?.language || (stored('starlight-language') === 'nb' ? 'nb' : 'en'); setLanguage(value); return value; });
    setLanguage(language);
    useEffect(() => { document.documentElement.lang = language; }, [language]);
    const [originalJourney, setOriginalJourney] = useState<State | null>(() => restoreSave(stored('starlight-original-journey-v1')));
    const [game, setGame] = useState<State | null>(loadGame), [starter, setStarter] = useState<Starter>('Bulbasaur');
    const [manifest, setManifest] = useState<Manifest | null>(null), [artError, setArtError] = useState(false);
    const [panel, setPanel] = useState<Panel | null>(null), [restart, setRestart] = useState(false);
    const [books, setBooks] = useState(() => parseBooks(stored(keys.books))), [words, setWords] = useState(() => parseLearnedWords(stored(keys.words)));
    const [reader, setReader] = useState<ReaderPreferences>(() => parseReader(stored(keys.reader))), [collected, setCollected] = useState(loadEndings);
    const [storageErrors, setStorageErrors] = useState<string[]>([]), [narrating, setNarrating] = useState(false), [speechMessage, setSpeechMessage] = useState(''), [activeSentence, setActiveSentence] = useState('');
    const [pace, setPace] = useState(() => { const value = Number(stored(keys.pace) || '.8'); return [1, .8, .65].includes(value) ? value : .8; });
    const heading = useRef<HTMLHeadingElement>(null), returnFocus = useRef<HTMLElement | null>(null), utterance = useRef<SpeechSynthesisUtterance | null>(null);
    const chapterTitles=game&&!game.world?legacyChapters:chapters;
    const scene = game ? byId[game.scene] : null;
    const text = scene && game ? game.world?storyText(scene,game):translate(storyText(scene, game), language) : '';
    function changeLanguage(next: Language) { stopSpeech(); setLanguage(next); setLocale(next); try {
        localStorage.setItem('starlight-language', next);
    }
    catch {
        setSpeechMessage('This device could not save your language preference.');
    } if (game)
        setGame({ ...game, language: next }); }
    function persist(key: string, value: unknown) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setStorageErrors(previous => previous.includes(key) ? previous.filter(item => item !== key) : previous);
        }
        catch {
            setStorageErrors(previous => previous.includes(key) ? previous : [...previous, key]);
        }
    }
    function stopSpeech() { setActiveSentence(''); utterance.current = null; window.speechSynthesis?.cancel(); setNarrating(false); }
    function speak(content: string, rate = pace, reading = false, spokenLanguage: Language = language) {
        content = translate(content, spokenLanguage);
        if (!('speechSynthesis' in window)) {
            setSpeechMessage('Narration is unavailable here. Every page can still be read.');
            return;
        }
        stopSpeech();
        setSpeechMessage('');
        const speech = new SpeechSynthesisUtterance(content);
        utterance.current = speech;
        speech.lang = spokenLanguage === 'nb' ? 'nb-NO' : 'en-US';
        speech.rate = rate;
        const voice = window.speechSynthesis.getVoices().find(v => (spokenLanguage === 'nb' ? /^(nb|no|nn)(-|$)/i.test(v.lang) : v.lang.startsWith('en')) && v.localService);
        if (voice)
            speech.voice = voice;
        const parts = sentenceParts(content);
        speech.onstart = () => {
            if (utterance.current === speech && parts.length === 1)
                setActiveSentence(parts[0].text);
        };
        speech.onboundary = event => {
            if (utterance.current === speech) {
                const part = parts.find(s => event.charIndex >= s.start && event.charIndex < s.start + s.text.length);
                if (part)
                    setActiveSentence(part.text);
            }
        };
        speech.onend = () => {
            if (utterance.current === speech) {
                setActiveSentence('');
                setNarrating(false);
                utterance.current = null;
            }
        };
        speech.onerror = event => {
            if (utterance.current === speech) {
                setActiveSentence('');
                setNarrating(false);
                if (event.error !== 'canceled' && event.error !== 'interrupted')
                    setSpeechMessage('This device could not read aloud. You can keep reading or try again.');
            }
        };
        window.speechSynthesis.speak(speech);
        setNarrating(reading || Boolean(content));
    }
    useEffect(() => {
        fetch(url('images/illustration-manifest.json')).then(response => {
            if (!response.ok)
                throw Error();
            return response.json();
        }).then(setManifest).catch(() => setArtError(true));
    }, []);
    useEffect(() => {
        if (game) {
            persist(keys.game, game);
            if (byId[game.scene].ending) {
                setBooks(previous => archiveJourney(previous, game, new Date().toISOString()));
                setCollected(previous => previous.includes(endingKey(game)) ? previous : [...previous, endingKey(game)]);
            }
        }
        stopSpeech();
    }, [game]);
    useEffect(() => { persist(keys.books, books); setCollected(previous => { const next = [...new Set([...previous, ...books.map(book => endingKey(book.state))])]; return next.length === previous.length ? previous : next; }); }, [books]);
    useEffect(() => persist(keys.words, words), [words]);
    useEffect(() => persist(keys.reader, reader), [reader]);
    useEffect(() => persist(keys.endings, collected), [collected]);
    useEffect(() => {
        try {
            localStorage.setItem(keys.pace, String(pace));
        }
        catch {
            setStorageErrors(previous => previous.includes(keys.pace) ? previous : [...previous, keys.pace]);
        }
    }, [pace]);
    useEffect(() => () => window.speechSynthesis?.cancel(), []);
    function openPanel(value: Panel) { returnFocus.current = document.activeElement as HTMLElement; setPanel(value); }
    function openRestart() { returnFocus.current = document.activeElement as HTMLElement; setRestart(true); }
    function closeDialog() {
        stopSpeech();
        setPanel(null);
        setRestart(false);
        requestAnimationFrame(() => {
            if (returnFocus.current?.isConnected)
                returnFocus.current.focus();
            else
                heading.current?.focus();
        });
    }
    useEffect(() => {
        if (!panel && !restart)
            return;
        stopSpeech();
        const trap = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeDialog();
                return;
            }
            if (event.key !== 'Tab' || event.defaultPrevented)
                return;
            const dialog = document.querySelector('[role="dialog"][aria-modal="true"]');
            const nodes = Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]),select:not([disabled]),input:not([disabled]),summary,[href],[tabindex="0"]') || []).filter(node => node.getClientRects().length > 0);
            if (!nodes.length)
                return;
            if (event.shiftKey && document.activeElement === nodes[0]) {
                event.preventDefault();
                nodes.at(-1)?.focus();
            }
            else if (!event.shiftKey && document.activeElement === nodes.at(-1)) {
                event.preventDefault();
                nodes[0].focus();
            }
        };
        document.addEventListener('keydown', trap);
        return () => document.removeEventListener('keydown', trap);
    }, [panel, restart]);
    function move(next: State) { setGame({...next,language}); setTimeout(() => { heading.current?.focus(); heading.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }); }, 30); }
    function forkJourney(index: number) {
        if (!game || originalJourney)
            return;
        const next = branchAt(game, index);
        if (!next)
            return;
        try {
            localStorage.setItem('starlight-original-journey-v1', JSON.stringify(game));
        }
        catch {
            setSpeechMessage('Your original journey could not be saved, so it has not been changed.');
            return;
        }
        setOriginalJourney(game);
        closeDialog();
        move(next);
    }
    function returnToOriginal() {
        if (!originalJourney)
            return;
        try {
            localStorage.setItem(keys.game, JSON.stringify({...originalJourney,language}));
            localStorage.removeItem('starlight-original-journey-v1');
        }
        catch {
            setSpeechMessage('Your journey could not be restored yet. Please keep this tab open and try again.');
            return;
        }
        move(originalJourney);
        setOriginalJourney(null);
    }
    function startAgain() {
        if (game && byId[game.scene].ending && storageErrors.includes(keys.books))
            return;
        stopSpeech();
        try {
            if(game&&!game.world&&!originalJourney){localStorage.setItem('starlight-original-journey-v1',JSON.stringify(game));setOriginalJourney(game);}
            localStorage.removeItem(keys.game);
        }
        catch {
            setStorageErrors(previous => previous.includes(keys.game) ? previous : [...previous, keys.game]);
            return;
        }
        setGame(null);
        setRestart(false);
        window.scrollTo({ top: 0 });
    }
    function retrySaving() {
        if (game)
            persist(keys.game, game);
        persist(keys.books, books);
        persist(keys.words, words);
        persist(keys.reader, reader);
        persist(keys.endings, collected);
        try {
            localStorage.setItem(keys.pace, String(pace));
            setStorageErrors(previous => previous.filter(key => key !== keys.pace));
        }
        catch { /* The existing storage notice stays visible. */ }
    }
    const imageFor = (id: string, who: Starter) => url(resolveIllustration(manifest, { ...initial(who), scene: id }).base);
    const renderArtwork = (snapshot: State, className = '') => <SceneArtwork manifest={manifest} state={snapshot} imageUrl={url} className={className} onError={() => setArtError(true)}/>;
    const displayScene = scene || byId.S01;
    const displayStarter = game?.starter || starter;
    const artworkState: State = game ? { ...game, scene: displayScene.id, flags: game.flags, companions: game.companions } : { ...initial(displayStarter), scene: displayScene.id };
    const saveBlocked = Boolean(game && scene?.ending && storageErrors.includes(keys.books));
    return <div className={`app-shell${reader.readingMode ? ' reading-mode' : ''}`} data-text-size={reader.textSize}>
  <header inert={Boolean(panel || restart)}>
   <a className="brand" href="#" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><span className="brand-star">{t("\u2726")}</span><span>{t("STARLIGHT STORIES")}<small>{t("A Pok\u00E9mon adventure")}</small></span></a>
   <nav aria-label={t("Story tools")}><button aria-label={t("Your travel map")} onClick={() => openPanel('map')}><span>{t("\u2316")}</span><span className="nav-label">{t("Map")}</span></button><button aria-label={t("Your journey")} onClick={() => openPanel('history')}><span>{t("\u21B6")}</span><span className="nav-label">{t("Your journey")}</span></button><button aria-label={t(`Bookshelf: ${books.length} finished ${books.length === 1 ? 'book' : 'books'}, ${collected.length} of 6 endings`)} onClick={() => openPanel('library')}><span>{t("\u25A4")}</span><span className="nav-label">{t("Bookshelf")}</span><b>{t(collected.length)}{t("/6")}</b></button></nav>
  </header>
  <main inert={Boolean(panel || restart)}>
   <div className="eyebrow"><span />{t("AN INTERACTIVE STORYBOOK")}<span /></div>
   <h1>{t("Pok\u00E9mon ")}<span className="title-dash">{t("\u2014")}</span><br />{t("The Mystery of the ")}<em>{t("Lost Starlight")}</em></h1>
   <p className="subtitle">{t("A little courage. A faithful friend. A sky waiting to shine again.")}</p>
   <section className="language-picker" aria-label={t("Language / Språk")}><span>{t("Language / Spr\u00E5k")}</span><button lang="nb" aria-pressed={language === 'nb'} onClick={() => changeLanguage('nb')}>{t("Norsk")}</button><button lang="en" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>{t("English")}</button></section>
   <AppInstall language={language}/>
   <ReaderControls preferences={reader} onChange={setReader} openBag={() => openPanel('bag')} openWords={() => openPanel('words')} onRestart={game ? openRestart : undefined}/>
   {t(originalJourney && <p className="branch-notice" role="status">{t("You are exploring another path. Your original adventure is safe. ")}<button className="small-action" onClick={returnToOriginal}>{t("Return to my original adventure")}</button></p>)}
   <div className="book-layout"><div className="book-column">
    {game&&game.world?.edition!=='3'&&<p className="branch-notice">{t("You are continuing the previous edition. Your saved choices are preserved.")}</p>}
    <div className="chapter-bar"><span className="chapter-dot">{t(game ? scene!.chapter : '✦')}</span><span>{t(game ? `CHAPTER ${scene!.chapter} OF 5` : 'YOUR ADVENTURE AWAITS')}<strong>{t(game ? chapterTitles[scene!.chapter - 1] : 'Every great story begins with a friend.')}</strong></span><span className="page-count">{t(game ? `${game.history.length + 1} pages explored` : '5 chapters · 6 endings')}</span></div>
    <article className="storybook">
     <SceneArtwork manifest={manifest} state={artworkState} imageUrl={url} className="illustration" onError={() => setArtError(true)}><div className="art-badge">{t("\u2727 ")}{t(scene?.ending ? 'A new ending to treasure' : game ? 'The adventure is yours' : 'A world of wonder awaits')}</div></SceneArtwork>
     <div className="page-body">
      {t(!game ? <>
       <div className="page-label">{t("PROLOGUE \u00B7 WILLOWBROOK")}</div><h2 ref={heading} tabIndex={-1}>{t("The stars have gone missing.")}</h2><p className="story-text">{t("The festival lanterns are glowing. The sky is strangely quiet. Somewhere beyond the forest, a secret is waiting \u2014 and you don\u2019t have to find it alone.")}</p>
       <div className="choose-label">{t("Choose your first companion")}<span>{t("Who will walk beside you?")}</span></div><div className="starter-grid">{t((['Bulbasaur', 'Charmander', 'Squirtle'] as Starter[]).map(name => <button key={name} aria-pressed={starter === name} className={`starter ${name.toLowerCase()} ${starter === name ? 'selected' : ''}`} onClick={() => setStarter(name)}><span className="starter-icon">{t(icons[name])}</span><strong>{t(name)}</strong><small>{t(name === 'Bulbasaur' ? 'Gentle & resourceful' : name === 'Charmander' ? 'Warm & courageous' : 'Curious & dependable')}</small><span className="starter-type">{t(name === 'Bulbasaur' ? 'GRASS · POISON' : name === 'Charmander' ? 'FIRE' : 'WATER')}</span></button>))}</div>
       <button className="begin" onClick={() => move({ ...initial(starter), language, journeyId: journeyId(), acknowledgedChapters: [1] })}>{t("Begin with ")}{t(starter)}<span>{t("\u2192")}</span></button><p className="local-note">{t("No sign-up. No cost. Just you, your friend, and a little starlight.")}</p>
      </> : <>
       <div className="reading-toolbar"><span className="page-label">{t(scene!.ending ? 'YOUR STORY’S ENDING' : `CHAPTER ${scene!.chapter} · ${scene!.setting.toUpperCase()}`)}</span><label className="pace-control">{t("Reading pace")}<select aria-label={t("Reading pace")} value={pace} onChange={event => { setPace(Number(event.target.value)); stopSpeech(); }}><option value={1}>{t("Normal")}</option><option value={.8}>{t("Gentle")}</option><option value={.65}>{t("Extra slow")}</option></select></label><button disabled={!('speechSynthesis' in window)} aria-pressed={narrating} onClick={() => narrating ? stopSpeech() : speak(text, pace, true)}>{t(narrating ? '◼ Stop reading' : '▷ Read to me')}</button></div>
       <h2 ref={heading} tabIndex={-1}>{t(sceneTitle(game))}</h2>{t(speechMessage && <p className="speech-message" role="status">{t(speechMessage)}</p>)}
       <ReadableText knownWords={words.map(w => w.word)} text={text} activeSentence={activeSentence} speak={word => speak(word, .65)} speechAvailable={'speechSynthesis' in window} onExplore={word => setWords(previous => learnWord(previous, word, game, new Date().toISOString()))}/>
       <StoryExtras key={`extras-${game.scene}`} game={game} text={text} speak={speak}/>
       {t(!scene!.ending && <PuzzleCard key={`puzzle-${game.scene}`} game={game} onChange={setGame}/>)}
       {t(scene!.ending ? <div className="ending-card"><span>{t("\u2726 ENDING DISCOVERED")}</span><h3>{t(scene!.ending)}</h3><p>{t(companionLine(game))}</p><EndingMemories game={game} imageFor={imageFor} renderArtwork={renderArtwork}/><FriendEpilogues game={game}/><button className="small-action" onClick={() => downloadJourney(game)}>{t("Download my finished story")}</button><p>{t("Your journey: ")}{t(game.companions.length)}{t(" new ")}{t(game.companions.length === 1 ? 'friend' : 'friends')}{t(" \u00B7 ")}{t(game.history.length)}{t(" decisions")}</p><button className="small-action" onClick={() => openPanel('library')}>{t("\u25A4 Read your finished books")}</button><button className="begin" onClick={openRestart}>{t("Discover another story")}<span>{t("\u21BB")}</span></button><button className="text-button" onClick={() => openPanel('history')}>{t("Read your journey again")}</button></div> : <><div className="choice-heading"><span>{t("What will you do?")}</span><small>{t("Every choice leaves a little light.")}</small></div><StoryChoices key={game.scene} game={game} onChoose={choice => move(advance(game, choice))} speak={content => speak(content, .8)} speechAvailable={'speechSynthesis' in window}/></>)}
      </>)}
     </div>
    </article>
    <div className="under-book"><span>{t(storageErrors.length ? '● Saving needs attention' : game ? '● Your adventure is saved on this device' : 'Made for curious hearts, ages 8–12')}</span><button onClick={() => openPanel('words')}>{t("Aa ")}<span>{t("My Words (")}{t(words.length)}{t(")")}</span></button></div>
    {t(storageErrors.length > 0 && <div className="storage-notice" role="status">{t("This browser could not save some changes. Keep this tab open; your journey and collections are still here for now.")}<button onClick={retrySaving}>{t("Retry saving")}</button></div>)}
   </div><aside>
    <div className="side-card companion-card"><div className="side-eyebrow">{t("YOUR TRAVELING FRIENDS")}</div><h3>{t("A little team.")}<br />{t("A big adventure.")}</h3><div className={`companion-avatar ${displayStarter.toLowerCase()}`}>{t(icons[displayStarter])}</div><h4>{t(displayStarter)}</h4><span className="friend-tag">{t(game ? 'YOUR FIRST COMPANION' : 'READY TO MEET YOU')}</span><p>{t(displayStarter === 'Bulbasaur' ? 'A steady heart and a knack for helping things grow.' : displayStarter === 'Charmander' ? 'A warm heart and a light for even the darkest path.' : 'A curious heart and a clever way with water.')}</p>{t(game && <><div className="friend-list">{t([...new Set([...game.companions, ...visibleCompanions(game)])].length ? [...new Set([...game.companions, ...visibleCompanions(game)])].map(name => <div key={name}><span>{t(icons[name])}</span><strong>{t(name)}</strong><small>{t(name === 'Lapras' && scene?.setting !== 'river' ? 'Your friend on the river' : game.companions.includes(name) ? 'Traveling with you' : 'Visiting to help')}</small></div>) : <span className="quiet">{t("There\u2019s room for new friends along the way.")}</span>)}</div><p className="companion-dialogue">{t(companionLine(game))}</p></>)}</div>
    <div className="side-card map-card"><div className="side-eyebrow">{t("THE PATH AHEAD")}</div><ol>{t(chapterTitles.map((title, i) => <li key={title} className={game && scene!.chapter === i + 1 ? 'current' : game && scene!.chapter > i + 1 ? 'complete' : ''}><span>{t(game && scene!.chapter > i + 1 ? '✓' : i + 1)}</span><div><small>{t("CHAPTER ")}{t(i + 1)}</small>{t(title)}</div></li>))}</ol><button className="open-travel-map" onClick={() => openPanel('map')}>{t("\u2316 Open your travel map")}</button></div><div className="tip"><span>{t("\u2727")}</span><p>{t("There\u2019s no perfect path.")}<br />{t("Only the story ")}<em>{t("you")}</em>{t(" make.")}</p></div>{t(game && <button className="restart" onClick={openRestart}>{t("\u21BB Start a new adventure")}</button>)}
   </aside></div>
   <footer><span>{t("\u2726")}</span>{t("A fan-made adventure, made with imagination.")}<small>{t("Pok\u00E9mon belongs to its respective owners. Artwork prepared locally \u00B7 No images generated during play \u00B7 No ads or tracking.")}</small>{t(artError && <p role="status">{t("An illustration could not load. Try refreshing this page.")}</p>)}</footer>
  </main>
  {t(panel && <div className="modal-backdrop" onClick={closeDialog}><section className={panel === 'map' || panel === 'library' ? 'modal map-modal' : 'modal'} role="dialog" aria-modal="true" aria-label={t(titles[panel])} onClick={event => event.stopPropagation()}><button autoFocus className="close" onClick={closeDialog} aria-label={t("Close dialog")}>{t("\u00D7")}</button><div className="page-label">{t("YOUR STORYBOOK TOOLKIT")}</div><h2>{t(titles[panel])}</h2>{t(panel === 'map' ? <JourneyMap game={game}/> : panel === 'history' ? <HistoryJournal game={game} onBranch={originalJourney ? undefined : forkJourney}/> : panel === 'bag' ? <AdventureBag game={game} onChange={setGame}/> : panel === 'words' ? <MyWords words={words} speak={(content, rate) => speak(content, rate, false, 'en')} speechAvailable={'speechSynthesis' in window}/> : <Bookshelf books={books} collected={collected} imageFor={imageFor} renderArtwork={renderArtwork}/>)}</section></div>)}
  {t(restart && <div className="modal-backdrop"><section className="modal small-modal" role="dialog" aria-modal="true" aria-label={t("Start a new adventure")}><h2>{t("A fresh first page?")}</h2><p>{t("This replaces your current journey. Your finished books, discovered endings, and personal word notebook stay in their collections.")}</p>{t(saveBlocked && <p className="storage-notice">{t("Your finished book could not be saved yet. Close this dialog and retry saving before beginning again.")}</p>)}<button className="begin" disabled={saveBlocked} autoFocus onClick={startAgain}>{t("Start again")}</button><button className="text-button" onClick={closeDialog}>{t("Keep my adventure")}</button></section></div>)}
 </div>;
}

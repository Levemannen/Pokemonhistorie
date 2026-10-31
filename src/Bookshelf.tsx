import { t } from './i18n';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { byId, scenes, storyText, type Starter, type State } from './story';
import type { FinishedBook } from './collections';
import { JourneyMap } from './JourneyMap';
import { EndingMemories } from './EndingMemories';
import { FriendEpilogues } from './FriendEpilogues';
import { HistoryJournal } from './HistoryJournal';
import { AdventureBag } from './AdventureBag';
export function Bookshelf({ books, collected, imageFor, layersFor, renderArtwork }: {
    books: FinishedBook[];
    collected: string[];
    imageFor: (scene: string, starter: Starter) => string;
    layersFor?: (state: State) => string[];
    renderArtwork?: (state: State, className?: string) => ReactNode;
}) {
    const [selected, setSelected] = useState<string | null>(null), [tab, setTab] = useState<'ending' | 'map' | 'journal' | 'bag'>('ending');
    const container = useRef<HTMLElement>(null);
    useEffect(() => { container.current?.closest('.modal')?.scrollTo({ top: 0, behavior: 'instant' }); }, [selected, tab]);
    const book = books.find(entry => entry.id === selected);
    if (book) {
        const game = book.state;
        return <section ref={container} className="archived-book" aria-label={t("A completed adventure")}><button className="small-action" onClick={() => setSelected(null)}>{t("\u2190 Back to bookshelf")}</button><p className="archive-safe">{t("You are reading a finished book. Your current adventure stays exactly where it is.")}</p><h3>{t(byId[game.scene].ending)}</h3><p className="archive-meta">{t("With ")}{t(game.starter)}{t(" \u00B7 ")}{t(game.history.length)}{t(" decisions \u00B7 ")}{t(game.companions.length)}{t(" new ")}{t(game.companions.length === 1 ? 'friend' : 'friends')}</p><div className="tool-tabs">{t((['ending', 'map', 'journal', 'bag'] as const).map(value => <button key={value} aria-pressed={tab === value} onClick={() => setTab(value)}>{t(value === 'ending' ? 'Ending & friends' : value === 'map' ? 'Travel map' : value === 'journal' ? 'Story journal' : 'Adventure bag')}</button>))}</div>{t(tab === 'map' ? <JourneyMap key={book.id} game={game}/> : tab === 'journal' ? <HistoryJournal game={game}/> : tab === 'bag' ? <AdventureBag game={game}/> : <>{t(renderArtwork ? renderArtwork(game, "archived-painted") : <div className="archived-illustration"><img className="archived-cover" src={imageFor(game.scene, game.starter)} alt={t(`Your completed adventure: ${byId[game.scene].ending}`)}/>{t(layersFor?.(game).map(path => <img key={path} className="archived-layer" src={path} alt={t("")}/>))}</div>)}<p className="archived-story">{t(storyText(byId[game.scene], game))}</p><EndingMemories game={game} imageFor={imageFor} renderArtwork={renderArtwork}/><FriendEpilogues game={game}/></>)}</section>;
    }
    return <section ref={container} className="bookshelf" aria-label={t("Your finished adventures")}><p className="tool-intro">{t("Finish an adventure to keep its whole journey here: the ending, map, choices, and friends. Beginning again will not replace these books.")}</p>{t(books.length ? <div className="finished-books">{t(books.map(entry => <button key={entry.id} onClick={() => { setSelected(entry.id); setTab('ending'); }}>{t(renderArtwork ? renderArtwork(entry.state, "book-painted-cover") : <img loading="lazy" src={imageFor(entry.state.scene, entry.state.starter)} alt={t("")}/>)}<span><small>{t("A FINISHED ADVENTURE")}</small><strong>{t(byId[entry.state.scene].ending)}</strong><span>{t("With ")}{t(entry.state.starter)}{t(" \u00B7 ")}{t(entry.state.history.length)}{t(" decisions")}</span>{t(Number.isFinite(Date.parse(entry.completedAt)) && <time dateTime={entry.completedAt}>{t(new Date(entry.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))}</time>)}<b>{t("Open this book \u2197")}</b></span></button>))}</div> : <p className="tool-empty">{t("Your first finished book is still being written.")}{t(collected.length > 0 ? ' Your earlier discovered endings are still collected below; complete another journey to keep its full book.' : '')}</p>)}<h3 className="collection-title">{t("Six ways to shine \u00B7 ")}{t(collected.length)}{t("/6 discovered")}</h3><div className="ending-shelf">{t(scenes.filter(scene => scene.ending && !scene.id.startsWith('F_')).map(scene => <div key={scene.id} className={collected.includes(scene.id) ? 'unlocked' : ''}><span>{t(collected.includes(scene.id) ? '✦' : '☆')}</span><h3>{t(collected.includes(scene.id) ? scene.ending : 'An undiscovered ending')}</h3><p>{t(collected.includes(scene.id) ? scene.title : 'A different choice may lead here.')}</p></div>))}</div></section>;
}

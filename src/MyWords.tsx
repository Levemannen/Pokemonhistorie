import { t } from './i18n';
import { useState } from 'react';
import { meanings } from './words';
import { norwegianWords } from './norwegian';
import type { LearnedWord } from './collections';
export function MyWords({ words, speak, speechAvailable }: {
    words: LearnedWord[];
    speak: (text: string, rate?: number) => void;
    speechAvailable: boolean;
}) {
    const [tab, setTab] = useState<'mine' | 'all'>('mine');
    return <section className="my-words" aria-label={t("Personal word notebook")}><div className="tool-tabs"><button aria-pressed={tab === 'mine'} onClick={() => setTab('mine')}>{t("Mine ord (")}{t(words.length)}{t(")")}</button><button aria-pressed={tab === 'all'} onClick={() => setTab('all')}>{t("Hele ordlisten")}</button></div>{t(tab === 'mine' ? <><p className="tool-intro">{t("Her finner du ordene du har trykket p\u00E5, med norsk betydning og en engelsk setning fra ditt eget eventyr.")}</p>{t(words.length ? <div className="word-notebook">{t(words.map(entry => <article key={entry.word}><h3 lang="en">{entry.word}</h3><p className="norwegian-meaning" lang="nb">{t(norwegianWords[entry.word])}</p><p lang="en">{meanings[entry.word]}</p><blockquote lang="en">{entry.example}</blockquote><small>{t("From ")}{t(entry.sceneTitle)}{t(" \u00B7 with ")}{t(entry.starter)}</small><div><button className="small-action" disabled={!speechAvailable} onClick={() => speak(entry.word, .65)}>{t("H\u00F8r ordet sakte")}</button><button className="small-action" disabled={!speechAvailable} onClick={() => speak(entry.example, .8)}>{t("H\u00F8r eksempelsetningen")}</button></div></article>))}</div> : <p className="tool-empty">{t("Trykk p\u00E5 et understreket ord i historien. Da lagres betydningen og en setning fra siden her.")}</p>)}</> : <dl className="full-dictionary">{t(Object.entries(meanings).sort(([a], [b]) => a.localeCompare(b)).map(([word, definition]) => <div key={word}><dt>{word}</dt><dd><p className="norwegian-meaning" lang="nb">{t(norwegianWords[word])}</p>{definition}<button className="dictionary-pronounce" disabled={!speechAvailable} onClick={() => speak(word, .65)}>{t("H\u00F8r ")}{word}{t(" sakte")}</button></dd></div>))}</dl>)}</section>;
}

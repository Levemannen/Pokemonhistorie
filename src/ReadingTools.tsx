import { t } from './i18n';
import { getLanguage } from './i18n';
import { baseWord, meanings, sentenceParts } from './words';
import { norwegianWords } from './norwegian';
export { baseWord, meanings, wordForms } from './words';
import { useEffect, useRef, useState, useId } from 'react';
export function ReadableText({ text, speak, speechAvailable, onExplore, activeSentence = '', knownWords = [] }: {
    text: string;
    speak: (text: string) => void;
    speechAvailable: boolean;
    onExplore?: (word: string) => void;
    activeSentence?: string;
    knownWords?: string[];
}) {
    const [selected, setSelected] = useState<{
        word: string;
        index: string;
        left: number;
        top: number;
    } | null>(null);
    const container = useRef<HTMLDivElement>(null);
    const anchor = useRef<HTMLButtonElement | null>(null);
    const popupId = useId();
    useEffect(() => setSelected(null), [text]);
    useEffect(() => {
        if (!selected)
            return;
        const close = (e: Event) => {
            if (e.type === 'scroll' || e.type === 'resize') {
                const r=anchor.current?.getBoundingClientRect();
                if(!r||r.bottom<0||r.top>window.innerHeight){setSelected(null);return;}
                const left=Math.max(12,Math.min(r.left-30,document.documentElement.clientWidth-304));
                const top=Math.max(12,Math.min(r.bottom+9,window.innerHeight-310));
                setSelected(previous=>previous&&(previous.left!==left||previous.top!==top)?{...previous,left,top}:previous);
                return;
            }
            if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Escape')
                return;
            if ((e.type === 'pointerdown' || e.type === 'focusin' || e.type === 'scroll') && container.current?.contains(e.target as Node))
                return;
            setSelected(null);
            if (e.type === 'keydown')
                anchor.current?.focus();
        };
        document.addEventListener('pointerdown', close);
        document.addEventListener('focusin', close);
        document.addEventListener('keydown', close);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('focusin', close); document.removeEventListener('keydown', close); window.removeEventListener('scroll', close, true); window.removeEventListener('resize', close); };
    }, [selected]);
    return <div ref={container}>
  <p className="story-text" lang={getLanguage()}>{t(sentenceParts(text).map(sentence => <span key={sentence.start} className={activeSentence.trim() === sentence.text.trim() ? 'sentence-speaking' : undefined}>{t(sentence.text.split(/(\b[A-Za-z]+\b)/).map((word, i) => {
                const index = sentence.start + '-' + i;
                return getLanguage() === 'en' && meanings[baseWord(word)] ? <button key={i} className={`word${knownWords.includes(baseWord(word)) ? ' word-known' : ''}`} aria-expanded={selected?.index === index} aria-controls={selected?.index === index ? popupId : undefined} aria-label={t('Forklar ' + word)} onClick={e => {
                        const r = e.currentTarget.getBoundingClientRect();
                        anchor.current = e.currentTarget;
                        if (selected?.index !== index)
                            onExplore?.(word);
                        setSelected(selected?.index === index ? null : { word, index, left: Math.max(12, Math.min(r.left - 30, document.documentElement.clientWidth - 304)), top: Math.max(12, Math.min(r.bottom + 9, window.innerHeight - 310)) });
                    }}>{t(word)}</button> : word;
            }))}</span>))}</p>
  <details className="sentence-help" key={text}><summary lang="nb">{t("Lytt til \u00E9n setning om gangen")}</summary><p lang="nb">{t("H\u00F8r, les og pr\u00F8v gjerne \u00E5 si setningen selv. Du kan lytte flere ganger.")}</p>{t(sentenceParts(text).map((sentence, i) => <button key={sentence.start} disabled={!speechAvailable} className={activeSentence.trim() === sentence.text.trim() ? 'sentence-speaking' : ''} aria-label={t('Hør setning ' + (i + 1) + ': ' + sentence.text)} onClick={() => speak(sentence.text)} lang={getLanguage()}>{sentence.text}</button>))}{t(!speechAvailable && <p lang="nb">{t("Denne nettleseren st\u00F8tter ikke opplesning. Du kan fortsatt lese og bruke ordhjelpen.")}</p>)}</details>
  {t(selected && <div id={popupId} role="dialog" aria-label={t('Forklaring: ' + selected.word)} className="word-popover" style={{ left: selected.left, top: selected.top }}><button className="word-close" aria-label={t("Lukk ordforklaring")} onClick={() => { setSelected(null); anchor.current?.focus(); }}>{t("\u00D7")}</button><small lang="nb">{t("ORDHJELP")}</small><strong lang="en">{t(selected.word)}</strong><p className="norwegian-meaning" lang="nb">{t(norwegianWords[baseWord(selected.word)])}</p><p lang="en">{t(meanings[baseWord(selected.word)])}</p>{t(onExplore && <small className="word-kept" lang="nb">{t("Lagret i Mine ord")}</small>)}<button className="pronounce" lang="nb" disabled={!speechAvailable} onClick={() => speak(selected.word)}>{t("H\u00F8r uttalen")}</button></div>)}
 </div>;
}

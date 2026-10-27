import { t } from './i18n';
import { useState } from 'react';
import { chapterRecap } from './chapters';
import type { State } from './story';
export function ChapterPause({ game, onContinue, speak, canSave = true, narrating = false, stopReading }: {
    game: State;
    onContinue: () => void;
    speak: (text: string) => void;
    canSave?: boolean;
    narrating?: boolean;
    stopReading?: () => void;
}) {
    const [resting, setResting] = useState(false);
    const recap = chapterRecap(game);
    return <section className="chapter-pause" aria-label={t("Chapter bookmark")}><div className="page-label">{t("CHAPTER ")}{t(recap.completed)}{t(" COMPLETE")}</div><h3>{t(resting ? 'A bookmark is waiting for you.' : 'A little pause for your traveling team.')}</h3><p>{t(resting ? (canSave ? 'You can close the page and come back to this bookmark on the same device.' : 'Keep this page open while saving needs attention. Use Retry saving below before leaving.') : 'Take a breath and remember the little lights you left behind.')}</p><ul>{t(recap.memories.map(line => <li key={line}>{t(line)}</li>))}</ul><p className="carry-forward">{t("\u2726 ")}{t(recap.carry)}</p><div className="chapter-pause-tools"><button className="small-action" onClick={() => narrating ? stopReading?.() : speak([...recap.memories, recap.carry].join(' '))}>{t(narrating ? '◼ Stop recap' : '▷ Read my recap')}</button>{t(!resting && <button className="small-action" onClick={() => setResting(true)}>{t("Pause here")}</button>)}</div><button className="begin" onClick={onContinue}>{t(resting ? 'Resume' : 'Continue to')}{t(" chapter ")}{t(recap.completed + 1)}<span>{t("\u2192")}</span></button><small>{t("Next: ")}{t(recap.next)}{t(". Your progress saves automatically on this device.")}</small></section>;
}

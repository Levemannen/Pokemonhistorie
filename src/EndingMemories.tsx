import { t } from './i18n';
import type { ReactNode } from 'react';
import { historyChoiceText, byId, endingMemories, replayInvitation, type State, type Starter } from './story';
export function EndingMemories({ game, imageFor, renderArtwork }: {
    game: State;
    imageFor: (scene: string, starter: Starter) => string;
    renderArtwork?: (state: State, className?: string) => ReactNode;
}) {
    return <section className="ending-memories" aria-label={t("How your choices shaped this ending")}><div className="page-label">{t("THE LIGHT YOU LEFT BEHIND")}</div><h3>{t("Your choices made this ending.")}</h3><div className="memory-grid">{t(endingMemories(game).map((memory, i) => <article className="memory" key={`${memory.scene}-${i}`}>{t(renderArtwork ? renderArtwork((() => { const i = game.history.findIndex(entry => entry.scene === memory.scene); const entry = game.history[i]; return { ...game, scene: memory.scene, flags: entry?.flags || [], companions: entry?.companions || [], history: game.history.slice(0, Math.max(0, i)) }; })(), "memory-painted") : <img loading="lazy" src={imageFor(memory.scene, game.starter)} alt={t(`A memory of ${byId[memory.scene].title}`)}/>)}<div><h4>{t(memory.title)}</h4><p className="memory-choice">{t("You chose: ")}{t(historyChoiceText(memory.scene, memory.choice, game.starter))}</p><p>{t(memory.effect)}</p></div></article>))}</div><div className="next-adventure"><strong>{t("A little \u201Cwhat if\u201D for next time\u2026")}</strong><p>{t(replayInvitation(game))}</p></div></section>;
}

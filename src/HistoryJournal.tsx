import { t } from './i18n';
import { downloadJourney } from './journeyReview';
import { historyChoiceText, byId, sceneTitle, storyText, historicalState, type State } from './story';
export function HistoryJournal({ game, onBranch }: {
    game: State | null;
    onBranch?: (index: number) => void;
}) {
    if (!game?.history.length)
        return <p className="tool-empty">{t("Your first page is still waiting.")}</p>;
    return <><p className="tool-intro">{t("Your choices are part of the story. This journal keeps them safe.")}</p><button className="small-action" onClick={() => downloadJourney(game)}>{t("Download this adventure as text")}</button>{t(onBranch && <p>{t("Your original adventure will be kept safe while you try another path.")}</p>)}<ol className="history-list">{t(game.history.map((entry, i) => {
            const snapshot = historicalState(game,i);
            return <li key={i}><small>{t("CHAPTER ")}{t(byId[entry.scene].chapter)}</small><h3>{t(sceneTitle(snapshot))}</h3><p>{t(storyText(byId[entry.scene], snapshot))}</p><strong>{t(historyChoiceText(entry.scene, entry.choice, game.starter, entry.choiceId))}</strong>{t(onBranch && entry.flags && entry.companions && <p><button className="small-action" onClick={() => onBranch(i)}>{t("Try a different choice from here")}</button></p>)}</li>;
        }))}</ol></>;
}

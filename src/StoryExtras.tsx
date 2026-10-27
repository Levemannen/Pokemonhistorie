import { t } from './i18n';
import { companionConversation, consequence, byId, chapters, type State } from './story';
const questions = ['What made you want to follow the seed?', 'Which forest friend did you stop to help?', 'What did the river teach you about Lumi and Shinx?', 'Which mountain path felt right for your team?', 'What will change in the valley after your choice?'];
export function StoryExtras({ game, speak }: {
    game: State;
    text: string;
    speak: (text: string) => void;
}) {
    const chapter = byId[game.scene].chapter, effect = consequence(game), previous = game.history.at(-1);
    const finished = previous && byId[previous.scene].chapter < chapter ? byId[previous.scene].chapter : byId[game.scene].ending ? 5 : 0;
    return <div className="story-extras">
 {t(effect && <details><summary>{t("How an earlier choice helped")}</summary><p>{t(effect.text)}</p></details>)}
 <details><summary>{t("Talk with your friends")}</summary>{t(companionConversation(game).map((line, i) => <p key={i}><strong>{t(line.speaker)}{t(": ")}</strong>{t(line.text)} <button className="text-button" aria-label={t('Read ' + line.speaker + "'s words")} onClick={() => speak(line.text)}>{t("Listen")}</button></p>))}</details>
 {t(Boolean(finished) && <details><summary>{t("A moment to think about chapter ")}{t(finished)}</summary><p>{t(chapters[finished - 1])}{t(": ")}{t(questions[finished - 1])}</p><p>{t("You can talk about it in English or Norwegian, or keep your answer to yourself.")}</p></details>)}
 </div>;
}

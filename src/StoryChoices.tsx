import { t, getLanguage } from './i18n';
import { useState } from 'react';
import { available, choiceText, type State, type Choice } from './story';
import { choiceNorwegian } from './norwegian';
import {norwegianChoice} from './storyLocale';
export function StoryChoices({ game, onChoose, speak, speechAvailable }: {
    game: State;
    onChoose: (choice: Choice) => void;
    speak: (text: string) => void;
    speechAvailable: boolean;
}) {
    const [help, setHelp] = useState<string | null>(null);
    return <div className="choices">{t(available(game).map(choice => {
            const label = choiceText(choice, game.starter), displayedLabel=getLanguage()==='nb'&&choice.id?norwegianChoice(choice.id)!:t(label), open = help === choice.label, id = `choice-help-${game.scene}-${game.history.length}-${byChoiceIndex(game, choice)}`;
            return <div className="story-choice" key={choice.label}>
   <button className="choose-story" onClick={() => onChoose(choice)}><span>{displayedLabel}{t(choice.starter && <small>{t(choice.starter)}{t("\u2019s special path")}</small>)}{t(choice.needs && <small>{t(choice.needs.startsWith('puzzle:') ? 'You solved the puzzle together' : choice.needs === 'promiseTrail' || choice.needs === 'keptPromise' ? 'Your river promise opened this path' : choice.needs === 'pikachuHelp' ? 'Pikachu remembers your kindness' : choice.needs === 'villagePlan' ? 'Lumi agreed to the village plan you suggested' : choice.needs === 'melodyHelp' ? 'You remember a song from your journey' : 'Something you learned makes this possible')}</small>)}</span></button>
   <div className="choice-language-tools" lang="nb"><button aria-label={t(`Hør valget: ${label}`)} disabled={!speechAvailable} onClick={() => speak(label)}>{t("H\u00F8r valget")}</button><button aria-expanded={open} aria-controls={id} onClick={() => setHelp(open ? null : choice.label)}>{getLanguage()==='nb'?'English help':'Norsk hjelp'}</button></div>
   <p id={id} hidden={!open} className="choice-translation" lang={getLanguage()==='nb'?'en':'nb'}>{getLanguage()==='nb'?label:choiceNorwegian(game.scene, choice, game.starter)}<small>{getLanguage()==='nb'?'Trykk på den norske valgknappen for å velge.':'Trykk på den engelske teksten når du vil velge.'}</small></p>
  </div>;
        }))}</div>;
}
function byChoiceIndex(game: State, choice: Choice) { return available(game).indexOf(choice); }

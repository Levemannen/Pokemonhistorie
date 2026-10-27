import { t } from './i18n';
import { bagItems, examineItem, itemDiscovery } from './inventory';
import type { State } from './story';
export function AdventureBag({ game, onChange }: {
    game: State | null;
    onChange?: (game: State) => void;
}) {
    if (!game)
        return <p className="tool-empty">{t("Choose a companion and begin. Your first discoveries will find a home in this bag.")}</p>;
    const items = bagItems(game);
    return <section className="adventure-bag" aria-label={t("Your adventure bag")}><p className="tool-intro">{t("Look closely at tools, clues and keepsakes. Your discoveries are saved with your adventure.")}</p><div className="bag-grid">{t(items.map(item => <article className="bag-item" key={item.id}><span className="bag-symbol" aria-hidden="true">{t(item.symbol)}</span><div><small>{t(item.kind.toUpperCase())}{t(item.used ? ' · USED ON YOUR JOURNEY' : '')}</small><h3>{t(item.name)}</h3><p>{t(item.description)}</p><p className="bag-use">{t(item.note)}</p>{t(onChange && <button className="small-action" disabled={game.flags.includes(`inspected:${item.id}`)} onClick={() => onChange(examineItem(game, item.id))}>{t(game.flags.includes(`inspected:${item.id}`) ? 'Examined' : 'Examine ' + item.name)}</button>)}{t(game.flags.includes(`inspected:${item.id}`) && <p role="status">{t(itemDiscovery(game, item.id))}</p>)}<details><summary>{t("How it became part of your story")}</summary><p>{t("From: ")}{t(item.source)}</p>{t(item.choice && <p>{t("You chose: ")}{t(item.choice)}</p>)}</details></div></article>))}</div></section>;
}

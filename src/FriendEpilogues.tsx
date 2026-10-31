import { t } from './i18n';
import { friendFates } from './epilogues';
import type { State } from './story';
export function FriendEpilogues({ game }: {
    game: State;
}) {
    const friends = friendFates(game);
    if (!friends.length) return null;
    return <section className="friend-epilogues" aria-label={t("What happened to the Pokémon you helped")}><div className="page-label">{t("AFTER THE LAST PAGE")}</div><h3>{t("And your friends?")}</h3><p className="epilogue-intro">{t("Kindness keeps going, even when friends choose different paths.")}</p><div className="fate-grid">{t(friends.map(friend => <article className="friend-fate" key={friend.name}><span aria-hidden="true">{t(friend.symbol)}</span><div><h4>{t(friend.name)}</h4><small>{t(friend.name === 'Lapras' ? 'YOUR FRIEND ON THE RIVER' : friend.travelled ? 'TRAVELED WITH YOU' : 'A FRIEND ALONG THE WAY')}</small><p>{t(friend.text)}</p></div></article>))}</div></section>;
}

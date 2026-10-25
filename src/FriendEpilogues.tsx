import {friendFates} from './epilogues';
import type {State} from './story';
export function FriendEpilogues({game}:{game:State}){
 const friends=friendFates(game);
 return <section className="friend-epilogues" aria-label="What happened to the Pokémon you helped"><div className="page-label">AFTER THE LAST PAGE</div><h3>And your friends?</h3><p className="epilogue-intro">Kindness keeps going, even when friends choose different paths.</p><div className="fate-grid">{friends.map(friend=><article className="friend-fate" key={friend.name}><span aria-hidden="true">{friend.symbol}</span><div><h4>{friend.name}</h4><small>{friend.travelled?'TRAVELED WITH YOU':'A FRIEND ALONG THE WAY'}</small><p>{friend.text}</p></div></article>)}</div></section>;
}

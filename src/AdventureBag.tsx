import {bagItems} from './inventory';
import type {State} from './story';
export function AdventureBag({game}:{game:State|null}){
 if(!game)return <p className="tool-empty">Choose a companion and begin. Your first discoveries will find a home in this bag.</p>;
 const items=bagItems(game);
 return <section className="adventure-bag" aria-label="Your adventure bag"><p className="tool-intro">Tools, clues, and keepsakes from the choices you made. Nothing here changes your saved story.</p><div className="bag-grid">{items.map(item=><article className="bag-item" key={item.id}><span className="bag-symbol" aria-hidden="true">{item.symbol}</span><div><small>{item.kind.toUpperCase()}{item.used?' · USED ON YOUR JOURNEY':''}</small><h3>{item.name}</h3><p>{item.description}</p><p className="bag-use">{item.note}</p><details><summary>How it became part of your story</summary><p>From: {item.source}</p>{item.choice&&<p>You chose: {item.choice}</p>}</details></div></article>)}</div></section>;
}

import * as legacy from './legacyInventory';
import * as edition from './editionInventory';
import type {State} from './story';
export type {BagItem} from './legacyInventory';
export const bagItems=(s:State)=>s.world?edition.bagItems(s):legacy.bagItems(s);
export function examineItem(s:State,id:string):State{if(!s.world)return legacy.examineItem(s,id);return bagItems(s).some(i=>i.id===id)?{...s,flags:[...new Set([...s.flags,'inspected:'+id])]}:s;}
export const itemDiscovery=(s:State,id:string)=>s.world?bagItems(s).find(i=>i.id===id)?.description||'':legacy.itemDiscovery(s,id);

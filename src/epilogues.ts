import * as legacy from './legacyEpilogues';
import * as edition from './editionEpilogues';
import type {State} from './story';
export type {Fate} from './legacyEpilogues';
export const friendFates=(state:State)=>state.world?edition.friendFates(state):legacy.friendFates(state);

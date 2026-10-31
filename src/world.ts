/** Versioned story facts: old edition flags are never promoted into this schema. */
export type WorldState={
 edition:'2.1'|'3'; flags:Record<string,string>; items:string[]; knownFacts:string[];
 relationships:Record<string,string>; partyTraveling:string[]; friendsLocal:Record<string,string>;
 arrivalMode:string; lastChoiceId:string|null; visited:string[]; usedItems:string[];
};

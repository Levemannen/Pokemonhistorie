import type {State} from './legacyStory';
/** Derivable for old 2.1 saves too: do not invent a second seed or a new save format. */
export function seedLocation(state:State):[string,string]|null{
 if(!state.world?.usedItems.includes('silverSeed'))return null;
 if(state.scene==='endGarden')return state.world.flags.endingMethod==='reeds'?['The silver plant is rooted beside Psyduck’s river channel.','Sølvplanten har slått rot ved Psyducks elvekanal.']:['The silver plant is rooted in Willowbrook’s shared garden.','Sølvplanten har slått rot i felleshagen i Willowbrook.'];
 const homes:Record<string,[string,string]>={endDawn:['The silver seed is planted in Mira’s window box.','Sølvfrøet er plantet i vinduskassen til Mira.'],endAurora:['The silver seed grows in a pot outside Mira’s recovery room.','Sølvfrøet vokser i en potte utenfor rommet der Shinx hviler hos Mira.'],endSong:['The silver seed is planted beside the river path.','Sølvfrøet er plantet ved elvestien.'],endSanctuary:['The silver plant grows in a tended pot by the tower window.','Sølvplanten vokser i en potte som blir stelt ved tårnvinduet.'],endLantern:['The silver seed is planted beside the festival lantern stand.','Sølvfrøet er plantet ved festens lyktestativ.']};
 return homes[state.scene]||null;
}

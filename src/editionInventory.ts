import type {State} from './story';
import type {BagItem} from './legacyInventory';
const descriptions:Record<string,[string,string,string,BagItem['kind']]>={
 silverSeed:['Silver seed','✦','An emergency key from the Starlight Glass. It stays in your belt pouch until the Glass is safe.','Keepsake'],
 lantern:['Lantern','✧','Your festival lantern supplies ordinary light and warmth.','Tool'],
 map:['Mira’s map','⌑','A folding map of the village, forest, river and mountain routes.','Tool'],
 spareScarf:['Spare scarf','〰','Mira packed this thick scarf for the cold ridge. It is not Shinx’s scarf.','Tool'],
 shinxScarf:['Shinx’s scarf','〰','The scarf you found on the stairs belongs to Shinx.','Keepsake'],
 lens:['Crescent lens','☽','The lens reveals memories held in reflected light.','Tool'],
 letter:['Lumi’s note','✉','The note from the brook is a clue about someone asking for help.','Clue'],
 rope:['Rescue rope','⌁','A strong rope for making a crossing steady.','Tool'],
 rune:['Moon-rune','☽','You earned this rune by solving the mushroom constellation.','Clue'],
 ordinarySeed:['Forest seed','❧','An ordinary brown seed from the oldest tree, separate from the silver emergency key.','Keepsake'],
 feather:['Cloud feather','☁','Air pockets in this soft feather keep a resting Pokémon warm.','Tool'],
};
export function bagItems(game:State):BagItem[]{
 const w=game.world!;
 return [...new Set([...w.items,...w.usedItems])].map(id=>{
  const [name,symbol,description,kind]=descriptions[id]||[id,'✦',id,'Keepsake'];
  const spent=!w.items.includes(id);
  return {id,name,symbol,description,kind,used:w.usedItems.includes(id),source:'Your journey',note:spent?'This is a memory of an item you used or gave away. It is no longer in your bag.':'You are carrying this item.'};
 });
}

import type {State} from './legacyStory';
import type {BagItem} from './legacyInventory';
import {authoredText,getLanguage} from './i18n';
const items:Record<string,[string,string,string,string]>={
 silver_seed:['Silver seed','Sølvfrø','One emergency signal, to be planted only once. It retains existing heat.','Ett nødsignal, som bare skal plantes én gang. Det holder på eksisterende varme.'],
 map:['Mira’s map','Miras kart','The route is drawn in again; your discoveries add marks.','Ruten er tegnet inn igjen; oppdagelsene dine gir nye merker.'],
 lantern:['Festival lantern','Festivallykt','An ordinary light for the path ahead.','Et vanlig lys for veien videre.'],
 crescent_lens:['Crescent lens','Halvmånelinse','Reveals the cup, island and archive markings.','Avslører tegnene på koppen, øya og i arkivet.'],
 moon_rune:['Moon rune','Månerune','Use with the crescent lens at the observatory gate.','Brukes sammen med halvmånelinsen ved observatoriets port.'],
 photo_lumi_shinx:['Photograph','Fotografi','Two friends, each wearing a yellow scarf. A way to begin a conversation.','To venner med hvert sitt gule skjerf. En måte å innlede en samtale på.'],
 altaria_feather:['Altaria’s feather','Altarias fjær','Insulates warm stones; it cannot create heat.','Isolerer varme steiner; den kan ikke skape varme.'],
 letter:['Letter from the tower','Brev fra tårnet','Someone asks for one more night of warmth.','Noen ber om én natt til med varme.']
};
export const seedHomes:Record<string,[string,string]>={DAWN:['Mira’s window box','Miras vinduskasse'],AURORA:['The pot by Mira’s resting room','Potten ved Miras hvilerom'],SONG:['The riverside path','Elvestien'],LANTERN:['The festival lantern stand','Festens lyktestativ'],SANCTUARY:['The pot at the tower window','Potten ved tårnvinduet'],GARDEN:['Willowbrook’s community garden','Willowbrooks felleshage']};
export function v3Bag(s:State):BagItem[]{const w=s.world!,nb=getLanguage()==='nb';return [...new Set([...w.items,...w.usedItems])].map(id=>{const d=items[id];const used=w.usedItems.includes(id);return {id,name:authoredText(d?.[nb?1:0]||id),description:authoredText(d?.[nb?3:2]||id),symbol:id==='crescent_lens'?'☽':'✦',kind:'Keepsake',used,source:authoredText(nb?'Eventyret ditt':'Your journey'),note:authoredText(used&&id==='silver_seed'?(nb?'Plantet: ':'Planted: ')+(seedHomes[w.flags.seed_location]?.[nb?1:0]||''):(nb?'Du har denne i sekken.':'You are carrying this.'))};});}

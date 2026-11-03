import {seedHomes} from './v3Inventory';
import notes from './map-markers.json';
import {optionalPuzzles} from './optionalPuzzles';
import type {State} from './legacyStory';

export const mapCopy={
 title:{nb:'Miras kart',en:"Mira's Map"},
 open:{nb:'Se Miras kart',en:"View Mira's Map"},
 explanation:{nb:'Trykk på et sted eller et merke for å se hva du har oppdaget.',en:"Tap a place or marker to see what you've discovered."},
 unknown:{nb:'Dette området har du ikke utforsket ennå.',en:"You haven't explored this area yet."},
 newMark:{nb:'Ny markering på Miras kart!',en:"New mark on Mira's map!"},
 close:{nb:'Lukk kartet',en:'Close map'},
 empty:{nb:'Mira har ennå ikke vist deg kartet sitt.',en:"Mira hasn't shown you her map yet."},
 legend:{nb:'Steder · Stier · Dine markeringer · Hemmelige tegn',en:'Places · Paths · Your marks · Secret signs'}
};
export const mapPlaces=[
 {id:'village',x:7,y:85,en:'Willowbrook',nb:'Pilebekk',scenes:['S01','S02','S03','S25','Q_VILLAGE','E_LANTERN','E_GARDEN']},
 {id:'library',x:19,y:86,en:'The library',nb:'Biblioteket',scenes:['S04']},
 {id:'forest',x:15,y:54,en:'Moonwood · stone circle at the dry pool',nb:'Måneskogen · steinringen ved den tørre dammen',scenes:['S06','Q_MOON1']},
 {id:'pikachu',x:23,y:48,en:'Pikachu Beneath the Ivy',nb:'Pikachu under eføyen',scenes:['S07','Q_PIKACHU']},
 {id:'nest',x:31,y:45,en:'Hoothoot’s Home',nb:'Hoothoots hus',scenes:['S08','Q_HOOTHOOT']},
 {id:'oak',x:43,y:61,en:'The remembering oak',nb:'Eiketreet som husker',scenes:['S09']},
 {id:'camp',x:54,y:62,en:'The Camp with Two Cups',nb:'Leirplassen med to kopper',scenes:['S10','Q_MOON2']},
 {id:'bridge',x:56,y:79,en:'The rope bridge',nb:'Taubroen',scenes:['S11','Q_BRIDGE','E_SONG']},
 {id:'workshop',x:74,y:49,en:'Psyduck’s waterwheel',nb:'Psyducks vannhjul',scenes:['S12','Q_PSYDUCK']},
 {id:'letter',x:87,y:35,en:'The cable basket',nb:'Postkurven på kabelen',scenes:['S13','Q_RECONCILE']},
 {id:'island',x:84,y:63,en:'The Island That Shows Yesterday',nb:'Øya som viser gårsdagen',scenes:['S14','Q_MOON3']},
 {id:'altaria',x:69,y:35,en:'Altaria’s Nest',nb:'Altarias rede',scenes:['S15','Q_ALTARIA']},
 {id:'cave',x:65,y:25,en:"Gastly's cave",nb:'Gastlys hule',scenes:['S16','Q_GASTLY']},
 {id:'tower',x:92,y:13,en:'Starfall Tower',nb:'Stjernefallstårnet',scenes:['S17','S20','S21','S22','S23','S24','Q_PREP','Q_LEAD','Q_RETURN','E_DAWN','E_AURORA','E_SANCTUARY']},
 {id:'archive',x:81,y:17,en:'Observatory archive',nb:'Observatoriets arkiv',scenes:['S18','S19','Q_ARCHIVE','Q_STAR']},
 {id:'hill',x:11,y:71,en:'Hill above Willowbrook',nb:'Høyden over Pilebekk',scenes:['S05']},
 {id:'cove',x:46,y:85,en:'Lapras’s quiet cove',nb:'Lapras’ rolige bukt',scenes:['Q_LAPRAS']},
 {id:'glass-door',x:89,y:6,en:'The door in the observatory glass',nb:'Døren i observatorieglasset',scenes:['B_GATE','B_LUNALA','B_SOLGALEO','B_BOTH']}
];
const placements=['pikachu','altaria','letter','camp','archive','archive','island','bridge','nest'];
const symbols=['⚑','⋯','✉','✧','✧','✦','☾','═','◒'];
export const mapMarkers=[
 {id:'moon_sig_1',place:'forest',flags:['moon_sig_1'],symbol:'☾',nb:'Du fant månetegnet i steinringen ved den tørre dammen.',en:'You found the moon sign in the stone circle at the dry pool.'},
 {id:'rescued_lapras',place:'cove',flags:['rescued_lapras'],symbol:'≈',nb:'Her fikk du Lapras løs fra snoren.',en:'Here you freed Lapras from the cord.'},

 ...notes.map((note,i)=>({...note,id:note.flags[0],place:placements[i],symbol:symbols[i]})),
 ...optionalPuzzles.map((p,i)=>({id:p.flag,flags:[p.flag],place:['nest','workshop','cave','archive'][i],symbol:['⑂','⚙','◈','☀'][i],en:p.en.note,nb:p.nb.note}))
];
export const hasMiraMap=(state:State|null)=>state?.world?.edition==='3'&&(state.scene==='S04'||state.history.some(h=>h.scene==='S04'));
export function mapState(state:State){
 const shown=state.pendingResult ? state.history[state.history.length-1]?.scene || state.scene : state.scene;
 const scene=shown.startsWith('F_')?'S25':shown;
 const visited=new Set([...state.history.map(h=>h.scene),scene]);
 const places=mapPlaces.filter(p=>p.scenes.some(s=>visited.has(s)) || (p.id==='cove' && state.world?.flags.rescued_lapras==='true'));
 const markers=mapMarkers.filter(m=>places.some(p=>p.id===m.place)&&m.flags.some(f=>state.world?.flags[f]==='true'||state.world?.items.includes(f)));
 const current=mapPlaces.find(p=>p.scenes.includes(scene))?.id;
 const ending=state.world?.flags.seed_location;
 const seedHome=ending && visited.has('E_'+ending)?seedHomes[ending]:undefined;
 return {places,markers,current,seedHome};
}

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
 {id:'village',x:7,y:85,en:'Willowbrook',nb:'Pilebekk',scenes:['S01','S02','S03','S05','Q_VILLAGE']},
 {id:'library',x:19,y:86,en:'The library',nb:'Biblioteket',scenes:['S04']},
 {id:'forest',x:15,y:54,en:'Moonwood',nb:'Måneskogen',scenes:['S06','Q_MOON1']},
 {id:'pikachu',x:23,y:48,en:'Pikachu Beneath the Ivy',nb:'Pikachu under eføyen',scenes:['S07','Q_PIKACHU']},
 {id:'nest',x:31,y:45,en:'Hoothoot’s Home',nb:'Hoothoots hus',scenes:['S08','Q_HOOTHOOT']},
 {id:'oak',x:43,y:61,en:'The remembering oak',nb:'Eiketreet som husker',scenes:['S09']},
 {id:'camp',x:54,y:62,en:'The Camp with Two Cups',nb:'Leirplassen med to kopper',scenes:['S10','Q_MOON2']},
 {id:'bridge',x:56,y:79,en:'River',nb:'Elven',scenes:['S11','Q_BRIDGE','Q_LAPRAS']},
 {id:'workshop',x:74,y:49,en:'The Little Engineer',nb:'Den lille ingeniøren',scenes:['S12','Q_PSYDUCK']},
 {id:'letter',x:87,y:35,en:'The Letter That Came Down',nb:'Brevet som kom nedover',scenes:['S13','Q_RECONCILE']},
 {id:'island',x:84,y:63,en:'The Island That Shows Yesterday',nb:'Øya som viser gårsdagen',scenes:['S14','Q_MOON3']},
 {id:'altaria',x:69,y:35,en:'Altaria’s Nest',nb:'Altarias rede',scenes:['S15','Q_ALTARIA']},
 {id:'cave',x:65,y:25,en:"Gastly's cave",nb:'Gastlys hule',scenes:['S16','Q_GASTLY']},
 {id:'tower',x:92,y:13,en:'Starfall Tower',nb:'Stjernefallstårnet',scenes:['S17','S19','S20','S21','S22','S23','S24','S25','Q_PREP','Q_LEAD','Q_RETURN','B_GATE','B_LUNALA','B_SOLGALEO','B_BOTH']},
 {id:'archive',x:81,y:17,en:'Observatory',nb:'Observatoriet',scenes:['S18','Q_ARCHIVE','Q_STAR']}
];
const placements=['pikachu','altaria','letter','camp','archive','archive','island','bridge','nest'];
const symbols=['⚑','⋯','✉','✧','✧','✦','☾','═','◒'];
export const mapMarkers=[
 ...notes.map((note,i)=>({...note,id:note.flags[0],place:placements[i],symbol:symbols[i]})),
 ...optionalPuzzles.map((p,i)=>({id:p.flag,flags:[p.flag],place:['nest','workshop','cave','archive'][i],symbol:['⑂','⚙','◈','☀'][i],en:p.en.note,nb:p.nb.note}))
];
export const hasMiraMap=(state:State|null)=>state?.world?.edition==='3'&&(state.scene==='S04'||state.history.some(h=>h.scene==='S04'));
export function mapState(state:State){
 const visited=new Set([...state.history.map(h=>h.scene),state.scene]);
 const places=mapPlaces.filter(p=>p.scenes.some(s=>visited.has(s)));
 const markers=mapMarkers.filter(m=>places.some(p=>p.id===m.place)&&m.flags.some(f=>state.world?.flags[f]==='true'||state.world?.items.includes(f)));
 const current=mapPlaces.find(p=>p.scenes.includes(state.scene))?.id
  ||(state.scene.startsWith('E_')||state.scene.startsWith('F_')?'village':undefined);
 return {places,markers,current};
}

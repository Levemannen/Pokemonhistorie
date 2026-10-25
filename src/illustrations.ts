import {hasNeed,visibleCompanions,illustrationScene,type State,type Starter} from './story';
export type ArtLayer={path:string;kind:'canvas'};
export type IllustrationManifest={
 version?:number;artType?:string;
 scenes:Record<string,{base:Record<Starter,string>;fallbackBase?:Record<Starter,string>;render?:'painted-baked';variants?:{path:string;starter?:Starter;needs:string;priority:number}[]}>;
 companionLayers:Record<string,string>;decisionLayers:{flag:string;scenes:string[];path:string}[];
 coverage?:{paintedScenes:number;totalScenes:number;completedAssets:number;plannedAssets:number};
};
export type Illustration={base:string;layers:ArtLayer[];kind:'painted'|'fallback'};
export function resolveIllustration(manifest:IllustrationManifest|null,state:State,fallbackOnly=false):Illustration{
 const entry=manifest?.scenes[state.scene];
 const fallback=entry?.fallbackBase?.[state.starter]||(entry?.base[state.starter]?.endsWith('.svg')?entry.base[state.starter]:`images/scenes/${illustrationScene(state.scene)}-${state.starter.toLowerCase()}.svg`);
 const alternate=!fallbackOnly?entry?.variants?.filter(variant=>(!variant.starter||variant.starter===state.starter)&&(variant.needs.startsWith('companion:')?state.companions.includes(variant.needs.slice(10)):hasNeed(state,variant.needs))).sort((a,b)=>b.priority-a.priority)[0]:undefined;
 const base=fallbackOnly?fallback:alternate?.path||entry?.base[state.starter]||fallback;
 if(!base.endsWith('.svg'))return {base,layers:[],kind:'painted'};
 return {base,kind:'fallback',layers:manifest?[...visibleCompanions(state).map(name=>manifest.companionLayers[name]).filter(Boolean).map(path=>({path,kind:'canvas' as const})),...manifest.decisionLayers.filter(layer=>state.flags.includes(layer.flag)&&layer.scenes.includes(state.scene)).map(layer=>({path:layer.path,kind:'canvas' as const}))]:[]};
}

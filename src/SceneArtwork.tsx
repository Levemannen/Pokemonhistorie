import {useEffect,useState,type ReactNode} from 'react';
import {resolveIllustration,type IllustrationManifest} from './illustrations';
import {sceneTitle,type State} from './story';
export function SceneArtwork({manifest,state,imageUrl,className='',onError,children}:{manifest:IllustrationManifest|null;state:State;imageUrl:(path:string)=>string;className?:string;onError?:()=>void;children?:ReactNode}){
 const expected=resolveIllustration(manifest,state);const [failed,setFailed]=useState(false);
 useEffect(()=>setFailed(false),[expected.base,state.scene,state.starter]);
 const art=failed?resolveIllustration(manifest,state,true):expected;
 const fail=()=>{setFailed(true);onError?.();};
 return <div className={`scene-art ${className}`} data-art-kind={art.kind}><img className="scene-art-base" loading={className==='illustration'?'eager':'lazy'} decoding="async" src={imageUrl(art.base)} alt={`${sceneTitle(state)}: an illustrated moment from your adventure. ${art.kind==='painted'?'Prepared AI storybook artwork.':'Local SVG fallback illustration.'}`} onError={fail}/>{art.layers.map((layer,i)=><img key={`${layer.path}-${i}`} className="scene-canvas-layer" src={imageUrl(layer.path)} alt="" onError={fail}/>)}{art.kind==='fallback'&&<span className="fallback-art-credit">SVG fallback illustration</span>}{children}</div>;
}

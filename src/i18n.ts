import v3 from './manuscript-v3.json';
import norwegian from './nb.json';
import manuscript from './manuscript-v2.json';
import {localizedManuscript} from './storyLocale';
import editionUi from './edition-ui-nb.json';
export type Language='en'|'nb';
let language:Language='en';
export const getLanguage=()=>language;
export function setLanguage(value:Language){language=value;}
const dictionary:Record<string,string>={...norwegian,...editionUi};
for(const s of v3){dictionary[s.title]=s.nbTitle;for(const c of s.choices)dictionary[c.label]=c.nb;}
const revised=localizedManuscript;
for(const scene of manuscript){
 const nb=revised[scene.id];if(!nb)continue;
 dictionary[scene.title]=nb.title;dictionary[scene.body]=nb.body;
 scene.choices.forEach(choice=>{const local=nb.choices[choice.id];if(local){dictionary[choice.label]=local.label;dictionary[choice.immediateText]=local.immediateText;}});
 // Compatibility for UI callers; story rendering itself uses IDs, never this dictionary.
 scene.passages.forEach(block=>{dictionary[block.text]=nb.passages[block.id];});
}
const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const entries=Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length);
const lower=new Map(entries.map(([en,nb])=>[en.toLocaleLowerCase('en'),nb]));
const templates=entries.filter(([key])=>/\{(?:\d+|starter)\}/.test(key)).map(([key,value])=>{
 const slots=[...key.matchAll(/\{(\d+|starter)\}/g)].map(m=>m[1]);
 const pattern=key.split(/\{(?:\d+|starter)\}/).map(escape).join('(.+?)');
 return {key,value,slots,pattern,regex:new RegExp('^'+pattern+'$','iu')};
});
const patterns=entries.map(([key])=>templates.find(t=>t.key===key)?.pattern||escape(key));
const matcher=new RegExp('(?<![A-Za-z])(?:'+patterns.join('|')+')(?![A-Za-z])','giu');
const cache=new Map<string,string>();
const translatedOutputs=new Set<string>();
/** Already authored in the selected language: never run dictionary substitutions over it. */
export function authoredText(text:string):string{if(language==='nb')translatedOutputs.add(text);return text;}
function matchCase(source:string,translated:string){
 if(source.length>3&&/[A-Z]/.test(source)&&source===source.toUpperCase())return translated.toUpperCase();
 return /^[A-Z]/.test(source)&&/^[a-zæøå]/.test(translated)?translated[0].toUpperCase()+translated.slice(1):translated;
}
export function translate(text:string,locale:Language=language,depth=0):string{
 if(locale==='en'||!text.trim()||depth>4)return text;
 if(translatedOutputs.has(text))return text;
 const cached=cache.get(text);if(cached)return cached;
 const exact=lower.get(text.trim().toLocaleLowerCase('en'));
 if(exact){const result=text.replace(text.trim(),matchCase(text.trim(),exact));cache.set(text,result);translatedOutputs.add(result);return result;}
 const convert=(matched:string)=>{
  const literal=lower.get(matched.toLocaleLowerCase('en'));if(literal)return matchCase(matched,literal);
  for(const item of templates){const m=item.regex.exec(matched);if(m){const values=Object.fromEntries(item.slots.map((slot,i)=>[slot,translate(m[i+1],'nb',depth+1)]));return item.value.replace(/\{(\d+|starter)\}/g,(_,slot:string)=>values[slot]??slot);}}
  return matched;
 };
 // A fresh RegExp avoids a nested template translation changing the outer lastIndex.
 const result=text.replace(new RegExp(matcher.source,matcher.flags),convert);cache.set(text,result);if(result!==text)translatedOutputs.add(result);return result;
}
/** Only display strings are translated. State IDs, choice labels and saved flags stay canonical. */
export function t<T>(value:T):T{return (typeof value==='string'?translate(value):value) as T;}

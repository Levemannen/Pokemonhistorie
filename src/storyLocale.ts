import norwegian from './manuscript-nb.json';
export type TextBlock={id:string;text:string;when?:string};
export type LocalScene={title:string;body:string;passages:Record<string,string>;choices:Record<string,{label:string;immediateText:string;responses?:Record<string,string>}>};
export const localizedManuscript=norwegian as Record<string,LocalScene>;
export function norwegianChoice(id:string):string|undefined{return localizedManuscript[id.split('.')[0]]?.choices[id]?.label;}

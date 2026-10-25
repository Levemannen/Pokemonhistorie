import {byId,sceneTitle,storyText,type State,type Starter} from './story';
import {restoreSave} from './save';
import {baseWord,meanings} from './words';
export const storageKeys={game:'starlight-story-v1',endings:'starlight-endings-v1',books:'starlight-books-v1',words:'starlight-my-words-v1',reader:'starlight-reader-v1',pace:'starlight-reading-pace'};
export type ReaderPreferences={readingMode:boolean;textSize:'normal'|'large'|'extra'};
export const defaultReader:ReaderPreferences={readingMode:false,textSize:'normal'};
export type FinishedBook={id:string;completedAt:string;state:State};
export type LearnedWord={word:string;example:string;scene:string;sceneTitle:string;starter:Starter;learnedAt:string};
function parse(raw:string|null):unknown{try{return JSON.parse(raw||'null');}catch{return null;}}
export function parseReader(raw:string|null):ReaderPreferences{
 const x=parse(raw) as Partial<ReaderPreferences>|null;
 return {readingMode:x?.readingMode===true,textSize:x?.textSize==='large'||x?.textSize==='extra'?x.textSize:'normal'};
}
export function parseBooks(raw:string|null):FinishedBook[]{
 const value=parse(raw);if(!Array.isArray(value))return [];
 const books:FinishedBook[]=[];const seen=new Set<string>();
 for(const item of value){
  if(!item||typeof item.id!=='string'||!item.id||seen.has(item.id)||typeof item.completedAt!=='string')continue;
  const state=restoreSave(JSON.stringify(item.state));if(!state||!byId[state.scene].ending)continue;
  seen.add(item.id);books.push({id:item.id,completedAt:item.completedAt,state:{...state,journeyId:item.id}});
 }
 return books;
}
export function archiveJourney(books:FinishedBook[],state:State,completedAt:string):FinishedBook[]{
 if(!state.journeyId||!byId[state.scene].ending||books.some(book=>book.id===state.journeyId))return books;
 return [{id:state.journeyId,completedAt,state:JSON.parse(JSON.stringify(state)) as State},...books];
}
export function parseLearnedWords(raw:string|null):LearnedWord[]{
 const value=parse(raw);if(!Array.isArray(value))return [];
 const seen=new Set<string>();return value.filter((x):x is LearnedWord=>{
  if(!x||typeof x.word!=='string'||!meanings[x.word]||seen.has(x.word)||typeof x.example!=='string'||!x.example||!byId[x.scene]||typeof x.sceneTitle!=='string'||!['Bulbasaur','Charmander','Squirtle'].includes(x.starter)||typeof x.learnedAt!=='string')return false;
  seen.add(x.word);return true;
 });
}
export function learnWord(words:LearnedWord[],rawWord:string,game:State,learnedAt:string):LearnedWord[]{
 const word=baseWord(rawWord);if(!meanings[word]||words.some(entry=>entry.word===word))return words;
 const text=storyText(byId[game.scene],game);
 const sentence=[...new Intl.Segmenter('en',{granularity:'sentence'}).segment(text)].find(({segment})=>segment.split(/\b/).some(token=>baseWord(token)===word))?.segment.trim();
 if(!sentence)return words;
 return [...words,{word,example:sentence,scene:game.scene,sceneTitle:sceneTitle(game),starter:game.starter,learnedAt}];
}

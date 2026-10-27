import {writeFileSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {scenes,initial,storyText,chapters} from '../src/story';
import {translate,setLanguage} from '../src/i18n';
import {StoryChoices} from '../src/StoryChoices';
setLanguage('nb');
const pages=scenes.map(scene=>{const game={...initial('Bulbasaur'),scene:scene.id};return {id:scene.id,title:translate(scene.title),text:translate(storyText(scene,game)),choices:renderToStaticMarkup(<StoryChoices game={game} onChoose={()=>{}} speak={()=>{}} speechAvailable={false}/>).replace(/<[^>]+>/g,' ')};});
writeFileSync('docs/norwegian-review.json',JSON.stringify({chapters:chapters.map(c=>translate(c)),pages},null,2));
console.log(JSON.stringify(pages.slice(0,8),null,2));

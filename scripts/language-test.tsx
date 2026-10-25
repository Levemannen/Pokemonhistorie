import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {norwegianWords,choiceNorwegian} from '../src/norwegian';
import {meanings,baseWord,sentenceParts} from '../src/words';
import {scenes,initial,type Starter} from '../src/story';
import {StoryChoices} from '../src/StoryChoices';
import {ReadableText} from '../src/ReadingTools';
import {MyWords} from '../src/MyWords';
for(const word of Object.keys(meanings))assert(norwegianWords[word]?.length>1,'Missing Norwegian: '+word);
for(const word of Object.keys(norwegianWords))assert(meanings[word],'Missing English: '+word);
assert.equal(baseWord('Whispering'),'whisper');
for(const scene of scenes)for(const choice of scene.choices)for(const starter of ['Bulbasaur','Charmander','Squirtle'] as Starter[]){
 const translated=choiceNorwegian(scene.id,choice,starter);assert(translated.length>8,scene.id+': '+choice.label);assert(!translated.includes('{starter}'));
}
const sample='“We will help,” Lumi says. Shinx is safe! Will you stay?';
assert.equal(sentenceParts(sample).map(s=>s.text).join(''),sample);
for(const part of sentenceParts(sample))assert.equal(sample.slice(part.start,part.start+part.text.length),part.text);
const game={...initial('Bulbasaur'),scene:'square'};
const choices=renderToStaticMarkup(<StoryChoices game={game} onChoose={()=>{throw Error('Render must not choose');}} speak={()=>{}} speechAvailable={false}/>);
assert.equal((choices.match(/class="choose-story"/g)||[]).length,3);
assert.equal((choices.match(/class="choice-translation"/g)||[]).length,3);
assert.equal((choices.match(/hidden=""/g)||[]).length,3);
let buttonDepth=0;
for(const tag of choices.matchAll(/<\/?button\b[^>]*>/g)){buttonDepth+=tag[0].startsWith('</')?-1:1;assert(buttonDepth>=0&&buttonDepth<=1,'Help must never be nested inside a navigation button');}
assert.equal(buttonDepth,0);
const reading=renderToStaticMarkup(<ReadableText text={sample} speak={()=>{}} speechAvailable={false} activeSentence={sentenceParts(sample)[1].text}/>);
assert(reading.includes('sentence-speaking'));assert(reading.includes('lang="en"'));assert(reading.includes('ikke opplesning'));
const notebook=renderToStaticMarkup(<MyWords words={[{word:'promise',example:'We keep our promise.',scene:'island',sceneTitle:'The island',starter:'Bulbasaur',learnedAt:'2026-10-25'}]} speak={()=>{}} speechAvailable={false}/>);
assert(notebook.includes('løfte'));assert(notebook.includes('We keep our promise.'));
console.log('PASS: '+Object.keys(meanings).length+' bilingual entries, all 104 translated choices for each starter, sentence offsets/highlighting, separate help controls, disabled audio fallback and bilingual saved words.');

import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {createElement} from 'react';
import en from '../src/manuscript-v2.json';
import nb from '../src/manuscript-nb.json';
import {setLanguage,translate} from '../src/i18n';
import {storyText,available,byId,endingMemories,type State} from '../src/story';
import {bagItems} from '../src/inventory';
import {friendFates} from '../src/epilogues';
import {resolveIllustration} from '../src/illustrations';
import {StoryChoices} from '../src/StoryChoices';
const manifest=JSON.parse(readFileSync('public/images/illustration-manifest.json','utf8'));
const localized=nb as unknown as Record<string,import('../src/storyLocale').LocalScene>;
for(const s of en){const n=localized[s.id];assert.ok(n,s.id);assert.deepEqual(Object.keys(n.choices).sort(),s.choices.map(c=>c.id).sort());assert.deepEqual(Object.keys(n.passages).sort(),s.passages.map(p=>p.id).sort());for(const c of s.choices){assert.ok(n.choices[c.id].label);assert.ok(n.choices[c.id].immediateText);}for(const p of s.passages)assert.ok(n.passages[p.id]);}
const fixtures=JSON.parse(readFileSync('docs/edition-v2-fixtures.json','utf8')) as State[];
for(const state of fixtures){
 for(const language of ['en','nb'] as const){
  setLanguage(language);const text=storyText(byId[state.scene],state);
  assert.ok(!/\{\w+\}/.test(text),state.scene+' unresolved token');
  if(language==='nb')assert.ok(!/\b(the|your|with|from|although|while|through|would|someone|there|which)\b/i.test(text),state.scene+' English text in Norwegian: '+text);
  for(const choice of available(state))if(language==='nb')assert.notEqual(translate(choice.label),choice.label);
  for(const item of bagItems(state))if(language==='nb'){assert.notEqual(translate(item.description),item.description);assert.notEqual(translate(item.note),item.note);}
  for(const fate of friendFates(state))if(language==='nb')assert.notEqual(translate(fate.text),fate.text);
  for(const memory of endingMemories(state))assert.ok(!/\{\w+\}/.test(memory.effect));
  const html=renderToStaticMarkup(createElement(StoryChoices,{game:state,onChoose:()=>{},speak:()=>{},speechAvailable:true}));assert.ok(!html.includes('undefined'));
  const art=resolveIllustration(manifest,state);assert.ok(existsSync('public/'+art.base),art.base);
  assert.equal(art.kind,'painted',state.scene+' unexpected fallback');
  if(state.scene==='ridge')assert.ok(art.base.endsWith(`scene-ridge-${state.starter.toLowerCase()}.png`),'Wrong starter on ridge');
 }
}
setLanguage('en');console.log(`PASS: ${fixtures.length} story/art fixtures in both languages, complete translation fields, choice rendering, inventory and ending text.`);

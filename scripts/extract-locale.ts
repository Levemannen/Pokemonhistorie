import ts from 'typescript';
import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {scenes,choiceText} from '../src/story';
import {choiceNorwegian} from '../src/norwegian';
const target='src/nb.json';const translated:Record<string,string>=existsSync(target)?JSON.parse(readFileSync(target,'utf8')):{};
for(const scene of scenes)for(const choice of scene.choices)for(const starter of ['Bulbasaur','Charmander','Squirtle'] as const){const nb=choiceNorwegian(scene.id,choice,starter);translated[choiceText(choice,starter)]=nb;translated[choice.label.replaceAll('{starter}',starter)]=nb;}
const records=new Map<string,string>();
const files=['narrative.ts','storyDepth.ts','puzzles.ts','inventory.ts','epilogues.ts','artDescriptions.ts','journeyReview.ts',...readdirSync('src').filter(f=>f.endsWith('.tsx')&&f!=='main.tsx')];
const add=(s:string,file:string)=>{s=s.trim();if(s.length<3||!/[A-Za-z]/.test(s)||(!s.includes(' ')&&!['Ending','Normal','Gentle','Extra slow','Comfortable','Large','Examined','Listen','Map','Bookshelf','History','Tools','Clue','Keepsake','Tool','Ending & friends','Travel map','Story journal','Adventure bag'].includes(s)))return;if(/^(?:[.#]|https?:|images\/|[a-z]+-[a-z]+\s)|=>|<\w/.test(s))return;records.set(s,file);};
for(const file of files){const source=ts.createSourceFile(file,readFileSync('src/'+file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);const visit=(n:ts.Node)=>{
 if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n)||ts.isJsxText(n)){
  if(ts.isJsxAttribute(n.parent)&&!['alt','title','aria-label'].includes(n.parent.name.getText(source)))return;
  add(n.text,file);
 }
 if(ts.isTemplateExpression(n))add(n.head.text+n.templateSpans.map((s,i)=>`{${i}}`+s.literal.text).join(''),file);
 ts.forEachChild(n,visit);
};visit(source);}
// The canonical scene text is legacy; only active titles and the functions after it need translation.
const story=readFileSync('src/story.ts','utf8');const source=ts.createSourceFile('story.ts',story.slice(story.indexOf('export const byId=')),ts.ScriptTarget.Latest,true);
const visit=(n:ts.Node)=>{if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))add(n.text,'story.ts');if(ts.isTemplateExpression(n))add(n.head.text+n.templateSpans.map((s,i)=>`{${i}}`+s.literal.text).join(''),'story.ts');ts.forEachChild(n,visit);};visit(source);
for(const s of scenes){add(s.title,'titles');if(s.ending)add(s.ending,'titles');}
const pending=[...records].filter(([key])=>!translated[key]).map(([en,file],index)=>({id:index,en,file}));
writeFileSync(target,JSON.stringify(translated,null,2)+'\n');writeFileSync('docs/locale-pending.json',JSON.stringify(pending,null,2));
console.log(`${Object.keys(translated).length} existing translations; ${pending.length} candidate strings to review.`);

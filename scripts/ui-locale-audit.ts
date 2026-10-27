import ts from 'typescript';
import {readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {translate} from '../src/i18n';
const missing:{file:string;text:string}[]=[];
for(const file of readdirSync('src').filter(f=>f.endsWith('.tsx'))){
 const source=ts.createSourceFile(file,readFileSync('src/'+file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 function visit(node:ts.Node){if(ts.isCallExpression(node)&&node.expression.getText(source)==='t'){
  const collect=(part:ts.Node)=>{if(ts.isStringLiteral(part)&&/[A-Za-z]{3}/.test(part.text)&&translate(part.text,'nb')===part.text)missing.push({file,text:part.text});else if(ts.isConditionalExpression(part)){collect(part.whenTrue);collect(part.whenFalse);}};
  if(node.arguments[0])collect(node.arguments[0]);
 }ts.forEachChild(node,visit);}visit(source);
}
writeFileSync('docs/ui-locale-review.json',JSON.stringify(missing,null,2));console.log(missing);

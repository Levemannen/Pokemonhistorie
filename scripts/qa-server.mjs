// Local-only test host: mimics GitHub Pages under a repository subpath.
import {createServer} from 'node:http';
import {readFileSync,statSync} from 'node:fs';
import {resolve,sep,extname} from 'node:path';
const root=resolve('dist'),prefix='/storybook-qa/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'};
createServer((req,res)=>{
 if(req.url==='/mobile'){
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end('<!doctype html><html lang="nb"><meta charset="utf-8"><title>390px quality check</title><style>body{margin:0;background:#ddd;font:14px sans-serif}iframe{display:block;width:390px;height:820px;border:0;margin:10px auto;background:white}</style><iframe title="Boken på 390 piksler" src="/storybook-qa/"></iframe></html>');return;
 }
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!pathname.startsWith(prefix))throw Error('Outside test site');
  const path=resolve(root,pathname.slice(prefix.length)||'index.html');
  if(!path.startsWith(root+sep)||!statSync(path).isFile())throw Error('Not a file');
  res.setHeader('Content-Type',mime[extname(path)]||'application/octet-stream');res.setHeader('Content-Length',statSync(path).size);res.setHeader('Cache-Control','no-store');
  res.end(req.method==='HEAD'?undefined:readFileSync(path));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4175,'127.0.0.1',()=>console.log('QA host: http://127.0.0.1:4175/storybook-qa/ and /mobile'));

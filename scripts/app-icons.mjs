import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
try{
 for(const [size,file] of [[192,'icon-192.png'],[512,'icon-512.png'],[180,'apple-touch-icon.png']]){
  const page=await browser.newPage({viewport:{width:size,height:size},deviceScaleFactor:1});
  await page.setContent('<style>body{margin:0}svg{display:block;width:100vw;height:100vh}</style>'+readFileSync('public/icons/app-icon.svg','utf8'));
  await page.screenshot({path:'public/icons/'+file});await page.close();
 }
}finally{await browser.close();}

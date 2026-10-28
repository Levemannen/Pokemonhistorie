/* BUILD is injected after Vite builds. All paths are relative to this worker's scope. */
const root=self.registration.scope;
const prefix='starlight-'+new URL(root).pathname+'-';
const cacheName=prefix+BUILD.version;
const url=path=>new URL(path,root).href;
const allowed=new Set(BUILD.all.map(url));
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(cacheName);
 // Installation is atomic: a failed shell download does not replace a working app.
 await cache.addAll(BUILD.core.map(p=>new Request(url(p),{cache:'reload'})));
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const name of await caches.keys())if(name.startsWith(prefix)&&name!==cacheName)await caches.delete(name);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;
 const target=new URL(request.url);
 if(target.origin!==self.location.origin||!target.href.startsWith(root))return;
 const path=request.mode==='navigate'?url('index.html'):target.href;
 if(!allowed.has(path))return;
 event.respondWith((async()=>{
  const cache=await caches.open(cacheName),cached=await cache.match(path);
  if(cached)return cached;
  const response=await fetch(request);
  if(response.ok){try{await cache.put(path,response.clone());}catch{/* Storage failure must not block online reading. */}}
  return response;
 })());
});
let downloading;
const listeners=new Set();
function notify(data){for(const port of listeners){try{port.postMessage(data);}catch{listeners.delete(port);}}}
async function status(){
 const cache=await caches.open(cacheName),keys=new Set((await cache.keys()).map(r=>r.url));
 return {type:'status',ready:BUILD.all.every(p=>keys.has(url(p))),total:BUILD.all.length,done:BUILD.all.filter(p=>keys.has(url(p))).length,bytes:BUILD.bytes};
}
self.addEventListener('message',event=>{
 const port=event.ports[0];
 if(event.data?.type==='ACTIVATE'){self.skipWaiting();return;}
 if(!port)return;
 if(event.data?.type==='STATUS'){event.waitUntil(status().then(s=>port.postMessage(s)).catch(()=>port.postMessage({type:'error'})));return;}
 if(event.data?.type!=='DOWNLOAD')return;
 listeners.add(port);
 if(!downloading)downloading=(async()=>{
  const cache=await caches.open(cacheName);let done=0;
  // Sequential transfers bound memory and permit an interrupted download to resume.
  for(const path of BUILD.all){
   if(!await cache.match(url(path))){
    const response=await fetch(new Request(url(path),{cache:'reload'}));
    if(!response.ok)throw Error('Download failed');
    await cache.put(url(path),response);
   }
   done++;notify({type:'progress',done,total:BUILD.all.length,bytes:BUILD.bytes});
  }
  notify(await status());
 })().catch(()=>notify({type:'error'})).finally(()=>{downloading=null;listeners.clear();});
 event.waitUntil(downloading);
});

import {useEffect,useRef,useState} from 'react';
import type {Language} from './i18n';
import './app-install.css';
type InstallEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export function AppInstall({language}:{language:Language}){
 const nb=language==='nb',say=(en:string,no:string)=>nb?no:en;
 const [registration,setRegistration]=useState<ServiceWorkerRegistration|null>(null);
 const [install,setInstall]=useState<InstallEvent|null>(null),[installed,setInstalled]=useState(false);
 const [ready,setReady]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(false);
 const [progress,setProgress]=useState({done:0,total:0,bytes:0}),[update,setUpdate]=useState(false);
 const reload=useRef(false),port=useRef<MessagePort|null>(null);
 function message(worker:ServiceWorker,type:'STATUS'|'DOWNLOAD'){
  port.current?.close();const channel=new MessageChannel();port.current=channel.port1;
  channel.port1.onmessage=event=>{
   const data=event.data;
   if(data.type==='error'){setBusy(false);setError(true);return;}
   setProgress(data);
   if(data.type==='status'){setReady(data.ready);setBusy(false);}
  };
  worker.postMessage({type},[channel.port2]);
 }
 useEffect(()=>{
  setInstalled(matchMedia('(display-mode: standalone)').matches||Boolean((navigator as Navigator&{standalone?:boolean}).standalone));
  const prompt=(event:Event)=>{event.preventDefault();setInstall(event as InstallEvent);};
  const added=()=>{setInstalled(true);setInstall(null);};
  const changed=()=>{if(reload.current)window.location.reload();};
  window.addEventListener('beforeinstallprompt',prompt);window.addEventListener('appinstalled',added);
  let active=true;
  if(import.meta.env.PROD&&'serviceWorker' in navigator){
   navigator.serviceWorker.addEventListener('controllerchange',changed);
   navigator.serviceWorker.register(new URL('sw.js',document.baseURI),{updateViaCache:'none'}).then(async reg=>{
    if(!active)return;setRegistration(reg);setUpdate(Boolean(reg.waiting));
    reg.addEventListener('updatefound',()=>reg.installing?.addEventListener('statechange',()=>{if(active)setUpdate(Boolean(reg.waiting));}));
    const running=await navigator.serviceWorker.ready;
    if(active&&running.active)message(running.active,'STATUS');
   }).catch(()=>{if(active)setError(true);});
  }
  return ()=>{active=false;port.current?.close();window.removeEventListener('beforeinstallprompt',prompt);window.removeEventListener('appinstalled',added);navigator.serviceWorker?.removeEventListener('controllerchange',changed);};
 },[]);
 async function add(){if(!install)return;await install.prompt();await install.userChoice;setInstall(null);}
 function download(){if(!registration?.active)return;setBusy(true);setError(false);message(registration.active,'DOWNLOAD');}
 return <details className="app-install"><summary>{say('Keep this book on your tablet','Ha boka på nettbrettet')}{ready&&<span> · {say('Ready offline','Klar uten nett')}</span>}{update&&<span> · {say('Update available','Oppdatering klar')}</span>}</summary>
  <div className="app-install-content">
   {installed?<p>{say('You are reading in the app.','Du leser i appen.')}</p>:<>
    {install&&<button onClick={add}>{say('Add to home screen','Legg til på Hjem-skjermen')}</button>}
    <p>{say('On iPad: open this book in Safari, tap Share → Add to Home Screen, then enable Open as Web App if shown. Other tablets: look for Install app or Add to Home screen in your browser menu.','På iPad: åpne boka i Safari, trykk Del → Legg til på Hjem-skjermen, og slå på Åpne som nettapp hvis valget vises. På andre nettbrett: se etter Installer app eller Legg til på startskjermen i nettlesermenyen.')}</p>
    <p>{say('Reading progress stays on this device. An installed app may have its own save, so install before starting a new adventure.','Lesingen lagres på denne enheten. En installert app kan ha sin egen lagring, så installer før du starter et nytt eventyr.')}</p>
   </>}
   <p>{say('Download the illustrations once to read every path without internet. Keep the book open until it says ready.','Last ned bildene én gang for å lese alle veiene uten nett. Hold boka åpen til den sier at alt er klart.')} {progress.bytes>0&&<strong>{Math.ceil(progress.bytes/1024/1024)} MB</strong>}</p>
   <button onClick={download} disabled={!registration?.active||busy||ready}>{ready?say('Book saved for offline reading','Boka er lagret for lesing uten nett'):busy?say('Downloading…','Laster ned …'):say('Download book for offline reading','Last ned boka for lesing uten nett')}</button>
   {busy&&<p role="status">{say('Saving illustrations','Lagrer bilder')}: {progress.done} / {progress.total}<progress max={progress.total||1} value={progress.done}/></p>}
   {ready&&<p role="status">{say('All pages and illustrations are ready offline. Your device can remove downloaded files if storage is low. Offline narration depends on installed voices.','Alle sider og bilder er klare uten nett. Enheten kan fjerne nedlastede filer hvis lagringsplassen blir liten. Opplesning uten nett avhenger av installerte stemmer.')}</p>}
   {error&&<p role="status">{say('The download could not finish. Check your connection and free space, then try again. You can still read online.','Nedlastingen ble ikke ferdig. Sjekk nettforbindelsen og ledig plass, og prøv igjen. Du kan fortsatt lese på nett.')}</p>}
   {update&&<button onClick={()=>{reload.current=true;registration?.waiting?.postMessage({type:'ACTIVATE'});}}>{say('Update app and reopen book','Oppdater appen og åpne boka igjen')}</button>}
  </div>
 </details>;
}

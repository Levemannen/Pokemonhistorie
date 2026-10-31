import fs from 'node:fs';
const source=fs.readFileSync(process.argv[2]||'docs/manuscript-v3/source.md','utf8').replaceAll('\r','');
fs.mkdirSync('docs/manuscript-v3',{recursive:true});
fs.writeFileSync('docs/manuscript-v3/source.md',source);
const chunks=[...source.matchAll(/^## ((?:S\d+|Q_[A-Z0-9]+|E_[A-Z]+|B_[A-Z]+)) · (.+?) \/ (.+)\n([\s\S]*?)(?=^## |^# |$(?![\s\S]))/gm)];
const clean=s=>s.replace(/\*\*/g,'').replace(/\*([^*]+)\*/g,'$1').trim();
const scenes=chunks.map(m=>{
 const [,id,nbTitle,enTitle,body]=m;
 function text(lang,next){
  const marker=new RegExp('(?:### '+lang+'\\n|\\*\\*'+lang+'[:.]\\*\\* ?)');
  const start=marker.exec(body);if(!start)throw Error('Missing '+lang+' '+id);
  let tail=body.slice(start.index+start[0].length);
  if(next)tail=tail.split(/### English\n|\*\*English[:.]\*\*/)[0];
  else tail=tail.split(/\n(?:\*\*(?:Valg|Handlinger|Meny|Før valgene|Invariant|Neste|Reward)|- |---)/)[0];
  return clean(tail);
 }
 const choices=body.split('\n').filter(l=>l.startsWith('- ')).map((line,i)=>{
  const when=/`IF (.*?)`/.exec(line)?.[1]||'TRUE';
  const labels=line.slice(2).split(/: (?=`|GOTO|reduser|B_|[a-z])|: GOTO/)[0].replace(/\s*\(`IF .*?`\)/g,'');
  const [nb,en]=labels.split(' / ');
  const codes=[...line.matchAll(/`([^`]+)`/g)].map(m=>m[1]).filter(s=>!s.startsWith('IF '));
  const effects=codes.join(', ').split(/[,;]/).map(s=>s.trim()).filter(Boolean);
  let mode='SET';const set=[],get=[];
  for(let e of effects){if(e.startsWith('SET ')){mode='SET';e=e.slice(4);}if(e.startsWith('GET ')){mode='GET';e=e.slice(4);}if(e.includes('rescue_count'))continue;e=e.replace(' IF absent','');if(!/^[a-z_0-9]+(?:=[a-z_0-9]+)?$/.test(e))continue;(mode==='GET'?get:set).push(e);}
  const to=/(?:GOTO|RETURN) ((?:S\d+|Q_[A-Z0-9]+|E_[A-Z]+|B_[A-Z]+))/.exec(line)?.[1]||/\): (B_[A-Z]+)/.exec(line)?.[1]||'';
  return {id:`${id}.${i+1}`,label:en||nb,nb:nb||en,to,when,set,get};
 });
 return {id,title:enTitle,nbTitle,chapter:id.startsWith('S')?Math.min(5,Math.ceil(Number(id.slice(1))/5)):id.startsWith('Q')?4:5,en:text('English'),nb:text('Norsk',true),choices};
});
const by=Object.fromEntries(scenes.map(s=>[s.id,s]));
const c=(id,i,patch)=>Object.assign(by[id].choices[i-1],patch);
c('S09',3,{to:'S09',set:['tree_hint']});
c('S19',1,{to:'Q_RETURN'});
by.S19.choices.push({id:'S19.5',label:'Prepare the supplies',nb:'Gjør forsyningene klare',to:'Q_PREP',when:'TRUE',set:[],get:[]});
c('S22',4,{when:'NOT valid_consent'});c('S22',5,{when:'valid_consent'});
c('S23',1,{when:'valid_consent'});
c('S24',1,{to:'E_DAWN',alternate:{when:'helped_altaria AND mira_trust',to:'E_AURORA'}});
c('S24',2,{to:'E_LANTERN',alternate:{when:'know_old_verse',to:'E_SONG'}});
c('S24',3,{to:'E_GARDEN',alternate:{when:'helped_altaria AND knows_shinx_care',to:'E_SANCTUARY'}});
c('S25',1,{to:'FINISH'});
by.Q_PREP.choices.forEach(ch=>{if(!ch.to)ch.to='Q_PREP';});
c('Q_PREP',5,{when:'prepared_route',to:'RETURN_MAIN'});
const menuNames={Q_VILLAGE:['Help in Willowbrook','Hjelp i Willowbrook'],Q_BRIDGE:['Repair the bridge','Reparer broen'],Q_LEAD:['Lead a volunteer team','Led et lag frivillige'],Q_MOON1:['Explore the stone circle','Undersøk steinringen'],Q_MOON2:['Examine the marked cup','Undersøk koppen med tegn'],Q_MOON3:['Return to the island memory','Vend tilbake til øyas minne']};
for(const ch of by.Q_RETURN.choices){if(menuNames[ch.to])[ch.label,ch.nb]=menuNames[ch.to];if(ch.to==='S22'){ch.to='RETURN_MAIN';ch.label='Return to the tower';ch.nb='Tilbake til tårnet';}}
c('Q_STAR',1,{to:'Q_RETURN'});
for(const s of scenes.filter(s=>s.id.startsWith('E_'))){s.choices=[{id:s.id+'.1',label:'See the valley again',nb:'Se dalen igjen',to:'S25',when:'release_done',set:[],get:[]}];}
for(const s of scenes.filter(s=>s.id.startsWith('B_')&&s.id!=='B_GATE')){s.choices=[{id:s.id+'.1',label:'Keep this memory in my book',nb:'Behold dette minnet i boka mi',to:'FINISH',when:'main_complete',set:[...(s.id==='B_BOTH'?['met_lunala','met_solgaleo','badge_star_gate','ultimate_secret_found']:s.id==='B_LUNALA'?['met_lunala','badge_moon_witness']:['met_solgaleo','badge_sun_witness'])],get:[]}];}
// These flags describe independent facts; GET must not leak into subsequent SET clauses.
c('S14',1,{set:['moon_sig_3','know_accident'],get:['moon_rune']});
c('Q_PIKACHU',1,{set:['rescued_pikachu','sun_rescue_1']});
// Production corrections are recorded in docs/manuscript-v3/IMPLEMENTATION.md.
const paragraphs=(id,lang)=>by[id][lang].split('\n\n');
for(const lang of ['en','nb']){
 let p=paragraphs('S01',lang);const sentences=p[1].match(/[^.!?]+[.!?]+/g);p.splice(1,1,...sentences.map((t,i)=>`[IF starter_${['Bulbasaur','Charmander','Squirtle'][i]}] ${t.trim()}`));by.S01[lang]=p.join('\n\n');
 p=paragraphs('S05',lang);p[1]=lang==='en'?"[IF kindness_eevee] Eevee appears on the path and places a little warm lantern in your hand, disappearing before you can thank it. [ELSE] You find a lantern Mira has hung on the fence with your name attached.":' [IF kindness_eevee] Eevee dukker opp ved stien. Den legger en varm, liten lykt i hånden din og forsvinner igjen før du får takket. [ELSE] Du finner en lykt Mira har hengt på gjerdet med navnet ditt på.';by.S05[lang]=p.join('\n\n');
 p=paragraphs('S07',lang);const method=p[2].match(/[^.!?]+[.!?]+/g);p.splice(2,1,...method.slice(0,3).map((t,i)=>`[IF starter_${['Bulbasaur','Charmander','Squirtle'][i]}] ${t.trim()}`),method[3].trim());
 const ending=p.splice(-2);by.S07[lang]=p.join('\n\n');for(const ch of by.S07.choices.slice(0,2))ch[lang==='en'?'response':'nbResponse']=ending[0]+(ch.id==='S07.1'?'\n\n'+ending[1]:'');
 p=paragraphs('S08',lang);const response=p.splice(-2);by.S08[lang]=p.join('\n\n');for(const ch of by.S08.choices.slice(0,2))ch[lang==='en'?'response':'nbResponse']=response[0]+(ch.id==='S08.1'?'\n\n'+response[1]:'');
 p=paragraphs('S09',lang);const reward=p.pop();by.S09[lang]=p.join('\n\n');for(const ch of by.S09.choices.slice(0,2))ch[lang==='en'?'response':'nbResponse']=reward;
 p=paragraphs('S12',lang);const repair=p.slice(2);by.S12[lang]=p.slice(0,2).join('\n\n');by.S12.choices[0][lang==='en'?'response':'nbResponse']=repair.join('\n\n');by.S12.choices[1][lang==='en'?'response':'nbResponse']=lang==='en'?"While you copy the mechanism, a volunteer helps Psyduck fit the wheel. The small basket carries letters, never people.":'Mens du tegner av mekanismen, hjelper en frivillig Psyduck med å sette på hjulet. Den lille kurven frakter brev, aldri mennesker.';
 p=paragraphs('S15',lang);p[2]=lang==='en'?'Your partner looks toward the path. Along the horizon, a wave of darkness washes across the forest. For one instant the lanterns beside the river go out as well.':'Partneren din ser mot stien. I horisonten skyller en mørk bølge over skogen. For et øyeblikk slukner også lyktene ved elven.';by.S15[lang]=p.join('\n\n');
 p=paragraphs('S17',lang);const opened=p.pop();by.S17[lang]=p.join('\n\n');by.S17.choices.forEach(ch=>ch[lang==='en'?'response':'nbResponse']=opened);
 by.S17.choices[2][lang==='en'?'response':'nbResponse']=(lang==='en'?"You fetch the crank from the shed. {starter} holds the frame steady while you clear the grit, fit the gear and test it slowly. The handle turns. ":'Du henter sveiven i boden. {starter} holder rammen stødig mens du fjerner grusen, setter inn tannhjulet og prøver det langsomt. Håndtaket går rundt. ')+opened;
 p=paragraphs('S22',lang);p[3]=(lang==='en'?'You show Shinx only the plans you have actually prepared.':'Du viser Shinx bare de løsningene dere faktisk har klargjort.')+'\n\n'+(lang==='en'?'[IF warmth_sky_ready] For Sky, the basket has been tested and the stones wrapped in layers that cannot burn him.\n\n[IF warmth_heart_ready] For Heart, the volunteers Ada and Bo have agreed to take shifts and the lanterns have been tested.\n\n[IF earth_backup_ready] For Earth, you have read the instructions, warmed the soil, and prepared a backup heater while the plant takes time to sprout.':'[IF warmth_sky_ready] Ved himmelveien har dere prøvd kurven og pakket steinene i flere lag så de ikke kan svi ham.\n\n[IF warmth_heart_ready] Ved hjerteveien har de frivillige Ada og Bo sagt ja til vakt, og lyktene er testet.\n\n[IF earth_backup_ready] Ved jordveien har dere lest instruksjonen, varmet jorden og gjort en reservevarmekilde klar mens planten får tid til å spire.');by.S22[lang]=p.join('\n\n');
 p=paragraphs('S23',lang);p[2]=(lang==='en'?'You ask her to wait just long enough to check the plan.':'Du ber henne vente akkurat lenge nok til å kontrollere planen.')+'\n\n'+(lang==='en'?'[IF warmth_sky_ready] Beneath a blanket lie properly wrapped warm stones.\n\n[IF warmth_heart_ready] Two volunteers have lit and tested the lanterns.\n\n[IF earth_backup_ready] A warm backup heater stands beside the prepared Earth pot.':'[IF warmth_sky_ready] Under et teppe ligger de innpakkede steinene klare.\n\n[IF warmth_heart_ready] To frivillige har tent og prøvd lyktene.\n\n[IF earth_backup_ready] En varm reserveovn står ved den tilberedte jordpotten.')+'\n\n'+(lang==='en'?'Shinx feels the warmth himself. He nods if the plan is safe.':'Shinx kjenner selv på varmen. Han nikker hvis løsningen er trygg.');by.S23[lang]=p.join('\n\n');
 p=paragraphs('Q_PREP',lang);for(let i=1;i<=3;i++)p[i]=`[IF ${['warmth_sky_ready','warmth_heart_ready','earth_backup_ready'][i-1]}] `+p[i];by.Q_PREP[lang]=p.join('\n\n');
 by.Q_RETURN[lang]=by.Q_RETURN[lang].replace('A cable basket carries you to the river and the marked forest trail.','Volunteers guide you down the marked path to the river and forest.').replace('En kabelkurv tar deg til elven og den merkede stien mot skogen.','Frivillige følger deg ned den merkede stien til elven og skogen.');
 by.E_GARDEN[lang]=by.E_GARDEN[lang].replace(' You move the same plant',' [END] You move the same plant').replace(' Dere flytter selve planten',' [END] Dere flytter selve planten');
 by.E_SONG[lang]=by.E_SONG[lang].replace('while Hoothoot watches from the branch overhead','[IF companion_hoothoot] while Hoothoot watches from the branch overhead [END]').replace('mens Hoothoot passer på fra greinen over','[IF companion_hoothoot] mens Hoothoot passer på fra greinen over [END]');
}
by.E_SANCTUARY.en=by.E_SANCTUARY.en.replace("You place the one and only silver seed in the warm pot beside the tower window. It is hard to let go of something you've carried throughout the journey. Your partner places a paw beside your hand. You water the seed once.","It is hard to let go of something you've carried throughout the journey. Your partner places a paw beside your hand as you watch the shoot.");
// A solved puzzle earns knowledge; merely requesting the reward does not.
c('S06',1,{when:'solved_S06'});c('Q_MOON1',1,{when:'solved_Q_MOON1'});c('Q_STAR',1,{when:'solved_Q_STAR'});c('S17',3,{when:'solved_S17'});
for(const s of scenes)for(const ch of s.choices){if(!ch.to)throw Error('Unresolved target '+ch.id);}
fs.writeFileSync('src/manuscript-v3.json',JSON.stringify(scenes,null,2)+'\n');
console.log(`Imported ${scenes.length} scenes and ${scenes.reduce((n,s)=>n+s.choices.length,0)} choices.`);


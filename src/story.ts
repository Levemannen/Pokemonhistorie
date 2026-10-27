import {narrativeText} from './narrative';
export type Starter = 'Bulbasaur' | 'Charmander' | 'Squirtle';
import type {PuzzleProgress} from './puzzles';
export type HistoryEntry={scene:string;choice:string;flags?:string[];companions?:string[]};
export type State = {language?:'en'|'nb';scene:string; starter:Starter; flags:string[]; companions:string[]; history:HistoryEntry[];puzzles?:Record<string,PuzzleProgress>;journeyId?:string;acknowledgedChapters?:number[]};
export type Choice = {label:string;to:string; flag?:string; companion?:string; needs?:string; starter?:Starter};
export type Scene = {id:string;chapter:number;title:string;text:string;setting:string;detail:string;choices:Choice[];ending?:string};
const c=(label:string,to:string,flag?:string,needs?:string,companion?:string,starter?:Starter):Choice=>({label,to,flag,needs,companion,starter});
// Display copy is separate from the labels stored in existing journeys.
export function choiceText(choice:Choice,starter:Starter):string{
 const wording:Record<string,string>={
  'Invite Eevee to come with us':'“Come with us, Eevee.”',
  'Borrow Mira’s old star map':'Ask to borrow Mira’s old star map.',
  'Ask where the seed came from':'“Where did this little seed come from?”',
  'Comfort the frightened Pokémon':'Comfort {starter}, then ask Mira for help.',
  'Examine the silver seed':'Look closely at the little silver seed.',
  'Welcome Pikachu to the team':'“There’s a place for you with us, Pikachu.”',
  'Ask Pikachu to protect the forest':'“Will you keep Moonwood safe while we are away?”',
  'Read how to open the lens gently':'Read how to open the sphere gently.',
  'Show Lumi the astronomer’s notebook':'Share what the astronomer’s notes taught us.',
  'Leave the tools and plant a thank-you seed':'Take the lens and plant an ordinary seed in thanks.',
  'Sit beside Lumi and listen':'Sit beside Lumi and give her time to speak.',
  'Tell Lumi she will not face this alone':'“You won’t have to face this alone, Lumi.”',
  'Let Shinx choose what he needs':'“What would help you feel safe, Shinx?”',
  'Promise to help both Pokémon':'“We’ll help both of you. That’s a promise.”',
 };
 const text=(wording[choice.label]||choice.label).replaceAll('{starter}',starter);
 return /[.!?”]$/.test(text)?text:text+'.';
}
const s=(id:string,chapter:number,title:string,text:string,setting:string,detail:string,choices:Choice[],ending?:string):Scene=>({id,chapter,title,text,setting,detail,choices,ending});
export const chapters=['The Night the Stars Fell','Whispers in the Woods','The River Remembers','Above the Sleeping Clouds','A Light to Bring Home'];
export const scenes:Scene[]=[
s('lantern',1,'A night without stars','Tonight is the Starlight Festival, but every star above Willowbrook has vanished. A silver seed lands at your feet, warm as a tiny heartbeat. Your new friend, {starter}, nudges it toward the dark forest.','village','lantern',[
c('Comfort the frightened Pokémon','square','kind'),c('Examine the silver seed','square','curious'),c('Check the hill for fallen stars','hill','brave')]),
s('square',1,'The lantern keeper','Mira, the lantern keeper, unfolds a map with a hole where Starfall Tower should be. “The sky is not broken,” she says. “Someone has hidden its light.” A little Eevee shivers beneath her table.','village','map',[
c('Invite Eevee to come with us','gate','kind',undefined,'Eevee'),c('Borrow Mira’s old star map','gate','map'),c('Ask where the seed came from','hill','curious')]),
s('hill',1,'A message in the grass','On the hill, a trail of silver dust circles a sleeping Hoothoot. It opens its round eyes and hoots three notes: low, high, low. {starter} taps the same rhythm, and the seed flickers.','hills','owl',[
c('Remember the three-note song','gate','song'),c('Share a snack with Hoothoot','gate','kind',undefined,'Hoothoot')]),
s('gate',1,'The way beyond the gate','Two trails lead away from the last warm lantern. A thorny arch shelters a quiet path; on the ridge, fallen branches block the wind. Your companion waits for you to choose a way together.','forest','gate',[
c('Help Bulbasaur untangle the arch','grove','gentle',undefined,undefined,'Bulbasaur'),c('Let Charmander light the ridge','ridge','ember',undefined,undefined,'Charmander'),c('Let Squirtle wash the muddy sign','brook','river',undefined,undefined,'Squirtle'),c('Follow the seed’s soft glow','grove','trust')]),
s('ridge',1,'A careful little flame','Charmander holds its tail well away from the dry leaves while you clear a safe circle. In the warm light, a carved arrow points toward a fallen nest. A feather trembles under one of the branches.','hills','nest',[
c('Lift the branch and repair the nest','grove','nest'),c('Mark the nest so Mira can help','brook','marker')]),
s('brook',1,'Letters under the mud','The clean sign reads: “Moonwood welcomes those who listen.” Beneath it, a stream carries a glass bottle with a moon-shaped stopper. Inside is a message: “Please bring the dawn back. —L.”','river','bottle',[
c('Keep the message safe','grove','letter'),c('Float a reply: “We are coming”','grove','reply')]),
s('grove',2,'The whispering trees','Moonwood rustles without a breeze, and each leaf whispers a different direction. A Pikachu is tangled in a ribbon of silver ivy beside the trail. Beyond it, blue mushrooms blink like a path of stepping-stones.','forest','ivy',[
c('Stop and free Pikachu','rescue','kind'),c('Study the blinking mushrooms','mushrooms','curious'),c('Ask the trees to speak one at a time','roots','listener')]),
s('rescue',2,'A spark of friendship','You loosen the ivy while {starter} holds it steady. Pikachu lands safely, cheeks glowing with relief. It points toward the mushrooms, then offers to lend you its sparks.','forest','pikachu',[
c('Welcome Pikachu to the team','mushrooms','rescue',undefined,'Pikachu'),c('Ask Pikachu to protect the forest','roots','forestGuard')]),
s('mushrooms',2,'The mushroom alphabet','The mushrooms blink in groups of one, two, and three. A stone says, “The smallest light begins the journey.” {starter} watches as the three-light cluster flashes first, trying to hurry you.','forest','mushrooms',[
c('Follow the constellation we solved','roots','rune','puzzle:mushrooms'),c('Follow the brightest cluster','hollow','detour'),c('Wait and draw the whole pattern','roots','map'),c('Let our kindness guide a path through the ivy','clearing','kindTrail','care')]),
s('hollow',2,'The hollow that giggles','The brightest path ends inside a hollow tree full of giggling Gastly. They were playing a game, not setting a trap. One apologizes and offers a shortcut in exchange for a funny story.','forest','ghost',[
c('Tell a story about our first adventure','echoArchive','humor'),c('Explain why we must help the sky','roots','honest')]),
s('echoArchive',2,'The Echo Archive','Gastly’s laughter becomes a staircase of echoes inside the hollow tree. In a little reading room, borrowed moonstone lights a notebook and a map of old mountain paths. The friends you made through laughter will lend you one discovery before you return to the grove.','cave','notebook',[
c('Borrow the astronomer’s notebook about Lumi','clearing','understanding'),c('Copy a hidden mountain route','clearing','archiveMap'),c('Learn the archive’s three-note greeting','clearing','echoTune')]),
s('roots',2,'The oldest tree','An ancient tree arches over a door of woven roots. A carved face asks, “What grows brighter when it is shared?” In your pocket, the silver seed pulses whenever your friends stand close.','forest','tree',[
c('Answer: “Kindness”','clearing','wisdom'),c('Answer: “A flame”','clearing','warmth'),c('Ask Bulbasaur to speak with the roots','clearing','rootFriend',undefined,undefined,'Bulbasaur')]),
s('clearing',2,'A gift with two halves','In a clearing, an ancient tree offers you a crescent lens from a mossy pedestal. “Shared kindness, shared warmth: both can brighten a dark place,” it says. You take the lens and have room for one bulky tool, or you can plant an ordinary seed from your pouch as thanks.','forest','lens',[
c('Take the lens and a rescue rope','bank','rope'),c('Take the lens and a rune key','bank','key'),c('Leave the tools and plant a thank-you seed','bank','garden')]),
s('bank',3,'The river of borrowed light','The Lumen River has swallowed the stars’ reflections. A stranded Lapras calls from a shallow pool while a broken ferry rocks against the bank. Far upstream, a waterfall glows behind a curtain of mist.','river','lapras',[
c('Help Lapras reach deep water','lapras','kind'),c('Repair the ferry with fallen wood','ferry','builder'),c('Explore the waterfall on foot','falls','brave'),c('Use our clues to find the astronomer’s cave','cave','clueTrail','caveClues')]),
s('lapras',3,'A song across the water','You dig a channel with {starter}, and cold river water trickles into the pool. Lapras slides free and sings a grateful note. It offers a ride if you promise to listen to the river.','river','song',[
c('Accept Lapras’s friendship','island','riverFriend',undefined,'Lapras'),c('Ask Lapras to guide lost travelers','ferry','riverGuard'),c('Use Squirtle’s water to widen the channel','island','clearWater',undefined,'Lapras','Squirtle')]),
s('ferry',3,'The ferrymaker’s knot','The ferry is sound, but its rope has frayed. You remember that a good knot must hold without hurting the tree. An anxious Psyduck watches from the pier, clutching a floating plank.','river','ferry',[
c('Use our rescue rope for a sturdy knot','island','safeCrossing','rope'),c('Weave a new rope from long reeds','island','patient'),c('Help Psyduck cross first','reedWorkshop','duck',undefined,'Psyduck')]),
s('reedWorkshop',3,'Psyduck’s Reed Workshop','Together you weave a safe ferry rope before crossing with Psyduck to its sheltered reed workshop. “I built this to make the crossing less frightening,” it admits, offering three little projects. You can leave the river a gift, find a quieter way onward, or learn a calming tune together.','river','ferry',[
c('Build floating lanterns with Psyduck','island','floatingLanterns'),c('Map Psyduck’s quiet reed channel','island','reedGuide'),c('Learn Psyduck’s calming three-note tune','island','duckRhythm')]),
s('falls',3,'Behind the silver curtain','The waterfall hides a narrow ledge and a door marked with three tiny bells. The middle bell is carved higher than the others. A wrong note will simply send you back to the river, but the right song might reveal a secret.','river','waterfall',[
c('Enter the doorway opened by our melody','cave','door','puzzle:falls'),c('Leave the bells and follow the river','island','splash'),c('Sing the melody learned on our journey','cave','songDoor','melodyHelp'),c('Explore the safe path around the falls','island','mistTrail')]),
s('cave',3,'The astronomer’s notebook','Behind the door, a notebook lies dry in a circle of moonstone. Its last page reads: “Lumi took the light to save a friend. Fear made the sphere close.” A sketch shows a small Clefairy at Starfall Tower.','cave','notebook',[
c('Read how to open the lens gently','island','understanding'),c('Copy the tower’s hidden stairway','island','secretStair')]),
s('island',3,'The island of echoes','A shallow causeway links the river path to a tiny island, where riders and walkers can rest. Your lens catches a golden speck: a memory of Clefairy helping an injured Shinx toward the mountains. “Thank you, Lumi,” Shinx whispers, and you learn her name. {starter} presses close as the memory fades.','river','memory',[
c('Promise to help both Pokémon','bridge','promise'),c('Collect the golden speck for later','bridge','stardust'),c('Ask the river to keep their secret','bridge','privacy')]),
s('bridge',4,'A bridge made of wind','A rope bridge sways above a sea of clouds. Its ropes are secure, but gusts rock the boards; a stone path offers another way around the mountain. A tiny flag shows that the wind rises and falls in a steady rhythm.','mountain','bridge',[
c('Wait for the calm and cross together','shelter','steady'),c('Follow the promise trail Lapras revealed','stairs','promiseRoute','promiseTrail'),c('Take the longer stone path','windwatch','patient'),c('Let Bulbasaur anchor the bridge with vines','shelter','vineBridge',undefined,undefined,'Bulbasaur')]),
s('windwatch',4,'Altaria’s Wind-Watch Perch','The longer path reaches a lookout where Altaria is gathering a lost flock above the clouds. A drifting cloud-platform could carry you toward the tower roof, but the little birds need a guide first. Downhill, marked steps lead to a yellow scarf and a sheltered berry nook.','mountain','altaria',[
c('Help Altaria guide the flock to the cloud-platform','roof','flockGuide'),c('Read the wind marks and take the stone steps','stairs','windChart'),c('Ask Altaria for a sheltered path to the berry nook','shelter','windShelter')]),
s('stairs',4,'Footprints in the frost','The stone path curls past small footprints in the frost. Shinx has been here, leaning on a friend. You find a dropped yellow wool scarf with Shinx’s name stitched inside.','mountain','scarf',[
c('Carry the scarf to its owner','shelter','scarf'),c('Tie it to a marker for other travelers','shelter','trail'),c('Keep our promise and follow the hidden stair to Lumi','tower','keptPromise','promiseRoute')]),
s('shelter',4,'The cloud shepherd','In a sheltered nook, an old Altaria tends a bowl of cloudberries. “A bright sky cannot mend a frightened heart by force,” she tells you. She offers a feather, but asks you to leave something helpful in return.','mountain','altaria',[
c('Trade a little food for the feather','observatory','feather'),c('Repair her cracked berry bowl','observatory','craft'),c('Tell her what we learned about Lumi','observatory','counsel','understanding')]),
s('observatory',4,'The sleeping observatory','The observatory’s great roof is stuck closed. Three controls wait beneath a painting of dawn: a sun wheel, a moon lever, and a star button. Your lens fits perfectly into an empty socket.','tower','gears',[
c('Open the roof with our repaired mechanism','roof','alignment','puzzle:observatory'),c('Accept Pikachu’s help with the old motor','roof','spark','pikachuHelp'),c('Look for a hand crank with {starter}','roof','teamwork'),c('Climb the safe outside stair together','roof','outsideStair')]),
s('roof',4,'A sky full of questions','The roof opens onto a sky as dark as ink. Your lens projects a path of silver stepping-stones toward Starfall Tower. Some stones glow warmly; others flicker whenever you rush.','tower','constellation',[
c('Cross slowly, checking on every friend','tower','careful'),c('Find the sheltered stair beneath the roof','tower','sheltered'),c('Follow the hidden route our clues reveal','tower','secretRoute','secretWay'),c('Ask Charmander to warm the frosted stones','tower','warmPath',undefined,undefined,'Charmander')]),
s('tower',4,'Someone behind the door','Inside the tower, you hear a small voice counting stars. “Just one more night,” it whispers. Through the open door, a voice says, “My yellow scarf is here, but Shinx lost his matching one.” A scarf hangs from a broken chair beside you.','tower','door',[
c('Knock and introduce ourselves','lumi','respect'),c('Call gently: “Lumi, we want to help”','lumi','gentleVoice'),c('Return the scarf before speaking','lumi','returnedScarf','scarf')]),
s('lumi',5,'The keeper of lost starlight','Lumi the Clefairy stands beside a glowing glass sphere. Inside it swirl all the missing stars; beside it, a tired Shinx sleeps under a blanket. “The light keeps him warm,” Lumi says. “If I let go, what if I lose him?”','tower','clefairy',[
c('Sit beside Lumi and listen','listen','empathy'),c('Show Lumi the astronomer’s notebook','listen','explain','understanding'),c('Suggest moving the sphere to the village','plan','villagePlan'),c('Keep our river promise and share the heart ring','heart','promiseFulfilled','keptPromise')]),
s('listen',5,'A brave thing to admit','Lumi explains that Shinx hurt his paw during the meteor shower. She borrowed starlight to warm him, but the sphere shut tight when she became afraid. {starter} offers a gentle greeting, and Shinx opens his eyes.','tower','shinx',[
c('Tell Lumi she will not face this alone','plan','support'),c('Let Shinx choose what he needs','plan','agency'),c('Share the feather’s soft warmth','plan','cloudWarmth','feather')]),
s('plan',5,'Three ways to make a dawn','The sphere has three rings: sky, heart, and earth. Opening the sky ring returns the stars at once; the heart ring lets friends share their warmth. The earth ring will plant the light somewhere new, changing the valley forever.','tower','rings',[
c('Prepare to release the stars to the sky','sky','skyPlan'),c('Gather everyone around the heart ring','heart','heartPlan'),c('Carry the earth ring to the garden balcony','earth','earthPlan'),c('Follow our plan and bring the closed sphere to Mira','endLantern','villageTogether','villagePlan')]),
s('sky',5,'The sky ring','The sky ring trembles under your fingers. Lumi needs a safe source of warmth for Shinx before she can let go. You have time to offer comfort, or to return the stars and carry Shinx down together.','tower','sky',[
c('Make a warm nest with the cloud feather','endAurora',undefined,'feather'),c('Let Charmander keep Shinx safely warm','endAurora',undefined,undefined,undefined,'Charmander'),c('Release the stars and carry Shinx home','endDawn'),c('Hum a healing lullaby as we open the ring','endSong')]),
s('heart',5,'The heart ring','The heart ring glows when your companions stand together. Lumi puts one small hand beside yours, and the light becomes a quiet heartbeat. You can keep this circle in the tower or share it with the whole village.','tower','heart',[
c('Build a sanctuary here with Lumi','endSanctuary'),c('Link Pikachu’s spark to the village lanterns','endLantern',undefined,'pikachuHelp'),c('Sing the three-note song together','endSong',undefined,'melodyHelp'),c('Bring the circle of warmth to Willowbrook','endLantern')]),
s('earth',5,'A seed for tomorrow','On the balcony, your silver seed unfolds into a tiny star-shaped leaf. The earth ring can grow a living light, but it will need friends to tend it every day. Lumi smiles with hope and asks where it should take root.','garden','seed',[
c('Plant a starlight garden in Willowbrook','endGarden'),c('Let Bulbasaur grow a living sky-vine','endGarden',undefined,undefined,undefined,'Bulbasaur'),c('Save the seed and open a tower sanctuary','endSanctuary'),c('Plant star reeds along Psyduck’s lantern trail','endGarden','reedGarden','floatingLanterns')]),
s('endDawn',5,'The dawn you carried home','You open the sphere, and thousands of stars race back to their places. Together you carry Shinx to Mira, who wraps his paw while Lumi holds his hand. At the next festival, one lantern is named for {starter}: the friend who helped you bring everyone home.','village','dawn',[],'The Homeward Dawn'),
s('endAurora',5,'A ribbon across the sky','Shinx snuggles into his new warm nest, and Lumi finally releases her tight grip. The stars unfurl into ribbons of green and gold, a thank-you written across the sky. You and {starter} stay until morning, learning that courage can mean helping someone let go.','mountain','aurora',[],'The Aurora Promise'),
s('endSong',5,'The song the stars remembered','Your song travels through the sphere and down the river, gathering every voice it meets. The stars rise on its notes, while a small piece of warmth stays with Shinx. Every year, Pokémon and people sing together on the riverbank, and you always know the first three notes.','river','music',[],'The River of Stars'),
s('endSanctuary',5,'A home above the clouds','You turn the abandoned tower into a sanctuary for lost and frightened Pokémon. The sphere opens a little each night, sending stars home while lending gentle light to those who need it. Lumi becomes its keeper, and there is always a bed waiting for you and {starter}.','tower','sanctuary',[],'The Starlight Sanctuary'),
s('endLantern',5,'A thousand little lights','You bring the warmth down to Willowbrook, where every home offers a lantern. The shared light frees the stars, and no single friend has to hold the whole sky again. Lumi and Shinx join the festival as guests of honor, while {starter} proudly leads the lantern parade.','village','parade',[],'The Lantern League'),
s('endGarden',5,'Where tomorrow grows','You plant the silver seed, and a tree of tiny constellations grows above the village garden. Each evening it lends a little light to the sky and a little warmth to its visitors. Lumi, Shinx, and your friends take turns tending it, and {starter} helps you plant the very next seed.','garden','starTree',[],'The Living Constellation')
];
export const byId=Object.fromEntries(scenes.map(x=>[x.id,x]));
export function historyChoiceText(scene:string,label:string,starter:Starter):string{
 const choice=byId[scene]?.choices.find(c=>c.label.replaceAll('{starter}',starter)===label);
 return choice?choiceText(choice,starter):label;
}
export const artAliases:Record<string,string>={echoArchive:'cave',reedWorkshop:'ferry',windwatch:'shelter'};
export const illustrationScene=(id:string)=>artAliases[id]||id;
export const sceneTitle=(state:State)=>state.scene==='stairs'&&state.flags.includes('promiseRoute')?'The Moonlit Promise Trail':byId[state.scene].title;
export const initial=(starter:Starter):State=>({scene:'lantern',starter,flags:[],companions:[],history:[]});
export const qualities:Record<string,string[]>={care:['flockGuide','floatingLanterns','reedGarden','windShelter','kind','gentle','trust','nest','reply','listener','rescue','forestGuard','rootFriend','garden','kindTrail','riverFriend','riverGuard','duck','promise','privacy','scarf','feather','counsel','careful','respect','gentleVoice','returnedScarf','empathy','support','agency','cloudWarmth','heartPlan'],insight:['archiveMap','reedGuide','duckRhythm','echoTune','windChart','curious','map','river','marker','letter','song','rune','humor','honest','wisdom','key','builder','safeCrossing','patient','clearWater','door','songDoor','understanding','secretStair','stardust','trail','craft','alignment','spark','teamwork','secretRoute','clueTrail','explain','earthPlan'],courage:['brave','ember','detour','warmth','rope','splash','steady','vineBridge','warmPath','sheltered','lookout','skyPlan']};
export const hasNeed=(state:State,need:string):boolean=>{
 if(need==='charmanderWarmth')return state.starter==='Charmander'&&state.history.at(-1)?.choice==='Let Charmander keep Shinx safely warm';
 if(need==='caveClues')return ['map','letter','archiveMap'].some(f=>state.flags.includes(f));
 if(need==='promiseTrail')return state.flags.includes('promise')&&(state.flags.includes('riverFriend')||state.companions.includes('Lapras'));
 if(need==='pikachuHelp')return state.flags.includes('rescue')||state.flags.includes('guardReturned');
 if(need==='melodyHelp')return ['song','nestGift','echoTune','duckRhythm'].some(f=>state.flags.includes(f))||state.companions.includes('Hoothoot');
 if(need==='secretWay')return ['key','archiveMap','secretStair','reedGuide'].some(f=>state.flags.includes(f));
 return qualities[need]?qualities[need].some(f=>state.flags.includes(f)):state.flags.includes(need);
};
export const available=(state:State)=>byId[state.scene].choices.filter(c=>(!c.needs||hasNeed(state,c.needs))&&(!c.starter||c.starter===state.starter));
export function advance(state:State,choice:Choice):State{
 if(!available(state).includes(choice)) throw new Error('Unavailable choice');
 const flags=[...new Set([...state.flags,...choice.flag?[choice.flag]:[]])];
 if(choice.to==='observatory'&&flags.includes('forestGuard'))flags.push('guardReturned');
 if(choice.to==='clearing'&&flags.includes('nest'))flags.push('nestGift');
 if(choice.to==='lumi'&&flags.includes('reply'))flags.push('replyTrust');
 if(choice.flag==='secretRoute')flags.push('understanding');
 return {...state,scene:choice.to,flags:[...new Set(flags)],companions:[...new Set([...state.companions,...choice.companion?[choice.companion]:[]])],history:[...state.history,{scene:state.scene,choice:choice.label.replace('{starter}',state.starter),flags:[...state.flags],companions:[...state.companions]}]};
}
export const storyText=(scene:Scene,state:State)=>narrativeText(scene,state,byId);
export const companionLine=(state:State)=>{
 const place=byId[state.scene].setting;
 const line=state.starter==='Bulbasaur'?(place==='forest'?'Bulbasaur hums to the roots: “Let’s listen before we hurry.”':'Bulbasaur’s vines curl toward you: “We can help this place grow.”'):state.starter==='Charmander'?(place==='mountain'?'Charmander shields its little flame: “We’ll keep each other warm.”':'Charmander lifts its tail carefully: “There is always a little light.”'):(place==='river'?'Squirtle studies the ripples: “Water always finds another way.”':'Squirtle pats your hand: “Together, one small step at a time.”');
 const friend=state.companions.includes('Lapras')&&place==='river'?' Lapras answers with a reassuring hum.':state.companions.includes('Pikachu')&&place==='tower'?' Pikachu offers a tiny spark for the old machines.':state.companions.includes('Hoothoot')?' Hoothoot quietly repeats the three-note melody.':state.companions.includes('Eevee')?' Eevee stays close, keeping watch for friends who need you.':state.companions.includes('Psyduck')?' Psyduck offers its lucky river pebble for courage.':'';
 return line+friend;
};
export type Dialogue={speaker:string;text:string};
export function visibleCompanions(state:State):string[]{
 const pikachuVisiting=state.flags.includes('guardReturned')&&(['observatory','roof','tower','lumi','listen','plan','heart'].includes(state.scene)||state.scene==='endLantern'&&state.history.at(-1)?.choice.includes('Pikachu'));
 return [...new Set([...state.companions.filter(name=>name!=='Lapras'||byId[state.scene].setting==='river'),...pikachuVisiting?['Pikachu']:[],...state.scene==='clearing'&&state.flags.includes('nestGift')?['Hoothoot']:[]])];
}
export function companionConversation(state:State):Dialogue[]{
 const result:Dialogue[]=[];const last=state.history.at(-1);
 if(state.scene==='grove'&&state.flags.includes('nest'))result.push({speaker:state.starter,text:'You stopped for that little nest even when the sky needed us. Small lives matter too.'});
 else if(state.scene==='rescue')result.push({speaker:state.starter,text:state.starter==='Bulbasaur'?'Pikachu is free, and the ivy is safe too. Shall we invite our new friend along?':state.starter==='Charmander'?'Pikachu is safe. I kept my flame away from those dry leaves; now we can talk to our new friend.':'Pikachu can move its ankle again! Shall we ask whether it wants to come with us?'});
 else if(state.scene==='observatory')result.push({speaker:state.starter,text:state.starter==='Bulbasaur'?'This machine thinks like a plant. What part needs a drink before the others can grow?':state.starter==='Charmander'?'Look at how the gears fit inside each other. Which one would be safest to thaw first?':'The water comes up from the floor. What might that tell us about the counterweights?'});
 else if(state.scene==='falls')result.push({speaker:state.starter,text:state.starter==='Squirtle'?'Listen between the splashes. The water is echoing a tune!':'We can listen again. There is no hurry, and wrong notes cannot hurt us.'});
 else if(state.scene==='stairs'&&state.flags.includes('promiseRoute'))result.push({speaker:state.starter,text:'A promise became a real path. Let’s see it through together.'});
 else if(last?.scene==='ferry'&&last.choice.includes('Psyduck'))result.push({speaker:state.starter,text:'You helped Psyduck before crossing yourself. That was a good kind of brave.'});
 else result.push({speaker:state.starter,text:byId[state.scene].ending?'Look how many little choices brought us here. Which adventure shall we try next?':byId[state.scene].chapter===5?'Lumi is frightened, not unkind. Let’s give her time to speak.':'We can take our time. I’m right beside you.'});
 if(state.scene==='echoArchive')result.push({speaker:'Gastly',text:'A good story deserves a good discovery! Choose what interests you; the direct trail never passes through our little archive.'});
 if(state.scene==='windwatch')result.push({speaker:'Altaria',text:'There is more than one way to the tower. Help my little flock find its courage, and we can travel above the wind together.'});
 if(state.flags.includes('guardReturned')&&state.scene==='observatory')result.push({speaker:'Pikachu',text:'You trusted me to guard Moonwood. Now it’s my turn to help you!'});
 else if(visibleCompanions(state).includes('Pikachu')&&['observatory','heart','roof'].includes(state.scene))result.push({speaker:'Pikachu',text:state.scene==='heart'?'You helped me in Moonwood. I can send a small spark to the village lanterns, if we all share the warmth.':'A little spark, not a thunderbolt. We can wake this up gently.'});
 else if(state.companions.includes('Pikachu'))result.push({speaker:'Pikachu',text:state.scene==='mushrooms'?'You loosened the ivy instead of pulling it tight. I won’t forget that! Let me watch for blinking lights.':'If something needs a spark, ask me first. My cheeks are small, but my courage is growing.'});
 if(state.companions.includes('Eevee'))result.push({speaker:'Eevee',text:state.scene==='lumi'?'Remember how frightened I was under Mira’s table? Let’s welcome Lumi the way you welcomed me.':state.scene==='bridge'?'I’ll watch the wind flag. Tell everyone when it’s safe!':'I’ll check behind us so nobody gets left out.'});
 if(state.companions.includes('Hoothoot')||state.flags.includes('nestGift')&&state.scene==='clearing')result.push({speaker:'Hoothoot',text:state.scene==='falls'?'That echo sounds familiar. I can help you remember the melody if you ask for a hint.':'Hoo! I remember our little melody. Ask me if a door needs a song.'});
 if(state.companions.includes('Lapras')&&['bridge','island','endSong'].includes(state.scene))result.push({speaker:'Lapras',text:byId[state.scene].ending?'The stars are back in my river. I will keep the crossing safe whenever you return.':state.flags.includes('promise')?'You promised to help them both. My song will show you a trail made for that promise.':'Listen to the river before choosing. It carries stories as well as light.'});
 if(state.companions.includes('Psyduck'))result.push({speaker:'Psyduck',text:state.scene==='reedWorkshop'?'I made this place while I was afraid to cross. Maybe we can make something here that helps the next traveler.':state.scene==='observatory'?'That is a lot of gears. Let’s do just one step at a time.':'I’m a little nervous. But crossing with you taught me I can try.'});
 if(result.length>2&&state.companions.includes('Eevee')&&state.companions.includes('Pikachu')&&state.scene==='heart')result.push({speaker:'Eevee → Pikachu',text:'You bring the spark; I’ll keep everyone close. A whole team can share one light.'});
 return result;
}
export function consequence(state:State):{title:string;text:string}|null{
 if(state.scene==='observatory'&&state.flags.includes('guardReturned'))return {title:'A kindness comes back',text:'Because you freed Pikachu and trusted it to guard Moonwood, it has returned with a new way to power the roof.'};
 if(state.scene==='bridge'&&hasNeed(state,'promiseTrail'))return {title:'Your promise opened a path',text:'Helping Lapras and promising to save both friends revealed the Promise Trail. It bypasses the observatory and leads to a special conversation with Lumi.'};
 if(state.scene==='stairs'&&state.flags.includes('promiseRoute'))return {title:'A path only your promise revealed',text:'You can now follow the hidden stair straight to the tower, or take a longer detour for the scarf and Altaria’s feather.'};
 if(state.scene==='clearing'&&state.flags.includes('nestGift'))return {title:'A nest becomes a melody',text:'Repairing the nest earned Hoothoot’s song. You can use it at the waterfall or sing it with the heart ring.'};
 if(state.scene==='lumi'&&state.flags.includes('keptPromise'))return {title:'A promise kept',text:'The Promise Trail lets you open the heart ring with Lumi immediately. You can still choose to listen first.'};
 if(state.scene==='lumi'&&state.flags.includes('replyTrust'))return {title:'She remembers your message',text:'Your river reply reached Lumi before you did. Her greeting has changed because she already knows you came to help.'};
 if(state.scene==='earth'&&state.flags.includes('garden'))return {title:'Your first seed is still growing',text:'The thank-you seed you planted in Moonwood becomes part of the living constellation if you choose the garden ending.'};
 if(state.scene==='roof'&&state.flags.includes('flockGuide'))return {title:'A different way above the clouds',text:'Helping Altaria’s lost flock brought you straight to the roof. The frozen observatory was never part of this route.'};
 if(state.scene==='earth'&&state.flags.includes('floatingLanterns'))return {title:'A workshop gift becomes a new home',text:'The lanterns you built with Psyduck now mark a place where star reeds could grow.'};
 if(state.scene==='echoArchive')return {title:'A detour with its own discovery',text:'Sharing a funny story with Gastly opened a reading room that the direct forest paths never visit.'};
 return null;
}
export type Memory={scene:string;title:string;choice:string;effect:string};
export function endingMemories(state:State):Memory[]{
 const memories:Memory[]=[];
 const add=(scene:string,title:string,effect:string)=>{const h=state.history.find(h=>h.scene===scene);if(h)memories.push({scene,title,choice:h.choice,effect});};
 const finish=state.history.at(-1);if(finish)memories.push({scene:finish.scene,title:'The choice that shaped this ending',choice:finish.choice,effect:`This led to ${byId[state.scene].ending||'the next page'}${finish.choice.includes('Charmander')&&state.scene==='endAurora'?' — your starter could lend its warmth':''}.`});
 if(state.flags.includes('flockGuide'))add('windwatch','A flock showed another way','Guiding Altaria’s birds brought you to the tower roof without entering the observatory.');
 if(state.flags.includes('reedGarden'))add('reedWorkshop','A river gift took root','The lanterns you built with Psyduck became a trail for the new star-reed garden.');
 if(state.flags.includes('promiseFulfilled')||state.flags.includes('keptPromise'))add('island','A promise became a path',state.flags.includes('promiseFulfilled')?'Your river promise opened the hidden stair and Lumi’s heart ring.':'Your promise revealed a route straight to Lumi’s door.');
 if(state.flags.includes('spark'))add('rescue','Pikachu returned the kindness',state.flags.includes('forestGuard')?'You trusted Pikachu to guard the forest; it came back and powered the roof.':'The friend you rescued helped you power the observatory.');
 else if(state.flags.includes('guardReturned'))add('rescue','A rescued friend came back','Pikachu returned after guarding Moonwood and offered you another way through the observatory.');
 if(state.scene==='endAurora'&&finish?.choice.includes('feather'))add('shelter','Warmth from the cloud shepherd','Altaria’s feather made a warm nest so Lumi could let the stars go.');
 if(state.scene==='endSong'&&finish?.choice.includes('three-note'))add(state.flags.includes('song')||state.companions.includes('Hoothoot')?'hill':state.flags.includes('nestGift')?'ridge':state.flags.includes('echoTune')?'echoArchive':'reedWorkshop','A melody worth remembering','The melody you earned earlier became the song you shared with the heart ring.');
 if(state.flags.includes('replyTrust'))add('brook','A message reached its reader','Lumi kept your river reply beside Shinx and welcomed you with trust.');
 if(state.scene==='endGarden'&&state.flags.includes('garden'))add('clearing','The first seed mattered','Your thank-you seed became the roots of the valley’s new starlight garden.');
 if(state.companions.includes('Eevee'))add('square','Nobody had to travel alone','The frightened Eevee you welcomed stayed with your team until the last page.');
 if(state.flags.includes('alignment')&&state.flags.includes('puzzle:observatory'))add('observatory',`${state.starter} found its own solution`,state.starter==='Bulbasaur'?'Bulbasaur guided the vine cables from roots to leaves to flowers.':state.starter==='Charmander'?'Charmander thawed the small gear before the big one and released the latch.':'Squirtle filled the water counterweights from the lowest basin upward.');
 if(state.flags.includes('safeCrossing'))add('clearing','A tool with a purpose','The rescue rope you chose became the knot that carried your team across the river.');
 if(state.flags.includes('secretRoute'))add(state.flags.includes('key')?'clearing':state.flags.includes('archiveMap')?'echoArchive':state.flags.includes('secretStair')?'cave':'reedWorkshop','A secret worth carrying',state.flags.includes('key')?'The rune key you packed opened a hidden way across the roof.':state.flags.includes('archiveMap')?'The map you copied in Gastly’s archive revealed a hidden mountain route.':state.flags.includes('secretStair')?'The stairway you copied from the astronomer’s notes revealed a safe tower passage.':'Psyduck’s channel map included a safe route through the tower’s old water passages.');
 if(state.flags.includes('rune')&&state.flags.includes('puzzle:mushrooms'))add('mushrooms','A constellation solved together','You followed the growing stars and earned a forest rune instead of taking the brightest detour.');
 add('gate',`A journey with ${state.starter}`,`Your first companion stayed beside you, offering ${state.starter==='Bulbasaur'?'patient vines and a gentle heart':state.starter==='Charmander'?'careful warmth and a brave heart':'clever water skills and a curious heart'} whenever you needed another idea.`);
 add('lantern','Your very first little light','This first decision began the habits of kindness, curiosity, or courage that grew throughout your journey.');
 return memories.slice(0,6);
}
export function replayInvitation(state:State):string{
 if(!state.flags.includes('forestGuard'))return 'What if you trusted Pikachu to guard Moonwood? A kindness can return much later.';
 if(!state.flags.includes('keptPromise'))return 'What if you befriended Lapras, then promised to help both friends? A hidden mountain trail might appear.';
 if(!state.flags.includes('nestGift'))return 'Try Charmander’s ridge and stop to repair the nest. Someone may remember that kindness.';
 return 'Try a different starter: vines, careful warmth, and water each solve the observatory in a different way.';
}
export const vocabulary:Record<string,string>={crescent:'A curved shape like a thin moon.',constellation:'A group of stars that seems to make a picture.',sanctuary:'A safe, peaceful place where someone is cared for.',observatory:'A building used to watch stars and space.',rune:'A symbol carved or written to carry a special meaning.',lens:'A curved piece of glass that bends or focuses light.',meteor:'A bright streak made when a space rock enters the sky.',reflection:'An image you see in water, glass, or a mirror.',pedestal:'A stand that holds something special.',aurora:'Ribbons of colored light that sometimes appear in the night sky.',frayed:'Worn at the edges, with threads coming loose.',rhythm:'A pattern of sounds or movements that repeats.',ivy:'A climbing plant that grows along trees or walls.',frost:'A thin layer of ice crystals on a cold surface.',empathy:'Understanding and caring about how someone else feels.'};


import {deeperPage} from './storyDepth';
import type {Scene,State} from './story';

// Each edge has an authored result, so converging paths still acknowledge what happened.
// Canonical choice labels remain stable for saved journeys; these arrays follow scene choices.
export const choiceOutcomes:Record<string,string[]>={
 lantern:[
  'You kneel beside {starter} until it feels braver, then walk together to Mira’s lantern stall for help.',
  'The seed glows whenever you turn toward Moonwood, so you take it to Mira, the village lantern keeper, to ask what it means.',
  'You and {starter} climb the grassy hill above the square, looking for the light that fell from the sky.'
 ],
 square:[
  'Eevee steps out from under the stall and joins you; Mira points your little team toward the Moonwood gate.',
  'Mira lends you her map and traces the route through Moonwood, across the river and up to Starfall Tower before showing you to the gate.',
  'Mira says the seed fell from the direction of Starfall Tower, then sends you to the nearby hill to find the beginning of its silver trail.'
 ],
 hill:['You hum low, high, low until you remember the song, then follow the silver trail downhill to Moonwood’s gate.','Hoothoot eats your snack and decides to come along, flying ahead to show you the Moonwood gate.'],
 gate:[
  'Bulbasaur lifts the thorny stems one at a time, opening the arch so you can walk safely into Moonwood.',
  'Charmander lights the ridge with its tail, and you follow the visible path around the thorny arch.',
  'Squirtle washes mud off the sign, revealing an arrow toward a brook that leads into Moonwood.',
  'The seed lights a narrow gap beside the thorny arch, and you and {starter} squeeze through to the forest path.'
 ],
 ridge:['You repair the fallen nest and set it safely in a low tree, then follow the ridge path down into Moonwood.','You mark the nest on a branch for Mira to find, then follow the carved arrow down to the brook.'],
 brook:['You tuck the letter safely into your pocket and follow the stream into Moonwood.','You float your reply in the bottle, and a passing Hoothoot lifts it toward the mountain while you follow the stream into Moonwood.'],
 grove:['You stop beside Pikachu and carefully loosen the silver ivy while {starter} holds the stems still.','Pikachu wiggles free of the loose loop and waves goodbye before you follow the nearby mushrooms.','The leaves fall quiet, loosen Pikachu’s ivy and whisper one clear instruction: follow the roots to the oldest tree.'],
 rescue:['Pikachu chooses to travel with you and leads you a few steps along the glowing mushroom path.','Pikachu promises to guard Moonwood, then points you toward the oldest tree before waving goodbye.'],
 mushrooms:['The stars light up in the order you solved, showing a trail through the ferns to the oldest tree.','You follow the brightest mushrooms into a hollow tree, where the light suddenly breaks into laughter.','Your drawing shows that the blinking lights all point toward the same ancient tree, so you follow that path.','You ask the ivy for a safe path without breaking its stems; it bends aside and leads you straight to a mossy clearing.'],
 hollow:['Gastly laughs at your story and opens a tiny doorway inside the hollow tree to its secret reading room.','Gastly stops giggling when you explain the missing stars and guides you back outside to the oldest tree.'],
 echoArchive:['You borrow notes explaining that Lumi is a Clefairy caring for Shinx, then Gastly leads you out to the lens clearing.','You copy the old mountain route, then Gastly leads you through a short tunnel to the lens clearing.','You practice the archive’s low-high-low greeting, then follow Gastly out to the lens clearing.'],
 roots:[
  '“Kindness grows when we pass it on,” the tree agrees, opening its root door to the clearing behind it.',
  '“One flame can light another without going out,” the tree agrees, opening its root door to the clearing behind it.',
  'Bulbasaur touches the roots with its vines and listens; the tree answers in a low rumble, then lifts its roots into a doorway for you.'
 ],
 clearing:['You pack the crescent lens and rescue rope, then follow the tree’s riverside path toward Starfall Tower.','You pack the crescent lens and rune key, then follow the tree’s riverside path toward Starfall Tower.','You plant an ordinary seed in thanks, keep the silver seed and lens, and follow the tree’s riverside path toward Starfall Tower.'],
 bank:['You and {starter} dig a small channel from the river to Lapras’s shallow pool.','You replace the ferry’s broken boards with fallen wood, then check the rope before anyone steps aboard.','You follow the bank upstream and find a dry ledge behind the waterfall.','You match the crescent on your map or letter to the moon-shaped marks along the bank and find the cave’s open side entrance.'],
 lapras:['Lapras carries you safely to a little island at the foot of the mountain, promising to stay nearby on the river.','Lapras stays to guide other travelers while you walk back to Psyduck’s ferry.','Squirtle widens the channel with a gentle stream, and grateful Lapras carries you to the island at the foot of the mountain.'],
 ferry:['Your rescue rope holds the ferry safely, and you cross to the island at the foot of the mountain.','You braid a strong reed rope and cross safely by ferry to the island at the foot of the mountain.','You weave a safe ferry rope and help Psyduck cross first; it invites you into its reed workshop beside the far bank.'],
 reedWorkshop:['You and Psyduck set floating lanterns along the bank, then follow the short causeway to the island.','Psyduck marks a quiet river route and the tower’s old water passage on your map, then walks with you to the island.','You learn Psyduck’s calming low-high-low tune, then walk together along the causeway to the island.'],
 falls:['Your three notes open the door, and you step into a dry cave behind the falling water.','You leave the bells alone and follow the riverbank to a stone causeway leading onto the island.','You sing the melody you learned earlier; the bells answer, and the door opens into a dry cave.','The safe path curves around the waterfall and reaches a causeway leading onto the island.'],
 cave:['You learn that friends can open the sphere by helping Lumi feel safe, then take the cave’s lower exit onto the island causeway.','You copy the tower’s hidden stairway, then take the cave’s lower exit onto the island causeway.'],
 island:['You promise to help both Lumi and Shinx, then follow their footprints uphill toward Starfall Tower.','You catch the golden speck in your lens, where it lights their footprints up the mountain.','You promise to share the memory only with people who can help, then follow the friends’ footprints up the mountain.'],
 bridge:['You wait for a quiet moment in the wind and cross the bridge together to a sheltered nook.','Lapras sings from the river below, and you follow the glowing Promise Trail along the mountainside.','You take the longer stone path around the bridge and climb to a lookout above the clouds.','Bulbasaur wraps its vines around the bridge posts to keep the boards steady while everyone crosses to a sheltered nook.'],
 windwatch:['You guide Altaria’s little birds onto the cloud-platform, and the grateful flock carries you to the observatory roof.','The wind marks point to a sheltered flight of stone steps, so you follow them toward the tower.','Altaria shows you a path behind the rocks that leads safely to the cloudberry nook.'],
 stairs:['You tuck Shinx’s scarf into your pack and follow the path toward the tower, stopping at a sheltered nook ahead.','You tie the scarf to a trail marker where other travelers can see it, then follow the path to a sheltered nook.','You stay on the hidden stair until it reaches Lumi’s door, keeping the promise you made beside the river.'],
 shelter:['You share some food, and Altaria gives you a warm cloud feather before pointing out the nearby observatory.','You repair Altaria’s berry bowl, and she thanks you by showing you the sheltered way to the nearby observatory.','Altaria listens to what you learned about Lumi and explains that sharing warmth will help, then shows you the nearby observatory.'],
 observatory:['Your repaired mechanism turns, and you climb the stairs as the observatory roof opens.','Pikachu gives the motor a small, steady spark, opening the roof so you can climb up.','You and {starter} find a hand crank and turn it together until the roof opens.','The outside stair brings you to a manual latch above the frozen controls, and you lift it to open the roof.'],
 roof:['You wait for each stepping-stone to glow steadily and cross together to Starfall Tower.','You find a solid stair beneath the platform and follow it around the gap to Starfall Tower.','Your earlier discovery reveals a sheltered passage with a diagram of the sphere’s warm-light setting, which you copy before reaching Starfall Tower.','Charmander gently melts the frost, making the glowing stepping-stones safe to cross to Starfall Tower.'],
 tower:['You knock and say your names; Lumi opens the door and invites you inside.','You call Lumi’s name softly and explain that you came to help; she opens the door.','You hold out the scarf you found, and Lumi opens the door with a grateful smile.'],
 lumi:['You sit quietly beside Lumi, and she begins to tell you why she borrowed the stars.','You share what the astronomer’s notes taught you, and Lumi explains what happened to Shinx.','Lumi agrees that the village could help, but asks you to choose how to carry the warmth before moving the sphere.','Lumi remembers your river promise and trusts you to place your hand on the heart ring.'],
 listen:['You promise Lumi that your friends will help her, and she turns the sphere so you can study its rings together.','Shinx asks to stay warm and close to Lumi, so you study the rings for a way to help them both.','You tuck the cloud feather around Shinx; feeling its warmth, Lumi relaxes and shows you the sphere’s rings.'],
 plan:['You turn the sky ring toward the window, ready to return the missing stars.','You gather close to Lumi and place your hands beside the heart ring.','Lumi carries the sphere with you onto the garden balcony, where you set the earth ring beside your silver seed.','Keeping the sphere closed and Shinx warm, you and Lumi follow your village plan down to Mira’s waiting lanterns.'],
 sky:['You shape the cloud feather into a warm nest for Shinx, giving Lumi the courage to release the stars.','Charmander lends gentle warmth beside Shinx’s blanket nest, and Lumi finally feels ready to let go.','You wrap Shinx warmly first, then release the stars and take the sheltered path down to Mira.','You hum a gentle three-note lullaby; Lumi turns the heart ring to share its warmth, then opens the sky ring in time with your song.'],
 heart:['You and Lumi decide to turn the tower into a safe home for Pokémon who need care.','Pikachu sends a gentle spark through the lantern wires while your circle shares its warmth with the village below.','You sing the three-note melody together, and the heart ring opens to the rhythm you remember.','You carry the sphere down together, and Mira gathers the village around it to share the warmth.'],
 earth:['You carry the silver seed down to Willowbrook and plant it in the village garden.','Bulbasaur helps you carry the seed down to Willowbrook, then guides its roots into a living sky-vine.','You save the seed in a pot and return inside with Lumi to make the tower a safe home.','You carry the silver seed down to Psyduck’s lantern trail, where its roots grow into glowing reeds.'],
};

const pages:Record<string,string>={
 lantern:'The festival has begun, but the stars have vanished and {starter} presses close to you, unsure of the dark sky. A warm silver seed lands at your feet and glows toward Moonwood. Across the square, Mira the lantern keeper is checking her old star map; a grassy hill nearby offers a clear view of the forest.',
 square:'Mira, the lantern keeper, studies the silver seed beside her map: its light points toward Starfall Tower, beyond Moonwood and the river. A little Eevee shivers under her table, afraid of the suddenly dark sky.',
 hill:'On the hill, Hoothoot stands inside a circle of silver dust and sings low, high, low. Your seed flashes with each note, and the silver trail continues downhill toward Moonwood’s gate.',
 gate:'At Moonwood’s edge, a thorny arch blocks the main path, but a ridge and a brook offer ways around it. A muddy sign stands beside the arch, and the silver seed glows toward the trees beyond.',
 ridge:'In Charmander’s careful light, you see a fallen nest caught beneath a branch. A carved arrow points down to a brook, while the ridge path continues into Moonwood.',
 brook:'A moon-carved sign stands beside the brook, where a bottle bobs in the shallow water. Inside is a letter asking for help at Starfall Tower, signed with a single letter: L.',
 grove:'Moonwood’s leaves whisper over one another, and a Pikachu has caught its ankle in a loose loop of silver ivy. It is not hurt, but would welcome help; nearby, glowing mushrooms and a line of old roots offer two ways deeper into the forest.',
 rescue:'Pikachu steps free and thanks you with a tiny spark. It can come with you along the mushroom path, or stay to help other travelers while you visit the oldest tree.',
 mushrooms:'A flat stone among the mushrooms shows three gold stars growing from small to large. The pattern could reveal a path to the oldest tree; a brighter side trail disappears into a hollow trunk.',
 hollow:'Friendly Gastly float inside the hollow tree, admitting that they lit the brightest mushrooms for a game. They offer to show you their secret reading room, or guide you straight to the oldest tree if you explain your journey.',
 echoArchive:'Gastly’s little archive holds the astronomer’s notes, an old mountain map and a musical greeting. You can borrow one discovery before Gastly leads you out to the clearing where the forest keeps its crescent lens.',
 roots:'The oldest tree guards a doorway woven from roots and asks, “What grows brighter when it is shared?” Beyond the doorway, a crescent lens rests on a pedestal; perhaps an answer, or Bulbasaur’s way of speaking to plants, will open the way.',
 clearing:'The tree offers you the crescent lens: it can show memories and light the way to Starfall Tower. A rescue rope and rune key lie beside it, but your pack has room for only one tool; you could also leave both and plant an ordinary seed in thanks.',
 bank:'The forest path ends at the Lumen River, with Starfall Tower visible on the mountain beyond. Lapras is stuck in a shallow pool, Psyduck’s ferry needs repairs, and a riverbank path leads toward a waterfall and an old cave.',
 lapras:'Water fills the channel and Lapras slides into the deep river with a grateful song. It offers to carry you to the island below Starfall Tower, or stay here to guide other travelers.',
 ferry:'Psyduck’s ferry now has sound boards, but its rope is frayed and must be replaced before anyone crosses. You can use a rope from your pack, weave one from reeds, or help nervous Psyduck make the first safe crossing.',
 reedWorkshop:'Psyduck’s workshop stands beside the far bank, a short walk from the island below Starfall Tower. Your new friend offers to help you make floating lanterns, copy a quiet route or learn a calming tune before you go.',
 falls:'Three bells hang beside a door on the dry ledge behind the waterfall: the outer bells sound low and the middle one sounds high. Their low-high-low echo is the key, but you can also follow the bank around to the island without opening the door.',
 cave:'In the astronomer’s cave, a notebook tells of Lumi, a Clefairy who took the stars to keep an injured Shinx warm inside a magic sphere. The notes explain how to open it gently and show a hidden tower stair; a lower exit leads to the island.',
 island:'On the island, your lens catches a golden speck and shows a memory of Clefairy helping an injured Shinx toward the mountain. Shinx calls her Lumi, so you learn her name, and their footprints continue uphill toward Starfall Tower.',
 bridge:'The footprints lead to a rope bridge below Starfall Tower; its ropes are secure, but gusts rock the boards. You can wait for the wind, steady the bridge, or take a longer stone path to an Altaria lookout.',
 windwatch:'Altaria is gathering a lost flock on a lookout beside a floating cloud-platform. Helping the birds would earn a ride to the observatory roof, while marked steps and a sheltered path lead toward the cloudberry nook below it.',
 stairs:'On the stone steps you find a yellow scarf with Shinx’s name stitched inside. The main path passes a sheltered nook on its way to the tower, while the glowing Promise Trail, if you found it, leads straight to Lumi’s door.',
 shelter:'Altaria tends cloudberries in a nook below the observatory, which overlooks the last gap before Starfall Tower. She offers a warm feather in exchange for food, or will show the way if you repair her bowl or share what you learned about Lumi.',
 observatory:'The observatory’s roof is frozen shut, blocking the platform from which your lens can light a path to Starfall Tower. {starter} notices a mechanism suited to its skills, and you can also search for a hand crank or take the safe outside stair.',
 roof:'From the observatory roof, your crescent lens lights a path of stepping-stones across the gap to Starfall Tower. The stones glow steadily when you move slowly, and old passages offer another way around the gap.',
 tower:'At Lumi’s door, you hear a worried voice asking Shinx to rest for one more night. A yellow scarf hangs on a chair beside the door, with a name stitched into it: Lumi; it belongs to the matching pair she and Shinx wore.',
 lumi:'Inside, Lumi stands beside a glass sphere holding the missing stars, while Shinx rests on a warm blanket. She is afraid that opening the sphere will leave her friend cold, and waits to hear how you can help.',
 listen:'Lumi explains that Shinx was hurt during the meteor shower, and the sphere closed when she became afraid to lose him. Shinx is awake now, listening as you decide how to help him feel safe enough for Lumi to release the light.',
 plan:'Lumi shows you three rings: sky returns the stars, heart shares warmth between friends, and earth lets the light grow into a plant. Each can help Shinx and the valley, but you must choose which kind of future to make together.',
 sky:'The sky ring is ready, but Lumi needs to know how Shinx will stay warm. A feather, a careful flame, a journey home or a comforting song can help her let the stars go.',
 heart:'The heart ring glows as you and Lumi share your warmth with Shinx. You can make this circle a home in the tower, carry it to the village or send its light along a song.',
 earth:'On the balcony, the earth ring makes your silver seed open into a star-shaped leaf. You can plant it in the valley, grow a sky-vine with Bulbasaur, or save it while you make the tower a safe home.',
 endDawn:'Mira welcomes you home and tends Shinx while Lumi holds his hand beneath a sky full of stars. At the next festival, a lantern bears {starter}’s name in thanks for bringing everyone safely home.',
 endAurora:'Shinx rests in his warm nest as the freed stars spread into ribbons of green and gold. You and {starter} stay with Lumi until morning, watching the sky shine again.',
 endSong:'The song carries the stars out of the sphere, while a little shared warmth stays with Shinx. Every year, the village gathers by the river to sing the three notes that helped you bring back the sky.',
 endSanctuary:'Lumi becomes the keeper of the new sanctuary, where Shinx rests and other lost Pokémon find warm beds. The sphere sends more stars home each night, keeping only enough light to help those still healing.',
 endLantern:'Every family offers a lantern, and the shared warmth lets Lumi release all the stars. When Shinx is well, he and Lumi join the lantern parade with you, knowing that nobody needs to hold the whole sky alone.',
 endGarden:'The new garden grows a living constellation, lending light to the sky and warmth to anyone who rests beneath it. Lumi, Shinx and your friends take turns tending it, and {starter} helps you plant the next seed.',
};

export function arrivalText(scene:Scene,state:State,lookup:Record<string,Scene>):string{
 const previous=state.history.at(-1);if(!previous)return '';
 const source=lookup[previous.scene];if(!source)return '';
 if(previous.scene==='grove'&&state.flags.includes('puzzle:grove'))return scene.id==='rescue'?'You stay beside the freed Pikachu to ask what it would like to do next.':scene.id==='roots'?'You wave goodbye to the freed Pikachu and follow the roots to the oldest tree.':'You wave goodbye to the freed Pikachu and follow the blinking mushroom path.';
 const index=source.choices.findIndex(c=>c.to===scene.id&&c.label.replaceAll('{starter}',state.starter)===previous.choice);
 return index<0?'':(choiceOutcomes[source.id]?.[index]||'').replaceAll('{starter}',state.starter);
}

export function narrativeText(scene:Scene,state:State,lookup:Record<string,Scene>):string{
 const has=(flag:string)=>state.flags.includes(flag);
 let body=pages[scene.id]||scene.text,extra='';
 if(scene.id==='roots'&&state.starter!=='Bulbasaur')body='The oldest tree guards a doorway woven from roots and asks, “What grows brighter when it is shared?” Beyond the doorway, a crescent lens rests on a pedestal, waiting for someone who can answer the tree’s question.';
 if(scene.id==='bridge'&&state.starter!=='Bulbasaur')body='The footprints lead to a rope bridge below Starfall Tower; its ropes are secure, but gusts rock the boards. You can wait for the wind to calm or take a longer stone path to an Altaria lookout.';
 if(scene.id==='stairs'&&!has('promiseRoute'))body='On the stone steps you find a yellow scarf with Shinx’s name stitched inside. The path passes a sheltered nook on its way to the tower; you can take the scarf along or use it to mark the trail for others.';
 if(scene.id==='sky'){
  const ways=[...(has('feather')?['make a nest with your cloud feather']:[]),...(state.starter==='Charmander'?['ask Charmander to lend gentle warmth']:[]),'carry Shinx home','sing a comforting song'];
  body='The sky ring is ready, but Lumi needs to know how Shinx will stay warm. You could '+ways.slice(0,-1).join(', ')+', or '+ways.at(-1)+'.';
 }
 if(scene.id==='earth'&&state.starter!=='Bulbasaur')body='On the balcony, the earth ring makes your silver seed open into a star-shaped leaf. You can plant it in the valley or save it while you make the tower a safe home.';
 if(scene.id==='clearing'&&has('nestGift'))extra='A Hoothoot from your repaired nest arrives to sing low, high, low in thanks, giving you a melody to remember.';

 if(scene.id==='bridge'&&has('promise')&&(has('riverFriend')||state.companions.includes('Lapras')))extra='From the river below, Lapras remembers your promise and sings a hidden stair into view: the Promise Trail to Lumi’s door.';
 if(scene.id==='stairs'&&has('promiseRoute'))body='Lapras’s song guides you along the hidden stair toward Lumi’s door, past a yellow scarf dropped by Shinx. You can keep your promise and go straight to Lumi, or take the main path through the cloudberry nook with the scarf.';
 if(scene.id==='roof'&&has('flockGuide'))extra='The frozen observatory is still below you; the flock has brought you above it without needing its machinery.';
 if(scene.id==='endGarden'&&has('reedGarden'))body='Star reeds grow along the water beside Psyduck’s lanterns, sharing their light with the sky and warmth with passing travelers. Lumi, Shinx and Psyduck help you tend this new river garden together.';
 return [arrivalText(scene,state,lookup),deeperPage(state,body),extra].filter(Boolean).join(' ').replaceAll('{starter}',state.starter);
}

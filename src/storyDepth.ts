import type {State} from './story';

/** Short, composable reactions. These supplement rather than replace each other. */
export function storyReactions(state:State):string[]{
 const has=(f:string)=>state.flags.includes(f),r:string[]=[];
 if(state.scene==='lumi'){
  if(has('keptPromise'))r.push('Lumi recognises the promise you kept on the hidden stair and offers to open the heart ring with you');
  if(has('returnedScarf'))r.push('Shinx wraps the scarf you found around his shoulders and purrs');
  if(has('replyTrust'))r.push('Lumi shows you the river reply that gave her hope');
  if(has('privacy'))r.push('she thanks you for keeping the river memory private');
 }
 if(state.scene==='plan'){
  if(has('villagePlan'))r.push('Mira’s village lanterns can provide warmth, so Lumi agrees to carry the closed sphere home if you choose the heart ring');
  if(has('agency'))r.push('Shinx asks to stay beside Lumi and chooses to help hold the blanket instead of being carried alone');
  if(has('understanding'))r.push('your notes reveal that the rings release stars only when another source of warmth is ready');
 }
 if(state.scene==='earth'){
  if(has('garden'))r.push('your first small garden in Moonwood sends a green thread to help this new garden take root');
  if(has('floatingLanterns'))r.push('Psyduck’s floating lanterns mark another planting place beside the river');
  if(state.starter==='Squirtle')r.push('Squirtle offers to build a watering channel so the young star plants can survive dry days');
 }
 if(state.scene==='bank'&&has('map'))r.push('your map matches a crescent mark beside the cave’s side entrance');
 if(state.scene==='rescue'&&has('puzzle:grove'))r.push('Pikachu remembers your gentle rescue and teaches you how to hold a spark steady');
 if(state.scene==='reedWorkshop'&&has('puzzle:ferry'))r.push('Psyduck points proudly to the knot you tested together and offers to check the next crossing itself');
 if(state.scene==='cave'&&has('puzzle:falls'))r.push('the bells have lit a hidden diagram showing how a melody can steady the heart ring');
 if(state.scene==='observatory'){
  if(has('guardReturned'))r.push('a familiar Pikachu returns from guarding Moonwood and offers a spark for the friend who freed it');
  if(has('craft'))r.push('Altaria’s repaired bowl has become a warm-water carrier, helping you loosen the frozen controls');
  if(has('map'))r.push('your star map shows that the roof once measured warmth as well as light');
 }
 if(state.scene==='heart'){
  if(has('villagePlan'))r.push('Lumi is ready to follow your village plan, carrying Shinx beside her in his blanket');
  if(has('agency'))r.push('Shinx asks everyone to leave a comfortable space beside Lumi for him');
  if(has('counsel'))r.push('you repeat Altaria’s advice to ask before helping, and Lumi places her hand on the ring herself');
  if(has('stardust'))r.push('the saved golden speck reflects Shinx’s smile and steadies Lumi’s trembling hands');
  if(has('puzzle:grove')&&(has('rescue')||has('guardReturned')))r.push('Pikachu uses the steady spark it practised after your careful rescue');
 }
 return r;
}

export function deeperPage(state:State,original:string):string{
 const has=(f:string)=>state.flags.includes(f),s=state.starter;
 const pages:Record<string,string>={
  lantern:`The festival music stops as the stars blink out, and ${s} presses against you while everyone looks up. A warm silver seed lands at your feet; Mira asks you to follow its light while she keeps the village lanterns burning. ${s==='Bulbasaur'?'Bulbasaur feels the flowers turn toward the seed':s==='Charmander'?'Charmander notices its flame lean toward the seed':'Squirtle sees a tiny star reflected in the seed, although the sky is empty'}, and together you decide to find out why.`,
  square:'“This seed has the same mark as the old tower garden,” Mira says, tracing a crescent on her map; she knows the road, but not why the stars vanished. Eevee shivers under her table as she offers you a map or a chance to look for more clues on the hill.',
  hill:'“I saw a trail of light fly toward the tower,” Hoothoot tells you, tapping the crescent mark in the dust. It sings low, high, low; your seed answers each note, and the silver trail leads down to Moonwood’s gate.',
  hollow:'One Gastly wears a crooked leaf as a hat: “We made a guessing game, but nobody stayed to play!” When you explain the dark sky, it puts the hat away and offers either its secret archive or the direct path to the oldest tree.',
  echoArchive:'Gastly guards three books with badly mixed-up labels, hoping you can put them in order. You may investigate the star machine before borrowing the astronomer’s notes, a mountain route or a musical greeting.',
  clearing:'The crescent lens can reveal memories; beside it lie a rope for the river and a key marked with the tower’s crescent. Your pack holds one tool, or you can plant an ordinary seed here and let the forest help a future garden.',
  lapras:'“I was guiding a young swimmer when the water fell,” Lapras says as the channel fills and frees it. It offers a ride to the island, promising to stay on the river where other travelers still need a guide.',
  ferry:'The ferry’s boards are safe now, but Psyduck points to a frayed rope: “I can steer if someone helps with the knot.” A rescue rope saves time; reeds can also make a safe line if you test them before crossing.',
  falls:'Three bells hang beside the dry doorway behind the waterfall: their worn carvings show that two sound alike and one is different. Listen to the echo or read its pattern to discover the tune; the riverbank also offers a safe way around.',
  reedWorkshop:'“I crossed!” Psyduck says, surprising itself with a laugh as it shows you the workshop on the far bank. It wants to help the next nervous traveler with lanterns, a quiet route or a calming tune.',
  cave:'The notebook’s torn diagram shows a sphere made to borrow warmth, not steal stars: its safety lock closed when Lumi panicked. The silver seed is its living spare part, able to grow new light without trapping the original stars; another page shows a hidden tower stair.',
  island:'In the lens’s golden memory, Lumi lifts Shinx from fallen stones and wraps him in her own blanket, whispering, “I have you.” He presses his matching yellow scarf to her cheek before she carries him toward the tower; their footprints continue uphill.',
  windwatch:'The little birds crowd one edge of Altaria’s cloud-platform, tipping it toward the wind. You can guide them into a balanced flock for a ride to the observatory roof, or keep your feet on the marked stone paths.',
  observatory:`The observatory once checked that the sphere shared warmth safely; its frozen roof now blocks the lens platform. ${s==='Bulbasaur'?'Bulbasaur finds living vine cables under the controls':s==='Charmander'?'Charmander finds ice locking a small gear inside a larger one':'Squirtle finds empty water basins connected to the roof weights'}, while a hand crank and an outside stair offer other ways up.`,
  tower:'Beyond the closed door, someone counts stars, stops, and whispers, “What if it is not enough?” Lumi’s yellow scarf hangs on a chair outside; an old drawing beside it shows her and Shinx knitting their matching scarves together.',
  lumi:'Lumi stands between you and the sphere, ashamed of the empty sky but frightened for Shinx on his blanket. “I meant to borrow a little warmth,” she says; Shinx reaches for her hand, asking her to hear you out.',
  listen:'“I pulled harder when I got scared, and the safety lock shut,” Lumi admits; the sphere will release its stars when another source of warmth is ready. Shinx sits up: “I can help choose, too — just keep me warm and close to Lumi.”',
  plan:'The sky ring frees every star immediately once Shinx has warmth; the heart ring shares warmth between friends, either here or in the village. The earth ring grows new light from the seed while returning the original stars, but someone must water and tend the plants.',
 };
 let text=pages[state.scene]||original;
 if(state.scene==='grove'&&has('puzzle:grove'))text='Pikachu shakes its freed ankle and thanks you for the careful rescue. You can stay to talk, study the nearby mushrooms or ask the whispering trees for a path.';
 if(state.scene==='roof'&&has('secretRoute'))text=original;
 if(state.scene==='endAurora')text=(s!=='Charmander'||state.history.at(-1)?.choice.includes('feather'))?'Altaria’s cloud feather holds warmth around Shinx while every original star returns to the sky in ribbons of green and gold. Lumi settles beside his soft nest, and you watch until morning.':'Charmander rests at a safe distance from Shinx’s blanket, lending steady warmth while every original star returns in ribbons of green and gold. Lumi keeps watch with you until sunrise warms the tower.';
 if(state.scene==='endDawn')text='With Shinx warm in his blanket and Lumi beside him, you take the sheltered path home under all the returning stars. Mira welcomes them both, tends his paw and makes up two beds beside the hearth; nobody asks Lumi to explain before she has rested.';
 if(state.scene==='endDawn'&&has('stardust')&&has('inspected:stardust')&&(has('understanding')||has('puzzle:echoArchive')))text='Using the examined golden speck and the astronomer’s diagram, you set the lens to hold a little borrowed warmth without holding any stars. Shinx carries this warm night-light home beside Lumi, where Mira welcomes them under a sky with every original star safely returned.';
 if(state.scene==='endSong'){
  const singers=[...(state.companions.includes('Hoothoot')||has('nestGift')?['Hoothoot gives the first note']:[]),...(has('duckRhythm')?['Psyduck keeps a calm beat']:[]),...(has('puzzle:falls')?['the waterfall bells answer from below']:[])];
  text=(singers.length?singers.join(', ')+', and everyone joins the song. ':'You hum a gentle tune until Lumi finds a note of her own. ')+'The heart ring turns your shared warmth into a warm blanket for Shinx as all the original stars return, and the river carries your song home.';
 }
 if(state.scene==='endSanctuary')text='The safety lock releases a few stars each night while Lumi and the villagers replace their warmth with blankets, lanterns and a hearth. Shinx rests safely beside Lumi in the new sanctuary; when the last original star goes home, the hearth keeps every bed warm.';
 if(state.scene==='endLantern')text=(state.history.at(-1)?.choice.includes('Pikachu')?'Pikachu lights the lantern wires one careful spark at a time, and every home adds a lantern. ':'Mira gathers lanterns from every home, and the villagers carry their warmth to Shinx. ')+'Once the heart ring shares that warmth, Lumi releases every original star; Shinx chooses a place beside her at the next parade.';
 if(state.scene==='endGarden'){
  const plant=has('reedGarden')?'star reeds beside Psyduck’s river lanterns':state.history.at(-1)?.choice.includes('sky-vine')?'a living sky-vine above Willowbrook':'a constellation tree in Willowbrook';
  text=`The seed grows ${plant}, making new light of its own while every original star returns to the sky. ${s==='Squirtle'?'Squirtle builds a watering channel, and Shinx tests its tiny stepping-stones from his warm blanket':has('garden')?'Roots from your first Moonwood planting help the new garden grow, while Shinx rests beneath its warmth':'Lumi and the villagers share the watering, while Shinx rests safely in the garden’s warmth'}.`;
 }
 const reactions=storyReactions(state);
 if(reactions.length)text+=' '+reactions.map((r,i)=>i===0?r[0].toUpperCase()+r.slice(1):r).join('; ')+'.';
 if(state.scene==='sky'&&has('stardust')&&has('inspected:stardust')&&(has('understanding')||has('puzzle:echoArchive')))text+=' You fit the examined golden speck into the lens, revealing a warm-light setting that will keep Shinx safe through the night.';
 return text;
}

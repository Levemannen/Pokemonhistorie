# Pokémon — The Mystery of the Lost Starlight
## Revised complete interactive manuscript · Version 2.1

All player-facing narration, dialogue, responses and choice labels are in English. Metadata, conditions and effect names are for implementation only.

## lantern — The Night the Sky Went Quiet
Chapter 1 · Entry: Start; starter selected

The first lantern of the Starlight Festival is yours to light. Mira, Willowbrook’s lantern keeper, holds the match while your new Pokémon partner watches from your boots. “One flame for those at home,” she says, “and one for those finding their way.” Your partner reaches for the lantern, and you steady it together. It is the first small job you have managed as a team, and you cannot help grinning. Then the stars disappear. Not one by one. All at once. Beyond the village, the tower bell rings three times, though no one has used it in years. A silver seed falls into your open hand. It is warm, and it pulses in time with a faint cry from the mountains. Mira’s face changes. “I know that bell.”

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur steadies the lantern with one careful vine. A spare festival ribbon is proudly wrapped around the other.

**Conditional paragraph — `starter=Charmander`:** Charmander shields a tiny flame with both paws, keeping its tail safely away from the paper decorations.

**Conditional paragraph — `starter=Squirtle`:** Squirtle catches the tipping matchbox before it falls into a puddle, then checks your lantern with the expression of a strict fire-safety inspector.

**Choice 1: Ask Mira what the bell means**
- Immediate response: “That is the tower’s emergency bell,” Mira says. “No one rings it for fun.”
- Destination: `square`
- Available when: `always`
- State changes: `approach=questions`

**Choice 2: Show Mira the strange seed**
- Immediate response: Mira cups her hands around the seed. “An emergency key. I hoped I would never see another.”
- Destination: `square`
- Available when: `always`
- State changes: `approach=seed`

**Choice 3: Hold your partner close and ask whether it is safe**
- Immediate response: Mira kneels beside you. “The forest is not the danger,” she says. “Being alone with a problem is.”
- Destination: `square`
- Available when: `always`
- State changes: `approach=care`

## square — Mira and the Missing Piece
Chapter 1 · Entry: lantern

Mira leads you beneath the festival awning. Her old map shows Willowbrook, Moonwood, the Lumen River, the eastern mountain path and the observatory above Starfall Tower. A neat circular hole has been cut from the paper exactly where the tower should be. “I removed that piece myself,” Mira says. “The old tower has a machine called the Starlight Glass. It catches the light that reaches our valley—not the real stars. Someone has woken it.” She points to the seed. “That is an emergency key. The Glass sends one out when it needs help. It chooses someone willing to follow it. I cannot leave the village untended, but I can signal from the lantern tower, send supplies along the mountain trail and meet you when you return. If a route becomes unsafe, come back.” A frightened Eevee peers from beneath her chair. Mira gives you a folding map and a thick spare scarf for the cold ridge. She tucks the little silver seed into a secure pouch on your belt: it must stay with you until the Glass is safe. “I’ll keep a lantern burning here. Bring anyone who needs help home.”

**Choice 1: Ask who lives in the tower**
- Immediate response: “Lumi the Clefairy,” Mira says, “and often her friend Shinx. They have not visited today.”
- Destination: `hill`
- Available when: `always`
- State changes: `know=lumi_name`

**Choice 2: Ask why the Glass might need help**
- Immediate response: “It borrows reflections,” Mira says. “If a frightened keeper refuses to return them, the lock can tighten.”
- Destination: `hill`
- Available when: `always`
- State changes: `know=glass_rule`

**Choice 3: Comfort Eevee and invite it along**
- Immediate response: Eevee considers your outstretched hand, then jumps into your arms. Mira packs an extra berry for your new traveling friend.
- Destination: `hill`
- Available when: `always`
- State changes: `companion+=Eevee`

**Choice 4: Ask Eevee to stay with Mira and watch the lanterns**
- Immediate response: Eevee climbs onto Mira’s table and begins the important job of inspecting lantern wicks.
- Destination: `hill`
- Available when: `always`
- State changes: `eevee=home`

## hill — Three Notes on the Hill
Chapter 1 · Entry: square

The hill is the last place where the river and the tower can be seen together. Hoothoot stands beside a tiny nest, rocking on one foot. It sings three clear notes: low, high, low. The silver seed flashes three times. “The old observatory greeting,” Mira called it once; now you can hear the pattern for yourself. A loose branch leans dangerously over the nest. Hoothoot looks at the branch, then at you, as if deciding whether you are clever or simply very tall. The dark forest waits below, but the little owl refuses to move until you choose what to do. Mira’s lantern tower is visible across the ridge, close enough to receive a signal.

**Conditional paragraph — `companion=Eevee`:** Eevee edges forward and offers Hoothoot a berry. The owl takes it with solemn ceremony.

**Choice 1: Lift the branch and make the nest safe**
- Immediate response: Hoothoot fluffs its feathers with relief and sings the pattern a second time to thank you.
- Destination: `gate`
- Available when: `always`
- State changes: `nest=saved;melody=known`

**Choice 2: Mark the branch on Mira’s map so she can repair it**
- Immediate response: You add a clear cross to Mira’s shared map and send a signal with your lantern. She answers from the square with two flashes: message received.
- Destination: `gate`
- Available when: `always`
- State changes: `nest=marked;melody=known`

**Choice 3: Sing the three notes back and ask Hoothoot to travel with you**
- Immediate response: Hoothoot answers low, high, low, then hops onto your pack. It has decided to be your music teacher.
- Destination: `gate`
- Available when: `always`
- State changes: `melody=known;companion+=Hoothoot`

**Choice 4: Thank Hoothoot and leave quietly**
- Immediate response: Hoothoot bows, tips sideways, recovers with great dignity and stays to guard its nest.
- Destination: `gate`
- Available when: `always`
- State changes: `melody=known;hoothoot=stays`

## gate — Four Ways into Moonwood
Chapter 1 · Entry: hill

At the last village gate, four routes separate: a root-covered arch leads into the grove; a rocky ridge climbs above it; a shallow brook skirts the eastern trees; and a narrow path follows the silver seed between them. You can see all four from the signpost. Its lettering has been hidden beneath mud, but Mira’s folding map marks each destination. You put a hand on the lantern you brought from home. It still burns. The forest is not empty or evil—only unusually quiet, as though its usual nighttime music has forgotten the next note.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur offers to ease the roots apart rather than tear them.

**Conditional paragraph — `starter=Charmander`:** Charmander checks the ridge for dry leaves before lighting the way.

**Conditional paragraph — `starter=Squirtle`:** Squirtle points out where the brook is shallow enough to cross.

**Choice 1: Take the root arch**
- Immediate response: You walk beneath the roots. Bulbasaur, if chosen, parts the smallest vines gently, leaving the arch unharmed.
- Destination: `grove`
- Available when: `always`
- State changes: `route=roots`

**Choice 2: Climb the ridge**
- Immediate response: You take the marked climbing path and soon hear the wind crossing the rocky hillside.
- Destination: `ridge`
- Available when: `always`
- State changes: `route=ridge`

**Choice 3: Follow the brook**
- Immediate response: You follow the stream and clear the mud from the old wooden sign before reading it.
- Destination: `brook`
- Available when: `always`
- State changes: `route=brook`

**Choice 4: Trust the seed’s narrow trail**
- Immediate response: The seed brightens at every fork and brings you through the quiet understory to the grove.
- Destination: `grove`
- Available when: `always`
- State changes: `route=seed`

## ridge — A Feather in the Wind
Chapter 1 · Entry: gate(route=ridge)

The ridge runs above the grove, and every stone carries an echo of the tower bell. A Hoothoot feather has snagged beneath a fallen branch. From here you can see the nest you passed on the hill and the brook curling below. Your partner spots a safer slope through the heather. For a moment, a pale glow crosses the mountainside: not a monster, but the reflection of something moving inside the distant tower. Someone is still there.

**Choice 1: Secure the fallen branch before leaving**
- Immediate response: The branch no longer threatens the narrow ridge. You can hear Hoothoot calling safely behind you.
- Destination: `brook`
- Available when: `always`
- State changes: `ridge=safe`

**Choice 2: Mark the dangerous spot on Mira’s map**
- Immediate response: You sketch the fallen branch and mark a safer detour for the next traveler.
- Destination: `brook`
- Available when: `always`
- State changes: `ridge=marked`

**Choice 3: Follow the high trail straight into the grove**
- Immediate response: You take the high route down through the heather and enter the grove from above.
- Destination: `grove`
- Available when: `always`
- State changes: `ridge=shortcut`

## brook — The Letter in the Water
Chapter 1 · Entry: gate or ridge

At the brook, an old sign reads: MOONWOOD—LISTEN BEFORE YOU LEAP. You wipe the last of the mud away with your sleeve. The message is readable no matter which path brought you here. A bottle taps against a stone. Inside is a note in shaky handwriting: “I was trying to help. I cannot open it again. Please bring the dawn. —L.” A second mark looks like a tiny paw print. The paper is damp, but the words are clear. Whoever wrote this is afraid of what might happen next.

**Conditional paragraph — `know=lumi_name`:** You wonder whether the initial L means Lumi. You cannot know for sure yet.

**Choice 1: Keep the letter to show its writer**
- Immediate response: You fold the note carefully and place it in the dry pocket of your pack.
- Destination: `grove`
- Available when: `always`
- State changes: `letter=kept`

**Choice 2: Send a reply: “We are coming. You are not alone.”**
- Immediate response: You write the answer on the back of the scrap, secure it to the bottle and set it afloat. Hoothoot, if traveling with you, guides it; otherwise the current carries it toward the tower’s old intake.
- Destination: `grove`
- Available when: `always`
- State changes: `reply=sent`

**Choice 3: Copy the paw print onto Mira’s map**
- Immediate response: You draw the paw-shaped mark, including its small uneven streak, on the map margin.
- Destination: `grove`
- Available when: `always`
- State changes: `clue=pawprint`

## grove — Moonwood Holds Its Breath
Chapter 2 · Entry: gate or brook or ridge

The trees of Moonwood sway although the air is still. Silver ivy has curled around an old lamp post. Inside its coils, a Pikachu struggles to pull one paw free. The ivy is not attacking; it has grown toward the trapped reflections of the missing stars, tightening around anything bright. A trail of glowing mushrooms runs past the post. Farther away, the oldest tree groans softly in its sleep. You could move on to find help, but Pikachu meets your eyes and gives a sharp, embarrassed squeak. Far above, another flash of light tightens the ivy around the post.

**Conditional paragraph — `companion=Hoothoot`:** Hoothoot warns you that bright light makes the ivy curl tighter.

**Choice 1: Stop and free Pikachu**
- Immediate response: You kneel so you can see the knot without pulling the trapped paw. “We’re here,” you tell Pikachu.
- Destination: `rescue`
- Available when: `always`
- State changes: `pikachu=freed`

**Choice 2: Study the mushroom trail first**
- Immediate response: The mushroom path gives you a useful clue, but you leave Pikachu behind for now. At the next lantern marker you hang a warning and a request for Mira’s forest helpers to cut away the ivy.
- Destination: `mushrooms`
- Available when: `always`
- State changes: `pikachu=left;route=mushrooms`

**Choice 3: Ask the old tree whether there is a safe way through**
- Immediate response: The oldest tree points out a safe forest passage. You cannot free Pikachu right now, so you mark its exact position on Mira’s map and flash a help signal from the clearing.
- Destination: `roots`
- Available when: `always`
- State changes: `pikachu=left;route=oldtree`

## rescue — The Smallest Spark
Chapter 2 · Entry: grove

The ivy trembles when you touch it. Bulbasaur can loosen the roots with gentle vines; Charmander can light the knot without bringing flame near dry leaves; Squirtle can soften the earth with a thin stream of water. With your help, the coils finally open. Pikachu tumbles out, makes a very fierce face at the ivy, then checks whether your fingers are hurt. A tiny spark touches the silver seed. Its glow settles into an even beat. Pikachu points to the mountain: it knows the tower has something to do with the strange night.

**Choice 1: Invite Pikachu to join the journey**
- Immediate response: Pikachu leaps onto the path at your side, then bumps your ankle as if to say thank you.
- Destination: `mushrooms`
- Available when: `always`
- State changes: `companion+=Pikachu`

**Choice 2: Ask Pikachu to stay and keep the forest paths safe**
- Immediate response: Pikachu salutes with a small spark and races down the forest trail. You agree it will meet you near the observatory if it can.
- Destination: `roots`
- Available when: `always`
- State changes: `pikachu=guard`

**Choice 3: Share food and ask what Pikachu saw**
- Immediate response: Pikachu draws three bright circles in the soil and points toward the tower. You copy the shape onto your map.
- Destination: `roots`
- Available when: `always`
- State changes: `pikachu=informant;clue=flash`

## mushrooms — The Little Constellation
Chapter 2 · Entry: grove or rescue

Nine mushrooms shine beside a flat stone. Three gold caps make an ascending diagonal, from small to medium to large; the others flicker like decoys. Carved beneath them is the message: “Little lights can show a growing way.” The silver seed glows when you touch the smallest gold cap. A mischievous chuckle escapes a hollow tree beyond the mushrooms. This is not a test of bravery. It is a test of noticing.

**Choice 1: Solve the small-to-large constellation**
- Immediate response: You touch the three gold lights from smallest to largest. The stone clicks, revealing the moon-rune and the matching tower mark.
- Destination: `roots`
- Available when: `puzzle:mushrooms solved`
- State changes: `rune=earned`

**Choice 2: Follow the brightest mushrooms instead**
- Immediate response: The bright caps lead into a hollow tree. Someone inside giggles at your surprised expression.
- Destination: `hollow`
- Available when: `always`
- State changes: `detour=gastly`

**Choice 3: Trace the pattern on Mira’s map and take the root path**
- Immediate response: You trace the diagonal without opening the rune cache. Your copy may still help you recognize the tower symbol.
- Destination: `roots`
- Available when: `always`
- State changes: `clue=constellation`

**Choice 4: Follow the lantern trail into the clearing**
- Immediate response: You follow the open lantern track, leaving the puzzle unsolved; the next clearing still holds the crescent lens.
- Destination: `clearing`
- Available when: `always`
- State changes: `route=lantern`

## hollow — The Tree That Laughed
Chapter 2 · Entry: mushrooms

You step into a tree hollow and something says, “Boo!” Then, immediately, “Was that too much? I’m practising.” A Gastly floats upside down among shelves of lost gloves, odd buttons and maps left by travelers. This is its collection of stories, not its dinner. It apologizes for leading you off the trail, but offers you an actual discovery in exchange for a tale of your own. “I prefer the funny bits,” it adds, “but I can cope with heroic yawning.”

**Choice 1: Tell Gastly the funniest thing your starter did**
- Immediate response: Gastly laughs so hard it turns upside down twice. “That earns a visit to the archive!”
- Destination: `echoArchive`
- Available when: `always`
- State changes: `gastly=friend`

**Choice 2: Ask Gastly to stop confusing frightened travelers**
- Immediate response: Gastly droops for a moment, then replaces a false sign with a real one. “Only cheerful surprises from now on,” it promises.
- Destination: `roots`
- Available when: `always`
- State changes: `gastly=helpful`

**Choice 3: Share why the missing stars matter**
- Immediate response: Gastly listens without interrupting. “You had better see the real records,” it says at last.
- Destination: `echoArchive`
- Available when: `always`
- State changes: `gastly=serious`

## echoArchive — The Echo Archive
Chapter 2 · Entry: hollow

Gastly floats you past its collection to a dry little reading room. A century-old astronomer’s notebook explains the Starlight Glass: it stores reflected light; the sky ring restores those reflections; the heart ring spreads stored warmth among helpers; the earth ring grows a living receiver. “Never seal the Glass while someone depends upon it,” reads a warning. Beside the warning, a sketch shows a silver seed and a crescent lens. Another page identifies a young Clefairy called Lumi, who once copied these notes and asked many questions about protecting injured friends. Gastly lets you take a copy of exactly one useful page.

**Choice 1: Copy the safe opening instructions**
- Immediate response: You copy: “Establish a new source of warmth; release the catch; open the return path.”
- Destination: `clearing`
- Available when: `always`
- State changes: `knowledge=sphere`

**Choice 2: Copy the secret service stair map**
- Immediate response: You draw the staircase running beneath the observatory to the tower’s lower door.
- Destination: `clearing`
- Available when: `always`
- State changes: `knowledge=stair`

**Choice 3: Copy the ring diagram and its costs**
- Immediate response: You copy three circles: SKY needs safe transport, HEART needs willing helpers, EARTH needs a living receiver and caretakers.
- Destination: `clearing`
- Available when: `always`
- State changes: `knowledge=rings`

## roots — The Oldest Tree
Chapter 2 · Entry: grove, mushrooms, rescue or hollow

An ancient tree blocks the trail with roots as thick as benches. A hollow in its bark resembles a kind old face. “What grows brighter when shared?” the tree asks. Its branches bear ordinary seeds with papery wings. The tree glances at the silver seed in your hand. “That one is not mine. It came from a machine that remembered how to ask for help.” A root turns, revealing the way to a circular clearing and an old stone pedestal.

**Choice 1: Answer, “A light passed from one friend to another”**
- Immediate response: The tree hums. “Yes. No one loses a flame by sharing its glow.”
- Destination: `clearing`
- Available when: `always`
- State changes: `tree=light`

**Choice 2: Answer, “A good idea”**
- Immediate response: The tree nods. “And ideas grow stronger when someone asks a better question.”
- Destination: `clearing`
- Available when: `always`
- State changes: `tree=idea`

**Choice 3: Let Bulbasaur communicate with the roots**
- Immediate response: Bulbasaur rests a vine on the bark. The roots part and the tree offers a warm, wordless welcome.
- Destination: `clearing`
- Available when: `starter=Bulbasaur`
- State changes: `tree=friend`

**Choice 4: Ask the tree for a plain seed as a thank-you gift**
- Immediate response: The tree shakes a small brown seed into your palm. This is an ordinary forest seed, not the shining silver one.
- Destination: `clearing`
- Available when: `always`
- State changes: `ordinarySeed=owned`

## clearing — The Crescent Lens
Chapter 2 · Entry: roots or mushrooms or echoArchive

The forest opens onto a mossy circle. In its center lies the crescent lens Mira marked on the map. You hold up the silver seed. It sends a thin thread of light through the lens, which reveals an old memory in the bark: someone climbed toward the tower carrying a small, limping Pokémon. You see a yellow scarf flutter. You cannot yet hear their words. Under the lens is a little plaque: “The Glass returns what it borrows when another warmth is ready.” You take the lens. There is also rope and a rune socket, but nothing here requires you to have solved the mushroom puzzle. A lantern signal from Willowbrook flickers among the branches: the village helpers are checking the forest paths tonight.

**Conditional paragraph — `letter=kept`:** The paw-shaped mark on the note matches the small shape in the memory.

**Conditional paragraph — `companion=Eevee`:** Eevee notices that the smaller figure leaned on the larger one as they walked.

**Conditional paragraph — `pikachu=left`:** If you left Pikachu at the lamp post, you receive two answering flashes from Mira’s helpers. They have reached the ivy and will free Pikachu; you did not claim the rescue for yourself.

**Choice 1: Take the rope for difficult crossings**
- Immediate response: You roll the rope and clip it to your pack. There is no need to pretend you took the rune as well.
- Destination: `bank`
- Available when: `always`
- State changes: `item+=rope`

**Choice 2: Use the moon-rune to copy the tower’s hidden door mark**
- Immediate response: The rune fits. A bright symbol appears on the lens; you record the lower-door mark.
- Destination: `bank`
- Available when: `rune=earned`
- State changes: `knowledge=door`

**Choice 3: Plant the ordinary seed near the pedestal**
- Immediate response: You press the little brown seed into damp soil and water it with your drinking flask.
- Destination: `bank`
- Available when: `ordinarySeed=owned`
- State changes: `ordinarySeed=planted`

**Choice 4: Leave a lantern flame for the forest**
- Immediate response: You light a sheltered wick by the pedestal. It will help other travelers find the clearing.
- Destination: `bank`
- Available when: `always`
- State changes: `forest=lantern`

## bank — The River Without Reflections
Chapter 3 · Entry: clearing

Moonwood slopes down to the Lumen River. It usually holds long, trembling pictures of the stars. Tonight it reflects only your lantern. Lapras has become stranded in a side pool after a falling branch blocked the channel. Across the water, a battered ferry waits beside a reed workshop. Upstream, a waterfall hangs like a silver curtain. The mountain track rises from a small island beyond it. There is no need to visit every part of the river, but every route must eventually reach that island.

**Choice 1: Free Lapras from the shallow pool**
- Immediate response: Together you open the blocked channel. Lapras glides into deeper water and sings in relief.
- Destination: `lapras`
- Available when: `always`
- State changes: `lapras=helped`

**Choice 2: Repair the ferry to reach the island**
- Immediate response: You gather sound boards beside the ferry. Psyduck watches your work with growing admiration.
- Destination: `ferry`
- Available when: `always`
- State changes: `route=ferry`

**Choice 3: Follow the waterfall trail**
- Immediate response: You follow a safe riverside ledge toward the noise of the bells.
- Destination: `falls`
- Available when: `always`
- State changes: `route=falls`

**Choice 4: Search for the cave entrance marked on Mira’s map**
- Immediate response: Using the route you copied, you find the dry side entrance above the stream.
- Destination: `cave`
- Available when: `knowledge=stair OR knowledge=sphere OR knowledge=door`
- State changes: `route=cave`

## lapras — The River Keeper
Chapter 3 · Entry: bank

You and your partner move the branch trapping Lapras. Water pours back into the channel, and Lapras slides into deep water with a grateful, booming song. “The river carries news,” the Pokémon seems to tell you in a low, musical voice. You explain that you are searching for someone who borrowed the sky’s reflections. Lapras has seen two travelers crossing the island path: a Clefairy supporting a limping Shinx. It will ferry you across, but its place is on the river, where others may still need help.

**Choice 1: Ask Lapras to carry you to the island**
- Immediate response: Lapras lowers its neck so you can climb aboard, then carries you to the island’s pebble shore.
- Destination: `island`
- Available when: `always`
- State changes: `lapras=ferry`

**Choice 2: Ask Lapras to guide other lost travelers**
- Immediate response: Lapras agrees to remain at the river. Its song follows you as you walk toward the ferry.
- Destination: `ferry`
- Available when: `always`
- State changes: `lapras=guard`

**Choice 3: Promise to help both travelers, not just return the stars**
- Immediate response: Lapras answers with a steady song. “Both,” you repeat as it brings you across.
- Destination: `island`
- Available when: `always`
- State changes: `promise=both;lapras=ferry`

## ferry — Psyduck and the Wobbly Ferry
Chapter 3 · Entry: bank or lapras

A little Psyduck is fixing the ferry with enormous care and rather poor aim. It holds one plank, then another, and forgets where the hammer went. “Oh,” it seems to say when it finds it under its own foot. You help secure the boards before anyone steps aboard. The ferry is safe to cross, though its handrail could still be strengthened. Psyduck admits—through nervous gestures and an awful lot of head-holding—that the waterfall’s sound makes it anxious. Its reed workshop contains lanterns and sketches of the mountain drainage tunnels. It would like to cross, but only if it can see what happens next.

**Conditional paragraph — `item=rope`:** Your rope makes a sound handrail across the ferry deck.

**Choice 1: Cross together slowly, giving Psyduck time**
- Immediate response: Psyduck places a foot on the deck, shivers, then completes the crossing with you. It decides to help manage the landing.
- Destination: `island`
- Available when: `always`
- State changes: `psyduck=helped;route=ferry`

**Choice 2: Visit the reed workshop for safer equipment**
- Immediate response: Psyduck unlocks its little workshop with a key hidden in its hat.
- Destination: `reedWorkshop`
- Available when: `always`
- State changes: `route=workshop`

**Choice 3: Ask Psyduck to remain ferry keeper**
- Immediate response: Psyduck nods with relief and promises to keep the ferry safe for everyone who follows.
- Destination: `island`
- Available when: `always`
- State changes: `psyduck=ferrykeeper`

## reedWorkshop — One Step at a Time
Chapter 3 · Entry: ferry

Psyduck’s workshop smells of reeds and wet wood. Small lanterns float in a testing basin; a channel map hangs beside a painted sign: “Try one thing before worrying about the next.” You can make the river safer, learn a tune to steady frightened travelers, or copy a tunnel map that connects the river’s old water system with the observatory above. You have time to finish one project before dawn; Psyduck will show you the way back to the ferry afterward. Psyduck wants to help, but it must decide whether to leave its workshop. “I may shake,” it tells you with a determined nod, “but I can still do things.”

**Choice 1: Build lanterns that can guide travelers after dark**
- Immediate response: Together you set out a chain of floating lanterns and mark their positions on the river map.
- Destination: `island`
- Available when: `always`
- State changes: `river=lanterns`

**Choice 2: Learn Psyduck’s slow breathing-and-bell rhythm**
- Immediate response: Psyduck teaches you a steady low–high–low pattern with a pause to breathe after each set.
- Destination: `island`
- Available when: `always`
- State changes: `rhythm=known`

**Choice 3: Copy the drainage tunnel route to the mountain**
- Immediate response: You draw the tunnel opening beneath the bridge and the service steps at its far end.
- Destination: `island`
- Available when: `always`
- State changes: `knowledge=drain`

**Choice 4: Invite Psyduck to travel with you after choosing a project**
- Immediate response: You and Psyduck finish the floating safety markers first. Then you ask whether it wants to leave the workshop and come along; it chooses to travel, bringing its own small lantern.
- Destination: `island`
- Available when: `always`
- State changes: `river=lanterns;companion+=Psyduck`

## falls — The Bell Behind the Water
Chapter 3 · Entry: bank

A narrow, safe path reaches the waterfall. Two low bells and one higher bell hang beside a sealed stone door. The sign reads: “The river remembers: low, high, low.” You can hear the pattern yourself, even without meeting Hoothoot. Each failed attempt makes only a harmless splash; no one is sent backward. The island is also reachable by a path to the right. Through the water, the crescent lens catches the outline of another door and a set of steps leading into a cave.

**Choice 1: Play low–high–low and open the stone door**
- Immediate response: The bells answer in harmony. Water slides aside to reveal dry steps into the cave.
- Destination: `cave`
- Available when: `puzzle:falls solved`
- State changes: `puzzle:falls=solved`

**Choice 2: Take the safe path around the falls**
- Immediate response: You leave the bells untouched and take the marked path along the bank to the island.
- Destination: `island`
- Available when: `always`
- State changes: `route=falls_path`

**Choice 3: Trace the waterfall’s rhythm for use later**
- Immediate response: You tap the three notes on your pack so you will remember them.
- Destination: `island`
- Available when: `always`
- State changes: `rhythm=known`

## cave — The Astronomer’s Quiet Cave
Chapter 3 · Entry: bank or falls

The cave has two entrances: a path from the riverbank and the bell door behind the waterfall. You arrive by the entrance you actually used. Inside, an old wall drawing shows three rings around a shining sphere. The sky ring opens a clear return path; the heart ring transfers warmth to a living source; the earth ring sends power into a planted receiver. A note beneath the picture warns: “What is borrowed must be released. Never let fear choose the lock.” Nothing here records yesterday’s accident. The book is old; it teaches rules, not current gossip.

**Choice 1: Copy the rule for returning light before touching the rings**
- Immediate response: You write the old warning beside the ring diagram on Mira’s map.
- Destination: `island`
- Available when: `always`
- State changes: `knowledge=rings`

**Choice 2: Sketch the three safe ways up the mountain**
- Immediate response: You draw the bridge, shelter detour and old service steps in separate lines.
- Destination: `island`
- Available when: `always`
- State changes: `knowledge=route`

**Choice 3: Look through the lens at the wall’s worn marks**
- Immediate response: The lens brightens old lines just enough to show where the returns lead; it does not invent memories of yesterday.
- Destination: `island`
- Available when: `always`
- State changes: `knowledge=lens`

## island — A Memory on the Island
Chapter 3 · Entry: lapras, ferry, falls or cave

The paths from ferry, waterfall and Lapras all meet on the island. Your crescent lens shines upon a stone where stardust has settled. A memory flickers: a Clefairy carrying a limping Shinx toward the mountain. “Lumi,” Shinx calls, “please slow down.” She does; she stops to wrap her own yellow scarf around him. Then the memory breaks. Shinx is alive, and Lumi was trying to help him. The silver seed glows toward the high bridge. Two travelers went up together; one of them has been afraid ever since.

**Conditional paragraph — `know=lumi_name`:** You recognize Lumi’s name from Mira’s story. Now you have seen her for yourself.

**Choice 1: Say aloud what the memory tells you**
- Immediate response: “Lumi was trying to help Shinx,” you say. “But something else must have happened at the tower.”
- Destination: `bridge`
- Available when: `always`
- State changes: `inference=lumi_helped`

**Choice 2: Promise to hear Lumi’s story before judging her**
- Immediate response: Your starter hears your promise and gives a small, serious nod.
- Destination: `bridge`
- Available when: `always`
- State changes: `promise=listen`

**Choice 3: Use the lens to check whether Shinx could walk**
- Immediate response: The memory shows Shinx taking a few steps with help. He is hurt, but not helpless.
- Destination: `bridge`
- Available when: `always`
- State changes: `knowledge=shinx_walking`

**Choice 4: Keep the memory private until you can ask them**
- Immediate response: You fold your map shut. Their story should be theirs to tell first.
- Destination: `bridge`
- Available when: `always`
- State changes: `privacy=yes`

## bridge — The Bridge in the Wind
Chapter 4 · Entry: island

You follow the island’s north path up the mountain for nearly an hour. Before dawn, a narrow rope bridge crosses a gorge beneath the observatory. The wind rocks its boards, but none is broken. A second trail winds around the gorge to Altaria’s cloudberry shelter. High above, Starfall Tower stands behind the observatory. You have come far enough to see a pale sphere pulsing within its highest window. Each pulse dims the valley a little more.

**Choice 1: Steady the rope bridge and cross together**
- Immediate response: You wait for a quiet gust and cross board by board, holding the rail.
- Destination: `stairs`
- Available when: `always`
- State changes: `bridge=steady`

**Choice 2: Take the long path toward Altaria’s lookout**
- Immediate response: You turn uphill and follow the windbreak stones toward the lookout.
- Destination: `windwatch`
- Available when: `always`
- State changes: `bridge=detour`

**Choice 3: Use Bulbasaur’s vines to anchor the bridge**
- Immediate response: Bulbasaur secures the posts. Everyone crosses on steadier boards.
- Destination: `stairs`
- Available when: `starter=Bulbasaur`
- State changes: `bridge=vines`

**Choice 4: Use the old drainage route beneath the bridge**
- Immediate response: You follow the marked tunnel beneath the exposed span and emerge by the old steps.
- Destination: `stairs`
- Available when: `knowledge=drain`
- State changes: `bridge=drain`

## windwatch — Altaria and the Lost Flock
Chapter 4 · Entry: bridge

Altaria keeps watch over the windy mountain. Several tiny Swablu have become separated in the mist, and their worried cries drift through the rocks. Altaria is strong enough to carry travelers, but refuses to leave until every chick is accounted for. “Being brave is easier,” her expression seems to say, “when someone checks the last nest.” One chick is hiding behind a stone lantern beside the shelter path. You can help Altaria or take the marked walking trail.

**Choice 1: Help Altaria gather the little flock**
- Immediate response: The last Swablu slips out of the fog and joins the others. Altaria offers a sheltered flight straight to the roof.
- Destination: `roof`
- Available when: `always`
- State changes: `altaria=flock;arrival=air`

**Choice 2: Show Altaria where the missing chick is hiding**
- Immediate response: Altaria gathers the chick beneath a wing and guides you toward her shelter.
- Destination: `shelter`
- Available when: `always`
- State changes: `altaria=found`

**Choice 3: Take the marked walking trail**
- Immediate response: You wave to Altaria and follow the path into her sheltered nook.
- Destination: `shelter`
- Available when: `always`
- State changes: `arrival=walk`

## shelter — Cloudberry Shelter
Chapter 4 · Entry: windwatch or stairs

The path rounds the mountain into a sheltered nook below the observatory. Altaria tends berry bushes here for tired travelers. One stone bowl has cracked, spilling its food. A soft feather lies beside the bowl, warm from the nest. From here you can reach the observatory directly, or continue along a narrow service path that rejoins the steps toward the tower. Nothing you pick up is magically teleported elsewhere; you must carry it.

**Choice 1: Repair the bowl and ask for a feather**
- Immediate response: You mend the bowl with cord. Altaria places one warm feather in your hands.
- Destination: `observatory`
- Available when: `always`
- State changes: `item+=feather;altaria=bowl`

**Choice 2: Share food and request a warm feather**
- Immediate response: Altaria accepts the shared meal and gives you a soft feather for a cold night.
- Destination: `observatory`
- Available when: `always`
- State changes: `item+=feather`

**Choice 3: Continue to the observatory without taking anything**
- Immediate response: You thank Altaria and follow the clear path up to the observatory.
- Destination: `observatory`
- Available when: `always`
- State changes: `arrival=shelter`

**Choice 4: Take the marked service steps toward the tower**
- Immediate response: You follow the winding service steps to the lower tower approach.
- Destination: `stairs`
- Available when: `always`
- State changes: `arrival=service`

## stairs — The Steps with Two Scarves
Chapter 4 · Entry: bridge or shelter

Beyond the gorge, stone stairs wrap around the observatory’s lower wall. A yellow scarf lies caught beneath a railing. It has SHINX stitched in crooked letters. A faded photograph in a weatherproof box shows two friends wearing matching scarves: Shinx in this one, Lumi in another. You lift the lost scarf carefully. The moon-rune on the nearby door matches the little constellation you may have solved, but the normal steps also reach the observatory. Either way, the tower is still ahead.

**Choice 1: Keep Shinx’s scarf safe and follow the outer steps**
- Immediate response: You fold the scarf and climb to the observatory, determined to return it.
- Destination: `observatory`
- Available when: `always`
- State changes: `item+=shinxScarf;arrival=stairs`

**Choice 2: Use the marked service passage to reach the tower door**
- Immediate response: The service map guides you beneath the platform and out beside the tower door.
- Destination: `tower`
- Available when: `knowledge=stair OR knowledge=door OR bridge=drain`
- State changes: `item+=shinxScarf;arrival=service`

**Choice 3: Take the outside route up to the observatory roof**
- Immediate response: You tuck the scarf safely away and climb the protected outside steps.
- Destination: `roof`
- Available when: `always`
- State changes: `item+=shinxScarf;arrival=outside`

## observatory — The Observatory That Forgot the Sky
Chapter 4 · Entry: shelter or stairs

The observatory is linked to Starfall Tower by a short covered walkway and a platform above the gorge. Its roof has frozen over, locking the main platform controls. A safe outside staircase reaches a hand latch, but the old mechanism can also be repaired. An instruction plate shows three paths to the same release lever—roots and leaves, moon and sun gears, or water basins—depending on the tool used. Your partner takes one look and seems to think this machine was built specifically for its talents.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur examines the root, leaf and flower cables.

**Conditional paragraph — `starter=Charmander`:** Charmander notices the small moon gear must thaw before the large sun gear.

**Conditional paragraph — `starter=Squirtle`:** Squirtle sees the counterweight basins connect from low to high.

**Conditional paragraph — `pikachu=guard`:** From the forest path a familiar spark flashes twice. Pikachu has finished guiding travelers and comes to help at the observatory; it is visiting, not silently joining the party.

**Choice 1: Solve the observatory mechanism with your partner**
- Immediate response: Together you complete the mechanism in the order shown. The roof latch turns smoothly.
- Destination: `roof`
- Available when: `puzzle:observatory solved`
- State changes: `puzzle:observatory=solved`

**Choice 2: Use the hand crank and work together**
- Immediate response: The crank moves slowly, but it works. You open the roof without solving the old mechanism.
- Destination: `roof`
- Available when: `always`
- State changes: `observatory=crank`

**Choice 3: Climb the safe outside staircase**
- Immediate response: The staircase leads to a manual release. You lift it and open the roof.
- Destination: `roof`
- Available when: `always`
- State changes: `observatory=outside`

## roof — Across the Last Gap
Chapter 4 · Entry: observatory, stairs or windwatch

From the observatory roof, Starfall Tower is close enough to hear someone moving inside. The covered walkway below is intact. Above it, a line of glowing stepping-stones offers a shorter but exposed crossing. The crescent lens confirms the stones hold steady if you move slowly. You are not crossing to an unexplained second tower; this roof faces the same Starfall Tower Mira showed on her map. Near the door, there is a brass bell cord with a moon-shaped handle.

**Choice 1: Cross the covered walkway and knock at the door**
- Immediate response: The covered walkway shelters you from the wind as you cross to the tower.
- Destination: `tower`
- Available when: `always`
- State changes: `arrival=walkway`

**Choice 2: Cross the stepping-stones carefully**
- Immediate response: You test each glowing stone before placing your weight on it and reach the door safely.
- Destination: `tower`
- Available when: `always`
- State changes: `arrival=stones`

**Choice 3: Ring the gentle moon-bell before approaching**
- Immediate response: The bell answers with three soft notes. You hear footsteps move toward the door.
- Destination: `tower`
- Available when: `always`
- State changes: `arrival=bell`

**Choice 4: Take the sheltered stair around the gorge**
- Immediate response: The old stone stair curves beneath the platform and arrives at the tower’s lower landing.
- Destination: `tower`
- Available when: `always`
- State changes: `arrival=sheltered`

## tower — Someone Behind the Door
Chapter 4 · Entry: stairs or roof

A muffled voice counts quietly: “One, two, three. Please, just one more night.” Beyond the door you hear a second voice, small and tired: “Lumi, I’m not sleeping.” You recognize the name from the island memory. The little voice confirms that Lumi and Shinx are together beyond the door. A yellow scarf hangs over a chair inside. It belongs to Lumi. If you found a scarf on the stairs, you hold Shinx’s matching scarf—not this one. Your seed glows in your hand, but the door is still closed. The next choice determines how your first meeting begins.

**Conditional paragraph — `arrival=stones`:** The soles of your shoes still sparkle with dust from the stepping-stones.

**Conditional paragraph — `arrival=service`:** You reach the door through the service passage; the others came by the roof.

**Conditional paragraph — `arrival=bell`:** Inside, the voice stops counting when the old moon-bell rings.

**Choice 1: Knock and introduce yourself**
- Immediate response: You give your name and your partner’s name without demanding that Lumi open at once.
- Destination: `lumi`
- Available when: `always`
- State changes: `contact=knock`

**Choice 2: Call gently that you came because the silver seed asked for help**
- Immediate response: You show the warm silver seed through the narrow window and explain that it led you here.
- Destination: `lumi`
- Available when: `always`
- State changes: `contact=seed`

**Choice 3: Hold up Shinx’s lost scarf and ask to return it**
- Immediate response: You unfold the scarf, keeping it dry and clean, so the Pokémon inside can see the name.
- Destination: `lumi`
- Available when: `item=shinxScarf`
- State changes: `contact=scarf`

**Choice 4: Ask whether Shinx is all right before anything else**
- Immediate response: You ask about Shinx instead of the machine. Someone inside moves closer.
- Destination: `lumi`
- Available when: `always`
- State changes: `contact=shinx`

## lumi — The Keeper Who Was Afraid
Chapter 5 · Entry: tower

Lumi opens the door just wide enough to see your face. She is a small Clefairy with a yellow scarf wrapped around one wrist, and she has been awake for far too long. Shinx rests beside a glass sphere filled with spinning points of light. He has a bandaged paw, and a blue spark at his fur flickers whenever the sphere dims. Lumi admits she activated the Starlight Glass after Shinx fell during a storm. Its borrowed light helped stabilize his weak electric spark. Then the sphere locked, and the valley went dark. “I sent a letter,” she whispers. “Then I was too frightened to open the door.” Shinx looks up. “You are all talking about me again.” Nobody touches the controls yet.

**Conditional paragraph — `reply=sent`:** A Hoothoot carrying the river reply arrived earlier; Lumi shows you your own words, folded beside the sphere. “I did not think anyone would come,” she says.

**Conditional paragraph — `contact=knock`:** “Thank you for knocking,” Lumi says. “I thought everyone would be angry.”

**Conditional paragraph — `contact=seed`:** She recognizes the seed immediately. “The Glass really did ask for help.”

**Conditional paragraph — `contact=shinx`:** Shinx answers, “My paw hurts. I am tired of being treated like a secret.”

**Conditional paragraph — `contact=scarf`:** Shinx gives a delighted squeak at the sight of his scarf. Lumi laughs once, shakily.

**Conditional paragraph — `letter=kept`:** Lumi recognizes the damp paper in your pack. “That was my first attempt to ask for help,” she says. “Thank you for bringing it back.”

**Choice 1: Ask Lumi exactly what happened after the accident**
- Immediate response: “I need to know where the danger began,” you say. Lumi takes a shaky breath and starts at the storm.
- Destination: `listen`
- Available when: `always`
- State changes: `talk=history`

**Choice 2: Show Lumi the note, if you kept it**
- Immediate response: Lumi recognizes her handwriting and nods. “I really did send that,” she says.
- Destination: `listen`
- Available when: `letter=kept`
- State changes: `talk=letter`

**Choice 3: Tell her you came to listen, not to blame**
- Immediate response: You sit where Lumi can see you clearly and wait for her to speak.
- Destination: `listen`
- Available when: `always`
- State changes: `talk=comfort`

**Choice 4: Return Shinx’s scarf and let him speak**
- Immediate response: Shinx takes back the scarf and wraps it around his neck before clearing his throat.
- Destination: `listen`
- Available when: `item=shinxScarf`
- State changes: `talk=scarf;item-=shinxScarf`

## listen — The Truth Between Two Friends
Chapter 5 · Entry: lumi

Lumi tells the whole story. Shinx slipped on wet stone while helping her repair the tower’s storm bell. His injured paw made it difficult for him to regulate his electric charge, and he became dangerously cold in the mountain wind. The Glass supplied steady warmth while they waited for help—but its old lock can close when one keeper refuses to transfer responsibility to anyone else. Mira’s supplies and ordinary shelter could help Shinx recover now, especially with friends to carry him safely. Lumi thought releasing the stars meant abandoning him. Shinx lifts his head. “I want to get better,” he says. “But I also want you to sleep. And I want the sky back.” The sphere answers his words with one clear chime.

**Conditional paragraph — `talk=history`:** Lumi admits she was afraid to call Mira because she thought the village would blame Shinx.

**Conditional paragraph — `talk=letter`:** Lumi turns the damp note over. “I wrote it before the lock closed completely.”

**Conditional paragraph — `talk=scarf`:** With his scarf back, Shinx sits up a little straighter. “I thought we had lost that too.”

**Conditional paragraph — `companion=Eevee`:** Eevee presses close to Lumi without demanding an answer.

**Choice 1: Ask Shinx what kind of help he wants first**
- Immediate response: You give Shinx time to answer. “Warmth, a rest, and a chance to decide what happens next,” he says.
- Destination: `plan`
- Available when: `always`
- State changes: `shinxChoice=asked`

**Choice 2: Promise Lumi that she need not carry the work alone**
- Immediate response: Lumi lets her shoulders drop. “I will ask next time,” she says, “even if I am embarrassed.”
- Destination: `plan`
- Available when: `always`
- State changes: `lumiTrust=promise`

**Choice 3: Share the old rules you discovered**
- Immediate response: You show Lumi the rule you copied, and she points out the safe release latch.
- Destination: `plan`
- Available when: `knowledge=rings OR knowledge=sphere`
- State changes: `knowledge=shared`

**Choice 4: Ask Lumi to show you how the three rings work**
- Immediate response: Lumi demonstrates each ring with one small spark rather than risking the whole sphere.
- Destination: `plan`
- Available when: `always`
- State changes: `knowledge=demonstrated`

## plan — Three Rings, One Sky
Chapter 5 · Entry: listen

Lumi shows you the three rings, now that everyone knows the full problem. The SKY ring will send all borrowed reflections home at once; Shinx must already have steady warmth and safe transport. The HEART ring transfers the stored warmth into a circle of willing helpers before returning the stars. The EARTH ring sends the warmth into a living receiver grown from your silver seed, then frees the trapped reflections. The Glass cannot give warmth and keep the sky locked forever. Each way involves a choice about where help comes from next. Mira has already promised a warm shelter in the village and can answer the lantern signals from this window. You agree to check the source of warmth, the journey and Shinx’s consent before any ring is opened. Shinx makes one request: “Please ask me before moving me.” Lumi nods. For the first time, she steps away from the controls.

**Conditional paragraph — `shinxChoice=asked`:** Shinx says, “A warm blanket and a ride home. And I want to see the stars tonight.”

**Conditional paragraph — `lumiTrust=promise`:** Lumi takes your hand and says, “Then I can finally stop pretending I know everything.”

**Conditional paragraph — `knowledge=shared`:** Lumi recognizes the warning you copied and shows exactly which latch it describes.

**Conditional paragraph — `knowledge=demonstrated`:** She demonstrates the rings with a single borrowed spark; the light returns to its tiny window when she releases the lever.

**Conditional paragraph — `companion=Eevee`:** Eevee stays close to Lumi but lets Shinx choose whether to be touched.

**Conditional paragraph — `companion=Pikachu`:** Pikachu offers one carefully measured spark to the heart-ring circuit, but waits for permission.

**Conditional paragraph — `companion=Hoothoot`:** Hoothoot repeats the three-note greeting you first heard on the hill.

**Conditional paragraph — `companion=Psyduck`:** Psyduck checks the steps of the plan one by one, just as it practised at the ferry.

**Choice 1: Prepare a safe immediate release with the sky ring**
- Immediate response: You check the blanket, the door and the way down before touching the sky ring.
- Destination: `sky`
- Available when: `always`
- State changes: `plan=sky`

**Choice 2: Ask willing friends to form a shared warmth circle**
- Immediate response: You ask everyone in turn, including Shinx, whether they want to help.
- Destination: `heart`
- Available when: `always`
- State changes: `plan=heart`

**Choice 3: Carry the seed to the garden balcony for the earth ring**
- Immediate response: You and Lumi carry the seed into the growing light beside the balcony planter.
- Destination: `earth`
- Available when: `always`
- State changes: `plan=earth`

**Choice 4: Ask Mira to organize help from Willowbrook before release**
- Immediate response: You flash Mira’s festival signal from the tower window. A bright reply rises from the village.
- Destination: `heart`
- Available when: `always`
- State changes: `plan=village`

## sky — The Sky Ring
Chapter 5 · Entry: plan

The sky ring clicks into place. Outside, the valley waits without its usual stars. Shinx cannot be left in the cold tower while the light is released. You check his blanket and the path down. Mira has a lit shelter ready at Willowbrook; you prepare a well-wrapped carrier with a warmed stone, a covered lantern and a safe footpath down. You check the stone with your hand: comfortably warm, never hot. Your partner can help carry supplies. This basic plan works without any special item. There is also a warm feather nest if you brought one, or a safe portable glow made by Charmander. “Tell me when to move,” Shinx says. He is frightened too, but he wants to help choose.

**Choice 1: Wrap Shinx and carry him down to Mira while Lumi opens the Glass**
- Immediate response: Shinx agrees to the padded carrier. You warm and secure it before Lumi releases the Glass. The group leaves immediately for Mira’s prepared shelter.
- Destination: `endDawn`
- Available when: `always`
- State changes: `endingMethod=home`

**Choice 2: Use Altaria’s feather to make a warm nest, then open the Glass**
- Immediate response: You settle Shinx into the nest and make sure it holds warmth before Lumi releases the stars.
- Destination: `endAurora`
- Available when: `item=feather`
- State changes: `item-=feather;endingMethod=feather`

**Choice 3: Ask Charmander to maintain safe warmth during the release**
- Immediate response: Charmander chooses a safe place beside Shinx, where its carefully guarded tail can keep the nest warm.
- Destination: `endAurora`
- Available when: `starter=Charmander`
- State changes: `endingMethod=charmander`

**Choice 4: Use the steady bell rhythm to help Shinx rest while releasing the light**
- Immediate response: The three notes help Shinx keep calm, but music cannot replace heat. You use the same padded carrier and warmed stone as the ordinary descent before Lumi opens the Glass.
- Destination: `endSong`
- Available when: `rhythm=known OR melody=known`
- State changes: `endingMethod=rhythm`

## heart — The Heart Ring
Chapter 5 · Entry: plan

The heart ring does not work because friends stand near it. It works only when someone freely agrees to share a little warmth for a while. Your starter agrees at once. Lumi agrees after a pause. Shinx agrees to receive it. You set the ring to RETURN, but keep the release latch closed until the new warmth source is ready. A faint line of light connects the sphere to the volunteer lanterns; the stars are still held until you finish the transfer. Mira answers your tower signal with three flashes: Willowbrook’s volunteers have lit their festival lanterns and agreed to help if called upon. Their lanterns can take the final portion below; if everyone stays at the tower, a small circle and the prepared shelter can keep Shinx safe until he can travel. No Pokémon is asked to give more than it chooses.

**Choice 1: Link the ring to Mira’s festival lanterns and share the work with the village**
- Immediate response: The village lanterns answer your signal, each giving a tiny part of its light without going dark.
- Destination: `endLantern`
- Available when: `always`
- State changes: `endingMethod=community`

**Choice 2: Keep a staffed recovery room at the tower while the stars return**
- Immediate response: Lumi writes the names of willing helpers on the observatory slate. Shinx approves the timetable.
- Destination: `endSanctuary`
- Available when: `always`
- State changes: `endingMethod=sanctuary`

**Choice 3: Use a familiar three-note melody to guide the shared release**
- Immediate response: The heart ring pulses to your low–high–low song until it can release the remaining light.
- Destination: `endSong`
- Available when: `rhythm=known OR melody=known`
- State changes: `endingMethod=song`

**Choice 4: Let Shinx set the pace as the warmth passes between helpers**
- Immediate response: Shinx counts each transfer into the chain of willing village lanterns and gives the release signal himself. Lumi waits for his nod, then returns the reflections.
- Destination: `endLantern`
- Available when: `always`
- State changes: `endingMethod=shinx`

## earth — A Seed for Tomorrow
Chapter 5 · Entry: plan

Lumi guides you onto the garden balcony, safely away from the fragile sphere. Your silver seed opens into a star-shaped leaf. It was never an ordinary plant: the Glass sends one living receiver into the valley whenever it can no longer return light by itself. The silver leaf can hold a safe store of gentle warmth while every reflected star returns to the sky. It can then be carried down to the village garden in a padded pot, or kept in the tower’s recovery room. The leaf needs care, but it will not go cold during the journey. If kept in a tower planter, it can supply a small recovery room while the Glass empties. Before releasing the stars, you and Lumi settle Shinx into a nest beside the receiver. You choose who will tend the plant and where it will live once the Glass is empty. It needs water, sunlight and caretakers. “I like that it cannot grow all by itself,” Shinx says.

**Conditional paragraph — `ordinarySeed=planted`:** You remember the ordinary seed left in the forest. Not all things that grow need magic.

**Conditional paragraph — `river=lanterns`:** Psyduck’s lantern channel offers a safe, watered route for the young receiver; Lumi points it out on the map.

**Conditional paragraph — `item=feather`:** The feather remains in your bag unless you used it to warm Shinx; neither the seed nor the ring uses it automatically.

**Choice 1: Plant the receiver in Willowbrook’s shared garden**
- Immediate response: You set the young receiver in a travel pot. It takes over the necessary warmth, and Lumi releases the reflections. Tomorrow, you will plant it with Mira in Willowbrook.
- Destination: `endGarden`
- Available when: `always`
- State changes: `endingMethod=garden`

**Choice 2: Grow the receiver into a vine with Bulbasaur and its roots**
- Immediate response: Bulbasaur shapes a soft vine basket around the living receiver. The plant holds steady warmth while Lumi releases the reflections; you will carry it down to the village garden.
- Destination: `endGarden`
- Available when: `starter=Bulbasaur`
- State changes: `endingMethod=vine`

**Choice 3: Use the receiver to open a staffed tower sanctuary**
- Immediate response: You place the receiver in a deep pot and make sure a team of helpers will tend it.
- Destination: `endSanctuary`
- Available when: `always`
- State changes: `endingMethod=plant_sanctuary`

**Choice 4: Plant the receiver beside Psyduck’s floating lantern channel**
- Immediate response: You prepare a padded travel pot and send Mira a lantern signal asking her to meet you at Psyduck’s river channel. The receiver takes the warmth, and the stars return overhead.
- Destination: `endGarden`
- Available when: `river=lanterns`
- State changes: `endingMethod=reeds`

## endDawn — The Homeward Dawn
Chapter 5 · Entry: sky, heart or earth as specified

The Glass opens, and the borrowed stars return to their familiar places above Willowbrook. The warm stone in his padded carrier stays comfortably warm as you descend. On the way down, you and your partner take turns carrying Shinx while Lumi holds the lantern. Mira meets you at the village gate with warm water, clean bandages and a bed beside the fire. Shinx says that he wants to walk the last three steps himself. He manages two, then accepts a hand for the third. Lumi tells Mira what happened and agrees to help repair the old machine after everyone has rested. At the next festival, two lanterns are lit together: one for those at home, one for those finding their way. When the Glass is safe, the seed becomes an ordinary silver-leaved sprout. You plant it in Mira’s window box.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur carries Shinx’s blanket without letting it drag over the stones.

**Conditional paragraph — `starter=Charmander`:** Charmander walks near the carrier, careful not to bring its tail too close.

**Conditional paragraph — `starter=Squirtle`:** Squirtle checks every slippery step on the path down.

## endAurora — The Aurora Promise
Chapter 5 · Entry: sky, heart or earth as specified

The nest stays warm even as the sphere empties. Lumi turns the sky ring, and every borrowed reflection returns to its own star. For a moment the last stored glow makes curtains of green and gold across the mountain sky—an aurora, not a replacement for the stars. Shinx settles deeper into his nest and smiles at the real constellations overhead. “Look,” he says, “they were waiting.” Altaria checks the shelter each morning while Mira brings bandages and food. Lumi learns to ask for help before she is desperate. Shinx heals slowly, with one magnificent hop to celebrate his first snow-free day. With its alarm finished, the little silver seed rests quietly in Altaria’s mountain planter.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur keeps the soft nest steady with its vines.

**Conditional paragraph — `starter=Charmander`:** Charmander watches the sky while keeping its small safe flame in place.

**Conditional paragraph — `starter=Squirtle`:** Squirtle sets a cup of water beside the warm nest for when Shinx wakes.

## endSong — The River of Stars
Chapter 5 · Entry: sky, heart or earth as specified

The three notes begin softly: low, high, low. Your friends repeat them at their own pace; nobody needs to be a perfect singer. The rhythm tells Shinx when the release begins and gives Lumi the courage to open her hand. The Glass returns all the reflected stars, while its remaining warmth passes into a prepared warmed-stone carrier and the shelter lantern. The song is a guide for the transfer, not a cure by itself. Down the mountain the Lumen River catches the song and carries it back as a cheerful echo. By morning the sky is whole. At the next Starlight Festival the village sings those three notes before lighting its lanterns, and Shinx insists upon leading—even though he is wonderfully off-key. With its work complete, the silver seed is planted beside the river path where the song is remembered.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur taps the low beat gently against the floor.

**Conditional paragraph — `starter=Charmander`:** Charmander hums a surprisingly squeaky high note.

**Conditional paragraph — `starter=Squirtle`:** Squirtle insists on conducting with a twig that is much too big.

## endSanctuary — The Starlight Sanctuary
Chapter 5 · Entry: sky, heart or earth as specified

A living earth receiver or a circle of willing helpers—depending on the route you chose—holds a small, temporary warmth inside the tower while the Glass empties and returns every borrowed reflection to the sky. There is no more stolen darkness. With Mira’s help, Lumi makes the old observatory into a real sanctuary: dry beds, a pantry, safe paths and a posted schedule of volunteers. Shinx chooses to recover there before traveling. He greets each visitor from his cushion and occasionally orders everyone to rest. “A very important medical instruction,” he calls it. The silver seed grows in a pot by the window, never locked away and never forced to do the work of a whole village. The seed stays in a tended pot by the tower window, whether or not it served as the living receiver.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur trains a vine around the new window planter.

**Conditional paragraph — `starter=Charmander`:** Charmander teaches volunteers how to keep a heater safely away from the bedding.

**Conditional paragraph — `starter=Squirtle`:** Squirtle draws a neat watering schedule and signs it with a wet paw.

## endLantern — The Lantern League
Chapter 5 · Entry: sky, heart or earth as specified

Mira sends a signal from the village gate. One by one, festival lanterns answer, until a chain of light climbs the mountain path. The heart ring draws a little willing warmth from each lantern; no one loses their flame. With the warmth safely shared, Lumi opens the Glass and the stolen reflections fly home to the stars. Shinx is carried down with the others and rests near Mira’s hearth. At the next festival, every lantern carries a painted mark of a helping hand. Lumi speaks first at the celebration. “I thought I had to save my friend all by myself,” she says. Shinx interrupts: “It was exhausting watching her try.” Everyone laughs, including Lumi. Mira plants the quiet silver seed beside the festival lantern stand.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur makes a green vine handle for the first lantern.

**Conditional paragraph — `starter=Charmander`:** Charmander carefully lights the lantern at the front of the procession.

**Conditional paragraph — `starter=Squirtle`:** Squirtle checks each lantern lid for rain leaks before the festival.

## endGarden — The Living Constellation
Chapter 5 · Entry: sky, heart or earth as specified

After Lumi returns every reflected star at the tower, the living receiver safely holds the warmth Shinx needs for his journey. The next morning, you and Mira plant the little silver receiver in Willowbrook, where people and Pokémon can tend it together. Its roots gradually reach toward the Lumen River; its leaves hold only the gentle warmth needed for the village shelter. Then the Glass releases every borrowed reflection back to the real sky. The tree’s shining leaves never pretend to be stars: they make a new pattern here on earth, a promise that help can grow without taking light from someone else. Shinx rests beneath its branches as his paw heals. Lumi keeps a careful garden journal; you and your partner keep forgetting to water exactly the same corner. At the next festival, the tree shines quietly beneath a sky filled with real stars. The seed is rooted in Willowbrook as the living receiver; it is not still sitting in your pouch.

**Conditional paragraph — `starter=Bulbasaur`:** Bulbasaur gently tests the soil without disturbing the young roots.

**Conditional paragraph — `starter=Charmander`:** Charmander keeps insects warm at the garden edge on a chilly evening.

**Conditional paragraph — `starter=Squirtle`:** Squirtle takes watering duty much too seriously and soaks your shoes.

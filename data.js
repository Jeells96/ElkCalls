/* =========================================================================
   ELK CALL DATA  —  single source of truth for the guide and the field card.
   Edit here to add or refine calls, scenarios, and principles.

   role : locate | direct | emotion | challenge | cue | combo   (drives color)
   voice: "cow" | "bull"   (who makes the call — powers the Cow/Bull toggle)
   flag : optional honesty tag; text is shown, FLAG_TITLES gives the tooltip
   ========================================================================= */

const ROLES = {
  locate:    { label:"Locate",    var:"--locate",    blurb:"Find him & open contact" },
  direct:    { label:"Direct",    var:"--direct",    blurb:"Bring him in to you" },
  emotion:   { label:"Emotion",   var:"--emotion",   blurb:"Add feeling & urgency" },
  challenge: { label:"Challenge", var:"--challenge", blurb:"Bull aggression & dominance" },
  contact:   { label:"Contact",   var:"--contact",   blurb:"Everyday check-ins inside the group" },
  combo:     { label:"Combo",     var:"--combo",     blurb:"A string of calls" },
};

const FLAG_TITLES = {
  "videos 1–9": "Defined more fully in the earlier videos of the cow-vocalization series; the meaning here is inferred from context.",
  "general elk": "Widely-taught elk behavior, carried over with the same “calls are words” approach — not defined in the cow-vocalization series. Can be pinned to a specific source if you have one.",
  "pending": "The clip is here; Chris Roe’s definition is being added from his bull lesson.",
};

const CALLS = [
  /* ---------------------- COW ---------------------- */
  { id:"chirp", name:"Chirp", role:"contact", voice:"cow",
    clip:"assets/media/chirp.mp3",
    short:"Basic “checking-in” contact between close companions; asks for a response, not action.",
    meaning:"The most basic contact call — a content, relaxed animal checking in with another elk in its own group (classically a cow to her calf). It asks for a response, not an action: the reply is what tells her whether all is well or something’s wrong.",
    lesson:[
      { h:"The three keys", body:"Get these right and it reads as a chirp:<ul><li><b>Short</b> — about a quarter-second.</li><li><b>Smooth, even slide</b> from the high note straight down to the low (a straight line, high→low).</li><li><b>Even emphasis</b> on both notes — neither is stressed.</li></ul>Changing the transition or the emphasis is what turns it into a different call, so keep it short and even." },
      { h:"What it means", body:"A chirp comes from a <b>content, relaxed</b> animal — grazing, bedded, chewing cud — and it’s aimed at another elk <b>inside its own group</b> (classically a cow to her calf), never at an outside elk. Most important: it asks for a <b>response, not an action</b>. Chris’s picture: a parent on the couch calling “Kids!” just to hear “Yeah, Dad!” A calm answer and she goes back to what she was doing; any other answer and she’s instantly alert. <b>The reply dictates her next move.</b>" },
      { h:"How Chris uses it", body:"<b>1) Suggest a couple of relaxed cows nearby.</b> Deadly on midday hunts once you’ve slipped within ~100 yards of a bedding area undetected. Elk bed and nap/chew ~3–4 hours, then rise to stretch, nibble, or water. Note the last time you heard them move into the bed, give ~30–45 min to settle, then be set up beside the bed no more than ~3 hours later — don’t crowd in too early or wind and movement bust you. Once set, <b>chirp and answer every 5–15 minutes</b>: you’re only suggesting a couple of unbothered cows are hanging out, and a bull will sometimes leave his cows to come look. Works on cows too — and don’t over-call.<br><br><b>2) Coax a hung-up elk a step or two.</b> Keep a diaphragm ready so you don’t move. Watch the ears and eyes: coming in, both point the same way; as it searches, the ears swivel. Just as a nervous or bored elk <b>starts to shift its gaze away</b>, hit it with a soft chirp — mid-shift its brain can’t pin the source, so it often snaps back and steps toward you. Timing is everything." },
      { h:"Making the sound", body:"On a diaphragm or open reed, use a <b>short puff from the throat/tongue</b>, not the diaphragm — pushing from the diaphragm carries it too long and turns it into a mew. Start high, quick puff, immediately drop to the low note. <b>Calf</b> = the highest-pitched chirp (out on the tip of an open reed); <b>cow</b> = high-medium to low (mid-reed). Chris favors a quality open reed (a Hyperlip Single with a tone converter, which mimics an elk calling with its mouth closed — quieter, slightly altered tone). Can’t keep it short? A mechanical call like a Hoochie Mama helps: press the bulb until you just feel the plunger, then a short, sharp push." },
      { h:"Takeaways", body:"<ul><li>The most basic contact call in the elk language.</li><li>Very short; smooth high→low; even emphasis.</li><li>Between closely-associated animals, within the group — not to outside elk.</li><li>Asks for a <b>response</b>, not an action.</li></ul>" }
    ],
    pairs:["mew","lostMew"] },

  { id:"mew", name:"Basic mew", role:"contact", voice:"cow",
    clip:"assets/media/mew.mp3",
    short:"Everyday “staying in touch” contact within the group; implies movement. Asks for a response, not an action.",
    meaning:"The everyday contact call cows use to <b>stay</b> in touch — a step up from the chirp. It says “Are you still there?” / “I’m right here,” between animals in the same group (not to outside elk), and it asks for or gives a response, not an action. The key: elk mew when they can’t keep visual track of each other — so a mew implies the group is up and moving, doing something.",
    lesson:[
      { h:"Structure &amp; the four keys", body:"About <b>½–¾ second</b>, a smooth even slide high→low with even emphasis (structurally, a longer chirp). Four things to understand:<ul><li>Mews happen when <b>something is going on within the group</b>.</li><li>They <b>imply movement and activity</b> — the elk are up on their feet.</li><li>They’re aimed <b>within the group</b>, not at an outside elk.</li><li>They <b>ask for or give a response</b>, not an action.</li></ul>" },
      { h:"Why it means “movement”", body:"Elk trust their eyes first and only lean on their voice when sight isn’t enough. So when elk are mewing back and forth, sight <b>isn’t</b> cutting it — they’re in heavy cover, spread out and moving, or a new animal has joined and they’re sorting it out. Chris’s livestock test: cattle calm in an open pasture are silent; pull the calves or load a trailer and they bawl their heads off. Mewing = something changed and they can’t keep visual contact." },
      { h:"How Chris uses it (deliberately)", body:"Most hunters just “mew to sound like a bunch of elk” — and that backfires. A bull drawn to the commotion arrives expecting to <b>see</b> moving elk; when there’s nothing there and it goes quiet, he gets nervous and leaves (the classic hang-up). Mews can even <b>push elk away</b>: a wall of cow/calf mews reads as a threat to protective cows, and they’ll drag their bull off (it’s the cows pulling him away, not him pushing them). Use it purposefully to paint a <b>real</b> picture:<br><br><b>1) Elk on the move.</b> Mew as you travel, snap a twig, roll a rock — sound like a group crossing the terrain — then phase the mewing out as you “arrive” and set up.<br><br><b>2) Elk staging in cover.</b> Set up <b>back inside</b> the timber on the edge of a feeding area and mew: it’s plausible a group is staging there before stepping out, and the bull has to come <b>peer in</b> to see the cows rather than hang up at the edge. Shines pre-rut and post-rut." },
      { h:"Making the sound", body:"Smooth push from the diaphragm: start high, immediately drop to the low note. <b>Calf</b> = the highest-pitched mew (tip of the reed); <b>cow</b> = high down to low (mid-to-lower reed). Chris uses a Hyperlip Single with a tone converter. On a mechanical call, a quick smooth push — but keep the barrel turned in or the bulb slightly depressed, or a full-bulb push turns it into a <b>lost mew</b> instead." },
      { h:"Takeaways", body:"<ul><li>The next step up from the chirp in contact talk.</li><li>~½–¾ second, smooth high→low, even emphasis.</li><li>Asks for or gives a <b>response</b>, not an action.</li><li>Aimed <b>within the group</b>, not at an outside elk.</li><li><b>Implies movement</b> and activity — so only use it where that makes sense.</li></ul>" }
    ],
    pairs:["chirp","lostMew","assemblyMew"] },

  { id:"lostMew", name:"Lost mew", role:"locate", voice:"cow",
    clip:"assets/media/lost-mew.mp3",
    short:"“Where are you?” — with the implied “…so I can come to you.” Asks for a response, not an action. Hold or punch the high note.",
    meaning:"“Where are you?” — asked by an elk looking for an unseen animal, inside or outside its group. The catch is the implied second half: <b>“…so that I can come to you.”</b> It asks for a <b>response, not an action</b> — which is exactly why a bull will answer every call and never take a step. It’s not only a separated cow or calf; it’s any elk seeking a response from one it can’t see.",
    lesson:[
      { h:"What it means", body:"An elk looking for some individual or group it can’t see. Unlike the chirp and mew (which stay inside the group), the lost mew can reach an animal <b>inside or outside</b> the group — this is where general contact becomes specific communication. It asks for a <b>response, not an action</b>, and carries the implied understanding “<b>where are you, so that I can go to you</b>.” Most hunters know it as the “lost cow / lost calf call,” but it isn’t only a separated animal." },
      { h:"Why he bugles back but never comes", body:"The classic complaint — he answers every call and still doesn’t come, then drifts off or goes silent. It’s usually not the wind, call-shyness, or bad calling: <b>he’s doing exactly what you asked.</b> You said “where are you?”, he said “over here,” and now he’s waiting for <b>you</b> to show up. Chris’s barbecue picture: you shout “where are you?” from the driveway, they shout “back here!” — and then you just keep shouting from the same spot. Eventually they either come get you (some elk will), or shrug you off (many will). And because a lone cow can be unwelcome, an adult cow sound can even work against you." },
      { h:"Making the sound", body:"About <b>½–¾ second</b> (up to a full second at most). Start high, <b>hold or punch that high note</b>, then <b>quickly</b> drop to the low note — the held/emphasized top is what separates it from a plain mew. Both deliveries occur: some elk drag the top out, others punch it. Push from the diaphragm. <b>Calf</b> = the highest pitch (tip of the reed); <b>cow</b> = high through low (center of the reed). On a mechanical call, do the opposite of a mew: run the barrel <b>all the way out</b> and push with a <b>full bulb</b> so you get the lengthened high note." },
      { h:"How Chris uses it", body:"<b>1) As a locator.</b> When you’d rather not bugle, send a lost mew, get an answer, then go to him or plan a setup.<br><br><b>2) Work your way in as a lost calf.</b> Since the call implies <b>you</b> travel, do exactly that — and sound like a <b>calf</b>, not a cow: it avoids threatening cows, plays on maternal instinct, and it’s plausible a calf doesn’t know the country. Answer, close to a few hundred yards, hammer back excited, then drift toward the <b>downwind</b> side rather than straight at him, calling now and then, as if the calf can’t quite work out how to reach him. As you get close, slow down and call <b>more</b> often. Bulls alone come readily to calf sounds; if he has cows, a calf often breaks out first (be patient, don’t spook it) and a cow follows to collect it — and then the bull moves to gather her. Either way he’s in motion toward you.<br><br><b>3) Calf in distress — a last resort.</b> Best for rifle/muzzleloader. It’s invasive and can scatter elk, so save it for the last day or two. Take the nastiest, darkest bedding/escape timber, walk fast cutting cross-country (skip the game trails), and hammer lost calf mews back-to-back — “about every time my left foot hits the ground” — snapping twigs and stumbling on purpose. Elk will either stand up and stare or come crashing in to whip up on whatever’s chasing that calf. Be ready fast; the bull often stands last or hangs at the back." },
      { h:"Takeaways", body:"<ul><li>~½–¾ second; start high, <b>hold or emphasize the high note</b>, then drop quickly.</li><li>Asks for a <b>response</b>, not an action.</li><li>Means “<b>where are you — so that I can come to you</b>.”</li><li>Reaches animals <b>inside or outside</b> the group, and any unseen elk — not just a lost one.</li><li>If you won’t go to him, pair it with an assembly mew or you’re leaving the choice entirely to him.</li></ul>" }
    ],
    pairs:["assemblyMew","demandingMew","frustratedWhine","longMew"] },

  { id:"assemblyMew", name:"Assembly mew", role:"direct", voice:"cow",
    clip:"assets/media/assembly-mew.mp3", video:"assets/media/assembly-mew.mp4",
    short:"“Come to me — join me here.” Asks for an action, not a reply; often answers a lost mew. The most universal call.",
    meaning:"“I want you to come to me.” The directing call: it asks another animal for an action — join me in my location — not a vocal reply, and it’s often the answer to a lost mew. Cows use it to call calves in to nurse and to regroup the herd, so every elk has known it from birth. Almost always an adult, so it’s made at a medium-to-low pitch — and it’s the most universal call you have.",
    lesson:[
      { h:"What it means", body:"“I want you to come to me — join me in my location.” The assembly mew calls for an <b>action</b> (come to me), <b>not a vocal response</b>, and it’s very often the answer to a lost mew. It can be aimed at an animal inside or outside the group, and — unlike the lost mew — at one you can’t see (visual contact doesn’t matter here). Cows use it to call calves in to nurse and to regroup the herd after it spreads out feeding or gets busted up, so <b>every elk has known this call from birth</b>. It’s almost always made by an <b>adult, dominant</b> animal — so reproduce it in a <b>medium-to-low pitch</b>." },
      { h:"Making the sound", body:"Duration is roughly <b>¾ to 1 second</b>: start high, <b>immediately drop to the low note, and hold it</b>. An open reed is by far the best tool — Chris’s top pick is the <b>Primos Hyperlip Double with the tone converter</b>. Cows often give the assembly mew with their mouth closed (sound out the nose), so being able to mimic that quieter, slightly-altered tone matters, and the tone converter nails it. Use a smooth push of air from the diaphragm. Note: no mechanical call can make a proper assembly mew — it’s the physics of how the tone is produced." },
      { h:"How Chris uses it", body:"<b>Pre-rut, on lone &amp; satellite bulls.</b> Find a bull (a pre-season spot, or a contact bugle), slip within ~100 yards, get your setup and wind right, converter on, give a couple assembly mews — and wait. He’ll often come <b>silent</b> (a twig snap, gravel crunch), or with soft bull mews/huffs/whines/glunks; if something slips in softly mewing, 9 times out of 10 it’s the bull, not a cow. Around a herd bull, <b>satellite bulls trip over themselves</b> to be first to your “come to me” — keep steadily hitting it until one’s on top of you, then take him.<br><br><b>Caution with herded-up bulls.</b> If a bull has cows and there are no satellites, you’re imitating an adult cow — mind protective cows. Only use the assembly mew if you might pull him away even briefly; otherwise play it smarter.<br><br><b>Rifle hunters.</b> To make a herd bull just step out (50–500 yds), hammer the assembly mew; pull the tone converter off for more volume. He’ll likely bugle back (he wants you to come to him), but stay on him and he’ll usually poke out to make eye contact — often all you need.<br><br><b>After you bump a group.</b> If they all flee one direction, let them go. If they scatter every which way, move toward where the bull went, set up, let it settle, then softly start the assembly mew. Elk that don’t know why they ran are eager to regroup — be the first to say “come to me” and the whole group (often the bull first) comes back. If another cow answers with her own assembly mew, that’s the lead cow — out-hammer her." },
      { h:"Takeaways", body:"<ul><li>~¾–1 second: high → immediately low → <b>hold</b> the low.</li><li>Calls for an <b>action</b>, not a vocal response.</li><li>Says <b>“come to me,”</b> and is often the response to a lost mew.</li><li>Almost always an <b>adult</b> animal — use a medium-to-low pitch, and mind protective cows.</li><li>The most <b>universal</b> call you have — a safe bet when in doubt (though no call is a magic bullet).</li></ul>" }
    ],
    pairs:["lostMew","frustratedWhine","demandingMew","longMew"] },

  { id:"demandingMew", name:"Demanding mew", role:"emotion", voice:"cow",
    clip:"assets/media/demanding-mew.mp3", video:"assets/media/demanding-mew.mp4",
    short:"The exclamation point — “now.” Tagged onto a lost or assembly mew when they’re too slow.",
    meaning:"A mew that tags an exclamation point — the word “now” — onto the call before it. It never stands alone: it rides on the back of a lost mew (“Where are you? Answer me — now.”) or an assembly mew (“Come here — now.”). Any age uses it when a request isn’t answered in the timeframe they wanted.",
    lesson:[
      { h:"What it means", body:"A demanding tone added to whatever vocalization came before it — specifically a <b>lost mew</b> or an <b>assembly mew</b>. It adds a figurative exclamation point, the implication of “<b>now</b>”: lost + demanding = “Where are you? Answer me. Now.”; assembly + demanding = “Come here. Now.” Every age uses it — high-pitched lost calf mews and adult assembly mews alike — when they don’t get the response or action they want, when they want it." },
      { h:"Making the sound", body:"Structured like a contact mew (high→low), roughly <b>half a second</b>, but with a strong, <b>even emphasis punched through the whole call</b> — a harder breath of air than a normal mew. Push from the diaphragm; start high, immediately drop to the low note and punch it. Works with or without the tone converter. On a mechanical call, make your lost mew and then — instead of letting the bulb come all the way back — give the plunger a second quick thrust; don’t shove so hard you squelch it." },
      { h:"How Chris uses it", body:"Any time you want to add urgency or impatience. If you’re on the lost mew and a bull’s being tight-lipped, tag a demanding mew to figuratively snap your fingers: “Hey — answer me. Where are you?” If you’re on the assembly mew and he hasn’t come or is lollygagging, hit him again but slap a demanding mew on it: “I said — come here. Now.” Sometimes that’s all it takes to break one loose." },
      { h:"Takeaways", body:"<ul><li>About half a second; high→low but with a <b>strong, even emphasis</b> throughout.</li><li>Always <b>tagged onto</b> a lost mew or an assembly mew — never alone.</li><li>Adds an <b>exclamation point / “now.”</b></li><li>Cows and calves both use it when a request isn’t answered in the manner or timing they want.</li></ul>" }
    ],
    pairs:["lostMew","assemblyMew","frustratedWhine"] },

  { id:"longMew", name:"Long mew", role:"emotion", voice:"cow",
    clip:"assets/media/long-mew.mp3",
    short:"A drawn-out “where are you — I want to be with you”: a lost mew crammed against an assembly mew, with eagerness. Adds emotion mid-sequence.",
    meaning:"A long, drawn-out “Where are you? I want to be with you,” — essentially a lost mew crammed up against an assembly mew. It’s the sound of an eager cow seeking someone out, and it’s Chris’s honest answer to the vague advice to “add emotion / sound pleading”: the emotion just rides on the underlying ask (where are you + come to me).",
    lesson:[
      { h:"What it means", body:"A long lost-mew-into-assembly-mew: “Where are you? I want to be with you,” / “why aren’t you coming?” It’s a cow eager to find someone and be with them. Chris is candid that he isn’t sure whether it’s a truly unique call or two mashed together (like the hyper-hot) — he names it the “long mew” just to have a clear label for it." },
      { h:"The “add emotion” myth", body:"This is the call behind all the advice to “drag it out and sound pleading.” Chris’s point: <b>emotion isn’t its own vocalization — it supports whatever you’re already saying.</b> You can plead in a lost mew (“please, answer me”) or plead in an assembly mew (“please, come here”). The long mew simply carries that eagerness on top of a where-are-you + come-to-me." },
      { h:"Making the sound", body:"Usually <b>1–2 seconds</b>: stretch and emphasize the high note, fall, then stretch and emphasize the low note (how far it drops varies a lot). In the update video he demos it on Steve Chapel / Bugling Bull open reeds (the Trophy Wife and Matriarch) — built like a Hyperlip Single but with a wide reed and no tone converter." },
      { h:"How Chris uses it", body:"Not as an opener. In a targeted sequence he uses <b>lost mews</b> to locate and start the dialogue, transitions to <b>assembly mews</b>, and then — if things aren’t moving fast enough — layers in emotion: the long mew alongside frustrated whines and demanding mews to push the assembly mew along." },
      { h:"Takeaways", body:"<ul><li>~1–2 seconds: stretched high → fall → stretched low.</li><li>An eager “where are you, I want to be with you.”</li><li>Effectively a lost mew + an assembly mew.</li><li>Use it <b>mid-sequence</b> to add feeling — not as an opener.</li></ul>" }
    ],
    pairs:["lostMew","assemblyMew","frustratedWhine","demandingMew"] },

  { id:"frustratedWhine", name:"Frustrated whine", role:"emotion", voice:"cow",
    clip:"assets/media/frustrated-whine.mp3",
    short:"Layered on a lost/assembly mew to say “come on, hurry up.” Ends soft — the air just runs out.",
    meaning:"The sound of an elk getting impatient. A drawn-out whine (¾ second up to 2–3) layered onto a lost mew or an assembly mew when the response or action isn’t coming fast enough — “come on, hurry up.” The tell is a soft ending: the sound simply runs out, no harsh finish.",
    lesson:[
      { h:"What it means", body:"Frustration — the first of the two whines that relay an animal’s disposition. It’s almost always paired with a <b>lost mew</b> or an <b>assembly mew</b> (the two calls that ask for something specific), when the response or action just isn’t coming. A calf belting lost mews with no answer adds it: “Where are you? Where are you? …please, somebody, where are you?” An adult cow trying to move her group adds it to assembly mews: “Hey guys, come on, come here.”" },
      { h:"Making the sound", body:"<b>¾ second up to 2–3 seconds.</b> Start high; it can be a single monotone note or a wavy up-and-down that ends slightly lower than it began. The <b>key is the ending</b>: just let the air run out — no change in pitch, no added emphasis, a clean cut-off. That soft finish is exactly what separates it from the aggravated whine. Open reed; no mechanical call can do it (you can’t get the length or variation)." },
      { h:"How Chris uses it", body:"Add it when lost mews aren’t drawing a response, or when a bull on assembly mews is dragging his feet — a bit of emotion in the sequence to say “I’m getting frustrated.” Build it: start with a single high, monotone whine, then make them <b>longer and wavier</b> to raise the frustration as you go. Starting out maxed-out leaves you nowhere to escalate; starting small gives you room to play." },
      { h:"Takeaways", body:"<ul><li>~¾ second to 2–3 seconds.</li><li>Starts high; single note or wavy; ends slightly lower.</li><li>Relays <b>frustration</b>, tied to a lost or assembly mew.</li><li>End it soft — <b>let the air run out</b>, no change in emphasis or pitch.</li></ul>" }
    ],
    pairs:["lostMew","assemblyMew","demandingMew"] },

  { id:"aggravatedWhine", name:"Aggravated whine", role:"emotion", voice:"cow",
    clip:"assets/media/aggravated-whine.mp3", video:"assets/media/aggravated-whine.mp4",
    short:"A cow fed up with a pushy young bull — “leave me alone.” Draws a mature bull in to play protector. Harsh, raspy ending.",
    meaning:"A standalone whine that paints one vivid picture: a cow fed up with a pushy young bull hooking and shoving her — “knock it off, leave me alone.” A mature bull that hears a lady being harassed will often come step in and play protector (and pick up a cow for it). The tell is a loud, raspy, aggressive ending.",
    lesson:[
      { h:"What it means", body:"A vocal expression of <b>aggravation</b> — and, unlike the frustrated whine, it stands <b>alone</b>. The picture it paints: an immature, hard-antlered bull harassing a cow — hooking her in the flank and rump, tossing and pushing her — and she can’t get away, so she keeps dodging and vocalizing “<b>knock it off, leave me alone.</b>” (Young 2–3-year-old bulls hanging with cow groups get pushy far too early as their testosterone climbs.)" },
      { h:"Why it pulls a bull", body:"Cows dislike being pushed around; young bulls push, mature bulls generally don’t; cows like mature bulls, and <b>mature bulls know it</b>. So a dominant bull that hears a harassed cow will often come find her, make eye contact, and step in — she flies to him for protection, and he’s just gained a cow. A great way to build or add to a harem, which is exactly why the sound works." },
      { h:"Making the sound", body:"<b>1–2 seconds</b>: start high, wavy, descending — but the <b>key is a loud, raspy, aggressive ending</b>, a punched “wah.” On an open reed, vary the <b>reed pressure</b> (don’t just slide the call): clean high start with pressure, then at the end add air, back off lip pressure, open the jaw, drop the pitch and crank up the rasp. It’ll quack like a duck at first — keep practicing. No mechanical call can do it." },
      { h:"How Chris uses it", body:"Early season, while bulls seek or defend cows. It’s loud and un-discreet, so he saves it for after quieter calls fail (it can also just fire a bull up to reveal himself). It’s deadly on <b>herd bulls defending against satellites</b>: wait for the herd bull to chase a satellite off, slip in close, and hit the aggravated whine so it sounds like another satellite harassing one of his cows — bumping a cow or two as you move is fine, even helpful (sounds like she’s fleeing). Works best where there’s a mix of young and mature bulls. In open country he may hang at the edge and scream to advertise protection rather than commit." },
      { h:"Takeaways", body:"<ul><li>1–2 seconds; high → wavy → lower, with a <b>loud, raspy, aggressive ending</b>.</li><li><b>Standalone</b> — not tagged to another call.</li><li>Paints a <b>harassed-cow</b> picture to pull in a mature, dominant bull.</li><li>Best where age classes are mixed; save it for when quieter calls fail.</li></ul>" }
    ],
    pairs:["assemblyMew","selfishMew"] },

  { id:"selfishMew", name:"Selfish mew", role:"emotion", voice:"cow",
    clip:"assets/media/selfish-mew.mp3",
    short:"The demanding mew on steroids — loud, raspy, “pay attention to ME.” Cuts through a noisy crowd; followed by a lost/assembly mew.",
    meaning:"A loud, raspy, gravelly cow call — the demanding mew “on steroids” (louder still is the “selfish scream”). It’s how a cow makes herself stand out and demand attention when normal calling is just another voice in the crowd: “pay attention to ME, listen to me.” Once she has it, she follows with a lost mew or assembly mew. (Often called the “estrus” call, but Chris hears it outside the breeding season too.)",
    lesson:[
      { h:"What it means", body:"“Pay attention to me — listen to me.” Chris considers it an <b>extension of the demanding mew</b> — a demanding mew on steroids. About <b>½–¾ second</b>, high→low and smooth, but so heavily emphasized it turns <b>rough and gravelly</b>; crank the volume and rasp and it becomes the “<b>selfish scream</b>.” It comes <b>after</b> a series of lost mews (seeking a response) or assembly mews (trying to get others to follow), and once she has the attention she wants, she follows with one of those. Chris avoids the “estrus” label — he’s heard it on summer and winter range — though a cow near her peak in the chaos of the rut might well belt it." },
      { h:"When you hear it", body:"Mostly when <b>large or multiple groups co-mingle</b> and it’s bedlam — bulls screaming and herding, cows milling and running — and an ordinary mew is just lost in the fray. A cow who really wants to be heard drops the loud, raspy, guttural selfish mew, and elk start paying attention." },
      { h:"Not an “estrus” call", body:"This is the sound most people mean when they say “estrus call” — and Chris is emphatic that <b>it isn’t one</b>. Most often it’s aimed at <b>other cows and calves</b>: a cow searching hard for her calf, or a dominant cow telling another group “I’m in charge, we’re going this way.” Which means it’s fully in play with a <b>cow tag</b>, and any time of year — he’s called cows in with it and had the bull simply follow them. (Steve Chapel, who demos it beautifully on a diaphragm, uses it only rarely — if it truly meant “come breed me,” why would anyone ever call anything else?)" },
      { h:"Making the sound", body:"If you can make a mew (or a demanding mew) and <b>growl in your throat at the same time</b>, you’ve basically got it. Open reed or mouth diaphragm; louder and raspier gives you the scream (on a diaphragm you can buzz your lips for it). No mechanical call can do it." },
      { h:"How Chris uses it", body:"When your calling just blends in. On a <b>herd bull ignoring you</b> (busy with cows/satellites): get in close, wind in your face, good setup, hit a couple selfish mews; if you can see him or the tops of his antlers, hammer them until he <b>turns to look</b>, then follow immediately with a few forceful <b>assembly mews</b>. Every time he hesitates or looks away, another selfish mew. Work the perimeter of his cows. Caveat: if he never actually <b>sees</b> the cow, he may just scream and wander back — and satellites will come looking. (He once pulled a valley-crossing lone bull off a big herd with nothing but loud selfish mews — an 80-yard first bull for a buddy.)" },
      { h:"Takeaways", body:"<ul><li>~½–¾ second; smooth high→low but with a <b>loud, gravelly, raspy</b> emphasis throughout.</li><li>Used to <b>stand out</b> and grab attention: “listen to me.”</li><li>An <b>extension of the demanding mew</b>; louder = the “selfish scream.”</li><li>Usually <b>followed</b> by a lost mew or an assembly mew.</li></ul>" }
    ],
    pairs:["demandingMew","assemblyMew","lostMew"] },

  { id:"hyperHot", name:"Hyper-hot / “estrus” calls", role:"combo", voice:"cow",
    clip:"assets/media/hyper-hot.mp3",
    short:"A sentence, not a call — and per Roe, a cow-elk estrus call doesn’t exist. Everyday calls strung together: “where are you / I want you here / now.”",
    meaning:"Chris Roe’s position is blunt: <b>a cow-elk estrus call doesn’t exist.</b> The “hyper-hot” isn’t a unique vocalization — it’s a <b>sentence</b> built from everyday calls run back-to-back (assembly → demanding mew → frustrated whine → assembly → demanding mew → aggravated whine → assembly), saying “where are you, I want you here, now.” Useful, but nothing to do with estrus — and that matters, because it means you can use these sounds any time of year, on bulls or cows.",
    lesson:[
      { h:"The claim — and why it fails", body:"The accepted idea: a cow coming into heat with no bull around makes a special call, and bulls lose their minds. Chris tests beliefs by trying to <b>disprove</b> them (correlation isn’t causation — hearing a sound and then seeing fired-up bulls doesn’t link them). It fails immediately:<ul><li>Bulls find estrus cows by <b>scent</b> — she doesn’t need to say a word. A cycling cow leaves that scent everywhere she walks and urinates; if we worry about our own scent drifting valleys, hers is not going unnoticed.</li><li>On video, cows in estrus <b>go to the bull</b> — rubbing on him, flirting, cutting him off — rather than calling. <b>Cows choose the bull</b>, and any bull will do the job, so finding one is not her problem.</li><li>And if she’d already exhausted her options, we know what an elk uses to get a response: the <b>lost mew</b>.</li></ul>" },
      { h:"Three different sounds, one name", body:"The tell: ask three people to make an “estrus call” and you get <b>three unrelated sounds</b> — (1) a loud, gravelly, buzzed lost mew (that’s the <b>selfish mew</b>), (2) a long, drawn-out wavy note (that’s a <b>frustrated</b> or <b>aggravated whine</b>), and (3) the Woods Wise “hyper-hot” string of distinct notes. If a cow truly made one specific sound only while in estrus, we would all mean the <b>same</b> sound. And no one can show it repeatedly — a one-off clip isn’t biology; a real breeding call would be consistent, every time." },
      { h:"So what is the hyper-hot?", body:"Listen to the distinct notes in it and you can hear <b>separate everyday calls</b> strung together: assembly mews, demanding mews, aggravated whines, maybe selfish mews and long mews. Put those back-to-back and you get exactly the “hyper-hot” — but what it’s saying is simply “<b>where are you? I need you here. Come to me — now</b>,” with plenty of emotion on top. It works; it just isn’t about breeding." },
      { h:"Why the label matters", body:"Two real costs to calling it an “estrus” call.<br><br><b>1) It makes you lean on testosterone</b> — a wild card. One day a sound runs a bull over; the next day, in the same spot, nothing. Chris deliberately builds on the vocabulary elk use in <b>January, March, August, November</b> — when testosterone isn’t a factor. Master the base dialogue and it works during the rut too, without betting on his mood.<br><br><b>2) It boxes the sounds in.</b> If it “means estrus,” you’d assume it only works on a rutting bull — so a cow hunter, or anyone hunting early or late, would never use it. Wrong: the selfish mew is often aimed at <b>other cows and calves</b> (Chris has called cows in with it — the bull just followed), and the whines are used <b>year-round</b>, in June, July, November, even February on winter range. Those aren’t estrus calls; they’re an animal expressing an attitude." },
      { h:"Takeaways", body:"<ul><li>Per Roe, <b>there is no cow-elk estrus call</b> — behaviorally there’s no need for one.</li><li>The “hyper-hot” is a <b>sentence</b> of everyday calls, not a unique vocalization.</li><li>The three sounds people call “estrus” are really the selfish mew, the whines, and this string.</li><li>Bulls locate estrus cows by <b>scent</b>; cows in heat go to the bull and flirt.</li><li>Drop the label and you free the sounds up — any season, on bulls <b>or</b> cows.</li></ul>" }
    ],
    pairs:["assemblyMew","demandingMew","frustratedWhine","aggravatedWhine","selfishMew"] },

  /* ---------------------- BULL --------------------- */
  /* Chris Roe's bull system: Contact & Dominant bugles graded by intensity
     (Level 1–3), plus the chuckle. Definitions pending his bull lesson. */
  { id:"contactBugle", name:"Contact bugle", role:"locate", voice:"bull",
    clips:[
      { label:"Level 1", src:"assets/media/bull-contact-1.mp3" },
      { label:"Level 2", src:"assets/media/bull-contact-2.mp3" },
      { label:"Level 3", src:"assets/media/bull-contact-3.mp3" }
    ],
    short:"The bull’s question: “Who’s out there?” Levels 1–3 are the same question asked harder. Up close it means “show yourself.”",
    meaning:"A bull asking a question — “who’s out there, give me a response.” It’s the bull-side twin of the lost mew: it asks for a <b>response</b>, usually vocal, but sometimes physical, with a bull coming in to make visual contact. The three <b>Levels</b> aren’t different calls — they’re the same question asked with more insistence, and Level 3 is a Level 2 with chuckles added.",
    lesson:[
      { h:"What the Levels mean", body:"Same question, rising insistence — exactly how people talk. Chris’s picture: you want to know what’s in his hand. First you ask politely (<b>Level 1</b>). Ignored, you ask again more firmly (<b>Level 2</b>). Ignored again, you grab his shoulder and spin him around (<b>Level 3</b>). Bulls do the same thing: a low-key opener, then more intensity if they believe someone should be there and aren’t getting an answer. Level 1 is high-pitched falling to a lower note — put a little <i>voice</i> on the end for realism, not a growl. To go from Level 2 to Level 3, you <b>add chuckles</b>." },
      { h:"Locating a bull", body:"Open with a <b>Level 1</b> and then <b>wait</b> — a bull may take 10, 15, 30 seconds, even a couple of minutes, depending on how interested or cautious he is. That pause is information: 30 seconds means he picked his head up, listened, and thought hard about whether to answer. Two rules follow:<ul><li><b>Wait at least as long as he did</b> before you call again.</li><li><b>Read the level he answers at.</b></li></ul>No answer at Level 1? Go to Level 2, then Level 3. Once you find the level he requires, stay around it as you work in. And if his answer pins him — you know the bench he’s standing on — <b>stop bugling and go</b>. Don’t keep chatting just to keep tabs." },
      { h:"Stay just under him", body:"If he answers at Level 1, come back at Level 1 — the line is open, so keep it low-key. If he answers at Level 2 or 3, he’s wound up, so answer <b>just below</b> him (a Level 1) to keep him talking without pushing him or putting him on edge. And once he’s finally answered after an escalation, drop back down — same as a conversation: once someone acknowledges you, you don’t keep shouting." },
      { h:"Using it to call him in", body:"Up close the meaning shifts. At distance a contact bugle asks for a vocal answer; inside ~80–100 yards it reads as “<b>show yourself — step out where I can see you</b>.” But don’t walk straight at him. Angle off and <b>swing downwind</b>. Practically it keeps the wind in your face; behaviorally it’s the giveaway that sells it — a confident bull beelines, while an unsure bull circles downwind to size up the situation first. A direct approach can push a timid bull away; a cautious one tells him <b>he’s</b> in the driver’s seat, which is exactly what makes him step out to assert himself — and into your shooting lane." },
      { h:"Takeaways", body:"<ul><li>Asks for a <b>response</b> — usually vocal, sometimes him showing up.</li><li>Levels 1–3 = the same question, asked harder. Level 3 = Level 2 + chuckles.</li><li>Start low, wait longer than he did, and answer <b>just under</b> his level.</li><li>Pinned his location? Stop calling and move in.</li><li>Close range = “show yourself.” Swing <b>downwind</b>, never straight in.</li></ul>" }
    ],
    pairs:["chuckle","dominantBugle","lostMew","assemblyMew"] },

  { id:"dominantBugle", name:"Dominant bugle", role:"challenge", voice:"bull",
    clips:[
      { label:"Level 1", src:"assets/media/bull-dominant-1.mp3" },
      { label:"Level 2", src:"assets/media/bull-dominant-2.mp3" },
      { label:"Level 3", src:"assets/media/bull-dominant-3.mp3" }
    ],
    short:"A warning to other bulls — attractive to cows, discouraging to bulls. Powerful, but the wrong tool for most pressured bulls. Open at Level 2 and get close.",
    meaning:"The bull’s <b>statement</b>, where a contact bugle asks a question: a warning aimed at other bulls (and attractive to cows). It’s the loudest tool in the box and the easiest one to misuse — plenty of bulls are lovers, not fighters, and will quietly leave rather than answer it. Used on the right bull, close and from the right angle, it can pull a herd bull into your lap.",
    lesson:[
      { h:"Read this before you use it", body:"It’s a <b>warning to other bulls</b> — so it drives plenty of them off. Be careful on pressured, over-the-counter public land:<ul><li><b>Some bulls are lovers, not fighters.</b> By mid-September a bull who’s been run around and beaten down — especially one who finally has a cow or two — has no interest in another fight. He’ll bugle from a distance, then drift off or vanish as you close.</li><li><b>Herd composition has changed.</b> More 4½–5½-year-olds (sometimes 3½s) hold their own small groups, and there are fewer single big herd bulls with satellites. When most bulls are of similar stature they’ve settled their business early and pick <b>flight</b> — and an aggressive bull becomes an anomaly that stands out like a sore thumb.</li><li><b>Even a real herd bull gets tired.</b> Sick of running off youngsters and never getting to feed or rest, he’ll bugle at range and then slip away with his cows as you close.</li><li><b>The cows move him.</b> Cows want to be left alone with a mature bull who leaves them alone. A threat to that status quo — or a young bull harassing them while the herd bull is busy — can make the cows leave and <b>drag the herd bull along</b>.</li><li><b>The cows are the veterans.</b> Harvest keeps bulls young (2½–4½), but cows run 10, 12, 15 years and up. On a mid-90s study Chris worked, collared cows were still on the same summer range more than a decade later — they’ve survived archery, muzzleloader and every rifle season since. The bull may be naive; <b>they are not</b>. They hear a strange bull in September — especially after being bumped once — and they simply leave.</li></ul>" },
      { h:"Rifle &amp; muzzleloader — make him step out", body:"Best mid-September to about mid-October, and you need a bull who still cares about defending cows. <b>Locate with contact bugles</b>, not dominant ones; save these for once you’ve found a herd bull and want to move him.<br><br><b>Get close</b> — 100–200 yards minimum. Shooting far is not a reason to stay far. Then work toward the <b>front of the group, or the side opposite the bull</b>, swinging <b>downwind of the cows</b> (scent control, plus it’s exactly what a real bull does — he scent-checks before closing, and he won’t swing downwind of <i>you</i> because it would put him farther from his cows than you are).<br><br>The goal is to make him move <b>perpendicular</b> to you as he positions to defend or intercept — that’s what puts him in an opening. If he just walks away with cows out front, it does nothing for you. It works best when the group is near bedding, backed against another bull’s group, or against terrain that makes retreat hard.<br><br>Open with a <b>Level 2</b> — that’s what a bull actually uses to attract cows and intimidate rivals. If he reacts, stay at Level 2; only step to Level 3 if he ignores you, and keep it in reserve so you always have somewhere to go. Have the rifle ready: sometimes all you get is a glimpse of him swinging through timber.<br><br><b>With a partner:</b> in hilly, broken timber, put the shooter on a vantage point or off to the side and send the caller in to flush him out. In flatter or thicker country, spread out and move together — shooter 50–80 yards ahead of the caller, both pushing toward the group. Mind safety, and make sure the bull doesn’t end up between you." },
      { h:"Bow — make him react", body:"Same idea, but now you want him <b>in your lap</b>, and you want a <b>reaction</b>, not a reply. Reaction means he moves before he thinks — which means <b>close</b>: get inside 100 yards, ideally <b>70–80</b>, before your first bugle. Call from 100–200 (fine for a rifle) and he’ll have repositioned before you can close, leaving you behind the group playing catch-up.<br><br>Position off to the side or opposite the bull so he must move perpendicular. Keep the wind in your face, and if you can, set it so it blows <b>from the bull to you</b> — that stops him swinging in fast and cutting your wind. Position relative to the cows matters most; perfect the wind second.<br><br>Then hit him with a <b>big, full Level 2</b> — loud, raspy, as full as you can make it. He should sound like a bull in his back pocket. He’ll likely scream back; ignore that and <b>listen to where he’s moving</b>. Coming your way → stay put and get ready. Standing there bugling and raking → another Level 2, and move up toward his cows as you give it." },
      { h:"The three ways it goes", body:"<b>1) He comes in</b> — charging to run you off, or swinging between you and his cows. That’s the one you want, and it means he’s confident. Miss the first chance and the odds are good on a second: reposition and pester him. Chris killed his 2006 Wyoming bull after <b>more than an hour</b> of bugle-reposition-bugle; the bull finally broke and came in charging, taken at six yards. He was younger than he sounded — proof you don’t need a giant, just a bull who thinks he can hold his own and badly wants his cows.<br><br><b>2) He grabs what cows he can and runs.</b> He isn’t convinced he’s the dominant bull. Back off the intensity, or leave him alone and come back later.<br><br><b>3) He steps into a clearing and waits.</b> Hard to read — a dominant bull making a stand looks the same as a timid one working out his escape. Either way he didn’t run, so reposition and try again." },
      { h:"When it goes sideways", body:"<b>Bumped a cow or two on the way in?</b> Don’t assume it’s blown — a cow moving away from an unfamiliar or pushy bull is exactly what your story predicts. Move in quick and <b>own it</b>: hit a Level 2 dominant bugle aimed right at the cows that are leaving, because that’s what a bull does the moment a cow breaks from him. Some hunters bump a cow or two deliberately for this. If the whole group blows out and the bull never saw why, let them settle and catch up later.<br><br><b>A satellite bull comes in first.</b> Take him if you want him. If not, <b>spook him away from the group</b> — clearly, so he doesn’t bark at you later. The one thing you can’t afford is a young bull running back through the herd with his chin in the air; after that everything you say gets second-guessed. Done right it even adds realism: a young bull just got run off by the big one.<br><br><b>Watch your back.</b> The commotion pulls in cruising lone bulls, and they usually circle <b>downwind</b>." },
      { h:"Takeaways — don’t carry only a hammer", body:"Success depends on herd dynamics, that bull’s attitude and history, hunting pressure, stage of the rut, how many cows he has, your proximity, terrain, and wind. So:<ul><li>It’s a <b>warning</b> — powerful, and it repels as many bulls as it pulls.</li><li><b>Locate with contact bugles</b>; save dominant bugles for a located herd bull.</li><li><b>Open at Level 2</b>, keep Level 3 in reserve.</li><li><b>Get close</b> — 100–200 yds rifle, inside 70–80 for a bow.</li><li>Work the side opposite the bull, swinging downwind, so he moves <b>perpendicular</b>.</li><li>It’s invasive and aggressive — a genuine risk of blowing the group out. Chris treats it as a <b>last resort</b> after passive and targeted tactics.</li></ul>Maslow: “<i>To the man who only has a hammer, everything begins to look like a nail.</i>” Bugle at every bull and you’re hunting for one that wants to play <b>your</b> game, instead of finding a bull and playing <b>his</b>." }
    ],
    pairs:["contactBugle","chuckle","assemblyMew"] },

  { id:"chuckle", name:"Chuckle", role:"emotion", voice:"bull",
    clips:[
      { label:"High-pitched (fast-paced)", src:"assets/media/bull-chuckle-highpitched.mp3" },
      { label:"Excited", src:"assets/media/bull-chuckle-excited.mp3" }
    ],
    short:"The bull’s volume knob — tack it on a bugle to raise the intensity. Match the type: high-pitched with contact, excited with dominant. Deadly on its own.",
    meaning:"The intensity dial for bull talk. Tacked on the end of a bugle it raises whatever that bugle was asking or stating — adding chuckles is literally what turns a Level 2 into a Level 3. <b>High-pitched, fast-paced</b> chuckles say curiosity and interest; <b>excited</b> chuckles say heightened intensity and eagerness. On their own they’re quietly lethal: they show interest while giving a bull almost nothing to judge you by.",
    lesson:[
      { h:"Tacking them on a bugle", body:"The common use, and a legitimate one — it’s how bulls use them. Chuckles <b>raise the intensity</b> of whatever the bugle said; going from a Level 2 to a Level 3 <i>is</i> adding chuckles. Match the type to the bugle so the meanings complement:<ul><li><b>Contact bugle → high-pitched, fast-paced chuckles.</b> Contact asks for a response; these express curiosity and interest.</li><li><b>Dominant bugle → excited chuckles.</b> Dominant makes a statement; these relay heightened intensity and eagerness.</li></ul>" },
      { h:"Dialing the intensity", body:"Three knobs, either way you use them: <b>how long</b> the string is, <b>how loud</b> it is, and <b>how much you emphasize</b> the high squeals and accentuate the low breathy notes. Short, quiet, unemphasized = low intensity. Long, loud, and accentuated = high. Pick the string that matches the picture you’re painting." },
      { h:"On their own — early season", body:"Working a bull with bull sounds and needing to call again — to pull his location once more, or just to answer — <b>send a string of high-pitched, fast-paced chuckles instead of a full contact bugle</b>. You say “I’m curious, interested, maybe eager to find you” without sounding excited or aggressive, so you don’t worry him into keeping his distance. The clever part: it gives him <b>very little to judge you by</b>. If he wants to know who this new bull is, his only options are to bugle again hoping you reveal more — or to come look." },
      { h:"On their own — late, on a herded-up bull", body:"Later in September, or any bull already holding cows, once you’ve worked in as close as you can: if he seems timid, worried about other bulls, or could grab his cows and run (or step into the open to watch an approach from safety), <b>don’t challenge him with a dominant bugle</b>. Send <b>excited chuckles</b> instead. You read as a bull who’s close to his cows and very interested in <b>them</b> — not as a bull challenging <b>him</b>. Because you aren’t threatening him and you’ve given him little to evaluate, he’ll often come in to intimidate the newcomer crowding his ladies." },
      { h:"Takeaways", body:"<ul><li>Tacked on a bugle, chuckles <b>raise the intensity</b> — Level 2 + chuckles = Level 3.</li><li><b>High-pitched/fast-paced</b> = curiosity &amp; interest (pair with contact bugles).</li><li><b>Excited</b> = intensity &amp; eagerness (pair with dominant bugles).</li><li>Intensity = length + loudness + how hard you hit the high and low notes.</li><li>Used <b>alone</b>, they show interest while revealing almost nothing — often the nudge that makes a bull come look.</li></ul>" }
    ],
    pairs:["contactBugle","dominantBugle"] },
];

const SCENARIOS = [
  {
    title:"An interested bull, and no protective cows", tag:"Invite him over",
    situation:"You’re working a bull with chirps and basic mews and he answers. He seems to be by himself — or at least not locked down with protective cows — and you’d like to invite him in.",
    steps:[
      { call:"lostMew", action:"Answer his bugle with a lost mew or two.", note:"You heard him — now open a direct, one-on-one line and find out exactly where he is." },
      { call:"assemblyMew", action:"If he sounds interested and might be coming, switch to assembly mews.", note:"Stop asking where he is. Just tell him where you are and to keep coming to you." },
      { call:"tip", action:"Keep the same call the whole way through.", note:"One caller = one cow. Mixing calls paints a picture of several animals and splits his focus." },
      { call:"silence", action:"When he’s close enough to have your location pinned, go quiet and get ready.", note:"With a correct setup, he’ll keep coming on his own." },
    ],
    principle:"Establish contact, then direct. A correct setup lets a couple of calls finish the job."
  },
  {
    title:"A bull that lollygags or drifts off to the side", tag:"Re-commit him",
    situation:"He answered and started in, but now he’s dragging his feet or angling off to the side instead of coming straight to you.",
    steps:[
      { call:"longMew", action:"Switch to the long mew (lost + assembly).", note:"Adds eagerness and a little confusion — “Where are you? I want to be with you. Why aren’t you coming?” It pulls him back and adds feeling." },
      { call:"assemblyMew", action:"As soon as he commits and starts closing, go back to assembly mews to finish him." },
      { call:"frustratedWhine", action:"If he still takes his time, throw in a few frustrated whines.", note:"Let him know you really want his company and you’re getting impatient." },
    ],
    principle:"Add emotion to the sequence when a bull needs a little extra convincing."
  },
  {
    title:"Pulling a bull from his bed", tag:"Located & set up close",
    situation:"You know where a bull is bedded, you’ve read that he’s looking for cows, and you’ve slipped in close (around 250 yards) with the wind in your favor.",
    cue:"A bull gets up out of his bed and gives a weak bugle.",
    steps:[
      { call:"lostMew", action:"On that weak bugle, send a clear series of lost mews.", note:"It gets them up on their feet and looking your way." },
      { call:"assemblyMew", action:"The moment he bugles again, hit him with one clear assembly mew." },
      { call:"assemblyMew", action:"Only add one or two more assembly mews if he stops on the way in (say, to rake a tree)." },
    ],
    principle:"Proper setup plus one or two strategic calls can walk a bull from 250 yards to a few steps."
  },
  {
    title:"A pressured bull tucked in a hidey-hole", tag:"Desperate-cow tactic",
    situation:"A pressured bull sits tight in a spot with no clean way in, and calling from a distance won’t budge him. You need him to come out to you.",
    setup:"Pick a route elk use but that no hunter ever would — steep, thick, noisy — and use the terrain and noise as part of the act. Set up about 30 minutes before dark, above his hole, where that trail drops into the timber.",
    steps:[
      { call:"aggravatedWhine", action:"Open with a couple of aggravated whines, then crash down the trail — breaking twigs, rolling rocks, kicking dirt.", note:"Sound like a cow fleeing a pesky young bull." },
      { call:"lostMew", action:"As you move, mix in a few lost mews.", note:"The cow is also looking for another elk to run to." },
      { call:"contactBugle", action:"Listen for his answer — a quiet contact bugle.", note:"That’s your cue that he’s engaged." },
      { call:"assemblyMew", action:"The instant he answers, switch from lost mews to assembly mews and hammer him — keep the noisy movement coming toward him." },
      { call:"silence", action:"When you see him coming, stop, give one more assembly mew to lock his direction, and get ready." },
    ],
    principle:"Realism and plausibility beat volume. Do something no other hunter in the area would do."
  },
  {
    title:"Bulls answer but won’t commit", tag:"Last resort",
    situation:"Bulls are there and will answer once or twice, but nothing brings them in. Everything else has failed.",
    steps:[
      { call:"hyperHot", action:"Run the hyper-hot combination fast and back-to-back: assembly → demanding mew → frustrated whine → assembly → demanding mew → aggravated whine → assembly — then repeat.", note:"Strung together, they say “where are you? I want you here — now.”" },
    ],
    principle:"Not a magic “estrus” call — there’s no such thing. It’s everyday words built into an urgent sentence, so it works any season, on bulls or cows."
  },
  {
    title:"He answers every call but never takes a step", tag:"Lost mew fix",
    situation:"You’re working him with lost mews and he bugles back at every single one — then drifts off bugling, or just goes quiet. The wind was fine and your calling was fine.",
    steps:[
      { call:"tip", action:"Realize he’s doing exactly what you asked.", note:"A lost mew asks for a response, not an action — and it implies “where are you, so that I can come to you.” He answered and is waiting on you." },
      { call:"assemblyMew", action:"Either switch to the assembly mew…", note:"That’s the call that asks for an action: come to me. Stop asking where he is." },
      { call:"lostMew", action:"…or make good on the implication and go to him.", note:"Keep calling as a lost calf, drifting toward his downwind side rather than straight at him, and call more often as you close." },
      { call:"frustratedWhine", action:"If he stops answering altogether, add a frustrated whine to the lost mews.", note:"“Please — give me a response.”" },
    ],
    principle:"A lost mew says “where are you, so I can come to you.” Either go, or switch to the call that asks him to come to you."
  },
  {
    title:"Pressured elk holed up in the nasty stuff", tag:"Calf in distress · last resort",
    situation:"Last day or two. Elk are pressured and won’t move in legal light, and they’re bedded in the darkest, ugliest cover in the drainage.",
    setup:"Best for rifle or muzzleloader — elk can appear fast and close. It’s invasive and can scatter them, so save it until you’ve exhausted everything else. Take the biggest, nastiest chunk of bedding or escape cover you can find.",
    steps:[
      { call:"lostMew", action:"Walk fast into the timber hammering lost calf mews, back to back.", note:"Roughly one call every time your left foot hits the ground." },
      { call:"tip", action:"Cut cross-country instead of following game trails — snap twigs, stumble on rocks.", note:"The racket only makes it more believable: a calf busting through the timber, scared out of its wits." },
      { call:"silence", action:"Stay sharp — they’ll either stand up and stare, or come crashing down at you.", note:"Cows come to run off whatever’s chasing that calf. Expect the bull to stand late or hang at the back of the group." },
    ],
    principle:"Cows will come to a calf in trouble. Five minutes might do it — or an hour; keep at it."
  },
  {
    title:"Locating a bull with bugles", tag:"Find him first",
    situation:"You’re on a ridge and you believe there’s a bull down in there, but you don’t know where — or what kind of mood he’s in.",
    steps:[
      { call:"contactBugle", action:"Send one Level 1 contact bugle — low-key.", note:"You’re asking a polite question: “who’s out there?” Don’t open loud." },
      { call:"tip", action:"Wait. Really wait — up to a couple of minutes.", note:"A bull may take 10, 15, 30 seconds or more to decide whether to answer. Time how long he takes; that’s your clock from here on." },
      { call:"contactBugle", action:"No answer? Step up to Level 2, then Level 3.", note:"Same question, asked harder. Level 3 is a Level 2 with chuckles on the end." },
      { call:"contactBugle", action:"When he answers, read his level and come back just under it.", note:"He answers Level 1 → answer Level 1. He answers hot at 2 or 3 → still answer at 1, staying below him so you keep him talking without pushing him. And wait at least as long as he waited." },
      { call:"silence", action:"The moment his answer pins him, stop calling and go.", note:"Don’t keep bugling just to keep tabs — close the distance and decide up close whether to work him with cow or bull sounds." },
    ],
    principle:"Start quiet, wait longer than he does, and stay one notch below his intensity. Once you know where he is, stop talking and move."
  },
  {
    title:"Calling a bull in with bull talk", tag:"Swing downwind",
    situation:"You’ve located him and worked in close (roughly 80–100 yards), and you want to finish him with bull sounds rather than cow calls.",
    setup:"Inside this range a contact bugle stops meaning “answer me” and starts meaning “show yourself.” The approach you take is what sells it.",
    steps:[
      { call:"tip", action:"Don’t walk straight at him — angle off and swing downwind.", note:"Wind in your face, yes. But mainly: a confident bull beelines, an unsure bull circles downwind to size things up first." },
      { call:"contactBugle", action:"Bugle as you swing around him.", note:"Up close this reads as “step out where I can see you.” Coming from a cautious, circling bull, it tells him he holds the advantage." },
      { call:"chuckle", action:"If he’s timid or holding cows, try a string of chuckles instead of a full bugle.", note:"High-pitched for curiosity; excited if you want to sound like a bull crowding his cows. Either way you give him almost nothing to judge you by — so he has to come look." },
      { call:"silence", action:"When he commits to stepping out, stop and get ready.", note:"He’s coming to assert himself over a bull he thinks is nervous." },
    ],
    principle:"Sound like the less confident bull. Put him in the driver’s seat and he’ll step out to prove it."
  },
  {
    title:"Challenging a herd bull — bow", tag:"Aggressive · last resort",
    situation:"A herd bull has cows and won’t leave them. You want him to react — to charge in and run you off, or swing between you and his cows — at bow range.",
    setup:"Only worth it on a bull who still wants to defend his cows; plenty will simply leave instead. Locate him with contact bugles first, then work in. Get inside 100 yards — ideally 70–80 — BEFORE your first bugle. Call from farther and he repositions before you can close, leaving you behind the group.",
    steps:[
      { call:"tip", action:"Set up off to the side of the bull, or opposite him, near the front of the cows.", note:"You want him moving perpendicular to you to intercept — not just walking away with his cows out front. Swing downwind of the cows on the way in; if you can, put the wind blowing from the bull to you." },
      { call:"dominantBugle", action:"Open with one big, full Level 2 — loud, raspy, as full as you can make it.", note:"He should sound like a bull in the herd bull’s back pocket. Keep Level 3 in reserve so you always have somewhere to escalate." },
      { call:"tip", action:"He’ll scream back. Ignore that — listen to where he’s moving.", note:"Coming your way → stay put and get ready. Standing there bugling and raking → give another Level 2, and move up toward his cows as you do." },
      { call:"dominantBugle", action:"If he hangs up, keep repositioning and pestering.", note:"Chris’s 2006 Wyoming bull took more than an hour of bugle-move-bugle before he finally broke and came in charging — taken at six yards." },
      { call:"silence", action:"When he commits, stop calling and get ready.", note:"If instead he grabs what cows he can and runs, he isn’t the right bull — back off and leave him for later." },
    ],
    principle:"You need a reaction, not an answer — and reaction needs closeness. But don’t make this your default: bugle at every bull and you’re hunting one that plays your game instead of playing his."
  },
  {
    title:"Making a herd bull step out — rifle or muzzleloader", tag:"Push him perpendicular",
    situation:"You can shoot a long way, but he’s in the timber with his cows. You just need him in the open for a moment.",
    setup:"Best mid-September to mid-October, while he still cares about defending cows. Locate with contact bugles. Then close to 100–200 yards — shooting far is not a reason to stay far.",
    steps:[
      { call:"tip", action:"Read the group, then move to the front of the cows or the side opposite the bull, swinging downwind.", note:"A real bull scent-checks a group before closing. And he won’t swing downwind of you — that would leave his cows more exposed than you are." },
      { call:"dominantBugle", action:"Start with a Level 2 and watch how he moves.", note:"Reacting the way you want? Stay at Level 2. Ignoring you? Step to Level 3 — but give Level 2 a real chance first." },
      { call:"tip", action:"Keep pressure on so he tracks back and forth in front of you.", note:"You want him perpendicular, positioning to defend or intercept. Best when the group is near bedding, backed against another bull, or against terrain that makes leaving hard." },
      { call:"silence", action:"Be ready every second — sometimes it’s one glimpse through the timber.", note:"Hunting with a partner? In broken country put the shooter on a vantage point and send the caller in. In flatter or thicker cover, shooter 50–80 yards ahead of the caller, both moving in. Mind safety and don’t let the bull get between you." },
    ],
    principle:"You’re not asking him to come to you — you’re steering him into an opening."
  },
];

/* Kept for reference but NOT displayed anywhere — the on-page philosophy list
   was removed per request. Each scenario still carries its own "takeaway". */
const PRINCIPLES = [
  { t:"Learn the words", d:"Once you know what each call means, you can combine them to say almost anything a cow can say." },
  { t:"One caller, one cow", d:"Keep the same call and voice through a sequence so the bull focuses on a single animal. Multiple calls paint multiple animals." },
  { t:"Locate, then direct", d:"Start with a lost mew to open contact, then switch to assembly mews to bring him in." },
  { t:"Call strategically, not constantly", d:"A couple of well-placed calls beat a lot of noise. When he’s committed, go quiet and get ready." },
  { t:"Add emotion when needed", d:"Long mews and frustrated or aggravated whines add feeling for a bull who won’t commit." },
  { t:"Two voices, one story", d:"Mix cow and bull sounds to build a believable scene — a rival bull that already has cows, or a hot cow trailing a satellite bull." },
  { t:"Make it realistic", d:"Pair calls with terrain, movement, sound, timing, and wind so the whole scene is believable." },
  { t:"Read his replies", d:"A weak or quiet contact bugle is your cue to stop locating and start assembling." },
  { t:"Setup is everything", d:"The right wind and position let your calls do their job." },
];

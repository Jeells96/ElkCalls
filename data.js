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
  cue:       { label:"His reply", var:"--cue",       blurb:"A sound to read, not make" },
  combo:     { label:"Combo",     var:"--combo",     blurb:"A string of calls" },
};

const FLAG_TITLES = {
  "videos 1–9": "Defined more fully in the earlier videos of the cow-vocalization series; the meaning here is inferred from context.",
  "general elk": "Widely-taught elk behavior, carried over with the same “calls are words” approach — not defined in the cow-vocalization series. Can be pinned to a specific source if you have one.",
  "pending": "The clip is here; Chris Roe’s definition is being added from his bull lesson.",
};

const CALLS = [
  /* ---------------------- COW ---------------------- */
  { id:"chirp", name:"Chirp", role:"locate", voice:"cow",
    clip:"assets/media/chirp.mp4",
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

  { id:"mew", name:"Basic mew", role:"locate", voice:"cow",
    clip:"assets/media/mew.mp3",
    short:"Everyday “staying in touch” contact within the group; implies movement. Asks for a response, not an action.",
    meaning:"The everyday contact call cows use to *stay* in touch — a step up from the chirp. It says “Are you still there?” / “I’m right here,” between animals in the same group (not to outside elk), and it asks for or gives a response, not an action. The key: elk mew when they can’t keep visual track of each other — so a mew implies the group is up and moving, doing something.",
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
    short:"“Where are you?” Locate him & open a direct line.",
    meaning:"“Where are you?” A locating call. You heard him and want to pin down exactly where he is. It opens a direct, one-on-one line of communication — use it to make contact before you ask for anything.",
    pairs:["assemblyMew","longMew","aggravatedWhine"] },

  { id:"assemblyMew", name:"Assembly mew", role:"direct", voice:"cow",
    clip:"assets/media/assembly-mew.mp4",
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
    clip:"assets/media/demanding-mew.mp4",
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
    clip:"assets/media/aggravated-whine.mp4",
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
      { h:"Making the sound", body:"If you can make a mew (or a demanding mew) and <b>growl in your throat at the same time</b>, you’ve basically got it. Open reed or mouth diaphragm; louder and raspier gives you the scream (on a diaphragm you can buzz your lips for it). No mechanical call can do it." },
      { h:"How Chris uses it", body:"When your calling just blends in. On a <b>herd bull ignoring you</b> (busy with cows/satellites): get in close, wind in your face, good setup, hit a couple selfish mews; if you can see him or the tops of his antlers, hammer them until he <b>turns to look</b>, then follow immediately with a few forceful <b>assembly mews</b>. Every time he hesitates or looks away, another selfish mew. Work the perimeter of his cows. Caveat: if he never actually <b>sees</b> the cow, he may just scream and wander back — and satellites will come looking. (He once pulled a valley-crossing lone bull off a big herd with nothing but loud selfish mews — an 80-yard first bull for a buddy.)" },
      { h:"Takeaways", body:"<ul><li>~½–¾ second; smooth high→low but with a <b>loud, gravelly, raspy</b> emphasis throughout.</li><li>Used to <b>stand out</b> and grab attention: “listen to me.”</li><li>An <b>extension of the demanding mew</b>; louder = the “selfish scream.”</li><li>Usually <b>followed</b> by a lost mew or an assembly mew.</li></ul>" }
    ],
    pairs:["demandingMew","assemblyMew","lostMew"] },

  { id:"hyperHot", name:"Hyper-hot / hyper-estrous", role:"combo", voice:"cow",
    clip:"assets/media/hyper-hot.mp3",
    short:"Fast combo of everyday calls = “need a bull NOW.” Last resort.",
    meaning:"Not a special, unique call — a fast, repeated string of everyday calls (assembly → demanding mew → frustrated whine → assembly → demanding mew → aggravated whine → assembly) that together say “I need a bull in my location right now.” A last resort when bulls answer but won’t commit.",
    pairs:["assemblyMew","demandingMew","frustratedWhine","aggravatedWhine"] },

  /* ---------------------- BULL --------------------- */
  /* Chris Roe's bull system: Contact & Dominant bugles graded by intensity
     (Level 1–3), plus the chuckle. Definitions pending his bull lesson. */
  { id:"contactBugle", name:"Contact bugle", role:"locate", voice:"bull", flag:"pending",
    clips:[
      { label:"Level 1", src:"assets/media/bull-contact-1.mp3" },
      { label:"Level 2", src:"assets/media/bull-contact-2.mp3" },
      { label:"Level 3", src:"assets/media/bull-contact-3.mp3" }
    ],
    short:"A bull’s contact bugle, graded by intensity (Level 1 → 3). Definition coming.",
    meaning:"A bull’s contact bugle, graded by intensity from Level 1 (lowest-key) up to Level 3. Chris Roe’s exact definition is being added from his bull lesson — for now, use the Level buttons above to hear how the three intensities differ.",
    pairs:["dominantBugle","chuckle"] },

  { id:"dominantBugle", name:"Dominant bugle", role:"challenge", voice:"bull", flag:"pending",
    clips:[
      { label:"Level 1", src:"assets/media/bull-dominant-1.mp3" },
      { label:"Level 2", src:"assets/media/bull-dominant-2.mp3" },
      { label:"Level 3", src:"assets/media/bull-dominant-3.mp3" }
    ],
    short:"A bull’s dominance bugle, graded by intensity (Level 1 → 3). Definition coming.",
    meaning:"A bull’s dominance bugle, graded by intensity from Level 1 up to Level 3. Chris Roe’s exact definition is being added from his bull lesson — use the Level buttons above to hear the escalation.",
    pairs:["contactBugle","chuckle"] },

  { id:"chuckle", name:"Chuckle", role:"challenge", voice:"bull", flag:"pending",
    clips:[
      { label:"High-pitched", src:"assets/media/bull-chuckle-highpitched.mp3" },
      { label:"Excited", src:"assets/media/bull-chuckle-excited.mp3" }
    ],
    short:"The guttural stutter a bull tags onto a bugle. Definition coming.",
    meaning:"The guttural stutter a bull tacks onto a bugle. Chris Roe’s exact definition is being added from his bull lesson — two versions are here (high-pitched fast-paced, and excited); play them with the buttons above.",
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
      { call:"hyperHot", action:"Run the hyper-hot combination fast and back-to-back: assembly → demanding mew → frustrated whine → assembly → demanding mew → aggravated whine → assembly — then repeat.", note:"Strung together, they say “I need a bull in my location right now.”" },
    ],
    principle:"It isn’t a magic call — it’s the everyday words strung together with urgency. Save it for when nothing else works."
  },
  {
    title:"Locating a bull at first light", tag:"Find him first",
    situation:"Dark timber, cold morning, and you don’t yet know where the bull is or what kind of mood he’s in.",
    steps:[
      { call:"contactBugle", action:"Throw a contact bugle to prompt an answer.", note:"You’re announcing yourself and asking who’s out there — not picking a fight yet." },
      { call:"contactBugle", action:"Read his reply.", note:"His answering bugle tells you where he is and how fired up he is." },
      { call:"tip", action:"Now pick your voice.", note:"Lone or satellite bull → switch to cow calls (lost mew → assembly mew) to bring him in. Fired-up herd bull → switch to a challenge." },
    ],
    principle:"Locate first, then choose the cow or bull voice that fits the bull you’ve actually got."
  },
  {
    title:"Prying a herd bull off his cows", tag:"Challenge him",
    situation:"A mature bull is bugling but he has a harem and won’t leave them for cow calls. You have to make him defend his ground.",
    setup:"Get the wind right and be able to close the gap. You’re selling a rival bull — ideally one who already has cows of his own — moving in on his.",
    steps:[
      { call:"dominantBugle", action:"Open with a dominant bugle aimed straight at him.", note:"“Your ground, your cows — I’m taking them.”" },
      { call:"chuckle", action:"Tag chuckles on the end.", note:"Sound like a confident, fired-up bull, not a nervous one." },
      { call:"assemblyMew", action:"Mix in a few cow mews.", note:"Now it sounds like that rival already has company — doubly infuriating." },
      { call:"dominantBugle", action:"Escalate the dominant bugle, rake a tree, and close the distance.", note:"Sound like a rival setting up right in the herd bull’s living room." },
      { call:"silence", action:"When he commits and comes looking for the fight, stop and get ready.", note:"If he hangs up instead, either escalate harder or back off and go cow-only." },
    ],
    principle:"Give a herd bull a reason he can’t ignore: a rival moving in on his cows."
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

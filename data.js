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

  { id:"mew", name:"Basic mew", role:"locate", voice:"cow", flag:"videos 1–9",
    clip:"assets/media/mew.mp3",
    short:"Casual “I’m here” cow-to-cow contact.",
    meaning:"Casual cow-to-cow contact — a low-key “I’m here.” Used alongside chirps to open a calling scenario.",
    pairs:["chirp","lostMew"] },

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

  { id:"demandingMew", name:"Demanding mew", role:"direct", voice:"cow", flag:"videos 1–9",
    clip:"assets/media/demanding-mew.mp4",
    short:"Insistent “come here — now.”",
    meaning:"A more insistent “come here — now.” A stronger, pushier assembly mew for a reluctant bull, and a core ingredient of the hyper-hot combination.",
    pairs:["assemblyMew","frustratedWhine","aggravatedWhine"] },

  { id:"longMew", name:"Long mew", role:"emotion", voice:"cow",
    clip:"assets/media/long-mew.mp3",
    short:"“Where are you? I want to be with you.” Eager + confused; for a bull drifting off.",
    meaning:"Lost mew + assembly mew in one breath: “Where are you? I want to be with you — why aren’t you coming?” Adds eagerness and a touch of confusion. Made for a bull who’s lollygagging or drifting off to the side.",
    pairs:["lostMew","assemblyMew","frustratedWhine"] },

  { id:"frustratedWhine", name:"Frustrated whine", role:"emotion", voice:"cow",
    clip:"assets/media/frustrated-whine.mp3",
    short:"“Hurry up — I’m getting impatient.”",
    meaning:"“I really want your company and I’m getting impatient.” Layer it in when a committed bull is taking his sweet time.",
    pairs:["assemblyMew","demandingMew"] },

  { id:"aggravatedWhine", name:"Aggravated whine", role:"emotion", voice:"cow",
    clip:"assets/media/aggravated-whine.mp4",
    short:"Agitated cow; adds urgency to a scene.",
    meaning:"An agitated cow — think of one fed up with a pestering young bull. Adds urgency and agitation to a scene; a key part of the desperate-cow tactic and the hyper-hot combination.",
    pairs:["lostMew","assemblyMew","demandingMew"] },

  { id:"selfishMew", name:"Selfish mew", role:"emotion", voice:"cow", flag:"videos 1–9",
    clip:"assets/media/selfish-mew.mp3",
    short:"Definition coming soon (from videos 1–9).",
    meaning:"A cow mew defined in Chris Roe’s earlier videos in the series. Its exact meaning is being confirmed and will be filled in here — for now you can still play the clip.",
    pairs:[] },

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

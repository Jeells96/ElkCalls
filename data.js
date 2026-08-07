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
};

const CALLS = [
  /* ---------------------- COW ---------------------- */
  { id:"chirp", name:"Chirp", role:"locate", voice:"cow", flag:"videos 1–9",
    short:"Calm herd contact; a conversation opener.",
    meaning:"Relaxed, everyday herd talk — “we’re just elk here, all is calm.” An opener you use to start a conversation and get a bull to reveal himself.",
    pairs:["mew","lostMew"] },

  { id:"mew", name:"Basic mew", role:"locate", voice:"cow", flag:"videos 1–9",
    short:"Casual “I’m here” cow-to-cow contact.",
    meaning:"Casual cow-to-cow contact — a low-key “I’m here.” Used alongside chirps to open a calling scenario.",
    pairs:["chirp","lostMew"] },

  { id:"lostMew", name:"Lost mew", role:"locate", voice:"cow",
    short:"“Where are you?” Locate him & open a direct line.",
    meaning:"“Where are you?” A locating call. You heard him and want to pin down exactly where he is. It opens a direct, one-on-one line of communication — use it to make contact before you ask for anything.",
    pairs:["assemblyMew","longMew","aggravatedWhine"] },

  { id:"assemblyMew", name:"Assembly mew", role:"direct", voice:"cow",
    short:"“Come to me — here I am.” Your finishing call.",
    meaning:"“Come to me — this is where I am.” The directing call. Once he’s interested, stop asking where he is and simply tell him to keep coming to you. This is your finishing call.",
    pairs:["lostMew","frustratedWhine","demandingMew","longMew"] },

  { id:"demandingMew", name:"Demanding mew", role:"direct", voice:"cow", flag:"videos 1–9",
    short:"Insistent “come here — now.”",
    meaning:"A more insistent “come here — now.” A stronger, pushier assembly mew for a reluctant bull, and a core ingredient of the hyper-hot combination.",
    pairs:["assemblyMew","frustratedWhine","aggravatedWhine"] },

  { id:"longMew", name:"Long mew", role:"emotion", voice:"cow",
    short:"“Where are you? I want to be with you.” Eager + confused; for a bull drifting off.",
    meaning:"Lost mew + assembly mew in one breath: “Where are you? I want to be with you — why aren’t you coming?” Adds eagerness and a touch of confusion. Made for a bull who’s lollygagging or drifting off to the side.",
    pairs:["lostMew","assemblyMew","frustratedWhine"] },

  { id:"frustratedWhine", name:"Frustrated whine", role:"emotion", voice:"cow",
    short:"“Hurry up — I’m getting impatient.”",
    meaning:"“I really want your company and I’m getting impatient.” Layer it in when a committed bull is taking his sweet time.",
    pairs:["assemblyMew","demandingMew"] },

  { id:"aggravatedWhine", name:"Aggravated whine", role:"emotion", voice:"cow",
    short:"Agitated cow; adds urgency to a scene.",
    meaning:"An agitated cow — think of one fed up with a pestering young bull. Adds urgency and agitation to a scene; a key part of the desperate-cow tactic and the hyper-hot combination.",
    pairs:["lostMew","assemblyMew","demandingMew"] },

  { id:"hyperHot", name:"Hyper-hot / hyper-estrous", role:"combo", voice:"cow",
    short:"Fast combo of everyday calls = “need a bull NOW.” Last resort.",
    meaning:"Not a special, unique call — a fast, repeated string of everyday calls (assembly → demanding mew → frustrated whine → assembly → demanding mew → aggravated whine → assembly) that together say “I need a bull in my location right now.” A last resort when bulls answer but won’t commit.",
    pairs:["assemblyMew","demandingMew","frustratedWhine","aggravatedWhine"] },

  /* ---------------------- BULL --------------------- */
  { id:"contactBugle", name:"Contact bugle", role:"cue", voice:"bull",
    short:"His quiet answer — your cue to switch to assembly.",
    meaning:"Not your call to start with — his. A quiet, low-key bugle a bull uses to answer. Learn to hear it: it tells you he’s engaged and it’s time to switch from locating (lost mew) to directing (assembly mew).",
    pairs:["lostMew","assemblyMew"] },

  { id:"locationBugle", name:"Location bugle", role:"locate", voice:"bull", flag:"general elk",
    short:"“Here I am — anyone out there?” Locate a bull & read his mood.",
    meaning:"“Here I am — who else is out here?” A bull advertising himself and locating other elk. Use it to make a bull answer and give away his position, or to plant the idea that a new bull just showed up. Once he answers, read his mood and choose your next voice.",
    pairs:["contactBugle","challengeBugle","lostMew","assemblyMew"] },

  { id:"challengeBugle", name:"Challenge bugle", role:"challenge", voice:"bull", flag:"general elk",
    short:"“My ground, my cows — back off.” Provokes a herd bull to defend.",
    meaning:"“This is my ground and my cows — back off.” A direct threat aimed at another bull. Use it to make a dominant, herded-up bull come defend his territory when he won’t leave his cows for cow calls. Back it with confidence sounds and a little cow talk so it sounds like a rival who already has company.",
    pairs:["chuckle","glunk","aggravatedWhine","assemblyMew"] },

  { id:"chuckle", name:"Chuckle", role:"challenge", voice:"bull", flag:"general elk",
    short:"Tags a bugle; sounds like a confident, fired-up bull.",
    meaning:"The guttural stutter often tacked onto the end of a bugle. It says a real, confident, fired-up bull. Add it to a location or challenge bugle to sound legit and to push a rival’s buttons.",
    pairs:["locationBugle","challengeBugle","glunk"] },

  { id:"glunk", name:"Glunk / tending grunt", role:"challenge", voice:"bull", flag:"general elk",
    short:"Deep grunts of a dominant bull tending his cows.",
    meaning:"Deep, guttural grunts a dominant bull makes while tending his cows — the sound of a mature herd bull at home. Mix it with raking and movement to sound like a rival setting up right in his living room.",
    pairs:["challengeBugle","chuckle"] },
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
      { call:"locationBugle", action:"Throw a location bugle to prompt an answer.", note:"You’re asking “anyone out here?” — not picking a fight yet." },
      { call:"contactBugle", action:"Read his reply.", note:"An answer tells you where he is and how fired up he is." },
      { call:"tip", action:"Now pick your voice.", note:"Lone or satellite bull → switch to cow calls (lost mew → assembly mew) to bring him in. Fired-up herd bull → switch to a challenge." },
    ],
    principle:"Locate first, then choose the cow or bull voice that fits the bull you’ve actually got."
  },
  {
    title:"Prying a herd bull off his cows", tag:"Challenge him",
    situation:"A mature bull is bugling but he has a harem and won’t leave them for cow calls. You have to make him defend his ground.",
    setup:"Get the wind right and be able to close the gap. You’re selling a rival bull — ideally one who already has cows of his own — moving in on his.",
    steps:[
      { call:"challengeBugle", action:"Open with a challenge bugle aimed straight at him.", note:"“Your ground, your cows — I’m taking them.”" },
      { call:"chuckle", action:"Tag chuckles on the end.", note:"Sound like a confident, fired-up bull, not a nervous one." },
      { call:"assemblyMew", action:"Mix in a few cow mews.", note:"Now it sounds like that rival already has company — doubly infuriating." },
      { call:"glunk", action:"Add glunks, rake a tree, and close the distance.", note:"Sound like he’s setting up right in the herd bull’s living room." },
      { call:"silence", action:"When he commits and comes looking for the fight, stop and get ready.", note:"If he hangs up instead, either escalate harder or back off and go cow-only." },
    ],
    principle:"Give a herd bull a reason he can’t ignore: a rival moving in on his cows."
  },
];

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

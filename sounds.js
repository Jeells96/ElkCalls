/* =========================================================================
   SOUND LIBRARY — independent of the Chris Roe teaching material.

   Every recording here is PUBLIC DOMAIN: US National Park Service field
   recordings (works of the US federal government) and public-domain files
   from Wikimedia Commons. Park / recordist credited per clip.

   Long field recordings were trimmed to their liveliest ~75 seconds and
   loudness-normalized; nothing else was altered.
   ========================================================================= */

const SOUND_GROUPS = [
  {
    title: "Bugles",
    blurb: "The sound elk are famous for. Bulls bugle through the rut — the same call varies hugely between animals, from a clean whistle to a ragged scream with a grunt on the end.",
    sounds: [
      { name:"Classic bugle", file:"bugle-yellowstone-1.mp3", secs:10,
        about:"A textbook bugle: low start, rising whistle, then a drop off the top. About as clean as they get.",
        where:"Yellowstone National Park" },
      { name:"Bugle with grunts", file:"bugle-yellowstone-2.mp3", secs:18,
        about:"A fuller effort — the whistle followed by the guttural grunting that often tags the end of a bugle.",
        where:"Yellowstone National Park" },
      { name:"Bugle across the dunes", file:"bugle-great-sand-dunes.mp3", secs:20,
        about:"Recorded in open country, so you can hear how far a bugle carries and how the landscape colors it.",
        where:"Great Sand Dunes National Park &amp; Preserve" },
      { name:"Bugle from the brush", file:"bugle-from-the-brush.mp3", secs:47,
        about:"A bull sounding off from inside cover, with the brush and his movement audible around the call.",
        where:"Rocky Mountain National Park" },
      { name:"Short bugle", file:"bugle-short.mp3", secs:5,
        about:"A brief, high, clean bugle — useful for hearing just the whistle without the extras.",
        where:"Wikimedia Commons · Jim Pisarowicz" },
      { name:"Deep bellow", file:"bugle-bellow.mp3", secs:6,
        about:"Lower and rougher than a typical bugle — the bottom end of the range a bull can produce.",
        where:"Wikimedia Commons" },
    ]
  },
  {
    title: "Glunks &amp; grunts",
    blurb: "The deep, hollow popping a bull makes low in his throat — often described as a glunk or glug. Quiet, close-range, and easy to miss if you don't know to listen for it.",
    sounds: [
      { name:"Glunk (glug)", file:"glunk-glug.mp3", secs:12,
        about:"Isolated glunking. Listen for the hollow, almost liquid pop, repeated at a slow, steady pace.",
        where:"Rocky Mountain National Park" },
      { name:"Glunk, bugle &amp; mew together", file:"glunk-bugle-mew.mp3", secs:38,
        about:"All three in one recording — glunks underneath, a bugle over the top, and cow mews in the background. A good ear-training clip.",
        where:"Rocky Mountain National Park" },
    ]
  },
  {
    title: "Cows &amp; calves",
    blurb: "The everyday talk of a herd. Far more common than bugling, and what you'll hear most if you spend time near elk outside the peak of the rut.",
    sounds: [
      { name:"Cow mews", file:"cow-mews.mp3", secs:17,
        about:"Several cows mewing back and forth — the ordinary contact chatter of a group keeping track of itself.",
        where:"Rocky Mountain National Park" },
      { name:"Calf", file:"calf.mp3", secs:9,
        about:"A calf calling. Noticeably higher and thinner than a cow, and more insistent.",
        where:"Yellowstone National Park" },
    ]
  },
  {
    title: "Alarm",
    blurb: "The sound that means you have been made. A sharp, dog-like bark that puts every elk within earshot on alert.",
    sounds: [
      { name:"Alarm bark", file:"alarm-bark.mp3", secs:4,
        about:"One short, explosive bark. Nothing else an elk does sounds remotely like it — and once you have heard it you will never mistake it.",
        where:"Rocky Mountain National Park" },
    ]
  },
  {
    title: "The whole herd",
    blurb: "Longer field recordings, trimmed to their busiest stretch. This is what elk country actually sounds like when there's a lot going on.",
    sounds: [
      { name:"Bull and cows", file:"herd-bull-and-cows.mp3", secs:75,
        about:"A bull working around his cows, with mews and bugling layered over each other.",
        where:"Yellowstone National Park" },
      { name:"Elk chorus", file:"herd-chorus.mp3", secs:75,
        about:"Multiple animals sounding off at once — the overlapping racket of a busy herd.",
        where:"Yellowstone National Park" },
      { name:"Rut on the lakeshore", file:"rut-lakeshore-1.mp3", secs:75,
        about:"Rutting activity recorded near water, with the lake and open air around it.",
        where:"Yellowstone National Park" },
      { name:"Rut on the lakeshore (2)", file:"rut-lakeshore-2.mp3", secs:75,
        about:"A second lakeshore recording from the following night — same place, different animals.",
        where:"Yellowstone National Park" },
      { name:"Rut at dawn", file:"rut-at-dawn.mp3", secs:75,
        about:"First light in a meadow during the rut, pulled from the liveliest stretch of a near hour-long recording.",
        where:"Rocky Mountain National Park" },
      { name:"Coyotes and a bugle", file:"coyotes-and-bugle.mp3", secs:75,
        about:"Coyotes yipping with elk bugling behind them — a reminder of everything else sharing the mountain.",
        where:"Rocky Mountain National Park" },
    ]
  },
];

# Elk — A Field Phrasebook of Cow & Bull Vocalizations

A field reference for **elk vocalizations**: what each call *means*, what it
*pairs with*, and which *sequence* to run in a given scenario.

It's built on one core idea from **Chris Roe's** elk vocalization &
communication philosophy: **calls are words.** Learn what each one says, and you
can string them together to tell a bull whatever story the moment calls for.

> This reference intentionally does **not** describe what each call *sounds
> like* — only what it means and how the calls combine.

## What's inside

Five tabs. One search box, top of every one of them, that reaches every
lesson body, situation step, behavior section and library clip.

- **Calls** — every call, answer-first: one plain sentence, a short "use it
  when" list, what it pairs with, and the full lesson folded away underneath.
  Tap any name to hear it. Two views: **one at a time** (cards, filterable by
  Cow / Bull) or **all on one page** (the tree — every call laid out in the
  order a conversation goes, with the calls each one works with lighting up).
- **Situations** — pick the one you're in; get the exact order to call.
- **Study** — flashcards that remember what you've got and drill what you
  haven't, plus a "name that sound" quiz.
- **Sounds** — a standalone library of real elk recorded in the wild.
- **Behavior** — the groundwork the calling sits on.
- **Field card** (`cheatsheet.html`) — a compact, print-first pocket reference.
  Hit **Print / Save as PDF** for a page you can carry.

Call colors are a job key: contact / locate / direct / emotion / challenge /
combo / alarm / control.

## Pages / files

Plain static site — no build step, no dependencies.

| File | Purpose |
|------|---------|
| `index.html` | The main guide (structure + styles) |
| `cheatsheet.html` | The printable field card |
| `data.js` | **All content** — the single source of truth |
| `app.js` | Renders the guide from `data.js` |
| `cheatsheet.js` | Renders the field card from `data.js` |
| `assets/media/` | Call demo clips (`.mp4` video or `.mp3` audio), one per call |
| `transcripts/` | Word-for-word lesson transcripts (reference; not shown in the site UI) |
| `sounds.js` | The independent sound library (see below) |
| `assets/sounds/` | Public-domain field recordings of real elk |

- **Locally:** open `index.html` in any browser.
- **Live (one-time setup):** on GitHub, go to **Settings → Pages → Build and
  deployment**, set **Source: Deploy from a branch**, choose **Branch: `main`**
  and **`/ (root)`**, and Save. The site publishes at
  `https://jeells96.github.io/ElkCalls/` and rebuilds automatically on every
  push to `main`.

## Editing / extending

All content lives in **`data.js`** — add an entry and it renders in both the
guide and the field card automatically.

- `CALLS` — `{ id, name, role, voice, short, meaning, pairs:[ids], flag?, clip?, lesson? }`
  - `clip` *(optional)*: path to an audio (`.mp3`) or video (`.mp4`) clip in
    `assets/media/` (e.g. `assets/media/chirp.mp4`). Tapping the call name plays
    it — `.mp4` shows a video player, `.mp3` shows an audio player.
  - `lesson` *(optional)*: an array of `{ h, body }` sections — the distilled,
    reworded lesson shown as a collapsible **Full breakdown** when you open the
    call. `body` may contain simple HTML (`<b>`, `<ul>`/`<li>`, `<br>`).
  - `role`: `locate | direct | emotion | challenge | cue | combo` (sets its color).
  - `voice`: `"cow" | "bull"` (powers the Cow/Bull toggle).
  - `short`: the one-line version used on the field card.
  - `pairs`: other call `id`s it commonly combines with or leads into.
  - `flag` *(optional)*: an honesty tag (e.g. `"videos 1–9"`, `"general elk"`);
    tooltip text comes from `FLAG_TITLES`.
- `SCENARIOS` — a situation and its `steps`. A step's `call` is a call `id`, or
  the special values `"silence"` (go quiet) / `"tip"` (a note, no call).
- `PRINCIPLES` — the idea cards.

## Recordings still needed

Sounds Chris Roe demonstrates in the lessons that aren't on the site yet. Drop a
file into `assets/media/` using the **exact** name below and it appears on its
call automatically — the site probes for each one at load time, so no code
change is needed. The Sounds tab lists the same thing and ticks each one off as
it arrives.

| Filename (in `assets/media/`) | For | What it should be |
|---|---|---|
| `bull-check-1.mp3` | Check bugle | Starts, stops, then picks up near the end |
| `bull-check-2.mp3` | Check bugle | Stutters the whole way through |
| `bull-glunk.mp3` | Glunk | Chris's demo — single and double note, in a string |
| `alarm-bark.mp3` | Alarm bark | Chris's demo — the normal bark |
| `alarm-bark-quiet.mp3` | Alarm bark | The quiet, under-the-breath version |
| `alarm-bark-chuckle.mp3` | Alarm bark | Bark buried inside excited chuckles — the cover-up |
| `selfish-scream.mp3` | Selfish mew | The "selfish scream" — same call, louder and raspier |

The **check bugle** is the only call with no recording at all. The **glunk** and
**alarm bark** currently borrow real wild-elk clips from the public-domain
library, which the cards say plainly; a Roe demonstration would be better.

## Source & attribution

Every call in the guide — all 16, cow and bull — is drawn from Chris Roe's own
lesson on that call, plus the "putting it all together" video for the calling
sequences and the behavior series for the **Behavior** tab. Verbatim transcripts
live in `transcripts/`.

Still to come, based on lessons Roe references but that aren't captured here yet:
**cow bugling**, bull **whines/moans/groans**, and whatever follows principle 2
in the behavior series.


## The sound library (separate from the Roe material)

The **Sounds** tab is a standalone library of real elk recorded in the wild —
17 clips covering bugles, glunks, cow mews, a calf, the alarm bark, and longer
herd/rut soundscapes. It is deliberately kept apart from the teaching material:
nothing in it comes from Chris Roe, and none of it is instruction.

Every recording is **public domain**:

- **U.S. National Park Service** field recordings (works of the US federal
  government) — Yellowstone, Rocky Mountain, and Great Sand Dunes.
- **Wikimedia Commons** public-domain files.

The park or recordist is credited on each clip in the UI. Long recordings were
trimmed to their liveliest ~75 seconds (picked by scanning for the highest-energy
window) and loudness-normalized to a consistent level; nothing else was altered.

Content lives in `sounds.js` — add a `{ name, file, secs, about, where }` entry
to a group and it renders automatically.

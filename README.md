# Elk — A Field Phrasebook of Cow & Bull Vocalizations

A field reference for **elk vocalizations**: what each call *means*, what it
*pairs with*, and which *sequence* to run in a given scenario.

It's built on one core idea from **Chris Roe's** elk vocalization &
communication philosophy: **calls are words.** Learn what each one says, and you
can string them together to tell a bull whatever story the moment calls for.

> This reference intentionally does **not** describe what each call *sounds
> like* — only what it means and how the calls combine.

## What's inside

- **The Calls** — a searchable lexicon. Filter by **voice** (Cow / Bull) or by
  **job** (a color key: contact / locate / direct / emotion / challenge /
  combo / alarm / control). **Tap any call name** to play its demo clip, read its meaning, open
  Chris Roe's **full breakdown** of that call, and see what it pairs with.
- **Scenarios** — real situations with a numbered, step-by-step calling
  sequence, including two that mix cow and bull calling.
- **Field card** (`cheatsheet.html`) — a compact, print-first pocket reference.
  Hit **Print / Save as PDF** for a page you can carry.

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

## Source & attribution

Every call in the guide — all 16, cow and bull — is drawn from Chris Roe's own
lesson on that call, plus the "putting it all together" video for the calling
sequences and the behavior series for the **Behavior** tab. Verbatim transcripts
live in `transcripts/`.

Still to come, based on lessons Roe references but that aren't captured here yet:
**cow bugling**, bull **whines/moans/groans**, and the rest of the behavior
series (the next one is *"The Doorway"* — choosing your setups).


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

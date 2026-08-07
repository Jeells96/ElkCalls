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
  **job** (a color key: locate / direct / emotion / challenge / his-reply /
  combo). **Tap any call name to play its demo clip**, read its meaning, and see
  what it pairs with.
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
| `assets/videos/` | Call demo clips (`.mp4`), one per call |

- **Locally:** open `index.html` in any browser.
- **Live (one-time setup):** on GitHub, go to **Settings → Pages → Build and
  deployment**, set **Source: Deploy from a branch**, choose **Branch: `main`**
  and **`/ (root)`**, and Save. The site publishes at
  `https://jeells96.github.io/ElkCalls/` and rebuilds automatically on every
  push to `main`.

## Editing / extending

All content lives in **`data.js`** — add an entry and it renders in both the
guide and the field card automatically.

- `CALLS` — `{ id, name, role, voice, short, meaning, pairs:[ids], flag?, video? }`
  - `video` *(optional)*: path to an MP4 clip (e.g. `assets/videos/chirp.mp4`);
    tapping the call name plays it. Drop new clips in `assets/videos/` and add
    the path here.
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

The **cow calls** are distilled from the *"Understanding Cow-Elk Vocalizations &
Communication"* series — specifically the closing *"putting it all together"*
video. A few cow calls marked **videos 1–9** are defined more fully in the
earlier videos of that series. The **bull sounds**, marked **general elk**,
carry the same "calls are words" approach over to widely-taught elk behavior and
are not drawn from that cow-only series — they can be pinned to a specific Chris
Roe bull-calling source if one is provided.

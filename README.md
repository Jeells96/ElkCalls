# Elk Calls — Cow Vocalization Playbook

A field reference for **cow-elk vocalizations**: what each call *means*, what it
*pairs with*, and which *sequence* to run in a given scenario.

It's built on one core idea from Chris Rose's cow-elk vocalization &
communication philosophy: **calls are words.** Learn what each one says, and you
can string them together to tell a bull whatever story the moment calls for.

> This reference intentionally does **not** describe what each call *sounds
> like* — only what it means and how the calls combine.

## What's inside

- **Principles** — the philosophy distilled into eight ideas.
- **The Calls** — a searchable glossary. Each call has a meaning, a color that
  groups it by job (locate / direct / emotion / his-reply / combo), and
  tappable **"pairs with"** tags that jump to the calls it commonly leads into.
- **Scenarios** — real situations with a numbered, step-by-step calling sequence
  and the takeaway behind each one.

## Viewing it

It's a single, self-contained `index.html` — no build step, no dependencies.

- **Locally:** open `index.html` in any browser.
- **On the web (GitHub Pages):** in the repo, go to **Settings → Pages**, set
  the source to the `main` branch (root), and it'll be served at
  `https://<user>.github.io/ElkCalls/`.

## Editing / extending

All content lives in a clearly marked **DATA** block near the top of the
`<script>` in `index.html`:

- `CALLS` — add or refine a call: `{ id, name, role, meaning, pairs:[ids], foundation? }`
  - `role` is one of `locate | direct | emotion | cue | combo` (drives its color).
  - `pairs` is a list of other call `id`s it commonly combines with or leads into.
  - `foundation: true` flags calls whose full meaning comes from earlier videos.
- `SCENARIOS` — add a situation and its `steps`. A step's `call` is a call `id`,
  or the special values `"silence"` (go quiet) / `"tip"` (a note, no call).
- `PRINCIPLES` — the top-of-page idea cards.

Add an entry to the data and it renders automatically.

## Source & attribution

Distilled from the *"Understanding Cow-Elk Vocalizations & Communication"*
series — specifically the closing *"putting it all together"* video. A few
foundational calls (marked **from videos 1–9**) are defined more completely in
the earlier videos of that series, which aren't yet reflected here.

/* Renders the guide from the shared data in data.js.
   Core rule: anything with a play triangle plays the sound IMMEDIATELY. */
(function(){
  const byId = Object.fromEntries(CALLS.map(c => [c.id, c]));
  const cvar = role => (ROLES[role] ? ROLES[role].var : "--neutral");
  const el = (tag, cls, html) => { const n = document.createElement(tag); if(cls) n.className = cls; if(html != null) n.innerHTML = html; return n; };
  const PLAY_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  const clipsOf = c => c.clips ? c.clips : (c.clip ? [{label:"", src:c.clip}] : []);
  const firstClip = c => { const l = clipsOf(c); return l.length ? l[0].src : null; };
  const isVideo = src => /\.(mp4|mov|webm)$/i.test(src || "");

  /* Does this media file actually exist yet? Resolves true/false, never rejects.
     Lets you drop a recording into assets/media/ and have it light up with no code change. */
  const probeCache = {};
  function probe(src){
    if(probeCache[src]) return probeCache[src];
    // HEAD request: a missing file is a quiet 404, not a console error the way <audio> is
    return probeCache[src] = fetch(src, { method:"HEAD" })
      .then(r => r.ok)
      .catch(() => false);
  }

  /* =====================================================================
     AUDIO — one shared player; clicking any control plays at once
     ===================================================================== */
  let audio = null, playingBtn = null;

  function clearPlayingUI(){
    document.querySelectorAll(".playing").forEach(n => n.classList.remove("playing"));
    const tree = document.getElementById("tree");
    if(tree){
      tree.classList.remove("focusing");
      tree.querySelectorAll(".linked").forEach(n => n.classList.remove("linked"));
    }
    playingBtn = null;
  }

  function stopAudio(){
    if(audio){ try{ audio.pause(); }catch(e){} }
    clearPlayingUI();
  }

  function playClip(src, btn){
    if(!src) return;
    // tapping the same control again stops it
    if(btn && btn === playingBtn){ stopAudio(); return; }
    stopAudio();
    if(!audio){
      audio = new Audio();
      audio.addEventListener("ended", clearPlayingUI);
      audio.addEventListener("error", clearPlayingUI);
    }
    audio.src = src;
    audio.currentTime = 0;
    const p = audio.play();
    if(p && p.catch) p.catch(() => clearPlayingUI());
    if(btn){
      btn.classList.add("playing");
      playingBtn = btn;
      // in the tree, light up the calls this one works with
      const id = btn.dataset.id;
      const tree = document.getElementById("tree");
      if(id && tree && tree.contains(btn)){
        const c = byId[id];
        tree.classList.add("focusing");
        (c.pairs || []).forEach(pid => {
          tree.querySelectorAll('.node[data-id="' + pid + '"]').forEach(n => n.classList.add("linked"));
        });
      }
    }
  }

  /* =====================================================================
     TABS
     ===================================================================== */
  const tabs = [...document.querySelectorAll(".tab")];
  function showPanel(name){
    tabs.forEach(t => {
      const on = t.dataset.panel === name;
      t.setAttribute("aria-selected", String(on));
      document.getElementById("panel-" + t.dataset.panel).hidden = !on;
    });
    stopAudio();
    if(history.replaceState) history.replaceState(null, "", "#" + name);
  }
  tabs.forEach(t => t.addEventListener("click", () => showPanel(t.dataset.panel)));
  const startPanel = (location.hash || "").replace("#","");
  if(["calls","tree","scenarios","study","sounds","behavior"].includes(startPanel)) showPanel(startPanel);

  /* =====================================================================
     CALLS
     ===================================================================== */
  let activeVoice = "all";
  const seg = document.getElementById("voiceSeg");
  seg.addEventListener("click", e => {
    const btn = e.target.closest("button"); if(!btn) return;
    activeVoice = btn.dataset.voice;
    [...seg.children].forEach(x => x.setAttribute("aria-pressed", String(x === btn)));
    applyFilter();
  });

  const callGrid = document.getElementById("callGrid");

  CALLS.forEach(c => {
    const clips = clipsOf(c);
    const card = el("article","call");
    card.id = "call-" + c.id;
    card.style.setProperty("--c", `var(${cvar(c.role)})`);
    card.dataset.voice = c.voice;
    card.dataset.text = (c.name + " " + c.plain + " " + (c.use||[]).join(" ") + " " + c.meaning + " " +
                         (c.lesson||[]).map(l => l.h).join(" ")).replace(/<[^>]+>/g,"").toLowerCase();

    const multi = clips.length > 1;

    if(!multi){
      /* one sound — the whole header is the play button */
      const play = el("button","play-btn");
      play.type = "button";
      play.innerHTML =
        `<span class="disc">${PLAY_SVG}</span>` +
        `<span class="txt"><span class="nm">${c.name}</span>` +
        `<span class="hint">${clips.length ? "Tap to hear it" : "No recording yet — read below"}</span></span>`;
      if(clips.length) play.addEventListener("click", () => playClip(clips[0].src, play));
      else play.disabled = true;
      card.appendChild(play);
    } else {
      /* several versions — title, then every version listed and taught */
      const head = el("div","multi-head");
      head.innerHTML = `<span class="nm">${c.name}</span><span class="hint">${clips.length} versions &mdash; tap any one to hear it</span>`;
      card.appendChild(head);

      const list = el("div","variants");
      clips.forEach(cl => {
        const row = el("div","variant");
        const b = el("button","variant-btn");
        b.type = "button";
        b.innerHTML = `<span class="disc">${PLAY_SVG}</span><span class="vlabel">${cl.label}</span>`;
        b.addEventListener("click", () => playClip(cl.src, b));
        row.appendChild(b);
        if(cl.when){
          const d = el("details","vwhen");
          d.appendChild(el("summary", null, "What it means &amp; when to use it"));
          d.appendChild(el("p","variant-when", cl.when));
          row.appendChild(d);
        }
        list.appendChild(row);
      });
      card.appendChild(list);
    }

    /* a borrowed clip says so */
    if(c.clipNote) card.appendChild(el("p","clip-note", c.clipNote));

    /* recordings not uploaded yet — each becomes a real play button the moment the file lands */
    if(c.wanted && c.wanted.length){
      const box = el("div","wanted");
      box.appendChild(el("div","wanted-label","Recordings still to come"));
      c.wanted.forEach(w => {
        const row = el("div","wanted-row");
        const name = w.file.split("/").pop();
        row.innerHTML = `<code>${name}</code><span class="wl">${w.label}</span>`;
        box.appendChild(row);
        probe(w.file).then(ok => {
          if(!ok) return;
          const btn = el("button","variant-btn");
          btn.type = "button";
          btn.innerHTML = `<span class="disc">${PLAY_SVG}</span><span class="vlabel">${w.label}</span>`;
          btn.addEventListener("click", () => playClip(w.file, btn));
          box.replaceChild(btn, row);
          box.classList.add("has-some");
          if(!box.querySelector(".wanted-row")) box.querySelector(".wanted-label").textContent = "Also hear";
        });
      });
      card.appendChild(box);
    }

    /* meta row */
    const meta = el("div","call-meta");
    meta.appendChild(el("span","badge", ROLES[c.role].label));
    meta.appendChild(el("span","voice-pill", c.voice === "both" ? "Cow &amp; bull" : c.voice === "bull" ? "Bull" : "Cow"));
    if(c.flag){
      const t = (FLAG_TITLES[c.flag] || "").replace(/"/g,"&quot;");
      meta.insertAdjacentHTML("beforeend", `<span class="foundation" title="${t}">${c.flag}</span>`);
    }
    card.appendChild(meta);

    /* the one-line answer */
    card.appendChild(el("p","plain", c.plain || c.short));

    /* use it when — the short actionable list */
    if(c.use && c.use.length){
      card.appendChild(el("div","use-label","Use it when"));
      const ul = el("ul","use");
      c.use.forEach(u => ul.appendChild(el("li", null, u)));
      card.appendChild(ul);
    }

    /* pairs — these play too */
    if(c.pairs && c.pairs.length){
      card.appendChild(el("div","pairs-label","Use it with"));
      const wrap = el("div","pairs");
      c.pairs.forEach(pid => {
        const t = byId[pid]; if(!t) return;
        const b = el("button","pair", `<span class="mini"></span>${t.name}`);
        b.type = "button";
        b.style.setProperty("--c", `var(${cvar(t.role)})`);
        b.title = "Hear the " + t.name;
        const src = firstClip(t);
        if(src) b.addEventListener("click", () => playClip(src, b));
        wrap.appendChild(b);
      });
      card.appendChild(wrap);
    }

    /* full lesson + video, tucked away */
    if((c.lesson && c.lesson.length) || c.video){
      const det = el("details","more");
      det.appendChild(el("summary", null, "Show the full lesson" + (c.lesson && c.lesson.length ? ' <span class="cnt">' + (c.lesson.length + 1) + " parts</span>" : "")));
      const body = el("div","more-body");
      if(c.video){
        const w = el("div","watch");
        const wb = el("button","watch-btn", "▶ Watch Chris demonstrate it");
        wb.type = "button";
        wb.addEventListener("click", () => {
          stopAudio();
          const v = document.createElement("video");
          v.controls = true; v.playsInline = true; v.preload = "metadata"; v.src = c.video;
          w.replaceChildren(v);
          v.play().catch(()=>{});
        });
        w.appendChild(wb);
        body.appendChild(w);
      }
      const secs = [{ h:"The full meaning", body:c.meaning }].concat(c.lesson || []);

      /* long lessons get a jump bar so nobody has to scroll blind */
      if(secs.length > 6){
        const jump = el("div","jump");
        secs.forEach((sec, n) => {
          const a = el("button","jump-chip", sec.h);
          a.type = "button";
          a.addEventListener("click", () => {
            const t = body.querySelectorAll("section")[n];
            if(t) t.scrollIntoView({block:"start"});
          });
          jump.appendChild(a);
        });
        body.appendChild(jump);
      }

      secs.forEach(sec => {
        const s = document.createElement("section");
        s.appendChild(el("h4", null, sec.h));
        s.appendChild(el("div", null, sec.body));
        body.appendChild(s);
      });
      det.appendChild(body);
      card.appendChild(det);
    }

    callGrid.appendChild(card);
  });

  const noResults = document.getElementById("noResults");
  function applyFilter(){
    let shown = 0;
    [...callGrid.children].forEach(card => {
      const show = activeVoice === "all" || card.dataset.voice === activeVoice || card.dataset.voice === "both";
      card.classList.toggle("hidden", !show);
      if(show) shown++;
    });
    noResults.classList.toggle("hidden", shown !== 0);
  }
  applyFilter();

  /* =====================================================================
     GLOBAL SEARCH — one box, every tab, everything in it
     ===================================================================== */
  (function(){
    const q = document.getElementById("gq");
    const out = document.getElementById("gresults");
    const clr = document.getElementById("gclear");
    if(!q || !out) return;

    const strip = h => String(h == null ? "" : h).replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();

    /* build the index once */
    const IX = [];
    CALLS.forEach(c => IX.push({
      kind:"Calls", panel:"calls", anchor:"call-" + c.id, id:c.id,
      name:c.name, sub:strip(c.plain),
      color:cvar(c.role), src:firstClip(c),
      hay:strip([c.name, c.plain, (c.use||[]).join(" "), c.meaning, c.short,
                 (c.lesson||[]).map(l => l.h + " " + l.body).join(" ")].join(" ")).toLowerCase()
    }));
    SCENARIOS.forEach((sc, i) => IX.push({
      kind:"Situations", panel:"scenarios", anchor:"scn-" + i,
      name:sc.title, sub:sc.tag + " — " + strip(sc.situation).slice(0,110),
      color:"--pine",
      hay:strip([sc.title, sc.tag, sc.situation, sc.setup, sc.cue, sc.principle,
                 (sc.steps||[]).map(st => st.action + " " + (st.note||"")).join(" ")].join(" ")).toLowerCase()
    }));
    BEHAVIOR.forEach((bh, i) => {
      IX.push({ kind:"Behavior", panel:"behavior", anchor:"beh-" + i, name:bh.title,
        sub:strip(bh.summary).slice(0,120), color:"--gold",
        hay:strip([bh.title, bh.tag, bh.summary, (bh.sections||[]).map(x => x.h + " " + x.body).join(" ")].join(" ")).toLowerCase() });
      (bh.sections||[]).forEach(sec => IX.push({
        kind:"Behavior", panel:"behavior", anchor:"beh-" + i, name:strip(sec.h),
        sub:"in “" + bh.title + "”", color:"--gold",
        hay:strip(sec.h + " " + sec.body).toLowerCase() }));
    });
    if(typeof SOUND_GROUPS !== "undefined") SOUND_GROUPS.forEach(g => (g.clips||[]).forEach(cl => IX.push({
      kind:"Sound library", panel:"sounds", anchor:"", name:strip(cl.name),
      sub:strip(cl.about).slice(0,110), color:"--locate", src:"assets/sounds/" + cl.file,
      hay:strip(cl.name + " " + cl.about + " " + (cl.where||"") + " " + g.title).toLowerCase() })));

    const hl = (text, needle) => {
      if(!needle) return text;
      const i = text.toLowerCase().indexOf(needle);
      if(i < 0) return text;
      const esc = t => t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
      return esc(text.slice(0,i)) + "<mark>" + esc(text.slice(i, i+needle.length)) + "</mark>" + esc(text.slice(i+needle.length));
    };

    function run(){
      const needle = q.value.trim().toLowerCase();
      clr.hidden = !needle;
      if(needle.length < 2){ out.hidden = true; out.replaceChildren(); return; }

      const hits = IX.filter(x => x.hay.includes(needle));
      // a name match beats a body match
      hits.sort((a,b) => {
        const an = a.name.toLowerCase().includes(needle) ? 0 : 1;
        const bn = b.name.toLowerCase().includes(needle) ? 0 : 1;
        return an - bn;
      });

      out.replaceChildren();
      out.hidden = false;
      if(!hits.length){ out.appendChild(el("p","gr-none", "Nothing matches “" + q.value.trim() + "”.")); return; }

      const order = ["Calls","Situations","Behavior","Sound library"];
      const seen = {};
      // a group holding a title match comes before a group that only matches in body text —
      // otherwise "doorway" shows the Glunk card above the card actually called "The doorway"
      const groups = order.map(k => {
        const rows = hits.filter(h => h.kind === k).filter(h => {
          const key = k + "|" + h.name + "|" + h.anchor;
          if(seen[key]) return false; seen[key] = 1; return true;
        }).slice(0, 8);
        return { k, rows, best: rows.some(r => r.name.toLowerCase().includes(needle)) ? 0 : 1 };
      });
      groups.sort((a, b) => a.best - b.best || order.indexOf(a.k) - order.indexOf(b.k));
      groups.forEach(({ k, rows }) => {
        if(!rows.length) return;
        out.appendChild(el("div","gr-group", k + " · " + rows.length));
        rows.forEach(h => {
          const b = el("button","gr");
          b.type = "button";
          b.style.setProperty("--c", `var(${h.color})`);
          const play = h.src
            ? `<span class="grplay" role="button" aria-label="Hear it">${PLAY_SVG}</span>` : "";
          b.innerHTML = play +
            `<span class="gr-txt"><span class="gr-nm">${hl(h.name, needle)}</span>` +
            `<span class="gr-sub">${hl(h.sub || "", needle)}</span></span>`;
          b.addEventListener("click", ev => {
            const disc = ev.target.closest(".grplay");
            if(disc && h.src){ ev.stopPropagation(); playClip(h.src, disc); return; }
            go(h);
          });
          out.appendChild(b);
        });
      });
    }

    function go(h){
      showPanel(h.panel);
      out.hidden = true;
      q.blur();
      requestAnimationFrame(() => {
        const t = h.anchor && document.getElementById(h.anchor);
        if(!t){ window.scrollTo({ top:0 }); return; }
        if(t.tagName === "DETAILS") t.open = true;
        t.scrollIntoView({ block:"start" });
        window.scrollBy(0, -110);   // clear the sticky tabs + search bar
        t.classList.add("flash-hit");
        setTimeout(() => t.classList.remove("flash-hit"), 1700);
      });
    }

    let t;
    q.addEventListener("input", () => { clearTimeout(t); t = setTimeout(run, 110); });
    clr.addEventListener("click", () => { q.value = ""; run(); q.focus(); });
    q.addEventListener("keydown", e => {
      if(e.key === "Escape"){ q.value = ""; run(); q.blur(); }
      if(e.key === "Enter"){ const first = out.querySelector(".gr"); if(first) first.click(); }
    });
    document.addEventListener("click", e => {
      if(!out.hidden && !e.target.closest(".gsearch-wrap")) out.hidden = true;
    });
    document.addEventListener("keydown", e => {
      if(e.key === "/" && document.activeElement !== q && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)){
        e.preventDefault(); q.focus();
      }
    });
  })();


  /* =====================================================================
     STUDY — flashcards and a listening quiz, both built from CALLS
     ===================================================================== */
  (function(){
    const area   = document.getElementById("studyArea");
    const progEl = document.getElementById("studyProg");
    if(!area) return;

    const KEY = "elkcalls.known";
    let known = {};
    try { known = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch(e){ known = {}; }
    const remember = () => { try { localStorage.setItem(KEY, JSON.stringify(known)); } catch(e){} };

    let mode = "cards", voice = "all", deck = [], at = 0, flipped = false;
    let right = 0, asked = 0;

    const shuffle = a => { for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
    const inVoice = c => voice === "all" || c.voice === voice || c.voice === "both";

    function build(){
      let pool = CALLS.filter(inVoice);
      if(mode === "quiz") pool = pool.filter(c => firstClip(c));      // must have a sound to hear
      // cards you haven't got yet come first; if you've got them all, study them all again
      const fresh = pool.filter(c => !known[c.id]);
      deck = shuffle((mode === "cards" && fresh.length) ? fresh : pool);
      at = 0; flipped = false; right = 0; asked = 0;
      render();
    }

    function metaBits(c){
      const m = el("div","fmeta");
      const b = el("span","badge", ROLES[c.role].label);
      b.style.setProperty("--c", `var(${cvar(c.role)})`);
      m.appendChild(b);
      m.appendChild(el("span","voice-pill", c.voice === "both" ? "Cow &amp; bull" : c.voice === "bull" ? "Bull" : "Cow"));
      return m;
    }

    function playRow(c, label){
      const src = firstClip(c);
      const btn = el("button","play-btn");
      btn.type = "button";
      btn.style.setProperty("--c", `var(${cvar(c.role)})`);
      btn.innerHTML = `<span class="disc">${PLAY_SVG}</span><span class="txt"><span class="nm">${label}</span>` +
                      `<span class="hint">${src ? "Tap to hear it" : "No recording yet"}</span></span>`;
      if(src) btn.addEventListener("click", () => playClip(src, btn));
      else btn.disabled = true;
      return btn;
    }

    function done(msgTitle, msgBody){
      area.replaceChildren();
      const d = el("div","done-note");
      d.appendChild(el("h3", null, msgTitle));
      d.appendChild(el("p", null, msgBody));
      const again = el("button","big-btn primary","Go again");
      again.type = "button";
      again.addEventListener("click", () => { known = {}; remember(); build(); });
      d.appendChild(again);
      area.appendChild(d);
      progEl.textContent = "";
    }

    function render(){
      area.replaceChildren();
      stopAudio();

      if(!deck.length){ done("Nothing to study here", "Try a different filter."); return; }
      if(at >= deck.length){
        if(mode === "quiz") done("Quiz finished", `You got ${right} of ${asked} right.`);
        else done("Deck finished", "You've been through every card. Start again any time.");
        return;
      }

      const c = deck[at];
      progEl.textContent = mode === "quiz"
        ? `${at+1} of ${deck.length} · ${right}/${asked} right`
        : `${at+1} of ${deck.length}`;

      const card = el("div","flash");
      card.style.setProperty("--c", `var(${cvar(c.role)})`);

      if(mode === "cards"){
        if(!flipped){
          card.appendChild(el("div","q","What does this one mean?"));
          card.appendChild(el("h3","fname", c.name));
          card.appendChild(metaBits(c));
          card.appendChild(playRow(c, "Hear it first"));
          const acts = el("div","flash-actions");
          const show = el("button","big-btn primary","Show the answer");
          show.type = "button";
          show.addEventListener("click", () => { flipped = true; render(); });
          acts.appendChild(show);
          card.appendChild(acts);
        } else {
          card.appendChild(el("div","q", c.name));
          card.appendChild(el("p","fplain", c.plain));
          if(c.use && c.use.length){
            card.appendChild(el("div","use-label","Use it when"));
            const ul = el("ul","use");
            c.use.forEach(u => ul.appendChild(el("li", null, u)));
            card.appendChild(ul);
          }
          const names = (c.pairs||[]).map(id => byId[id] && byId[id].name).filter(Boolean);
          if(names.length) card.appendChild(el("p","fpairs", "<b>Use it with</b>" + names.join(", ")));
          card.appendChild(playRow(c, "Hear it again"));

          const acts = el("div","flash-actions");
          const again = el("button","big-btn again","Need more work");
          again.type = "button";
          again.addEventListener("click", () => { delete known[c.id]; remember(); at++; flipped = false; render(); });
          const got = el("button","big-btn good","Got it");
          got.type = "button";
          got.addEventListener("click", () => { known[c.id] = 1; remember(); at++; flipped = false; render(); });
          acts.appendChild(again); acts.appendChild(got);
          card.appendChild(acts);
        }
      } else {
        /* quiz: hear it, name it */
        card.appendChild(el("div","q","Which call is this?"));
        card.appendChild(playRow(c, "Play the sound"));

        // wrong answers come from the same pool you're studying — otherwise "Bull only"
        // hands you cow calls as decoys and they're trivial to rule out
        let pool = CALLS.filter(x => x.id !== c.id && firstClip(x) && inVoice(x));
        if(pool.length < 3) pool = CALLS.filter(x => x.id !== c.id && firstClip(x));
        const others = shuffle(pool).slice(0,3);
        const opts = shuffle([c].concat(others));
        const box = el("div","qz-choices");
        opts.forEach(o => {
          const b = el("button","qz", o.name);
          b.type = "button";
          b.addEventListener("click", () => {
            asked++;
            const hit = o.id === c.id;
            if(hit) right++;
            [...box.children].forEach(x => { x.disabled = true; });
            [...box.children].forEach(x => {
              if(x.textContent.replace(/[✓✗]\s*$/,"").trim() === c.name){ x.classList.add("right"); x.innerHTML = c.name + '<span class="tick">✓</span>'; }
            });
            if(!hit){ b.classList.add("wrong"); b.innerHTML = o.name + '<span class="tick">✗</span>'; }
            const nxt = el("button","big-btn primary", at + 1 >= deck.length ? "See your score" : "Next sound");
            nxt.type = "button";
            nxt.addEventListener("click", () => { at++; render(); });
            const wrap = el("div","flash-actions");
            wrap.appendChild(nxt);
            card.appendChild(wrap);
            progEl.textContent = `${at+1} of ${deck.length} · ${right}/${asked} right`;
            // playing it again after answering is genuinely useful
            card.appendChild(el("p","score", hit ? "Correct." : "That one was the " + c.name + "."));
          });
          box.appendChild(b);
        });
        card.appendChild(box);
      }

      area.appendChild(card);
    }

    document.getElementById("modePick").addEventListener("click", e => {
      const b = e.target.closest(".mode"); if(!b) return;
      mode = b.dataset.mode;
      [...b.parentNode.children].forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      build();
    });
    document.getElementById("studyVoice").addEventListener("click", e => {
      const b = e.target.closest("button"); if(!b) return;
      voice = b.dataset.sv;
      [...b.parentNode.children].forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      build();
    });
    document.getElementById("studyRestart").addEventListener("click", () => { known = {}; remember(); build(); });

    build();
  })();

  /* =====================================================================
     SOUNDS STILL NEEDED — one list, in the Sounds tab
     ===================================================================== */
  (function(){
    const box = document.getElementById("neededBox");
    const host = document.getElementById("neededList");
    if(!box || !host) return;
    const rows = [];
    CALLS.forEach(c => (c.wanted || []).forEach(w => rows.push({ call:c, w })));
    if(!rows.length) return;
    box.hidden = false;
    rows.forEach(({call, w}) => {
      const r = el("div","need-row");
      r.innerHTML =
        `<span class="nf">${w.file}</span>` +
        `<span class="nfor">for the ${call.name}</span>` +
        `<span class="nd">${w.label}</span>`;
      host.appendChild(r);
      probe(w.file).then(ok => { if(ok) r.classList.add("done"); });
    });
  })();

  /* =====================================================================
     TREE — the conversation, top to bottom
     ===================================================================== */
  const LANES = [
    { lane:"Cow calls — how a conversation goes", cols:[
      { n:"1", title:"Open",        say:"“Anyone around?”",              ids:["chirp","mew"] },
      { n:"2", title:"Find him",    say:"“Where are you?” — the selfish mew is the same call, turned up.", ids:["lostMew","selfishMew"] },
      { n:"3", title:"Bring him in",say:"“Come to me.”",                 ids:["assemblyMew"] },
      { n:"4", title:"Add feeling", say:"He’s slow — push harder.",      ids:["demandingMew","frustratedWhine","longMew"] },
      { n:"5", title:"Last resort", say:"Loud. Hard to ignore.",         ids:["aggravatedWhine","hyperHot"] },
    ]},
    { lane:"If it goes wrong", cols:[
      { n:"!", title:"Busted", say:"Answer it — a bark means “might”, not “is”.", ids:["alarmBark"] },
    ]},
    { lane:"Bull talk — his own language", cols:[
      { n:"1", title:"Contact bugle", say:"Asks “who’s out there?” — start low, escalate only if ignored.", ids:["contactBugle"], variants:true },
      { n:"2", title:"Dominant bugle",say:"Makes a statement. Open at Level 2.", ids:["dominantBugle"], variants:true },
      { n:"+", title:"Chuckle",       say:"Raises the intensity — or works alone.", ids:["chuckle"], variants:true },
      { n:"•", title:"He won’t fight", say:"Skip him — talk to his cows instead. “Stay put.”", ids:["glunk"] },
    ]},
  ];

  const tree = document.getElementById("tree");
  LANES.forEach(L => {
    const lane = el("div","lane");
    lane.appendChild(el("div","lane-title", L.lane));
    const cols = el("div","cols");
    L.cols.forEach((t, i) => {
      if(i > 0) cols.appendChild(el("div","arrow","›"));
      const col = el("div","col");
      const head = el("div","col-head");
      head.appendChild(el("span","col-step", t.n));
      head.appendChild(el("h3", null, t.title));
      col.appendChild(head);
      col.appendChild(el("div","col-say", t.say));

      const nodes = el("div","col-nodes");
      t.ids.forEach(id => {
        const c = byId[id]; if(!c) return;
        // for bull calls, list every version as its own playable node
        const items = (t.variants && c.clips) ? c.clips.map(cl => ({
          label: cl.label.split(" — ")[0], src: cl.src, title: c.name + " — " + cl.label
        })) : [{ label: c.name, src: firstClip(c), title: "Hear the " + c.name }];
        items.forEach(it => {
          const b = el("button","node", `<span class="disc">${PLAY_SVG}</span>${it.label}`);
          b.type = "button";
          b.dataset.id = id;
          b.style.setProperty("--c", `var(${cvar(c.role)})`);
          b.title = it.title;
          if(it.src) b.addEventListener("click", () => playClip(it.src, b));
          nodes.appendChild(b);
        });
      });
      col.appendChild(nodes);
      cols.appendChild(col);
    });
    lane.appendChild(cols);
    tree.appendChild(lane);
  });

  /* =====================================================================
     SCENARIOS
     ===================================================================== */
  const list = document.getElementById("scenarioList");
  SCENARIOS.forEach((s, i) => {
    const d = el("details","scenario");
    d.id = "scn-" + i;
    if(i === 0) d.open = true;

    const sum = el("summary");
    sum.appendChild(el("span","num", String(i+1).padStart(2,"0")));
    const head = el("div","s-head");
    head.appendChild(el("span","s-tag", s.tag));
    head.appendChild(el("h3", null, s.title));
    sum.appendChild(head);
    sum.appendChild(el("span","caret","›"));
    d.appendChild(sum);

    const body = el("div","s-body");
    body.appendChild(el("p","situation", s.situation));
    if(s.setup) body.appendChild(el("div","callout", `<span class="label">Set the stage</span>${s.setup}`));
    if(s.cue)   body.appendChild(el("div","callout", `<span class="label">His cue</span>${s.cue}`));

    const steps = el("ol","steps");
    s.steps.forEach((st, idx) => {
      const li = el("li","step");
      li.appendChild(el("span","stepnum", String(idx+1)));
      const main = el("div","step-main");

      let chip;
      if(st.call === "silence"){
        chip = el("span","call-chip static", "Go quiet &amp; get ready");
        chip.style.setProperty("--c","var(--neutral)");
      } else if(st.call === "tip"){
        chip = el("span","call-chip static", "Remember");
        chip.style.setProperty("--c","var(--pine)");
      } else {
        const c = byId[st.call];
        chip = el("button","call-chip", `<span class="mini"></span>${c.name}`);
        chip.type = "button";
        chip.style.setProperty("--c", `var(${cvar(c.role)})`);
        chip.title = "Hear the " + c.name;
        const src = firstClip(c);
        if(src) chip.addEventListener("click", () => playClip(src, chip));
      }
      main.appendChild(chip);
      main.appendChild(el("p","action", st.action));
      if(st.note) main.appendChild(el("p","note", st.note));
      li.appendChild(main);
      steps.appendChild(li);
    });
    body.appendChild(steps);
    body.appendChild(el("div","principle-line", `<span class="label">Takeaway</span> ${s.principle}`));
    d.appendChild(body);
    list.appendChild(d);
  });

  /* =====================================================================
     SOUND LIBRARY — real elk recordings, independent of the teaching
     ===================================================================== */
  const lib = document.getElementById("soundLib");
  if(lib && typeof SOUND_GROUPS !== "undefined"){
    SOUND_GROUPS.forEach(g => {
      const box = el("section","sgroup");
      box.appendChild(el("h3", null, g.title));
      box.appendChild(el("p","blurb", g.blurb));
      const grid = el("div","sound-grid");
      g.sounds.forEach(s => {
        const card = el("article","snd");
        const src = "assets/sounds/" + s.file;
        const b = el("button","snd-btn");
        b.type = "button";
        b.innerHTML = `<span class="disc">${PLAY_SVG}</span><span class="txt">` +
                      `<span class="snm">${s.name}</span>` +
                      `<span class="slen">${s.secs}s &middot; tap to play</span></span>`;
        b.addEventListener("click", () => playClip(src, b));
        card.appendChild(b);
        card.appendChild(el("p","snd-about", s.about));
        card.appendChild(el("p","snd-where", s.where));
        grid.appendChild(card);
      });
      box.appendChild(grid);
      lib.appendChild(box);
    });
  }

  /* =====================================================================
     BEHAVIOR — the principles under the calling
     ===================================================================== */
  const bList = document.getElementById("behaviorList");
  if(bList && typeof BEHAVIOR !== "undefined"){
    BEHAVIOR.forEach((b, i) => {
      const d = el("details","scenario");
      d.id = "beh-" + i;
      if(i === 0) d.open = true;
      const sum = el("summary");
      sum.appendChild(el("span","num", String(i+1).padStart(2,"0")));
      const head = el("div","s-head");
      head.appendChild(el("span","s-tag", b.tag));
      head.appendChild(el("h3", null, b.title));
      sum.appendChild(head);
      sum.appendChild(el("span","caret","›"));
      d.appendChild(sum);

      const body = el("div","s-body");
      body.appendChild(el("p","situation", b.summary));
      const inner = el("div","more-body");
      b.sections.forEach(sec => {
        const s = document.createElement("section");
        s.appendChild(el("h4", null, sec.h));
        s.appendChild(el("div", null, sec.body));
        inner.appendChild(s);
      });
      body.appendChild(inner);
      d.appendChild(body);
      bList.appendChild(d);
    });
  }

  /* stop audio with Escape */
  document.addEventListener("keydown", e => { if(e.key === "Escape") stopAudio(); });

  /* =====================================================================
     Topographic motif in the hero — drawn once
     ===================================================================== */
  const cv = document.getElementById("topo");
  if(cv && cv.getContext){
    const ctx = cv.getContext("2d");
    function draw(){
      const w = cv.clientWidth, h = cv.clientHeight;
      if(!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,w,h);
      const cx = w*0.86, cy = h*0.4, rings = 9;
      for(let i=0;i<rings;i++){
        const base = 30 + i*40;
        ctx.beginPath();
        for(let a=0;a<=Math.PI*2+0.001;a+=0.07){
          const r = base + Math.sin(a*3 + i*0.55)*10 + Math.sin(a*5 - i*0.9)*6 + Math.cos(a*2 + i*1.3)*8;
          const x = cx + Math.cos(a)*r*1.2, y = cy + Math.sin(a)*r;
          a===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = (i===4) ? "rgba(216,171,84,0.30)" : "rgba(233,238,224,0.09)";
        ctx.stroke();
      }
    }
    draw();
    let raf = null;
    window.addEventListener("resize", () => { if(raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); });
  }
})();

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
  if(["calls","tree","scenarios","sounds","behavior"].includes(startPanel)) showPanel(startPanel);

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
    card.dataset.text = (c.name + " " + c.meaning).toLowerCase();

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
        if(cl.when) row.appendChild(el("p","variant-when", cl.when));
        list.appendChild(row);
      });
      card.appendChild(list);
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

    card.appendChild(el("p","meaning", c.meaning));

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
      det.appendChild(el("summary", null, "Show the full lesson"));
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
      (c.lesson || []).forEach(sec => {
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

  const filterInput = document.getElementById("callFilter");
  const noResults = document.getElementById("noResults");
  function applyFilter(){
    const q = filterInput.value.trim().toLowerCase();
    let shown = 0;
    [...callGrid.children].forEach(card => {
      const show = (!q || card.dataset.text.includes(q)) &&
                   (activeVoice === "all" || card.dataset.voice === activeVoice || card.dataset.voice === "both");
      card.classList.toggle("hidden", !show);
      if(show) shown++;
    });
    noResults.classList.toggle("hidden", shown !== 0);
  }
  filterInput.addEventListener("input", applyFilter);
  applyFilter();

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

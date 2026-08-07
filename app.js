/* Renders the main guide from the shared data in data.js. */
(function(){
  const byId = Object.fromEntries(CALLS.map(c => [c.id, c]));
  const cvar = role => (ROLES[role] ? ROLES[role].var : "--neutral");
  const el = (tag, cls, html) => { const n = document.createElement(tag); if(cls) n.className = cls; if(html != null) n.innerHTML = html; return n; };
  const PLAY = '<svg class="play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  const WAVE = '<svg class="wave" viewBox="0 0 88 30" aria-hidden="true">'
    + '<rect x="2" y="11" width="4" height="8" rx="2"/><rect x="10" y="7" width="4" height="16" rx="2"/>'
    + '<rect x="18" y="3" width="4" height="24" rx="2"/><rect x="26" y="9" width="4" height="12" rx="2"/>'
    + '<rect x="34" y="1" width="4" height="28" rx="2"/><rect x="42" y="6" width="4" height="18" rx="2"/>'
    + '<rect x="50" y="2" width="4" height="26" rx="2"/><rect x="58" y="10" width="4" height="10" rx="2"/>'
    + '<rect x="66" y="5" width="4" height="20" rx="2"/><rect x="74" y="8" width="4" height="14" rx="2"/>'
    + '<rect x="82" y="11" width="4" height="8" rx="2"/></svg>';
  const isAudio = path => /\.(mp3|m4a|aac|wav|ogg)$/i.test(path || "");

  /* ---- State ---- */
  let activeRole = null;
  let activeVoice = "all";

  /* ---- Voice segmented control ---- */
  const seg = document.getElementById("voiceSeg");
  seg.addEventListener("click", (e) => {
    const btn = e.target.closest("button"); if(!btn) return;
    activeVoice = btn.dataset.voice;
    [...seg.children].forEach(x => x.setAttribute("aria-pressed", String(x === btn)));
    applyFilter();
  });

  /* ---- Legend / role filters ---- */
  const legend = document.getElementById("legend");
  Object.entries(ROLES).forEach(([role, meta]) => {
    const b = el("button","chip-btn");
    b.type = "button";
    b.style.setProperty("--c", `var(${meta.var})`);
    b.setAttribute("aria-pressed","false");
    b.dataset.role = role;
    b.title = meta.blurb;
    b.innerHTML = `<span class="dot"></span>${meta.label}`;
    b.addEventListener("click", () => {
      activeRole = (activeRole === role) ? null : role;
      [...legend.children].forEach(x => x.setAttribute("aria-pressed", String(x.dataset.role === activeRole)));
      applyFilter();
    });
    legend.appendChild(b);
  });

  /* ---- A clickable call pill (used for "pairs with" everywhere) ---- */
  function pairPill(pid){
    const t = byId[pid]; if(!t) return null;
    const chip = el("button","pair");
    chip.type = "button";
    chip.style.setProperty("--c", `var(${cvar(t.role)})`);
    chip.dataset.target = pid;
    chip.innerHTML = `<span class="dot"></span>${t.name}${t.clip ? PLAY : ""}`;
    chip.addEventListener("click", () => openCall(pid));
    return chip;
  }

  /* ---- Calls (the lexicon) ---- */
  const callGrid = document.getElementById("callGrid");
  CALLS.forEach(c => {
    const card = el("article","call");
    card.id = "call-" + c.id;
    card.style.setProperty("--c", `var(${cvar(c.role)})`);
    card.dataset.role = c.role;
    card.dataset.voice = c.voice;
    card.dataset.text = (c.name + " " + c.meaning).toLowerCase();

    const top = el("div","call-top");
    const nameBtn = el("button", "callname" + (c.clip ? " has-clip" : ""));
    nameBtn.type = "button";
    nameBtn.dataset.id = c.id;
    nameBtn.innerHTML = `<span>${c.name}</span>${c.clip ? PLAY : ""}`;
    nameBtn.title = c.clip ? "Play this call" : "Open this call";
    nameBtn.addEventListener("click", () => openCall(c.id));
    const nameWrap = el("h3");
    nameWrap.appendChild(nameBtn);
    if(c.flag){
      const t = (FLAG_TITLES[c.flag] || "").replace(/"/g,"&quot;");
      nameWrap.insertAdjacentHTML("beforeend", ` <span class="foundation" title="${t}">${c.flag}</span>`);
    }
    top.appendChild(nameWrap);
    top.appendChild(el("span","badge", ROLES[c.role].label));
    card.appendChild(top);

    card.appendChild(el("p","meaning", c.meaning));

    if (c.pairs && c.pairs.length){
      card.appendChild(el("div","pairs-label","Pairs with"));
      const wrap = el("div","pairs");
      c.pairs.forEach(pid => { const p = pairPill(pid); if(p) wrap.appendChild(p); });
      card.appendChild(wrap);
    }
    callGrid.appendChild(card);
  });

  /* ---- Filtering ---- */
  const filterInput = document.getElementById("callFilter");
  const noResults = document.getElementById("noResults");
  function applyFilter(){
    const q = filterInput.value.trim().toLowerCase();
    let shown = 0;
    [...callGrid.children].forEach(card => {
      const okText  = !q || card.dataset.text.includes(q);
      const okRole  = !activeRole || card.dataset.role === activeRole;
      const okVoice = activeVoice === "all" || card.dataset.voice === activeVoice;
      const show = okText && okRole && okVoice;
      card.classList.toggle("hidden", !show);
      if(show) shown++;
    });
    noResults.classList.toggle("hidden", shown !== 0);
  }
  filterInput.addEventListener("input", applyFilter);

  /* ---- Scenarios ---- */
  const list = document.getElementById("scenarioList");
  SCENARIOS.forEach((s, i) => {
    const d = el("details","scenario");
    if(i === 0) d.open = true;

    const sum = el("summary");
    sum.appendChild(el("span","num", String(i+1).padStart(2,"0")));
    const head = el("div","s-head");
    head.appendChild(el("span","s-tag label", s.tag));
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
        chip = el("span","call-chip static"); chip.style.setProperty("--c","var(--neutral)");
        chip.innerHTML = `<span class="dot"></span>Go quiet &amp; set up`;
      } else if(st.call === "tip"){
        chip = el("span","call-chip static"); chip.style.setProperty("--c","var(--pine)");
        chip.innerHTML = `<span class="dot"></span>Keep it simple`;
      } else {
        const c = byId[st.call];
        chip = el("button","call-chip"); chip.type = "button";
        chip.style.setProperty("--c", `var(${cvar(c.role)})`);
        chip.innerHTML = `<span class="dot"></span>${c.name}${c.clip ? PLAY : ""}`;
        chip.title = c.clip ? "Play this call" : "Open this call";
        chip.addEventListener("click", () => openCall(st.call));
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

  applyFilter();

  /* =======================================================================
     CALL MODAL — click any call name to see its meaning, clip, and pairings
     ======================================================================= */
  const modal      = document.getElementById("callModal");
  const mName      = document.getElementById("modalName");
  const mBadges    = document.getElementById("modalBadges");
  const mMedia     = document.getElementById("modalVideo");
  const mMeaning   = document.getElementById("modalMeaning");
  const mPairsWrap = document.getElementById("modalPairsWrap");
  const mPairs     = document.getElementById("modalPairs");
  let lastFocus = null;

  const FALLBACK = "This clip plays on the live site (and from the repo) &mdash; the preview can&rsquo;t load media files.";

  function openCall(id){
    const c = byId[id]; if(!c || !modal) return;
    lastFocus = document.activeElement;

    mName.textContent = c.name;
    modal.style.setProperty("--c", `var(${cvar(c.role)})`);

    mBadges.innerHTML = "";
    const rb = el("span","badge", ROLES[c.role].label);
    rb.style.setProperty("--c", `var(${cvar(c.role)})`);
    mBadges.appendChild(rb);
    mBadges.appendChild(el("span","voice-pill", c.voice === "bull" ? "Bull" : "Cow"));
    if(c.flag){
      const t = (FLAG_TITLES[c.flag] || "").replace(/"/g,"&quot;");
      mBadges.insertAdjacentHTML("beforeend", ` <span class="foundation" title="${t}">${c.flag}</span>`);
    }

    // Media: audio player, video player, or a friendly placeholder
    mMedia.innerHTML = "";
    if(c.clip){
      const fb = el("div","vid-note", FALLBACK); fb.style.display = "none";
      if(isAudio(c.clip)){
        const box = el("div","clip-audio", WAVE);
        const a = document.createElement("audio");
        a.controls = true; a.preload = "metadata"; a.src = c.clip;
        a.addEventListener("error", () => { box.style.display = "none"; fb.style.display = "block"; });
        box.appendChild(a);
        mMedia.appendChild(box);
      } else {
        const box = el("div","clip-video");
        const v = document.createElement("video");
        v.controls = true; v.playsInline = true; v.preload = "metadata"; v.setAttribute("controlslist","nodownload");
        const src = document.createElement("source"); src.src = c.clip; src.type = "video/mp4";
        v.appendChild(src);
        const onErr = () => { box.style.display = "none"; fb.style.display = "block"; };
        v.addEventListener("error", onErr); src.addEventListener("error", onErr);
        box.appendChild(v);
        mMedia.appendChild(box);
      }
      mMedia.appendChild(fb);
    } else {
      mMedia.appendChild(el("div","vid-empty", `${PLAY}<span>Clip coming soon &mdash; being uploaded.</span>`));
    }

    mMeaning.innerHTML = c.meaning;

    mPairs.innerHTML = "";
    if(c.pairs && c.pairs.length){
      c.pairs.forEach(pid => { const p = pairPill(pid); if(p) mPairs.appendChild(p); });
      mPairsWrap.style.display = "";
    } else {
      mPairsWrap.style.display = "none";
    }

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("open"));
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".modal-close");
    if(closeBtn) closeBtn.focus();
  }

  function closeModal(){
    if(!modal || modal.hidden) return;
    mMedia.querySelectorAll("video,audio").forEach(m => { try { m.pause(); } catch(e){} });
    modal.classList.remove("open");
    modal.hidden = true;
    mMedia.innerHTML = "";
    document.body.style.overflow = "";
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if(modal){
    modal.addEventListener("click", (e) => { if(e.target.hasAttribute("data-close")) closeModal(); });
    document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });
  }

  /* ---- Topographic contour motif — drawn once (static) ---- */
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
      const cx = w*0.83, cy = h*0.34, rings = 11;
      for(let i=0;i<rings;i++){
        const base = 34 + i*44;
        ctx.beginPath();
        for(let a=0;a<=Math.PI*2+0.001;a+=0.07){
          const r = base + Math.sin(a*3 + i*0.55)*11 + Math.sin(a*5 - i*0.9)*6 + Math.cos(a*2 + i*1.3)*9;
          const x = cx + Math.cos(a)*r*1.18, y = cy + Math.sin(a)*r;
          a===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = (i===4) ? "rgba(216,171,84,0.34)" : "rgba(233,238,224,0.10)";
        ctx.stroke();
      }
    }
    draw();
    let raf = null;
    window.addEventListener("resize", () => { if(raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); });
  }
})();

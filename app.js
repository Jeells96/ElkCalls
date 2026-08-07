/* Renders the main guide from the shared data in data.js. */
(function(){
  const byId = Object.fromEntries(CALLS.map(c => [c.id, c]));
  const cvar = role => (ROLES[role] ? ROLES[role].var : "--neutral");
  const el = (tag, cls, html) => { const n = document.createElement(tag); if(cls) n.className = cls; if(html != null) n.innerHTML = html; return n; };

  /* ---- Principles ---- */
  const pGrid = document.getElementById("principleGrid");
  PRINCIPLES.forEach((p, i) => {
    const c = el("div","principle");
    c.appendChild(el("div","pn", String(i+1).padStart(2,"0")));
    c.appendChild(el("h3", null, p.t));
    c.appendChild(el("p", null, p.d));
    pGrid.appendChild(c);
  });

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

  /* ---- Calls ---- */
  const callGrid = document.getElementById("callGrid");
  CALLS.forEach(c => {
    const card = el("article","call");
    card.id = "call-" + c.id;
    card.style.setProperty("--c", `var(${cvar(c.role)})`);
    card.dataset.role = c.role;
    card.dataset.voice = c.voice;
    card.dataset.text = (c.name + " " + c.meaning).toLowerCase();

    const top = el("div","call-top");
    let title = c.name;
    if(c.flag){
      const t = (FLAG_TITLES[c.flag] || "").replace(/"/g,"&quot;");
      title += ` <span class="foundation" title="${t}">${c.flag}</span>`;
    }
    top.appendChild(el("h3", null, title));
    top.appendChild(el("span","badge", ROLES[c.role].label));
    card.appendChild(top);

    card.appendChild(el("p","meaning", c.meaning));

    if (c.pairs && c.pairs.length){
      card.appendChild(el("div","pairs-label","Pairs with"));
      const wrap = el("div","pairs");
      c.pairs.forEach(pid => {
        const t = byId[pid]; if(!t) return;
        const chip = el("button","pair");
        chip.type = "button";
        chip.style.setProperty("--c", `var(${cvar(t.role)})`);
        chip.dataset.target = pid;
        chip.innerHTML = `<span class="dot"></span>${t.name}`;
        chip.addEventListener("click", () => focusCall(pid));
        wrap.appendChild(chip);
      });
      card.appendChild(wrap);
    }
    callGrid.appendChild(card);
  });

  function focusCall(id){
    document.getElementById("callFilter").value = "";
    activeRole = null; activeVoice = "all";
    [...legend.children].forEach(x => x.setAttribute("aria-pressed","false"));
    [...seg.children].forEach(x => x.setAttribute("aria-pressed", String(x.dataset.voice === "all")));
    applyFilter();
    const node = document.getElementById("call-" + id);
    if(!node) return;
    node.scrollIntoView({behavior:"smooth", block:"center"});
    node.classList.remove("flash"); void node.offsetWidth; node.classList.add("flash");
  }

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
        chip.innerHTML = `<span class="dot"></span>${c.name}`;
        chip.title = "Jump to this call";
        chip.addEventListener("click", () => { document.getElementById("calls").scrollIntoView({behavior:"smooth"}); setTimeout(()=>focusCall(st.call), 350); });
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

/* Renders the compact, print-first field card from the shared data in data.js. */
(function(){
  const byId = Object.fromEntries(CALLS.map(c => [c.id, c]));
  const cvar = role => (ROLES[role] ? ROLES[role].var : "--neutral");
  const el = (tag, cls, html) => { const n = document.createElement(tag); if(cls) n.className = cls; if(html != null) n.innerHTML = html; return n; };

  /* ---- Calls, grouped by voice ---- */
  const callsHost = document.getElementById("cheatCalls");
  const groups = [
    { voice:"cow",  title:"Cow calls" },
    { voice:"bull", title:"Bull sounds" },
  ];
  groups.forEach(g => {
    callsHost.appendChild(el("div","voice-title", g.title));
    const col = el("div","calls");
    CALLS.filter(c => c.voice === g.voice).forEach(c => {
      const item = el("div","call");
      item.style.setProperty("--c", `var(${cvar(c.role)})`);
      const pairs = (c.pairs || []).map(pid => byId[pid] && byId[pid].name).filter(Boolean).join(", ");
      item.innerHTML =
        `<div><span class="nm">${c.name}</span><span class="jb">${ROLES[c.role].label}</span></div>` +
        `<div class="ms">${c.short || c.meaning}</div>` +
        (pairs ? `<div class="pr"><b>pairs</b> ${pairs}</div>` : "");
      col.appendChild(item);
    });
    callsHost.appendChild(col);
  });

  /* ---- Scenarios, one compact line each ---- */
  const scnHost = document.getElementById("cheatScenarios");
  SCENARIOS.forEach((s, i) => {
    const seq = s.steps.map(st => {
      if(st.call === "silence") return "go quiet";
      if(st.call === "tip") return null;
      return byId[st.call] ? byId[st.call].name : null;
    }).filter(Boolean);

    const sc = el("div","scenario");
    sc.innerHTML =
      `<div><span class="st">${String(i+1).padStart(2,"0")}. ${s.title}</span><span class="tg">${s.tag}</span></div>` +
      `<div class="seq">${seq.join('<span class="arrow">→</span>')}</div>` +
      (s.cue ? `<div class="cue"><b>cue</b> ${s.cue}</div>` : "") +
      (s.setup && !s.cue ? `<div class="cue"><b>setup</b> ${s.setup}</div>` : "");
    scnHost.appendChild(sc);
  });

  /* ---- Rules (principle titles) ---- */
  const rulesHost = document.getElementById("cheatRules");
  PRINCIPLES.forEach(p => rulesHost.appendChild(el("span","r", p.t)));

  /* ---- Footer ---- */
  document.getElementById("cheatFoot").textContent =
    "Cow calls from the Understanding Cow-Elk Vocalizations series; bull sounds carry the same approach over to widely-taught elk behavior. Filter, cross-reference, and full definitions in the web guide.";

  /* ---- Print ---- */
  const btn = document.getElementById("printBtn");
  if(btn) btn.addEventListener("click", () => window.print());
})();

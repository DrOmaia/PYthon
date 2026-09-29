/* Py30 core: storage, profile, personalization, theme, navigation */
(function () {
  const KEY = "py30.v1";
  const blank = () => ({ profile: null, days: {}, cards: {}, streak: { last: null, count: 0 }, theme: null, code: {}, notes: {} });

  function load() {
    try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return blank(); }
  }
  let state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  const today = () => new Date().toISOString().slice(0, 10);
  const addDays = (iso, n) => { const d = new Date(iso + "T00:00:00"); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

  function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  // Personalization: {{name}}, {{g:male|female}}
  function T(str) {
    if (str == null) return "";
    const p = state.profile || {};
    const name = (p.name || "Student").trim();
    return String(str)
      .replace(/\{\{name\}\}/g, name)
      .replace(/\{\{g:([^|}]*)\|([^}]*)\}\}/g, (m, a, b) => (p.gender === "f" ? b : a));
  }

  function day(n) {
    if (!state.days[n]) state.days[n] = { ex: {}, quiz: null, puzzle: false, done: false, visited: false, parsons: {}, predict: {} };
    return state.days[n];
  }

  function touchStreak() {
    const t = today(), s = state.streak;
    if (s.last === t) return;
    s.count = s.last === addDays(t, -1) ? s.count + 1 : 1;
    s.last = t;
    save();
  }

  // Spaced repetition (Leitner): box 1..5, intervals in days
  const INTERVALS = [0, 1, 2, 4, 8, 16];
  function addCards(dayN, cards) {
    (cards || []).forEach((c, i) => {
      const id = dayN + ":" + i;
      if (!state.cards[id]) state.cards[id] = { box: 1, due: addDays(today(), 1) };
    });
    save();
  }
  function dueCards() {
    const t = today();
    return Object.entries(state.cards).filter(([, v]) => v.due <= t).map(([k]) => k);
  }
  function gradeCard(id, knew) {
    const c = state.cards[id]; if (!c) return;
    c.box = knew ? Math.min(5, c.box + 1) : 1;
    c.due = addDays(today(), INTERVALS[c.box]);
    save();
  }

  // Theme
  function applyTheme() {
    const th = state.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", th);
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    state.theme = cur === "dark" ? "light" : "dark"; save(); applyTheme();
  }
  applyTheme();

  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2400);
  }

  // Top bar
  function renderTopbar(active) {
    const bar = document.createElement("header");
    bar.className = "topbar no-print";
    const due = dueCards().length;
    const av = (state.profile && state.profile.avatar) || "🐍";
    bar.innerHTML = `<div class="wrap">
      <a class="logo" href="index.html" aria-label="Py30 home"><span class="mark">py</span>Py30</a>
      <nav class="nav" aria-label="Main">
        <a href="index.html" class="${active === "home" ? "active" : ""}">Journey</a>
        <a href="review.html" class="${active === "review" ? "active" : ""}">Review${due ? `<span class="badge">${due}</span>` : ""}</a>
        <a href="playground.html" class="hide-sm ${active === "playground" ? "active" : ""}">Playground</a>
        <a href="glossary.html" class="hide-sm ${active === "glossary" ? "active" : ""}">Glossary</a>
        <a href="notes.html" class="hide-sm ${active === "notes" ? "active" : ""}">Notes</a>
        <button type="button" id="themeBtn" aria-label="Toggle dark mode" title="Dark / light">◐</button>
        <button type="button" class="avatar-btn" id="profileBtn" aria-label="Edit profile" title="Your profile">${esc(av)}</button>
      </nav></div>`;
    document.body.prepend(bar);
    bar.querySelector("#themeBtn").onclick = toggleTheme;
    bar.querySelector("#profileBtn").onclick = () => welcome(true);
  }

  const REPO_URL = "https://github.com/dromaia/PYthon";
  const STAR_SVG = '<svg aria-hidden="true" viewBox="0 0 16 16" width="15" height="15"><path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>';

  function renderFooter() {
    const f = document.createElement("footer");
    f.className = "footer";
    f.innerHTML = `<div class="wrap">Python runs right in your browser. Your progress is saved in this browser only. <a href="setup.html">Setup &amp; help</a> <a class="gh-star" href="${REPO_URL}" target="_blank" rel="noopener" aria-label="Star Py30 on GitHub (opens in a new tab)">${STAR_SVG}Star on GitHub</a></div>`;
    document.body.appendChild(f);
  }

  const AVATARS = ["🐍", "🌸", "🚀", "🦊", "🐱", "🎧", "🦄", "🐼", "🌙", "⚡", "🎮", "🧠"];
  const GOALS = [
    ["courses", "Do great in my university courses"],
    ["projects", "Build my own programs and games"],
    ["ai", "Get into AI and data"],
    ["career", "Prepare for a tech career"],
  ];

  function welcome(editing) {
    const p = state.profile || { name: "", gender: "", avatar: "🐍", goal: "courses" };
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="wTitle">
      <h2 id="wTitle">${editing ? "Your profile" : "Welcome to Py30"}</h2>
      <p class="muted">${editing ? "Change how Py30 talks to you." : "30 days, about 2 hours a day, from zero to real Python — including a first taste of AI. First, tell us who you are. You will be the hero of every lesson."}</p>
      <p class="ar muted">أهلًا بك! اكتب اسمك وسيصبح جزءًا من الدروس والأمثلة والتحديات.</p>
      <div class="field"><label for="wName">Your first name</label><input id="wName" maxlength="24" autocomplete="given-name" value="${esc(p.name)}" placeholder="e.g. Sara"></div>
      <div class="field"><label>How should Arabic hints address you?</label>
        <div class="seg" id="wGender"><button type="button" data-v="m">طالب — he</button><button type="button" data-v="f">طالبة — she</button></div></div>
      <div class="field"><label>Pick your avatar</label><div class="avatars" id="wAv">${AVATARS.map(a => `<button type="button" data-v="${a}" aria-label="avatar ${a}">${a}</button>`).join("")}</div></div>
      <div class="field"><label for="wGoal">Your main goal</label><select id="wGoal">${GOALS.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></div>
      <p id="wErr" class="t-fail" style="display:none"></p>
      <div style="display:flex;gap:8px;margin-top:16px">
        <button class="btn btn-primary" id="wSave" type="button">${editing ? "Save profile" : "Start my journey"}</button>
        ${editing ? `<button class="btn btn-ghost" id="wCancel" type="button">Cancel</button>` : ""}
      </div></div>`;
    document.body.appendChild(bg);
    let gender = p.gender, avatar = p.avatar;
    const setOn = (wrap, v) => wrap.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.v === v));
    const gW = bg.querySelector("#wGender"), aW = bg.querySelector("#wAv");
    setOn(gW, gender); setOn(aW, avatar);
    bg.querySelector("#wGoal").value = p.goal || "courses";
    gW.onclick = e => { const b = e.target.closest("button"); if (b) { gender = b.dataset.v; setOn(gW, gender); } };
    aW.onclick = e => { const b = e.target.closest("button"); if (b) { avatar = b.dataset.v; setOn(aW, avatar); } };
    const cancel = bg.querySelector("#wCancel"); if (cancel) cancel.onclick = () => bg.remove();
    bg.querySelector("#wName").focus();
    bg.querySelector("#wSave").onclick = () => {
      const name = bg.querySelector("#wName").value.trim().replace(/["'\\{}]/g, "");
      const err = bg.querySelector("#wErr");
      if (!name) { err.textContent = "Please write your name."; err.style.display = "block"; return; }
      if (!gender) { err.textContent = "Please choose طالب or طالبة."; err.style.display = "block"; return; }
      state.profile = { name, gender, avatar, goal: bg.querySelector("#wGoal").value, started: (state.profile && state.profile.started) || today() };
      save();
      location.reload();
    };
  }

  function requireProfile() { if (!state.profile) welcome(false); }

  window.Py30 = {
    get state() { return state; }, save, esc, T, day, today, addDays,
    REPO_URL, STAR_SVG, touchStreak, addCards, dueCards, gradeCard, toast, renderTopbar, renderFooter, welcome, requireProfile, toggleTheme,
    reset() { if (confirm("Delete all your progress, code and notes in this browser?")) { localStorage.removeItem(KEY); location.href = "index.html"; } },
    exportData() { return JSON.stringify(state, null, 2); },
    importData(txt) { state = Object.assign(blank(), JSON.parse(txt)); save(); },
  };
})();

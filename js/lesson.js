/* Py30 lesson renderer */
(function () {
  const { h, md, CodeBox, Parsons, Predict, Quiz, Puzzle } = PyUI;
  const esc = Py30.esc, T = Py30.T;
  const n = Math.max(1, Math.min(30, parseInt(new URLSearchParams(location.search).get("day") || "1", 10)));
  const meta = CURRICULUM.days.find(x => x.d === n);
  const main = document.getElementById("main");

  if (!meta.ready) {
    main.innerHTML = `<div class="wrap narrow lesson-hero"><h1>Day ${n} is coming soon</h1><p>${esc(meta.title)}</p><p><a class="btn btn-primary" href="index.html">Back to your journey</a></p></div>`;
    return;
  }
  const s = document.createElement("script");
  s.src = `js/days/day${String(n).padStart(2, "0")}.js`;
  s.onload = () => render(window.DAYS[n]);
  s.onerror = () => { main.innerHTML = `<div class="wrap narrow lesson-hero"><h1>Could not load Day ${n}</h1><p>The lesson file is missing. Check that the whole Py30 folder was unzipped.</p></div>`; };
  document.head.appendChild(s);

  function block(item, key) {
    switch (item.t) {
      case "p": return h(`<div>${T(item.html)}</div>`);
      case "h": return h(`<h3 style="margin-top:22px">${esc(T(item.text))}</h3>`);
      case "ar": return h(`<div class="callout hint-ar"><div class="ar">💡 ${T(item.html)}</div></div>`);
      case "tip": return h(`<div class="callout tip"><div class="ttl">⚡ Pro tip: ${esc(T(item.title || ""))}</div><div>${T(item.html)}</div>${item.code ? `<pre class="code-static">${esc(T(item.code))}</pre>` : ""}${item.ar ? `<div class="ar" style="margin-top:6px">${T(item.ar)}</div>` : ""}</div>`);
      case "analogy": return h(`<div class="callout"><div class="ttl">🎯 ${esc(T(item.title || "Think of it like this"))}</div><div>${T(item.html)}</div></div>`);
      case "static": return h(`<pre class="code-static">${esc(T(item.code))}</pre>`);
      case "table": return h(`<div style="overflow-x:auto;margin:12px 0"><table class="gl"><tr>${item.head.map(c => `<th>${md(c)}</th>`).join("")}</tr>${item.rows.map(r => `<tr>${r.map(c => `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</table></div>`);
      case "code": case "viz": {
        const wrap = document.createElement("div");
        if (item.before) wrap.appendChild(h(`<div>${T(item.before)}</div>`));
        wrap.appendChild(CodeBox({ id: `d${n}-${key}`, code: item.code, stdin: item.stdin, title: item.title, persist: false, noViz: item.noViz }));
        if (item.t === "viz") wrap.appendChild(h(`<p class="muted" style="font-size:.9rem">👆 Press <b>Visualize</b> and use Next ▶ to watch Python run this one line at a time.</p>`));
        if (item.note) wrap.appendChild(h(`<div>${T(item.note)}</div>`));
        return wrap;
      }
      case "try": {
        const wrap = h(`<div class="callout"><div class="ttl">🛠 Your turn: ${esc(T(item.title || "Experiment"))}</div><div>${T(item.html)}</div></div>`);
        wrap.appendChild(CodeBox({ id: `d${n}-${key}`, code: item.code, stdin: item.stdin, persist: true }));
        return wrap;
      }
      case "mistake": return mistake(item);
      case "predict": return Predict(Object.assign({ id: key }, item), n);
      case "parsons": return Parsons(Object.assign({ id: key }, item), n);
      default: return h(`<div></div>`);
    }
  }

  function mistake(m) {
    return h(`<div class="callout mistake"><div class="ttl">🚫 ${esc(T(m.title))}</div>${m.html ? `<div>${T(m.html)}</div>` : ""}
      <div class="two-col" style="margin-top:8px"><div><span class="label-wrong">✗ Wrong</span><pre class="code-static">${esc(T(m.wrong))}</pre></div><div><span class="label-right">✓ Right</span><pre class="code-static">${esc(T(m.right))}</pre></div></div>
      ${m.ar ? `<div class="ar">${T(m.ar)}</div>` : ""}</div>`);
  }

  function exercise(ex, idx) {
    const d = Py30.day(n);
    const solved = () => !!d.ex[ex.id];
    const lvl = { seed: ["lvl-seed", "🌱 Very easy"], star: ["lvl-star", "⭐ Easy"], fire: ["lvl-fire", "🔥 Challenge"] }[ex.lvl];
    const el = h(`<article class="exercise ${solved() ? "solved" : ""}" id="ex-${ex.id}">
      <div class="ex-head"><span class="chip ${lvl[0]}">${lvl[1]}</span>${ex.debug ? `<span class="chip">🐞 Debug challenge</span>` : ""}<h3>${esc(T(ex.title))}</h3>
      <span class="chip ok solved-mark" ${solved() ? "" : "hidden"}>✓ Solved</span></div>
      <div>${T(ex.prompt)}</div></article>`);
    if (ex.hint || ex.ar) el.appendChild(h(`<details class="fold"><summary>Hint</summary><div class="fold-body">${ex.hint ? `<p>${T(ex.hint)}</p>` : ""}${ex.ar ? `<p class="ar">${T(ex.ar)}</p>` : ""}</div></details>`));
    const twist = h(`<div></div>`);
    const box = CodeBox({
      id: `d${n}-ex-${ex.id}`, code: ex.starter || "", tests: ex.tests, persist: true, title: `exercise_${idx + 1}.py`,
      onPass: () => {
        d.ex[ex.id] = true; Py30.save();
        el.classList.add("solved"); el.querySelector(".solved-mark").hidden = false;
        if (ex.twist) twist.innerHTML = `<div class="callout tip"><div class="ttl">🔁 Lock it in: solve it another way</div><div>${T(ex.twist)}</div></div>`;
      },
    });
    el.appendChild(box);
    el.appendChild(twist);
    if (ex.solutions && ex.solutions.length) {
      const f = h(`<details class="fold"><summary>${ex.solutions.length > 1 ? `Solutions — ${ex.solutions.length} different ways` : "Solution"} (try first!)</summary><div class="fold-body"><div class="sol-tabs"></div><div class="sol-body"></div></div></details>`);
      const tabs = f.querySelector(".sol-tabs"), body = f.querySelector(".sol-body");
      const show = k => {
        tabs.querySelectorAll("button").forEach((b, j) => b.classList.toggle("on", j === k));
        const sol = ex.solutions[k];
        body.innerHTML = "";
        body.appendChild(h(`<p>${T(sol.note || "")}</p>`));
        body.appendChild(CodeBox({ id: `sol-${n}-${ex.id}-${k}`, code: sol.code, stdin: ex.tests && ex.tests[0] && ex.tests[0].stdin, title: sol.name, persist: false }));
      };
      ex.solutions.forEach((sol, k) => { const b = h(`<button type="button">${esc(sol.name)}</button>`); b.onclick = () => show(k); tabs.appendChild(b); });
      f.addEventListener("toggle", () => { if (f.open && !body.innerHTML) show(0); });
      el.appendChild(f);
    }
    return el;
  }

  function section(id, num, title, sub) {
    const s = h(`<section class="section" id="${id}"><h2>${num ? `<span class="num">${esc(num)}</span>` : ""}${esc(title)}</h2>${sub ? `<p class="muted">${sub}</p>` : ""}</section>`);
    return s;
  }

  function render(D) {
    const d = Py30.day(n);
    d.visited = true; Py30.save();
    if (D.cards) Py30.addCards(n, D.cards);
    document.title = `Day ${n}: ${meta.title} — Py30`;
    const week = CURRICULUM.weeks.find(w => w.n === meta.w);
    const wrap = h(`<div class="wrap narrow"></div>`);
    const isRest = meta.type === "rest";
    const plan = isRest ? "" : meta.type === "project" ? `<nav class="plan" aria-label="Today's 2-hour plan">
        <a href="#learn"><div class="mins">15m</div><div class="what">Plan</div></a>
        <a href="#solve"><div class="mins">85m</div><div class="what">Build milestones</div></a>
        <a href="#extra"><div class="mins">20m</div><div class="what">Make it yours</div></a>
        <a href="#notes"><div class="mins">—</div><div class="what">Reflect</div></a>
        <a href="#finish"><div class="mins">🎓</div><div class="what">${n === 30 ? "Certificate" : "Finish"}</div></a></nav>` : `<nav class="plan" aria-label="Today's 2-hour plan">
        <a href="#learn"><div class="mins">20m</div><div class="what">Learn</div></a>
        <a href="#practice"><div class="mins">40m</div><div class="what">Guided practice</div></a>
        <a href="#solve"><div class="mins">30m</div><div class="what">Solve problems</div></a>
        <a href="#quiz"><div class="mins">15m</div><div class="what">Quiz</div></a>
        <a href="#puzzle"><div class="mins">15m</div><div class="what">Puzzle</div></a></nav>`;
    wrap.appendChild(h(`<div class="lesson-hero">
      <div class="meta"><span class="chip">Day ${n} of 30</span><span class="chip">${esc(week.title)}</span>${meta.type === "review" ? `<span class="chip">★ Review + project</span>` : ""}${meta.type === "project" ? `<span class="chip">🎓 Capstone</span>` : ""}</div>
      <h1>${esc(T(D.title || meta.title))}</h1>
      <p style="font-size:1.12rem">${T(D.intro || "")}</p>
      ${D.introAr ? `<div class="callout hint-ar"><div class="ar">${T(D.introAr)}</div></div>` : ""}
      ${D.goals ? `<div class="panel" style="padding:16px 20px"><b>By the end of today you can:</b><ul class="objectives">${D.goals.map(g => `<li>${md(g)}</li>`).join("")}</ul></div>` : ""}
      ${plan}</div>`));

    if (D.learn) {
      const s = section("learn", isRest ? "" : "20 min", isRest ? "Today" : "Learn", "");
      D.learn.forEach((it, k) => s.appendChild(block(it, "l" + k)));
      if (D.mistakes && D.mistakes.length) { s.appendChild(h(`<h3 style="margin-top:26px">Common mistakes</h3>`)); D.mistakes.forEach(m => s.appendChild(mistake(m))); }
      if (D.tricks && D.tricks.length) { s.appendChild(h(`<h3 style="margin-top:26px">Tricks worth knowing</h3>`)); D.tricks.forEach(t => s.appendChild(block(Object.assign({ t: "tip" }, t)))); }
      wrap.appendChild(s);
    }
    if (D.practice) {
      const s = section("practice", "40 min", "Guided practice", "Change the code, run it, predict, visualize. Breaking things on purpose is part of learning.");
      D.practice.forEach((it, k) => s.appendChild(block(it, "p" + k)));
      wrap.appendChild(s);
    }
    if (D.exercises && D.tracks) {
      const s = section("solve", "", "Build your project", "Pick one project. Its milestones appear below; each has automatic checks. You can switch projects at any time — your code for each one is saved.");
      const st = Py30.state;
      const picker = h(`<div class="seg" role="group" aria-label="Choose your capstone project" style="margin:10px 0 6px">${D.tracks.map(t => `<button type="button" data-t="${t.id}">${t.emoji} ${esc(t.name)}</button>`).join("")}</div>`);
      const descEl = h(`<p class="muted"></p>`);
      s.appendChild(picker); s.appendChild(descEl);
      const nodes = D.exercises.map((ex, k) => { const n = exercise(ex, k); n.dataset.track = ex.track; s.appendChild(n); return n; });
      const empty = h(`<div class="callout"><p>Choose a project above to see its milestones.</p></div>`);
      s.appendChild(empty);
      const show = id => {
        picker.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.t === id));
        nodes.forEach(n => n.hidden = n.dataset.track !== id);
        const t = D.tracks.find(x => x.id === id);
        descEl.innerHTML = t ? T(t.desc) : "";
        empty.hidden = !!t;
      };
      picker.onclick = e => { const b = e.target.closest("button"); if (!b) return; st.capstone = b.dataset.t; Py30.save(); show(b.dataset.t); };
      show(st.capstone);
      wrap.appendChild(s);
    } else if (D.exercises) {
      const s = section("solve", "30 min", meta.type === "review" ? "Project and review problems" : "Solve problems", "Start with 🌱, then ⭐, then 🔥. Press <b>Check</b> to test your code automatically. Every problem has several solutions — compare them after you solve it.");
      D.exercises.forEach((ex, k) => s.appendChild(exercise(ex, k)));
      wrap.appendChild(s);
    }
    if (D.quiz) {
      const s = section("quiz", "15 min", "Quiz", "");
      s.appendChild(Quiz(D.quiz, n));
      wrap.appendChild(s);
    }
    if (D.puzzle) {
      const s = section("puzzle", "15 min", "Puzzle of the day", "");
      s.appendChild(Puzzle(D.puzzle, n));
      wrap.appendChild(s);
    }
    if (D.extra) {
      const s = section("extra", "", D.extraTitle || "Bonus", "");
      D.extra.forEach((it, k) => s.appendChild(block(it, "x" + k)));
      wrap.appendChild(s);
    }
    if (D.cards) {
      const s = section("cards", "", "Review cards", "");
      s.appendChild(h(`<div><p>${D.cards.length} cards from today were added to your review deck. They will come back tomorrow, then after 2, 4, 8 and 16 days — right before you would forget them.</p>
        <ul>${D.cards.map(c => `<li>${md(c.f)}</li>`).join("")}</ul><a class="btn btn-soft" href="review.html">Open the review deck</a></div>`));
      wrap.appendChild(s);
    }
    // Notes
    const ns = section("notes", "", "My notes", "Write today's key ideas in your own words. Writing it yourself is how it sticks.");
    const ta = h(`<div class="notes"><textarea aria-label="My notes for this day" placeholder="What did I learn today? What confused me? A trick I want to remember…"></textarea><p class="muted" style="font-size:.85rem">Saved automatically. All notes are on the <a href="notes.html">Notes page</a>.</p></div>`);
    const t = ta.querySelector("textarea"); t.value = Py30.state.notes[n] || "";
    t.oninput = () => { Py30.state.notes[n] = t.value; Py30.save(); };
    ns.appendChild(ta); wrap.appendChild(ns);

    // Finish
    const fs = section("finish", "", "Finish the day", "");
    const myEx = (D.exercises || []).filter(e => !D.tracks || e.track === Py30.state.capstone);
    const total = myEx.length, solvedN = Object.keys(d.ex).filter(k => myEx.some(e => e.id === k)).length;
    const next = CURRICULUM.days.find(x => x.d === n + 1);
    const fin = h(`<div class="panel"><p>${total ? `Problems solved: <b>${solvedN} / ${total}</b>` : "Rest well — a short review today makes next week easier."}${D.quiz ? ` · Quiz: <b>${d.quiz ? d.quiz.score + " / " + d.quiz.total : "not taken"}</b>` : ""}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary" type="button">${d.done ? "✓ Day completed" : "Mark Day " + n + " as complete"}</button>
      ${next ? `<a class="btn btn-soft" href="lesson.html?day=${n + 1}">Go to Day ${n + 1}</a>` : `<a class="btn btn-soft" href="certificate.html">🎓 My certificate</a>`}<a class="btn btn-ghost" href="index.html">Journey map</a></div>
      <p class="ar muted" style="margin-top:10px"></p></div>`);
    fin.querySelector("button").onclick = (e) => {
      d.done = true; Py30.touchStreak(); Py30.save();
      e.target.textContent = "✓ Day completed";
      fin.querySelector(".ar").textContent = T("{{g:أحسنت|أحسنتِ}} يا {{name}}! يوم " + n + " انتهى. الاستمرارية أهم من السرعة 🌸");
      Py30.toast(T("Day " + n + " complete. See you tomorrow, {{name}}!"));
    };
    if (total && solvedN < total && !d.done) fin.insertBefore(h(`<p class="muted" style="font-size:.9rem">Tip: try to solve at least the 🌱 and ⭐ problems before marking the day complete.</p>`), fin.children[1]);
    fs.appendChild(fin); wrap.appendChild(fs);

    main.innerHTML = ""; main.appendChild(wrap);
    if (location.hash) { const tgt = document.querySelector(location.hash); if (tgt) tgt.scrollIntoView(); }
    PyRunner.warmup().catch(() => {});
  }
})();

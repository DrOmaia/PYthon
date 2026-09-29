/* Py30 components */
(function () {
  const esc = s => Py30.esc(s), T = s => Py30.T(s);

  // tiny markdown for short strings: `code`, **bold**
  function md(s) {
    return esc(T(s)).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
  }
  function h(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; }

  // ---------- Runner status line ----------
  function statusText(s) {
    return s === "loading" ? "Waking up Python (the very first visit downloads it, about 10 MB)…" : "";
  }

  // ---------- Output rendering ----------
  function renderSegs(segs) {
    return segs.map(([k, s]) => k === "out" ? esc(s) : k === "prompt" ? `<span class="o-prompt">${esc(s)}</span>` : `<span class="o-in">${esc(s)}</span>`).join("");
  }

  // ---------- CodeBox ----------
  // opts: {id, code, stdin, showStdin, tests, title, onPass, persist, noViz, readOnly, compact}
  function CodeBox(opts) {
    const original = T(opts.code || "");
    const st = Py30.state;
    const saved = opts.persist && opts.id && st.code[opts.id];
    const usesInput = /\binput\s*\(/.test(original) || (opts.tests || []).some(t => t.stdin);
    const showStdin = opts.showStdin ?? usesInput;
    const el = h(`<div class="codebox">
      <div class="cb-bar">
        <span class="cb-title">${esc(opts.title || (opts.tests ? "your_solution.py" : "example.py"))}</span>
        <span class="cb-status" aria-live="polite"></span>
        <button type="button" class="cb-btn run" data-a="run" title="Run (Ctrl+Enter)">▶ Run</button>
        ${opts.noViz ? "" : `<button type="button" class="cb-btn" data-a="viz" title="Run line by line">Visualize</button>`}
        ${opts.tests ? `<button type="button" class="cb-btn check" data-a="check">✓ Check</button>` : ""}
        ${opts.readOnly ? "" : `<button type="button" class="cb-btn" data-a="reset" title="Back to the original code">Reset</button>`}
      </div>
      <div class="cb-editor"></div>
      ${showStdin ? `<div class="cb-stdin"><label>Input — one line for each input() call</label><textarea spellcheck="false" aria-label="Program input"></textarea></div>` : ""}
      <div class="cb-out" aria-live="polite"></div>
    </div>`);
    const wrap = document.createElement("div");
    wrap.appendChild(el);
    const fb = document.createElement("div"); fb.className = "feedback"; wrap.appendChild(fb);
    const vizHost = document.createElement("div"); wrap.appendChild(vizHost);

    const stdinEl = el.querySelector(".cb-stdin textarea");
    if (stdinEl) stdinEl.value = T(opts.stdin || (opts.tests && opts.tests[0] && opts.tests[0].stdin) || "");
    const out = el.querySelector(".cb-out"), status = el.querySelector(".cb-status");
    let cm = null, errMark = null;

    function mount() {
      if (cm) return;
      cm = CodeMirror(el.querySelector(".cb-editor"), {
        value: saved || original, mode: "python", theme: "py30", lineNumbers: true, indentUnit: 4, tabSize: 4,
        indentWithTabs: false, matchBrackets: true, autoCloseBrackets: true, viewportMargin: Infinity, readOnly: !!opts.readOnly,
        extraKeys: {
          Tab: c => c.somethingSelected() ? c.indentSelection("add") : c.replaceSelection("    ", "end"),
          "Shift-Tab": c => c.indentSelection("subtract"),
          "Ctrl-Enter": () => run(), "Cmd-Enter": () => run(),
        },
      });
      cm.on("change", () => {
        if (errMark != null) { cm.removeLineClass(errMark, "background", "cm-errline"); errMark = null; }
        if (opts.persist && opts.id) { st.code[opts.id] = cm.getValue(); Py30.save(); }
      });
    }
    // mount when visible (keeps pages with many editors fast)
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { mount(); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(el);
    const code = () => (mount(), cm.getValue());

    const onState = s => { if (busy) status.textContent = statusText(s); };
    let busy = false;
    PyRunner.onState(onState);

    function setBusy(b, label) {
      busy = b;
      el.querySelectorAll(".cb-btn").forEach(x => x.disabled = b);
      status.textContent = b ? (statusText(PyRunner.state) || label || "Running…") : "";
    }
    function markLine(line) {
      if (!cm || !line) return;
      errMark = cm.addLineClass(line - 1, "background", "cm-errline");
    }
    function showError(info) {
      fb.innerHTML = PyErrors.explain(info);
      markLine(info.line);
    }
    function onStatus(s) { if (s === "packages") status.textContent = "Loading numpy / scikit-learn (a few seconds)…"; if (s === "running") status.textContent = "Running…"; }

    async function run() {
      Py30.touchStreak();
      fb.innerHTML = ""; vizHost.innerHTML = "";
      setBusy(true);
      try {
        const r = await PyRunner.run(code(), stdinEl ? stdinEl.value : "", { onStatus });
        if (r.timeout) { out.innerHTML = `<span class="o-sys">Stopped after 8 seconds.</span>`; showError({ type: "Timeout", msg: "" }); return; }
        out.innerHTML = renderSegs(r.segs) || (r.error ? "" : `<span class="o-sys">(no output — the code ran, but nothing was printed)</span>`);
        if (r.error) { out.innerHTML += `<span class="o-err">${esc(r.error.type)}: ${esc(r.error.msg)}</span>`; showError(r.error); }
        opts.onRun && opts.onRun(r);
      } catch (e) { out.innerHTML = `<span class="o-err">${esc(e.message)}</span>`; }
      finally { setBusy(false); }
    }

    async function check() {
      Py30.touchStreak();
      fb.innerHTML = ""; vizHost.innerHTML = "";
      setBusy(true, "Checking…");
      const tests = opts.tests.map(t => ({ stdin: T(t.stdin || ""), expected: T(t.expected || ""), after: t.after ? T(t.after) : undefined }));
      try {
        const r = await PyRunner.test(code(), tests, { onStatus });
        if (r.timeout) { showError({ type: "Timeout", msg: "" }); return; }
        let pass = 0, items = "";
        r.forEach((res, k) => {
          const t = tests[k];
          const ok = !res.error && PyErrors.norm(res.got) === PyErrors.norm(t.expected);
          if (ok) pass++;
          const inputNote = t.stdin ? `<div class="muted" style="font-size:.85rem">Input: <code>${esc(t.stdin.replace(/\n/g, " ⏎ "))}</code></div>` : "";
          const afterNote = t.after ? `<div class="muted" style="font-size:.85rem">Test code: <code>${esc(t.after)}</code></div>` : "";
          let body = "";
          if (!ok) {
            if (res.error) body = PyErrors.explain(res.error);
            else body = PyErrors.diffHTML(t.expected, res.got) + `<ul style="margin:8px 0 0;padding-left:20px">${PyErrors.diffHints(t.expected, res.got).map(x => `<li>${x}</li>`).join("")}</ul>`;
          }
          items += `<li><div class="t-head ${ok ? "t-pass" : "t-fail"}">${ok ? "✓" : "✗"} Test ${k + 1}</div>${inputNote}${afterNote}${body}</li>`;
          if (!ok && res.error) markLine(res.error.line);
        });
        const all = pass === tests.length;
        fb.innerHTML = (all
          ? `<div class="success-card"><h4>All ${tests.length} tests passed 🎉</h4><p>${esc(T(pick(PRAISE)))}</p><p class="ar" style="margin:0">${esc(T(pick(PRAISE_AR)))}</p></div>`
          : `<div class="score-bar" style="background:var(--err-bg);color:var(--err)">${pass} of ${tests.length} tests passed — look at the first red test.</div>`)
          + (all ? "" : `<ul class="test-list">${items}</ul>`);
        if (all && opts.onPass) opts.onPass();
      } catch (e) { fb.innerHTML = `<div class="err-card">${esc(e.message)}</div>`; }
      finally { setBusy(false); }
    }

    async function viz() {
      Py30.touchStreak();
      fb.innerHTML = ""; vizHost.innerHTML = "";
      setBusy(true, "Tracing…");
      try {
        const src = code();
        const r = await PyRunner.trace(src, stdinEl ? stdinEl.value : "", { onStatus });
        if (r.timeout) { showError({ type: "Timeout", msg: "" }); return; }
        out.innerHTML = renderSegs(r.segs);
        if (r.error) { out.innerHTML += `<span class="o-err">${esc(r.error.type)}: ${esc(r.error.msg)}</span>`; showError(r.error); }
        if (r.steps.length) vizHost.appendChild(Visualizer(src, r));
      } catch (e) { out.innerHTML = `<span class="o-err">${esc(e.message)}</span>`; }
      finally { setBusy(false); }
    }

    el.querySelector(".cb-bar").addEventListener("click", e => {
      const a = e.target.closest("[data-a]"); if (!a) return;
      const act = a.dataset.a;
      if (act === "run") run(); else if (act === "check") check(); else if (act === "viz") viz();
      else if (act === "reset") { mount(); if (confirm("Reset this editor to the original code?")) { cm.setValue(original); out.innerHTML = ""; fb.innerHTML = ""; vizHost.innerHTML = ""; } }
    });
    wrap.api = { run, check, viz, get code() { return code(); } };
    return wrap;
  }

  const PRAISE = ["Great work, {{name}}!", "Nailed it, {{name}}.", "That is real programming, {{name}}.", "Clean solution, {{name}}!", "Another one solved, {{name}}. Keep going."];
  const PRAISE_AR = ["{{g:أحسنت|أحسنتِ}} يا {{name}}! 👏", "{{g:ممتاز|ممتازة}} يا {{name}}، استمر{{g:|ي}}!", "رائع يا {{name}}، هذا تفكير مبرمج{{g:|ة}} حقيقي{{g:|ة}}."];
  const pick = a => a[Math.floor(Math.random() * a.length)];

  // ---------- Visualizer ----------
  function Visualizer(src, trace) {
    const lines = src.split("\n");
    const steps = trace.steps;
    let i = 0;
    const el = h(`<div class="viz">
      <div class="viz-head"><strong>Step-by-step visualizer</strong><span class="chip">${steps.length} steps${trace.truncated ? " (first 600 only)" : ""}</span></div>
      <div class="viz-body"><div class="viz-code"></div><div class="viz-side"></div></div>
      <div class="viz-explain" aria-live="polite"></div>
      <div class="viz-controls">
        <button class="btn btn-soft btn-sm" data-v="first" type="button">⏮ First</button>
        <button class="btn btn-soft btn-sm" data-v="prev" type="button">◀ Back</button>
        <input type="range" min="0" max="${steps.length - 1}" value="0" aria-label="Step">
        <button class="btn btn-primary btn-sm" data-v="next" type="button">Next ▶</button>
        <button class="btn btn-soft btn-sm" data-v="last" type="button">Last ⏭</button>
      </div></div>`);
    const codeEl = el.querySelector(".viz-code"), side = el.querySelector(".viz-side"), ex = el.querySelector(".viz-explain"), range = el.querySelector("input");
    codeEl.innerHTML = lines.map((l, k) => `<div data-l="${k + 1}"><span class="ln">${k + 1}</span>${esc(l) || " "}</div>`).join("");

    function draw() {
      const s = steps[i], prev = steps[i - 1];
      codeEl.querySelectorAll("div").forEach(d => d.classList.remove("cur", "prev"));
      if (s.line) { const c = codeEl.querySelector(`[data-l="${s.line}"]`); if (c) { c.classList.add("cur"); c.scrollIntoView({ block: "nearest" }); } }
      if (prev && prev.line && prev.line !== s.line) { const p = codeEl.querySelector(`[data-l="${prev.line}"]`); if (p) p.classList.add("prev"); }
      const prevVars = {};
      if (prev) prev.stack.forEach(f => f.vars.forEach(([k, v]) => prevVars[f.name + ":" + k] = v));
      side.innerHTML = `<h5>Variables</h5>` + (s.stack.map(f => `<div class="frame"><div class="fname">${esc(f.name)}</div>
        <table class="vars">${f.vars.length ? f.vars.map(([k, v, ty]) => { const ch = prev && prevVars[f.name + ":" + k] !== v; return `<tr class="${ch ? "changed" : ""}"><td>${esc(k)}</td><td>${esc(v)}<span class="ty">${esc(ty)}</span></td></tr>`; }).join("") : `<tr><td colspan="2" class="muted">(no variables yet)</td></tr>`}</table></div>`).join(""))
        + `<h5>Output so far</h5><div class="viz-out">${esc(s.out) || " "}</div>`;
      let msg;
      if (s.event === "end") msg = "The program finished. These are the final values of all variables.";
      else if (s.event === "return") msg = `The function <b>${esc(s.stack[s.stack.length - 1].name)}</b> finishes and returns <code>${esc(s.ret)}</code>.`;
      else msg = `Line <b>${s.line}</b> (pink) is about to run. The darker line just ran.${s.stack.length > 1 ? ` We are inside <b>${esc(s.stack[s.stack.length - 1].name)}</b>.` : ""} Yellow rows changed in the last step.`;
      ex.innerHTML = `Step ${i + 1} of ${steps.length}. ${msg}`;
      range.value = i;
    }
    el.querySelector(".viz-controls").addEventListener("click", e => {
      const b = e.target.closest("[data-v]"); if (!b) return;
      const v = b.dataset.v;
      i = v === "first" ? 0 : v === "last" ? steps.length - 1 : v === "next" ? Math.min(steps.length - 1, i + 1) : Math.max(0, i - 1);
      draw();
    });
    range.oninput = () => { i = +range.value; draw(); };
    el.tabIndex = 0;
    el.addEventListener("keydown", e => { if (e.key === "ArrowRight") { i = Math.min(steps.length - 1, i + 1); draw(); } if (e.key === "ArrowLeft") { i = Math.max(0, i - 1); draw(); } });
    draw();
    return el;
  }

  // ---------- Parsons (put the lines in order) ----------
  function Parsons(p, dayN) {
    const d = Py30.day(dayN);
    const correct = p.lines.map(T);
    const all = correct.concat((p.distractors || []).map(T)).map((t, k) => ({ t, k }));
    for (let k = all.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [all[k], all[j]] = [all[j], all[k]]; }
    let pool = all.slice(), answer = [];
    const el = h(`<div class="callout"><div class="ttl">🧩 ${esc(T(p.title || "Put the code in order"))}</div>
      <p>${T(p.prompt)}</p><p class="muted" style="font-size:.88rem">Tap a line to move it into your program. Tap it again to send it back.${p.distractors ? " Careful: some lines are traps and do not belong." : ""}</p>
      <div class="parsons"><div class="zone pool"><h5>Available lines</h5></div><div class="zone ans"><h5>Your program</h5></div></div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" type="button" data-p="check">Check order</button><button class="btn btn-ghost btn-sm" type="button" data-p="reset">Start over</button></div>
      <div class="pmsg" style="margin-top:8px"></div></div>`);
    const poolEl = el.querySelector(".pool"), ansEl = el.querySelector(".ans"), msg = el.querySelector(".pmsg");
    function draw() {
      poolEl.querySelectorAll(".pline").forEach(x => x.remove()); ansEl.querySelectorAll(".pline").forEach(x => x.remove());
      pool.forEach((it, k) => { const b = h(`<button type="button" class="pline">${esc(it.t)}</button>`); b.onclick = () => { answer.push(it); pool.splice(k, 1); draw(); }; poolEl.appendChild(b); });
      answer.forEach((it, k) => { const b = h(`<button type="button" class="pline">${esc(it.t)}</button>`); b.onclick = () => { pool.push(it); answer.splice(k, 1); draw(); }; ansEl.appendChild(b); });
    }
    el.querySelector("[data-p=check]").onclick = () => {
      const btns = ansEl.querySelectorAll(".pline");
      let ok = answer.length === correct.length;
      answer.forEach((it, k) => { const good = it.t === correct[k]; btns[k].classList.add(good ? "ok" : "bad"); if (!good) ok = false; });
      if (ok) { msg.innerHTML = `<div class="success-card"><h4>Perfect order!</h4>${p.explain ? `<p>${T(p.explain)}</p>` : ""}</div>`; d.parsons[p.id] = true; Py30.save(); }
      else msg.innerHTML = `<p class="t-fail">${answer.length < correct.length ? `Your program needs ${correct.length} lines.` : "Not yet — red lines are in the wrong place (or do not belong)."} Think: what must exist <i>before</i> it can be used?</p>`;
    };
    el.querySelector("[data-p=reset]").onclick = () => { pool = all.slice(); answer = []; msg.innerHTML = ""; draw(); };
    draw();
    return el;
  }

  // ---------- Predict the output ----------
  function Predict(p, dayN) {
    const d = Py30.day(dayN);
    const el = h(`<div class="callout predict"><div class="ttl">🔮 Predict the output</div>
      <p>${T(p.prompt || "Read the code. What will it print? Write your guess <b>before</b> running it.")}</p>
      <pre class="code-static">${esc(T(p.code))}</pre>
      ${p.stdin ? `<p class="muted" style="font-size:.88rem">The user types: <code>${esc(T(p.stdin).replace(/\n/g, " ⏎ "))}</code></p>` : ""}
      <textarea spellcheck="false" aria-label="Your prediction" placeholder="Type what you think will appear…"></textarea>
      <div style="margin-top:8px"><button class="btn btn-primary btn-sm" type="button">Run and compare</button></div>
      <div class="pres" style="margin-top:10px"></div></div>`);
    const ta = el.querySelector("textarea"), res = el.querySelector(".pres"), btn = el.querySelector("button");
    btn.onclick = async () => {
      if (!ta.value.trim()) { ta.focus(); ta.placeholder = "Write a guess first — even a wrong guess helps you learn!"; return; }
      btn.disabled = true; btn.textContent = PyRunner.state === "ready" ? "Running…" : "Waking up Python…";
      try {
        const r = await PyRunner.run(T(p.code), T(p.stdin || ""));
        const got = (r.segs || []).filter(s => s[0] === "out").map(s => s[1]).join("") + (r.error ? `${r.error.type}: ${r.error.msg}` : "");
        const ok = PyErrors.norm(got) === PyErrors.norm(ta.value);
        d.predict[p.id] = ok; Py30.save();
        res.innerHTML = (ok ? `<div class="success-card"><h4>Exactly right!</h4></div>` : PyErrors.diffHTML(got, ta.value).replace("Expected output", "Real output").replace("Your output", "Your guess"))
          + (p.explain ? `<div class="callout ok" style="margin-top:10px"><div class="ttl">Why?</div><p>${T(p.explain)}</p></div>` : "");
      } finally { btn.disabled = false; btn.textContent = "Run and compare"; }
    };
    return el;
  }

  // ---------- Quiz ----------
  function Quiz(qs, dayN) {
    const d = Py30.day(dayN);
    const el = h(`<div></div>`);
    let answered = 0, score = 0;
    const bar = h(`<div class="score-bar" style="margin-top:12px"></div>`);
    qs.forEach((q, qi) => {
      const box = h(`<div class="q"><div class="qtext">${qi + 1}. ${md(q.q)}</div>${q.code ? `<pre class="code-static">${esc(T(q.code))}</pre>` : ""}<div class="opts"></div><div class="explain"></div></div>`);
      const opts = box.querySelector(".opts");
      q.o.forEach((o, oi) => {
        const b = h(`<button type="button" class="opt">${md(o)}</button>`);
        b.onclick = () => {
          opts.querySelectorAll(".opt").forEach((x, k) => { x.disabled = true; if (k === q.a) x.classList.add("right"); });
          if (oi !== q.a) b.classList.add("wrong"); else score++;
          answered++;
          box.querySelector(".explain").innerHTML = `${oi === q.a ? "✓ Correct. " : "✗ Not quite. "}${md(q.e || "")}`;
          if (answered === qs.length) {
            const prevBest = d.quiz ? d.quiz.score : -1;
            if (score > prevBest) d.quiz = { score, total: qs.length };
            Py30.save();
            bar.innerHTML = `Quiz score: ${score} / ${qs.length} ${score === qs.length ? "🏆" : score >= qs.length * 0.6 ? "👍" : "— reread the lesson parts you missed and try again tomorrow"} <button class="btn btn-soft btn-sm" style="margin-left:auto" type="button">Retake</button>`;
            bar.querySelector("button").onclick = () => { const n = Quiz(qs, dayN); el.replaceWith(n); };
            el.appendChild(bar);
          }
        };
        opts.appendChild(b);
      });
      el.appendChild(box);
    });
    if (d.quiz) el.prepend(h(`<p class="muted">Best score so far: ${d.quiz.score} / ${d.quiz.total}</p>`));
    return el;
  }

  // ---------- Puzzle of the day ----------
  function Puzzle(p, dayN) {
    const d = Py30.day(dayN);
    const el = h(`<div class="panel"><h3>🧠 ${esc(T(p.title || "Puzzle of the day"))}</h3><div>${T(p.q)}</div>${p.code ? `<pre class="code-static">${esc(T(p.code))}</pre>` : ""}
      <div class="pz-in" style="margin-top:10px"></div><div class="pz-res" style="margin-top:10px"></div>
      <details class="fold"><summary>Need a hint?</summary><div class="fold-body"><p>${T(p.hint || "")}</p>${p.ar ? `<p class="ar">${T(p.ar)}</p>` : ""}</div></details></div>`);
    const inp = el.querySelector(".pz-in"), res = el.querySelector(".pz-res");
    const reveal = ok => {
      d.puzzle = d.puzzle || ok; Py30.save();
      res.innerHTML = `<div class="callout ${ok ? "ok" : "mistake"}"><div class="ttl">${ok ? "Solved! 🎉" : "Not this time"}</div><p>${T(p.e)}</p></div>`;
    };
    if (p.o) {
      const box = h(`<div class="opts" style="display:grid;gap:8px"></div>`);
      p.o.forEach((o, k) => { const b = h(`<button class="opt btn btn-soft" type="button" style="justify-content:flex-start">${md(o)}</button>`); b.onclick = () => { box.querySelectorAll("button").forEach(x => x.disabled = true); reveal(k === p.a); }; box.appendChild(b); });
      inp.appendChild(box);
    } else {
      const f = h(`<div style="display:flex;gap:8px"><input class="search" style="margin:0" aria-label="Your answer" placeholder="Your answer"><button class="btn btn-primary" type="button">Check</button></div>`);
      const i2 = f.querySelector("input");
      f.querySelector("button").onclick = () => { const k = x => String(x).toLowerCase().replace(/\s+/g, "").replace(/"/g, "'"); const v = k(i2.value); if (!v) return; reveal((p.answers || []).map(k).includes(v)); };
      inp.appendChild(f);
    }
    return el;
  }

  window.PyUI = { CodeBox, Visualizer, Parsons, Predict, Quiz, Puzzle, md, h };
})();

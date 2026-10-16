#!/usr/bin/env node
/* Py30 lesson checker (developer tool, not loaded by the site).
   Usage: node tools/check-lessons.js [day ...]
   1. Checks the shape of every js/days/dayNN.js (block types, quiz answers, unique ids).
   2. Runs every example, worked example and exercise solution with the same Python
      harness the site uses (from js/worker.js) and reports errors and failed tests.
   Needs python3 (and numpy + scikit-learn for week 4). */
const fs = require("fs"), path = require("path"), { spawnSync } = require("child_process");
const root = path.join(__dirname, "..");
global.window = global;
const T = s => String(s ?? "").replace(/\{\{name\}\}/g, "Sara").replace(/\{\{g:([^|}]*)\|([^}]*)\}\}/g, (m, a) => a);
const BLOCKS = new Set(["p", "h", "ar", "tip", "analogy", "static", "table", "code", "viz", "try", "mistake", "predict", "parsons", "lines", "check", "steps"]);
const days = process.argv.slice(2).map(Number).filter(Boolean);
const list = days.length ? days : Array.from({ length: 30 }, (_, i) => i + 1);
const problems = [], jobs = [];
const bad = (d, where, msg) => problems.push(`Day ${d} ${where}: ${msg}`);

for (const d of list) {
  const f = path.join(root, "js/days", `day${String(d).padStart(2, "0")}.js`);
  try { eval(fs.readFileSync(f, "utf8")); } catch (e) { bad(d, "file", "does not load: " + e.message); continue; }
  const D = DAYS[d];
  if (!D) { bad(d, "file", "DAYS[" + d + "] missing"); continue; }
  const blocks = (arr, sec) => (arr || []).forEach((b, k) => {
    const w = `${sec}[${k}]`;
    if (!BLOCKS.has(b.t)) return bad(d, w, `unknown block type "${b.t}"`);
    if (["code", "viz", "try"].includes(b.t)) {
      if (!b.code) return bad(d, w, "no code");
      jobs.push({ d, w, kind: "run", code: T(b.code), stdin: T(b.stdin || ""), mayFail: !!b.error });
    }
    if (b.t === "predict") jobs.push({ d, w, kind: "run", code: T(b.code), stdin: T(b.stdin || ""), mayFail: true });
    if (b.t === "check") {
      if (!Array.isArray(b.o) || b.o.length < 2) bad(d, w, "check needs 2+ options");
      else if (!(b.a >= 0 && b.a < b.o.length)) bad(d, w, "check answer index out of range");
      if (!b.q) bad(d, w, "check has no question");
      if (!b.e) bad(d, w, "check has no explanation");
    }
    if (b.t === "steps") {
      if (!Array.isArray(b.steps) || b.steps.length < 2) bad(d, w, "worked example needs 2+ steps");
      if (b.code) jobs.push({ d, w, kind: "run", code: T(b.code), stdin: T(b.stdin || ""), mayFail: false });
    }
    if (b.t === "lines" && (!Array.isArray(b.rows) || !b.rows.every(r => Array.isArray(r) && r.length === 2))) bad(d, w, "lines rows must be [code, explanation] pairs");
    if (b.t === "parsons" && !(b.lines && b.lines.length > 1)) bad(d, w, "parsons needs lines");
    if (b.t === "table" && !(b.head && b.rows)) bad(d, w, "table needs head and rows");
  });
  blocks(D.learn, "learn"); blocks(D.practice, "practice"); blocks(D.extra, "extra");
  (D.tricks || []).forEach((t, k) => { if (t.code) jobs.push({ d, w: `tricks[${k}]`, kind: "run", code: T(t.code), stdin: "", mayFail: !!t.error }); });
  (D.quiz || []).forEach((q, k) => { if (!(q.a >= 0 && q.a < q.o.length)) bad(d, `quiz[${k}]`, "answer index out of range"); });
  if (D.remember && !(Array.isArray(D.remember) && D.remember.length)) bad(d, "remember", "must be a non-empty list");
  const ids = new Set();
  (D.exercises || []).forEach((ex, k) => {
    if (ids.has(ex.id)) bad(d, `exercises[${k}]`, `duplicate id "${ex.id}"`); ids.add(ex.id);
    if (!ex.tests || !ex.tests.length) return;
    const tests = ex.tests.map(t => ({ stdin: T(t.stdin || ""), expected: T(t.expected || ""), after: t.after ? T(t.after) : undefined }));
    (ex.solutions || []).forEach((s, j) => jobs.push({ d, w: `exercise "${ex.id}" solution "${s.name}"`, kind: "test", code: T(s.code), tests, partial: !!s.partial }));
  });
}

// Python side: the site's own harness, extracted from worker.js
const worker = fs.readFileSync(path.join(root, "js/worker.js"), "utf8");
const harness = worker.slice(worker.indexOf("String.raw`") + 11, worker.indexOf("`;", worker.indexOf("String.raw`")));
const driver = harness + String.raw`
import json as _j, sys as _s, os as _os, tempfile as _tf
_os.chdir(_tf.mkdtemp())          # example programs may write files
_s.path.insert(0, "")             # like Pyodide: files in the folder can be imported
try:
    import numpy as _np
    _np.set_printoptions(legacy="1.25")   # the site's Pyodide has numpy 1.x (prints 0.97, not np.float64(0.97))
except Exception:
    pass
_jobs = _j.loads(_s.stdin.read())
_norm = lambda x: "\n".join(l.rstrip() for l in str(x).replace("\r", "").split("\n")).rstrip("\n")
_res = []
for job in _jobs:
    if job["kind"] == "run":
        r = _j.loads(py_run(job["code"], job["stdin"]))
        e = r["error"]
        _res.append(None if (e is None or job["mayFail"]) else "%s: %s (line %s)" % (e["type"], e["msg"], e.get("line")))
    else:
        r = _j.loads(py_test(job["code"], _j.dumps(job["tests"])))
        msg = None
        for k, (t, x) in enumerate(zip(job["tests"], r)):
            if x["error"]:
                msg = "test %d error %s: %s" % (k + 1, x["error"]["type"], x["error"]["msg"]); break
            if _norm(x["got"]) != _norm(t["expected"]):
                msg = "test %d expected %r got %r" % (k + 1, _norm(t["expected"])[:80], _norm(x["got"])[:80]); break
        _res.append(None if job.get("partial") else msg)
_s.__stdout__.write(_j.dumps(_res))
`;
const tmp = path.join(require("os").tmpdir(), "py30_check_driver.py");
fs.writeFileSync(tmp, driver);
const out = spawnSync("python3", ["-I", tmp], { input: JSON.stringify(jobs), maxBuffer: 1 << 26, timeout: 600000 });
if (out.status !== 0) { console.error(String(out.stderr)); process.exit(2); }
JSON.parse(String(out.stdout)).forEach((r, k) => { if (r) bad(jobs[k].d, jobs[k].w, r); });

console.log(`Checked ${list.length} day(s), ran ${jobs.length} programs.`);
if (problems.length) { console.log(problems.join("\n")); console.log(`${problems.length} problem(s).`); process.exit(1); }
console.log("All good.");

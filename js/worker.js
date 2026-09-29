/* Py30 Python worker — runs student code with Pyodide (online edition). */
/* Online edition: Python (Pyodide) is loaded from the jsDelivr CDN and cached by the browser. */
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
importScripts(PYODIDE_URL + "pyodide.js");

const HARNESS = String.raw`
import sys, io, json, builtins, traceback, types

class _NeedInput(Exception):
    pass

class _TooMuch(Exception):
    pass

_MAX_OUT = 20000
_MAX_STEPS = 600

def _make_io(stdin_text, segs, echo=True):
    lines = stdin_text.split("\n") if stdin_text else []
    if lines and lines[-1] == "" and stdin_text.endswith("\n"):
        lines.pop()
    state = {"i": 0, "n": 0}
    class Out(io.TextIOBase):
        def write(self, s):
            s = str(s)
            state["n"] += len(s)
            if state["n"] > _MAX_OUT:
                raise _TooMuch()
            if segs and segs[-1][0] == "out":
                segs[-1][1] += s
            else:
                segs.append(["out", s])
            return len(s)
    def fake_input(prompt=""):
        prompt = str(prompt)
        if prompt and echo:
            segs.append(["prompt", prompt])
        if state["i"] >= len(lines):
            raise _NeedInput()
        v = lines[state["i"]]
        state["i"] += 1
        if echo:
            segs.append(["in", v + "\n"])
        return v
    return Out(), fake_input

def _err_info(e, code):
    info = {"type": type(e).__name__, "msg": str(e), "line": None, "tb": ""}
    if isinstance(e, _NeedInput):
        info["type"] = "NeedMoreInput"
        info["msg"] = "Your program asked for input() but the Input box has no more lines."
        return info
    if isinstance(e, _TooMuch):
        info["type"] = "TooMuchOutput"
        info["msg"] = "Your program printed too much (maybe an infinite loop)."
        return info
    if isinstance(e, SyntaxError):
        info["line"] = e.lineno
        info["msg"] = e.msg
        info["text"] = (e.text or "").rstrip("\n")
        info["offset"] = e.offset
    else:
        tb = e.__traceback__
        fr = []
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == "<student>":
                fr.append((tb.tb_lineno, tb.tb_frame.f_code.co_name))
            tb = tb.tb_next
        if fr:
            info["line"] = fr[-1][0]
            info["func"] = fr[-1][1]
    try:
        src = code.split("\n")
        if info["line"] and 0 < info["line"] <= len(src):
            info["src"] = src[info["line"] - 1]
    except Exception:
        pass
    return info

def _new_ns():
    return {"__name__": "__main__", "__builtins__": builtins}

def _exec(code, ns, stdin_text, segs, echo=True, tracer=None):
    out, fake_input = _make_io(stdin_text, segs, echo)
    old_out, old_err, old_in = sys.stdout, sys.stderr, builtins.input
    sys.stdout = out
    sys.stderr = out
    builtins.input = fake_input
    err = None
    try:
        compiled = compile(code, "<student>", "exec")
        if tracer:
            sys.settrace(tracer)
        exec(compiled, ns)
    except BaseException as e:
        err = _err_info(e, code)
    finally:
        sys.settrace(None)
        sys.stdout, sys.stderr, builtins.input = old_out, old_err, old_in
    return err

def py_run(code, stdin_text):
    segs = []
    err = _exec(code, _new_ns(), stdin_text, segs)
    return json.dumps({"segs": segs, "error": err})

def _only_out(segs):
    return "".join(s[1] for s in segs if s[0] == "out")

def py_test(code, tests_json):
    tests = json.loads(tests_json)
    results = []
    for t in tests:
        ns = _new_ns()
        segs = []
        err = _exec(code, ns, t.get("stdin", ""), segs, echo=False)
        got = _only_out(segs)
        if err is None and t.get("after"):
            segs2 = []
            err = _exec(t["after"], ns, "", segs2, echo=False)
            got = _only_out(segs2)
        results.append({"got": got, "error": err})
    return json.dumps(results)

def _short(v):
    try:
        if isinstance(v, types.FunctionType):
            return "function " + v.__name__ + "()", "function"
        if isinstance(v, type):
            return "class " + v.__name__, "class"
        if isinstance(v, types.ModuleType):
            return None, None
        if type(v).__repr__ is object.__repr__ and hasattr(v, "__dict__"):
            inner = ", ".join(f"{k}={a!r}" for k, a in vars(v).items())
            r = f"{type(v).__name__}({inner})"
        else:
            r = repr(v)
    except Exception:
        r = "<?>"
    if len(r) > 90:
        r = r[:87] + "..."
    return r, type(v).__name__

def py_trace(code, stdin_text):
    segs = []
    steps = []
    def snap(frame, event, extra=None):
        stack = []
        f = frame
        chain = []
        while f is not None:
            if f.f_code.co_filename == "<student>":
                chain.append(f)
            f = f.f_back
        chain.reverse()
        for fr in chain:
            vars_ = []
            for k, v in list(fr.f_locals.items()):
                if k.startswith("__"):
                    continue
                r, ty = _short(v)
                if r is None:
                    continue
                vars_.append([k, r, ty])
            name = "Global" if fr.f_code.co_name == "<module>" else fr.f_code.co_name + "()"
            stack.append({"name": name, "vars": vars_})
        st = {"line": frame.f_lineno, "event": event, "stack": stack, "out": _only_out(segs)}
        if extra is not None:
            st["ret"] = extra
        steps.append(st)
        if len(steps) >= _MAX_STEPS:
            raise _TooMuch("steps")
    def tracer(frame, event, arg):
        if frame.f_code.co_filename != "<student>":
            return None
        if event == "line":
            snap(frame, "line")
        elif event == "return" and frame.f_code.co_name != "<module>":
            r, _ = _short(arg)
            snap(frame, "return", r)
        return tracer
    ns = _new_ns()
    err = _exec(code, ns, stdin_text, segs, echo=True, tracer=tracer)
    truncated = False
    if err and err["type"] == "TooMuchOutput" and len(steps) >= _MAX_STEPS:
        err = None
        truncated = True
    if not truncated:
        vars_ = []
        for k, v in list(ns.items()):
            if k.startswith("__"):
                continue
            r, ty = _short(v)
            if r is None:
                continue
            vars_.append([k, r, ty])
        steps.append({"line": None, "event": "end", "stack": [{"name": "Global", "vars": vars_}], "out": _only_out(segs)})
    return json.dumps({"steps": steps, "segs": segs, "error": err, "truncated": truncated})
`;

let py = null;
let ready = null;

async function boot() {
  const indexURL = PYODIDE_URL;
  py = await loadPyodide({ indexURL });
  py.runPython(HARNESS);
}

self.onmessage = async (ev) => {
  const msg = ev.data;
  try {
    if (!ready) ready = boot();
    await ready;
    if (msg.type === "warmup") {
      self.postMessage({ id: msg.id, ok: true, result: "ready" });
      return;
    }
    // Load numpy / sklearn etc. on demand from the local folder
    const needs = /\b(import|from)\s+(numpy|sklearn|scipy)/.test(msg.code || "");
    if (needs) {
      self.postMessage({ id: msg.id, status: "packages" });
      await py.loadPackagesFromImports(msg.code);
    }
    self.postMessage({ id: msg.id, status: "running" });
    let out;
    const g = py.globals;
    if (msg.type === "run") out = g.get("py_run")(msg.code, msg.stdin || "");
    else if (msg.type === "test") out = g.get("py_test")(msg.code, JSON.stringify(msg.tests || []));
    else if (msg.type === "trace") out = g.get("py_trace")(msg.code, msg.stdin || "");
    self.postMessage({ id: msg.id, ok: true, result: JSON.parse(out) });
  } catch (e) {
    self.postMessage({ id: msg.id, ok: false, fatal: String(e && e.message ? e.message : e) });
  }
};

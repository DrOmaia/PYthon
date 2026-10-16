"""Py30 browser smoke test (developer tool).
Usage: python3 tools/smoke.py [outdir]   (needs: pip install playwright; Chromium)
Opens every day page, fails on page errors, tries the new lesson blocks
(worked example, quick check) and saves screenshots of a few days."""
import functools, http.server, json, os, sys, threading
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "tools", "shots")
os.makedirs(OUT, exist_ok=True)
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
H.log_message = lambda *a: None
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{srv.server_port}"
PROFILE = json.dumps({"profile": {"name": "Sara", "gender": "f"}})
fails = []
exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=exe if os.path.exists(exe) else None)
    for w in (1280, 390):
        ctx = b.new_context(viewport={"width": w, "height": 900})
        ctx.add_init_script(f"localStorage.setItem('py30.v1', {json.dumps(PROFILE)})")
        ctx.route("**/cdn.jsdelivr.net/**", lambda r: r.abort())  # no Python needed for layout checks
        for d in range(1, 31):
            pg = ctx.new_page()
            errs = []
            pg.on("pageerror", lambda e: None if "importScripts" in str(e) else errs.append(str(e)))
            pg.goto(f"{BASE}/lesson.html?day={d}")
            pg.wait_for_selector("#learn", timeout=10000)
            n = {k: pg.locator(s).count() for k, s in [("check", ".callout.check"), ("steps", ".callout.worked"), ("lines", ".lines"), ("remember", ".callout.remember")]}
            if w == 1280:
                if n["steps"]:
                    wk = pg.locator(".callout.worked").first
                    wk.locator("[data-w=all]").click()
                    if wk.locator(".wsteps li").count() < 2: fails.append(f"day {d}: worked example did not reveal")
                if n["check"]:
                    ck = pg.locator(".callout.check").first
                    ck.locator(".opt").first.click()
                    if not ck.locator(".explain").inner_text().strip(): fails.append(f"day {d}: check gave no feedback")
            sw = pg.evaluate("document.documentElement.scrollWidth")
            if sw > w + 1: fails.append(f"day {d} @{w}: page scrolls sideways ({sw}px)")
            if errs: fails.append(f"day {d} @{w}: page errors {errs[:2]}")
            if w == 1280: print(f"day {d:2}: " + "  ".join(f"{k} {v}" for k, v in n.items()))
            if d in (4, 10, 18, 25):
                pg.screenshot(path=os.path.join(OUT, f"day{d:02}_{w}.png"), full_page=False)
                if n["steps"]:
                    pg.locator(".callout.worked").first.scroll_into_view_if_needed()
                    pg.screenshot(path=os.path.join(OUT, f"day{d:02}_{w}_worked.png"))
            pg.close()
        ctx.close()
    b.close()
print("\n".join(fails) or "Smoke test: all good.")
sys.exit(1 if fails else 0)

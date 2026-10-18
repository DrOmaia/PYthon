"""Py30 lesson checker.

Runs tools/check-lessons.html in headless Edge/Chrome and prints its report.
With --run it also executes every Learn example and predict block with the
local Python, so broken examples are caught before students see them.

    python tools/check_lessons.py            # explanation rules only
    python tools/check_lessons.py --run      # also run the examples
    python tools/check_lessons.py --day 5    # only show one day
"""
import argparse
import html
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "tools" / "check-lessons.html"
BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "/usr/bin/google-chrome", "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]
# Modules that are fine to be missing locally (they run in Pyodide in the browser).
OPTIONAL = ("numpy", "sklearn", "pandas", "matplotlib")


def dump_dom():
    exe = next((b for b in BROWSERS if os.path.exists(b)), None)
    if not exe:
        sys.exit("No Edge/Chrome found. Open tools/check-lessons.html in a browser instead.")
    with tempfile.TemporaryDirectory() as prof:
        out = subprocess.run(
            [exe, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
             f"--user-data-dir={prof}", "--virtual-time-budget=15000", "--dump-dom", PAGE.as_uri()],
            capture_output=True, text=True, encoding="utf-8", timeout=120)
    return out.stdout


def run_block(b):
    code = b["code"].replace("{{name}}", "Sara")
    code = re.sub(r"\{\{g:([^|}]*)\|([^}]*)\}\}", r"\1", code)
    stdin = b["stdin"].replace("{{name}}", "Sara")
    try:
        p = subprocess.run([sys.executable, "-I", "-c", code], input=stdin, capture_output=True,
                           text=True, encoding="utf-8", timeout=20, cwd=tempfile.gettempdir(),
                           env={**os.environ, "PYTHONIOENCODING": "utf-8"})  # Arabic output on Windows consoles
    except subprocess.TimeoutExpired:
        return "timeout (infinite loop or waiting for input?)"
    if p.returncode == 0:
        return None
    err = p.stderr.strip().splitlines()[-1] if p.stderr.strip() else "exit %d" % p.returncode
    if any(f"No module named '{m}" in err for m in OPTIONAL):
        return None
    return err


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--run", action="store_true", help="execute every example with local Python")
    ap.add_argument("--day", type=int, help="only report this day")
    a = ap.parse_args()

    dom = dump_dom()
    rep = re.search(r'<pre id="report"[^>]*>(.*?)</pre>', dom, re.S)
    data = re.search(r'<script id="data" type="application/json">(.*?)</script>', dom, re.S)
    if not rep or not data or not data.group(1).strip():
        sys.exit("Checker page did not finish. Open tools/check-lessons.html in a browser to see the error.")
    report = html.unescape(rep.group(1))
    payload = json.loads(html.unescape(data.group(1)))

    failed = "need work" in report.splitlines()[0]
    if a.day:
        keep, on = [], False
        for line in report.splitlines():
            if line.startswith("Day "):
                on = int(line[4:6]) == a.day
            if on:
                keep.append(line)
        report = "\n".join(keep)
        failed = "✗" in report
    print(report)

    if a.run:
        print("\nRunning examples…")
        bad = 0
        for b in payload["blocks"]:
            if a.day and b["day"] != a.day:
                continue
            err = run_block(b)
            if b["expectError"]:
                err = None if err else "expected an error but the code ran cleanly"
            if err:
                bad += 1
                print(f"  ✗ Day {b['day']} learn[{b['k']}] ({b['t']}): {err}")
        print(f"  {'✓ all examples run' if not bad else f'{bad} example(s) fail'}")
        failed = failed or bad > 0
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()

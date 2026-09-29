window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[17] = {
  title: "Handling errors and working with files",
  intro: "Real programs meet real problems: users type letters where numbers belong, files go missing, networks fail. Professional code doesn't crash — it <b>handles</b> errors. And real programs remember things between runs by saving <b>files</b>. Today you learn both.",
  introAr: "اليوم نتعلم try و except لمعالجة الأخطاء بدل أن يتوقف البرنامج، ونتعلم قراءة الملفات والكتابة فيها، وملفات CSV التي تشبه جداول إكسل.",
  goals: ["Catch errors with `try` / `except`", "Catch specific exceptions (`ValueError`, `ZeroDivisionError`, `FileNotFoundError`)", "Raise your own errors with `raise`", "Write, read and append text files with `with open(...)`", "Read and write CSV data"],
  learn: [
    { t: "h", text: "try / except" },
    { t: "code", code: c`text = input("Your age: ")
try:
    age = int(text)
    print("Next year you will be", age + 1)
except ValueError:
    print("That's not a whole number:", text)
print("The program continues")`, stdin: "nineteen" },
    { t: "p", html: "<p>Python tries the block. If an error happens, it jumps to the matching <code>except</code> instead of crashing. Try <code>19</code> in the Input box too.</p>" },
    { t: "ar", html: "try: جرّب هذا الكود. except: إذا حدث خطأ من هذا النوع نفّذ هذا بدل أن يتوقف البرنامج. حدد{{g:|ي}} نوع الخطأ دائمًا ولا تكتب{{g:|ي}} except وحدها." },
    { t: "h", text: "Several errors, else and finally" },
    { t: "code", code: c`def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Numbers only, please"
    else:
        return round(result, 2)
    finally:
        print("(division attempted)")

print(safe_divide(10, 4))
print(safe_divide(10, 0))
print(safe_divide(10, "2"))` },
    { t: "table", head: ["Part", "Runs when"], rows: [["`try`", "always (first)"], ["`except X`", "an error of type X happened"], ["`else`", "no error happened"], ["`finally`", "always, at the end — even after return"]] },
    { t: "h", text: "Ask until valid — the robust way" },
    { t: "code", code: c`while True:
    try:
        n = int(input("Pick 1-10: "))
        if 1 <= n <= 10:
            break
        print("Out of range")
    except ValueError:
        print("Digits only")
print("You picked", n)`, stdin: "abc\n42\n7" },
    { t: "h", text: "Raising your own errors" },
    { t: "code", code: c`def set_mark(mark):
    if not 0 <= mark <= 100:
        raise ValueError(f"mark must be 0-100, got {mark}")
    return mark

try:
    set_mark(150)
except ValueError as e:
    print("Problem:", e)` },
    { t: "h", text: "Files: write, read, append" },
    { t: "code", code: c`with open("notes.txt", "w") as f:
    f.write("Day 17: files\n")
    f.write("with closes the file for me\n")

with open("notes.txt", "a") as f:
    f.write("appended line\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())

with open("notes.txt") as f:
    print(len(f.readlines()), "lines")` },
    { t: "table", head: ["Mode", "Meaning"], rows: [["`\"r\"`", "read (default) — error if the file doesn't exist"], ["`\"w\"`", "write — creates or <b>erases</b> the file"], ["`\"a\"`", "append — adds to the end"]] },
    { t: "p", html: "<p><code>with</code> automatically closes the file, even if an error happens. In Py30 files live in the browser's memory while Python is running; on your own computer they are real files next to your program.</p>" },
    { t: "h", text: "CSV: tables in text" },
    { t: "code", code: c`import csv
rows = [["name", "mark"], ["Sara", 95], ["Omar", 82], ["Lina", 90]]
with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows(rows)

with open("marks.csv") as f:
    reader = csv.DictReader(f)
    total = 0
    for row in reader:
        print(row["name"], row["mark"])
        total += int(row["mark"])
print("Average:", total / 3)`, note: "<p>CSV files open in Excel. <code>DictReader</code> turns each row into a dictionary using the header line. Every value is read as a <b>string</b>, so convert numbers.</p>" },
  ],
  mistakes: [
    { title: "A bare except hides bugs", html: "It also catches typos in your own code, so you never see them.", wrong: c`try:
    x = int(input())
except:
    print("error")`, right: c`try:
    x = int(input())
except ValueError:
    print("Please type a number")` },
    { title: "\"w\" erases the file", html: "Opening with <code>\"w\"</code> deletes the old contents immediately. Use <code>\"a\"</code> to add.", wrong: c`open("log.txt", "w").write("new entry\n")`, right: c`with open("log.txt", "a") as f:
    f.write("new entry\n")` },
    { title: "Forgetting the \\n", html: "<code>write</code> does not add a new line like <code>print</code> does.", wrong: c`f.write("line 1")
f.write("line 2")   # line 1line 2`, right: c`f.write("line 1\n")
f.write("line 2\n")`, ar: "write لا تضيف سطرًا جديدًا تلقائيًا، أضف{{g:|ي}} \\n بنفسك." },
  ],
  tricks: [
    { title: "print into a file", html: "", code: c`with open("out.txt", "w") as f:
    print("Hello file", 2026, file=f)
print(open("out.txt").read())` },
    { title: "JSON saves dicts and lists", html: "", code: c`import json
data = {"name": "{{name}}", "scores": [95, 88]}
with open("data.json", "w") as f:
    json.dump(data, f)
with open("data.json") as f:
    print(json.load(f)["scores"])` },
  ],
  practice: [
    { t: "predict", code: c`try:
    print("A")
    x = 1 / 0
    print("B")
except ZeroDivisionError:
    print("C")
finally:
    print("D")`, explain: "<code>A C D</code> — B is skipped because the error jumps straight to except." },
    { t: "predict", code: c`items = [1, 2, 3]
try:
    print(items[5])
except IndexError as e:
    print("Oops:", e)`, explain: "<code>Oops: list index out of range</code>" },
    { t: "parsons", title: "Save and count", prompt: "Write three names to a file, then read it back and print how many lines it has.", lines: [c`with open("names.txt", "w") as f:`, c`    f.write("Sara\nOmar\nLina\n")`, c`with open("names.txt") as f:`, "    lines = f.readlines()", "print(len(lines))"], distractors: [c`with open("names.txt", "a") as f:`], explain: "Result: <code>3</code>." },
    { t: "try", title: "Diary", html: "<p>A tiny diary: each run appends the Input line to <code>diary.txt</code> and shows all entries. Run it several times with different inputs.</p>", code: c`entry = input("Today's entry: ")
with open("diary.txt", "a") as f:
    f.write(entry + "\n")
with open("diary.txt") as f:
    print(f.read())`, stdin: "Learned try/except today" },
  ],
  exercises: [
    { id: "safeint", lvl: "seed", title: "to_int(text)", prompt: "<p>Write <code>to_int(text)</code> that returns the integer, or <code>None</code> if the text is not a valid whole number.</p>", starter: "def to_int(text):\n    pass\n", tests: [{ after: "print(to_int('42'), to_int('abc'), to_int('3.5'), to_int(' 7 '))", expected: "42 None None 7" }],
      solutions: [{ name: "try/except", code: c`def to_int(text):
    try:
        return int(text)
    except ValueError:
        return None`, note: "Notice <code>int(\" 7 \")</code> works — int ignores surrounding spaces." }, { name: "isdigit check", code: c`def to_int(text):
    t = text.strip()
    if t.lstrip("-").isdigit():
        return int(t)
    return None`, note: "\"Look before you leap\" vs try/except's \"easier to ask forgiveness\". Pythonistas usually prefer try/except." }] },
    { id: "robust", lvl: "seed", title: "Robust average", prompt: "<p>Read values until <code>done</code>. Skip anything that isn't a number (print <code>Skipped: X</code>). Print the average with 1 decimal, or <code>No numbers</code>.</p>", tests: [{ stdin: "80\nabc\n90.5\n\ndone", expected: "Skipped: abc\nSkipped: \nAverage: 85.2" }, { stdin: "x\ndone", expected: "Skipped: x\nNo numbers" }],
      solutions: [{ name: "try in loop", code: c`nums = []
while True:
    line = input()
    if line == "done":
        break
    try:
        nums.append(float(line))
    except ValueError:
        print("Skipped:", line)
if nums:
    print(f"Average: {sum(nums) / len(nums):.1f}")
else:
    print("No numbers")` }] },
    { id: "wc", lvl: "star", title: "File statistics", prompt: "<p>Write <code>file_stats(path)</code> that returns a tuple <code>(lines, words, characters)</code> for a text file, or <code>None</code> if the file doesn't exist.</p>", starter: "def file_stats(path):\n    pass\n", tests: [{ after: "open('t.txt','w').write('hello world\\npython is fun\\n')\nprint(file_stats('t.txt'))\nprint(file_stats('missing.txt'))", expected: "(2, 5, 26)\nNone" }],
      solutions: [{ name: "Read all", code: c`def file_stats(path):
    try:
        with open(path) as f:
            text = f.read()
    except FileNotFoundError:
        return None
    return (len(text.splitlines()), len(text.split()), len(text))` }] },
    { id: "log", lvl: "star", title: "Append to a log", prompt: "<p>Write <code>add_log(path, message)</code> that appends <code>message</code> as a new line, and <code>read_log(path)</code> that returns the list of lines (without <code>\\n</code>), or an empty list if the file is missing.</p>", starter: "def add_log(path, message):\n    pass\n\ndef read_log(path):\n    pass\n", tests: [{ after: "import os\nif os.path.exists('app.log'): os.remove('app.log')\nprint(read_log('app.log'))\nadd_log('app.log', 'start')\nadd_log('app.log', 'login Sara')\nprint(read_log('app.log'))", expected: "[]\n['start', 'login Sara']" }],
      solutions: [{ name: "a mode + splitlines", code: c`def add_log(path, message):
    with open(path, "a") as f:
        f.write(message + "\n")

def read_log(path):
    try:
        with open(path) as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []` }] },
    { id: "csvtop", lvl: "fire", title: "CSV report", prompt: "<p>Write <code>report(path)</code> for a CSV with columns <code>name,course,mark</code>. Return a dict mapping each course to its average mark (rounded to 1 decimal). Rows with an invalid mark are ignored.</p>", starter: "import csv\n\ndef report(path):\n    pass\n", tests: [{ after: "open('m.csv','w').write('name,course,mark\\nSara,CS101,95\\nOmar,CS101,80\\nLina,IS201,88\\nNora,IS201,absent\\nFaisal,IS201,91\\n')\nprint(report('m.csv'))", expected: "{'CS101': 87.5, 'IS201': 89.5}" }],
      solutions: [{ name: "DictReader + dict of lists", code: c`import csv

def report(path):
    marks = {}
    with open(path) as f:
        for row in csv.DictReader(f):
            try:
                m = float(row["mark"])
            except ValueError:
                continue
            marks.setdefault(row["course"], []).append(m)
    return {course: round(sum(v) / len(v), 1) for course, v in marks.items()}` }] },
    { id: "raise", lvl: "fire", title: "Validated transfer", prompt: "<p>Write <code>transfer(balance, amount)</code> that returns the new balance. Raise <code>ValueError(\"amount must be positive\")</code> if amount ≤ 0, and <code>ValueError(\"insufficient funds\")</code> if amount > balance.</p>", starter: "def transfer(balance, amount):\n    pass\n", tests: [{ after: "print(transfer(100, 30))\nfor a in (0, 500):\n    try:\n        transfer(100, a)\n    except ValueError as e:\n        print(e)", expected: "70\namount must be positive\ninsufficient funds" }],
      solutions: [{ name: "Guards with raise", code: c`def transfer(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount > balance:
        raise ValueError("insufficient funds")
    return balance - amount`, note: "The function doesn't print or decide what to do about the problem — it <b>reports</b> it, and the caller decides. That separation is good design." }] },
    { id: "fix17", lvl: "fire", debug: true, title: "The file that forgets", prompt: "<p><code>save_scores</code> should add scores to <code>scores.txt</code> and <code>best()</code> should return the highest. Expected: <code>95</code>.</p>", starter: c`def save_scores(scores):
    for s in scores:
        with open("scores.txt", "w") as f:
            f.write(s)

def best():
    with open("scores.txt") as f:
        return max(f.readlines())`, tests: [{ after: "import os\nif os.path.exists('scores.txt'): os.remove('scores.txt')\nsave_scores([80, 95])\nsave_scores([9])\nprint(best())", expected: "95" }],
      ar: "ثلاثة أخطاء: وضع الكتابة يمسح الملف، write تحتاج نصًا وسطرًا جديدًا، والمقارنة بين نصوص وليست أرقامًا ('9' أكبر من '95' نصيًا!).",
      solutions: [{ name: "Fixed", code: c`def save_scores(scores):
    with open("scores.txt", "a") as f:
        for s in scores:
            f.write(f"{s}\n")

def best():
    with open("scores.txt") as f:
        return max(int(line) for line in f)` }] },
  ],
  quiz: [
    { q: "When does `finally` run?", o: ["Only on error", "Only without error", "Always", "Never after return"], a: 2, e: "Always, even after return." },
    { q: "`int(\"12a\")` raises…", o: ["TypeError", "ValueError", "NameError", "KeyError"], a: 1, e: "Right type (str), wrong content." },
    { q: "Which mode adds to the end of a file?", o: ["`\"r\"`", "`\"w\"`", "`\"a\"`", "`\"x\"`"], a: 2, e: "Append." },
    { q: "Why use `with open(...)`?", o: ["It's faster", "It closes the file automatically", "It reads CSV", "It's required"], a: 1, e: "Even if an error happens." },
    { q: "Values read from a CSV file are…", o: ["numbers", "strings", "lists", "auto-detected"], a: 1, e: "Convert them yourself." },
  ],
  puzzle: { title: "Exception flow", q: "<p>What does this print? Write the letters in order, without spaces.</p>", code: c`def f():
    try:
        return "A"
    finally:
        print("B", end="")
print(f())`, answers: ["ba"], hint: "finally runs before the function really leaves.", ar: "finally تنفذ قبل أن ترجع الدالة فعليًا.", e: "The <code>finally</code> block prints <code>B</code> before the return value <code>A</code> reaches the outer print: <code>BA</code>." },
  cards: [
    { f: "try/except basic shape", b: "`try:` risky code `except ValueError:` fallback." },
    { f: "Why not a bare `except:`?", b: "It hides real bugs. Catch specific exceptions." },
    { f: "File modes r / w / a", b: "read / write (erases) / append." },
    { f: "Read a file line by line", b: "`with open(p) as f:` `for line in f:` `line.strip()`" },
    { f: "Raise an error", b: "`raise ValueError(\"message\")`" },
  ],
};
})();

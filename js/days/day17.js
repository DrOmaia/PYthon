window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[17] = {
  title: "Handling errors and working with files",
  intro: "Real programs meet real problems: users type letters where numbers belong, files go missing, someone divides by zero. Professional code doesn't crash — it <b>handles</b> errors. And real programs remember things between runs by saving <b>files</b>. Today you learn both, {{name}}.",
  introAr: "اليوم نتعلم try و except لمعالجة الأخطاء بدل أن يتوقف البرنامج، ونتعلم قراءة الملفات والكتابة فيها، وملفات CSV التي تشبه جداول إكسل.",
  goals: ["Catch errors with `try` / `except`", "Catch specific exceptions (`ValueError`, `ZeroDivisionError`, `FileNotFoundError`)", "Use `else`, `finally` and `as e`", "Raise your own errors with `raise`", "Write, read and append text files with `with open(...)`", "Read and write CSV data"],
  learn: [
    { t: "h", text: "Why handle errors?" },
    { t: "p", html: "<p>Since Day 3 you have written <code>int(input())</code>. It works perfectly — until a user types <code>nineteen</code> instead of <code>19</code>. Then Python stops with a red error and everything the program was doing is lost. Users make mistakes all the time; a good program expects them, explains the problem kindly and continues.</p>" },
    { t: "code", code: c`age = int("nineteen")
print("This line never runs")`, error: true, note: "<p>This error is expected: <code>ValueError</code> means \"the type is right (a string) but the content can't be turned into a number\". The program stops at line 1.</p>" },
    { t: "analogy", title: "try / except is a safety net", html: "<p>An acrobat in a circus tries a difficult jump. Most of the time it works. If she falls, the <b>net</b> catches her and the show goes on. <code>try</code> is the jump; <code>except</code> is the net that catches one kind of fall.</p>" },
    { t: "h", text: "try / except" },
    { t: "code", code: c`text = input("Your age: ")
try:
    age = int(text)
    print("Next year you will be", age + 1)
except ValueError:
    print("That's not a whole number:", text)
print("The program continues")`, stdin: "nineteen", before: "<p>Run it, then change the Input box to <code>19</code> and run again.</p>", note: "<p>With <code>nineteen</code> the except block runs; with <code>19</code> it is skipped. In both cases the last line runs — no crash.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      ["try:", "\"Try this block.\" Python runs the indented lines one by one."],
      ["    age = int(text)", "If this line fails, Python <b>stops the try block right here</b> — the next line (<code>print(\"Next year…\")</code>) is skipped."],
      ["except ValueError:", "\"If a <code>ValueError</code> happened, run this instead of crashing.\" Other kinds of error are <b>not</b> caught."],
      ["print(\"The program continues\")", "After try/except, the program goes on normally either way."]] },
    { t: "ar", html: "try: جرّب هذا الكود. except: إذا حدث خطأ من هذا النوع نفّذ هذا بدل أن يتوقف البرنامج. حدد{{g:|ي}} نوع الخطأ دائمًا ولا تكتب{{g:|ي}} except وحدها." },
    { t: "check", q: "What does this print?", code: c`try:
    n = int("abc")
    print("A")
except ValueError:
    print("B")
print("C")`, o: ["`A` then `C`", "`B` then `C`", "`A`, `B`, `C`"], a: 1, e: "`int(\"abc\")` fails, so `print(\"A\")` is skipped. The except prints B, then the program continues with C.", hint: "When a line in try fails, the rest of the try block is skipped." },
    { t: "h", text: "Know your errors" },
    { t: "p", html: "<p>Each kind of problem has its own name. You have seen most of them already in red messages. Knowing them lets you catch exactly the problem you expect.</p>" },
    { t: "table", head: ["Error", "When it happens", "Example"], rows: [["`ValueError`", "right type, bad content", "`int(\"12a\")`"], ["`ZeroDivisionError`", "dividing by zero", "`10 / 0`"], ["`TypeError`", "wrong type for the operation", "`\"5\" + 1`"], ["`IndexError`", "list position doesn't exist", "`[1, 2][5]`"], ["`KeyError`", "dictionary key doesn't exist", "`{}[\"x\"]`"], ["`FileNotFoundError`", "opening a file that isn't there", "`open(\"nope.txt\")`"]] },
    { t: "code", code: c`items = [10, 20, 30]
try:
    print(items[5])
except IndexError as e:
    print("Problem:", e)`, before: "<p><code>as e</code> stores the error in a variable, so you can show Python's own message.</p>" },
    { t: "p", html: "<p>One <code>try</code> can have several <code>except</code> blocks — one for each kind of problem. Python uses the <b>first</b> one that matches.</p>" },
    { t: "code", code: c`def safe_divide(a, b):
    try:
        return round(a / b, 2)
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Numbers only, please"

print(safe_divide(10, 4))
print(safe_divide(10, 0))
print(safe_divide(10, "2"))` },
    { t: "ar", html: "لكل نوع خطأ اسم: ValueError محتوى غير صالح، ZeroDivisionError قسمة على صفر، KeyError مفتاح غير موجود. يمكن وضع أكثر من except، وبايثون ينفذ أول واحد يطابق." },
    { t: "check", q: "Which except block runs for `print({\"tea\": 8}[\"coffee\"])`?", o: ["`except ValueError:`", "`except KeyError:`", "`except IndexError:`"], a: 1, e: "Looking up a key that isn't in a dictionary raises `KeyError`." },
    { t: "h", text: "else and finally" },
    { t: "p", html: "<p>Two optional extra parts. <code>else</code> runs only if <b>no</b> error happened — a clean place for the \"success\" code. <code>finally</code> runs <b>always</b>, error or not — good for \"clean-up\" jobs like saying goodbye or closing something.</p>" },
    { t: "code", code: c`for text in ["8", "x"]:
    try:
        n = int(text)
    except ValueError:
        print(text, "-> not a number")
    else:
        print(text, "-> doubled is", n * 2)
    finally:
        print("checked", text)` },
    { t: "table", head: ["Part", "Runs when"], rows: [["`try`", "always (first)"], ["`except X`", "an error of type X happened"], ["`else`", "no error happened"], ["`finally`", "always, at the end — even after return"]] },
    { t: "check", q: "The user types `abc`. Which lines are printed?", code: c`try:
    n = int(input())
except ValueError:
    print("bad")
else:
    print("good")
finally:
    print("end")`, o: ["`bad`", "`bad` then `end`", "`good` then `end`"], a: 1, e: "The error sends Python to `except` (bad); `else` is skipped because there **was** an error; `finally` always runs (end)." },
    { t: "h", text: "Ask until valid — the robust way" },
    { t: "viz", code: c`while True:
    try:
        n = int(input("Pick 1-10: "))
        if 1 <= n <= 10:
            break
        print("Out of range")
    except ValueError:
        print("Digits only")
print("You picked", n)`, stdin: "abc\n42\n7", before: "<p>Combine a <code>while True</code> loop (Day 8) with try/except: keep asking until the answer is a number <b>and</b> in range. The Input box answers <code>abc</code>, then <code>42</code>, then <code>7</code>. Visualize to watch each round.</p>" },
    { t: "h", text: "Raising your own errors" },
    { t: "p", html: "<p>Sometimes <b>you</b> know a value is wrong even though Python doesn't — a mark of 150, a negative price. <code>raise</code> creates an error on purpose. The function reports the problem, and the code that called it decides what to do.</p>" },
    { t: "code", code: c`def set_mark(mark):
    if not 0 <= mark <= 100:
        raise ValueError(f"mark must be 0-100, got {mark}")
    return mark

try:
    set_mark(150)
except ValueError as e:
    print("Problem:", e)` },
    { t: "ar", html: "raise تُطلق خطأ عن قصد عندما تكون القيمة غير منطقية، مثل درجة 150. الدالة تبلّغ عن المشكلة، ومن استدعاها يقرر ماذا يفعل." },
    { t: "check", q: "What does this print?", code: c`def check_age(age):
    if age < 0:
        raise ValueError("negative age")
    return age

try:
    print(check_age(-3))
except ValueError as e:
    print("Error:", e)`, o: ["`-3`", "`Error: negative age`", "Nothing — the program crashes"], a: 1, e: "`raise` stops the function before `return`. The caller's `except` catches the error and prints its message." },
    { t: "h", text: "Files: memory that survives" },
    { t: "p", html: "<p>When your program ends, all its variables disappear. Your quiz scores, your to-do list, your diary — gone. To remember things until next time, a program writes them into a <b>file</b>, and reads them back on the next run.</p>" },
    { t: "analogy", title: "A file is a notebook on the shelf", html: "<p>Variables are like notes on a whiteboard: wiped when the lesson ends. A file is a notebook on the shelf: you <b>open</b> it, <b>write</b> or <b>read</b>, and <b>close</b> it, and it is still there tomorrow. <code>\"w\"</code> starts a fresh notebook (tearing out the old pages!), <code>\"a\"</code> adds at the end, <code>\"r\"</code> only reads.</p>" },
    { t: "code", code: c`with open("notes.txt", "w") as f:
    f.write("Day 17: files\n")
    f.write("with closes the file for me\n")

with open("notes.txt") as f:
    print(f.read())` },
    { t: "lines", title: "Read it like a programmer", rows: [
      ["with open(\"notes.txt\", \"w\") as f:", "Open (or create) <code>notes.txt</code> for <b>writing</b> and call it <code>f</code>. <code>with</code> closes the file automatically when the block ends."],
      ["    f.write(\"Day 17: files\\n\")", "Write text into the file. Unlike <code>print</code>, <code>write</code> adds <b>no</b> new line — the <code>\\n</code> does that."],
      ["with open(\"notes.txt\") as f:", "No mode means <code>\"r\"</code>: open for <b>reading</b>."],
      ["    print(f.read())", "<code>f.read()</code> returns the whole file as one string."]] },
    { t: "ar", html: "with open تفتح الملف وتغلقه تلقائيًا. الوضع \"w\" يمسح الملف ويكتب من جديد، و\"a\" يضيف في النهاية، و\"r\" للقراءة فقط وهو الافتراضي." },
    { t: "code", code: c`with open("notes.txt", "w") as f:
    f.write("line one\nline two\n")

with open("notes.txt", "a") as f:
    f.write("appended line\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())`, before: "<p>Now append, then read line by line. A <code>for</code> loop over a file gives one line at a time.</p>", note: "<p>Each line from the file ends with <code>\\n</code>; <code>.strip()</code> removes it, otherwise <code>print</code> would add an empty line after each one.</p>" },
    { t: "table", head: ["Mode", "Meaning"], rows: [["`\"r\"`", "read (default) — error if the file doesn't exist"], ["`\"w\"`", "write — creates or **erases** the file"], ["`\"a\"`", "append — adds to the end"]] },
    { t: "p", html: "<p>In Py30 files live in the browser's memory while Python is running; on your own computer they are real files next to your program.</p>" },
    { t: "check", q: "What does this print?", code: c`with open("t.txt", "w") as f:
    f.write("A\n")
with open("t.txt", "w") as f:
    f.write("B\n")
with open("t.txt") as f:
    print(f.read().strip())`, o: ["`A`", "`B`", "`A` and `B`"], a: 1, e: "The second `\"w\"` erased the file before writing B. To keep A, open with `\"a\"`.", ar: "انتبه{{g:|ي}}: الوضع \"w\" يمسح المحتوى القديم." },
    { t: "h", text: "CSV: tables in text" },
    { t: "p", html: "<p>A CSV file (comma-separated values) is a table saved as text: one row per line, columns separated by commas. Excel and Google Sheets open it. The <code>csv</code> module reads and writes it for you.</p>" },
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
print("Average:", total / 3)`, before: "<p>Two halves. <b>Writing</b>: <code>csv.writer(f)</code> makes a writer for the open file, and <code>writerows</code> writes a list of rows (each row is a list); <code>newline=\"\"</code> is the recommended setting for CSV files (it stops extra empty lines on Windows). <b>Reading</b>: <code>csv.DictReader(f)</code> gives the rows one by one.</p>", note: "<p><code>DictReader</code> turns each row into a dictionary using the header line. Every value is read as a <b>string</b>, so convert numbers with <code>int()</code>.</p>" },
    { t: "steps", title: "A scores file that survives", problem: "<p>Build two functions for a quiz game: <code>save_score(name, score)</code> adds a line to <code>quiz_scores.txt</code>, and <code>best_score()</code> returns the best <code>(name, score)</code> pair — or <code>None</code> if there is no file yet. Bad lines in the file must not crash it.</p>", steps: [
      { html: "<p><b>Choose the format.</b> One score per line: <code>Sara,95</code>. Easy to write, easy to split.</p>" },
      { html: "<p><b>Saving</b> must keep old scores, so use mode <code>\"a\"</code> and end each line with <code>\\n</code>.</p>", code: c`def save_score(name, score):
    with open("quiz_scores.txt", "a") as f:
        f.write(f"{name},{score}\n")` },
      { html: "<p><b>Reading</b> can fail if the file doesn't exist yet: catch <code>FileNotFoundError</code> and return <code>None</code>.</p>", code: c`try:
    with open("quiz_scores.txt") as f:
        lines = f.readlines()
except FileNotFoundError:
    return None` },
      { html: "<p><b>Find the best</b>: split each line at the comma and convert the score with <code>int()</code>. A broken line (no comma, or a score like <code>absent</code>) raises <code>ValueError</code> — skip it with <code>continue</code>.</p>" },
      { html: "<p><b>Test</b>: no file → None; after three saves (one of them broken) → the best one.</p>" }],
      code: c`def save_score(name, score):
    with open("quiz_scores.txt", "a") as f:
        f.write(f"{name},{score}\n")

def best_score():
    try:
        with open("quiz_scores.txt") as f:
            lines = f.readlines()
    except FileNotFoundError:
        return None
    best = None
    for line in lines:
        try:
            name, score = line.strip().split(",")
            score = int(score)
        except ValueError:
            continue
        if best is None or score > best[1]:
            best = (name, score)
    return best

print(best_score())
save_score("Sara", 95)
save_score("Omar", "absent")
save_score("Lina", 88)
print(best_score())`, ar: "الملف يحفظ البيانات بعد انتهاء البرنامج، و try/except تحمي البرنامج من ملف غير موجود أو سطر تالف." },
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
    { title: "Putting too much inside try", html: "Keep only the risky line in <code>try</code>. Otherwise an error from a different line is caught by mistake and you get the wrong message.", wrong: c`try:
    n = int(text)
    print(100 / n)
    print(results[n])
except ValueError:
    print("Not a number")`, right: c`try:
    n = int(text)
except ValueError:
    print("Not a number")
else:
    print(100 / n)`, ar: "ضع{{g:|ي}} داخل try السطر الخطِر فقط، وضع{{g:|ي}} الباقي في else." },
  ],
  tricks: [
    { title: "print into a file", html: "<code>file=f</code> sends <code>print</code> output into a file — with spaces and new lines added for you.", code: c`with open("out.txt", "w") as f:
    print("Hello file", 2026, file=f)
with open("out.txt") as f:
    print(f.read())` },
    { title: "JSON saves dicts and lists", html: "<code>json</code> turns a dictionary or list into text and back — the easiest way to save program data.", code: c`import json
data = {"name": "{{name}}", "scores": [95, 88]}
with open("data.json", "w") as f:
    json.dump(data, f)
with open("data.json") as f:
    print(json.load(f)["scores"])` },
    { title: "Check if a file exists first", html: "<code>os.path.exists</code> answers True or False without opening the file.", code: c`import os
print(os.path.exists("nothing_here.txt"))` },
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
    { t: "predict", code: c`for v in ["4", "0", "x"]:
    try:
        print(12 / int(v))
    except ValueError:
        print("bad text")
    except ZeroDivisionError:
        print("zero")`, explain: "<code>12 / 4</code> = <code>3.0</code>; <code>\"0\"</code> converts fine but dividing by it gives <code>zero</code>; <code>\"x\"</code> fails in <code>int()</code>, so <code>bad text</code>." },
    { t: "predict", code: c`with open("a.txt", "w") as f:
    f.write("one\n")
with open("a.txt", "a") as f:
    f.write("two\n")
with open("a.txt") as f:
    print(len(f.readlines()))`, explain: "Mode <code>\"a\"</code> adds to the end, so the file has two lines: <code>2</code>." },
    { t: "parsons", title: "Save and count", prompt: "Write three names to a file, then read it back and print how many lines it has.", lines: [c`with open("names.txt", "w") as f:`, c`    f.write("Sara\nOmar\nLina\n")`, c`with open("names.txt") as f:`, "    lines = f.readlines()", "print(len(lines))"], distractors: [c`with open("names.txt", "a") as f:`], explain: "Result: <code>3</code>." },
    { t: "parsons", title: "Safe division", prompt: "Build a program that divides 100 by the user's number and handles both bad text and zero.", lines: ["try:", "    n = int(input())", "    print(100 / n)", "except ValueError:", "    print(\"Type a number\")", "except ZeroDivisionError:", "    print(\"Not zero!\")"], explain: "One try, two except blocks — one for each kind of problem." },
    { t: "try", title: "Diary", html: "<p>A tiny diary: each run appends the Input line to <code>diary.txt</code> and shows all entries. Run it several times with different inputs.</p>", code: c`entry = input("Today's entry: ")
with open("diary.txt", "a") as f:
    f.write(entry + "\n")
with open("diary.txt") as f:
    print(f.read())`, stdin: "Learned try/except today" },
    { t: "try", title: "Robust bill splitter", html: "<p>Run it, then change the number of people in the Input box to <code>0</code>, then to <code>abc</code>: it crashes. Add try/except so it prints a friendly message instead. Then try a loop that asks again.</p>", code: c`total = float(input("Bill: "))
people = int(input("People: "))
print("Each pays", round(total / people, 2))`, stdin: "120\n4" },
  ],
  exercises: [
    { id: "safeint", lvl: "seed", title: "to_int(text)", prompt: "<p>Write <code>to_int(text)</code> that returns the integer, or <code>None</code> if the text is not a valid whole number.</p>", starter: "def to_int(text):\n    pass\n", tests: [{ after: "print(to_int('42'), to_int('abc'), to_int('3.5'), to_int(' 7 '))", expected: "42 None None 7" }],
      hint: "<code>try: return int(text)</code> and <code>except ValueError: return None</code>.",
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
      hint: "A <code>while True</code> loop; inside it, <code>try: nums.append(float(line))</code> with <code>except ValueError</code>.",
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
      hint: "Read the whole text with <code>f.read()</code>. Lines: <code>len(text.splitlines())</code>; words: <code>len(text.split())</code>; characters: <code>len(text)</code>.",
      solutions: [{ name: "Read all", code: c`def file_stats(path):
    try:
        with open(path) as f:
            text = f.read()
    except FileNotFoundError:
        return None
    return (len(text.splitlines()), len(text.split()), len(text))` }] },
    { id: "log", lvl: "star", title: "Append to a log", prompt: "<p>Write <code>add_log(path, message)</code> that appends <code>message</code> as a new line, and <code>read_log(path)</code> that returns the list of lines (without <code>\\n</code>), or an empty list if the file is missing.</p>", starter: "def add_log(path, message):\n    pass\n\ndef read_log(path):\n    pass\n", tests: [{ after: "import os\nif os.path.exists('app.log'): os.remove('app.log')\nprint(read_log('app.log'))\nadd_log('app.log', 'start')\nadd_log('app.log', 'login Sara')\nprint(read_log('app.log'))", expected: "[]\n['start', 'login Sara']" }],
      hint: "Mode <code>\"a\"</code> for adding. <code>f.read().splitlines()</code> gives the lines without <code>\\n</code>.",
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
      hint: "Use <code>csv.DictReader</code>; collect marks per course in a dict of lists; skip bad marks with <code>try</code> / <code>except ValueError: continue</code>.",
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
      hint: "Two guard <code>if</code>s with <code>raise ValueError(\"...\")</code>, then <code>return balance - amount</code>.",
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
    { id: "safediv17", lvl: "star", title: "safe_divide(a, b)", prompt: "<p>Write <code>safe_divide(a, b)</code> that returns <code>a / b</code> rounded to 2 decimals. If b is zero return the text <code>\"undefined\"</code>; if a value is not a number (e.g. a string) return <code>\"invalid\"</code>.</p>", starter: "def safe_divide(a, b):\n    pass\n", tests: [{ after: "print(safe_divide(10, 4), safe_divide(1, 3))", expected: "2.5 0.33" }, { after: "print(safe_divide(5, 0), safe_divide(5, 'x'))", expected: "undefined invalid" }],
      hint: "<code>try: return round(a / b, 2)</code>, then <code>except ZeroDivisionError</code> and <code>except TypeError</code>.", ar: "قسمة رقم على نص تعطي TypeError، والقسمة على صفر تعطي ZeroDivisionError.",
      solutions: [{ name: "Two excepts", code: c`def safe_divide(a, b):
    try:
        return round(a / b, 2)
    except ZeroDivisionError:
        return "undefined"
    except TypeError:
        return "invalid"` }] },
  ],
  quiz: [
    { q: "When does `finally` run?", o: ["Only on error", "Only without error", "Always", "Never after return"], a: 2, e: "Always, even after return." },
    { q: "`int(\"12a\")` raises…", o: ["TypeError", "ValueError", "NameError", "KeyError"], a: 1, e: "Right type (str), wrong content." },
    { q: "Which mode adds to the end of a file?", o: ["`\"r\"`", "`\"w\"`", "`\"a\"`", "`\"x\"`"], a: 2, e: "Append." },
    { q: "Why use `with open(...)`?", o: ["It's faster", "It closes the file automatically", "It reads CSV", "It's required"], a: 1, e: "Even if an error happens." },
    { q: "Values read from a CSV file are…", o: ["numbers", "strings", "lists", "auto-detected"], a: 1, e: "Convert them yourself." },
    { q: "What does this print?", code: c`try:
    x = int("7")
except ValueError:
    print("bad")
else:
    print(x * 2)`, o: ["`bad`", "`14`", "`77`", "Nothing"], a: 1, e: "No error happened, so `else` runs: 7 × 2 = 14." },
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
  remember: [
    "`try:` runs risky code; `except SomeError:` runs only if that error happens — then the program continues.",
    "Catch **specific** errors (`ValueError`, `ZeroDivisionError`, `FileNotFoundError`…), never a bare `except:`.",
    "`else` runs when there was no error; `finally` runs always. `except ValueError as e` gives the message.",
    "`raise ValueError(\"message\")` reports a problem; the caller decides what to do.",
    "`with open(path, mode) as f:` — `\"r\"` read, `\"w\"` write (erases!), `\"a\"` append. `write` adds no `\\n`.",
    "CSV values are always strings: convert with `int()` / `float()`.",
  ],
  rememberAr: "استخدم{{g:|ي}} try و except مع نوع خطأ محدد حتى لا يتوقف البرنامج. افتح{{g:|ي}} الملفات بـ with، وتذكّر{{g:|ي}} أن \"w\" يمسح و\"a\" يضيف.",
};
})();

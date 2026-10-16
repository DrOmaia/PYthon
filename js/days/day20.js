window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[20] = {
  title: "Review + project: Grades Manager",
  intro: "Functions, modules, error handling, files, classes, inheritance — this week gave you the tools of real software. Today you build a small but real application, milestone by milestone: a <b>Grades Manager</b> that an instructor could actually use.",
  introAr: "اليوم نبني تطبيقًا حقيقيًا: مدير درجات لمقرر دراسي. نستخدم الكلاسات والدوال ومعالجة الأخطاء والملفات، ونبنيه على أربع مراحل، ونختبر كل مرحلة قبل الانتقال للتي بعدها.",
  goals: ["Recall the key idea of each lesson of Week 3", "Design classes for a real problem", "Build and test an application in milestones", "Validate data with exceptions", "Save and load data with CSV", "Write a command loop (a tiny text interface)"],
  learn: [
    { t: "h", text: "Week 3 recap" },
    { t: "p", html: "<p>This week changed how you write programs, {{name}}. In Weeks 1–2 you wrote code from top to bottom. This week you learned to <b>organize</b> it: functions for actions, modules for tools, exceptions for problems, files for memory, and classes for things. Before the project, spend ten minutes on this recap — one small example and one quick check per day. If a check feels hard, open that day again for five minutes; it's time well spent.</p>" },

    { t: "h", text: "Day 15 — Functions" },
    { t: "p", html: "<p>A function is a named block of code you write once and call many times. Parameters bring information in; <code>return</code> sends a result back to the caller. Remember the biggest beginner trap: <code>print</code> only <i>shows</i> a value, while <code>return</code> <i>gives it back</i> so the program can keep using it. Variables created inside a function are local — they disappear when it ends.</p>" },
    { t: "code", code: c`def total_price(price, qty=1):
    return price * qty

bill = total_price(18, 2) + total_price(6)
print(bill)` },
    { t: "check", q: "What does this print?", code: c`def double(x):
    print(x * 2)

y = double(3)
print(y)`, o: ["`6` then `6`", "`6` then `None`", "`None` then `6`", "An error"], a: 1, e: "`double` prints 6 but returns nothing, so `y` is `None`. Use `return` when the caller needs the value.", hint: "Does `double` have a `return`?" },

    { t: "h", text: "Day 16 — Modules, lambda and recursion" },
    { t: "p", html: "<p><code>import</code> opens Python's toolbox: <code>math</code>, <code>random</code>, <code>datetime</code>, <code>statistics</code>. Functions are values, so you can pass one to another — like <code>key=</code> in <code>sorted</code> — and <code>lambda</code> writes a tiny one in a single line. A recursive function calls itself and must have a <b>base case</b> that stops it.</p>" },
    { t: "code", code: c`import math
students = [("Sara", 95), ("Omar", 82), ("Lina", 90)]
print(sorted(students, key=lambda s: s[1]))
print(math.sqrt(81))` },
    { t: "check", q: "What does this print?", code: c`words = ["kiwi", "fig", "banana"]
print(sorted(words, key=len))`, o: ["`['banana', 'fig', 'kiwi']`", "`['fig', 'kiwi', 'banana']`", "`['kiwi', 'fig', 'banana']`", "`[3, 4, 6]`"], a: 1, e: "`key=len` sorts by length: fig (3), kiwi (4), banana (6). The words themselves are returned, not the lengths.", hint: "`key=len` means: compare the words by their length." },

    { t: "h", text: "Day 17 — Errors and files" },
    { t: "p", html: "<p><code>try</code>/<code>except</code> lets your program survive bad input instead of crashing; always catch a <b>specific</b> error like <code>ValueError</code>. <code>raise</code> creates your own error when data breaks a rule. Files are opened with <code>with open(path, mode)</code>: <code>\"r\"</code> reads, <code>\"w\"</code> erases and writes, <code>\"a\"</code> adds to the end, and the <code>csv</code> module handles tables.</p>" },
    { t: "code", code: c`def to_mark(text):
    mark = int(text)
    if not 0 <= mark <= 100:
        raise ValueError("mark must be 0-100")
    return mark

for t in ["88", "abc", "120"]:
    try:
        print(to_mark(t))
    except ValueError as e:
        print("Error:", e)` },
    { t: "check", q: "What does this print?", code: c`try:
    n = int("12a")
    print("A")
except ValueError:
    print("B")
print("C")`, o: ["`A` `C`", "`B` `C`", "`A` `B` `C`", "Only `B`"], a: 1, e: "`int(\"12a\")` fails, so Python jumps straight to `except` (A is skipped), prints B, and then continues normally with C.", hint: "When a line inside `try` fails, the rest of the `try` block is skipped." },

    { t: "h", text: "Day 18 — Classes and objects" },
    { t: "p", html: "<p>A class is a blueprint; each object built from it has its own data. <code>__init__</code> runs automatically when an object is created, <code>self</code> means \"this object\", attributes store data (<code>self.name</code>), methods are functions inside the class, and <code>__str__</code> returns the text <code>print</code> shows.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []

    def __str__(self):
        return f"{self.name}: {len(self.marks)} marks"

s = Student("{{name}}")
s.marks.append(91)
print(s)` },
    { t: "check", q: "What does this print?", code: c`class Box:
    def __init__(self):
        self.items = 0
    def add(self):
        self.items += 1

a = Box()
b = Box()
a.add()
a.add()
b.add()
print(a.items, b.items)`, o: ["`3 3`", "`2 1`", "`1 2`", "`0 0`"], a: 1, e: "Each object has its own `items` attribute: `a` was changed twice, `b` once.", hint: "`self.items` belongs to one object." },

    { t: "h", text: "Day 19 — Inheritance and polymorphism" },
    { t: "p", html: "<p><code>class Child(Parent):</code> gives the child everything the parent has. The child can add methods, extend <code>__init__</code> with <code>super().__init__(...)</code>, and override methods by defining them again. Polymorphism means one loop can call the same method on different kinds of objects. Use inheritance for <b>is-a</b>, composition for <b>has-a</b>.</p>" },
    { t: "code", code: c`class Member:
    def fee(self):
        return 150

class StudentMember(Member):
    def fee(self):
        return super().fee() - 50

for m in [Member(), StudentMember()]:
    print(m.fee())` },
    { t: "check", q: "What does this print?", code: c`class A:
    def name(self):
        return "A"

class B(A):
    def name(self):
        return "B" + super().name()

print(B().name())`, o: ["`A`", "`B`", "`BA`", "`AB`"], a: 2, e: "B overrides `name` and adds the parent's result after its own letter: `B` + `A`.", hint: "What does `super().name()` return?" },
    { t: "ar", html: "قبل المشروع: راجع{{g:|ي}} كل يوم من أيام الأسبوع بمثال صغير وسؤال سريع. إذا كان سؤال صعبًا، افتح{{g:|ي}} درس ذلك اليوم خمس دقائق." },

    { t: "h", text: "Week 3 in one table" },
    { t: "table", head: ["Day", "Tool", "Remember"], rows: [["15", "functions", "`def`, parameters, `return` ≠ `print`, local scope"], ["16", "modules, lambda, recursion", "`import`, `key=`, base case"], ["17", "errors and files", "`try/except X`, `raise`, `with open`, modes r/w/a, csv"], ["18", "classes", "`__init__`, `self.attr`, methods, `__str__`"], ["19", "inheritance", "`class B(A)`, `super()`, overriding, polymorphism"]] },

    { t: "h", text: "Project: design before code" },
    { t: "p", html: "<p><b>Requirements:</b> an instructor wants to register students, record marks (0–100), see statistics (average, top student, letter-grade distribution), and save everything to a file to continue next time.</p><p><b>Design:</b> one class <code>Course</code> holding a dictionary <code>{student name: [marks]}</code>. Methods for each requirement. Invalid actions <b>raise</b> errors; the interface catches them and shows friendly messages. That split — logic that raises, interface that talks to the user — is how professional apps are organized.</p>" },
    { t: "static", code: c`Course
 ├─ code, students {name: [marks]}
 ├─ add_student(name)        raises ValueError if duplicate
 ├─ add_mark(name, mark)     raises KeyError / ValueError
 ├─ average(name) / class_average()
 ├─ top_student()
 ├─ distribution()           {"A": 2, "B": 1, ...}
 ├─ save(path) / load(path)  CSV: name,mark
 └─ command loop: add / mark / report / quit` },
    { t: "ar", html: "قاعدة مهمة: الكلاس لا يطبع ولا يقرأ من المستخدم، فقط يحسب ويرفع أخطاء. واجهة الأوامر هي التي تطبع وتلتقط الأخطاء. هذا الفصل يجعل الكود قابلًا للاختبار وإعادة الاستخدام." },
    { t: "p", html: "<p>Before you start the milestones, watch the same pattern on a smaller problem. The worked example below is <i>not</i> the Grades Manager, but it is built exactly the way you will build yours.</p>" },
    { t: "steps", title: "Attendance tracker (logic raises, interface catches)", problem: "<p>A teacher runs 4 lessons. She wants to register students, mark a student present, and see each student's attendance rate. Wrong actions (unknown student, registering twice) must show a friendly error, never crash.</p>", steps: [
      { html: "<p><b>Understand and design.</b> One class <code>Attendance</code>. It knows the number of lessons and a dictionary <code>name → times present</code>. Its methods never print — they <code>raise</code> when something is wrong.</p>" },
      { html: "<p><b>Set up and register.</b> <code>__init__</code> stores the data; <code>add_student</code> refuses duplicates.</p>", code: c`class Attendance:
    def __init__(self, lessons):
        self.lessons = lessons
        self.present = {}

    def add_student(self, name):
        if name in self.present:
            raise ValueError(f"{name} already registered")
        self.present[name] = 0` },
      { html: "<p><b>Mark and calculate.</b> <code>mark</code> raises <code>KeyError</code> for an unknown name; <code>rate</code> returns a percentage.</p>", code: c`    def mark(self, name):
        if name not in self.present:
            raise KeyError(name)
        self.present[name] += 1

    def rate(self, name):
        return round(self.present[name] / self.lessons * 100)` },
      { html: "<p><b>The interface.</b> A loop over commands (here a list, in the project <code>input()</code>). The <code>try</code> wraps each command; each <code>except</code> turns an error into a friendly message.</p>", code: c`for line in commands:
    cmd, name = line.split()
    try:
        ...
    except KeyError:
        print("Error: no student", name)
    except ValueError as e:
        print("Error:", e)` },
      { html: "<p><b>Test everything</b>, including the commands that should fail. Then print the report.</p>" },
    ], code: c`class Attendance:
    def __init__(self, lessons):
        self.lessons = lessons
        self.present = {}

    def add_student(self, name):
        if name in self.present:
            raise ValueError(f"{name} already registered")
        self.present[name] = 0

    def mark(self, name):
        if name not in self.present:
            raise KeyError(name)
        self.present[name] += 1

    def rate(self, name):
        return round(self.present[name] / self.lessons * 100)

att = Attendance(4)
commands = ["add Sara", "add Omar", "mark Sara", "mark Sara", "mark Ali", "add Sara", "mark Omar", "mark Sara"]
for line in commands:
    cmd, name = line.split()
    try:
        if cmd == "add":
            att.add_student(name)
        else:
            att.mark(name)
        print("OK:", line)
    except KeyError:
        print("Error: no student", name)
    except ValueError as e:
        print("Error:", e)

for name in att.present:
    print(f"{name}: {att.rate(name)}%")`, ar: "نفس طريقة المشروع: الكلاس يحسب ويرفع الأخطاء فقط، والحلقة الخارجية تلتقط الأخطاء وتطبع رسالة لطيفة." },
  ],
  practice: [
    { t: "predict", code: c`def safe(f, x):
    try:
        return f(x)
    except Exception as e:
        return type(e).__name__

print(safe(int, "7"), safe(int, "x"), safe(len, 5))`, explain: "<code>7 ValueError TypeError</code> — functions passed as values plus exception handling." },
    { t: "predict", code: c`class Base:
    count = 0
    def __init__(self):
        Base.count += 1
class Child(Base):
    pass
Base(); Child(); Child()
print(Base.count)`, explain: "Child uses Base's <code>__init__</code>, so all three increase the shared counter: <code>3</code>." },
    { t: "predict", code: c`def letter(avg):
    for cut, g in ((90, "A"), (80, "B"), (70, "C"), (60, "D")):
        if avg >= cut:
            return g
    return "F"

print(letter(95), letter(80), letter(79.9), letter(12))`, explain: "<code>return</code> leaves the function at the first cut that matches: 95 → <code>A</code>, 80 → <code>B</code> (80 >= 80), 79.9 → <code>C</code>, 12 matches nothing → <code>F</code>. You will use this in Milestone 2." },
    { t: "predict", code: c`marks = {"Sara": [90, 80], "Omar": [], "Lina": [70]}
graded = [n for n, m in marks.items() if m]
print(graded)
print(max(graded, key=lambda n: sum(marks[n]) / len(marks[n])))`, explain: "The comprehension keeps only students with marks (an empty list counts as False): <code>['Sara', 'Lina']</code>. Then <code>max</code> with a <code>key</code> picks the best average: <code>Sara</code> (85 vs 70)." },
    { t: "parsons", title: "Catch, don't crash", prompt: "Arrange the lines so a bad mark prints <code>Error: mark must be 0-100</code> instead of crashing.", lines: ["def check(mark):", "    if not 0 <= mark <= 100:", "        raise ValueError(\"mark must be 0-100\")", "try:", "    check(120)", "except ValueError as e:", "    print(\"Error:\", e)"], distractors: ["        print(\"mark must be 0-100\")"], explain: "The logic function <b>raises</b>; the interface code <b>catches</b> and prints. That is the Grades Manager design in seven lines." },
  ],
  exercises: [
    { id: "m1", lvl: "seed", title: "Milestone 1: Course basics", prompt: "<p>Create <code>class Course(code)</code> with a <code>students</code> dict. Methods:</p><ul><li><code>add_student(name)</code> — raise <code>ValueError(\"NAME already registered\")</code> for duplicates</li><li><code>add_mark(name, mark)</code> — raise <code>KeyError(name)</code> if unknown, <code>ValueError(\"mark must be 0-100\")</code> if invalid</li><li><code>average(name)</code> — rounded to 1 decimal, 0 if no marks</li></ul>", starter: "class Course:\n    pass\n", tests: [{ after: "c = Course('IS201')\nc.add_student('Sara'); c.add_student('Omar')\nc.add_mark('Sara', 90); c.add_mark('Sara', 85)\nprint(c.average('Sara'), c.average('Omar'))\nfor action in (lambda: c.add_student('Sara'), lambda: c.add_mark('Ali', 50), lambda: c.add_mark('Omar', 120)):\n    try:\n        action()\n    except (KeyError, ValueError) as e:\n        print(type(e).__name__, e)", expected: "87.5 0\nValueError Sara already registered\nKeyError 'Ali'\nValueError mark must be 0-100" }],
      solutions: [{ name: "Course v1", code: c`class Course:
    def __init__(self, code):
        self.code = code
        self.students = {}

    def add_student(self, name):
        if name in self.students:
            raise ValueError(f"{name} already registered")
        self.students[name] = []

    def add_mark(self, name, mark):
        if name not in self.students:
            raise KeyError(name)
        if not 0 <= mark <= 100:
            raise ValueError("mark must be 0-100")
        self.students[name].append(mark)

    def average(self, name):
        marks = self.students[name]
        return round(sum(marks) / len(marks), 1) if marks else 0` }] },
    { id: "m2", lvl: "star", title: "Milestone 2: Statistics", prompt: "<p>Extend the class (copy your Milestone 1 code) with:</p><ul><li><code>class_average()</code> — average of all student averages (students with marks only), 1 decimal</li><li><code>top_student()</code> — name with the highest average (<code>None</code> if nobody has marks)</li><li><code>distribution()</code> — dict of letters A/B/C/D/F (90/80/70/60) based on each student's average, only letters that occur, in A→F order</li></ul>", starter: "class Course:\n    pass\n", tests: [{ after: "c = Course('CS101')\nfor n, ms in [('Sara', [95, 91]), ('Omar', [70, 80]), ('Lina', [88]), ('Nora', [40, 55]), ('New', [])]:\n    c.add_student(n)\n    for m in ms: c.add_mark(n, m)\nprint(c.class_average(), c.top_student())\nprint(c.distribution())", expected: "75.9 Sara\n{'A': 1, 'B': 1, 'C': 1, 'F': 1}" }],
      solutions: [{ name: "Course v2", code: c`class Course:
    def __init__(self, code):
        self.code = code
        self.students = {}

    def add_student(self, name):
        if name in self.students:
            raise ValueError(f"{name} already registered")
        self.students[name] = []

    def add_mark(self, name, mark):
        if name not in self.students:
            raise KeyError(name)
        if not 0 <= mark <= 100:
            raise ValueError("mark must be 0-100")
        self.students[name].append(mark)

    def average(self, name):
        marks = self.students[name]
        return round(sum(marks) / len(marks), 1) if marks else 0

    def _graded(self):
        return [n for n, m in self.students.items() if m]

    def class_average(self):
        avgs = [sum(self.students[n]) / len(self.students[n]) for n in self._graded()]
        return round(sum(avgs) / len(avgs), 1) if avgs else 0

    def top_student(self):
        graded = self._graded()
        return max(graded, key=self.average) if graded else None

    @staticmethod
    def letter(avg):
        for cut, g in ((90, "A"), (80, "B"), (70, "C"), (60, "D")):
            if avg >= cut:
                return g
        return "F"

    def distribution(self):
        counts = {}
        for n in self._graded():
            g = self.letter(self.average(n))
            counts[g] = counts.get(g, 0) + 1
        return {g: counts[g] for g in "ABCDF" if g in counts}`, note: "<code>_graded</code> starts with <code>_</code>: a convention meaning \"internal helper\". <code>@staticmethod</code> marks a method that doesn't need <code>self</code>." }] },
    { id: "m3", lvl: "star", title: "Milestone 3: Save and load", prompt: "<p>Add <code>save(path)</code> writing a CSV with header <code>name,mark</code> and one row per mark (students without marks get a row with an empty mark), and a function <code>load_course(code, path)</code> returning a new Course built from such a file.</p>", starter: "import csv\n\nclass Course:\n    pass\n\ndef load_course(code, path):\n    pass\n", tests: [{ after: "c = Course('IS201')\nc.add_student('Sara'); c.add_student('Omar'); c.add_student('Lina')\nc.add_mark('Sara', 90); c.add_mark('Sara', 80); c.add_mark('Omar', 70)\nc.save('is201.csv')\nprint(open('is201.csv').read().strip())\nd = load_course('IS201', 'is201.csv')\nprint(d.students)", expected: "name,mark\nSara,90\nSara,80\nOmar,70\nLina,\n{'Sara': [90, 80], 'Omar': [70], 'Lina': []}" }],
      solutions: [{ name: "csv module", code: c`import csv

class Course:
    def __init__(self, code):
        self.code = code
        self.students = {}

    def add_student(self, name):
        if name in self.students:
            raise ValueError(f"{name} already registered")
        self.students[name] = []

    def add_mark(self, name, mark):
        if name not in self.students:
            raise KeyError(name)
        if not 0 <= mark <= 100:
            raise ValueError("mark must be 0-100")
        self.students[name].append(mark)

    def save(self, path):
        with open(path, "w", newline="") as f:
            w = csv.writer(f, lineterminator="\n")
            w.writerow(["name", "mark"])
            for name, marks in self.students.items():
                if not marks:
                    w.writerow([name, ""])
                for m in marks:
                    w.writerow([name, m])

def load_course(code, path):
    course = Course(code)
    with open(path) as f:
        for row in csv.DictReader(f):
            if row["name"] not in course.students:
                course.add_student(row["name"])
            if row["mark"]:
                course.add_mark(row["name"], int(row["mark"]))
    return course`, note: "Loading reuses <code>add_student</code>/<code>add_mark</code>, so file data is validated by the same rules as typed data." }] },
    { id: "m4", lvl: "fire", title: "Milestone 4: Command interface", prompt: "<p>Write the user interface. Read commands until <code>quit</code>:</p><ul><li><code>add NAME</code> → <code>Added NAME</code></li><li><code>mark NAME MARK</code> → <code>OK</code></li><li><code>avg NAME</code> → <code>NAME: X</code></li><li><code>top</code> → <code>Top: NAME</code></li><li>anything else → <code>Unknown command</code></li></ul><p>Errors must print <code>Error: MESSAGE</code> instead of crashing (for an unknown student: <code>Error: no student NAME</code>; for a non-numeric mark: <code>Error: mark must be a number</code>). A minimal Course class is in the starter.</p>", starter: c`class Course:
    def __init__(self):
        self.students = {}
    def add_student(self, name):
        if name in self.students:
            raise ValueError(f"{name} already registered")
        self.students[name] = []
    def add_mark(self, name, mark):
        if name not in self.students:
            raise KeyError(name)
        if not 0 <= mark <= 100:
            raise ValueError("mark must be 0-100")
        self.students[name].append(mark)
    def average(self, name):
        m = self.students[name]
        return round(sum(m) / len(m), 1) if m else 0

course = Course()
# your command loop here
`, tests: [{ stdin: "add Sara\nadd Omar\nmark Sara 90\nmark Sara 85\nmark Omar 101\nmark Ali 50\nmark Omar abc\nadd Sara\navg Sara\ntop\nhello\nquit", expected: "Added Sara\nAdded Omar\nOK\nOK\nError: mark must be 0-100\nError: no student Ali\nError: mark must be a number\nError: Sara already registered\nSara: 87.5\nTop: Sara\nUnknown command" }],
      solutions: [{ name: "Loop + try", code: c`class Course:
    def __init__(self):
        self.students = {}
    def add_student(self, name):
        if name in self.students:
            raise ValueError(f"{name} already registered")
        self.students[name] = []
    def add_mark(self, name, mark):
        if name not in self.students:
            raise KeyError(name)
        if not 0 <= mark <= 100:
            raise ValueError("mark must be 0-100")
        self.students[name].append(mark)
    def average(self, name):
        m = self.students[name]
        return round(sum(m) / len(m), 1) if m else 0

course = Course()
while True:
    parts = input().split()
    if not parts:
        continue
    cmd = parts[0]
    if cmd == "quit":
        break
    try:
        if cmd == "add":
            course.add_student(parts[1])
            print("Added", parts[1])
        elif cmd == "mark":
            try:
                mark = int(parts[2])
            except ValueError:
                raise ValueError("mark must be a number")
            course.add_mark(parts[1], mark)
            print("OK")
        elif cmd == "avg":
            print(f"{parts[1]}: {course.average(parts[1])}")
        elif cmd == "top":
            best = max(course.students, key=course.average)
            print("Top:", best)
        else:
            print("Unknown command")
    except KeyError as e:
        print("Error: no student", e.args[0])
    except ValueError as e:
        print("Error:", e)` }, { name: "Command table", code: c`class Course:
    def __init__(self):
        self.students = {}
    def add_student(self, name):
        if name in self.students:
            raise ValueError(f"{name} already registered")
        self.students[name] = []
    def add_mark(self, name, mark):
        if name not in self.students:
            raise KeyError(name)
        if not 0 <= mark <= 100:
            raise ValueError("mark must be 0-100")
        self.students[name].append(mark)
    def average(self, name):
        m = self.students[name]
        return round(sum(m) / len(m), 1) if m else 0

course = Course()

def do_add(name):
    course.add_student(name)
    return f"Added {name}"

def do_mark(name, mark):
    if not mark.isdigit():
        raise ValueError("mark must be a number")
    course.add_mark(name, int(mark))
    return "OK"

def do_avg(name):
    return f"{name}: {course.average(name)}"

def do_top():
    return "Top: " + max(course.students, key=course.average)

COMMANDS = {"add": do_add, "mark": do_mark, "avg": do_avg, "top": do_top}

while (line := input()) != "quit":
    cmd, *args = line.split()
    handler = COMMANDS.get(cmd)
    if handler is None:
        print("Unknown command")
        continue
    try:
        print(handler(*args))
    except KeyError as e:
        print("Error: no student", e.args[0])
    except ValueError as e:
        print("Error:", e)`, note: "A dictionary of <b>functions</b>: adding a command means writing one function and one dict entry. Remember the Smart Calculator from Day 6? This is the rewrite promised there." }],
      twist: "Combine all four milestones into one program in the Playground and add <code>save</code> and <code>load</code> commands. That's a complete application!" },
    { id: "hunt3", lvl: "fire", debug: true, title: "Week 3 bug hunt", prompt: "<p>Four bugs from four different days. The test should print <code>Sara: 2 marks, best 95</code> and <code>No marks for Omar</code>.</p>", starter: c`class Gradebook:
    def __init__(self):
        marks = {}

    def add(name, mark):
        self.marks.setdefault(name, []).append(mark)

    def summary(self, name):
        try:
            m = self.marks[name]
            print(f"{name}: {len(m)} marks, best {max(m)}")
        except:
            return f"No marks for {name}"`, tests: [{ after: "g = Gradebook()\ng.add('Sara', 80); g.add('Sara', 95)\nprint(g.summary('Sara'))\nprint(g.summary('Omar'))", expected: "Sara: 2 marks, best 95\nNo marks for Omar" }],
      ar: "الأخطاء: self في __init__، و self في add، و print بدل return، و except عامة يجب أن تكون KeyError.",
      solutions: [{ name: "Fixed", code: c`class Gradebook:
    def __init__(self):
        self.marks = {}

    def add(self, name, mark):
        self.marks.setdefault(name, []).append(mark)

    def summary(self, name):
        try:
            m = self.marks[name]
        except KeyError:
            return f"No marks for {name}"
        return f"{name}: {len(m)} marks, best {max(m)}"`, note: "Also moved the <code>return</code> out of <code>try</code> so only the lookup is protected — keep try blocks small." }] },
  ],
  quiz: [
    { q: "Where should input()/print() live in a well-designed app?", o: ["Inside every method", "In the interface layer, not in the logic class", "Nowhere", "Only in __init__"], a: 1, e: "Logic raises, interface talks." },
    { q: "Why build in milestones?", o: ["It's required by Python", "Each step can be tested before the next", "It's faster to type", "To use more files"], a: 1, e: "Small, tested steps." },
    { q: "`except (KeyError, ValueError) as e:` catches…", o: ["only KeyError", "either type", "all errors", "nothing"], a: 1, e: "A tuple of exception types." },
    { q: "A dict mapping command names to functions is useful because…", o: ["it's faster to type if/elif", "adding commands needs no new if-branch", "Python requires it", "it avoids functions"], a: 1, e: "Data-driven dispatch." },
    { q: "`@staticmethod` means…", o: ["the method can't change", "the method doesn't use self", "it's private", "it runs once"], a: 1, e: "No object needed." },
  ],
  puzzle: { title: "Refactor riddle", q: "<p>How many lines does this print?</p>", code: c`def gen(n):
    if n == 0:
        return [""]
    smaller = gen(n - 1)
    return [s + "0" for s in smaller] + [s + "1" for s in smaller]

for s in gen(3):
    print(s)`, answers: ["8"], hint: "gen(1) has 2 strings, gen(2) has 4…", ar: "كل مستوى يضاعف العدد.", e: "Each level doubles the list: 2³ = <b>8</b> binary strings from 000 to 111. Recursion generating all combinations is the basis of many search algorithms." },
  cards: [
    { f: "Logic vs interface", b: "Classes compute and raise errors; the interface reads input, prints and catches errors." },
    { f: "Catch two exception types", b: "`except (KeyError, ValueError) as e:`" },
    { f: "Dispatch table", b: "A dict mapping names to functions, e.g. commands." },
    { f: "Keep try blocks…", b: "Small: only around the line that can fail." },
  ],
  remember: [
    "Functions: `return` gives a value back; `print` only shows it. Variables inside a function are local.",
    "Modules: `import math` / `random` / `datetime`; pass functions as values, e.g. `sorted(x, key=len)`.",
    "Recursion needs a base case that stops it.",
    "Catch specific errors with `try` / `except ValueError as e:`; `raise` your own when data breaks a rule.",
    "`with open(path, \"a\")` adds, `\"w\"` erases first; the `csv` module reads and writes tables.",
    "Classes: `__init__` sets up, `self` is this object, methods act on it, `__str__` returns its print text.",
    "Inheritance: `class B(A):`, `super().__init__(...)`, override by redefining; polymorphism = same call, different behavior.",
    "App design: the logic class raises errors, the interface reads input, prints and catches them.",
  ],
  rememberAr: "هذا الأسبوع تعلمت{{g:|ِ}} تنظيم الكود: دوال، ووحدات، ومعالجة أخطاء، وملفات، وكلاسات ووراثة. وفي التطبيق: الكلاس يحسب ويرفع الأخطاء، والواجهة تطبع وتلتقطها.",
};
})();

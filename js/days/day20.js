window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[20] = {
  title: "Review + project: Grades Manager",
  intro: "Functions, modules, error handling, files, classes, inheritance — this week gave you the tools of real software. Today you build a small but real application, milestone by milestone: a <b>Grades Manager</b> that an instructor could actually use.",
  introAr: "اليوم نبني تطبيقًا حقيقيًا: مدير درجات لمقرر دراسي. نستخدم الكلاسات والدوال ومعالجة الأخطاء والملفات، ونبنيه على أربع مراحل، ونختبر كل مرحلة قبل الانتقال للتي بعدها.",
  goals: ["Design classes for a real problem", "Build and test an application in milestones", "Validate data with exceptions", "Save and load data with CSV", "Write a command loop (a tiny text interface)"],
  learn: [
    { t: "h", text: "Design before code" },
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
    { t: "h", text: "Week 3 in one table" },
    { t: "table", head: ["Day", "Tool", "Remember"], rows: [["15", "functions", "`def`, parameters, `return` ≠ `print`, local scope"], ["16", "modules, lambda, recursion", "`import`, `key=`, base case"], ["17", "errors and files", "`try/except X`, `raise`, `with open`, modes r/w/a, csv"], ["18", "classes", "`__init__`, `self.attr`, methods, `__str__`"], ["19", "inheritance", "`class B(A)`, `super()`, overriding, polymorphism"]] },
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
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[20] = {
  title: "Review + project: Grades Manager",
  intro: "Functions, modules, error handling, files, classes, inheritance — this week gave you the tools of real software. Today you build a small but real application, milestone by milestone: a <b>Grades Manager</b> that an instructor could actually use.",
  introAr: "اليوم نبني تطبيقًا حقيقيًا: مدير درجات لمقرر دراسي. نستخدم الكلاسات والدوال ومعالجة الأخطاء والملفات، ونبنيه على أربع مراحل، ونختبر كل مرحلة قبل الانتقال للتي بعدها.",
  goals: ["Design classes for a real problem", "Build and test an application in milestones", "Validate data with exceptions", "Save and load data with CSV", "Write a command loop (a tiny text interface)"],
  learn: [
    { t: "h", text: "Today's plan: one app, four milestones" },
    { t: "p", html: "<p>Today there are no new big topics. You will use this week's tools to build one real program: a <b>Grades Manager</b>. We build it in four <b>milestones</b> (the exercises below). Each milestone adds one layer and is tested before you move on:</p><ol><li><b>Course basics</b>: a class that stores students and marks and refuses bad data.</li><li><b>Statistics</b>: averages, the top student, letter-grade counts.</li><li><b>Save and load</b>: keep the data in a CSV file.</li><li><b>Command interface</b>: a small text menu that a user can type into.</li></ol><p>This Learn page reminds you of every tool each milestone needs, with a small example of each.</p>" },
    { t: "analogy", title: "Building a house", html: "<p>Nobody builds the roof first. You pour the foundation, check it is level, then build the walls, then the roof. If the walls lean, you find out <b>before</b> the roof is on top of them. Milestones are the same: Milestone 1 is the foundation, and every later milestone stands on it.</p>" },
    { t: "ar", html: "نبني التطبيق على أربع مراحل، ونختبر كل مرحلة قبل الانتقال للتي بعدها. هكذا نكتشف الأخطاء مبكرًا وهي صغيرة وسهلة الإصلاح." },

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
    { t: "p", html: "<p>Read the plan like a to-do list. Each line is one small method you can write and test on its own. Notice that no method in the class uses <code>input()</code> or <code>print()</code>: the class only stores, calculates and complains (raises). Talking to the user is the job of the command loop at the bottom.</p>" },
    { t: "ar", html: "قاعدة مهمة: الكلاس لا يطبع ولا يقرأ من المستخدم، فقط يحسب ويرفع أخطاء. واجهة الأوامر هي التي تطبع وتلتقط الأخطاء. هذا الفصل يجعل الكود قابلًا للاختبار وإعادة الاستخدام." },

    { t: "h", text: "Week 3 in review" },
    { t: "table", head: ["Day", "Tool", "Remember"], rows: [["15", "functions", "`def`, parameters, `return` ≠ `print`, local scope"], ["16", "modules, lambda, recursion", "`import`, `key=`, base case"], ["17", "errors and files", "`try/except X`, `raise`, `with open`, modes r/w/a, csv"], ["18", "classes", "`__init__`, `self.attr`, methods, `__str__`"], ["19", "inheritance", "`class B(A)`, `super()`, overriding, polymorphism"]] },
    { t: "p", html: "<p><b>Functions (Day 15)</b> package a job under a name. A function <b>returns</b> its answer; printing is a different thing. Variables made inside a function are local and disappear when it ends. Use a function whenever you would otherwise copy the same lines twice.</p><p><b>Modules, lambda, recursion (Day 16)</b>: <code>import</code> brings in ready-made tools (<code>math</code>, <code>random</code>, <code>csv</code>). Functions are values, so you can pass one to another function — like <code>max(names, key=average)</code> — or store them in a dictionary. Recursion is a function calling itself, always with a base case that stops it.</p><p><b>Errors and files (Day 17)</b>: <code>try/except</code> catches an error so the program keeps going; <code>raise</code> creates your own error when data is wrong. <code>with open(...)</code> reads and writes files and closes them for you; the <code>csv</code> module handles tables.</p><p><b>Classes (Day 18)</b> bundle data (<code>self.students</code>) with the methods that use it. <code>__init__</code> sets up a new object; <code>__str__</code> decides how it prints.</p><p><b>Inheritance (Day 19)</b> lets a child class reuse a parent and change only what differs, with <code>super()</code> to call the parent's version. Today's project needs only one class, so inheritance appears in the review questions rather than in the milestones.</p>" },
    { t: "ar", html: "هذا الأسبوع تعلمنا أدوات البرامج الحقيقية: الدوال، والوحدات، ومعالجة الأخطاء والملفات، والكلاسات والوراثة. في المشروع نستخدمها كلها معًا، فراجع{{g:|ي}} أي يوم تشعر{{g:|ين}} أنه غير واضح قبل البدء." },

    { t: "h", text: "Milestone 1 toolkit: raise in the logic, catch in the interface" },
    { t: "p", html: "<p><b>Plan for Milestone 1:</b> write <code>__init__</code> (store the code and an empty dict), then <code>add_student</code>, then <code>add_mark</code>, then <code>average</code>. After <b>each</b> method, create a small Course and call it to see that it works — including with bad data. Two tools do most of the work: raising errors and a dictionary of lists.</p>" },
    { t: "code", code: c`def spend(balance, amount):
    if amount > balance:
        raise ValueError("not enough money")
    return balance - amount

for amount in [5, 30]:
    try:
        print("Left:", spend(20, amount))
    except ValueError as e:
        print("Error:", e)`, before: "<p>The same pattern your Course methods need, shown on a tiny function. Run it and find the line that \"complains\" and the line that \"talks\".</p>", note: "<p>Line by line:</p><ul><li><code>spend</code> is the <b>logic</b>. When the data is bad it does not print anything; it <code>raise</code>s a <code>ValueError</code> with a message and stops.</li><li>The loop is the <b>interface</b>. It calls <code>spend</code> inside <code>try</code>.</li><li><code>amount = 5</code>: no problem → <code>Left: 15</code>.</li><li><code>amount = 30</code>: <code>spend</code> raises, Python jumps to <code>except</code>, and <code>e</code> holds the error. Printing <code>e</code> shows its message → <code>Error: not enough money</code>.</li></ul><p>A method inside a class works exactly the same way. In Milestone 1, <code>add_student</code> raises <code>ValueError(f\"{name} already registered\")</code> and <code>add_mark</code> raises when the mark is outside 0–100.</p>" },
    { t: "code", code: c`students = {}
students["Sara"] = []
students["Sara"].append(90)
students["Sara"].append(85)
students["Omar"] = []
print(students)
print("Sara" in students, "Ali" in students)
marks = students["Omar"]
print(round(sum(marks) / len(marks), 1) if marks else 0)`, before: "<p>The Course stores <code>{name: [marks]}</code>: a dictionary whose values are lists. Run it and look at the shape of the printed dictionary.</p>", note: "<p>Line by line:</p><ul><li><code>students[\"Sara\"] = []</code> registers Sara with an <b>empty</b> list of marks.</li><li><code>students[\"Sara\"].append(90)</code> finds Sara's list and adds a mark to it.</li><li><code>\"Sara\" in students</code> checks the keys → <code>True</code>; <code>\"Ali\"</code> → <code>False</code>. Use this to detect duplicates and unknown students.</li><li>Omar has no marks. <code>sum([]) / len([])</code> would crash with <code>ZeroDivisionError</code>, so the one-line choice <code>... if marks else 0</code> (Day 5) returns 0 for an empty list. An empty list counts as False.</li></ul><p>Output: <code>{'Sara': [90, 85], 'Omar': []}</code>, <code>True False</code>, <code>0</code>. This is exactly what <code>average(name)</code> needs.</p>" },
    { t: "code", code: c`def check(mark):
    if not 0 <= mark <= 100:
        raise ValueError("mark must be 0-100")
    return mark

for action in [lambda: check(120), lambda: {}["Ali"]]:
    try:
        action()
    except (KeyError, ValueError) as e:
        print(type(e).__name__, e)`, before: "<p>The Milestone 1 test catches <b>two</b> error types with one <code>except</code>. Run it and look at how each error prints.</p>", note: "<p>Line by line:</p><ul><li><code>not 0 &lt;= mark &lt;= 100</code> is True when the mark is outside the range (a chained comparison from Day 5, flipped with <code>not</code>).</li><li>The list holds two small <code>lambda</code> functions (Day 16), each causing one error when called.</li><li><code>except (KeyError, ValueError) as e:</code> — a <b>tuple</b> of types in parentheses catches <b>either</b> one.</li><li><code>type(e).__name__</code> is the name of the error's class, like <code>ValueError</code>.</li></ul><p>Output: <code>ValueError mark must be 0-100</code> and <code>KeyError 'Ali'</code>. Notice the quotes: a <code>KeyError</code> prints the missing key with quotes around it. In Milestone 1 you raise it with <code>raise KeyError(name)</code>.</p>" },
    { t: "ar", html: "في المرحلة الأولى: الدوال داخل الكلاس ترفع خطأ (raise) عند البيانات الخاطئة ولا تطبع شيئًا، والقاموس يحفظ لكل طالب قائمة درجات. ويمكن التقاط نوعين من الأخطاء معًا بـ except (KeyError, ValueError) as e. انتبه{{g:|ي}} للقسمة على صفر عندما تكون القائمة فارغة." },

    { t: "h", text: "Milestone 2 toolkit: max with key, helpers and static methods" },
    { t: "p", html: "<p><b>Plan for Milestone 2:</b> copy your Milestone 1 class and add one method at a time: <code>class_average</code>, then <code>top_student</code>, then <code>distribution</code>. Test each with the students in the exercise. Careful with students who have <b>no marks</b>: leave them out of the statistics.</p>" },
    { t: "code", code: c`marks = {"Sara": [95, 91], "Omar": [70, 80], "Lina": [88]}

def average(name):
    return sum(marks[name]) / len(marks[name])

print(max(marks, key=average))
print(average("Omar"))`, before: "<p>Which student has the highest average? <code>max</code> can answer if you tell it <b>what to compare</b>. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>max(marks)</code> alone would loop over the <b>keys</b> (names) and return the alphabetically last one — not what we want.</li><li><code>key=average</code> passes the function itself (no parentheses!). <code>max</code> calls <code>average(name)</code> for every name and compares those results: 93.0, 75.0, 88.0.</li><li>It returns the <b>name</b> whose result was biggest → <code>Sara</code>.</li></ul><p>In your class you write <code>max(names, key=self.average)</code> — a method is a value too. If nobody has marks, return <code>None</code> instead of calling <code>max</code> on an empty list (which crashes).</p>" },
    { t: "code", code: c`class Course:
    @staticmethod
    def letter(avg):
        for cut, grade in ((90, "A"), (80, "B"), (70, "C"), (60, "D")):
            if avg >= cut:
                return grade
        return "F"

print(Course.letter(93), Course.letter(75), Course.letter(41))`, before: "<p>A method that needs no <code>self</code> can be marked with <code>@staticmethod</code>. Run it and notice we call it on the class, without making an object.</p>", note: "<p>Line by line:</p><ul><li><code>@staticmethod</code> (written on the line just above <code>def</code>) tells Python: this method does not receive <code>self</code>. It only uses its own parameter <code>avg</code>.</li><li>The loop walks through pairs (Day 11 tuple unpacking): first <code>cut = 90, grade = \"A\"</code>, then 80/\"B\", and so on. The first cut that <code>avg</code> reaches wins, like an <code>elif</code> chain.</li><li>If no cut matches, the loop ends and <code>return \"F\"</code> runs.</li></ul><p>Output: <code>A C F</code>. You can also call it from another method as <code>self.letter(...)</code>. Related convention: a method whose name starts with <code>_</code>, like <code>_graded</code>, is an <b>internal helper</b> — meant for the class itself, not for users of the class.</p>" },
    { t: "ar", html: "max(names, key=average) تقارن نتائج الدالة وترجع الاسم صاحب أعلى نتيجة، ونمرر الدالة بدون أقواس. و ‎@staticmethod‎ تعني أن الدالة لا تحتاج self. استبعد{{g:|ي}} الطلاب الذين ليس لديهم درجات من الإحصاءات." },

    { t: "h", text: "Milestone 3 toolkit: CSV save and load" },
    { t: "p", html: "<p><b>Plan for Milestone 3:</b> first write <code>save</code> and open the file to look at it with your own eyes. Only when the file looks right, write <code>load_course</code> and check that loading gives back the same dictionary. One row per mark: <code>Sara,90</code>. A student with no marks still needs a row (<code>Lina,</code>) or they would be lost.</p>" },
    { t: "code", code: c`import csv
with open("demo.csv", "w", newline="") as f:
    w = csv.writer(f, lineterminator="\n")
    w.writerow(["name", "mark"])
    w.writerow(["Sara", 90])
    w.writerow(["Lina", ""])
with open("demo.csv") as f:
    for row in csv.DictReader(f):
        print(row["name"], repr(row["mark"]))`, before: "<p>Write a tiny CSV and read it back, like Day 17. Look carefully at the type of each mark that comes back.</p>", note: "<p>Line by line:</p><ul><li><code>csv.writer(f, lineterminator=\"\\n\")</code>: by default the csv module ends lines with <code>\\r\\n</code> (Windows style). <code>lineterminator</code> makes it a plain <code>\\n</code>, so the file text matches the test exactly.</li><li>Each <code>writerow</code> writes one line. An empty string gives an empty cell: <code>Lina,</code>.</li><li><code>csv.DictReader</code> uses the header row as keys, so each row is a dict like <code>{'name': 'Sara', 'mark': '90'}</code>.</li><li><code>repr</code> shows the quotes: the mark comes back as the <b>text</b> <code>'90'</code>, and Lina's as the empty text <code>''</code>.</li></ul><p>So when loading: convert with <code>int(...)</code>, and skip empty marks (<code>if row[\"mark\"]:</code> is False for <code>''</code>). Reuse <code>add_student</code> and <code>add_mark</code> while loading, so file data is checked by the same rules.</p>" },
    { t: "ar", html: "عند الحفظ نكتب صفًا لكل درجة، وصفًا بدرجة فارغة للطالب الذي ليس له درجات. وعند القراءة تعود القيم نصوصًا، فحوّل{{g:|ي}}ها بـ int() وتجاهل{{g:|ي}} الخانات الفارغة." },

    { t: "h", text: "Milestone 4 toolkit: the command loop" },
    { t: "p", html: "<p><b>Plan for Milestone 4:</b> start with a loop that only understands <code>quit</code> and \"Unknown command\". Then add one command at a time (<code>add</code>, then <code>mark</code>, then <code>avg</code>, then <code>top</code>), testing each by typing it. Last, wrap the commands in <code>try/except</code> so bad input prints <code>Error: ...</code> instead of crashing.</p>" },
    { t: "code", code: c`while True:
    parts = input("> ").split()
    if parts[0] == "quit":
        break
    elif parts[0] == "hello":
        print("Hello,", parts[1])
    else:
        print("Unknown command")`, stdin: "hello Sara\ndance\nquit", before: "<p>Three commands are already in the Input box. Run it, then add your own lines to the Input box (keep <code>quit</code> last).</p>", note: "<p>Line by line:</p><ul><li><code>while True:</code> repeats forever; only <code>break</code> leaves it.</li><li><code>input().split()</code> cuts the typed line at the spaces: <code>\"hello Sara\"</code> → <code>['hello', 'Sara']</code>.</li><li><code>parts[0]</code> is the command word; <code>parts[1]</code> is its first argument.</li><li><code>hello Sara</code> → <code>Hello, Sara</code>; <code>dance</code> → <code>Unknown command</code>; <code>quit</code> → <code>break</code>.</li></ul><p>Your Milestone 4 loop has this exact shape, with one <code>elif</code> per command and the course methods called inside them.</p>" },
    { t: "code", code: c`students = {"Sara": [90]}
for text in ["85", "abc"]:
    try:
        if not text.isdigit():
            raise ValueError("mark must be a number")
        students["Ali"].append(int(text))
    except KeyError as e:
        print("Error: no student", e.args[0])
    except ValueError as e:
        print("Error:", e)`, before: "<p>Milestone 4 needs exact error messages. Here are two tricks for that. Run it and match each output line to its <code>except</code>.</p>", note: "<p>Line by line:</p><ul><li><code>\"85\"</code>: <code>int</code> works. Then <code>students[\"Ali\"]</code> raises <code>KeyError</code>. Printing <code>e</code> would show <code>'Ali'</code> with quotes; <code>e.args[0]</code> is the original value without quotes → <code>Error: no student Ali</code>.</li><li><code>\"abc\"</code>: <code>.isdigit()</code> (Day 9) is False, so we <b>raise our own</b> <code>ValueError</code> with a friendly message before <code>int</code> could fail with Python's long one. The <code>except ValueError</code> block catches it → <code>Error: mark must be a number</code>.</li></ul><p>Several <code>except</code> blocks can follow one <code>try</code>; Python uses the first one whose type matches. (Another way: wrap <code>int(text)</code> in its own small <code>try</code> and, in its <code>except ValueError:</code>, <code>raise ValueError(\"mark must be a number\")</code> — raising a new error with a better message.)</p>" },
    { t: "code", code: c`def hello(name):
    return "Hello, " + name

def shout(word):
    return word.upper() + "!"

COMMANDS = {"hello": hello, "shout": shout}
for line in ["hello Sara", "shout py30"]:
    cmd, arg = line.split()
    print(COMMANDS[cmd](arg))`, before: "<p>An optional upgrade for Milestone 4: a <b>dispatch table</b> — a dictionary whose values are functions.</p>", note: "<p>Line by line:</p><ul><li><code>COMMANDS</code> maps each command word to a function (no parentheses: we store the functions, we don't call them).</li><li><code>cmd, arg = line.split()</code> unpacks the two words.</li><li><code>COMMANDS[cmd]</code> looks up the function, and <code>(arg)</code> calls it.</li><li>Output: <code>Hello, Sara</code> and <code>PY30!</code>.</li></ul><p>To add a command you write one function and one dictionary entry — no new <code>elif</code>. Use <code>COMMANDS.get(cmd)</code> to get <code>None</code> for an unknown command instead of a <code>KeyError</code>.</p>" },
    { t: "ar", html: "حلقة الأوامر: while True مع input().split()، والكلمة الأولى هي الأمر، و break عند quit. ضع{{g:|ي}} الأوامر داخل try حتى تطبع رسالة خطأ بدل التوقف. و e.args[0] تعطي المفتاح بدون علامات التنصيص، ويمكن استخدام قاموس من الدوال بدل سلسلة elif طويلة." },

    { t: "h", text: "How to test as you go" },
    { t: "p", html: "<p>After every method, test three kinds of input: a <b>normal</b> case (Sara gets 90), an <b>edge</b> case (a student with no marks, a mark of exactly 0 or 100), and a <b>bad</b> case (a duplicate name, a mark of 120, an unknown student). The exercise tests do exactly this — read them before you start, they are part of the specification. When a test fails, print the dictionary <code>course.students</code> to see what is really stored. Finally, combine all four milestones in the Playground and add <code>save</code>/<code>load</code> commands: that is a complete application.</p>" },
    { t: "ar", html: "اختبر{{g:|ي}} كل دالة بثلاث حالات: حالة عادية، وحالة حدّية (طالب بلا درجات أو درجة 0 أو 100)، وحالة خاطئة (اسم مكرر أو درجة 120). واقرأ{{g:|ي}} اختبارات التمرين قبل البدء لأنها جزء من المطلوب." },
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

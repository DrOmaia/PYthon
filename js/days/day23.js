window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[23] = {
  title: "numpy: fast math on whole arrays",
  intro: "AI is mostly math on large tables of numbers: images are grids of pixels, datasets are rows and columns. <b>numpy</b> is the Python library for that — it does math on a whole array at once, often 50–100× faster than a Python loop. Every AI library (scikit-learn, PyTorch, TensorFlow) is built on its ideas.",
  introAr: "numpy مكتبة للحساب السريع على مصفوفات الأرقام، وهي أساس كل مكتبات الذكاء الاصطناعي. الفكرة الأهم: نطبق العملية على المصفوفة كلها مرة واحدة بدون حلقة. (أول تشغيل اليوم يأخذ عدة ثوانٍ لتحميل المكتبة.)",
  goals: ["Create arrays with `np.array`, `arange`, `zeros`, `linspace`", "Do vectorized math without loops", "Use shape, 2D arrays, rows and columns", "Filter with boolean masks", "Compute statistics along an axis"],
  learn: [
    { t: "h", text: "Why numpy?" },
    { t: "p", html: "<p>Your teacher wants to add 5 bonus points to the marks of 300 students. With a list you write a loop and handle the marks one at a time. Now imagine an AI model that works on a photo with 1,000,000 pixels, thousands of times. Loops in Python are too slow for that. <b>numpy</b> gives you a new kind of list, the <b>array</b>, that does math on <b>all</b> its numbers in one command.</p>" },
    { t: "analogy", title: "One by one vs all at once", html: "<p>A Python list is like a teacher marking 300 exam papers one by one. A numpy array is like a machine that marks the whole pile in one go. You give one instruction — \"add 5\" — and every number gets it. The machine is fast because it is written in C and every item has the same type (all numbers).</p>" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
print(marks)
print(type(marks))`, before: "<p>The first run loads numpy (a few seconds). After that it's instant.</p>", note: "<p>An array prints with <b>spaces</b> and no commas — that's how you can tell it from a list. Its type is <code>numpy.ndarray</code> (\"n-dimensional array\").</p>" },
    { t: "lines", rows: [
      ["import numpy as np", "Load the numpy library and give it the short name <code>np</code>. Everybody in the world uses <code>np</code>, so you will see it in every tutorial."],
      ["marks = np.array([70, 85, 90, 60, 95])", "<code>np.array(...)</code> takes a normal list and turns it into an array."],
      ["print(marks)", "Shows <code>[70 85 90 60 95]</code>: square brackets, but spaces between the numbers."],
    ] },
    { t: "ar", html: "np هو الاسم المختصر المتعارف عليه عالميًا لمكتبة numpy. نحوّل القائمة العادية إلى مصفوفة بـ np.array، وتُطبع المصفوفة بمسافات بدون فواصل." },
    { t: "check", q: "How can you tell this output comes from a numpy array and not a list?", code: c`[70 85 90 60 95]`, o: ["It has square brackets", "There are no commas between the numbers", "The numbers are whole numbers"], a: 1, e: "A list prints `[70, 85, 90, 60, 95]` with commas. An array prints with spaces only." },

    { t: "h", text: "Vectorized math: no loops needed" },
    { t: "p", html: "<p>Here is the big difference. With a list, <code>*</code> <b>repeats</b> the list, just like it repeats a string (Day 1). With an array, <code>*</code> <b>multiplies every element</b>. Doing one operation on every element at once is called <b>vectorization</b>.</p>" },
    { t: "code", code: c`import numpy as np

print([70, 85] * 2)             # list: repeated
print(np.array([70, 85]) * 2)   # array: each number doubled`, note: "<p>Same <code>* 2</code>, completely different meaning. The list became <code>[70, 85, 70, 85]</code>; the array became <code>[140 170]</code>.</p>" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
print(marks + 5)      # 5 bonus points for everyone
print(marks / 10)     # out of 10 instead of 100`, before: "<p>Any math operator works the same way: <code>+ - * / ** // %</code>.</p>", note: "<p>Notice <code>marks / 10</code> prints <code>7.</code> instead of <code>7.0</code>: numpy writes floats in a short form, but it's the same number.</p>" },
    { t: "p", html: "<p>Two arrays of the same length can also work together: numpy pairs the first with the first, the second with the second, and so on (<b>element by element</b>).</p>" },
    { t: "code", code: c`import numpy as np

quiz1 = np.array([8, 6, 9])
quiz2 = np.array([7, 10, 5])
print(quiz1 + quiz2)   # each student's total`, note: "<p>8+7, 6+10, 9+5 → <code>[15 16 14]</code>. With lists you would need <code>zip</code> and a loop.</p>" },
    { t: "lines", rows: [
      ["marks + 5", "Adds 5 to <b>every</b> element. The original <code>marks</code> does not change — you get a new array."],
      ["marks / 10", "Divides every element. <code>/</code> always gives floats, like in plain Python."],
      ["quiz1 + quiz2", "Element by element: position 0 with position 0, position 1 with position 1…"],
    ] },
    { t: "ar", html: "مع numpy لا نحتاج حلقة لكل عنصر: العملية تُطبق على كل العناصر مرة واحدة. انتبه{{g:|ي}}: القائمة × 2 تكررها، أما المصفوفة × 2 فتضاعف كل رقم." },
    { t: "check", q: "What does this print?", code: c`import numpy as np
print(np.array([1, 2, 3]) * 3)`, o: ["`[1, 2, 3, 1, 2, 3, 1, 2, 3]`", "`[3 6 9]`", "`18`", "An error"], a: 1, e: "Vectorized multiplication: every element is multiplied by 3.", hint: "It's an array, not a list." },

    { t: "h", text: "Statistics in one word" },
    { t: "p", html: "<p>Arrays come with methods for the questions you ask about data all the time: what's the average? the highest? the total? Each one is a single method call — no loop, no counter.</p>" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
print(marks.mean(), marks.max(), marks.min(), marks.sum())
print(marks.std().round(2))   # spread around the mean
print(marks.argmax())         # POSITION of the max
print(marks.shape, len(marks))`, note: "<p><code>argmax()</code> answers \"<b>where</b> is the best mark?\" (index 4), while <code>max()</code> answers \"<b>what</b> is it?\" (95). <code>shape</code> is <code>(5,)</code>: one dimension with 5 numbers.</p>" },
    { t: "table", head: ["Method", "Gives", "For `[70, 85, 90, 60, 95]`"], rows: [["`a.mean()`", "average", "`80.0`"], ["`a.sum()`", "total", "`400`"], ["`a.max()` / `a.min()`", "largest / smallest", "`95` / `60`"], ["`a.argmax()` / `a.argmin()`", "position of largest / smallest", "`4` / `3`"], ["`a.std()`", "standard deviation (how spread out)", "`13.04` (rounded)"], ["`a.shape`", "size of each dimension", "`(5,)`"]] },

    { t: "h", text: "Creating arrays" },
    { t: "p", html: "<p>You don't always type the numbers yourself. numpy can make arrays for you: a range of numbers, evenly spaced points for a graph, or an array of zeros to fill in later.</p>" },
    { t: "code", code: c`import numpy as np
print(np.arange(0, 10, 2))     # like range(), but an array
print(np.linspace(0, 1, 5))    # 5 evenly spaced numbers from 0 to 1
print(np.zeros(3), np.ones(3))
rng = np.random.default_rng(42)
print(rng.integers(1, 7, size=5))   # 5 dice rolls`, note: "<p><code>arange</code> works like <code>range</code>: the stop value is <b>not</b> included. <code>linspace</code> <b>includes</b> both ends. The <code>42</code> is a <b>seed</b>: the same seed always gives the same \"random\" numbers, which makes experiments repeatable.</p>" },
    { t: "table", head: ["Function", "Makes", "Example → result"], rows: [["`np.array(list)`", "array from a list", "`np.array([1, 2])` → `[1 2]`"], ["`np.arange(start, stop, step)`", "range of numbers (stop not included)", "`np.arange(1, 4)` → `[1 2 3]`"], ["`np.linspace(a, b, n)`", "n evenly spaced numbers, a and b included", "`np.linspace(0, 1, 3)` → `[0.  0.5 1. ]`"], ["`np.zeros(n)` / `np.ones(n)`", "n zeros / ones (floats)", "`np.zeros(2)` → `[0. 0.]`"]] },
    { t: "check", q: "What does `np.arange(0, 10, 3)` give?", o: ["`[0 3 6 9]`", "`[0 3 6 9 12]`", "`[3 6 9]`", "`[0 3 6]`"], a: 0, e: "Start at 0, step 3, stop **before** 10: 0, 3, 6, 9." },

    { t: "h", text: "2D arrays: tables" },
    { t: "p", html: "<p>Real data is a table: each <b>row</b> is one student (or one day, one house), each <b>column</b> is one measurement. numpy stores a table as a <b>2D array</b> — a list of rows, all the same length.</p>" },
    { t: "analogy", title: "A 2D array is a spreadsheet", html: "<p>Think of an Excel sheet. To find a cell you say its row and its column, like \"row 2, column C\". In numpy you write <code>grades[row, column]</code>. A whole row is one student; a whole column is one exam for every student.</p>" },
    { t: "code", code: c`import numpy as np
# rows = students, columns = quiz, midterm, final
grades = np.array([
    [80, 90, 85],
    [60, 75, 70],
    [95, 88, 92],
])
print(grades.shape)
print(grades[0])       # first row (student 0)
print(grades[:, 2])    # third column (all finals)
print(grades[1, 2])    # row 1, column 2`, note: "<p>The shape <code>(3, 3)</code> means 3 rows and 3 columns. Student 1's final is <code>70</code>.</p>" },
    { t: "lines", rows: [
      ["grades.shape", "<code>(rows, columns)</code> — always rows first."],
      ["grades[0]", "One number inside the brackets = a <b>row</b>. Here: all marks of student 0."],
      ["grades[:, 2]", "<code>:</code> means \"all rows\", then column 2. So: the final exam of every student."],
      ["grades[1, 2]", "Row 1, column 2: one single cell."],
    ] },
    { t: "ar", html: "في المصفوفة ثنائية الأبعاد: grades[0] صف كامل (طالب)، و grades[:, 2] عمود كامل (اختبار لكل الطلاب)، و grades[1, 2] خلية واحدة. الصف أولًا ثم العمود." },
    { t: "check", q: "In the `grades` table above, which gives the **midterm marks of all students** (column 1)?", o: ["`grades[1]`", "`grades[:, 1]`", "`grades[1, :]`", "`grades[1, 1]`"], a: 1, e: "`:` takes all rows, `1` picks column 1. `grades[1]` and `grades[1, :]` are both **row** 1 (one student).", hint: "A column needs `:` first, for \"every row\"." },

    { t: "h", text: "axis: statistics per row or per column" },
    { t: "p", html: "<p><code>grades.mean()</code> averages all 9 numbers together. Usually you want something more useful: the class average of <b>each exam</b>, or the average of <b>each student</b>. The <code>axis</code> argument chooses the direction.</p>" },
    { t: "analogy", title: "axis in one sentence", html: "<p><code>axis=0</code> goes <b>down</b> the rows (one result per column — like the total row at the bottom of a spreadsheet); <code>axis=1</code> goes <b>across</b> the columns (one result per row — like a total column on the right).</p>" },
    { t: "code", code: c`import numpy as np
grades = np.array([
    [80, 90, 70],
    [60, 75, 90],
    [100, 90, 80],
])
print(grades.mean(axis=0))   # average of each exam (column)
print(grades.mean(axis=1))   # average of each student (row)`, note: "<p>Down each column: (80+60+100)/3 = 80, then 85, then 80. Across each row: 80, 75, 90. Both results have <b>3</b> numbers because the table is 3 × 3; on a 3 × 4 table <code>axis=0</code> would give 4 numbers.</p>" },
    { t: "check", q: "`a` has shape `(3, 4)` (3 students, 4 exams). How many numbers does `a.mean(axis=0)` return?", o: ["3", "4", "12", "1"], a: 1, e: "`axis=0` goes down the rows and gives one result **per column**: 4 numbers, one per exam." },

    { t: "h", text: "Boolean masks: filtering without loops" },
    { t: "p", html: "<p>\"Which days were hotter than 40°C?\" With a list you'd loop and use <code>if</code>. With numpy you ask the question to the whole array at once. A comparison gives back an array of <code>True</code>/<code>False</code> — a <b>mask</b>. Put the mask inside the brackets and you keep only the <code>True</code> positions.</p>" },
    { t: "viz", code: c`import numpy as np
temps = np.array([38, 45, 41, 29, 47, 36])
hot = temps > 40
print(hot)
print(temps[hot])
print(hot.sum(), "hot days")
print(np.where(temps > 40, "hot", "ok"))`, before: "<p>Riyadh temperatures for six days. Watch each line produce a new array.</p>" },
    { t: "lines", rows: [
      ["hot = temps > 40", "Compares <b>every</b> temperature with 40: <code>[False True True False True False]</code>."],
      ["temps[hot]", "Keeps only the values where the mask is True: <code>[45 41 47]</code>."],
      ["hot.sum()", "True counts as 1 and False as 0, so the sum <b>counts</b> the hot days: 3."],
      ["np.where(temps > 40, \"hot\", \"ok\")", "Like an <code>if/else</code> for every element: \"hot\" where True, \"ok\" where False."],
    ] },
    { t: "p", html: "<p>To combine two conditions, use <code>&amp;</code> (and) or <code>|</code> (or), with <b>parentheses</b> around each comparison: <code>temps[(temps &gt; 30) &amp; (temps &lt; 40)]</code> keeps <code>[38 36]</code>. The words <code>and</code>/<code>or</code> do not work on arrays.</p>" },
    { t: "ar", html: "المقارنة على مصفوفة تعطي مصفوفة True/False نسميها قناعًا (mask). نضعها داخل الأقواس المربعة لنأخذ العناصر الصحيحة فقط. ولربط شرطين نستخدم & أو | مع الأقواس." },
    { t: "check", q: "What does this print?", code: c`import numpy as np
a = np.array([4, 9, 2, 7])
print(a[a > 5])`, o: ["`[False  True False  True]`", "`[9 7]`", "`2`", "`[4 2]`"], a: 1, e: "`a > 5` is the mask `[False True False True]`; using it as an index keeps 9 and 7." },

    { t: "h", text: "Speed test" },
    { t: "code", code: c`import numpy as np, time
n = 1_000_000
data = list(range(n))
arr = np.arange(n)
t = time.time(); total = sum(x * x for x in data); print("python loop:", round(time.time() - t, 3), "s")
t = time.time(); total2 = (arr * arr).sum(); print("numpy:      ", round(time.time() - t, 4), "s")`, noViz: true, before: "<p>Square a million numbers and add them up, both ways. Times differ between computers — look at the <b>gap</b>.</p>", note: "<p>Same answer, but numpy is many times faster because the loop runs inside fast C code, not one Python step at a time. With AI data, that gap is the difference between seconds and hours.</p>" },

    { t: "steps", title: "A class report in a few lines", problem: "<p>Three students have a quiz, a midterm and a final. The final grade is 20% quiz + 30% midterm + 50% final. Print each student's final grade, the class average of each exam, the names of students with 80 or more, and the top student — with no loops.</p>", steps: [
      { html: "<p><b>Understand.</b> The data is a table: rows = students, columns = exams. So we need a 2D array, plus an array of names in the same order.</p>", code: c`import numpy as np
names = np.array(["Sara", "Omar", "Lina"])
grades = np.array([[80, 90, 75], [60, 75, 90], [100, 90, 80]])` },
      { html: "<p><b>Weighted grade.</b> Multiplying the table by <code>[0.2, 0.3, 0.5]</code> multiplies <b>every row</b> by those weights, column by column. Then <code>sum(axis=1)</code> adds across each row.</p>", code: c`weights = np.array([0.2, 0.3, 0.5])
final = (grades * weights).sum(axis=1)
print(final)` },
      { html: "<p><b>Exam averages.</b> One average per column → <code>axis=0</code>.</p>", code: c`print(grades.mean(axis=0).round(1))` },
      { html: "<p><b>Filter and find the best.</b> A mask on <code>final</code> picks names from the <code>names</code> array (same positions!). <code>argmax</code> gives the position of the top grade.</p>", code: c`print(names[final >= 80])
print(names[final.argmax()])` },
    ], code: c`import numpy as np

names = np.array(["Sara", "Omar", "Lina"])
grades = np.array([[80, 90, 75],
                   [60, 75, 90],
                   [100, 90, 80]])
weights = np.array([0.2, 0.3, 0.5])

final = (grades * weights).sum(axis=1)
print("Final grades:", final)
print("Exam averages:", grades.mean(axis=0).round(1))
print("80 or more:", names[final >= 80])
print("Top student:", names[final.argmax()])`, ar: "جدول الدرجات مصفوفة ثنائية الأبعاد: نضربها في الأوزان ونجمع كل صف (axis=1)، ثم نستخدم قناعًا لاختيار الأسماء و argmax لمعرفة الأول." },
  ],
  mistakes: [
    { title: "Forgetting the import alias", html: "<code>import numpy</code> creates the name <code>numpy</code>, not <code>np</code>.", wrong: c`import numpy
a = np.array([1, 2])   # NameError: np`, right: c`import numpy as np
a = np.array([1, 2])` },
    { title: "Mixing up rows and columns", html: "<code>a[1]</code> is a row. A column needs <code>a[:, 1]</code>.", wrong: c`finals = grades[2]      # this is student 2!`, right: c`finals = grades[:, 2]   # column 2` },
    { title: "and / or on arrays", html: "Use <code>&amp;</code> and <code>|</code> with parentheses. <code>and</code> gives <code>ValueError: The truth value of an array ... is ambiguous</code>.", wrong: c`temps[temps > 30 and temps < 40]`, right: c`temps[(temps > 30) & (temps < 40)]`, ar: "مع مصفوفات numpy استخدم{{g:|ي}} &amp; و | مع الأقواس بدل and و or." },
    { title: "Numbers as text in an array", html: "An array has <b>one type</b> for all elements. One string makes them all strings, and math fails. Convert first (Day 3).", wrong: c`a = np.array([80, "90"])
print(a + 5)   # error: strings`, right: c`a = np.array([80, int("90")])
print(a + 5)   # [85 95]` },
  ],
  tricks: [
    { title: "reshape", html: "Turn a flat array into a table with a given number of rows and columns (the total must match: 3 × 4 = 12).", code: c`import numpy as np
print(np.arange(12).reshape(3, 4))` },
    { title: "Dot product = weighted sum", html: "<code>@</code> multiplies element by element and adds everything up. It is the core operation of neural networks.", code: c`import numpy as np
marks = np.array([80, 90, 70])
weights = np.array([0.2, 0.3, 0.5])
print(marks @ weights)   # 80*.2 + 90*.3 + 70*.5 = 78.0` },
    { title: "Turn numpy numbers into plain Python", html: "numpy results are numpy types. <code>int()</code>, <code>float()</code> and <code>.tolist()</code> give plain Python values — handy for printing tuples or saving to JSON.", code: c`import numpy as np
a = np.array([70, 85, 90])
print(int(a.sum()), float(a.mean()))
print(a.tolist())` },
  ],
  practice: [
    { t: "predict", code: c`import numpy as np
a = np.array([1, 2, 3])
print(a * 2, a + a, a ** 2)`, explain: "Element by element: <code>[2 4 6] [2 4 6] [1 4 9]</code>." },
    { t: "predict", code: c`import numpy as np
print([1, 2] + [3, 4])
print(np.array([1, 2]) + np.array([3, 4]))`, explain: "Lists: <code>+</code> joins them → <code>[1, 2, 3, 4]</code>. Arrays: <code>+</code> adds element by element → <code>[4 6]</code>." },
    { t: "predict", code: c`import numpy as np
m = np.arange(6).reshape(2, 3)
print(m.sum(axis=0), m.sum(axis=1))`, explain: "m = [[0,1,2],[3,4,5]]. Column sums <code>[3 5 7]</code>, row sums <code>[ 3 12]</code>." },
    { t: "predict", code: c`import numpy as np
x = np.array([3, 8, 1, 6])
print(x[x % 2 == 0], (x > 2).sum())`, explain: "<code>x % 2 == 0</code> is True for the even numbers → <code>[8 6]</code>. Three numbers are bigger than 2, so the True values add up to <code>3</code>." },
    { t: "parsons", title: "Curve the grades", prompt: "Add 5 points to every mark but cap them at 100, then print the result.", lines: ["import numpy as np", "marks = np.array([97, 80, 91, 60])", "curved = np.minimum(marks + 5, 100)", "print(curved)"], distractors: ["curved = marks + 5 if marks < 100 else 100"], explain: "<code>np.minimum</code> compares element by element: <code>[100 85 96 65]</code>. A plain <code>if</code> can't handle a whole array." },
    { t: "parsons", title: "Average of one column", prompt: "Build the table and print the class average of the final exam (column 2).", lines: ["import numpy as np", "grades = np.array([[80, 90, 70], [60, 75, 90]])", "finals = grades[:, 2]", "print(finals.mean())"], distractors: ["finals = grades[2]"], explain: "<code>grades[:, 2]</code> is column 2 (<code>[70 90]</code>), average <code>80.0</code>. <code>grades[2]</code> would be a row — and this table has only rows 0 and 1, so it would fail." },
    { t: "try", title: "Temperature analysis", html: "<p>Riyadh daily max temperatures for two weeks are below. Find: the average, the hottest day number, how many days were above 44, and the average of weekends only (days 5, 6, 12, 13).</p>", code: c`import numpy as np
t = np.array([42, 44, 45, 47, 46, 43, 41, 44, 45, 46, 48, 47, 44, 42])
print("average:", t.mean().round(1))
` },
    { t: "try", title: "Riyals to dollars", html: "<p>Here are the prices of your weekly coffee orders in riyals. Convert them all to dollars (1 USD = 3.75 SAR) in <b>one</b> line, round to 2 decimals, then print only the orders above 5 dollars.</p>", code: c`import numpy as np
prices = np.array([12, 18.5, 9, 24, 15])
dollars = (prices / 3.75).round(2)
print(dollars)
` },
  ],
  exercises: [
    { id: "norm", lvl: "seed", title: "Scale to 0–1", prompt: "<p>Write <code>normalize(values)</code> returning a numpy array scaled so the min becomes 0 and the max becomes 1: <code>(x - min) / (max - min)</code>. No loops! (Scaling features like this is a standard ML step.)</p>", starter: "import numpy as np\n\ndef normalize(values):\n    pass\n", tests: [{ after: "print(normalize([10, 20, 30, 50]))", expected: "[0.   0.25 0.5  1.  ]" }],
      hint: "Turn the list into an array first. Then <code>a - a.min()</code> works on every element at once.", ar: "حوّل{{g:|ي}} القائمة إلى مصفوفة أولًا، ثم طبّق{{g:|ي}} المعادلة على المصفوفة كلها مرة واحدة.",
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def normalize(values):
    a = np.array(values, dtype=float)
    return (a - a.min()) / (a.max() - a.min())` }] },
    { id: "pass", lvl: "seed", title: "Passing students", prompt: "<p>Write <code>pass_info(marks)</code> returning a tuple <code>(count_passed, average_of_passed)</code> for marks ≥ 60, the average rounded to 1 decimal. Use a mask.</p>", starter: "import numpy as np\n\ndef pass_info(marks):\n    pass\n", tests: [{ after: "print(pass_info([55, 70, 90, 40, 65]))", expected: "(3, 75.0)" }],
      hint: "<code>passed = a[a &gt;= 60]</code>, then use <code>passed.size</code> and <code>passed.mean()</code>.",
      solutions: [{ name: "Mask", code: c`import numpy as np

def pass_info(marks):
    a = np.array(marks)
    passed = a[a >= 60]
    return int(passed.size), round(float(passed.mean()), 1)`, note: "<code>int()</code> and <code>float()</code> turn numpy numbers into plain Python numbers for clean printing." }] },
    { id: "table", lvl: "star", title: "Grade table", prompt: "<p>Rows are students, columns are (quiz, midterm, final) weighted 20%, 30%, 50%. Write <code>final_scores(grades)</code> returning each student's weighted total rounded to 1 decimal (as a list), and <code>best_column(grades)</code> returning the index of the column with the highest average.</p>", starter: "import numpy as np\n\ndef final_scores(grades):\n    pass\n\ndef best_column(grades):\n    pass\n", tests: [{ after: "g = [[80, 90, 70], [100, 60, 80], [50, 70, 90]]\nprint(final_scores(g))\nprint(best_column(g))", expected: "[78.0, 78.0, 76.0]\n2" }],
      hint: "Look at the worked example: <code>(g * w).sum(axis=1)</code>. For the best column: <code>mean(axis=0)</code> then <code>argmax()</code>.",
      solutions: [{ name: "Dot product", code: c`import numpy as np

def final_scores(grades):
    g = np.array(grades)
    w = np.array([0.2, 0.3, 0.5])
    return np.round(g @ w, 1).tolist()

def best_column(grades):
    return int(np.array(grades).mean(axis=0).argmax())`, note: "<code>argmax</code> gives the <b>position</b> of the maximum." }, { name: "Multiply and sum", code: c`import numpy as np

def final_scores(grades):
    g = np.array(grades)
    w = np.array([0.2, 0.3, 0.5])
    return (g * w).sum(axis=1).round(1).tolist()

def best_column(grades):
    return int(np.array(grades).mean(axis=0).argmax())`, note: "Same idea as the worked example. <code>g @ w</code> is a shortcut for <code>(g * w).sum(axis=1)</code>." }] },
    { id: "dist", lvl: "star", title: "Distance between points", prompt: "<p>Write <code>distance(p, q)</code>: Euclidean distance √Σ(pᵢ − qᵢ)² between two points of any dimension, rounded to 3 decimals. This exact formula powers the nearest-neighbor AI of Day 24.</p>", starter: "import numpy as np\n\ndef distance(p, q):\n    pass\n", tests: [{ after: "print(distance([0, 0], [3, 4]), distance([1, 2, 3], [4, 6, 3]), distance([1], [1]))", expected: "5.0 5.0 0.0" }],
      hint: "Subtract the two arrays, square, sum, then <code>np.sqrt</code>. Wrap the result in <code>float()</code> before rounding.",
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def distance(p, q):
    d = np.array(p) - np.array(q)
    return round(float(np.sqrt((d ** 2).sum())), 3)` }, { name: "np.linalg.norm", code: c`import numpy as np

def distance(p, q):
    return round(float(np.linalg.norm(np.array(p) - np.array(q))), 3)` }] },
    { id: "moving", lvl: "fire", title: "Moving average", prompt: "<p>Write <code>moving_average(values, k)</code> returning the averages of every window of k consecutive values, rounded to 2 decimals, as a list. Used for smoothing stock prices and sensor data.</p>", starter: "import numpy as np\n\ndef moving_average(values, k):\n    pass\n", tests: [{ after: "print(moving_average([1, 2, 3, 4, 5, 6], 3))\nprint(moving_average([10, 20], 2))", expected: "[2.0, 3.0, 4.0, 5.0]\n[15.0]" }],
      hint: "The windows start at 0, 1, …, <code>len(a) - k</code>. Slice <code>a[i:i + k]</code> and take its mean.",
      solutions: [{ name: "Loop over windows", code: c`import numpy as np

def moving_average(values, k):
    a = np.array(values, dtype=float)
    return [round(float(a[i:i + k].mean()), 2) for i in range(len(a) - k + 1)]` }, { name: "convolve", code: c`import numpy as np

def moving_average(values, k):
    out = np.convolve(values, np.ones(k) / k, mode="valid")
    return np.round(out, 2).tolist()`, note: "Convolution slides a window over the data — the same operation used by image-recognition networks (CNNs)." }] },
    { id: "image", lvl: "fire", title: "Tiny image processing", prompt: "<p>An image is a 2D array of brightness values 0–255. Write <code>invert(img)</code> (255 − value) and <code>threshold(img, t)</code> returning 1 where value ≥ t else 0. Return numpy arrays.</p>", starter: "import numpy as np\n\ndef invert(img):\n    pass\n\ndef threshold(img, t):\n    pass\n", tests: [{ after: "img = np.array([[0, 128], [200, 255]])\nprint(invert(img))\nprint(threshold(img, 150))", expected: "[[255 127]\n [ 55   0]]\n[[0 0]\n [1 1]]" }],
      hint: "Both are one line. A mask of True/False becomes 1/0 with <code>.astype(int)</code>.",
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def invert(img):
    return 255 - np.array(img)

def threshold(img, t):
    return (np.array(img) >= t).astype(int)` }] },
    { id: "fix23", lvl: "fire", debug: true, title: "numpy bug hunt", prompt: "<p>Fix so the test prints <code>[40 45]</code> and <code>85.0</code>.</p>", starter: c`import numpy

def mid_range(t):
    a = np.array(t)
    return a[a > 35 and a < 46]

def row_mean(m, r):
    return np.array(m)[:, r].mean()`, tests: [{ after: "print(mid_range([30, 40, 45, 50]))\nprint(row_mean([[80, 90], [70, 60]], 0))", expected: "[40 45]\n85.0" }],
      hint: "Three bugs: the import, combining two conditions, and row vs column.",
      solutions: [{ name: "Fixed", code: c`import numpy as np

def mid_range(t):
    a = np.array(t)
    return a[(a > 35) & (a < 46)]

def row_mean(m, r):
    return np.array(m)[r].mean()`, note: "Import alias, <code>&amp;</code> with parentheses, and a row is <code>m[r]</code> (not <code>m[:, r]</code>)." }] },
    { id: "hotdays", lvl: "seed", title: "Count the hot days", prompt: "<p>Write <code>hot_days(temps, limit)</code> returning how many temperatures are <b>above</b> <code>limit</code>, as a plain <code>int</code>. Use a mask and <code>.sum()</code> — no loop.</p>", starter: "import numpy as np\n\ndef hot_days(temps, limit):\n    pass\n", tests: [{ after: "print(hot_days([38, 45, 41, 29, 47, 36], 40), hot_days([20, 25], 30))", expected: "3 0" }],
      hint: "<code>(a &gt; limit)</code> is a True/False array; True counts as 1 when you sum.",
      solutions: [{ name: "Mask sum", code: c`import numpy as np

def hot_days(temps, limit):
    a = np.array(temps)
    return int((a > limit).sum())` }, { name: "Filter then size", code: c`import numpy as np

def hot_days(temps, limit):
    a = np.array(temps)
    return int(a[a > limit].size)` }] },
  ],
  quiz: [
    { q: "`np.array([1, 2]) * 3` is…", o: ["`[1, 2, 1, 2, 1, 2]`", "`[3 6]`", "Error", "`9`"], a: 1, e: "Vectorized multiplication." },
    { q: "For a 2D array `a`, `a[:, 0]` is…", o: ["the first row", "the first column", "the first element", "all rows except 0"], a: 1, e: "All rows, column 0." },
    { q: "`a.mean(axis=0)` on a 3×4 array returns how many numbers?", o: ["3", "4", "12", "1"], a: 1, e: "One per column." },
    { q: "Keep values between 10 and 20:", o: ["`a[a > 10 and a < 20]`", "`a[(a > 10) & (a < 20)]`", "`a[10:20]`", "`a.filter(10, 20)`"], a: 1, e: "Element-wise `&`." },
    { q: "Why is numpy faster than loops?", o: ["It skips numbers", "Operations run in optimized C over whole arrays", "It uses the internet", "It isn't"], a: 1, e: "Vectorization." },
    { q: "`np.array([5, 9, 3]).argmax()` is…", o: ["`9`", "`1`", "`2`", "`3`"], a: 1, e: "The position of the largest value (9 is at index 1)." },
  ],
  puzzle: { title: "Shape shifter", q: "<p>What does this print?</p>", code: c`import numpy as np
a = np.arange(24).reshape(2, 3, 4)
print(a.shape, a[1, 2, 3], a.sum(axis=2).shape)`, answers: ["(2, 3, 4) 23 (2, 3)"], hint: "The last element of arange(24) is 23. Summing over an axis removes it from the shape.", ar: "الجمع على محور يحذفه من الشكل.", e: "Shape <code>(2, 3, 4)</code>; <code>a[1,2,3]</code> is the very last element <code>23</code>; summing axis 2 leaves <code>(2, 3)</code>. Color images are exactly such 3D arrays: height × width × 3 colors." },
  cards: [
    { f: "Vectorization", b: "Applying an operation to a whole array at once, without Python loops." },
    { f: "Row vs column in numpy", b: "`a[r]` row r; `a[:, c]` column c." },
    { f: "axis=0 vs axis=1", b: "axis=0: down the rows (per column). axis=1: across columns (per row)." },
    { f: "Filter an array", b: "`a[a > 40]`; combine with `&`, `|` and parentheses." },
    { f: "Dot product", b: "`a @ b` = sum of element-wise products (weighted sum)." },
  ],
  remember: [
    "`import numpy as np`, then `np.array(list)` makes an array.",
    "Math on an array applies to **every element** (vectorization): `marks + 5`, `a * b`.",
    "`mean()`, `sum()`, `max()`, `argmax()` answer data questions in one call.",
    "2D arrays are tables: `a[r]` is a row, `a[:, c]` a column, `a[r, c]` one cell.",
    "`axis=0` → one result per column; `axis=1` → one result per row.",
    "Masks filter without loops: `a[a > 40]`; combine with `&` / `|` and parentheses.",
  ],
  rememberAr: "numpy يطبق العملية على كل العناصر مرة واحدة. الصف a[r] والعمود a[:, c]. axis=0 لكل عمود و axis=1 لكل صف. القناع a[a > 40] يفلتر بدون حلقة.",
};
})();

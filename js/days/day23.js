window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[23] = {
  title: "numpy: fast math on whole arrays",
  intro: "AI is mostly math on large tables of numbers: images are grids of pixels, datasets are rows and columns. <b>numpy</b> is the Python library for that — it does math on a whole array at once, often 50–100× faster than a Python loop. Every AI library (scikit-learn, PyTorch, TensorFlow) is built on its ideas.",
  introAr: "numpy مكتبة للحساب السريع على مصفوفات الأرقام، وهي أساس كل مكتبات الذكاء الاصطناعي. الفكرة الأهم: نطبق العملية على المصفوفة كلها مرة واحدة بدون حلقة. (أول تشغيل اليوم يأخذ عدة ثوانٍ لتحميل المكتبة.)",
  goals: ["Create arrays with `np.array`, `arange`, `zeros`, `linspace`", "Do vectorized math without loops", "Use shape, 2D arrays, rows and columns", "Filter with boolean masks", "Compute statistics along an axis"],
  learn: [
    { t: "h", text: "Arrays: lists that do math" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
print(marks)
print(marks + 5)          # add 5 to every element
print(marks * 1.1)
print(marks.mean(), marks.max(), marks.std().round(2))
print(type(marks), marks.dtype, marks.shape)`, before: "<p>The first run loads numpy (a few seconds). After that it's instant.</p>" },
    { t: "p", html: "<p>With a list, <code>[70, 85] * 2</code> repeats the list. With an array, <code>np.array([70, 85]) * 2</code> multiplies every element. This is called <b>vectorization</b>: no loops, and the work runs in fast C code.</p>" },
    { t: "ar", html: "مع numpy لا نحتاج حلقة لكل عنصر: العملية تُطبق على كل العناصر مرة واحدة. np هو الاسم المختصر المتعارف عليه عالميًا لمكتبة numpy." },
    { t: "h", text: "Creating arrays" },
    { t: "code", code: c`import numpy as np
print(np.arange(0, 10, 2))
print(np.linspace(0, 1, 5))
print(np.zeros(3), np.ones(3))
rng = np.random.default_rng(42)
print(rng.integers(1, 7, size=5))` },
    { t: "h", text: "2D arrays: tables" },
    { t: "code", code: c`import numpy as np
# rows = students, columns = quiz1, quiz2, final
grades = np.array([
    [80, 90, 85],
    [60, 75, 70],
    [95, 88, 92],
])
print(grades.shape)
print(grades[0])          # first row (student 0)
print(grades[:, 2])       # third column (all finals)
print(grades[1, 2])       # row 1, column 2
print(grades.mean(axis=0))   # average of each column
print(grades.mean(axis=1))   # average of each row` },
    { t: "analogy", title: "axis in one sentence", html: "<p><code>axis=0</code> goes <b>down</b> the rows (one result per column); <code>axis=1</code> goes <b>across</b> the columns (one result per row).</p>" },
    { t: "h", text: "Boolean masks: filtering without loops" },
    { t: "viz", code: c`import numpy as np
temps = np.array([38, 45, 41, 29, 47, 36])
hot = temps > 40
print(hot)
print(temps[hot])
print((temps > 40).sum(), "hot days")
print(np.where(temps > 40, "hot", "ok"))`, before: "<p>A comparison on an array gives an array of True/False. Using it as an index keeps only the True positions.</p>" },
    { t: "h", text: "Speed test" },
    { t: "code", code: c`import numpy as np, time
n = 1_000_000
data = list(range(n))
arr = np.arange(n)
t = time.time(); total = sum(x * x for x in data); print("python loop:", round(time.time() - t, 3), "s")
t = time.time(); total2 = (arr * arr).sum(); print("numpy:      ", round(time.time() - t, 4), "s")`, noViz: true },
  ],
  mistakes: [
    { title: "Forgetting the import alias", html: "", wrong: c`import numpy
a = np.array([1, 2])   # NameError: np`, right: c`import numpy as np
a = np.array([1, 2])` },
    { title: "Mixing up rows and columns", html: "<code>a[1]</code> is a row. A column needs <code>a[:, 1]</code>.", wrong: c`finals = grades[2]      # this is student 2!`, right: c`finals = grades[:, 2]   # column 2` },
    { title: "and / or on arrays", html: "Use <code>&amp;</code> and <code>|</code> with parentheses.", wrong: c`temps[temps > 30 and temps < 40]`, right: c`temps[(temps > 30) & (temps < 40)]`, ar: "مع مصفوفات numpy استخدم{{g:|ي}} &amp; و | مع الأقواس بدل and و or." },
  ],
  tricks: [
    { title: "reshape", html: "", code: c`import numpy as np
print(np.arange(12).reshape(3, 4))` },
    { title: "Dot product = weighted sum", html: "The core operation of neural networks.", code: c`import numpy as np
marks = np.array([80, 90, 70])
weights = np.array([0.2, 0.3, 0.5])
print(marks @ weights)   # 80*.2 + 90*.3 + 70*.5 = 78.0` },
  ],
  practice: [
    { t: "predict", code: c`import numpy as np
a = np.array([1, 2, 3])
print(a * 2, a + a, a ** 2)`, explain: "Element by element: <code>[2 4 6] [2 4 6] [1 4 9]</code>." },
    { t: "predict", code: c`import numpy as np
m = np.arange(6).reshape(2, 3)
print(m.sum(axis=0), m.sum(axis=1))`, explain: "m = [[0,1,2],[3,4,5]]. Column sums <code>[3 5 7]</code>, row sums <code>[ 3 12]</code>." },
    { t: "parsons", title: "Curve the grades", prompt: "Add 5 points to every mark but cap them at 100, then print the result.", lines: ["import numpy as np", "marks = np.array([97, 80, 91, 60])", "curved = np.minimum(marks + 5, 100)", "print(curved)"], distractors: ["curved = marks + 5 if marks < 100 else 100"], explain: "<code>np.minimum</code> compares element by element: <code>[100 85 96 65]</code>. A plain <code>if</code> can't handle a whole array." },
    { t: "try", title: "Temperature analysis", html: "<p>Riyadh daily max temperatures for two weeks are below. Find: the average, the hottest day number, how many days were above 44, and the average of weekends only (days 5, 6, 12, 13).</p>", code: c`import numpy as np
t = np.array([42, 44, 45, 47, 46, 43, 41, 44, 45, 46, 48, 47, 44, 42])
print("average:", t.mean().round(1))
` },
  ],
  exercises: [
    { id: "norm", lvl: "seed", title: "Scale to 0–1", prompt: "<p>Write <code>normalize(values)</code> returning a numpy array scaled so the min becomes 0 and the max becomes 1: <code>(x - min) / (max - min)</code>. No loops! (Scaling features like this is a standard ML step.)</p>", starter: "import numpy as np\n\ndef normalize(values):\n    pass\n", tests: [{ after: "print(normalize([10, 20, 30, 50]))", expected: "[0.   0.25 0.5  1.  ]" }],
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def normalize(values):
    a = np.array(values, dtype=float)
    return (a - a.min()) / (a.max() - a.min())` }] },
    { id: "pass", lvl: "seed", title: "Passing students", prompt: "<p>Write <code>pass_info(marks)</code> returning a tuple <code>(count_passed, average_of_passed)</code> for marks ≥ 60, the average rounded to 1 decimal. Use a mask.</p>", starter: "import numpy as np\n\ndef pass_info(marks):\n    pass\n", tests: [{ after: "print(pass_info([55, 70, 90, 40, 65]))", expected: "(3, 75.0)" }],
      solutions: [{ name: "Mask", code: c`import numpy as np

def pass_info(marks):
    a = np.array(marks)
    passed = a[a >= 60]
    return int(passed.size), round(float(passed.mean()), 1)`, note: "<code>int()</code> and <code>float()</code> turn numpy numbers into plain Python numbers for clean printing." }] },
    { id: "table", lvl: "star", title: "Grade table", prompt: "<p>Rows are students, columns are (quiz, midterm, final) weighted 20%, 30%, 50%. Write <code>final_scores(grades)</code> returning each student's weighted total rounded to 1 decimal (as a list), and <code>best_column(grades)</code> returning the index of the column with the highest average.</p>", starter: "import numpy as np\n\ndef final_scores(grades):\n    pass\n\ndef best_column(grades):\n    pass\n", tests: [{ after: "g = [[80, 90, 70], [100, 60, 80], [50, 70, 90]]\nprint(final_scores(g))\nprint(best_column(g))", expected: "[78.0, 78.0, 76.0]\n2" }],
      solutions: [{ name: "Dot product", code: c`import numpy as np

def final_scores(grades):
    g = np.array(grades)
    w = np.array([0.2, 0.3, 0.5])
    return np.round(g @ w, 1).tolist()

def best_column(grades):
    return int(np.array(grades).mean(axis=0).argmax())`, note: "<code>argmax</code> gives the <b>position</b> of the maximum." }] },
    { id: "dist", lvl: "star", title: "Distance between points", prompt: "<p>Write <code>distance(p, q)</code>: Euclidean distance √Σ(pᵢ − qᵢ)² between two points of any dimension, rounded to 3 decimals. This exact formula powers the nearest-neighbor AI of Day 24.</p>", starter: "import numpy as np\n\ndef distance(p, q):\n    pass\n", tests: [{ after: "print(distance([0, 0], [3, 4]), distance([1, 2, 3], [4, 6, 3]), distance([1], [1]))", expected: "5.0 5.0 0.0" }],
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def distance(p, q):
    d = np.array(p) - np.array(q)
    return round(float(np.sqrt((d ** 2).sum())), 3)` }, { name: "np.linalg.norm", code: c`import numpy as np

def distance(p, q):
    return round(float(np.linalg.norm(np.array(p) - np.array(q))), 3)` }] },
    { id: "moving", lvl: "fire", title: "Moving average", prompt: "<p>Write <code>moving_average(values, k)</code> returning the averages of every window of k consecutive values, rounded to 2 decimals, as a list. Used for smoothing stock prices and sensor data.</p>", starter: "import numpy as np\n\ndef moving_average(values, k):\n    pass\n", tests: [{ after: "print(moving_average([1, 2, 3, 4, 5, 6], 3))\nprint(moving_average([10, 20], 2))", expected: "[2.0, 3.0, 4.0, 5.0]\n[15.0]" }],
      solutions: [{ name: "Loop over windows", code: c`import numpy as np

def moving_average(values, k):
    a = np.array(values, dtype=float)
    return [round(float(a[i:i + k].mean()), 2) for i in range(len(a) - k + 1)]` }, { name: "convolve", code: c`import numpy as np

def moving_average(values, k):
    out = np.convolve(values, np.ones(k) / k, mode="valid")
    return np.round(out, 2).tolist()`, note: "Convolution slides a window over the data — the same operation used by image-recognition networks (CNNs)." }] },
    { id: "image", lvl: "fire", title: "Tiny image processing", prompt: "<p>An image is a 2D array of brightness values 0–255. Write <code>invert(img)</code> (255 − value) and <code>threshold(img, t)</code> returning 1 where value ≥ t else 0. Return numpy arrays.</p>", starter: "import numpy as np\n\ndef invert(img):\n    pass\n\ndef threshold(img, t):\n    pass\n", tests: [{ after: "img = np.array([[0, 128], [200, 255]])\nprint(invert(img))\nprint(threshold(img, 150))", expected: "[[255 127]\n [ 55   0]]\n[[0 0]\n [1 1]]" }],
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
      solutions: [{ name: "Fixed", code: c`import numpy as np

def mid_range(t):
    a = np.array(t)
    return a[(a > 35) & (a < 46)]

def row_mean(m, r):
    return np.array(m)[r].mean()`, note: "Import alias, <code>&amp;</code> with parentheses, and a row is <code>m[r]</code> (not <code>m[:, r]</code>)." }] },
  ],
  quiz: [
    { q: "`np.array([1, 2]) * 3` is…", o: ["`[1, 2, 1, 2, 1, 2]`", "`[3 6]`", "Error", "`9`"], a: 1, e: "Vectorized multiplication." },
    { q: "For a 2D array `a`, `a[:, 0]` is…", o: ["the first row", "the first column", "the first element", "all rows except 0"], a: 1, e: "All rows, column 0." },
    { q: "`a.mean(axis=0)` on a 3×4 array returns how many numbers?", o: ["3", "4", "12", "1"], a: 1, e: "One per column." },
    { q: "Keep values between 10 and 20:", o: ["`a[a > 10 and a < 20]`", "`a[(a > 10) & (a < 20)]`", "`a[10:20]`", "`a.filter(10, 20)`"], a: 1, e: "Element-wise `&`." },
    { q: "Why is numpy faster than loops?", o: ["It skips numbers", "Operations run in optimized C over whole arrays", "It uses the internet", "It isn't"], a: 1, e: "Vectorization." },
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
};
})();

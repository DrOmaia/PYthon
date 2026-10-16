window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[16] = {
  title: "More functions and modules",
  intro: "Yesterday you wrote functions. Today you use them like a pro: <b>modules</b> — Python's huge library of ready-made functions that you import instead of writing from scratch — then functions that take other functions, tiny <code>lambda</code> functions, and functions that call themselves (recursion).",
  introAr: "اليوم: الوحدات modules مثل math و random و datetime وكيف نستورد ما نحتاجه بدل كتابته من الصفر، ثم الدوال المتقدمة مثل lambda والدالة التي تستدعي نفسها (recursion).",
  goals: ["Import and use `math`, `random`, `datetime`, `statistics`", "Choose between `import m`, `from m import f` and `import m as x`", "Pass functions as arguments (`sorted(key=...)`)", "Write short `lambda` functions", "Write a simple recursive function with a base case", "Accept any number of arguments with `*args`"],
  learn: [
    { t: "h", text: "Modules: Python's toolbox" },
    { t: "p", html: "<p>Many jobs are so common that somebody already wrote and tested them: square roots, random numbers, dates, averages. Python comes with hundreds of <b>modules</b> — files full of ready-made functions. You <b>import</b> them with one line.</p>" },
    { t: "analogy", title: "A module is a toolbox in the garage", html: "<p>You don't buy a new drill every time you need to make a hole — you go to the garage and take the toolbox. <code>import math</code> brings the <b>math</b> toolbox into your program. Then <code>math.sqrt</code> means \"the <code>sqrt</code> tool from the <code>math</code> box\".</p>" },
    { t: "code", code: c`import math

print(math.sqrt(81))
print(math.ceil(4.1))
print(math.floor(4.9))
print(math.pi)`, before: "<p>One import, then every tool is used with the module name and a dot.</p>", note: "<p><code>ceil</code> rounds <b>up</b> (4.1 → 5) and <code>floor</code> rounds <b>down</b> (4.9 → 4). Handy for things like \"how many buses do we need?\"</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      ["import math", "Load the module called <code>math</code>. Do it once, at the top of the program."],
      ["math.sqrt(81)", "Module name, a dot, then the function. The dot means \"from inside\". Result: <code>9.0</code>."],
      ["math.ceil(4.1)", "Another function from the same box: round up → <code>5</code>."],
      ["math.pi", "No parentheses: <code>pi</code> is not a function but a <b>value</b> stored in the module (3.14159…)."]] },
    { t: "ar", html: "لا تعيد{{g:|ي}} اختراع العجلة! مكتبة بايثون القياسية فيها آلاف الدوال الجاهزة. استورد{{g:|ي}}ها بـ import ثم استخدم{{g:|ي}} اسم الوحدة ونقطة واسم الدالة." },
    { t: "check", q: "A class of 45 students goes on a trip. Each bus holds 20. Which line gives the number of buses needed?", o: ["`math.floor(45 / 20)`", "`math.ceil(45 / 20)`", "`45 // 20`"], a: 1, e: "45 / 20 is 2.25, and you can't leave 5 students behind — round **up** to 3 with `math.ceil`.", hint: "2 buses carry only 40 students." },
    { t: "h", text: "Three ways to import" },
    { t: "p", html: "<p>Sometimes you use one function many times and <code>math.</code> in front gets long. <code>from math import sqrt</code> imports just that name, so you write <code>sqrt(9)</code>. And for modules with long names, <code>as</code> gives a short nickname.</p>" },
    { t: "code", code: c`from statistics import mean, median
import datetime as dt

print(mean([80, 90, 70]))
print(median([3, 9, 1]))
print(dt.date(2026, 12, 31))` },
    { t: "table", head: ["Style", "Use as", "When"], rows: [["`import math`", "`math.sqrt(9)`", "clear where it comes from (recommended)"], ["`from math import sqrt`", "`sqrt(9)`", "a few functions you use a lot"], ["`import numpy as np`", "`np.array(...)`", "long names (you'll see this in Week 4)"]] },
    { t: "check", q: "After `from math import sqrt`, which line works?", o: ["`math.sqrt(16)`", "`sqrt(16)`", "both"], a: 1, e: "Only the name `sqrt` was imported. The name `math` itself was not, so `math.sqrt` gives `NameError`." },
    { t: "h", text: "random and datetime" },
    { t: "p", html: "<p>Games, quizzes and simulations need randomness. <code>random.randint(a, b)</code> gives a whole number from a to b (both included), and <code>random.choice(list)</code> picks one item. <code>random.seed(1)</code> makes the \"random\" sequence the same on every run — very useful while testing.</p>" },
    { t: "code", code: c`import random

random.seed(1)
print(random.randint(1, 6))
print(random.choice(["rock", "paper", "scissors"]))`, note: "<p>Change the seed (or delete that line) and run again to see different results.</p>" },
    { t: "code", code: c`from datetime import date

exam = date(2026, 12, 31)
today = date(2026, 9, 29)
left = exam - today
print(left.days, "days until the exam")`, before: "<p>Subtracting two dates gives the time between them. <code>.days</code> takes out the number of days.</p>" },
    { t: "h", text: "Your own module" },
    { t: "p", html: "<p>Any <code>.py</code> file is a module. When a program grows, you move helper functions into their own file and import them. Below, the first lines just <b>create</b> <code>mytools.py</code> (writing files is tomorrow's topic); on your computer you would simply make that file next to your program.</p>" },
    { t: "code", code: c`with open("mytools.py", "w") as f:
    f.write("def shout(t):\n    return t.upper() + '!'\n\nPI = 3.14159\n")

import mytools
print(mytools.shout("modules are easy"))
print(mytools.PI)` },
    { t: "h", text: "Functions are values" },
    { t: "p", html: "<p>A surprising idea: a function is a value, like a number or a list. You can <b>give it to another function</b>. Why is that useful? Think of <code>sorted()</code>. It knows <i>how</i> to sort, but sometimes you want a different rule — sort words by length, students by mark. You pass the rule as a function with <code>key=</code>.</p>" },
    { t: "analogy", title: "Instructions for a helper", html: "<p>You ask a friend to line up the class. \"By height,\" you say — or \"by first name\". Your friend does the lining up; you only give the <b>rule</b>. <code>key=</code> is that rule: a function that, for each item, says what to compare.</p>" },
    { t: "code", code: c`def by_length(word):
    return len(word)

words = ["banana", "fig", "apple", "kiwi"]
print(sorted(words))
print(sorted(words, key=by_length))
print(sorted(words, key=len, reverse=True))` },
    { t: "lines", title: "Read it like a programmer", rows: [
      ["def by_length(word):", "A normal function: given a word, return its length."],
      ["sorted(words)", "No key: alphabetical order."],
      ["sorted(words, key=by_length)", "Pass the function <b>itself</b> — no parentheses! <code>sorted</code> calls <code>by_length</code> on each word and sorts by the results: 3, 4, 5, 6."],
      ["sorted(words, key=len, reverse=True)", "The built-in <code>len</code> does the same job, so you don't even need your own function. <code>reverse=True</code> puts the longest first."]] },
    { t: "ar", html: "مع key نعطي sorted اسم الدالة بدون أقواس، و sorted هي التي تستدعيها على كل عنصر لتعرف على أي أساس ترتب." },
    { t: "check", q: "What does this print?", code: c`print(sorted(["ccc", "a", "bb"], key=len))`, o: ["`['a', 'bb', 'ccc']`", "`['ccc', 'bb', 'a']`", "`[1, 2, 3]`"], a: 0, e: "Sorted by length 1, 2, 3. The items stay strings — `key` only decides the order." },
    { t: "h", text: "lambda: a tiny function in one line" },
    { t: "p", html: "<p>Writing a whole <code>def</code> for a one-line rule feels heavy. <code>lambda</code> makes a small unnamed function right where you need it: <code>lambda s: s[1]</code> means \"given <code>s</code>, return <code>s[1]</code>\". Use it only for short one-liners.</p>" },
    { t: "code", code: c`students = [("Sara", 95), ("Omar", 82), ("Lina", 90)]
print(sorted(students, key=lambda s: s[1]))
print(sorted(students, key=lambda s: s[1], reverse=True))`, note: "<p>Each student is a tuple <code>(name, mark)</code>. The lambda picks the mark (<code>s[1]</code>), so the list is sorted by mark.</p>" },
    { t: "code", code: c`nums = [1, 2, 3, 4, 5, 6]
print(list(map(lambda n: n * 10, nums)))
print(list(filter(lambda n: n % 2 == 0, nums)))
print([n * 10 for n in nums if n % 2 == 0])`, before: "<p>You will also meet <code>map</code> (apply a function to every item) and <code>filter</code> (keep items where the function says True). A list comprehension (Day 10) often does the same more clearly.</p>" },
    { t: "ar", html: "lambda دالة صغيرة بدون اسم في سطر واحد: lambda s: s[1] تعني \"أعطني s وأرجع لك s[1]\". استخدم{{g:|ي}}ها فقط للقواعد القصيرة." },
    { t: "check", q: "What is `(lambda x: x * 2)(5)`?", o: ["`5`", "`10`", "a function"], a: 1, e: "The lambda is created and called immediately with x = 5." },
    { t: "h", text: "Recursion: a function that calls itself" },
    { t: "p", html: "<p>Some problems contain a smaller copy of themselves. \"Count down from 3\" is: say 3, then <i>count down from 2</i>. A <b>recursive</b> function solves the small part and calls itself for the rest. It needs two things: a <b>base case</b> that stops, and each call must move <b>closer</b> to it.</p>" },
    { t: "analogy", title: "Russian dolls", html: "<p>You open a doll and find a smaller doll inside, and open that one too… until you reach the tiniest doll that doesn't open. That tiny doll is the base case. Without it you would open dolls forever — in Python that is a <code>RecursionError</code>.</p>" },
    { t: "viz", code: c`def countdown(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`, before: "<p>Visualize and watch the stack of <code>countdown()</code> boxes grow and shrink.</p>" },
    { t: "code", code: c`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))` },
    { t: "lines", title: "Read it like a programmer", rows: [
      ["if n <= 1:", "The <b>base case</b>: the factorial of 1 is simply 1. No more calls."],
      ["return n * factorial(n - 1)", "The recursive step: 5! = 5 × 4!. The call with <code>n - 1</code> moves toward the base case."],
      ["factorial(5)", "5 × factorial(4) → 5 × 4 × factorial(3) → … → 5 × 4 × 3 × 2 × 1 = <code>120</code>."]] },
    { t: "ar", html: "الدالة العودية تستدعي نفسها بمشكلة أصغر، ولازم يكون فيها شرط توقف (base case) وإلا يحدث RecursionError." },
    { t: "check", q: "What does this print?", code: c`def total(n):
    if n == 0:
        return 0
    return n + total(n - 1)

print(total(4))`, o: ["`4`", "`10`", "`24`"], a: 1, e: "4 + 3 + 2 + 1 + 0 = 10." },
    { t: "steps", title: "Thinking recursively: sum of a list", problem: "<p>How do you <b>think</b> of a recursive solution? Let's build <code>sum_list(nums)</code>, which adds up a list of numbers — without a loop and without <code>sum()</code>.</p>", steps: [
      { html: "<p><b>Find the smaller copy.</b> The sum of <code>[5, 3, 2]</code> is 5 + the sum of <code>[3, 2]</code>. In Python: the first item <code>nums[0]</code> plus the sum of the rest <code>nums[1:]</code> (slicing, Day 10).</p>", code: c`nums[0] + sum_list(nums[1:])` },
      { html: "<p><b>Find the base case.</b> The sum of an empty list is 0. So when the list is empty, return 0.</p>", code: c`if not nums:
    return 0` },
      { html: "<p><b>Check that each call moves closer.</b> The list gets one item shorter each time: 3 items, 2, 1, 0 — it reaches the base case. ✓</p>" },
      { html: "<p><b>Write it and test with small lists</b> you can check by hand: <code>[]</code> → 0, <code>[7]</code> → 7, <code>[5, 3, 2]</code> → 10.</p>" }],
      code: c`def sum_list(nums):
    if not nums:
        return 0
    return nums[0] + sum_list(nums[1:])

print(sum_list([]))
print(sum_list([7]))
print(sum_list([5, 3, 2]))`, ar: "فكّر{{g:|ي}} هكذا: ما النسخة الأصغر من المشكلة؟ ما شرط التوقف؟ هل كل استدعاء يقترب منه؟" },
    { t: "h", text: "Any number of arguments" },
    { t: "p", html: "<p><code>print</code> accepts one value or ten. Your functions can do that too: a star before a parameter (<code>*prices</code>) collects all the arguments into a tuple. Two stars (<code>**info</code>) collect keyword arguments into a dictionary.</p>" },
    { t: "code", code: c`def total(*prices):
    return sum(prices)

print(total(5), total(5, 10, 20))

def profile(name, **info):
    print(name, info)

profile("{{name}}", major="CS", year=1)` },
    { t: "steps", title: "Class leaderboard", problem: "<p>You have each student's marks in three quizzes. Print the students from best to worst average, with the average to 1 decimal, and the class median.</p>", steps: [
      { html: "<p><b>Plan.</b> Store data as a dict: name → list of marks. We need an average per student (<code>statistics.mean</code>), then sort by that average.</p>" },
      { html: "<p><b>Build the averages</b> into a list of tuples <code>(name, average)</code>.</p>", code: c`averages = []
for name, marks in data.items():
    averages.append((name, mean(marks)))` },
      { html: "<p><b>Sort with a key</b>: the lambda picks the average (<code>s[1]</code>); <code>reverse=True</code> puts the best first.</p>", code: c`ranked = sorted(averages, key=lambda s: s[1], reverse=True)` },
      { html: "<p><b>Print</b> each line with an f-string, then the median of all the averages.</p>" }],
      code: c`from statistics import mean, median

data = {"Sara": [90, 95, 88], "Omar": [70, 85, 80], "Lina": [92, 89, 94]}

averages = []
for name, marks in data.items():
    averages.append((name, mean(marks)))

ranked = sorted(averages, key=lambda s: s[1], reverse=True)
for name, avg in ranked:
    print(f"{name:<5} {avg:.1f}")
print("Median:", round(median([a for n, a in averages]), 1))`, ar: "استوردنا mean و median بدل كتابتهما، واستخدمنا lambda مع sorted للترتيب حسب المعدل." },
  ],
  mistakes: [
    { title: "Calling the key function", html: "Pass the function itself, not its result.", wrong: c`sorted(words, key=len())`, right: c`sorted(words, key=len)` },
    { title: "Recursion without a base case", html: "Leads to <code>RecursionError</code>.", wrong: c`def f(n):
    return n + f(n - 1)`, right: c`def f(n):
    if n == 0:
        return 0
    return n + f(n - 1)` },
    { title: "Naming your file like a module", html: "A file called <code>random.py</code> in your folder hides Python's real <code>random</code> module. Never name files <code>random.py</code>, <code>math.py</code>, <code>string.py</code>…", wrong: c`# random.py  (your file)
import random
random.randint(1, 6)   # AttributeError`, right: c`# dice_game.py
import random
random.randint(1, 6)`, ar: "لا تسمّ{{g:|ي}} ملفاتك بأسماء مكتبات بايثون مثل random.py." },
    { title: "Forgetting the module name", html: "After <code>import math</code> the function lives inside <code>math</code>. Writing just <code>sqrt</code> gives <code>NameError</code>.", wrong: c`import math
print(sqrt(25))`, right: c`import math
print(math.sqrt(25))` },
  ],
  tricks: [
    { title: "Explore a module", html: "<code>dir(math)</code> lists everything inside; <code>help(math.sqrt)</code> explains a function.", code: c`import math
print([name for name in dir(math) if not name.startswith("_")][:8])` },
    { title: "random.seed for repeatable results", html: "<code>random.seed(42)</code> makes the \"random\" numbers the same every run — essential for testing games and for reproducible AI experiments in Week 4." },
    { title: "max and min take a key too", html: "The same <code>key=</code> idea works with <code>max</code> and <code>min</code>.", code: c`students = [("Sara", 95), ("Omar", 82), ("Lina", 90)]
print(max(students, key=lambda s: s[1]))
print(min(["banana", "fig", "kiwi"], key=len))` },
  ],
  practice: [
    { t: "predict", code: c`nums = [4, -9, 2, -1]
print(sorted(nums, key=abs))`, explain: "Sorted by absolute value: <code>[-1, 2, 4, -9]</code>." },
    { t: "predict", code: c`def s(n):
    if n == 0:
        return 0
    return n % 10 + s(n // 10)
print(s(472))`, explain: "2 + s(47) = 2 + 7 + s(4) = 2 + 7 + 4 + s(0) = <code>13</code>. Digit sum by recursion!" },
    { t: "predict", code: c`import math
print(math.ceil(7 / 2), math.floor(7 / 2), round(7 / 2))`, explain: "7 / 2 = 3.5. <code>ceil</code> → <code>4</code>, <code>floor</code> → <code>3</code>, and <code>round(3.5)</code> → <code>4</code>." },
    { t: "predict", code: c`words = ["banana", "Cherry", "apple"]
print(sorted(words))
print(sorted(words, key=str.lower))`, explain: "In plain sorting every capital letter comes before every small letter, so <code>['Cherry', 'apple', 'banana']</code>. With <code>key=str.lower</code> each word is compared in small letters (the words themselves don't change): <code>['apple', 'banana', 'Cherry']</code>." },
    { t: "parsons", title: "Dice roller", prompt: "Roll two dice 3 times with a fixed seed and print each total.", lines: ["import random", "random.seed(3)", "for _ in range(3):", "    total = random.randint(1, 6) + random.randint(1, 6)", "    print(total)"], explain: "Import first, seed before rolling." },
    { t: "parsons", title: "Recursive countdown", prompt: "Build a recursive function that prints 3, 2, 1 and then <code>Done</code>.", lines: ["def down(n):", "    if n == 0:", "        print(\"Done\")", "        return", "    print(n)", "    down(n - 1)", "down(3)"], distractors: ["    down(n + 1)"], explain: "<code>n - 1</code> moves toward the base case 0; <code>n + 1</code> would never stop." },
    { t: "viz", code: c`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(4))`, before: "<p>Watch four <code>factorial</code> boxes pile up, then return 1, 2, 6, 24 on the way back.</p>" },
    { t: "try", title: "Rock, paper, scissors", html: "<p>Finish the game: decide who wins and print the result.</p>", code: c`import random
player = input("rock, paper or scissors? ").lower()
computer = random.choice(["rock", "paper", "scissors"])
print("Computer chose", computer)
# who wins?
`, stdin: "rock" },
  ],
  exercises: [
    { id: "hyp", lvl: "seed", title: "Hypotenuse", prompt: "<p>Write <code>hypotenuse(a, b)</code> returning √(a² + b²) rounded to 2 decimals, using <code>math</code>.</p>", starter: "import math\n\ndef hypotenuse(a, b):\n    pass\n", tests: [{ after: "print(hypotenuse(3, 4))", expected: "5.0" }, { after: "print(hypotenuse(1, 1))", expected: "1.41" }],
      hint: "<code>math.sqrt(a ** 2 + b ** 2)</code>, then <code>round(..., 2)</code>.",
      solutions: [{ name: "sqrt", code: c`import math

def hypotenuse(a, b):
    return round(math.sqrt(a ** 2 + b ** 2), 2)` }, { name: "math.hypot", code: c`import math

def hypotenuse(a, b):
    return round(math.hypot(a, b), 2)`, note: "The library already had it. Browsing a module's functions pays off." }] },
    { id: "sortstudents", lvl: "seed", title: "Rank the class", prompt: "<p>Write <code>rank(students)</code> that takes a list of <code>(name, mark)</code> tuples and returns the names from highest to lowest mark.</p>", starter: "def rank(students):\n    pass\n", tests: [{ after: "print(rank([('Sara', 95), ('Omar', 82), ('Lina', 90)]))", expected: "['Sara', 'Lina', 'Omar']" }],
      hint: "<code>sorted(students, key=lambda s: s[1], reverse=True)</code>, then take only the names.",
      solutions: [{ name: "sorted + lambda", code: c`def rank(students):
    ordered = sorted(students, key=lambda s: s[1], reverse=True)
    return [name for name, mark in ordered]` }] },
    { id: "power", lvl: "star", title: "Recursive power", prompt: "<p>Write <code>power(base, exp)</code> recursively (no <code>**</code>, no loops). exp ≥ 0.</p>", starter: "def power(base, exp):\n    pass\n", tests: [{ after: "print(power(2, 10), power(5, 0), power(3, 3))", expected: "1024 1 27" }],
      hint: "Base case: exp == 0 → 1. Otherwise base × power(base, exp − 1).",
      solutions: [{ name: "Simple recursion", code: c`def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)` }, { name: "Fast power", code: c`def power(base, exp):
    if exp == 0:
        return 1
    half = power(base, exp // 2)
    if exp % 2 == 0:
        return half * half
    return half * half * base`, note: "Halving the exponent: 2^1000 needs ~10 calls instead of 1000. This idea (divide and conquer) returns in Week 4." }] },
    { id: "days", lvl: "star", title: "Days until", prompt: "<p>Write <code>days_until(y, m, d)</code> that returns the number of days from 29 Sep 2026 to the given date (use <code>datetime.date</code>, don't use today's real date).</p>", starter: "from datetime import date\n\ndef days_until(y, m, d):\n    pass\n", tests: [{ after: "print(days_until(2026, 12, 31))", expected: "93" }, { after: "print(days_until(2027, 9, 29))", expected: "365" }],
      hint: "Subtract two <code>date</code> objects and take <code>.days</code>.",
      solutions: [{ name: "Date subtraction", code: c`from datetime import date

def days_until(y, m, d):
    start = date(2026, 9, 29)
    return (date(y, m, d) - start).days` }] },
    { id: "fib", lvl: "fire", title: "Fibonacci two ways", prompt: "<p>Write <code>fib(n)</code> returning the n-th Fibonacci number (fib(0)=0, fib(1)=1). It must be fast enough for <code>fib(80)</code>.</p>", starter: "def fib(n):\n    pass\n", tests: [{ after: "print(fib(0), fib(1), fib(10))", expected: "0 1 55" }, { after: "print(fib(80))", expected: "23416728348467685" }],
      hint: "Plain recursion recalculates the same values billions of times for n = 80. Use a loop, or remember results.", ar: "العودية العادية بطيئة جدًا هنا. استخدم{{g:|ي}} حلقة أو خزّن{{g:|ي}} النتائج السابقة.",
      solutions: [{ name: "Loop", code: c`def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a` }, { name: "Memoized recursion", code: c`from functools import lru_cache

@lru_cache
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`, note: "<code>@lru_cache</code> remembers every answer, so each fib(k) is computed once. Called <b>memoization</b> — a key idea in dynamic programming." }] },
    { id: "apply", lvl: "fire", title: "apply_all", prompt: "<p>Write <code>apply_all(funcs, value)</code> that returns a list with the result of each function applied to <code>value</code>.</p>", starter: "def apply_all(funcs, value):\n    pass\n", tests: [{ after: "print(apply_all([abs, str, lambda x: x * 2], -4))", expected: "[4, '-4', -8]" }],
      hint: "Functions are values: loop over <code>funcs</code> and call each one with <code>f(value)</code>.",
      solutions: [{ name: "Comprehension", code: c`def apply_all(funcs, value):
    return [f(value) for f in funcs]` }, { name: "Loop", code: c`def apply_all(funcs, value):
    results = []
    for f in funcs:
        results.append(f(value))
    return results` }] },
    { id: "fix16", lvl: "fire", debug: true, title: "Broken sum_digits", prompt: "<p>Fix the recursive <code>sum_digits(n)</code> so the test prints <code>13 0 9</code>.</p>", starter: c`def sum_digits(n):
    return n % 10 + sum_digits(n / 10)`, tests: [{ after: "print(sum_digits(472), sum_digits(0), sum_digits(9))", expected: "13 0 9" }],
      ar: "خطآن: لا يوجد شرط توقف، والقسمة / تعطي أعدادًا عشرية لا تصل إلى صفر بالضبط.",
      solutions: [{ name: "Fixed", code: c`def sum_digits(n):
    if n == 0:
        return 0
    return n % 10 + sum_digits(n // 10)`, note: "Two bugs: no base case, and <code>/</code> makes floats that never reach exactly 0." }] },
    { id: "longest16", lvl: "star", title: "Longest word", prompt: "<p>Write <code>longest(sentence)</code> that returns the longest word of a sentence. If two words have the same length, return the first one. Use <code>max</code> with a <code>key</code>.</p>", starter: "def longest(sentence):\n    pass\n", tests: [{ after: "print(longest('I love learning Python'))", expected: "learning" }, { after: "print(longest('tea or milk'))", expected: "milk" }],
      hint: "<code>max(sentence.split(), key=len)</code> — <code>max</code> keeps the first of equal items.",
      solutions: [{ name: "max + key", code: c`def longest(sentence):
    return max(sentence.split(), key=len)` }, { name: "Loop", code: c`def longest(sentence):
    best = ""
    for w in sentence.split():
        if len(w) > len(best):
            best = w
    return best`, note: "<code>&gt;</code> (not <code>&gt;=</code>) keeps the first word when lengths are equal." }] },
  ],
  quiz: [
    { q: "`from math import sqrt` lets you write…", o: ["`math.sqrt(4)`", "`sqrt(4)`", "both", "neither"], a: 1, e: "Only the imported name." },
    { q: "What is `(lambda x: x + 1)(4)`?", o: ["4", "5", "a function", "Error"], a: 1, e: "Defined and called immediately." },
    { q: "Every recursive function needs…", o: ["a loop", "a base case", "a lambda", "a module"], a: 1, e: "Otherwise RecursionError." },
    { q: "`sorted([\"bb\", \"a\", \"ccc\"], key=len)` is…", o: ["`['a', 'bb', 'ccc']`", "`['ccc', 'bb', 'a']`", "`[1, 2, 3]`", "Error"], a: 0, e: "By length." },
    { q: "`random.seed(1)` is useful for…", o: ["more randomness", "repeatable results", "speed", "security"], a: 1, e: "Same sequence every run." },
    { q: "What does this print?", code: c`def f(*nums):
    return len(nums)
print(f(4, 5, 6))`, o: ["`1`", "`3`", "`15`", "Error"], a: 1, e: "`*nums` collects all three arguments into the tuple `(4, 5, 6)`." },
  ],
  puzzle: { title: "Tower of Hanoi", q: "<p>Moving n disks in the Tower of Hanoi takes <code>moves(n) = 2 * moves(n - 1) + 1</code> moves, with <code>moves(1) = 1</code>. How many moves for 10 disks?</p>", code: c`def moves(n):
    if n == 1:
        return 1
    return 2 * moves(n - 1) + 1
print(moves(10))`, answers: ["1023"], hint: "Try small n: 1, 3, 7, 15… see the pattern?", ar: "لاحظ{{g:|ي}} النمط: 1، 3، 7، 15…", e: "The pattern is 2ⁿ − 1, so 2¹⁰ − 1 = <b>1023</b>. With 64 disks it would take 18 quintillion moves — the legend says the world ends when monks finish!" },
  cards: [
    { f: "Three ways to import", b: "`import m`, `from m import f`, `import m as alias`." },
    { f: "What is a lambda?", b: "A tiny unnamed function: `lambda x: x * 2`." },
    { f: "Sort by a custom rule", b: "`sorted(items, key=function)`" },
    { f: "Recursion must have…", b: "A base case, and each call must move toward it." },
    { f: "What is memoization?", b: "Remembering results of previous calls (e.g. `@lru_cache`)." },
  ],
  remember: [
    "`import math` then `math.sqrt(x)`; `from math import sqrt` then `sqrt(x)`; `import datetime as dt` gives a short name.",
    "Useful modules: `math` (sqrt, ceil, floor, pi), `random` (randint, choice, seed), `datetime` (date), `statistics` (mean, median).",
    "Never name your own file like a module (`random.py`, `math.py`).",
    "Functions are values: `sorted(items, key=len)` — pass the function **without** parentheses.",
    "`lambda x: expression` is a one-line function, perfect for `key=`.",
    "Recursion = a function calling itself with a smaller problem; it needs a **base case**.",
  ],
  rememberAr: "استورد{{g:|ي}} الوحدات الجاهزة بدل كتابة كل شيء بنفسك. مرّر{{g:|ي}} الدالة بدون أقواس في key، واستخدم{{g:|ي}} lambda للدوال القصيرة، ولا تنس{{g:|ي}} شرط التوقف في العودية.",
};
})();

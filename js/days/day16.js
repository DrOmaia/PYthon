window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[16] = {
  title: "More functions and modules",
  intro: "Yesterday you wrote functions. Today you use them like a pro: functions that take other functions, tiny <code>lambda</code> functions, functions that call themselves (recursion), and <b>modules</b> — Python's huge library of ready-made functions that you import instead of writing from scratch.",
  introAr: "اليوم: الدوال المتقدمة مثل lambda والدالة التي تستدعي نفسها (recursion)، والوحدات modules مثل math و random و datetime، وكيف نستورد ما نحتاجه بدل كتابته من الصفر.",
  goals: ["Import and use `math`, `random`, `datetime`, `statistics`", "Pass functions as arguments (`sorted(key=...)`)", "Write short `lambda` functions", "Write a simple recursive function with a base case", "Accept any number of arguments with `*args`"],
  learn: [
    { t: "h", text: "Modules: Python's toolbox" },
    { t: "code", code: c`import math
import random
from statistics import mean, median
from datetime import date

print(math.sqrt(81), math.ceil(4.1), math.floor(4.9))
random.seed(1)
print(random.randint(1, 6), random.choice(["rock", "paper", "scissors"]))
print(mean([80, 90, 70]), median([3, 9, 1]))
print(date(2026, 12, 31) - date(2026, 9, 29))` },
    { t: "table", head: ["Style", "Use as", "When"], rows: [["`import math`", "`math.sqrt(9)`", "clear where it comes from (recommended)"], ["`from math import sqrt`", "`sqrt(9)`", "a few functions you use a lot"], ["`import numpy as np`", "`np.array(...)`", "long names (you'll see this in Week 4)"]] },
    { t: "ar", html: "لا تعيد{{g:|ي}} اختراع العجلة! مكتبة بايثون القياسية فيها آلاف الدوال الجاهزة. استورد{{g:|ي}}ها بـ import." },
    { t: "h", text: "Your own module" },
    { t: "code", code: c`# Create a file, then import it like any module
with open("mytools.py", "w") as f:
    f.write("def shout(t):\n    return t.upper() + '!'\n\nPI = 3.14159\n")

import mytools
print(mytools.shout("modules are easy"))
print(mytools.PI)`, note: "<p>Any <code>.py</code> file is a module. On your computer you would simply create <code>mytools.py</code> next to your program. Big projects are just many small modules.</p>" },
    { t: "h", text: "Functions are values" },
    { t: "code", code: c`def by_length(word):
    return len(word)

words = ["banana", "fig", "apple", "kiwi"]
print(sorted(words))
print(sorted(words, key=by_length))
print(sorted(words, key=len, reverse=True))
students = [("Sara", 95), ("Omar", 82), ("Lina", 90)]
print(sorted(students, key=lambda s: s[1]))` },
    { t: "p", html: "<p><code>key=</code> receives a <b>function</b> (without parentheses!) that tells <code>sorted</code> what to compare. <code>lambda s: s[1]</code> is a tiny unnamed function: \"given s, return s[1]\". Use lambda only for one-liners.</p>" },
    { t: "code", code: c`nums = [1, 2, 3, 4, 5, 6]
print(list(map(lambda n: n * 10, nums)))
print(list(filter(lambda n: n % 2 == 0, nums)))
print([n * 10 for n in nums if n % 2 == 0])` },
    { t: "h", text: "Recursion: a function that calls itself" },
    { t: "viz", code: c`def countdown(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`, before: "<p>Every recursive function needs a <b>base case</b> that stops, and each call must move toward it. Visualize and watch the stack of <code>countdown()</code> boxes grow and shrink.</p>" },
    { t: "code", code: c`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))` },
    { t: "h", text: "Any number of arguments" },
    { t: "code", code: c`def total(*prices):
    return sum(prices)

print(total(5), total(5, 10, 20))

def profile(name, **info):
    print(name, info)

profile("{{name}}", major="CS", year=1)` },
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
  ],
  tricks: [
    { title: "Explore a module", html: "<code>dir(math)</code> lists everything inside; <code>help(math.sqrt)</code> explains a function." },
    { title: "random.seed for repeatable results", html: "<code>random.seed(42)</code> makes the \"random\" numbers the same every run — essential for testing games and for reproducible AI experiments in Week 4." },
  ],
  practice: [
    { t: "predict", code: c`nums = [4, -9, 2, -1]
print(sorted(nums, key=abs))`, explain: "Sorted by absolute value: <code>[-1, 2, 4, -9]</code>." },
    { t: "predict", code: c`def s(n):
    if n == 0:
        return 0
    return n % 10 + s(n // 10)
print(s(472))`, explain: "2 + s(47) = 2 + 7 + s(4) = 2 + 7 + 4 + s(0) = <code>13</code>. Digit sum by recursion!" },
    { t: "parsons", title: "Dice roller", prompt: "Roll two dice 3 times with a fixed seed and print each total.", lines: ["import random", "random.seed(3)", "for _ in range(3):", "    total = random.randint(1, 6) + random.randint(1, 6)", "    print(total)"], explain: "Import first, seed before rolling." },
    { t: "try", title: "Rock, paper, scissors", html: "<p>Finish the game: decide who wins and print the result.</p>", code: c`import random
player = input("rock, paper or scissors? ").lower()
computer = random.choice(["rock", "paper", "scissors"])
print("Computer chose", computer)
# who wins?
`, stdin: "rock" },
  ],
  exercises: [
    { id: "hyp", lvl: "seed", title: "Hypotenuse", prompt: "<p>Write <code>hypotenuse(a, b)</code> returning √(a² + b²) rounded to 2 decimals, using <code>math</code>.</p>", starter: "import math\n\ndef hypotenuse(a, b):\n    pass\n", tests: [{ after: "print(hypotenuse(3, 4))", expected: "5.0" }, { after: "print(hypotenuse(1, 1))", expected: "1.41" }],
      solutions: [{ name: "sqrt", code: c`import math

def hypotenuse(a, b):
    return round(math.sqrt(a ** 2 + b ** 2), 2)` }, { name: "math.hypot", code: c`import math

def hypotenuse(a, b):
    return round(math.hypot(a, b), 2)`, note: "The library already had it. Browsing a module's functions pays off." }] },
    { id: "sortstudents", lvl: "seed", title: "Rank the class", prompt: "<p>Write <code>rank(students)</code> that takes a list of <code>(name, mark)</code> tuples and returns the names from highest to lowest mark.</p>", starter: "def rank(students):\n    pass\n", tests: [{ after: "print(rank([('Sara', 95), ('Omar', 82), ('Lina', 90)]))", expected: "['Sara', 'Lina', 'Omar']" }],
      solutions: [{ name: "sorted + lambda", code: c`def rank(students):
    ordered = sorted(students, key=lambda s: s[1], reverse=True)
    return [name for name, mark in ordered]` }] },
    { id: "power", lvl: "star", title: "Recursive power", prompt: "<p>Write <code>power(base, exp)</code> recursively (no <code>**</code>, no loops). exp ≥ 0.</p>", starter: "def power(base, exp):\n    pass\n", tests: [{ after: "print(power(2, 10), power(5, 0), power(3, 3))", expected: "1024 1 27" }],
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
      solutions: [{ name: "Comprehension", code: c`def apply_all(funcs, value):
    return [f(value) for f in funcs]` }] },
    { id: "fix16", lvl: "fire", debug: true, title: "Broken sum_digits", prompt: "<p>Fix the recursive <code>sum_digits(n)</code> so the test prints <code>13 0 9</code>.</p>", starter: c`def sum_digits(n):
    return n % 10 + sum_digits(n / 10)`, tests: [{ after: "print(sum_digits(472), sum_digits(0), sum_digits(9))", expected: "13 0 9" }],
      solutions: [{ name: "Fixed", code: c`def sum_digits(n):
    if n == 0:
        return 0
    return n % 10 + sum_digits(n // 10)`, note: "Two bugs: no base case, and <code>/</code> makes floats that never reach exactly 0." }] },
  ],
  quiz: [
    { q: "`from math import sqrt` lets you write…", o: ["`math.sqrt(4)`", "`sqrt(4)`", "both", "neither"], a: 1, e: "Only the imported name." },
    { q: "What is `(lambda x: x + 1)(4)`?", o: ["4", "5", "a function", "Error"], a: 1, e: "Defined and called immediately." },
    { q: "Every recursive function needs…", o: ["a loop", "a base case", "a lambda", "a module"], a: 1, e: "Otherwise RecursionError." },
    { q: "`sorted([\"bb\", \"a\", \"ccc\"], key=len)` is…", o: ["`['a', 'bb', 'ccc']`", "`['ccc', 'bb', 'a']`", "`[1, 2, 3]`", "Error"], a: 0, e: "By length." },
    { q: "`random.seed(1)` is useful for…", o: ["more randomness", "repeatable results", "speed", "security"], a: 1, e: "Same sequence every run." },
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
};
})();

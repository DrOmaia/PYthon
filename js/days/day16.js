window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[16] = {
  title: "More functions and modules",
  intro: "Yesterday you wrote functions. Today you use them like a pro: functions that take other functions, tiny <code>lambda</code> functions, functions that call themselves (recursion), and <b>modules</b> — Python's huge library of ready-made functions that you import instead of writing from scratch.",
  introAr: "اليوم: الدوال المتقدمة مثل lambda والدالة التي تستدعي نفسها (recursion)، والوحدات modules مثل math و random و datetime، وكيف نستورد ما نحتاجه بدل كتابته من الصفر.",
  goals: ["Import and use `math`, `random`, `datetime`, `statistics`", "Pass functions as arguments (`sorted(key=...)`)", "Write short `lambda` functions", "Write a simple recursive function with a base case", "Accept any number of arguments with `*args`"],
  learn: [
    { t: "h", text: "Why modules and smarter functions?" },
    { t: "p", html: "<p>Yesterday you learned to write your own functions. But for many everyday jobs — a square root, a random dice roll, the number of days until the exam — someone has already written a correct, tested function. Python comes with a huge <b>standard library</b>, organized into <b>modules</b>: files full of ready-made functions grouped by topic. Today you learn to use them, and you also learn a few more powerful ways to use functions: passing a function to another function, tiny <code>lambda</code> functions, functions that call themselves, and functions that accept any number of arguments.</p>" },
    { t: "analogy", title: "Modules are a toolbox", html: "<p>You don't build a hammer every time you need to hang a picture — you open the toolbox and take one out. A module is a drawer in Python's toolbox: <code>math</code> holds calculation tools, <code>random</code> holds dice and coin tools, <code>datetime</code> holds calendar tools. <code>import</code> means \"open that drawer\".</p>" },
    { t: "ar", html: "لا تعيد{{g:|ي}} اختراع العجلة! مكتبة بايثون القياسية فيها وحدات (modules) مليئة بالدوال الجاهزة، ونفتحها بكلمة import." },

    { t: "h", text: "import: opening a module" },
    { t: "code", code: c`import math

print(math.sqrt(81))
print(math.ceil(4.1), math.floor(4.9))
print(math.pi)`, before: "<p>Run it. Then try <code>math.sqrt(2)</code> and <code>math.floor(-2.5)</code>.</p>", note: "<p>Line by line:</p><ul><li><code>import math</code> loads the <code>math</code> module. Put imports at the <b>top</b> of your program.</li><li><code>math.sqrt(81)</code> means \"the <code>sqrt</code> function <b>from</b> the <code>math</code> module\". The dot works like a path: module, then the tool inside it. Output: <code>9.0</code> (sqrt always returns a float).</li><li><code>math.ceil(4.1)</code> rounds <b>up</b> to <code>5</code>; <code>math.floor(4.9)</code> rounds <b>down</b> to <code>4</code>. Compare with <code>round()</code>, which goes to the nearest.</li><li><code>math.pi</code> is not a function but a stored value (no parentheses): <code>3.141592653589793</code>.</li></ul><p>Without the <code>import</code> line, <code>math.sqrt</code> would crash with <code>NameError: name 'math' is not defined</code>.</p>" },
    { t: "ar", html: "import math تفتح وحدة math، ثم نستخدم أدواتها بالنقطة: math.sqrt(81). ضع{{g:|ي}} جمل import في أعلى البرنامج، ولا تنس{{g:|ي}} كتابة اسم الوحدة قبل النقطة." },

    { t: "h", text: "The random module" },
    { t: "code", code: c`import random

for _ in range(3):
    print(random.randint(1, 6))
print(random.choice(["rock", "paper", "scissors"]))`, before: "<p>Run it several times. Do you get the same numbers each time?</p>", note: "<p>Line by line:</p><ul><li><code>random.randint(1, 6)</code> returns a random whole number from 1 to 6 — <b>both ends included</b>, unlike <code>range</code>.</li><li><code>for _ in range(3):</code> repeats three times. The name <code>_</code> is a normal variable name that programmers use to say \"I don't need this loop variable\".</li><li><code>random.choice(list)</code> returns one random item from a list.</li></ul><p>The output changes every run — that is the point of randomness, and it is perfect for games.</p>" },
    { t: "code", code: c`import random

random.seed(1)
print(random.randint(1, 6))
print(random.choice(["rock", "paper", "scissors"]))`, before: "<p>Now with a <b>seed</b>. Run it three times and compare.</p>", note: "<p><code>random.seed(1)</code> sets the starting point of the random generator. After the same seed you always get the same sequence: here <code>2</code> and then <code>scissors</code>, every single run. Change the seed to <code>5</code> and you get a different — but again repeatable — sequence. Seeds are essential for testing games and for reproducible AI experiments in Week 4.</p>" },
    { t: "ar", html: "random.randint(1, 6) يرجع رقمًا عشوائيًا من 1 إلى 6 والطرفان مشمولان، و random.choice تختار عنصرًا عشوائيًا من قائمة. و random.seed تجعل النتائج نفسها في كل تشغيل، وهذا مفيد للاختبار." },

    { t: "h", text: "from … import and import … as" },
    { t: "p", html: "<p>Writing the module name every time can get long. There are two other styles of import.</p>" },
    { t: "code", code: c`from statistics import mean, median

print(mean([80, 90, 70]))
print(median([3, 9, 1]))`, before: "<p>Notice there is no <code>statistics.</code> before the function names. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>from statistics import mean, median</code> takes just those two functions out of the module and puts them directly in your program.</li><li><code>mean([80, 90, 70])</code> → the average: <code>80</code>.</li><li><code>median([3, 9, 1])</code> → the middle value after sorting <code>[1, 3, 9]</code>: <code>3</code>.</li></ul><p>The catch: with this style, only the names you listed are available. <code>statistics.mode</code> would be a <code>NameError</code>, because the name <code>statistics</code> itself was never imported.</p>" },
    { t: "code", code: c`import statistics as st
from math import sqrt, pi

print(st.mean([2, 4, 9]))
print(sqrt(16), round(pi, 2))`, before: "<p><code>as</code> gives a module a short nickname. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>import statistics as st</code> imports the whole module, but you call it <code>st</code>. So <code>st.mean([2, 4, 9])</code> → <code>5</code>.</li><li><code>from math import sqrt, pi</code> brings in one function and one value.</li><li><code>sqrt(16)</code> → <code>4.0</code> and <code>round(pi, 2)</code> → <code>3.14</code>.</li></ul><p>You will see nicknames everywhere in data science, like <code>import numpy as np</code> in Week 4.</p>" },
    { t: "table", head: ["Style", "Use as", "When"], rows: [["`import math`", "`math.sqrt(9)`", "clear where it comes from (recommended)"], ["`from math import sqrt`", "`sqrt(9)`", "a few functions you use a lot"], ["`import numpy as np`", "`np.array(...)`", "long names (you'll see this in Week 4)"]] },
    { t: "ar", html: "from math import sqrt تسمح بكتابة sqrt(9) مباشرة، لكن الأسماء التي لم تستوردها غير متاحة. و import statistics as st تعطي الوحدة اسمًا مختصرًا st." },

    { t: "h", text: "Dates with datetime" },
    { t: "code", code: c`from datetime import date

start = date(2026, 9, 29)
end = date(2026, 12, 31)
gap = end - start
print(gap)
print(gap.days, "days left")`, before: "<p>How many days from 29 September to the end of the year? Run it, then try your own birthday.</p>", note: "<p>Line by line:</p><ul><li><code>from datetime import date</code> imports the <code>date</code> tool.</li><li><code>date(2026, 9, 29)</code> creates a date: year, month, day — in that order.</li><li><code>end - start</code> subtracts two dates. Python knows how long each month is, so you don't have to count.</li><li><code>print(gap)</code> shows <code>93 days, 0:00:00</code> — a time difference with hours, minutes and seconds.</li><li><code>gap.days</code> takes just the number of days: <code>93</code>. (<code>.days</code> has no parentheses: it is a stored value, like <code>math.pi</code>.)</li></ul>" },
    { t: "ar", html: "date(سنة, شهر, يوم) تنشئ تاريخًا، وطرح تاريخين يعطي الفرق، و .days تعطي عدد الأيام فقط. انتبه{{g:|ي}} لترتيب القيم: السنة أولًا ثم الشهر ثم اليوم." },
    { t: "predict", code: c`import math
print(math.floor(7.9) + math.ceil(0.2))`, explain: "<code>math.floor(7.9)</code> rounds down to <code>7</code>. <code>math.ceil(0.2)</code> rounds up to <code>1</code>. Output: <code>8</code>." },

    { t: "h", text: "Your own module" },
    { t: "p", html: "<p>Any <code>.py</code> file is a module. When your program grows, you can move your functions into a separate file and import them, exactly like <code>math</code>. On your computer, you would create two files in the <b>same folder</b>:</p>" },
    { t: "static", code: c`# mytools.py
def shout(t):
    return t.upper() + "!"

PI = 3.14159` },
    { t: "static", code: c`# main.py  (in the same folder)
import mytools

print(mytools.shout("modules are easy"))
print(mytools.PI)` },
    { t: "p", html: "<p>The browser here has no <code>mytools.py</code> file, so <code>import mytools</code> would fail with <code>ModuleNotFoundError</code>. To try the idea, the runnable version below puts the module's code at the top of the same program — this is exactly what <code>import</code> gives you.</p>" },
    { t: "code", code: c`# --- what mytools.py contains ---
def shout(t):
    return t.upper() + "!"

PI = 3.14159

# --- what main.py does with it ---
print(shout("modules are easy"))
print(PI)`, before: "<p>Run it. Then imagine the top part living in its own file.</p>", note: "<p>Line by line:</p><ul><li><code>shout(t)</code> returns the text in capitals with an exclamation mark: <code>MODULES ARE EASY!</code>.</li><li><code>PI</code> is a variable defined in the module: <code>3.14159</code>.</li></ul><p>In the two-file version, <code>import mytools</code> runs <code>mytools.py</code> once and gives you its functions and variables through the dot: <code>mytools.shout(...)</code>, <code>mytools.PI</code>. You could also write <code>from mytools import shout</code>. One warning: never name your own file like a real module (<code>random.py</code>, <code>math.py</code>) — it would hide Python's real one.</p>" },
    { t: "ar", html: "أي ملف .py هو وحدة يمكن استيرادها إذا كان في نفس المجلد: import mytools ثم mytools.shout(...). ولا تسمّ{{g:|ي}} ملفاتك بأسماء وحدات بايثون مثل random.py." },

    { t: "h", text: "Functions are values" },
    { t: "p", html: "<p>Here is a surprising idea: a function is a value, like a number or a list. Its name without parentheses refers to the function <b>itself</b>; with parentheses, you <b>call</b> it. So you can store a function in another variable, or give it to another function as an argument.</p>" },
    { t: "code", code: c`def by_length(word):
    return len(word)

measure = by_length
print(measure("banana"))
print(by_length)`, before: "<p>Look at the difference between <code>by_length</code> and <code>by_length(...)</code>. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>measure = by_length</code> — no parentheses, so nothing is called. <code>measure</code> now refers to the <b>same function</b>.</li><li><code>measure(\"banana\")</code> calls it through the new name → <code>6</code>.</li><li><code>print(by_length)</code> prints the function object itself, something like <code>&lt;function by_length at 0x...&gt;</code> (the number is a memory address and changes).</li></ul><p>This is why forgetting <code>()</code> doesn't crash — you just get the function instead of its result.</p>" },
    { t: "code", code: c`def by_length(word):
    return len(word)

words = ["banana", "fig", "apple", "kiwi"]
print(sorted(words))
print(sorted(words, key=by_length))
print(sorted(words, key=len, reverse=True))`, before: "<p><code>sorted()</code> can take a function in its <code>key=</code> argument to decide <b>what to compare</b>. Run it and compare the three orders.</p>", note: "<p>Line by line:</p><ul><li><code>sorted(words)</code> sorts alphabetically: <code>['apple', 'banana', 'fig', 'kiwi']</code>.</li><li><code>key=by_length</code> gives <code>sorted</code> our function (no parentheses!). <code>sorted</code> calls it on each word — fig → 3, kiwi → 4, apple → 5, banana → 6 — and sorts by those numbers: <code>['fig', 'kiwi', 'apple', 'banana']</code>.</li><li><code>key=len</code> does the same with the built-in <code>len</code>, and <code>reverse=True</code> flips the order: <code>['banana', 'apple', 'kiwi', 'fig']</code>.</li></ul><p>The key function only decides the order; the list still contains the original words. <code>key=</code> also works with <code>min()</code> and <code>max()</code>.</p>" },
    { t: "ar", html: "اسم الدالة بدون أقواس يعني الدالة نفسها، ومع الأقواس يعني استدعاءها. لذلك نكتب sorted(words, key=len) بدون أقواس بعد len، فـ sorted هي التي تستدعيها على كل عنصر." },

    { t: "h", text: "lambda: tiny functions without a name" },
    { t: "p", html: "<p>Writing a whole <code>def</code> for a one-line key function is a bit much. A <code>lambda</code> is a short function written in one expression: <code>lambda s: s[1]</code> means \"a function that takes <code>s</code> and returns <code>s[1]</code>\". It is exactly the same as <code>def f(s): return s[1]</code>, but without a name.</p>" },
    { t: "code", code: c`students = [("Sara", 95), ("Omar", 82), ("Lina", 90)]
by_mark = sorted(students, key=lambda s: s[1])
print(by_mark)
best_first = sorted(students, key=lambda s: s[1], reverse=True)
print(best_first[0][0])`, before: "<p>Each student is a tuple <code>(name, mark)</code>. We want to sort by the mark, which is at index 1. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>lambda s: s[1]</code> receives one tuple and returns its mark, e.g. <code>(\"Sara\", 95)</code> → <code>95</code>.</li><li><code>sorted(..., key=lambda s: s[1])</code> sorts by mark, lowest first: <code>[('Omar', 82), ('Lina', 90), ('Sara', 95)]</code>.</li><li>With <code>reverse=True</code>, the best comes first, and <code>best_first[0][0]</code> is the first tuple's name: <code>Sara</code>.</li></ul><p>Rules for <code>lambda</code>: no <code>return</code> keyword (the expression after <code>:</code> is returned automatically), and only one expression. If you need more than that, write a normal <code>def</code>.</p>" },
    { t: "ar", html: "lambda دالة صغيرة بلا اسم في سطر واحد: lambda s: s[1] تعني \"خذ s وأرجع s[1]\". لا نكتب فيها return، وتُستخدم فقط للأشياء القصيرة جدًا مثل key في sorted." },
    { t: "predict", code: c`double = lambda n: n * 2
print(double(4) + 1)
print((lambda x: x + 1)(4))`, explain: "A lambda can be stored in a variable and called like any function: <code>double(4)</code> is <code>8</code>, plus 1 → <code>9</code>. On the last line the lambda is defined and called immediately with 4 → <code>5</code>. Output: <code>9</code> then <code>5</code>." },

    { t: "h", text: "map, filter and list comprehensions" },
    { t: "p", html: "<p>Two built-in functions take a function and apply it to a whole list: <code>map</code> transforms every item, <code>filter</code> keeps only some items. Both give back a lazy object, so we wrap them in <code>list(...)</code> to see the result.</p>" },
    { t: "code", code: c`nums = [1, 2, 3, 4, 5, 6]
tens = map(lambda n: n * 10, nums)
print(list(tens))`, before: "<p><code>map(function, list)</code> calls the function on <b>every</b> item. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>lambda n: n * 10</code> multiplies one number by 10.</li><li><code>map(...)</code> applies it to each item of <code>nums</code>: 1 → 10, 2 → 20, and so on.</li><li><code>list(tens)</code> collects the results into a list: <code>[10, 20, 30, 40, 50, 60]</code>.</li></ul><p>Without <code>list(...)</code>, <code>print(tens)</code> would only show <code>&lt;map object at 0x...&gt;</code>.</p>" },
    { t: "code", code: c`nums = [1, 2, 3, 4, 5, 6]
evens = filter(lambda n: n % 2 == 0, nums)
print(list(evens))`, before: "<p><code>filter(function, list)</code> keeps the items where the function returns <code>True</code>. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>lambda n: n % 2 == 0</code> returns <code>True</code> for even numbers and <code>False</code> for odd ones.</li><li><code>filter(...)</code> keeps only the items that got <code>True</code>.</li><li>Output: <code>[2, 4, 6]</code>.</li></ul><p>The function you give to <code>filter</code> must answer a yes/no question.</p>" },
    { t: "code", code: c`nums = [1, 2, 3, 4, 5, 6]
print([n * 10 for n in nums])
print([n for n in nums if n % 2 == 0])
print([n * 10 for n in nums if n % 2 == 0])`, before: "<p>Remember list comprehensions from Day 10? They do the same jobs, and most Python programmers find them easier to read. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>[n * 10 for n in nums]</code> — \"<code>n * 10</code> for each <code>n</code>\" — same as the <code>map</code>: <code>[10, 20, 30, 40, 50, 60]</code>.</li><li><code>[n for n in nums if n % 2 == 0]</code> — keep <code>n</code> only <b>if</b> it is even — same as the <code>filter</code>: <code>[2, 4, 6]</code>.</li><li>The last line does both at once: <code>[20, 40, 60]</code>.</li></ul><p>You should be able to read <code>map</code> and <code>filter</code> in other people's code, but for your own code a comprehension is usually the clearest choice.</p>" },
    { t: "ar", html: "map تطبق دالة على كل عنصر، و filter تُبقي العناصر التي ترجع لها الدالة True، ونحوّل الناتج إلى قائمة بـ list(...). والـ list comprehension يقوم بالعملين بشكل أوضح غالبًا." },

    { t: "h", text: "Recursion: a function that calls itself" },
    { t: "p", html: "<p>A function can call <b>itself</b>. This is called <b>recursion</b>. It is useful when a big problem contains a smaller copy of the same problem: counting down from 3 is \"say 3, then count down from 2\". Every recursive function needs two parts: a <b>base case</b> that stops without calling itself again, and a <b>recursive step</b> that calls itself with a smaller problem, moving toward the base case.</p>" },
    { t: "viz", code: c`def countdown(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`, before: "<p>Visualize and press Next ▶ slowly. Watch the stack of <code>countdown()</code> boxes grow, each with its own <code>n</code>, and then shrink.</p>", note: "<p>Step by step:</p><ul><li><code>countdown(3)</code>: n is not 0, so it prints <code>3</code> and calls <code>countdown(2)</code>.</li><li><code>countdown(2)</code> prints <code>2</code> and calls <code>countdown(1)</code>, which prints <code>1</code> and calls <code>countdown(0)</code>.</li><li><code>countdown(0)</code> is the <b>base case</b>: it prints <code>Go!</code> and returns without calling again.</li><li>Then each waiting box finishes, from the newest to the oldest.</li></ul><p>Output: <code>3</code>, <code>2</code>, <code>1</code>, <code>Go!</code>. Each call has its <b>own</b> local <code>n</code> — that is scope from Day 15 at work. A bare <code>return</code> just ends the function and returns <code>None</code>.</p>" },
    { t: "code", code: c`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`, before: "<p>The factorial of 5 is 5 × 4 × 3 × 2 × 1. Notice that 5! = 5 × 4!. Run it, then try <code>factorial(10)</code>.</p>", note: "<p>Line by line:</p><ul><li>Base case: for <code>n &lt;= 1</code> the answer is simply <code>1</code>.</li><li>Recursive step: <code>n * factorial(n - 1)</code> — \"n times the factorial of the smaller number\".</li></ul><p>The calls go down: <code>factorial(5)</code> = 5 × <code>factorial(4)</code> = 5 × 4 × <code>factorial(3)</code> … until <code>factorial(1)</code> returns 1. Then the answers come back up: 1, 2, 6, 24, <b>120</b>. Output: <code>120</code>.</p>" },
    { t: "code", code: c`def forever(n):
    return forever(n - 1)

forever(3)`, expectError: true, before: "<p>What happens without a base case? This one crashes on purpose. Run it and read the last line.</p>", note: "<p>The function always calls itself and never stops: 3, 2, 1, 0, -1, -2 … Each call opens a new box, and Python stops after about 1000 boxes with <code>RecursionError: maximum recursion depth exceeded</code>. It means \"too many calls inside calls\". The fix is always the same: add a base case, and make sure every call moves toward it.</p>" },
    { t: "ar", html: "الدالة العودية تستدعي نفسها، ويجب أن يكون لها حالة توقف (base case) وأن يقترب كل استدعاء منها. بدون حالة التوقف يظهر الخطأ RecursionError." },
    { t: "predict", code: c`def total(n):
    if n == 0:
        return 0
    return n + total(n - 1)

print(total(4))`, explain: "<code>total(4)</code> = 4 + <code>total(3)</code> = 4 + 3 + <code>total(2)</code> = 4 + 3 + 2 + 1 + <code>total(0)</code>, and the base case gives 0. Output: <code>10</code>." },

    { t: "h", text: "Any number of arguments: *args and **kwargs" },
    { t: "p", html: "<p><code>print()</code> accepts one value, two, or ten. Your functions can do the same. A star <code>*</code> before a parameter name collects <b>all extra positional arguments</b> into a tuple. Two stars <code>**</code> collect <b>all extra keyword arguments</b> into a dictionary.</p>" },
    { t: "code", code: c`def total(*prices):
    print(prices)
    return sum(prices)

print(total(5))
print(total(5, 10, 20))`, before: "<p>Run it and look at what <code>prices</code> is inside the function.</p>", note: "<p>Line by line:</p><ul><li><code>*prices</code> means \"put all the arguments into one tuple called <code>prices</code>\".</li><li><code>total(5)</code>: <code>prices</code> is <code>(5,)</code> — a tuple with one item (the comma marks it as a tuple). <code>sum</code> returns <code>5</code>.</li><li><code>total(5, 10, 20)</code>: <code>prices</code> is <code>(5, 10, 20)</code>, and the function returns <code>35</code>.</li></ul><p>Inside the function it is an ordinary tuple, so you can loop over it, use <code>len</code>, and so on. The name <code>args</code> is just a habit; the star is what matters.</p>" },
    { t: "code", code: c`def profile(name, **info):
    print(name, info)

profile("{{name}}", major="CS", year=1)
profile("Omar")`, before: "<p>Now with two stars. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>name</code> is a normal parameter and gets the first argument.</li><li><code>**info</code> collects every <code>keyword=value</code> argument into a dictionary (Day 12): <code>{'major': 'CS', 'year': 1}</code>.</li><li><code>profile(\"Omar\")</code> passes no keyword arguments, so <code>info</code> is an empty dictionary <code>{}</code>.</li></ul><p>This is handy for optional extra information whose names you don't know in advance.</p>" },
    { t: "ar", html: "*args تجمع أي عدد من القيم في tuple، و **kwargs تجمع القيم المسماة (key=value) في قاموس. المهم هو النجمة وليس الاسم." },

    { t: "h", text: "Putting it together: a dice tournament" },
    { t: "code", code: c`import random
from statistics import mean

def roll(times):
    total = 0
    for i in range(times):
        total += random.randint(1, 6)
    return total

random.seed(4)
results = []
for name in ["Sara", "Omar", "Lina"]:
    results.append((name, roll(3)))
ranked = sorted(results, key=lambda r: r[1], reverse=True)
print("Winner:", ranked[0][0], "with", ranked[0][1])
print("Average score:", round(mean([r[1] for r in results]), 1))`, together: true, before: "<p>Three friends each roll three dice; the highest total wins. Read the program, then run it. Change the seed to <code>5</code> and see who wins now. Then remove the seed line completely.</p>", note: "<p>How it works:</p><ul><li>Two imports: the whole <code>random</code> module, and just <code>mean</code> from <code>statistics</code>.</li><li><code>roll(times)</code> is our own function: it adds up <code>times</code> random dice and <b>returns</b> the total.</li><li><code>random.seed(4)</code> makes the game repeatable: Sara gets 6, Omar 14, Lina 4.</li><li>The loop builds a list of <code>(name, total)</code> tuples by calling <code>roll(3)</code> for each player.</li><li><code>sorted(..., key=lambda r: r[1], reverse=True)</code> ranks the tuples by score, highest first, so <code>ranked[0]</code> is the winner: <code>Winner: Omar with 14</code>.</li><li>The list comprehension pulls out the scores, and <code>mean</code> gives <code>Average score: 8</code> (the mean of whole numbers that divides evenly stays a whole number).</li></ul><p>Modules gave us the randomness and the average, our own function hid the rolling details, and a lambda told <code>sorted</code> what to compare.</p>" },
    { t: "ar", html: "جمعنا أفكار اليوم: استوردنا random و mean، وكتبنا دالة roll ترجع مجموع الرميات، ثم رتبنا النتائج بـ sorted مع lambda. و seed تجعل النتيجة نفسها في كل تشغيل." },
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

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[15] = {
  title: "Functions: write once, use everywhere",
  intro: "Week 3 is about organizing code like a professional, {{name}}. It starts with the most important idea in programming: the <b>function</b>. You give a piece of code a name, and from then on you can use it with one line — as many times as you want, with different inputs.",
  introAr: "الدالة كود له اسم نكتبه مرة ونستخدمه مرات كثيرة. اليوم نتعلم def والمعاملات و return، والفرق المهم جدًا بين print و return.",
  goals: ["Define functions with `def` and call them", "Pass information in with parameters", "Send results back with `return`", "Explain the difference between `print` and `return`", "Understand local variables (scope)"],
  learn: [
    { t: "h", text: "Your first function" },
    { t: "code", code: c`def greet():
    print("Hello!")
    print("Welcome to Week 3")

greet()
greet()` },
    { t: "p", html: "<p><code>def</code> <b>defines</b> the function — nothing runs yet. The indented block is the function's <b>body</b>. Writing <code>greet()</code> <b>calls</b> it: Python jumps into the body, runs it, and comes back.</p>" },
    { t: "analogy", title: "A function is a recipe card", html: "<p>Writing the recipe (<code>def</code>) doesn't cook anything. Cooking happens each time someone follows it (the call). And the same recipe works with different ingredients — those are the <b>parameters</b>.</p>" },
    { t: "h", text: "Parameters: giving the function input" },
    { t: "code", code: c`def greet(name, city):
    print(f"Hello {name} from {city}!")

greet("{{name}}", "Riyadh")
greet("Omar", "Jeddah")
greet(city="Dammam", name="Lina")` },
    { t: "h", text: "return: giving back a result" },
    { t: "viz", code: c`def area(width, height):
    result = width * height
    return result

room = area(4, 5)
hall = area(10, 3)
print(room + hall)`, before: "<p><code>return</code> sends a value back to the place where the function was called. Visualize: watch a new box for <code>area()</code> appear with its own variables, then disappear after returning.</p>" },
    { t: "h", text: "print vs return — the #1 beginner confusion" },
    { t: "code", code: c`def double_print(x):
    print(x * 2)

def double_return(x):
    return x * 2

a = double_print(5)
b = double_return(5)
print("a is", a)
print("b is", b)
print(double_return(5) + 1)` },
    { t: "ar", html: "print تعرض القيمة على الشاشة فقط ثم تضيع. return ترجع القيمة للبرنامج لكي نخزنها أو نحسب بها. الدالة التي ليس فيها return ترجع None." },
    { t: "table", head: ["", "print", "return"], rows: [["shows on screen", "yes", "no"], ["result can be stored/used", "no (gives None)", "yes"], ["ends the function", "no", "yes"]] },
    { t: "h", text: "Default values and multiple returns" },
    { t: "code", code: c`def price_with_vat(price, vat=0.15):
    return round(price * (1 + vat), 2)

print(price_with_vat(100))
print(price_with_vat(100, 0.05))

def stats(nums):
    return min(nums), max(nums), sum(nums) / len(nums)

low, high, avg = stats([70, 85, 90])
print(low, high, avg)` },
    { t: "h", text: "Scope: what happens in a function stays in a function" },
    { t: "code", code: c`def calc():
    secret = 42
    return secret + 1

print(calc())
print(secret)`, note: "<p>Variables created inside a function are <b>local</b>: they exist only while the function runs. This is a feature — functions can't accidentally mess up each other's variables. The error at the end is expected.</p>" },
    { t: "tip", title: "Docstrings", html: "Describe what a function does in a string right under <code>def</code>. Editors and <code>help()</code> show it.", code: c`def bmi(weight, height):
    """Return body mass index from kg and meters."""
    return weight / height ** 2` },
  ],
  mistakes: [
    { title: "Printing instead of returning", html: "The function shows the answer but the program can't use it.", wrong: c`def add(a, b):
    print(a + b)
total = add(2, 3) * 10   # TypeError: None * 10`, right: c`def add(a, b):
    return a + b
total = add(2, 3) * 10   # 50` },
    { title: "Forgetting the parentheses when calling", html: "", wrong: c`greet`, right: c`greet()` },
    { title: "Code after return never runs", html: "", wrong: c`def f(x):
    return x * 2
    print("done")   # never printed`, right: c`def f(x):
    print("done")
    return x * 2`, ar: "return تنهي الدالة فورًا، فأي سطر بعدها داخل الدالة لن يُنفذ." },
    { title: "Using the function before defining it", html: "Python reads top to bottom; the <code>def</code> must run first.", wrong: c`print(square(3))
def square(n):
    return n * n`, right: c`def square(n):
    return n * n
print(square(3))` },
  ],
  tricks: [
    { title: "Return early", html: "Handle special cases first and return — no deep nesting.", code: c`def grade(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    return "C or below"` },
    { title: "A function should do one job", html: "If you can't name it clearly in a few words (<code>calculate_total</code>, <code>is_valid_email</code>), it's probably doing too much. Split it." },
  ],
  practice: [
    { t: "predict", code: c`def f(x):
    return x + 1

print(f(f(f(1))))`, explain: "Inside out: f(1)=2, f(2)=3, f(3)=<code>4</code>." },
    { t: "predict", code: c`def show(n):
    print(n)

x = show(7)
print(x)`, explain: "<code>7</code> is printed inside the function, then <code>None</code> because nothing was returned." },
    { t: "parsons", title: "Is it even?", prompt: "Build a function <code>is_even(n)</code> that returns True or False, then use it.", lines: ["def is_even(n):", "    return n % 2 == 0", "", "print(is_even(10))"], distractors: ["    print(n % 2 == 0)"], explain: "The comparison already gives a bool — return it directly." },
    { t: "try", title: "Refactor with a function", html: "<p>The code below repeats itself. Write a function <code>box(text)</code> that prints the border, the text, and the border — then call it three times.</p>", code: c`print("=" * 20)
print("Python")
print("=" * 20)
print("=" * 20)
print("Week 3")
print("=" * 20)` },
  ],
  exercises: [
    { id: "square", lvl: "seed", title: "square(n)", prompt: "<p>Write a function <code>square(n)</code> that <b>returns</b> n × n. The test calls it, so don't read input and don't print.</p>", starter: "def square(n):\n    pass\n", tests: [{ after: "print(square(4))", expected: "16" }, { after: "print(square(-3), square(0))", expected: "9 0" }],
      hint: "Replace <code>pass</code> with <code>return ...</code>.",
      solutions: [{ name: "return", code: c`def square(n):
    return n * n` }, { name: "power", code: c`def square(n):
    return n ** 2` }] },
    { id: "greeting", lvl: "seed", title: "greeting(name, lang)", prompt: "<p>Write <code>greeting(name, lang=\"en\")</code> that returns <code>Hello, NAME!</code> for <code>\"en\"</code> and <code>مرحبا NAME!</code> for <code>\"ar\"</code>.</p>", starter: "def greeting(name, lang=\"en\"):\n    pass\n", tests: [{ after: "print(greeting('Sara'))", expected: "Hello, Sara!" }, { after: "print(greeting('Omar', 'ar'))", expected: "مرحبا Omar!" }],
      solutions: [{ name: "if", code: c`def greeting(name, lang="en"):
    if lang == "ar":
        return f"مرحبا {name}!"
    return f"Hello, {name}!"` }] },
    { id: "maxof", lvl: "star", title: "my_max(numbers)", prompt: "<p>Write <code>my_max(numbers)</code> that returns the biggest number of a list <b>without</b> using <code>max()</code>. For an empty list return <code>None</code>.</p>", starter: "def my_max(numbers):\n    pass\n", tests: [{ after: "print(my_max([3, 9, 2]))", expected: "9" }, { after: "print(my_max([-5, -1, -9]))", expected: "-1" }, { after: "print(my_max([]))", expected: "None" }],
      solutions: [{ name: "Champion", code: c`def my_max(numbers):
    if not numbers:
        return None
    best = numbers[0]
    for n in numbers:
        if n > best:
            best = n
    return best`, note: "<code>if not numbers</code> is True for an empty list — an early return guard." }] },
    { id: "vowels", lvl: "star", title: "count_vowels(text)", prompt: "<p>Return the number of vowels (a e i o u, any case) in <code>text</code>.</p>", starter: "def count_vowels(text):\n    pass\n", tests: [{ after: "print(count_vowels('Artificial Intelligence'))", expected: "10" }, { after: "print(count_vowels('xyz'))", expected: "0" }],
      solutions: [{ name: "Loop", code: c`def count_vowels(text):
    count = 0
    for ch in text.lower():
        if ch in "aeiou":
            count += 1
    return count` }, { name: "sum", code: c`def count_vowels(text):
    return sum(ch in "aeiou" for ch in text.lower())` }] },
    { id: "password", lvl: "star", title: "is_strong(password)", prompt: "<p>Return <code>True</code> if the password has at least 8 characters, at least one digit, at least one uppercase and at least one lowercase letter.</p>", starter: "def is_strong(password):\n    pass\n", tests: [{ after: "print(is_strong('Py30Rocks'))", expected: "True" }, { after: "print(is_strong('py30rocks'))", expected: "False" }, { after: "print(is_strong('Short1A'))", expected: "False" }, { after: "print(is_strong('NODIGITSs'))", expected: "False" }],
      solutions: [{ name: "Flags", code: c`def is_strong(password):
    if len(password) < 8:
        return False
    has_digit = has_upper = has_lower = False
    for ch in password:
        if ch.isdigit():
            has_digit = True
        elif ch.isupper():
            has_upper = True
        elif ch.islower():
            has_lower = True
    return has_digit and has_upper and has_lower` }, { name: "any()", code: c`def is_strong(password):
    return (len(password) >= 8
            and any(ch.isdigit() for ch in password)
            and any(ch.isupper() for ch in password)
            and any(ch.islower() for ch in password))`, note: "<code>any()</code> is True if at least one item is True." }] },
    { id: "compose", lvl: "fire", title: "Functions using functions", prompt: "<p>Write <code>letter(score)</code> (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, else F) and <code>report(scores)</code> that returns a string like <code>\"A:1 B:2 F:1\"</code> — only letters that appear, in the order A B C D F. <code>report</code> must call <code>letter</code>.</p>", starter: "def letter(score):\n    pass\n\ndef report(scores):\n    pass\n", tests: [{ after: "print(letter(85), letter(59))", expected: "B F" }, { after: "print(report([95, 85, 82, 40]))", expected: "A:1 B:2 F:1" }],
      solutions: [{ name: "Dict count", code: c`def letter(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "F"

def report(scores):
    counts = {}
    for s in scores:
        g = letter(s)
        counts[g] = counts.get(g, 0) + 1
    parts = []
    for g in "ABCDF":
        if g in counts:
            parts.append(f"{g}:{counts[g]}")
    return " ".join(parts)` }] },
    { id: "fix15", lvl: "fire", debug: true, title: "The function that forgets", prompt: "<p>Fix <code>average(nums)</code> so that the test prints <code>85.0</code> and <code>True</code>.</p>", starter: c`def average(nums):
    total = 0
    for n in nums:
        total += n
        avg = total / len(nums)
        print(avg)`, tests: [{ after: "a = average([80, 90])\nprint(a)\nprint(average([100]) == 100)", expected: "85.0\nTrue" }],
      ar: "الدالة تطبع ولا ترجع، والحساب داخل الحلقة.",
      solutions: [{ name: "Fixed", code: c`def average(nums):
    total = 0
    for n in nums:
        total += n
    return total / len(nums)` }] },
  ],
  quiz: [
    { q: "What does a function return if it has no `return`?", o: ["0", "`None`", "An error", "The last value"], a: 1, e: "Always None." },
    { q: "What does this print?", code: c`def f(a, b=2):
    return a * b
print(f(3), f(3, 3))`, o: ["`6 9`", "`5 6`", "`3 9`", "Error"], a: 0, e: "Default b=2 unless given." },
    { q: "Which line defines a function?", o: ["`function f():`", "`def f():`", "`f() = def`", "`define f:`"], a: 1, e: "`def`." },
    { q: "A variable created inside a function is…", o: ["global", "local", "shared", "constant"], a: 1, e: "Only exists inside." },
    { q: "`return a, b` returns…", o: ["only a", "a tuple (a, b)", "a list", "an error"], a: 1, e: "Unpack it with `x, y = f()`." },
  ],
  puzzle: { title: "Function chain", q: "<p>What does this print?</p>", code: c`def a(x):
    return x * 2
def b(x):
    return a(x) + 1
def c(x):
    return b(a(x))
print(c(3))`, answers: ["13"], hint: "c(3) = b(a(3)) = b(6).", ar: "ابدأ{{g:|ي}} من الداخل: a(3) أولًا.", e: "a(3)=6, b(6)=a(6)+1=13." },
  cards: [
    { f: "print vs return", b: "print shows text; return gives a value back to the caller (and ends the function)." },
    { f: "Default parameter", b: "`def f(x, vat=0.15):` — used when no value is passed." },
    { f: "What is scope?", b: "Where a variable exists. Variables inside a function are local." },
    { f: "Return two values", b: "`return a, b` then `x, y = f()`." },
  ],
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[15] = {
  title: "Functions: write once, use everywhere",
  intro: "Week 3 is about organizing code like a professional, {{name}}. It starts with the most important idea in programming: the <b>function</b>. You give a piece of code a name, and from then on you can use it with one line — as many times as you want, with different inputs.",
  introAr: "الدالة كود له اسم نكتبه مرة ونستخدمه مرات كثيرة. اليوم نتعلم def والمعاملات و return، والفرق المهم جدًا بين print و return.",
  goals: ["Define functions with `def` and call them", "Pass information in with parameters", "Send results back with `return`", "Explain the difference between `print` and `return`", "Use default values and return several values", "Understand local variables (scope)"],
  learn: [
    { t: "h", text: "Why functions?" },
    { t: "p", html: "<p>Imagine you print a border around a title in your marks program, then again for the timetable, then for the receipt. You copy the same lines again and again. One day you want a different border — and you must find and change every copy.</p><p>A <b>function</b> solves this. You write the code <b>once</b>, give it a name, and use the name wherever you need it. Change it in one place and every use changes. You already use functions: <code>print()</code>, <code>len()</code> and <code>round()</code> were written by somebody else. Today you write your own.</p>" },
    { t: "analogy", title: "A function is a recipe card", html: "<p>Writing a recipe card does not cook anything. The cooking happens <b>each time</b> someone follows the card. In Python, <code>def</code> writes the card, and a <b>call</b> follows it. And the same recipe works with different ingredients — those will be the <b>parameters</b>.</p>" },
    { t: "h", text: "Your first function" },
    { t: "code", code: c`def greet():
    print("Hello!")
    print("Welcome to Week 3")

greet()
greet()`, before: "<p>Look at the two parts: the <code>def</code> block and the two <code>greet()</code> lines.</p>", note: "<p>The greeting appears <b>twice</b>, because the function was called twice. The <code>def</code> block alone printed nothing.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      ["def greet():", "<code>def</code> means <b>define</b>: \"I am creating a function called <code>greet</code>\". The empty <code>()</code> say it needs no input. The line ends with a colon <code>:</code>, just like <code>if</code> and <code>for</code>."],
      ["    print(\"Hello!\")", "The indented lines are the function's <b>body</b>. Python remembers them but does <b>not</b> run them yet."],
      ["greet()", "This is a <b>call</b>. Python jumps into the body, runs it from top to bottom, then comes back to the next line."],
      ["greet()", "A second call runs the whole body again. Write once, use as often as you like."]] },
    { t: "ar", html: "def تعرّف الدالة فقط ولا تنفذها. التنفيذ يحدث عند الاستدعاء بكتابة اسم الدالة مع الأقواس مثل greet()." },
    { t: "check", q: "How many lines does this program print?", code: c`def hello():
    print("Hi")
    print("Bye")

hello()`, o: ["0", "2", "4"], a: 1, e: "The function is called once, and its body has two prints.", hint: "Count the calls, then the prints inside the body." },
    { t: "h", text: "Parameters: giving the function input" },
    { t: "p", html: "<p>A greeting that always says the same thing is not very useful. You want to greet Sara, then Omar, then Lina — the same code, a different name each time. A <b>parameter</b> is a variable in the parentheses of <code>def</code>. When you call the function, the value you put in the parentheses (the <b>argument</b>) goes into that variable.</p>" },
    { t: "analogy", title: "Parameters are the blanks on a form", html: "<p>A printed certificate says: \"This certificate is given to ________\". The blank is the parameter. Each time you fill it in with a real name, you get a new certificate from the same template.</p>" },
    { t: "code", code: c`def greet(name):
    print(f"Hello, {name}!")

greet("{{name}}")
greet("Omar")`, note: "<p>The first call puts <code>\"{{name}}\"</code> into <code>name</code>; the second call puts <code>\"Omar\"</code> into it. Same body, different output.</p>" },
    { t: "p", html: "<p>A function can have several parameters, separated by commas. Python fills them <b>in order</b>. You can also name them in the call (<b>keyword arguments</b>) — then the order doesn't matter.</p>" },
    { t: "code", code: c`def order(drink, size):
    print(f"One {size} {drink}, please")

order("latte", "large")
order(size="small", drink="tea")` },
    { t: "ar", html: "المعامل (parameter) هو المتغير داخل أقواس def، والقيمة التي نرسلها عند الاستدعاء اسمها argument. القيم توزع بالترتيب إلا إذا كتبنا الأسماء." },
    { t: "check", q: "What does this print?", code: c`def show(a, b):
    print(a, b)

show(b=1, a=2)`, o: ["`1 2`", "`2 1`", "An error"], a: 1, e: "With keyword arguments, `a` gets 2 and `b` gets 1. The body prints `a` first.", hint: "Look at which value went into `a`." },
    { t: "h", text: "return: giving back a result" },
    { t: "p", html: "<p>Often you want to <b>use</b> a function's answer: store it, add it, compare it. <code>len(\"Riyadh\")</code> doesn't show anything on screen — it gives you back <code>6</code> so you can use it. Your functions do the same with <code>return</code>.</p>" },
    { t: "analogy", title: "Ordering coffee", html: "<p>You give the barista your order (the arguments). The barista works in the back (the body) and hands you a cup (the return value). What you do with the cup is up to you — drink it, give it to a friend, put it on the table.</p>" },
    { t: "code", code: c`def area(width, height):
    return width * height

room = area(4, 5)
print(room)
print(area(10, 3) + 1)`, note: "<p><code>area(4, 5)</code> is <b>replaced</b> by its result <code>20</code>, so <code>room = 20</code>. In the last line <code>area(10, 3)</code> becomes <code>30</code>, then Python adds 1.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      ["def area(width, height):", "Two parameters. Each call must give two values."],
      ["    return width * height", "Calculate, then <b>send the result back</b> to the place of the call. The function ends here."],
      ["room = area(4, 5)", "Right side first: call <code>area</code> with width 4 and height 5. The call becomes 20, and 20 is stored in <code>room</code>."],
      ["print(area(10, 3) + 1)", "Inside out: <code>area(10, 3)</code> → 30, then <code>30 + 1</code> → 31, then print."]] },
    { t: "viz", code: c`def area(width, height):
    result = width * height
    return result

room = area(4, 5)
hall = area(10, 3)
print(room + hall)`, before: "<p>Visualize: watch a new box for <code>area()</code> appear with its own variables, then disappear after returning.</p>" },
    { t: "check", q: "What does this print?", code: c`def triple(n):
    return n * 3

x = triple(2) + triple(1)
print(x)`, o: ["`6`", "`9`", "`21`"], a: 1, e: "`triple(2)` is 6 and `triple(1)` is 3, so x is 9." },
    { t: "h", text: "print vs return — the #1 beginner confusion" },
    { t: "p", html: "<p><code>print</code> only <b>shows</b> a value to the human looking at the screen. After that, the value is gone — the program can't use it. <code>return</code> <b>gives</b> the value to the program. A function with no <code>return</code> gives back a special value: <code>None</code>, which means \"nothing\".</p>" },
    { t: "code", code: c`def double_print(x):
    print(x * 2)

def double_return(x):
    return x * 2

a = double_print(5)
b = double_return(5)
print("a is", a)
print("b is", b)`, note: "<p><code>double_print(5)</code> shows 10 but returns <code>None</code>, so <code>a</code> is <code>None</code>. <code>double_return(5)</code> shows nothing, but <code>b</code> is 10 and you can calculate with it.</p>" },
    { t: "table", head: ["", "print", "return"], rows: [["shows on screen", "yes", "no"], ["result can be stored / used", "no (gives `None`)", "yes"], ["ends the function", "no", "yes"]] },
    { t: "ar", html: "print تعرض القيمة على الشاشة فقط ثم تضيع. return ترجع القيمة للبرنامج لكي نخزنها أو نحسب بها. الدالة التي ليس فيها return ترجع None." },
    { t: "check", q: "What is printed on the **last** line?", code: c`def add(a, b):
    print(a + b)

total = add(2, 3)
print(total)`, o: ["`5`", "`None`", "An error"], a: 1, e: "`add` prints 5 but returns nothing, so `total` is `None`.", ar: "{{g:أحسنت|أحسنتِ}}! بدون return القيمة الراجعة None." },
    { t: "h", text: "Default values" },
    { t: "p", html: "<p>Some inputs are almost always the same. VAT in Saudi Arabia is 15%, so it is boring to type <code>0.15</code> every time. Give the parameter a <b>default value</b> with <code>=</code> in the <code>def</code>. If the call doesn't pass it, the default is used.</p>" },
    { t: "code", code: c`def price_with_vat(price, vat=0.15):
    return round(price * (1 + vat), 2)

print(price_with_vat(100))
print(price_with_vat(100, 0.05))`, note: "<p>The first call uses <code>vat=0.15</code> → 115.0. The second call gives its own value 0.05 → 105.0.</p>" },
    { t: "h", text: "Returning several values" },
    { t: "p", html: "<p>A function can return more than one value: separate them with commas. Python packs them into a <b>tuple</b> (Day 11), and you unpack them into several variables in one line.</p>" },
    { t: "code", code: c`def stats(nums):
    return min(nums), max(nums), sum(nums) / len(nums)

low, high, avg = stats([70, 85, 90])
print(low, high, avg)` },
    { t: "h", text: "Scope: what happens in a function stays in a function" },
    { t: "p", html: "<p>Variables created inside a function are <b>local</b>: they live only while the function runs, then they disappear. This is a feature: ten functions can each have a variable called <code>total</code> and never disturb each other.</p>" },
    { t: "code", code: c`def calc():
    secret = 42
    return secret + 1

print(calc())
print(secret)`, error: true, note: "<p><code>print(calc())</code> works and shows 43. The last line fails with <code>NameError</code> — this error is expected: <code>secret</code> existed only inside <code>calc</code>. To use a value outside, <b>return</b> it.</p>" },
    { t: "ar", html: "المتغير الذي يُنشأ داخل الدالة محلي: يعيش داخلها فقط ويختفي بعد انتهائها. إذا احتجت{{g:|ِ}} القيمة خارج الدالة استخدم{{g:|ي}} return." },
    { t: "check", q: "What does this print?", code: c`x = 5

def change():
    x = 100
    return x

change()
print(x)`, o: ["`100`", "`5`", "An error"], a: 1, e: "The `x = 100` inside the function is a new **local** variable. The outer `x` is still 5. (Also, the returned 100 was never stored.)" },
    { t: "h", text: "Functions that use other functions" },
    { t: "p", html: "<p>Small functions are like LEGO bricks: you build bigger functions out of them. Each function does one clear job, and the big one just puts the pieces together.</p>" },
    { t: "steps", title: "Coffee shop receipt", problem: "<p>A café sells drinks at different prices. Write a program that, for an order of several drinks with quantities, prints each line and the total with 15% VAT.</p>", steps: [
      { html: "<p><b>Understand.</b> For each drink: line cost = price × quantity. Then total of all lines, then add VAT. Two jobs repeat: \"cost of one line\" and \"add VAT\". Those are our functions.</p>" },
      { html: "<p><b>Function 1</b>: the cost of one line. It returns a number — no printing inside.</p>", code: c`def line_cost(price, qty):
    return price * qty` },
      { html: "<p><b>Function 2</b>: add VAT, with a default of 15%.</p>", code: c`def with_vat(amount, vat=0.15):
    return round(amount * (1 + vat), 2)` },
      { html: "<p><b>Test each function alone</b> before using it. <code>line_cost(18, 2)</code> should be 36, <code>with_vat(100)</code> should be 115.0.</p>", code: c`print(line_cost(18, 2))
print(with_vat(100))` },
      { html: "<p><b>Put the pieces together</b>: loop over the order, print each line, add up the subtotal, then call <code>with_vat</code> once at the end.</p>" }],
      code: c`def line_cost(price, qty):
    return price * qty

def with_vat(amount, vat=0.15):
    return round(amount * (1 + vat), 2)

order = [("Latte", 18, 2), ("Tea", 8, 1), ("Croissant", 12, 3)]
subtotal = 0
for name, price, qty in order:
    cost = line_cost(price, qty)
    print(f"{name:<10} x{qty}  {cost} SAR")
    subtotal += cost
print("Subtotal:", subtotal)
print("Total with VAT:", with_vat(subtotal))`, ar: "قسّم{{g:|ي}} المشكلة إلى دوال صغيرة، اختبر{{g:|ي}} كل دالة وحدها، ثم اجمع{{g:|ي}}ها في البرنامج الكامل." },
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
    { title: "Forgetting the parentheses when calling", html: "Without <code>()</code> you only <i>name</i> the function — nothing runs. With them, you call it.", wrong: c`greet`, right: c`greet()` },
    { title: "Code after return never runs", html: "<code>return</code> leaves the function immediately.", wrong: c`def f(x):
    return x * 2
    print("done")   # never printed`, right: c`def f(x):
    print("done")
    return x * 2`, ar: "return تنهي الدالة فورًا، فأي سطر بعدها داخل الدالة لن يُنفذ." },
    { title: "Using the function before defining it", html: "Python reads top to bottom; the <code>def</code> must run first.", wrong: c`print(square(3))
def square(n):
    return n * n`, right: c`def square(n):
    return n * n
print(square(3))` },
    { title: "return inside the loop by mistake", html: "If <code>return</code> is indented inside the <code>for</code>, the function ends during the <b>first</b> round.", wrong: c`def total(nums):
    s = 0
    for n in nums:
        s += n
        return s      # returns after one number`, right: c`def total(nums):
    s = 0
    for n in nums:
        s += n
    return s          # after the loop`, ar: "انتبه{{g:|ي}} لمسافة return: إذا كانت داخل الحلقة ستنتهي الدالة من أول دورة." },
  ],
  tricks: [
    { title: "Return early", html: "Handle special cases first and return — no deep nesting.", code: c`def grade(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    return "C or below"

print(grade(95), grade(85), grade(40))` },
    { title: "A function should do one job", html: "If you can't name it clearly in a few words (<code>calculate_total</code>, <code>is_valid_email</code>), it's probably doing too much. Split it." },
    { title: "Return a comparison directly", html: "A comparison is already <code>True</code> or <code>False</code>. No need for <code>if ... return True else return False</code>.", code: c`def is_adult(age):
    return age >= 18

print(is_adult(20), is_adult(15))` },
  ],
  practice: [
    { t: "predict", code: c`def f(x):
    return x + 1

print(f(f(f(1))))`, explain: "Inside out: f(1)=2, f(2)=3, f(3)=<code>4</code>." },
    { t: "predict", code: c`def show(n):
    print(n)

x = show(7)
print(x)`, explain: "<code>7</code> is printed inside the function, then <code>None</code> because nothing was returned." },
    { t: "predict", code: c`def welcome(name, greeting="Hello"):
    return greeting + ", " + name

print(welcome("Sara"))
print(welcome("Omar", "Salam"))`, explain: "The first call uses the default <code>\"Hello\"</code>; the second call replaces it: <code>Hello, Sara</code> then <code>Salam, Omar</code>." },
    { t: "parsons", title: "Is it even?", prompt: "Build a function <code>is_even(n)</code> that returns True or False, then use it.", lines: ["def is_even(n):", "    return n % 2 == 0", "print(is_even(10))"], distractors: ["    print(n % 2 == 0)"], explain: "The comparison already gives a bool — return it directly." },
    { t: "parsons", title: "Average of a list", prompt: "Build <code>average(nums)</code> that returns the average, then print the average of three marks.", lines: ["def average(nums):", "    total = 0", "    for n in nums:", "        total += n", "    return total / len(nums)", "print(average([80, 90, 70]))"], distractors: ["        return total / len(nums)"], explain: "The <code>return</code> goes <b>after</b> the loop (4 spaces), not inside it (8 spaces). Output: <code>80.0</code>." },
    { t: "viz", code: c`def bonus(mark):
    if mark >= 90:
        return mark + 5
    return mark

marks = [95, 70]
for m in marks:
    print(bonus(m))`, before: "<p>Watch Python jump into <code>bonus</code> for each mark and leave at the first <code>return</code> it reaches.</p>" },
    { t: "try", title: "Refactor with a function", html: "<p>The code below repeats itself. Write a function <code>box(text)</code> that prints the border, the text, and the border — then call it three times.</p>", code: c`print("=" * 20)
print("Python")
print("=" * 20)
print("=" * 20)
print("Week 3")
print("=" * 20)` },
    { t: "try", title: "Temperature converter", html: "<p>Finish <code>c_to_f(c)</code> so it <b>returns</b> <code>c * 9 / 5 + 32</code>. Then print the Riyadh forecast in Fahrenheit. Add a second function <code>f_to_c(f)</code> for the other direction.</p>", code: c`def c_to_f(c):
    pass   # replace with return ...

forecast = [38, 41, 44]
for t in forecast:
    print(t, "C =", c_to_f(t), "F")` },
  ],
  exercises: [
    { id: "square", lvl: "seed", title: "square(n)", prompt: "<p>Write a function <code>square(n)</code> that <b>returns</b> n × n. The test calls it, so don't read input and don't print.</p>", starter: "def square(n):\n    pass\n", tests: [{ after: "print(square(4))", expected: "16" }, { after: "print(square(-3), square(0))", expected: "9 0" }],
      hint: "Replace <code>pass</code> with <code>return ...</code>.", ar: "لا تستخدم{{g:|ي}} print داخل الدالة؛ الاختبار يستدعيها ويطبع النتيجة بنفسه.",
      solutions: [{ name: "return", code: c`def square(n):
    return n * n` }, { name: "power", code: c`def square(n):
    return n ** 2` }] },
    { id: "greeting", lvl: "seed", title: "greeting(name, lang)", prompt: "<p>Write <code>greeting(name, lang=\"en\")</code> that returns <code>Hello, NAME!</code> for <code>\"en\"</code> and <code>مرحبا NAME!</code> for <code>\"ar\"</code>.</p>", starter: "def greeting(name, lang=\"en\"):\n    pass\n", tests: [{ after: "print(greeting('Sara'))", expected: "Hello, Sara!" }, { after: "print(greeting('Omar', 'ar'))", expected: "مرحبا Omar!" }],
      hint: "Check <code>lang == \"ar\"</code> first and return the Arabic text; otherwise return the English one.",
      solutions: [{ name: "if", code: c`def greeting(name, lang="en"):
    if lang == "ar":
        return f"مرحبا {name}!"
    return f"Hello, {name}!"` }] },
    { id: "maxof", lvl: "star", title: "my_max(numbers)", prompt: "<p>Write <code>my_max(numbers)</code> that returns the biggest number of a list <b>without</b> using <code>max()</code>. For an empty list return <code>None</code>.</p>", starter: "def my_max(numbers):\n    pass\n", tests: [{ after: "print(my_max([3, 9, 2]))", expected: "9" }, { after: "print(my_max([-5, -1, -9]))", expected: "-1" }, { after: "print(my_max([]))", expected: "None" }],
      hint: "Start with the first item as the \"champion\" and compare every item with it. Don't start with 0 — the list may have only negative numbers.",
      solutions: [{ name: "Champion", code: c`def my_max(numbers):
    if not numbers:
        return None
    best = numbers[0]
    for n in numbers:
        if n > best:
            best = n
    return best`, note: "<code>if not numbers</code> is True for an empty list — an early return guard." }] },
    { id: "vowels", lvl: "star", title: "count_vowels(text)", prompt: "<p>Return the number of vowels (a e i o u, any case) in <code>text</code>.</p>", starter: "def count_vowels(text):\n    pass\n", tests: [{ after: "print(count_vowels('Artificial Intelligence'))", expected: "10" }, { after: "print(count_vowels('xyz'))", expected: "0" }],
      hint: "Loop over <code>text.lower()</code> and use <code>ch in \"aeiou\"</code>.",
      solutions: [{ name: "Loop", code: c`def count_vowels(text):
    count = 0
    for ch in text.lower():
        if ch in "aeiou":
            count += 1
    return count` }, { name: "sum", code: c`def count_vowels(text):
    return sum(ch in "aeiou" for ch in text.lower())`, note: "<code>True</code> counts as 1 and <code>False</code> as 0, so summing the comparisons counts the vowels." }] },
    { id: "password", lvl: "star", title: "is_strong(password)", prompt: "<p>Return <code>True</code> if the password has at least 8 characters, at least one digit, at least one uppercase and at least one lowercase letter.</p>", starter: "def is_strong(password):\n    pass\n", tests: [{ after: "print(is_strong('Py30Rocks'))", expected: "True" }, { after: "print(is_strong('py30rocks'))", expected: "False" }, { after: "print(is_strong('Short1A'))", expected: "False" }, { after: "print(is_strong('NODIGITSs'))", expected: "False" }],
      hint: "Return <code>False</code> early if it's too short. Then use three flags (<code>has_digit</code>, …) set to <code>True</code> inside a loop.",
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
      hint: "Write and test <code>letter</code> first. In <code>report</code>, count letters in a dictionary, then loop over <code>\"ABCDF\"</code> to build the parts in order.",
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
    { id: "bmi15", lvl: "star", title: "bmi_category(weight, height)", prompt: "<p>Write <code>bmi(weight, height)</code> that returns weight ÷ height² rounded to 1 decimal, and <code>bmi_category(weight, height)</code> that <b>calls</b> <code>bmi</code> and returns <code>\"Underweight\"</code> (below 18.5), <code>\"Normal\"</code> (below 25) or <code>\"Overweight\"</code>.</p>", starter: "def bmi(weight, height):\n    pass\n\ndef bmi_category(weight, height):\n    pass\n", tests: [{ after: "print(bmi(70, 1.75))\nprint(bmi_category(70, 1.75))", expected: "22.9\nNormal" }, { after: "print(bmi_category(50, 1.80), bmi_category(95, 1.70))", expected: "Underweight Overweight" }],
      hint: "Inside <code>bmi_category</code>: <code>value = bmi(weight, height)</code>, then return early with <code>if value &lt; 18.5</code>.",
      solutions: [{ name: "Two functions", code: c`def bmi(weight, height):
    return round(weight / height ** 2, 1)

def bmi_category(weight, height):
    value = bmi(weight, height)
    if value < 18.5:
        return "Underweight"
    if value < 25:
        return "Normal"
    return "Overweight"` }] },
  ],
  quiz: [
    { q: "What does a function return if it has no `return`?", o: ["0", "`None`", "An error", "The last value"], a: 1, e: "Always None." },
    { q: "What does this print?", code: c`def f(a, b=2):
    return a * b
print(f(3), f(3, 3))`, o: ["`6 9`", "`5 6`", "`3 9`", "Error"], a: 0, e: "Default b=2 unless given." },
    { q: "Which line defines a function?", o: ["`function f():`", "`def f():`", "`f() = def`", "`define f:`"], a: 1, e: "`def`." },
    { q: "A variable created inside a function is…", o: ["global", "local", "shared", "constant"], a: 1, e: "Only exists inside." },
    { q: "`return a, b` returns…", o: ["only a", "a tuple (a, b)", "a list", "an error"], a: 1, e: "Unpack it with `x, y = f()`." },
    { q: "What does this print?", code: c`def f(x):
    return x * 2
    print("hi")
print(f(4))`, o: ["`hi` then `8`", "`8`", "`8` then `hi`", "Error"], a: 1, e: "`return` ends the function, so the `print(\"hi\")` line never runs." },
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
    { f: "Parameter vs argument", b: "Parameter: the name in `def f(name):`. Argument: the value in the call `f(\"Sara\")`." },
  ],
  remember: [
    "`def name(params):` **defines** a function; nothing runs until you **call** it with `name(...)`.",
    "Parameters are the inputs; arguments are the values you pass. Keyword arguments (`size=\"small\"`) can come in any order.",
    "`return` gives a value back **and** ends the function. No `return` → the function gives `None`.",
    "`print` shows a value to a human; `return` gives it to the program. Use `return` when the result will be used.",
    "Default values (`vat=0.15`) make a parameter optional; `return a, b` sends back several values.",
    "Variables made inside a function are **local** — they vanish when it ends.",
  ],
  rememberAr: "الدالة تُعرّف بـ def وتُنفذ عند استدعائها. return ترجع قيمة وتنهي الدالة، و print تعرض فقط. المتغيرات داخل الدالة محلية.",
};
})();

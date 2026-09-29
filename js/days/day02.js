window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[2] = {
  title: "Variables and data types",
  intro: "Yesterday Python could only repeat what you typed. Today it gets a memory. Variables let a program remember things — your name, a score, a price — and change them as it runs.",
  introAr: "المتغيرات هي ذاكرة البرنامج. اليوم نتعلم كيف نخزن القيم ونغيرها، ونتعرف على أنواع البيانات الأساسية: الأعداد الصحيحة والعشرية والنصوص والقيم المنطقية.",
  goals: ["Create variables with `=` and use them", "Change a variable's value and predict what happens", "Recognize `int`, `float`, `str` and `bool` and check them with `type()`", "Name variables the Python way (snake_case)", "Swap two variables in more than one way"],
  learn: [
    { t: "h", text: "A variable is a name for a value" },
    { t: "code", code: c`student = "{{name}}"
year = 2026
print(student)
print(year)
print("Welcome,", student)` },
    { t: "analogy", title: "Labeled boxes", html: "<p>Imagine a box with a label on it. <code>year = 2026</code> means: <i>take the value 2026 and put the label <b>year</b> on it</i>. Later, whenever you write <code>year</code>, Python goes to the box and uses what is inside.</p>" },
    { t: "p", html: "<p>The <code>=</code> sign is called <b>assignment</b>. It does <b>not</b> mean \"equals\" like in math. Read it as <i>\"gets\"</i>: <code>year = 2026</code> → \"year gets 2026\". Python always calculates the <b>right side first</b>, then stores the result in the name on the left.</p>" },
    { t: "ar", html: "علامة = في البرمجة معناها \"خزّن\" وليست \"يساوي\" كما في الرياضيات. بايثون يحسب الجهة اليمنى أولًا ثم يضع النتيجة في المتغير على اليسار." },
    { t: "h", text: "Variables can change" },
    { t: "viz", code: c`score = 10
print(score)
score = score + 5
print(score)
score = score * 2
print(score)`, before: "<p>This line looks impossible in math: <code>score = score + 5</code>. In Python it makes perfect sense: take the current score, add 5, store the result back in score. Visualize it and watch the value change.</p>" },
    { t: "h", text: "The four basic data types" },
    { t: "table", head: ["Type", "What it is", "Examples"], rows: [["`int`", "whole numbers", "`19`, `-3`, `2026`"], ["`float`", "numbers with a decimal point", "`3.14`, `4.5`, `2.0`"], ["`str`", "text (string)", "`\"Riyadh\"`, `'CS'`, `\"42\"`"], ["`bool`", "truth values", "`True`, `False`"]] },
    { t: "code", code: c`name = "{{name}}"
age = 19
gpa = 4.75
is_student = True
print(type(name))
print(type(age))
print(type(gpa))
print(type(is_student))` },
    { t: "p", html: "<p><code>type()</code> tells you what kind of value you have. This matters because types decide what you can do: you can divide numbers, but not names; you can make text uppercase, but not numbers.</p>" },
    { t: "tip", title: "\"42\" is not 42", html: "Quotes make a string, even if it only has digits. <code>\"42\"</code> is text; <code>42</code> is a number. Tomorrow you will convert between them." },
    { t: "h", text: "Naming rules" },
    { t: "table", head: ["Rule", "OK", "Not allowed"], rows: [["letters, digits and `_` only", "`total_price`", "`total-price`, `my score`"], ["cannot start with a digit", "`player1`", "`1player`"], ["not a Python keyword", "`class_name`", "`class`, `if`, `for`"], ["case matters", "`name` and `Name` are different", ""]] },
    { t: "p", html: "<p>Python programmers use <b>snake_case</b>: lowercase words joined with underscores, like <code>first_name</code> or <code>total_price</code>. Choose names that explain the value: <code>price</code> is better than <code>p</code>, and <code>seconds_left</code> is better than <code>x</code>.</p>" },
    { t: "ar", html: "اختر{{g:|ي}} أسماء واضحة تشرح القيمة. الاسم الجيد يوفّر عليك تعليقات كثيرة لاحقًا." },
    { t: "h", text: "Several at once" },
    { t: "code", code: c`a, b, c = 1, 2, 3
x = y = 0
print(a, b, c)
print(x, y)` },
  ],
  mistakes: [
    { title: "Quotes around the variable name", html: "With quotes you print the <i>word</i>, not the value inside the box.", wrong: c`city = "Jeddah"
print("city")`, right: c`city = "Jeddah"
print(city)` },
    { title: "Using a variable before creating it", html: "Python runs top to bottom. The box must exist before you open it.", wrong: c`print(total)
total = 50`, right: c`total = 50
print(total)` },
    { title: "Typo in the name", html: "<code>score</code> and <code>Score</code> and <code>scroe</code> are three different names.", wrong: c`score = 90
print(Score)`, right: c`score = 90
print(score)`, ar: "الحروف الكبيرة والصغيرة مختلفة في بايثون." },
    { title: "Writing the assignment backwards", html: "The name always goes on the <b>left</b>.", wrong: c`19 = age`, right: c`age = 19` },
  ],
  tricks: [
    { title: "Swap in one line", html: "Most languages need a temporary variable to swap. Python does it in one line:", code: c`a = 5
b = 9
a, b = b, a
print(a, b)   # 9 5` },
    { title: "Underscores in big numbers", html: "<code>population = 35_300_000</code> is the same as <code>35300000</code> — just easier to read." },
    { title: "Constants in CAPITALS", html: "Values that should never change are written in capitals by convention: <code>MAX_STUDENTS = 40</code>. Python does not force it, but every programmer will understand." },
  ],
  practice: [
    { t: "predict", code: c`x = 5
y = x
x = 10
print(x, y)`, explain: "<code>y = x</code> copies the <b>value</b> 5 into y at that moment. Changing x later does not change y. So: <code>10 5</code>." },
    { t: "predict", code: c`points = 3
points = points + 2
points = points * points
print(points)`, explain: "3 → 3 + 2 = 5 → 5 * 5 = 25." },
    { t: "try", title: "Profile builder", html: "<p>Create variables for your city, favorite food and dream job, then print a sentence with all of them. Use <code>print</code> with commas between the values.</p>", code: c`name = "{{name}}"
city = "..."
food = "..."
dream_job = "..."
print(name, "lives in", city)
` },
    { t: "parsons", title: "Wallet update", prompt: "Arrange the lines so the program prints <code>70</code>: start with 100 riyals, spend 45, then receive 15.", lines: ["wallet = 100", "wallet = wallet - 45", "wallet = wallet + 15", "print(wallet)"], distractors: ["print(\"wallet\")", "wallet - 45 = wallet"], explain: "Create the variable first, update it, and only then print. <code>print(\"wallet\")</code> would print the word, and <code>wallet - 45 = wallet</code> is backwards." },
    { t: "predict", code: c`a = "7"
b = "3"
print(a + b)
print(type(a))`, explain: "Both are strings (quotes!), so <code>+</code> glues them: <code>73</code>. And the type is <code>&lt;class 'str'&gt;</code>." },
    { t: "viz", code: c`a = 5
b = 9
temp = a
a = b
b = temp
print(a, b)`, before: "<p>The classic swap with a temporary box. Visualize it and follow how <code>temp</code> saves the value of <code>a</code> before it gets overwritten.</p>" },
  ],
  exercises: [
    { id: "city", lvl: "seed", title: "Home town", prompt: "<p>Create a variable <code>city</code> with the value <code>\"Riyadh\"</code> and a variable <code>country</code> with <code>\"Saudi Arabia\"</code>. Print them on one line so the output is:</p><pre class=\"code-static\">Riyadh Saudi Arabia</pre>", tests: [{ expected: "Riyadh Saudi Arabia" }],
      solutions: [{ name: "Two variables", code: c`city = "Riyadh"
country = "Saudi Arabia"
print(city, country)` }] },
    { id: "names", lvl: "seed", debug: true, title: "Illegal names", prompt: "<p>These variable names break Python's rules. Rename them (keep the values) so the program prints:</p><pre class=\"code-static\">1 88 True</pre>",
      starter: c`2nd_place = 1
my-score = 88
class = True
print(2nd_place, my-score, class)`, tests: [{ expected: "1 88 True" }],
      hint: "No digit at the start, no <code>-</code> (Python reads it as minus), and <code>class</code> is a keyword.", ar: "لا يبدأ الاسم برقم، ولا يحتوي على شرطة -، ولا يكون كلمة محجوزة مثل class.",
      solutions: [{ name: "Fixed names", code: c`second_place = 1
my_score = 88
is_class = True
print(second_place, my_score, is_class)`, note: "Any legal names work. Descriptive snake_case is best." }] },
    { id: "swap", lvl: "star", title: "Swap the values", prompt: "<p>The starter has <code>a = 5</code> and <code>b = 9</code>. <b>Without</b> typing the numbers 5 or 9 again, swap them so the last line prints <code>9 5</code>.</p>", starter: c`a = 5
b = 9
# swap here

print(a, b)`, tests: [{ expected: "9 5" }],
      hint: "If you write <code>a = b</code> first, the 5 is lost forever. Save it somewhere first.", ar: "لو كتبت{{g:|ِ}} a = b مباشرة ستضيع القيمة 5. احفظ{{g:|ي}}ها في متغير مؤقت أولًا.",
      solutions: [
        { name: "Temporary variable", code: c`a = 5
b = 9
temp = a
a = b
b = temp
print(a, b)`, note: "Works in every programming language." },
        { name: "Pythonic", code: c`a = 5
b = 9
a, b = b, a
print(a, b)`, note: "Python builds the pair <code>(9, 5)</code> on the right first, then unpacks it into a and b." },
        { name: "Math trick", code: c`a = 5
b = 9
a = a + b   # 14
b = a - b   # 5
a = a - b   # 9
print(a, b)`, note: "Clever, but only works for numbers and is harder to read. Good to know, rarely used." }],
      twist: "You saw three ways. Which one would you use in a real project, and why? Write your answer in your notes." },
    { id: "types", lvl: "star", title: "Type detective", prompt: "<p>Print the type of each of these four values, one per line: <code>2026</code>, <code>\"2026\"</code>, <code>20.26</code>, <code>False</code>. Expected output:</p><pre class=\"code-static\">&lt;class 'int'&gt;\n&lt;class 'str'&gt;\n&lt;class 'float'&gt;\n&lt;class 'bool'&gt;</pre>",
      tests: [{ expected: "<class 'int'>\n<class 'str'>\n<class 'float'>\n<class 'bool'>" }],
      solutions: [{ name: "Direct", code: c`print(type(2026))
print(type("2026"))
print(type(20.26))
print(type(False))` }, { name: "With variables", code: c`a = 2026
b = "2026"
c = 20.26
d = False
print(type(a), type(b), type(c), type(d), sep="\n")` }] },
    { id: "score", lvl: "star", title: "Game score", prompt: "<p>Start with <code>score = 10</code>. Then, <b>one step per line</b>: add 5, multiply by 2, subtract 3. Print the final score (it should be <code>27</code>). Do not just write <code>print(27)</code> — let the variable change.</p>", starter: "score = 10\n", tests: [{ expected: "27" }],
      solutions: [{ name: "Step by step", code: c`score = 10
score = score + 5
score = score * 2
score = score - 3
print(score)` }, { name: "Short operators", code: c`score = 10
score += 5
score *= 2
score -= 3
print(score)`, note: "<code>+=</code>, <code>*=</code>, <code>-=</code> are shortcuts: <code>score += 5</code> means <code>score = score + 5</code>. You will use them all the time." }] },
    { id: "receipt", lvl: "fire", title: "Café receipt", prompt: "<p>At a café, {{name}} buys 2 cups of coffee (12 riyals each) and 1 sandwich (18.5 riyals). Create variables <code>coffee_price</code>, <code>coffee_qty</code>, <code>sandwich_price</code>, calculate the total in a variable <code>total</code> and print:</p><pre class=\"code-static\">Total: 42.5</pre>", tests: [{ expected: "Total: 42.5" }],
      hint: "total = coffee_price * coffee_qty + sandwich_price. Then <code>print(\"Total:\", total)</code>.",
      solutions: [{ name: "Clear variables", code: c`coffee_price = 12
coffee_qty = 2
sandwich_price = 18.5
total = coffee_price * coffee_qty + sandwich_price
print("Total:", total)`, note: "Multiplication happens before addition, just like in math." }, { name: "Subtotals", code: c`coffee_price = 12
coffee_qty = 2
sandwich_price = 18.5
coffee_total = coffee_price * coffee_qty
total = coffee_total + sandwich_price
print("Total:", total)`, note: "Breaking a calculation into named steps makes it easier to read and to debug." }],
      twist: "Add a 15% VAT: print a second line <code>With VAT: ...</code>. (Hint: multiply by 1.15.)" },
    { id: "fix2", lvl: "fire", debug: true, title: "The broken grade report", prompt: "<p>Fix all the bugs so the program prints:</p><pre class=\"code-static\">Student: {{name}}\nPoints: 95</pre>", starter: c`student = "{{name}}"
print("Student:", Student)
points = 90
bonus = 5
points + bonus = points
print("Points:", "points")`, tests: [{ expected: "Student: {{name}}\nPoints: 95" }],
      ar: "في الكود ثلاثة أخطاء: حرف كبير، وإسناد معكوس، وعلامات تنصيص حول اسم متغير.",
      solutions: [{ name: "Fixed", code: c`student = "{{name}}"
print("Student:", student)
points = 90
bonus = 5
points = points + bonus
print("Points:", points)` }] },
  ],
  quiz: [
    { q: "After this code, what is `x`?", code: c`x = 4
x = x * 3
x = x - 2`, o: ["`4`", "`10`", "`12`", "`-2`"], a: 1, e: "4 → 12 → 10." },
    { q: "Which is a valid variable name?", o: ["`2fast`", "`my name`", "`total_price`", "`for`"], a: 2, e: "Letters, digits and underscores, not starting with a digit, and not a keyword." },
    { q: "What is `type(\"3.5\")`?", o: ["`float`", "`str`", "`int`", "`bool`"], a: 1, e: "It is in quotes, so it is a string." },
    { q: "What does `print(\"age\")` show if `age = 20`?", o: ["`20`", "`age`", "An error", "`age 20`"], a: 1, e: "Quotes print the word itself, not the variable's value." },
    { q: "After `a, b = 1, 2` and then `a, b = b, a`, what is `a`?", o: ["`1`", "`2`", "`(1, 2)`", "An error"], a: 1, e: "The values are swapped." },
  ],
  puzzle: { title: "Chain reaction", q: "<p>What does this print? Type the output exactly (use a space between the numbers).</p>", code: c`a = 1
b = a + 1
a = b + a
b = a * b
print(a, b)`, answers: ["3 6"], hint: "Go line by line and write the values of a and b on paper after each line. Or use the Playground's Visualize button after you guess!", ar: "تتبع{{g:|ي}} قيم a و b بعد كل سطر على ورقة.", e: "a=1 → b=2 → a=2+1=3 → b=3*2=6. Output: <code>3 6</code>. Tracing values by hand like this is a core programming skill." },
  cards: [
    { f: "What does `=` mean in Python?", b: "Assignment: calculate the right side, then store it in the name on the left. It is not \"equals\"." },
    { f: "Name the four basic types", b: "`int` (whole), `float` (decimal), `str` (text), `bool` (True/False)." },
    { f: "How do you check a value's type?", b: "`type(value)`" },
    { f: "Swap `a` and `b` in one line", b: "`a, b = b, a`" },
    { f: "What is snake_case?", b: "Lowercase words joined by underscores: `total_price`." },
  ],
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[3] = {
  title: "Input, conversion and math",
  intro: "Until now your programs said the same thing every time. Today they start listening. You will read what the user types, turn it into numbers and make Python calculate for you — the heart of every useful program.",
  introAr: "اليوم البرنامج يصبح تفاعليًا: يسأل المستخدم ويحسب. أهم فكرة اليوم: input يرجع نصًا دائمًا، ويجب تحويله لرقم قبل الحساب.",
  goals: ["Read user input with `input()`", "Convert with `int()`, `float()` and `str()`", "Use all math operators, including `//`, `%` and `**`", "Know the order of operations", "Solve real problems: bills, time, digits"],
  learn: [
    { t: "h", text: "Asking the user" },
    { t: "code", code: c`name = input("What is your name? ")
print("Nice to meet you,", name)`, stdin: "{{name}}", before: "<p><code>input()</code> shows a message (the <b>prompt</b>), waits for the user to type, and gives back what they typed.</p>" },
    { t: "p", html: "<div class=\"callout\"><div class=\"ttl\">⌨️ How input works in Py30</div><p>Under every editor that uses <code>input()</code> there is an <b>Input</b> box. Write the answers there <b>before</b> you press Run, one line for each <code>input()</code> call. Try changing the name in the box above and run again.</p></div>" },
    { t: "h", text: "The big trap: input always gives text" },
    { t: "code", code: c`age = input("How old are you? ")
print(type(age))
print(age * 2)`, stdin: "19", note: "<p>The user typed 19, but <code>age</code> is the <b>string</b> <code>\"19\"</code>. So <code>age * 2</code> repeats the text: <code>1919</code>! To calculate, you must <b>convert</b> it.</p>" },
    { t: "ar", html: "أهم قاعدة اليوم: input() يرجع <b>نصًا دائمًا</b> حتى لو كتب المستخدم رقمًا. استخدم{{g:|ي}} int() للأعداد الصحيحة و float() للأعداد العشرية." },
    { t: "h", text: "Converting types" },
    { t: "code", code: c`age = int(input("How old are you? "))
print(age * 2)
height = float(input("Height in meters? "))
print(height + 0.1)
message = "You are " + str(age) + " years old"
print(message)`, stdin: "19\n1.65" },
    { t: "table", head: ["Function", "Converts to", "Example"], rows: [["`int()`", "whole number", "`int(\"42\")` → `42`"], ["`float()`", "decimal number", "`float(\"2.5\")` → `2.5`"], ["`str()`", "text", "`str(99)` → `\"99\"`"], ["`int()` on a float", "drops the decimals", "`int(7.9)` → `7`"]] },
    { t: "h", text: "Math operators" },
    { t: "table", head: ["Operator", "Meaning", "Example", "Result"], rows: [["`+`", "add", "`7 + 2`", "`9`"], ["`-`", "subtract", "`7 - 2`", "`5`"], ["`*`", "multiply", "`7 * 2`", "`14`"], ["`/`", "divide (always float)", "`7 / 2`", "`3.5`"], ["`//`", "floor division (whole part)", "`7 // 2`", "`3`"], ["`%`", "remainder (modulo)", "`7 % 2`", "`1`"], ["`**`", "power", "`2 ** 3`", "`8`"]] },
    { t: "analogy", title: "// and % with sweets", html: "<p>You have 17 sweets and 5 friends. Each friend gets <code>17 // 5 = 3</code> sweets, and <code>17 % 5 = 2</code> sweets are left over for you. These two operators solve a surprising number of problems: even/odd, minutes and seconds, digits of a number, clocks…</p>" },
    { t: "code", code: c`sweets = 17
friends = 5
print("Each friend gets", sweets // friends)
print("Left over:", sweets % friends)
print("Is 17 even?", 17 % 2 == 0)` },
    { t: "h", text: "Order of operations" },
    { t: "p", html: "<p>Python follows math rules: <b>parentheses</b> first, then <code>**</code>, then <code>* / // %</code>, then <code>+ -</code>. When in doubt, add parentheses — they make your intention clear.</p>" },
    { t: "code", code: c`print(2 + 3 * 4)
print((2 + 3) * 4)
print(10 - 4 - 3)
print(2 ** 3 ** 2)` },
    { t: "h", text: "Useful extras" },
    { t: "code", code: c`import math
print(round(3.14159, 2))
print(abs(-7))
print(max(4, 9, 2), min(4, 9, 2))
print(math.sqrt(144))
print(math.pi)` },
    { t: "p", html: "<p><code>import math</code> loads Python's math toolbox. You will learn more about modules later — for now, just know that <code>math.sqrt()</code> and <code>math.pi</code> are there when you need them.</p>" },
  ],
  mistakes: [
    { title: "Math on input without converting", html: "<code>input()</code> text + a number → <code>TypeError</code>.", wrong: c`age = input("Age: ")
print(age + 1)`, right: c`age = int(input("Age: "))
print(age + 1)` },
    { title: "int() on a decimal string", html: "<code>int(\"2.5\")</code> fails with <code>ValueError</code>. Use <code>float()</code> for decimals.", wrong: c`price = int("2.5")`, right: c`price = float("2.5")` },
    { title: "Forgetting parentheses in formulas", html: "The average of 80 and 90 is not <code>80 + 90 / 2</code> (that is 125!).", wrong: c`avg = 80 + 90 / 2`, right: c`avg = (80 + 90) / 2`, ar: "القسمة تُنفذ قبل الجمع. استخدم{{g:|ي}} الأقواس دائمًا في المعادلات." },
    { title: "Surprise .0 results", html: "<code>/</code> always returns a float, even when the division is exact. Use <code>//</code> when you want a whole number.", wrong: c`print(10 / 2)   # 5.0`, right: c`print(10 // 2)  # 5` },
  ],
  tricks: [
    { title: "Get the last digit with % 10", html: "<code>472 % 10</code> is <code>2</code> and <code>472 // 10</code> is <code>47</code>. Repeating this lets you take any number apart digit by digit.", code: c`n = 472
print(n % 10)        # 2  (last digit)
print(n // 10 % 10)  # 7  (middle digit)
print(n // 100)      # 4  (first digit)` },
    { title: "divmod gives both at once", html: "<code>divmod(17, 5)</code> returns <code>(3, 2)</code>: the quotient and the remainder together.", code: c`minutes, seconds = divmod(135, 60)
print(minutes, seconds)   # 2 15` },
    { title: "Read two numbers on one line", html: "A preview of something you will understand fully later: <code>a, b = map(int, input().split())</code> reads <code>3 4</code> as two integers." },
  ],
  practice: [
    { t: "predict", code: c`n = input()
print(n * 3)`, stdin: "5", explain: "The user typed 5, but <code>n</code> is the string <code>\"5\"</code>. A string times 3 repeats it: <code>555</code>. This is why converting matters!" },
    { t: "predict", code: c`print(17 // 5, 17 % 5)
print(20 // 5, 20 % 5)
print(-7 // 2)`, explain: "17 = 5×3 + 2, and 20 = 5×4 + 0. The surprise: <code>-7 // 2</code> is <code>-4</code>, not -3 — floor division always rounds <b>down</b> toward minus infinity." },
    { t: "try", title: "Your own calculator", html: "<p>Change the two numbers in the Input box and run. Then add lines for <code>//</code>, <code>%</code> and <code>**</code>.</p>", code: c`a = float(input("First number: "))
b = float(input("Second number: "))
print("Sum:", a + b)
print("Difference:", a - b)
print("Product:", a * b)
print("Division:", a / b)`, stdin: "12\n5" },
    { t: "parsons", title: "Rectangle area", prompt: "Put the lines in the right order to read the width and height and print the area.", lines: [c`width = int(input("Width: "))`, c`height = int(input("Height: "))`, "area = width * height", c`print("Area:", area)`], distractors: [c`area = input("Area: ")`], explain: "Read inputs first, calculate second, print last — the input → process → output pattern you will use in almost every program." },
    { t: "viz", code: c`total_seconds = 3725
hours = total_seconds // 3600
rest = total_seconds % 3600
minutes = rest // 60
seconds = rest % 60
print(hours, minutes, seconds)`, before: "<p>Watch how <code>//</code> and <code>%</code> work together to break seconds into hours, minutes and seconds.</p>" },
    { t: "predict", code: c`print(2 + 3 * 2 ** 2)
print((2 + 3) * 2 ** 2)`, explain: "Power first: 2**2 = 4. Then 3*4 = 12, then 2+12 = <code>14</code>. With parentheses: 5 * 4 = <code>20</code>." },
  ],
  exercises: [
    { id: "welcome", lvl: "seed", title: "Welcome message", prompt: "<p>Ask for the user's name and print <code>Welcome, NAME!</code>. For the input <code>Sara</code> the output must be:</p><pre class=\"code-static\">Welcome, Sara!</pre><p>(Only what you <code>print</code> is checked, so your prompt text can be anything.)</p>", tests: [{ stdin: "Sara", expected: "Welcome, Sara!" }, { stdin: "Omar", expected: "Welcome, Omar!" }],
      hint: "<code>print(\"Welcome, \" + name + \"!\")</code> — or with commas and <code>sep=\"\"</code>.", ar: "انتبه{{g:|ي}} لعدم وجود مسافة قبل علامة التعجب. لو استخدمت{{g:|ِ}} الفواصل في print ستظهر مسافة زائدة.",
      solutions: [{ name: "Concatenation (+)", code: c`name = input("Your name: ")
print("Welcome, " + name + "!")`, note: "<code>+</code> glues strings with no extra spaces, so you control every character." }, { name: "sep=\"\"", code: c`name = input("Your name: ")
print("Welcome, ", name, "!", sep="")` }, { name: "f-string (tomorrow's topic)", code: c`name = input("Your name: ")
print(f"Welcome, {name}!")`, note: "A sneak peek at f-strings — the cleanest way. You will master them tomorrow." }] },
    { id: "double", lvl: "seed", title: "Double it", prompt: "<p>Read a whole number and print its double.</p><pre class=\"code-static\">Input: 21\nOutput: 42</pre>", tests: [{ stdin: "21", expected: "42" }, { stdin: "-4", expected: "-8" }, { stdin: "0", expected: "0" }],
      solutions: [{ name: "Convert then multiply", code: c`n = int(input())
print(n * 2)` }, { name: "Add to itself", code: c`n = int(input())
print(n + n)` }] },
    { id: "age2030", lvl: "star", title: "How old in 2030?", prompt: "<p>Read a birth year and print how old the person will be in 2030.</p><pre class=\"code-static\">Input: 2007\nOutput: 23</pre>", tests: [{ stdin: "2007", expected: "23" }, { stdin: "1990", expected: "40" }],
      solutions: [{ name: "Direct", code: c`birth_year = int(input("Birth year: "))
print(2030 - birth_year)` }, { name: "Named constant", code: c`TARGET_YEAR = 2030
birth_year = int(input("Birth year: "))
age = TARGET_YEAR - birth_year
print(age)`, note: "Naming the magic number 2030 makes the code self-explaining and easy to change." }] },
    { id: "rect", lvl: "star", title: "Room planner", prompt: "<p>Read the width and length of a room (whole meters, two lines) and print the area and the perimeter exactly like this:</p><pre class=\"code-static\">Input: 3 then 4\nArea: 12\nPerimeter: 14</pre>", tests: [{ stdin: "3\n4", expected: "Area: 12\nPerimeter: 14" }, { stdin: "10\n2", expected: "Area: 20\nPerimeter: 24" }],
      hint: "Perimeter = 2 × (width + length). Watch the parentheses!",
      solutions: [{ name: "Straightforward", code: c`width = int(input())
length = int(input())
print("Area:", width * length)
print("Perimeter:", 2 * (width + length))` }, { name: "Variables first", code: c`width = int(input())
length = int(input())
area = width * length
perimeter = 2 * width + 2 * length
print("Area:", area)
print("Perimeter:", perimeter)`, note: "Another correct formula: 2w + 2l is the same as 2(w + l)." }] },
    { id: "bill", lvl: "star", title: "Split the bill", prompt: "<p>Friends had dinner. Read the total bill (can have decimals) and the number of people. Print how much each person pays, <b>rounded to 2 decimals</b> with <code>round()</code>.</p><pre class=\"code-static\">Input: 100 then 3\nOutput: 33.33</pre>", tests: [{ stdin: "100\n3", expected: "33.33" }, { stdin: "90\n3", expected: "30.0" }, { stdin: "250.5\n4", expected: "62.62" }],
      hint: "<code>round(value, 2)</code>. Notice that 90 / 3 prints <code>30.0</code> — that is correct here.",
      solutions: [{ name: "round()", code: c`total = float(input())
people = int(input())
print(round(total / people, 2))` }] },
    { id: "time", lvl: "fire", title: "Seconds to a clock", prompt: "<p>Read a number of seconds and print it as hours, minutes and seconds:</p><pre class=\"code-static\">Input: 3665\nOutput: 1 h 1 min 5 sec</pre>", tests: [{ stdin: "3665", expected: "1 h 1 min 5 sec" }, { stdin: "59", expected: "0 h 0 min 59 sec" }, { stdin: "7322", expected: "2 h 2 min 2 sec" }],
      hint: "One hour is 3600 seconds. Use <code>//</code> to count full hours, <code>%</code> to get what is left, and repeat for minutes.", ar: "استخدم{{g:|ي}} // لمعرفة عدد الساعات الكاملة، و % لمعرفة الثواني المتبقية، ثم كرر{{g:|ي}} نفس الفكرة مع الدقائق.",
      solutions: [
        { name: "Step by step", code: c`total = int(input())
hours = total // 3600
rest = total % 3600
minutes = rest // 60
seconds = rest % 60
print(hours, "h", minutes, "min", seconds, "sec")` },
        { name: "Minutes first", code: c`total = int(input())
seconds = total % 60
total_minutes = total // 60
minutes = total_minutes % 60
hours = total_minutes // 60
print(hours, "h", minutes, "min", seconds, "sec")`, note: "Same idea, peeling from the smallest unit up." },
        { name: "divmod", code: c`total = int(input())
minutes, seconds = divmod(total, 60)
hours, minutes = divmod(minutes, 60)
print(hours, "h", minutes, "min", seconds, "sec")`, note: "<code>divmod</code> returns <code>//</code> and <code>%</code> together. Short and professional." }],
      twist: "Now go the other way: read hours, minutes and seconds and print the total seconds." },
    { id: "digits", lvl: "fire", title: "Digit sum", prompt: "<p>Read a <b>three-digit</b> number and print the sum of its digits.</p><pre class=\"code-static\">Input: 472\nOutput: 13</pre>", tests: [{ stdin: "472", expected: "13" }, { stdin: "100", expected: "1" }, { stdin: "999", expected: "27" }],
      hint: "Last digit: <code>n % 10</code>. Middle: <code>n // 10 % 10</code>. First: <code>n // 100</code>.",
      solutions: [{ name: "Math with // and %", code: c`n = int(input())
first = n // 100
middle = n // 10 % 10
last = n % 10
print(first + middle + last)` },
        { name: "As text", code: c`s = input()
print(int(s[0]) + int(s[1]) + int(s[2]))`, note: "Treat the number as a string and take its characters by position. You will learn indexing <code>s[0]</code> tomorrow." }] },
    { id: "fix3", lvl: "fire", debug: true, title: "The broken average", prompt: "<p>This program should read two exam marks and print their average. For the inputs <code>80</code> and <code>91</code> it must print <code>Average: 85.5</code>. Find and fix the <b>two</b> bugs — one crashes, one gives a wrong answer.</p>", starter: c`mark1 = input("First mark: ")
mark2 = int(input("Second mark: "))
average = mark1 + mark2 / 2
print("Average:", average)`, tests: [{ stdin: "80\n91", expected: "Average: 85.5" }, { stdin: "70\n70", expected: "Average: 70.0" }],
      ar: "الخطأ الأول: قيمة لم تُحوَّل لرقم. الخطأ الثاني: ترتيب العمليات (القسمة قبل الجمع).",
      solutions: [{ name: "Fixed", code: c`mark1 = int(input("First mark: "))
mark2 = int(input("Second mark: "))
average = (mark1 + mark2) / 2
print("Average:", average)`, note: "Bug 1 (crash): mark1 was never converted. Bug 2 (logic): without parentheses only mark2 is divided. <b>Logic bugs are the dangerous ones</b> — no error message, just a wrong answer." }] },
  ],
  quiz: [
    { q: "What is the type of the value returned by `input()`?", o: ["`int`", "`str`", "It depends on what the user types", "`float`"], a: 1, e: "Always `str`. Convert it yourself." },
    { q: "What is `17 % 4`?", o: ["`4`", "`4.25`", "`1`", "`13`"], a: 2, e: "17 = 4 × 4 + 1, so the remainder is 1." },
    { q: "What does `print(9 / 3)` show?", o: ["`3`", "`3.0`", "`3.3`", "An error"], a: 1, e: "`/` always gives a float." },
    { q: "Which expression gives the average of `a` and `b`?", o: ["`a + b / 2`", "`(a + b) / 2`", "`a + (b / 2)`", "`a / 2 + b`"], a: 1, e: "Parentheses make the addition happen first." },
    { q: "What does `int(\"12\") + int(\"8\")` give?", o: ["`128`", "`20`", "`\"20\"`", "An error"], a: 1, e: "Both are converted to numbers first, then added." },
    { q: "How can you test if a number `n` is even?", o: ["`n / 2 == 0`", "`n // 2 == 0`", "`n % 2 == 0`", "`n ** 2 == 0`"], a: 2, e: "Even numbers have remainder 0 when divided by 2." },
  ],
  puzzle: { title: "Operator gymnastics", q: "<p>Without running it: what is the value of this expression?</p>", code: c`7 // 2 * 2 + 7 % 2`, answers: ["7"], hint: "<code>//</code>, <code>*</code> and <code>%</code> have the same priority and go left to right. Then <code>+</code>.", ar: "احسب{{g:|ي}}: 7 // 2 ثم اضرب{{g:|ي}} في 2، ثم أضف{{g:|ي}} باقي قسمة 7 على 2.", e: "7 // 2 = 3, times 2 = 6, and 7 % 2 = 1. Total <code>7</code>. Not a coincidence: for any n, <code>n // 2 * 2 + n % 2</code> gives back n. This is exactly how division with remainder works." },
  cards: [
    { f: "What type does `input()` return?", b: "Always a string (`str`)." },
    { f: "`17 // 5` and `17 % 5`?", b: "`3` (whole part) and `2` (remainder)." },
    { f: "How to read a decimal number from the user?", b: "`x = float(input())`" },
    { f: "Last digit of a number `n`?", b: "`n % 10`" },
    { f: "What does `/` always return?", b: "A float, e.g. `10 / 2` is `5.0`." },
  ],
};
})();

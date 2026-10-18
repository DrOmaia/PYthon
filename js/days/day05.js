window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[5] = {
  title: "Decisions: if, elif, else",
  intro: "Today your programs learn to think. With <code>if</code>, a program can react differently to different situations: pass or fail, open or locked, discount or full price. This is where programming starts to feel like building intelligence.",
  introAr: "اليوم البرنامج يتخذ قرارات! نتعلم الشروط if و elif و else، وعوامل المقارنة، وربط الشروط بـ and و or و not. وانتبه{{g:|ي}} جيدًا للإزاحة (المسافات) لأنها أساسية هنا.",
  goals: ["Compare values with `==`, `!=`, `<`, `>`, `<=`, `>=`", "Write `if`, `if/else` and `if/elif/else` blocks with correct indentation", "Combine conditions with `and`, `or`, `not`", "Order `elif` conditions correctly", "Trace which branch runs for any input"],
  learn: [
    { t: "h", text: "Why programs need decisions" },
    { t: "p", html: "<p>Until now every program ran <b>every line</b>, top to bottom, no matter what. But real programs react: a banking app shows <i>\"Insufficient funds\"</i> only when your balance is too low, and a login screen lets you in only when the password is right. To react, a program has to <b>ask a question</b> and choose what to do based on the answer.</p>" },
    { t: "analogy", title: "A decision is a fork in the road", html: "<p>Every morning you decide: <i>if it is raining, take an umbrella</i>. You check one fact (is it raining?), and the answer is always <b>yes or no</b>. Python works the same way: it checks a condition, gets <code>True</code> or <code>False</code>, and picks a road.</p>" },
    { t: "ar", html: "البرنامج يحتاج أن يتخذ قرارًا: يسأل سؤالًا جوابه نعم أو لا (True أو False)، ثم يختار ماذا ينفذ حسب الجواب." },

    { t: "h", text: "Questions with True or False answers" },
    { t: "code", code: c`age = 19
print(age > 18)
print(age == 20)`, before: "<p>A <b>comparison</b> asks a question about two values. The answer is a special value called a <b>boolean</b>: <code>True</code> or <code>False</code>. Run it and read each answer.</p>", note: "<p>Line by line:</p><ul><li><code>age = 19</code> stores 19. One <code>=</code> means <b>store</b>.</li><li><code>age &gt; 18</code> asks \"is 19 greater than 18?\" → <code>True</code>.</li><li><code>age == 20</code> asks \"is 19 equal to 20?\" → <code>False</code>. Two <code>==</code> means <b>ask if equal</b>.</li></ul><p>Notice: comparing does not change <code>age</code>. It only asks.</p>" },
    { t: "table", head: ["Operator", "Question it asks", "Example", "Answer"], rows: [["`==`", "equal?", "`5 == 5`", "`True`"], ["`!=`", "not equal?", "`5 != 3`", "`True`"], ["`<`  `>`", "less / greater?", "`3 > 5`", "`False`"], ["`<=`  `>=`", "less or equal / greater or equal?", "`10 <= 10`", "`True`"]] },
    { t: "code", code: c`print(10 <= 10)
print("sara" == "Sara")
print("apple" != "banana")`, before: "<p>Comparisons work on text too. Predict each line before you run it.</p>", note: "<p><code>10 &lt;= 10</code> is <code>True</code> because \"less than <b>or equal</b>\" includes equal. <code>\"sara\" == \"Sara\"</code> is <code>False</code>: for Python a small <code>s</code> and a capital <code>S</code> are different characters. That is why we often compare <code>name.lower()</code> instead of <code>name</code>. And <code>!=</code> is True whenever the two values differ.</p>" },
    { t: "ar", html: "علامة = واحدة للتخزين، وعلامتان == للسؤال \"هل يساوي؟\". نتيجة أي مقارنة هي True أو False فقط. وانتبه{{g:|ي}}: الحروف الكبيرة والصغيرة مختلفة في المقارنة." },
    { t: "predict", code: c`x = 7
print(x >= 7, x != 7, x < 3)`, explain: "<code>7 &gt;= 7</code> is <code>True</code> (equal counts). <code>7 != 7</code> is <code>False</code> (they are equal). <code>7 &lt; 3</code> is <code>False</code>. Output: <code>True False False</code>." },

    { t: "h", text: "if: do something only when…" },
    { t: "p", html: "<p>An <code>if</code> statement runs some lines <b>only when</b> a condition is <code>True</code>. Its shape is always the same: the word <code>if</code>, a condition, a colon <code>:</code>, and then the lines that belong to it, pushed in by <b>4 spaces</b>.</p>" },
    { t: "code", code: c`temperature = int(input("Temperature in Riyadh today: "))
if temperature > 40:
    print("Stay inside, drink water!")
    print("Maybe study Python ;)")
print("Have a nice day")`, stdin: "44", before: "<p>Run it with <code>44</code> in the Input box, then change it to <code>30</code> and run again. Watch which lines disappear.</p>", note: "<p>Line by line:</p><ul><li>Line 1 reads the temperature and converts it to a number.</li><li>Line 2 asks: is it greater than 40? With 44 the answer is <code>True</code>.</li><li>Lines 3–4 are <b>indented</b>, so they belong to the <code>if</code>. They run only when the answer is True.</li><li>Line 5 is <b>not</b> indented. It is outside the <code>if</code>, so it runs every time.</li></ul><p>With 30, the condition is False: Python skips lines 3–4 and jumps straight to line 5.</p>" },
    { t: "analogy", title: "Indentation = belonging", html: "<p>The colon <code>:</code> says \"a block starts here\". The lines indented under it <b>belong</b> to the <code>if</code>, like items under a heading in a list. When the indentation ends, the block ends. Other languages use <code>{ }</code> for this; Python uses spaces, so the code always looks tidy.</p>" },
    { t: "ar", html: "if تنفذ الأسطر المزاحة تحتها فقط إذا كان الشرط True. لا تنس{{g:|ي}} النقطتين : في نهاية سطر if، والإزاحة ٤ مسافات للأسطر التابعة لها. السطر غير المزاح يُنفذ دائمًا." },

    { t: "h", text: "if / else: two roads" },
    { t: "p", html: "<p>Often you want to do one thing when the answer is yes and <b>something else</b> when it is no. That is what <code>else</code> is for. Exactly one of the two blocks runs — never both, never neither.</p>" },
    { t: "code", code: c`n = int(input("A number: "))
if n % 2 == 0:
    print(n, "is even")
else:
    print(n, "is odd")`, stdin: "7", before: "<p>Remember <code>%</code> from Day 3? It gives the remainder. Even numbers have remainder 0 when divided by 2. Try <code>7</code>, then <code>10</code>.</p>", note: "<p>Line by line with 7:</p><ul><li><code>7 % 2</code> is <code>1</code>, so <code>n % 2 == 0</code> asks \"is 1 equal to 0?\" → <code>False</code>.</li><li>The <code>if</code> block (line 3) is skipped.</li><li><code>else:</code> catches every case the <code>if</code> did not, so line 5 runs: <code>7 is odd</code>.</li></ul><p>Notice that <code>else</code> has <b>no condition</b> and sits at the same indentation as its <code>if</code>.</p>" },
    { t: "ar", html: "else تعني \"وإلا\": تُنفذ عندما يكون شرط if خاطئًا. واحد فقط من الفرعين يُنفذ. و else لا تأخذ شرطًا، وتكون بنفس مستوى إزاحة if." },
    { t: "predict", code: c`balance = 50
price = 80
if balance >= price:
    print("Bought!")
else:
    print("Need", price - balance, "more")`, explain: "<code>50 &gt;= 80</code> is False, so the <code>else</code> block runs and calculates <code>80 - 50</code>. Output: <code>Need 30 more</code>." },

    { t: "h", text: "if / elif / else: many roads" },
    { t: "p", html: "<p>Some questions have more than two answers: a grade can be A, B, C or F. <code>elif</code> (short for <b>else if</b>) adds more roads. Python checks the conditions <b>from top to bottom</b> and runs <b>only the first</b> branch that is True — then skips all the rest.</p>" },
    { t: "viz", code: c`score = 84
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print("Grade:", grade)`, before: "<p>Visualize it and press Next ▶ slowly. Watch which lines Python checks and which ones it jumps over.</p>", note: "<p>With <code>score = 84</code>:</p><ul><li><code>84 &gt;= 90</code>? False → skip <code>grade = \"A\"</code>.</li><li><code>84 &gt;= 80</code>? True → <code>grade = \"B\"</code>, and Python <b>leaves the whole chain</b>.</li><li>The <code>&gt;= 70</code> check is never even asked, although 84 is also bigger than 70.</li></ul><p>This is why the <b>order</b> matters: we check the highest grade first. If <code>&gt;= 70</code> came first, every score from 70 up would get a C.</p>" },
    { t: "ar", html: "elif تعني \"وإلا إذا\". بايثون يفحص الشروط من الأعلى للأسفل، وينفذ أول شرط صحيح فقط ثم يتجاهل الباقي. لذلك رتّب{{g:|ي}} الشروط من الأدق (الأعلى) إلى الأعم." },
    { t: "predict", code: c`temp = 25
if temp > 30:
    print("hot")
elif temp > 20:
    print("warm")
elif temp > 10:
    print("cool")
else:
    print("cold")`, explain: "<code>25 &gt; 30</code> is False. <code>25 &gt; 20</code> is True, so it prints <code>warm</code> and stops. <code>25 &gt; 10</code> is also true, but it is never checked." },

    { t: "h", text: "Combining conditions: and, or, not" },
    { t: "p", html: "<p>Sometimes one question is not enough: a student discount needs <i>young</i> <b>and</b> <i>a student</i>. The weekend is Friday <b>or</b> Saturday. Python joins conditions with three words:</p>" },
    { t: "table", head: ["Operator", "True when…", "Example"], rows: [["`and`", "both sides are True", "`age >= 18 and has_id`"], ["`or`", "at least one side is True", "`day == \"Fri\" or day == \"Sat\"`"], ["`not`", "it flips True ↔ False", "`not is_raining`"]] },
    { t: "code", code: c`age = 20
is_student = True
if age < 25 and is_student:
    print("You get the student discount")`, before: "<p><code>and</code> is strict: <b>both</b> parts must be True. Change <code>age</code> to 30 and run again.</p>", note: "<p><code>age &lt; 25</code> is True and <code>is_student</code> is True, so <code>True and True</code> → <code>True</code> and the message prints. With <code>age = 30</code> the first part becomes False, and one False is enough to make the whole <code>and</code> False. Notice <code>is_student</code> is already a boolean, so we write it alone — no need for <code>== True</code>.</p>" },
    { t: "code", code: c`day = "Fri"
if day == "Fri" or day == "Sat":
    print("Weekend!")
if not day == "Sun":
    print("Not Sunday")`, before: "<p><code>or</code> is relaxed: <b>one</b> True part is enough. <code>not</code> turns the answer around.</p>", note: "<p><code>day == \"Fri\"</code> is True, so the <code>or</code> is True right away → <code>Weekend!</code>. A common mistake is writing <code>day == \"Fri\" or \"Sat\"</code>: each side of <code>or</code> must be a <b>full</b> comparison. On the last line, <code>day == \"Sun\"</code> is False, and <code>not</code> flips it to True, so <code>Not Sunday</code> prints. (<code>day != \"Sun\"</code> means the same thing.)</p>" },
    { t: "code", code: c`age = 20
print(18 <= age <= 25)
print(age >= 18 and age <= 25)`, before: "<p>A Python shortcut: you can <b>chain</b> comparisons like in math, to check if a value is inside a range.</p>", note: "<p>Both lines ask the same question: \"is age between 18 and 25?\" and both print <code>True</code>. <code>18 &lt;= age &lt;= 25</code> is just a shorter way to write the <code>and</code> version. Use whichever is clearer for you.</p>" },
    { t: "ar", html: "and: يجب أن يكون الشرطان صحيحين. or: يكفي شرط واحد صحيح. not: تعكس النتيجة. وكل طرف من or يجب أن يكون مقارنة كاملة: day == \"Fri\" or day == \"Sat\"." },

    { t: "h", text: "An if inside an if" },
    { t: "p", html: "<p>A block under an <code>if</code> can contain <b>another</b> <code>if</code>. This is called <b>nesting</b>. Use it when the second question only makes sense after the first answer — like checking the password only after you know the user exists.</p>" },
    { t: "code", code: c`username = input("Username: ")
password = input("Password: ")
if username == "{{name}}":
    if password == "py30":
        print("Welcome back!")
    else:
        print("Wrong password")
else:
    print("Unknown user")`, stdin: "{{name}}\npy30", before: "<p>Run it, then try a wrong password, then a wrong username. Look at the indentation levels: each one is 4 more spaces.</p>", note: "<p>Python first asks the <b>outer</b> question: is the username right?</p><ul><li>If not, it jumps to the last <code>else</code> → <code>Unknown user</code>. The password is never checked.</li><li>If yes, it enters the block and asks the <b>inner</b> question about the password, which has its own <code>if/else</code>.</li></ul><p>Each <code>else</code> belongs to the <code>if</code> at the <b>same indentation</b>. That is how Python knows which question it answers.</p>" },
    { t: "ar", html: "يمكن وضع if داخل if. الشرط الداخلي لا يُفحص إلا إذا كان الشرط الخارجي صحيحًا. وكل else تتبع if الموجودة على نفس مستوى الإزاحة." },

    { t: "h", text: "Putting it together: a ticket price program" },
    { t: "code", code: c`age = int(input("Age: "))
day = input("Day: ")
if age < 6:
    price = 0
elif age < 18 or age >= 60:
    price = 25
else:
    price = 50
if day == "Tue":
    price = price // 2
print("Ticket:", price, "SAR")`, stdin: "20\nTue", together: true, before: "<p>This program uses everything from today. Read it first and guess the price for a 20-year-old on Tuesday, then run it. Try other ages and days too.</p>", note: "<p>How it works:</p><ul><li>Lines 3–8 choose a base price with one <code>if/elif/else</code> chain: children under 6 are free, young people <b>or</b> seniors pay 25, everyone else 50.</li><li>Lines 9–10 are a <b>separate</b> <code>if</code> (not an <code>elif</code>), so it is checked for every visitor: on Tuesday the price is halved with <code>//</code>.</li><li>For age 20 on Tue: not under 6, not under 18, not 60+, so <code>price = 50</code>; then Tuesday makes it <code>25</code>.</li></ul><p>Choosing between <b>one chain</b> (only one branch runs) and <b>separate ifs</b> (each is checked) is a decision you will make in every program.</p>" },
    { t: "ar", html: "سلسلة if/elif/else تختار فرعًا واحدًا فقط، أما جمل if المنفصلة فتُفحص كلها. هنا اخترنا السعر بسلسلة واحدة، ثم طبّقنا خصم الثلاثاء بجملة if منفصلة." },
  ],
  mistakes: [
    { title: "= instead of ==", html: "Inside a condition you <b>ask</b>, you don't store.", wrong: c`if x = 5:
    print("five")`, right: c`if x == 5:
    print("five")` },
    { title: "Missing colon or indentation", html: "Both cause errors. The line after the colon must be indented.", wrong: c`if score > 50
print("Pass")`, right: c`if score > 50:
    print("Pass")` },
    { title: "Wrong order of elif", html: "A score of 95 is also <code>>= 60</code>, so the first branch catches it and the A is never reached. <b>Put the most specific condition first.</b> No error message — just a wrong result.", wrong: c`if score >= 60:
    print("D")
elif score >= 90:
    print("A")`, right: c`if score >= 90:
    print("A")
elif score >= 60:
    print("D")`, ar: "رتّب{{g:|ي}} الشروط من الأضيق للأوسع. بايثون ينفذ أول شرط صحيح فقط ويتجاهل الباقي." },
    { title: "Lazy or", html: "<code>day == \"Fri\" or \"Sat\"</code> is <b>always</b> True, because the non-empty string <code>\"Sat\"</code> counts as True on its own. Repeat the comparison.", wrong: c`if day == "Fri" or "Sat":`, right: c`if day == "Fri" or day == "Sat":` },
  ],
  tricks: [
    { title: "A condition is already a bool", html: "No need for <code>if x > 0: result = True else: result = False</code>. Just write <code>result = x > 0</code>." },
    { title: "One-line choice (conditional expression)", html: "For simple two-way choices:", code: c`n = 7
kind = "even" if n % 2 == 0 else "odd"
print(kind)` },
    { title: "in for many options", html: "<code>if day in (\"Fri\", \"Sat\"):</code> is cleaner than a long chain of <code>or</code>." },
  ],
  practice: [
    { t: "predict", code: c`x = 15
if x > 10:
    print("A")
if x > 5:
    print("B")
else:
    print("C")`, explain: "These are <b>two separate</b> <code>if</code> statements. The first prints <code>A</code>. The second is also True, so it prints <code>B</code> and skips its <code>else</code>." },
    { t: "predict", code: c`x = 15
if x > 10:
    print("A")
elif x > 5:
    print("B")
else:
    print("C")`, explain: "Now it is one chain. Only the <b>first</b> True branch runs: <code>A</code>. Compare with the previous prediction — this difference trips up many students." },
    { t: "predict", code: c`print(True and False)
print(True or False)
print(not (5 > 3))
print(3 < 5 < 4)`, explain: "<code>and</code> needs both → False. <code>or</code> needs one → True. <code>not True</code> → False. And <code>3 &lt; 5 &lt; 4</code> means <code>3 &lt; 5 and 5 &lt; 4</code> → False." },
    { t: "parsons", title: "Even or odd", prompt: "Arrange the lines — including the indentation — to read a number and say if it is even or odd.", lines: ["n = int(input())", "if n % 2 == 0:", "    print(\"even\")", "else:", "    print(\"odd\")"], distractors: ["if n % 2 = 0:", "    else:"], explain: "Note how indentation is part of each line: the prints belong to their branch; <code>else</code> lines up with <code>if</code>." },
    { t: "try", title: "Weather advisor", html: "<p>Extend this program: add a branch for temperatures below 15 (\"Take a jacket\") and one between 30 and 40 (\"Warm day\"). Test it with several values in the Input box.</p>", code: c`t = int(input("Temperature: "))
if t > 40:
    print("Extreme heat!")
else:
    print("Nice weather")`, stdin: "35" },
    { t: "viz", code: c`a, b, c = 7, 12, 9
biggest = a
if b > biggest:
    biggest = b
if c > biggest:
    biggest = c
print("Biggest:", biggest)`, before: "<p>A classic pattern: assume the first is the biggest, then challenge it. Visualize and see <code>biggest</code> change only once.</p>" },
  ],
  exercises: [
    { id: "evenodd", lvl: "seed", title: "Even or odd", prompt: "<p>Read a whole number and print <code>even</code> or <code>odd</code>.</p>", tests: [{ stdin: "4", expected: "even" }, { stdin: "7", expected: "odd" }, { stdin: "0", expected: "even" }],
      solutions: [{ name: "if / else", code: c`n = int(input())
if n % 2 == 0:
    print("even")
else:
    print("odd")` }, { name: "Conditional expression", code: c`n = int(input())
print("even" if n % 2 == 0 else "odd")` }] },
    { id: "pass", lvl: "seed", title: "Pass or fail", prompt: "<p>Read a mark (0–100). Print <code>Pass</code> if it is 60 or more, otherwise <code>Fail</code>.</p>", tests: [{ stdin: "75", expected: "Pass" }, { stdin: "60", expected: "Pass" }, { stdin: "59", expected: "Fail" }],
      hint: "60 must pass — so <code>&gt;=</code>, not <code>&gt;</code>. Testing the <b>boundary</b> value is a habit of good programmers.",
      solutions: [{ name: "if / else", code: c`mark = int(input())
if mark >= 60:
    print("Pass")
else:
    print("Fail")` }] },
    { id: "grade", lvl: "star", title: "Letter grade", prompt: "<p>Read a score and print its letter: 90 and above <code>A</code>, 80–89 <code>B</code>, 70–79 <code>C</code>, 60–69 <code>D</code>, below 60 <code>F</code>.</p>", tests: [{ stdin: "95", expected: "A" }, { stdin: "80", expected: "B" }, { stdin: "79", expected: "C" }, { stdin: "60", expected: "D" }, { stdin: "12", expected: "F" }],
      hint: "Start with the highest grade and go down with <code>elif</code>. Because of the order, <code>elif score &gt;= 80</code> already knows the score is below 90.",
      solutions: [{ name: "Top-down elif", code: c`score = int(input())
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("F")`, note: "Short and correct because each branch relies on the previous ones being False." }, { name: "Explicit ranges", code: c`score = int(input())
if score >= 90:
    print("A")
if 80 <= score < 90:
    print("B")
if 70 <= score < 80:
    print("C")
if 60 <= score < 70:
    print("D")
if score < 60:
    print("F")`, note: "Also correct, but longer, and Python checks all five conditions every time. The elif version is preferred." }] },
    { id: "max3", lvl: "star", title: "The biggest of three", prompt: "<p>Read three whole numbers (three lines) and print the biggest.</p>", tests: [{ stdin: "4\n9\n2", expected: "9" }, { stdin: "10\n3\n10", expected: "10" }, { stdin: "-5\n-2\n-9", expected: "-2" }],
      solutions: [{ name: "Champion pattern", code: c`a = int(input())
b = int(input())
c = int(input())
biggest = a
if b > biggest:
    biggest = b
if c > biggest:
    biggest = c
print(biggest)`, note: "Scales well: this is exactly how you will find the maximum of a whole list next week." }, { name: "and conditions", code: c`a = int(input())
b = int(input())
c = int(input())
if a >= b and a >= c:
    print(a)
elif b >= c:
    print(b)
else:
    print(c)` }, { name: "Built-in max()", code: c`a = int(input())
b = int(input())
c = int(input())
print(max(a, b, c))`, note: "In real code you would use <code>max()</code>. But solving it by hand first trains your logic — and interviewers love this question." }] },
    { id: "leap", lvl: "star", title: "Leap year", prompt: "<p>A year is a leap year if it is divisible by 4, <b>except</b> years divisible by 100 — <b>unless</b> they are also divisible by 400. Read a year and print <code>Leap</code> or <code>Not leap</code>.</p>", tests: [{ stdin: "2024", expected: "Leap" }, { stdin: "2026", expected: "Not leap" }, { stdin: "1900", expected: "Not leap" }, { stdin: "2000", expected: "Leap" }],
      hint: "Handle the most specific rule (400) first, then 100, then 4.", ar: "ابدأ{{g:|ي}} بالشرط الأخص: القسمة على 400، ثم 100، ثم 4.",
      solutions: [{ name: "elif ladder", code: c`y = int(input())
if y % 400 == 0:
    print("Leap")
elif y % 100 == 0:
    print("Not leap")
elif y % 4 == 0:
    print("Leap")
else:
    print("Not leap")` }, { name: "One boolean expression", code: c`y = int(input())
is_leap = (y % 4 == 0 and y % 100 != 0) or y % 400 == 0
print("Leap" if is_leap else "Not leap")`, note: "The whole rule as one logical sentence." }] },
    { id: "ticket", lvl: "fire", title: "Cinema ticket", prompt: "<p>A cinema in Riyadh charges: children under 12 → <code>25</code>, people 60 and over → <code>30</code>, everyone else → <code>60</code>. University students (answer <code>yes</code>) aged 12–59 get 50% off. Read the age and the student answer and print the price.</p>", tests: [{ stdin: "8\nno", expected: "25" }, { stdin: "20\nyes", expected: "30" }, { stdin: "20\nno", expected: "60" }, { stdin: "65\nyes", expected: "30" }, { stdin: "12\nyes", expected: "30" }],
      hint: "Decide the age group first. Only inside the \"everyone else\" branch does the student question matter.",
      solutions: [{ name: "Nested if", code: c`age = int(input())
student = input()
if age < 12:
    price = 25
elif age >= 60:
    price = 30
else:
    if student == "yes":
        price = 60 // 2
    else:
        price = 60
print(price)` }, { name: "Flat with and", code: c`age = int(input())
student = input().strip().lower()
if age < 12:
    print(25)
elif age >= 60:
    print(30)
elif student == "yes":
    print(30)
else:
    print(60)`, note: "Also cleans the answer with <code>.strip().lower()</code>, so <code>YES</code> or <code> yes </code> work too — robust programs expect messy input." }] },
    { id: "login", lvl: "fire", title: "Secure login", prompt: "<p>Read a username and a password. The correct account is <code>admin</code> / <code>Py30!</code>. Print:</p><ul><li><code>Welcome, admin</code> if both are correct</li><li><code>Wrong password</code> if only the username is correct</li><li><code>No such user</code> otherwise</li></ul><p>The username should ignore capital letters and extra spaces; the password must match exactly.</p>", tests: [{ stdin: "admin\nPy30!", expected: "Welcome, admin" }, { stdin: "  ADMIN \nPy30!", expected: "Welcome, admin" }, { stdin: "admin\npy30!", expected: "Wrong password" }, { stdin: "sara\nPy30!", expected: "No such user" }],
      solutions: [{ name: "Nested", code: c`user = input().strip().lower()
pw = input()
if user == "admin":
    if pw == "Py30!":
        print("Welcome, admin")
    else:
        print("Wrong password")
else:
    print("No such user")` }, { name: "elif chain", code: c`user = input().strip().lower()
pw = input()
if user != "admin":
    print("No such user")
elif pw != "Py30!":
    print("Wrong password")
else:
    print("Welcome, admin")`, note: "The \"guard\" style: handle the problems first, and the happy path at the end. Many professionals prefer it because it avoids deep nesting." }] },
    { id: "fix5", lvl: "fire", debug: true, title: "The discount disaster", prompt: "<p>A shop gives: 20% off for totals of 500 or more, 10% off for 200 or more, nothing below 200. This program has one crash bug and one <b>logic</b> bug. Fix both. For <code>600</code> it must print <code>480.0</code>.</p>", starter: c`total = float(input())
if total >= 200:
    total = total * 0.9
elif total >= 500
    total = total * 0.8
print(total)`, tests: [{ stdin: "600", expected: "480.0" }, { stdin: "300", expected: "270.0" }, { stdin: "100", expected: "100.0" }],
      ar: "بعد إصلاح النقطتين، جرّب{{g:|ي}} 600: هل يدخل في الشرط الصحيح؟ فكّر{{g:|ي}} في ترتيب الشروط.",
      solutions: [{ name: "Fixed", code: c`total = float(input())
if total >= 500:
    total = total * 0.8
elif total >= 200:
    total = total * 0.9
print(total)`, note: "The crash: a missing colon. The logic bug: 600 is also ≥ 200, so it got only 10%. Most specific condition first!" }] },
  ],
  quiz: [
    { q: "What does this print?", code: c`x = 5
if x > 3:
    print("big")
else:
    print("small")
print("done")`, o: ["`big`", "`big` then `done`", "`small` then `done`", "`done`"], a: 1, e: "The if branch runs, then the unindented line always runs." },
    { q: "`not (3 > 2 and 1 > 2)` is…", o: ["`True`", "`False`", "An error", "`None`"], a: 0, e: "`3 > 2 and 1 > 2` is False, and `not False` is True." },
    { q: "For `score = 85`, which branch runs?", code: c`if score >= 70:
    print("C")
elif score >= 80:
    print("B")`, o: ["`C`", "`B`", "Both", "None"], a: 0, e: "The first True branch wins. This order is a bug!" },
    { q: "Which condition checks that `n` is between 1 and 10 (inclusive)?", o: ["`1 < n < 10`", "`1 <= n <= 10`", "`n >= 1 or n <= 10`", "`n in 1, 10`"], a: 1, e: "Inclusive means `<=`. And `or` would accept every number!" },
    { q: "What is wrong here? `if day == \"Fri\" or \"Sat\":`", o: ["Nothing", "It is always True", "It is always False", "It is a SyntaxError"], a: 1, e: "`\"Sat\"` alone counts as True. Write `day == \"Fri\" or day == \"Sat\"`." },
  ],
  puzzle: { title: "Truth detective", q: "<p>What does this print? Answer <code>True</code> or <code>False</code>.</p>", code: c`a = 4
b = 7
print(a > 2 and not b < 5 or a == b)`, answers: ["true"], hint: "Priority: <code>not</code> first, then <code>and</code>, then <code>or</code>.", ar: "الأولوية: not ثم and ثم or.", e: "<code>not b &lt; 5</code> → not False → True. <code>a &gt; 2 and True</code> → True. <code>True or (a == b)</code> → <b>True</b>." },
  cards: [
    { f: "Difference between `=` and `==`?", b: "`=` stores a value; `==` compares and gives True/False." },
    { f: "In an if/elif/else chain, how many branches run?", b: "Exactly one: the first True condition (or else)." },
    { f: "How to order conditions like score >= 90 / >= 60?", b: "Most specific (highest) first." },
    { f: "`and` vs `or`", b: "`and`: both must be True. `or`: at least one True." },
    { f: "What does the colon at the end of `if x > 0:` mean?", b: "A block starts; the next lines must be indented (4 spaces)." },
  ],
};
})();

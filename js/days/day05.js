window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[5] = {
  title: "Decisions: if, elif, else",
  intro: "Today your programs learn to think. With <code>if</code>, a program can react differently to different situations: pass or fail, open or locked, discount or full price. This is where programming starts to feel like building intelligence.",
  introAr: "اليوم البرنامج يتخذ قرارات! نتعلم الشروط if و elif و else، وعوامل المقارنة، وربط الشروط بـ and و or و not. وانتبه{{g:|ي}} جيدًا للإزاحة (المسافات) لأنها أساسية هنا.",
  goals: ["Compare values with `==`, `!=`, `<`, `>`, `<=`, `>=`", "Write `if`, `if/else` and `if/elif/else` blocks with correct indentation", "Combine conditions with `and`, `or`, `not`", "Order `elif` conditions correctly", "Trace which branch runs for any input"],
  learn: [
    { t: "h", text: "Programs that make decisions" },
    { t: "p", html: "<p>Until now every program ran <b>all</b> its lines, every time. Real life is not like that. A portal shows <i>Pass</i> or <i>Fail</i> depending on your mark. A coffee app adds a discount only if you have a loyalty card. A weather app says \"take water\" only when it is hot. To do this, a program must ask a question and then choose what to do. Today you learn how.</p>" },
    { t: "analogy", title: "A fork in the road", html: "<p>Imagine driving to campus and reaching a fork: <i>if the main road is busy, take the side road; otherwise, go straight</i>. You check one question, and the answer decides which road you take. An <code>if</code> statement is exactly that fork inside your program.</p>" },
    { t: "h", text: "Questions with True or False answers" },
    { t: "p", html: "<p>Every decision starts with a question whose answer is <b>yes or no</b>. In Python the answer is a bool: <code>True</code> or <code>False</code> (you met bools on Day 2). You ask these questions with <b>comparison operators</b>.</p>" },
    { t: "code", code: c`age = 19
print(age > 18)
print(age == 20)
print(age != 20)
print(10 <= 10)`, before: "<p>Each line asks a question. Predict the four answers before you run.</p>" },
    { t: "lines", rows: [
      [c`print(age > 18)`, "Is 19 greater than 18? Yes → <code>True</code>."],
      [c`print(age == 20)`, "<code>==</code> (two equal signs) asks \"is it equal?\". 19 is not 20 → <code>False</code>."],
      [c`print(age != 20)`, "<code>!=</code> asks \"is it <b>not</b> equal?\". 19 is not 20, so the answer is <code>True</code>."],
      [c`print(10 <= 10)`, "\"Less than <b>or equal</b>?\" 10 is equal to 10 → <code>True</code>. With <code>&lt;</code> alone it would be False."]] },
    { t: "table", head: ["Operator", "Question it asks", "Example → result"], rows: [["`==`", "equal?", "`5 == 5` → `True`"], ["`!=`", "not equal?", "`5 != 3` → `True`"], ["`<` `>`", "less / greater?", "`3 > 7` → `False`"], ["`<=` `>=`", "less or equal / greater or equal?", "`60 >= 60` → `True`"]] },
    { t: "ar", html: "انتبه{{g:|ي}}: علامة = واحدة للتخزين، و == (علامتان) للسؤال \"هل يساوي؟\". هذا من أكثر الأخطاء شيوعًا عند المبتدئين." },
    { t: "h", text: "Comparing strings" },
    { t: "p", html: "<p>You can compare text too — for example, to check a password or a city name. But Python compares strings <b>character by character</b>, and a capital letter is a different character from a small one. So clean the text first with the methods from Day 4.</p>" },
    { t: "code", code: c`city = "Riyadh"
print(city == "Riyadh")
print(city == "riyadh")
print(city.lower() == "riyadh")
print("ya" in city)`, note: "<p><code>\"Riyadh\" == \"riyadh\"</code> is <code>False</code> because R and r are different. After <code>.lower()</code> both sides match. And <code>in</code> also gives a True/False answer, so it can be used in decisions as well.</p>" },
    { t: "check", q: "What does this print?", code: c`answer = "YES"
print(answer == "yes", answer.lower() == "yes")`, o: ["`True True`", "`False True`", "`False False`", "`True False`"], a: 1, e: "`\"YES\"` and `\"yes\"` are different strings, so the first is `False`. After `.lower()` the answer is `\"yes\"`, so the second is `True`.", ar: "المقارنة بين النصوص تفرّق بين الحروف الكبيرة والصغيرة؛ استخدم{{g:|ي}} lower() قبل المقارنة." },
    { t: "h", text: "if: do something only when…" },
    { t: "p", html: "<p>Now use a question to control the program. <code>if</code> runs a group of lines <b>only when</b> the condition is <code>True</code>. When it is <code>False</code>, those lines are skipped and the program continues after them.</p>" },
    { t: "code", code: c`temperature = int(input("Temperature in Riyadh today: "))
if temperature > 40:
    print("Stay inside, drink water!")
    print("Maybe study Python ;)")
print("Have a nice day")`, stdin: "44", note: "<p>Run it with <code>44</code>, then change the Input box to <code>30</code> and run again. With 30 the two indented lines are skipped.</p>" },
    { t: "lines", rows: [
      [c`temperature = int(input(...))`, "Read the temperature and convert it to a whole number (Day 3)."],
      [c`if temperature > 40:`, "The question. It ends with a <b>colon</b> <code>:</code>, which means \"a block of code starts on the next line\"."],
      [c`    print("Stay inside, drink water!")`, "Indented by 4 spaces → it <b>belongs</b> to the <code>if</code>. It runs only when the answer is True."],
      [c`    print("Maybe study Python ;)")`, "Same indentation → also inside the block. A block can have as many lines as you need."],
      [c`print("Have a nice day")`, "Back at the left edge → the block has ended. This line runs <b>always</b>, True or False."]] },
    { t: "analogy", title: "Indentation = belonging", html: "<p>Think of a shopping list where some items are indented under a heading: <i>If it is Friday:</i> &nbsp;— buy dates — buy coffee. The indented items belong to the heading. Python reads code the same way: the lines indented under <code>if ...:</code> belong to it, and when the indentation ends, the block ends. Other languages use <code>{ }</code>; Python uses spaces, so code always looks tidy.</p>" },
    { t: "ar", html: "بعد سطر if لازم نقطتان : ثم الأسطر التابعة له تُزاح ٤ مسافات. السطر الذي يرجع لبداية السطر لا يتبع if ويُنفَّذ دائمًا." },
    { t: "check", q: "The user types `30`. What is printed?", code: c`t = int(input())
if t > 40:
    print("Hot!")
    print("Drink water")
print("Bye")`, o: ["`Hot!`, `Drink water`, `Bye`", "`Bye` only", "`Drink water` and `Bye`", "Nothing"], a: 1, e: "30 > 40 is False, so both indented lines are skipped. `Bye` is not indented, so it always runs.", hint: "Which lines are inside the block? Which line is outside?" },
    { t: "h", text: "if / else: two roads" },
    { t: "p", html: "<p>Often you want one thing when the answer is yes and <b>something else</b> when it is no: pass or fail, even or odd, open or closed. That is what <code>else</code> is for. Exactly <b>one</b> of the two blocks runs — never both, never neither.</p>" },
    { t: "code", code: c`n = int(input("A number: "))
if n % 2 == 0:
    print(n, "is even")
else:
    print(n, "is odd")`, stdin: "7" },
    { t: "lines", rows: [
      [c`if n % 2 == 0:`, "The remainder of dividing by 2 (Day 3). If it is 0, the number is even."],
      [c`    print(n, "is even")`, "Runs only when the condition is True."],
      [c`else:`, "Lines up with <code>if</code> (no indentation) and has its own colon. It has no condition — it simply catches every other case."],
      [c`    print(n, "is odd")`, "Runs only when the condition is False. For 7: 7 % 2 is 1, so this line runs."]] },
    { t: "check", q: "What does this print?", code: c`n = 0
if n % 2 == 0:
    print("even")
else:
    print("odd")`, o: ["`even`", "`odd`", "`even` and `odd`", "Nothing"], a: 0, e: "0 % 2 is 0, so the condition is True and only the first block runs. Zero is an even number." },
    { t: "h", text: "if / elif / else: many roads" },
    { t: "p", html: "<p>Some questions have more than two answers. A mark becomes A, B, C or F; a temperature is cold, nice, warm or hot. <code>elif</code> (short for \"else if\") adds more roads. Python checks the conditions <b>from top to bottom</b> and runs <b>only the first</b> branch that is True — then it skips all the rest, even if they are also True.</p>" },
    { t: "viz", code: c`score = 84
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print("Grade:", grade)`, before: "<p>Visualize it and watch which lines are skipped. 84 is also ≥ 70, but the C branch is never even checked.</p>" },
    { t: "lines", rows: [
      [c`if score >= 90:`, "84 ≥ 90? No → skip this block and go to the next question."],
      [c`elif score >= 80:`, "84 ≥ 80? Yes → run this block. Because we got here, we already know the score is below 90."],
      [c`    grade = "B"`, "Store the grade. After this block Python <b>jumps out</b> of the whole chain."],
      [c`elif score >= 70:`, "Never checked for 84 — the chain already found its branch."],
      [c`else:`, "Runs only when <b>every</b> condition above was False (a score under 70)."]] },
    { t: "ar", html: "في سلسلة if / elif / else يُنفَّذ فرع واحد فقط: أول شرط صحيح من الأعلى. لذلك رتّب{{g:|ي}} الشروط من الأعلى للأقل (90 ثم 80 ثم 70)." },
    { t: "check", q: "What does this print?", code: c`score = 80
if score > 80:
    print("B+")
elif score >= 70:
    print("C")
else:
    print("F")`, o: ["`B+`", "`C`", "`F`", "`B+` and `C`"], a: 1, e: "80 > 80 is False (80 is not greater than itself), so Python moves on. 80 >= 70 is True → `C`. Boundary values like 80 are where bugs hide — always test them.", hint: "Is 80 greater than 80?" },
    { t: "h", text: "Combining conditions: and, or, not" },
    { t: "p", html: "<p>Real rules often have two parts: <i>a student discount needs you to be under 25 <b>and</b> to be a student</i>; <i>the weekend is Friday <b>or</b> Saturday</i>. Python has three words for this: <code>and</code>, <code>or</code> and <code>not</code>. They read almost like English.</p>" },
    { t: "analogy", title: "Two keys or any door", html: "<p>A bank safe that needs <b>two keys</b> turned together is <code>and</code>: both must be True. A room with <b>two doors</b> is <code>or</code>: you get in if at least one door is open. <code>not</code> is a light switch: it flips True to False and False to True.</p>" },
    { t: "code", code: c`age = 20
is_student = True
if age < 25 and is_student:
    print("You get the student discount")`, note: "<p>Both parts are True, so the message appears. Change <code>age</code> to 30 and it disappears — one False part is enough to make <code>and</code> False.</p>" },
    { t: "code", code: c`day = "Fri"
if day == "Fri" or day == "Sat":
    print("Weekend!")`, note: "<p>Only one part needs to be True. Notice that the full comparison <code>day == ...</code> is written on <b>both</b> sides of <code>or</code>.</p>" },
    { t: "code", code: c`is_raining = False
if not is_raining:
    print("Let's walk to the library")`, note: "<p><code>is_raining</code> is False, and <code>not False</code> is True, so the message appears. Read it like English: \"if it is not raining\".</p>" },
    { t: "code", code: c`age = 20
if 18 <= age <= 25:
    print("Between 18 and 25")`, before: "<p>One more shortcut: to ask \"is age between 18 and 25?\" you can chain two comparisons, just like in math.</p>", note: "<p><code>18 &lt;= age &lt;= 25</code> is a short way to write <code>18 &lt;= age and age &lt;= 25</code>. Both parts are True for 20, so the message appears.</p>" },
    { t: "table", head: ["Operator", "True when…", "Example"], rows: [["`and`", "both are True", "`age >= 18 and has_id`"], ["`or`", "at least one is True", "`day == \"Fri\" or day == \"Sat\"`"], ["`not`", "reverses True/False", "`not is_raining`"]] },
    { t: "ar", html: "and: لازم الشرطان صحيحان. or: يكفي شرط واحد صحيح. not: تعكس النتيجة. واكتب{{g:|ي}} المقارنة كاملة على جانبي or." },
    { t: "check", q: "What does this print?", code: c`age = 17
has_id = True
print(age >= 18 and has_id, age >= 18 or has_id)`, o: ["`True True`", "`False False`", "`False True`", "`True False`"], a: 2, e: "`age >= 18` is False. With `and`, one False makes the result False. With `or`, `has_id` is True, so the result is True." },
    { t: "h", text: "An if inside an if" },
    { t: "p", html: "<p>Sometimes a second question only makes sense after the first one is answered. You check the password <b>only</b> if the username exists. You can put an <code>if</code> inside another <code>if</code> block — just indent it one more level.</p>" },
    { t: "code", code: c`username = input("Username: ")
password = input("Password: ")
if username == "{{name}}":
    if password == "py30":
        print("Welcome back!")
    else:
        print("Wrong password")
else:
    print("Unknown user")`, stdin: "{{name}}\npy30", note: "<p>Change the Input box to try a wrong password, then a wrong username. Each <code>else</code> belongs to the <code>if</code> it lines up with.</p>" },
    { t: "steps", title: "A coffee order", problem: "<p>A campus café sells coffee in three sizes: <code>S</code> = 10 SAR, <code>M</code> = 13 SAR, <code>L</code> = 16 SAR. Customers with a loyalty card get 2 SAR off. Read the size and the answer to \"loyalty card?\" (<code>yes</code>/<code>no</code>) and print <code>Total: 11.00 SAR</code>. An unknown size prints <code>Unknown size</code>.</p>",
      steps: [
        { html: "<p><b>Understand and try examples by hand.</b> <code>M</code> + <code>yes</code> → 13 − 2 = 11. <code>L</code> + <code>no</code> → 16. <code>X</code> → Unknown size. Users may type <code>m</code> or <code> yes </code>, so clean the inputs.</p>", code: c`size = input().strip().upper()
card = input().strip().lower()` },
        { html: "<p><b>Choose the price</b> with an <code>if / elif / else</code> chain — one road per size. For an unknown size we store 0 as a signal.</p>", code: c`if size == "S":
    price = 10
elif size == "M":
    price = 13
elif size == "L":
    price = 16
else:
    price = 0` },
        { html: "<p><b>Handle the unknown size first</b>, and only in the normal case apply the discount — an <code>if</code> inside the <code>else</code>.</p>", code: c`if price == 0:
    print("Unknown size")
else:
    if card == "yes":
        price = price - 2
    print(f"Total: {price:.2f} SAR")` },
        { html: "<p><b>Test</b> every road: S, M, L, an unknown size, with and without a card. Change the Input box below and run a few times.</p>" }],
      code: c`size = input("Size (S/M/L): ").strip().upper()
card = input("Loyalty card? (yes/no): ").strip().lower()
if size == "S":
    price = 10
elif size == "M":
    price = 13
elif size == "L":
    price = 16
else:
    price = 0
if price == 0:
    print("Unknown size")
else:
    if card == "yes":
        price = price - 2
    print(f"Total: {price:.2f} SAR")`, stdin: "m\nyes", ar: "قسّم{{g:|ي}} المشكلة: نظّف{{g:|ي}} المدخلات، ثم اختر{{g:|ي}} السعر بسلسلة elif، ثم طبّق{{g:|ي}} الخصم، ثم جرّب{{g:|ي}} كل الحالات." },
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
    { t: "predict", code: c`word = "Python"
if "th" in word and len(word) > 5:
    print("yes")
else:
    print("no")
if word == "python":
    print("same")
print("end")`, explain: "<code>\"th\" in \"Python\"</code> is True and the length is 6 &gt; 5, so <code>and</code> gives True → <code>yes</code>. The second <code>if</code> compares with a small p, which is a different string → nothing. <code>end</code> always prints." },
    { t: "try", title: "Password checker", html: "<p>Run it with a few passwords in the Input box. Then add rules with <code>elif</code>: a password that contains the word <code>password</code> (use <code>in</code> and <code>.lower()</code>) prints <code>Too easy</code>, and one with 12 or more characters prints <code>Strong</code>. Think about the order of your conditions!</p>", code: c`pw = input("Password: ")
if len(pw) < 8:
    print("Too short")
else:
    print("OK")`, stdin: "py30rocks" },
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
    { q: "The user types `Yes`. What does this print?", code: c`answer = input()
if answer == "yes":
    print("OK")
else:
    print("Cancelled")`, o: ["`OK`", "`Cancelled`", "`OK` and `Cancelled`", "An error"], a: 1, e: "`\"Yes\"` with a capital Y is not equal to `\"yes\"`. Clean the input first: `answer = input().strip().lower()`." },
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
  remember: [
    "Comparisons give `True` or `False`: `==` `!=` `<` `>` `<=` `>=`. One `=` stores, two `==` ask.",
    "`if condition:` + an indented block (4 spaces). Lines back at the left edge always run.",
    "`if / else`: exactly one of the two blocks runs.",
    "`if / elif / else`: Python runs only the **first** True branch — put the most specific condition first.",
    "`and` = both True, `or` = at least one True, `not` flips. Write the full comparison on both sides of `or`.",
    "String comparisons care about capitals: clean input with `.strip().lower()` before comparing, and test boundary values like 60.",
  ],
  rememberAr: "الشرط يعطي True أو False، والأسطر المزاحة تحت if تتبعه. في سلسلة elif يُنفَّذ أول شرط صحيح فقط، فرتّب{{g:|ي}} الشروط من الأخص للأعم، ونظّف{{g:|ي}} النص قبل المقارنة.",
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[6] = {
  title: "Review + project: Smart Calculator",
  intro: "Five days, five big ideas: print, variables, input and math, strings, decisions. Today you put them together and build real programs — the way professional programmers do it: understand, plan, build in small steps, test.",
  introAr: "يوم المراجعة والمشروع! اليوم نتعلم طريقة المبرمجين في حل المشكلات خطوة بخطوة، ثم نبني آلة حاسبة ذكية على مراحل، ولعبة تخمين، وحاسبة أجرة تاكسي.",
  goals: ["Use a 5-step method to solve any programming problem", "Build a program in small milestones, testing each one", "Combine input, math, strings and decisions in one project", "Find bugs from all five topics"],
  learn: [
    { t: "h", text: "How programmers solve problems" },
    { t: "p", html: "<p>Beginners often start typing code immediately — and get stuck. Professionals first <b>think</b>. Use these five steps for every problem from now on:</p><ol><li><b>Understand.</b> What are the inputs? What exactly must the output look like?</li><li><b>Examples.</b> Solve 2–3 cases by hand, including edge cases (zero, negative, the boundary).</li><li><b>Plan.</b> Write the steps in plain words (pseudocode) before any Python.</li><li><b>Code in small pieces.</b> Write a few lines, run, check. Repeat.</li><li><b>Test and improve.</b> Try your hand examples and the weird cases. Then clean up the code.</li></ol>" },
    { t: "analogy", title: "Cooking a new dish", html: "<p>Nobody cooks a new kabsa recipe by throwing everything in the pot at once. You read the recipe (understand), picture the result (examples), gather and order the steps (plan), cook one step at a time and taste as you go (small pieces), and adjust the salt at the end (test and improve). If it tastes wrong, you know which step to check — because you tasted after each one.</p>" },
    { t: "p", html: "<p>The hand examples from step 2 are not wasted time: they become your <b>tests</b> in step 5. If the program gives a different answer than your hand calculation, either the code or your understanding has a bug — and you find out right away.</p>" },
    { t: "ar", html: "لا تبدأ{{g:|ي}} بكتابة الكود مباشرة! افهم{{g:|ي}} المطلوب، حل{{g:|ي}} مثالين بيدك، اكتب{{g:|ي}} الخطوات بالكلام، ثم اكتب{{g:|ي}} الكود على أجزاء صغيرة وجرّب{{g:|ي}} بعد كل جزء. والأمثلة التي حللتها بيدك هي نفسها اختباراتك في النهاية." },

    { t: "h", text: "Worked example: delivery fee" },
    { t: "p", html: "<p><b>Problem:</b> A delivery app charges 7 SAR for the first 3 km and 1.5 SAR for each extra km. Orders of 100 SAR or more get free delivery. Read the order total and the distance; print the fee.</p><p><b>1. Understand</b> — inputs: order total, distance. Output: the fee. Both inputs can have decimals, so we will use <code>float()</code>.<br><b>2. Examples</b> — total 50, 2 km → 7. Total 50, 5 km → 7 + 2 × 1.5 = 10. Total 120, 9 km → 0. And the boundary: total exactly 100 → free.<br><b>3. Plan:</b></p>" },
    { t: "static", code: c`read total and distance
if total >= 100: fee is 0
else if distance <= 3: fee is 7
else: fee is 7 + (distance - 3) * 1.5
print fee` },
    { t: "p", html: "<p>Notice the plan's order: the free-delivery rule comes <b>first</b>, because it wins no matter the distance. Each plan line becomes one or two lines of Python.</p>" },
    { t: "code", title: "4. Code — then test with the hand examples", code: c`total = float(input("Order total: "))
distance = float(input("Distance (km): "))
if total >= 100:
    fee = 0
elif distance <= 3:
    fee = 7
else:
    fee = 7 + (distance - 3) * 1.5
print(f"Delivery fee: {fee:.2f} SAR")`, stdin: "50\n5", before: "<p>Run it with <code>50</code> and <code>5</code> (already in the Input box). Then do step 5: change the Input to each of the other hand examples — <code>50</code>/<code>2</code>, <code>120</code>/<code>9</code>, <code>100</code>/<code>4</code> — and compare with your answers.</p>", note: "<p>How the plan became code:</p><ul><li>Lines 1–2 read both inputs and convert them with <code>float()</code> (Day 3), because <code>input()</code> always gives text.</li><li>Lines 3–8 are one <code>if/elif/else</code> chain (Day 5): exactly one branch sets <code>fee</code>. With 50 and 5: not ≥ 100, not ≤ 3, so <code>fee = 7 + 2 * 1.5 = 10.0</code>.</li><li>Line 9 prints once, at the end, with an f-string and <code>.2f</code> (Day 4) → <code>Delivery fee: 10.00 SAR</code>.</li></ul><p>Testing <code>100</code> checks the <b>boundary</b>: if we had written <code>&gt;</code> instead of <code>&gt;=</code>, an order of exactly 100 SAR would wrongly pay. Boundary tests catch exactly this kind of bug.</p>" },
    { t: "ar", html: "حوّلنا الخطة إلى كود سطرًا بسطر، ثم اختبرناه بالأمثلة التي حللناها باليد. اختبر{{g:|ي}} دائمًا القيمة الحدّية (مثل 100 بالضبط) لأنها تكشف خطأ استخدام &gt; بدل &gt;=." },

    { t: "h", text: "Week 1 in one table" },
    { t: "p", html: "<p>Before the project, a quick tour of the five days. The table is your summary; the short sections below remind you <b>what</b> each idea is and <b>when</b> you need it, each with one small example.</p>" },
    { t: "table", head: ["Day", "Idea", "Remember"], rows: [["1", "`print`, comments", "text in quotes, `sep`, `end`, `\\n`"], ["2", "variables, types", "`=` stores; `int` `float` `str` `bool`"], ["3", "input, math", "`input()` gives `str` → `int()`/`float()`; `//` `%`"], ["4", "strings", "index from 0, slices, methods, f-strings"], ["5", "decisions", "`==`, `if/elif/else`, `and/or/not`, indentation"]] },
    { t: "ar", html: "هذا ملخص الأسبوع الأول: الطباعة، المتغيرات والأنواع، الإدخال والحساب، النصوص، والشروط. المشروع اليوم يستخدمها كلها معًا." },

    { t: "h", text: "Day 1 reminder: print and comments" },
    { t: "p", html: "<p><code>print()</code> is how your program talks to the user. Text goes inside quotes; several values are separated by commas and printed with a space between them. <code>sep</code> changes that space, <code>end</code> changes what comes after the line (normally a new line), and <code>\\n</code> inside text starts a new line. A <code>#</code> starts a comment: a note for humans that Python ignores. Use it whenever you print results.</p>" },
    { t: "code", code: c`# a comment: Python skips this line
print("Py30", "Week", 1, sep="-")
print("Loading", end="...")
print("done")
print("Line one\nLine two")`, before: "<p>Predict the four lines of output, then run it.</p>", note: "<p>Line by line:</p><ul><li>Line 1 is a comment, so nothing is printed for it.</li><li><code>sep=\"-\"</code> puts a dash between the values instead of a space → <code>Py30-Week-1</code>.</li><li><code>end=\"...\"</code> replaces the usual new line, so the next print continues on the same line → <code>Loading...done</code>.</li><li><code>\\n</code> splits the text into two lines: <code>Line one</code> and <code>Line two</code>.</li></ul>" },
    { t: "ar", html: "print تطبع النص والقيم، و sep تغيّر الفاصل بينها، و end تغيّر ما يأتي بعد السطر، و \\n تبدأ سطرًا جديدًا. والتعليق يبدأ بـ # وبايثون يتجاهله." },

    { t: "h", text: "Day 2 reminder: variables and types" },
    { t: "p", html: "<p>A <b>variable</b> is a name for a value, so you can use it later. One <code>=</code> stores the value on the right in the name on the left. Every value has a <b>type</b>: <code>int</code> (whole numbers), <code>float</code> (decimals), <code>str</code> (text) and <code>bool</code> (<code>True</code>/<code>False</code>). The type decides what operations mean — you need it in mind every time a program mixes numbers and text.</p>" },
    { t: "code", code: c`a = "3"
b = 4
print(type(a), type(b))
print(a * b, int(a) * b)
print(str(b) + a)`, before: "<p>The same symbol does different things for different types. Run it and compare the two results on line 4.</p>", note: "<p>Line by line:</p><ul><li><code>a</code> holds the <b>text</b> <code>\"3\"</code>, <code>b</code> holds the <b>number</b> 4, as <code>type()</code> confirms: <code>str</code> and <code>int</code>.</li><li><code>a * b</code> repeats the text 4 times → <code>3333</code>, while <code>int(a) * b</code> is real multiplication → <code>12</code>.</li><li><code>str(b) + a</code> glues two texts → <code>43</code>, not 7.</li></ul><p>When a result looks strange, check the types first.</p>" },
    { t: "ar", html: "المتغير اسم لقيمة، و = واحدة للتخزين. الأنواع الأساسية: int و float و str و bool، والنوع يحدد معنى العملية: \"3\" * 4 تعطي 3333 وليس 12." },

    { t: "h", text: "Day 3 reminder: input and math" },
    { t: "p", html: "<p><code>input()</code> waits for the user and <b>always</b> returns text, even if they type a number. To calculate, convert it first with <code>int()</code> or <code>float()</code>. Besides <code>+ - * /</code>, remember <code>//</code> (whole-number division) and <code>%</code> (the remainder) — perfect for splitting things into groups, like minutes into hours.</p>" },
    { t: "code", code: c`minutes = int(input("Minutes: "))
hours = minutes // 60
rest = minutes % 60
print(hours, "h", rest, "min")
print(minutes / 60)`, stdin: "135", before: "<p>Run it with <code>135</code>, then try <code>60</code> and <code>59</code>.</p>", note: "<p>Line by line with 135:</p><ul><li><code>int(input(...))</code> turns the text <code>\"135\"</code> into the number 135. Without <code>int()</code>, the math would crash.</li><li><code>135 // 60</code> → <code>2</code> full hours.</li><li><code>135 % 60</code> → <code>15</code>, the minutes left over.</li><li><code>/</code> always gives a float → <code>2.25</code>.</li></ul><p>Your calculator project will offer all these operators.</p>" },
    { t: "ar", html: "input ترجع نصًا دائمًا، فحوّل{{g:|ي}}ه بـ int أو float قبل الحساب. و // تعطي ناتج القسمة الصحيح، و % تعطي الباقي، و / تعطي عددًا عشريًا دائمًا." },

    { t: "h", text: "Day 4 reminder: strings and f-strings" },
    { t: "p", html: "<p>A string is a sequence of characters, numbered from <b>0</b>. You can take one character (<code>s[0]</code>), a slice (<code>s[1:3]</code>), or use methods like <code>.strip()</code>, <code>.upper()</code> and <code>.title()</code>, which always return a <b>new</b> string. f-strings put values into text neatly — you will use one to print every calculator result.</p>" },
    { t: "code", code: c`op = "  *  "
city = "Riyadh"
print("[" + op.strip() + "]")
print(city[1:3], city[-1], city.upper()[::-1])
print(f"Total: {7 / 2:.2f} SAR")`, before: "<p>Three tools you will need in the project: cleaning input, slicing, and formatting numbers.</p>", note: "<p>Line by line:</p><ul><li><code>op.strip()</code> removes the spaces around the operator → <code>[*]</code>. In the calculator, users may type spaces by accident.</li><li><code>city[1:3]</code> → <code>iy</code> (indexes 1 and 2), <code>city[-1]</code> → <code>h</code>, and <code>city.upper()[::-1]</code> → <code>HDAYIR</code>.</li><li><code>{7 / 2:.2f}</code> calculates 3.5 and shows it with two decimals → <code>Total: 3.50 SAR</code>.</li></ul>" },
    { t: "ar", html: "العد في النص يبدأ من صفر، والقص لا يشمل رقم النهاية، ودوال النص ترجع نصًا جديدًا. و strip مفيدة لتنظيف المدخلات، و f-string مع .2f لطباعة الأرقام بشكل مرتب." },

    { t: "h", text: "Day 5 reminder: decisions" },
    { t: "p", html: "<p><code>if</code>, <code>elif</code> and <code>else</code> let a program choose. Python checks the conditions from top to bottom and runs only the <b>first</b> True branch, so the order matters. <code>==</code> asks \"equal?\", <code>and</code>/<code>or</code>/<code>not</code> combine questions, and indentation shows which lines belong to which branch. Your calculator uses a chain like this to pick the operation.</p>" },
    { t: "code", code: c`op = "/"
b = 0
if op == "/" and b == 0:
    print("Cannot divide by zero")
elif op == "/":
    print("Dividing...")
else:
    print("Another operator")`, before: "<p>Run it, then change <code>b</code> to <code>5</code>, and then <code>op</code> to <code>\"+\"</code>.</p>", note: "<p>Line by line:</p><ul><li>With <code>op = \"/\"</code> and <code>b = 0</code>, both parts of the <code>and</code> are True → <code>Cannot divide by zero</code>, and the chain stops.</li><li>With <code>b = 5</code>, the first condition is False, the <code>elif</code> is True → <code>Dividing...</code>.</li><li>With <code>\"+\"</code>, both are False → the <code>else</code> runs.</li></ul><p>The special case (zero) is checked <b>before</b> the normal case. Exactly this idea protects your calculator v2 from crashing.</p>" },
    { t: "ar", html: "بايثون يفحص الشروط من الأعلى للأسفل وينفذ أول شرط صحيح فقط. لذلك ضع{{g:|ي}} الحالة الخاصة (مثل القسمة على صفر) قبل الحالة العادية." },

    { t: "h", text: "Project plan: the Smart Calculator" },
    { t: "p", html: "<p>The calculator is built in <b>three versions</b> (the exercises v1, v2, v3). Each version must work and pass its tests <b>before</b> you start the next. Here is the plan, step by step.</p><ol><li><b>v1 — the basics.</b> Read a number, an operator and another number. Choose the calculation with an <code>if/elif</code> chain on the operator, store it in <code>result</code>, and print once at the end.</li><li><b>v2 — no crashes.</b> Add <b>guards</b> before the calculation: clean the operator with <code>.strip()</code>, catch division by zero, and reject unknown operators.</li><li><b>v3 — power tools.</b> Add <code>//</code>, <code>%</code> and <code>**</code>, and extend the zero check to <code>//</code> and <code>%</code>.</li></ol>" },
    { t: "code", code: c`a = float(input())
op = input()
b = float(input())
print(f"a={a:g} op=[{op}] b={b:g}")`, stdin: "12\n+\n5", before: "<p><b>Step 1 of v1:</b> before any calculation, only read the three inputs and print them back. Run it, then try <code>2.5</code> as the first number.</p>", note: "<p>Why start like this? If the inputs are read wrongly, every later step is wrong too, so we check them first.</p><ul><li><code>float()</code> accepts both <code>12</code> and <code>2.5</code>.</li><li>The format <code>:g</code> removes useless zeros: <code>12.0</code> shows as <code>12</code>, but <code>2.5</code> stays <code>2.5</code>. The exercises expect exactly this.</li><li>The brackets around <code>{op}</code> make hidden spaces visible — useful later for v2.</li></ul><p>Once this prints what you expect, add the <code>if/elif</code> chain that computes <code>result</code>, and replace this print with the final one.</p>" },
    { t: "p", html: "<p><b>How the pieces connect:</b> the inputs (Day 3) feed a decision chain (Day 5) that stores one <code>result</code>; one f-string print (Day 4) shows it. Keeping a single print at the end means you change the output format in only one place. In v2, the guards go <b>in front of</b> this chain: check the problems first, and do the normal calculation in the last branch.</p>" },
    { t: "table", head: ["Version", "Test input", "Expected output", "What it checks"], rows: [["v1", "`12`, `+`, `5`", "`12 + 5 = 17`", "basic chain and `:g`"], ["v1", "`9`, `/`, `2`", "`9 / 2 = 4.5`", "decimals stay"], ["v2", "`8`, `/`, `0`", "`Cannot divide by zero`", "the zero guard"], ["v2", "`8`, `^`, `2`", "`Unknown operator: ^`", "unknown operators"], ["v2", "`6`, ` * `, `7`", "`6 * 7 = 42`", "`.strip()` on the operator"], ["v3", "`5`, `%`, `0`", "`Cannot divide by zero`", "zero guard for `%`"]] },
    { t: "ar", html: "ابنِ{{g:|ي}} الحاسبة على ثلاث مراحل، ولا تنتقل{{g:|ي}} للمرحلة التالية قبل أن تنجح الحالية في كل الاختبارات. ابدأ{{g:|ي}} بقراءة المدخلات وطباعتها للتأكد منها، ثم سلسلة if/elif، ثم أضف{{g:|ي}} الحمايات (القسمة على صفر والعامل غير المعروف) قبل الحساب." },

    { t: "h", text: "The other programs: guessing game and taxi fare" },
    { t: "p", html: "<p>The same method works for the remaining exercises.</p><ul><li><b>Guess my number:</b> list the four possible answers first, then put the <b>widest problem</b> (out of range) at the top of the chain, followed by correct, too low and too high. Test 0, 1, 7, 10 and 11 — the boundaries.</li><li><b>Taxi fare:</b> the plan has three steps in a fixed order: the basic fare, then the night increase, then the minimum fare. These are <b>separate</b> <code>if</code> statements, not one chain, because each rule may apply on top of the previous one.</li></ul>" },
    { t: "code", code: c`fare = 10 + 2.1 * 1
print(f"basic: {fare:.2f}")
if fare < 15:
    fare = 15
print(f"after minimum: {fare:.2f}")`, before: "<p>A piece of the taxi plan for a 1 km day trip. Run it and watch how the minimum rule changes the fare.</p>", note: "<p>Line by line:</p><ul><li>Line 1 computes the basic fare: <code>10 + 2.1</code> → <code>12.10</code>.</li><li>Line 3 asks whether that is below the minimum. It is, so line 4 replaces it with 15.</li><li>The last line shows <code>15.00</code>.</li></ul><p>Printing the value after each step, like here, is a simple way to test a plan piece by piece. Remove the extra prints once everything works.</p>" },
    { t: "ar", html: "في لعبة التخمين ضع{{g:|ي}} شرط خارج النطاق أولًا. وفي حاسبة التاكسي اتبع{{g:|ي}} الترتيب: الأجرة الأساسية، ثم زيادة الليل، ثم الحد الأدنى، بجمل if منفصلة. واطبع{{g:|ي}} القيم بعد كل خطوة لتختبر{{g:|ي}} خطتك." },
  ],
  tricks: [
    { title: "Format numbers nicely with :g", html: "<code>:g</code> removes useless zeros: <code>f\"{12.0:g}\"</code> → <code>12</code>, <code>f\"{2.5:g}\"</code> → <code>2.5</code>. Handy for calculators.", code: c`print(f"{12.0:g} {2.50:g} {1/3:g}")` },
    { title: "Build big programs as small milestones", html: "Each project below is split into versions. Get v1 working and tested <b>before</b> starting v2. This is how real software is built." },
  ],
  practice: [
    { t: "predict", code: c`name = "py30"
n = len(name) * 2
if n > 6:
    print(name.upper()[::-1])
else:
    print(name)`, explain: "<code>len(\"py30\")</code> is 4, times 2 is 8, which is &gt; 6. Uppercase <code>PY30</code> reversed → <code>03YP</code>." },
    { t: "predict", code: c`a = "3"
b = 4
print(a * b, int(a) * b, str(b) + a)`, explain: "<code>\"3\" * 4</code> → <code>3333</code>. <code>3 * 4</code> → <code>12</code>. <code>\"4\" + \"3\"</code> → <code>43</code>. Types decide everything!" },
    { t: "parsons", title: "From plan to code", prompt: "The plan: <i>read a price; if it is over 100 take 10% off; print the final price with 2 decimals.</i> Arrange the code.", lines: ["price = float(input())", "if price > 100:", "    price = price * 0.9", c`print(f"{price:.2f}")`], distractors: ["    price = price - 10", c`print("{price:.2f}")`], explain: "10% off means multiply by 0.9 (not minus 10 riyals), and an f-string needs its <code>f</code>." },
    { t: "try", title: "Plan it yourself", html: "<p>Problem: a gym charges 150 SAR a month, or 1500 SAR for a full year. Read the number of months someone plans to go and print which option is cheaper and by how much. First write your plan as comments, then the code.</p>", code: c`# 1. read the months
# 2. ...
` },
  ],
  exercises: [
    { id: "calc1", lvl: "seed", title: "Smart Calculator v1 — the basics", prompt: "<p>Read a number, an operator (<code>+</code>, <code>-</code>, <code>*</code> or <code>/</code>) and another number — three lines. Print the calculation like this:</p><pre class=\"code-static\">Input: 12, +, 5\nOutput: 12 + 5 = 17</pre><p>Read the numbers with <code>float()</code> and print them with the <code>:g</code> format so <code>12.0</code> shows as <code>12</code>.</p>", tests: [{ stdin: "12\n+\n5", expected: "12 + 5 = 17" }, { stdin: "7\n-\n10", expected: "7 - 10 = -3" }, { stdin: "2.5\n*\n4", expected: "2.5 * 4 = 10" }, { stdin: "9\n/\n2", expected: "9 / 2 = 4.5" }],
      hint: "An if/elif chain on the operator decides which calculation to do. Then one print at the end: <code>f\"{a:g} {op} {b:g} = {result:g}\"</code>.", ar: "خزّن{{g:|ي}} النتيجة في متغير result داخل كل فرع، ثم اطبع{{g:|ي}} مرة واحدة في النهاية.",
      solutions: [{ name: "elif chain", code: c`a = float(input())
op = input()
b = float(input())
if op == "+":
    result = a + b
elif op == "-":
    result = a - b
elif op == "*":
    result = a * b
else:
    result = a / b
print(f"{a:g} {op} {b:g} = {result:g}")`, note: "One print at the end means you change the format in only one place." }] },
    { id: "calc2", lvl: "star", title: "Smart Calculator v2 — no crashes", prompt: "<p>Improve v1 so it never crashes:</p><ul><li>Dividing by zero prints <code>Cannot divide by zero</code></li><li>Any other operator prints <code>Unknown operator: X</code> (with the operator)</li><li>Spaces around the operator are ignored</li></ul>", tests: [{ stdin: "12\n+\n5", expected: "12 + 5 = 17" }, { stdin: "8\n/\n0", expected: "Cannot divide by zero" }, { stdin: "8\n^\n2", expected: "Unknown operator: ^" }, { stdin: "6\n * \n7", expected: "6 * 7 = 42" }],
      hint: "Use <code>op = input().strip()</code>. Check the division case: <code>elif op == \"/\" and b == 0</code> must come <b>before</b> the normal division.",
      solutions: [{ name: "Guards first", code: c`a = float(input())
op = input().strip()
b = float(input())
if op not in ("+", "-", "*", "/"):
    print("Unknown operator:", op)
elif op == "/" and b == 0:
    print("Cannot divide by zero")
else:
    if op == "+":
        result = a + b
    elif op == "-":
        result = a - b
    elif op == "*":
        result = a * b
    else:
        result = a / b
    print(f"{a:g} {op} {b:g} = {result:g}")`, note: "The problems are handled first; the normal calculation lives in the last branch." },
        { name: "One flat chain", code: c`a = float(input())
op = input().strip()
b = float(input())
result = None
if op == "+":
    result = a + b
elif op == "-":
    result = a - b
elif op == "*":
    result = a * b
elif op == "/" and b == 0:
    print("Cannot divide by zero")
elif op == "/":
    result = a / b
else:
    print("Unknown operator:", op)
if result is not None:
    print(f"{a:g} {op} {b:g} = {result:g}")`, note: "<code>None</code> means \"no value yet\". We only print the calculation if a result was produced." }] },
    { id: "calc3", lvl: "star", title: "Smart Calculator v3 — power tools", prompt: "<p>Add three operators to v2: <code>//</code> (floor division), <code>%</code> (remainder) and <code>**</code> (power). Division by zero must also be caught for <code>//</code> and <code>%</code>.</p>", tests: [{ stdin: "17\n//\n5", expected: "17 // 5 = 3" }, { stdin: "17\n%\n5", expected: "17 % 5 = 2" }, { stdin: "2\n**\n10", expected: "2 ** 10 = 1024" }, { stdin: "5\n%\n0", expected: "Cannot divide by zero" }, { stdin: "3\nx\n3", expected: "Unknown operator: x" }, { stdin: "1\n-\n4", expected: "1 - 4 = -3" }],
      hint: "<code>op in (\"/\", \"//\", \"%\") and b == 0</code> catches all three at once.",
      solutions: [{ name: "Extended guards", code: c`a = float(input())
op = input().strip()
b = float(input())
if op not in ("+", "-", "*", "/", "//", "%", "**"):
    print("Unknown operator:", op)
elif op in ("/", "//", "%") and b == 0:
    print("Cannot divide by zero")
else:
    if op == "+":
        result = a + b
    elif op == "-":
        result = a - b
    elif op == "*":
        result = a * b
    elif op == "/":
        result = a / b
    elif op == "//":
        result = a // b
    elif op == "%":
        result = a % b
    else:
        result = a ** b
    print(f"{a:g} {op} {b:g} = {result:g}")` }],
      twist: "In Week 3 you will rebuild this with functions and a dictionary, and the whole if/elif chain will shrink to a few lines. Save this version to compare!" },
    { id: "guess", lvl: "fire", title: "Guess my number (one shot)", prompt: "<p>The secret number is <code>7</code>. Read a guess and print:</p><ul><li><code>Out of range</code> if it is not between 1 and 10</li><li><code>Correct!</code> if it equals the secret</li><li><code>Too low</code> or <code>Too high</code> otherwise</li></ul>", starter: "secret = 7\n", tests: [{ stdin: "7", expected: "Correct!" }, { stdin: "3", expected: "Too low" }, { stdin: "9", expected: "Too high" }, { stdin: "15", expected: "Out of range" }, { stdin: "0", expected: "Out of range" }],
      solutions: [{ name: "Range first", code: c`secret = 7
guess = int(input())
if guess < 1 or guess > 10:
    print("Out of range")
elif guess == secret:
    print("Correct!")
elif guess < secret:
    print("Too low")
else:
    print("Too high")` }, { name: "Chained comparison", code: c`secret = 7
guess = int(input())
if not 1 <= guess <= 10:
    print("Out of range")
elif guess == secret:
    print("Correct!")
else:
    print("Too low" if guess < secret else "Too high")` }],
      twist: "Make it a real game in the Playground: <code>import random</code> and <code>secret = random.randint(1, 10)</code>. Next week you will add a loop so the player can guess until they win!" },
    { id: "taxi", lvl: "fire", title: "Taxi fare", prompt: "<p>A taxi app in Riyadh calculates: 10 SAR start fee + 2.1 SAR per km. Trips starting at night (hour 22 or later, or before 6) cost 20% more. The minimum fare is 15 SAR (applied at the end). Read the distance (km, can be decimal) and the start hour (0–23) and print:</p><pre class=\"code-static\">Input: 7 then 23\nOutput: Fare: 29.64 SAR</pre>", tests: [{ stdin: "7\n23", expected: "Fare: 29.64 SAR" }, { stdin: "7\n14", expected: "Fare: 24.70 SAR" }, { stdin: "1\n10", expected: "Fare: 15.00 SAR" }, { stdin: "2\n3", expected: "Fare: 17.04 SAR" }],
      hint: "Step 1: fare = 10 + 2.1 × km. Step 2: if night, multiply by 1.2. Step 3: if the fare is below 15, make it 15. Night: <code>hour &gt;= 22 or hour &lt; 6</code>.", ar: "اتبع{{g:|ي}} الخطوات بالترتيب: الحساب الأساسي، ثم زيادة الليل، ثم الحد الأدنى في النهاية.",
      solutions: [{ name: "Step by step", code: c`km = float(input())
hour = int(input())
fare = 10 + 2.1 * km
if hour >= 22 or hour < 6:
    fare = fare * 1.2
if fare < 15:
    fare = 15
print(f"Fare: {fare:.2f} SAR")` }, { name: "Using max()", code: c`km = float(input())
hour = int(input())
night = hour >= 22 or hour < 6
fare = (10 + 2.1 * km) * (1.2 if night else 1)
fare = max(fare, 15)
print(f"Fare: {fare:.2f} SAR")`, note: "<code>max(fare, 15)</code> is a neat way to apply a minimum. A boolean variable <code>night</code> gives the condition a readable name." }] },
    { id: "hunt", lvl: "fire", debug: true, title: "Week 1 bug hunt", prompt: "<p>This program has <b>four</b> bugs from four different days. For the inputs <code>sara</code> and <code>2006</code> it must print:</p><pre class=\"code-static\">Hello, Sara!\nYou are 20 in 2026.\nAdult: True</pre>", starter: c`name = input()
year = input()
age = 2026 - year
print("Hello, {name.title()}!")
print(f"You are {age} in 2026.)
if age > 18
    print("Adult:", True)
else:
    print("Adult:", False)`, tests: [{ stdin: "sara\n2006", expected: "Hello, Sara!\nYou are 20 in 2026.\nAdult: True" }, { stdin: "omar\n2012", expected: "Hello, Omar!\nYou are 14 in 2026.\nAdult: False" }],
      ar: "الأخطاء: تحويل نوع، حرف f ناقص، علامة تنصيص ناقصة، ونقطتان ناقصة.",
      solutions: [{ name: "Fixed", code: c`name = input()
year = int(input())
age = 2026 - year
print(f"Hello, {name.title()}!")
print(f"You are {age} in 2026.")
if age > 18:
    print("Adult:", True)
else:
    print("Adult:", False)` }, { name: "Fixed and simplified", code: c`name = input()
year = int(input())
age = 2026 - year
print(f"Hello, {name.title()}!")
print(f"You are {age} in 2026.")
print("Adult:", age > 18)`, note: "The comparison <code>age &gt; 18</code> is already True or False — the whole if/else was unnecessary." }] },
  ],
  quiz: [
    { q: "What does `print(\"5\" * 2 + \"1\")` show?", o: ["`11`", "`551`", "`101`", "An error"], a: 1, e: "`\"5\" * 2` is `\"55\"`, then `+ \"1\"` glues." },
    { q: "What is `\"Riyadh\"[1:3]`?", o: ["`Ri`", "`iy`", "`iya`", "`Riy`"], a: 1, e: "Indexes 1 and 2." },
    { q: "`x = input()` and the user types `4`. Which line crashes?", o: ["`print(x * 2)`", "`print(x + \"2\")`", "`print(x + 2)`", "`print(int(x) + 2)`"], a: 2, e: "`str + int` is a TypeError." },
    { q: "What is `round(7 / 2)`?", o: ["`3`", "`3.5`", "`4`", "`4.0`"], a: 2, e: "7 / 2 = 3.5, and `round(3.5)` gives 4. (Python rounds .5 to the nearest even number: `round(2.5)` is 2!)" },
    { q: "What does this print?", code: c`t = 25
if t > 30:
    print("hot")
elif t > 20:
    print("warm")
elif t > 10:
    print("cool")`, o: ["`hot`", "`warm`", "`warm` and `cool`", "`cool`"], a: 1, e: "The first True branch wins; the rest are skipped." },
    { q: "Which prints `Price: 5.00`?", o: ["`print(\"Price:\", 5)`", "`print(f\"Price: {5:.2f}\")`", "`print(\"Price: \" + 5.00)`", "`print(f\"Price: {5.00}\")`"], a: 1, e: "Only the `.2f` format guarantees two decimals." },
    { q: "Step 2 of the problem-solving method is…", o: ["Write the code", "Solve examples by hand", "Search the internet", "Draw a diagram"], a: 1, e: "Understand → examples → plan → code small → test." },
    { q: "`17 // 5 * 5 + 17 % 5` equals…", o: ["`15`", "`17`", "`2`", "`20`"], a: 1, e: "3 × 5 + 2 = 17." },
  ],
  puzzle: { title: "The locker code", q: "<p>A locker code is a 3-digit number. Its digits add up to <b>13</b>. The first digit is <b>twice</b> the last digit. The middle digit is the last digit <b>plus 1</b>. What is the code?</p>", answers: ["643"], hint: "Call the last digit x. Then the first digit is 2x and the middle is x + 1. Write one equation from the sum rule.", ar: "سمِّ{{g:|ي}} الرقم الأخير x، فيكون الأول 2x والأوسط x + 1، ومجموعها 13.", e: "2x + (x + 1) + x = 13 → 4x + 1 = 13 → x = 3. So the digits are 6, 4, 3: the code is <code>643</code>. Check: 6 + 4 + 3 = 13 ✓, 6 = 2 × 3 ✓, 4 = 3 + 1 ✓. Checking every rule at the end is exactly what testing is in programming. Next week, with loops, you will be able to make Python try all 1000 codes for you!" },
  cards: [
    { f: "The 5 problem-solving steps", b: "Understand, examples by hand, plan (pseudocode), code in small pieces, test and improve." },
    { f: "How to avoid a crash when dividing?", b: "Check first: `if b == 0: ...` before `a / b`." },
    { f: "What does `:g` do in an f-string?", b: "Removes useless zeros: `12.0` → `12`." },
    { f: "Apply a minimum value `15` to `fare`", b: "`fare = max(fare, 15)`" },
  ],
};
})();

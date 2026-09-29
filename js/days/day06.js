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
    { t: "ar", html: "لا تبدأ{{g:|ي}} بكتابة الكود مباشرة! افهم{{g:|ي}} المطلوب، حل{{g:|ي}} مثالين بيدك، اكتب{{g:|ي}} الخطوات بالكلام، ثم اكتب{{g:|ي}} الكود على أجزاء صغيرة وجرّب{{g:|ي}} بعد كل جزء." },
    { t: "h", text: "Worked example: delivery fee" },
    { t: "p", html: "<p><b>Problem:</b> A delivery app charges 7 SAR for the first 3 km and 1.5 SAR for each extra km. Orders of 100 SAR or more get free delivery. Read the order total and the distance; print the fee.</p><p><b>1. Understand</b> — inputs: order total, distance. Output: the fee.<br><b>2. Examples</b> — total 50, 2 km → 7. Total 50, 5 km → 7 + 2 × 1.5 = 10. Total 120, 9 km → 0.<br><b>3. Plan:</b></p>" },
    { t: "static", code: c`read total and distance
if total >= 100: fee is 0
else if distance <= 3: fee is 7
else: fee is 7 + (distance - 3) * 1.5
print fee` },
    { t: "code", title: "4. Code — then test with the hand examples", code: c`total = float(input("Order total: "))
distance = float(input("Distance (km): "))
if total >= 100:
    fee = 0
elif distance <= 3:
    fee = 7
else:
    fee = 7 + (distance - 3) * 1.5
print(f"Delivery fee: {fee:.2f} SAR")`, stdin: "50\n5" },
    { t: "h", text: "Week 1 in one table" },
    { t: "table", head: ["Day", "Idea", "Remember"], rows: [["1", "`print`, comments", "text in quotes, `sep`, `end`, `\\n`"], ["2", "variables, types", "`=` stores; `int` `float` `str` `bool`"], ["3", "input, math", "`input()` gives `str` → `int()`/`float()`; `//` `%`"], ["4", "strings", "index from 0, slices, methods, f-strings"], ["5", "decisions", "`==`, `if/elif/else`, `and/or/not`, indentation"]] },
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

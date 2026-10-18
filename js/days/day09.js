window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[9] = {
  title: "for loops and range",
  intro: "<code>while</code> repeats until something happens. <code>for</code> repeats <b>for each</b> item: each number in a range, each letter in a word, each student in a list. It is the loop you will use most often in Python.",
  introAr: "حلقة for تمر على كل عنصر: كل رقم في مدى، أو كل حرف في نص. ونتعلم range والحلقات المتداخلة لرسم الأشكال وجداول الضرب.",
  goals: ["Loop over numbers with `range(start, stop, step)`", "Loop over the characters of a string", "Count, sum and find with loops", "Nest loops to draw patterns and tables", "Choose between `for` and `while`"],
  learn: [
    { t: "h", text: "Why another loop?" },
    { t: "p", html: "<p>Yesterday's <code>while</code> loop repeats <b>until something happens</b>. But very often you already know exactly what to go through: every letter of a word, every number from 1 to 10, every mark in a class. With <code>while</code> you had to manage a counter yourself: start it, check it, update it, and never forget the update. The <code>for</code> loop does all of that for you. You just say <i>\"for each item in this group, do this\"</i>.</p>" },
    { t: "analogy", title: "Handing out exam papers", html: "<p>A teacher walks along the row and gives a paper <b>to each student</b>. She doesn't ask \"is there still someone?\" before every step and she doesn't count on her fingers: she simply goes from the first student to the last, and stops when the row ends. That is a <code>for</code> loop: it visits <b>each item once</b>, in order, and stops by itself.</p>" },
    { t: "ar", html: "حلقة for تمر على كل عنصر في مجموعة مرة واحدة بالترتيب، وتتوقف وحدها عند آخر عنصر. لا تحتاج{{g:|ين}} عدّادًا ولا تحديثًا كما في while، لذلك لا يوجد خطر الحلقة اللانهائية." },

    { t: "h", text: "for each letter in a string" },
    { t: "p", html: "<p>The shape is: <code>for</code>, a <b>name</b> you choose (the loop variable), the word <code>in</code>, the group to go through, and a colon. The indented block runs once <b>for each item</b>, and each time the loop variable holds the current item. A string is a group of characters, so a <code>for</code> loop can visit them one by one.</p>" },
    { t: "viz", code: c`for letter in "Py30":
    print(letter)
print("done")`, before: "<p>Press Visualize and click Next ▶. Watch the value of <code>letter</code> change in each round.</p>", note: "<p>Line by line:</p><ul><li>Round 1: Python puts the first character, <code>\"P\"</code>, into <code>letter</code> and runs line 2, which prints <code>P</code>.</li><li>Round 2: <code>letter</code> becomes <code>\"y\"</code>. Round 3: <code>\"3\"</code>. Round 4: <code>\"0\"</code>.</li><li>There are no more characters, so the loop ends by itself and line 3 prints <code>done</code> once.</li></ul><p>There is no counter, no condition and no update to write: Python moves to the next item for you. The name <code>letter</code> is your choice; <code>ch</code> or <code>c</code> would work the same. Note that the <code>in</code> here means \"go through\", which is different from the <code>in</code> you met on Day 4 that asks \"is it inside?\".</p>" },
    { t: "ar", html: "في for letter in \"Py30\" يأخذ المتغير letter حرفًا واحدًا في كل دورة بالترتيب. اسم المتغير من اختيارك، ولا تنس{{g:|ي}} النقطتين : والإزاحة." },

    { t: "h", text: "range: a sequence of numbers" },
    { t: "p", html: "<p>To repeat something a certain number of times, or to go through numbers, use <code>range()</code>. It produces a sequence of whole numbers that a <code>for</code> loop can walk through. It has three forms; we will see them one at a time.</p>" },
    { t: "code", code: c`for i in range(5):
    print("Round", i)`, before: "<p><b>One number</b>: <code>range(stop)</code>. Run it and look at the first and the last number carefully.</p>", note: "<p>Line by line:</p><ul><li><code>range(5)</code> gives the numbers <code>0, 1, 2, 3, 4</code>: it <b>starts at 0</b> and gives <b>5 numbers</b>.</li><li>The loop variable <code>i</code> takes each of them in turn, so line 2 runs 5 times.</li></ul><p>The number 5 itself is <b>not</b> included. This feels strange at first, but it is very handy: <code>range(5)</code> repeats exactly 5 times, <code>range(10)</code> exactly 10 times. When you just want \"do this N times\", write <code>for i in range(N):</code>.</p>" },
    { t: "code", code: c`for i in range(1, 6):
    print(i, end=" ")
print()
print("finished")`, before: "<p><b>Two numbers</b>: <code>range(start, stop)</code>. We also use <code>end=\" \"</code> from Day 1 to keep the numbers on one line.</p>", note: "<p>Line by line:</p><ul><li><code>range(1, 6)</code> starts at <b>1</b> and stops <b>before</b> 6: <code>1 2 3 4 5</code>.</li><li><code>print(i, end=\" \")</code> ends with a space instead of a new line, so all numbers appear on the same line.</li><li>The empty <code>print()</code> after the loop just moves to a new line, so <code>finished</code> starts on its own line.</li></ul><p>The golden rule: <b>the stop is never included</b>. To count from 1 to <code>n</code>, write <code>range(1, n + 1)</code>.</p>" },
    { t: "code", code: c`for i in range(0, 21, 5):
    print(i, end=" ")
print()
for i in range(10, 0, -2):
    print(i, end=" ")`, before: "<p><b>Three numbers</b>: <code>range(start, stop, step)</code>. The step is the size of each jump. Try changing 5 to 4.</p>", note: "<p>Line by line:</p><ul><li><code>range(0, 21, 5)</code> starts at 0 and jumps by 5: <code>0 5 10 15 20</code>. The next would be 25, which is past the stop.</li><li>We wrote 21, not 20, so that 20 is included (the stop is never included).</li><li><code>range(10, 0, -2)</code> has a <b>negative step</b>, so it counts <b>down</b>: <code>10 8 6 4 2</code>. It stops <b>before</b> 0, so 0 is not printed.</li></ul><p>When counting down, the start must be bigger than the stop. <code>range(1, 10, -1)</code> gives nothing at all, because you can't go down from 1 to 10.</p>" },
    { t: "table", head: ["Call", "Numbers", "Remember"], rows: [["`range(5)`", "0 1 2 3 4", "starts at 0, 5 numbers"], ["`range(1, 6)`", "1 2 3 4 5", "stop is not included"], ["`range(0, 21, 5)`", "0 5 10 15 20", "step = jump size"], ["`range(10, 0, -2)`", "10 8 6 4 2", "negative step counts down"]] },
    { t: "tip", title: "Seeing a whole range at once", html: "<p>A range does not print its numbers by itself: <code>print(range(5))</code> just shows <code>range(0, 5)</code>. To see them all, wrap it in <code>list()</code>: <code>print(list(range(3, 8)))</code> shows <code>[3, 4, 5, 6, 7]</code>. You will learn about lists properly next week; for now it is a handy way to check a range.</p>" },
    { t: "ar", html: "range(a, b) يبدأ من a وينتهي <b>قبل</b> b، لذلك للعد من 1 إلى n نكتب range(1, n + 1). والرقم الثالث هو مقدار القفزة، وإذا كان سالبًا فالعد تنازلي." },
    { t: "predict", code: c`for i in range(2, 11, 3):
    print(i, end=" ")`, explain: "Start at 2 and jump by 3: 2, 5, 8. The next would be 11, but the stop (11) is never included. Output: <code>2 5 8</code>." },

    { t: "h", text: "Counting with a for loop" },
    { t: "p", html: "<p>The <b>counter</b> from yesterday works the same inside a <code>for</code> loop: start at 0 <b>before</b> the loop, add 1 inside an <code>if</code> when you find what you are looking for. The difference is that you no longer need a second counter just to move forward: the <code>for</code> does that.</p>" },
    { t: "code", code: c`word = "information systems"
vowels = 0
for ch in word:
    if ch in "aeiou":
        vowels += 1
print("Vowels:", vowels)`, before: "<p>Count the vowels in a word. Run it, then put your own name or major in <code>word</code>.</p>", note: "<p>Line by line:</p><ul><li><code>vowels = 0</code>: the counter starts before the loop.</li><li><code>for ch in word:</code> visits all 19 characters, including the space.</li><li><code>ch in \"aeiou\"</code> is the Day 4 membership question: is this character one of the five vowels? For <code>i</code>, <code>o</code>, <code>a</code>… it is True and the counter grows.</li><li>The <code>print</code> is not indented, so it runs once, after all characters were checked: <code>Vowels: 6</code>.</li></ul><p>Two different <code>in</code>s in one program: in the <code>for</code> line it means <b>go through</b>, in the <code>if</code> it means <b>is inside</b>.</p>" },
    { t: "ar", html: "العدّاد يبدأ بصفر قبل الحلقة ويزيد داخل if. وكلمة in في سطر for تعني \"مرّ على\"، أما في if فتعني \"هل هو موجود داخل؟\"." },

    { t: "h", text: "Checking what kind of character it is" },
    { t: "p", html: "<p>When you go through a text letter by letter, you often want to know <b>what kind</b> of character you have. Strings have two methods for that (methods are called with a dot, like <code>.upper()</code> on Day 4). Both answer with <code>True</code> or <code>False</code>:</p><ul><li><code>ch.isalpha()</code>: is it a <b>letter</b>?</li><li><code>ch.isdigit()</code>: is it a <b>digit</b> 0–9?</li></ul>" },
    { t: "code", code: c`for ch in "A7 b":
    print(repr(ch), ch.isalpha(), ch.isdigit())`, before: "<p>Run it and read the table it prints: one line per character, with the two answers.</p>", note: "<p>Line by line:</p><ul><li><code>repr(ch)</code> prints the character with quotes around it, so that you can <b>see</b> the space: <code>' '</code>. It is only here to make the output clear.</li><li><code>'A'</code>: a letter → <code>True False</code>.</li><li><code>'7'</code>: a digit → <code>False True</code>.</li><li><code>' '</code>: a space is neither → <code>False False</code>.</li><li><code>'b'</code>: a letter → <code>True False</code>. Small and capital letters both count.</li></ul><p>Since the answers are booleans, they fit directly in an <code>if</code>: <code>if ch.isdigit():</code>. To check for a space, compare: <code>ch == \" \"</code>.</p>" },
    { t: "ar", html: "ch.isalpha() تسأل: هل الحرف حرف أبجدي؟ و ch.isdigit() تسأل: هل هو رقم؟ والجواب True أو False. المسافة ليست حرفًا ولا رقمًا، ونفحصها بـ ch == \" \"." },

    { t: "h", text: "Running totals and products" },
    { t: "p", html: "<p>The <b>accumulator</b> also works with <code>for</code>. With <code>range</code>, you get the numbers for free, so a sum becomes very short. But be careful about the <b>starting value</b>: it depends on what you do with the accumulator.</p>" },
    { t: "code", code: c`total = 0
for n in range(1, 11):
    total += n * n
print("Sum of squares 1..10:", total)`, before: "<p>Add up 1×1 + 2×2 + … + 10×10. Run it, then change it to add the numbers themselves (<code>total += n</code>): you should get 55.</p>", note: "<p>Line by line:</p><ul><li><code>total = 0</code>: an empty accumulator before the loop.</li><li><code>range(1, 11)</code> gives 1 to 10 (11 is not included).</li><li>Each round adds the square of <code>n</code>: 1, then 1+4 = 5, then 5+9 = 14, and so on.</li><li>After the last round the total is <code>385</code>, printed once.</li></ul><p>Compare with yesterday's while version: no <code>n = 1</code> before the loop and no <code>n += 1</code> inside. The <code>for</code> handles the counting.</p>" },
    { t: "code", code: c`n = 5
result = 1
for i in range(1, n + 1):
    result *= i
print(n, "! =", result)`, before: "<p>Now we <b>multiply</b> instead of adding: 5! (\"5 factorial\") is 1 × 2 × 3 × 4 × 5. Run it, then change <code>result = 1</code> to <code>result = 0</code> and see what goes wrong.</p>", note: "<p>Line by line:</p><ul><li><code>result = 1</code>: a product must start at <b>1</b>, because multiplying by 1 changes nothing.</li><li><code>range(1, n + 1)</code> gives 1, 2, 3, 4, 5.</li><li><code>result *= i</code> means <code>result = result * i</code> (Day 2). The value goes 1 → 2 → 6 → 24 → 120.</li><li>Output: <code>5 ! = 120</code>.</li></ul><p>If you start at 0, every multiplication gives 0 and the answer is always 0. Rule: <b>sums start at 0, products start at 1</b>. Also try <code>n = 0</code>: the range is empty, the loop runs zero times, and the result stays 1, which is correct, because 0! is defined as 1.</p>" },
    { t: "ar", html: "المجموع يبدأ بصفر، وحاصل الضرب يبدأ بواحد، لأن أي رقم × 0 = 0. وإذا كان range فارغًا فإن الحلقة لا تُنفذ ولا مرة وتبقى القيمة الأولى كما هي." },
    { t: "predict", code: c`total = 0
for n in range(4):
    total += n
    print(total)`, explain: "Here the <code>print</code> is <b>inside</b> the loop, so it shows the running total after every round. <code>range(4)</code> is 0, 1, 2, 3, so the output is <code>0</code>, <code>1</code>, <code>3</code>, <code>6</code> on separate lines. To print only the final answer, move <code>print</code> outside the loop." },

    { t: "h", text: "Searching: flags and break" },
    { t: "p", html: "<p>Sometimes you only want a yes/no answer: <i>does this password contain a digit?</i> The trick is a <b>flag</b>: a boolean variable that starts with one answer (<code>False</code>, \"not found yet\") and is switched as soon as you find evidence. Once you have found it, there is no need to keep looking, so you can use <code>break</code> (Day 8) to leave the <code>for</code> loop early.</p>" },
    { t: "code", code: c`password = "sara2026"
has_digit = False
for ch in password:
    if ch.isdigit():
        has_digit = True
        break
print("Contains a digit:", has_digit)`, before: "<p>Run it, then change the password to <code>sara</code> (no digits) and run again.</p>", note: "<p>Line by line:</p><ul><li><code>has_digit = False</code>: the flag starts with \"not found yet\", before the loop.</li><li>The loop checks <code>s</code>, <code>a</code>, <code>r</code>, <code>a</code>: none is a digit, so nothing happens.</li><li>At <code>2</code>, <code>ch.isdigit()</code> is True: the flag is switched to <code>True</code> and <code>break</code> stops the loop. The remaining <code>026</code> is never checked; it is not needed.</li><li>Output: <code>Contains a digit: True</code>. With <code>sara</code>, the flag is never switched and stays <code>False</code>.</li></ul><p>A common mistake is adding an <code>else: has_digit = False</code> inside the loop: then a later letter would switch the flag back. Only switch it <b>one way</b>.</p>" },
    { t: "ar", html: "العلَم (flag) متغير منطقي يبدأ بقيمة \"لم نجد بعد\" ونغيّره عندما نجد الدليل، ثم break لإيقاف البحث. لا تُرجع{{g:|ي}} العلم لقيمته الأولى داخل الحلقة." },

    { t: "h", text: "Reading several inputs with a loop" },
    { t: "p", html: "<p>If you know how many values the user will type, a <code>for</code> loop over <code>range</code> can read them: put the <code>input()</code> <b>inside</b> the loop, and it will be called once per round.</p>" },
    { t: "code", code: c`for i in range(3):
    city = input("A city you like: ")
    print(i + 1, "-", city.upper())
print("Thanks!")`, stdin: "Riyadh\nJeddah\nAbha", before: "<p>The Input box has three lines, one for each round. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>range(3)</code> means: do this 3 times. <code>i</code> will be 0, 1, 2.</li><li>Line 2 is inside the loop, so <code>input()</code> runs three times and reads <code>Riyadh</code>, then <code>Jeddah</code>, then <code>Abha</code>.</li><li>Line 3 prints <code>i + 1</code>, so the numbering starts at 1 for humans (1, 2, 3), even though <code>i</code> starts at 0.</li><li><code>Thanks!</code> prints once, after the loop.</li></ul><p>Remember that <code>input()</code> always gives text. If you read numbers, convert them with <code>int()</code> or <code>float()</code> (Day 3) before adding them up.</p>" },
    { t: "ar", html: "لقراءة عدد معروف من القيم: ضع{{g:|ي}} input() داخل حلقة for i in range(n) فتُقرأ قيمة في كل دورة. ولا تنس{{g:|ي}} التحويل بـ int() إذا كانت القيم أرقامًا." },

    { t: "h", text: "Loops inside loops" },
    { t: "p", html: "<p>The block of a loop can contain <b>another</b> loop. This is called <b>nesting</b>. The rule to remember: the inner loop runs <b>completely</b>, from start to end, for <b>every single round</b> of the outer loop. It is how we build tables and patterns made of rows and columns.</p>" },
    { t: "analogy", title: "A clock", html: "<p>Think of the hour hand and the minute hand. For <b>each</b> hour, the minute hand goes all the way round, 0 to 59. Only then does the hour move on, and the minutes start again from 0. The outer loop is the hours, the inner loop is the minutes.</p>" },
    { t: "viz", code: c`for row in range(1, 4):
    for col in range(1, 4):
        print(row * col, end="\t")
    print()`, before: "<p>A small multiplication table. Visualize it and watch <code>col</code> go back to 1 every time <code>row</code> changes.</p>", note: "<p>Line by line:</p><ul><li>The outer loop sets <code>row = 1</code>.</li><li>The inner loop then runs fully: <code>col</code> = 1, 2, 3, printing <code>1 2 3</code>. The <code>end=\"\\t\"</code> puts a tab (Day 1) after each number instead of a new line, so they line up in columns.</li><li>Line 4 is indented once, so it belongs to the <b>outer</b> loop: after each full row, the empty <code>print()</code> moves to a new line.</li><li>Then <code>row = 2</code> and the inner loop starts again from <code>col = 1</code>: <code>2 4 6</code>. Then row 3: <code>3 6 9</code>.</li></ul><p>In total the inner <code>print</code> ran 3 × 3 = <b>9</b> times. Outer rounds × inner rounds = total rounds.</p>" },
    { t: "code", code: c`n = 5
for i in range(1, n + 1):
    print("*" * i)`, before: "<p>A pattern does not always need two loops. Here one loop and string repetition (Day 1) draw a triangle. Change <code>n</code> to 8.</p>", note: "<p>Line by line:</p><ul><li><code>i</code> goes 1, 2, 3, 4, 5.</li><li><code>\"*\" * i</code> repeats the star <code>i</code> times: <code>*</code>, then <code>**</code>, then <code>***</code>…</li><li>Each <code>print</code> starts a new line, so the rows stack into a triangle.</li></ul><p>The repetition <code>\"*\" * i</code> is really a hidden inner loop: Python repeats the character for you. With two real loops you can print different things on each row, like the numbers <code>1 2 3</code>.</p>" },
    { t: "ar", html: "في الحلقات المتداخلة، الحلقة الداخلية تُنفذ كاملة في كل دورة من الحلقة الخارجية، وعدد المرات = الخارجية × الداخلية. وانتبه{{g:|ي}} للإزاحة: print() الفارغة تابعة للحلقة الخارجية." },
    { t: "predict", code: c`for i in range(3):
    for j in range(2):
        print(i, j)`, explain: "For each <code>i</code> (0, 1, 2), the inner loop prints <code>j</code> = 0 and 1. That is 3 × 2 = 6 lines: <code>0 0</code>, <code>0 1</code>, <code>1 0</code>, <code>1 1</code>, <code>2 0</code>, <code>2 1</code>. The inner loop finishes before the outer loop moves on." },

    { t: "h", text: "for or while?" },
    { t: "p", html: "<p>Both loops repeat, and you can often write the same program with either. The question is: <b>do you know in advance what to go through?</b></p>" },
    { t: "analogy", title: "A list of errands vs. waiting for a bus", html: "<p>Doing your errands is a <b>for</b>: you have a list, you do each one, done. Waiting for the bus is a <b>while</b>: you don't know how long, you keep checking <i>\"is it here yet?\"</i> until it is.</p>" },
    { t: "code", code: c`for i in range(1, 4):
    print("for:", i)
i = 1
while i <= 3:
    print("while:", i)
    i += 1`, before: "<p>The same job, counting 1 to 3, written twice. Compare how many lines each one needs.</p>", note: "<p>Line by line:</p><ul><li>The <code>for</code> version is 2 lines: <code>range(1, 4)</code> already contains the start, the stop and the step.</li><li>The <code>while</code> version needs 4 lines: start (<code>i = 1</code>), condition (<code>i &lt;= 3</code>) and update (<code>i += 1</code>), all written by you.</li><li>Both print 1, 2, 3.</li></ul><p>Use <b>for</b> when you know the items or the count: 10 times, each letter, each number in a range. Use <b>while</b> when you repeat until something happens: until the password is right, until the money reaches the goal. With <code>for</code> you can't forget the update, so there is no risk of an infinite loop.</p>" },
    { t: "ar", html: "استخدم{{g:|ي}} for عندما تعرف{{g:|ين}} ما ستمرّ عليه أو عدد المرات، و while عندما تكرر{{g:|ين}} حتى يحدث شيء لا تعرف{{g:|ين}} متى يحدث، مثل إدخال كلمة المرور الصحيحة." },

    { t: "h", text: "Putting it together: a class marks report" },
    { t: "code", code: c`n = int(input("How many students? "))
total = 0
passed = 0
for i in range(1, n + 1):
    mark = int(input("Mark: "))
    total += mark
    if mark >= 60:
        passed += 1
    print(f"Student {i}: {mark:3} " + "*" * (mark // 10))
print(f"Average: {total / n:.1f}")
print(f"Passed: {passed} of {n}")`, stdin: "4\n85\n52\n97\n70", together: true, before: "<p>A teacher types the marks of a small class and gets a report with a star bar for each student. Read it, predict the average for the marks in the Input box (85, 52, 97, 70), then run it with your own marks.</p>", note: "<p>How it works:</p><ul><li>Line 1 reads how many marks will follow, so we know the count in advance: a job for <code>for</code>.</li><li>Lines 2–3: an <b>accumulator</b> (<code>total</code>) and a <b>counter</b> (<code>passed</code>), both 0 before the loop.</li><li>Line 4: <code>range(1, n + 1)</code> numbers the students from 1 to <code>n</code>.</li><li>Line 5 reads one mark per round and converts it with <code>int()</code>.</li><li>Line 6 adds it to the total; lines 7–8 count it only if it is 60 or more.</li><li>Line 9 prints a row: <code>{mark:3}</code> (Day 4) gives each mark 3 places so they line up, and <code>\"*\" * (mark // 10)</code> draws one star per 10 marks: 85 → 8 stars.</li><li>Lines 10–11 are outside the loop: they run once, with the final totals.</li></ul><p>With the given input: total 304, average 304 / 4 = <code>76.0</code>, and 3 of 4 students passed (52 did not).</p>" },
    { t: "ar", html: "البرنامج يجمع أفكار اليوم: for مع range لأننا نعرف عدد الطلاب، ومُجمِّع للمجموع، وعدّاد للناجحين داخل if، وتكرار النص لرسم النجوم. والطباعة النهائية خارج الحلقة لتُنفذ مرة واحدة." },
  ],
  mistakes: [
    { title: "Expecting range to include the stop", html: "", wrong: c`for i in range(1, 10):
    print(i)   # stops at 9!`, right: c`for i in range(1, 11):
    print(i)   # 1..10` },
    { title: "Changing the loop variable to skip items", html: "Assigning to <code>i</code> inside a <code>for</code> has no effect on the next round — use <code>continue</code> or a step.", wrong: c`for i in range(10):
    i += 1    # useless`, right: c`for i in range(0, 10, 2):
    print(i)` },
    { title: "print inside instead of after", html: "Printing the total inside the loop shows every step, not the final answer.", wrong: c`total = 0
for n in range(4):
    total += n
    print(total)`, right: c`total = 0
for n in range(4):
    total += n
print(total)`, ar: "انتبه{{g:|ي}} للإزاحة: السطر داخل الحلقة يتكرر، والسطر خارجها يُنفذ مرة واحدة." },
  ],
  tricks: [
    { title: "enumerate gives the position too", html: "", code: c`for i, ch in enumerate("abc", start=1):
    print(i, ch)` },
    { title: "_ for 'I don't need the variable'", html: "", code: c`for _ in range(3):
    print("Python!")` },
    { title: "sum(range(...))", html: "<code>sum(range(1, 101))</code> gives 5050 in one line." },
  ],
  practice: [
    { t: "predict", code: c`for i in range(2, 11, 3):
    print(i)`, explain: "2, 5, 8 — the next would be 11, which is not below 11." },
    { t: "predict", code: c`s = ""
for ch in "abc":
    s = ch + s
print(s)`, explain: "Each new letter goes to the <b>front</b>: a → ba → cba. A loop that reverses a string!" },
    { t: "parsons", title: "Count the As", prompt: "Count how many times the letter <code>a</code> appears in <code>\"banana salad\"</code> and print the count.", lines: ["count = 0", c`for ch in "banana salad":`, c`    if ch == "a":`, "        count += 1", "print(count)"], distractors: ["    count = 0"], explain: "The counter starts before the loop; the <code>if</code> is inside the loop; the print is outside." },
    { t: "try", title: "Triangle designer", html: "<p>Change the program to draw an upside-down triangle, then a centered pyramid (hint: <code>\" \" * (n - i) + \"*\" * (2 * i - 1)</code>).</p>", code: c`n = 5
for i in range(1, n + 1):
    print("*" * i)` },
    { t: "predict", code: c`for i in range(3):
    for j in range(2):
        print(i, j)`, explain: "6 lines: (0,0) (0,1) (1,0) (1,1) (2,0) (2,1). The inner loop finishes before the outer loop moves on." },
  ],
  exercises: [
    { id: "evens", lvl: "seed", title: "Even numbers", prompt: "<p>Read N and print all even numbers from 2 to N (inclusive), on one line separated by spaces.</p><pre class=\"code-static\">Input: 10\nOutput: 2 4 6 8 10</pre>", tests: [{ stdin: "10", expected: "2 4 6 8 10" }, { stdin: "7", expected: "2 4 6" }],
      hint: "<code>range(2, n + 1, 2)</code> and <code>print(i, end=\" \")</code>. A trailing space at the end of the line is fine.",
      solutions: [{ name: "step 2", code: c`n = int(input())
for i in range(2, n + 1, 2):
    print(i, end=" ")` }, { name: "if inside", code: c`n = int(input())
for i in range(1, n + 1):
    if i % 2 == 0:
        print(i, end=" ")` }, { name: "Unpacking", code: c`n = int(input())
print(*range(2, n + 1, 2))`, note: "The <code>*</code> spreads the range into separate values for print. Advanced but neat." }] },
    { id: "table", lvl: "seed", title: "Times table", prompt: "<p>Read a number and print its table from 1 to 10 in this format:</p><pre class=\"code-static\">7 x 1 = 7\n...\n7 x 10 = 70</pre>", tests: [{ stdin: "7", expected: Array.from({ length: 10 }, (_, i) => `7 x ${i + 1} = ${7 * (i + 1)}`).join("\n") }, { stdin: "3", expected: Array.from({ length: 10 }, (_, i) => `3 x ${i + 1} = ${3 * (i + 1)}`).join("\n") }],
      solutions: [{ name: "f-string", code: c`n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")` }] },
    { id: "fact", lvl: "star", title: "Factorial", prompt: "<p>Read n and print n! = 1 × 2 × … × n. (0! is 1.)</p>", tests: [{ stdin: "5", expected: "120" }, { stdin: "0", expected: "1" }, { stdin: "10", expected: "3628800" }],
      hint: "An accumulator that multiplies must start at <b>1</b>, not 0.",
      solutions: [{ name: "Loop", code: c`n = int(input())
result = 1
for i in range(1, n + 1):
    result *= i
print(result)` }, { name: "math.factorial", code: c`import math
print(math.factorial(int(input())))`, note: "Python already has it — but writing it yourself is the point today." }] },
    { id: "count", lvl: "star", title: "Letter statistics", prompt: "<p>Read a sentence and print three lines: the number of letters, digits and spaces.</p><pre class=\"code-static\">Input: CS 101 is fun\nLetters: 7\nDigits: 3\nSpaces: 3</pre>", tests: [{ stdin: "CS 101 is fun", expected: "Letters: 7\nDigits: 3\nSpaces: 3" }, { stdin: "Py30", expected: "Letters: 2\nDigits: 2\nSpaces: 0" }],
      hint: "<code>ch.isalpha()</code>, <code>ch.isdigit()</code>, <code>ch == \" \"</code>",
      solutions: [{ name: "Three counters", code: c`s = input()
letters = digits = spaces = 0
for ch in s:
    if ch.isalpha():
        letters += 1
    elif ch.isdigit():
        digits += 1
    elif ch == " ":
        spaces += 1
print("Letters:", letters)
print("Digits:", digits)
print("Spaces:", spaces)` }, { name: "sum + generator", code: c`s = input()
print("Letters:", sum(ch.isalpha() for ch in s))
print("Digits:", sum(ch.isdigit() for ch in s))
print("Spaces:", s.count(" "))`, note: "True counts as 1 when summed. You will understand this style fully in Week 3." }] },
    { id: "prime", lvl: "star", title: "Is it prime?", prompt: "<p>Read a number ≥ 2 and print <code>Prime</code> or <code>Not prime</code>. A prime has no divisors except 1 and itself.</p>", tests: [{ stdin: "7", expected: "Prime" }, { stdin: "9", expected: "Not prime" }, { stdin: "2", expected: "Prime" }, { stdin: "97", expected: "Prime" }],
      solutions: [{ name: "Flag variable", code: c`n = int(input())
is_prime = True
for d in range(2, n):
    if n % d == 0:
        is_prime = False
        break
print("Prime" if is_prime else "Not prime")`, note: "A <b>flag</b> starts True and is switched off when we find evidence. <code>break</code> stops as soon as we know." }, { name: "Faster: up to √n", code: c`n = int(input())
is_prime = True
d = 2
while d * d <= n:
    if n % d == 0:
        is_prime = False
        break
    d += 1
print("Prime" if is_prime else "Not prime")`, note: "If n has a divisor, one of the pair is at most √n. For 1,000,003 this is 1,000 checks instead of a million." }, { name: "for-else", code: c`n = int(input())
for d in range(2, n):
    if n % d == 0:
        print("Not prime")
        break
else:
    print("Prime")`, note: "A <code>for</code> can have an <code>else</code> that runs only if the loop was <b>not</b> broken. Rare, but elegant here." }] },
    { id: "pyramid", lvl: "fire", title: "Number pyramid", prompt: "<p>Read n and print this pattern (for n = 4):</p><pre class=\"code-static\">1\n1 2\n1 2 3\n1 2 3 4</pre>", tests: [{ stdin: "4", expected: "1\n1 2\n1 2 3\n1 2 3 4" }, { stdin: "1", expected: "1" }],
      hint: "Outer loop for the rows, inner loop for the numbers. Careful: no space at the end of a line is required, but it is allowed.",
      solutions: [{ name: "Nested loops", code: c`n = int(input())
for row in range(1, n + 1):
    for k in range(1, row + 1):
        print(k, end=" ")
    print()` }, { name: "join", code: c`n = int(input())
for row in range(1, n + 1):
    print(" ".join(str(k) for k in range(1, row + 1)))` }] },
    { id: "fix9", lvl: "fire", debug: true, title: "Average of N marks", prompt: "<p>Read N, then N marks, and print the average with 1 decimal. For <code>3</code>, <code>80</code>, <code>90</code>, <code>70</code> it prints <code>Average: 80.0</code>. Fix the bugs.</p>", starter: c`n = int(input())
total = 0
for i in range(1, n):
    mark = input()
    total += mark
    print(f"Average: {total / n:.1f}")`, tests: [{ stdin: "3\n80\n90\n70", expected: "Average: 80.0" }, { stdin: "1\n55", expected: "Average: 55.0" }],
      ar: "ثلاثة أخطاء: عدد مرات التكرار، تحويل النوع، ومكان الطباعة.",
      solutions: [{ name: "Fixed", code: c`n = int(input())
total = 0
for i in range(n):
    mark = int(input())
    total += mark
print(f"Average: {total / n:.1f}")` }] },
  ],
  quiz: [
    { q: "What does `list(range(3, 8))` contain?", o: ["3..8", "3, 4, 5, 6, 7", "4..8", "3, 5, 7"], a: 1, e: "Stop not included." },
    { q: "How many stars?", code: c`for i in range(3):
    for j in range(4):
        print("*", end="")`, o: ["7", "12", "3", "4"], a: 1, e: "3 × 4." },
    { q: "Which prints 10 down to 1?", o: ["`range(10, 1)`", "`range(10, 0, -1)`", "`range(1, 10, -1)`", "`range(10, 1, -1)`"], a: 1, e: "Stop at 0 so 1 is included; step -1." },
    { q: "An accumulator for a product should start at…", o: ["0", "1", "None", "It doesn't matter"], a: 1, e: "Anything × 0 = 0." },
    { q: "Best loop for \"ask until the password is correct\"?", o: ["for", "while", "Either", "Neither"], a: 1, e: "You don't know how many tries." },
  ],
  puzzle: { title: "Mystery sum", q: "<p>What does this print?</p>", code: c`total = 0
for i in range(1, 20):
    if i % 3 == 0 or i % 5 == 0:
        total += i
print(total)`, answers: ["78"], hint: "Multiples of 3 below 20: 3, 6, 9, 12, 15, 18. Multiples of 5: 5, 10, 15 — but 15 only once!", ar: "لا تعدّ{{g:|ي}} الرقم 15 مرتين.", e: "3+5+6+9+10+12+15+18 = <b>78</b>. This is Project Euler problem #1 (with 1000 instead of 20) — a famous website of math-programming puzzles." },
  cards: [
    { f: "`range(1, 6)` gives?", b: "1, 2, 3, 4, 5 (stop not included)." },
    { f: "Count down from 10 to 1", b: "`for i in range(10, 0, -1):`" },
    { f: "When to use for vs while?", b: "for: known items/count. while: repeat until a condition changes." },
    { f: "What is a flag variable?", b: "A bool (e.g. `is_prime = True`) switched when we find evidence." },
    { f: "Nested loops: how many runs?", b: "outer × inner." },
  ],
};
})();

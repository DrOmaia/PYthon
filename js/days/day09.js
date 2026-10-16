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
    { t: "p", html: "<p>Yesterday, to count from 1 to 5 with <code>while</code>, you needed three things: a start (<code>i = 1</code>), a condition (<code>i &lt;= 5</code>) and an update (<code>i += 1</code>). Forget the update and the loop never ends. Most loops simply go through things one by one — every number, every letter, every student. For that, Python has a shorter and safer loop: <code>for</code>.</p>" },
    { t: "analogy", title: "Taking attendance", html: "<p>A teacher holds the class list and reads it from top to bottom: <i>for each student on the list: call the name</i>. She does not count or check a condition — she just moves to the next name until the list ends. A <code>for</code> loop works exactly like that: Python hands you the next item every round and stops by itself at the end.</p>" },
    { t: "viz", code: c`for letter in "Py30":
    print(letter)
print("done")`, before: "<p>Visualize and watch <code>letter</code> become <code>P</code>, then <code>y</code>, then <code>3</code>, then <code>0</code>.</p>" },
    { t: "lines", rows: [
      ["for letter in \"Py30\":", "<b>for</b> … <b>in</b> …: — take the items of <code>\"Py30\"</code> one at a time. Each round, the <b>loop variable</b> <code>letter</code> holds the current item. You choose its name."],
      ["    print(letter)", "The indented block runs once <b>per item</b>: 4 letters → 4 rounds."],
      ["print(\"done\")", "Not indented: runs once, after the last item."],
    ] },
    { t: "ar", html: "حلقة for تمر على العناصر واحدًا واحدًا، ومتغير الحلقة يأخذ قيمة العنصر الحالي في كل دورة. لا نحتاج عدادًا ولا تحديثًا." },
    { t: "check", q: "How many lines does this print?", code: c`for ch in "Riyadh":
    print(ch)`, o: ["1", "5", "6", "7"], a: 2, e: "\"Riyadh\" has 6 characters, so the block runs **6** times, one letter per line." },

    { t: "h", text: "range(n): repeat n times" },
    { t: "p", html: "<p>To repeat something a number of times, you need numbers to walk through. <code>range(5)</code> produces the numbers <code>0, 1, 2, 3, 4</code> — <b>five</b> numbers, starting at 0, just like string indexes on Day 4.</p>" },
    { t: "code", code: c`for i in range(5):
    print("Round", i)`, note: "<p>Five rounds, numbered 0 to 4. The number 5 itself is <b>not</b> included — it is where range stops.</p>" },
    { t: "check", q: "What is the last number printed by `for i in range(4): print(i)`?", o: ["4", "3", "5", "0"], a: 1, e: "`range(4)` gives 0, 1, 2, 3. The stop value 4 is never included." },

    { t: "h", text: "range(start, stop): choose where to begin" },
    { t: "p", html: "<p>Humans count from 1, not 0. Give <code>range</code> two numbers: where to <b>start</b>, and where to <b>stop</b>. The start is included; the stop is not.</p>" },
    { t: "code", code: c`for day in range(1, 8):
    print("Day", day, "of the week")`, note: "<p>To get 1 to 7 you write <code>range(1, 8)</code>: one more than the last number you want.</p>" },
    { t: "ar", html: "range(a, b) يبدأ من a وينتهي <b>قبل</b> b. لذلك للعد من 1 إلى n نكتب range(1, n + 1)." },
    { t: "check", q: "Which `range` gives the numbers 1 to 10?", o: ["`range(10)`", "`range(1, 10)`", "`range(1, 11)`", "`range(0, 10)`"], a: 2, e: "Start at 1, stop **before** 11: 1, 2, …, 10." },

    { t: "h", text: "range with a step: jump and count down" },
    { t: "analogy", title: "Climbing stairs", html: "<p>You can climb stairs one at a time, or two at a time. The third number of <code>range</code> is the <b>step</b>: how big each jump is. A negative step is like walking <b>down</b> the stairs.</p>" },
    { t: "code", code: c`for i in range(0, 21, 5):
    print(i, end=" ")
print()
for i in range(10, 0, -2):
    print(i, end=" ")`, note: "<p>First: 0, 5, 10, 15, 20 (jumps of 5). Second: 10, 8, 6, 4, 2 — counting down; it stops <b>before</b> reaching 0.</p>" },
    { t: "table", head: ["Call", "Numbers", "Remember"], rows: [["`range(5)`", "0 1 2 3 4", "starts at 0, 5 numbers"], ["`range(1, 6)`", "1 2 3 4 5", "stop is not included"], ["`range(0, 21, 5)`", "0 5 10 15 20", "step = jump size"], ["`range(10, 0, -2)`", "10 8 6 4 2", "negative step counts down"]] },
    { t: "check", q: "What does this print?", code: c`for i in range(1, 10, 3):
    print(i, end=" ")`, o: ["`1 4 7`", "`1 4 7 10`", "`3 6 9`", "`1 2 3`"], a: 0, e: "Start 1, jump 3: 1, 4, 7. The next would be 10, which is not below the stop 10." },

    { t: "h", text: "Counting with for: letters in a word" },
    { t: "p", html: "<p>Loops become useful when you combine them with <code>if</code> and a counter from yesterday. How many vowels are in a word? Look at each letter, and count the ones that are vowels. Remember <code>in</code> from Day 4: <code>ch in \"aeiou\"</code> is True when <code>ch</code> is one of those letters.</p>" },
    { t: "code", code: c`word = "information systems"
vowels = 0
for ch in word:
    if ch in "aeiou":
        vowels += 1
print("Vowels:", vowels)` },
    { t: "lines", rows: [
      ["vowels = 0", "The counter starts at 0, <b>before</b> the loop."],
      ["for ch in word:", "Visit every character, spaces included."],
      ["    if ch in \"aeiou\":", "Is this character a vowel? (Indented once: inside the loop.)"],
      ["        vowels += 1", "Indented twice: runs only for vowels."],
      ["print(\"Vowels:\", vowels)", "After the loop: print the final count once."],
    ] },
    { t: "p", html: "<p>Two new string methods help in these loops: <code>ch.isalpha()</code> is True for a letter, and <code>ch.isdigit()</code> is True for a digit <code>0</code>–<code>9</code>.</p>" },
    { t: "code", code: c`digits = 0
for ch in "Room 2B, floor 14":
    if ch.isdigit():
        digits += 1
print("Digits:", digits)` },

    { t: "h", text: "Totals with for" },
    { t: "p", html: "<p>The accumulator from yesterday works the same way inside <code>for</code>: start at 0 before the loop, add inside. And because <code>for</code> + <code>range</code> knows how many rounds to do, it is perfect for \"read N values\".</p>" },
    { t: "code", code: c`n = int(input("How many marks? "))
total = 0
for i in range(n):
    mark = int(input("Mark: "))
    total += mark
print("Total:", total)
print("Average:", total / n)`, stdin: "3\n80\n95\n71", note: "<p>The first input says <b>how many</b>; the loop then reads exactly that many marks. The loop variable <code>i</code> is not even used — it just counts the rounds for us.</p>" },
    { t: "ar", html: "نفس فكرة المجموع: يبدأ بصفر قبل الحلقة ونضيف إليه داخلها. و range(n) تكرر الحلقة n مرة بالضبط." },

    { t: "h", text: "Loops inside loops" },
    { t: "p", html: "<p>A timetable has rows (days) and columns (hours). To go through every cell you need a loop for the rows and, <b>inside it</b>, a loop for the columns. This is called a <b>nested loop</b>.</p>" },
    { t: "viz", code: c`for row in range(1, 4):
    for col in range(1, 4):
        print(row * col, end="\t")
    print()`, before: "<p>The inner loop runs <b>completely</b> for every single round of the outer loop: 3 rows × 3 columns = 9 numbers. Visualize to see <code>col</code> start again at 1 for each new row.</p>" },
    { t: "lines", rows: [
      ["for row in range(1, 4):", "Outer loop: row = 1, then 2, then 3."],
      ["    for col in range(1, 4):", "Inner loop: for <b>each</b> row, col goes 1, 2, 3."],
      ["        print(row * col, end=\"\\t\")", "Print one cell; <code>end=\"\\t\"</code> stays on the same line with a tab."],
      ["    print()", "Inside the outer loop only: after a full row, start a new line."],
    ] },
    { t: "ar", html: "في الحلقات المتداخلة: الحلقة الداخلية تعمل كاملة في كل دورة من الحلقة الخارجية. عدد المرات = الخارجية × الداخلية." },
    { t: "check", q: "How many stars does this print?", code: c`for i in range(2):
    for j in range(5):
        print("*", end="")`, o: ["7", "10", "5", "2"], a: 1, e: "The inner loop prints 5 stars, and it runs once per outer round: 2 × 5 = **10**." },
    { t: "p", html: "<p>Nested loops are not the only way to draw shapes. One loop plus string repetition from Day 1 already makes a triangle:</p>" },
    { t: "code", code: c`n = 5
for i in range(1, n + 1):
    print("*" * i)` },

    { t: "h", text: "for or while?" },
    { t: "analogy", title: "A list of jobs vs. a goal", html: "<p>Use <b>for</b> when you know what to go through: 10 times, each letter, each mark. Use <b>while</b> when you repeat until something happens: until the password is right, until the money reaches the goal. If you can say <i>\"for each…\"</i>, choose <code>for</code>.</p>" },
    { t: "table", head: ["Situation", "Loop"], rows: [["print a table from 1 to 10", "`for i in range(1, 11):`"], ["count the letters in a name", "`for ch in name:`"], ["ask until the answer is valid", "`while answer is bad:`"], ["save money until the goal", "`while money < goal:`"]] },

    { t: "steps", title: "Hottest day of the week", problem: "<p>Read 7 daily temperatures for Riyadh (one per line). Print the highest temperature and the average with 1 decimal.</p>", steps: [
      { html: "<p><b>Understand.</b> Exactly 7 values → we know the count, so <code>for</code> with <code>range(7)</code> is the right loop.</p>" },
      { html: "<p><b>Plan.</b> An accumulator <code>total</code> for the average. For the highest, keep a variable <code>hottest</code> and replace it whenever a bigger temperature arrives. Start it very low, so the first real temperature always wins.</p>", code: c`total = 0
hottest = -100` },
      { html: "<p><b>Read inside the loop</b> and add to the total.</p>", code: c`for day in range(7):
    t = int(input())
    total += t` },
      { html: "<p><b>Find the highest.</b> Compare each new temperature with the best so far.</p>", code: c`    if t > hottest:
        hottest = t` },
      { html: "<p><b>After the loop</b>, print both results once.</p>", code: c`print("Hottest:", hottest)
print(f"Average: {total / 7:.1f}")` },
    ], code: c`total = 0
hottest = -100
for day in range(7):
    t = int(input())
    total += t
    if t > hottest:
        hottest = t
print("Hottest:", hottest)
print(f"Average: {total / 7:.1f}")`, stdin: "38\n41\n43\n40\n39\n44\n42", ar: "متغير hottest يحتفظ بأكبر قيمة رأيناها حتى الآن، ونستبدله كلما وجدنا قيمة أكبر." },
  ],
  mistakes: [
    { title: "Expecting range to include the stop", html: "<code>range(1, 10)</code> stops at 9. To include 10, the stop must be 11.", wrong: c`for i in range(1, 10):
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
    { title: "Looping over a number", html: "A number is not a sequence: <code>for i in 5</code> gives <code>TypeError: 'int' object is not iterable</code>. Wrap it in <code>range()</code>.", wrong: c`for i in 5:
    print(i)`, right: c`for i in range(5):
    print(i)`, ar: "لا يمكن المرور على رقم مباشرة، استخدم{{g:|ي}} range." },
  ],
  tricks: [
    { title: "enumerate gives the position too", html: "<code>enumerate</code> hands you two things each round: a number and the item. <code>start=1</code> makes the numbering begin at 1.", code: c`for i, ch in enumerate("abc", start=1):
    print(i, ch)` },
    { title: "_ for 'I don't need the variable'", html: "When the loop variable is never used, programmers call it <code>_</code>. It says: \"just repeat, the number does not matter\".", code: c`for _ in range(3):
    print("Python!")` },
    { title: "sum(range(...))", html: "<code>sum</code> adds all the numbers of a range in one line — no loop needed.", code: c`print(sum(range(1, 101)))   # 5050` },
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
    { t: "predict", code: c`total = 0
for k in range(5, 0, -1):
    total += k
print(k, total)`, explain: "k goes 5, 4, 3, 2, 1 and total becomes 15. After the loop, <code>k</code> keeps its <b>last</b> value: <code>1 15</code>." },
    { t: "parsons", title: "Product of 1 to 5", prompt: "Multiply 1 × 2 × 3 × 4 × 5 and print the result (120).", lines: ["result = 1", "for i in range(1, 6):", "    result *= i", "print(result)"], distractors: ["result = 0", "for i in range(1, 5):"], explain: "A product starts at 1 (anything × 0 is 0), and <code>range(1, 6)</code> includes 5." },
    { t: "try", title: "Countdown timer", html: "<p>Use a <code>for</code> with a negative step to count down from 10 to 1, then print <code>Happy New Year!</code>. Then make it count down in twos.</p>", code: c`for i in range(10, 0, -1):
    print(i)
print("Happy New Year!")` },
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
      hint: "<code>for i in range(1, 11):</code> and an f-string: <code>f\"{n} x {i} = {n * i}\"</code>.",
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
      hint: "Try every d from 2 to n - 1. If <code>n % d == 0</code> for any of them, n is not prime. A variable <code>is_prime = True</code> that you switch to False helps.",
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
    { id: "square9", lvl: "seed", title: "Square of stars", prompt: "<p>Read n and print a square of n × n stars, n stars on each line.</p><pre class=\"code-static\">Input: 3\n***\n***\n***</pre>", tests: [{ stdin: "3", expected: "***\n***\n***" }, { stdin: "1", expected: "*" }],
      hint: "One loop for the lines; each line is <code>\"*\" * n</code>. Or a nested loop with <code>end=\"\"</code>.",
      solutions: [{ name: "One loop", code: c`n = int(input())
for i in range(n):
    print("*" * n)` }, { name: "Nested loops", code: c`n = int(input())
for row in range(n):
    for col in range(n):
        print("*", end="")
    print()`, note: "The inner loop prints one row; the empty <code>print()</code> ends the line." }] },
  ],
  quiz: [
    { q: "What does `list(range(3, 8))` contain?", o: ["3..8", "3, 4, 5, 6, 7", "4..8", "3, 5, 7"], a: 1, e: "Stop not included." },
    { q: "How many stars?", code: c`for i in range(3):
    for j in range(4):
        print("*", end="")`, o: ["7", "12", "3", "4"], a: 1, e: "3 × 4." },
    { q: "Which prints 10 down to 1?", o: ["`range(10, 1)`", "`range(10, 0, -1)`", "`range(1, 10, -1)`", "`range(10, 1, -1)`"], a: 1, e: "Stop at 0 so 1 is included; step -1." },
    { q: "An accumulator for a product should start at…", o: ["0", "1", "None", "It doesn't matter"], a: 1, e: "Anything × 0 = 0." },
    { q: "Best loop for \"ask until the password is correct\"?", o: ["for", "while", "Either", "Neither"], a: 1, e: "You don't know how many tries." },
    { q: "What does this print?", code: c`count = 0
for ch in "a1b2c3":
    if ch.isdigit():
        count += 1
print(count)`, o: ["6", "3", "0", "123"], a: 1, e: "Only `1`, `2` and `3` are digits." },
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
  remember: [
    "`for x in something:` runs the block once for **each** item; `x` holds the current item.",
    "`range(n)` is 0 … n-1; `range(a, b)` is a … b-1; the stop is **never** included.",
    "The third number of `range` is the step; a negative step counts down: `range(10, 0, -1)`.",
    "Counters and accumulators work inside `for` exactly like inside `while`: start before, update inside, print after.",
    "In nested loops the inner loop runs completely for every round of the outer loop (outer × inner).",
    "`for` when you know what to go through; `while` when you repeat until something happens.",
  ],
  rememberAr: "for تمر على كل عنصر، و range لا تشمل رقم التوقف. للعد من 1 إلى n: range(1, n + 1).",
};
})();

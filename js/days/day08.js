window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[8] = {
  title: "while loops: repeat until done",
  intro: "Welcome to Week 2, {{name}}. Until now every line ran at most once. Today your programs learn to <b>repeat</b> — keep asking until the answer is valid, keep counting until a goal, keep playing until the player wins. Loops are where programs start doing real work.",
  introAr: "الحلقات تجعل البرنامج يكرر الأوامر. اليوم نتعلم while: تكرار طالما الشرط صحيح. أهم شيء: يجب أن يتغير شيء داخل الحلقة حتى تتوقف يومًا ما!",
  goals: ["Write `while` loops that stop correctly", "Use counters and accumulators (running totals)", "Read input until a stop value (sentinel)", "Validate input by asking again", "Use `break` and `continue`"],
  learn: [
    { t: "h", text: "Why do programs need to repeat?" },
    { t: "p", html: "<p>Print the numbers from 1 to 100? With what you know, that is <b>100 lines</b> of <code>print</code>. A login screen that asks for the password until it is correct? You cannot know how many <code>input()</code> lines to write — the user decides.</p><p>A <b>loop</b> solves both: you write the instructions <b>once</b> and Python repeats them as many times as needed.</p>" },
    { t: "analogy", title: "Eating a plate of kabsa", html: "<p><i>While there is rice on the plate: take a spoon.</i> Before every spoon you ask: is there still rice? Each spoon changes the situation (less rice), so one day the answer is No and you stop. A loop whose situation <b>never changes</b> never stops — that is an <b>infinite loop</b>.</p>" },

    { t: "h", text: "Your first while loop" },
    { t: "p", html: "<p><code>while</code> looks like <code>if</code>: a condition, a colon, an indented block. But <code>if</code> runs its block <b>once</b>; <code>while</code> runs it, goes <b>back up</b> and checks the condition again — until it is <code>False</code>.</p>" },
    { t: "viz", code: c`count = 1
while count <= 3:
    print("Round", count)
    count = count + 1
print("Done!")`, before: "<p>Press Visualize and click Next ▶. Watch the arrow jump <b>back to line 2</b> after line 4.</p>" },
    { t: "lines", rows: [
      ["count = 1", "The <b>start value</b>. Before the loop, <code>count</code> is 1."],
      ["while count <= 3:", "The <b>condition</b>: is count 3 or less? True → run the block. False → jump to the first line after it."],
      ["    print(\"Round\", count)", "Indented, so it is <b>inside</b> the loop. It runs once every round."],
      ["    count = count + 1", "The <b>update</b>: count becomes 2, 3, 4. At 4, <code>4 &lt;= 3</code> is False and the loop ends."],
      ["print(\"Done!\")", "Not indented: <b>after</b> the loop. Runs once, at the end."],
    ] },
    { t: "ar", html: "while تشبه if، لكنها بعد تنفيذ الكتلة ترجع للأعلى وتفحص الشرط مرة أخرى. تتوقف فقط عندما يصبح الشرط False." },
    { t: "check", q: "How many times does this print `Hi`?", code: c`n = 1
while n <= 5:
    print("Hi")
    n = n + 1`, o: ["4", "5", "6", "Forever"], a: 1, e: "n takes the values 1, 2, 3, 4, 5 inside the loop. When n becomes 6, `6 <= 5` is False and the loop stops: **5** times.", hint: "Write down the value of n before each check: 1, 2, 3…" },

    { t: "h", text: "The three parts of every loop" },
    { t: "p", html: "<p>Every <code>while</code> loop that stops correctly has three parts:</p><ol><li><b>Start</b> — a variable gets its first value <i>before</i> the loop.</li><li><b>Condition</b> — the question asked before each round.</li><li><b>Update</b> — a line <i>inside</i> the loop that moves the variable toward making the condition False.</li></ol><p>In this rocket countdown the update goes <b>down</b>. It uses a shortcut you may have seen in a Day 2 solution: <code>n -= 1</code> means <code>n = n - 1</code>, and <code>n += 1</code> means <code>n = n + 1</code>.</p>" },
    { t: "code", code: c`n = 5
while n > 0:
    print(n)
    n -= 1
print("Launch!")`, note: "<p>Start: <code>n = 5</code>. Condition: <code>n &gt; 0</code>. Update: <code>n -= 1</code>. After printing 1, n becomes 0, <code>0 &gt; 0</code> is False, and the rocket launches.</p>" },
    { t: "ar", html: "كل حلقة تحتاج ثلاثة أشياء: قيمة بداية، شرط، وتحديث داخل الحلقة. لو نسيت{{g:|ِ}} التحديث لن تتوقف الحلقة أبدًا." },
    { t: "check", q: "What happens if you delete the line `n -= 1` from the countdown?", o: ["It prints 5 once", "It prints 5 forever (infinite loop)", "It prints 5, 4, 3, 2, 1 anyway", "Python shows an error immediately"], a: 1, e: "Without the update, n stays 5, `5 > 0` is always True, and the loop never ends. (Py30 stops such a program after a few seconds.)" },

    { t: "h", text: "Counters: how many times?" },
    { t: "p", html: "<p>You have 200 SAR and a coffee costs 18 SAR. How many coffees can you buy? A <b>counter</b> is a variable that starts at 0 and grows by 1 every round.</p>" },
    { t: "code", code: c`money = 200
coffees = 0
while money >= 18:
    money -= 18
    coffees += 1
print("Coffees:", coffees)
print("Money left:", money)`, note: "<p><code>coffees</code> counts the rounds: 11 coffees, 2 SAR left.</p>" },
    { t: "lines", rows: [
      ["coffees = 0", "The counter starts at 0 — no coffee bought yet."],
      ["while money >= 18:", "Can I still pay for one more? Then do another round."],
      ["    money -= 18", "Pay: this is the update that makes the loop stop one day."],
      ["    coffees += 1", "Count this round. <code>+=</code> 1 is the typical counter line."],
    ] },
    { t: "check", q: "With `money = 50` and the same loop, what is printed for `Coffees:`?", o: ["2", "3", "50", "0"], a: 0, e: "50 → 32 → 14. After two coffees, `14 >= 18` is False. **2** coffees, 14 SAR left." },

    { t: "h", text: "Accumulators: a running total" },
    { t: "analogy", title: "The cashier's screen", html: "<p>At the supermarket, the screen starts at <b>0.00</b>. Each item scanned is <i>added</i> to the number on the screen. At the end it shows the total. An <b>accumulator</b> is that screen: a variable that starts at 0 before the loop and collects a result inside it.</p>" },
    { t: "viz", code: c`total = 0
n = 1
while n <= 4:
    total += n
    n += 1
print("1 + 2 + 3 + 4 =", total)`, before: "<p>Visualize and watch <code>total</code> grow: 0 → 1 → 3 → 6 → 10. Change 4 to 100 and Python adds 1 to 100 in a blink (5050).</p>" },
    { t: "p", html: "<p>Two variables, two jobs: <code>n</code> is the <b>counter</b> and <code>total</code> is the <b>accumulator</b>. Create the accumulator <b>before</b> the loop — inside, it would reset to zero every round.</p>" },
    { t: "ar", html: "المجموع (total) يبدأ بصفر <b>قبل</b> الحلقة، ثم نضيف إليه داخل الحلقة. لو وضعته داخل الحلقة سيرجع صفرًا في كل دورة." },
    { t: "check", q: "Where must `total = 0` go?", o: ["Inside the loop, as the first line", "Before the loop", "After the loop", "It does not matter"], a: 1, e: "Before the loop, so it is set to 0 **once**. Inside, it would reset every round." },

    { t: "h", text: "Keep reading until the user says stop" },
    { t: "p", html: "<p>A cashier does not know how many items you will bring. So the program reads prices until a special value means \"finished\" — here <code>0</code>. That value is called a <b>sentinel</b>.</p>" },
    { t: "code", code: c`total = 0
price = float(input("Price (0 to finish): "))
while price != 0:
    total += price
    price = float(input("Price (0 to finish): "))
print(f"Total: {total:.2f} SAR")`, stdin: "12.5\n30\n7.5\n0", note: "<p>Look at the Input box: three prices, then 0. Change them and run again — the loop adapts to any number of items.</p>" },
    { t: "lines", rows: [
      ["price = float(input(...))", "Read the <b>first</b> price before the loop, so the condition has something to check."],
      ["while price != 0:", "Continue as long as the price is not the sentinel."],
      ["    total += price", "Add the price to the running total."],
      ["    price = float(input(...))", "Read the <b>next</b> price. This is the update — without it the loop never ends."],
    ] },
    { t: "check", q: "Why does this program call `input()` in two places?", o: ["By mistake — one is enough", "The first gives the condition a value to check; the second reads the next price each round", "To read two prices at once", "Because `while` needs two inputs"], a: 1, e: "Read once before the loop, read again at the end of the body. This is the classic **sentinel pattern**." },

    { t: "h", text: "Ask again until the answer is valid" },
    { t: "p", html: "<p>Users make typos. A good program does not accept nonsense — it asks again. The condition describes a <b>bad</b> answer; the loop repeats while the answer is bad.</p>" },
    { t: "code", code: c`age = int(input("Your age (1-120): "))
while age < 1 or age > 120:
    print("That is not a valid age, try again.")
    age = int(input("Your age (1-120): "))
print("Thanks! Age saved:", age)`, stdin: "-5\n300\n19", note: "<p>-5 is bad, 300 is bad, 19 is good. If the first answer is already good, the loop body never runs at all.</p>" },

    { t: "h", text: "while True and break" },
    { t: "p", html: "<p>Sometimes it is easier to think: <i>repeat forever, leave when something happens</i>. <code>while True:</code> repeats forever, and <code>break</code> is the emergency exit: it leaves the loop <b>immediately</b>.</p>" },
    { t: "code", code: c`while True:
    word = input("Say something (or 'quit'): ")
    if word == "quit":
        break
    print("You said:", word.upper())
print("Bye!")`, stdin: "hello\npython\nquit", note: "<p>Now there is only <b>one</b> <code>input()</code> line. When the user types <code>quit</code>, <code>break</code> jumps straight to <code>print(\"Bye!\")</code>.</p>" },
    { t: "h", text: "continue: skip this round" },
    { t: "p", html: "<p><code>continue</code> is softer: it skips the <b>rest of this round</b> and jumps back to the condition — handy to ignore values you do not want.</p>" },
    { t: "code", code: c`n = 0
while n < 6:
    n += 1
    if n == 3:
        continue
    print(n)`, note: "<p>Prints 1, 2, 4, 5, 6. When n is 3, <code>continue</code> jumps back up before the print. Notice the update <code>n += 1</code> is <b>before</b> the <code>continue</code> — otherwise n would stay 3 forever.</p>" },
    { t: "ar", html: "break تخرج من الحلقة فورًا. continue تتخطى باقي الدورة الحالية وترجع لفحص الشرط. انتبه{{g:|ي}} أن يكون التحديث قبل continue." },
    { t: "check", q: "What does this print?", code: c`n = 0
while True:
    n += 1
    if n == 4:
        break
print(n)`, o: ["3", "4", "5", "Nothing — it runs forever"], a: 1, e: "n becomes 1, 2, 3, 4. At 4 `break` leaves the loop, then `print(n)` shows **4**." },

    { t: "steps", title: "Class average with a sentinel", problem: "<p>A teacher types exam marks one by one and types <code>-1</code> when finished. Print how many marks were entered and their average with 1 decimal. If no marks were entered, print <code>No marks</code>.</p>", steps: [
      { html: "<p><b>Understand.</b> Input 80, 90, 70, -1 → <code>Marks: 3</code>, <code>Average: 80.0</code>. Unknown number of marks → <code>while</code> with the sentinel <code>-1</code>.</p>" },
      { html: "<p><b>Plan.</b> A <b>counter</b> (how many) and an <b>accumulator</b> (the sum), both 0 before the loop. Average = sum ÷ count.</p>", code: c`count = 0
total = 0` },
      { html: "<p><b>Build the reading loop.</b> Read before the loop, read again at the end of the body.</p>", code: c`mark = int(input())
while mark != -1:
    # count and add here
    mark = int(input())` },
      { html: "<p><b>Add the counting and summing</b> inside the loop.</p>", code: c`    count += 1
    total += mark` },
      { html: "<p><b>Print — carefully.</b> If the first value is -1, count is 0 and <code>total / count</code> would crash. An <code>if</code> handles it.</p>", code: c`if count == 0:
    print("No marks")
else:
    print("Marks:", count)
    print(f"Average: {total / count:.1f}")` },
    ], code: c`count = 0
total = 0
mark = int(input("Mark (-1 to finish): "))
while mark != -1:
    count += 1
    total += mark
    mark = int(input("Mark (-1 to finish): "))
if count == 0:
    print("No marks")
else:
    print("Marks:", count)
    print(f"Average: {total / count:.1f}")`, stdin: "80\n90\n70\n-1", ar: "عدّاد + مجموع + قيمة توقف (-1). ولا تنس{{g:|ي}} حالة عدم إدخال أي علامة حتى لا نقسم على صفر." },

    { t: "table", head: ["Pattern", "Shape", "Use it for"], rows: [["Count to a limit", "`i = 1` · `while i <= n:` · `i += 1`", "repeat a known number of times"], ["Counter", "`count = 0` · `count += 1` inside", "how many rounds / items"], ["Accumulator", "`total = 0` · `total += x` inside", "sums and totals"], ["Sentinel", "read · `while x != stop:` · read again", "unknown number of inputs"], ["Validation", "read · `while bad:` · message + read again", "ask until the answer is valid"], ["`while True` + `break`", "repeat · `if done: break`", "leave from the middle of the loop"]] },
  ],
  mistakes: [
    { title: "Forgetting to update the variable", html: "The condition never changes, so the loop never ends (Py30 stops it after a few seconds).", wrong: c`i = 1
while i <= 5:
    print(i)`, right: c`i = 1
while i <= 5:
    print(i)
    i += 1` },
    { title: "Resetting the total inside the loop", html: "Every round starts from zero again.", wrong: c`n = 1
while n <= 3:
    total = 0
    total += n
    n += 1
print(total)   # 3, not 6`, right: c`total = 0
n = 1
while n <= 3:
    total += n
    n += 1
print(total)   # 6`, ar: "المجموع يبدأ بصفر <b>قبل</b> الحلقة وليس داخلها." },
    { title: "Off by one", html: "<code>&lt;</code> vs <code>&lt;=</code> decides whether the last number is included. Always test the first and last round.", wrong: c`i = 1
while i < 10:   # stops at 9
    i += 1`, right: c`i = 1
while i <= 10:  # includes 10
    i += 1` },
    { title: "Reading the input only once", html: "In a sentinel loop the <code>input()</code> must also be <b>inside</b> the loop. Otherwise the first value is used forever and the loop never ends.", wrong: c`total = 0
n = int(input())
while n != 0:
    total += n
print(total)`, right: c`total = 0
n = int(input())
while n != 0:
    total += n
    n = int(input())
print(total)`, ar: "في حلقة القيمة الخاصة يجب قراءة قيمة جديدة في نهاية كل دورة." },
  ],
  tricks: [
    { title: "Debug a loop with print", html: "Add a temporary <code>print(i, total)</code> inside the loop to see every round. Or press Visualize. Delete the line when the bug is found." },
    { title: "Digits of any number", html: "With a loop, the <code>% 10</code> / <code>// 10</code> trick from Day 3 works for numbers of any length:", code: c`n = 90417
digits = 0
while n > 0:
    n //= 10
    digits += 1
print(digits)   # 5` },
    { title: "Two reasons to stop: and", html: "A condition can combine two tests. This savings loop stops when the goal is reached <b>or</b> after 6 months — whichever comes first.", code: c`money = 0
months = 0
while money < 1000 and months < 6:
    money += 150
    months += 1
print(months, "months,", money, "SAR")   # 6 months, 900 SAR` },
  ],
  practice: [
    { t: "predict", code: c`i = 10
while i > 0:
    print(i)
    i -= 3`, explain: "10, 7, 4, 1 — then i becomes -2, the condition is False, and the loop ends." },
    { t: "predict", code: c`n = 1
while n < 50:
    n *= 2
print(n)`, explain: "1 → 2 → 4 → 8 → 16 → 32 → 64. The loop checks 64 &lt; 50, stops, and prints <code>64</code>. The final value can go past the limit!" },
    { t: "parsons", title: "Countdown", prompt: "Arrange the lines to print 5, 4, 3, 2, 1 and then <code>Launch!</code>", lines: ["n = 5", "while n > 0:", "    print(n)", "    n -= 1", c`print("Launch!")`], distractors: ["    n += 1", c`    print("Launch!")`], explain: "The update must move toward stopping (<code>n -= 1</code>), and the final message is outside the loop so it prints once." },
    { t: "try", title: "Multiplication table", html: "<p>Change the program so it prints the table of the number in the Input box up to × 12.</p>", code: c`n = int(input("Table of: "))
i = 1
while i <= 10:
    print(n, "x", i, "=", n * i)
    i += 1`, stdin: "7" },
    { t: "predict", code: c`i = 0
while i < 6:
    i += 1
    if i == 3:
        continue
    if i == 5:
        break
    print(i)`, explain: "1, 2 are printed. At 3 <code>continue</code> skips the print. 4 is printed. At 5 <code>break</code> ends the loop. Output: <code>1 2 4</code> on separate lines." },
    { t: "predict", code: c`count = 0
word = input()
while word != "stop":
    count += 1
    word = input()
print(count)`, stdin: "red\nblue\ngreen\nstop\nyellow", explain: "Three words are counted. <code>stop</code> ends the loop, so <code>yellow</code> is never even read. Output: <code>3</code>." },
    { t: "parsons", title: "Sum until zero", prompt: "Build a program that adds whole numbers until the user types 0, then prints the sum.", lines: ["total = 0", "n = int(input())", "while n != 0:", "    total += n", "    n = int(input())", "print(total)"], distractors: ["    total = 0", "print(n)"], explain: "Start the accumulator before the loop, read once before it, add and read again inside, print once after." },
    { t: "try", title: "Password with three tries", html: "<p>The secret is <code>py30</code>. Run it, then change the Input box so the user gets it right on the 2nd try. Can you make it print how many tries were left?</p>", code: c`tries = 0
password = ""
while password != "py30" and tries < 3:
    password = input("Password: ")
    tries += 1
if password == "py30":
    print("Welcome!")
else:
    print("Locked. Try later.")`, stdin: "1234\nabcd\nqwer" },
  ],
  exercises: [
    { id: "count", lvl: "seed", title: "Count to N", prompt: "<p>Read a number N and print the numbers from 1 to N, one per line.</p>", tests: [{ stdin: "3", expected: "1\n2\n3" }, { stdin: "1", expected: "1" }],
      hint: "Start <code>i = 1</code>, loop <code>while i &lt;= n</code>, print, then <code>i += 1</code>.",
      solutions: [{ name: "while", code: c`n = int(input())
i = 1
while i <= n:
    print(i)
    i += 1` }, { name: "Preview: for", code: c`n = int(input())
for i in range(1, n + 1):
    print(i)`, note: "Tomorrow's topic: for counting, <code>for</code> is shorter. <code>while</code> shines when you don't know in advance how many rounds you need." }] },
    { id: "sum", lvl: "seed", title: "Sum until zero", prompt: "<p>Read whole numbers until the user types <code>0</code>. Print their sum.</p><pre class=\"code-static\">Input: 5, 10, -2, 0\nOutput: 13</pre>", tests: [{ stdin: "5\n10\n-2\n0", expected: "13" }, { stdin: "0", expected: "0" }],
      hint: "Read one number before the loop. Inside: add it, then read the next.",
      solutions: [{ name: "Read before and inside", code: c`total = 0
n = int(input())
while n != 0:
    total += n
    n = int(input())
print(total)` }, { name: "while True + break", code: c`total = 0
while True:
    n = int(input())
    if n == 0:
        break
    total += n
print(total)`, note: "Only one <code>input()</code> line. Many programmers prefer this shape." }] },
    { id: "valid", lvl: "star", title: "Valid mark only", prompt: "<p>Keep asking for a mark until it is between 0 and 100. For each invalid mark print <code>Invalid</code>. At the end print <code>Mark: X</code>.</p>", tests: [{ stdin: "105\n-3\n88", expected: "Invalid\nInvalid\nMark: 88" }, { stdin: "0", expected: "Mark: 0" }],
      hint: "The loop condition describes a <b>bad</b> mark: <code>mark &lt; 0 or mark &gt; 100</code>.",
      solutions: [{ name: "Condition loop", code: c`mark = int(input())
while mark < 0 or mark > 100:
    print("Invalid")
    mark = int(input())
print("Mark:", mark)` }, { name: "while True", code: c`while True:
    mark = int(input())
    if 0 <= mark <= 100:
        break
    print("Invalid")
print("Mark:", mark)` }] },
    { id: "digits", lvl: "star", title: "Digit sum of any number", prompt: "<p>Read a positive whole number of any length and print the sum of its digits. (On Day 3 you could only do 3 digits!)</p>", tests: [{ stdin: "472", expected: "13" }, { stdin: "90417", expected: "21" }, { stdin: "5", expected: "5" }],
      hint: "<code>n % 10</code> is the last digit and <code>n //= 10</code> removes it. Repeat while <code>n &gt; 0</code>.",
      solutions: [{ name: "% and //", code: c`n = int(input())
total = 0
while n > 0:
    total += n % 10
    n //= 10
print(total)` }, { name: "As text (preview)", code: c`s = input()
total = 0
for ch in s:
    total += int(ch)
print(total)` }] },
    { id: "guess", lvl: "star", title: "Guess until you win", prompt: "<p>The secret is <code>42</code>. Keep reading guesses. Print <code>Too low</code> or <code>Too high</code> after each wrong guess. When correct, print <code>Correct in N tries!</code>.</p>", starter: "secret = 42\n", tests: [{ stdin: "50\n30\n42", expected: "Too high\nToo low\nCorrect in 3 tries!" }, { stdin: "42", expected: "Correct in 1 tries!" }],
      hint: "A counter <code>tries</code> starts at 0 and grows by 1 for every guess.",
      solutions: [{ name: "Counter + loop", code: c`secret = 42
tries = 0
guess = -1
while guess != secret:
    guess = int(input())
    tries += 1
    if guess < secret:
        print("Too low")
    elif guess > secret:
        print("Too high")
print(f"Correct in {tries} tries!")` }, { name: "while True", code: c`secret = 42
tries = 0
while True:
    guess = int(input())
    tries += 1
    if guess == secret:
        print(f"Correct in {tries} tries!")
        break
    print("Too low" if guess < secret else "Too high")` }],
      twist: "In the Playground: <code>import random</code>, <code>secret = random.randint(1, 100)</code>, and limit the player to 7 tries. Why is 7 always enough if you play smart? (Hint: halve the range each time.)" },
    { id: "double", lvl: "fire", title: "Savings goal", prompt: "<p>{{name}} saves money. Read the starting amount and the goal. Every month the savings grow by 10% and she adds 100 SAR (in that order). Print how many months it takes to reach or pass the goal.</p><pre class=\"code-static\">Input: 1000 then 2000\nOutput: 5</pre>", tests: [{ stdin: "1000\n2000", expected: "5" }, { stdin: "500\n400", expected: "0" }, { stdin: "0\n100", expected: "1" }],
      hint: "The loop runs <b>while</b> the money is below the goal. Count the months.", ar: "لاحظ{{g:|ي}}: لو المبلغ الأولي أكبر من الهدف، الجواب 0 والحلقة لا تعمل أبدًا.",
      solutions: [{ name: "Simulation", code: c`money = float(input())
goal = float(input())
months = 0
while money < goal:
    money = money * 1.1 + 100
    months += 1
print(months)`, note: "This is a <b>simulation</b>: instead of a formula, we let the computer live through each month. Very powerful idea." }] },
    { id: "fix8", lvl: "fire", debug: true, title: "The loop that never ends", prompt: "<p>This program should print the even numbers from 2 to 10 and then their sum (<code>Sum: 30</code>). It runs forever and the sum is wrong. Fix it.</p>", starter: c`n = 2
while n <= 10:
    total = 0
    print(n)
    total += n
n += 2
print("Sum:", total)`, tests: [{ expected: "2\n4\n6\n8\n10\nSum: 30" }],
      ar: "مشكلتان: التحديث خارج الحلقة بسبب الإزاحة، والمجموع يبدأ داخل الحلقة.",
      solutions: [{ name: "Fixed", code: c`n = 2
total = 0
while n <= 10:
    print(n)
    total += n
    n += 2
print("Sum:", total)`, note: "Indentation decides what belongs to the loop. <code>n += 2</code> was outside, so n never changed." }] },
    { id: "budget8", lvl: "star", title: "Shopping until the budget runs out", prompt: "<p>Read a budget (whole SAR) on the first line, then item prices one per line. Keep buying while the next price fits in the money left. When an item does not fit, stop. Print how many items were bought and the money left.</p><pre class=\"code-static\">Input: 100, then 30, 45, 40, 10\nItems: 2\nLeft: 25</pre>", tests: [{ stdin: "100\n30\n45\n40\n10", expected: "Items: 2\nLeft: 25" }, { stdin: "20\n50", expected: "Items: 0\nLeft: 20" }, { stdin: "60\n20\n20\n20\n5", expected: "Items: 3\nLeft: 0" }],
      hint: "Use <code>while True</code>: read a price; if it is bigger than the money left, <code>break</code>; otherwise pay and count.", ar: "عدّاد للمشتريات، ونخرج بـ break عندما لا يكفي المال.",
      solutions: [{ name: "while True + break", code: c`money = int(input())
items = 0
while True:
    price = int(input())
    if price > money:
        break
    money -= price
    items += 1
print("Items:", items)
print("Left:", money)` }, { name: "Read before the loop", code: c`money = int(input())
items = 0
price = int(input())
while price <= money:
    money -= price
    items += 1
    price = int(input())
print("Items:", items)
print("Left:", money)`, note: "Careful: this version reads one more price after every purchase. The tests always have a price that does not fit, so it never runs out of input." }] },
  ],
  quiz: [
    { q: "How many times does this print `Hi`?", code: c`i = 0
while i < 4:
    print("Hi")
    i += 1`, o: ["3", "4", "5", "Forever"], a: 1, e: "i = 0, 1, 2, 3." },
    { q: "What does `break` do?", o: ["Skips one round", "Exits the loop immediately", "Stops the whole program", "Restarts the loop"], a: 1, e: "`continue` skips a round; `break` leaves the loop." },
    { q: "Why is this an infinite loop?", code: c`x = 5
while x > 0:
    print(x)`, o: ["`x` is never changed", "Missing colon", "`print` is wrong", "It is not infinite"], a: 0, e: "Nothing makes the condition False." },
    { q: "What is a sentinel value?", o: ["The first value", "A special value meaning stop", "An error value", "The loop counter"], a: 1, e: "Like typing 0 to finish." },
    { q: "Where should `total = 0` go?", o: ["Inside the loop", "Before the loop", "After the loop", "It doesn't matter"], a: 1, e: "Otherwise it resets every round." },
    { q: "How many times does the body of this loop run?", code: c`n = 10
while n < 5:
    print(n)
    n += 1`, o: ["0", "1", "5", "Forever"], a: 0, e: "The condition `10 < 5` is False at the very first check, so the body never runs." },
  ],
  puzzle: { title: "Collatz mystery", q: "<p>Start with n = 6. While n is not 1: if n is even, halve it; if odd, make it 3n + 1. How many steps until n becomes 1?</p>", code: c`n = 6
steps = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps += 1
print(steps)`, answers: ["8"], hint: "Trace by hand: 6 → 3 → 10 → …", ar: "تتبع{{g:|ي}} القيم: 6 ثم 3 ثم 10…", e: "6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1: <b>8</b> steps. Mathematicians believe every starting number reaches 1, but nobody has ever proved it — the Collatz conjecture is a famous unsolved problem!" },
  cards: [
    { f: "Three parts of every while loop?", b: "Start value, condition, and an update inside the loop." },
    { f: "`break` vs `continue`", b: "`break` exits the loop; `continue` jumps to the next round." },
    { f: "Sentinel loop pattern", b: "Read before the loop; process; read again at the end of the body. Or `while True` + `break`." },
    { f: "Accumulator", b: "A variable (e.g. `total = 0`) set before the loop and updated inside it." },
    { f: "Counter", b: "A variable that starts at 0 and does `count += 1` once per round." },
  ],
  remember: [
    "`while condition:` repeats its block as long as the condition is True; it checks before every round.",
    "Every loop needs a **start**, a **condition** and an **update** inside — no update means an infinite loop.",
    "A **counter** (`count += 1`) counts rounds; an **accumulator** (`total += x`) collects a result. Both start **before** the loop.",
    "Sentinel pattern: read before the loop, read again at the end of the body, stop on the special value.",
    "Validation: `while` the answer is bad, show a message and ask again.",
    "`break` leaves the loop now; `continue` skips to the next round.",
  ],
  rememberAr: "while تكرر طالما الشرط صحيح. لا تنس{{g:|ي}} التحديث داخل الحلقة، وابدأ{{g:|ي}} العداد والمجموع قبلها.",
};
})();

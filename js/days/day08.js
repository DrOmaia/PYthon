window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[8] = {
  title: "while loops: repeat until done",
  intro: "Welcome to Week 2, {{name}}. Until now every line ran at most once. Today your programs learn to <b>repeat</b> — keep asking until the answer is valid, keep counting until a goal, keep playing until the player wins. Loops are where programs start doing real work.",
  introAr: "الحلقات تجعل البرنامج يكرر الأوامر. اليوم نتعلم while: تكرار طالما الشرط صحيح. أهم شيء: يجب أن يتغير شيء داخل الحلقة حتى تتوقف يومًا ما!",
  goals: ["Write `while` loops that stop correctly", "Use counters and accumulators (running totals)", "Read input until a stop value (sentinel)", "Validate input by asking again", "Use `break` and `continue`"],
  learn: [
    { t: "h", text: "An if that repeats" },
    { t: "viz", code: c`count = 1
while count <= 3:
    print("Round", count)
    count = count + 1
print("Done!")`, before: "<p><code>while</code> looks like <code>if</code>, but after running its block it goes <b>back up</b> and checks the condition again. It stops when the condition becomes False. Visualize and watch the jump back to line 2.</p>" },
    { t: "analogy", title: "Eating a plate of kabsa", html: "<p><i>While there is rice on the plate: take a spoon.</i> Each spoon changes the situation (less rice), so eventually the condition is False and you stop. A loop whose condition never changes never stops — that is an <b>infinite loop</b>.</p>" },
    { t: "ar", html: "كل حلقة while تحتاج ثلاثة أشياء: قيمة بداية (count = 1)، شرط (count &lt;= 3)، وتغيير داخل الحلقة (count += 1). لو نسيت{{g:|ِ}} التغيير لن تتوقف الحلقة أبدًا." },
    { t: "h", text: "Counters and accumulators" },
    { t: "code", code: c`total = 0
n = 1
while n <= 100:
    total += n
    n += 1
print("1 + 2 + ... + 100 =", total)` },
    { t: "p", html: "<p>Two classic roles for variables inside loops:</p><ul><li>a <b>counter</b> counts how many times something happened (<code>n += 1</code>)</li><li>an <b>accumulator</b> collects a result (<code>total += n</code>). It must start at 0 <b>before</b> the loop — if you set it inside, it resets every round.</li></ul>" },
    { t: "h", text: "Keep reading until the user says stop" },
    { t: "code", code: c`total = 0
price = float(input("Price (0 to finish): "))
while price != 0:
    total += price
    price = float(input("Price (0 to finish): "))
print(f"Total: {total:.2f} SAR")`, stdin: "12.5\n30\n7.5\n0", note: "<p>The value <code>0</code> is a <b>sentinel</b>: a special value that means \"stop\". Notice the pattern: read once before the loop, and read again at the <b>end</b> of the loop body.</p>" },
    { t: "h", text: "Ask again until the answer is valid" },
    { t: "code", code: c`age = int(input("Your age (1-120): "))
while age < 1 or age > 120:
    print("That is not a valid age, try again.")
    age = int(input("Your age (1-120): "))
print("Thanks! Age saved:", age)`, stdin: "-5\n300\n19" },
    { t: "h", text: "break and continue" },
    { t: "code", code: c`while True:
    word = input("Say something (or 'quit'): ")
    if word == "quit":
        break
    if word == "":
        continue
    print("You said:", word.upper())
print("Bye!")`, stdin: "hello\n\npython\nquit", note: "<p><code>while True</code> would run forever — <code>break</code> is the emergency exit that leaves the loop immediately. <code>continue</code> skips the rest of this round and jumps back to the condition.</p>" },
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
  ],
  tricks: [
    { title: "Debug a loop with print", html: "Add a temporary <code>print(i, total)</code> inside the loop to see every round. Or press Visualize." },
    { title: "Digits of any number", html: "With a loop, the <code>% 10</code> / <code>// 10</code> trick from Day 3 works for numbers of any length:", code: c`n = 90417
digits = 0
while n > 0:
    n //= 10
    digits += 1
print(digits)   # 5` },
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
  ],
  exercises: [
    { id: "count", lvl: "seed", title: "Count to N", prompt: "<p>Read a number N and print the numbers from 1 to N, one per line.</p>", tests: [{ stdin: "3", expected: "1\n2\n3" }, { stdin: "1", expected: "1" }],
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
  ],
};
})();

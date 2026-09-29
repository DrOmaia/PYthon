window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[9] = {
  title: "for loops and range",
  intro: "<code>while</code> repeats until something happens. <code>for</code> repeats <b>for each</b> item: each number in a range, each letter in a word, each student in a list. It is the loop you will use most often in Python.",
  introAr: "حلقة for تمر على كل عنصر: كل رقم في مدى، أو كل حرف في نص. ونتعلم range والحلقات المتداخلة لرسم الأشكال وجداول الضرب.",
  goals: ["Loop over numbers with `range(start, stop, step)`", "Loop over the characters of a string", "Count, sum and find with loops", "Nest loops to draw patterns and tables", "Choose between `for` and `while`"],
  learn: [
    { t: "h", text: "for each item…" },
    { t: "viz", code: c`for letter in "Py30":
    print(letter)
print("done")`, before: "<p>The loop variable <code>letter</code> takes each value in turn. You don't need a counter or an update — Python moves to the next item for you.</p>" },
    { t: "h", text: "range: a sequence of numbers" },
    { t: "code", code: c`for i in range(5):
    print(i, end=" ")
print()
for i in range(1, 6):
    print(i, end=" ")
print()
for i in range(0, 21, 5):
    print(i, end=" ")
print()
for i in range(10, 0, -2):
    print(i, end=" ")` },
    { t: "table", head: ["Call", "Numbers", "Remember"], rows: [["`range(5)`", "0 1 2 3 4", "starts at 0, 5 numbers"], ["`range(1, 6)`", "1 2 3 4 5", "stop is not included"], ["`range(0, 21, 5)`", "0 5 10 15 20", "step = jump size"], ["`range(10, 0, -2)`", "10 8 6 4 2", "negative step counts down"]] },
    { t: "ar", html: "range(a, b) يبدأ من a وينتهي <b>قبل</b> b. لذلك للعد من 1 إلى n نكتب range(1, n + 1)." },
    { t: "h", text: "Loop patterns you will use forever" },
    { t: "code", code: c`word = "information systems"
vowels = 0
for ch in word:
    if ch in "aeiou":
        vowels += 1
print("Vowels:", vowels)

total = 0
for n in range(1, 11):
    total += n * n
print("Sum of squares 1..10:", total)` },
    { t: "h", text: "Loops inside loops" },
    { t: "viz", code: c`for row in range(1, 4):
    for col in range(1, 4):
        print(row * col, end="\t")
    print()`, before: "<p>The inner loop runs <b>completely</b> for every single round of the outer loop: 3 rows × 3 columns = 9 prints. Visualize to see <code>col</code> reset to 1 for each new row.</p>" },
    { t: "code", code: c`n = 5
for i in range(1, n + 1):
    print("*" * i)` },
    { t: "analogy", title: "for or while?", html: "<p>Use <b>for</b> when you know what to go through: 10 times, each letter, each item. Use <b>while</b> when you repeat until something happens: until the password is right, until the money reaches the goal.</p>" },
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

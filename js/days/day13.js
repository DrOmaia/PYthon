window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[13] = {
  title: "Review + project: games and data",
  intro: "This week you learned to repeat and to organize data. Put those together and you can build real games and data tools. Today: a complete number-guessing game, a quiz game driven by data, and a text analyzer.",
  introAr: "يوم المشاريع! نبني لعبة تخمين كاملة، ولعبة اختبار تعتمد على قائمة من القواميس، ومحلل نصوص. نفس خطوات حل المشكلات: افهم، أمثلة، خطة، كود صغير، اختبار.",
  goals: ["Combine loops, lists and dictionaries in one program", "Store program data as a list of dictionaries", "Build a game loop with score and attempts", "Review the whole week"],
  learn: [
    { t: "h", text: "Data-driven programs" },
    { t: "p", html: "<p>A beginner writes a quiz as 10 copies of the same <code>if</code> block. A programmer writes the questions as <b>data</b> and one loop that handles any number of them. Adding a question then means adding one line of data — no new code.</p>" },
    { t: "code", code: c`questions = [
    {"q": "Capital of Saudi Arabia?", "a": "riyadh"},
    {"q": "2 ** 4 = ?", "a": "16"},
    {"q": "Python creator's first name?", "a": "guido"},
]
score = 0
for item in questions:
    answer = input(item["q"] + " ").strip().lower()
    if answer == item["a"]:
        score += 1
        print("Correct!")
    else:
        print("The answer was", item["a"])
print(f"Score: {score}/{len(questions)}")`, stdin: "Riyadh\n8\nGuido" },
    { t: "h", text: "Week 2 in one table" },
    { t: "table", head: ["Day", "Tool", "Remember"], rows: [["8", "`while`", "start, condition, update; `break` / `continue`"], ["9", "`for`, `range`", "stop not included; nested loops multiply"], ["10", "lists", "`append`, `pop`, `sort()` vs `sorted()`, `split` / `join`"], ["11", "tuples, sets", "tuple = fixed; set = unique, `&` `|` `-`"], ["12", "dicts", "`get`, `items()`, counting pattern"]] },
    { t: "ar", html: "لاحظ{{g:|ي}} كيف تتحول البرامج الكبيرة إلى: بيانات (قائمة أو قاموس) + حلقة واحدة تعالجها." },
  ],
  practice: [
    { t: "predict", code: c`data = [3, 8, 1, 8, 5]
seen = set()
out = []
for x in data:
    if x not in seen:
        seen.add(x)
        out.append(x * 2)
print(out, len(seen))`, explain: "<code>[6, 16, 2, 10] 4</code>" },
    { t: "predict", code: c`stock = {"pen": 3, "book": 0, "bag": 2}
for item, n in stock.items():
    if n == 0:
        continue
    print(item * n)`, explain: "<code>penpenpen</code> then <code>bagbag</code>; the book is skipped." },
    { t: "parsons", title: "Longest word", prompt: "Find the longest word of a sentence.", lines: [c`words = "loops make programs powerful".split()`, "longest = words[0]", "for w in words:", "    if len(w) > len(longest):", "        longest = w", "print(longest)"], explain: "The champion pattern again: <code>powerful</code>." },
  ],
  exercises: [
    { id: "game", lvl: "star", title: "Project 1: Guessing game with a limit", prompt: "<p>Secret = <code>37</code>, 5 tries max. After each wrong guess print <code>Too low</code> / <code>Too high</code> and <code>N tries left</code>. If guessed: <code>You win in N tries!</code>. If tries run out: <code>Game over. It was 37</code>. Guesses outside 1–100 print <code>Out of range</code> and do <b>not</b> use a try.</p>", starter: "secret = 37\nmax_tries = 5\n", tests: [{ stdin: "50\n25\n37", expected: "Too high\n4 tries left\nToo low\n3 tries left\nYou win in 3 tries!" }, { stdin: "150\n50\n40\n30\n35\n36", expected: "Out of range\nToo high\n4 tries left\nToo high\n3 tries left\nToo low\n2 tries left\nToo low\n1 tries left\nToo low\n0 tries left\nGame over. It was 37" }],
      solutions: [{ name: "while with counter", code: c`secret = 37
max_tries = 5
tries = 0
won = False
while tries < max_tries:
    guess = int(input())
    if not 1 <= guess <= 100:
        print("Out of range")
        continue
    tries += 1
    if guess == secret:
        print(f"You win in {tries} tries!")
        won = True
        break
    print("Too low" if guess < secret else "Too high")
    print(f"{max_tries - tries} tries left")
if not won:
    print("Game over. It was", secret)` }, { name: "while-else", code: c`secret = 37
max_tries = 5
tries = 0
while tries < max_tries:
    guess = int(input())
    if not 1 <= guess <= 100:
        print("Out of range")
        continue
    tries += 1
    if guess == secret:
        print(f"You win in {tries} tries!")
        break
    print("Too low" if guess < secret else "Too high")
    print(f"{max_tries - tries} tries left")
else:
    print("Game over. It was", secret)`, note: "The <code>else</code> of a loop runs only if the loop ended without <code>break</code> — no flag needed." }],
      twist: "Play it for real in the Playground with <code>random.randint(1, 100)</code> and 7 tries. Strategy: always guess the middle of the remaining range (binary search — you will study it in Week 4)." },
    { id: "quiz", lvl: "star", title: "Project 2: Quiz engine", prompt: "<p>Using the starter data, ask each question, compare answers ignoring case and spaces, print <code>✓</code> or <code>✗ answer</code>, and finally <code>Score: X/N</code> and a message: <code>Excellent</code> (all correct), <code>Good</code> (at least half), else <code>Keep practicing</code>.</p>", starter: c`quiz = [
    {"q": "Keyword to define a function?", "a": "def"},
    {"q": "Type of 3.5?", "a": "float"},
    {"q": "len('Py30')?", "a": "4"},
    {"q": "Method to add to a list?", "a": "append"},
]
`, tests: [{ stdin: "def\nFloat\n5\n append ", expected: "✓\n✓\n✗ 4\n✓\nScore: 3/4\nGood" }, { stdin: "def\nfloat\n4\nappend", expected: "✓\n✓\n✓\n✓\nScore: 4/4\nExcellent" }, { stdin: "x\ny\nz\nw", expected: "✗ def\n✗ float\n✗ 4\n✗ append\nScore: 0/4\nKeep practicing" }],
      solutions: [{ name: "Loop over dicts", code: c`quiz = [
    {"q": "Keyword to define a function?", "a": "def"},
    {"q": "Type of 3.5?", "a": "float"},
    {"q": "len('Py30')?", "a": "4"},
    {"q": "Method to add to a list?", "a": "append"},
]
score = 0
for item in quiz:
    ans = input(item["q"] + " ").strip().lower()
    if ans == item["a"]:
        score += 1
        print("✓")
    else:
        print("✗", item["a"])
n = len(quiz)
print(f"Score: {score}/{n}")
if score == n:
    print("Excellent")
elif score >= n / 2:
    print("Good")
else:
    print("Keep practicing")` }] },
    { id: "analyzer", lvl: "fire", title: "Project 3: Text analyzer", prompt: "<p>Read a paragraph (one line). Remove the punctuation <code>.,!?</code>, make it lowercase, and print:</p><pre class=\"code-static\">Words: 10\nUnique: 7\nLongest: programming\nTop: python (3)</pre><p>Longest = first longest word; Top = most frequent word (first one if tied).</p>", tests: [{ stdin: "Python is fun. Python is powerful! Programming in Python, anyone?", expected: "Words: 10\nUnique: 7\nLongest: programming\nTop: python (3)" }],
      solutions: [{ name: "Step by step", code: c`text = input().lower()
for p in ".,!?":
    text = text.replace(p, "")
words = text.split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
top = max(counts, key=counts.get)
print("Words:", len(words))
print("Unique:", len(counts))
print("Longest:", longest)
print(f"Top: {top} ({counts[top]})")` }, { name: "Built-ins", code: c`from collections import Counter
text = input().lower()
for p in ".,!?":
    text = text.replace(p, "")
words = text.split()
top, n = Counter(words).most_common(1)[0]
print("Words:", len(words))
print("Unique:", len(set(words)))
print("Longest:", max(words, key=len))
print(f"Top: {top} ({n})")` }] },
    { id: "matrix", lvl: "fire", title: "Seat map", prompt: "<p>A classroom has 3 rows × 4 seats. Read taken seats as <code>row,col</code> (1-based) until <code>end</code>, then draw the map with <code>X</code> for taken and <code>.</code> for free, then <code>Free: N</code>.</p><pre class=\"code-static\">Input: 1,1  2,3  3,4  end\nX...\n..X.\n...X\nFree: 9</pre>", tests: [{ stdin: "1,1\n2,3\n3,4\nend", expected: "X...\n..X.\n...X\nFree: 9" }, { stdin: "end", expected: "....\n....\n....\nFree: 12" }],
      solutions: [{ name: "List of lists", code: c`seats = [["." for _ in range(4)] for _ in range(3)]
while True:
    line = input()
    if line == "end":
        break
    r, c = line.split(",")
    seats[int(r) - 1][int(c) - 1] = "X"
free = 0
for row in seats:
    print("".join(row))
    free += row.count(".")
print("Free:", free)`, note: "A 2D grid is a list of lists: <code>seats[row][col]</code>. Games like tic-tac-toe and chess use exactly this." }, { name: "Set of tuples", code: c`taken = set()
while True:
    line = input()
    if line == "end":
        break
    r, c = map(int, line.split(","))
    taken.add((r, c))
for r in range(1, 4):
    print("".join("X" if (r, c) in taken else "." for c in range(1, 5)))
print("Free:", 12 - len(taken))` }] },
    { id: "hunt2", lvl: "fire", debug: true, title: "Week 2 bug hunt", prompt: "<p>Print the names of students whose average is at least 80, in order: expected <code>Sara 91.0</code> and <code>Lina 85.0</code>. Three bugs.</p>", starter: c`students = {"Sara": [90, 92], "Omar": [70, 75], "Lina": [80, 90]}
for name, marks in students:
    total = 0
    for m in range(marks):
        total += m
    avg = total / len(marks)
    if avg > 80:
        print(name, avg)`, tests: [{ expected: "Sara 91.0\nLina 85.0" }],
      ar: "انتبه{{g:|ي}} لـ items() و range() وشرط 'على الأقل'.",
      solutions: [{ name: "Fixed", code: c`students = {"Sara": [90, 92], "Omar": [70, 75], "Lina": [80, 90]}
for name, marks in students.items():
    total = 0
    for m in marks:
        total += m
    avg = total / len(marks)
    if avg >= 80:
        print(name, avg)`, note: "The bugs: loop over <code>.items()</code> to get name and marks, loop over the list itself (not <code>range</code>), and use <code>&gt;=</code> for \"at least\" — otherwise Lina's 85.0 would pass but an exact 80 would not." }] },
  ],
  quiz: [
    { q: "Best structure for 100 quiz questions with answers?", o: ["100 variables", "A list of dicts", "One long string", "A set"], a: 1, e: "Data + one loop." },
    { q: "`[[0] * 3 for _ in range(2)]` is…", o: ["`[0, 0, 0, 0, 0, 0]`", "`[[0, 0, 0], [0, 0, 0]]`", "`[[0, 0], [0, 0], [0, 0]]`", "An error"], a: 1, e: "2 rows of 3." },
    { q: "Which removes duplicates but keeps order?", o: ["`set(lst)`", "`sorted(lst)`", "`list(dict.fromkeys(lst))`", "`lst.unique()`"], a: 2, e: "Dicts keep insertion order." },
    { q: "`for i in range(len(names)):` is most useful when…", o: ["you need the index", "never", "always", "names is a dict"], a: 0, e: "Otherwise `for name in names` is cleaner (or `enumerate`)." },
    { q: "The `else` of a `while` loop runs when…", o: ["always", "the loop ended without break", "after break", "never"], a: 1, e: "Handy for search loops." },
  ],
  puzzle: { title: "Robot walk", q: "<p>A robot starts at (0, 0) and follows the moves <code>UURDDLLL</code> (U: y+1, D: y−1, R: x+1, L: x−1). Where does it end? Answer as <code>x,y</code>.</p>", code: c`moves = {"U": (0, 1), "D": (0, -1), "R": (1, 0), "L": (-1, 0)}
x = y = 0
for m in "UURDDLLL":
    dx, dy = moves[m]
    x, y = x + dx, y + dy
print(f"{x},{y}")`, answers: ["-2,0"], hint: "Count: U twice, D twice → y back to 0. R once, L three times.", ar: "احسب{{g:|ي}} الحركات الأفقية والرأسية بشكل منفصل.", e: "y: +2 −2 = 0. x: +1 −3 = −2. Answer <code>-2,0</code>. A dictionary of directions is a classic trick in game programming." },
  cards: [
    { f: "Data-driven design", b: "Store items as data (list of dicts); one loop processes them all." },
    { f: "2D grid in Python", b: "List of lists: `grid[row][col]`." },
    { f: "Loop `else`", b: "Runs when the loop finishes without `break`." },
  ],
};
})();

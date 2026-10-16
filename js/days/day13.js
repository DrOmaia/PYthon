window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[13] = {
  title: "Review + project: games and data",
  intro: "This week you learned to repeat and to organize data. Put those together and you can build real games and data tools. Today: a complete number-guessing game, a quiz game driven by data, and a text analyzer.",
  introAr: "يوم المشاريع! نبني لعبة تخمين كاملة، ولعبة اختبار تعتمد على قائمة من القواميس، ومحلل نصوص. نفس خطوات حل المشكلات: افهم، أمثلة، خطة، كود صغير، اختبار.",
  goals: ["Combine loops, lists and dictionaries in one program", "Store program data as a list of dictionaries", "Build a game loop with score and attempts", "Review the whole week"],
  learn: [
    { t: "h", text: "Week recap: what you learned in days 8–12" },
    { t: "p", html: "<p>This week your programs learned two big skills: <b>repeating</b> work with loops, and <b>organizing</b> data in collections. Before the projects, spend ten minutes on this recap. Each part has a tiny example and a quick check — if one check feels hard, go back to that day for a few minutes. Then the projects will feel easy, because they are only these five ideas put together.</p>" },

    { t: "h", text: "Day 8 — while loops" },
    { t: "p", html: "<p>A <code>while</code> loop repeats <b>as long as</b> its condition is true. Every while loop needs three parts: a start value, a condition, and an update that moves toward the end — forget the update and the loop never stops. <code>break</code> leaves the loop at once; <code>continue</code> skips to the next round.</p>" },
    { t: "code", code: c`savings = 0
weeks = 0
while savings < 100:
    savings += 30
    weeks += 1
print(weeks, "weeks,", savings, "riyals")` },
    { t: "check", q: "How many times does this print `Hi`?", code: c`n = 1
while n < 10:
    print("Hi")
    n = n * 3`, o: ["`2`", "`3`", "`9`", "forever"], a: 1, e: "n goes 1 → 3 → 9 → 27. The condition is true for 1, 3 and 9 (all less than 10), so `Hi` is printed 3 times; at 27 the loop stops.", hint: "Write the value of n before each check of the condition." },

    { t: "h", text: "Day 9 — for loops and range" },
    { t: "p", html: "<p><code>for</code> repeats once <b>for each</b> item: each letter of a string, each number of a <code>range</code>, each item of a list. <code>range(start, stop, step)</code> never includes <code>stop</code>. Loops inside loops multiply: 3 rows × 4 columns = 12 rounds.</p>" },
    { t: "code", code: c`total = 0
for n in range(1, 6):
    total += n
print(total)` },
    { t: "check", q: "Which numbers does `range(2, 10, 3)` give?", o: ["`2 5 8`", "`2 5 8 11`", "`3 6 9`", "`2 3 4 ... 9`"], a: 0, e: "Start at 2, jump by 3, stop before 10: 2, 5, 8." },

    { t: "h", text: "Day 10 — lists" },
    { t: "p", html: "<p>A list keeps many values in order: <code>marks[0]</code> is the first, <code>marks[-1]</code> the last. It can change: <code>append</code>, <code>insert</code>, <code>remove</code>, <code>pop</code>. Remember the difference: <code>sorted(lst)</code> gives a new sorted list, <code>lst.sort()</code> sorts in place and returns <code>None</code>.</p>" },
    { t: "code", code: c`marks = [85, 92, 78]
marks.append(95)
print(marks[-1], len(marks))
print(sorted(marks, reverse=True)[:2])` },
    { t: "check", q: "What does this print?", code: c`items = ["pen", "bag", "book"]
items.pop()
items.append("cup")
print(items)`, o: ["`['pen', 'bag', 'cup']`", "`['bag', 'book', 'cup']`", "`['pen', 'bag', 'book', 'cup']`", "`['cup', 'pen', 'bag']`"], a: 0, e: "`pop()` removes the last item (book), then `append` adds cup at the end." },

    { t: "h", text: "Day 11 — tuples and sets" },
    { t: "p", html: "<p>A tuple <code>(2026, 9, 29)</code> is a fixed record — read it, unpack it (<code>y, m, d = date</code>), but never change it. A set keeps each item once, with no order: perfect for removing duplicates and for comparing groups with <code>&amp;</code>, <code>|</code> and <code>-</code>.</p>" },
    { t: "code", code: c`visits = ["Sara", "Omar", "Sara", "Lina"]
print(len(set(visits)), "different visitors")
a, b = (3, 4)
print(a * b)` },
    { t: "check", q: "What does this print?", code: c`print(len({"a", "b"} | {"b", "c"}))`, o: ["`4`", "`3`", "`1`", "`2`"], a: 1, e: "The union is {a, b, c}: b is kept only once, so 3." },

    { t: "h", text: "Day 12 — dictionaries" },
    { t: "p", html: "<p>A dictionary finds values by <b>key</b>: <code>prices[\"tea\"]</code>. <code>d[k] = v</code> adds or replaces; <code>get(k, default)</code> avoids KeyError; <code>items()</code> gives (key, value) pairs. And the counting pattern <code>counts[x] = counts.get(x, 0) + 1</code> appears in almost every data program.</p>" },
    { t: "code", code: c`counts = {}
for fruit in ["apple", "date", "apple"]:
    counts[fruit] = counts.get(fruit, 0) + 1
for fruit, n in counts.items():
    print(fruit, n)` },
    { t: "check", q: "What does this print?", code: c`d = {"x": 1}
d["y"] = d.get("x", 0) + d.get("z", 5)
print(d["y"])`, o: ["`1`", "`5`", "`6`", "`KeyError`"], a: 2, e: "`get(\"x\", 0)` is 1 (x exists), `get(\"z\", 5)` is the default 5. 1 + 5 = 6." },
    { t: "ar", html: "أسبوع كامل في سطرين: الحلقات (while و for) تكرر العمل، والمجموعات (list و tuple و set و dict) تنظم البيانات. المشاريع اليوم تجمع الاثنين." },
    { t: "table", head: ["Day", "Tool", "Remember"], rows: [["8", "`while`", "start, condition, update; `break` / `continue`"], ["9", "`for`, `range`", "stop not included; nested loops multiply"], ["10", "lists", "`append`, `pop`, `sort()` vs `sorted()`, `split` / `join`"], ["11", "tuples, sets", "tuple = fixed; set = unique, `&` `|` `-`"], ["12", "dicts", "`get`, `items()`, counting pattern"]] },

    { t: "h", text: "Data-driven programs" },
    { t: "p", html: "<p>A beginner writes a quiz as 10 copies of the same <code>if</code> block. A programmer writes the questions as <b>data</b> and one loop that handles any number of them. Adding a question then means adding one line of data — no new code. Here the data is a <b>list of dictionaries</b>: each dictionary is one question with the keys <code>\"q\"</code> and <code>\"a\"</code>.</p>" },
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
print(f"Score: {score}/{len(questions)}")`, stdin: "Riyadh\n8\nGuido", note: "<p>The loop variable <code>item</code> is one dictionary at a time, so <code>item[\"q\"]</code> is the question text. To add a fourth question you only add one line to the list.</p>" },
    { t: "ar", html: "لاحظ{{g:|ي}} كيف تتحول البرامج الكبيرة إلى: بيانات (قائمة أو قاموس) + حلقة واحدة تعالجها." },

    { t: "steps", title: "Gym check-in report", problem: "<p>The gym door logs the name of every check-in on one line (people can come several times). Print how many check-ins there were, how many <b>different</b> people came, each person with their number of visits (in order of first visit), and the most frequent visitor.</p>", stdin: "Sara Omar Sara Lina Sara Omar",
      steps: [
        { html: "<p><b>Understand.</b> Input: one line of names. Output: total check-ins, different people, visits per person, top visitor. Example: 6 check-ins, 3 people, Sara 3 times.</p>" },
        { html: "<p><b>Plan — choose a tool for each question.</b> Total → <code>len</code> of the list (Day 10). Different people → <code>len(set(...))</code> (Day 11). Visits per person → counting dictionary (Day 12). Top → <code>max</code> with <code>key=</code>. Loops (Day 9) glue it together.</p>" },
        { html: "<p><b>Build: read and count.</b></p>", code: c`names = input().split()
visits = {}
for n in names:
    visits[n] = visits.get(n, 0) + 1` },
        { html: "<p><b>Build: report.</b></p>", code: c`print("Check-ins:", len(names))
print("People:", len(set(names)))
for n, k in visits.items():
    print(f"  {n}: {k}")
print("Top visitor:", max(visits, key=visits.get))` },
        { html: "<p><b>Test.</b> 6 names, 3 different; Sara 3, Omar 2, Lina 1; top visitor Sara. ✓ Try an input with only one name, too.</p>" },
      ],
      code: c`names = input().split()
visits = {}
for n in names:
    visits[n] = visits.get(n, 0) + 1
print("Check-ins:", len(names))
print("People:", len(set(names)))
for n, k in visits.items():
    print(f"  {n}: {k}")
print("Top visitor:", max(visits, key=visits.get))`,
      ar: "كل سؤال في المشكلة له أداة: list للعدد الكلي، و set للأشخاص المختلفين، و dict لعدد الزيارات." },
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
    { t: "predict", code: c`n = 0
total = 0
while True:
    n += 1
    if n % 2 == 0:
        continue
    if n > 7:
        break
    total += n
print(total)`, explain: "Even numbers are skipped by <code>continue</code>; the loop stops at the first odd number above 7 (9). So total = 1 + 3 + 5 + 7 = <code>16</code>." },
    { t: "predict", code: c`prices = {"tea": 8, "latte": 18}
order = [("tea", 2), ("latte", 1), ("cake", 1)]
bill = 0
for item, qty in order:
    bill += prices.get(item, 0) * qty
print(bill)`, explain: "Each tuple is unpacked into <code>item</code> and <code>qty</code>. tea 8 × 2 = 16, latte 18 × 1 = 18, cake is not on the menu so <code>get</code> gives 0. Total: <code>34</code>." },
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
    { f: "Which tool? count different items / count each item", b: "Different items: `len(set(items))`. Each item: a counting dict `counts.get(x, 0) + 1`." },
  ],
  remember: [
    "`while` = repeat while a condition is true (start, condition, update); `break` exits, `continue` skips.",
    "`for` = repeat for each item; `range(start, stop, step)` never includes stop.",
    "Lists keep order and can change: `append`, `pop`, `sorted()` (new list) vs `sort()` (in place).",
    "Tuples are fixed records you can unpack: `y, m, d = date`.",
    "Sets keep each item once: `len(set(lst))`, and compare groups with `&`, `|`, `-`.",
    "Dicts look up by key: `get(k, default)`, `items()`, counting pattern `counts.get(x, 0) + 1`.",
    "Data-driven design: store the data in a list of dicts, and let one loop handle all of it.",
  ],
  rememberAr: "الأسبوع الثاني: الحلقات تكرر العمل، والقوائم والـ tuple والـ set والقواميس تنظم البيانات. البرنامج الجيد = بيانات منظمة + حلقة واحدة تعالجها.",
};
})();

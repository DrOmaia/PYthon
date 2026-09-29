window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[12] = {
  title: "Dictionaries: look things up by name",
  intro: "A list finds things by position: item 0, item 1. But in real life we look things up by <b>name</b>: a word in a dictionary, a phone number by contact, a mark by student ID. Python's <b>dict</b> does exactly that — and it is one of the most useful tools in the whole language (JSON data from every website is basically dictionaries).",
  introAr: "القاموس dict يخزن أزواجًا من مفتاح وقيمة، مثل اسم الطالب ودرجته. نصل للقيمة بالمفتاح بدل الرقم. ونتعلم أهم نمط: عدّ التكرارات باستخدام القاموس.",
  goals: ["Create dictionaries and read values by key", "Add, update and delete entries", "Use `get()` to avoid KeyError", "Loop over `keys()`, `values()` and `items()`", "Count frequencies with a dictionary"],
  learn: [
    { t: "h", text: "Keys and values" },
    { t: "code", code: c`student = {"name": "{{name}}", "major": "CS", "gpa": 4.6, "year": 1}
print(student["name"])
print(student["gpa"])
student["year"] = 2
student["email"] = "student@psu.edu.sa"
print(student)
print(len(student), "keys")` },
    { t: "analogy", title: "Like a real dictionary", html: "<p>In a paper dictionary you look up a <b>word</b> (the key) to find its <b>meaning</b> (the value). You never say \"give me word number 4,512\". Keys must be unique — the same key can't appear twice — but values can repeat.</p>" },
    { t: "ar", html: "القاموس = مفتاح : قيمة. المفاتيح لا تتكرر، ونستخدم d[key] للقراءة والتعديل والإضافة. لو المفتاح غير موجود يحدث KeyError، لذلك استخدم{{g:|ي}} get()." },
    { t: "h", text: "Safe lookups and deleting" },
    { t: "code", code: c`prices = {"latte": 18, "tea": 8, "water": 3}
print(prices.get("tea"))
print(prices.get("pizza"))
print(prices.get("pizza", "not on the menu"))
print("latte" in prices)
del prices["water"]
removed = prices.pop("tea")
print(prices, removed)` },
    { t: "h", text: "Looping over a dictionary" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
for name in marks:
    print(name)
for name, mark in marks.items():
    print(f"{name:<6}{mark}")
print(sum(marks.values()) / len(marks))
best = max(marks, key=marks.get)
print("Best:", best)` },
    { t: "h", text: "The most important pattern: counting" },
    { t: "viz", code: c`text = "red blue red green red blue"
counts = {}
for word in text.split():
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
print(counts)`, before: "<p>Word counts, vote counts, letter frequencies, product sales — they all use this pattern. Visualize and watch the dictionary grow.</p>" },
    { t: "code", code: c`counts = {}
for ch in "mississippi":
    counts[ch] = counts.get(ch, 0) + 1
print(counts)`, note: "<p>The <code>get(key, 0)</code> version does the same in one line: \"current count or 0, plus 1\".</p>" },
    { t: "h", text: "Nested data" },
    { t: "code", code: c`course = {
    "code": "CS101",
    "students": ["Sara", "Omar"],
    "schedule": {"day": "Sunday", "time": "10:00"},
}
print(course["students"][1])
print(course["schedule"]["day"])`, note: "<p>Dictionaries inside dictionaries and lists inside dictionaries — this is exactly what JSON data from web APIs looks like.</p>" },
  ],
  mistakes: [
    { title: "KeyError", html: "Keys are exact and case-sensitive.", wrong: c`ages = {"sara": 19}
print(ages["Sara"])`, right: c`ages = {"sara": 19}
print(ages.get("Sara", "unknown"))` },
    { title: "Looking up by value", html: "<code>d[x]</code> finds by <b>key</b>. To find a key by value you must loop.", wrong: c`codes = {"CS": "Computer Science"}
print(codes["Computer Science"])`, right: c`codes = {"CS": "Computer Science"}
for k, v in codes.items():
    if v == "Computer Science":
        print(k)` },
    { title: "Lists as keys", html: "Keys must be immutable. Use a tuple.", wrong: c`seats = {[1, 2]: "Sara"}`, right: c`seats = {(1, 2): "Sara"}` },
  ],
  tricks: [
    { title: "Counter does counting for you", html: "", code: c`from collections import Counter
c = Counter("banana")
print(c.most_common(2))` },
    { title: "Dict comprehension", html: "", code: c`squares = {n: n * n for n in range(1, 6)}
print(squares)` },
    { title: "Sort a dict by value", html: "", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
for name, m in sorted(marks.items(), key=lambda kv: kv[1], reverse=True):
    print(name, m)` },
  ],
  practice: [
    { t: "predict", code: c`d = {"a": 1, "b": 2}
d["a"] = 10
d["c"] = d["a"] + d["b"]
print(d)`, explain: "<code>{'a': 10, 'b': 2, 'c': 12}</code>" },
    { t: "predict", code: c`inv = {"pens": 5}
inv["pens"] += 3
print(inv.get("pens"), inv.get("books", 0))`, explain: "<code>8 0</code>" },
    { t: "parsons", title: "Letter counter", prompt: "Count letters in a word with <code>get</code>.", lines: ["counts = {}", c`for ch in "hello":`, "    counts[ch] = counts.get(ch, 0) + 1", "print(counts)"], distractors: ["    counts[ch] += 1"], explain: "<code>counts[ch] += 1</code> crashes the first time a letter appears (KeyError)." },
    { t: "try", title: "Arabic–English mini dictionary", html: "<p>Add five words, then ask the user for an English word and print the Arabic (or <code>Not found</code>).</p>", code: c`words = {"book": "كتاب", "code": "برمجة", "friend": "صديق"}
w = input("English word: ").lower()
print(words.get(w, "Not found"))`, stdin: "code" },
  ],
  exercises: [
    { id: "phone", lvl: "seed", title: "Phone book", prompt: "<p>The starter has a phone book. Read a name and print the number, or <code>Unknown</code>.</p>", starter: c`book = {"Sara": "0501112222", "Omar": "0553334444", "Lina": "0555556666"}
`, tests: [{ stdin: "Omar", expected: "0553334444" }, { stdin: "Ali", expected: "Unknown" }],
      solutions: [{ name: "get", code: c`book = {"Sara": "0501112222", "Omar": "0553334444", "Lina": "0555556666"}
print(book.get(input(), "Unknown"))` }, { name: "in check", code: c`book = {"Sara": "0501112222", "Omar": "0553334444", "Lina": "0555556666"}
name = input()
if name in book:
    print(book[name])
else:
    print("Unknown")` }] },
    { id: "wordcount", lvl: "seed", title: "Word frequency", prompt: "<p>Read a sentence (ignore capitals) and print each word with its count, in order of first appearance, as <code>word: count</code>.</p><pre class=\"code-static\">Input: The cat and the hat\nthe: 2\ncat: 1\nand: 1\nhat: 1</pre>", tests: [{ stdin: "The cat and the hat", expected: "the: 2\ncat: 1\nand: 1\nhat: 1" }],
      solutions: [{ name: "Counting pattern", code: c`counts = {}
for w in input().lower().split():
    counts[w] = counts.get(w, 0) + 1
for w, n in counts.items():
    print(f"{w}: {n}")` }, { name: "Counter", code: c`from collections import Counter
for w, n in Counter(input().lower().split()).items():
    print(f"{w}: {n}")` }] },
    { id: "gradebook", lvl: "star", title: "Grade book", prompt: "<p>Read lines like <code>Sara 95</code> until the line <code>end</code>. Then print the class average (1 decimal) and the top student.</p><pre class=\"code-static\">Average: 89.0\nTop: Sara</pre>", tests: [{ stdin: "Sara 95\nOmar 82\nLina 90\nend", expected: "Average: 89.0\nTop: Sara" }],
      solutions: [{ name: "Loop + dict", code: c`book = {}
while True:
    line = input()
    if line == "end":
        break
    name, mark = line.split()
    book[name] = int(mark)
print(f"Average: {sum(book.values()) / len(book):.1f}")
print("Top:", max(book, key=book.get))` }] },
    { id: "invert", lvl: "star", title: "Group by grade", prompt: "<p>Given the starter dictionary of students → letter grades, print each grade followed by the students with it (sorted), grades in alphabetical order:</p><pre class=\"code-static\">A: Lina, Sara\nB: Omar\nC: Faisal, Nora</pre>", starter: c`grades = {"Sara": "A", "Omar": "B", "Lina": "A", "Nora": "C", "Faisal": "C"}
`, tests: [{ expected: "A: Lina, Sara\nB: Omar\nC: Faisal, Nora" }],
      solutions: [{ name: "Dict of lists", code: c`grades = {"Sara": "A", "Omar": "B", "Lina": "A", "Nora": "C", "Faisal": "C"}
groups = {}
for name, g in grades.items():
    if g not in groups:
        groups[g] = []
    groups[g].append(name)
for g in sorted(groups):
    print(f"{g}: {', '.join(sorted(groups[g]))}")` }, { name: "setdefault", code: c`grades = {"Sara": "A", "Omar": "B", "Lina": "A", "Nora": "C", "Faisal": "C"}
groups = {}
for name, g in grades.items():
    groups.setdefault(g, []).append(name)
for g in sorted(groups):
    print(f"{g}: {', '.join(sorted(groups[g]))}")`, note: "<code>setdefault</code> creates the empty list only if the key is new." }] },
    { id: "cart", lvl: "fire", title: "Shopping cart", prompt: "<p>The menu is in the starter. Read orders like <code>latte 2</code> until <code>done</code>. Ignore items not on the menu (print <code>Unknown item: X</code>). Finally print each ordered item in order of first order with its total quantity, and the bill:</p><pre class=\"code-static\">latte x3\ntea x1\nTotal: 62 SAR</pre>", starter: c`menu = {"latte": 18, "tea": 8, "water": 3, "cookie": 6}
`, tests: [{ stdin: "latte 2\ntea 1\npizza 1\nlatte 1\ndone", expected: "Unknown item: pizza\nlatte x3\ntea x1\nTotal: 62 SAR" }],
      solutions: [{ name: "Quantities dict", code: c`menu = {"latte": 18, "tea": 8, "water": 3, "cookie": 6}
cart = {}
while True:
    line = input()
    if line == "done":
        break
    item, qty = line.split()
    if item not in menu:
        print("Unknown item:", item)
        continue
    cart[item] = cart.get(item, 0) + int(qty)
total = 0
for item, qty in cart.items():
    print(f"{item} x{qty}")
    total += menu[item] * qty
print(f"Total: {total} SAR")` }] },
    { id: "fix12", lvl: "fire", debug: true, title: "Vote counting bug", prompt: "<p>Count votes and print the winner: <code>Winner: Blue (3 votes)</code>.</p>", starter: c`votes = ["Red", "Blue", "Blue", "Green", "Red", "Blue"]
counts = {}
for v in votes:
    counts[v] += 1
winner = max(counts)
print(f"Winner: {winner} ({counts[winner]} votes)")`, tests: [{ expected: "Winner: Blue (3 votes)" }],
      ar: "خطآن: عدّ مفتاح غير موجود، و max على القاموس تقارن المفاتيح أبجديًا وليس القيم.",
      solutions: [{ name: "Fixed", code: c`votes = ["Red", "Blue", "Blue", "Green", "Red", "Blue"]
counts = {}
for v in votes:
    counts[v] = counts.get(v, 0) + 1
winner = max(counts, key=counts.get)
print(f"Winner: {winner} ({counts[winner]} votes)")`, note: "<code>max(counts)</code> compares the keys alphabetically (\"Red\" wins!). <code>key=counts.get</code> compares by vote count." }] },
  ],
  quiz: [
    { q: "What does `{\"a\": 1}.get(\"b\", 0)` return?", o: ["`None`", "`0`", "KeyError", "`1`"], a: 1, e: "The default value." },
    { q: "How do you loop over keys AND values?", o: ["`for k, v in d:`", "`for k, v in d.items():`", "`for k in d.values():`", "`for (k, v) in d.keys():`"], a: 1, e: "`items()` gives pairs." },
    { q: "`d = {\"x\": 1, \"x\": 2}` then `d[\"x\"]` is…", o: ["1", "2", "[1, 2]", "Error"], a: 1, e: "Keys are unique; the last one wins." },
    { q: "Which can be a key?", o: ["`[1, 2]`", "`{1, 2}`", "`(1, 2)`", "`{\"a\": 1}`"], a: 2, e: "Keys must be immutable." },
    { q: "Best pattern to count items?", o: ["`d[x] += 1`", "`d[x] = d.get(x, 0) + 1`", "`d.append(x)`", "`d[x] = 1`"], a: 1, e: "Works for new and existing keys." },
  ],
  puzzle: { title: "Dictionary detective", q: "<p>What does this print?</p>", code: c`d = {}
for i, ch in enumerate("banana"):
    d[ch] = i
print(d)`, answers: ["{'b': 0, 'a': 5, 'n': 4}"], hint: "Each assignment overwrites. What is the LAST index of each letter?", ar: "كل تخزين جديد يستبدل القيمة القديمة للمفتاح.", e: "The last positions: b→0, a→5, n→4. Order of keys = first insertion: <code>{'b': 0, 'a': 5, 'n': 4}</code>." },
  cards: [
    { f: "Read a value safely", b: "`d.get(key, default)`" },
    { f: "Counting pattern", b: "`counts[x] = counts.get(x, 0) + 1`" },
    { f: "Loop over pairs", b: "`for k, v in d.items():`" },
    { f: "Key with the largest value", b: "`max(d, key=d.get)`" },
    { f: "Delete a key", b: "`del d[k]` or `d.pop(k)`" },
  ],
};
})();

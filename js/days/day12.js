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
    { t: "p", html: "<p>Try to store a student's record in a list: <code>[\"{{name}}\", \"CS\", 4.6]</code>. Now, what is <code>student[2]</code>? You have to <i>remember</i> that position 2 means the GPA. With ten fields, nobody remembers. A <b>dictionary</b> lets you label every value with a name — the <b>key</b> — and ask for it by that name.</p>" },
    { t: "analogy", title: "Like a real dictionary", html: "<p>In a paper dictionary you look up a <b>word</b> (the key) to find its <b>meaning</b> (the value). You never say \"give me word number 4,512\". Keys must be unique — the same word cannot appear twice — but two words can have the same meaning, so values can repeat.</p>" },
    { t: "code", code: c`student = {"name": "{{name}}", "major": "CS", "gpa": 4.6}
print(student["name"])
print(student["gpa"])
print(len(student))`, before: "<p>A dictionary uses curly braces with <code>key: value</code> pairs, separated by commas.</p>" },
    { t: "lines", rows: [
      ["student = {\"name\": \"{{name}}\", ...}", "Three pairs. Before each colon is a <b>key</b> (<code>\"name\"</code>, <code>\"major\"</code>, <code>\"gpa\"</code>); after it, the <b>value</b>."],
      ["print(student[\"name\"])", "Square brackets with a <b>key</b> inside (not a number!) give its value: <code>{{name}}</code>."],
      ["print(student[\"gpa\"])", "Same idea: <code>4.6</code>. The code now explains itself — no need to remember positions."],
      ["print(len(student))", "<code>len</code> counts the pairs: <code>3</code>."],
    ] },
    { t: "ar", html: "القاموس = مفتاح : قيمة. نكتب اسم المفتاح داخل الأقواس المربعة d[\"name\"] لنحصل على القيمة، بدل رقم الموقع كما في القائمة." },
    { t: "check", q: "What does this print?", code: c`menu = {"tea": 8, "latte": 18, "water": 3}
print(menu["latte"])`, o: ["`latte`", "`18`", "`1`", "`8`"], a: 1, e: "The key `\"latte\"` gives its value, `18`.", hint: "Inside the brackets is a key, not an index." },

    { t: "h", text: "Adding and changing entries" },
    { t: "p", html: "<p>One line does both jobs: <code>d[key] = value</code>. If the key already exists, its value is <b>replaced</b>. If the key is new, a new pair is <b>added</b>. A café uses this when a new drink arrives or a price goes up.</p>" },
    { t: "code", code: c`prices = {"tea": 8}
prices["latte"] = 18
prices["tea"] = 9
print(prices)
print(len(prices))`, note: "<p><code>\"latte\"</code> was new, so it was added. <code>\"tea\"</code> existed, so 8 became 9. Dictionaries remember the order in which keys were first added.</p>" },
    { t: "lines", rows: [
      ["prices = {\"tea\": 8}", "Start with one pair."],
      ["prices[\"latte\"] = 18", "No key <code>\"latte\"</code> yet → a new pair is added."],
      ["prices[\"tea\"] = 9", "Key <code>\"tea\"</code> exists → its value is replaced. Still only one <code>\"tea\"</code>: keys never repeat."],
    ] },
    { t: "check", q: "What does this print?", code: c`d = {"a": 1}
d["b"] = 2
d["a"] = 5
print(d)`, o: ["`{'a': 1, 'b': 2, 'a': 5}`", "`{'a': 5, 'b': 2}`", "`{'b': 2, 'a': 5}`", "`{'a': 6, 'b': 2}`"], a: 1, e: "`\"b\"` is added; `\"a\"` keeps its place but its value becomes 5. Keys are never duplicated." },

    { t: "h", text: "Missing keys: KeyError and get()" },
    { t: "p", html: "<p>What if the user asks for a drink that is not on the menu? <code>prices[\"pizza\"]</code> crashes the program with <code>KeyError</code>. Real programs must handle missing keys calmly. You have two tools: check first with <code>in</code>, or ask with <code>get()</code>.</p>" },
    { t: "code", code: c`prices = {"latte": 18, "tea": 8}
print(prices["pizza"])`, error: true, note: "<p>This error is expected: <code>KeyError: 'pizza'</code>. Keys are exact — <code>\"Tea\"</code> with a capital T would fail too.</p>" },
    { t: "analogy", title: "get() is like asking a polite friend", html: "<p>You ask a friend: \"What is Omar's number? If you don't have it, just say <i>unknown</i>.\" A good friend answers either way — no drama. <code>d.get(key, default)</code> does the same: it returns the value if the key exists, otherwise the default you gave (or <code>None</code> if you gave none).</p>" },
    { t: "code", code: c`prices = {"latte": 18, "tea": 8}
print(prices.get("tea"))
print(prices.get("pizza"))
print(prices.get("pizza", "not on the menu"))
print("latte" in prices)` },
    { t: "lines", rows: [
      ["prices.get(\"tea\")", "Key exists → its value, <code>8</code>."],
      ["prices.get(\"pizza\")", "Key missing, no default → <code>None</code> (Python's \"nothing\"). No crash."],
      ["prices.get(\"pizza\", \"not on the menu\")", "Key missing → the default you chose."],
      ["\"latte\" in prices", "<code>in</code> checks the <b>keys</b>: <code>True</code>. (It does not search the values.)"],
    ] },
    { t: "ar", html: "لو المفتاح غير موجود يحدث KeyError. استخدم{{g:|ي}} d.get(key, default) لتحصل{{g:|ي}} على قيمة بديلة بدون خطأ، أو تحقق{{g:|ي}} أولًا بـ in." },
    { t: "check", q: "What does this print?", code: c`stock = {"pen": 5}
print(stock.get("book", 0))`, o: ["`None`", "`0`", "`KeyError`", "`5`"], a: 1, e: "`\"book\"` is not a key, so `get` returns the default `0`." },

    { t: "h", text: "Deleting entries" },
    { t: "code", code: c`cart = {"milk": 2, "bread": 1, "dates": 3}
del cart["bread"]
removed = cart.pop("dates")
print(cart)
print("Removed", removed, "dates")`, before: "<p><code>del d[key]</code> removes a pair. <code>d.pop(key)</code> removes it <b>and gives back</b> the value, in case you still need it. Both raise <code>KeyError</code> if the key is missing.</p>" },

    { t: "h", text: "Looping over a dictionary" },
    { t: "p", html: "<p>A teacher wants to print every student's mark, the class average and the list of names. A <code>for</code> loop over a dictionary goes through its <b>keys</b>. Three methods give you other views: <code>keys()</code>, <code>values()</code> and <code>items()</code> — the last one gives <code>(key, value)</code> tuples, which you unpack exactly like yesterday.</p>" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
for name in marks:
    print(name)`, note: "<p>Looping over the dictionary itself gives the keys.</p>" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
print(sum(marks.values()) / len(marks))
for name, mark in marks.items():
    print(f"{name:<6}{mark}")` },
    { t: "lines", rows: [
      ["marks.values()", "Only the values: 95, 82, 90. <code>sum</code> adds them; divide by <code>len</code> for the average, <code>89.0</code>."],
      ["for name, mark in marks.items():", "<code>items()</code> gives pairs like <code>(\"Sara\", 95)</code>. Unpacking puts the key in <code>name</code> and the value in <code>mark</code>."],
      ["print(f\"{name:<6}{mark}\")", "<code>:&lt;6</code> pads the name to 6 characters (Day 4), so the marks line up."],
    ] },
    { t: "ar", html: "for k in d تمر على المفاتيح، و d.values() على القيم، و d.items() على الأزواج (مفتاح، قيمة) ونفكها في متغيرين." },
    { t: "check", q: "Which loop gives you each name AND its mark?", o: ["`for name, mark in marks:`", "`for name, mark in marks.items():`", "`for mark in marks.values():`", "`for name in marks.keys():`"], a: 1, e: "`items()` gives (key, value) pairs. Looping over `marks` alone gives only keys." },

    { t: "h", text: "Who is the best? max with key" },
    { t: "p", html: "<p><code>max(marks)</code> looks only at the <b>keys</b>, so it compares names alphabetically — not what you want. Give <code>max</code> a <code>key=</code>: a function that says <i>what to compare</i>. <code>marks.get</code> means \"compare each name by its mark\". The answer is still a key — the name with the largest value.</p>" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
print(max(marks))
print(max(marks, key=marks.get))
print(min(marks, key=marks.get))`, note: "<p><code>max(marks)</code> is <code>Sara</code> only because S comes last in the alphabet! The <code>key=marks.get</code> version is the real top student, and <code>min</code> works the same way. Notice: no parentheses after <code>get</code> — we hand over the tool, we don't call it.</p>" },
    { t: "check", q: "What does this print?", code: c`scores = {"Ali": 50, "Zed": 10}
print(max(scores))`, o: ["`Ali`", "`Zed`", "`50`", "`10`"], a: 1, e: "Without `key=`, `max` compares the keys as text: \"Zed\" > \"Ali\". To get Ali, write `max(scores, key=scores.get)`." },

    { t: "h", text: "The most important pattern: counting" },
    { t: "p", html: "<p>Word counts, vote counts, letter frequencies, product sales — they all use one pattern. The dictionary starts empty. For every item: if it is already a key, add 1 to its count; if not, create it with count 1.</p>" },
    { t: "viz", code: c`text = "red blue red green red blue"
counts = {}
for word in text.split():
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
print(counts)`, before: "<p>Visualize and watch the dictionary grow one word at a time.</p>" },
    { t: "code", code: c`counts = {}
for ch in "mississippi":
    counts[ch] = counts.get(ch, 0) + 1
print(counts)`, before: "<p>The same pattern in one line, using <code>get</code>:</p>" },
    { t: "lines", rows: [
      ["counts = {}", "An empty dictionary — nothing counted yet."],
      ["for ch in \"mississippi\":", "Visit each letter (Day 9)."],
      ["counts[ch] = counts.get(ch, 0) + 1", "Read the current count, or <b>0</b> if this letter is new; add 1; store it back. New and old keys handled by one line."],
    ] },
    { t: "ar", html: "نمط العدّ: counts[x] = counts.get(x, 0) + 1. لو المفتاح جديد يبدأ من صفر، ولو موجود نزيد عليه واحدًا." },
    { t: "check", q: "After this code, what is `counts`?", code: c`counts = {}
for ch in "aba":
    counts[ch] = counts.get(ch, 0) + 1`, o: ["`{'a': 1, 'b': 1}`", "`{'a': 2, 'b': 1}`", "`{'a': 2, 'b': 1, 'a': 1}`", "`KeyError`"], a: 1, e: "a → 1, b → 1, then a again → 2. `get(ch, 0)` avoids the KeyError on new letters." },

    { t: "steps", title: "Class election", problem: "<p>Students typed their votes on one line. Count the votes for each candidate, print every candidate with their votes (in order of first vote), and then announce the winner.</p>", stdin: "Sara Omar Sara Lina Omar Sara",
      steps: [
        { html: "<p><b>Understand.</b> Input: names separated by spaces. Output: one line per candidate, e.g. <code>Sara: 3</code>, then <code>Winner: Sara</code>.</p>" },
        { html: "<p><b>Plan.</b> Split the line into a list → count with a dictionary → loop over <code>items()</code> to print → <code>max</code> with <code>key=</code> for the winner.</p>" },
        { html: "<p><b>Build: count.</b></p>", code: c`votes = input().split()
counts = {}
for v in votes:
    counts[v] = counts.get(v, 0) + 1` },
        { html: "<p><b>Build: report.</b> Unpack each pair while looping.</p>", code: c`for name, n in counts.items():
    print(f"{name}: {n}")` },
        { html: "<p><b>Build: winner.</b> Compare names by their counts, not alphabetically.</p>", code: c`winner = max(counts, key=counts.get)
print("Winner:", winner)` },
      ],
      code: c`votes = input().split()
counts = {}
for v in votes:
    counts[v] = counts.get(v, 0) + 1
for name, n in counts.items():
    print(f"{name}: {n}")
winner = max(counts, key=counts.get)
print("Winner:", winner)`,
      ar: "قسّم{{g:|ي}} المشكلة: عدّ الأصوات بالقاموس، ثم اطبع{{g:|ي}} بـ items()، ثم الفائز بـ max مع key." },

    { t: "h", text: "Nested data" },
    { t: "p", html: "<p>Values can be anything: numbers, strings, lists — even other dictionaries. Read nested data from the outside in, one pair of brackets at a time.</p>" },
    { t: "code", code: c`course = {
    "code": "CS101",
    "students": ["Sara", "Omar"],
    "schedule": {"day": "Sunday", "time": "10:00"},
}
print(course["students"][1])
print(course["schedule"]["day"])`, note: "<p><code>course[\"students\"]</code> is a list, so <code>[1]</code> picks Omar. <code>course[\"schedule\"]</code> is a dictionary, so <code>[\"day\"]</code> gives Sunday. This is exactly what JSON data from web APIs looks like.</p>" },
    { t: "table", head: ["You write", "What it does"], rows: [["`d[k]`", "value of key k (KeyError if missing)"], ["`d[k] = v`", "add a new pair or replace the value"], ["`d.get(k, default)`", "value, or default if k is missing"], ["`k in d`", "is k a key?"], ["`del d[k]` / `d.pop(k)`", "remove (pop also returns the value)"], ["`d.keys()` / `d.values()` / `d.items()`", "keys / values / (key, value) pairs"], ["`max(d, key=d.get)`", "the key with the largest value"]] },
  ],
  mistakes: [
    { title: "KeyError", html: "Keys are exact and case-sensitive.", wrong: c`ages = {"sara": 19}
print(ages["Sara"])`, right: c`ages = {"sara": 19}
print(ages.get("Sara", "unknown"))`, ar: "المفاتيح حساسة لحالة الأحرف: \"sara\" و \"Sara\" مفتاحان مختلفان." },
    { title: "Counting with += on a new key", html: "<code>counts[x] += 1</code> must first read <code>counts[x]</code> — which does not exist the first time.", wrong: c`counts = {}
for ch in "hello":
    counts[ch] += 1`, right: c`counts = {}
for ch in "hello":
    counts[ch] = counts.get(ch, 0) + 1
print(counts)` },
    { title: "Looping over pairs without items()", html: "Looping over the dictionary gives only keys, so unpacking into two names fails.", wrong: c`marks = {"Sara": 95, "Omar": 82}
for name, mark in marks:
    print(name, mark)`, right: c`marks = {"Sara": 95, "Omar": 82}
for name, mark in marks.items():
    print(name, mark)` },
    { title: "Looking up by value", html: "<code>d[x]</code> finds by <b>key</b>. To find a key by value you must loop.", wrong: c`codes = {"CS": "Computer Science"}
print(codes["Computer Science"])`, right: c`codes = {"CS": "Computer Science"}
for k, v in codes.items():
    if v == "Computer Science":
        print(k)` },
    { title: "Lists as keys", html: "Keys must be immutable. Use a tuple (Day 11).", wrong: c`seats = {[1, 2]: "Sara"}`, right: c`seats = {(1, 2): "Sara"}
print(seats[(1, 2)])` },
  ],
  tricks: [
    { title: "Counter does counting for you", html: "<code>collections.Counter</code> is a ready-made counting dictionary. <code>most_common(n)</code> gives the top n pairs.", code: c`from collections import Counter
c = Counter("banana")
print(c.most_common(2))` },
    { title: "Dict comprehension", html: "Like the list comprehension from Day 10, but with <code>key: value</code>.", code: c`squares = {n: n * n for n in range(1, 6)}
print(squares)` },
    { title: "Sort a dict by value", html: "<code>sorted(d, key=d.get)</code> sorts the keys by their values; add <code>reverse=True</code> for highest first.", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
for name in sorted(marks, key=marks.get, reverse=True):
    print(name, marks[name])` },
  ],
  practice: [
    { t: "predict", code: c`d = {"a": 1, "b": 2}
d["a"] = 10
d["c"] = d["a"] + d["b"]
print(d)`, explain: "<code>\"a\"</code> is replaced by 10, then <code>\"c\"</code> is added with 10 + 2. Output: <code>{'a': 10, 'b': 2, 'c': 12}</code>." },
    { t: "predict", code: c`inv = {"pens": 5}
inv["pens"] += 3
print(inv.get("pens"), inv.get("books", 0))`, explain: "<code>\"pens\"</code> exists, so <code>+= 3</code> works: 8. <code>\"books\"</code> is missing, so the default 0. Output: <code>8 0</code>." },
    { t: "predict", code: c`ages = {"Sara": 19, "Omar": 21}
for k in ages:
    print(k)
print(19 in ages)`, explain: "Looping over a dictionary gives the keys: <code>Sara</code>, <code>Omar</code>. And <code>in</code> checks keys, not values, so <code>19 in ages</code> is <code>False</code>." },
    { t: "predict", code: c`counts = {}
for w in "go stop go go".split():
    counts[w] = counts.get(w, 0) + 1
print(counts["go"], len(counts))`, explain: "\"go\" appears 3 times; there are 2 different words. Output: <code>3 2</code>." },
    { t: "parsons", title: "Letter counter", prompt: "Count letters in a word with <code>get</code>.", lines: ["counts = {}", c`for ch in "hello":`, "    counts[ch] = counts.get(ch, 0) + 1", "print(counts)"], distractors: ["    counts[ch] += 1"], explain: "<code>counts[ch] += 1</code> crashes the first time a letter appears (KeyError)." },
    { t: "parsons", title: "Café bill", prompt: "Add up the price of an order using the menu dictionary, then print the total.", lines: [c`menu = {"latte": 18, "tea": 8, "cookie": 6}`, c`order = ["latte", "cookie", "latte"]`, "total = 0", "for item in order:", "    total += menu[item]", c`print("Total:", total)`], distractors: ["    total += menu.index(item)"], explain: "Each item name is a key; <code>menu[item]</code> gives its price. Dictionaries have no <code>index</code>. Output: <code>Total: 42</code>." },
    { t: "try", title: "Arabic–English mini dictionary", html: "<p>Add five words, then ask the user for an English word and print the Arabic (or <code>Not found</code>).</p>", code: c`words = {"book": "كتاب", "code": "رمز", "friend": "صديق"}
w = input("English word: ").lower()
print(words.get(w, "Not found"))`, stdin: "code" },
    { t: "try", title: "Your marks report", html: "<p>Put your own subjects and marks in the dictionary. Then add a line that prints your best subject with <code>max(..., key=...)</code>.</p>", code: c`marks = {"Math": 88, "English": 93, "Physics": 79}
for subject, mark in marks.items():
    print(f"{subject:<10}{mark}")
print("Average:", round(sum(marks.values()) / len(marks), 1))` },
  ],
  exercises: [
    { id: "phone", lvl: "seed", title: "Phone book", prompt: "<p>The starter has a phone book. Read a name and print the number, or <code>Unknown</code>.</p>", starter: c`book = {"Sara": "0501112222", "Omar": "0553334444", "Lina": "0555556666"}
`, tests: [{ stdin: "Omar", expected: "0553334444" }, { stdin: "Ali", expected: "Unknown" }],
      hint: "<code>book.get(name, \"Unknown\")</code> — or check with <code>in</code> first.",
      solutions: [{ name: "get", code: c`book = {"Sara": "0501112222", "Omar": "0553334444", "Lina": "0555556666"}
print(book.get(input(), "Unknown"))` }, { name: "in check", code: c`book = {"Sara": "0501112222", "Omar": "0553334444", "Lina": "0555556666"}
name = input()
if name in book:
    print(book[name])
else:
    print("Unknown")` }] },
    { id: "wordcount", lvl: "seed", title: "Word frequency", prompt: "<p>Read a sentence (ignore capitals) and print each word with its count, in order of first appearance, as <code>word: count</code>.</p><pre class=\"code-static\">Input: The cat and the hat\nthe: 2\ncat: 1\nand: 1\nhat: 1</pre>", tests: [{ stdin: "The cat and the hat", expected: "the: 2\ncat: 1\nand: 1\nhat: 1" }],
      hint: "The counting pattern, then a loop over <code>items()</code>.", ar: "استخدم{{g:|ي}} نمط العدّ بـ get ثم اطبع{{g:|ي}} الأزواج بـ items().",
      solutions: [{ name: "Counting pattern", code: c`counts = {}
for w in input().lower().split():
    counts[w] = counts.get(w, 0) + 1
for w, n in counts.items():
    print(f"{w}: {n}")` }, { name: "Counter", code: c`from collections import Counter
for w, n in Counter(input().lower().split()).items():
    print(f"{w}: {n}")` }] },
    { id: "topletter", lvl: "seed", title: "Most common letter", prompt: "<p>Read one word and print its most common letter and how many times it appears. If there is a tie, print the letter that appeared first.</p><pre class=\"code-static\">Input: banana\nOutput: a 3</pre>", tests: [{ stdin: "banana", expected: "a 3" }, { stdin: "abba", expected: "a 2" }, { stdin: "x", expected: "x 1" }],
      hint: "Count with a dictionary, then <code>max(counts, key=counts.get)</code>. On a tie, <code>max</code> keeps the first key it met.",
      solutions: [{ name: "Count + max", code: c`counts = {}
for ch in input():
    counts[ch] = counts.get(ch, 0) + 1
best = max(counts, key=counts.get)
print(best, counts[best])` }] },
    { id: "gradebook", lvl: "star", title: "Grade book", prompt: "<p>Read lines like <code>Sara 95</code> until the line <code>end</code>. Then print the class average (1 decimal) and the top student.</p><pre class=\"code-static\">Average: 89.0\nTop: Sara</pre>", tests: [{ stdin: "Sara 95\nOmar 82\nLina 90\nend", expected: "Average: 89.0\nTop: Sara" }],
      hint: "A <code>while True</code> loop with <code>break</code> (Day 8). Unpack each line: <code>name, mark = line.split()</code>.",
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
      hint: "Build a new dictionary whose keys are grades and whose values are <b>lists</b> of names.",
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
    { id: "stock", lvl: "star", title: "Shop stock", prompt: "<p>The starter has the stock of a small shop. Read sales like <code>pen 3</code> until <code>done</code>. Subtract each sale; if there is not enough, print <code>Not enough ITEM</code> and do not change the stock. Finally print every item and its stock in the starter's order.</p><pre class=\"code-static\">Input: pen 3, bag 5, book 1, done\nNot enough bag\npen: 7\nbook: 3\nbag: 2</pre>", starter: c`stock = {"pen": 10, "book": 4, "bag": 2}
`, tests: [{ stdin: "pen 3\nbag 5\nbook 1\ndone", expected: "Not enough bag\npen: 7\nbook: 3\nbag: 2" }, { stdin: "done", expected: "pen: 10\nbook: 4\nbag: 2" }],
      hint: "Unpack each line, convert the quantity with <code>int()</code>, compare with <code>stock[item]</code>.",
      solutions: [{ name: "Update in place", code: c`stock = {"pen": 10, "book": 4, "bag": 2}
while True:
    line = input()
    if line == "done":
        break
    item, qty = line.split()
    qty = int(qty)
    if stock[item] < qty:
        print("Not enough", item)
    else:
        stock[item] -= qty
for item, n in stock.items():
    print(f"{item}: {n}")` }] },
    { id: "cart", lvl: "fire", title: "Shopping cart", prompt: "<p>The menu is in the starter. Read orders like <code>latte 2</code> until <code>done</code>. Ignore items not on the menu (print <code>Unknown item: X</code>). Finally print each ordered item in order of first order with its total quantity, and the bill:</p><pre class=\"code-static\">latte x3\ntea x1\nTotal: 62 SAR</pre>", starter: c`menu = {"latte": 18, "tea": 8, "water": 3, "cookie": 6}
`, tests: [{ stdin: "latte 2\ntea 1\npizza 1\nlatte 1\ndone", expected: "Unknown item: pizza\nlatte x3\ntea x1\nTotal: 62 SAR" }],
      hint: "Two dictionaries: the menu (prices) and a cart (quantities) built with the counting pattern.",
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
    { q: "`\"Omar\" in {\"Sara\": \"Omar\"}` is…", o: ["`True`", "`False`", "An error", "`\"Omar\"`"], a: 1, e: "`in` checks keys only; \"Omar\" is a value here." },
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
    { f: "`d[k] = v` when k exists vs when k is new", b: "Exists: the value is replaced. New: a pair is added." },
  ],
  remember: [
    "A **dict** stores `key: value` pairs: `{\"tea\": 8, \"latte\": 18}`. Keys are unique and immutable.",
    "`d[k]` reads, `d[k] = v` adds or replaces; a missing key in `d[k]` gives **KeyError**.",
    "`d.get(k, default)` and `k in d` handle missing keys safely (`in` checks keys only).",
    "Loop with `for k in d`, `d.values()`, or `for k, v in d.items()`.",
    "Counting pattern: `counts[x] = counts.get(x, 0) + 1`.",
    "`max(d, key=d.get)` gives the key with the largest value — `max(d)` compares keys.",
  ],
  rememberAr: "القاموس يربط كل مفتاح بقيمة. استخدم{{g:|ي}} get لتجنب KeyError، و items() للمرور على الأزواج، ونمط العدّ counts.get(x, 0) + 1.",
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[11] = {
  title: "Tuples and sets",
  intro: "Lists are great, but not every collection should behave like a list. A <b>tuple</b> is a list you promise never to change — perfect for coordinates or a date. A <b>set</b> is a bag of unique items with lightning-fast membership checks — perfect for \"who attended?\" and \"what do these two groups share?\".",
  introAr: "الـ tuple مثل القائمة لكن لا يمكن تعديلها، والـ set مجموعة بلا تكرار وبلا ترتيب، ومفيدة جدًا لحذف التكرار وعمليات التقاطع والاتحاد.",
  goals: ["Create tuples and unpack them", "Explain when immutability is useful", "Use sets to remove duplicates and test membership", "Use set operations: union `|`, intersection `&`, difference `-`", "Choose between list, tuple and set"],
  learn: [
    { t: "h", text: "Tuples: a fixed group of values" },
    { t: "p", html: "<p>Some values belong together and should <b>never change</b>: today's date (year, month, day), the location of your house on a map (latitude, longitude), or the size of a classroom (rows, seats). You could store them in a list, but a list can be changed by accident — one wrong <code>append</code> and your date has four parts. Python has a safer box for this: the <b>tuple</b>.</p>" },
    { t: "analogy", title: "A tuple is like your ID card", html: "<p>Your ID card has your name, number and birth date printed together. You can <b>read</b> any line whenever you want, but you cannot erase one line and write a new one. A list is more like a whiteboard: easy to read, easy to change. A tuple is the printed card.</p>" },
    { t: "code", code: c`date = (2026, 9, 29)
print(date)
print(date[0])
print(date[-1])
print(len(date))`, before: "<p>A tuple uses <b>parentheses</b> <code>( )</code> instead of square brackets. Reading it works exactly like a list.</p>", note: "<p>Indexes, negative indexes and <code>len()</code> all work the same as on Day 10. Slices work too: <code>date[1:]</code> is <code>(9, 29)</code>.</p>" },
    { t: "lines", rows: [
      ["date = (2026, 9, 29)", "Create a tuple with three items and put the label <code>date</code> on it. The commas make the tuple; the parentheses group it."],
      ["print(date[0])", "Item at index 0 — the first one: <code>2026</code>."],
      ["print(date[-1])", "Negative index: count from the end. <code>-1</code> is the last item: <code>29</code>."],
      ["print(len(date))", "How many items: <code>3</code>."],
    ] },
    { t: "ar", html: "الـ tuple يُكتب بأقواس عادية ( ) ونقرأ عناصره بالفهرس مثل القائمة تمامًا، لكن لا يمكن تعديله بعد إنشائه." },
    { t: "check", q: "What does this print?", code: c`size = (6, 5)
print(size[1])`, o: ["`6`", "`5`", "`(6, 5)`", "An error"], a: 1, e: "Index 1 is the second item, so `5`.", hint: "Indexes start at 0." },

    { t: "h", text: "A tuple cannot change" },
    { t: "p", html: "<p>\"Cannot change\" is called <b>immutable</b>. It sounds like a limitation, but it is a promise: once your program creates <code>date</code>, no line anywhere can damage it. Tuples have no <code>append</code>, no <code>remove</code>, and you cannot assign to an index. If you try, Python stops you.</p>" },
    { t: "code", code: c`date = (2026, 9, 29)
date[0] = 2027`, error: true, note: "<p>This error is expected: <code>TypeError: 'tuple' object does not support item assignment</code>. The tuple protected itself.</p>" },
    { t: "code", code: c`date = (2026, 9, 29)
date = (2027, 9, 29)
print(date)`, before: "<p>You <b>can</b> still put the label on a completely new tuple. You are not editing the old one — you are making a new one.</p>" },
    { t: "p", html: "<p>One small surprise: a tuple with <b>one</b> item needs a comma. <code>(5)</code> is just the number 5 inside math parentheses, but <code>(5,)</code> is a tuple. The comma is what really makes a tuple.</p>" },
    { t: "code", code: c`a = (5)
b = (5,)
print(type(a))
print(type(b))` },
    { t: "ar", html: "الفاصلة هي التي تصنع الـ tuple وليست الأقواس: (5,) هو tuple من عنصر واحد، أما (5) فهو الرقم 5 فقط." },

    { t: "h", text: "Unpacking: open a tuple into names" },
    { t: "p", html: "<p><code>date[0]</code>, <code>date[1]</code>, <code>date[2]</code> work, but they do not say what each number means. <b>Unpacking</b> gives every item its own clear name in one line. You already used it on Day 2 when you swapped with <code>a, b = b, a</code> — that was a tuple all along!</p>" },
    { t: "code", code: c`date = (2026, 9, 29)
year, month, day = date
print(day, month, year)
print(f"{day}/{month}/{year}")` },
    { t: "lines", rows: [
      ["year, month, day = date", "Three names on the left, a tuple of three items on the right. Python matches them in order: <code>year</code> gets 2026, <code>month</code> gets 9, <code>day</code> gets 29."],
      ["print(day, month, year)", "Now the values have meaningful names. Prints <code>29 9 2026</code>."],
    ] },
    { t: "code", code: c`minutes, seconds = divmod(135, 60)
print(minutes, "min", seconds, "sec")
low, high = min(4, 9, 1), max(4, 9, 1)
print(low, high)`, before: "<p>Remember <code>divmod</code> from Day 3? It gives back a tuple of two values, so you can unpack them straight away. Writing two values with a comma on the right also makes a tuple.</p>" },
    { t: "p", html: "<p>The number of names must match the number of items. <code>a, b = (1, 2, 3)</code> gives <code>ValueError: too many values to unpack</code>.</p>" },
    { t: "ar", html: "فك التغليف unpacking: نكتب أسماء بعدد العناصر على اليسار، فيأخذ كل اسم عنصرًا بالترتيب. لو اختلف العدد يحدث ValueError." },
    { t: "check", q: "What happens here?", code: c`x, y, z = (1, 2)`, o: ["x=1, y=2, z=0", "x=1, y=2, z is empty", "`ValueError`: not enough values", "x=(1, 2)"], a: 2, e: "Three names but only two items — Python cannot match them, so it raises `ValueError`." },

    { t: "h", text: "Sets: a bag of unique items" },
    { t: "p", html: "<p>Imagine the library door scanner. Sara enters, goes out for coffee, and enters again — the scanner now has her name twice. If the librarian asks \"how many <b>different</b> students came today?\", a list gives the wrong answer. A <b>set</b> keeps each item only once, automatically.</p>" },
    { t: "analogy", title: "A set is like a guest list", html: "<p>At a wedding, the guest list has each name once. Writing \"Omar\" again changes nothing — he is already on it. And the list has no \"first guest\" or \"third guest\"; the only question that matters is <b>\"is this person on the list?\"</b>. That is a set: no duplicates, no positions, very fast <code>in</code>.</p>" },
    { t: "code", code: c`visitors = {"Sara", "Omar", "Sara", "Lina", "Omar"}
print(len(visitors))
print("Omar" in visitors)
print("Faisal" in visitors)`, before: "<p>Sets use <b>curly braces</b> <code>{ }</code>.</p>", note: "<p>Five names were written, but only <b>3</b> are kept. If you print a set, the order may look random — sets do not remember order.</p>" },
    { t: "code", code: c`scans = [101, 205, 101, 330, 205, 101]
unique = set(scans)
print(len(scans), "scans")
print(len(unique), "different students")
print(sorted(unique))`, before: "<p>The most common use: turn a list with repeats into a set.</p>" },
    { t: "lines", rows: [
      ["unique = set(scans)", "<code>set()</code> takes the list and keeps one copy of each value: 101, 205 and 330."],
      ["print(len(unique), ...)", "<code>len</code> works on sets: 3 different students."],
      ["print(sorted(unique))", "A set has no order, so we use <code>sorted()</code> to get a neat list: <code>[101, 205, 330]</code>. <code>unique[0]</code> would fail — sets have no indexes."],
    ] },
    { t: "ar", html: "الـ set لا يحتوي على تكرار ولا ترتيب ثابت، لذلك لا يمكن استخدام الفهرس [0] معه. أنشئ{{g:|ي}} مجموعة فارغة بـ set() وليس {} لأن {} قاموس فارغ." },
    { t: "check", q: "What does this print?", code: c`print(len(set("banana")))`, o: ["`6`", "`3`", "`2`", "`1`"], a: 1, e: "The different letters are b, a and n — three of them.", hint: "Write the letters of banana and cross out the repeats." },

    { t: "h", text: "Changing a set: add and discard" },
    { t: "p", html: "<p>Unlike tuples, sets can grow and shrink. <code>add(x)</code> puts an item in (nothing happens if it is already there). <code>discard(x)</code> takes it out (nothing happens if it is missing). <code>remove(x)</code> also takes it out, but crashes with <code>KeyError</code> if it is missing. To start with an empty set, write <code>set()</code>.</p>" },
    { t: "viz", code: c`seen = set()
for card in [7, 3, 7, 9, 3]:
    if card in seen:
        print(card, "again!")
    else:
        seen.add(card)
print(len(seen), "different cards")`, before: "<p>This is the <b>seen set</b> pattern: remember what you have met, and check new items with fast <code>in</code>. Visualize it and watch <code>seen</code> grow.</p>" },
    { t: "check", q: "What is printed?", code: c`s = {1, 2}
s.add(2)
s.add(3)
s.discard(10)
print(len(s))`, o: ["`2`", "`3`", "`4`", "`KeyError`"], a: 1, e: "Adding 2 again changes nothing, 3 is new, and discarding a missing 10 is safe. The set is {1, 2, 3}." },

    { t: "h", text: "Set operations: compare two groups" },
    { t: "p", html: "<p>The real power of sets is comparing groups. Which students are in <b>both</b> clubs? Who is in <b>at least one</b>? Who is only in the Python club? With lists you would need loops; with sets it is one symbol.</p>" },
    { t: "analogy", title: "Venn diagrams from math class", html: "<p>Draw two overlapping circles: the Python club and the AI club. The middle part is <code>&amp;</code> (both). Everything inside the circles is <code>|</code> (either). The left part without the middle is <code>-</code> (only Python). The two outer parts without the middle are <code>^</code> (exactly one).</p>" },
    { t: "code", code: c`python_club = {"Sara", "Omar", "Lina", "Nora"}
ai_club = {"Omar", "Nora", "Faisal"}
print("Both:", sorted(python_club & ai_club))
print("Any:", sorted(python_club | ai_club))
print("Only Python:", sorted(python_club - ai_club))
print("Exactly one:", sorted(python_club ^ ai_club))`, note: "<p>We wrap each result in <code>sorted()</code> only so the output is in a fixed, readable order.</p>" },
    { t: "lines", rows: [
      ["python_club & ai_club", "<b>Intersection</b>: names in both sets — Nora and Omar."],
      ["python_club | ai_club", "<b>Union</b>: names in either set, each once — all five students."],
      ["python_club - ai_club", "<b>Difference</b>: in the first set but not the second — Lina and Sara. Order matters: <code>ai_club - python_club</code> is just Faisal."],
      ["python_club ^ ai_club", "<b>Symmetric difference</b>: in exactly one of them — Faisal, Lina and Sara."],
    ] },
    { t: "table", head: ["Operator", "Method", "Meaning"], rows: [["`a | b`", "`a.union(b)`", "in a or b"], ["`a & b`", "`a.intersection(b)`", "in both"], ["`a - b`", "`a.difference(b)`", "in a but not b"], ["`a ^ b`", "`a.symmetric_difference(b)`", "in exactly one"]] },
    { t: "ar", html: "&amp; = المشترك بين المجموعتين، | = كل العناصر بدون تكرار، - = الموجود في الأولى فقط. وانتبه{{g:|ي}}: الإشارة + لا تعمل مع المجموعات." },
    { t: "check", q: "What does this print?", code: c`print(sorted({1, 2, 3, 4} - {2, 4, 6}))`, o: ["`[1, 3]`", "`[1, 3, 6]`", "`[2, 4]`", "`[6]`"], a: 0, e: "Difference keeps items of the first set that are not in the second: 1 and 3. The 6 is only in the second set, so it is ignored." },

    { t: "steps", title: "Club report", problem: "<p>The student council typed the members of two clubs, each on one line. Print the members in <b>both</b> clubs (sorted, joined with commas) and how many <b>different</b> students are in the clubs altogether.</p>", stdin: "Sara Omar Lina Nora\nOmar Nora Faisal",
      steps: [
        { html: "<p><b>Understand.</b> Input: two lines of names. Output: the shared names and one number. \"Shared\" means intersection; \"different students altogether\" means the size of the union.</p>" },
        { html: "<p><b>Plan.</b> Read each line, split it into a list, and turn the list into a set. Then use <code>&amp;</code> and <code>|</code>.</p>" },
        { html: "<p><b>Build: read the data.</b></p>", code: c`club_a = set(input().split())
club_b = set(input().split())` },
        { html: "<p><b>Build: compare.</b> <code>sorted()</code> gives a list, and <code>\", \".join()</code> (Day 10) turns it into one line of text.</p>", code: c`both = sorted(club_a & club_b)
print("In both:", ", ".join(both))
print("Different students:", len(club_a | club_b))` },
        { html: "<p><b>Test.</b> Sara, Omar, Lina, Nora + Omar, Nora, Faisal → shared: Nora, Omar. Altogether 4 + 3 − 2 = 5 students. ✓</p>" },
      ],
      code: c`club_a = set(input().split())
club_b = set(input().split())
both = sorted(club_a & club_b)
print("In both:", ", ".join(both))
print("Different students:", len(club_a | club_b))`,
      ar: "اقرأ{{g:|ي}} كل سطر وحوّله إلى set، ثم استخدم{{g:|ي}} &amp; للمشترك و | للمجموع بدون تكرار." },

    { t: "h", text: "Which collection should I use?" },
    { t: "p", html: "<p>Ask yourself two questions. <b>Will it change?</b> If not, a tuple protects it. <b>Do order and repeats matter?</b> If you only care about \"which items, each once\" and fast <code>in</code>, use a set. Otherwise, a list is the everyday choice.</p>" },
    { t: "table", head: ["", "list `[ ]`", "tuple `( )`", "set `{ }`"], rows: [["ordered, has indexes", "yes", "yes", "no"], ["changeable", "yes", "no", "yes (add/discard)"], ["duplicates", "allowed", "allowed", "removed"], ["use for", "a changing sequence", "a fixed record", "uniqueness, fast `in`"]] },
    { t: "check", q: "An app must store which users liked a post (each user once) and quickly answer \"did Sara like it?\". Which collection fits best?", o: ["list", "tuple", "set", "a string"], a: 2, e: "Each user once and a fast `in` check — exactly what a set is for." },
  ],
  mistakes: [
    { title: "{} is not an empty set", html: "Empty curly braces make an empty <b>dictionary</b> (tomorrow's topic). Use <code>set()</code>.", wrong: c`s = {}
s.add(1)   # AttributeError: dict`, right: c`s = set()
s.add(1)`, ar: "المجموعة الفارغة تُكتب set() وليس {}." },
    { title: "Indexing a set", html: "Sets have no order, so no index. Sort first if you need positions.", wrong: c`s = {3, 1, 2}
print(s[0])`, right: c`s = {3, 1, 2}
print(sorted(s)[0])` },
    { title: "Trying to change a tuple", html: "Tuples are immutable. Build a new tuple instead (or use a list if the data really must change).", wrong: c`t = (1, 2, 3)
t[0] = 9`, right: c`t = (1, 2, 3)
t = (9,) + t[1:]
print(t)` },
    { title: "Using + to join two sets", html: "<code>+</code> works for lists and tuples, not sets. Use <code>|</code> (union).", wrong: c`a = {1, 2}
b = {2, 3}
print(a + b)`, right: c`a = {1, 2}
b = {2, 3}
print(sorted(a | b))` },
    { title: "Forgetting the comma in a one-item tuple", html: "<code>(\"CS101\")</code> is just a string in parentheses.", wrong: c`courses = ("CS101")
print(len(courses))   # 5 letters!`, right: c`courses = ("CS101",)
print(len(courses))   # 1 course` },
  ],
  tricks: [
    { title: "Fast membership", html: "<code>x in some_set</code> is almost instant even with a million items; <code>x in some_list</code> checks one by one. If you check membership many times, convert to a set once." },
    { title: "Count unique items in one line", html: "<code>set()</code> removes repeats, <code>len()</code> counts what is left.", code: c`print(len(set("mississippi")))   # 4` },
    { title: "Remove duplicates but keep the order", html: "<code>set()</code> loses the order. The seen-set loop keeps the first appearance of each item in place.", code: c`names = ["Omar", "Sara", "Omar", "Lina", "Sara"]
seen = set()
unique = []
for n in names:
    if n not in seen:
        seen.add(n)
        unique.append(n)
print(unique)   # ['Omar', 'Sara', 'Lina']` },
    { title: "Check several options with a tuple", html: "<code>in</code> with a small tuple replaces a long chain of <code>or</code>.", code: c`answer = "y"
if answer in ("y", "yes", "ok"):
    print("Confirmed")` },
  ],
  practice: [
    { t: "predict", code: c`a = {1, 2, 3, 4}
b = {3, 4, 5}
print(sorted(a & b), sorted(a - b), len(a | b))`, explain: "Both sets have 3 and 4. Only <code>a</code> has 1 and 2. Together they have 1, 2, 3, 4, 5 — five items. Output: <code>[3, 4] [1, 2] 5</code>." },
    { t: "predict", code: c`x, y = 1, 2
x, y = y, x + y
x, y = y, x + y
print(x, y)`, explain: "The right side is calculated first, using the old values: (1,2) → (2,3) → (3,5). Tuple unpacking makes Fibonacci easy!" },
    { t: "predict", code: c`point = (4, 7)
x, y = point
print(x + y, point[1] - point[0])`, explain: "Unpacking gives x = 4 and y = 7, so 4 + 7 = <code>11</code>. <code>point[1] - point[0]</code> is 7 − 4 = <code>3</code>." },
    { t: "predict", code: c`tags = ["ai", "web", "ai", "data", "web", "ai"]
print(len(tags), len(set(tags)))`, explain: "The list has 6 items; the set keeps ai, web and data. Output: <code>6 3</code>." },
    { t: "parsons", title: "Common interests", prompt: "Print the interests two friends share, sorted.", lines: [c`sara = {"chess", "coding", "reading", "art"}`, c`omar = {"football", "coding", "art"}`, "shared = sara & omar", "print(sorted(shared))"], distractors: ["shared = sara + omar"], explain: "<code>+</code> does not work on sets; <code>&amp;</code> is intersection. Output: <code>['art', 'coding']</code>." },
    { t: "parsons", title: "Spot the repeat", prompt: "Print every scanned ID that was already scanned before.", lines: ["seen = set()", "for code in [12, 40, 12, 7, 40]:", "    if code in seen:", "        print(\"Repeat:\", code)", "    seen.add(code)"], distractors: ["seen = {}"], explain: "Check first, then add. <code>{}</code> would make a dictionary, which has no <code>add</code>. Output: <code>Repeat: 12</code> and <code>Repeat: 40</code>." },
    { t: "try", title: "Anagram checker", html: "<p>Two words are anagrams if they use the same letters. Is comparing <code>set(a) == set(b)</code> enough? Test <code>\"listen\"/\"silent\"</code> and <code>\"aab\"/\"abb\"</code>. Then try <code>sorted(a) == sorted(b)</code>.</p>", code: c`a = "listen"
b = "silent"
print(set(a) == set(b))
print(sorted(a) == sorted(b))` },
    { t: "try", title: "Cities you and a friend visited", html: "<p>Change the two sets to real cities. Then print the cities only your friend visited, and how many cities you visited altogether.</p>", code: c`me = {"Riyadh", "Jeddah", "Abha", "Dubai"}
friend = {"Riyadh", "Cairo", "Dubai"}
print("Both:", sorted(me & friend))
print("Only me:", sorted(me - friend))` },
  ],
  exercises: [
    { id: "unique", lvl: "seed", title: "How many unique?", prompt: "<p>Read words on one line and print how many <b>different</b> words there are (ignore capital letters).</p><pre class=\"code-static\">Input: Red blue red GREEN blue\nOutput: 3</pre>", tests: [{ stdin: "Red blue red GREEN blue", expected: "3" }, { stdin: "a", expected: "1" }],
      hint: "<code>lower()</code>, then <code>split()</code>, then <code>set()</code>, then <code>len()</code>.", ar: "حوّل{{g:|ي}} النص لحروف صغيرة أولًا حتى تصبح Red و red كلمة واحدة.",
      solutions: [{ name: "set", code: c`words = input().lower().split()
print(len(set(words)))` }] },
    { id: "swapdate", lvl: "seed", title: "Date formatter", prompt: "<p>Read a date as <code>YYYY-MM-DD</code>, unpack it into three variables and print it as <code>DD/MM/YYYY</code>.</p><pre class=\"code-static\">Input: 2026-09-29\nOutput: 29/09/2026</pre>", tests: [{ stdin: "2026-09-29", expected: "29/09/2026" }],
      hint: "<code>split(\"-\")</code> gives three parts. Unpack them: <code>year, month, day = ...</code>",
      solutions: [{ name: "Unpacking", code: c`year, month, day = input().split("-")
print(f"{day}/{month}/{year}")` }, { name: "Indexes", code: c`parts = input().split("-")
print(parts[2] + "/" + parts[1] + "/" + parts[0])` }] },
    { id: "minmax", lvl: "seed", title: "Lowest and highest", prompt: "<p>Read marks on one line. Make a tuple <code>result = (lowest, highest)</code>, unpack it into two variables and print:</p><pre class=\"code-static\">Input: 78 95 60 88\nLow: 60, High: 95</pre>", tests: [{ stdin: "78 95 60 88", expected: "Low: 60, High: 95" }, { stdin: "50", expected: "Low: 50, High: 50" }],
      hint: "Convert to numbers first: <code>[int(x) for x in input().split()]</code>. Then <code>min()</code> and <code>max()</code>.", ar: "حوّل{{g:|ي}} الدرجات إلى أرقام قبل min و max، وإلا ستُقارن كنصوص.",
      solutions: [{ name: "Tuple + unpack", code: c`marks = [int(x) for x in input().split()]
result = (min(marks), max(marks))
low, high = result
print(f"Low: {low}, High: {high}")` }, { name: "Direct unpack", code: c`marks = [int(x) for x in input().split()]
low, high = min(marks), max(marks)
print(f"Low: {low}, High: {high}")`, note: "The right side is a tuple even without parentheses." }] },
    { id: "common", lvl: "star", title: "Shared courses", prompt: "<p>Line 1: courses of student A. Line 2: courses of student B (codes separated by spaces). Print three lines, each sorted and space-separated: shared courses, courses only A takes, and all courses.</p><pre class=\"code-static\">Input:\nIS201 CS101 MATH111\nCS101 PHYS101 MATH111\nOutput:\nShared: CS101 MATH111\nOnly A: IS201\nAll: CS101 IS201 MATH111 PHYS101</pre>", tests: [{ stdin: "IS201 CS101 MATH111\nCS101 PHYS101 MATH111", expected: "Shared: CS101 MATH111\nOnly A: IS201\nAll: CS101 IS201 MATH111 PHYS101" }],
      hint: "<code>&amp;</code>, <code>-</code> and <code>|</code>, then <code>\" \".join(sorted(...))</code>.",
      solutions: [{ name: "Set operators", code: c`a = set(input().split())
b = set(input().split())
print("Shared:", " ".join(sorted(a & b)))
print("Only A:", " ".join(sorted(a - b)))
print("All:", " ".join(sorted(a | b)))` }] },
    { id: "pangram", lvl: "star", title: "Pangram", prompt: "<p>A pangram uses every letter a–z at least once. Read a sentence and print <code>Pangram</code> or <code>Missing: …</code> with the missing letters in alphabetical order (no spaces).</p>", tests: [{ stdin: "The quick brown fox jumps over the lazy dog", expected: "Pangram" }, { stdin: "Hello world", expected: "Missing: abcfgijkmnpqstuvxyz" }],
      hint: "Make a set of all 26 letters and subtract the set of letters in the sentence.",
      solutions: [{ name: "Set difference", code: c`import string
letters = set(input().lower())
missing = set(string.ascii_lowercase) - letters
if missing:
    print("Missing:", "".join(sorted(missing)))
else:
    print("Pangram")`, note: "<code>string.ascii_lowercase</code> is <code>\"abcdefghijklmnopqrstuvwxyz\"</code>." }, { name: "Loop over the alphabet", code: c`s = input().lower()
missing = ""
for ch in "abcdefghijklmnopqrstuvwxyz":
    if ch not in s:
        missing += ch
print("Missing: " + missing if missing else "Pangram")` }] },
    { id: "dupes", lvl: "star", title: "Duplicate IDs", prompt: "<p>Read student IDs on one line. Print the IDs that appear more than once, sorted and space-separated, as <code>Duplicates: …</code>. If there are none, print <code>No duplicates</code>.</p><pre class=\"code-static\">Input: 205 101 330 101 205 101\nOutput: Duplicates: 101 205</pre>", tests: [{ stdin: "205 101 330 101 205 101", expected: "Duplicates: 101 205" }, { stdin: "1 2 3", expected: "No duplicates" }],
      hint: "Two sets: <code>seen</code> (met once) and <code>dupes</code> (met again). A set of dupes means 101 is listed only once even if it appears three times.", ar: "استخدم{{g:|ي}} مجموعتين: واحدة لما رأيته، وواحدة للمكرر.",
      solutions: [{ name: "Two sets", code: c`seen = set()
dupes = set()
for x in input().split():
    if x in seen:
        dupes.add(x)
    seen.add(x)
if dupes:
    print("Duplicates:", " ".join(sorted(dupes)))
else:
    print("No duplicates")`, note: "Sorting strings works here because all IDs have the same number of digits. For mixed lengths, convert to <code>int</code> first." }, { name: "count()", code: c`ids = input().split()
dupes = set()
for x in ids:
    if ids.count(x) > 1:
        dupes.add(x)
if dupes:
    print("Duplicates:", " ".join(sorted(dupes)))
else:
    print("No duplicates")`, note: "Simpler to read, but <code>count()</code> scans the whole list every time — slower for big inputs." }] },
    { id: "firstrep", lvl: "fire", title: "First repeated character", prompt: "<p>Read a word and print the first character that appears for the <b>second</b> time while reading left to right. Print <code>None</code> if nothing repeats.</p>", tests: [{ stdin: "programming", expected: "r" }, { stdin: "abcdef", expected: "None" }, { stdin: "abba", expected: "b" }],
      hint: "The seen-set pattern from the lesson, plus <code>break</code> when you find the first repeat.",
      solutions: [{ name: "Seen set", code: c`seen = set()
answer = None
for ch in input():
    if ch in seen:
        answer = ch
        break
    seen.add(ch)
print(answer)`, note: "The \"seen set\" pattern: remember what you've met, check with fast <code>in</code>. You will reuse this pattern many times." }] },
    { id: "fix11", lvl: "fire", debug: true, title: "Attendance bug", prompt: "<p>Print the students who were absent (registered but not in the attendance list), sorted, one per line. Expected: <code>Faisal</code> then <code>Nora</code>.</p>", starter: c`registered = ["Sara", "Omar", "Nora", "Faisal", "Lina"]
present = ["Omar", "Sara", "Lina", "Omar"]
absent = {}
for s in registered:
    if s not in present:
        absent.append(s)
for s in absent.sort():
    print(s)`, tests: [{ expected: "Faisal\nNora" }],
      hint: "Two bugs: <code>{}</code> is not an empty list, and <code>sort()</code> returns <code>None</code>.", ar: "{} ليست قائمة فارغة، و sort() لا ترجع شيئًا. استخدم{{g:|ي}} [] و sorted().",
      solutions: [{ name: "Fixed list", code: c`registered = ["Sara", "Omar", "Nora", "Faisal", "Lina"]
present = ["Omar", "Sara", "Lina", "Omar"]
absent = []
for s in registered:
    if s not in present:
        absent.append(s)
for s in sorted(absent):
    print(s)` }, { name: "Sets", code: c`registered = ["Sara", "Omar", "Nora", "Faisal", "Lina"]
present = ["Omar", "Sara", "Lina", "Omar"]
for s in sorted(set(registered) - set(present)):
    print(s)`, note: "The whole problem is one set difference." }] },
  ],
  quiz: [
    { q: "Which creates an empty set?", o: ["`{}`", "`set()`", "`[]`", "`()`"], a: 1, e: "`{}` is an empty dict." },
    { q: "`len({1, 1, 2, 2, 3})` is…", o: ["5", "3", "2", "An error"], a: 1, e: "Duplicates disappear." },
    { q: "Which cannot be changed after creation?", o: ["list", "set", "tuple", "all can"], a: 2, e: "Tuples are immutable." },
    { q: "`{1, 2, 3} - {2, 5}` is…", o: ["`{1, 3}`", "`{1, 3, 5}`", "`{2}`", "`{5}`"], a: 0, e: "Items of the first set not in the second." },
    { q: "`a, b = (4, 5)` gives `b` =", o: ["4", "5", "(4, 5)", "Error"], a: 1, e: "Tuple unpacking." },
    { q: "What is `type((3,))`?", o: ["`int`", "`tuple`", "`list`", "`set`"], a: 1, e: "The comma makes it a one-item tuple." },
  ],
  puzzle: { title: "Club logic", q: "<p>30 students take Python, 25 take AI, and 10 take both. How many students take at least one of them? (Think sets: |A ∪ B| = |A| + |B| − |A ∩ B|.)</p>", answers: ["45"], hint: "The 10 are counted twice if you simply add.", ar: "الطلاب المشتركون محسوبون مرتين.", e: "30 + 25 − 10 = <b>45</b>. This is the inclusion–exclusion principle from discrete math, exactly what <code>len(a | b)</code> computes." },
  cards: [
    { f: "Tuple vs list", b: "Tuple: immutable, `( )`. List: changeable, `[ ]`." },
    { f: "Remove duplicates from a list", b: "`set(lst)` (order lost) or a seen-set loop (order kept)." },
    { f: "Set intersection / union / difference", b: "`a & b`, `a | b`, `a - b`" },
    { f: "Empty set?", b: "`set()` — not `{}`." },
    { f: "A tuple with one item", b: "`(5,)` — the comma makes the tuple. `(5)` is just 5." },
    { f: "Unpack the tuple `date = (2026, 9, 29)`", b: "`year, month, day = date`" },
  ],
  remember: [
    "A **tuple** `(2026, 9, 29)` is read like a list but can never change (immutable).",
    "A one-item tuple needs a comma: `(5,)`.",
    "**Unpacking** gives each item a name: `year, month, day = date` — the counts must match.",
    "A **set** `{\"a\", \"b\"}` keeps each item once, has no order and no indexes. Empty set: `set()`.",
    "`set(lst)` removes duplicates; `x in my_set` is very fast; `add` / `discard` change a set.",
    "`a & b` both · `a | b` either · `a - b` only in a · `a ^ b` exactly one.",
  ],
  rememberAr: "الـ tuple ثابت لا يتغير، والـ set بلا تكرار وبلا ترتيب. نستخدم set لحذف التكرار وللمقارنة بين مجموعتين بـ &amp; و | و -.",
};
})();

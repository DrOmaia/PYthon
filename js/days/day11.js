window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[11] = {
  title: "Tuples and sets",
  intro: "Lists are great, but not every collection should behave like a list. A <b>tuple</b> is a list you promise never to change — perfect for coordinates or a date. A <b>set</b> is a bag of unique items with lightning-fast membership checks — perfect for \"who attended?\" and \"what do these two groups share?\".",
  introAr: "الـ tuple مثل القائمة لكن لا يمكن تعديلها، والـ set مجموعة بلا تكرار وبلا ترتيب، ومفيدة جدًا لحذف التكرار وعمليات التقاطع والاتحاد.",
  goals: ["Create tuples and unpack them", "Explain when immutability is useful", "Use sets to remove duplicates and test membership", "Use set operations: union `|`, intersection `&`, difference `-`", "Choose between list, tuple and set"],
  learn: [
    { t: "h", text: "Why more than one kind of collection?" },
    { t: "p", html: "<p>Yesterday's lists can do almost anything: grow, shrink, change, hold duplicates. But sometimes that freedom is exactly what you do <b>not</b> want. A date like 29/9/2026 should never lose its month by accident. And when you ask \"which students attended?\", you want every name <b>once</b>, no matter how many times it was written down. Python gives you two more collections for these jobs: the <b>tuple</b> (a fixed group that cannot change) and the <b>set</b> (a group of unique items).</p>" },
    { t: "analogy", title: "A printed card and a guest list", html: "<p>A <b>tuple</b> is like your university ID card: name, ID number and major are printed on it. You read it, but you cannot erase one line and write another — you would need a new card. A <b>set</b> is like the guest list at the door of an event: each person is on it once, the order does not matter, and the guard only cares about one question: <i>is this name on the list?</i></p>" },
    { t: "ar", html: "الـ tuple مجموعة ثابتة لا يمكن تعديلها بعد إنشائها، والـ set مجموعة عناصر فريدة بلا تكرار وبلا ترتيب. كل واحدة منهما مناسبة لمهمة مختلفة عن القائمة." },

    { t: "h", text: "Tuples: fixed groups of values" },
    { t: "code", code: c`point = (3, 7)
date = (2026, 9, 29)
print(point[0], date[-1])
print(len(date))
print(date[0:2])`, before: "<p>A tuple is written with <b>round brackets</b> <code>( )</code> instead of square ones. Reading it works just like a list. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>point = (3, 7)</code> is a tuple of two numbers, like an (x, y) position on a map.</li><li><code>date = (2026, 9, 29)</code> groups year, month and day into one value.</li><li><code>point[0]</code> is <code>3</code> and <code>date[-1]</code> is <code>29</code>: indexes work exactly as with lists and strings, starting from 0, with negatives from the end.</li><li><code>len(date)</code> is <code>3</code>, and the slice <code>date[0:2]</code> gives a new tuple <code>(2026, 9)</code>.</li></ul><p>So far a tuple looks just like a list with different brackets. The difference appears when you try to change it.</p>" },
    { t: "code", code: c`date = (2026, 9, 29)
date[1] = 10`, expectError: true, before: "<p>Let's try to change the month. This example crashes on purpose — read the error message.</p>", note: "<p>Python stops with <code>TypeError: 'tuple' object does not support item assignment</code>. In plain words: \"you cannot assign a new value to one item of a tuple\". Tuples are <b>immutable</b>: there is no <code>append</code>, <code>insert</code>, <code>remove</code> or <code>pop</code> either. Why is that useful? It <b>protects</b> data that should never change by accident, and it tells anyone reading your code \"this group is fixed\". If you really need a different date, you create a new tuple: <code>date = (2026, 10, 29)</code>.</p>" },
    { t: "code", code: c`single = (5,)
not_tuple = (5)
print(type(single), len(single))
print(type(not_tuple))`, before: "<p>A small trap: how do you write a tuple with only <b>one</b> item? Run it and compare the two types.</p>", note: "<p>Line by line:</p><ul><li><code>(5,)</code> — the <b>comma</b> is what makes a tuple. Its type is <code>&lt;class 'tuple'&gt;</code> and its length is 1.</li><li><code>(5)</code> without a comma is just the number 5 in brackets, like in math <code>(2 + 3)</code>. Its type is <code>&lt;class 'int'&gt;</code>.</li></ul><p>Rule to remember: for a one-item tuple, always add the trailing comma.</p>" },
    { t: "ar", html: "الـ tuple تُكتب بين قوسين ( ) وتُقرأ بالفهرس مثل القائمة، لكن لا يمكن تعديلها بعد إنشائها (TypeError). وانتبه{{g:|ي}}: الـ tuple ذات العنصر الواحد تحتاج فاصلة: (5,)." },

    { t: "h", text: "Unpacking: one tuple into several variables" },
    { t: "code", code: c`date = (2026, 9, 29)
year, month, day = date
print(year)
print(f"{day}/{month}/{year}")`, before: "<p><b>Unpacking</b> takes the items of a tuple and puts each one into its own variable, in one line. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>year, month, day = date</code>: Python matches the names on the left with the items on the right, in order. <code>year</code> gets 2026, <code>month</code> gets 9, <code>day</code> gets 29.</li><li>Now each part has a clear name, which is easier to read than <code>date[2]</code>.</li><li>The f-string (Day 4) prints <code>29/9/2026</code>.</li></ul><p>The number of names must equal the number of items. <code>year, month = date</code> would crash with <code>ValueError: too many values to unpack</code>. Unpacking also works on lists, like the result of <code>split()</code>: <code>y, m, d = \"2026-09-29\".split(\"-\")</code>.</p>" },
    { t: "code", code: c`x = 1
y = 2
x, y = y, x
print(x, y)`, before: "<p>A famous Python trick: swapping two variables. Predict the output.</p>", note: "<p>On the right side, <code>y, x</code> builds a tuple <code>(2, 1)</code> <b>first</b>, using the old values. Then the left side unpacks it: <code>x</code> gets 2 and <code>y</code> gets 1. Output: <code>2 1</code>. Without tuples you would need a third temporary variable. Writing values separated by commas, even without brackets, creates a tuple: <code>t = 1, 2</code> is the same as <code>t = (1, 2)</code>.</p>" },
    { t: "code", code: c`result = divmod(17, 5)
print(result)
q, r = divmod(17, 5)
print("quotient", q, "remainder", r)`, before: "<p>Some functions give back <b>two answers</b> at once — as a tuple. The built-in <code>divmod</code> gives the results of <code>//</code> and <code>%</code> (Day 3) together.</p>", note: "<p>Line by line:</p><ul><li><code>divmod(17, 5)</code> returns one tuple holding <code>17 // 5</code> and <code>17 % 5</code>: <code>(3, 2)</code>.</li><li>Usually we unpack it straight away: <code>q, r = divmod(17, 5)</code> gives <code>q = 3</code> and <code>r = 2</code>.</li></ul><p>This is how Python returns \"several values\": it really returns one tuple, and you unpack it. In Week 3 you will write your own functions that do the same with <code>return a, b</code>.</p>" },
    { t: "predict", code: c`a, b = 1, 2
a, b = b, a + b
a, b = b, a + b
print(a, b)`, explain: "Each line computes the whole right side with the <b>old</b> values first. Start (1, 2). Line 2: (2, 1 + 2) = (2, 3). Line 3: (3, 2 + 3) = (3, 5). Output: <code>3 5</code> — these are Fibonacci numbers." },
    { t: "ar", html: "الفك (unpacking) يوزع عناصر الـ tuple على عدة متغيرات بالترتيب: year, month, day = date. ويجب أن يساوي عدد المتغيرات عدد العناصر. وبهذه الطريقة نبدّل متغيرين: x, y = y, x." },

    { t: "h", text: "Sets: unique items" },
    { t: "code", code: c`colors = {"red", "blue", "red", "green", "blue"}
print(colors)
print(len(colors))`, before: "<p>A set is written with <b>curly brackets</b> <code>{ }</code>. We typed 5 colors with repeats. How many will survive?</p>", note: "<p>Line by line:</p><ul><li>A set keeps each value <b>only once</b>, so the duplicate <code>\"red\"</code> and <code>\"blue\"</code> are silently dropped.</li><li><code>len(colors)</code> is <code>3</code>: red, blue, green.</li><li>The printed order may look random, and it may even be different on another computer. A set has <b>no order</b>. That also means <b>no indexes</b>: <code>colors[0]</code> is a <code>TypeError</code>. If you need a fixed order, use <code>sorted(colors)</code>, which gives you a sorted list.</li></ul>" },
    { t: "code", code: c`colors = {"red", "blue"}
colors.add("pink")
colors.add("red")
colors.discard("blue")
colors.discard("purple")
print(sorted(colors))
print("pink" in colors)`, before: "<p>Sets can change: you add and remove items. (They are not frozen like tuples.) Run it.</p>", note: "<p>Line by line:</p><ul><li><code>add(\"pink\")</code> adds a new item. Sets use <code>add</code>, not <code>append</code>, because there is no \"end\" in something without order.</li><li><code>add(\"red\")</code> does nothing: red is already there, and a set never holds duplicates.</li><li><code>discard(\"blue\")</code> removes blue. <code>discard(\"purple\")</code> does nothing and does <b>not</b> crash, even though purple is missing.</li><li><code>sorted(colors)</code> prints <code>['pink', 'red']</code> in a fixed order.</li><li><code>\"pink\" in colors</code> → <code>True</code>. Checking <code>in</code> is the thing sets do best: even with a million items, a set answers almost instantly, while a list checks items one by one.</li></ul>" },
    { t: "code", code: c`marks = [90, 85, 90, 70, 85]
unique = set(marks)
print(sorted(unique), len(unique))
words = set("the cat and the hat".split())
print(len(words))
empty = set()
print(len(empty))`, before: "<p><code>set()</code> turns a list into a set, which is the quickest way to <b>remove duplicates</b>. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>set(marks)</code> keeps each mark once → <code>{90, 85, 70}</code>. We print it sorted: <code>[70, 85, 90] 3</code>.</li><li><code>\"the cat and the hat\".split()</code> gives 5 words, but \"the\" appears twice, so the set has <code>4</code> different words.</li><li><code>set()</code> with nothing inside creates an <b>empty set</b>, length 0.</li></ul><p>Trap: <code>{}</code> is <b>not</b> an empty set — it is an empty <b>dictionary</b> (tomorrow's topic). Always write <code>set()</code> for an empty set.</p>" },
    { t: "predict", code: c`s = {3, 1, 3, 2, 1}
s.add(4)
s.add(2)
print(len(s), sorted(s))`, explain: "The duplicates disappear at once: <code>{1, 2, 3}</code>. <code>add(4)</code> adds a new item, <code>add(2)</code> does nothing because 2 is already there. Output: <code>4 [1, 2, 3, 4]</code>." },
    { t: "ar", html: "المجموعة set تُكتب بين { } ولا تحتوي على تكرار ولا ترتيب ثابت، لذلك لا يمكن استخدام الفهرس [0] معها. نضيف بـ add ونحذف بـ discard، و set(lst) تحذف التكرار. وأنشئ{{g:|ي}} المجموعة الفارغة بـ set() وليس {} لأن {} قاموس فارغ." },

    { t: "h", text: "Set operations: comparing two groups" },
    { t: "p", html: "<p>The real power of sets is comparing two groups, exactly like the Venn diagrams from math class. Who is in <b>both</b> clubs? Who is in <b>at least one</b>? Who is <b>only</b> in the first? Each question is one operator. We print the results with <code>sorted()</code> so the order is always the same.</p>" },
    { t: "code", code: c`python_club = {"Sara", "Omar", "Lina", "Nora"}
ai_club = {"Omar", "Nora", "Faisal"}
print("Both:", sorted(python_club & ai_club))
print("Any:", sorted(python_club | ai_club))`, before: "<p><code>&amp;</code> means \"in both\" and <code>|</code> means \"in either one\". Run it.</p>", note: "<p>Line by line:</p><ul><li><code>python_club &amp; ai_club</code> is the <b>intersection</b>: names in both sets → <code>['Nora', 'Omar']</code>.</li><li><code>python_club | ai_club</code> is the <b>union</b>: everyone in at least one club, each name once → <code>['Faisal', 'Lina', 'Nora', 'Omar', 'Sara']</code>. Omar and Nora are in both clubs but appear only once.</li></ul><p>Notice that <code>len(python_club | ai_club)</code> is 5, not 4 + 3 = 7, because the 2 shared people are not counted twice.</p>" },
    { t: "code", code: c`python_club = {"Sara", "Omar", "Lina", "Nora"}
ai_club = {"Omar", "Nora", "Faisal"}
print("Only Python:", sorted(python_club - ai_club))
print("Only AI:", sorted(ai_club - python_club))
print("Exactly one:", sorted(python_club ^ ai_club))`, before: "<p><code>-</code> means \"in the first but not the second\", and <code>^</code> means \"in exactly one of them\". Watch the order in the two <code>-</code> lines.</p>", note: "<p>Line by line:</p><ul><li><code>python_club - ai_club</code> is the <b>difference</b>: Python members who are not in AI → <code>['Lina', 'Sara']</code>.</li><li><code>ai_club - python_club</code> is a different question → <code>['Faisal']</code>. With <code>-</code>, <b>the order matters</b>, just like with numbers.</li><li><code>python_club ^ ai_club</code> is the <b>symmetric difference</b>: people in one club but not both → <code>['Faisal', 'Lina', 'Sara']</code>. It is the union minus the intersection.</li></ul>" },
    { t: "table", head: ["Operator", "Method", "Meaning"], rows: [["`a | b`", "`a.union(b)`", "in a or b"], ["`a & b`", "`a.intersection(b)`", "in both"], ["`a - b`", "`a.difference(b)`", "in a but not b"], ["`a ^ b`", "`a.symmetric_difference(b)`", "in exactly one"]] },
    { t: "predict", code: c`a = {1, 2, 3, 4}
b = {3, 4, 5}
print(sorted(b - a), len(a | b), sorted(a & b))`, explain: "<code>b - a</code>: items of b not in a → <code>[5]</code>. <code>a | b</code> is {1, 2, 3, 4, 5}, length <code>5</code>. <code>a &amp; b</code>: shared items → <code>[3, 4]</code>. Output: <code>[5] 5 [3, 4]</code>." },
    { t: "ar", html: "عمليات المجموعات: &amp; للتقاطع (المشترك)، و | للاتحاد (الكل بلا تكرار)، و - للفرق (في الأولى فقط)، و ^ للموجود في واحدة فقط. وانتبه{{g:|ي}}: ترتيب الطرفين مهم في عملية الفرق -، و + لا تعمل مع المجموعات." },

    { t: "h", text: "Which collection should I use?" },
    { t: "table", head: ["", "list", "tuple", "set"], rows: [["brackets", "`[ ]`", "`( )`", "`{ }` (empty: `set()`)"], ["ordered", "yes", "yes", "no"], ["changeable", "yes", "no", "yes (add/remove)"], ["duplicates", "allowed", "allowed", "removed"], ["use for", "a changing sequence", "a fixed record", "uniqueness, fast `in`"]] },
    { t: "code", code: c`visits = ["Sara", "Omar", "Sara", "Lina", "Sara"]
print("Visits:", len(visits))
print("Visitors:", len(set(visits)))
first_visit = tuple(visits[:2])
print("First two:", first_visit)`, before: "<p>The same data can be useful in more than one form. Here a list of library visits is used as a list, a set and a tuple. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>visits</code> is a <b>list</b> because it keeps growing during the day and the order of arrivals matters. It has <code>5</code> entries.</li><li><code>set(visits)</code> answers a different question: how many <b>different</b> people came? → <code>3</code> (Sara, Omar, Lina).</li><li><code>tuple(visits[:2])</code> turns the first two entries into a <b>tuple</b> → <code>('Sara', 'Omar')</code>: a fixed record that nobody should edit later.</li></ul><p>Ask yourself: Will it change? (list) Is it a fixed record? (tuple) Do I care only about unique items or fast <code>in</code>? (set)</p>" },
    { t: "ar", html: "اختر{{g:|ي}} القائمة لبيانات تتغير ويهم ترتيبها، والـ tuple لسجل ثابت لا يتغير، والـ set عندما يهمك عدم التكرار أو سرعة الفحص بـ in. ويمكن التحويل بينها بـ list() و tuple() و set()." },

    { t: "h", text: "Putting it together: course attendance" },
    { t: "code", code: c`course = ("CS101", "Room 12")
registered = ["Sara", "Omar", "Nora", "Faisal", "Lina"]
sunday = ["Omar", "Sara", "Lina", "Omar"]
monday = ["Sara", "Nora", "Lina"]
code, room = course
reg = set(registered)
sun = set(sunday)
mon = set(monday)
came = sun | mon
print(f"{code} in {room}: {len(reg)} students")
print("Came both days:", sorted(sun & mon))
print("Came at least once:", len(came))
print("Never came:", sorted(reg - came))`, together: true, before: "<p>A small attendance report for a course, using tuples, unpacking, sets and set operations. Before running, guess who never came. Then add a name to <code>monday</code> and run again.</p>", note: "<p>How it works:</p><ul><li>Line 1: the course code and room never change during the term, so they are stored as a <b>tuple</b>. Line 5 <b>unpacks</b> it into <code>code</code> and <code>room</code>.</li><li>Lines 2–4 are lists, as they would come from a sign-in sheet. Omar signed twice on Sunday.</li><li>Lines 6–8 turn each list into a <b>set</b>, so every name counts once.</li><li>Line 9: <code>sun | mon</code> (union) is everyone who came on at least one day: Omar, Sara, Lina, Nora.</li><li>Line 11: <code>sun &amp; mon</code> (intersection) → <code>['Lina', 'Sara']</code> came both days.</li><li>Line 12: <code>len(came)</code> is <code>4</code> — Omar's double sign-in is not counted twice.</li><li>Line 13: <code>reg - came</code> (difference) → <code>['Faisal']</code> never came.</li></ul><p>Without sets, each of these questions would need its own loop with <code>if ... not in ...</code>. With sets, each is one operator.</p>" },
    { t: "ar", html: "استخدمنا tuple للمعلومات الثابتة وفككناها إلى متغيرين، وحوّلنا قوائم الحضور إلى مجموعات لحذف التكرار، ثم أجبنا بالاتحاد | والتقاطع &amp; والفرق - عن أسئلة الحضور، كل سؤال بعملية واحدة." },
  ],
  mistakes: [
    { title: "{} is not an empty set", html: "", wrong: c`s = {}
s.add(1)   # AttributeError: dict`, right: c`s = set()
s.add(1)` },
    { title: "Indexing a set", html: "Sets have no order, so no index.", wrong: c`s = {3, 1, 2}
print(s[0])`, right: c`s = {3, 1, 2}
print(sorted(s)[0])` },
    { title: "Trying to change a tuple", html: "", wrong: c`t = (1, 2, 3)
t[0] = 9`, right: c`t = (1, 2, 3)
t = (9,) + t[1:]
print(t)` },
  ],
  tricks: [
    { title: "Fast membership", html: "<code>x in some_set</code> is almost instant even with a million items; <code>x in some_list</code> checks one by one." },
    { title: "Count unique items in one line", html: "", code: c`print(len(set("mississippi")))   # 4` },
  ],
  practice: [
    { t: "predict", code: c`a = {1, 2, 3, 4}
b = {3, 4, 5}
print(sorted(a & b), sorted(a - b), len(a | b))`, explain: "<code>[3, 4] [1, 2] 5</code>" },
    { t: "predict", code: c`x, y = 1, 2
x, y = y, x + y
x, y = y, x + y
print(x, y)`, explain: "(1,2) → (2,3) → (3,5). Tuple unpacking makes Fibonacci easy!" },
    { t: "parsons", title: "Common interests", prompt: "Print the interests two friends share, sorted.", lines: [c`sara = {"chess", "coding", "reading", "art"}`, c`omar = {"football", "coding", "art"}`, "shared = sara & omar", "print(sorted(shared))"], distractors: ["shared = sara + omar"], explain: "<code>+</code> does not work on sets; <code>&amp;</code> is intersection." },
    { t: "try", title: "Anagram checker", html: "<p>Two words are anagrams if they use the same letters. Is comparing <code>set(a) == set(b)</code> enough? Test <code>\"listen\"/\"silent\"</code> and <code>\"aab\"/\"abb\"</code>. Then try <code>sorted(a) == sorted(b)</code>.</p>", code: c`a = "listen"
b = "silent"
print(set(a) == set(b))
print(sorted(a) == sorted(b))` },
  ],
  exercises: [
    { id: "unique", lvl: "seed", title: "How many unique?", prompt: "<p>Read words on one line and print how many <b>different</b> words there are (ignore capital letters).</p>", tests: [{ stdin: "Red blue red GREEN blue", expected: "3" }, { stdin: "a", expected: "1" }],
      solutions: [{ name: "set", code: c`words = input().lower().split()
print(len(set(words)))` }] },
    { id: "swapdate", lvl: "seed", title: "Date formatter", prompt: "<p>Read a date as <code>YYYY-MM-DD</code>, unpack it into three variables and print it as <code>DD/MM/YYYY</code>.</p>", tests: [{ stdin: "2026-09-29", expected: "29/09/2026" }],
      solutions: [{ name: "Unpacking", code: c`year, month, day = input().split("-")
print(f"{day}/{month}/{year}")` }, { name: "Indexes", code: c`parts = input().split("-")
print(parts[2] + "/" + parts[1] + "/" + parts[0])` }] },
    { id: "common", lvl: "star", title: "Shared courses", prompt: "<p>Line 1: courses of student A. Line 2: courses of student B (codes separated by spaces). Print three lines, each sorted and space-separated: shared courses, courses only A takes, and all courses.</p><pre class=\"code-static\">Input:\nIS201 CS101 MATH111\nCS101 PHYS101 MATH111\nOutput:\nShared: CS101 MATH111\nOnly A: IS201\nAll: CS101 IS201 MATH111 PHYS101</pre>", tests: [{ stdin: "IS201 CS101 MATH111\nCS101 PHYS101 MATH111", expected: "Shared: CS101 MATH111\nOnly A: IS201\nAll: CS101 IS201 MATH111 PHYS101" }],
      solutions: [{ name: "Set operators", code: c`a = set(input().split())
b = set(input().split())
print("Shared:", " ".join(sorted(a & b)))
print("Only A:", " ".join(sorted(a - b)))
print("All:", " ".join(sorted(a | b)))` }] },
    { id: "pangram", lvl: "star", title: "Pangram", prompt: "<p>A pangram uses every letter a–z at least once. Read a sentence and print <code>Pangram</code> or <code>Missing: …</code> with the missing letters in alphabetical order (no spaces).</p>", tests: [{ stdin: "The quick brown fox jumps over the lazy dog", expected: "Pangram" }, { stdin: "Hello world", expected: "Missing: abcfgijkmnpqstuvxyz" }],
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
    { id: "firstrep", lvl: "fire", title: "First repeated character", prompt: "<p>Read a word and print the first character that appears for the <b>second</b> time while reading left to right. Print <code>None</code> if nothing repeats.</p>", tests: [{ stdin: "programming", expected: "r" }, { stdin: "abcdef", expected: "None" }, { stdin: "abba", expected: "b" }],
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
  ],
  puzzle: { title: "Club logic", q: "<p>30 students take Python, 25 take AI, and 10 take both. How many students take at least one of them? (Think sets: |A ∪ B| = |A| + |B| − |A ∩ B|.)</p>", answers: ["45"], hint: "The 10 are counted twice if you simply add.", ar: "الطلاب المشتركون محسوبون مرتين.", e: "30 + 25 − 10 = <b>45</b>. This is the inclusion–exclusion principle from discrete math, exactly what <code>len(a | b)</code> computes." },
  cards: [
    { f: "Tuple vs list", b: "Tuple: immutable, `( )`. List: changeable, `[ ]`." },
    { f: "Remove duplicates from a list", b: "`set(lst)` (order lost) or `list(dict.fromkeys(lst))` (order kept)." },
    { f: "Set intersection / union / difference", b: "`a & b`, `a | b`, `a - b`" },
    { f: "Empty set?", b: "`set()` — not `{}`." },
  ],
};
})();

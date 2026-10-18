window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[12] = {
  title: "Dictionaries: look things up by name",
  intro: "A list finds things by position: item 0, item 1. But in real life we look things up by <b>name</b>: a word in a dictionary, a phone number by contact, a mark by student ID. Python's <b>dict</b> does exactly that — and it is one of the most useful tools in the whole language (JSON data from every website is basically dictionaries).",
  introAr: "القاموس dict يخزن أزواجًا من مفتاح وقيمة، مثل اسم الطالب ودرجته. نصل للقيمة بالمفتاح بدل الرقم. ونتعلم أهم نمط: عدّ التكرارات باستخدام القاموس.",
  goals: ["Create dictionaries and read values by key", "Add, update and delete entries", "Use `get()` to avoid KeyError", "Loop over `keys()`, `values()` and `items()`", "Count frequencies with a dictionary"],
  learn: [
    { t: "h", text: "Why we need dictionaries" },
    { t: "p", html: "<p>A list finds things by <b>position</b>: item 0, item 1, item 2. That is fine for a queue, but most real questions are asked by <b>name</b>: <i>\"What is Omar's mark?\"</i>, <i>\"How much is a latte?\"</i>, <i>\"What is Sara's phone number?\"</i>. With a list you would have to remember that Omar is at position 1 — and that breaks the moment someone is added or removed.</p><p>A <b>dictionary</b> (<code>dict</code>) stores <b>pairs</b>: a <b>key</b> (the name you look up) and a <b>value</b> (the information you want). You ask with the key, Python gives you the value. Almost all data on the web (JSON) is built from dictionaries, so this is one of the most useful tools you will ever learn.</p>" },
    { t: "analogy", title: "Like a real dictionary", html: "<p>In a paper dictionary you look up a <b>word</b> (the key) to find its <b>meaning</b> (the value). You never say \"give me word number 4,512\". Each word appears only once — keys are <b>unique</b> — but two words can have the same meaning, so values <b>can repeat</b>. Your phone's contact list works the same way: you search for <i>Omar</i>, not for <i>contact number 37</i>.</p>" },
    { t: "ar", html: "القاموس dict يخزن أزواجًا: مفتاح وقيمة، مثل اسم الطالب ودرجته. نبحث بالمفتاح (الاسم) بدل الرقم (الموقع) كما في القوائم. المفاتيح لا تتكرر، أما القيم فيمكن أن تتكرر." },

    { t: "h", text: "Creating a dictionary and reading by key" },
    { t: "code", code: c`student = {"name": "{{name}}", "major": "CS", "gpa": 4.6}
print(student["name"])
print(student["gpa"])`, before: "<p>A dictionary is written with <b>curly braces</b> <code>{ }</code>. Inside, each pair is <code>key: value</code>, and pairs are separated by commas. Run it, then change the last line to read <code>\"major\"</code>.</p>", note: "<p>Line by line:</p><ul><li>Line 1 creates a dictionary with three pairs. The keys are the strings <code>\"name\"</code>, <code>\"major\"</code> and <code>\"gpa\"</code>; the values are your name, <code>\"CS\"</code> and <code>4.6</code>. Values can be any type: text, numbers, even lists.</li><li><code>student[\"name\"]</code> uses <b>square brackets with a key</b> — not a position. Python finds the pair whose key is <code>\"name\"</code> and gives back its value.</li><li><code>student[\"gpa\"]</code> gives <code>4.6</code>.</li></ul><p>Same brackets as lists, different meaning: in a list <code>x[1]</code> means \"position 1\"; in a dict <code>d[\"gpa\"]</code> means \"the value whose key is gpa\".</p>" },
    { t: "code", code: c`student = {"name": "{{name}}", "major": "CS", "gpa": 4.6}
print(student)
print(len(student), "pairs")
empty = {}
print(empty, len(empty))`, before: "<p>You can print a whole dictionary and count its pairs with <code>len()</code>, just like a list.</p>", note: "<p>Line by line:</p><ul><li><code>print(student)</code> shows the whole dictionary in the same <code>{key: value}</code> form you typed, in the order the pairs were added.</li><li><code>len(student)</code> counts <b>pairs</b>, not keys plus values: <code>3</code>.</li><li><code>{}</code> is an <b>empty dictionary</b>. Careful: since Day 11 you know an empty <b>set</b> must be written <code>set()</code>, because <code>{}</code> is already taken by the empty dict.</li></ul>" },
    { t: "ar", html: "نكتب القاموس بالأقواس المعقوفة { } وكل زوج بالشكل key: value. نقرأ القيمة بـ d[key] باستخدام المفتاح وليس الموقع. و {} الفارغة تعني قاموسًا فارغًا وليس مجموعة." },

    { t: "h", text: "Changing and adding entries" },
    { t: "code", code: c`student = {"name": "{{name}}", "year": 1}
student["year"] = 2
student["email"] = "student@psu.edu.sa"
print(student)`, before: "<p>The same line <code>d[key] = value</code> does two jobs. Watch which pair changes and which pair is new.</p>", note: "<p>Line by line:</p><ul><li><code>student[\"year\"] = 2</code>: the key <code>\"year\"</code> <b>already exists</b>, so its value is <b>replaced</b>: 1 becomes 2.</li><li><code>student[\"email\"] = ...</code>: the key <code>\"email\"</code> does <b>not</b> exist yet, so Python <b>adds</b> a new pair at the end.</li><li>The output shows 3 pairs: name, year (now 2) and email.</li></ul><p>Rule: assigning to an existing key <b>updates</b>; assigning to a new key <b>adds</b>. There is no <code>append</code> for dictionaries — you don't need one.</p>" },
    { t: "code", code: c`stock = {"pens": 5}
stock["pens"] += 3
print(stock["pens"])`, before: "<p>Because <code>stock[\"pens\"]</code> behaves like a variable, you can use <code>+=</code> on it.</p>", note: "<p><code>stock[\"pens\"] += 3</code> means <code>stock[\"pens\"] = stock[\"pens\"] + 3</code>: Python reads the old value (5), adds 3 and stores 8 back under the same key. This only works when the key <b>already exists</b> — on a missing key it crashes, as you will see next.</p>" },
    { t: "ar", html: "d[key] = value تعدّل القيمة إذا كان المفتاح موجودًا، وتضيف زوجًا جديدًا إذا لم يكن موجودًا. ويمكن استخدام += على قيمة موجودة فقط." },

    { t: "h", text: "Missing keys: KeyError, get() and in" },
    { t: "code", code: c`prices = {"latte": 18, "tea": 8}
print(prices["pizza"])`, expectError: true, before: "<p>What happens if you ask for a key that is not there? Run it and read the error.</p>", note: "<p>Python stops with <code>KeyError: 'pizza'</code>. The message names the key it could not find. Keys are also <b>exact</b>: <code>\"Tea\"</code> with a capital T is a different key from <code>\"tea\"</code>, so it would cause a KeyError too. In real programs (user input!) you must be ready for missing keys. There are two safe tools.</p>" },
    { t: "code", code: c`prices = {"latte": 18, "tea": 8}
print(prices.get("tea"))
print(prices.get("pizza"))
print(prices.get("pizza", "not on the menu"))`, before: "<p>Tool 1: the <code>get()</code> method. It never crashes. Compare the three lines.</p>", note: "<p>Line by line:</p><ul><li><code>prices.get(\"tea\")</code>: the key exists, so you get <code>8</code> — the same as <code>prices[\"tea\"]</code>.</li><li><code>prices.get(\"pizza\")</code>: the key is missing, so instead of crashing it returns <code>None</code>, Python's special value for \"nothing\".</li><li><code>prices.get(\"pizza\", \"not on the menu\")</code>: the second argument is a <b>default</b>. When the key is missing, you get the default instead of <code>None</code>.</li></ul><p>Remember <code>d.get(key, default)</code>: \"the value if the key exists, otherwise the default\". It will be the heart of the counting pattern.</p>" },
    { t: "code", code: c`prices = {"latte": 18, "tea": 8}
item = input("Order: ")
if item in prices:
    print(item, "costs", prices[item], "SAR")
else:
    print("Sorry, no", item)`, stdin: "latte", before: "<p>Tool 2: the <code>in</code> operator you know from lists and sets. Run it with <code>latte</code>, then with <code>pizza</code>.</p>", note: "<p>Line by line:</p><ul><li><code>item in prices</code> asks \"is this a <b>key</b> of the dictionary?\" and gives <code>True</code> or <code>False</code>. It checks keys only — <code>18 in prices</code> would be <code>False</code>.</li><li>If True, reading <code>prices[item]</code> is safe, because we just checked.</li><li>If False, the <code>else</code> branch handles it politely.</li></ul><p>Use <code>in</code> when the two cases need different actions; use <code>get()</code> when you just need a value with a fallback.</p>" },
    { t: "ar", html: "قراءة مفتاح غير موجود بـ d[key] تسبب KeyError. استخدم{{g:|ي}} d.get(key, default) لترجع قيمة بديلة بدل الخطأ، أو افحص{{g:|ي}} أولًا بـ key in d. وانتبه{{g:|ي}}: المفاتيح حساسة لحالة الأحرف، و in تفحص المفاتيح فقط." },
    { t: "predict", code: c`inv = {"pens": 5}
inv["pens"] += 3
print(inv.get("pens"), inv.get("books", 0))`, explain: "<code>inv[\"pens\"]</code> goes from 5 to 8. <code>get(\"pens\")</code> finds it → <code>8</code>. <code>\"books\"</code> is missing, so <code>get</code> returns the default <code>0</code> instead of crashing. Output: <code>8 0</code>." },

    { t: "h", text: "Deleting entries: del and pop" },
    { t: "code", code: c`prices = {"latte": 18, "tea": 8, "water": 3}
del prices["water"]
removed = prices.pop("tea")
print(prices)
print("Removed price:", removed)`, before: "<p>Two ways to remove a pair. Notice which one gives you the value back.</p>", note: "<p>Line by line:</p><ul><li><code>del prices[\"water\"]</code> deletes the pair with key <code>\"water\"</code>. Nothing is returned.</li><li><code>prices.pop(\"tea\")</code> removes the pair <b>and returns its value</b>, so <code>removed</code> becomes <code>8</code>. It is like <code>pop</code> on a list, but you give a key instead of a position.</li><li>Only <code>{'latte': 18}</code> is left.</li></ul><p>Both crash with KeyError if the key is missing, so check with <code>in</code> first when you are not sure.</p>" },
    { t: "ar", html: "del d[key] تحذف الزوج، و d.pop(key) تحذفه وترجع قيمته. الاثنان يسببان KeyError إذا كان المفتاح غير موجود." },

    { t: "h", text: "Keys are unique and must not change" },
    { t: "code", code: c`d = {"x": 1, "x": 2}
print(d)
seats = {(1, 2): "Sara", (3, 4): "Omar"}
print(seats[(1, 2)])`, before: "<p>Two rules about keys. Predict what the first <code>print</code> shows.</p>", note: "<p>Line by line:</p><ul><li><code>{\"x\": 1, \"x\": 2}</code> uses the same key twice. A key can exist only <b>once</b>, so the second pair overwrites the first: the output is <code>{'x': 2}</code> — the last one wins.</li><li>Keys must be <b>immutable</b> (unchangeable): strings, numbers and tuples are fine. A <b>tuple</b> like <code>(1, 2)</code> is perfect for a seat at row 1, column 2.</li><li>A list as a key (<code>{[1, 2]: \"Sara\"}</code>) crashes with <code>TypeError: unhashable type: 'list'</code>, because a list could change after being used as a key. That is one reason tuples exist (Day 11).</li></ul><p>Values have no such rule: a value can be a list, a set, or even another dictionary.</p>" },
    { t: "ar", html: "المفتاح لا يتكرر: إذا كتبته مرتين تبقى القيمة الأخيرة. والمفتاح يجب أن يكون غير قابل للتغيير مثل النص والرقم والـ tuple، ولا يصح أن يكون قائمة." },

    { t: "h", text: "Looping over a dictionary" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
for name in marks:
    print(name, "->", marks[name])`, before: "<p>A <code>for</code> loop over a dictionary gives you the <b>keys</b>, one at a time, in the order they were added.</p>", note: "<p>Line by line:</p><ul><li><code>for name in marks:</code> — each round, <code>name</code> is the next key: <code>\"Sara\"</code>, then <code>\"Omar\"</code>, then <code>\"Lina\"</code>.</li><li>Inside, <code>marks[name]</code> looks up that key's value.</li></ul><p>Output: <code>Sara -&gt; 95</code>, <code>Omar -&gt; 82</code>, <code>Lina -&gt; 90</code>. The loop gives keys, not values — a common surprise.</p>" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
for name, mark in marks.items():
    print(f"{name}: {mark}")`, before: "<p>Usually you want the key <b>and</b> the value together. <code>items()</code> gives you both.</p>", note: "<p><code>marks.items()</code> produces the pairs as tuples: <code>('Sara', 95)</code>, <code>('Omar', 82)</code>, <code>('Lina', 90)</code>. Writing <code>for name, mark in ...</code> <b>unpacks</b> each tuple into two variables — the same unpacking you did with tuples on Day 11. This is the most common way to loop over a dictionary. Note <code>for name, mark in marks:</code> (without <code>.items()</code>) does <b>not</b> work: the loop would give only keys.</p>" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
print(list(marks.keys()))
print(list(marks.values()))
print("Average:", sum(marks.values()) / len(marks))`, before: "<p><code>keys()</code> gives only the keys and <code>values()</code> only the values. Here we turn them into lists to see them.</p>", note: "<p>Line by line:</p><ul><li><code>list(marks.keys())</code> → <code>['Sara', 'Omar', 'Lina']</code>.</li><li><code>list(marks.values())</code> → <code>[95, 82, 90]</code>.</li><li><code>sum(marks.values())</code> adds all the marks: 267. Divided by <code>len(marks)</code> (3 pairs) gives the average <code>89.0</code>.</li></ul><p>You don't need <code>list()</code> to loop or to use <code>sum()</code>; we only used it here so the printout is easy to read.</p>" },
    { t: "table", head: ["You write", "Each round you get"], rows: [["`for k in d:`", "a key"], ["`for k in d.keys():`", "a key (same as above)"], ["`for v in d.values():`", "a value"], ["`for k, v in d.items():`", "a key and its value"]] },
    { t: "ar", html: "الحلقة على القاموس مباشرة تعطي المفاتيح فقط. استخدم{{g:|ي}} items() للحصول على المفتاح والقيمة معًا، و values() للقيم فقط (مثلًا لحساب المجموع بـ sum)." },

    { t: "h", text: "Finding the key with the biggest value" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
best = ""
best_mark = -1
for name, mark in marks.items():
    if mark > best_mark:
        best = name
        best_mark = mark
print("Best:", best, best_mark)`, before: "<p>Who has the highest mark? First, the champion pattern you already know from Days 5 and 9, now with <code>items()</code>.</p>", note: "<p>Line by line:</p><ul><li>We start with an empty champion and a mark lower than any real mark (<code>-1</code>).</li><li>Each round, if the current mark beats the champion's, the current student becomes the new champion.</li><li>Sara (95) wins first; Omar (82) and Lina (90) cannot beat her.</li></ul><p>Output: <code>Best: Sara 95</code>.</p>" },
    { t: "code", code: c`marks = {"Sara": 95, "Omar": 82, "Lina": 90}
print(max(marks))
print(max(marks, key=marks.get))`, before: "<p>Python can do it in one line — but there is a trap. Compare the two answers.</p>", note: "<p>Line by line:</p><ul><li><code>max(marks)</code> looks only at the <b>keys</b> (like a loop does) and compares them as text, alphabetically. <code>\"Sara\"</code> comes last in the alphabet, so it wins — here by luck, not because of the marks!</li><li><code>max(marks, key=marks.get)</code> adds a <b>key=</b> argument: \"for each item, compare by this instead\". We give it <code>marks.get</code> — the get method <b>without parentheses</b>, so we hand over the method itself instead of calling it. <code>max</code> then calls <code>marks.get(\"Sara\")</code> → 95, <code>marks.get(\"Omar\")</code> → 82, <code>marks.get(\"Lina\")</code> → 90, and returns the <b>key</b> whose value is biggest: <code>Sara</code>.</li></ul><p>Remember the recipe <code>max(d, key=d.get)</code> = \"the key with the largest value\". <code>min(d, key=d.get)</code> gives the smallest.</p>" },
    { t: "predict", code: c`votes = {"Red": 2, "Blue": 3, "Green": 1}
print(max(votes))
print(max(votes, key=votes.get))`, explain: "<code>max(votes)</code> compares the keys alphabetically: <code>Red</code> &gt; <code>Green</code> &gt; <code>Blue</code>, so it prints <code>Red</code> — wrong winner! <code>key=votes.get</code> compares the vote counts, so it prints <code>Blue</code> (3 votes)." },
    { t: "ar", html: "max(d) تقارن المفاتيح أبجديًا وليس القيم. للحصول على المفتاح صاحب أكبر قيمة استخدم{{g:|ي}} max(d, key=d.get)، أي قارن{{g:|ي}} كل مفتاح بقيمته. أو استخدم{{g:|ي}} نمط البطل مع items()." },

    { t: "h", text: "The most important pattern: counting" },
    { t: "p", html: "<p>Word counts, votes, letter frequencies, product sales — they all ask the same question: <b>how many times did each thing appear?</b> A dictionary answers it perfectly: the thing is the key, its count is the value.</p>" },
    { t: "viz", code: c`text = "red blue red green red blue"
counts = {}
for word in text.split():
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
print(counts)`, before: "<p>Visualize it and press Next ▶ slowly. Watch the dictionary grow each time a new word appears.</p>", note: "<p>Step by step:</p><ul><li><code>counts = {}</code> starts empty: nothing counted yet.</li><li><code>text.split()</code> (Day 10) gives the words one by one.</li><li>First <code>\"red\"</code>: not in <code>counts</code> yet, so the <code>else</code> creates it with count 1. We can't use <code>+= 1</code> here — that would be a KeyError.</li><li>Second <code>\"red\"</code>: now it <b>is</b> in <code>counts</code>, so <code>+= 1</code> makes it 2.</li></ul><p>Final result: <code>{'red': 3, 'blue': 2, 'green': 1}</code>.</p>" },
    { t: "code", code: c`counts = {}
for ch in "mississippi":
    counts[ch] = counts.get(ch, 0) + 1
print(counts)`, before: "<p>The same pattern in one line, thanks to <code>get()</code> with a default.</p>", note: "<p>Read the key line from right to left: <code>counts.get(ch, 0)</code> means \"the current count of this letter, or <b>0</b> if we have never seen it\". Add 1, and store it back. So the first <code>m</code> becomes 0 + 1 = 1, and the fourth <code>s</code> becomes 3 + 1 = 4. No <code>if</code> needed, and no KeyError possible. Output: <code>{'m': 1, 'i': 4, 's': 4, 'p': 2}</code>. Learn this line by heart: <code>counts[x] = counts.get(x, 0) + 1</code>.</p>" },
    { t: "predict", code: c`counts = {}
for n in [3, 1, 3, 3, 2, 1]:
    counts[n] = counts.get(n, 0) + 1
print(counts)`, explain: "Keys are added in the order they first appear: 3, then 1, then 2. 3 appears three times, 1 twice and 2 once. Output: <code>{3: 3, 1: 2, 2: 1}</code>. Numbers make perfectly good keys." },
    { t: "ar", html: "نمط العدّ: الشيء هو المفتاح وعدد مرات ظهوره هو القيمة. السطر الأهم: counts[x] = counts.get(x, 0) + 1. وانتبه{{g:|ي}}: counts[x] += 1 وحدها تسبب KeyError في أول مرة يظهر فيها الشيء." },

    { t: "h", text: "Nested data: lists and dicts inside a dict" },
    { t: "code", code: c`course = {
    "code": "CS101",
    "students": ["Sara", "Omar"],
    "schedule": {"day": "Sunday", "time": "10:00"},
}
print(course["students"][1])
print(course["schedule"]["day"])`, before: "<p>A value can itself be a list or another dictionary. A long dictionary can be written over several lines for readability. Read the two lookups from left to right.</p>", note: "<p>Line by line:</p><ul><li><code>course[\"students\"]</code> gives the list <code>['Sara', 'Omar']</code>; then <code>[1]</code> takes position 1 of that list → <code>Omar</code>.</li><li><code>course[\"schedule\"]</code> gives the inner dictionary; then <code>[\"day\"]</code> looks up its key → <code>Sunday</code>.</li></ul><p>Each pair of brackets goes one level deeper. This is exactly what JSON data from web APIs looks like.</p>" },
    { t: "code", code: c`grades = {"Sara": "A", "Omar": "B", "Lina": "A"}
groups = {}
for name, g in grades.items():
    if g not in groups:
        groups[g] = []
    groups[g].append(name)
print(groups)`, before: "<p>A very useful shape: a <b>dictionary of lists</b>, to put things into groups. Here we group students by their grade.</p>", note: "<p>Line by line:</p><ul><li>For each student, <code>g</code> is their grade.</li><li>If this grade has no group yet, we create an <b>empty list</b> for it: <code>groups[g] = []</code>.</li><li><code>groups[g]</code> is a list, so we can <code>append</code> the name to it.</li></ul><p>Output: <code>{'A': ['Sara', 'Lina'], 'B': ['Omar']}</code>. It is the counting pattern's cousin: instead of adding 1, we add the name to a list.</p>" },
    { t: "ar", html: "قيمة القاموس يمكن أن تكون قائمة أو قاموسًا آخر، ونصل للداخل بأقواس متتالية مثل d[\"schedule\"][\"day\"]. ولتجميع العناصر استخدم{{g:|ي}} قاموسًا من القوائم: أنشئ{{g:|ي}} قائمة فارغة للمفتاح الجديد ثم أضف{{g:|ي}} إليها بـ append." },

    { t: "h", text: "Putting it together: a café order counter" },
    { t: "code", code: c`menu = {"latte": 18, "tea": 8, "cookie": 6}
cart = {}
while True:
    item = input("Item (or done): ").strip().lower()
    if item == "done":
        break
    if item not in menu:
        print("Not on the menu:", item)
        continue
    cart[item] = cart.get(item, 0) + 1
total = 0
for item, qty in cart.items():
    print(f"{item} x{qty} = {menu[item] * qty} SAR")
    total += menu[item] * qty
print("Total:", total, "SAR")
print("Most ordered:", max(cart, key=cart.get))`, stdin: "latte\ntea\npizza\nlatte\ndone", together: true, before: "<p>A small café till that uses everything from today. Read it and predict the total for the input <code>latte, tea, pizza, latte, done</code>, then run it. Try your own orders too.</p>", note: "<p>How it works:</p><ul><li><code>menu</code> is a lookup table: item → price. <code>cart</code> starts empty and will hold item → quantity.</li><li>The <code>while True</code> loop (Day 8) reads items until <code>done</code>. Cleaning with <code>.strip().lower()</code> means <code>LATTE</code> works too.</li><li><code>item not in menu</code> protects us from a KeyError later: unknown items are reported and skipped with <code>continue</code>.</li><li><code>cart[item] = cart.get(item, 0) + 1</code> is the counting pattern.</li><li>The <code>for ... in cart.items()</code> loop prints each line and uses <code>menu[item]</code> to look up the price — safe, because only menu items ever reached the cart.</li><li><code>max(cart, key=cart.get)</code> finds the item with the biggest quantity.</li></ul><p>For our input: latte x2 = 36, tea x1 = 8, total <code>44 SAR</code>, most ordered <code>latte</code>.</p>" },
    { t: "ar", html: "جمعنا كل شيء: قاموس للأسعار نبحث فيه بالمفتاح، و in لتجنب KeyError، ونمط العدّ بـ get، والحلقة على items() للطباعة، و max(d, key=d.get) لأكثر عنصر طلبًا." },
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

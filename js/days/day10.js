window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[10] = {
  title: "Lists: many values in one variable",
  intro: "A class has 40 students. You would not create 40 variables for their marks. A <b>list</b> keeps many values in order under one name — and with a loop you can process all of them in two lines. Lists are everywhere: shopping carts, playlists, sensor readings, training data for AI.",
  introAr: "القائمة (list) تخزن قيمًا كثيرة بترتيب تحت اسم واحد. نتعلم إنشاءها والوصول لعناصرها وتعديلها، والمرور عليها بحلقة، والدوال المفيدة مثل sum و max و sort.",
  goals: ["Create lists and access items by index and slice", "Add, change and remove items (`append`, `insert`, `remove`, `pop`)", "Loop over lists and compute totals, max and averages", "Sort with `sort()` and `sorted()`", "Build a list from user input with `split()`"],
  learn: [
    { t: "h", text: "Why lists?" },
    { t: "p", html: "<p>Your marks this term: 85, 92, 78, 95, 60. With what you know, you would write <code>mark1 = 85</code>, <code>mark2 = 92</code>… five variables. For a class of 40, forty variables — and no loop can walk through them. A <b>list</b> keeps all the values together, in order, under <b>one</b> name.</p>" },
    { t: "analogy", title: "A list is like a train", html: "<p>A train has carriages joined in a row. Each carriage carries one thing, and the carriages are numbered from the front — starting at <b>0</b>. You can look into carriage 2, replace what is inside, add a carriage at the end, or take one away. The whole train still has one name.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
names = ["{{name}}", "Omar", "Lina"]
print(marks)
print(names)
print(len(marks), "marks")`, before: "<p>Square brackets <code>[ ]</code> make a list; commas separate the items.</p>" },
    { t: "lines", rows: [
      ["marks = [85, 92, 78, 95, 60]", "One variable, five values. The order is kept exactly as you wrote it."],
      ["names = [\"{{name}}\", \"Omar\", \"Lina\"]", "Items can be strings too (a list may even mix types, but usually all items are the same kind)."],
      ["print(marks)", "Prints the whole list, with brackets and commas."],
      ["len(marks)", "<code>len</code> works like on strings: the number of items, here 5."],
    ] },
    { t: "ar", html: "القائمة تُكتب بين أقواس مربعة [ ] والعناصر بينها فواصل. و len تعطي عدد العناصر." },
    { t: "check", q: "What does `len([\"tea\", \"coffee\", \"juice\", \"water\"])` give?", o: ["3", "4", "21", "An error"], a: 1, e: "Four items. `len` counts **items**, not letters." },

    { t: "h", text: "Reading items: index and slice" },
    { t: "p", html: "<p>Everything you learned on Day 4 about string indexes works on lists. <code>marks[0]</code> is the first item, <code>marks[-1]</code> the last, and a slice <code>marks[1:3]</code> gives a <b>new list</b> with items 1 and 2.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
print(marks[0])
print(marks[-1])
print(marks[1:3])
print(95 in marks)`, note: "<p><code>in</code> also works: <code>95 in marks</code> is True. Asking for an index that does not exist, like <code>marks[5]</code>, gives <code>IndexError</code>.</p>" },
    { t: "check", q: "With `days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\"]`, what is `days[1:4]`?", o: ["`['Sun', 'Mon', 'Tue']`", "`['Mon', 'Tue', 'Wed']`", "`['Mon', 'Tue', 'Wed', 'Thu']`", "`'Mon'`"], a: 1, e: "Start at index 1, stop **before** 4: items 1, 2, 3." },

    { t: "h", text: "Changing an item" },
    { t: "p", html: "<p>Here is the big difference from strings: lists are <b>mutable</b> — you can change them in place. The teacher re-marked your second exam? Just put the new value at that index.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
marks[1] = 97
print(marks)`, note: "<p><code>marks[1] = 97</code> replaces the item at index 1. Try the same with a string (<code>word[0] = \"X\"</code>) and you get an error — strings cannot be changed.</p>" },
    { t: "ar", html: "القائمة قابلة للتعديل (mutable) عكس النص. يمكن تغيير عنصر بكتابة marks[1] = 97." },

    { t: "h", text: "Adding items: append and insert" },
    { t: "analogy", title: "A shopping cart", html: "<p>An online cart starts empty. Each time you tap <i>Add</i>, the item goes to the end of the cart. Sometimes you want something at the top of the list instead. <code>append</code> adds at the end; <code>insert</code> puts an item at a chosen position.</p>" },
    { t: "code", code: c`cart = []
cart.append("milk")
cart.append("bread")
cart.insert(0, "coffee")
print(cart)` },
    { t: "lines", rows: [
      ["cart = []", "An <b>empty list</b>: a train with no carriages yet."],
      ["cart.append(\"milk\")", "A <b>method</b> (Day 4) of the list: add <code>\"milk\"</code> at the end. The list itself changes — no need to write <code>cart = …</code>."],
      ["cart.append(\"bread\")", "Now the cart is <code>['milk', 'bread']</code>."],
      ["cart.insert(0, \"coffee\")", "Insert at index 0; the others move one step right: <code>['coffee', 'milk', 'bread']</code>."],
    ] },

    { t: "h", text: "Removing items: remove and pop" },
    { t: "viz", code: c`cart = ["coffee", "milk", "bread", "dates"]
cart.remove("milk")
last = cart.pop()
first = cart.pop(0)
print(cart)
print(last, first)`, before: "<p>Visualize and watch the list shrink after each line.</p>" },
    { t: "p", html: "<p><code>remove(x)</code> deletes the first item equal to <code>x</code> (an error if it is missing). <code>pop()</code> removes the <b>last</b> item and gives it back, so you can store it; <code>pop(i)</code> does the same for index i.</p>" },
    { t: "check", q: "What is printed?", code: c`a = [1, 2, 3]
a.append(4)
x = a.pop(0)
print(a, x)`, o: ["`[1, 2, 3] 4`", "`[2, 3, 4] 1`", "`[1, 2, 3, 4] 1`", "`[2, 3] 4`"], a: 1, e: "After append: [1, 2, 3, 4]. `pop(0)` removes and returns 1, leaving [2, 3, 4]." },
    { t: "table", head: ["Method", "What it does"], rows: [["`lst.append(x)`", "add x at the end"], ["`lst.insert(i, x)`", "insert x at position i"], ["`lst[i] = x`", "replace the item at i"], ["`lst.remove(x)`", "delete the first x (error if missing)"], ["`lst.pop()` / `lst.pop(i)`", "remove and return the last / item i"], ["`lst.sort()`", "sort in place (returns None!)"], ["`sorted(lst)`", "return a new sorted list"], ["`lst.count(x)`, `lst.index(x)`", "how many x / position of x"]] },

    { t: "h", text: "Lists + loops = superpower" },
    { t: "p", html: "<p>Yesterday <code>for</code> walked through the letters of a string. It walks through a list the same way: one item per round. Now the accumulator pattern can total a whole class.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
total = 0
for m in marks:
    total += m
print("Total:", total)
print("Average:", total / len(marks))` },
    { t: "lines", rows: [
      ["for m in marks:", "Each round, <code>m</code> is the next mark: 85, then 92, … then 60."],
      ["    total += m", "Add the current mark to the running total."],
      ["total / len(marks)", "Divide by the number of items — the code still works if the list has 5 or 500 marks."],
    ] },
    { t: "ar", html: "for m in marks تمر على عناصر القائمة واحدًا واحدًا. نجمعها في total ثم نقسم على len للحصول على المتوسط." },
    { t: "check", q: "What does this print?", code: c`prices = [10, 25, 5]
count = 0
for p in prices:
    if p > 8:
        count += 1
print(count)`, o: ["1", "2", "3", "40"], a: 1, e: "10 and 25 are greater than 8: **2**." },

    { t: "h", text: "Built-in helpers: sum, max, min, sorted" },
    { t: "p", html: "<p>Totals and maximums are so common that Python has ready-made functions. <code>sorted(lst)</code> gives a <b>new</b> sorted list; <code>lst.sort()</code> sorts the list itself and returns nothing (<code>None</code>).</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
print(sum(marks), max(marks), min(marks))
print(sorted(marks))
print(sorted(marks, reverse=True)[:3])
print(marks)`, note: "<p>The last line shows that <code>sorted</code> did not change <code>marks</code>. <code>reverse=True</code> sorts from big to small, and the slice <code>[:3]</code> takes the top 3.</p>" },
    { t: "check", q: "After `x = [3, 1, 2]` and `y = sorted(x)`, what is `x`?", o: ["`[1, 2, 3]`", "`[3, 1, 2]`", "`None`", "`[3, 2, 1]`"], a: 1, e: "`sorted` returns a new list and leaves `x` unchanged. Only `x.sort()` would change it." },

    { t: "h", text: "Building a new list with a loop" },
    { t: "p", html: "<p>Often you want a list of <i>some</i> items: the marks that passed, the long words. Start with an empty list and <code>append</code> inside the loop — the list version of the accumulator.</p>" },
    { t: "code", code: c`passed = []
for m in [85, 42, 78, 55, 91]:
    if m >= 60:
        passed.append(m)
print(passed)` },

    { t: "h", text: "split and join: text ↔ list" },
    { t: "p", html: "<p>Text often arrives as one line: <code>\"python is fun\"</code>. <code>split()</code> cuts a string at the spaces and returns a <b>list of words</b>. <code>join()</code> does the opposite: it glues a list of strings with the separator you choose.</p>" },
    { t: "code", code: c`words = "python is fun to learn".split()
print(words, len(words))
print("-".join(words))
print("a,b,c".split(","))` },
    { t: "ar", html: "split تقسم النص إلى قائمة كلمات، و join تلصق قائمة نصوص في نص واحد. انتبه{{g:|ي}}: الفاصل يُكتب قبل join: \"-\".join(words)." },

    { t: "h", text: "List comprehension: a loop in one line" },
    { t: "p", html: "<p>Building a new list from another list is so common that Python has a short form. Start from the loop you already know — make a list of squares:</p>" },
    { t: "code", code: c`squares = []
for n in [1, 2, 3, 4]:
    squares.append(n * n)
print(squares)` },
    { t: "p", html: "<p>The same thing as a <b>list comprehension</b>: put the value you append first, then the <code>for</code> part, all inside brackets.</p>" },
    { t: "code", code: c`squares = [n * n for n in [1, 2, 3, 4]]
print(squares)
passed = [m for m in [85, 42, 78, 55] if m >= 60]
print(passed)` },
    { t: "lines", title: "Read the comprehension", rows: [
      ["[ n * n ...", "What goes into the new list — the part you passed to <code>append</code>."],
      ["... for n in [1, 2, 3, 4] ]", "The loop, exactly like the first line of the <code>for</code>."],
      ["[m for m in ... if m >= 60]", "An optional <code>if</code> at the end keeps only some items — the same as the <code>if</code> around <code>append</code>."],
    ] },
    { t: "check", q: "What is `[w.upper() for w in [\"hi\", \"py\"]]`?", o: ["`['hi', 'py']`", "`['HI', 'PY']`", "`'HIPY'`", "An error"], a: 1, e: "For each `w`, the new list gets `w.upper()`." },

    { t: "h", text: "Reading many numbers in one line" },
    { t: "p", html: "<p>Now you can combine everything: <code>input()</code> gives one string, <code>split()</code> turns it into a list of strings, and a comprehension converts each one with <code>int()</code>.</p>" },
    { t: "code", code: c`parts = input("Numbers separated by spaces: ").split()
print(parts)
nums = [int(x) for x in parts]
print(nums, "sum =", sum(nums))`, stdin: "4 8 15 16 23 42", note: "<p>The first print shows strings like <code>'4'</code>; after conversion they are real numbers you can add.</p>" },

    { t: "steps", title: "Class report", problem: "<p>The teacher types all marks on one line, for example <code>72 45 90 58 88</code>. Print the number of students, the average (1 decimal), the highest mark, and the passing marks (60 or more) from high to low.</p>", steps: [
      { html: "<p><b>Understand.</b> One line of input → <code>split()</code>. For <code>72 45 90 58 88</code>: 5 students, average 70.6, highest 90, passed <code>[90, 88, 72]</code>.</p>" },
      { html: "<p><b>Turn the line into a list of numbers.</b></p>", code: c`marks = [int(x) for x in input().split()]` },
      { html: "<p><b>Count, average, highest</b> — built-in helpers do the work.</p>", code: c`count = len(marks)
average = sum(marks) / count
highest = max(marks)` },
      { html: "<p><b>Collect the passing marks</b> with a loop and <code>append</code>, then sort them high to low.</p>", code: c`passed = []
for m in marks:
    if m >= 60:
        passed.append(m)
passed.sort(reverse=True)` },
      { html: "<p><b>Print the report.</b></p>", code: c`print("Students:", count)
print(f"Average: {average:.1f}")
print("Highest:", highest)
print("Passed:", passed)` },
    ], code: c`marks = [int(x) for x in input().split()]
count = len(marks)
average = sum(marks) / count
highest = max(marks)
passed = []
for m in marks:
    if m >= 60:
        passed.append(m)
passed.sort(reverse=True)
print("Students:", count)
print(f"Average: {average:.1f}")
print("Highest:", highest)
print("Passed:", passed)`, stdin: "72 45 90 58 88", ar: "split ثم int لكل عنصر، ثم sum و len و max، وقائمة جديدة بـ append للناجحين." },
  ],
  mistakes: [
    { title: "sort() returns None", html: "<code>sort()</code> changes the list and returns <code>None</code>. Storing its result destroys your list.", wrong: c`marks = [3, 1, 2]
marks = marks.sort()
print(marks)   # None!`, right: c`marks = [3, 1, 2]
marks.sort()
print(marks)   # or: print(sorted(marks))` },
    { title: "Index = len", html: "The last index is <code>len(lst) - 1</code>.", wrong: c`a = [1, 2, 3]
print(a[len(a)])`, right: c`a = [1, 2, 3]
print(a[len(a) - 1])   # or a[-1]` },
    { title: "Copying with =", html: "<code>b = a</code> does not copy — both names point to the <b>same</b> list.", wrong: c`a = [1, 2]
b = a
b.append(3)
print(a)   # [1, 2, 3] !`, right: c`a = [1, 2]
b = a.copy()
b.append(3)
print(a)   # [1, 2]`, ar: "b = a لا تنسخ القائمة، بل تعطيها اسمًا ثانيًا. استخدم{{g:|ي}} copy()." },
    { title: "Forgetting to convert after split()", html: "<code>split()</code> gives a list of <b>strings</b>. <code>sum</code> of strings is a <code>TypeError</code>, and <code>max</code> compares them as text (<code>'9' &gt; '10'</code>).", wrong: c`nums = "4 8 15".split()
print(sum(nums))`, right: c`nums = [int(x) for x in "4 8 15".split()]
print(sum(nums))`, ar: "عناصر split نصوص، حوّلها إلى أرقام بـ int قبل الحساب." },
  ],
  tricks: [
    { title: "List comprehensions with range", html: "A comprehension can loop over a <code>range</code> and filter with <code>if</code>:", code: c`squares = [n * n for n in range(1, 6)]
evens = [n for n in range(20) if n % 2 == 0]
print(squares, evens)` },
    { title: "Unpacking", html: "Spread a list into variables. The <code>*</code> variable collects everything in the middle.", code: c`first, *middle, last = [1, 2, 3, 4, 5]
print(first, middle, last)` },
    { title: "zip walks two lists together", html: "<code>zip</code> pairs item 0 with item 0, item 1 with item 1, …", code: c`names = ["Sara", "Omar"]
marks = [95, 88]
for n, m in zip(names, marks):
    print(n, m)` },
  ],
  practice: [
    { t: "predict", code: c`a = [10, 20, 30, 40]
a[1] = 99
a.append(a[0])
print(a, len(a))`, explain: "<code>[10, 99, 30, 40, 10] 5</code>" },
    { t: "predict", code: c`x = [5, 3, 8]
y = sorted(x)
x.reverse()
print(x, y)`, explain: "<code>sorted</code> makes a new list, <code>reverse</code> changes x in place: <code>[8, 3, 5] [3, 5, 8]</code>." },
    { t: "parsons", title: "Collect the long words", prompt: "From the sentence, build a list of words longer than 3 letters and print it.", lines: [c`words = "we love to learn python today".split()`, "long_words = []", "for w in words:", "    if len(w) > 3:", "        long_words.append(w)", "print(long_words)"], distractors: ["        long_words = w"], explain: "Result: <code>['love', 'learn', 'python', 'today']</code>." },
    { t: "try", title: "Class statistics", html: "<p>Add lines that print how many students scored above the average, and the second-highest mark.</p>", code: c`marks = [85, 92, 78, 95, 60, 88, 71]
avg = sum(marks) / len(marks)
print(f"Average: {avg:.1f}")
` },
    { t: "predict", code: c`q = ["Ali", "Noura", "Fahad"]
q.insert(1, "Huda")
q.remove("Ali")
print(q, q[0])`, explain: "After insert: <code>['Ali', 'Huda', 'Noura', 'Fahad']</code>. After remove: <code>['Huda', 'Noura', 'Fahad'] Huda</code>." },
    { t: "predict", code: c`nums = [1, 2, 3, 4, 5, 6]
print([n * 10 for n in nums if n % 2 == 1])`, explain: "Only the odd numbers 1, 3, 5 pass the <code>if</code>, and each is multiplied by 10: <code>[10, 30, 50]</code>." },
    { t: "try", title: "My playlist", html: "<p>Add two songs with <code>append</code>, put your favourite first with <code>insert</code>, remove one you are tired of, then print the playlist numbered from 1 (hint: a counter in the loop).</p>", code: c`playlist = ["Song A", "Song B", "Song C"]
playlist.append("Song D")
for song in playlist:
    print(song)` },
  ],
  exercises: [
    { id: "stats", lvl: "seed", title: "Quick stats", prompt: "<p>Read numbers on one line (separated by spaces) and print the sum, the max and the min on three lines.</p><pre class=\"code-static\">Input: 4 9 1 7\nSum: 21\nMax: 9\nMin: 1</pre>", tests: [{ stdin: "4 9 1 7", expected: "Sum: 21\nMax: 9\nMin: 1" }, { stdin: "-3 -8", expected: "Sum: -11\nMax: -3\nMin: -8" }],
      hint: "<code>nums = [int(x) for x in input().split()]</code>, then <code>sum</code>, <code>max</code>, <code>min</code>.",
      solutions: [{ name: "Built-ins", code: c`nums = [int(x) for x in input().split()]
print("Sum:", sum(nums))
print("Max:", max(nums))
print("Min:", min(nums))` }, { name: "One loop by hand", code: c`nums = [int(x) for x in input().split()]
total = 0
biggest = smallest = nums[0]
for n in nums:
    total += n
    if n > biggest:
        biggest = n
    if n < smallest:
        smallest = n
print("Sum:", total)
print("Max:", biggest)
print("Min:", smallest)`, note: "How max and min work inside. Notice starting from <code>nums[0]</code>, not 0 — otherwise negative lists break." }] },
    { id: "reverse", lvl: "seed", title: "Reverse the words", prompt: "<p>Read a sentence and print its words in reverse order.</p><pre class=\"code-static\">Input: I love Python\nOutput: Python love I</pre>", tests: [{ stdin: "I love Python", expected: "Python love I" }, { stdin: "one", expected: "one" }],
      hint: "<code>split()</code> to get the words, the slice <code>[::-1]</code> to reverse, <code>\" \".join(...)</code> to glue.",
      solutions: [{ name: "Slice + join", code: c`words = input().split()
print(" ".join(words[::-1]))` }, { name: "reverse()", code: c`words = input().split()
words.reverse()
print(" ".join(words))` }] },
    { id: "above", lvl: "star", title: "Above average", prompt: "<p>Read marks on one line. Print the average with 1 decimal, then the marks above average (in original order, separated by spaces).</p><pre class=\"code-static\">Input: 70 80 90 100\nAverage: 85.0\nAbove: 90 100</pre>", tests: [{ stdin: "70 80 90 100", expected: "Average: 85.0\nAbove: 90 100" }, { stdin: "50 50 80", expected: "Average: 60.0\nAbove: 80" }],
      hint: "First compute the average, then loop again and <code>append</code> the marks greater than it. <code>join</code> needs strings: <code>str(m)</code>.",
      solutions: [{ name: "Loop", code: c`marks = [int(x) for x in input().split()]
avg = sum(marks) / len(marks)
above = []
for m in marks:
    if m > avg:
        above.append(str(m))
print(f"Average: {avg:.1f}")
print("Above:", " ".join(above))` }, { name: "Comprehension", code: c`marks = [int(x) for x in input().split()]
avg = sum(marks) / len(marks)
print(f"Average: {avg:.1f}")
print("Above:", *[m for m in marks if m > avg])` }] },
    { id: "dupes", lvl: "star", title: "Remove duplicates, keep order", prompt: "<p>Read words on one line and print them without duplicates, keeping the first appearance order.</p><pre class=\"code-static\">Input: red blue red green blue\nOutput: red blue green</pre>", tests: [{ stdin: "red blue red green blue", expected: "red blue green" }, { stdin: "a a a", expected: "a" }],
      hint: "Start with an empty list <code>seen</code>; append a word only if it is <code>not in seen</code>.",
      solutions: [{ name: "in check", code: c`seen = []
for w in input().split():
    if w not in seen:
        seen.append(w)
print(" ".join(seen))` }, { name: "dict.fromkeys (Day 12 preview)", code: c`print(" ".join(dict.fromkeys(input().split())))`, note: "Dictionaries keep insertion order and cannot have duplicate keys — a clever one-liner." }] },
    { id: "second", lvl: "star", title: "Second largest", prompt: "<p>Read numbers (at least two different values) and print the second largest <b>distinct</b> value.</p>", tests: [{ stdin: "5 9 2 9 7", expected: "7" }, { stdin: "1 2", expected: "1" }],
      hint: "Find the max, build a new list without it, and take the max of that list.",
      solutions: [{ name: "Sort unique", code: c`nums = [int(x) for x in input().split()]
unique = sorted(set(nums))
print(unique[-2])`, note: "<code>set</code> removes duplicates (tomorrow's topic)." }, { name: "Remove the max", code: c`nums = [int(x) for x in input().split()]
top = max(nums)
rest = [n for n in nums if n != top]
print(max(rest))` }, { name: "One pass", code: c`nums = [int(x) for x in input().split()]
first = second = None
for n in nums:
    if first is None or n > first:
        first, second = n, first
    elif n != first and (second is None or n > second):
        second = n
print(second)`, note: "Only one loop, no sorting — the kind of answer interviewers look for." }] },
    { id: "rotate", lvl: "fire", title: "Rotate the list", prompt: "<p>Read a list of numbers (line 1) and k (line 2). Rotate the list k steps to the right and print it with spaces.</p><pre class=\"code-static\">Input: 1 2 3 4 5 then 2\nOutput: 4 5 1 2 3</pre>", tests: [{ stdin: "1 2 3 4 5\n2", expected: "4 5 1 2 3" }, { stdin: "1 2 3\n4", expected: "3 1 2" }, { stdin: "7 8\n0", expected: "7 8" }],
      hint: "k can be bigger than the length: use <code>k % len(lst)</code>.",
      solutions: [{ name: "Slicing", code: c`lst = input().split()
k = int(input()) % len(lst)
print(" ".join(lst[-k:] + lst[:-k]) if k else " ".join(lst))` }, { name: "pop/insert loop", code: c`lst = input().split()
k = int(input()) % len(lst)
for _ in range(k):
    lst.insert(0, lst.pop())
print(" ".join(lst))`, note: "Simulates k single steps. Simple to understand, slower for huge k." }] },
    { id: "fix10", lvl: "fire", debug: true, title: "Top scorer bug", prompt: "<p>The program should print the name of the student with the highest mark: <code>Top: Lina (97)</code>. Fix it.</p>", starter: c`names = ["Sara", "Omar", "Lina", "Faisal"]
marks = [88, 91, 97, 79]
best = 0
for i in range(1, len(names)):
    if marks[i] > marks[best]:
        best = i
print(f"Top: {names[best]} ({marks[i]})")`, tests: [{ expected: "Top: Lina (97)" }],
      ar: "لاحظ{{g:|ي}} المتغير المستخدم في الطباعة بعد انتهاء الحلقة.",
      solutions: [{ name: "Fixed", code: c`names = ["Sara", "Omar", "Lina", "Faisal"]
marks = [88, 91, 97, 79]
best = 0
for i in range(1, len(names)):
    if marks[i] > marks[best]:
        best = i
print(f"Top: {names[best]} ({marks[best]})")`, note: "After the loop, <code>i</code> is the <b>last</b> index, not the best one. Starting the loop at 1 was fine, since best already starts at 0." }, { name: "max with key", code: c`names = ["Sara", "Omar", "Lina", "Faisal"]
marks = [88, 91, 97, 79]
best = marks.index(max(marks))
print(f"Top: {names[best]} ({marks[best]})")` }] },
    { id: "cart10", lvl: "seed", title: "Shopping cart total", prompt: "<p>Read prices on one line (they may have decimals). Print how many items are in the cart and the total with 2 decimals.</p><pre class=\"code-static\">Input: 12.5 30 7.25\nItems: 3\nTotal: 49.75</pre>", tests: [{ stdin: "12.5 30 7.25", expected: "Items: 3\nTotal: 49.75" }, { stdin: "5", expected: "Items: 1\nTotal: 5.00" }],
      hint: "Convert with <code>float</code>: <code>[float(x) for x in input().split()]</code>. Then <code>len</code>, <code>sum</code> and <code>:.2f</code>.",
      solutions: [{ name: "Comprehension + built-ins", code: c`prices = [float(x) for x in input().split()]
print("Items:", len(prices))
print(f"Total: {sum(prices):.2f}")` }, { name: "Loop + append", code: c`prices = []
for x in input().split():
    prices.append(float(x))
total = 0
for p in prices:
    total += p
print("Items:", len(prices))
print(f"Total: {total:.2f}")`, note: "The long way: build the list with <code>append</code> and add with an accumulator." }] },
  ],
  quiz: [
    { q: "After `a = [1, 2, 3]; a.append([4, 5])`, what is `len(a)`?", o: ["5", "4", "3", "An error"], a: 1, e: "The whole list [4, 5] is ONE item." },
    { q: "What does `\"a,b,c\".split(\",\")` return?", o: ["`['a,b,c']`", "`['a', 'b', 'c']`", "`('a','b','c')`", "`abc`"], a: 1, e: "split cuts at the separator." },
    { q: "`nums.sort()` returns…", o: ["the sorted list", "`None`", "a copy", "an error"], a: 1, e: "It sorts in place." },
    { q: "What is `[x * 2 for x in [1, 2, 3]]`?", o: ["`[1,2,3,1,2,3]`", "`[2, 4, 6]`", "`6`", "`[1, 2, 3, 2]`"], a: 1, e: "A list comprehension." },
    { q: "`b = a` then `b.append(9)`. What happens to `a`?", o: ["Unchanged", "Also gets 9", "Error", "Becomes empty"], a: 1, e: "Same list, two names." },
    { q: "What does `[5, 6, 7].pop()` return?", o: ["`5`", "`7`", "`[5, 6]`", "`None`"], a: 1, e: "`pop()` with no index removes and returns the **last** item." },
  ],
  puzzle: { title: "Slice ninja", q: "<p>What does this print?</p>", code: c`a = list(range(10))
print(a[2:8:2][::-1])`, answers: ["[6, 4, 2]", "[6,4,2]", "6 4 2"], hint: "First slice: 2, 4, 6. Then reverse.", ar: "القص الأول يعطي 2 و 4 و 6 ثم نعكس.", e: "<code>[6, 4, 2]</code>" },
  cards: [
    { f: "Add to the end of a list", b: "`lst.append(x)`" },
    { f: "`sort()` vs `sorted()`", b: "`sort()` changes the list and returns None; `sorted()` returns a new list." },
    { f: "Turn `\"4 8 15\"` into a list of ints", b: "`[int(x) for x in s.split()]`" },
    { f: "Glue a list of words with spaces", b: "`\" \".join(words)`" },
    { f: "How to really copy a list?", b: "`b = a.copy()` or `a[:]`" },
  ],
  remember: [
    "A list keeps many values in order: `marks = [85, 92, 78]`; `len(marks)` is the number of items.",
    "Indexes start at 0; `lst[-1]` is the last item; slices like `lst[1:3]` give a new list.",
    "Lists are mutable: `lst[i] = x`, `append`, `insert`, `remove`, `pop` change the list itself.",
    "`for item in lst:` visits every item; use `sum`, `max`, `min`, `len` for quick statistics.",
    "`sorted(lst)` returns a new list; `lst.sort()` changes the list and returns `None`.",
    "`split()` turns text into a list of strings; `[int(x) for x in parts]` converts them all.",
  ],
  rememberAr: "القائمة تخزن قيمًا كثيرة بترتيب، ويمكن تعديلها. الترقيم من صفر، و split تعطي نصوصًا يجب تحويلها إلى أرقام.",
};
})();

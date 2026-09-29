window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[10] = {
  title: "Lists: many values in one variable",
  intro: "A class has 40 students. You would not create 40 variables for their marks. A <b>list</b> keeps many values in order under one name — and with a loop you can process all of them in two lines. Lists are everywhere: shopping carts, playlists, sensor readings, training data for AI.",
  introAr: "القائمة (list) تخزن قيمًا كثيرة بترتيب تحت اسم واحد. نتعلم إنشاءها والوصول لعناصرها وتعديلها، والمرور عليها بحلقة، والدوال المفيدة مثل sum و max و sort.",
  goals: ["Create lists and access items by index and slice", "Add, change and remove items (`append`, `insert`, `remove`, `pop`)", "Loop over lists and compute totals, max and averages", "Sort with `sort()` and `sorted()`", "Build a list from user input with `split()`"],
  learn: [
    { t: "h", text: "Creating and reading lists" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
names = ["{{name}}", "Omar", "Lina"]
mixed = [19, "CS", 4.5, True]
print(marks)
print(marks[0], marks[-1])
print(marks[1:3])
print(len(names), "students")
print("Omar" in names)` },
    { t: "p", html: "<p>Everything you learned about string indexes and slices works on lists. The big difference: lists are <b>mutable</b> — you can change them in place.</p>" },
    { t: "h", text: "Changing a list" },
    { t: "viz", code: c`cart = ["milk", "bread"]
cart.append("dates")
cart.insert(0, "coffee")
cart[2] = "brown bread"
cart.remove("milk")
last = cart.pop()
print(cart, last)`, before: "<p>Visualize and watch the list change after each method.</p>" },
    { t: "table", head: ["Method", "What it does"], rows: [["`lst.append(x)`", "add x at the end"], ["`lst.insert(i, x)`", "insert x at position i"], ["`lst[i] = x`", "replace the item at i"], ["`lst.remove(x)`", "delete the first x (error if missing)"], ["`lst.pop()` / `lst.pop(i)`", "remove and return the last / item i"], ["`lst.sort()`", "sort in place (returns None!)"], ["`sorted(lst)`", "return a new sorted list"], ["`lst.count(x)`, `lst.index(x)`", "how many x / position of x"]] },
    { t: "ar", html: "القائمة قابلة للتعديل عكس النص. append تضيف في النهاية، و pop تحذف آخر عنصر وترجعه. وتذكر{{g:|ي}} أن الترقيم يبدأ من صفر." },
    { t: "h", text: "Lists + loops = superpower" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
total = 0
for m in marks:
    total += m
print("Average:", total / len(marks))
print("Built-ins:", sum(marks), max(marks), min(marks))
print("Sorted:", sorted(marks))
print("Top 3:", sorted(marks, reverse=True)[:3])` },
    { t: "h", text: "Building a list step by step" },
    { t: "code", code: c`passed = []
for m in [85, 42, 78, 55, 91]:
    if m >= 60:
        passed.append(m)
print(passed)

words = "python is fun to learn".split()
print(words, len(words))
print("-".join(words))`, note: "<p><code>split()</code> cuts a string into a list of words; <code>join()</code> glues a list of strings back together. These two appear in almost every program that handles text.</p>" },
    { t: "h", text: "Reading many numbers in one line" },
    { t: "code", code: c`nums = input("Numbers separated by spaces: ").split()
nums = [int(x) for x in nums]
print(nums, "sum =", sum(nums))`, stdin: "4 8 15 16 23 42", note: "<p><code>[int(x) for x in nums]</code> is a <b>list comprehension</b>: \"make a list of int(x) for each x\". Short for a loop with append. You will love it.</p>" },
  ],
  mistakes: [
    { title: "sort() returns None", html: "", wrong: c`marks = [3, 1, 2]
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
  ],
  tricks: [
    { title: "List comprehensions", html: "", code: c`squares = [n * n for n in range(1, 6)]
evens = [n for n in range(20) if n % 2 == 0]
print(squares, evens)` },
    { title: "Unpacking", html: "", code: c`first, *middle, last = [1, 2, 3, 4, 5]
print(first, middle, last)` },
    { title: "zip walks two lists together", html: "", code: c`names = ["Sara", "Omar"]
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
  ],
  exercises: [
    { id: "stats", lvl: "seed", title: "Quick stats", prompt: "<p>Read numbers on one line (separated by spaces) and print the sum, the max and the min on three lines.</p><pre class=\"code-static\">Input: 4 9 1 7\nSum: 21\nMax: 9\nMin: 1</pre>", tests: [{ stdin: "4 9 1 7", expected: "Sum: 21\nMax: 9\nMin: 1" }, { stdin: "-3 -8", expected: "Sum: -11\nMax: -3\nMin: -8" }],
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
      solutions: [{ name: "Slice + join", code: c`words = input().split()
print(" ".join(words[::-1]))` }, { name: "reverse()", code: c`words = input().split()
words.reverse()
print(" ".join(words))` }] },
    { id: "above", lvl: "star", title: "Above average", prompt: "<p>Read marks on one line. Print the average with 1 decimal, then the marks above average (in original order, separated by spaces).</p><pre class=\"code-static\">Input: 70 80 90 100\nAverage: 85.0\nAbove: 90 100</pre>", tests: [{ stdin: "70 80 90 100", expected: "Average: 85.0\nAbove: 90 100" }, { stdin: "50 50 80", expected: "Average: 60.0\nAbove: 80" }],
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
      solutions: [{ name: "in check", code: c`seen = []
for w in input().split():
    if w not in seen:
        seen.append(w)
print(" ".join(seen))` }, { name: "dict.fromkeys (Day 12 preview)", code: c`print(" ".join(dict.fromkeys(input().split())))`, note: "Dictionaries keep insertion order and cannot have duplicate keys — a clever one-liner." }] },
    { id: "second", lvl: "star", title: "Second largest", prompt: "<p>Read numbers (at least two different values) and print the second largest <b>distinct</b> value.</p>", tests: [{ stdin: "5 9 2 9 7", expected: "7" }, { stdin: "1 2", expected: "1" }],
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
  ],
  quiz: [
    { q: "After `a = [1, 2, 3]; a.append([4, 5])`, what is `len(a)`?", o: ["5", "4", "3", "An error"], a: 1, e: "The whole list [4, 5] is ONE item." },
    { q: "What does `\"a,b,c\".split(\",\")` return?", o: ["`['a,b,c']`", "`['a', 'b', 'c']`", "`('a','b','c')`", "`abc`"], a: 1, e: "split cuts at the separator." },
    { q: "`nums.sort()` returns…", o: ["the sorted list", "`None`", "a copy", "an error"], a: 1, e: "It sorts in place." },
    { q: "What is `[x * 2 for x in [1, 2, 3]]`?", o: ["`[1,2,3,1,2,3]`", "`[2, 4, 6]`", "`6`", "`[1, 2, 3, 2]`"], a: 1, e: "A list comprehension." },
    { q: "`b = a` then `b.append(9)`. What happens to `a`?", o: ["Unchanged", "Also gets 9", "Error", "Becomes empty"], a: 1, e: "Same list, two names." },
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
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[22] = {
  title: "Problem solving: searching and sorting",
  intro: "Welcome to the final week of lessons, {{name}}! Before AI, one essential skill: thinking about <b>algorithms</b> — not just \"does it work?\" but \"how fast is it when the data gets huge?\". Searching and sorting are the classic place to learn this, and every AI library is built on these ideas.",
  introAr: "الخوارزمية = خطوات واضحة لحل مشكلة. اليوم نقارن طرق البحث (الخطي والثنائي) وطرق الترتيب، ونتعلم كيف نفكر في سرعة الخوارزمية عندما تكبر البيانات (Big-O).",
  goals: ["Write linear search and binary search", "Explain why binary search needs sorted data", "Implement selection sort and bubble sort", "Count steps to compare algorithms (Big-O intuition)", "Know when to just use `sorted()`"],
  learn: [
    { t: "h", text: "What is an algorithm?" },
    { t: "p", html: "<p>An <b>algorithm</b> is a clear list of steps that solves a problem. Every program you wrote is one. Today's new question: two programs give the <b>same answer</b>, but which is <b>faster</b>? With 10 items you can't feel it. With 10 million (a national exam database, an AI training set) one finishes in a blink and the other runs all night.</p>" },
    { t: "analogy", title: "Two ways to find a word in a dictionary", html: "<p>Way 1: start at page 1 and read every word until you find <i>\"python\"</i>. Way 2: open the middle, see you are at <i>\"M\"</i>, so jump to the second half, and keep halving. Both ways find the word. Way 2 needs a handful of jumps instead of thousands of words. Same problem, same answer, very different <b>algorithm</b>.</p>" },

    { t: "h", text: "Linear search: check one by one" },
    { t: "p", html: "<p>The simplest way to find something in a list is to look at each item in order until you find it. Imagine checking whether student ID 337 is on the attendance list: you read the first ID, then the second… That is <b>linear search</b>. It works on <b>any</b> list, sorted or not.</p>" },
    { t: "code", code: c`def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
    return -1

ids = [504, 118, 902, 337, 250]
print(linear_search(ids, 337))
print(linear_search(ids, 999))`, before: "<p>The function returns the <b>position</b> (index) of the target, or <code>-1</code> when it is not there.</p>", note: "<p>337 is at index <code>3</code>. 999 is missing, so the loop checks all 5 items and returns <code>-1</code>.</p>" },
    { t: "lines", rows: [
      ["for i in range(len(items)):", "Walk through every <b>position</b> 0, 1, 2, … (we want to return <i>where</i> the target is)."],
      ["    if items[i] == target:", "Compare the item at this position with what we are looking for."],
      ["        return i", "Found it! <code>return</code> stops the function at once — no need to look at the rest."],
      ["    return -1", "This line is <b>after</b> the loop (less indented). We only reach it when the loop finished without finding the target."],
    ] },
    { t: "ar", html: "البحث الخطي يمر على العناصر واحدًا واحدًا. انتبه{{g:|ي}}: سطر return -1 يكون بعد الحلقة وليس داخلها، وإلا سيتوقف البحث بعد أول عنصر." },
    { t: "check", q: "What does this print?", code: c`print(linear_search([7, 3, 7, 1], 7))`, o: ["`0`", "`2`", "`[0, 2]`", "`-1`"], a: 0, e: "The search stops at the <b>first</b> match, index 0. It never reaches the second 7.", hint: "`return` ends the function the moment a match is found." },

    { t: "h", text: "Counting the work: Big-O" },
    { t: "p", html: "<p>Seconds depend on the computer, so programmers count <b>steps</b> instead. For linear search, the worst case is a target that is missing or at the very end: it checks <b>every</b> item. 10 items → 10 checks, a million items → a million checks. The work grows in the same proportion as <b>n</b>, the size of the data. We write that as <b>O(n)</b> (say \"order n\"). This way of describing growth is called <b>Big-O</b>.</p>" },
    { t: "code", code: c`checks = 0
ids = [504, 118, 902, 337, 250]
for x in ids:
    checks += 1
    if x == 999:
        break
print("checks:", checks)`, note: "<p>999 is missing, so all <code>5</code> items were checked. A list 10 times longer means 10 times more checks — that is O(n).</p>" },
    { t: "ar", html: "Big-O يصف كيف يزيد العمل عندما تكبر البيانات، وليس عدد الثواني. O(n) يعني: ضاعف البيانات يتضاعف العمل." },
    { t: "check", q: "A list has 500 names and the name you search for is **not** in it. How many comparisons does linear search make?", o: ["1", "about 9", "250", "500"], a: 3, e: "To be sure a name is missing, linear search must look at every one of the 500 items." },

    { t: "h", text: "Binary search: halve the problem" },
    { t: "p", html: "<p>When the data is <b>sorted</b>, we can do much better. Look at the middle item. If it is smaller than the target, the target can only be in the right half, so throw away the whole left half. If it is bigger, throw away the right half. Repeat on the half that is left. Every look removes <b>half</b> of the remaining items.</p>" },
    { t: "analogy", title: "The guessing game strategy", html: "<p>Remember guessing a number from 1 to 100 when your friend says only \"higher\" or \"lower\"? The smart strategy is to guess 50, then 25 or 75, and so on — each guess throws away half of the possibilities, so you always win in 7 guesses or fewer. That's binary search. And it only works because numbers have an <b>order</b>: \"higher\" means something.</p>" },
    { t: "viz", code: c`def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

data = [3, 8, 15, 21, 34, 42, 57, 63, 78, 91]
print(binary_search(data, 57))`, before: "<p><code>low</code> and <code>high</code> mark the part of the list where the target can still be. Visualize and watch them close in on 57.</p>" },
    { t: "lines", rows: [
      ["low, high = 0, len(items) - 1", "At the start the target could be anywhere: from the first index to the last."],
      ["while low <= high:", "Keep going while the search area still has at least one item. When <code>low</code> passes <code>high</code>, the area is empty: not found."],
      ["    mid = (low + high) // 2", "The middle position. <code>//</code> keeps it a whole number, because an index can't be 4.5."],
      ["    elif items[mid] < target:", "The middle is too small, so everything to its left is too small too…"],
      ["        low = mid + 1", "…so the search area now starts just <b>after</b> mid. The <code>+ 1</code> matters: mid is already checked."],
    ] },
    { t: "table", head: ["Round", "low", "mid", "high", "items[mid]", "Decision"], rows: [["1", "0", "4", "9", "34", "34 < 57 → go right, low = 5"], ["2", "5", "7", "9", "63", "63 > 57 → go left, high = 6"], ["3", "5", "5", "6", "42", "42 < 57 → go right, low = 6"], ["4", "6", "6", "6", "57", "found! return 6"]] },
    { t: "p", html: "<p>Four rounds for 10 items. The real magic shows on big data:</p>" },
    { t: "table", head: ["Items (n)", "Linear search (worst)", "Binary search (worst)"], rows: [["10", "10", "4"], ["1,000", "1,000", "10"], ["1,000,000", "1,000,000", "20"], ["1,000,000,000", "1,000,000,000", "30"]] },
    { t: "ar", html: "البحث الثنائي يقسم البيانات نصفين في كل خطوة، لذلك مليون عنصر يحتاج 20 خطوة فقط! لكن بشرط أن تكون البيانات مرتبة. هذا ما يسمى O(log n)." },
    { t: "p", html: "<p>\"How many times can I halve n until 1 is left?\" is the <b>logarithm</b> base 2 of n, so binary search is <b>O(log n)</b>. Doubling the data adds just <b>one</b> more step.</p>" },
    { t: "check", q: "In this list, binary search starts with `low = 0` and `high = 9`. Which index does it look at first?", code: c`data = [3, 8, 15, 21, 34, 42, 57, 63, 78, 91]`, o: ["0", "4", "5", "9"], a: 1, e: "`mid = (0 + 9) // 2 = 4`, so the first item checked is `data[4]`, which is 34.", hint: "Compute `(low + high) // 2`." },

    { t: "h", text: "Why the data must be sorted" },
    { t: "p", html: "<p>Binary search <b>trusts</b> the order: when it throws away a half, it assumes the target can't be there. On an unsorted list that is false, and you get a wrong answer with no error.</p>" },
    { t: "code", code: c`def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([9, 2, 7, 4], 9))           # unsorted: wrong!
print(binary_search(sorted([9, 2, 7, 4]), 9))   # sorted: found`, note: "<p>The first call returns <code>-1</code> although 9 is at index 0: binary search kept moving right and threw away the part that held 9. After sorting, the list is <code>[2, 4, 7, 9]</code> and 9 is found at index <code>3</code>.</p>" },
    { t: "check", q: "Why can binary search give a wrong answer on `[9, 2, 7, 4]`?", o: ["The list is too short", "It throws away halves assuming the items are in order, but they aren't", "Binary search only works with strings", "It needs an even number of items"], a: 1, e: "Halving only makes sense when \"smaller\" items are on the left and \"bigger\" ones on the right." },

    { t: "h", text: "Sorting by hand: selection sort" },
    { t: "p", html: "<p>Since binary search needs sorted data, how does sorting work? Python's <code>sorted()</code> does it for us, but writing one sort by hand teaches you how to think in loops. The easiest to understand is <b>selection sort</b>.</p>" },
    { t: "analogy", title: "Lining up for a class photo", html: "<p>The teacher wants students in order of height. She looks at everyone, picks the shortest, and puts them in place 1. Then she looks at the students who are left, picks the shortest, and puts them in place 2. And so on, until everyone has a place. Every round <b>selects</b> the smallest of the rest — selection sort.</p>" },
    { t: "viz", code: c`def selection_sort(items):
    a = items.copy()
    for i in range(len(a)):
        smallest = i
        for j in range(i + 1, len(a)):
            if a[j] < a[smallest]:
                smallest = j
        a[i], a[smallest] = a[smallest], a[i]
    return a

print(selection_sort([29, 10, 14, 37, 13]))`, before: "<p>Watch <code>i</code> (the place we are filling) and <code>smallest</code> (the best candidate found so far).</p>" },
    { t: "lines", rows: [
      ["for i in range(len(a)):", "Fill place 0, then place 1, then place 2…"],
      ["    smallest = i", "Guess that the item already at place i is the smallest of the rest."],
      ["    for j in range(i + 1, len(a)):", "Look at every item <b>after</b> place i and remember the position of anything smaller."],
      ["    a[i], a[smallest] = a[smallest], a[i]", "Swap the smallest into place i. (The one-line swap from Day 2.)"],
    ] },
    { t: "p", html: "<p>How much work is that? For each of the n places, the inner loop scans the rest of the list. That is roughly n × n comparisons, so selection sort is <b>O(n²)</b> (\"order n squared\"). Double the data and the work becomes <b>four</b> times bigger.</p>" },
    { t: "ar", html: "الترتيب بالاختيار: في كل دورة نبحث عن أصغر عنصر في الجزء الباقي ونضعه في مكانه. حلقتان متداخلتان تعنيان تقريبًا n×n خطوة، أي O(n²)." },
    { t: "check", q: "What does the list look like after the **first** round of selection sort (i = 0)?", code: c`[29, 10, 14, 37, 13]`, o: ["`[10, 13, 14, 29, 37]`", "`[10, 29, 14, 37, 13]`", "`[29, 10, 14, 13, 37]`", "`[10, 14, 29, 37, 13]`"], a: 1, e: "Round 1 finds the smallest item (10, at index 1) and swaps it with index 0. Only those two items move." },

    { t: "h", text: "Measuring it — and why we use sorted()" },
    { t: "code", code: c`import random, time
random.seed(0)
data = [random.randint(1, 10**6) for _ in range(2000)]

def selection_sort(items):
    a = items.copy()
    for i in range(len(a)):
        s = i
        for j in range(i + 1, len(a)):
            if a[j] < a[s]:
                s = j
        a[i], a[s] = a[s], a[i]
    return a

t = time.time(); selection_sort(data); print("selection sort:", round(time.time() - t, 3), "s")
t = time.time(); sorted(data); print("sorted():      ", round(time.time() - t, 4), "s")`, noViz: true, before: "<p>Time both on 2,000 random numbers. Your times will differ — compare the <b>gap</b>.</p>", note: "<p>Python's <code>sorted()</code> uses <b>Timsort</b>, an O(n log n) algorithm written in C. In real work always use it. We write sorts by hand to <b>understand</b> algorithms (and because job interviews love them).</p>" },
    { t: "table", head: ["Big-O", "Name", "Example", "Work for n = 1,000"], rows: [["O(1)", "constant", "`d[key]`, `lst[5]`, `x in my_set`", "1"], ["O(log n)", "logarithmic", "binary search", "about 10"], ["O(n)", "linear", "linear search, `sum(lst)`, `max(lst)`", "1,000"], ["O(n log n)", "linearithmic", "`sorted()`, merge sort", "about 10,000"], ["O(n²)", "quadratic", "selection/bubble sort, two nested loops", "1,000,000"]] },
    { t: "ar", html: "في العمل الحقيقي استخدم{{g:|ي}} sorted() لأنه سريع ومُختبَر. نكتب خوارزميات الترتيب بأيدينا فقط لنفهم طريقة التفكير." },

    { t: "steps", title: "Is this book in the library?", problem: "<p>A library has 1,000 books with numbers 1000 to 1999, stored in a <b>sorted</b> list. Students ask for books all day. Compare how many checks linear search and binary search need for a few requests.</p>", steps: [
      { html: "<p><b>Understand.</b> Input: a sorted list and a wanted number. Output: was it found, and how many checks were needed? So each function should return two things: <code>(found, checks)</code>.</p>" },
      { html: "<p><b>Plan.</b> Take today's two searches, add a <code>checks</code> counter, and return a tuple instead of an index.</p>" },
      { html: "<p><b>Build linear search with a counter.</b></p>", code: c`def linear_checks(items, target):
    checks = 0
    for x in items:
        checks += 1
        if x == target:
            return True, checks
    return False, checks` },
      { html: "<p><b>Build binary search with a counter.</b> One check per round of the <code>while</code> loop.</p>", code: c`def binary_checks(items, target):
    low, high = 0, len(items) - 1
    checks = 0
    while low <= high:
        checks += 1
        mid = (low + high) // 2
        if items[mid] == target:
            return True, checks
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return False, checks` },
      { html: "<p><b>Compare.</b> Try the first, a middle, the last and a missing book. Linear search wins only for the first book; binary search never needs more than 10 checks.</p>" },
    ], code: c`def linear_checks(items, target):
    checks = 0
    for x in items:
        checks += 1
        if x == target:
            return True, checks
    return False, checks

def binary_checks(items, target):
    low, high = 0, len(items) - 1
    checks = 0
    while low <= high:
        checks += 1
        mid = (low + high) // 2
        if items[mid] == target:
            return True, checks
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return False, checks

books = list(range(1000, 2000))   # 1,000 sorted book numbers
for wanted in [1000, 1777, 1999, 2500]:
    print(wanted, "linear:", linear_checks(books, wanted), "binary:", binary_checks(books, wanted))`, ar: "مع 1000 كتاب مرتب: البحث الخطي قد يحتاج 1000 مقارنة، أما الثنائي فلا يتجاوز 10 مقارنات." },
  ],
  mistakes: [
    { title: "Binary search on unsorted data", html: "It gives no error — it silently returns wrong answers.", wrong: c`binary_search([9, 2, 7, 4], 9)   # -1, but 9 is there!`, right: c`binary_search(sorted([9, 2, 7, 4]), 9)`, ar: "البحث الثنائي يحتاج قائمة مرتبة. رتّب{{g:|ي}} أولًا بـ sorted()." },
    { title: "Infinite binary search", html: "Forgetting <code>+ 1</code> / <code>- 1</code> can make low and high stop moving, so the loop never ends.", wrong: c`low = mid`, right: c`low = mid + 1`, ar: "لازم يتحرك low أو high في كل دورة وإلا لن تتوقف الحلقة." },
    { title: "return -1 inside the loop", html: "If \"not found\" is returned in an <code>else</code> inside the loop, the search gives up after the first item.", wrong: c`for i in range(len(items)):
    if items[i] == target:
        return i
    else:
        return -1`, right: c`for i in range(len(items)):
    if items[i] == target:
        return i
return -1` },
    { title: "x = lst.sort() gives None", html: "<code>.sort()</code> sorts the list in place and returns <code>None</code>. Use <code>sorted(lst)</code> when you want a new sorted list.", wrong: c`marks = [70, 95, 60]
ordered = marks.sort()    # ordered is None`, right: c`marks = [70, 95, 60]
ordered = sorted(marks)   # [60, 70, 95]` },
  ],
  tricks: [
    { title: "bisect: binary search built in", html: "The <code>bisect</code> module does binary search for you on a sorted list, and can insert a new item while keeping the order.", code: c`import bisect
data = [3, 8, 15, 21, 34]
print(bisect.bisect_left(data, 21))   # 3
bisect.insort(data, 10)               # insert keeping order
print(data)` },
    { title: "Sets and dicts beat searching", html: "If you search many times, put the data in a <code>set</code> or <code>dict</code> once: each lookup becomes O(1).", code: c`ids = [504, 118, 902, 337, 250]
id_set = set(ids)       # build once
print(337 in id_set)    # instant, however big the set
print(999 in id_set)` },
    { title: "Don't sort just to find the smallest", html: "<code>min()</code> and <code>max()</code> are O(n): one pass. Sorting is O(n log n). Sort only when you need the full order — or the top few.", code: c`marks = [70, 95, 60, 88, 91]
print(min(marks), max(marks))          # one pass each
print(sorted(marks, reverse=True)[:3]) # top 3 needs sorting` },
  ],
  practice: [
    { t: "predict", code: c`import math
print(math.ceil(math.log2(1_000_000)))`, explain: "<code>20</code>: halving a million 20 times reaches 1. That's the max number of binary search steps." },
    { t: "predict", code: c`steps = 0
n = 5
for i in range(n):
    for j in range(n):
        steps += 1
print(steps)`, explain: "5 × 5 = <code>25</code>. Double n and the steps quadruple — that's O(n²)." },
    { t: "predict", code: c`low, high = 0, 7
for r in range(3):
    mid = (low + high) // 2
    low = mid + 1
    print(low, high)`, explain: "Each round moves <code>low</code> just past the middle: mid 3 → <code>4 7</code>, mid 5 → <code>6 7</code>, mid 6 → <code>7 7</code>. The search area shrinks from 8 items to 4, 2, then 1." },
    { t: "parsons", title: "Linear search", prompt: "Put the lines in order so the function returns the index of the target, or -1.", lines: ["def find(items, target):", "    for i in range(len(items)):", "        if items[i] == target:", "            return i", "    return -1"], distractors: ["        else:"], explain: "The <code>return -1</code> belongs <b>after</b> the loop. An <code>else</code> inside the loop would stop after the first item." },
    { t: "parsons", title: "Bubble sort", prompt: "Arrange bubble sort: repeatedly swap neighbors that are in the wrong order.", lines: ["def bubble_sort(a):", "    n = len(a)", "    for i in range(n):", "        for j in range(n - 1 - i):", "            if a[j] > a[j + 1]:", "                a[j], a[j + 1] = a[j + 1], a[j]", "    return a"], explain: "After each outer round the largest remaining item has bubbled to the end, so the inner loop can stop earlier (<code>n - 1 - i</code>)." },
    { t: "viz", code: c`a = [5, 1, 4, 2]
for j in range(len(a) - 1):
    if a[j] > a[j + 1]:
        a[j], a[j + 1] = a[j + 1], a[j]
    print(a)`, before: "<p>One round of bubble sort. Watch the biggest number, 5, \"bubble\" to the end by swapping with each neighbor.</p>" },
    { t: "try", title: "Count the steps", html: "<p>Add a counter to <code>binary_search</code> and print how many loop rounds it takes to find different targets in <code>list(range(1000))</code>. Can you find a target that needs exactly 10 rounds?</p>", code: c`def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search(list(range(1000)), 777))` },
    { t: "try", title: "Sort by your own rule", html: "<p>In real code you sort with <code>sorted()</code> and a <code>key</code>. Change the program to sort by name, then by mark from highest to lowest (<code>reverse=True</code>).</p>", code: c`students = [("Sara", 88), ("Omar", 95), ("Lina", 72), ("Fahad", 88)]
by_mark = sorted(students, key=lambda s: s[1])
print(by_mark)` },
  ],
  exercises: [
    { id: "count", lvl: "seed", title: "Count occurrences", prompt: "<p>Write <code>count_of(items, target)</code> with a loop (no <code>.count()</code>). Like linear search, but don't stop at the first match — count them all.</p>", starter: "def count_of(items, target):\n    pass\n", tests: [{ after: "print(count_of([1, 3, 1, 1, 2], 1), count_of([], 5))", expected: "3 0" }],
      hint: "Start a counter at 0, loop over every item, add 1 when it equals the target.",
      solutions: [{ name: "Loop", code: c`def count_of(items, target):
    n = 0
    for x in items:
        if x == target:
            n += 1
    return n` }] },
    { id: "bs", lvl: "star", title: "Binary search with steps", prompt: "<p>Write <code>binary_search(items, target)</code> returning a tuple <code>(index, steps)</code> where steps = loop rounds; index = -1 if missing.</p>", starter: "def binary_search(items, target):\n    pass\n", tests: [{ after: "d = list(range(0, 100, 2))\nprint(binary_search(d, 50))\nprint(binary_search(d, 51))\nprint(binary_search([7], 7))", expected: "(25, 5)\n(-1, 6)\n(0, 1)" }],
      hint: "Add <code>steps += 1</code> as the first line inside the <code>while</code> loop, like in the worked example.", ar: "ابدأ{{g:|ي}} العداد بصفر وزِده في أول سطر داخل الحلقة.",
      solutions: [{ name: "Iterative", code: c`def binary_search(items, target):
    low, high = 0, len(items) - 1
    steps = 0
    while low <= high:
        steps += 1
        mid = (low + high) // 2
        if items[mid] == target:
            return mid, steps
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1, steps` }] },
    { id: "rbs", lvl: "star", title: "Recursive binary search", prompt: "<p>Write <code>search(items, target, low=0, high=None)</code> recursively, returning the index or -1.</p>", starter: "def search(items, target, low=0, high=None):\n    pass\n", tests: [{ after: "d = [3, 8, 15, 21, 34, 42]\nprint(search(d, 3), search(d, 42), search(d, 20))", expected: "0 5 -1" }],
      hint: "Base case: <code>low &gt; high</code> means an empty range → -1. Otherwise check the middle and call <code>search</code> on one half.",
      solutions: [{ name: "Recursive", code: c`def search(items, target, low=0, high=None):
    if high is None:
        high = len(items) - 1
    if low > high:
        return -1
    mid = (low + high) // 2
    if items[mid] == target:
        return mid
    if items[mid] < target:
        return search(items, target, mid + 1, high)
    return search(items, target, low, mid - 1)`, note: "Base case: empty range. Each call halves the range." }] },
    { id: "insertion", lvl: "star", title: "Insertion sort", prompt: "<p>Write <code>insertion_sort(a)</code> that returns a new sorted list: take items one by one and insert each into the correct place in the already-sorted part. Don't use <code>sort()</code>/<code>sorted()</code>.</p>", starter: "def insertion_sort(a):\n    pass\n", tests: [{ after: "print(insertion_sort([5, 2, 9, 1, 5, 6]))\nprint(insertion_sort([]))", expected: "[1, 2, 5, 5, 6, 9]\n[]" }],
      hint: "Think of sorting playing cards in your hand: pick up the next card and slide it left past every bigger card.",
      solutions: [{ name: "Shift and insert", code: c`def insertion_sort(a):
    a = a.copy()
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a`, note: "Like sorting cards in your hand. Very fast when the data is almost sorted." }, { name: "Build a new list", code: c`def insertion_sort(a):
    result = []
    for x in a:
        i = 0
        while i < len(result) and result[i] <= x:
            i += 1
        result.insert(i, x)
    return result` }] },
    { id: "merge", lvl: "fire", title: "Merge two sorted lists", prompt: "<p>Write <code>merge(a, b)</code> that merges two <b>sorted</b> lists into one sorted list in O(n) — walk both with two pointers (no sorting!). Then write <code>merge_sort(a)</code> using it recursively.</p>", starter: "def merge(a, b):\n    pass\n\ndef merge_sort(a):\n    pass\n", tests: [{ after: "print(merge([1, 4, 9], [2, 3, 10, 11]))\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))", expected: "[1, 2, 3, 4, 9, 10, 11]\n[3, 9, 10, 27, 38, 43, 82]" }],
      hint: "<code>merge</code>: compare <code>a[i]</code> and <code>b[j]</code>, take the smaller one and move that pointer. <code>merge_sort</code>: a list of 0 or 1 items is already sorted; otherwise split in half, sort each half, merge.",
      solutions: [{ name: "Two pointers", code: c`def merge(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    return out + a[i:] + b[j:]

def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))`, note: "Merge sort is O(n log n): split in halves (log n levels), merge each level in O(n). Divide and conquer!" }] },
    { id: "twosum", lvl: "fire", title: "Two sum (interview classic)", prompt: "<p>Write <code>two_sum(nums, target)</code> returning the indexes <code>(i, j)</code>, i &lt; j, of two numbers adding to target, or <code>None</code>. Aim for O(n) using a dict.</p>", starter: "def two_sum(nums, target):\n    pass\n", tests: [{ after: "print(two_sum([2, 7, 11, 15], 9))\nprint(two_sum([3, 2, 4], 6))\nprint(two_sum([1, 2], 7))", expected: "(0, 1)\n(1, 2)\nNone" }],
      hint: "For each number x you need <code>target - x</code>. Keep a dict of numbers already seen → their index.",
      solutions: [{ name: "Brute force O(n²)", code: c`def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return (i, j)
    return None` }, { name: "Dict O(n)", code: c`def two_sum(nums, target):
    seen = {}                    # value -> index
    for j, x in enumerate(nums):
        need = target - x
        if need in seen:
            return (seen[need], j)
        seen[x] = j
    return None`, note: "Trading memory for speed: one pass, each lookup O(1). This trick solves many interview problems." }] },
    { id: "fix22", lvl: "fire", debug: true, title: "Broken binary search", prompt: "<p>Fix it so the test prints <code>3 -1 0</code> (and doesn't loop forever).</p>", starter: c`def bsearch(a, t):
    low, high = 0, len(a)
    while low < high:
        mid = (low + high) / 2
        if a[mid] == t:
            return mid
        elif a[mid] < t:
            low = mid
        else:
            high = mid - 1
    return -1`, tests: [{ after: "d = [1, 4, 6, 8, 10]\nprint(bsearch(d, 8), bsearch(d, 5), bsearch(d, 1))", expected: "3 -1 0" }],
      hint: "Compare it line by line with the binary search in the lesson. There are four differences.",
      solutions: [{ name: "Fixed", code: c`def bsearch(a, t):
    low, high = 0, len(a) - 1
    while low <= high:
        mid = (low + high) // 2
        if a[mid] == t:
            return mid
        elif a[mid] < t:
            low = mid + 1
        else:
            high = mid - 1
    return -1`, note: "Four bugs: <code>high</code> start, <code>&lt;=</code>, integer division <code>//</code>, and <code>low = mid + 1</code>." }] },
    { id: "selsort", lvl: "star", title: "Selection sort, biggest first", prompt: "<p>Write <code>sort_desc(a)</code> that returns a new list sorted from <b>biggest to smallest</b> using selection sort (no <code>sort()</code>/<code>sorted()</code>). Each round, select the <b>largest</b> of the rest.</p>", starter: "def sort_desc(a):\n    pass\n", tests: [{ after: "print(sort_desc([29, 10, 14, 37, 13]))\nprint(sort_desc([1]))\nprint(sort_desc([]))", expected: "[37, 29, 14, 13, 10]\n[1]\n[]" }],
      hint: "Take today's <code>selection_sort</code> and change one comparison: look for a bigger item instead of a smaller one.",
      solutions: [{ name: "Selection sort", code: c`def sort_desc(a):
    a = a.copy()
    for i in range(len(a)):
        biggest = i
        for j in range(i + 1, len(a)):
            if a[j] > a[biggest]:
                biggest = j
        a[i], a[biggest] = a[biggest], a[i]
    return a`, note: "Only <code>&lt;</code> became <code>&gt;</code>. The algorithm is the same: still O(n²)." }] },
  ],
  quiz: [
    { q: "Binary search requires the data to be…", o: ["small", "sorted", "unique", "numbers"], a: 1, e: "Otherwise halving makes no sense." },
    { q: "Max steps of binary search on 1,000 items?", o: ["1000", "500", "about 10", "1"], a: 2, e: "2¹⁰ = 1024." },
    { q: "Two nested loops over n items are…", o: ["O(n)", "O(log n)", "O(n²)", "O(1)"], a: 2, e: "n × n." },
    { q: "`x in my_set` is typically…", o: ["O(1)", "O(n)", "O(n²)", "O(log n)"], a: 0, e: "Hashing." },
    { q: "In real projects to sort a list you should…", o: ["write bubble sort", "use `sorted()` / `.sort()`", "use binary search", "use a set"], a: 1, e: "Fast and tested." },
    { q: "Linear search on a list of n items is…", o: ["O(1)", "O(log n)", "O(n)", "O(n²)"], a: 2, e: "In the worst case it checks every item once." },
  ],
  puzzle: { title: "Doubling data", q: "<p>An O(n²) algorithm takes 2 seconds on 10,000 items. Roughly how many seconds on 20,000 items?</p>", answers: ["8"], hint: "Double n → n² becomes 4 times bigger.", ar: "مضاعفة البيانات في O(n²) تضاعف الوقت أربع مرات.", e: "(2n)² = 4n², so about <b>8</b> seconds. An O(n log n) algorithm would take a bit over 4 — that gap explodes as data grows, which is why algorithm choice matters for AI on big datasets." },
  cards: [
    { f: "Linear vs binary search", b: "Linear: O(n), any list. Binary: O(log n), sorted list only." },
    { f: "Big-O of selection sort", b: "O(n²)" },
    { f: "Big-O of `sorted()`", b: "O(n log n) (Timsort)" },
    { f: "Divide and conquer", b: "Split the problem in parts, solve them (often recursively), combine — e.g. merge sort." },
    { f: "What does Big-O describe?", b: "How the work grows when the data size n grows (not the exact seconds)." },
  ],
  remember: [
    "An **algorithm** is a list of steps; two correct algorithms can need very different amounts of work.",
    "**Linear search** checks items one by one: works on any list, O(n).",
    "**Binary search** halves the search area each round: O(log n), but the list **must be sorted**.",
    "In binary search, always move `low = mid + 1` or `high = mid - 1`, or the loop may never end.",
    "**Selection sort** picks the smallest of the rest each round: two nested loops, O(n²).",
    "In real code use `sorted()` / `.sort()` (O(n log n)), and a `set` or `dict` for many lookups (O(1)).",
  ],
  rememberAr: "البحث الخطي O(n) يعمل على أي قائمة، والثنائي O(log n) يحتاج قائمة مرتبة. الترتيب بالاختيار O(n²) للتعلم فقط، وفي العمل الحقيقي نستخدم sorted().",
};
})();

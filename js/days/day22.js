window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[22] = {
  title: "Problem solving: searching and sorting",
  intro: "Welcome to the final week of lessons, {{name}}! Before AI, one essential skill: thinking about <b>algorithms</b> — not just \"does it work?\" but \"how fast is it when the data gets huge?\". Searching and sorting are the classic place to learn this, and every AI library is built on these ideas.",
  introAr: "الخوارزمية = خطوات واضحة لحل مشكلة. اليوم نقارن طرق البحث (الخطي والثنائي) وطرق الترتيب، ونتعلم كيف نفكر في سرعة الخوارزمية عندما تكبر البيانات (Big-O).",
  goals: ["Write linear search and binary search", "Explain why binary search needs sorted data", "Implement selection sort and bubble sort", "Count steps to compare algorithms (Big-O intuition)", "Know when to just use `sorted()`"],
  learn: [
    { t: "h", text: "Linear search: check one by one" },
    { t: "code", code: c`def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
    return -1

ids = [504, 118, 902, 337, 250]
print(linear_search(ids, 337))
print(linear_search(ids, 999))` },
    { t: "p", html: "<p>Simple and works on any list. But in the worst case it checks <b>every</b> item: a million items → a million checks. We say it is <b>O(n)</b>: the work grows in proportion to n, the size of the data.</p>" },
    { t: "h", text: "Binary search: halve the problem" },
    { t: "analogy", title: "The guessing game strategy", html: "<p>Remember guessing a number from 1 to 100? The smart strategy is to guess 50, then 25 or 75, and so on — each guess throws away half of the possibilities. That's binary search. It needs the data to be <b>sorted</b>.</p>" },
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
print(binary_search(data, 57))`, before: "<p>Visualize and watch <code>low</code>, <code>mid</code> and <code>high</code> close in on the target.</p>" },
    { t: "table", head: ["Items (n)", "Linear search (worst)", "Binary search (worst)"], rows: [["10", "10", "4"], ["1,000", "1,000", "10"], ["1,000,000", "1,000,000", "20"], ["1,000,000,000", "1,000,000,000", "30"]] },
    { t: "ar", html: "البحث الثنائي يقسم البيانات نصفين في كل خطوة، لذلك مليون عنصر يحتاج 20 خطوة فقط! لكن بشرط أن تكون البيانات مرتبة. هذا ما يسمى O(log n)." },
    { t: "h", text: "Sorting by hand: selection sort" },
    { t: "viz", code: c`def selection_sort(items):
    a = items.copy()
    for i in range(len(a)):
        smallest = i
        for j in range(i + 1, len(a)):
            if a[j] < a[smallest]:
                smallest = j
        a[i], a[smallest] = a[smallest], a[i]
    return a

print(selection_sort([29, 10, 14, 37, 13]))`, before: "<p>Find the smallest, put it first. Find the next smallest, put it second… Two nested loops over n items → about n² steps: <b>O(n²)</b>.</p>" },
    { t: "h", text: "Measuring it" },
    { t: "code", code: c`import random, time
random.seed(0)
data = [random.randint(1, 10**6) for _ in range(3000)]

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
t = time.time(); sorted(data); print("sorted():      ", round(time.time() - t, 4), "s")`, noViz: true, note: "<p>Python's built-in <code>sorted()</code> uses <b>Timsort</b>, an O(n log n) algorithm written in C. In real work always use it. We write sorts by hand to <b>understand</b> algorithms — and because interviews love them.</p>" },
    { t: "table", head: ["Big-O", "Name", "Example"], rows: [["O(1)", "constant", "`d[key]`, `lst[5]`"], ["O(log n)", "logarithmic", "binary search"], ["O(n)", "linear", "linear search, `sum(lst)`"], ["O(n log n)", "linearithmic", "`sorted()`"], ["O(n²)", "quadratic", "selection/bubble sort, nested loops"]] },
  ],
  mistakes: [
    { title: "Binary search on unsorted data", html: "It silently returns wrong answers.", wrong: c`binary_search([9, 2, 7, 4], 2)   # -1 (wrong!)`, right: c`binary_search(sorted([9, 2, 7, 4]), 2)` },
    { title: "Infinite binary search", html: "Forgetting <code>+ 1</code> / <code>- 1</code> can make low and high stop moving.", wrong: c`low = mid`, right: c`low = mid + 1`, ar: "لازم يتحرك low أو high في كل دورة وإلا لن تتوقف الحلقة." },
  ],
  tricks: [
    { title: "bisect: binary search built in", html: "", code: c`import bisect
data = [3, 8, 15, 21, 34]
print(bisect.bisect_left(data, 21))   # 3
bisect.insort(data, 10)               # insert keeping order
print(data)` },
    { title: "Sets and dicts beat searching", html: "If you search many times, put the data in a <code>set</code> or <code>dict</code> once: each lookup becomes O(1)." },
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
    { t: "parsons", title: "Bubble sort", prompt: "Arrange bubble sort: repeatedly swap neighbors that are in the wrong order.", lines: ["def bubble_sort(a):", "    n = len(a)", "    for i in range(n):", "        for j in range(n - 1 - i):", "            if a[j] > a[j + 1]:", "                a[j], a[j + 1] = a[j + 1], a[j]", "    return a"], explain: "After each outer round the largest remaining item has bubbled to the end, so the inner loop can stop earlier (<code>n - 1 - i</code>)." },
    { t: "try", title: "Count the steps", html: "<p>Add a counter to <code>binary_search</code> and print how many loop rounds it takes to find different targets in <code>list(range(1000))</code>.</p>", code: c`def binary_search(items, target):
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
  ],
  exercises: [
    { id: "count", lvl: "seed", title: "Count occurrences", prompt: "<p>Write <code>count_of(items, target)</code> with a loop (no <code>.count()</code>).</p>", starter: "def count_of(items, target):\n    pass\n", tests: [{ after: "print(count_of([1, 3, 1, 1, 2], 1), count_of([], 5))", expected: "3 0" }],
      solutions: [{ name: "Loop", code: c`def count_of(items, target):
    n = 0
    for x in items:
        if x == target:
            n += 1
    return n` }] },
    { id: "bs", lvl: "star", title: "Binary search with steps", prompt: "<p>Write <code>binary_search(items, target)</code> returning a tuple <code>(index, steps)</code> where steps = loop rounds; index = -1 if missing.</p>", starter: "def binary_search(items, target):\n    pass\n", tests: [{ after: "d = list(range(0, 100, 2))\nprint(binary_search(d, 50))\nprint(binary_search(d, 51))\nprint(binary_search([7], 7))", expected: "(25, 5)\n(-1, 6)\n(0, 1)" }],
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
  ],
  quiz: [
    { q: "Binary search requires the data to be…", o: ["small", "sorted", "unique", "numbers"], a: 1, e: "Otherwise halving makes no sense." },
    { q: "Max steps of binary search on 1,000 items?", o: ["1000", "500", "about 10", "1"], a: 2, e: "2¹⁰ = 1024." },
    { q: "Two nested loops over n items are…", o: ["O(n)", "O(log n)", "O(n²)", "O(1)"], a: 2, e: "n × n." },
    { q: "`x in my_set` is typically…", o: ["O(1)", "O(n)", "O(n²)", "O(log n)"], a: 0, e: "Hashing." },
    { q: "In real projects to sort a list you should…", o: ["write bubble sort", "use `sorted()` / `.sort()`", "use binary search", "use a set"], a: 1, e: "Fast and tested." },
  ],
  puzzle: { title: "Doubling data", q: "<p>An O(n²) algorithm takes 2 seconds on 10,000 items. Roughly how many seconds on 20,000 items?</p>", answers: ["8"], hint: "Double n → n² becomes 4 times bigger.", ar: "مضاعفة البيانات في O(n²) تضاعف الوقت أربع مرات.", e: "(2n)² = 4n², so about <b>8</b> seconds. An O(n log n) algorithm would take a bit over 4 — that gap explodes as data grows, which is why algorithm choice matters for AI on big datasets." },
  cards: [
    { f: "Linear vs binary search", b: "Linear: O(n), any list. Binary: O(log n), sorted list only." },
    { f: "Big-O of selection sort", b: "O(n²)" },
    { f: "Big-O of `sorted()`", b: "O(n log n) (Timsort)" },
    { f: "Divide and conquer", b: "Split the problem in parts, solve them (often recursively), combine — e.g. merge sort." },
  ],
};
})();

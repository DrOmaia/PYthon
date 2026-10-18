window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[22] = {
  title: "Problem solving: searching and sorting",
  intro: "Welcome to the final week of lessons, {{name}}! Before AI, one essential skill: thinking about <b>algorithms</b> — not just \"does it work?\" but \"how fast is it when the data gets huge?\". Searching and sorting are the classic place to learn this, and every AI library is built on these ideas.",
  introAr: "الخوارزمية = خطوات واضحة لحل مشكلة. اليوم نقارن طرق البحث (الخطي والثنائي) وطرق الترتيب، ونتعلم كيف نفكر في سرعة الخوارزمية عندما تكبر البيانات (Big-O).",
  goals: ["Write linear search and binary search", "Explain why binary search needs sorted data", "Implement selection sort and bubble sort", "Count steps to compare algorithms (Big-O intuition)", "Know when to just use `sorted()`"],
  learn: [
    { t: "h", text: "Why think about algorithms?" },
    { t: "p", html: "<p>An <b>algorithm</b> is a clear list of steps that solves a problem. You have written many already: \"find the biggest number\", \"count the vowels\". Until now we only asked <i>does it work?</i> Today we ask a second question: <b>how much work does it do when the data gets huge?</b></p><p>With 10 items every method feels instant. With 10 million students, products or images (normal sizes in AI), a slow method can take hours while a smart one takes a fraction of a second. Searching and sorting are the classic place to learn this way of thinking.</p>" },
    { t: "analogy", title: "Finding a name in a phone book", html: "<p>You can look for \"Omar\" by reading every name from the first page — slow but it always works. Or, because the book is in <b>alphabetical order</b>, you can open it in the middle, see that you are at \"M\", and throw away the whole first half. Same result, far less work. That difference is what this lesson is about.</p>" },
    { t: "ar", html: "الخوارزمية هي خطوات واضحة لحل مشكلة. اليوم لا نسأل فقط \"هل يعمل الكود؟\" بل أيضًا \"كم خطوة يحتاج عندما تكبر البيانات؟\"." },

    { t: "h", text: "Linear search: check one by one" },
    { t: "p", html: "<p>The simplest way to find something in a list: start at the first item and check each one until you find the target. If you reach the end without finding it, it is not there. We return the <b>index</b> where we found it, or <code>-1</code> as a signal for \"not found\" (the loop only ever finds positions 0, 1, 2…, so -1 can never be confused with a real find).</p>" },
    { t: "viz", code: c`def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
    return -1
ids = [504, 118, 902, 337, 250]
print(linear_search(ids, 337))
print(linear_search(ids, 999))`, before: "<p>Visualize it and press Next ▶ slowly. Watch <code>i</code> move along the list, and count how many comparisons each search needs.</p>", note: "<p>Step by step for <code>linear_search(ids, 337)</code>:</p><ul><li><code>i = 0</code>: is <code>504 == 337</code>? No, move on.</li><li><code>i = 1</code>: <code>118</code>? No. <code>i = 2</code>: <code>902</code>? No.</li><li><code>i = 3</code>: <code>337 == 337</code>? Yes → <code>return 3</code>. The function stops immediately; item 4 is never checked.</li></ul><p>For <code>999</code>, every one of the 5 items is checked, the loop ends, and the line after it runs: <code>return -1</code>. Output: <code>3</code> then <code>-1</code>.</p><p>Linear search works on <b>any</b> list, sorted or not. Its weakness: when the target is last or missing, it checks <b>every</b> item.</p>" },
    { t: "ar", html: "البحث الخطي يفحص العناصر واحدًا تلو الآخر حتى يجد الهدف ويرجع موقعه، أو يرجع -1 إذا لم يجده. يعمل على أي قائمة، لكنه في أسوأ حالة يفحص كل العناصر." },

    { t: "h", text: "Counting steps: Big-O" },
    { t: "p", html: "<p>Computers differ in speed, so instead of seconds we count <b>steps</b> (here: comparisons). Let's add a counter to linear search and search for the very last item in a list of 1,000 numbers — the worst case.</p>" },
    { t: "code", code: c`items = list(range(1000))
target = 999
steps = 0
for x in items:
    steps += 1
    if x == target:
        break
print("found after", steps, "steps")`, before: "<p>Run it, then change <code>1000</code> to <code>2000</code> (and the target to <code>1999</code>) and run again.</p>", note: "<p>Line by line:</p><ul><li><code>list(range(1000))</code> makes the list <code>[0, 1, ..., 999]</code>.</li><li>Each loop round adds 1 to <code>steps</code> and compares one item.</li><li><code>break</code> leaves the loop once the target is found.</li><li>The target is last, so the output is <code>found after 1000 steps</code>. With 2000 items it becomes 2000.</li></ul><p>Double the data → double the work. When the work grows in proportion to the size <b>n</b> of the data, we say the algorithm is <b>O(n)</b> (read \"order n\" or \"linear\"). This notation is called <b>Big-O</b>: it describes how the work grows, not the exact number of steps.</p>" },
    { t: "ar", html: "بدل قياس الثواني نعدّ الخطوات. إذا تضاعفت الخطوات عندما تتضاعف البيانات فالخوارزمية O(n) أي خطية. Big-O يصف كيف ينمو العمل مع حجم البيانات." },

    { t: "h", text: "Binary search: halve the problem" },
    { t: "analogy", title: "The guessing game strategy", html: "<p>Remember guessing a number from 1 to 100? The smart strategy is to guess 50. \"Too small\" → now you know it is 51–100, and half the numbers are gone with one guess. Then guess 75, and so on. That is binary search. It only works because numbers are <b>in order</b>: \"too small\" tells you which half to throw away.</p>" },
    { t: "p", html: "<p>Binary search keeps two positions: <code>low</code> and <code>high</code>, the edges of the part of the list where the target can still be. Each step it looks at the middle item <code>mid = (low + high) // 2</code> (with <code>//</code> so the index is a whole number):</p><ul><li>middle item <b>equals</b> the target → found;</li><li>middle item is <b>smaller</b> → the target must be to the right: <code>low = mid + 1</code>;</li><li>middle item is <b>bigger</b> → the target must be to the left: <code>high = mid - 1</code>.</li></ul><p>The list <b>must be sorted</b>, otherwise \"smaller → go right\" is a lie.</p>" },
    { t: "viz", code: c`data = [3, 8, 15, 21, 34, 42, 57, 63, 78, 91]
low, high = 0, len(data) - 1
mid = (low + high) // 2
while data[mid] != 57:
    if data[mid] < 57:
        low = mid + 1
    else:
        high = mid - 1
    mid = (low + high) // 2
print("Found 57 at index", mid)`, before: "<p>Visualize it and watch <code>low</code>, <code>mid</code> and <code>high</code> close in on 57. Count how many items are actually looked at.</p>", note: "<p>Step by step (10 sorted items, indexes 0–9):</p><ul><li>Start: <code>low = 0</code>, <code>high = 9</code>, <code>mid = 9 // 2 = 4</code>. <code>data[4]</code> is <code>34</code>.</li><li><code>34 &lt; 57</code> → 57 must be to the right. <code>low = 5</code>. Indexes 0–4 are thrown away. New <code>mid = (5 + 9) // 2 = 7</code>, <code>data[7]</code> is <code>63</code>.</li><li><code>63 &gt; 57</code> → go left. <code>high = 6</code>. New <code>mid = (5 + 6) // 2 = 5</code>, <code>data[5]</code> is <code>42</code>.</li><li><code>42 &lt; 57</code> → <code>low = 6</code>, <code>mid = (6 + 6) // 2 = 6</code>, <code>data[6]</code> is <code>57</code>. The loop condition is now False → found.</li></ul><p>Only 4 items were looked at (34, 63, 42, 57) instead of 7 with linear search. This short version assumes 57 <b>is</b> in the list; the full function in \"Putting it together\" also handles a missing target.</p>" },
    { t: "predict", code: c`data = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
low, high = 0, 9
mid = (low + high) // 2
while data[mid] != 70:
    print("checked", data[mid])
    if data[mid] < 70:
        low = mid + 1
    else:
        high = mid - 1
    mid = (low + high) // 2
print("found", data[mid])`, explain: "First <code>mid = 4</code> → <code>40</code>, smaller than 70, so <code>low = 5</code>. Next <code>mid = (5 + 9) // 2 = 7</code> → <code>70</code>: the loop stops. Output: <code>checked 40</code> then <code>found 70</code>. Two looks for a list of 10." },
    { t: "ar", html: "البحث الثنائي ينظر إلى العنصر الأوسط: إن كان أصغر من الهدف نذهب يمينًا (low = mid + 1)، وإن كان أكبر نذهب يسارًا (high = mid - 1). شرطه الأساسي أن تكون القائمة مرتبة، وإلا أعطى نتائج خاطئة." },

    { t: "h", text: "Why halving is so powerful: O(log n)" },
    { t: "p", html: "<p>Each binary search step throws away half of what is left. So the question \"how many steps?\" becomes \"how many times can I halve n before only one item is left?\" Let's count it for one million.</p>" },
    { t: "code", code: c`n = 1_000_000
steps = 0
while n > 1:
    n = n // 2
    steps += 1
print(steps)`, before: "<p>The underscores in <code>1_000_000</code> are just for reading, like commas: Python ignores them. Run it, then try <code>1_000_000_000</code>.</p>", note: "<p>Line by line:</p><ul><li>Each loop round halves <code>n</code> (whole-number division) and counts one step.</li><li>1,000,000 → 500,000 → 250,000 → … → 1 takes <code>19</code> halvings.</li><li>Binary search may need one more look at the very last remaining item, so its worst case is about <b>20</b> steps.</li><li>For a billion, it prints 29: about 30 steps.</li></ul><p>A thousand times more data adds only about 10 steps! This growth is called <b>O(log n)</b> (logarithmic). Compare the two searches in the table below.</p>" },
    { t: "table", head: ["Items (n)", "Linear search (worst)", "Binary search (worst)"], rows: [["10", "10", "4"], ["1,000", "1,000", "10"], ["1,000,000", "1,000,000", "20"], ["1,000,000,000", "1,000,000,000", "30"]] },
    { t: "ar", html: "البحث الثنائي يقسم البيانات نصفين في كل خطوة، لذلك مليون عنصر يحتاج حوالي 20 خطوة فقط، ومليار يحتاج حوالي 30. هذا ما يسمى O(log n)، لكن تذكر{{g:|ي}}: بشرط أن تكون البيانات مرتبة." },

    { t: "h", text: "Two building blocks for sorting" },
    { t: "p", html: "<p>Binary search needs sorted data, so how do we sort? Before writing a full sorting algorithm, let's practise its two small pieces: <b>swapping</b> two items, and <b>finding the smallest</b> item from some position onward.</p>" },
    { t: "code", code: c`a = [29, 10, 14]
a[0], a[1] = a[1], a[0]
print(a)`, before: "<p>One line swaps two items of a list. Run it and look at the first two numbers.</p>", note: "<p>Python first evaluates the right side: <code>a[1], a[0]</code> is the pair <code>(10, 29)</code>. Then it assigns the pair to the left side: <code>a[0]</code> gets <code>10</code> and <code>a[1]</code> gets <code>29</code>. Output: <code>[10, 29, 14]</code>.</p><p>Because the right side is computed completely <b>before</b> anything is stored, no value is lost — you don't need a temporary variable. Every sort below uses this line.</p>" },
    { t: "code", code: c`a = [29, 10, 14, 37, 13]
smallest = 0
for j in range(1, len(a)):
    if a[j] < a[smallest]:
        smallest = j
print("smallest is", a[smallest], "at index", smallest)`, before: "<p>This is the \"champion\" pattern from Day 5, but we remember the <b>index</b> of the champion instead of its value.</p>", note: "<p>Line by line:</p><ul><li>Assume index 0 (<code>29</code>) holds the smallest.</li><li><code>j = 1</code>: <code>10 &lt; 29</code> → new champion, <code>smallest = 1</code>.</li><li><code>j = 2</code>: <code>14 &lt; 10</code>? No. <code>j = 3</code>: <code>37</code>? No. <code>j = 4</code>: <code>13 &lt; 10</code>? No.</li><li>Output: <code>smallest is 10 at index 1</code>.</li></ul><p>We keep the index (not just the value) because to move the item we must know <b>where</b> it is.</p>" },
    { t: "ar", html: "سطر a[i], a[j] = a[j], a[i] يبدّل عنصرين دون متغير مؤقت. ولإيجاد أصغر عنصر نحفظ موقعه (index) وليس قيمته فقط، لأننا نحتاج أن نعرف أين هو لنحرّكه." },

    { t: "h", text: "Selection sort" },
    { t: "p", html: "<p>Selection sort repeats the two building blocks: find the smallest item and swap it into position 0. Then find the smallest of the <b>rest</b> and swap it into position 1. And so on, until the end. After round <code>i</code>, positions 0 to <code>i</code> are sorted and never touched again.</p>" },
    { t: "viz", code: c`a = [29, 10, 14, 37, 13]
for i in range(len(a)):
    smallest = i
    for j in range(i + 1, len(a)):
        if a[j] < a[smallest]:
            smallest = j
    a[i], a[smallest] = a[smallest], a[i]
    print("after round", i, a)`, before: "<p>Visualize it. The inner loop is the \"find the smallest\" block, but it starts at <code>i</code> instead of 0. Watch the sorted part grow on the left.</p>", note: "<p>Round by round:</p><ul><li>Round 0: the smallest of the whole list is <code>10</code> (index 1). Swap it with index 0 → <code>[10, 29, 14, 37, 13]</code>.</li><li>Round 1: search from index 1. The smallest is <code>13</code> (index 4). Swap with index 1 → <code>[10, 13, 14, 37, 29]</code>.</li><li>Round 2: search from index 2. <code>14</code> is already the smallest: it is swapped with itself (no change).</li><li>Round 3: <code>29</code> &lt; <code>37</code> → swap → <code>[10, 13, 14, 29, 37]</code>. Round 4 has only one item left.</li></ul><p>Notice <code>range(i + 1, len(a))</code>: each round looks only at the unsorted part, which gets one item shorter every time.</p>" },
    { t: "predict", code: c`n = 5
comparisons = 0
for i in range(n):
    for j in range(i + 1, n):
        comparisons += 1
print(comparisons)`, explain: "These are exactly selection sort's loops. Round 0 compares 4 times, round 1 three times, then 2, 1, 0: <code>4 + 3 + 2 + 1 = 10</code>. For n items it is about n × n / 2, so doubling n makes the work about <b>4 times</b> bigger. That is <b>O(n²)</b> (quadratic)." },
    { t: "ar", html: "الترتيب بالاختيار: في كل جولة نبحث عن أصغر عنصر في الجزء غير المرتب ونضعه في أول هذا الجزء. حلقتان متداخلتان تعطيان حوالي n² خطوة، أي O(n²)، فمضاعفة البيانات تضاعف العمل أربع مرات." },

    { t: "h", text: "Bubble sort" },
    { t: "p", html: "<p>Bubble sort is another classic. It walks along the list comparing <b>neighbors</b>: if the left one is bigger than the right one, it swaps them. After one full walk, the biggest item has \"bubbled up\" to the end, like a bubble rising in water. Then it repeats for the rest.</p>" },
    { t: "viz", code: c`a = [5, 1, 4, 2]
n = len(a)
for i in range(n):
    for j in range(n - 1 - i):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
    print("after round", i, a)`, before: "<p>Visualize it and watch <code>a[j]</code> and <code>a[j + 1]</code>: they are always two neighbors.</p>", note: "<p>Round by round:</p><ul><li>Round 0: <code>5 &gt; 1</code> swap → <code>[1, 5, 4, 2]</code>; <code>5 &gt; 4</code> swap → <code>[1, 4, 5, 2]</code>; <code>5 &gt; 2</code> swap → <code>[1, 4, 2, 5]</code>. The biggest, 5, is now at the end.</li><li>Round 1: <code>1 &gt; 4</code>? No. <code>4 &gt; 2</code> swap → <code>[1, 2, 4, 5]</code>. Now 4 is in place too.</li><li>Rounds 2 and 3 find nothing to swap.</li></ul><p>Why <code>range(n - 1 - i)</code>? <code>j + 1</code> must stay inside the list (so at most <code>n - 1</code>), and after round <code>i</code> the last <code>i</code> items are already in place, so there is no need to compare them again. Bubble sort also has two nested loops: <b>O(n²)</b>.</p>" },
    { t: "ar", html: "الترتيب الفقاعي يقارن كل عنصرين متجاورين ويبدّلهما إذا كان الأيسر أكبر، فيصعد أكبر عنصر إلى النهاية في كل جولة. وهو أيضًا O(n²). انتبه{{g:|ي}} لحدود الحلقة الداخلية n - 1 - i حتى لا يخرج j + 1 عن القائمة." },

    { t: "h", text: "Measuring it: our sort vs sorted()" },
    { t: "p", html: "<p>Let's time selection sort on 3,000 random numbers. We need one new module: <code>time</code>. The function <code>time.time()</code> returns the current time in seconds (a big float). If you read it before and after a piece of code, the difference is how long that code took.</p>" },
    { t: "code", code: c`import random, time
a = [random.randint(1, 10**6) for _ in range(3000)]
start = time.time()
for i in range(len(a)):
    smallest = i
    for j in range(i + 1, len(a)):
        if a[j] < a[smallest]:
            smallest = j
    a[i], a[smallest] = a[smallest], a[i]
print("selection sort:", round(time.time() - start, 2), "s")`, noViz: true, before: "<p>Run it and be patient: it may take a few seconds. That waiting <b>is</b> the lesson.</p>", note: "<p>Line by line:</p><ul><li>Line 2 is a list comprehension (Day 10) that makes 3,000 random whole numbers between 1 and 1,000,000 (<code>10**6</code>). The name <code>_</code> is a convention for \"a loop variable I don't need\".</li><li><code>start = time.time()</code> remembers the moment we start.</li><li>Lines 4–9 are exactly the selection sort you visualized.</li><li>The last line subtracts the start time from the current time and rounds it.</li></ul><p>3,000 items means about 4.5 million comparisons (3000 × 3000 / 2). The exact time depends on your computer and browser.</p>" },
    { t: "code", code: c`import random, time
a = [random.randint(1, 10**6) for _ in range(3000)]
start = time.time()
b = sorted(a)
print("sorted():", round(time.time() - start, 4), "s")
print(b[:5])`, noViz: true, before: "<p>Now the same job with Python's built-in <code>sorted()</code>. Compare the time with the previous example.</p>", note: "<p>Line by line:</p><ul><li>Same random data and same timing trick as before.</li><li><code>sorted(a)</code> returns a <b>new</b> sorted list and leaves <code>a</code> unchanged.</li><li><code>b[:5]</code> shows the first five (smallest) numbers to prove it worked.</li></ul><p>It finishes in a tiny fraction of a second. <code>sorted()</code> uses <b>Timsort</b>, an O(n log n) algorithm written in C. In real work always use <code>sorted()</code> or <code>.sort()</code>. We write sorts by hand to <b>understand</b> algorithms — and because job interviews love them.</p>" },
    { t: "table", head: ["Big-O", "Name", "Example"], rows: [["O(1)", "constant", "`d[key]`, `lst[5]`, `x in my_set`"], ["O(log n)", "logarithmic", "binary search"], ["O(n)", "linear", "linear search, `sum(lst)`, `x in my_list`"], ["O(n log n)", "linearithmic", "`sorted()`"], ["O(n²)", "quadratic", "selection/bubble sort, nested loops"]] },
    { t: "p", html: "<p>Read the table from top (fastest growth-free) to bottom (slowest). One practical rule: if you search the same data <b>many</b> times, put it into a <code>set</code> or <code>dict</code> once (Days 11–12). Looking up a key there is O(1): it doesn't get slower as the data grows.</p>" },
    { t: "ar", html: "في المشاريع الحقيقية استخدم{{g:|ي}} sorted() أو .sort() لأنها O(n log n) وسريعة جدًا. نكتب خوارزميات الترتيب بأيدينا لنفهم طريقة التفكير فقط. وإذا كنت{{g:|ِ}} ستبحث كثيرًا فضع{{g:|ي}} البيانات في set أو dict." },

    { t: "h", text: "Putting it together: a fast name lookup" },
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
names = ["Omar", "Lina", "Sara", "Hamed", "Nora", "Ali"]
names = sorted(names)
print(names)
for who in ["Sara", "Zaid"]:
    print(who, "->", binary_search(names, who))`, together: true, before: "<p>This is the complete binary search as a function, used on a class list. Read it and predict both results, then run it. Try searching for <code>\"Ali\"</code> and <code>\"Hamed\"</code> too.</p>", note: "<p>How it works:</p><ul><li><b>Sort first:</b> the names are not in order, so <code>sorted()</code> puts them in alphabetical order. Strings compare letter by letter, so <code>&lt;</code> means \"comes earlier in the alphabet\".</li><li><b>Search the sorted list:</b> for <code>\"Sara\"</code>, <code>mid = 2</code> (<code>\"Lina\"</code>) is earlier → go right; <code>mid = 4</code> (<code>\"Omar\"</code>) → go right; <code>mid = 5</code> is <code>\"Sara\"</code> → <code>return 5</code>.</li><li><b>Missing names:</b> the loop runs <code>while low &lt;= high</code>, meaning \"while there is still a part of the list to search\". For <code>\"Zaid\"</code>, <code>low</code> keeps moving right until it passes <code>high</code>; the loop ends and <code>return -1</code> runs.</li><li><b>Why +1 and -1:</b> <code>mid</code> was already checked, so the next range must exclude it. With <code>low = mid</code> the range could stop shrinking and the loop would never end.</li></ul><p>Output: the sorted list, <code>Sara -&gt; 5</code> and <code>Zaid -&gt; -1</code>. Sort once with <code>sorted()</code>, then every search costs only O(log n).</p>" },
    { t: "ar", html: "نرتّب البيانات مرة واحدة بـ sorted() ثم نبحث بالبحث الثنائي بسرعة. الحلقة تستمر ما دام low &lt;= high، وإذا تجاوز low قيمة high فالعنصر غير موجود ونرجع -1. ولا تنس{{g:|ي}} mid + 1 و mid - 1 حتى تصغر المسافة في كل دورة." },
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

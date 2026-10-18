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
    { t: "p", html: "<p>Imagine a class of 40 students. Until now, to store their marks you would need 40 variables: <code>mark1</code>, <code>mark2</code>, … <code>mark40</code>. Adding them up would be a 40-part sum, and if a new student joins you would have to change the program. A <b>list</b> solves this: it keeps <b>many values, in order, under one name</b>. With a <code>for</code> loop (Day 9) you can then process all of them in two lines, whether there are 4 values or 4 million.</p>" },
    { t: "analogy", title: "A list is a row of numbered lockers", html: "<p>Picture a row of lockers in a university hallway. The whole row has one name (<code>marks</code>), and every locker has a number painted on it, starting from <b>0</b>. You can open locker 2 to see what is inside, replace its contents, add a new locker at the end of the row, or remove one. That is exactly what you can do with a list.</p>" },
    { t: "ar", html: "القائمة (list) تخزن قيمًا كثيرة بترتيب تحت اسم واحد، بدلًا من إنشاء متغير لكل قيمة. وكل عنصر له رقم (فهرس) يبدأ من صفر." },

    { t: "h", text: "Creating a list and reading one item" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
print(marks)
print(marks[0])
print(marks[-1])
print(len(marks))`, before: "<p>A list is written with <b>square brackets</b> <code>[ ]</code> and the items are separated by commas. Run it and match each output line to its <code>print</code>.</p>", note: "<p>Line by line:</p><ul><li><code>marks = [85, 92, 78, 95, 60]</code> creates one list holding five numbers and gives it the name <code>marks</code>.</li><li><code>print(marks)</code> shows the whole list, brackets and all: <code>[85, 92, 78, 95, 60]</code>.</li><li><code>marks[0]</code> reads the item at <b>index 0</b>, the first one: <code>85</code>. Just like strings on Day 4, counting starts at 0.</li><li><code>marks[-1]</code> counts from the end: <code>-1</code> is the last item, <code>60</code>.</li><li><code>len(marks)</code> gives the number of items: <code>5</code>.</li></ul><p>So the valid indexes are 0 to 4, which is <code>0</code> to <code>len(marks) - 1</code>.</p>" },
    { t: "code", code: c`names = ["{{name}}", "Omar", "Lina"]
mixed = [19, "CS", 4.5, True]
empty = []
print(names[1], len(names))
print(mixed)
print(len(empty))`, before: "<p>A list can hold any kind of value: text, numbers, even a mix. It can also be empty. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>names</code> is a list of three strings. <code>names[1]</code> is the <b>second</b> name, <code>Omar</code>, and <code>len(names)</code> is <code>3</code>.</li><li><code>mixed</code> holds an int, a string, a float and a boolean. Python allows it, although in practice most lists hold one kind of value (all marks, all names).</li><li><code>empty = []</code> is a list with nothing in it yet, so its length is <code>0</code>. Empty lists are very useful: you will soon fill them inside a loop.</li></ul>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
print(marks[4])
print(marks[5])`, expectError: true, before: "<p>What happens if you ask for a locker that does not exist? This example crashes on purpose. Run it and read the error.</p>", note: "<p>Line 2 works: index 4 is the last item, <code>60</code>. Line 3 crashes with <code>IndexError: list index out of range</code>. The list has 5 items, so the indexes go from 0 to 4 — there is no index 5. This is the most common list mistake: the last index is <code>len(marks) - 1</code>, <b>not</b> <code>len(marks)</code>. If you just want the last item, use <code>marks[-1]</code> and you never have to count.</p>" },
    { t: "predict", code: c`days = ["Sun", "Mon", "Tue", "Wed", "Thu"]
print(days[1], days[-2], len(days))`, explain: "Index 1 is the <b>second</b> item, <code>Mon</code>. Index -2 is the second from the end, <code>Wed</code>. There are 5 items. Output: <code>Mon Wed 5</code>." },
    { t: "ar", html: "تُكتب القائمة بين أقواس مربعة [ ]، والعنصر الأول فهرسه 0 والأخير فهرسه -1. وانتبه{{g:|ي}}: آخر فهرس هو len - 1، والفهرس len يسبب الخطأ IndexError." },

    { t: "h", text: "Slices and the in operator" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
print(marks[1:3])
print(marks[:2])
print(marks[-2:])
print(marks[::-1])`, before: "<p>Everything you learned about slicing strings on Day 4 works on lists too. A slice gives you a <b>new, smaller list</b>. Predict each line, then run it.</p>", note: "<p>Line by line:</p><ul><li><code>marks[1:3]</code> starts at index 1 and stops <b>before</b> index 3: items 1 and 2 → <code>[92, 78]</code>.</li><li><code>marks[:2]</code> has no start, so it starts at the beginning: the first two items → <code>[85, 92]</code>.</li><li><code>marks[-2:]</code> starts two from the end and goes to the end → <code>[95, 60]</code>.</li><li><code>marks[::-1]</code> uses a step of -1, which walks backwards → <code>[60, 95, 78, 92, 85]</code>.</li></ul><p>A slice never changes <code>marks</code>; it makes a new list. And unlike a single index, a slice never crashes when it goes past the end — it just stops.</p>" },
    { t: "code", code: c`names = ["{{name}}", "Omar", "Lina"]
print("Omar" in names)
print("omar" in names)
print("Zaid" not in names)`, before: "<p><code>in</code> asks \"is this value somewhere in the list?\" and answers <code>True</code> or <code>False</code>. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>\"Omar\" in names</code> → <code>True</code>: Python walks through the list and finds an item equal to <code>\"Omar\"</code>.</li><li><code>\"omar\" in names</code> → <code>False</code>: the comparison is exact, and a small <code>o</code> is not a capital <code>O</code> (the same rule as Day 5).</li><li><code>not in</code> is the opposite question: is <code>\"Zaid\"</code> missing? → <code>True</code>.</li></ul><p>Because the answer is a boolean, <code>in</code> fits perfectly inside an <code>if</code>: <code>if name in names:</code>.</p>" },
    { t: "ar", html: "القص [start:stop] يعطي قائمة جديدة من start حتى قبل stop، و [::-1] تعكس الترتيب. و in تسأل: هل القيمة موجودة في القائمة؟ وانتبه{{g:|ي}} أن المقارنة تفرّق بين الحروف الكبيرة والصغيرة." },

    { t: "h", text: "Changing a list" },
    { t: "p", html: "<p>Here is the big difference between lists and strings. On Day 4 you saw that a string cannot be changed: <code>name[0] = \"X\"</code> is an error. Lists are <b>mutable</b>: you can replace, add and remove items <b>in place</b>, and the same list grows and shrinks. Most of these changes are done with <b>methods</b> — functions that belong to the list and are called with a dot, like <code>cart.append(...)</code>.</p>" },
    { t: "code", code: c`cart = ["milk", "bread", "eggs"]
cart[1] = "brown bread"
print(cart)`, before: "<p>To replace one item, assign to its index, just like assigning to a variable. Run it.</p>", note: "<p><code>cart[1] = \"brown bread\"</code> means \"put <code>\"brown bread\"</code> into locker 1\". The old value <code>\"bread\"</code> is thrown away and the other items do not move. Output: <code>['milk', 'brown bread', 'eggs']</code>. Notice Python prints strings inside a list with single quotes; that is just how it displays them.</p>" },
    { t: "code", code: c`cart = ["milk", "bread"]
cart.append("dates")
print(cart)
cart.insert(0, "coffee")
print(cart)`, before: "<p>Two ways to add an item. Watch <b>where</b> each new item lands.</p>", note: "<p>Line by line:</p><ul><li><code>cart.append(\"dates\")</code> adds one item at the <b>end</b>: <code>['milk', 'bread', 'dates']</code>. This is the method you will use most.</li><li><code>cart.insert(0, \"coffee\")</code> puts <code>\"coffee\"</code> at index 0, and every other item shifts one place to the right: <code>['coffee', 'milk', 'bread', 'dates']</code>.</li></ul><p>Careful: <code>append</code> always adds exactly <b>one</b> item. <code>cart.append([\"tea\", \"sugar\"])</code> would add one item that is itself a list, so the length grows by 1, not 2.</p>" },
    { t: "code", code: c`cart = ["coffee", "milk", "bread", "dates"]
cart.remove("milk")
print(cart)
last = cart.pop()
print(cart, last)
first = cart.pop(0)
print(cart, first)`, before: "<p>Two ways to remove an item: by <b>value</b> with <code>remove</code>, or by <b>position</b> with <code>pop</code>. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>cart.remove(\"milk\")</code> finds the first <code>\"milk\"</code> and deletes it → <code>['coffee', 'bread', 'dates']</code>. If the value is not in the list, <code>remove</code> crashes with a <code>ValueError</code>, so check with <code>in</code> first when you are not sure.</li><li><code>cart.pop()</code> with no index removes the <b>last</b> item and <b>gives it back</b>. We store it in <code>last</code>, so we print <code>['coffee', 'bread'] dates</code>.</li><li><code>cart.pop(0)</code> removes the item at index 0 and returns it → <code>['bread'] coffee</code>.</li></ul><p>The key difference: <code>remove</code> just deletes, while <code>pop</code> deletes <b>and</b> hands you the item, which is handy when you still need it.</p>" },
    { t: "viz", code: c`cart = ["milk", "bread"]
cart.append("dates")
cart.insert(0, "coffee")
cart[2] = "brown bread"
cart.remove("milk")
last = cart.pop()
print(cart, last)`, before: "<p>Now all the changes together. Visualize it and press Next ▶ after each line. Say out loud what the list will look like <b>before</b> you press.</p>", note: "<p>The list after each line:</p><ul><li><code>['milk', 'bread']</code></li><li>append → <code>['milk', 'bread', 'dates']</code></li><li>insert at 0 → <code>['coffee', 'milk', 'bread', 'dates']</code></li><li><code>cart[2] = ...</code> → index 2 was <code>'bread'</code>: <code>['coffee', 'milk', 'brown bread', 'dates']</code></li><li>remove milk → <code>['coffee', 'brown bread', 'dates']</code></li><li>pop → <code>last</code> becomes <code>'dates'</code> and the list is <code>['coffee', 'brown bread']</code></li></ul><p>Notice how indexes shift after insert and remove: the item at index 2 is not always the same item. That is why we visualize.</p>" },
    { t: "table", head: ["Method", "What it does"], rows: [["`lst.append(x)`", "add x at the end"], ["`lst.insert(i, x)`", "insert x at position i"], ["`lst[i] = x`", "replace the item at i"], ["`lst.remove(x)`", "delete the first x (error if missing)"], ["`lst.pop()` / `lst.pop(i)`", "remove and return the last / item i"], ["`lst.sort()`", "sort in place (returns None!)"], ["`sorted(lst)`", "return a new sorted list"], ["`lst.reverse()`", "flip the order in place"], ["`lst.count(x)`, `lst.index(x)`", "how many x / position of x"]] },
    { t: "predict", code: c`nums = [1, 2, 3]
nums.append(4)
nums.insert(1, 9)
x = nums.pop()
print(nums, x)`, explain: "After <code>append</code>: <code>[1, 2, 3, 4]</code>. <code>insert(1, 9)</code> puts 9 at index 1: <code>[1, 9, 2, 3, 4]</code>. <code>pop()</code> removes and returns the last item, 4. Output: <code>[1, 9, 2, 3] 4</code>." },
    { t: "ar", html: "القائمة قابلة للتعديل عكس النص. append تضيف في النهاية، و insert تضيف في موضع محدد، و remove تحذف بالقيمة، و pop تحذف بالموضع وترجع العنصر المحذوف. وانتبه{{g:|ي}} أن الفهارس تتغير بعد الإضافة والحذف." },

    { t: "h", text: "Careful: = does not copy a list" },
    { t: "code", code: c`a = [1, 2]
b = a
b.append(3)
print(a)
c = a.copy()
c.append(99)
print(a, c)`, before: "<p>This one surprises almost everyone. Predict what line 4 prints, then run it.</p>", note: "<p>Line by line:</p><ul><li><code>b = a</code> does <b>not</b> make a second list. It gives the <b>same</b> list a second name, like one locker row with two signs on it.</li><li>So <code>b.append(3)</code> changes that one list, and <code>print(a)</code> shows <code>[1, 2, 3]</code> — <code>a</code> changed too!</li><li><code>a.copy()</code> really makes a new, separate list. Appending to <code>c</code> leaves <code>a</code> alone: <code>[1, 2, 3] [1, 2, 3, 99]</code>.</li></ul><p>Rule: when you want an independent copy, use <code>.copy()</code> (or the slice <code>a[:]</code>, which also makes a new list).</p>" },
    { t: "ar", html: "b = a لا تنسخ القائمة، بل تعطيها اسمًا ثانيًا، فأي تعديل عبر b يظهر في a. للحصول على نسخة مستقلة استخدم{{g:|ي}} a.copy()." },

    { t: "h", text: "Lists + loops = superpower" },
    { t: "p", html: "<p>On Day 9 you wrote <code>for ch in \"hello\":</code> to visit each character of a string. A <code>for</code> loop visits each <b>item</b> of a list in exactly the same way, from first to last. This is where lists become powerful: one short loop handles the whole class.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
for m in marks:
    print("Mark:", m)`, before: "<p>Run it. Count how many times the indented line runs.</p>", note: "<p>The loop variable <code>m</code> takes each value of the list in turn: first <code>85</code>, then <code>92</code>, and so on until <code>60</code>. The indented line runs once per item — 5 times here. If you add a sixth mark to the list, the loop automatically runs 6 times; you never change the loop itself. You choose the name <code>m</code>; a clear name like <code>mark</code> or <code>m</code> beats <code>x</code>.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
total = 0
for m in marks:
    total += m
print("Total:", total)
print("Average:", total / len(marks))`, before: "<p>The <b>accumulator</b> pattern from Day 9, now on a list: start at 0 and add each item.</p>", note: "<p>Line by line:</p><ul><li><code>total = 0</code> prepares an empty \"bucket\" before the loop.</li><li>Each turn, <code>total += m</code> adds the current mark: 85, then 177, 255, 350, and finally 410.</li><li>After the loop (not indented!) we print the total, <code>410</code>.</li><li>The average is the total divided by how many marks there are: <code>410 / 5</code> = <code>82.0</code>. Using <code>len(marks)</code> instead of typing 5 means the program still works if the list changes.</li></ul>" },
    { t: "code", code: c`names = ["Sara", "Omar", "Lina"]
marks = [88, 91, 97]
for i in range(len(names)):
    print(i, names[i], marks[i])`, before: "<p>Sometimes you need the <b>position</b>, not just the value — for example when two lists belong together. Run it.</p>", note: "<p><code>len(names)</code> is 3, so <code>range(3)</code> gives the indexes <code>0, 1, 2</code> (Day 9). Each turn, <code>i</code> is a position, and we use it to read from <b>both</b> lists: <code>names[i]</code> and <code>marks[i]</code> always belong to the same student. Output: <code>0 Sara 88</code>, <code>1 Omar 91</code>, <code>2 Lina 97</code>. Use <code>for m in marks</code> when you only need the values, and <code>for i in range(len(...))</code> when you need the index.</p>" },
    { t: "ar", html: "حلقة for تمر على كل عنصر في القائمة بالترتيب. لحساب المجموع ابدأ{{g:|ي}} بمتغير قيمته 0 قبل الحلقة وأضف{{g:|ي}} إليه كل عنصر. وللحصول على رقم الموضع استخدم{{g:|ي}} range(len(lst))." },

    { t: "h", text: "Built-in helpers: sum, max, min, count, index" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
print(sum(marks))
print(max(marks))
print(min(marks))
print(sum(marks) / len(marks))`, before: "<p>Adding up a list is so common that Python has a ready-made function for it. Compare the result with the loop above.</p>", note: "<p>Line by line:</p><ul><li><code>sum(marks)</code> adds all the items → <code>410</code>, exactly what our loop computed.</li><li><code>max(marks)</code> gives the biggest item → <code>95</code>.</li><li><code>min(marks)</code> gives the smallest → <code>60</code>.</li><li><code>sum(marks) / len(marks)</code> is the average in one line → <code>82.0</code>.</li></ul><p>Why learn the loop at all, then? Because the loop is how these functions work inside, and very often you need something slightly different (sum only the passing marks, for example) that no built-in does for you.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60, 92]
print(marks.count(92))
print(marks.index(95))
print(marks.index(max(marks)))`, before: "<p>Two methods that <b>search</b> the list. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>marks.count(92)</code> counts how many times 92 appears → <code>2</code>.</li><li><code>marks.index(95)</code> tells you <b>where</b> 95 is: index <code>3</code>. If the value appears more than once, you get the first position; if it does not appear at all, it is a <code>ValueError</code>.</li><li><code>marks.index(max(marks))</code> combines both ideas: first <code>max</code> finds the best mark (95), then <code>index</code> finds its position (3). With a parallel <code>names</code> list, <code>names[3]</code> would be the top student.</li></ul>" },
    { t: "ar", html: "sum تجمع العناصر، و max و min تعطيان الأكبر والأصغر، و count تعدّ مرات ظهور قيمة، و index تعطي موضعها الأول. وانتبه{{g:|ي}}: index تسبب خطأ إذا لم تكن القيمة موجودة." },

    { t: "h", text: "Sorting: sort(), sorted() and reverse" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
ordered = sorted(marks)
print(ordered)
print(marks)`, before: "<p><code>sorted()</code> is a function that gives you a <b>new</b> sorted list. Look at both outputs.</p>", note: "<p><code>sorted(marks)</code> builds a new list in increasing order and we store it in <code>ordered</code>: <code>[60, 78, 85, 92, 95]</code>. The original <code>marks</code> is <b>untouched</b>: it still prints <code>[85, 92, 78, 95, 60]</code>. Use <code>sorted()</code> when you want to keep the original order too.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
marks.sort()
print(marks)
result = marks.sort()
print(result)`, before: "<p><code>.sort()</code> is a list method that sorts the list <b>itself</b>. Pay attention to the last line.</p>", note: "<p>Line by line:</p><ul><li><code>marks.sort()</code> rearranges <code>marks</code> in place, so line 3 prints <code>[60, 78, 85, 92, 95]</code>. The old order is gone.</li><li><code>sort()</code> does its work but returns nothing. In Python \"nothing\" is the special value <code>None</code>, so <code>result</code> is <code>None</code>.</li></ul><p>That is the classic trap: <code>marks = marks.sort()</code> replaces your list with <code>None</code>. Either call <code>marks.sort()</code> alone on its own line, or write <code>marks = sorted(marks)</code>.</p>" },
    { t: "code", code: c`marks = [85, 92, 78, 95, 60]
high_first = sorted(marks, reverse=True)
print(high_first)
print(high_first[:3])`, before: "<p>To sort from biggest to smallest, add the option <code>reverse=True</code>. Then a slice gives you the top 3.</p>", note: "<p>Line by line:</p><ul><li><code>reverse=True</code> is a <b>named option</b> (a keyword argument): you write the option's name, <code>=</code>, and its value. It tells <code>sorted</code> to go from high to low → <code>[95, 92, 85, 78, 60]</code>. It works with <code>.sort(reverse=True)</code> too.</li><li><code>high_first[:3]</code> is a slice of the first three items → <code>[95, 92, 85]</code>, the top 3 marks.</li></ul><p>You could write it in one line, <code>sorted(marks, reverse=True)[:3]</code>: Python first sorts, then slices the result.</p>" },
    { t: "code", code: c`x = [5, 3, 8]
x.reverse()
print(x)
print(x[::-1])`, before: "<p><code>reverse()</code> is <b>not</b> sorting. Predict the output first.</p>", note: "<p><code>x.reverse()</code> simply flips the current order in place, without comparing values: <code>[5, 3, 8]</code> becomes <code>[8, 3, 5]</code> (not <code>[8, 5, 3]</code>!). Like <code>sort()</code>, it changes the list and returns <code>None</code>. The slice <code>x[::-1]</code> makes a reversed <b>copy</b> without changing <code>x</code>, so it shows <code>[5, 3, 8]</code> — the reverse of the already-reversed list.</p>" },
    { t: "predict", code: c`nums = [4, 1, 3]
a = sorted(nums)
b = nums.sort()
print(a, b, nums)`, explain: "<code>sorted(nums)</code> returns a new list, so <code>a</code> is <code>[1, 3, 4]</code>. <code>nums.sort()</code> sorts <code>nums</code> itself and returns <code>None</code>, so <code>b</code> is <code>None</code>. Output: <code>[1, 3, 4] None [1, 3, 4]</code>." },
    { t: "ar", html: "sorted(lst) ترجع قائمة جديدة مرتبة وتترك الأصلية كما هي، أما lst.sort() فترتب القائمة نفسها وترجع None. لا تكتب{{g:|ي}} lst = lst.sort(). و reverse=True للترتيب من الأكبر للأصغر." },

    { t: "h", text: "Building a list step by step" },
    { t: "code", code: c`passed = []
for m in [85, 42, 78, 55, 91]:
    if m >= 60:
        passed.append(m)
print(passed)
print(len(passed), "students passed")`, before: "<p>A pattern you will use every week: start with an <b>empty list</b>, loop, and <code>append</code> only the items you want. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>passed = []</code> creates an empty list <b>before</b> the loop. If you put it inside the loop, it would be emptied again every turn.</li><li>The loop visits each mark. The <code>if</code> (Day 5) lets only marks of 60 or more through.</li><li><code>passed.append(m)</code> adds the passing mark at the end. 42 and 55 are skipped.</li><li>After the loop: <code>[85, 78, 91]</code> and <code>3 students passed</code>.</li></ul><p>This is called <b>filtering</b>: keep only the items that pass a test.</p>" },
    { t: "ar", html: "لبناء قائمة: أنشئ{{g:|ي}} قائمة فارغة قبل الحلقة، ثم أضف{{g:|ي}} إليها بـ append داخل الحلقة ما يحقق الشرط فقط. ولا تضع{{g:|ي}} القائمة الفارغة داخل الحلقة وإلا ستُمسح في كل دورة." },

    { t: "h", text: "From text to list and back: split() and join()" },
    { t: "code", code: c`words = "python is fun to learn".split()
print(words)
print(len(words), "words")`, before: "<p><code>split()</code> is a string method that cuts text into a <b>list of words</b>. Run it.</p>", note: "<p>With no argument, <code>split()</code> cuts wherever there are spaces (one or many) and drops the spaces. The result is a real list: <code>['python', 'is', 'fun', 'to', 'learn']</code>, so <code>len(words)</code> is <code>5</code>. This is how a program counts the words in a sentence.</p>" },
    { t: "code", code: c`date = "2026-09-29".split("-")
print(date)
cities = "Riyadh,Jeddah,Dammam".split(",")
print(cities, cities[0])`, before: "<p>You can tell <code>split</code> where to cut by giving it a <b>separator</b>.</p>", note: "<p><code>split(\"-\")</code> cuts at every dash → <code>['2026', '09', '29']</code>. <code>split(\",\")</code> cuts at every comma → <code>['Riyadh', 'Jeddah', 'Dammam']</code>, and <code>cities[0]</code> is <code>Riyadh</code>. Important: the pieces are always <b>strings</b>. <code>'2026'</code> is text, not a number; to calculate with it you must convert it with <code>int()</code> (Day 3).</p>" },
    { t: "code", code: c`words = ["python", "is", "fun"]
print(" ".join(words))
print("-".join(words))
print("".join(words))`, before: "<p><code>join()</code> does the opposite: it glues a list of strings into one string. The string <b>before</b> the dot is the glue.</p>", note: "<p>Line by line:</p><ul><li><code>\" \".join(words)</code> puts a space between the items → <code>python is fun</code>.</li><li><code>\"-\".join(words)</code> uses a dash → <code>python-is-fun</code>.</li><li><code>\"\".join(words)</code> uses empty glue → <code>pythonisfun</code>.</li></ul><p>The order feels backwards at first: you write the glue first, then <code>.join(</code>the list<code>)</code>.</p>" },
    { t: "code", code: c`marks = [85, 92, 78]
texts = []
for m in marks:
    texts.append(str(m))
print(", ".join(texts))`, before: "<p><code>join</code> only accepts a list of <b>strings</b>. So how do we join numbers? Run it.</p>", note: "<p><code>\", \".join(marks)</code> would crash with a <code>TypeError</code>, because 85 is a number, not text. So we first build a new list of strings with the empty-list-plus-append pattern: <code>str(m)</code> turns each number into text (Day 3). <code>texts</code> becomes <code>['85', '92', '78']</code>, and the join prints <code>85, 92, 78</code>.</p>" },
    { t: "ar", html: "split تقطع النص وتحوّله إلى قائمة نصوص (بالمسافات أو بفاصل تحدده)، و join تلصق قائمة نصوص في نص واحد، والفاصل يُكتب قبل النقطة. وانتبه{{g:|ي}}: نتائج split نصوص وليست أرقامًا، و join لا تقبل إلا النصوص." },

    { t: "h", text: "List comprehension: the loop + append pattern in one line" },
    { t: "p", html: "<p>You have now written the same shape several times: make an empty list, loop, <code>append</code> something each turn. It is so common that Python has a shorter way to write it, called a <b>list comprehension</b>. It does <b>exactly</b> the same thing — nothing new happens, it is only a shorter spelling. Let's build it from the long version.</p>" },
    { t: "code", code: c`nums = [1, 2, 3, 4]
doubled = []
for x in nums:
    doubled.append(x * 2)
print(doubled)`, before: "<p>Step 1: the long version you already know. Run it.</p>", note: "<p>Three parts make this work:</p><ul><li>an empty list: <code>doubled = []</code></li><li>a loop header: <code>for x in nums</code></li><li>the value we append each turn: <code>x * 2</code></li></ul><p>Result: <code>[2, 4, 6, 8]</code>. Keep these three parts in mind for the next example.</p>" },
    { t: "code", code: c`nums = [1, 2, 3, 4]
doubled = [x * 2 for x in nums]
print(doubled)`, before: "<p>Step 2: the same program as a comprehension. Find the three parts from the previous example.</p>", note: "<p>Inside the square brackets:</p><ul><li><b>first</b> comes the value to append: <code>x * 2</code></li><li><b>then</b> the loop header, without the colon: <code>for x in nums</code></li><li>the brackets themselves replace <code>doubled = []</code> and <code>.append</code></li></ul><p>Read it aloud as: \"a list of <code>x * 2</code> for each <code>x</code> in <code>nums</code>\". The output is the same <code>[2, 4, 6, 8]</code>.</p>" },
    { t: "table", head: ["Loop + append", "List comprehension"], rows: [["`doubled = []`\n`for x in nums:`\n`    doubled.append(x * 2)`", "`doubled = [x * 2 for x in nums]`"], ["`passed = []`\n`for m in marks:`\n`    if m >= 60:`\n`        passed.append(m)`", "`passed = [m for m in marks if m >= 60]`"], ["`nums = []`\n`for s in parts:`\n`    nums.append(int(s))`", "`nums = [int(s) for s in parts]`"]] },
    { t: "code", code: c`marks = [85, 42, 78, 55, 91]
passed = [m for m in marks if m >= 60]
print(passed)`, before: "<p>Step 3: a comprehension can also <b>filter</b>, with an <code>if</code> at the end. Compare it with the \"Building a list step by step\" example above.</p>", note: "<p>This is the second row of the table. The <code>if m &gt;= 60</code> at the end works like the <code>if</code> inside the loop: only marks that pass the test are kept. So the order is: <b>what to keep</b> (<code>m</code>), <b>where from</b> (<code>for m in marks</code>), <b>which ones</b> (<code>if m &gt;= 60</code>). Output: <code>[85, 78, 91]</code>, identical to the long version.</p><p>When should you use which? Use a comprehension when the job is simple and fits comfortably on one line. If you need several steps, prints, or <code>elif</code>, write the normal loop — clear code beats short code.</p>" },
    { t: "predict", code: c`nums = [3, 8, 5, 10]
print([n + 1 for n in nums if n > 4])`, explain: "Only the items greater than 4 are kept: 8, 5 and 10 (3 is skipped). For each kept item we compute <code>n + 1</code>. Output: <code>[9, 6, 11]</code>. The long version would be: empty list, <code>for n in nums:</code>, <code>if n &gt; 4:</code>, <code>append(n + 1)</code>." },
    { t: "ar", html: "list comprehension طريقة مختصرة لنمط \"قائمة فارغة + حلقة + append\"، وتعطي النتيجة نفسها تمامًا. الترتيب: القيمة أولًا ثم for ثم if (اختياري): [x * 2 for x in nums]. وإذا صار المنطق معقدًا استخدم{{g:|ي}} الحلقة العادية." },

    { t: "h", text: "Reading many numbers on one line" },
    { t: "code", code: c`parts = input("Numbers separated by spaces: ").split()
print(parts)
nums = [int(x) for x in parts]
print(nums, "sum =", sum(nums))`, stdin: "4 8 15 16 23 42", before: "<p>Users often type several numbers on one line. Here <code>split</code> and a comprehension work together. Run it, then change the numbers in the Input box.</p>", note: "<p>Line by line:</p><ul><li><code>input(...)</code> reads the whole line as one string, <code>\"4 8 15 16 23 42\"</code>, and <code>.split()</code> cuts it into a list.</li><li>Line 2 shows the problem: <code>['4', '8', '15', ...]</code> — the quotes tell you these are <b>strings</b>. <code>sum(parts)</code> would crash.</li><li>Line 3 converts each piece: \"a list of <code>int(x)</code> for each <code>x</code> in <code>parts</code>\" → <code>[4, 8, 15, 16, 23, 42]</code>. It is the third row of the table above.</li><li>Now <code>sum</code> works → <code>sum = 108</code>.</li></ul><p>You will often see it squeezed into one line: <code>nums = [int(x) for x in input().split()]</code>. Read it from the inside out: read, split, convert each.</p>" },
    { t: "ar", html: "لقراءة عدة أرقام في سطر واحد: input().split() تعطي قائمة نصوص، ثم نحوّل كل عنصر إلى رقم بـ [int(x) for x in parts]. وانتبه{{g:|ي}}: بدون التحويل لا يمكن الجمع أو المقارنة كأرقام." },

    { t: "h", text: "Putting it together: a class report" },
    { t: "code", code: c`line = input("Marks: ")
marks = [int(x) for x in line.split()]
avg = sum(marks) / len(marks)
above = []
for m in marks:
    if m > avg:
        above.append(m)
top3 = sorted(marks, reverse=True)[:3]
print(f"Students: {len(marks)}")
print(f"Average: {avg:.1f}")
print("Highest:", max(marks), "Lowest:", min(marks))
print("Above average:", above)
print("Top 3:", top3)`, stdin: "85 92 78 95 60 88 71", together: true, before: "<p>A small report a teacher could really use, built only from today's ideas. Read it and guess the top 3 before you run it. Then type your own marks in the Input box.</p>", note: "<p>How it works:</p><ul><li>Lines 1–2 read one line of text, <code>split</code> it, and convert every piece to an <code>int</code> with a comprehension. Now <code>marks</code> is a real list of 7 numbers.</li><li>Line 3 computes the average with <code>sum</code> and <code>len</code>: <code>569 / 7</code> ≈ <code>81.3</code>.</li><li>Lines 4–7 use the empty-list-plus-append pattern to keep the marks above the average: <code>[85, 92, 95, 88]</code>. (As a comprehension it would be <code>[m for m in marks if m &gt; avg]</code>.)</li><li>Line 8 sorts a <b>copy</b> from high to low and slices the first three: <code>[95, 92, 88]</code>. Because we used <code>sorted()</code>, <code>marks</code> keeps its original order for line 12.</li><li>Lines 9–13 print the report, with <code>{avg:.1f}</code> from Day 4 rounding to one decimal, and <code>max</code>/<code>min</code> for the extremes.</li></ul><p>Notice that the program works for any number of marks: 3 students or 300, with no change to the code. That is the power of lists.</p>" },
    { t: "ar", html: "جمعنا كل أفكار اليوم: قراءة الأرقام بـ split وتحويلها، ثم sum و len للمتوسط، وبناء قائمة بـ append، و sorted مع reverse=True والقص للحصول على أعلى ثلاث درجات. والبرنامج يعمل مع أي عدد من الدرجات." },
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

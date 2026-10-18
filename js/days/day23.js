window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[23] = {
  title: "numpy: fast math on whole arrays",
  intro: "AI is mostly math on large tables of numbers: images are grids of pixels, datasets are rows and columns. <b>numpy</b> is the Python library for that — it does math on a whole array at once, often 50–100× faster than a Python loop. Every AI library (scikit-learn, PyTorch, TensorFlow) is built on its ideas.",
  introAr: "numpy مكتبة للحساب السريع على مصفوفات الأرقام، وهي أساس كل مكتبات الذكاء الاصطناعي. الفكرة الأهم: نطبق العملية على المصفوفة كلها مرة واحدة بدون حلقة. (أول تشغيل اليوم يأخذ عدة ثوانٍ لتحميل المكتبة.)",
  goals: ["Create arrays with `np.array`, `arange`, `zeros`, `linspace`", "Do vectorized math without loops", "Use shape, 2D arrays, rows and columns", "Filter with boolean masks", "Compute statistics along an axis"],
  learn: [
    { t: "h", text: "Why AI needs numpy" },
    { t: "p", html: "<p>So far you stored many numbers in a <b>list</b> and used a <code>for</code> loop to do math on each one. That works for 10 numbers. But AI works with <b>millions</b>: a single photo is a grid of about a million brightness numbers, and a dataset of students is a big table of rows and columns. Looping over all of that in plain Python is slow and makes the code long.</p><p><b>numpy</b> (say \"num-pie\") is a library that gives you a new kind of container, the <b>array</b>. You write one short line like <code>marks + 5</code>, and numpy applies it to <b>every</b> number at once, using fast code written in C. Every AI library you will meet (scikit-learn tomorrow, PyTorch, TensorFlow) is built on this idea.</p>" },
    { t: "analogy", title: "A calculator vs. a spreadsheet", html: "<p>A Python loop is like using a pocket calculator: you type each number, one at a time. A numpy array is like a spreadsheet column: you write <i>one</i> formula, \"add 5\", and the whole column updates instantly. Same math, much less work.</p>" },
    { t: "ar", html: "مكتبة numpy تعطينا \"المصفوفة\" (array): مجموعة أرقام نطبق عليها العملية مرة واحدة بدل حلقة على كل عنصر. هذا أسرع بكثير وأقصر، وهو أساس كل مكتبات الذكاء الاصطناعي. (أول تشغيل يأخذ عدة ثوانٍ لتحميل المكتبة.)" },

    { t: "h", text: "Your first array" },
    { t: "p", html: "<p>numpy is a <b>module</b>, so you import it (Day 16). Everyone in the world imports it with the short nickname <code>np</code>: <code>import numpy as np</code>. Then <code>np.array(list)</code> turns a normal list into an array.</p>" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
print(marks)
print(marks + 5)`, before: "<p>The first run loads numpy, so wait a few seconds. After that it is instant. Run it, then change <code>+ 5</code> to <code>- 10</code>.</p>", note: "<p>Line by line:</p><ul><li><code>import numpy as np</code> loads the library and lets us call it <code>np</code>. The <code>as np</code> part is a nickname; without it you would have to write <code>numpy.array</code> every time.</li><li><code>np.array([70, 85, 90, 60, 95])</code> takes a normal list and builds an array from it.</li><li><code>print(marks)</code> shows <code>[70 85 90 60 95]</code>. Notice: <b>no commas</b>. That is how you recognise an array when it is printed.</li><li><code>marks + 5</code> adds 5 to <b>every</b> element: <code>[ 75  90  95  65 100]</code>. No loop! The extra spaces just line the numbers up neatly.</li></ul><p><code>marks</code> itself is not changed; <code>marks + 5</code> makes a new array, exactly like <code>x + 5</code> does not change <code>x</code>.</p>" },
    { t: "code", code: c`import numpy as np

lst = [70, 85]
arr = np.array([70, 85])
print(lst * 2)
print(arr * 2)`, before: "<p>Lists and arrays look similar, but they react to math very differently. Predict both lines before running.</p>", note: "<p>Line by line:</p><ul><li><code>lst * 2</code> on a <b>list</b> means \"repeat the list twice\": <code>[70, 85, 70, 85]</code> (you saw this on Day 10).</li><li><code>arr * 2</code> on an <b>array</b> means \"multiply every number by 2\": <code>[140 170]</code>.</li></ul><p>This \"do it to every element\" behaviour has a name: <b>vectorization</b>. It is the single most important idea of today. If you ever get a strange result, check: am I working with a list or an array?</p>" },
    { t: "ar", html: "نستورد المكتبة بالاسم المختصر np. الدالة np.array تحوّل القائمة إلى مصفوفة، والعملية مثل + 5 تُطبَّق على كل العناصر. انتبه{{g:|ي}}: القائمة × 2 تكرر القائمة، أما المصفوفة × 2 فتضرب كل رقم في 2." },
    { t: "predict", code: c`import numpy as np
a = np.array([2, 4, 6])
print(a / 2, a.sum())`, explain: "<code>a / 2</code> divides every element: <code>[1. 2. 3.]</code>. The dots mean they became decimals (division always gives floats, like on Day 3). <code>a.sum()</code> adds them: <code>12</code>. Output: <code>[1. 2. 3.] 12</code>." },

    { t: "h", text: "Math on whole arrays" },
    { t: "p", html: "<p>Any arithmetic you know, <code>+ - * / ** //  %</code>, works on arrays. There are two kinds: an array with <b>one number</b> (that number is used for every element), and an array with <b>another array of the same length</b> (they are matched up position by position).</p>" },
    { t: "code", code: c`import numpy as np

prices = np.array([20.0, 35.5, 12.0])
print(prices * 1.15)
print(prices - 2)`, before: "<p>A shop in Riyadh adds 15% VAT to every price. Run it and check the first answer by hand: 20 × 1.15.</p>", note: "<p>Line by line:</p><ul><li><code>prices</code> holds three prices in SAR.</li><li><code>prices * 1.15</code> multiplies each price by 1.15: <code>[23.    40.825 13.8  ]</code>. So 20 becomes 23, 35.5 becomes 40.825, 12 becomes 13.8. numpy pads with spaces to line up the columns.</li><li><code>prices - 2</code> takes 2 SAR off each price: <code>[18.  33.5 10. ]</code>. <code>18.</code> simply means 18.0.</li></ul><p>With a list you would need a loop and a new empty list. Here it is one line.</p>" },
    { t: "code", code: c`import numpy as np

quiz1 = np.array([8, 6, 9])
quiz2 = np.array([7, 10, 5])
print(quiz1 + quiz2)
print(quiz2 - quiz1)`, before: "<p>Three students took two quizzes. Position 0 is the first student in both arrays. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>quiz1 + quiz2</code> adds the arrays <b>position by position</b>: 8+7, 6+10, 9+5 → <code>[15 16 14]</code>, each student's total.</li><li><code>quiz2 - quiz1</code> → <code>[-1  4 -4]</code>: the first student dropped 1 point, the second improved by 4, the third dropped 4.</li></ul><p>This only works when both arrays have the <b>same length</b>. With lengths 3 and 4, numpy stops with an error, because it cannot match the positions.</p>" },
    { t: "code", code: c`import numpy as np

a = np.array([1, 4, 9, 16])
print(a ** 2)
print(np.sqrt(a))`, before: "<p>numpy also has math functions like <code>np.sqrt</code> (square root) that work on every element.</p>", note: "<p>Line by line:</p><ul><li><code>a ** 2</code> squares each element (Day 3's power operator): <code>[  1  16  81 256]</code>.</li><li><code>np.sqrt(a)</code> takes the square root of each: <code>[1. 2. 3. 4.]</code>. The answers are decimals, so they print with dots.</li></ul><p>Use <code>np.sqrt</code>, not <code>math.sqrt</code>: the <code>math</code> module only accepts one number, numpy's version accepts a whole array. You will use squares and square roots tomorrow to measure the <b>distance</b> between two points.</p>" },
    { t: "ar", html: "العمليات الحسابية تعمل على المصفوفة كلها: مع رقم واحد يُطبق الرقم على كل عنصر، ومع مصفوفة أخرى تُطابق العناصر موضعًا بموضع. انتبه{{g:|ي}}: يجب أن يكون للمصفوفتين نفس الطول." },

    { t: "h", text: "Statistics in one call" },
    { t: "p", html: "<p>Remember writing a loop to find the total, the average or the biggest mark? An array can do all of that itself with <b>methods</b>: you write the array name, a dot, and the method, like <code>marks.mean()</code>.</p>" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
print(marks.sum(), marks.mean())
print(marks.min(), marks.max())
print(marks.std().round(2))
print(marks.argmax())`, before: "<p>Run it and check the sum and the mean in your head.</p>", note: "<p>Line by line:</p><ul><li><code>marks.sum()</code> → <code>400</code> and <code>marks.mean()</code> (the average, 400 ÷ 5) → <code>80.0</code>.</li><li><code>marks.min()</code> → <code>60</code>, <code>marks.max()</code> → <code>95</code>.</li><li><code>marks.std()</code> is the <b>standard deviation</b>: roughly, how far the marks are from the average, on average. A small number means everyone scored similarly; a big one means the marks are spread out. Here it is about 13. <code>.round(2)</code> keeps 2 decimals: <code>13.04</code>.</li><li><code>marks.argmax()</code> gives the <b>position</b> of the biggest value, not the value itself: <code>4</code>, because 95 is at index 4. (There is also <code>argmin()</code>.)</li></ul><p><code>argmax</code> is very useful: if you also have a list of names in the same order, <code>names[marks.argmax()]</code> gives the top student's name.</p>" },
    { t: "ar", html: "المصفوفة تحسب الإحصاءات بنفسها: sum للمجموع، mean للمتوسط، min و max للأصغر والأكبر، std للانتشار. انتبه{{g:|ي}}: argmax تعطي موقع أكبر قيمة وليس القيمة نفسها." },

    { t: "h", text: "What is inside an array: dtype, shape, size" },
    { t: "p", html: "<p>Unlike a list, an array holds <b>one type</b> of value: all whole numbers or all decimals. Its <code>dtype</code> (data type) tells you which. Its <code>shape</code> tells you how many elements it has in each direction, and <code>size</code> the total count.</p>" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
print(type(marks))
print(marks.dtype, marks.shape, marks.size)
prices = np.array([10, 20.5])
print(prices, prices.dtype)`, before: "<p>Run it and look at the three properties. Note that <code>dtype</code>, <code>shape</code> and <code>size</code> have <b>no parentheses</b>: they are stored facts, not actions.</p>", note: "<p>Line by line:</p><ul><li><code>type(marks)</code> → <code>&lt;class 'numpy.ndarray'&gt;</code>. \"nd-array\" means \"n-dimensional array\".</li><li><code>marks.dtype</code> → a whole-number type such as <code>int64</code> (\"integer, 64 bits\"; the browser may show <code>int32</code>, which is the same idea).</li><li><code>marks.shape</code> → <code>(5,)</code>: a tuple meaning \"5 elements in one direction\". The comma is there because it is a one-item tuple (Day 11).</li><li><code>marks.size</code> → <code>5</code>.</li><li><code>np.array([10, 20.5])</code>: one decimal forces <b>all</b> elements to become decimals, so it prints <code>[10.  20.5]</code> with dtype <code>float64</code>.</li></ul>" },
    { t: "code", code: c`import numpy as np

marks = np.array([70, 85, 90, 60, 95])
whole = np.array([1, 2, 3], dtype=float)
print(whole)
print(float(marks.mean()), int(marks.max()))
print(marks.tolist())`, before: "<p>Two handy tricks: choosing the dtype yourself, and turning numpy values back into normal Python values.</p>", note: "<p>Line by line:</p><ul><li><code>dtype=float</code> tells numpy \"store these as decimals\", so <code>[1, 2, 3]</code> prints as <code>[1. 2. 3.]</code>. Do this before dividing if you want to be sure you get decimals.</li><li><code>marks.mean()</code> is a numpy number (type <code>numpy.float64</code>), not a plain Python float. <code>float(...)</code> and <code>int(...)</code> convert them: <code>80.0 95</code>.</li><li><code>marks.tolist()</code> turns the whole array back into a normal list: <code>[70, 85, 90, 60, 95]</code>, with commas again.</li></ul><p>Why bother? When a function must return \"a list\" or a plain number (as many exercises ask), converting avoids surprises in how the result is printed.</p>" },
    { t: "ar", html: "كل عناصر المصفوفة من نوع واحد (dtype)، و shape يعطي الأبعاد، و size العدد الكلي، وكلها بدون أقواس. ويمكن الرجوع إلى أنواع بايثون العادية بـ int() و float() و tolist()." },

    { t: "h", text: "Creating arrays without typing every number" },
    { t: "p", html: "<p>Typing long lists by hand is boring. numpy has functions that build arrays for you: a range of numbers, evenly spaced points, all zeros, or random values.</p>" },
    { t: "code", code: c`import numpy as np

print(np.arange(5))
print(np.arange(0, 10, 2))
print(np.linspace(0, 1, 5))`, before: "<p><code>arange</code> is numpy's version of <code>range</code> (Day 9). <code>linspace</code> is new. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>np.arange(5)</code> → <code>[0 1 2 3 4]</code>: like <code>range(5)</code>, it starts at 0 and stops <b>before</b> 5.</li><li><code>np.arange(0, 10, 2)</code> → <code>[0 2 4 6 8]</code>: start 0, stop before 10, step 2, exactly like <code>range(0, 10, 2)</code>.</li><li><code>np.linspace(0, 1, 5)</code> → <code>[0.   0.25 0.5  0.75 1.  ]</code>: \"give me <b>5</b> evenly spaced numbers from 0 to 1\". Unlike <code>arange</code>, the end value 1 <b>is included</b>, and the last argument is how many numbers you want, not the step.</li></ul>" },
    { t: "code", code: c`import numpy as np

print(np.zeros(3))
print(np.ones(4))
print(np.zeros(3, dtype=int))`, before: "<p>Arrays full of zeros or ones are a common starting point, like starting a counter at 0.</p>", note: "<p>Line by line:</p><ul><li><code>np.zeros(3)</code> → <code>[0. 0. 0.]</code>: three zeros. By default they are decimals.</li><li><code>np.ones(4)</code> → <code>[1. 1. 1. 1.]</code>.</li><li><code>np.zeros(3, dtype=int)</code> → <code>[0 0 0]</code>: whole-number zeros, thanks to <code>dtype=int</code>.</li></ul><p>You fill such arrays later, or use them in math: for example <code>np.ones(3) / 3</code> gives three equal weights of about 0.333 each.</p>" },
    { t: "code", code: c`import numpy as np

rng = np.random.default_rng(42)
print(rng.integers(1, 7, size=5))
print(rng.random(3).round(2))`, before: "<p>Random data is great for testing. Run it twice: you get the <b>same</b> numbers both times. Then change <code>42</code> to another number.</p>", note: "<p>Line by line:</p><ul><li><code>np.random.default_rng(42)</code> creates a <b>random number generator</b>. The 42 is the <b>seed</b>: the same seed always produces the same \"random\" sequence, just like <code>random.seed()</code> from Day 16. This makes experiments repeatable.</li><li><code>rng.integers(1, 7, size=5)</code> rolls a die 5 times: whole numbers from 1 up to, but <b>not including</b>, 7. With seed 42 you get <code>[1 5 4 3 3]</code>.</li><li><code>rng.random(3)</code> gives 3 decimals between 0 and 1; <code>.round(2)</code> keeps 2 decimals.</li></ul><p>Change the seed and the numbers change; keep it and they stay. Tomorrow and on Day 25 you will see seeds again, called <code>random_state</code>.</p>" },
    { t: "ar", html: "np.arange مثل range (النهاية غير داخلة)، و np.linspace تعطي عددًا محددًا من النقاط المتساوية والنهاية داخلة. np.zeros و np.ones لمصفوفات من الأصفار أو الآحاد. والبذرة (seed) تجعل الأرقام العشوائية نفسها في كل تشغيل." },

    { t: "h", text: "2D arrays: tables of numbers" },
    { t: "p", html: "<p>Real data is usually a <b>table</b>: each row is one thing (a student), each column is one measurement (quiz, midterm, final). numpy stores a table as a <b>2D array</b>: a list of rows, where every row has the same length.</p>" },
    { t: "analogy", title: "A 2D array is a spreadsheet", html: "<p>Think of an Excel sheet. To find a cell you say <b>row first, then column</b>: \"row 2, column 3\". numpy works the same way, except counting starts at 0, as always in Python.</p>" },
    { t: "code", code: c`import numpy as np

# rows = students, columns = quiz, midterm, final
grades = np.array([
    [80, 90, 85],
    [60, 75, 70],
    [95, 88, 92],
])
print(grades)
print(grades.shape)`, before: "<p>Look at how the list of lists is written one row per line, so it looks like a table. Run it.</p>", note: "<p>Line by line:</p><ul><li>We pass a <b>list of lists</b> to <code>np.array</code>. Each inner list is one student's row: <code>[80, 90, 85]</code> is student 0's quiz, midterm and final.</li><li><code>print(grades)</code> shows it as a neat table, one row per line, with double brackets <code>[[ ... ]]</code> on the outside.</li><li><code>grades.shape</code> → <code>(3, 3)</code>: <b>(rows, columns)</b>, so 3 students and 3 marks each. Always rows first.</li></ul><p>A 1D array had shape <code>(5,)</code>; a 2D array has two numbers in its shape. A colour photo even has three: (height, width, 3 colours).</p>" },
    { t: "code", code: c`import numpy as np

grades = np.array([[80, 90, 85], [60, 75, 70], [95, 88, 92]])
print(grades[0])
print(grades[1, 2])
print(grades[:, 2])
print(grades[0:2, 0])`, before: "<p>This is the trickiest part of today. Before running, point with your finger to what each line should pick out.</p>", note: "<p>Line by line:</p><ul><li><code>grades[0]</code> → <code>[80 90 85]</code>: one index means <b>a whole row</b> (student 0).</li><li><code>grades[1, 2]</code> → <code>70</code>: <b>row 1, column 2</b>, one single cell (student 1's final). Note the comma inside one pair of brackets.</li><li><code>grades[:, 2]</code> → <code>[85 70 92]</code>: the colon <code>:</code> alone means \"<b>all</b> rows\", so this reads \"all rows, column 2\": every student's final.</li><li><code>grades[0:2, 0]</code> → <code>[80 60]</code>: rows 0 up to (not including) 2, column 0, the slicing you know from lists (Day 10).</li></ul><p>Rule to remember: <code>grades[r]</code> is a row, <code>grades[:, c]</code> is a column. Mixing them up is the most common numpy bug.</p>" },
    { t: "ar", html: "المصفوفة ثنائية الأبعاد جدول: صفوف وأعمدة، والشكل shape يكتب (الصفوف، الأعمدة). grades[r] صف كامل، و grades[r, c] خلية واحدة، و grades[:, c] عمود كامل. انتبه{{g:|ي}}: الصف أولًا ثم العمود." },
    { t: "predict", code: c`import numpy as np
m = np.array([[1, 2], [3, 4], [5, 6]])
print(m.shape, m[:, 1], m[2])`, explain: "3 rows and 2 columns, so the shape is <code>(3, 2)</code>. <code>m[:, 1]</code> is all rows, column 1: <code>[2 4 6]</code>. <code>m[2]</code> is row 2: <code>[5 6]</code>. Output: <code>(3, 2) [2 4 6] [5 6]</code>." },

    { t: "h", text: "axis: averaging columns or rows" },
    { t: "p", html: "<p>On a table, <code>grades.mean()</code> averages <b>all</b> the numbers together. Usually you want something more useful: the average of each <b>column</b> (how hard was each exam?) or of each <b>row</b> (how did each student do?). The <code>axis</code> argument chooses the direction.</p>" },
    { t: "code", code: c`import numpy as np

grades = np.array([[80, 90, 85], [60, 75, 70], [95, 88, 92]])
print(grades.mean(axis=0))
print(grades.mean(axis=1))
print(grades.mean())`, before: "<p>Run it. Count the results on each line: one line has 3 column-averages, the other 3 row-averages.</p>", note: "<p>Line by line:</p><ul><li><code>axis=0</code> goes <b>down</b> each column: (80+60+95)/3, (90+75+88)/3, (85+70+92)/3 → <code>[78.33 84.33 82.33]</code> (printed with more decimals). One answer <b>per column</b>: the quiz was the hardest.</li><li><code>axis=1</code> goes <b>across</b> each row: (80+90+85)/3 and so on → <code>[85. 68.33 91.67]</code>. One answer <b>per student</b>.</li><li>No axis → one number for the whole table: <code>81.66666666666667</code>.</li></ul><p>The same <code>axis</code> works with <code>sum</code>, <code>max</code>, <code>min</code>, <code>std</code> and <code>argmax</code>.</p>" },
    { t: "analogy", title: "axis in one sentence", html: "<p><code>axis=0</code> squashes the <b>rows</b> together (you move down, and get one result per column). <code>axis=1</code> squashes the <b>columns</b> together (you move across, and get one result per row). Tip: the axis you name is the one that <b>disappears</b> from the shape: a (3, 4) table with <code>axis=0</code> gives 4 results.</p>" },
    { t: "ar", html: "axis=0 يحسب نزولًا في كل عمود فيعطي نتيجة لكل عمود، و axis=1 يحسب عبر كل صف فيعطي نتيجة لكل صف. بدون axis نحصل على رقم واحد للجدول كله." },
    { t: "predict", code: c`import numpy as np
m = np.array([[1, 2], [3, 4], [5, 6]])
print(m.sum(axis=0), m.sum(axis=1))`, explain: "<code>axis=0</code> adds down each column: 1+3+5 = 9 and 2+4+6 = 12 → <code>[ 9 12]</code>. <code>axis=1</code> adds across each row: <code>[ 3  7 11]</code>. Two columns give 2 results; three rows give 3." },

    { t: "h", text: "reshape: same numbers, new shape" },
    { t: "p", html: "<p>Sometimes your numbers arrive in one long line but you need a table, or the other way round. <code>reshape(rows, columns)</code> rearranges the same numbers into a new shape, filling row by row.</p>" },
    { t: "code", code: c`import numpy as np

m = np.arange(12)
print(m)
t = m.reshape(3, 4)
print(t)
print(t.shape)`, before: "<p>Run it, then try <code>reshape(4, 3)</code> and <code>reshape(2, 6)</code>. What happens with <code>reshape(5, 3)</code>?</p>", note: "<p>Line by line:</p><ul><li><code>np.arange(12)</code> → the 12 numbers 0 to 11 in one row.</li><li><code>m.reshape(3, 4)</code> lays them out as <b>3 rows of 4</b>, filling the first row (0–3), then the second (4–7), then the third (8–11).</li><li><code>t.shape</code> → <code>(3, 4)</code>.</li></ul><p>The total must stay the same: 3 × 4 = 12 works, but <code>reshape(5, 3)</code> needs 15 numbers and gives an error. You can even go to 3 dimensions: <code>np.arange(24).reshape(2, 3, 4)</code> is 2 tables of 3 rows and 4 columns, the shape of a tiny colour image.</p>" },
    { t: "ar", html: "reshape يعيد ترتيب نفس الأرقام في شكل جديد صفًا بعد صف. انتبه{{g:|ي}}: عدد العناصر يجب أن يبقى نفسه، فمثلًا 12 عنصرًا تصبح 3×4 أو 2×6 لكن ليس 5×3." },

    { t: "h", text: "Boolean masks: filtering without loops" },
    { t: "p", html: "<p>A very common question: \"which values pass a test?\" (which days were hotter than 40°C, which students passed). With a list you would loop and use <code>if</code>. With numpy, you compare the whole array at once and get a <b>mask</b>: an array of <code>True</code>/<code>False</code>, one per element.</p>" },
    { t: "analogy", title: "A mask is a stencil", html: "<p>Imagine a sheet of cardboard with holes cut only over the hot days. Put it on top of the list of temperatures, and you can see only the values under the holes. <code>True</code> = hole, <code>False</code> = covered.</p>" },
    { t: "code", code: c`import numpy as np

temps = np.array([38, 45, 41, 29, 47, 36])
hot = temps > 40
print(hot)
print(temps[hot])`, before: "<p>Six daily temperatures in Riyadh. Run it and compare the two printed lines position by position.</p>", note: "<p>Line by line:</p><ul><li><code>temps &gt; 40</code> compares <b>every</b> element with 40 and gives the mask <code>[False  True  True False  True False]</code>. We store it in <code>hot</code>.</li><li><code>temps[hot]</code> uses the mask <b>as an index</b>: it keeps only the positions where the mask is <code>True</code> → <code>[45 41 47]</code>.</li></ul><p>You can also write it in one go: <code>temps[temps &gt; 40]</code>. Read it as \"temps where temps is greater than 40\".</p>" },
    { t: "code", code: c`import numpy as np

temps = np.array([38, 45, 41, 29, 47, 36])
print((temps > 40).sum())
print(temps[temps < 40].mean())`, before: "<p>Two everyday questions: <i>how many</i> values pass the test, and <i>what is the average</i> of only those values?</p>", note: "<p>Line by line:</p><ul><li><code>(temps &gt; 40).sum()</code> → <code>3</code>. When you add booleans, <code>True</code> counts as 1 and <code>False</code> as 0, so the sum is the <b>number of True values</b>: 3 hot days. The parentheses make sure the comparison happens first.</li><li><code>temps[temps &lt; 40]</code> keeps 38, 29, 36, and <code>.mean()</code> averages only those → <code>34.333333333333336</code>.</li></ul><p>Filter first, then compute: this pattern answers a huge number of data questions in one line.</p>" },
    { t: "code", code: c`import numpy as np

temps = np.array([38, 45, 41, 29, 47, 36])
print(temps[(temps > 35) & (temps < 45)])
print(temps[(temps < 30) | (temps > 45)])`, before: "<p>To combine two conditions on arrays you <b>cannot</b> use <code>and</code> / <code>or</code>. numpy uses the symbols <code>&amp;</code> (and) and <code>|</code> (or). Run it.</p>", note: "<p>Line by line:</p><ul><li><code>(temps &gt; 35) &amp; (temps &lt; 45)</code>: <code>&amp;</code> means \"both must be True\", element by element → keeps <code>[38 41 36]</code>.</li><li><code>(temps &lt; 30) | (temps &gt; 45)</code>: <code>|</code> means \"at least one True\" → <code>[29 47]</code>, the extreme days.</li></ul><p>Two rules: use <code>&amp;</code> and <code>|</code>, and put <b>each comparison in parentheses</b>. Without parentheses Python groups the symbols wrongly and you get an error. Writing <code>temps &gt; 35 and temps &lt; 45</code> also fails, because <code>and</code> wants one True/False, not a whole array.</p>" },
    { t: "code", code: c`import numpy as np

temps = np.array([38, 45, 41, 29, 47, 36])
print(np.where(temps > 40, "hot", "ok"))
print(np.minimum(temps, 40))
print((temps > 40).astype(int))`, before: "<p>Three more tools that work element by element: choosing between two values, capping values, and turning True/False into 1/0.</p>", note: "<p>Line by line:</p><ul><li><code>np.where(condition, A, B)</code> is an <code>if/else</code> for every element: <code>\"hot\"</code> where the condition is True, <code>\"ok\"</code> where it is False → <code>['ok' 'hot' 'hot' 'ok' 'hot' 'ok']</code>.</li><li><code>np.minimum(temps, 40)</code> compares each value with 40 and keeps the <b>smaller</b> one, so nothing goes above 40 → <code>[38 40 40 29 40 36]</code>. Great for capping marks at 100. (<code>np.maximum</code> does the opposite.)</li><li><code>.astype(int)</code> converts the mask to whole numbers: True → 1, False → 0 → <code>[0 1 1 0 1 0]</code>.</li></ul><p>A normal <code>if</code> cannot handle a whole array at once; these functions can.</p>" },
    { t: "ar", html: "المقارنة على مصفوفة تعطي قناعًا (mask) من True و False، واستخدامه كفهرس يُبقي القيم الصحيحة فقط، وجمعه يعطي عددها. انتبه{{g:|ي}}: مع المصفوفات استخدم{{g:|ي}} &amp; و | بدل and و or، وضع{{g:|ي}} كل شرط بين قوسين." },
    { t: "predict", code: c`import numpy as np
x = np.array([5, 12, 8, 20, 3])
print(x[x > 6], (x > 6).sum())`, explain: "The mask <code>x &gt; 6</code> is <code>[False True True True False]</code>. Using it as an index keeps <code>[12  8 20]</code> (numpy adds a space before 8 to line the numbers up), and summing the mask counts the Trues: <code>3</code>." },

    { t: "h", text: "The dot product: a weighted sum" },
    { t: "p", html: "<p>Your final grade is often a <b>weighted</b> total: quiz 20%, midterm 30%, final 50%. You multiply each mark by its weight and add up the results. This \"multiply in pairs, then add\" operation is called the <b>dot product</b>, and numpy writes it with the <code>@</code> symbol. It is also the basic calculation inside every neural network.</p>" },
    { t: "code", code: c`import numpy as np

marks = np.array([80, 90, 70])
weights = np.array([0.2, 0.3, 0.5])
print(marks * weights)
print((marks * weights).sum())
print(marks @ weights)`, before: "<p>Watch the two steps (multiply, then add) and then the one-symbol shortcut.</p>", note: "<p>Line by line:</p><ul><li><code>marks * weights</code> multiplies position by position: 80×0.2, 90×0.3, 70×0.5 → <code>[16. 27. 35.]</code>.</li><li><code>.sum()</code> adds those: 16 + 27 + 35 = <code>78.0</code>, the weighted grade.</li><li><code>marks @ weights</code> does both steps at once → <code>78.0</code>.</li></ul><p>The two arrays must have the same length, one weight per mark.</p>" },
    { t: "code", code: c`import numpy as np

grades = np.array([[80, 90, 70], [100, 60, 80]])
weights = np.array([0.2, 0.3, 0.5])
print(grades @ weights)`, before: "<p>The real power: <code>@</code> with a whole table computes the weighted total of <b>every row</b> at once.</p>", note: "<p>Line by line:</p><ul><li><code>grades</code> has 2 students (rows) and 3 marks (columns).</li><li><code>grades @ weights</code> does a dot product of <b>each row</b> with the weights: student 0 → 16 + 27 + 35 = 78; student 1 → 20 + 18 + 40 = 78.</li><li>Result: <code>[78. 78.]</code>, one total per student.</li></ul><p>The number of columns (3) must equal the number of weights (3). For a class of 300 students it is still one line.</p>" },
    { t: "ar", html: "حاصل الضرب النقطي @ يضرب العناصر زوجًا زوجًا ثم يجمعها، وهو المجموع الموزون مثل حساب الدرجة النهائية. ومع جدول يحسب المجموع الموزون لكل صف مرة واحدة، بشرط أن يساوي عدد الأعمدة عدد الأوزان." },

    { t: "h", text: "How much faster is numpy?" },
    { t: "p", html: "<p>We keep saying numpy is fast. Let us measure it. The <code>time</code> module's <code>time.time()</code> gives the current time in seconds; subtracting two readings tells you how long the code between them took.</p>" },
    { t: "code", code: c`import numpy as np
import time
data = list(range(1_000_000))
arr = np.arange(1_000_000)
t = time.time()
total = sum([x * x for x in data])
print("python loop:", round(time.time() - t, 3), "s")
t = time.time()
total2 = (arr * arr).sum()
print("numpy:", round(time.time() - t, 4), "s")`, noViz: true, before: "<p>Both halves compute the same thing: the sum of the squares of the numbers 0 to 999,999. Run it (it may take a second). Your exact times will differ from your classmates'.</p>", note: "<p>Line by line:</p><ul><li><code>1_000_000</code> is just one million; the underscores make big numbers easier to read.</li><li><code>data</code> is a normal list, <code>arr</code> an array with the same numbers.</li><li>The first timing uses a list comprehension (Day 10): square every number in Python, then <code>sum</code>.</li><li>The second timing does <code>arr * arr</code> (square every element at once) and <code>.sum()</code>.</li></ul><p>On most computers numpy is <b>dozens of times faster</b>. With a million numbers you hardly notice, but AI works with billions, where the difference is minutes versus days.</p>" },
    { t: "ar", html: "نقيس الوقت بـ time.time() قبل الكود وبعده. الحساب بـ numpy على مليون رقم أسرع بعشرات المرات من حلقة بايثون، وهذا الفرق مهم جدًا مع بيانات الذكاء الاصطناعي الضخمة." },

    { t: "h", text: "Putting it together: a class report" },
    { t: "code", code: c`import numpy as np
names = ["Sara", "Omar", "Lina", "Fahad"]
grades = np.array([
    [85, 90, 78],
    [55, 62, 58],
    [92, 88, 95],
    [70, 65, 80],
])
weights = np.array([0.2, 0.3, 0.5])
totals = grades @ weights
print("Totals:", totals)
print("Averages per exam:", grades.mean(axis=0).round(1))
print("Passed:", (totals >= 60).sum(), "of", len(names))
best = totals.argmax()
print("Top student:", names[best], totals[best])
print("Curved finals:", np.minimum(grades[:, 2] + 5, 100))`, together: true, before: "<p>An instructor's whole grade report in a few lines, with no loops. The columns of <code>grades</code> are quiz, midterm and final. Before running, guess who the top student is. Then add a fifth student row (and name) and run again.</p>", note: "<p>How it works:</p><ul><li><code>names</code> is a normal list; <code>grades</code> is a 2D array with one row per student <b>in the same order</b>.</li><li><code>grades @ weights</code> gives every student's weighted total at once: <code>[83.  58.6 92.3 73.5]</code>.</li><li><code>grades.mean(axis=0)</code> averages <b>down</b> each column, one average per exam: <code>[75.5 76.2 77.8]</code>.</li><li><code>(totals &gt;= 60).sum()</code> builds a mask and counts the Trues: <code>3</code> of 4 passed.</li><li><code>totals.argmax()</code> gives the <b>position</b> of the best total (2), and we use it to index both <code>names</code> and <code>totals</code>: <code>Lina 92.3</code>.</li><li><code>grades[:, 2]</code> takes the final-exam column, <code>+ 5</code> curves it, and <code>np.minimum(..., 100)</code> caps it: <code>[ 83  63 100  85]</code>.</li></ul><p>Arrays, vectorized math, 2D indexing, axis, masks, <code>argmax</code> and the dot product: every idea from today in one realistic program.</p>" },
    { t: "ar", html: "جمعنا كل أفكار اليوم: جدول درجات ثنائي الأبعاد، والمجموع الموزون بـ @، ومتوسط كل عمود بـ axis=0، وعدّ الناجحين بقناع، وموقع الأفضل بـ argmax. انتبه{{g:|ي}} أن تبقى قائمة الأسماء بنفس ترتيب صفوف الجدول." },
  ],
  mistakes: [
    { title: "Forgetting the import alias", html: "", wrong: c`import numpy
a = np.array([1, 2])   # NameError: np`, right: c`import numpy as np
a = np.array([1, 2])` },
    { title: "Mixing up rows and columns", html: "<code>a[1]</code> is a row. A column needs <code>a[:, 1]</code>.", wrong: c`finals = grades[2]      # this is student 2!`, right: c`finals = grades[:, 2]   # column 2` },
    { title: "and / or on arrays", html: "Use <code>&amp;</code> and <code>|</code> with parentheses.", wrong: c`temps[temps > 30 and temps < 40]`, right: c`temps[(temps > 30) & (temps < 40)]`, ar: "مع مصفوفات numpy استخدم{{g:|ي}} &amp; و | مع الأقواس بدل and و or." },
  ],
  tricks: [
    { title: "reshape", html: "", code: c`import numpy as np
print(np.arange(12).reshape(3, 4))` },
    { title: "Dot product = weighted sum", html: "The core operation of neural networks.", code: c`import numpy as np
marks = np.array([80, 90, 70])
weights = np.array([0.2, 0.3, 0.5])
print(marks @ weights)   # 80*.2 + 90*.3 + 70*.5 = 78.0` },
  ],
  practice: [
    { t: "predict", code: c`import numpy as np
a = np.array([1, 2, 3])
print(a * 2, a + a, a ** 2)`, explain: "Element by element: <code>[2 4 6] [2 4 6] [1 4 9]</code>." },
    { t: "predict", code: c`import numpy as np
m = np.arange(6).reshape(2, 3)
print(m.sum(axis=0), m.sum(axis=1))`, explain: "m = [[0,1,2],[3,4,5]]. Column sums <code>[3 5 7]</code>, row sums <code>[ 3 12]</code>." },
    { t: "parsons", title: "Curve the grades", prompt: "Add 5 points to every mark but cap them at 100, then print the result.", lines: ["import numpy as np", "marks = np.array([97, 80, 91, 60])", "curved = np.minimum(marks + 5, 100)", "print(curved)"], distractors: ["curved = marks + 5 if marks < 100 else 100"], explain: "<code>np.minimum</code> compares element by element: <code>[100 85 96 65]</code>. A plain <code>if</code> can't handle a whole array." },
    { t: "try", title: "Temperature analysis", html: "<p>Riyadh daily max temperatures for two weeks are below. Find: the average, the hottest day number, how many days were above 44, and the average of weekends only (days 5, 6, 12, 13).</p>", code: c`import numpy as np
t = np.array([42, 44, 45, 47, 46, 43, 41, 44, 45, 46, 48, 47, 44, 42])
print("average:", t.mean().round(1))
` },
  ],
  exercises: [
    { id: "norm", lvl: "seed", title: "Scale to 0–1", prompt: "<p>Write <code>normalize(values)</code> returning a numpy array scaled so the min becomes 0 and the max becomes 1: <code>(x - min) / (max - min)</code>. No loops! (Scaling features like this is a standard ML step.)</p>", starter: "import numpy as np\n\ndef normalize(values):\n    pass\n", tests: [{ after: "print(normalize([10, 20, 30, 50]))", expected: "[0.   0.25 0.5  1.  ]" }],
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def normalize(values):
    a = np.array(values, dtype=float)
    return (a - a.min()) / (a.max() - a.min())` }] },
    { id: "pass", lvl: "seed", title: "Passing students", prompt: "<p>Write <code>pass_info(marks)</code> returning a tuple <code>(count_passed, average_of_passed)</code> for marks ≥ 60, the average rounded to 1 decimal. Use a mask.</p>", starter: "import numpy as np\n\ndef pass_info(marks):\n    pass\n", tests: [{ after: "print(pass_info([55, 70, 90, 40, 65]))", expected: "(3, 75.0)" }],
      solutions: [{ name: "Mask", code: c`import numpy as np

def pass_info(marks):
    a = np.array(marks)
    passed = a[a >= 60]
    return int(passed.size), round(float(passed.mean()), 1)`, note: "<code>int()</code> and <code>float()</code> turn numpy numbers into plain Python numbers for clean printing." }] },
    { id: "table", lvl: "star", title: "Grade table", prompt: "<p>Rows are students, columns are (quiz, midterm, final) weighted 20%, 30%, 50%. Write <code>final_scores(grades)</code> returning each student's weighted total rounded to 1 decimal (as a list), and <code>best_column(grades)</code> returning the index of the column with the highest average.</p>", starter: "import numpy as np\n\ndef final_scores(grades):\n    pass\n\ndef best_column(grades):\n    pass\n", tests: [{ after: "g = [[80, 90, 70], [100, 60, 80], [50, 70, 90]]\nprint(final_scores(g))\nprint(best_column(g))", expected: "[78.0, 78.0, 76.0]\n2" }],
      solutions: [{ name: "Dot product", code: c`import numpy as np

def final_scores(grades):
    g = np.array(grades)
    w = np.array([0.2, 0.3, 0.5])
    return np.round(g @ w, 1).tolist()

def best_column(grades):
    return int(np.array(grades).mean(axis=0).argmax())`, note: "<code>argmax</code> gives the <b>position</b> of the maximum." }] },
    { id: "dist", lvl: "star", title: "Distance between points", prompt: "<p>Write <code>distance(p, q)</code>: Euclidean distance √Σ(pᵢ − qᵢ)² between two points of any dimension, rounded to 3 decimals. This exact formula powers the nearest-neighbor AI of Day 24.</p>", starter: "import numpy as np\n\ndef distance(p, q):\n    pass\n", tests: [{ after: "print(distance([0, 0], [3, 4]), distance([1, 2, 3], [4, 6, 3]), distance([1], [1]))", expected: "5.0 5.0 0.0" }],
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def distance(p, q):
    d = np.array(p) - np.array(q)
    return round(float(np.sqrt((d ** 2).sum())), 3)` }, { name: "np.linalg.norm", code: c`import numpy as np

def distance(p, q):
    return round(float(np.linalg.norm(np.array(p) - np.array(q))), 3)` }] },
    { id: "moving", lvl: "fire", title: "Moving average", prompt: "<p>Write <code>moving_average(values, k)</code> returning the averages of every window of k consecutive values, rounded to 2 decimals, as a list. Used for smoothing stock prices and sensor data.</p>", starter: "import numpy as np\n\ndef moving_average(values, k):\n    pass\n", tests: [{ after: "print(moving_average([1, 2, 3, 4, 5, 6], 3))\nprint(moving_average([10, 20], 2))", expected: "[2.0, 3.0, 4.0, 5.0]\n[15.0]" }],
      solutions: [{ name: "Loop over windows", code: c`import numpy as np

def moving_average(values, k):
    a = np.array(values, dtype=float)
    return [round(float(a[i:i + k].mean()), 2) for i in range(len(a) - k + 1)]` }, { name: "convolve", code: c`import numpy as np

def moving_average(values, k):
    out = np.convolve(values, np.ones(k) / k, mode="valid")
    return np.round(out, 2).tolist()`, note: "Convolution slides a window over the data — the same operation used by image-recognition networks (CNNs)." }] },
    { id: "image", lvl: "fire", title: "Tiny image processing", prompt: "<p>An image is a 2D array of brightness values 0–255. Write <code>invert(img)</code> (255 − value) and <code>threshold(img, t)</code> returning 1 where value ≥ t else 0. Return numpy arrays.</p>", starter: "import numpy as np\n\ndef invert(img):\n    pass\n\ndef threshold(img, t):\n    pass\n", tests: [{ after: "img = np.array([[0, 128], [200, 255]])\nprint(invert(img))\nprint(threshold(img, 150))", expected: "[[255 127]\n [ 55   0]]\n[[0 0]\n [1 1]]" }],
      solutions: [{ name: "Vectorized", code: c`import numpy as np

def invert(img):
    return 255 - np.array(img)

def threshold(img, t):
    return (np.array(img) >= t).astype(int)` }] },
    { id: "fix23", lvl: "fire", debug: true, title: "numpy bug hunt", prompt: "<p>Fix so the test prints <code>[40 45]</code> and <code>85.0</code>.</p>", starter: c`import numpy

def mid_range(t):
    a = np.array(t)
    return a[a > 35 and a < 46]

def row_mean(m, r):
    return np.array(m)[:, r].mean()`, tests: [{ after: "print(mid_range([30, 40, 45, 50]))\nprint(row_mean([[80, 90], [70, 60]], 0))", expected: "[40 45]\n85.0" }],
      solutions: [{ name: "Fixed", code: c`import numpy as np

def mid_range(t):
    a = np.array(t)
    return a[(a > 35) & (a < 46)]

def row_mean(m, r):
    return np.array(m)[r].mean()`, note: "Import alias, <code>&amp;</code> with parentheses, and a row is <code>m[r]</code> (not <code>m[:, r]</code>)." }] },
  ],
  quiz: [
    { q: "`np.array([1, 2]) * 3` is…", o: ["`[1, 2, 1, 2, 1, 2]`", "`[3 6]`", "Error", "`9`"], a: 1, e: "Vectorized multiplication." },
    { q: "For a 2D array `a`, `a[:, 0]` is…", o: ["the first row", "the first column", "the first element", "all rows except 0"], a: 1, e: "All rows, column 0." },
    { q: "`a.mean(axis=0)` on a 3×4 array returns how many numbers?", o: ["3", "4", "12", "1"], a: 1, e: "One per column." },
    { q: "Keep values between 10 and 20:", o: ["`a[a > 10 and a < 20]`", "`a[(a > 10) & (a < 20)]`", "`a[10:20]`", "`a.filter(10, 20)`"], a: 1, e: "Element-wise `&`." },
    { q: "Why is numpy faster than loops?", o: ["It skips numbers", "Operations run in optimized C over whole arrays", "It uses the internet", "It isn't"], a: 1, e: "Vectorization." },
  ],
  puzzle: { title: "Shape shifter", q: "<p>What does this print?</p>", code: c`import numpy as np
a = np.arange(24).reshape(2, 3, 4)
print(a.shape, a[1, 2, 3], a.sum(axis=2).shape)`, answers: ["(2, 3, 4) 23 (2, 3)"], hint: "The last element of arange(24) is 23. Summing over an axis removes it from the shape.", ar: "الجمع على محور يحذفه من الشكل.", e: "Shape <code>(2, 3, 4)</code>; <code>a[1,2,3]</code> is the very last element <code>23</code>; summing axis 2 leaves <code>(2, 3)</code>. Color images are exactly such 3D arrays: height × width × 3 colors." },
  cards: [
    { f: "Vectorization", b: "Applying an operation to a whole array at once, without Python loops." },
    { f: "Row vs column in numpy", b: "`a[r]` row r; `a[:, c]` column c." },
    { f: "axis=0 vs axis=1", b: "axis=0: down the rows (per column). axis=1: across columns (per row)." },
    { f: "Filter an array", b: "`a[a > 40]`; combine with `&`, `|` and parentheses." },
    { f: "Dot product", b: "`a @ b` = sum of element-wise products (weighted sum)." },
  ],
};
})();

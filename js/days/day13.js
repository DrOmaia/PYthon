window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[13] = {
  title: "Review + project: games and data",
  intro: "This week you learned to repeat and to organize data. Put those together and you can build real games and data tools. Today: a complete number-guessing game, a quiz game driven by data, and a text analyzer.",
  introAr: "يوم المشاريع! نبني لعبة تخمين كاملة، ولعبة اختبار تعتمد على قائمة من القواميس، ومحلل نصوص. نفس خطوات حل المشكلات: افهم، أمثلة، خطة، كود صغير، اختبار.",
  goals: ["Combine loops, lists and dictionaries in one program", "Store program data as a list of dictionaries", "Build a game loop with score and attempts", "Review the whole week"],
  learn: [
    { t: "h", text: "Today's plan" },
    { t: "p", html: "<p>No new Python today. This week you learned two big powers: <b>repeating</b> (<code>while</code>, <code>for</code>) and <b>organizing data</b> (lists, tuples, sets, dictionaries). Today you combine them into real programs: a guessing game, a quiz engine and a text analyzer.</p><p>How to use this page: first read the <b>recap</b> sections and run each small example — if one surprises you, go back to that day for 10 minutes. Then read the <b>project plans</b>. They tell you what to build first, how to test it, and how the pieces connect. The full tasks are in the Exercises tab.</p>" },
    { t: "analogy", title: "Building with blocks", html: "<p>A carpenter does not invent a new tool for every chair. With a saw, a hammer and a drill she can build anything. Your tools are the loop, the list and the dictionary. Today is the day you stop learning tools and start building furniture.</p>" },
    { t: "ar", html: "اليوم لا يوجد درس جديد: نراجع أدوات الأسبوع (الحلقات والقوائم والمجموعات والقواميس) ثم نبني بها مشاريع. اقرأ{{g:|ي}} المراجعة وشغّل{{g:|ي}} الأمثلة، ثم اتبع{{g:|ي}} خطة كل مشروع خطوة بخطوة." },

    { t: "h", text: "Recap: while, break and continue (Day 8)" },
    { t: "p", html: "<p>Use <code>while</code> when you <b>don't know in advance</b> how many rounds you need: \"keep asking until the answer is right\", \"keep reading until the user types done\". Remember the three parts: a <b>start</b> value before the loop, a <b>condition</b>, and an <b>update</b> inside the loop — forget the update and the loop never ends. <code>break</code> leaves the loop immediately; <code>continue</code> skips the rest of this round and goes back to the condition.</p>" },
    { t: "code", code: c`total = 0
while True:
    line = input()
    if line == "done":
        break
    if not line.isdigit():
        continue
    total += int(line)
print("Total:", total)`, stdin: "5\nabc\n10\ndone", before: "<p>This loop reads numbers until <code>done</code> and ignores anything that is not a number. The input is <code>5</code>, <code>abc</code>, <code>10</code>, <code>done</code>. Predict the total, then run it.</p>", note: "<p>Line by line:</p><ul><li><code>while True:</code> would run forever — the only way out is the <code>break</code>.</li><li><code>5</code>: not done, is a number, so <code>total</code> becomes 5.</li><li><code>abc</code>: <code>isdigit()</code> is False, so <code>continue</code> jumps back to the top and <code>total += ...</code> is skipped. No crash from <code>int(\"abc\")</code>.</li><li><code>10</code>: total becomes 15.</li><li><code>done</code>: <code>break</code> ends the loop and the last line prints <code>Total: 15</code>.</li></ul><p>This \"read until a stop word\" shape appears in the grade book, cart and seat map exercises.</p>" },
    { t: "ar", html: "while مناسبة عندما لا نعرف عدد الدورات مسبقًا. break تخرج من الحلقة فورًا، و continue تتخطى بقية الدورة الحالية. وتذكّر{{g:|ي}} تحديث المتغير داخل الحلقة حتى لا تصبح لا نهائية." },

    { t: "h", text: "Recap: for, range and the loop else (Day 9)" },
    { t: "p", html: "<p>Use <code>for</code> when you <b>have</b> something to walk through: a list, a string, a dictionary, or a range of numbers. <code>range(a, b)</code> starts at <code>a</code> and stops <b>before</b> <code>b</code>. A loop inside a loop runs the inner loop completely for every round of the outer one, so the rounds multiply (3 × 4 = 12).</p>" },
    { t: "code", code: c`for row in range(1, 4):
    line = ""
    for col in range(1, 5):
        line += str(row * col) + " "
    print(line)`, before: "<p>A nested loop builds a small multiplication grid. Count how many numbers it prints.</p>", note: "<p>Line by line:</p><ul><li><code>range(1, 4)</code> gives 1, 2, 3 — the 4 is not included. That is 3 rows.</li><li>For each row, we start an empty string and the inner loop adds 4 numbers (<code>range(1, 5)</code> → 1 to 4).</li><li>After the inner loop finishes, the row is printed.</li></ul><p>3 rows × 4 columns = 12 numbers. The seat-map exercise uses exactly this rows × columns thinking.</p>" },
    { t: "code", code: c`nums = [3, 5, 7]
for n in nums:
    if n % 2 == 0:
        print("Found an even number:", n)
        break
else:
    print("No even number")`, before: "<p>A feature you saw in Day 9's solutions: a loop can have an <code>else</code>. Run it, then change the list to <code>[3, 4, 7]</code>.</p>", note: "<p>The <code>else</code> lines up with <code>for</code>, not with <code>if</code>. It means: \"run this if the loop finished <b>without</b> a <code>break</code>\".</p><ul><li>With <code>[3, 5, 7]</code> no number is even, the loop ends normally, so the <code>else</code> prints <code>No even number</code>.</li><li>With <code>[3, 4, 7]</code> we find 4, print it and <code>break</code> — so the <code>else</code> is <b>skipped</b>.</li></ul><p>It works on <code>while</code> loops too. In the guessing game it means \"the player never guessed it\" — no extra True/False flag needed.</p>" },
    { t: "ar", html: "for تمر على عناصر قائمة أو نص أو قاموس أو range. و range(a, b) تتوقف قبل b. و else بعد الحلقة تُنفذ فقط إذا انتهت الحلقة بدون break، وتكون بنفس إزاحة for أو while." },

    { t: "h", text: "Recap: lists and grids (Day 10)" },
    { t: "p", html: "<p>A list is an <b>ordered, changeable</b> sequence: use it whenever you collect many items and order matters. The everyday tools: <code>append</code> to add, <code>pop</code> to remove, <code>lst[i]</code> to read by position, <code>split()</code> to turn text into a list and <code>\" \".join(lst)</code> to turn it back. And the classic trap: <code>lst.sort()</code> changes the list and returns <code>None</code>, while <code>sorted(lst)</code> returns a new sorted list.</p>" },
    { t: "code", code: c`words = "loops make programs powerful".split()
longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
print(longest, len(words))`, before: "<p>The champion pattern on a list: find the longest word. You will need this in the text analyzer.</p>", note: "<p>Line by line:</p><ul><li><code>split()</code> breaks the sentence at spaces: 4 words.</li><li>The first word is the starting champion.</li><li>Each word that is <b>strictly</b> longer (<code>&gt;</code>) replaces it. Because of <code>&gt;</code> and not <code>&gt;=</code>, a tie keeps the <b>first</b> longest word — exactly what the analyzer asks for.</li></ul><p>Output: <code>powerful 4</code>.</p>" },
    { t: "code", code: c`seats = [["."] * 4 for _ in range(3)]
seats[1][2] = "X"
for row in seats:
    print("".join(row))`, before: "<p>A <b>grid</b> (like a classroom seat map or a game board) is a <b>list of lists</b>: one inner list per row. Run it and find the X.</p>", note: "<p>Line by line:</p><ul><li><code>[\".\"] * 4</code> makes one row: <code>['.', '.', '.', '.']</code>.</li><li><code>[ ... for _ in range(3)]</code> is a <b>list comprehension</b> (Day 10): \"make this 3 times and collect the results\". The name <code>_</code> is a normal variable name that programmers use to say \"I don't need this counter\". Result: 3 separate rows. In the same way, <code>[[0] * 3 for _ in range(2)]</code> gives 2 rows of 3 zeros: <code>[[0, 0, 0], [0, 0, 0]]</code>.</li><li><code>seats[1][2]</code>: first bracket picks the <b>row</b> (row 1 = the second row), second bracket picks the <b>column</b> (column 2 = the third seat).</li><li><code>\"\".join(row)</code> glues the row's characters into one line.</li></ul><p>Output: <code>....</code>, <code>..X.</code>, <code>....</code>. Users count from 1, Python from 0 — so a seat typed as <code>2,3</code> is <code>seats[1][2]</code>.</p>" },
    { t: "ar", html: "القائمة مرتبة وقابلة للتعديل. sort() تعدّل القائمة وترجع None، و sorted() ترجع قائمة جديدة. والشبكة قائمة من القوائم: grid[row][col]، والترقيم يبدأ من 0 بينما المستخدم يبدأ من 1." },

    { t: "h", text: "Recap: tuples and sets (Day 11)" },
    { t: "p", html: "<p>A <b>tuple</b> is a fixed group of values that belong together, like a point <code>(x, y)</code> or a seat <code>(row, col)</code>. It cannot change, so it can be a dictionary key or a set item. A <b>set</b> keeps only <b>unique</b> items and answers <code>in</code> very fast; use it to remove duplicates or to remember what you have already seen. Sets have no order, and <code>&amp;</code> <code>|</code> <code>-</code> give the common, combined and different items.</p>" },
    { t: "code", code: c`data = [3, 8, 1, 8, 5, 3]
seen = set()
unique = []
for x in data:
    if x not in seen:
        seen.add(x)
        unique.append(x)
print(unique, len(seen))
print(len(set(data)))`, before: "<p>Remove duplicates but <b>keep the order</b>: a set remembers what we have seen, a list keeps the order.</p>", note: "<p>Line by line:</p><ul><li><code>seen</code> starts as an empty set — remember, <code>set()</code>, not <code>{}</code>.</li><li>For each number, if we have not seen it yet, we remember it in the set <b>and</b> append it to the list.</li><li>The second 8 and the second 3 are already in <code>seen</code>, so they are skipped.</li></ul><p>Output: <code>[3, 8, 1, 5] 4</code>, then <code>4</code>. If you only need <b>how many</b> unique items (like \"Unique: 7\" in the analyzer), <code>len(set(data))</code> is enough; <code>set(data)</code> alone loses the order.</p>" },
    { t: "ar", html: "الـ tuple مجموعة ثابتة لا تتغير، تصلح مفتاحًا في القاموس. والمجموعة set تحذف التكرار وسريعة في in لكنها بلا ترتيب. لحذف التكرار مع الحفاظ على الترتيب استخدم{{g:|ي}} set للمراقبة وقائمة للنتيجة." },

    { t: "h", text: "Recap: dictionaries (Day 12)" },
    { t: "p", html: "<p>A dictionary stores <b>key → value</b> pairs: use it whenever you look things up by a <b>name</b> instead of a position. The four lines you will use all the time: <code>d.get(key, default)</code> for a safe lookup, <code>for k, v in d.items():</code> to loop over pairs, <code>counts[x] = counts.get(x, 0) + 1</code> to count, and <code>max(d, key=d.get)</code> for the key with the biggest value.</p>" },
    { t: "code", code: c`stock = {"pen": 3, "book": 0, "bag": 2}
for item, n in stock.items():
    if n == 0:
        continue
    print(item, n)
print(stock.get("ruler", 0))
print(list(dict.fromkeys(["b", "a", "b", "c"])))`, before: "<p>Three dictionary ideas in a row. Read each line before you run it.</p>", note: "<p>Line by line:</p><ul><li>The loop unpacks each pair with <code>items()</code>. The book has 0 in stock, so <code>continue</code> skips it: we see <code>pen 3</code> and <code>bag 2</code>.</li><li><code>stock.get(\"ruler\", 0)</code>: there is no ruler, so the default <code>0</code> is printed instead of a KeyError.</li><li><code>dict.fromkeys(lst)</code> makes a dictionary whose keys are the list items. Keys can't repeat and keep the order they were added, so turning it back into a list removes duplicates <b>and keeps the order</b>: <code>['b', 'a', 'c']</code>. A one-line version of the set + list loop above.</li></ul>" },
    { t: "table", head: ["Day", "Tool", "Remember"], rows: [["8", "`while`", "start, condition, update; `break` / `continue`"], ["9", "`for`, `range`", "stop not included; nested loops multiply; loop `else` = no break"], ["10", "lists", "`append`, `pop`, `sort()` vs `sorted()`, `split` / `join`, grid[row][col]"], ["11", "tuples, sets", "tuple = fixed; set = unique, `&` `|` `-`"], ["12", "dicts", "`get`, `items()`, counting pattern, `max(d, key=d.get)`"]] },
    { t: "ar", html: "القاموس للبحث بالاسم: get للقراءة الآمنة، و items() للمرور على الأزواج، ونمط العدّ counts.get(x, 0) + 1، و max(d, key=d.get) لأكبر قيمة." },

    { t: "h", text: "Data-driven programs" },
    { t: "p", html: "<p>A beginner writes a quiz as 10 copies of the same <code>if</code> block. A programmer writes the questions as <b>data</b> — a list of dictionaries — and <b>one loop</b> that handles any number of them. Adding a question then means adding one line of data, with no new code. This idea is the key to Project 2.</p>" },
    { t: "code", code: c`questions = [{"q": "Capital of Saudi Arabia?", "a": "riyadh"},
             {"q": "2 ** 4 = ?", "a": "16"}]
score = 0
for item in questions:
    answer = input(item["q"] + " ").strip().lower()
    if answer == item["a"]:
        score += 1
    else:
        print("The answer was", item["a"])
print(f"Score: {score}/{len(questions)}")`, stdin: "Riyadh\n8", before: "<p>The answers given are <code>Riyadh</code> and <code>8</code>. Run it, then add a third question to the list, for example <code>{\"q\": \"Python creator's first name?\", \"a\": \"guido\"}</code>, add an answer line in the Input box, and run again — without touching the loop.</p>", note: "<p>How it works:</p><ul><li><code>questions</code> is a <b>list</b>, and each item is a <b>dictionary</b> with two keys: <code>\"q\"</code> (the question) and <code>\"a\"</code> (the answer, stored in lowercase).</li><li>The <code>for</code> loop gives one dictionary per round in <code>item</code>; <code>item[\"q\"]</code> is its question.</li><li><code>.strip().lower()</code> cleans the answer, so <code>Riyadh</code> and <code> riyadh </code> both match <code>\"riyadh\"</code>.</li><li>A correct answer adds 1 to <code>score</code> (an accumulator); a wrong one shows the right answer.</li><li><code>len(questions)</code> is used for the total, so it is always correct, however many questions you add.</li></ul><p>Output: <code>The answer was 16</code> (8 is wrong), then <code>Score: 1/2</code>. A list can be split over several lines inside its brackets, which keeps long data readable.</p>" },
    { t: "ar", html: "البرنامج المعتمد على البيانات: نخزن الأسئلة في قائمة من القواميس، وحلقة واحدة تعالجها كلها. إضافة سؤال = إضافة سطر بيانات فقط، بدون كود جديد." },

    { t: "h", text: "Project 1 plan: the guessing game" },
    { t: "p", html: "<p>Never write a whole game at once. Build it in small steps and <b>run after every step</b>:</p><ol><li><b>One guess.</b> Read a number and print <code>Too low</code>, <code>Too high</code> or a win message. Test with 20, 50 and 37.</li><li><b>Repeat.</b> Wrap it in a loop that stops when the guess is right.</li><li><b>Count and limit.</b> Add a <code>tries</code> counter and stop after <code>max_tries</code>. Print how many tries are left.</li><li><b>Game over.</b> If the loop ends without a win, print <code>Game over. It was 37</code> — this is where a flag (<code>won = False</code>) or the loop <code>else</code> helps.</li><li><b>Bad input.</b> Guesses outside 1–100 print <code>Out of range</code> and must <b>not</b> count: use <code>continue</code> <b>before</b> <code>tries += 1</code>.</li></ol>" },
    { t: "code", code: c`secret = 37
tries = 0
while True:
    guess = int(input())
    tries += 1
    if guess == secret:
        print(f"You win in {tries} tries!")
        break
    print("Too low" if guess < secret else "Too high")`, stdin: "50\n25\n37", before: "<p>This is the program after steps 1 and 2 (plus a counter). Run it with the guesses <code>50</code>, <code>25</code>, <code>37</code>, then continue with steps 3–5 yourself in the exercise.</p>", note: "<p>Line by line:</p><ul><li><code>while True</code> keeps asking; <code>break</code> ends the game on a correct guess.</li><li><code>tries += 1</code> counts every guess, so the win message can say how many it took.</li><li>The last line is a <b>conditional expression</b> (Day 5 tricks): it chooses <code>\"Too low\"</code> if the guess is smaller, otherwise <code>\"Too high\"</code>.</li></ul><p>Output: <code>Too high</code>, <code>Too low</code>, <code>You win in 3 tries!</code>. What is still missing: the limit of 5 tries, the \"tries left\" message, game over and the range check. For step 3, change <code>while True</code> into <code>while tries &lt; max_tries</code>.</p>" },
    { t: "ar", html: "ابن{{g:|ي}} اللعبة على مراحل وشغّل{{g:|ي}} بعد كل مرحلة: تخمين واحد، ثم حلقة، ثم عداد وحد أقصى، ثم رسالة الخسارة، ثم رفض الأرقام خارج 1–100. وانتبه{{g:|ي}}: continue يجب أن تأتي قبل tries += 1 حتى لا تُحسب المحاولة الخاطئة." },

    { t: "h", text: "Project 2 plan: the quiz engine" },
    { t: "p", html: "<p>Start from the data-driven example above — it already does most of the work. Then change it in three steps:</p><ol><li>Use the starter's <code>quiz</code> list instead of <code>questions</code>.</li><li>Print <code>✓</code> for a correct answer and <code>✗</code> plus the right answer otherwise.</li><li>After the loop, choose the final message with an <code>if/elif/else</code>: all correct → <code>Excellent</code>, at least half → <code>Good</code>, else <code>Keep practicing</code>. Order matters (Day 5): check the strictest condition first.</li></ol>" },
    { t: "code", code: c`score = 2
n = 4
if score == n:
    print("Excellent")
elif score >= n / 2:
    print("Good")
else:
    print("Keep practicing")`, before: "<p>Test the final-message logic alone before you plug it in. Try <code>score</code> = 4, 2 and 1.</p>", note: "<p>Line by line:</p><ul><li><code>score == n</code> asks \"all correct?\" first, because a perfect score is also \"at least half\" — if <code>Good</code> came first, nobody would ever see <code>Excellent</code>.</li><li><code>n / 2</code> is 2.0 for 4 questions, so a score of 2 is exactly half → <code>Good</code>. Using <code>&gt;=</code> makes \"at least half\" include the boundary.</li><li>Score 1 falls to <code>else</code> → <code>Keep practicing</code>.</li></ul><p>Testing a small piece on its own like this is much faster than playing the whole quiz each time.</p>" },
    { t: "ar", html: "مشروع الاختبار = مثال البيانات أعلاه + رموز ✓ و ✗ + رسالة نهائية. اختبر{{g:|ي}} جزء الرسالة النهائية وحده أولًا، وابدأ{{g:|ي}} بالشرط الأدق (كل الإجابات صحيحة) قبل \"النصف على الأقل\"." },

    { t: "h", text: "Project 3 plan: the text analyzer" },
    { t: "p", html: "<p>The analyzer is four small problems you have already solved, one after the other:</p><ol><li><b>Clean</b> the text: lowercase, remove <code>.,!?</code>, split into words.</li><li><b>Count</b> the words: <code>len(words)</code>. Unique words: <code>len(set(words))</code> or the number of keys in your counts dictionary.</li><li><b>Longest</b> word: the champion pattern from the lists recap.</li><li><b>Top</b> word: the counting pattern, then <code>max(counts, key=counts.get)</code>.</li></ol><p>Print after each step while you build it, so you can see the data is right before moving on.</p>" },
    { t: "code", code: c`text = "Python is fun. Python, anyone?".lower()
for p in ".,!?":
    text = text.replace(p, "")
words = text.split()
print(words)`, before: "<p>Step 1 only: cleaning. Run it and look closely at the words — no punctuation is left.</p>", note: "<p>Line by line:</p><ul><li><code>.lower()</code> makes <code>Python</code> and <code>python</code> the same word.</li><li><code>for p in \".,!?\":</code> loops over the <b>characters</b> of the string, one punctuation mark per round.</li><li><code>text.replace(p, \"\")</code> returns a new string with that mark removed. Strings can't change, so we must store the result back into <code>text</code> — forgetting <code>text =</code> is the classic bug here.</li><li><code>split()</code> gives the clean words.</li></ul><p>Output: <code>['python', 'is', 'fun', 'python', 'anyone']</code>. Without cleaning, <code>\"python,\"</code> and <code>\"python\"</code> would be counted as two different words.</p>" },
    { t: "ar", html: "محلل النصوص أربع مسائل صغيرة: تنظيف النص، ثم العدّ، ثم أطول كلمة بنمط البطل، ثم أكثر كلمة تكرارًا بنمط العدّ و max. وتذكّر{{g:|ي}} أن replace ترجع نصًا جديدًا فيجب حفظه: text = text.replace(...)." },

    { t: "h", text: "How to debug this week's programs" },
    { t: "p", html: "<p>The bug-hunt exercise hides three classic Week 2 bugs. Before you read the code, keep this checklist next to you:</p><ul><li>Looping over a dict with two variables? It needs <code>.items()</code>.</li><li>Looping over a list? Use the list itself (<code>for m in marks</code>), not <code>range(marks)</code> — <code>range</code> needs a number.</li><li>\"At least\" means <code>&gt;=</code>; \"more than\" means <code>&gt;</code>. Always test the boundary value.</li><li>Accumulators (<code>total = 0</code>) start <b>before</b> the loop they collect in.</li></ul>" },
    { t: "code", code: c`marks = [80, 90]
total = 0
for m in marks:
    total += m
avg = total / len(marks)
print(avg, avg >= 80, avg > 85)`, before: "<p>A correct average loop to compare with the buggy one. Check the last two answers carefully.</p>", note: "<p>Line by line:</p><ul><li><code>total</code> starts at 0 <b>before</b> the loop; each mark is added: 170.</li><li><code>for m in marks</code> gives the marks themselves — no <code>range</code> needed.</li><li>The average is <code>85.0</code>. <code>85.0 &gt;= 80</code> is <code>True</code>, but <code>85.0 &gt; 85</code> is <code>False</code>: the boundary value decides.</li></ul><p>Output: <code>85.0 True False</code>.</p>" },
    { t: "ar", html: "قائمة فحص الأخطاء: items() للمرور على القاموس بمتغيرين، والمرور على القائمة نفسها وليس range، و >= تعني \"على الأقل\"، والمجمّع يبدأ قبل الحلقة. واختبر{{g:|ي}} دائمًا القيمة الحدّية." },
  ],
  practice: [
    { t: "predict", code: c`data = [3, 8, 1, 8, 5]
seen = set()
out = []
for x in data:
    if x not in seen:
        seen.add(x)
        out.append(x * 2)
print(out, len(seen))`, explain: "<code>[6, 16, 2, 10] 4</code>" },
    { t: "predict", code: c`stock = {"pen": 3, "book": 0, "bag": 2}
for item, n in stock.items():
    if n == 0:
        continue
    print(item * n)`, explain: "<code>penpenpen</code> then <code>bagbag</code>; the book is skipped." },
    { t: "parsons", title: "Longest word", prompt: "Find the longest word of a sentence.", lines: [c`words = "loops make programs powerful".split()`, "longest = words[0]", "for w in words:", "    if len(w) > len(longest):", "        longest = w", "print(longest)"], explain: "The champion pattern again: <code>powerful</code>." },
  ],
  exercises: [
    { id: "game", lvl: "star", title: "Project 1: Guessing game with a limit", prompt: "<p>Secret = <code>37</code>, 5 tries max. After each wrong guess print <code>Too low</code> / <code>Too high</code> and <code>N tries left</code>. If guessed: <code>You win in N tries!</code>. If tries run out: <code>Game over. It was 37</code>. Guesses outside 1–100 print <code>Out of range</code> and do <b>not</b> use a try.</p>", starter: "secret = 37\nmax_tries = 5\n", tests: [{ stdin: "50\n25\n37", expected: "Too high\n4 tries left\nToo low\n3 tries left\nYou win in 3 tries!" }, { stdin: "150\n50\n40\n30\n35\n36", expected: "Out of range\nToo high\n4 tries left\nToo high\n3 tries left\nToo low\n2 tries left\nToo low\n1 tries left\nToo low\n0 tries left\nGame over. It was 37" }],
      solutions: [{ name: "while with counter", code: c`secret = 37
max_tries = 5
tries = 0
won = False
while tries < max_tries:
    guess = int(input())
    if not 1 <= guess <= 100:
        print("Out of range")
        continue
    tries += 1
    if guess == secret:
        print(f"You win in {tries} tries!")
        won = True
        break
    print("Too low" if guess < secret else "Too high")
    print(f"{max_tries - tries} tries left")
if not won:
    print("Game over. It was", secret)` }, { name: "while-else", code: c`secret = 37
max_tries = 5
tries = 0
while tries < max_tries:
    guess = int(input())
    if not 1 <= guess <= 100:
        print("Out of range")
        continue
    tries += 1
    if guess == secret:
        print(f"You win in {tries} tries!")
        break
    print("Too low" if guess < secret else "Too high")
    print(f"{max_tries - tries} tries left")
else:
    print("Game over. It was", secret)`, note: "The <code>else</code> of a loop runs only if the loop ended without <code>break</code> — no flag needed." }],
      twist: "Play it for real in the Playground with <code>random.randint(1, 100)</code> and 7 tries. Strategy: always guess the middle of the remaining range (binary search — you will study it in Week 4)." },
    { id: "quiz", lvl: "star", title: "Project 2: Quiz engine", prompt: "<p>Using the starter data, ask each question, compare answers ignoring case and spaces, print <code>✓</code> or <code>✗ answer</code>, and finally <code>Score: X/N</code> and a message: <code>Excellent</code> (all correct), <code>Good</code> (at least half), else <code>Keep practicing</code>.</p>", starter: c`quiz = [
    {"q": "Keyword to define a function?", "a": "def"},
    {"q": "Type of 3.5?", "a": "float"},
    {"q": "len('Py30')?", "a": "4"},
    {"q": "Method to add to a list?", "a": "append"},
]
`, tests: [{ stdin: "def\nFloat\n5\n append ", expected: "✓\n✓\n✗ 4\n✓\nScore: 3/4\nGood" }, { stdin: "def\nfloat\n4\nappend", expected: "✓\n✓\n✓\n✓\nScore: 4/4\nExcellent" }, { stdin: "x\ny\nz\nw", expected: "✗ def\n✗ float\n✗ 4\n✗ append\nScore: 0/4\nKeep practicing" }],
      solutions: [{ name: "Loop over dicts", code: c`quiz = [
    {"q": "Keyword to define a function?", "a": "def"},
    {"q": "Type of 3.5?", "a": "float"},
    {"q": "len('Py30')?", "a": "4"},
    {"q": "Method to add to a list?", "a": "append"},
]
score = 0
for item in quiz:
    ans = input(item["q"] + " ").strip().lower()
    if ans == item["a"]:
        score += 1
        print("✓")
    else:
        print("✗", item["a"])
n = len(quiz)
print(f"Score: {score}/{n}")
if score == n:
    print("Excellent")
elif score >= n / 2:
    print("Good")
else:
    print("Keep practicing")` }] },
    { id: "analyzer", lvl: "fire", title: "Project 3: Text analyzer", prompt: "<p>Read a paragraph (one line). Remove the punctuation <code>.,!?</code>, make it lowercase, and print:</p><pre class=\"code-static\">Words: 10\nUnique: 7\nLongest: programming\nTop: python (3)</pre><p>Longest = first longest word; Top = most frequent word (first one if tied).</p>", tests: [{ stdin: "Python is fun. Python is powerful! Programming in Python, anyone?", expected: "Words: 10\nUnique: 7\nLongest: programming\nTop: python (3)" }],
      solutions: [{ name: "Step by step", code: c`text = input().lower()
for p in ".,!?":
    text = text.replace(p, "")
words = text.split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
top = max(counts, key=counts.get)
print("Words:", len(words))
print("Unique:", len(counts))
print("Longest:", longest)
print(f"Top: {top} ({counts[top]})")` }, { name: "Built-ins", code: c`from collections import Counter
text = input().lower()
for p in ".,!?":
    text = text.replace(p, "")
words = text.split()
top, n = Counter(words).most_common(1)[0]
print("Words:", len(words))
print("Unique:", len(set(words)))
print("Longest:", max(words, key=len))
print(f"Top: {top} ({n})")` }] },
    { id: "matrix", lvl: "fire", title: "Seat map", prompt: "<p>A classroom has 3 rows × 4 seats. Read taken seats as <code>row,col</code> (1-based) until <code>end</code>, then draw the map with <code>X</code> for taken and <code>.</code> for free, then <code>Free: N</code>.</p><pre class=\"code-static\">Input: 1,1  2,3  3,4  end\nX...\n..X.\n...X\nFree: 9</pre>", tests: [{ stdin: "1,1\n2,3\n3,4\nend", expected: "X...\n..X.\n...X\nFree: 9" }, { stdin: "end", expected: "....\n....\n....\nFree: 12" }],
      solutions: [{ name: "List of lists", code: c`seats = [["." for _ in range(4)] for _ in range(3)]
while True:
    line = input()
    if line == "end":
        break
    r, c = line.split(",")
    seats[int(r) - 1][int(c) - 1] = "X"
free = 0
for row in seats:
    print("".join(row))
    free += row.count(".")
print("Free:", free)`, note: "A 2D grid is a list of lists: <code>seats[row][col]</code>. Games like tic-tac-toe and chess use exactly this." }, { name: "Set of tuples", code: c`taken = set()
while True:
    line = input()
    if line == "end":
        break
    r, c = map(int, line.split(","))
    taken.add((r, c))
for r in range(1, 4):
    print("".join("X" if (r, c) in taken else "." for c in range(1, 5)))
print("Free:", 12 - len(taken))` }] },
    { id: "hunt2", lvl: "fire", debug: true, title: "Week 2 bug hunt", prompt: "<p>Print the names of students whose average is at least 80, in order: expected <code>Sara 91.0</code> and <code>Lina 85.0</code>. Three bugs.</p>", starter: c`students = {"Sara": [90, 92], "Omar": [70, 75], "Lina": [80, 90]}
for name, marks in students:
    total = 0
    for m in range(marks):
        total += m
    avg = total / len(marks)
    if avg > 80:
        print(name, avg)`, tests: [{ expected: "Sara 91.0\nLina 85.0" }],
      ar: "انتبه{{g:|ي}} لـ items() و range() وشرط 'على الأقل'.",
      solutions: [{ name: "Fixed", code: c`students = {"Sara": [90, 92], "Omar": [70, 75], "Lina": [80, 90]}
for name, marks in students.items():
    total = 0
    for m in marks:
        total += m
    avg = total / len(marks)
    if avg >= 80:
        print(name, avg)`, note: "The bugs: loop over <code>.items()</code> to get name and marks, loop over the list itself (not <code>range</code>), and use <code>&gt;=</code> for \"at least\" — otherwise Lina's 85.0 would pass but an exact 80 would not." }] },
  ],
  quiz: [
    { q: "Best structure for 100 quiz questions with answers?", o: ["100 variables", "A list of dicts", "One long string", "A set"], a: 1, e: "Data + one loop." },
    { q: "`[[0] * 3 for _ in range(2)]` is…", o: ["`[0, 0, 0, 0, 0, 0]`", "`[[0, 0, 0], [0, 0, 0]]`", "`[[0, 0], [0, 0], [0, 0]]`", "An error"], a: 1, e: "2 rows of 3." },
    { q: "Which removes duplicates but keeps order?", o: ["`set(lst)`", "`sorted(lst)`", "`list(dict.fromkeys(lst))`", "`lst.unique()`"], a: 2, e: "Dicts keep insertion order." },
    { q: "`for i in range(len(names)):` is most useful when…", o: ["you need the index", "never", "always", "names is a dict"], a: 0, e: "Otherwise `for name in names` is cleaner (or `enumerate`)." },
    { q: "The `else` of a `while` loop runs when…", o: ["always", "the loop ended without break", "after break", "never"], a: 1, e: "Handy for search loops." },
  ],
  puzzle: { title: "Robot walk", q: "<p>A robot starts at (0, 0) and follows the moves <code>UURDDLLL</code> (U: y+1, D: y−1, R: x+1, L: x−1). Where does it end? Answer as <code>x,y</code>.</p>", code: c`moves = {"U": (0, 1), "D": (0, -1), "R": (1, 0), "L": (-1, 0)}
x = y = 0
for m in "UURDDLLL":
    dx, dy = moves[m]
    x, y = x + dx, y + dy
print(f"{x},{y}")`, answers: ["-2,0"], hint: "Count: U twice, D twice → y back to 0. R once, L three times.", ar: "احسب{{g:|ي}} الحركات الأفقية والرأسية بشكل منفصل.", e: "y: +2 −2 = 0. x: +1 −3 = −2. Answer <code>-2,0</code>. A dictionary of directions is a classic trick in game programming." },
  cards: [
    { f: "Data-driven design", b: "Store items as data (list of dicts); one loop processes them all." },
    { f: "2D grid in Python", b: "List of lists: `grid[row][col]`." },
    { f: "Loop `else`", b: "Runs when the loop finishes without `break`." },
  ],
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[8] = {
  title: "while loops: repeat until done",
  intro: "Welcome to Week 2, {{name}}. Until now every line ran at most once. Today your programs learn to <b>repeat</b> — keep asking until the answer is valid, keep counting until a goal, keep playing until the player wins. Loops are where programs start doing real work.",
  introAr: "الحلقات تجعل البرنامج يكرر الأوامر. اليوم نتعلم while: تكرار طالما الشرط صحيح. أهم شيء: يجب أن يتغير شيء داخل الحلقة حتى تتوقف يومًا ما!",
  goals: ["Write `while` loops that stop correctly", "Use counters and accumulators (running totals)", "Read input until a stop value (sentinel)", "Validate input by asking again", "Use `break` and `continue`"],
  learn: [
    { t: "h", text: "Why programs need to repeat" },
    { t: "p", html: "<p>So far every line of your programs ran <b>at most once</b>. An <code>if</code> can skip lines, but it can never go back and do something again. Real programs repeat all the time: a cashier scans item after item until the basket is empty, a login screen keeps asking until the password is right, and a game keeps going until someone wins. Writing the same line 100 times is not an option, so Python gives us <b>loops</b>: a way to say <i>\"do this again\"</i>.</p>" },
    { t: "analogy", title: "Eating a plate of kabsa", html: "<p><i>While there is rice on the plate: take a spoon.</i> Before every spoon you check one question: is there still rice? Each spoon <b>changes the situation</b> (less rice), so one day the answer becomes \"no\" and you stop. If the rice never got less, you would eat forever. A loop whose condition never changes never stops: that is called an <b>infinite loop</b>.</p>" },
    { t: "ar", html: "الحلقة (loop) تجعل البرنامج يكرر أسطرًا بدل كتابتها مرات كثيرة. التكرار يستمر طالما الجواب على سؤال معين \"نعم\"، ولا بد أن يتغير شيء في كل مرة حتى يتوقف التكرار يومًا ما." },

    { t: "h", text: "while: an if that repeats" },
    { t: "p", html: "<p>A <code>while</code> loop looks exactly like an <code>if</code>: the word <code>while</code>, a condition, a colon <code>:</code>, and an indented block. The difference is what happens <b>after</b> the block: an <code>if</code> moves on, but a <code>while</code> <b>jumps back up</b> and asks the question again. It keeps doing that until the answer is <code>False</code>.</p>" },
    { t: "viz", code: c`count = 1
while count <= 3:
    print("Round", count)
    count = count + 1
print("Done!")`, before: "<p>Press Visualize and click Next ▶ slowly. Watch the arrow jump from line 4 <b>back to line 2</b> every time.</p>", note: "<p>Line by line:</p><ul><li><code>count = 1</code> sets the starting value.</li><li>Line 2 asks: is <code>1 &lt;= 3</code>? True, so Python enters the block.</li><li>Line 3 prints <code>Round 1</code>, line 4 makes <code>count</code> 2, and Python <b>goes back to line 2</b>.</li><li>The same happens for 2 and 3. After <code>Round 3</code>, <code>count</code> becomes 4.</li><li>Now <code>4 &lt;= 3</code> is False, so Python skips the block and continues with line 5: <code>Done!</code>.</li></ul><p>One full pass through the block is called an <b>iteration</b> (or a round). This loop did 3 iterations, and checked the condition 4 times: the last check is the one that said stop.</p>" },
    { t: "ar", html: "while مثل if لكنها ترجع لأعلى بعد تنفيذ الكتلة وتسأل الشرط من جديد، وتتوقف عندما يصبح الشرط False. السطر غير المزاح بعد الحلقة يُنفذ مرة واحدة فقط بعد انتهائها." },
    { t: "predict", code: c`i = 10
while i > 0:
    print(i)
    i = i - 4
print("end", i)`, explain: "<code>i</code> goes 10 → 6 → 2 → -2. The values 10, 6 and 2 are printed. When <code>i</code> is -2, <code>-2 &gt; 0</code> is False, the loop ends, and the last line prints <code>end -2</code>. Notice the final value is <b>past</b> the limit: the loop only stops when it checks." },

    { t: "h", text: "The three parts of every while loop" },
    { t: "p", html: "<p>Every working <code>while</code> loop has three parts. Forget one and the loop either never starts or never stops:</p><ul><li><b>Start</b>: a variable gets its first value <b>before</b> the loop (<code>n = 5</code>).</li><li><b>Condition</b>: the question asked before each round (<code>n &gt; 0</code>).</li><li><b>Update</b>: a line <b>inside</b> the loop that moves the variable towards stopping (<code>n -= 1</code>).</li></ul>" },
    { t: "code", code: c`n = 5
while n > 0:
    print(n, "...")
    n -= 1
print("Launch!")`, before: "<p>A rocket countdown. Find the start, the condition and the update, then run it. Try changing <code>n = 5</code> to <code>n = 10</code>.</p>", note: "<p>Line by line:</p><ul><li><b>Start</b>: <code>n = 5</code>.</li><li><b>Condition</b>: <code>n &gt; 0</code> is checked before every round.</li><li><b>Update</b>: <code>n -= 1</code> is the shortcut from Day 2 for <code>n = n - 1</code>. Each round, <code>n</code> gets one smaller: 5, 4, 3, 2, 1, 0.</li><li>When <code>n</code> is 0, <code>0 &gt; 0</code> is False, so the loop ends and <code>Launch!</code> prints once, because it is <b>not indented</b>.</li></ul><p>If you deleted line 4, <code>n</code> would stay 5 forever and the condition would always be True: an infinite loop. Py30 stops such a program after a few seconds; in a normal Python window you press <b>Ctrl + C</b> to stop it.</p>" },
    { t: "tip", title: "The update must point the right way", html: "<p>Counting down with <code>n += 1</code> instead of <code>n -= 1</code> is also an infinite loop: <code>n</code> grows 5, 6, 7… and is always greater than 0. Ask yourself: <i>does my update bring the condition closer to False?</i></p>" },
    { t: "ar", html: "كل حلقة while تحتاج ثلاثة أشياء: قيمة بداية قبل الحلقة، وشرط، وتحديث داخل الحلقة يقرّبها من التوقف. لو نسيت{{g:|ِ}} التحديث أو جعلته في الاتجاه الخطأ، لن تتوقف الحلقة أبدًا." },

    { t: "h", text: "Counters: how many times?" },
    { t: "p", html: "<p>A <b>counter</b> is a variable that counts how many times something happened. It starts at <code>0</code> before the loop, and you add 1 each time the thing happens. You already used one: <code>count</code> above counted the rounds. Counters get interesting when you only count <b>some</b> rounds, using an <code>if</code> inside the loop.</p>" },
    { t: "code", code: c`n = 1
found = 0
while n <= 50:
    if n % 7 == 0:
        found += 1
    n += 1
print("Multiples of 7 up to 50:", found)`, before: "<p>How many numbers from 1 to 50 can be divided by 7? Guess first, then run it. Change 50 to 100 and run again.</p>", note: "<p>Line by line:</p><ul><li><code>n</code> walks through 1, 2, 3 … 50. It is the loop's own counter: start, condition, update.</li><li><code>found = 0</code> is a second counter. It starts at 0 because before we look, we have found nothing.</li><li>Inside the loop, <code>n % 7 == 0</code> (the remainder trick from Day 3) is True only for 7, 14, 21, 28, 35, 42, 49. Only then <code>found += 1</code> runs.</li><li><code>n += 1</code> is <b>outside</b> the <code>if</code> but <b>inside</b> the loop (4 spaces, not 8), so it runs every round. If you indented it under the <code>if</code>, <code>n</code> would get stuck at 1 and the loop would never end.</li></ul><p>Output: <code>Multiples of 7 up to 50: 7</code>.</p>" },
    { t: "ar", html: "العدّاد يبدأ بصفر قبل الحلقة ويزيد بواحد كلما حدث الشيء الذي نعدّه. انتبه{{g:|ي}} للإزاحة: تحديث متغير الحلقة يجب أن يكون داخل الحلقة وخارج الـ if حتى يُنفذ في كل دورة." },

    { t: "h", text: "Accumulators: running totals" },
    { t: "p", html: "<p>An <b>accumulator</b> collects a result step by step, like a shopping bill that grows with every item. It is a variable that starts at <code>0</code> <b>before</b> the loop, and each round adds something to it.</p>" },
    { t: "analogy", title: "A piggy bank", html: "<p>Your piggy bank starts empty (<code>total = 0</code>). Every day you drop in some coins (<code>total += coins</code>). You don't buy a new, empty piggy bank every morning, or you would lose everything you saved. That is exactly what happens if you write <code>total = 0</code> <b>inside</b> the loop.</p>" },
    { t: "code", code: c`total = 0
n = 1
while n <= 100:
    total += n
    n += 1
print("1 + 2 + ... + 100 =", total)`, before: "<p>Adding all numbers from 1 to 100 by hand takes a long time. The loop does it instantly. Run it, then change 100 to 10 and check the answer in your head (it should be 55).</p>", note: "<p>Line by line:</p><ul><li><code>total = 0</code>: the accumulator, empty at the start.</li><li><code>n</code> is the counter that walks from 1 to 100.</li><li><code>total += n</code> adds the current number. After round 1 total is 1, after round 2 it is 3 (1+2), after round 3 it is 6 (1+2+3), and so on.</li><li><code>n += 1</code> moves to the next number.</li><li>The <code>print</code> is outside the loop, so it shows only the <b>final</b> total: <code>5050</code>.</li></ul><p>Two roles to remember: the <b>counter</b> (<code>n</code>) says where we are; the <b>accumulator</b> (<code>total</code>) holds the answer we are building.</p>" },
    { t: "ar", html: "المُجمِّع (accumulator) متغير يبدأ بصفر <b>قبل</b> الحلقة ونضيف إليه في كل دورة. الخطأ الشائع: كتابة total = 0 داخل الحلقة، فيرجع المجموع لصفر في كل دورة." },
    { t: "predict", code: c`total = 0
n = 1
while n <= 4:
    total += n * 2
    n += 1
print(total)`, explain: "The loop adds <code>n * 2</code> for n = 1, 2, 3, 4: that is 2 + 4 + 6 + 8 = <code>20</code>. Only the final value is printed, because <code>print</code> is outside the loop." },

    { t: "h", text: "Taking a number apart, digit by digit" },
    { t: "p", html: "<p>On Day 3 you learned two tricks: <code>n % 10</code> gives the <b>last digit</b> of a number, and <code>n // 10</code> <b>removes</b> the last digit. Without a loop you could only use them a fixed number of times. With a loop, you can repeat them until no digits are left, so they work for numbers of <b>any</b> length.</p>" },
    { t: "code", code: c`n = 472
while n > 0:
    print("last digit:", n % 10)
    n = n // 10
print("no digits left, n is", n)`, before: "<p>Run it, then try a longer number like <code>90417</code>.</p>", note: "<p>Line by line with 472:</p><ul><li>Round 1: <code>472 % 10</code> is <code>2</code>, printed. Then <code>472 // 10</code> is <code>47</code>.</li><li>Round 2: <code>47 % 10</code> is <code>7</code>. Then <code>n</code> becomes <code>4</code>.</li><li>Round 3: <code>4 % 10</code> is <code>4</code>. Then <code>4 // 10</code> is <code>0</code>.</li><li>Now <code>0 &gt; 0</code> is False, so the loop stops.</li></ul><p>The digits come out <b>from right to left</b>: 2, 7, 4. The update here is <code>n = n // 10</code> (you can also write <code>n //= 10</code>): every round removes one digit, so <code>n</code> always reaches 0 and the loop always ends. Add an accumulator and you can sum the digits, or a counter and you can count them.</p>" },
    { t: "ar", html: "مع الحلقة نكرر n % 10 لأخذ آخر رقم، و n // 10 لحذفه، حتى يصبح n صفرًا. هكذا نتعامل مع أرقام بأي طول. الأرقام تخرج من اليمين إلى اليسار." },

    { t: "h", text: "Keep reading until the user says stop" },
    { t: "p", html: "<p>Often you don't know how many values the user will type: a cashier doesn't know how many items are in the basket. A common solution is a <b>sentinel</b>: a special value that means \"I am finished\", like <code>0</code> for a price. The loop keeps going while the value is <b>not</b> the sentinel.</p>" },
    { t: "code", code: c`total = 0
price = float(input("Price (0 to finish): "))
while price != 0:
    total += price
    price = float(input("Price (0 to finish): "))
print(f"Total: {total:.2f} SAR")`, stdin: "12.5\n30\n7.5\n0", before: "<p>The Input box already has four lines: 12.5, 30, 7.5 and 0. Run it, then add more prices before the 0.</p>", note: "<p>Line by line:</p><ul><li>Line 2 reads the <b>first</b> price before the loop (12.5), so the condition has something to check.</li><li>Line 3: <code>12.5 != 0</code> is True, so we enter.</li><li>Line 4 adds the price to the accumulator.</li><li>Line 5 reads the <b>next</b> price at the end of the body. This is the update: a new value for the condition to check.</li><li>30 and 7.5 are added the same way. When the user types 0, <code>0 != 0</code> is False and the loop ends. The 0 itself is never added.</li><li>The f-string with <code>:.2f</code> (Day 4) shows two decimals: <code>Total: 50.00 SAR</code>.</li></ul><p>Remember the shape: <b>read once before the loop, and read again at the end of the loop body</b>.</p>" },
    { t: "ar", html: "قيمة الحارس (sentinel) قيمة خاصة تعني \"توقف\"، مثل 0. النمط: نقرأ أول قيمة قبل الحلقة، ثم نقرأ القيمة التالية في آخر جسم الحلقة. لا تنس{{g:|ي}} القراءة داخل الحلقة وإلا لن تتوقف." },

    { t: "h", text: "Ask again until the answer is valid" },
    { t: "p", html: "<p>Users make mistakes: they type <code>-5</code> as their age or <code>300</code> as a mark. Instead of accepting bad data, a good program <b>asks again</b>. This is called <b>input validation</b>, and it is the same shape as the sentinel loop: the condition describes a <b>bad</b> answer, and the loop repeats while the answer is bad.</p>" },
    { t: "code", code: c`age = int(input("Your age (1-120): "))
while age < 1 or age > 120:
    print("That is not a valid age, try again.")
    age = int(input("Your age (1-120): "))
print("Thanks! Age saved:", age)`, stdin: "-5\n300\n19", before: "<p>The Input box contains a bad age, another bad age, then a good one. Run it and count how many times you see the warning.</p>", note: "<p>Line by line:</p><ul><li>Line 1 reads <code>-5</code>.</li><li>Line 2 asks: is the age <b>bad</b>? <code>-5 &lt; 1</code> is True, and with <code>or</code> one True part is enough (Day 5), so we enter the loop.</li><li>Lines 3–4 print a warning and ask again. Now age is <code>300</code>: <code>300 &gt; 120</code> is True, so we go round again.</li><li>Then age is <code>19</code>: both parts are False, the condition is False, and the loop ends.</li></ul><p>The warning appears <b>twice</b>, once per bad answer. If the first answer is already good, the loop body never runs at all: a <code>while</code> can do <b>zero</b> rounds.</p>" },
    { t: "ar", html: "للتحقق من صحة الإدخال: الشرط يصف الإجابة <b>الخاطئة</b>، والحلقة تعيد السؤال طالما الإجابة خاطئة. وإذا كانت أول إجابة صحيحة فلن تُنفذ الحلقة ولا مرة." },

    { t: "h", text: "break: leave the loop right now" },
    { t: "p", html: "<p>Sometimes the best moment to decide \"stop\" is in the <b>middle</b> of the loop, not at the top. <code>break</code> is the emergency exit: when Python reaches it, it leaves the loop <b>immediately</b> and continues with the first line after the loop. It is often used with <code>while True</code>, a loop whose condition is always True, so <code>break</code> is the only way out.</p>" },
    { t: "code", code: c`while True:
    word = input("Say something (or 'quit'): ")
    if word == "quit":
        break
    print("You said:", word.upper())
print("Bye!")`, stdin: "hello\npython\nquit", before: "<p>The Input box has <code>hello</code>, <code>python</code> and <code>quit</code>. Run it, then put <code>quit</code> first and run again.</p>", note: "<p>Line by line:</p><ul><li><code>while True:</code> means \"repeat forever\": the condition can never become False by itself.</li><li>Line 2 reads a word. With <code>hello</code>, the <code>if</code> is False, so line 5 prints <code>You said: HELLO</code> (<code>.upper()</code> from Day 4) and the loop goes round.</li><li>Same for <code>python</code>.</li><li>With <code>quit</code>, the <code>if</code> is True and <code>break</code> runs. Python jumps straight out: line 5 is <b>not</b> run for <code>quit</code>, and the next line is <code>print(\"Bye!\")</code>.</li></ul><p>Compare this with the sentinel loop above: here there is only <b>one</b> <code>input()</code> line, because the reading happens at the top of each round. Many programmers prefer this shape.</p>" },
    { t: "ar", html: "break تخرج من الحلقة فورًا وينتقل البرنامج لأول سطر بعدها. while True حلقة لا تتوقف وحدها، لذلك تحتاج{{g:|ين}} break داخل if حتى تخرج{{g:|ي}} منها." },

    { t: "h", text: "continue: skip to the next round" },
    { t: "p", html: "<p><code>continue</code> is gentler than <code>break</code>. It does not leave the loop; it only skips <b>the rest of this round</b> and jumps back to the top, where the condition is checked again. Use it to ignore values you don't want to process.</p>" },
    { t: "code", code: c`n = 0
while n < 6:
    n += 1
    if n == 3:
        continue
    print(n)
print("finished")`, before: "<p>Which number is missing from the output? Guess, then run it.</p>", note: "<p>Line by line:</p><ul><li>Each round first does <code>n += 1</code>, so <code>n</code> goes 1, 2, 3, 4, 5, 6.</li><li>For 1 and 2, the <code>if</code> is False, so <code>print(n)</code> runs.</li><li>For 3, <code>continue</code> runs: the <code>print</code> is skipped and Python goes back to <code>while n &lt; 6</code>.</li><li>4, 5 and 6 are printed normally. Then <code>6 &lt; 6</code> is False and the loop ends.</li></ul><p>Output: 1, 2, 4, 5, 6, then <code>finished</code>. Notice the update <code>n += 1</code> is <b>before</b> the <code>continue</code>. If it were after it, then at 3 Python would skip the update too, <code>n</code> would stay 3 forever, and you would have an infinite loop.</p>" },
    { t: "ar", html: "continue لا تخرج من الحلقة، بل تتخطى باقي الدورة الحالية وترجع لفحص الشرط. انتبه{{g:|ي}}: ضع{{g:|ي}} التحديث قبل continue وإلا قد تصبح الحلقة لا نهائية." },
    { t: "predict", code: c`i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue
    if i == 7:
        break
    print(i)`, explain: "Even numbers are skipped by <code>continue</code>. 1, 3 and 5 are printed. At 7, <code>break</code> ends the loop before the print. Output: <code>1</code>, <code>3</code>, <code>5</code> on separate lines." },

    { t: "h", text: "Putting it together: a cafeteria checkout" },
    { t: "code", code: c`total = 0
items = 0
while True:
    price = float(input("Item price (0 to pay): "))
    if price == 0:
        break
    if price < 0:
        print("A price cannot be negative, skipped.")
        continue
    total += price
    items += 1
if total >= 50:
    total = total * 0.9
    print("10% discount applied!")
print(f"{items} items, pay {total:.2f} SAR")`, stdin: "18\n-4\n25\n12\n0", together: true, before: "<p>A small checkout for the university cafeteria. Read the program first and predict the final line for the prices in the Input box (18, -4, 25, 12, then 0). Then run it and try your own prices.</p>", note: "<p>How it works:</p><ul><li>Lines 1–2 prepare an <b>accumulator</b> (<code>total</code>) and a <b>counter</b> (<code>items</code>), both at 0 <b>before</b> the loop.</li><li>Line 3: <code>while True</code> repeats until a <code>break</code>.</li><li>Lines 5–6: <code>0</code> is the <b>sentinel</b>. When the cashier types it, <code>break</code> leaves the loop.</li><li>Lines 7–9: <b>validation</b>. A negative price prints a warning, and <code>continue</code> skips lines 10–11, so the bad price is neither added nor counted.</li><li>Lines 10–11 add the price and count the item.</li><li>Lines 12–14 run once, <b>after</b> the loop (not indented): 50 SAR or more gets 10% off.</li></ul><p>With the given input: 18 is added, -4 is skipped, 25 and 12 are added. Total 55 with 3 items. 55 ≥ 50, so the total becomes 49.5. Last line: <code>3 items, pay 49.50 SAR</code>.</p>" },
    { t: "ar", html: "هذا البرنامج يجمع أفكار اليوم: عدّاد ومُجمِّع يبدآن قبل الحلقة، وحلقة while True تتوقف بـ break عند قيمة الحارس 0، و continue لتجاهل الأسعار الخاطئة. والأسطر بعد الحلقة تُنفذ مرة واحدة فقط." },
  ],
  mistakes: [
    { title: "Forgetting to update the variable", html: "The condition never changes, so the loop never ends (Py30 stops it after a few seconds).", wrong: c`i = 1
while i <= 5:
    print(i)`, right: c`i = 1
while i <= 5:
    print(i)
    i += 1` },
    { title: "Resetting the total inside the loop", html: "Every round starts from zero again.", wrong: c`n = 1
while n <= 3:
    total = 0
    total += n
    n += 1
print(total)   # 3, not 6`, right: c`total = 0
n = 1
while n <= 3:
    total += n
    n += 1
print(total)   # 6`, ar: "المجموع يبدأ بصفر <b>قبل</b> الحلقة وليس داخلها." },
    { title: "Off by one", html: "<code>&lt;</code> vs <code>&lt;=</code> decides whether the last number is included. Always test the first and last round.", wrong: c`i = 1
while i < 10:   # stops at 9
    i += 1`, right: c`i = 1
while i <= 10:  # includes 10
    i += 1` },
  ],
  tricks: [
    { title: "Debug a loop with print", html: "Add a temporary <code>print(i, total)</code> inside the loop to see every round. Or press Visualize." },
    { title: "Digits of any number", html: "With a loop, the <code>% 10</code> / <code>// 10</code> trick from Day 3 works for numbers of any length:", code: c`n = 90417
digits = 0
while n > 0:
    n //= 10
    digits += 1
print(digits)   # 5` },
  ],
  practice: [
    { t: "predict", code: c`i = 10
while i > 0:
    print(i)
    i -= 3`, explain: "10, 7, 4, 1 — then i becomes -2, the condition is False, and the loop ends." },
    { t: "predict", code: c`n = 1
while n < 50:
    n *= 2
print(n)`, explain: "1 → 2 → 4 → 8 → 16 → 32 → 64. The loop checks 64 &lt; 50, stops, and prints <code>64</code>. The final value can go past the limit!" },
    { t: "parsons", title: "Countdown", prompt: "Arrange the lines to print 5, 4, 3, 2, 1 and then <code>Launch!</code>", lines: ["n = 5", "while n > 0:", "    print(n)", "    n -= 1", c`print("Launch!")`], distractors: ["    n += 1", c`    print("Launch!")`], explain: "The update must move toward stopping (<code>n -= 1</code>), and the final message is outside the loop so it prints once." },
    { t: "try", title: "Multiplication table", html: "<p>Change the program so it prints the table of the number in the Input box up to × 12.</p>", code: c`n = int(input("Table of: "))
i = 1
while i <= 10:
    print(n, "x", i, "=", n * i)
    i += 1`, stdin: "7" },
    { t: "predict", code: c`i = 0
while i < 6:
    i += 1
    if i == 3:
        continue
    if i == 5:
        break
    print(i)`, explain: "1, 2 are printed. At 3 <code>continue</code> skips the print. 4 is printed. At 5 <code>break</code> ends the loop. Output: <code>1 2 4</code> on separate lines." },
  ],
  exercises: [
    { id: "count", lvl: "seed", title: "Count to N", prompt: "<p>Read a number N and print the numbers from 1 to N, one per line.</p>", tests: [{ stdin: "3", expected: "1\n2\n3" }, { stdin: "1", expected: "1" }],
      solutions: [{ name: "while", code: c`n = int(input())
i = 1
while i <= n:
    print(i)
    i += 1` }, { name: "Preview: for", code: c`n = int(input())
for i in range(1, n + 1):
    print(i)`, note: "Tomorrow's topic: for counting, <code>for</code> is shorter. <code>while</code> shines when you don't know in advance how many rounds you need." }] },
    { id: "sum", lvl: "seed", title: "Sum until zero", prompt: "<p>Read whole numbers until the user types <code>0</code>. Print their sum.</p><pre class=\"code-static\">Input: 5, 10, -2, 0\nOutput: 13</pre>", tests: [{ stdin: "5\n10\n-2\n0", expected: "13" }, { stdin: "0", expected: "0" }],
      hint: "Read one number before the loop. Inside: add it, then read the next.",
      solutions: [{ name: "Read before and inside", code: c`total = 0
n = int(input())
while n != 0:
    total += n
    n = int(input())
print(total)` }, { name: "while True + break", code: c`total = 0
while True:
    n = int(input())
    if n == 0:
        break
    total += n
print(total)`, note: "Only one <code>input()</code> line. Many programmers prefer this shape." }] },
    { id: "valid", lvl: "star", title: "Valid mark only", prompt: "<p>Keep asking for a mark until it is between 0 and 100. For each invalid mark print <code>Invalid</code>. At the end print <code>Mark: X</code>.</p>", tests: [{ stdin: "105\n-3\n88", expected: "Invalid\nInvalid\nMark: 88" }, { stdin: "0", expected: "Mark: 0" }],
      solutions: [{ name: "Condition loop", code: c`mark = int(input())
while mark < 0 or mark > 100:
    print("Invalid")
    mark = int(input())
print("Mark:", mark)` }, { name: "while True", code: c`while True:
    mark = int(input())
    if 0 <= mark <= 100:
        break
    print("Invalid")
print("Mark:", mark)` }] },
    { id: "digits", lvl: "star", title: "Digit sum of any number", prompt: "<p>Read a positive whole number of any length and print the sum of its digits. (On Day 3 you could only do 3 digits!)</p>", tests: [{ stdin: "472", expected: "13" }, { stdin: "90417", expected: "21" }, { stdin: "5", expected: "5" }],
      solutions: [{ name: "% and //", code: c`n = int(input())
total = 0
while n > 0:
    total += n % 10
    n //= 10
print(total)` }, { name: "As text (preview)", code: c`s = input()
total = 0
for ch in s:
    total += int(ch)
print(total)` }] },
    { id: "guess", lvl: "star", title: "Guess until you win", prompt: "<p>The secret is <code>42</code>. Keep reading guesses. Print <code>Too low</code> or <code>Too high</code> after each wrong guess. When correct, print <code>Correct in N tries!</code>.</p>", starter: "secret = 42\n", tests: [{ stdin: "50\n30\n42", expected: "Too high\nToo low\nCorrect in 3 tries!" }, { stdin: "42", expected: "Correct in 1 tries!" }],
      solutions: [{ name: "Counter + loop", code: c`secret = 42
tries = 0
guess = -1
while guess != secret:
    guess = int(input())
    tries += 1
    if guess < secret:
        print("Too low")
    elif guess > secret:
        print("Too high")
print(f"Correct in {tries} tries!")` }, { name: "while True", code: c`secret = 42
tries = 0
while True:
    guess = int(input())
    tries += 1
    if guess == secret:
        print(f"Correct in {tries} tries!")
        break
    print("Too low" if guess < secret else "Too high")` }],
      twist: "In the Playground: <code>import random</code>, <code>secret = random.randint(1, 100)</code>, and limit the player to 7 tries. Why is 7 always enough if you play smart? (Hint: halve the range each time.)" },
    { id: "double", lvl: "fire", title: "Savings goal", prompt: "<p>{{name}} saves money. Read the starting amount and the goal. Every month the savings grow by 10% and she adds 100 SAR (in that order). Print how many months it takes to reach or pass the goal.</p><pre class=\"code-static\">Input: 1000 then 2000\nOutput: 5</pre>", tests: [{ stdin: "1000\n2000", expected: "5" }, { stdin: "500\n400", expected: "0" }, { stdin: "0\n100", expected: "1" }],
      hint: "The loop runs <b>while</b> the money is below the goal. Count the months.", ar: "لاحظ{{g:|ي}}: لو المبلغ الأولي أكبر من الهدف، الجواب 0 والحلقة لا تعمل أبدًا.",
      solutions: [{ name: "Simulation", code: c`money = float(input())
goal = float(input())
months = 0
while money < goal:
    money = money * 1.1 + 100
    months += 1
print(months)`, note: "This is a <b>simulation</b>: instead of a formula, we let the computer live through each month. Very powerful idea." }] },
    { id: "fix8", lvl: "fire", debug: true, title: "The loop that never ends", prompt: "<p>This program should print the even numbers from 2 to 10 and then their sum (<code>Sum: 30</code>). It runs forever and the sum is wrong. Fix it.</p>", starter: c`n = 2
while n <= 10:
    total = 0
    print(n)
    total += n
n += 2
print("Sum:", total)`, tests: [{ expected: "2\n4\n6\n8\n10\nSum: 30" }],
      ar: "مشكلتان: التحديث خارج الحلقة بسبب الإزاحة، والمجموع يبدأ داخل الحلقة.",
      solutions: [{ name: "Fixed", code: c`n = 2
total = 0
while n <= 10:
    print(n)
    total += n
    n += 2
print("Sum:", total)`, note: "Indentation decides what belongs to the loop. <code>n += 2</code> was outside, so n never changed." }] },
  ],
  quiz: [
    { q: "How many times does this print `Hi`?", code: c`i = 0
while i < 4:
    print("Hi")
    i += 1`, o: ["3", "4", "5", "Forever"], a: 1, e: "i = 0, 1, 2, 3." },
    { q: "What does `break` do?", o: ["Skips one round", "Exits the loop immediately", "Stops the whole program", "Restarts the loop"], a: 1, e: "`continue` skips a round; `break` leaves the loop." },
    { q: "Why is this an infinite loop?", code: c`x = 5
while x > 0:
    print(x)`, o: ["`x` is never changed", "Missing colon", "`print` is wrong", "It is not infinite"], a: 0, e: "Nothing makes the condition False." },
    { q: "What is a sentinel value?", o: ["The first value", "A special value meaning stop", "An error value", "The loop counter"], a: 1, e: "Like typing 0 to finish." },
    { q: "Where should `total = 0` go?", o: ["Inside the loop", "Before the loop", "After the loop", "It doesn't matter"], a: 1, e: "Otherwise it resets every round." },
  ],
  puzzle: { title: "Collatz mystery", q: "<p>Start with n = 6. While n is not 1: if n is even, halve it; if odd, make it 3n + 1. How many steps until n becomes 1?</p>", code: c`n = 6
steps = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps += 1
print(steps)`, answers: ["8"], hint: "Trace by hand: 6 → 3 → 10 → …", ar: "تتبع{{g:|ي}} القيم: 6 ثم 3 ثم 10…", e: "6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1: <b>8</b> steps. Mathematicians believe every starting number reaches 1, but nobody has ever proved it — the Collatz conjecture is a famous unsolved problem!" },
  cards: [
    { f: "Three parts of every while loop?", b: "Start value, condition, and an update inside the loop." },
    { f: "`break` vs `continue`", b: "`break` exits the loop; `continue` jumps to the next round." },
    { f: "Sentinel loop pattern", b: "Read before the loop; process; read again at the end of the body. Or `while True` + `break`." },
    { f: "Accumulator", b: "A variable (e.g. `total = 0`) set before the loop and updated inside it." },
  ],
};
})();

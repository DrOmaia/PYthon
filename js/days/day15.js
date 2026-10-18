window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[15] = {
  title: "Functions: write once, use everywhere",
  intro: "Week 3 is about organizing code like a professional, {{name}}. It starts with the most important idea in programming: the <b>function</b>. You give a piece of code a name, and from then on you can use it with one line — as many times as you want, with different inputs.",
  introAr: "الدالة كود له اسم نكتبه مرة ونستخدمه مرات كثيرة. اليوم نتعلم def والمعاملات و return، والفرق المهم جدًا بين print و return.",
  goals: ["Define functions with `def` and call them", "Pass information in with parameters", "Send results back with `return`", "Explain the difference between `print` and `return`", "Understand local variables (scope)"],
  learn: [
    { t: "h", text: "Why functions?" },
    { t: "p", html: "<p>Imagine you print a nice border around a title in ten places in your program. One day you want a different border — now you must find and change all ten places, and you will probably miss one. A <b>function</b> solves this: you write the code <b>once</b>, give it a <b>name</b>, and from then on you use it with one short line. Change it in one place, and every use changes. You already use functions every day: <code>print()</code>, <code>len()</code>, <code>input()</code> and <code>round()</code> are functions somebody else wrote. Today you write your own.</p>" },
    { t: "analogy", title: "A function is a recipe card", html: "<p>Writing a recipe card (<code>def</code>) doesn't cook anything. Cooking happens each time someone <b>follows</b> the card (the <b>call</b>). The same card works with different ingredients — those are the <b>parameters</b>. And at the end you get a dish you can serve or put in the fridge — that is the <b>return value</b>.</p>" },
    { t: "ar", html: "الدالة كود له اسم: نكتبه مرة واحدة ونستخدمه مرات كثيرة بسطر واحد. وإذا أرد{{g:تَ|تِ}} تعديله فإنك تعدّله في مكان واحد فقط." },

    { t: "h", text: "Your first function: def and calling" },
    { t: "p", html: "<p>A function definition has a fixed shape: the word <code>def</code>, a name you choose, parentheses <code>()</code>, a colon <code>:</code>, and then the indented lines that belong to it — the function's <b>body</b>. It is the same \"colon + indentation\" idea you know from <code>if</code> and <code>for</code>.</p>" },
    { t: "code", code: c`def greet():
    print("Hello!")
    print("Welcome to Week 3")

greet()
greet()`, before: "<p>Run it and count how many times each line is printed. Then delete the last two lines and run again.</p>", note: "<p>Line by line:</p><ul><li><code>def greet():</code> <b>defines</b> a function called <code>greet</code>. Python only <b>remembers</b> the body (lines 2–3) — nothing is printed yet.</li><li>The empty line is just for readability.</li><li><code>greet()</code> <b>calls</b> the function: Python jumps into the body, runs both prints, and comes back.</li><li>The second <code>greet()</code> does it all again.</li></ul><p>So you see the two lines twice. Without the calls, the program prints <b>nothing</b>: a definition alone never runs. And the parentheses matter — <code>greet</code> without <code>()</code> only names the function, it does not call it.</p>" },
    { t: "viz", code: c`def greet():
    print("Hello!")

print("Start")
greet()
print("End")`, before: "<p>Visualize it and press Next ▶ slowly. Watch the arrow jump into the function at the call and jump back afterwards.</p>", note: "<p>Step by step:</p><ul><li>Python reads the <code>def</code> and stores the function, but skips its body.</li><li>Line 4 prints <code>Start</code>.</li><li>Line 5 calls <code>greet()</code>: the arrow jumps <b>up</b> to line 2 and prints <code>Hello!</code>.</li><li>When the body ends, Python returns to where it was and continues with line 6: <code>End</code>.</li></ul><p>Output order: <code>Start</code>, <code>Hello!</code>, <code>End</code>. A call is like a short detour. Also notice the <code>def</code> comes <b>before</b> the call: Python reads top to bottom, so a function must be defined before you use it.</p>" },
    { t: "ar", html: "def تعرّف الدالة فقط ولا تنفذها. التنفيذ يحدث عند الاستدعاء بكتابة الاسم مع القوسين greet(). وانتبه{{g:|ي}}: يجب تعريف الدالة قبل استدعائها." },
    { t: "predict", code: c`def shout():
    print("HEY")

print("one")
shout()
shout()
print("two")`, explain: "The <code>def</code> prints nothing by itself. Then: <code>one</code>, two calls give <code>HEY</code> and <code>HEY</code>, and finally <code>two</code>. Output: <code>one</code>, <code>HEY</code>, <code>HEY</code>, <code>two</code> (one per line)." },

    { t: "h", text: "Parameters: giving the function input" },
    { t: "p", html: "<p>A function that always says the same thing is not very useful. <b>Parameters</b> are variables listed inside the parentheses of the <code>def</code>. When you call the function, you put values in the parentheses — these are the <b>arguments</b> — and each one is stored in its parameter.</p>" },
    { t: "code", code: c`def greet(name, city):
    print(f"Hello {name} from {city}!")

greet("{{name}}", "Riyadh")
greet("Omar", "Jeddah")`, before: "<p>Run it. Then add a third call with your own friend and city.</p>", note: "<p>Line by line:</p><ul><li><code>def greet(name, city):</code> says: this function needs <b>two</b> pieces of information, called <code>name</code> and <code>city</code>.</li><li>In the first call, <code>\"{{name}}\"</code> goes into <code>name</code> and <code>\"Riyadh\"</code> into <code>city</code>, then the f-string prints them.</li><li>In the second call the same body runs with new values: <code>Omar</code> and <code>Jeddah</code>.</li></ul><p>The values are matched <b>by position</b>: first argument → first parameter, second → second. One function, many different results.</p>" },
    { t: "code", code: c`def greet(name, city):
    print(f"Hello {name} from {city}!")

greet("Jeddah", "Omar")
greet(city="Dammam", name="Lina")`, before: "<p>What happens if you mix up the order? And how can you avoid that? Run it and compare the two lines.</p>", note: "<p>Line by line:</p><ul><li><code>greet(\"Jeddah\", \"Omar\")</code> prints <code>Hello Jeddah from Omar!</code>. Python doesn't understand meaning — it matched by position, so the city went into <code>name</code>.</li><li><code>greet(city=\"Dammam\", name=\"Lina\")</code> uses <b>keyword arguments</b>: you write the parameter name, <code>=</code>, and the value. Now the order doesn't matter, and it prints <code>Hello Lina from Dammam!</code>.</li></ul><p>Keyword arguments make calls easier to read, especially when a function has many parameters. You already used one: <code>print(..., end=\"\")</code>.</p>" },
    { t: "code", code: c`def greet(name, city):
    print(f"Hello {name} from {city}!")

greet("Sara")`, expectError: true, before: "<p>This one crashes on purpose. Run it and read the last line of the error.</p>", note: "<p>The error is <code>TypeError: greet() missing 1 required positional argument: 'city'</code>. Read it like a sentence: the function <code>greet()</code> needs two arguments, but we gave only one, so <code>city</code> has no value. Python refuses to guess. The fix is to pass both values: <code>greet(\"Sara\", \"Riyadh\")</code>. Giving too <b>many</b> arguments is also a <code>TypeError</code>.</p>" },
    { t: "ar", html: "المعاملات (parameters) متغيرات بين قوسي def، والقيم التي نرسلها عند الاستدعاء تُخزَّن فيها بالترتيب. يمكن{{g:ك|كِ}} كتابة الاسم city=\"Dammam\" حتى لا يهم الترتيب. وانتبه{{g:|ي}}: عدد القيم يجب أن يساوي عدد المعاملات." },

    { t: "h", text: "return: giving back a result" },
    { t: "p", html: "<p>Many functions don't just <i>do</i> something — they <b>calculate</b> something and give you the answer, like <code>len(\"Riyadh\")</code> gives back <code>6</code>. In your own functions, <code>return</code> sends a value back to the place where the function was called. That place then gets the value, as if the call were replaced by the answer.</p>" },
    { t: "viz", code: c`def area(width, height):
    result = width * height
    return result

room = area(4, 5)
hall = area(10, 3)
print(room + hall)`, before: "<p>Visualize it and press Next ▶ slowly. Watch a new box for <code>area()</code> appear with its own variables, then disappear after it returns.</p>", note: "<p>Step by step:</p><ul><li>Line 5 calls <code>area(4, 5)</code>: a new box opens with <code>width = 4</code> and <code>height = 5</code>.</li><li>Line 2 computes <code>result = 20</code>.</li><li>Line 3, <code>return result</code>, sends 20 back. The box disappears, and <code>area(4, 5)</code> is replaced by <code>20</code>, so <code>room = 20</code>.</li><li>Line 6 does the same with 10 and 3: <code>hall = 30</code>.</li><li>Line 7 prints <code>50</code>.</li></ul><p>The function printed nothing itself; it handed numbers back, and the main program decided what to do with them.</p>" },
    { t: "code", code: c`def area(width, height):
    return width * height

print(area(4, 5))
total = area(4, 5) + area(10, 3)
print("Total:", total)
if area(3, 3) > 8:
    print("Big enough")`, before: "<p>A returned value can be used anywhere a normal value can. Run it and find the three different places where <code>area()</code> is used.</p>", note: "<p>Line by line:</p><ul><li><code>return width * height</code> calculates and returns in one line — no extra variable needed.</li><li><code>print(area(4, 5))</code>: the call becomes <code>20</code>, then print shows it.</li><li><code>area(4, 5) + area(10, 3)</code> becomes <code>20 + 30</code>, so <code>Total: 50</code>.</li><li><code>area(3, 3) &gt; 8</code> becomes <code>9 &gt; 8</code> → True, so <code>Big enough</code> prints.</li></ul><p>This is the power of <code>return</code>: the answer can go into a variable, into a calculation, into a condition, or into another function.</p>" },
    { t: "ar", html: "return ترجع القيمة إلى مكان الاستدعاء، فيصبح الاستدعاء area(4, 5) كأنه القيمة 20 نفسها. يمكن{{g:ك|كِ}} تخزينها في متغير أو استخدامها في حساب أو شرط." },

    { t: "h", text: "print vs return — the #1 beginner confusion" },
    { t: "p", html: "<p><code>print</code> and <code>return</code> can look the same when you test a function, but they are very different. <code>print</code> <b>shows</b> text to the human on the screen — and then the value is gone. <code>return</code> <b>gives</b> the value to the program, so it can keep working with it.</p>" },
    { t: "code", code: c`def double_print(x):
    print(x * 2)

a = double_print(5)
print("a is", a)`, before: "<p>This function <b>prints</b> its answer. Run it and look closely at the second line of output.</p>", note: "<p>Line by line:</p><ul><li><code>double_print(5)</code> runs the body, which prints <code>10</code> on the screen.</li><li>The function has no <code>return</code>, so it gives back the special value <code>None</code>, which means \"nothing\". So <code>a = None</code>.</li><li>The last line prints <code>a is None</code>.</li></ul><p>The 10 appeared on the screen, but the program never got it. If you tried <code>a + 1</code> you would get a <code>TypeError</code>, because you cannot add 1 to nothing.</p>" },
    { t: "code", code: c`def double_return(x):
    return x * 2

b = double_return(5)
print("b is", b)
print(double_return(5) + 1)`, before: "<p>Same idea, but with <code>return</code>. Run it and compare with the previous example.</p>", note: "<p>Line by line:</p><ul><li><code>double_return(5)</code> prints nothing; it <b>returns</b> 10, so <code>b = 10</code>.</li><li><code>print(\"b is\", b)</code> shows <code>b is 10</code>.</li><li><code>double_return(5) + 1</code> becomes <code>10 + 1</code> → <code>11</code>.</li></ul><p>Rule of thumb: a function that <b>calculates</b> should <code>return</code>; let the caller decide whether to print. Most of the exercises check what your function returns, not what it prints.</p>" },
    { t: "table", head: ["", "print", "return"], rows: [["shows on screen", "yes", "no"], ["result can be stored/used", "no (gives None)", "yes"], ["ends the function", "no", "yes"]] },
    { t: "code", code: c`def check(age):
    if age >= 18:
        return "adult"
    return "minor"
    print("never printed")

print(check(20))
print(check(15))`, before: "<p>The last row of the table: <code>return</code> <b>ends</b> the function immediately. Run it and notice which line never appears.</p>", note: "<p>Line by line:</p><ul><li><code>check(20)</code>: <code>20 &gt;= 18</code> is True, so <code>return \"adult\"</code> runs and the function <b>stops right there</b>. Line 4 is not reached.</li><li><code>check(15)</code>: the condition is False, so Python continues to line 4 and returns <code>\"minor\"</code>.</li><li>Line 5 is after a <code>return</code> on the same level, so it can <b>never</b> run.</li></ul><p>Output: <code>adult</code>, <code>minor</code>. Notice we didn't need <code>else</code>: once the first <code>return</code> runs, the rest is skipped anyway.</p>" },
    { t: "ar", html: "print تعرض القيمة على الشاشة فقط ثم تضيع، أما return فترجعها للبرنامج لنخزّنها أو نحسب بها. الدالة التي ليس فيها return ترجع None. و return تنهي الدالة فورًا، فلا يُنفذ أي سطر بعدها." },
    { t: "predict", code: c`def half(n):
    return n / 2
    print("done")

print(half(10) + 1)`, explain: "<code>half(10)</code> returns <code>5.0</code> (the <code>/</code> division always gives a float) and the function ends, so <code>done</code> is never printed. Then <code>5.0 + 1</code> → <code>6.0</code>." },

    { t: "h", text: "Default values" },
    { t: "p", html: "<p>Sometimes a parameter has a value that is right almost every time — like VAT in Saudi Arabia, which is 15%. A <b>default value</b> lets the caller skip that argument: if they don't give it, the default is used.</p>" },
    { t: "code", code: c`def price_with_vat(price, vat=0.15):
    return round(price * (1 + vat), 2)

print(price_with_vat(100))
print(price_with_vat(100, 0.05))
print(price_with_vat(59.99))`, before: "<p>Run it. Then add a call with a VAT of <code>0</code> and predict the result.</p>", note: "<p>Line by line:</p><ul><li><code>vat=0.15</code> in the <code>def</code> gives <code>vat</code> a default.</li><li><code>price_with_vat(100)</code> passes only the price, so <code>vat</code> is 0.15: <code>100 × 1.15</code> → <code>115.0</code>.</li><li><code>price_with_vat(100, 0.05)</code> passes a second value, which <b>replaces</b> the default: <code>105.0</code>.</li><li><code>price_with_vat(59.99)</code> → <code>68.99</code> after rounding to 2 decimals.</li></ul><p>One rule: parameters with defaults must come <b>after</b> the ones without. <code>def f(vat=0.15, price):</code> is a <code>SyntaxError</code>.</p>" },
    { t: "ar", html: "القيمة الافتراضية vat=0.15 تُستخدم إذا لم يرسل المستدعي قيمة، وإذا أرسل قيمة فإنها تحل محلها. وضع{{g:|ي}} المعاملات ذات القيم الافتراضية في النهاية دائمًا." },

    { t: "h", text: "Returning several values" },
    { t: "p", html: "<p>A function can only return <b>one</b> thing — but that thing can be a tuple (Day 11). If you write several values after <code>return</code> separated by commas, Python packs them into a tuple, and you can unpack them into several variables.</p>" },
    { t: "code", code: c`def stats(nums):
    return min(nums), max(nums), sum(nums) / len(nums)

low, high, avg = stats([70, 85, 90])
print(low, high, avg)
print(stats([1, 2]))`, before: "<p>Run it and compare the two printed lines: one shows three separate values, the other shows the tuple itself.</p>", note: "<p>Line by line:</p><ul><li><code>return min(nums), max(nums), sum(nums) / len(nums)</code> returns a tuple of three values: smallest, biggest and average.</li><li><code>low, high, avg = stats(...)</code> <b>unpacks</b> the tuple: the first value goes to <code>low</code>, the second to <code>high</code>, the third to <code>avg</code>. Output: <code>70 90 81.66666666666667</code>.</li><li><code>print(stats([1, 2]))</code> prints the whole tuple: <code>(1, 2, 1.5)</code>.</li></ul><p>The number of variables on the left must match the number of returned values, otherwise you get a <code>ValueError</code>.</p>" },
    { t: "ar", html: "return a, b ترجع tuple، ويمكن{{g:ك|كِ}} فكّها إلى متغيرات: x, y = f(). وانتبه{{g:|ي}} أن يكون عدد المتغيرات مساويًا لعدد القيم المرجعة." },

    { t: "h", text: "Scope: what happens in a function stays in a function" },
    { t: "p", html: "<p>Every call gets its own private box of variables (you saw it in the visualizer). Variables created inside a function — including its parameters — are <b>local</b>: they exist only while the function runs, and the rest of the program cannot see them. This is a feature: two functions can both use a variable called <code>total</code> without breaking each other.</p>" },
    { t: "code", code: c`def calc():
    secret = 42
    return secret + 1

print(calc())
print(secret)`, expectError: true, before: "<p>This example crashes on purpose. Run it, then read the last line of the error message.</p>", note: "<p>Line by line:</p><ul><li><code>print(calc())</code> works: inside the function <code>secret</code> exists, and the function returns <code>43</code>.</li><li>When <code>calc()</code> finished, its box — and <code>secret</code> inside it — disappeared.</li><li><code>print(secret)</code> crashes with <code>NameError: name 'secret' is not defined</code>. A <code>NameError</code> means Python looked for that name and found nothing. Outside the function, <code>secret</code> never existed.</li></ul><p>If you need a value from inside a function, don't reach in for it — <b>return</b> it.</p>" },
    { t: "code", code: c`def calc():
    secret = 42
    return secret + 1

answer = calc()
print(answer)`, before: "<p>The correct way: let the function return the value and store it in a variable outside.</p>", note: "<p>Line by line:</p><ul><li><code>calc()</code> returns <code>43</code>.</li><li><code>answer = calc()</code> stores it in a variable that belongs to the main program.</li><li><code>print(answer)</code> prints <code>43</code> without any error.</li></ul><p>This is the normal flow of information: <b>in</b> through parameters, <b>out</b> through <code>return</code>.</p>" },
    { t: "code", code: c`x = 10

def change():
    x = 99
    print("inside:", x)

change()
print("outside:", x)`, before: "<p>Both the program and the function have a variable called <code>x</code>. Will the function change the outside <code>x</code>? Predict, then run.</p>", note: "<p>Line by line:</p><ul><li><code>x = 10</code> creates an <code>x</code> in the main program.</li><li>Inside <code>change()</code>, <code>x = 99</code> creates a <b>new, local</b> <code>x</code> that only lives in the function. It prints <code>inside: 99</code>.</li><li>Back outside, the original <code>x</code> was never touched: <code>outside: 10</code>.</li></ul><p>Same name, two different boxes. (A function <i>can</i> read an outside variable if it doesn't assign to it, but relying on that makes code hard to follow — pass values as parameters instead.)</p>" },
    { t: "ar", html: "المتغيرات التي تُنشأ داخل الدالة محلية (local): تختفي بعد انتهاء الدالة، ولذلك يظهر NameError إذا استخدمتها خارجها. لإخراج قيمة من الدالة استخدم{{g:|ي}} return وخزّن{{g:|ي}}ها في متغير." },
    { t: "predict", code: c`count = 5

def show():
    count = 1
    return count

print(show(), count)`, explain: "Inside <code>show()</code>, <code>count = 1</code> creates a local variable, and the function returns <code>1</code>. The outside <code>count</code> stays <code>5</code>. Output: <code>1 5</code>." },

    { t: "h", text: "Docstrings and pass" },
    { t: "p", html: "<p>Two small tools that you will see often. A <b>docstring</b> is a string right under the <code>def</code> line that describes what the function does — it is like a comment, but editors and <code>help()</code> can show it. And <code>pass</code> is a placeholder that means \"do nothing\": Python needs at least one line in a body, so <code>pass</code> fills it until you write the real code.</p>" },
    { t: "code", code: c`def bmi(weight, height):
    """Return body mass index from kg and meters."""
    return weight / height ** 2

print(round(bmi(70, 1.75), 1))`, before: "<p>Run it. The docstring changes nothing in the output — it is there for the humans reading the code.</p>", note: "<p>Line by line:</p><ul><li>Line 2 is a string with triple quotes <code>\"\"\"...\"\"\"</code>. Because it is the first line of the body, it becomes the function's docstring. Write in it what the function returns and what units the inputs use.</li><li>Line 3 computes <code>70 / 1.75²</code> = <code>70 / 3.0625</code>.</li><li><code>round(..., 1)</code> gives <code>22.9</code>.</li></ul><p>In a normal Python shell, <code>help(bmi)</code> would print the docstring for you.</p>" },
    { t: "code", code: c`def todo():
    pass

print(todo())`, before: "<p>Many exercise starters look like this. Run it.</p>", note: "<p><code>pass</code> does nothing at all, so <code>todo()</code> runs, reaches the end of its body without a <code>return</code>, and gives back <code>None</code>. That's why the output is <code>None</code>. In the exercises, your job is to <b>replace</b> <code>pass</code> with real code that ends in <code>return ...</code>.</p>" },
    { t: "ar", html: "الـ docstring نص بين علامات تنصيص ثلاثية تحت def يشرح عمل الدالة. و pass تعني \"لا تفعل شيئًا\"، وتُستخدم مكانًا مؤقتًا حتى تكتب{{g:|ي}} الكود الحقيقي، والدالة التي فيها pass فقط ترجع None." },

    { t: "h", text: "Putting it together: a grade report" },
    { t: "code", code: c`def letter(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    return "C or below"

def average(nums, digits=1):
    return round(sum(nums) / len(nums), digits)

marks = {"Sara": [95, 88], "Omar": [72, 80], "Lina": [90, 93]}
for name, scores in marks.items():
    avg = average(scores)
    print(f"{name}: {avg} -> {letter(avg)}")`, together: true, before: "<p>This program uses two small functions to build a report for a class. Read it first and predict each student's letter, then run it. Try changing Lina's marks to <code>[85, 90]</code>.</p>", note: "<p>How it works:</p><ul><li><code>letter(score)</code> takes one parameter and <b>returns</b> a letter. It uses the \"return early\" style: as soon as one <code>return</code> runs, the function ends, so no <code>elif</code> or <code>else</code> is needed.</li><li><code>average(nums, digits=1)</code> returns the rounded average. <code>digits</code> has a default, so we call it with one argument.</li><li>The dictionary (Day 12) maps each name to a list of marks, and <code>.items()</code> gives us each name with its list.</li><li>For each student, <code>average(scores)</code> returns a number, and that number is passed straight into <code>letter(avg)</code> inside the f-string.</li></ul><p>Output: <code>Sara: 91.5 -&gt; A</code>, <code>Omar: 76.0 -&gt; C or below</code>, <code>Lina: 91.5 -&gt; A</code>. Notice that neither function prints: they return values, and the main loop decides how to display them. That is what makes them reusable.</p>" },
    { t: "ar", html: "قسّمنا البرنامج إلى دوال صغيرة، كل دالة تقوم بعمل واحد وترجع نتيجته بـ return، ثم استخدمنا ناتج دالة كمدخل لدالة أخرى letter(avg). الطباعة نتركها للبرنامج الرئيسي." },
  ],
  mistakes: [
    { title: "Printing instead of returning", html: "The function shows the answer but the program can't use it.", wrong: c`def add(a, b):
    print(a + b)
total = add(2, 3) * 10   # TypeError: None * 10`, right: c`def add(a, b):
    return a + b
total = add(2, 3) * 10   # 50` },
    { title: "Forgetting the parentheses when calling", html: "", wrong: c`greet`, right: c`greet()` },
    { title: "Code after return never runs", html: "", wrong: c`def f(x):
    return x * 2
    print("done")   # never printed`, right: c`def f(x):
    print("done")
    return x * 2`, ar: "return تنهي الدالة فورًا، فأي سطر بعدها داخل الدالة لن يُنفذ." },
    { title: "Using the function before defining it", html: "Python reads top to bottom; the <code>def</code> must run first.", wrong: c`print(square(3))
def square(n):
    return n * n`, right: c`def square(n):
    return n * n
print(square(3))` },
  ],
  tricks: [
    { title: "Return early", html: "Handle special cases first and return — no deep nesting.", code: c`def grade(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    return "C or below"` },
    { title: "A function should do one job", html: "If you can't name it clearly in a few words (<code>calculate_total</code>, <code>is_valid_email</code>), it's probably doing too much. Split it." },
  ],
  practice: [
    { t: "predict", code: c`def f(x):
    return x + 1

print(f(f(f(1))))`, explain: "Inside out: f(1)=2, f(2)=3, f(3)=<code>4</code>." },
    { t: "predict", code: c`def show(n):
    print(n)

x = show(7)
print(x)`, explain: "<code>7</code> is printed inside the function, then <code>None</code> because nothing was returned." },
    { t: "parsons", title: "Is it even?", prompt: "Build a function <code>is_even(n)</code> that returns True or False, then use it.", lines: ["def is_even(n):", "    return n % 2 == 0", "", "print(is_even(10))"], distractors: ["    print(n % 2 == 0)"], explain: "The comparison already gives a bool — return it directly." },
    { t: "try", title: "Refactor with a function", html: "<p>The code below repeats itself. Write a function <code>box(text)</code> that prints the border, the text, and the border — then call it three times.</p>", code: c`print("=" * 20)
print("Python")
print("=" * 20)
print("=" * 20)
print("Week 3")
print("=" * 20)` },
  ],
  exercises: [
    { id: "square", lvl: "seed", title: "square(n)", prompt: "<p>Write a function <code>square(n)</code> that <b>returns</b> n × n. The test calls it, so don't read input and don't print.</p>", starter: "def square(n):\n    pass\n", tests: [{ after: "print(square(4))", expected: "16" }, { after: "print(square(-3), square(0))", expected: "9 0" }],
      hint: "Replace <code>pass</code> with <code>return ...</code>.",
      solutions: [{ name: "return", code: c`def square(n):
    return n * n` }, { name: "power", code: c`def square(n):
    return n ** 2` }] },
    { id: "greeting", lvl: "seed", title: "greeting(name, lang)", prompt: "<p>Write <code>greeting(name, lang=\"en\")</code> that returns <code>Hello, NAME!</code> for <code>\"en\"</code> and <code>مرحبا NAME!</code> for <code>\"ar\"</code>.</p>", starter: "def greeting(name, lang=\"en\"):\n    pass\n", tests: [{ after: "print(greeting('Sara'))", expected: "Hello, Sara!" }, { after: "print(greeting('Omar', 'ar'))", expected: "مرحبا Omar!" }],
      solutions: [{ name: "if", code: c`def greeting(name, lang="en"):
    if lang == "ar":
        return f"مرحبا {name}!"
    return f"Hello, {name}!"` }] },
    { id: "maxof", lvl: "star", title: "my_max(numbers)", prompt: "<p>Write <code>my_max(numbers)</code> that returns the biggest number of a list <b>without</b> using <code>max()</code>. For an empty list return <code>None</code>.</p>", starter: "def my_max(numbers):\n    pass\n", tests: [{ after: "print(my_max([3, 9, 2]))", expected: "9" }, { after: "print(my_max([-5, -1, -9]))", expected: "-1" }, { after: "print(my_max([]))", expected: "None" }],
      solutions: [{ name: "Champion", code: c`def my_max(numbers):
    if not numbers:
        return None
    best = numbers[0]
    for n in numbers:
        if n > best:
            best = n
    return best`, note: "<code>if not numbers</code> is True for an empty list — an early return guard." }] },
    { id: "vowels", lvl: "star", title: "count_vowels(text)", prompt: "<p>Return the number of vowels (a e i o u, any case) in <code>text</code>.</p>", starter: "def count_vowels(text):\n    pass\n", tests: [{ after: "print(count_vowels('Artificial Intelligence'))", expected: "10" }, { after: "print(count_vowels('xyz'))", expected: "0" }],
      solutions: [{ name: "Loop", code: c`def count_vowels(text):
    count = 0
    for ch in text.lower():
        if ch in "aeiou":
            count += 1
    return count` }, { name: "sum", code: c`def count_vowels(text):
    return sum(ch in "aeiou" for ch in text.lower())` }] },
    { id: "password", lvl: "star", title: "is_strong(password)", prompt: "<p>Return <code>True</code> if the password has at least 8 characters, at least one digit, at least one uppercase and at least one lowercase letter.</p>", starter: "def is_strong(password):\n    pass\n", tests: [{ after: "print(is_strong('Py30Rocks'))", expected: "True" }, { after: "print(is_strong('py30rocks'))", expected: "False" }, { after: "print(is_strong('Short1A'))", expected: "False" }, { after: "print(is_strong('NODIGITSs'))", expected: "False" }],
      solutions: [{ name: "Flags", code: c`def is_strong(password):
    if len(password) < 8:
        return False
    has_digit = has_upper = has_lower = False
    for ch in password:
        if ch.isdigit():
            has_digit = True
        elif ch.isupper():
            has_upper = True
        elif ch.islower():
            has_lower = True
    return has_digit and has_upper and has_lower` }, { name: "any()", code: c`def is_strong(password):
    return (len(password) >= 8
            and any(ch.isdigit() for ch in password)
            and any(ch.isupper() for ch in password)
            and any(ch.islower() for ch in password))`, note: "<code>any()</code> is True if at least one item is True." }] },
    { id: "compose", lvl: "fire", title: "Functions using functions", prompt: "<p>Write <code>letter(score)</code> (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, else F) and <code>report(scores)</code> that returns a string like <code>\"A:1 B:2 F:1\"</code> — only letters that appear, in the order A B C D F. <code>report</code> must call <code>letter</code>.</p>", starter: "def letter(score):\n    pass\n\ndef report(scores):\n    pass\n", tests: [{ after: "print(letter(85), letter(59))", expected: "B F" }, { after: "print(report([95, 85, 82, 40]))", expected: "A:1 B:2 F:1" }],
      solutions: [{ name: "Dict count", code: c`def letter(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "F"

def report(scores):
    counts = {}
    for s in scores:
        g = letter(s)
        counts[g] = counts.get(g, 0) + 1
    parts = []
    for g in "ABCDF":
        if g in counts:
            parts.append(f"{g}:{counts[g]}")
    return " ".join(parts)` }] },
    { id: "fix15", lvl: "fire", debug: true, title: "The function that forgets", prompt: "<p>Fix <code>average(nums)</code> so that the test prints <code>85.0</code> and <code>True</code>.</p>", starter: c`def average(nums):
    total = 0
    for n in nums:
        total += n
        avg = total / len(nums)
        print(avg)`, tests: [{ after: "a = average([80, 90])\nprint(a)\nprint(average([100]) == 100)", expected: "85.0\nTrue" }],
      ar: "الدالة تطبع ولا ترجع، والحساب داخل الحلقة.",
      solutions: [{ name: "Fixed", code: c`def average(nums):
    total = 0
    for n in nums:
        total += n
    return total / len(nums)` }] },
  ],
  quiz: [
    { q: "What does a function return if it has no `return`?", o: ["0", "`None`", "An error", "The last value"], a: 1, e: "Always None." },
    { q: "What does this print?", code: c`def f(a, b=2):
    return a * b
print(f(3), f(3, 3))`, o: ["`6 9`", "`5 6`", "`3 9`", "Error"], a: 0, e: "Default b=2 unless given." },
    { q: "Which line defines a function?", o: ["`function f():`", "`def f():`", "`f() = def`", "`define f:`"], a: 1, e: "`def`." },
    { q: "A variable created inside a function is…", o: ["global", "local", "shared", "constant"], a: 1, e: "Only exists inside." },
    { q: "`return a, b` returns…", o: ["only a", "a tuple (a, b)", "a list", "an error"], a: 1, e: "Unpack it with `x, y = f()`." },
  ],
  puzzle: { title: "Function chain", q: "<p>What does this print?</p>", code: c`def a(x):
    return x * 2
def b(x):
    return a(x) + 1
def c(x):
    return b(a(x))
print(c(3))`, answers: ["13"], hint: "c(3) = b(a(3)) = b(6).", ar: "ابدأ{{g:|ي}} من الداخل: a(3) أولًا.", e: "a(3)=6, b(6)=a(6)+1=13." },
  cards: [
    { f: "print vs return", b: "print shows text; return gives a value back to the caller (and ends the function)." },
    { f: "Default parameter", b: "`def f(x, vat=0.15):` — used when no value is passed." },
    { f: "What is scope?", b: "Where a variable exists. Variables inside a function are local." },
    { f: "Return two values", b: "`return a, b` then `x, y = f()`." },
  ],
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[4] = {
  title: "Strings and f-strings",
  intro: "Most of the data in the world is text: names, messages, emails, tweets, the prompts you send to an AI. Today you become fluent with strings — cutting them, searching them, cleaning them and formatting beautiful output.",
  introAr: "النصوص في كل مكان: أسماء ورسائل وبيانات. اليوم نتعلم كيف نصل لأي حرف، ونقص أجزاء من النص، ونستخدم دوال النصوص، ونكتب مخرجات مرتبة باستخدام f-strings.",
  goals: ["Get characters by index, including negative indexes", "Slice strings with `[start:stop:step]`", "Use `len()` and methods like `.upper()`, `.strip()`, `.replace()`, `.count()`, `.find()`", "Check membership with `in`", "Format output with f-strings: decimals, commas, alignment"],
  learn: [
    { t: "h", text: "Why text matters" },
    { t: "p", html: "<p>Think of what people type into programs: their name, an email, a password, a message to a chatbot. Almost all of it is <b>text</b>. On Day 2 you met the <code>str</code> type; today you look <b>inside</b> a string. You will learn to grab one letter, cut out a piece, clean messy input, search for a word, and print neat, well-formatted results.</p>" },
    { t: "analogy", title: "A string is a row of numbered lockers", html: "<p>Picture a row of lockers in a university hallway. Each locker holds exactly <b>one character</b> (a letter, a digit, a space, a symbol), and each locker has a number painted on its door. The surprise: the numbering starts at <b>0</b>, not 1. Once you know a locker's number, you can open it directly.</p>" },
    { t: "ar", html: "النص (string) هو صف من الحروف، وكل حرف في خانة لها رقم. اليوم نتعلم كيف نصل لأي حرف، ونقص جزءًا من النص، وننظفه، ونبحث فيه، ونطبعه بشكل مرتب." },

    { t: "h", text: "Indexes: every character has a number" },
    { t: "p", html: "<p>The number of a character's position is called its <b>index</b>. You write the index in square brackets right after the string: <code>word[0]</code>. Each character has <b>two</b> indexes: one counting from the start (0, 1, 2, …) and one counting from the end (-1, -2, …).</p>" },
    { t: "static", code: c` P   y   t   h   o   n
 0   1   2   3   4   5     <- index from the start
-6  -5  -4  -3  -2  -1     <- index from the end` },
    { t: "code", code: c`word = "Python"
print(word[0])
print(word[3])`, before: "<p>Run it and compare the output with the diagram above. Then change <code>3</code> to <code>5</code> and run again.</p>", note: "<p>Line by line:</p><ul><li><code>word = \"Python\"</code> stores a string of 6 characters.</li><li><code>word[0]</code> opens locker 0, the <b>first</b> character → <code>P</code>.</li><li><code>word[3]</code> counts P=0, y=1, t=2, h=3 → <code>h</code>. It is the <b>fourth</b> letter, because counting starts at 0.</li></ul><p>With <code>5</code> you get <code>n</code>, the last letter. The result of <code>word[3]</code> is itself a (very short) string, so you can store it or print it like any other text.</p>" },
    { t: "code", code: c`word = "Python"
print(len(word))
print(word[-1])
print(word[-2])`, before: "<p><code>len()</code> counts the characters. Negative indexes count from the end. Run it and match each line with the diagram.</p>", note: "<p>Line by line:</p><ul><li><code>len(word)</code> → <code>6</code>. Spaces and symbols count too: <code>len(\"CS 101\")</code> is 6.</li><li><code>word[-1]</code> → <code>n</code>, the <b>last</b> character, whatever the length.</li><li><code>word[-2]</code> → <code>o</code>, the second from the end.</li></ul><p>Key fact: a string of length 6 has indexes 0 to <b>5</b>, so the last index is always <code>len(word) - 1</code>. Writing <code>[-1]</code> is just the easy way to say \"the last one\".</p>" },
    { t: "code", code: c`word = "Python"
print(word[6])`, expectError: true, before: "<p>This one crashes on purpose. Run it and read the last line of the error.</p>", note: "<p>Python stops with <code>IndexError: string index out of range</code>. The word has 6 characters, so its indexes go from 0 to 5: locker 6 simply does not exist. Whenever you see this error, check two things: did you forget that counting starts at 0, and is the string shorter than you thought? To get the last character safely, use <code>word[-1]</code>.</p>" },
    { t: "predict", code: c`city = "Dammam"
print(city[1], city[-3], len(city))`, explain: "Indexes: D=0, a=1, m=2, m=3, a=4, m=5. <code>city[1]</code> is <code>a</code>. <code>city[-3]</code> counts m(-1), a(-2), m(-3) → <code>m</code>. The length is <code>6</code>. Output: <code>a m 6</code>." },
    { t: "ar", html: "العد يبدأ من <b>صفر</b> وليس واحد! أول حرف رقمه 0، وآخر حرف رقمه len - 1، ويمكن الوصول له بسهولة بـ [-1]. وانتبه{{g:|ي}}: طلب رقم غير موجود يسبب الخطأ IndexError." },

    { t: "h", text: "Slicing: taking a piece" },
    { t: "p", html: "<p>Often you need more than one character: the first 3 letters of a name for a username, or the last 2 digits of a birth year. A <b>slice</b> cuts out a piece: <code>s[start:stop]</code> gives the characters from <code>start</code> up to, but <b>not including</b>, <code>stop</code>.</p>" },
    { t: "code", code: c`s = "Computer Science"
print(s[0:8])
print(s[9:16])`, before: "<p>Count the positions first: <code>Computer</code> fills indexes 0–7, the space is at 8, and <code>Science</code> fills 9–15. Then run it.</p>", note: "<p>Line by line:</p><ul><li><code>s[0:8]</code> takes indexes 0, 1, …, 7 → <code>Computer</code>. Index 8 (the space) is the stop, so it is <b>not</b> included.</li><li><code>s[9:16]</code> takes indexes 9 to 15 → <code>Science</code>. There is no index 16, but that is fine: a slice's stop may go up to the length.</li></ul><p>A quick way to know the size of a slice: <code>stop - start</code>. Here <code>8 - 0 = 8</code> characters and <code>16 - 9 = 7</code> characters.</p>" },
    { t: "analogy", title: "The stop index is a fence", html: "<p>Think of the indexes as fences <i>between</i> the letters. <code>s[0:8]</code> means \"from fence 0 to fence 8\" — so you get 8 characters, and the character at index 8 is <b>not</b> included. That is why <code>s[:3] + s[3:]</code> always gives back the whole string: the two pieces meet at the same fence.</p>" },
    { t: "code", code: c`s = "Computer Science"
print(s[:3])
print(s[9:])
print(s[:3] + s[3:])`, before: "<p>You may leave out the start or the stop. Predict each line, then run it.</p>", note: "<p>Line by line:</p><ul><li><code>s[:3]</code> has no start, so it begins at the <b>beginning</b> → indexes 0, 1, 2 → <code>Com</code>.</li><li><code>s[9:]</code> has no stop, so it goes to the <b>end</b> → <code>Science</code>.</li><li><code>s[:3] + s[3:]</code> glues <code>Com</code> and <code>puter Science</code> back together → the whole string.</li></ul><p>These two short forms are the ones you will use most: \"the first N characters\" is <code>s[:N]</code> and \"everything from position N\" is <code>s[N:]</code>.</p>" },
    { t: "code", code: c`s = "Computer Science"
print(s[-7:])
print(s[-7:-4])`, before: "<p>Negative indexes work in slices too. They are handy when you care about the <b>end</b> of a string.</p>", note: "<p>Line by line:</p><ul><li><code>s[-7:]</code> starts 7 characters from the end and goes to the end → the last 7 characters, <code>Science</code>.</li><li><code>s[-7:-4]</code> starts at -7 (<code>S</code>) and stops <b>before</b> -4 (the <code>e</code>) → <code>Sci</code>.</li></ul><p>This is how you take the last 2 digits of a year stored as text: <code>year[-2:]</code>. It works for any length, because you count from the end.</p>" },
    { t: "code", code: c`digits = "0123456789"
print(digits[::2])
print(digits[1:8:2])
print(digits[::-1])`, before: "<p>A slice can have a third number, the <b>step</b>: <code>[start:stop:step]</code>. We use digits so you can see exactly which positions are picked.</p>", note: "<p>Line by line:</p><ul><li><code>digits[::2]</code>: from the start to the end, jumping 2 each time → indexes 0, 2, 4, 6, 8 → <code>02468</code> (every second character).</li><li><code>digits[1:8:2]</code>: start at 1, stop before 8, step 2 → indexes 1, 3, 5, 7 → <code>1357</code>.</li><li><code>digits[::-1]</code>: a step of <b>-1</b> walks backwards from the end → <code>9876543210</code>.</li></ul><p><code>[::-1]</code> reverses <b>any</b> string: <code>\"Python\"[::-1]</code> is <code>nohtyP</code>. Remember it — it is the classic way to reverse text in Python.</p>" },
    { t: "predict", code: c`w = "university"
print(w[3:7], w[-4:], w[::-1])`, explain: "Indexes: u0 n1 i2 v3 e4 r5 s6 i7 t8 y9. <code>w[3:7]</code> takes 3, 4, 5, 6 → <code>vers</code>. <code>w[-4:]</code> is the last 4 → <code>sity</code>. <code>w[::-1]</code> reverses → <code>ytisrevinu</code>. Output: <code>vers sity ytisrevinu</code>." },
    { t: "ar", html: "القص s[start:stop] يأخذ من start إلى ما قبل stop، فرقم النهاية <b>لا يدخل</b>. بدون بداية يبدأ من أول النص، وبدون نهاية يذهب لآخره، والخطوة -1 تعكس النص: s[::-1]." },

    { t: "h", text: "String methods: changing case and cleaning" },
    { t: "p", html: "<p>A <b>method</b> is a function that belongs to a value. You call it with a dot: <code>value.method()</code>. Strings come with many useful methods. The first group changes capital letters and removes extra spaces — exactly what you need when users type their names in messy ways.</p>" },
    { t: "code", code: c`msg = "Hello Python World"
print(msg.upper())
print(msg.lower())
print("sara al harbi".title())`, before: "<p>Run it and look at how the capital letters change on each line.</p>", note: "<p>Line by line:</p><ul><li><code>.upper()</code> makes every letter a capital → <code>HELLO PYTHON WORLD</code>.</li><li><code>.lower()</code> makes every letter small → <code>hello python world</code>.</li><li><code>.title()</code> makes the first letter of <b>each word</b> a capital and the rest small → <code>Sara Al Harbi</code>.</li></ul><p>Notice the empty brackets <code>()</code>: they are required, because a method is a function you <b>call</b>. Digits, spaces and symbols are not changed by these methods.</p>" },
    { t: "code", code: c`raw = "   sara ahmed  "
print("[" + raw + "]")
print("[" + raw.strip() + "]")
print(raw.strip().title())`, before: "<p>Spaces are invisible, so we print the text between <code>[</code> and <code>]</code> to see them.</p>", note: "<p>Line by line:</p><ul><li>Line 2 shows the spaces at both ends: <code>[   sara ahmed  ]</code>.</li><li><code>.strip()</code> removes spaces at the <b>start and end</b> only → <code>[sara ahmed]</code>. The space between the two words stays.</li><li>Line 4 <b>chains</b> two methods: <code>raw.strip()</code> gives a clean string, and <code>.title()</code> is called on that result → <code>Sara Ahmed</code>.</li></ul><p>Users often type an extra space by accident, so <code>.strip()</code> is one of the most used methods on input.</p>" },
    { t: "code", code: c`name = "sara"
name.upper()
print(name)
name = name.upper()
print(name)`, before: "<p>An important rule. Predict both prints before you run it.</p>", note: "<p>Line by line:</p><ul><li>Line 2 calls <code>name.upper()</code>, which makes a <b>new</b> string <code>\"SARA\"</code>… and throws it away, because we did not store it.</li><li>Line 3 prints <code>sara</code>: the original did not change.</li><li>Line 4 stores the new string back in <code>name</code>, so line 5 prints <code>SARA</code>.</li></ul><p>Strings are <b>immutable</b>: they can never be changed in place. Methods always <b>return a new string</b>. If you want to keep the result, store it: <code>name = name.upper()</code>.</p>" },
    { t: "ar", html: "الدالة (method) تُستدعى بنقطة وأقواس: <code>name.upper()</code>. النص لا يتغير أبدًا (immutable)، والدالة ترجع نصًا جديدًا، فخزّن{{g:|ي}} النتيجة: <code>name = name.upper()</code>. و strip تحذف المسافات من الطرفين فقط." },

    { t: "h", text: "Search and replace inside text" },
    { t: "p", html: "<p>The second group of methods looks <b>inside</b> the text: replace a word with another, count how many times something appears, or find <b>where</b> it starts.</p>" },
    { t: "code", code: c`msg = "Hello Python World"
print(msg.replace("World", "{{name}}"))
print(msg.count("o"))
print(msg.find("Python"))
print(msg.find("Java"))`, before: "<p>Run it. For the last two lines, count the positions in <code>msg</code> yourself to check the answers.</p>", note: "<p>Line by line:</p><ul><li><code>.replace(\"World\", \"{{name}}\")</code> returns a new string where every <code>World</code> becomes your name. (<code>msg</code> itself is unchanged.)</li><li><code>.count(\"o\")</code> → <code>3</code>: one <code>o</code> in Hello, one in Python, one in World. Capital <code>O</code> would not count.</li><li><code>.find(\"Python\")</code> → <code>6</code>: the index where <code>Python</code> <b>starts</b> (H=0 … the space is 5, P is 6).</li><li><code>.find(\"Java\")</code> → <code>-1</code>, which means \"not found\".</li></ul><p><code>.find()</code> is useful together with slicing: once you know where something starts, you can cut the text there.</p>" },
    { t: "predict", code: c`text = "Mississippi"
print(text.count("s"), text.find("s"), text.replace("ss", "SS"))`, explain: "There are 4 <code>s</code> letters. The first <code>s</code> is at index 2 (M=0, i=1, s=2). <code>replace</code> changes both <code>ss</code> pairs → <code>MiSSiSSippi</code>. Output: <code>4 2 MiSSiSSippi</code>." },
    { t: "ar", html: "replace تستبدل نصًا بآخر، و count تعدّ مرات الظهور، و find ترجع رقم مكان البداية أو -1 إذا لم تجده. وكلها حساسة لحالة الحروف: \"o\" ليست \"O\"." },

    { t: "h", text: "Is it inside? in, startswith, endswith" },
    { t: "p", html: "<p>Sometimes you only need a yes/no answer: does this email contain <code>@</code>? Does it end with <code>.edu.sa</code>? These checks give a <b>boolean</b>, <code>True</code> or <code>False</code>, the type you met on Day 2. Tomorrow you will use such answers to make decisions.</p>" },
    { t: "code", code: c`email = "Sara@PSU.edu.sa"
print("@" in email)
print("gmail" in email)`, before: "<p>The word <code>in</code> asks: \"is the left text found somewhere inside the right text?\"</p>", note: "<p>Line by line:</p><ul><li><code>\"@\" in email</code> → <code>True</code>, because the email contains an <code>@</code>.</li><li><code>\"gmail\" in email</code> → <code>False</code>: that piece of text does not appear anywhere.</li></ul><p>Notice the order: the piece you look for comes <b>first</b>, then <code>in</code>, then the text you search. <code>in</code> works for a single character or a longer piece, like <code>\"PSU\" in email</code>.</p>" },
    { t: "code", code: c`email = "Sara@PSU.edu.sa"
print(email.endswith(".edu.sa"))
print(email.startswith("sara"))
print(email.lower().startswith("sara"))`, before: "<p>These two methods check only the <b>beginning</b> or the <b>end</b>. Look carefully at the capital letters before you run it.</p>", note: "<p>Line by line:</p><ul><li><code>.endswith(\".edu.sa\")</code> → <code>True</code>: the email finishes with that text.</li><li><code>.startswith(\"sara\")</code> → <code>False</code>! The email starts with a capital <code>S</code>, and for Python <code>S</code> and <code>s</code> are different characters.</li><li>The fix is to chain: <code>email.lower()</code> makes <code>sara@psu.edu.sa</code> first, and then <code>.startswith(\"sara\")</code> is <code>True</code>.</li></ul><p>Lowering the text before checking is a common habit, because users type capitals in unpredictable ways.</p>" },
    { t: "ar", html: "in تسأل: هل هذا الجزء موجود داخل النص؟ و startswith و endswith تفحص البداية والنهاية فقط. النتيجة دائمًا True أو False. وانتبه{{g:|ي}} للحروف الكبيرة: استخدم{{g:|ي}} lower() قبل الفحص." },

    { t: "h", text: "f-strings: putting values into text" },
    { t: "p", html: "<p>Until now, to mix text and numbers you used commas in <code>print</code>, or <code>+</code> with <code>str()</code>. Both get messy. An <b>f-string</b> is cleaner: put the letter <code>f</code> before the quotes, and anything inside <code>{ }</code> is calculated and inserted into the text.</p>" },
    { t: "code", code: c`name = "{{name}}"
gpa = 4.6666
print(f"Hi {name}, your GPA is {gpa}")
print(f"Next year you will be {19 + 1}")`, before: "<p>Run it, then remove the <code>f</code> from line 3 and run again to see what changes.</p>", note: "<p>Line by line:</p><ul><li>In line 3, <code>{name}</code> is replaced by the value of <code>name</code> and <code>{gpa}</code> by <code>4.6666</code>. No <code>str()</code> and no <code>+</code> needed, even for a number.</li><li>In line 4, <code>{19 + 1}</code> shows that the braces can hold a calculation: Python works out <code>20</code> and inserts it.</li></ul><p>Without the <code>f</code>, Python prints the braces literally: <code>Hi {name}, your GPA is {gpa}</code>. Forgetting the <code>f</code> is the most common f-string mistake.</p>" },
    { t: "code", code: c`gpa = 4.6666
price = 1500000
print(f"Rounded: {gpa:.2f}")
print(f"Price: {price:,} SAR")`, before: "<p>After the value, inside the braces, you can add a colon and a <b>format</b>. Run it.</p>", note: "<p>Line by line:</p><ul><li><code>{gpa:.2f}</code> means \"show it as a decimal number with exactly <b>2</b> digits after the point\" → <code>4.67</code> (rounded). Try <code>.1f</code> or <code>.3f</code>.</li><li><code>{price:,}</code> adds thousands separators → <code>1,500,000</code>, much easier to read.</li></ul><p>The format changes only how the value is <b>displayed</b>. The variable <code>gpa</code> still holds <code>4.6666</code>. You can also combine both: <code>{price:,.2f}</code> → <code>1,500,000.00</code>.</p>" },
    { t: "code", code: c`name = "{{name}}"
print(f"[{name:>10}]")
print(f"[{name:<10}]")
print(f"[{name:^10}]")`, before: "<p>A number after <code>&gt;</code>, <code>&lt;</code> or <code>^</code> gives the value a fixed width. The brackets let you see the padding spaces.</p>", note: "<p>Each line puts your name in a space <b>10 characters wide</b> and fills the rest with spaces:</p><ul><li><code>&gt;10</code> aligns to the <b>right</b> (spaces on the left).</li><li><code>&lt;10</code> aligns to the <b>left</b> (spaces on the right).</li><li><code>^10</code> <b>centers</b> it (spaces on both sides).</li></ul><p>Think of the arrow as pointing to the side where the text goes. Fixed widths make columns line up, which is how receipts and tables are printed.</p>" },
    { t: "table", head: ["Format", "Meaning", "Example", "Result"], rows: [["`:.2f`", "2 decimal places", "`f\"{3.14159:.2f}\"`", "`3.14`"], ["`:,`", "thousands separators", "`f\"{1500000:,}\"`", "`1,500,000`"], ["`:>8`", "right-align in 8", "`f\"{'hi':>8}\"`", "`      hi`"], ["`:<8`", "left-align in 8", "`f\"{'hi':<8}\"`", "`hi      `"], ["`:^8`", "center in 8", "`f\"{'hi':^8}\"`", "`   hi   `"]] },
    { t: "predict", code: c`price = 7.5
qty = 3
print(f"{qty} x {price:.2f} = {qty * price:.2f} SAR")`, explain: "<code>{qty}</code> → <code>3</code>. <code>{price:.2f}</code> → <code>7.50</code> (two decimals, even though the value is 7.5). The braces can calculate: <code>3 * 7.5</code> is 22.5, shown as <code>22.50</code>. Output: <code>3 x 7.50 = 22.50 SAR</code>." },
    { t: "ar", html: "f-string هي أسهل وأنظف طريقة لدمج النص مع المتغيرات: ضع{{g:|ي}} f قبل علامة التنصيص والمتغير بين { }. لا تحتاج{{g:|ين}} str() ولا علامة +. و .2f لرقمين بعد الفاصلة، و , للفواصل بين الآلاف. وبدون حرف f ستُطبع الأقواس كما هي." },

    { t: "h", text: "Building new strings from pieces" },
    { t: "p", html: "<p>Because every index, slice and method gives back a string, you can combine their results with <code>+</code> to build something new, like initials or a formatted full name.</p>" },
    { t: "viz", code: c`first = "sara"
last = "alqahtani"
initials = first[0].upper() + "." + last[0].upper() + "."
full = first.title() + " " + last.title()
print(initials, full)`, before: "<p>Visualize it and press Next ▶. Watch each new variable appear, while <code>first</code> and <code>last</code> never change.</p>", note: "<p>Line by line:</p><ul><li><code>first[0]</code> is <code>\"s\"</code>, and <code>.upper()</code> on it gives <code>\"S\"</code>. The same for <code>last[0]</code> → <code>\"A\"</code>.</li><li><code>+</code> glues the pieces: <code>\"S\" + \".\" + \"A\" + \".\"</code> → <code>S.A.</code></li><li><code>first.title()</code> → <code>Sara</code>, and with a space and <code>Alqahtani</code> we get the full name.</li><li>The print shows <code>S.A. Sara Alqahtani</code>.</li></ul><p>Notice <code>first[0].upper()</code>: you can call a method directly on the result of an index, because that result is a string too.</p>" },
    { t: "ar", html: "كل فهرسة أو قص أو دالة ترجع نصًا جديدًا، لذلك يمكن دمج النتائج بعلامة + لبناء نص جديد مثل الأحرف الأولى. والمتغيرات الأصلية لا تتغير." },

    { t: "h", text: "Putting it together: a student card" },
    { t: "code", code: c`full = input("Full name: ").strip().title()
email = input("Email: ").strip().lower()
fee = float(input("Fee (SAR): "))
space = full.find(" ")
first = full[:space]
last = full[space + 1:]
initials = first[0] + "." + last[0] + "."
print(f"{'STUDENT CARD':^24}")
print(f"Name:     {full}")
print(f"Initials: {initials}")
print(f"PSU mail: {'psu.edu.sa' in email}")
print(f"Fee:      {fee:,.2f} SAR")`, stdin: "  {{name}} alharbi \nSTUDENT@PSU.EDU.SA\n12500", together: true, before: "<p>This program cleans messy input and prints a neat card, using everything from today. Read it first and guess the output, then run it. Try your own name and email in the Input box.</p>", note: "<p>How it works:</p><ul><li>Lines 1–2 chain methods on <code>input()</code> directly: the typed text is stripped of extra spaces, then fixed with <code>.title()</code> (name) or <code>.lower()</code> (email).</li><li>Line 3 reads the fee as a number with <code>float()</code>, as on Day 3.</li><li>Line 4 uses <code>.find(\" \")</code> to get the index of the first space. Lines 5–6 slice around it: everything <b>before</b> the space is the first name, everything <b>after</b> it (<code>space + 1</code>) is the rest.</li><li>Line 7 builds the initials from index 0 of each part.</li><li>Line 8 centers the title in 24 characters. Inside an f-string written with double quotes, we write the text <code>'STUDENT CARD'</code> with <b>single</b> quotes so the quotes do not clash.</li><li>Line 11 prints the <code>True</code>/<code>False</code> answer of <code>in</code>, and line 12 shows the fee with thousands separators and 2 decimals: <code>12,500.00</code>.</li></ul><p>Small tools, combined in the right order, turn messy input into clean, professional output.</p>" },
    { t: "ar", html: "في هذا البرنامج نظّفنا المدخلات بـ strip و title و lower، ثم استخدمنا find والقص لفصل الاسم الأول عن الأخير، ثم طبعنا كل شيء بشكل مرتب باستخدام f-strings. انتبه{{g:|ي}}: داخل f-string بعلامات \" نكتب النص بعلامات ' مفردة." },
  ],
  mistakes: [
    { title: "Index out of range", html: "A 6-letter word has indexes 0 to 5. Index 6 does not exist.", wrong: c`word = "Python"
print(word[6])`, right: c`word = "Python"
print(word[5])   # or word[-1]` },
    { title: "Trying to change a character", html: "Strings are immutable. Build a new string instead.", wrong: c`word = "Python"
word[0] = "J"`, right: c`word = "Python"
word = "J" + word[1:]
print(word)   # Jython` },
    { title: "Calling a method without saving the result", html: "<code>.upper()</code> returns a new string; the original stays the same.", wrong: c`name = "sara"
name.upper()
print(name)   # still sara`, right: c`name = "sara"
name = name.upper()
print(name)   # SARA`, ar: "دوال النص لا تغيّر النص الأصلي، بل ترجع نصًا جديدًا. خزّن{{g:|ي}} النتيجة في متغير." },
    { title: "Forgetting the f", html: "Without <code>f</code>, the braces are printed literally.", wrong: c`print("Hello {name}")`, right: c`print(f"Hello {name}")` },
  ],
  tricks: [
    { title: "Reverse anything with [::-1]", html: "The step <code>-1</code> walks backwards. Checking a palindrome becomes one line.", code: c`word = "level"
print(word == word[::-1])   # True` },
    { title: "Debug with = in f-strings", html: "<code>f\"{x=}\"</code> prints both the name and the value — great for debugging.", code: c`score = 88
print(f"{score=}")   # score=88` },
    { title: "Chain methods", html: "Each method returns a string, so you can call the next one right away.", code: c`raw = "   hELLo wORLD  "
print(raw.strip().lower().capitalize())   # Hello world` },
  ],
  practice: [
    { t: "predict", code: c`s = "Riyadh"
print(s[1], s[-2], s[2:4])`, explain: "<code>s[1]</code> is <code>i</code>, <code>s[-2]</code> is <code>d</code> (second from the end), and <code>s[2:4]</code> is the characters at 2 and 3: <code>ya</code>." },
    { t: "predict", code: c`t = "Py30"
print(t[::-1])
print(t * 2)
print(len(t + "!"))`, explain: "Reversed: <code>03yP</code>. Repeated: <code>Py30Py30</code>. And the length of <code>\"Py30!\"</code> is <code>5</code>." },
    { t: "try", title: "Name machine", html: "<p>Type a full name in the Input box. Then add lines that print: the name in capitals, the number of letters, the name reversed, and the first 3 letters.</p>", code: c`full_name = input("Full name: ")
print(full_name.upper())
`, stdin: "{{name}} Ahmed" },
    { t: "parsons", title: "Formatted receipt line", prompt: "Build a program that prints <code>Latte ........ 18.50 SAR</code>. The traps use the wrong format.", lines: [c`item = "Latte"`, "price = 18.5", c`print(f"{item} {'.' * 8} {price:.2f} SAR")`], distractors: [c`print("{item} ........ {price} SAR")`, c`print(f"{item} ........ {price:.1f} SAR")`], explain: "An f-string with <code>:.2f</code> shows exactly two decimals. Without the <code>f</code>, the braces are printed as they are." },
    { t: "try", title: "Clean messy data", html: "<p>Real data is messy. Clean this student record so it prints <code>Name: Omar Khalid | Email: omar@psu.edu.sa</code>. Use <code>.strip()</code>, <code>.title()</code> and <code>.lower()</code>.</p>", code: c`name = "   oMAR khaLID "
email = "  OMAR@PSU.EDU.SA"
# clean them here

print(f"Name: {name} | Email: {email}")` },
    { t: "predict", code: c`msg = "banana"
print(msg.count("a"), msg.find("n"), msg.replace("a", "o", 1))`, explain: "There are 3 <code>a</code>s. The first <code>n</code> is at index 2. <code>replace(\"a\", \"o\", 1)</code> replaces only the first occurrence: <code>bonana</code>." },
  ],
  exercises: [
    { id: "shout", lvl: "seed", title: "Shout it", prompt: "<p>Read a word and print it in capital letters.</p><pre class=\"code-static\">Input: python\nOutput: PYTHON</pre>", tests: [{ stdin: "python", expected: "PYTHON" }, { stdin: "Hello there", expected: "HELLO THERE" }],
      solutions: [{ name: ".upper()", code: c`word = input()
print(word.upper())` }, { name: "One line", code: c`print(input().upper())`, note: "Compact — but for beginners, two lines are easier to debug." }] },
    { id: "initials", lvl: "seed", title: "Initials", prompt: "<p>Read a first name and a last name (two lines) and print the initials in capitals with dots.</p><pre class=\"code-static\">Input: sara then alharbi\nOutput: S.A.</pre>", tests: [{ stdin: "sara\nalharbi", expected: "S.A." }, { stdin: "Omar\nKhalid", expected: "O.K." }],
      hint: "<code>first[0]</code> is the first letter. Make it <code>.upper()</code>.",
      solutions: [{ name: "Concatenation", code: c`first = input()
last = input()
print(first[0].upper() + "." + last[0].upper() + ".")` }, { name: "f-string", code: c`first = input()
last = input()
print(f"{first[0]}.{last[0]}.".upper())`, note: "Build the whole string first, then make all of it uppercase at once." }] },
    { id: "username", lvl: "star", title: "Username generator", prompt: "<p>University usernames are made from the <b>first 3 letters of the name in lowercase</b> plus the <b>last 2 digits of the birth year</b>. Read the name and year and print the username.</p><pre class=\"code-static\">Input: Sara then 2004\nOutput: sar04</pre>", tests: [{ stdin: "Sara\n2004", expected: "sar04" }, { stdin: "ABDULLAH\n1999", expected: "abd99" }],
      hint: "Keep the year as a string! Then <code>year[-2:]</code> gives the last two characters.", ar: "لا تحول{{g:|ي}} السنة لرقم هنا؛ خلّها نصًا حتى تستطيع{{g:|ين}} أخذ آخر رقمين بالقص.",
      solutions: [{ name: "Slicing", code: c`name = input()
year = input()
print(name[:3].lower() + year[-2:])` }, { name: "Math for the year", code: c`name = input()
year = int(input())
print(f"{name[:3].lower()}{year % 100:02d}")`, note: "<code>year % 100</code> gives the last two digits as a number; the format <code>:02d</code> keeps a leading zero (for years like 2005 → <code>05</code>)." }] },
    { id: "clean", lvl: "star", title: "Tidy title", prompt: "<p>Read a messy line of text and print it with the spaces at both ends removed and every word capitalized.</p><pre class=\"code-static\">Input:    hello   WORLD  \nOutput: Hello   World</pre>", tests: [{ stdin: "   hello   WORLD  ", expected: "Hello   World" }, { stdin: "introduction to information systems", expected: "Introduction To Information Systems" }],
      solutions: [{ name: "Chained methods", code: c`text = input()
print(text.strip().title())` }] },
    { id: "palin", lvl: "star", title: "Mirror word", prompt: "<p>Read a word and print it reversed, then on a second line print <code>True</code> if it reads the same both ways (a palindrome) and <code>False</code> otherwise. Ignore capital letters.</p><pre class=\"code-static\">Input: Level\nOutput:\nleveL\nTrue</pre>", tests: [{ stdin: "Level", expected: "leveL\nTrue" }, { stdin: "python", expected: "nohtyp\nFalse" }],
      hint: "<code>word[::-1]</code> reverses. Compare <code>word.lower()</code> with its reverse using <code>==</code> — the comparison itself gives True or False.",
      solutions: [{ name: "Slicing", code: c`word = input()
print(word[::-1])
low = word.lower()
print(low == low[::-1])` }, { name: "reversed() + join", code: c`word = input()
print("".join(reversed(word)))
print(word.lower() == "".join(reversed(word.lower())))`, note: "<code>reversed()</code> goes backwards through the characters and <code>\"\".join()</code> glues them. You will meet <code>join</code> again with lists." }] },
    { id: "vowels", lvl: "fire", title: "Vowel counter", prompt: "<p>Read a sentence and print how many vowels (a, e, i, o, u — upper or lower case) it contains. You do not know loops yet — that is fine, <code>.count()</code> is enough!</p><pre class=\"code-static\">Input: Artificial Intelligence\nOutput: 10</pre>", tests: [{ stdin: "Artificial Intelligence", expected: "10" }, { stdin: "Python", expected: "1" }, { stdin: "AEIOU aeiou", expected: "10" }],
      hint: "First make the sentence lowercase, then add up <code>.count(\"a\") + .count(\"e\") + …</code>", ar: "حوّل{{g:|ي}} الجملة لحروف صغيرة أولًا حتى لا تحتاج{{g:|ين}} عدّ A و a بشكل منفصل.",
      solutions: [{ name: "count()", code: c`s = input().lower()
print(s.count("a") + s.count("e") + s.count("i") + s.count("o") + s.count("u"))` }, { name: "Preview: a loop", code: c`s = input().lower()
total = 0
for ch in s:
    if ch in "aeiou":
        total += 1
print(total)`, note: "A look into Week 2: a loop checks every character. More flexible — for example, easy to add more letters." }, { name: "Preview: one-liner", code: c`print(sum(ch in "aeiou" for ch in input().lower()))`, note: "The professional style you will understand by Week 3." }] },
    { id: "bill2", lvl: "fire", title: "Pretty receipt", prompt: "<p>Read an item name, a price and a quantity (three lines). Print a receipt line: the name left-aligned in 12 characters, then the quantity, then the total with 2 decimals.</p><pre class=\"code-static\">Input: Latte, 18.5, 3\nOutput:\nLatte       x3  55.50 SAR</pre><p>Exactly: name padded to 12, then <code>x</code> and the quantity, two spaces, total with 2 decimals, a space and SAR.</p>", tests: [{ stdin: "Latte\n18.5\n3", expected: "Latte       x3  55.50 SAR" }, { stdin: "Croissant\n9\n2", expected: "Croissant   x2  18.00 SAR" }],
      hint: "<code>f\"{item:&lt;12}x{qty}  {total:.2f} SAR\"</code>",
      solutions: [{ name: "f-string formats", code: c`item = input()
price = float(input())
qty = int(input())
total = price * qty
print(f"{item:<12}x{qty}  {total:.2f} SAR")` }, { name: "ljust()", code: c`item = input()
price = float(input())
qty = int(input())
total = price * qty
print(item.ljust(12) + "x" + str(qty) + "  " + format(total, ".2f") + " SAR")`, note: "The same result with string methods. Compare: the f-string version is much easier to read." }] },
    { id: "fix4", lvl: "fire", debug: true, title: "The broken name tag", prompt: "<p>For the input <code>ahmed</code> this program should print:</p><pre class=\"code-static\">Name tag: AHMED (5 letters)\nFirst letter: a</pre><p>Fix the bugs.</p>", starter: c`name = input()
name.upper()
print("Name tag: {name} ({len(name)} letters)")
print("First letter:", name[1])`, tests: [{ stdin: "ahmed", expected: "Name tag: AHMED (5 letters)\nFirst letter: a" }, { stdin: "lina", expected: "Name tag: LINA (4 letters)\nFirst letter: l" }],
      ar: "انتبه{{g:|ي}}: الحرف الأول يجب أن يبقى صغيرًا، فلا تغيّر{{g:|ي}} المتغير الأصلي.",
      solutions: [{ name: "Fixed", code: c`name = input()
tag = name.upper()
print(f"Name tag: {tag} ({len(name)} letters)")
print("First letter:", name[0])`, note: "Three bugs: the result of <code>.upper()</code> was thrown away, the <code>f</code> was missing, and the first index is 0. Saving the uppercase version in a <b>new</b> variable keeps the original for the last line." }] },
  ],
  quiz: [
    { q: "What is `\"Python\"[-2]`?", o: ["`y`", "`o`", "`n`", "`h`"], a: 1, e: "-1 is `n`, -2 is `o`." },
    { q: "What is `\"information\"[2:6]`?", o: ["`form`", "`nfor`", "`forma`", "`info`"], a: 0, e: "Indexes 2, 3, 4, 5 → f, o, r, m." },
    { q: "What does this print?", code: c`s = "hi"
s.upper()
print(s)`, o: ["`HI`", "`hi`", "`Hi`", "An error"], a: 1, e: "The uppercase result was not saved. Strings are immutable." },
    { q: "Which prints `Total: 7.50`?", o: ["`print(\"Total: {7.5:.2f}\")`", "`print(f\"Total: {7.5:.2f}\")`", "`print(f\"Total: {7.5}\")`", "`print(f\"Total: {7.5:2f}\")`"], a: 1, e: "Needs the `f` prefix and the `.2f` format." },
    { q: "What is `len(\"CS 101\")`?", o: ["`5`", "`6`", "`4`", "`7`"], a: 1, e: "C, S, space, 1, 0, 1 — spaces count too." },
    { q: "`\"PSU\" in \"Prince Sultan University (PSU)\"` is…", o: ["`True`", "`False`", "An error", "`3`"], a: 0, e: "`in` checks whether a piece of text appears inside another." },
  ],
  puzzle: { title: "Secret message", q: "<p>A friend sent you a coded message. The rule: <b>reverse the string, then take every second character</b>. What does the code print?</p>", code: c`secret = "Xn*oxhYtFy?P"
print(secret[::-1][::2])`, answers: ["python"], hint: "First reverse it (write it down backwards), then keep characters at positions 0, 2, 4, …", ar: "اعكس{{g:|ي}} النص أولًا، ثم خذ{{g:|ي}} حرفًا وأترك{{g:|ي}} حرفًا.", e: "Reversed: <code>P?yFtYhxo*nX</code>. Keeping every second character (indexes 0, 2, 4, 6, 8, 10) gives <code>P y t h o n</code> → <code>Python</code>. Chaining two slices like this is a neat trick — and a reminder that careful counting beats guessing." },
  cards: [
    { f: "Index of the first and last character?", b: "`s[0]` and `s[-1]`." },
    { f: "What does `s[2:5]` include?", b: "Indexes 2, 3 and 4 — the stop index is not included." },
    { f: "Reverse a string", b: "`s[::-1]`" },
    { f: "Why does `name.upper()` alone not change `name`?", b: "Strings are immutable. Save it: `name = name.upper()`." },
    { f: "f-string with 2 decimals", b: "`f\"{value:.2f}\"`" },
  ],
};
})();

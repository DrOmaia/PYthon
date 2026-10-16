window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[4] = {
  title: "Strings and f-strings",
  intro: "Most of the data in the world is text: names, messages, emails, tweets, the prompts you send to an AI. Today you become fluent with strings — cutting them, searching them, cleaning them and formatting beautiful output.",
  introAr: "النصوص في كل مكان: أسماء ورسائل وبيانات. اليوم نتعلم كيف نصل لأي حرف، ونقص أجزاء من النص، ونستخدم دوال النصوص، ونكتب مخرجات مرتبة باستخدام f-strings.",
  goals: ["Get characters by index, including negative indexes", "Slice strings with `[start:stop:step]`", "Use `len()` and methods like `.upper()`, `.strip()`, `.replace()`, `.count()`, `.find()`", "Check membership with `in`", "Format output with f-strings: decimals, commas, alignment"],
  learn: [
    { t: "h", text: "Why strings matter" },
    { t: "p", html: "<p>Think about the apps on your phone. Your name in the university portal, a WhatsApp message, the email you log in with, the words you type into a search box — all of it is <b>text</b>. In Python, text is called a <b>string</b> (<code>str</code>). Today you learn to work <b>inside</b> a string: take one letter, cut out a piece, clean up spaces, search for a word and print it all neatly.</p>" },
    { t: "analogy", title: "A string is a row of lockers", html: "<p>Picture a row of lockers in a school corridor. Each locker holds <b>one character</b> — a letter, a digit, a space or a symbol — and each locker has a <b>number</b> painted on its door. The first locker is number <b>0</b>, not 1. If you know the number, you can open that locker directly and see what is inside.</p>" },
    { t: "h", text: "Indexes: every character has a number" },
    { t: "static", code: c` P   y   t   h   o   n
 0   1   2   3   4   5     <- index from the start
-6  -5  -4  -3  -2  -1     <- index from the end` },
    { t: "code", code: c`word = "Python"
print(word[0])
print(word[1])
print(word[5])`, before: "<p>To get one character, write the variable and then a number in <b>square brackets</b>. That number is called the <b>index</b>.</p>", note: "<p>Index 0 is the first letter, <code>P</code>. The word has 6 letters, so the last index is <b>5</b>, not 6.</p>" },
    { t: "lines", rows: [
      [c`word = "Python"`, "Store the text in a variable called <code>word</code>. It has 6 characters, in lockers 0 to 5."],
      [c`print(word[0])`, "<code>[0]</code> means \"open locker 0\" — the first character: <code>P</code>."],
      [c`print(word[1])`, "Locker 1 holds the <b>second</b> character: <code>y</code>."],
      [c`print(word[5])`, "Locker 5 is the sixth and last character: <code>n</code>. Asking for <code>word[6]</code> would be an <code>IndexError</code> — that locker does not exist."]] },
    { t: "ar", html: "العد في بايثون يبدأ من <b>صفر</b> وليس واحد! أول حرف رقمه 0، والثاني رقمه 1، وآخر حرف رقمه (عدد الحروف - 1)." },
    { t: "h", text: "Counting from the end, and len()" },
    { t: "p", html: "<p>Very often you want the <b>last</b> character: the last digit of a student ID, the last letter of a word. Python has a shortcut: <b>negative indexes</b> count from the end. <code>-1</code> is the last character, <code>-2</code> is the one before it, and so on. The built-in function <code>len()</code> tells you how many characters a string has — spaces and symbols count too.</p>" },
    { t: "code", code: c`word = "Python"
print(word[-1])
print(word[-2])
print(len(word))
print(len("CS 101"))`, note: "<p><code>len(\"CS 101\")</code> is 6: C, S, the space, 1, 0, 1. A space is a character like any other.</p>" },
    { t: "check", q: "What does this print?", code: c`city = "Riyadh"
print(city[2], city[-1])`, o: ["`i h`", "`y h`", "`y d`", "`R h`"], a: 1, e: "Index 2 is the third letter, `y` (R is 0, i is 1, y is 2). Index -1 is always the last letter: `h`.", hint: "Start counting at 0: R is 0, i is 1, …", ar: "تذكّر{{g:|ي}}: [2] هو الحرف الثالث، و [-1] هو آخر حرف دائمًا." },
    { t: "h", text: "Slicing: taking a piece" },
    { t: "p", html: "<p>One character is useful, but often you need a <b>piece</b>: the first 3 letters of a name for a username, the year from a date like <code>2026-09-29</code>, the last 4 digits of a phone number. Taking a piece of a string is called <b>slicing</b>. You write two indexes with a colon between them: <code>s[start:stop]</code>.</p>" },
    { t: "analogy", title: "The stop index is a fence", html: "<p>Think of the indexes as fences <i>between</i> the letters. <code>s[0:4]</code> means \"from fence 0 to fence 4\" — so you get 4 characters, and the character at index 4 is <b>not</b> included.</p>" },
    { t: "code", code: c`date = "2026-09-29"
year = date[0:4]
month = date[5:7]
print(year)
print(month)`, before: "<p>Look at the two numbers in each slice. A slice starts <b>at</b> start and stops <b>before</b> stop.</p>" },
    { t: "lines", rows: [
      [c`date = "2026-09-29"`, "Ten characters, indexes 0 to 9. The dashes are at index 4 and index 7."],
      [c`year = date[0:4]`, "From index 0 up to, but <b>not including</b>, index 4: characters 0, 1, 2, 3 → <code>2026</code>."],
      [c`month = date[5:7]`, "Characters 5 and 6 → <code>09</code>. The dash at index 7 is not included."],
      [c`print(year)`, "Shows <code>2026</code>. A slice is a <b>new</b> string; <code>date</code> itself did not change."]] },
    { t: "p", html: "<p>You can leave out a number. No start means \"from the beginning\"; no stop means \"to the end\". Negative numbers work in slices too, so <code>s[-7:]</code> is \"the last 7 characters\".</p>" },
    { t: "code", code: c`s = "Computer Science"
print(s[:8])     # from the start up to 8
print(s[9:])     # from 9 to the end
print(s[-7:])    # the last 7 characters` },
    { t: "p", html: "<p>A slice can have a third number, the <b>step</b>: <code>s[start:stop:step]</code>. A step of 2 takes every second character. A step of <code>-1</code> walks backwards — a famous trick to reverse a string.</p>" },
    { t: "code", code: c`s = "Python"
print(s[::2])
print(s[::-1])`, note: "<p><code>s[::2]</code> takes indexes 0, 2, 4 → <code>Pto</code>. <code>s[::-1]</code> gives <code>nohtyP</code>.</p>" },
    { t: "ar", html: "في القص [start:stop] نبدأ من start ونتوقف <b>قبل</b> stop. إذا تركت{{g:|ِ}} الرقم الأول فارغًا نبدأ من البداية، وإذا تركت{{g:|ِ}} الثاني فارغًا نكمل للنهاية." },
    { t: "check", q: "What does `\"Sultan\"[1:4]` give?", o: ["`Sul`", "`ult`", "`ulta`", "`Sult`"], a: 1, e: "Indexes 1, 2 and 3 — index 4 is not included: u, l, t → `ult`.", hint: "S is index 0. Stop at index 4, but do not include it." },
    { t: "h", text: "Methods: tools that belong to a string" },
    { t: "p", html: "<p>Users type in messy ways: <code>  sara  </code> with extra spaces, <code>SARA</code> in capitals, <code>sArA</code> by accident. Before you compare or save a name, you want to clean it. Strings come with built-in tools for this job, called <b>methods</b>. A method is a function that belongs to a value; you call it with a <b>dot</b> after the value: <code>value.method()</code>.</p>" },
    { t: "code", code: c`name = "  sARA alharbi  "
print(name.strip())
print(name.upper())
print(name.lower())
print(name.strip().title())`, note: "<p>Notice the spaces that are still around the result of <code>.upper()</code> and <code>.lower()</code>: only <code>.strip()</code> removes them.</p>" },
    { t: "lines", rows: [
      [c`name.strip()`, "Removes spaces (and new lines) from <b>both ends</b>. Spaces in the middle stay."],
      [c`name.upper()`, "Every letter becomes a capital: <code>SARA ALHARBI</code>."],
      [c`name.lower()`, "Every letter becomes small. Great before comparing two names: <code>\"SARA\".lower()</code> and <code>\"sArA\".lower()</code> both give <code>\"sara\"</code>."],
      [c`name.strip().title()`, "<b>Chaining</b>: first strip, then <code>.title()</code> makes the first letter of every word a capital → <code>Sara Alharbi</code>."]] },
    { t: "h", text: "Strings never change (they are immutable)" },
    { t: "analogy", title: "A method gives you a photocopy", html: "<p>When you ask a string method for a change, Python does not write on the original. It hands you a <b>photocopy</b> with the change. If you do not keep the copy — store it in a variable — it is thrown away. That is what <b>immutable</b> means: a string can never be changed in place.</p>" },
    { t: "code", code: c`name = "sara"
name.upper()
print(name)
name = name.upper()
print(name)`, note: "<p>The first <code>print</code> still shows <code>sara</code>: the uppercase copy was made and lost. After <code>name = name.upper()</code> the variable holds the new copy, so you see <code>SARA</code>.</p>" },
    { t: "ar", html: "دوال النص لا تغيّر النص الأصلي أبدًا، بل ترجع نسخة جديدة. إذا أردت{{g:|ِ}} الاحتفاظ بالنتيجة اكتب{{g:|ي}}: name = name.upper()" },
    { t: "check", q: "What does this print?", code: c`city = "  jeddah "
city.strip()
print(city.title())`, o: ["`Jeddah` with no spaces", "`Jeddah` with the spaces still around it", "`jeddah` with the spaces", "An error"], a: 1, e: "The result of `city.strip()` was not saved, so `city` still has its spaces. `.title()` only changes the letters. To keep the clean version write `city = city.strip()`." },
    { t: "h", text: "Searching and replacing" },
    { t: "p", html: "<p>Other methods answer questions about the text: <i>How many times does this word appear? Where does it start? Can I swap one word for another?</i> And the keyword <code>in</code> asks the simplest question of all: <i>is this piece inside that text?</i> The answer is <code>True</code> or <code>False</code>.</p>" },
    { t: "code", code: c`msg = "I love tea, tea is life"
print(msg.count("tea"))
print(msg.find("tea"))
print(msg.find("coffee"))
print(msg.replace("tea", "coffee"))`, note: "<p><code>.find()</code> gives the index where the text <b>first</b> starts (7 here), or <code>-1</code> when it is not there at all. <code>.replace()</code> changes <b>every</b> match — in a new string, of course.</p>" },
    { t: "code", code: c`email = "Sara@PSU.edu.sa"
print("@" in email)
print("gmail" in email)
print(email.lower().endswith(".edu.sa"))
print(email.startswith("sara"))`, note: "<p>The last line is <code>False</code> because <code>startswith</code> cares about capitals: the email starts with a capital S. Use <code>.lower()</code> first whenever capitals should not matter.</p>" },
    { t: "table", head: ["Method / tool", "What it does", "Example → result"], rows: [["`len(s)`", "number of characters", "`len(\"tea\")` → `3`"], ["`s.strip()`", "remove spaces at both ends", "`\" hi \".strip()` → `\"hi\"`"], ["`s.upper()` / `s.lower()`", "all capitals / all small", "`\"Hi\".upper()` → `\"HI\"`"], ["`s.title()`", "capital first letter of each word", "`\"ali omar\".title()` → `\"Ali Omar\"`"], ["`s.count(x)`", "how many times x appears", "`\"banana\".count(\"a\")` → `3`"], ["`s.find(x)`", "index of the first x, or -1", "`\"banana\".find(\"n\")` → `2`"], ["`s.replace(a, b)`", "new string with every a changed to b", "`\"tea\".replace(\"t\", \"s\")` → `\"sea\"`"], ["`x in s`", "is x inside s?", "`\"@\" in \"a@b.sa\"` → `True`"], ["`s.startswith(x)` / `s.endswith(x)`", "does s begin / end with x?", "`\"IS201\".startswith(\"IS\")` → `True`"]] },
    { t: "check", q: "What does `\"banana\".find(\"an\")` return?", o: ["`1`", "`2`", "`3`", "`-1`"], a: 0, e: "`b` is index 0, so the first `an` starts at index 1. `.find()` reports only the first match.", hint: "`.find()` gives the index where the first match starts." },
    { t: "h", text: "f-strings: text with values inside" },
    { t: "p", html: "<p>On Day 3 you built messages with <code>+</code> and <code>str()</code>: <code>\"You are \" + str(age) + \" years old\"</code>. It works, but it is easy to forget a space or a <code>str()</code>. An <b>f-string</b> is the clean way: put <code>f</code> just before the opening quote and write any variable — or even a calculation — inside curly braces <code>{ }</code>.</p>" },
    { t: "analogy", title: "An f-string is a form with blanks", html: "<p>Think of a printed form: <i>Name: ______ &nbsp; Age: ______</i>. The <code>{ }</code> are the blanks. When the line runs, Python fills every blank with the current value and hands you the finished text.</p>" },
    { t: "code", code: c`name = "{{name}}"
age = 19
print("You are " + str(age) + " years old")
print(f"You are {age} years old")
print(f"Hi {name}, next year you will be {age + 1}")` },
    { t: "lines", rows: [
      [c`print("You are " + str(age) + " years old")`, "The Day 3 way: three pieces glued with <code>+</code>, and <code>age</code> must be converted with <code>str()</code>."],
      [c`print(f"You are {age} years old")`, "The <code>f</code> makes it an f-string. <code>{age}</code> is replaced by <code>19</code>. No <code>str()</code>, no <code>+</code>."],
      [c`print(f"Hi {name}, next year you will be {age + 1}")`, "Several blanks in one string. Inside <code>{ }</code> you can even calculate: <code>{age + 1}</code> becomes <code>20</code>."]] },
    { t: "ar", html: "f-string هي أسهل وأنظف طريقة لدمج النص مع المتغيرات: اكتب{{g:|ي}} f قبل علامة التنصيص وضع{{g:|ي}} المتغير بين { }. لا تحتاج{{g:|ين}} str() ولا علامة +." },
    { t: "h", text: "Formatting numbers" },
    { t: "p", html: "<p>Prices and averages look messy with many decimals: <code>4.6666</code>. Inside the braces, after a <b>colon</b>, you can add a format: <code>:.2f</code> means \"show 2 digits after the dot\", and <code>:,</code> puts a comma between thousands so big numbers are easy to read.</p>" },
    { t: "code", code: c`gpa = 4.6666
price = 1500000
print(f"GPA: {gpa:.2f}")
print(f"GPA: {gpa:.1f}")
print(f"Price: {price:,} SAR")`, note: "<p><code>.2f</code> rounds to 2 decimals: <code>4.67</code>. The variable <code>gpa</code> itself does not change — only the way it is shown.</p>" },
    { t: "p", html: "<p>To make tidy columns — a receipt, a timetable — give a width: <code>&lt;8</code> left-aligns in 8 characters, <code>&gt;8</code> right-aligns, <code>^8</code> centers. The square brackets below are only there so you can see the spaces.</p>" },
    { t: "code", code: c`item = "Tea"
print(f"[{item:<8}]")
print(f"[{item:>8}]")
print(f"[{item:^8}]")` },
    { t: "table", head: ["Format", "Meaning", "Example → result"], rows: [["`{x:.2f}`", "2 decimals", "`f\"{3.14159:.2f}\"` → `3.14`"], ["`{x:,}`", "thousands separator", "`f\"{25000:,}\"` → `25,000`"], ["`{s:<8}`", "left-align in 8 characters", "`Tea` followed by 5 spaces"], ["`{s:>8}`", "right-align in 8 characters", "5 spaces, then `Tea`"], ["`{s:^8}`", "center in 8 characters", "spaces on both sides of `Tea`"]] },
    { t: "check", q: "What does this print?", code: c`price = 12.5
qty = 3
print(f"{price * qty:.2f}")`, o: ["`37.5`", "`37.50`", "`{price * qty:.2f}`", "`37`"], a: 1, e: "Python calculates `12.5 * 3 = 37.5` inside the braces, then `.2f` shows exactly two decimals: `37.50`.", hint: "`.2f` always shows two digits after the dot." },
    { t: "steps", title: "A student email maker", problem: "<p>The university creates student emails like this: the <b>first letter</b> of the first name + the <b>last name</b>, all lowercase, + the <b>last 3 digits</b> of the student ID, then <code>@student.psu.edu.sa</code>. The user types messy names. Read the first name, last name and ID, and print a small card:</p><pre class=\"code-static\">Student: Sara Alharbi\nEmail:   salharbi345@student.psu.edu.sa</pre>",
      steps: [
        { html: "<p><b>Understand.</b> Inputs: first name, last name, ID (three lines). Output: two lines. By hand for <code>  sara </code>, <code>AlHarbi</code>, <code>441012345</code>: first letter <code>s</code>, last name <code>alharbi</code>, last 3 digits <code>345</code>.</p>" },
        { html: "<p><b>Clean the inputs.</b> Remove spaces with <code>.strip()</code>. Keep the ID as a string — we want its characters, not its value.</p>", code: c`first = input().strip()
last = input().strip()
student_id = input().strip()` },
        { html: "<p><b>Build the pieces</b> with an index, a slice and <code>.lower()</code>.</p>", code: c`user = first[0].lower() + last.lower() + student_id[-3:]
email = user + "@student.psu.edu.sa"` },
        { html: "<p><b>Print the card</b> with f-strings. <code>.title()</code> makes the names look neat. Then test with a second name, e.g. <code>OMAR</code>, <code>khalid</code>, <code>442000017</code>.</p>", code: c`print(f"Student: {first.title()} {last.title()}")
print(f"Email:   {email}")` }],
      code: c`first = input("First name: ").strip()
last = input("Last name: ").strip()
student_id = input("Student ID: ").strip()
user = first[0].lower() + last.lower() + student_id[-3:]
email = user + "@student.psu.edu.sa"
print(f"Student: {first.title()} {last.title()}")
print(f"Email:   {email}")`, stdin: "  sara \nAlHarbi\n441012345", ar: "الفكرة: نظّف{{g:|ي}} المدخلات أولًا بـ strip، ثم خذ{{g:|ي}} الأجزاء بالفهرس والقص، ثم اجمعها واطبعها بـ f-string." },
    { t: "viz", code: c`first = "sara"
last = "alqahtani"
initials = first[0].upper() + "." + last[0].upper() + "."
full = first.title() + " " + last.title()
print(initials, full)`, before: "<p>Watch how each method returns a <b>new</b> string that we combine. The original variables never change.</p>" },
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
    { t: "predict", code: c`s = "Data Science"
print(s[:4].upper(), s[-7:].lower())`, explain: "<code>s[:4]</code> is <code>Data</code> → <code>DATA</code>. <code>s[-7:]</code> is the last 7 characters, <code>Science</code> → <code>science</code>. Output: <code>DATA science</code>." },
    { t: "parsons", title: "Hide a phone number", prompt: "Arrange the lines so the program reads a phone number and prints only its last 4 digits, like <code>Phone: ******4567</code>.", lines: [c`phone = input().strip()`, c`hidden = "*" * (len(phone) - 4) + phone[-4:]`, c`print(f"Phone: {hidden}")`], distractors: [c`hidden = "*" * 6 + phone[4:]`, c`print("Phone: {hidden}")`], explain: "<code>len(phone) - 4</code> stars cover everything except the last 4 characters, and <code>phone[-4:]</code> keeps those 4. The print needs the <code>f</code>." },
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
print(secret[::-1][::2])`, answers: ["python"], hint: "First reverse it (write it down backwards), then keep characters at positions 0, 2, 4, …", ar: "اعكس{{g:|ي}} النص أولًا، ثم خذ{{g:|ي}} حرفًا واترك{{g:|ي}} حرفًا.", e: "Reversed: <code>P?yFtYhxo*nX</code>. Keeping every second character (indexes 0, 2, 4, 6, 8, 10) gives <code>P y t h o n</code> → <code>Python</code>. Chaining two slices like this is a neat trick — and a reminder that careful counting beats guessing." },
  cards: [
    { f: "Index of the first and last character?", b: "`s[0]` and `s[-1]`." },
    { f: "What does `s[2:5]` include?", b: "Indexes 2, 3 and 4 — the stop index is not included." },
    { f: "Reverse a string", b: "`s[::-1]`" },
    { f: "Why does `name.upper()` alone not change `name`?", b: "Strings are immutable. Save it: `name = name.upper()`." },
    { f: "f-string with 2 decimals", b: "`f\"{value:.2f}\"`" },
  ],
  remember: [
    "Indexes start at **0**; `s[-1]` is the last character and `len(s)` counts every character, spaces too.",
    "`s[start:stop]` takes a piece and **stops before** `stop`; `s[::-1]` reverses a string.",
    "Methods are called with a dot: `s.strip()`, `s.lower()`, `s.title()`, `s.replace(a, b)`, `s.find(x)`, `s.count(x)`.",
    "Strings are **immutable**: a method returns a new string, so save it: `name = name.strip()`.",
    "`\"x\" in s` gives True or False — use `.lower()` first when capitals should not matter.",
    "f-strings: `f\"Hi {name}\"`; formats after a colon: `{x:.2f}`, `{n:,}`, `{s:<10}`.",
  ],
  rememberAr: "الفهرس يبدأ من صفر، والقص يتوقف قبل الرقم الثاني، ودوال النص ترجع نسخة جديدة فاحفظ{{g:|ي}}ها في متغير، و f-string هي أفضل طريقة لطباعة نص مرتب.",
};
})();

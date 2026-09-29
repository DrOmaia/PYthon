window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[4] = {
  title: "Strings and f-strings",
  intro: "Most of the data in the world is text: names, messages, emails, tweets, the prompts you send to an AI. Today you become fluent with strings — cutting them, searching them, cleaning them and formatting beautiful output.",
  introAr: "النصوص في كل مكان: أسماء ورسائل وبيانات. اليوم نتعلم كيف نصل لأي حرف، ونقص أجزاء من النص، ونستخدم دوال النصوص، ونكتب مخرجات مرتبة باستخدام f-strings.",
  goals: ["Get characters by index, including negative indexes", "Slice strings with `[start:stop:step]`", "Use `len()` and methods like `.upper()`, `.strip()`, `.replace()`, `.count()`, `.find()`", "Check membership with `in`", "Format output with f-strings: decimals, commas, alignment"],
  learn: [
    { t: "h", text: "A string is a sequence of characters" },
    { t: "static", code: c` P   y   t   h   o   n
 0   1   2   3   4   5     <- index from the start
-6  -5  -4  -3  -2  -1     <- index from the end` },
    { t: "code", code: c`word = "Python"
print(word[0])
print(word[3])
print(word[-1])
print(len(word))` },
    { t: "ar", html: "العد يبدأ من <b>صفر</b> وليس واحد! أول حرف رقمه 0، وآخر حرف رقمه len - 1، ويمكن الوصول له بسهولة بـ [-1]." },
    { t: "h", text: "Slicing: taking a piece" },
    { t: "code", code: c`s = "Computer Science"
print(s[0:8])    # from 0 up to (not including) 8
print(s[9:])     # from 9 to the end
print(s[:3])     # from the start up to 3
print(s[-7:])    # the last 7 characters
print(s[::2])    # every second character
print(s[::-1])   # reversed!` },
    { t: "analogy", title: "The stop index is a fence", html: "<p>Think of the indexes as fences <i>between</i> the letters. <code>s[0:8]</code> means \"from fence 0 to fence 8\" — so you get 8 characters, and the character at index 8 is <b>not</b> included. That is why <code>s[:3] + s[3:]</code> always gives back the whole string.</p>" },
    { t: "h", text: "String methods" },
    { t: "code", code: c`msg = "  Hello Python World  "
print(msg.strip())          # remove spaces at both ends
print(msg.upper())
print(msg.lower())
print(msg.strip().title())
print(msg.replace("World", "{{name}}"))
print(msg.count("o"))
print(msg.find("Python"))   # index where it starts (-1 if missing)` },
    { t: "p", html: "<p>A <b>method</b> is a function that belongs to a value. You call it with a dot: <code>value.method()</code>. Strings are <b>immutable</b>: methods never change the original string, they return a <b>new</b> one. If you want to keep the result, store it: <code>msg = msg.upper()</code>.</p>" },
    { t: "code", code: c`email = "Sara@PSU.edu.sa"
print("@" in email)
print("gmail" in email)
print(email.lower().endswith(".edu.sa"))
print(email.startswith("sara"))` },
    { t: "h", text: "f-strings: the best way to format output" },
    { t: "code", code: c`name = "{{name}}"
gpa = 4.6666
price = 1500000
print(f"Hi {name}, your GPA is {gpa}")
print(f"Rounded: {gpa:.2f}")
print(f"Price: {price:,} SAR")
print(f"Next year you will be {19 + 1}")
print(f"[{name:>10}]")
print(f"[{name:<10}]")
print(f"[{name:^10}]")` },
    { t: "p", html: "<p>Put <code>f</code> before the quotes, then anything inside <code>{ }</code> is calculated and inserted. After a colon you can add a <b>format</b>: <code>.2f</code> for 2 decimals, <code>,</code> for thousands separators, <code>&gt;10</code> / <code>&lt;10</code> / <code>^10</code> to align in 10 characters.</p>" },
    { t: "ar", html: "f-string هي أسهل وأنظف طريقة لدمج النص مع المتغيرات. لا تحتاج{{g:|ين}} str() ولا علامة +." },
    { t: "viz", code: c`first = "sara"
last = "alqahtani"
initials = first[0].upper() + "." + last[0].upper() + "."
full = first.title() + " " + last.title()
print(initials, full)`, before: "<p>Watch how each method returns a <b>new</b> string that we combine.</p>" },
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

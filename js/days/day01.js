window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[1] = {
  title: "Hello, Python: print and comments",
  intro: "Today you write your first real programs, {{name}}. By tonight Python will greet you by name, draw pictures with text, and you will know how to read an error message without panic.",
  introAr: "اليوم أول يوم لك يا {{name}}! هدفنا بسيط: نكتب أول برنامج، ونفهم print، ونتعلم أن الأخطاء شيء طبيعي جدًا في البرمجة.",
  goals: [
    "Explain what a program is and how Python runs it (top to bottom, line by line)",
    "Show text and numbers with `print()`",
    "Control the output with `sep`, `end` and `\\n`",
    "Write comments with `#`",
    "Read and fix your first errors",
  ],
  learn: [
    { t: "h", text: "What is programming?" },
    { t: "p", html: "<p>A <b>program</b> is a list of instructions for the computer. The computer is extremely fast, but it is also extremely literal: it does <i>exactly</i> what you write, in the order you write it — not what you meant.</p>" },
    { t: "analogy", title: "A program is like a recipe", html: "<p>A recipe lists steps in order: <i>boil water, add pasta, wait 10 minutes</i>. If you swap two steps, you get a different (probably bad) result. Python reads your code the same way: <b>from top to bottom, one line at a time</b>.</p>" },
    { t: "p", html: "<p>Python is one of the most popular languages in the world. It is used for websites, automation, data science and — most famously — artificial intelligence. It was designed to be easy to read, which makes it perfect for your first language.</p>" },
    { t: "h", text: "Your first program" },
    { t: "code", code: c`print("Hello, {{name}}!")`, before: "<p>Press <b>▶ Run</b>. (The very first run wakes Python up and takes a few seconds.)</p>" },
    { t: "p", html: "<p>Let's read that line like a programmer:</p><ul><li><code>print</code> is a <b>function</b> — a built-in tool that does a job. Its job: show something on the screen.</li><li>The <b>parentheses</b> <code>( )</code> hold what you give to the function. This is called an <b>argument</b>.</li><li><code>\"Hello, {{name}}!\"</code> is a <b>string</b> — a piece of text. Text always goes between quotes: <code>\"double\"</code> or <code>'single'</code>, as long as both sides match.</li></ul>" },
    { t: "ar", html: "النص في بايثون لازم يكون بين علامتي تنصيص. الأرقام لا تحتاج علامات تنصيص. و print هي دالة تعرض أي شيء نعطيه لها داخل الأقواس." },
    { t: "h", text: "Text vs numbers" },
    { t: "code", code: c`print("3 + 4")
print(3 + 4)
print(2026)
print(10 / 4)`, note: "<p>With quotes, Python shows the text <i>exactly as written</i>. Without quotes, Python <b>calculates</b> first, then shows the result. This small difference is one of the most important ideas in programming.</p>" },
    { t: "h", text: "Several values in one print" },
    { t: "code", code: c`print("Name:", "{{name}}")
print("Day", 1, "of", 30)
print("2026", "09", "29", sep="-")
print("Loading", end="...")
print("done!")` },
    { t: "p", html: "<p>Separate values with commas and <code>print</code> puts <b>one space</b> between them. You can change that:</p><ul><li><code>sep=\"-\"</code> changes the separator between values.</li><li><code>end=\"...\"</code> changes what comes at the end. Normally it is a new line, so each <code>print</code> starts on a new line.</li></ul>" },
    { t: "h", text: "Comments: notes for humans" },
    { t: "code", code: c`# This is a comment. Python ignores it completely.
print("Comments explain WHY the code does something")  # a comment can follow code
# print("This line does not run")` },
    { t: "ar", html: "التعليقات تبدأ بعلامة # ويتجاهلها بايثون. نستخدمها لشرح الكود لأنفسنا ولغيرنا، ونستخدمها أيضًا لتعطيل سطر مؤقتًا." },
    { t: "h", text: "Special characters inside strings" },
    { t: "code", code: c`print("Line one\nLine two")
print("Name:\t{{name}}")
print("She said \"Python is fun\"")
print('It\'s day 1')` },
    { t: "table", head: ["You write", "You get"], rows: [["`\\n`", "a new line"], ["`\\t`", "a tab (a wide space)"], ["`\\\"`", "a double quote inside a \"...\" string"], ["`\\'`", "a single quote inside a '...' string"]] },
    { t: "h", text: "Top to bottom, one line at a time" },
    { t: "viz", code: c`print("First")
print("Second")
print("Third")`, before: "<p>The visualizer lets you <b>see</b> Python working. Press Visualize, then click Next ▶ and watch the output grow line by line.</p>" },
  ],
  mistakes: [
    { title: "Forgetting the quotes", html: "Without quotes, Python thinks <code>Hello</code> is the name of a variable and says <code>NameError</code>.", wrong: c`print(Hello)`, right: c`print("Hello")`, ar: "بدون علامات تنصيص يعتقد بايثون أن الكلمة اسم متغير." },
    { title: "Capital P in print", html: "Python is <b>case-sensitive</b>: <code>Print</code>, <code>PRINT</code> and <code>print</code> are three different names. Only <code>print</code> exists.", wrong: c`Print("Hi")`, right: c`print("Hi")` },
    { title: "Mixing quote types", html: "A string must end with the same quote it started with.", wrong: c`print("Hello')`, right: c`print("Hello")` },
    { title: "Curly quotes from Word or WhatsApp", html: "Copying code from a document can bring “smart quotes”. Python only understands straight quotes <code>\"</code> and <code>'</code>.", wrong: "print(“Hello”)", right: c`print("Hello")`, ar: "لا تنسخ الكود من ملفات وورد أو واتساب؛ اكتب علامات التنصيص من الكيبورد الإنجليزي." },
  ],
  tricks: [
    { title: "Repeat text with *", html: "Multiplying a string repeats it. Perfect for lines and decorations.", code: c`print("=" * 20)
print("Py30" * 3)` },
    { title: "Empty print() = empty line", html: "<code>print()</code> with nothing inside prints a blank line — useful to space out your output." },
    { title: "Triple quotes for many lines", html: "Text between <code>\"\"\"</code> can span several lines exactly as you type them.", code: c`print("""Roses are red,
Python is neat,
Day one is done,
{{name}} can't be beat!""")` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the messages below: add your city, your major and one thing you want to build with Python. Run after every change.</p>", code: c`print("Hi! My name is {{name}}.")
print("I live in ...")
print("I study ...")
print("One day I will build ...")` },
    { t: "predict", code: c`print("5" + "5")
print(5 + 5)`, explain: "With quotes they are <b>strings</b>, and <code>+</code> between strings <b>glues</b> them: <code>\"55\"</code>. Without quotes they are numbers and <code>+</code> adds: <code>10</code>." },
    { t: "predict", code: c`print("A", "B", "C", sep="")
print("A", "B", "C", sep=", ")
print("X", end=" ")
print("Y")`, explain: "<code>sep=\"\"</code> glues values with nothing between them. The second line uses a comma and a space. <code>end=\" \"</code> keeps the cursor on the same line, so <code>Y</code> appears right after <code>X</code>." },
    { t: "parsons", title: "Build a welcome card", prompt: "Put the lines in order so the program prints a top border, the welcome line, the day line and a bottom border.", lines: [c`print("*" * 24)`, c`print("Welcome to Py30, {{name}}")`, c`print("Day 1 of 30")`, c`print("*" * 24)`], explain: "Programs run top to bottom, so the order of lines is the order of the output." },
    { t: "try", title: "Text art", html: "<p>Programmers love drawing with characters. Run this, then design your own picture — a house, a cat, your initials.</p>", code: c`print("   /\\")
print("  /  \\")
print(" /____\\")
print(" |    |")
print(" | [] |")
print(" |____|")` },
    { t: "predict", code: c`print("One\nTwo\n\nThree")`, explain: "Each <code>\\n</code> starts a new line. Two <code>\\n</code> in a row make an empty line between Two and Three." },
    { t: "try", title: "Break it on purpose", html: "<p>Good programmers are not people who never see errors — they are people who understand them quickly. Make each mistake below <b>one at a time</b>, run, and read Py30's explanation:</p><ol><li>Remove the closing <code>)</code></li><li>Remove one quote</li><li>Write <code>Print</code> with a capital P</li><li>Remove both quotes around the text</li></ol>", code: c`print("I am learning from my errors")` },
  ],
  exercises: [
    { id: "hello", lvl: "seed", title: "The classic", prompt: "<p>Every programmer's first program. Print exactly:</p><pre class=\"code-static\">Hello, World!</pre>", starter: "# Write your code below\n", tests: [{ expected: "Hello, World!" }],
      hint: "Use <code>print()</code> with the text inside quotes. Check the comma and the exclamation mark.", ar: "انتبه{{g:|ي}} للفاصلة وعلامة التعجب والحروف الكبيرة.",
      solutions: [{ name: "Direct", code: c`print("Hello, World!")`, note: "One print, one string." }, { name: "Two values", code: c`print("Hello,", "World!")`, note: "Two strings; print adds the space between them automatically." }],
      twist: "Now print the same line using <b>two</b> values and <code>sep</code>. Can you get exactly the same output?" },
    { id: "card", lvl: "seed", title: "Your student card", prompt: "<p>Print these two lines (with your own name, exactly as you entered it in Py30):</p><pre class=\"code-static\">Name: {{name}}\nMajor: Computer Science</pre>", starter: "", tests: [{ expected: "Name: {{name}}\nMajor: Computer Science" }],
      hint: "Two <code>print</code> calls, one for each line.", solutions: [
        { name: "Two prints", code: c`print("Name: {{name}}")
print("Major: Computer Science")`, note: "Clear and simple." },
        { name: "One print with \\n", code: c`print("Name: {{name}}\nMajor: Computer Science")`, note: "<code>\\n</code> makes the new line inside a single string." },
        { name: "Using sep", code: c`print("Name: {{name}}", "Major: Computer Science", sep="\n")`, note: "The separator between the two values is a new line." }] },
    { id: "age", lvl: "star", title: "Let Python calculate", prompt: "<p>Python was first released in 1991. Print how many years passed until 2026 — but <b>let Python do the subtraction</b>. Your output must be just the number.</p>", tests: [{ expected: "35" }],
      hint: "No quotes around the calculation!", ar: "لو وضعت{{g:|ِ}} علامات تنصيص سيطبع بايثون العملية كنص ولن يحسبها.",
      solutions: [{ name: "Calculation", code: c`print(2026 - 1991)`, note: "Python calculates 2026 - 1991 first, then prints 35." }] },
    { id: "date", lvl: "star", title: "Build a date", prompt: "<p>Print today's course date in this exact format, but pass the three parts as <b>separate values</b> to <code>print</code>:</p><pre class=\"code-static\">2026/09/29</pre>", tests: [{ expected: "2026/09/29" }],
      hint: "<code>print(\"2026\", \"09\", \"29\", sep=...)</code>",
      solutions: [{ name: "sep", code: c`print("2026", "09", "29", sep="/")`, note: "sep controls what goes between the values." }, { name: "One string", code: c`print("2026/09/29")`, note: "Also correct output — but the exercise asked you to practice <code>sep</code>." }] },
    { id: "poem", lvl: "star", title: "Three lines, one print", prompt: "<p>Using <b>a single</b> <code>print</code>, show:</p><pre class=\"code-static\">Python\nis\nfun</pre>", tests: [{ expected: "Python\nis\nfun" }],
      solutions: [{ name: "\\n", code: c`print("Python\nis\nfun")`, note: "Two <code>\\n</code> = two line breaks." }, { name: "sep", code: c`print("Python", "is", "fun", sep="\n")` }, { name: "Triple quotes", code: c`print("""Python
is
fun""")` }] },
    { id: "fix1", lvl: "fire", debug: true, title: "Fix the broken welcome", prompt: "<p>This program has <b>three</b> bugs. Fix them so it prints:</p><pre class=\"code-static\">Welcome to Py30\nDay 1 of 30\nLet's code!</pre><p>Run it first and read the error explanations — they tell you where to look.</p>",
      starter: c`Print("Welcome to Py30")
print('Day 1 of 30")
print("Let's code!"`, tests: [{ expected: "Welcome to Py30\nDay 1 of 30\nLet's code!" }],
      hint: "Python stops at the first error it finds. Fix it, run again, and meet the next one.", ar: "صلّح{{g:|ي}} خطأ واحدًا في كل مرة ثم شغّل{{g:|ي}} الكود مرة أخرى.",
      solutions: [{ name: "Fixed", code: c`print("Welcome to Py30")
print("Day 1 of 30")
print("Let's code!")`, note: "Bug 1: <code>Print</code> → <code>print</code>. Bug 2: quotes did not match. Bug 3: missing <code>)</code>. Note that <code>\"Let's code!\"</code> works because the apostrophe is inside double quotes." }] },
    { id: "box", lvl: "fire", title: "Draw a name badge", prompt: "<p>Print this badge exactly (8 dashes on top and bottom):</p><pre class=\"code-static\">+--------+\n|  Py30  |\n+--------+</pre>", tests: [{ expected: "+--------+\n|  Py30  |\n+--------+" }],
      hint: "Count the spaces around Py30: two on each side. <code>\"-\" * 8</code> saves counting.",
      solutions: [
        { name: "Three prints", code: c`print("+--------+")
print("|  Py30  |")
print("+--------+")` },
        { name: "String repetition", code: c`print("+" + "-" * 8 + "+")
print("|  Py30  |")
print("+" + "-" * 8 + "+")`, note: "<code>\"-\" * 8</code> builds the line. Change 8 and the border changes size." },
        { name: "One print", code: c`print("+--------+\n|  Py30  |\n+--------+")` }],
      twist: "Make a badge with <b>your own name</b> inside. How many dashes do you need so the border fits exactly?" },
  ],
  quiz: [
    { q: "What does this print?", code: c`print("10 + 5")`, o: ["`15`", "`10 + 5`", "An error", "`105`"], a: 1, e: "Inside quotes it is text, so Python prints it exactly as written." },
    { q: "Which line is correct Python?", o: ["`Print(\"Hi\")`", "`print(Hi)`", "`print(\"Hi\")`", "`print \"Hi\"`"], a: 2, e: "Lowercase `print`, parentheses, and quotes around the text." },
    { q: "What does `print(\"a\", \"b\", sep=\"*\")` show?", o: ["`a b`", "`a*b`", "`ab*`", "`a * b`"], a: 1, e: "`sep` replaces the default space between the values." },
    { q: "What does Python do with a line that starts with `#`?", o: ["Prints it", "Ignores it", "Gives an error", "Runs it twice"], a: 1, e: "It is a comment — a note for humans." },
    { q: "Which one prints two lines?", o: ["`print(\"A\\tB\")`", "`print(\"A\", \"B\")`", "`print(\"A\\nB\")`", "`print(\"A\" + \"B\")`"], a: 2, e: "`\\n` is the new-line character." },
  ],
  puzzle: { title: "The mystery of the missing space", q: "<p>What exactly does this program print? Type the output (one line).</p>", code: c`print("Py", end="")
print("th", "on", sep="")
`, answers: ["python"], hint: "The first print does not end with a new line, and the second print glues its values with nothing between them.", ar: "end=\"\" يمنع النزول لسطر جديد، و sep=\"\" يلصق القيم بدون مسافة.", e: "<code>end=\"\"</code> keeps the cursor after <code>Py</code>, and <code>sep=\"\"</code> glues <code>th</code> and <code>on</code>. Result: <code>Python</code>." },
  cards: [
    { f: "What does `print()` do?", b: "Shows values on the screen. Each call ends with a new line by default." },
    { f: "Text vs number: `print(\"2+2\")` vs `print(2+2)`", b: "`2+2` (the text) vs `4` (the calculated result)." },
    { f: "What are `sep` and `end`?", b: "`sep` goes between values (default: a space). `end` goes at the end (default: a new line)." },
    { f: "How do you write a comment?", b: "Start the line (or the end of a line) with `#`. Python ignores it." },
    { f: "What does `\\n` mean inside a string?", b: "New line." },
  ],
};
})();

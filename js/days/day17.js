window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[17] = {
  title: "Handling errors and working with files",
  intro: "Real programs meet real problems: users type letters where numbers belong, files go missing, networks fail. Professional code doesn't crash — it <b>handles</b> errors. And real programs remember things between runs by saving <b>files</b>. Today you learn both.",
  introAr: "اليوم نتعلم try و except لمعالجة الأخطاء بدل أن يتوقف البرنامج، ونتعلم قراءة الملفات والكتابة فيها، وملفات CSV التي تشبه جداول إكسل.",
  goals: ["Catch errors with `try` / `except`", "Catch specific exceptions (`ValueError`, `ZeroDivisionError`, `FileNotFoundError`)", "Raise your own errors with `raise`", "Write, read and append text files with `with open(...)`", "Read and write CSV data"],
  learn: [
    { t: "h", text: "Why errors and files matter" },
    { t: "p", html: "<p>Until now, when something went wrong, your program simply <b>crashed</b>: a user typed <code>nineteen</code> instead of <code>19</code> and everything stopped with a red message. Real apps cannot behave like that. A banking app does not close when you type a letter in the amount box — it says <i>\"Please enter a number\"</i> and lets you try again. Today you learn how to <b>catch</b> problems and react to them calmly.</p><p>You also learn the second big skill of the day: <b>files</b>. Every variable you have made so far disappears when the program ends. Files let a program <b>remember</b> things: notes, marks, settings, a game's high score.</p>" },
    { t: "analogy", title: "A safety net and a notebook", html: "<p>Think of an acrobat. The <code>try</code> block is the risky jump; the <code>except</code> block is the <b>safety net</b> under it. If the jump goes well, nobody notices the net. If the acrobat falls, the net catches them and the show goes on.</p><p>A file is like a <b>notebook</b>: you write in it today, close it, and tomorrow you can open it and read what you wrote. Your variables are more like a whiteboard that is wiped clean every time the program ends.</p>" },
    { t: "ar", html: "اليوم نتعلم أمرين: معالجة الأخطاء حتى لا يتوقف البرنامج فجأة (مثل شبكة الأمان)، والملفات حتى يتذكر البرنامج البيانات بعد انتهائه (مثل الدفتر)." },

    { t: "h", text: "What an error looks like" },
    { t: "p", html: "<p>When Python meets a problem it cannot solve, it <b>raises an exception</b> (an error) and stops. The last line of the red message is the most important: it tells you the <b>type</b> of the error and a short description. Learning to read that line is the first step to handling it.</p>" },
    { t: "code", code: c`text = "nineteen"
age = int(text)
print("This line never runs")`, expectError: true, before: "<p>This example crashes <b>on purpose</b>. Run it and read the last line of the error message carefully.</p>", note: "<p>Line by line:</p><ul><li><code>text = \"nineteen\"</code> stores a word, not digits.</li><li><code>int(text)</code> tries to turn it into a whole number. It cannot, so Python raises an error and <b>stops right there</b>.</li><li>Line 3 never runs: a crash ends the whole program.</li></ul><p>The last line reads <code>ValueError: invalid literal for int() with base 10: 'nineteen'</code>. <code>ValueError</code> is the <b>type</b>: the value has the right type (a string) but the wrong content. The rest says what went wrong in plain words (\"base 10\" just means normal decimal digits).</p>" },
    { t: "table", head: ["Error type", "Typical cause", "Example"], rows: [["`ValueError`", "right type, wrong content", "`int(\"12a\")`"], ["`ZeroDivisionError`", "dividing by zero", "`10 / 0`"], ["`TypeError`", "wrong type for the operation", "`10 / \"2\"`"], ["`IndexError`", "list position that doesn't exist", "`[1, 2][5]`"], ["`KeyError`", "dictionary key that doesn't exist", "`{\"a\": 1}[\"b\"]`"], ["`FileNotFoundError`", "opening a file that isn't there", "`open(\"nope.txt\")`"], ["`NameError`", "using a variable that was never created (often a typo)", "`print(nmae)`"]] },
    { t: "ar", html: "عند حدوث خطأ يتوقف البرنامج ويطبع رسالة. اقرأ{{g:|ي}} السطر الأخير دائمًا: فيه نوع الخطأ (مثل ValueError) ووصف قصير للمشكلة." },

    { t: "h", text: "try / except: catch the error" },
    { t: "p", html: "<p>To stop a crash, put the risky lines inside a <code>try:</code> block, and write what to do instead inside an <code>except ErrorType:</code> block. Both need a colon and indented lines, just like <code>if</code>.</p>" },
    { t: "code", code: c`text = input("Your age: ")
try:
    age = int(text)
    print("Next year you will be", age + 1)
except ValueError:
    print("That's not a whole number:", text)
print("The program continues")`, stdin: "nineteen", before: "<p>Run it with <code>nineteen</code> in the Input box. Then change the input to <code>19</code> and run again. Compare which lines print.</p>", note: "<p>Line by line with <code>nineteen</code>:</p><ul><li>Line 1 reads the text. No problem yet.</li><li><code>try:</code> tells Python: \"try these lines, but be ready for trouble\".</li><li><code>int(text)</code> raises a <code>ValueError</code>. Python <b>immediately leaves</b> the <code>try</code> block, so line 4 is skipped.</li><li>It looks for a matching <code>except</code>. <code>except ValueError:</code> matches, so line 6 prints the friendly message.</li><li>Line 7 is outside both blocks, so the program <b>continues</b> normally — no crash.</li></ul><p>With <code>19</code> there is no error: the whole <code>try</code> block runs and the <code>except</code> block is skipped completely, like an <code>else</code> that was never needed.</p>" },
    { t: "tip", title: "Always name the error type", html: "<p>You <i>can</i> write <code>except:</code> with no type, but it catches <b>everything</b> — even typos in your own code, which then hide silently. Write the exact type you expect, like <code>except ValueError:</code>.</p>" },
    { t: "ar", html: "try: جرّب هذه الأسطر. except: إذا حدث خطأ من هذا النوع نفّذ هذا بدل أن يتوقف البرنامج. عند الخطأ يقفز بايثون فورًا إلى except ويتجاهل باقي أسطر try. حدد{{g:|ي}} نوع الخطأ دائمًا ولا تكتب{{g:|ي}} except وحدها." },
    { t: "predict", code: c`try:
    print("start")
    n = int("abc")
    print("converted")
except ValueError:
    print("bad number")
print("end")`, explain: "<code>start</code> prints first. Then <code>int(\"abc\")</code> raises a ValueError, so <code>converted</code> is <b>skipped</b> and Python jumps to the except block: <code>bad number</code>. Finally <code>end</code> runs because it is outside. Output: <code>start</code>, <code>bad number</code>, <code>end</code>." },

    { t: "h", text: "Reading the error message with as" },
    { t: "p", html: "<p>Sometimes you want to know <b>what exactly</b> went wrong, for example to show it or save it in a log. Add <code>as e</code> after the error type: Python puts the error into the variable <code>e</code>, and printing <code>e</code> shows its description.</p>" },
    { t: "code", code: c`try:
    mark = int("12a")
except ValueError as e:
    print("Problem:", e)`, before: "<p>Run it and compare the printed text with the last line of the crash you saw earlier.</p>", note: "<p>Line by line:</p><ul><li><code>int(\"12a\")</code> fails with a ValueError.</li><li><code>except ValueError as e:</code> catches it <b>and</b> gives it a name, <code>e</code>. You can choose any name, but <code>e</code> is the tradition.</li><li><code>print(\"Problem:\", e)</code> shows the description: <code>Problem: invalid literal for int() with base 10: '12a'</code>.</li></ul><p>It is the same message as in the crash — but now <b>you</b> decide how to show it, and the program keeps running.</p>" },
    { t: "ar", html: "اكتب{{g:|ي}} except ValueError as e لتحصل{{g:|ي}} على رسالة الخطأ داخل المتغير e، ثم يمكنك طباعتها أو حفظها." },

    { t: "h", text: "Several except blocks" },
    { t: "p", html: "<p>One piece of code can fail in different ways. Division can fail because the divisor is zero <b>or</b> because someone passed text. You can write one <code>except</code> for each type, and Python runs the <b>first one that matches</b> — like an <code>if/elif</code> chain for errors.</p>" },
    { t: "code", code: c`def safe_divide(a, b):
    try:
        return round(a / b, 2)
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Numbers only, please"

print(safe_divide(10, 4))
print(safe_divide(10, 0), "/", safe_divide(10, "2"))`, before: "<p>Three calls, three different results (the last line makes two of them). Before running, guess which line of the function answers each call.</p>", note: "<p>Call by call:</p><ul><li><code>safe_divide(10, 4)</code>: <code>10 / 4</code> is <code>2.5</code>, no error, so the <code>try</code> block returns <code>2.5</code>. No except runs.</li><li><code>safe_divide(10, 0)</code>: dividing by zero raises <code>ZeroDivisionError</code>. The first except matches → <code>Cannot divide by zero</code>.</li><li><code>safe_divide(10, \"2\")</code>: dividing a number by a string raises <code>TypeError</code>. The first except does not match, so Python tries the next one, which does → <code>Numbers only, please</code>.</li></ul><p>Notice that <code>return</code> works inside <code>try</code> and <code>except</code> like anywhere else in a function (Day 15).</p>" },
    { t: "ar", html: "يمكن كتابة أكثر من except، لكل نوع خطأ معالجته الخاصة. بايثون ينفذ أول except يطابق نوع الخطأ فقط." },

    { t: "h", text: "else and finally" },
    { t: "p", html: "<p>Two optional extra blocks complete the picture. <code>else:</code> runs only when <b>no error</b> happened — it is the place for the \"everything went well\" code. <code>finally:</code> runs <b>always</b>, error or not — perfect for clean-up messages or closing things.</p>" },
    { t: "code", code: c`for text in ["8", "zero"]:
    try:
        n = int(text)
    except ValueError:
        print(text, "-> not a number")
    else:
        print(text, "-> doubled is", n * 2)
    finally:
        print("checked", text)`, before: "<p>The loop tries two inputs: one good, one bad. Watch which blocks print for each.</p>", note: "<p>Round by round:</p><ul><li><code>\"8\"</code>: <code>int</code> works, so <code>except</code> is skipped and <code>else</code> runs → <code>8 -&gt; doubled is 16</code>. Then <code>finally</code> → <code>checked 8</code>.</li><li><code>\"zero\"</code>: <code>int</code> fails, so <code>except</code> runs → <code>zero -&gt; not a number</code>. <code>else</code> is skipped. <code>finally</code> still runs → <code>checked zero</code>.</li></ul><p>Why not put the doubling inside <code>try</code>? You could, but keeping <code>try</code> short (only the risky line) makes it clear which line you expect to fail. And <code>finally</code> even runs after a <code>return</code> inside the try — a function cannot leave without passing through it.</p>" },
    { t: "table", head: ["Part", "Runs when"], rows: [["`try`", "always (first)"], ["`except X`", "an error of type X happened"], ["`else`", "no error happened"], ["`finally`", "always, at the end — even after return"]] },
    { t: "ar", html: "else تُنفذ فقط إذا لم يحدث خطأ، و finally تُنفذ دائمًا في النهاية سواء حدث خطأ أم لا، حتى بعد return." },
    { t: "predict", code: c`try:
    x = 10 / 2
except ZeroDivisionError:
    print("A")
else:
    print("B")
finally:
    print("C")`, explain: "<code>10 / 2</code> works fine, so there is no error: <code>except</code> is skipped, <code>else</code> prints <code>B</code>, and <code>finally</code> always prints <code>C</code>. Output: <code>B</code> then <code>C</code>." },

    { t: "h", text: "Ask until valid — the robust way" },
    { t: "p", html: "<p>A common real need: keep asking the user until they type something acceptable. Combine three things you know: a <code>while True</code> loop (Day 8), <code>break</code> to leave it, and <code>try/except</code> to survive bad typing.</p>" },
    { t: "code", code: c`while True:
    try:
        n = int(input("Pick 1-10: "))
        if 1 <= n <= 10:
            break
        print("Out of range")
    except ValueError:
        print("Digits only")
print("You picked", n)`, stdin: "abc\n42\n7", before: "<p>The Input box has three answers, one per line: <code>abc</code>, <code>42</code>, <code>7</code>. Follow the loop round by round.</p>", note: "<p>Round by round:</p><ul><li><code>abc</code>: <code>int()</code> fails → <code>except</code> prints <code>Digits only</code>. The loop starts again.</li><li><code>42</code>: it is a number, but the range check fails → <code>Out of range</code>. Loop again.</li><li><code>7</code>: a number <b>and</b> in range → <code>break</code> leaves the loop.</li><li>The last line prints <code>You picked 7</code>.</li></ul><p>Two different problems, two different checks: <code>try/except</code> handles <b>wrong type</b> of input, the <code>if</code> handles <b>wrong value</b>. The only exit is valid input.</p>" },
    { t: "ar", html: "حلقة while True مع try/except تسأل المستخدم مرارًا حتى يكتب قيمة صحيحة، ثم break للخروج. except تعالج الحروف، و if تعالج الأرقام خارج النطاق." },

    { t: "h", text: "Raising your own errors" },
    { t: "p", html: "<p>Python raises errors when <i>it</i> sees a problem. But sometimes <b>you</b> know a value is wrong even though Python is fine with it — a mark of 150, a negative price. Use <code>raise</code> to report the problem yourself: <code>raise ValueError(\"message\")</code>.</p>" },
    { t: "code", code: c`def set_mark(mark):
    if not 0 <= mark <= 100:
        raise ValueError(f"mark must be 0-100, got {mark}")
    return mark

print(set_mark(95))
print(set_mark(150))`, expectError: true, before: "<p>This one crashes on purpose at the second call. Read the last line of the error.</p>", note: "<p>Line by line:</p><ul><li><code>set_mark(95)</code>: 95 is in range, so the <code>if</code> is False and the function returns 95 → it prints <code>95</code>.</li><li><code>set_mark(150)</code>: the check is True, so <code>raise</code> creates a ValueError with your message and the function stops immediately — it never reaches <code>return</code>.</li><li>Nobody catches it, so the program crashes with <code>ValueError: mark must be 0-100, got 150</code> — <b>your</b> message.</li></ul>" },
    { t: "code", code: c`def set_mark(mark):
    if not 0 <= mark <= 100:
        raise ValueError(f"mark must be 0-100, got {mark}")
    return mark

try:
    set_mark(150)
except ValueError as e:
    print("Problem:", e)`, before: "<p>Same function, but now the caller catches the error.</p>", note: "<p>The function <b>reports</b> the problem with <code>raise</code>; the code that called it <b>decides</b> what to do with <code>try/except</code>. Here it prints <code>Problem: mark must be 0-100, got 150</code> and keeps going. This split is good design: the function does not need to know whether to print, ask again or log — that is the caller's choice.</p>" },
    { t: "ar", html: "raise تطلق خطأ من صنعك عندما تكون القيمة غير منطقية، مثل raise ValueError(\"رسالة\"). الدالة تبلّغ عن المشكلة، ومن يستدعيها يقرر كيف يتعامل معها بـ try/except." },

    { t: "h", text: "Files: writing with \"w\"" },
    { t: "p", html: "<p>To use a file you <b>open</b> it with <code>open(name, mode)</code>. The mode says what you want to do: <code>\"w\"</code> means <b>write</b>. We always open files with <code>with</code>: it opens the file, gives it a name (<code>f</code>), and <b>closes it automatically</b> when the indented block ends — even if an error happens.</p>" },
    { t: "code", code: c`with open("notes.txt", "w") as f:
    f.write("Day 17: files\n")
    f.write("with closes the file for me\n")
print("Saved!")`, before: "<p>Run it. Nothing from the file appears on screen yet — we only wrote to it. We read it in the next example.</p>", note: "<p>Line by line:</p><ul><li><code>open(\"notes.txt\", \"w\")</code> creates the file <code>notes.txt</code> (or <b>empties</b> it if it already exists). <code>as f</code> names the open file <code>f</code>.</li><li><code>f.write(...)</code> puts text into the file. Unlike <code>print</code>, <code>write</code> does <b>not</b> add a new line by itself, so we end each piece with <code>\\n</code>.</li><li>When the indented block ends, <code>with</code> closes the file and everything is safely saved.</li><li><code>print(\"Saved!\")</code> is outside the block: the file is already closed.</li></ul><p>In Py30 files live in the browser's memory while Python is running; on your own computer they are real files next to your program.</p>" },
    { t: "ar", html: "with open(\"اسم\", \"w\") as f تفتح الملف للكتابة وتغلقه تلقائيًا بعد انتهاء الكتلة. انتبه{{g:|ي}}: write لا تضيف سطرًا جديدًا، فأضف{{g:|ي}} \\n بنفسك." },

    { t: "h", text: "Files: reading back" },
    { t: "p", html: "<p>Opening without a mode (or with <code>\"r\"</code>) means <b>read</b>. There are three common ways to read: all the text at once with <code>f.read()</code>, line by line with a <code>for</code> loop, or into a list with <code>f.readlines()</code>.</p>" },
    { t: "code", code: c`with open("notes.txt", "w") as f:
    f.write("Day 17: files\nwith closes the file for me\n")

with open("notes.txt") as f:
    text = f.read()
print(text)`, before: "<p>Each example writes the file first, so it works on its own. Run it and look at the output, including the empty line at the end.</p>", note: "<p>Line by line:</p><ul><li>Lines 1–2 create the file with two lines of text (two <code>\\n</code>).</li><li><code>open(\"notes.txt\")</code> opens it for reading — <code>\"r\"</code> is the default mode.</li><li><code>f.read()</code> returns the <b>whole file as one string</b>, including the <code>\\n</code> characters.</li><li><code>print(text)</code> shows both lines. The extra blank line appears because the text already ends with <code>\\n</code> and <code>print</code> adds another.</li></ul>" },
    { t: "code", code: c`with open("notes.txt", "w") as f:
    f.write("Day 17: files\nwith closes the file for me\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())`, before: "<p>Now read the same file <b>one line at a time</b>.</p>", note: "<p>A file can be looped over like a list: <code>for line in f</code> gives you one line per round. Each <code>line</code> still ends with <code>\\n</code>, so we use <code>.strip()</code> (Day 4) to remove it — otherwise every line would be followed by an empty line. This is the most common way to process a file, because it works even for huge files.</p>" },
    { t: "code", code: c`with open("notes.txt", "w") as f:
    f.write("Day 17: files\nwith closes the file for me\n")

with open("notes.txt") as f:
    lines = f.readlines()
print(lines)
print(len(lines), "lines")`, before: "<p>The third way: get all lines as a list.</p>", note: "<p><code>f.readlines()</code> returns a <b>list of strings</b>, one per line: <code>['Day 17: files\\n', 'with closes the file for me\\n']</code>. Notice the <code>\\n</code> at the end of each item. Because it is a normal list, you can use <code>len()</code>, indexing and everything from Day 10. Another handy option is <code>f.read().splitlines()</code>, which gives the same list <b>without</b> the <code>\\n</code>.</p>" },
    { t: "ar", html: "للقراءة افتح{{g:|ي}} الملف بدون وضع (الوضع الافتراضي \"r\"). read() تعطي النص كاملًا، و for line in f تقرأ سطرًا سطرًا (استخدم{{g:|ي}} strip لإزالة \\n)، و readlines() تعطي قائمة من الأسطر." },

    { t: "h", text: "Files: appending with \"a\" — and the \"w\" trap" },
    { t: "p", html: "<p>Here is the most dangerous detail about files: <code>\"w\"</code> <b>erases</b> the file the moment it opens it. To <b>add</b> to the end of a file and keep what is already there, use <code>\"a\"</code> (append).</p>" },
    { t: "code", code: c`with open("log.txt", "w") as f:
    f.write("first\n")
with open("log.txt", "a") as f:
    f.write("second\n")
with open("log.txt", "w") as f:
    f.write("third\n")
with open("log.txt") as f:
    print(f.read())`, before: "<p>Three opens in a row. Predict what the file contains at the end, then run.</p>", note: "<p>Step by step:</p><ul><li>Open with <code>\"w\"</code>: the file now holds <code>first</code>.</li><li>Open with <code>\"a\"</code>: <code>second</code> is added at the end → <code>first</code>, <code>second</code>.</li><li>Open with <code>\"w\"</code> again: the file is <b>wiped</b> and then gets <code>third</code>.</li></ul><p>The output is only <code>third</code>. Rule of thumb: use <code>\"w\"</code> when you want to save a fresh copy, <code>\"a\"</code> when you are adding entries to a log or diary.</p>" },
    { t: "table", head: ["Mode", "Meaning"], rows: [["`\"r\"`", "read (default) — error if the file doesn't exist"], ["`\"w\"`", "write — creates or <b>erases</b> the file"], ["`\"a\"`", "append — adds to the end (creates the file if needed)"]] },
    { t: "ar", html: "الوضع \"w\" يمسح محتوى الملف فور فتحه، أما \"a\" فيضيف إلى نهايته ويحافظ على القديم. استخدم{{g:|ي}} \"a\" للسجلات والمذكرات." },

    { t: "h", text: "When the file is missing" },
    { t: "p", html: "<p>Reading a file that does not exist raises <code>FileNotFoundError</code>. This is exactly where your new <code>try/except</code> skill meets files: the first time a program runs, its save file often does not exist yet.</p>" },
    { t: "code", code: c`try:
    with open("high_score.txt") as f:
        best = int(f.read())
except FileNotFoundError:
    best = 0
print("High score:", best)`, before: "<p>There is no <code>high_score.txt</code> yet. Run it and see that the program still works.</p>", note: "<p>Line by line:</p><ul><li><code>open(\"high_score.txt\")</code> tries to read a file that is not there → <code>FileNotFoundError</code>.</li><li>Python jumps to the <code>except</code> block and uses a sensible default: <code>best = 0</code>.</li><li>The last line prints <code>High score: 0</code>.</li></ul><p>On a later run, once the game has saved a score, the <code>try</code> block would succeed and read it. Notice <code>int(f.read())</code>: text from a file is always a <b>string</b>, so numbers must be converted.</p>" },
    { t: "ar", html: "قراءة ملف غير موجود تسبب FileNotFoundError. عالج{{g:|ي}}ها بـ try/except وضع{{g:|ي}} قيمة افتراضية. وتذكر{{g:|ي}} أن كل ما يُقرأ من الملف نص، فحوّل{{g:|ي}} الأرقام بـ int أو float." },

    { t: "h", text: "CSV: tables in text" },
    { t: "p", html: "<p>A <b>CSV</b> file (Comma-Separated Values) is a table saved as plain text: one row per line, columns separated by commas. Excel and Google Sheets open it directly. Python has a built-in <code>csv</code> module (remember modules from Day 16) that writes and reads it correctly for you.</p>" },
    { t: "code", code: c`import csv
rows = [["name", "mark"], ["Sara", 95], ["Omar", 82], ["Lina", 90]]
with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows(rows)

with open("marks.csv") as f:
    print(f.read())`, before: "<p>First, write a small table and look at the raw text that was saved.</p>", note: "<p>Line by line:</p><ul><li><code>rows</code> is a list of lists: the first inner list is the <b>header</b>, the others are data rows.</li><li><code>newline=\"\"</code> is a small rule of the csv module: it stops extra blank lines appearing between rows on Windows. Always add it when writing CSV.</li><li><code>csv.writer(f)</code> makes a writer for the file, and <code>.writerows(rows)</code> writes every inner list as one line, with commas between the values.</li><li>Reading the file back shows plain text: <code>name,mark</code>, <code>Sara,95</code>, and so on.</li></ul>" },
    { t: "code", code: c`import csv
with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows([["name", "mark"], ["Sara", 95], ["Omar", 82], ["Lina", 90]])

total = 0
with open("marks.csv") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["mark"])
        total += int(row["mark"])
print("Average:", total / 3)`, before: "<p>Now read the table back, row by row, and compute the average.</p>", note: "<p>Line by line:</p><ul><li><code>csv.DictReader(f)</code> reads the header line and then turns each following row into a <b>dictionary</b> (Day 12): <code>{'name': 'Sara', 'mark': '95'}</code>.</li><li>So you can write <code>row[\"name\"]</code> instead of remembering column positions.</li><li>Look closely: <code>'95'</code> has quotes. Every value read from a CSV is a <b>string</b>, so we convert with <code>int(row[\"mark\"])</code> before adding.</li><li>The total is 267, and <code>267 / 3</code> is <code>89.0</code>.</li></ul>" },
    { t: "ar", html: "ملف CSV جدول محفوظ كنص، الأعمدة مفصولة بفواصل. للكتابة استخدم{{g:|ي}} csv.writer مع newline=\"\"، وللقراءة csv.DictReader الذي يحوّل كل صف إلى قاموس. كل القيم المقروءة نصوص، فحوّل{{g:|ي}} الأرقام." },

    { t: "h", text: "Putting it together: a marks file that survives bad data" },
    { t: "code", code: c`with open("marks.txt", "w") as f:
    f.write("95\n82\nabsent\n90\n")

marks = []
try:
    with open("marks.txt") as f:
        for line in f:
            try:
                marks.append(int(line))
            except ValueError:
                print("Skipped:", line.strip())
except FileNotFoundError:
    print("No marks file yet")

if marks:
    print("Average:", round(sum(marks) / len(marks), 1))`, together: true, before: "<p>This small program saves marks to a file, reads them back, skips a bad line, and copes with a missing file. Read it first and predict the output, then run it. Then try deleting lines 1–2 and changing the file name in line 6 to see the missing-file branch.</p>", note: "<p>How it works:</p><ul><li>Lines 1–2 <b>write</b> four lines with <code>\"w\"</code>. One of them, <code>absent</code>, is not a number — real data is often messy.</li><li>The <b>outer</b> <code>try</code> protects the whole reading part: if the file is missing, we print a message instead of crashing.</li><li>Inside, <code>for line in f</code> reads one line at a time. The <b>inner</b> <code>try</code> converts each line; <code>int(\"95\\n\")</code> works because <code>int</code> ignores surrounding spaces and new lines.</li><li><code>int(\"absent\\n\")</code> fails, so the inner <code>except</code> prints <code>Skipped: absent</code> and the loop simply moves on to the next line.</li><li>Finally, <code>if marks:</code> makes sure the list is not empty (no division by zero) and prints <code>Average: 89.0</code>.</li></ul><p>Notice the two levels of protection: one for the file, one for each line. Each <code>try</code> wraps only the part that can fail in that way.</p>" },
    { t: "ar", html: "جمعنا كل شيء: كتابة ملف، قراءته سطرًا سطرًا، تجاهل السطر غير الصالح بـ try/except داخلية، ومعالجة غياب الملف بـ try/except خارجية. اجعل{{g:|ي}} كل try تحيط فقط بالجزء الذي قد يفشل." },
  ],
  mistakes: [
    { title: "A bare except hides bugs", html: "It also catches typos in your own code, so you never see them.", wrong: c`try:
    x = int(input())
except:
    print("error")`, right: c`try:
    x = int(input())
except ValueError:
    print("Please type a number")` },
    { title: "\"w\" erases the file", html: "Opening with <code>\"w\"</code> deletes the old contents immediately. Use <code>\"a\"</code> to add.", wrong: c`open("log.txt", "w").write("new entry\n")`, right: c`with open("log.txt", "a") as f:
    f.write("new entry\n")` },
    { title: "Forgetting the \\n", html: "<code>write</code> does not add a new line like <code>print</code> does.", wrong: c`f.write("line 1")
f.write("line 2")   # line 1line 2`, right: c`f.write("line 1\n")
f.write("line 2\n")`, ar: "write لا تضيف سطرًا جديدًا تلقائيًا، أضف{{g:|ي}} \\n بنفسك." },
  ],
  tricks: [
    { title: "print into a file", html: "", code: c`with open("out.txt", "w") as f:
    print("Hello file", 2026, file=f)
print(open("out.txt").read())` },
    { title: "JSON saves dicts and lists", html: "", code: c`import json
data = {"name": "{{name}}", "scores": [95, 88]}
with open("data.json", "w") as f:
    json.dump(data, f)
with open("data.json") as f:
    print(json.load(f)["scores"])` },
  ],
  practice: [
    { t: "predict", code: c`try:
    print("A")
    x = 1 / 0
    print("B")
except ZeroDivisionError:
    print("C")
finally:
    print("D")`, explain: "<code>A C D</code> — B is skipped because the error jumps straight to except." },
    { t: "predict", code: c`items = [1, 2, 3]
try:
    print(items[5])
except IndexError as e:
    print("Oops:", e)`, explain: "<code>Oops: list index out of range</code>" },
    { t: "parsons", title: "Save and count", prompt: "Write three names to a file, then read it back and print how many lines it has.", lines: [c`with open("names.txt", "w") as f:`, c`    f.write("Sara\nOmar\nLina\n")`, c`with open("names.txt") as f:`, "    lines = f.readlines()", "print(len(lines))"], distractors: [c`with open("names.txt", "a") as f:`], explain: "Result: <code>3</code>." },
    { t: "try", title: "Diary", html: "<p>A tiny diary: each run appends the Input line to <code>diary.txt</code> and shows all entries. Run it several times with different inputs.</p>", code: c`entry = input("Today's entry: ")
with open("diary.txt", "a") as f:
    f.write(entry + "\n")
with open("diary.txt") as f:
    print(f.read())`, stdin: "Learned try/except today" },
  ],
  exercises: [
    { id: "safeint", lvl: "seed", title: "to_int(text)", prompt: "<p>Write <code>to_int(text)</code> that returns the integer, or <code>None</code> if the text is not a valid whole number.</p>", starter: "def to_int(text):\n    pass\n", tests: [{ after: "print(to_int('42'), to_int('abc'), to_int('3.5'), to_int(' 7 '))", expected: "42 None None 7" }],
      solutions: [{ name: "try/except", code: c`def to_int(text):
    try:
        return int(text)
    except ValueError:
        return None`, note: "Notice <code>int(\" 7 \")</code> works — int ignores surrounding spaces." }, { name: "isdigit check", code: c`def to_int(text):
    t = text.strip()
    if t.lstrip("-").isdigit():
        return int(t)
    return None`, note: "\"Look before you leap\" vs try/except's \"easier to ask forgiveness\". Pythonistas usually prefer try/except." }] },
    { id: "robust", lvl: "seed", title: "Robust average", prompt: "<p>Read values until <code>done</code>. Skip anything that isn't a number (print <code>Skipped: X</code>). Print the average with 1 decimal, or <code>No numbers</code>.</p>", tests: [{ stdin: "80\nabc\n90.5\n\ndone", expected: "Skipped: abc\nSkipped: \nAverage: 85.2" }, { stdin: "x\ndone", expected: "Skipped: x\nNo numbers" }],
      solutions: [{ name: "try in loop", code: c`nums = []
while True:
    line = input()
    if line == "done":
        break
    try:
        nums.append(float(line))
    except ValueError:
        print("Skipped:", line)
if nums:
    print(f"Average: {sum(nums) / len(nums):.1f}")
else:
    print("No numbers")` }] },
    { id: "wc", lvl: "star", title: "File statistics", prompt: "<p>Write <code>file_stats(path)</code> that returns a tuple <code>(lines, words, characters)</code> for a text file, or <code>None</code> if the file doesn't exist.</p>", starter: "def file_stats(path):\n    pass\n", tests: [{ after: "open('t.txt','w').write('hello world\\npython is fun\\n')\nprint(file_stats('t.txt'))\nprint(file_stats('missing.txt'))", expected: "(2, 5, 26)\nNone" }],
      solutions: [{ name: "Read all", code: c`def file_stats(path):
    try:
        with open(path) as f:
            text = f.read()
    except FileNotFoundError:
        return None
    return (len(text.splitlines()), len(text.split()), len(text))` }] },
    { id: "log", lvl: "star", title: "Append to a log", prompt: "<p>Write <code>add_log(path, message)</code> that appends <code>message</code> as a new line, and <code>read_log(path)</code> that returns the list of lines (without <code>\\n</code>), or an empty list if the file is missing.</p>", starter: "def add_log(path, message):\n    pass\n\ndef read_log(path):\n    pass\n", tests: [{ after: "import os\nif os.path.exists('app.log'): os.remove('app.log')\nprint(read_log('app.log'))\nadd_log('app.log', 'start')\nadd_log('app.log', 'login Sara')\nprint(read_log('app.log'))", expected: "[]\n['start', 'login Sara']" }],
      solutions: [{ name: "a mode + splitlines", code: c`def add_log(path, message):
    with open(path, "a") as f:
        f.write(message + "\n")

def read_log(path):
    try:
        with open(path) as f:
            return f.read().splitlines()
    except FileNotFoundError:
        return []` }] },
    { id: "csvtop", lvl: "fire", title: "CSV report", prompt: "<p>Write <code>report(path)</code> for a CSV with columns <code>name,course,mark</code>. Return a dict mapping each course to its average mark (rounded to 1 decimal). Rows with an invalid mark are ignored.</p>", starter: "import csv\n\ndef report(path):\n    pass\n", tests: [{ after: "open('m.csv','w').write('name,course,mark\\nSara,CS101,95\\nOmar,CS101,80\\nLina,IS201,88\\nNora,IS201,absent\\nFaisal,IS201,91\\n')\nprint(report('m.csv'))", expected: "{'CS101': 87.5, 'IS201': 89.5}" }],
      solutions: [{ name: "DictReader + dict of lists", code: c`import csv

def report(path):
    marks = {}
    with open(path) as f:
        for row in csv.DictReader(f):
            try:
                m = float(row["mark"])
            except ValueError:
                continue
            marks.setdefault(row["course"], []).append(m)
    return {course: round(sum(v) / len(v), 1) for course, v in marks.items()}` }] },
    { id: "raise", lvl: "fire", title: "Validated transfer", prompt: "<p>Write <code>transfer(balance, amount)</code> that returns the new balance. Raise <code>ValueError(\"amount must be positive\")</code> if amount ≤ 0, and <code>ValueError(\"insufficient funds\")</code> if amount > balance.</p>", starter: "def transfer(balance, amount):\n    pass\n", tests: [{ after: "print(transfer(100, 30))\nfor a in (0, 500):\n    try:\n        transfer(100, a)\n    except ValueError as e:\n        print(e)", expected: "70\namount must be positive\ninsufficient funds" }],
      solutions: [{ name: "Guards with raise", code: c`def transfer(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount > balance:
        raise ValueError("insufficient funds")
    return balance - amount`, note: "The function doesn't print or decide what to do about the problem — it <b>reports</b> it, and the caller decides. That separation is good design." }] },
    { id: "fix17", lvl: "fire", debug: true, title: "The file that forgets", prompt: "<p><code>save_scores</code> should add scores to <code>scores.txt</code> and <code>best()</code> should return the highest. Expected: <code>95</code>.</p>", starter: c`def save_scores(scores):
    for s in scores:
        with open("scores.txt", "w") as f:
            f.write(s)

def best():
    with open("scores.txt") as f:
        return max(f.readlines())`, tests: [{ after: "import os\nif os.path.exists('scores.txt'): os.remove('scores.txt')\nsave_scores([80, 95])\nsave_scores([9])\nprint(best())", expected: "95" }],
      ar: "ثلاثة أخطاء: وضع الكتابة يمسح الملف، write تحتاج نصًا وسطرًا جديدًا، والمقارنة بين نصوص وليست أرقامًا ('9' أكبر من '95' نصيًا!).",
      solutions: [{ name: "Fixed", code: c`def save_scores(scores):
    with open("scores.txt", "a") as f:
        for s in scores:
            f.write(f"{s}\n")

def best():
    with open("scores.txt") as f:
        return max(int(line) for line in f)` }] },
  ],
  quiz: [
    { q: "When does `finally` run?", o: ["Only on error", "Only without error", "Always", "Never after return"], a: 2, e: "Always, even after return." },
    { q: "`int(\"12a\")` raises…", o: ["TypeError", "ValueError", "NameError", "KeyError"], a: 1, e: "Right type (str), wrong content." },
    { q: "Which mode adds to the end of a file?", o: ["`\"r\"`", "`\"w\"`", "`\"a\"`", "`\"x\"`"], a: 2, e: "Append." },
    { q: "Why use `with open(...)`?", o: ["It's faster", "It closes the file automatically", "It reads CSV", "It's required"], a: 1, e: "Even if an error happens." },
    { q: "Values read from a CSV file are…", o: ["numbers", "strings", "lists", "auto-detected"], a: 1, e: "Convert them yourself." },
  ],
  puzzle: { title: "Exception flow", q: "<p>What does this print? Write the letters in order, without spaces.</p>", code: c`def f():
    try:
        return "A"
    finally:
        print("B", end="")
print(f())`, answers: ["ba"], hint: "finally runs before the function really leaves.", ar: "finally تنفذ قبل أن ترجع الدالة فعليًا.", e: "The <code>finally</code> block prints <code>B</code> before the return value <code>A</code> reaches the outer print: <code>BA</code>." },
  cards: [
    { f: "try/except basic shape", b: "`try:` risky code `except ValueError:` fallback." },
    { f: "Why not a bare `except:`?", b: "It hides real bugs. Catch specific exceptions." },
    { f: "File modes r / w / a", b: "read / write (erases) / append." },
    { f: "Read a file line by line", b: "`with open(p) as f:` `for line in f:` `line.strip()`" },
    { f: "Raise an error", b: "`raise ValueError(\"message\")`" },
  ],
};
})();

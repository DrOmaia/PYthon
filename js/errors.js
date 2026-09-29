/* Py30 error translator: turns Python errors into friendly lessons */
(function () {
  const T = s => Py30.T(s), esc = s => Py30.esc(s);

  // Each rule: test(info) -> bool, then title/en/ar/fix/wrong/right (can be functions of info)
  const RULES = [
    { t: i => i.type === "NeedMoreInput",
      title: "Your program is waiting for input",
      en: "The code called <code>input()</code> more times than there are lines in the <b>Input</b> box. Each <code>input()</code> reads one line.",
      ar: "كل <code>input()</code> يقرأ سطرًا واحدًا من صندوق Input. اكتب{{g:|ي}} قيمة في سطر جديد لكل input.",
      fix: "Open the <b>Input</b> box under the editor and type one value per line, then run again." },
    { t: i => i.type === "TooMuchOutput",
      title: "Too much output — probably an infinite loop",
      en: "Your program printed thousands of characters. Usually a loop never stops because its condition never becomes <code>False</code>.",
      ar: "غالبًا عندك حلقة لا تنتهي. تأكد{{g:|ي}} أن المتغير في الشرط يتغير داخل الحلقة.",
      fix: "Check the loop condition and make sure something inside the loop moves it toward stopping." },
    { t: i => i.type === "Timeout",
      title: "Your code took too long",
      en: "Python was stopped after a few seconds. This is almost always a loop that never ends (for example <code>while True</code> with no <code>break</code>, or a counter that never changes).",
      ar: "توقف البرنامج لأنه أخذ وقتًا طويلًا جدًا. ابحث{{g:|ي}} عن حلقة لا تتوقف.",
      fix: "Use the Visualize button on a smaller version to watch the loop variable step by step." },
    { t: i => i.type === "SyntaxError" && /never closed/.test(i.msg),
      title: "A bracket was opened but never closed",
      en: "Every <code>(</code> needs a matching <code>)</code>, every <code>[</code> a <code>]</code> and every <code>{</code> a <code>}</code>. Python reached the end and a bracket was still open.",
      ar: "فتحت{{g:|ِ}} قوسًا ولم تغلقه{{g:|ي}}. عدّ{{g:|ي}} الأقواس المفتوحة والمغلقة في السطر.",
      fix: "Count the brackets on the highlighted line and add the missing closing one.",
      wrong: 'print("Hello"', right: 'print("Hello")' },
    { t: i => i.type === "SyntaxError" && /unterminated string|EOL while scanning/.test(i.msg),
      title: "A text (string) was not closed",
      en: "Text in Python must start and end with the same quote mark. One of your strings starts with a quote but never ends.",
      ar: "النص يجب أن يبدأ وينتهي بنفس علامة التنصيص. نسيت{{g:|ِ}} علامة الإغلاق.",
      fix: "Add the closing quote. Use the same kind: <code>\"...\"</code> or <code>'...'</code>.",
      wrong: 'print("Hello)', right: 'print("Hello")' },
    { t: i => i.type === "SyntaxError" && /expected ':'/.test(i.msg),
      title: "Missing colon <code>:</code>",
      en: "Lines that start a block — <code>if</code>, <code>elif</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>class</code> — must end with a colon.",
      ar: "أي سطر يبدأ بلوك (if / for / while / def) لازم ينتهي بنقطتين <code>:</code>.",
      fix: "Add <code>:</code> at the end of the highlighted line.",
      wrong: "if age > 18\n    print(\"Adult\")", right: "if age > 18:\n    print(\"Adult\")" },
    { t: i => i.type === "SyntaxError" && /invalid syntax\. Maybe you meant '==' or ':=' instead of '='/.test(i.msg) || (i.type === "SyntaxError" && /cannot assign to/.test(i.msg) && /\bif\b|\bwhile\b|\belif\b/.test(i.src || "")),
      title: "Use <code>==</code> to compare, not <code>=</code>",
      en: "One <code>=</code> <b>stores</b> a value in a variable. Two <code>==</code> <b>ask a question</b>: are these equal?",
      ar: "علامة = واحدة للتخزين، و == للمقارنة. في الشرط نستخدم ==.",
      fix: "Change <code>=</code> to <code>==</code> inside the condition.",
      wrong: "if x = 5:", right: "if x == 5:" },
    { t: i => i.type === "SyntaxError" && /Missing parentheses in call to 'print'/.test(i.msg),
      title: "print needs parentheses",
      en: "In Python 3, <code>print</code> is a function, so what you print goes inside <code>( )</code>.",
      ar: "في بايثون 3 لازم نكتب print مع أقواس.",
      wrong: 'print "Hi"', right: 'print("Hi")' },
    { t: i => i.type === "SyntaxError" && /invalid decimal literal/.test(i.msg),
      title: "A name cannot start with a number",
      en: "Variable names can contain digits, but cannot <b>start</b> with one. Also check you did not glue a number to a word, like <code>2x</code>.",
      ar: "اسم المتغير لا يبدأ برقم. ولو قصدت{{g:|ِ}} الضرب اكتب{{g:|ي}} 2 * x.",
      wrong: "1st_name = \"Sara\"\ny = 2x", right: "first_name = \"Sara\"\ny = 2 * x" },
    { t: i => i.type === "SyntaxError" && /invalid character/.test(i.msg),
      title: "A strange character sneaked in",
      en: "There is a character Python does not understand — often curly quotes <code>“ ”</code> copied from a document, or an Arabic comma <code>،</code>.",
      ar: "يوجد حرف غريب، غالبًا علامات تنصيص منسوخة من وورد أو فاصلة عربية. استخدم{{g:|ي}} الكيبورد الإنجليزي.",
      fix: "Retype the quotes and commas using the English keyboard." },
    { t: i => i.type === "IndentationError" || i.type === "TabError",
      title: "Indentation problem (spaces at the start of the line)",
      en: "Python uses the spaces at the start of a line to know which lines belong to a block. Lines inside <code>if</code>, <code>for</code>, <code>while</code> or <code>def</code> must be indented by the same amount (4 spaces is the standard). Lines that are not in a block must not be indented.",
      ar: "المسافات في أول السطر لها معنى في بايثون! الأسطر داخل if أو for لازم تكون مزاحة 4 مسافات، والأسطر العادية بدون إزاحة.",
      fix: "Make all lines of the same block start at the same column. After a line ending in <code>:</code>, indent the next line.",
      wrong: "if score > 50:\nprint(\"Pass\")", right: "if score > 50:\n    print(\"Pass\")" },
    { t: i => i.type === "SyntaxError",
      title: "Python could not read this line (SyntaxError)",
      en: i => `Python stopped before running anything because the grammar of a line is wrong. Its message: <code>${esc(i.msg)}</code>. Look closely at the highlighted line <b>and the line just before it</b>.`,
      ar: "خطأ في كتابة الكود نفسه (القواعد). راجع{{g:|ي}} السطر المظلل والسطر الذي قبله: أقواس، علامات تنصيص، نقطتان.",
      fix: "Check brackets, quotes, colons and commas." },
    { t: i => i.type === "NameError",
      title: i => { const m = /name '(.+?)' is not defined/.exec(i.msg); return `Python does not know the name <code>${esc(m ? m[1] : "?")}</code>`; },
      en: i => { const m = /name '(.+?)' is not defined/.exec(i.msg); const n = m ? m[1] : "that name";
        return `You used <code>${esc(n)}</code> but Python has never seen it. Three usual reasons: <b>(1)</b> a typo — names are case-sensitive, <code>Name</code> ≠ <code>name</code>; <b>(2)</b> you meant text and forgot the quotes, like <code>"${esc(n)}"</code>; <b>(3)</b> you used the variable before the line that creates it.`; },
      ar: "بايثون لا يعرف هذا الاسم. تأكد{{g:|ي}} من التهجئة والحروف الكبيرة والصغيرة، أو ربما نسيت{{g:|ِ}} علامات التنصيص حول النص.",
      wrong: "print(Hello)\nprint(score)\nscore = 10", right: "print(\"Hello\")\nscore = 10\nprint(score)" },
    { t: i => i.type === "TypeError" && /can only concatenate str|must be str, not|unsupported operand type\(s\) for \+: 'int' and 'str'/.test(i.msg),
      title: "Mixing text and numbers with <code>+</code>",
      en: "<code>+</code> between two numbers adds them; between two strings it glues them. Python refuses to <code>+</code> a string with a number because it does not know which one you want.",
      ar: "لا يمكن جمع نص مع رقم بعلامة +. حوّل{{g:|ي}} الرقم لنص بـ str() أو استخدم{{g:|ي}} f-string، أو حوّل{{g:|ي}} النص لرقم بـ int().",
      fix: "Use an f-string: <code>f\"Age: {age}\"</code>, or convert with <code>str(age)</code> / <code>int(text)</code>.",
      wrong: "age = 19\nprint(\"Age: \" + age)", right: "age = 19\nprint(f\"Age: {age}\")" },
    { t: i => i.type === "TypeError" && /'str' and 'int'|'int' and 'str'|'str' and 'float'|'float' and 'str'/.test(i.msg),
      title: "Doing math on text",
      en: "One of the values is a <b>string</b> (text), not a number. Remember: <code>input()</code> always gives you text, even if the user types digits.",
      ar: "input() يرجع نصًا دائمًا. حوّل{{g:|ي}} القيمة لرقم بـ int() أو float() قبل الحساب.",
      wrong: "n = input(\"Number: \")\nprint(n * 2 - 1)", right: "n = int(input(\"Number: \"))\nprint(n * 2 - 1)" },
    { t: i => i.type === "TypeError" && /not callable/.test(i.msg),
      title: "Calling something that is not a function",
      en: "You wrote <code>( )</code> after something that is not a function. Common cause: you named a variable like a built-in function (for example <code>print = 5</code> or <code>input = ...</code>), or you forgot an operator: <code>2(3)</code> instead of <code>2 * 3</code>.",
      ar: "استخدمت{{g:|ِ}} أقواس بعد شيء ليس دالة. لا تسمّ{{g:|ي}} متغيراتك بأسماء مثل print أو input أو sum.",
      wrong: "total = 2(3 + 4)", right: "total = 2 * (3 + 4)" },
    { t: i => i.type === "TypeError" && /missing \d+ required positional argument|takes \d+ positional argument/.test(i.msg),
      title: "Wrong number of arguments",
      en: i => `The function was called with a different number of values than it expects. Python says: <code>${esc(i.msg)}</code>.`,
      ar: "عدد القيم التي أرسلتها للدالة لا يساوي عدد المعاملات في تعريفها.",
      wrong: "def greet(name, city):\n    print(name, city)\ngreet(\"Sara\")", right: "def greet(name, city):\n    print(name, city)\ngreet(\"Sara\", \"Riyadh\")" },
    { t: i => i.type === "TypeError",
      title: "A value has the wrong type (TypeError)",
      en: i => `An operation got a type of value it cannot work with. Python says: <code>${esc(i.msg)}</code>. Print the values with <code>type()</code> to see what they really are.`,
      ar: "نوع البيانات غير مناسب للعملية. جرّب{{g:|ي}} print(type(x)) لتعرف{{g:|ي}} النوع الحقيقي." },
    { t: i => i.type === "ValueError" && /invalid literal for int\(\)/.test(i.msg),
      title: "This text cannot become a whole number",
      en: i => { const m = /: '(.*)'$/.exec(i.msg); return `<code>int()</code> only understands whole-number text like <code>"42"</code>. It received <code>${esc(m ? "'" + m[1] + "'" : "something else")}</code>. Decimals like <code>"3.5"</code> need <code>float()</code>; empty text or letters cannot be converted.`; },
      ar: "int() يحول نصًا فيه رقم صحيح فقط. لو فيه كسر عشري استخدم{{g:|ي}} float()، وتأكد{{g:|ي}} من القيمة في صندوق Input.",
      wrong: "x = int(\"3.5\")", right: "x = float(\"3.5\")" },
    { t: i => i.type === "ValueError",
      title: "The value has the right type but a wrong content (ValueError)",
      en: i => `Python says: <code>${esc(i.msg)}</code>. The type is fine, but the value itself does not make sense for this operation.`,
      ar: "نوع القيمة صحيح لكن محتواها غير مناسب للعملية." },
    { t: i => i.type === "ZeroDivisionError",
      title: "Division by zero",
      en: "Math does not allow dividing by zero, and neither does Python (this includes <code>%</code> and <code>//</code>).",
      ar: "لا يمكن القسمة على صفر. تحقق{{g:|ي}} من المقام قبل القسمة باستخدام if.",
      wrong: "avg = total / count", right: "if count != 0:\n    avg = total / count" },
    { t: i => i.type === "IndexError",
      title: "Index out of range",
      en: "You asked for a position that does not exist. Positions start at <b>0</b>, so a list or string with 3 items has indexes 0, 1, 2 — and the last index is <code>len(x) - 1</code>.",
      ar: "العد في بايثون يبدأ من صفر! آخر عنصر رقمه len - 1، أو استخدم{{g:|ي}} [-1].",
      wrong: "names = [\"Sara\", \"Omar\", \"Lina\"]\nprint(names[3])", right: "names = [\"Sara\", \"Omar\", \"Lina\"]\nprint(names[2])   # or names[-1]" },
    { t: i => i.type === "KeyError",
      title: i => `The key ${esc(i.msg)} is not in the dictionary`,
      en: "You looked up a key that the dictionary does not have. Keys are exact: <code>\"Name\"</code> and <code>\"name\"</code> are different.",
      ar: "المفتاح غير موجود في القاموس. استخدم{{g:|ي}} .get() أو تحقق{{g:|ي}} بـ in أولًا.",
      wrong: "ages = {\"sara\": 19}\nprint(ages[\"Sara\"])", right: "ages = {\"sara\": 19}\nprint(ages.get(\"Sara\", \"not found\"))" },
    { t: i => i.type === "AttributeError",
      title: "This type does not have that method or attribute",
      en: i => `Python says: <code>${esc(i.msg)}</code>. Check the spelling and the type of the value — for example strings have <code>.upper()</code> but numbers do not, and lists use <code>.append()</code>, not <code>.add()</code>.`,
      ar: "الدالة (method) غير موجودة لهذا النوع. تحقق{{g:|ي}} من التهجئة ومن نوع المتغير." },
    { t: i => i.type === "UnboundLocalError",
      title: "Using a variable inside a function before giving it a value",
      en: "Inside a function you changed a variable that also exists outside. Python treats it as a new local variable, so reading it before assigning fails. Pass it as a parameter and <code>return</code> the new value instead.",
      ar: "المتغير داخل الدالة يعتبر محليًا. مرّر{{g:|ي}} القيمة كمعامل وأرجع{{g:|ي}} النتيجة بـ return." },
    { t: i => i.type === "RecursionError",
      title: "A function called itself forever",
      en: "A recursive function needs a <b>base case</b> that stops it, and each call must move closer to that case.",
      ar: "الدالة تستدعي نفسها بلا توقف. لازم حالة توقف (base case)." },
    { t: i => i.type === "ModuleNotFoundError",
      title: "This library is not available here",
      en: "Py30 includes the standard library plus <code>numpy</code> and <code>scikit-learn</code>. Other libraries need a normal Python install on your computer.",
      ar: "هذه المكتبة غير متوفرة في الموقع." },
    { t: i => i.type === "FileNotFoundError",
      title: "File not found",
      en: "The file does not exist yet. In Py30 files live in a small memory storage: create the file with <code>open(name, \"w\")</code> in the same program before reading it.",
      ar: "الملف غير موجود. أنشئ{{g:|ي}} الملف أولًا بالكتابة عليه ثم اقرأه." },
    { t: () => true,
      title: i => `${esc(i.type)}`,
      en: i => `Python says: <code>${esc(i.msg)}</code>. Read the message carefully — it usually names exactly what went wrong.`,
      ar: "اقرأ{{g:|ي}} رسالة الخطأ بهدوء، غالبًا تخبرك بالمشكلة بالضبط." },
  ];

  const val = (x, i) => (typeof x === "function" ? x(i) : x);

  function explain(info) {
    const r = RULES.find(r => { try { return r.t(info); } catch (e) { return false; } });
    const where = info.line ? `<div class="where">Line ${info.line}${info.func && info.func !== "<module>" ? ` (inside ${esc(info.func)}())` : ""}: ${esc(info.src || info.text || "")}</div>` : "";
    const raw = ["NeedMoreInput", "TooMuchOutput", "Timeout"].includes(info.type) ? "" : `<p class="muted" style="font-size:.85rem;margin:6px 0 0">Python's message: <code>${esc(info.type)}: ${esc(info.msg)}</code></p>`;
    let ex = "";
    if (r.wrong) ex = `<div class="two-col" style="margin-top:8px"><div><span class="label-wrong">✗ Wrong</span><pre class="code-static">${esc(r.wrong)}</pre></div><div><span class="label-right">✓ Right</span><pre class="code-static">${esc(r.right)}</pre></div></div>`;
    return `<div class="err-card" role="alert"><h4>${val(r.title, info)}</h4>${where}<p>${val(r.en, info)}</p>
      ${r.fix ? `<p><b>How to fix:</b> ${val(r.fix, info)}</p>` : ""}${ex}
      <div class="callout hint-ar" style="margin:10px 0 0"><div class="ar">💡 ${T(val(r.ar, info))}</div></div>${raw}</div>`;
  }

  // ---- Output comparison ----
  const norm = s => String(s).replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");

  function markWS(s) { return esc(s).replace(/ /g, "<span class=\"ws\">·</span>"); }

  function diffHints(exp, got) {
    const hints = [];
    const E = norm(exp), G = norm(got);
    if (!G) { hints.push("Your program printed nothing. Did you forget <code>print()</code>?"); return hints; }
    if (E.toLowerCase() === G.toLowerCase()) hints.push("Only uppercase / lowercase letters are different. Python cares about capital letters.");
    if (E.replace(/\s+/g, "") === G.replace(/\s+/g, "")) hints.push("The characters are right but the spaces or line breaks are different. Remember: <code>print(a, b)</code> puts one space between values; <code>sep=\"\"</code> or an f-string gives you full control.");
    if (/\d\.0\b/.test(G) && !/\d\.0\b/.test(E)) hints.push("You print a float like <code>5.0</code> where a whole number is expected. <code>/</code> always gives a float; use <code>//</code> or <code>int()</code>.");
    if (/\d\.0\b/.test(E) && !/\d\.0\b/.test(G)) hints.push("A decimal number like <code>5.0</code> is expected. Try <code>/</code> instead of <code>//</code>, or <code>float()</code>.");
    const el = E.split("\n"), gl = G.split("\n");
    if (el.length !== gl.length) hints.push(`Expected ${el.length} line(s) of output but got ${gl.length}. Each <code>print()</code> makes one line.`);
    if (/['"]/.test(G) && !/['"]/.test(E)) hints.push("Quote marks appear in your output. Print the value itself, not a list or <code>repr</code> of it.");
    if (!hints.length) hints.push("Compare the two columns line by line — the first different line is highlighted.");
    return hints;
  }

  function diffHTML(exp, got) {
    const el = norm(exp).split("\n"), gl = norm(got).split("\n");
    const n = Math.max(el.length, gl.length);
    let e = "", g = "", firstBad = -1;
    for (let k = 0; k < n; k++) {
      const a = el[k], b = gl[k];
      const same = a === b;
      if (!same && firstBad < 0) firstBad = k;
      e += (a === undefined ? "" : same ? esc(a) : `<span class="good">${markWS(a)}</span>`) + "\n";
      g += (b === undefined ? `<span class="bad">(missing line)</span>` : same ? esc(b) : `<span class="bad">${markWS(b)}</span>`) + "\n";
    }
    return `<div class="diff"><div class="col"><b>Expected output</b>${e}</div><div class="col"><b>Your output</b>${g}</div></div>`;
  }

  window.PyErrors = { explain, diffHTML, diffHints, norm };
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[18] = {
  title: "OOP: classes and objects",
  intro: "So far data (variables) and actions (functions) lived separately. <b>Object-oriented programming</b> bundles them: a <code>Student</code> object has its own data (name, marks) and its own actions (add a mark, compute the average). This is how large systems — games, banking apps, Instagram — are organized.",
  introAr: "البرمجة الكائنية تجمع البيانات والدوال في كيان واحد. الـ class هو القالب أو المخطط، والـ object هو نسخة حقيقية منه. نتعلم __init__ و self والخصائص attributes والدوال methods.",
  goals: ["Explain class vs object", "Write a class with `__init__` and attributes", "Add methods that use `self`", "Create several independent objects", "Make objects print nicely with `__str__`"],
  learn: [
    { t: "h", text: "Why objects? Data and actions together" },
    { t: "p", html: "<p>Imagine you are writing a program for PSU students. Each student has a name, a major and a list of marks, and you want to add marks and compute averages. With what you know so far, you would keep <code>names</code>, <code>majors</code> and <code>marks</code> in separate lists or dictionaries, and write separate functions that receive them. It works for one student, but with hundreds it becomes easy to mix things up.</p><p><b>Object-oriented programming</b> (OOP) lets you bundle a thing's <b>data</b> (name, marks) and its <b>actions</b> (add a mark, compute the average) into one unit called an <b>object</b>. Games, banking apps and Instagram are all built this way.</p>" },
    { t: "analogy", title: "Class = blueprint, object = house", html: "<p>An architect draws one <b>blueprint</b> (the <b>class</b>). From it you can build many <b>houses</b> (the <b>objects</b>). Every house has the same structure — rooms, doors, windows — but each has its own paint color and its own owner. Painting one house does not change the others, and the blueprint itself is not a house: you cannot live in a drawing.</p>" },
    { t: "ar", html: "البرمجة الكائنية تجمع البيانات والأفعال في كيان واحد. الكلاس (class) هو المخطط، والكائن (object) هو بيت حقيقي مبني من المخطط. من مخطط واحد نبني بيوتًا كثيرة، لكل بيت بياناته الخاصة." },

    { t: "h", text: "Your first class and your first objects" },
    { t: "p", html: "<p>You write a class with the word <code>class</code>, a name and a colon. Class names use <b>CapitalWords</b> (<code>Student</code>, <code>BankAccount</code>) so you can tell them apart from variables and functions. To <b>build an object</b> from the class, you \"call\" the class like a function: <code>Student()</code>.</p>" },
    { t: "code", code: c`class Student:
    pass

s1 = Student()
s2 = Student()
print(type(s1))
print(s1 == s2)`, before: "<p>This is the smallest possible class: an empty blueprint. Run it and read both lines of output.</p>", note: "<p>Line by line:</p><ul><li><code>class Student:</code> starts the blueprint. <code>pass</code> means \"nothing here yet\" — a block cannot be empty.</li><li><code>s1 = Student()</code> builds one object from the blueprint and stores it in <code>s1</code>. Line 5 builds a <b>second</b>, separate object.</li><li><code>type(s1)</code> prints <code>&lt;class '__main__.Student'&gt;</code>: <code>s1</code> is a <code>Student</code>. (<code>__main__</code> just means \"defined in this program\".)</li><li><code>s1 == s2</code> is <code>False</code>: two houses from the same blueprint are still two different houses.</li></ul><p>Words to remember: the class is the <b>blueprint</b>; each object is an <b>instance</b> of that class.</p>" },
    { t: "code", code: c`class Student:
    pass

s1 = Student()
s1.name = "{{name}}"
s1.major = "CS"
print(s1.name, "studies", s1.major)`, before: "<p>An object can hold its own variables, called <b>attributes</b>. You reach them with a dot: <code>object.attribute</code>.</p>", note: "<p>Line by line:</p><ul><li><code>s1.name = \"{{name}}\"</code> creates an attribute called <code>name</code> <b>inside</b> the object <code>s1</code>. Read the dot as \"'s\": <i>s1's name</i>.</li><li><code>s1.major = \"CS\"</code> adds a second attribute.</li><li><code>print(s1.name, ...)</code> reads them back.</li></ul><p>This works, but it is clumsy: for every new student you must remember to type every attribute by hand, and if you forget one, that student is incomplete. The next section fixes this.</p>" },
    { t: "ar", html: "نكتب الكلاس بالكلمة class واسم يبدأ بحرف كبير، وننشئ كائنًا باستدعائه مثل الدالة: Student(). والخصائص (attributes) متغيرات داخل الكائن نصل إليها بالنقطة: s1.name." },

    { t: "h", text: "__init__: set up every new object" },
    { t: "p", html: "<p>A class can contain a special function named <code>__init__</code> (two underscores before and after: \"dunder init\"). Python runs it <b>automatically</b> every time you build an object. It is the place to give every new object its starting attributes, so no student is ever incomplete. It is also called the <b>constructor</b>.</p>" },
    { t: "analogy", title: "The builder's checklist", html: "<p>When a new house is finished, the builder follows a checklist before handing over the keys: install the door, paint the walls, write the owner's name on the contract. <code>__init__</code> is that checklist. It runs once for every new object, the moment it is built.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self):
        print("A new student was created!")

s1 = Student()
s2 = Student()`, before: "<p>We never call <code>__init__</code> ourselves. Run it and count how many times the message appears.</p>", note: "<p>Line by line:</p><ul><li>Lines 2–3 define <code>__init__</code> inside the class (it is indented under <code>class</code>). Ignore <code>self</code> for a moment — the next section explains it.</li><li><code>Student()</code> on line 5 builds an object, and Python <b>automatically</b> runs <code>__init__</code> → the message prints.</li><li>Line 6 builds another object → the message prints again.</li></ul><p>Two objects, two messages. Spelling matters: <code>_init_</code> (one underscore) or <code>__int__</code> would be silently ignored.</p>" },
    { t: "ar", html: "__init__ دالة خاصة تُنفذ تلقائيًا عند إنشاء كل كائن جديد، وفيها نضع الخصائص الابتدائية. انتبه{{g:|ي}} لكتابتها بشرطتين سفليتين قبل الكلمة وبعدها." },

    { t: "h", text: "self: \"this object\"" },
    { t: "p", html: "<p>Inside the class, the blueprint does not know <i>which</i> house it is working on — there may be hundreds. So Python passes the object being built as the first parameter, and by tradition we call it <code>self</code>. <code>self.name = name</code> means: <b>store this name inside this object</b>.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name, major):
        self.name = name
        self.major = major

s1 = Student("{{name}}", "CS")
s2 = Student("Omar", "IS")
print(s1.name, s1.major)
print(s2.name, s2.major)`, before: "<p>Now <code>__init__</code> receives the student's details. Follow how <code>\"Omar\"</code> travels from line 7 into the object.</p>", note: "<p>Line by line for <code>s2 = Student(\"Omar\", \"IS\")</code>:</p><ul><li>Python builds an empty object and calls <code>__init__</code>, passing the new object as <code>self</code>, then <code>\"Omar\"</code> as <code>name</code> and <code>\"IS\"</code> as <code>major</code>.</li><li><code>self.name = name</code> takes the parameter <code>name</code> (a normal local variable that disappears when the function ends) and saves it <b>inside the object</b> as the attribute <code>self.name</code>, which lives on.</li><li>When <code>__init__</code> ends, the finished object is stored in <code>s2</code>. So inside the class, <code>self</code> was <code>s2</code>.</li></ul><p>You pass <b>two</b> values, but <code>__init__</code> has <b>three</b> parameters: Python fills in <code>self</code> for you. Writing <code>name = name</code> without <code>self.</code> would store nothing in the object.</p>" },
    { t: "ar", html: "self تعني \"هذا الكائن نفسه\". عند كتابة s1 = Student(\"{{name}}\", \"CS\") يستدعي بايثون __init__ ويكون self هو s1. و self.name = name تحفظ القيمة داخل الكائن، أما name = name وحدها فتضيع بعد انتهاء الدالة." },
    { t: "predict", code: c`class Car:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

a = Car("Toyota", 2020)
b = Car("Hyundai", 2024)
print(b.brand, a.year)`, explain: "Each object stores its own values. <code>b</code> was built with <code>\"Hyundai\"</code>, and <code>a</code> with <code>2020</code>. Output: <code>Hyundai 2020</code>." },

    { t: "h", text: "Attributes: each object has its own data" },
    { t: "p", html: "<p>Every object gets its <b>own copy</b> of the attributes created in <code>__init__</code>. Changing one object's attribute does not touch any other object — exactly like painting one house. Attributes can be any value: numbers, strings, even lists.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []

s1 = Student("{{name}}")
s2 = Student("Omar")
s1.marks.append(95)
print(s1.name, s1.marks)
print(s2.name, s2.marks)`, before: "<p>Both students start with an empty list of marks. We add a mark only to <code>s1</code>. Predict <code>s2.marks</code> before running.</p>", note: "<p>Line by line:</p><ul><li><code>self.marks = []</code> runs <b>once per object</b>, so each student gets a brand-new empty list. Notice the starting value does not have to come from a parameter.</li><li><code>s1.marks.append(95)</code>: <code>s1.marks</code> is a normal list, so all list methods from Day 10 work on it.</li><li><code>s1</code> now has <code>[95]</code>, while <code>s2</code> still has <code>[]</code>.</li></ul><p>Two separate objects, two separate lists. This independence is the whole point of objects.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name, major):
        self.name = name
        self.major = major

s = Student("{{name}}", "CS")
s.major = "AI"
print(s.name, "now studies", s.major)`, before: "<p>Attributes are not frozen: you can change them later, like any variable.</p>", note: "<p>The object starts with <code>major = \"CS\"</code>. Line 7 assigns a new value to <code>s.major</code>, replacing the old one — just like <code>x = 5</code> replaces an old <code>x</code>. Output: <code>{{name}} now studies AI</code>. Only this object changed; any other student keeps their own major.</p>" },
    { t: "ar", html: "كل كائن له نسخته الخاصة من الخصائص المعرّفة في __init__، وتغيير خاصية في كائن لا يغيّر الكائنات الأخرى. ويمكن تعديل الخاصية لاحقًا مثل أي متغير: s.major = \"AI\"." },

    { t: "h", text: "Methods: what an object can do" },
    { t: "p", html: "<p>Attributes are what an object <b>has</b>; <b>methods</b> are what it can <b>do</b>. A method is simply a function written <b>inside</b> a class. Its first parameter is always <code>self</code>, so the method can reach the object's own attributes.</p>" },
    { t: "analogy", title: "The remote control", html: "<p>A TV (the object) has data inside it — the current channel, the volume. The buttons on the remote are its methods: <i>volume up</i>, <i>next channel</i>. You don't open the TV and move wires; you press a button and the TV changes its own data.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print("Hi, I am", self.name)

s = Student("{{name}}")
s.greet()`, before: "<p>A method with no extra parameters. Notice how it is called: object, dot, method name, brackets.</p>", note: "<p>Line by line:</p><ul><li>Lines 5–6 define <code>greet</code> inside the class, at the same indentation as <code>__init__</code>.</li><li><code>s.greet()</code> calls it <b>on</b> the object <code>s</code>. Python passes <code>s</code> as <code>self</code> automatically, so inside the method <code>self.name</code> is <code>s</code>'s name.</li><li>Output: <code>Hi, I am {{name}}</code>.</li></ul><p>In fact, <code>s.greet()</code> is a shortcut for <code>Student.greet(s)</code>. That is why the definition has <code>self</code> but the call has empty brackets.</p>" },
    { t: "viz", code: c`class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []
    def add_mark(self, mark):
        self.marks.append(mark)

s = Student("{{name}}")
s.add_mark(90)
print(s.marks)`, before: "<p>Methods can take extra parameters after <code>self</code> and change the object's data. Press Visualize and step through slowly: watch the object appear, then its <code>marks</code> list grow.</p>", note: "<p>Line by line:</p><ul><li>Lines 1–6 only <b>define the blueprint</b>: stepping through, you see Python store <code>Student</code>, but no student exists yet.</li><li><code>def add_mark(self, mark):</code> has two parameters: <code>self</code> (the object) and <code>mark</code> (the value you pass).</li><li><code>s.add_mark(90)</code> passes only <b>one</b> value. Python fills in <code>self = s</code> and <code>mark = 90</code>. It means <code>Student.add_mark(s, 90)</code>.</li><li><code>self.marks.append(mark)</code> adds 90 to <b>this</b> student's list, so the last line prints <code>[90]</code>.</li></ul><p>The method changes the object from inside — like pressing a button on the remote. (Blank lines between methods are optional; we left them out to keep examples short.)</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []
    def add_mark(self, mark):
        self.marks.append(mark)
    def average(self):
        return sum(self.marks) / len(self.marks)
s = Student("{{name}}")
s.add_mark(90); s.add_mark(80); print(s.name, s.average())`, before: "<p>A method can also <b>return</b> a value, like any function. (<code>;</code> lets you put several short statements on one line.)</p>", note: "<p>Step by step:</p><ul><li><code>average</code> has only <code>self</code>: it needs no extra input, because the marks are already inside the object.</li><li><code>s.add_mark(90)</code> and <code>s.add_mark(80)</code> make the list <code>[90, 80]</code>.</li><li><code>s.average()</code> returns <code>170 / 2</code> = <code>85.0</code>, and <code>print</code> shows <code>{{name}} 85.0</code>.</li></ul><p>That is the power of keeping data and actions together: the object <b>remembers</b>. One weakness: calling <code>average()</code> before any mark divides by zero. A safer version starts with <code>if not self.marks: return 0</code> — you will see that in the final example.</p>" },
    { t: "ar", html: "الدالة داخل الكلاس اسمها method، وأول معامل فيها دائمًا self. عند الاستدعاء لا نمرر self: الكتابة s.add_mark(90) تعني Student.add_mark(s, 90). وداخل الـ method نصل للخصائص عبر self." },
    { t: "predict", code: c`class Counter:
    def __init__(self, start):
        self.n = start
    def up(self):
        self.n += 10

c1 = Counter(5)
c1.up()
c1.up()
print(c1.n)`, explain: "<code>__init__</code> sets <code>self.n = 5</code>. Each <code>up()</code> adds 10 to <b>this object's</b> <code>n</code>: 5 → 15 → 25. Output: <code>25</code>." },

    { t: "h", text: "__str__: make print(obj) readable" },
    { t: "p", html: "<p>What happens if you <code>print</code> an object? By default Python does not know what is important about your object, so it prints its class and a memory address. A special method called <code>__str__</code> lets <b>you</b> decide the text.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        self.name = name

s = Student("{{name}}")
print(s)`, before: "<p>Run it and look at the strange output. The numbers will differ on every run.</p>", note: "<p>You see something like <code>&lt;__main__.Student object at 0x7f3a...&gt;</code>: \"a Student object stored at this memory address\". It is true, but useless for a human. Notice the name you passed is nowhere in it.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Student: {self.name}"

s = Student("{{name}}")
print(s)`, before: "<p>Same class plus one method. Compare the output with the previous example.</p>", note: "<p>Line by line:</p><ul><li><code>__str__</code> takes only <code>self</code> and must <b>return</b> a string (not print it).</li><li><code>print(s)</code> now automatically calls <code>s.__str__()</code> and shows the returned text: <code>Student: {{name}}</code>.</li></ul><p>Methods whose names start and end with double underscores, like <code>__init__</code> and <code>__str__</code>, are called <b>dunder</b> (or magic) methods: you don't call them yourself; Python calls them at the right moment.</p>" },
    { t: "ar", html: "بدون __str__ تطبع print عنوان الكائن في الذاكرة فقط. نعرّف __str__ لتُرجع (return) نصًا مقروءًا، وبايثون يستدعيها تلقائيًا عند print(obj)." },

    { t: "h", text: "A bank account: methods that protect the data" },
    { t: "p", html: "<p>Methods are also guards. Instead of letting anyone change <code>balance</code> directly, a <code>BankAccount</code> offers <code>deposit</code> and <code>withdraw</code> methods that <b>check</b> each request first — just like a real bank refuses a withdrawal bigger than your balance. Notice <code>balance=0</code>: a default parameter value (Day 15) works in <code>__init__</code> too.</p>" },
    { t: "code", code: c`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount
acc = BankAccount("{{name}}", 500)
acc.deposit(250); print(acc.balance)`, before: "<p>The deposit method refuses nonsense amounts using <code>raise</code> from Day 17. Run it, then change <code>250</code> to <code>-50</code> and read the error.</p>", note: "<p>Line by line:</p><ul><li><code>BankAccount(\"{{name}}\", 500)</code> sets <code>owner</code> and <code>balance = 500</code>. <code>BankAccount(\"Omar\")</code> would start at <code>0</code>.</li><li><code>deposit(250)</code>: 250 is positive, so <code>self.balance += 250</code> → <code>750</code>.</li><li>With <code>-50</code>, the check is True and <code>raise</code> stops the method <b>before</b> the balance changes: <code>ValueError: deposit must be positive</code>.</li></ul><p>The object keeps its own data valid. Code outside could catch that error with <code>try/except</code>.</p>" },
    { t: "code", code: c`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner, self.balance = owner, balance
    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True
acc = BankAccount("{{name}}", 750)
print(acc.withdraw(1000), acc.withdraw(100), acc.balance)`, before: "<p>The withdraw method uses a softer style: instead of raising an error, it <b>returns</b> <code>True</code> or <code>False</code>. Line 3 uses tuple unpacking (Day 11) to set two attributes at once.</p>", note: "<p>Step by step:</p><ul><li><code>self.owner, self.balance = owner, balance</code> is the same as two separate assignments.</li><li><code>acc.withdraw(1000)</code>: 1000 is more than <b>this account's</b> 750, so it returns <code>False</code> — <code>return</code> ends the method there and the balance is untouched.</li><li><code>acc.withdraw(100)</code>: allowed → the balance becomes 650 and it returns <code>True</code>.</li><li>Output: <code>False True 650</code>.</li></ul><p>Returning <code>True</code>/<code>False</code> lets the caller check the result, e.g. <code>if acc.withdraw(100): print(\"Done\")</code>. Both styles — <code>raise</code> and returning a flag — are common; choose one per method and be consistent.</p>" },
    { t: "ar", html: "الـ methods تحمي بيانات الكائن: deposit ترفض المبالغ غير المنطقية بـ raise، و withdraw ترجع False إذا لم يكفِ الرصيد. ويمكن استخدام قيمة افتراضية في __init__ مثل balance=0." },

    { t: "h", text: "Class attributes: shared by all objects" },
    { t: "p", html: "<p>Attributes set with <code>self.</code> inside <code>__init__</code> belong to <b>one</b> object. But some data is the same for everyone — all our students are at PSU. Variables written directly inside the class (not inside a method) are <b>class attributes</b>: there is only <b>one copy</b>, shared by every object.</p>" },
    { t: "code", code: c`class Student:
    university = "PSU"
    count = 0
    def __init__(self, name):
        self.name = name
        Student.count += 1
a = Student("Sara")
b = Student("Omar")
print(a.university, b.university, Student.count)`, before: "<p>Two kinds of attributes in one class. Watch <code>count</code> go up each time a student is created.</p>", note: "<p>Line by line:</p><ul><li><code>university</code> and <code>count</code> are class attributes: created once, when the class is defined.</li><li><code>self.name</code> is an instance attribute: different for each student.</li><li><code>Student.count += 1</code> inside <code>__init__</code> changes the <b>shared</b> counter, reached through the class name, so it counts every student built.</li><li><code>a.university</code> and <code>b.university</code> both find the same shared <code>\"PSU\"</code>. Output: <code>PSU PSU 2</code>.</li></ul><p>Rule of thumb: data that is the same for everyone → class attribute. Data that differs per object (names, marks, balances — and especially lists) → <code>self.</code> in <code>__init__</code>, so each object gets its own.</p>" },
    { t: "ar", html: "الخاصية المعرّفة داخل الكلاس مباشرة (خارج الدوال) مشتركة بين كل الكائنات، أما self.x داخل __init__ فخاصة بكل كائن. ضع{{g:|ي}} القوائم والبيانات المختلفة لكل كائن في __init__." },

    { t: "h", text: "Putting it together: a student record" },
    { t: "code", code: c`class Student:
    university = "PSU"

    def __init__(self, name, major):
        self.name = name
        self.major = major
        self.marks = []

    def add_mark(self, mark):
        self.marks.append(mark)

    def average(self):
        if not self.marks:
            return 0
        return sum(self.marks) / len(self.marks)

    def __str__(self):
        return f"{self.name} ({self.major}, {self.university}) avg {self.average():.1f}"

s1 = Student("{{name}}", "CS")
s1.add_mark(95)
s1.add_mark(88)
print(s1)
print(Student("Omar", "IS"))`, together: true, before: "<p>Here is a complete class using every idea from today, plus a few lines that use it. The blank lines between methods are optional, but they make a class much easier to read. Read the class first and predict both printed lines, then run it. Then add a mark for Omar too.</p>", note: "<p>How it works:</p><ul><li><code>university</code> is a <b>class attribute</b>: one shared value for every student.</li><li><code>__init__</code> gives each new object its own <code>name</code>, <code>major</code> and an empty <code>marks</code> list.</li><li><code>add_mark</code> is a method that changes the object's data; <code>average</code> is a method that returns a value, and it returns <code>0</code> when there are no marks yet, so it never divides by zero.</li><li><code>__str__</code> builds the text for <code>print</code>. It can call another method with <code>self.average()</code>, and <code>:.1f</code> shows one decimal (Day 4). Inside a method, <code>self.university</code> finds the shared class attribute.</li></ul><p>Output: <code>{{name}} (CS, PSU) avg 91.5</code> and <code>Omar (IS, PSU) avg 0.0</code>: same blueprint, independent data.</p>" },
    { t: "ar", html: "جمعنا كل أفكار اليوم: كلاس فيه خاصية مشتركة، و __init__ تضبط بيانات كل كائن، و methods تغيّر البيانات أو ترجع قيمة، و __str__ للطباعة المقروءة. من نفس المخطط نصنع طلابًا مستقلين." },
  ],
  mistakes: [
    { title: "Forgetting self in the method definition", html: "", wrong: c`class Dog:
    def bark():
        print("Woof")
Dog().bark()   # TypeError`, right: c`class Dog:
    def bark(self):
        print("Woof")
Dog().bark()` },
    { title: "Forgetting self. when storing", html: "Without <code>self.</code> the value is just a local variable that disappears.", wrong: c`class Car:
    def __init__(self, brand):
        brand = brand
print(Car("Toyota").brand)   # AttributeError`, right: c`class Car:
    def __init__(self, brand):
        self.brand = brand
print(Car("Toyota").brand)` },
    { title: "Misspelled __init__", html: "<code>__int__</code> or <code>_init_</code> (one underscore) is silently ignored, then creating the object fails.", wrong: c`def _init_(self, name):`, right: c`def __init__(self, name):`, ar: "__init__ فيها شرطتان سفليتان قبلها وبعدها." },
  ],
  tricks: [
    { title: "__repr__ for debugging", html: "<code>__repr__</code> is what you see inside lists and in the shell. Define it and your lists of objects become readable.", code: c`class P:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __repr__(self):
        return f"P({self.x}, {self.y})"
print([P(1, 2), P(3, 4)])` },
    { title: "dataclass writes __init__ for you", html: "", code: c`from dataclasses import dataclass

@dataclass
class Course:
    code: str
    credits: int = 3

print(Course("CS101"))` },
  ],
  practice: [
    { t: "predict", code: c`class Counter:
    def __init__(self):
        self.n = 0
    def tick(self):
        self.n += 1
        return self.n

a = Counter()
b = Counter()
a.tick(); a.tick(); b.tick()
print(a.n, b.n)`, explain: "Each object has its own <code>n</code>: <code>2 1</code>." },
    { t: "predict", code: c`class Box:
    def __init__(self, items):
        self.items = items
    def __str__(self):
        return f"Box with {len(self.items)} items"

print(Box(["pen", "book"]))`, explain: "<code>__str__</code> is used by print: <code>Box with 2 items</code>." },
    { t: "parsons", title: "Rectangle class", prompt: "Build a class whose objects know their area.", lines: ["class Rectangle:", "    def __init__(self, w, h):", "        self.w = w", "        self.h = h", "    def area(self):", "        return self.w * self.h", "print(Rectangle(3, 4).area())"], distractors: ["        return w * h"], explain: "Inside methods, attributes are reached through <code>self</code>." },
    { t: "try", title: "Design a class", html: "<p>Create a <code>Course</code> class with code, title and a list of enrolled students, plus methods <code>enroll(name)</code> and <code>size()</code>. Test it with a few students.</p>", code: c`class Course:
    def __init__(self, code, title):
        pass

c = Course("IS201", "Introduction to Information Systems")
` },
  ],
  exercises: [
    { id: "circle", lvl: "seed", title: "Circle", prompt: "<p>Create class <code>Circle</code> with attribute <code>radius</code> and methods <code>area()</code> and <code>perimeter()</code>, both rounded to 2 decimals (use <code>math.pi</code>).</p>", starter: "import math\n\nclass Circle:\n    pass\n", tests: [{ after: "c = Circle(2)\nprint(c.radius, c.area(), c.perimeter())", expected: "2 12.57 12.57" }, { after: "print(Circle(1).area())", expected: "3.14" }],
      solutions: [{ name: "Class", code: c`import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return round(math.pi * self.radius ** 2, 2)

    def perimeter(self):
        return round(2 * math.pi * self.radius, 2)` }] },
    { id: "student", lvl: "seed", title: "Student with marks", prompt: "<p>Class <code>Student(name)</code> with a <code>marks</code> list, <code>add(mark)</code>, <code>average()</code> (0 if no marks) and <code>__str__</code> returning <code>NAME (avg X.X)</code>.</p>", starter: "class Student:\n    pass\n", tests: [{ after: "s = Student('Sara')\nprint(s)\ns.add(90); s.add(85)\nprint(s.average())\nprint(s)", expected: "Sara (avg 0.0)\n87.5\nSara (avg 87.5)" }],
      solutions: [{ name: "Class", code: c`class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []

    def add(self, mark):
        self.marks.append(mark)

    def average(self):
        return sum(self.marks) / len(self.marks) if self.marks else 0

    def __str__(self):
        return f"{self.name} (avg {self.average():.1f})"` }] },
    { id: "bank", lvl: "star", title: "Bank account with history", prompt: "<p>Class <code>Account(owner)</code> starting at 0. <code>deposit(x)</code> and <code>withdraw(x)</code> return True/False (withdraw fails if not enough money; amounts ≤ 0 fail). Every successful operation is recorded in <code>history</code> as <code>\"+100\"</code> or <code>\"-30\"</code>.</p>", starter: "class Account:\n    pass\n", tests: [{ after: "a = Account('Sara')\nprint(a.deposit(100), a.withdraw(30), a.withdraw(500), a.deposit(-5))\nprint(a.balance, a.history)", expected: "True True False False\n70 ['+100', '-30']" }],
      solutions: [{ name: "Class", code: c`class Account:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0
        self.history = []

    def deposit(self, amount):
        if amount <= 0:
            return False
        self.balance += amount
        self.history.append(f"+{amount}")
        return True

    def withdraw(self, amount):
        if amount <= 0 or amount > self.balance:
            return False
        self.balance -= amount
        self.history.append(f"-{amount}")
        return True` }] },
    { id: "cart", lvl: "star", title: "Shopping cart object", prompt: "<p>Class <code>Cart</code> with <code>add(item, price, qty=1)</code> (adding an existing item increases its quantity), <code>remove(item)</code>, <code>total()</code> and <code>count()</code> (total quantity).</p>", starter: "class Cart:\n    pass\n", tests: [{ after: "c = Cart()\nc.add('latte', 18, 2)\nc.add('cookie', 6)\nc.add('latte', 18)\nprint(c.count(), c.total())\nc.remove('cookie')\nprint(c.count(), c.total())", expected: "4 60\n3 54" }],
      solutions: [{ name: "Dict inside", code: c`class Cart:
    def __init__(self):
        self.items = {}          # item -> [price, qty]

    def add(self, item, price, qty=1):
        if item in self.items:
            self.items[item][1] += qty
        else:
            self.items[item] = [price, qty]

    def remove(self, item):
        self.items.pop(item, None)

    def total(self):
        return sum(p * q for p, q in self.items.values())

    def count(self):
        return sum(q for p, q in self.items.values())`, note: "The object hides <i>how</i> it stores data. Users only see add/remove/total — this is called <b>encapsulation</b>." }] },
    { id: "library", lvl: "fire", title: "Mini library", prompt: "<p>Class <code>Library</code> with <code>add_book(title)</code>, <code>borrow(title, person)</code> and <code>give_back(title)</code>. <code>borrow</code> returns <code>\"ok\"</code>, <code>\"no such book\"</code> or <code>\"already borrowed by X\"</code>. <code>available()</code> returns the sorted list of free titles.</p>", starter: "class Library:\n    pass\n", tests: [{ after: "lib = Library()\nfor t in ['Dune', 'Clean Code', 'SICP']: lib.add_book(t)\nprint(lib.borrow('Dune', 'Sara'))\nprint(lib.borrow('Dune', 'Omar'))\nprint(lib.borrow('Hamlet', 'Omar'))\nprint(lib.available())\nlib.give_back('Dune')\nprint(lib.available())", expected: "ok\nalready borrowed by Sara\nno such book\n['Clean Code', 'SICP']\n['Clean Code', 'Dune', 'SICP']" }],
      solutions: [{ name: "Dict title -> borrower", code: c`class Library:
    def __init__(self):
        self.books = {}      # title -> borrower or None

    def add_book(self, title):
        self.books[title] = None

    def borrow(self, title, person):
        if title not in self.books:
            return "no such book"
        if self.books[title] is not None:
            return f"already borrowed by {self.books[title]}"
        self.books[title] = person
        return "ok"

    def give_back(self, title):
        if title in self.books:
            self.books[title] = None

    def available(self):
        return sorted(t for t, who in self.books.items() if who is None)`, note: "This is a small version of the Library System capstone option (Day 29)." }] },
    { id: "fix18", lvl: "fire", debug: true, title: "Broken Timer class", prompt: "<p>Fix the class so the test prints <code>01:30</code> and <code>02:05</code>.</p>", starter: c`class Timer:
    def _init_(self, seconds):
        seconds = seconds

    def add(seconds):
        self.seconds += seconds

    def __str__(self):
        return f"{self.seconds // 60:02d}:{self.seconds % 60:02d}"`, tests: [{ after: "t = Timer(90)\nprint(t)\nt.add(35)\nprint(t)", expected: "01:30\n02:05" }],
      solutions: [{ name: "Fixed", code: c`class Timer:
    def __init__(self, seconds):
        self.seconds = seconds

    def add(self, seconds):
        self.seconds += seconds

    def __str__(self):
        return f"{self.seconds // 60:02d}:{self.seconds % 60:02d}"`, note: "Three classic OOP bugs: <code>__init__</code> spelling, missing <code>self.</code>, missing <code>self</code> parameter." }] },
  ],
  quiz: [
    { q: "What is `self`?", o: ["The class", "The object the method is working on", "A keyword for private", "The module"], a: 1, e: "The current object." },
    { q: "When does `__init__` run?", o: ["When the class is defined", "When an object is created", "When print is called", "Never automatically"], a: 1, e: "At `ClassName(...)`." },
    { q: "Which method controls `print(obj)`?", o: ["`__init__`", "`__print__`", "`__str__`", "`show`"], a: 2, e: "`__str__`." },
    { q: "Two objects of the same class…", o: ["share all attributes", "have their own instance attributes", "can't exist", "are the same object"], a: 1, e: "Each object has its own data (class attributes are shared)." },
    { q: "Calling `acc.deposit(50)` passes `self` =", o: ["50", "acc", "deposit", "nothing"], a: 1, e: "Python passes the object automatically." },
  ],
  puzzle: { title: "Shared list trap", q: "<p>What does this print?</p>", code: c`class Team:
    members = []
    def join(self, name):
        self.members.append(name)

a = Team()
b = Team()
a.join("Sara")
b.join("Omar")
print(len(a.members))`, answers: ["2"], hint: "Where is <code>members</code> created — in <code>__init__</code> or in the class?", ar: "القائمة معرّفة على مستوى الكلاس، فهي مشتركة بين كل الكائنات.", e: "<code>members</code> is a <b>class attribute</b>, so both teams share one list: <b>2</b>. Put mutable data in <code>__init__</code> (<code>self.members = []</code>) to give each object its own." },
  cards: [
    { f: "Class vs object", b: "Class = blueprint; object = an instance built from it." },
    { f: "What does `__init__` do?", b: "Sets up a new object's attributes when it is created." },
    { f: "Why `self.name = name`?", b: "To store the value inside the object (an attribute)." },
    { f: "Method definition vs call", b: "`def add(self, x):` but call `obj.add(5)`." },
    { f: "`__str__`", b: "Returns the text shown by `print(obj)`." },
  ],
};
})();

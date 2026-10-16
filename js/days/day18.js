window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[18] = {
  title: "OOP: classes and objects",
  intro: "So far data (variables) and actions (functions) lived separately. <b>Object-oriented programming</b> bundles them: a <code>Student</code> object has its own data (name, marks) and its own actions (add a mark, compute the average). This is how large systems — games, banking apps, Instagram — are organized. Today we go slowly, {{name}}: one new idea at a time.",
  introAr: "البرمجة الكائنية تجمع البيانات والدوال في كيان واحد. الـ class هو القالب أو المخطط، والـ object هو نسخة حقيقية منه. نتعلم __init__ و self والخصائص attributes والدوال methods خطوة بخطوة.",
  goals: ["Explain class vs object", "Write a class with `__init__` and attributes", "Explain what `self` means", "Add methods that use `self`", "Create several independent objects", "Make objects print nicely with `__str__`"],
  learn: [
    { t: "h", text: "Why do we need objects?" },
    { t: "p", html: "<p>Imagine you keep data about three students. With what you know, you might write <code>name1</code>, <code>marks1</code>, <code>name2</code>, <code>marks2</code>… or one dictionary per student plus separate functions that work on those dictionaries. It works, but the data and the functions that use it live in different places, and nothing stops you from passing the wrong dictionary to the wrong function.</p><p>A <b>class</b> lets you design your own type — just like Python has <code>str</code> and <code>list</code>, you can have <code>Student</code>. Each student then carries its own data <b>and</b> its own actions.</p>" },
    { t: "code", code: c`# The old way: data in a dict, actions in a separate function
sara = {"name": "Sara", "marks": [90, 80]}

def average(student):
    return sum(student["marks"]) / len(student["marks"])

print(sara["name"], average(sara))`, before: "<p>This is the style you already know (dictionaries from Week 2, functions from Day 15). Keep it in mind — by the end of today you will write the same thing as a class.</p>" },
    { t: "analogy", title: "Class = blueprint, object = house", html: "<p>An architect draws one <b>blueprint</b> (the class). From it you can build many <b>houses</b> (objects). Every house has the same structure — rooms, doors, windows — but each has its own paint color and its own owner. Painting one house blue does not change the others.</p>" },

    { t: "h", text: "Class vs object" },
    { t: "p", html: "<p>A <b>class</b> is the design. An <b>object</b> (also called an <b>instance</b>) is one real thing made from that design. You write the class once; you can create as many objects as you like. Let's start with the smallest class possible.</p>" },
    { t: "code", code: c`class Student:
    pass

s1 = Student()
s2 = Student()
print(type(s1))
print(type(s2))`, before: "<p>Look at the two kinds of lines: the <code>class</code> block <b>describes</b>, and <code>Student()</code> <b>creates</b>.</p>", note: "<p>Both objects are of type <code>Student</code> — a type you invented. (<code>__main__</code> just means \"defined in this file\".) They are still two separate objects, like two houses from one blueprint.</p>" },
    { t: "lines", rows: [
      ["class Student:", "Starts a new class called <code>Student</code>. Class names use <b>CapitalWords</b> (not snake_case), so you can see at a glance that it is a class."],
      ["    pass", "The body of the class. <code>pass</code> means \"nothing here yet\" — Python needs at least one line inside a block."],
      ["s1 = Student()", "<b>Calling</b> the class like a function creates a new object. The variable <code>s1</code> now refers to it."],
      ["s2 = Student()", "A second, completely separate object from the same class."],
    ] },
    { t: "ar", html: "الكلاس هو المخطط أو القالب، ويُكتب مرة واحدة. والكائن object هو نسخة حقيقية نصنعها من الكلاس بكتابة اسمه مع قوسين مثل Student()." },
    { t: "check", q: "In `car = Car()`, which one is the object?", o: ["`Car`", "`car`", "`()`", "There is no object"], a: 1, e: "`Car` is the class (the blueprint). Calling it with `()` builds a new object, and the variable `car` refers to that object.", hint: "Which side was created by calling the class?" },

    { t: "h", text: "__init__: setting up every new object" },
    { t: "p", html: "<p>An empty object is not very useful. We want every new student to start with a name and an empty list of marks — automatically, so we can never forget. Python has a special method for that: <code>__init__</code> (\"init\" = initialize). It runs <b>by itself</b> every time you create an object.</p>" },
    { t: "analogy", title: "__init__ is the registration form", html: "<p>When you join a university, you fill a registration form on the first day: name, major, ID. You don't do it again every morning. <code>__init__</code> is that form: it runs once, at the moment the object is born, and fills in its starting data.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        print("Creating a student...")
        self.name = name

s1 = Student("{{name}}")
s2 = Student("Omar")
print(s1.name)
print(s2.name)`, before: "<p>We never call <code>__init__</code> ourselves. Watch the output: the message appears twice, once for each <code>Student(...)</code>.</p>", note: "<p>The value in the parentheses, <code>\"{{name}}\"</code>, was passed to <code>__init__</code> as <code>name</code>, and stored inside the object as <code>self.name</code>. Then <code>s1.name</code> reads it back. The <code>print</code> inside <code>__init__</code> is only here so you can see when it runs — real classes usually don't print there.</p>" },
    { t: "lines", rows: [
      ["def __init__(self, name):", "A function inside a class is called a <b>method</b>. This one has a special name: two underscores, <code>init</code>, two underscores. Its first parameter is always <code>self</code>."],
      ["    self.name = name", "Store the value <code>name</code> <b>inside this object</b>, under the label <code>name</code>. A value stored on an object is called an <b>attribute</b>."],
      ["s1 = Student(\"{{name}}\")", "Python creates an empty object, then calls <code>__init__(that_object, \"{{name}}\")</code> automatically."],
      ["print(s1.name)", "The dot means \"inside\": the <code>name</code> attribute inside the object <code>s1</code>."],
    ] },
    { t: "ar", html: "__init__ تعمل تلقائيًا عند إنشاء كل كائن جديد، ووظيفتها تجهيز بياناته الأولى. انتبه{{g:|ي}}: شرطتان سفليتان قبل init وشرطتان بعدها." },
    { t: "check", q: "How many times does `Hello` appear?", code: c`class Lamp:
    def __init__(self):
        print("Hello")

a = Lamp()
b = Lamp()
c = Lamp()`, o: ["0", "1", "3", "An error"], a: 2, e: "`__init__` runs once for every object created. Three `Lamp()` calls = three `Hello`.", hint: "Count how many objects are created." },

    { t: "h", text: "self: \"this object\"" },
    { t: "p", html: "<p><code>self</code> is the part that confuses most beginners, so let's take it slowly. One class can make many objects, but the code inside the class is written only <b>once</b>. When that code runs, it needs a way to say \"the object I am working on right now\". That word is <code>self</code>.</p>" },
    { t: "analogy", title: "self is the word \"my\"", html: "<p>Everyone in your class can say \"<i>my</i> name\". The sentence is the same for everybody, but \"my\" points to a different person depending on who says it. In <code>self.name = name</code>, <code>self</code> works like \"my\": when Sara's object runs it, <code>self</code> is Sara's object; when Omar's runs it, <code>self</code> is Omar's.</p>" },
    { t: "viz", code: c`class Student:
    def __init__(self, name, major):
        self.name = name
        self.major = major

a = Student("{{name}}", "CS")
b = Student("Omar", "IS")
print(a.name, a.major)
print(b.name, b.major)`, before: "<p>Visualize it and watch <code>__init__</code> run twice. The first time <code>self</code> is the object that becomes <code>a</code>; the second time it is the object that becomes <code>b</code>.</p>" },
    { t: "p", html: "<p>Two important facts:</p><ul><li><code>self</code> is always the <b>first</b> parameter of a method.</li><li>You <b>never pass it yourself</b>. In <code>Student(\"Omar\", \"IS\")</code> you give two values, and Python fills in <code>self</code> for you.</li></ul>" },
    { t: "ar", html: "self تعني \"هذا الكائن نفسه\". نكتبها أول معامل في كل دالة داخل الكلاس، لكن لا نمررها عند الاستدعاء؛ بايثون يمررها تلقائيًا." },
    { t: "check", q: "`__init__(self, title, pages)` is defined in class `Book`. How do you create a book?", o: ["`Book(self, \"Dune\", 412)`", "`Book(\"Dune\", 412)`", "`Book.__init__(\"Dune\", 412)`", "`Book(\"Dune\")`"], a: 1, e: "You pass every parameter **except** `self` — Python supplies `self` automatically. So: title and pages.", hint: "Who gives the value of `self`, you or Python?" },

    { t: "h", text: "Attributes: data inside an object" },
    { t: "p", html: "<p>Attributes are just variables that live inside an object. You read them with a dot, change them with a dot, and — the key point — each object has <b>its own copy</b>. Changing one object never touches another.</p>" },
    { t: "code", code: c`class Phone:
    def __init__(self, brand, battery=100):
        self.brand = brand
        self.battery = battery

mine = Phone("Samsung")
yours = Phone("iPhone", 40)
mine.battery = mine.battery - 15
print(mine.brand, mine.battery)
print(yours.brand, yours.battery)`, before: "<p>Notice <code>battery=100</code>: a default value works exactly like in normal functions (Day 15).</p>", note: "<p>Only <code>mine</code> lost battery. <code>yours</code> still has 40, because it is a different object with its own <code>battery</code> attribute.</p>" },
    { t: "check", q: "What does the last line print?", code: c`class Cup:
    def __init__(self, drink):
        self.drink = drink

x = Cup("tea")
y = Cup("coffee")
x.drink = "juice"
print(y.drink)`, o: ["`tea`", "`coffee`", "`juice`", "An error"], a: 1, e: "Only `x` was changed. `y` is a separate object and still holds `coffee`.", hint: "Which object was changed — `x` or `y`?" },

    { t: "h", text: "Methods: what an object can do" },
    { t: "p", html: "<p>Attributes are what an object <b>knows</b>. Methods are what it can <b>do</b>. A method is simply a function written inside the class. Because it receives <code>self</code>, it can read and change the object's own attributes.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hi, I am {self.name}"

s = Student("{{name}}")
print(s.greet())`, before: "<p>Start with one tiny method. It only reads an attribute.</p>" },
    { t: "lines", rows: [
      ["def greet(self):", "Defined with <code>self</code> as the first parameter, like every method."],
      ["    return f\"Hi, I am {self.name}\"", "Inside a method, you reach the object's data through <code>self.</code> — here, its <code>name</code>."],
      ["s.greet()", "Call it with a dot on the object, and <b>with parentheses</b>. Python turns it into <code>Student.greet(s)</code>: the object before the dot becomes <code>self</code>."],
    ] },
    { t: "viz", code: c`class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []

    def add_mark(self, mark):
        self.marks.append(mark)

    def average(self):
        if not self.marks:
            return 0
        return sum(self.marks) / len(self.marks)

s = Student("{{name}}")
s.add_mark(90)
s.add_mark(80)
print(s.name, s.average())`, before: "<p>Now methods that <b>change</b> the object. Visualize it: each <code>s.add_mark(...)</code> jumps into the method with <code>self</code> = <code>s</code>, and the list inside the object grows. Compare this with the dictionary version at the top of the lesson — same result, but now the data and its actions travel together.</p>" },
    { t: "ar", html: "الدالة داخل الكلاس اسمها method. نكتب s.add_mark(90) فيصبح self هو s، وتصل الدالة لبيانات الكائن عن طريق self." },
    { t: "check", q: "What does this print?", code: c`class Counter:
    def __init__(self):
        self.n = 0

    def tick(self):
        self.n += 1

c = Counter()
c.tick()
c.tick()
c.tick()
print(c.n)`, o: ["0", "1", "3", "An error"], a: 2, e: "Each `tick()` adds 1 to the same object's `n`: 0 → 1 → 2 → 3.", hint: "`self.n` belongs to the object, so it is remembered between calls." },

    { t: "h", text: "__str__: printing an object nicely" },
    { t: "p", html: "<p>Try printing an object and Python shows something ugly like <code>&lt;__main__.Student object at 0x7f3a...&gt;</code> — the type and a memory address. That helps nobody. If you add a method called <code>__str__</code> that <b>returns</b> a string, <code>print()</code> will use it.</p>" },
    { t: "code", code: c`class Course:
    def __init__(self, code, credits):
        self.code = code
        self.credits = credits

    def __str__(self):
        return f"{self.code} ({self.credits} credits)"

cs = Course("CS101", 3)
print(cs)
print("I am taking", cs)`, before: "<p>Run it, then delete the <code>__str__</code> method and run again to see the ugly default.</p>", note: "<p><code>__str__</code> must <b>return</b> text, not print it. Names with double underscores on both sides (<code>__init__</code>, <code>__str__</code>) are called <b>dunder</b> (\"double underscore\") or magic methods: Python calls them for you at special moments.</p>" },
    { t: "lines", rows: [
      ["def __str__(self):", "A dunder method. You never call it directly — <code>print()</code> and <code>str()</code> call it."],
      ["    return f\"{self.code} ({self.credits} credits)\"", "Build the text from the object's attributes and <b>return</b> it."],
      ["print(cs)", "Python sees an object, calls <code>cs.__str__()</code>, and prints the returned string."],
    ] },
    { t: "ar", html: "__str__ تحدد النص الذي يظهر عند print للكائن. لازم ترجع نصًا بـ return وليس print." },
    { t: "check", q: "Which `__str__` is correct?", o: ["`def __str__(self): print(self.name)`", "`def __str__(self): return self.name`", "`def __str__(): return self.name`", "`def str(self): return self.name`"], a: 1, e: "It needs `self`, the exact dunder name, and it must **return** a string.", hint: "Three things: the right name, `self`, and `return`." },

    { t: "h", text: "Shared data: class attributes" },
    { t: "p", html: "<p>Attributes set with <code>self.</code> belong to one object. Sometimes a value is the same for <b>every</b> object — all students are at the same university. You can write it directly in the class body: it is a <b>class attribute</b>, shared by all objects.</p>" },
    { t: "code", code: c`class Student:
    university = "PSU"      # shared by all students
    count = 0

    def __init__(self, name):
        self.name = name      # different for each student
        Student.count += 1

a = Student("Sara")
b = Student("Omar")
print(a.university, b.university, Student.count)`, note: "<p><code>Student.count += 1</code> changes the shared counter, so after two students it is 2. Be careful: never put a list in the class body if each object needs its own list — create it in <code>__init__</code> with <code>self.</code> instead (today's puzzle shows why).</p>" },

    { t: "steps", title: "A bank account class", problem: "<p>Build a <code>BankAccount</code> for {{name}}. It knows its owner and balance, can <b>deposit</b> and <b>withdraw</b> (but never go below zero), and prints like <code>{{name}}: 650.00 SAR</code>.</p>", steps: [
      { html: "<p><b>Understand.</b> What does an account <i>know</i>? An owner and a balance → these become <b>attributes</b>. What can it <i>do</i>? Deposit, withdraw, show itself → these become <b>methods</b>.</p>" },
      { html: "<p><b>Set up the object.</b> <code>__init__</code> stores the owner and a starting balance (default 0).</p>", code: c`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance` },
      { html: "<p><b>Deposit.</b> Add to <code>self.balance</code>. Refuse negative amounts with <code>raise</code> (Day 17).</p>", code: c`    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount` },
      { html: "<p><b>Withdraw.</b> Check first, change second. Return <code>True</code>/<code>False</code> so the caller knows if it worked.</p>", code: c`    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
            return False
        self.balance -= amount
        return True` },
      { html: "<p><b>Print nicely and test.</b> Add <code>__str__</code>, then create an account and try every method, including one that should fail.</p>", code: c`    def __str__(self):
        return f"{self.owner}: {self.balance:,.2f} SAR"` },
    ], code: c`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
            return False
        self.balance -= amount
        return True

    def __str__(self):
        return f"{self.owner}: {self.balance:,.2f} SAR"

acc = BankAccount("{{name}}", 500)
acc.deposit(250)
acc.withdraw(1000)
acc.withdraw(100)
print(acc)`, ar: "خطوات تصميم أي كلاس: ماذا يعرف الكائن؟ (خصائص في __init__) وماذا يفعل؟ (دوال methods) ثم __str__ للطباعة، ثم نجرب." },

    { t: "table", head: ["Word", "Meaning", "Example"], rows: [
      ["class", "the blueprint of a new type", "`class Student:`"],
      ["object / instance", "one thing made from the class", "`s = Student(\"Sara\")`"],
      ["`__init__`", "runs automatically when an object is created", "`def __init__(self, name):`"],
      ["`self`", "the object the method is working on", "`self.name = name`"],
      ["attribute", "data stored in an object", "`s.name`"],
      ["method", "a function inside a class", "`s.add_mark(90)`"],
      ["`__str__`", "the text `print(obj)` shows", "`return f\"...\"`"],
    ] },
  ],
  mistakes: [
    { title: "Forgetting self in the method definition", html: "Python always passes the object as the first argument. If the method has no parameter to receive it, you get <code>TypeError: ... takes 0 positional arguments but 1 was given</code>.", wrong: c`class Dog:
    def bark():
        print("Woof")
Dog().bark()   # TypeError`, right: c`class Dog:
    def bark(self):
        print("Woof")
Dog().bark()` },
    { title: "Forgetting self. when storing", html: "Without <code>self.</code> the value is just a local variable that disappears when <code>__init__</code> ends.", wrong: c`class Car:
    def __init__(self, brand):
        brand = brand
print(Car("Toyota").brand)   # AttributeError`, right: c`class Car:
    def __init__(self, brand):
        self.brand = brand
print(Car("Toyota").brand)`, ar: "بدون self. القيمة لا تُحفظ داخل الكائن وتختفي بعد انتهاء الدالة." },
    { title: "Misspelled __init__", html: "<code>__int__</code> or <code>_init_</code> (one underscore) is silently ignored, then creating the object fails with a confusing <code>TypeError</code>.", wrong: c`def _init_(self, name):`, right: c`def __init__(self, name):`, ar: "__init__ فيها شرطتان سفليتان قبلها وبعدها." },
    { title: "Calling a method on the class instead of an object", html: "<code>Student.add_mark(90)</code> has no object, so 90 becomes <code>self</code> and <code>mark</code> is missing. Create an object first and call the method on it.", wrong: c`Student.add_mark(90)`, right: c`s = Student("Sara")
s.add_mark(90)` },
    { title: "__str__ that prints instead of returns", html: "<code>print(obj)</code> needs a string back. If <code>__str__</code> prints and returns nothing, you get <code>TypeError: __str__ returned non-string</code>.", wrong: c`def __str__(self):
    print(self.name)`, right: c`def __str__(self):
    return self.name` },
  ],
  tricks: [
    { title: "__repr__ for debugging", html: "<code>__repr__</code> is what you see inside lists and in the shell. Define it and your lists of objects become readable.", code: c`class P:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __repr__(self):
        return f"P({self.x}, {self.y})"
print([P(1, 2), P(3, 4)])` },
    { title: "See all attributes with vars()", html: "<code>vars(obj)</code> returns a dictionary of the object's attributes — handy when you are not sure what an object holds.", code: c`class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

print(vars(Book("Dune", 412)))` },
    { title: "dataclass writes __init__ for you", html: "For classes that mostly hold data, the <code>@dataclass</code> decorator writes <code>__init__</code> and a readable print for you. Learn the normal way first; use this later as a shortcut.", code: c`from dataclasses import dataclass

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
    { t: "predict", code: c`class Order:
    def __init__(self, drink):
        print("New order:", drink)
        self.drink = drink

first = Order("latte")
second = Order("tea")
print(first.drink)`, explain: "<code>__init__</code> runs at each <code>Order(...)</code>, so the two \"New order\" lines come first, in creation order. Then <code>first.drink</code> is <code>latte</code>." },
    { t: "predict", code: c`class Wallet:
    def __init__(self, riyals):
        self.riyals = riyals
    def spend(self, amount):
        self.riyals -= amount

w1 = Wallet(100)
w2 = Wallet(100)
w1.spend(30)
w2.spend(5)
w1.spend(20)
print(w1.riyals, w2.riyals)`, explain: "w1: 100 − 30 − 20 = <code>50</code>. w2: 100 − 5 = <code>95</code>. Each wallet keeps its own money." },
    { t: "parsons", title: "A lamp that switches", prompt: "Arrange the lines so the program prints <code>False</code> then <code>True</code>.", lines: ["class Lamp:", "    def __init__(self):", "        self.on = False", "    def switch(self):", "        self.on = not self.on", "lamp = Lamp()", "print(lamp.on)", "lamp.switch()", "print(lamp.on)"], distractors: ["        on = not on"], explain: "The lamp starts off in <code>__init__</code>. <code>switch</code> flips the object's own attribute, so it must use <code>self.on</code>." },
    { t: "try", title: "Your pet", html: "<p>Finish the <code>Pet</code> class: add a method <code>play()</code> that lowers <code>energy</code> by 3 and a <code>__str__</code> that returns something like <code>Pixel (energy 4)</code>. Create two pets and show they are independent.</p>", code: c`class Pet:
    def __init__(self, name):
        self.name = name
        self.energy = 5

    def feed(self):
        self.energy += 2

    # add play() and __str__ here

p = Pet("Pixel")
p.feed()
print(p.energy)
` },
  ],
  exercises: [
    { id: "circle", lvl: "seed", title: "Circle", prompt: "<p>Create class <code>Circle</code> with attribute <code>radius</code> and methods <code>area()</code> and <code>perimeter()</code>, both rounded to 2 decimals (use <code>math.pi</code>).</p>", starter: "import math\n\nclass Circle:\n    pass\n", tests: [{ after: "c = Circle(2)\nprint(c.radius, c.area(), c.perimeter())", expected: "2 12.57 12.57" }, { after: "print(Circle(1).area())", expected: "3.14" }],
      hint: "<code>__init__(self, radius)</code> stores <code>self.radius</code>. Area = π·r², perimeter = 2·π·r. Use <code>round(..., 2)</code>.", ar: "خزّن{{g:|ي}} نصف القطر في self.radius، ثم استخدم{{g:|ي}}ه داخل الدالتين عن طريق self.",
      solutions: [{ name: "Class", code: c`import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return round(math.pi * self.radius ** 2, 2)

    def perimeter(self):
        return round(2 * math.pi * self.radius, 2)` }] },
    { id: "rect18", lvl: "seed", title: "Room object", prompt: "<p>Create class <code>Room(width, length)</code> with methods <code>area()</code>, <code>perimeter()</code> and <code>is_square()</code> (returns <code>True</code> or <code>False</code>).</p>", starter: "class Room:\n    pass\n", tests: [{ after: "r = Room(3, 4)\nprint(r.area(), r.perimeter(), r.is_square())", expected: "12 14 False" }, { after: "print(Room(5, 5).is_square())", expected: "True" }],
      hint: "Store both sizes with <code>self.</code> in <code>__init__</code>. <code>is_square</code> can return the comparison <code>self.width == self.length</code> directly.",
      solutions: [{ name: "Class", code: c`class Room:
    def __init__(self, width, length):
        self.width = width
        self.length = length

    def area(self):
        return self.width * self.length

    def perimeter(self):
        return 2 * (self.width + self.length)

    def is_square(self):
        return self.width == self.length` }] },
    { id: "student", lvl: "seed", title: "Student with marks", prompt: "<p>Class <code>Student(name)</code> with a <code>marks</code> list, <code>add(mark)</code>, <code>average()</code> (0 if no marks) and <code>__str__</code> returning <code>NAME (avg X.X)</code>.</p>", starter: "class Student:\n    pass\n", tests: [{ after: "s = Student('Sara')\nprint(s)\ns.add(90); s.add(85)\nprint(s.average())\nprint(s)", expected: "Sara (avg 0.0)\n87.5\nSara (avg 87.5)" }],
      hint: "Create <code>self.marks = []</code> in <code>__init__</code>. In <code>__str__</code>, call <code>self.average()</code> and format with <code>:.1f</code>.",
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
      hint: "Three attributes in <code>__init__</code>: owner, balance, history. In each method: check first and <code>return False</code>; otherwise change the balance, append to history, <code>return True</code>.",
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
      hint: "Keep a dictionary inside the object: <code>self.items = {}</code> mapping item → [price, qty].",
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
      hint: "A dictionary title → borrower, with <code>None</code> meaning \"on the shelf\".",
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
      hint: "There are three bugs, all from today's \"Common mistakes\": a name, a missing <code>self.</code>, and a missing parameter.", ar: "ابحث{{g:|ي}} عن: اسم __init__، و self. عند الحفظ، و self كأول معامل.",
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
    { q: "Inside a method, how do you read the object's `price` attribute?", o: ["`price`", "`self.price`", "`self[price]`", "`Product.price()`"], a: 1, e: "Attributes are reached through `self.` inside the class." },
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
  remember: [
    "A **class** is a blueprint; an **object** is one thing built from it: `s = Student(\"Sara\")`.",
    "`__init__` runs automatically for every new object and sets its starting attributes.",
    "`self` means \"this object\". It is the first parameter of every method, but you never pass it.",
    "Store data with `self.name = name`; read it with `obj.name` (outside) or `self.name` (inside).",
    "A **method** is a function in a class; call it with a dot and parentheses: `s.add_mark(90)`.",
    "`__str__` must **return** a string — it is what `print(obj)` shows.",
  ],
  rememberAr: "الكلاس قالب والكائن نسخة منه. __init__ تجهّز الكائن، و self تعني الكائن نفسه، والخصائص تُحفظ بـ self.، و __str__ ترجع نص الطباعة.",
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[18] = {
  title: "OOP: classes and objects",
  intro: "So far data (variables) and actions (functions) lived separately. <b>Object-oriented programming</b> bundles them: a <code>Student</code> object has its own data (name, marks) and its own actions (add a mark, compute the average). This is how large systems — games, banking apps, Instagram — are organized.",
  introAr: "البرمجة الكائنية تجمع البيانات والدوال في كيان واحد. الـ class هو القالب أو المخطط، والـ object هو نسخة حقيقية منه. نتعلم __init__ و self والخصائص attributes والدوال methods.",
  goals: ["Explain class vs object", "Write a class with `__init__` and attributes", "Add methods that use `self`", "Create several independent objects", "Make objects print nicely with `__str__`"],
  learn: [
    { t: "h", text: "Blueprint and houses" },
    { t: "analogy", title: "Class = blueprint, object = house", html: "<p>An architect draws one <b>blueprint</b> (the class). From it you can build many <b>houses</b> (objects). Every house has the same structure — rooms, doors — but each has its own paint color and owner. Changing one house doesn't change the others.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name, major):
        self.name = name
        self.major = major
        self.marks = []

s1 = Student("{{name}}", "CS")
s2 = Student("Omar", "IS")
s1.marks.append(95)
print(s1.name, s1.major, s1.marks)
print(s2.name, s2.major, s2.marks)` },
    { t: "p", html: "<ul><li><code>class Student:</code> defines the blueprint (class names use CapitalWords).</li><li><code>__init__</code> is the <b>constructor</b>: it runs automatically when you create an object with <code>Student(...)</code>.</li><li><code>self</code> is the object being built. <code>self.name = name</code> stores the value <b>inside this object</b> — an <b>attribute</b>.</li></ul>" },
    { t: "ar", html: "self تعني \"هذا الكائن نفسه\". عند كتابة s1 = Student(\"{{name}}\", \"CS\") يستدعي بايثون __init__ ويكون self هو s1." },
    { t: "h", text: "Methods: what an object can do" },
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
print(s.name, s.average())`, before: "<p>A method is a function inside a class. Its first parameter is always <code>self</code>, but when you call it you don't pass it: <code>s.add_mark(90)</code> means <code>Student.add_mark(s, 90)</code>.</p>" },
    { t: "h", text: "A bank account" },
    { t: "code", code: c`class BankAccount:
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
print(acc)`, note: "<p><code>__str__</code> decides what <code>print(obj)</code> shows. Without it you would see something like <code>&lt;__main__.BankAccount object at 0x...&gt;</code>. Methods whose names start and end with double underscores are called <b>dunder</b> (magic) methods.</p>" },
    { t: "h", text: "Class attributes" },
    { t: "code", code: c`class Student:
    university = "PSU"      # shared by all students
    count = 0

    def __init__(self, name):
        self.name = name      # different for each student
        Student.count += 1

a = Student("Sara")
b = Student("Omar")
print(a.university, b.university, Student.count)` },
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

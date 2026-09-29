window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[19] = {
  title: "OOP: inheritance and polymorphism",
  intro: "A university has students, instructors and staff. They are all <b>people</b> with a name and an ID, but each has something special. Instead of copying the shared code three times, <b>inheritance</b> lets each class reuse a parent class and add only what's different.",
  introAr: "الوراثة تسمح لكلاس جديد أن يرث كل خصائص ودوال كلاس آخر ويضيف أو يعدّل عليها. وتعدد الأشكال (polymorphism) يعني أن نستدعي نفس الدالة على كائنات مختلفة وكل كائن يتصرف بطريقته.",
  goals: ["Create a child class that inherits from a parent", "Extend `__init__` with `super()`", "Override methods", "Use polymorphism: one loop, many object types", "Know when to use inheritance vs composition"],
  learn: [
    { t: "h", text: "Parent and child classes" },
    { t: "code", code: c`class Person:
    def __init__(self, name, pid):
        self.name = name
        self.pid = pid

    def introduce(self):
        return f"I am {self.name} ({self.pid})"

class Student(Person):
    def __init__(self, name, pid, major):
        super().__init__(name, pid)
        self.major = major

    def introduce(self):
        return super().introduce() + f", studying {self.major}"

class Instructor(Person):
    def introduce(self):
        return f"Dr. {self.name} here"

print(Student("{{name}}", "S123", "CS").introduce())
print(Instructor("Hamed", "F7").introduce())
print(Person("Guest", "G0").introduce())` },
    { t: "p", html: "<ul><li><code>class Student(Person)</code>: Student <b>is a</b> Person and gets all its methods for free.</li><li><code>super().__init__(...)</code> runs the parent's constructor so the shared attributes are set, then the child adds its own.</li><li>Defining <code>introduce</code> again <b>overrides</b> the parent's version. <code>super().introduce()</code> can still use the original.</li></ul>" },
    { t: "ar", html: "كلمة super() تعني \"الكلاس الأب\". نستخدمها لاستدعاء __init__ الخاص بالأب حتى لا نكرر الكود." },
    { t: "h", text: "Polymorphism: same call, different behavior" },
    { t: "viz", code: c`class Shape:
    def area(self):
        return 0

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base, self.height = base, height
    def area(self):
        return self.base * self.height / 2

shapes = [Square(3), Triangle(4, 5), Square(1)]
for s in shapes:
    print(type(s).__name__, s.area())`, before: "<p>The loop doesn't care what kind of shape it has — it just calls <code>area()</code>, and each object answers in its own way.</p>" },
    { t: "h", text: "Checking types" },
    { t: "code", code: c`class Animal: pass
class Cat(Animal): pass

tom = Cat()
print(isinstance(tom, Cat), isinstance(tom, Animal))
print(issubclass(Cat, Animal))` },
    { t: "h", text: "Is-a vs has-a" },
    { t: "p", html: "<p>Use inheritance for <b>is-a</b> relationships (a Student <i>is a</i> Person). For <b>has-a</b> relationships use <b>composition</b> — an object stored inside another (a Course <i>has</i> Students; a Car <i>has an</i> Engine). Beginners overuse inheritance; composition is often simpler.</p>" },
    { t: "code", code: c`class Engine:
    def start(self):
        return "Vroom"

class Car:
    def __init__(self):
        self.engine = Engine()     # has-a
    def drive(self):
        return self.engine.start() + ", driving!"

print(Car().drive())` },
    { t: "table", head: ["OOP idea", "Meaning"], rows: [["Encapsulation", "an object bundles its data and methods and hides details"], ["Inheritance", "a child class reuses and extends a parent"], ["Polymorphism", "the same method name works differently per class"], ["Abstraction", "users see what an object does, not how"]] },
  ],
  mistakes: [
    { title: "Forgetting super().__init__", html: "The child's <code>__init__</code> replaces the parent's, so shared attributes are never set.", wrong: c`class Student(Person):
    def __init__(self, name, pid, major):
        self.major = major
# Student(...).name -> AttributeError`, right: c`class Student(Person):
    def __init__(self, name, pid, major):
        super().__init__(name, pid)
        self.major = major` },
    { title: "Inheritance for has-a", html: "A Course is not a kind of Student.", wrong: c`class Course(Student): ...`, right: c`class Course:
    def __init__(self):
        self.students = []`, ar: "اسأل{{g:|ي}} نفسك: هل هو نوع من (is-a) أم يحتوي على (has-a)؟" },
  ],
  tricks: [
    { title: "Operator overloading", html: "Dunder methods let your objects use operators.", code: c`class Money:
    def __init__(self, sar):
        self.sar = sar
    def __add__(self, other):
        return Money(self.sar + other.sar)
    def __str__(self):
        return f"{self.sar} SAR"
print(Money(10) + Money(25))` },
    { title: "__eq__ and __lt__", html: "Define <code>__eq__</code> for <code>==</code> and <code>__lt__</code> so <code>sorted()</code> can sort your objects." },
  ],
  practice: [
    { t: "predict", code: c`class A:
    def hi(self):
        return "A"
class B(A):
    pass
class C(A):
    def hi(self):
        return "C" + super().hi()
print(B().hi(), C().hi())`, explain: "B inherits hi unchanged: <code>A</code>. C overrides and extends: <code>CA</code>." },
    { t: "parsons", title: "Dog is an Animal", prompt: "Build the hierarchy so the program prints <code>Rex says Woof</code>.", lines: ["class Animal:", "    def __init__(self, name):", "        self.name = name", "class Dog(Animal):", "    def speak(self):", c`        return f"{self.name} says Woof"`, c`print(Dog("Rex").speak())`], distractors: ["class Dog:"], explain: "Dog reuses Animal's constructor, so <code>self.name</code> exists." },
    { t: "try", title: "Employee payroll", html: "<p>Create <code>Employee(name, salary)</code> with <code>pay()</code>, then <code>Manager(Employee)</code> whose pay adds a 20% bonus. Put both in a list and print everyone's pay with one loop.</p>", code: c`class Employee:
    pass
` },
  ],
  exercises: [
    { id: "vehicles", lvl: "seed", title: "Vehicles", prompt: "<p>Class <code>Vehicle(brand, wheels)</code> with <code>describe()</code> returning <code>\"BRAND with N wheels\"</code>. Children <code>Car(brand)</code> (4 wheels) and <code>Bike(brand)</code> (2 wheels) set the wheels automatically with <code>super()</code>.</p>", starter: "class Vehicle:\n    pass\n\nclass Car(Vehicle):\n    pass\n\nclass Bike(Vehicle):\n    pass\n", tests: [{ after: "print(Car('Toyota').describe())\nprint(Bike('Trek').describe())\nprint(isinstance(Car('X'), Vehicle))", expected: "Toyota with 4 wheels\nTrek with 2 wheels\nTrue" }],
      solutions: [{ name: "super()", code: c`class Vehicle:
    def __init__(self, brand, wheels):
        self.brand = brand
        self.wheels = wheels

    def describe(self):
        return f"{self.brand} with {self.wheels} wheels"

class Car(Vehicle):
    def __init__(self, brand):
        super().__init__(brand, 4)

class Bike(Vehicle):
    def __init__(self, brand):
        super().__init__(brand, 2)` }] },
    { id: "shapes", lvl: "star", title: "Total area (polymorphism)", prompt: "<p>Classes <code>Rect(w, h)</code>, <code>Circle(r)</code> (use 3.14) and <code>Square(s)</code> — Square must inherit from Rect. Then write <code>total_area(shapes)</code> that sums <code>area()</code> for any list of shapes, rounded to 2 decimals.</p>", starter: "class Rect:\n    pass\n\nclass Square(Rect):\n    pass\n\nclass Circle:\n    pass\n\ndef total_area(shapes):\n    pass\n", tests: [{ after: "print(total_area([Rect(2, 3), Square(2), Circle(1)]))\nprint(isinstance(Square(1), Rect))", expected: "13.14\nTrue" }],
      solutions: [{ name: "Inheritance + loop", code: c`class Rect:
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h

class Square(Rect):
    def __init__(self, s):
        super().__init__(s, s)

class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14 * self.r ** 2

def total_area(shapes):
    return round(sum(s.area() for s in shapes), 2)`, note: "Circle doesn't inherit from Rect, yet <code>total_area</code> works with it: all it needs is an <code>area()</code> method (Python calls this <b>duck typing</b>)." }] },
    { id: "accounts", lvl: "star", title: "Savings account", prompt: "<p>Parent <code>Account(owner, balance=0)</code> with <code>deposit</code> and <code>withdraw</code> (withdraw returns False if not enough). Child <code>SavingsAccount</code> adds <code>add_interest(rate)</code> and <b>overrides</b> withdraw so it also refuses to go below 100 SAR.</p>", starter: "class Account:\n    pass\n\nclass SavingsAccount(Account):\n    pass\n", tests: [{ after: "s = SavingsAccount('Sara', 500)\nprint(s.withdraw(450), s.withdraw(400), s.balance)\ns.add_interest(0.1)\nprint(round(s.balance, 2))\na = Account('Omar', 50)\nprint(a.withdraw(50), a.balance)", expected: "False True 100\n110.0\nTrue 0" }],
      solutions: [{ name: "Override with super", code: c`class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True

class SavingsAccount(Account):
    MIN = 100

    def withdraw(self, amount):
        if self.balance - amount < self.MIN:
            return False
        return super().withdraw(amount)

    def add_interest(self, rate):
        self.deposit(self.balance * rate)` }] },
    { id: "zoo", lvl: "fire", title: "University people", prompt: "<p>Parent <code>Person(name)</code> with <code>role()</code> returning <code>\"person\"</code> and <code>__str__</code> → <code>\"NAME (ROLE)\"</code>. Children <code>Student</code> and <code>Instructor</code> override only <code>role()</code>. Write <code>count_roles(people)</code> returning a dict role → count.</p>", starter: "class Person:\n    pass\n\nclass Student(Person):\n    pass\n\nclass Instructor(Person):\n    pass\n\ndef count_roles(people):\n    pass\n", tests: [{ after: "ps = [Student('Sara'), Instructor('Hamed'), Student('Omar'), Person('Guest')]\nfor p in ps: print(p)\nprint(count_roles(ps))", expected: "Sara (student)\nHamed (instructor)\nOmar (student)\nGuest (person)\n{'student': 2, 'instructor': 1, 'person': 1}" }],
      solutions: [{ name: "Template method", code: c`class Person:
    def __init__(self, name):
        self.name = name
    def role(self):
        return "person"
    def __str__(self):
        return f"{self.name} ({self.role()})"

class Student(Person):
    def role(self):
        return "student"

class Instructor(Person):
    def role(self):
        return "instructor"

def count_roles(people):
    counts = {}
    for p in people:
        counts[p.role()] = counts.get(p.role(), 0) + 1
    return counts`, note: "The parent's <code>__str__</code> calls <code>self.role()</code>, which runs the <b>child's</b> version. The parent defines the shape; children fill in details." }] },
    { id: "fix19", lvl: "fire", debug: true, title: "Broken inheritance", prompt: "<p>Fix the classes so the test prints <code>Lina, CS, GPA 3.9</code>.</p>", starter: c`class Person:
    def __init__(self, name):
        self.name = name

class Student(Person):
    def __init__(self, name, major, gpa):
        self.major = major
        self.gpa = gpa

    def info(self):
        return f"{name}, {self.major}, GPA {self.gpa}"`, tests: [{ after: "print(Student('Lina', 'CS', 3.9).info())", expected: "Lina, CS, GPA 3.9" }],
      solutions: [{ name: "Fixed", code: c`class Person:
    def __init__(self, name):
        self.name = name

class Student(Person):
    def __init__(self, name, major, gpa):
        super().__init__(name)
        self.major = major
        self.gpa = gpa

    def info(self):
        return f"{self.name}, {self.major}, GPA {self.gpa}"` }] },
  ],
  quiz: [
    { q: "`class Cat(Animal):` means…", o: ["Animal inherits from Cat", "Cat inherits from Animal", "They are the same", "Cat contains an Animal"], a: 1, e: "The parent goes in parentheses." },
    { q: "What does `super().__init__(name)` do?", o: ["Creates a new parent object", "Runs the parent's constructor on this object", "Deletes the parent", "Nothing"], a: 1, e: "Sets up the inherited attributes." },
    { q: "A child defines a method with the same name as the parent. This is…", o: ["overloading", "overriding", "a SyntaxError", "composition"], a: 1, e: "The child's version is used." },
    { q: "Car has an Engine. Best design?", o: ["`class Car(Engine)`", "`class Engine(Car)`", "Car stores an Engine object", "Global variables"], a: 2, e: "Has-a → composition." },
    { q: "`isinstance(Student(...), Person)` is…", o: ["True", "False", "Error", "None"], a: 0, e: "A Student is a Person." },
  ],
  puzzle: { title: "Method resolution", q: "<p>What does this print?</p>", code: c`class A:
    def who(self):
        return "A" + self.tag()
    def tag(self):
        return "a"
class B(A):
    def tag(self):
        return "b"
print(A().who(), B().who())`, answers: ["aa ab"], hint: "<code>who</code> is only in A, but <code>self.tag()</code> depends on the object's real class.", ar: "self.tag() تستدعي نسخة الكلاس الحقيقي للكائن.", e: "For a B object, <code>self.tag()</code> runs B's version: <code>Aa Ab</code>. This is polymorphism at work (the checker ignores capital letters)." },
  cards: [
    { f: "Inherit from a class", b: "`class Child(Parent):`" },
    { f: "Call the parent's constructor", b: "`super().__init__(...)`" },
    { f: "Overriding", b: "Redefining a parent method in the child class." },
    { f: "Polymorphism", b: "Same method call, different behavior depending on the object's class." },
    { f: "is-a vs has-a", b: "is-a → inheritance; has-a → composition (store an object inside)." },
  ],
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[19] = {
  title: "OOP: inheritance and polymorphism",
  intro: "A university has students, instructors and staff. They are all <b>people</b> with a name and an ID, but each has something special. Instead of copying the shared code three times, <b>inheritance</b> lets each class reuse a parent class and add only what's different. Yesterday's ideas — <code>__init__</code>, <code>self</code>, methods — are all you need, {{name}}.",
  introAr: "الوراثة تسمح لكلاس جديد أن يرث كل خصائص ودوال كلاس آخر ويضيف أو يعدّل عليها. وتعدد الأشكال (polymorphism) يعني أن نستدعي نفس الدالة على كائنات مختلفة وكل كائن يتصرف بطريقته.",
  goals: ["Create a child class that inherits from a parent", "Add new methods in a child class", "Extend `__init__` with `super()`", "Override methods (and still reuse the parent's version)", "Use polymorphism: one loop, many object types", "Know when to use inheritance vs composition"],
  learn: [
    { t: "h", text: "The problem: copy-paste classes" },
    { t: "p", html: "<p>Say you write a <code>Student</code> class and an <code>Instructor</code> class. Both need a name, an ID and a way to introduce themselves. With yesterday's tools you would write the same <code>__init__</code> twice. Now imagine finding a bug in it — you must fix it in two (or ten) places, and you will forget one.</p>" },
    { t: "code", code: c`class Student:
    def __init__(self, name, pid):
        self.name = name
        self.pid = pid

class Instructor:
    def __init__(self, name, pid):     # the same code again!
        self.name = name
        self.pid = pid

print(Student("{{name}}", "S1").name, Instructor("Hamed", "F7").name)`, before: "<p>This works, but look how much is repeated. Programmers have a rule: <b>DRY — Don't Repeat Yourself</b>.</p>" },
    { t: "analogy", title: "Inheritance is like family traits", html: "<p>A child inherits things from a parent — eye color, family name — without anyone writing them down again. The child can also have new things the parent doesn't have (playing the guitar) and can do some things differently. A child class works the same way: it gets everything from the parent class for free, then adds or changes only what is special.</p>" },

    { t: "h", text: "Your first child class" },
    { t: "p", html: "<p>Write the shared code once in a <b>parent</b> class (also called <b>base</b> class). Then create a <b>child</b> class by putting the parent's name in parentheses after the child's name. The child automatically has every attribute and method of the parent.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name, pid):
        self.name = name
        self.pid = pid

    def introduce(self):
        return f"I am {self.name} ({self.pid})"

class Student(Person):
    pass

s = Student("{{name}}", "S123")
print(s.introduce())`, before: "<p>The <code>Student</code> class body is empty (<code>pass</code>), yet the object can do everything a <code>Person</code> can.</p>", note: "<p><code>Student(\"{{name}}\", \"S123\")</code> used <code>Person</code>'s <code>__init__</code>, and <code>s.introduce()</code> used <code>Person</code>'s method. Nothing was copied.</p>" },
    { t: "lines", rows: [
      ["class Person:", "The <b>parent</b>: the general idea, with everything people share."],
      ["class Student(Person):", "The <b>child</b>. Read the parentheses as \"Student <b>is a</b> Person\". It inherits all of Person's methods."],
      ["    pass", "Nothing new yet — the child is an exact copy of the parent's behavior."],
      ["s.introduce()", "Python looks for <code>introduce</code> in <code>Student</code> first. Not there? It looks in the parent, <code>Person</code>, and finds it."],
    ] },
    { t: "ar", html: "نكتب اسم الكلاس الأب بين قوسين: class Student(Person). هكذا يأخذ الابن كل دوال وخصائص الأب بدون نسخ الكود." },
    { t: "check", q: "In `class Laptop(Computer):`, which class is the parent?", o: ["`Laptop`", "`Computer`", "Both", "Neither"], a: 1, e: "The parent goes inside the parentheses. A Laptop **is a** Computer.", hint: "Read it as \"Laptop is a …\"" },

    { t: "h", text: "Adding something new in the child" },
    { t: "p", html: "<p>A child that is an exact copy is not very useful. The real power: the child keeps everything from the parent <b>and</b> adds its own methods. Those new methods belong only to the child — the parent does not get them.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, I am {self.name}"

class Student(Person):
    def study(self, subject):
        return f"{self.name} is studying {subject}"

s = Student("{{name}}")
print(s.greet())
print(s.study("Python"))`, note: "<p><code>s.greet()</code> comes from the parent; <code>s.study()</code> comes from the child. A plain <code>Person(\"Guest\").study(\"Math\")</code> would fail with <code>AttributeError</code>, because <code>study</code> exists only in <code>Student</code>.</p>" },
    { t: "check", q: "Which line causes an error?", code: c`class Animal:
    def eat(self):
        return "eating"

class Bird(Animal):
    def fly(self):
        return "flying"

b = Bird()
a = Animal()
print(b.eat())    # line A
print(b.fly())    # line B
print(a.fly())    # line C`, o: ["line A", "line B", "line C", "none"], a: 2, e: "A Bird gets `eat` from Animal and has its own `fly`. But an Animal does not have `fly` — inheritance goes from parent to child, never the other way.", hint: "Does the parent get the child's methods?" },

    { t: "h", text: "super().__init__: extending the constructor" },
    { t: "p", html: "<p>A student has everything a person has <b>plus</b> a major. So <code>Student</code> needs its own <code>__init__</code> with one extra parameter. But if the child writes its own <code>__init__</code>, it <b>replaces</b> the parent's one — and then <code>name</code> and <code>pid</code> are never set. The fix is <code>super()</code>: it means \"the parent class\". <code>super().__init__(name, pid)</code> runs the parent's setup first, and then the child adds its own attribute.</p>" },
    { t: "analogy", title: "super() is asking your parent to do their part", html: "<p>Think of registering at a sports club through your family's membership. Your parent's form already has the family name and address — you don't write them again. You just ask your parent to fill their part (<code>super().__init__</code>), then you add your own line: your sport.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name, pid):
        self.name = name
        self.pid = pid

class Student(Person):
    def __init__(self, name, pid, major):
        super().__init__(name, pid)
        self.major = major

s = Student("{{name}}", "S123", "CS")
print(s.name, s.pid, s.major)`, before: "<p>Look at the child's <code>__init__</code>: one line passes the shared data up to the parent, one line stores the new data.</p>" },
    { t: "lines", rows: [
      ["def __init__(self, name, pid, major):", "The child's constructor takes everything it needs: the parent's data <b>and</b> the new <code>major</code>."],
      ["    super().__init__(name, pid)", "Call the <b>parent's</b> <code>__init__</code> on this same object. It sets <code>self.name</code> and <code>self.pid</code>. Notice: no <code>self</code> in the parentheses — Python passes it."],
      ["    self.major = major", "Now add what is special about a student."],
    ] },
    { t: "ar", html: "super() تعني الكلاس الأب. نستدعي super().__init__(...) داخل __init__ الخاصة بالابن حتى يجهّز الأب خصائصه المشتركة، ثم نضيف خصائص الابن." },
    { t: "check", q: "What happens here?", code: c`class Person:
    def __init__(self, name):
        self.name = name

class Student(Person):
    def __init__(self, name, major):
        self.major = major

s = Student("Lina", "CS")
print(s.name)`, o: ["It prints `Lina`", "It prints `CS`", "`AttributeError`: no attribute `name`", "It prints `None`"], a: 2, e: "The child's `__init__` replaced the parent's and never called `super().__init__(name)`, so `self.name` was never created.", hint: "Which `__init__` actually ran — the parent's or the child's?" },

    { t: "h", text: "Overriding: doing it differently" },
    { t: "p", html: "<p>Sometimes the child should do the same job <b>in its own way</b>. An instructor introduces themselves as \"Dr. …\". If the child defines a method with the <b>same name</b> as the parent, the child's version wins. This is called <b>overriding</b>. And if the child wants to <i>add</i> to the parent's version instead of replacing it, it can call <code>super().method()</code> inside.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return f"I am {self.name}"

class Instructor(Person):
    def introduce(self):                      # replaces the parent's version
        return f"Dr. {self.name} here"

class Student(Person):
    def introduce(self):                      # extends the parent's version
        return super().introduce() + ", a student"

print(Person("Guest").introduce())
print(Instructor("Hamed").introduce())
print(Student("{{name}}").introduce())`, note: "<p>Three classes, one method name, three different answers. <code>Student</code> reuses the parent's sentence and adds to the end of it.</p>" },
    { t: "ar", html: "إذا كتب الابن دالة بنفس اسم دالة الأب فنسخة الابن هي التي تعمل (overriding). ويمكنه استدعاء نسخة الأب بـ super() ثم الإضافة عليها." },
    { t: "check", q: "What does this print?", code: c`class Drink:
    def price(self):
        return 10

class Latte(Drink):
    def price(self):
        return super().price() + 8

print(Latte().price())`, o: ["10", "8", "18", "An error"], a: 2, e: "`Latte` overrides `price`, but it calls the parent's version first (10) and adds 8: 18.", hint: "What does `super().price()` return?" },

    { t: "h", text: "Polymorphism: same call, different behavior" },
    { t: "p", html: "<p>Here is where it all pays off. If different classes have a method with the <b>same name</b>, you can put their objects in one list and call that method in one loop — without asking \"what kind of object is this?\". Each object answers in its own way. This is <b>polymorphism</b> (Greek for \"many shapes\").</p>" },
    { t: "analogy", title: "One button, many devices", html: "<p>The ▶ \"play\" button looks the same on a music app, a video app and a podcast app. You press the same button; each app plays in its own way. Your loop is the finger pressing <code>area()</code>; each shape decides what that means.</p>" },
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
    print(type(s).__name__, s.area())`, before: "<p>The loop doesn't care what kind of shape it has — it just calls <code>area()</code>. Visualize it and watch which <code>area</code> runs each time around the loop. (<code>type(s).__name__</code> just gives the class name as text, like <code>Square</code>, so you can see which shape is printed.)</p>" },
    { t: "ar", html: "تعدد الأشكال: نفس الاستدعاء s.area() على كائنات مختلفة، وكل كائن ينفّذ نسخته الخاصة. هذا يجعل الحلقة بسيطة جدًا." },
    { t: "check", q: "What does this print?", code: c`class Cat:
    def sound(self):
        return "Meow"

class Cow:
    def sound(self):
        return "Moo"

for animal in [Cow(), Cat(), Cow()]:
    print(animal.sound(), end=" ")`, o: ["`Meow Moo Meow`", "`Moo Meow Moo`", "`Moo Moo Moo`", "An error, they have no parent"], a: 1, e: "Each object uses its own class's `sound()`. They don't even need a shared parent — they only need a method with the same name.", hint: "Follow the order of the list." },

    { t: "h", text: "Checking types: isinstance" },
    { t: "p", html: "<p>Sometimes you do want to ask what an object is. <code>isinstance(obj, Class)</code> answers <code>True</code> if the object was made from that class <b>or any child of it</b> — because a Cat <i>is an</i> Animal.</p>" },
    { t: "code", code: c`class Animal: pass
class Cat(Animal): pass

tom = Cat()
print(isinstance(tom, Cat), isinstance(tom, Animal))
print(isinstance(Animal(), Cat))
print(issubclass(Cat, Animal))`, note: "<p>A Cat is an Animal (<code>True</code>), but a plain Animal is not a Cat (<code>False</code>). <code>issubclass</code> asks the same question about two classes.</p>" },

    { t: "h", text: "Is-a vs has-a" },
    { t: "p", html: "<p>Use inheritance only for <b>is-a</b> relationships: a Student <i>is a</i> Person, a Square <i>is a</i> Shape. For <b>has-a</b> relationships use <b>composition</b> — store one object inside another as an attribute: a Course <i>has</i> Students; a Car <i>has an</i> Engine. Beginners overuse inheritance; composition is often simpler. Quick test: say the sentence out loud. \"A car is an engine\" sounds wrong, so don't inherit.</p>" },
    { t: "code", code: c`class Engine:
    def start(self):
        return "Vroom"

class Car:
    def __init__(self):
        self.engine = Engine()     # has-a
    def drive(self):
        return self.engine.start() + ", driving!"

print(Car().drive())` },

    { t: "steps", title: "Gym membership fees", problem: "<p>A gym in Riyadh charges a normal member 150 SAR a month. Student members get 30% off, and VIP members pay 150 SAR plus 100 SAR for a personal trainer. Write classes for the three kinds and one function that totals the monthly fees for any list of members.</p>", steps: [
      { html: "<p><b>Understand.</b> All three are members (is-a!) with a name and a fee. Only the fee rule differs. So: one parent <code>Member</code> with <code>fee()</code>, and children that <b>override</b> <code>fee()</code>.</p>" },
      { html: "<p><b>Parent class.</b> Store the name and give the normal fee. Add <code>__str__</code> once here — every child will inherit it.</p>", code: c`class Member:
    def __init__(self, name):
        self.name = name

    def fee(self):
        return 150

    def __str__(self):
        return f"{self.name}: {self.fee()} SAR"` },
      { html: "<p><b>Children.</b> Each overrides <code>fee()</code> and reuses the parent's price with <code>super().fee()</code>, so if the normal price changes, the others follow.</p>", code: c`class StudentMember(Member):
    def fee(self):
        return super().fee() * 0.7

class VipMember(Member):
    def fee(self):
        return super().fee() + 100` },
      { html: "<p><b>Polymorphism.</b> The total function does not care which kind of member it gets — it just calls <code>fee()</code>.</p>", code: c`def monthly_total(members):
    total = 0
    for m in members:
        total += m.fee()
    return total` },
      { html: "<p><b>Test.</b> Put all kinds in one list, print each (the inherited <code>__str__</code> calls the right <code>fee()</code>!) and print the total.</p>" },
    ], code: c`class Member:
    def __init__(self, name):
        self.name = name

    def fee(self):
        return 150

    def __str__(self):
        return f"{self.name}: {self.fee()} SAR"

class StudentMember(Member):
    def fee(self):
        return super().fee() * 0.7

class VipMember(Member):
    def fee(self):
        return super().fee() + 100

def monthly_total(members):
    total = 0
    for m in members:
        total += m.fee()
    return total

gym = [Member("Omar"), StudentMember("{{name}}"), VipMember("Faisal")]
for m in gym:
    print(m)
print("Total:", monthly_total(gym), "SAR")`, ar: "الأب فيه الكود المشترك، وكل ابن يعدّل دالة fee فقط. والدالة monthly_total تعمل مع أي نوع عضو بفضل تعدد الأشكال." },

    { t: "table", head: ["OOP idea", "Meaning"], rows: [["Encapsulation", "an object bundles its data and methods and hides details"], ["Inheritance", "a child class reuses and extends a parent: `class B(A):`"], ["`super()`", "reach the parent's version: `super().__init__(...)`, `super().method()`"], ["Overriding", "the child redefines a parent method with the same name"], ["Polymorphism", "the same method call works differently per class"], ["Composition", "has-a: an object stored inside another object"]] },
  ],
  mistakes: [
    { title: "Forgetting super().__init__", html: "The child's <code>__init__</code> replaces the parent's, so shared attributes are never set.", wrong: c`class Student(Person):
    def __init__(self, name, pid, major):
        self.major = major
# Student(...).name -> AttributeError`, right: c`class Student(Person):
    def __init__(self, name, pid, major):
        super().__init__(name, pid)
        self.major = major`, ar: "إذا كتبت{{g:|ِ}} __init__ في الابن لا تنس{{g:|ي}} استدعاء super().__init__ للأب." },
    { title: "Inheritance for has-a", html: "A Course is not a kind of Student.", wrong: c`class Course(Student): ...`, right: c`class Course:
    def __init__(self):
        self.students = []`, ar: "اسأل{{g:|ي}} نفسك: هل هو نوع من (is-a) أم يحتوي على (has-a)؟" },
    { title: "Passing self to super()", html: "<code>super().__init__</code> already knows the object. Adding <code>self</code> gives one argument too many: <code>TypeError</code>.", wrong: c`super().__init__(self, name, pid)`, right: c`super().__init__(name, pid)` },
    { title: "Forgetting to return the parent's result", html: "Calling <code>super().introduce()</code> without using its return value throws the text away, and the method returns <code>None</code>.", wrong: c`def introduce(self):
    super().introduce()`, right: c`def introduce(self):
    return super().introduce() + ", a student"` },
  ],
  tricks: [
    { title: "Operator overloading", html: "Dunder methods let your objects use operators. <code>__add__</code> runs when you write <code>a + b</code>.", code: c`class Money:
    def __init__(self, sar):
        self.sar = sar
    def __add__(self, other):
        return Money(self.sar + other.sar)
    def __str__(self):
        return f"{self.sar} SAR"
print(Money(10) + Money(25))` },
    { title: "__eq__ and __lt__", html: "Define <code>__eq__</code> for <code>==</code> and <code>__lt__</code> (less than) so <code>sorted()</code> can sort your objects.", code: c`class Score:
    def __init__(self, points):
        self.points = points
    def __lt__(self, other):
        return self.points < other.points
    def __eq__(self, other):
        return self.points == other.points

print(Score(5) == Score(5))
print([s.points for s in sorted([Score(9), Score(2), Score(7)])])` },
    { title: "The class name of any object", html: "<code>type(obj).__name__</code> gives the class name as a string — great for printing what kind of object you have in a polymorphic loop.", code: c`class Square: pass
print(type(Square()).__name__)
print(type(3.5).__name__)` },
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
    { t: "predict", code: c`class Vehicle:
    def __init__(self, wheels):
        self.wheels = wheels

class Bike(Vehicle):
    def __init__(self):
        super().__init__(2)

b = Bike()
print(b.wheels, isinstance(b, Vehicle))`, explain: "<code>Bike()</code> passes 2 up to the parent, which stores it: <code>2 True</code>. A Bike is a Vehicle." },
    { t: "predict", code: c`class Phone:
    def ring(self):
        return "ring"

class Silent(Phone):
    def ring(self):
        return "..."

for p in [Phone(), Silent(), Phone()]:
    print(p.ring())`, explain: "Polymorphism: each object uses its own <code>ring</code>. Output: <code>ring</code>, <code>...</code>, <code>ring</code> on three lines." },
    { t: "parsons", title: "A teacher is a person", prompt: "Arrange the lines so the program prints <code>Huda teaches Math</code>. The child must reuse the parent's constructor.", lines: ["class Person:", "    def __init__(self, name):", "        self.name = name", "class Teacher(Person):", "    def __init__(self, name, subject):", "        super().__init__(name)", "        self.subject = subject", "t = Teacher(\"Huda\", \"Math\")", "print(t.name, \"teaches\", t.subject)"], distractors: ["        super().__init__(self, name)"], explain: "<code>super().__init__(name)</code> sets the name; then the child stores its subject. Passing <code>self</code> to <code>super().__init__</code> would be one argument too many." },
    { t: "try", title: "Animals choir", html: "<p>Add two more animals (any you like) that override <code>sound()</code>, add them to the list, and run. Notice you never touch the loop.</p>", code: c`class Animal:
    def __init__(self, name):
        self.name = name
    def sound(self):
        return "..."

class Camel(Animal):
    def sound(self):
        return "Hrrr"

choir = [Camel("Jamal"), Animal("Mystery")]
for a in choir:
    print(a.name, "says", a.sound())
` },
  ],
  exercises: [
    { id: "vehicles", lvl: "seed", title: "Vehicles", prompt: "<p>Class <code>Vehicle(brand, wheels)</code> with <code>describe()</code> returning <code>\"BRAND with N wheels\"</code>. Children <code>Car(brand)</code> (4 wheels) and <code>Bike(brand)</code> (2 wheels) set the wheels automatically with <code>super()</code>.</p>", starter: "class Vehicle:\n    pass\n\nclass Car(Vehicle):\n    pass\n\nclass Bike(Vehicle):\n    pass\n", tests: [{ after: "print(Car('Toyota').describe())\nprint(Bike('Trek').describe())\nprint(isinstance(Car('X'), Vehicle))", expected: "Toyota with 4 wheels\nTrek with 2 wheels\nTrue" }],
      hint: "In <code>Car</code>: <code>def __init__(self, brand):</code> then <code>super().__init__(brand, 4)</code>.", ar: "الابن يمرر عدد العجلات للأب عن طريق super().__init__.",
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
    { id: "animals19", lvl: "seed", title: "Animal sounds", prompt: "<p>Parent <code>Animal(name)</code> with <code>sound()</code> returning <code>\"...\"</code> and <code>speak()</code> returning <code>\"NAME says SOUND\"</code>. Children <code>Dog</code> (<code>Woof</code>) and <code>Cat</code> (<code>Meow</code>) override <b>only</b> <code>sound()</code>.</p>", starter: "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nclass Cat(Animal):\n    pass\n", tests: [{ after: "for a in [Dog('Rex'), Cat('Mishmish'), Animal('Nemo')]:\n    print(a.speak())", expected: "Rex says Woof\nMishmish says Meow\nNemo says ..." }],
      hint: "<code>speak</code> is written once in the parent and calls <code>self.sound()</code>. For a Dog object, <code>self.sound()</code> runs Dog's version.",
      solutions: [{ name: "Override one method", code: c`class Animal:
    def __init__(self, name):
        self.name = name

    def sound(self):
        return "..."

    def speak(self):
        return f"{self.name} says {self.sound()}"

class Dog(Animal):
    def sound(self):
        return "Woof"

class Cat(Animal):
    def sound(self):
        return "Meow"`, note: "The children don't need <code>__init__</code> at all — they inherit the parent's." }] },
    { id: "sale19", lvl: "star", title: "Products on sale", prompt: "<p>Parent <code>Product(name, price)</code> with <code>final_price()</code> (just the price) and <code>__str__</code> → <code>\"NAME: X SAR\"</code> using <code>final_price()</code>. Child <code>SaleProduct(name, price, percent)</code> uses <code>super().__init__</code>, stores <code>percent</code> and overrides <code>final_price()</code> to take the percent off (rounded to 2 decimals).</p>", starter: "class Product:\n    pass\n\nclass SaleProduct(Product):\n    pass\n", tests: [{ after: "print(Product('Notebook', 12))\nprint(SaleProduct('Headphones', 200, 25))\nprint(SaleProduct('Pen', 3.5, 10).final_price())", expected: "Notebook: 12 SAR\nHeadphones: 150.0 SAR\n3.15" }],
      hint: "<code>round(self.price * (100 - self.percent) / 100, 2)</code>. The parent's <code>__str__</code> calls <code>self.final_price()</code>, so the child gets the right text without its own <code>__str__</code>.",
      solutions: [{ name: "super + override", code: c`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def final_price(self):
        return self.price

    def __str__(self):
        return f"{self.name}: {self.final_price()} SAR"

class SaleProduct(Product):
    def __init__(self, name, price, percent):
        super().__init__(name, price)
        self.percent = percent

    def final_price(self):
        return round(self.price * (100 - self.percent) / 100, 2)` }] },
    { id: "shapes", lvl: "star", title: "Total area (polymorphism)", prompt: "<p>Classes <code>Rect(w, h)</code>, <code>Circle(r)</code> (use 3.14) and <code>Square(s)</code> — Square must inherit from Rect. Then write <code>total_area(shapes)</code> that sums <code>area()</code> for any list of shapes, rounded to 2 decimals.</p>", starter: "class Rect:\n    pass\n\nclass Square(Rect):\n    pass\n\nclass Circle:\n    pass\n\ndef total_area(shapes):\n    pass\n", tests: [{ after: "print(total_area([Rect(2, 3), Square(2), Circle(1)]))\nprint(isinstance(Square(1), Rect))", expected: "13.14\nTrue" }],
      hint: "A square is a rectangle with equal sides: <code>super().__init__(s, s)</code>.",
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
      hint: "In the child's <code>withdraw</code>: if the balance would drop below 100, <code>return False</code>; otherwise <code>return super().withdraw(amount)</code>.",
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
      hint: "The parent's <code>__str__</code> calls <code>self.role()</code>. For counting, use a dictionary with <code>counts.get(key, 0) + 1</code>.",
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
      hint: "Two bugs: the parent never gets to set the name, and inside <code>info</code> the name must be read from the object.", ar: "ناقص super().__init__(name)، و name داخل info يجب أن تكون self.name.",
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
    { q: "A loop calls `x.area()` on squares, circles and triangles, and each gives its own answer. This is…", o: ["composition", "polymorphism", "recursion", "encapsulation"], a: 1, e: "Same call, different behavior per class." },
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
  remember: [
    "`class Child(Parent):` — the child gets every attribute and method of the parent for free.",
    "A child can **add** new methods; the parent does not get them.",
    "If the child has its own `__init__`, call `super().__init__(...)` first (without `self`).",
    "**Overriding**: a method with the same name in the child replaces the parent's; `super().method()` still reaches the original.",
    "**Polymorphism**: one loop can call the same method on different kinds of objects.",
    "is-a → inheritance; has-a → composition (an object stored as an attribute).",
  ],
  rememberAr: "الابن يرث كل شيء من الأب، ويضيف أو يعدّل. super() للوصول لنسخة الأب. ونفس الاستدعاء على كائنات مختلفة = تعدد الأشكال.",
};
})();

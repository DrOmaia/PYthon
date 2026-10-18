window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[19] = {
  title: "OOP: inheritance and polymorphism",
  intro: "A university has students, instructors and staff. They are all <b>people</b> with a name and an ID, but each has something special. Instead of copying the shared code three times, <b>inheritance</b> lets each class reuse a parent class and add only what's different.",
  introAr: "الوراثة تسمح لكلاس جديد أن يرث كل خصائص ودوال كلاس آخر ويضيف أو يعدّل عليها. وتعدد الأشكال (polymorphism) يعني أن نستدعي نفس الدالة على كائنات مختلفة وكل كائن يتصرف بطريقته.",
  goals: ["Create a child class that inherits from a parent", "Extend `__init__` with `super()`", "Override methods", "Use polymorphism: one loop, many object types", "Know when to use inheritance vs composition"],
  learn: [
    { t: "h", text: "Why inheritance matters" },
    { t: "p", html: "<p>Yesterday you wrote classes like <code>Student</code>. Now imagine a university system that also needs <code>Instructor</code> and <code>Staff</code>. All three have a name and an ID, and all three can introduce themselves. If you write three separate classes, you copy the same <code>__init__</code> three times — and when you find a bug, you must fix it three times.</p><p><b>Inheritance</b> solves this: you write the shared part <b>once</b> in a parent class, and each child class reuses it and adds only what is different.</p>" },
    { t: "analogy", title: "A family recipe", html: "<p>Your mother has a recipe for <i>kabsa</i>. You inherit it: you can cook it exactly as she does without writing it again. But you may <b>add</b> something (extra nuts) or <b>change</b> one step (less salt). The original recipe is the <b>parent class</b>; your version is the <b>child class</b>. You only write down the differences.</p>" },
    { t: "ar", html: "الوراثة تعني أن نكتب الجزء المشترك مرة واحدة في كلاس أب، ثم ترث منه كلاسات أبناء تضيف أو تغيّر ما يختلف فقط. هذا يمنع تكرار الكود." },

    { t: "h", text: "Parent and child classes" },
    { t: "p", html: "<p>To make a child class, write the parent's name in parentheses after the class name: <code>class Student(Person):</code>. Read it as <b>\"a Student is a Person\"</b>. The child automatically gets every method of the parent, including <code>__init__</code>.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name, pid):
        self.name = name
        self.pid = pid
    def introduce(self):
        return f"I am {self.name} ({self.pid})"
class Student(Person):
    pass
s = Student("{{name}}", "S123")
print(s.introduce())`, before: "<p>Look at <code>Student</code>: its body is only <code>pass</code> (an empty block). Predict whether <code>s.introduce()</code> works, then run it.</p>", note: "<p>Line by line:</p><ul><li>Lines 1–6 are an ordinary class from Day 18: <code>Person</code> stores a name and an ID and can introduce itself.</li><li><code>class Student(Person):</code> creates a child class. <code>pass</code> means \"nothing new to add\".</li><li><code>Student(\"{{name}}\", \"S123\")</code>: Student has no <code>__init__</code> of its own, so Python looks in the parent and uses <b>Person's</b> <code>__init__</code>.</li><li><code>s.introduce()</code> works the same way: Python does not find it in Student, so it looks in Person.</li></ul><p>The key rule: when you ask an object for a method, Python first looks in its own class, then in the parent.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name
class Student(Person):
    def study(self, subject):
        return f"{self.name} is studying {subject}"
s = Student("{{name}}")
print(s.study("Python"))
p = Person("Guest")
print(p.name)`, before: "<p>A child can also <b>add</b> new methods. Run it, then add the line <code>p.study(\"Math\")</code> at the end and see what happens.</p>", note: "<p>Line by line:</p><ul><li><code>Student</code> inherits <code>__init__</code> from <code>Person</code>, so <code>self.name</code> is set.</li><li>It also adds a brand-new method <code>study</code>, which uses the inherited <code>self.name</code>.</li><li><code>s.study(\"Python\")</code> prints <code>{{name}} is studying Python</code>.</li><li><code>p</code> is a plain <code>Person</code>. It has a name, but <b>no</b> <code>study</code> method: <code>p.study(\"Math\")</code> gives an <code>AttributeError</code>.</li></ul><p>Inheritance goes one way only: the child gets everything from the parent, but the parent gets nothing from the child.</p>" },
    { t: "ar", html: "نكتب class Student(Person): لنجعل Student ابنًا لـ Person، فيرث كل دواله بما فيها __init__. الابن يستطيع إضافة دوال جديدة، لكن الأب لا يملك دوال الابن." },

    { t: "h", text: "Extending __init__ with super()" },
    { t: "p", html: "<p>A student also needs a <b>major</b>. So Student needs its own <code>__init__</code>. But careful: as soon as the child writes <code>__init__</code>, it <b>replaces</b> the parent's version. The parent's lines (<code>self.name = name</code>…) will not run any more — unless you call them yourself with <code>super()</code>.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name
class Student(Person):
    def __init__(self, name, major):
        super().__init__(name)
        self.major = major
s = Student("{{name}}", "CS")
print(s.name, "-", s.major)`, before: "<p><code>super()</code> means \"my parent class\". Run it and see that both attributes exist.</p>", note: "<p>Line by line:</p><ul><li><code>Student(\"{{name}}\", \"CS\")</code> runs <b>Student's</b> <code>__init__</code> with <code>name=\"{{name}}\"</code> and <code>major=\"CS\"</code>.</li><li><code>super().__init__(name)</code> runs <b>Person's</b> <code>__init__</code> on this same object, so <code>self.name</code> is set there.</li><li><code>self.major = major</code> then adds the attribute that only students have.</li><li>Output: <code>{{name}} - CS</code>.</li></ul><p>Pattern to remember: first let the parent set up the shared attributes with <code>super().__init__(...)</code>, then add the child's own.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name
class Student(Person):
    def __init__(self, name, major):
        self.major = major
s = Student("{{name}}", "CS")
print(s.major)
print(s.name)`, expectError: true, before: "<p>This version <b>forgets</b> <code>super().__init__</code>. Run it and read the error.</p>", note: "<p>What happens:</p><ul><li>Student's <code>__init__</code> replaced Person's completely, and it never calls it.</li><li>So only <code>self.major</code> was created. <code>print(s.major)</code> works and prints <code>CS</code>.</li><li><code>print(s.name)</code> crashes with <code>AttributeError: 'Student' object has no attribute 'name'</code>: the line <code>self.name = name</code> never ran for this object.</li></ul><p>Whenever you see this error in a child class, first check: did I call <code>super().__init__(...)</code>?</p>" },
    { t: "ar", html: "إذا كتب الابن __init__ خاصًا به فإنه يحل محل __init__ الأب. لذلك نستدعي super().__init__(...) أولًا لتعيين الخصائص المشتركة، ثم نضيف خصائص الابن. انتبه{{g:|ي}}: نسيان super() يسبب AttributeError." },
    { t: "predict", code: c`class Phone:
    def __init__(self, brand):
        self.brand = brand
        self.apps = 0
class SmartPhone(Phone):
    def __init__(self, brand, apps):
        super().__init__(brand)
        self.apps = apps
print(SmartPhone("Nokia", 12).apps)`, explain: "<code>super().__init__(brand)</code> runs first and sets <code>self.apps = 0</code>. Then the next line in the child sets <code>self.apps = 12</code>, replacing it. Order matters: the last assignment wins. Output: <code>12</code>." },

    { t: "h", text: "Overriding methods" },
    { t: "p", html: "<p>Sometimes the child should do the <b>same job differently</b>. An instructor introduces themselves as \"Dr. ...\". To change an inherited method, simply define a method with the <b>same name</b> in the child. This is called <b>overriding</b>.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name
    def introduce(self):
        return f"I am {self.name}"
class Instructor(Person):
    def introduce(self):
        return f"Dr. {self.name} here"
print(Person("Guest").introduce())
print(Instructor("Hamed").introduce())`, before: "<p>Both classes have a method called <code>introduce</code>. Run it and compare the two lines.</p>", note: "<p>Line by line:</p><ul><li><code>Instructor</code> inherits <code>__init__</code> (it has none), so <code>self.name</code> is set by Person.</li><li>It defines its own <code>introduce</code>, which <b>overrides</b> the parent's.</li><li><code>Person(\"Guest\").introduce()</code> uses Person's version → <code>I am Guest</code>.</li><li><code>Instructor(\"Hamed\").introduce()</code>: Python looks in Instructor <b>first</b>, finds <code>introduce</code> there and stops → <code>Dr. Hamed here</code>.</li></ul><p>The parent's method is not deleted: Person objects still use it. Only Instructor objects use the new one.</p>" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name
    def introduce(self):
        return f"I am {self.name}"
class Student(Person):
    def introduce(self):
        return super().introduce() + ", a student"
print(Student("{{name}}").introduce())`, before: "<p>Often you don't want to throw away the parent's version — you want to <b>add</b> to it. <code>super()</code> works for any method, not only <code>__init__</code>.</p>", note: "<p>Line by line:</p><ul><li>Student overrides <code>introduce</code>.</li><li>Inside it, <code>super().introduce()</code> calls the <b>parent's</b> version, which returns <code>\"I am {{name}}\"</code>.</li><li>Then <code>+ \", a student\"</code> joins more text to it.</li><li>Output: <code>I am {{name}}, a student</code>.</li></ul><p>So you have two choices when overriding: <b>replace</b> the parent's behavior completely (Instructor), or <b>extend</b> it with <code>super()</code> (Student).</p>" },
    { t: "ar", html: "إعادة التعريف (overriding) تعني أن يكتب الابن دالة بنفس اسم دالة الأب، فيستخدم بايثون نسخة الابن. ويمكن{{g:ك|كِ}} استدعاء نسخة الأب داخلها بـ super().اسم_الدالة() لإضافة شيء عليها بدل استبدالها." },
    { t: "predict", code: c`class A:
    def hi(self):
        return "A"
class B(A):
    def hi(self):
        return "B" + super().hi()
class C(B):
    pass
print(A().hi(), B().hi(), C().hi())`, explain: "A uses its own <code>hi</code> → <code>A</code>. B overrides and extends: <code>\"B\" + \"A\"</code> → <code>BA</code>. C has no <code>hi</code>, so Python looks in its parent B → <code>BA</code>. Output: <code>A BA BA</code>. A child of a child inherits from the whole chain." },

    { t: "h", text: "Polymorphism: same call, different behavior" },
    { t: "p", html: "<p><b>Polymorphism</b> is a big word for a simple idea: you call the <b>same method name</b> on different objects, and each object answers in its own way. The code that calls the method does not need to know which kind of object it has. This lets one loop handle many types.</p>" },
    { t: "viz", code: c`class Shape:
    def area(self):
        return 0
class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2
for s in [Square(3), Shape(), Square(1)]:
    print(s.area())`, before: "<p>Visualize it and press Next ▶ slowly. Each time <code>s.area()</code> is called, watch which <code>area</code> Python jumps to.</p>", note: "<p>Step by step:</p><ul><li>The list holds three objects: a Square with side 3, a plain Shape, a Square with side 1.</li><li>Round 1: <code>s</code> is <code>Square(3)</code>. Python finds <code>area</code> in Square → <code>3 ** 2</code> → <code>9</code>.</li><li>Round 2: <code>s</code> is a <code>Shape</code>. Python uses Shape's <code>area</code> → <code>0</code>.</li><li>Round 3: <code>Square(1)</code> → <code>1</code>.</li></ul><p>The loop line <code>print(s.area())</code> never changes. The <b>object</b> decides what happens. Add a new shape class with its own <code>area</code> tomorrow, and this loop works with it without any change.</p>" },
    { t: "code", code: c`class Person:
    def role(self):
        return "person"
    def __str__(self):
        return "I am a " + self.role()
class Student(Person):
    def role(self):
        return "student"
print(Person())
print(Student())`, before: "<p>Polymorphism also works <b>inside</b> the parent. <code>__str__</code> is written only in Person — but watch what it prints for a Student.</p>", note: "<p>Line by line:</p><ul><li><code>print</code> on an object calls its <code>__str__</code> (Day 18). Student has no <code>__str__</code>, so Person's version runs for both objects.</li><li>Inside it, <code>self.role()</code> is called. <code>self</code> is the real object being printed.</li><li>For <code>Person()</code>, <code>self.role()</code> uses Person's version → <code>I am a person</code>.</li><li>For <code>Student()</code>, <code>self.role()</code> uses <b>Student's</b> version → <code>I am a student</code>.</li></ul><p>The parent defines the general shape of the answer, and each child fills in its own details. <code>self.method()</code> always starts looking in the object's real class.</p>" },
    { t: "tip", title: "Duck typing", html: "<p>Python doesn't even require a common parent. If an object has an <code>area()</code> method, the loop above can use it — \"if it walks like a duck and quacks like a duck, it is a duck\". Inheritance is still useful to <b>share code</b> and to make the family relationship clear.</p>" },
    { t: "ar", html: "تعدد الأشكال (polymorphism) يعني أن نستدعي نفس اسم الدالة على كائنات مختلفة، وكل كائن ينفذ نسخته الخاصة. و self.method() تبحث دائمًا في كلاس الكائن الحقيقي أولًا." },
    { t: "predict", code: c`class A:
    def who(self):
        return "A" + self.tag()
    def tag(self):
        return "a"
class B(A):
    def tag(self):
        return "b"
print(B().who())`, explain: "B has no <code>who</code>, so A's <code>who</code> runs. Inside it, <code>self</code> is a B object, so <code>self.tag()</code> runs <b>B's</b> <code>tag</code> → <code>\"b\"</code>. Output: <code>Ab</code>." },

    { t: "h", text: "Checking types: isinstance and issubclass" },
    { t: "p", html: "<p>Sometimes you need to ask \"what kind of object is this?\" Python has two built-in functions for that. <code>isinstance(obj, Class)</code> asks about an <b>object</b>; <code>issubclass(Child, Parent)</code> asks about two <b>classes</b>. Both return <code>True</code> or <code>False</code>.</p>" },
    { t: "code", code: c`class Animal:
    pass
class Cat(Animal):
    pass
tom = Cat()
print(isinstance(tom, Cat), isinstance(tom, Animal))
print(isinstance(Animal(), Cat))
print(issubclass(Cat, Animal))`, before: "<p>Predict each <code>True</code>/<code>False</code>, then run it.</p>", note: "<p>Line by line:</p><ul><li><code>isinstance(tom, Cat)</code> → <code>True</code>: tom was made from Cat.</li><li><code>isinstance(tom, Animal)</code> → <code>True</code> as well: a Cat <b>is an</b> Animal, so the answer includes parent classes.</li><li><code>isinstance(Animal(), Cat)</code> → <code>False</code>: a general animal is not necessarily a cat. The relation goes one way.</li><li><code>issubclass(Cat, Animal)</code> → <code>True</code>: Cat is a child of Animal.</li></ul><p>Use <code>isinstance</code> rarely: usually polymorphism (each class has its own method) is cleaner than many <code>if isinstance(...)</code> checks.</p>" },
    { t: "ar", html: "isinstance(كائن, كلاس) تسأل: هل هذا الكائن من هذا الكلاس أو من أحد أبنائه؟ و issubclass(ابن, أب) تسأل عن العلاقة بين كلاسين. انتبه{{g:|ي}}: القط حيوان، لكن ليس كل حيوان قطًا." },

    { t: "h", text: "Is-a vs has-a: inheritance or composition?" },
    { t: "p", html: "<p>Use inheritance only for <b>is-a</b> relationships: a Student <i>is a</i> Person, a Square <i>is a</i> Shape. For <b>has-a</b> relationships use <b>composition</b>: store one object <b>inside</b> another as an attribute. A Car <i>has an</i> Engine; a Course <i>has</i> Students. A car is not a kind of engine, so <code>class Car(Engine)</code> would be wrong.</p>" },
    { t: "code", code: c`class Engine:
    def start(self):
        return "Vroom"
class Car:
    def __init__(self):
        self.engine = Engine()
    def drive(self):
        return self.engine.start() + ", driving!"
my_car = Car()
print(my_car.drive())`, before: "<p>Here Car does <b>not</b> inherit from anything. Find the line where the Car gets its engine.</p>", note: "<p>Line by line:</p><ul><li><code>Engine</code> is a small class with one method.</li><li>In <code>Car.__init__</code>, <code>self.engine = Engine()</code> creates an Engine object and stores it as an attribute: the car <b>has</b> an engine.</li><li><code>drive</code> asks its engine to start (<code>self.engine.start()</code> → <code>\"Vroom\"</code>) and adds text.</li><li>Output: <code>Vroom, driving!</code></li></ul><p>A quick test: say the sentence out loud. \"A car <b>is an</b> engine\" sounds wrong; \"a car <b>has an</b> engine\" sounds right → composition. Beginners overuse inheritance; composition is often simpler.</p>" },
    { t: "table", head: ["OOP idea", "Meaning"], rows: [["Encapsulation", "an object bundles its data and methods and hides details"], ["Inheritance", "a child class reuses and extends a parent (is-a)"], ["Polymorphism", "the same method name works differently per class"], ["Abstraction", "users see what an object does, not how"]] },
    { t: "p", html: "<p>These are the four classic ideas of object-oriented programming. You have now used all of them: Day 18 gave you encapsulation and abstraction (an object's methods hide the details), and today added inheritance and polymorphism. Composition is how objects work <b>together</b> without being related.</p>" },
    { t: "ar", html: "اسأل{{g:|ي}} نفسك: هل هو \"نوع من\" (is-a)؟ استخدم{{g:|ي}} الوراثة. هل \"يحتوي على\" (has-a)؟ استخدم{{g:|ي}} التركيب: خزّن كائنًا داخل كائن آخر كخاصية، مثل self.engine = Engine()." },

    { t: "h", text: "Putting it together: university people" },
    { t: "code", code: c`class Person:
    def __init__(self, name):
        self.name = name
    def role(self):
        return "visitor"
class Student(Person):
    def __init__(self, name, major):
        super().__init__(name)
        self.major = major
    def role(self):
        return "student of " + self.major
class Instructor(Person):
    def role(self):
        return "instructor"
for p in [Student("{{name}}", "CS"), Instructor("Hamed"), Person("Guest")]:
    print(p.name, "-", p.role())`, together: true, before: "<p>This program uses every idea from today. Before running, guess the three lines it will print. Then add a <code>Staff</code> class whose role is <code>\"staff\"</code> and put one in the list.</p>", note: "<p>How it works:</p><ul><li><b>Parent:</b> <code>Person</code> holds what everybody shares: a name and a default <code>role</code>.</li><li><b>super():</b> <code>Student</code> needs an extra attribute, so it writes its own <code>__init__</code> and calls <code>super().__init__(name)</code> first to keep the name.</li><li><b>Inherited __init__:</b> <code>Instructor</code> has no <code>__init__</code>, so Person's is used.</li><li><b>Overriding:</b> both children replace <code>role</code> with their own version.</li><li><b>Polymorphism:</b> the loop calls <code>p.role()</code> on three different kinds of objects and never asks which kind it is.</li></ul><p>Output: <code>{{name}} - student of CS</code>, <code>Hamed - instructor</code>, <code>Guest - visitor</code>. Adding a new kind of person needs a new small class — and no change at all to the loop.</p>" },
    { t: "ar", html: "الأب يحمل الجزء المشترك، والأبناء يرثونه ويعيدون تعريف role، والحلقة تستدعي نفس الدالة على كائنات مختلفة (تعدد الأشكال). إضافة نوع جديد لا تحتاج تغيير الحلقة." },
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

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[21] = {
  title: "Rest day",
  intro: "Three weeks, {{name}}! You went from <code>print(\"Hello\")</code> to classes, files and a working application. Next week is the one many students wait for: algorithms and artificial intelligence. Rest well today.",
  introAr: "{{g:أحسنت|أحسنتِ}} يا {{name}}! ثلاثة أسابيع وأنت الآن تكتب{{g:|ين}} تطبيقات حقيقية. الأسبوع القادم: الخوارزميات والذكاء الاصطناعي. اليوم راحة ومراجعة خفيفة فقط.",
  learn: [
    { t: "p", html: "<div class=\"rest-hero\"><h3>Today's light plan (about 20 minutes)</h3><ol><li>Review the due cards in the <a href=\"review.html\">review deck</a>.</li><li>Read the short piece below.</li><li>Write your reflection in the notes.</li></ol></div>" },
    { t: "h", text: "Everything in Python is an object" },
    { t: "p", html: "<p>This week you wrote classes. Here's a secret: you've been using objects since Day 1. <code>\"hello\".upper()</code> is a method of a <code>str</code> object; <code>[].append()</code> is a method of a <code>list</code> object. Even numbers and functions are objects.</p>" },
    { t: "code", code: c`print(type(5), type("hi"), type([]), type(print))
print((5).bit_length(), "hi".upper())
print(isinstance(print, object))`, noViz: true },
    { t: "h", text: "Code readers, not code writers" },
    { t: "p", html: "<p>Professional programmers spend far more time <b>reading</b> code than writing it — their own code from months ago, and teammates' code. That's why this course kept asking for clear names, small functions, and comments that explain <i>why</i>. When you compare the several solutions of an exercise, you are training exactly this skill.</p>" },
    { t: "ar", html: "المبرمج المحترف يقرأ الكود أكثر مما يكتبه. الأسماء الواضحة والدوال الصغيرة هدية لنفسك في المستقبل ولزملائك." },
    { t: "h", text: "Week 3 self-check (5 minutes)" },
    { t: "p", html: "<p>No new material — just five quick questions to see what stuck. A wrong answer is not a problem: it tells you which day to reread before next week.</p>" },
    { t: "check", q: "Day 15: what happens here?", code: c`def setup():
    level = 5

setup()
print(level)`, o: ["It prints `5`", "It prints `None`", "`NameError`: `level` is not defined", "It prints nothing"], a: 2, e: "`level` is a local variable: it exists only while `setup` runs. To use it outside, `return` it.", hint: "Where does a variable created inside a function live?" },
    { t: "check", q: "Day 16: what does this print?", code: c`def countdown(n):
    if n == 0:
        return "Go!"
    return countdown(n - 1)

print(countdown(3))`, o: ["`3`", "`0`", "`Go!`", "`RecursionError`"], a: 2, e: "3 → 2 → 1 → 0, and the base case `n == 0` returns `\"Go!\"`, which is passed back up through every call.", hint: "Follow n down to the base case." },
    { t: "check", q: "Day 17: you want to add a line to `diary.txt` without deleting what is already there. Which mode?", o: ["`\"r\"`", "`\"w\"`", "`\"a\"`", "`\"x\"`"], a: 2, e: "`\"a\"` (append) writes at the end. `\"w\"` erases the file first, and `\"r\"` only reads.", hint: "Which letter stands for \"append\"?" },
    { t: "check", q: "Day 18: in the free-play code below, which line creates an object?", o: ["`class Pet:`", "`def __init__(self, name):`", "`p = Pet(\"Pixel\")`", "`print(p)`"], a: 2, e: "Calling the class with parentheses builds a new object; `__init__` then runs automatically.", hint: "Objects are made by calling the class." },
    { t: "check", q: "Day 19: what does this print?", code: c`class Base:
    def hi(self):
        return "base"

class Kid(Base):
    pass

print(Kid().hi())`, o: ["`base`", "`Kid`", "Nothing", "`AttributeError`"], a: 0, e: "`Kid` has no `hi` of its own, so Python finds it in the parent `Base`.", hint: "Where does Python look when the child doesn't have the method?" },
  ],
  extraTitle: "Reflection and free play",
  extra: [
    { t: "p", html: "<p><b>In your notes:</b></p><ol><li>Explain <code>print</code> vs <code>return</code> as if to a friend.</li><li>Describe one class you could design for a project you care about: what attributes and methods would it have?</li><li>What would you like to build with AI next week?</li></ol>" },
    { t: "try", title: "Free play: a tiny pet", html: "<p>Give your pet more methods: <code>sleep()</code>, <code>play()</code>, a mood that depends on energy…</p>", code: c`class Pet:
    def __init__(self, name):
        self.name = name
        self.energy = 5

    def feed(self):
        self.energy += 2
        return f"{self.name} munches happily"

    def __str__(self):
        return f"{self.name} (energy {self.energy})"

p = Pet("Pixel")
print(p.feed())
print(p)` },
  ],
  cards: [
    { f: "Are numbers and strings objects in Python?", b: "Yes — everything is an object, with its own methods." },
  ],
  remember: [
    "A function returns a value with `return`; its variables are local.",
    "`import` brings in modules; functions can be passed as values (`key=`), and `lambda` writes small ones.",
    "Recursion = a function calling itself, always with a base case.",
    "Catch specific errors with `try` / `except`; `raise` your own when a rule is broken.",
    "`with open(...)`: `\"r\"` reads, `\"w\"` erases and writes, `\"a\"` appends.",
    "A class is a blueprint, an object is one instance; `__init__`, `self`, methods and `__str__` make it work.",
    "`class Child(Parent):` inherits; `super()` reaches the parent; same method name in many classes = polymorphism.",
  ],
  rememberAr: "مراجعة الأسبوع: دوال ووحدات، وأخطاء وملفات، وكلاسات ووراثة. استرح{{g:|ي}} اليوم، والأسبوع القادم الخوارزميات والذكاء الاصطناعي.",
};
})();

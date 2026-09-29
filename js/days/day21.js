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
};
})();

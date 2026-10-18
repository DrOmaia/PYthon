window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;

const ROOMS = c`ROOMS = {
    "gate":     {"desc": "An old gate covered in jasmine.", "exits": {"north": "hall"}, "items": []},
    "hall":     {"desc": "A dusty hall with a locked door to the north.", "exits": {"south": "gate", "east": "library", "north": "treasure"}, "items": ["lamp"], "locked": {"north": "key"}},
    "library":  {"desc": "Shelves of forgotten Python books.", "exits": {"west": "hall"}, "items": ["key", "book"]},
    "treasure": {"desc": "Gold everywhere!", "exits": {"south": "hall"}, "items": []},
}
`;

DAYS[29] = {
  title: "Capstone, part 1: plan and build",
  intro: "This is it, {{name}} — your own project. For two days you'll build a complete program that uses what you learned in all four weeks. Pick one project below; each is split into milestones with automatic checks, plus room for your own ideas. Today: the foundations.",
  introAr: "مشروع التخرج! اختر{{g:|ي}} مشروعًا واحدًا من الثلاثة. اليوم نبني الأساس على ثلاث مراحل، وغدًا نكمل البرنامج ونضيف لمستك الخاصة ثم نحصل على الشهادة.",
  goals: ["Plan a program before coding it", "Design data structures and classes for a real project", "Build and test in milestones", "Reuse your work from earlier weeks"],
  tracks: [
    { id: "adventure", emoji: "🗺️", name: "Text adventure", desc: "An explorable world of rooms, items and a locked treasure room. Uses <b>dicts, functions, classes, loops and input</b>." },
    { id: "library", emoji: "📚", name: "Library system", desc: "Books, members with borrowing limits, searching and saving. Uses <b>classes, inheritance, exceptions and files</b>." },
    { id: "ai", emoji: "🤖", name: "AI classifier", desc: "A real machine-learning study on the wine dataset, then a study-buddy text classifier. Uses <b>numpy, scikit-learn and evaluation</b>." },
  ],
  learn: [
    { t: "h", text: "How to approach a bigger project" },
    { t: "p", html: "<p>Until now each exercise was one function or one class. A project is bigger: many pieces that must work <b>together</b>. The good news: big programs are built the same way as small ones — just with more steps, done in order:</p><ol><li><b>Describe it in plain words.</b> What can the user do? What does the program remember?</li><li><b>Choose the data structures.</b> A dict of rooms? A class for books? A table of numbers?</li><li><b>Split it into milestones</b>, each testable on its own.</li><li><b>Build the smallest working version first</b>, then grow it one milestone at a time, checking each before moving on.</li><li><b>Then make it yours</b> — extra features, better messages, your own ideas.</li></ol><p>The sections below walk through each step with small examples. Read them once, pick your track, and come back to them whenever you feel lost.</p>" },
    { t: "analogy", title: "Building a house, not a sandcastle", html: "<p>Nobody builds a house by placing bricks randomly and hoping a house appears. First a plan on paper (step 1), then the materials (step 2), then the foundation, the walls, the roof — in order (steps 3–4), and an inspector checks each stage before the next one starts. Only at the end do you choose the paint colour (step 5). A program is the same: if the foundation is broken, every wall on top of it falls down.</p>" },
    { t: "ar", html: "المشروع الكبير يُبنى مثل البرنامج الصغير لكن على مراحل: صف{{g:|ي}} الفكرة بالكلمات، ثم اختر{{g:|ي}} هياكل البيانات، ثم قسّم{{g:|ي}} العمل إلى مراحل صغيرة، وابنِ{{g:|ي}} أصغر نسخة تعمل ثم طوّرها. لا تنتقل{{g:|ي}} للمرحلة التالية قبل أن تنجح اختبارات الحالية." },

    { t: "h", text: "Step 1: describe it in plain words" },
    { t: "p", html: "<p>Before any code, write two or three sentences about what the program does, as if explaining it to a friend. For the text adventure: <i>\"The player stands in a room and reads its description. They type commands like <b>go north</b> or <b>take key</b>. Some doors are locked until they carry the right item. The goal is to reach the treasure room.\"</i></p><p>Now read your description and underline two kinds of words:</p><ul><li><b>Nouns</b> (player, room, description, item, door) are things the program must <b>remember</b> → they become <b>data</b>: variables, dicts, lists, classes and their attributes.</li><li><b>Verbs</b> (read, go, take, unlock) are things the program must <b>do</b> → they become <b>functions</b> or <b>methods</b>.</li></ul><p>For the library: <i>books</i>, <i>members</i>, <i>limits</i> are nouns; <i>borrow</i>, <i>give back</i>, <i>search</i> are verbs. For the AI track: <i>wine samples</i>, <i>features</i>, <i>models</i>, <i>scores</i> are nouns; <i>explore</i>, <i>compare</i>, <i>tune</i> are verbs. This little trick turns a vague idea into a list of things to build.</p>" },
    { t: "ar", html: "اكتب{{g:|ي}} وصف المشروع في جملتين أو ثلاث. الأسماء (غرفة، كتاب، عضو) تصبح بيانات، والأفعال (اذهب، استعر، قارن) تصبح دوالًا أو methods. هكذا تتحول الفكرة إلى قائمة أشياء واضحة للبناء." },

    { t: "h", text: "Step 2: choose the data structures" },
    { t: "p", html: "<p>Next, decide <b>how</b> each noun is stored. Ask: do I look things up by name? → a <b>dict</b>. Do I keep things in order? → a <b>list</b>. Does a thing have its own data <b>and</b> its own actions? → a <b>class</b>. Is it a big table of numbers? → a <b>numpy array</b>. A good choice makes the rest of the code short; a bad one makes every function a struggle.</p>" },
    { t: "code", code: c`rooms = {
    "gate": {"desc": "An old gate.", "exits": {"north": "hall"}},
    "hall": {"desc": "A dusty hall.", "exits": {"south": "gate"}},
}
print(rooms["gate"]["desc"])
print(rooms["gate"]["exits"]["north"])
print(sorted(rooms["hall"]["exits"]))`, before: "<p>A tiny version of the adventure world: a dict of rooms, where each room is itself a dict. Run it and follow each lookup step by step.</p>", note: "<p>Line by line:</p><ul><li><code>rooms</code> is a dict: the key is the room's name, the value is another dict with that room's data. This is a <b>nested dict</b> (Day 12).</li><li><code>rooms[\"gate\"][\"desc\"]</code> reads left to right: first the gate room, then its description → <code>An old gate.</code></li><li><code>rooms[\"gate\"][\"exits\"][\"north\"]</code> goes one level deeper: the gate's exits, then the room to the north → <code>hall</code>. An exit simply stores the <b>name</b> of another room, which links the rooms into a map.</li><li><code>sorted(...)</code> on a dict gives its <b>keys</b> in order → <code>['south']</code>.</li></ul><p>Why a dict? Because the program constantly asks \"what is the room called <i>hall</i>?\" — a lookup by name, which dicts do instantly. The real world in your starter (<code>ROOMS</code>) uses exactly this shape, plus <code>items</code> and <code>locked</code>.</p>" },
    { t: "table", head: ["Track", "What it remembers", "Data structure"], rows: [["🗺️ Adventure", "rooms, exits, items; where the player is and what they carry", "nested dict `ROOMS`; a `Player` class with `room` and `inventory`"], ["📚 Library", "books, members, who borrowed what", "`Book` and `Member` classes; a `Library` with dicts by title and name"], ["🤖 AI", "178 wine samples with 13 measurements, their classes, scores", "numpy arrays `X` and `y`; a dict of model scores"]] },
    { t: "ar", html: "اختر{{g:|ي}} هيكل البيانات حسب طريقة استخدامه: البحث بالاسم ← قاموس، الترتيب ← قائمة، بيانات مع أفعال ← كلاس، جدول أرقام ← مصفوفة numpy. الاختيار الصحيح يجعل بقية الكود قصيرًا وواضحًا." },

    { t: "h", text: "Step 3: break it into milestones" },
    { t: "p", html: "<p>A <b>milestone</b> is a piece small enough to finish in one sitting, with a clear input and output so you can <b>test it alone</b>. Good milestones follow the dependencies: build first what other pieces need. In the adventure, the <code>Player</code> needs the world map, so the map comes first; the command parser doesn't need anything, so it can be built and tested on its own.</p><p>That is exactly how today's exercises are arranged. Each track has three milestones today and more tomorrow:</p>" },
    { t: "table", head: ["Project", "Day 29 (today)", "Day 30 (tomorrow)"], rows: [["🗺️ Text adventure", "world map, player, command parser", "playable game loop + your own rooms"], ["📚 Library system", "Book, Member classes, Library rules", "search, save/load, command interface"], ["🤖 AI classifier", "explore data, compare models, tune k", "final evaluation + study-buddy text AI"]] },
    { t: "p", html: "<p>Notice the order inside each track. <b>Library:</b> a <code>Book</code> knows nothing about members; a <code>Member</code> knows nothing about the library; the <code>Library</code> uses both — so it comes last. <b>AI:</b> you must know the data (balanced? how many features?) before comparing models, and you must have a fair comparison before tuning <code>k</code>. When you plan your own extra features, use the same question: <i>what does this piece need to exist first?</i></p>" },
    { t: "ar", html: "المرحلة (milestone) جزء صغير له مدخلات ومخرجات واضحة ويمكن اختباره وحده. ابدأ{{g:|ي}} بالأجزاء التي تحتاجها الأجزاء الأخرى: الخريطة قبل اللاعب، والكتاب والعضو قبل المكتبة، واستكشاف البيانات قبل مقارنة النماذج." },

    { t: "h", text: "Step 4: build the smallest working version first" },
    { t: "p", html: "<p>Beginners often write 100 lines and run them for the first time at the end — and then face ten errors at once. Professionals do the opposite: they build the <b>smallest version that runs from start to end</b>, even if it can do almost nothing, and then add one feature at a time, running after every change. If something breaks, the bug is in the few lines you just added.</p>" },
    { t: "code", code: c`def handle(command):
    if command == "look":
        return "You are at the gate."
    return "I don't understand."

for command in ["look", "dance"]:
    print(">", command)
    print(handle(command))`, before: "<p>A first, tiny version of a game: it understands only one command. Run it, then add a second command such as <code>\"help\"</code> and run again.</p>", note: "<p>Line by line:</p><ul><li><code>handle(command)</code> takes one command and <b>returns</b> the game's answer. Returning a message (instead of printing inside) makes the function easy to test — the same reason today's milestones ask for returned messages.</li><li>Only <code>\"look\"</code> is known; every other command gets <code>I don't understand.</code></li><li>The loop plays two commands automatically, so we can test without typing.</li></ul><p>Output: <code>&gt; look</code>, <code>You are at the gate.</code>, <code>&gt; dance</code>, <code>I don't understand.</code> It is a silly game, but it <b>works end to end</b>: command in, answer out. From here, each new feature (a second room, an item, a locked door) is one small change you can run and check right away.</p>" },
    { t: "ar", html: "ابنِ{{g:|ي}} أولًا أصغر نسخة تعمل من البداية للنهاية، ثم أضف{{g:|ي}} ميزة واحدة في كل مرة وشغّل{{g:|ي}} الكود بعد كل تغيير. هكذا إذا ظهر خطأ تعرف{{g:|ين}} أنه في الأسطر القليلة التي أضفتها للتو." },

    { t: "h", text: "Step 5: test each piece" },
    { t: "p", html: "<p>A piece is finished only when you have <b>checked</b> it. A simple way: call your function with inputs where you already know the right answer, and print the result next to the expected one. Choose three kinds of test cases: a <b>normal</b> case, a <b>boundary</b> case (exactly at the limit), and a <b>strange</b> case (empty text, a missing item, a wrong name).</p>" },
    { t: "code", code: c`def is_overdue(days_borrowed, limit=14):
    return days_borrowed > limit

print(is_overdue(3), "expected False")
print(is_overdue(20), "expected True")
print(is_overdue(14), "expected False")`, before: "<p>A helper the library track might need: is a book overdue after a number of days? Run the three tests and compare each result with its expected value.</p>", note: "<p>Line by line:</p><ul><li><code>limit=14</code> is a default parameter (Day 15): if we don't pass a limit, it is 14 days.</li><li><code>days_borrowed &gt; limit</code> is already True or False, so we return it directly.</li><li>Three tests: a normal short loan (3 days), a clearly late one (20 days), and the <b>boundary</b>: exactly 14 days, which should still be on time.</li></ul><p>Output: <code>False expected False</code>, <code>True expected True</code>, <code>False expected False</code> — all three match, so we trust this piece and build on it. If someone had written <code>&gt;=</code>, the first two tests would still pass and only the boundary test would catch the bug. That is why boundary tests matter most.</p>" },
    { t: "p", html: "<p>The milestones below do this for you: when you press <b>Check</b>, your code is called with prepared test inputs and its output is compared with the expected output line by line. When a check fails, don't guess — put the <b>expected</b> output next to <b>your</b> output, find the first line that differs, and add a <code>print</code> inside your function to see the values at that moment.</p>" },
    { t: "ar", html: "اختبر{{g:|ي}} كل جزء بمدخلات تعرف{{g:|ين}} جوابها: حالة عادية، وحالة على الحد بالضبط، وحالة غريبة. حالة الحد هي التي تكشف أكثر الأخطاء، مثل كتابة &gt;= بدل &gt;. وعند فشل الاختبار قارن{{g:|ي}} الناتج المتوقع بالناتج الفعلي سطرًا سطرًا." },

    { t: "h", text: "Step 6: connect the pieces and copy forward" },
    { t: "p", html: "<p>Each milestone is a brick, and the next milestone stands on it. Here is how the pieces connect in each track:</p>" },
    { t: "static", code: c`Adventure:  ROOMS (data) -> Player uses ROOMS in go/take
            parse(text) -> (verb, noun)
            tomorrow: game loop = input -> parse -> Player method -> print

Library:    Book, Member -> Library keeps them in dicts by title / name
            borrow / give_back check the rules and raise errors
            tomorrow: search, save/load, a command menu on top

AI:         explore (know the data) -> compare (fair split, baseline)
            -> tune k (cross-validation on training data only)
            tomorrow: one final honest test + a text classifier` },
    { t: "tip", title: "Copy forward", html: "Each milestone's starter is self-contained. When a milestone passes, copy your code into the next one and extend it — that's exactly how real projects grow. Keep your passing version in your notes too, so you can always go back to code that worked." },
    { t: "ar", html: "كل مرحلة تُبنى على التي قبلها: بعد نجاح المرحلة انسخ{{g:|ي}} حلك إلى المرحلة التالية وطوّره، واحتفظ{{g:|ي}} بنسخة تعمل في ملاحظاتك. غدًا نربط كل الأجزاء في برنامج كامل." },

    { t: "h", text: "Pick your track and start" },
    { t: "p", html: "<p>Choose the project that excites you most — there is no wrong choice:</p><ul><li><b>🗺️ Text adventure</b> if you enjoy games and stories. Main tools: dicts, functions, a class, string methods.</li><li><b>📚 Library system</b> if you like organized, real-world software. Main tools: classes, inheritance, exceptions (and files tomorrow).</li><li><b>🤖 AI classifier</b> if you enjoyed Days 23–27. Main tools: numpy, scikit-learn, honest evaluation.</li></ul><p>Then follow the plan: read Milestone 1, write the smallest code that could pass, run the checks, fix, and only then move on. If you are stuck for more than 15 minutes, look at the hint or the solution, understand it, close it, and write it again yourself.</p>" },
    { t: "ar", html: "اختر{{g:|ي}} المشروع الذي يحمّسك أكثر، ثم اتبع{{g:|ي}} الخطة: اقرأ{{g:|ي}} المرحلة، واكتب{{g:|ي}} أبسط كود يمكن أن ينجح، وشغّل{{g:|ي}} الاختبارات. وإذا طالت المشكلة أكثر من ربع ساعة فافهم{{g:|ي}} الحل ثم أعد{{g:|ي}} كتابته بنفسك." },
  ],
  exercises: [
    // ---------- Adventure ----------
    { id: "adv1", track: "adventure", lvl: "seed", title: "Milestone 1: The world map", prompt: "<p>The world is a dictionary of rooms (in the starter). Write:</p><ul><li><code>move(room, direction)</code> → the name of the room in that direction, or <code>None</code> if there's no exit</li><li><code>describe(room)</code> → <code>\"hall: A dusty hall... Exits: east, north, south\"</code> (exits in alphabetical order, separated by comma + space)</li></ul>", starter: ROOMS + "\ndef move(room, direction):\n    pass\n\ndef describe(room):\n    pass\n", tests: [{ after: "print(move('gate', 'north'), move('gate', 'west'))\nprint(describe('library'))\nprint(describe('hall'))", expected: "hall None\nlibrary: Shelves of forgotten Python books. Exits: west\nhall: A dusty hall with a locked door to the north. Exits: east, north, south" }],
      solutions: [{ name: "dict.get", code: ROOMS + c`
def move(room, direction):
    return ROOMS[room]["exits"].get(direction)

def describe(room):
    r = ROOMS[room]
    exits = ", ".join(sorted(r["exits"]))
    return f"{room}: {r['desc']} Exits: {exits}"` }] },
    { id: "adv2", track: "adventure", lvl: "star", title: "Milestone 2: The player", prompt: "<p>Write <code>class Player(start)</code> with attributes <code>room</code> and <code>inventory</code> (list), and methods that <b>return messages</b>:</p><ul><li><code>take(item)</code>: if the item is in the current room, move it to the inventory → <code>\"You take the key.\"</code>; else <code>\"There is no key here.\"</code></li><li><code>go(direction)</code>: no exit → <code>\"You can't go that way.\"</code>; a locked exit (see <code>\"locked\"</code>) without the needed item → <code>\"The door is locked.\"</code>; otherwise move → <code>\"You go north.\"</code></li></ul>", starter: ROOMS + "\nclass Player:\n    pass\n", tests: [{ after: "p = Player('gate')\nprint(p.go('west'))\nprint(p.go('north'), p.room)\nprint(p.go('north'))\nprint(p.take('key'))\nprint(p.go('east'), p.take('key'), p.inventory)\nprint(p.go('west'), p.go('north'), p.room)", expected: "You can't go that way.\nYou go north. hall\nThe door is locked.\nThere is no key here.\nYou go east. You take the key. ['key']\nYou go west. You go north. treasure" }],
      solutions: [{ name: "Class", code: ROOMS + c`
class Player:
    def __init__(self, start):
        self.room = start
        self.inventory = []

    def take(self, item):
        items = ROOMS[self.room]["items"]
        if item in items:
            items.remove(item)
            self.inventory.append(item)
            return f"You take the {item}."
        return f"There is no {item} here."

    def go(self, direction):
        room = ROOMS[self.room]
        if direction not in room["exits"]:
            return "You can't go that way."
        needed = room.get("locked", {}).get(direction)
        if needed and needed not in self.inventory:
            return "The door is locked."
        self.room = room["exits"][direction]
        return f"You go {direction}."` }] },
    { id: "adv3", track: "adventure", lvl: "fire", title: "Milestone 3: The command parser", prompt: "<p>Players type free text. Write <code>parse(text)</code> returning a tuple <code>(verb, noun)</code>:</p><ul><li>lowercase and ignore extra spaces and the word <code>the</code></li><li>shortcuts <code>n s e w</code> → <code>(\"go\", \"north\")</code> etc.</li><li><code>\"go east\"</code> → <code>(\"go\", \"east\")</code>, <code>\"take the lamp\"</code> → <code>(\"take\", \"lamp\")</code></li><li>one word like <code>\"look\"</code> → <code>(\"look\", None)</code>; empty → <code>(None, None)</code></li></ul>", starter: "def parse(text):\n    pass\n", tests: [{ after: "for t in ['n', 'Go  East', 'take the Lamp', 'LOOK', '', '  inventory ']:\n    print(parse(t))", expected: "('go', 'north')\n('go', 'east')\n('take', 'lamp')\n('look', None)\n(None, None)\n('inventory', None)" }],
      solutions: [{ name: "split + filter", code: c`SHORT = {"n": "north", "s": "south", "e": "east", "w": "west"}

def parse(text):
    words = [w for w in text.lower().split() if w != "the"]
    if not words:
        return (None, None)
    if len(words) == 1 and words[0] in SHORT:
        return ("go", SHORT[words[0]])
    verb = words[0]
    noun = words[1] if len(words) > 1 else None
    return (verb, noun)`, note: "Tiny parsers like this were the heart of classic text games in the 1970s–80s — and of command-line tools today." }] },
    // ---------- Library ----------
    { id: "lib1", track: "library", lvl: "seed", title: "Milestone 1: Book", prompt: "<p>Write <code>class Book(title, author, year)</code> with <code>available = True</code> and <code>__str__</code> returning <code>\"Dune by Frank Herbert (1965) [available]\"</code> or <code>[borrowed]</code>.</p>", starter: "class Book:\n    pass\n", tests: [{ after: "b = Book('Dune', 'Frank Herbert', 1965)\nprint(b)\nb.available = False\nprint(b)", expected: "Dune by Frank Herbert (1965) [available]\nDune by Frank Herbert (1965) [borrowed]" }],
      solutions: [{ name: "Class", code: c`class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year
        self.available = True

    def __str__(self):
        status = "available" if self.available else "borrowed"
        return f"{self.title} by {self.author} ({self.year}) [{status}]"` }] },
    { id: "lib2", track: "library", lvl: "star", title: "Milestone 2: Members", prompt: "<p>Write <code>class Member(name)</code> with a <code>borrowed</code> list, a class attribute <code>LIMIT = 5</code> and <code>can_borrow()</code>. Then <code>class StudentMember(Member)</code> with <code>LIMIT = 2</code> — nothing else! Also give both a <code>kind()</code> method returning <code>\"member\"</code> / <code>\"student\"</code>.</p>", starter: "class Member:\n    pass\n\nclass StudentMember(Member):\n    pass\n", tests: [{ after: "m = Member('Dr. Hamed'); s = StudentMember('{{name}}')\ns.borrowed += ['A', 'B']\nm.borrowed += ['A', 'B']\nprint(s.can_borrow(), m.can_borrow(), s.kind(), m.kind(), s.name)\nprint(isinstance(s, Member))", expected: "False True student member {{name}}\nTrue" }],
      solutions: [{ name: "Inheritance with class attribute", code: c`class Member:
    LIMIT = 5

    def __init__(self, name):
        self.name = name
        self.borrowed = []

    def can_borrow(self):
        return len(self.borrowed) < self.LIMIT

    def kind(self):
        return "member"

class StudentMember(Member):
    LIMIT = 2

    def kind(self):
        return "student"`, note: "<code>self.LIMIT</code> finds the child's value for students — the parent's method works for both. Polymorphism with data!" }] },
    { id: "lib3", track: "library", lvl: "fire", title: "Milestone 3: The library rules", prompt: "<p>Write <code>class Library</code> (Book and Member classes are in the starter) with <code>add_book(book)</code>, <code>add_member(member)</code>, <code>borrow(title, name)</code> and <code>give_back(title, name)</code>. <code>borrow</code> raises:</p><ul><li><code>LookupError(\"no such book\")</code> / <code>LookupError(\"no such member\")</code></li><li><code>ValueError(\"not available\")</code> if already borrowed</li><li><code>ValueError(\"limit reached\")</code> if the member can't borrow more</li></ul>", starter: c`class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year
        self.available = True

class Member:
    LIMIT = 5
    def __init__(self, name):
        self.name = name
        self.borrowed = []
    def can_borrow(self):
        return len(self.borrowed) < self.LIMIT

class StudentMember(Member):
    LIMIT = 2

class Library:
    pass
`, tests: [{ after: "lib = Library()\nfor t in ['Dune', 'SICP', 'Clean Code']: lib.add_book(Book(t, 'X', 2000))\nlib.add_member(StudentMember('Sara'))\nlib.borrow('Dune', 'Sara'); lib.borrow('SICP', 'Sara')\nfor args in [('Hamlet', 'Sara'), ('Dune', 'Ali'), ('Dune', 'Sara'), ('Clean Code', 'Sara')]:\n    try:\n        lib.borrow(*args)\n    except (LookupError, ValueError) as e:\n        print(type(e).__name__, e)\nlib.give_back('Dune', 'Sara')\nlib.borrow('Clean Code', 'Sara')\nprint(lib.members['Sara'].borrowed, lib.books['Dune'].available)", expected: "LookupError no such book\nLookupError no such member\nValueError not available\nValueError limit reached\n['SICP', 'Clean Code'] True" }],
      solutions: [{ name: "Dicts by key", code: c`class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year
        self.available = True

class Member:
    LIMIT = 5
    def __init__(self, name):
        self.name = name
        self.borrowed = []
    def can_borrow(self):
        return len(self.borrowed) < self.LIMIT

class StudentMember(Member):
    LIMIT = 2

class Library:
    def __init__(self):
        self.books = {}
        self.members = {}

    def add_book(self, book):
        self.books[book.title] = book

    def add_member(self, member):
        self.members[member.name] = member

    def _get(self, title, name):
        if title not in self.books:
            raise LookupError("no such book")
        if name not in self.members:
            raise LookupError("no such member")
        return self.books[title], self.members[name]

    def borrow(self, title, name):
        book, member = self._get(title, name)
        if not book.available:
            raise ValueError("not available")
        if not member.can_borrow():
            raise ValueError("limit reached")
        book.available = False
        member.borrowed.append(title)

    def give_back(self, title, name):
        book, member = self._get(title, name)
        if title in member.borrowed:
            member.borrowed.remove(title)
            book.available = True`, note: "Order of checks matters: \"not available\" is checked before \"limit reached\" — that's why Sara's third attempt on Dune gets the first message." }] },
    // ---------- AI ----------
    { id: "ai1", track: "ai", lvl: "seed", title: "Milestone 1: Meet the wine dataset", prompt: "<p>scikit-learn includes chemical measurements of 178 wines from 3 cultivars. Write <code>explore()</code> returning <code>(n_samples, n_features, class_counts)</code> where class_counts is a list of how many samples each class has. Then answer for yourself: is it balanced?</p>", starter: "import numpy as np\nfrom sklearn.datasets import load_wine\n\ndef explore():\n    pass\n", tests: [{ after: "print(explore())", expected: "(178, 13, [59, 71, 48])" }],
      solutions: [{ name: "bincount", code: c`import numpy as np
from sklearn.datasets import load_wine

def explore():
    X, y = load_wine(return_X_y=True)
    return X.shape[0], X.shape[1], np.bincount(y).tolist()`, note: "<code>np.bincount</code> counts how many times each integer appears. Roughly balanced — good." }] },
    { id: "ai2", track: "ai", lvl: "star", title: "Milestone 2: Why scaling matters", prompt: "<p>Write <code>compare()</code>: split with <code>test_size=0.3, random_state=1</code> and return a dict of test accuracies (3 decimals): <code>\"baseline\"</code> (majority class of y_train), <code>\"knn_raw\"</code> (KNeighborsClassifier(5) on raw data), <code>\"knn_scaled\"</code> (StandardScaler + KNN(5) pipeline), <code>\"tree\"</code> (DecisionTreeClassifier(random_state=0)).</p>", starter: "import numpy as np\nfrom sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.tree import DecisionTreeClassifier\n\ndef compare():\n    pass\n", tests: [{ after: "print(compare())", expected: "{'baseline': 0.352, 'knn_raw': 0.704, 'knn_scaled': 0.981, 'tree': 0.944}" }],
      solutions: [{ name: "Side by side", code: c`import numpy as np
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

def compare():
    X, y = load_wine(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1)
    majority = np.bincount(y_tr).argmax()
    res = {"baseline": round(float((y_te == majority).mean()), 3)}
    models = {
        "knn_raw": KNeighborsClassifier(n_neighbors=5),
        "knn_scaled": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
        "tree": DecisionTreeClassifier(random_state=0),
    }
    for name, m in models.items():
        res[name] = round(m.fit(X_tr, y_tr).score(X_te, y_te), 3)
    return res`, note: "One wine feature (proline) is in the hundreds, others below 1, so raw distances are dominated by one column. Scaling lifts k-NN from about 70% to 98% — exactly the lesson of Day 24." }] },
    { id: "ai3", track: "ai", lvl: "fire", title: "Milestone 3: Tune k honestly", prompt: "<p>Write <code>tune()</code>: on the <b>training part only</b> (same split), use 5-fold <code>cross_val_score</code> of the scaled KNN pipeline for k in 1, 3, 5, …, 15. Return <code>(best_k, best_cv_score)</code> with the score rounded to 3 decimals (smallest k wins ties).</p>", starter: "from sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\n\ndef tune():\n    pass\n", tests: [{ after: "print(tune())", expected: "(11, 0.976)" }],
      solutions: [{ name: "CV loop", code: c`from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

def tune():
    X, y = load_wine(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1)
    best_k, best = None, -1
    for k in range(1, 16, 2):
        model = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))
        score = cross_val_score(model, X_tr, y_tr, cv=5).mean()
        if score > best:
            best_k, best = k, score
    return best_k, round(best, 3)`, note: "Why not tune on the test set? Because then the test set is no longer \"unseen\" — you'd be fooling yourself. Cross-validation on the training data keeps the final test honest." }] },
  ],
  extraTitle: "Make it yours",
  extra: [
    { t: "p", html: "<p>Finished today's milestones? Try one idea for your project in the Playground (or below), then write the plan for tomorrow in your notes.</p><ul><li>🗺️ Adventure: design two new rooms and a puzzle (a riddle that opens a door?).</li><li>📚 Library: add a <code>due_date</code> with <code>datetime</code> and a list of overdue books.</li><li>🤖 AI: which wine features matter most? Try <code>DecisionTreeClassifier().fit(X, y).feature_importances_</code>.</li></ul>" },
    { t: "try", title: "Scratchpad", html: "<p>A free editor for your experiments today.</p>", code: c`# My capstone experiments, {{name}}
` },
  ],
  cards: [
    { f: "Steps for a bigger project", b: "Describe, choose data structures, split into milestones, build and test one at a time, then extend." },
    { f: "Why tune on training data with cross-validation?", b: "So the test set stays unseen and the final score stays honest." },
  ],
};
})();

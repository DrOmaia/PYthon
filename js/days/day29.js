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
    { t: "p", html: "<p>Big programs are built the same way as small ones — just with more steps:</p><ol><li><b>Describe it in plain words.</b> What can the user do? What does the program remember?</li><li><b>Choose the data structures.</b> A dict of rooms? A class for books? A table of numbers?</li><li><b>Split it into milestones</b>, each testable on its own.</li><li><b>Build one milestone at a time</b> and check it before moving on.</li><li><b>Then make it yours</b> — extra features, better messages, your own ideas.</li></ol>" },
    { t: "ar", html: "كل مرحلة في المشروع مستقلة ويمكن اختبارها. انسخ{{g:|ي}} حلك من المرحلة السابقة وابنِ{{g:|ي}} عليه. لا تنتقل{{g:|ي}} للمرحلة التالية قبل أن تنجح الاختبارات." },
    { t: "h", text: "Your three options" },
    { t: "table", head: ["Project", "Day 29 (today)", "Day 30 (tomorrow)"], rows: [["🗺️ Text adventure", "world map, player, command parser", "playable game loop + your own rooms"], ["📚 Library system", "Book, Member classes, Library rules", "search, save/load, command interface"], ["🤖 AI classifier", "explore data, compare models, tune k", "final evaluation + study-buddy text AI"]] },
    { t: "tip", title: "Copy forward", html: "Each milestone's starter is self-contained. When a milestone passes, copy your code into the next one and extend it — that's exactly how real projects grow." },
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

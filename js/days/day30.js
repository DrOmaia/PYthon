window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;

const ADV_BASE = c`ROOMS = {
    "gate":     {"desc": "An old gate covered in jasmine.", "exits": {"north": "hall"}, "items": []},
    "hall":     {"desc": "A dusty hall with a locked door to the north.", "exits": {"south": "gate", "east": "library", "north": "treasure"}, "items": ["lamp"], "locked": {"north": "key"}},
    "library":  {"desc": "Shelves of forgotten Python books.", "exits": {"west": "hall"}, "items": ["key", "book"]},
    "treasure": {"desc": "Gold everywhere!", "exits": {"south": "hall"}, "items": []},
}
SHORT = {"n": "north", "s": "south", "e": "east", "w": "west"}

def describe(room):
    r = ROOMS[room]
    return f"{room}: {r['desc']} Exits: {', '.join(sorted(r['exits']))}"

def parse(text):
    words = [w for w in text.lower().split() if w != "the"]
    if not words:
        return (None, None)
    if len(words) == 1 and words[0] in SHORT:
        return ("go", SHORT[words[0]])
    return (words[0], words[1] if len(words) > 1 else None)

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
        return f"You go {direction}."
`;

const LIB_BASE = c`import json

class Book:
    def __init__(self, title, author, year, available=True):
        self.title, self.author, self.year = title, author, year
        self.available = available
    def __str__(self):
        return f"{self.title} by {self.author} ({self.year}) [{'available' if self.available else 'borrowed'}]"

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
        self.books, self.members = {}, {}
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
            book.available = True
`;

const BUDDY_DATA = c`TRAIN = [
    ("how do i print text on the screen", 1), ("what does print do", 1), ("how to write a comment", 1),
    ("what is a variable", 2), ("difference between int and float", 2), ("how do i check the type of a value", 2),
    ("how do i read input from the user", 3), ("convert string to number", 3), ("what does modulo do", 3),
    ("how to slice a string", 4), ("how do f strings work", 4), ("make text uppercase", 4),
    ("how does if elif else work", 5), ("compare two numbers with and or", 5),
    ("how to repeat code while a condition is true", 8), ("my loop never stops", 8),
    ("infinite loop keeps running forever", 8), ("stop a loop with break", 8),
    ("loop over numbers with range", 9), ("nested for loops", 9),
    ("how to add an item to a list", 10), ("sort a list", 10), ("split a sentence into a list of words", 10),
    ("remove duplicates with a set", 11), ("what is a tuple", 11),
    ("count words with a dictionary", 12), ("dictionary keys and values", 12),
    ("how to define a function with def", 15), ("difference between print and return", 15),
    ("how does a function return a value", 15), ("call a function with arguments", 15),
    ("how to handle errors with try except", 17), ("read and write a file", 17),
    ("what is a class and object", 18), ("what is self and init", 18), ("how to create a class", 18),
    ("how does inheritance work", 19), ("what is super", 19),
    ("binary search and sorting speed", 22), ("numpy arrays", 23),
    ("train a model with scikit learn", 25), ("classify text with naive bayes", 26),
]
TOPICS = {1: "print and comments", 2: "variables and types", 3: "input and math", 4: "strings", 5: "decisions",
          8: "while loops", 9: "for loops", 10: "lists", 11: "tuples and sets", 12: "dictionaries",
          15: "functions", 17: "errors and files", 18: "classes", 19: "inheritance", 22: "search and sort",
          23: "numpy", 25: "scikit-learn", 26: "text classification"}
`;

DAYS[30] = {
  title: "Capstone, part 2: finish, polish, celebrate",
  intro: "The last day, {{name}}. Today you complete your project, add your personal touch, and receive your certificate. Take a moment to notice how far you've come: 30 days ago <code>print(\"Hello\")</code> was new.",
  introAr: "اليوم الأخير يا {{name}}! نكمل المشروع ونضيف لمستك الخاصة، ثم نحتفل بالشهادة. تذكّر{{g:|ي}} كيف بدأت{{g:|ِ}} بسطر print واحد، وانظر{{g:|ي}} أين وصلت{{g:|ِ}} الآن.",
  goals: ["Complete a working, user-facing program", "Handle bad input gracefully everywhere", "Add a feature of your own design", "Reflect on what you learned and plan what's next"],
  tracks: [
    { id: "adventure", emoji: "🗺️", name: "Text adventure", desc: "Today: the playable game loop and a high-score file." },
    { id: "library", emoji: "📚", name: "Library system", desc: "Today: searching, saving to JSON, and a command interface." },
    { id: "ai", emoji: "🤖", name: "AI classifier", desc: "Today: the final honest evaluation and a Py30 study-buddy text AI." },
  ],
  learn: [
    { t: "h", text: "Polishing: the difference between a program and a product" },
    { t: "p", html: "<ul><li><b>Friendly messages:</b> tell the user what happened and what to do next.</li><li><b>No crashes:</b> every input the user can type should get a sensible answer (remember the Smart Calculator v2).</li><li><b>Clear code:</b> good names, small functions, a docstring or two. Future-you will read this code.</li><li><b>Your idea:</b> one feature nobody asked for, because you wanted it.</li></ul>" },
    { t: "ar", html: "البرنامج الجيد لا ينهار أبدًا مهما كتب المستخدم، ورسائله واضحة ولطيفة. وأضف{{g:|ي}} ميزة واحدة من أفكارك أنت." },
  ],
  exercises: [
    // ---------- Adventure ----------
    { id: "adv4", track: "adventure", lvl: "star", title: "Milestone 4: The game loop", prompt: "<p>Yesterday's world, parser and Player are in the starter. Write the game loop that reads commands until the player wins or types <code>quit</code>:</p><ul><li><code>look</code> → <code>describe(room)</code></li><li><code>go</code> + direction (or n/s/e/w) → the message; after a successful move also print the new room's description — unless it's the treasure room: then print <code>You found the treasure! You win, {{name}}!</code> and <code>Moves: N</code> (successful moves) and stop</li><li><code>take ITEM</code> → the message</li><li><code>inventory</code> → <code>You carry: key, lamp</code> (in order taken) or <code>You carry nothing.</code></li><li><code>quit</code> → <code>Bye!</code>; anything else → <code>I don't understand.</code></li></ul>", starter: ADV_BASE + "\nplayer = Player(\"gate\")\n# your game loop here\n", tests: [{ stdin: "look\nn\nn\ntake key\ne\ntake the key\ninventory\nw\nn", expected: "gate: An old gate covered in jasmine. Exits: north\nYou go north.\nhall: A dusty hall with a locked door to the north. Exits: east, north, south\nThe door is locked.\nThere is no key here.\nYou go east.\nlibrary: Shelves of forgotten Python books. Exits: west\nYou take the key.\nYou carry: key\nYou go west.\nhall: A dusty hall with a locked door to the north. Exits: east, north, south\nYou go north.\nYou found the treasure! You win, {{name}}!\nMoves: 4" }, { stdin: "take lamp\nfly\ninventory\nquit", expected: "There is no lamp here.\nI don't understand.\nYou carry nothing.\nBye!" }],
      solutions: [{ name: "while True + dispatch", code: ADV_BASE + c`
player = Player("gate")
moves = 0
while True:
    verb, noun = parse(input("> "))
    if verb == "quit":
        print("Bye!")
        break
    elif verb == "look":
        print(describe(player.room))
    elif verb == "go":
        before = player.room
        print(player.go(noun))
        if player.room != before:
            moves += 1
            if player.room == "treasure":
                print("You found the treasure! You win, {{name}}!")
                print("Moves:", moves)
                break
            print(describe(player.room))
    elif verb == "take":
        print(player.take(noun))
    elif verb == "inventory":
        if player.inventory:
            print("You carry:", ", ".join(player.inventory))
        else:
            print("You carry nothing.")
    else:
        print("I don't understand.")`, note: "A complete game! Detecting a successful move by comparing the room before and after keeps <code>Player.go</code> unchanged." }],
      twist: "Play it for real in the Playground (type commands in the Input box, one per line). Then add your own rooms and a riddle." },
    { id: "adv5", track: "adventure", lvl: "fire", title: "Milestone 5: High scores", prompt: "<p>Write <code>record(name, moves, path=\"scores.json\")</code>: keep each player's best (lowest) number of moves in a JSON file. Return <code>\"First score saved!\"</code>, <code>\"New record!\"</code> or <code>\"Best so far: N\"</code>. A missing file means no scores yet.</p>", starter: "import json\n\ndef record(name, moves, path=\"scores.json\"):\n    pass\n", tests: [{ after: "import os\nif os.path.exists('hs.json'): os.remove('hs.json')\nprint(record('Sara', 9, 'hs.json'))\nprint(record('Sara', 12, 'hs.json'))\nprint(record('Sara', 4, 'hs.json'))\nprint(record('Omar', 7, 'hs.json'))\nprint(json.load(open('hs.json')))", expected: "First score saved!\nBest so far: 9\nNew record!\nFirst score saved!\n{'Sara': 4, 'Omar': 7}" }],
      solutions: [{ name: "Load, compare, save", code: c`import json

def record(name, moves, path="scores.json"):
    try:
        with open(path) as f:
            scores = json.load(f)
    except FileNotFoundError:
        scores = {}
    if name not in scores:
        message = "First score saved!"
        scores[name] = moves
    elif moves < scores[name]:
        message = "New record!"
        scores[name] = moves
    else:
        return f"Best so far: {scores[name]}"
    with open(path, "w") as f:
        json.dump(scores, f)
    return message` }] },
    // ---------- Library ----------
    { id: "lib4", track: "library", lvl: "star", title: "Milestone 4: Search and save", prompt: "<p>Using the Library from the starter, write three functions:</p><ul><li><code>search(lib, text)</code> → sorted titles whose title <b>or</b> author contains text (ignore case)</li><li><code>save(lib, path)</code> → JSON list of books as dicts with title, author, year, available</li><li><code>load(path)</code> → a new Library with those books</li></ul>", starter: LIB_BASE + "\ndef search(lib, text):\n    pass\n\ndef save(lib, path):\n    pass\n\ndef load(path):\n    pass\n", tests: [{ after: "lib = Library()\nfor t, a, y in [('Dune', 'Frank Herbert', 1965), ('Clean Code', 'Robert Martin', 2008), ('The Code Book', 'Simon Singh', 1999)]:\n    lib.add_book(Book(t, a, y))\nlib.add_member(Member('Sara')); lib.borrow('Dune', 'Sara')\nprint(search(lib, 'code'), search(lib, 'HERB'), search(lib, 'xyz'))\nsave(lib, 'books.json')\nlib2 = load('books.json')\nfor b in lib2.books.values(): print(b)", expected: "['Clean Code', 'The Code Book'] ['Dune'] []\nDune by Frank Herbert (1965) [borrowed]\nClean Code by Robert Martin (2008) [available]\nThe Code Book by Simon Singh (1999) [available]" }],
      solutions: [{ name: "vars() + json", code: LIB_BASE + c`
def search(lib, text):
    t = text.lower()
    return sorted(b.title for b in lib.books.values() if t in b.title.lower() or t in b.author.lower())

def save(lib, path):
    with open(path, "w") as f:
        json.dump([vars(b) for b in lib.books.values()], f)

def load(path):
    lib = Library()
    with open(path) as f:
        for d in json.load(f):
            lib.add_book(Book(**d))
    return lib`, note: "<code>vars(b)</code> gives an object's attributes as a dict, and <code>Book(**d)</code> unpacks a dict back into keyword arguments — a neat save/load pair." }] },
    { id: "lib5", track: "library", lvl: "fire", title: "Milestone 5: Command interface", prompt: "<p>Write the librarian's interface (fields are separated by <code>|</code> because titles contain spaces). Read until <code>quit</code>:</p><ul><li><code>add TITLE|AUTHOR|YEAR</code> → <code>Added TITLE</code></li><li><code>join NAME</code> or <code>join NAME|student</code> → <code>Welcome NAME</code></li><li><code>borrow TITLE|NAME</code> → <code>OK</code>; <code>return TITLE|NAME</code> → <code>Returned</code></li><li><code>list</code> → every book (<code>str(book)</code>) sorted by title</li><li>errors → <code>Error: MESSAGE</code>; unknown command → <code>Unknown command</code>; <code>quit</code> → <code>Goodbye</code></li></ul>", starter: LIB_BASE + "\nlib = Library()\n# your command loop here\n", tests: [{ stdin: "add Dune|Frank Herbert|1965\nadd SICP|Abelson|1985\njoin {{name}}|student\nborrow Dune|{{name}}\nborrow Dune|{{name}}\nborrow Hamlet|{{name}}\nborrow SICP|Omar\nlist\nreturn Dune|{{name}}\nfly\nquit", expected: "Added Dune\nAdded SICP\nWelcome {{name}}\nOK\nError: not available\nError: no such book\nError: no such member\nDune by Frank Herbert (1965) [borrowed]\nSICP by Abelson (1985) [available]\nReturned\nUnknown command\nGoodbye" }],
      solutions: [{ name: "split on first space", code: LIB_BASE + c`
lib = Library()
while True:
    line = input().strip()
    cmd, _, rest = line.partition(" ")
    parts = rest.split("|")
    try:
        if cmd == "quit":
            print("Goodbye")
            break
        elif cmd == "add":
            title, author, year = parts
            lib.add_book(Book(title, author, int(year)))
            print("Added", title)
        elif cmd == "join":
            name = parts[0]
            cls = StudentMember if len(parts) > 1 and parts[1] == "student" else Member
            lib.add_member(cls(name))
            print("Welcome", name)
        elif cmd == "borrow":
            lib.borrow(parts[0], parts[1])
            print("OK")
        elif cmd == "return":
            lib.give_back(parts[0], parts[1])
            print("Returned")
        elif cmd == "list":
            for title in sorted(lib.books):
                print(lib.books[title])
        else:
            print("Unknown command")
    except (LookupError, ValueError) as e:
        print("Error:", e)`, note: "<code>str.partition(\" \")</code> splits at the first space only — perfect for \"command + arguments\". A <code>ValueError</code> from a wrong number of <code>|</code> parts is also caught, so the program never crashes." }] },
    // ---------- AI ----------
    { id: "ai4", track: "ai", lvl: "star", title: "Milestone 4: Final evaluation", prompt: "<p>Yesterday's tuning chose k = 11. Write <code>final_report()</code>: same split (<code>test_size=0.3, random_state=1</code>), fit the scaled KNN(11) pipeline on the training set <b>once</b>, and return a dict: <code>accuracy</code> (3 decimals), <code>matrix</code> (confusion matrix as a list), <code>recall</code> (per class, list rounded to 2 decimals, via <code>recall_score(..., average=None)</code>).</p>", starter: "from sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import confusion_matrix, recall_score\n\ndef final_report():\n    pass\n", tests: [{ after: "print(final_report())", expected: "{'accuracy': 0.981, 'matrix': [[23, 0, 0], [1, 18, 0], [0, 0, 12]], 'recall': [1.0, 0.95, 1.0]}" }],
      solutions: [{ name: "One honest test", code: c`from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix, recall_score

def final_report():
    X, y = load_wine(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1)
    model = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=11)).fit(X_tr, y_tr)
    pred = model.predict(X_te)
    return {
        "accuracy": round(float((pred == y_te).mean()), 3),
        "matrix": confusion_matrix(y_te, pred).tolist(),
        "recall": [round(float(r), 2) for r in recall_score(y_te, pred, average=None)],
    }`, note: "This is the number you would report in a paper or to a client: one evaluation, on data never used for any decision." }] },
    { id: "ai5", track: "ai", lvl: "fire", title: "Milestone 5: Py30 study buddy", prompt: "<p>A text AI that tells a student which day to review. Training questions and topics are in the starter. Write <code>recommend(question)</code>: train (once, at module level) a <code>TfidfVectorizer(stop_words=\"english\")</code> + <code>MultinomialNB()</code> pipeline on TRAIN (the stop words option ignores filler words like \"how\", \"do\", \"what\"), and return <code>\"Review Day N: TOPIC\"</code>.</p>", starter: "from sklearn.pipeline import make_pipeline\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\n" + BUDDY_DATA + "\ndef recommend(question):\n    pass\n", tests: [{ after: "for q in ['I get an error when I try to read a file', 'how do I put a new item in my list', 'what does return do in a function', 'my while loop runs forever', 'I want to make my own class']:\n    print(recommend(q))", expected: "Review Day 17: errors and files\nReview Day 10: lists\nReview Day 15: functions\nReview Day 8: while loops\nReview Day 18: classes" }],
      solutions: [{ name: "Pipeline", code: c`from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

` + BUDDY_DATA + c`
texts = [q for q, d in TRAIN]
days = [d for q, d in TRAIN]
MODEL = make_pipeline(TfidfVectorizer(stop_words="english"), MultinomialNB()).fit(texts, days)

def recommend(question):
    day = int(MODEL.predict([question])[0])
    return f"Review Day {day}: {TOPICS[day]}"`, note: "With about 40 examples the buddy still makes mistakes on unusual questions. Add your own questions to TRAIN and watch it improve — more (and better) data beats cleverer code surprisingly often." }],
      twist: "Add a confidence check with <code>predict_proba</code>: below 20%, answer \"Try the glossary!\" instead of guessing." },
  ],
  extraTitle: "Make it yours, then celebrate",
  extra: [
    { t: "p", html: "<p><b>Your personal feature (20 minutes).</b> Ideas: a map command or a timer in the adventure; late fees with <code>datetime</code> in the library; a chart-free \"most important features\" report or an Arabic version of the study buddy in the AI track. Build it in the scratchpad below or in the Playground.</p>" },
    { t: "try", title: "Scratchpad", html: "<p>Your final experiments.</p>", code: c`# {{name}}'s personal feature
` },
    { t: "h", text: "What's next after Py30?" },
    { t: "p", html: "<ul><li><b>Install Python and VS Code</b> on your computer (see <a href=\"setup.html\">Setup</a>) and rebuild your capstone as real <code>.py</code> files.</li><li><b>Practice problems</b> regularly on sites like Codewars, LeetCode (easy level) or HackerRank.</li><li><b>Go deeper</b> in what you enjoyed: web apps (Flask), data analysis (pandas), or AI (courses on neural networks).</li><li><b>Build something for someone</b>: a small tool for your family, club or a course — real users are the best teachers.</li><li><b>Keep reviewing</b> your deck: spaced repetition keeps working after the course ends.</li></ul>" },
    { t: "ar", html: "هذه ليست النهاية بل البداية. استمر{{g:|ي}} في حل مسألة واحدة على الأقل يوميًا، وابنِ{{g:|ي}} مشاريع صغيرة لأشياء تحبها. بالتوفيق يا {{name}}! 🌸" },
    { t: "p", html: "<p style=\"margin-top:16px\"><a class=\"btn btn-primary\" href=\"certificate.html\">🎓 Get my certificate</a></p><p class=\"muted\" style=\"font-size:.9rem\">Mark Day 30 as complete at the bottom of this page to unlock it.</p>" },
  ],
  cards: [
    { f: "Program vs product", b: "Friendly messages, no crashes, clear code, and features users care about." },
    { f: "Save an object to JSON and back", b: "`json.dump(vars(obj), f)` and `Class(**d)`." },
  ],
};
})();

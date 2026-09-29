window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[11] = {
  title: "Tuples and sets",
  intro: "Lists are great, but not every collection should behave like a list. A <b>tuple</b> is a list you promise never to change — perfect for coordinates or a date. A <b>set</b> is a bag of unique items with lightning-fast membership checks — perfect for \"who attended?\" and \"what do these two groups share?\".",
  introAr: "الـ tuple مثل القائمة لكن لا يمكن تعديلها، والـ set مجموعة بلا تكرار وبلا ترتيب، ومفيدة جدًا لحذف التكرار وعمليات التقاطع والاتحاد.",
  goals: ["Create tuples and unpack them", "Explain when immutability is useful", "Use sets to remove duplicates and test membership", "Use set operations: union `|`, intersection `&`, difference `-`", "Choose between list, tuple and set"],
  learn: [
    { t: "h", text: "Tuples: fixed groups of values" },
    { t: "code", code: c`point = (3, 7)
date = (2026, 9, 29)
print(point[0], date[-1])
year, month, day = date
print(f"{day}/{month}/{year}")
single = (5,)
print(type(single), len(date))` },
    { t: "p", html: "<p>Tuples use parentheses and cannot be changed after creation: no <code>append</code>, no <code>t[0] = …</code>. Why is that useful? It <b>protects</b> data that should not change by accident, and it lets you use tuples as dictionary keys (Day 12). Functions also return several values as a tuple.</p>" },
    { t: "code", code: c`def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([4, 9, 1, 7])
print(low, high)`, note: "<p>A preview of functions (Week 3): returning two values is really returning one tuple, which we unpack.</p>" },
    { t: "h", text: "Sets: unique items" },
    { t: "code", code: c`colors = {"red", "blue", "red", "green", "blue"}
print(colors, len(colors))
colors.add("pink")
colors.discard("red")
print("pink" in colors)
unique_words = set("the cat and the hat".split())
print(unique_words)` },
    { t: "ar", html: "المجموعة set لا تحتوي على تكرار ولا ترتيب ثابت، لذلك لا يمكن استخدام الفهرس [0] معها. أنشئ{{g:|ي}} مجموعة فارغة بـ set() وليس {} لأن {} قاموس فارغ." },
    { t: "h", text: "Set operations" },
    { t: "code", code: c`python_club = {"Sara", "Omar", "Lina", "Nora"}
ai_club = {"Omar", "Nora", "Faisal"}
print("Both:", python_club & ai_club)
print("Any:", python_club | ai_club)
print("Only Python:", python_club - ai_club)
print("Exactly one:", python_club ^ ai_club)` },
    { t: "table", head: ["Operator", "Method", "Meaning"], rows: [["`a | b`", "`a.union(b)`", "in a or b"], ["`a & b`", "`a.intersection(b)`", "in both"], ["`a - b`", "`a.difference(b)`", "in a but not b"], ["`a ^ b`", "`a.symmetric_difference(b)`", "in exactly one"]] },
    { t: "h", text: "Which collection?" },
    { t: "table", head: ["", "list", "tuple", "set"], rows: [["ordered", "yes", "yes", "no"], ["changeable", "yes", "no", "yes (add/remove)"], ["duplicates", "allowed", "allowed", "removed"], ["use for", "a changing sequence", "a fixed record", "uniqueness, fast `in`"]] },
  ],
  mistakes: [
    { title: "{} is not an empty set", html: "", wrong: c`s = {}
s.add(1)   # AttributeError: dict`, right: c`s = set()
s.add(1)` },
    { title: "Indexing a set", html: "Sets have no order, so no index.", wrong: c`s = {3, 1, 2}
print(s[0])`, right: c`s = {3, 1, 2}
print(sorted(s)[0])` },
    { title: "Trying to change a tuple", html: "", wrong: c`t = (1, 2, 3)
t[0] = 9`, right: c`t = (1, 2, 3)
t = (9,) + t[1:]
print(t)` },
  ],
  tricks: [
    { title: "Fast membership", html: "<code>x in some_set</code> is almost instant even with a million items; <code>x in some_list</code> checks one by one." },
    { title: "Count unique items in one line", html: "", code: c`print(len(set("mississippi")))   # 4` },
  ],
  practice: [
    { t: "predict", code: c`a = {1, 2, 3, 4}
b = {3, 4, 5}
print(sorted(a & b), sorted(a - b), len(a | b))`, explain: "<code>[3, 4] [1, 2] 5</code>" },
    { t: "predict", code: c`x, y = 1, 2
x, y = y, x + y
x, y = y, x + y
print(x, y)`, explain: "(1,2) → (2,3) → (3,5). Tuple unpacking makes Fibonacci easy!" },
    { t: "parsons", title: "Common interests", prompt: "Print the interests two friends share, sorted.", lines: [c`sara = {"chess", "coding", "reading", "art"}`, c`omar = {"football", "coding", "art"}`, "shared = sara & omar", "print(sorted(shared))"], distractors: ["shared = sara + omar"], explain: "<code>+</code> does not work on sets; <code>&amp;</code> is intersection." },
    { t: "try", title: "Anagram checker", html: "<p>Two words are anagrams if they use the same letters. Is comparing <code>set(a) == set(b)</code> enough? Test <code>\"listen\"/\"silent\"</code> and <code>\"aab\"/\"abb\"</code>. Then try <code>sorted(a) == sorted(b)</code>.</p>", code: c`a = "listen"
b = "silent"
print(set(a) == set(b))
print(sorted(a) == sorted(b))` },
  ],
  exercises: [
    { id: "unique", lvl: "seed", title: "How many unique?", prompt: "<p>Read words on one line and print how many <b>different</b> words there are (ignore capital letters).</p>", tests: [{ stdin: "Red blue red GREEN blue", expected: "3" }, { stdin: "a", expected: "1" }],
      solutions: [{ name: "set", code: c`words = input().lower().split()
print(len(set(words)))` }] },
    { id: "swapdate", lvl: "seed", title: "Date formatter", prompt: "<p>Read a date as <code>YYYY-MM-DD</code>, unpack it into three variables and print it as <code>DD/MM/YYYY</code>.</p>", tests: [{ stdin: "2026-09-29", expected: "29/09/2026" }],
      solutions: [{ name: "Unpacking", code: c`year, month, day = input().split("-")
print(f"{day}/{month}/{year}")` }, { name: "Indexes", code: c`parts = input().split("-")
print(parts[2] + "/" + parts[1] + "/" + parts[0])` }] },
    { id: "common", lvl: "star", title: "Shared courses", prompt: "<p>Line 1: courses of student A. Line 2: courses of student B (codes separated by spaces). Print three lines, each sorted and space-separated: shared courses, courses only A takes, and all courses.</p><pre class=\"code-static\">Input:\nIS201 CS101 MATH111\nCS101 PHYS101 MATH111\nOutput:\nShared: CS101 MATH111\nOnly A: IS201\nAll: CS101 IS201 MATH111 PHYS101</pre>", tests: [{ stdin: "IS201 CS101 MATH111\nCS101 PHYS101 MATH111", expected: "Shared: CS101 MATH111\nOnly A: IS201\nAll: CS101 IS201 MATH111 PHYS101" }],
      solutions: [{ name: "Set operators", code: c`a = set(input().split())
b = set(input().split())
print("Shared:", " ".join(sorted(a & b)))
print("Only A:", " ".join(sorted(a - b)))
print("All:", " ".join(sorted(a | b)))` }] },
    { id: "pangram", lvl: "star", title: "Pangram", prompt: "<p>A pangram uses every letter a–z at least once. Read a sentence and print <code>Pangram</code> or <code>Missing: …</code> with the missing letters in alphabetical order (no spaces).</p>", tests: [{ stdin: "The quick brown fox jumps over the lazy dog", expected: "Pangram" }, { stdin: "Hello world", expected: "Missing: abcfgijkmnpqstuvxyz" }],
      solutions: [{ name: "Set difference", code: c`import string
letters = set(input().lower())
missing = set(string.ascii_lowercase) - letters
if missing:
    print("Missing:", "".join(sorted(missing)))
else:
    print("Pangram")`, note: "<code>string.ascii_lowercase</code> is <code>\"abcdefghijklmnopqrstuvwxyz\"</code>." }, { name: "Loop over the alphabet", code: c`s = input().lower()
missing = ""
for ch in "abcdefghijklmnopqrstuvwxyz":
    if ch not in s:
        missing += ch
print("Missing: " + missing if missing else "Pangram")` }] },
    { id: "firstrep", lvl: "fire", title: "First repeated character", prompt: "<p>Read a word and print the first character that appears for the <b>second</b> time while reading left to right. Print <code>None</code> if nothing repeats.</p>", tests: [{ stdin: "programming", expected: "r" }, { stdin: "abcdef", expected: "None" }, { stdin: "abba", expected: "b" }],
      solutions: [{ name: "Seen set", code: c`seen = set()
answer = None
for ch in input():
    if ch in seen:
        answer = ch
        break
    seen.add(ch)
print(answer)`, note: "The \"seen set\" pattern: remember what you've met, check with fast <code>in</code>. You will reuse this pattern many times." }] },
    { id: "fix11", lvl: "fire", debug: true, title: "Attendance bug", prompt: "<p>Print the students who were absent (registered but not in the attendance list), sorted, one per line. Expected: <code>Faisal</code> then <code>Nora</code>.</p>", starter: c`registered = ["Sara", "Omar", "Nora", "Faisal", "Lina"]
present = ["Omar", "Sara", "Lina", "Omar"]
absent = {}
for s in registered:
    if s not in present:
        absent.append(s)
for s in absent.sort():
    print(s)`, tests: [{ expected: "Faisal\nNora" }],
      solutions: [{ name: "Fixed list", code: c`registered = ["Sara", "Omar", "Nora", "Faisal", "Lina"]
present = ["Omar", "Sara", "Lina", "Omar"]
absent = []
for s in registered:
    if s not in present:
        absent.append(s)
for s in sorted(absent):
    print(s)` }, { name: "Sets", code: c`registered = ["Sara", "Omar", "Nora", "Faisal", "Lina"]
present = ["Omar", "Sara", "Lina", "Omar"]
for s in sorted(set(registered) - set(present)):
    print(s)`, note: "The whole problem is one set difference." }] },
  ],
  quiz: [
    { q: "Which creates an empty set?", o: ["`{}`", "`set()`", "`[]`", "`()`"], a: 1, e: "`{}` is an empty dict." },
    { q: "`len({1, 1, 2, 2, 3})` is…", o: ["5", "3", "2", "An error"], a: 1, e: "Duplicates disappear." },
    { q: "Which cannot be changed after creation?", o: ["list", "set", "tuple", "all can"], a: 2, e: "Tuples are immutable." },
    { q: "`{1, 2, 3} - {2, 5}` is…", o: ["`{1, 3}`", "`{1, 3, 5}`", "`{2}`", "`{5}`"], a: 0, e: "Items of the first set not in the second." },
    { q: "`a, b = (4, 5)` gives `b` =", o: ["4", "5", "(4, 5)", "Error"], a: 1, e: "Tuple unpacking." },
  ],
  puzzle: { title: "Club logic", q: "<p>30 students take Python, 25 take AI, and 10 take both. How many students take at least one of them? (Think sets: |A ∪ B| = |A| + |B| − |A ∩ B|.)</p>", answers: ["45"], hint: "The 10 are counted twice if you simply add.", ar: "الطلاب المشتركون محسوبون مرتين.", e: "30 + 25 − 10 = <b>45</b>. This is the inclusion–exclusion principle from discrete math, exactly what <code>len(a | b)</code> computes." },
  cards: [
    { f: "Tuple vs list", b: "Tuple: immutable, `( )`. List: changeable, `[ ]`." },
    { f: "Remove duplicates from a list", b: "`set(lst)` (order lost) or `list(dict.fromkeys(lst))` (order kept)." },
    { f: "Set intersection / union / difference", b: "`a & b`, `a | b`, `a - b`" },
    { f: "Empty set?", b: "`set()` — not `{}`." },
  ],
};
})();

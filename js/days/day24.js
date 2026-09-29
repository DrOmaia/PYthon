window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[24] = {
  title: "How machines learn: data, features and k-NN",
  intro: "What does it mean for a computer to <b>learn</b>? Instead of writing the rules yourself (<code>if temperature &gt; 40: ...</code>), you give the computer <b>examples with answers</b> and let it find the rules. Today you build a real learning algorithm from scratch with the tools you already know — no magic, just distances and votes.",
  introAr: "تعلم الآلة: بدل أن نكتب القواعد بأنفسنا، نعطي الحاسب أمثلة مع إجاباتها فيستنتج القاعدة. اليوم نبني خوارزمية أقرب الجيران (k-NN) من الصفر، ونتعلم المصطلحات الأساسية: الخصائص، والتصنيفات، والتدريب، والاختبار، والدقة.",
  goals: ["Explain features, labels, training and testing", "Tell classification from regression", "Implement k-nearest neighbors (k-NN) by hand", "Measure accuracy on test data", "Explain overfitting and why we split data"],
  learn: [
    { t: "h", text: "Rules vs learning" },
    { t: "table", head: ["Traditional programming", "Machine learning"], rows: [["you write the rules", "the computer finds the rules"], ["data + rules → answers", "data + answers → rules (a model)"], ["`if size > 100: ...`", "`model.fit(examples, answers)`"]] },
    { t: "h", text: "The vocabulary" },
    { t: "table", head: ["Term", "Meaning", "Example: predicting pass/fail"], rows: [["sample", "one example (a row)", "one student"], ["features (X)", "the inputs we measure", "hours studied, attendance %"], ["label (y)", "the answer we want to predict", "pass / fail"], ["model", "the learned rule", "\"study ≥ 5h and attend ≥ 70% → pass\""], ["training set", "examples the model learns from", "last year's students"], ["test set", "unseen examples to check it", "students it never saw"]] },
    { t: "p", html: "<p><b>Classification</b> predicts a category (pass/fail, spam/not spam, which flower). <b>Regression</b> predicts a number (house price, tomorrow's temperature).</p>" },
    { t: "ar", html: "الخصائص X هي المدخلات (مثل ساعات المذاكرة)، والتصنيف y هو الإجابة (ناجح/راسب). نُدرّب النموذج على جزء من البيانات، ونختبره على جزء لم يره أبدًا لنعرف هل تعلّم فعلًا أم حفظ فقط." },
    { t: "h", text: "k-nearest neighbors: ask your neighbors" },
    { t: "analogy", title: "Judging a new restaurant", html: "<p>To guess if you'll like a new restaurant, you find the 3 restaurants most similar to it that you've already tried, and go with the majority opinion. That's k-NN with k = 3: find the k most similar training examples (smallest distance) and vote.</p>" },
    { t: "viz", code: c`import math
# features: [hours studied per week, attendance %]   label: pass/fail
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]

def distance(a, b):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

def predict(new, k=3):
    dists = sorted((distance(new, X[i]), y[i]) for i in range(len(X)))
    nearest = [label for d, label in dists[:k]]
    return max(set(nearest), key=nearest.count)

print(predict([6, 80]))
print(predict([2, 45]))`, before: "<p>This is a complete machine-learning classifier in about 10 lines. Visualize it (it's short!) and watch the distances being sorted.</p>" },
    { t: "h", text: "Testing honestly" },
    { t: "p", html: "<p>A student who memorizes last year's exam answers may still fail this year's exam. A model can do the same: perfect on the examples it saw, bad on new ones. This is called <b>overfitting</b>. That's why we always keep a <b>test set</b> the model never trains on, and report <b>accuracy</b> on it:</p>" },
    { t: "code", code: c`def accuracy(predicted, actual):
    correct = sum(p == a for p, a in zip(predicted, actual))
    return correct / len(actual)

print(accuracy(["pass", "fail", "pass", "pass"], ["pass", "fail", "fail", "pass"]))` },
    { t: "h", text: "Feature scaling" },
    { t: "p", html: "<p>In our example, attendance goes up to 100 but hours only to about 10, so attendance dominates the distance. We fix that by <b>scaling</b> features to similar ranges (like the normalize function from Day 23). Many ML bugs are really data-preparation bugs.</p>" },
  ],
  mistakes: [
    { title: "Testing on the training data", html: "Accuracy looks amazing and means nothing.", wrong: c`model.fit(X, y)
print(model.score(X, y))   # 100%?!`, right: c`model.fit(X_train, y_train)
print(model.score(X_test, y_test))` },
    { title: "Forgetting to scale features", html: "Features with large numbers dominate distance-based models like k-NN.", wrong: c`X = [[5, 90000], [3, 45000]]   # hours, salary`, right: c`# scale each column to 0-1 first`, ar: "لو كانت خاصية أرقامها كبيرة جدًا ستطغى على الخصائص الأخرى في حساب المسافة." },
    { title: "Even k with two classes", html: "k = 2 or 4 can tie. Use an odd k for yes/no problems." , wrong: c`predict(new, k=2)`, right: c`predict(new, k=3)` },
  ],
  tricks: [
    { title: "Counter for voting", html: "", code: c`from collections import Counter
votes = ["cat", "dog", "cat"]
print(Counter(votes).most_common(1)[0][0])` },
    { title: "A baseline first", html: "Before celebrating 80% accuracy, check the <b>baseline</b>: always guessing the most common class. If 80% of students pass, a model that always says \"pass\" is already 80% accurate!" },
  ],
  practice: [
    { t: "predict", code: c`y_true = [1, 0, 1, 1, 0]
y_pred = [1, 0, 0, 1, 1]
print(sum(t == p for t, p in zip(y_true, y_pred)) / len(y_true))`, explain: "3 of 5 match: <code>0.6</code>." },
    { t: "parsons", title: "Train/test split", prompt: "Shuffle the data reproducibly and keep 80% for training.", lines: ["import random", "data = list(range(10))", "random.seed(1)", "random.shuffle(data)", "cut = int(len(data) * 0.8)", "train, test = data[:cut], data[cut:]", "print(len(train), len(test))"], explain: "Shuffle first so the split is random; seed so it's repeatable. Output <code>8 2</code>." },
    { t: "try", title: "Play with k", html: "<p>Change k to 1, 3 and 5 and the new student's features. When does the prediction change? What happens with k = 6 (all neighbors)?</p>", code: c`import math
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]
def predict(new, k):
    d = sorted((math.dist(new, X[i]), y[i]) for i in range(len(X)))
    near = [lab for _, lab in d[:k]]
    return max(set(near), key=near.count), near
print(predict([5, 70], 3))` },
  ],
  exercises: [
    { id: "acc", lvl: "seed", title: "accuracy()", prompt: "<p>Write <code>accuracy(predicted, actual)</code> returning the fraction correct, rounded to 2 decimals.</p>", starter: "def accuracy(predicted, actual):\n    pass\n", tests: [{ after: "print(accuracy([1, 1, 0], [1, 0, 0]), accuracy(['a'], ['a']))", expected: "0.67 1.0" }],
      solutions: [{ name: "zip", code: c`def accuracy(predicted, actual):
    correct = 0
    for p, a in zip(predicted, actual):
        if p == a:
            correct += 1
    return round(correct / len(actual), 2)` }] },
    { id: "vote", lvl: "seed", title: "majority_vote()", prompt: "<p>Write <code>majority_vote(labels)</code> returning the most common label. On a tie, return the one that appears <b>first</b> in the list.</p>", starter: "def majority_vote(labels):\n    pass\n", tests: [{ after: "print(majority_vote(['a', 'b', 'b']), majority_vote(['x', 'y']), majority_vote(['cat', 'dog', 'dog', 'cat']))", expected: "b x cat" }],
      solutions: [{ name: "Counting", code: c`def majority_vote(labels):
    counts = {}
    for lab in labels:
        counts[lab] = counts.get(lab, 0) + 1
    best = labels[0]
    for lab in labels:
        if counts[lab] > counts[best]:
            best = lab
    return best` }, { name: "Counter", code: c`from collections import Counter

def majority_vote(labels):
    return Counter(labels).most_common(1)[0][0]`, note: "<code>Counter.most_common</code> keeps first-seen order on ties." }] },
    { id: "knn", lvl: "star", title: "k-NN classifier", prompt: "<p>Write <code>knn_predict(X_train, y_train, point, k)</code> using Euclidean distance and majority vote (ties → the label of the closer neighbors first, i.e. use your vote on labels sorted by distance).</p>", starter: "import math\n\ndef knn_predict(X_train, y_train, point, k):\n    pass\n", tests: [{ after: "X = [[1, 1], [1, 2], [2, 1], [8, 8], [8, 9], [9, 8]]\ny = ['red', 'red', 'red', 'blue', 'blue', 'blue']\nprint(knn_predict(X, y, [2, 2], 3), knn_predict(X, y, [7, 7], 3), knn_predict(X, y, [5, 5], 1))", expected: "red blue blue" }],
      solutions: [{ name: "Sort by distance", code: c`import math
from collections import Counter

def knn_predict(X_train, y_train, point, k):
    pairs = sorted(zip(X_train, y_train), key=lambda p: math.dist(p[0], point))
    labels = [lab for _, lab in pairs[:k]]
    return Counter(labels).most_common(1)[0][0]` }] },
    { id: "split", lvl: "star", title: "train_test_split by hand", prompt: "<p>Write <code>split(X, y, test_ratio, seed)</code>: shuffle the <b>indexes</b> with <code>random.Random(seed).shuffle</code>, put the first <code>round(len(X) * test_ratio)</code> shuffled indexes in the test set, and return <code>X_train, X_test, y_train, y_test</code> (lists).</p>", starter: "import random\n\ndef split(X, y, test_ratio, seed):\n    pass\n", tests: [{ after: "X = [[i] for i in range(10)]\ny = [i % 2 for i in range(10)]\na, b, c, d = split(X, y, 0.3, 42)\nprint(len(a), len(b), len(c), len(d))\nprint(sorted(v[0] for v in a + b) == list(range(10)))\nprint(all(X.index(x) % 2 == lab for x, lab in zip(b, d)))", expected: "7 3 7 3\nTrue\nTrue" }],
      solutions: [{ name: "Shuffled indexes", code: c`import random

def split(X, y, test_ratio, seed):
    idx = list(range(len(X)))
    random.Random(seed).shuffle(idx)
    n_test = round(len(X) * test_ratio)
    test_idx, train_idx = idx[:n_test], idx[n_test:]
    return ([X[i] for i in train_idx], [X[i] for i in test_idx],
            [y[i] for i in train_idx], [y[i] for i in test_idx])`, note: "Shuffling indexes keeps each X row paired with its y label. Tomorrow scikit-learn's <code>train_test_split</code> does exactly this." }] },
    { id: "evaluate", lvl: "fire", title: "Full experiment", prompt: "<p>Put it together: <code>evaluate(X, y, k)</code> runs <b>leave-one-out</b> testing — for each sample, predict it with k-NN trained on all the <b>other</b> samples — and returns the accuracy rounded to 2 decimals.</p>", starter: "import math\nfrom collections import Counter\n\ndef evaluate(X, y, k):\n    pass\n", tests: [{ after: "X = [[1, 1], [1, 2], [2, 1], [8, 8], [8, 9], [9, 8], [5, 4]]\ny = ['r', 'r', 'r', 'b', 'b', 'b', 'b']\nprint(evaluate(X, y, 1), evaluate(X, y, 3))", expected: "0.86 0.86" }],
      solutions: [{ name: "Leave-one-out", code: c`import math
from collections import Counter

def knn(X_train, y_train, point, k):
    pairs = sorted(zip(X_train, y_train), key=lambda p: math.dist(p[0], point))
    return Counter(lab for _, lab in pairs[:k]).most_common(1)[0][0]

def evaluate(X, y, k):
    correct = 0
    for i in range(len(X)):
        X_rest = X[:i] + X[i + 1:]
        y_rest = y[:i] + y[i + 1:]
        if knn(X_rest, y_rest, X[i], k) == y[i]:
            correct += 1
    return round(correct / len(X), 2)`, note: "Leave-one-out uses every sample for testing once — great for tiny datasets. The point [5, 4] is closer to the red group, so it's misclassified: real data always has hard cases." }] },
    { id: "fix24", lvl: "fire", debug: true, title: "The cheating experiment", prompt: "<p>This experiment reports 100% accuracy because it tests on training data, and its distance is wrong. Fix <code>distance</code> (Euclidean) and make <code>experiment</code> train on the first 4 samples and test on the last 2. Expected: <code>0.5</code>.</p>", starter: c`import math

def distance(a, b):
    return sum(a) - sum(b)

def nearest_label(X_train, y_train, p):
    best = min(range(len(X_train)), key=lambda i: distance(X_train[i], p))
    return y_train[best]

def experiment(X, y):
    preds = [nearest_label(X, y, p) for p in X]
    return sum(p == t for p, t in zip(preds, y)) / len(y)`, tests: [{ after: "X = [[0, 0], [0, 1], [5, 5], [6, 5], [1, 0], [3, 3]]\ny = ['a', 'a', 'b', 'b', 'a', 'a']\nprint(experiment(X, y))", expected: "0.5" }],
      solutions: [{ name: "Fixed", code: c`import math

def distance(a, b):
    return math.sqrt(sum((x - z) ** 2 for x, z in zip(a, b)))

def nearest_label(X_train, y_train, p):
    best = min(range(len(X_train)), key=lambda i: distance(X_train[i], p))
    return y_train[best]

def experiment(X, y):
    X_train, y_train = X[:4], y[:4]
    X_test, y_test = X[4:], y[4:]
    preds = [nearest_label(X_train, y_train, p) for p in X_test]
    return sum(p == t for p, t in zip(preds, y_test)) / len(y_test)`, note: "An honest 50% is worth more than a fake 100%. The point [3, 3] sits between the groups — the model needs more training data." }] },
  ],
  quiz: [
    { q: "In predicting house prices, the price is the…", o: ["feature", "label", "model", "test set"], a: 1, e: "The answer we predict." },
    { q: "Predicting tomorrow's temperature is…", o: ["classification", "regression", "clustering", "sorting"], a: 1, e: "A number." },
    { q: "Why keep a separate test set?", o: ["To train faster", "To check the model on unseen data", "To save memory", "It's optional"], a: 1, e: "Detects overfitting." },
    { q: "k-NN predicts by…", o: ["drawing a line", "voting among the k closest training examples", "random choice", "averaging all labels"], a: 1, e: "Nearest neighbors." },
    { q: "90% of emails are not spam. A model always saying \"not spam\" has accuracy…", o: ["0%", "50%", "90%", "100%"], a: 2, e: "The baseline — always compare with it." },
  ],
  puzzle: { title: "Nearest neighbor by hand", q: "<p>Training points: A(1, 1) label <b>cat</b>, B(4, 5) label <b>dog</b>, C(6, 1) label <b>cat</b>. With k = 1, what is the label of the new point (4, 2)?</p>", code: c`import math
train = [((1, 1), "cat"), ((4, 5), "dog"), ((6, 1), "cat")]
p = (4, 2)
print(min(train, key=lambda t: math.dist(t[0], p))[1])`, answers: ["cat"], hint: "Compute the three distances: √(9+1), √(0+9), √(4+1).", ar: "احسب{{g:|ي}} المسافة من النقطة الجديدة إلى كل نقطة تدريب.", e: "Distances: A ≈ 3.16, B = 3, C ≈ 2.24. Nearest is C: <b>cat</b>." },
  cards: [
    { f: "Features vs label", b: "Features (X) are inputs; the label (y) is the answer to predict." },
    { f: "Classification vs regression", b: "Category vs number." },
    { f: "Overfitting", b: "The model memorizes training data and fails on new data." },
    { f: "How k-NN predicts", b: "Find the k closest training examples, take a majority vote." },
    { f: "Baseline", b: "Accuracy of always guessing the most common class." },
  ],
};
})();

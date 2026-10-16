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
    { t: "p", html: "<p>Until now <b>you</b> wrote every rule: <code>if mark &gt;= 60: print(\"pass\")</code>. That works when the rule is simple. But try writing the rules for \"is this email spam?\" or \"is this a photo of a cat?\". There are too many cases, and they keep changing. <b>Machine learning</b> turns the job around: you collect <b>examples with their answers</b>, and an algorithm finds the rule by itself.</p>" },
    { t: "analogy", title: "How a child learns what a cat is", html: "<p>Nobody gave you a rule like \"4 legs + whiskers + pointy ears = cat\". Your family just pointed: \"cat\", \"dog\", \"cat\"… After enough examples you could recognize a cat you had never seen before. Machine learning works the same way: many labeled examples in, the ability to judge <b>new</b> cases out.</p>" },
    { t: "table", head: ["Traditional programming", "Machine learning"], rows: [["you write the rules", "the computer finds the rules"], ["data + rules → answers", "data + answers → rules (a model)"], ["`if size > 100: ...`", "`model.fit(examples, answers)`"]] },
    { t: "check", q: "Which problem is a good fit for machine learning rather than hand-written rules?", o: ["Converting Celsius to Fahrenheit", "Recognizing handwritten digits in photos", "Adding up a shopping bill"], a: 1, e: "Celsius and bills have an exact formula you can write. Handwriting has endless variations — easier to learn from many labeled examples." },

    { t: "h", text: "The vocabulary: features and labels" },
    { t: "p", html: "<p>Let's predict whether a student will pass, from two numbers we can measure: hours studied per week and attendance %. Each student is one <b>sample</b>. The measurements are the <b>features</b>, written <code>X</code>. The answer we want to predict is the <b>label</b>, written <code>y</code>. In Python, <code>X</code> is a list of rows and <code>y</code> is a list of labels <b>in the same order</b>.</p>" },
    { t: "code", code: c`# features: [hours studied per week, attendance %]
X = [[2, 50], [3, 60], [8, 90], [7, 85]]
y = ["fail", "fail", "pass", "pass"]

print("Student 2 features:", X[2])
print("Student 2 label:", y[2])
print("Number of samples:", len(X))`, note: "<p>Row <code>X[2]</code> and label <code>y[2]</code> belong to the <b>same</b> student: 8 hours, 90% attendance, passed. The position is the link between them.</p>" },
    { t: "lines", rows: [
      ["X = [[2, 50], [3, 60], [8, 90], [7, 85]]", "A list of lists: one inner list (row) per student, one number per feature. Capital <code>X</code> is the tradition for features."],
      ["y = [\"fail\", \"fail\", \"pass\", \"pass\"]", "One label per student, in the same order as the rows of <code>X</code>."],
      ["print(\"Student 2 label:\", y[2])", "The same index in <code>X</code> and <code>y</code> gives the features and the answer of one sample."],
    ] },
    { t: "table", head: ["Term", "Meaning", "Example: predicting pass/fail"], rows: [["sample", "one example (a row)", "one student"], ["features (X)", "the inputs we measure", "hours studied, attendance %"], ["label (y)", "the answer we want to predict", "pass / fail"], ["model", "the learned rule", "\"study ≥ 5h and attend ≥ 70% → pass\""], ["training set", "examples the model learns from", "last year's students"], ["test set", "unseen examples to check it", "students it never saw"]] },
    { t: "ar", html: "الخصائص X هي المدخلات (مثل ساعات المذاكرة ونسبة الحضور)، والتصنيف y هو الإجابة (ناجح/راسب). الصف X[i] والتصنيف y[i] يخصان نفس الطالب." },
    { t: "check", q: "We want to predict a house price from its size and number of rooms. What is the **label**?", o: ["the size", "the number of rooms", "the price", "the list of houses"], a: 2, e: "The label is the answer we want to predict: the price. Size and rooms are features (inputs)." },

    { t: "h", text: "Classification vs regression" },
    { t: "p", html: "<p>Machine-learning problems come in two main kinds. <b>Classification</b> predicts a <b>category</b>: pass/fail, spam/not spam, which flower. <b>Regression</b> predicts a <b>number</b>: a house price, tomorrow's temperature, a final mark out of 100. Ask yourself: \"is the answer a name or a number?\"</p>" },
    { t: "check", q: "Predicting how many minutes a coffee order will take is…", o: ["classification", "regression"], a: 1, e: "The answer is a number (minutes), so it's regression. \"Will it be late: yes/no?\" would be classification." },

    { t: "h", text: "Distance: how similar are two samples?" },
    { t: "p", html: "<p>To learn from examples, the computer must be able to say \"this new student looks like <i>that</i> old student\". If we draw each student as a point (x = hours, y = attendance), similar students are <b>close</b> points. We measure closeness with the straight-line (<b>Euclidean</b>) distance — the Pythagoras formula from school: √((x₁−x₂)² + (y₁−y₂)²).</p>" },
    { t: "code", code: c`import math
a = [2, 50]      # a student who failed
new = [6, 80]    # a new student

d = math.sqrt((a[0] - new[0]) ** 2 + (a[1] - new[1]) ** 2)
print(round(d, 2))
print(round(math.dist(a, new), 2))   # the same, built in`, note: "<p>Both lines print <code>30.27</code>. <code>math.dist(p, q)</code> does the same calculation for points with any number of features.</p>" },
    { t: "lines", rows: [
      ["(a[0] - new[0]) ** 2", "Difference in hours (2 − 6 = −4), squared (16). Squaring makes it positive."],
      ["(a[1] - new[1]) ** 2", "Difference in attendance (50 − 80 = −30), squared (900)."],
      ["math.sqrt(...)", "Square root of the total: √916 ≈ 30.27. Small number = similar students."],
    ] },
    { t: "ar", html: "المسافة بين نقطتين تقيس مدى التشابه: كلما صغرت المسافة كان الطالبان أكثر تشابهًا. math.dist تحسبها لنا مباشرة." },
    { t: "check", q: "What does this print?", code: c`import math
print(math.dist([0, 0], [3, 4]))`, o: ["`7.0`", "`5.0`", "`25.0`", "`1.0`"], a: 1, e: "√(3² + 4²) = √25 = `5.0` — the famous 3-4-5 triangle." },

    { t: "h", text: "k-nearest neighbors: ask your neighbors" },
    { t: "analogy", title: "Judging a new restaurant", html: "<p>To guess if you'll like a new restaurant, you think of the 3 restaurants most similar to it that you've already tried, and go with the majority opinion. That's k-NN with k = 3: find the k most similar training examples (smallest distance) and let them <b>vote</b>.</p>" },
    { t: "p", html: "<p>The whole algorithm in three steps: <b>1.</b> compute the distance from the new point to every training example; <b>2.</b> sort and keep the k closest; <b>3.</b> return the most common label among them. That's it — no hidden formula.</p>" },
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
    { t: "lines", rows: [
      ["dists = sorted((distance(new, X[i]), y[i]) for i in range(len(X)))", "Make a <code>(distance, label)</code> tuple for every training student, then sort. Tuples sort by their first item, so the closest come first."],
      ["nearest = [label for d, label in dists[:k]]", "Keep the first k tuples and take only their labels, e.g. <code>['pass', 'pass', 'pass']</code>."],
      ["return max(set(nearest), key=nearest.count)", "The vote: for each different label, count how often it appears in <code>nearest</code>, and return the one with the biggest count."],
    ] },
    { t: "ar", html: "خوارزمية أقرب الجيران: نحسب المسافة إلى كل مثال تدريب، نأخذ أقرب k أمثلة، ثم نختار التصنيف الأكثر تكرارًا بينها (تصويت الأغلبية)." },
    { t: "check", q: "With k = 3, the three nearest neighbors have labels `pass`, `fail`, `pass`. What does k-NN predict?", o: ["`fail`", "`pass`", "It can't decide"], a: 1, e: "Majority vote: 2 votes for pass, 1 for fail. (That's also why an **odd** k is used for two classes — no ties.)" },

    { t: "h", text: "Testing honestly" },
    { t: "p", html: "<p>A student who memorizes last year's exam answers may still fail this year's exam. A model can do the same: perfect on the examples it saw, bad on new ones. This is called <b>overfitting</b>. That's why we split the data: a <b>training set</b> to learn from, and a <b>test set</b> the model never sees during training. We report the <b>accuracy</b> on the test set: the fraction of predictions that are correct.</p>" },
    { t: "analogy", title: "Homework vs the real exam", html: "<p>The training set is your homework: you may see the answers and learn from them. The test set is the final exam: new questions, no peeking. Only the exam score tells your teacher what you really learned.</p>" },
    { t: "code", code: c`def accuracy(predicted, actual):
    correct = sum(p == a for p, a in zip(predicted, actual))
    return correct / len(actual)

print(accuracy(["pass", "fail", "pass", "pass"], ["pass", "fail", "fail", "pass"]))`, note: "<p>3 of the 4 predictions match the real answers, so the accuracy is <code>0.75</code> (75%).</p>" },
    { t: "lines", rows: [
      ["zip(predicted, actual)", "Pairs the first prediction with the first real answer, the second with the second…"],
      ["sum(p == a for p, a in ...)", "Each comparison is <code>True</code> or <code>False</code>; True counts as 1, so the sum is the number of correct predictions."],
      ["return correct / len(actual)", "Correct divided by total: a number from 0 (all wrong) to 1 (all right)."],
    ] },
    { t: "ar", html: "لا نختبر النموذج على نفس بيانات التدريب، لأنه قد يحفظها فقط (overfitting). نختبره على بيانات لم يرها، ونحسب الدقة = عدد الإجابات الصحيحة ÷ العدد الكلي." },
    { t: "check", q: "A model gets 100% on its training data but 55% on the test data. What is most likely happening?", o: ["The model is excellent", "Overfitting: it memorized the training examples", "The test set is too easy"], a: 1, e: "A big gap between training and test accuracy is the classic sign of overfitting. The test score is the honest one." },

    { t: "h", text: "Feature scaling" },
    { t: "p", html: "<p>Attendance goes up to 100 but hours only to about 10, so a small change in attendance outweighs a big change in hours. Look at this: the new student studies 8 hours, but the raw distance says the closest student is the one who studies only 2.</p>" },
    { t: "code", code: c`import math
lazy = [2, 88]      # 2 hours, 88% attendance
hard = [9, 70]      # 9 hours, 70% attendance
new = [8, 86]

print("raw:   ", round(math.dist(new, lazy), 2), round(math.dist(new, hard), 2))

def scale(p):
    return [p[0] / 10, p[1] / 100]   # both features now 0-1

print("scaled:", round(math.dist(scale(new), scale(lazy)), 2), round(math.dist(scale(new), scale(hard)), 2))`, note: "<p>Raw: 6.32 vs 16.03 — attendance dominates, so \"lazy\" looks closer. Scaled to 0–1: 0.6 vs 0.19 — now hours count too, and \"hard\" is closer. Like the <code>normalize</code> exercise of Day 23: many ML bugs are really data-preparation bugs.</p>" },
    { t: "ar", html: "إذا كانت أرقام خاصية كبيرة (مثل الحضور من 100) فستطغى على الخصائص الصغيرة (مثل الساعات). نحوّل كل الخصائص إلى مدى متقارب مثل 0 إلى 1 قبل حساب المسافة." },

    { t: "steps", title: "Will this student pass?", problem: "<p>You have 9 students from last year with hours, attendance and result. Build a k-NN model, train it on the first 6 students, test it on the last 3, and report the accuracy honestly.</p>", steps: [
      { html: "<p><b>Understand.</b> Features: <code>[hours, attendance]</code>. Label: <code>\"pass\"</code>/<code>\"fail\"</code>. Classification with k-NN. Output: predictions for the test students and the accuracy.</p>" },
      { html: "<p><b>Split the data.</b> Slicing keeps each row next to its label.</p>", code: c`students = [[1, 45], [8, 90], [3, 65], [9, 95], [2, 55], [7, 80], [6, 85], [5, 75], [2, 70]]
results = ["fail", "pass", "fail", "pass", "fail", "pass", "pass", "fail", "fail"]
X_train, y_train = students[:6], results[:6]
X_test, y_test = students[6:], results[6:]` },
      { html: "<p><b>The model.</b> Scale the features, measure the distance to every <b>training</b> student, vote among the 3 nearest.</p>", code: c`def scale(p):
    return [p[0] / 10, p[1] / 100]

def predict(new, k=3):
    pairs = sorted((math.dist(scale(new), scale(X_train[i])), y_train[i]) for i in range(len(X_train)))
    nearest = [lab for d, lab in pairs[:k]]
    return max(set(nearest), key=nearest.count)` },
      { html: "<p><b>Test and measure.</b> Predict every test student and compare with the real results. The student with 5 hours and 75% really failed, but looks like the passing students — an honest model makes honest mistakes.</p>" },
    ], code: c`import math

students = [[1, 45], [8, 90], [3, 65], [9, 95], [2, 55], [7, 80], [6, 85], [5, 75], [2, 70]]
results = ["fail", "pass", "fail", "pass", "fail", "pass", "pass", "fail", "fail"]
X_train, y_train = students[:6], results[:6]
X_test, y_test = students[6:], results[6:]

def scale(p):
    return [p[0] / 10, p[1] / 100]

def predict(new, k=3):
    pairs = sorted((math.dist(scale(new), scale(X_train[i])), y_train[i]) for i in range(len(X_train)))
    nearest = [lab for d, lab in pairs[:k]]
    return max(set(nearest), key=nearest.count)

predictions = [predict(p) for p in X_test]
print("predicted:", predictions)
print("actual:   ", y_test)
correct = sum(p == a for p, a in zip(predictions, y_test))
print("accuracy:", round(correct / len(y_test), 2))`, ar: "قسّمنا البيانات إلى تدريب واختبار، وبنينا k-NN على بيانات التدريب فقط، ثم حسبنا الدقة على طلاب لم يرهم النموذج: 0.67 نتيجة صادقة." },
  ],
  mistakes: [
    { title: "Testing on the training data", html: "Accuracy looks amazing and means nothing.", wrong: c`model.fit(X, y)
print(model.score(X, y))   # 100%?!`, right: c`model.fit(X_train, y_train)
print(model.score(X_test, y_test))` },
    { title: "Forgetting to scale features", html: "Features with large numbers dominate distance-based models like k-NN.", wrong: c`X = [[5, 90000], [3, 45000]]   # hours, salary`, right: c`# scale each column to 0-1 first`, ar: "لو كانت خاصية أرقامها كبيرة جدًا ستطغى على الخصائص الأخرى في حساب المسافة." },
    { title: "Even k with two classes", html: "k = 2 or 4 can tie. Use an odd k for yes/no problems." , wrong: c`predict(new, k=2)`, right: c`predict(new, k=3)` },
    { title: "Shuffling X and y separately", html: "Each row of <code>X</code> must stay with its label in <code>y</code>. Shuffle the <b>indexes</b> (or the pairs) once, then use them for both.", wrong: c`random.shuffle(X)
random.shuffle(y)    # labels no longer match!`, right: c`idx = list(range(len(X)))
random.shuffle(idx)
X = [X[i] for i in idx]
y = [y[i] for i in idx]`, ar: "لا تخلط X و y كلًا على حدة؛ كل صف يجب أن يبقى مع تصنيفه." },
  ],
  tricks: [
    { title: "Counter for voting", html: "<code>Counter</code> (Day 12) counts the votes and <code>most_common(1)</code> gives the winner.", code: c`from collections import Counter
votes = ["cat", "dog", "cat"]
print(Counter(votes).most_common(1)[0][0])` },
    { title: "A baseline first", html: "Before celebrating 80% accuracy, check the <b>baseline</b>: always guessing the most common class. If 80% of students pass, a model that always says \"pass\" is already 80% accurate!" },
    { title: "math.dist works in any dimension", html: "Add a third feature (sleep hours, say) and the same function still works — no new formula needed.", code: c`import math
print(math.dist([8, 90, 7], [6, 80, 5]))` },
  ],
  practice: [
    { t: "predict", code: c`y_true = [1, 0, 1, 1, 0]
y_pred = [1, 0, 0, 1, 1]
print(sum(t == p for t, p in zip(y_true, y_pred)) / len(y_true))`, explain: "3 of 5 match: <code>0.6</code>." },
    { t: "predict", code: c`import math
print(math.dist([1, 1], [4, 5]), math.dist([2], [7]))`, explain: "√(3² + 4²) = <code>5.0</code>. With one feature, distance is just the difference: <code>5.0</code>." },
    { t: "predict", code: c`near = ["fail", "pass", "pass", "fail", "pass"]
print(max(set(near), key=near.count))`, explain: "\"pass\" appears 3 times, \"fail\" 2 times, so the vote returns <code>pass</code>." },
    { t: "parsons", title: "Train/test split", prompt: "Shuffle the data reproducibly and keep 80% for training.", lines: ["import random", "data = list(range(10))", "random.seed(1)", "random.shuffle(data)", "cut = int(len(data) * 0.8)", "train, test = data[:cut], data[cut:]", "print(len(train), len(test))"], explain: "Shuffle first so the split is random; seed so it's repeatable. Output <code>8 2</code>." },
    { t: "parsons", title: "Accuracy function", prompt: "Build a function that counts correct predictions and returns the fraction.", lines: ["def accuracy(pred, real):", "    correct = 0", "    for p, r in zip(pred, real):", "        if p == r:", "            correct += 1", "    return correct / len(real)"], distractors: ["    return correct / len(pred) * 100"], explain: "Count the matches, then divide by the total. Accuracy is a fraction from 0 to 1." },
    { t: "try", title: "Play with k", html: "<p>Change k to 1, 3 and 5 and the new student's features. When does the prediction change? What happens with k = 6 (all neighbors)?</p>", code: c`import math
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]
def predict(new, k):
    d = sorted((math.dist(new, X[i]), y[i]) for i in range(len(X)))
    near = [lab for _, lab in d[:k]]
    return max(set(near), key=near.count), near
print(predict([5, 70], 3))` },
    { t: "try", title: "Add a feature", html: "<p>Add a third feature to every student — hours of sleep per night — and to the new student. Does the prediction change? (Remember to keep each row the same length.)</p>", code: c`import math
X = [[2, 50], [3, 60], [8, 90], [7, 85]]
y = ["fail", "fail", "pass", "pass"]
new = [5, 75]
d = sorted((math.dist(new, X[i]), y[i]) for i in range(len(X)))
print(d[0])` },
  ],
  exercises: [
    { id: "acc", lvl: "seed", title: "accuracy()", prompt: "<p>Write <code>accuracy(predicted, actual)</code> returning the fraction correct, rounded to 2 decimals.</p>", starter: "def accuracy(predicted, actual):\n    pass\n", tests: [{ after: "print(accuracy([1, 1, 0], [1, 0, 0]), accuracy(['a'], ['a']))", expected: "0.67 1.0" }],
      hint: "Loop over <code>zip(predicted, actual)</code> and count the pairs that are equal.",
      solutions: [{ name: "zip", code: c`def accuracy(predicted, actual):
    correct = 0
    for p, a in zip(predicted, actual):
        if p == a:
            correct += 1
    return round(correct / len(actual), 2)` }] },
    { id: "vote", lvl: "seed", title: "majority_vote()", prompt: "<p>Write <code>majority_vote(labels)</code> returning the most common label. On a tie, return the one that appears <b>first</b> in the list.</p>", starter: "def majority_vote(labels):\n    pass\n", tests: [{ after: "print(majority_vote(['a', 'b', 'b']), majority_vote(['x', 'y']), majority_vote(['cat', 'dog', 'dog', 'cat']))", expected: "b x cat" }],
      hint: "Count with a dict first. Then walk the list in order and keep a label only if its count is strictly bigger than the best so far.",
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
      hint: "Follow the three steps of the lesson: distances, sort, vote. <code>math.dist</code> and <code>Counter</code> make it short.", ar: "اتبع{{g:|ي}} الخطوات الثلاث: احسب{{g:|ي}} المسافات، رتّب{{g:|ي}}، ثم صوّت{{g:|ي}} بين أقرب k.",
      solutions: [{ name: "Sort by distance", code: c`import math
from collections import Counter

def knn_predict(X_train, y_train, point, k):
    pairs = sorted(zip(X_train, y_train), key=lambda p: math.dist(p[0], point))
    labels = [lab for _, lab in pairs[:k]]
    return Counter(labels).most_common(1)[0][0]` }] },
    { id: "split", lvl: "star", title: "train_test_split by hand", prompt: "<p>Write <code>split(X, y, test_ratio, seed)</code>: shuffle the <b>indexes</b> with <code>random.Random(seed).shuffle</code>, put the first <code>round(len(X) * test_ratio)</code> shuffled indexes in the test set, and return <code>X_train, X_test, y_train, y_test</code> (lists).</p>", starter: "import random\n\ndef split(X, y, test_ratio, seed):\n    pass\n", tests: [{ after: "X = [[i] for i in range(10)]\ny = [i % 2 for i in range(10)]\na, b, c, d = split(X, y, 0.3, 42)\nprint(len(a), len(b), len(c), len(d))\nprint(sorted(v[0] for v in a + b) == list(range(10)))\nprint(all(X.index(x) % 2 == lab for x, lab in zip(b, d)))", expected: "7 3 7 3\nTrue\nTrue" }],
      hint: "<code>idx = list(range(len(X)))</code>, shuffle it, slice it in two, then build the four lists with list comprehensions.",
      solutions: [{ name: "Shuffled indexes", code: c`import random

def split(X, y, test_ratio, seed):
    idx = list(range(len(X)))
    random.Random(seed).shuffle(idx)
    n_test = round(len(X) * test_ratio)
    test_idx, train_idx = idx[:n_test], idx[n_test:]
    return ([X[i] for i in train_idx], [X[i] for i in test_idx],
            [y[i] for i in train_idx], [y[i] for i in test_idx])`, note: "Shuffling indexes keeps each X row paired with its y label. Tomorrow scikit-learn's <code>train_test_split</code> does exactly this." }] },
    { id: "evaluate", lvl: "fire", title: "Full experiment", prompt: "<p>Put it together: <code>evaluate(X, y, k)</code> runs <b>leave-one-out</b> testing — for each sample, predict it with k-NN trained on all the <b>other</b> samples — and returns the accuracy rounded to 2 decimals.</p>", starter: "import math\nfrom collections import Counter\n\ndef evaluate(X, y, k):\n    pass\n", tests: [{ after: "X = [[1, 1], [1, 2], [2, 1], [8, 8], [8, 9], [9, 8], [5, 4]]\ny = ['r', 'r', 'r', 'b', 'b', 'b', 'b']\nprint(evaluate(X, y, 1), evaluate(X, y, 3))", expected: "0.86 0.86" }],
      hint: "For sample i, the training data is <code>X[:i] + X[i + 1:]</code> (everything except i). Same for y.",
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
      hint: "Two separate bugs: the distance formula (squares and a square root), and which samples are used for training vs testing.",
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
    { id: "baseline", lvl: "seed", title: "Baseline accuracy", prompt: "<p>Write <code>baseline(labels)</code>: the accuracy of a lazy model that always predicts the <b>most common</b> label, rounded to 2 decimals. Any real model must beat this number.</p>", starter: "def baseline(labels):\n    pass\n", tests: [{ after: "print(baseline(['pass', 'fail', 'pass', 'pass', 'fail']), baseline(['spam'] * 1 + ['ok'] * 9), baseline(['a', 'b']))", expected: "0.6 0.9 0.5" }],
      hint: "Find how many times the most common label appears, then divide by the number of labels.",
      solutions: [{ name: "count + max", code: c`def baseline(labels):
    best = max(labels.count(lab) for lab in set(labels))
    return round(best / len(labels), 2)` }, { name: "Counter", code: c`from collections import Counter

def baseline(labels):
    most = Counter(labels).most_common(1)[0][1]
    return round(most / len(labels), 2)`, note: "<code>most_common(1)[0]</code> is a <code>(label, count)</code> tuple; <code>[1]</code> takes the count." }] },
  ],
  quiz: [
    { q: "In predicting house prices, the price is the…", o: ["feature", "label", "model", "test set"], a: 1, e: "The answer we predict." },
    { q: "Predicting tomorrow's temperature is…", o: ["classification", "regression", "clustering", "sorting"], a: 1, e: "A number." },
    { q: "Why keep a separate test set?", o: ["To train faster", "To check the model on unseen data", "To save memory", "It's optional"], a: 1, e: "Detects overfitting." },
    { q: "k-NN predicts by…", o: ["drawing a line", "voting among the k closest training examples", "random choice", "averaging all labels"], a: 1, e: "Nearest neighbors." },
    { q: "90% of emails are not spam. A model always saying \"not spam\" has accuracy…", o: ["0%", "50%", "90%", "100%"], a: 2, e: "The baseline — always compare with it." },
    { q: "Why do we scale features before k-NN?", o: ["To make the code shorter", "So a feature with big numbers doesn't dominate the distance", "Because k-NN only accepts decimals", "To hide the data"], a: 1, e: "Distances add up squared differences; big-range features would drown out the others." },
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
  remember: [
    "Machine learning: give **examples with answers**, the algorithm finds the rule.",
    "**Features** `X` are the inputs, the **label** `y` is the answer; `X[i]` and `y[i]` are one sample.",
    "**Classification** predicts a category, **regression** predicts a number.",
    "**k-NN**: distances to every training example → keep the k closest → majority vote (odd k for two classes).",
    "Always test on data the model never saw; **accuracy** = correct ÷ total. Compare with the **baseline**.",
    "**Scale** features to similar ranges before using distances.",
  ],
  rememberAr: "الخصائص X مدخلات والتصنيف y هو الإجابة. أقرب الجيران: مسافات ثم أقرب k ثم تصويت. نختبر دائمًا على بيانات لم يرها النموذج، ونوحّد مدى الخصائص قبل حساب المسافة.",
};
})();

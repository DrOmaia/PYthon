window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[27] = {
  title: "Review + mini AI project: Student Success Predictor",
  intro: "Time to run a complete machine-learning project, the way data scientists do: get the data, explore it, prepare it, train several models, evaluate them honestly, and use the best one — and think about whether it should be used at all. The topic: predicting whether a student will pass a course.",
  introAr: "مشروع ذكاء اصطناعي كامل على مراحل: البيانات، ثم الاستكشاف، ثم التجهيز، ثم التدريب والمقارنة، ثم التقييم والتنبؤ. وفي النهاية نفكر: هل من العدل استخدام هذا النموذج لاتخاذ قرارات عن الطلاب؟",
  goals: ["Follow the full ML workflow end to end", "Explore data with numpy before modeling", "Compare models and pick one with evidence", "Interpret a confusion matrix", "Think about the ethics of prediction"],
  learn: [
    { t: "h", text: "Week recap: days 22–26" },
    { t: "p", html: "<p>Before the project, a quick tour of the week, {{name}}. For each day: the big idea, a tiny example and one question. If a question feels hard, open that day again for ten minutes — that is the best use of a review day.</p>" },
    { t: "table", head: ["Day", "Idea", "Remember"], rows: [["22", "algorithms", "binary search O(log n), sorting O(n log n), Big-O"], ["23", "numpy", "vectorized math, `a[:, c]`, masks, `axis`"], ["24", "ML ideas", "features/labels, train/test, k-NN, overfitting, baseline"], ["25", "scikit-learn", "`fit` / `predict` / `score`, trees, regression"], ["26", "text AI", "bag of words, Naive Bayes, intents, cosine similarity"]] },

    { t: "h", text: "Day 22 — Searching and sorting" },
    { t: "p", html: "<p>Linear search checks items one by one: up to <i>n</i> steps. <b>Binary search</b> needs a <b>sorted</b> list and throws away half of it at every step, so it needs only about log₂(n) steps. Big-O describes how the work grows as the data grows: O(n) for linear search, O(log n) for binary search, O(n²) for selection sort, O(n log n) for <code>sorted()</code>.</p>" },
    { t: "code", code: c`n = 1000
steps = 0
while n > 1:
    n = n // 2      # binary search throws away half
    steps += 1
print(steps, "halvings to go from 1000 items to 1")` },
    { t: "check", q: "Binary search on a **sorted** list of 1,000,000 names needs **about** how many steps in the worst case?", o: ["About 20", "About 1,000", "About 500,000", "About 1,000,000"], a: 0, e: "2²⁰ ≈ 1,000,000, so about 20 halvings are enough. Linear search could need all 1,000,000 checks.", hint: "Each step halves the list. How many halvings from a million to one?" },

    { t: "h", text: "Day 23 — numpy: math on whole arrays" },
    { t: "p", html: "<p>A numpy array does math on <b>every element at once</b> — no loop needed (vectorization), and much faster. A <b>boolean mask</b> like <code>a > 80</code> picks the elements that match. For 2D tables, <code>a[:, 0]</code> is the first column and <code>axis=0</code> works down the columns.</p>" },
    { t: "code", code: c`import numpy as np
marks = np.array([70, 85, 92])
print(marks + 5)            # every mark + 5
print(marks[marks > 80])    # only marks above 80
print(marks.mean().round(1))` },
    { t: "check", q: "What does this print?", code: c`import numpy as np
a = np.array([1, 2, 3])
print(a * 2)`, o: ["`[1, 2, 3, 1, 2, 3]`", "`[2 4 6]`", "`[1 2 3 1 2 3]`", "An error"], a: 1, e: "numpy multiplies every element: `[2 4 6]`. (A plain list times 2 would repeat the list.)", hint: "numpy arrays do math element by element." },

    { t: "h", text: "Day 24 — How machines learn" },
    { t: "p", html: "<p>Instead of writing rules, we give the computer examples: <b>features</b> (inputs, X) and <b>labels</b> (answers, y). k-NN predicts by asking the k most similar examples to vote. We test on data the model never saw, and compare with a <b>baseline</b>: the accuracy of always guessing the most common answer. A model that only memorizes is <b>overfitting</b>.</p>" },
    { t: "code", code: c`labels = ["fail"] * 8 + ["pass"] * 2
majority = max(set(labels), key=labels.count)
baseline = labels.count(majority) / len(labels)
print("always guess", majority, "->", baseline)` },
    { t: "check", q: "In a test set, 90 of 100 emails are **not** spam. A model reaches 0.90 accuracy. Is it good?", o: ["Yes, 90% is excellent", "Not yet — always guessing \"not spam\" also gives 0.90 (the baseline)", "No, accuracy must be 1.0", "It depends on k"], a: 1, e: "Always compare with the baseline. Matching it means the model may have learned nothing useful.", hint: "What score would you get by always giving the most common answer?" },

    { t: "h", text: "Day 25 — scikit-learn: fit, predict, score" },
    { t: "p", html: "<p>Every scikit-learn model is used the same way: split with <code>train_test_split</code>, create the model, <code>fit</code> on the training set, <code>predict</code> new rows, and <code>score</code> on the test set. Decision trees give readable rules; <code>LinearRegression</code> predicts numbers. X is always 2D.</p>" },
    { t: "code", code: c`from sklearn.neighbors import KNeighborsClassifier
X = [[1], [2], [3], [7], [8], [9]]
y = ["fail", "fail", "fail", "pass", "pass", "pass"]
model = KNeighborsClassifier(n_neighbors=3).fit(X, y)
print(model.predict([[2.5], [8.5]]))` },
    { t: "check", q: "After `model.fit(X_train, y_train)`, which line gives the **honest** accuracy?", o: ["`model.score(X_train, y_train)`", "`model.score(X_test, y_test)`", "`model.predict(X_test)`", "`model.fit(X_test, y_test)`"], a: 1, e: "Only the test set, which the model never saw, shows how it works on new data. The training score can be 1.0 just from memorizing.", hint: "Honest = data the model has never seen." },

    { t: "h", text: "Day 26 — Text classification and chatbots" },
    { t: "p", html: "<p>Text must become numbers first. <b>Bag of words</b> (<code>CountVectorizer</code>) counts each vocabulary word; <b>TF-IDF</b> weighs down words that are everywhere. Naive Bayes classifies the counts, and a pipeline glues both. A chatbot finds the most similar known phrase with <b>cosine similarity</b> and refuses when the match is weak.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
vec = CountVectorizer().fit(["I love Python", "Python is fun"])
print(vec.get_feature_names_out())
print(vec.transform(["fun fun Python"]).toarray())` },
    { t: "check", q: "Your vectorizer `vec` was fitted on the training texts. How do you vectorize a new message?", o: ["`CountVectorizer().fit_transform([msg])`", "`vec.transform([msg])`", "`vec.fit([msg])`", "You don't need to vectorize it"], a: 1, e: "`transform` with the already-fitted `vec` keeps the same columns (vocabulary) as training.", hint: "Same vocabulary as training." },
    { t: "ar", html: "مراجعة الأسبوع: البحث الثنائي يقسم البيانات نصفين، و numpy يحسب على المصفوفة كلها مرة واحدة، والتعلم الآلي = أمثلة (X و y) ثم fit و predict و score على بيانات الاختبار، والنص يتحول لأرقام قبل التدريب." },

    { t: "h", text: "The project: Student Success Predictor" },
    { t: "p", html: "<p>We generate a realistic, synthetic dataset of 300 students (no real person's data — an important privacy habit). Features: weekly study hours, attendance %, and number of assignments submitted (0–10). Label: 1 = passed, 0 = failed. The data is created by a rule plus random noise, just like real life is messy.</p>" },
    { t: "code", code: c`import numpy as np

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    X = np.column_stack([hours, attendance, assignments])
    return X, passed

X, y = make_data()
print(X.shape, "pass rate:", y.mean().round(2))
print(X[:3].round(1), y[:3])` },
    { t: "h", text: "The workflow" },
    { t: "static", code: c`1. Data        make_data()
2. Explore     averages of passed vs failed students
3. Prepare     train/test split (+ scaling for k-NN)
4. Train       several models
5. Evaluate    accuracy vs baseline, confusion matrix
6. Use         predict for a new student, explain the limits` },
    { t: "ar", html: "لاحظ{{g:|ي}} أننا نستخدم بيانات مصطنعة وليست بيانات طلاب حقيقيين. حماية خصوصية البيانات جزء أساسي من عمل مهندس الذكاء الاصطناعي." },
    { t: "steps", title: "The whole workflow once", problem: "<p>Before the milestones, run the six steps once with a simple model (a decision tree of depth 3) and a different split, so you see the full path from data to prediction.</p>", steps: [
      { html: "<p><b>Data and explore.</b> How many students pass? Do passing students study more?</p>", code: c`X, y = make_data()
print("pass rate:", y.mean().round(2))
print(X[y == 1, 0].mean().round(1), X[y == 0, 0].mean().round(1))` },
      { html: "<p><b>Prepare.</b> Keep 25% as a secret test set. A tree compares one feature at a time, so it needs no scaling.</p>", code: c`X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=1)` },
      { html: "<p><b>Baseline.</b> Find the most common label in the <b>training</b> set and see how often it is right on the test set.</p>", code: c`majority = 1 if y_tr.mean() > 0.5 else 0
baseline = (y_te == majority).mean()` },
      { html: "<p><b>Train and evaluate.</b> Compare train and test scores (overfitting?) and the test score with the baseline. The confusion matrix shows which mistakes it makes.</p>", code: c`model = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr)
print(model.score(X_tr, y_tr), model.score(X_te, y_te))
print(confusion_matrix(y_te, model.predict(X_te)))` },
      { html: "<p><b>Use.</b> Predict for a new student with 10 hours, 90% attendance and 8 assignments.</p>", code: c`print(model.predict([[10, 90, 8]]))` },
    ], code: c`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

X, y = make_data()
print("pass rate:", y.mean().round(2))
print("avg hours  passed:", X[y == 1, 0].mean().round(1), " failed:", X[y == 0, 0].mean().round(1))

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=1)
majority = 1 if y_tr.mean() > 0.5 else 0
print("baseline:", round(float((y_te == majority).mean()), 3))

model = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr)
print("train:", round(model.score(X_tr, y_tr), 3), " test:", round(model.score(X_te, y_te), 3))
print(confusion_matrix(y_te, model.predict(X_te)))
print("new student:", model.predict([[10, 90, 8]]))`, ar: "المسار كامل: بيانات ← استكشاف ← تقسيم ← خط الأساس ← تدريب وتقييم ← استخدام. النموذج يجب أن يتفوق على خط الأساس، وإلا لم يتعلم شيئًا مفيدًا." },
  ],
  practice: [
    { t: "predict", code: c`import numpy as np
y = np.array([1, 1, 0, 1, 1, 1, 0, 1])
print(round(max(y.mean(), 1 - y.mean()), 2))`, explain: "75% are 1s, so always guessing the majority class already gives <code>0.75</code>. Your model must beat this baseline." },
    { t: "parsons", title: "Scaled k-NN", prompt: "Build a pipeline that scales features, then applies k-NN, and evaluate it on the test set.", lines: ["from sklearn.pipeline import make_pipeline", "from sklearn.preprocessing import StandardScaler", "from sklearn.neighbors import KNeighborsClassifier", "model = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5))", "model.fit(X_train, y_train)", "print(model.score(X_test, y_test))"], explain: "The scaler learns means and spreads from the training set only, then k-NN uses fair distances." },
    { t: "predict", code: c`import numpy as np
X = np.array([[2, 60], [9, 90], [4, 70], [8, 85]])
y = np.array([0, 1, 0, 1])
print(X[y == 1].mean(axis=0))
print(X[y == 0, 0].mean())`, explain: "<code>X[y == 1]</code> keeps the rows of passed students: [9, 90] and [8, 85]. <code>mean(axis=0)</code> averages each column: <code>[ 8.5 87.5]</code>. <code>X[y == 0, 0]</code> is the hours column of failed students (2 and 4): <code>3.0</code>. This is exactly Milestone 1." },
    { t: "predict", code: c`from sklearn.metrics import confusion_matrix
actual    = [1, 1, 1, 0, 0, 0, 0, 0]
predicted = [1, 0, 1, 0, 0, 1, 0, 0]
cm = confusion_matrix(actual, predicted)
print(cm)
print("false negatives:", cm[1][0])`, explain: "Row 0 = really failed (5 students): 4 predicted fail, 1 predicted pass. Row 1 = really passed (3 students): 1 predicted fail, 2 predicted pass. So <code>[[4 1] [1 2]]</code> and <b>1</b> false negative (passed, but predicted fail)." },
    { t: "try", title: "What-if advisor", html: "<p>Change the new student's numbers. How many study hours does a student with 70% attendance and 6 assignments need before the model says \"pass\"? Then try a student who submits all 10 assignments.</p>", code: c`import numpy as np
from sklearn.linear_model import LogisticRegression

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

X, y = make_data()
model = LogisticRegression(max_iter=1000).fit(X, y)
for hours in [4, 8, 12]:
    p = model.predict_proba([[hours, 70, 6]])[0][1]
    print(hours, "hours ->", round(p * 100), "% pass chance")` },
  ],
  exercises: [
    { id: "explore", lvl: "seed", title: "Milestone 1: Explore", prompt: "<p>Using <code>make_data()</code> (in the starter), write <code>explore()</code> returning a dict with the average of each feature for passed and failed students, rounded to 1 decimal:</p><pre class=\"code-static\">{'passed': [hours, attendance, assignments], 'failed': [...]}</pre>", starter: c`import numpy as np

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

def explore():
    pass
`, tests: [{ after: "print(explore())", expected: "{'passed': [10.8, 80.0, 7.2], 'failed': [6.5, 67.6, 4.3]}" }],
      solutions: [{ name: "Masks + axis", code: c`import numpy as np

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

def explore():
    X, y = make_data()
    return {
        "passed": X[y == 1].mean(axis=0).round(1).tolist(),
        "failed": X[y == 0].mean(axis=0).round(1).tolist(),
    }`, note: "Passing students study more, attend more and submit more — the data confirms the story before we model it." }] },
    { id: "compare", lvl: "star", title: "Milestone 2: Compare models", prompt: "<p>Write <code>compare()</code>: split with <code>test_size=0.25, random_state=0</code>, then return a dict with the test accuracy (3 decimals) of: <code>\"baseline\"</code> (always predict the majority class of the <b>training</b> labels), <code>\"knn\"</code> (StandardScaler + KNeighborsClassifier(5) pipeline), <code>\"tree\"</code> (DecisionTreeClassifier(max_depth=4, random_state=0)) and <code>\"logreg\"</code> (LogisticRegression(max_iter=1000)).</p>", starter: c`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

def compare():
    pass
`, tests: [{ after: "print(compare())", expected: "{'baseline': 0.773, 'knn': 0.933, 'tree': 0.867, 'logreg': 0.933}" }],
      solutions: [{ name: "Dict of models", code: c`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

def compare():
    X, y = make_data()
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
    majority = int(round(y_tr.mean()))
    results = {"baseline": round(float((y_te == majority).mean()), 3)}
    models = {
        "knn": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
        "tree": DecisionTreeClassifier(max_depth=4, random_state=0),
        "logreg": LogisticRegression(max_iter=1000),
    }
    for name, m in models.items():
        results[name] = round(m.fit(X_tr, y_tr).score(X_te, y_te), 3)
    return results`, note: "Logistic regression and scaled k-NN tie at 0.933, far above the 0.773 baseline (most students in this data fail, so always guessing \"fail\" is already 77% right!). Logistic regression is a natural fit because the hidden rule is a weighted sum of features — choosing a model that matches the shape of the problem is real ML skill." }] },
    { id: "cm", lvl: "star", title: "Milestone 3: Where does it fail?", prompt: "<p>Write <code>errors()</code>: train <code>LogisticRegression(max_iter=1000)</code> on the same split and return <code>(confusion_matrix as a list of lists, false_negatives)</code> where false negatives = students who actually passed but were predicted to fail.</p>", starter: c`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

def errors():
    pass
`, tests: [{ after: "print(errors())", expected: "([[56, 2], [3, 14]], 3)" }],
      solutions: [{ name: "confusion_matrix", code: c`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

def errors():
    X, y = make_data()
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
    pred = LogisticRegression(max_iter=1000).fit(X_tr, y_tr).predict(X_te)
    cm = confusion_matrix(y_te, pred)
    return cm.tolist(), int(cm[1][0])`, note: "Row 1 = actually passed, column 0 = predicted fail. Which mistake is worse here: telling a strong student they'll fail, or missing a struggling student who needs help? The answer decides how you tune the model." }] },
    { id: "advisor", lvl: "fire", title: "Milestone 4: Study advisor", prompt: "<p>Write <code>advise(hours, attendance, assignments)</code>: train LogisticRegression on <b>all</b> the data, get the pass probability with <code>predict_proba</code>, and return a string: <code>\"Pass chance: 87% - on track\"</code> if ≥ 70%, <code>\"... - at risk\"</code> if ≥ 40%, else <code>\"... - needs support\"</code>. Round the percentage to a whole number.</p>", starter: c`import numpy as np
from sklearn.linear_model import LogisticRegression

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

def advise(hours, attendance, assignments):
    pass
`, tests: [{ after: "print(advise(12, 95, 10))\nprint(advise(9, 80, 7))\nprint(advise(1, 45, 2))", expected: "Pass chance: 99% - on track\nPass chance: 56% - at risk\nPass chance: 0% - needs support" }],
      solutions: [{ name: "predict_proba", code: c`import numpy as np
from sklearn.linear_model import LogisticRegression

def make_data(n=300, seed=7):
    rng = np.random.default_rng(seed)
    hours = rng.uniform(0, 15, n)
    attendance = rng.uniform(40, 100, n)
    assignments = rng.integers(0, 11, n)
    score = 3 * hours + 0.6 * attendance + 4 * assignments + rng.normal(0, 10, n)
    passed = (score > 100).astype(int)
    return np.column_stack([hours, attendance, assignments]), passed

X, y = make_data()
MODEL = LogisticRegression(max_iter=1000).fit(X, y)

def advise(hours, attendance, assignments):
    p = MODEL.predict_proba([[hours, attendance, assignments]])[0][1]
    pct = round(p * 100)
    if p >= 0.7:
        status = "on track"
    elif p >= 0.4:
        status = "at risk"
    else:
        status = "needs support"
    return f"Pass chance: {pct}% - {status}"`, note: "Training once at module level (not inside the function) is how real apps work: train once, predict many times. Notice the wording: \"needs support\", not \"will fail\". A prediction should open a door to help, not close one." }],
      twist: "Ethics question for your notes: should a university use such a model to decide who gets admitted? What could go wrong? Who should have the final word?" },
    { id: "hunt4", lvl: "fire", debug: true, title: "Week 4 bug hunt", prompt: "<p>Three bugs from three different days. The test should print <code>2 [0.  0.5 1. ]</code> and <code>0.75</code>.</p>", starter: c`import numpy as np
from sklearn.neighbors import KNeighborsClassifier

def find(sorted_items, t):
    lo, hi = 0, len(sorted_items)
    while lo <= hi:
        mid = (lo + hi) // 2
        if sorted_items[mid] == t:
            return mid
        if sorted_items[mid] < t:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

def scale(v):
    a = np.array(v, dtype=float)
    return (a - a.min()) / a.max()

def honest_score(X_tr, y_tr, X_te, y_te):
    m = KNeighborsClassifier(n_neighbors=1).fit(X_tr, y_tr)
    return m.score(X_tr, y_tr)`, tests: [{ after: "print(find([1, 3, 5, 7], 5), scale([2, 4, 6]))\nprint(honest_score([[0], [1], [5], [6]], [0, 0, 1, 1], [[0.2], [5.5], [2.9], [6]], [0, 1, 1, 1]))", expected: "2 [0.  0.5 1. ]\n0.75" }],
      solutions: [{ name: "Fixed", code: c`import numpy as np
from sklearn.neighbors import KNeighborsClassifier

def find(sorted_items, t):
    lo, hi = 0, len(sorted_items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if sorted_items[mid] == t:
            return mid
        if sorted_items[mid] < t:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

def scale(v):
    a = np.array(v, dtype=float)
    return (a - a.min()) / (a.max() - a.min())

def honest_score(X_tr, y_tr, X_te, y_te):
    m = KNeighborsClassifier(n_neighbors=1).fit(X_tr, y_tr)
    return m.score(X_te, y_te)`, note: "Bugs: <code>hi</code> should start at <code>len - 1</code> (it can crash when the target is bigger than everything), the scaling denominator is <code>max - min</code>, and the score must use the test set. Also note that <code>find</code> only works on sorted input — always document such assumptions." }] },
  ],
  quiz: [
    { q: "The first step of an ML project is…", o: ["choosing the fanciest model", "understanding and exploring the data", "tuning k", "deploying"], a: 1, e: "Data first." },
    { q: "Why compare with a baseline?", o: ["It's the best model", "To know if the model learned anything useful", "To save time", "It's required by sklearn"], a: 1, e: "80% accuracy is meaningless if the baseline is 80%." },
    { q: "Why scale features for k-NN but not for decision trees?", o: ["Trees are slower", "k-NN uses distances; trees compare one feature at a time", "Trees can't use numbers", "No reason"], a: 1, e: "Distances mix features." },
    { q: "`predict_proba` returns…", o: ["the class name", "probabilities for each class", "the accuracy", "the features"], a: 1, e: "Useful for risk levels." },
    { q: "A good practice for predictions about people is…", o: ["hide how the model works", "use them to support humans, test for bias", "use real personal data without consent", "trust them fully"], a: 1, e: "Responsible AI." },
  ],
  puzzle: { title: "Precision puzzle", q: "<p>A model flagged 20 students as \"at risk\". 15 of them really were at risk. In total 25 students were really at risk. What percent of the really-at-risk students did the model find (this is called <b>recall</b>)?</p>", answers: ["60", "60%"], hint: "Found 15 out of how many real cases?", ar: "كم طالبًا اكتشف النموذج من أصل الطلاب المعرضين للخطر فعلًا؟", e: "15 / 25 = <b>60%</b> recall. (Its <i>precision</i> is 15 / 20 = 75%.) For a support program, recall matters most: we don't want to miss students who need help." },
  cards: [
    { f: "The ML workflow", b: "Data → explore → prepare → train → evaluate (vs baseline) → use responsibly." },
    { f: "False negative", b: "Actually positive, predicted negative (e.g. passed but predicted fail)." },
    { f: "Precision vs recall", b: "Precision: of those flagged, how many were right. Recall: of the real cases, how many were found." },
    { f: "Why synthetic data here?", b: "To practice without exposing real people's private information." },
  ],
  remember: [
    "Binary search halves a **sorted** list each step: O(log n). Linear search is O(n); `sorted()` is O(n log n).",
    "numpy works on whole arrays: `a * 2`, masks like `a[a > 80]`, columns `X[:, 0]`, `mean(axis=0)` per column.",
    "Machine learning = examples: features `X` (2D) and labels `y`. Classification → categories, regression → numbers.",
    "Always split: `fit` on the training set, `score` on the test set, and compare with the **baseline**.",
    "Train score much higher than test score = overfitting. Scale features for k-NN (distances), not for trees.",
    "Text → numbers first: `CountVectorizer` / `TfidfVectorizer`; `fit_transform` for training, `transform` for new text.",
    "The confusion matrix shows **which** mistakes the model makes; decide which mistake is worse for real people.",
    "Use predictions about people to support them, test for bias, and protect privacy (synthetic or consented data).",
  ],
  rememberAr: "خلاصة الأسبوع: البحث الثنائي سريع على البيانات المرتبة، numpy يحسب بدون حلقات، والنموذج يتدرب بـ fit ويُقيّم على بيانات الاختبار مقارنة بخط الأساس. والتنبؤ عن الناس يجب أن يساعدهم لا أن يحكم عليهم.",
};
})();

window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[27] = {
  title: "Review + mini AI project: Student Success Predictor",
  intro: "Time to run a complete machine-learning project, the way data scientists do: get the data, explore it, prepare it, train several models, evaluate them honestly, and use the best one — and think about whether it should be used at all. The topic: predicting whether a student will pass a course.",
  introAr: "مشروع ذكاء اصطناعي كامل على مراحل: البيانات، ثم الاستكشاف، ثم التجهيز، ثم التدريب والمقارنة، ثم التقييم والتنبؤ. وفي النهاية نفكر: هل من العدل استخدام هذا النموذج لاتخاذ قرارات عن الطلاب؟",
  goals: ["Follow the full ML workflow end to end", "Explore data with numpy before modeling", "Compare models and pick one with evidence", "Interpret a confusion matrix", "Think about the ethics of prediction"],
  learn: [
    { t: "h", text: "The dataset" },
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
    { t: "h", text: "Week 4 in one table" },
    { t: "table", head: ["Day", "Idea", "Remember"], rows: [["22", "algorithms", "binary search O(log n), sorting O(n log n), Big-O"], ["23", "numpy", "vectorized math, `a[:, c]`, masks, `axis`"], ["24", "ML ideas", "features/labels, train/test, k-NN, overfitting, baseline"], ["25", "scikit-learn", "`fit` / `predict` / `score`, trees, regression"], ["26", "text AI", "bag of words, Naive Bayes, intents, cosine similarity"]] },
  ],
  practice: [
    { t: "predict", code: c`import numpy as np
y = np.array([1, 1, 0, 1, 1, 1, 0, 1])
print(round(max(y.mean(), 1 - y.mean()), 2))`, explain: "75% are 1s, so always guessing the majority class already gives <code>0.75</code>. Your model must beat this baseline." },
    { t: "parsons", title: "Scaled k-NN", prompt: "Build a pipeline that scales features, then applies k-NN, and evaluate it on the test set.", lines: ["from sklearn.pipeline import make_pipeline", "from sklearn.preprocessing import StandardScaler", "from sklearn.neighbors import KNeighborsClassifier", "model = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5))", "model.fit(X_train, y_train)", "print(model.score(X_test, y_test))"], explain: "The scaler learns means and spreads from the training set only, then k-NN uses fair distances." },
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
};
})();

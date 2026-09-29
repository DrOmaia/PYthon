window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[25] = {
  title: "Your first model with scikit-learn",
  intro: "Yesterday you built k-NN by hand. Today you use <b>scikit-learn</b>, the most popular machine-learning library in the world — used in universities, banks and startups. The amazing part: every model follows the same three steps, <code>fit</code>, <code>predict</code>, <code>score</code>. Learn it once, use dozens of algorithms.",
  introAr: "اليوم نستخدم مكتبة scikit-learn الشهيرة. كل النماذج فيها تعمل بنفس الخطوات: fit للتدريب، و predict للتنبؤ، و score للتقييم. نبدأ بمجموعة بيانات زهور الأيرس الشهيرة. (أول تشغيل يأخذ حوالي 10 ثوانٍ لتحميل المكتبة.)",
  goals: ["Load a built-in dataset and inspect X and y", "Split data with `train_test_split`", "Train k-NN and decision tree classifiers", "Evaluate with accuracy and a confusion matrix", "Train a regression model and predict a number"],
  learn: [
    { t: "h", text: "The Iris dataset" },
    { t: "code", code: c`from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target
print(X.shape, y.shape)
print(iris.feature_names)
print(iris.target_names)
print(X[0], "->", iris.target_names[y[0]])`, before: "<p>150 flowers, 4 measurements each (in cm), 3 species. A classic first dataset — small, clean and real (measured in 1935!). The first run loads scikit-learn, give it a few seconds.</p>" },
    { t: "h", text: "fit, predict, score" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)            # 1. learn
predictions = model.predict(X_test)     # 2. predict
print(predictions[:10])
print(y_test[:10])
print("accuracy:", model.score(X_test, y_test))   # 3. evaluate` },
    { t: "ar", html: "ثلاث خطوات فقط: fit يدرب النموذج على بيانات التدريب، و predict يتنبأ ببيانات جديدة، و score يحسب الدقة على بيانات الاختبار. و random_state يجعل التقسيم ثابتًا في كل تشغيل." },
    { t: "h", text: "A decision tree: a model you can read" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.25, random_state=42)
tree = DecisionTreeClassifier(max_depth=2, random_state=0)
tree.fit(X_train, y_train)
print("accuracy:", tree.score(X_test, y_test))
print(export_text(tree, feature_names=list(iris.feature_names)))`, note: "<p>The tree learned <b>if/else rules</b> — like the ones you wrote on Day 5, but found automatically from data! Trees are popular because humans can check their reasoning.</p>" },
    { t: "h", text: "Where does it go wrong? The confusion matrix" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
pred = DecisionTreeClassifier(max_depth=1, random_state=0).fit(X_train, y_train).predict(X_test)
print(confusion_matrix(y_test, pred))`, note: "<p>Rows are the true class, columns the predicted class. The diagonal is correct predictions; anything off the diagonal is a mistake — here a too-simple tree (depth 1) can't separate all three species.</p>" },
    { t: "h", text: "Regression: predicting a number" },
    { t: "code", code: c`import numpy as np
from sklearn.linear_model import LinearRegression

hours = np.array([[1], [2], [3], [4], [5], [6]])
marks = np.array([52, 58, 65, 70, 78, 83])
reg = LinearRegression().fit(hours, marks)
print("slope:", reg.coef_[0].round(2), "intercept:", reg.intercept_.round(2))
print("8 hours ->", reg.predict([[8]]).round(1))` },
    { t: "p", html: "<p>Linear regression finds the best straight line <code>mark = slope × hours + intercept</code>. Notice <code>X</code> is always 2D (rows × features), even with one feature — that's why we write <code>[[1], [2], ...]</code>.</p>" },
  ],
  mistakes: [
    { title: "X must be 2D", html: "", wrong: c`model.fit([1, 2, 3], [5, 7, 9])`, right: c`model.fit([[1], [2], [3]], [5, 7, 9])`, ar: "X يجب أن يكون جدولًا (صفوف × خصائص) حتى لو كانت خاصية واحدة." },
    { title: "Predicting before fitting", html: "<code>NotFittedError</code>: call <code>fit</code> first." , wrong: c`model = KNeighborsClassifier()
model.predict(X_test)`, right: c`model = KNeighborsClassifier()
model.fit(X_train, y_train)
model.predict(X_test)` },
    { title: "Different results every run", html: "Without <code>random_state</code> the split is random, so accuracy changes each run. Fix it for reproducible experiments.", wrong: c`train_test_split(X, y, test_size=0.2)`, right: c`train_test_split(X, y, test_size=0.2, random_state=42)` },
  ],
  tricks: [
    { title: "Try many models in a loop", html: "Same interface → easy comparison.", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
X, y = load_iris(return_X_y=True)
for m in [KNeighborsClassifier(), DecisionTreeClassifier(random_state=0), LogisticRegression(max_iter=500)]:
    print(type(m).__name__, cross_val_score(m, X, y, cv=5).mean().round(3))` },
    { title: "Pipelines keep scaling honest", html: "<code>make_pipeline(StandardScaler(), KNeighborsClassifier())</code> scales features using only training data — preventing information from the test set leaking into training." },
  ],
  practice: [
    { t: "predict", code: c`from sklearn.linear_model import LinearRegression
m = LinearRegression().fit([[0], [1], [2]], [1, 3, 5])
print(round(m.predict([[10]])[0], 1))`, explain: "The data is exactly y = 2x + 1, so x = 10 → <code>21.0</code>." },
    { t: "parsons", title: "The ML recipe", prompt: "Arrange the standard scikit-learn workflow.", lines: ["from sklearn.datasets import load_iris", "from sklearn.model_selection import train_test_split", "from sklearn.tree import DecisionTreeClassifier", "X, y = load_iris(return_X_y=True)", "X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)", "model = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)", "print(model.score(X_te, y_te))"], distractors: ["print(model.score(X_tr, y_tr))"], explain: "Score on the <b>test</b> set, never the training set." },
    { t: "try", title: "Tune k", html: "<p>Loop over k = 1, 3, 5, …, 25 and print the test accuracy of each. Which k works best? Is the biggest k the best?</p>", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=7)
for k in range(1, 26, 4):
    acc = KNeighborsClassifier(n_neighbors=k).fit(X_tr, y_tr).score(X_te, y_te)
    print(k, round(acc, 3))` },
  ],
  exercises: [
    { id: "explore", lvl: "seed", title: "Explore the data", prompt: "<p>Write <code>describe()</code> that loads Iris and returns a tuple: (number of samples, number of features, number of classes, the mean petal length rounded to 2 decimals). Petal length is column 2.</p>", starter: "from sklearn.datasets import load_iris\n\ndef describe():\n    pass\n", tests: [{ after: "print(describe())", expected: "(150, 4, 3, 3.76)" }],
      solutions: [{ name: "numpy on X", code: c`from sklearn.datasets import load_iris

def describe():
    X, y = load_iris(return_X_y=True)
    return X.shape[0], X.shape[1], len(set(y)), round(float(X[:, 2].mean()), 2)` }] },
    { id: "knn", lvl: "seed", title: "Train and score k-NN", prompt: "<p>Write <code>knn_accuracy(k)</code>: split Iris with <code>test_size=0.3, random_state=0</code>, train <code>KNeighborsClassifier(n_neighbors=k)</code>, return the test accuracy rounded to 3 decimals.</p>", starter: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\n\ndef knn_accuracy(k):\n    pass\n", tests: [{ after: "print(knn_accuracy(1), knn_accuracy(5))", expected: "0.978 0.978" }],
      solutions: [{ name: "fit/score", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

def knn_accuracy(k):
    X, y = load_iris(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
    model = KNeighborsClassifier(n_neighbors=k).fit(X_tr, y_tr)
    return round(model.score(X_te, y_te), 3)` }] },
    { id: "classify", lvl: "star", title: "Name that flower", prompt: "<p>Write <code>species(measurements)</code> that trains a <code>DecisionTreeClassifier(random_state=0)</code> on <b>all</b> of Iris and returns the predicted species <b>name</b> (e.g. <code>\"setosa\"</code>) for a list of 4 measurements.</p>", starter: "from sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier\n\ndef species(measurements):\n    pass\n", tests: [{ after: "print(species([5.1, 3.5, 1.4, 0.2]), species([6.7, 3.0, 5.2, 2.3]), species([5.9, 2.8, 4.3, 1.3]))", expected: "setosa virginica versicolor" }],
      solutions: [{ name: "Tree + target_names", code: c`from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

def species(measurements):
    iris = load_iris()
    model = DecisionTreeClassifier(random_state=0).fit(iris.data, iris.target)
    label = model.predict([measurements])[0]
    return iris.target_names[label]`, note: "<code>predict</code> expects a 2D input — a list containing one sample. In a real app you would train once, not on every call." }] },
    { id: "compare", lvl: "star", title: "Model competition", prompt: "<p>Write <code>best_model()</code>: using 5-fold <code>cross_val_score</code> on Iris, compare <code>KNeighborsClassifier(n_neighbors=5)</code>, <code>DecisionTreeClassifier(random_state=0)</code> and <code>LogisticRegression(max_iter=1000)</code>. Return a dict name → mean score rounded to 3 decimals, using the class names as keys.</p>", starter: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.linear_model import LogisticRegression\n\ndef best_model():\n    pass\n", tests: [{ after: "print(best_model())", expected: "{'KNeighborsClassifier': 0.973, 'DecisionTreeClassifier': 0.96, 'LogisticRegression': 0.973}" }],
      solutions: [{ name: "Loop", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression

def best_model():
    X, y = load_iris(return_X_y=True)
    models = [KNeighborsClassifier(n_neighbors=5), DecisionTreeClassifier(random_state=0), LogisticRegression(max_iter=1000)]
    return {type(m).__name__: round(cross_val_score(m, X, y, cv=5).mean(), 3) for m in models}`, note: "Cross-validation trains and tests 5 times on different splits — a fairer comparison than a single split." }] },
    { id: "reg", lvl: "fire", title: "Predict exam marks", prompt: "<p>Data: hours studied and marks for 8 students (in the starter). Write <code>predict_mark(hours)</code> that fits a <code>LinearRegression</code> and returns the predicted mark rounded to 1 decimal, capped at 100.</p>", starter: "from sklearn.linear_model import LinearRegression\n\nHOURS = [1, 2, 3, 4, 5, 6, 7, 8]\nMARKS = [50, 55, 61, 64, 70, 76, 79, 86]\n\ndef predict_mark(hours):\n    pass\n", tests: [{ after: "print(predict_mark(4.5), predict_mark(10), predict_mark(20))", expected: "67.6 95.3 100" }],
      solutions: [{ name: "Fit + cap", code: c`from sklearn.linear_model import LinearRegression

HOURS = [1, 2, 3, 4, 5, 6, 7, 8]
MARKS = [50, 55, 61, 64, 70, 76, 79, 86]

def predict_mark(hours):
    X = [[h] for h in HOURS]
    model = LinearRegression().fit(X, MARKS)
    pred = model.predict([[hours]])[0]
    return round(min(float(pred), 100), 1)`, note: "Models don't know the real world: a line keeps going past 100. Adding common-sense limits is part of the job." }] },
    { id: "digits", lvl: "fire", title: "Handwritten digits", prompt: "<p>scikit-learn includes 1,797 tiny 8×8 images of handwritten digits. Write <code>digits_accuracy()</code>: split with <code>test_size=0.25, random_state=0</code>, train <code>KNeighborsClassifier(n_neighbors=3)</code> and return the test accuracy rounded to 3 decimals. Real computer vision!</p>", starter: "from sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\n\ndef digits_accuracy():\n    pass\n", tests: [{ after: "print(digits_accuracy())", expected: "0.987" }],
      solutions: [{ name: "k-NN on pixels", code: c`from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

def digits_accuracy():
    X, y = load_digits(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
    return round(KNeighborsClassifier(n_neighbors=3).fit(X_tr, y_tr).score(X_te, y_te), 3)`, note: "Each image is 64 numbers (pixel brightness). k-NN compares pixel distances — the same distance idea from Day 23!" }],
      twist: "In the Playground, print one digit image as text: <code>print(load_digits().images[0])</code>. Can you see the 0?" },
    { id: "fix25", lvl: "fire", debug: true, title: "Broken pipeline", prompt: "<p>Fix the three bugs so <code>run()</code> returns the honest <b>test</b> accuracy.</p>", starter: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

def run():
    X, y = load_iris(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=3)
    model = DecisionTreeClassifier(random_state=0)
    model.predict(X_te)
    model.fit(X_tr, y_te)
    return model.score(X_tr, y_tr)`, tests: [{ after: "print(round(run(), 3))", expected: "0.974" }],
      solutions: [{ name: "Fixed", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

def run():
    X, y = load_iris(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=3)
    model = DecisionTreeClassifier(random_state=0)
    model.fit(X_tr, y_tr)
    return model.score(X_te, y_te)`, note: "Predict before fit, training labels mixed with test labels, and scoring on training data (which gives a suspicious 1.0)." }] },
  ],
  quiz: [
    { q: "The three core methods of a scikit-learn model are…", o: ["load, run, save", "fit, predict, score", "train, test, split", "open, read, close"], a: 1, e: "Same for every model." },
    { q: "`X.shape` is `(150, 4)`. What is 4?", o: ["classes", "samples", "features", "tests"], a: 2, e: "Rows = samples, columns = features." },
    { q: "What does `random_state=42` do?", o: ["Improves accuracy", "Makes the random split repeatable", "Uses 42 samples", "Sets k"], a: 1, e: "Reproducibility." },
    { q: "The diagonal of a confusion matrix shows…", o: ["errors", "correct predictions", "features", "probabilities"], a: 1, e: "True class = predicted class." },
    { q: "Predicting a house price calls for…", o: ["KNeighborsClassifier", "LinearRegression", "confusion_matrix", "load_iris"], a: 1, e: "A number → regression." },
  ],
  puzzle: { title: "Read the tree", q: "<p>A decision tree learned: <i>if petal length ≤ 2.45 → setosa; else if petal width ≤ 1.75 → versicolor; else → virginica</i>. A flower has petal length 4.8 and petal width 1.9. Which species?</p>", answers: ["virginica"], hint: "Follow the rules from the top.", ar: "اتبع{{g:|ي}} القواعد من الأعلى: الشرط الأول ثم الثاني.", e: "4.8 > 2.45, so skip setosa; 1.9 > 1.75, so <b>virginica</b>. You just did what <code>predict</code> does." },
  cards: [
    { f: "scikit-learn workflow", b: "split → `fit` on train → `predict` → `score` on test." },
    { f: "Shape of X", b: "2D: (samples, features). One feature → `[[1], [2], ...]`." },
    { f: "Confusion matrix", b: "Rows = true class, columns = predicted. Diagonal = correct." },
    { f: "Cross-validation", b: "Train/test several times on different splits; average the scores." },
    { f: "Linear regression", b: "Fits a straight line y = slope·x + intercept to predict numbers." },
  ],
};
})();

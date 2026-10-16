window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[25] = {
  title: "Your first model with scikit-learn",
  intro: "Yesterday you built k-NN by hand. Today you use <b>scikit-learn</b>, the most popular machine-learning library in the world — used in universities, banks and startups. The amazing part: every model follows the same three steps, <code>fit</code>, <code>predict</code>, <code>score</code>. Learn it once, use dozens of algorithms.",
  introAr: "اليوم نستخدم مكتبة scikit-learn الشهيرة. كل النماذج فيها تعمل بنفس الخطوات: fit للتدريب، و predict للتنبؤ، و score للتقييم. نبدأ بمجموعة بيانات زهور الأيرس الشهيرة. (أول تشغيل يأخذ حوالي 10 ثوانٍ لتحميل المكتبة.)",
  goals: ["Describe a dataset as features `X` and labels `y`", "Split data with `train_test_split` and explain why", "Train models with `fit` and use them with `predict`", "Measure accuracy with `score` and spot overfitting", "Read a decision tree and a confusion matrix", "Train a regression model and predict a number"],
  learn: [
    { t: "h", text: "Why use a library?" },
    { t: "p", html: "<p>Yesterday your k-NN took about fifteen lines: a distance function, sorting, voting. It worked — and you now understand what happens inside. But a real project wants to try <i>many</i> models quickly, and nobody wants to rewrite each one by hand. <b>scikit-learn</b> (imported as <code>sklearn</code>) gives you dozens of tested models, all used in exactly the same way.</p>" },
    { t: "analogy", title: "Appliances with the same buttons", html: "<p>Imagine a kitchen where every appliance — kettle, oven, blender — has the same two buttons: <b>Load</b> and <b>Start</b>. Once you learn the buttons, you can use any appliance. scikit-learn is that kitchen: every model has <code>fit</code> (learn from examples) and <code>predict</code> (answer new questions), plus <code>score</code> (how good am I?).</p>" },
    { t: "ar", html: "scikit-learn مكتبة فيها نماذج جاهزة كثيرة، وكلها تُستخدم بنفس الطريقة: fit ثم predict ثم score. تتعلم{{g:|ين}} الطريقة مرة واحدة وتستخدم{{g:|ين}}ها مع أي نموذج." },

    { t: "h", text: "Features and labels: X and y" },
    { t: "p", html: "<p>Every model needs two things. <b>X</b> (capital, because it is a table) holds the <b>features</b>: the inputs we know, one row per example, one column per feature. <b>y</b> holds the <b>labels</b>: the answer for each row, the thing we want to predict. Remember Day 24: hours and attendance were features, pass/fail was the label.</p>" },
    { t: "code", code: c`# features: [hours studied per week]
X = [[1], [2], [3], [7], [8], [9]]
# labels: the answer for each row
y = ["fail", "fail", "fail", "pass", "pass", "pass"]
print(len(X), "examples,", len(X[0]), "feature")
print(X[3], "->", y[3])`, before: "<p>The smallest possible dataset: six students, one feature each. Look at the <b>double</b> brackets.</p>", note: "<p><code>X</code> is a list of rows, and each row is itself a list — even when there is only one feature. scikit-learn always expects X as a table (rows × columns). <code>y</code> is a simple flat list: one answer per row.</p>" },
    { t: "p", html: "<p>Now a real dataset. The famous <b>Iris</b> data has 150 flowers, 4 measurements each (in cm) and 3 species. It is built into scikit-learn. The first run loads the library — give it a few seconds.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target
print(X.shape, y.shape)
print(iris.feature_names)
print(iris.target_names)
print(X[0], "->", iris.target_names[y[0]])`, note: "<p><code>X</code> is a numpy array (Day 23) with shape <code>(150, 4)</code>: 150 rows (flowers), 4 columns (features). The labels are numbers 0, 1, 2, and <code>target_names</code> turns them back into species names.</p>" },
    { t: "lines", rows: [
      ["from sklearn.datasets import load_iris", "Import one function from the <code>datasets</code> part of scikit-learn."],
      ["iris = load_iris()", "Load the data. <code>iris</code> is like a dictionary with several parts."],
      ["X, y = iris.data, iris.target", "Take the two parts every model needs: the features table and the labels."],
      ["print(X.shape, y.shape)", "<code>(150, 4)</code> and <code>(150,)</code>: 150 rows of 4 features, and 150 answers."],
      ["print(X[0], \"->\", iris.target_names[y[0]])", "The first flower's 4 measurements, and its species as a name, not a number."],
    ] },
    { t: "ar", html: "X هو جدول الخصائص (المدخلات)، كل صف مثال وكل عمود خاصية. و y هو الإجابات (التصنيفات)، إجابة لكل صف." },
    { t: "check", q: "A table of houses has the columns size, rooms, district and price. You want to predict the **price**. What is `y`?", o: ["size, rooms and district", "price", "the number of houses", "district only"], a: 1, e: "The label `y` is what you want to predict: price. The other columns are the features `X`.", hint: "`y` is the answer the model must learn to give." },

    { t: "h", text: "Train/test split: keep an honest exam" },
    { t: "p", html: "<p>If you test a model on the same examples it learned from, it can look perfect just by remembering them. To know if it really learned, we hide some examples during training and use them only at the end. <code>train_test_split</code> shuffles the rows and cuts them into a <b>training set</b> and a <b>test set</b>.</p>" },
    { t: "analogy", title: "Practice questions vs the final exam", html: "<p>A teacher gives you practice questions with answers (the training set) but keeps the final exam questions secret (the test set). If the exam used the same questions, a student who memorized answers would get 100% without understanding anything. A secret exam shows who really learned.</p>" },
    { t: "code", code: c`from sklearn.model_selection import train_test_split
X = [[10], [20], [30], [40], [50], [60], [70], [80], [90], [100]]
y = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
print(len(X_train), len(X_test))
print(X_test, y_test)`, note: "<p>30% of 10 rows = 3 rows go to the test set; 7 stay for training. The rows were shuffled first, so the test set is a fair mix, not just the last three.</p>" },
    { t: "lines", rows: [
      ["X_train, X_test, y_train, y_test = ...", "The function returns <b>four</b> things, always in this order: train features, test features, train labels, test labels."],
      ["test_size=0.3", "Put 30% of the rows in the test set. 0.2 or 0.25 are also common."],
      ["random_state=0", "The shuffle is random. Fixing <code>random_state</code> gives the same split every run, so your results can be repeated and compared."],
    ] },
    { t: "ar", html: "نقسم البيانات: جزء للتدريب وجزء للاختبار لا يراه النموذج أبدًا أثناء التدريب. و random_state يجعل التقسيم نفسه في كل تشغيل." },
    { t: "check", q: "You have 200 rows and call `train_test_split(X, y, test_size=0.25, random_state=1)`. How many rows go to the **test** set?", o: ["25", "50", "150", "175"], a: 1, e: "25% of 200 = 50 test rows; the other 150 are for training.", hint: "test_size is a fraction of all the rows." },

    { t: "h", text: "fit and predict" },
    { t: "p", html: "<p>Every model is used in two moves. <code>fit(X_train, y_train)</code> means <i>learn from these examples and their answers</i>. <code>predict(X_new)</code> means <i>give me your answers for these new rows</i>. Before <code>fit</code>, a model knows nothing.</p>" },
    { t: "code", code: c`from sklearn.neighbors import KNeighborsClassifier
X = [[1], [2], [3], [7], [8], [9]]
y = ["fail", "fail", "fail", "pass", "pass", "pass"]
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)
print(model.predict([[2.5], [6.5], [10]]))`, before: "<p>This is yesterday's k-NN — now in three lines.</p>", note: "<p>For 2.5 hours the 3 nearest students all failed; for 6.5 and 10 hours the 3 nearest all passed. Same idea as your hand-made version, done for you.</p>" },
    { t: "lines", rows: [
      ["model = KNeighborsClassifier(n_neighbors=3)", "Create an <b>empty</b> model and choose its settings (k = 3). Nothing is learned yet."],
      ["model.fit(X, y)", "Training: the model stores and learns from the examples and their labels."],
      ["model.predict([[2.5], [6.5], [10]])", "Ask about 3 new students. The input is a table again (a list of rows), and you get one answer per row."],
    ] },
    { t: "ar", html: "fit = التدريب على أمثلة لها إجابات. predict = التنبؤ لأمثلة جديدة. ولازم fit يكون قبل predict." },
    { t: "check", q: "What does this print?", code: c`model = KNeighborsClassifier(n_neighbors=3)
model.fit([[1], [2], [3], [7], [8], [9]], ["fail", "fail", "fail", "pass", "pass", "pass"])
print(model.predict([[8.5]]))`, o: ["`['fail']`", "`['pass']`", "`pass`", "An error: 8.5 is not in the data"], a: 1, e: "The 3 nearest students (8, 9 and 7) all passed. `predict` returns an array, so it prints `['pass']`. New values do not need to be in the data — that is the whole point.", hint: "Find the 3 nearest hours to 8.5. Also remember predict returns an array." },

    { t: "h", text: "Accuracy: how often is it right?" },
    { t: "p", html: "<p>A model is useful only if we know how good it is. <b>Accuracy</b> is the simplest measure: correct answers ÷ all answers. You wrote it by hand on Day 24. Watch it once more, step by step:</p>" },
    { t: "viz", code: c`predicted = ["pass", "fail", "pass", "pass", "fail"]
actual    = ["pass", "fail", "fail", "pass", "fail"]
correct = 0
for p, a in zip(predicted, actual):
    if p == a:
        correct += 1
print(correct, "of", len(actual))
print("accuracy:", correct / len(actual))` },
    { t: "p", html: "<p>scikit-learn does all of that in one call: <code>model.score(X_test, y_test)</code> predicts every test row and returns the accuracy. Now the full recipe on Iris — split, fit, predict, score:</p>" },
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
print("accuracy:", model.score(X_test, y_test))   # 3. evaluate`, note: "<p>Compare the first ten predictions with the true labels below them. A score of 1.0 means every test flower was right; 0.9 would mean 90%.</p>" },
    { t: "ar", html: "الدقة accuracy = عدد الإجابات الصحيحة ÷ عدد كل الإجابات. و score يحسبها مباشرة، ونحسبها دائمًا على بيانات الاختبار." },
    { t: "check", q: "A model predicts `[0, 1, 1, 2]` and the true labels are `[0, 1, 2, 2]`. What accuracy would `score` report?", o: ["0.5", "0.75", "1.0", "3"], a: 1, e: "3 of the 4 answers match (only the third is wrong): 3 / 4 = 0.75.", hint: "Count the positions where both lists agree." },

    { t: "h", text: "Overfitting: memorizing instead of learning" },
    { t: "p", html: "<p>A very flexible model can memorize every training example — even the noise and accidents — and then do worse on new data. This is <b>overfitting</b>. The warning sign: a <b>much higher</b> score on the training set than on the test set. Let's see it with a decision tree on 1,797 images of handwritten digits.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_digits(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
tree = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
print("train:", round(tree.score(X_tr, y_tr), 3))
print("test: ", round(tree.score(X_te, y_te), 3))`, note: "<p>A perfect 1.0 on the examples it has seen, but clearly lower (around 0.84) on new images. The tree grew a rule for every little detail of the training images. A gap like this tells you: don't trust the training score.</p>" },
    { t: "analogy", title: "The student who memorized the answers", html: "<p>A student memorizes the answers to last year's exam: question 1 is \"B\", question 2 is \"D\"… Perfect on last year's paper, lost on this year's. A student who learned the <i>ideas</i> scores a bit lower on the old paper but much better on the new one. We want models that learn the ideas.</p>" },
    { t: "ar", html: "الإفراط في التعلم (overfitting) يعني أن النموذج حفظ أمثلة التدريب بدل أن يفهمها: درجة عالية جدًا في التدريب وأقل بكثير في الاختبار." },
    { t: "check", q: "A model scores **1.0** on the training set and **0.62** on the test set. What is the most likely problem?", o: ["The test set is too big", "Overfitting: it memorized the training data", "Python made a mistake", "The model is too simple"], a: 1, e: "A big gap between training and test scores is the classic sign of overfitting. Simpler settings (for example a smaller `max_depth`) or more data usually help.", hint: "Perfect on seen data, weak on new data." },

    { t: "h", text: "A decision tree: a model you can read" },
    { t: "p", html: "<p>Some models are black boxes; a <b>decision tree</b> is not. It learns a set of if/else questions from the data. Limiting its depth with <code>max_depth</code> keeps it simple — and also fights overfitting.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.25, random_state=42)
tree = DecisionTreeClassifier(max_depth=2, random_state=0)
tree.fit(X_train, y_train)
print("accuracy:", tree.score(X_test, y_test))
print(export_text(tree, feature_names=list(iris.feature_names)))`, note: "<p>The tree learned <b>if/else rules</b> — like the ones you wrote on Day 5, but found automatically from data! Read it from the top: each <code>|---</code> line is one question about a petal measurement, and each <code>class:</code> line is an answer (0, 1 or 2). Trees are popular because humans can check their reasoning.</p>" },

    { t: "h", text: "Where does it go wrong? The confusion matrix" },
    { t: "p", html: "<p>Accuracy is one number; it hides <i>which</i> classes get mixed up. A <b>confusion matrix</b> is a table that counts every pair (true class, predicted class).</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
pred = DecisionTreeClassifier(max_depth=1, random_state=0).fit(X_train, y_train).predict(X_test)
print(confusion_matrix(y_test, pred))`, note: "<p>Rows are the true class, columns the predicted class. The diagonal (top-left to bottom-right) is correct predictions; anything off the diagonal is a mistake — here a too-simple tree (depth 1) can only ask one question, so it cannot separate all three species.</p>" },

    { t: "h", text: "Regression: predicting a number" },
    { t: "p", html: "<p>So far the answers were categories (a species, pass/fail): that is <b>classification</b>. When the answer is a number — a mark, a price in riyals, tomorrow's temperature — it is <b>regression</b>. The steps are exactly the same.</p>" },
    { t: "code", code: c`import numpy as np
from sklearn.linear_model import LinearRegression

hours = np.array([[1], [2], [3], [4], [5], [6]])
marks = np.array([52, 58, 65, 70, 78, 83])
reg = LinearRegression().fit(hours, marks)
print("slope:", reg.coef_[0].round(2), "intercept:", reg.intercept_.round(2))
print("8 hours ->", reg.predict([[8]]).round(1))` },
    { t: "p", html: "<p>Linear regression finds the best straight line <code>mark = slope × hours + intercept</code>. Here each extra hour adds about 6.3 marks. Notice <code>X</code> is again 2D (rows × features) — that's why we write <code>[[1], [2], ...]</code>.</p>" },
    { t: "check", q: "Which model fits each task? Task A: predict the price of a used car in riyals. Task B: predict if an email is spam.", o: ["A: classification, B: regression", "A: regression, B: classification", "Both regression", "Both classification"], a: 1, e: "A price is a number → regression (`LinearRegression`). Spam / not spam is a category → classification (`KNeighborsClassifier`, `DecisionTreeClassifier`…).", hint: "Number → regression. Category → classification." },
    { t: "table", head: ["Code", "What it does"], rows: [
      ["`train_test_split(X, y, test_size=0.25, random_state=0)`", "shuffle and cut into train / test (4 results)"],
      ["`model = KNeighborsClassifier(n_neighbors=3)`", "create an empty model with its settings"],
      ["`model.fit(X_train, y_train)`", "learn from the training examples"],
      ["`model.predict(X_new)`", "one answer per new row"],
      ["`model.score(X_test, y_test)`", "accuracy on the test set (R² for regression)"],
      ["`confusion_matrix(y_test, pred)`", "which classes get mixed up"],
    ] },
    { t: "steps", title: "Predict pass or fail with a decision tree", problem: "<p>You have study data for 20 students: hours per week and attendance %. Train a model, check it honestly, then predict for two new students: one with 6 hours and 80% attendance, one with 2 hours and 60%.</p>", steps: [
      { html: "<p><b>Understand.</b> Features: hours and attendance (2 columns). Label: pass/fail → a <b>classification</b> task. Real life is messy: one student passed with only 2 hours.</p>", code: c`X = [[1, 50], [2, 65], [3, 40], ...]   # 20 rows, 2 features
y = ["fail", "fail", "fail", ...]       # 20 answers` },
      { html: "<p><b>Plan.</b> Split → fit → score → predict. We pick a decision tree with <code>max_depth=2</code>: it is readable, and it does not care that attendance numbers are much bigger than hours (no scaling needed, unlike k-NN).</p>" },
      { html: "<p><b>Split.</b> Keep 25% (5 students) as the secret test.</p>", code: c`X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)` },
      { html: "<p><b>Fit and score.</b> Compare the training and test scores to check for overfitting.</p>", code: c`model = DecisionTreeClassifier(max_depth=2, random_state=0).fit(X_tr, y_tr)
print(model.score(X_tr, y_tr), model.score(X_te, y_te))` },
      { html: "<p><b>Use it.</b> Predict for the new students, and print the rules so a human can check them.</p>", code: c`print(model.predict([[6, 80], [2, 60]]))` },
    ], code: c`from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

X = [[1, 50], [2, 65], [3, 40], [4, 80], [5, 45], [6, 85], [7, 70], [8, 90], [2, 90], [9, 75],
     [3, 60], [6, 55], [10, 95], [1, 75], [7, 88], [5, 72], [4, 95], [8, 40], [6, 65], [3, 85]]
y = ["fail", "fail", "fail", "fail", "fail", "pass", "pass", "pass", "pass", "pass",
     "fail", "pass", "pass", "fail", "pass", "pass", "fail", "fail", "pass", "fail"]

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
model = DecisionTreeClassifier(max_depth=2, random_state=0).fit(X_tr, y_tr)
print("train:", model.score(X_tr, y_tr), "test:", model.score(X_te, y_te))
print("new students:", model.predict([[6, 80], [2, 60]]))
print(export_text(model, feature_names=["hours", "attendance"]))`, ar: "الخطوات دائمًا: نقسم البيانات، ندرب بـ fit، نقيّم بـ score على الاختبار، ثم نتنبأ بـ predict. الطالب الذي نجح بساعتين فقط جعل الدقة 0.8 — البيانات الحقيقية ليست مثالية." },
  ],
  mistakes: [
    { title: "X must be 2D", html: "Even with one feature, X is a table: a list of rows. A flat list gives a <code>ValueError</code> asking you to reshape.", wrong: c`model.fit([1, 2, 3], [5, 7, 9])`, right: c`model.fit([[1], [2], [3]], [5, 7, 9])`, ar: "X يجب أن يكون جدولًا (صفوف × خصائص) حتى لو كانت خاصية واحدة." },
    { title: "Predicting before fitting", html: "<code>NotFittedError</code>: an empty model knows nothing. Call <code>fit</code> first.", wrong: c`model = KNeighborsClassifier()
model.predict(X_test)`, right: c`model = KNeighborsClassifier()
model.fit(X_train, y_train)
model.predict(X_test)` },
    { title: "Different results every run", html: "Without <code>random_state</code> the split is random, so accuracy changes each run. Fix it for reproducible experiments.", wrong: c`train_test_split(X, y, test_size=0.2)`, right: c`train_test_split(X, y, test_size=0.2, random_state=42)` },
    { title: "Scoring on the training data", html: "The training score shows how well the model <i>remembers</i>, not how well it works on new data. Report the test score.", wrong: c`model.fit(X_train, y_train)
print(model.score(X_train, y_train))`, right: c`model.fit(X_train, y_train)
print(model.score(X_test, y_test))`, ar: "الدرجة على بيانات التدريب قد تكون 1.0 بسبب الحفظ. الدرجة الصادقة هي على بيانات الاختبار." },
  ],
  tricks: [
    { title: "Try many models in a loop", html: "Same interface → easy comparison. <code>cross_val_score</code> splits the data 5 different ways and averages the scores — a fairer test than one split.", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
X, y = load_iris(return_X_y=True)
for m in [KNeighborsClassifier(), DecisionTreeClassifier(random_state=0), LogisticRegression(max_iter=500)]:
    print(type(m).__name__, cross_val_score(m, X, y, cv=5).mean().round(3))` },
    { title: "How sure is the model? predict_proba", html: "Classifiers can also give the probability of each class. With k = 3, \"2 of 3 neighbours passed\" becomes 0.67.", code: c`from sklearn.neighbors import KNeighborsClassifier
X = [[1], [2], [3], [7], [8], [9]]
y = ["fail", "fail", "fail", "pass", "pass", "pass"]
model = KNeighborsClassifier(n_neighbors=3).fit(X, y)
print(model.classes_)
print(model.predict_proba([[4.2], [8]]).round(2))` },
    { title: "Pipelines keep scaling honest", html: "<code>make_pipeline(StandardScaler(), KNeighborsClassifier())</code> scales features using only training data — preventing information from the test set leaking into training. You will use it on Day 27." },
  ],
  practice: [
    { t: "predict", code: c`from sklearn.model_selection import train_test_split
X = [[i] for i in range(40)]
y = [i % 2 for i in range(40)]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=3)
print(len(X_tr), len(X_te), len(y_te))`, explain: "20% of 40 rows = 8 test rows, so 32 training rows. <code>y_te</code> has one label per test row: 8. Output: <code>32 8 8</code>." },
    { t: "predict", code: c`from sklearn.neighbors import KNeighborsClassifier
X = [[1], [2], [3], [7], [8], [9]]
y = ["fail", "fail", "fail", "pass", "pass", "pass"]
model = KNeighborsClassifier(n_neighbors=3).fit(X, y)
print(model.score([[1.5], [6.5], [8.5], [4.2]], ["fail", "pass", "pass", "pass"]))`, explain: "Predictions: 1.5 → fail ✓, 6.5 → pass ✓, 8.5 → pass ✓, 4.2 → fail ✗ (its nearest are 3, 2 and 7: two fails, one pass — but the true label says pass). 3 of 4 correct: <code>0.75</code>." },
    { t: "predict", code: c`from sklearn.linear_model import LinearRegression
m = LinearRegression().fit([[0], [1], [2]], [1, 3, 5])
print(round(m.predict([[10]])[0], 1))`, explain: "The data is exactly y = 2x + 1, so x = 10 → <code>21.0</code>." },
    { t: "parsons", title: "The ML recipe", prompt: "Arrange the standard scikit-learn workflow.", lines: ["from sklearn.datasets import load_iris", "from sklearn.model_selection import train_test_split", "from sklearn.tree import DecisionTreeClassifier", "X, y = load_iris(return_X_y=True)", "X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)", "model = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)", "print(model.score(X_te, y_te))"], distractors: ["print(model.score(X_tr, y_tr))"], explain: "Score on the <b>test</b> set, never the training set." },
    { t: "parsons", title: "Predict a price", prompt: "Coffee prices grow with cup size (in ml). Train a regression and predict the price of a 400 ml cup.", lines: ["from sklearn.linear_model import LinearRegression", "sizes = [[200], [300], [500]]", "prices = [10, 13, 19]", "model = LinearRegression()", "model.fit(sizes, prices)", "print(model.predict([[400]]))"], distractors: ["print(model.predict(400))"], explain: "Create the model, <code>fit</code> it, then <code>predict</code> — with a 2D input, so <code>predict(400)</code> is the trap. The prices follow 0.03 × size + 4, so 400 ml → 16 riyals." },
    { t: "try", title: "Tune k", html: "<p>Loop over k = 1, 5, 9, …, 25 and print the test accuracy of each. Which k works best? Is the biggest k the best?</p>", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=7)
for k in range(1, 26, 4):
    acc = KNeighborsClassifier(n_neighbors=k).fit(X_tr, y_tr).score(X_te, y_te)
    print(k, round(acc, 3))` },
    { t: "try", title: "Find the overfitting", html: "<p>For each <code>max_depth</code>, compare the training and test scores. Where does the gap start to grow? Which depth would you choose?</p>", code: c`from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
X, y = load_digits(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
for depth in [2, 4, 6, 8, 10, None]:
    t = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(X_tr, y_tr)
    print(depth, round(t.score(X_tr, y_tr), 2), round(t.score(X_te, y_te), 2))` },
  ],
  exercises: [
    { id: "explore", lvl: "seed", title: "Explore the data", prompt: "<p>Write <code>describe()</code> that loads Iris and returns a tuple: (number of samples, number of features, number of classes, the mean petal length rounded to 2 decimals). Petal length is column 2.</p>", starter: "from sklearn.datasets import load_iris\n\ndef describe():\n    pass\n", tests: [{ after: "print(describe())", expected: "(150, 4, 3, 3.76)" }],
      hint: "<code>X.shape</code> gives (rows, columns). <code>len(set(y))</code> counts the classes. <code>X[:, 2]</code> is column 2 (Day 23).",
      solutions: [{ name: "numpy on X", code: c`from sklearn.datasets import load_iris

def describe():
    X, y = load_iris(return_X_y=True)
    return X.shape[0], X.shape[1], len(set(y)), round(float(X[:, 2].mean()), 2)` }] },
    { id: "knn", lvl: "seed", title: "Train and score k-NN", prompt: "<p>Write <code>knn_accuracy(k)</code>: split Iris with <code>test_size=0.3, random_state=0</code>, train <code>KNeighborsClassifier(n_neighbors=k)</code>, return the test accuracy rounded to 3 decimals.</p>", starter: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\n\ndef knn_accuracy(k):\n    pass\n", tests: [{ after: "print(knn_accuracy(1), knn_accuracy(5))", expected: "0.978 0.978" }],
      hint: "Four steps: load, split, fit, score. Keep the order of the four results of <code>train_test_split</code>.",
      solutions: [{ name: "fit/score", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

def knn_accuracy(k):
    X, y = load_iris(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
    model = KNeighborsClassifier(n_neighbors=k).fit(X_tr, y_tr)
    return round(model.score(X_te, y_te), 3)` }] },
    { id: "classify", lvl: "star", title: "Name that flower", prompt: "<p>Write <code>species(measurements)</code> that trains a <code>DecisionTreeClassifier(random_state=0)</code> on <b>all</b> of Iris and returns the predicted species <b>name</b> (e.g. <code>\"setosa\"</code>) for a list of 4 measurements.</p>", starter: "from sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier\n\ndef species(measurements):\n    pass\n", tests: [{ after: "print(species([5.1, 3.5, 1.4, 0.2]), species([6.7, 3.0, 5.2, 2.3]), species([5.9, 2.8, 4.3, 1.3]))", expected: "setosa virginica versicolor" }],
      hint: "<code>predict</code> wants a table: <code>[measurements]</code>. Take <code>[0]</code> of the result, then use <code>iris.target_names</code>.",
      solutions: [{ name: "Tree + target_names", code: c`from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

def species(measurements):
    iris = load_iris()
    model = DecisionTreeClassifier(random_state=0).fit(iris.data, iris.target)
    label = model.predict([measurements])[0]
    return iris.target_names[label]`, note: "<code>predict</code> expects a 2D input — a list containing one sample. In a real app you would train once, not on every call." }] },
    { id: "compare", lvl: "star", title: "Model competition", prompt: "<p>Write <code>best_model()</code>: using 5-fold <code>cross_val_score</code> on Iris, compare <code>KNeighborsClassifier(n_neighbors=5)</code>, <code>DecisionTreeClassifier(random_state=0)</code> and <code>LogisticRegression(max_iter=1000)</code>. Return a dict name → mean score rounded to 3 decimals, using the class names as keys.</p>", starter: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.linear_model import LogisticRegression\n\ndef best_model():\n    pass\n", tests: [{ after: "print(best_model())", expected: "{'KNeighborsClassifier': 0.973, 'DecisionTreeClassifier': 0.96, 'LogisticRegression': 0.973}" }],
      hint: "<code>type(m).__name__</code> gives the class name. See the first trick above.",
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
      hint: "Turn HOURS into a table: <code>[[h] for h in HOURS]</code>. Use <code>min(..., 100)</code> for the cap.",
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
    return round(KNeighborsClassifier(n_neighbors=3).fit(X_tr, y_tr).score(X_te, y_te), 3)`, note: "Each image is 64 numbers (pixel brightness). k-NN compares pixel distances — the same distance idea from Day 24! Compare it with the decision tree from the lesson (about 0.84)." }],
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
      hint: "Check the order of fit and predict, which labels go with <code>X_tr</code>, and which set is scored.", ar: "ثلاثة أخطاء: الترتيب، والتصنيفات الخاطئة، والتقييم على بيانات التدريب.",
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
    { q: "Train score 0.99, test score 0.70. What helps most?", o: ["Score on the training set instead", "A simpler model (e.g. smaller `max_depth`) or more data", "Remove the test set", "Use a bigger `random_state`"], a: 1, e: "The gap means overfitting; simpler models and more data reduce it." },
  ],
  puzzle: { title: "Read the tree", q: "<p>A decision tree learned: <i>if petal length ≤ 2.45 → setosa; else if petal width ≤ 1.75 → versicolor; else → virginica</i>. A flower has petal length 4.8 and petal width 1.9. Which species?</p>", answers: ["virginica"], hint: "Follow the rules from the top.", ar: "اتبع{{g:|ي}} القواعد من الأعلى: الشرط الأول ثم الثاني.", e: "4.8 > 2.45, so skip setosa; 1.9 > 1.75, so <b>virginica</b>. You just did what <code>predict</code> does." },
  cards: [
    { f: "scikit-learn workflow", b: "split → `fit` on train → `predict` → `score` on test." },
    { f: "Shape of X", b: "2D: (samples, features). One feature → `[[1], [2], ...]`." },
    { f: "Confusion matrix", b: "Rows = true class, columns = predicted. Diagonal = correct." },
    { f: "Cross-validation", b: "Train/test several times on different splits; average the scores." },
    { f: "Linear regression", b: "Fits a straight line y = slope·x + intercept to predict numbers." },
    { f: "Sign of overfitting", b: "Training score much higher than test score: the model memorized instead of learning." },
  ],
  remember: [
    "`X` = features (a 2D table, one row per example); `y` = labels (one answer per row).",
    "`train_test_split(X, y, test_size=0.25, random_state=0)` returns 4 parts: X_train, X_test, y_train, y_test.",
    "Every model: create → `fit(X_train, y_train)` → `predict(X_new)` → `score(X_test, y_test)`.",
    "Accuracy = correct ÷ total. Always report it on the **test** set.",
    "Train score much higher than test score = **overfitting**; a simpler model (smaller `max_depth`) helps.",
    "Category → classification (k-NN, tree). Number → regression (`LinearRegression`).",
  ],
  rememberAr: "X الخصائص و y الإجابات. نقسم البيانات، ندرب بـ fit، نتنبأ بـ predict، ونقيّم بـ score على بيانات الاختبار فقط. فرق كبير بين درجة التدريب والاختبار = حفظ وليس تعلم.",
};
})();

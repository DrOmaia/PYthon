window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[25] = {
  title: "Your first model with scikit-learn",
  intro: "Yesterday you built k-NN by hand. Today you use <b>scikit-learn</b>, the most popular machine-learning library in the world — used in universities, banks and startups. The amazing part: every model follows the same three steps, <code>fit</code>, <code>predict</code>, <code>score</code>. Learn it once, use dozens of algorithms.",
  introAr: "اليوم نستخدم مكتبة scikit-learn الشهيرة. كل النماذج فيها تعمل بنفس الخطوات: fit للتدريب، و predict للتنبؤ، و score للتقييم. نبدأ بمجموعة بيانات زهور الأيرس الشهيرة. (أول تشغيل يأخذ حوالي 10 ثوانٍ لتحميل المكتبة.)",
  goals: ["Load a built-in dataset and inspect X and y", "Split data with `train_test_split`", "Train k-NN and decision tree classifiers", "Evaluate with accuracy and a confusion matrix", "Train a regression model and predict a number"],
  learn: [
    { t: "h", text: "Why use a library like scikit-learn?" },
    { t: "p", html: "<p>Yesterday you wrote k-NN yourself: distances, sorting, voting, splitting, accuracy. That was the best way to understand it. But real projects use dozens of different algorithms, and writing each one by hand would take months. <b>scikit-learn</b> (imported as <code>sklearn</code>) is a free library with all the classic algorithms ready to use, written and tested by experts. Universities, banks and startups use it every day.</p><p>The best part: <b>every</b> model in scikit-learn is used in the same three steps: <code>fit</code> (learn from examples), <code>predict</code> (answer new questions) and <code>score</code> (check how good the answers are). Learn the recipe once, and you can use any algorithm.</p>" },
    { t: "analogy", title: "One driving licence, many cars", html: "<p>Once you can drive, you can drive almost any car: the steering wheel, pedals and gears are always in the same place. scikit-learn models are like cars with the same controls. k-NN, decision trees, linear regression: different engines inside, but you always use <code>fit</code>, <code>predict</code>, <code>score</code>.</p>" },
    { t: "ar", html: "مكتبة scikit-learn فيها خوارزميات تعلم الآلة جاهزة. وكل النماذج تُستخدم بنفس الخطوات الثلاث: fit للتعلم، و predict للتنبؤ، و score للتقييم. (أول تشغيل يأخذ حوالي 10 ثوانٍ لتحميل المكتبة.)" },

    { t: "h", text: "Loading a dataset: the Iris flowers" },
    { t: "p", html: "<p>scikit-learn comes with small, famous datasets for practice. The most famous is <b>Iris</b>: 150 flowers, measured in 1935. For each flower a scientist measured 4 things in centimetres (the <b>features</b>) and wrote down its species (the <b>label</b>): <i>setosa</i>, <i>versicolor</i> or <i>virginica</i>.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target
print(X.shape, y.shape)
print(X[0], y[0])`, before: "<p>The first run loads scikit-learn, so give it a few seconds. Remember yesterday's names: <code>X</code> for the features table, <code>y</code> for the labels.</p>", note: "<p>Line by line:</p><ul><li><code>from sklearn.datasets import load_iris</code> imports one function from the library's <code>datasets</code> part.</li><li><code>load_iris()</code> returns an object holding the data and some descriptions. <code>iris.data</code> is the features and <code>iris.target</code> the labels (\"target\" is another word for label).</li><li><code>X.shape</code> → <code>(150, 4)</code>: a numpy 2D array (Day 23) with 150 rows (flowers) and 4 columns (measurements). <code>y.shape</code> → <code>(150,)</code>: one label per flower.</li><li><code>X[0]</code> → <code>[5.1 3.5 1.4 0.2]</code>, the first flower's 4 measurements; <code>y[0]</code> → <code>0</code>, its species as a number.</li></ul>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
iris = load_iris()
print(iris.feature_names)
print(iris.target_names)
print(iris.target[:5], iris.target[50:55], iris.target[100:105])
print(iris.target_names[iris.target[0]])`, before: "<p>Why is the species <code>0</code>? Models work with numbers, so each species gets a number. Let us decode them.</p>", note: "<p>Line by line:</p><ul><li><code>feature_names</code> tells you what each column means: <code>['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']</code>. So column 2 is petal length.</li><li><code>target_names</code> → <code>['setosa' 'versicolor' 'virginica']</code>: label 0 means setosa, 1 versicolor, 2 virginica. The number is simply the <b>position</b> in this array.</li><li>The data is sorted: flowers 0–49 are all <code>0</code>, 50–99 all <code>1</code>, 100–149 all <code>2</code>. (That is why we must shuffle before splitting!)</li><li><code>iris.target_names[iris.target[0]]</code> turns label 0 into its name: <code>setosa</code>.</li></ul>" },
    { t: "ar", html: "مجموعة بيانات Iris فيها 150 زهرة، لكل زهرة 4 قياسات (الخصائص X) ونوعها (التصنيف y) كرقم 0 أو 1 أو 2. نحول الرقم إلى اسم بـ target_names. وانتبه{{g:|ي}}: البيانات مرتبة حسب النوع، لذلك نخلطها قبل التقسيم." },
    { t: "predict", code: c`from sklearn.datasets import load_iris
X, y = load_iris(return_X_y=True)
print(X.shape[0], X.shape[1], len(set(y)))`, explain: "<code>return_X_y=True</code> makes <code>load_iris</code> return just the two arrays X and y. <code>X.shape[0]</code> is the number of rows (150 samples), <code>X.shape[1]</code> the number of columns (4 features), and <code>set(y)</code> keeps each label once (0, 1, 2), so 3 classes. Output: <code>150 4 3</code>." },

    { t: "h", text: "Splitting the data: train_test_split" },
    { t: "p", html: "<p>Yesterday you learned the golden rule: <b>never test on the data you trained on</b>. Yesterday the split took several lines (shuffle the positions, slice, rebuild X and y). scikit-learn does it all in one function: <code>train_test_split</code>.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
print(X_train.shape, X_test.shape)
print(y_train.shape, y_test.shape)`, before: "<p>Run it and check the numbers: 25% of 150 flowers go to the test set. Then change <code>test_size</code> to <code>0.2</code>.</p>", note: "<p>Line by line:</p><ul><li><code>load_iris(return_X_y=True)</code> gives just X and y.</li><li><code>train_test_split(X, y, ...)</code> shuffles the rows (keeping every X row with its own y label, like yesterday's index trick) and cuts them into two parts. It returns <b>four</b> arrays, always in this order: <code>X_train, X_test, y_train, y_test</code>. We unpack them into four variables (Day 11).</li><li><code>test_size=0.25</code> means 25% for testing. <code>random_state=42</code> is the <b>seed</b>: the same shuffle every run, so your results are repeatable. Remove it and the split (and the accuracy) changes each time.</li><li>Output: <code>(112, 4) (38, 4)</code> and <code>(112,) (38,)</code>: 112 flowers to learn from, 38 kept aside for the exam.</li></ul>" },
    { t: "ar", html: "train_test_split يخلط البيانات ويقسمها في سطر واحد، ويرجع أربع مصفوفات بهذا الترتيب: X_train, X_test, y_train, y_test. و test_size نسبة الاختبار، و random_state يجعل التقسيم نفسه في كل تشغيل." },

    { t: "h", text: "Step 1: fit — the model learns" },
    { t: "p", html: "<p>First you <b>create</b> a model object (like creating an object from a class on Day 18), choosing its settings. Then you call <code>fit</code> with the training features and labels. <code>fit</code> is where the learning happens.</p>" },
    { t: "analogy", title: "fit = studying, predict = the exam", html: "<p><code>fit(X_train, y_train)</code> is the student studying solved examples (questions with answers). <code>predict(X_test)</code> is the exam: new questions, no answers given. <code>score</code> is the teacher grading the exam against the answer key.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)
print(model)`, before: "<p>This is yesterday's k-NN, ready-made. Run it: it prints almost nothing, because learning happens silently.</p>", note: "<p>Line by line:</p><ul><li><code>KNeighborsClassifier</code> is scikit-learn's k-NN for classification. We import it from <code>sklearn.neighbors</code>.</li><li><code>KNeighborsClassifier(n_neighbors=3)</code> creates the model with k = 3. Nothing is learned yet; it is an empty brain with settings.</li><li><code>model.fit(X_train, y_train)</code> gives it the 112 training flowers <b>with</b> their answers. For k-NN, \"learning\" simply means remembering them; other models do much more work here.</li><li><code>print(model)</code> → <code>KNeighborsClassifier(n_neighbors=3)</code>: the model and its settings.</li></ul><p>Notice we only give it the <b>training</b> part. The test flowers stay hidden.</p>" },
    { t: "code", code: c`from sklearn.neighbors import KNeighborsClassifier
model = KNeighborsClassifier()
try:
    model.predict([[5.1, 3.5, 1.4, 0.2]])
except Exception as error:
    print(type(error).__name__)`, before: "<p>What if you forget <code>fit</code> and ask for a prediction straight away? We catch the error with <code>try/except</code> (Day 17) and print its name.</p>", note: "<p>Line by line:</p><ul><li>We create a model but never call <code>fit</code>.</li><li><code>model.predict(...)</code> fails, and <code>except</code> catches the error.</li><li><code>type(error).__name__</code> is the name of the error's class → <code>NotFittedError</code>.</li></ul><p>The full message says: <i>\"This KNeighborsClassifier instance is not fitted yet. Call 'fit' ... before using this estimator.\"</i> A student cannot sit the exam before studying. If you see this error, look for a missing <code>fit</code>, or a <code>fit</code> that comes after the <code>predict</code>.</p>" },
    { t: "ar", html: "ننشئ النموذج أولًا ونختار إعداداته (مثل n_neighbors)، ثم fit يعلّمه من بيانات التدريب فقط. وإذا استُدعيت predict قبل fit يظهر الخطأ NotFittedError." },

    { t: "h", text: "Step 2: predict — the model answers" },
    { t: "p", html: "<p>After <code>fit</code>, the model can answer questions it has never seen. <code>predict</code> takes a table of features (one row per sample) and returns an array of predicted labels, one per row.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
model = KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train)
predictions = model.predict(X_test)
print(predictions[:10])
print(y_test[:10])`, before: "<p>Let us predict all 38 test flowers and compare the first 10 predictions with the real answers.</p>", note: "<p>Line by line:</p><ul><li><code>KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train)</code>: <code>fit</code> returns the model itself, so we can create and fit in one line.</li><li><code>model.predict(X_test)</code> → an array of 38 predicted species numbers, one per test flower.</li><li><code>predictions[:10]</code> → <code>[1 0 2 1 1 0 1 2 1 1]</code></li><li><code>y_test[:10]</code> → <code>[1 0 2 1 1 0 1 2 1 1]</code>: the real answers. All 10 match!</li></ul><p>The model never saw <code>y_test</code>; we only use it afterwards to check the answers.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
iris = load_iris()
model = KNeighborsClassifier(n_neighbors=3).fit(iris.data, iris.target)
new_flower = [[5.1, 3.5, 1.4, 0.2]]
label = model.predict(new_flower)[0]
print(label, iris.target_names[label])
print(model.predict([[6.7, 3.0, 5.2, 2.3], [5.9, 2.8, 4.3, 1.3]]))`, before: "<p>Now the real use: you measured a flower in the garden and want to know its species. Note the <b>double</b> brackets.</p>", note: "<p>Line by line:</p><ul><li>This time we fit on <b>all</b> 150 flowers, because we are not testing; we want the best model for real use.</li><li><code>[[5.1, 3.5, 1.4, 0.2]]</code> is a table with <b>one row</b>. <code>predict</code> always expects a table (rows × features), even for one sample. With single brackets you get an error asking for a 2D array.</li><li><code>predict</code> returns an array with one answer; <code>[0]</code> takes it out → <code>0</code>, and <code>target_names[0]</code> → <code>setosa</code>.</li><li>The last line predicts two flowers at once (two rows) → <code>[2 1]</code>: virginica and versicolor.</li></ul>" },
    { t: "ar", html: "predict يأخذ جدولًا (صف لكل عينة) ويرجع تنبؤًا لكل صف. حتى للعينة الواحدة نكتب قوسين مزدوجين [[...]] لأن المدخل يجب أن يكون ثنائي الأبعاد. ونحوّل الرقم إلى اسم بـ target_names." },

    { t: "h", text: "Step 3: score — how good is it?" },
    { t: "p", html: "<p><code>score(X_test, y_test)</code> predicts the test samples and compares them with the real labels in one call. For classifiers it returns the <b>accuracy</b>: the fraction of correct answers, exactly like your <code>accuracy()</code> function from Day 24.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
model = KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train)
print(model.score(X_test, y_test))
predictions = model.predict(X_test)
print((predictions == y_test).sum(), "of", len(y_test))`, before: "<p>Two ways to get the accuracy: the built-in <code>score</code>, and counting by hand with a numpy mask (Day 23).</p>", note: "<p>Line by line:</p><ul><li><code>model.score(X_test, y_test)</code> → <code>1.0</code>: 100% of the test flowers were right with this split. Iris is an easy dataset.</li><li><code>predictions == y_test</code> compares the two arrays element by element and gives a mask of True/False.</li><li><code>.sum()</code> counts the Trues → <code>38 of 38</code>. 38 ÷ 38 = 1.0, the same as <code>score</code>.</li></ul><p>Always score on the <b>test</b> set. Scoring on <code>X_train, y_train</code> measures memory, not learning (yesterday's \"memorized exam\").</p>" },
    { t: "ar", html: "score يحسب الدقة على بيانات الاختبار: نسبة التنبؤات الصحيحة. انتبه{{g:|ي}}: احسب{{g:|ي}} الدقة دائمًا على X_test و y_test، وليس على بيانات التدريب." },
    { t: "predict", code: c`import numpy as np
pred = np.array([0, 1, 2, 2, 1])
real = np.array([0, 1, 1, 2, 1])
print((pred == real).mean())`, explain: "The mask <code>pred == real</code> is <code>[True True False True True]</code>: 4 correct out of 5. The <code>mean</code> of booleans is the fraction of Trues, so the accuracy is <code>0.8</code>." },

    { t: "h", text: "A decision tree: a model you can read" },
    { t: "p", html: "<p>k-NN never explains <i>why</i> it chose an answer. A <b>decision tree</b> does: it learns a set of <code>if/else</code> questions from the data, like the ones you wrote on Day 5, but found automatically. Because people can read and check the rules, trees are popular in places like banks and hospitals.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.25, random_state=42)
tree = DecisionTreeClassifier(max_depth=2, random_state=0)
tree.fit(X_train, y_train)
print("accuracy:", tree.score(X_test, y_test))
print(export_text(tree, feature_names=list(iris.feature_names)))`, before: "<p>Same split, a different model. Only the import and the model line change; <code>fit</code> and <code>score</code> are identical. Run it and read the printed rules.</p>", note: "<p>Line by line:</p><ul><li><code>DecisionTreeClassifier(max_depth=2, random_state=0)</code>: <code>max_depth=2</code> allows at most 2 questions in a row, so the rules stay short. <code>random_state</code> makes the result repeatable.</li><li><code>fit</code> and <code>score</code> work exactly as with k-NN. Accuracy ≈ <code>0.974</code> (37 of 38).</li><li><code>export_text</code> prints the learned rules. They say: if petal width ≤ 0.80 → class 0 (setosa); otherwise, if petal length ≤ 4.75 → class 1 (versicolor), else class 2 (virginica).</li></ul><p>Nobody told the tree to look at the petals: it discovered that petals separate the species best. Try <code>max_depth=1</code> or <code>3</code> and see how the rules change.</p>" },
    { t: "ar", html: "شجرة القرار تتعلم أسئلة if/else من البيانات تلقائيًا، ويمكن قراءتها بـ export_text. و max_depth يحدد أقصى عدد أسئلة متتالية. لاحظ{{g:|ي}} أن fit و predict و score نفسها لكل النماذج." },

    { t: "h", text: "Where does it go wrong? The confusion matrix" },
    { t: "p", html: "<p>Accuracy is one number: it says <i>how many</i> mistakes, not <i>which</i> ones. A <b>confusion matrix</b> is a small table that shows, for each true class, what the model predicted. It tells you which classes the model confuses with each other.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
pred = DecisionTreeClassifier(max_depth=1, random_state=0).fit(X_train, y_train).predict(X_test)
print(confusion_matrix(y_test, pred))`, before: "<p>A deliberately too-simple tree: only <b>one</b> question allowed (<code>max_depth=1</code>). Run it and read the table row by row.</p>", note: "<p>Line by line:</p><ul><li>Line 7 creates, fits and predicts in one chain: each method returns something we can call the next method on.</li><li><code>confusion_matrix(y_test, pred)</code>: real answers first, predictions second.</li><li><b>Rows are the true class</b> (0, 1, 2) and <b>columns the predicted class</b>. The output is <code>[[19 0 0] [0 0 21] [0 0 20]]</code>.</li><li>Row 0: all 19 setosas predicted as setosa. Row 1: all 21 versicolors predicted as class 2, all wrong! Row 2: all 20 virginicas right.</li></ul><p>The <b>diagonal</b> (top-left to bottom-right) holds the correct predictions; everything off the diagonal is a mistake. With one question, the tree can only split the flowers into two groups, so one species never gets predicted. Change <code>max_depth</code> to 3: the matrix becomes <code>[[19 0 0] [0 20 1] [0 1 19]]</code>.</p>" },
    { t: "ar", html: "مصفوفة الالتباس: الصفوف هي النوع الحقيقي والأعمدة هي النوع المتوقَّع. القطر يحوي التنبؤات الصحيحة، وكل رقم خارجه خطأ يوضح أي نوعين يخلط بينهما النموذج." },

    { t: "h", text: "Fairer comparison: cross-validation" },
    { t: "p", html: "<p>One split can be lucky or unlucky: with 38 test flowers, one mistake changes accuracy by almost 3%. <b>Cross-validation</b> repeats the experiment several times. With <code>cv=5</code>, the data is cut into 5 parts; each part takes a turn as the test set while the other 4 are used for training. You get 5 scores, and their average is more trustworthy.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
X, y = load_iris(return_X_y=True)
scores = cross_val_score(KNeighborsClassifier(n_neighbors=5), X, y, cv=5)
print(scores)
print(scores.mean().round(3))`, before: "<p>No <code>train_test_split</code> here: <code>cross_val_score</code> does the splitting, fitting and scoring itself, 5 times.</p>", note: "<p>Line by line:</p><ul><li><code>cross_val_score(model, X, y, cv=5)</code> takes an <b>unfitted</b> model and all the data. It does 5 rounds of fit-on-4-parts, score-on-1-part.</li><li><code>print(scores)</code> → five accuracies: <code>[0.967 1. 0.933 0.967 1.]</code> (printed with more decimals). Some rounds are easier than others.</li><li><code>scores.mean().round(3)</code> → <code>0.973</code>, the average.</li></ul><p>Use cross-validation when you want to <b>compare</b> models or settings fairly, for example k-NN against a decision tree, or k = 3 against k = 7.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
X, y = load_iris(return_X_y=True)
for m in [KNeighborsClassifier(n_neighbors=5), DecisionTreeClassifier(random_state=0), LogisticRegression(max_iter=1000)]:
    print(type(m).__name__, cross_val_score(m, X, y, cv=5).mean().round(3))`, before: "<p>Because every model has the same controls, comparing three of them is just a loop. <code>LogisticRegression</code> is another classifier (despite its name, it predicts categories).</p>", note: "<p>Line by line:</p><ul><li>The list holds three unfitted models. <code>max_iter=1000</code> gives <code>LogisticRegression</code> enough steps to finish learning.</li><li><code>type(m).__name__</code> is the name of the model's class (Day 18), e.g. <code>KNeighborsClassifier</code>.</li><li>For each model we print its average cross-validation accuracy: k-NN <code>0.973</code>, decision tree <code>0.96</code>, logistic regression <code>0.973</code>.</li></ul><p>This \"try several models, keep the best\" loop is what data scientists do every day.</p>" },
    { t: "ar", html: "التحقق المتقاطع (cross-validation) يقسم البيانات إلى 5 أجزاء، وكل جزء يصبح بيانات اختبار مرة، ثم نأخذ متوسط الدقة. هذا أعدل لمقارنة النماذج من تقسيم واحد قد يكون محظوظًا." },

    { t: "h", text: "Regression: predicting a number" },
    { t: "p", html: "<p>So far we predicted categories. To predict a <b>number</b> (a mark, a price) we use a regression model. The simplest is <b>linear regression</b>: it finds the straight line that best fits the data, <code>mark = slope × hours + intercept</code>. The <b>slope</b> is how many marks each extra hour adds; the <b>intercept</b> is the predicted mark for 0 hours.</p>" },
    { t: "code", code: c`import numpy as np
from sklearn.linear_model import LinearRegression
hours = np.array([[1], [2], [3], [4], [5], [6]])
marks = np.array([52, 58, 65, 70, 78, 83])
reg = LinearRegression().fit(hours, marks)
print("slope:", reg.coef_[0].round(2), "intercept:", reg.intercept_.round(2))
print("8 hours ->", reg.predict([[8]]).round(1))`, before: "<p>Six students: hours studied and their mark. Can we predict the mark of a student who studies 8 hours? Same recipe: <code>fit</code>, then <code>predict</code>.</p>", note: "<p>Line by line:</p><ul><li><code>hours</code> is written as <code>[[1], [2], ...]</code>: a table with 6 rows and <b>1 column</b>. X must <b>always</b> be 2D (rows × features), even with one feature. <code>marks</code> (the labels) is a normal 1D array.</li><li><code>LinearRegression().fit(hours, marks)</code> finds the best line.</li><li><code>reg.coef_[0]</code> is the slope → <code>6.29</code>: each extra hour adds about 6.3 marks. <code>reg.intercept_</code> → <code>45.67</code>.</li><li><code>reg.predict([[8]])</code> → <code>[96.]</code>: 6.29 × 8 + 45.67 ≈ 96.</li></ul><p>Careful: a line keeps going forever. For 10 hours it predicts about 108.5, which is impossible. Models do not know the real world; adding common-sense limits (like capping at 100) is your job.</p>" },
    { t: "ar", html: "الانحدار الخطي يجد أفضل خط مستقيم: الدرجة = الميل × الساعات + الثابت، ثم يتنبأ برقم. انتبه{{g:|ي}}: X يجب أن يكون ثنائي الأبعاد [[1], [2], ...] حتى مع خاصية واحدة، والخط لا يعرف أن الدرجة لا تتجاوز 100." },
    { t: "predict", code: c`from sklearn.linear_model import LinearRegression
m = LinearRegression().fit([[1], [2], [3]], [10, 20, 30])
print(round(m.predict([[5]])[0], 1))`, explain: "The data is exactly mark = 10 × hours (slope 10, intercept 0), so for 5 the line gives <code>50.0</code>. <code>[0]</code> takes the single prediction out of the array, and <code>round</code> keeps 1 decimal." },

    { t: "h", text: "Same recipe, bigger data: handwritten digits" },
    { t: "p", html: "<p>scikit-learn also includes 1,797 tiny pictures of handwritten digits (0–9). Each picture is 8 × 8 pixels, and each pixel is a brightness number from 0 (white) to 16 (black). Flatten the 8 × 8 grid into one row and you get 64 features per picture: a perfect job for the same recipe.</p>" },
    { t: "code", code: c`from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
X, y = load_digits(return_X_y=True)
print(X.shape)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
model = KNeighborsClassifier(n_neighbors=3).fit(X_tr, y_tr)
print(round(model.score(X_te, y_te), 3))
print(model.predict(X_te[:10]), y_te[:10])`, before: "<p>Real computer vision in 6 lines. Compare it with the Iris code: only the dataset changed.</p>", note: "<p>Line by line:</p><ul><li><code>X.shape</code> → <code>(1797, 64)</code>: 1,797 pictures, 64 pixel features each. <code>y</code> holds the digit each picture shows.</li><li>Split, fit and score exactly as before. Accuracy → <code>0.987</code>: about 99 of every 100 unseen digits are recognised.</li><li>The last line shows the first 10 predictions next to the real digits: <code>[2 8 2 6 6 7 1 9 8 5]</code> both times.</li></ul><p>k-NN compares pictures by the distance between their 64 pixel values: two drawings of a 7 have similar pixels, so they are close. Try <code>print(load_digits().images[0])</code> in the Playground to see one picture as an 8 × 8 grid of numbers. Can you spot the 0?</p>" },
    { t: "ar", html: "صور الأرقام المكتوبة بخط اليد: كل صورة 8×8 بكسل تصبح 64 خاصية. ونفس الوصفة (تقسيم، fit، score) تعطي دقة قريبة من 99%." },

    { t: "h", text: "Putting it together: a model competition" },
    { t: "code", code: c`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix
iris = load_iris()
X_tr, X_te, y_tr, y_te = train_test_split(iris.data, iris.target, test_size=0.3, random_state=7)
new = [[6.0, 2.9, 4.5, 1.5]]
for model in [KNeighborsClassifier(n_neighbors=5), DecisionTreeClassifier(max_depth=3, random_state=0)]:
    model.fit(X_tr, y_tr)
    print(type(model).__name__, "accuracy:", round(model.score(X_te, y_te), 3))
    print(confusion_matrix(y_te, model.predict(X_te)))
    print("new flower ->", iris.target_names[model.predict(new)[0]])`, together: true, before: "<p>The full workflow with two models side by side: load, split, fit, score, inspect the mistakes and predict a new flower. Read it first and find the three steps (fit, predict, score) inside the loop. Then try other values of <code>n_neighbors</code> and <code>max_depth</code>.</p>", note: "<p>How it works:</p><ul><li><code>load_iris()</code> gives the data and the species names; <code>train_test_split</code> keeps 30% (45 flowers) for testing, with a fixed seed.</li><li><code>new</code> is a garden flower we measured, written as a one-row table.</li><li>The loop runs the <b>same code</b> on both models, which only works because they share <code>fit</code>, <code>predict</code> and <code>score</code>.</li><li>k-NN scores <code>0.911</code>, the tree <code>0.889</code>. The confusion matrices show that both models make all their mistakes between classes 1 and 2 (versicolor and virginica); setosa (row 0) is always right.</li><li>Both models predict the new flower as <code>versicolor</code>.</li></ul><p>On Day 24 this took a page of code; now it is a short loop. But you know what happens inside: distances, votes, if/else rules and honest testing.</p>" },
    { t: "ar", html: "جمعنا الوصفة كاملة: تحميل البيانات، التقسيم، fit على التدريب، score على الاختبار، مصفوفة الالتباس لمعرفة الأخطاء، ثم التنبؤ بزهرة جديدة. ونفس الحلقة تعمل مع النموذجين لأن طريقة الاستخدام واحدة." },
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

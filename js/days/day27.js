window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[27] = {
  title: "Review + mini AI project: Student Success Predictor",
  intro: "Time to run a complete machine-learning project, the way data scientists do: get the data, explore it, prepare it, train several models, evaluate them honestly, and use the best one — and think about whether it should be used at all. The topic: predicting whether a student will pass a course.",
  introAr: "مشروع ذكاء اصطناعي كامل على مراحل: البيانات، ثم الاستكشاف، ثم التجهيز، ثم التدريب والمقارنة، ثم التقييم والتنبؤ. وفي النهاية نفكر: هل من العدل استخدام هذا النموذج لاتخاذ قرارات عن الطلاب؟",
  goals: ["Follow the full ML workflow end to end", "Explore data with numpy before modeling", "Compare models and pick one with evidence", "Interpret a confusion matrix", "Think about the ethics of prediction"],
  learn: [
    { t: "h", text: "The project and the plan" },
    { t: "p", html: "<p>Today you run a complete machine-learning project from start to finish: <b>predict whether a student will pass a course</b> from three facts — weekly study hours, attendance and assignments submitted. No new concepts: you will use the tools of Days 22–26. What is new is putting them in the right <b>order</b>, the way data scientists work.</p>" },
    { t: "static", code: c`1. Data        make_data()
2. Explore     averages of passed vs failed students
3. Prepare     train/test split (+ scaling for k-NN)
4. Train       several models
5. Evaluate    accuracy vs baseline, confusion matrix
6. Use         predict for a new student, explain the limits` },
    { t: "p", html: "<p>How the exercises follow this plan, and how the pieces connect:</p><ol><li><b>Milestone 1 — Explore</b> (steps 1–2). Before any model, look at the data: do students who pass really study more? You compare averages with numpy <b>masks</b> and <code>axis=0</code>. If the data doesn't tell a clear story, no model will find one.</li><li><b>Milestone 2 — Compare models</b> (steps 3–5). Split once, then train three models on the <b>same</b> training part and score them on the <b>same</b> test part, next to a <b>baseline</b>. Same split = fair comparison.</li><li><b>Milestone 3 — Where does it fail?</b> (step 5). Accuracy is one number; the <b>confusion matrix</b> shows <i>which</i> mistakes the best model makes.</li><li><b>Milestone 4 — Study advisor</b> (step 6). Train the chosen model on all the data and turn its probability into helpful advice.</li></ol><p>Work in this order and test each milestone before moving on: every later step trusts the earlier ones. The <b>bug hunt</b> at the end mixes bugs from Days 22, 23 and 24 — the recap sections below remind you of exactly those ideas.</p>" },
    { t: "ar", html: "نتبع خطوات مشروع الذكاء الاصطناعي بالترتيب: البيانات، ثم الاستكشاف، ثم التقسيم، ثم تدريب عدة نماذج، ثم التقييم مقارنةً بخط الأساس، ثم الاستخدام. اختبر{{g:|ي}} كل مرحلة قبل الانتقال للتي بعدها، لأن كل مرحلة تعتمد على ما قبلها." },

    { t: "h", text: "The dataset, step by step" },
    { t: "p", html: "<p>We <b>generate</b> a realistic, synthetic dataset of 300 students instead of using real people's grades — no real person's data is exposed, an important privacy habit. The data is created by a hidden rule plus random noise, because real life is messy. Let's build it in small pieces first.</p>" },
    { t: "code", code: c`import numpy as np
rng = np.random.default_rng(7)
hours = rng.uniform(0, 15, 5)
assignments = rng.integers(0, 11, 5)
print(hours.round(1))
print(assignments)`, before: "<p>Piece 1: random features for 5 students. Run it twice — the numbers stay the same. Then change the seed <code>7</code> to <code>8</code>.</p>", note: "<p>Line by line (Day 23):</p><ul><li><code>np.random.default_rng(7)</code> creates a random generator with <b>seed</b> 7. The same seed always gives the same \"random\" numbers, so everyone gets the same dataset and the same test results.</li><li><code>rng.uniform(0, 15, 5)</code>: 5 decimal numbers between 0 and 15 — weekly study hours.</li><li><code>rng.integers(0, 11, 5)</code>: 5 whole numbers from 0 up to 10 (the end, 11, is <b>not</b> included, like <code>range</code>) — assignments submitted.</li></ul><p>Output: <code>[ 9.4 13.5 11.6  3.4  4.5]</code> and <code>[ 3  9 10  0  5]</code>. A different seed gives different numbers.</p>" },
    { t: "code", code: c`import numpy as np
hours = np.array([2.0, 10.0, 14.0])
attendance = np.array([50.0, 80.0, 95.0])
assignments = np.array([3, 7, 10])
score = 3 * hours + 0.6 * attendance + 4 * assignments
print(score)
print((score > 100).astype(int))`, before: "<p>Piece 2: the hidden rule that decides who passes. Calculate the first student's score by hand before you run it.</p>", note: "<p>Line by line:</p><ul><li>Three students, three numpy arrays: student 0 studies 2 hours, attends 50% and submits 3 assignments.</li><li><code>score = 3 * hours + ...</code> is <b>vectorized</b> math (Day 23): it calculates all three students at once. Student 0: 3·2 + 0.6·50 + 4·3 = 6 + 30 + 12 = 48.</li><li><code>score &gt; 100</code> gives an array of <code>True</code>/<code>False</code>; <code>.astype(int)</code> turns it into 1/0 — our <b>label</b> (1 = passed).</li></ul><p>Output: <code>[ 48. 106. 139.]</code> and <code>[0 1 1]</code>. In the real dataset we also add <code>rng.normal(0, 10, n)</code>: random noise of about ±10 points, so two students with the same habits can get different results — just like real life. That noise is why no model can reach 100%.</p>" },
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
print(X[:3].round(1), y[:3])`, together: true, before: "<p>The full dataset function — the same one you will find in every exercise starter. Run it and read the shape and the pass rate.</p>", note: "<p>How it works:</p><ul><li>Lines 4–7 create the three features for <code>n</code> students, exactly like piece 1; attendance is between 40 and 100%.</li><li>Line 8 is the hidden rule from piece 2 <b>plus noise</b>.</li><li>Line 9 makes the 0/1 labels.</li><li><code>np.column_stack([...])</code> glues the three 1-D arrays side by side as <b>columns</b>: <code>X</code> gets one row per student and one column per feature — the feature table every scikit-learn model expects.</li><li>The function returns <code>X</code> (features) and <code>passed</code> (labels).</li></ul><p>Output: <code>(300, 3) pass rate: 0.24</code> — 300 students, 3 features, only 24% pass. Then the first three students and their labels <code>[0 1 1]</code>. Look at student 0: 9.4 hours, 78.5% attendance, 7 assignments gives 28.2 + 47.1 + 28 = 103.3, above 100 — but the noise pushed them below, so they failed. Remember the 24%: it means always guessing \"fail\" is already right about 76% of the time.</p>" },
    { t: "ar", html: "نصنع بيانات مصطنعة بمولّد عشوائي له بذرة (seed) ثابتة، لذلك تكون النتائج نفسها عند الجميع. النجاح يتحدد بقاعدة مخفية مع ضوضاء عشوائية. لاحظ{{g:|ي}} أن ٢٤٪ فقط ينجحون، فتخمين \"راسب\" دائمًا يعطي دقة عالية بلا أي تعلم." },

    { t: "h", text: "Recap — Day 22: searching and Big-O" },
    { t: "p", html: "<p><b>Binary search</b> finds a value in a <b>sorted</b> list by checking the middle and throwing away half of the list each time. Its speed is <b>O(log n)</b>: doubling the list adds only one more step. Linear search (checking every item) is <b>O(n)</b>, and good sorting is <b>O(n log n)</b>. Use binary search whenever the data is sorted and you search it many times. The two classic traps: the list must be sorted, and <code>hi</code> must start at the <b>last valid index</b>, <code>len(items) - 1</code>.</p>" },
    { t: "static", code: c`def find(items, t):          # items must be sorted!
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == t:
            return mid
        if items[mid] < t:
            lo = mid + 1         # t is in the right half
        else:
            hi = mid - 1         # t is in the left half
    return -1` },
    { t: "code", code: c`n = 1_000_000
steps = 0
while n > 1:
    n = n // 2
    steps += 1
print(steps)`, before: "<p>Why is O(log n) so fast? Count how many times you can cut one million items in half before one is left.</p>", note: "<p>Line by line:</p><ul><li><code>1_000_000</code> is one million; the underscores only make it easier to read.</li><li>Each loop turn halves <code>n</code> with <code>//</code> (just like binary search halves the search range) and counts one step.</li></ul><p>Output: <code>19</code>. Binary search needs about 20 checks for a million sorted items, where linear search may need a million. That is the meaning of O(log n).</p>" },
    { t: "ar", html: "البحث الثنائي يعمل فقط على قائمة مرتبة، ويقسمها إلى نصفين في كل خطوة، لذلك سرعته O(log n). انتبه{{g:|ي}}: hi تبدأ من len(items) - 1 وليس len(items)، وإلا قد يحدث خطأ عند البحث عن قيمة أكبر من كل العناصر." },

    { t: "h", text: "Recap — Day 23: numpy masks, axis and scaling" },
    { t: "p", html: "<p>numpy does math on whole arrays at once. Two tools matter today. A <b>mask</b> like <code>y == 1</code> is an array of True/False; <code>X[mask]</code> keeps only the rows where it is True. And <code>axis=0</code> means \"calculate down the columns\", giving one result per feature. You need both in Milestone 1.</p>" },
    { t: "code", code: c`import numpy as np
X = np.array([[10, 90, 8], [2, 50, 3], [12, 85, 9]])
y = np.array([1, 0, 1])
print(X[y == 1])
print(X[y == 1].mean(axis=0))`, before: "<p>Three students (hours, attendance, assignments) and their labels. Find the rows of the students who passed, then their average per feature.</p>", note: "<p>Line by line:</p><ul><li><code>y == 1</code> is the mask <code>[True, False, True]</code>.</li><li><code>X[y == 1]</code> keeps rows 0 and 2: <code>[[10 90 8] [12 85 9]]</code> — the students who passed.</li><li><code>.mean(axis=0)</code> averages <b>each column</b>: hours (10+12)/2 = 11, attendance (90+85)/2 = 87.5, assignments (8+9)/2 = 8.5.</li></ul><p>Output: the two rows, then <code>[11.  87.5  8.5]</code>. With <code>axis=1</code> you would get one average per <b>student</b> instead, which makes no sense here. For Milestone 1, add <code>.round(1).tolist()</code> to get a plain rounded list.</p>" },
    { t: "code", code: c`import numpy as np
a = np.array([2, 4, 6], dtype=float)
print((a - a.min()) / (a.max() - a.min()))`, before: "<p><b>Min-max scaling</b> squeezes values into the range 0 to 1. Check the formula on the middle value by hand.</p>", note: "<p>Line by line:</p><ul><li><code>a - a.min()</code> shifts the values so the smallest becomes 0: <code>[0, 2, 4]</code>.</li><li>Dividing by <code>a.max() - a.min()</code> (the <b>range</b>, 6 − 2 = 4) makes the biggest become 1.</li></ul><p>Output: <code>[0.  0.5 1. ]</code>. A common bug is dividing by <code>a.max()</code> alone: then the biggest value becomes 4/6, not 1. The denominator must be max <b>minus</b> min.</p>" },
    { t: "ar", html: "القناع X[y == 1] يختار الصفوف التي شرطها صحيح، و mean(axis=0) يحسب متوسط كل عمود (كل خاصية). وفي التطبيع min-max المقام هو max - min وليس max وحده." },

    { t: "h", text: "Recap — Day 24: baselines and honest testing" },
    { t: "p", html: "<p>A model learns from <b>features</b> (inputs, <code>X</code>) and <b>labels</b> (answers, <code>y</code>). We always test it on data it has <b>never seen</b> (the test set); a model that is perfect on training data but bad on new data is <b>overfitting</b>. And a score means nothing alone: compare it with a <b>baseline</b>, the score of always guessing the most common class.</p>" },
    { t: "code", code: c`import numpy as np
y_train = np.array([0, 0, 1, 0, 0, 1, 0, 0])
y_test = np.array([0, 1, 0, 0])
majority = int(round(y_train.mean()))
print("majority class:", majority)
print("baseline accuracy:", (y_test == majority).mean())`, before: "<p>The baseline in Milestone 2: find the most common class in the <b>training</b> labels, then see how often it is right on the test labels.</p>", note: "<p>Line by line:</p><ul><li>For 0/1 labels, the mean is the share of 1s: <code>y_train.mean()</code> is 2/8 = 0.25.</li><li><code>round(0.25)</code> is 0, so the majority class is <b>0</b>. (If more than half were 1s, it would round to 1. This trick works only for 0/1 labels.)</li><li><code>y_test == majority</code> is True wherever guessing 0 is correct; its mean is the accuracy.</li></ul><p>Output: <code>majority class: 0</code> and <code>baseline accuracy: 0.75</code>. A model with 75% accuracy here has learned nothing. We take the majority from the <b>training</b> labels because the test labels are \"unknown\" while building a model.</p>" },
    { t: "code", code: c`from sklearn.neighbors import KNeighborsClassifier
X_tr, y_tr = [[0], [1], [5], [6]], [0, 0, 1, 1]
X_te, y_te = [[0.5], [5.2], [2.8], [7]], [0, 1, 1, 1]
m = KNeighborsClassifier(n_neighbors=1).fit(X_tr, y_tr)
print("train:", m.score(X_tr, y_tr), "test:", m.score(X_te, y_te))`, before: "<p>Score the same model on training data and on test data. Which number tells the truth?</p>", note: "<p>Line by line:</p><ul><li>k-NN with k = 1 answers with the label of the single closest training point.</li><li><code>m.score(X_tr, y_tr)</code>: on training data, each point's closest neighbour is <b>itself</b>, so it is always right → <code>1.0</code>.</li><li><code>m.score(X_te, y_te)</code>: 0.5 → closest is 0 or 1 (label 0, correct); 5.2 → 5 (correct); 2.8 → 1 is closer than 5, so it says 0 (wrong); 7 → 6 (correct) → 3/4.</li></ul><p>Output: <code>train: 1.0 test: 0.75</code>. The training score is a fake 100%. Always report the <b>test</b> score.</p>" },
    { t: "ar", html: "قارن{{g:|ي}} دائمًا دقة النموذج بخط الأساس (تخمين الفئة الأكثر شيوعًا في بيانات التدريب). وقيّم{{g:|ي}} النموذج على بيانات الاختبار فقط، لأن الدقة على بيانات التدريب قد تكون ١٠٠٪ كاذبة." },

    { t: "h", text: "Recap — Day 25: models, pipelines and probabilities" },
    { t: "p", html: "<p>Every scikit-learn model has the same three methods: <code>fit(X, y)</code> learns, <code>predict(X)</code> answers, <code>score(X, y)</code> gives accuracy. So comparing models is a loop. <b>Logistic regression</b> learns a weighted sum of the features — a great match when the hidden rule is a weighted sum, as in our dataset. It also gives <b>probabilities</b> with <code>predict_proba</code>, which Milestone 4 turns into advice.</p>" },
    { t: "code", code: c`from sklearn.linear_model import LogisticRegression
X = [[1, 50], [2, 55], [3, 60], [10, 90], [12, 85], [14, 95]]
y = [0, 0, 0, 1, 1, 1]
model = LogisticRegression(max_iter=1000).fit(X, y)
print(model.predict([[11, 88], [2, 52]]))
print(model.predict_proba([[6, 70]]).round(2))`, before: "<p>Six students (hours, attendance). Train, predict two new students, then ask for the probabilities of an \"in-between\" student.</p>", note: "<p>Line by line:</p><ul><li><code>max_iter=1000</code> gives the training enough steps to finish (without it you may get a warning).</li><li><code>predict</code> answers 1 (pass) for the hard-working student and 0 for the one who barely studies → <code>[1 0]</code>.</li><li><code>predict_proba([[6, 70]])</code> returns one row per student: <code>[P(class 0), P(class 1)]</code>.</li></ul><p>Output: <code>[1 0]</code> and <code>[[0.72 0.28]]</code>: a 28% chance of passing. In Milestone 4 you take <code>[0][1]</code> — first row, column of class 1 — to get the pass probability, and turn it into \"on track\", \"at risk\" or \"needs support\".</p>" },
    { t: "code", code: c`from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
X = [[1, 50], [2, 55], [3, 60], [10, 90], [12, 85], [14, 95]]
y = [0, 0, 0, 1, 1, 1]
model = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=3))
model.fit(X, y)
print(model.predict([[11, 88], [2, 52]]))`, before: "<p>k-NN measures <b>distances</b>, so a feature with big numbers (attendance, 50–95) would drown a feature with small numbers (hours, 1–14). Scaling fixes that. Find where the scaling happens.</p>", note: "<p>Line by line:</p><ul><li><code>StandardScaler</code> rescales each feature so it has mean 0 and similar spread; now hours and attendance count equally in a distance.</li><li><code>make_pipeline(A, B)</code> glues the scaler and the model. <code>fit</code> learns the scaling from the <b>training data only</b>, then trains k-NN on the scaled data; <code>predict</code> scales new data the same way first.</li></ul><p>Output: <code>[1 0]</code>. Decision trees don't need scaling, because they compare one feature at a time with a threshold; distances never mix features.</p>" },
    { t: "code", code: c`from sklearn.metrics import confusion_matrix
y_true = [0, 0, 0, 1, 1, 1, 0, 1]
y_pred = [0, 0, 1, 1, 0, 0, 0, 1]
cm = confusion_matrix(y_true, y_pred)
print(cm)
print("false negatives:", cm[1][0])`, before: "<p>Accuracy hides <b>which</b> mistakes a model makes. The confusion matrix shows them. Count the mistakes by hand first.</p>", note: "<p>Line by line:</p><ul><li><b>Rows</b> are the true class (0 then 1), <b>columns</b> the predicted class (0 then 1).</li><li>True 0s (4 of them): 3 predicted 0, 1 predicted 1 → first row <code>[3 1]</code>.</li><li>True 1s (4 of them): 2 predicted 0, 2 predicted 1 → second row <code>[2 2]</code>.</li><li><code>cm[1][0]</code> = row \"really 1\", column \"predicted 0\" = the <b>false negatives</b>.</li></ul><p>Output: <code>[[3 1] [2 2]]</code> and <code>false negatives: 2</code>. In our project a false negative is a student who <b>passed</b> but was predicted to <b>fail</b> — exactly what Milestone 3 asks you to count.</p>" },
    { t: "ar", html: "كل نماذج scikit-learn لها fit و predict و score. الانحدار اللوجستي يعطي احتمالات بـ predict_proba، و k-NN يحتاج تطبيع الخصائص داخل pipeline. في مصفوفة الالتباس الصفوف هي الحقيقة والأعمدة هي التنبؤ، و cm[1][0] هم الناجحون الذين توقع النموذج رسوبهم." },

    { t: "h", text: "Recap — Day 26: text AI" },
    { t: "p", html: "<p>Text becomes numbers with <b>bag of words</b>: one column per vocabulary word, one count per text (<code>CountVectorizer</code>; fit on training text, only <code>transform</code> new text). <b>Naive Bayes</b> learns which words are clues for which class — the classic spam filter. <b>TF-IDF</b> gives less weight to words that are everywhere, and <b>cosine similarity</b> finds the closest example phrase, which is how our intent chatbot chose its answer, with a threshold so it can say \"I don't understand\". Today's project uses numbers, not text, but the workflow is identical: features → split → train → evaluate against a baseline.</p>" },
    { t: "ar", html: "في اليوم ٢٦ حولنا النصوص إلى أعداد (Bag of Words و TF-IDF) ودربنا Naive Bayes، وبنينا روبوت محادثة بالتشابه. مشروع اليوم يستخدم أرقامًا لا نصوصًا، لكن خطوات العمل هي نفسها تمامًا." },

    { t: "h", text: "Week 4 in one table" },
    { t: "table", head: ["Day", "Idea", "Remember"], rows: [["22", "algorithms", "binary search O(log n), sorting O(n log n), Big-O"], ["23", "numpy", "vectorized math, `a[:, c]`, masks, `axis`"], ["24", "ML ideas", "features/labels, train/test, k-NN, overfitting, baseline"], ["25", "scikit-learn", "`fit` / `predict` / `score`, trees, regression"], ["26", "text AI", "bag of words, Naive Bayes, intents, cosine similarity"]] },
    { t: "ar", html: "هذا الجدول ملخص الأسبوع الرابع. ارجع{{g:|ي}} إليه أثناء حل المراحل: كل مرحلة في مشروع اليوم تستخدم فكرة أو أكثر من هذه الأيام." },
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

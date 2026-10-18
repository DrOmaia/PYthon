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
    { t: "p", html: "<p>Until today, <b>you</b> wrote every rule: <code>if temperature &gt; 40: print(\"Stay inside\")</code>. That works when you know the rule. But what is the rule for \"this email is spam\" or \"this photo shows a cat\"? Nobody can write it down. <b>Machine learning</b> turns the job around: you give the computer many <b>examples together with their answers</b>, and it finds the rule by itself. The rule it finds is called a <b>model</b>.</p>" },
    { t: "analogy", title: "How a child learns what a cat is", html: "<p>Nobody gives a child a rulebook (\"four legs, whiskers, pointy ears…\"). Parents just point: <i>cat, dog, cat, cat, dog</i>. After enough examples the child recognises a cat they have never seen. Machine learning works the same way: examples with answers in, a rule out.</p>" },
    { t: "table", head: ["Traditional programming", "Machine learning"], rows: [["you write the rules", "the computer finds the rules"], ["data + rules → answers", "data + answers → rules (a model)"], ["`if hours >= 5: ...`", "learn the best cut-off from past students"]] },
    { t: "ar", html: "في البرمجة التقليدية نكتب القواعد بأنفسنا. في تعلم الآلة نعطي الحاسب أمثلة مع إجاباتها فيستنتج القاعدة بنفسه، والقاعدة المستنتجة تسمى \"النموذج\"." },

    { t: "h", text: "A rule you write vs a rule the computer learns" },
    { t: "p", html: "<p>Let us see the difference with code you can already read. First, a rule written by hand; then a tiny program that <b>discovers</b> a rule from data.</p>" },
    { t: "code", code: c`def rule(hours, attendance):
    if hours >= 5 and attendance >= 70:
        return "pass"
    return "fail"

print(rule(6, 80), rule(2, 90))`, before: "<p>A teacher guessed a rule for predicting who passes. Run it.</p>", note: "<p>Line by line:</p><ul><li>The function takes two numbers about a student: study hours per week and attendance %.</li><li>The <code>if</code> holds a rule the <b>teacher invented</b>: at least 5 hours <b>and</b> at least 70% attendance means pass.</li><li><code>rule(6, 80)</code> → <code>pass</code>, <code>rule(2, 90)</code> → <code>fail</code>.</li></ul><p>But why 5 and why 70? It is a guess. If the guess is wrong, the program is wrong forever. Machine learning replaces the guess with numbers taken from real data.</p>" },
    { t: "code", code: c`hours = [1, 2, 3, 4, 6, 7, 8, 9]
passed = [False, False, False, True, True, True, True, True]
best_cut, best_right = 0, 0
for cut in range(1, 10):
    right = sum((h >= cut) == p for h, p in zip(hours, passed))
    if right > best_right:
        best_cut, best_right = cut, right
print("Learned: pass if hours >=", best_cut, "| correct:", best_right)`, before: "<p>Here we have last year's students: their study hours and whether they passed. The program tries every possible cut-off and keeps the one that is right most often. That is learning!</p>", note: "<p>Line by line:</p><ul><li><code>hours</code> and <code>passed</code> are the <b>examples with answers</b>: student 0 studied 1 hour and failed, and so on.</li><li>The <code>for</code> loop tries each cut-off from 1 to 9.</li><li><code>zip(hours, passed)</code> walks through both lists together, giving pairs like <code>(1, False)</code>. For each student, <code>h &gt;= cut</code> is our guess (True = pass) and <code>== p</code> checks it against the real answer.</li><li><code>sum(...)</code> adds up the True results (True counts as 1), so <code>right</code> is how many students that cut-off predicts correctly.</li><li>The <code>if</code> keeps the best cut-off seen so far (the \"champion\" pattern from Day 5).</li></ul><p>Output: <code>Learned: pass if hours &gt;= 4 | correct: 8</code>. Nobody typed the 4: the program <b>found</b> it in the data. Real ML algorithms are smarter, but the idea is exactly this.</p>" },
    { t: "ar", html: "القاعدة المكتوبة يدويًا مجرد تخمين. أما البرنامج المتعلم فيجرب الاحتمالات على أمثلة حقيقية ويختار القاعدة التي تصيب أكثر، وهذه هي فكرة التعلم." },

    { t: "h", text: "The vocabulary: samples, features, labels" },
    { t: "p", html: "<p>Machine learning has its own words. They sound fancy but they name simple things you already use. In all ML code, the inputs are called <code>X</code> (capital, because it is a table) and the answers <code>y</code> (small, because it is one list).</p>" },
    { t: "table", head: ["Term", "Meaning", "Example: predicting pass/fail"], rows: [["sample", "one example (a row)", "one student"], ["features (X)", "the inputs we measure", "hours studied, attendance %"], ["label (y)", "the answer we want to predict", "pass / fail"], ["model", "the learned rule", "\"study ≥ 4h → pass\""], ["training set", "examples the model learns from", "last year's students"], ["test set", "unseen examples to check it", "students it never saw"]] },
    { t: "code", code: c`# features: [hours studied per week, attendance %]
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]
print(len(X), "samples,", len(X[0]), "features each")
print("sample 2:", X[2], "-> label:", y[2])`, before: "<p>This is the dataset we will use all day. Run it and match each row of <code>X</code> with the label at the same position in <code>y</code>.</p>", note: "<p>Line by line:</p><ul><li><code>X</code> is a list of lists: one inner list per student (a <b>sample</b>), holding two <b>features</b>, hours and attendance.</li><li><code>y</code> holds the <b>labels</b>, in the <b>same order</b>: <code>X[0]</code> belongs to <code>y[0]</code>, <code>X[1]</code> to <code>y[1]</code>, and so on.</li><li><code>len(X)</code> → 6 samples; <code>len(X[0])</code> → 2 features.</li><li>Sample 2 is <code>[8, 90]</code> with label <code>pass</code>: 8 hours, 90% attendance, passed.</li></ul><p>The most important rule: <b>X and y must stay lined up</b>. If you shuffle one without the other, every answer belongs to the wrong student.</p>" },
    { t: "p", html: "<p>There are two big kinds of prediction. <b>Classification</b> predicts a <b>category</b>: pass/fail, spam/not spam, which flower. <b>Regression</b> predicts a <b>number</b>: a house price, tomorrow's temperature, an exam mark.</p>" },
    { t: "code", code: c`X = [[2, 50], [8, 90], [5, 70]]
y_class = ["fail", "pass", "pass"]
y_number = [48, 91, 72]
print("classification labels:", y_class)
print("regression labels:", y_number)`, before: "<p>The same students, two different questions. Look at the type of the labels.</p>", note: "<p>Line by line:</p><ul><li><code>X</code> has the same kind of features as before.</li><li><code>y_class</code> holds <b>categories</b> (strings from a small fixed set): predicting it is <b>classification</b>.</li><li><code>y_number</code> holds the actual exam <b>marks</b>: predicting it is <b>regression</b>. A prediction like 73.5 makes sense here, but \"halfway between pass and fail\" makes no sense for categories.</li></ul><p>Quick test: if the answer is a word from a list of options, it is classification; if it is a quantity you could measure, it is regression. Today we do classification; on Day 25 you will also do regression.</p>" },
    { t: "ar", html: "العينة صف واحد (طالب)، والخصائص X هي المدخلات (الساعات والحضور)، والتصنيف y هو الإجابة. يجب أن تبقى X و y بنفس الترتيب. التصنيف يتنبأ بفئة، والانحدار (regression) يتنبأ برقم." },
    { t: "predict", code: c`X = [[5, 1], [3, 0], [9, 1]]
y = ["yes", "no", "yes"]
print(len(X), len(X[0]), y[1])`, explain: "<code>X</code> has 3 rows (samples), each with 2 numbers (features), and <code>y[1]</code> is the label of the second sample. Output: <code>3 2 no</code>." },

    { t: "h", text: "Measuring how similar two samples are: distance" },
    { t: "p", html: "<p>Today's algorithm is based on a simple idea: <b>similar students get similar results</b>. To use it, we need a number that says how similar two students are. We treat each student as a <b>point on a map</b> (hours across, attendance up) and measure the straight-line distance between the points. Small distance = very similar.</p>" },
    { t: "analogy", title: "Distance on a map", html: "<p>Walk 3 blocks east and 4 blocks north: how far are you, in a straight line, from where you started? 5 blocks. That is the Pythagoras rule from school: √(3² + 4²) = √25 = 5. We do exactly the same with features: the \"blocks\" are the differences in hours and in attendance.</p>" },
    { t: "code", code: c`import math
a = [2, 50]
b = [8, 90]
d = math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)
print(round(d, 2))
print(round(math.dist(a, b), 2))`, before: "<p>Two students: A studied 2 hours with 50% attendance, B studied 8 hours with 90%. How far apart are they?</p>", note: "<p>Line by line:</p><ul><li><code>a[0] - b[0]</code> is the difference in hours: 2 − 8 = −6. Squared: 36.</li><li><code>a[1] - b[1]</code> is the difference in attendance: 50 − 90 = −40. Squared: 1600. (Squaring removes the minus sign.)</li><li><code>math.sqrt(36 + 1600)</code> = √1636 ≈ <code>40.45</code>.</li><li><code>math.dist(a, b)</code> is a ready-made function in the <code>math</code> module that does the same calculation for any number of features → also <code>40.45</code>.</li></ul><p>This is called the <b>Euclidean distance</b>. It is the same formula you will see in numpy (Day 23) and inside scikit-learn tomorrow.</p>" },
    { t: "ar", html: "نعتبر كل عينة نقطة على خريطة، ونقيس التشابه بالمسافة المستقيمة: الجذر التربيعي لمجموع مربعات الفروق. المسافة الصغيرة تعني تشابهًا كبيرًا، و math.dist تحسبها مباشرة." },
    { t: "predict", code: c`import math
print(math.dist([0, 0], [3, 4]), math.dist([1, 1], [1, 1]))`, explain: "From (0, 0) to (3, 4): √(9 + 16) = √25 = <code>5.0</code>, the map example. A point to itself has distance <code>0.0</code>: identical samples are as similar as possible." },

    { t: "h", text: "k-nearest neighbors: ask your neighbors" },
    { t: "analogy", title: "Judging a new restaurant", html: "<p>To guess if you will like a new restaurant, you think of the 3 restaurants <b>most similar</b> to it that you have already tried, and go with the majority opinion: two liked, one disliked → you will probably like it. That is <b>k-NN</b> (k-nearest neighbors) with k = 3: find the k training examples with the smallest distance, and let them vote.</p>" },
    { t: "p", html: "<p>k-NN has three steps: (1) compute the distance from the new sample to <b>every</b> training sample, (2) keep the k closest, (3) take a majority vote of their labels. We build each step separately.</p>" },
    { t: "code", code: c`import math
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]
new = [6, 80]
dists = []
for i in range(len(X)):
    dists.append((round(math.dist(new, X[i]), 1), y[i]))
print(dists)
dists.sort()
print(dists[:3])`, before: "<p>Steps 1 and 2. A new student studied 6 hours with 80% attendance. Who are the 3 most similar students?</p>", note: "<p>Line by line:</p><ul><li>The loop visits every training student <code>i</code> and stores a <b>tuple</b> <code>(distance, label)</code>, rounded to 1 decimal so it is easy to read.</li><li>First print: <code>[(30.3, 'fail'), (20.2, 'fail'), (10.2, 'pass'), (5.1, 'pass'), (40.3, 'fail'), (15.3, 'pass')]</code>, in the original order.</li><li><code>dists.sort()</code> sorts the tuples. Tuples are compared by their <b>first</b> item first, so they are sorted by distance, smallest first.</li><li><code>dists[:3]</code> is the 3 nearest neighbors: <code>[(5.1, 'pass'), (10.2, 'pass'), (15.3, 'pass')]</code>.</li></ul><p>Putting the distance first in the tuple is the trick that makes a plain <code>sort()</code> do the right thing.</p>" },
    { t: "code", code: c`nearest = ["pass", "pass", "fail"]
counts = {}
for label in nearest:
    counts[label] = counts.get(label, 0) + 1
print(counts)
print(max(counts, key=counts.get))`, before: "<p>Step 3: the vote. Suppose the 3 nearest neighbors have these labels. Which label wins?</p>", note: "<p>Line by line:</p><ul><li>We count the labels with a dictionary (Day 12): <code>counts.get(label, 0)</code> gives the current count, or 0 if the label is new, and we add 1.</li><li><code>print(counts)</code> → <code>{'pass': 2, 'fail': 1}</code>.</li><li><code>max(counts, key=counts.get)</code> looks at the keys but compares them by their counts (the <code>key=</code> idea from Day 16) → <code>pass</code>, the label with the most votes.</li></ul><p>This is the <b>majority vote</b>.</p>" },
    { t: "code", code: c`from collections import Counter
votes = ["pass", "fail", "pass"]
print(Counter(votes))
print(Counter(votes).most_common(1))
print(Counter(votes).most_common(1)[0][0])`, before: "<p>Counting is so common that Python has a ready-made tool for it: <code>Counter</code> from the <code>collections</code> module.</p>", note: "<p>Line by line:</p><ul><li><code>Counter(votes)</code> counts everything in one step → <code>Counter({'pass': 2, 'fail': 1})</code>. It behaves like the dictionary we built by hand.</li><li><code>.most_common(1)</code> returns a list with the top 1 item as a <code>(label, count)</code> tuple → <code>[('pass', 2)]</code>.</li><li><code>[0]</code> takes the first tuple from that list, and the second <code>[0]</code> takes the label out of the tuple → <code>pass</code>.</li></ul><p>When two labels tie, <code>most_common</code> lists the one it saw <b>first</b> first. Both ways of voting are fine; use whichever you understand best.</p>" },
    { t: "viz", code: c`import math
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]
def predict(new, k=3):
    dists = sorted((math.dist(new, X[i]), y[i]) for i in range(len(X)))
    votes = [label for d, label in dists[:k]]
    return max(set(votes), key=votes.count)
print(predict([6, 80]))
print(predict([2, 45]))`, before: "<p>Now all three steps in one function: a complete machine-learning classifier in 4 lines. Visualize it (it is short!) and watch the distances being sorted.</p>", note: "<p>Line by line:</p><ul><li><code>sorted(... for i in range(len(X)))</code> builds the <code>(distance, label)</code> pairs for all students and sorts them, steps 1 and 2 in one line. It is the loop from before, written in the short comprehension style of Day 10.</li><li><code>[label for d, label in dists[:k]]</code> takes the k nearest pairs and keeps only their labels.</li><li><code>max(set(votes), key=votes.count)</code> is a one-line vote: <code>set(votes)</code> gives each different label once, and <code>key=votes.count</code> picks the one that appears most often in <code>votes</code>.</li><li><code>predict([6, 80])</code> → <code>pass</code> (all 3 neighbors passed); <code>predict([2, 45])</code> → <code>fail</code>.</li></ul><p>Notice there is no <code>if hours &gt;= ...</code> anywhere: the \"rule\" lives entirely in the data.</p>" },
    { t: "ar", html: "خوارزمية أقرب الجيران k-NN: نحسب المسافة من العينة الجديدة إلى كل عينات التدريب، ثم نأخذ أقرب k منها، ثم تصويت الأغلبية على تصنيفاتها. نضع المسافة أولًا في الصف (tuple) حتى يرتب sort حسب المسافة." },

    { t: "h", text: "Choosing k" },
    { t: "p", html: "<p><code>k</code> is how many neighbors get a vote. It is a setting <b>you</b> choose before the model runs. Too small (k = 1) and one unusual neighbor can fool the model; too big and far-away samples that are not similar at all get a vote too.</p>" },
    { t: "code", code: c`import math
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]
def predict(new, k):
    dists = sorted((math.dist(new, X[i]), y[i]) for i in range(len(X)))
    votes = [label for d, label in dists[:k]]
    return max(set(votes), key=votes.count)
for k in [1, 3, 5]:
    print("k =", k, "->", predict([6, 70], k))`, before: "<p>The same new student [6, 70], three different values of k. Run it and watch the answer change.</p>", note: "<p>Sorted by distance, the neighbors of [6, 70] are: <code>[3, 60]</code> fail (10.4), <code>[7, 85]</code> pass (15.0), <code>[8, 90]</code> pass (20.1), <code>[2, 50]</code> fail (20.4), <code>[9, 95]</code> pass (25.2), …</p><ul><li><b>k = 1</b>: only the nearest votes, and it failed → <code>fail</code>.</li><li><b>k = 3</b>: fail, pass, pass → <code>pass</code> wins 2 to 1.</li><li><b>k = 5</b>: fail, pass, pass, fail, pass → <code>pass</code> wins 3 to 2.</li></ul><p>Use an <b>odd</b> k when there are two labels: with k = 2 or 4 the vote can end in a tie. Finding a good k is done by testing, which is the next topic.</p>" },
    { t: "ar", html: "k هو عدد الجيران الذين يصوتون، ونحن نختاره. k صغير جدًا يتأثر بجار واحد غريب، و k كبير جدًا يُدخل جيرانًا بعيدين. استخدم{{g:|ي}} k فرديًا مع تصنيفين حتى لا يتعادل التصويت." },
    { t: "predict", code: c`votes = ["dog", "cat", "dog", "cat", "dog"]
print(max(set(votes), key=votes.count))`, explain: "<code>\"dog\"</code> appears 3 times and <code>\"cat\"</code> 2 times, so the vote is won by <code>dog</code>. With an odd number of votes and two labels, there can never be a tie." },

    { t: "h", text: "Accuracy: how often is the model right?" },
    { t: "p", html: "<p>To know if a model is any good, we let it predict samples whose answers we already know, and count how many it gets right. <b>Accuracy</b> = correct predictions ÷ total predictions. 0.75 means 75% correct.</p>" },
    { t: "code", code: c`def accuracy(predicted, actual):
    correct = sum(p == a for p, a in zip(predicted, actual))
    return correct / len(actual)

print(accuracy(["pass", "fail", "pass", "pass"], ["pass", "fail", "fail", "pass"]))`, before: "<p>Four predictions compared with the four real answers. Before running, compare the two lists by eye.</p>", note: "<p>Line by line:</p><ul><li><code>zip(predicted, actual)</code> pairs them up: <code>(\"pass\", \"pass\")</code>, <code>(\"fail\", \"fail\")</code>, <code>(\"pass\", \"fail\")</code>, <code>(\"pass\", \"pass\")</code>.</li><li><code>p == a</code> is True for a correct prediction. <code>sum</code> counts the Trues: 3.</li><li><code>3 / 4</code> → <code>0.75</code>: the model was right 75% of the time.</li></ul><p>The longer way, a loop with <code>if p == a: correct += 1</code>, does exactly the same thing.</p>" },
    { t: "code", code: c`labels = ["pass"] * 8 + ["fail"] * 2
always_pass = ["pass"] * len(labels)
correct = sum(p == a for p, a in zip(always_pass, labels))
print(correct / len(labels))`, before: "<p>Is 80% accuracy good? Not always! Here is a \"model\" that does not think at all: it says <code>pass</code> for everybody.</p>", note: "<p>Line by line:</p><ul><li><code>[\"pass\"] * 8 + [\"fail\"] * 2</code> builds a list of 10 real answers: 8 passes and 2 fails (list repetition from Day 10).</li><li><code>always_pass</code> is 10 times <code>\"pass\"</code>: the lazy model.</li><li>It is right for all 8 passing students → <code>0.8</code>.</li></ul><p>This is called the <b>baseline</b>: the accuracy of always guessing the most common answer. A real model is only useful if it <b>beats the baseline</b>. Always check it before celebrating.</p>" },
    { t: "ar", html: "الدقة = عدد التنبؤات الصحيحة ÷ عدد التنبؤات. لكن انتبه{{g:|ي}} للخط الأساسي (baseline): نموذج يخمّن دائمًا الإجابة الأكثر شيوعًا قد يحصل على دقة عالية دون أن يتعلم شيئًا." },

    { t: "h", text: "Testing honestly: train/test split and overfitting" },
    { t: "analogy", title: "Memorizing the exam", html: "<p>A student who memorizes last year's exam answers scores 100% on <i>last year's</i> exam, but may fail this year's exam with new questions. A model can do the same: perfect on the examples it learned from, bad on new ones. This is called <b>overfitting</b>. The cure: test on questions the student has <b>never seen</b>.</p>" },
    { t: "code", code: c`import math
X = [[2, 50], [3, 60], [8, 90], [7, 85], [1, 40], [9, 95]]
y = ["fail", "fail", "pass", "pass", "fail", "pass"]
def nearest_label(new):
    best = min(range(len(X)), key=lambda i: math.dist(new, X[i]))
    return y[best]
preds = [nearest_label(x) for x in X]
print(preds == y)`, before: "<p>Here is the cheating experiment: a 1-NN model is asked to predict the very students it learned from.</p>", note: "<p>Line by line:</p><ul><li><code>min(range(len(X)), key=lambda i: math.dist(new, X[i]))</code> finds the <b>index</b> of the closest training student. <code>lambda i: ...</code> (Day 16) is a tiny function that gives each index its distance, and <code>min</code> picks the index with the smallest one.</li><li>We predict every student in <code>X</code>, the same students the model \"knows\".</li><li><code>preds == y</code> → <code>True</code>: 100% correct!</li></ul><p>Of course: each student's nearest neighbor is <b>themselves</b> (distance 0). The score tells us nothing about new students. That is why we always keep a <b>test set</b> apart.</p>" },
    { t: "code", code: c`import random
data = list(range(10))
random.seed(1)
random.shuffle(data)
cut = int(len(data) * 0.8)
train, test = data[:cut], data[cut:]
print(train, test)`, before: "<p>The standard recipe: shuffle the samples, keep 80% for training and 20% for testing. Here the \"samples\" are just the numbers 0–9 so you can see where each one goes.</p>", note: "<p>Line by line:</p><ul><li><code>random.seed(1)</code> fixes the random sequence, so you get the same shuffle every run (repeatable experiments).</li><li><code>random.shuffle(data)</code> mixes the list in place. We shuffle because data is often sorted (e.g. all fails first), and we want both parts to look like the whole.</li><li><code>int(10 * 0.8)</code> → <code>cut = 8</code>.</li><li><code>data[:cut]</code> is the first 8 (training), <code>data[cut:]</code> the last 2 (testing) → <code>[6, 8, 9, 7, 5, 3, 0, 4] [1, 2]</code>.</li></ul><p>Every sample ends up in exactly <b>one</b> of the two parts, never both.</p>" },
    { t: "code", code: c`import random
X = [[1], [2], [3], [4], [5]]
y = ["a", "b", "c", "d", "e"]
idx = list(range(len(X)))
random.Random(0).shuffle(idx)
print(idx)
print([X[i] for i in idx], [y[i] for i in idx])`, before: "<p>With real data there are <b>two</b> lists, X and y. If you shuffle them separately, labels end up with the wrong samples. The fix: shuffle the <b>positions</b>, then use them for both lists.</p>", note: "<p>Line by line:</p><ul><li><code>idx</code> is <code>[0, 1, 2, 3, 4]</code>, the positions of the samples.</li><li><code>random.Random(0)</code> creates a private random generator with seed 0, and <code>.shuffle(idx)</code> mixes the positions → <code>[2, 1, 0, 4, 3]</code>. (It works like <code>random.seed(0)</code> followed by <code>random.shuffle</code>.)</li><li>Both comprehensions read the lists in that new order: <code>[[3], [2], [1], [5], [4]]</code> and <code>['c', 'b', 'a', 'e', 'd']</code>.</li></ul><p><code>[3]</code> is still paired with <code>'c'</code>: every sample keeps its own label. Now you could slice off the first part as the test set. scikit-learn's <code>train_test_split</code> (Day 25) does exactly this.</p>" },
    { t: "ar", html: "اختبار النموذج على بيانات التدريب نفسها غش: سيحصل على 100% كالطالب الذي حفظ الإجابات (فرط التخصيص overfitting). لذلك نخلط البيانات ونقسمها إلى تدريب واختبار، ونخلط المواقع (indexes) حتى يبقى كل X مع تصنيفه y." },

    { t: "h", text: "Feature scaling: making features fair" },
    { t: "p", html: "<p>There is a hidden problem in our data: attendance goes up to 100, but hours only to about 10. A difference of 10 in attendance is small, but a difference of 6 in hours is huge, yet the distance formula treats them the same. So attendance <b>dominates</b> the distance.</p>" },
    { t: "code", code: c`import math
new = [8, 60]
A = [2, 62]
B = [8, 70]
print(round(math.dist(new, A), 1), round(math.dist(new, B), 1))
scale = lambda s: [s[0] / 10, s[1] / 100]
print(round(math.dist(scale(new), scale(A)), 2), round(math.dist(scale(new), scale(B)), 2))`, before: "<p>A new student studies 8 hours. A studies only 2 hours; B studies exactly 8 hours too. Who should count as more similar? Run it.</p>", note: "<p>Line by line:</p><ul><li>Raw distances: to A <code>6.3</code>, to B <code>10.0</code>. So A looks <b>more similar</b>, although A studies 6 hours less! The 10-point attendance gap to B outweighs everything.</li><li><code>scale</code> is a tiny lambda that divides hours by 10 and attendance by 100, so both features run from 0 to about 1.</li><li>Scaled distances: to A <code>0.6</code>, to B <code>0.1</code>. Now B is clearly the closest, which matches common sense.</li></ul><p>Bringing features to similar ranges is called <b>feature scaling</b>. Distance-based models like k-NN need it.</p>" },
    { t: "code", code: c`col = [50, 60, 90, 85, 40, 95]
lo, hi = min(col), max(col)
scaled = [round((v - lo) / (hi - lo), 2) for v in col]
print(scaled)`, before: "<p>The usual way to scale one feature column: <b>min-max scaling</b>, the <code>normalize</code> idea from Day 23. The smallest value becomes 0, the largest becomes 1.</p>", note: "<p>Line by line:</p><ul><li><code>col</code> is the attendance column of our students.</li><li><code>lo = 40</code> and <code>hi = 95</code>.</li><li>For each value: <code>(v - lo) / (hi - lo)</code>. For 50: (50 − 40) / 55 ≈ 0.18. For 40: 0. For 95: 1.</li><li>Output: <code>[0.18, 0.36, 0.91, 0.82, 0.0, 1.0]</code>.</li></ul><p>You would do the same for the hours column, so both features live between 0 and 1. Many \"the model is bad\" problems are really data-preparation problems like this.</p>" },
    { t: "ar", html: "إذا كانت أرقام خاصية كبيرة (مثل الحضور حتى 100) ستطغى على خاصية أرقامها صغيرة (مثل الساعات حتى 10) في حساب المسافة. الحل: تحجيم الخصائص إلى مدى متقارب، مثل (x - min) / (max - min)." },

    { t: "h", text: "Putting it together: a complete experiment" },
    { t: "code", code: c`import math, random
data = [([2, 50], "fail"), ([3, 60], "fail"), ([8, 90], "pass"), ([7, 85], "pass"), ([1, 40], "fail"),
        ([9, 95], "pass"), ([4, 55], "fail"), ([6, 80], "pass"), ([5, 65], "fail"), ([7, 70], "pass")]
random.Random(7).shuffle(data)
train, test = data[:7], data[7:]
def predict(new, k=3):
    dists = sorted((math.dist(new, f), label) for f, label in train)
    votes = [label for d, label in dists[:k]]
    return max(set(votes), key=votes.count)
correct = 0
for features, label in test:
    guess = predict(features)
    print(features, "real:", label, "| guess:", guess)
    correct += guess == label
print("accuracy:", round(correct / len(test), 2))`, together: true, before: "<p>A real machine-learning experiment from start to finish: shuffle, split, train, predict the unseen students, measure accuracy. Run it, then change the seed <code>7</code> to other numbers: the split changes, and so may the accuracy.</p>", note: "<p>How it works:</p><ul><li>Each sample is a tuple <code>(features, label)</code>, so features and label <b>travel together</b> when we shuffle. This is another way to keep X and y lined up.</li><li><code>random.Random(7).shuffle(data)</code> mixes the samples in a repeatable way; then the first 7 become the <b>training set</b> and the last 3 the <b>test set</b>.</li><li><code>predict</code> is our k-NN: distances to the <b>training</b> samples only, the 3 nearest, majority vote. The test students are never used for learning.</li><li>The loop predicts each test student and prints the real label next to the guess. <code>correct += guess == label</code> adds 1 when they match (True counts as 1).</li><li>With seed 7 the test students are <code>[4, 55]</code>, <code>[8, 90]</code> and <code>[9, 95]</code>; all 3 are predicted correctly → <code>accuracy: 1.0</code>.</li></ul><p>With only 3 test samples, one mistake changes accuracy by 33%. That is why real datasets are much bigger. Tomorrow scikit-learn will do all of this in about 5 lines.</p>" },
    { t: "ar", html: "التجربة الكاملة: نخلط البيانات، نقسمها إلى تدريب واختبار، نتنبأ بعينات الاختبار باستخدام عينات التدريب فقط، ثم نحسب الدقة. ربطنا كل خصائص مع تصنيفها في tuple حتى لا ينفصلا عند الخلط." },
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

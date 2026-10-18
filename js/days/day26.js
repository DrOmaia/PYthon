window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[26] = {
  title: "Text classification and a mini chatbot",
  intro: "Spam filters, review ratings, customer-support bots, and the first step of every chat assistant all start with the same question: <b>what is this text about?</b> Today you turn words into numbers, train a text classifier, and build a small chatbot that understands what the user wants — in English and Arabic.",
  introAr: "اليوم نعلّم الحاسب فهم النصوص: نحول الكلمات إلى أرقام (Bag of Words)، وندرّب مصنّفًا يعرف هل التعليق إيجابي أم سلبي، ثم نبني روبوت محادثة صغيرًا يفهم نية المستخدم. ويعمل بالعربي أيضًا!",
  goals: ["Explain bag-of-words: turning text into numbers", "Use `CountVectorizer` and `TfidfVectorizer`", "Train a Naive Bayes text classifier with a pipeline", "Build an intent-based chatbot", "Discuss limits and bias of AI models"],
  learn: [
    { t: "h", text: "Why teach a computer to read?" },
    { t: "p", html: "<p>Every day, machines answer one question about text: <b>what is this text about?</b> Your email app decides if a message is spam. A shop reads thousands of reviews and counts how many are happy. A support bot reads <i>\"when do you close?\"</i> and knows you are asking about opening hours. Today you will build all three ideas in small form: turn words into numbers, train a <b>text classifier</b>, and build a tiny <b>chatbot</b>.</p><p>The big problem: the models from Days 24–25 only understand <b>numbers</b> (tables of features). Text is letters. So step one is always the same — turn text into a row of numbers.</p>" },
    { t: "analogy", title: "Sorting the mail", html: "<p>Imagine a university mail room. A clerk does not read every letter carefully. She glances at the words: <i>\"invoice\", \"payment\"</i> → finance office; <i>\"exam\", \"grade\"</i> → registrar. She learned these clues from years of sorting. A text classifier does the same: it learns which <b>words</b> are clues for which <b>box</b>, from examples that were already sorted.</p>" },
    { t: "ar", html: "النماذج لا تفهم إلا الأرقام، لذلك أول خطوة في أي مشروع نصوص هي تحويل النص إلى أرقام. بعدها نستخدم نفس فكرة التعلم من الأمثلة التي رأيناها في الأيام السابقة." },

    { t: "h", text: "Computers need numbers: bag of words" },
    { t: "p", html: "<p>The simplest way to turn text into numbers is called <b>bag of words</b>. Two steps: (1) collect every different word from all sentences — this list is the <b>vocabulary</b>; (2) for each sentence, count how many times each vocabulary word appears. Let's do it by hand with tools you already know.</p>" },
    { t: "code", code: c`sentences = ["I love Python", "I love coffee", "Python is hard"]
vocab = set()
for s in sentences:
    for w in s.lower().split():
        vocab.add(w)
vocab = sorted(vocab)
print(vocab)`, before: "<p>Step 1: build the vocabulary. Run it and count the words in the output.</p>", note: "<p>Line by line:</p><ul><li><code>vocab = set()</code> starts an empty set. A set keeps each value <b>once</b> (Day 11), so repeated words like \"love\" are stored only one time.</li><li>The outer loop takes one sentence at a time; <code>s.lower().split()</code> makes it lowercase and cuts it into words, so \"Python\" and \"python\" count as the same word.</li><li><code>sorted(vocab)</code> turns the set into an alphabetically sorted <b>list</b>. The order matters: it fixes which column means which word.</li></ul><p>Output: <code>['coffee', 'hard', 'i', 'is', 'love', 'python']</code> — six words, so every sentence will become a row of six numbers.</p>" },
    { t: "code", code: c`from collections import Counter
vocab = ['coffee', 'hard', 'i', 'is', 'love', 'python']
for s in ["I love Python", "Python is hard"]:
    counts = Counter(s.lower().split())
    row = [counts[w] for w in vocab]
    print(row, "<-", s)`, before: "<p>Step 2: count. Each sentence becomes a row with one number per vocabulary word. Match each number with the word in the same position of <code>vocab</code>.</p>", note: "<p>Line by line:</p><ul><li><code>Counter(...)</code> (Day 12) counts the words of one sentence, for example <code>{'i': 1, 'love': 1, 'python': 1}</code>.</li><li><code>[counts[w] for w in vocab]</code> is a list comprehension: for every vocabulary word, in order, take its count. A <code>Counter</code> answers <code>0</code> for a word it never saw, instead of crashing like a normal dict.</li></ul><p>Output: <code>[0, 0, 1, 0, 1, 1] &lt;- I love Python</code> (one \"i\", one \"love\", one \"python\") and <code>[0, 1, 0, 1, 0, 1] &lt;- Python is hard</code>. The sentence is now a row of numbers — exactly the kind of feature row the models from Days 24–25 need.</p>" },
    { t: "analogy", title: "Why \"bag\"?", html: "<p>Cut a sentence into word cards and drop them into a bag. Shake it. You still know <b>which</b> words are inside and <b>how many</b> of each, but not their order. That is all bag of words keeps. Surprisingly, for questions like \"happy or angry?\" or \"spam or not?\", the words alone are usually enough.</p>" },
    { t: "predict", code: c`from collections import Counter
vocab = ["bites", "dog", "man"]
a = Counter("dog bites man".split())
b = Counter("man bites dog".split())
print([a[w] for w in vocab], [b[w] for w in vocab])`, explain: "Both sentences contain the same three words once each, so both rows are <code>[1, 1, 1]</code>. Output: <code>[1, 1, 1] [1, 1, 1]</code>. The two stories are very different, but bag of words cannot tell them apart — order is lost. That is the price of this simple method." },
    { t: "ar", html: "Bag of Words: نجمع كل الكلمات المختلفة (المفردات)، ثم نحول كل جملة إلى صف من الأعداد: كم مرة ظهرت كل كلمة. انتبه{{g:|ي}}: ترتيب الكلمات يضيع، فجملة \"dog bites man\" و\"man bites dog\" لهما نفس الصف." },

    { t: "h", text: "CountVectorizer: bag of words done for you" },
    { t: "p", html: "<p>scikit-learn has a tool that does both steps for you: <code>CountVectorizer</code>. A tool that turns text into numbers is called a <b>vectorizer</b> (a row of numbers is also called a <b>vector</b>). It follows the same <code>fit</code> pattern as the models from yesterday: <code>fit</code> <b>learns</b> the vocabulary, <code>transform</code> <b>uses</b> it to count.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
docs = ["I love Python", "I love coffee", "Python is hard"]
vec = CountVectorizer()
vec.fit(docs)
print(vec.get_feature_names_out())`, before: "<p>First only <code>fit</code>: let the vectorizer read the sentences and build its vocabulary. Compare it with the vocabulary we built by hand.</p>", note: "<p>Line by line:</p><ul><li>Line 1 imports the class from scikit-learn's text tools.</li><li><code>vec = CountVectorizer()</code> creates an empty vectorizer. It knows no words yet.</li><li><code>vec.fit(docs)</code> reads all sentences, lowercases them, splits them into words and remembers the sorted vocabulary.</li><li><code>get_feature_names_out()</code> shows that vocabulary (a numpy array, so no commas).</li></ul><p>Output: <code>['coffee' 'hard' 'is' 'love' 'python']</code>. Where is \"i\"? By default <code>CountVectorizer</code> <b>ignores one-letter words</b> and punctuation, because they rarely carry meaning. Otherwise it is exactly our hand-made vocabulary.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
docs = ["I love Python", "I love coffee", "Python is hard"]
vec = CountVectorizer()
X = vec.fit_transform(docs)
print(X.toarray())`, before: "<p>Now count. <code>fit_transform</code> is a shortcut for <code>fit</code> then <code>transform</code> on the same data. Read each output row with the vocabulary <code>coffee, hard, is, love, python</code>.</p>", note: "<p>Line by line:</p><ul><li><code>vec.fit_transform(docs)</code> learns the vocabulary <b>and</b> counts each sentence in one call.</li><li><code>X</code> is a <b>sparse matrix</b>: a memory-saving table that only stores the non-zero numbers (real texts have thousands of vocabulary words, mostly zeros).</li><li><code>X.toarray()</code> turns it into a normal numpy array so we can read it.</li></ul><p>Output, one row per sentence:</p><pre class=\"code-static\">[[0 0 0 1 1]   I love Python\n [1 0 0 1 0]   I love coffee\n [0 1 1 0 1]]  Python is hard</pre><p>This table <code>X</code> is the feature table — one row per text, one column per word.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
vec = CountVectorizer()
vec.fit(["I love Python", "I love coffee", "Python is hard"])
print(vec.transform(["I love love tea"]).toarray())`, before: "<p>What happens with a <b>new</b> sentence? We use <code>transform</code> only — no new <code>fit</code>. Notice the word \"tea\" was never seen during <code>fit</code>.</p>", note: "<p>Line by line:</p><ul><li>Line 3 learns the same five-word vocabulary as before.</li><li>Line 4 counts the new sentence <b>with that same vocabulary</b>: \"love\" appears twice → <code>2</code> in the \"love\" column; \"i\" is too short; \"tea\" is not in the vocabulary, so it is simply <b>ignored</b>.</li></ul><p>Output: <code>[[0 0 0 2 0]]</code>. This is the rule you must remember: <b>fit on training text once, then only transform new text</b>. If you called <code>fit</code> again on the new sentence, it would build a different vocabulary with different columns, and the model would read nonsense.</p>" },
    { t: "predict", code: c`from sklearn.feature_extraction.text import CountVectorizer
vec = CountVectorizer()
vec.fit(["I love Python", "I love coffee", "Python is hard"])
print(vec.transform(["Python is hard, I love it"]).toarray())`, explain: "The vocabulary is <code>coffee, hard, is, love, python</code>. The new sentence has hard, is, love and python once each; \"i\" is too short, \"it\" is unknown, and the comma is ignored. Output: <code>[[0 1 1 1 1]]</code>." },
    { t: "ar", html: "CountVectorizer يبني المفردات بـ fit ويحوّل النص إلى أعداد بـ transform. القاعدة الذهبية: fit مرة واحدة على نصوص التدريب، ثم transform فقط للنصوص الجديدة. والكلمات غير الموجودة في المفردات تُتجاهل." },

    { t: "h", text: "Training a classifier on short texts" },
    { t: "p", html: "<p>Now the fun part: teach a model to tell <b>positive</b> reviews from <b>negative</b> ones. This is called <b>sentiment analysis</b>. We give it a few reviews that a human already labeled, and it learns which words point to which label. The model we use is <b>Naive Bayes</b> (<code>MultinomialNB</code>), the classic choice for text.</p>" },
    { t: "analogy", title: "Naive Bayes is a clue counter", html: "<p>A detective keeps a notebook: \"the word <i>loved</i> appeared 3 times in happy reviews and 0 times in angry ones\". When a new review arrives, she looks at each word, checks her notebook, and adds up the evidence: <i>loved</i> → happy clue, <i>boring</i> → angry clue. Whichever side has more evidence wins. It is called <b>naive</b> because it treats every word as a separate clue and ignores how words work together.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
reviews = ["great course, loved it", "really fun and useful",
           "boring and too long", "terrible audio, hated it"]
labels = ["pos", "pos", "neg", "neg"]
vec = CountVectorizer()
X = vec.fit_transform(reviews)
model = MultinomialNB()
model.fit(X, labels)
print(model.predict(vec.transform(["fun course", "too boring"])))`, before: "<p>Read it in three parts: the data, the vectorizer, the model. Then try your own sentence in the last line.</p>", note: "<p>Line by line:</p><ul><li><code>reviews</code> are the texts, <code>labels</code> the answers in the same order (the first two are positive).</li><li><code>X = vec.fit_transform(reviews)</code> learns the vocabulary from the reviews and turns them into a table of counts — the <b>features</b>.</li><li><code>model.fit(X, labels)</code> trains Naive Bayes: it counts how often each word appears in <code>pos</code> and in <code>neg</code> reviews.</li><li>Last line: <code>vec.transform</code> turns the new reviews into counts with the <b>same</b> vocabulary, then <code>predict</code> gives a label for each.</li></ul><p>Output: <code>['pos' 'neg']</code>. \"fun\" and \"course\" were only seen in positive reviews; \"too\" and \"boring\" only in negative ones. Four examples are enough for a demo — a real model needs thousands.</p>" },
    { t: "p", html: "<p>Notice that we had to remember to call <code>vec.transform</code> before <code>predict</code>. Forgetting it is a very common bug. A <b>pipeline</b> glues the vectorizer and the model into <b>one</b> object, so raw text goes in and labels come out. <code>make_pipeline(A, B)</code> builds it: <code>fit</code> runs <code>A.fit_transform</code> then <code>B.fit</code>; <code>predict</code> runs <code>A.transform</code> then <code>B.predict</code>.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
reviews = ["great course, loved it", "amazing teacher and clear examples", "really fun and useful",
           "boring and too long", "terrible audio, hated it", "confusing and useless examples"]
labels = ["pos", "pos", "pos", "neg", "neg", "neg"]
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(reviews, labels)
print(model.predict(["loved the examples", "too confusing"]))`, before: "<p>The same idea with six reviews and a pipeline. Look for the moment we turn text into numbers — you will not find it, because the pipeline does it inside.</p>", note: "<p>Line by line:</p><ul><li>Line 3 imports <code>make_pipeline</code>.</li><li><code>model = make_pipeline(CountVectorizer(), MultinomialNB())</code>: step 1 vectorizes, step 2 classifies.</li><li><code>model.fit(reviews, labels)</code> gets <b>raw text</b>. Inside, the vectorizer learns the vocabulary and the Naive Bayes model learns from the counts.</li><li><code>model.predict([...])</code> also gets raw text; the pipeline transforms it with the same vocabulary automatically.</li></ul><p>Output: <code>['pos' 'neg']</code>. \"loved\" is a positive clue. \"examples\" appears once on each side, so it is neutral; \"the\" was never seen, so it is ignored. \"too\" and \"confusing\" are negative clues.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
reviews = ["great course, loved it", "amazing teacher and clear examples", "really fun and useful",
           "boring and too long", "terrible audio, hated it", "confusing and useless examples"]
labels = ["pos", "pos", "pos", "neg", "neg", "neg"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(reviews, labels)
tests = ["fun teacher", "the audio was boring"]
for t, p in zip(tests, model.predict(tests)):
    print(p, "<-", t)`, before: "<p>Two small upgrades: <code>fit</code> is chained on the same line (it returns the model itself), and <code>zip</code> prints each test next to its prediction. Add your own review to <code>tests</code>.</p>", note: "<p>Line by line:</p><ul><li><code>make_pipeline(...).fit(reviews, labels)</code> builds and trains in one line, because <code>fit</code> gives back the trained pipeline.</li><li><code>model.predict(tests)</code> returns one label per test, in the same order.</li><li><code>zip(tests, ...)</code> (Day 10) walks the two lists side by side, so <code>t</code> is a review and <code>p</code> its predicted label.</li></ul><p>Output:</p><pre class=\"code-static\">pos &lt;- fun teacher\nneg &lt;- the audio was boring</pre><p>\"fun\" and \"teacher\" were only in positive reviews; \"audio\" and \"boring\" only in negative ones.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
reviews = ["great course, loved it", "amazing teacher and clear examples", "really fun and useful",
           "boring and too long", "terrible audio, hated it", "confusing and useless examples"]
labels = ["pos", "pos", "pos", "neg", "neg", "neg"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(reviews, labels)
print(model.classes_)
print(model.predict_proba(["fun but too long"]).round(2))
print(model.predict_proba(["loved the examples"]).round(2))`, before: "<p>A label alone hides how <b>sure</b> the model is. <code>predict_proba</code> gives a probability for each class. Run it and compare the two reviews.</p>", note: "<p>Line by line:</p><ul><li><code>model.classes_</code> shows the order of the columns: <code>['neg' 'pos']</code> (alphabetical).</li><li><code>predict_proba([...])</code> returns one row per text with one probability per class; each row adds up to 1. <code>.round(2)</code> keeps 2 decimals.</li></ul><p>Output: <code>[[0.69 0.31]]</code> for \"fun but too long\": one positive clue (fun) against two negative ones (too, long), so 69% negative — but not very sure. \"loved the examples\" gives <code>[[0.35 0.65]]</code>: 65% positive. Probabilities let a program say \"I'm not sure\" instead of guessing silently.</p>" },
    { t: "ar", html: "نصنّف النصوص هكذا: نحول النص إلى أعداد بـ CountVectorizer ثم ندرّب MultinomialNB على الأمثلة المصنّفة. الـ pipeline تجمع الخطوتين، فندخل نصًا ونحصل على تصنيف. وانتبه{{g:|ي}}: بدون pipeline يجب أن تستدعي{{g:|ي}} vec.transform قبل predict." },

    { t: "h", text: "Arabic works too" },
    { t: "p", html: "<p>Nothing in bag of words is specific to English: <code>CountVectorizer</code> splits text at spaces and punctuation, so Arabic words become columns just like English ones. The labels can be any strings you like.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
texts = ["المنتج ممتاز وسريع", "خدمة رائعة وممتازة", "أحببت التطبيق جدا",
         "المنتج سيء ومتأخر", "خدمة سيئة جدا", "لم يعجبني التطبيق"]
labels = ["positive", "positive", "positive", "negative", "negative", "negative"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(texts, labels)
print(model.predict(["التوصيل ممتاز", "التطبيق سيء"]))`, before: "<p>The same pipeline with six Arabic shop reviews. Run it, then try your own review, for example <code>\"خدمة ممتازة\"</code>.</p>", note: "<p>Line by line:</p><ul><li><code>texts</code> are three positive and three negative reviews; <code>labels</code> are in the same order.</li><li>The pipeline is <b>exactly</b> the one from the English example — only the data changed.</li><li>For \"التوصيل ممتاز\": \"التوصيل\" was never seen (ignored), \"ممتاز\" appeared only in a positive review → <code>positive</code>. For \"التطبيق سيء\": \"التطبيق\" appears once on each side (neutral), \"سيء\" only on the negative side → <code>negative</code>.</li></ul><p>Output: <code>['positive' 'negative']</code>. Now try <code>\"خدمة ممتازة\"</code>: the model answers <code>negative</code> with 50/50 probability! Why? It learned \"وممتازة\" (with و attached), not \"ممتازة\", so for the model they are two unrelated words. Arabic attaches و، ال، ب to words, so real Arabic systems first clean words to their base form.</p>" },
    { t: "ar", html: "نفس الخطوات تعمل مع العربية: CountVectorizer يقسم النص عند المسافات. لكن انتبه{{g:|ي}}: \"ممتازة\" و\"وممتازة\" كلمتان مختلفتان تمامًا بالنسبة للنموذج، لذلك تحتاج{{g:|ين}} بيانات كثيرة أو تنظيف الكلمات من الحروف الملتصقة." },

    { t: "h", text: "A rule-based chatbot: keywords and if" },
    { t: "p", html: "<p>A chatbot has two jobs: understand <b>what the user wants</b> (the <b>intent</b>: a greeting? a price question?) and then answer. The oldest way to find the intent is with <b>rules</b> written by hand: <i>if the message contains \"hello\", it is a greeting</i>. You can build this with Day 5 tools only.</p>" },
    { t: "code", code: c`def bot(msg):
    words = msg.lower().split()
    if "hello" in words or "hi" in words:
        return "Hello!"
    if "price" in words:
        return "It's free."
    return "I don't understand."
for m in ["Hi there", "What is the price", "how much does it cost"]:
    print(m, "->", bot(m))`, before: "<p>Read the rules, predict the three answers, then run it. Pay attention to the last message.</p>", note: "<p>Line by line:</p><ul><li><code>words = msg.lower().split()</code> lowercases the message and cuts it into a list of words, so \"Hi\" becomes \"hi\".</li><li>Each <code>if</code> is one rule. <code>\"hi\" in words</code> checks if \"hi\" is one of the words in the list. The first rule that matches returns its answer and the function stops.</li><li>If no rule matches, the last line returns a polite \"I don't understand.\"</li></ul><p>Output: <code>Hi there -&gt; Hello!</code>, <code>What is the price -&gt; It's free.</code>, and <code>how much does it cost -&gt; I don't understand.</code> The user clearly asked about the price, but with different words. That is the weakness of rules: <b>you must predict every way people say things</b>. Rule-based bots are simple, predictable and easy to control, but they break on new wording.</p>" },
    { t: "predict", code: c`msg = "this is great"
print("hi" in msg, "hi" in msg.split())`, explain: "<code>\"hi\" in msg</code> checks for the letters h-i <b>anywhere</b> in the string, and \"t<b>hi</b>s\" contains them → <code>True</code>. <code>msg.split()</code> is the list <code>['this', 'is', 'great']</code>, and \"hi\" is not one of those words → <code>False</code>. Output: <code>True False</code>. That is why our bot splits into words first: otherwise \"this is great\" would be treated as a greeting." },
    { t: "ar", html: "روبوت القواعد يبحث عن كلمات مفتاحية بجمل if. هو بسيط وسهل التحكم، لكنه يفشل عندما يستخدم المستخدم كلمات لم نتوقعها. وانتبه{{g:|ي}}: \"hi\" in msg يبحث داخل النص كله، فكلمة this تحتوي على hi! قسّم{{g:|ي}} النص إلى كلمات أولًا." },

    { t: "h", text: "An ML chatbot: learn intents from examples" },
    { t: "p", html: "<p>The machine-learning way: instead of writing rules, we give each intent a few <b>example phrases</b>. When a message arrives, the bot finds the example phrase that is <b>most similar</b> to it and answers with that phrase's intent. To add a new way of asking, you just add an example — no new <code>if</code>.</p><p>First we need the examples in two parallel lists: <code>phrases</code> (the texts) and <code>tags</code> (the intent of each text, in the same position).</p>" },
    { t: "code", code: c`intents = {"greet": ["hello", "hi there"],
           "price": ["how much does it cost", "what is the price"]}
phrases, tags = [], []
for tag, examples in intents.items():
    for p in examples:
        phrases.append(p)
        tags.append(tag)
print(phrases)
print(tags)`, before: "<p>Run it and check that every phrase in the first list has its intent at the same position in the second list.</p>", note: "<p>Line by line:</p><ul><li><code>intents</code> is a dict (Day 12): each key is an intent name, each value a list of example phrases.</li><li><code>phrases, tags = [], []</code> creates two empty lists at once.</li><li>The outer loop takes one intent at a time: <code>tag</code> is the name, <code>examples</code> its list.</li><li>The inner loop goes through the examples and appends each phrase to <code>phrases</code> and its <code>tag</code> to <code>tags</code>.</li></ul><p>Output:</p><pre class=\"code-static\">['hello', 'hi there', 'how much does it cost', 'what is the price']\n['greet', 'greet', 'price', 'price']</pre><p>Position 2 in <code>phrases</code> is a price question, and position 2 in <code>tags</code> says <code>'price'</code>. Later, when the bot finds that phrase number 2 is the closest match, <code>tags[2]</code> tells it the intent.</p>" },
    { t: "tip", title: "The same lists in one line each", html: "<p>You will often see these two lines instead of the loops. They are list comprehensions (Day 10) with <b>two</b> <code>for</code> parts. Read the <code>for</code> parts from left to right as nested loops: the first <code>for</code> is the outer loop, the second the inner loop. In the second line, <code>_</code> is a normal variable name that programmers use for a value they do not need: we only want to repeat <code>t</code> once per phrase.</p>", code: c`phrases = [p for ps in intents.values() for p in ps]
tags = [t for t, ps in intents.items() for _ in ps]` },
    { t: "p", html: "<p>Next, how do we measure \"similar\"? We turn every phrase into numbers with <code>TfidfVectorizer</code>. <b>TF-IDF</b> is counting with a twist: a word that appears in <b>many</b> phrases (like \"the\" or \"is\") gets a <b>smaller</b> weight, and a rare, specific word (like \"price\") a bigger one. Rare words tell you more about the topic.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
docs = ["what is the price", "the time now", "the price of tea"]
vec = TfidfVectorizer().fit(docs)
print(vec.get_feature_names_out())
print(vec.transform(["what is the price"]).toarray().round(2))`, before: "<p>Look at the weights of the four words of the first sentence. Which one is smallest? In how many of the three docs does it appear?</p>", note: "<p>Line by line:</p><ul><li><code>TfidfVectorizer()</code> is used like <code>CountVectorizer</code>: <code>fit</code> learns the vocabulary <b>and</b> how many docs contain each word.</li><li>Line 4 prints the vocabulary: <code>['is' 'now' 'of' 'price' 'tea' 'the' 'time' 'what']</code>.</li><li>Line 5 shows the weights for \"what is the price\".</li></ul><p>Output: <code>[[0.58 0. 0. 0.44 0. 0.35 0. 0.58]]</code>. \"what\" and \"is\" appear in only one doc → biggest weight <code>0.58</code>. \"price\" is in two docs → <code>0.44</code>. \"the\" is in <b>all three</b> → smallest, <code>0.35</code>. Words that are everywhere say little, so they count less.</p>" },
    { t: "p", html: "<p>Finally, to compare two rows of numbers we use <b>cosine similarity</b>: a score from 0 to 1 that measures how much two vectors point in the same direction. <b>1</b> means the same words in the same proportions; <b>0</b> means no words in common. Because it looks at direction, not length, a short message and a long phrase can still match well.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
phrases = ["hello", "hi there", "how much does it cost", "what is the price"]
vec = TfidfVectorizer().fit(phrases)
P = vec.transform(phrases)
sims = cosine_similarity(vec.transform(["what's the price?"]), P)[0]
print(sims.round(2))
print("best match:", phrases[sims.argmax()])`, before: "<p>The heart of the chatbot: compare one user message with every example phrase and pick the closest. Run it, then change the message to <code>\"hello friend\"</code>.</p>", note: "<p>Line by line:</p><ul><li><code>P = vec.transform(phrases)</code>: the TF-IDF numbers of all four example phrases (one row each).</li><li><code>cosine_similarity(A, B)</code> compares every row of A with every row of B and returns a table. A has one row (the message), so we take row <code>[0]</code>: one score per phrase.</li><li><code>sims.argmax()</code> (Day 23) gives the <b>position</b> of the biggest score.</li></ul><p>Output: <code>[0. 0. 0. 0.87]</code> and <code>best match: what is the price</code>. The message shares \"what\", \"the\" and \"price\" with phrase 3 and nothing with the others. (\"what's\" is split into \"what\" and \"s\"; the one-letter \"s\" is ignored.)</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
phrases = ["hello", "hi there", "how much does it cost", "what is the price"]
vec = TfidfVectorizer().fit(phrases)
P = vec.transform(phrases)
for msg in ["what's the price?", "tell me a joke"]:
    sims = cosine_similarity(vec.transform([msg]), P)[0]
    print(msg, "-> best score", round(sims.max(), 2))`, before: "<p><code>argmax</code> always returns <b>some</b> position — even when nothing matches. Look at the best score for a message the bot knows nothing about.</p>", note: "<p>Line by line:</p><ul><li>The loop compares two messages with all phrases.</li><li><code>sims.max()</code> is the <b>best</b> score for that message.</li></ul><p>Output: <code>what's the price? -&gt; best score 0.87</code> and <code>tell me a joke -&gt; best score 0.0</code>. For the joke, every score is 0, but <code>argmax</code> would still return position 0 and the bot would answer \"hello\" to a joke request. The fix: a <b>threshold</b>. If the best score is below, say, <code>0.2</code>, the bot admits <i>\"Sorry, I didn't understand\"</i>. A bot that knows when it doesn't know is safer than one that is confidently wrong.</p>" },
    { t: "ar", html: "روبوت الذكاء الاصطناعي لا يحتاج قواعد: نعطي كل نية (intent) أمثلة، ونحوّلها إلى أعداد بـ TF-IDF، ثم نختار المثال الأقرب بالتشابه (cosine similarity). انتبه{{g:|ي}}: argmax يختار دائمًا شيئًا حتى لو كان التشابه صفرًا، لذلك نضع حدًا أدنى (threshold) ليقول الروبوت \"لم أفهم\"." },

    { t: "h", text: "Limits and responsibility" },
    { t: "p", html: "<p>A model only knows its training data. Train a hiring model on biased past decisions and it learns the bias. Train a sentiment model only on formal Arabic and it fails on dialects. Good AI engineers ask: <i>Is the data representative? Who could be hurt by a mistake? How do we test that?</i> Large language models like the one that helped build this course follow the same principle at an enormous scale: the text they learn from shapes everything they do.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
texts = ["good course", "great teacher", "bad course", "awful teacher"]
labels = ["pos", "pos", "neg", "neg"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(texts, labels)
print(model.predict(["not good", "زين مرة"]))
print(model.predict_proba(["زين مرة"]).round(2))`, before: "<p>Let's break a model on purpose. \"زين مرة\" is Gulf dialect for \"very good\". Predict both answers before you run it.</p>", note: "<p>Line by line:</p><ul><li>The model learns from four tiny English reviews.</li><li><code>\"not good\"</code>: \"not\" was never seen, so it is ignored; only \"good\" counts, and it is a positive clue → <code>pos</code>. The meaning is the opposite, but bag of words lost it.</li><li><code>\"زين مرة\"</code>: <b>no</b> word is known, so the model has no evidence at all. <code>predict_proba</code> shows <code>[[0.5 0.5]]</code>: a coin toss. <code>predict</code> still answers <code>neg</code> (the first class) as if it knew.</li></ul><p>Output: <code>['pos' 'neg']</code> then <code>[[0.5 0.5]]</code>. Two lessons: test your model on the kinds of text real users will write, and check how sure it is before you trust it.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
texts = ["good course", "great teacher", "not good at all", "not great"]
labels = ["pos", "pos", "neg", "neg"]
for ng in [(1, 1), (1, 2)]:
    vec = CountVectorizer(ngram_range=ng)
    model = make_pipeline(vec, MultinomialNB()).fit(texts, labels)
    print(ng, model.predict(["the course was not good"]))`, before: "<p>One partial fix for negation: also count <b>word pairs</b>. <code>ngram_range=(1, 2)</code> means \"single words and pairs of neighbours\". Compare the two runs.</p>", note: "<p>Line by line:</p><ul><li>This time the training data contains negative examples with \"not\".</li><li>The loop trains two models: <code>(1, 1)</code> counts single words only (the default); <code>(1, 2)</code> also counts pairs like \"not good\" and \"good course\".</li></ul><p>Output: <code>(1, 1) ['pos']</code> then <code>(1, 2) ['neg']</code>. With single words, \"course\" and \"good\" outvote \"not\". With pairs, the feature <b>\"not good\"</b> — seen only in a negative review — tips the balance. Better features help, but no trick replaces good, varied training data.</p>" },
    { t: "ar", html: "النموذج يعرف فقط ما تعلّمه من بياناته: إذا لم يرَ لهجة أو كلمة نفي فسيخطئ، وقد يجيب بثقة وهو لا يعرف شيئًا. اختبر{{g:|ي}} نموذجك على نصوص متنوعة تشبه ما سيكتبه المستخدمون، وتحقق{{g:|ي}} من الاحتمالات قبل الاعتماد عليه." },

    { t: "h", text: "Putting it together: an intent chatbot" },
    { t: "code", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
intents = {"greet": ["hello", "hi there", "good morning", "salam"],
           "hours": ["when are you open", "opening hours", "what time do you close"],
           "price": ["how much does it cost", "what is the price", "is it expensive"],
           "bye": ["bye", "see you later", "thanks goodbye"]}
answers = {"greet": "Hello {{name}}! How can I help?", "hours": "We are open 9am to 10pm.",
           "price": "This course is free.", "bye": "Goodbye, good luck with Python!"}
phrases = [p for ps in intents.values() for p in ps]
tags = [t for t, ps in intents.items() for _ in ps]
vec = TfidfVectorizer().fit(phrases)
def reply(msg):
    sims = cosine_similarity(vec.transform([msg]), vec.transform(phrases))[0]
    return answers[tags[sims.argmax()]] if sims.max() >= 0.2 else "Sorry, I didn't understand."
for m in ["hi!", "what's the price?", "are you open on Friday?", "tell me a joke", "bye"]:
    print(m, "->", reply(m))`, together: true, before: "<p>A complete small chatbot that uses every idea from the chatbot sections. Read it top to bottom and predict the five answers, then run it. Afterwards, add a new intent such as <code>\"location\"</code> with a few phrases and an answer.</p>", note: "<p>How it works:</p><ul><li><b>Lines 3–8 — the knowledge:</b> <code>intents</code> holds example phrases per intent, <code>answers</code> holds one reply per intent. Both use the same keys.</li><li><b>Lines 9–10 — flatten:</b> the two-<code>for</code> comprehensions from the tip build the parallel lists <code>phrases</code> and <code>tags</code> (13 phrases, 13 tags).</li><li><b>Line 11 — learn:</b> <code>TfidfVectorizer</code> learns the vocabulary and word weights from all phrases, once.</li><li><b>Lines 12–14 — reply:</b> compare the message with every phrase (<code>[0]</code> = the message's row of scores). The return line is a conditional expression (Day 5 trick): if the best score is at least 0.2, look up the intent of the best phrase with <code>tags[sims.argmax()]</code> and return its answer; otherwise admit it didn't understand.</li><li><b>Lines 15–16 — test</b> with five messages.</li></ul><p>Output: <code>hi! -&gt; Hello {{name}}! How can I help?</code>, the price message gets \"This course is free.\", \"are you open on Friday?\" matches \"when are you open\" → the hours answer, the joke scores 0 → \"Sorry, I didn't understand.\", and \"bye\" matches exactly → the goodbye. Try <code>\"is it open now\"</code>: it wrongly matches \"is it expensive\" because \"is it\" counts more than \"open\". The fix is more example phrases — that is how real assistants improve.</p>" },
    { t: "ar", html: "جمعنا كل شيء: أمثلة لكل نية، وTF-IDF لتحويلها إلى أعداد، وcosine similarity لاختيار الأقرب، وحد أدنى ليعترف الروبوت بعدم الفهم. لتحسين الروبوت أضف{{g:|ي}} أمثلة أكثر وأكثر تنوعًا بدل كتابة قواعد جديدة." },
  ],
  mistakes: [
    { title: "Transforming with a new vectorizer", html: "The test text must use the <b>same</b> vocabulary learned from training — use <code>transform</code>, not a new <code>fit</code>.", wrong: c`X_test = CountVectorizer().fit_transform(test_docs)`, right: c`X_test = vec.transform(test_docs)` },
    { title: "Too little or unbalanced data", html: "Six examples make a demo, not a product. If 95% of the examples are one class, the model learns to always say it.", wrong: c`labels = ["pos"] * 95 + ["neg"] * 5`, right: c`# collect balanced, varied examples
# and check the confusion matrix`, ar: "البيانات القليلة أو غير المتوازنة تعطي نموذجًا ضعيفًا حتى لو كانت الدقة تبدو عالية." },
  ],
  tricks: [
    { title: "See what the model learned", html: "", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
docs = ["win money now", "free prize win", "meeting at noon", "lunch at noon"]
y = ["spam", "spam", "ham", "ham"]
vec = CountVectorizer(); X = vec.fit_transform(docs)
nb = MultinomialNB().fit(X, y)
print(nb.predict_proba(vec.transform(["win lunch"])).round(2), nb.classes_)` },
    { title: "Word pairs", html: "<code>CountVectorizer(ngram_range=(1, 2))</code> also counts word pairs, so \"not good\" becomes a feature — helping with negation." },
  ],
  practice: [
    { t: "predict", code: c`from sklearn.feature_extraction.text import CountVectorizer
v = CountVectorizer()
v.fit(["the cat sat", "the dog sat down"])
print(v.transform(["the cat and the dog"]).toarray())`, explain: "Vocabulary (sorted): cat, dog, down, sat, the. Counts: <code>[[1 1 0 0 2]]</code>. \"and\" is unknown, so it's ignored." },
    { t: "parsons", title: "Spam filter", prompt: "Arrange a spam filter pipeline.", lines: ["from sklearn.pipeline import make_pipeline", "from sklearn.feature_extraction.text import CountVectorizer", "from sklearn.naive_bayes import MultinomialNB", c`msgs = ["win a free prize", "meeting at 10", "free money now", "see you at lunch"]`, c`y = ["spam", "ham", "spam", "ham"]`, "clf = make_pipeline(CountVectorizer(), MultinomialNB()).fit(msgs, y)", c`print(clf.predict(["free lunch prize"]))`], explain: "\"free\" and \"prize\" outweigh \"lunch\": <code>['spam']</code>." },
    { t: "try", title: "Teach the bot", html: "<p>Add a new intent (for example <code>\"location\"</code> with phrases like \"where are you\") and an answer. Then add Arabic phrases to <code>greet</code> (مرحبا، السلام عليكم).</p>", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
intents = {"greet": ["hello", "hi"], "bye": ["bye", "goodbye"]}
answers = {"greet": "Hi {{name}}!", "bye": "See you!"}
phrases = [p for ps in intents.values() for p in ps]
tags = [t for t, ps in intents.items() for _ in ps]
vec = TfidfVectorizer().fit(phrases)
def reply(m):
    s = cosine_similarity(vec.transform([m]), vec.transform(phrases))[0]
    return answers[tags[s.argmax()]] if s.max() > 0.2 else "?"
print(reply(input("You: ")))`, stdin: "hello there" },
  ],
  exercises: [
    { id: "bow", lvl: "seed", title: "Bag of words by hand", prompt: "<p>Write <code>bag(sentences)</code> returning <code>(vocab, rows)</code>: vocab = sorted unique lowercase words; rows = one list of counts per sentence. No sklearn.</p>", starter: "def bag(sentences):\n    pass\n", tests: [{ after: "print(bag(['Hi Sara', 'hi hi Omar']))", expected: "(['hi', 'omar', 'sara'], [[1, 0, 1], [2, 1, 0]])" }],
      solutions: [{ name: "Counter", code: c`from collections import Counter

def bag(sentences):
    vocab = sorted({w for s in sentences for w in s.lower().split()})
    rows = []
    for s in sentences:
        cnt = Counter(s.lower().split())
        rows.append([cnt[w] for w in vocab])
    return vocab, rows` }] },
    { id: "senti", lvl: "star", title: "Sentiment model", prompt: "<p>Write <code>train_sentiment(texts, labels)</code> returning a fitted pipeline of <code>CountVectorizer()</code> and <code>MultinomialNB()</code>. The test trains on course reviews and predicts new ones.</p>", starter: "from sklearn.pipeline import make_pipeline\nfrom sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\ndef train_sentiment(texts, labels):\n    pass\n", tests: [{ after: "T = ['great fun course', 'loved the clear lessons', 'excellent and fun', 'boring slow lessons', 'hated the long quiz', 'bad and boring']\nL = ['pos', 'pos', 'pos', 'neg', 'neg', 'neg']\nm = train_sentiment(T, L)\nprint(list(m.predict(['fun lessons', 'boring quiz', 'excellent course'])))", expected: "['pos', 'neg', 'pos']" }],
      solutions: [{ name: "Pipeline", code: c`from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

def train_sentiment(texts, labels):
    return make_pipeline(CountVectorizer(), MultinomialNB()).fit(texts, labels)` }] },
    { id: "spam", lvl: "star", title: "Spam or not — evaluated", prompt: "<p>Write <code>spam_report(msgs, labels, test_msgs, test_labels)</code> that trains a CountVectorizer + MultinomialNB pipeline and returns <code>(accuracy, predictions)</code> on the test messages, accuracy rounded to 2 decimals and predictions as a list.</p>", starter: "from sklearn.pipeline import make_pipeline\nfrom sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\ndef spam_report(msgs, labels, test_msgs, test_labels):\n    pass\n", tests: [{ after: "M = ['win free money', 'free prize click now', 'claim your prize', 'meeting at noon', 'lecture moved to sunday', 'see you at the library']\nY = ['spam', 'spam', 'spam', 'ham', 'ham', 'ham']\nTM = ['free money prize', 'library meeting sunday', 'click to win', 'noon lecture']\nTY = ['spam', 'ham', 'spam', 'ham']\nprint(spam_report(M, Y, TM, TY))", expected: "(1.0, ['spam', 'ham', 'spam', 'ham'])" }],
      solutions: [{ name: "Pipeline + score", code: c`from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

def spam_report(msgs, labels, test_msgs, test_labels):
    model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(msgs, labels)
    preds = list(model.predict(test_msgs))
    return round(model.score(test_msgs, test_labels), 2), preds` }] },
    { id: "rulebot", lvl: "star", title: "Rule-based bot", prompt: "<p>Before ML: write <code>bot(msg)</code> with keyword rules (lowercase, check with <code>in</code>): contains <code>hello</code>/<code>hi</code>/<code>salam</code> → <code>Hello!</code>; <code>price</code>/<code>cost</code> → <code>It's free.</code>; <code>bye</code> → <code>Goodbye!</code>; otherwise <code>I don't understand.</code>. Check rules in that order.</p>", starter: "def bot(msg):\n    pass\n", tests: [{ after: "for m in ['Hi there', 'What does it COST?', 'ok bye', 'weather?']:\n    print(bot(m))", expected: "Hello!\nIt's free.\nGoodbye!\nI don't understand." }],
      solutions: [{ name: "Rules table", code: c`RULES = [
    (("hello", "hi", "salam"), "Hello!"),
    (("price", "cost"), "It's free."),
    (("bye",), "Goodbye!"),
]

def bot(msg):
    words = msg.lower()
    for keys, answer in RULES:
        if any(k in words for k in keys):
            return answer
    return "I don't understand."`, note: "Watch out: <code>\"hi\" in \"this\"</code> is True! Substring checks are fragile — one reason ML-based intent detection is better. Try <code>msg.lower().split()</code> to match whole words." }] },
    { id: "intent", lvl: "fire", title: "Intent classifier", prompt: "<p>Write <code>make_bot(intents, answers, threshold=0.2)</code> that returns a function <code>reply(msg)</code>: TF-IDF + cosine similarity, answering <code>\"Sorry?\"</code> below the threshold.</p>", starter: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\ndef make_bot(intents, answers, threshold=0.2):\n    pass\n", tests: [{ after: "I = {'hours': ['opening hours', 'when do you open'], 'fees': ['how much are the fees', 'tuition cost'], 'bye': ['bye', 'goodbye']}\nA = {'hours': 'Open 8-4', 'fees': 'See the fees page', 'bye': 'Bye!'}\nr = make_bot(I, A)\nfor m in ['what are your hours', 'tuition fees please', 'goodbye', 'pizza']:\n    print(r(m))", expected: "Open 8-4\nSee the fees page\nBye!\nSorry?" }],
      solutions: [{ name: "Closure", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def make_bot(intents, answers, threshold=0.2):
    phrases = [p for ps in intents.values() for p in ps]
    tags = [t for t, ps in intents.items() for _ in ps]
    vec = TfidfVectorizer().fit(phrases)
    P = vec.transform(phrases)

    def reply(msg):
        sims = cosine_similarity(vec.transform([msg]), P)[0]
        best = sims.argmax()
        if sims[best] < threshold:
            return "Sorry?"
        return answers[tags[best]]
    return reply`, note: "<code>make_bot</code> returns a function that remembers <code>vec</code> and <code>P</code> — a <b>closure</b>." }] },
    { id: "fix26", lvl: "fire", debug: true, title: "The confused classifier", prompt: "<p>Fix the bugs so the test prints <code>['pos', 'neg']</code>.</p>", starter: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

def classify(train, labels, new):
    vec = CountVectorizer()
    X = vec.fit_transform(train)
    model = MultinomialNB().fit(X, labels)
    X_new = CountVectorizer().fit_transform(new)
    return model.predict(new)`, tests: [{ after: "print(list(classify(['good nice', 'bad awful', 'nice fun', 'awful sad'], ['pos', 'neg', 'pos', 'neg'], ['fun and nice', 'sad awful day'])))", expected: "['pos', 'neg']" }],
      solutions: [{ name: "Fixed", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

def classify(train, labels, new):
    vec = CountVectorizer()
    X = vec.fit_transform(train)
    model = MultinomialNB().fit(X, labels)
    X_new = vec.transform(new)
    return model.predict(X_new)`, note: "Reuse the trained vectorizer with <code>transform</code>, and predict on the vectors, not raw text." }] },
  ],
  quiz: [
    { q: "Bag of words turns a sentence into…", o: ["a picture", "counts of vocabulary words", "a sorted list", "a sentence in reverse"], a: 1, e: "One number per vocabulary word." },
    { q: "For new text you should call…", o: ["`vec.fit_transform`", "`vec.transform`", "`CountVectorizer().fit`", "nothing"], a: 1, e: "Same vocabulary as training." },
    { q: "Naive Bayes is a classic choice for…", o: ["image generation", "spam filtering", "sorting", "binary search"], a: 1, e: "Fast and works with little data." },
    { q: "Why give a chatbot a similarity threshold?", o: ["To be faster", "So it can say it doesn't understand", "To use less memory", "It's required"], a: 1, e: "Better than a confident wrong answer." },
    { q: "A model trained only on formal Arabic may fail on dialects because…", o: ["Python doesn't support dialects", "it only knows patterns in its training data", "Arabic is right-to-left", "the model is too fast"], a: 1, e: "Data shapes the model." },
  ],
  puzzle: { title: "Cosine intuition", q: "<p>Using word counts over the vocabulary [cat, dog], sentence A is \"cat cat\" → (2, 0) and sentence B is \"cat\" → (1, 0). What is their cosine similarity?</p>", code: c`import numpy as np
a, b = np.array([2, 0]), np.array([1, 0])
print(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))`, answers: ["1", "1.0"], hint: "Cosine measures direction, not length.", ar: "التشابه يقيس الاتجاه وليس الطول.", e: "Both vectors point in exactly the same direction: similarity <b>1.0</b>. Repeating a word doesn't change the topic — that's why cosine is used for comparing texts of different lengths." },
  cards: [
    { f: "Bag of words", b: "Represent text as counts of vocabulary words (order ignored)." },
    { f: "fit_transform vs transform", b: "fit_transform learns the vocabulary (training); transform reuses it (new data)." },
    { f: "TF-IDF", b: "Word counts weighted down for words common in all documents." },
    { f: "Intent", b: "What the user wants; chatbots classify it before answering." },
    { f: "Cosine similarity", b: "How similar the direction of two vectors is: 1 same, 0 unrelated." },
  ],
};
})();

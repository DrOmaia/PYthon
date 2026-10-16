window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[26] = {
  title: "Text classification and a mini chatbot",
  intro: "Spam filters, review ratings, customer-support bots, and the first step of every chat assistant all start with the same question: <b>what is this text about?</b> Today you turn words into numbers, train a text classifier, and build a small chatbot that understands what the user wants — in English and Arabic.",
  introAr: "اليوم نعلّم الحاسب فهم النصوص: نحول الكلمات إلى أرقام (Bag of Words)، وندرّب مصنّفًا يعرف هل التعليق إيجابي أم سلبي، ثم نبني روبوت محادثة صغيرًا يفهم نية المستخدم. ويعمل بالعربي أيضًا!",
  goals: ["Explain bag-of-words: turning text into numbers", "Use `CountVectorizer` and `TfidfVectorizer`, and know `fit_transform` vs `transform`", "Train and test a Naive Bayes text classifier with a pipeline", "Measure how similar two texts are with cosine similarity", "Build an intent-based chatbot", "Discuss limits and bias of AI models"],
  learn: [
    { t: "h", text: "Computers need numbers: bag of words" },
    { t: "p", html: "<p>Yesterday every model learned from a table of numbers: hours, attendance, petal sizes. But a review like <i>\"great course, loved it\"</i> is text. A model cannot measure the distance between two sentences or multiply a word by a weight. So the first job in text AI is always the same: <b>turn each text into a row of numbers</b>. This is called <b>vectorizing</b> the text.</p>" },
    { t: "analogy", title: "A bag of words", html: "<p>Cut a sentence into words and drop them into a bag. Shake it. You can no longer read the sentence, but you can still count: \"love\" ×1, \"python\" ×1. Two bags with many of the same words probably talk about the same thing. That is the <b>bag-of-words</b> idea: keep the counts, forget the order.</p>" },
    { t: "viz", code: c`from collections import Counter
sentences = ["I love Python", "I love coffee", "Python is hard"]
vocab = sorted({w.lower() for s in sentences for w in s.split()})
print(vocab)
for s in sentences:
    counts = Counter(s.lower().split())
    print([counts[w] for w in vocab], "<-", s)`, before: "<p>Bag of words by hand, with tools you already know (sets, <code>Counter</code>, list comprehensions):</p>" },
    { t: "lines", rows: [
      ["vocab = sorted({w.lower() for s in sentences for w in s.split()})", "The <b>vocabulary</b>: every different word in all sentences, lowercase, in alphabetical order. Each word becomes one column."],
      ["counts = Counter(s.lower().split())", "Count the words of one sentence, e.g. <code>{'i': 1, 'love': 1, 'python': 1}</code>."],
      ["[counts[w] for w in vocab]", "One number per vocabulary word: how many times it appears here (0 if missing — a Counter returns 0 for unknown keys)."],
    ] },
    { t: "p", html: "<p>Each sentence is now a row of counts, one column per vocabulary word. Word order is lost (hence \"bag\"), but surprisingly this is enough for many tasks. The text is a table of numbers — exactly what yesterday's models need.</p>" },
    { t: "ar", html: "الفكرة: كل جملة تتحول إلى صف من الأرقام، كل رقم يمثل عدد مرات ظهور كلمة من المفردات. ترتيب الكلمات يضيع، لكن العدّ يكفي لمهام كثيرة." },
    { t: "check", q: "The vocabulary is `['cat', 'dog', 'sat']`. What is the bag-of-words row for the sentence \"dog sat dog\"?", o: ["`[1, 1, 1]`", "`[0, 2, 1]`", "`[2, 1, 0]`", "`[0, 1, 2]`"], a: 1, e: "cat appears 0 times, dog 2 times, sat once: `[0, 2, 1]`. The columns follow the vocabulary order, not the sentence order.", hint: "One number per vocabulary word, in the vocabulary's order." },

    { t: "h", text: "CountVectorizer does it for you" },
    { t: "p", html: "<p>scikit-learn has a ready tool for this: <code>CountVectorizer</code>. It also lowercases, removes punctuation and handles thousands of texts quickly.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
docs = ["I love Python", "I love coffee", "Python is hard"]
vec = CountVectorizer()
X = vec.fit_transform(docs)
print(vec.get_feature_names_out())
print(X.toarray())`, note: "<p>Same table as your hand-made one — except \"I\" is missing: <code>CountVectorizer</code> ignores one-letter words by default.</p>" },
    { t: "lines", rows: [
      ["vec = CountVectorizer()", "Create an empty vectorizer. It has no vocabulary yet."],
      ["X = vec.fit_transform(docs)", "Two jobs at once: <b>fit</b> = learn the vocabulary from these texts; <b>transform</b> = turn them into count rows."],
      ["vec.get_feature_names_out()", "The vocabulary, in column order."],
      ["X.toarray()", "<code>X</code> is stored in a compact form (most counts are 0). <code>toarray()</code> shows it as a normal numpy table, 3 rows × 5 columns."],
    ] },
    { t: "check", q: "What does this print?", code: c`vec = CountVectorizer().fit(["I love AI"])
print(vec.get_feature_names_out())`, o: ["`['I' 'love' 'AI']`", "`['ai' 'love']`", "`['i' 'love' 'ai']`", "`['love']`"], a: 1, e: "Words are lowercased and sorted, and one-letter words like \"I\" are dropped. \"AI\" has two letters, so it stays as `ai`.", hint: "Three rules: lowercase, sorted, no one-letter words." },

    { t: "h", text: "New text: transform, never fit again" },
    { t: "p", html: "<p>After training, new messages arrive. They must be turned into rows with the <b>same columns</b> the model learned — otherwise column 3 would mean \"coffee\" in training and \"exam\" later, and the model would be reading nonsense. So for new text we call <code>transform</code> only. Words the vectorizer never saw are simply ignored.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
vec = CountVectorizer()
vec.fit(["good food", "bad food"])
print(vec.get_feature_names_out())
print(vec.transform(["good good pizza"]).toarray())`, note: "<p>Vocabulary: bad, food, good. \"good\" appears twice; \"pizza\" is unknown, so it does not get a column.</p>" },
    { t: "ar", html: "fit_transform مرة واحدة على بيانات التدريب لتعلّم المفردات. وللنصوص الجديدة نستخدم transform فقط بنفس المفردات. الكلمات الجديدة غير المعروفة تُتجاهل." },
    { t: "check", q: "The vectorizer was fitted on training reviews. A new review arrives. Which line is correct?", o: ["`X_new = CountVectorizer().fit_transform([review])`", "`X_new = vec.transform([review])`", "`X_new = vec.fit_transform([review])`", "`X_new = vec.transform(review)`"], a: 1, e: "Reuse the fitted `vec` with `transform`, and pass a **list** of texts (even for one text). A new fit would create different columns.", hint: "Same vocabulary, and the input is a list of texts." },

    { t: "h", text: "A sentiment classifier with Naive Bayes" },
    { t: "p", html: "<p>Now we can classify text. <b>Naive Bayes</b> learns how often each word appears in each class: \"loved\" and \"fun\" are common in positive reviews, \"boring\" and \"hated\" in negative ones. For a new review it combines the evidence of all its words and picks the most likely class. It is fast, needs little data, and was the classic spam filter.</p>" },
    { t: "analogy", title: "A detective collecting clues", html: "<p>A detective doesn't decide from one clue. Muddy shoes: a small hint the guest was outside. Wet umbrella: another hint. Together they point strongly one way. Naive Bayes treats each word as one clue for a class and multiplies the clues together. (\"Naive\" because it pretends the clues are independent — a simplification that works surprisingly well.)</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

reviews = ["great course, loved it", "amazing teacher and clear examples", "really fun and useful",
           "boring and too long", "terrible audio, hated it", "confusing and useless examples"]
labels = ["pos", "pos", "pos", "neg", "neg", "neg"]

model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(reviews, labels)
tests = ["loved the examples", "too confusing", "fun teacher", "the audio was boring"]
for t, p in zip(tests, model.predict(tests)):
    print(p, "<-", t)` },
    { t: "lines", rows: [
      ["model = make_pipeline(CountVectorizer(), MultinomialNB())", "A <b>pipeline</b> glues two steps into one model: first vectorize, then classify."],
      ["model.fit(reviews, labels)", "Raw text goes in. The pipeline calls <code>fit_transform</code> on the vectorizer, then <code>fit</code> on Naive Bayes."],
      ["model.predict(tests)", "New raw text goes in. The pipeline calls <code>transform</code> (never fit!) and then <code>predict</code>. Labels come out."],
      ["zip(tests, model.predict(tests))", "Pair each test sentence with its prediction so we can print them side by side."],
    ] },
    { t: "p", html: "<p>The pipeline protects you from the mistake in the previous section: it always uses <code>transform</code> on new text. And because a pipeline is a model, you can <b>score it on a test set</b> exactly like yesterday:</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

reviews = ["great course, loved it", "amazing teacher and clear examples", "really fun and useful",
           "boring and too long", "terrible audio, hated it", "confusing and useless examples"]
labels = ["pos", "pos", "pos", "neg", "neg", "neg"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(reviews, labels)

test_texts = ["clear and fun", "long and boring", "useful examples", "hated the audio"]
test_labels = ["pos", "neg", "pos", "neg"]
print("accuracy:", model.score(test_texts, test_labels))
print(model.classes_, model.predict_proba(["fun but too long"]).round(2))`, note: "<p>All 4 unseen reviews are right. <code>predict_proba</code> shows how sure the model is: \"fun but too long\" is mixed, so it is only about 69% negative.</p>" },
    { t: "ar", html: "Naive Bayes يتعلم كم مرة تظهر كل كلمة في كل تصنيف، ثم يجمع الأدلة. و make_pipeline يربط تحويل النص مع النموذج، فندخل نصًا ونحصل على التصنيف مباشرة." },
    { t: "check", q: "Why is `make_pipeline(CountVectorizer(), MultinomialNB())` useful?", o: ["It makes the model more accurate on every task", "Raw text goes in, labels come out, and new text is always transformed with the training vocabulary", "It removes the need for training data", "It translates Arabic to English"], a: 1, e: "The pipeline runs the vectorizer and the model in order, and uses `transform` (not a new fit) for new text — so you can't make the vocabulary mistake.", hint: "Think about what the pipeline does automatically at predict time." },

    { t: "h", text: "Arabic works too" },
    { t: "p", html: "<p>Bag of words doesn't care about the language: it just splits the text into words and counts them. So the same pipeline works for Arabic reviews.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

texts = ["المنتج ممتاز وسريع", "خدمة رائعة وممتازة", "أحببت التطبيق جدا",
         "المنتج سيء ومتأخر", "خدمة سيئة جدا", "لم يعجبني التطبيق"]
labels = ["إيجابي", "إيجابي", "إيجابي", "سلبي", "سلبي", "سلبي"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(texts, labels)
print(model.predict(["التوصيل ممتاز", "التطبيق سيء"]))`, note: "<p>One weakness shows here: <i>ممتاز</i> and <i>وممتازة</i> are different \"words\" for the vectorizer, because the letters differ. Real Arabic systems first clean the text (remove و and ال, unify ة/ه) to fix this.</p>" },

    { t: "h", text: "TF-IDF: not all words are equal" },
    { t: "p", html: "<p>Counting treats every word the same, but words like \"the\" and \"is\" appear everywhere and say almost nothing about the topic. <b>TF-IDF</b> gives a word a <b>high</b> weight when it is frequent in <i>this</i> text but <b>rare</b> in the other texts, and a low weight when it is everywhere.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
docs = ["the coffee is hot", "the tea is hot", "the exam is today"]
vec = TfidfVectorizer().fit(docs)
print(vec.get_feature_names_out())
print(vec.transform(["the coffee is hot"]).toarray().round(2))`, note: "<p>In \"the coffee is hot\": <b>coffee</b> gets 0.66 (it appears in only one text — very informative), <b>hot</b> 0.5 (two texts), and <b>the</b> and <b>is</b> only 0.39 (in every text). Words not in this sentence get 0.</p>" },
    { t: "check", q: "In a set of 100 support messages, which word will get the **lowest** TF-IDF weight?", o: ["\"refund\", in 5 messages", "\"password\", in 12 messages", "\"the\", in all 100 messages", "\"broken\", in 3 messages"], a: 2, e: "A word that appears in every message cannot tell messages apart, so TF-IDF weighs it down the most.", hint: "Rare words are informative; words that are everywhere are not." },

    { t: "h", text: "How similar are two texts? Cosine similarity" },
    { t: "p", html: "<p>A chatbot must find which known phrase is <i>closest</i> to what the user typed. Each text is now a vector (a row of numbers), and <b>cosine similarity</b> measures how much two vectors point in the same direction: <b>1</b> = same words in the same proportions, <b>0</b> = no words in common. Text length doesn't matter, only the mix of words.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
docs = ["I love coffee", "I love tea", "exam today"]
X = CountVectorizer().fit_transform(docs)
print(cosine_similarity(X[0], X[1]).round(2))
print(cosine_similarity(X[0], X[2]).round(2))`, note: "<p>\"I love coffee\" and \"I love tea\" share one of their two words (\"love\"): similarity 0.5. \"I love coffee\" and \"exam today\" share nothing: 0.</p>" },
    { t: "ar", html: "TF-IDF يعطي وزنًا أقل للكلمات المنتشرة في كل النصوص. و cosine similarity يقيس التشابه بين نصين: 1 يعني متشابهين جدًا، و 0 يعني لا توجد كلمات مشتركة." },
    { t: "check", q: "Two texts have no words in common. What is their cosine similarity?", o: ["1", "0", "-1", "It depends on their length"], a: 1, e: "No shared words means the vectors have nothing in the same direction: similarity 0. Length never matters for cosine.", hint: "1 = same words, 0 = nothing shared." },

    { t: "h", text: "Intent chatbot" },
    { t: "p", html: "<p>Assistants first classify <b>what the user wants</b> — the <b>intent</b> (greeting, opening hours, price…) — and then answer. We give each intent a few example phrases. For a new message we find the most similar example phrase with TF-IDF + cosine similarity, and answer with that phrase's intent. If even the best match is weak, the bot admits it didn't understand.</p>" },
    { t: "analogy", title: "A receptionist with a notebook", html: "<p>A new receptionist has a notebook: \"If someone asks <i>when are you open</i> or <i>opening hours</i> → say 9am to 10pm.\" When a visitor asks something, she finds the most similar line in her notebook. If nothing is close, she says \"Sorry, let me ask someone\" instead of inventing an answer.</p>" },
    { t: "steps", title: "Build an intent chatbot", problem: "<p>Build a bot for the Py30 course that answers greetings, questions about opening hours and price, and goodbyes — and says \"Sorry\" for anything else.</p>", steps: [
      { html: "<p><b>Understand.</b> Input: one message. Output: one answer. The hard part is recognizing the same intent in different words (\"what's the price?\", \"how much does it cost\").</p>" },
      { html: "<p><b>Data.</b> A dictionary of intents → example phrases, and a dictionary of intents → answers.</p>", code: c`intents = {"greet": ["hello", "hi there", ...], "hours": [...], ...}
answers = {"greet": "Hello! How can I help?", ...}` },
      { html: "<p><b>Flatten.</b> Two parallel lists: every phrase, and its intent tag at the same position.</p>", code: c`phrases = [p for ps in intents.values() for p in ps]
tags = [t for t, ps in intents.items() for _ in ps]` },
      { html: "<p><b>Vectorize once.</b> Fit TF-IDF on the phrases and keep their vectors in <code>P</code>.</p>", code: c`vec = TfidfVectorizer().fit(phrases)
P = vec.transform(phrases)` },
      { html: "<p><b>Reply.</b> Transform the message (no fit!), compare it with all phrases, take the best one with <code>argmax()</code> (Day 23), and refuse when the best similarity is below 0.2.</p>", code: c`sims = cosine_similarity(vec.transform([msg]), P)[0]
best = sims.argmax()
if sims[best] < 0.2:
    return "Sorry, I didn't understand."
return answers[tags[best]]` },
    ], code: c`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

intents = {
    "greet": ["hello", "hi there", "good morning", "salam"],
    "hours": ["when are you open", "opening hours", "what time do you close"],
    "price": ["how much does it cost", "what is the price", "is it expensive"],
    "bye":   ["bye", "see you later", "thanks goodbye"],
}
answers = {"greet": "Hello {{name}}! How can I help?", "hours": "We are open 9am to 10pm.",
           "price": "This course is free.", "bye": "Goodbye, good luck with Python!"}

phrases = [p for ps in intents.values() for p in ps]
tags = [t for t, ps in intents.items() for _ in ps]
vec = TfidfVectorizer().fit(phrases)
P = vec.transform(phrases)

def reply(msg):
    sims = cosine_similarity(vec.transform([msg]), P)[0]
    best = sims.argmax()
    if sims[best] < 0.2:
        return "Sorry, I didn't understand. Ask about hours or price."
    return answers[tags[best]]

for m in ["hi!", "what's the price?", "are you open on Friday?", "tell me a joke", "bye"]:
    print(m, "->", reply(m))`, ar: "الروبوت يحوّل الرسالة إلى أرقام، ويقارنها بكل الجمل المعروفة، ويختار الأقرب. وإذا كان التشابه ضعيفًا يعتذر بدل أن يجيب إجابة خاطئة." },

    { t: "h", text: "Limits and responsibility" },
    { t: "p", html: "<p>A model only knows its training data. Train a hiring model on biased past decisions and it learns the bias. Train a sentiment model only on formal Arabic and it fails on dialects. Bag of words also ignores order: \"not good\" and \"good\" share the word \"good\". Good AI engineers ask: <i>Is the data representative? Who could be hurt by a mistake? How do we test that?</i> Large language models like the one that helped build this course follow the same principle at an enormous scale: the text they learn from shapes everything they do.</p>" },
    { t: "ar", html: "النموذج يتعلم من بياناته فقط، وإذا كانت البيانات متحيزة سيكون النموذج متحيزًا. المهندس المسؤول يختبر نموذجه على حالات متنوعة قبل استخدامه." },
    { t: "table", head: ["Tool", "What it does"], rows: [
      ["`CountVectorizer()`", "text → word counts (bag of words)"],
      ["`TfidfVectorizer()`", "text → counts weighted down for common words"],
      ["`vec.fit_transform(train_texts)`", "learn the vocabulary + vectorize (training only)"],
      ["`vec.transform(new_texts)`", "vectorize new texts with the same vocabulary"],
      ["`MultinomialNB()`", "Naive Bayes classifier for word counts"],
      ["`make_pipeline(vec, model)`", "raw text in → label out"],
      ["`cosine_similarity(A, B)`", "how similar texts are: 1 same, 0 nothing shared"],
    ] },
  ],
  mistakes: [
    { title: "Transforming with a new vectorizer", html: "The test text must use the <b>same</b> vocabulary learned from training — use <code>transform</code>, not a new <code>fit</code>.", wrong: c`X_test = CountVectorizer().fit_transform(test_docs)`, right: c`X_test = vec.transform(test_docs)` },
    { title: "Passing one string instead of a list", html: "A vectorizer expects a <b>list</b> of texts. A single string gives a <code>ValueError</code> (\"Iterable over raw text documents expected\").", wrong: c`vec.transform("hello there")`, right: c`vec.transform(["hello there"])`, ar: "حتى لو عندك نص واحد ضعه داخل قائمة: [\"...\"]." },
    { title: "Giving raw text to the classifier", html: "<code>MultinomialNB</code> only understands numbers. Vectorize first — or use a pipeline that does it for you.", wrong: c`nb = MultinomialNB().fit(texts, labels)`, right: c`model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(texts, labels)` },
    { title: "Too little or unbalanced data", html: "Six examples make a demo, not a product. If 95% of the examples are one class, the model learns to always say it.", wrong: c`labels = ["pos"] * 95 + ["neg"] * 5`, right: c`# collect balanced, varied examples
# and check the confusion matrix`, ar: "البيانات القليلة أو غير المتوازنة تعطي نموذجًا ضعيفًا حتى لو كانت الدقة تبدو عالية." },
  ],
  tricks: [
    { title: "See what the model learned", html: "<code>predict_proba</code> shows the probability of each class, in the order of <code>classes_</code>.", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
docs = ["win money now", "free prize win", "meeting at noon", "lunch at noon"]
y = ["spam", "spam", "ham", "ham"]
vec = CountVectorizer(); X = vec.fit_transform(docs)
nb = MultinomialNB().fit(X, y)
print(nb.predict_proba(vec.transform(["win lunch"])).round(2), nb.classes_)` },
    { title: "Word pairs", html: "<code>CountVectorizer(ngram_range=(1, 2))</code> also counts word pairs, so \"not good\" becomes a feature — helping with negation." },
    { title: "Drop the filler words", html: "<code>stop_words=\"english\"</code> removes very common English words (the, is, of, on…) before counting.", code: c`from sklearn.feature_extraction.text import CountVectorizer
vec = CountVectorizer(stop_words="english")
vec.fit(["the exam is on the last day of the week"])
print(vec.get_feature_names_out())` },
  ],
  practice: [
    { t: "predict", code: c`from sklearn.feature_extraction.text import CountVectorizer
v = CountVectorizer()
v.fit(["the cat sat", "the dog sat down"])
print(v.transform(["the cat and the dog"]).toarray())`, explain: "Vocabulary (sorted): cat, dog, down, sat, the. Counts: <code>[[1 1 0 0 2]]</code>. \"and\" is unknown, so it's ignored." },
    { t: "predict", code: c`from sklearn.feature_extraction.text import CountVectorizer
X = CountVectorizer().fit_transform(["win money now", "free money", "lunch at noon"])
print(X.shape)`, explain: "3 texts → 3 rows. The vocabulary has 7 different words (win, money, now, free, lunch, at, noon) → 7 columns: <code>(3, 7)</code>." },
    { t: "predict", code: c`from sklearn.metrics.pairwise import cosine_similarity
print(cosine_similarity([[2, 0]], [[5, 0]]))
print(cosine_similarity([[1, 0]], [[0, 3]]))`, explain: "(2, 0) and (5, 0) point in exactly the same direction: <code>[[1.]]</code> — length doesn't matter. (1, 0) and (0, 3) have nothing in common: <code>[[0.]]</code>." },
    { t: "parsons", title: "Spam filter", prompt: "Arrange a spam filter pipeline.", lines: ["from sklearn.pipeline import make_pipeline", "from sklearn.feature_extraction.text import CountVectorizer", "from sklearn.naive_bayes import MultinomialNB", c`msgs = ["win a free prize", "meeting at 10", "free money now", "see you at lunch"]`, c`y = ["spam", "ham", "spam", "ham"]`, "clf = make_pipeline(CountVectorizer(), MultinomialNB()).fit(msgs, y)", c`print(clf.predict(["free lunch prize"]))`], explain: "\"free\" and \"prize\" outweigh \"lunch\": <code>['spam']</code>." },
    { t: "parsons", title: "Vectorize new text", prompt: "Learn a vocabulary from two sentences, then turn a new sentence into counts with the same columns.", lines: ["from sklearn.feature_extraction.text import CountVectorizer", "vec = CountVectorizer()", c`vec.fit(["good food", "bad service"])`, c`row = vec.transform(["good service"])`, "print(row.toarray())"], distractors: [c`row = CountVectorizer().fit_transform(["good service"])`], explain: "Fit once, then <code>transform</code> new text with the same vocabulary: <code>[[0 0 1 1]]</code> (bad, food, good, service)." },
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
    { t: "try", title: "Break the sentiment model", html: "<p>Find reviews that fool the model. Try <code>\"not boring at all\"</code> (predicted negative) or <code>\"not great, not fun\"</code> (predicted positive). Why does bag of words get them wrong? Then add a few training examples that fix one of them.</p>", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
reviews = ["great course, loved it", "amazing teacher and clear examples", "really fun and useful",
           "boring and too long", "terrible audio, hated it", "confusing and useless examples"]
labels = ["pos", "pos", "pos", "neg", "neg", "neg"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(reviews, labels)
for r in ["not boring at all", "not great, not fun", "clear and useful"]:
    print(model.predict([r])[0], "<-", r)` },
  ],
  exercises: [
    { id: "bow", lvl: "seed", title: "Bag of words by hand", prompt: "<p>Write <code>bag(sentences)</code> returning <code>(vocab, rows)</code>: vocab = sorted unique lowercase words; rows = one list of counts per sentence. No sklearn.</p>", starter: "def bag(sentences):\n    pass\n", tests: [{ after: "print(bag(['Hi Sara', 'hi hi Omar']))", expected: "(['hi', 'omar', 'sara'], [[1, 0, 1], [2, 1, 0]])" }],
      hint: "Build the vocabulary with a set comprehension, then use a <code>Counter</code> per sentence — like the first example of the lesson.",
      solutions: [{ name: "Counter", code: c`from collections import Counter

def bag(sentences):
    vocab = sorted({w for s in sentences for w in s.lower().split()})
    rows = []
    for s in sentences:
        cnt = Counter(s.lower().split())
        rows.append([cnt[w] for w in vocab])
    return vocab, rows` }] },
    { id: "vocab", lvl: "seed", title: "What did the vectorizer learn?", prompt: "<p>Write <code>vocabulary(texts)</code> that fits a <code>CountVectorizer</code> on the texts and returns its vocabulary as a normal Python <b>list</b>.</p>", starter: "from sklearn.feature_extraction.text import CountVectorizer\n\ndef vocabulary(texts):\n    pass\n", tests: [{ after: "print(vocabulary(['I love Python', 'Python is FUN']))", expected: "['fun', 'is', 'love', 'python']" }],
      hint: "<code>vec.get_feature_names_out()</code> returns a numpy array; wrap it in <code>list()</code> — or use <code>.tolist()</code>.",
      solutions: [{ name: "list()", code: c`from sklearn.feature_extraction.text import CountVectorizer

def vocabulary(texts):
    vec = CountVectorizer().fit(texts)
    return list(vec.get_feature_names_out())`, note: "Lowercase, sorted, and \"I\" is gone (one letter)." }, { name: ".tolist()", code: c`from sklearn.feature_extraction.text import CountVectorizer

def vocabulary(texts):
    return CountVectorizer().fit(texts).get_feature_names_out().tolist()`, note: "<code>fit</code> returns the vectorizer itself, so you can chain the calls." }] },
    { id: "senti", lvl: "star", title: "Sentiment model", prompt: "<p>Write <code>train_sentiment(texts, labels)</code> returning a fitted pipeline of <code>CountVectorizer()</code> and <code>MultinomialNB()</code>. The test trains on course reviews and predicts new ones.</p>", starter: "from sklearn.pipeline import make_pipeline\nfrom sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\ndef train_sentiment(texts, labels):\n    pass\n", tests: [{ after: "T = ['great fun course', 'loved the clear lessons', 'excellent and fun', 'boring slow lessons', 'hated the long quiz', 'bad and boring']\nL = ['pos', 'pos', 'pos', 'neg', 'neg', 'neg']\nm = train_sentiment(T, L)\nprint(list(m.predict(['fun lessons', 'boring quiz', 'excellent course'])))", expected: "['pos', 'neg', 'pos']" }],
      hint: "Return the result of <code>make_pipeline(...).fit(texts, labels)</code> — <code>fit</code> returns the fitted model.",
      solutions: [{ name: "Pipeline", code: c`from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

def train_sentiment(texts, labels):
    return make_pipeline(CountVectorizer(), MultinomialNB()).fit(texts, labels)` }] },
    { id: "spam", lvl: "star", title: "Spam or not — evaluated", prompt: "<p>Write <code>spam_report(msgs, labels, test_msgs, test_labels)</code> that trains a CountVectorizer + MultinomialNB pipeline and returns <code>(accuracy, predictions)</code> on the test messages, accuracy rounded to 2 decimals and predictions as a list.</p>", starter: "from sklearn.pipeline import make_pipeline\nfrom sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\ndef spam_report(msgs, labels, test_msgs, test_labels):\n    pass\n", tests: [{ after: "M = ['win free money', 'free prize click now', 'claim your prize', 'meeting at noon', 'lecture moved to sunday', 'see you at the library']\nY = ['spam', 'spam', 'spam', 'ham', 'ham', 'ham']\nTM = ['free money prize', 'library meeting sunday', 'click to win', 'noon lecture']\nTY = ['spam', 'ham', 'spam', 'ham']\nprint(spam_report(M, Y, TM, TY))", expected: "(1.0, ['spam', 'ham', 'spam', 'ham'])" }],
      hint: "<code>model.score(test_msgs, test_labels)</code> gives the accuracy; <code>list(model.predict(test_msgs))</code> the predictions.",
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
      hint: "Follow the worked example: flatten, fit TF-IDF once, then define <code>reply</code> <b>inside</b> <code>make_bot</code> and return it.",
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
      hint: "Two bugs, both in the last two lines. Which vectorizer knows the training vocabulary? What does the model understand: text or numbers?", ar: "استخدم{{g:|ي}} نفس vec مع transform، {{g:وتنبّأ|وتنبّئي}} على الأرقام وليس النص.",
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
    { q: "TF-IDF gives a high weight to a word that is…", o: ["in every document", "frequent in this document but rare in the others", "very long", "at the start of the sentence"], a: 1, e: "Rare-but-present words tell documents apart." },
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
  remember: [
    "Models need numbers: **vectorize** text first. Bag of words = one count per vocabulary word, order ignored.",
    "`vec.fit_transform(train_texts)` learns the vocabulary; `vec.transform(new_texts)` reuses it. Always pass a **list** of texts.",
    "`make_pipeline(CountVectorizer(), MultinomialNB())`: raw text in, label out — and score it on test texts like any model.",
    "TF-IDF weighs down words that appear everywhere (\"the\", \"is\").",
    "Cosine similarity: 1 = same mix of words, 0 = nothing in common. Length doesn't matter.",
    "A good bot has a threshold so it can say \"I don't understand\"; a model only knows its training data.",
  ],
  rememberAr: "نحول النص إلى أرقام أولًا (Bag of Words أو TF-IDF). fit_transform للتدريب و transform للنص الجديد. و cosine similarity يقيس تشابه نصين. والنموذج يعرف فقط ما تعلّمه من بياناته.",
};
})();

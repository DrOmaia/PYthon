window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[26] = {
  title: "Text classification and a mini chatbot",
  intro: "Spam filters, review ratings, customer-support bots, and the first step of every chat assistant all start with the same question: <b>what is this text about?</b> Today you turn words into numbers, train a text classifier, and build a small chatbot that understands what the user wants — in English and Arabic.",
  introAr: "اليوم نعلّم الحاسب فهم النصوص: نحول الكلمات إلى أرقام (Bag of Words)، وندرّب مصنّفًا يعرف هل التعليق إيجابي أم سلبي، ثم نبني روبوت محادثة صغيرًا يفهم نية المستخدم. ويعمل بالعربي أيضًا!",
  goals: ["Explain bag-of-words: turning text into numbers", "Use `CountVectorizer` and `TfidfVectorizer`", "Train a Naive Bayes text classifier with a pipeline", "Build an intent-based chatbot", "Discuss limits and bias of AI models"],
  learn: [
    { t: "h", text: "Computers need numbers: bag of words" },
    { t: "code", code: c`from collections import Counter
sentences = ["I love Python", "I love coffee", "Python is hard"]
vocab = sorted({w.lower() for s in sentences for w in s.split()})
print(vocab)
for s in sentences:
    counts = Counter(s.lower().split())
    print([counts[w] for w in vocab], "<-", s)` },
    { t: "p", html: "<p>Each sentence becomes a row of counts, one column per vocabulary word. Word order is lost (hence \"bag\"), but surprisingly this is enough for many tasks. Now the text is a table of numbers — exactly what the models from yesterday need.</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
docs = ["I love Python", "I love coffee", "Python is hard"]
vec = CountVectorizer()
X = vec.fit_transform(docs)
print(vec.get_feature_names_out())
print(X.toarray())`, note: "<p><code>CountVectorizer</code> does the same automatically (it drops one-letter words like \"I\" by default).</p>" },
    { t: "ar", html: "الفكرة: كل جملة تتحول إلى صف من الأرقام، كل رقم يمثل عدد مرات ظهور كلمة. بعدها نستخدم نفس خوارزميات الأمس." },
    { t: "h", text: "A sentiment classifier" },
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
    { t: "p", html: "<p><b>Naive Bayes</b> learns how often each word appears in each class (\"loved\" is common in positive reviews) and combines the evidence. It is fast, needs little data, and was the classic spam filter. The <b>pipeline</b> glues the vectorizer and the model so raw text goes in and labels come out.</p>" },
    { t: "h", text: "Arabic works too" },
    { t: "code", code: c`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

texts = ["المنتج ممتاز وسريع", "خدمة رائعة وممتازة", "أحببت التطبيق جدا",
         "المنتج سيء ومتأخر", "خدمة سيئة جدا", "لم يعجبني التطبيق"]
labels = ["إيجابي", "إيجابي", "إيجابي", "سلبي", "سلبي", "سلبي"]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(texts, labels)
print(model.predict(["التوصيل ممتاز", "التطبيق سيء"]))` },
    { t: "h", text: "Intent chatbot" },
    { t: "p", html: "<p>Assistants first classify <b>what the user wants</b> (the intent), then answer. Here each intent has a few example phrases; a TF-IDF vectorizer plus nearest-match finds the closest intent. <code>TfidfVectorizer</code> is like counting, but gives less weight to words that appear everywhere (\"the\", \"is\").</p>" },
    { t: "code", code: c`from sklearn.feature_extraction.text import TfidfVectorizer
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
    print(m, "->", reply(m))`, note: "<p><b>Cosine similarity</b> measures how much two word-vectors point in the same direction (1 = same words, 0 = nothing in common). The threshold 0.2 lets the bot admit it doesn't know — an important safety habit.</p>" },
    { t: "h", text: "Limits and responsibility" },
    { t: "p", html: "<p>A model only knows its training data. Train a hiring model on biased past decisions and it learns the bias. Train a sentiment model only on formal Arabic and it fails on dialects. Good AI engineers ask: <i>Is the data representative? Who could be hurt by a mistake? How do we test that?</i> Large language models like the one that helped build this course follow the same principle at an enormous scale: the text they learn from shapes everything they do.</p>" },
    { t: "ar", html: "النموذج يتعلم من بياناته فقط، وإذا كانت البيانات متحيزة سيكون النموذج متحيزًا. المهندس المسؤول يختبر نموذجه على حالات متنوعة قبل استخدامه." },
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

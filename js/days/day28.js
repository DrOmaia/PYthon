window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[28] = {
  title: "Rest day — and choose your capstone",
  intro: "Four weeks of lessons are done, {{name}}! You trained real machine-learning models, in your browser, in Python you wrote yourself. Rest today, and spend a few relaxed minutes choosing the capstone project you'll build on Days 29 and 30.",
  introAr: "{{g:أحسنت|أحسنتِ}} يا {{name}}! انتهت الدروس الأربعة أسابيع. اليوم راحة، وفكّر{{g:|ي}} بهدوء في المشروع الختامي الذي ستبني{{g:|ن}}ه في اليومين القادمين.",
  learn: [
    { t: "p", html: "<div class=\"rest-hero\"><h3>Today's light plan</h3><ol><li>Review the due cards in the <a href=\"review.html\">review deck</a>.</li><li>Read the three capstone options below and pick one.</li><li>Write in your notes <b>why</b> you picked it and one feature you want to add.</li></ol></div>" },
    { t: "h", text: "Your capstone options" },
    { t: "table", head: ["Project", "You will use", "Good if you like…"], rows: [["🗺️ Text adventure game", "functions, dicts, loops, classes, input", "stories, games, creativity"], ["📚 Library system", "classes, inheritance, files, error handling", "real-world apps, organizing data"], ["🤖 AI classifier", "numpy, scikit-learn, evaluation, text or numbers", "data, AI, experiments"]] },
    { t: "p", html: "<p>All three are guided step by step, with automatic checks for the core parts and room to add your own ideas. You can even do more than one if you have time. The final day ends with your personalized certificate.</p>" },
    { t: "h", text: "From ELIZA to today" },
    { t: "p", html: "<p>In 1966, Joseph Weizenbaum at MIT wrote <b>ELIZA</b>, a chatbot that used keyword rules — just like the rule-based bot you wrote on Day 26. People were amazed and some even shared personal feelings with it, which worried Weizenbaum deeply. Sixty years later, AI assistants learn from huge amounts of text instead of hand-written rules, but his question is still important: how should people and AI systems relate to each other, and who is responsible for what they do?</p>" },
    { t: "ar", html: "أول روبوت محادثة (ELIZA عام 1966) كان يعمل بقواعد الكلمات المفتاحية مثل الذي كتبت{{g:َ|ِ}}ه في اليوم 26. التقنية تغيرت كثيرًا، لكن سؤال المسؤولية والأخلاق ما زال مهمًا." },
    { t: "h", text: "Week 4 self-check (5 minutes)" },
    { t: "p", html: "<p>No pressure, no score — just six quick questions to see what stuck from this week. If one surprises you, reread that day's \"Remember\" box before the capstone.</p>" },
    { t: "check", q: "Binary search only works correctly when the list is…", o: ["short", "sorted", "made of numbers", "without duplicates"], a: 1, e: "Binary search decides which half to throw away by comparing with the middle item — that only makes sense if the list is sorted (Day 22).", hint: "How does it know which half to drop?" },
    { t: "check", q: "What does this print?", code: c`import numpy as np
a = np.array([[1, 2], [3, 4]])
print(a.sum(axis=0))`, o: ["`10`", "`[3 7]`", "`[4 6]`", "`[1 2 3 4]`"], a: 2, e: "`axis=0` goes down the rows, giving one result per column: 1+3 = 4 and 2+4 = 6 (Day 23).", hint: "axis=0 → one answer per column." },
    { t: "check", q: "A model predicts tomorrow's temperature in Riyadh from today's humidity and wind. Which is true?", o: ["Temperature is a feature; it is classification", "Temperature is the label; it is regression", "Humidity is the label; it is regression", "Wind is the label; it is classification"], a: 1, e: "The label is what we predict (temperature), and because it is a number, it is regression (Days 24–25).", hint: "Label = what we predict. Number → regression." },
    { t: "check", q: "Why do we scale features before k-NN?", o: ["To make training faster", "So a feature with big numbers (like attendance 0–100) does not dominate the distance", "Because k-NN only accepts numbers between 0 and 1", "To remove the test set"], a: 1, e: "k-NN uses distances, which mix all features. Without scaling, the feature with the largest range decides almost everything (Day 24).", hint: "Think about what k-NN calculates." },
    { t: "check", q: "A decision tree scores 1.0 on training data and 0.65 on test data. What should you try?", o: ["Report the 1.0", "A smaller `max_depth` (a simpler tree)", "Remove `random_state`", "Train on the test set too"], a: 1, e: "The big gap means overfitting; a simpler tree generalizes better (Day 25).", hint: "Memorizing vs learning." },
    { t: "check", q: "A chatbot uses TF-IDF and cosine similarity. The best match for \"what is the weather\" has similarity 0.05 and the threshold is 0.2. What should the bot do?", o: ["Answer with the best match anyway", "Say it didn't understand", "Crash", "Pick a random answer"], a: 1, e: "Below the threshold the match is too weak, so an honest \"Sorry, I didn't understand\" is better than a confident wrong answer (Day 26).", hint: "Why do we have a threshold at all?" },
  ],
  extraTitle: "Reflection and free play",
  extra: [
    { t: "p", html: "<p><b>In your notes:</b></p><ol><li>Which week was the hardest, and what finally made it click?</li><li>Explain in two sentences how a machine \"learns\" — as if to a family member.</li><li>Which capstone did you choose, and what's one extra feature you'd love to add?</li></ol>" },
    { t: "try", title: "Free play: a tiny ELIZA", html: "<p>Extend the rules, or make it reply in Arabic.</p>", code: c`rules = {"sad": "Why do you feel sad?", "python": "What do you like about Python?", "exam": "How are you preparing for it?"}
msg = input("You: ").lower()
for key, answer in rules.items():
    if key in msg:
        print("ELIZA:", answer)
        break
else:
    print("ELIZA: Tell me more.")`, stdin: "I have a Python exam tomorrow" },
  ],
  cards: [
    { f: "What was ELIZA?", b: "A 1966 rule-based chatbot by Joseph Weizenbaum at MIT." },
  ],
  remember: [
    "Binary search: O(log n), needs a sorted list. Selection sort: O(n²). `sorted()`: O(n log n).",
    "numpy: math on whole arrays, masks `a[a > 0]`, columns `X[:, 0]`, `axis=0` = one result per column.",
    "ML vocabulary: features `X` (2D table), labels `y`; classification = category, regression = number.",
    "The recipe: `train_test_split` → `fit` on train → `predict` → `score` on test → compare with the baseline.",
    "Overfitting = great on training data, weak on new data. Scale features for k-NN, not for trees.",
    "Text: vectorize with `CountVectorizer` / `TfidfVectorizer`; `transform` (not fit) for new text; cosine similarity for chatbots.",
    "A model only knows its data: check for bias, protect privacy, and let people make the final decisions.",
  ],
  rememberAr: "خلاصة الأسبوع الرابع: خوارزميات البحث والترتيب، و numpy، وأساسيات التعلم الآلي (X و y، التقسيم، fit و predict و score)، وتحويل النص إلى أرقام. والأهم: الذكاء الاصطناعي المسؤول.",
};
})();

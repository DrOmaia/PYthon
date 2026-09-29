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
    { t: "ar", html: "أول روبوت محادثة (ELIZA عام 1966) كان يعمل بقواعد الكلمات المفتاحية مثل الذي كتبته{{g:|ِ}} في اليوم 26. التقنية تغيرت كثيرًا، لكن سؤال المسؤولية والأخلاق ما زال مهمًا." },
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
};
})();

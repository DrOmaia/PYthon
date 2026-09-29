window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[7] = {
  title: "Rest day",
  intro: "You finished your first week, {{name}}. Today there is no new lesson. Your brain turns what you practiced into long-term memory while you rest — so resting is part of learning, not a break from it.",
  introAr: "{{g:أحسنت|أحسنتِ}} يا {{name}}! أنهيت{{g:|ِ}} الأسبوع الأول. اليوم راحة: مراجعة خفيفة لمدة ١٥ دقيقة فقط إن أردت{{g:|ِ}}، وقراءة ممتعة، ثم استمتع{{g:|ي}} بيومك.",
  learn: [
    { t: "p", html: "<div class=\"rest-hero\"><h3>Today's plan (optional, about 20 minutes)</h3><ol><li>Open the <a href=\"review.html\">review deck</a> and go through the cards that are due.</li><li>Read the short story below.</li><li>Write three lines in your notes (questions are at the bottom).</li></ol><p style=\"margin:0\">That's it. Close the laptop and do something you enjoy.</p></div>" },
    { t: "h", text: "Why is it called Python?" },
    { t: "p", html: "<p>Not because of the snake! In the late 1980s, a Dutch programmer named <b>Guido van Rossum</b> started writing a new language as a holiday project. He was reading the scripts of <i>Monty Python's Flying Circus</i>, a British comedy show, and wanted a name that was short, unique and a little funny. Python was released in 1991.</p><p>Guido's big idea was that <b>code is read much more often than it is written</b>. That's why Python uses indentation instead of brackets, English words like <code>and</code>, <code>or</code>, <code>not</code>, and why its community cares so much about clean, readable code.</p>" },
    { t: "h", text: "The Zen of Python" },
    { t: "code", code: c`import this`, before: "<p>Python has a hidden poem of design principles. Run this line to read it:</p>", noViz: true },
    { t: "p", html: "<p>Some lines will make more sense in a few weeks. For now, notice these: <i>Beautiful is better than ugly. Simple is better than complex. Readability counts. Errors should never pass silently.</i> You have already practiced all four this week.</p>" },
    { t: "ar", html: "هذه المبادئ تلخص فلسفة بايثون: الكود الجميل البسيط المقروء أفضل من الكود المعقد. تذكّر{{g:|ي}} ذلك دائمًا عند كتابة حلولك." },
    { t: "h", text: "Look how far you came" },
    { t: "p", html: "<p>A week ago, <code>print(\"Hello\")</code> was new. Today you can read user input, calculate, format text professionally and make decisions. The Smart Calculator you built yesterday is a real program. Next week, loops will let your programs repeat — and suddenly you will be able to build games, process lists of data and automate boring work.</p>" },
  ],
  extraTitle: "Reflection and a bonus puzzle",
  extra: [
    { t: "p", html: "<p><b>Write in your notes below:</b></p><ol><li>What was the most surprising thing about Python this week?</li><li>Which error message did you see most often, and what caused it?</li><li>One thing that still feels unclear — go back to that day's lesson tomorrow for 10 minutes.</li></ol>" },
    { t: "predict", prompt: "Bonus puzzle for the curious (totally optional). What does this print?", code: c`word = "stressed"
print(word[::-1])
print(len("rest") * "!")`, explain: "\"stressed\" backwards is <code>desserts</code> — a nice reward for a rest day. And 4 exclamation marks: <code>!!!!</code>." },
    { t: "try", title: "Free play", html: "<p>No rules. Draw something with text, make a mini quiz with <code>if</code>, or write a program that compliments you. Have fun.</p>", code: c`print("I finished week 1!")
print("🌸" * 7)
` },
  ],
  cards: [
    { f: "Who created Python, and where does the name come from?", b: "Guido van Rossum; named after the comedy show Monty Python." },
    { f: "Why does Python use indentation?", b: "Readability: code is read more often than written." },
  ],
};
})();

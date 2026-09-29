window.DAYS = window.DAYS || {};
(function () {
const c = String.raw;
DAYS[14] = {
  title: "Rest day",
  intro: "Two weeks done, {{name}}! You can now write programs that repeat, remember and organize data. Rest today — your brain is busy wiring loops and dictionaries into long-term memory.",
  introAr: "{{g:أحسنت|أحسنتِ}} يا {{name}}! انتهى نصف الرحلة تقريبًا. اليوم راحة: مراجعة البطاقات لمدة ١٥ دقيقة، وقراءة قصيرة ممتعة، ثم استمتع{{g:|ي}} بيومك.",
  learn: [
    { t: "p", html: "<div class=\"rest-hero\"><h3>Today's light plan (about 20 minutes)</h3><ol><li>Go through today's cards in the <a href=\"review.html\">review deck</a>.</li><li>Read the story below.</li><li>Write three lines in your notes.</li></ol></div>" },
    { t: "h", text: "The loop that saved a mission" },
    { t: "p", html: "<p>In 1969, the Apollo 11 guidance computer — with less memory than a modern calculator — started showing error alarms during the Moon landing. The software, led by <b>Margaret Hamilton</b>, had been designed to <b>prioritize</b>: it kept looping over the most important jobs and dropped the less important ones when it was overloaded. The landing continued safely.</p><p>Hamilton is one of the people who made \"software engineering\" a real discipline. The lesson for you: careful thinking about what can go wrong — exactly like your input validation loops — is what makes software trustworthy.</p>" },
    { t: "h", text: "Why dictionaries are fast" },
    { t: "p", html: "<p>Looking up a word in a list of a million words means checking up to a million items. A dictionary uses a trick called <b>hashing</b>: it turns the key into a number that points almost directly to where the value is stored. That's why <code>key in my_dict</code> and <code>x in my_set</code> are nearly instant, no matter how big they grow. You will study this in Data Structures.</p>" },
    { t: "code", code: c`import time
big_list = list(range(1_000_000))
big_set = set(big_list)
t = time.time(); 999_999 in big_list; print("list:", round(time.time() - t, 5), "s")
t = time.time(); 999_999 in big_set; print("set: ", round(time.time() - t, 5), "s")`, before: "<p>See it yourself:</p>", noViz: true },
    { t: "ar", html: "البحث في set أو dict سريع جدًا مهما كبر حجمها، بينما البحث في list يمر على العناصر واحدًا واحدًا." },
  ],
  extraTitle: "Reflection and free play",
  extra: [
    { t: "p", html: "<p><b>In your notes:</b></p><ol><li>Which is clearer for you now: <code>for</code> or <code>while</code>? When would you use each?</li><li>Describe the counting pattern with a dictionary in your own words.</li><li>What kind of program would you like to build with what you know now?</li></ol>" },
    { t: "try", title: "Free play: emoji rain", html: "<p>Change the emojis, the width, or make a pattern.</p>", code: c`import random
random.seed(7)
for row in range(6):
    line = ""
    for col in range(20):
        line += random.choice(["🌸", " ", " ", "💧", " "])
    print(line)` },
  ],
  cards: [
    { f: "Why is `x in my_set` fast?", b: "Hashing: the value is found almost directly, without checking every item." },
    { f: "Who was Margaret Hamilton?", b: "Led the Apollo 11 flight software team; pioneer of software engineering." },
  ],
};
})();

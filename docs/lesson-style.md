# Py30 lesson style guide

How every day file (`js/days/dayNN.js`) is written. Days 1–3 are the model: read `js/days/day01.js` in full
before writing a lesson. Goal: every lesson teaches as slowly and clearly as Day 1 — the student never meets an
idea without a reason, an example, an explanation of the example, and a quick check.

## The teaching pattern for every idea (each `h` section of `learn`)

1. **`h`** — a short heading.
2. **`p` — why**: what problem does this idea solve? 2–4 sentences, a real situation from a student's life.
3. **`analogy`** — an everyday picture of the idea (at least 2 per lesson).
4. **`code`** — a small example (3–8 lines) with **one** new idea. Use `before` to say what to look at and
   `note` to explain the result. Never a block that shows six new things at once — split it.
5. **`lines`** — read the key example line by line ("Read it like a programmer"), like Day 1 does for `print`.
6. **`ar`** — a short Arabic hint after each key idea (1–2 sentences, simple Arabic).
7. **`check`** — one quick question so the student proves they understood before moving on.

Also in every lesson day:
- **`steps`** — at least one worked example: a realistic problem solved in 3–6 steps
  (understand → plan → build piece by piece → full program), with the full runnable `code` at the end.
- **`viz`** — at least one, where watching the code run line by line helps.
- **`table`** — a summary table when there are several methods / operators.

## Size targets

| Part | Lesson day | Review day (6, 13, 20, 27) | Rest day (7, 14, 21, 28) | Project (29, 30) |
| --- | --- | --- | --- | --- |
| Words of explanation in `learn` (not counting code) | 600–1000 | week recap 350+ | as now | as now + plan |
| `check` in `learn` | 4–6 | 1 per lesson of the week | 4–6 (self-check of the week) | 2–3 |
| `lines` | 2+ | – | – | – |
| `steps` | 1–2 | 1 | – | 1 |
| `analogy` | 2+ | – | – | – |
| `ar` hints | 4+ | 2+ | as now | 2+ |
| `practice` items (`try` / `predict` / `parsons`) | 6–8 | as now + 1–2 | – | – |
| `mistakes` / `tricks` | 4 / 3 | – | – | – |
| `exercises` / `quiz` / `cards` | keep all, 7+ / 5–6 / 5 | keep | – | keep |
| `remember` (+ `rememberAr`) | 5–6 bullets | 6–8 (the week) | 6–8 (the week) | 4–6 |

Review days start `learn` with a **Week recap**: for each lesson of the week a heading, 2–3 sentences, a tiny
example and a `check`; then the existing project.

## Writing

- English, simple (about B1), friendly, second person ("you"). Use `{{name}}` now and then.
- Arabic hints: short, clear, use the gender template like the existing files: `انتبه{{g:|ي}}`, `{{g:أحسنت|أحسنتِ}}`.
- Examples from a student's life: marks, timetables, riyals, coffee orders, Riyadh weather, a library, a gym.
- Build on earlier days only (do not use an idea before the day that teaches it).
- Python standard library only (plus `numpy` and `sklearn` in week 4). No network, no long `sleep`.
- A code block that calls `input()` needs a `stdin` field (the lines the user "types").
- A code block that fails on purpose gets `error: true` and a `note` that says the error is expected.

## Block reference

Fields shown in **md** take plain text with `` `code` `` and `**bold**` (no HTML). Fields shown in **html** take HTML.
Code goes inside ``c`...` `` (`String.raw`): never write `${` or a backtick inside it.

```js
{ t: "h", text: "Heading" }
{ t: "p", html: "<p>…</p>" }
{ t: "analogy", title: "A list is like a train", html: "<p>…</p>" }
{ t: "code", code: c`…`, stdin: "5\n7", before: "<p>…</p>", note: "<p>…</p>" }
{ t: "viz", code: c`…`, before: "<p>…</p>" }
{ t: "lines", title: "Read it like a programmer", rows: [["total = 0", "html explanation"], ["for m in marks:", "…"]] }
{ t: "ar", html: "تلميح قصير بالعربي" }
{ t: "check", q: "md question", code: c`optional code`, o: ["md", "md", "md"], a: 1, e: "md why", hint: "md shown after a wrong answer (optional)", ar: "optional Arabic" }
{ t: "steps", title: "Average of marks", problem: "<p>html problem</p>",
  steps: [{ html: "<p>Step text</p>", code: c`optional code for this step` }, …],
  code: c`full runnable program`, stdin: "optional", ar: "optional Arabic summary" }
{ t: "table", head: ["md", "md"], rows: [["md", "md"]] }
```

Day-level fields: `title, intro, introAr, goals[md], learn[], mistakes[], tricks[], practice[], exercises[],
quiz[], puzzle, cards[], remember[md], rememberAr`.
Keep every existing exercise `id` (student progress is saved by id). New exercises need new unique ids.

## Check before you finish

```bash
node --check js/days/dayNN.js
node tools/check-lessons.js NN      # runs every example and solution — must say "All good."
```
Also run each `check` and `predict` snippet in Python yourself so the answer marked correct really is correct.

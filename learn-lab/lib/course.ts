import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

// One flat shape for every question kind (simpler for the model). Unused fields stay empty.
const Item = z.object({
  k: z.enum(["mc", "fill", "type", "match", "build", "teach", "listen"]),
  q: z.string(), // question (mc, type with ___, build title, teach prompt)
  opts: z.array(z.string()), // options (mc, listen)
  a: z.string(), // correct answer (mc, listen, fill)
  s: z.string(), // sentence with one ___ (fill)
  bank: z.array(z.string()), // word bank (fill)
  answers: z.array(z.string()), // accepted typed answers (type)
  pairs: z.array(z.object({ l: z.string(), r: z.string() })), // match
  tiles: z.array(z.string()), // build: all tiles
  seq: z.array(z.string()), // build: correct order
  keys: z.array(z.array(z.string())), // teach: groups of key words
  need: z.number().int(), // teach: how many groups must appear
  model: z.string(), // teach: model answer
  say: z.string(), // listen: the word Bruno says
  why: z.string(), // short explanation for "Explain my answer"
});

const Course = z.object({
  topic: z.string(),
  concepts: z.array(
    z.object({
      name: z.string(),
      emoji: z.string(),
      icon: z.enum(["sun", "cell", "leaf", "drop", "cube", "cycle"]),
      body: z.string(),
      cards: z.array(z.object({ f: z.string(), b: z.string() })),
      pool: z.array(Item),
    }),
  ),
});

const PROMPT = (topic: string, level: string) => `Make a short course about "${topic}" for a learner who says: "${level}".

Write 4 concepts in teaching order, from the basics to the main idea. For each concept:
- name: at most 4 words. emoji: one emoji that pictures it. icon: the closest of sun, cell, leaf, drop, cube, cycle.
- body: 2 short, plain sentences that teach it.
- cards: 2 flashcards (f = front, b = back), short.
- pool: 4 questions. The FIRST question must be "mc". Then use 3 different kinds from: fill, type, match, build, teach, listen.

Rules for each kind (fill only the fields it uses, leave the others empty):
- mc: q, opts (4 short options), a (exactly one of opts).
- fill: s (a sentence with exactly one "___"), bank (3 words), a (one word from bank).
- type: q (with exactly one "___"), answers (1-3 accepted short answers, lowercase).
- match: pairs (3 pairs of short terms, l and r).
- build: q (e.g. "Put the steps in order"), seq (3-5 short tiles in the right order), tiles (seq plus 1 wrong tile).
- teach: q (Bruno asks the learner to explain something), keys (2-3 groups of lowercase key words, any word in a group counts), need (2), model (a 1-2 sentence model answer).
- listen: say (one key term), opts (4 similar-looking words), a (same as say).
Every question has why: 1-2 short sentences that explain the right answer.
Use simple words. Be correct.`;

type RawCourse = z.infer<typeof Course>;
type RawItem = RawCourse["concepts"][number]["pool"][number];
const clean = (s: string) => s.trim();
const words = (a: string[]) => a.map(clean).filter(Boolean);

// Check one question against what Bruno's lesson engine needs. Returns null if it is broken.
function checkItem(it: RawItem): Record<string, unknown> | null {
  const why = clean(it.why) || "Good thinking.";
  switch (it.k) {
    case "mc": {
      const opts = words(it.opts);
      return opts.length >= 2 && opts.includes(clean(it.a)) ? { k: "mc", q: clean(it.q), opts, a: clean(it.a), why } : null;
    }
    case "listen": {
      const opts = words(it.opts), say = clean(it.say);
      return say && opts.includes(say) ? { k: "listen", say, opts, a: say, why } : null;
    }
    case "fill": {
      const bank = words(it.bank), s = clean(it.s);
      return s.split("___").length === 2 && bank.includes(clean(it.a)) ? { k: "fill", s, bank, a: clean(it.a), why } : null;
    }
    case "type": {
      const answers = words(it.answers).map((a) => a.toLowerCase()), q = clean(it.q);
      return q.split("___").length === 2 && answers.length ? { k: "type", q, answers, why } : null;
    }
    case "match": {
      const pairs = it.pairs.map((p) => [clean(p.l), clean(p.r)]).filter(([l, r]) => l && r);
      const unique = new Set(pairs.map((p) => p[0])).size === pairs.length && new Set(pairs.map((p) => p[1])).size === pairs.length;
      return pairs.length >= 2 && unique ? { k: "match", pairs, why } : null;
    }
    case "build": {
      const seq = words(it.seq), tiles = words(it.tiles);
      const left = [...tiles];
      const fits = seq.every((t) => {
        const i = left.indexOf(t);
        if (i < 0) return false;
        left.splice(i, 1);
        return true;
      });
      return seq.length >= 2 && fits ? { k: "build", q: clean(it.q) || "Put the pieces in order.", tiles, seq, why } : null;
    }
    case "teach": {
      const keys = it.keys.map((g) => words(g).map((w) => w.toLowerCase())).filter((g) => g.length);
      const need = Math.max(1, Math.min(it.need || 2, keys.length));
      return keys.length && clean(it.model) ? { k: "teach", q: clean(it.q), keys, need, model: clean(it.model), why } : null;
    }
  }
  return null;
}

// Turn the model's answer into Bruno's content format: {topic, concepts}.
function toBruno(raw: RawCourse, topic: string) {
  const concepts = raw.concepts
    .map((c, i) => {
      const pool = c.pool.map(checkItem).filter((x): x is Record<string, unknown> => x !== null);
      const first = pool.findIndex((x) => x.k === "mc"); // the Q&A quiz uses the first question, so it must be "mc"
      if (first < 0) return null;
      pool.unshift(...pool.splice(first, 1));
      const cards = c.cards.map((k, j) => ({ id: `c${i}k${j}`, f: clean(k.f), b: clean(k.b) })).filter((k) => k.f && k.b);
      if (pool.length < 2 || !cards.length) return null;
      return { id: `c${i}`, name: clean(c.name), icon: c.icon, emoji: clean(c.emoji) || "💡", body: clean(c.body), cards, pool };
    })
    .filter((c) => c !== null);
  if (concepts.length < 2) throw new Error("The course came out too small. Please try again.");
  return { topic: clean(raw.topic) || topic, concepts };
}

// One LLM call: topic in, a full Bruno course out.
export async function makeCourse(topic: string, level: string) {
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    output_config: { effort: "low", format: betaZodOutputFormat(Course) },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    messages: [{ role: "user", content: PROMPT(topic, level) }],
  });
  if (response.stop_reason === "refusal") throw new Error("Claude declined this topic. Please try another one.");
  if (!response.parsed_output) throw new Error("The course could not be read. Please try again.");
  return toBruno(response.parsed_output, topic);
}

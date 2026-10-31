import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

const Grade = z.object({
  score: z.number(), // 0 to 1
  feedback: z.string(),
  matched: z.array(z.string()),
});

export type GradeRequest = {
  question: string;
  rubric: { keywords?: string[][]; need?: number; model_answer?: string };
  answer: string;
};

// One quick LLM call: grade a learner's own-words explanation ("Teach Bruno").
export async function gradeAnswer(req: GradeRequest) {
  const keys = (req.rubric?.keywords || []).map((g) => g.join(" / ")).join("; ");
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 2000,
    output_config: { effort: "low", format: betaZodOutputFormat(Grade) },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    messages: [
      {
        role: "user",
        content: `You are Bruno, a friendly tutor. Grade the learner's explanation. Judge the meaning, not the exact words. Ignore spelling mistakes.

Question: ${req.question}
Model answer: ${req.rubric?.model_answer || ""}
Key ideas (any word in a group counts): ${keys}

Learner's answer: """${String(req.answer || "").slice(0, 1500)}"""

Return:
- score: 0 to 1 (1 = all key ideas correct, 0.5 = about half, 0 = wrong or empty).
- feedback: 1-2 short, kind sentences to the learner. Say what was right, and name one missing idea if there is one.
- matched: the key ideas the learner got, in a few words each.`,
      },
    ],
  });
  const g = response.parsed_output;
  if (response.stop_reason === "refusal" || !g) throw new Error("No grade");
  return { score: Math.max(0, Math.min(1, g.score)), feedback: g.feedback, matched: g.matched };
}

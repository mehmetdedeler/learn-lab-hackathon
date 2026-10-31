import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

const Topics = z.object({
  title: z.string(),
  topics: z.array(
    z.object({
      title: z.string(),
      summary: z.string(),
      key_facts: z.array(z.string()),
      visual_idea: z.string(),
    }),
  ),
});

// Claude reads the PDF directly (no text extraction needed) and returns a topic list.
export async function pdfToTopics(pdf: Buffer) {
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { format: betaZodOutputFormat(Topics) },
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: { type: "base64", media_type: "application/pdf", data: pdf.toString("base64") },
          },
          {
            type: "text",
            text:
              "Split this lecture into 3-6 topics, in teaching order. For each topic give: a short summary, " +
              "the key facts a student must learn, and one idea for an interactive visual that teaches it.",
          },
        ],
      },
    ],
  });
  return response.parsed_output!;
}

// Turn the topic list into the first message for the lesson agent.
export function topicsToRequest(t: z.infer<typeof Topics>) {
  return (
    `Build a step-by-step lesson called "${t.title}" with one step per topic below, then a "Try it" quiz.\n\n` +
    JSON.stringify(t.topics, null, 2)
  );
}

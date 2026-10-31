import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { APP } from "./config";
import { createSession, getRunningSandbox } from "./sandbox";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

const Page = z.object({ title: z.string(), html: z.string() });

const PROMPT = (topic: string, concepts: string[], request: string) => `Make ONE small interactive visual that teaches "${topic}".
The course covers: ${concepts.join(", ")}.
${request ? `The learner asks for this: "${request}". Do exactly that.` : "Show the single most important idea of the topic."}

Return a complete, self-contained HTML page (html field) and a short title (max 5 words).
Rules:
- One file. Inline <style> and <script> only. No external files, libraries, fonts or images.
- It shows inside a phone frame of about 360 x 420 px. Everything must fit without scrolling: no horizontal or vertical scroll.
- Style: white background, rounded cards, font-family system-ui. Colors: blue #43C0F6, green #58CC02, red #FF4B4B, gold #FFC800, orange #FF9600, text #3C3C3C.
- Content, top to bottom: one SVG drawing (viewBox "0 0 340 220", width 100%, max-height 220px), then 1 or 2 controls (a range slider or 2-4 buttons), then a 1-2 sentence caption that changes when the learner uses the control. No page title (the app shows it). Small margins (8 px).
- The drawing must react at once and smoothly (CSS transitions). Label the parts on the drawing.
- Big touch targets (at least 40 px). Plain words. Keep the page under 150 lines.`;

// One LLM call: topic in, one small HTML page out.
async function makePage(topic: string, concepts: string[], request: string) {
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    output_config: { effort: "low", format: betaZodOutputFormat(Page) },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    messages: [{ role: "user", content: PROMPT(topic, concepts, request) }],
  });
  if (response.stop_reason === "refusal") throw new Error("Claude declined this visual. Please try other words.");
  const page = response.parsed_output;
  if (!page || !/<svg|<canvas/i.test(page.html)) throw new Error("The visual came out empty. Please try again.");
  return page;
}

// Make the page and, at the same time, get this browser's sandbox. Then put the page in the
// sandbox. Vite serves files in public/ as they are, so the page is live at <preview>/v/<name>.html.
export async function makeVisual(opts: { topic: string; concepts: string[]; request?: string; sandboxId?: string }) {
  const [page, session] = await Promise.all([
    makePage(opts.topic, opts.concepts, opts.request || ""),
    createSession(opts.sandboxId),
  ]);
  const sandbox = await getRunningSandbox(session.sandboxId);
  const name = `${Date.now().toString(36)}.html`;
  const marker = `<!-- learn-lab ${name} -->`;
  const url = `${session.url.replace(/\/$/, "")}/v/${name}`;
  await sandbox.process.executeCommand(`mkdir -p ${APP}/public/v`, undefined, undefined, 30);
  await sandbox.fs.uploadFile(Buffer.from(`${page.html}\n${marker}\n`), `${APP}/public/v/${name}`);
  // Vite needs a moment to notice a new file in public/. Until then it answers with the starter page,
  // so wait until the new page is really served before Bruno opens it.
  for (let i = 0; i < 20; i++) {
    const served = await fetch(url, { cache: "no-store" })
      .then((r) => r.text())
      .then((t) => t.includes(marker), () => false);
    if (served) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  return { sandboxId: session.sandboxId, url, title: page.title, local: session.local };
}

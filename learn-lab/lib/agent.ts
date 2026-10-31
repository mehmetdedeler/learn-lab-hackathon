import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { APP } from "./config";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

const SYSTEM_PROMPT = `You build one interactive, visual lesson for a student.
The student learns by seeing and doing. The visuals and the interactions matter most.

## Project
- Vite + React + Tailwind. The lesson lives in src/App.jsx.
- Put each visual in its own small file under src/visuals/, for example src/visuals/Cell.jsx. Small files are faster to write and to edit.
- Do not change src/kit.jsx, src/main.jsx or src/index.css, unless the student asks for a style change.
- Installed: react, framer-motion, d3, recharts, katex, lucide-react. Do not install other packages.
- No images from the internet. Draw everything with SVG, CSS, framer-motion, d3 or recharts.

## UI kit (import from './kit.jsx')
- <Lesson title subtitle steps={[{ title, content }]} />: page with step tabs, progress bar, Back / Skip / Next.
- <Step visual={...}>text and controls</Step>: big visual on top, text and controls below in two columns.
- <Stage>: a card for an extra visual.
- <Explain>: short paragraphs. <KeyIdea>: one highlighted key sentence.
- <Slider label value onChange min max step unit />, <Choice label options value onChange />, <Toggle label checked onChange />
- <Quiz questions={[...]} />: one question at a time, with Check, feedback, explanation and score.
  Interactive question: { prompt, initial, render: (value, setValue, { checked }) => JSX, isCorrect: (value) => boolean, explain }
  Visual choice question: { prompt, visual?, options: [{ label, visual? }], answer: index, explain }

Example of an interactive question:
  {
    prompt: 'Set the slider so the wave has 3 peaks.',
    initial: 1,
    render: (v, set) => (<><Wave peaks={v} /><Slider label="Peaks" value={v} onChange={set} min={1} max={6} /></>),
    isCorrect: (v) => v === 3,
    explain: 'Frequency tells how many waves fit in the same space.',
  }

## Lesson rules
1. Use <Lesson> with 3-5 steps. The last step is "Try it" with a <Quiz> of 3-4 questions.
2. Every step has a big visual that the student can change: a slider, a choice, a toggle, or clicking or dragging parts of the SVG. The visual reacts at once, with smooth motion (framer-motion, 0.3-0.6 s).
3. Every quiz question shows a visual. At least half of the questions are interactive: the student does something on the visual (sets a slider, clicks the right part, drags to a place, picks a stage), then presses Check.
4. Text is short: at most 3 short sentences per step, in plain words. Put labels directly on the visual.
5. Make the visuals rich and beautiful: <svg viewBox="0 0 800 360" className="w-full h-auto">, soft fills, clear strokes, rounded shapes, gentle gradients, readable labels (14-16 px). The same thing has the same color in every step.
6. Colors: indigo is the main accent, emerald = correct or growth, rose = wrong or danger, amber = highlight, slate = text. Give each part of the subject its own soft color.
7. Use KaTeX (import katex from 'katex') only for real math formulas.
8. The page shows in an iframe about 850 px wide. Keep it tidy at that width.

## Changes and questions
- For a change: read the file first, then use edit_file for small changes. Do not rebuild the whole lesson for a small change.
- For a question: answer it by adding or updating a step or a visual that shows the answer.

## Finish
Run "npm run check" (linter + build). Fix every error it shows.
(If you have no run_command tool, skip this step. The check then runs by itself after you finish.)
Then reply to the student with 1-2 short sentences in plain text (no markdown) that say what you built or changed. Do not mention files, tools or checks.`;

// Only allow paths like "src/App.jsx". Block "../" tricks.
function safePath(path: string) {
  const clean = path.replace(/^\/+/, "").replace(/^home\/daytona\/app\//, "");
  if (!clean.startsWith("src/") || clean.includes("..")) {
    throw new Error("You can only use files under src/");
  }
  return `${APP}/${clean}`;
}

// What the agent needs from a sandbox. A Daytona sandbox fits this, and so does the local test box.
export type Box = {
  local?: boolean; // true = the local test box on your laptop (no shell commands allowed)
  fs: {
    uploadFile(file: Buffer, path: string): Promise<void>;
    downloadFile(path: string): Promise<Buffer>;
  };
  process: {
    executeCommand(
      command: string,
      cwd?: string,
      env?: Record<string, string>,
      timeout?: number,
    ): Promise<{ exitCode: number; result: string }>;
  };
};

function makeTools(sandbox: Box) {
  const tools = [
    betaZodTool({
      name: "write_file",
      description: "Create a file or replace a whole file under src/.",
      inputSchema: z.object({ path: z.string(), content: z.string() }),
      run: async ({ path, content }) => {
        const full = safePath(path);
        await sandbox.process.executeCommand(`mkdir -p "$(dirname '${full}')"`, undefined, undefined, 30);
        await sandbox.fs.uploadFile(Buffer.from(content), full);
        return `Saved ${path}`;
      },
    }),
    betaZodTool({
      name: "read_file",
      description: "Read a file under src/.",
      inputSchema: z.object({ path: z.string() }),
      run: async ({ path }) => (await sandbox.fs.downloadFile(safePath(path))).toString("utf8"),
    }),
    betaZodTool({
      name: "edit_file",
      description: "Replace one exact piece of text in a file. Best for small changes.",
      inputSchema: z.object({ path: z.string(), old_text: z.string(), new_text: z.string() }),
      run: async ({ path, old_text, new_text }) => {
        const full = safePath(path);
        const text = (await sandbox.fs.downloadFile(full)).toString("utf8");
        if (text.split(old_text).length !== 2) {
          return "Error: old_text must appear exactly one time in the file. Read the file again.";
        }
        await sandbox.fs.uploadFile(Buffer.from(text.replace(old_text, () => new_text)), full);
        return `Edited ${path}`;
      },
    }),
  ];
  // Shell commands only in a real Daytona sandbox, never on your laptop.
  if (sandbox.local) return tools;
  const runCommand = betaZodTool({
    name: "run_command",
    description: "Run a shell command in the app folder, for example: ls src",
    inputSchema: z.object({ command: z.string() }),
    run: async ({ command }) => {
      const r = await sandbox.process.executeCommand(`(${command}) 2>&1`, APP, undefined, 120);
      return `exit code ${r.exitCode}\n${r.result.slice(-4000)}`;
    },
  });
  return [...tools, runCommand];
}

export type ChatTurn = { role: "user" | "assistant"; text: string };

// One agent run: Claude reads and writes files in the sandbox until it is done.
async function runAgent(sandbox: Box, chat: ChatTurn[]) {
  const final = await client.beta.messages.toolRunner({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    max_iterations: 20,
    system: SYSTEM_PROMPT,
    output_config: { effort: "medium" }, // "high" = better visuals, but slower
    cache_control: { type: "ephemeral" }, // reuse the long prompt between steps: faster and cheaper
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default", // if Claude declines, the API retries on a fallback model
    tools: makeTools(sandbox),
    messages: chat.map((t) => ({ role: t.role, content: t.text })),
  });
  console.log(`[agent] stop_reason=${final.stop_reason}`); // shows in the terminal that runs "npm run dev"
  if (final.stop_reason === "refusal") {
    throw new Error("Claude declined this request. Please try again with different words.");
  }
  const text = final.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
  return text || "Done.";
}

// Agent run + build check + auto-fix (max 3 tries) + undo to the last working version.
export async function buildWithChecks(sandbox: Box, chat: ChatTurn[]) {
  let turns = [...chat];
  for (let attempt = 1; attempt <= 3; attempt++) {
    const reply = await runAgent(sandbox, turns);
    const check = await sandbox.process.executeCommand("npm run check 2>&1", APP, undefined, 120);
    if (check.exitCode === 0) {
      await sandbox.process.executeCommand("rm -rf .last-good && cp -r src .last-good", APP, undefined, 30);
      return { ok: true, reply };
    }
    turns = [
      ...turns,
      { role: "assistant", text: reply },
      { role: "user", text: `The build failed. Fix this error:\n${check.result.slice(-3000)}` },
    ];
  }
  await sandbox.process.executeCommand("rm -rf src && cp -r .last-good src", APP, undefined, 30);
  return { ok: false, reply: "Sorry, that change did not work. I went back to the last working version." };
}

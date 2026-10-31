import { createSession } from "@/lib/sandbox";

export const maxDuration = 120; // seconds this route may run

// Body (optional): { sandboxId } = the sandbox this browser used before.
export async function POST(req: Request) {
  try {
    const { sandboxId } = (await req.json().catch(() => ({}))) as { sandboxId?: string };
    const session = await createSession(sandboxId);
    return Response.json(session); // { sandboxId, url, local, reused }
  } catch (e) {
    const message = String(e);
    console.error("[session] could not start:", message); // shows in the Terminal that runs "npm run dev"
    const hint = /disk limit exceeded/i.test(message)
      ? " Delete Daytona sandboxes you do not need in the dashboard (Sandboxes). Stopped ones still use disk. Then reload this page."
      : /limit exceeded/i.test(message)
      ? " Too many Daytona sandboxes are running. Stop old ones in the Daytona dashboard (Sandboxes), then reload this page."
      : /too many requests|rate ?limit/i.test(message)
        ? " Daytona got too many requests in a short time. Wait 1 minute, then reload this page."
        : "";
    return Response.json({ error: message + hint }, { status: 500 });
  }
}

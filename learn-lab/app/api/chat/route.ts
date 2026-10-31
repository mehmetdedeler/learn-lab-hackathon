import { buildWithChecks, type ChatTurn } from "@/lib/agent";
import { getRunningSandbox } from "@/lib/sandbox";

export const maxDuration = 300; // the agent can take 1-3 minutes

export async function POST(req: Request) {
  const { sandboxId, chat } = (await req.json()) as { sandboxId: string; chat: ChatTurn[] };
  try {
    const sandbox = await getRunningSandbox(sandboxId);
    const result = await buildWithChecks(sandbox, chat);
    return Response.json(result); // { ok, reply }
  } catch (e) {
    return Response.json({ ok: false, reply: String(e) }, { status: 500 });
  }
}

import { createSession } from "@/lib/sandbox";

export const maxDuration = 120; // seconds this route may run

export async function POST() {
  try {
    const session = await createSession();
    return Response.json(session); // { sandboxId, url }
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

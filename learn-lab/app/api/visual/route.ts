import { makeVisual } from "@/lib/visual";

export const maxDuration = 180; // seconds this route may run

// Body: { topic, concepts, request?, sandboxId? } -> { url, sandboxId, title }
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { topic?: string; concepts?: string[]; request?: string; sandboxId?: string };
    if (!body.topic?.trim()) return Response.json({ error: "No topic." }, { status: 400 });
    return Response.json(
      await makeVisual({
        topic: body.topic.trim(),
        concepts: (body.concepts || []).slice(0, 8),
        request: (body.request || "").slice(0, 300),
        sandboxId: body.sandboxId || undefined,
      }),
    );
  } catch (e) {
    console.error("[visual] failed:", String(e));
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

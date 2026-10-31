import { makeCourse } from "@/lib/course";

export const maxDuration = 120; // seconds this route may run

// Body: { topic, level } -> Bruno course { topic, concepts }
export async function POST(req: Request) {
  try {
    const { topic, level } = (await req.json()) as { topic?: string; level?: string };
    if (!topic?.trim()) return Response.json({ error: "Please type a topic." }, { status: 400 });
    return Response.json(await makeCourse(topic.trim().slice(0, 120), level || "I'm brand new to this"));
  } catch (e) {
    console.error("[course] failed:", String(e));
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

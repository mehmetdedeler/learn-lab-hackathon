import { makeCourse } from "@/lib/course";

export const maxDuration = 120; // seconds this route may run

// Bruno's contract: POST {name, level?} -> topic {id, name, emoji, blurb, concepts}
export async function POST(req: Request) {
  try {
    const { name, level } = (await req.json()) as { name?: string; level?: string };
    if (!name?.trim()) return Response.json({ error: "Please type a topic." }, { status: 400 });
    return Response.json(await makeCourse(name.trim().slice(0, 120), level || "I'm brand new to this"));
  } catch (e) {
    console.error("[topic] failed:", String(e));
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

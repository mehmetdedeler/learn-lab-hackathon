import { gradeAnswer, type GradeRequest } from "@/lib/grade";

export const maxDuration = 60;

// Bruno's contract: POST {question, rubric:{keywords, need, model_answer}, answer} -> {score, feedback, matched}
// On error Bruno grades with its own keyword check, so a failure here never blocks the learner.
export async function POST(req: Request) {
  try {
    return Response.json(await gradeAnswer((await req.json()) as GradeRequest));
  } catch (e) {
    console.error("[grade] failed:", String(e));
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

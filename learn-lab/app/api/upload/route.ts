import { pdfToTopics, topicsToRequest } from "@/lib/topics";

export const maxDuration = 120;

// Receives a PDF, returns the text of the first request for the lesson agent.
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const topics = await pdfToTopics(Buffer.from(await file.arrayBuffer()));
    return Response.json({ request: topicsToRequest(topics), topics });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

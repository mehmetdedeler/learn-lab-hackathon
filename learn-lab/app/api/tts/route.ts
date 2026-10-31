// Bruno's voice: text in, MP3 out, from ElevenLabs. The key stays on the server.
const VOICE = process.env.ELEVENLABS_VOICE_ID || "bIHbv24MWmeRgasZH58o"; // "Will - Relaxed Optimist"

export async function POST(req: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return new Response("No ElevenLabs key", { status: 501 });
  const { text } = (await req.json().catch(() => ({}))) as { text?: string };
  const clean = String(text || "").trim().slice(0, 600);
  if (!clean) return new Response("No text", { status: 400 });
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text: clean, model_id: "eleven_flash_v2_5" }), // fast model, low delay
  });
  if (!res.ok) {
    console.error("[tts] failed:", res.status, (await res.text()).slice(0, 300));
    return new Response("Voice failed", { status: 502 });
  }
  return new Response(res.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
}

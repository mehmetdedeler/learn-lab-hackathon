// Pass a visual page from the Daytona sandbox to Bruno. The page lives in the sandbox; this
// route only fetches it with Daytona's skip-warning header, so the learner never sees the
// "Preview URL Warning" page inside the phone.
// Only sandbox visual pages are allowed (no open proxy).
const ALLOWED = [
  /^https:\/\/5173-[a-z0-9-]+\.[a-z0-9.-]*daytona[a-z0-9.-]*\/v\/[a-z0-9]+\.html$/, // Daytona preview link
  /^http:\/\/localhost:5737\/v\/[a-z0-9]+\.html$/, // local test mode
];

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("u") || "";
  if (!ALLOWED.some((re) => re.test(url))) return new Response("Not allowed", { status: 400 });
  const res = await fetch(url, { headers: { "X-Daytona-Skip-Preview-Warning": "true" }, cache: "no-store" });
  if (!res.ok) return new Response("The visual is not available. Ask Bruno to draw it again.", { status: 502 });
  return new Response(await res.text(), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

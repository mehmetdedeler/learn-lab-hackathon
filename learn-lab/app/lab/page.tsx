"use client";
import { useEffect, useRef, useState } from "react";

type ChatTurn = { role: "user" | "assistant"; text: string };

const SANDBOX_KEY = "learn-lab-sandbox"; // where the browser remembers its sandbox id

const EXAMPLES = ["Cell division", "Photosynthesis", "Pythagorean theorem", "How a lens bends light"];

export default function Home() {
  const [sandboxId, setSandboxId] = useState("");
  const [url, setUrl] = useState("");
  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [appError, setAppError] = useState("");
  const [local, setLocal] = useState(false);

  // 1. When the page opens, start a sandbox (only once, even when React runs effects twice in dev mode).
  //    The browser remembers its sandbox, so a reload uses the same one again.
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let previous: string | null = null;
    try {
      previous = localStorage.getItem(SANDBOX_KEY);
    } catch {}
    fetch("/api/session", { method: "POST", body: JSON.stringify({ sandboxId: previous }) })
      .then((r) => r.json())
      .then((s) => {
        if (s.error) return setError(`Could not start the sandbox. ${s.error}`);
        try {
          localStorage.setItem(SANDBOX_KEY, s.sandboxId);
        } catch {}
        setSandboxId(s.sandboxId);
        setUrl(s.url);
        setLocal(!!s.local);
        if (s.reused) {
          setChat([{ role: "assistant", text: "Welcome back. Your last lesson is on the right. Ask for a change, or type a new topic." }]);
        }
        setBusy(false);
      });
  }, []);

  // 2. If the lesson crashes in the iframe, it tells us here.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "app-error") setAppError(e.data.message);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // 3. Send the message, wait for the agent, then reload the preview.
  async function send(text = input) {
    if (!text.trim() || busy) return;
    const next: ChatTurn[] = [...chat, { role: "user", text }];
    setChat(next);
    setInput("");
    setAppError("");
    setBusy(true);
    const r = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ sandboxId, chat: next }),
    }).then((r) => r.json());
    setChat([...next, { role: "assistant", text: r.reply }]);
    setReload((n) => n + 1);
    setBusy(false);
  }

  // 4. Upload a lecture PDF: Claude splits it into topics, then the agent builds a step-by-step lesson.
  async function upload(file: File) {
    setBusy(true);
    setChat((c) => [...c, { role: "user", text: `📄 ${file.name}` }]);
    const form = new FormData();
    form.append("file", file);
    const r = await fetch("/api/upload", { method: "POST", body: form }).then((r) => r.json());
    setBusy(false);
    if (r.error) return setChat((c) => [...c, { role: "assistant", text: `Could not read the PDF. ${r.error}` }]);
    await send(r.request);
  }

  return (
    <main className="flex h-screen bg-slate-50 text-slate-800">
      <section className="flex w-[380px] shrink-0 flex-col border-r border-slate-200 bg-white">
        <header className="border-b border-slate-200 px-5 py-4">
          <h1 className="flex items-center gap-2 text-lg font-bold">
            <span>
              <span className="text-indigo-600">Learn</span> Lab
            </span>
            {local && (
              <span
                title="No Daytona key: the lesson runs on this laptop"
                className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800"
              >
                Local test mode
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-500">Type a topic. Get an interactive lesson.</p>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {chat.length === 0 && !error && (
            <div>
              <p className="mb-2 text-sm text-slate-500">Try one of these:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => send(ex)}
                    disabled={busy}
                    className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 disabled:opacity-50"
                  >
                    {ex}
                  </button>
                ))}
              </div>
              {url && !local && (
                <p className="mt-4 text-xs text-slate-400">
                  If the right side shows a Daytona warning, click “I Understand, Continue” once.
                </p>
              )}
            </div>
          )}
          {chat.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-8 rounded-2xl rounded-br-sm bg-indigo-600 px-4 py-2 text-white"
                  : "mr-8 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2"
              }
            >
              {m.text.length > 400 ? m.text.slice(0, 400) + "…" : m.text}
            </div>
          ))}
          {busy && !error && (
            <p className="animate-pulse text-sm text-slate-500">
              {url ? "Building your lesson… (1-3 minutes)" : "Starting your sandbox…"}
            </p>
          )}
          {error && <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</div>}
          {appError && !busy && (
            <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">
              <p>The lesson crashed: {appError}</p>
              <button
                className="mt-2 rounded-lg bg-rose-600 px-3 py-1 font-medium text-white"
                onClick={() => send(`The lesson crashes in the browser with this error. Fix it: ${appError}`)}
              >
                Fix it
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2 border-t border-slate-200 p-4">
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder={chat.length ? "Ask a question or a change…" : 'Try: "cell division"'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              className="rounded-xl bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              onClick={() => send()}
              disabled={busy}
            >
              Send
            </button>
          </div>
          <label className="block cursor-pointer text-center text-sm text-indigo-700 hover:underline">
            or upload lecture slides (PDF)
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              disabled={busy}
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            />
          </label>
        </div>
      </section>

      {url ? (
        <iframe key={reload} src={url} onLoad={() => setAppError("")} className="flex-1 bg-white" />
      ) : (
        <div className="flex flex-1 items-center justify-center text-slate-400">
          {error ? "No preview" : "Starting your sandbox…"}
        </div>
      )}
    </main>
  );
}

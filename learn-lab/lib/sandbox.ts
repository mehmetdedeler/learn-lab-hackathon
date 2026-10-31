import { Daytona, type Sandbox } from "@daytona/sdk";
import { APP, SNAPSHOT } from "./config";
import { localBox, startLocal } from "./local-box";

// No Daytona key? Then use the local test mode (see lib/local-box.ts).
// Checked on every new session, so adding the key to .env.local works without a restart.
const localMode = () => !process.env.DAYTONA_API_KEY;

let client: Daytona | undefined;
// Created on first use (not at import), so "next build" also works without keys.
function daytona() {
  return (client ??= new Daytona()); // reads DAYTONA_API_KEY
}

// Start Vite in the background, wait until it answers, return the preview URL.
async function startDevServer(sandbox: Sandbox) {
  await sandbox.process.executeCommand(`cd ${APP} && nohup npm run dev > /tmp/dev.log 2>&1 &`, undefined, undefined, 30);
  await sandbox.process.executeCommand(
    "for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:5173 && exit 0; sleep 1; done; exit 1",
    undefined,
    undefined,
    40,
  );
  const preview = await sandbox.getPreviewLink(5173);
  return preview.url;
}

// Get a Daytona sandbox. If it went to sleep, wake it and restart Vite.
async function wake(sandboxId: string) {
  const sandbox = await daytona().get(sandboxId);
  if (sandbox.state !== "started") {
    await sandbox.start();
    await startDevServer(sandbox);
  }
  return sandbox;
}

// Start a session. If this browser already has a sandbox, use it again, so a page reload
// does not make a new one (each sandbox uses 4 GB of the 10 GB Daytona memory limit).
export async function createSession(previousId?: string) {
  if (localMode()) return startLocal();
  if (previousId && previousId !== "local") {
    try {
      const sandbox = await wake(previousId);
      const { url } = await sandbox.getPreviewLink(5173);
      return { sandboxId: sandbox.id, url, local: false, reused: true };
    } catch {
      // The old sandbox is gone or broken, so make a new one below.
    }
  }
  const sandbox = await daytona().create({
    snapshot: SNAPSHOT,
    public: true,           // the iframe can show the preview without a token
    autoStopInterval: 30,   // minutes without activity before it stops
    autoDeleteInterval: 60, // minutes after stopping before it is deleted
    labels: { app: "learn-lab" },
  });
  const url = await startDevServer(sandbox);
  return { sandboxId: sandbox.id, url, local: false, reused: false };
}

// The sandbox for a chat message (awake and with Vite running).
export async function getRunningSandbox(sandboxId: string) {
  if (sandboxId === "local") return localBox;
  return wake(sandboxId);
}

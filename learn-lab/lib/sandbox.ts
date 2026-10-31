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

// A new sandbox for a new student session.
export async function createSession() {
  if (localMode()) return startLocal();
  const sandbox = await daytona().create({
    snapshot: SNAPSHOT,
    public: true,           // the iframe can show the preview without a token
    autoStopInterval: 30,   // minutes without activity before it stops
    autoDeleteInterval: 60, // minutes after stopping before it is deleted
    labels: { app: "learn-lab" },
  });
  const url = await startDevServer(sandbox);
  return { sandboxId: sandbox.id, url, local: false };
}

// Get the sandbox again. If it went to sleep, wake it and restart Vite.
export async function getRunningSandbox(sandboxId: string) {
  if (sandboxId === "local") return localBox;
  const sandbox = await daytona().get(sandboxId);
  if (sandbox.state !== "started") {
    await sandbox.start();
    await startDevServer(sandbox);
  }
  return sandbox;
}

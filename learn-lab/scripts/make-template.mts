import { Daytona } from "@daytona/sdk";
import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { APP, SNAPSHOT } from "../lib/config";

const daytona = new Daytona(); // reads DAYTONA_API_KEY

// All files in template/, except node_modules and build output.
function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (["node_modules", "dist", ".last-good"].includes(name)) return [];
    const full = join(dir, name);
    return statSync(full).isDirectory() ? listFiles(full) : [full];
  });
}

// If an old snapshot with this name exists, remove it first (needed when you run this script again).
await daytona.snapshot.delete(SNAPSHOT).catch(() => {});

console.log("1. Creating a setup sandbox (the first time can take a few minutes)...");
// Daytona's default sandbox image, but small: 1 vCPU, 2 GB memory, 5 GB disk.
// Small sandboxes leave room in your Daytona limits for your other apps.
const sandbox = await daytona.create(
  { image: "daytonaio/sandbox:0.11.0", resources: { cpu: 1, memory: 2, disk: 5 }, labels: { app: "learn-lab" } },
  { timeout: 0, onSnapshotCreateLogs: (line) => console.log("   ", line.trim()) },
);
try {
  const node = await sandbox.process.executeCommand("node -v", undefined, undefined, 30);
  console.log("   Node in the sandbox:", node.result.trim(), "(Vite needs 20.19+ or 22.12+)");

  console.log("2. Uploading template/ ...");
  const files = listFiles("template").map((f) => ({ source: f, destination: `${APP}/${relative("template", f)}` }));
  const folders = [...new Set(files.map((f) => dirname(f.destination)))];
  await sandbox.process.executeCommand(`mkdir -p ${folders.join(" ")}`, undefined, undefined, 30);
  await sandbox.fs.uploadFiles(files);

  console.log("3. Installing packages (1-3 minutes)...");
  const install = await sandbox.process.executeCommand("npm install 2>&1", APP, undefined, 600);
  if (install.exitCode !== 0) throw new Error(install.result);

  console.log("4. Test build...");
  const build = await sandbox.process.executeCommand("npx vite build 2>&1 && cp -r src .last-good", APP, undefined, 300);
  if (build.exitCode !== 0) throw new Error(build.result);

  console.log(`5. Saving the snapshot '${SNAPSHOT}' (a few minutes)...`);
  await sandbox.createSnapshot(SNAPSHOT, 0);
  console.log(`Done. New sandboxes can now start from '${SNAPSHOT}'.`);
} finally {
  await sandbox.delete();
}

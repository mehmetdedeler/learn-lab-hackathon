import { execFile, spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import type { Box } from "./agent";
import { APP } from "./config";

// LOCAL TEST MODE: used when DAYTONA_API_KEY is empty.
// The "sandbox" is a folder on your laptop, and Vite runs at http://localhost:5173.
// Claude can only write files under src/, and no shell command from Claude runs here.
const run = promisify(execFile);
const ROOT = path.join(os.tmpdir(), "learn-lab-local");
const PREVIEW_URL = "http://localhost:5173";
const toLocal = (p: string) => p.split(APP).join(ROOT);
const ok = { exitCode: 0, result: "" };

function copy(from: string, to: string) {
  rmSync(path.join(ROOT, to), { recursive: true, force: true });
  cpSync(path.join(ROOT, from), path.join(ROOT, to), { recursive: true });
}

export const localBox: Box = {
  local: true,
  fs: {
    async uploadFile(file, p) {
      mkdirSync(path.dirname(toLocal(p)), { recursive: true });
      writeFileSync(toLocal(p), file);
    },
    async downloadFile(p) {
      return readFileSync(toLocal(p));
    },
  },
  process: {
    // Only the few fixed commands that our own code sends.
    async executeCommand(command) {
      if (command.startsWith("mkdir -p")) return ok; // uploadFile already makes the folders
      if (command.startsWith("npm run check")) {
        try {
          const r = await run("npm", ["run", "check"], { cwd: ROOT });
          return { exitCode: 0, result: r.stdout };
        } catch (e) {
          const err = e as { stdout?: string; stderr?: string };
          return { exitCode: 1, result: `${err.stdout ?? ""}${err.stderr ?? ""}` };
        }
      }
      if (command.includes("cp -r src .last-good")) {
        copy("src", ".last-good");
        return ok;
      }
      if (command.includes("cp -r .last-good src")) {
        copy(".last-good", "src");
        return ok;
      }
      return { exitCode: 1, result: "This command is not allowed in local test mode." };
    },
  },
};

const isUp = () => fetch(PREVIEW_URL).then(() => true, () => false);

// Copy the template, install packages if needed, reset the lesson, and start Vite.
export async function startLocal() {
  const template = path.resolve("template");
  const pkg = path.join(ROOT, "package.json");
  const pkgBefore = existsSync(pkg) ? readFileSync(pkg, "utf8") : "";

  rmSync(path.join(ROOT, "src"), { recursive: true, force: true }); // every session starts empty
  cpSync(template, ROOT, {
    recursive: true,
    filter: (src) => !/[\\/](node_modules|dist|\.last-good)([\\/]|$)/.test(src),
  });
  if (!existsSync(path.join(ROOT, "node_modules")) || readFileSync(pkg, "utf8") !== pkgBefore) {
    await run("npm", ["install"], { cwd: ROOT }); // about 30-60 seconds, only the first time
  }
  copy("src", ".last-good");

  if (!(await isUp())) {
    spawn("npm", ["run", "dev"], { cwd: ROOT, stdio: "ignore" });
    for (let i = 0; i < 30 && !(await isUp()); i++) await new Promise((r) => setTimeout(r, 1000));
  }
  return { sandboxId: "local", url: PREVIEW_URL, local: true };
}

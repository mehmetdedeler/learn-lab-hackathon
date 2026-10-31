import { Daytona } from "@daytona/sdk";

const daytona = new Daytona(); // reads DAYTONA_API_KEY

const sandbox = await daytona.create();
console.log("Sandbox id:", sandbox.id);

const r = await sandbox.process.executeCommand("echo Hello from the sandbox && node -v", undefined, undefined, 30);
console.log(r.result);

await sandbox.delete();
console.log("Deleted. All good!");

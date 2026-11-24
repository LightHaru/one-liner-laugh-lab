import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "It hasn't been eaten — it's in protective custody. That sock saw things under your bed.";

const outDir = process.argv[2] ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

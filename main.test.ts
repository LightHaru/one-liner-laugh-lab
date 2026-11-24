import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAIN = join(dirname(fileURLToPath(import.meta.url)), "main.ts");

function run(dir: string): Buffer {
  execFileSync(process.execPath, [MAIN, dir]);
  return readFileSync(join(dir, "entry.txt"));
}

test("writes the same strict one-line entry to <dir>/entry.txt", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "laughlab-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));

  const first = run(dir);
  const second = run(dir);

  assert.deepEqual(second, first);

  const text = first.toString("utf8");
  assert.match(text, /\S/);
  assert.ok(!text.includes("\n"), "entry must contain no newline");
  assert.ok(!text.includes("\r"), "entry must contain no carriage return");
  assert.ok([...text].length <= 200, "entry must be at most 200 Unicode characters");
});

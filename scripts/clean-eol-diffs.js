/**
 * Normalize line endings in local public/r/*.json only.
 *
 * Strips `\r` from file bodies and escaped `\r\n` inside JSON `content`
 * strings (typical Windows shadcn build noise). Does not touch git remotes
 * or other paths.
 *
 * Usage:
 *   node scripts/clean-eol-diffs.js
 *   node scripts/clean-eol-diffs.js --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../public/r");
const dryRun = process.argv.includes("--dry-run");

let fixed = 0;

for (const file of fs.readdirSync(OUTPUT_DIR)) {
  if (!file.endsWith(".json")) continue;

  const filePath = path.join(OUTPUT_DIR, file);
  const original = fs.readFileSync(filePath, "utf8");
  const normalized = original
    .replaceAll("\\r\\n", "\\n")
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n");

  if (normalized === original) continue;

  fixed++;
  console.log(`  ${file}`);
  if (!dryRun) fs.writeFileSync(filePath, normalized);
}

console.log(
  dryRun
    ? `\nDry run — would normalize ${fixed} file(s). Re-run without --dry-run to apply.`
    : `\nNormalized EOL in ${fixed} file(s) under public/r`,
);

/**
 * Sync blocks and dashboards from watermelon-platform into this registry.
 *
 *   bun scripts/sync-from-platform.ts --platform ../watermelon-platform [--report sync-report.md]
 *
 * The platform is the source of truth for block and dashboard code, but
 * registry copies are sometimes adapted after they are copied (import paths,
 * Radix instead of Base UI APIs). So platform changes are applied with a
 * three-way merge: base = the platform commit the registry copy was last
 * synced from, ours = the registry file, theirs = the platform file now.
 * Items that merge cleanly are updated; conflicts are left untouched and
 * listed in the report for a human to resolve.
 *
 * The last synced platform commit per item is kept in platform-sync.json. An
 * item missing from it is bootstrapped by picking the platform commit whose
 * code is closest to the registry copy.
 *
 * Run `bun scripts/check-registry.ts --fix` afterwards to update dependencies.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import * as prettier from "prettier";

type RegistryFile = { path: string; target?: string; type: string };
type RegistryItem = {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
};
type SyncEntry = {
  platformDir: string;
  platformCommit: string;
  // registry source path -> path relative to platformDir
  files: Record<string, string>;
};

const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "platform-sync.json");
const CONTENT_DIRS = ["src/data/contents/blocks", "src/data/contents/dashboards"];
const INSTALL_URL = /registry\.watermelon\.sh\/r\/([A-Za-z0-9._-]+)\.json/g;
const SOURCE_FILE = /\.(tsx?|css)$/;
const BOOTSTRAP_CANDIDATES = 40;

const { values: args } = parseArgs({
  options: {
    platform: { type: "string" },
    report: { type: "string" },
  },
});
if (!args.platform) throw new Error("--platform <path to watermelon-platform checkout> is required");
const PLATFORM = path.resolve(args.platform);

const git = (...a: string[]) =>
  execFileSync("git", ["-C", PLATFORM, ...a], { encoding: "utf8", maxBuffer: 1 << 28 });
const platformHead = git("rev-parse", "HEAD").trim();

function showAt(commit: string, file: string): string | null {
  const r = spawnSync("git", ["-C", PLATFORM, "show", `${commit}:${file}`], {
    encoding: "utf8",
    maxBuffer: 1 << 28,
  });
  return r.status === 0 ? r.stdout : null;
}

// The platform imports its own Base UI wrappers; installs use the shadcn ui alias.
const toRegistryImports = (source: string) =>
  source.replaceAll("@/components/base-ui/", "@/components/ui/");

async function format(source: string, file: string) {
  try {
    return await prettier.format(source, { filepath: file });
  } catch {
    return source;
  }
}

function changedLines(a: string, b: string) {
  const la = a.split("\n");
  const lb = b.split("\n");
  const counts = new Map<string, number>();
  for (const l of la) counts.set(l, (counts.get(l) ?? 0) + 1);
  let common = 0;
  for (const l of lb) {
    const n = counts.get(l) ?? 0;
    if (n > 0) {
      common++;
      counts.set(l, n - 1);
    }
  }
  return la.length + lb.length - 2 * common;
}

function merge(ours: string, base: string, theirs: string) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "registry-sync-"));
  try {
    const [o, b, t] = ["ours", "base", "theirs"].map((n) => path.join(dir, n));
    writeFileSync(o, ours);
    writeFileSync(b, base);
    writeFileSync(t, theirs);
    const r = spawnSync("git", ["merge-file", "-p", o, b, t], { encoding: "utf8", maxBuffer: 1 << 28 });
    return { text: r.stdout, conflicts: r.status ?? 1 };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
}

function platformItems() {
  const items = new Map<string, string>();
  for (const contentDir of CONTENT_DIRS) {
    for (const file of walk(path.join(PLATFORM, contentDir))) {
      if (!file.endsWith(".mdx")) continue;
      for (const [, name] of readFileSync(file, "utf8").matchAll(INSTALL_URL)) {
        if (!items.has(name)) items.set(name, path.relative(PLATFORM, path.dirname(file)));
      }
    }
  }
  return items;
}

function platformFiles(platformDir: string) {
  return walk(path.join(PLATFORM, platformDir))
    .filter((f) => SOURCE_FILE.test(f))
    .map((f) => path.relative(path.join(PLATFORM, platformDir), f))
    .sort();
}

// Registry path of each file, as the longest suffix that exists in the platform dir.
function mapFiles(item: RegistryItem, platformDir: string) {
  const available = new Set(platformFiles(platformDir));
  const files: Record<string, string> = {};
  for (const f of item.files) {
    const parts = f.path.split("/");
    let rel = parts.map((_, i) => parts.slice(i).join("/")).find((c) => available.has(c));
    if (!rel && item.files.length === 1) {
      rel = ["index.tsx", `${item.name}.tsx`].find((c) => available.has(c));
    }
    if (rel) files[f.path] = rel;
  }
  return files;
}

async function platformVersion(commit: string, platformDir: string, rel: string) {
  const source = showAt(commit, `${platformDir}/${rel}`);
  return source === null ? null : format(toRegistryImports(source), rel);
}

async function bootstrapCommit(entry: Omit<SyncEntry, "platformCommit">) {
  const paths = Object.values(entry.files).map((rel) => `${entry.platformDir}/${rel}`);
  const commits = git("log", `--format=%H`, `-n${BOOTSTRAP_CANDIDATES}`, "--", ...paths)
    .split("\n")
    .filter(Boolean);
  const ours = await Promise.all(
    Object.keys(entry.files).map((p) => format(readFileSync(path.join(ROOT, p), "utf8"), p)),
  );
  let best = { commit: commits[0], score: Infinity };
  for (const commit of commits) {
    let score = 0;
    for (const [i, rel] of Object.values(entry.files).entries()) {
      const theirs = (await platformVersion(commit, entry.platformDir, rel)) ?? "";
      score += changedLines(ours[i], theirs);
    }
    // Commits are newest first, so ties go to the oldest. Merging from a base
    // that is too old is safe (changes already in the registry merge cleanly),
    // while one that is too new silently drops platform changes.
    if (score <= best.score) best = { commit, score };
  }
  return best.commit;
}

function commonPrefix(pairs: Array<[string, string]>) {
  // registry path = prefix + platform relative path, for every file
  const prefixes = new Set(
    pairs.map(([reg, rel]) => (reg.endsWith(`/${rel}`) ? reg.slice(0, -rel.length) : null)),
  );
  return prefixes.size === 1 ? [...prefixes][0] : null;
}

type Outcome = { name: string; files: string[]; conflicts?: string[] };

async function main() {
  const registry = JSON.parse(readFileSync(path.join(ROOT, "registry.json"), "utf8"));
  const items = new Map<string, RegistryItem>(registry.items.map((i: RegistryItem) => [i.name, i]));
  const manifest: Record<string, SyncEntry> = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
    : {};

  const updated: Outcome[] = [];
  const added: Outcome[] = [];
  const conflicted: Outcome[] = [];
  const skipped: string[] = [];

  for (const [name, platformDir] of [...platformItems()].sort()) {
    const item = items.get(name);

    if (!item) {
      const rels = platformFiles(platformDir);
      const dir = `src/components/${platformDir.includes("/dashboards/") ? "dashboards" : "blocks"}/${name}`;
      const files: RegistryFile[] = [];
      for (const rel of rels) {
        const dest = path.join(ROOT, dir, rel);
        await mkdir(path.dirname(dest), { recursive: true });
        writeFileSync(dest, (await platformVersion(platformHead, platformDir, rel))!);
        files.push({
          path: `${dir}/${rel}`,
          target: `components/watermelon/${name}/${rel}`,
          type: "registry:component",
        });
      }
      const newItem: RegistryItem = { name, type: "registry:block", files };
      registry.items.push(newItem);
      manifest[name] = {
        platformDir,
        platformCommit: platformHead,
        files: Object.fromEntries(files.map((f, i) => [f.path, rels[i]])),
      };
      added.push({ name, files: files.map((f) => f.path) });
      continue;
    }

    let entry = manifest[name];
    if (!entry || entry.platformDir !== platformDir) {
      const files = mapFiles(item, platformDir);
      if (!Object.keys(files).length) {
        skipped.push(name);
        continue;
      }
      entry = { platformDir, files, platformCommit: await bootstrapCommit({ platformDir, files }) };
    }

    const changed: string[] = [];
    const conflicts: string[] = [];
    const writes: Array<[string, string | null]> = [];

    for (const [regPath, rel] of Object.entries(entry.files)) {
      const base = await platformVersion(entry.platformCommit, platformDir, rel);
      const theirs = await platformVersion(platformHead, platformDir, rel);
      if (base === theirs) continue;
      const ours = await format(readFileSync(path.join(ROOT, regPath), "utf8"), regPath);
      if (theirs === null) {
        if (ours === base) writes.push([regPath, null]);
        else conflicts.push(`${regPath} (deleted on platform, edited in registry)`);
        continue;
      }
      if (base === null || ours === base) {
        writes.push([regPath, theirs]);
        continue;
      }
      const result = merge(ours, base, theirs);
      if (result.conflicts) conflicts.push(`${regPath} (${result.conflicts} conflicting hunks)`);
      else writes.push([regPath, result.text]);
    }

    // Files the platform added since the last sync, for items whose registry
    // layout mirrors the platform directory.
    const prefix = item.files.length > 1 ? commonPrefix(Object.entries(entry.files)) : null;
    const targetPrefix = prefix
      ? commonPrefix(item.files.filter((f) => f.target).map((f) => [f.target!, entry.files[f.path]]))
      : null;
    const newFiles: Array<[string, string]> = [];
    if (prefix && targetPrefix) {
      const known = new Set(Object.values(entry.files));
      for (const rel of platformFiles(platformDir)) {
        if (known.has(rel) || showAt(entry.platformCommit, `${platformDir}/${rel}`) !== null) continue;
        newFiles.push([`${prefix}${rel}`, rel]);
        writes.push([`${prefix}${rel}`, (await platformVersion(platformHead, platformDir, rel))!]);
      }
    }

    if (conflicts.length) {
      // Keep the old base so the next run reports the same conflict until a
      // human merges it and moves platformCommit forward.
      manifest[name] = entry;
      conflicted.push({ name, files: [], conflicts });
      continue;
    }

    for (const [regPath, text] of writes) {
      const dest = path.join(ROOT, regPath);
      if (text === null) {
        rmSync(dest);
        item.files = item.files.filter((f) => f.path !== regPath);
        delete entry.files[regPath];
      } else {
        await mkdir(path.dirname(dest), { recursive: true });
        writeFileSync(dest, text);
      }
      changed.push(regPath);
    }
    for (const [regPath, rel] of newFiles) {
      item.files.push({ path: regPath, target: `${targetPrefix}${rel}`, type: "registry:component" });
      entry.files[regPath] = rel;
    }
    if (changed.length) {
      updated.push({ name, files: changed });
    }
    manifest[name] = { ...entry, platformCommit: platformHead };
  }

  writeFileSync(path.join(ROOT, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
  writeFileSync(
    MANIFEST_PATH,
    `${JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2)}\n`,
  );

  const lines = [
    `Synced from WatermelonCorp/watermelon-platform@${platformHead.slice(0, 7)}.`,
    "",
    `- Updated: ${updated.length}`,
    `- Added: ${added.length}`,
    `- Conflicts (not changed, need a manual merge): ${conflicted.length}`,
    `- Skipped (no matching platform files): ${skipped.length}`,
  ];
  const section = (title: string, list: Outcome[], key: "files" | "conflicts") => {
    if (!list.length) return;
    lines.push("", `### ${title}`, "");
    for (const o of list) lines.push(`- \`${o.name}\`: ${(o[key] ?? []).map((f) => `\`${f}\``).join(", ")}`);
  };
  section("Updated", updated, "files");
  section("Added", added, "files");
  section("Conflicts", conflicted, "conflicts");
  if (skipped.length) lines.push("", "### Skipped", "", ...skipped.map((n) => `- \`${n}\``));

  const report = lines.join("\n");
  console.log(report);
  if (args.report) writeFileSync(args.report, `${report}\n`);
}

await main();

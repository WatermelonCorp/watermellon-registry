/**
 * Sync a single dashboard into src/components/dashboards/registry.json.
 *
 * Usage:
 *   node scripts/sync-dashboards.js <dashboard-name> [--dry-run]
 *
 * Example:
 *   node scripts/sync-dashboards.js library-dashboard
 *
 * Behaviour:
 *   - Requires <dashboard-name>.mdx to exist in ../library-new/src (its
 *     frontmatter `dependencies` list is the source of truth for npm deps).
 *   - Collects every react file under src/components/dashboards/<name>.
 *   - Files living at components/ui/<shadcn-component> are NOT shipped as
 *     files; they are added to registryDependencies instead.
 *   - Upserts only the entry for <dashboard-name> in the dashboards
 *     sub-registry. All other entries are left untouched.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DASHBOARDS_DIR = path.resolve(__dirname, "../src/components/dashboards");
const MDX_DIR = path.resolve(__dirname, "../../library-new/src");

// Prefer the split dashboards sub-registry when present; otherwise the
// monolithic root registry.json (pre-split main).
const SPLIT_REGISTRY_PATH = path.resolve(
  __dirname,
  "../src/components/dashboards/registry.json",
);
const ROOT_REGISTRY_PATH = path.resolve(__dirname, "../registry.json");
const USE_SPLIT_REGISTRY = fs.existsSync(SPLIT_REGISTRY_PATH);
const REGISTRY_PATH = USE_SPLIT_REGISTRY
  ? SPLIT_REGISTRY_PATH
  : ROOT_REGISTRY_PATH;

const REACT_FILE_REGEX = /\.(tsx|ts|jsx|js)$/;
// Everything in the dashboard folder ships, except docs and junk files.
const IGNORED_FILE_REGEX = /(\.(md|mdx)$|^\.DS_Store$|^Thumbs\.db$)/i;

// ── shadcn/ui components ─────────────────────────────────────────────────
// Files at components/ui/<name>.* matching this list are excluded from the
// registry files and added to registryDependencies instead.
const SHADCN_COMPONENTS = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "command",
  "context-menu",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "field",
  "form",
  "hover-card",
  "input",
  "input-group",
  "input-otp",
  "item",
  "kbd",
  "label",
  "menubar",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "resizable",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toggle",
  "toggle-group",
  "tooltip",
];

// ── Helpers ──────────────────────────────────────────────────────────────

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

/** Recursively collect shippable files under `dir`, as posix paths relative to `baseDir`. */
function collectFiles(dir, baseDir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, baseDir));
    } else if (entry.isFile() && !IGNORED_FILE_REGEX.test(entry.name)) {
      results.push(path.relative(baseDir, fullPath).split(path.sep).join("/"));
    }
  }
  return results.sort();
}

/** If relFile is a shadcn component vendored at components/ui/, return its name. */
function shadcnComponentFromPath(relFile) {
  const match = relFile.match(/(?:^|\/)components\/ui\/([^/]+)$/);
  if (!match) return null;
  const name = match[1].replace(REACT_FILE_REGEX, "");
  return SHADCN_COMPONENTS.includes(name) ? name : null;
}

/** Detect shadcn components imported via .../components/ui/<name>. */
function shadcnComponentsFromImports(content) {
  const found = new Set();
  const importRegex = /from\s+["'][^"']*\/components\/ui\/([^"'/]+)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const name = match[1].replace(REACT_FILE_REGEX, "");
    if (SHADCN_COMPONENTS.includes(name)) found.add(name);
  }
  return found;
}

/** Read npm dependencies from the dashboard's mdx frontmatter. */
function readMdxDependencies(mdxPath) {
  const { data } = matter(fs.readFileSync(mdxPath, "utf8"));
  const deps = data.dependencies;
  if (!Array.isArray(deps)) return [];
  return deps.map(String).sort();
}

// ── Main ─────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const dryRun = process.argv.includes("--dry-run");
  const name = args[0];

  if (!name) {
    fail("Usage: node scripts/sync-dashboards.js <dashboard-name> [--dry-run]");
  }

  // 1. The dashboard must have an mdx definition in library-new.
  const mdxPath = path.join(MDX_DIR, `${name}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    fail(`No mdx definition found at ${mdxPath} — refusing to sync "${name}".`);
  }

  // 2. The dashboard source folder must exist in this repo.
  const dashboardDir = path.join(DASHBOARDS_DIR, name);
  if (!fs.existsSync(dashboardDir) || !fs.statSync(dashboardDir).isDirectory()) {
    fail(`Dashboard folder not found: ${dashboardDir}`);
  }

  const relFiles = collectFiles(dashboardDir, dashboardDir);
  if (relFiles.length === 0) {
    fail(`No files found in ${dashboardDir}`);
  }

  // 3. Split vendored shadcn ui components out of the file list.
  const registryDeps = new Set();
  const includedFiles = [];

  for (const relFile of relFiles) {
    const shadcnName = shadcnComponentFromPath(relFile);
    if (shadcnName) {
      registryDeps.add(shadcnName);
      console.log(`↪️  ${relFile} → registryDependencies: ${shadcnName}`);
    } else {
      includedFiles.push(relFile);
    }
  }

  // Also pick up shadcn components referenced only via imports.
  for (const relFile of includedFiles) {
    if (!REACT_FILE_REGEX.test(relFile)) continue;
    const content = fs.readFileSync(path.join(dashboardDir, relFile), "utf8");
    for (const dep of shadcnComponentsFromImports(content)) {
      registryDeps.add(dep);
    }
  }

  if (includedFiles.length === 0) {
    fail(`"${name}" has no files left after excluding shadcn ui components.`);
  }

  // 4. Build the registry entry.
  const dependencies = readMdxDependencies(mdxPath);

  const entry = {
    name,
    type: "registry:block",
    dependencies,
    files: includedFiles.map((relFile) => ({
      path: USE_SPLIT_REGISTRY
        ? `${name}/${relFile}`
        : `src/components/dashboards/${name}/${relFile}`,
      target: `components/watermelon/${name}/${relFile}`,
      type: "registry:component",
    })),
  };

  if (registryDeps.size > 0) {
    entry.registryDependencies = Array.from(registryDeps).sort();
  }

  // 5. Upsert into the dashboards sub-registry, touching nothing else.
  let registry;
  try {
    registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  } catch (error) {
    fail(`Error reading ${REGISTRY_PATH}: ${error.message}`);
  }

  const existingIndex = registry.items.findIndex((item) => item.name === name);
  if (existingIndex !== -1) {
    registry.items[existingIndex] = entry;
    console.log(`♻️  Replaced existing entry "${name}"`);
  } else {
    // Keep the items alphabetically sorted without reordering anything else.
    let insertAt = registry.items.findIndex(
      (item) => item.name.localeCompare(name) > 0,
    );
    if (insertAt === -1) insertAt = registry.items.length;
    registry.items.splice(insertAt, 0, entry);
    console.log(`✅ Added new entry "${name}"`);
  }

  console.log(
    `   ${entry.files.length} files, ${dependencies.length} dependencies, ${registryDeps.size} registryDependencies`,
  );

  if (dryRun) {
    console.log("\n🔍 DRY RUN — no changes written. Entry preview:");
    console.log(JSON.stringify(entry, null, 2));
    return;
  }

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
  console.log(`\n🎉 Done! Synced "${name}" into ${path.relative(process.cwd(), REGISTRY_PATH)}`);
}

main();

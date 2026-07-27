console.log("This script is brokenn and needs a fix first")
process.exit(0)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.resolve(__dirname, "../registry.json");
const TEMPLATES_DIR = path.resolve(__dirname, "../src/components/templates");

const DRY_RUN = process.argv.includes("--dry-run");

// ── Known npm dependencies to detect ────────────────────────────────────
const KNOWN_DEPENDENCIES = [
  "lucide-react",
  "motion",
  "motion/react",
  "framer-motion",
  "clsx",
  "tailwind-merge",
  "recharts",
  "sonner",
  "zod",
  "date-fns",
  "react-day-picker",
  "embla-carousel-react",
  "next-themes",
  "shiki",
  "ansi-to-react",
  "react-slick",
  "react-router-dom",
  "vaul",
  "react-icons",
  "react-use-measure",
  "@number-flow/react",
  "@tabler/icons-react",
  "@aliimam/icons",
  "@aliimam/logos",
  "@hugeicons/react",
  "@hugeicons/core-free-icons",
  "hugeicons-react",
  "@dnd-kit/core",
  "@floating-ui/react",
  "@headlessui/react",
  "qrcode.react",
  "iconsax-react",
  "media-chrome",
  "wavesurfer.js",
  "tunnel-rat",
];

const RADIX_PREFIX = "@radix-ui/";
const BASE_UI_PREFIX = "@base-ui/";

// shadcn registry dependencies to detect from internal imports
const KNOWN_REGISTRY_DEPS = [
  "sidebar",
  "button",
  "card",
  "badge",
  "input",
  "label",
  "select",
  "separator",
  "avatar",
  "tooltip",
  "breadcrumb",
  "dropdown-menu",
  "popover",
  "sheet",
  "skeleton",
  "switch",
  "table",
  "tabs",
  "toggle",
  "toggle-group",
  "checkbox",
  "collapsible",
  "chart",
  "calendar",
  "dialog",
  "drawer",
  "sonner",
  "accordion",
];

// ── Helpers ──────────────────────────────────────────────────────────────

function collectFiles(dir, baseDir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, baseDir));
    } else if (entry.isFile() && /\.(tsx?|ts)$/.test(entry.name)) {
      results.push(path.relative(baseDir, fullPath));
    }
  }

  return results;
}

function detectDependencies(content) {
  const deps = new Set();

  for (const dep of KNOWN_DEPENDENCIES) {
    const escaped = dep.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
    const regex = new RegExp(`from\\s+["']${escaped}(?:/[^"']*)?["']`);
    if (regex.test(content)) {
      if (dep === "motion/react" || dep === "framer-motion") {
        deps.add("motion");
      } else {
        deps.add(dep);
      }
    }
  }

  const radixRegex = /from\s+["'](@radix-ui\/[^"'/]+)["']/g;
  let match;
  while ((match = radixRegex.exec(content)) !== null) {
    deps.add(match[1]);
  }

  const baseUiRegex = /from\s+["'](@base-ui\/[^"'/]+)["']/g;
  while ((match = baseUiRegex.exec(content)) !== null) {
    deps.add(match[1]);
  }

  if (
    content.includes("cva(") ||
    /from\s+["']class-variance-authority["']/.test(content)
  ) {
    deps.add("class-variance-authority");
  }

  return deps;
}

function detectRegistryDeps(content) {
  const regDeps = new Set();

  const uiImportRegex = /from\s+["'][^"']*\/ui\/([^"'/]+)["']/g;
  let match;
  while ((match = uiImportRegex.exec(content)) !== null) {
    const componentName = match[1].replace(/\.(tsx?|ts)$/, "");
    if (KNOWN_REGISTRY_DEPS.includes(componentName)) {
      regDeps.add(componentName);
    }
  }

  return regDeps;
}

function buildTemplateEntry(dirName) {
  const templateDir = path.join(TEMPLATES_DIR, dirName);
  const relFiles = collectFiles(templateDir, templateDir);

  if (relFiles.length === 0) return null;

  const allDeps = new Set();
  const allRegDeps = new Set();

  for (const relFile of relFiles) {
    const fullPath = path.join(templateDir, relFile);
    const content = fs.readFileSync(fullPath, "utf8");
    for (const dep of detectDependencies(content)) allDeps.add(dep);
    for (const dep of detectRegistryDeps(content)) allRegDeps.add(dep);
  }

  const fileEntries = relFiles.map((relFile) => ({
    path: `src/components/templates/${dirName}/${relFile}`,
    target: `components/watermelon/templates/${dirName}/${relFile}`,
    type: "registry:component",
  }));

  const entry = {
    name: dirName,
    type: "registry:block",
    dependencies: Array.from(allDeps).sort(),
    files: fileEntries,
  };

  if (allRegDeps.size > 0) {
    entry.registryDependencies = Array.from(allRegDeps).sort();
  }

  return entry;
}

// ── Main ─────────────────────────────────────────────────────────────────

function main() {
  console.log("📂 Reading registry.json...");
  let registry;
  try {
    registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  } catch (error) {
    console.error("❌ Error reading registry.json:", error.message);
    process.exit(1);
  }

  console.log("📂 Scanning templates directory...");
  let templateDirs;
  try {
    templateDirs = fs
      .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch (error) {
    console.error("❌ Error reading templates directory:", error.message);
    process.exit(1);
  }

  console.log(
    `   Found ${templateDirs.length} template directories: ${templateDirs.join(", ")}\n`,
  );

  const templatePathPrefix = "src/components/templates/";

  const removedNames = [];
  const keptItems = registry.items.filter((item) => {
    const isTemplateBlock =
      item.type === "registry:block" &&
      item.files &&
      item.files.some((f) => f.path.startsWith(templatePathPrefix));

    if (isTemplateBlock) {
      removedNames.push(item.name);
      return false; // remove it
    }
    return true; // keep it
  });

  if (removedNames.length > 0) {
    console.log(
      `🗑️  Removing ${removedNames.length} stale template entries: ${removedNames.join(", ")}\n`,
    );
  }

  registry.items = keptItems;

  let addedCount = 0;
  const newEntries = [];

  for (const dirName of templateDirs) {
    const entry = buildTemplateEntry(dirName);

    if (!entry) {
      console.log(`⏭️  Skipping "${dirName}" — no .tsx/.ts files found`);
      continue;
    }

    newEntries.push(entry);
    addedCount++;
    console.log(
      `✅ Adding "${dirName}" (${entry.files.length} files, ${entry.dependencies.length} deps)`,
    );
  }

  registry.items.push(...newEntries);
  registry.items.sort((a, b) => a.name.localeCompare(b.name));

  if (DRY_RUN) {
    console.log(
      `\n🔍 DRY RUN — would replace ${removedNames.length} stale + add ${addedCount} template(s). No changes written.`,
    );
  } else {
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
    console.log(
      `\n🎉 Done! Regenerated ${addedCount} template(s) in registry.json.`,
    );
  }
}

main();

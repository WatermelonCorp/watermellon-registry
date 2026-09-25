/**
 * Validate that every registry item can actually be installed.
 *
 *   bun scripts/check-registry.ts          # report problems, exit 1 if any
 *   bun scripts/check-registry.ts --fix    # fix what can be fixed mechanically
 *
 * Checks, per item in registry.json:
 * - registryDependencies are real shadcn items, or URLs. A bare name is looked
 *   up on ui.shadcn.com, so a Watermelon item must be referenced by its URL.
 * - every npm package the code imports is listed in dependencies, and every
 *   listed package exists on npm.
 * - every @/components/ui/* and @/hooks/* import is satisfied by a registry
 *   dependency or by a file the item ships.
 * - every relative or other @/ import points at a file the item ships.
 *
 * --fix rewrites registryDependencies and dependencies. Imports of files the
 * item does not ship need a code change and are only reported.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

type RegistryFile = { path: string; target?: string; type: string };
type RegistryItem = {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
};

const ROOT = path.resolve(import.meta.dirname, "..");
// Every installable shadcn item (ui, hooks, lib, blocks). Names are shared across styles.
const SHADCN_REGISTRY = "https://ui.shadcn.com/r/styles/new-york-v4/registry.json";
const SHADCN_ITEM_TYPES = new Set(["registry:ui", "registry:hook", "registry:lib", "registry:component", "registry:block"]);
const SOURCE_EXTENSIONS = ["", ".tsx", ".ts", ".jsx", ".js", ".css", "/index.tsx", "/index.ts"];

const { values: args } = parseArgs({ options: { fix: { type: "boolean", default: false } } });

const packageName = (spec: string) =>
  spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
const withoutVersion = (dep: string) => dep.replace(/(.)@.*$/, "$1");

const npmCache = new Map<string, boolean>();
async function existsOnNpm(pkg: string) {
  if (!npmCache.has(pkg)) {
    const response = await fetch(`https://registry.npmjs.org/${pkg.replace("/", "%2f")}`, {
      method: "HEAD",
    });
    npmCache.set(pkg, response.ok);
  }
  return npmCache.get(pkg)!;
}

function importsOf(source: string) {
  return [
    ...source.matchAll(/(?:^|[\s;])(?:import|export)\s[^"';]*?from\s+["']([^"']+)["']/g),
    ...source.matchAll(/(?:^|[\s;])import\s+["']([^"']+)["']/g),
    ...source.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g),
  ].map((m) => m[1]);
}

async function main() {
  const registryPath = path.join(ROOT, "registry.json");
  const registry = JSON.parse(readFileSync(registryPath, "utf8"));
  const items: RegistryItem[] = registry.items;
  const shadcnRegistry = (await (await fetch(SHADCN_REGISTRY)).json()) as {
    items: Array<{ name: string; type: string }>;
  };
  const shadcn = new Set(
    shadcnRegistry.items.filter((i) => SHADCN_ITEM_TYPES.has(i.type)).map((i) => i.name),
  );

  const problems: string[] = [];
  let fixedItems = 0;

  for (const item of items) {
    const report = (message: string) => problems.push(`${item.name}: ${message}`);
    const stripExtension = (p: string) => p.replace(/\.(tsx?|jsx?|css)$/, "");
    const shippedSources = new Set(item.files.map((f) => f.path));
    const shippedTargets = new Set(item.files.flatMap((f) => (f.target ? [stripExtension(f.target)] : [])));
    const findSource = (base: string) =>
      SOURCE_EXTENSIONS.map((ext) => `${base}${ext}`).find((p) => existsSync(path.join(ROOT, p)));

    // A file the item imports but does not ship. With --fix it is added to the
    // item at the path the import expects, and its own imports are checked too.
    const ship = (source: string, target: string, importer: string, spec: string) => {
      if (!args.fix) {
        report(`${importer} imports ${spec}, which the item does not ship (add ${source})`);
        return;
      }
      const file = { path: source, target, type: "registry:component" };
      item.files.push(file);
      shippedSources.add(source);
      shippedTargets.add(stripExtension(target));
      queue.push(file);
      shippedExtra++;
    };

    const neededPackages = new Set<string>();
    const neededRegistry = new Set<string>();
    let shippedExtra = 0;
    const queue = [...item.files];

    for (let file = queue.shift(); file; file = queue.shift()) {
      const source = path.join(ROOT, file.path);
      if (!existsSync(source)) {
        report(`missing source file ${file.path}`);
        continue;
      }
      if (!/\.(tsx?|jsx?)$/.test(file.path)) continue;

      for (const spec of importsOf(readFileSync(source, "utf8"))) {
        if (spec.startsWith(".")) {
          const resolved = path.join(path.dirname(file.path), spec);
          if (SOURCE_EXTENSIONS.some((ext) => shippedSources.has(`${resolved}${ext}`))) continue;
          const found = findSource(resolved);
          const target = file.target && path.join(path.dirname(file.target), spec);
          // Never ship over a user's shadcn primitive; depend on it instead.
          const primitive = target?.match(/^components\/ui\/([a-z0-9-]+)$/)?.[1];
          if (primitive && shadcn.has(primitive)) {
            neededRegistry.add(primitive);
          } else if (found && target) {
            ship(found, target + found.slice(resolved.length), file.path, spec);
          } else {
            report(`${file.path} imports ${spec}, which the item does not ship`);
          }
          continue;
        }
        if (!spec.startsWith("@/")) {
          const pkg = packageName(spec);
          if (pkg !== "react" && pkg !== "react-dom") neededPackages.add(pkg);
          continue;
        }

        const aliasPath = spec.slice(2).replace(/\/{2,}/g, "/");
        if (SOURCE_EXTENSIONS.some((ext) => shippedTargets.has(stripExtension(`${aliasPath}${ext}`)))) continue;
        const ui = aliasPath.match(/^components\/ui\/([a-z0-9-]+)$/);
        const hook = aliasPath.match(/^hooks\/([a-z0-9-]+)$/);
        if (aliasPath === "lib/utils") {
          neededRegistry.add("utils");
        } else if (ui && shadcn.has(ui[1])) {
          neededRegistry.add(ui[1]);
        } else if (hook && shadcn.has(hook[1])) {
          neededRegistry.add(hook[1]);
        } else {
          const found = findSource(`src/${aliasPath}`);
          if (found) ship(found, found.slice("src/".length), file.path, spec);
          else report(`${file.path} imports ${spec}, which does not exist in this repo`);
        }
      }
    }

    // registryDependencies
    const currentRegistry = item.registryDependencies ?? [];
    const validRegistry = new Set<string>();
    for (const dep of currentRegistry) {
      // Bare names resolve against ui.shadcn.com. Watermelon files an item
      // imports are shipped with it above, so anything else is dropped.
      if (/^https?:\/\//.test(dep) || dep.startsWith("@") || shadcn.has(dep)) validRegistry.add(dep);
      else if (!args.fix) report(`registryDependencies has "${dep}", which is not a shadcn item`);
    }
    for (const dep of neededRegistry) {
      if (!validRegistry.has(dep)) {
        if (!args.fix) report(`imports ${dep} but it is not in registryDependencies`);
        validRegistry.add(dep);
      }
    }

    // dependencies
    const currentDeps = item.dependencies ?? [];
    const declared = new Map(currentDeps.map((d) => [withoutVersion(d), d] as const));
    const validDeps = new Map<string, string>();
    for (const [pkg, spec] of declared) {
      if (neededPackages.has(pkg) || (await existsOnNpm(pkg))) validDeps.set(pkg, spec);
      else if (!args.fix) report(`dependencies has "${spec}", which is not imported and not on npm`);
    }
    for (const pkg of neededPackages) {
      if (!validDeps.has(pkg)) {
        if (!(await existsOnNpm(pkg))) {
          report(`imports package ${pkg}, which is not on npm`);
          continue;
        }
        if (!args.fix) report(`imports ${pkg} but it is not in dependencies`);
        validDeps.set(pkg, pkg);
      }
    }

    if (args.fix) {
      const nextRegistry = [...validRegistry].sort();
      const nextDeps = [...validDeps.values()].sort();
      const changed =
        shippedExtra > 0 ||
        JSON.stringify(nextRegistry) !== JSON.stringify([...currentRegistry].sort()) ||
        JSON.stringify(nextDeps) !== JSON.stringify([...currentDeps].sort());
      if (changed) {
        fixedItems++;
        if (nextRegistry.length) item.registryDependencies = nextRegistry;
        else delete item.registryDependencies;
        if (nextDeps.length) item.dependencies = nextDeps;
        else delete item.dependencies;
      }
    }
  }

  if (args.fix) {
    writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`Fixed dependencies of ${fixedItems} items.`);
  }
  if (problems.length) {
    console.log(`${problems.length} problem(s)${args.fix ? " need a code change" : ""}:`);
    for (const p of problems) console.log(`- ${p}`);
    process.exitCode = 1;
  } else {
    console.log(`All ${items.length} registry items are installable.`);
  }
}

await main();

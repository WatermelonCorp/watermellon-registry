import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DASHBOARDS_DIR = path.resolve(
  __dirname,
  "../src/components/dashboards"
)

const REGISTRY_PATH = path.resolve(
  DASHBOARDS_DIR,
  "registry.json"
)

const DRY_RUN = process.argv.includes("--dry-run")

const REACT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx"
])

const IGNORED_PACKAGES = new Set([
  "react",
  "react-dom",
  "next"
])

const PACKAGE_ALIASES = new Map([
  ["motion/react", "motion"],
  ["framer-motion", "motion"]
])

function normalizePath(value) {
  return value.split(path.sep).join("/")
}

function collectReactFiles(directory, baseDirectory) {
  const files = []

  const entries = fs
    .readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))

  for (const entry of entries) {
    if (
      entry.name === "registry.json" ||
      entry.name === "node_modules" ||
      entry.name.startsWith(".")
    ) {
      continue
    }

    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(
        ...collectReactFiles(fullPath, baseDirectory)
      )
      continue
    }

    const extension = path
      .extname(entry.name)
      .toLowerCase()

    if (
      entry.isFile() &&
      REACT_EXTENSIONS.has(extension)
    ) {
      files.push(
        normalizePath(
          path.relative(baseDirectory, fullPath)
        )
      )
    }
  }

  return files
}

function getPackageName(specifier) {
  if (PACKAGE_ALIASES.has(specifier)) {
    return PACKAGE_ALIASES.get(specifier)
  }

  if (specifier.startsWith("@")) {
    const parts = specifier.split("/")

    if (parts.length < 2) {
      return null
    }

    return `${parts[0]}/${parts[1]}`
  }

  return specifier.split("/")[0]
}

function isLocalSpecifier(specifier) {
  return (
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("@/") ||
    specifier.startsWith("~/") ||
    specifier.startsWith("src/") ||
    specifier.startsWith("#") ||
    specifier.startsWith("node:")
  )
}

function getRegistryDependency(specifier) {
  const normalized = specifier.replaceAll("\\", "/")

  const match = normalized.match(
    /(?:^|\/)(?:components\/)?ui\/([^/]+)$/
  )

  if (!match) {
    return null
  }

  return match[1].replace(/\.(tsx?|jsx?)$/, "")
}

function getScriptKind(filename) {
  const extension = path
    .extname(filename)
    .toLowerCase()

  if (extension === ".tsx") {
    return ts.ScriptKind.TSX
  }

  if (extension === ".jsx") {
    return ts.ScriptKind.JSX
  }

  if (extension === ".js") {
    return ts.ScriptKind.JS
  }

  return ts.ScriptKind.TS
}

function extractModuleSpecifiers(content, filename) {
  const sourceFile = ts.createSourceFile(
    filename,
    content,
    ts.ScriptTarget.Latest,
    true,
    getScriptKind(filename)
  )

  const specifiers = new Set()

  function addSpecifier(node) {
    if (
      node &&
      ts.isStringLiteralLike(node) &&
      typeof node.text === "string"
    ) {
      specifiers.add(node.text)
    }
  }

  function visit(node) {
    if (ts.isImportDeclaration(node)) {
      addSpecifier(node.moduleSpecifier)
    }

    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier
    ) {
      addSpecifier(node.moduleSpecifier)
    }

    if (
      ts.isImportEqualsDeclaration(node) &&
      ts.isExternalModuleReference(
        node.moduleReference
      )
    ) {
      addSpecifier(
        node.moduleReference.expression
      )
    }

    if (ts.isCallExpression(node)) {
      const firstArgument = node.arguments[0]

      if (
        node.expression.kind ===
        ts.SyntaxKind.ImportKeyword
      ) {
        addSpecifier(firstArgument)
      }

      if (
        ts.isIdentifier(node.expression) &&
        node.expression.text === "require"
      ) {
        addSpecifier(firstArgument)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return specifiers
}

function detectDependencies(content, filename) {
  const dependencies = new Set()
  const registryDependencies = new Set()

  const specifiers = extractModuleSpecifiers(
    content,
    filename
  )

  for (const specifier of specifiers) {
    const registryDependency =
      getRegistryDependency(specifier)

    if (registryDependency) {
      registryDependencies.add(
        registryDependency
      )
      continue
    }

    if (isLocalSpecifier(specifier)) {
      continue
    }

    const packageName = getPackageName(
      specifier
    )

    if (
      packageName &&
      !IGNORED_PACKAGES.has(packageName)
    ) {
      dependencies.add(packageName)
    }
  }

  return {
    dependencies,
    registryDependencies
  }
}

function getRegistryFileType(relativePath) {
  const normalized = normalizePath(
    relativePath
  )

  const basename = path.basename(
    normalized
  )

  if (
    normalized.includes("/hooks/") ||
    basename.startsWith("use-")
  ) {
    return "registry:hook"
  }

  if (
    normalized.includes("/lib/") ||
    normalized.endsWith("/data.ts") ||
    normalized.endsWith("/data.js")
  ) {
    return "registry:lib"
  }

  if (
    normalized.endsWith(".tsx") ||
    normalized.endsWith(".jsx")
  ) {
    return "registry:component"
  }

  return "registry:lib"
}

function buildDashboardEntry(directoryName) {
  const dashboardDirectory = path.join(
    DASHBOARDS_DIR,
    directoryName
  )

  const relativeFiles = collectReactFiles(
    dashboardDirectory,
    dashboardDirectory
  )

  if (relativeFiles.length === 0) {
    return null
  }

  const dependencies = new Set()
  const registryDependencies = new Set()

  for (const relativeFile of relativeFiles) {
    const fullPath = path.join(
      dashboardDirectory,
      relativeFile
    )

    const content = fs.readFileSync(
      fullPath,
      "utf8"
    )

    const detected = detectDependencies(
      content,
      fullPath
    )

    for (
      const dependency of detected.dependencies
    ) {
      dependencies.add(dependency)
    }

    for (
      const dependency of
      detected.registryDependencies
    ) {
      registryDependencies.add(dependency)
    }
  }

  const files = relativeFiles.map(
    (relativeFile) => ({
      path: normalizePath(
        path.join(
          directoryName,
          relativeFile
        )
      ),
      target: normalizePath(
        path.join(
          "components/watermelon",
          directoryName,
          relativeFile
        )
      ),
      type: getRegistryFileType(
        relativeFile
      )
    })
  )

  const entry = {
    name: directoryName,
    type: "registry:block",
    dependencies: [
      ...dependencies
    ].sort(),
    files
  }

  if (registryDependencies.size > 0) {
    entry.registryDependencies = [
      ...registryDependencies
    ].sort()
  }

  return entry
}

function main() {
  let dashboardDirectories

  try {
    dashboardDirectories = fs
      .readdirSync(DASHBOARDS_DIR, {
        withFileTypes: true
      })
      .filter(
        (entry) => entry.isDirectory()
      )
      .map((entry) => entry.name)
      .sort((a, b) =>
        a.localeCompare(b)
      )
  } catch (error) {
    console.error(
      `Unable to read dashboards directory: ${error.message}`
    )
    process.exit(1)
  }

  const items = dashboardDirectories
    .map(buildDashboardEntry)
    .filter(Boolean)

  const registry = {
    $schema:
      "https://ui.shadcn.com/schema/registry.json",
    name: "watermelon-dashboards",
    items
  }

  if (DRY_RUN) {
    console.log(
      JSON.stringify(registry, null, 2)
    )
    return
  }

  fs.writeFileSync(
    REGISTRY_PATH,
    `${JSON.stringify(registry, null, 2)}\n`,
    "utf8"
  )

  const rows = items.map((item) => ({
    Dashboard: item.name,
    Files: item.files.length,
    "NPM deps": item.dependencies.length,
    "Registry deps":
      item.registryDependencies?.length ?? 0
  }))

  rows.push({
    Dashboard: "TOTAL",
    Files: rows.reduce(
      (total, row) => total + row.Files,
      0
    ),
    "NPM deps": rows.reduce(
      (total, row) => total + row["NPM deps"],
      0
    ),
    "Registry deps": rows.reduce(
      (total, row) =>
        total + row["Registry deps"],
      0
    )
  })

  console.log(
    `\nGenerated ${items.length} dashboard registry entries\n`
  )
  console.table(rows)
  console.log(
    `Registry: ${normalizePath(REGISTRY_PATH)}\n`
  )
}

main()

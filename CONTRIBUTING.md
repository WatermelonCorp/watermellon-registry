# Contributing to Watermelon UI Registry

Thanks for contributing to the installable side of Watermelon UI.

## Quick Start

```bash
git clone https://github.com/WatermelonCorp/watermellon-registry.git
cd watermellon-registry
bun install
bun run dev
```

Before opening a pull request, run:

```bash
bun run lint
bun run build
```

If your changes affect registry output, also run:

```bash
bun run registry:check -- --fix   # fix dependencies and ship any imported files
bun run registry:build
```

Commit the updated `public/r` files. CI fails if they are out of date or if an item cannot be installed.

Blocks and dashboards are synced from watermelon-platform by a daily workflow that opens a PR (`bun run registry:sync -- --platform <path>` runs it locally).

## Good First Contributions

- add a new component or improve an existing one
- improve registry metadata or install instructions
- fix accessibility or responsive issues
- improve docs and examples
- simplify contributor workflows

For larger additions or sweeping refactors, open an issue or discussion first.

## Where Changes Usually Go

- `src/components/ui/`: primitives and reusable UI pieces
- `src/components/blocks/`: larger page sections
- `src/components/dashboards/`: dashboard building blocks
- `src/components/templates/`: installable templates
- `src/components/base-variants/`: reusable variant systems
- `public/r/`: generated registry artifacts

## Contribution Workflow

1. Create a branch for one focused change.
2. Make the source update in the right component family.
3. Run any relevant sync or registry build scripts.
4. Verify lint and build pass locally.
5. Open a PR with a clear summary and screenshots if needed.

## Pull Request Guidelines

- keep the API simple and predictable
- avoid unnecessary dependencies
- preserve accessibility and keyboard support
- document non-obvious install or usage details
- call out breaking changes clearly

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

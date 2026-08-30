# Watermelon UI Registry

Installable UI assets for the Watermelon ecosystem.

> Free community UI assets, kept sustainable by supporters who want better open-source building blocks.

This repo contains the registry output and source material that power copy-pasteable Watermelon components, blocks, dashboards, templates, and base variants. If `watermelon-platform` is the storefront, this repo is the installable catalog.

## What You Get

- installable component artifacts for the Watermelon registry
- UI primitives, blocks, dashboards, templates, and base variants
- scripts that keep registry output in sync with source files
- a contributor-friendly place to add new installable assets

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn registry tooling
- Bun for the preferred local workflow

## Quick Start

```bash
git clone https://github.com/WatermelonCorp/watermellon-registry.git
cd watermellon-registry
bun install
bun run dev
```

Useful commands:

- `bun run dev`: start the local app
- `bun run build`: typecheck and build the site
- `bun run lint`: run ESLint
- `bun run registry:build`: build the registry artifacts
- `bun run sitemap`: generate the sitemap
- `bun run deploy`: build, generate the sitemap, and deploy

## Project Structure

- `src/components/ui/`: installable UI primitives
- `src/components/blocks/`: installable blocks
- `src/components/dashboards/`: installable dashboards
- `src/components/templates/`: installable templates
- `src/components/base-variants/`: reusable variant systems
- `src/components/watermelon-ui/`: broader Watermelon catalog components
- `public/r/`: generated registry JSON output
- `scripts/`: sync and build helpers for the registry

## Contributing

Want to add something useful quickly?

1. Read [CONTRIBUTING.md](CONTRIBUTING.md).
2. Add or improve one asset family at a time.
3. Run the sync scripts if your change affects registry output.
4. Run lint and build before opening a PR.
5. Include screenshots or examples when the UI changes.

This repo is a great place to contribute:

- new components
- better component APIs
- missing registry metadata
- docs improvements
- accessibility fixes
- better install examples

## Support The Work

This registry exists to make high-quality UI assets easier to use and easier to share. If it helps your team ship faster, sponsorship helps us keep more of it free for the community.

- use the GitHub `Sponsor` button when available
- use the custom funding link configured for the org: [watermelon.sh](https://watermelon.sh)
- star the repo and share it with other builders

## Where Sponsor Support Goes

Support for the registry helps fund:

- new installable components, blocks, dashboards, templates, and variants
- better registry metadata, install flows, and documentation
- maintenance, compatibility updates, and quality improvements
- infra and release work needed to keep the catalog reliable

As of August 29, 2026, GitHub Sponsors for the `WatermelonCorp` org is still being finalized, so the funding links are the clearest current route.

## Repository Health

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [AI Policy](AI_POLICY.md)
- [License](LICENSE)

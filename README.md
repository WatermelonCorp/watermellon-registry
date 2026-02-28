<p align="center">
  <a href="https://ui.watermelon.sh">
    <img src="https://img.shields.io/badge/Watermelon_UI-🍉-green?style=for-the-badge" alt="Watermelon UI" />
  </a>
</p>

<h1 align="center">Watermelon UI Registry</h1>

<p align="center">
  A growing collection of <strong>260+ beautifully crafted, copy-pasteable React UI components</strong> built with Tailwind CSS, Radix UI, and Framer Motion.
</p>

<p align="center">
  <a href="https://ui.watermelon.sh">Website</a> ·
  <a href="#components">Components</a> ·
  <a href="#installation">Installation</a> ·
  <a href="CONTRIBUTING.md">Contributing</a> ·
  <a href="https://github.com/WatermelonCorp/watermellon-registry/issues">Issues</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" /></a>
  <a href="https://github.com/WatermelonCorp/watermellon-registry/stargazers"><img src="https://img.shields.io/github/stars/WatermelonCorp/watermellon-registry?style=social" alt="Stars" /></a>
  <a href="https://github.com/WatermelonCorp/watermellon-registry/issues"><img src="https://img.shields.io/github/issues/WatermelonCorp/watermellon-registry" alt="Issues" /></a>
  <a href="https://github.com/WatermelonCorp/watermellon-registry/pulls"><img src="https://img.shields.io/github/issues-pr/WatermelonCorp/watermellon-registry" alt="Pull Requests" /></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
</p>

---

## Table of Contents

- [About](#about)
- [Components](#components)
- [Installation](#installation)
- [Usage](#usage)
- [Local Development](#local-development)
- [Contributing](#contributing)
- [Community](#community)
- [License](#license)

## About

Watermelon UI is an open-source component registry that provides **production-ready, copy-pasteable React components**. Instead of installing a monolithic component library, you pick exactly the components you need — each one is self-contained with its own dependencies.

### Key Features

- **260+ Components** — Buttons, inputs, cards, accordions, modals, charts, dashboards, and much more
- **Copy-Paste Architecture** — Components are added directly to your project, giving you full ownership and control
- **shadcn/ui Compatible** — Works seamlessly with the `shadcn` CLI and registry protocol
- **Modern Stack** — Built with React 19, Tailwind CSS v4, Radix UI, and Framer Motion
- **TypeScript First** — Every component is fully typed out of the box
- **Customizable** — Components live in your codebase — modify them however you want

## Components

Browse all components at **[ui.watermelon.sh](https://ui.watermelon.sh)**.

Components are organized into categories:

| Category | Examples |
|----------|----------|
| **Inputs** | Button, Input, Checkbox, Select, Switch, Slider, AI Input |
| **Data Display** | Card, Avatar, Badge, Alert, Accordion, Table |
| **Feedback** | Dialog, Alert Dialog, Toast (Sonner), Progress |
| **Navigation** | Breadcrumb, Tabs, Sidebar, Carousel |
| **Layout** | Separator, Collapsible, Split Panels |
| **Charts** | Area, Bar, Line, Pie, Radar (via Recharts) |
| **Blocks** | Full page sections, dashboards, login forms |

## Installation

### Via shadcn CLI (Recommended)

Add any component to your project using the `shadcn` CLI:

```bash
npx shadcn@latest add "https://registry.watermelon.sh/<component-name>.json"
```

**Examples:**

```bash
# Add a button component
npx shadcn@latest add "https://registry.watermelon.sh/button.json"

# Add an animated accordion
npx shadcn@latest add "https://registry.watermelon.sh/animated-accordion.json"

# Add a chart component
npx shadcn@latest add "https://registry.watermelon.sh/chart.json"
```

### Manual Installation

You can also copy component files directly from `src/components/ui/` into your project's component directory.

### Prerequisites

- **React** 18+ (React 19 recommended)
- **Tailwind CSS** v4
- A path alias `@/` pointing to your `src/` directory (standard in Next.js, Vite, etc.)

## Usage

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="p-8">
      <Button variant="default">Click me</Button>
    </div>
  );
}
```

## Local Development

### Prerequisites

- [Bun](https://bun.sh) (preferred) or Node.js 20+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/WatermelonCorp/watermellon-registry.git
cd watermellon-registry

# Install dependencies
bun install
# or
npm install

# Start the dev server
bun dev
# or
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start Vite development server |
| `bun run build` | Type-check and build for production |
| `bun run lint` | Run ESLint |
| `bun run preview` | Preview production build locally |
| `bun run registry:build` | Build the shadcn registry |
| `bun run deploy` | Deploy to Cloudflare Workers (Vercel) |

### Project Structure

```
watermellon-registry/
├── public/r/              # Built registry JSON files (one per component)
├── src/
│   ├── components/
│   │   ├── ui/            # 260+ UI component source files
│   │   ├── blocks/        # Full page block components
│   │   ├── dashboards/    # Dashboard components
│   │   └── pages/         # Full page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions (cn, etc.)
│   └── static-assets/     # Static assets
├── scripts/
│   ├── sync-registry.js   # Syncs components → registry.json
│   └── sync-dashboards.js # Syncs dashboard components
├── registry.json          # Master registry configuration
├── components.json        # shadcn configuration
└── wrangler.jsonc         # Cloudflare Workers config
```

## Contributing

We love contributions! Whether it's fixing a bug, adding a new component, improving documentation, or suggesting features — every contribution helps make Watermelon UI better.

Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-component`
3. Add your component in `src/components/ui/`
4. Run `node scripts/sync-registry.js` to update the registry
5. Commit and push: `git push origin feat/my-component`
6. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

## Community

- [GitHub Discussions](https://github.com/WatermelonCorp/watermellon-registry/discussions) — Ask questions and share ideas
- [GitHub Issues](https://github.com/WatermelonCorp/watermellon-registry/issues) — Report bugs or request features

## Governance & Policies

- [Code of Conduct](CODE_OF_CONDUCT.md) — Our community standards
- [Security Policy](SECURITY.md) — How to report vulnerabilities
- [AI Policy](AI_POLICY.md) — Guidelines on AI-generated contributions
- [License](LICENSE) — MIT License

## Acknowledgements

Watermelon UI is built on the shoulders of amazing open-source projects:

- [shadcn/ui](https://ui.shadcn.com) — Registry protocol and CLI
- [Radix UI](https://www.radix-ui.com) — Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion) — Animation library
- [Recharts](https://recharts.org) — Chart library
- [Vite](https://vitejs.dev) — Build tool

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with 🍉 by the <a href="https://github.com/WatermelonCorp">Watermelon</a> community
</p>

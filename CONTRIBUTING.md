# Contributing to Watermelon UI

First off, **thank you** for considering contributing to Watermelon UI! 🍉 Every contribution — whether it's a bug fix, new component, documentation improvement, or feature suggestion — helps make this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Adding a New Component](#adding-a-new-component)
  - [Improving Documentation](#improving-documentation)
- [Coding Standards](#coding-standards)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## Code of Conduct

This project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards. Please report unacceptable behavior to **conduct@watermelon.sh**.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh) (preferred) **or** [Node.js](https://nodejs.org/) 20+
- A GitHub account

### Development Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/<your-username>/watermellon-registry.git
cd watermellon-registry

# 3. Add upstream remote
git remote add upstream https://github.com/WatermelonCorp/watermellon-registry.git

# 4. Install dependencies
bun install
# or
npm install

# 5. Start the development server
bun dev
# or
npm run dev
```

The dev server will be available at `http://localhost:5173`.

## How to Contribute

### Reporting Bugs

Found a bug? Please [open a bug report](https://github.com/WatermelonCorp/watermellon-registry/issues/new?template=bug_report.yml) and include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser / OS / React / Tailwind version info
- Screenshots or screen recordings, if applicable

### Suggesting Features

Have an idea? [Open a feature request](https://github.com/WatermelonCorp/watermellon-registry/issues/new?template=feature_request.yml) and describe:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### Adding a New Component

This is the most impactful way to contribute! Here's the full workflow:

1. **Check existing components** at [ui.watermelon.sh](https://ui.watermelon.sh) to avoid duplicates.
2. **Open an issue** using the [Component Request](https://github.com/WatermelonCorp/watermellon-registry/issues/new?template=component_request.yml) template to discuss the component before building it.
3. **Create your branch:**

   ```bash
   git checkout -b feat/my-component
   ```

4. **Add your component** in `src/components/ui/`:

   ```
   src/components/ui/my-component.tsx
   ```

5. **Follow the component guidelines:**
   - Use TypeScript with proper type exports
   - Use Tailwind CSS v4 for styling
   - Use Radix UI primitives where applicable for accessibility
   - Use `cn()` from `@/lib/utils` for conditional class merging
   - Export a single default or named component
   - Add `"use client"` directive if it uses client-side hooks

6. **Update the registry:**

   ```bash
   node scripts/sync-registry.js
   ```

7. **Test your component** by viewing it in the local dev server.

8. **Commit, push, and open a PR.**

### Improving Documentation

Documentation improvements are always welcome. This includes:

- Fixing typos or unclear instructions
- Adding examples or use-cases
- Improving the README or other markdown files
- Adding JSDoc comments to components

## Coding Standards

### General

- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 — no inline styles or CSS modules
- **Formatting:** Follow the existing ESLint configuration
- **Naming:** PascalCase for components, camelCase for functions/variables, kebab-case for file names

### Component Structure

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "base-styles-here",
          variant === "outline" && "outline-styles",
          className
        )}
        {...props}
      />
    );
  }
);

MyComponent.displayName = "MyComponent";

export { MyComponent };
```

### Accessibility

- Use semantic HTML elements
- Use Radix UI primitives for interactive components (dialogs, popovers, etc.)
- Include proper ARIA attributes where needed
- Ensure keyboard navigation works correctly

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <description>

[optional body]

[optional footer]
```

### Types

| Type       | Description                                     |
|------------|-------------------------------------------------|
| `feat`     | A new feature or component                      |
| `fix`      | A bug fix                                       |
| `docs`     | Documentation changes only                      |
| `style`    | Code style changes (formatting, semicolons, etc)|
| `refactor` | Code changes that neither fix a bug nor add a feature |
| `perf`     | Performance improvements                        |
| `test`     | Adding or updating tests                        |
| `chore`    | Build process or tooling changes                |

### Examples

```
feat(ui): add animated-tabs component
fix(accordion): resolve keyboard navigation issue
docs: update installation instructions
chore: upgrade Tailwind CSS to v4.1
```

## Pull Request Process

1. **Ensure your branch is up to date** with the `main` branch:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run linting** before pushing:

   ```bash
   bun run lint
   ```

3. **Build successfully:**

   ```bash
   bun run build
   ```

4. **Fill out the PR template** completely — describe your changes, link any related issues, and include screenshots for visual changes.

5. **Request a review** — a maintainer will review your PR and may request changes.

6. **Address feedback** promptly and push updates to your branch.

### What We Look For

- ✅ Clean, readable TypeScript code
- ✅ Consistent with existing component patterns
- ✅ Accessible (keyboard + screen reader)
- ✅ Responsive and mobile-friendly
- ✅ No unnecessary dependencies
- ✅ Registry updated via `sync-registry.js`

## Community

- **[GitHub Discussions](https://github.com/WatermelonCorp/watermellon-registry/discussions)** — Ask questions, share ideas, show off what you've built
- **[GitHub Issues](https://github.com/WatermelonCorp/watermellon-registry/issues)** — Report bugs or request features

---

Thank you for helping make Watermelon UI better! 🍉

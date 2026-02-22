# Watermelon UI Library

A collection of re-usable UI components for your React applications.

[ui.watermelon.sh](https://ui.watermelon.sh)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing (Adding Components)](#contributing-adding-components)
- [Registry Structure](#registry-structure)

## Introduction

This registry provides a set of copy-pasteable components that you can easily integrate into your projects. It is built to work seamlessly with modern React stacks, typically leveraging Tailwind CSS and sometimes Framer Motion or other libraries.

## Installation

You can add components to your project using the `shadcn` CLI (or compatible tools) by pointing to this registry.

```bash
npx shadcn@latest add  https://registry.watermelon.sh/<component-name>.json
```

Alternatively, for local development or manual usage, you can simply copy the component files from `src/components/ui` into your project.

## Usage

Once a component is added to your project, you can import and use it like any other React component.

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Click me</Button>;
}
```

## Contributing (Adding Components)

To add a new component to this registry, follow these steps:

### 1. Create the Component

Create your component file in the `src/components/ui/` directory.

- **Path**: `src/components/ui/<component-name>.tsx`
- **Naming Convention**: Use `kebab-case` for filenames (e.g., `my-new-component.tsx`).

Example `src/components/ui/my-new-component.tsx`:

```tsx
import * as React from "react";

export function MyNewComponent() {
  return <div>Hello World</div>;
}
```

### 2. Sync the Registry

Run the registry synchronization script to automatically add your new component to `registry.json`. This script scans the `src/components/ui` directory, detects dependencies, and updates the registry configuration.

```bash
node scripts/sync-registry.js
```

You should see output indicating that your component has been added:

```
Reading registry.json...
Listing UI components...
Found missing component: my-new-component.tsx
Adding 1 new components to registry...
Done!
```

### 3. Verify

Check `registry.json` to ensure your component has been added correctly with the appropriate dependencies.

## Registry Structure

- **`registry.json`**: The main configuration file that lists all available components, their dependencies, and file paths.
- **`src/components/ui/`**: The directory containing the source code for all UI components.
- **`scripts/sync-registry.js`**: The automation script that updates `registry.json` based on the files in `src/components/ui/`.

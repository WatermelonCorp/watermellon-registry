# How to Publish Your UI Library to NPM

This guide will help you publish your Duncan UI Library to NPM so users can install components with `npx shadcn add @watermelon/hero1`.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://npmjs.com)
2. **Node.js & NPM**: Ensure you have the latest versions installed
3. **Git**: Your code should be in a git repository

## Step 1: Prepare Your Package.json

Update your `package.json` file:

```json
{
  "name": "@watermelon/ui",
  "private": false,
  "version": "0.1.0",
  "description": "A beautiful UI component library with shadcn/ui compatibility",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./registry.json": "./registry.json"
  },
  "files": [
    "dist",
    "src",
    "registry.json",
    "components.json",
    "README.md"
  ],
  "keywords": [
    "ui",
    "components",
    "react",
    "shadcn",
    "tailwindcss",
    "typescript"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Pritam-2002/Duncan_ui_libary"
  },
  "homepage": "https://github.com/Pritam-2002/Duncan_ui_libary",
  "bugs": {
    "url": "https://github.com/Pritam-2002/Duncan_ui_libary/issues"
  }
}
```

## Step 2: Configure Build for Library

Update your `vite.config.ts` to build as a library:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WatermelonUI',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

## Step 3: Create Main Export File

Create `src/index.ts` to export all your components:

```typescript
// Export all UI components
export { Button } from './components/ui/button'

// Export all blocks
export { default as Hero1 } from './components/blocks/sfHerodemo/Hero1'
export { default as Header } from './components/blocks/sfHerodemo/ui/Header'
export { default as Hero } from './components/blocks/sfHerodemo/ui/Hero'

// Export utilities
export * from './lib/utils'
```

## Step 4: Create .npmignore File

Create `.npmignore` to exclude unnecessary files:

```
# Development files
node_modules/
.git/
.vscode/
.idea/

# Build artifacts
dist/
build/

# Environment and config files
.env*
*.log
*.tsbuildinfo

# Documentation and demos
docs/
examples/
*.md
!README.md

# Test files
**/*.test.*
**/*.spec.*
__tests__/
coverage/

# Vite dev files
index.html
public/
vite.config.ts.timestamp-*
```

## Step 5: Update Registry.json Paths

Ensure your `registry.json` uses correct paths for NPM distribution:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "Watermelon UI Library",
  "homepage": "https://github.com/Pritam-2002/Duncan_ui_libary",
  "items": [
    {
      "name": "hero1",
      "type": "registry:block",
      "dependencies": ["lucide-react", "framer-motion"],
      "files": [
        {
          "path": "src/components/blocks/sfHerodemo/Hero1.tsx",
          "target": "components/watermelon/blocks/hero1/hero1.tsx",
          "type": "registry:block"
        }
      ]
    }
  ]
}
```

## Step 6: NPM Login and Setup

1. **Login to NPM**:
   ```bash
   npm login
   ```
   Enter your NPM username, password, and email.

2. **Verify login**:
   ```bash
   npm whoami
   ```

3. **Check if package name is available**:
   ```bash
   npm view @watermelon/ui
   ```
   If it returns an error, the name is available.

## Step 7: Build Your Library

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the library**:
   ```bash
   npm run build
   ```

3. **Test the package locally**:
   ```bash
   npm pack
   ```
   This creates a `.tgz` file showing what will be published.

## Step 8: Publish to NPM

1. **First publication**:
   ```bash
   npm publish --access public
   ```

2. **For updates, increment version first**:
   ```bash
   # For bug fixes
   npm version patch
   
   # For new features
   npm version minor
   
   # For breaking changes
   npm version major
   
   # Then publish
   npm publish
   ```

## Step 9: How Users Will Install

Once published, users can install your components like this:

```bash
# Install the package
npm install @watermelon/ui

# Add components via shadcn CLI
npx shadcn add @watermelon/ui/hero1
```

Or directly from your registry:

```bash
npx shadcn add https://github.com/Pritam-2002/Duncan_ui_libary/raw/main/registry.json#hero1
```

## Step 10: Automation (Optional)

Create GitHub Actions for automatic publishing:

`.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Troubleshooting

### Common Issues:

1. **Package name already exists**: Choose a different scoped name like `@yourname/ui`

2. **Permission denied**: Make sure you're logged in with `npm whoami`

3. **Build fails**: Check your `vite.config.ts` and ensure all imports are correct

4. **Components not found**: Verify your `registry.json` paths match your actual file structure

### Best Practices:

- Always test your package locally before publishing
- Use semantic versioning (semver)
- Keep your README.md updated with usage examples
- Add proper TypeScript types
- Include peer dependencies in your package.json

## Support

If you encounter issues:

1. Check the [NPM documentation](https://docs.npmjs.com/)
2. Review [shadcn/ui registry documentation](https://ui.shadcn.com/docs/registry)
3. Open an issue on your GitHub repository

---

**Happy publishing! 🚀**
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.resolve(__dirname, '../registry.json');
const UI_DIR = path.resolve(__dirname, '../src/components/ui');

// Dependencies to check for
const KNOWN_DEPENDENCIES = [
  'lucide-react',
  'motion/react',
  'motion/react',
  'clsx',
  'tailwind-merge',
  'recharts',
  'sonner',
  'zod',
  'date-fns',
  'react-day-picker',
  'embla-carousel-react',
  'next-themes',
  'shiki',
  'ansi-to-react',
  'react-slick'
];

// Radix dependencies prefix
const RADIX_PREFIX = '@radix-ui/';

function getDependencies(content) {
  const dependencies = new Set();
  
  // Check for known dependencies
  KNOWN_DEPENDENCIES.forEach(dep => {
    if (content.includes(`rom "${dep}"`) || content.includes(`rom '${dep}'`)) {
      // Map motion/react to motion/react if mostly used that way, or keep as is? 
      // The registry seems to use "motion/react" mostly. 
      // If code uses "motion/react", we might need to list that or mapped to motion/react depending on project convention.
      // Looking at previous files, "motion/react" is common. 
      // If import is from "motion/react", let's list "motion/react" as dependency if that's the library name installed.
      if (dep === 'motion/react') {
        dependencies.add('motion/react');
      } else {
        dependencies.add(dep);
      }
    }
  });

  // Check for radix dependencies
  // Regex to find imports starting with @radix-ui/
  const radixRegex = /from "(@radix-ui\/[^"]+)"|from '(@radix-ui\/[^']+)'/g;
  let match;
  while ((match = radixRegex.exec(content)) !== null) {
    const dep = match[1] || match[2];
    dependencies.add(dep);
  }

  // Check for class-variance-authority (cva)
  if (content.includes('cva(') || content.includes('from "class-variance-authority"')) {
    dependencies.add('class-variance-authority');
  }

  return Array.from(dependencies);
}

function main() {
  console.log('Reading registry.json...');
  let registry;
  try {
    const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf8');
    registry = JSON.parse(registryContent);
  } catch (error) {
    console.error('Error reading registry.json:', error);
    process.exit(1);
  }

  console.log('Listing UI components...');
  let uiFiles;
  try {
    uiFiles = fs.readdirSync(UI_DIR).filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
  } catch (error) {
    console.error('Error listing UI directory:', error);
    process.exit(1);
  }

  // Create a map of existing registry paths to avoid duplicates
  const existingPaths = new Set();
  registry.items.forEach(item => {
    if (item.files) {
      item.files.forEach(file => {
        existingPaths.add(file.path);
      });
    }
  });

  let addedCount = 0;
  let updatedCount = 0;

  uiFiles.forEach(file => {
    const filePath = `src/components/ui/${file}`;
    
    // Check if file is already in registry
    // We check exact path match
    if (existingPaths.has(filePath)) {
        return;
    }

    console.log(`Found missing component: ${file}`);
    
    // Read file content to determine dependencies
    const fullPath = path.join(UI_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const dependencies = getDependencies(content);

    const name = path.basename(file, path.extname(file));

    // Create new entry
    const newEntry = {
      name: name,
      type: "registry:ui",
      dependencies: dependencies,
      files: [
        {
          path: filePath,
          target: `components/ui/${file}`,
          type: "registry:ui"
        }
      ]
    };

    // Add to registry items
    registry.items.push(newEntry);
    addedCount++;
  });

  if (addedCount > 0) {
    // Sort items by name
    registry.items.sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Adding ${addedCount} new components to registry...`);
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
    console.log('Done!');
  } else {
    console.log('No new components found to add.');
  }
}

main();

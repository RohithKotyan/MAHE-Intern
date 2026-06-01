import fs from 'fs';
import path from 'path';

const files = [
  'client/src/pages/Home.jsx',
  'client/src/pages/Features.jsx',
  'client/src/pages/About.jsx',
  'client/src/pages/Contact.jsx',
];

files.forEach(file => {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/text-\[var\(--text-primary\)\]/g, 'text-on-surface');
    content = content.replace(/text-\[var\(--text-secondary\)\]/g, 'text-on-surface-variant');
    content = content.replace(/text-\[var\(--text-muted\)\]/g, 'text-outline');
    content = content.replace(/bg-eo-surface-container-highest/g, 'bg-surface-container-highest');
    content = content.replace(/bg-eo-surface-container-high/g, 'bg-surface-container-high');
    content = content.replace(/bg-eo-surface-container-low/g, 'bg-surface-container-low');
    content = content.replace(/bg-eo-surface-container-lowest/g, 'bg-surface-container-lowest');
    content = content.replace(/bg-eo-surface-container/g, 'bg-surface-container');
    content = content.replace(/bg-eo-bg/g, 'bg-background');
    content = content.replace(/bg-eo-surface/g, 'bg-surface');
    content = content.replace(/bg-eo-outline-variant/g, 'bg-outline-variant');
    content = content.replace(/border-eo-outline-variant/g, 'border-outline-variant');
    content = content.replace(/bg-eo-tertiary/g, 'bg-tertiary');
    content = content.replace(/border-eo-tertiary/g, 'border-tertiary');
    content = content.replace(/text-eo-tertiary/g, 'text-tertiary');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

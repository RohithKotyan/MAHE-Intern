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
    // Replace the previous text-on-surface with text-white
    content = content.replace(/text-on-surface-variant/g, 'text-gray-300');
    content = content.replace(/text-on-surface/g, 'text-white');
    content = content.replace(/text-outline/g, 'text-gray-400');
    
    // Also fix the glass-card text
    content = content.replace(/text-gray-300/g, 'text-gray-300'); // No-op, just to be sure
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

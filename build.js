// scripts/build.js
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const TEMPLATE_DIR = path.join(__dirname, '/views');
const OUTPUT_DIR = path.join(__dirname, '/dist');
const ASSETS_SRC = path.join(__dirname, '/assets');
const ASSETS_DEST = path.join(OUTPUT_DIR, 'assets');

fse.emptyDirSync(OUTPUT_DIR);

// Configure nunjucks
const env = nunjucks.configure(TEMPLATE_DIR, {
  noCache: true,
  autoescape: true
});

// Recursively walk the views directory
function getAllHtmlFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const relPath = path.join(base, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath, relPath));
    } else if (file.endsWith('.html')) {
      results.push(relPath);
    }
  });

  return results;
}

// Render all HTML files
const pages = getAllHtmlFiles(TEMPLATE_DIR);

pages.forEach(relPath => {
  const rendered = env.render(relPath);
  const outputPath = path.join(OUTPUT_DIR, relPath);
  fse.ensureDirSync(path.dirname(outputPath));
  fs.writeFileSync(outputPath, rendered);
  console.log(`Rendered: ${relPath}`);
});

// Copy assets
fse.copySync(ASSETS_SRC, ASSETS_DEST);

console.log('✅ Site built in /dist');

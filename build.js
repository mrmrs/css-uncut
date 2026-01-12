#!/usr/bin/env node

/**
 * CSS UNCUT Build Pipeline
 * 
 * Concatenates CSS partials, processes @custom-media queries,
 * and outputs build statistics.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const zlib = require('zlib');

// Configuration
const CONFIG = {
  srcFile: path.join(__dirname, 'src', 'uncut.css'),
  srcDir: path.join(__dirname, 'src'),
  distDir: path.join(__dirname, 'css'),
  outputName: 'uncut',
  version: '1.0.0'
};

// Custom media queries - mobile first approach
const CUSTOM_MEDIA = {
  '--small': '(min-width: 30em)',
  '--medium': '(min-width: 48em)',
  '--large': '(min-width: 60em)',
  '--extra-large': '(min-width: 90em)'
};

// Order of partials (determines cascade order)
const PARTIAL_ORDER = [
  // Variables & Reset
  '_variables.css',
  '_normalize.css',
  
  // Layout
  '_display.css',
  '_position.css',
  '_floats.css',
  '_clears.css',
  '_overflow.css',
  '_visibility.css',
  '_z-index.css',
  
  // Box Model
  '_box-sizing.css',
  '_spacing.css',
  '_widths.css',
  '_width-percentages.css',
  '_width-scale.css',
  '_heights.css',
  '_height-percentages.css',
  '_height-scale.css',
  '_min-widths.css',
  '_min-width-percentages.css',
  '_min-width-scale.css',
  '_max-widths.css',
  '_max-width-percentages.css',
  '_max-width-scale.css',
  '_min-heights.css',
  '_min-height-percentages.css',
  '_min-height-scale.css',
  '_max-heights.css',
  '_max-height-percentages.css',
  '_max-height-scale.css',
  '_dimension-utilities.css',
  '_squares.css',
  '_aspect-ratio.css',
  
  // Flexbox
  '_flex-direction.css',
  '_flex-wrap.css',
  '_flex-grow.css',
  '_flex-shrink.css',
  '_flex-basis.css',
  '_flex-align-items.css',
  '_flex-align-self.css',
  '_flex-align-content.css',
  '_flex-justify-content.css',
  '_order.css',
  '_gap.css',
  
  // Grid
  '_grid.css',
  '_grid-template.css',
  '_grid-auto.css',
  '_grid-placement.css',
  '_place-items.css',
  
  // Container Queries
  '_container.css',
  
  // Typography
  '_type-scale.css',
  '_font-family.css',
  '_font-style.css',
  '_font-weight.css',
  '_font-variant.css',
  '_font-feature-settings.css',
  '_font-kerning.css',
  '_font-optical-sizing.css',
  '_font-stretch.css',
  '_letter-spacing.css',
  '_line-height.css',
  '_text-align.css',
  '_text-decoration.css',
  '_text-decoration-style.css',
  '_text-decoration-thickness.css',
  '_text-transform.css',
  '_text-overflow.css',
  '_text-rendering.css',
  '_text-indent.css',
  '_text-shadow.css',
  '_text-underline.css',
  '_text-underline-offset.css',
  '_white-space.css',
  '_word-break.css',
  '_word-spacing.css',
  '_word-wrap.css',
  '_hyphens.css',
  '_vertical-align.css',
  '_direction.css',
  '_writing-mode.css',
  '_unicode-bidi.css',
  
  // Colors & Skins
  '_colors.css',
  '_skins.css',
  '_background-colors.css',
  '_background-attachment.css',
  '_background-blend-mode.css',
  '_background-clip.css',
  '_background-origin.css',
  '_background-position.css',
  '_background-repeat.css',
  '_background-size.css',
  
  // Borders
  '_borders.css',
  '_border-colors.css',
  '_border-radius.css',
  '_border-style.css',
  '_border-widths.css',
  '_border-collapse.css',
  '_outline.css',
  '_outline-offset.css',
  
  // Effects
  '_opacity.css',
  '_box-shadow.css',
  '_filter.css',
  '_filter-blur.css',
  '_filter-brightness.css',
  '_filter-contrast.css',
  '_filter-grayscale.css',
  '_filter-hue-rotate.css',
  '_filter-invert.css',
  '_filter-saturate.css',
  '_filter-sepia.css',
  '_backdrop-filter.css',
  '_mix-blend-mode.css',
  '_isolation.css',
  
  // Transforms
  '_transforms.css',
  '_transform-origin.css',
  '_transform-style.css',
  '_perspective.css',
  '_perspective-origin.css',
  '_backface-visibility.css',
  '_scale.css',
  '_rotate.css',
  '_translate.css',
  
  // Transitions & Animations
  '_transition-property.css',
  '_transition-duration.css',
  '_transition-timing.css',
  '_transition-delay.css',
  '_animation-name.css',
  '_animation-duration.css',
  '_animation-timing.css',
  '_animation-delay.css',
  '_animation-iteration-count.css',
  '_animation-direction.css',
  '_animation-fill-mode.css',
  '_animation-play-state.css',
  '_will-change.css',
  
  // Interactivity
  '_cursor.css',
  '_pointer-events.css',
  '_user-select.css',
  '_touch-action.css',
  '_resize.css',
  '_scroll-behavior.css',
  '_scroll-snap.css',
  '_scroll-margin.css',
  '_scroll-padding.css',
  '_overscroll-behavior.css',
  '_scrollbar.css',
  
  // Tables
  '_table-layout.css',
  '_caption-side.css',
  '_empty-cells.css',
  
  // Lists
  '_lists.css',
  '_list-style-type.css',
  '_list-style-position.css',
  
  // Images & Media
  '_object-fit.css',
  '_object-position.css',
  '_image-rendering.css',
  '_image-orientation.css',
  
  // Form Elements
  '_appearance.css',
  '_accent-color.css',
  '_caret-color.css',
  
  // Misc
  '_content.css',
  '_content-visibility.css',
  '_contain.css',
  '_clip-path.css',
  '_mask.css',
  '_shape-outside.css',
  '_quotes.css',
  '_counter.css',
  '_columns.css',
  '_breaks.css',
  '_orphans-widows.css',
  '_print.css',
  
  // Links & States
  '_links.css',
  '_forms.css',
  
  // Utilities (last for override capability)
  '_utilities.css'
];

/**
 * Process custom media queries in CSS
 */
function processCustomMedia(css) {
  let processed = css;
  
  // Add custom media definitions at the top
  const customMediaDeclarations = Object.entries(CUSTOM_MEDIA)
    .map(([name, query]) => `@custom-media ${name} ${query};`)
    .join('\n');
  
  // Replace @media (--name) with actual media queries
  Object.entries(CUSTOM_MEDIA).forEach(([name, query]) => {
    const regex = new RegExp(`@media\\s*\\(${name.replace('--', '--')}\\)`, 'g');
    processed = processed.replace(regex, `@media ${query}`);
  });
  
  return `/* Custom Media Definitions */\n${customMediaDeclarations}\n\n${processed}`;
}

/**
 * Read and process @import statements
 */
function processImports(filePath, processedFiles = new Set()) {
  // Prevent circular imports
  if (processedFiles.has(filePath)) {
    return '';
  }
  processedFiles.add(filePath);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);
  
  // Process @import statements
  return content.replace(/@import\s+["']([^"']+)["'];?/g, (match, importPath) => {
    const resolvedPath = path.join(dir, importPath);
    
    if (!fs.existsSync(resolvedPath)) {
      console.warn(`Warning: Import not found: ${importPath}`);
      return `/* Import not found: ${importPath} */`;
    }
    
    // Recursively process imports
    const importedContent = processImports(resolvedPath, processedFiles);
    const fileName = path.basename(importPath);
    
    return `/* ========================================\n   ${fileName.replace(/^_|\.css$/g, '').toUpperCase()}\n   ======================================== */\n\n${importedContent}`;
  });
}

/**
 * Minify CSS (simple implementation)
 */
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace
    .replace(/\s+/g, ' ')
    // Remove space around special characters
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    // Remove trailing semicolons before }
    .replace(/;}/g, '}')
    // Remove empty rules
    .replace(/[^{}]+\{\s*\}/g, '')
    .trim();
}

/**
 * Calculate and format file size
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Get gzipped size
 */
function getGzipSize(content) {
  return zlib.gzipSync(content).length;
}

/**
 * Print build statistics
 */
function printStats(raw, minified) {
  const rawSize = Buffer.byteLength(raw, 'utf8');
  const minSize = Buffer.byteLength(minified, 'utf8');
  const gzipSize = getGzipSize(minified);
  
  const divider = '═'.repeat(50);
  
  console.log('\n' + divider);
  console.log('  CSS UNCUT BUILD STATISTICS');
  console.log(divider);
  console.log(`
  📦 Raw file size:          ${formatSize(rawSize).padStart(12)}
  📦 Minified file size:     ${formatSize(minSize).padStart(12)}
  📦 Minified + Gzipped:     ${formatSize(gzipSize).padStart(12)}
  
  💾 Minification savings:   ${((1 - minSize/rawSize) * 100).toFixed(1)}%
  💾 Gzip savings:           ${((1 - gzipSize/rawSize) * 100).toFixed(1)}%
`);
  console.log(divider + '\n');
  
  return { rawSize, minSize, gzipSize };
}

/**
 * Main build function
 */
function build() {
  console.log('\n🔨 Building CSS UNCUT...\n');
  
  // Ensure dist directory exists
  if (!fs.existsSync(CONFIG.distDir)) {
    fs.mkdirSync(CONFIG.distDir, { recursive: true });
  }
  
  // Build header
  const header = `/**
 * CSS UNCUT v${CONFIG.version}
 * A comprehensive CSS utility library
 * https://github.com/mrmrs/css-uncut
 * MIT License
 * Built: ${new Date().toISOString()}
 */\n\n`;
  
  // Check if source file exists
  if (!fs.existsSync(CONFIG.srcFile)) {
    console.log(`⚠️  Source file not found: ${CONFIG.srcFile}`);
    process.exit(1);
  }
  
  // Process imports and get CSS
  let css = processImports(CONFIG.srcFile);
  
  css = processCustomMedia(css);
  const rawCSS = header + css;
  const minifiedCSS = header.replace(/\n/g, '') + minifyCSS(css);
  
  // Write files
  const rawPath = path.join(CONFIG.distDir, `${CONFIG.outputName}.css`);
  const minPath = path.join(CONFIG.distDir, `${CONFIG.outputName}.min.css`);
  
  fs.writeFileSync(rawPath, rawCSS);
  fs.writeFileSync(minPath, minifiedCSS);
  
  console.log(`✅ Created ${rawPath}`);
  console.log(`✅ Created ${minPath}`);
  
  // Print stats
  printStats(rawCSS, minifiedCSS);
}

/**
 * Create source directory structure if it doesn't exist
 */
function createDirectoryStructure() {
  if (!fs.existsSync(CONFIG.srcDir)) {
    fs.mkdirSync(CONFIG.srcDir, { recursive: true });
  }
}

/**
 * Watch mode
 */
function watch() {
  console.log('👀 Watching for changes...\n');
  
  build();
  
  // Watch src directory recursively
  fs.watch(CONFIG.srcDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.css')) {
      console.log(`\n📝 ${filename} changed, rebuilding...`);
      build();
    }
  });
}

// CLI
const args = process.argv.slice(2);

if (args.includes('--watch') || args.includes('-w')) {
  watch();
} else {
  build();
}

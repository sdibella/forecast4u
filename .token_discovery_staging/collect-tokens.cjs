#!/usr/bin/env node
/**
 * Token discovery script for IBM Carbon Design System + Forecast4U custom tokens.
 * Reads SCSS source files and outputs tokens.json with all public design tokens.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ─── helpers ────────────────────────────────────────────────────────────────

function readFile(relPath) {
  try {
    return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  } catch {
    return '';
  }
}

/**
 * Extract SCSS variable definitions from a string.
 * Handles: `$name: value !default;` (single-line, non-map values)
 * Returns Record<string, string>
 */
function extractScssVars(content) {
  const result = {};
  const re = /^\$([a-zA-Z0-9_-]+)\s*:\s*([^;!(\n]+?)(?:\s*!default)?\s*;/gm;
  let m;
  while ((m = re.exec(content)) !== null) {
    const name = `$${m[1]}`;
    const value = m[2].trim();
    if (!value.startsWith('(')) {
      result[name] = value;
    }
  }
  return result;
}

/**
 * Extract CSS custom property definitions from a string.
 * Handles: `--name: value;`
 */
function extractCSSVars(content) {
  const result = {};
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    result[`--${m[1]}`] = m[2].trim();
  }
  return result;
}

/**
 * Parse the $white theme map from _themes.scss to get default CDS token values.
 * The white theme is the default Carbon theme.
 */
function parseWhiteTheme(content) {
  const start = content.indexOf('$white: (');
  if (start === -1) return {};
  let depth = 0;
  let blockStart = content.indexOf('(', start);
  let i = blockStart;
  while (i < content.length) {
    if (content[i] === '(') depth++;
    else if (content[i] === ')') {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }
  const block = content.slice(blockStart + 1, i);
  const result = {};
  // Each entry: `  token-name: value,`  (value may contain parens like rgba())
  const lineRe = /^\s{2}([a-z][a-z0-9-]+)\s*:\s*(.+?),?\s*$/gm;
  let m;
  while ((m = lineRe.exec(block)) !== null) {
    const key = `--cds-${m[1]}`;
    const val = m[2].trim().replace(/,$/, '');
    result[key] = val;
  }
  return result;
}

/**
 * Parse component token SCSS files that use the pattern:
 *   $token-name: (
 *     white-theme: #value,
 *     ...
 *   ) !default;
 * Returns Record<string, string> using white-theme (or fallback) value.
 */
function parseComponentTokens(content) {
  const result = {};
  const outerRe = /\$([a-zA-Z0-9-]+)\s*:\s*\(/g;
  let om;
  while ((om = outerRe.exec(content)) !== null) {
    const tokenName = om[1];
    let depth = 1;
    let i = om.index + om[0].length;
    const blockStart = i;
    while (i < content.length && depth > 0) {
      if (content[i] === '(') depth++;
      else if (content[i] === ')') depth--;
      i++;
    }
    const block = content.slice(blockStart, i - 1);
    let value = null;
    const whiteMatch = block.match(/white-theme\s*:\s*([^,\n]+)/);
    const fallbackMatch = block.match(/fallback\s*:\s*([^,\n]+)/);
    if (whiteMatch) {
      value = whiteMatch[1].trim();
    } else if (fallbackMatch) {
      value = fallbackMatch[1].trim();
    } else {
      const firstMatch = block.match(/:\s*([^,\n]+)/);
      if (firstMatch) value = firstMatch[1].trim();
    }
    if (value) {
      result[`$${tokenName}`] = value;
    }
  }
  return result;
}

/**
 * Extract color palette from @carbon/colors ES module.
 * Reads plain `var name = 'value'` lines (only solid hex values, no hover variants).
 */
function parseColorPalette(content) {
  const result = {};
  const re = /^var\s+([a-zA-Z0-9]+)\s*=\s*'(#[0-9a-fA-F]+)';/gm;
  let m;
  while ((m = re.exec(content)) !== null) {
    const name = m[1]
      .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .replace(/([a-zA-Z])([0-9])/g, "$1-$2")
      .toLowerCase();
    result[`$color-${name}`] = m[2];
  }
  return result;
}

// ─── token sources ───────────────────────────────────────────────────────────

// 1. CDS CSS Custom Properties — from the white (default) theme
const themesScss = readFile('node_modules/@carbon/themes/scss/generated/_themes.scss');
const cdsTokenValues = parseWhiteTheme(themesScss);
const cdsTokenNames = Object.keys(cdsTokenValues);

// Helper to filter CDS tokens by prefix stems
const cdsByStems = (...stems) =>
  cdsTokenNames.filter(t => stems.some(s => t.replace('--cds-', '').startsWith(s)));

const cdsValsByStems = (...stems) =>
  Object.fromEntries(cdsByStems(...stems).map(t => [t, cdsTokenValues[t]]));

// 2. Spacing
const spacingScss = readFile('node_modules/@carbon/layout/scss/generated/_spacing.scss');
const spacingVars = extractScssVars(spacingScss);

// 3. Layout
const layoutScss = readFile('node_modules/@carbon/layout/scss/generated/_layout.scss');
const layoutVars = extractScssVars(layoutScss);

// 4. Container
const containerScss = readFile('node_modules/@carbon/layout/scss/generated/_container.scss');
const containerVars = extractScssVars(containerScss);

// 5. Icon size
const iconSizeScss = readFile('node_modules/@carbon/layout/scss/generated/_icon-size.scss');
const iconSizeVars = extractScssVars(iconSizeScss);

// 6. Component size
const sizeScss = readFile('node_modules/@carbon/layout/scss/generated/_size.scss');
const sizeVars = extractScssVars(sizeScss);

// 7. Fluid spacing
const fluidSpacingScss = readFile('node_modules/@carbon/layout/scss/generated/_fluid-spacing.scss');
const fluidSpacingVars = extractScssVars(fluidSpacingScss);

// 8. Motion
const motionScss = readFile('node_modules/@carbon/motion/index.scss');
const motionVars = extractScssVars(motionScss);
const motionEasings = {
  '$motion-standard-productive': 'cubic-bezier(0.2, 0, 0.38, 0.9)',
  '$motion-standard-expressive': 'cubic-bezier(0.4, 0.14, 0.3, 1)',
  '$motion-entrance-productive': 'cubic-bezier(0, 0, 0.38, 0.9)',
  '$motion-entrance-expressive': 'cubic-bezier(0, 0, 0.3, 1)',
  '$motion-exit-productive': 'cubic-bezier(0.2, 0, 1, 0.9)',
  '$motion-exit-expressive': 'cubic-bezier(0.4, 0.14, 1, 1)',
};

// 9. Typography type styles
const typeStylesScss = readFile('node_modules/@carbon/type/scss/_styles.scss');
const typeStyleTokenNames = [];
const typeStyleRe = /^\$([a-zA-Z0-9_-]+)\s*:/gm;
let tsm;
while ((tsm = typeStyleRe.exec(typeStylesScss)) !== null) {
  const n = tsm[1];
  if (!n.startsWith('_') && !['use', 'forward', 'gridconfig'].includes(n)) {
    typeStyleTokenNames.push(`$${n}`);
  }
}

// 10. Font families & weights
const fontFamilyVars = {
  '$font-family-mono': "'IBM Plex Mono', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', monospace",
  '$font-family-sans': "'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-condensed': "'IBM Plex Sans Condensed', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-arabic': "'IBM Plex Sans Arabic', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-devanagari': "'IBM Plex Sans Devanagari', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-hebrew': "'IBM Plex Sans Hebrew', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-jp': "'IBM Plex Sans JP', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-kr': "'IBM Plex Sans KR', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-thai-looped': "'IBM Plex Sans Thai Looped', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-sans-thai': "'IBM Plex Sans Thai', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
  '$font-family-serif': "'IBM Plex Serif', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', serif",
};

const fontWeightVars = {
  '$font-weight-light': '300',
  '$font-weight-regular': '400',
  '$font-weight-semibold': '600',
};

// 11. Component tokens — button, notification, tag, content-switcher, status
const buttonTokens = parseComponentTokens(
  readFile('node_modules/@carbon/themes/scss/generated/_button-tokens.scss')
);
const notificationTokens = parseComponentTokens(
  readFile('node_modules/@carbon/themes/scss/generated/_notification-tokens.scss')
);
const tagTokens = parseComponentTokens(
  readFile('node_modules/@carbon/themes/scss/generated/_tag-tokens.scss')
);
const contentSwitcherTokens = parseComponentTokens(
  readFile('node_modules/@carbon/themes/scss/generated/_content-switcher-tokens.scss')
);
const statusTokens = parseComponentTokens(
  readFile('node_modules/@carbon/themes/scss/generated/_status-tokens.scss')
);

// 12. Color palette (raw IBM color scale: blue-60, cool-gray-10, etc.)
const colorPaletteVars = parseColorPalette(
  readFile('node_modules/@carbon/colors/es/index.js')
);

// 13. Grid breakpoints
const gridBreakpoints = {
  '$grid-breakpoint-sm': '20rem',        // 320px
  '$grid-breakpoint-md': '42rem',        // 672px
  '$grid-breakpoint-lg': '66rem',        // 1056px
  '$grid-breakpoint-xlg': '82rem',       // 1312px
  '$grid-breakpoint-max': '99rem',       // 1584px
  '$grid-gutter': '2rem',               // 32px
  '$grid-gutter-condensed': '0.0625rem', // 1px
  '$flex-grid-columns': '16',
};

// 14. Z-index utilities
const zIndexTokens = {
  '$z-index-dropdown': '9100',
  '$z-index-modal': '9000',
  '$z-index-header': '8000',
  '$z-index-overlay': '6000',
  '$z-index-floating': '6000',
  '$z-index-footer': '5000',
  '$z-index-hidden': '-1',
  '$z-index-overflow-hidden': '-1',
};

// 15. Layer utility classes (used on container elements to shift layer level)
const layerClasses = {
  '.cds--layer-one': 'Layer 1 — applies layer-01 tokens via CSS custom properties',
  '.cds--layer-two': 'Layer 2 — applies layer-02 tokens via CSS custom properties',
  '.cds--layer-three': 'Layer 3 — applies layer-03 tokens via CSS custom properties',
};

// 16. Type utility classes (.cds--type-*)
// Derived from font families, font weights, and type style names
const typeClassNames = [
  // font-family classes
  ...Object.keys(fontFamilyVars).map(k => `.cds--type-${k.replace('$font-family-', '')}`),
  // font-weight classes
  ...Object.keys(fontWeightVars).map(k => `.cds--type-${k.replace('$font-weight-', '')}`),
  '.cds--type-italic',
  // type style classes (e.g. .cds--type-body-01, .cds--type-heading-01, etc.)
  ...typeStyleTokenNames.map(t => `.cds--type-${t.replace('$', '')}`),
];
const typeClasses = Object.fromEntries(
  typeClassNames.map(cls => [cls, `CSS utility class — apply type style: ${cls}`])
);

// 17. Project custom CSS variables from app.scss
const projectCSSVars = extractCSSVars(readFile('src/styles/app.scss'));

// ─── build token groups ──────────────────────────────────────────────────────

const tokenGroups = [
  {
    name: 'color',
    tokens: cdsByStems(
      'background', 'border', 'field', 'focus', 'highlight',
      'icon', 'interactive', 'layer', 'link', 'overlay', 'shadow',
      'skeleton', 'support', 'text', 'toggle'
    ),
    tokenValues: cdsValsByStems(
      'background', 'border', 'field', 'focus', 'highlight',
      'icon', 'interactive', 'layer', 'link', 'overlay', 'shadow',
      'skeleton', 'support', 'text', 'toggle'
    ),
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_themes.scss',
      'node_modules/@carbon/themes/scss/generated/_tokens.scss',
    ],
  },
  {
    name: 'color-palette',
    tokens: Object.keys(colorPaletteVars),
    tokenValues: colorPaletteVars,
    relevantFiles: [
      'node_modules/@carbon/colors/es/index.js',
    ],
  },
  {
    name: 'ai',
    tokens: cdsByStems('ai-'),
    tokenValues: cdsValsByStems('ai-'),
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_themes.scss',
    ],
  },
  {
    name: 'chat',
    tokens: cdsByStems('chat-'),
    tokenValues: cdsValsByStems('chat-'),
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_themes.scss',
    ],
  },
  {
    name: 'syntax',
    tokens: cdsByStems('syntax-'),
    tokenValues: cdsValsByStems('syntax-'),
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_themes.scss',
    ],
  },
  {
    name: 'spacing',
    tokens: Object.keys(spacingVars),
    tokenValues: spacingVars,
    relevantFiles: [
      'node_modules/@carbon/layout/scss/generated/_spacing.scss',
    ],
  },
  {
    name: 'layout',
    tokens: Object.keys(layoutVars),
    tokenValues: layoutVars,
    relevantFiles: [
      'node_modules/@carbon/layout/scss/generated/_layout.scss',
    ],
  },
  {
    name: 'container',
    tokens: Object.keys(containerVars),
    tokenValues: containerVars,
    relevantFiles: [
      'node_modules/@carbon/layout/scss/generated/_container.scss',
    ],
  },
  {
    name: 'icon-size',
    tokens: Object.keys(iconSizeVars),
    tokenValues: iconSizeVars,
    relevantFiles: [
      'node_modules/@carbon/layout/scss/generated/_icon-size.scss',
    ],
  },
  {
    name: 'component-size',
    tokens: Object.keys(sizeVars),
    tokenValues: sizeVars,
    relevantFiles: [
      'node_modules/@carbon/layout/scss/generated/_size.scss',
    ],
  },
  {
    name: 'fluid-spacing',
    tokens: Object.keys(fluidSpacingVars),
    tokenValues: fluidSpacingVars,
    relevantFiles: [
      'node_modules/@carbon/layout/scss/generated/_fluid-spacing.scss',
    ],
  },
  {
    name: 'grid',
    tokens: Object.keys(gridBreakpoints),
    tokenValues: gridBreakpoints,
    relevantFiles: [
      'node_modules/@carbon/grid/scss/_config.scss',
    ],
  },
  {
    name: 'motion',
    tokens: [...Object.keys(motionVars), ...Object.keys(motionEasings)],
    tokenValues: { ...motionVars, ...motionEasings },
    relevantFiles: [
      'node_modules/@carbon/motion/index.scss',
    ],
  },
  {
    name: 'typography',
    tokens: [
      ...typeStyleTokenNames,
      ...Object.keys(fontFamilyVars),
      ...Object.keys(fontWeightVars),
    ],
    tokenValues: {
      ...Object.fromEntries(typeStyleTokenNames.map(t => [t, 'SCSS map — use @include type.type-style(token-name)'])),
      ...fontFamilyVars,
      ...fontWeightVars,
    },
    relevantFiles: [
      'node_modules/@carbon/type/scss/_styles.scss',
      'node_modules/@carbon/type/scss/_font-family.scss',
    ],
  },
  {
    name: 'typography-classes',
    tokens: Object.keys(typeClasses),
    tokenValues: typeClasses,
    relevantFiles: [
      'node_modules/@carbon/type/scss/_classes.scss',
    ],
  },
  {
    name: 'layer',
    tokens: Object.keys(layerClasses),
    tokenValues: layerClasses,
    relevantFiles: [
      'node_modules/@carbon/styles/scss/_layer.scss',
      'node_modules/@carbon/styles/scss/layer/_layer-sets.scss',
    ],
  },
  {
    name: 'elevation',
    tokens: Object.keys(zIndexTokens),
    tokenValues: zIndexTokens,
    relevantFiles: [
      'node_modules/@carbon/styles/scss/utilities/_z-index.scss',
    ],
  },
  {
    name: 'button',
    tokens: Object.keys(buttonTokens),
    tokenValues: buttonTokens,
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_button-tokens.scss',
    ],
  },
  {
    name: 'notification',
    tokens: Object.keys(notificationTokens),
    tokenValues: notificationTokens,
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_notification-tokens.scss',
    ],
  },
  {
    name: 'tag',
    tokens: Object.keys(tagTokens),
    tokenValues: tagTokens,
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_tag-tokens.scss',
    ],
  },
  {
    name: 'content-switcher',
    tokens: Object.keys(contentSwitcherTokens),
    tokenValues: contentSwitcherTokens,
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_content-switcher-tokens.scss',
    ],
  },
  {
    name: 'status',
    tokens: Object.keys(statusTokens),
    tokenValues: statusTokens,
    relevantFiles: [
      'node_modules/@carbon/themes/scss/generated/_status-tokens.scss',
    ],
  },
  {
    name: 'custom',
    tokens: Object.keys(projectCSSVars),
    tokenValues: projectCSSVars,
    relevantFiles: [
      'src/styles/app.scss',
    ],
  },
];

// ─── write output ────────────────────────────────────────────────────────────

const output = { tokenGroups };
const outPath = path.join(__dirname, 'tokens.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Wrote ${outPath}`);
const total = tokenGroups.reduce((s, g) => s + g.tokens.length, 0);
tokenGroups.forEach(g => {
  console.log(`  [${g.name}] ${g.tokens.length} tokens`);
});
console.log(`Total: ${total} tokens across ${tokenGroups.length} groups`);

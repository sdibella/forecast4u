#!/usr/bin/env node
/**
 * Collects all icon names from @carbon/icons-react and writes icons.json
 */

import { readdirSync, writeFileSync } from 'fs';
import { resolve, basename } from 'path';

const libDir = resolve('node_modules/@carbon/icons-react/lib');

const excluded = new Set([
  'index.js',
  'Icon.js',
  'iconPropTypes-BoFFIf2P.js',
]);

const files = readdirSync(libDir).filter(
  (f) => f.endsWith('.js') && !excluded.has(f) && !f.startsWith('iconPropTypes')
);

const icons = files
  .map((f) => basename(f, '.js'))
  .filter((name) => /^[A-Z4]/.test(name)) // only component names (PascalCase or 4K*)
  .sort();

const usage = `# IBM Carbon Icons (@carbon/icons-react)

## Installation

Carbon icons are bundled with \`@carbon/icons-react\`, which is already a dependency of \`@carbon/react\`.

## Import

Each icon is a named export from \`@carbon/icons-react\`:

\`\`\`jsx
import { Add, TrashCan, Settings, ChevronDown } from '@carbon/icons-react';
\`\`\`

## Basic usage

\`\`\`jsx
import { Add } from '@carbon/icons-react';

function Example() {
  return <Add size={16} />;
}
\`\`\`

## Size variants

Carbon icons support four standard sizes via the \`size\` prop:

| size | pixels |
|------|--------|
| 16   | 16×16 (default) |
| 20   | 20×20 |
| 24   | 24×24 |
| 32   | 32×32 |

\`\`\`jsx
import { CloudUpload } from '@carbon/icons-react';

<CloudUpload size={16} />
<CloudUpload size={20} />
<CloudUpload size={24} />
<CloudUpload size={32} />
\`\`\`

## Style variants (name suffixes)

Carbon does **not** use outline / round / sharp / two-tone variant systems.
Instead, alternate styles are separate named exports with descriptive suffixes:

| Suffix      | Meaning                              | Example                  |
|-------------|--------------------------------------|--------------------------|
| *(none)*    | Default/standard glyph               | \`Add\`                  |
| \`Filled\`  | Solid filled version                 | \`AddFilled\`            |
| \`Alt\`     | Alternative design of the same icon  | \`AddAlt\`               |
| \`Outline\` | Outline/stroke-only version          | \`BpmnErrorOutline\`     |

\`\`\`jsx
import { Bookmark, BookmarkFilled, AddAlt } from '@carbon/icons-react';

<Bookmark size={24} />       {/* default */}
<BookmarkFilled size={24} /> {/* filled variant */}
<AddAlt size={24} />         {/* alternative design */}
\`\`\`

## Accessibility

Pass an \`aria-label\` (or wrap with a visually hidden label) when the icon conveys meaning:

\`\`\`jsx
import { TrashCan } from '@carbon/icons-react';

<button aria-label="Delete item">
  <TrashCan size={16} />
</button>

{/* or use the built-in title slot */}
<TrashCan size={16}>
  <title>Delete item</title>
</TrashCan>
\`\`\`

## Passing extra props

Icons are \`forwardRef\` React components and accept any SVG attribute:

\`\`\`jsx
import { Settings } from '@carbon/icons-react';

<Settings size={24} className="spin-icon" style={{ color: 'var(--cds-icon-primary)' }} />
\`\`\`
`;

const output = { icons, usage };

writeFileSync(
  resolve('.icon_discovery_staging/icons.json'),
  JSON.stringify(output, null, 2)
);

console.log(`Done. ${icons.length} icons written to .icon_discovery_staging/icons.json`);

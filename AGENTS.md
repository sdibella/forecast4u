# AGENTS.md — Forecast4U

## Project overview
A React + Vite weather forecast prototype using IBM Carbon Design System and Builder.io.
Route `/weather/:zip` shows a 5-day forecast with 3-hour intervals fetched from Open-Meteo.
The app is registered with Builder.io for visual editing — IBM Carbon components and custom
Forecast4U components are indexed and available in the drag-and-drop editor.

## Dev environment

- Start dev server: `npm run dev` (http://localhost:5173)
- Or with Docker: `docker compose up dev`
- Build: `npm run build`
- Preview production build: `npm run preview`
- Storybook: `cd storybook && npm run storybook` (http://localhost:6006)

## Testing instructions

- Run all tests: `npm test`
- Run with coverage: `npm run test:coverage`
- Run a single test: `npx vitest run -t "<test name>"`
- Fix any failing tests before committing — the full suite must be green.
- **Add or update tests for every code change, even if nobody asked.**
- Place test files alongside the source file: `utils/foo.js` → `utils/foo.test.js`, `components/Bar.jsx` → `components/Bar.test.jsx`
- Use `describe` / `it` / `expect` from `vitest`.
- Use `render` / `screen` / `fireEvent` / `userEvent` from `@testing-library/react`.
- Mock all external API calls (Open-Meteo, geocoding, Builder.io) with `vi.fn()` — never make real network requests in tests.
- Always test both the happy path and error/edge cases.
- Aim for meaningful assertions, not just "it renders without crashing".

### Test file template
```js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(<MyComponent />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });

  it('handles error state', () => {
    render(<MyComponent error="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
```

## Code conventions

- Functional components with hooks only — no class components.
- Named exports for utilities and hooks; default exports for page and component files.
- JSDoc comments on all exported functions and components.
- Descriptive variable names — no single-letter abbreviations outside of loop indices.
- Use Carbon design tokens (`var(--cds-*)`) for all colors, spacing, and typography — never hardcode hex values.
- Use the Carbon `<Grid>` / `<Column>` system for all layouts.
- Support both `white` (light) and `g100` (dark) Carbon themes — test UI in both.

## Design system

- **Package**: `@carbon/react`
- **Indexed name**: `IBM Carbon` (registered in `builder.config.json`)
- Import components from `@carbon/react` and icons from `@carbon/react/icons`.
- When generating new UI, prefer Carbon primitives (`Tile`, `Button`, `DataTable`, etc.) over custom HTML.
- New components should be registered in `src/components/builder-registry.js` so they appear in the Builder.io visual editor.

## File structure

```
src/
  components/
    builder-registry.js   ← register new components here
    weather/              ← weather display components + tests
    layout/               ← AppHeader etc.
    common/               ← shared/skeleton components
  pages/                  ← route-level components
  hooks/                  ← custom React hooks
  utils/                  ← API clients, helpers (each has a .test.js)
  styles/                 ← global SCSS
storybook/                ← standalone Storybook app
AGENTS.md                 ← this file
builder.config.json       ← Builder.io design system config
.builder/rules/           ← scoped AI rules
.builderrules             ← root-level AI rules
```

## PR checklist

- `npm run test` passes with no failures.
- `npm run build` completes without errors.
- New components are registered in `builder-registry.js`.
- Test files exist for any new utilities or components.

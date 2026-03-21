# Testing Rules

Applies to: all files in `src/`

## Mandatory — every code change requires tests

When you add or modify any file in `src/`, you MUST create or update the corresponding test file.
Do this automatically — do not wait to be asked.

- `src/utils/foo.js` → `src/utils/foo.test.js`
- `src/hooks/useBar.js` → `src/hooks/useBar.test.js`
- `src/components/Baz.jsx` → `src/components/Baz.test.jsx`

## Test setup

- Framework: Vitest (`import { describe, it, expect, vi } from 'vitest'`)
- DOM: jsdom (configured in `vite.config.js`)
- Components: `@testing-library/react` (`render`, `screen`, `fireEvent`, `userEvent`)
- Matchers: `@testing-library/jest-dom` (configured in `src/test-setup.js`)

## What to test

For **utility functions**: test every exported function with at least one happy path and one error/edge case.
For **hooks**: test state transitions, loading states, and error states.
For **components**: test that the component renders expected content, handles props correctly, and shows error states.

## Mocking

Always mock external calls in tests:
```js
// Mock fetch (Open-Meteo API, geocoding)
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ /* mock data */ }),
});

// Mock Builder.io
vi.mock('@builder.io/react', () => ({
  builder: { get: vi.fn().mockReturnValue({ promise: () => Promise.resolve(null) }) },
  BuilderComponent: () => null,
}));
```

## Running tests
```bash
npm test                    # watch mode
npm run test:coverage       # coverage report
npx vitest run -t "name"    # single test
```

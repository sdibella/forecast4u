# Forecast4U - Agent Instructions

## Project Overview
This is a React + Vite weather forecast application built with IBM Carbon Design System and Builder.io visual CMS. It displays 5-day weather forecasts with 3-hour increments for US ZIP codes.

## Tech Stack
- **Framework**: React 18 + Vite
- **Design System**: IBM Carbon (`@carbon/react`)
- **CMS**: Builder.io (`@builder.io/react`)
- **Charts**: Recharts
- **Testing**: Vitest + React Testing Library
- **Styling**: SCSS with Carbon tokens

## Code Conventions
- Functional components with hooks
- Named exports for utilities, default exports for components
- JSDoc comments on all exported functions
- Descriptive variable names, no abbreviations

## Testing Requirements

**IMPORTANT: Every code change MUST include unit tests.**

When generating or modifying code:
1. **Always** create or update corresponding `.test.js` files
2. Place test files alongside the source file (e.g., `utils/foo.js` → `utils/foo.test.js`)
3. Use Vitest (`describe`, `it`, `expect`) and React Testing Library (`render`, `screen`, `fireEvent`)
4. Test files should import from `vitest` and `@testing-library/react`
5. Mock external API calls with `vi.fn()` and `vi.mock()`
6. Aim for meaningful assertions, not just snapshot tests
7. Test both happy paths and error cases

### Test patterns to follow:
```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('renders correctly with default props', () => {
    render(<Component />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });

  it('handles error state', () => {
    render(<Component error="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
```

### Running tests:
```bash
npm test          # Watch mode
npm run test:coverage  # Coverage report
```

## File Structure
- `src/components/` - React components organized by feature
- `src/pages/` - Route-level page components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions and API clients
- `src/styles/` - Global SCSS styles
- `src/components/builder-registry.js` - Builder.io component registration

## API Integration
- Weather data: Open-Meteo API (free, no key required)
- Geocoding: Open-Meteo Geocoding API
- CMS content: Builder.io Content API

## Design System
- Use IBM Carbon components from `@carbon/react`
- Use Carbon color tokens (e.g., `var(--cds-text-primary)`)
- Support both light (`white`) and dark (`g100`) themes
- Follow Carbon grid system for responsive layouts

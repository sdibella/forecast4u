# Forecast4U

A proof-of-value weather forecast prototype built with **React + Vite**, **Builder.io Fusion**, and **IBM Carbon Design System** for Forecast4U.

## Live Demo

- **Prototype**: [https://forecast4u-5yp76jop5-sdibellas-projects.vercel.app/](https://forecast4u-5yp76jop5-sdibellas-projects.vercel.app/)
- **Builder.io Project**: [https://builder.io/app/projects/ec5110b995004210956d69c2809e11ac](https://builder.io/app/projects/ec5110b995004210956d69c2809e11ac)

## Features

- **5-Day Forecast** with 3-hour interval detail for any US ZIP code
- **Interactive Charts** — temperature + precipitation visualization via Recharts
- **IBM Carbon Design System** — fully themed UI with light/dark mode
- **Builder.io Fusion** — AI visual development with indexed Carbon design system and enforced coding standards
- **Geolocation** — auto-detect user's location
- **Saved Locations** — recent searches persisted locally
- **Responsive Design** — mobile-first layout using Carbon Grid
- **Unit Tests** — Vitest + React Testing Library with auto-testing via AGENTS.md
- **Storybook** — IBM Carbon component library with Forecast4U brand reskin

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Design System | IBM Carbon (`@carbon/react`) |
| Visual Development | Builder.io Fusion (`@builder.io/react`) |
| Weather API | [Open-Meteo](https://open-meteo.com/) (free, no key required) |
| Charts | Recharts |
| Testing | Vitest + React Testing Library |
| Component Docs | Storybook 8 |
| Deployment | Vercel |

## Quick Start

### Option A: Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
git clone https://github.com/sdibella/forecast4u.git
cd forecast4u
cp .env.example .env
# Edit .env and add your Builder.io public API key
```

**Development server with hot-reload:**
```bash
docker compose up dev
```
Open [http://localhost:5173](http://localhost:5173)

**Production build preview (nginx):**
```bash
docker compose up prod
```
Open [http://localhost:8080](http://localhost:8080)

**Storybook:**
```bash
docker compose up storybook
```
Open [http://localhost:6006](http://localhost:6006)

**Run tests inside the container:**
```bash
docker compose run --rm dev npm test
docker compose run --rm dev npm run test:coverage
```

---

### Option B: Local Node.js

### Prerequisites

- Node.js 20+
- npm 9+

### 1. Clone & Install

```bash
git clone https://github.com/sdibella/forecast4u.git
cd forecast4u
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your Builder.io public API key:
# VITE_BUILDER_API_KEY=your_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Tests

```bash
npm test              # Watch mode
npm run test:coverage # Coverage report
```

### 5. Build for Production

```bash
npm run build
npm run preview       # Preview production build locally
```

## Storybook (Design System)

The `storybook/` subdirectory contains a standalone Storybook application showcasing IBM Carbon components, including a Forecast4U brand reskin.

```bash
cd storybook
npm install
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to browse the component library.

### Included Stories

- **Button** — all variants, sizes, icon configurations
- **Text Input** — text, number, password, search, textarea
- **Tile** — default, clickable, selectable, expandable
- **DataTable** — sortable forecast table with toolbar search
- **Notification** — inline, toast, actionable alerts
- **Navigation** — header, breadcrumbs, tabs
- **Toggle** — dark mode, settings panel patterns
- **Design System / Brand Reskin** — Forecast4U brand theme vs. IBM Carbon default, token override reference

## Project Structure

```
forecast4u/
├── src/
│   ├── components/
│   │   ├── builder-registry.js    # Components registered with Builder.io visual editor
│   │   ├── weather/               # Weather display components
│   │   ├── layout/                # App shell (header, etc.)
│   │   └── common/                # Shared components (skeletons, etc.)
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing page with search
│   │   └── WeatherPage.jsx        # /weather/:zip forecast page
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # API clients, helpers, weather codes
│   └── styles/                    # Global SCSS
├── storybook/                     # Storybook application (subdirectory)
│   ├── .storybook/                # Storybook config
│   ├── src/stories/               # Component stories
│   └── src/themes/                # Forecast4U brand token overrides
├── .builder/rules/                # Builder.io Fusion scoped AI coding rules
├── .builderrules                  # Root-level Builder.io AI rules
├── builder.config.json            # Builder.io design system config
├── AGENTS.md                      # Builder.io agent auto-testing config
├── vercel.json                    # Vercel SPA routing config
└── vite.config.js                 # Vite + Vitest config
```

## Route Structure

| Route | Description |
|-------|-------------|
| `/` | Home page with ZIP search, geolocation, saved locations |
| `/weather/:zip` | 5-day forecast for a given ZIP code |

## Builder.io Fusion Integration

### What is Builder.io Fusion?

Builder.io Fusion is an AI-powered visual development platform that connects directly to your codebase. Unlike a traditional CMS, Fusion doesn't manage runtime content — it accelerates development by giving teams a visual editor that understands your actual components, coding conventions, and design system.

The core problem it solves: **the design-to-code handoff**. Designers work in Figma. Developers translate those designs by hand. Builder.io Fusion eliminates that translation layer.

### Why it matters for Forecast4U

| What was configured | What it enables for the team |
|---|---|
| `builder.config.json` — IBM Carbon indexed as design system | The AI generates code using Carbon components, not raw HTML — design system compliance is automatic |
| `.builderrules` + `.builder/rules/` — scoped AI coding rules | Every AI-generated change follows Forecast4U's conventions: Carbon tokens only, no hardcoded hex, components registered in the editor |
| `AGENTS.md` — auto-testing rules | Every code change the AI makes automatically includes tests — no one has to ask |
| GitHub Actions `builder-index.yml` — auto-indexes on push to `main` | The design system index stays current automatically; the visual editor always reflects the real deployed component set |
| `builder-registry.js` — components registered with typed inputs | Developers define the component API; the visual editor exposes those components to designers and AI with validated prop schemas |

### Opening the Visual Editor

To use Builder.io Fusion's visual editor against the local development server:

```bash
npm run dev   # Start the dev server first

# In a second terminal:
npx "@builder.io/dev-tools@latest" launch -c "npm run dev"
```

This opens the Builder.io visual editor connected to the running app. The indexed IBM Carbon design system is available in the component panel. Changes made in the visual editor produce code — not runtime CMS content.

### Design System Governance

The `.github/workflows/builder-index.yml` workflow runs `npx @builder.io/dev-tools index-repo` on every push to `main` that touches `src/components/`. The registry is always current — the visual editor and AI always work from the real, deployed component set.

```yaml
- name: Index IBM Carbon design system into Builder.io
  run: |
    npx "@builder.io/dev-tools@latest" index-repo \
      --designSystemPackage @carbon/react \
      --designSystemName "IBM Carbon"
```

### Registered Components

Components available in the Builder.io visual editor:

**IBM Carbon:**
Button, Text Input, Search, Tile, Clickable Tile, Tag, Notification, Toggle, Link

**Forecast4U Custom:**
Current Conditions, Daily Forecast Card, Forecast Chart, Hourly Detail Table

## Design Decisions

- **Open-Meteo API**: Chosen for its rich hourly data (16 days), zero-config setup (no API key), and generous rate limits — ideal for demos.
- **Carbon Design System**: Requested by the Forecast4U product team. Supports native theming for light/dark mode with minimal custom CSS. Indexed into Builder.io so AI-generated code stays on-brand automatically.
- **Recharts**: Lightweight, declarative charting that composes naturally with React and Carbon's design tokens.
- **Client-side geocoding**: ZIP-to-coordinates conversion happens client-side via Open-Meteo's geocoding API, keeping the architecture simple (no server needed).
- **Builder.io Fusion over Publish**: This prototype uses Fusion (visual development + AI code generation) rather than Publish (headless CMS). Fusion is the right fit for a dev team looking to accelerate feature development while enforcing design system consistency.

## Deployment

### Vercel (via GitHub Integration)

1. Push to GitHub
2. Connect the repo in Vercel dashboard
3. Set environment variable: `VITE_BUILDER_API_KEY`
4. Deploy — Vercel auto-detects Vite and configures the build

The `vercel.json` file handles SPA routing (all paths rewrite to `index.html`).

## License

Private — built for the Builder.io Sales Engineer Technical Challenge.

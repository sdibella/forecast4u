# Forecast4U

A proof-of-value weather forecast prototype built with **React + Vite**, **Builder.io**, and **IBM Carbon Design System** for Forecast4U.

## Live Demo

- **Prototype**: [https://forecast4u-5yp76jop5-sdibellas-projects.vercel.app/](https://forecast4u-5yp76jop5-sdibellas-projects.vercel.app/)
- **Builder.io Project**: [https://builder.io/app/projects/ec5110b995004210956d69c2809e11ac](https://builder.io/app/projects/ec5110b995004210956d69c2809e11ac)

## Features

- **5-Day Forecast** with 3-hour interval detail for any US ZIP code
- **Interactive Charts** — temperature + precipitation visualization via Recharts
- **IBM Carbon Design System** — fully themed UI with light/dark mode
- **Builder.io Visual CMS** — registered Carbon + custom components for drag-and-drop editing
- **Geolocation** — auto-detect user's location
- **Saved Locations** — recent searches persisted locally
- **Responsive Design** — mobile-first layout using Carbon Grid
- **Unit Tests** — Vitest + React Testing Library with auto-testing via AGENTS.md
- **Storybook** — IBM Carbon component library for the design team

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Design System | IBM Carbon (`@carbon/react`) |
| CMS | Builder.io (`@builder.io/react`) |
| Weather API | [Open-Meteo](https://open-meteo.com/) (free, no key required) |
| Charts | Recharts |
| Testing | Vitest + React Testing Library |
| Component Docs | Storybook 8 |
| Deployment | Vercel |

## Quick Start

### Option A: Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
git clone https://github.com/YOUR_USERNAME/forecast4u.git
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
git clone https://github.com/YOUR_USERNAME/forecast4u.git
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

The `storybook/` subdirectory contains a standalone Storybook application showcasing IBM Carbon components.

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

## Project Structure

```
forecast4u/
├── src/
│   ├── components/
│   │   ├── builder-registry.js    # Builder.io component registration
│   │   ├── weather/               # Weather display components
│   │   ├── layout/                # App shell (header, etc.)
│   │   └── common/                # Shared components (skeletons, etc.)
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing page with search
│   │   ├── WeatherPage.jsx        # /weather/:zip forecast page
│   │   └── CatchAllPage.jsx       # Builder.io managed pages
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # API clients, helpers, weather codes
│   └── styles/                    # Global SCSS
├── storybook/                     # Storybook application (subdirectory)
│   ├── .storybook/                # Storybook config
│   └── src/stories/               # Component stories
├── AGENTS.md                      # Builder.io agent auto-testing config
├── vercel.json                    # Vercel SPA routing config
└── vite.config.js                 # Vite + Vitest config
```

## Route Structure

| Route | Description |
|-------|-------------|
| `/` | Home page with ZIP search, geolocation, saved locations |
| `/weather/:zip` | 5-day forecast for a given ZIP code |
| `/*` | Builder.io managed catch-all pages |

## Builder.io Integration

### Why Builder.io?

Builder.io solves the **developer bottleneck problem** in content-driven applications. Without it, every headline change, campaign banner, or page variant requires a developer ticket, a sprint, and a deploy. With Builder.io, non-developers can publish directly using registered, governed components — while developers focus on core product logic.

| What was built | What it enables for the buyer |
|---|---|
| Carbon components registered in Builder | Marketing updates copy, CTAs, and layout without filing a JIRA ticket |
| `AGENTS.md` auto-testing rules | Dev team gets test coverage on every change without altering their PR process |
| GitHub Actions design system indexing | Design system governance is automatic — Carbon components stay in sync with the codebase on every push |
| `CatchAllPage` Builder catch-all route | Content team launches new landing pages without a code deploy |
| `weather-page` model on `/weather/:zip` | Marketers can overlay contextual banners, alerts, or promotions on any forecast page — no engineering required |

### The Dev/Non-Dev Contract

Developers register components with typed, validated `inputs`. Non-developers compose pages from those components in the visual editor. The contract prevents brand drift and protects the codebase while removing the content bottleneck.

### Registered Components

Custom components available in the Builder.io visual editor:

**IBM Carbon:**
Button, Text Input, Search, Tile, Clickable Tile, Tag, Notification, Toggle, Link

**Forecast4U Custom:**
Current Conditions, Daily Forecast Card, Forecast Chart, Hourly Detail Table

### Auto-Testing

The `AGENTS.md` file configures Builder.io's agent to automatically generate unit tests for any code changes, ensuring test coverage is maintained across the project.

### Design System Indexing

The `.github/workflows/builder-index.yml` workflow runs `npx @builder.io/dev-tools index-repo` on every push to `main` that touches `src/components/`. This keeps the IBM Carbon component library visible and current in the Builder.io visual editor — designers always work from the real, deployed component set, not a stale snapshot.

## Design Decisions

- **Open-Meteo API**: Chosen for its rich hourly data (16 days), zero-config setup (no API key), and generous rate limits — ideal for demos.
- **Carbon Design System**: Requested by the Forecast4U product team. Supports native theming for light/dark mode with minimal custom CSS.
- **Recharts**: Lightweight, declarative charting that composes naturally with React and Carbon's design tokens.
- **Client-side geocoding**: ZIP-to-coordinates conversion happens client-side via Open-Meteo's geocoding API, keeping the architecture simple (no server needed).

## Deployment

### Vercel (via GitHub Integration)

1. Push to GitHub
2. Connect the repo in Vercel dashboard
3. Set environment variable: `VITE_BUILDER_API_KEY`
4. Deploy — Vercel auto-detects Vite and configures the build

The `vercel.json` file handles SPA routing (all paths rewrite to `index.html`).

## License

Private — built for the Builder.io Sales Engineer Technical Challenge.

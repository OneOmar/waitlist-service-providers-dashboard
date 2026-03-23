# Waitlist Service Providers Dashboard

A single-page admin dashboard for reviewing waitlist signups. It presents a responsive layout with filters, search, pagination, and a detail modal to onboard or reject entries. **Data is mock-only** for local development; there is no backend API in this repository.

## Features

- **Admin shell** — Header, collapsible sidebar (filters), and main content area with mobile-friendly overlay behavior
- **Waitlist table** — Columns for contact details, location, vendor type, service offering, signup date, and status
- **Search** — Client-side text search across relevant fields
- **Sidebar filters** — Postcode, status (Onboarded / Rejected), date range, vendor type (Independent / Company), and service offerings; filters apply when the user confirms them in the panel
- **Pagination** — Fixed page size with page navigation
- **User details modal** — View full row details; actions to mark a row as **Onboarded** or **Rejected** (updates local state only)
- **Record type tabs** — UI toggle between “Service Providers” and “Customers” (used in the detail modal; list data is shared mock data)

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | Lucide React |
| Class names | `clsx` + `tailwind-merge` (via `cn()` helper) |
| Lint | ESLint 9 (flat config) |

## Prerequisites

- [Node.js](https://nodejs.org/) **18.x or newer** (20+ recommended for tooling compatibility)

## Setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone <repository-url>
   cd waitlist-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL printed in the terminal (typically `http://localhost:5173`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run build` | Type-check (`tsc -b`) and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally for smoke-testing |
| `npm run lint` | Run ESLint on the project |

## Project structure

```text
waitlist-dashboard/
├── public/                 # Static assets (e.g. icons)
├── src/
│   ├── components/
│   │   ├── layout/         # AdminLayout, header, sidebar, layout context
│   │   ├── ui/             # Reusable primitives (Button, Table, Modal, etc.)
│   │   └── waitlist/       # Waitlist-specific UI (table, empty state, detail modal)
│   ├── context/            # WaitlistFiltersContext (draft vs applied filters)
│   ├── data/               # Mock waitlist rows and page size constant
│   ├── pages/              # Route-level pages (WaitlistPage)
│   ├── styles/             # Design tokens (CSS variables)
│   ├── types/              # TypeScript types for waitlist rows and filters
│   ├── utils/              # Filtering helpers, `cn()` utility
│   ├── App.tsx             # Root layout + Waitlist page
│   ├── main.tsx            # React entry
│   └── index.css           # Global styles / Tailwind entry
├── index.html              # HTML shell and document title
├── vite.config.ts          # Vite + React + Tailwind; `@` → `./src`
├── tsconfig*.json          # TypeScript project references
└── eslint.config.js        # ESLint flat config
```

## Usage

### Development

- Use the **search** field to narrow rows; clearing search or adjusting filters shows how empty states behave when no rows match.
- Open the **sidebar** (desktop: always visible; small screens: use the header control) to set **draft** filters, then apply them to update the table.
- Click a row’s action to open **User details**; **Onboard** / **Reject** only change in-memory state for the current session.

### Path alias

Imports use the `@/` alias mapped to `src/` (see `vite.config.ts` and `tsconfig.app.json`).

### Replacing mock data

Waitlist rows are defined in `src/data/waitlist-mock.ts`. To connect a real API later, replace or wrap this module and keep the types in `src/types/waitlist.ts` aligned with your payloads.

### Production build

```bash
npm run build
```

Output is written to `dist/`. Deploy `dist/` to any static host or CDN. For a quick local check:

```bash
npm run preview
```
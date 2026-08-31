# DYUTI 2027

The official web platform for **DYUTI 2027**, the 26th Annual International Academic Conference hosted by the  an institution.

---

## Overview

DYUTI (Developmental Yearnings for a United and Transformed India — meaning *"Spark of Life"*) is a prestigious annual international symposium convened continuously since 1998. The 2027 edition focuses on **"Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership"**, bringing together global scholars, researchers, development practitioners, and policy leaders aligned with the United Nations 2030 Agenda for Sustainable Development.

This web application serves as the primary delegate portal, managing academic calls for papers, track explorations, registration advisories, hotel bookings, route navigation, historical conference archives, and direct secretariat inquiries.

---

## Features

- **Single Page Application (SPA)**: Ultra-fast client-side navigation with scroll restoration.
- **Responsive & Mobile-First Design**: Optimized across mobile (390px, 430px), tablet (768px, 1024px), and desktop (1280px, 1920px) screens.
- **Conference Meta & Editorial Information**: Comprehensive details on institutional rankings.
- **Call for Papers & Guidelines**: Full submission criteria for Oral and Poster presentations, Scopus publication opportunities, and direct integration with Microsoft CMT.
- **Registration Hub**: Clear fee structures, inclusion terms, and NEFT/RTGS bank transfer details.
- **Accommodation & Hospitality Directory**: Curated stay zones (Kalamassery, Edappally, Kakkanad) with downloadable PDF contact directories.
- **Travel & Interactive Venue Directions**: Detailed transit routes from Cochin International Airport (COK) and Ernakulam South Railway Station with embedded Google Maps.
- **Regional Attractions**: Sights and tourist destinations around Kochi and Kerala with verified external guides.
- **Historical Photo Gallery & Lightbox**: Interactive retrospective gallery spanning 25+ conference editions with filtering controls and an accessible image lightbox viewer.
- **Secretariat Inquiry Desk**: Interactive contact form with client validation and graceful API fallback.
- **Interactive Program Schedule**: Filterable conference schedule tabs for Day 1 and Day 2.
- **Theme Accordion**: Expandable view for all 8 conference sub-themes and research topic tracks.

---

## Tech Stack

- **Core Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom typography & design system tokens
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility Helpers**: `clsx` & `tailwind-merge`

---

## Project Structure

```
sample website/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── cards/         # Reusable card components (DestinationCard, StatCard, ThemeCard)
│   │   ├── layout/        # Shell layout components (Header, Footer, AnnouncementBar, Layout)
│   │   ├── sections/      # Homepage & landing sections (HeroEditorial, ScheduleSection, etc.)
│   │   └── ui/            # Shared UI components (Accordion, Button, Lightbox, PageHeader, etc.)
│   ├── data/
│   │   └── conference.ts  # Official  data models, stats, tracks, & links
│   ├── lib/
│   │   ├── api.ts         # Contact form API service layer & fallback handling
│   │   └── utils.ts       # Tailwind class mergers and helper utilities
│   ├── pages/             # Primary route components (Home, Rajagiri, CallForPapers, etc.)
│   ├── styles/
│   │   └── index.css      # Core Tailwind layers, keyframes, scrollbar, & reduced motion rules
│   ├── App.tsx            # Main router configuration and scroll-to-top component
│   └── main.tsx           # React DOM entry point
├── .env.example           # Environment configuration template
├── .gitignore             # Git exclusion rules
├── index.html             # Main HTML entry with SEO, Open Graph, & font preconnects
├── package.json           # Node dependencies and npm scripts
├── tailwind.config.js     # Extended color palette, fonts, shadows, and radii
└── vite.config.ts         # Vite bundler configuration
```

---

## Installation

Ensure you have Node.js (v18 or higher) installed. Clone the repository and install dependencies:

```bash
npm install
```

---

## Development

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## Production Build

To compile the production-ready build:

```bash
npm run build
```

This executes `tsc` for static type checking followed by `vite build` to output optimized assets into the `dist/` directory.

---

## Preview

To locally preview the built production site:

```bash
npm run preview
```

---

## Routes

| Primary Route | Aliases / Short Paths | Description |
| :--- | :--- | :--- |
| `/` | `/home` | Main Editorial Homepage & Overview |
| `/rajagiri` | `/about` | Host Institution Profile & Rankings |
| `/call_for_papers` | `/call-for-papers`, `/callforpapers`, `/cfp` | Submission Guidelines & CMT Link |
| `/accomodation` | `/accommodation`, `/hotels`, `/stay` | Delegate Hotels & Accommodation PDF |
| `/attractions` | `/kochi`, `/sights`, `/explore` | Kochi Sightseeing & Tourism Links |
| `/travel` | `/venue`, `/directions`, `/location` | Transit Directions & Interactive Maps |
| `/gallery` | `/photos`, `/archive` | Historical Conference Archive & Lightbox |
| `/contactus` | `/contact`, `/secretariat` | Secretariat Details & Inquiry Form |
| `*` | — | 404 Catch-All Page |

---

## Design System

The DYUTI 2027 visual architecture follows an **editorial, publication-grade design aesthetic**:

- **Typography**:
  - **Headings & Masthead**: `Cormorant Garamond` (Classic serif for editorial authority).
  - **Body, Navigation & UI**: `Manrope` (Clean, modern sans-serif for optimal readability).
- **Color Palette**:
  - **Deep Navy**: `#071A33` (Primary authority & dark section backgrounds)
  - **Secondary Navy**: `#12345B` (Interactive states & accent borders)
  - **Off-White**: `#F7F7F4` (Primary page background canvas)
  - **Pure White**: `#FFFFFF` (Card surfaces & contrast sections)
  - **Light Blue Tint**: `#EEF3F8` (Highlight badges & callout boxes)
  - **Accent Blue**: `#2563EB` (Focus rings, hyperlinks, & active indicators)
- **Shape Language**:
  - Pill CTA Buttons & Navigation Capsule: `rounded-full` (`999px`)
  - Major Image Containers & Hero Panels: `rounded-[20px]` – `rounded-[24px]`
  - Form Input Fields: `rounded-[14px]` – `rounded-[16px]`

---

## Deployment

This application can be deployed to any static web hosting service (Vercel, Netlify, Cloudflare Pages, Firebase Hosting, or GitHub Pages).

### Generic Vercel / Netlify Deployment

1. Set Build Command: `npm run build`
2. Set Output Directory: `dist`
3. Add single-page application rewrite rule (`/*` -> `/index.html`) if routing manually on custom Nginx/Apache servers.

---

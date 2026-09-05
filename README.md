# DYUTI 2027 — National Academic Conference Web Platform

The official modern web platform for **DYUTI 2027**, the Annual National Academic Conference hosted by the **Department of Social Work**, [Rajagiri College of Social Sciences (Autonomous)](https://rcss.rajagiri.edu), Kalamassery, Kochi, Kerala, India.

---

## 🌟 Overview

**DYUTI** (*Developmental Yearnings for a United and Transformed India* — meaning *"Spark of Life"*) is a prestigious annual national symposium convened continuously since 1998. The 2027 edition focuses on **"Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership"**, bringing together scholars, researchers, development practitioners, and policy leaders aligned with the United Nations 2030 Agenda for Sustainable Development (UN SDGs).

This web application serves as the primary delegate and scholar portal, managing academic calls for papers, track explorations, registration advisories, hotel bookings, route navigation, historical conference archives, and direct secretariat inquiries.

---

## 🚀 Key Features

- **Single Page Application (SPA)**: Ultra-fast client-side routing with instant scroll restoration.
- **Solid Royal Blue & Gold Navigation Capsule**: High-contrast, stadium-pill floating header with gold active indicators, circular emblem housing, and real-time marquee announcement banner.
- **Artistic Panorama Hero Banner**: Panoramic Kochi watercolor cityscape featuring the Chinese Fishing Nets, heritage architecture, and the Rajagiri campus.
- **Road to DYUTI 2027 Timeline**: High-visibility multi-layer milestone highway tracking important conference dates and active steps.
- **Symmetrical Host Institution & SDG Explorer**: Balanced, fixed-dimension tabs showcasing Rajagiri's legacy (NAAC A++, NIRF #12) and Times Higher Education Global SDG 3 Impact Rankings (Band 601–800).
- **Call for Papers & Guidelines**: Full submission criteria for Oral and Poster presentations, Scopus publication opportunities, and direct integration with Microsoft CMT.
- **Accommodation & Hospitality Directory**: Curated stay zones (Kalamassery, Edappally, Kakkanad) with downloadable PDF contact directories.
- **Travel & Interactive Venue Directions**: Detailed transit routes from Cochin International Airport (COK) and Ernakulam South Railway Station with embedded Google Maps.
- **Regional Attractions**: Sights and tourist destinations around Kochi and Kerala with verified external guides.
- **Historical Photo Gallery & Lightbox**: Interactive retrospective gallery spanning 25+ conference editions with filtering controls and an accessible image lightbox viewer.
- **Secretariat Inquiry Desk**: Interactive contact form with client validation and graceful API fallback.
- **Theme Accordion**: Expandable view for all 8 conference sub-themes and research topic tracks.

---

## 🎨 Design System & Color Palette

The DYUTI 2027 visual identity follows a **"Navy, Gold & Ivory"** aesthetic representing academic authority, trust, and the vibrant *Spark of Life*:

| Color Name | Hex Code | Role & Usage on the Platform |
| :--- | :--- | :--- |
| **Heritage Navy Blue** | `#071A33` | **Primary Brand Tone** — Main navigation bar, hero container cards, and page footers. |
| **Royal Ocean Blue** | `#0A2540` &ndash; `#123962` | **Depth & Gradient Accent** — Illuminated gradients in navigation bars and asymmetric cards. |
| **Luminous DYUTI Gold** | `#D4AF37` | **Primary Accent Tone** — Active navigation links, key highlights, dates, and subtitle badges. |
| **Warm Amber** | `#F7C948` / `#FBBF24` | **Call-to-Action (CTA)** — `REGISTER NOW` buttons, active timeline milestones, and ranking cards. |
| **Editorial Warm Cream** | `#FDFBF7` | **Page Canvas Background** — Soft ivory/linen background for reading comfort and high-end feel. |
| **Pristine White** | `#FFFFFF` | **Surface & High Contrast** — Card surfaces, logos, and badge containers. |
| **Slate Charcoal** | `#1E293B` / `#0F172A` | **Typography Text Color** — High-contrast text on light backgrounds. |
| **Prestige Emerald** | `#054E38` | **Institutional Accent** — Present in the official Rajagiri crest seal. |

### 🔤 Typography
- **Headings & Branding**: [Outfit](https://fonts.google.com/specimen/Outfit) (Bold, modern geometric sans-serif for editorial impact).
- **Body & Editorial Content**: [Outfit](https://fonts.google.com/specimen/Outfit) & modern sans-serif stack for optimal readability.

---

## 🛠️ Tech Stack

- **Core Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom design tokens and Vanilla CSS utilities
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility Helpers**: `clsx` & `tailwind-merge`

---

## 📁 Project Structure

```
dyuti-2027/
├── public/
│   ├── images/            # Static assets (campus photos, logos, artwork)
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── cards/         # Reusable card components (StatCard, ThemeCard, etc.)
│   │   ├── layout/        # Header, Footer, TopHeaderBanner, Layout
│   │   ├── sections/      # HeroBanner, ImportantDatesTimeline, SpeakersSection, etc.
│   │   └── ui/            # Shared UI (Button, Accordion, Lightbox, Badge, etc.)
│   ├── data/
│   │   └── conference.ts  # Official conference data models, tracks, schedules & links
│   ├── lib/
│   │   ├── api.ts         # Contact form API service layer & fallback handling
│   │   ├── theme.ts       # Central theme color tokens
│   │   └── utils.ts       # Tailwind class mergers and helper utilities
│   ├── pages/             # Primary pages (Home, Rajagiri, CallForPapers, Attractions, Travel, Gallery, Accommodation, Contact)
│   ├── styles/
│   │   └── index.css      # Core Tailwind layers, custom keyframes, selection rules
│   ├── App.tsx            # Main router configuration and scroll-to-top component
│   └── main.tsx           # React DOM entry point
├── package.json           # Node dependencies and npm scripts
├── tailwind.config.js     # Extended theme colors, fonts, and animation configs
└── vite.config.ts         # Vite bundler configuration
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Rlabzteam/Dyuti27.git
cd Dyuti27
npm install
```

### Development Server
Run the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
Compile the optimized production build:

```bash
npm run build
```
Outputs static assets into the `dist/` folder.

### Local Preview
Preview the production build locally:

```bash
npm run preview
```

---

## 🗺️ Page Routes

| Primary Route | Aliases / Short Paths | Description |
| :--- | :--- | :--- |
| `/` | `/home` | Main Editorial Homepage & Overview |
| `/rajagiri` | `/about` | Host Institution Profile, Accreditations & UN SDG Impact |
| `/call_for_papers` | `/call-for-papers`, `/callforpapers`, `/cfp` | Submission Guidelines, Themes & Microsoft CMT Link |
| `/accomodation` | `/accommodation`, `/hotels`, `/stay` | Delegate Hotels & Accommodation Directory |
| `/attractions` | `/kochi`, `/sights`, `/explore` | Kochi Sightseeing & Tourism Guides |
| `/travel` | `/venue`, `/directions`, `/location` | Transit Directions & Interactive Venue Maps |
| `/gallery` | `/photos`, `/archive` | Historical Conference Archive & Lightbox Viewer |
| `/contactus` | `/contact`, `/secretariat` | Secretariat Contacts & Inquiry Desk Form |

---

Running `git push origin main` pushes synchronously to both repositories.

---

## 📄 License

&copy; 2027 **Rajagiri College of Social Sciences (Autonomous)** &bull; Department of Social Work. All Rights Reserved.

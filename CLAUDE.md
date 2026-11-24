# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (http://localhost:3000)
npm run build     # production build
npm run start     # serve production build
npm run lint      # eslint
```

No test script is configured.

## About 360Fabriek

**360Fabriek** is a Dutch immersive-media studio portfolio site showcasing WebAR, VR training, 3D configurators, and virtual tours. All copy is in Dutch. This is a showcase/marketing site with heavy GSAP animations and no dynamic state management.

## Architecture Overview

### Tech Stack

- **Framework:** Next.js 16.2.6 (App Router) + React 19 + TypeScript 5
- **Animation:** GSAP 3.15 + `@gsap/react` hook for cleanup, ScrollTrigger for scroll-based animations, SplitText/CustomEase (Club GSAP paid plugins)
- **Smooth Scroll:** Lenis 1.3.23 integrated via Lenis + GSAP ticker bridge (see `SmoothScroll.tsx`)
- **Styling:** Tailwind v4 + semantic CSS classes in `app/globals.css` (minimal utility usage)

### Routing & Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage with fixed section composition |
| `/projects` | `app/projects/page.tsx` | Filterable gallery with 5 category tabs |
| `/project/[slug]` | `app/project/[slug]/page.tsx` | Static project detail pages (SSG via `generateStaticParams`) |

### Component Architecture

**Composition Pattern:** All components are small, focused sections composed together. No nested container/presentational hierarchy — components are rendered as direct children in pages.

- **Root Layout** (`app/layout.tsx`): Geist fonts, metadata. Wraps all pages in `SiteShell`.
- **SiteShell** (`components/SiteShell.tsx`): Orchestrates layout infrastructure — renders `SmoothScroll`, `OverlayMenu`, conditional `Navbar`, and `PageTransition` wrapper.
- **SmoothScroll** (`components/SmoothScroll.tsx`): Lenis instance + GSAP ticker bridge. Renders nothing; effects only.
- **Section Components** (Hero, ServicesGrid, ProductsGrid, etc.): Each is a self-contained animation + content section. Composed sequentially on `/`.
- **Page Components** (ProjectDetailClient): Receive data as props; compose internal animations.

All components are `'use client'` — no Server Components except `app/project/[slug]/page.tsx` (server shell wrapping `ProjectDetailClient`).

### Data Flow

- **No global state manager:** Props-only data flow.
- **Static data:** `data/projects.ts` exports `PROJECTS` array and `CATEGORIES`. Types defined here.
- **Generated data:** `data/project-details.generated.ts` is auto-generated from `.firecrawl/` markdown files by `scripts/parse-projects.mjs`. Do not edit by hand.
- **Project detail pages:** Server component in `app/project/[slug]/page.tsx` fetches project + related data, passes to `ProjectDetailClient` via props.

### Animation Architecture

**Pattern:** GSAP animations are **isolated to components and scoped via `gsap.context()`** for cleanup.

```typescript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => {
    // All GSAP code here
    gsap.fromTo(ref.current, {...});
  });
  return () => ctx.revert(); // Cleanup on unmount
}, []);
```

- **Scroll timeline:** Single shared GSAP timeline per page (managed by individual components triggering ScrollTrigger).
- **Lenis bridge:** `SmoothScroll.tsx` links Lenis RAF tick to GSAP's ticker for coherent scroll state across animations.
- **Plugin registration:** Free plugins (ScrollTrigger) can be registered once at module scope. Paid plugins (SplitText, CustomEase) must be registered inside the effect.

### Directory Layout

```
app/
  layout.tsx                    # Root layout
  page.tsx                      # Homepage (composes all sections)
  projects/page.tsx             # Project gallery
  project/[slug]/page.tsx       # Project detail (server shell)
  globals.css                   # All styles (~1500 lines): brand tokens, semantic classes
components/
  SiteShell.tsx                 # Layout orchestrator
  SmoothScroll.tsx              # Lenis + GSAP ticker
  OverlayMenu.tsx, Navbar.tsx   # Navigation
  PageTransition.tsx            # Page animations
  Hero.tsx, ServicesGrid.tsx, … # Section components
  ProjectDetailClient.tsx       # Dynamic project page
data/
  projects.ts                   # Project data + types
  project-details.generated.ts  # AUTO-GENERATED (do not edit)
.firecrawl/                     # Scraped markdown (source for project-details)
scripts/
  parse-projects.mjs            # Regenerates project-details from .firecrawl/
public/
  images/                       # Not committed; add before testing
  *.svg                         # Icons only
```

## Patterns & Conventions

### CSS & Styling

- **Semantic classes in `app/globals.css`** — do not use Tailwind utility classes inline in JSX. Follow the existing pattern:
  ```css
  .hero-title { /* styles */ }
  .services-grid { /* styles */ }
  ```
  Then in JSX: `<h1 className="hero-title">`.
- **Brand tokens** (CSS variables defined in globals.css):
  - `--bg`: `#0a0a0a` (dark background)
  - `--surface`: `#111111` (cards/sections)
  - `--accent`: `#c8a96e` (warm gold)
  - `--text`: `#f0ece4` (warm white)

### GSAP & Animation

- **Prefer `useGSAP` hook** from `@gsap/react` (auto cleanup). Use `useEffect` + `gsap.context()` only when hook unavailable.
- **Always cleanup:** Animations must revert on component unmount to prevent memory leaks.
- **ScrollTrigger for scroll animations:** Most animations trigger on scroll; use ScrollTrigger directly, not custom listeners.
- **Paid plugins inside effects:** `SplitText` and `CustomEase` (Club GSAP) must be registered in the useEffect, not module scope.

### Imports & Path Alias

- **Use `@/*` alias** — maps to repo root, not `src/`. Import as `@/components/Hero`, `@/data/projects`.

### Data & Project Details

- **Project markdown source:** Place scraped pages in `.firecrawl/` as `360fabriek.nl-project-{slug}.md`.
- **Regenerate project detail data:** Run `node scripts/parse-projects.mjs` to regenerate `data/project-details.generated.ts` from `.firecrawl/` markdown.
- **Do not edit generated file:** Changes to `data/project-details.generated.ts` will be overwritten on next regen.

### Assets

- **Image assets not committed:** Add to `public/images/` before testing. Components reference `/images/hero/img-*.jpg`, etc.
- **SVG icons in public/:** Icons are committed; images are not.

### Unused Components

- `PortfolioIndex.tsx` and `StickyProjectCards.tsx` exist but are drafts — ignore or remove if cleaning up.

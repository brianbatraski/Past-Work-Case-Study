# Waiting Room — Product Case Study

A single-page case study site about **Cloudflare Waiting Room** (built 0→1) and its launch via
**Project Fair Shot**. Built with **Vite + React + TypeScript + Tailwind CSS + shadcn/ui**, and
designed to deploy for free on **Cloudflare Pages**.

## Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build -> ./dist
npm run preview    # preview the production build locally
```

> Requires Node 18+ (Node 20 recommended — see `.nvmrc`).

## Tech stack

- **Vite 5** — build tool / dev server
- **React 18 + TypeScript**
- **Tailwind CSS 3** — styling (config in `tailwind.config.js`)
- **shadcn/ui** — component primitives in `src/components/ui` (Radix-based, MIT)
- **lucide-react** — icons

## Where the content lives

Everything renders from **`src/App.tsx`**. The easiest things to edit are the data arrays near
the top of that file:

- `S` — all source/citation URLs
- `HERO_STATS` — the four headline numbers
- `TIMELINE` — the release-process timeline entries
- `CASE_STUDIES` — the proof-in-the-field cards

Each of the seven sections (Problem, Scale, Solution, Release, Lessons, Impact, Technical) is a
clearly labelled block further down in the same file. The two architecture diagrams are React/SVG
components in `src/components/diagrams/`.

## Theming

- Brand colors: black, white, and Commure cyan `#A8F4FF`. The `brand` scale in `tailwind.config.js` is built around that cyan; swap those hex values to restyle the whole site.
- Light/dark tokens: CSS variables in `src/index.css`. A light/dark toggle is built into the header.

## Deploy

See **`DEPLOY.md`** for click-by-click instructions to host on Cloudflare Pages via GitHub (free).

## Attribution

This is a personal portfolio case study. Every figure and quote is drawn from public Cloudflare
blogs, press releases, and case studies, linked inline and in the page footer. Cloudflare, Waiting
Room, and Project Fair Shot are trademarks of Cloudflare, Inc.

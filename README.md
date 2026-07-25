# Hemanth & Samantha — Wedding Invitation

A single-page wedding invitation site built with Next.js (App Router), Tailwind CSS, and Framer Motion. Features a scratch-to-reveal countdown with confetti, an animated "Our Story" section, schedule of events, venue details, and FAQ — all wrapped in an ornamental South Indian temple-inspired theme.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

- `app/page.tsx` — the single page, composing all sections
- `components/` — `Navbar`, `Hero`, `OurStory`, `Schedule`, `Venue`, `FAQ`, `Footer`, plus supporting pieces (`Countdown`, `ScratchReveal`, `Confetti`, `CornerFlourish`, `BorderRule`, `SideBorderRule`, `AnimatedSection`, `animatedScroll`)
- `public/images/` — hero and schedule banner artwork

## Deploy on Vercel

This is a standard Next.js app — push it to a Git repository and import it into [Vercel](https://vercel.com/new). No extra configuration is required; `npm run build` produces the production build Vercel expects.

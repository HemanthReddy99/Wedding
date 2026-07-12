# Wedding Website Design Spec
**Couple:** Hemanth & Samantha  
**Date:** 30 August 2026  
**Spec Written:** 2026-07-12  
**Status:** Approved

---

## 1. Purpose & Goals

A full wedding hub — a beautiful, fully responsive website that serves as the single destination for guests to learn about the couple, the ceremony schedule, venue details, and browse photos. No RSVP, no gift registry, no wedding party section.

The site must work flawlessly on mobile, tablet, and desktop without crashing or performance issues.

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Static export, SEO, code splitting, free Vercel hosting |
| Styling | Tailwind CSS v3 | Responsive utilities, custom theme support |
| Animations | Framer Motion | Best-in-class React animation, `whileInView`, `prefers-reduced-motion` support |
| Fonts | Google Fonts | Cormorant Garamond (headings) + Jost (body) |
| Images | Next.js `<Image>` | Automatic lazy loading, responsive sizes |
| Maps | Google Maps iframe embed | Simple, no API key required for basic embed |
| Hosting | Vercel (free tier) | One-click deploy from GitHub |
| Backend | None | Pure static site |

**Key dependencies:**
- `next@14`
- `framer-motion`
- `tailwindcss`
- `@tailwindcss/typography` (for prose content)
- `yet-another-react-lightbox` (gallery lightbox — lightweight, touch-friendly)

---

## 3. Site Sections

### 3.1 Hero
- Full-screen section (100vh)
- Background: couple photo (with warm gradient fallback `#fdf8f3 → #edddd0`)
- Content: wedding tag pill, names in large italic serif, ampersand accent, date, scroll-down arrow
- Animations: tag fades up on load → names fade up 300ms later → date follows → floating florals drift upward continuously

### 3.2 Our Story
- Two-column layout on desktop (photo left, text right), single column on mobile
- Placeholder photo + placeholder story text (to be replaced)
- Content: how they met, the proposal, their journey
- Animation: photo slides in from left, text slides in from right as section enters viewport

### 3.3 Schedule
- Timeline/card layout
- Events: Muhurtham, Lunch (additional events to be added by couple)
- Each card: time, icon, event name, short description
- Animation: cards stagger in one by one, 100ms delay between each

### 3.4 Venue & How to Reach
- Venue name, address, short description (placeholder)
- Embedded Google Maps iframe
- "How to reach" with transport options (placeholder — car, public transport, etc.)
- "Get Directions" button linking to Google Maps

### 3.5 Photo Gallery
- Masonry or responsive grid layout
- Placeholder images initially; replaced with real engagement photos
- Lightbox on click for full-size viewing
- Animation: images scale from `0.95 → 1.0` + fade as they enter viewport

### 3.6 FAQ
- Accordion-style (click to expand/collapse)
- Placeholder questions: dress code, parking, timing, kids policy, etc.
- Animation: smooth height transition on expand/collapse via Framer Motion `AnimatePresence`

---

## 4. Navigation

- Fixed top navbar, transparent over hero
- Becomes frosted white (`rgba(255,255,255,0.85)` + `backdrop-filter: blur`) on scroll
- Links: Our Story · Schedule · Venue · Gallery · FAQ
- Smooth scroll to section on click
- Mobile: hamburger icon → full-screen overlay menu with large links

---

## 5. Visual Style

### Color Palette
| Role | Value |
|---|---|
| Background (primary) | `#fdf8f3` |
| Background (alternate sections) | `#f5ede3` |
| Primary text | `#4a3328` |
| Secondary text | `#7a6458` |
| Accent / gold | `#c9a882` |
| Card background | `rgba(255,255,255,0.7)` |
| Card border | `rgba(201,168,130,0.25)` |

### Typography
| Role | Font | Style |
|---|---|---|
| Section headings | Cormorant Garamond | Italic, weight 300, large |
| Body text | Jost | Weight 300–400 |
| Section labels | Jost | Uppercase, letter-spacing 3–4px, gold color |
| Hero names | Cormorant Garamond | Italic, weight 300, `clamp(50px, 9vw, 92px)` |

### Cards
- Frosted glass: `background: rgba(255,255,255,0.7)`, `backdrop-filter: blur(10px)`
- Border: `1px solid rgba(201,168,130,0.25)`
- Border radius: `4px`
- Box shadow: `0 4px 30px rgba(90,62,46,0.06)`, deepens on in-view to `0 8px 50px rgba(90,62,46,0.1)`

---

## 6. Animation Specification

**Style: Balanced (Option C)**  
Meaningful entrances, delightful floating florals, warm and inviting — never overwhelming.

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Hero tag | `fadeUp` (opacity 0→1, y 20→0) | 0.8s, delay 0.3s | ease-out |
| Hero names | `fadeUp` | 1.0s, delay 0.6s | ease-out |
| Hero date | `fadeUp` | 0.8s, delay 0.9s | ease-out |
| Floating florals | `translateY(0 → -80px)` + opacity pulse | 4–10s, infinite loop | ease-in-out |
| Scroll section cards | `translateY(25px → 0)` + opacity 0→1 | 0.7s | ease-out |
| Schedule cards | Staggered, 100ms between each | 0.7s each | ease-out |
| Gallery images | `scale(0.95 → 1)` + opacity 0→1 | 0.7s | ease-out |
| FAQ accordion | Height + opacity expand | 0.3s | ease-out |
| Navbar | opacity/background transition on scroll | 0.3s | ease |

**Trigger:** All scroll animations use Framer Motion `whileInView` with `once: true` and `amount: 0.2`.  
**Accessibility:** Framer Motion automatically respects `prefers-reduced-motion`.

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Behaviour |
|---|---|---|
| Mobile | `< 768px` | Single column, larger tap targets, reduced font sizes |
| Tablet | `768px – 1024px` | Two columns where applicable |
| Desktop | `> 1024px` | Full layout, `max-width: 1200px` centered |

---

## 8. Project Structure

```
/app
  layout.tsx          ← fonts, global styles, metadata
  page.tsx            ← assembles all section components
/components
  Navbar.tsx
  Hero.tsx
  OurStory.tsx
  Schedule.tsx
  Venue.tsx
  Gallery.tsx
  FAQ.tsx
  Footer.tsx
/public
  /images             ← couple photos, placeholder images
/styles
  globals.css         ← Tailwind base + custom CSS variables
tailwind.config.ts    ← custom theme (colors, fonts)
next.config.ts        ← static export config
```

---

## 9. Content Status

| Section | Content Ready? |
|---|---|
| Hero | Names + date ready; photo placeholder |
| Our Story | All placeholder |
| Schedule | Muhurtham + Lunch confirmed; more to be added |
| Venue | All placeholder |
| Gallery | All placeholder |
| FAQ | All placeholder |

---

## 10. Out of Scope

- RSVP form
- Gift registry
- Wedding party section
- Backend / database
- Admin panel
- Authentication

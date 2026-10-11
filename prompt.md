# ARCHILOOM STUDIO — WEBSITE MASTER PROMPT (Initial Design Draft)

Paste everything below this line into your AI builder (Claude Code, Cursor, Lovable, v0, etc.).

---

## 0. ROLE & GOAL

You are a senior product designer and front-end engineer. Build a **single-page, fully responsive, high-fidelity design draft** of the marketing website for **Archiloom Studio**, a global architecture and design studio (architecture, interior design, building permits and drafting, 3D visualization and animation).

This is an **initial design draft for client approval**, not a final product. Prioritise visual quality, layout, motion and brand accuracy over backend features. Use realistic placeholder content wherever real content is missing, and never leave "lorem ipsum" in headings.

Do not ask me questions. Make sensible decisions, state assumptions in `README.md`, and keep going.

**Brand promise:** *Thoughtful design. Technical precision. Global delivery.*
**Brand formula:** Charcoal + White = structure. Green = innovation. Yellow = action.
**Tone:** confident, technical, contemporary, warm enough for private clients, developers, contractors and AEC firms. It must look like an architecture practice, not a generic creative agency.

---

## 1. TECH STACK (defaults — keep unless something is clearly better)

- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion for scroll and reveal animation (GSAP only if truly needed)
- `next/font` for Montserrat and Poppins
- `lucide-react` as a stand-in icon set, styled to the icon rules in section 3 (swap for the client's custom icons later)
- All content in typed data files (`/data/services.ts`, `packages.ts`, `projects.ts`, `reviews.ts`, `team.ts`, `clients.ts`, `locations.ts`) so copy can be edited without touching components
- No CMS, no database, no auth. Contact form posts to a stub API route with `zod` validation.
- If the builder cannot run Next.js, deliver one self-contained `index.html` with the same design.

---

## 2. DESIGN DIRECTION

Hybrid approach, deliberately chosen:

- **Layout and rhythm** come from modern minimal agency sites (large thin-feeling display headline, a service bar pinned to the bottom of the hero, numbered editorial sections, hairline dividers, big "See all projects" link, bordered client grid, big "We would love to hear from you" contact footer).
- **Services grid and pricing structure** follow the client's reference (3-column service cards; dark panel with three white pricing cards), but **restyled completely** in Archiloom branding. Do not copy any text, icons, colours or imagery from the reference sites.
- **Look and feel** comes only from the Archiloom brand guidelines below.

Overall feel: **dark editorial architecture portfolio**. Sections alternate between immersive charcoal and clean white so the page reads as ~55% charcoal, ~35% white, ~7% green, ~3% yellow.

Section rhythm (top to bottom): Charcoal hero → white → light grey (#F5F5F5) → charcoal pricing panel → white portfolio → charcoal reviews bar → white team → white clients → charcoal about → charcoal contact/footer.

Signature motifs (use consistently):
1. **Fine grid lines** (1px, white at ~6% opacity on charcoal) as a background texture, echoing the brand cover.
2. **Stepped geometric blocks** (small squares in green/yellow/white stepping diagonally) as dividers and loaders, echoing the brand end page.
3. **Section labels** in the format `01 / SERVICES`, small caps, Montserrat Semi-bold 12–13px, letter-spacing 0.12em, with a **short green bar (40×3px)** under each section title.

---

## 3. BRAND SYSTEM (non-negotiable)

### Colour tokens
```
--charcoal: #1D1D1D   /* primary dark, default field */
--white:    #FFFFFF
--green:    #7ED957   /* accent: innovation, highlights, active state */
--yellow:   #FFC857   /* accent: CTAs and emphasis only */
/* neutrals */
--n-900: #2E2E2E  --n-700: #4A4A4A  --n-500: #757575  --n-300: #D9D9D9  --n-100: #F5F5F5
```
Rules:
- Charcoal + white are the default fields. Green and yellow are controlled accents; never use both heavily in one component.
- **Yellow = primary CTA buttons and key emphasis only.** One primary action per view.
- **Green = active/positive state, link underline, checkmarks, map pins, section bars.**
- **Contrast fix:** green text is allowed only on charcoal. On white, use green as an underline, bar or block, never as body-text colour.
- No gradients on the logo or icons. Pricing section may use a soft charcoal → #F5F5F5 vertical fade behind the cards.

### Typography
- Primary: **Montserrat** (headings, nav, labels). Secondary: **Poppins** (body, UI copy).
- Scale: H1 52–64px Bold (fluid down to ~40px on mobile) · H2 32–40px Bold · H3 20–24px Semi-bold · Body 16–18px Regular · Caption 12–13px Medium.
- Headlines are short statements. Generous line-height on body (1.6). Tight tracking on large headings.

### Logo (master artwork — do not redraw)
- Use the supplied logo files only, from `/public/brand/`. Expected files: `logo-full-color.svg`, `logo-full-white.svg` (for charcoal backgrounds), `logo-mark.svg` (symbol only, for favicon and tiny sizes). Create clearly named placeholder files if missing and list them in `README.md` as **"needs client SVG"**.
- Never stretch, skew, rotate, recolour, outline, shadow or add effects. Keep clear space equal to at least the height of the "S" in STUDIO on all sides.
- Minimum width for the full lockup: **160px digital**. Below that, use the symbol only.
- Never place the logo on low-contrast imagery. On dark sections use the white-wordmark version. Do not show the logo inside a white box.

### Icons
Geometric line icons, **1.5–2px stroke, 24px grid, rounded caps and joins, no fills or gradients**, charcoal by default (white on dark). Active/hover state may switch the stroke to green. Icon set needed: Architecture, Interior, Drafting, Visualization, Renovation, Space Planning, Consulting, Global.

### Components
- **Primary button:** yellow fill, charcoal text, 6–8px radius, Montserrat Semi-bold.
- **Secondary button:** transparent, 1px charcoal border (white border on dark), same radius.
- **Links:** green underline (animated left-to-right on hover).
- **Cards:** white, 1px subtle grey border (#D9D9D9), charcoal heading, generous padding, 8px radius.
- **Dark section:** charcoal background, white text, yellow CTA.
- **Nav:** sticky, minimal, high contrast, transparent over hero then solid charcoal after scroll.

### Imagery direction
Natural daylight or controlled warm artificial light, visible material grain, strong geometry, clean perspective, negative space, slightly cinematic, no heavy HDR or oversaturation. People only for scale. Until real renders arrive, use neutral placeholder tiles (charcoal/grey with a faint grid and a label such as "Render — Residential, 16:10") so nothing looks fake or off-brand.

### Voice
Short, clear, outcome-oriented. CTA wording: **Request a Quote · Start a Project · Discuss Your Scope**.

---

## 4. GLOBAL BEHAVIOUR

- Smooth, calm, premium motion. Easing: gentle ease-out, 400–700ms. **No bounce, no novelty effects, no fast social-media cuts.**
- Text reveals: short upward or sideways fade, staggered 60–80ms.
- Section transitions: charcoal → white with a small green/yellow micro-accent (a 3-square stepped block that slides across the seam).
- Respect `prefers-reduced-motion`: replace animation with simple fades.
- Mobile-first responsive: breakpoints 360 / 768 / 1024 / 1440. Max content width 1280px, 12-column grid, 24px gutters, 96–128px vertical section padding on desktop (64px mobile).
- Accessibility: semantic landmarks, visible focus rings (yellow 2px offset), alt text, 4.5:1 contrast on all body text, keyboard-operable nav, marquee pauses on hover/focus.
- Performance: lazy-load below-the-fold media, `next/image`, no autoplay video, target Lighthouse 90+.
- SEO: title `Archiloom Studio — Global Architecture & Design Studio`, meta description, Open Graph, favicon from the symbol (16/32/48 px + SVG), JSON-LD `ProfessionalService`.

---

## 5. PAGE STRUCTURE (build in this exact order)

### Header / Navigation
Logo left (min 160px wide). Links: **Work · Services · Consultations · About Us · Contact**. Right side: yellow **Get a Quote** button. Mobile: full-screen charcoal menu with large links and stepped-block accent. "Consultations" scrolls to the booking panel in the Contact section.

### 1. HERO — "Blueprint World" (charcoal, ~100vh)
Background must be **animated but architectural**, and must **show that we deliver around the world**:
- Charcoal field with a faint 1px architectural grid that draws itself in on load (lines extend from the centre, ~1.2s).
- Green and yellow square blocks briefly resolve into the logo mark, then settle as the nav logo.
- Over the grid, a **dotted world map (SVG, low opacity)** with pulsing **green location pins** for: North America, UK/Europe, Middle East, Australia. Thin white arcs (1px, 30% opacity) animate between pins like project routes, looping slowly. Pins show a small tooltip on hover (e.g. "United Kingdom — Residential & Commercial").
- Very slow architectural parallax on the grid (max 12px shift on scroll or mouse move).

Centre-left content:
- Eyebrow: `GLOBAL ARCHITECTURE & DESIGN STUDIO`
- H1: **Designing Exceptional Spaces Worldwide**
- Sub: *Architecture, interiors, permit drafting and visualization — delivered with technical precision and honest, budget-friendly pricing.*
- Buttons: yellow **Start a Project** + outlined **View Projects**
- Three small "Why choose us" points beside or below, using the brand pillars: **Clarity** (clear drawings, clear communication), **Craft** (design thinking backed by technical execution), **Global** (a digital-first studio built for international collaboration). Add a quiet line: *Premium quality. Transparent pricing.*

Pinned to the bottom of the hero: a **4-cell service bar** with hairline dividers, each cell with a line icon, label and an arrow that nudges on hover, linking to the matching service card:
**Architecture Design · Interior Design · Building Permits & Drafting Services · Visualization / Animation**

### 2. PROOF STRIP (white)
Centred statement: **"More than 1,000 projects across 4 continents."** (placeholder claim from the client brief — keep it in one constant for easy editing). Below it, a **slim auto-scrolling marquee** of client or project logos (grayscale, 6–8 placeholder wordmarks, colour on hover), framed by two hairlines. Pauses on hover.

### 3. SERVICES IN DETAIL (light grey #F5F5F5)
Label `01 / SERVICES`. H2: **Services we offer in detail**. Intro: *A full design-to-documentation pipeline for homeowners, developers, contractors and AEC firms.*

Layout: **3-column grid of 6 cards** (2 columns tablet, 1 mobile). Card = line icon, title, one-sentence description, 3 deliverable tags, "Learn more" link with green underline. On hover: card lifts 4px, icon stroke turns green, a short deliverables list slides in. Number each card `01`–`06` in the corner.

Services (these six only):
1. **Architecture Design Services** — concept, plans, elevations, design development
2. **Revit Drafting Outsourcing Services** — 2D documentation, redraws, renovation drawings
3. **Construction & Permit Sets Services** — permit and construction drawing sets
4. **3D Modeling and Rendering Services** — 3D modeling, photorealistic renders
5. **3D Architectural Animation Services** — walkthroughs, flythroughs, animated visuals
6. **Interior Design Services** — space planning, concept, materials, detailing

**Do NOT include** Landscape Architectural Services or Point Cloud to BIM Services (excluded by the client). Write original copy for every description.

Optional detail: a "What we do" hover-index list on the left (large text list that highlights the active service in green underline) is acceptable as an alternative layout for the intro block above the grid.

### 4. PRICING, PACKAGES & CUSTOM OFFERS (charcoal panel fading to light grey)
Label `02 / PACKAGES`. H2 (white): **Our Packages**. Subline: *Flexible engagement models. Custom offers available on request.*

Three white cards overlapping the panel edge:

| | **Basic** | **Standard** | **Hourly** |
|---|---|---|---|
| Price | $1,895 /mo | $2,500 /mo | $28 /hr |
| Hours | 160 hours (≈ 40 hrs/week) | 240 hours (≈ 60 hrs/week) | Pay as you go |
| Effective rate | ≈ $11.84/hr | ≈ $10.42/hr | — |

Feature lists (placeholders — **flag as "to be defined by client" in code comments and README**):
- **Basic:** Unlimited design requests · Unlimited revisions · 40 hours a week · Cancel anytime · Pause anytime · Weekly meeting · One active task at a time · 1 dedicated team member
- **Standard (highlight as "Most popular" with a green tag):** Everything in Basic · 60 hours a week · Multiple active tasks · Dedicated project manager · Time tracking · 2 dedicated team members
- **Hourly:** 1-day free trial · Unlimited design requests and revisions · Unlimited hours a week · Cancel/pause anytime · Weekly meeting · Dedicated project manager · Time tracking

Styling: green check icons, **only the featured card gets the yellow primary button** ("Start a Project"), the others use the outlined secondary button. Under each: a text link "How it works" opening a small modal. Below the cards, a full-width line: **Need something different? Discuss Your Scope →** (custom offer CTA). All buttons route to `#contact?plan=basic|standard|hourly` and pre-select the plan in the form.

### 5. WORK / PORTFOLIO (white)
Label `03 / WORK`. Oversized H2: **We create** (very large, Montserrat Light/Medium, tight tracking). To the right: **See all projects →**.
Filter chips: All · Architecture · Interior · Visualization · Commercial.
Layout: horizontal row of **3 large cards** (16:10 images), caption beneath: `Project name. Category`. Include a second row on desktop with a staggered/offset grid. Hover: image scales 1.03 slowly, caption underline in green, cursor changes to a "View" pill. Use 6 placeholder projects with realistic names and categories. On mobile this becomes a snap-scroll carousel.

### 6. REVIEWS BAR (charcoal, slim)
A **small, continuously moving bar** of previous-client ratings and reviews: leading badge **5.0 average rating · 18 verified reviews** (placeholder numbers), then a looping ticker of short review cards (star row in yellow, one-line quote, client name and country). Pauses on hover/focus. Clearly mark all reviews as `// PLACEHOLDER — replace with real client reviews` in the data file and in `README.md`. Never present invented reviews as real in anything exported or published.

### 7. OUR TEAM (white)
Label `04 / TEAM`. H2: **Our Team**. Small caption right: *Meet the creative minds.*
Four members in a row, **full-length cut-out portraits in grayscale** with the name and role beneath in small type (placeholder silhouettes and names until real photos arrive). Hover: portrait turns to full colour, a small green square appears beside the name. Mobile: 2×2 grid.

### 8. CLIENTS (white, bordered grid)
Label `05 / CLIENTS`. H2: **Our Clients**. Left: one-line description. Right: a **3-column bordered logo grid** (hairline dividers, 9–12 placeholder logos, grayscale → colour on hover).

### 9. ABOUT US (charcoal)
Label `06 / ABOUT`. Two columns.
- Left: **Brand story** — *Archiloom is a global architecture & design studio creating thoughtful, functional and inspiring spaces. We combine creativity, technical expertise and modern visualization to deliver complete design solutions for clients around the world. We design spaces that connect people, brands and environments — beautifully.*
- Right: **Mission** — *To create meaningful, high-quality spaces through innovative design, precise drafting and immersive visualizations, delivering lasting value for our clients worldwide.* **Vision** — *To be a trusted global design studio known for creativity, quality and client-focused solutions.*
- Full-width pull quote below: **"Designing a better tomorrow, space by space."**
- Small 3-step block row beneath: Discovery → Concept → Development → Documentation → Delivery (the studio process), each a stepped-square marker.
(Final copy is coming from the client; keep this as a clean placeholder.)

### 10. CONTACT + FOOTER (charcoal)
Label `07 / CONTACT`. Large H2: **We would love to hear from you.**
- Left: short brief form — Name, Email, Service (select), Project location (country), Plan (preselected from pricing), Message, and a yellow **Request a Quote** button. Inline validation and a success state.
- A **Consultations / Book a call** panel (this is the "Consultations" nav target) with an outlined **Book a Consultation** button and a calendar embed placeholder.
- Right/footer columns: email `hello@archiloom.studio`, website `www.archiloom.studio`, placeholder registered-address block, **Follow us** (Instagram, LinkedIn, Behance, Dribbble, each with an ↗ arrow), sitemap links (Work, Services, Consultations, About, Contact).
- Bottom row: logo (white version), `© 2026 Archiloom Studio`, tagline *Thoughtful design. Technical precision. Global delivery.*, Privacy link.

---

## 6. FILE STRUCTURE
```
/app            layout.tsx, page.tsx, api/contact/route.ts
/components     Header, Hero, WorldMap, ServiceBar, ProofStrip, ServicesGrid,
                Pricing, Portfolio, ReviewsTicker, Team, ClientsGrid, About,
                Contact, Footer, Button, SectionLabel, SteppedBlocks, Icon
/data           services.ts, packages.ts, projects.ts, reviews.ts, team.ts, clients.ts, locations.ts
/public/brand   logo files (placeholders flagged)
/styles         tokens.css (all colour/type/spacing tokens)
README.md       assumptions, placeholder inventory, how to swap logo/icons/images
```

---

## 7. ACCEPTANCE CHECKLIST (verify before finishing)

1. Logo is used undistorted, never inside a white box, never below 160px wide as a full lockup.
2. Charcoal and white dominate; green and yellow stay accents; yellow only on CTAs; one primary action per view.
3. Typography follows the Montserrat / Poppins hierarchy.
4. Hero background is animated, architectural, and visibly communicates worldwide delivery.
5. Exactly six services shown; Landscape and Point Cloud to BIM are absent.
6. Pricing shows Basic, Standard and Hourly with the figures above, clearly marked as placeholder content.
7. Moving reviews bar and client logo bar both exist and pause on hover.
8. Every section label, spacing and icon style is consistent.
9. Fully responsive from 360px to 1440px+, with reduced-motion support and keyboard access.
10. No text, icons, colours or imagery copied from the reference websites.
11. `README.md` lists every placeholder (logos, claims, prices, reviews, team, projects, copy) so the client can replace them.

---

## 8. DO NOT
- Redraw, recolour or add effects to the logo.
- Use neon, heavy gradients, glassmorphism, 3D gimmicks, stock-agency clichés or bouncing animation.
- Use green as text colour on white backgrounds.
- Invent real-looking client names, reviews or statistics without the placeholder flag.
- Add pages or features beyond this single-page draft.

*(Optional: if the client wants closer parity with the layout of brnchd.com, attach 3–5 screenshots of it to this prompt and add: "Match the spacing, grid and section proportions of these screenshots, but keep all Archiloom brand rules above.")*
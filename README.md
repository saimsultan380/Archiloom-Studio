# Archiloom Studio

Single-page design draft for client approval. The page is a marketing site for a global architecture and design studio: architecture, interiors, permit drafting, and 3D visualization.

Brand promise: **Thoughtful design. Technical precision. Global delivery.**

## Assumptions

- The workspace contained only the master prompt, so this is the first build of the site.
- One route: `/`. Privacy opens a note on the same page. No CMS, database, or auth.
- The contact form posts to `POST /api/contact`, which validates with Zod and returns success. It does not email or store the message.
- Package buttons use `/?plan=basic|standard|hourly#contact`. The custom-offer link uses `/?plan=custom#contact`. Service cards use `/?service=<id>#contact`. The form reads those query params.
- “Consultations” in the navigation scrolls to the booking panel inside Contact.
- Lucide icons are a stand-in. Strokes are 1.75px on a 24px grid, rounded caps, no fills (rating stars are the exception).
- Green is the token `signal` (`#7ED957`). Yellow is the token `action` (`#FFC857`). Values match the brand. Names avoid clashing with Tailwind’s default palettes.
- On light backgrounds the third stepped square is charcoal so the motif stays visible. On charcoal it is white.
- Landscape Architectural Services and Point Cloud to BIM are intentionally omitted.
- The claim “More than 1,000 projects across 4 continents.” is the figure from the brief. Edit it only in `data/site.ts`.

## Run

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm start
```

Regenerate the hero map dots after editing `scripts/generate-map.mjs`:

```bash
npm run map
```

## Placeholder inventory

Replace these before anything is treated as live.

| Item | Where | Notes |
| --- | --- | --- |
| Logo lockup, white | `public/brand/logo-full-white.svg` | **needs client SVG**. Used in the header and footer. |
| Logo lockup, color | `public/brand/logo-full-color.svg` | **needs client SVG**. Not placed on the page yet. For light backgrounds. |
| Logo mark | `public/brand/logo-mark.svg` | **needs client SVG**. Favicon art is `app/icon.svg`. |
| Project claim | `data/site.ts` → `PROJECT_CLAIM` | Brief figure, kept in one constant. |
| Services copy | `data/services.ts` | Draft copy. Cards 07–11 (outdoor construction, outdoor kitchens, concrete work, cabanas, artificial turf) still need the client’s descriptions and photos. |
| Package prices | `data/packages.ts` | $1,895 /mo, $2,500 /mo, $28 /hr, with the brief’s hour bands. |
| Package features | `data/packages.ts` | **To be defined by the client.** |
| How it works | `data/packages.ts` | Placeholder process. |
| Projects | `data/projects.ts` | Six named studies. Tiles are labelled renders, not photography. |
| Reviews | `data/reviews.ts` | **PLACEHOLDER — replace with real client reviews.** The page says they are a sample layout, not live testimonials. |
| Review totals | `data/reviews.ts` → `reviewSummary` | 5.0 average, 18 verified reviews. Placeholder counts. |
| Team | `data/team.ts` | Placeholder names and geometric portraits. |
| Client marks | `data/clients.ts` | Placeholder wordmarks, not confirmed clients. |
| Locations | `data/locations.ts` | Pin labels for the hero map. |
| Address | `components/Footer.tsx` | “Forthcoming”. |
| Social links | `data/site.ts` | Labels only. URLs are not live. |
| Calendar | `components/Contact.tsx` | Non-working embed. |
| About copy | `data/site.ts` → `about` | Brief copy, pending the client’s final text. |
| Contact delivery | `app/api/contact/route.ts` | Validation stub only. |

## Swap the logo

1. Replace the SVG files in `public/brand/` without renaming them.
2. Do not stretch the artwork. `components/Logo.tsx` draws the white lockup at 168×44, which matches the placeholder viewBox and stays above the 160px minimum width.
3. If the real lockup has a different aspect ratio, change the `width` and `height` together so the ratio matches the file. Keep the rendered width at or above 160px. Below that, use `logo-mark.svg` instead.
4. Use the white lockup on charcoal. Do not place the logo inside a white box, and do not recolor, shadow, or rotate it.

## Swap icons, images, and copy

- Icons: `components/Icon.tsx`. Keep a 24px grid and a 1.5–2px stroke.
- Project tiles: replace the labelled blocks in `components/Portfolio.tsx` with `next/image` stills. Keep the 16:10 frame.
- Team portraits: replace `components/Portrait.tsx` with cut-out photography. The hover state should go from grayscale to color.
- Copy lives in `/data`. Components read from those files.

## Page order

Charcoal hero → white proof → light grey services → charcoal pricing → white work → charcoal reviews → white team → white clients → charcoal about → charcoal contact and footer.

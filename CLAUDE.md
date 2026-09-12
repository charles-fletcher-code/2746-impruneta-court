# 2746 Impruneta Court — CLAUDE.md

## Project

Static real estate marketing site for **2746 Impruneta Court, Livermore, CA 94550**.
Listed by Jessica Hooley & Megan Fletcher at Coldwell Banker Realty.
Deployed at: `https://2746imprunetacourt.com` (TBD — domain confirmed when live)

## Property Details

| Field | Value |
|---|---|
| Address | 2746 Impruneta Court, Livermore, CA 94550 |
| Neighborhood | The Corners |
| Price | $2,200,000 |
| Beds | 4 |
| Baths | 3.5 |
| Interior Sq Ft | 3,335 |
| Lot Sq Ft | 11,015 |
| Year Built | 2002 |
| Style | Single-Level Craftsman |

## Status: LIVE LISTING — Pending items

- [x] **Matterport** — live at `https://my.matterport.com/show/?m=Dbzq4ZSEfdv&brand=0`
- [x] **Formspree** — using shared form `xgojprov` (renamed in Formspree dashboard); endpoint: `https://formspree.io/f/xgojprov`
- [x] **R2 photo upload** — 24 curated files uploaded; `index.html` updated to `https://pub-cc8b54c807594f42a7fadf16d0dba5e2.r2.dev/`
- [x] **OG image** — `og:image` points to R2 hero URL
- [ ] **Domain** — point `2746imprunetacourt.com` to Vercel after DNS is configured

## Curated Photo Selection (23 gallery + 1 hero)

| # | Filename | Room |
|---|---|---|
| Hero | `003_003_ejp_09092026_6144px_233.jpg` | Ground exterior — front + garage |
| G1 | `064_064_ejp_09092026_6144px_334.jpg` | Aerial front — crape myrtles + hills |
| G2 | `003_003_ejp_09092026_6144px_233.jpg` | Ground exterior — front + garage |
| G3 | `007_007_ejp_09092026_6144px_745.jpg` | Front porch — address + craftsman door |
| G4 | `011_011_ejp_09092026_6144px_206.jpg` | Living room — coffered ceiling wide |
| G5 | `012_012_ejp_09092026_6144px_458.jpg` | Living room — fireplace + built-ins |
| G6 | `016_016_ejp_09092026_6144px_339.jpg` | Formal dining room |
| G7 | `022_022_ejp_09092026_6144px_917.jpg` | Kitchen — full wide angle |
| G8 | `021_021_ejp_09092026_6144px_401.jpg` | Kitchen — island + range + barstools |
| G9 | `027_027_ejp_09092026_6144px_963.jpg` | Family room — fireplace + TV + built-ins |
| G10 | `032_046_ejp_09092026_6144px_177.jpg` | Primary bedroom — tray ceiling |
| G11 | `035_049_ejp_09092026_6144px_4.jpg` | Primary bath — vanity + tub + shower |
| G12 | `048_038_ejp_09092026_6144px_655.jpg` | Primary walk-in closet |
| G13 | `043_041_ejp_09092026_6144px_320.jpg` | Front ensuite bedroom (multigenerational) |
| G14 | `044_042_ejp_09092026_6144px_771.jpg` | Front ensuite bath — modern double vanity |
| G15 | `062_062_ejp_09092026_6144px_154.jpg` | Deck — sitting area + French doors |
| G16 | `059_059_ejp_09092026_6144px_153.jpg` | Deck — dining under shade tree |
| G17 | `055_055_ejp_09092026_6144px_487.jpg` | Pond garden |
| G18 | `052_052_ejp_09092026_6144px_107.jpg` | Side yard — raised garden beds + orchard |
| G19 | `084_084_ejp_09092026_6144px_475.jpg` | Virtual Twilight — deck at sunset |
| G20 | `066_066_ejp_09092026_6144px_430.jpg` | Aerial rear — solar panels + deck + garden |
| G21 | `068_068_ejp_09092026_6144px_496.jpg` | Aerial — Livermore valley + vineyards |
| G22 | `077_077_ejp_09092026_6144px_3.jpg` | Aerial overhead — solar + property footprint + pond |
| G23 | `083_083_ejp_09092026_6144px_516.jpg` | Virtual Twilight front (also hero) |
| FP | `086_floor_plan_958.jpg` | Floor plan |

## Deployment

- Repo: `charles-fletcher-code/2746-impruneta-court` (GitHub)
- Deploy: GitHub Actions → Vercel (NOT native Vercel-GitHub integration — avoids work account conflicts)
- Workflow: `.github/workflows/deploy.yml` uses `npx vercel deploy` with three repo secrets
- Secrets needed: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- See `NEW_SITE_SETUP.md` (parent directory) for full 9-step setup guide

## R2 Photo Upload

**Done.** 24 curated files uploaded to Cloudflare R2.

- Bucket: `2746-impruneta-court-photos`
- Public CDN URL: `https://pub-cc8b54c807594f42a7fadf16d0dba5e2.r2.dev/`
- Curated files are also in `2746_impruneta_court_photos/curated/` locally for reference

## Stack

- Pure HTML5 / CSS3 / vanilla JavaScript — no framework, no npm, no build step
- [GLightbox v3.2.0](https://biati-digital.github.io/glightbox/) loaded from CDN (gallery lightbox)
- Images: Cloudflare R2 CDN (local paths until R2 bucket created)
- Contact form: Formspree (endpoint TBD — placeholder in form action)
- 3D virtual tour: Matterport embed (URL TBD — placeholder in iframe)
- Location map: Google Maps embed
- Deployment: Vercel via GitHub Actions

## File Map

| File | Role |
|------|------|
| `index.html` | Entire site — all sections, images, embeds, form |
| `assets/style.css` | Full design system — variables, layout, components, responsive |
| `assets/main.js` | Interactivity — nav, lightbox init, form AJAX, scroll animations |
| `vercel.json` | Clean URLs (`cleanUrls: true`, `trailingSlash: false`) |
| `.github/workflows/deploy.yml` | GitHub Actions → Vercel deploy on push to main |

## Key Conventions

- **Colors/spacing**: Defined as CSS custom properties in `style.css` (`:root` block). Always use variables, never hardcode.
- **Semantic HTML**: Use `<section>`, `<nav>`, `<footer>`, etc. with `id` anchors for nav links.
- **Accessibility**: All images need `alt` text. Interactive elements need `aria-label`. Keyboard nav wired in `main.js`.
- **Images**: Always include `loading="lazy"` except the first gallery image (use `fetchpriority="high"`). All images point to R2 CDN (or local paths during dev).
- **Motion**: Scroll animations use `prefers-reduced-motion` media query — don't break this.
- **No dependencies**: Do not add npm packages, build tools, or frameworks. CDN-only if a library is truly needed.

## Do-Nots

- No frameworks (React, Vue, etc.)
- No build tools (Webpack, Vite, etc.)
- No `node_modules` or `package.json`
- No trailing slashes in internal links (Vercel strips them)
- Don't inline `<style>` blocks in `index.html` — all CSS belongs in `assets/style.css`
- Don't add `<script>` tags outside of the existing pattern at the bottom of `<body>`

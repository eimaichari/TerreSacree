# True Disciples of Christ Tabernacle

## Development

Install dependencies with `npm install`, then run `npm run dev` to start the
local development server. Run `npm run build` to create the production site in
`dist/`.

## Site structure

- `src/components/Navigation.astro` — shared top navigation
- `src/components/Footer.astro` — shared footer navigation
- `src/data/church.ts` — church name, contact details, address, and logo paths
- `src/pages/` — route-specific page content
- `public/photos/` — image and media assets
- `public/styles/` and `public/scripts/` — preserved page-specific styling and
  interaction scripts

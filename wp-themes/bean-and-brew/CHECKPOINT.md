# Visual parity checkpoint

Date: 2026-05-06

## Curl-based smoke checks (Task 19)

| Check                                | Result |
|--------------------------------------|--------|
| Hero title (Every Cup Tells a Story) | PASS   |
| Wordmark (Bean & Brew)               | PASS   |
| Chalkboard menu rendered             | PASS   |
| Polaroid story rendered              | PASS   |
| Location map rendered                | PASS   |
| Final CTA rendered                   | PASS   |

## Side-by-side observations (manual, to be filled in by reviewer)

Open in two browser tabs:
- WP version:     http://localhost:8088/
- Next.js version: `npm run dev` then http://localhost:3000/en/showcase/artisan-cafe

| Section  | WP looks like Next.js? | Notes |
|----------|------------------------|-------|
| Hero     |                        |       |
| Story    |                        |       |
| Menu     |                        |       |
| Location |                        |       |
| CTA      |                        |       |
| Footer   |                        |       |

## Playwright spec results (Task 20)

- `WP homepage exposes all expected sections and content`: PASS
- `decorative elements load (sanity)`: PASS
- `homepage screenshot diff (informational)`: PASS

Screenshots written to `test-results/wp-bean-brew-homepage.png` and `test-results/next-bean-brew-homepage.png`.

Note: "Flat White" item required `.locator('.cafe-menu__item-name').filter({ hasText: 'Flat White' })` because the span also contains a "Featured" badge child, causing `getByText('Flat White', { exact: true })` to fail.

## Known carry-over notes

- DM Sans 400/500/600 woff2 files are byte-identical (Google Fonts variable). If actual rendered weights look identical in the browser, replace 3 files with 1 variable + theme.json fontFace `font-weight: 400 600` range.
- Hero CTA hrefs and tab roving tabindex addressed in fix commit `9ccc22d`.
- Function_exists guards on `bean_and_brew_enqueue_assets` and `bean_and_brew_register_pattern_categories` were noted as plan-level gaps in Task 5 review.
- This run was a retry after a prior Docker Desktop / WSL crash blocked Tasks 19–21. The crash has been resolved by the user.
- `wordpress:cli-php8.2` WP-CLI Docker image had exec format error (empty /usr/local/bin/wp binary) — setup was performed via a PHP bootstrap script running inside the `wordpress:6.5-php8.2-apache` container instead, with `define('WP_INSTALLING', true)` to bypass the wp_not_installed() redirect.

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

## Theme Check results (Task 21)

Plugin: theme-check v20231220 (installed via `wp plugin install theme-check --activate`)

| Severity     | Count | Notes |
|--------------|-------|-------|
| REQUIRED     | 0     | Resolved: screenshot.jpg added (64 KB), copyright notice added to style.css |
| WARNING      | 1     | Wrong directory slug — theme dir is `bean-and-brew` but Theme Check expects `bean-brew` from "Bean & Brew" name |
| RECOMMENDED  | 1     | No `register_block_style` call — block themes use `theme.json` `styles.blocks` instead |
| INFO         | 3     | `block-theme` and `restaurant` not in WP.org accepted tag list; single text-domain matches theme dir slug |

Resolutions applied:
- Added `wp-themes/bean-and-brew/screenshot.jpg` (1200×900, 64 KB JPEG) — viewport screenshot of http://localhost:8088/
- Added GPL copyright notice block to `wp-themes/bean-and-brew/style.css`

Deferred issues (deliberately not fixing in this experiment):
- WARNING "wrong directory slug": Renaming the theme directory from `bean-and-brew` to `bean-brew` would break all existing fixtures, patterns, and template references. This is a local development theme, not a WP.org submission. Deferred.
- RECOMMENDED "register_block_style": Block themes use `theme.json` `styles.blocks` for block styling rather than the classic `register_block_style()` PHP API. The recommendation is a false positive for FSE themes. Deferred.
- INFO "wrong tags" (`block-theme`, `restaurant`): `block-theme` is not in the WP.org tag allowlist (it's implicit); `restaurant` may be valid but was flagged. Not submitting to WP.org, so irrelevant. Deferred.
- INFO "single text-domain": `bean-and-brew` is the deliberate text-domain matching the theme directory. Not an issue. Deferred.

## Known carry-over notes

- DM Sans 400/500/600 woff2 files are byte-identical (Google Fonts variable). If actual rendered weights look identical in the browser, replace 3 files with 1 variable + theme.json fontFace `font-weight: 400 600` range.
- Hero CTA hrefs and tab roving tabindex addressed in fix commit `9ccc22d`.
- Function_exists guards on `bean_and_brew_enqueue_assets` and `bean_and_brew_register_pattern_categories` were noted as plan-level gaps in Task 5 review.
- This run was a retry after a prior Docker Desktop / WSL crash blocked Tasks 19–21. The crash has been resolved by the user.
- `wordpress:cli-php8.2` WP-CLI Docker image had exec format error (empty /usr/local/bin/wp binary) — setup was performed via a PHP bootstrap script running inside the `wordpress:6.5-php8.2-apache` container instead, with `define('WP_INSTALLING', true)` to bypass the wp_not_installed() redirect.

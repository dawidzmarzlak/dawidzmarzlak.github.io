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

## Polish round (post-Task 24)

Fixed:
- Header & footer wordmark hardcoded to "Bean & Brew" instead of dynamic WP site title (which would otherwise show whatever the buyer sets, e.g. "Bean and Brew Demo" during testing). Replaced `wp:site-title` block with a `wp:paragraph` block in both `parts/header.html` and `parts/footer.html`.
- `reveal.js` now has a `rootMargin: '0px 0px 100px 0px'` pre-trigger so the IntersectionObserver fires 100px before a section enters the viewport, and a 1500ms fail-safe that force-reveals any sections still at `opacity:0` — was causing all below-fold sections to stay invisible in full-page screenshots. Also updated the screenshot test to wait 2000ms so the fail-safe fires before the capture.

Noted but not fixed (visual audit against Next.js reference):
- Hero dashed-circle (top-right decorative ring) is noticeably smaller/fainter than the Next.js version — the SVG renders at a similar position but the border alpha/thickness differs slightly. A quick fix would be to increase `border-width` or `opacity`, but the difference is minor and acceptable.
- Hero dot-grid pattern (bottom-left) is proportionally smaller in WP vs. Next.js — adjusting SVG viewBox or element size could improve this, but it does not affect usability.
- Story polaroid section: the three polaroid cards in WP are correctly rendered with tilts and overlaps; the sticker badge is present. The vertical spacing between the polaroid section and the adjacent sections looks slightly tighter than Next.js (roughly 2rem vs. 3rem gap). Acceptable.
- Menu chalkboard: tab alignment and item list match well. Minor colour difference on the active tab pill (WP uses a slightly more opaque clay; Next.js has more contrast). Not worth fixing in isolation.
- Location map placeholder is a static beige box; Next.js shows the same placeholder. No difference.
- Footer: WP and Next.js both show "Bean & Brew" + tagline + copyright. Match is good.

## Front-page architecture change (post-Task 25)

Refactor: `templates/front-page.html` now renders `<!-- wp:post-content /-->` instead of inline-referencing the 5 cafe patterns. The patterns are inserted into the Home page's `post_content` at theme activation (and self-healed on first init if the page exists empty).

Result: end users edit the homepage at **Pages → Home → Edit** in the regular Block Editor. Each section (hero, story, menu items, location, CTA) appears as a tree of editable blocks. Reordering, swapping text/images, deleting sections, and inserting new patterns from the "Bean & Brew" inserter category all work without leaving the page editor — closer to the workflow most WP users already know.

The cafe-menu pattern's PHP-rendered tabs are baked to static HTML at pattern registration (via WP's standard output-buffering of pattern files), so the menu ends up as editable plain block markup in post_content. Each menu item can be edited directly.

## Known carry-over notes

- DM Sans 400/500/600 woff2 files are byte-identical (Google Fonts variable). If actual rendered weights look identical in the browser, replace 3 files with 1 variable + theme.json fontFace `font-weight: 400 600` range.
- Hero CTA hrefs and tab roving tabindex addressed in fix commit `9ccc22d`.
- Function_exists guards on `bean_and_brew_enqueue_assets` and `bean_and_brew_register_pattern_categories` were noted as plan-level gaps in Task 5 review.
- This run was a retry after a prior Docker Desktop / WSL crash blocked Tasks 19–21. The crash has been resolved by the user.
- `wordpress:cli-php8.2` WP-CLI Docker image had exec format error (empty /usr/local/bin/wp binary) — setup was performed via a PHP bootstrap script running inside the `wordpress:6.5-php8.2-apache` container instead, with `define('WP_INSTALLING', true)` to bypass the wp_not_installed() redirect.

## Customizer-based section editing (Task 28)

Reverted the Page-based front page (Tasks 26–27) and switched to a Customizer-driven model:

- `templates/front-page.html` is static — inline `wp:pattern` references for the 5 sections.
- `inc/template-tags.php` defines the central defaults table (`bean_and_brew_defaults()`) plus `bean_and_brew_text($key)` lookup and `bean_and_brew_is_section_visible($section)` gate.
- `inc/customizer.php` registers a top-level "Bean & Brew" panel with 5 sections (Hero / Story / Menu / Location / Final CTA), each exposing visibility + text fields.
- Each `patterns/cafe-*.php` reads its content via `bean_and_brew_text()` and gates the whole render with the visibility check.
- The auto-population functions (`bean_and_brew_flag_demo_content_setup`, `bean_and_brew_maybe_create_home_page`, `kses_remove_filters` workaround) have been removed from `functions.php`.

End user flow: **Wygląd → Dostosuj → Bean & Brew** → pick a section → toggle visibility or edit any field. Saving triggers a full preview refresh; published changes take effect site-wide.

### Phase 2 enhancements (deferred)

- Footer text customization — would require a custom dynamic block or a PHP-rendered footer template part (HTML template parts can't `<?php echo ... ?>`).
- Menu items as Customizer fields — currently 14 items × 3 fields = 42 settings, too noisy for this iteration. Worth a custom Customizer control with a JSON repeater or a Gutenberg-style item list.
- Image fields (hero background, polaroid photos) — would use `WP_Customize_Image_Control`. Currently images are file-based in `assets/images/`.

## Phase 2 Customizer enhancements (Task 29)

Added:

- **Image fields** (4): hero background + 3 polaroid photos. Use `WP_Customize_Image_Control` so the user picks via the WP media library. Defaults are the bundled `assets/images/*.jpg`.
- **Menu items** per category (4 textareas): `coffee`, `tea`, `food`, `pastries`. Format = "Name | Price | featured" one per line. Parsed at render time by `bean_and_brew_menu_items($category)` helper. Empty categories are hidden.
- **Footer tagline + copyright** via custom dynamic blocks `bean-and-brew/footer-tagline` and `bean-and-brew/footer-copyright`, registered in `inc/dynamic-blocks.php`. The blocks have `render_callback`s so they can read theme mods at render time despite living inside an HTML template part.

Files added:
- `inc/dynamic-blocks.php` (52 lines)

Files modified:
- `inc/template-tags.php` — image/menu/footer defaults + `bean_and_brew_menu_items()` parser
- `inc/customizer.php` — image controls, menu textareas, footer section
- `functions.php` — require_once dynamic-blocks.php
- `patterns/cafe-hero.php` — hero image dynamic
- `patterns/cafe-story.php` — 3 polaroid images dynamic
- `patterns/cafe-menu.php` — items array built at render time
- `parts/footer.html` — wp:bean-and-brew/footer-tagline + wp:bean-and-brew/footer-copyright

Phase 2 deferrals (now Phase 3):
- Polaroid alt text + caption per polaroid (currently `Est. 2018` / `Fresh daily` / `Made with love` are hardcoded captions inside the figure markup)
- Story values' icons (currently emoji ♥ / 🌱 / 👥 hardcoded)
- Color overrides through Customizer (currently in theme.json palette only)

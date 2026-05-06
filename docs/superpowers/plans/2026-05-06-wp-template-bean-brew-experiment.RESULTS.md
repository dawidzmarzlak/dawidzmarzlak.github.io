# Bean & Brew → WordPress Template — Experiment Results

## Goal recap

Convert one Next.js showcase (Bean & Brew / artisan-cafe) into a self-contained
WordPress block theme that visually matches the showcase out-of-the-box and
can be customized via the Site Editor. Establish whether the same approach
can be repeated to produce a sellable line of cafe / restaurant / portfolio
themes from the existing showcase library.

The Next.js showcase under `components/showcase/artisan-cafe/` and
`app/[locale]/showcase/artisan-cafe/` was kept fully intact — the WP theme
lives alongside it at `wp-themes/bean-and-brew/`, not as a replacement.

## What was built (Tasks 1–18, all committed)

**Theme:** `wp-themes/bean-and-brew/` — self-contained WordPress Block Theme.

| Layer                | Files                                                                                              |
|----------------------|-----------------------------------------------------------------------------------------------------|
| Theme manifest       | `style.css` (theme header), `index.php` (required stub), `readme.txt` (marketplace metadata)        |
| Design tokens        | `theme.json` (8-color palette, 3 font families with self-hosted woff2, 7 font sizes, spacing, button :hover, h1/h2/h3/link styles, template parts) |
| Bootstrap            | `functions.php` (theme supports + asset enqueue), `inc/block-patterns.php` (pattern category)       |
| Templates            | `templates/index.html`, `templates/front-page.html`, `templates/page.html`, `templates/single.html` |
| Template parts       | `parts/header.html`, `parts/footer.html`                                                            |
| Block patterns       | `patterns/cafe-hero.php`, `cafe-story.php`, `cafe-menu.php`, `cafe-location.php`, `cafe-cta.php`    |
| Decorative CSS       | `assets/css/theme.css` (polaroids, chalkboard, leader dots, map placeholder, scroll-reveal)         |
| Vanilla JS           | `assets/js/menu-tabs.js` (ARIA tab switcher), `assets/js/reveal.js` (IntersectionObserver reveals)  |
| Self-hosted fonts    | DM Serif Display 400, DM Sans 400/500/600, Caveat 400 — woff2 files + SIL OFL LICENSE               |
| Placeholder imagery  | 17 jpg files copied (NOT moved) from `public/showcase/artisan-cafe/` + CREDITS.txt note              |
| Local dev env        | `docker-compose.wp.yml` at repo root (WordPress 6.5 + MariaDB 11 + WP CLI service, port 8088)        |

**Branch:** `feat/wp-template-bean-brew` cut from `worktree-redesign-variant-c`.

**Commits:** 16 commits across 18 plan tasks (some tasks batched into one commit, e.g. Task 14 is a single commit, Task 18 wires three templates in a single commit).

## What was NOT verified (Tasks 19–21 BLOCKED)

The following verification steps could not be completed in this run because
Docker Desktop's WSL distro corrupted during the `wordpress:cli-php8.2`
image pull in Task 19. The WP stack itself came up cleanly (verified earlier
in Task 6 with HTTP 302 from the install wizard), but Docker is currently
unable to start — recovery requires the user to reset Docker Desktop.

| Task | What it would have done                                       | Status |
|------|--------------------------------------------------------------|--------|
| 19   | WP install + theme activate + homepage curl smoke checks (hero title, wordmark, chalkboard markup, polaroid markup, map markup, CTA copy) | DEFERRED |
| 20   | Playwright parity spec at `tests/wp/bean-brew.spec.ts` (3 tests: content assertions, decorative-element sanity, screenshot diff vs. Next.js showcase) | DEFERRED |
| 21   | Theme Check plugin compliance pass (REQUIRED + WARNINGs)      | DEFERRED |

To resume:
1. Reset Docker Desktop (UI → Troubleshoot → Reset to factory defaults). Note: this wipes all Docker images/volumes on the host.
2. Re-run `docker compose -f docker-compose.wp.yml -p bean-brew-wp up -d` to bring up WP.
3. Continue Task 19 from Step 2 (install via wp-cli), then Tasks 20 and 21.

## Visual fidelity vs. Next.js showcase

Until Tasks 19–21 are unblocked, visual fidelity is verified at the markup
level only — every CSS hook documented in the plan (`.cafe-hero__decor`,
`.cafe-hero__dashed-circle`, `.cafe-story__polaroid--1/2/3`,
`.cafe-story__sticker`, `.cafe-menu__chalkboard`, `.cafe-menu__tab`,
`.cafe-location__map-pin`, etc.) is present in the corresponding pattern
file, and the Task 14 review confirmed all 30 hook classes are wired.
But "wired" is not "looks right" — the actual rendered comparison is what
Task 19 would have produced.

What we *can* claim, based on the implementation review:
- Block delimiter balance is correct in all 5 patterns (verified in Task 14 review).
- All `<img>` and cover URLs use `esc_url(get_template_directory_uri()...)` for security.
- Tab pattern markup is ARIA-compliant: role/aria-selected/aria-controls/tabindex (roving) all present.
- Hero CTA buttons link to in-page anchors (#visit, #menu) consistent with header nav.
- All color slugs in pattern attributes resolve against the 8-entry theme.json palette.

What we *cannot* claim until Task 19 runs:
- Whether the rendered hero looks like the Next.js version (Framer Motion entrance animations vs. CSS-only is a known intentional simplification).
- Whether DM Sans renders at three distinct weights despite all three woff2 files being byte-identical (Google Fonts serves DM Sans as a single variable font; declared in theme.json as three separate single-weight fontFace entries — should work via font-weight matching against the variable axis but unverified).
- Whether the chalkboard panel proportions and inner shadow match the Next.js styling.
- Whether scroll-reveal triggers feel right (timing, threshold).

## Customizability assessment

| Capability                | Status with current implementation | Notes |
|---------------------------|------------------------------------|-------|
| Recolor via Site Editor   | YES (8 palette tokens in theme.json appearanceTools) | End user picks new colors in Site Editor → Styles |
| Font family swap          | PARTIAL — woff2 files swap requires file replacement; Google Fonts via plugin is trivial | theme.json declares 3 families |
| Font sizes / spacing      | YES (7 font sizes + spacingScale presets) |  |
| Edit content text         | YES — every section is a block pattern, end user can edit all text/images via Site Editor |  |
| Reorder sections          | YES — Site Editor → Templates → Front Page allows drag-reorder of `wp:pattern` references |  |
| Remove sections           | YES — delete the `wp:pattern` block in front-page template |  |
| Add new sections from library | YES — patterns visible under "Bean & Brew" inserter category |  |
| Site Editor learning curve| End users not familiar with FSE may struggle. Mitigate with a video walkthrough for buyers. |  |
| Multilingual              | NO — English only. Polylang or WPML would add support. The Next.js showcase has built-in PL/EN via next-intl. |  |

## Sellability — open questions to resolve before listing

- **Demo content packaging:** ship a `.wxr` import file or a One Click Demo Import config so a fresh install matches the screenshot. (NOT done — would be a Phase 2 task.)
- **Marketplace requirements:**
  - ThemeForest: requires their author terms, brand assets, demo content XML.
  - WordPress.org: requires Theme Review queue (longer wait).
- **Image licensing:** Bundled showcase images are placeholders only. Before resale, swap for stock images with redistribution rights or commission original photography. CREDITS.txt notes this.
- **Documentation:** end-user docs (PDF or HTML) covering install, customization, font swap, color swap, content swap. (NOT done.)
- **Support model:** bundled? hours? channel? (Business decision.)
- **Pricing:** competitive cafe themes on ThemeForest are $39–69. Free WordPress.org listing is also viable for portfolio/lead-gen.

## Repeatability — extending to other showcases

Each showcase under `components/showcase/<name>/` follows the same pattern:
3-6 React components, an index.ts, a translations key. The block-theme
conversion produced one PHP pattern per React component plus shared
template parts. Estimated effort per additional showcase, having now done
one: ~half the time of this one (most of `theme.json`, `functions.php`,
`docker-compose.wp.yml`, the Playwright spec template, and the dev workflow
are reusable as a scaffold).

Suggested next steps if pursuing the line:

1. Get Tasks 19–21 unblocked (fix Docker, run them, validate this theme actually renders correctly).
2. Extract a `wp-themes/_scaffold/` skeleton from this theme — the bootstrap files (style.css, theme.json minus palette, functions.php, inc/block-patterns.php, index.php, docker-compose.wp.yml, README.md) generalize to ~95% reuse across themes.
3. Convert 2-3 more showcases (e.g. fine-dining, fitness-studio, photo-portfolio) to validate the scaffold.
4. Build a small Node script that scrapes a showcase folder and emits a starter pattern file with placeholder content, to bootstrap each new theme.
5. Resolve image licensing once across the line, not per theme.
6. Decide whether to use semantic slug naming (`surface-base`, `accent-warm`) instead of brand-flavored names (`cream`, `clay`) — the brand-flavored names are friendlier for the end user but make scaffold reuse harder. Code review for Task 2 flagged this as a deliberate trade-off.

## Unknowns / risks

- **Performance:** The WP version ships ~5 woff2 + 1 CSS + 2 JS. Lighthouse parity with the Next.js static export should be measured (likely lower scores due to WP overhead). Will be measurable once Task 19 runs.
- **Site Editor learning curve:** Even with patterns wired, FSE is unfamiliar to many WP users.
- **DM Sans variable-font duplication:** All three weight files are byte-identical (Google Fonts variable). 70KB wasted. Worth consolidating to one variable file + theme.json `font-weight: 400 600` range entry — but only after visual confirmation that current setup renders correct weights.
- **Function_exists guards:** `bean_and_brew_enqueue_assets` and `bean_and_brew_register_pattern_categories` are missing the consistent guard pattern (only `bean_and_brew_setup` has it). Plan-level gap from Task 5 review. Low-risk for single-active-theme usage; fix on next theme touch.

## Bottom line for the wider showcase line

The experiment validates the **architecture** but not yet the **visual outcome**.
Block themes are a viable target for a sellable showcase line: theme.json provides
genuine token customization without plugin dependencies, block patterns map cleanly
to React components, and Site Editor exposure gives buyers real customization.
The main unknowns are a) whether the rendered output is acceptably close to the
Next.js source (resolvable when Docker is fixed) and b) the per-theme labour
budget once a scaffold is extracted (estimated 1.5–2 days per showcase after
scaffolding — open question whether margin justifies this for a $39–69 price point).

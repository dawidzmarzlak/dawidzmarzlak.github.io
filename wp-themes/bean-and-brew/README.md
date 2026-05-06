# Bean & Brew — WordPress Block Theme (experiment)

A self-contained Block Theme that mirrors the Next.js `artisan-cafe` showcase.

## Local development

From the repo root:

```bash
# Start WP + MariaDB
docker compose -f docker-compose.wp.yml up -d

# Open http://localhost:8088 and complete the 30-second WP install wizard
# (admin/admin is fine for testing).

# After install, activate the theme via WP CLI:
docker compose -f docker-compose.wp.yml run --rm wp-cli wp theme activate bean-and-brew

# Set the front page to a static page that uses our front-page template:
docker compose -f docker-compose.wp.yml run --rm wp-cli wp post create \
  --post_type=page --post_title='Home' --post_status=publish --porcelain
# Use the returned ID:
docker compose -f docker-compose.wp.yml run --rm wp-cli wp option update show_on_front page
docker compose -f docker-compose.wp.yml run --rm wp-cli wp option update page_on_front <ID>
```

The theme directory is bind-mounted, so edits to `theme.json`, templates, patterns
or assets are picked up on next page reload — no rebuild step.

## What this theme is

A Block Theme (Full Site Editing) that ships with one homepage layout matching
the showcase. Every section is a pattern, every color/font is a token in
`theme.json`, so end users can recolor and reword the entire site without code.

## Customization

| To change | Where |
|-----------|-------|
| Colors    | `theme.json` → `settings.color.palette` (or Site Editor → Styles → Colors) |
| Fonts     | `theme.json` → `settings.typography.fontFamilies` |
| Layout    | `theme.json` → `settings.layout` |
| Sections  | Site Editor → Templates → Front Page (drag/drop, replace patterns) |
| Header    | Site Editor → Patterns → Template Parts → Header |
| Footer    | Site Editor → Patterns → Template Parts → Footer |

<?php
/**
 * Template helpers shared by patterns and templates.
 *
 * Centralizes get_theme_mod() lookups with sensible defaults so each pattern
 * doesn't need to know its full default-strings table inline.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Read a theme mod under the bean_and_brew_ namespace.
 *
 * @param string $key      Setting suffix (e.g. 'hero_title').
 * @param mixed  $default  Default value if not set.
 * @return mixed
 */
function bean_and_brew_mod( $key, $default = '' ) {
    return get_theme_mod( 'bean_and_brew_' . $key, $default );
}

/**
 * Boolean visibility check for a section.
 *
 * @param string $section_slug e.g. 'hero', 'story', 'menu', 'location', 'cta'
 * @return bool
 */
function bean_and_brew_is_section_visible( $section_slug ) {
    // Default to true so a fresh activation shows everything.
    return (bool) bean_and_brew_mod( $section_slug . '_visible', true );
}

/**
 * Default-strings table — single source of truth for both the Customizer
 * defaults and the pattern PHP fallbacks. Mirrored in inc/customizer.php.
 */
function bean_and_brew_defaults() {
    return array(
        // Hero
        'hero_visible'              => true,
        'hero_brand'                => 'Bean & Brew',
        'hero_title'                => 'Every Cup Tells a Story',
        'hero_subtitle'             => 'Artisan coffee brewed with love. Beans from small farms, baked fresh daily.',
        'hero_cta_primary_label'    => 'Visit Us',
        'hero_cta_primary_url'      => '#visit',
        'hero_cta_secondary_label'  => 'View Menu',
        'hero_cta_secondary_url'    => '#menu',

        // Story
        'story_visible'             => true,
        'story_title'               => 'Our Story',
        'story_description'         => "Bean & Brew was born from a love of coffee and the belief that the best cup is one made with heart. Since 2018, we've been serving coffee from the finest micro-roasters.",
        'story_value_1'             => 'Quality above all',
        'story_value_2'             => 'Sustainable sourcing',
        'story_value_3'             => 'Local community',
        'story_sticker'             => "100%\nOrganic",

        // Menu (items remain hardcoded in cafe-menu.php; Phase 2 enhancement)
        'menu_visible'              => true,
        'menu_title'                => 'Our Menu',
        'menu_subtitle'             => 'Handcrafted with the finest ingredients',
        'menu_category_coffee'      => 'Coffee',
        'menu_category_tea'         => 'Tea',
        'menu_category_food'        => 'Snacks',
        'menu_category_pastries'    => 'Pastries',

        // Location
        'location_visible'          => true,
        'location_title'            => 'Visit Us',
        'location_address'          => '15 Coffee Lane, London',
        'location_hours'            => 'Mon-Fri: 7:00-20:00 | Sat-Sun: 8:00-18:00',
        'location_directions_url'   => 'https://maps.google.com/',
        'location_map_pin_text'     => 'Find us here!',

        // CTA
        'cta_visible'               => true,
        'cta_title'                 => 'Come share a cup with us',
        'cta_subtitle'              => 'Stop by, slow down, stay a while.',
        'cta_button_label'          => 'Visit Us',
        'cta_button_url'            => '#visit',

        // Images
        'hero_image'                => get_template_directory_uri() . '/assets/images/hero.jpg',
        'story_polaroid_1_image'    => get_template_directory_uri() . '/assets/images/beans.jpg',
        'story_polaroid_2_image'    => get_template_directory_uri() . '/assets/images/latte-art.jpg',
        'story_polaroid_3_image'    => get_template_directory_uri() . '/assets/images/pastry.jpg',

        // Menu items (one per line, "Name | Price | featured")
        'menu_items_coffee'   => "Espresso | 12\nFlat White | 18 | featured\nPour Over | 22 | featured\nCold Brew | 16",
        'menu_items_tea'      => "Matcha Latte | 18 | featured\nEarl Grey | 14\nChai Latte | 16",
        'menu_items_food'     => "Avocado Toast | 28 | featured\nGranola Bowl | 24\nEggs Benedict | 32",
        'menu_items_pastries' => "Croissant | 12\nCinnamon Roll | 14 | featured\nBanana Bread | 10",

        // Footer
        'footer_tagline'         => 'Coffee with passion since 2018',
        'footer_copyright_owner' => 'Bean & Brew. All rights reserved.',
    );
}

/**
 * Lookup with default automatically pulled from bean_and_brew_defaults().
 */
function bean_and_brew_text( $key ) {
    $defaults = bean_and_brew_defaults();
    $default  = isset( $defaults[ $key ] ) ? $defaults[ $key ] : '';
    return bean_and_brew_mod( $key, $default );
}

/**
 * Shortcode: [bean_and_brew_text key="..."] — outputs a customizer string.
 * Used inside template-part HTML (which can't run PHP).
 */
function bean_and_brew_text_shortcode( $atts ) {
    $atts = shortcode_atts( array( 'key' => '' ), $atts );
    if ( empty( $atts['key'] ) ) return '';
    return esc_html( bean_and_brew_text( $atts['key'] ) );
}
add_shortcode( 'bean_and_brew_text', 'bean_and_brew_text_shortcode' );

/**
 * Parse the menu-items textarea for a given category into an array of items.
 *
 * Format (one item per line):
 *   Espresso | 12
 *   Flat White | 18 | featured
 *
 * @param string $category One of 'coffee', 'tea', 'food', 'pastries'.
 * @return array<int, array{name:string, price:string, featured:bool}>
 */
function bean_and_brew_menu_items( $category ) {
    $key   = 'menu_items_' . $category;
    $raw   = bean_and_brew_text( $key );
    $items = array();

    if ( empty( $raw ) ) {
        return $items;
    }

    $lines = preg_split( '/\r?\n/', trim( $raw ) );
    foreach ( $lines as $line ) {
        $line = trim( $line );
        if ( '' === $line ) continue;

        $parts = array_map( 'trim', explode( '|', $line ) );
        if ( count( $parts ) < 2 ) continue; // need at least name + price

        $items[] = array(
            'name'     => (string) $parts[0],
            'price'    => (string) $parts[1],
            'featured' => isset( $parts[2] ) && 'featured' === strtolower( $parts[2] ),
        );
    }

    return $items;
}

<?php
/**
 * Bean & Brew Customizer registration.
 *
 * Adds 5 sections (Hero, Story, Menu, Location, Final CTA) under a
 * top-level "Bean & Brew" panel. Each section exposes a visibility checkbox
 * and text fields for the editable strings.
 *
 * Footer text customization is a Phase 2 enhancement — HTML template parts
 * cannot execute PHP directly. See CHECKPOINT.md for details.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once get_template_directory() . '/inc/template-tags.php';

function bean_and_brew_customize_register( $wp_customize ) {
    $defaults = bean_and_brew_defaults();

    // ---------- Top-level panel ----------
    $wp_customize->add_panel( 'bean_and_brew', array(
        'title'       => __( 'Bean & Brew', 'bean-and-brew' ),
        'description' => __( 'Edit the content and visibility of each homepage section.', 'bean-and-brew' ),
        'priority'    => 30,
    ) );

    // ---------- Helper: register a setting + control pair ----------
    $add_text = function ( $id, $label, $section, $type = 'text' ) use ( $wp_customize, $defaults ) {
        $default = isset( $defaults[ $id ] ) ? $defaults[ $id ] : '';
        $sanitize = ( 'url' === $type ) ? 'esc_url_raw' : 'sanitize_text_field';
        if ( 'textarea' === $type ) { $sanitize = 'sanitize_textarea_field'; }
        $wp_customize->add_setting( 'bean_and_brew_' . $id, array(
            'default'           => $default,
            'sanitize_callback' => $sanitize,
            'transport'         => 'refresh',
        ) );
        $wp_customize->add_control( 'bean_and_brew_' . $id, array(
            'label'   => $label,
            'section' => $section,
            'type'    => $type,
        ) );
    };

    $add_checkbox = function ( $id, $label, $section ) use ( $wp_customize, $defaults ) {
        $default = isset( $defaults[ $id ] ) ? $defaults[ $id ] : true;
        $wp_customize->add_setting( 'bean_and_brew_' . $id, array(
            'default'           => $default,
            'sanitize_callback' => 'wp_validate_boolean',
            'transport'         => 'refresh',
        ) );
        $wp_customize->add_control( 'bean_and_brew_' . $id, array(
            'label'   => $label,
            'section' => $section,
            'type'    => 'checkbox',
        ) );
    };

    // ---------- HERO section ----------
    $wp_customize->add_section( 'bean_and_brew_hero', array(
        'title'    => __( 'Hero', 'bean-and-brew' ),
        'panel'    => 'bean_and_brew',
        'priority' => 10,
    ) );
    $add_checkbox( 'hero_visible',             __( 'Show section', 'bean-and-brew' ),         'bean_and_brew_hero' );
    $add_text(     'hero_brand',               __( 'Brand wordmark', 'bean-and-brew' ),       'bean_and_brew_hero' );
    $add_text(     'hero_title',               __( 'Headline', 'bean-and-brew' ),             'bean_and_brew_hero' );
    $add_text(     'hero_subtitle',            __( 'Subtitle', 'bean-and-brew' ),             'bean_and_brew_hero', 'textarea' );
    $add_text(     'hero_cta_primary_label',   __( 'Primary button label', 'bean-and-brew' ), 'bean_and_brew_hero' );
    $add_text(     'hero_cta_primary_url',     __( 'Primary button URL', 'bean-and-brew' ),   'bean_and_brew_hero', 'url' );
    $add_text(     'hero_cta_secondary_label', __( 'Secondary button label', 'bean-and-brew' ), 'bean_and_brew_hero' );
    $add_text(     'hero_cta_secondary_url',   __( 'Secondary button URL', 'bean-and-brew' ), 'bean_and_brew_hero', 'url' );

    // ---------- STORY section ----------
    $wp_customize->add_section( 'bean_and_brew_story', array(
        'title'    => __( 'Story', 'bean-and-brew' ),
        'panel'    => 'bean_and_brew',
        'priority' => 20,
    ) );
    $add_checkbox( 'story_visible',     __( 'Show section', 'bean-and-brew' ), 'bean_and_brew_story' );
    $add_text(     'story_title',       __( 'Title', 'bean-and-brew' ),        'bean_and_brew_story' );
    $add_text(     'story_description', __( 'Description', 'bean-and-brew' ),  'bean_and_brew_story', 'textarea' );
    $add_text(     'story_value_1',     __( 'Value 1', 'bean-and-brew' ),      'bean_and_brew_story' );
    $add_text(     'story_value_2',     __( 'Value 2', 'bean-and-brew' ),      'bean_and_brew_story' );
    $add_text(     'story_value_3',     __( 'Value 3', 'bean-and-brew' ),      'bean_and_brew_story' );
    $add_text(     'story_sticker',     __( 'Sticker text (use \n for line break)', 'bean-and-brew' ), 'bean_and_brew_story', 'textarea' );

    // ---------- MENU section ----------
    $wp_customize->add_section( 'bean_and_brew_menu', array(
        'title'       => __( 'Menu', 'bean-and-brew' ),
        'description' => __( 'Section heading, category tab labels, and menu items. Items format: "Name | Price | featured" (one per line). The "featured" flag is optional.', 'bean-and-brew' ),
        'panel'       => 'bean_and_brew',
        'priority'    => 30,
    ) );
    $add_checkbox( 'menu_visible',           __( 'Show section', 'bean-and-brew' ),      'bean_and_brew_menu' );
    $add_text(     'menu_title',             __( 'Title', 'bean-and-brew' ),             'bean_and_brew_menu' );
    $add_text(     'menu_subtitle',          __( 'Subtitle', 'bean-and-brew' ),          'bean_and_brew_menu' );
    $add_text(     'menu_category_coffee',   __( 'Category: coffee', 'bean-and-brew' ),  'bean_and_brew_menu' );
    $add_text(     'menu_category_tea',      __( 'Category: tea', 'bean-and-brew' ),     'bean_and_brew_menu' );
    $add_text(     'menu_category_food',     __( 'Category: food', 'bean-and-brew' ),    'bean_and_brew_menu' );
    $add_text(     'menu_category_pastries', __( 'Category: pastries', 'bean-and-brew' ), 'bean_and_brew_menu' );
    $add_text( 'menu_items_coffee',   __( 'Coffee items (one per line, "Name | Price | featured")', 'bean-and-brew' ),   'bean_and_brew_menu', 'textarea' );
    $add_text( 'menu_items_tea',      __( 'Tea items', 'bean-and-brew' ),      'bean_and_brew_menu', 'textarea' );
    $add_text( 'menu_items_food',     __( 'Food items', 'bean-and-brew' ),     'bean_and_brew_menu', 'textarea' );
    $add_text( 'menu_items_pastries', __( 'Pastry items', 'bean-and-brew' ),   'bean_and_brew_menu', 'textarea' );

    // ---------- LOCATION section ----------
    $wp_customize->add_section( 'bean_and_brew_location', array(
        'title'    => __( 'Location', 'bean-and-brew' ),
        'panel'    => 'bean_and_brew',
        'priority' => 40,
    ) );
    $add_checkbox( 'location_visible',        __( 'Show section', 'bean-and-brew' ),   'bean_and_brew_location' );
    $add_text(     'location_title',          __( 'Title', 'bean-and-brew' ),          'bean_and_brew_location' );
    $add_text(     'location_address',        __( 'Address', 'bean-and-brew' ),        'bean_and_brew_location' );
    $add_text(     'location_hours',          __( 'Opening hours', 'bean-and-brew' ),  'bean_and_brew_location' );
    $add_text(     'location_directions_url', __( 'Directions URL', 'bean-and-brew' ), 'bean_and_brew_location', 'url' );
    $add_text(     'location_map_pin_text',   __( 'Map pin caption', 'bean-and-brew' ), 'bean_and_brew_location' );

    // ---------- CTA section ----------
    $wp_customize->add_section( 'bean_and_brew_cta', array(
        'title'    => __( 'Final CTA', 'bean-and-brew' ),
        'panel'    => 'bean_and_brew',
        'priority' => 50,
    ) );
    $add_checkbox( 'cta_visible',      __( 'Show section', 'bean-and-brew' ), 'bean_and_brew_cta' );
    $add_text(     'cta_title',        __( 'Title', 'bean-and-brew' ),        'bean_and_brew_cta' );
    $add_text(     'cta_subtitle',     __( 'Subtitle', 'bean-and-brew' ),     'bean_and_brew_cta' );
    $add_text(     'cta_button_label', __( 'Button label', 'bean-and-brew' ), 'bean_and_brew_cta' );
    $add_text(     'cta_button_url',   __( 'Button URL', 'bean-and-brew' ),   'bean_and_brew_cta', 'url' );

    // ---------- IMAGE controls ----------

    // Hero section: background image
    $wp_customize->add_setting( 'bean_and_brew_hero_image', array(
        'default'           => $defaults['hero_image'],
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'bean_and_brew_hero_image', array(
        'label'    => __( 'Background image', 'bean-and-brew' ),
        'section'  => 'bean_and_brew_hero',
        'settings' => 'bean_and_brew_hero_image',
    ) ) );

    // Story section: 3 polaroid images
    foreach ( array( 1, 2, 3 ) as $i ) {
        $key = "story_polaroid_{$i}_image";
        $wp_customize->add_setting( "bean_and_brew_{$key}", array(
            'default'           => $defaults[ $key ],
            'sanitize_callback' => 'esc_url_raw',
            'transport'         => 'refresh',
        ) );
        $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, "bean_and_brew_{$key}", array(
            'label'    => sprintf( __( 'Polaroid #%d image', 'bean-and-brew' ), $i ),
            'section'  => 'bean_and_brew_story',
            'settings' => "bean_and_brew_{$key}",
        ) ) );
    }

    // ---------- FOOTER section ----------
    $wp_customize->add_section( 'bean_and_brew_footer', array(
        'title'    => __( 'Footer', 'bean-and-brew' ),
        'panel'    => 'bean_and_brew',
        'priority' => 60,
    ) );
    $add_text( 'footer_tagline',         __( 'Tagline (Caveat font, clay color)', 'bean-and-brew' ), 'bean_and_brew_footer' );
    $add_text( 'footer_copyright_owner', __( 'Copyright text after the year', 'bean-and-brew' ),    'bean_and_brew_footer' );
}
add_action( 'customize_register', 'bean_and_brew_customize_register' );

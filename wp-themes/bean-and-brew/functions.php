<?php
/**
 * Bean & Brew theme bootstrap.
 *
 * Block themes get most of their setup from theme.json. This file only
 * handles asset enqueuing and pattern category registration.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! function_exists( 'bean_and_brew_setup' ) ) :
    function bean_and_brew_setup() {
        add_theme_support( 'wp-block-styles' );
        add_theme_support( 'editor-styles' );
        add_theme_support( 'responsive-embeds' );
        add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'title-tag' );

        add_editor_style( 'assets/css/theme.css' );

        load_theme_textdomain( 'bean-and-brew', get_template_directory() . '/languages' );
    }
endif;
add_action( 'after_setup_theme', 'bean_and_brew_setup' );

/**
 * Front-end assets.
 *
 * - theme.css (always): decorative styles theme.json cannot express
 * - menu-tabs.js (front-page only): tab switcher for cafe-menu pattern
 * - reveal.js (front-page only): IntersectionObserver scroll reveals
 */
function bean_and_brew_enqueue_assets() {
    $version = wp_get_theme()->get( 'Version' );

    wp_enqueue_style(
        'bean-and-brew-theme',
        get_template_directory_uri() . '/assets/css/theme.css',
        array(),
        $version
    );

    if ( is_front_page() ) {
        wp_enqueue_script(
            'bean-and-brew-menu-tabs',
            get_template_directory_uri() . '/assets/js/menu-tabs.js',
            array(),
            $version,
            true
        );
        wp_enqueue_script(
            'bean-and-brew-reveal',
            get_template_directory_uri() . '/assets/js/reveal.js',
            array(),
            $version,
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'bean_and_brew_enqueue_assets' );

require_once get_template_directory() . '/inc/block-patterns.php';

/**
 * On theme activation, flag that demo content needs creation.
 * The actual creation runs on init priority 11 (after patterns are registered at priority 9-10).
 */
function bean_and_brew_flag_demo_content_setup() {
    update_option( 'bean_and_brew_needs_demo', 1 );
}
add_action( 'after_switch_theme', 'bean_and_brew_flag_demo_content_setup' );

/**
 * Lazy-create a Home page populated with the cafe patterns expanded into editable blocks,
 * then set it as the static front page. Runs at most once after activation.
 *
 * Also self-heals: if a Home page already exists with EMPTY content, populate it on the fly.
 */
function bean_and_brew_maybe_create_home_page() {
    $needs_demo = get_option( 'bean_and_brew_needs_demo' );

    // Find existing Home (by slug)
    $home = get_page_by_path( 'home' );

    // Self-heal case: page exists but empty
    $is_empty_home = $home && empty( trim( wp_strip_all_tags( $home->post_content ) ) );

    if ( ! $needs_demo && ! $is_empty_home ) {
        return;
    }

    // Build content from registered patterns (registered on init priority 9-10).
    $registry = WP_Block_Patterns_Registry::get_instance();
    $slugs    = array(
        'bean-and-brew/cafe-hero',
        'bean-and-brew/cafe-story',
        'bean-and-brew/cafe-menu',
        'bean-and-brew/cafe-location',
        'bean-and-brew/cafe-cta',
    );

    $content_parts = array();
    foreach ( $slugs as $slug ) {
        $pattern = $registry->get_registered( $slug );
        if ( $pattern && ! empty( $pattern['content'] ) ) {
            $content_parts[] = trim( $pattern['content'] );
        }
    }

    if ( empty( $content_parts ) ) {
        // Patterns not yet available; try again next request.
        return;
    }

    $post_content = implode( "\n\n", $content_parts );

    /*
     * Temporarily remove the kses (content sanitisation) filter so that
     * theme-controlled decorative SVG inside wp:html blocks is preserved
     * exactly as authored.  We re-enable it immediately after saving.
     * This is safe because the content comes entirely from theme pattern
     * files, not from user input.
     */
    kses_remove_filters();

    if ( $home ) {
        // Self-heal existing empty Home page
        wp_update_post( array(
            'ID'           => $home->ID,
            'post_content' => $post_content,
        ) );
        $home_id = $home->ID;
    } else {
        // Fresh creation
        $home_id = wp_insert_post( array(
            'post_title'   => 'Home',
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_name'    => 'home',
            'post_content' => $post_content,
        ) );
    }

    kses_init_filters();

    if ( $home_id && ! is_wp_error( $home_id ) ) {
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $home_id );
    }

    delete_option( 'bean_and_brew_needs_demo' );
}
add_action( 'init', 'bean_and_brew_maybe_create_home_page', 11 );

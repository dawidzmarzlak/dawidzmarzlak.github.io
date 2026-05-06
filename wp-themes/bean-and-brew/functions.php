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
require_once get_template_directory() . '/inc/template-tags.php';
require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/dynamic-blocks.php';

<?php
/**
 * Custom dynamic blocks for content that lives in HTML template parts.
 *
 * Block themes' template parts are .html (no PHP), so anything that needs to
 * read a theme mod at render time must come through a registered block with
 * a render_callback.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once get_template_directory() . '/inc/template-tags.php';

/**
 * Render: footer tagline (Caveat font, clay color, no margin)
 */
function bean_and_brew_render_footer_tagline() {
    $text = bean_and_brew_text( 'footer_tagline' );
    if ( '' === $text ) return '';
    return sprintf(
        '<p class="has-clay-color has-text-color" style="font-family:&quot;Caveat&quot;, cursive;font-size:1.25rem;margin-top:0;margin-bottom:0">%s</p>',
        esc_html( $text )
    );
}

/**
 * Render: footer copyright (right-aligned small text, year auto-prefixed)
 */
function bean_and_brew_render_footer_copyright() {
    $text = bean_and_brew_text( 'footer_copyright_owner' );
    if ( '' === $text ) $text = 'All rights reserved.';
    return sprintf(
        '<p class="has-text-align-right has-small-font-size">&copy; %s %s</p>',
        esc_html( date( 'Y' ) ),
        esc_html( $text )
    );
}

function bean_and_brew_register_dynamic_blocks() {
    register_block_type( 'bean-and-brew/footer-tagline', array(
        'api_version'     => 2,
        'render_callback' => 'bean_and_brew_render_footer_tagline',
    ) );
    register_block_type( 'bean-and-brew/footer-copyright', array(
        'api_version'     => 2,
        'render_callback' => 'bean_and_brew_render_footer_copyright',
    ) );
}
add_action( 'init', 'bean_and_brew_register_dynamic_blocks' );

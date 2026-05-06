<?php
/**
 * Pattern category registration.
 *
 * Pattern *files* under /patterns are auto-registered by WordPress.
 * Here we only register the custom category they are filed under so the
 * inserter groups them together.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function bean_and_brew_register_pattern_categories() {
    register_block_pattern_category(
        'bean-and-brew',
        array(
            'label'       => __( 'Bean & Brew', 'bean-and-brew' ),
            'description' => __( 'Cafe-themed page sections that ship with this theme.', 'bean-and-brew' ),
        )
    );
}
add_action( 'init', 'bean_and_brew_register_pattern_categories' );

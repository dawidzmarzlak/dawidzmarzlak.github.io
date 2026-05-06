<?php
/**
 * Title: Cafe Final CTA
 * Slug: bean-and-brew/cafe-cta
 * Categories: bean-and-brew
 * Description: Centered closing call-to-action with espresso accent.
 * Keywords: cta, contact, conversion
 * Viewport Width: 1400
 */

require_once get_template_directory() . '/inc/template-tags.php';
if ( ! bean_and_brew_is_section_visible( 'cta' ) ) {
    return;
}

$cta_url   = bean_and_brew_text( 'cta_button_url' );
$cta_label = bean_and_brew_text( 'cta_button_label' );
?>
<!-- wp:group {"tagName":"section","className":"cafe-cta","backgroundColor":"cream","style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem","left":"1rem","right":"1rem"}}},"layout":{"type":"constrained","contentSize":"700px"}} -->
<section class="wp-block-group cafe-cta has-cream-background-color has-background" style="padding-top:5rem;padding-right:1rem;padding-bottom:5rem;padding-left:1rem">

    <!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontFamily":"\"DM Serif Display\", Georgia, serif"}},"textColor":"espresso","fontSize":"xx-large"} -->
    <h2 class="wp-block-heading has-text-align-center has-espresso-color has-text-color has-xx-large-font-size" style="font-family:&quot;DM Serif Display&quot;, Georgia, serif"><?php echo esc_html( bean_and_brew_text( 'cta_title' ) ); ?></h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontFamily":"\"Caveat\", cursive","fontSize":"1.75rem"}},"textColor":"clay"} -->
    <p class="has-text-align-center has-clay-color has-text-color" style="font-family:&quot;Caveat&quot;, cursive;font-size:1.75rem"><?php echo esc_html( bean_and_brew_text( 'cta_subtitle' ) ); ?></p>
    <!-- /wp:paragraph -->

    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
        <!-- wp:button {"backgroundColor":"clay","textColor":"cream","url":"<?php echo esc_attr( $cta_url ); ?>","style":{"border":{"radius":"9999px"}}} -->
        <div class="wp-block-button"><a class="wp-block-button__link has-cream-color has-clay-background-color has-text-color has-background wp-element-button" style="border-radius:9999px" href="<?php echo esc_url( $cta_url ); ?>"><?php echo esc_html( $cta_label ); ?></a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->

</section>
<!-- /wp:group -->

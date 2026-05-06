<?php
/**
 * Title: Cafe Hero
 * Slug: bean-and-brew/cafe-hero
 * Categories: bean-and-brew, featured
 * Description: Full-viewport hero with brand wordmark, headline, handwritten subtitle and two pill buttons.
 * Keywords: hero, cafe, landing
 * Block Types: core/post-content
 * Viewport Width: 1400
 */

require_once get_template_directory() . '/inc/template-tags.php';
if ( ! bean_and_brew_is_section_visible( 'hero' ) ) {
    return;
}

$primary_url      = bean_and_brew_text( 'hero_cta_primary_url' );
$primary_label    = bean_and_brew_text( 'hero_cta_primary_label' );
$secondary_url    = bean_and_brew_text( 'hero_cta_secondary_url' );
$secondary_label  = bean_and_brew_text( 'hero_cta_secondary_label' );
?>
<!-- wp:cover {"url":"<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero.jpg' ); ?>","dimRatio":80,"overlayColor":"cream","minHeight":100,"minHeightUnit":"vh","contentPosition":"center center","isDark":false,"className":"cafe-hero","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem","left":"1rem","right":"1rem"}}}} -->
<div class="wp-block-cover is-light cafe-hero" style="padding-top:6rem;padding-right:1rem;padding-bottom:6rem;padding-left:1rem;min-height:100vh">
    <span aria-hidden="true" class="wp-block-cover__background has-cream-background-color has-background-dim-80 has-background-dim"></span>
    <img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero.jpg' ); ?>" data-object-fit="cover"/>

    <div class="wp-block-cover__inner-container">

        <!-- wp:html -->
        <div class="cafe-hero__decor" aria-hidden="true">
            <span class="cafe-hero__dashed-circle"></span>
            <span class="cafe-hero__dots"></span>
            <svg class="cafe-hero__wave" viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,15 Q25,0 50,15 Q75,30 100,15 Q125,0 150,15 Q175,30 200,15" fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>
        </div>
        <!-- /wp:html -->

        <!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
        <div class="wp-block-group">

            <!-- wp:image {"width":"80px","height":"80px","scale":"contain","sizeSlug":"thumbnail","align":"center","className":"cafe-hero__icon"} -->
            <figure class="wp-block-image aligncenter size-thumbnail is-resized cafe-hero__icon">
                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/coffee-icon.svg' ); ?>" alt="" style="object-fit:contain;width:80px;height:80px"/>
            </figure>
            <!-- /wp:image -->

            <!-- wp:paragraph {"align":"center","style":{"typography":{"fontFamily":"\"DM Serif Display\", Georgia, serif","letterSpacing":"0.2em","textTransform":"uppercase","fontSize":"1.25rem"}},"textColor":"espresso"} -->
            <p class="has-text-align-center has-espresso-color has-text-color" style="font-family:&quot;DM Serif Display&quot;, Georgia, serif;font-size:1.25rem;letter-spacing:0.2em;text-transform:uppercase"><?php echo esc_html( bean_and_brew_text( 'hero_brand' ) ); ?></p>
            <!-- /wp:paragraph -->

            <!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontFamily":"\"DM Serif Display\", Georgia, serif","lineHeight":"1.1"}},"textColor":"espresso","fontSize":"hero"} -->
            <h1 class="wp-block-heading has-text-align-center has-espresso-color has-text-color has-hero-font-size" style="font-family:&quot;DM Serif Display&quot;, Georgia, serif;line-height:1.1"><?php echo esc_html( bean_and_brew_text( 'hero_title' ) ); ?></h1>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"align":"center","style":{"typography":{"fontFamily":"\"Caveat\", cursive","fontSize":"clamp(1.5rem, 3vw, 2rem)"}},"textColor":"clay"} -->
            <p class="has-text-align-center has-clay-color has-text-color" style="font-family:&quot;Caveat&quot;, cursive;font-size:clamp(1.5rem, 3vw, 2rem)"><?php echo esc_html( bean_and_brew_text( 'hero_subtitle' ) ); ?></p>
            <!-- /wp:paragraph -->

            <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"blockGap":"1rem","margin":{"top":"2rem"}}}} -->
            <div class="wp-block-buttons" style="margin-top:2rem">
                <?php
                // NOTE: The url value in the wp:button JSON comment is set to match the runtime <a href>
                // so there is no conflict between the block attribute and the rendered anchor.
                ?>
                <!-- wp:button {"backgroundColor":"espresso","textColor":"cream","url":"<?php echo esc_attr( $primary_url ); ?>","style":{"border":{"radius":"9999px"},"spacing":{"padding":{"top":"1rem","right":"2rem","bottom":"1rem","left":"2rem"}}}} -->
                <div class="wp-block-button"><a class="wp-block-button__link has-cream-color has-espresso-background-color has-text-color has-background wp-element-button" href="<?php echo esc_url( $primary_url ); ?>" style="border-radius:9999px;padding-top:1rem;padding-right:2rem;padding-bottom:1rem;padding-left:2rem"><?php echo esc_html( $primary_label ); ?></a></div>
                <!-- /wp:button -->

                <!-- wp:button {"textColor":"espresso","className":"is-style-outline","url":"<?php echo esc_attr( $secondary_url ); ?>","style":{"border":{"radius":"9999px","width":"2px","color":"#5C4033"},"spacing":{"padding":{"top":"1rem","right":"2rem","bottom":"1rem","left":"2rem"}}}} -->
                <div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-espresso-color has-text-color has-border-color wp-element-button" href="<?php echo esc_url( $secondary_url ); ?>" style="border-color:#5C4033;border-width:2px;border-radius:9999px;padding-top:1rem;padding-right:2rem;padding-bottom:1rem;padding-left:2rem"><?php echo esc_html( $secondary_label ); ?></a></div>
                <!-- /wp:button -->
            </div>
            <!-- /wp:buttons -->

        </div>
        <!-- /wp:group -->

    </div>
</div>
<!-- /wp:cover -->

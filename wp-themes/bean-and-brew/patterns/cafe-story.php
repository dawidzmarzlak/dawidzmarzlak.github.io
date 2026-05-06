<?php
/**
 * Title: Cafe Story
 * Slug: bean-and-brew/cafe-story
 * Categories: bean-and-brew
 * Description: Two-column "our story" section with rotated polaroid images and a values list.
 * Keywords: story, about, polaroid
 * Viewport Width: 1400
 */
?>
<!-- wp:group {"tagName":"section","className":"cafe-story","backgroundColor":"white","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem","left":"1rem","right":"1rem"}}},"layout":{"type":"constrained","contentSize":"1200px"},"anchor":"story"} -->
<section id="story" class="wp-block-group cafe-story has-white-background-color has-background" style="padding-top:6rem;padding-right:1rem;padding-bottom:6rem;padding-left:1rem">

    <!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"4rem","left":"4rem"}}}} -->
    <div class="wp-block-columns are-vertically-aligned-center">

        <!-- wp:column {"verticalAlignment":"center","width":"50%","className":"cafe-story__polaroids"} -->
        <div class="wp-block-column is-vertically-aligned-center cafe-story__polaroids" style="flex-basis:50%">

            <figure class="cafe-story__polaroid cafe-story__polaroid--1">
                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/beans.jpg' ); ?>" alt="Coffee beans"/>
                <figcaption>Est. 2018</figcaption>
            </figure>

            <figure class="cafe-story__polaroid cafe-story__polaroid--2">
                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/latte-art.jpg' ); ?>" alt="Latte art"/>
                <figcaption>Fresh daily</figcaption>
            </figure>

            <figure class="cafe-story__polaroid cafe-story__polaroid--3">
                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/pastry.jpg' ); ?>" alt="Fresh pastries"/>
                <figcaption>Made with love</figcaption>
            </figure>

            <span class="cafe-story__sticker" aria-hidden="true">100%<br>Organic</span>

        </div>
        <!-- /wp:column -->

        <!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">

            <!-- wp:heading {"level":2,"style":{"typography":{"fontFamily":"\"DM Serif Display\", Georgia, serif"}},"textColor":"espresso","fontSize":"xx-large"} -->
            <h2 class="wp-block-heading has-espresso-color has-text-color has-xx-large-font-size" style="font-family:&quot;DM Serif Display&quot;, Georgia, serif">Our Story</h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"textColor":"muted","fontSize":"medium"} -->
            <p class="has-muted-color has-text-color has-medium-font-size" style="line-height:1.7">Bean &amp; Brew was born from a love of coffee and the belief that the best cup is one made with heart. Since 2018, we've been serving coffee from the finest micro-roasters.</p>
            <!-- /wp:paragraph -->

            <!-- wp:list {"className":"cafe-story__values"} -->
            <ul class="wp-block-list cafe-story__values">
                <li><span class="cafe-story__value-icon" aria-hidden="true">♥</span>Quality above all</li>
                <li><span class="cafe-story__value-icon" aria-hidden="true">🌱</span>Sustainable sourcing</li>
                <li><span class="cafe-story__value-icon" aria-hidden="true">👥</span>Local community</li>
            </ul>
            <!-- /wp:list -->

        </div>
        <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

</section>
<!-- /wp:group -->

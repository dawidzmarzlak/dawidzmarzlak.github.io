<?php
/**
 * Title: Cafe Location
 * Slug: bean-and-brew/cafe-location
 * Categories: bean-and-brew
 * Description: Two-column location section with illustrated map placeholder and address info.
 * Keywords: location, contact, map
 * Viewport Width: 1400
 */
?>
<!-- wp:group {"tagName":"section","className":"cafe-location","backgroundColor":"beige","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem","left":"1rem","right":"1rem"}}},"layout":{"type":"constrained","contentSize":"1200px"},"anchor":"visit"} -->
<section id="visit" class="wp-block-group cafe-location has-beige-background-color has-background" style="padding-top:6rem;padding-right:1rem;padding-bottom:6rem;padding-left:1rem">

    <!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"3rem","left":"3rem"}}}} -->
    <div class="wp-block-columns are-vertically-aligned-center">

        <!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
            <!-- wp:html -->
            <div class="cafe-location__map" aria-hidden="true">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="cafe-location__map-roads">
                    <path d="M0,50 L100,50" stroke="#5C4033" stroke-width="2" opacity="0.1"/>
                    <path d="M50,0 L50,100" stroke="#5C4033" stroke-width="2" opacity="0.1"/>
                    <path d="M0,30 L100,30" stroke="#5C4033" stroke-width="1" stroke-dasharray="4" opacity="0.1"/>
                    <path d="M0,70 L100,70" stroke="#5C4033" stroke-width="1" stroke-dasharray="4" opacity="0.1"/>
                </svg>
                <div class="cafe-location__map-pin">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C65D3B" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p>Find us here!</p>
                </div>
            </div>
            <!-- /wp:html -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
        <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">

            <!-- wp:heading {"level":2,"style":{"typography":{"fontFamily":"\"DM Serif Display\", Georgia, serif"}},"textColor":"espresso","fontSize":"xx-large"} -->
            <h2 class="wp-block-heading has-espresso-color has-text-color has-xx-large-font-size" style="font-family:&quot;DM Serif Display&quot;, Georgia, serif">Visit Us</h2>
            <!-- /wp:heading -->

            <!-- wp:list {"className":"cafe-location__info"} -->
            <ul class="wp-block-list cafe-location__info">
                <li><strong>Address</strong><br>15 Coffee Lane, London</li>
                <li><strong>Hours</strong><br>Mon-Fri: 7:00-20:00 | Sat-Sun: 8:00-18:00</li>
            </ul>
            <!-- /wp:list -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons">
                <!-- wp:button {"backgroundColor":"espresso","textColor":"cream","style":{"border":{"radius":"9999px"}}} -->
                <div class="wp-block-button"><a class="wp-block-button__link has-cream-color has-espresso-background-color has-text-color has-background wp-element-button" style="border-radius:9999px" href="https://maps.google.com/">Get Directions</a></div>
                <!-- /wp:button -->
            </div>
            <!-- /wp:buttons -->

        </div>
        <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

</section>
<!-- /wp:group -->

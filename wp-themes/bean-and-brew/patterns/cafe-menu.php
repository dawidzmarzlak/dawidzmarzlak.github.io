<?php
/**
 * Title: Cafe Menu (chalkboard with tabs)
 * Slug: bean-and-brew/cafe-menu
 * Categories: bean-and-brew
 * Description: Chalkboard-style menu with category tabs (coffee, tea, food, pastries).
 * Keywords: menu, tabs, chalkboard
 * Viewport Width: 1400
 */

require_once get_template_directory() . '/inc/template-tags.php';
if ( ! bean_and_brew_is_section_visible( 'menu' ) ) {
    return;
}

$categories = array();
foreach ( array(
    'coffee'   => bean_and_brew_text( 'menu_category_coffee' ),
    'tea'      => bean_and_brew_text( 'menu_category_tea' ),
    'food'     => bean_and_brew_text( 'menu_category_food' ),
    'pastries' => bean_and_brew_text( 'menu_category_pastries' ),
) as $slug => $label ) {
    $items = bean_and_brew_menu_items( $slug );
    if ( empty( $items ) ) {
        continue; // hide empty categories
    }
    $categories[ $slug ] = array(
        'label' => $label,
        'items' => $items,
    );
}
?>
<!-- wp:group {"tagName":"section","className":"cafe-menu","backgroundColor":"espresso","textColor":"cream","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem","left":"1rem","right":"1rem"}}},"layout":{"type":"constrained","contentSize":"1200px"},"anchor":"menu"} -->
<section id="menu" class="wp-block-group cafe-menu has-cream-color has-espresso-background-color has-text-color has-background" style="padding-top:6rem;padding-right:1rem;padding-bottom:6rem;padding-left:1rem">

    <!-- wp:html -->
    <div class="cafe-menu__chalkboard">

        <header class="cafe-menu__header">
            <h2><?php echo esc_html( bean_and_brew_text( 'menu_title' ) ); ?></h2>
            <p class="cafe-menu__subtitle"><?php echo esc_html( bean_and_brew_text( 'menu_subtitle' ) ); ?></p>
        </header>

        <div class="cafe-menu__tabs" role="tablist" aria-label="Menu categories">
            <?php $first = true; foreach ( $categories as $slug => $cat ) : ?>
                <button
                    type="button"
                    role="tab"
                    class="cafe-menu__tab<?php echo $first ? ' is-active' : ''; ?>"
                    data-category="<?php echo esc_attr( $slug ); ?>"
                    aria-selected="<?php echo $first ? 'true' : 'false'; ?>"
                    tabindex="<?php echo $first ? '0' : '-1'; ?>"
                    aria-controls="cafe-menu-panel-<?php echo esc_attr( $slug ); ?>"
                    id="cafe-menu-tab-<?php echo esc_attr( $slug ); ?>"
                ><?php echo esc_html( $cat['label'] ); ?></button>
            <?php $first = false; endforeach; ?>
        </div>

        <?php $first = true; foreach ( $categories as $slug => $cat ) : ?>
            <ul
                class="cafe-menu__items<?php echo $first ? ' is-active' : ''; ?>"
                role="tabpanel"
                id="cafe-menu-panel-<?php echo esc_attr( $slug ); ?>"
                aria-labelledby="cafe-menu-tab-<?php echo esc_attr( $slug ); ?>"
                data-category="<?php echo esc_attr( $slug ); ?>"
                <?php echo $first ? '' : 'hidden'; ?>
            >
                <?php foreach ( $cat['items'] as $item ) : ?>
                    <li class="cafe-menu__item">
                        <span class="cafe-menu__item-name">
                            <?php echo esc_html( $item['name'] ); ?>
                            <?php if ( ! empty( $item['featured'] ) ) : ?>
                                <span class="cafe-menu__badge">Featured</span>
                            <?php endif; ?>
                        </span>
                        <span class="cafe-menu__leader" aria-hidden="true"></span>
                        <span class="cafe-menu__price">$<?php echo esc_html( $item['price'] ); ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php $first = false; endforeach; ?>

    </div>
    <!-- /wp:html -->

</section>
<!-- /wp:group -->

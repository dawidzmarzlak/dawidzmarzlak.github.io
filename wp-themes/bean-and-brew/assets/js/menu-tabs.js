/**
 * Bean & Brew — menu tab switcher.
 *
 * Targets DOM produced by patterns/cafe-menu.php:
 *   .cafe-menu__tab[data-category]   → buttons
 *   .cafe-menu__items[data-category] → panels
 *
 * Activating a tab:
 *  - flips .is-active on tabs
 *  - flips aria-selected on tabs
 *  - shows the matching panel, hides the others (using [hidden] attribute)
 */
(function () {
    'use strict';

    function init(scope) {
        var tabs = scope.querySelectorAll('.cafe-menu__tab[data-category]');
        var panels = scope.querySelectorAll('.cafe-menu__items[data-category]');
        if (!tabs.length || !panels.length) return;

        function activate(category) {
            tabs.forEach(function (t) {
                var match = t.dataset.category === category;
                t.classList.toggle('is-active', match);
                t.setAttribute('aria-selected', match ? 'true' : 'false');
            });
            panels.forEach(function (p) {
                var match = p.dataset.category === category;
                p.classList.toggle('is-active', match);
                if (match) { p.removeAttribute('hidden'); }
                else       { p.setAttribute('hidden', ''); }
            });
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () { activate(tab.dataset.category); });
        });
    }

    function ready(fn) {
        if (document.readyState !== 'loading') { fn(); }
        else { document.addEventListener('DOMContentLoaded', fn); }
    }

    ready(function () {
        document.querySelectorAll('.cafe-menu').forEach(init);
    });
})();

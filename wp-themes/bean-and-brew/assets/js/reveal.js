/**
 * Bean & Brew — scroll reveal.
 *
 * Adds .reveal to top-level sections at startup, then toggles
 * .is-visible on first viewport entry (15% threshold).
 *
 * Respects prefers-reduced-motion: makes everything visible immediately.
 */
(function () {
    'use strict';

    var SECTIONS = '.cafe-story, .cafe-menu, .cafe-location, .cafe-cta';

    function ready(fn) {
        if (document.readyState !== 'loading') { fn(); }
        else { document.addEventListener('DOMContentLoaded', fn); }
    }

    ready(function () {
        var sections = document.querySelectorAll(SECTIONS);
        if (!sections.length) return;

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || !('IntersectionObserver' in window)) {
            sections.forEach(function (s) { s.classList.add('reveal', 'is-visible'); });
            return;
        }

        sections.forEach(function (s) { s.classList.add('reveal'); });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(function (s) { observer.observe(s); });
    });
})();

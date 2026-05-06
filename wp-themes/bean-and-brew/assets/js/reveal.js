/**
 * Bean & Brew — scroll reveal.
 *
 * Adds .reveal to top-level sections at startup, then toggles
 * .is-visible on first viewport entry (15% threshold, 100px pre-trigger).
 *
 * Safeguards:
 *  - prefers-reduced-motion: reveals immediately
 *  - no IntersectionObserver: reveals immediately
 *  - 1500ms fail-safe: any section still hidden after 1.5s is force-revealed
 *    (covers full-page screenshot flows and observer edge cases)
 */
(function () {
    'use strict';

    var SECTIONS = '.cafe-story, .cafe-menu, .cafe-location, .cafe-cta';
    var FAILSAFE_MS = 1500;

    function ready(fn) {
        if (document.readyState !== 'loading') { fn(); }
        else { document.addEventListener('DOMContentLoaded', fn); }
    }

    function revealAll(sections) {
        sections.forEach(function (s) { s.classList.add('reveal', 'is-visible'); });
    }

    ready(function () {
        var sections = document.querySelectorAll(SECTIONS);
        if (!sections.length) return;

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || !('IntersectionObserver' in window)) {
            revealAll(sections);
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
        }, { threshold: 0.15, rootMargin: '0px 0px 100px 0px' });

        sections.forEach(function (s) { observer.observe(s); });

        // Fail-safe: anything still hidden after 1500ms is force-revealed.
        // Catches full-page screenshot flows, observer edge cases, and JS-but-no-IO browsers.
        setTimeout(function () {
            sections.forEach(function (s) {
                if (!s.classList.contains('is-visible')) {
                    s.classList.add('is-visible');
                }
            });
        }, FAILSAFE_MS);
    });
})();

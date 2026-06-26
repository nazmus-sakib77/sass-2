/* =========================================================================
   framer-scroll.js — scroll-reveal, parallax & count-up for Elementor
   -------------------------------------------------------------------------
   Add to: WPCode / Insert Headers & Footers (Footer), or
           Elementor Pro → Custom Code → End of <body>.
   Wrap in <script> ... </script> if your tool doesn't add tags for you.

   It powers three CSS-class hooks you put on Elementor widgets
   (Advanced → CSS Classes):

     .fm-reveal   → fades/slides in when scrolled into view
     .fm-parallax → drifts vertically as you scroll (depth effect)
     .fm-count    → number counts up from 0 to its final value once visible

   No dependencies. Plays nicely if loaded more than once. Honors
   prefers-reduced-motion. ~2KB.
   ========================================================================= */
(function () {
  "use strict";

  // Avoid double-init if the snippet is injected twice.
  if (window.__fmScrollInit) return;
  window.__fmScrollInit = true;

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------- */
  /* 1. Scroll reveal                                                        */
  /* ---------------------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll(".fm-reveal");
    if (!els.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // reveal once, then stop watching
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------- */
  /* 2. Parallax drift                                                       */
  /* Data attr `data-fm-speed` controls strength (default 0.18).            */
  /* Negative = moves opposite the scroll.                                   */
  /* ---------------------------------------------------------------------- */
  function initParallax() {
    var els = [].slice.call(document.querySelectorAll(".fm-parallax"));
    if (!els.length || reduceMotion) return;

    var ticking = false;

    function update() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        // progress: -1 (below viewport) → 0 (centered) → 1 (above)
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        var speed = parseFloat(el.getAttribute("data-fm-speed")) || 0.18;
        el.style.transform =
          "translate3d(0," + (-progress * speed * 100).toFixed(2) + "px,0)";
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------- */
  /* 3. Count-up numbers                                                     */
  /* Put the final number as the element's text, e.g. "1200" or "98%".      */
  /* Optional data-fm-duration (ms, default 1600).                          */
  /* ---------------------------------------------------------------------- */
  function initCount() {
    var els = document.querySelectorAll(".fm-count");
    if (!els.length) return;

    function run(el) {
      var raw = el.textContent.trim();
      var match = raw.match(/([\d.,]+)/);
      if (!match) return;

      var target = parseFloat(match[1].replace(/,/g, ""));
      var prefix = raw.slice(0, match.index);
      var suffix = raw.slice(match.index + match[1].length);
      var decimals = (match[1].split(".")[1] || "").length;
      var duration = parseInt(el.getAttribute("data-fm-duration"), 10) || 1600;

      if (reduceMotion) { el.textContent = raw; return; }

      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        // easeOutCubic for a natural settle
        var eased = 1 - Math.pow(1 - p, 3);
        var val = (target * eased).toFixed(decimals);
        el.textContent =
          prefix + Number(val).toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      els.forEach(run);
      return;
    }

    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------- */
  function init() {
    initReveal();
    initParallax();
    initCount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Elementor re-renders widgets in the editor — re-scan on frontend init.
  if (window.jQuery) {
    window.jQuery(window).on("elementor/frontend/init", function () {
      setTimeout(init, 200);
    });
  }
})();

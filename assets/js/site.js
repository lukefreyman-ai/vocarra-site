/* Vocarra site motion.
 *
 * Everything here is decoration. The page is readable and complete with
 * JavaScript off: elements start visible in the stylesheet and this file only
 * takes over once it knows it can finish the job. That ordering matters on a
 * page whose first paint is the whole product.
 */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  if (!hasGsap || reduce) return;

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* Smooth scroll. Lenis drives ScrollTrigger rather than running beside it,
     otherwise the two disagree about where the page is and reveals fire early. */
  if (typeof window.Lenis !== "undefined") {
    var lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", window.ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  document.documentElement.classList.add("js");

  /* ── hero ─────────────────────────────────────────────────────────────── */
  var hero = gsap.timeline({ defaults: { ease: "expo.out" } });
  hero.from(".hero__mark", { scale: 1.08, autoAlpha: 0, duration: 1.6 })
      .from(".hero__rail > *", { yPercent: 110, autoAlpha: 0, stagger: 0.06, duration: 1.1 }, 0.1);

  if (typeof window.SplitText !== "undefined") {
    var split = new window.SplitText(".hero__word", { type: "chars" });
    hero.from(split.chars, {
      yPercent: 115, autoAlpha: 0, stagger: 0.035, duration: 1.3
    }, 0.25);
  } else {
    hero.from(".hero__word", { yPercent: 40, autoAlpha: 0, duration: 1.3 }, 0.25);
  }
  hero.from(".hero__say", { y: 26, autoAlpha: 0, duration: 1.2 }, 0.75);

  /* ── scroll reveals ───────────────────────────────────────────────────── */
  gsap.utils.toArray("[data-rise]").forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 88%" },
      y: 34, autoAlpha: 0, duration: 1.1, ease: "expo.out"
    });
  });

  /* The statement reads a word at a time as it crosses the screen, which is the
     one place on the page where the scroll position is doing the pacing. */
  var statement = document.querySelector(".statement__text");
  if (statement && typeof window.SplitText !== "undefined") {
    var words = new window.SplitText(statement, { type: "words" }).words;
    gsap.set(words, { opacity: 0.16 });
    gsap.to(words, {
      opacity: 1, ease: "none", stagger: 1,
      scrollTrigger: {
        trigger: statement, start: "top 78%", end: "bottom 42%", scrub: 0.6
      }
    });
  }

  /* ── hairlines draw themselves in ─────────────────────────────────────── */
  gsap.utils.toArray("[data-draw]").forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 92%" },
      scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "expo.out"
    });
  });

  /* ── marquee ──────────────────────────────────────────────────────────── */
  var track = document.querySelector(".marquee__track");
  if (track) {
    // The markup carries the strip twice, so moving exactly half the track and
    // wrapping is seamless at any width without measuring anything.
    gsap.to(track, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
  }

  /* ── the bone panel lifts as it arrives ───────────────────────────────── */
  var cta = document.querySelector(".cta");
  if (cta) {
    gsap.from(cta, {
      scrollTrigger: { trigger: cta, start: "top 95%" },
      yPercent: 6, autoAlpha: 0, duration: 1.2, ease: "expo.out"
    });
  }
})();

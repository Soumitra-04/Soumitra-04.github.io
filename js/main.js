(function () {
  'use strict';

  window.__srPortfolioReady = true;

  var docEl = document.documentElement;

  /* ---------- theme ---------- */

  var themeToggle = document.getElementById('theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    docEl.setAttribute('data-theme', theme);
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'light' ? '#f6f7f9' : '#0a0b0f');
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
  }

  applyTheme(docEl.getAttribute('data-theme') || 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = docEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try {
        localStorage.setItem('sr-theme', next);
      } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- header shadow ---------- */

  var header = document.getElementById('site-header');

  function onScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile navigation ---------- */

  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');

  function setNav(open) {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    siteNav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setNav(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setNav(false);
    });
  }

  /* ---------- active section highlighting ---------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === id);
          });
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- reveal on scroll ---------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function showAll() {
    revealItems.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    showAll();
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  window.addEventListener('load', function () {
    revealItems.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('is-visible');
    });
  });

  /* ---------- footer year ---------- */

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

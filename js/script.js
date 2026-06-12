/* ===============================
   Interacciones globales
   Autor: Sebastian Andres Muñoz Fernandez
   =============================== */

(function () {
  const STORAGE_KEY = 'site_lang';

  function applyLanguage(lang) {
    const supported = ['es', 'en'];
    const currentLang = supported.includes(lang) ? lang : 'es';

    document.querySelectorAll('[data-lang]').forEach((el) => {
      el.classList.toggle('d-none', el.getAttribute('data-lang') !== currentLang);
    });

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      const active = btn.getAttribute('data-set-lang') === currentLang;
      btn.classList.toggle('btn-light', active);
      btn.classList.toggle('btn-outline-light', !active);
      btn.classList.toggle('btn-outline-secondary', !active);
      btn.setAttribute('aria-pressed', String(active));
    });

    localStorage.setItem(STORAGE_KEY, currentLang);
    document.documentElement.setAttribute('lang', currentLang);
  }

  function setupLanguageToggle() {
    const initialLang = localStorage.getItem(STORAGE_KEY) || 'es';
    applyLanguage(initialLang);

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-set-lang'));
      });
    });
  }

  function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 280 ? 'inline-flex' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function setupActiveMenu() {
    const links = document.querySelectorAll('.nav-link[data-page]');
    const current = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach((link) => {
      const page = link.getAttribute('data-page');
      const isIndexAlias = current === '' || current === 'index.html';
      const shouldActivate = page === current || (isIndexAlias && page === 'index.html');
      if (shouldActivate) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function setupFadeIn() {
    const items = document.querySelectorAll('.fade-in-up');
    if (!('IntersectionObserver' in window) || !items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach((item) => {
      item.style.visibility = 'hidden';
      observer.observe(item);
    });
  }

  function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupLanguageToggle();
    setupBackToTop();
    setupActiveMenu();
    setupFadeIn();
    setupSmoothAnchors();
  });
})();

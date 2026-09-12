/* ============================================================
   2812 Thrasher Lane — Site JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLightbox();
  initContactForm();
  initScrollAnimations();
  initNavActiveLinks();
});

/* ============================================================
   NAV — sticky shadow + mobile hamburger + active section
   ============================================================ */
function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.nav-hamburger');

  // Sticky shadow on scroll
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile overlay menu
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = overlay?.querySelector('.mobile-overlay-close');

  const openMenu = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ============================================================
   NAV ACTIVE LINKS — highlight current section
   ============================================================ */
function initNavActiveLinks() {
  const sections = document.querySelectorAll('section[id], div[id="map"]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navAnchors.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
  });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   GLIGHTBOX — photo gallery
   ============================================================ */
function initLightbox() {
  if (typeof GLightbox === 'undefined') return;

  GLightbox({
    selector: '[data-gallery="property"]',
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    openEffect: 'fade',
    closeEffect: 'fade',
    slideEffect: 'slide',
    moreLength: 0,
    svg: {
      close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    },
  });
}

/* ============================================================
   CONTACT FORM — AJAX + thank-you message
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !successEl || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });

      if (res.ok) {
        form.hidden = true;
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.errors?.map(e => e.message).join(', ')
                    || 'Something went wrong. Please email jessica.hooley@cbrealty.com directly.';
        showFormError(form, msg);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request a Showing';
      }
    } catch (_) {
      showFormError(form, 'Network error. Please try again or email jessica.hooley@cbrealty.com directly.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request a Showing';
    }
  });
}

function validateForm(form) {
  let valid = true;
  clearFormErrors(form);

  const name = form.querySelector('#name');
  const email = form.querySelector('#email');

  if (!name.value.trim()) {
    markFieldError(name, 'Please enter your name.');
    valid = false;
  }

  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    markFieldError(email, 'Please enter a valid email address.');
    valid = false;
  }

  return valid;
}

function markFieldError(field, msg) {
  field.style.borderColor = '#c62828';
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  err.style.cssText = 'color:#c62828;font-size:0.78rem;margin-top:0.2rem;display:block;';
  err.setAttribute('role', 'alert');
  field.parentNode.appendChild(err);
}

function clearFormErrors(form) {
  form.querySelectorAll('.field-error').forEach(e => e.remove());
  form.querySelectorAll('input, textarea').forEach(f => f.style.borderColor = '');
}

function showFormError(form, msg) {
  let el = form.querySelector('.form-error-global');
  if (!el) {
    el = document.createElement('div');
    el.className = 'form-error-global';
    el.style.cssText = 'background:#fdecea;color:#c62828;padding:0.75rem 1rem;border-radius:4px;font-size:0.875rem;margin-top:0.75rem;';
    el.setAttribute('role', 'alert');
    form.appendChild(el);
  }
  el.textContent = msg;
}

/* ============================================================
   SCROLL ANIMATIONS — fade in on enter (intersection observer)
   ============================================================ */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll(
    '.highlight-card, .agent-card, .gallery-item'
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger within a batch based on DOM order mod 4
        const delay = (Array.from(targets).indexOf(entry.target) % 4) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => observer.observe(t));
}

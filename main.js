/* =======================================================
   Google Analytics bootstrap
   ======================================================= */
window.dataLayer = window.dataLayer || [];
function gtag () { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-33M73GFVGG');

/* =======================================================
   Simple language switcher
   ======================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const toggle    = document.getElementById('toggle-lang');
  const toggleTxt = document.getElementById('toggle-text');

  /** Apply language state */
  function applyLang (arabic) {
    // body direction & <html lang>
    document.body.classList.toggle('rtl', arabic);
    document.documentElement.lang = arabic ? 'ar' : 'en';

    // toggle text blocks
    document.querySelectorAll('.lang-en')
      .forEach(el => el.classList.toggle('hidden', arabic));
    document.querySelectorAll('.lang-ar')
      .forEach(el => el.classList.toggle('hidden', !arabic));

    // button label
    if (toggleTxt) {
      toggleTxt.textContent = arabic
        ? 'English Version'
        : 'النسخة العربية';
    }
  }

  /* ---- initial state (English) ---- */
  applyLang(false);

  /* ---- click handler ---- */
  if (toggle) {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const switchToArabic = !document.body.classList.contains('rtl');
      applyLang(switchToArabic);
    });
  }

  /* =====================================================
     Formspree handler
     ===================================================== */
  const form = document.querySelector('form');
  const msg  = document.getElementById('form-message');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method : form.method,
          body   : data,
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          if (msg) msg.style.display = 'block';
        } else {
          alert(document.body.classList.contains('rtl')
            ? 'حدث خطأ. حاول مرة أخرى.'
            : 'Oops! Something went wrong.');
        }
      } catch {
        alert(document.body.classList.contains('rtl')
          ? 'مشكلة في الاتصال. حاول لاحقاً.'
          : 'Network error. Try again later.');
      }
    });
  }
});

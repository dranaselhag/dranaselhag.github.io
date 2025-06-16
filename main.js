/* =========================================================
   main.js – contact form + language switcher
   ========================================================= */
console.log('✅ main.js loaded');

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Google Analytics stub ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-33M73GFVGG');

  /* ---------- simple language switcher ---------- */
  const toggle   = document.getElementById('toggle-lang');
  const toggleTx = document.getElementById('toggle-text');

  function switchLang () {
    const makeArabic = !document.body.classList.contains('rtl');

    /* flip body dir + <html lang> */
    document.body.classList.toggle('rtl', makeArabic);
    document.documentElement.lang = makeArabic ? 'ar' : 'en';

    /* show/hide nodes */
    document.querySelectorAll('.lang-en')
            .forEach(el => el.classList.toggle('hidden', makeArabic));
    document.querySelectorAll('.lang-ar')
            .forEach(el => el.classList.toggle('hidden', !makeArabic));

    /* button label */
    toggleTx.textContent = makeArabic ? 'English Version'
                                      : 'النسخة العربية';
									  
	/* placeholders (English ↔ Arabic) */
    document.querySelectorAll('#contact-form [data-placeholder-ar]')
            .forEach(el => {
              /* save EN once */
              if (!el.dataset.placeholderEn) {
                el.dataset.placeholderEn = el.placeholder;
              }
              el.placeholder = makeArabic ? el.dataset.placeholderAr
                                          : el.dataset.placeholderEn;
            });
  }
  if (toggle) toggle.addEventListener('click', e => {
    e.preventDefault();
    switchLang();
  });

  /* ---------- Formspree handler ---------- */
  const form = document.getElementById('contact-form');
  const msg  = document.getElementById('form-message');

  if (!form) {
    console.warn('❌ No form element found');
    return;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    console.log('📨 Submitting form…');

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body:   data,
        headers:{ 'Accept':'application/json' }
      });

      console.log('🔵 Response status:', res.status);
      if (res.ok) {
        form.reset();
        msg.style.display = 'block';
        console.log('✅ Message sent!');
      } else {
        alert(document.body.classList.contains('rtl')
              ? 'حدث خطأ. حاول مرة أخرى.'
              : 'Oops! Something went wrong.');
      }
    } catch (err) {
      alert(document.body.classList.contains('rtl')
            ? 'مشكلة في الاتصال. حاول لاحقاً.'
            : 'Network error. Try again later.');
      console.error(err);
    }
  });
});

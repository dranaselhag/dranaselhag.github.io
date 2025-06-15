/* Google Analytics bootstrap */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-33M73GFVGG');

/* ========= simple language switcher ========= */
const toggle   = document.getElementById('toggle-lang');
const toggleTx = document.getElementById('toggle-text');

function switchLang () {
  const makeArabic = !document.body.classList.contains('rtl');

  /* flip body dir + <html lang> */
  document.body.classList.toggle('rtl', makeArabic);
  document.documentElement.lang = makeArabic ? 'ar' : 'en';

  /* show/hide nodes */
  document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', makeArabic));
  document.querySelectorAll('.lang-ar').forEach(el => el.classList.toggle('hidden', !makeArabic));

  /* button label */
  toggleTx.textContent = makeArabic ? 'English Version' : 'النسخة العربية';
}
toggle.addEventListener('click', e => {e.preventDefault(); switchLang();});

/* ========= Formspree handler (unchanged) ========= */
const form = document.querySelector('form');
const msg  = document.getElementById('form-message');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body:   data,
        headers:{'Accept':'application/json'}
      });
      if (res.ok) { form.reset(); msg.style.display='block'; }
      else        { alert(document.body.classList.contains('rtl') ? 'حدث خطأ. حاول مرة أخرى.' : 'Oops! Something went wrong.'); }
    } catch {
      alert(document.body.classList.contains('rtl') ? 'مشكلة في الاتصال. حاول لاحقاً.' : 'Network error. Try again later.');
    }
  });
}

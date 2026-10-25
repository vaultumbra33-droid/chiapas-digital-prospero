const correctPin = "1251";
const pinModal = document.getElementById('pinModal');
const mainSite = document.getElementById('mainSite');
const digits = [...document.querySelectorAll('.pin-digit')];
const pinError = document.getElementById('pinError');
let pin = ['', '', '', ''];

document.body.style.overflow = 'hidden';

digits.forEach((d, i) => {
  d.addEventListener('input', () => {
    d.value = d.value.replace(/[^0-9]/g, '');
    pin[i] = d.value;
    d.classList.toggle('filled', !!d.value);
    if (d.value && i < 3) digits[i + 1].focus();
    pinError.textContent = '';
  });
  d.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !d.value && i > 0) {
      digits[i - 1].focus(); digits[i - 1].value = ''; pin[i - 1] = '';
      digits[i - 1].classList.remove('filled');
    }
  });
});

function checkPin() {
  const entered = pin.join('');
  if (entered.length < 4) { pinError.textContent = 'Ingrese los 4 dígitos'; return; }
  if (entered === correctPin) {
    pinModal.style.transition = 'opacity .5s ease';
    pinModal.style.opacity = '0';
    setTimeout(() => {
      pinModal.classList.remove('active');
      mainSite.classList.add('active');
      document.body.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }, 500);
  } else {
    pinError.textContent = 'PIN incorrecto. Intente nuevamente.';
    const c = pinModal.querySelector('.pin-content');
    c.style.animation = 'shake .5s ease';
    setTimeout(() => c.style.animation = 'scaleIn .4s cubic-bezier(.34,1.56,.64,1)', 500);
    digits.forEach((d, i) => { d.value = ''; pin[i] = ''; d.classList.remove('filled'); });
    digits[0].focus();
  }
}

document.getElementById('pinSubmit').addEventListener('click', checkPin);
document.addEventListener('keydown', e => {
  if (pinModal.classList.contains('active') && e.key === 'Enter') checkPin();
});
setTimeout(() => digits[0] && digits[0].focus(), 150);

// Menú móvil
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('active')));

// Scroll navbar
window.addEventListener('scroll', () => {
  const n = document.querySelector('.navbar');
  n.style.background = window.scrollY > 40 ? 'rgba(10,30,58,.995)' : 'rgba(10,30,58,.985)';
});

// Fade-in con IntersectionObserver
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.06 });
document.querySelectorAll('.full-ficha, .table-wrap, .fig-card, .stat-card, .scen-card, .rm-card, .tl-item, .pf-cat-head').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  obs.observe(el);
});

console.log('%c🏛️ Chiapas Digital y Próspero', 'color:#d4af37;font-size:18px;font-weight:bold;');
console.log('%cPropuesta v4.0 · Documento Confidencial', 'color:#0f3460;font-size:12px;');

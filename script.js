// 轻量级轮播与导航控制
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('siteNav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  // Carousel
  const slides = Array.from(document.querySelectorAll('.slide'));
  const indicatorsWrap = document.querySelector('.indicators');
  let current = 0;
  let timer = null;
  const INTERVAL = 5000;

  function goTo(index) {
    index = (index + slides.length) % slides.length;
    const offset = -index * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    // indicators
    Array.from(indicatorsWrap.children).forEach((btn, i) => btn.classList.toggle('active', i === index));
    current = index;
  }

  // create indicators
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `轮播项 ${i+1}`);
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      pauseAuto();
      goTo(i);
      startAuto();
    });
    indicatorsWrap.appendChild(btn);
  });

  document.querySelector('.prev').addEventListener('click', () => { pauseAuto(); goTo(current - 1); startAuto(); });
  document.querySelector('.next').addEventListener('click', () => { pauseAuto(); goTo(current + 1); startAuto(); });

  function startAuto(){
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }
  function pauseAuto(){ if (timer) clearInterval(timer); timer = null; }

  // pause on hover/focus
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', pauseAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', pauseAuto);
  carousel.addEventListener('focusout', startAuto);

  startAuto();

  // Simple form handling (example: prevents default and logs — replace with real backend)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();
    if (!name || !phone) {
      alert('请填写姓名与电话。');
      return;
    }
    // TODO: 将表单提交到后端接口（fetch / ajax）
    console.log('联系表单提交：', { name, phone, message });
    alert('已收到您的留言，我们会尽快联系您。');
    form.reset();
  });
});

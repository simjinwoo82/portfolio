document.addEventListener('DOMContentLoaded', () => {

  /* ---- 헤더: 스크롤 시 그림자 + 스크롤스파이(active 메뉴) ---- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const navToggle = document.getElementById('navToggle');
  const navLinksPanel = document.getElementById('navLinks');

  function closeMobileNav() {
    navLinksPanel.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '메뉴 열기');
  }
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksPanel.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });
  navLinks.forEach(a => a.addEventListener('click', closeMobileNav));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileNav(); });
  const sections = [...navLinks]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const toTopBtn = document.getElementById('toTop');

  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 10);
    toTopBtn.classList.toggle('is-visible', window.scrollY > 600);

    let currentId = sections[0] ? sections[0].id : '';
    const offset = 90;
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top - offset <= 0) currentId = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- 섹션 리빌 애니메이션 ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Expertise 퍼센트 바 애니메이션 ---- */
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.pct + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => barObserver.observe(bar));

  /* ---- 레시피 모달 ---- */
  const overlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  let lastFocusedEl = null;

  function openModal(key) {
    const recipe = window.RECIPES[key];
    if (!recipe) return;
    const cardImg = document.querySelector(`.dish-card[data-recipe="${key}"] img`);

    document.getElementById('modalImg').src = cardImg ? cardImg.src : '';
    document.getElementById('modalImg').alt = recipe.name;
    document.getElementById('modalTitle').textContent = recipe.name;
    document.getElementById('modalCat').textContent = recipe.category;
    document.getElementById('modalDesc').textContent = recipe.desc;
    document.getElementById('modalIng').innerHTML =
      recipe.ingredients.map(i => `<li>${i}</li>`).join('');
    document.getElementById('modalSteps').innerHTML =
      recipe.steps.map(s => `<li>${s}</li>`).join('');
    document.getElementById('modalNote').innerHTML = '<b>셰프 노트.</b> ' + recipe.chefnote;

    lastFocusedEl = document.activeElement;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll('.dish-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    const name = card.querySelector('.dish-card__name');
    card.setAttribute('aria-label', (name ? name.textContent : '레시피') + ' 레시피 보기');
    card.addEventListener('click', () => openModal(card.dataset.recipe));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.recipe);
      }
    });
  });
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---- Testimonials Swiper (CDN 번들 버전 — 모듈 자동 포함) ---- */
  const testiCards = document.querySelectorAll('.testi-card');
  function equalizeTestiCardHeights() {
    testiCards.forEach(card => { card.style.height = 'auto'; });
    const maxH = Math.max(...[...testiCards].map(card => card.offsetHeight));
    testiCards.forEach(card => { card.style.height = maxH + 'px'; });
  }
  if (window.Swiper) {
    const testiSwiper = new Swiper('.testi-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        720: { slidesPerView: 2 },
        1000: { slidesPerView: 3 }
      },
      on: { init: equalizeTestiCardHeights, breakpoint: equalizeTestiCardHeights }
    });
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(equalizeTestiCardHeights, 150);
    });
  }
});

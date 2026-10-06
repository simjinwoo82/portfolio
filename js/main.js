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

  /* ---- Expertise 퍼센트 바 + 숫자 카운트업 애니메이션 ---- */
  const bars = document.querySelectorAll('.bar-fill');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el, target, duration) {
    if (prefersReducedMotion) { el.textContent = target + '%'; return; }
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + '%';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.dataset.pct;
        entry.target.style.width = pct + '%';
        const pctLabel = entry.target.closest('.exp-row')?.querySelector('.exp-row__pct');
        if (pctLabel) animateCount(pctLabel, parseInt(pct, 10), 1100);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => barObserver.observe(bar));

  /* ---- 레시피 모달 ---- */
  const overlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalStamp = document.getElementById('modalStamp');
  let lastFocusedEl = null;
  let stampTimer = null;

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

    clearTimeout(stampTimer);
    modalStamp.classList.remove('is-stamped');
    void modalStamp.offsetWidth; // force reflow so the animation restarts every open
    stampTimer = setTimeout(() => modalStamp.classList.add('is-stamped'), 300);
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    clearTimeout(stampTimer);
    modalStamp.classList.remove('is-stamped');
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

  /* ---- 요리 영상 스택 스크롤 ---- */
  const videoStack = document.querySelector('.video-stack');
  if (videoStack) {
    const stackCards = [...videoStack.querySelectorAll('.video-stack__card')];

    let stackTicking = false;
    function updateStackEffect() {
      const n = stackCards.length;
      const rects = stackCards.map(c => c.getBoundingClientRect());

      // progress[i]: 0~1, i+1번 카드가 i번 카드를 얼마나 덮었는지(같은 top에 도달하면 1)
      const progress = new Array(n).fill(0);
      for (let i = 0; i < n - 1; i++) {
        const cardHeight = rects[i].height || 1;
        const delta = rects[i + 1].top - rects[i].top;
        progress[i] = Math.min(Math.max((cardHeight - delta) / cardHeight, 0), 1);
      }

      // depth[i]: i번 카드가 쌓인 깊이(0=맨 위). 뒤 카드의 깊이를 이어받아 누적된다.
      const depth = new Array(n).fill(0);
      for (let i = n - 2; i >= 0; i--) {
        depth[i] = progress[i] * (1 + depth[i + 1]);
      }

      stackCards.forEach((card, i) => {
        const scale = 1 - depth[i] * 0.05;
        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.filter = `brightness(${(1 - progress[i] * 0.18).toFixed(3)})`;
      });
      stackTicking = false;
    }
    function onStackScroll() {
      if (!stackTicking) {
        stackTicking = true;
        requestAnimationFrame(updateStackEffect);
      }
    }
    window.addEventListener('scroll', onStackScroll, { passive: true });
    window.addEventListener('resize', onStackScroll);
    updateStackEffect();

    const PAUSE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
    const stackVideos = [];

    stackCards.forEach(card => {
      const video = card.querySelector('.video-stack__video');
      const playBtn = card.querySelector('.video-stack__play');
      const playIcon = playBtn.innerHTML;
      const playLabel = playBtn.getAttribute('aria-label');
      const pauseLabel = playLabel.replace('재생', '일시정지');
      stackVideos.push(video);

      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
      video.addEventListener('play', () => {
        card.classList.add('is-playing');
        playBtn.innerHTML = PAUSE_ICON;
        playBtn.setAttribute('aria-label', pauseLabel);
        // 한 번에 하나만 재생: 다른 카드 영상은 전부 정지(소리 겹침 방지)
        stackVideos.forEach(v => { if (v !== video && !v.paused) v.pause(); });
      });
      video.addEventListener('pause', () => {
        card.classList.remove('is-playing');
        playBtn.innerHTML = playIcon;
        playBtn.setAttribute('aria-label', playLabel);
      });
    });

    const stackVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) entry.target.pause();
      });
    }, { threshold: 0.1 });
    stackVideos.forEach(v => stackVideoObserver.observe(v));
  }
});

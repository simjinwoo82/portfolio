(function () {
  const EMAILJS_SERVICE_ID = 'service_l573fkx';
  const EMAILJS_TEMPLATE_ID = 'template_ydzmeg9';
  const EMAILJS_PUBLIC_KEY = '-tdT8cyHL704slQAP';
  let captchaToken = '';

  window.onContactRecaptchaSuccess = function (token) {
    captchaToken = token;
  };

  window.onContactRecaptchaExpired = function () {
    captchaToken = '';
  };

  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('contactModalOverlay');
    const closeBtn = document.getElementById('contactModalClose');
    const form = document.getElementById('contact-form');
    const triggers = [
      document.getElementById('navContactTrigger'),
      document.getElementById('emailTrigger'),
    ].filter(Boolean);

    const phoneTrigger = document.getElementById('phoneTrigger');
    const phoneLabel = document.getElementById('phoneTriggerLabel');
    if (phoneTrigger && phoneLabel) {
      const originalPhoneLabel = phoneLabel.textContent;
      let phoneResetTimer = null;

      const showPhoneCopied = () => {
        clearTimeout(phoneResetTimer);
        phoneLabel.textContent = '번호가 복사되었습니다';
        phoneResetTimer = setTimeout(() => {
          phoneLabel.textContent = originalPhoneLabel;
        }, 1500);
      };

      const copyFallback = (text) => {
        const input = document.createElement('textarea');
        input.value = text;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      };

      phoneTrigger.addEventListener('click', () => {
        const phone = phoneTrigger.dataset.phone;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(phone).then(showPhoneCopied).catch(() => {
            copyFallback(phone);
            showPhoneCopied();
          });
        } else {
          copyFallback(phone);
          showPhoneCopied();
        }
      });
    }

    let lastFocusedEl = null;
    let savedScrollY = 0;

    const openContactModal = () => {
      if (!overlay) return;
      lastFocusedEl = document.activeElement;
      savedScrollY = window.scrollY;
      overlay.classList.add('is-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      const firstField = document.getElementById('contact-name');
      if (firstField) firstField.focus();
    };

    const closeContactModal = () => {
      if (!overlay || !overlay.classList.contains('is-open')) return;
      overlay.classList.remove('is-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
      if (lastFocusedEl) lastFocusedEl.focus();
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openContactModal();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeContactModal);
    if (overlay) {
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeContactModal();
      });
    }
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeContactModal();
    });

    if (typeof emailjs === 'undefined') return;

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    const status = document.getElementById('contact-status');
    if (!form || !status) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!captchaToken) {
        status.textContent = '로봇이 아님을 확인해 주세요.';
        return;
      }

      status.textContent = '전송 중입니다...';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
        'g-recaptcha-response': captchaToken,
      })
        .then(() => {
          status.textContent = '메일 전송이 완료되었습니다.';
          form.reset();
          captchaToken = '';
          if (window.grecaptcha) {
            window.grecaptcha.reset();
          }
        })
        .catch((error) => {
          console.error('EmailJS 전송 실패:', error);
          status.textContent = '메일 전송을 실패했습니다. 잠시 후 다시 이용해주세요.';
        });
    });
  });
})();

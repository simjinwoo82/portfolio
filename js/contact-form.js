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
    const trigger = document.getElementById('emailTrigger');
    const form = document.getElementById('contact-form');

    if (trigger && form) {
      let hideTimer = null;
      let pinned = false;

      const open = () => {
        clearTimeout(hideTimer);
        form.classList.add('is-visible');
        trigger.setAttribute('aria-expanded', 'true');
      };
      const scheduleClose = () => {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          if (pinned) return;
          form.classList.remove('is-visible');
          trigger.setAttribute('aria-expanded', 'false');
        }, 220);
      };
      const close = () => {
        clearTimeout(hideTimer);
        pinned = false;
        form.classList.remove('is-visible');
        trigger.setAttribute('aria-expanded', 'false');
      };

      trigger.addEventListener('mouseenter', open);
      trigger.addEventListener('mouseleave', scheduleClose);
      form.addEventListener('mouseenter', open);
      form.addEventListener('mouseleave', scheduleClose);
      trigger.addEventListener('focus', open);

      trigger.addEventListener('click', () => {
        pinned = !pinned;
        if (pinned) {
          open();
        } else {
          close();
        }
      });

      document.addEventListener('click', (event) => {
        if (!pinned) return;
        if (trigger.contains(event.target) || form.contains(event.target)) return;
        close();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close();
      });
    }

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

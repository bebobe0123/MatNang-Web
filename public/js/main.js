(() => {
  document.documentElement.classList.add('js');

  // Menu di động
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    const setOpen = (open) => {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    };
    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }

  // Thư viện ảnh trang sản phẩm
  const main = document.querySelector('.js-gallery-main');
  document.querySelectorAll('.js-gallery-thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      main.src = btn.dataset.src;
      document.querySelectorAll('.js-gallery-thumb').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });

  // Form báo giá: kiểm tra tại chỗ rồi gửi bằng fetch
  const phoneOk = (v) => /^(0|\+?84)\d{9,10}$/.test(v.replace(/[\s.\-()]/g, ''));

  const showError = (input, msg) => {
    let el = input.parentElement.querySelector('.field-error');
    if (!msg) { input.removeAttribute('aria-invalid'); if (el) el.remove(); return; }
    input.setAttribute('aria-invalid', 'true');
    if (!el) {
      el = document.createElement('small');
      el.className = 'field-error';
      el.id = (input.id || input.name) + '-err';
      input.insertAdjacentElement('afterend', el);
      input.setAttribute('aria-describedby', [input.getAttribute('aria-describedby'), el.id].filter(Boolean).join(' '));
    }
    el.textContent = msg;
  };

  const validate = (form) => {
    let first = null;
    const name = form.querySelector('input[name="name"]:not([type="hidden"])');
    const phone = form.querySelector('input[name="phone"]');
    if (name) {
      const bad = !name.value.trim();
      showError(name, bad ? 'Vui lòng nhập họ tên.' : '');
      if (bad) first = first || name;
    }
    if (phone) {
      const bad = !phoneOk(phone.value);
      showError(phone, bad ? 'Số điện thoại chưa đúng (ví dụ: 0912 345 678).' : '');
      if (bad) first = first || phone;
    }
    return first;
  };

  document.querySelectorAll('.js-quote-form').forEach((form) => {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');

    form.querySelectorAll('input').forEach((input) =>
      input.addEventListener('blur', () => { if (input.getAttribute('aria-invalid')) validate(form); })
    );

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = validate(form);
      if (invalid) { invalid.focus(); return; }

      const label = button.textContent;
      button.disabled = true;
      button.textContent = 'Đang gửi…';
      status.className = 'form-status';
      status.textContent = '';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();
        status.classList.add(data.ok ? 'is-ok' : 'is-error');
        status.textContent = data.message;
        if (data.ok) form.reset();
      } catch {
        status.classList.add('is-error');
        status.textContent = 'Mất kết nối. Vui lòng gọi hoặc nhắn Zalo 079-888-9955.';
      } finally {
        button.disabled = false;
        button.textContent = label;
      }
    });
  });
})();

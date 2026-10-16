require('dotenv').config({ quiet: true });

const path = require('path');
const express = require('express');
const compression = require('compression');
const nodemailer = require('nodemailer');
const site = require('./data/site');

const app = express();
const PORT = process.env.PORT || 3000;
const ASSET_VERSION = Date.now().toString(36);
const SITE_URL = (process.env.SITE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));

app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.siteUrl = SITE_URL;
  res.locals.path = req.path;
  res.locals.year = new Date().getFullYear();
  res.locals.v = ASSET_VERSION;
  res.locals.meta = {};
  next();
});

const page = (view, meta, data = {}) => (req, res) => res.render(view, { meta, ...data });

app.get('/', page('index', {
  title: `${site.brand.name} — ${site.brand.slogan}`,
  description: site.brand.shortStory,
}));

app.get('/ve-mat-nang', page('about', {
  title: `Về Mật Nắng — Nắng kết thành mật`,
  description: 'Câu chuyện Mật Nắng: chọn nhãn từ những vùng trồng uy tín của Bắc Bộ, sấy và đóng gói tử tế tại Hà Nội.',
}));

app.get('/san-pham', page('products', {
  title: 'Sản phẩm — Mật Nắng',
  description: 'Long nhãn sấy khô, long nhãn ôm sen sấy khô và mật ong hoa nhãn. Nhắn Zalo 079-888-9955 để nhận báo giá.',
}));

app.get('/san-pham/:slug', (req, res, next) => {
  const product = site.products.find((p) => p.slug === req.params.slug);
  if (!product) return next();
  res.render('product', {
    product,
    meta: { title: `${product.name} — Mật Nắng`, description: product.description, image: product.image },
  });
});

app.get('/cong-thuc', page('blog', {
  title: 'Công thức & mẹo dùng — Mật Nắng',
  description: 'Cách nấu chè long nhãn hạt sen, pha trà long nhãn táo đỏ và bảo quản long nhãn.',
}));

app.get('/cong-thuc/:slug', (req, res, next) => {
  const post = site.posts.find((p) => p.slug === req.params.slug);
  if (!post) return next();
  res.render('post', {
    post,
    meta: { title: `${post.title} — Mật Nắng`, description: post.excerpt, image: post.image },
  });
});

app.get('/lien-he', (req, res) => {
  res.render('contact', {
    sent: req.query.sent === '1',
    error: String(req.query.error || '').slice(0, 200),
    selected: String(req.query.sp || '').slice(0, 100),
    meta: { title: 'Liên hệ & đặt hàng — Mật Nắng', description: `Gọi hoặc nhắn Zalo ${site.contact.phone}. Địa chỉ: ${site.contact.address}.` },
  });
});

// ---------- Form yêu cầu báo giá ----------

const transporter = process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

// Giới hạn đơn giản: tối đa 5 lần gửi / 10 phút / địa chỉ IP.
const hits = new Map();
const tooMany = (ip) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
};

const clean = (v, max = 500) => String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

app.post('/api/bao-gia', async (req, res) => {
  const wantsJson = req.is('application/json') || (req.get('accept') || '').includes('application/json');
  const reply = (status, ok, message) =>
    wantsJson
      ? res.status(status).json({ ok, message })
      : res.redirect(303, ok ? '/lien-he?sent=1#bao-gia' : `/lien-he?error=${encodeURIComponent(message)}#bao-gia`);

  const body = req.body || {};
  if (body.website) return reply(200, true, 'Đã nhận.'); // bẫy spam (ô ẩn)

  const data = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 20),
    product: clean(body.product, 100),
    size: clean(body.size, 50),
    quantity: clean(body.quantity, 50),
    note: String(body.note || '').trim().slice(0, 1000),
  };

  const phoneDigits = data.phone.replace(/[\s.\-()]/g, '');
  if (!data.name) return reply(400, false, 'Vui lòng nhập họ tên.');
  if (!/^(0|\+?84)\d{9,10}$/.test(phoneDigits)) return reply(400, false, 'Số điện thoại chưa đúng, vui lòng kiểm tra lại.');
  if (tooMany(req.ip)) return reply(429, false, `Anh/chị đã gửi nhiều lần. Vui lòng gọi hoặc nhắn Zalo ${site.contact.phone}.`);

  const rows = [
    ['Họ tên', data.name],
    ['Điện thoại', data.phone],
    ['Sản phẩm', data.product || '—'],
    ['Quy cách', data.size || '—'],
    ['Số lượng', data.quantity || '—'],
    ['Ghi chú', data.note || '—'],
  ];

  if (!transporter) {
    console.warn('[bao-gia] Chưa cấu hình SMTP — yêu cầu chỉ được ghi vào log:', data);
    return reply(503, false, `Form tạm thời chưa gửi được. Vui lòng gọi hoặc nhắn Zalo ${site.contact.phone}.`);
  }

  try {
    await transporter.sendMail({
      from: `"Website Mật Nắng" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || site.contact.email,
      subject: `Yêu cầu báo giá: ${data.product || 'Sản phẩm'} — ${data.name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<h2>Yêu cầu báo giá mới</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}</table>`,
    });
    reply(200, true, 'Cảm ơn anh/chị! Mật Nắng sẽ gọi lại báo giá trong thời gian sớm nhất.');
  } catch (err) {
    console.error('[bao-gia] Gửi email lỗi:', err.message);
    reply(500, false, `Chưa gửi được yêu cầu. Vui lòng gọi hoặc nhắn Zalo ${site.contact.phone}.`);
  }
});

// ---------- SEO ----------

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const urls = ['/', '/ve-mat-nang', '/san-pham', '/cong-thuc', '/lien-he',
    ...site.products.map((p) => `/san-pham/${p.slug}`),
    ...site.posts.map((p) => `/cong-thuc/${p.slug}`)];
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`)
      .join('\n')}\n</urlset>\n`
  );
});

app.use((req, res) => {
  res.status(404).render('404', { meta: { title: 'Không tìm thấy trang — Mật Nắng' } });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Có lỗi xảy ra. Vui lòng thử lại sau.');
});

app.listen(PORT, () => console.log(`Mật Nắng đang chạy tại http://localhost:${PORT}`));

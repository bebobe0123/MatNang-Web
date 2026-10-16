# Website Mật Nắng

Website thương hiệu **Mật Nắng — Giữ vị ngọt của mùa hè Bắc Bộ.**
Viết bằng Node.js (Express + EJS), có form yêu cầu báo giá gửi về email.

## Cấu trúc

```
server.js            Server Express: các trang, form báo giá, sitemap
data/site.js         TOÀN BỘ NỘI DUNG: sản phẩm, liên hệ, công thức, ảnh
views/               Giao diện từng trang (EJS)
  partials/          Phần dùng chung: header, footer, form, thẻ sản phẩm
public/css/style.css Màu sắc, font, bố cục
public/js/main.js    Menu điện thoại, thư viện ảnh, gửi form
public/images/       Logo (thêm ảnh sản phẩm thật vào đây)
.env.example         Mẫu cấu hình email
```

Các trang: `/` · `/ve-mat-nang` · `/san-pham` · `/san-pham/<tên>` · `/cong-thuc` · `/cong-thuc/<tên>` · `/lien-he`

---

## 1. Chạy thử trên máy

Cần cài [Node.js](https://nodejs.org) bản 18 trở lên.

```bash
npm install
npm run dev
```

Mở trình duyệt tại http://localhost:3000

## 2. Sửa nội dung

Mọi chữ, số điện thoại, địa chỉ, sản phẩm, công thức đều nằm trong `data/site.js`.

- **Thay ảnh minh họa bằng ảnh thật:** chép ảnh vào `public/images/` (ví dụ `long-nhan.jpg`), rồi trong `data/site.js` đổi
  `longanBowl: unsplash('...')` thành `longanBowl: '/images/long-nhan.jpg'`. Nên dùng ảnh vuông, rộng khoảng 1200px, định dạng `.jpg` hoặc `.webp`.
- **Quy cách mật nhãn:** sửa `sizes: ['Đang cập nhật']`, ví dụ `['250 g', '500 g']`.
- **Thông tin hộ kinh doanh:** điền `contact.business` — chân trang sẽ tự hiện tên, số ĐKKD và nơi cấp.
- **Thêm công thức:** chép một khối trong mảng `posts` rồi sửa.

## 3. Đưa code lên GitHub

1. Vào https://github.com/new, đặt tên repo `mat-nang-website`, chọn **Private**, **không** tick thêm README.
2. Trong thư mục này chạy (thay `TEN-GITHUB` bằng tên tài khoản của anh/chị):

```bash
git remote add origin https://github.com/TEN-GITHUB/mat-nang-website.git
git push -u origin main
```

Lần sau sửa code thì chạy:

```bash
git add -A
git commit -m "Mô tả thay đổi"
git push
```

> File `.env` (chứa mật khẩu email) đã được loại khỏi Git qua `.gitignore` — không bao giờ đưa nó lên GitHub.

## 4. Tạo "Mật khẩu ứng dụng" Gmail cho form báo giá

Form gửi email qua Gmail `matnangfoods@gmail.com`. Google không cho dùng mật khẩu đăng nhập thường, cần tạo **App Password**:

1. Đăng nhập Gmail `matnangfoods@gmail.com` → https://myaccount.google.com/security → bật **Xác minh 2 bước**.
2. Vào https://myaccount.google.com/apppasswords → đặt tên "Website Mật Nắng" → **Tạo**.
3. Google hiện một mã 16 ký tự — đây là `SMTP_PASS`. Lưu lại cẩn thận, không gửi cho ai.

Chạy trên máy: chép `.env.example` thành `.env` và điền `SMTP_PASS`.

## 5. Deploy lên Hostinger

Form báo giá cần server Node.js, nên chọn gói **có hỗ trợ Node.js** (Business Web Hosting hoặc Cloud). Gói Premium/Single không chạy được.

1. Mua gói hosting, chọn tên miền (thường được tặng năm đầu).
2. Vào **hPanel → Websites → Add website → Node.js Apps**.
3. Chọn **Import Git repository**, kết nối tài khoản GitHub và chọn repo `mat-nang-website`, nhánh `main`.
4. Cấu hình build:
   - Framework: **Express** (hoặc *Other*)
   - Node version: **20** hoặc **22**
   - Entry file: `server.js`
   - Install command: `npm install` · Start command: `npm start`
5. Mục **Environment variables**, thêm:

   | Tên | Giá trị |
   |---|---|
   | `SITE_URL` | `https://ten-mien-cua-ban.vn` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | `matnangfoods@gmail.com` |
   | `SMTP_PASS` | *(mã 16 ký tự ở bước 4)* |
   | `MAIL_TO` | `matnangfoods@gmail.com` |

   Không cần đặt `PORT` — Hostinger tự cấp.
6. Bấm **Deploy**. Sau khi xong, bật **SSL** miễn phí cho tên miền trong hPanel.
7. Mỗi lần `git push` lên `main`, Hostinger sẽ tự deploy lại (hoặc bấm *Redeploy* trong hPanel).

> Giao diện hPanel có thể thay đổi theo thời gian; nếu không thấy đúng tên mục, tìm "Node.js" trong hPanel.

## 6. Sau khi lên mạng

- Gửi thử form báo giá và kiểm tra hộp thư `matnangfoods@gmail.com` (xem cả mục Spam).
- Khai báo website với Google: https://search.google.com/search-console → thêm tên miền → gửi `https://ten-mien/sitemap.xml`.

## Lưu ý nội dung (từ bản Word)

- Chỉ ghi "Hưng Yên" khi lô hàng có giấy tờ nguồn gốc; không dùng "Long nhãn Hưng Yên" làm tên sản phẩm nếu chưa có quyền dùng nhãn hiệu chứng nhận.
- Không thêm "không chất bảo quản", "100% sạch" khi chưa có phiếu kiểm nghiệm; không ghi công dụng chữa bệnh.
- Ảnh hiện tại là ảnh minh họa từ [Unsplash](https://unsplash.com/license) (dùng miễn phí) — nên thay bằng ảnh sản phẩm thật trước khi quảng bá.

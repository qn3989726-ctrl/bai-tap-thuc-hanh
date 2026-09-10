# Campus Connect — cổng thông tin đào tạo & đời sống sinh viên

Website hoàn chỉnh bằng **HTML + CSS + JavaScript thuần** (không framework, không cần build),
các file được tổ chức theo thư mục tương ứng.

## Chạy thử

**Cách 1 (khuyến nghị):** mở `index.html` bằng Live Server trong VS Code.

```
click chuột phải vào index.html  ->  Open with Live Server
```

**Cách 2:** `python -m http.server 8080` rồi mở `http://localhost:8080`
**Cách 3:** `npx serve .`

> Mở trực tiếp bằng `file://` vẫn chạy được, nhưng nên dùng 1 trong 3 cách trên
> để font/Google Fonts và một số API trình duyệt hoạt động đầy đủ.

## Cấu trúc thư mục

```
CampussConnect/
├── index.html                  # Trang chủ
├── pages/                      # Các trang con
│   ├── about.html              # Giới thiệu & đội ngũ
│   ├── courses.html            # Danh mục học phần (tìm / lọc / ghi danh)
│   ├── course-detail.html      # Chi tiết học phần  (?id=INT104)
│   ├── timetable.html          # Thời khoá biểu + xuất file .ics
│   ├── events.html             # Sự kiện & đăng ký giữ chỗ
│   ├── news.html               # Tin tức - thông báo
│   ├── article.html            # Chi tiết bài viết   (?id=news-01)
│   ├── gallery.html            # Thư viện ảnh + lightbox
│   ├── forum.html              # Diễn đàn sinh viên
│   ├── contact.html            # Liên hệ (form validation)
│   ├── login.html              # Đăng nhập
│   ├── register.html           # Đăng ký tài khoản
│   ├── dashboard.html          # Trang cá nhân (cần đăng nhập)
│   └── 404.html                # Trang lỗi
├── assets/
│   ├── css/
│   │   ├── styles.css          # Design tokens, reset, header, footer, utilities
│   │   └── pages.css           # Component riêng theo trang
│   ├── js/
│   │   ├── theme.js            # Áp dark/light mode sớm (chống nháy màn hình)
│   │   ├── storage.js          # Wrapper localStorage + đồng bộ giữa các tab
│   │   ├── data.js             # Dữ liệu mẫu: học phần, sự kiện, tin tức, giảng viên
│   │   ├── auth.js             # Đăng ký / đăng nhập / phiên / phân quyền
│   │   ├── layout.js           # Sinh header, footer, drawer mobile, tìm kiếm Ctrl+K
│   │   ├── main.js             # Toast, modal, tabs, accordion, reveal, lightbox...
│   │   └── *.page.js           # Script gắn riêng cho từng trang
│   └── images/                 # logo.svg, favicon.svg, hero.svg, gallery/, avatars/
└── tools/
    └── make-images.ps1         # Script (tái)sinh ảnh SVG placeholder
```

## Tính năng

- **Giao diện:** design system bằng CSS custom properties, dark/light mode lưu `localStorage`,
  tôn trọng `prefers-color-scheme`, responsive từ 320px, scroll reveal,
  tôn trọng `prefers-reduced-motion`.
- **Điều hướng:** header/footer khai báo một lần trong `layout.js`, menu drawer mobile,
  breadcrumb, tìm kiếm toàn site bằng **Ctrl/Cmd + K**.
- **Học vụ:** danh mục học phần (tìm theo mã/tên/giảng viên, lọc khoa - bậc - tín chỉ - hình thức,
  sắp xếp, grid/list), trang chi tiết có chương trình + đánh giá, ghi danh kiểm tra sĩ số.
- **Thời khoá biểu:** lưới thứ - giờ, tự lấy từ học phần đã ghi danh, lọc theo ngày, in, xuất `.ics`.
- **Sự kiện / Tin tức:** lọc theo nhóm, đếm ngược tới sự kiện kế tiếp, giữ chỗ,
  bài viết chi tiết + bài liên quan.
- **Diễn đàn:** đặt câu hỏi, bình luận, upvote (lưu `localStorage`, yêu cầu đăng nhập).
- **Tài khoản:** đăng ký / đăng nhập / phiên, trang cá nhân thống kê tín chỉ,
  danh sách học phần & sự kiện đã đăng ký, chỉnh sửa hồ sơ.
- **Form:** validation realtime (email, mật khẩu mạnh, SĐT Việt Nam), toast, chặn gửi lặp.

## Tài khoản demo

| Email | Mật khẩu |
|---|---|
| `sinhviens@campus.edu.vn` | `Campus@123` |

## Giới hạn

- Toàn bộ dữ liệu là **mẫu phía client** (`assets/js/data.js`); thay đổi của người dùng ghi vào
  `localStorage` với prefix `cc:`. Không có backend / database thật.
- Mật khẩu chỉ được rút gọn bằng hàm hash demo — **không dùng cho production**
  (cần server + bcrypt/argon2 + JWT/session thật).
- Ảnh trong `assets/images` là SVG placeholder tự sinh; thay file cùng tên bằng ảnh thật là
  giao diện nhận ngay.
- Google Fonts (`Be Vietnam Pro`) tải qua CDN — khi mất mạng sẽ fallback hệ font chữ thường.


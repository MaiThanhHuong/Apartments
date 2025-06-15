# Apartments

Apartments là một ứng dụng web quản lý căn hộ, cung cấp các chức năng quản lý và hiển thị thông tin căn hộ dễ dàng và tiện lợi.


# Thành viên tham gia 

| **Họ và Tên**          | **MSSV**     |
|-------------------------|--------------|
| **Trương Ngọc Mai**     | **20225879** |
| **Nguyễn Đức Thành**    | **20225930** |
| **Mai Thanh Hương**     | **20225852** |
| **Phan Thanh Thắng**    | **20225927** |
| **Nguyễn Khắc Hiếu**    | **20225839** |


## 🛠️ Tính năng chính

- **Quản lý căn hộ:** Thêm, sửa, xóa thông tin căn hộ.
- **Tìm kiếm & lọc:** Tìm kiếm theo tên, loại căn hộ hoặc các tiêu chí khác.
- **Hiển thị chi tiết căn hộ:** Giao diện trực quan và dễ sử dụng.
- **Responsive Design:** Hỗ trợ sử dụng trên các thiết bị di động và desktop.


## 🚀 Điểm cải tiến

- **Tính năng yêu cầu dịch vụ:**
  - Cư dân có thể gửi yêu cầu dịch vụ trực tiếp trên ứng dụng (sửa chữa, vệ sinh, bảo trì, v.v.).
  - Dễ dàng theo dõi trạng thái yêu cầu từ lúc gửi đến khi hoàn thành.

- **Phân công xử lý dịch vụ:**
  - Hệ thống tự động phân loại yêu cầu dịch vụ dựa trên mức độ ưu tiên và tính chất công việc.
  - Gán công việc cho nhân viên phù hợp để đảm bảo xử lý nhanh chóng và hiệu quả.

- **Quản lý lịch sử yêu cầu dịch vụ:**
  - Lưu trữ lịch sử các yêu cầu đã được xử lý, giúp ban quản lý theo dõi và đánh giá hiệu quả công việc.

## 🚀 Cài đặt và chạy ứng dụng

### 1. Clone dự án và thiết lập cơ sở dữ liệu

- Đầu tiên, cài đặt **MySQL** trên máy tính của bạn.
- Import dữ liệu mẫu từ tệp `bluemoon_ver4.sql`:
-  Git clone dự án về local
  ```bash
  https://github.com/MaiThanhHuong/Apartments
  ```
  1. Di chuyển đến thư mục chứa tệp dữ liệu:
     ```bash
     cd apartments/database/
     ```
  2. Mở MySQL Workbench hoặc sử dụng lệnh CLI để import:
     ```bash
     mysql -u [tên_người_dùng] -p [tên_cơ_sở_dữ_liệu] < bluemoon_backup.sql
     ```
  

### 2. Cấu hình tệp `.env`
- Tạo tệp `.env` trong thư mục gốc dự án.
- Thêm các thông tin sau (thay thế `[giá trị_của_bạn]` bằng thông tin phù hợp):
  ```
  DB_HOST=[địa_chỉ_host]
  DB_USER=[tên_người_dùng]
  DB_PASSWORD=[mật_khẩu]
  DB_NAME=[tên_cơ_sở_dữ_liệu]
  PORT=[cổng_server]

  MYSQL_HOST='localhost'
  MYSQL_USER='root'
  MYSQL_PASSWORD=''
  MYSQL_DATABASE=''
  MYSQL_PORT='3306'
  ```

### 3. Cài đặt môi trường
- Di chuyển đến thư mục dự án:
  ```bash
  cd apartments
  ```
- Cài đặt các dependencies:
  ```bash
  npm install
  ```


### 4. Chạy ứng dụng
- Khởi động ứng dụng:
  ```bash
  npm run dev
  ```

Ứng dụng sẽ chạy tại [http://localhost:5173](http://localhost:5173).

---

## 🧰 Công nghệ sử dụng

- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)

## 📂 Cấu trúc thư mục

- ** Xem chi tiết thông tin các file trong repo
```bash
git ls-tree -r HEAD --name-only
```
```plaintext
.
├── .env                 # Tệp cấu hình môi trường cho ứng dụng
├── database/            # Thư mục chứa các tệp sao lưu và cấu trúc cơ sở dữ liệu
│   └── bluemoon_ver4.sql #Ver4 là bản sử dụng
├── server/              # Backend: Xử lý logic và kết nối cơ sở dữ liệu
│   ├── controllers/     # Controller: Xử lý logic cho từng chức năng
│   ├── routes/          # API endpoints
│   ├── services/        # Các dịch vụ hỗ trợ giao tiếp với database
│   ├── ultis/           # Các hàm tiện ích (format ngày, xử lý chuỗi, ...)
│   └── server.js        # Điểm khởi động của server
├── src/                 # Frontend: React.js với TypeScript
│   ├── components/      # Các thành phần UI tái sử dụng
│   │   ├── auth/        # Các thành phần liên quan đến xác thực
│   │   ├── dashboard/   # Thành phần hiển thị thông tin trên Dashboard
│   │   └── ui/          # Các thành phần giao diện như Button, Dialog, ...
│   ├── pages/           # Các trang chính (Dashboard, Apartments, ...)
│   ├── hooks/           # Hook tùy chỉnh
│   ├── lib/             # Tiện ích và cấu hình dùng chung
│   └── main.tsx         # Tệp chính khởi động ứng dụng React
├── README.md            # Tài liệu hướng dẫn sử dụng và cài đặt
├── tailwind.config.js   # Cấu hình Tailwind CSS
├── vite.config.ts       # Cấu hình Vite cho ứng dụng
└── package.json         # Quản lý dependencies và script
```




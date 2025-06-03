# Apartments

Apartments là một ứng dụng web quản lý căn hộ, cung cấp các chức năng quản lý và hiển thị thông tin căn hộ dễ dàng và tiện lợi.

## 🛠️ Tính năng chính

- **Quản lý căn hộ:** Thêm, sửa, xóa thông tin căn hộ.
- **Tìm kiếm & lọc:** Tìm kiếm theo tên, loại căn hộ hoặc các tiêu chí khác.
- **Hiển thị chi tiết căn hộ:** Giao diện trực quan và dễ sử dụng.
- **Responsive Design:** Hỗ trợ sử dụng trên các thiết bị di động và desktop.

## 🚀 Cài đặt và chạy ứng dụng

### 1. Clone dự án và thiết lập cơ sở dữ liệu
- Đầu tiên, cài đặt **MySQL** trên máy tính của bạn.
- Import dữ liệu mẫu từ tệp `bluemoon_backup.sql`:
  1. Di chuyển đến thư mục chứa tệp backup:
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
  cd Apartments
  ```
- Cài đặt các dependencies:
  ```bash
  npm install
  ```
- Cài đặt các công cụ cần thiết:
  ```bash
  npm install -g concurrently
  npm install dotenv
  npm install pdfkit
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

```plaintext
Apartments/
├── src/
│   ├── components/     # Các component tái sử dụng
│   ├── pages/          # Các trang chính của ứng dụng
│   ├── services/       # Các file giao tiếp API
│   ├── utils/          # Các hàm tiện ích
│   ├── App.js          # File khởi chạy ứng dụng
│   ├── index.js        # Entry point
├── database/           # File backup cơ sở dữ liệu
├── public/             # Các tài nguyên tĩnh
├── package.json        # Thông tin dự án và dependencies
```




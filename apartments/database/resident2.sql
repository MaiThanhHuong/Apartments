-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS building_management;
USE building_management;

-- Tạo bảng residents
CREATE TABLE IF NOT EXISTS residents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  unit VARCHAR(50),
  contact VARCHAR(20),
  type ENUM('Owner', 'Tenant', 'Former Tenant'),
  lease_end DATE,
  status ENUM('Active', 'Inactive')
);

-- Thêm dữ liệu mẫu
INSERT INTO residents (name, email, unit, contact, type, lease_end, status) VALUES
('Alice Nguyen', 'alice.nguyen@email.com', 'A101', '0905123456', 'Owner', NULL, 'Active'),
('Bob Tran', 'bob.tran@email.com', 'B202', '0905234567', 'Tenant', '2025-08-31', 'Active'),
('Charlie Le', 'charlie.le@email.com', 'C303', '0905345678', 'Tenant', '2024-12-31', 'Inactive'),
('Daisy Pham', 'daisy.pham@email.com', 'D404', '0905456789', 'Owner', NULL, 'Active'),
('Eddie Hoang', 'eddie.hoang@email.com', 'E505', '0905567890', 'Tenant', '2025-05-30', 'Active'),
('Fiona Do', 'fiona.do@email.com', 'F606', '0905678901', 'Former Tenant', '2023-12-31', 'Inactive'),
('George Bui', 'george.bui@email.com', 'G707', '0905789012', 'Tenant', '2026-01-15', 'Active'),
('Hana Vo', 'hana.vo@email.com', 'H808', '0905890123', 'Tenant', '2025-07-01', 'Inactive'),
('Ivan Phan', 'ivan.phan@email.com', 'I909', '0905901234', 'Owner', NULL, 'Active'),
('Jenny Truong', 'jenny.truong@email.com', 'J010', '0906012345', 'Tenant', '2025-10-01', 'Active');

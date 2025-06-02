-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 07:10 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bluemoon`
--

-- --------------------------------------------------------

--
-- Table structure for table `hokhau`
--

CREATE TABLE `hokhau` (
  `id` int(11) NOT NULL,
  `sonha` varchar(45) DEFAULT NULL,
  `duong` varchar(45) DEFAULT NULL,
  `phuong` varchar(45) DEFAULT NULL,
  `quan` varchar(45) DEFAULT NULL,
  `ngaylamhokhau` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hokhau`
--

INSERT INTO `hokhau` (`id`, `sonha`, `duong`, `phuong`, `quan`, `ngaylamhokhau`) VALUES
(1, '25', 'Lò Đúc', 'Láng Thượng', 'Nam Từ Liêm', '1994-07-08'),
(2, '17', 'Trần Hưng Đạo', 'Hàng Bột', 'Cầu Giấy', '1993-06-07'),
(3, '73', 'Phố Huế', 'Kim Liên', 'Long Biên', '1992-02-24'),
(4, '16', 'Lò Đúc', 'Cát Linh', 'Tây Hồ', '1991-11-12'),
(5, '99', 'Phố Huế', 'Hàng Bột', 'Thanh Xuân', '1995-09-30'),
(6, '45', 'Hai Bà Trưng', 'Khương Thượng', 'Hà Đông', '2000-08-22'),
(7, '5', 'Hai Bà Trưng', 'Hàng Bột', 'Nam Từ Liêm', '1992-04-16'),
(8, '22', 'Triệu Việt Vương', 'Khương Thượng', 'Long Biên', '1993-12-30'),
(9, '97', 'Trần Hưng Đạo', 'Kim Liên', 'Bắc Từ Liêm', '1990-04-04'),
(10, '96', 'Bùi Thị Xuân', 'Láng Thượng', 'Hai Bà Trưng', '1995-07-22');

-- --------------------------------------------------------

--
-- Table structure for table `khoanthu`
--

CREATE TABLE `khoanthu` (
  `id` int(11) NOT NULL,
  `tenkhoanthu` varchar(45) DEFAULT NULL,
  `loaikhoanthu` varchar(45) DEFAULT NULL,
  `ngaytao` date DEFAULT NULL,
  `sotien` int(11) DEFAULT NULL,
  `thoihan` date DEFAULT NULL,
  `phamvi` varchar(20) DEFAULT 'ALL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khoanthu`
--

INSERT INTO `khoanthu` (`id`, `tenkhoanthu`, `loaikhoanthu`, `ngaytao`, `sotien`, `thoihan`, `phamvi`) VALUES
(3, 'Quỹ đóng góp', 'Tình nguyện', '2025-01-01', 1000, '2025-12-31', 'ALL'),
(15, 'Tiện ích', 'Tiện ích', '2025-05-30', 35000, '2025-05-07', 'CUSTOM'),
(16, 'Phí sửa chữa', 'Phí sửa chữa', '2025-05-30', 23000, '2025-06-08', 'CUSTOM');

-- --------------------------------------------------------

--
-- Table structure for table `nhankhau`
--

CREATE TABLE `nhankhau` (
  `id` int(11) NOT NULL,
  `hoten` varchar(45) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `gioitinh` varchar(45) DEFAULT NULL,
  `dantoc` varchar(45) DEFAULT NULL,
  `cccd` varchar(45) DEFAULT NULL,
  `nghenghiep` varchar(45) DEFAULT NULL,
  `vaitro` varchar(45) DEFAULT NULL,
  `hokhau` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhankhau`
--

INSERT INTO `nhankhau` (`id`, `hoten`, `ngaysinh`, `gioitinh`, `dantoc`, `cccd`, `nghenghiep`, `vaitro`, `hokhau`) VALUES
(1, 'Rivkah Marston', '1981-12-03', 'M', 'Mèo', '857924521998', 'Tài xế', 'Chủ hộ', 1),
(2, 'Vernen Pinchback', '1990-02-20', 'F', 'Dao', '838586808899', 'Nông dân', 'Chủ hộ', 2),
(3, 'Jae Grammer', '1998-01-12', 'F', 'Ede', '378698246241', 'Bác sĩ', 'Chủ hộ', 3),
(4, 'Brand Cankett', '1971-06-06', 'F', 'Mường', '951369231022', 'Tài xế', 'Chủ hộ', 4),
(5, 'Marna Clayton', '2011-04-22', 'F', 'Kinh', '108849605125', 'Kỹ sư', 'Chủ hộ', 5),
(6, 'Mickey Ewells', '1970-03-24', 'M', 'Tày', '983176988043', 'Công nhân', 'Chủ hộ', 6),
(7, 'Cullin Yerlett', '1998-12-31', 'F', 'Dao', '835945540765', 'Tài xế', 'Chủ hộ', 7),
(8, 'Kellie Ivanisov', '1981-09-11', 'M', 'Tày', '136747392433', 'Tài xế', 'Chủ hộ', 8),
(9, 'Chester Lagde', '1993-12-03', 'M', 'Kinh', '954863037515', 'Giáo viên', 'Chủ hộ', 9),
(10, 'Laurena Swainger', '2008-12-06', 'M', 'Tày', '470408567848', 'Công nhân', 'Chủ hộ', 10);

-- --------------------------------------------------------

--
-- Table structure for table `noptien`
--

CREATE TABLE `noptien` (
  `id` int(11) NOT NULL,
  `ngaythu` date DEFAULT NULL,
  `sotien` double DEFAULT NULL,
  `nguoinop` varchar(45) DEFAULT NULL,
  `khoanthu` int(11) DEFAULT NULL,
  `hokhau` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `noptien`
--

INSERT INTO `noptien` (`id`, `ngaythu`, `sotien`, `nguoinop`, `khoanthu`, `hokhau`) VALUES
(3, '2025-01-02', 50000, 'Vernen Pinchback', 3, 2),
(11, NULL, 0, 'Vernen Pinchback', 15, 2),
(12, NULL, 0, 'Laurena Swainger', 16, 10);

-- --------------------------------------------------------

--
-- Table structure for table `phuongtien`
--

CREATE TABLE `phuongtien` (
  `bienso` varchar(45) NOT NULL,
  `loaixe` varchar(45) DEFAULT NULL,
  `hokhau` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `phuongtien`
--

INSERT INTO `phuongtien` (`bienso`, `loaixe`, `hokhau`) VALUES
('09F-5165', 'Xe máy', 9),
('11E-2849', 'Xe máy', 4),
('18Y-8944', 'Ô tô', 3),
('19F-6467', 'Xe máy', 8),
('27H-3291', 'Xe máy', 10),
('40C-2088', 'Xe máy', 2),
('48Z-2196', 'Ô tô', 1),
('71V-1964', 'Xe máy', 5),
('75X-9282', 'Ô tô', 6),
('82F-8282', 'Ô tô', 7);

-- --------------------------------------------------------

--
-- Table structure for table `tamtrutamvang`
--

CREATE TABLE `tamtrutamvang` (
  `id` int(11) NOT NULL,
  `trangthai` varchar(45) DEFAULT NULL,
  `diachi` varchar(45) DEFAULT NULL,
  `thoigian` date DEFAULT NULL,
  `noidung` varchar(45) DEFAULT NULL,
  `nhankhau` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tamtrutamvang`
--

INSERT INTO `tamtrutamvang` (`id`, `trangthai`, `diachi`, `thoigian`, `noidung`, `nhankhau`) VALUES
(1, 'Tạm trú', 'White House', '2025-01-01', 'Tạm trú', 1),
(2, 'Tạm trú', 'White House', '2025-01-01', 'Tạm trú', 1),
(3, 'Tạm trú', '221B Baker Street', '2025-01-01', 'Tạm trú', 2),
(4, 'Tạm trú', '4 Privet Drive', '2025-01-01', 'Tạm trú', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `hokhau`
--
ALTER TABLE `hokhau`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `khoanthu`
--
ALTER TABLE `khoanthu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nhankhau`
--
ALTER TABLE `nhankhau`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hokhau_idx` (`hokhau`);

--
-- Indexes for table `noptien`
--
ALTER TABLE `noptien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `khoanthu_idx` (`khoanthu`),
  ADD KEY `hokhau_idx` (`hokhau`);

--
-- Indexes for table `phuongtien`
--
ALTER TABLE `phuongtien`
  ADD PRIMARY KEY (`bienso`),
  ADD KEY `hokhau_phuongtien_idx` (`hokhau`);

--
-- Indexes for table `tamtrutamvang`
--
ALTER TABLE `tamtrutamvang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nhankhau_idx` (`nhankhau`);

--

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `khoanthu`
--
ALTER TABLE `khoanthu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `nhankhau`
--
ALTER TABLE `nhankhau`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `noptien`
--
ALTER TABLE `noptien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tamtrutamvang`
--
ALTER TABLE `tamtrutamvang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nhankhau`
--
ALTER TABLE `nhankhau`
  ADD CONSTRAINT `hokhau_nhankhau` FOREIGN KEY (`hokhau`) REFERENCES `hokhau` (`id`);

--
-- Constraints for table `noptien`
--
ALTER TABLE `noptien`
  ADD CONSTRAINT `hokhau_noptien` FOREIGN KEY (`hokhau`) REFERENCES `hokhau` (`id`),
  ADD CONSTRAINT `khoanthu` FOREIGN KEY (`khoanthu`) REFERENCES `khoanthu` (`id`);

--
-- Constraints for table `phuongtien`
--
ALTER TABLE `phuongtien`
  ADD CONSTRAINT `hokhau_phuongtien` FOREIGN KEY (`hokhau`) REFERENCES `hokhau` (`id`);

--
-- Constraints for table `tamtrutamvang`
--
ALTER TABLE `tamtrutamvang`
  ADD CONSTRAINT `nhankhau` FOREIGN KEY (`nhankhau`) REFERENCES `nhankhau` (`id`);
COMMIT;

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `vaitro` varchar(45) DEFAULT NULL,
  `hoten` varchar(100) DEFAULT NULL,
  `sodienthoai` varchar(15) DEFAULT NULL,
  `diachi` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin1','admin1','admin','Nguyễn Văn A','0912345678','123 Đường ABC, Quận X, TP. HCM'),('admin2','admin2','admin','Trần Thị B','0987654321','456 Đường DEF, Quận Y, TP. HCM'),('admin3','admin3','admin','Lê Văn C','0971122334','789 Đường GHI, Quận Z, TP. HCM'),('ketoan','123456','ketoan','Phạm Thị D','0909988776','321 Đường JKL, TP. Đà Nẵng');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-30  1:39:03
DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `unit` DECIMAL(10,2) NOT NULL,
  `resident` VARCHAR(100) NOT NULL,
  `dateSubmitted` DATE NOT NULL,
  `priority` VARCHAR(20) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `assignedTo` VARCHAR(100),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `service` (`id`, `title`, `description`, `unit`, `resident`, `dateSubmitted`, `priority`, `status`, `category`, `assignedTo`) VALUES
(1, 'Sửa chữa điện', 'Cần sửa chữa hệ thống điện trong nhà', 150.00, 'Nguyễn Văn A', '2025-05-01', 'Cao', 'Đang xử lý', 'Điện', 'Trần Văn B'),
(2, 'Bảo trì máy lạnh', 'Bảo trì định kỳ máy lạnh phòng khách', 200.00, 'Lê Thị C', '2025-05-02', 'Trung bình', 'Chờ xử lý', 'HVAC', 'Nguyễn Văn D'),

(3, 'Lắp đặt internet', 'Yêu cầu lắp đặt internet mới cho căn hộ', 100.00, 'Phạm Văn E', '2025-05-03', 'Thấp', 'Đã hoàn thành', 'Công nghệ thông tin', 'Trần Thị F'),
(4, 'Sửa chữa ống nước', 'Ống nước bị rò rỉ cần sửa chữa gấp', 120.00, 'Nguyễn Thị G', '2025-05-04', 'Cao', 'Đang xử lý', 'Nước', 'Lê Văn H'),

(5, 'Vệ sinh nhà cửa', 'Yêu cầu vệ sinh toàn bộ căn hộ', 80.00, 'Trần Văn I', '2025-05-05', 'Thấp', 'Chờ xử lý', 'Vệ sinh', 'Nguyễn Thị J'),
(6, 'Sơn lại tường', 'Cần sơn lại tường phòng khách', 300.00, 'Lê Văn K', '2025-05-06', 'Trung bình', 'Đã hoàn thành', 'Xây dựng', 'Phạm Thị L');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

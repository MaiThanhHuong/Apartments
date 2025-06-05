CREATE DATABASE  IF NOT EXISTS `bluemoon` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bluemoon`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bluemoon
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hokhau`
--

DROP TABLE IF EXISTS `hokhau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hokhau` (
  `id` int NOT NULL,
  `sonha` varchar(45) DEFAULT NULL,
  `duong` varchar(45) DEFAULT NULL,
  `phuong` varchar(45) DEFAULT NULL,
  `quan` varchar(45) DEFAULT NULL,
  `ngaylamhokhau` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hokhau`
--

LOCK TABLES `hokhau` WRITE;
/*!40000 ALTER TABLE `hokhau` DISABLE KEYS */;
INSERT INTO `hokhau` VALUES (1,'25','Lò Đúc','Láng Thượng','Nam Từ Liêm','1994-07-08'),(2,'17','Trần Hưng Đạo','Hàng Bột','Cầu Giấy','1993-06-07'),(3,'73','Phố Huế','Kim Liên','Long Biên','1992-02-24'),(4,'16','Lò Đúc','Cát Linh','Tây Hồ','1991-11-12'),(5,'99','Phố Huế','Hàng Bột','Thanh Xuân','1995-09-30'),(6,'45','Hai Bà Trưng','Khương Thượng','Hà Đông','2000-08-22'),(7,'5','Hai Bà Trưng','Hàng Bột','Nam Từ Liêm','1992-04-16'),(8,'22','Triệu Việt Vương','Khương Thượng','Long Biên','1993-12-30'),(9,'97','Trần Hưng Đạo','Kim Liên','Bắc Từ Liêm','1990-04-04'),(10,'96','Bùi Thị Xuân','Láng Thượng','Hai Bà Trưng','1995-07-22');
/*!40000 ALTER TABLE `hokhau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoanthu`
--

DROP TABLE IF EXISTS `khoanthu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khoanthu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenkhoanthu` varchar(45) DEFAULT NULL,
  `loaikhoanthu` varchar(45) DEFAULT NULL,
  `ngaytao` date DEFAULT NULL,
  `sotien` int DEFAULT NULL,
  `thoihan` date DEFAULT NULL,
  `phamvi` varchar(20) DEFAULT 'ALL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoanthu`
--

LOCK TABLES `khoanthu` WRITE;
/*!40000 ALTER TABLE `khoanthu` DISABLE KEYS */;
INSERT INTO `khoanthu` VALUES (3,'Quỹ đóng góp','Tình nguyện','2025-01-01',1000,'2025-12-31','ALL'),(15,'Tiện ích','Tiện ích','2025-05-30',35000,'2025-05-07','CUSTOM'),(16,'Phí sửa chữa','Phí sửa chữa','2025-05-30',23000,'2025-06-08','CUSTOM');
/*!40000 ALTER TABLE `khoanthu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhankhau`
--

DROP TABLE IF EXISTS `nhankhau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhankhau` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hoten` varchar(45) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `gioitinh` varchar(45) DEFAULT NULL,
  `dantoc` varchar(45) DEFAULT NULL,
  `cccd` varchar(45) DEFAULT NULL,
  `nghenghiep` varchar(45) DEFAULT NULL,
  `vaitro` varchar(45) DEFAULT NULL,
  `hokhau` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hokhau_idx` (`hokhau`),
  CONSTRAINT `hokhau_nhankhau` FOREIGN KEY (`hokhau`) REFERENCES `hokhau` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhankhau`
--

LOCK TABLES `nhankhau` WRITE;
/*!40000 ALTER TABLE `nhankhau` DISABLE KEYS */;
INSERT INTO `nhankhau` VALUES (1,'Rivkah Marston','1981-12-03','M','Mèo','857924521998','Tài xế','Chủ hộ',1),(2,'Vernen Pinchback','1990-02-20','F','Dao','838586808899','Nông dân','Chủ hộ',2),(3,'Jae Grammer','1998-01-12','F','Ede','378698246241','Bác sĩ','Chủ hộ',3),(4,'Brand Cankett','1971-06-06','F','Mường','951369231022','Tài xế','Chủ hộ',4),(5,'Marna Clayton','2011-04-22','F','Kinh','108849605125','Kỹ sư','Chủ hộ',5),(6,'Mickey Ewells','1970-03-24','M','Tày','983176988043','Công nhân','Chủ hộ',6),(7,'Cullin Yerlett','1998-12-31','F','Dao','835945540765','Tài xế','Chủ hộ',7),(8,'Kellie Ivanisov','1981-09-11','M','Tày','136747392433','Tài xế','Chủ hộ',8),(9,'Chester Lagde','1993-12-03','M','Kinh','954863037515','Giáo viên','Chủ hộ',9),(10,'Laurena Swainger','2008-12-06','M','Tày','470408567848','Công nhân','Chủ hộ',10);
/*!40000 ALTER TABLE `nhankhau` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_check_unique_chuho` BEFORE INSERT ON `nhankhau` FOR EACH ROW BEGIN
    -- Chỉ kiểm tra nếu vai trò là "Chủ hộ"
    IF NEW.vaitro = 'Chủ hộ' AND EXISTS (
        SELECT 1 FROM `nhankhau` 
        WHERE hokhau = NEW.hokhau 
        AND vaitro = 'Chủ hộ'
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Mỗi hộ khẩu chỉ được có một chủ hộ';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_check_unique_chuho_update` BEFORE UPDATE ON `nhankhau` FOR EACH ROW BEGIN
    IF NEW.vaitro = 'Chủ hộ' AND EXISTS (
        SELECT 1 FROM `nhankhau` 
        WHERE hokhau = NEW.hokhau 
        AND vaitro = 'Chủ hộ'
        AND id != NEW.id
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Mỗi hộ khẩu chỉ được có một chủ hộ';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `noptien`
--

DROP TABLE IF EXISTS `noptien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noptien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ngaythu` date DEFAULT NULL,
  `sotien` double DEFAULT NULL,
  `nguoinop` varchar(45) DEFAULT NULL,
  `khoanthu` int DEFAULT NULL,
  `hokhau` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `khoanthu_idx` (`khoanthu`),
  KEY `hokhau_idx` (`hokhau`),
  CONSTRAINT `hokhau_noptien` FOREIGN KEY (`hokhau`) REFERENCES `hokhau` (`id`),
  CONSTRAINT `khoanthu` FOREIGN KEY (`khoanthu`) REFERENCES `khoanthu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noptien`
--

LOCK TABLES `noptien` WRITE;
/*!40000 ALTER TABLE `noptien` DISABLE KEYS */;
INSERT INTO `noptien` VALUES (3,'2025-01-02',1000,'Vernen Pinchback',3,2),(11,'2025-06-06',35000,'Vernen Pinchback',15,2),(12,'2025-06-06',23000,'Laurena Swainger',16,10);
/*!40000 ALTER TABLE `noptien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phuongtien`
--

DROP TABLE IF EXISTS `phuongtien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phuongtien` (
  `bienso` varchar(45) NOT NULL,
  `loaixe` varchar(45) DEFAULT NULL,
  `hokhau` int DEFAULT NULL,
  PRIMARY KEY (`bienso`),
  KEY `hokhau_phuongtien_idx` (`hokhau`),
  CONSTRAINT `hokhau_phuongtien` FOREIGN KEY (`hokhau`) REFERENCES `hokhau` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phuongtien`
--

LOCK TABLES `phuongtien` WRITE;
/*!40000 ALTER TABLE `phuongtien` DISABLE KEYS */;
INSERT INTO `phuongtien` VALUES ('09F-5165','Xe máy',9),('11E-2849','Xe máy',4),('18Y-8944','Ô tô',3),('19F-6467','Xe máy',8),('27H-3291','Xe máy',10),('40C-2088','Xe máy',2),('48Z-2196','Ô tô',1),('71V-1964','Xe máy',5),('75X-9282','Ô tô',6),('82F-8282','Ô tô',7);
/*!40000 ALTER TABLE `phuongtien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `unit` decimal(10,0) NOT NULL,
  `resident` varchar(100) NOT NULL,
  `dateSubmitted` date NOT NULL,
  `priority` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `category` varchar(50) NOT NULL,
  `assignedTo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Sửa chữa điện','Cần sửa chữa hệ thống điện trong nhà',25,'Rivkah Marston','2025-05-01','Cao','Đang xử lý','Điện','Trần Văn B'),(2,'Bảo trì máy lạnh','Bảo trì định kỳ máy lạnh phòng khách',17,'Vernen Pinchback','2025-05-02','Trung bình','Chờ xử lý','HVAC','Nguyễn Văn D'),(3,'Lắp đặt internet','Yêu cầu lắp đặt internet mới cho căn hộ',73,'Jae Grammer','2025-05-03','Thấp','Đã hoàn thành','Công nghệ thông tin','Trần Thị F'),(4,'Sửa chữa ống nước','Ống nước bị rò rỉ cần sửa chữa gấp',16,'Brand Cankett','2025-05-04','Cao','Đang xử lý','Nước','Lê Văn H'),(5,'Vệ sinh nhà cửa','Yêu cầu vệ sinh toàn bộ căn hộ',99,'Marna Clayton','2025-05-05','Thấp','Chờ xử lý','Vệ sinh','Nguyễn Thị J'),(6,'Sơn lại tường','Cần sơn lại tường phòng khách',45,'Mickey Ewells','2025-05-06','Trung bình','Đã hoàn thành','Xây dựng','Phạm Thị L'),(7,'1','1',2,'Vernen Pinchback','2025-06-05','Trung bình','Chờ xử lý','Điện','-');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tamtrutamvang`
--

DROP TABLE IF EXISTS `tamtrutamvang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tamtrutamvang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trangthai` varchar(45) DEFAULT NULL,
  `diachi` varchar(45) DEFAULT NULL,
  `thoigian` date DEFAULT NULL,
  `noidung` varchar(45) DEFAULT NULL,
  `nhankhau` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nhankhau_idx` (`nhankhau`),
  CONSTRAINT `nhankhau` FOREIGN KEY (`nhankhau`) REFERENCES `nhankhau` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tamtrutamvang`
--

LOCK TABLES `tamtrutamvang` WRITE;
/*!40000 ALTER TABLE `tamtrutamvang` DISABLE KEYS */;
INSERT INTO `tamtrutamvang` VALUES (1,'Tạm trú','White House','2025-01-01','Tạm trú',1),(2,'Tạm trú','White House','2025-01-01','Tạm trú',1),(3,'Tạm trú','221B Baker Street','2025-01-01','Tạm trú',2),(4,'Tạm trú','4 Privet Drive','2025-01-01','Tạm trú',3);
/*!40000 ALTER TABLE `tamtrutamvang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

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

--
-- Dumping events for database 'bluemoon'
--

--
-- Dumping routines for database 'bluemoon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06  0:11:24

import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT 
    (SELECT COUNT(*) FROM hokhau) AS totalApartments,
    (SELECT COUNT(*) FROM nhankhau) AS totalResidents,
    (SELECT SUM(sotien) FROM noptien WHERE sotien IS NOT NULL) AS totalIncome,
    (SELECT COUNT(*) FROM noptien WHERE sotien > 0) AS paidCount,
    (SELECT COUNT(*) FROM noptien WHERE sotien <= 0) AS unpaidCount,
    (SELECT COUNT(*) FROM noptien) AS totalRecords;`);


    // Truy vấn các dịch vụ gần đây
  const [recentServices] = await db.query(`
    SELECT unit, title, status, dateSubmitted
    FROM service
    ORDER BY id DESC
    LIMIT 3;
  `);

    res.json({
      totalApartments: rows[0].totalApartments || 0,
      totalResidents: rows[0].totalResidents || 0,
      totalIncome: rows[0].totalIncome || 0,
      paidCount: rows[0].paidCount || 0,
      unpaidCount: rows[0].unpaidCount || 0,
      totalRecords: rows[0].totalRecords || 0,
      recentServices: recentServices || []
    });
  }
   catch (error) {
    console.error("Lỗi truy vấn số lượng căn hộ:", error);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy số lượng căn hộ" });
  }
});

export default router;

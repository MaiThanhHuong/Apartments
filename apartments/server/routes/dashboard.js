import express from 'express';
import { db } from '../server.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT 
                                        (SELECT COUNT(*) FROM hokhau) AS totalApartments, 
                                        (SELECT COUNT(*) FROM nhankhau) AS totalResidents,
                                        (SELECT SUM(sotien) FROM noptien) AS totalIncome;`);
    res.json({
      totalApartments: rows[0].totalApartments || 0,
      totalResidents: rows[0].totalResidents || 0,
      totalIncome: rows[0].totalIncome || 0,
      occupancyRate: 0,
      vacant: 0,
      filled: 0,
      pendingRequests: 0,
      highPriorityRequests: 0
    });
  } catch (error) {
    console.error("Lỗi truy vấn số lượng căn hộ:", error);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy số lượng căn hộ" });
  }
});

export default router;

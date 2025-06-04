import express from 'express';
import { db } from '../server.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        COUNT(DISTINCT h.id) AS total_apartments,
        COUNT(DISTINCT n.id) AS occupied_apartments,
        COUNT(DISTINCT h.id) - COUNT(DISTINCT n.id) AS vacant_apartments,
        ROUND(
            COUNT(DISTINCT n.id) * 100.0 / NULLIF(COUNT(DISTINCT h.id), 0),0) AS percentage
        FROM hokhau h
        LEFT JOIN nhankhau n ON n.id = h.id;

    `);
    // Lấy tổng số cư dân
    const [residentRows] = await db.query(`SELECT COUNT(*) as total_residents FROM nhankhau;`);
    // Lấy số liệu yêu cầu dịch vụ
    const [serviceRows] = await db.query(`
      SELECT
        COUNT(*) AS total_requests,
        SUM(CASE WHEN status = 'Chờ xử lý' THEN 1 ELSE 0 END) AS pending_requests,
        SUM(CASE WHEN priority = 'Cao' THEN 1 ELSE 0 END) AS high_priority_requests
      FROM service;
    `);
    res.json({
        totalApartments: rows[0].total_apartments,
        occupiedApartments: rows[0].occupied_apartments,
        occupancyRate: rows[0].percentage,
        vacant: rows[0].vacant_apartments,
        totalResidents: residentRows[0].total_residents,
        totalRequests: serviceRows[0].total_requests,
        pendingRequests: serviceRows[0].pending_requests,
        highPriorityRequests: serviceRows[0].high_priority_requests,
    });
  } catch (error) {
    console.error('Error fetching apartment statistics:', error);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu căn hộ.' });
  }
});
export default router;

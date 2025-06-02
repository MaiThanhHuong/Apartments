// routes/service.js
import express from "express";
import { db } from "../server.js"; // Đường dẫn tới db pool (đúng là ../server.js nếu bạn khai báo pool ở đó)

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM service");
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi truy vấn service:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      unit,
      resident,
      dateSubmitted,
      priority,
      status,
      category,
      assignedTo
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO service (title, description, unit, resident, dateSubmitted, priority, status, category, assignedTo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, unit, resident, dateSubmitted, priority, status, category, assignedTo]
    );

    res.status(201).json({ message: "Đã thêm service mới", insertedId: result.insertId });
  } catch (err) {
    console.error("❌ Lỗi khi thêm service:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

export default router;

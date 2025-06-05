// routes/service.js
import express from "express";
import { db } from "../server.js"; // Đường dẫn tới db pool (đúng là ../server.js nếu bạn khai báo pool ở đó)

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1000; // mặc định lấy nhiều nếu không truyền limit
    const [rows] = await db.query(
      `SELECT * FROM service ORDER BY id ASC LIMIT ?`,
      [limit]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});
router.get("/units-residents", async (req, res) => {
  try {
    // Giả sử bảng hokhau có id, soNha; nhankhau có id, name, apartment_id (liên kết với hokhau.id)
    const [rows] = await db.query(`
      SELECT h.id as unitId, h.soNha, n.hoten as residentName
      FROM hokhau h
      LEFT JOIN nhankhau n ON n.id = h.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM bluemoon.service");
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
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const [result] = await db.query(
      "UPDATE service SET status = ? WHERE id = ?",
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu để cập nhật." });
    }
    res.json({ message: "Cập nhật trạng thái thành công!" });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật trạng thái:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});
router.put("/:id/assign", async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    const [result] = await db.query(
      "UPDATE service SET assignedTo = ? WHERE id = ?",
      [assignedTo, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu để cập nhật." });
    }
    res.json({ message: "Gán kỹ thuật viên thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});
export default router;

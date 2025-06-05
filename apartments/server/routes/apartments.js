// server/routes/apartments.js
import express from "express";
import { db } from "../server.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [apartments] = await db.query(`
      SELECT hokhau.*, nhankhau.hoten
      FROM bluemoon.hokhau 
      LEFT JOIN bluemoon.nhankhau 
      ON hokhau.id = nhankhau.hokhau AND nhankhau.vaitro = 'Chủ hộ'
    `);
    res.json(apartments);
  } catch (error) {
    console.error("Lỗi truy vấn số lượng căn hộ:", error);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy số lượng căn hộ" });
  }
});

router.post("/add", async (req, res) => {
    const { id, sonha, duong, phuong, quan, ngaylamhokhau } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO hokhau (id, sonha, duong, phuong, quan, ngaylamhokhau) VALUES (?, ?, ?, ?, ?, ?)",
            [id, sonha, duong, phuong, quan, ngaylamhokhau]
        );
        res.status(201).json({ message: "Thêm hộ khẩu thành công", insertId: result.insertId });
    } catch (error) {
        console.error("Lỗi khi thêm hộ khẩu:", error);
        res.status(500).json({ message: "Lỗi khi thêm hộ khẩu." });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { sonha, duong, phuong, quan, ngaylamhokhau } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE hokhau SET sonha = ?, duong = ?, phuong = ?, quan = ?, ngaylamhokhau = ? WHERE id = ?`,
            [sonha, duong, phuong, quan, ngaylamhokhau, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hộ khẩu để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật thành công.' });
    } catch (error) {
        console.error('Lỗi khi cập nhật hộ khẩu:', error);
        res.status(500).json({ message: 'Lỗi server.' });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // const [result] = await db.query("DELETE FROM hokhau WHERE id = ?", [id]);
        // Xóa dữ liệu liên quan trong nhankhau trước
        await db.query("DELETE FROM tamtrutamvang WHERE nhankhau = ?", [id]);
        await db.query("DELETE FROM nhankhau WHERE hokhau = ?", [id]);

        // Sau đó xóa hokhau
        const [result] = await db.query("DELETE FROM hokhau WHERE id = ?", [id]);
        console.log("Hokhau deleted:", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy căn hộ để xóa." });
        }
        res.json({ message: "Xóa căn hộ thành công." });
    } catch (error) {
        console.error("Lỗi khi xóa căn hộ:", error);
        res.status(500).json({ message: "Lỗi máy chủ." });
    }
});

export default router;

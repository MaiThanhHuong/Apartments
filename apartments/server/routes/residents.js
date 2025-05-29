// server/routes/residents.js
import express from "express";
import { db } from "../server.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
        const [households] = await db.query(`
SELECT 
    nhankhau.*, 
    IFNULL(tt.trangthai, 'Thường trú') AS trangthai
FROM 
    bluemoon.nhankhau 
LEFT JOIN (
    SELECT t1.*
    FROM bluemoon.tamtrutamvang t1
    INNER JOIN (
        SELECT nhankhau, MAX(id) AS max_id
        FROM bluemoon.tamtrutamvang
        GROUP BY nhankhau
    ) t2 ON t1.nhankhau = t2.nhankhau AND t1.id = t2.max_id
) AS tt 
ON nhankhau.id = tt.nhankhau;
`);
        res.json(households);
    } catch (error) {
        console.error("Lỗi truy vấn số nhân khẩu:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi truy vấn nhân khẩu." });
    }
});

router.post("/add", async (req, res) => {
    const { hoten, hokhau, ngaysinh, gioitinh, dantoc, cccd, nghenghiep, vaitro } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO nhankhau (hoten, hokhau, ngaysinh, gioitinh, dantoc, cccd, nghenghiep, vaitro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [hoten, hokhau, ngaysinh, gioitinh, dantoc, cccd, nghenghiep, vaitro]
        );
        res.status(201).json({ message: "Thêm hộ nhân khẩu thành công", insertId: result.insertId });
    } catch (error) {
        console.error("Lỗi khi thêm nhân khẩu:", error);
        res.status(500).json({ message: "Lỗi khi thêm nhân khẩu." });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { hoten, ngaysinh, gioitinh, dantoc, cccd, nghenghiep, vaitro, hokhau } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE nhankhau SET hoten = ?, ngaysinh = ?, gioitinh = ?, dantoc = ?, cccd = ?, nghenghiep = ?, vaitro = ?, hokhau = ? WHERE id = ?`,
            [hoten, ngaysinh, gioitinh, dantoc, cccd, nghenghiep, vaitro, hokhau, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhân khẩu để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật thành công.' });
    } catch (error) {
        console.error('Lỗi khi cập nhật nhân khẩu:', error);
        res.status(500).json({ message: 'Lỗi server.' });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM nhankhau WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy nhân khẩu để xóa." });
        }
        res.json({ message: "Xóa nhân khẩu thành công." });
    } catch (error) {
        console.error("Lỗi khi xóa nhân khẩu:", error);
        res.status(500).json({ message: "Lỗi máy chủ." });
    }
});

export default router;

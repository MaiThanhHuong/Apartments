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

export default router;

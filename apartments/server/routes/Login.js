import express from "express";
import { db } from "../server.js";

const router = express.Router();

// POST route to handle user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ message: "Tên đăng nhập và mật khẩu là bắt buộc." });
  }

  try {
    console.log(`Attempting login for username: ${username}`); // Debug log
    // Query the database for the user
    const [users] = await db.query(
      "SELECT * FROM bluemoon.user WHERE username = ? AND password = ?",
      [username, password]
    );

    if (users.length === 0) {
      console.log(`Login failed for username: ${username}`); // Debug log
      return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu." });
    }

    // Successful login
    console.log(`Login successful for username: ${username}, role: ${users[0].vaitro}`); // Debug log
    res.json({ message: "Đăng nhập thành công!", user: { username: users[0].username, role: users[0].vaitro } });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ message: "Lỗi máy chủ khi đăng nhập.", error: error.message });
  }
});

export default router;
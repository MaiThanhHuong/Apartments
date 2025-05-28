import express from "express";
import mysql from "mysql2"
import cors from "cors";
import dotenv from "dotenv";
import apartmentsRouter from "./routes/apartments.js";
import loginRouter from "./routes/Login.js";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/apartments", apartmentsRouter);
app.use("/api", loginRouter);
export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// API lấy danh sách residents
app.get("/api/residents", (req, res) => {
  const query = "SELECT * FROM residents";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching residents:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/apartments`);
});

// Test kết nối database
db.query('SELECT 1')
  .then(() => console.log('✅ Kết nối database thành công'))
  .catch(err => console.error('❌ Lỗi kết nối database:', err));
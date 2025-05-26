import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "22072004",
  database: "huong",
});

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

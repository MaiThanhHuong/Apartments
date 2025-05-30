import express from "express";
import mysql from "mysql2"
import cors from "cors";
import dotenv from "dotenv";
import apartmentsRouter from "./routes/apartments.js";
import residentsRouter from "./routes/residents.js"
import loginRouter from "./routes/Login.js";

// import settings from "./routes/settings.js";

import initRoutes from "./routes/index.js";
import settings from "./routes/settings.js";
import initRoutes from "./routes/index.js";

// dotenv.config({ path: '../.env' });
dotenv.config();


export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/apartments", apartmentsRouter);
app.use("/api/residents", residentsRouter);
app.use("/api", loginRouter);

// app.use("/api/settings",s);

initRoutes(app);

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/apartments`);
}); 


// Test kết nối database
db.query('SELECT 1')
  .then(() => console.log('✅ Kết nối database thành công'))
  .catch(err => console.error('❌ Lỗi kết nối database:', err));
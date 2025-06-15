// server/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test kết nối database
db.query('SELECT 1')
  .then(() => console.log('✅ Kết nối database thành công'))
  .catch(err => console.error('❌ Lỗi kết nối database:', err));

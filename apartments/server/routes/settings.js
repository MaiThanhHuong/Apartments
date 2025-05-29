import express from "express";
import { db } from "../server.js";

const router = express.Router();

// Authenticate user
router.post('/login', async (req, res) => {
  const pool = req.app.locals.pool;
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [
      username,
      password,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get system settings for a user
router.get('/:username', async (req, res) => {
  const pool = req.app.locals.pool;
  try {
    // Query the users table to get user details based on username
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [
      req.params.username,
    ]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
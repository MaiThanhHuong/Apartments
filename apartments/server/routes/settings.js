import express from "express";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

const router = express.Router();


// Update user password
router.put("/settings/change-password", async (req, res) => {
  const pool = req.app.locals.pool;
  const { username, currentPassword, newPassword } = req.body;

  try {
    // Find user by username
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await pool.query("UPDATE users SET password = ? WHERE username = ?", [
      hashedPassword,
      username,
    ]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
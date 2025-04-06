// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const db = require('../db'); // your sqlite connection

const registerUser = async (req, res) => {
  try {
    const { email, usn, year, branch } = req.body;

    // Validate email
    const emailRegex = /^[0-9]{4}[a-z]{2}_[a-z]+_[a-z]+@nie\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid NIE email format.' });
    }

    // Validate USN
    const usnRegex = /^4NI\d{2}[A-Z]{2}\d{3}$/;
    if (!usnRegex.test(usn)) {
      return res.status(400).json({ message: 'Invalid USN format.' });
    }

    // Match year from email and USN
    const emailYear = email.substring(0, 4);
    const usnYear = '20' + usn.substring(4, 6);
    if (emailYear !== year || emailYear !== usnYear) {
      return res.status(400).json({ message: 'Year mismatch between email and USN.' });
    }

    // Hash the USN to use as password
    const hashedPassword = await bcrypt.hash(usn, 10);

    // Check for existing user
    db.get(`SELECT * FROM users WHERE email = ? OR usn = ?`, [email, usn], (err, row) => {
      if (row) {
        return res.status(400).json({ message: 'User already registered.' });
      }

      // Insert into database
      db.run(
        `INSERT INTO users (email, usn, year, branch, password) VALUES (?, ?, ?, ?, ?)`,
        [email, usn, year, branch, hashedPassword],
        function (err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error.' });
          }

          return res.status(201).json({ message: 'Registration successful!' });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

module.exports = { registerUser };

require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const db = require('./config/db'); // Database connection
const { check, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Appointment submission endpoint
app.post(
  '/api/appointments',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('phone').isMobilePhone().withMessage('Invalid phone number'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('appointment_date').isISO8601().withMessage('Invalid date'),
    check('service').notEmpty().withMessage('Service is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { user_id, name, phone, email, appointment_date, service, message } = req.body;

    const sql = `INSERT INTO appointments (user_id, name, phone, email, appointment_date, service, message) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
      await db.promise().query(sql, [user_id || null, name, phone, email, appointment_date, service, message || null]);
      res.status(200).json({ success: true, message: 'Appointment booked successfully!' });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ success: false, message: 'Error saving appointment.' });
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); // Import database connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Test route
app.get('/api', (req, res) => {
  res.send('API is working!');
});

// Appointment submission endpoint
app.post('/api/appointments', (req, res) => {
  const { user_id, name, phone, email, appointment_date, service, message } = req.body;

  // Validate required fields
  if (!name || !phone || !email || !appointment_date || !service) {
    return res.status(400).send('All fields are required.');
  }

  const sql = `INSERT INTO appointments (user_id, name, phone, email, appointment_date, service, message)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [user_id || null, name, phone, email, appointment_date, service, message || null],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error saving appointment.');
      }
      res.status(200).send('Appointment booked successfully!');
    }
  );
});

// Fetch all appointments
app.get('/api/appointments', (req, res) => {
  const sql = `SELECT * FROM appointments ORDER BY appointment_date ASC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).send('Error fetching appointments.');
    }
    res.status(200).json(results); // Send the appointments as JSON
  });
});

// Fetch users (optional)
app.get('/api/users', (req, res) => {
  const sql = `SELECT * FROM users ORDER BY created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).send('Error fetching users.');
    }
    res.status(200).json(results); // Send the users as JSON
  });
});

// Add a new user
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).send('All fields are required.');
  }

  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Error saving user.');
    }
    res.status(200).send('User registered successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

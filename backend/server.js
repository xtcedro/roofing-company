const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Database initialization
const db = new sqlite3.Database('./database/appointments.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run(
            `CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                date TEXT NOT NULL,
                service TEXT NOT NULL,
                message TEXT
            )`,
            (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                } else {
                    console.log('Connected to the SQLite database.');
                }
            }
        );
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../html'))); // Serve static files

// Routes
// Route to handle form submission
app.post('/submit-appointment', (req, res) => {
    const { name, email, phone, date, service, message } = req.body;

    if (!name || !email || !phone || !date || !service) {
        return res.status(400).send('All required fields must be filled.');
    }

    const query = `INSERT INTO appointments (name, email, phone, date, service, message) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [name, email, phone, date, service, message || ''], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Appointment request submitted successfully.');
        }
    });
});

// Route to fetch appointments (for `view-appointments.html`)
app.get('/appointments', (req, res) => {
    const query = `SELECT * FROM appointments ORDER BY date ASC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json(rows);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
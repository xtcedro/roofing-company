const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database setup
const db = new sqlite3.Database('./database/database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Serve static files (for HTML, CSS, JS files)
app.use(express.static(path.join(__dirname, '../html')));

// API Routes

// Create a new appointment
app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, service, message } = req.body;

    if (!name || !email || !phone || !date || !service) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const query = `INSERT INTO appointments (name, email, phone, date, service, message) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(query, [name, email, phone, date, service, message], function (err) {
        if (err) {
            console.error('Error inserting appointment:', err.message);
            return res.status(500).json({ error: 'Failed to create appointment.' });
        }
        res.status(201).json({ message: 'Appointment created successfully.', id: this.lastID });
    });
});

// Retrieve all appointments
app.get('/api/appointments', (req, res) => {
    const query = 'SELECT * FROM appointments ORDER BY date ASC';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving appointments:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve appointments.' });
        }
        res.status(200).json(rows);
    });
});

// Retrieve a single appointment by ID
app.get('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM appointments WHERE id = ?';

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error retrieving appointment:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve appointment.' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        res.status(200).json(row);
    });
});

// Delete an appointment
app.delete('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM appointments WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Error deleting appointment:', err.message);
            return res.status(500).json({ error: 'Failed to delete appointment.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully.' });
    });
});

// Serve index.html as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/index.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
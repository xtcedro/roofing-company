const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const db = req.app.get('db');
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

router.get('/', (req, res) => {
    const db = req.app.get('db');
    const query = 'SELECT * FROM appointments ORDER BY date ASC';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving appointments:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve appointments.' });
        }
        res.status(200).json(rows);
    });
});

router.get('/:id', (req, res) => {
    const db = req.app.get('db');
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

router.delete('/:id', (req, res) => {
    const db = req.app.get('db');
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

module.exports = router;
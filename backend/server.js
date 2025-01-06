const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

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

// Make the database available to other modules
app.set('db', db);

// Serve static files (for HTML, CSS, JS files)
app.use(express.static(path.join(__dirname, '../html')));

// Import routes
const appointmentsRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentsRoutes);

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
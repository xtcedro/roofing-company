const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
    origin: ['https://www.domingueztechsolutions.com', 'http://localhost'], // Allow domain and localhost for testing
    methods: ['GET', 'POST', 'DELETE'],              // Allowed methods
    credentials: true                                // Allow cookies if needed
}));

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Database setup
const db = new sqlite3.Database('./database/database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS appointments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    date TEXT NOT NULL,
                    service TEXT NOT NULL,
                    message TEXT
                )
            `, (err) => {
                if (err) console.error('Error creating table:', err.message);
                else console.log('Appointments table ensured.');
            });
        });
    }
});

// Make the database available to other modules
app.set('db', db);

// Serve static files (HTML, CSS, JS)
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

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) console.error('Error closing database:', err.message);
        else console.log('Database connection closed.');
        process.exit(0);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
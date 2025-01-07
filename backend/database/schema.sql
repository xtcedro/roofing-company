-- Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique identifier for each appointment
    name TEXT NOT NULL,                    -- Full name of the client
    email TEXT NOT NULL,                   -- Email address of the client
    phone TEXT NOT NULL,                   -- Phone number of the client
    date DATE NOT NULL,                    -- Preferred appointment date
    service TEXT NOT NULL,                 -- Type of service requested
    message TEXT,                          -- Additional details from the client
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the appointment was created
    UNIQUE(email, date)                    -- Ensure unique appointments per email and date
);

-- Index for faster queries on date
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments (date);

-- Index for faster searches by email
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments (email);

-- Index for faster queries on service (optional)
CREATE INDEX IF NOT EXISTS idx_appointments_service ON appointments (service);
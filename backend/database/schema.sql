-- Create the database
CREATE DATABASE IF NOT EXISTS appointment_db;

-- Use the created database
USE appointment_db;

-- Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique identifier for each appointment
    name VARCHAR(100) NOT NULL,                -- Full name of the customer
    phone VARCHAR(10) NOT NULL,                -- Phone number (10 digits only)
    email VARCHAR(100) NOT NULL,               -- Customer's email address
    appointment_date DATE NOT NULL,            -- Preferred appointment date
    service VARCHAR(255) NOT NULL,             -- Type of service requested
    message TEXT,                              -- Additional details or notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for record creation
);

-- Create the user database
CREATE DATABASE IF NOT EXISTS user_db;

-- Use the created database
USE user_db;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each user
    name VARCHAR(100) NOT NULL,                 -- Full name of the user
    email VARCHAR(100) NOT NULL UNIQUE,         -- Unique email for login
    password VARCHAR(255) NOT NULL,             -- Hashed password for security
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for account creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for updates
);

-- Create the payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for the payment method
    user_id INT NOT NULL,                       -- Foreign key to the users table
    card_number VARCHAR(16) NOT NULL,           -- Encrypted card number
    card_holder_name VARCHAR(100) NOT NULL,     -- Name on the card
    expiration_date DATE NOT NULL,              -- Expiration date of the card
    billing_address TEXT NOT NULL,              -- Billing address
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for record creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp for updates
    FOREIGN KEY (user_id) REFERENCES users(id)  -- Relates payment methods to users
);


-- Optional: Insert sample data for testing
INSERT INTO appointments (name, phone, email, appointment_date, service, message)
VALUES
('John Doe', '1234567890', 'john.doe@example.com', '2025-01-10', 'Roof Repair', 'Urgent roof repair needed.'),
('Jane Smith', '0987654321', 'jane.smith@example.com', '2025-01-11', 'Inspection', 'Requesting a standard roof inspection.');

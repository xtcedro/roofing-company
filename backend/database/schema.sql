-- Create the unified database
CREATE DATABASE IF NOT EXISTS appointment_db;

-- Use the created database
USE appointment_db;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each user
    name VARCHAR(100) NOT NULL,                 -- Full name of the user
    email VARCHAR(100) NOT NULL UNIQUE,         -- Unique email for login
    password VARCHAR(255) NOT NULL,             -- Hashed password for security
    role ENUM('admin', 'customer') DEFAULT 'customer', -- User role
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for account creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for updates
);

-- Create the services table (optional normalization)
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each service
    name VARCHAR(255) NOT NULL UNIQUE,          -- Name of the service
    description TEXT                             -- Additional details about the service
);

-- Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each appointment
    user_id INT,                                -- Foreign key to the users table
    name VARCHAR(100) NOT NULL,                 -- Full name of the customer
    phone VARCHAR(10) NOT NULL,                 -- Phone number (10 digits only)
    email VARCHAR(100) NOT NULL,                -- Customer's email address
    appointment_date DATE NOT NULL,             -- Preferred appointment date
    service_id INT,                             -- Foreign key to the services table
    service VARCHAR(255) NOT NULL,              -- Type of service requested (redundant for legacy data)
    message TEXT,                               -- Additional details or notes
    status ENUM('pending', 'confirmed', 'completed', 'canceled') DEFAULT 'pending', -- Appointment status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for record creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp for updates
    FOREIGN KEY (user_id) REFERENCES users(id), -- Relates appointments to users
    FOREIGN KEY (service_id) REFERENCES services(id) -- Relates appointments to services
);

-- Insert sample data into users table
INSERT INTO users (name, email, password, role)
VALUES
('John Admin', 'admin@example.com', 'hashedpassword123', 'admin'),
('Jane Customer', 'jane@example.com', 'hashedpassword456', 'customer');

-- Insert sample data into services table
INSERT INTO services (name, description)
VALUES
('Roof Repair', 'Repair damaged or leaking roofs'),
('Inspection', 'Standard roof inspection service');

-- Insert sample data into appointments table
INSERT INTO appointments (user_id, name, phone, email, appointment_date, service_id, service, message, status)
VALUES
(2, 'Jane Smith', '0987654321', 'jane.smith@example.com', '2025-01-11', 2, 'Inspection', 'Requesting a standard roof inspection.', 'pending');
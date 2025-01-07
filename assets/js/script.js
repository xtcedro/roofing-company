const API_BASE_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:3000'
  : 'https://www.domingueztechsolutions.com';

// Attach an event listener to the form submission
document.getElementById('appointmentForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  // Collect form data
  const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    appointment_date: document.getElementById('date').value,
    service: document.getElementById('service').value, // Collect service field
    message: document.getElementById('message').value, // Collect message field
  };

  // Send data to the backend
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Display success or error message
    const responseMessage = document.getElementById('responseMessage');
    const message = await response.text();

    if (response.ok) {
      responseMessage.textContent = message || 'Appointment booked successfully!';
      responseMessage.className = 'response-message success'; // Success styling
      document.getElementById('appointmentForm').reset(); // Clear the form
    } else {
      responseMessage.textContent = `Error: ${message || 'Failed to book the appointment.'}`;
      responseMessage.className = 'response-message error'; // Error styling
    }
    responseMessage.style.display = 'block'; // Ensure message is visible
  } catch (error) {
    console.error('Error:', error);
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = 'Failed to connect to the server.';
    responseMessage.className = 'response-message error';
    responseMessage.style.display = 'block';
  }
});
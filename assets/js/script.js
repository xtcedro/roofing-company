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
    appointment_time: document.getElementById('time').value,
    service: document.getElementById('service').value, // Add service field
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
    const message = await response.text();
    const responseMessage = document.getElementById('responseMessage');
    if (response.ok) {
      responseMessage.textContent = message;
      responseMessage.style.color = 'green';
      document.getElementById('appointmentForm').reset(); // Clear the form
    } else {
      responseMessage.textContent = `Error: ${message}`;
      responseMessage.style.color = 'red';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('responseMessage').textContent =
      'Failed to connect to the server.';
    document.getElementById('responseMessage').style.color = 'red';
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
const API_BASE_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:3000'
  : 'https://www.domingueztechsolutions.com';

// Appointment Form Submission
document.getElementById('appointmentForm')?.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  // Collect form data
  const formData = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    appointment_date: document.getElementById('appointment_date').value.trim(),
    service: document.getElementById('service').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  console.log('Collected Appointment Form Data:', formData);

  // Validate form data
  if (!formData.name || !formData.phone || !formData.email || !formData.appointment_date || !formData.service) {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = 'All fields are required.';
    responseMessage.className = 'response-message error';
    responseMessage.style.display = 'block';
    return;
  }

  // Send data to the backend
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseMessage = document.getElementById('responseMessage');
    const message = await response.text();

    if (response.ok) {
      responseMessage.textContent = message || 'Appointment booked successfully!';
      responseMessage.className = 'response-message success';
      document.getElementById('appointmentForm').reset();
    } else {
      responseMessage.textContent = `Error: ${message || 'Failed to book the appointment.'}`;
      responseMessage.className = 'response-message error';
    }
    responseMessage.style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = 'Failed to connect to the server.';
    responseMessage.className = 'response-message error';
    responseMessage.style.display = 'block';
  }
});

// Signup Form Submission
document.getElementById('signupForm')?.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  // Collect form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  console.log('Collected Signup Form Data:', { name, email, password });

  // Validate form data
  if (!name || !email || !password || !confirmPassword) {
    alert('All fields are required.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Prepare data for API
  const userData = {
    name,
    email,
    password,
  };

  try {
    // Send data to the backend
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert('Account created successfully! You can now log in.');
      document.getElementById('signupForm').reset();
    } else {
      const message = await response.text();
      alert(`Error: ${message || 'Failed to create account.'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to connect to the server.');
  }
});

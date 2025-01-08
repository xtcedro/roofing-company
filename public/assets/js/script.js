const API_BASE_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:3000'
  : 'https://www.domingueztechsolutions.com';

// Forgot Password Form Submission
document.getElementById('forgotPasswordForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();

  if (!email) {
    alert('Email is required.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert('Password reset link sent to your email.');
      document.getElementById('forgotPasswordForm').reset();
    } else {
      const message = await response.text();
      alert(`Error: ${message || 'Failed to send password reset link.'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to connect to the server.');
  }
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Email and password are required.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('Login successful!');
      window.location.href = 'dashboard.html';
    } else {
      const message = await response.text();
      alert(`Error: ${message || 'Invalid email or password.'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to connect to the server.');
  }
});

// Signup Form Submission
document.getElementById('signupForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert('All fields are required.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
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

// Appointment Form Submission
document.getElementById('appointmentForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    appointment_date: document.getElementById('appointment_date').value.trim(),
    service: document.getElementById('service').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  console.log('Collected Appointment Form Data:', formData);

  if (!formData.name || !formData.phone || !formData.email || !formData.appointment_date || !formData.service) {
    alert('All fields are required.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Appointment booked successfully!');
      document.getElementById('appointmentForm').reset();
    } else {
      const message = await response.text();
      alert(`Error: ${message || 'Failed to book the appointment.'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to connect to the server.');
  }
});

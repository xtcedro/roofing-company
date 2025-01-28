document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = `
    <ul>
      <li><a href="index.html">🏠 Home</a></li>
      <li><a href="about.html">ℹ️ About Us</a></li>
      <li><a href="services.html">🛠️ Services</a></li>
      <li><a href="contact.html">📞 Contact</a></li>
    </ul>
  `;
});
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const navbar = document.querySelector(".navbar");

    // Set the navigation bar
    if (token) {
        // User is signed in
        navbar.innerHTML = `
            <a href="index.html">🏠 Home</a>
            <a href="about.html">📖 About Us</a>
            <a href="services.html">🛠️ Services</a>
            <a href="gallery.html">🖼️ Gallery</a>
            <a href="appointments.html">📅 Submit Appointments</a>
            <a href="view-appointments.html">👀 View Appointments</a>
            <a href="contact.html">📬 Contact Us</a>
            <a href="dashboard.html">📊 Dashboard</a>
            <button class="cta-button secondary" onclick="signOut()">🔓 Sign Out</button>
        `;
    } else {
        // Visitor (not signed in)
        navbar.innerHTML = `
            <a href="index.html">🏠 Home</a>
            <a href="about.html">📖 About Us</a>
            <a href="services.html">🛠️ Services</a>
            <a href="register.html">📝 Register</a>
            <a href="login.html">🔑 Login</a>
        `;
    }

    // Highlight the active tab
    const currentPath = window.location.pathname.split('/').pop(); // Get the current file name
    const links = navbar.querySelectorAll("a");

    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
});

// Sign Out Function
function signOut() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
